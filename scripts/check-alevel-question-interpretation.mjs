import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { chromium, firefox, webkit } from "playwright";
import axe from "axe-core";
import { servePublic } from "./browser-test-site.mjs";

const storageKey = "keystone.alevel.exam-skills.v1";
const earlierRecord = {
  phase: "practice",
  index: 3,
  queue: [0, 1, 2, 3],
  outcomes: { 0: "guided", 1: "independent", 2: "corrected" },
  drafts: { 3: "My earlier draft explained why the solvent was controlled." },
};

async function openSequence(main, lesson) {
  await main.getByText("Choose a sequence", { exact: true }).click();
  await main.getByRole("button", { name: lesson.title, exact: true }).click();
  await main.getByRole("heading", { name: lesson.title, exact: true }).waitFor();
}

async function audit(page, stage) {
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `${stage} overflows`);
  const violations = await page.evaluate(async () => (await window.axe.run({
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] },
  })).violations.map(({ id, nodes }) => [id, nodes.map(({ target }) => target)]));
  assert.deepEqual(violations, [], `${stage} accessibility`);
}

async function beginWorked(main, lesson) {
  await main.getByRole("button", { name: "See worked example", exact: true }).press("Enter");
  await main.getByText(lesson.worked.question, { exact: true }).waitFor();
  assert.equal(await main.getByText(lesson.worked.model, { exact: true }).count(), 0);
  for (const { text } of lesson.worked.reasoning) {
    assert.equal(await main.getByText(text, { exact: true }).count(), 0);
  }
}

async function revealReasoning(main, lesson) {
  for (const [index, { text }] of lesson.worked.reasoning.entries()) {
    await main.getByRole("button", { name: index ? "Next reasoning step" : "Show the reasoning", exact: true }).press("Enter");
    assert(await main.getByText(text, { exact: true }).isVisible());
    if (index < lesson.worked.reasoning.length - 1) {
      assert.equal(await main.getByText(lesson.worked.model, { exact: true }).count(), 0);
    }
  }
  await main.getByText(lesson.worked.model, { exact: true }).waitFor();
}

async function beginGuided(main, lesson) {
  await main.getByRole("button", { name: "Try with support", exact: true }).press("Enter");
  await main.getByText(lesson.guided.question, { exact: true }).waitFor();
  assert.equal(await main.getByText(lesson.guided.takeaway, { exact: true }).count(), 0);
}

async function submitGuided(main, lesson, index, submitLabel = "Check") {
  const guided = lesson.guided;
  if (guided.kind === "group") {
    const selectors = main.getByRole("combobox");
    for (const [row, [, answer]] of guided.items.entries()) {
      await selectors.nth(row).selectOption(String(answer));
    }
  } else if (guided.kind === "multi") {
    for (const chosen of guided.answer) {
      await main.getByRole("checkbox", { name: guided.options[chosen].text, exact: true }).check();
    }
  } else {
    await main.getByRole("radio", { name: guided.options[index].text, exact: true }).check();
  }
  await main.getByRole("button", { name: submitLabel, exact: true }).press("Enter");
  const explanation = guided.kind === "group" || guided.kind === "multi" ? guided.takeaway : `${guided.options[guided.answer].feedback} ${guided.takeaway}`;
  const expected = index === guided.answer ? `Correct. ${explanation}` : `Review and improve. ${guided.options[index].feedback}`;
  await main.getByRole("status").getByText(expected, { exact: true }).waitFor();
}

async function beginIndependent(main, lesson) {
  await main.getByRole("button", { name: "Try the independent question", exact: true }).press("Enter");
  await main.getByText(lesson.independent.question, { exact: true }).waitFor();
  assert.equal(await main.getByRole("radio").count(), 0);
  assert.equal(await main.locator(".context-vocabulary-term").count(), 0);
  for (const answer of [lesson.independent.model, ...lesson.independent.points, lesson.independent.reflection]) {
    assert.equal(await main.getByText(answer, { exact: true }).count(), 0, "Independent writing must be uncued");
  }
  return main.getByRole("textbox", { name: "Your response", exact: true });
}

async function checkVocabulary(page, main, { touch = false, capture } = {}) {
  const term = main.locator('button.context-vocabulary-term[data-vocabulary-term="interstitial-fluid"]');
  const panel = main.getByRole("dialog", { name: /interstitial fluid/i });
  const workedButton = main.getByRole("button", { name: "Show the reasoning", exact: true });
  const position = await workedButton.evaluate(element => element.offsetTop);
  if (touch) await term.tap();
  else await term.press("Enter");
  await panel.waitFor();
  assert.match(await panel.innerText(), /tissue fluid/i);
  assert.equal(await term.getAttribute("aria-expanded"), "true");
  assert.equal(await workedButton.evaluate(element => element.offsetTop), position);
  const close = panel.getByRole("button", { name: "Close definition", exact: true });
  if (touch) {
    await capture?.();
    await close.tap();
  } else {
    await page.keyboard.press("Tab");
    assert(await close.evaluate(element => element === document.activeElement));
    await page.keyboard.press("Escape");
  }
  await panel.waitFor({ state: "hidden" });
  assert.equal(await term.getAttribute("aria-expanded"), "false");
  if (!touch) assert(await term.evaluate(element => element === document.activeElement));
  if (touch) {
    await term.tap();
    await panel.waitFor();
    await page.touchscreen.tap(5, 5);
    await panel.waitFor({ state: "hidden" });
  }
}

function verifyScientificFixture(gene) {
  const { stimulus, options, answer } = gene.guided;
  assert.match(stimulus, /amount of transporter mRNA per cell.*rate of transcription.*same/i);
  assert.match(stimulus, /separate measurement.*synthesi[sz].*per minute/i);
  assert.match(stimulus, /distinguishes.*synthesis from.*breakdown/i);
  assert.match(options[answer].text, /ribosomes.*translat/i);
  assert.match(options[answer].feedback, /could lower protein synthesis/);
  assert.match(options[answer].feedback, /allow this explanation without establishing it/);
  const wrongTranscription = options.find(option => /transcribes.*less often/i.test(option.text));
  assert.match(wrongTranscription.feedback, /transcription.*(?:same|unchanged|equal)|(?:same|unchanged|equal).*transcription/i);
  const wrongDegradation = options.find(option => /breaks down faster/i.test(option.text));
  assert.match(wrongDegradation.feedback, /synthesi[sz]|newly made|rate.*made/i);
  assert.match(wrongDegradation.feedback, /after|abundance|amount/i);
}

export async function checkQuestionInterpretation(browser, base, axeSource) {
  const route = base + "/alevel/#exam-interpret";
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, reducedMotion: "reduce" });
  const errors = [];
  const screenshot = (target, label, options) => target.screenshot({ ...options, path: `/tmp/narajos-understand-question-${label}-${browser.browserType().name()}.png` });
  try {
    for (const target of [page, mobile]) {
      target.setDefaultTimeout(10_000);
      target.on("pageerror", error => errors.push(error.message));
    }
    await page.addInitScript(({ key, earlier }) => {
      if (localStorage.getItem(key) === null) localStorage.setItem(key, JSON.stringify({ interpret: earlier }));
    }, { key: storageKey, earlier: earlierRecord });
    await page.goto(route);
    const main = page.locator("main");
    await main.getByRole("heading", { name: "Understand the question", exact: true }).waitFor();
    await main.getByText("Earlier activity progress", { exact: true }).click();
    assert(await main.getByText(earlierRecord.drafts[3], { exact: true }).isVisible());
    await main.getByText("Earlier activity progress", { exact: true }).click();
    const lessons = await page.evaluate(() => window.ALevelQuestionInterpretation.lessons);
    assert.deepEqual(lessons.map(lesson => lesson.id), ["target", "command-words", "use-evidence", "conditions", "explain-and-compare", "multiple-demands", "independent-transfer"]);
    assert.equal(new Set(lessons.map(lesson => lesson.objective)).size, lessons.length);
    const evidence = lessons.find(lesson => lesson.id === "use-evidence");
    const gene = lessons.find(lesson => lesson.id === "conditions");
    verifyScientificFixture(gene);

    await page.addScriptTag({ content: axeSource });
    await audit(page, "Desktop sequence introduction");
    for (const lesson of lessons) {
      await openSequence(main, lesson);
      await main.getByText(lesson.objective, { exact: true }).waitFor();
      await beginWorked(main, lesson);
      if (lesson === evidence) await checkVocabulary(page, main);
      await revealReasoning(main, lesson);
      if (lesson === evidence) {
        await audit(page, "Desktop revealed reasoning");
        await screenshot(page, "desktop-worked-reasoning", { fullPage: true });
        await page.reload();
        assert(await main.getByText(lesson.worked.model, { exact: true }).isVisible());
      }
      await beginGuided(main, lesson);
      await submitGuided(main, lesson, lesson.guided.answer);
      const response = await beginIndependent(main, lesson);
      const draft = `My response for ${lesson.title.toLowerCase()}.`;
      if (lesson === gene) {
        await main.getByRole("button", { name: "Compare with the checklist", exact: true }).press("Enter");
        assert.match(await main.getByRole("status").innerText(), /Write a response before opening the checklist/);
        assert.equal(await main.getByRole("radio").count(), 0);
      }
      await response.fill(draft);
      if (lesson === gene) {
        await page.reload();
        assert.equal(await response.inputValue(), draft);
        assert(await main.getByRole("heading", { name: lesson.title, exact: true }).isVisible());
      }
      await main.getByRole("button", { name: "Compare with the checklist", exact: true }).press("Enter");
      for (const point of lesson.independent.points) {
        await main.getByRole("group", { name: point, exact: true }).getByRole("radio", { name: "Needs work", exact: true }).check();
      }
      await main.getByText("Compare with a model explanation", { exact: true }).click();
      assert(await main.getByText(lesson.independent.model, { exact: true }).isVisible());
      await main.getByRole("button", { name: "Finish review", exact: true }).press("Enter");
      await main.getByRole("button", { name: "Finish sequence", exact: true }).press("Enter");
    }
    await page.reload();
    const { sequences, ...storedEarlier } = await page.evaluate(key => JSON.parse(localStorage.getItem(key)).interpret, storageKey);
    assert.deepEqual(storedEarlier, earlierRecord, "The original four-task record must survive the new sequences");
    assert.equal(sequences.active, lessons.at(-1).id);
    for (const lesson of lessons) {
      const { practice, stage } = sequences.units[lesson.id];
      assert.equal(stage, "complete");
      assert.equal(practice.outcomes[1], "self-reviewed");
      assert.equal(practice.drafts[1], `My response for ${lesson.title.toLowerCase()}.`);
    }

    await mobile.goto(route);
    const touchMain = mobile.locator("main");
    await openSequence(touchMain, evidence);
    await beginWorked(touchMain, evidence);
    await checkVocabulary(mobile, touchMain, { touch: true, capture: () => screenshot(mobile, "mobile-definition") });
    await openSequence(touchMain, gene);
    await beginWorked(touchMain, gene);
    await revealReasoning(touchMain, gene);
    await beginGuided(touchMain, gene);
    const wrong = gene.guided.options.flatMap((_, index) => index === gene.guided.answer ? [] : [index]);
    await submitGuided(touchMain, gene, wrong[0]);
    await mobile.reload();
    assert((await touchMain.getByRole("status").innerText()).includes(gene.guided.options[wrong[0]].feedback));
    await mobile.addScriptTag({ content: axeSource });
    await audit(mobile, "Mobile guided feedback");
    await screenshot(touchMain, "mobile-guided-feedback");
    await submitGuided(touchMain, gene, wrong[1], "Try again");
    await submitGuided(touchMain, gene, gene.guided.answer, "Try again");
    await beginIndependent(touchMain, gene);
    await mobile.setViewportSize({ width: 320, height: 780 });
    await audit(mobile, "320px independent writing");
    assert.deepEqual(errors, [], "Understand the question page errors");
    console.log("Understand the question: seven sequences, saved work, scientific feedback, vocabulary and responsive accessibility passed.");
  } finally {
    await Promise.all([page.close(), mobile.close()]);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const engine = { chromium, firefox, webkit }[process.argv[2] || "chromium"];
  assert(engine, "Choose chromium, firefox or webkit");
  const systemChromium = engine === chromium && !existsSync(engine.executablePath()) && existsSync("/usr/bin/chromium");
  const browser = await engine.launch(systemChromium ? { executablePath: "/usr/bin/chromium" } : {});
  const { server, base } = await servePublic();
  try {
    await checkQuestionInterpretation(browser, base, axe.source);
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}

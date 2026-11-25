import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { join } from "node:path";
import axe from "axe-core";
import { chromium } from "playwright";
import { servePublic } from "./browser-test-site.mjs";

const curriculum = { window: {} };
for (const module of ["vocabulary-topics-1-4.js", "vocabulary-topics-5-8.js", "vocabulary-skills.js"]) {
  runInNewContext(readFileSync(new URL("../public/alevel/" + module, import.meta.url), "utf8"), curriculum);
}
const reference = curriculum.window.ALevelVocabularyData;
assert.equal(new Set(reference.map(entry => entry.id)).size, reference.length, "Vocabulary IDs are unique");
const topics = [...new Set(reference.flatMap(entry => entry.topics))].sort();
assert.deepEqual(topics, [1, 2, 3, 4, 5, 6, 7, 8]);
for (const entry of reference) {
  assert.match(entry.id, /^[a-z][a-z0-9-]+$/);
  assert(entry.meaning.trim() && entry.sources.length && entry.sources.every(url => /^https:\/\//.test(url)), entry.id);
  assert(["core", "additional", "prerequisite"].includes(entry.status), entry.id);
  assert(["selective", "increased", "lookup"].includes(entry.support), entry.id);
}

const preferenceKey = "keystone.alevel.vocabulary.preference.v1";
const progressKey = "keystone-aqa-alevel-biology-v1";
const examKey = "keystone.alevel.exam-skills.v1";
const screenshotDirectory = process.env.NARAJOS_VOCAB_SCREENSHOTS || "/tmp";
const systemChromium = !existsSync(chromium.executablePath()) && existsSync("/usr/bin/chromium");
const browser = await chromium.launch(systemChromium ? { executablePath: "/usr/bin/chromium" } : {});
const { server, base } = await servePublic();
const course = base + "/alevel/";
const errors = [];

const trigger = (page, id) => page.locator(`main button.context-vocabulary-term[data-vocabulary-term="${id}"]`);
const panel = page => page.locator("dialog.vocabulary-panel[open]");
const wordHelp = page => page.getByRole("button", { name: "Word help", exact: true });
const closeHelp = page => panel(page).getByRole("button", { name: "Close word help" });
const moreHelp = page => panel(page).getByRole("checkbox", { name: "More word help" });
const search = page => panel(page).getByRole("searchbox", { name: "Find a biology term" });

async function createPage(options) {
  const page = await browser.newPage({ reducedMotion: "reduce", ...options });
  page.setDefaultTimeout(8_000);
  page.on("pageerror", error => errors.push(`${page.url()} ${error.message}`));
  // Use the same deterministic offline font fallback as the existing practical tests.
  await page.route(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\//, route => route.abort());
  return page;
}

async function capture(page, name) {
  await page.screenshot({ path: join(screenshotDirectory, "narajos-vocabulary-" + name + ".png") });
}

async function checkOpenPanelAccessibility(page) {
  await page.addScriptTag({ content: axe.source });
  const violations = await page.evaluate(async () => (await window.axe.run({
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] }
  })).violations.map(({ id, nodes }) => [id, nodes.map(({ target }) => target)]));
  assert.deepEqual(violations, [], "The open word-help panel passes the accessibility rules tested by axe");
}

async function checkPreference(page) {
  await page.goto(course + "#lesson-a2-mitindex");
  await page.getByRole("button", { name: "Start questions", exact: true }).waitFor();
  const main = page.locator("main");
  const annotations = main.locator("button.context-vocabulary-term");
  const selectiveCount = await annotations.count();
  await capture(page, "selective");
  await wordHelp(page).press("Enter");
  assert.equal(await moreHelp(page).isChecked(), false, "Ordinary revision starts with selective support");
  assert.match(await panel(page).innerText(), /Activity default/);
  assert.equal(await page.evaluate(key => localStorage.getItem(key), preferenceKey), null);
  await search(page).fill("mitosis");
  await panel(page).getByRole("button", { name: "Mitosis", exact: true }).click();
  assert.match(await panel(page).innerText(), /chromosom|nucle/i, "Core terms can be found through lookup");
  await page.keyboard.press("Escape");
  assert(await wordHelp(page).evaluate(button => button === document.activeElement));

  const progressBefore = await page.evaluate(key => localStorage.getItem(key), progressKey);
  await wordHelp(page).click();
  await moreHelp(page).check();
  const increasedCount = await annotations.count();
  assert(increasedCount > selectiveCount, "An explicit preference adds terms to the same passage");
  console.log(`Root tip squash notes show ${selectiveCount} highlighted terms with selective support and ${increasedCount} with more word help.`);
  assert.match(await panel(page).innerText(), /Saved preference/);
  assert.equal(await page.evaluate(key => localStorage.getItem(key), preferenceKey), "more");
  assert.equal(await page.evaluate(key => localStorage.getItem(key), progressKey), progressBefore);
  await closeHelp(page).click();
  await capture(page, "increased");
  await page.reload();
  await wordHelp(page).click();
  assert.equal(await moreHelp(page).isChecked(), true);
  assert.match(await panel(page).innerText(), /Saved preference/);
  await panel(page).getByRole("button", { name: "Use activity default", exact: true }).click();
  assert.equal(await moreHelp(page).isChecked(), false);
  assert.equal(await annotations.count(), selectiveCount);
  await closeHelp(page).click();

  await page.goto(course + "#catchup-a1-monopoly");
  const monomer = trigger(page, "monomer").first();
  await monomer.waitFor();
  await wordHelp(page).click();
  assert.equal(await moreHelp(page).isChecked(), true, "Catch-up automatically provides more help");
  assert.match(await panel(page).innerText(), /Activity default/);
  await moreHelp(page).uncheck();
  assert.equal(await trigger(page, "monomer").count(), 0, "Explicit selective support can override the catch-up default");
  await page.reload();
  await wordHelp(page).click();
  assert.equal(await moreHelp(page).isChecked(), false);
  assert.match(await panel(page).innerText(), /Saved preference/);
  await panel(page).getByRole("button", { name: "Use activity default" }).click();
  await closeHelp(page).click();
  await monomer.waitFor();
}

async function checkMatching(page) {
  const readTerms = locator => locator.locator("button[data-vocabulary-term]")
    .evaluateAll(buttons => buttons.map(button => button.dataset.vocabularyTerm));
  await page.goto(course + "#catchup-a1-enzfactors");
  const fixture = await page.evaluate(() => {
    const details = document.createElement("details");
    details.dataset.wordHelpScope = "";
    details.id = "vocabulary-matching-fixture";
    details.innerHTML = '<summary>Test passages</summary>'
      + '<p>Supercompetitive inhibition appears as a typo. <b>Competitive</b> inhibition differs from '
      + 'non–competitive inhibition. Competitive inhibitors bind. <a href="#fixture">Hydrolysis</a> '
      + '<button type="button" class="fixture-control">Hydrolysis</button>.</p>'
      + '<p>A <em>covalent</em> bond can hold units together.</p>'
      + '<p hidden>Hydrolysis</p>';
    const separate = document.createElement("details");
    separate.id = "vocabulary-second-unit";
    separate.dataset.wordHelpScope = "";
    separate.open = true;
    separate.innerHTML = '<summary>Separate passage</summary><p>Competitive inhibitor. Competitive inhibition.</p>';
    const senses = document.createElement("section");
    senses.id = "vocabulary-context-fixture";
    senses.dataset.wordHelpScope = "";
    senses.innerHTML = '<p>A microscope image has enough resolution to distinguish two points.</p>'
      + '<p>A balance displays a reading in steps of 0.01 g. Its resolution is 0.01 g.</p>'
      + '<p>The student made a resolution for the new year.</p>';
    const main = document.querySelector("main");
    main.append(details, separate, senses);
    return { text: details.textContent, separate: separate.textContent };
  });
  const first = page.locator("#vocabulary-matching-fixture");
  const second = page.locator("#vocabulary-second-unit");
  const expected = ["inhibit", "competitive-inhibition", "non-competitive-inhibition", "covalent-bond"];
  await second.locator("button[data-vocabulary-term]").waitFor();
  assert.deepEqual(await readTerms(first), [], "Closed disclosures remain untouched");
  await first.locator("summary").click();
  await first.locator('button[data-vocabulary-term="non-competitive-inhibition"]').waitFor();
  assert.deepEqual(await readTerms(first), expected);
  assert.deepEqual(await readTerms(second), ["competitive-inhibition"], "A new section can highlight the term again");
  const phrase = first.locator('button[data-vocabulary-term="competitive-inhibition"]');
  assert.equal(await phrase.innerText(), "Competitive inhibition");
  assert.equal(await phrase.locator("b").innerText(), "Competitive", "A multi-word trigger preserves partial emphasis");
  assert.equal(await first.locator("a button, button button, [hidden] button").count(), 0);
  assert.equal(await first.textContent(), fixture.text);
  assert.equal(await second.textContent(), fixture.separate);
  const senses = page.locator("#vocabulary-context-fixture");
  assert.deepEqual(await readTerms(senses), ["microscopy-resolution", "instrument-resolution"]);
  await first.locator("summary").click();
  await first.locator("summary").click();
  assert.deepEqual(await readTerms(first), expected, "Reopening does not duplicate controls");
  await wordHelp(page).click();
  await moreHelp(page).uncheck();
  assert.equal(await first.locator('button[data-vocabulary-term="covalent-bond"]').count(), 0);
  assert.equal(await first.locator("em").innerText(), "covalent", "Clearing the trigger preserves emphasis");
  await panel(page).getByRole("button", { name: "Use activity default" }).click();
  assert.equal(await first.locator('button[data-vocabulary-term="covalent-bond"] em').innerText(), "covalent");
  assert.equal(await first.textContent(), fixture.text);
}

async function checkDesktop(page) {
  await page.goto(course + "#exam-interpret");
  await page.getByText("Choose a sequence", { exact: true }).click();
  await page.getByRole("button", { name: "Select and use evidence", exact: true }).click();
  await page.getByRole("button", { name: "See worked example", exact: true }).click();
  const term = trigger(page, "interstitial-fluid");
  await term.press("Enter");
  const passage = term.locator("..");
  const [passageBounds, panelBounds] = await Promise.all([passage.boundingBox(), panel(page).boundingBox()]);
  assert(passageBounds.x + passageBounds.width <= panelBounds.x + 2, "Desktop panel leaves room for the original passage");
  assert.equal(await panel(page).getAttribute("data-modal"), null);
  assert.match(await panel(page).innerText(), /spaces|between/);
  assert.match(await panel(page).innerText(), /tissue fluid/i);
  await capture(page, "desktop");
  await checkOpenPanelAccessibility(page);
  await page.keyboard.press("Escape");
  assert(await term.evaluate(button => button === document.activeElement));
  assert.equal(await term.getAttribute("aria-expanded"), "false");
  await term.press("Enter");
  const panelId = await panel(page).getAttribute("id");
  const anotherTerm = trigger(page, "water-potential").first();
  await anotherTerm.press("Enter");
  assert.equal(await panel(page).getAttribute("id"), panelId, "Another selection reuses the side panel");
  assert.match(await panel(page).getByRole("heading").innerText(), /water potential/i);
  assert.equal(await term.getAttribute("aria-expanded"), "false");
  await page.keyboard.press("Escape");
  assert(await anotherTerm.evaluate(button => button === document.activeElement));
}

async function checkPhone(page) {
  await page.goto(course + "#catchup-a1-monopoly");
  const term = trigger(page, "hydrolysis").first();
  await term.waitFor();
  await term.scrollIntoViewIfNeeded();
  const scroll = await page.evaluate(() => scrollY);
  await term.tap();
  const sheet = panel(page);
  const bounds = await sheet.boundingBox();
  assert.equal(await sheet.getAttribute("data-modal"), "");
  assert(bounds.y > 0 && Math.abs(bounds.y + bounds.height - 844) < 3, "Phone sheet is anchored to the bottom");
  assert.match(await sheet.locator(".vocabulary-excerpt").innerText(), /hydrolysis/i);
  assert.match(await sheet.innerText(), /water.*break.*bond/i);
  // Chromium briefly paints the touch highlight for the trigger behind the sheet.
  await page.waitForTimeout(350);
  await capture(page, "phone");
  await checkOpenPanelAccessibility(page);
  await closeHelp(page).tap();
  assert(Math.abs(await page.evaluate(() => scrollY) - scroll) <= 2, "Dismissing returns to the same reading position");
  await page.setViewportSize({ width: 320, height: 720 });
  await page.addStyleTag({ content: "html { font-size: 125% !important; } body { font-size: 125% !important; }" });
  await term.tap();
  assert(await closeHelp(page).isVisible());
  assert(await sheet.evaluate(node => node.scrollWidth <= node.clientWidth + 2));
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2));
  await page.keyboard.press("Escape");
  await sheet.waitFor({ state: "hidden" });
  assert(await term.evaluate(button => button === document.activeElement));
}

async function checkAssessment(page) {
  await page.evaluate(({ key, state }) => localStorage.setItem(key, JSON.stringify(state)), {
    key: progressKey, state: { tier: "F", quick: false, sound: false, best: {} }
  });
  await page.goto(course + "#lesson-a1-monopoly");
  await page.reload();
  const correct = page.locator('#qf input[type="radio"][value="0"]');
  const question = page.locator("#qf legend");
  const check = page.locator("#act");
  for (let i = 0; i < 3; i++) {
    assert.doesNotMatch(await question.innerText(), /what is a hydrolysis reaction/i);
    await correct.check();
    await check.click();
    await check.click();
  }
  assert.match(await question.innerText(), /what is a hydrolysis reaction/i);
  await wordHelp(page).click();
  await search(page).fill("monomer");
  assert.equal(await panel(page).locator(".vocabulary-result").count(), 0, "Lookup cannot search unrelated answer-bearing entries");
  await search(page).fill("hydrolysis");
  await panel(page).getByRole("button", { name: "Hydrolysis", exact: true }).click();
  const reveal = panel(page).getByRole("button", { name: "Show definition with help" });
  assert.equal(await reveal.count(), 1);
  assert.doesNotMatch(await panel(page).innerText(), /water.*break.*bond/i, "Lookup applies the target-knowledge gate");
  await closeHelp(page).click();
  await correct.check();
  await trigger(page, "hydrolysis").first().press("Space");
  assert(await correct.isChecked(), "Opening help keeps the chosen answer");
  assert.doesNotMatch(await panel(page).innerText(), /water.*break.*bond/i, "Inline definition applies the same gate");
  await capture(page, "target-help");
  await reveal.click();
  assert.match(await panel(page).innerText(), /water.*break.*bond/i);
  await closeHelp(page).click();
  await check.click();
  assert.match(await page.locator("#fb").innerText(), /quick check is next/i, "The existing supported-answer path runs");
  await check.click();
  assert.match(await question.innerText(), /now in exam wording.*hydrolysis/i);
  await trigger(page, "hydrolysis").first().press("Enter");
  assert(await reveal.isVisible());
  await closeHelp(page).click();
  await correct.check();
  await check.click();
  assert.doesNotMatch(await page.locator("#fb").innerText(), /quick check is next/i, "Dismissing the gate does not report assistance");

  await page.goto(course + "#exam-evidence");
  await page.getByRole("button", { name: "Go straight to questions", exact: true }).click();
  const answer = page.getByRole("textbox", { name: "Your answer (%)", exact: true });
  await answer.fill("2");
  await wordHelp(page).click();
  await search(page).fill("immersion");
  await panel(page).getByRole("button", { name: "Immerse", exact: true }).click();
  assert.match(await panel(page).innerText(), /liquid/i);
  await closeHelp(page).click();
  await trigger(page, "immerse").press("Enter");
  assert.match(await panel(page).innerText(), /liquid/i);
  assert.equal(await reveal.count(), 0, "Incidental vocabulary opens directly");
  await capture(page, "incidental-help");
  await closeHelp(page).click();
  assert.equal(await answer.inputValue(), "2");
  await page.reload();
  assert.equal(await answer.inputValue(), "2", "The existing assessment draft still resumes");
  await answer.fill("25");
  await page.getByRole("button", { name: "Check", exact: true }).click();
  const state = await page.evaluate(key => JSON.parse(localStorage.getItem(key)).evidence, examKey);
  assert.equal(state.outcomes[1], "independent", "Incidental lookup preserves independent evidence");
}

async function checkStandaloneEvidence(page) {
  await page.goto(course + "evidence/");
  const term = trigger(page, "germination");
  await term.press("Enter");
  assert.match(await panel(page).innerText(), /seed.*grow/i);
  assert.equal(await panel(page).locator(".vocabulary-catchup").count(), 0, "Active independent evidence stays in the task");
  await closeHelp(page).click();
  await wordHelp(page).click();
  await search(page).fill("hydrolysis");
  assert.equal(await panel(page).locator(".vocabulary-result").count(), 0);
  await closeHelp(page).click();
  assert.equal(await page.locator("article details[open]").count(), 0, "Definitions leave model answers hidden");
}

try {
  const desktop = await createPage({ viewport: { width: 1280, height: 900 } });
  const phone = await createPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await checkPreference(desktop);
  await checkMatching(desktop);
  await checkDesktop(desktop);
  await checkPhone(phone);
  await checkAssessment(desktop);
  await checkStandaloneEvidence(desktop);
  assert.deepEqual(errors, [], "Vocabulary journeys produced no JavaScript errors");
  console.log("A-level word help passed: selective and increased support, saved preference, matching and reading position, desktop and phone panels, and independent and assisted assessment.");
} finally {
  await browser.close();
  server.close();
}

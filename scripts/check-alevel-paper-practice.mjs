import assert from "node:assert/strict";
import axe from "axe-core";
import { chromium, firefox, webkit } from "playwright";
import { pathToFileURL } from "node:url";
import { servePublic } from "./browser-test-site.mjs";

const storageKey = "keystone.alevel.exam-skills.v1";
const entries = {
  passages: "/alevel/#paper-p2",
  investigations: "/alevel/evidence/",
  essaywriting: "/alevel/#topic-p3w",
};

function checkInvestigationData({ evidence, model, tasks }) {
  const rows = evidence[2];
  const means = [1, 2].map(column =>
    rows.reduce((sum, row) => sum + Number(row[column]), 0) / rows.length);
  for (const mean of means) assert(model[1].includes("= " + mean.toFixed(1)));

  const [mass, meadow] = tasks.slice(2);
  for (const humidity of ["35", "80"]) {
    const pair = mass.evidence[2].filter(row => row[0] === humidity);
    const meanFor = spray => Number(pair.find(row => row[1] === spray)[2]);
    const percent = Math.round((1 - meanFor("Film") / meanFor("Carrier")) * 100) + "%";
    assert(mass.modelAnswer.join(" ").includes(percent), humidity + "% model calculation");
    assert(mass.points.some(point => point.includes(percent)), humidity + "% review criterion");
  }
  for (const [, before, after] of meadow.evidence[2]) {
    assert.equal(parseInt(after, 10) / parseInt(before, 10), 2, "Sightings doubled in each meadow");
  }
}

async function audit(page, stage) {
  await page.addScriptTag({ content: axe.source });
  const violations = await page.evaluate(async () => (await window.axe.run({
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] },
  })).violations.map(rule => [rule.id, rule.nodes.map(node => node.target)]));
  assert.deepEqual(violations, [], stage);
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), stage + " overflows");
}

async function checkScrollableTable(page, task) {
  const practice = page.locator(".al-practice");
  const wrap = practice.locator(".al-table");
  const heading = practice.locator(".al-stimulus-heading");
  await page.setViewportSize({ width: 960, height: 780 });
  await practice.locator(".al-table:not([tabindex])").waitFor();
  assert(await wrap.evaluate(el => el.scrollWidth <= el.clientWidth));
  await heading.focus();
  await page.keyboard.press("Tab");
  assert(await practice.getByRole("textbox").evaluate(el => el === document.activeElement));

  await page.setViewportSize({ width: 320, height: 780 });
  const enlarged = await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  const region = practice.getByRole("region", { name: task.evidence[0], exact: true });
  await region.waitFor();
  assert(await region.evaluate(el => el.scrollWidth > el.clientWidth));
  await heading.focus();
  await page.keyboard.press("Tab");
  assert(await region.evaluate(el => el === document.activeElement &&
    getComputedStyle(el).outlineStyle !== "none" && parseFloat(getComputedStyle(el).outlineWidth) > 0));
  await page.keyboard.press("ArrowRight");
  await page.waitForFunction(() => document.querySelector(".al-practice .al-table").scrollLeft > 0);
  await page.keyboard.press("Tab");
  assert(await practice.getByRole("textbox").evaluate(el => el === document.activeElement));
  await audit(page, "investigation table at 320px with enlarged text");
  await enlarged.evaluate(el => el.remove());
}

async function checkTask(page, task) {
  const practice = page.locator(".al-practice");
  const stimulus = practice.locator(".al-task-stimulus");
  await practice.getByRole("heading", { name: task.prompt, exact: true }).waitFor();
  if (task.essayTitle) await stimulus.getByText(task.essayTitle, { exact: true }).waitFor();
  for (const paragraph of task.passage || []) {
    await stimulus.getByText(paragraph, { exact: true }).waitFor();
  }
  assert(await practice.evaluate(section => {
    const context = section.querySelector(".al-task-stimulus");
    const question = section.querySelector(".al-task-prompt");
    const response = section.querySelector("textarea");
    return Boolean(context.compareDocumentPosition(question) & Node.DOCUMENT_POSITION_FOLLOWING) &&
      Boolean(question.compareDocumentPosition(response) & Node.DOCUMENT_POSITION_FOLLOWING);
  }), "Read the stimulus, the question and then the response field");
}

async function checkUncued(page, task) {
  const main = page.locator("main");
  await checkTask(page, task);
  await main.getByRole("heading", { name: /Independent question/ }).waitFor();
  assert.equal(await main.getByRole("textbox", { name: "Your response" }).inputValue(), "");
  assert.equal(await main.locator("select, input[type=radio], input[type=checkbox], .al-criteria, .al-highlight-cell, .al-model").count(), 0);
  assert.equal(await main.getByText("Review the worked example", { exact: true }).count(), 0);
  assert.equal(await main.getByRole("button", { name: /clue/i }).count(), 0);
  const visible = await main.innerText();
  if (task.evidence) {
    const [caption, headers, rows] = task.evidence;
    const table = main.locator(".al-task-stimulus").getByRole("table", { name: caption, exact: true });
    assert.deepEqual(await table.getByRole("columnheader").allTextContents(), headers);
    for (let i = 0; i < rows.length; i++) {
      assert.deepEqual(await table.getByRole("row").nth(i + 1).locator("th,td").allTextContents(), rows[i]);
    }
  }
  for (const cue of [...task.points, ...task.repairs, ...[].concat(task.modelAnswer)]) {
    assert(!visible.includes(cue), "Independent task disclosed a review cue: " + cue);
  }
}

async function compareLowerCriterion(form, fields, original) {
  const excerpt = form.getByRole("region", { name: "Your first draft", exact: true });
  await excerpt.waitFor();
  assert.equal(await excerpt.textContent(), original);
  assert(await excerpt.evaluate(el => el.scrollHeight > el.clientHeight && el.tabIndex === 0));
  await excerpt.press("ArrowDown");
  await form.page().waitForFunction(() => document.querySelector(".al-draft-text").scrollTop > 0);
  await fields.last().locator("legend").evaluate(el => el.scrollIntoView({ block: "center" }));
  const positions = await form.evaluate(el => {
    const heading = el.querySelector(".al-first-draft h3");
    const legend = [...el.querySelectorAll(".al-criteria legend")].at(-1);
    const uncovered = node => {
      const rect = node.getBoundingClientRect();
      return node.contains(document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2));
    };
    const reference = el.querySelector(".al-first-draft").getBoundingClientRect();
    const lastCriterion = legend.getBoundingClientRect();
    return { top: reference.top, bottom: reference.bottom, criterionTop: lastCriterion.top,
      criterionBottom: lastCriterion.bottom, viewport: innerHeight, uncovered: uncovered(heading) && uncovered(legend) };
  });
  assert(positions.uncovered && positions.top >= 0 && positions.bottom <= positions.criterionTop &&
    positions.criterionBottom <= positions.viewport, "Draft and lower criterion must both be readable: " + JSON.stringify(positions));
}

async function checkLargeTextSelection(form, fields, revision, revisionSummary) {
  const page = form.page();
  const count = await fields.count();
  // Selecting the final criterion is the first interaction. Preparatory scrolling
  // would mask scroll anchoring when the newly selected repair expands.
  const last = fields.last();
  await last.getByRole("radio", { name: "Needs work", exact: true }).check();
  await last.locator(".al-repair").waitFor();
  const positions = await last.evaluate(async field => {
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const reference = document.querySelector(".al-first-draft").getBoundingClientRect();
    const radio = field.querySelector("input:checked").getBoundingClientRect();
    const repair = field.querySelector(".al-repair").getBoundingClientRect();
    return { referenceBottom: reference.bottom, radioTop: radio.top, radioBottom: radio.bottom,
      repairTop: repair.top, viewport: innerHeight };
  });
  assert(positions.radioTop >= positions.referenceBottom && positions.radioBottom <= positions.viewport &&
    positions.repairTop >= positions.referenceBottom && positions.repairTop < positions.viewport,
    "First selection of the final criterion at 200% text: " + JSON.stringify(positions));
  await revisionSummary.press("Enter");
  await page.keyboard.press("Tab");
  assert(await revision.evaluate(el => el === document.activeElement));
  const visited = new Set();
  for (let i = 0; i < count + 6; i++) {
    await page.keyboard.press("Shift+Tab");
    const focused = await form.evaluate(async el => {
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const control = document.activeElement;
      if (control.matches(".al-draft-text")) return { original: true };
      const bounds = control.getBoundingClientRect();
      const front = document.elementFromPoint(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
      return { name: control.name || control.textContent, visible: control.contains(front),
        top: bounds.top, stickyBottom: el.querySelector(".al-first-draft").getBoundingClientRect().bottom };
    });
    if (focused.original) break;
    assert(focused.visible && focused.top >= focused.stickyBottom, "Reverse tab at 200%: " + JSON.stringify(focused));
    visited.add(focused.name);
  }
  assert(visited.has("Compare with a model explanation"));
  for (let j = 0; j < count; j++) assert(visited.has("criterion-" + j), "Keyboard skipped criterion " + j);
  await revisionSummary.press("Enter");
}

async function review(page, task, { revise = false, zoomRepair = false } = {}) {
  const form = page.locator(".al-practice form");
  const original = revise ? [
    "The observations suggest an explanation. I need to check whether both parts of the question follow from the biological process I have described.",
    "There is still a step in my reasoning that I cannot explain. I want to read that part of my first response while deciding which criterion needs work.",
    "Before changing my conclusion I would like to compare it with what was actually measured. A different explanation might also account for the result.",
  ].join("\n\n") : "I would like to check the biological explanation in this draft.";
  const revised = original + "\n\nI have now reconsidered how the observations support my explanation.";
  const viewport = page.viewportSize();
  let enlarged;
  if (zoomRepair) {
    await page.setViewportSize({ width: 320, height: 700 });
    enlarged = await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  }
  await form.getByRole("textbox", { name: "Your response", exact: true }).fill(original);
  await form.getByRole("button", { name: "Compare with the checklist", exact: true }).press("Enter");
  const firstHeading = form.getByRole("heading", { name: "Your first draft", exact: true });
  await firstHeading.waitFor();
  const reference = form.locator(".al-draft-text");
  assert.equal(await reference.textContent(), original);
  const revisionSummary = form.getByText("Revise your response", { exact: true });
  const revision = form.getByRole("textbox", { name: "Your revised response", exact: true });
  assert.equal(await revision.count(), 0, "Revision starts collapsed");
  const fields = form.locator(".al-criteria fieldset");
  assert.equal(await fields.count(), task.points.length);
  assert(await form.evaluate(el => {
    const draftText = el.querySelector(".al-draft-text p");
    const criteria = [...el.querySelectorAll(".al-criteria fieldset")];
    const revision = el.querySelector(".al-revision");
    return getComputedStyle(draftText).whiteSpace === "pre-wrap" &&
      Boolean(draftText.compareDocumentPosition(criteria[0]) & Node.DOCUMENT_POSITION_FOLLOWING) &&
      Boolean(criteria.at(-1).compareDocumentPosition(revision) & Node.DOCUMENT_POSITION_FOLLOWING);
  }), "Read the unaltered first draft, review the criteria, then optionally revise");
  if (zoomRepair) {
    await checkLargeTextSelection(form, fields, revision, revisionSummary);
    await enlarged.evaluate(el => el.remove());
    await page.setViewportSize(viewport);
  }
  for (let j = 0; j < task.points.length; j++) {
    const criterion = fields.nth(j);
    await criterion.getByText(task.points[j], { exact: true }).waitFor();
    await criterion.getByRole("radio", { name: revise && j === 0 ? "Needs work" : "Included", exact: true }).check();
  }
  if (revise) {
    await compareLowerCriterion(form, fields, original);
    await audit(page, "mobile first draft and criteria");
    const pending = await page.evaluate(key => {
      const record = JSON.parse(localStorage.getItem(key))[location.hash.slice("#exam-".length)];
      return { original: record.reviews[record.index].original, outcome: record.outcomes[record.index],
        attempts: record.attempts[record.index], modelRead: record.reviews[record.index].modelRead };
    }, storageKey);
    assert.deepEqual(pending, { original, outcome: undefined, attempts: 1, modelRead: undefined });
    const question = page.getByText("Reread the question", { exact: true });
    assert.equal(await page.locator(".al-task-prompt").isVisible(), false);
    await question.press("Enter");
    await checkTask(page, task);
    await question.press("Enter");
    await form.getByText(task.repairs[0], { exact: true }).waitFor();
    for (const repair of task.repairs.slice(1)) {
      assert.equal(await form.getByText(repair, { exact: true }).isVisible(), false, "Unrequested criterion support visible");
    }
    await form.getByText("Compare with a model explanation", { exact: true }).press("Enter");
    for (const paragraph of [].concat(task.modelAnswer)) {
      await form.getByText(paragraph, { exact: true }).waitFor();
    }
    await revisionSummary.press("Enter");
    await page.keyboard.press("Tab");
    assert(await revision.evaluate(element => element === document.activeElement));
    assert.equal(await revision.inputValue(), original);
    await revision.fill(revised);
    assert.equal(await reference.textContent(), original);
    await page.keyboard.press("Tab");
    assert(await form.getByRole("button", { name: "Finish review" }).evaluate(element => element === document.activeElement));
    await page.reload();
    assert.equal(await revision.inputValue(), revised);
    assert.equal(await reference.textContent(), original);
    await form.getByText(task.repairs[0], { exact: true }).waitFor();
    await fields.first().getByRole("radio", { name: "Included" }).check();
    assert.equal(await form.getByText(task.repairs[0], { exact: true }).isVisible(), false);
  }
  await form.getByRole("button", { name: "Finish review", exact: true }).press("Enter");
  const checklist = form.getByText("Review your checklist", { exact: true });
  await checklist.waitFor();
  assert.equal(await fields.first().isVisible(), false);
  const saved = form.getByRole("textbox", { name: revise ? "Your revised response" : "Your response", exact: true });
  assert(await saved.evaluate(el => el.readOnly));
  assert.equal(await saved.inputValue(), revise ? revised : original);
  await checklist.press("Enter");
  assert(await reference.isVisible());
  assert.equal(await reference.textContent(), original);
  assert.equal(await fields.locator("input:checked").count(), task.points.length);
  await checklist.press("Enter");
  return { original, revised };
}

export async function checkALevelPaperPractice(browser, base) {
  for (const [family, entry] of Object.entries(entries)) {
    const page = await browser.newPage({ viewport: { width: 320, height: 780 }, reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    const practice = page.locator(".al-practice");
    const button = name => page.getByRole("button", { name, exact: true });
    const state = () => page.evaluate(([key, family]) => JSON.parse(localStorage.getItem(key))[family], [storageKey, family]);
    try {
      await page.goto(base + entry);
      await page.locator('main a[href$="#exam-' + family + '"]').first().press("Enter");
      await button("Try an independent question").waitFor();
      const data = await page.evaluate(id => window.ALevelPaperPractice[id], family);
      assert.deepEqual(data.tasks.map(task => Boolean(task.guided)), [true, true, false, false]);
      assert.equal(new Set(data.tasks.map(task => JSON.stringify([task.essayTitle, task.prompt]))).size, 4);
      if (family === "essaywriting") {
        assert(data.tasks.every(task => task.essayTitle && !task.prompt.includes(task.essayTitle)));
      }
      if (family === "investigations") checkInvestigationData(data);
      const legacy = { index: 1, outcomes: { 0: "guided" }, responses: { 0: [1] } };
      await page.evaluate(([key, legacy]) => {
        const stored = JSON.parse(localStorage.getItem(key)) || {};
        stored.osmosis = legacy;
        localStorage.setItem(key, JSON.stringify(stored));
      }, [storageKey, legacy]);

      await button("Try an independent question").press("Enter");
      const [first, second] = data.tasks.slice(2);
      await checkUncued(page, first);
      assert(await practice.locator(".al-stimulus-heading").evaluate(element => element === document.activeElement));
      await page.keyboard.press("Tab");
      if (await practice.locator(".al-table:focus").count()) await page.keyboard.press("Tab");
      assert(await practice.getByRole("textbox").evaluate(element => element === document.activeElement));
      await audit(page, family + " independent");
      if (family === "investigations") {
        const before = await state();
        await checkScrollableTable(page, first);
        assert.deepEqual(await state(), before);
      }
      await button("Compare with the checklist").press("Enter");
      assert.equal(await practice.locator(".al-criteria").count(), 0);
      assert.equal((await state()).outcomes[2], undefined);
      const zoomRepair = family === "investigations";
      const { original, revised } = await review(page, first, { revise: true, zoomRepair });
      const saved = await state();
      assert.equal(saved.outcomes[2], "self-reviewed");
      assert.equal(saved.reviews[2].original, original);
      assert.equal(saved.drafts[2], revised);
      assert.equal(saved.attempts[2], 2);
      assert.equal(saved.reviews[2].modelRead, true);
      const repairsSeen = { 0: 1 };
      if (zoomRepair) repairsSeen[first.points.length - 1] = 1;
      assert.deepEqual(saved.reviews[2].repairsSeen, repairsSeen);
      await audit(page, family + " written feedback");

      await button("Try a different question").press("Enter");
      await checkUncued(page, second);
      await page.reload();
      await checkUncued(page, second);
      await review(page, second);
      const finished = await state();
      assert.deepEqual(finished.outcomes, { 2: "self-reviewed", 3: "self-reviewed" });
      assert.equal(finished.attempts[3], 1);
      assert.equal(finished.reviews[3].modelRead, undefined);
      assert.deepEqual(finished.reviews[3].repairsSeen || {}, {});
      assert.equal(finished.modelAssists[3], undefined);
      assert.equal(await practice.getByText("Correct!", { exact: true }).count(), 0);
      assert.deepEqual(await page.evaluate(key => JSON.parse(localStorage.getItem(key)).osmosis, storageKey), legacy);
      if (family === "essaywriting") {
        await button("Review progress").press("Enter");
        await button("Review the worked example").press("Enter");
        assert.equal(await button("Try an independent question").count(), 0);
        for (let i = 1; i < data.model.length; i++) await button("Next step").press("Enter");
        await button("Try with support").press("Enter");
        await practice.getByRole("heading", { name: data.tasks[0].prompt, exact: true }).waitFor();
        assert.deepEqual((await state()).outcomes, { 2: "self-reviewed", 3: "self-reviewed" });
      }

      // A fresh pupil can follow the worked and faded route to the same unseen application.
      const guided = await browser.newPage({ viewport: { width: 390, height: 844 } });
      try {
        await guided.goto(base + "/alevel/#exam-" + family);
        await guided.getByRole("button", { name: "See worked example", exact: true }).press("Enter");
        const example = guided.locator(".al-model");
        for (let i = 0; i < data.model.length; i++) {
          if (i) await guided.getByRole("button", { name: "Next step", exact: true }).press("Enter");
          const presented = await example.innerText();
          const passage = [].concat(data.modelStimulus);
          const sequence = [...passage, data.modelQuestion, data.model[i]];
          let last = -1;
          for (const text of sequence) {
            const here = presented.indexOf(text);
            assert(here > last, family + " model must show the stimulus, question and current reasoning in order");
            last = here;
          }
          await example.getByRole("heading", { name: data.modelQuestion, exact: true }).waitFor();
          await example.locator(".al-step").getByText(data.model[i], { exact: true }).waitFor();
        }
        await guided.getByRole("button", { name: "Try with support", exact: true }).press("Enter");
        for (const [i, task] of data.tasks.slice(0, 2).entries()) {
          await checkTask(guided, task);
          await review(guided, task);
          const next = i === 0 ? "Next task" : "Try a different question";
          await guided.getByRole("button", { name: next, exact: true }).press("Enter");
        }
        await checkUncued(guided, first);
        if (family === "passages") {
          const partial = "I can identify one result but cannot explain the second result.";
          await guided.getByRole("textbox").fill(partial);
          await guided.getByRole("button", { name: "Work through an example" }).press("Enter");
          await guided.reload();
          await guided.getByRole("button", { name: "Try an independent question" }).press("Enter");
          await checkUncued(guided, second);
          const record = await guided.evaluate(key => JSON.parse(localStorage.getItem(key)).passages, storageKey);
          assert.equal(record.modelAssists[2], true);
          assert.equal(record.reviews[2].original, partial);
          assert.equal(record.outcomes[2], undefined);
          await guided.getByRole("button", { name: "Work through an example" }).press("Enter");
          assert.equal(await guided.getByRole("button", { name: "Try an independent question" }).count(), 0);
          await guided.getByRole("button", { name: "Return to your response" }).press("Enter");
          assert.equal(await guided.getByRole("textbox").inputValue(), partial);
          assert.equal(await guided.getByRole("heading", { name: /Independent question/ }).count(), 0);
        }
      } finally {
        await guided.close();
      }
      assert.deepEqual(errors, [], family);
    } finally {
      await page.close();
    }
  }
  console.log("A-level paper practice: worked and direct routes, unseen reassessment, draft integrity and accessibility passed.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const engine = process.argv[2];
  const type = { chromium, firefox, webkit }[engine];
  assert(type, "Choose chromium, firefox or webkit");
  const { server, base } = await servePublic();
  let browser;
  try {
    browser = await type.launch();
    await checkALevelPaperPractice(browser, base);
  } finally {
    await browser?.close();
    await new Promise(done => server.close(done));
  }
}

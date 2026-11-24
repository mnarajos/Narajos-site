import assert from "node:assert/strict";
import axe from "axe-core";

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

async function checkUncued(page, task) {
  const main = page.locator("main");
  await main.getByRole("heading", { name: task.prompt, exact: true }).waitFor();
  assert.equal(await main.getByRole("textbox").inputValue(), "");
  assert.equal(await main.locator("select, input[type=radio], input[type=checkbox], .al-criteria, .al-highlight-cell, .al-model").count(), 0);
  assert.equal(await main.getByText("Review the worked example", { exact: true }).count(), 0);
  assert.equal(await main.getByRole("button", { name: /clue/i }).count(), 0);
  const visible = await main.innerText();
  for (const paragraph of task.passage || []) assert(visible.includes(paragraph), "Missing passage evidence");
  if (task.evidence) {
    const [caption, headers, rows] = task.evidence;
    const table = main.getByRole("table", { name: caption, exact: true });
    assert.deepEqual(await table.getByRole("columnheader").allTextContents(), headers);
    for (let i = 0; i < rows.length; i++) {
      assert.deepEqual(await table.getByRole("row").nth(i + 1).locator("th,td").allTextContents(), rows[i]);
    }
  }
  for (const cue of [...task.points, ...task.repairs, ...[].concat(task.modelAnswer)]) {
    assert(!visible.includes(cue), "Independent task disclosed a review cue: " + cue);
  }
}

async function review(page, task, { revise = false } = {}) {
  const form = page.locator(".al-practice form");
  const draft = form.getByRole("textbox");
  const original = "I would like to check the biological explanation in this draft.";
  const revised = original + " I have now reconsidered my reasoning.";
  await draft.fill(original);
  await form.getByRole("button", { name: "Compare with the checklist", exact: true }).press("Enter");
  const fields = form.locator(".al-criteria fieldset");
  assert.equal(await fields.count(), task.points.length);
  for (let j = 0; j < task.points.length; j++) {
    const criterion = fields.nth(j);
    await criterion.getByText(task.points[j], { exact: true }).waitFor();
    await criterion.getByRole("radio", { name: revise && j === 0 ? "Needs work" : "Included", exact: true }).check();
  }
  if (revise) {
    await form.getByText(task.repairs[0], { exact: true }).waitFor();
    for (const repair of task.repairs.slice(1)) {
      assert.equal(await form.getByText(repair, { exact: true }).isVisible(), false, "Unrequested criterion support visible");
    }
    await form.getByText("Compare with a model explanation", { exact: true }).click();
    for (const paragraph of [].concat(task.modelAnswer)) {
      await form.getByText(paragraph, { exact: true }).waitFor();
    }
    await draft.fill(revised);
    await page.reload();
    assert.equal(await draft.inputValue(), revised);
    await form.getByText("Read your first draft", { exact: true }).click();
    await form.getByText(original, { exact: true }).waitFor();
    await form.getByText(task.repairs[0], { exact: true }).waitFor();
  }
  await form.getByRole("button", { name: "Finish review", exact: true }).press("Enter");
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
      assert.equal(new Set(data.tasks.map(task => task.prompt)).size, 4);
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
      assert(await practice.locator(".al-task-prompt").evaluate(element => element === document.activeElement));
      await audit(page, family + " independent");
      await button("Compare with the checklist").press("Enter");
      assert.equal(await practice.locator(".al-criteria").count(), 0);
      const { original, revised } = await review(page, first, { revise: true });
      const saved = await state();
      assert.equal(saved.outcomes[2], "self-reviewed");
      assert.equal(saved.reviews[2].original, original);
      assert.equal(saved.drafts[2], revised);
      assert.equal(saved.attempts[2], 2);
      assert.equal(saved.reviews[2].modelRead, true);
      assert.deepEqual(saved.reviews[2].repairsSeen, { 0: 1 });
      await audit(page, family + " written feedback");

      await button("Try a different question").press("Enter");
      await checkUncued(page, second);
      await page.reload();
      await checkUncued(page, second);
      await review(page, second);
      assert.equal((await state()).outcomes[3], "self-reviewed");
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
        for (let i = 1; i < data.model.length; i++) {
          await guided.getByRole("button", { name: "Next step", exact: true }).press("Enter");
        }
        await guided.getByRole("button", { name: "Try with support", exact: true }).press("Enter");
        for (const [i, task] of data.tasks.slice(0, 2).entries()) {
          await guided.getByRole("heading", { name: task.prompt, exact: true }).waitFor();
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

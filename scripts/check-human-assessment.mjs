import assert from "node:assert/strict";
import axe from "axe-core";

export async function checkHumanAssessment(browser, base) {
  const page = await browser.newPage({ viewport: { width: 320, height: 800 }, hasTouch: true });
  const root = base + "/human-biology/";
  const session = "narajos-human-challenge-v2-session";
  const method = session + "-mixed-method";
  const progress = "narajos-human-challenge-v2-progress";
  const flash = "narajos-human-biology-session-v1";
  const scheduler = "narajos-keystone-review-v1-ocr-human-biology-f170";
  const read = name => page.evaluate(key => JSON.parse(localStorage.getItem(key) || "null"), name);
  const action = name => page.locator('[data-k-action="' + name + '"]');
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const fits = () => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 3);

  try {
    await page.goto(root + "#challenge/f171/4.2.1");
    await page.locator(".k-question-view").waitFor();
    const originalRun = await read(session);
    const diagnostic = "p-health-screening-diagnostic";
    await page.evaluate(([key, old, id]) => localStorage.setItem(key, JSON.stringify({
      ...old, queue: [id], index: 0, answers: { [id]: { assessmentRevision: 1, optionOrder: [3, 1, 0, 2] } },
      first: {}, outcomes: {}, objectiveFirst: {}, retries: {}, hintsUsed: {}
    })), [session, originalRun, diagnostic]);
    await page.reload();
    const misleading = page.getByRole("radio", { name: /establishes disease and follow-up/ });
    assert.match(await misleading.locator("..").innerText(), /^B/);
    await misleading.locator("..").tap();
    assert.equal(await page.locator("[data-feedback-heading]").count(), 0, "Selection must not submit");
    await action("check").press("Enter");
    const note = page.getByText("A positive screen can be a false positive. Diagnosis investigates whether the condition is present.", { exact: true });
    await note.waitFor();
    assert(await page.locator("[data-feedback-heading]").evaluate(el => document.activeElement === el));
    await page.reload();
    await note.waitFor();
    assert.equal((await read(session)).outcomes[0], "incorrect");

    await page.getByRole("link", { name: "Revisit why a positive screen can be false" }).press("Enter");
    await page.locator("#leave-confirm").press("Enter");
    await page.getByText("False positive", { exact: true }).last().waitFor();
    const resume = page.getByRole("link", { name: "Return to your unfinished question set" });
    await resume.press("Enter");
    await note.waitFor();

    await page.goto(root + "?methods#challenge/f171/methods");
    await page.locator(".k-question-view").waitFor();
    const methods = await read(method);
    assert.equal(methods.queue.length, 6);
    await page.getByRole("radio", { name: /fall in count and the original count/ }).check();
    await action("check").press("Enter");
    await action("next").press("Enter");
    await page.locator("#k-number").fill("18");
    await action("check").press("Enter");
    await page.getByText("This uses 68 as the denominator. The baseline count is 80.", { exact: true }).waitFor();
    await action("next").press("Enter");
    await page.getByRole("img", { name: /Cumulative beats/ }).waitFor();
    await page.getByText("Graph values in a table", { exact: true }).press("Enter");
    await page.getByRole("table", { name: "Fictional cumulative heartbeat count" }).waitFor();
    await page.locator("#k-number").fill("90");
    await page.reload();
    assert.equal(await page.locator("#k-number").inputValue(), "90");
    await action("check").press("Enter");
    await page.getByRole("heading", { name: "Correct", exact: true }).waitFor();
    assert.equal((await read(method)).outcomes[2], "independent");
    for (const answer of ["75", "132"]) {
      await action("next").press("Enter");
      await page.locator("#k-number").fill(answer);
      await action("check").press("Enter");
      await page.getByRole("heading", { name: "Correct", exact: true }).waitFor();
    }
    assert.equal((await read(session)).queue[0], diagnostic);
    assert(await fits(), "Mixed-method practice overflows");

    await page.goto(root + "?case#challenge/f171/case-treatment-spread");
    await page.locator("#k-written").fill("Surgery can relieve local pressure. A systemic drug can reach deposits at distant sites.");
    await action("reveal").press("Enter");
    await page.getByText("Read responses A and B", { exact: true }).press("Enter");
    await page.getByText("Check your comparison", { exact: true }).press("Enter");
    await page.getByText("Conditional judgement", { exact: true }).waitFor();
    await page.locator("[data-review-criterion]").first().selectOption("work");
    const revised = page.getByLabel("Improve your answer", { exact: true });
    await revised.fill("Urgency of pressure symptoms can change which option takes priority.");
    await page.reload();
    assert.match(await revised.inputValue(), /urgency/i);
    await action("finish-review").press("Enter");
    await page.getByText(/Self-reviewed/).waitFor();
    assert.equal((await read(progress))["case-treatment-spread"].checked, 0);
    assert(await fits(), "Clinical self-review overflows");
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.getByText("Read responses A and B", { exact: true }).press("Enter");
    await page.getByText("Check your comparison", { exact: true }).press("Enter");
    await page.addScriptTag({ content: axe.source });
    const findings = await page.evaluate(async () => (await window.axe.run(".k-question-paper", {
      runOnly: ["wcag2a", "wcag2aa", "wcag21aa"]
    })).violations.map(rule => rule.id));
    assert.deepEqual(findings, []);

    await page.goto(root + "?flash#cards/f171-2.1");
    await page.getByRole("heading", { name: "Recall the biology" }).waitFor();
    const first = (await read(flash)).queue[0];
    await page.evaluate(([key, id]) => localStorage.setItem(key, JSON.stringify({
      v: 1, cards: { [id]: { seen: 8, good: 7, stage: 4, due: 9999999999999 } }
    })), [scheduler, first]);
    await page.reload();
    const gotIt = page.getByRole("button", { name: "Got it", exact: true });
    await page.getByRole("button", { name: "Reveal answer", exact: true }).press("Enter");
    assert(await gotIt.isHidden(), "A blank reveal must not count as recall");
    await page.reload();
    assert(await gotIt.isHidden(), "A refreshed blank reveal must not count as recall");
    assert.equal((await read(scheduler)).cards[first].good, 7);
    await page.getByRole("button", { name: "Not yet · show again", exact: true }).press("Enter");
    const second = (await read(flash)).queue[0];
    await page.getByRole("button", { name: "I recalled it without typing", exact: true }).press("Enter");
    await gotIt.press("Enter");
    assert.equal((await read(scheduler)).cards[second].good, 1);
    assert.deepEqual(errors, []);
    console.log("Batch 12: shuffled misconception feedback, mixed methods, case review and saved F171 retrieval passed.");
  } finally {
    await page.close();
  }
}

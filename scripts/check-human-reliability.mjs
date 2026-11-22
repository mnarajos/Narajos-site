import assert from "node:assert/strict";

export async function checkHumanReliability(browser, base, { touch = false, audit = "" } = {}) {
  const page = await browser.newPage({ viewport: { width: 320, height: 760 }, hasTouch: touch });
  const root = base + "/human-biology/", key = "narajos-human-challenge-v2-", errors = [];
  const read = name => page.evaluate(k => JSON.parse(localStorage.getItem(k) || "null"), key + name);
  const byAction = action => page.locator('[data-k-action="' + action + '"]');
  const option = value => page.locator('.k-option').filter({ has: page.locator('input[value="' + value + '"]') });
  const choose = async value => {
    if (touch) await option(value).tap(); else await option(value).click();
  };
  const fits = async () => assert((await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 3);
  page.on("pageerror", error => errors.push(error.message));

  try {
    await page.goto(root + "#challenge/f170/1.1.2");
    await page.locator(".k-question-view").waitFor();
    const main = await read("session");
    await page.goto(root + "?lesson#catchup/f171/4.2.1");
    const lesson = "catchup/f171/4.2.1", slot = "session-topic-f171/4.2.1";
    const practice = page.getByRole("link", { name: "Practise interpreting screening results", exact: true }).first();
    await practice.press("Enter");
    await page.locator(".k-question-view").waitFor();
    const contextual = await read(slot);
    assert.equal(contextual.scope, "4.2.1");
    assert.deepEqual((await read("session")).queue, main.queue);
    await page.getByRole("link", { name: "Return to the catch-up lesson" }).press("Enter");
    await page.locator("#leave-confirm").press("Enter");
    await page.waitForURL(url => url.hash === "#" + lesson);
    await practice.press("Enter");
    assert.deepEqual((await read(slot)).queue, contextual.queue);

    // Seed a fixed queue so the same choice and review can be reproduced in each engine.
    await page.evaluate(([key, contextual]) => {
      const state = { ...contextual, queue: ["p-health-screening-foundation", "health-screening"],
        answers: {}, index: 0, phase: "ask", first: {}, outcomes: {}, objectiveFirst: {},
        hintsUsed: {}, retries: {}, correctFirst: 0, guidedFirst: 0 };
      localStorage.setItem(key, JSON.stringify(state));
    }, [key + slot, contextual]);
    await page.reload();
    const id = "p-health-screening-foundation";
    const correct = await page.evaluate(id => window.KeystoneHumanChallenges.questions.find(q => q.id === id).correct, id);
    await choose(correct);
    assert.equal(await page.locator(".k-feedback").count(), 0);
    await choose((correct + 1) % 4);
    assert.equal(await page.locator(".k-feedback").count(), 0);
    await option(correct).getByRole("radio").focus();
    await page.keyboard.press("Space");
    assert.equal(await page.locator(".k-feedback").count(), 0);
    assert.equal(Object.keys((await read(slot)).first).length, 0);
    if (touch) await byAction("check").tap(); else await byAction("check").press("Enter");
    await page.getByRole("heading", { name: "Correct", exact: true }).waitFor();
    assert.equal(await page.locator("[data-feedback-heading]").evaluate(el => document.activeElement === el), true);
    await page.reload();
    assert.equal((await read(slot)).outcomes[0], "independent");
    assert.equal((await read("progress"))[id].checked, 1);
    await byAction("next").press("Enter");

    const original = "The screening result may be wrong.";
    const revision = original + " Diagnostic follow-up can check whether the person has the condition.";
    await page.locator("#k-written").fill(original);
    await byAction("reveal").press("Enter");
    await page.getByRole("heading", { name: "Your answer", exact: true }).waitFor();
    assert.equal(await page.locator(".k-review-draft").textContent(), original);
    await page.locator("[data-review-criterion]").first().selectOption("work");
    await page.getByLabel("Improve your answer", { exact: true }).fill(revision);
    assert.equal((await read(slot)).outcomes[1], undefined);
    await page.reload();
    assert.equal(await page.locator("[data-review-criterion]").first().inputValue(), "work");
    assert.equal(await page.getByLabel("Improve your answer", { exact: true }).inputValue(), revision);
    await fits();
    const style = await page.addStyleTag({ content: "html{font-size:125%} .k-question-paper {line-height:1.5;letter-spacing:.07em}" });
    await fits();
    await style.evaluate(el => el.remove());
    if (audit) {
      await page.addScriptTag({ content: audit });
      const issues = await page.evaluate(async () => (await window.axe.run(".k-question-paper", {
        runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]
      })).violations.map(rule => rule.id));
      assert.deepEqual(issues, []);
    }
    await byAction("finish-review").press("Enter");
    await page.reload();
    await page.getByRole("status").filter({ hasText: "Self-reviewed" }).waitFor();
    assert.equal((await read("progress"))["health-screening"].checked, 0);
    assert.equal((await read(slot)).outcomes[1], "review-needs-work");
    await byAction("next").press("Enter");
    await page.getByRole("heading", { name: "Practice complete" }).waitFor();
    assert.match(await page.locator(".k-done .lead").innerText(), /^1 of 1 objectively checked/);
    await page.reload();
    assert.match(await page.locator(".k-outcome-stats").innerText(), /self-reviewed\s+1/);
    assert.equal((await read("completed")).answers, undefined);
    assert.deepEqual((await read("session")).queue, main.queue);
    await page.goto(root + "?reset#home");
    page.once("dialog", dialog => dialog.accept());
    await Promise.all([
      page.waitForEvent("load"),
      page.getByRole("button", { name: "Clear progress on this device" }).press("Enter")
    ]);
    assert.equal(await read("session"), null);
    assert.equal(await read("completed"), null);
    assert.equal(await read("progress"), null);
    assert.deepEqual(errors, []);
  } finally {
    await page.close();
  }
}

import assert from "node:assert/strict";
import axe from "axe-core";

export async function checkALevelExam(browser, base) {
  const page = await browser.newPage({ viewport: { width: 320, height: 780 } });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  try {
    await page.goto(base + "/alevel/#exam");
    await page
      .getByRole("heading", { name: "Exam Skills", exact: true })
      .waitFor();
    const families = await page.evaluate(() =>
      Object.values(window.ALevelTeachingFamilies),
    );
    assert.equal(families.length, 10);
    const bank = await page.evaluate(() =>
      window.ALevelDrawingBank.bank.map((x) => ({
        id: x.id,
        defects: x.defects,
        criterion: x.criterion,
      })),
    );
    assert.equal(bank.length, 56);
    assert.equal(new Set(bank.map((x) => x.id)).size, 56);
    for (const family of families) {
      await page.goto(base + "/alevel/#exam-" + family.id);
      await page
        .getByRole("heading", { name: family.title, exact: true })
        .waitFor();
      assert(
        await page
          .getByRole("button", { name: "Previous step", exact: true })
          .isDisabled(),
      );
      for (let i = 1; i < family.model.length; i++)
        await page
          .getByRole("button", { name: "Next step", exact: true })
          .click();
      assert(
        await page
          .getByRole("button", { name: "Next step", exact: true })
          .isDisabled(),
      );
      await page
        .getByRole("button", { name: "Replay example", exact: true })
        .click();
      for (let i = 0; i < family.tasks.length; i++) {
        const q = family.tasks[i],
          form = page.locator(".al-teaching form");
        if (q.kind === "number")
          await form.locator("input[name=number]").fill(String(q.answer));
        if (q.kind === "choice")
          await form
            .getByRole("radio", { name: q.options[q.answer], exact: true })
            .check();
        if (q.kind === "multi")
          for (const a of q.answer)
            await form
              .getByRole("checkbox", { name: q.options[a], exact: true })
              .check();
        if (q.kind === "group")
          for (let j = 0; j < q.items.length; j++)
            await form
              .locator("select")
              .nth(j)
              .selectOption(String(q.items[j][1]));
        if (q.kind === "writing")
          await form
            .getByRole("textbox")
            .fill(
              "A scientific explanation to compare with the listed causal points.",
            );
        await form
          .getByRole("button", {
            name:
              q.kind === "writing"
                ? "Compare with the checklist"
                : "Check answer",
            exact: true,
          })
          .click();
        await form
          .getByRole("button", {
            name:
              i === family.tasks.length - 1 ? "Review this set" : "Next task",
            exact: true,
          })
          .waitFor();
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 3,
          ),
          family.id + " overflows",
        );
        if (i < family.tasks.length - 1)
          await form
            .getByRole("button", { name: "Next task", exact: true })
            .click();
      }
    }
    // A hint remains support after reload. A correction is separate from an independent answer.
    await page.evaluate(() =>
      localStorage.removeItem("keystone.alevel.exam-skills.v1"),
    );
    await page.goto(base + "/alevel/#exam-hardy");
    await page
      .getByRole("button", { name: "Need a clue?", exact: true })
      .click();
    await page.getByRole("textbox").fill("0.4");
    await page.reload();
    assert.equal(await page.getByRole("textbox").inputValue(), "0.4");
    await page
      .getByRole("button", { name: "Check answer", exact: true })
      .click();
    await page.getByRole("button", { name: "Next task", exact: true }).click();
    await page.getByRole("textbox").fill("0.2");
    await page
      .getByRole("button", { name: "Check answer", exact: true })
      .click();
    await page.getByRole("textbox").fill("0.32");
    await page
      .getByRole("button", { name: "Check answer", exact: true })
      .click();
    const outcomes = await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("keystone.alevel.exam-skills.v1")).hardy
          .outcomes,
    );
    assert.deepEqual(outcomes, { 0: "guided", 1: "corrected" });
    // Every original drawing appears in the rotating short sets and accepts its authored category combination.
    const seen = new Set();
    for (let round = 0; round < 56; round++) {
      if (round % 6 === 0) {
        await page.goto(base + "/alevel/#exam-drawings");
        await page
          .getByRole("button", { name: "Start a six-drawing set", exact: true })
          .click();
      }
      const set = Math.floor(round / 6),
        offset = round % 6,
        index = ((set * 6 + offset) * 9) % 56,
        item = bank[index];
      seen.add(item.id);
      await page
        .getByRole("radio", {
          name: item.defects.length ? "Reject" : "Accept",
          exact: true,
        })
        .check();
      for (const defect of item.defects)
        await page
          .getByRole("checkbox", {
            name: await page.evaluate(
              (i) => window.ALevelDrawingBank.categories[i],
              defect,
            ),
            exact: true,
          })
          .check();
      await page
        .getByRole("button", { name: "Check judgement", exact: true })
        .click();
      await page
        .getByRole("button", { name: "Next drawing", exact: true })
        .waitFor();
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 3,
        ),
      );
      await page
        .getByRole("button", { name: "Next drawing", exact: true })
        .click();
    }
    assert.equal(seen.size, 56);
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      for (const route of [
        "#exam",
        "#exam-drawings",
        "#exam-causal",
        "#catchup-a2-osmosis",
        "#catchup-a7-dihybrid",
      ]) {
        await page.goto(base + "/alevel/" + route);
        await page.addScriptTag({ content: axe.source });
        const violations = await page.evaluate(async () => {
          const r = await window.axe.run({
            runOnly: {
              type: "tag",
              values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
            },
          });
          return r.violations.map((x) => ({
            id: x.id,
            impact: x.impact,
            nodes: x.nodes.map((y) => y.target),
          }));
        });
        assert.deepEqual(
          violations,
          [],
          route + " " + width + "px accessibility",
        );
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 3,
          ),
          route + " width " + width,
        );
      }
    }
    assert.deepEqual(errors, []);
    console.log(
      "A-level exam skills: 52 authored tasks, 56 drawing judgements, saved support state, and responsive accessibility passed.",
    );
  } finally {
    await page.close();
  }
}

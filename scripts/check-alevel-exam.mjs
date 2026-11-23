import assert from "node:assert/strict";
import axe from "axe-core";
import { checkDrawingObservations } from "./check-drawing-observations.mjs";
import { checkALevelStatistics } from "./check-alevel-statistics.mjs";

export async function checkExistingRoutes(browser, base) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const route = hash => page.goto(base + "/alevel/#" + hash);
  const main = page.locator("main");
  try {
    for (const mode of ["Core", "Core + Stretch"]) {
      await route("settings");
      await page.getByRole("radio", { name: mode, exact: true }).check();
      await page.reload();
      assert(await page.getByRole("radio", { name: mode, exact: true }).isChecked());
      if (mode === "Core") await page.getByRole("checkbox", { name: "Larger text" }).check();
      assert(await page.locator("html").evaluate(el => el.classList.contains("big")));
      await route("exam");
      await main.getByRole("heading", { name: "Exam Skills", exact: true }).waitFor();
      assert.equal(await main.locator(".al-catalogue-row").count(), 16);
      await route("lesson-a1-monopoly");
      await main.locator(".ltop").waitFor();
      assert.match(await main.innerText(), /starch is a large molecule/);
      // Direct navigation starts a fresh document after the existing lesson exit guard.
      await page.goto(base + "/alevel/?check=" + encodeURIComponent(mode) + "#topic-a1");
      await main.getByRole("heading", { name: /Biological molecules/, level: 1 }).waitFor();
    }
    for (const n of [1, 2, 3]) {
      await route("");
      await main.locator('a[href="#paper-p' + n + '"]').tap();
      await main.getByRole("heading", { name: "Paper " + n, exact: true }).waitFor();
      await main.locator('a[href="#prac-p' + n + '"]').click();
      await main.getByRole("heading", { name: "Paper " + n + " required practicals", exact: true }).waitFor();
      assert((await main.locator("li.concept").count()) > 0);
      await route("pskills-p" + n);
      await main.getByRole("heading", { name: "Paper " + n + " Maths Skills", exact: true }).waitFor();
      assert((await main.locator('a[href^="#practice-"]').count()) > 0);
    }
    await route("flashcards");
    await main.getByRole("heading", { name: "Flashcards", exact: true }).waitFor();
    await main.locator('a[href="#spaced"]').click();
    await main.getByRole("heading", { name: "Spaced flashcard review" }).waitFor();
    await main.locator('a[href="#spaced-new"]').click();
    const current = await main.locator(".kr-question").innerText();
    await page.reload();
    assert.equal(await main.locator(".kr-question").innerText(), current);
    await main.getByRole("button", {name:"Reveal answer",exact:true}).press("Enter");
    await main.getByText("Expected answer", {exact:true}).waitFor();
  } finally {
    await page.close();
  }
}

export async function checkALevelExam(browser, base) {
  checkALevelStatistics();
  await checkDrawingObservations(browser, base, axe.source);
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
    assert.equal(families.length, 15);
    const newFamilies = ["interpret", "practical", "precision", "evidence", "extended"];
    assert.equal(families.filter(family => !newFamilies.includes(family.id))
      .reduce((total, family) => total + family.tasks.length, 0), 52);
    assert.equal(families.filter(family => newFamilies.includes(family.id))
      .reduce((total, family) => total + family.tasks.length, 0), 18);
    const bank = await page.evaluate(() =>
      window.ALevelDrawingBank.bank.map((x) => ({
        id: x.id,
        defects: x.defects,
        criterion: x.criterion,
      })),
    );
    assert.equal(bank.length, 18);
    assert.equal(new Set(bank.map((x) => x.id)).size, 18);
    const beginGuided = async family => {
      assert.equal(await page.locator(".al-stages [aria-current=step]").innerText(), "Key idea");
      await page.getByRole("button", { name: "See worked example", exact: true }).press("Enter");
      assert.equal(await page.locator(".al-stages [aria-current=step]").innerText(), "Worked example");
      assert(await page.getByRole("button", { name: "Previous step", exact: true }).isDisabled());
      const art = page.locator(".al-model-visual");
      if (family.id === "dihybrid") {
        assert.equal(await art.getByRole("table").count(), 0);
        assert(await art.getByText("AaBb × AaBb", { exact: true }).isVisible());
      }
      for (let i = 1; i < family.model.length; i++) {
        await page.getByRole("button", { name: "Next step", exact: true }).click();
        if (family.id === "dihybrid" && i === 2)
          assert.equal(await art.getByText("AABB", { exact: true }).count(), 0);
        if (family.id === "dihybrid" && i === 3)
          assert.equal(await art.getByText("AABB", { exact: true }).count(), 1);
        if (family.id === "dihybrid" && i === 4)
          assert.equal(await art.getByText("AaBb", { exact: true }).count(), 4);
        if (family.id === "pressures" && [1, 3, 4, 5].includes(i)) {
          const crossover = {1:"B", 3:"C", 4:"D", 5:"E"}[i];
          assert.equal(await art.locator(".al-crossover-current").getAttribute("data-crossover"), crossover);
          assert.equal(await art.locator(".al-trace-current").count(), 2);
        }
        if (family.id === "countercurrent" && i === 1)
          assert.equal(await art.locator("td.al-highlight-cell").count(), 2);
        if (family.id === "countercurrent" && i === 2)
          assert.equal(await art.locator("td.al-highlight-cell").count(), 8);
        if (family.id === "causal" && i === 3)
          assert.equal(await art.locator(".al-causal-focus").count(), 1);
        if (family.id === "causal" && i === 5)
          assert(await art.getByText("Postsynaptic neurone", {exact:true}).first().isVisible());
      }
      await page.getByRole("button", { name: "Try with support", exact: true }).press("Enter");
      assert.equal(await page.locator(".al-stages [aria-current=step]").innerText(), "With support");
      assert(await page.locator(".al-task-prompt").evaluate(el => el === document.activeElement));
      assert.equal(await page.locator(".al-model:visible").count(), 0);
    };
    for (const family of families) {
      await page.goto(base + "/alevel/#exam-" + family.id);
      await page
        .getByRole("heading", { name: family.title, exact: true })
        .waitFor();
      await beginGuided(family);
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
        if (q.kind === "group") {
          const selects = form.locator("select");
          const correction = family.id === "points";
          for (let j = 0; j < q.items.length; j++) {
            const pick = correction && j === q.items.length - 1 ? (q.items[j][1] + 1) % q.groups.length : q.items[j][1];
            await selects.nth(j).selectOption(String(pick));
          }
          if (correction) {
            await form.getByRole("button", { name: "Check answer", exact: true }).click();
            await page.reload();
            assert.equal(await form.locator('select[aria-invalid="true"]').count(), 1);
            assert.equal(await form.locator("select:disabled").count(), q.items.length - 1);
            await selects.last().selectOption(String(q.items.at(-1)[1]));
          }
        }
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
                : q.kind === "group" && family.id === "points" ? "Try again" : "Check answer",
            exact: true,
          })
          .click();
        if (q.kind === "writing") {
          for (let j = 0; j < q.points.length; j++)
            await form.locator('input[name="criterion-' + j + '"][value="included"]').check();
          await form.getByRole("button", { name: "Finish review" }).click();
        }
        await form
          .getByRole("button", {
            name:
              i === family.tasks.length - 1 ? "Review progress" : "Next task",
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
    await beginGuided(families.find(family => family.id === "hardy"));
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
      .getByRole("button", { name: "Try again", exact: true })
      .click();
    const outcomes = await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("keystone.alevel.exam-skills.v1")).hardy
          .outcomes,
    );
    assert.deepEqual(outcomes, { 0: "guided", 1: "corrected" });
    const key = "keystone.alevel.exam-skills.v1";
    const saved = id => page.evaluate(([key, id]) => JSON.parse(localStorage.getItem(key))[id], [key, id]);
    await page.reload();
    assert.match(await page.locator(".al-practice [role=status]").innerText(), /Correct after correction/);
    assert(await page.getByRole("button", { name: "Next task", exact: true }).isVisible());

    await page.goto(base + "/alevel/#exam-mechanisms");
    const mechanisms = families.find(family => family.id === "mechanisms");
    await beginGuided(mechanisms);
    const shuffledPositions = new Set();
    for (let i = 0; i < mechanisms.tasks.length - 1; i++) {
      const q = mechanisms.tasks[i];
      const options = page.locator(".al-practice input[type=radio]");
      shuffledPositions.add((await options.evaluateAll(inputs => inputs.map(input => +input.value))).indexOf(q.answer));
      await page.getByRole("radio", { name: q.options[q.answer], exact: true }).check();
      await page.getByRole("button", { name: "Check answer", exact: true }).click();
      assert.match(await page.locator(".al-practice [role=status]").innerText(), new RegExp(i === 0 ? "shorter diffusion distance" : "Correct|correct"));
      if (i === 0) {
        await page.getByRole("link", { name: "Review diffusion distance", exact: true }).click();
        await page.getByRole("heading", { name: "Simple and facilitated diffusion", exact: true }).waitFor();
        await page.getByRole("link", { name: /Return to your question/ }).press("Enter");
        assert.match(await page.locator(".al-practice [role=status]").innerText(), /shorter diffusion distance/);
        assert(await page.getByRole("button", { name: "Next task", exact: true }).isVisible());
      }
      if (i === 1) {
        const before = await saved("mechanisms");
        await page.reload();
        assert(await page.getByRole("radio", { name: q.options[q.answer], exact: true }).isChecked());
        assert.equal(await page.getByRole("button", { name: "Check answer", exact: true }).count(), 0);
        await page.locator(".al-practice form").evaluate(form => form.requestSubmit());
        assert.deepEqual(await saved("mechanisms"), before);
        assert.equal(before.outcomes[i], "independent");
      }
      await page.getByRole("button", { name: "Next task", exact: true }).click();
    }
    assert(shuffledPositions.size > 1);

    const written = mechanisms.tasks.at(-1);
    const writingIndex = mechanisms.tasks.length - 1;
    const form = page.locator(".al-practice form");
    await form.getByRole("textbox").fill("Acetylcholine binds to the receptors for longer.");
    await form.getByRole("button", { name: "Compare with the checklist" }).click();
    assert.equal((await saved("mechanisms")).outcomes[writingIndex], undefined);
    await form.locator('input[name="criterion-0"][value="revise"]').check();
    const revised = "Less acetylcholine is hydrolysed, so it can bind to receptors for longer.";
    await form.getByRole("textbox").fill(revised);
    await page.reload();
    assert.equal(await form.getByRole("textbox").inputValue(), revised);
    await form.getByText("Read your first draft", { exact: true }).click();
    assert(await form.getByText("Acetylcholine binds to the receptors for longer.", { exact: true }).isVisible());
    assert(await form.locator('input[name="criterion-0"][value="revise"]').isChecked());
    for (let j = 1; j < written.points.length; j++)
      await form.locator('input[name="criterion-' + j + '"][value="included"]').check();
    await form.getByRole("button", { name: "Finish review" }).click();
    assert.equal((await saved("mechanisms")).outcomes[writingIndex], "self-reviewed");
    await page.reload();
    assert(await form.getByRole("button", { name: "Review progress" }).isVisible());
    await form.getByRole("button", { name: "Review progress" }).click();
    await page.reload();
    assert.match(await page.locator(".al-outcomes").innerText(), /3 · Independently correct/);
    assert.match(await page.locator(".al-outcomes").innerText(), /1 · Written response self-reviewed/);
    assert(await page.getByRole("button", { name: "Retry questions I needed help with" }).isVisible());
    await page.getByText("Review the completed questions", { exact: true }).click();
    assert(await page.getByText(revised, { exact: true }).isVisible());
    await page.evaluate(key => { const state = JSON.parse(localStorage.getItem(key)); delete state.dihybrid; localStorage.setItem(key, JSON.stringify(state)); }, key);
    await page.goto(base + "/alevel/#catchup-a7-dihybrid");
    await page.getByRole("heading", { name: /Dihybrid/, level: 1 }).waitFor();
    await page.getByRole("button", { name: "Go straight to questions", exact: true }).click();
    assert.equal(await page.locator(".al-stages [aria-current=step]").innerText(), "Your turn");
    await page.locator(".al-practice input").first().fill("9");
    await page.getByText("Review the worked example", { exact: true }).press("Enter");
    await page.locator(".al-review-example .al-model").waitFor();
    assert.equal(await page.locator(".al-practice input").first().inputValue(), "9");
    await page.getByText("Review the worked example", { exact: true }).press("Enter");
    assert.equal(await page.locator(".al-model:visible").count(), 0);
    await page.goto(base + "/alevel/");
    assert.equal(await page.getByRole("link", { name: /Exam Skills.*Drawings/ }).count(), 1);
    const finder = page.locator("[data-topic-finder]");
    for (const [query, route] of [
      ["scientific drawing", "exam-drawings"], ["mark schemes", "exam-points"], ["cardiac pressure", "catchup-a3-heart"],
      ["heart valves", "catchup-a3-heart"], ["disinhibition", "exam-causal"], ["enzyme inhibition", "exam-causal"],
      ["unfamiliar context", "exam-causal"], ["causal reasoning", "exam-causal"], ["dihybrid cross", "catchup-a7-dihybrid"],
      ["hardy-weinberg", "catchup-a7-hardy"], ["water potential", "catchup-a2-osmosis"], ["countercurrent exchange", "catchup-a3-fish"],
    ]) {
      await finder.getByRole("searchbox").fill(query);
      assert.equal(await finder.locator('a[href="#' + route + '"]').count(), 1, query);
    }
    await finder.getByRole("searchbox").fill("dihybrid cross");
    assert(await finder.getByRole("link", { name: /Resume: Dihybrid/ }).isVisible());
    // Every original drawing appears in the rotating short sets and accepts its authored category combination.
    const seen = new Set();
    for (let round = 0; round < bank.length; round++) {
      if (round % 6 === 0) {
        await page.goto(base + "/alevel/#exam-drawings");
        await page
          .getByRole("button", { name: "Start a six-drawing set", exact: true })
          .click();
      }
      const set = Math.floor(round / 6),
        offset = round % 6,
        currentId = await page.evaluate(([n,i]) => window.ALevelDrawingBank.setFor(n)[i].id,[set,offset]),
        item = bank.find(candidate => candidate.id === currentId);
      seen.add(item.id);
      const comparison = page.locator(".al-drawing-comparison");
      if (round === 0) {
        assert.equal(await comparison.locator("figure:visible").count(), 1);
        await comparison.getByRole("button", { name: "Candidate drawing", exact: true }).press("Enter");
        const enlarge = comparison.getByRole("button", { name: "Enlarge candidate drawing", exact: true });
        await enlarge.press("Enter");
        await page.getByRole("dialog", { name: "Candidate drawing" }).waitFor();
        await page.keyboard.press("Escape");
        assert(await enlarge.evaluate(el => el === document.activeElement));
      }
      assert.equal(await comparison.locator("[data-defect-overlay]").count(), 0);
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
        .getByRole("button", { name: offset === 5 ? "Review progress" : "Next drawing", exact: true })
        .waitFor();
      if (item.defects.length) assert(await comparison.locator("[data-defect-overlay]").first().isVisible());
      if (round === 1) {
        await page.reload();
        assert(await page.getByRole("button", { name: offset === 5 ? "Review progress" : "Next drawing", exact: true }).isVisible());
      }
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 3,
        ),
      );
      await page
        .getByRole("button", { name: offset === 5 ? "Review progress" : "Next drawing", exact: true })
        .click();
    }
    assert.equal(seen.size, 18);
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      for (const route of [
        "#exam",
        "#exam-drawings",
        "#exam-causal",
        "#exam-evidence",
        "#exam-practical",
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
    await page.setViewportSize({ width: 320, height: 780 });
    await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
    await page.evaluate(key => { const snapshot = JSON.parse(localStorage.getItem(key)); delete snapshot.pressures; localStorage.setItem(key, JSON.stringify(snapshot)); }, key);
    await page.goto(base + "/alevel/#exam-pressures");
    await page.getByRole("button", { name: "See worked example" }).press("Enter");
    const enlarge = page.getByRole("button", { name: "Enlarge diagram", exact: true });
    const fontSize = await page.locator(".al-model-visual svg text").first().evaluate(label =>
      label.getScreenCTM().a * parseFloat(getComputedStyle(label).fontSize));
    assert(fontSize >= 14, "Graph text is too small at 320px");
    await enlarge.press("Enter");
    const plot = page.getByRole("dialog", { name: "Cardiac pressure graph" });
    await plot.waitFor();
    assert(await plot.getByRole("region").evaluate(region => region.scrollWidth > region.clientWidth));
    await page.keyboard.press("Escape");
    assert(await enlarge.evaluate(el => el === document.activeElement));
    await page.addScriptTag({ content: axe.source });
    assert.deepEqual(await page.evaluate(async () => (await window.axe.run({
      runOnly: ["color-contrast", "aria-valid-attr-value"]
    })).violations.map(x => x.id)), []);
    await page.addStyleTag({ content: "html{font-size:200%} .al-journey-stage p,.al-journey-stage .btn{font-size:1rem!important}" });
    const reflow = await page.evaluate(async () => {
      await document.fonts.ready;
      const width = document.documentElement.scrollWidth;
      const offenders = [...document.querySelectorAll("body *")].filter(element =>
        element.clientWidth > 1 && (element.scrollWidth > element.clientWidth + 3 ||
          element.getBoundingClientRect().right > innerWidth + 3))
        .slice(0, 15).map(element => [element.tagName, element.className, element.clientWidth, element.scrollWidth]);
      return { width, viewport: innerWidth, offenders };
    });
    assert(reflow.width <= reflow.viewport + 3, "Enlarged text caused page overflow: " + JSON.stringify(reflow));
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Emulation.setPageScaleFactor", {pageScaleFactor: 2});
    assert.equal(await page.evaluate(() => visualViewport.scale), 2);
    await page.getByRole("button", { name: "Next step", exact: true }).press("Enter");
    assert.equal(await page.locator(".al-crossover-current").getAttribute("data-crossover"), "B");
    await cdp.send("Emulation.setPageScaleFactor", {pageScaleFactor: 1});
    await cdp.detach();

    // Old saved sets keep accepted outcomes without needing a new-style result record.
    await page.evaluate(key => {
      const snapshot = JSON.parse(localStorage.getItem(key));
      snapshot.osmosis = {
        index: 1, outcomes: { 0: "guided", 1: "independent" },
        responses: { 0: [0], 1: "−500" }, attempts: { 0: 1, 1: 1 }, hints: {},
      };
      localStorage.setItem(key, JSON.stringify(snapshot));
    }, key);
    await page.goto(base + "/alevel/#exam-osmosis");
    const old = await saved("osmosis");
    assert.equal(await page.locator(".al-practice input[name=number]").inputValue(), "−500");
    assert.match(await page.locator(".al-practice [role=status]").innerText(), /Independently correct/);
    await page.reload();
    assert(await page.getByRole("button", { name: "Next task", exact: true }).isVisible());
    await page.locator(".al-practice form").evaluate(form => form.requestSubmit());
    assert.deepEqual(await saved("osmosis"), old);

    await page.getByRole("button", { name: "Next task", exact: true }).click();
    await page.getByRole("button", { name: "Show explanation", exact: true }).press("Enter");
    assert.match(await page.locator(".al-practice [role=status]").innerText(), /Explanation revealed/);
    await page.getByRole("button", { name: "Next task", exact: true }).click();
    const last = page.locator(".al-practice form");
    await last.getByRole("textbox").fill("Water moves into the tissue cells by osmosis.");
    await last.getByRole("button", { name: "Compare with the checklist" }).press("Enter");
    for (const input of await last.locator('input[value="included"]').all()) await input.check();
    await last.getByRole("button", { name: "Finish review" }).press("Enter");
    await last.getByRole("button", { name: "Review progress" }).press("Enter");
    assert.match(await page.locator(".al-outcomes").innerText(), /1 · Still needs practice/);
    await page.getByRole("button", { name: "Retry questions I needed help with" }).press("Enter");
    assert.equal((await saved("osmosis")).outcomes[1], "independent");
    assert.equal((await saved("osmosis")).outcomes[2], undefined);
    await page.evaluate(key => {
      const state = JSON.parse(localStorage.getItem(key));
      delete state.interpret;
      delete state.evidence;
      localStorage.setItem(key, JSON.stringify(state));
    }, key);
    await page.goto(base + "/alevel/#exam-interpret");
    await page.getByRole("button", { name: "Go straight to questions" }).click();
    const interpretation = families.find(family => family.id === "interpret").tasks[1];
    const displayed = page.locator(".al-practice input[type=radio]");
    assert.notEqual(await displayed.first().getAttribute("value"), String(interpretation.answer));
    await page.getByRole("radio", { name: interpretation.options[2], exact: true }).check();
    await page.getByRole("button", { name: "Check answer" }).press("Enter");
    await page.reload();
    const feedback = page.locator(".al-practice [role=status]");
    assert((await feedback.innerText()).includes(interpretation.feedback[2]));
    await page.getByRole("radio", { name: interpretation.options[1], exact: true }).check();
    await page.getByRole("button", { name: "Try again" }).click();
    assert((await feedback.innerText()).includes(interpretation.feedback[1]));

    await page.goto(base + "/alevel/#exam-evidence");
    await page.getByRole("button", { name: "Go straight to questions" }).click();
    await page.getByRole("textbox", { name: "Your answer (%)" }).fill("33.3");
    await page.getByRole("button", { name: "Check answer" }).click();
    assert.match(await feedback.innerText(), /wrong denominator/);
    await page.getByRole("textbox", { name: "Your answer (%)" }).fill("25");
    await page.getByRole("button", { name: "Try again" }).press("Enter");
    assert.match(await feedback.innerText(), /Correct after correction/);
    assert.equal((await saved("evidence")).outcomes[1], "corrected");

    await page.goto(base + "/alevel/#lesson-a2-mitosis");
    const originalQuestion = page.locator("#qf fieldset.q > legend").first();
    const originalPrompt = await originalQuestion.innerText();
    await page.getByRole("button", { name: "I don’t know – show me", exact: true }).click();
    const offer = page.locator("#qf #fb button.al-question-skill");
    await offer.press("Enter");
    const dialog = page.getByRole("dialog", { name: "Understand the question" });
    await dialog.waitFor();
    assert(await dialog.getByRole("heading", { name: "Understand the question" }).evaluate(el => el === document.activeElement));
    await dialog.getByRole("button", { name: "Close skill lesson" }).press("Escape");
    await dialog.waitFor({ state: "hidden" });
    assert.equal(await originalQuestion.innerText(), originalPrompt);
    assert(await offer.evaluate(el => el === document.activeElement));
    assert(await page.getByRole("button", { name: /Continue|Quick check/ }).first().isVisible());
    await page.goto(base + "/alevel/?check=batch17#exam");
    await checkExistingRoutes(browser, base);
    assert.deepEqual(errors, []);
    console.log(
      "A-level exam skills: 70 authored tasks, 18 observation-based drawing judgements, saved support state, and responsive accessibility passed.",
    );
  } finally {
    await page.close();
  }
}

import assert from "node:assert/strict";
import axe from "axe-core";

export async function checkHumanCatchup(browser, base) {
  const page = await browser.newPage({ viewport: { width: 320, height: 780 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  let visits = 0;
  const open = route => page.goto(base + "/human-biology/?check=" + (++visits) + "#" + route);
  const stage = name => page.locator('[data-hb-stage="' + name + '"]');
  const feedback = (loc, kind) => loc.locator('[data-learning-feedback="' + kind + '"]');
  async function help(loc) {
    const details = loc.locator(".hb-help");
    if (await details.count() && !(await details.evaluate(el => el.open))) await details.locator("summary").click();
  }
  const expand = async loc => {
    if (await loc.evaluate(el => el.tagName === "DETAILS")) {
      if (!(await loc.evaluate(el => el.open))) await loc.locator(":scope > summary").click();
      return;
    }
    if (await loc.isVisible()) return;
    const name = await loc.getAttribute("data-hb-stage") || "model";
    const model = page.locator("[data-hb-model-step]");
    const guided = stage("guided"), independent = stage("independent"), followup = stage("followup");
    if (name === "followup") {
      await expand(independent);
      await independent.getByRole("button", {name: /(?:Try|Review) (?:a )?fresh check/}).click();
    } else if (name === "model") {
      const active = await guided.isVisible() ? guided : await independent.isVisible() ? independent : followup;
      const review = active.getByRole("button", {name: "Review worked example"});
      if (await review.isVisible()) await review.click();
      else { await help(active); await active.getByRole("button", {name: "Revisit worked example"}).click(); }
    } else if (name === "independent") {
      if (await followup.isVisible()) await expand(model);
      const primary = guided.getByRole("button", {name: "Apply it independently"});
      if (await guided.isVisible() && await primary.isVisible()) await primary.click();
      else await page.getByRole("button", {name: "Skip to independent practice"}).click();
    } else if (name === "guided") {
      if (await independent.isVisible() && await independent.locator(".hb-help").isVisible()) {
        await help(independent);
        await independent.getByRole("button", {name: "Try with support"}).click();
      } else {
        await expand(model);
        const next = model.getByRole("button", {name: "Show next step"});
        const stepLimit = await model.locator(".hb-model-steps li").count();
        for (let step = 0; step < stepLimit && await next.isVisible(); step++) await next.click();
        await model.getByRole("button", {name: "Try with support"}).click();
      }
    }
    assert(await loc.isVisible(), "Requested teaching stage is visible: " + name);
  };
  const saved = key => page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
  const widthFits = () => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 3);
  const localPractice = "narajos-human-catchup-v1";
  const practiceKey = "narajos-human-challenge-v2-session";
  const skillKey = practiceKey + "-catchup-magnification";

  try {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await open("catchup");
    await open("catchup/f171");
    const areas = page.locator(".hb-unit-area-f171");
    assert.equal(await areas.count(), 5);
    assert.equal(await page.getByText("Focused lessons", {exact:true}).count(), 4);
    assert(await areas.nth(1).getByText("Treating disease").isVisible(), "Later areas remain visible");
    await areas.first().locator("summary").press("Enter");
    assert(await areas.first().getByRole("link", {name:"Hiatus hernia and reflux"}).isVisible());
    await areas.first().getByRole("link", {name:"Hiatus hernia and reflux"}).press("Enter");
    assert.match(page.url(), /#catchup\/f171\/1\.2\.1\.hiatus$/);
    const chapters = await page.evaluate(() => Object.entries(window.KeystoneHumanLessons));
    assert.equal(chapters.length, 75, "Retain the existing lessons and add the F170 cirrhosis lesson");
    assert.equal(new Set(chapters.map(([key]) => key.split("/")[0])).size, 8);
    for (const [key, lesson] of chapters) {
      await page.evaluate(key => localStorage.removeItem(key), localPractice);
      await open("catchup/" + key);
      await page.getByText(lesson.goal, { exact: true }).waitFor();
      assert(await page.getByRole("heading", { name: "Understand the idea" }).isVisible(), key);
      const focused = /\.(counting|hiatus|hodgkin)$/.test(key);
      if (focused) {
        const morePractice = page.locator("[data-hb-practice]");
        const href = await morePractice.getAttribute("href");
        assert(href.includes("-transfer?from=catchup/" + key), key);
      }
      if (lesson.revision && !focused && !lesson.title && (key.startsWith("f170/") || key.startsWith("f171/"))) {
        if (key === "f170/1.1.1") {
          await page.getByText("Related learning and practice", {exact:true}).press("Enter");
        }
        const buildLink = page.getByRole("link", { name: "Build understanding", exact: true });
        const href = await buildLink.getAttribute("href");
        assert(href.endsWith("?from=catchup/" + key), key);
        const pointId = href.split("?")[0].split("/").at(-1);
        const pointUnit = await page.evaluate(id => window.KeystoneHumanProgressions.get(id)?.unit, pointId);
        assert.equal(pointUnit, key.split("/")[0], key);
      }
      const model = page.locator(".hb-teach-stage").first();
      await expand(model);
      assert((await model.locator(".hb-model-steps li").first().innerText()).includes(lesson.model[0]), key);
      if (lesson.model.length > 1) {
        await model.getByRole("button", { name: "Show next step" }).press("Enter");
        assert(await model.locator(".hb-model-steps li").nth(1).isVisible(), key);
      }
      await expand(stage("guided"));
      if (key === "f171/1.2.1.aorta") {
        await stage("guided").getByRole("radio").nth(1 - lesson.guided.answer).check();
        await stage("guided").getByRole("button", {name: "Check", exact: true}).click();
        await stage("guided").getByText(/pressure reading does not show vessel shape/).waitFor();
      }
      await stage("guided").getByRole("radio").nth(lesson.guided.answer).check();
      await stage("guided").getByRole("button", { name: "Check", exact: true }).click();
      assert(await feedback(stage("guided"), key === "f171/1.2.1.aorta" ? "corrected" : "correct").isVisible(), key);
      await expand(stage("independent"));
      if (key === "f171/1.2.1.aorta") {
        const image = stage("independent").getByRole("img", {name:/abdominal aorta/});
        await image.waitFor();
        assert(await image.evaluate(async el => { await el.decode(); return el.naturalWidth > 0; }));
      }
      if (lesson.apply.options) {
        await stage("independent").getByRole("radio").nth(lesson.apply.answer).check();
        await stage("independent").getByRole("button", { name: "Check", exact: true }).click();
        assert(await feedback(stage("independent"), "correct").isVisible(), key);
      } else {
        await stage("independent").getByRole("textbox").fill("An explanation to compare with the key points.");
        await stage("independent").getByRole("button", { name: "Compare my explanation" }).press("Enter");
        if (lesson.revision) {
          const review = stage("independent").locator("[data-hb-review]");
          assert.equal(await review.getByRole("listitem").count(), lesson.apply.points.length);
          await review.getByRole("button", { name: "Finish review" }).click();
          assert(await review.getByText("Your self-review is saved.").isVisible());
          assert.equal(await stage("independent").locator("[data-learning-feedback]").count(), 0, "Self-review is not a checked answer");
        } else {
          assert.equal(await stage("independent").getByRole("status").getByRole("listitem").count(), lesson.apply.points.length);
        }
      }
      assert(await widthFits(), "Horizontal overflow in " + key);
      if (key.startsWith("f17") && Number(key[3]) >= 2) {
        assert.match(await page.locator(".k-catchup-concept .k-eyebrow").innerText(), /NEA knowledge support/i);
        assert.equal(await page.locator('input[type="file"]').count(), 0);
      }
    }

    // The existing microscopy lesson leads to supported fractionation and a distinct written transfer.
    await open("catchup/f170/1.1.2");
    const microscopy = page.locator(".hb-teach-explain");
    const fractionation = microscopy.getByRole("heading", { name: "Cell fractionation", exact: true });
    const representationComparison = microscopy.locator(".hb-compare-groups");
    assert.equal(await representationComparison.count(), 1, "microscopy has one representation comparison");
    assert(await representationComparison.getByRole("heading", {name: "What kind of representation am I reading?", exact: true}).isVisible());
    assert(await representationComparison.evaluate((group, heading) =>
      Boolean(group.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING),
    await fractionation.elementHandle()));
    assert(await page.getByText(/particles that collect at the bottom|material that collects at the bottom/).isVisible());
    await page.getByText("Related learning and practice", {exact:true}).press("Enter");
    await page.getByRole("link", {name:"Practise separating cell fractions"}).press("Enter");
    await page.getByRole("radio", {name:/Pellet P, containing most of the nuclei/}).check();
    await page.locator('[data-k-action="check"]').press("Enter");
    await page.getByText("The first pellet is left in its tube. Follow the liquid transferred into the clean tube.", {exact:true}).waitFor();
    const fractionGuided = practiceKey + "-topic-f170/f170-fractionation-guided";
    assert.equal((await saved(fractionGuided)).outcomes[0], "incorrect");
    await page.reload();
    await page.getByText("The first pellet is left in its tube. Follow the liquid transferred into the clean tube.", {exact:true}).waitFor();
    await open("catchup/f170/1.1.2");
    await page.getByText("Related learning and practice", {exact:true}).press("Enter");
    await page.getByRole("link", {name:"Apply fractionation to a fresh sample"}).press("Enter");
    const fractionAnswer = "The supernatant moved on; the target organelles later settled in B. Other material could still be there.";
    await page.locator("#k-written").fill(fractionAnswer);
    await page.locator('[data-k-action="reveal"]').press("Enter");
    await page.getByText(/Finding many in B does not show that other components are absent/).waitFor();
    await page.reload();
    assert.equal(await page.locator(".k-review-draft").innerText(), fractionAnswer, "Original explanation is retained for self-review");
    assert.equal(await page.locator(".k-question-view [data-learning-feedback]").count(), 0, "Extended answers must not be automatically marked correct");
    assert(await widthFits(), "Fractionation practice overflows at 320px");

    // The original answer and its source field remain available during self-review and on reload.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f170/1.1.5");
    const division = stage("independent");
    await expand(division);
    const field = division.getByRole("img", {name: /onion-root/});
    assert(await field.evaluate(async el => { await el.decode(); return el.naturalWidth === 840; }));
    assert.equal(await division.getByRole("heading", {name:"Model explanation"}).count(), 0);
    const original = "I can see a group of dark rods near the middle of the upper cell.";
    await division.getByRole("textbox").fill(original);
    await division.getByRole("button", {name:"Compare my explanation"}).press("Enter");
    const review = division.locator("[data-hb-review]");
    assert(await field.isVisible());
    await review.getByRole("combobox").last().selectOption("revise");
    await review.getByRole("textbox").fill(original + " The other nucleus alone cannot show S phase.");
    await page.reload();
    await expand(division);
    assert(await field.isVisible());
    assert(await review.getByText(original, {exact:true}).isVisible());
    assert.match(await review.getByRole("textbox").inputValue(), /cannot show S phase/);
    await review.getByRole("button", {name:"Finish review"}).press("Enter");
    assert.equal((await saved(localPractice))["f170/1.1.5/1"].independent.outcome, "selfReview");

    await open("catchup/f170/1.1.3.evidence");
    const erAnswer = stage("independent");
    await expand(erAnswer);
    await erAnswer.getByRole("textbox").fill("P has dots outside the sacs. Q shows tubules.");
    await erAnswer.getByRole("button", {name:"Compare my explanation"}).press("Enter");
    await erAnswer.getByRole("button", {name:"Finish review"}).press("Enter");
    await erAnswer.getByRole("button", {name:"Try a fresh check"}).press("Enter");
    const em = stage("followup");
    assert(await em.getByRole("img", {name:/Grayscale thin section/}).evaluate(async img=>{await img.decode(); return img.naturalWidth===640;}));
    await em.getByRole("radio", {name:/twice as much/}).check();
    await em.getByRole("button", {name: "Check", exact: true}).press("Enter");
    assert.match(await em.getByRole("status").innerText(), /measure product leaving/);
    await em.getByRole("radio", {name:/capacity to make proteins/}).check();
    await em.getByRole("button", {name: "Check", exact: true}).press("Enter");
    assert(await feedback(em, "corrected").isVisible());
    assert.equal((await saved(localPractice))["f170/1.1.3.evidence/1"].independent.outcome, "selfReview");

    // The exact linked item, its edited answers and corrected outcome survive reopening.
    await open("catchup/f171/1.3.1.fungi");
    await page.locator("[data-hb-practice]").press("Enter");
    const matches = page.locator("select[data-match]");
    await matches.first().waitFor();
    assert.equal(await matches.count(), 5);
    for (let i = 0; i < 5; i++) await matches.nth(i).selectOption(String(i === 4 ? 3 : i));
    await page.getByRole("button", {name: /^Check$/}).press("Enter");
    const matchKey = practiceKey + "-topic-f171/f171-infection-group-transfer";
    assert.deepEqual((await saved(matchKey)).queue, ["f171-infection-group-transfer"]);
    await page.reload();
    await page.getByRole("button", {name: "Try again", exact: true}).first().press("Enter");
    assert(await matches.nth(0).isDisabled());
    await matches.nth(4).selectOption("4");
    await page.getByRole("button", {name: /^Check$/}).press("Enter");
    assert.equal((await saved(matchKey)).outcomes[0], "corrected");

    for (const [route, questionId, wrongAnswer, diagnosis, reteachLabel = "Revisit the worked example"] of [
      ["f170/1.1.5.meiosis", "f170-division-variation", /Independent orientation of intact/, /markers are on the same chromosome/, "Revisit assortment and crossing over"],
      ["f171/1.3.1.viruses", "f171-route-prevention-transfer", /ventilation reduces exposure to all viruses/, /Viral classification does not imply a shared route/],
      ["f170/1.1.2.counting", "f170-cell-counting-transfer", /target volume/, /overlap the cells in volume/],
      ["f171/1.2.1.hiatus", "f171-hiatus-mechanism-transfer", /effective reflux barrier/, /Increased secretion was not measured/],
      ["f171/1.2.1.hodgkin", "f171-hodgkin-mechanism-transfer", /only affect immunity/, /local effect on another structure/]
    ]) {
      await open("catchup/" + route);
      if (route.endsWith(".hiatus")) {
        await expand(page.locator("[data-hb-model-step]"));
        const anatomy = page.getByRole("img", {name: /stomach have slid above the diaphragm/});
        assert(await anatomy.isVisible());
        assert(await widthFits(), "Hiatus diagram overflow at 320 px");
        await page.addScriptTag({content: axe.source});
        const issues = await page.evaluate(async () => (await window.axe.run("[data-hb-model-step]", {
          runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]
        })).violations.map(rule => rule.id));
        assert.deepEqual(issues, []);
      }
      const practice = page.locator("[data-hb-practice]");
      await practice.press("Enter");
      await page.locator(".k-question-view").waitFor();
      const itemKey = practiceKey + "-topic-" + route.split("/")[0] + "/" + questionId;
      assert.deepEqual((await saved(itemKey)).queue, [questionId]);
      await page.getByRole("radio", {name: wrongAnswer}).check();
      await page.getByRole("button", {name: "Check", exact: true}).press("Enter");
      await page.getByText(diagnosis).waitFor();
      await page.getByRole("link", {name: reteachLabel, exact: true}).press("Enter");
      await page.locator("#leave-confirm").press("Enter");
      await page.locator("[data-hb-model-step]:not([hidden])").waitFor({state: "visible"});
      await page.getByRole("link", {name: "Return to your unfinished question set", exact: true}).press("Enter");
      await page.getByText(diagnosis).waitFor();
    }

    const pilots = [
      ["f170/1.1.2", /48 pixels and 122 pixels/, /6 µm; the structures remain unresolved/, null],
      ["f170/3.1.1", /regulated variable/, null, "Shivering releases heat after temperature falls, returning body temperature towards its usual range."],
      ["f171/2.1", /repeat images/, null, "A systemic medicine can reach three sites through blood if they are susceptible. Surgery can relieve local pressure at one site."],
      ["f171/a3", /antigen-presenting cell/i, null, "Memory lymphocytes can respond sooner on a later exposure. Establishing memory takes time."],
      ["f171/4.2.1", /18 true positives/, /only 7 of 24/, null],
      ["f171/4.2.2", /135 mmHg/, null, "Weeks one and three overlap under comparable conditions. Repeat using the same checked equipment."],
      ["f171/a5", /change in reported nightly sleep/, null, "The new group gained 7 m more, but extra practice could explain part of this. Match practice when comparing aids."]
    ];
    for (const [key, worked, correctChoice, response] of pilots) {
      await page.evaluate(key => localStorage.removeItem(key), localPractice);
      await open("catchup/" + key);
      const prerequisite = page.locator(".hb-teaching > .hb-prerequisite").first();
      await prerequisite.locator("summary").press("Enter");
      assert((await prerequisite.locator("p").innerText()).trim().length > 10, key);
      await prerequisite.locator("summary").press("Enter");
      const model = page.locator("[data-hb-model-step]");
      assert(await model.isVisible(), "Worked example is visible on arrival: " + key);
      assert(!(await stage("guided").isVisible()), "Guided practice is initially out of the way: " + key);
      assert(!(await stage("independent").isVisible()), "Independent practice is initially out of the way: " + key);
      assert.match(await model.locator(".hb-model-steps li").first().innerText(), worked, key);
      await model.getByRole("button", { name: "Show next step" }).press("Enter");
      assert.equal(await model.getAttribute("data-hb-model-step"), "2", key);
      if (key === "f171/4.2.1") {
        assert.equal(await model.locator(".hb-cell-focus").innerText(), "12");
        await model.getByRole("button", { name: "Previous step" }).press("Enter");
        assert.equal(await model.locator(".hb-cell-focus").innerText(), "18");
      }
      const stepLimit = await model.locator(".hb-model-steps li").count();
      for (let step = 0; step < stepLimit && await model.getByRole("button", { name: "Show next step" }).isVisible(); step++) {
        await model.getByRole("button", { name: "Show next step" }).press("Enter");
      }
      assert(await model.getByRole("button", { name: "Try with support" }).isVisible(), "Worked example must finish: " + key);
      await model.getByRole("button", { name: "Try with support" }).press("Enter");
      assert(!(await model.isVisible()), "Only the current stage is shown: " + key);
      assert(await page.locator(".hb-teach-explain").isVisible(), "Explanation remains available: " + key);
      const definition = Object.fromEntries(chapters)[key];
      const guided = stage("guided");
      await guided.getByRole("radio").nth(definition.guided.answer).check();
      await guided.getByRole("button", { name: "Check", exact: true }).press("Enter");
      assert(await guided.getByRole("button", { name: "Check", exact: true }).isHidden(), key);
      await guided.getByRole("button", { name: "Apply it independently" }).press("Enter");
      const independent = stage("independent");
      if (correctChoice) {
        await independent.getByRole("radio", { name: correctChoice }).check();
        await independent.getByRole("button", { name: "Check", exact: true }).press("Enter");
        assert(await feedback(independent, "correct").isVisible(), key);
      } else {
        await independent.getByRole("textbox").fill(response);
        await independent.getByRole("button", { name: "Compare my explanation" }).press("Enter");
        const review = independent.locator("[data-hb-review]");
        assert(await review.getByText(response, { exact: true }).first().isVisible(), key);
        await review.getByRole("combobox").first().selectOption("revise");
        await review.getByRole("textbox", { name: "Improve your answer (optional)" }).fill(response + " Revised.");
        await page.reload();
        await expand(independent);
        assert.equal(await review.getByRole("combobox").first().inputValue(), "revise", key);
        assert.match(await review.getByRole("textbox").inputValue(), /Revised\.$/, key);
        await review.getByRole("button", { name: "Finish review" }).press("Enter");
        assert(await review.getByText("Your self-review is saved.").isVisible(), key);
        assert.equal((await saved(localPractice))[key + "/1"].independent.outcome, "selfReview", key);
      }

      await page.evaluate(key => localStorage.removeItem(key), localPractice);
      await open("catchup/" + key);
      await expand(independent);
      await help(independent);
      await independent.getByRole("button", { name: "Get a hint" }).press("Enter");
      assert(await independent.locator(".hb-hints").isVisible(), key);
      if (correctChoice) {
        const wrong = definition.apply.options.findIndex((_, i) => i !== definition.apply.answer);
        await independent.getByRole("radio").nth(wrong).check();
        await independent.getByRole("button", { name: "Check", exact: true }).press("Enter");
        assert.equal(await independent.getByRole("status").innerText(), definition.apply.options[wrong][1], key);
      } else {
        await independent.getByRole("button", { name: "Show explanation" }).press("Enter");
        assert.match(await independent.getByRole("status").innerText(), /Explanation shown/, key);
        assert.equal(await independent.locator("[data-learning-feedback]").count(), 0, "Revealing an explanation is not a checked answer");
      }
      await independent.getByRole("button", { name: "Revisit worked example" }).press("Enter");
      assert(await model.isVisible(), key);
      await expand(independent);
      if (correctChoice) {
        await independent.getByRole("radio", { name: correctChoice }).check();
        await independent.getByRole("button", { name: "Check", exact: true }).press("Enter");
        assert(await feedback(independent, "corrected").isVisible(), key);
      }
      assert(!(await page.locator("[data-hb-followup]").evaluate(el => el.hidden)), key);
    }

    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/4.2.1");
    await expand(stage("independent"));
    await stage("independent").getByRole("radio").nth(1).check();
    await stage("independent").getByRole("button", { name: "Check", exact: true }).click();
    assert.match(await stage("independent").getByRole("status").innerText(), /all positive screens/);
    await help(stage("independent"));
    await stage("independent").getByRole("button", { name: "Get a hint" }).press("Enter");
    assert.match(await stage("independent").locator(".hb-hints").innerText(), /denominator/);
    await stage("independent").getByRole("button", { name: "Show explanation" }).press("Enter");
    assert.match(await stage("independent").getByRole("status").innerText(), /Explanation shown/);
    await stage("independent").getByRole("radio").first().check();
    await stage("independent").getByRole("button", { name: "Check", exact: true }).press("Enter");
    assert.match(await stage("independent").getByRole("status").innerText(), /Answer checked after seeing the explanation/);
    assert.equal(await stage("independent").locator("[data-learning-feedback]").count(), 0);
    assert.equal((await saved(localPractice))["f171/4.2.1/1"].independent.outcome, "explained");
    await expand(stage("followup"));
    await stage("followup").getByRole("radio").last().check();
    await stage("followup").getByRole("button", { name: "Check", exact: true }).press("Enter");
    assert.equal(await feedback(stage("followup"), "correct").getAttribute("data-feedback-animate"), "");
    await page.reload();
    await expand(stage("followup"));
    assert(await feedback(stage("followup"), "correct").isVisible());
    assert.equal(await feedback(stage("followup"), "correct").getAttribute("data-feedback-animate"), null);

    await open("catchup/f171/2.1");
    await expand(stage("independent"));
    await stage("independent").getByRole("textbox").fill("A saved fictional treatment explanation.");
    await page.reload();
    await expand(stage("independent"));
    assert.equal(await stage("independent").getByRole("textbox").inputValue(), "A saved fictional treatment explanation.");

    await open("challenge/f170/1.1.2");
    await page.locator(".k-question-view").waitFor();
    await page.evaluate(key => {
      const practice = JSON.parse(localStorage.getItem(key));
      const conversion = "p-cell-actual-width-diagnostic";
      practice.queue = [conversion, ...practice.queue.filter(id => id !== conversion)];
      localStorage.setItem(key, JSON.stringify(practice));
    }, practiceKey);
    await page.reload();
    await page.locator(".k-question-view").waitFor();
    const standard = await saved(practiceKey);
    assert.equal(standard.scope, "1.1.2");
    await open("catchup/f170/1.1.2");
    await page.getByText("Practise a related method", { exact: true }).click();
    await page.getByRole("link", { name: "Magnification and actual size", exact: true }).click();
    await page.getByRole("heading", { name: "Worked example", exact: true }).waitFor();
    await page.getByRole("button", { name: "Now try one", exact: true }).click();
    const skill = await saved(skillKey);
    assert.equal(skill.returnTo, "catchup/f170/1.1.2");
    const returnToLesson = page.getByRole("link", { name: "Return to the catch-up lesson" });
    await returnToLesson.press("Enter");
    assert(await page.locator("#leave-stay").evaluate(el => el === document.activeElement));
    await page.keyboard.press("Shift+Tab");
    assert(await page.locator("#leave-confirm").evaluate(el => el === document.activeElement));
    await page.keyboard.press("Tab");
    await page.keyboard.press("Escape");
    assert(await returnToLesson.evaluate(el => el === document.activeElement));
    await returnToLesson.press("Enter");
    await page.locator("#leave-confirm").press("Enter");
    await page.getByRole("heading", { name: "Microscopy and cell measurements", exact: true }).waitFor();
    assert.deepEqual((await saved(practiceKey)).queue, standard.queue);
    await page.getByText("Practise a related method", { exact: true }).click();
    await page.getByRole("link", { name: "Magnification and actual size", exact: true }).click();
    await page.locator(".k-question-view").waitFor();
    assert.deepEqual((await saved(skillKey)).queue, skill.queue);
    await page.reload();
    await page.locator(".k-question-view").waitFor();
    assert.deepEqual((await saved(skillKey)).queue, skill.queue);
    await open("catchup/f170/1.1.2");
    await page.getByText("Related learning and practice", { exact: true }).click();
    await page.getByRole("link", { name: /Practise microscopy and cell measurements/i }).click();
    await page.locator(".k-question-view").waitFor();
    assert.deepEqual((await saved(practiceKey)).queue, standard.queue);

    await page.getByRole("button", { name: /show me/ }).click();
    await page.getByRole("link", { name: /Revisit the (scale-bar calculation|worked unit conversion)/ }).click();
    await page.locator("#leave-confirm").click();
    await page.getByRole("heading", { name: "Microscopy and cell measurements", exact: true }).waitFor();
    assert(await page.locator("[data-hb-model-step]:not([hidden])").isVisible());
    await page.getByRole("link", { name: "Return to your unfinished question set" }).click();
    await page.getByRole("heading", { name: "Explanation", exact: true }).waitFor();
    assert(await page.locator(".k-feedback.pending .k-model").isVisible());

    await open("catchup/f171/4.2.1");
    await page.getByRole("link", { name: "Build understanding", exact: true }).click();
    await page.locator(".k-question-view").waitFor();
    const buildKey = practiceKey + "-topic-f171/p-health-screening";
    const build = await saved(buildKey);
    assert.equal(build.queue.length, 4);
    assert.equal(build.returnTo, "catchup/f171/4.2.1");
    await page.getByRole("button", { name: /show me/ }).click();
    const queueWithRetry = (await saved(buildKey)).queue;
    assert.deepEqual(queueWithRetry.slice(0, build.queue.length), build.queue);
    await page.getByRole("link", { name: "Revisit why a positive screen can be false" }).click();
    await page.locator("#leave-confirm").click();
    assert.equal(await page.locator("[data-hb-model-step]").getAttribute("data-hb-model-step"), "2");
    await page.getByRole("link", { name: "Build understanding", exact: true }).click();
    await page.getByRole("heading", { name: "Explanation", exact: true }).waitFor();
    assert(await page.locator(".k-feedback.pending .k-model").isVisible());
    assert.deepEqual((await saved(buildKey)).queue, queueWithRetry);
    console.log("Batch 11 pilot success, help and reteaching journeys passed.");

    await open("cards/f171-2.3");
    await page.getByRole("textbox").fill("A saved flashcard draft.");
    await page.getByRole("link", { name: "Overview", exact: true }).click();
    await page.locator("#leave-confirm").click();
    await page.getByRole("region", { name: "Continue learning" }).getByRole("link", { name: /Resume F171 Flashcards/ }).click();
    assert.equal(await page.getByRole("textbox").inputValue(), "A saved flashcard draft.");

    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f170/3.3.1");
    await expand(page.locator("[data-hb-model-step]"));
    const originalUterine = page.locator('[data-hb-model-step] li:nth-child(1) img[src="/assets/micrographs/hb-endometrium.webp"]');
    const originalAssessment = stage("independent").locator('.hb-teach-photo img');
    assert(await originalUterine.isVisible());
    await originalUterine.scrollIntoViewIfNeeded();
    assert.equal(await originalUterine.evaluate(async image => { await image.decode(); return image.naturalWidth; }), 760);
    await expand(stage("independent"));
    assert.equal(await originalAssessment.count(), 2);
    for (const [index, src, width] of [[0, "/assets/micrographs/hb-ovary.webp", 710], [1, "/assets/micrographs/hb-testis.webp", 479]]) {
      const field = originalAssessment.nth(index);
      assert.equal(await field.getAttribute("src"), src);
      await field.scrollIntoViewIfNeeded();
      assert.equal(await field.evaluate(async image => { await image.decode(); return image.naturalWidth; }), width);
    }

    await open("catchup/f175/a1");
    await expand(page.locator(".hb-teach-stage").first());
    await page.getByText("Open the reproductive pathway model", { exact: true }).press("Enter");
    const reproduction = page.locator("#krp-model");
    await reproduction.getByRole("button", { name: /FSH Develop/ }).press("Enter");
    await reproduction.getByRole("button", { name: /LH surge Trigger/ }).press("Enter");
    await reproduction.getByRole("button", { name: /Introduce sperm/ }).press("Enter");
    await reproduction.getByRole("button", { name: "Show possible fertilisation", exact: true }).press("Enter");
    await reproduction.getByRole("button", { name: /Show possible implantation/ }).press("Enter");
    assert.match(await reproduction.getByRole("status").innerText(), /Implantation is a separate event/);
    assert(await reproduction.locator("#krp-implant").isVisible());
    await reproduction.getByRole("button", { name: "Reset", exact: true }).press("Enter");
    assert(await reproduction.locator("#krp-implant").isHidden());

    const guide = reproduction.locator(".krp-guide");
    await guide.locator(":scope > summary").press("Enter");
    const checkpoint = guide.getByLabel("Revisit a stage");
    const nextCheckpoint = guide.getByRole("button", { name: "Next checkpoint" });
    const observation = guide.locator(".krp-observation");
    async function predict(name) {
      const option = guide.getByRole("radio", { name, exact: true });
      await option.press("Space");
      await guide.getByRole("button", { name: "Check prediction" }).press("Enter");
    }
    await predict("The lining of the uterus.");
    assert.match(await guide.locator(".krp-prediction").innerText(), /Look inside the ovary/);
    assert.equal(await guide.locator("[data-learning-feedback]").count(), 0);
    assert.equal(await observation.innerText(), "");
    await predict("The ovarian follicle.");
    assert.equal(await feedback(guide, "correct").getAttribute("data-feedback-animate"), "");
    assert.equal(await nextCheckpoint.isVisible(), false);
    await reproduction.getByRole("button", { name: /FSH Develop/ }).press("Enter");
    assert.match(await observation.innerText(), /follicle enlarges/);
    assert(await nextCheckpoint.evaluate(button => button === document.activeElement));
    await nextCheckpoint.press("Enter");
    await predict("A secondary oocyte is released from the follicle.");
    await reproduction.getByRole("button", { name: /LH surge Trigger/ }).press("Enter");
    assert.match(await observation.innerText(), /fimbriae/);
    await nextCheckpoint.press("Enter");
    await predict("In the widest region of an oviduct.");
    await reproduction.getByRole("button", { name: /Introduce sperm/ }).press("Enter");
    assert.match(await observation.innerText(), /vagina.*cervical canal.*uterine cavity.*oviduct/);
    await nextCheckpoint.press("Enter");
    await predict("The gametes may fail to meet while viable or may fail to fuse.");
    await reproduction.getByRole("button", { name: "Show possible fertilisation", exact: true }).press("Enter");
    assert(await reproduction.locator("#krp-blastocyst").isVisible());
    await nextCheckpoint.press("Enter");
    await predict("It undergoes cleavage and can develop into a blastocyst.");
    assert.match(await observation.innerText(), /fluid-filled cavity/);
    await nextCheckpoint.press("Enter");
    await predict("A blastocyst attaches to the uterine lining.");
    await reproduction.getByRole("button", { name: /Show possible implantation/ }).press("Enter");
    assert.match(await observation.innerText(), /several days after fertilisation/);
    assert(await guide.getByRole("link", { name: "Apply to a different situation" }).isVisible());

    await reproduction.getByRole("button", { name: "Reset", exact: true }).press("Enter");
    assert.equal(await checkpoint.inputValue(), "follicle");
    await checkpoint.selectOption("fertilisation");
    await predict("The gametes may fail to meet while viable or may fail to fuse.");
    assert(await feedback(guide, "correct").isVisible());
    assert.equal(await feedback(guide, "correct").getAttribute("data-feedback-animate"), null);
    await reproduction.getByRole("button", { name: /Introduce sperm/ }).press("Enter");
    await reproduction.getByRole("button", { name: /Select right ovary/ }).press("Enter");
    await reproduction.getByRole("button", { name: /LH surge Trigger/ }).press("Enter");
    assert(await reproduction.getByRole("button", { name: "Show possible fertilisation" }).isHidden());
    await reproduction.getByRole("button", { name: "Continue without fertilisation" }).press("Enter");
    assert.match(await reproduction.locator(".krp-status").innerText(), /does not develop into an embryo/);
    assert(await guide.getByRole("link", { name: "Apply to a different situation" }).isVisible());
    const writtenPath = reproduction.getByText("Read the pathway without animation", { exact: true });
    await writtenPath.press("Enter");
    assert.equal(await writtenPath.locator("..").getByRole("listitem").count(), 6);

    await page.addStyleTag({ content: "html{font-size:200%} .krp-root{line-height:1.5;letter-spacing:.025em}" });
    const enlargedLayout = await reproduction.evaluate(root => ({
      page: document.documentElement.scrollWidth - innerWidth,
      model: root.scrollWidth - root.clientWidth
    }));
    assert(enlargedLayout.page <= 3 && enlargedLayout.model <= 3,
      "F175 stage guide overflows at 320px with enlarged text: " + JSON.stringify(enlargedLayout));
    await page.addScriptTag({ content: axe.source });
    const reproductionIssues = await reproduction.evaluate(async root => (await window.axe.run(root, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] }
    })).violations.map(issue => issue.id));
    assert.deepEqual(reproductionIssues, [], "F175 simulation accessibility findings");

    const apply = guide.getByRole("link", { name: "Apply to a different situation" });
    const transportRoute = "challenge/f175/f175-transport?from=catchup/f175/a1";
    assert.equal(await apply.getAttribute("href"), "#" + transportRoute);
    assert(!(await saved("narajos-human-challenge-v2-progress"))?.["f175-transport"], "Watching the model must not record an assessment result");
    await apply.press("Enter");
    const caseStem = page.getByText(/fimbriae are held further from the ovary/);
    const transportWrong = page.getByRole("radio", { name: /Release of the secondary oocyte from its follicle/ });
    await caseStem.waitFor();
    await transportWrong.check();
    await page.getByRole("button", { name: /^Check$/ }).press("Enter");
    const transportFeedback = page.getByText(/Find the next step after release that depends on the fimbriae/);
    await transportFeedback.waitFor();
    await page.getByRole("link", { name: "Revisit how the oocyte enters the oviduct" }).press("Enter");
    await page.locator("#leave-confirm").press("Enter");
    await checkpoint.waitFor();
    assert.equal(await checkpoint.inputValue(), "ovulation");
    assert(await checkpoint.evaluate(select => document.activeElement === select));
    await guide.getByText("Review this stage", { exact: true }).press("Enter");
    await guide.getByText(/finger-like fimbriae help receive/).first().waitFor();
    await page.getByRole("link", { name: "Return to your unfinished question set" }).press("Enter");
    await transportFeedback.waitFor();
    assert.equal(new URL(page.url()).hash, "#" + transportRoute);
    assert.equal((await saved(practiceKey + "-topic-f175/f175-transport")).outcomes[0], "incorrect");

    const touch = await browser.newPage({ viewport: { width: 390, height: 780 }, hasTouch: true, reducedMotion: "reduce" });
    try {
      await touch.goto(base + "/human-biology/#catchup/f175/a1/2");
      await touch.getByText("Predict and explain", { exact: true }).tap();
      await touch.getByText("The ovarian follicle.", { exact: true }).tap();
      await touch.getByRole("button", { name: "Check prediction" }).tap();
      await touch.getByRole("button", { name: /FSH Develop/ }).tap();
      await touch.getByRole("button", { name: "Next checkpoint" }).tap();
      assert.equal(await touch.getByLabel("Revisit a stage").inputValue(), "ovulation");
      await touch.goto(base + "/human-biology/#" + transportRoute);
      await touch.getByRole("radio", { name: /Entry of the released oocyte into the oviduct/ }).locator("..").tap();
      await touch.getByRole("button", { name: /^Check$/ }).tap();
      const positive = feedback(touch.locator("[data-feedback-heading]"), "correct");
      assert(await positive.isVisible());
      assert.equal(await positive.locator(".learning-feedback__tick").evaluate(tick => getComputedStyle(tick).animationName), "none");
      assert.equal(await touch.evaluate(key => JSON.parse(localStorage.getItem(key)).outcomes[0],
        practiceKey + "-topic-f175/f175-transport"), "independent");
    } finally {
      await touch.close();
    }

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await open("catchup/f175/a1/2");
    await reproduction.getByRole("button", { name: /Replay from FSH/ }).click();
    const pause = reproduction.getByRole("button", { name: "Pause animation" });
    await pause.click();
    assert.equal(await reproduction.getByRole("button", { name: "Resume animation" }).getAttribute("aria-pressed"), "true");
    assert(await reproduction.getByRole("button", { name: /LH surge/ }).isHidden());
    await reproduction.getByRole("button", { name: "Resume animation" }).click();
    await reproduction.getByRole("button", { name: /LH surge/ }).click();
    const noFertilisation = reproduction.getByRole("button", { name: "Continue without fertilisation" });
    await noFertilisation.waitFor();
    await reproduction.getByRole("button", { name: /Introduce sperm/ }).click();
    assert(await noFertilisation.isHidden(), "The sperm transport should finish before choosing an outcome");
    await reproduction.getByRole("button", { name: "Show possible fertilisation", exact: true }).waitFor();
    await noFertilisation.click();
    assert.match(await reproduction.locator(".krp-status").innerText(), /Without fertilisation/);
    assert(await reproduction.locator("#krp-embryo").isHidden());
    await reproduction.getByRole("button", { name: "Reset", exact: true }).click();
    assert(await reproduction.getByRole("button", { name: /Introduce sperm/ }).isEnabled());

    await open("catchup/f177/a2");
    const f177Practice = page.getByRole("link", { name: "Practise research and trials" });
    const f177Route = "challenge/f177/a2?from=catchup/f177/a2";
    assert.equal(await f177Practice.getAttribute("href"), "#" + f177Route);
    await f177Practice.press("Enter");
    const f177Key = practiceKey + "-topic-f177/a2";
    await page.locator(".k-question-view").waitFor();
    await page.evaluate(key => {
      const run = JSON.parse(localStorage.getItem(key));
      run.queue = ["f177-diagram-randomise"];
      localStorage.setItem(key, JSON.stringify(run));
    }, f177Key);
    await page.reload();
    await page.getByRole("radio", { name: "Guarantee the treatment works" }).check();
    await page.getByRole("button", { name: /^Check$/ }).press("Enter");
    await page.getByRole("link", { name: "Revisit what random allocation changes" }).press("Enter");
    await page.locator("#leave-confirm").press("Enter");
    await page.locator('[data-hb-model-step="2"] [aria-current="step"]').waitFor();
    assert(await page.getByText(/Random allocation reduces systematic differences/).isVisible());
    assert.equal(await page.locator('a[href="#' + f177Route + '"]').count(), 1, "Show just one return to the same question");
    await page.getByRole("link", { name: "Return to your unfinished question set" }).press("Enter");
    await page.getByRole("heading", { name: "Not yet" }).waitFor();
    assert.equal((await saved(f177Key)).outcomes[0], "incorrect");

    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 820 });
      await open("catchup/f171/4.2.1");
      await expand(page.locator(".hb-teach-stage").first());
      await expand(stage("guided"));
      assert(await widthFits(), "Screening table overflow at " + width);
      if (width !== 320 && width !== 1280) continue;
      await page.addScriptTag({ content: axe.source });
      const results = await page.evaluate(async () => (await window.axe.run(
        document.querySelector(".hb-teaching"),
        { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } }
      )).violations.map(v => [v.id, v.nodes.map(node => node.target)]));
      assert.deepEqual(results, [], "Human Biology teaching accessibility at " + width);
    }
    await page.setViewportSize({ width: 640, height: 900 });
    await open("catchup/f170/3.1.2");
    await expand(page.locator("[data-hb-model-step]"));
    const glucoseGraph = page.getByRole("img", { name: /Glucose.*Time/ });
    assert(await glucoseGraph.isVisible());
    await page.getByText("Graph values in a table", { exact: true }).press("Enter");
    assert(await page.getByRole("table", { name: "Fictional glucose data" }).isVisible());
    const zoom = await page.addStyleTag({ content: "html { zoom: 2; }" });
    assert(await widthFits(), "Glucose graph overflow at simulated 200% zoom");
    await zoom.evaluate(element => element.remove());

    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const width of [640, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await open("catchup/f175/a1?stage=transport");
      assert.equal(await checkpoint.inputValue(), "transport");
      await guide.getByText("Review this stage", { exact: true }).press("Enter");
      await guide.getByText(/widest region of an oviduct, the ampulla/).first().waitFor();
      await reproduction.getByRole("button", { name: "Follow the current stage" }).press("Enter");
      const reflow = await page.addStyleTag({ content: "html { zoom: 2; }" });
      assert(await widthFits(), "F175 diagram overflows at 200% zoom with viewport " + width);
      await reflow.evaluate(element => element.remove());
    }
    await page.setViewportSize({ width: 320, height: 800 });
    await open("catchup/f176/a2?review=6");
    const thresholdTable = page.getByRole("table", { name: /Two ways to bring a receiving neurone closer/ });
    assert(await thresholdTable.isVisible());
    assert.equal(await thresholdTable.getByRole("cell", { name: "−58 mV" }).count(), 2);
    assert.equal(await thresholdTable.locator(".hb-cell-focus").count(), 5);
    await page.addStyleTag({ content: "html { font-size: 125%; }" });
    assert(await widthFits(), "F176 input comparison overflows with enlarged text");
    await page.addScriptTag({ content: axe.source });
    const thresholdIssues = await thresholdTable.evaluate(async table => (await window.axe.run(table, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] }
    })).violations.map(issue => issue.id));
    assert.deepEqual(thresholdIssues, []);

    await page.setViewportSize({ width: 320, height: 800 });
    await open("catchup/f171/a5");
    const text = await page.addStyleTag({ content: "html { font-size: 125%; }" });
    await expand(stage("independent"));
    await stage("independent").getByRole("textbox").fill("The supervised practice differs between the two groups.");
    await stage("independent").getByRole("button", { name: "Compare my explanation" }).press("Enter");
    assert(await widthFits(), "Written review overflow at 320px with larger text");
    await page.addScriptTag({ content: axe.source });
    const reviewResults = await page.evaluate(async () => (await window.axe.run(
      document.querySelector(".hb-teaching"),
      { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } }
    )).violations.map(violation => [violation.id, violation.nodes.map(node => node.target)]));
    assert.deepEqual(reviewResults, [], "Written review accessibility at 320px");
    await text.evaluate(element => element.remove());
    await open("catchup/f173/a3");
    await page.getByRole("link", { name: "Practise chromatogram interpretation", exact: true }).press("Enter");
    const chromatographyKey = practiceKey + "-topic-f173/3.4";
    const chromatogramId = "f173-chromatogram-transfer";
    await page.locator(".k-question-view").waitFor();
    await page.evaluate(([key, id]) => {
      const practice = JSON.parse(localStorage.getItem(key));
      practice.queue = [id];
      localStorage.setItem(key, JSON.stringify(practice));
    }, [chromatographyKey, chromatogramId]);
    await page.reload();
    const chromatogram = page.getByRole("img", { name: /baseline at 2 cm and a solvent front at 10 cm/ });
    assert.equal(await chromatogram.evaluate(async img => { await img.decode(); return img.naturalWidth; }), 600);
    assert(await widthFits(), "Independent chromatogram does not fit at 320px");
    const incorrectRatio = page.getByRole("radio", { name: /Rf 0.80/ });
    await incorrectRatio.press("Space");
    await page.getByRole("button", { name: /^Check$/ }).press("Enter");
    const ratioFeedback = page.getByText(/Subtract the baseline from both readings first/);
    await ratioFeedback.waitFor();
    await page.reload();
    await ratioFeedback.waitFor();
    assert.equal((await saved(chromatographyKey)).outcomes[0], "incorrect");

    // A non-guided recap keeps its process visual and a line-specific caption on each step.
    await open("catchup/f173/a1");
    for (const [index, caption] of ["Follow the sample", "Locate the sample label", "Notice that a report"].entries()) {
      const panel = page.locator("section.paper.panel");
      const image = panel.locator('img[src="/human-biology/lab-sample-workflow.svg"]');
      assert(await image.isVisible());
      assert(await image.evaluate(async element => { await element.decode(); return element.naturalWidth > 0 && element.alt.length > 20; }));
      await panel.getByText(caption, {exact: false}).waitFor();
      assert(await widthFits(), "Laboratory recap must fit at phone size");
      if (index < 2) await page.getByRole("link", {name: "Next key idea →"}).click();
    }

    // A short recap keeps each mapped figure beside its own current idea.
    await open("catchup/f173/a3/1");
    const recapPanel = page.locator("section.paper.panel");
    await recapPanel.getByText(/Chromatography separates substances/).waitFor();
    const recapChromatogram = recapPanel.locator('img[src="/human-biology/chromatography.svg"]');
    assert(await recapChromatogram.isVisible());
    assert(await recapChromatogram.evaluate(async image => { await image.decode(); return image.naturalWidth > 0; }));
    assert(await widthFits(), "Recap figure must fit at phone size");
    await page.getByRole("link", {name: "Next key idea →"}).click();
    await page.locator('section.paper.panel img[src="/human-biology/benedicts-controls.svg"]').waitFor();
    assert.equal(await page.locator('section.paper.panel img[src="/human-biology/chromatography.svg"]').count(), 0);
    for (const [route, files] of [
      ["f170/1.2.2/0", ["epithelia-comparison.svg"]], ["f170/1.2.2/1", ["muscle-tissue-comparison.svg"]],
      ["f170/1.2.2/2", ["connective-tissue-comparison.svg", "blood-components.svg"]],
      ["f170/1.2.3/0", ["cell-culture-vessel.svg"]], ["f170/1.2.3/1", ["organoid-structure.svg"]], ["f170/1.2.3/2", ["organoid-context.svg"]],
      ["f171/1.2.1.tissues/1", ["f171-myelin-change.svg", "f171-inflamed-joint.svg"]], ["f171/1.2.1.tissues/2", ["f171-melanocytes.svg", "f171-vitamin-d-calcium.svg", "f171-bone-mineral.svg"]],
      ["f171/1.2.1.oxygen/1", ["airway-narrowing.svg"]], ["f171/1.2.1.oxygen/2", ["f171-sickle-vessel.svg"]], ["f171/1.2.1.oxygen/3", ["iron-blood-oxygen.svg"]],
      ["f171/1.2.1.digestive/1", ["f171-intestinal-absorption.svg"]], ["f171/1.2.1.digestive/2", ["f171-hiatus-position.svg"]],
      ["f171/1.2.1.movement/1", ["f171-movement-pathways.svg"]], ["f171/1.2.1.movement/2", ["f171-movement-pathways.svg"]],
      ["f171/1.2.1.airways/1", ["f171-asthma-airway.svg"]], ["f171/1.2.1.airways/2", ["alveolar-wall-loss.svg"]],
      ["f171/1.2.1.renal/1", ["f171-glomerular-barrier.svg"]], ["f171/1.2.1.renal/2", ["f171-kidney-cysts.svg"]],
      ["f171/1.2.1.hodgkin/1", ["f171-lymph-node-airway.svg"]], ["f171/1.2.1.pkd/1", ["f171-kidney-volume-filtration.svg"]], ["f171/4.2.2/1", ["f171-pressure-readings.svg"]],
      ["f171/2.2/1", ["f171-functional-outcome.svg"]],
      ["f175/2.1/1", ["f175-history-ultrasound.svg"]], ["f170/3.3.1/2", ["hb-endometrium.webp", "hb-follicle-teaching.webp", "hb-tubule-teaching.webp"]],
      ["f170/3.3.1/1", ["f170-sperm-route.svg"]], ["f170/3.3.2/2", ["f170-gamete-patterns.svg"]],
      ["f170/3.3.3/0", ["f170-menopause-change.svg"]], ["f170/3.3.3/1", ["f170-menopause-therapy.svg"]], ["f170/3.3.3/2", ["f170-prostate-enlargement.svg"]],
      ["f170/3.3.2/1", ["f170-ovarian-hormones.svg", "f170-testicular-hormones.svg"]],
      ["f170/3.1.2/1", ["f170-diabetes-comparison.svg"]], ["f170/3.1.2/2", ["f170-glucose-testing-context.svg"]],
      ["f170/3.1.1/1", ["f170-glucose-response.svg", "f170-beta-insulin.svg", "f170-insulin-targets.svg"]], ["f170/3.1.1/2", ["f170-insulin-targets.svg", "adh-epo-kidney.svg"]],
      ["f170/2.1.3.cirrhosis/1", ["f170-bilirubin-albumin.svg"]],
      ["f170/2.1.2/1", ["f170-alveolar-barrier.svg", "digestion.svg"]],
      ["f170/2.1.3/2", ["dexa-scan.svg"]],
      ["f170/2.1.3/1", ["artery-plaque-comparison.svg", "airway-narrowing.svg", "alveolar-wall-loss.svg"]],
      ["f170/2.2.2/1", ["bone-functions.svg"]],
      ["f170/2.2.1/0", ["f170-oxygen-delivery.svg"]], ["f170/2.2.1/1", ["digestion.svg", "f170-nephron-overview.svg"]], ["f170/2.2.1/2", ["f170-oxygen-delivery.svg"]], ["f170/2.2.3/1", ["peak-flow-method.svg"]], ["f170/2.2.3/2", ["f170-ventilation-example.svg"]],
      ["f170/2.1.1/0", ["f170-alveolar-barrier.svg"]], ["f170/2.1.1/1", ["pulse-measurement-context.svg"]], ["f170/2.1.1/2", ["pulse-measurement-context.svg"]],
      ["f170/2.1.4/0", ["f170-antigen-recognition.svg"]], ["f170/2.1.4/1", ["ventricular-assist.svg"]], ["f170/2.1.4/2", ["valve-repair.svg"]],
      ["f170/1.1.2/1", ["hb-blood-cells-sem.webp", "hb-lung-mitochondrion-tem.webp"]],
      ["f170/1.1.2/2", ["f170-wet-mount.svg", "f170-section-stain.svg"]],
      ["f170/1.1.2/3", ["f170-print-magnification.svg", "f170-fractionation-spins.svg", "cell-counting-chamber.svg"]],
      ["f170/1.1.2.counting/1", ["cell-counting-impedance.svg", "cell-counting-clumps.svg"]],
      ["f170/1.1.3/1", ["cell-protein-routing.svg"]],
      ["f170/1.1.3/2", ["cell-mito-protein-import.svg", "f170-ribosome-types.svg"]],
      ["f170/1.1.1.signals/1", ["reflex-pathway.svg", "myelinated-axon.svg"]],
      ["f170/1.1.3.evidence/1", ["f170-ribosome-types.svg"]],
      ["f170/1.1.3.evidence/2", ["cell-er-comparison.svg", "cell-protein-routing.svg", "f170-lysosome-digestion.svg"]],
      ["f170/4.2/0", ["f170-microbiota-sites.svg"]], ["f170/4.2/1", ["f170-microbiota-benefits.svg"]], ["f170/4.2/2", ["f170-microbiota-interventions.svg"]],
      ["f170/4.1.3/0", ["f170-microbiota-sites.svg", "f170-microbial-environments.svg"]], ["f170/4.1.3/1", ["f170-sampling-contamination.svg"]], ["f170/4.1.3/2", ["f170-asepsis-limit.svg"]],
      ["f170/4.1.2/0", ["f170-fungal-hyphae.svg"]], ["f170/4.1.2/1", ["f170-fungal-digestion.svg"]], ["f170/4.1.2/2", ["f170-fungal-disease-examples.svg"]],
      ["f170/4.1.4/1", ["f170-growth-graph.svg", "f170-binary-fission.svg", "f170-population-balance.svg"]],
      ["f170/4.1.1/1", ["f170-gram-envelope.svg", "hb-gram-comparison.webp"]], ["f170/4.1.1/2", ["f170-mesosome-artefact.svg"]],
      ["f170/4.1.5/0", ["virus-particle.svg"]], ["f170/4.1.5/1", ["virus-host.svg"]], ["f170/4.1.5/2", ["bacteriophage.svg"]],
      ["f170/1.1.4/1", ["f170-oxygen-diffusion.svg", "f170-channel-diffusion.svg", "f170-carrier-diffusion.svg", "f170-water-active.svg"]],
      ["f170/1.1.4/2", ["f170-water-active.svg", "f170-antigen-recognition.svg"]],
      ["f170/1.2.1/1", ["f170-levels-organisation.svg"]], ["f170/1.2.1/2", ["gut-wall-tissues.svg"]],
      ["f170/1.1.5/1", ["f170-crossing-over.svg", "f170-meiosis-first-division.svg", "f170-meiosis-orientation.svg", "f170-meiosis-second-division.svg"]],
      ["f170/1.1.5/2", ["punnett-cross.svg"]],
      ["f170/1.1.5.meiosis/1", ["f170-meiosis-first-division.svg", "f170-meiosis-orientation.svg"]],
      ["f170/1.1.5.meiosis/2", ["f170-meiosis-second-division.svg", "f170-oocyte-unequal-division.svg"]],
      ["f170/1.1.4.surface/1", ["f170-receptor-signalling.svg", "f170-extrinsic-receptor.svg"]],
      ["f170/1.1.4.surface/2", ["f170-antigen-recognition.svg"]],
      ["f170/1.1.4.surface/3", ["f170-vesicle-traffic.svg"]],
      ["f170/3.2.1/1", ["action-potential-ions.svg", "myelinated-axon.svg"]], ["f170/3.2.1/2", ["f170-autonomic-cns-pns.svg"]],
      ["f172/a1/1", ["meiosis.svg"]], ["f172/a2/1", ["punnett-cross.svg"]],
      ["f172/a2/2", ["punnett-cross.svg"]], ["f172/a3/1", ["genetic-test.svg"]],
      ["f172/a4/2", ["gene-delivery.svg"]],
      ["f173/a2/1", ["hb-blood-cells-sem.webp", "hb-pancreas-tem.webp"]],
      ["f174/a2/0", ["iron-blood-oxygen.svg"]], ["f174/a2/1", ["water-balance.svg"]], ["f174/a2/2", ["body-composition.svg"]],
      ["f175/a2/1", ["placental-exchange.svg"]], ["f175/a3/1", ["oviduct-obstruction.svg"]],
      ["f176/a3/1", ["nociception-pathway.svg"]], ["f177/a1/2", ["receptor.svg"]],
      ["f177/a2/2", ["trial-comparison.svg"]]
    ]) {
      await open("catchup/" + route);
      for (const file of files) {
        const image = page.locator(`section.paper.panel img[src$="/${file}"]`);
        assert(await image.isVisible(), `Recap ${route} should show ${file}`);
        await image.scrollIntoViewIfNeeded();
        assert(await image.evaluate(async element => { await element.decode(); return element.naturalWidth > 0 && element.alt.length > 20; }));
      }
      assert(await widthFits(), `Recap ${route} must fit the phone viewport`);
    }
    await open("catchup/f170/3.3.1/2");
    for (const file of ["hb-endometrium.webp", "hb-follicle-teaching.webp", "hb-tubule-teaching.webp"]) {
      const photo = page.locator('figure').filter({has: page.locator(`img[src$="/${file}"]`)});
      assert.equal(await photo.locator("figcaption a").count(), 2, "recap specimen retains source and licence");
    }
    await open("catchup/f170/4.1.1/1");
    const gramCredit = page.locator('figure').filter({has: page.locator('img[src="/assets/micrographs/hb-gram-comparison.webp"]')});
    assert.equal(await gramCredit.locator("figcaption a").count(), 2, "recap micrograph retains source and licence links");
    await open("catchup/f172/a1");
    const recapDisclosure = page.locator("details.paper.panel").filter({hasText: "Review the key ideas"});
    await recapDisclosure.locator(":scope > summary").click();
    assert(await recapDisclosure.locator('li img[src="/human-biology/meiosis.svg"]').isVisible());

    // Airway and alveolar diagrams follow their respective worked steps.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/1.2.1");
    const airwayParagraph = page.locator(".hb-teach-explain p").filter({hasText: "COPD involves persistent difficulty"});
    assert(await airwayParagraph.evaluate(element => {
      const first = element.nextElementSibling, second = first?.nextElementSibling;
      return Boolean(first?.querySelector('img[src$="/airway-narrowing.svg"]') && second?.querySelector('img[src$="/alveolar-wall-loss.svg"]'));
    }), "The airflow and exchange figures follow the relevant explanation");
    const airwayModel = page.locator("[data-hb-model-step]");
    await expand(airwayModel);
    const airwayStep = airwayModel.locator('img[src="/human-biology/airway-narrowing.svg"]');
    const alveoliStep = airwayModel.locator('img[src="/human-biology/alveolar-wall-loss.svg"]');
    assert(await airwayStep.isVisible());
    assert(!(await alveoliStep.isVisible()));
    await airwayModel.getByRole("button", {name: "Show next step"}).click();
    assert(await alveoliStep.isVisible());
    assert(await alveoliStep.evaluate(async image => { await image.decode(); return image.naturalWidth > 0; }));
    assert(await widthFits(), "Worked alveolar diagram must fit the phone viewport");
    assert.equal(await stage("independent").locator('img[src="/human-biology/alveolar-wall-loss.svg"]').count(), 0);

    // Cell photographs and diagrams remain beside the facts they explain.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f170/1.1.1");
    const cellEvidence = await page.locator(".hb-teach-explain").evaluate(element => {
      const p = Array.from(element.children).filter(child => child.tagName === "P");
      const imageSource = child => child?.querySelector("img")?.getAttribute("src") || "";
      return [imageSource(p[0]?.nextElementSibling), imageSource(p[0]?.nextElementSibling?.nextElementSibling),
        imageSource(p[1]?.nextElementSibling), imageSource(p[1]?.nextElementSibling?.nextElementSibling)];
    });
    assert.deepEqual(cellEvidence, ["/assets/micrographs/hb-blood-cells-sem.webp", "/human-biology/red-cell-section.svg", "/human-biology/white-cell-nuclei.svg", "/human-biology/white-cell-defence.svg"]);
    assert.equal(await stage("independent").locator('img[src$="/white-cell-defence.svg"]').count(), 0);

    // Count and organelle diagrams follow the authored paragraph and model step.
    for (const [route, explain, worked] of [
      ["f170/1.1.1", ["red-cell-section.svg", "white-cell-nuclei.svg"], ["red-cell-section.svg", "red-cell-section.svg", "red-cell-capacity.svg"]],
      ["f170/1.1.2.counting", ["cell-counting-chamber.svg", "cell-counting-impedance.svg"], ["cell-counting-chamber.svg", "cell-counting-clumps.svg"]],
      ["f170/1.1.3", ["cell-nucleus-traffic.svg", "cell-mito-protein-import.svg", "cell-er-comparison.svg", "cell-protein-routing.svg"], ["cell-nucleus-rer.svg", "cell-protein-routing.svg", "cell-secretion-failure.svg"]],
      ["f170/1.1.3.evidence", ["f170-ribosome-assembly.svg", "f170-ribosome-types.svg", "cell-er-comparison.svg"], ["cell-protein-routing.svg", "f170-enzyme-misrouting.svg"]],
      ["f170/1.1.1.signals", ["f170-rod-cone-structure.svg", "reflex-pathway.svg"], ["reflex-pathway.svg", "reflex-pathway.svg", "f170-retinal-convergence.svg"]],
      ["f170/1.1.5", ["f170-sister-chromatids.svg", "f170-mitosis-stages.svg", "f170-cytokinesis.svg"], ["f170-sister-chromatids.svg", "f170-sister-chromatids.svg", "f170-mitosis-count.svg"]],
      ["f170/1.1.5.meiosis", ["f170-crossing-over.svg", "f170-meiosis-first-division.svg", "f170-meiosis-second-division.svg"], ["f170-meiosis-copying.svg", "f170-meiosis-first-division.svg", "f170-meiosis-second-division.svg"]],
      ["f170/1.2.1", ["f170-levels-organisation.svg", "f170-ventricle-damage.svg"], ["f170-ventricle-damage.svg", "f170-ventricle-damage.svg", "f170-ventricle-damage.svg"]],
      ["f170/4.1.4", ["f170-binary-fission.svg"], ["f170-growth-graph.svg", "f170-growth-graph.svg", "f170-growth-graph.svg"]],
      ["f170/4.1.1", ["f170-gram-envelope.svg", "f170-gram-stain-sequence.svg"], ["f170-gram-envelope.svg", "f170-gram-envelope.svg"]],
      ["f172/a1", ["meiosis.svg"], ["meiosis.svg", "f172-meiosis-alleles.svg", "f172-mitosis-alleles.svg"]],
      ["f177/a3", ["f177-preclinical-evidence.svg", "f177-study-duration.svg"], ["f177-preclinical-evidence.svg", "f177-study-duration.svg", "f177-safety-signal.svg"]],
      ["f176/a5", ["f176-eeg-trace.svg"], ["f176-eeg-trace.svg", "f176-mri-ct.svg"]],
      ["f176/a4", ["f176-coordination-injury.svg"], ["f176-coordination-injury.svg", "f176-coordination-injury.svg"]],
      ["f175/2.1", ["f175-history-ultrasound.svg", "f175-history-ultrasound.svg"], ["f175-history-ultrasound.svg", "f175-baseline-pressure.svg", "f175-history-ultrasound.svg"]],
      ["f171/1.3.1.protozoa", ["f171-malaria-vector.svg"], ["f171-malaria-blood-cells.svg", "f171-malaria-vector.svg"]],
      ["f171/1.3.1.fungi", ["f171-candida-overgrowth.svg"], ["f171-histoplasma-exposure.svg", "f171-candida-overgrowth.svg"]],
      ["f171/1.3.1.bacteria", ["f171-tick-bacterium.svg"], ["f171-tick-bacterium.svg", "f171-tick-bacterium.svg"]],
      ["f171/1.3.1.viruses", ["f171-hiv-stage.svg", "f171-sign-symptom.svg"], ["f171-sign-symptom.svg", "f171-sign-symptom.svg", "f171-air-blood-prevention.svg"]],
      ["f171/1.2.1.tissues", [null, "f171-myelin-change.svg", "f171-melanocytes.svg"], ["f171-inflamed-joint.svg", "f171-inflamed-joint.svg"]],
      ["f171/1.2.1.oxygen", [null, "airway-narrowing.svg", "f171-sickle-vessel.svg", "iron-blood-oxygen.svg"], ["f171-sickle-vessel.svg", "iron-blood-oxygen.svg"]],
      ["f171/1.2.1.digestive", ["f171-intestinal-absorption.svg", "f171-intestinal-absorption.svg", "f171-hiatus-position.svg"], ["f171-hiatus-position.svg", "f171-hiatus-position.svg"]],
      ["f171/1.2.1.movement", ["f171-movement-pathways.svg", "f171-movement-pathways.svg", "f171-movement-pathways.svg"], ["f171-movement-pathways.svg", "f171-movement-pathways.svg"]],
      ["f171/1.2.1.airways", [null, "f171-asthma-airway.svg", "alveolar-wall-loss.svg"], ["f171-asthma-airway.svg", "f171-asthma-airway.svg"]],
      ["f171/1.2.1.aorta", ["f171-aorta-local-widening.svg", "f171-aorta-local-widening.svg", "f171-aorta-measurements.svg"], ["f171-aorta-local-widening.svg", "f171-aorta-measurements.svg"]],
      ["f171/1.2.1.renal", ["f171-glomerular-barrier.svg", "f171-glomerular-barrier.svg", "f171-kidney-cysts.svg"], ["f171-glomerular-barrier.svg", "f171-kidney-cysts.svg"]],
      ["f171/4.1", [null, null, null, "peak-flow-method.svg"], ["f171-expired-volume-time.svg", "f171-expired-volume-time.svg", "f171-pulse-oximetry.svg"]],
      ["f171/4.2.2", [], ["f171-pressure-readings.svg", "f171-pressure-readings.svg", "f171-pressure-readings.svg"]],
      ["f171/a4", [], ["f171-pressure-readings.svg", "f171-pressure-readings.svg", "f171-pressure-readings.svg"]],
      ["f171/2.2", ["f171-functional-outcome.svg"], [null, "f171-levodopa-signalling.svg", "f171-functional-outcome.svg"]],
      ["f171/1.2.1.pkd", ["f171-kidney-cysts.svg"], ["f171-kidney-cysts.svg", "f171-kidney-volume-filtration.svg"]],
      ["f171/1.2.1.hodgkin", [null, "f171-lymph-node-airway.svg"], ["f171-lymph-node-airway.svg", "f171-lymph-node-airway.svg", null]],
      ["f170/3.3.2", ["f170-ovarian-hormones.svg", "f170-testicular-hormones.svg"], ["f170-ovarian-hormones.svg", "f170-ovarian-hormones.svg", "f170-ovarian-hormones.svg"]],
      ["f170/3.1.2", ["f170-glucose-tolerance-graph.svg", "f170-diabetes-comparison.svg"], ["f170-glucose-tolerance-graph.svg", "f170-glucose-tolerance-graph.svg", "f170-glucose-tolerance-graph.svg"]],
      ["f170/3.1.1", ["f170-glucose-response.svg"], ["f170-glucose-response.svg", "f170-beta-insulin.svg", "f170-insulin-targets.svg", "f170-glucose-response.svg"]],
      ["f170/2.1.3.cirrhosis", ["f170-liver-cirrhosis.svg", "f170-bilirubin-albumin.svg"], ["f170-liver-bruising.svg", "f170-liver-bruising.svg", "f170-liver-bruising.svg"]],
      ["f170/2.1.2", ["f170-circulation-path.svg"], ["f170-pulmonary-valve.svg", "f170-alveolar-barrier.svg", "f170-circulation-path.svg"]],
      ["f170/2.1.3", ["f170-oxygen-delivery.svg"], ["f170-alveolar-gradient.svg", "f170-alveolar-barrier.svg", "f170-oxygen-delivery.svg"]],
      ["f170/2.2.2", ["f170-oxygen-delivery.svg"], ["f170-muscle-oxygen-demand.svg", "f170-alveolar-barrier.svg", "f170-oxygen-delivery.svg"]],
      ["f170/2.2.3", ["f170-ventilation-example.svg", "peak-flow-method.svg"], ["f170-ventilation-example.svg", "f170-ventilation-example.svg", "f170-oxygen-delivery.svg"]],
      ["f170/1.1.4", ["f170-oxygen-diffusion.svg", "f170-water-active.svg"], ["f170-oxygen-diffusion.svg", "f170-oxygen-diffusion.svg", "f170-oxygen-diffusion.svg"]],
      ["f170/1.1.4.surface", ["f170-membrane-labelled.svg", "f170-receptor-signalling.svg", "f170-antigen-recognition.svg", "f170-vesicle-traffic.svg"], ["f170-membrane-labelled.svg", "f170-cholesterol-membrane.svg", "f170-membrane-labelled.svg"]]
    ]) {
      await page.evaluate(key => localStorage.removeItem(key), localPractice);
      await open("catchup/" + route);
      const explanation = page.locator(".hb-teach-explain");
      const paragraphs = explanation.locator(":scope > p");
      for (let i = 0; i < explain.length; i++) {
        const file = explain[i];
        if (!file) continue;
        assert(await paragraphs.nth(i).evaluate((el, name) => {
          for (let sibling = el.nextElementSibling; sibling && sibling.tagName !== "P"; sibling = sibling.nextElementSibling) {
            if (sibling.querySelector(`img[src$="/${name}"]`)) return true;
            if (!sibling.matches("figure, .hb-teaching-diagram, .hb-teaching-photo")) break;
          }
          return false;
        }, file), file + " must follow its paragraph within its figure group");
      }
      const model = page.locator("[data-hb-model-step]");
      await expand(model);
      for (let i = 0; i < worked.length; i++) {
        if (worked[i]) {
          const image = model.locator(`li:nth-child(${i + 1}) img[src$="/${worked[i]}"]`);
          assert(await image.isVisible(), worked[i] + " must follow its worked step");
          assert(await image.evaluate(async element => { await element.decode(); return element.naturalWidth > 0 && element.alt.length > 20; }));
        }
        if (i + 1 < worked.length) await model.getByRole("button", {name: "Show next step"}).click();
      }
      assert(await widthFits(), route + " must fit at phone size");
      assert.equal(await stage("independent").locator(".hb-teaching-diagram").count(), 0);
    }

    // Red-cell flexibility and haemoglobin capacity address the same worked step.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f170/1.1.1");
    const redCellModel = page.locator("[data-hb-model-step]");
    await expand(redCellModel);
    await redCellModel.getByRole("button", {name: "Show next step"}).click();
    await redCellModel.getByRole("button", {name: "Show next step"}).click();
    assert(await redCellModel.locator('li:nth-child(3) img[src$="/red-cell-capacity.svg"]').isVisible());
    assert(await redCellModel.locator('li:nth-child(3) img[src$="/f170-red-cell-flexibility.svg"]').isVisible());
    assert.equal(await stage("independent").locator('img[src$="/f170-red-cell-flexibility.svg"]').count(), 0);

    // Oximetry directly answers the independent question: hide it until teaching resumes.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/4.1");
    const oximetryExplanation = page.locator('.hb-teach-explain figure[data-hb-assessment-sensitive]').filter({has: page.locator('img[src="/human-biology/f171-pulse-oximetry.svg"]')});
    assert(await oximetryExplanation.isVisible());
    await expand(stage("independent"));
    assert(await oximetryExplanation.isHidden());
    await page.reload();
    assert(await oximetryExplanation.isHidden());
    await expand(page.locator("[data-hb-model-step]"));
    assert(await oximetryExplanation.isVisible());

    // Renal diagrams directly answer the independent comparison and must also hide.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/1.2.1.renal");
    const renalTeachingFigures = page.locator('.hb-teach-explain figure[data-hb-assessment-sensitive]');
    assert.equal(await renalTeachingFigures.count(), 3);
    await expand(stage("independent"));
    assert(await renalTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await page.reload();
    assert(await renalTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await expand(page.locator("[data-hb-model-step]"));
    assert(await renalTeachingFigures.evaluateAll(figures => figures.every(figure => !figure.hidden)));

    // Aortic diameter and pressure figures also answer the independent task.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/1.2.1.aorta");
    const aortaTeachingFigures = page.locator('.hb-teach-explain figure[data-hb-assessment-sensitive]');
    assert.equal(await aortaTeachingFigures.count(), 3);
    await expand(stage("independent"));
    assert(await aortaTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await page.reload();
    assert(await aortaTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await expand(page.locator("[data-hb-model-step]"));
    assert(await aortaTeachingFigures.evaluateAll(figures => figures.every(figure => !figure.hidden)));

    // Asthma and emphysema diagrams also describe the independent answer.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/1.2.1.airways");
    const airwayTeachingFigures = page.locator('.hb-teach-explain figure[data-hb-assessment-sensitive]');
    assert.equal(await airwayTeachingFigures.count(), 2);
    await expand(stage("independent"));
    assert(await airwayTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await page.reload();
    assert(await airwayTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await expand(page.locator("[data-hb-model-step]"));
    assert(await airwayTeachingFigures.evaluateAll(figures => figures.every(figure => !figure.hidden)));

    // The movement pathway is hidden while its independent explanation is attempted.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/1.2.1.movement");
    const movementTeachingFigures = page.locator('.hb-teach-explain figure[data-hb-assessment-sensitive]');
    assert.equal(await movementTeachingFigures.count(), 3);
    await expand(stage("independent"));
    assert(await movementTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await page.reload();
    assert(await movementTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await expand(page.locator("[data-hb-model-step]"));
    assert(await movementTeachingFigures.evaluateAll(figures => figures.every(figure => !figure.hidden)));

    // The absorption figure directly supports the independent Crohn's explanation.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/1.2.1.digestive");
    const digestiveTeachingFigures = page.locator('.hb-teach-explain figure[data-hb-assessment-sensitive]');
    assert.equal(await digestiveTeachingFigures.count(), 2);
    await expand(stage("independent"));
    assert(await digestiveTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await page.reload();
    assert(await digestiveTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await expand(page.locator("[data-hb-model-step]"));
    assert(await digestiveTeachingFigures.evaluateAll(figures => figures.every(figure => !figure.hidden)));

    // Sickle-cell and iron-deficiency figures directly support the independent comparison.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/1.2.1.oxygen");
    const oxygenTeachingFigures = page.locator('.hb-teach-explain figure[data-hb-assessment-sensitive]');
    assert.equal(await oxygenTeachingFigures.count(), 2);
    await expand(stage("independent"));
    assert(await oxygenTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await page.reload();
    assert(await oxygenTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await expand(page.locator("[data-hb-model-step]"));
    assert(await oxygenTeachingFigures.evaluateAll(figures => figures.every(figure => !figure.hidden)));

    // Myelin and bone-mineral figures directly support the independent tissue comparison.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/1.2.1.tissues");
    const tissueTeachingFigures = page.locator('.hb-teach-explain figure[data-hb-assessment-sensitive]');
    assert.equal(await tissueTeachingFigures.count(), 3);
    await expand(stage("independent"));
    assert(await tissueTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await page.reload();
    assert(await tissueTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await expand(page.locator("[data-hb-model-step]"));
    assert(await tissueTeachingFigures.evaluateAll(figures => figures.every(figure => !figure.hidden)));

    // Booking-history versus scan figures would answer the independent task.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f175/2.1");
    const antenatalTeachingFigures = page.locator('.hb-teach-explain figure[data-hb-assessment-sensitive]');
    assert.equal(await antenatalTeachingFigures.count(), 2);
    await expand(stage("independent"));
    await expand(page.locator(".hb-teach-explain"));
    assert(await antenatalTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    assert(await page.locator('.hb-teach-explain img[src="/human-biology/f175-baseline-pressure.svg"]').isVisible());
    await page.reload();
    await expand(stage("independent"));
    await expand(page.locator(".hb-teach-explain"));
    assert(await antenatalTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await expand(page.locator("[data-hb-model-step]"));
    assert(await antenatalTeachingFigures.evaluateAll(figures => figures.every(figure => !figure.hidden)));

    // Non-booklet nervous-system teaching visuals hide during independent practice.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f176/a4");
    const injuryTeachingFigures = page.locator('.hb-teach-explain figure[data-hb-assessment-sensitive]');
    assert.equal(await injuryTeachingFigures.count(), 2);
    await expand(stage("independent"));
    await expand(page.locator(".hb-teach-explain"));
    assert(await injuryTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await page.reload();
    await expand(stage("independent"));
    await expand(page.locator(".hb-teach-explain"));
    assert(await injuryTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await expand(page.locator("[data-hb-model-step]"));
    assert(await injuryTeachingFigures.evaluateAll(figures => figures.every(figure => !figure.hidden)));

    // Investigation diagrams answer the independent method-choice question.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f176/a5");
    const investigationFigures = page.locator('.hb-teach-explain figure[data-hb-assessment-sensitive]');
    assert.equal(await investigationFigures.count(), 2);
    await expand(stage("independent"));
    await expand(page.locator(".hb-teach-explain"));
    assert(await investigationFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await page.reload();
    await expand(stage("independent"));
    await expand(page.locator(".hb-teach-explain"));
    assert(await investigationFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await expand(page.locator("[data-hb-model-step]"));
    assert(await investigationFigures.evaluateAll(figures => figures.every(figure => !figure.hidden)));

    // Safety-signal explanation is hidden while its independent question is open.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f177/a3");
    const signalTeachingFigure = page.locator('.hb-teach-explain figure[data-hb-assessment-sensitive]');
    assert.equal(await signalTeachingFigure.count(), 1);
    await expand(stage("independent"));
    await expand(page.locator(".hb-teach-explain"));
    assert(await signalTeachingFigure.evaluate(figure => figure.hidden));
    await page.reload();
    await expand(stage("independent"));
    await expand(page.locator(".hb-teach-explain"));
    assert(await signalTeachingFigure.evaluate(figure => figure.hidden));
    await expand(page.locator("[data-hb-model-step]"));
    assert(await signalTeachingFigure.evaluate(figure => !figure.hidden));

    // HIV infection versus AIDS is part of independent assessment.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/1.3.1.viruses");
    const hivTeachingFigures = page.locator('.hb-teach-explain figure[data-hb-assessment-sensitive]');
    assert.equal(await hivTeachingFigures.count(), 2);
    await expand(stage("independent"));
    assert(await hivTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await page.reload();
    assert(await hivTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await expand(page.locator("[data-hb-model-step]"));
    assert(await hivTeachingFigures.evaluateAll(figures => figures.every(figure => !figure.hidden)));

    // Fungal source diagrams answer the independent comparison directly.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/1.3.1.fungi");
    const fungalTeachingFigures = page.locator('.hb-teach-explain figure[data-hb-assessment-sensitive]');
    assert.equal(await fungalTeachingFigures.count(), 4);
    await expand(stage("independent"));
    assert(await fungalTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await page.reload();
    assert(await fungalTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await expand(page.locator("[data-hb-model-step]"));
    assert(await fungalTeachingFigures.evaluateAll(figures => figures.every(figure => !figure.hidden)));

    // Protozoan examples and the credited blood film directly support independent practice.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/1.3.1.protozoa");
    const protozoaTeachingFigures = page.locator('.hb-teach-explain figure[data-hb-assessment-sensitive]');
    assert.equal(await protozoaTeachingFigures.count(), 5);
    const bloodFilm = protozoaTeachingFigures.filter({has: page.locator('img[src="/assets/micrographs/hb-plasmodium-rings.webp"]')});
    assert.equal(await bloodFilm.locator("figcaption a").count(), 2, "blood-film source and licence are accessible");
    await expand(stage("independent"));
    assert(await protozoaTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await page.reload();
    assert(await protozoaTeachingFigures.evaluateAll(figures => figures.every(figure => figure.hidden)));
    await expand(page.locator("[data-hb-model-step]"));
    assert(await protozoaTeachingFigures.evaluateAll(figures => figures.every(figure => !figure.hidden)));

    // Both linked meiosis views remain on their matching paragraph and worked step.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f170/1.1.5.meiosis");
    const divisionParagraph = page.locator(".hb-teach-explain > p").nth(1);
    assert(await divisionParagraph.evaluate(el => {
      const first = el.nextElementSibling;
      const second = first?.nextElementSibling;
      return Boolean(first?.querySelector('img[src$="/f170-meiosis-first-division.svg"]') && second?.querySelector('img[src$="/f170-meiosis-orientation.svg"]'));
    }));
    const meiosisModel = page.locator("[data-hb-model-step]");
    await expand(meiosisModel);
    await meiosisModel.getByRole("button", {name: "Show next step"}).click();
    assert(await meiosisModel.locator('li:nth-child(2) img[src$="/f170-meiosis-first-division.svg"]').isVisible());
    assert(await meiosisModel.locator('li:nth-child(2) img[src$="/f170-meiosis-orientation.svg"]').isVisible());
    assert.equal(await stage("independent").locator(".hb-teaching-diagram").count(), 0);

    // Reproductive teaching fields have credits and remain attached to their own step.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f170/3.3.1");
    const reproductiveData = await page.evaluate(() => {
      const lesson = window.KeystoneHumanLessons["f170/3.3.1"];
      return {photos: lesson.explainPhotos[0].map(photo => photo.src), uterine: lesson.modelPhotos[0].src};
    });
    const reproductiveExplain = page.locator(".hb-teach-explain");
    assert(await reproductiveExplain.locator(":scope > p").first().evaluate((paragraph, files) => {
      let sibling = paragraph.nextElementSibling;
      return files.every(file => {
        const found = sibling?.matches("figure") && sibling.querySelector(`img[src="${file}"]`);
        sibling = sibling?.nextElementSibling;
        return Boolean(found);
      });
    }, reproductiveData.photos));
    const reproductiveModel = page.locator("[data-hb-model-step]");
    await expand(reproductiveModel);
    for (let i = 0; i < 2; i++) {
      const figure = reproductiveModel.locator(`li:nth-child(${i + 1}) figure`).filter({has: page.locator(`img[src="${reproductiveData.uterine}"]`)});
      assert(await figure.isVisible());
      assert.equal(await figure.locator("figcaption a").count(), 2, "photo source and licence must remain accessible");
      await reproductiveModel.getByRole("button", {name: "Show next step"}).click();
    }
    assert(await reproductiveModel.locator('li:nth-child(3) img[src$="/f170-reproductive-tissue-patterns.svg"]').isVisible());
    const assessmentImages = await stage("independent").locator("img").evaluateAll(images => images.map(image => image.getAttribute("src")));
    assert.equal(assessmentImages.length, 2, "keep the original two recognition fields");
    for (const src of reproductiveData.photos) assert(!assessmentImages.includes(src), "teaching fields must not be reused as assessment fields");
    assert(await widthFits(), "reproductive teaching must fit at phone size");

    // Acidic lysosome digestion remains in the matching paragraph figure group.
    for (const [route, index] of [["f170/1.1.3", 3], ["f170/1.1.3.evidence", 2]]) {
      await open("catchup/" + route);
      const paragraph = page.locator(".hb-teach-explain > p").nth(index);
      assert(await paragraph.evaluate(el => {
        for (let sibling = el.nextElementSibling; sibling && sibling.tagName !== "P"; sibling = sibling.nextElementSibling) {
          if (sibling.querySelector('img[src$="/f170-lysosome-digestion.svg"]')) return true;
          if (!sibling.matches("figure")) break;
        }
        return false;
      }), `${route} lysosome figure must follow its matching paragraph`);
      assert.equal(await stage("independent").locator('img[src$="/f170-lysosome-digestion.svg"]').count(), 0);
    }

    // Bacterial comparison retains every fact and the credited real rash example.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/1.3.1.bacteria");
    const bacterialRows = page.locator(".hb-compare-group");
    const bacterialData = await page.evaluate(() => window.KeystoneHumanLessons["f171/1.3.1.bacteria"].compare.rows);
    assert.equal(await bacterialRows.count(), 3);
    for (let i = 0; i < bacterialData.length; i++) {
      assert.equal(await bacterialRows.nth(i).locator(":scope > h4").innerText(), bacterialData[i][0]);
      assert.deepEqual(await bacterialRows.nth(i).locator(":scope > p").allInnerTexts(), bacterialData[i].slice(1));
    }
    const rashFigure = bacterialRows.nth(0).locator('figure').filter({has: page.locator('img[src="/assets/micrographs/hb-lyme-erythema.webp"]')});
    assert(await rashFigure.isVisible());
    assert.equal(await rashFigure.locator("figcaption a").count(), 2, "Lyme photo retains source and licence");
    const mrsaFigure = bacterialRows.nth(1).locator('figure[data-hb-assessment-sensitive]');
    await expand(stage("independent"));
    assert(await mrsaFigure.evaluate(figure => figure.hidden));
    await page.reload();
    assert(await mrsaFigure.evaluate(figure => figure.hidden));
    await expand(page.locator("[data-hb-model-step]"));
    assert(await mrsaFigure.evaluate(figure => !figure.hidden));

    // Surface comparison keeps each figure directly with its complete matching fact.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f170/1.1.1.surfaces");
    const surfaceRows = page.locator(".hb-compare-group");
    const surfaceData = await page.evaluate(() => window.KeystoneHumanLessons["f170/1.1.1.surfaces"].compare.rows);
    const surfaceFiles = ["f170-tubule-transport.svg", "f170-hepatocyte-features.svg", "f170-cilia-movement.svg", "f170-alveolar-barrier.svg", "f170-gastric-mucus.svg"];
    assert.equal(await surfaceRows.count(), surfaceFiles.length);
    for (let i = 0; i < surfaceFiles.length; i++) {
      const row = surfaceRows.nth(i);
      assert.equal(await row.locator(":scope > h4").innerText(), surfaceData[i][0]);
      assert.equal(await row.locator(":scope > p").innerText(), surfaceData[i][1]);
      const image = row.locator(`img[src$="/${surfaceFiles[i]}"]`);
      assert(await image.isVisible());
      assert(await image.evaluate(async el => { await el.decode(); return el.naturalWidth > 0 && el.alt.length > 20; }));
    }
    assert(await surfaceRows.nth(0).locator('img[src$="/f170-tubule-atp.svg"]').isVisible());
    const surfaceModel = page.locator("[data-hb-model-step]");
    await expand(surfaceModel);
    await surfaceModel.getByRole("button", {name: "Show next step"}).click();
    assert(await surfaceModel.locator('li:nth-child(2) img[src$="/f170-tubule-atp.svg"]').isVisible());
    assert(await widthFits(), "Surface comparison must fit at phone size");
    assert.equal(await stage("independent").locator(".hb-teaching-diagram").count(), 0);

    // Microscopy/fractionation explanation, worked steps and original micrograph stay connected.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f170/1.1.2");
    const microExplain = page.locator(".hb-teach-explain");
    for (const [text, file] of [
      ["A scale bar labels a known actual length", "f170-scale-bar-ratio.svg"],
      ["Magnification is image size", "f170-magnification-resolution.svg"],
      ["In transmitted light microscopy", "f170-wet-mount.svg"],
      ["To separate cell components", "f170-fractionation-prep.svg"],
      ["Worked example: a first", "f170-fractionation-spins.svg"],
      ["Try predicting the next step", "f170-fractionation-spins.svg"]
    ]) {
      const paragraph = microExplain.getByText(text, {exact: false});
      assert(await paragraph.evaluate((el, name) => Boolean(el.nextElementSibling?.querySelector(`img[src$="/${name}"]`)), file), `${file} follows its matching paragraph`);
    }
    const representationRows = microExplain.locator(".hb-compare-group");
    const representationData = await page.evaluate(() => window.KeystoneHumanLessons["f170/1.1.2"].compare.rows);
    const representationFiles = [["red-cell-section.svg"], ["hb-skeletal-striated.webp"], ["hb-blood-cells-sem.webp", "hb-lung-mitochondrion-tem.webp"]];
    assert.equal(await representationRows.count(), representationFiles.length);
    for (let i = 0; i < representationFiles.length; i++) {
      const row = representationRows.nth(i);
      assert.equal(await row.locator(":scope > h4").innerText(), representationData[i][0]);
      assert.equal(await row.locator(":scope > p").innerText(), representationData[i][1]);
      for (const file of representationFiles[i]) {
        const image = row.locator(`img[src$="/${file}"]`);
        await image.scrollIntoViewIfNeeded();
        assert(await image.evaluate(async el => { await el.decode(); return el.naturalWidth > 0 && el.alt.length > 20; }));
        if (file.endsWith(".webp")) assert.equal(await image.locator("xpath=ancestor::figure").locator("figcaption a").count(), 2);
      }
    }
    assert.equal(await stage("independent").locator('img[src$="/hb-lung-mitochondrion-tem.webp"]').count(), 0);
    const sectionParagraph = microExplain.getByText("In transmitted light microscopy", {exact: false});
    assert(await sectionParagraph.evaluate(el => Boolean(el.nextElementSibling?.nextElementSibling?.querySelector('img[src$="/f170-section-stain.svg"]'))), "section and stain figure follows its matching paragraph after the wet mount");
    const microWorked = page.locator("[data-hb-model-step]");
    await expand(microWorked);
    assert(await microWorked.locator('img[src="/assets/micrographs/human-erythrocytes.jpg"]').isVisible());
    for (let i = 0; i < 4; i++) {
      const file = i === 3 ? "f170-print-magnification.svg" : "f170-scale-bar-ratio.svg";
      assert(await microWorked.locator(`li:nth-child(${i + 1}) img[src$="/${file}"]`).isVisible());
      if (i < 3) await microWorked.getByRole("button", {name: "Show next step"}).click();
    }
    assert(await widthFits(), "Microscopy figures must fit the phone viewport");
    assert.equal(await stage("independent").locator(".hb-teaching-diagram").count(), 0);

    // Reflex and myelin figures follow the explanation paragraphs they support.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f170/3.2.1");
    const reflexExplain = page.locator(".hb-teach-explain");
    for (const [text, file] of [["Electrical signals travel along neurones", "reflex-pathway.svg"], ["Myelin insulates sections of an axon", "myelinated-axon.svg"]]) {
      const paragraph = reflexExplain.getByText(text, {exact: false});
      assert(await paragraph.evaluate((element, file) => element.nextElementSibling?.querySelector(`img[src$="/${file}"]`) != null, file), `Figure follows ${text}`);
    }
    const reflexModel = page.locator("[data-hb-model-step]");
    await expand(reflexModel);
    assert(await reflexModel.locator('li:nth-child(1) img[src$="/reflex-pathway.svg"]').isVisible());
    await reflexModel.getByRole("button", {name: "Show next step"}).click();
    assert(await reflexModel.locator('li:nth-child(2) img[src$="/reflex-pathway.svg"]').isVisible());
    assert.equal(await stage("independent").locator('img[src$="/reflex-pathway.svg"]').count(), 0);

    // The threshold graph belongs to the sixth worked step, never an independent answer.
    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f176/a2");
    const neuroneModel = page.locator("[data-hb-model-step]");
    await expand(neuroneModel);
    const threshold = neuroneModel.locator('img[src="/human-biology/threshold-comparison.svg"]');
    assert.equal(await threshold.count(), 1);
    assert(!(await threshold.isVisible()), "Later worked figure must start hidden");
    for (let i = 0; i < 5; i++) await neuroneModel.getByRole("button", {name: "Show next step"}).click();
    assert(await threshold.isVisible(), "Threshold graph must follow the worked comparison");
    assert(await threshold.evaluate(async image => { await image.decode(); return image.naturalWidth > 0; }));
    assert(await widthFits(), "Threshold figure must fit the phone viewport");
    await neuroneModel.getByRole("button", {name: "Previous step"}).click();
    assert(!(await threshold.isVisible()), "Returning to the preceding step hides the later figure");
    assert.equal(await stage("independent").locator('img[src="/human-biology/threshold-comparison.svg"]').count(), 0);

    assert.deepEqual(errors, []);
    console.log("Human Biology Catch-up: " + chapters.length + " routes across eight units, feedback, saved drafts, session return, licensed images, reproduction controls, and responsive accessibility passed.");
  } finally {
    await page.close();
  }
}

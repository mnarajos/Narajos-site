import assert from "node:assert/strict";
import axe from "axe-core";

export async function checkHumanCatchup(browser, base) {
  const page = await browser.newPage({ viewport: { width: 320, height: 780 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  let visits = 0;
  const open = route => page.goto(base + "/human-biology/?check=" + (++visits) + "#" + route);
  const stage = name => page.locator('[data-hb-stage="' + name + '"]');
  const expand = loc => loc.locator(":scope > summary").click();
  const saved = key => page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
  const widthFits = () => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 3);
  const localPractice = "narajos-human-catchup-v1";
  const practiceKey = "narajos-human-challenge-v2-session";
  const skillKey = practiceKey + "-catchup-magnification";

  try {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await open("catchup");
    const chapters = await page.evaluate(() => Object.entries(window.KeystoneHumanLessons));
    assert.equal(chapters.length, 74, "Retain 66 routes and add eight F170 teaching sequences");
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
        await stage("guided").getByRole("button", {name:"Check answer"}).click();
        await stage("guided").getByText(/pressure reading does not show vessel shape/).waitFor();
      }
      await stage("guided").getByRole("radio").nth(lesson.guided.answer).check();
      await stage("guided").getByRole("button", { name: "Check answer" }).click();
      assert.match(await stage("guided").getByRole("status").innerText(), key === "f171/1.2.1.aorta" ? /Correct on retry/ : /Correct with support/);
      await expand(stage("independent"));
      if (key === "f171/1.2.1.aorta") {
        const image = stage("independent").getByRole("img", {name:/abdominal aorta/});
        await image.waitFor();
        assert(await image.evaluate(async el => { await el.decode(); return el.naturalWidth > 0; }));
      }
      if (lesson.apply.options) {
        await stage("independent").getByRole("radio").nth(lesson.apply.answer).check();
        await stage("independent").getByRole("button", { name: "Check answer" }).click();
        assert.match(await stage("independent").getByRole("status").innerText(), /Correct independently/);
      } else {
        await stage("independent").getByRole("textbox").fill("An explanation to compare with the key points.");
        await stage("independent").getByRole("button", { name: "Compare my explanation" }).press("Enter");
        if (lesson.revision) {
          const review = stage("independent").locator("[data-hb-review]");
          assert.equal(await review.getByRole("listitem").count(), lesson.apply.points.length);
          await review.getByRole("button", { name: "Finish review" }).click();
          assert(await review.getByText("Your self-review is saved.").isVisible());
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

    // The exact linked item, its edited answers and corrected outcome survive reopening.
    await open("catchup/f171/1.3.1.fungi");
    await page.locator("[data-hb-practice]").press("Enter");
    const matches = page.locator("select[data-match]");
    await matches.first().waitFor();
    assert.equal(await matches.count(), 5);
    for (let i = 0; i < 5; i++) await matches.nth(i).selectOption(String(i === 4 ? 3 : i));
    await page.getByRole("button", {name: /Check answer/}).press("Enter");
    const matchKey = practiceKey + "-topic-f171/f171-infection-group-transfer";
    assert.deepEqual((await saved(matchKey)).queue, ["f171-infection-group-transfer"]);
    await page.reload();
    await page.getByRole("button", {name: "Try again", exact: true}).first().press("Enter");
    assert(await matches.nth(0).isDisabled());
    await matches.nth(4).selectOption("4");
    await page.getByRole("button", {name: /Check answer/}).press("Enter");
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
        await page.getByRole("button", {name: "See worked example"}).press("Enter");
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
      await page.getByRole("button", {name: "Check answer", exact: false}).press("Enter");
      await page.getByText(diagnosis).waitFor();
      await page.getByRole("link", {name: reteachLabel, exact: true}).press("Enter");
      await page.locator("#leave-confirm").press("Enter");
      await page.locator("[data-hb-model-step][open]").waitFor({state: "visible"});
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
      const start = page.getByRole("button", { name: "See worked example", exact: true });
      await start.press("Enter");
      const model = page.locator("[data-hb-model-step]");
      assert.match(await model.locator(".hb-model-steps li").first().innerText(), worked, key);
      await model.getByRole("button", { name: "Show next step" }).press("Enter");
      assert.equal(await model.getAttribute("data-hb-model-step"), "2", key);
      if (key === "f171/4.2.1") {
        assert.equal(await model.locator(".hb-cell-focus").innerText(), "12");
        await model.getByRole("button", { name: "Previous step" }).press("Enter");
        assert.equal(await model.locator(".hb-cell-focus").innerText(), "18");
      }
      while (await model.getByRole("button", { name: "Show next step" }).count()) {
        await model.getByRole("button", { name: "Show next step" }).press("Enter");
      }
      await model.getByRole("button", { name: "Try with support" }).press("Enter");
      assert(await model.isVisible() && !(await model.evaluate(el => el.open)), key);
      const definition = Object.fromEntries(chapters)[key];
      const guided = stage("guided");
      await guided.getByRole("radio").nth(definition.guided.answer).check();
      await guided.getByRole("button", { name: "Check answer" }).press("Enter");
      assert(await guided.getByRole("button", { name: "Check answer" }).isHidden(), key);
      await guided.getByRole("button", { name: "Apply it independently" }).press("Enter");
      const independent = stage("independent");
      if (correctChoice) {
        await independent.getByRole("radio", { name: correctChoice }).check();
        await independent.getByRole("button", { name: "Check answer" }).press("Enter");
        assert.match(await independent.getByRole("status").innerText(), /Correct independently/, key);
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
      await independent.getByRole("button", { name: "Get a hint" }).press("Enter");
      assert(await independent.locator(".hb-hints").isVisible(), key);
      if (correctChoice) {
        const wrong = definition.apply.options.findIndex((_, i) => i !== definition.apply.answer);
        await independent.getByRole("radio").nth(wrong).check();
        await independent.getByRole("button", { name: "Check answer" }).press("Enter");
        assert.equal(await independent.getByRole("status").innerText(), definition.apply.options[wrong][1], key);
      } else {
        await independent.getByRole("button", { name: "Show explanation" }).press("Enter");
        assert.match(await independent.getByRole("status").innerText(), /after seeing the explanation/, key);
      }
      await independent.getByRole("button", { name: "Revisit worked example" }).press("Enter");
      assert(await model.evaluate(el => el.open), key);
      await expand(independent);
      if (correctChoice) {
        await independent.getByRole("radio", { name: correctChoice }).check();
        await independent.getByRole("button", { name: "Check answer" }).press("Enter");
        assert.match(await independent.getByRole("status").innerText(), /Correct on retry/, key);
      }
      assert(await page.locator("[data-hb-followup]").isVisible(), key);
    }

    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/4.2.1");
    await expand(stage("independent"));
    await stage("independent").getByRole("radio").nth(1).check();
    await stage("independent").getByRole("button", { name: "Check answer" }).click();
    assert.match(await stage("independent").getByRole("status").innerText(), /all positive screens/);
    await stage("independent").getByRole("button", { name: "Get a hint" }).press("Enter");
    assert.match(await stage("independent").locator(".hb-hints").innerText(), /denominator/);
    await stage("independent").getByRole("button", { name: "Show explanation" }).press("Enter");
    await stage("independent").getByRole("radio").first().check();
    await stage("independent").getByRole("button", { name: "Check answer" }).press("Enter");
    assert.match(await stage("independent").getByRole("status").innerText(), /after seeing the explanation/);
    await expand(stage("followup"));
    await stage("followup").getByRole("radio").last().check();
    await stage("followup").getByRole("button", { name: "Check answer" }).press("Enter");
    assert.match(await stage("followup").getByRole("status").innerText(), /independently on a fresh check/);
    await page.reload();
    await expand(stage("followup"));
    assert.match(await stage("followup").getByRole("status").innerText(), /independently on a fresh check/);

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
    await page.getByText("More practice for this topic", { exact: true }).click();
    await page.getByRole("link", { name: /Practise microscopy and cell measurements/i }).click();
    await page.locator(".k-question-view").waitFor();
    assert.deepEqual((await saved(practiceKey)).queue, standard.queue);

    await page.getByRole("button", { name: /show me/ }).click();
    await page.getByRole("link", { name: /Revisit the (scale-bar calculation|worked unit conversion)/ }).click();
    await page.locator("#leave-confirm").click();
    await page.getByRole("heading", { name: "Microscopy and cell measurements", exact: true }).waitFor();
    assert(await page.locator("[data-hb-model-step][open]").isVisible());
    await page.getByRole("link", { name: "Return to your unfinished question set" }).click();
    await page.getByText("Explanation revealed", { exact: true }).waitFor();

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
    await page.getByText("Explanation revealed", { exact: true }).waitFor();
    assert.deepEqual((await saved(buildKey)).queue, queueWithRetry);
    console.log("Batch 11 pilot success, help and reteaching journeys passed.");

    await open("cards/f171-2.3");
    await page.getByRole("textbox").fill("A saved flashcard draft.");
    await page.getByRole("link", { name: "Overview", exact: true }).click();
    await page.locator("#leave-confirm").click();
    await page.getByRole("region", { name: "Continue learning" }).getByRole("link", { name: /Resume F171 Flashcards/ }).click();
    assert.equal(await page.getByRole("textbox").inputValue(), "A saved flashcard draft.");

    await open("catchup/f170/3.3.1");
    await expand(page.locator(".hb-teach-stage").first());
    await expand(stage("guided"));
    await expand(stage("independent"));
    assert.deepEqual(await page.locator(".hb-teach-photo img").evaluateAll(async images => {
      await Promise.all(images.map(image => image.decode()));
      return images.map(image => image.naturalWidth);
    }), [760, 710, 479]);

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
    assert.equal(await observation.innerText(), "");
    await predict("The ovarian follicle.");
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
    await page.getByRole("button", { name: /Check answer/ }).press("Enter");
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
      await touch.getByRole("button", { name: /Check answer/ }).tap();
      assert.equal(await touch.locator("[data-feedback-heading]").innerText(), "Correct");
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
    await page.getByRole("button", { name: /Check answer/ }).press("Enter");
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
    await page.getByRole("button", { name: "See worked example" }).press("Enter");
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
    await page.getByRole("button", { name: /Check answer/ }).press("Enter");
    const ratioFeedback = page.getByText(/Subtract the baseline from both readings first/);
    await ratioFeedback.waitFor();
    await page.reload();
    await ratioFeedback.waitFor();
    assert.equal((await saved(chromatographyKey)).outcomes[0], "incorrect");

    assert.deepEqual(errors, []);
    console.log("Human Biology Catch-up: " + chapters.length + " routes across eight units, feedback, saved drafts, session return, licensed images, reproduction controls, and responsive accessibility passed.");
  } finally {
    await page.close();
  }
}

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
    assert.equal(new Set(chapters.map(([key]) => key.split("/")[0])).size, 8);
    for (const [key, lesson] of chapters) {
      await page.evaluate(key => localStorage.removeItem(key), localPractice);
      await open("catchup/" + key);
      await page.getByText(lesson.goal, { exact: true }).waitFor();
      assert(await page.getByRole("heading", { name: "Understand the idea" }).isVisible(), key);
      const model = page.locator(".hb-teach-stage").first();
      await expand(model);
      assert((await model.locator(".hb-model-steps li").first().innerText()).includes(lesson.model[0]), key);
      if (lesson.model.length > 1) {
        await model.getByRole("button", { name: "Show next step" }).press("Enter");
        assert(await model.locator(".hb-model-steps li").nth(1).isVisible(), key);
      }
      await expand(stage("guided"));
      await stage("guided").getByRole("radio").nth(lesson.guided.answer).check();
      await stage("guided").getByRole("button", { name: "Check answer" }).click();
      assert.match(await stage("guided").getByRole("status").innerText(), /Correct with support/);
      await expand(stage("independent"));
      if (lesson.apply.options) {
        await stage("independent").getByRole("radio").nth(lesson.apply.answer).check();
        await stage("independent").getByRole("button", { name: "Check answer" }).click();
        assert.match(await stage("independent").getByRole("status").innerText(), /Correct independently/);
      } else {
        await stage("independent").getByRole("textbox").fill("An explanation to compare with the key points.");
        await stage("independent").getByRole("button", { name: "Compare my explanation" }).press("Enter");
        assert.equal(await stage("independent").getByRole("status").getByRole("listitem").count(), lesson.apply.points.length);
      }
      assert(await widthFits(), "Horizontal overflow in " + key);
      if (key.startsWith("f17") && Number(key[3]) >= 2) {
        assert.match(await page.locator(".k-catchup-concept .k-eyebrow").innerText(), /NEA knowledge support/i);
        assert.equal(await page.locator('input[type="file"]').count(), 0);
      }
    }

    await page.evaluate(key => localStorage.removeItem(key), localPractice);
    await open("catchup/f171/4.2.1");
    await expand(stage("independent"));
    await stage("independent").getByRole("radio").nth(1).check();
    await stage("independent").getByRole("button", { name: "Check answer" }).click();
    assert.match(await stage("independent").getByRole("status").innerText(), /denominator/);
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
    await page.getByRole("link", { name: "Return to your unfinished question set" }).click();
    await page.locator(".k-question-view").waitFor();
    assert.deepEqual((await saved(practiceKey)).queue, standard.queue);

    await page.getByRole("button", { name: /show me/ }).click();
    await page.getByRole("link", { name: "Need more help? Catch up on this idea" }).click();
    await page.locator("#leave-confirm").click();
    await page.getByRole("heading", { name: "Microscopy and cell measurements", exact: true }).waitFor();
    await page.getByRole("link", { name: "Return to your unfinished question set" }).click();
    await page.getByText("Here’s how it works", { exact: true }).waitFor();

    await open("cards/f171-2.3");
    await page.getByRole("textbox").fill("A saved flashcard draft.");
    await page.getByRole("link", { name: "Catch up", exact: true }).click();
    await page.locator("#leave-confirm").click();
    await page.locator('a[href="#catchup/f171"]').click();
    await page.locator('a[href="#catchup/f171/4.2.1"]').click();
    await page.getByRole("link", { name: "Resume flashcards or explanation practice" }).click();
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

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await open("catchup/f175/a1/2");
    await reproduction.getByRole("button", { name: /Replay from FSH/ }).click();
    const pause = reproduction.getByRole("button", { name: "Pause animation" });
    await pause.click();
    assert.equal(await reproduction.getByRole("button", { name: "Resume animation" }).getAttribute("aria-pressed"), "true");
    assert(await reproduction.getByRole("button", { name: /LH surge/ }).isHidden());
    await reproduction.getByRole("button", { name: "Resume animation" }).click();
    await reproduction.getByRole("button", { name: /LH surge/ }).waitFor();

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
    assert.deepEqual(errors, []);
    console.log("Human Biology Catch-up: " + chapters.length + " routes across eight units, feedback, saved drafts, session return, licensed images, reproduction controls, and responsive accessibility passed.");
  } finally {
    await page.close();
  }
}

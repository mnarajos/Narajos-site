import assert from "node:assert/strict";
import axe from "axe-core";
import { gcseCatchup } from "../public/assets/gcse-catchup-data.js";
import { priorityCatchup } from "../public/assets/gcse-catchup-priority.js";
import { investigations } from "../public/assets/gcse-investigations.js";

export async function checkGCSECatchup(browser, base) {
  const page = await browser.newPage({viewport: {width: 320, height: 820}, hasTouch: true, reducedMotion: "reduce"});
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const journey = page.locator(".school-journey");
  const dialog = journey.getByRole("dialog");
  const openCheck = () => journey.getByRole("button", {name: /^(Check|Resume check)$/}).press("Enter");
  const choose = label => dialog.getByRole("radio", {name: label, exact: true}).click();
  const submit = () => dialog.getByRole("button", {name: "Check answer", exact: true}).press("Enter");
  const lessonURL = (id, year) => base + "/science-catch-up/lesson/?topic=" + id + "&year=" + year;

  try {
    for (const year of [10,11]) {
      await page.goto(base + "/science-catch-up/?year=" + year);
      const ids = Object.entries(gcseCatchup).filter(([,lesson]) => lesson.year === year).map(([id]) => id);
      await page.locator(".school-concept-list a").first().waitFor();
      for (const id of ids) {
        assert(await page.locator('.school-concept-list a[href*="topic=' + id + '&year=' + year + '"]').first().isVisible(), id);
        await page.goto(lessonURL(id, year));
        await page.getByRole("heading", {name: gcseCatchup[id].title, exact: true, level: 1}).waitFor();
        await page.goto(base + "/science-catch-up/?year=" + year);
        await page.locator(".school-concept-list a").first().waitFor();
      }
    }

    for (const [id, lesson] of Object.entries({...priorityCatchup, ...investigations})) {
      await page.goto(lessonURL(id, lesson.year));
      await journey.getByRole("heading", {name: /I do/}).waitFor();
      assert(await page.locator(".school-worked-example ol").last().isVisible());
      for (const [index, question] of lesson.steps.entries()) {
        await openCheck();
        assert(await dialog.getByRole("heading", {name: question.prompt, exact: true}).evaluate(el => el === document.activeElement));
        if (index === 1) assert(await dialog.locator(".school-guided-prompt").isVisible());
        if (index === 2) assert.equal(await dialog.locator(".school-guided-prompt").count(), 0);
        if (question.reference) assert(await dialog.locator(".school-question-evidence").isVisible());
        if (id === "national-grid" && index === 2) {
          await choose(question.options[0].label);
          await submit();
          assert.match(await dialog.locator('[data-verdict="incorrect"]').innerText(), /fixed power/);
          await dialog.getByRole("button", {name: "Revisit the worked example"}).press("Enter");
          assert(await page.locator("details.school-worked-example").evaluate(el => el.open && el === document.activeElement));
          await page.reload();
          await openCheck();
          assert(await dialog.getByRole("radio", {name: question.options[0].label, exact: true}).isChecked());
        }
        await choose(question.answer);
        await submit();
        await dialog.getByRole("button", {name: /^(Continue|Finish catch-up)$/}).press("Enter");
      }
      if (id === "national-grid") {
        assert(await dialog.getByText("Try one more on your own", {exact: true}).isVisible());
        await choose(lesson.retry.answer);
        await submit();
        await dialog.getByRole("button", {name: "Finish catch-up"}).press("Enter");
      }
      await journey.getByRole("link", {name: "Revise " + lesson.code}).waitFor();
      await page.reload();
      await journey.getByRole("heading", {name: /Catch-up complete/}).waitFor();
      const progress = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), "narajos.catchup.v1." + lesson.year + "." + id);
      assert.deepEqual(Object.values(progress.outcomes), ["supported","supported",id === "national-grid" ? "supported" : "independent"]);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), id);
    }

    const existing = gcseCatchup["inheritance-cross"];
    await page.goto(lessonURL("inheritance-cross", 11));
    await page.evaluate(({prompt, answer}) => localStorage.setItem("narajos.catchup.v1.11.inheritance-cross",
      JSON.stringify({step: 1, open: true, prompt, selected: answer, correct: true, feedback: "Saved feedback."})), existing.steps[1]);
    await page.reload();
    await openCheck();
    assert(await dialog.getByRole("radio", {name: existing.steps[1].answer, exact: true}).isChecked());
    assert(await dialog.getByRole("button", {name: "Continue", exact: true}).isVisible());

    for (const width of [320, 768, 1280]) {
      await page.setViewportSize({width, height: 860});
      await page.goto(lessonURL("chromatography", 11));
      await page.locator("main").getByRole("img", {name: /shallow layer of solvent/}).waitFor();
      await page.addStyleTag({content: "html {font-size: 125%} p, h1, h2, h3, label {line-height: 1.6; letter-spacing: .055em}"});
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => {
        if (document.documentElement.scrollWidth <= innerWidth + 2) return [];
        return [document.documentElement.scrollWidth, ...[...document.body.querySelectorAll("*")].filter(el => el.getBoundingClientRect().right > innerWidth + 2)
          .slice(0, 10).map(el => [el.tagName, el.getAttribute("class"), Math.round(el.getBoundingClientRect().right)])];
      });
      assert.deepEqual(overflow, [], "Enlarged text at " + width);
    }
    await page.addScriptTag({content: axe.source});
    const violations = await page.evaluate(async () => (await window.axe.run({runOnly: ["wcag2a","wcag2aa"]})).violations);
    assert.deepEqual(violations.map(({id,nodes}) => [id,nodes.map(node => node.target)]), []);
    assert.deepEqual(errors, []);
    console.log("GCSE catch-up: 47 routes, seventeen learning journeys, old responses, phone/tablet/desktop, enlarged text and axe passed.");
  } finally {
    await page.close();
  }
}

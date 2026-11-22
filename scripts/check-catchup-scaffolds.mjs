import assert from "node:assert/strict";

export async function checkCatchupScaffolds(browser, base) {
  const page = await browser.newPage({viewport: {width: 320, height: 780}, hasTouch: true, isMobile: true});
  const errors = [];
  page.on("pageerror", error => errors.push(page.url() + ": " + error.message));
  const journey = page.locator(".school-journey");
  const check = journey.getByRole("button", {name: "Check", exact: true});
  const dialog = journey.getByRole("dialog");
  const choose = async (answer, next = "Continue") => {
    await dialog.getByRole("radio", {name: answer, exact: true}).check();
    await dialog.getByRole("button", {name: "Check answer", exact: true}).press("Enter");
    await dialog.getByRole("status").filter({hasText: /^Correct\./}).waitFor();
    await dialog.getByRole("button", {name: next, exact: true}).press("Enter");
  };
  const narrow = async (scope, id) => assert(await scope.evaluate(node => node.scrollWidth <= node.clientWidth + 3), `${id} overflows`);
  try {
    for (const [year, count] of [[7, 12], [8, 13], [9, 12]]) {
      await page.goto(`${base}/science-catch-up/?year=${year}`);
      const lessons = page.locator(year < 9 ? ".school-topic-link" : ".school-concept-list a");
      await lessons.first().waitFor();
      const urls = await lessons.evaluateAll(items => items.map(item => item.href));
      assert.equal(urls.length, count, `Year ${year} lesson count`);
      assert.equal(new Set(urls).size, count, `Year ${year} has duplicate lesson links`);
      for (const url of urls) {
        await page.goto(url);
        await page.locator(".school-opening-hook").waitFor();
        await page.locator("#catchup-evidence").waitFor();
        await check.press("Enter");
        await dialog.getByRole("radio").first().waitFor();
        for (const image of await dialog.locator("img").all()) {
          await image.evaluate(node => node.decode());
          assert((await image.getAttribute("alt"))?.trim(), `${url} is missing a diagram description`);
        }
        await narrow(dialog, url);
        assert(!(await dialog.getByRole("button", {name: "Catch-up notes", exact: true}).count()));
        await page.keyboard.press("Escape");
        await dialog.waitFor({state: "hidden"});
        assert(await journey.getByRole("button", {name: "Resume check"}).evaluate(button => document.activeElement === button));
      }
    }

    await page.goto(base + "/ks3/lesson/?topic=forces&guided=1");
    // The coverage pass opens and pauses each first check but leaves it unattempted.
    const reopen = journey.getByRole("button", {name: "Resume check", exact: true});
    assert(await journey.getByRole("heading", {name: "Read the arrows on the cyclist"}).isVisible());
    await reopen.press("Enter");
    const balancedForces = dialog.locator(".school-question-evidence");
    assert(await balancedForces.getByRole("img", {name: /40 newton force acts left and a 40 newton force acts right/}).isVisible());
    assert.equal(await balancedForces.getByText("40 N", {exact: true}).count(), 2);
    assert.doesNotMatch(await balancedForces.innerText(), /keeps moving at the same speed/);
    await narrow(dialog, "Balanced forces check");
    await choose("It stays the same.");
    assert(await journey.getByRole("heading", {name: "We do · Guided practice"}).isVisible());
    await check.press("Enter");
    assert(await dialog.getByRole("img", {name: /40 newton force acts left and a 20 newton force acts right/}).isVisible());
    assert(await dialog.getByText(/Subtract the smaller force/).isVisible());
    await choose("The cyclist slows down.");
    assert(await journey.getByRole("heading", {name: "You do · On your own"}).isVisible());
    await check.press("Enter");
    await dialog.getByRole("button", {name: "Need a clue?"}).press("Enter");
    assert.match(await dialog.locator(".school-clue").innerText(), /Compare the sizes/);
    await dialog.getByRole("button", {name: "Another clue"}).press("Enter");
    assert.match(await dialog.locator(".school-clue").innerText(), /Subtract 30 N/);
    await choose("It speeds up. The resultant force is 40 N to the right.");
    await dialog.getByRole("heading", {name: /A skateboard moves right/}).waitFor();
    await choose("It speeds up. The resultant force is 30 N to the right.", "Finish catch-up");
    await journey.getByRole("heading", {name: "Catch-up complete!"}).waitFor();
    const evidence = await page.evaluate(() => JSON.parse(localStorage.getItem("narajos.catchup.v1.7.forces")));
    assert.deepEqual(Object.values(evidence.outcomes), ["supported", "supported", "supported"]);
    assert.equal(evidence.followUp, "independent");
    await journey.getByRole("button", {name: "Try it yourself"}).press("Enter");
    await page.getByText("Help with your answer", {exact: true}).press("Enter");
    await page.getByText(/Give the size and direction of the resultant/).waitFor();
    await page.getByRole("textbox", {name: "Your answer"}).fill("The resultant is 40 N to the right, so the crate speeds up.");
    await page.reload();
    await journey.getByRole("button", {name: "Try it yourself"}).press("Enter");
    assert.match(await page.getByRole("textbox", {name: "Your answer"}).inputValue(), /40 N/);

    await page.goto(base + "/ks3/lesson/?topic=balanced-moments&guided=1");
    assert(await journey.getByText(/10 N × 2 m|10 × 2 = 20 N m/).isVisible());
    await reopen.press("Enter");
    await choose("The same distance from the pivot");
    await check.press("Enter");
    assert(await dialog.getByRole("img", {name: /12 N acts down/}).isVisible());
    assert.match(await dialog.ariaSnapshot(), /img "12 N acts down/);
    await choose("2 m from the pivot");
    await check.press("Enter");
    await choose("Yes. Both moments are 40 N m in opposite directions.", "Finish catch-up");

    await page.goto(base + "/science-catch-up/lesson/?topic=atomic-number");
    assert(await journey.getByText(/\+11 from the protons and −10/).isVisible());
    await reopen.press("Enter");
    assert(await dialog.getByRole("table", {name: "Three sodium examples"}).isVisible());
    await choose("11 protons");
    await check.press("Enter");
    await choose("−1");
    await check.press("Enter");
    await choose("A magnesium ion with charge +2", "Finish catch-up");
    await journey.getByRole("link", {name: "Revise C1", exact: true}).waitFor();

    await page.goto(base + "/science-catch-up/lesson/?topic=energy-transfer");
    await reopen.press("Enter");
    await choose("A, because its power is higher.");
    assert(await journey.getByText("Calculate efficiency", {exact: true}).isVisible());
    await check.press("Enter");
    await choose("40%");
    await check.press("Enter");
    await choose("35%, because 70 ÷ 200 = 0.35", "Finish catch-up");
    const powerProgress = await page.evaluate(() => JSON.parse(localStorage.getItem("narajos.catchup.v1.9.energy-transfer")));
    assert.deepEqual(Object.values(powerProgress.outcomes), ["supported", "supported", "independent"]);
    assert.deepEqual(errors, [], "JavaScript errors in Year 7–9 catch-up");
  } finally {
    await page.close();
  }
  console.log("Year 7–9: all 37 opening checks, worked examples, guided practice, independent follow-up and draft persistence passed.");
}

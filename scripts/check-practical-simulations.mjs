import assert from "node:assert/strict";

export async function checkPracticalSimulations(browser, base) {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
    hasTouch: true
  });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  try {
    await page.goto(base + "/alevel/#practical-10");
    await page.getByRole("heading", { name: "Follow an animal’s track" }).waitFor();
    const step = page.getByRole("button", { name: "Advance 4 intervals" });
    const condition = page.getByLabel("Compare conditions");
    const animal = page.getByLabel("Highlight a track");
    const positions = page.locator("[data-positions]");
    const track = positions.locator("polyline");
    const start = await positions.innerHTML();
    const summary = page.locator("[data-summary] tr");
    const comparison = page.locator("[data-comparison] tr");

    await step.press("Space");
    await step.press("Space");
    assert.equal(await page.locator("[data-time]").innerText(), "Interval 8 of 24.");
    assert.deepEqual(await summary.nth(1).locator("td").allTextContents(), ["12.0", "3.0"]);
    const firstTrack = await track.getAttribute("points");
    assert.equal(firstTrack.split(" ").length, 9);
    await animal.selectOption("1");
    assert.notEqual(await track.getAttribute("points"), firstTrack);
    await animal.selectOption("0");
    await page.getByRole("button", { name: "Reset same group" }).click();
    assert.equal(await positions.innerHTML(), start);
    await step.click();
    await step.click();

    await condition.selectOption("light");
    await step.click();
    await step.click();
    assert.deepEqual(await summary.nth(1).locator("td").allTextContents(), ["7.0", "7.0"]);
    const humidityDirection = Number(await comparison.nth(0).locator("td").last().innerText());
    const lightDirection = Number(await comparison.nth(1).locator("td").last().innerText());
    assert(humidityDirection > 30 && humidityDirection < 70, humidityDirection);
    assert(lightDirection > humidityDirection + 20, lightDirection);

    const supported = page.locator("[data-supported]");
    await supported.getByText("Show a hint").click();
    await supported.getByRole("radio").nth(0).check();
    await supported.getByRole("button", { name: "Check answer" }).click();
    assert.equal(await supported.locator(".rp-feedback").getAttribute("data-outcome"), "retry");
    await supported.getByRole("radio").nth(1).check();
    await supported.getByRole("button", { name: "Check answer" }).click();
    assert.equal(await supported.locator(".rp-feedback").getAttribute("data-outcome"), "supported");
    const independent = page.locator("[data-independent]");
    await independent.getByRole("radio").nth(0).check();
    await independent.getByRole("button", { name: "Check answer" }).click();
    assert.equal(await independent.locator(".rp-feedback").getAttribute("data-outcome"), "independent");

    await condition.selectOption("equal");
    await page.getByRole("button", { name: "Run to end" }).click();
    assert.equal(await page.locator("[data-time]").innerText(), "Interval 24 of 24.");
    assert.deepEqual(await summary.nth(1).locator("td").allTextContents(), ["7.0", "7.0"]);
    const equalDirection = Number(await comparison.nth(2).locator("td").last().innerText());
    assert(equalDirection > 35 && equalDirection < 65, equalDirection);
    await page.getByRole("button", { name: "New group" }).click();
    assert.notEqual(await positions.innerHTML(), start);
    assert.equal(await supported.isVisible(), false);

    await page.goto(base + "/alevel/#practical-12");
    await page.getByRole("heading", { name: "Sample a meadow from the path" }).waitFor();
    const sample = page.getByRole("button", { name: "Sample quadrat" });
    const reveal = page.getByRole("button", { name: "Reveal whole field" });
    const method = page.getByLabel("Sampling method");
    const row = page.getByLabel("Row", { exact: true });
    const observations = page.locator("[data-observations] tbody tr");
    const counts = page.locator("[data-grid] text");
    assert.equal(await reveal.isDisabled(), true);
    for (let i = 0; i < 12; i++) await sample.click();
    assert.equal(new Set(await observations.locator("th").allTextContents()).size, 12);
    assert.equal(await sample.isDisabled(), true);
    await reveal.click();
    assert.equal(await counts.count(), 48);
    const fieldTotal = (await counts.allTextContents()).map(Number).reduce((sum, count) => sum + count, 0);
    assert.match(await page.locator("[data-field-total]").innerText(), new RegExp("contains " + fieldTotal + " daisies"));

    await method.selectOption("transect");
    assert.equal(await supported.isVisible(), false);
    assert.equal(await counts.count(), 0);
    await row.selectOption({ value: "2" });
    for (let i = 0; i < 8; i++) await sample.click();
    assert.equal(await row.isDisabled(), true);
    assert.deepEqual(await observations.locator("th").allTextContents(), ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3"]);
    assert.deepEqual((await observations.locator("td:nth-child(2)").allTextContents()).map(Number), [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5]);

    await method.selectOption("chosen");
    await row.selectOption({ value: "0" });
    await sample.click();
    await sample.click();
    assert.equal(await observations.count(), 1);
    assert.match(await page.locator("[data-status]").innerText(), /already recorded/);
    for (let i = 1; i < 4; i++) {
      await row.selectOption({ value: String(i) });
      await sample.click();
    }
    await reveal.click();
    assert.match(await page.locator("[data-field-total]").innerText(), /^Extrapolating your sample to 48 m² gives about 24 daisies/);
    await supported.getByRole("button", { name: "Reveal answer" }).click();
    assert.equal(await supported.locator(".rp-feedback").getAttribute("data-outcome"), "revealed");
    assert.deepEqual(errors, []);
    console.log("Choice chamber movement and fieldwork sampling checks passed.");
  } finally {
    await page.close();
  }
}

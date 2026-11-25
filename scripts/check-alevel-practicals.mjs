import assert from "node:assert/strict";
import { chromium } from "playwright";
import { servePublic } from "./browser-test-site.mjs";
import { checkPracticalSimulations } from "./check-practical-simulations.mjs";

const { server, base } = await servePublic();
let browser;
const course = base + "/alevel/";
const catchup = [
  "a1-enzfactors", "a2-mitindex", "a2-osmosis", "a2-membrane",
  "a3-dissect", "a4-aseptic", "a5-chromat", "a5-dcpip", "a5-respiro",
  "a6-taxes", "a6-glucal", "a7-fieldwork"
];

try {
  browser = await chromium.launch({ headless: true });
  const errors = [];
  for (const [width, height] of [[320, 760], [1200, 960]]) {
    const page = await browser.newPage({ viewport: { width, height }, hasTouch: width < 400, reducedMotion: "reduce" });
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => {
      if (response.url().startsWith(base) && response.status() >= 400) errors.push(response.url() + " " + response.status());
    });
    await page.route(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\//, route => route.abort());
    await page.goto(course);
    await page.getByRole("link", { name: "Required practicals", exact: true }).click();
    const activities = page.locator('main a[href^="#practical-"]');
    await activities.last().waitFor();
    assert.equal(await activities.count(), 12);
    for (const [index, concept] of catchup.entries()) {
      const hash = "#practical-" + (index + 1);
      await page.locator('main a[href="' + hash + '"]').click();
      await page.waitForURL("**/" + hash);
      await page.locator("#rp-activity:not([aria-busy]) h2").first().waitFor({ timeout: 7000 }).catch(async error => {
        throw new Error(hash + " at " + width + "px: " + (await page.locator("main").innerText()).slice(0, 500) + "\n" + errors.join("\n"), { cause: error });
      });
      assert.equal(new URL(page.url()).hash, hash);
      assert.equal(await page.evaluate(() => document.activeElement.tagName), "H1");
      assert(await page.locator("#rp-activity").evaluate(el => Boolean(el.querySelector("img, svg"))));
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), hash + " overflows at " + width);
      await page.getByRole("link", { name: "Review key ideas" }).click();
      await page.getByRole("link", { name: "Explore the practical", exact: true }).waitFor();
      assert.equal(new URL(page.url()).hash, "#catchup-" + concept);
      await page.getByRole("link", { name: "Explore the practical", exact: true }).click();
      await page.getByRole("link", { name: /Back to Catch up/ }).waitFor();
      await page.goto(course + "#practicals");
    }

    await page.goto(course + "#prac-p1");
    await page.locator('a[href="#practical-1"]').click();
    await page.getByRole("link", { name: /Back to paper practicals/ }).waitFor();
    await page.locator("#rp-activity h2").first().waitFor();
    const lessonProgress = await page.evaluate(() => {
      const stored = JSON.stringify({ tier: "F", best: { "a2:mitindex": 80 } });
      localStorage.setItem("keystone-aqa-alevel-biology-v1", stored);
      return stored;
    });
    const rate = page.locator(".rp-question").first();
    await rate.getByRole("textbox").fill("0.0167");
    await rate.getByRole("button", { name: "Check answer" }).click();
    assert.equal(await rate.getByRole("status").getAttribute("data-outcome"), "retry");
    await rate.getByText("Show a hint", { exact: true }).click();
    await rate.getByRole("textbox").fill("1/45 s⁻¹");
    await rate.getByRole("textbox").press("Enter");
    assert.equal(await rate.getByRole("status").getAttribute("data-outcome"), "supported");

    const method = page.locator(".rp-question").last();
    await method.getByRole("button", { name: "Reveal answer" }).click();
    assert.equal(await method.getByRole("status").getAttribute("data-outcome"), "revealed");
    assert.equal(await method.getByRole("button", { name: "Check answer" }).getAttribute("aria-disabled"), "true");
    assert.equal(await page.evaluate(() => localStorage.getItem("keystone-aqa-alevel-biology-v1")), lessonProgress);
    await page.reload();
    await method.getByRole("radio", { name: /warm the milk and buffered trypsin separately/i }).check();
    await method.getByRole("button", { name: "Check answer" }).click();
    assert.equal(await method.getByRole("status").getAttribute("data-outcome"), "independent");

    await page.goto(course + "#practical-2");
    const zoom = page.getByRole("button", { name: /enlarge/i }).first();
    await zoom.press("Enter");
    const imageDialog = page.getByRole("dialog");
    await imageDialog.waitFor();
    assert.equal(await imageDialog.locator("img").evaluate(img => img.decode().then(() => img.naturalWidth > 0)), true);
    await page.keyboard.press("Escape");
    await imageDialog.waitFor({ state: "hidden" });
    await page.waitForFunction(() => document.activeElement.textContent.startsWith("Enlarge"));
    await page.goto(course + "#lesson-a2-mitindex");
    await page.getByRole("button", { name: "Start questions" }).waitFor();
    await page.getByRole("link", { name: "Explore the practical", exact: true }).click();
    await page.waitForURL("**/#practical-2");
    assert.equal(await page.getByRole("dialog").count(), 0);
    await page.close();
  }
  await checkPracticalSimulations(browser, base);
  assert.deepEqual(errors, []);
  console.log("A-level practicals passed: 12 student routes and Catch up round trips at 320 and 1200 px, keyboard image enlargement, numerical tolerance, support, reveal, independent feedback and progress isolation.");
} finally {
  await browser?.close();
  server.close();
}

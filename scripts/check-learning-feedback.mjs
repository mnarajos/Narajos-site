import assert from "node:assert/strict";
import { chromium } from "playwright";
import { servePublic } from "./browser-test-site.mjs";

const { server, base } = await servePublic();
let browser;

try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  page.on("dialog", dialog => dialog.accept());
  await page.route(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\//, route => route.abort());
  await page.goto(`${base}/gcse/#flashcards`, { waitUntil: "domcontentloaded" });
  await page.getByLabel("Type my answers (optional)").check();
  await page.locator('a[href="#cards-b1"]').click();

  const input = page.locator("#kr-input");
  const reveal = page.locator("#kr-reveal");
  const result = page.locator("#kr-comparison");
  const feedback = result.locator('[data-learning-feedback="correct"]');
  const deckSize = Number(await page.getByRole("progressbar").getAttribute("aria-valuemax"));
  const enterExpectedAnswer = async () => {
    await input.fill(await page.locator(".kr-answer").textContent());
    await reveal.click();
  };

  await enterExpectedAnswer();
  const firstPraise = await feedback.textContent();
  assert.match(await result.textContent(), /matches an accepted answer/);
  assert.equal(await result.getAttribute("aria-live"), "polite");
  assert.equal(await feedback.getAttribute("data-feedback-animate"), "");
  assert.equal(await feedback.locator("svg").getAttribute("aria-hidden"), "true");
  assert.equal(await feedback.locator("svg").getAttribute("focusable"), "false");

  const layout = await feedback.evaluate(marker => {
    const icon = marker.querySelector("svg");
    const animations = icon.getAnimations({ subtree: true });
    const button = document.querySelector("#kr-good");
    return {
      durations: animations.map(animation => animation.effect.getTiming().duration),
      bounds: [0, 270, 800].map(time => {
        for (const animation of animations) {
          animation.pause();
          animation.currentTime = time;
        }
        return [icon, marker.parentElement, button].map(element => element.getBoundingClientRect().toJSON());
      }),
      faded: getComputedStyle(icon.querySelector(".learning-feedback__accent")).opacity,
      overflow: document.documentElement.scrollWidth - innerWidth
    };
  });
  assert.deepEqual(layout.durations.sort((a, b) => a - b), [420, 560]);
  assert.deepEqual(layout.bounds[0], layout.bounds[1]);
  assert.deepEqual(layout.bounds[1], layout.bounds[2]);
  assert.equal(layout.faded, "0");
  assert(layout.overflow <= 2);
  assert(await feedback.evaluate(marker => {
    document.querySelector("#kr-reveal").click();
    return marker.isConnected;
  }), "A second reveal must not remount verified feedback");

  await page.reload({ waitUntil: "domcontentloaded" });
  assert.equal(await feedback.textContent(), firstPraise);
  assert.equal(await feedback.getAttribute("data-feedback-animate"), null);
  await page.getByRole("button", { name: "Record typed match" }).click();
  await enterExpectedAnswer();
  assert.notEqual(await feedback.textContent(), firstPraise);
  assert(await feedback.evaluate(marker => {
    document.querySelector("#kr-good").click();
    return !marker.isConnected && !document.querySelector("#kr-reveal").hidden;
  }), "The next card can open immediately during the animation");

  await input.fill("An unmatched response");
  await reveal.click();
  assert.match(await result.textContent(), /Compare your wording/);
  assert.equal(await feedback.count(), 0);
  await page.getByRole("button", { name: "I recalled it before revealing" }).click();

  for (let reviewed = 3; reviewed < deckSize; reviewed++) {
    await reveal.click();
    assert.equal(await feedback.count(), 0);
    await page.getByRole("button", { name: "Finish as reviewed" }).click();
  }
  const completion = page.getByRole("heading", { name: "Review complete" }).locator('[data-learning-feedback="complete"]');
  assert.equal(await completion.getAttribute("data-feedback-animate"), "");
  const summary = await page.locator(".kr-entry").innerText();
  assert.match(summary, /2 typed matches/);
  assert.match(summary, /1 self-reported recall/);
  assert.match(summary, /reviewed after revealing/);
  assert.equal(await page.locator('[data-learning-feedback="correct"]').count(), 0);

  const reduced = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  await reduced.route(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\//, route => route.abort());
  await reduced.goto(`${base}/alevel/#spaced-new`, { waitUntil: "domcontentloaded" });
  // The displayed answer is also the canonical term checked by this review mode.
  await reduced.locator("#kr-input").fill(await reduced.locator(".kr-answer").textContent());
  await reduced.locator("#kr-reveal").click();
  const staticIcon = reduced.locator('[data-learning-feedback="correct"] svg');
  assert(await staticIcon.isVisible());
  assert.equal(await staticIcon.evaluate(icon => icon.getAnimations({ subtree: true }).length), 0);
  assert.equal(await staticIcon.locator(".learning-feedback__tick").evaluate(tick => getComputedStyle(tick).strokeDasharray), "none");
  console.log("Learning feedback passed: typed evidence, variety, repeat and resume guards, immediate progression, fixed layout, completion and reduced motion.");
} finally {
  await browser?.close();
  await new Promise(done => server.close(done));
}

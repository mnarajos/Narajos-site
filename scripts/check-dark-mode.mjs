/* Contrast regression checks for device dark mode and interactive learning states. */
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { chromium } from "playwright";
import axe from "axe-core";
import { servePublic } from "./browser-test-site.mjs";

const { server, base } = await servePublic();
let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: "dark", reducedMotion: "reduce" });
  await page.route(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\//, route => route.abort());
  page.on("dialog", dialog => dialog.accept());

  async function open(path) {
    await page.goto(base + path, { waitUntil: "load" });
    await page.addScriptTag({ content: axe.source });
  }
  async function contrast(label) {
    const issues = await page.evaluate(async () => (await axe.run({ runOnly: ["color-contrast"] })).violations
      .flatMap(rule => rule.nodes.map(node => ({ target: node.target, detail: node.failureSummary }))));
    assert.deepEqual(issues, [], label + " contrast");
  }

  // Cover every page's initial state in the device's dark color scheme.
  const html = (await readdir("public", { recursive: true })).filter(path => path.endsWith(".html"));
  for (const file of html) {
    const path = "/" + file.replace(/index\.html$/, "");
    await open(path);
    await contrast(path);
  }

  // These applications render additional screens through client-side routes.
  const routes = [
    "/alevel/#catchup-a1-enzfactors", "/alevel/#catchup-a2-osmosis", "/alevel/#catchup-a6-synapse",
    "/alevel/#lesson-a2-mitosis", "/alevel/#exam", "/alevel/#exam-interpret", "/alevel/#exam-pressures",
    "/alevel/#exam-drawings", "/alevel/#exam-osmosis", "/alevel/#paper-p2", "/alevel/#topic-p3w",
    "/alevel/#practicals", "/alevel/#practical-7", "/alevel/#practical-9", "/alevel/#practical-10",
    "/alevel/#practical-11", "/alevel/#practical-12", "/gcse/#topic-b1", "/gcse/#topic-b6",
    "/gcse/#lesson-b1-cells", "/gcse/#lesson-b1-micro2", "/gcse/#lesson-b2-foodtests", "/gcse/#lesson-p1-stores",
    "/human-biology/#challenge/f170", "/human-biology/#challenge/f171", "/human-biology/#challenge/f175",
    "/human-biology/#catchup/f170/1.1.2", "/human-biology/#catchup/f171/4.2.1", "/human-biology/#catchup/f175/a1",
    "/science-catch-up/?year=9", "/science-catch-up/lesson/?topic=osmosis"
  ];
  for (const path of routes) {
    await open(path);
    await contrast(path);
  }

  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => localStorage.clear());
    await open("/alevel/#exam-plan-investigation");
    await contrast(`Planning catalogue at ${width}px`);
    for (const stage of ["potato", "beetroot", "cress"]) {
      await page.locator(`[data-plan-stage="${stage}"]`).click();
      await page.locator(".plan-investigation details").evaluateAll(details => details.forEach(detail => { detail.open = true; }));
      await contrast(`Planning ${stage} at ${width}px`);
      const next = page.locator('[data-plan-action="next"]');
      while (await next.isVisible()) {
        await next.click();
        await contrast(`Planning ${stage} area at ${width}px`);
      }
      const check = page.locator('[data-plan-action="check"]');
      if (await check.isVisible()) {
        await check.click();
        await contrast(`Planning ${stage} feedback at ${width}px`);
      }
      await page.locator('[data-plan-action="back"]').click();
    }

    await open("/alevel/#catchup-a6-synapse");
    await page.locator(".dp-practice details").evaluateAll(details => details.forEach(detail => { detail.open = true; }));
    await contrast(`Expanded diagram activity at ${width}px`);

    await open("/gcse/#flashcards");
    await page.getByLabel("Type my answers (optional)").check();
    await page.locator('a[href="#cards-b1"]').click();
    await page.locator("#kr-input").fill(await page.locator(".kr-answer").textContent());
    await page.locator("#kr-reveal").click();
    assert(await page.locator('[data-learning-feedback="correct"]').isVisible());
    await contrast(`GCSE revealed flashcard at ${width}px`);
    await open("/alevel/#spaced-new");
    await page.locator("#kr-input").fill(await page.locator(".kr-answer").textContent());
    await page.locator("#kr-reveal").click();
    assert(await page.locator('[data-learning-feedback="correct"]').isVisible());
    await contrast(`A-level revealed flashcard at ${width}px`);
  }

  await open("/teacher/");
  await page.getByRole("button", { name: "Start Do Now" }).click();
  await contrast("Teacher presentation");
  // A page-level choice must win over the device preference in either direction.
  await page.evaluate(() => document.documentElement.dataset.theme = "light");
  assert.equal(await page.locator(".keystone-second").evaluate(el => getComputedStyle(el).color), "rgb(164, 71, 13)");
  await page.emulateMedia({ colorScheme: "light" });
  await page.evaluate(() => document.documentElement.dataset.theme = "dark");
  assert.equal(await page.locator(".keystone-second").evaluate(el => getComputedStyle(el).color), "rgb(255, 155, 84)");
  await page.emulateMedia({ colorScheme: "dark" });

  for (const path of ["enzyme-inhibition", "cardiac-cycle"]) {
    await open(`/teaching/simulations/${path}/`);
    for (const level of [1, 2, 3]) {
      await page.locator(`button[data-level="${level}"]`).click();
      await page.locator("details").evaluateAll(details => details.forEach(detail => { detail.open = true; }));
      await contrast(`${path} level ${level}`);
    }
  }
  await open("/teaching/simulations/bioenergetics/");
  for (const top of ["photosynthesis", "aerobic", "anaerobic"]) {
    await page.locator(`button[data-top="${top}"]`).click();
    const count = await page.locator(".subtab").count();
    for (let i = 0; i < count; i++) {
      await page.locator(".subtab").nth(i).click();
      await contrast(`Bioenergetics ${top} view ${i + 1}`);
      // Verify white tally symbols remain legible over each molecule color.
      const iconRatios = await page.evaluate(() => Array.from(document.querySelectorAll(".trow .ic"), icon => {
        const style = getComputedStyle(icon);
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const context = canvas.getContext("2d");
        context.fillStyle = style.backgroundColor;
        context.fillRect(0, 0, 1, 1);
        const rgb = Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3).map(value => value / 255);
        const luminance = rgb.map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4)
          .reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
        return { ratio: 1.05 / (luminance + .05), opacity: getComputedStyle(icon.parentElement).opacity };
      }));
      assert(iconRatios.length && iconRatios.every(icon => icon.ratio >= 4.5 && icon.opacity === "1"),
        `Bioenergetics ${top} view ${i + 1} tally contrast: ${JSON.stringify(iconRatios)}`);
    }
  }
  console.log(`Dark-mode contrast passed: ${html.length} pages, learning routes, interactive states, both viewport sizes and theme overrides.`);
} finally {
  await browser?.close();
  await new Promise(done => server.close(done));
}

import assert from "node:assert/strict";
import { chromium } from "playwright";
import axe from "axe-core";
import { servePublic } from "./browser-test-site.mjs";

const browser = await chromium.launch();
const { server, base } = await servePublic();
const pages = [
  "/", "/science-catch-up/?year=9", "/science-catch-up/lesson/?topic=osmosis",
  "/gcse/", "/alevel/#catchup-a1-enzfactors", "/human-biology/",
  "/teacher/", "/teaching/focused-writing/ks3/", "/teaching/focused-writing/order/",
  "/teaching/simulations/enzyme-kinetics/?activity=gcse"
];

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
  const measurements = [];
  for (const path of pages) {
    await page.goto(base + path);
    await page.evaluate(() => document.fonts.ready);
    await page.addScriptTag({ content: axe.source });
    const check = await page.evaluate(async () => {
      const result = await window.axe.run({
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] }
      });
      return result.violations.map(rule => ({
        id: rule.id, impact: rule.impact, nodes: rule.nodes.map(node => node.target)
      }));
    });
    measurements.push({ path, violations: check });
  }
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto(base + "/teacher/");
  await page.addScriptTag({ content: axe.source });
  const dark = await page.evaluate(async () => {
    const result = await window.axe.run({ runOnly: ["color-contrast"] });
    return result.violations.map(rule => ({ id: rule.id, impact: rule.impact, nodes: rule.nodes.map(node => node.target) }));
  });
  measurements.push({ path: "/teacher/ (dark)", violations: dark });
  console.log("Accessibility findings " + JSON.stringify(measurements));
  const serious = measurements.flatMap(page => page.violations.filter(rule => rule.impact === "serious" || rule.impact === "critical"));
  assert.deepEqual(serious, [], "Repair serious findings in the sampled pages");
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });

  for (const [width, height] of [[320, 700], [375, 620], [390, 844], [640, 512], [768, 1024], [1280, 800]]) {
    await page.setViewportSize({ width, height });
    for (const path of ["/", "/science-catch-up/lesson/?topic=osmosis", "/teacher/", "/teaching/focused-writing/ks3/"]) {
      await page.goto(base + path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      assert(overflow <= 3, path + " overflows at " + width + "px by " + overflow + "px");
    }
  }

  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto(base + "/");
  const support = page.getByRole("region", { name: "Support the development of these resources" });
  assert.equal(await support.getByRole("link", { name: "Support on Ko-fi" }).getAttribute("href"), "/support/");
  assert.match(await support.locator("p").textContent(), /Contributions are neither requested nor accepted from students\.$/);
  assert.equal(await page.getByRole("link", { name: "Catch up Science · Years 7–11" }).getAttribute("href"), "/science-catch-up/");
  assert.equal(await page.getByRole("heading", { name: "Biology Simulations", exact: true }).count(), 1);
  assert.equal(await page.getByRole("link", { name: /Put digestive enzymes to the test/ }).count(), 1);
  assert(await page.locator(".home-option--sim p").evaluate(p => parseFloat(getComputedStyle(p).fontSize) >= 16));

  await page.goto(base + "/teaching/focused-writing/order/");
  await page.getByRole("button", { name: "Choose sentence for topic sentence" }).click();
  const sentencePicker = page.getByRole("dialog", { name: "Topic sentence" });
  assert(await sentencePicker.isVisible());
  assert(await sentencePicker.evaluate(dialog => dialog.scrollWidth <= dialog.clientWidth + 2), "Sentence picker needs horizontal scrolling at 320px");
  await page.addScriptTag({ content: axe.source });
  const pickerIssues = await page.evaluate(async () => {
    const result = await window.axe.run({ runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] } });
    return result.violations.map(rule => rule.id);
  });
  assert.deepEqual(pickerIssues, [], "Accessibility findings while the sentence picker is open");

  await page.goto(base + "/teaching/");
  assert.equal(await page.locator('main a[href="/support/"]').count(), 1);
  await page.goto(base + "/teaching/focused-writing/ks3/");
  await page.addStyleTag({ content: "*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}" });
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 3), "Writing text spacing caused page overflow");
  const answer = page.locator('[data-writing-exercise="dye"] textarea').first();
  await page.setViewportSize({ width: 375, height: 390 });
  await answer.fill("Faster particle movement.");
  const field = await answer.boundingBox();
  assert(field && field.y + field.height > 0 && field.y < 390, "Writing input leaves the short viewport");

  for (const [width, height] of [[320, 700], [375, 560], [390, 844], [667, 375], [844, 390], [768, 1024]]) {
    await page.setViewportSize({ width, height });
    await page.goto(base + "/teaching/simulations/enzyme-kinetics/?activity=gcse");
    const controls = page.getByRole("group", { name: "Simulation controls" });
    const start = controls.getByRole("button", { name: "Start", exact: true });
    await start.tap();
    await controls.getByRole("button", { name: "Pause", exact: true }).tap();
    const graph = page.locator("#graph-readout > summary");
    await graph.tap();
    const visible = await controls.boundingBox();
    assert(visible && visible.y >= -1 && visible.y + visible.height <= height + 1, "Simulation controls move out of view");
    assert((await graph.boundingBox()).height >= 43, "Graph disclosure has a small touch target");
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 3), "Simulation page overflow at " + width);
  }
  console.log("Responsive, short-viewport, touch, and adjusted text-spacing checks passed.");
} finally {
  await browser.close();
  await new Promise(done => server.close(done));
}

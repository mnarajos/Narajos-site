import assert from "node:assert/strict";
import { chromium } from "playwright";
import { servePublic } from "./browser-test-site.mjs";

const { server, base } = await servePublic();
let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 850 }, reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(base + "/alevel/#practical-7");
  await page.getByRole("link", { name: "Open the RP7 simulation" }).click();
  assert.match(page.url(), /\/alevel\/chromatography\//);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.locator('[data-act="adv"]').focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement.id), "tasks");
  await page.locator('input[name="cspeed"][value="fast"]').check({ force: true });
  await page.locator("#csvg + .diagram-zoom").focus();
  await page.keyboard.press("Enter");
  assert(await page.locator("#zoom-dialog").evaluate(el => el.open));
  await page.locator('#zoom-actions button[data-control="cstart"]').click();
  await page.waitForFunction(() => document.querySelector("#cstate").textContent === "Running");
  const before = await page.locator("#zoom-content #cfrontl-zoom").getAttribute("d");
  await page.waitForTimeout(600);
  const after = await page.locator("#zoom-content #cfrontl-zoom").getAttribute("d");
  assert.notEqual(after, before);
  await page.locator('#zoom-actions button[data-control="cpause"]').click();
  assert.equal(await page.locator("#cstate").innerText(), "Paused");
  const stopped = await page.locator("#ctime").innerText();
  await page.waitForTimeout(250);
  assert.equal(await page.locator("#ctime").innerText(), stopped);
  await page.locator('#zoom-actions button[data-control="cstart"]').click();
  await page.waitForFunction(() => parseFloat(document.querySelector("#cfront").textContent) >= 82, null, { timeout: 12000 });
  await page.locator('#zoom-actions button[data-control="cremove"]').click();
  await page.waitForFunction(() => document.querySelector("#cstate").textContent === "Removed");
  await page.locator('#zoom-actions button[data-control="cmark"]').click();
  await page.locator('#zoom-actions button[data-control="cdraw"]').click();
  assert.equal(await page.locator("#cstate").innerText(), "Finished");
  await page.waitForFunction(() => document.querySelector("#zoom-content #cfrontl-zoom")?.getAttribute("d") === document.querySelector("#csvg #cfrontl")?.getAttribute("d"));
  await page.keyboard.press("Escape");
  assert(!(await page.locator("#zoom-dialog").evaluate(el => el.open)));
  assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), "Enlarge diagram");

  await page.goto(base + "/alevel/#catchup-a5-chromat");
  assert.equal(await page.getByRole("link", { name: "Open the RP7 simulation" }).count(), 1);
  for (const width of [320, 375, 1200]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto(base + "/alevel/chromatography/");
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `overflow at ${width}`);
    assert.equal(await page.locator("#csvg").getAttribute("role"), "img");
    assert((await page.locator("#csvg").getAttribute("aria-label")).length > 40);
  }
  // Primary foreground/background colors have at least WCAG AA contrast.
  const contrast = await page.evaluate(() => {
    const rgb = text => text.match(/\d+/g).slice(0, 3).map(Number).map(n => { const v = n / 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; });
    const lum = v => v[0] * .2126 + v[1] * .7152 + v[2] * .0722;
    const pair = (fg, bg) => { const a = lum(rgb(fg)), b = lum(rgb(bg)); return (Math.max(a, b) + .05) / (Math.min(a, b) + .05); };
    const body = getComputedStyle(document.body), button = getComputedStyle(document.querySelector(".btn.primary"));
    return [pair(body.color, body.backgroundColor), pair(button.color, button.backgroundColor)];
  });
  assert(contrast.every(value => value >= 4.5), `low contrast: ${contrast}`);
  await page.emulateMedia({ colorScheme: "dark" });
  const darkContrast = await page.evaluate(() => {
    const lum = value => { const c = value.match(/\d+/g).slice(0, 3).map(Number).map(n => { const x = n / 255; return x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }); return c[0] * .2126 + c[1] * .7152 + c[2] * .0722; };
    const ratio = el => { const c = getComputedStyle(el), a = lum(c.color), b = lum(c.backgroundColor); return (Math.max(a, b) + .05) / (Math.min(a, b) + .05); };
    return [ratio(document.body), ratio(document.querySelector(".btn.primary"))];
  });
  assert(darkContrast.every(value => value >= 4.5), `low dark contrast: ${darkContrast}`);
  assert.deepEqual(errors, []);
  console.log("RP7 navigation, keyboard, live zoom controls, reduced motion, contrast and viewport checks passed.");
} finally { await browser?.close(); server.close(); }

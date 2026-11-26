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
  await page.addInitScript(() => {
    const seed = sessionStorage.getItem("review-seed");
    if (seed) {
      localStorage.setItem("kst-rp9-v3", seed);
      sessionStorage.removeItem("review-seed");
    }
  });
  await page.goto(base + "/alevel/respiration/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // The magnified tube must track a running experiment through its endpoint.
  await page.locator('input[name="mbspeed"][value="fast"]').check({ force: true });
  await page.locator("#mbrun").click();
  await page.locator("#mbsvg + .diagram-zoom").click();
  const dialog = page.locator("#zoom-dialog");
  assert.equal(await dialog.evaluate(el => el.open), true);
  const startFill = await page.locator("#zoom-content #mbliq-zoom").getAttribute("fill");
  await page.waitForFunction(() => document.querySelector("#mbstate").textContent === "End point", null, { timeout: 8000 });
  await page.waitForFunction(() => document.querySelector("#zoom-content #mbliq-zoom")?.getAttribute("fill") === document.querySelector("#mbsvg #mbliq")?.getAttribute("fill"));
  const endFill = await page.locator("#zoom-content #mbliq-zoom").getAttribute("fill");
  assert.notEqual(endFill, startFill);
  assert.equal(await dialog.evaluate(el => el.open), true);
  await page.keyboard.press("Escape");
  assert.equal(await dialog.evaluate(el => el.open), false);

  // The live respirometer copy also follows the marker and retains local SVG references.
  await page.locator('#ptabs [data-p="gas"]').click();
  await page.locator("#bgas").click();
  await page.locator('input[name="speed"][value="fast"]').check({ force: true });
  await page.locator("#brun").click();
  await page.locator("#appsvg + .diagram-zoom").click();
  const startPosition = await page.locator("#zoom-content #dye-zoom").getAttribute("x1");
  assert(await page.locator('#zoom-content use[href="#o2-zoom"]').count() > 0);
  await page.waitForFunction(() => document.querySelector("#rstate").textContent === "Finished", null, { timeout: 10000 });
  await page.waitForFunction(() => document.querySelector("#zoom-content #dye-zoom")?.getAttribute("x1") === document.querySelector("#appsvg #dye")?.getAttribute("x1"));
  assert.notEqual(await page.locator("#zoom-content #dye-zoom").getAttribute("x1"), startPosition);
  await page.keyboard.press("Escape");

  async function loadApply(advance) {
    const seed = await page.evaluate(() => JSON.parse(localStorage.getItem("kst-rp9-v3")));
    Object.assign(seed.state, { sec: 3, adv: advance, res: {}, vr: {}, wr: {}, pick: {} });
    seed.panel = "task";
    await page.evaluate(value => sessionStorage.setItem("review-seed", JSON.stringify(value)), seed);
    await page.reload();
  }

  async function answerFreshChoice(id) {
    if (id === "a3") {
      assert.match(await page.locator("#p-task .info").innerText(), /nitrogen/);
      assert.equal(await page.locator("#p-task .a-oil").count(), 1);
    }
    await page.locator(`input[name="${id}:0"][value="1"]`).check();
    await page.locator('[data-act="check"]').click();
    await page.locator('[data-act="freshq"]').click();
    if (id === "a3") {
      assert.match(await page.locator("#p-task .info").innerText(), /air above the yeast and no oil layer/);
      assert.equal(await page.locator("#p-task .a-oil").count(), 0);
      assert.doesNotMatch(await page.locator("#p-task").innerText(), /nitrogen/);
    }
    await page.locator(`input[name="${id}:1"][value="0"]`).check();
    await page.locator('[data-act="check"]').click();
    return page.locator("#tasks .fb.good").innerText();
  }

  await loadApply({});
  let feedback = await answerFreshChoice("a1");
  assert.match(feedback, /new starting reading/i);
  assert.match(feedback, /seal.*equilibration/i);

  await loadApply({ a1: true });
  assert.match(await page.locator("#tasks").innerText(), /radius is 0\.5 mm/);
  await page.locator("#in-a2").fill("0");
  await page.locator('[data-act="num"]').click();
  await page.locator('[data-act="freshq"]').click();
  assert.match(await page.locator("#tasks").innerText(), /radius 0\.6 mm/);
  const panel = await page.locator("#p-task").innerText();
  assert.match(panel, /radius given in each question/);
  assert.doesNotMatch(panel, /0\.5 mm/);
  await page.locator("#in-a2").fill("1.7");
  await page.locator('[data-act="num"]').click();
  assert.match(await page.locator("#tasks .fb.good").innerText(), /0\.6²/);

  await loadApply({ a1: true, a2: true });
  feedback = await answerFreshChoice("a3");
  assert.match(feedback, /Air supplies oxygen/);
  assert.match(feedback, /net gas-volume change/);
  assert.doesNotMatch(feedback, /Here they were/);

  const seed = await page.evaluate(() => JSON.parse(localStorage.getItem("kst-rp9-v3")));
  Object.assign(seed.state, { sec: 1, adv: {}, res: {}, vr: {} });
  await page.evaluate(value => sessionStorage.setItem("review-seed", JSON.stringify(value)), seed);
  await page.reload();
  const worked = await page.locator("#tasks").innerText();
  assert.match(worked, /internal pressure initially falls[\s\S]*Atmospheric pressure pushes[\s\S]*decreasing the enclosed gas volume/);
  assert.doesNotMatch(worked, /lower volume means a lower pressure/i);

  assert.deepEqual(errors, []);
  console.log("RP9 retry feedback, variant radius and live enlargement checks passed.");
} finally {
  await browser?.close();
  server.close();
}

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { chromium } from "playwright";
import { servePublic } from "./browser-test-site.mjs";

const { server, base } = await servePublic();
let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.addInitScript(() => {
    const seed = sessionStorage.getItem("rp7-test-seed");
    if (seed) { localStorage.setItem("kst-rp7-v2", seed); sessionStorage.removeItem("rp7-test-seed"); }
  });
  await page.goto(base + "/alevel/chromatography/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  assert.match(await page.locator("#tasks").innerText(), /Separating the pigments/);
  await page.locator('[data-act="adv"]').click();
  await page.locator('input[name="l2o"][value="1"]').check();
  await page.locator('input[name="l2r"][value="1"]').check();
  await page.locator('[data-act="lock"]').click();
  await page.locator('input[name="cspeed"][value="fast"]').check({ force: true });

  async function startTo(front) {
    await page.locator("#cstart").click();
    await page.waitForFunction(n => parseFloat(document.querySelector("#cfront").textContent) >= n, front, { timeout: 15000 });
    await page.locator("#cremove").click();
    await page.waitForFunction(() => document.querySelector("#cstate").textContent === "Removed", null, { timeout: 6000 });
  }
  async function finish(markFront = true, markSpots = true) {
    if (await page.locator("#cmark").isEnabled()) await page.locator(markFront ? "#cmark" : "#cskipfront").click();
    await page.locator(markSpots ? "#cdraw" : "#cskipspots").click();
    await page.waitForFunction(() => document.querySelector("#cstate").textContent === "Finished");
  }
  const stored = () => page.evaluate(() => JSON.parse(localStorage.getItem("kst-rp7-v2")));
  const seed = async value => { await page.evaluate(x => sessionStorage.setItem("rp7-test-seed", JSON.stringify(x)), value); await page.reload(); };
  await startTo(88);
  // This is a self-paced step: no four-second deadline.
  await page.waitForTimeout(4500);
  assert.equal(await page.locator("#cmark").isEnabled(), true);
  await finish();
  let data = await stored();
  const runA = data.cRuns.at(-1);
  assert(runA.front > 0 && runA.spots.some(x => x.visible));
  assert.match(await page.locator("#tasks").innerText(), /Review the feedback/);
  assert.equal(data.state.res.l2, undefined);
  await page.locator('[data-act="revise-prediction"]').click();
  await page.locator('input[name="l2o"][value="0"]').check();
  await page.locator('input[name="l2r"][value="0"]').check();
  await page.locator('[data-act="correct-prediction"]').click();
  data = await stored();
  assert.equal(data.state.res.l2, "sup");

  data.state.adv = { l1: true, l2: true, l3: true, l4: true };
  data.state.sec = 0;
  data.panel = "chr";
  await seed(data);
  const expectedA = runA.spots.find(x => x.p === "cha").d;
  assert.match(await page.locator("#measure-run").innerText(), new RegExp(`run ${runA.id}\\b`));
  await page.locator("#in-l5").fill(String(expectedA));
  await page.locator('[data-act="num"]').click();
  assert.match(await page.locator("#tasks").innerText(), new RegExp(`${expectedA} mm`));
  assert.equal((await stored()).state.res.l5, "sup");
  await startTo(72);
  await finish();
  data = await stored();
  assert.notEqual(data.cRuns.at(-1).id, runA.id);
  assert.match(await page.locator("#current-run").innerText(), new RegExp(`Run ${data.cRuns.at(-1).id}\\b`));
  assert.equal(data.state.evidence["standard-measurement"].id, runA.id);
  assert.match(await page.locator("#measure-run").innerText(), new RegExp(`run ${runA.id}\\b`));
  assert.match(await page.locator("#tasks").innerText(), new RegExp(`${expectedA} mm`));
  await page.reload();
  assert.equal(await page.locator("#in-l5").inputValue(), String(expectedA));
  assert.match(await page.locator("#tasks").innerText(), new RegExp(`${expectedA} mm`));
  assert.match(await page.locator("#measure-run").innerText(), new RegExp(`run ${runA.id}\\b`));
  await page.locator('[data-act="adv"]').click();
  const rfA = Math.round(expectedA / runA.front * 100) / 100;
  await page.locator("#in-l6").fill(String(rfA));
  await page.locator('[data-act="num"]').click();
  assert.match(await page.locator("#tasks").innerText(), /Correct/);
  assert.equal((await stored()).state.res.l6, "sup");
  await page.locator('[data-act="adv"]').click();
  assert.match(await page.locator("#results tbody tr").first().innerText(), /Rf 0\./);
  assert.match(await page.locator("#tasks").innerText(), /recorded as supported/);
  const bDist = runA.spots.find(x => x.p === "chb").d;
  await page.locator("#in-l7").fill(String(Math.round(bDist / runA.front * 100) / 100));
  await page.locator('[data-act="num"]').click();
  assert.equal((await stored()).state.res.l7, "sup");
  await page.locator('[data-act="adv"]').click();
  await page.locator('input[name="l8o"][value="0"]').check();
  await page.locator('input[name="l8r"][value="0"]').check();
  await page.locator('[data-act="lock"]').click();
  await startTo(45); await finish();
  assert.match(await page.locator("#tasks").innerText(), /separated carotene spot.*Rf/i);
  assert.match(await page.locator("#results tbody tr").last().innerText(), /Overlapping spots cannot be measured separately/i);
  assert((await stored()).state.res.l8);

  // Invalid records stay invalid in the apparatus, measured view and miniature.
  await page.locator('[data-sec="1"]').click();
  await startTo(80);
  await finish(false, true);
  assert.match(await page.locator("#cfront").innerText(), /not recorded/i);
  assert.match(await page.locator("#cnote").innerText(), /not marked/i);
  assert.match(await page.locator("#results tbody tr").last().innerText(), /not marked/i);
  assert.match(await page.locator("#measure-run").innerText(), /front unavailable/i);
  await startTo(80);
  await finish(true, false);
  assert.match(await page.locator("#cnote").innerText(), /No spots/);
  assert.equal(await page.locator("#cspots ellipse").count(), 0);
  assert.equal(await page.locator("#results .mstrip").last().locator("ellipse").count(), 0);
  assert.equal(await page.locator("#msvg ellipse").count(), 0);
  assert.match(await page.locator("#results tbody tr").last().innerText(), /no spots recorded/i);
  await page.locator("#cstart").click();
  await page.waitForFunction(() => document.querySelector("#cfront").textContent === "Unavailable", null, { timeout: 15000 });
  await page.locator("#cremove").click();
  await page.waitForFunction(() => document.querySelector("#cstate").textContent === "Removed");
  assert.equal(await page.locator("#cmark").isEnabled(), false);
  await finish(true, true);
  assert.match(await page.locator("#cnote").innerText(), /ran off the top/i);
  assert.match(await page.locator("#results tbody tr").last().innerText(), /not marked/i);
  data = await stored();
  data.state.sec = 0; data.state.adv = { l1: true, l2: true, l3: true, l4: true }; data.state.res = {};
  data.state.evidence = {}; data.cRuns = data.cRuns.slice(-3); data.panel = "chr";
  await seed(data);
  assert.equal(await page.locator("#in-l5").count(), 0);
  assert.match(await page.locator("#tasks").innerText(), /need a standard chromatogram/i);

  // Reload a running experiment and resume its original time and ID.
  await page.locator("#cstart").click();
  await page.waitForFunction(() => document.querySelector("#cstate").textContent === "Running");
  await page.waitForTimeout(700);
  await page.locator("#cpause").click();
  const before = await stored();
  await page.reload();
  assert.equal(await page.locator("#cstate").innerText(), "Paused");
  const restored = await stored();
  assert.equal(restored.cr.id, before.cr.id);
  assert.equal(restored.cr.t, before.cr.t);
  await page.locator("#cstart").click();
  await page.waitForFunction(t => JSON.parse(localStorage.getItem("kst-rp7-v2")).cr.t > t, before.cr.t, { timeout: 4000 });
  const liveRun = await stored();
  await page.reload();
  assert.equal(await page.locator("#cstate").innerText(), "Paused");
  const interrupted = await stored();
  assert.equal(interrupted.cr.id, liveRun.cr.id);
  assert(interrupted.cr.t >= liveRun.cr.t);
  await page.locator("#cstart").click();
  await page.waitForFunction(t => JSON.parse(localStorage.getItem("kst-rp7-v2")).cr.t > t, interrupted.cr.t, { timeout: 4000 });

  // Losing evidence clears its answer and completion together, with a visible notice.
  data = await stored(); data.state.sec = 0; data.state.adv = { l1: true, l2: true, l3: true, l4: true, l5: true };
  data.state.res = { l5: "sup" }; data.state.txt = { "l5:0": "59" }; data.state.evidence = {}; data.cRuns = [runA]; data.panel = "chr";
  await seed(data);
  assert.match(await page.locator("#restore-notice").innerText(), /evidence was unavailable/);
  assert.equal(await page.locator("#in-l5").inputValue(), "");
  assert.equal((await stored()).state.res.l5, undefined);

  // Drafts survive reload and remain editable until the self-check is saved.
  data = await stored(); data.state.sec = 0;
  data.state.adv = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`l${i + 1}`, true]));
  data.state.res = {}; data.state.self = {}; data.state.txt = {}; data.state.evidence = { "standard-measurement": runA }; data.panel = "chr";
  await seed(data);
  await page.locator("#wr-l11").fill("Pigments differ in solubility and attraction to paper.");
  await page.reload();
  assert.match(await page.locator("#wr-l11").inputValue(), /solubility/);
  await page.locator('[data-act="write"]').click();
  assert.match(await page.locator("#tasks").innerText(), /does not establish correctness/);
  await page.locator('[data-self="l11"]').first().check();
  await page.locator("#wr-l11").fill("Pigments differ in solubility and attraction, so they spend different times moving with solvent.");
  assert.equal(await page.locator('[data-self="l11"]').first().isChecked(), false);
  await page.locator('[data-act="selfdone"]').click();

  data = await stored(); data.state.sec = 3; data.state.adv = {}; data.state.res = {}; data.state.vr = {}; data.panel = "task";
  await seed(data);
  assert.match(await page.locator("#tasks").innerText(), /Calculate Rf on a thin-layer plate|Calculate the Rf of spot 2/);
  assert.doesNotMatch(await page.locator("#tasks").innerText(), /then check it against the table|identify the pigment/i);
  await page.locator("#in-a1").fill("0.55"); await page.locator('[data-act="num"]').click();
  assert.match(await page.locator("#tasks").innerText(), /supports chlorophyll a as a possible identification/);
  data = await stored(); data.state.sec = 3; data.state.adv = { a1: true, a2: true, a3: true }; data.state.res = {}; data.state.vr = {};
  await seed(data);
  assert.doesNotMatch(await page.locator("#tasks").innerText(), /identify the pigment/i);
  await page.locator("#in-a4").fill("0.45"); await page.locator('[data-act="num"]').click();
  assert.match(await page.locator("#tasks").innerText(), /supports chlorophyll b as a possible identification/);
  // Fresh numerical variants use the same diagram but their own distances and explanations.
  data = await stored(); data.state.adv = {}; data.state.res = {}; data.state.vr = {}; data.state.wr = {};
  await seed(data); await page.locator("#in-a1").fill("0.1"); await page.locator('[data-act="num"]').click();
  await page.locator('[data-act="freshq"]').click();
  assert.match(await page.locator("#tasks").innerText(), /spot 4/);
  assert.match(await page.locator("#p-task svg").getAttribute("aria-label"), /22 mm/);
  await page.locator("#in-a1").fill("0.28"); await page.locator('[data-act="num"]').click();
  assert.match(await page.locator("#tasks .fb.good").innerText(), /22 ÷ 80 = 0.28/);
  data = await stored(); data.state.adv = { a1: true, a2: true, a3: true }; data.state.res = {}; data.state.vr = {}; data.state.wr = {};
  await seed(data); await page.locator("#in-a4").fill("0.1"); await page.locator('[data-act="num"]').click();
  await page.locator('[data-act="freshq"]').click();
  assert.match(await page.locator("#tasks").innerText(), /spot Q/);
  assert.match(await page.locator("#p-task svg").getAttribute("aria-label"), /55/);
  await page.locator("#in-a4").fill("0.65"); await page.locator('[data-act="num"]').click();
  assert.match(await page.locator("#tasks .fb.good").innerText(), /55 ÷ 84 = 0.65/);
  data = await stored(); data.state.adv = { a1: true, a2: true }; data.state.res = {}; data.state.vr = {}; data.state.wr = {};
  await seed(data); assert.match(await page.locator("#p-task svg").getAttribute("aria-label"), /solvent above/);
  assert.equal(await page.getByText("The solvent is above the starting line", { exact: true }).count(), 1);
  data = await stored(); data.state.sec = 3; data.state.adv = { a1: true, a2: true, a3: true, a4: true }; data.state.res = {}; data.state.vr = {}; data.state.wr = {}; data.state.pick = {};
  await seed(data); await page.locator('input[name="a5:0"][value="0"]').check(); await page.locator('[data-act="check"]').click();
  assert.match(await page.locator("#tasks .fb.good").innerText(), /Poor solubility.*strong retention/i);
  data = await stored(); data.state.sec = 2; data.state.adv = {}; data.state.res = {}; data.state.vr = {}; data.state.wr = {}; data.state.pick = {};
  await seed(data); await page.locator('input[name="k1:0"][value="1"]').check(); await page.locator('[data-act="check"]').click();
  await page.locator('[data-act="freshq"]').click(); await page.locator('input[name="k1:1"][value="3"]').check(); await page.locator('[data-act="check"]').click();
  assert.match(await page.locator("#tasks .fb.bad").innerText(), /twice the spot distance.*not a new observation.*times do not simply double/i);
  data = await stored(); data.state.sec = 1; data.state.adv = { e1: true, e2: true, e3: true }; data.state.res = {}; data.state.vr = {}; data.state.wr = {}; data.state.pick = {};
  await seed(data); await page.locator('input[name="e4:0"][value="1"]').check(); await page.locator('[data-act="check"]').click();
  await page.locator('[data-act="freshq"]').click(); await page.locator('input[name="e4:1"][value="0"]').check(); await page.locator('[data-act="check"]').click();
  assert.match(await page.locator("#tasks .fb.good").innerText(), /spreading can also make spots paler/i);
  data = await stored(); data.state.sec = 3;
  data = await stored(); data.state.adv = { a1: true, a2: true, a3: true, a4: true, a5: true, a6: true, a7: true };
  await seed(data);
  assert.doesNotMatch(await page.locator("#tasks").innerText(), /All sections complete/);

  for (const width of [1200, 320]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto(base + "/alevel/chromatography/");
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `overflow at ${width}`);
  }
  // Option length should not identify the correct answer in any MCQ variant.
  const html = await readFile("public/alevel/chromatography/index.html", "utf8");
  const section = html.slice(html.indexOf("const O=(t,fb)"), html.indexOf("// Completed calculations cannot retain"));
  const tasks = new Function('const CSTD={leaf:"sun",solv:"aqa",origin:"pencil",level:"below",spot:"small",lid:true,touch:false};const ALL=()=>SECTIONS.flatMap(s=>s.tasks);' + section + ';return ALL();')();
  for (const id of ["a1", "a4"]) assert.doesNotMatch(tasks.find(t => t.id === id).skill, /identify/i);
  for (const task of tasks.filter(t => t.type === "mcq")) for (const variant of task.v) {
    const lengths = variant.opts.map(o => o.t.length), correct = variant.opts.findIndex(o => o.ok);
    assert(!(lengths[correct] === Math.max(...lengths) && lengths.filter(n => n === lengths[correct]).length === 1), `${task.id}: correct option is uniquely longest`);
  }
  assert.deepEqual(errors, []);
  console.log("RP7 experiment, evidence, prediction, invalid runs, resume, writing and responsive checks passed.");
} finally {
  await browser?.close();
  server.close();
}

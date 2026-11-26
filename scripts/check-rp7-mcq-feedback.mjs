import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { chromium } from "playwright";
import { servePublic } from "./browser-test-site.mjs";

// Each pair names an actual misconception and the concept its feedback must address.
const expected = {
  "l3:0": [[/moves more slowly/, /same speed/i], [/trapped.*size/, /trapped.*gaps/i], [/dissolves better/, /further/i]],
  "l3:1": [[/0\.35.*retained/, /0\.35.*stuck/i], [/1\.00.*front/, /falls behind.*front/i], [/without.*mass/, /mass is not needed/i]],
  "l4:0": [[/spots.*dry/, /without solvent.*stop moving/i], [/pencil.*dry/, /pencil works on dry paper/i], [/increases.*Rf/, /does not change.*distance/i]],
  "l4:1": [[/travel further/, /spots have stopped moving/i], [/reveals.*front/, /front is marked separately/i], [/stops.*spreading/, /spots stop spreading/i]],
  "l9:0": [[/deeper solvent/, /cover.*starting line.*dissolve/i], [/larger.*wider/, /bigger spots overlap more/i], [/earlier.*closer/, /earlier.*closer/i]],
  "l9:1": [[/smaller spots.*harder/, /small.*spots.*see.*separated/i], [/equal run length/, /gap.*same.*spot sizes differ/i], [/equal Rf.*widths/, /same Rf.*centres.*wider spots/i]],
  "l10:0": [[/certain.*closest/, /supports.*identification.*cannot prove/i], [/new pigment/, /Rf values can differ/i], [/no inference/i, /Rf and colour support/i]],
  "e4:0": [[/smear.*quickly/, /crushing affects the spot/i], [/molecules.*fragments/, /breaks cells.*not change.*molecules/i], [/below.*solvent/, /above the solvent/i]],
  "e4:1": [[/propanone only/, /propanone.*spots run together/i], [/shorten.*faint/i, /already faint.*too little pigment/i], [/front later/, /later.*does not add pigment.*front/i]],
  "k1:0": [[/Rf is higher/, /further.*solvent/i], [/overlap more/, /overlap.*harder to measure/i], [/different pigments/, /same leaf.*same solvent/i]],
  "k1:1": [[/short runs.*incorrect/, /ratio.*short runs.*same Rf/i], [/overlapping spot.*centre/, /overlapping spots.*no distinct.*centres/i], [/double.*new run/i, /doubling.*not a new observation.*times do not simply double/i]],
  "k2:0": [[/Rf is fixed/, /not fixed across solvents.*matched conditions/i], [/mass.*lighter/, /does not make pigment molecules lighter.*partitioning/i], [/darkness.*different amounts/, /same leaf.*amount.*darkness.*solvent.*Rf/i]],
  "k2:1": [[/propanone.*further/i, /further.*not the aim/i], [/equally distinct/, /spots are bunched/i], [/water.*moves further/i, /little movement in water/i]],
  "k3:0": [[/higher Rf/, /Rf values are the same/i], [/new pigment/, /same four spots/i], [/A.*stronger/, /stronger in B, not A/i]],
  "k3:1": [[/Rf.*light absorption/, /Rf.*not light absorption/i], [/spot size.*wavelengths/, /not which wavelengths.*absorbed/i], [/neither.*carotene/, /both leaves have carotene/i]],
  "k4:0": [[/too heavy/, /weight is not what matters/i], [/front never reaches/, /solvent passed.*starting line/i], [/chlorophyll.*converted/, /different pigment/i]],
  "a2:0": [[/different molecule/, /same pigments/i], [/Rf cannot change/, /both can be correct/i], [/breaks down/, /nothing here suggests breakdown/i]],
  "a5:0": [[/mass alone/, /mass alone does not determine.*solubility.*retention/i], [/front never passed/, /front passed.*starting line/i], [/omitted.*measurement/, /starting line.*distance is zero.*does not mean.*omitted/i]],
  "a6:0": [[/new carotene/, /cannot establish when carotene was made/i], [/no chlorophyll/, /faint chlorophyll spots/i], [/stayed at the origin/, /chlorophyll spots.*usual places.*faint/i]]
};

const html = await readFile("public/alevel/chromatography/index.html", "utf8");
const source = html.slice(html.indexOf("const O=(t,fb)"), html.indexOf("// Completed calculations cannot retain"));
const sections = new Function('const CSTD={leaf:"sun",solv:"aqa",origin:"pencil",level:"below",spot:"small",lid:true,touch:false};const ALL=()=>SECTIONS.flatMap(s=>s.tasks);' + source + ';return SECTIONS;')();
const variants = sections.flatMap((section, sec) => section.tasks.flatMap((task, index) => task.type === "mcq" ? task.v.map((variant, vi) => ({ section, sec, task, index, variant, vi })) : []));
assert.deepEqual(variants.map(({task, vi}) => `${task.id}:${vi}`).sort(), Object.keys(expected).sort(), "Every MCQ variant must have misconception-specific cases");
const mismatches = [];
for (const {task, variant, vi} of variants) {
  const key = `${task.id}:${vi}`, wrongs = variant.opts.filter(option => !option.ok);
  if (wrongs.length !== expected[key].length) mismatches.push(`${key}: wrong number of cases`);
  wrongs.forEach((option, i) => {
    const [question, feedback] = expected[key][i] || [];
    if (!question?.test(option.t)) mismatches.push(`${key}:${i + 1} option: ${option.t}`);
    if (!feedback?.test(option.fb)) mismatches.push(`${key}:${i + 1} feedback: ${option.fb}`);
  });
}
assert.deepEqual(mismatches, [], "Misconceptions and their feedback should correspond");

const run = {
  id: 1, s: {leaf:"sun",solv:"aqa",origin:"pencil",level:"below",spot:"small",lid:true,touch:false},
  Ftrue: 90, front: 90, tMin: 16, overlap: false,
  spots: [{p:"car",d:86,r:2,a:.7,visible:true},{p:"xan",d:64,r:2,a:.6,visible:true},{p:"cha",d:59,r:2,a:1,visible:true},{p:"chb",d:41,r:2,a:.45,visible:true}]
};
const { server, base } = await servePublic();
let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.addInitScript(() => {
    const seed = sessionStorage.getItem("rp7-feedback-seed");
    if (seed) { localStorage.setItem("kst-rp7-v2", seed); sessionStorage.removeItem("rp7-feedback-seed"); }
  });
  await page.goto(base + "/alevel/chromatography/");
  const initial = await page.evaluate(() => JSON.parse(localStorage.getItem("kst-rp7-v2")));
  let checked = 0;
  for (const {section, sec, task, index, variant, vi} of variants) {
    const key = `${task.id}:${vi}`;
    const wrongs = variant.opts.map((option, i) => ({option, i})).filter(({option}) => !option.ok);
    assert.equal(wrongs.length, expected[key].length, `${key}: missing misconception cases`);
    const data = structuredClone(initial);
    data.state = { sec, res:{}, adv:Object.fromEntries(section.tasks.slice(0,index).map(t=>[t.id,true])), pick:{}, vr:{[task.id]:vi}, wr:{}, lock:{}, hint:{}, txt:{}, self:{}, seen:{}, evidence:{"standard-measurement":run}, review:{}, attempts:{}, rt:{} };
    data.cRuns = [run]; data.cId = 1; data.panel = "chr";
    await page.evaluate(value => sessionStorage.setItem("rp7-feedback-seed", JSON.stringify(value)), data);
    await page.reload();
    for (let j = 0; j < wrongs.length; j++) {
      const {i} = wrongs[j], [optionPattern, feedbackPattern] = expected[key][j];
      const input = page.locator(`input[name="${key}"][value="${i}"]`);
      assert.match(await input.locator("..").innerText(), optionPattern, `${key} option ${i} changed misconception`);
      await input.check();
      await page.locator(`[data-act="check"][data-id="${task.id}"]`).click();
      assert.match(await page.locator("#tasks .fb.bad").innerText(), feedbackPattern, `${key} option ${i} gave unrelated feedback`);
      checked++;
      const retry = page.locator(`[data-act="retry"][data-id="${task.id}"]`);
      if (j + 1 < wrongs.length && await retry.count()) await retry.click();
    }
  }
  assert.deepEqual(errors, []);
  console.log(`RP7 feedback matched all ${checked} incorrect options across ${variants.length} MCQ variants.`);
} finally {
  await browser?.close();
  server.close();
}

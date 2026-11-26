import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { join } from "node:path";
import axe from "axe-core";
import { chromium } from "playwright";
import { servePublic } from "./browser-test-site.mjs";

const environment = { window: {} };
runInNewContext(readFileSync(new URL("../public/assets/vocabulary-school-data.js", import.meta.url), "utf8"), environment);
const entries = environment.window.SiteVocabularyData;
assert.equal(new Set(entries.map(entry => entry.id)).size, entries.length);
for (const entry of entries) {
  assert(entry.meaning && entry.sources?.length && entry.courses?.length && entry.topics?.length, entry.id);
  assert(["selective", "increased", "lookup"].includes(entry.support), entry.id);
  assert(entry.sources.every(source => source.startsWith("https://")), entry.id);
}
for (const topic of ["b1","b2","b3","b4","b5","b6","b7","c1","c2","c3","c4","c5","c6","c7","c8","c9","c10","p1","p2","p3","p4","p5","p6","p7"]) {
  assert(entries.some(entry => entry.courses.includes("gcse") && entry.topics.includes(topic)), topic);
}
for (const unit of ["f170","f171","f172","f173","f174","f175","f176","f177"]) {
  assert(entries.some(entry => entry.courses.includes("aaq") && entry.topics.includes(unit)), unit);
}
assert.match(entries.find(entry => entry.id === "gcse-mitosis").catchup, /topic=mitosis$/);
assert.equal(entries.find(entry => entry.id === "gcse-microscope-resolution").catchup, null);
assert.deepEqual(Array.from(entries.find(entry => entry.id === "gcse-mole").tiers), ["FH"]);
assert.deepEqual(Array.from(entries.find(entry => entry.id === "gcse-refraction-foundation").tiers), ["F"]);

const preferenceKey = "keystone.alevel.vocabulary.preference.v1";
const screenshotDirectory = process.env.NARAJOS_SITE_VOCAB_SCREENSHOTS || "/tmp";
const browser = await chromium.launch();
const { server, base } = await servePublic();
const errors = [];
const term = (page, id) => page.locator('main button[data-vocabulary-term="' + id + '"]');
const panel = page => page.locator("dialog.vocabulary-panel[open]");
const toolbar = page => page.getByRole("button", { name: "Word help", exact: true });
const close = page => panel(page).getByRole("button", { name: "Close word help" });
const search = page => panel(page).getByRole("searchbox", { name: "Find a science term" });
const more = page => panel(page).getByRole("checkbox", { name: "More word help" });

async function newPage(options) {
  const page = await browser.newPage({ reducedMotion: "reduce", ...options });
  page.setDefaultTimeout(8000);
  page.on("pageerror", error => errors.push(page.url() + " " + error.message));
  await page.route(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\//, route => route.abort());
  await page.addInitScript(() => { window.name = "kstest"; });
  return page;
}

async function capture(page, name) {
  await page.screenshot({ path: join(screenshotDirectory, name + ".png") });
}

async function checkPanel(page) {
  await page.addScriptTag({ content: axe.source });
  const violations = await page.evaluate(async () => (await window.axe.run(".vocabulary-panel", {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] }
  })).violations.map(({ id }) => id));
  assert.deepEqual(violations, []);
}

async function lookup(page, query, name) {
  await toolbar(page).click();
  await search(page).fill(query);
  await panel(page).getByRole("button", { name, exact: true }).click();
  return panel(page).locator(".vocabulary-meaning").innerText();
}

async function checkCourseContexts(page) {
  await page.goto(base + "/ks3/cells/");
  await term(page, "ks3-cell").first().waitFor();
  const ks3Meaning = await lookup(page, "cell", "Cell");
  assert.match(ks3Meaning, /tiny living building block/i);
  assert.match(await panel(page).innerText(), /cheek cell/i);
  await capture(page, "ks3-desktop");
  const termBox = await term(page, "ks3-cell").first().boundingBox();
  const panelBox = await panel(page).boundingBox();
  assert(termBox.x + termBox.width < panelBox.x, "Desktop panel leaves the passage visible");
  await checkPanel(page);
  await page.keyboard.press("Escape");
  assert(await toolbar(page).evaluate(button => button === document.activeElement));

  await page.evaluate(() => {
    const fixture = document.createElement("section");
    fixture.id = "site-vocabulary-matching-fixture";
    fixture.setAttribute("data-word-help-scope", "");
    fixture.innerHTML = "<p><em>Cell</em> membranes surround each cell. Cell membranes are boundaries; cellular is a different word.</p>";
    document.querySelector("main").append(fixture);
  });
  const fixture = page.locator("#site-vocabulary-matching-fixture");
  await fixture.locator('[data-vocabulary-term="ks3-cell-membrane"]').waitFor();
  assert.equal(await fixture.locator('[data-vocabulary-term="ks3-cell-membrane"]').count(), 1);
  assert.equal(await fixture.locator('[data-vocabulary-term="ks3-cell-membrane"]').innerText(), "Cell membranes");
  assert.equal(await fixture.locator('[data-vocabulary-term="ks3-cell-membrane"] em').innerText(), "Cell");
  assert.equal(await fixture.locator('[data-vocabulary-term="ks3-cell"]').count(), 1);
  assert.equal(await fixture.locator('button').count(), 2, "Repeated terms and parts of other words are not annotated");
  await page.evaluate(() => window.SiteVocabulary.update());
  await page.waitForTimeout(50);
  assert.equal(await fixture.locator('button').count(), 2, "A dynamic update does not add duplicate controls");
  await fixture.evaluate(node => node.remove());

  await page.goto(base + "/science-catch-up/lesson/?topic=cell-structures");
  const gcseMeaning = await lookup(page, "cell", "Cell (biology)");
  assert.match(gcseMeaning, /smallest unit of a living organism/i);
  assert.notEqual(ks3Meaning, gcseMeaning);
  assert.doesNotMatch(await panel(page).innerText(), /cheek cell/i, "The previous course definition is not retained");
  await close(page).click();
  const catchupTerms = page.locator("main button[data-vocabulary-term]");
  const increased = await catchupTerms.count();
  await capture(page, "gcse-catchup-more");
  await toolbar(page).click();
  await more(page).uncheck();
  await close(page).click();
  const selective = await catchupTerms.count();
  assert(increased > selective, "The same catch-up explanation offers more core terms by default");
  await capture(page, "gcse-catchup-selective");
  await toolbar(page).click();
  await panel(page).getByRole("button", {name:"Use activity default"}).click();
  await close(page).click();
  await page.goto(base + "/ks3/lesson/?topic=respiration&guided=1");
  await term(page, "ks3-aerobic-respiration").waitFor();
  await term(page, "ks3-aerobic-respiration").press("Enter");
  assert.match(await panel(page).innerText(), /oxygen.*energy/i);
  await close(page).click();

  await page.goto(base + "/science-catch-up/lesson/?topic=atomic-number");
  const chemistry = await lookup(page, "ion", "Ion");
  assert.match(chemistry, /charged particle/i);
  assert.equal(await panel(page).getByRole("link", {name:"Open catch-up lesson"}).count(), 0,
    "The current catch-up lesson is not offered as a link to itself");
  await close(page).click();
  await page.goto(base + "/science-catch-up/lesson/?topic=energy-stores");
  const physics = await lookup(page, "work done", "Work done");
  assert.match(physics, /force.*distance/i);
  await close(page).click();
  await page.goto(base + "/science-catch-up/lesson/?topic=atomic-number");
  const atomicNucleus = await lookup(page, "nucleus", "Nucleus (atom)");
  assert.match(atomicNucleus, /atom.*protons and neutrons/i);
  await close(page).click();
  await page.goto(base + "/science-catch-up/lesson/?topic=cell-structures");
  const cellNucleus = await lookup(page, "nucleus", "Nucleus (cell)");
  assert.match(cellNucleus, /cell.*genetic material/i);
  assert.notEqual(atomicNucleus, cellNucleus);
  await close(page).click();

  await page.goto(base + "/science-catch-up/lesson/?topic=salts-and-reactivity&year=10");
  const foundationOxidation = await lookup(page, "oxidation", "Oxidation");
  assert.match(foundationOxidation, /gaining oxygen/i);
  assert.doesNotMatch(foundationOxidation, /electron/i);
  await close(page).click();
  await page.locator("details > summary").filter({hasText:"Higher Tier"}).click();
  const higherOxidation = await lookup(page, "oxidation", "Oxidation");
  assert.match(higherOxidation, /loss of electrons/i);
  await close(page).click();

  await page.goto(base + "/teaching/enzyme-investigations/ks3/");
  await term(page, "ks3-substrate").first().press("Enter");
  assert.match(await panel(page).innerText(), /substance.*enzyme acts on/i);
  await close(page).click();
  await page.goto(base + "/teaching/enzyme-investigations/gcse/");
  await term(page, "gcse-enzyme").first().press("Enter");
  assert.match(await panel(page).innerText(), /biological catalyst/i);
  await close(page).click();
  await page.goto(base + "/gcse/practicals/");
  const physicsCard = page.locator('[data-vocabulary-topic="p2"]');
  await physicsCard.getByText("Compare your explanation", {exact:true}).click();
  await physicsCard.locator('[data-vocabulary-term="gcse-potential-difference"]').first().press("Enter");
  assert.match(await panel(page).innerText(), /energy transferred per unit of charge/i);
  await close(page).click();

  await page.goto(base + "/human-biology/#catchup/f171/3.2.1");
  const aaQ = await lookup(page, "immunosuppression", "Immunosuppression");
  assert.match(aaQ, /reduction in immune activity/i);
  assert.match(await panel(page).innerText(), /transplant.*infection/i);
  await capture(page, "human-biology-desktop");
  await page.evaluate(() => { location.hash = "#catchup/f170/1.1.1"; });
  await term(page, "aaq-erythrocyte").first().waitFor();
  assert.equal(await panel(page).count(), 0, "Changing units closes the old definition");
  assert.match(await lookup(page, "erythrocyte", "Erythrocyte"), /red blood cell/i);
  await close(page).click();

  await page.goto(base + "/human-biology/#catchup/f170/1.1.5.meiosis");
  for (const [query, name, meaning] of [
    ["allele","Allele",/version of a gene/i],
    ["homologues","Homologous chromosomes",/same genes/i],
    ["haploid","Haploid",/one set of chromosomes/i],
    ["antigen","Antigen",/immune system/i]
  ]) {
    assert.match(await lookup(page, query, name), meaning);
    await close(page).click();
  }

  await page.goto(base + "/science-catch-up/lesson/?topic=vaccine-memory&year=10");
  assert.match(await lookup(page, "vaccine", "Vaccine"), /preparation/i);
  await close(page).click();
  assert.match(await lookup(page, "vaccination", "Vaccination"), /giving a vaccine/i);
  await close(page).click();
  await page.goto(base + "/science-catch-up/lesson/?topic=respiration-exercise&year=11");
  assert.match(await lookup(page, "aerobic respiration", "Aerobic respiration"), /use oxygen/i);
  await close(page).click();
  assert.match(await lookup(page, "anaerobic respiration", "Anaerobic respiration"), /without using oxygen/i);
  await close(page).click();

  await page.goto(base + "/science-catch-up/lesson/?topic=wave-motion&year=11");
  assert.match(await page.locator("h1").innerText(), /wave/i);
  const waveMeaning = await lookup(page, "wavelength", "Wavelength");
  assert.match(waveMeaning, /distance.*neighbouring waves/i);
  await close(page).click();

  const units = [
    ["f170","1.1.1","aaq-erythrocyte"],
    ["f171","3.2.1","aaq-immunodeficiency"],
    ["f172","a1","aaq-homologous"],
    ["f173","a2","aaq-cell"],
    ["f174","a1","aaq-amino-acid"],
    ["f175","a1","aaq-oviduct"],
    ["f176","a1","aaq-cerebellum"],
    ["f177","a1","aaq-agonist"]
  ];
  for (const [unit, topic, id] of units) {
    await page.goto(base + "/human-biology/#catchup/" + unit + "/" + topic);
    await term(page, id).first().waitFor();
  }
}

async function checkAssessment(page) {
  await page.goto(base + "/gcse/");
  const meanings = [];
  for (const tier of ["F", "FH"]) {
    await page.evaluate(tier => localStorage.setItem("keystone-aqa-trilogy-v1", JSON.stringify({tier, tierSet:true, sound:false})), tier);
    await page.goto(base + "/gcse/?case=" + tier + "#lesson-b1-diffusion");
    await term(page, "gcse-diffusion").waitFor();
    const control = term(page, "gcse-diffusion");
    await control.focus();
    await page.keyboard.press("ArrowLeft");
    assert.match(await page.locator("#qf legend").innerText(), /what is diffusion/i);
    await control.press("Enter");
    assert.match(await panel(page).innerText(), /count as help/i);
    assert.equal(await panel(page).locator(".vocabulary-meaning").innerText(), "This definition helps answer the current question. Opening it will count as help for this attempt.");
    if (tier === "F") await capture(page, "gcse-target-help");
    await panel(page).getByRole("button", {name:"Show definition with help"}).click();
    meanings.push(await panel(page).locator(".vocabulary-meaning").innerText());
    await close(page).click();
    await page.locator('#qf input[name="a"][value="0"]').check();
    await page.locator("#act").click();
    assert.equal(await page.evaluate(() => [...window.__k.ev("L.first").values()][0]), "supported");
  }
  assert.equal(meanings[0], meanings[1], "Foundation and Higher share the same scientific meaning");

  await page.goto(base + "/gcse/?case=dismiss#lesson-b1-diffusion");
  await term(page, "gcse-diffusion").press("Enter");
  await close(page).click();
  await page.locator('#qf input[name="a"][value="0"]').check();
  await page.locator("#act").click();
  assert.equal(await page.evaluate(() => [...window.__k.ev("L.first").values()][0]), "independent", "Dismissing the target offer is not help");

  await page.goto(base + "/gcse/#lesson-b7-traps");
  const index = await page.evaluate(() => window.__k.ev('L.queue.findIndex(q => (q.q || "").startsWith("A field has an area of 1000"))'));
  assert(index >= 0);
  await page.evaluate(index => window.__k.jump(index), index);
  await term(page, "gcse-quadrat").press("Enter");
  assert.match(await panel(page).innerText(), /frame used to sample/i);
  assert.equal(await panel(page).getByRole("button", {name:"Show definition with help"}).count(), 0);
  await capture(page, "gcse-incidental-help");
  await close(page).click();
  await page.locator("#numin").fill("3000");
  await page.locator("#act").click();
  assert.equal(await page.evaluate(() => [...window.__k.ev("L.first").values()][0]), "independent", "Incidental lookup preserves independent evidence");

  await page.goto(base + "/gcse/?case=chemistry#lesson-c5-exoendo");
  const exothermicIndex = await page.evaluate(() => window.__k.ev('L.queue.findIndex(q => q.q === "What happens in an exothermic reaction?")'));
  assert(exothermicIndex >= 0);
  await page.evaluate(index => window.__k.jump(index), exothermicIndex);
  await term(page, "gcse-exothermic").press("Enter");
  assert.match(await panel(page).innerText(), /count as help/i);
  await close(page).click();

  await page.goto(base + "/gcse/?case=physics#lesson-p2-resistance");
  const voltmeterIndex = await page.evaluate(() => window.__k.ev('L.queue.findIndex(q => (q.q || "").startsWith("How is a voltmeter connected"))'));
  assert(voltmeterIndex >= 0);
  await page.evaluate(index => window.__k.jump(index), voltmeterIndex);
  await term(page, "gcse-potential-difference").press("Enter");
  assert.match(await panel(page).innerText(), /energy transferred per unit of charge/i);
  assert.equal(await panel(page).getByRole("button", {name:"Show definition with help"}).count(), 0);
  await close(page).click();
  await page.locator('#qf input[name="a"][value="0"]').check();
  await page.locator("#act").click();
  assert.equal(await page.evaluate(() => [...window.__k.ev("L.first").values()][0]), "independent");

  await page.goto(base + "/gcse/#mix-c1");
  await page.locator("#mixf").getByRole("button", {name:"Start",exact:true}).click();
  await page.evaluate(() => window.__k.ev('L.queue[L.i]=L.mix.all.find(x=>x.q.q==="What happens in an exothermic reaction?").q; L.t="c5"; showQ()'));
  await toolbar(page).waitFor();
  await term(page, "gcse-exothermic").press("Enter");
  assert.match(await panel(page).innerText(), /count as help/i);
  await close(page).click();
  await page.locator('#qf input[name="a"][value="0"]').check();
  await page.locator("#act").click();
  assert.match(await lookup(page, "exothermic", "Exothermic"), /surroundings/i);
  await close(page).click();

  await page.goto(base + "/human-biology/#catchup/f170/1.2.1");
  await page.getByRole("button", {name:"Show next step"}).click();
  await page.getByRole("button", {name:"Show next step"}).click();
  await page.getByRole("button", {name:"Try with support"}).click();
  await term(page, "aaq-epithelium").press("Enter");
  assert.match(await panel(page).innerText(), /layer of cells/i);
  assert.equal(await panel(page).getByRole("button", {name:"Show definition with help"}).count(), 0);
  await close(page).click();
  await term(page, "aaq-microvilli").press("Enter");
  assert.match(await panel(page).innerText(), /count as help/i);
  await panel(page).getByRole("button", {name:"Show definition with help"}).click();
  assert.match(await panel(page).innerText(), /surface area/i);
  await close(page).click();
  await page.reload();
  const humanRecord = await page.evaluate(() => JSON.parse(localStorage.getItem("narajos-human-catchup-v1"))["f170/1.2.1"]);
  assert.equal(humanRecord.guided.vocabularyHelp, true);

  await page.goto(base + "/science-catch-up/lesson/?topic=photosynthesis-limits&year=10");
  await term(page, "gcse-photosynthesis").first().press("Enter");
  assert.match(await panel(page).locator(".vocabulary-meaning").innerText(), /plants and algae/i);
  await close(page).click();
  assert.match(await lookup(page, "limiting factor", "Limiting factor"), /restricts the rate/i);
  await close(page).click();
  await page.locator(".school-current-stage").getByRole("button", {name:/^(Check|Resume check)$/}).click();
  await term(page, "gcse-photosynthesis").last().press("Enter");
  assert.match(await panel(page).innerText(), /count as help/i);
  await close(page).click();
  await page.getByRole("button", {name:"Pause check"}).click();
  await page.reload();
  await toolbar(page).click();
  await search(page).fill("photosynthesis");
  assert.equal(await panel(page).getByRole("button", {name:"Photosynthesis",exact:true}).count(), 0,
    "Pausing an unfinished attempt cannot bypass its assessment policy");
  await close(page).click();
  await page.getByRole("button", {name:"Resume check"}).click();
  await toolbar(page).click();
  await search(page).fill("photosynthesis");
  await panel(page).getByRole("button", {name:"Photosynthesis",exact:true}).click();
  assert.match(await panel(page).innerText(), /count as help/i, "Search uses the same target rule");
  await panel(page).getByRole("button", {name:"Show definition with help"}).click();
  await close(page).click();
  await page.reload();
  const stored = await page.evaluate(() => Object.keys(localStorage).filter(key => key.includes("catchup")).map(key => localStorage.getItem(key)).join(" "));
  assert.match(stored, /"helped":true/, "Catch-up assistance persists");
}

async function checkMobile(page) {
  await page.goto(base + "/ks3/lesson/?topic=atoms-and-compounds&guided=1");
  const target = term(page, "ks3-compound").first();
  await target.waitFor();
  await target.scrollIntoViewIfNeeded();
  const scrollBefore = await page.evaluate(() => scrollY);
  await target.tap();
  assert(await panel(page).locator(".vocabulary-excerpt").isVisible());
  assert.match(await panel(page).innerText(), /bonded/i);
  const bounds = await panel(page).boundingBox();
  assert(Math.abs(bounds.y + bounds.height - 844) < 3);
  await capture(page, "ks3-phone");
  await checkPanel(page);
  await close(page).tap();
  assert(Math.abs(await page.evaluate(() => scrollY) - scrollBefore) <= 2);
  await page.setViewportSize({width:320,height:720});
  await page.addStyleTag({content:"html { font-size: 125% !important }"});
  await target.tap();
  assert(await close(page).isVisible());
  assert(await panel(page).evaluate(el => el.scrollWidth <= el.clientWidth + 2));
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2));
  await close(page).tap();
}

async function checkPreference(page) {
  await page.goto(base + "/gcse/?case=preference#lesson-b1-diffusion");
  const progressBefore = await page.evaluate(() => localStorage.getItem("keystone-aqa-trilogy-v1"));
  await toolbar(page).click();
  await more(page).check();
  assert.equal(await page.evaluate(() => localStorage.getItem("keystone-aqa-trilogy-v1")), progressBefore,
    "Changing word help does not change GCSE progress or settings");
  await panel(page).getByRole("button", {name:"Use activity default"}).click();
  await close(page).click();

  await page.goto(base + "/science-catch-up/lesson/?topic=osmosis");
  await toolbar(page).click();
  assert(await more(page).isChecked(), "Catch-up starts with increased support");
  await more(page).uncheck();
  assert.equal(await page.evaluate(key => localStorage.getItem(key), preferenceKey), "selective");
  await page.goto(base + "/ks3/cells/");
  await toolbar(page).click();
  assert.equal(await more(page).isChecked(), false);
  assert.match(await panel(page).innerText(), /Saved preference/);
  await more(page).check();
  await page.reload();
  await toolbar(page).click();
  assert.equal(await more(page).isChecked(), true);
  await close(page).click();
  await page.goto(base + "/alevel/#catchup-a1-monopoly");
  await toolbar(page).click();
  const sharedPreference = panel(page).getByRole("checkbox", {name:"More word help"});
  assert.equal(await sharedPreference.isChecked(), true, "Explicit preference follows the learner across courses");
  await panel(page).getByRole("button", {name:"Use activity default"}).click();
  assert.equal(await page.evaluate(key => localStorage.getItem(key), preferenceKey), null);
}

try {
  const desktop = await newPage({ viewport: { width: 1280, height: 900 } });
  const phone = await newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await checkCourseContexts(desktop);
  await checkAssessment(desktop);
  await checkPreference(desktop);
  await checkMobile(phone);
  assert.deepEqual(errors, [], "No uncaught errors during course navigation and word help");
  console.log("Site vocabulary passed across KS3, GCSE subjects and tiers, Years 9–11 catch-up, all eight AAQ units, assessment protection, preference, accessibility and mobile layout.");
} finally {
  await browser.close();
  server.close();
}

import "./check-f171-pressure-figure.mjs";
import "./check-f170-growth-graph.mjs";
import "./check-f171-measurements-figure.mjs";
// Integrity checks for the step-specific visual mappings. These do not judge
// scientific accuracy or imply that unmapped teaching blocks are covered.
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import vm from "node:vm";
import { ks3StepVisuals } from "../public/assets/ks3-step-visuals.js";
import { gcseStepVisuals } from "../public/assets/gcse-step-visuals.js";
import { moreGcseStepVisuals, gcseOpeningVisuals, gcseHigherVisuals, gcseWorkedVisuals, heatingCurve } from "../public/assets/gcse-more-step-visuals.js";
import { year9 } from "../public/assets/school-catchup-year9.js";
import { gcseCatchup } from "../public/assets/gcse-catchup-data.js";
import { curriculum, motionLessons } from "../public/assets/ks3-lessons.js";

class Element {
  constructor(tag) { this.style = {}; this.tag = tag; this.children = []; this.innerHTML = ""; this.textContent = ""; }
  append(...nodes) { this.children.push(...nodes); }
  setAttribute(name, value) { this[name] = value; }
  addEventListener() {}
  replaceChildren(...nodes) { this.children = nodes; }
  insertRow() { const row = new Element("tr"); this.append(row); return row; }
  createCaption() { const caption = new Element("caption"); this.append(caption); return caption; }
}
globalThis.document = {createElement: tag => new Element(tag)};
function inspectFigure(element) {
  const nodes = [element, ...element.children.flatMap(flatten)];
  const drawings = nodes.filter(node => node.innerHTML?.includes("<svg"));
  assert.ok(drawings.length, "expected a scientific SVG");
  for (const drawing of drawings) assert.match(drawing.innerHTML, /role="img"\s+aria-label="[^\"]{20,}"/);
  assert.ok(nodes.some(node => node.tag === "figcaption" && node.children.some(child => child.textContent)), "expected a caption");
}
function flatten(node) { return [node, ...(node.children || []).flatMap(flatten)]; }
const junior = Object.fromEntries([...curriculum[7], ...curriculum[8], ...motionLessons].filter(x => x.id).map(x => [x.id, x]));
for (const [id, figures] of Object.entries(ks3StepVisuals)) {
  assert.ok(junior[id], `unknown KS3 concept ${id}`);
  figures.forEach((figure, index) => {
    assert.ok(index < junior[id].explain.length, `unknown KS3 explanation ${id}/${index}`);
    inspectFigure(figure());
  });
}
for (const mapping of [gcseStepVisuals, moreGcseStepVisuals]) {
  for (const [id, figures] of Object.entries(mapping)) {
    assert.ok(gcseCatchup[id], `unknown GCSE concept ${id}`);
    for (const [index, figure] of Object.entries(figures)) {
      assert.ok(gcseCatchup[id].steps[index]?.teach, `unknown GCSE teaching step ${id}/${index}`);
      inspectFigure(figure());
    }
  }
}
for (const [id, figure] of Object.entries(gcseOpeningVisuals)) {
  assert.equal(gcseCatchup[id]?.visual?.[1], figure, `${id}: opening figure is not mapped`);
  inspectFigure(figure());
}
for (const [id, figure] of Object.entries(gcseHigherVisuals)) {
  assert.ok(gcseCatchup[id]?.higher, `${id}: Higher Tier explanation is missing`);
  assert.equal(gcseCatchup[id].higherVisual, figure, `${id}: Higher Tier figure is not mapped`);
  inspectFigure(figure());
}
for (const [id, figure] of Object.entries(gcseWorkedVisuals)) {
  assert.equal(typeof gcseCatchup[id]?.steps[0]?.worked?.visual, "function", `${id}: worked figure is not mapped`);
  inspectFigure(figure());
}
inspectFigure(heatingCurve());

let schoolSteps = 0;
for (const [id, lesson] of Object.entries(year9)) for (const step of lesson.steps) {
  if (!step.visual) continue;
  assert.equal(typeof step.visual, "function", id);
  assert.ok(step.visual(), `${id}: renderer must produce a visual`);
  schoolSteps++;
}
let gcseSteps = 0;
for (const [id, lesson] of Object.entries(gcseCatchup)) for (const step of lesson.steps) {
  if (!step.visual) continue;
  assert.ok(step.teach || step.worked, `${id}: visual must be attached to teaching`);
  assert.ok(step.visual(), `${id}: renderer must produce a visual`);
  gcseSteps++;
}

const alevelSource = await readFile(new URL("../public/alevel/catchup-figures.js", import.meta.url), "utf8");
const alevelWindow = {};
vm.runInNewContext(alevelSource, {window: alevelWindow});
const keys = [...alevelSource.matchAll(/^\s*"(a[1-8])\/([^/]+)\/(\d+)":\s*\{/gm)];
assert.ok(keys.length, "expected A-level mappings");
for (const [, topic, id, group] of keys) {
  const html = alevelWindow.ALevelCatchupFigures.render(topic, id, Number(group));
  assert.match(html, /<svg[^>]+role="img"[^>]+aria-label="[^\"]{20,}"/);
  assert.match(html, /<figcaption>[^<]{20,}<\/figcaption>/);
}

const humanWindow = {KeystoneHumanTeaching: {choice: (...args) => ({args}), written: (...args) => ({args})}};
for (const file of ["teaching-f170.js", "f170-cell-teaching-figures.js", "f170-red-cell-model-figures.js", "f170-membrane-teaching-figures.js", "f170-organelle-evidence-figures.js", "f170-muscle-teaching-figures.js", "f170-surfaces-teaching-figures.js", "f170-signals-teaching-figures.js", "f170-microscopy-teaching-figures.js", "f170-mitosis-teaching-figures.js", "f170-meiosis-teaching-figures.js", "f170-oxygen-delivery-figures.js", "f170-demand-teaching-figures.js", "f170-organisation-teaching-figures.js", "f170-circulation-teaching-figures.js", "f170-cirrhosis-teaching-figures.js", "f170-glucose-teaching-figures.js", "f170-diabetes-teaching-figures.js", "f170-reproductive-teaching-figures.js", "f170-hormone-teaching-figures.js", "f170-gram-teaching-figures.js", "f170-growth-teaching-figures.js", "teaching-f171.js", "f171-kidney-lymph-teaching-figures.js", "f171-management-teaching-figures.js", "f171-readings-teaching-figures.js", "f171-measurements-teaching-figures.js", "f171-renal-teaching-figures.js", "teaching-knowledge.js"]) {
  const source = await readFile(new URL("../public/human-biology/" + file, import.meta.url), "utf8");
  vm.runInNewContext(source, {window: humanWindow});
}
let assets = 0;
let photos = 0;
for (const [id, lesson] of Object.entries(humanWindow.KeystoneHumanLessons)) {
  for (const photo of [lesson.explanationPhoto, lesson.explanationPhoto2, ...Object.values(lesson.explainPhotos || {}).flat(), ...Object.values(lesson.modelPhotos || {}).flat()].filter(Boolean)) {
    assert.match(photo.src, /^\/assets\/micrographs\/[a-z0-9-]+\.webp$/, id);
    for (const key of ["alt", "caption", "source", "credit", "licence", "licenceUrl", "changes"]) assert.ok(photo[key], `${id}: ${key} required for the photo`);
    assert.ok(photo.width > 0 && photo.height > 0, `${id}: dimensions required`);
    await access(new URL("../public" + photo.src, import.meta.url));
    photos++;
  }
  for (const visual of [lesson.teachingDiagram, lesson.explanationDiagram, lesson.comparisonDiagram, ...(lesson.comparisonDiagrams || []), ...Object.values(lesson.comparisonFigures || {}).flat(), ...(lesson.explanationDiagrams || []), ...Object.values(lesson.explainDiagrams || {}).flat(), ...Object.values(lesson.afterComparisonDiagrams || {}).flat(), ...Object.values(lesson.modelDiagrams || {}).flat()].filter(Boolean)) {
  assert.match(visual.src, /^\/human-biology\/[a-z0-9-]+\.svg$/, id);
  assert.ok(visual.alt?.length >= 20 && visual.caption?.length >= 20, `${id}: meaningful alternative and caption required`);
  assert.ok(visual.width > 0 && visual.height > 0, `${id}: dimensions required`);
  await access(new URL("../public" + visual.src, import.meta.url));
  assets++;
  }
}
assert.ok(assets, "expected Human Biology teaching diagrams");
// The compact worked graph duplicates the lesson's fictional graph for phone readability.
// Check plotted coordinates against the source data so either cannot silently drift.
const glucoseGraph = humanWindow.KeystoneHumanLessons["f170/3.1.2"].graph;
const glucoseSvg = await readFile(new URL("../public/human-biology/f170-glucose-tolerance-graph.svg", import.meta.url), "utf8");
const glucosePoints = Array.from(glucoseSvg.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="4"\/>/g), match => [+match[1], +match[2]]);
assert.equal(glucosePoints.length, glucoseGraph.values.length, "compact glucose graph point count");
const expectedGlucosePath = glucosePoints.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join("");
assert.ok(glucoseSvg.includes(`d="${expectedGlucosePath}"`), "compact glucose graph line follows data points");
for (let i = 0; i < glucosePoints.length; i++) {
  assert.equal(glucosePoints[i][0], 61 + glucoseGraph.times[i] * 1.4, "compact glucose graph time");
  assert.equal(glucosePoints[i][1], 185 - glucoseGraph.values[i] * 10, "compact glucose graph concentration");
}

// Inspect every explicitly mapped recap visual, including direct original assets.
const companionSource = await readFile(new URL("../public/human-biology/companion.js", import.meta.url), "utf8");
const recapStart = companionSource.indexOf("const labRecap =");
const recapEnd = companionSource.indexOf("function showConcept(", recapStart);
assert.ok(recapStart >= 0 && recapEnd > recapStart, "expected Human recap registry");
const recapWindow = {};
vm.runInNewContext(companionSource.slice(recapStart, recapEnd) + "\nwindow.registry = recapFigureMap;", {window: recapWindow});
const recapData = {KeystoneHumanChallenges: {}, KeystoneHumanKnowledge: {}};
vm.runInNewContext(await readFile(new URL("../public/human-biology/content-f170.js", import.meta.url), "utf8"), {window: recapData});
const notesEnd = companionSource.indexOf("var sectionById={}");
assert.ok(notesEnd > 0, "expected Human recap data");
vm.runInNewContext(companionSource.slice(0, notesEnd) + "window.notes = notes;})();", {window: recapData});
const focusStart = companionSource.indexOf("const focusedLessons={"), focusEnd = companionSource.indexOf("function indexComparisons()", focusStart);
assert.ok(focusStart > 0 && focusEnd > focusStart, "expected Human focused recap data");
vm.runInNewContext(companionSource.slice(focusStart, focusEnd) + "window.focus = focusedLessons;", {window: recapData});
for (const [key, lesson] of Object.entries(humanWindow.KeystoneHumanLessons)) {
  const focused = /^f170\/2\.1\.3\./.test(key) || /^f171\/1\.[23]\.1\./.test(key) || /^f170\/1\.1\.[1345]\./.test(key);
  if (focused && lesson.title && !recapData.focus[key]) recapData.focus[key] = {lines: lesson.explain};
}
let recapMappings = 0;
for (const [route, entries] of Object.entries(recapWindow.registry)) {
  assert.match(route, /^f17[0-7]\/[^/]+\/\d+$/);
  const [unit, id, step] = route.split("/");
  const focus = recapData.focus[unit + "/" + id];
  const section = unit === "f170" ? recapData.KeystoneHumanData.areas.flatMap(area => area.sections).find(item => item.id === id) : null;
  const points = focus?.lines || section?.points || recapData.notes[unit]?.[id]?.lines;
  assert.ok(points && Number(step) < points.length, `${route}: unknown recap line`);
  for (const entry of entries) {
    const field = Array.isArray(entry) ? humanWindow.KeystoneHumanLessons[entry[0]]?.[entry[1]] : entry;
    const item = Array.isArray(entry) && entry.length > 2 ? field?.[entry[2]] : field;
    const visuals = Array.isArray(item) ? item : [item];
    assert.ok(visuals.length && visuals.every(Boolean), `${route}: mapped visual is missing`);
    for (const visual of visuals) {
      assert.match(visual.src, /^\/(human-biology|assets\/micrographs)\/[a-z0-9-]+\.(svg|webp)$/);
      assert.ok(visual.alt?.length >= 20 && visual.caption?.length >= 20, `${route}: alternative and caption required`);
      assert.ok(visual.width > 0 && visual.height > 0, `${route}: dimensions required`);
      if (visual.src.startsWith("/assets/")) for (const key of ["source", "credit", "licence", "licenceUrl", "changes"]) assert.ok(visual[key], `${route}: ${key} required`);
      await access(new URL("../public" + visual.src, import.meta.url));
    }
  }
  recapMappings++;
}
assert.ok(recapMappings, "expected explicitly mapped recap lines");
console.log(`Visual integrity: ${Object.keys(ks3StepVisuals).length} KS3 mappings, ${gcseSteps} GCSE and ${schoolSteps} Year 9 step placements, ${keys.length} A-level figures and ${assets} Human Biology local diagrams and ${photos} sourced teaching photos; ${recapMappings} recap mappings checked.`);

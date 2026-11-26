// Integrity checks for the step-specific visual mappings. These do not judge
// scientific accuracy or imply that unmapped teaching blocks are covered.
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import vm from "node:vm";
import { ks3StepVisuals } from "../public/assets/ks3-step-visuals.js";
import { gcseStepVisuals } from "../public/assets/gcse-step-visuals.js";
import { moreGcseStepVisuals, gcseHigherVisuals, gcseWorkedVisuals, heatingCurve } from "../public/assets/gcse-more-step-visuals.js";
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
for (const [id, figure] of Object.entries(gcseHigherVisuals)) {
  assert.ok(gcseCatchup[id]?.higher, `${id}: Higher Tier explanation is missing`);
  assert.equal(gcseCatchup[id].higherVisual, figure, `${id}: Higher Tier figure is not mapped`);
  inspectFigure(figure());
}
for (const [id, figure] of Object.entries(gcseWorkedVisuals)) {
  assert.equal(gcseCatchup[id]?.steps[0]?.worked?.visual, figure, `${id}: worked figure is not mapped`);
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
for (const file of ["teaching-f170.js", "teaching-f171.js", "teaching-knowledge.js"]) {
  const source = await readFile(new URL("../public/human-biology/" + file, import.meta.url), "utf8");
  vm.runInNewContext(source, {window: humanWindow});
}
let assets = 0;
let photos = 0;
for (const [id, lesson] of Object.entries(humanWindow.KeystoneHumanLessons)) {
  for (const photo of [lesson.explanationPhoto, lesson.explanationPhoto2].filter(Boolean)) {
    assert.match(photo.src, /^\/assets\/micrographs\/[a-z0-9-]+\.webp$/, id);
    for (const key of ["alt", "caption", "source", "credit", "licence", "licenceUrl", "changes"]) assert.ok(photo[key], `${id}: ${key} required for the photo`);
    assert.ok(photo.width > 0 && photo.height > 0, `${id}: dimensions required`);
    await access(new URL("../public" + photo.src, import.meta.url));
    photos++;
  }
  for (const visual of [lesson.teachingDiagram, lesson.explanationDiagram, lesson.comparisonDiagram, ...(lesson.comparisonDiagrams || []), ...(lesson.explanationDiagrams || []), ...Object.values(lesson.modelDiagrams || {})].filter(Boolean)) {
  assert.match(visual.src, /^\/human-biology\/[a-z0-9-]+\.svg$/, id);
  assert.ok(visual.alt?.length >= 20 && visual.caption?.length >= 20, `${id}: meaningful alternative and caption required`);
  assert.ok(visual.width > 0 && visual.height > 0, `${id}: dimensions required`);
  await access(new URL("../public" + visual.src, import.meta.url));
  assets++;
  }
}
assert.ok(assets, "expected Human Biology teaching diagrams");
console.log(`Visual integrity: ${Object.keys(ks3StepVisuals).length} KS3 mappings, ${gcseSteps} GCSE and ${schoolSteps} Year 9 step placements, ${keys.length} A-level figures and ${assets} Human Biology local diagrams and ${photos} sourced teaching photos checked.`);

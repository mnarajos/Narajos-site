// Structural checks for the explicitly authored KS3 visual mappings. These do
// not establish that a figure explains every fact or that it is scientifically correct.
import assert from "node:assert/strict";
import {ks3ExplanationVisuals} from "../public/assets/ks3-step-visuals.js";
import {year9OpeningSupplement} from "../public/assets/school-catchup-visuals.js";
import {year9} from "../public/assets/school-catchup-year9.js";
import {curriculum, motionLessons} from "../public/assets/ks3-lessons.js";
import {ks3Scaffolds, withKS3Scaffolds} from "../public/assets/school-catchup-ks3-scaffolds.js";

class Element {
  constructor(tag) { this.tag=tag; this.children=[]; this.style={}; this.innerHTML=""; this.textContent=""; }
  append(...children) { this.children.push(...children); }
  setAttribute(name, value) { this[name]=value; }
  addEventListener() {}
  replaceChildren(...children) { this.children=children; }
}
globalThis.document={createElement: tag => new Element(tag)};
const flatten = node => [node, ...(node.children || []).flatMap(flatten)];
function checkFigure(root, label) {
  const elements=flatten(root);
  const graphics=elements.filter(element=>element.innerHTML?.includes("<svg"));
  const labelled=elements.filter(element=>element.role === "img" && element["aria-label"]?.length>=20);
  assert.ok(graphics.length || labelled.length, `${label}: expected a diagram`);
  for(const graphic of graphics) assert.match(graphic.innerHTML, /role="img"\s+aria-label="[^"]{20,}"/, `${label}: diagram alternative`);
  assert.ok(elements.some(element=>element.tag==="figcaption" && (element.textContent || element.children.some(child=>child.textContent))), `${label}: missing caption`);
}
const catalogue=Object.fromEntries([...curriculum[7],...curriculum[8],...motionLessons].filter(x=>x.id).map(x=>[x.id,x]));
let explanationCount=0;
for(const [id,figures] of Object.entries(ks3ExplanationVisuals)) for(const [index,render] of Object.entries(figures)) {
  assert.ok(catalogue[id]?.explain?.[index], `${id}/${index}: no corresponding explanation`);
  checkFigure(render(), `${id}/${index}`); explanationCount++;
}
for(const id of ["energy-transfer","gas-exchange"]) checkFigure(year9OpeningSupplement(id), `Year 9 ${id} opening`);
assert.equal(year9OpeningSupplement("unknown"),null);
let workedCount=0;
for(const [id, lesson] of Object.entries(year9)) for(const [index, step] of lesson.steps.entries()) {
  if (!step.worked) continue;
  assert.equal(typeof step.worked.visual,"function",`${id}/${index}: missing worked visual`);
  checkFigure(step.worked.visual(),`Year 9 ${id}/${index}`); workedCount++;
}
// Catalogue figures render through the actual page renderer; the browser
// scaffold check exercises those. Here check their step associations and the
// original SVGs without importing a page module that expects a browser.
let catalogueWorkedCount=0;
const mockVisual = model => {
  assert.ok(model?.reference, "the question visual should use reference mode");
  const figure=new Element("figure"), drawing=new Element("div"), caption=new Element("figcaption");
  drawing.innerHTML='<svg role="img" aria-label="A mocked catalogue diagram with equivalent text"></svg>';
  caption.textContent="The browser check verifies the catalogue figure.";
  figure.append(drawing,caption);return figure;
};
for(const [id, sourceSteps] of Object.entries(ks3Scaffolds)) {
  const steps=withKS3Scaffolds(id, sourceSteps.map(() => ({})), mockVisual);
  for(const [index, source] of sourceSteps.entries()) {
    if (!source.worked) continue;
    assert.equal(typeof steps[index]?.worked?.visual,"function",`${id}/${index}: missing worked visual`);
    checkFigure(steps[index].worked.visual(),`KS3 ${id}/${index}`); catalogueWorkedCount++;
  }
}
console.log(`KS3 visual integrity: ${explanationCount} explanation mappings, 2 opening supplements, ${workedCount} Year 9 and ${catalogueWorkedCount} catalogue worked figures checked.`);

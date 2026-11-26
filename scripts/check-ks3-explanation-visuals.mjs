// Structural checks for the explicitly authored KS3 visual mappings. These do
// not establish that a figure explains every fact or that it is scientifically correct.
import assert from "node:assert/strict";
import {ks3ExplanationVisuals} from "../public/assets/ks3-step-visuals.js";
import {year9OpeningSupplement} from "../public/assets/school-catchup-visuals.js";
import {year9} from "../public/assets/school-catchup-year9.js";
import {curriculum, motionLessons} from "../public/assets/ks3-lessons.js";

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
const workedMappings={"atomic-number":[0],"periodic-table":[0],"energy-transfer":[0,1],"gas-exchange":[0],enzymes:[0],"ionic-conduction":[0],"molecular-melting":[0]};
let workedCount=0;
for(const [id,indices] of Object.entries(workedMappings)) for(const index of indices) {
  const worked=year9[id]?.steps[index]?.worked;
  assert.equal(typeof worked?.visual,"function",`${id}/${index}: missing worked visual`);
  checkFigure(worked.visual(),`Year 9 ${id}/${index}`); workedCount++;
}
console.log(`KS3 visual integrity: ${explanationCount} explanation mappings, 2 opening supplements and ${workedCount} worked figures checked.`);

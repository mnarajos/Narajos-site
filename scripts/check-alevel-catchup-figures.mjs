import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

// Verify the explicitly authored mappings and their accessible figure text.
// This is an integrity check, not a judgment of teaching coverage.
const context = {window: {}};
vm.runInNewContext(readFileSync(new URL("../public/alevel/catchup-figures.js", import.meta.url), "utf8"), context);
const render = context.window.ALevelCatchupFigures.render;
const mapped = [
  ["a1", "enzymes", 1], ["a1", "enzfactors2", 1],
  ["a2", "membrane", 0], ["a2", "diffusion", 0], ["a2", "active", 1],
  ["a2", "euk", 0], ["a2", "prok", 0], ["a3", "lungs", 1], ["a3", "vessels", 1],
  ["a4", "transcription", 0], ["a4", "transcription", 1], ["a4", "translation", 0],
  ["a4", "mutation", 0], ["a4", "mutation", 1]
];
for (const [topic, concept, group] of mapped) {
  const figure = render(topic, concept, group);
  assert.match(figure, /<figure\b/);
  assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
  assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
const immuneContext = {window: {}};
vm.runInNewContext(readFileSync(new URL("../public/alevel/catchup-immunity-figures.js", import.meta.url), "utf8"), immuneContext);
const immuneRender = immuneContext.window.ALevelImmunityFigures.render;
for (const [concept, group] of [["phago", 1], ["humoral", 0], ["humoral", 1], ["humoral", 2]]) {
  const figure = immuneRender("a2", concept, group);
  assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
  assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
const transportContext = {window: {}};
vm.runInNewContext(readFileSync(new URL("../public/alevel/catchup-transport-figures.js", import.meta.url), "utf8"), transportContext);
vm.runInNewContext(readFileSync(new URL("../public/alevel/catchup-transport-details.js", import.meta.url), "utf8"), transportContext);
const transportRender = transportContext.window.ALevelTransportFigures.render;
for (const [concept, group] of [["xylem", 0], ["xylem", 1], ["phloem", 0], ["phloem", 1]]) {
  const figures = transportRender("a3", concept, group);
  assert.match(figures, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
  assert.match(figures, /<figcaption>.{20,}<\/figcaption>/);
  assert(!figures.includes('aria-label="Scrollable science diagram"'), `Plant transport ${concept}/${group} must fit a narrow screen`);
}
assert.equal(render("a1", "enzymes", 0), "");
assert.equal(render("a8", "unknown", 0), "");
console.log(`A-level catch-up figure integrity passed: ${mapped.length + 8} mapped groups.`);

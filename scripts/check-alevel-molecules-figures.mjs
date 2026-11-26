import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import vm from 'node:vm';
const context = {window: {ALevelCatchupFigures: {render: () => ''}}};
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-molecules-figures.js', import.meta.url), 'utf8'), context);
for (const [id, group] of [['monopoly',1],['sugars',0],['sugars',1],['polysac',1],['lipids',0],['lipids',1],['proteins',0],['proteins',1],['nucleic',0],['nucleic',1],['atp',0],['atp',1],['tests',0],['tests',1],['enzfactors',0],['enzfactors2',0],['replication',0],['replication',1],['water',1]]) {
  const figure = context.window.ALevelCatchupFigures.render('a1', id, group);
  assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
  assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
for (const [id, group] of [['euk',1],['fract',0],['fract',1],['cellmed',0],['cellmed',1]]) {
  const figure = context.window.ALevelCatchupFigures.render('a2', id, group);
  assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
  assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
const photo = context.window.ALevelCatchupFigures.render('a2','euk',2);
assert.match(photo, /alt="[^"]{20,}"/);
assert.match(photo, /https:\/\/creativecommons\.org\/licenses\/by\/4\.0\//);
assert(existsSync(new URL('../public/assets/micrographs/drawing-onion-stained.webp', import.meta.url)));
assert.equal(context.window.ALevelCatchupFigures.render('a1','sugars',2), '');
console.log('A-level molecular figure alternatives, captions, mapping and local image checked.');

import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

// Verify the figure is tied to the authored fictional table and linear axis.
// This complements, rather than replaces, inspection of the rendered page.
const script = await readFile(new URL('../public/human-biology/teaching-f171.js', import.meta.url), 'utf8');
const svg = await readFile(new URL('../public/human-biology/f171-pressure-readings.svg', import.meta.url), 'utf8');
const window = {KeystoneHumanLessons: {}, KeystoneHumanTeaching: {choice: () => ({}), written: () => ({})}};
vm.runInNewContext(script, {window});
const rows = window.KeystoneHumanLessons['f171/4.2.2'].table.rows;
const dots = [...svg.matchAll(/<circle data-visit="(\d+)" data-reading="(\d+)" cx="(\d+)" cy="(\d+)"/g)]
  .map(([, visit, reading, x, y]) => ({visit: Number(visit), reading: Number(reading), x: Number(x), y: Number(y)}));
for (const row of rows) {
  const visit = Number(row[0]);
  const expected = Array.from(row).slice(1, 4).filter(value => value !== '—').map(Number).sort((a, b) => a - b);
  const actual = dots.filter(dot => dot.visit === visit).map(dot => dot.reading).sort((a, b) => a - b);
  assert.deepEqual(actual, expected, `Visit ${visit} plotted readings must match the table`);
}
assert.equal(dots.length, 8, 'Missing reading must not become a point');
for (const dot of dots) {
  assert.equal(dot.y, 238 - (dot.reading - 130) * 8, `Reading ${dot.reading} must fit the 130–150 mmHg linear axis`);
  assert(dot.x > 56 && dot.x < 258, 'Dot must fit the plotting area');
}
assert.match(svg, /Visit 3: one reading missing/);
console.log('F171 fictional pressure values, missing observation and plot scale match the teaching table.');

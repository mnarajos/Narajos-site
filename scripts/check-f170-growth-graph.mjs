// Keep the phone-readable graph tied to the authored illustrative dataset.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const source = await readFile(new URL('../public/human-biology/teaching-f170.js', import.meta.url), 'utf8');
const window = {KeystoneHumanTeaching:{choice:()=>({}),written:()=>({})}};
vm.runInNewContext(source, {window});
const expected = window.KeystoneHumanLessons['f170/4.1.4'].graph;
const svg = await readFile(new URL('../public/human-biology/f170-growth-graph.svg', import.meta.url), 'utf8');
const points = [...svg.matchAll(/<circle data-time="(\d+)" data-log="(\d+)" cx="(\d+)" cy="(\d+)"/g)].map(m => m.slice(1).map(Number));
assert.equal(points.length, expected.times.length);
for (let i=0; i<points.length; i++) {
  const [time,value,x,y] = points[i];
  assert.equal(time, expected.times[i], `time ${i}`);
  assert.equal(value, expected.values[i], `value ${i}`);
  assert.equal(x, 56 + time * 29, `x coordinate ${i}`);
  assert.equal(y, 185 - value * 15, `y coordinate ${i}`);
}
const polyline = svg.match(/<polyline points="([^"]+)"/);
assert.ok(polyline, 'plotted line is required');
assert.equal(polyline[1], points.map(([, ,x,y]) => `${x},${y}`).join(' '));
assert.match(svg, /Log₁₀ viable count/);
assert.match(svg, /Time \(intervals\)/);
console.log('F170 growth graph matches authored log values, axes and plotted coordinates.');

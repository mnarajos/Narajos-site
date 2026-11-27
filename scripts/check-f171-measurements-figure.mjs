import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

// The two illustrative exhaled-volume curves must have the properties claimed
// in their teaching caption. Values are model examples, not patient data.
const svg = await readFile(new URL('../public/human-biology/f171-expired-volume-time.svg', import.meta.url), 'utf8');
const paths = [...svg.matchAll(/<path d="(M70 246C[^"]+)" stroke="(?:#32776d|#a76125)"/g)].map(m => m[1]);
assert.equal(paths.length, 2, 'Expected two volume-time curves');
const curves = paths.map(path => {
  const n = [...path.matchAll(/\d+(?:\.\d+)?/g)].map(m => Number(m[0]));
  assert.equal(n.length, 14, 'Expected two cubic Bézier segments');
  const points = Array.from({length: 7}, (_, i) => ({x:n[2*i], y:n[2*i+1]}));
  assert.deepEqual(points[0], {x:70,y:246});
  assert.equal(points[3].x, 130, 'Point after first segment must be at 1 s');
  const slopes = [];
  for (const [a,b] of [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]) {
    assert(points[b].x > points[a].x, 'Control points must move forward in time');
    slopes.push((points[a].y-points[b].y)/(points[b].x-points[a].x));
  }
  // The Bézier slope is a weighted average of control-point slopes when all
  // x differences are positive, so the curve cannot exceed their bounds.
  assert(slopes.every((s,i) => s >= 0 && (i === 0 || s <= slopes[i-1])), 'Flow must peak at the start');
  return {peak:slopes[0] * 60 / 48, firstSecond:(246-points[3].y)/48};
});
assert.equal(curves[0].peak, 2);
assert.equal(curves[1].peak, curves[0].peak);
assert.equal(curves[0].firstSecond, 1.5);
assert.equal(curves[1].firstSecond, 1);
console.log('F171 illustrative volume curves have the same maximum flow and different first-second volumes.');

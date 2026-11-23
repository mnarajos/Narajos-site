import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

export function checkALevelStatistics() {
  const html = readFileSync(new URL("../public/alevel/index.html", import.meta.url), "utf8");
  assert.doesNotMatch(html, /accept the null hypothesis|null hypothesis is accepted|overlap means the difference is not significant/i);
  const generators = html.slice(html.indexOf("GEN.pval=function"), html.indexOf("GEN.hw=function"));
  assert(generators.includes("GEN.sdbar=function"));
  let seed = 18;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
  const GEN = {};
  runInNewContext(generators, {
    GEN, Math: { random },
    pick: values => values[Math.floor(random() * values.length)],
    ri: (min, max) => min + Math.floor(random() * (max - min + 1)),
    r6: x => Number(x.toFixed(6)),
    numQ: (q, a, unit, why) => ({ t: "num", q, a, unit, why }),
  });
  const seen = new Set();
  for (let i = 0; i < 500; i++) {
    const test = GEN.pval(i % 2 === 0);
    const chi = test.q.match(/gives ([\d.]+)\. Its upper critical value .* is ([\d.]+)\./);
    const significant = chi ? +chi[1] > +chi[2] : +test.q.match(/P = ([\d.]+)\./)[1] < 0.05;
    assert.match(test.opts[test.a], significant ? /^Reject/ : /^There is insufficient evidence/);
    if (!significant) assert.match(test.why, /does not establish that the null hypothesis is true/);
    assert.equal(test.fb.length, test.opts.length);
    seen.add((chi ? "chi" : "p") + significant);
    const bars = GEN.sdbar(i % 2 === 0);
    const sets = Array.from(bars.q.matchAll(/(\d+)[^\d±]* ± (\d+)/g), match => [+match[1], +match[2]]);
    assert(sets.length);
    if (bars.t === "num") {
      assert.equal(bars.a, sets[0][0] + (/upper end/.test(bars.q) ? 1 : -1) * sets[0][1]);
      assert(!bars.slip.includes(bars.a));
      seen.add("endpoint");
    } else {
      assert.equal(bars.fb.length, bars.opts.length);
      assert.equal(new Set(bars.opts).size, bars.opts.length);
      const overlap = sets[0][0] + sets[0][1] >= sets[1][0] - sets[1][1];
      if (/Compare the two ranges/.test(bars.q)) {
        assert.equal(bars.opts[bars.a], overlap ? "The ranges overlap" : "The ranges do not overlap");
        seen.add("overlap" + overlap);
      } else {
        assert.match(bars.opts[bars.a], /spread of observations/);
        assert.match(bars.why, /more information than the displayed SD ranges/);
        seen.add("inference");
      }
    }
  }
  assert.equal(seen.size, 8);
  for (const line of html.split("\n").filter(line => /"aqa":"(?:sd|p)"/.test(line) && /^\s+\{"t"/.test(line))) {
    const q = JSON.parse(line.trim().replace(/,$/, ""));
    if (q.opts) assert(q.opts[q.a], q.q);
    if (q.t === "sort") assert(q.items.every(([, answer]) => q.cats[answer]), q.q);
    if (q.t === "two") assert(q.opts2[q.a2], q.q);
    if (q.fb) assert.equal(q.opts.length, q.fb.length, q.q);
  }
  console.log("A-level statistics: 1000 generated questions and fixed inference keys verified.");
}

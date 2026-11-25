import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

export function checkALevelInterpretData() {
  const window = {};
  const source = readFileSync(new URL("../public/alevel/teaching-data.js", import.meta.url), "utf8");
  runInNewContext(source, { window });

  const { evidence, model, tasks } = window.ALevelTeachingFamilies.evidence;
  const [, headers, rows] = evidence;
  assert.match(headers[1], /cumulative O₂ uptake \(µL\)/);
  for (const [start, end, step] of [[1, 2, 1], [2, 3, 2]]) {
    const [startTime, startVolume] = rows[start].map(Number);
    const [endTime, endVolume] = rows[end].map(Number);
    const rate = (endVolume - startVolume) / (endTime - startTime);
    assert.match(model[step], /mean rate/);
    assert(model[step].includes(`${rate} µL min⁻¹`), "Use the change over this interval to calculate the rate");
  }
  assert.match(model[2], /no measurable increase/);
  assert.match(model[2], /below the measurement resolution/);

  const calibration = tasks[0];
  const [, sample, low, lowConcentration, high, highConcentration] = calibration.stimulus
    .match(/absorbance of ([\d.]+)\. The nearest standards read ([\d.]+) at ([\d.]+) mmol dm⁻³ and ([\d.]+) at ([\d.]+) mmol dm⁻³/)
    .map(Number);
  const estimatedConcentration = lowConcentration + (highConcentration - lowConcentration) * (sample - low) / (high - low);
  assert.notEqual(low / lowConcentration, high / highConcentration);
  const reportedConcentration = Number(calibration.options[calibration.answer].match(/estimate ([\d.]+) mmol dm⁻³/)[1]);
  assert(Math.abs(reportedConcentration - estimatedConcentration) < 1e-9);
  assert.match(calibration.feedback[2], /assumes the line passes through the origin/);

  const significance = tasks[2];
  assert.match(significance.stimulus, /null hypothesis is that the treatments produce the same mean leaf growth/);
  assert.match(significance.options[significance.answer], /insufficient to conclude that mean leaf growth differs/);
  assert.match(significance.why, /0\.18 is greater than 0\.05/);
  assert.match(significance.why, /A real difference may still be consistent/);
  assert.match(significance.feedback[1], /If the null hypothesis and test assumptions hold/);

  const river = tasks[3];
  const [[, upstreamTemp, upstreamOxygen, upstreamCount], [, downstreamTemp, downstreamOxygen, downstreamCount]] = river.evidence[2];
  assert.equal(river.kind, "writing");
  assert(river.points[0].includes(`${Number(downstreamTemp) - Number(upstreamTemp)} °C warmer on average`));
  assert(river.points[0].includes(`${downstreamCount} larvae per sample compared with ${upstreamCount} upstream`));
  assert(river.points[1].includes(`${downstreamOxygen} compared with ${upstreamOxygen} mg L⁻¹`));
  assert.match(river.points[1], /temperature or from other site conditions/);
  assert.match(river.points[2], /cannot isolate a direct effect of temperature/);
  assert.match(river.points[2], /independently of oxygen/);

  console.log("A-level Interpret data: rate estimates, calibration, statistical inference and limits on causal claims verified.");
}

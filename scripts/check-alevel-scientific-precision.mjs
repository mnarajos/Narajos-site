import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

export function checkALevelScientificPrecision() {
  const window = {};
  const source = new URL("../public/alevel/teaching-data.js", import.meta.url);
  runInNewContext(readFileSync(source, "utf8"), { window });
  const { practical, precision, countercurrent, causal, mechanisms } = window.ALevelTeachingFamilies;

  // An absorbance threshold represents the same product amount only with
  // comparable calibration and volumes. An endpoint amount is not an initial rate.
  const endpoint = practical.tasks[0];
  assert.match(endpoint.stimulus, /equal volume/i);
  assert.match(endpoint.stimulus, /same calibration curve/i);
  assert.match(endpoint.options[endpoint.answer], /when .* reaches the same absorbance/i);
  assert.match(practical.model.join(" "), /calibration for each solvent/i);
  assert.match(practical.model.join(" "), /equal solution volumes/i);
  assert.match(practical.model.join(" "), /initial gradient of pigment amount against time/i);

  // Product accumulation at one time point supports an endpoint comparison.
  // Without the stated controls it would not support the same causal claim.
  const inhibitor = causal.tasks[10];
  assert.match(inhibitor.stimulus, /vary only .* inhibitor concentration/i);
  assert.match(inhibitor.stimulus, /start without product.*product is stable/i);
  assert.match(inhibitor.options[inhibitor.answer], /less product.*formed by 30 s/i);
  assert.match(inhibitor.why, /one endpoint per reaction cannot show how its rate changed/i);

  // Keep the gradients clear in the model and in the premise of each question.
  assert.match(precision.model[0], /inside is negative relative to the outside/i);
  assert.match(precision.model[0], /sodium ion concentration is higher outside/i);
  assert.match(countercurrent.model.join(" "), /higher to lower oxygen partial pressure/i);
  assert.match(countercurrent.model.join(" "), /do not count oxygen bound to haemoglobin/i);
  const collectingDuct = mechanisms.tasks[3];
  assert.match(collectingDuct.stimulus, /tissue fluid has a lower water potential/i);
  assert.match(collectingDuct.stimulus, /difference is the same/i);
  assert.match(collectingDuct.options[collectingDuct.answer], /faster net osmosis out of the duct/i);

  console.log("A-level scientific precision: measurement, inference and gradient safeguards verified.");
}

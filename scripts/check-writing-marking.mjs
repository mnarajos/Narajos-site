import assert from "node:assert/strict";
import { reviewWriting } from "../public/assets/writing-marking.js";

const checks = [
  ["potato", "short", "The potato gained 7% in dilute solution and lost 9% in concentrated solution.", ["credited", "credited"]],
  ["potato", "short", "There was a loss of 9 per cent in concentrated solution, whereas the potato was 7% heavier in the dilute solution.", ["credited", "credited"]],
  ["potato", "short", "Dilute solution: +7.0%, concentrated solution: −9%.", ["credited", "credited"]],
  ["potato", "short", "In concentrated solution the potato lost 9%.", ["compare", "credited"]],
  ["potato", "short", "Dilute: −9% and concentrated: +7%.", ["revise", "revise"]],
  ["potato", "short", "Dilute: +17% and concentrated: −19%.", ["revise", "revise"]],
  ["potato", "short", "The dilute sample did not gain 7% and the concentrated sample did not lose 9%.", ["compare", "compare"]],
  ["potato", "short", "The dilute sample increased by −7% and the concentrated sample decreased by +9%.", ["compare", "compare"]],
  ["potato", "short", "The dilute sample gained 7% but the dilute sample lost 9%.", ["revise", "compare"]],
  ["potato", "transfer", "The potato gained 5% in dilute solution and lost 6% in concentrated solution.", ["credited", "credited"]],
  ["potato", "transfer", "The potato gained 7% in dilute solution and lost 9% in concentrated solution.", ["revise", "revise"]],
  ["potato", "reason", "The potato gained mass because water moved into the cells by osmosis.", ["credited"]],
  ["potato", "reason", "Net movement of water into the potato cells made the sample gain mass.", ["credited"]],
  ["potato", "reason", "The potato gained mass because more water moved into the cells than out of them.", ["credited"]],
  ["potato", "reason", "Water entered the cells by osmosis, causing a mass gain.", ["credited"]],
  ["potato", "reason", "Water entered the cells because the potato gained mass.", ["compare"]],
  ["potato", "reason", "The sample gained mass because water moved out of the potato cells.", ["revise"]],
  ["potato", "reason", "The potato gained mass because water moved into the dilute solution from its cells.", ["revise"]],
  ["potato", "reason", "The potato gained mass because water moved across the partially permeable membrane by osmosis into its cells.", ["credited"]],

  ["potato", "reason", "The sample gained mass because water did not enter the cells.", ["compare"]],
  ["potato", "reason", "Water, into the cells, went somewhere. The sample gained mass.", ["compare"]],
  ["potato", "paragraph", "The potato gained 7% in dilute solution because water moved into its cells. It lost 9% in concentrated solution because water moved out of its cells.", ["credited", "credited", "credited", "credited"]],
  ["dye", "short", "The dye spread further in the warm water because its particles moved faster on average.", ["credited"]],
  ["dye", "short", "Dye molecules moved more quickly in warmer water, so the dye diffused further in the same time.", ["credited"]],
  ["dye", "short", "The dye spread further in warm water because the particles did not move faster.", ["compare"]],
  ["dye", "short", "The dye spread further in warm water because the particles moved faster in cool water.", ["revise"]],
  ["dye", "short", "The dye spread further in warm water because there were more dye particles.", ["revise"]],
  ["dye", "short", "The dye spread much faster because particles were moving.", ["compare"]],
  ["potato", "short", "In dilute solution the sugar concentration increased by 7%, whereas in concentrated solution the sugar concentration decreased by 9%.", ["compare", "compare"]],
  ["potato", "short", "The dilute solution itself gained 7% and the concentrated solution itself lost 9%.", ["compare", "compare"]],
  ["dye", "short", "The dye spread further in the warm water because the water particles moved faster.", ["compare"]],
  ["dye", "short", "The dye spread further in the warm water because the dye molecules had higher average speeds.", ["credited"]],
  ["dye", "transfer", "The fragrance spread further through the warm air because the fragrance particles moved faster on average.", ["credited"]],
];

for (const [task, kind, answer, expected] of checks) {
  const actual = reviewWriting(task, kind, answer).map(({ state }) => state);
  assert.deepEqual(actual, expected, answer);
}
console.log("Writing marking passed " + checks.length + " cases");

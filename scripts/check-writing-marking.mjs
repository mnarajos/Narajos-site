import assert from "node:assert/strict";
import { reviewWriting } from "../public/assets/writing-marking.js";

const checks = [
  ["potato","short","In dilute solution the potato gained 7%. In dilute solution the potato did not gain 7%.",["revise","compare"]],
  ["potato","reason","As water entered the cells, the potato became heavier.",["detected"]],
  ["potato","reason","The potato gained mass because water moved into the cells. Water did not enter the cells.",["revise"]],
  ["dye","short","The dye spread further because its particles moved faster. Its particles did not move faster.",["revise"]],
  ["insulation","short","The bare can cooled by 13 °C. The bare can did not cool by 13 °C.",["revise","compare"]],
  ["insulation","short","The bare can was filled by 13 °C. The felt-wrapped can heated by 7 °C.",["compare","compare"]],
  ["potato","paragraph","The potato gained 7% in dilute solution because water left its cells. The potato lost 9% in concentrated solution because water entered its cells.",["matched","matched","revise","revise"]],
  ["insulation", "short", "The bare can cooled by 13 °C, while the felt-wrapped can cooled by 7 °C.", ["matched", "matched"]],
  ["insulation", "short", "The bare can cooled to 13 °C, while the felt-wrapped can cooled by 7 °F.", ["compare", "compare"]],
  ["potato", "short", "The potato gained 7% in dilute solution and lost 9% in concentrated solution.", ["matched", "matched"]],
  ["potato", "short", "There was a loss of 9 per cent in concentrated solution, whereas the potato was 7% heavier in the dilute solution.", ["matched", "matched"]],
  ["potato", "short", "Dilute solution: +7.0%, concentrated solution: −9%.", ["matched", "matched"]],
  ["potato", "short", "In concentrated solution the potato lost 9%.", ["compare", "matched"]],
  ["potato", "short", "Dilute: −9% and concentrated: +7%.", ["revise", "revise"]],
  ["potato", "short", "Dilute: +17% and concentrated: −19%.", ["revise", "revise"]],
  ["potato", "short", "The dilute sample did not gain 7% and the concentrated sample did not lose 9%.", ["compare", "compare"]],
  ["potato", "short", "The dilute sample increased by −7% and the concentrated sample decreased by +9%.", ["compare", "compare"]],
  ["potato", "short", "The dilute sample gained 7% but the dilute sample lost 9%.", ["revise", "compare"]],
  ["potato", "transfer", "The potato gained 5% in dilute solution and lost 6% in concentrated solution.", ["matched", "matched"]],
  ["potato", "transfer", "The potato gained 7% in dilute solution and lost 9% in concentrated solution.", ["revise", "revise"]],
  ["potato", "reason", "The potato gained mass because water moved into the cells by osmosis.", ["detected"]],
  ["potato", "reason", "Net movement of water into the potato cells made the sample gain mass.", ["detected"]],
  ["potato", "reason", "The potato gained mass because more water moved into the cells than out of them.", ["detected"]],
  ["potato", "reason", "Water entered the cells by osmosis, causing a mass gain.", ["detected"]],
  ["potato", "reason", "Water entered the cells because the potato gained mass.", ["compare"]],
  ["potato", "reason", "The sample gained mass because water moved out of the potato cells.", ["revise"]],
  ["potato", "reason", "The potato gained mass because water moved into the dilute solution from its cells.", ["revise"]],
  ["potato", "reason", "The potato gained mass because water moved across the partially permeable membrane by osmosis into its cells.", ["detected"]],

  ["potato", "reason", "The sample gained mass because water did not enter the cells.", ["compare"]],
  ["potato", "reason", "Water, into the cells, went somewhere. The sample gained mass.", ["compare"]],
  ["potato", "paragraph", "The potato gained 7% in dilute solution because water moved into its cells. It lost 9% in concentrated solution because water moved out of its cells.", ["matched", "matched", "detected", "detected"]],
  ["dye", "short", "The dye spread further in the warm water because its particles moved faster on average.", ["detected"]],
  ["dye", "short", "Dye molecules moved more quickly in warmer water, so the dye diffused further in the same time.", ["detected"]],
  ["dye", "short", "The dye spread further in warm water because the particles did not move faster.", ["compare"]],
  ["dye", "short", "The dye spread further in warm water because the particles moved faster in cool water.", ["revise"]],
  ["dye", "short", "The dye spread further in warm water because there were more dye particles.", ["revise"]],
  ["dye", "short", "The dye spread much faster because particles were moving.", ["compare"]],
  ["potato", "short", "In dilute solution the sugar concentration increased by 7%, whereas in concentrated solution the sugar concentration decreased by 9%.", ["compare", "compare"]],
  ["potato", "short", "The dilute solution itself gained 7% and the concentrated solution itself lost 9%.", ["compare", "compare"]],
  ["dye", "short", "The dye spread further in the warm water because the water particles moved faster.", ["compare"]],
  ["dye", "short", "The dye spread further in the warm water because the dye molecules had higher average speeds.", ["detected"]],
  ["dye", "transfer", "The fragrance spread further through the warm air because the fragrance particles moved faster on average.", ["detected"]],
];

for (const [task, kind, answer, expected] of checks) {
  const actual = reviewWriting(task, kind, answer).map(({ state }) => state);
  assert.deepEqual(actual, expected, answer);
}
assert.equal(reviewWriting("dye", "short", "The dye spread further because its particles moved faster.")[0].kind, "reasoning");
assert.equal(reviewWriting("potato", "short", "Dilute solution: +7%.")[0].kind, "data");
console.log("Writing checks passed " + checks.length + " cases");

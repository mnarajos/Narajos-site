import { question as q } from "./school-catchup-journey.js";
import { arrow, diagram, ink, rust, teal, text, blue, picture, compare } from "./catchup-models.js";

const worked = (title, ...lines) => ({title, lines});
const bars = (caption, ...values) => ({type: "bars", caption, max: 10, bars: values});
const molecules = (label, groups) => ({type: "molecules", caption: "Joined circles represent bonded atoms", panels: [{label, groups}]});

export const ks3Scaffolds = {
  "atoms-and-compounds": [
    {worked: worked("Read Sample A", "Read the letters: every atom is type X.",
      "Each group has two bonded X atoms. All the groups are alike, so there is one substance.",
      "One type of atom makes it an element, even when the atoms are bonded."), diagram: molecules("Sample A", ["aa", "aa", "aa"])},
    {...q("How should you classify Sample B?", "One compound", "Every group contains a bonded X and Y. The groups are identical, so there is one substance.",
      ["One element", "Each pair contains two types of atom. Read both letters."],
      ["A mixture", "The atoms have different letters, but all the bonded groups are the same."]),
      guide: "Read the letters in one pair. Then compare it with the other pairs.", diagram: molecules("Sample B", ["ab", "ab", "ab"])},
    {...q("How should you classify Sample D?", "A mixture of an element and a compound", "X–X is an element and X–Y–Y is a compound. Both substances are present.",
      ["One compound", "Some groups contain only X, while other groups contain bonded X and Y."],
      ["One element", "There are two types of atom and more than one type of bonded group."]),
      diagram: molecules("Sample D", ["aa", "abb", "aa", "abb"]), clue: "Compare a whole group with its neighbour.", hint: "X–X and X–Y–Y represent different substances."}
  ],
  forces: [
    {worked: worked("Read the arrows on the cyclist", "The left arrow is 40 N backwards. The right arrow is 40 N forwards.",
      "Opposite forces subtract: 40 N − 40 N = 0 N.", "The cyclist is already moving. With zero resultant force, they continue at the same speed in a straight line.")},
    {guide: "Subtract the smaller force from the larger one. Compare the direction of the larger arrow with the cyclist’s motion.",
      worked: worked("When forces are unequal", "If 35 N acts forwards and 25 N acts backwards, the resultant is 10 N forwards.",
        "The resultant is in the direction of motion, so the cyclist speeds up."),
      diagram: {type: "forces", caption: "Horizontal forces on the moving cyclist", left: "40 N backwards", right: "20 N forwards"}},
    {clue: "Compare the sizes of the forces before deciding what friction does to the motion.", hint: "Subtract 30 N from 70 N. The resultant points towards the larger force."}
  ],
  "energy-transfers": [
    {worked: worked("Account for the 10 J input", "The job is to light the room. Find the light bar: 3 J is useful for this job.",
      "The heating bar accounts for the other 7 J. This energy spreads to the surroundings.", "Add the two bars: 3 J + 7 J = 10 J. The output total matches the input."),
      diagram: bars("First lamp · 10 J in", ["By light", 3, "J"], ["By heating", 7, "J"])},
    {...q("Both lamps receive 10 J. Which is more useful for lighting the room?", "Lamp B", "Both inputs are equal and B transfers more energy by light.",
      ["Lamp A", "A transfers more energy by heating, but the purpose here is lighting."],
      ["Both are equally useful", "The total inputs are equal. Compare the amount transferred by light."]),
      guide: "Compare only the transfer that helps with the job of lighting the room.",
      diagram: bars("Energy transferred by two lamps", ["A · light", 3, "J"], ["A · heating", 7, "J"], ["B · light", 5, "J"], ["B · heating", 5, "J"])},
    {clue: "Think about the useful transfer (moving air) and look for other effects you can notice.", hint: "The fan gets warmer and you can hear it."}
  ],
  "the-body": [
    {worked: {...worked("Follow oxygen from a breath to a muscle", "At the lung, oxygen diffuses from the air sac into nearby blood.",
      "The heart pumps the blood through vessels to a muscle. This is circulation.",
      "At the muscle, oxygen diffuses out of the blood and into muscle cells."), visual: oxygenRoute}},
    {guide: "Find the long middle leg of the journey. Which part moves oxygen around the body?",
      reference: {label: "Oxygen’s route", render: () => oxygenRoute(false)}},
    {clue: "Blood already brings oxygen to the muscle. Think about what lets it cross the short gap into a cell.", hint: "Oxygen moves down its concentration gradient."}
  ]
};

function oxygenRoute(processes = true) {
  return picture("From the air sacs to muscle cells", diagram(processes
    ? "Oxygen diffuses from an air sac into blood. Circulation carries it to the muscle. Oxygen diffuses from the blood into a muscle cell."
    : "Arrows follow oxygen from an air sac to nearby lung capillary blood, then to muscle capillary blood, then into a muscle cell.", `
    <rect x="17" y="10" width="177" height="31" rx="8" fill="#deeff3" stroke="${teal}"/>
    <rect x="17" y="68" width="177" height="31" rx="8" fill="#f7e7e2" stroke="${rust}"/>
    <rect x="17" y="126" width="177" height="31" rx="8" fill="#f7e7e2" stroke="${rust}"/>
    <rect x="17" y="184" width="177" height="31" rx="8" fill="#e4eee4" stroke="${teal}"/>
    ${text(105,31,"Air sac in lung")}${text(105,89,"Lung capillary blood")}${text(105,147,"Muscle capillary blood")}${text(105,205,"Muscle cell")}
    ${arrow(105,41,105,67,blue)}${arrow(105,99,105,125,rust)}${arrow(105,157,105,183,blue)}
    ${processes ? text(126,59,"Diffusion",blue,15,"start")+text(126,117,"Circulation via the heart",rust,15,"start")+text(126,175,"Diffusion",blue,15,"start") : ""}`, 320,225));
}

export function withKS3Scaffolds(id, steps, renderVisual) {
  return steps.map((step, index) => {
    const addition = ks3Scaffolds[id]?.[index];
    if (!addition) return step;
    const {diagram: figure, ...attributes} = addition;
    return {...step, ...attributes, ...(figure ? {reference: {label: "Question diagram", render: () => renderVisual({...figure, reference: true})}} : {})};
  });
}

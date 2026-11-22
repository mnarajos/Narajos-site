import { question as q } from "./school-catchup-journey.js";
import { arrow, diagram, ink, rust, teal, text, blue, picture, line } from "./catchup-models.js";

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
  ],
  "separating-techniques": [
    {worked: {...worked("Recover salt and sand", "Stir in water. The salt dissolves and the sand stays solid.",
      "Filter. The sand stays on the paper as the residue. The salt solution passes through as the filtrate.",
      "Evaporate some water from the filtrate. As the solution becomes concentrated, salt can form crystals."),
      visual: () => filterDiagram(true)},
      reference: {label: "Filtration apparatus", render: filterDiagram}},
    {...q("Water is added to a mixture of chalk and salt. What collects below the filter paper?", "Salt solution",
      "Dissolved salt passes through with the water. Insoluble chalk stays on the paper.",
      ["Only water", "The paper catches solid particles. Dissolved salt passes through with the water."],
      ["Chalk and water", "Chalk stays solid. The filter paper traps it as the residue."]),
      guide: "Chalk does not dissolve in water. Use the diagram to follow the liquid and the solid separately.",
      reference: {label: "Filtration apparatus", render: filterDiagram}},
    {clue: "Start by finding a difference between sand and sugar.", hint: "Sugar dissolves in water. Follow the liquid that passes through the filter."}
  ],
  "balanced-moments": [
    {worked: worked("Compare two turning effects", "Moment = force × perpendicular distance from the pivot. For these downward forces on a level seesaw, use the horizontal distances.",
      "A 10 N weight 2 m to the left gives 10 × 2 = 20 N m anticlockwise.",
      "A 10 N weight 3 m to the right gives 10 × 3 = 30 N m clockwise. The right side drops because its moment is larger.")},
    {...q("A 12 N weight is 1 m to the left. A 6 N weight hangs to the right. Where does it balance?", "2 m from the pivot",
      "12 × 1 = 12 N m anticlockwise. A 6 N weight 2 m away gives 12 N m clockwise.",
      ["1 m from the pivot", "At 1 m the 6 N weight gives 6 N m. It needs to match 12 N m."],
      ["6 m from the pivot", "6 N is the right-hand force. Work out the distance needed to reach 12 N m."]),
      guide: "The left moment is 12 N m. Use 6 N × distance = 12 N m to find the missing distance.",
      reference: {label: "Seesaw and measurements", render: () => seesaw("12 N", "1 m", "6 N", "? m")}},
    {clue: "Calculate a moment for each side separately.", hint: "Compare 40 × 1 with 20 × 2. Then check their directions.",
      reference: {label: "Seesaw and measurements", render: () => seesaw("40 N", "1 m", "20 N", "2 m")}}
  ],
  metals: [
    {worked: {...worked("Build a reactivity order", "Zinc displaces iron. Put zinc above iron.",
      "Iron displaces copper. Put copper below iron.", "Combine the two comparisons with iron in the middle."), visual: reactivityLadder}},
    {...q("Metal P displaces copper and iron displaces P. Which comparison fills the gap between iron and copper?", "Iron is more reactive than P, and P is more reactive than copper.",
      "The metal that displaces another one is more reactive in this test.",
      ["P is more reactive than iron and copper.", "Iron displaces P, so iron goes above P."],
      ["P is less reactive than copper and iron.", "P displaces copper, so P goes above copper."]),
      guide: "Place the displacing metal above the one it replaces. Use P in both comparisons."},
    {...q("Metal Y displaces X. Metal Z displaces Y. Put them in order from most to least reactive.", "Z, Y, X",
      "Z displaces Y, so Z is above Y. Y displaces X, so X goes last.",
      ["X, Y, Z", "This puts each displaced metal above the metal that displaces it."],
      ["Y, X, Z", "Y goes above X, but Z displaces Y and must go above it."]),
      clue: "Start with one pair. Use Y to connect both comparisons.", hint: "The first result puts Y above X. The second puts Z above Y."}
  ],
  "work-done": [
    {worked: worked("Find the work done on Cart A", "The 10 N push acts along the 2 m movement.", "Work done = force × distance, so 10 N × 2 m = 20 J."),
      guide: "Use the same method with the distance for Cart B.", diagram: {...bars("Both carts are pushed with 10 N", ["Cart A", 2, "m"], ["Cart B", 4, "m"]), max: 4}}
  ],
  electricity: [
    {diagram: {type: "circuits", caption: "Circuit A and Circuit B before changing either switch"},
      clue: "Start at one terminal of the cell. Trace the wire through the lamp and switch to the other terminal.",
      hint: "A switch drawn with separated contacts leaves a gap."},
    {guide: "Trace an imaginary path from the cell. A single gap breaks the whole path."}
  ],
  reproduction: [
    {image: ["/assets/ks3-diagrams/flower.svg", "Flower cross-section. The anther is to the left of the central stigma. The ovule is lower down, inside the ovary."]},
    {guide: "Look for a process that happens after the male and female sex cells can meet."}
  ],
  "journey-speed": [
    {guide: "Divide distance by time to find the distance covered in one second."},
    {},
    {clue: "Compare how far each pupil travels in one second.", hint: "Calculate 20 ÷ 4 for P, and 20 ÷ 5 for Q.",
      diagram: {caption: "Readings from two straight distance–time lines", headers: ["Pupil", "Distance", "Time"], rows: [["P", "20 m", "4 s"], ["Q", "20 m", "5 s"]]}}
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

function filterDiagram(workedExample = false) {
  if (workedExample === true) {
    const image = document.createElement("img");
    image.src = "/assets/ks3-diagrams/filtration.svg";
    image.alt = "Sand stays on the filter paper. Salt solution passes through the funnel into the beaker.";
    image.className = "school-question-diagram";
    return image;
  }
  return picture("Follow the mixture through the apparatus", diagram(
    "A filter-paper cone sits inside a funnel. An arrow points down from the funnel into the collecting beaker.", `
    <path d="M82 31H226L170 100V122H138V100Z" fill="#dceeea" stroke="${teal}" stroke-width="2.5"/>
    <path d="M96 41H212L154 93Z" fill="#fcf2df" stroke="${rust}" stroke-width="2"/>
    <path d="M107 118V169Q107 177 115 177H193Q201 177 201 169V118" fill="none" stroke="${ink}" stroke-width="2.5"/>
    ${arrow(154,99,154,161,blue)}${text(75,20,"Filter paper",rust)}${line(89,23,120,43,rust)}
    ${text(262,79,"Funnel",teal)}${line(234,77,195,67,teal)}
    ${text(245,155,"Beaker")}${line(218,151,203,151)}`,320,184));
}

function seesaw(leftForce, leftDistance, rightForce, rightDistance) {
  return picture("Downward forces on a seesaw", diagram(`${leftForce} acts down on the left at ${leftDistance}. ${rightForce} acts down on the right at ${rightDistance} from the pivot.`, `
    ${line(28,83,292,83,ink,4)}<path d="M160 84L146 110H174Z" fill="#c8e0d9" stroke="${teal}" stroke-width="2"/>
    ${arrow(57,41,57,78,blue,3)}${arrow(263,41,263,78,rust,3)}
    ${text(57,31,leftForce,blue)}${text(263,31,rightForce,rust)}
    ${line(57,98,133,98)}${line(186,98,263,98)}
    ${text(95,120,leftDistance)}${text(225,120,rightDistance)}${text(160,143,"Pivot",teal)}`,320,153));
}

function reactivityLadder() {
  return picture("More reactive metals go higher", diagram("From most to least reactive in this comparison: zinc, iron, copper.", `
    ${arrow(60,142,60,20,teal,3)}${text(37,164,"More reactive",teal,13,"start")}
    ${["Zinc", "Iron", "Copper"].map((metal,index)=>`<rect x="105" y="${11+47*index}" width="141" height="37" rx="6" fill="#e8f2ed" stroke="${teal}"/>${text(175,35+47*index,metal)}`).join("")}`,320,172));
}

export function withKS3Scaffolds(id, steps, renderVisual) {
  return steps.map((step, index) => {
    const addition = ks3Scaffolds[id]?.[index];
    if (!addition) return step;
    const {diagram: figure, ...attributes} = addition;
    return {...step, ...attributes, ...(figure ? {reference: {label: "Question diagram", render: () => renderVisual({...figure, reference: true})}} : {})};
  });
}

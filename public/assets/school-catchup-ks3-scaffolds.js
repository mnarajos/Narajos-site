import { question as q } from "./school-catchup-journey.js";
import { arrow, diagram, ink, rust, teal, text, blue, picture, line, circle, node } from "./catchup-models.js";
import { cyclist, ks3CatchupModel } from "./ks3-catchup-models.js";

const worked = (title, ...lines) => ({title, lines});
const bars = (caption, ...values) => ({type: "bars", caption, max: 10, bars: values});
const molecules = (label, groups) => ({type: "molecules", caption: "Joined circles represent bonded atoms", panels: [{label, groups}]});

export const ks3Scaffolds = {
  cells: [
    {image: ["/assets/ks3-diagrams/palisade-cell.svg", "Leaf cell with a thick outer boundary and a thin line just inside it. The labelled diagram shows a nucleus, chloroplasts and other structures."]},
    {...q("Which visible feature in this micrograph is the best evidence that it shows leaf tissue rather than cheek tissue?",
      "Small green structures inside the cells", "The green structures are chloroplasts. Cheek cells do not contain chloroplasts.",
      ["Straight-looking cell edges", "Some animal cells have straight-looking edges. Look for a structure inside the cell."],
      ["The cells lie next to one another", "Cells are grouped together in both kinds of tissue."]),
      guide: "Look inside a complete cell. Think about a structure that helps a leaf use light.",
      image: ["/assets/micrographs/elodea-leaf.webp", "Light micrograph showing many small green oval bodies inside thin cell boundaries."]},
    {clue: "Separate the features you can see from the ones you cannot identify.", hint: "Both animal and plant cells can have nuclei and straight-looking edges."}
  ],
  particles: [
    {},
    {guide: "The syringe is sealed and the temperature stays the same. Track what changes about the space between the walls.",
      reference: {label: "Gas particles before and after compression", render: compressedGas}},
    {...q("The same gas is in a sealed piston. The piston moves out and the gas keeps the same temperature. What happens to the pressure?", "It falls because wall collisions become less frequent.",
      "The same particles move at the same average speed in a larger volume. They reach the walls less often.",
      ["It rises because the gas has more room to move.", "With more space between the walls, particles travel farther before reaching a wall."],
      ["It stays the same because the temperature is fixed.", "Average speed stays the same, but changing the volume changes the rate of wall collisions."]),
      clue: "The particles still have the same average speed. What has changed about their journeys between walls?",
      hint: "The walls are farther apart when the piston moves out."}
  ],
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
      "Opposite forces subtract: 40 N − 40 N = 0 N.", "The cyclist is already moving. With zero resultant force, they continue at the same speed in a straight line."),
      reference: {label: "Force diagram", render: () => cyclist(false, {showExplanation: false})}},
    {guide: "Subtract the smaller force from the larger one. Compare the direction of the larger arrow with the cyclist’s motion.",
      worked: worked("When forces are unequal", "If 35 N acts forwards and 25 N acts backwards, the resultant is 10 N forwards.",
        "The resultant is in the direction of motion, so the cyclist speeds up."),
      reference: {label: "Force diagram", render: () => cyclist(true, {showExplanation: false})}},
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
    <rect x="20" y="10" width="240" height="38" rx="8" fill="#deeff3" stroke="${teal}"/>
    <rect x="20" y="100" width="240" height="38" rx="8" fill="#f7e7e2" stroke="${rust}"/>
    <rect x="20" y="206" width="240" height="38" rx="8" fill="#f7e7e2" stroke="${rust}"/>
    <rect x="20" y="296" width="240" height="38" rx="8" fill="#e4eee4" stroke="${teal}"/>
    ${text(140,35,"Air sac in lung",ink,20)}${text(140,125,"Lung capillary blood",ink,20)}
    ${text(140,231,"Muscle capillary blood",ink,20)}${text(140,321,"Muscle cell",ink,20)}
    ${arrow(65,48,65,99,blue)}${arrow(65,138,65,205,rust)}${arrow(65,244,65,295,blue)}
    ${processes ? text(85,78,"Diffusion",blue,19,"start")+text(85,164,"Circulation via",rust,19,"start")+text(85,189,"the heart",rust,19,"start")+text(85,274,"Diffusion",blue,19,"start") : ""}`, 280,345));
}

function compressedGas() {
  const box = (x, width) => `<rect x="${x}" y="26" width="${width}" height="77" rx="4" fill="#e3f1f4" stroke="${teal}" stroke-width="2"/>` +
    [[.19,39],[.64,44],[.32,57],[.86,68],[.23,82],[.72,87]].map(([fraction,y]) => circle(x+width*fraction,y,3.5,"#b7cee5",blue)).join("");
  return picture("The same gas at the same temperature", diagram("Two containers contain six equally sized gas particles each. The right container has less space between its walls.", `
    ${box(10,129)}${box(214,96)}${arrow(154,64,198,64,ink)}${text(75,123,"Before")}${text(262,123,"After")}`,320,134));
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
  const leftNumber = Number.parseFloat(leftDistance), rightNumber = Number.parseFloat(rightDistance);
  const known = Number.isFinite(leftNumber) && Number.isFinite(rightNumber);
  const scale = known ? 85 / Math.max(leftNumber, rightNumber) : 40;
  const left = 160 - (Number.isFinite(leftNumber) ? leftNumber * scale : 70);
  const right = 160 + (Number.isFinite(rightNumber) ? rightNumber * scale : 70);
  return picture("Downward forces on a seesaw", diagram(`${leftForce} acts down on the left at ${leftDistance}. ${rightForce} acts down on the right at ${rightDistance} from the pivot.`, `
    ${line(28,83,292,83,ink,4)}<path d="M160 84L146 110H174Z" fill="#c8e0d9" stroke="${teal}" stroke-width="2"/>
    ${arrow(left,41,left,78,blue,3)}${arrow(right,41,right,78,rust,3)}
    ${text(left,31,leftForce,blue,20)}${text(right,31,rightForce,rust,20)}
    ${line(left,98,145,98)}${line(175,98,right,98)}
    ${text((left+145)/2,120,leftDistance,ink,20)}${text((175+right)/2,120,rightDistance,ink,20)}${text(160,151,"Pivot",teal,20)}`,320,165),
    known ? "Compare each force and its distance from the pivot. The beam is shown level before any turning." : "The unknown distance is not drawn to scale; calculate it from the moments.");
}

function unequalForces() {
  return picture("Horizontal forces on a moving cyclist", diagram(
    "A cyclist travels right. A 35 newton force acts right and a 25 newton force acts left, giving a resultant of 10 newtons right.", `
    ${circle(125,104,17,"#f2f7f6",ink,2)}${circle(183,104,17,"#f2f7f6",ink,2)}
    <path d="M125 104l25-32 16 32 17 0-12-38h-8M125 104h41l8-29h-23" fill="none" stroke="${teal}" stroke-width="3"/>
    ${circle(168,44,7,"#db9963",ink,2)}<path d="M164 52l-14 17 19 15-6 18" fill="none" stroke="${ink}" stroke-width="5"/>
    ${arrow(106,79,43,79,blue,3)}${arrow(202,79,290,79,blue,3)}
    ${text(55,64,"25 N",blue,20)}${text(268,64,"35 N",blue,20)}${arrow(110,136,210,136,rust,2)}${text(160,161,"Travel right",rust,20)}`,320,175),
    "Subtract opposite forces: 35 N − 25 N = 10 N to the right, in the direction of travel.");
}

function filtrationWorked() {
  const host = node("div");
  const figure = node("figure", "", "catchup-picture");
  const image = filterDiagram(true);
  image.width = 520;
  image.height = 224;
  figure.append(image, node("figcaption", "Sand stays on the paper while salt solution passes into the beaker."));
  host.append(figure, ks3CatchupModel("separating-techniques", true));
  return host;
}

function reactivityLadder() {
  return picture("More reactive metals go higher", diagram("From most to least reactive in this comparison: zinc, iron, copper.", `
    ${arrow(60,142,60,20,teal,3)}${text(45,164,"More",teal,18)}${text(45,185,"reactive",teal,18)}
    ${["Zinc", "Iron", "Copper"].map((metal,index)=>`<rect x="105" y="${11+47*index}" width="141" height="37" rx="6" fill="#e8f2ed" stroke="${teal}"/>${text(175,38+47*index,metal,ink,20)}`).join("")}`,320,200));
}

export function withKS3Scaffolds(id, steps, renderVisual) {
  return steps.map((step, index) => {
    const addition = ks3Scaffolds[id]?.[index];
    if (!addition) return step;
    const {diagram: figure, ...attributes} = addition;
    const result = {...step, ...attributes, ...(figure ? {reference: {label: "Question diagram", render: () => renderVisual({...figure, reference: true})}} : {})};
    if (result.worked) {
      const map = {
        "atoms-and-compounds": () => renderVisual({...figure, reference: true}),
        "energy-transfers": () => renderVisual({...figure, reference: true}),
        forces: index === 0 ? () => cyclist(false) : unequalForces,
        "balanced-moments": () => seesaw("10 N", "2 m", "10 N", "3 m"),
        "work-done": () => ks3CatchupModel("work-done", true),
        "separating-techniques": filtrationWorked
      };
      if (map[id]) result.worked = {...result.worked, visual: map[id]};
    }
    return result;
  });
}

export const ks3FollowUps = {
  forces: q("A skateboard moves right. A 50 N pull acts right and a 20 N force acts left. What happens?",
    "It speeds up. The resultant force is 30 N to the right.", "50 − 20 = 30. The resultant points in the same direction as the motion.",
    ["It slows down. The resultant force is 30 N to the left.", "The force to the right is larger, so the resultant points right."],
    ["It speeds up. The resultant force is 70 N to the right.", "These forces act in opposite directions, so subtract their sizes."]),
  "balanced-moments": q("A 30 N weight acts 2 m to the left of a pivot. A 15 N weight acts 4 m to the right. Will the seesaw balance?",
    "Yes. The opposing moments are both 60 N m.", "The 30 N force gives 30 × 2 = 60 N m. The 15 N force gives 15 × 4 = 60 N m in the opposite direction.",
    ["No. The 30 N weight gives the larger moment.", "The 15 N weight acts twice as far from the pivot. Compare both products."],
    ["No. The 15 N weight gives the larger moment.", "Distance increases the moment, but the force also matters. Here the products match."]),
  metals: q("R displaces Q. P displaces R. Which order goes from most to least reactive?", "P, R, Q", "P goes above R, and R goes above Q.",
    ["P, Q, R", "R displaces Q and therefore goes above it."], ["Q, R, P", "The displacing metal goes above the metal it replaces."])
};

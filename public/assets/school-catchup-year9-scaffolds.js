import { question as q } from "./school-catchup-journey.js";
import { airSac, arrow, circle, compare, diagram, line, node, picture, blue, ink, rust, teal, text } from "./catchup-models.js";
import { osmosisQuestionDiagram, year9Visual } from "./school-catchup-visuals.js";

const worked = (title, ...lines) => ({title, lines});
const reference = (label, render) => ({label, render});

function readings(caption, headers, ...data) {
  return reference("Question data", () => {
    const table = node("table", "", "school-question-table");
    table.createCaption().textContent = caption;
    const header = table.createTHead().insertRow();
    for (const heading of headers) {
      const column = node("th", heading);
      column.scope = "col";
      header.append(column);
    }
    const body = table.createTBody();
    for (const row of data) {
      const tr = body.insertRow();
      for (const value of row) tr.insertCell().textContent = value;
    }
    return table;
  });
}

function exchangeSurface() {
  const bottom = [82, 136, 190, 244].map(x => `<path d="M${x-21} 121v-50q0-18 21-18t21 18v50" fill="#e3f3f6" stroke="${teal}" stroke-width="2"/>`).join("");
  return picture("Two exchange surfaces of the same overall width", diagram(
    "Surface A is flat. Surface B has four folds in the same overall width. Both are shown from the side.", `
    ${text(45,29,"A",ink,17)}${line(60,27,266,27,blue,3)}
    ${text(45,118,"B",ink,17)}${bottom}${line(60,121,265,121,teal,2)}
    ${text(160,145,"Same overall width",ink,14)}`,320,157));
}

function waterLeavingCell() {
  return picture("A plant cell in concentrated brine", diagram(
    "A plant cell is surrounded by concentrated brine. Water crosses the cell membrane in both directions, with more moving out of the cell.", `
    <rect x="14" y="25" width="292" height="132" rx="10" fill="#f5f0e5" stroke="${rust}" stroke-width="2"/>
    <rect x="70" y="47" width="130" height="90" rx="8" fill="#e2f3f0" stroke="${teal}" stroke-width="3"/>
    ${text(135,75,"Cell contents",teal,15)}${text(135,96,"more dilute",teal,14)}
    ${text(253,54,"Brine",rust,15)}${text(253,72,"more",rust,14)}${text(253,90,"concentrated",rust,14)}
    ${arrow(168,110,243,110,blue,4)}${arrow(243,126,168,126,blue,1.5)}
    ${text(241,148,"Water",blue,14)}`,320,174),
    "Follow the thicker arrow: more water crosses out than back in. The boundary represents the partially permeable cell membrane.");
}

function muscleCell() {
  const mitochondria = [70, 110, 150, 190, 230].map(x =>
    `<ellipse cx="${x}" cy="80" rx="15" ry="9" fill="#f1c7ab" stroke="${rust}" stroke-width="2"/>
    <path d="M${x-8} 80q4-6 8 0t8 0" fill="none" stroke="${rust}"/>`).join("");
  return picture("A working muscle cell", diagram(
    "A simplified elongated muscle cell contains many mitochondria, the sites of aerobic respiration.", `
    <path d="M23 80Q40 45 160 48T297 80Q280 115 160 112T23 80Z" fill="#e2f3f0" stroke="${teal}" stroke-width="3"/>
    ${mitochondria}${line(190,68,220,39,rust,2)}${text(238,31,"Mitochondria",rust,15)}
    ${text(160,145,"Muscle cell · simplified",ink,15)}`),
    "Locate the mitochondria: aerobic respiration here transfers energy for contraction. The cell and structures are not to scale.");
}

function nucleusAndRibosomes() {
  return picture("Inside an animal cell", diagram(
    "A simplified animal cell has a nucleus containing DNA and ribosomes shown as small dots in the cytoplasm. Ribosomes build proteins.", `
    <ellipse cx="120" cy="87" rx="92" ry="65" fill="#e2f3f0" stroke="${teal}" stroke-width="3"/>
    <circle cx="105" cy="88" r="30" fill="#d8c7e4" stroke="${ink}" stroke-width="2"/>
    <path d="M92 87q7-16 13 0t13 0" fill="none" stroke="${rust}" stroke-width="3"/>
    ${[[65,51],[152,54],[168,83],[65,111],[150,118]].map(([x,y]) => circle(x,y,3,ink,ink)).join("")}
    ${line(117,66,200,36,ink,1.5)}${text(254,32,"Nucleus: DNA",ink,14)}
    ${line(168,83,205,83,ink,1.5)}${text(254,78,"Ribosomes",ink,14)}${text(254,98,"build proteins",ink,14)}
    ${text(120,166,"Cell shown in section",ink,14)}`,320,180),
    "Locate DNA in the nucleus and the ribosomes shown as dots. The sizes are exaggerated so the structures can be seen.");
}

function plantCellJobs() {
  const leaf = node("figure", "", "catchup-picture");
  const image = node("img");
  image.className = "catchup-photo";
  image.src = "/assets/ks3-diagrams/palisade-cell.svg";
  image.alt = "Palisade cell with chloroplasts, nucleus, mitochondria and a cell wall labelled.";
  image.width = 360;
  image.height = 280;
  leaf.append(image, node("figcaption", "Leaf cell: chloroplasts absorb light for photosynthesis."));
  const root = picture("Root hair cell", diagram(
    "A root hair cell has a long, thin extension that contacts the soil. The extension increases surface area for absorption.", `
    <path d="M40 42H170Q195 42 202 71L277 74Q289 75 289 85Q289 95 277 96L202 99Q195 128 170 128H40Z" fill="#e2f3f0" stroke="${teal}" stroke-width="4"/>
    ${circle(87,84,16,"#d8c7e4",ink,2)}${line(235,74,235,44,teal,2)}${text(235,35,"Root hair",teal,15)}
    ${text(115,151,"Cell body",ink,15)}`,320,170),
    "The long extension increases the area in contact with soil, helping water and mineral ions enter.");
  return compare(leaf, root);
}

function concentrationPanel(title, from, to, against, substance) {
  const dots = [[65,55],[88,79],[60,105],[105,54],[112,110],[89,54],[236,79]];
  const positions = against ? dots.map(([x,y]) => [320-x,y]) : dots;
  return picture(title, diagram(
    `${substance} particles are ${against ? "less concentrated on the left and more concentrated on the right; movement shown is from left to right, against the concentration gradient" : "more concentrated on the left and less concentrated on the right; net movement shown is from left to right, down the concentration gradient"}.`, `
    <rect x="18" y="28" width="284" height="111" rx="8" fill="#f5fafb" stroke="${teal}" stroke-width="2"/>
    ${line(160,29,160,138,teal,3)}
    ${positions.map(([x,y]) => circle(x,y,5,"#eab776",rust)).join("")}
    ${arrow(125,82,194,82,blue,3)}
    ${text(87,20,from,ink,14)}${text(233,20,to,ink,14)}
    ${text(160,161,substance,ink,14)}`), against ? "Movement against the gradient needs energy from respiration and membrane proteins, which are omitted here." : "For particles able to cross the membrane, net diffusion is down the concentration gradient.");
}

function transportComparison() {
  return compare(concentrationPanel("Diffusion", "Higher", "Lower", false, "Particles"),
    concentrationPanel("Active transport", "Lower", "Higher", true, "Particles"));
}

function gutTransport() {
  return concentrationPanel("Absorption by a gut cell", "Gut lumen: lower", "Cell: higher", true, "Glucose molecules");
}

function efficiencyExample() {
  return picture("Energy transferred by a lamp", diagram(
    "A lamp receives 120 joules. It transfers 30 joules by useful light and 90 joules to other transfers such as heating.", `
    <rect x="20" y="37" width="280" height="37" fill="#eff4f4" stroke="${ink}" stroke-width="2"/>
    <rect x="20" y="37" width="70" height="37" fill="#a9d3c9" stroke="${teal}" stroke-width="2"/>
    ${text(55,62,"30 J",ink,15)}${text(196,62,"90 J",ink,15)}
    ${text(55,101,"Useful light",teal,14)}${text(196,101,"Other transfers",ink,14)}
    ${text(160,137,"Total input: 120 J",ink,15)}`,320,155),
    "The useful part is one quarter of the whole: 30 ÷ 120 = 0.25, or 25%.");
}

function groupOneExamples() {
  const host = node("div");
  host.append(year9Visual("periodic-table"));
  host.append(picture("Potassium electron arrangement", diagram(
    "A potassium atom has four electron shells. Its electron arrangement is 2, 8, 8, 1. One electron is shown in the outer shell; inner-shell electrons are omitted.", `
    ${circle(112,82,13,"#d8e8e5",teal,2)}${circle(112,82,29,"none",ink,1)}${circle(112,82,45,"none",ink,1)}
    ${circle(112,82,61,"none",ink,1)}${circle(112,82,76,"none",ink,1)}${circle(112,6,5,rust,rust)}
    ${text(230,48,"Potassium",ink,15)}${text(230,72,"2, 8, 8, 1",blue,15)}${text(230,100,"1 outer",rust,14)}${text(230,120,"electron",rust,14)}`,320,170),
    "The last number counts the outer-shell electron. Inner-shell electrons are omitted from this schematic."));
  return host;
}

function dissolvedIons() {
  const host = node("div");
  host.append(year9Visual("ionic-conduction"));
  host.append(picture("Ions in a salt solution", diagram(
    "A salt solution contains separated positive and negative ions. When a voltage is applied, the positive ions move toward the negative electrode and the negative ions move toward the positive electrode.", `
    <path d="M25 32v102h270V32" fill="#e6f3f6" stroke="${teal}" stroke-width="2"/>
    ${line(57,43,57,120,ink,5)}${line(263,43,263,120,ink,5)}${text(57,26,"−",blue,20)}${text(263,26,"+",rust,20)}
    ${circle(110,71,11,"#e7b783",rust)}${text(110,76,"+",ink,16)}${arrow(96,71,70,71,rust,2)}
    ${circle(208,98,11,"#cce4f1",blue)}${text(208,103,"−",ink,16)}${arrow(222,98,250,98,blue,2)}
    ${text(160,157,"Salt dissolved in water",ink,14)}`,320,170),
    "Follow the charged ions towards the electrodes of opposite charge. Water molecules are omitted to make the ion movement clear."));
  return host;
}

function mitosisInTissues() {
  const host = node("div");
  host.append(year9Visual("mitosis"));
  host.append(picture("New cells for repair and growth", diagram(
    "Skin cells divide near a damaged area during repair, and cells divide near a growing plant root tip. Both depend on copying and separating DNA before cell division.", `
    <path d="M20 55H105l9 15 9-15h32v59H20Z" fill="#f2d7c2" stroke="${rust}" stroke-width="2"/>
    ${[40,60,80,100,120,140].map(x=>circle(x,96,7,"#e9bca5",rust)).join("")}
    ${arrow(104,85,113,73,teal,2)}${arrow(124,85,116,73,teal,2)}
    <path d="M211 43h47v43q0 35-23 51-24-16-24-51Z" fill="#e9edd7" stroke="${teal}" stroke-width="2"/>
    ${[[224,91],[237,92],[250,92],[230,105],[244,105],[237,118]].map(([x,y])=>circle(x,y,4,"#c8dbb4",teal)).join("")}
    ${text(87,145,"Skin repair",ink,15)}${text(235,160,"Growing root tip",ink,15)}`,320,175),
    "Cell division contributes to repair in skin and growth at a root tip. The details are simplified."));
  return host;
}

const scaffolds = {
  osmosis: [, {reference: reference("Membrane diagram", osmosisQuestionDiagram),
    clue: "Water can cross both ways. Compare the two concentrations.", hint: "Find the side with fewer dissolved particles in the same volume."}],
  "active-transport": [, {clue: "The ions are moving from lower to higher concentration.", hint: "What process supplies the energy needed to move ions this way?"}],
  mitosis: [, {clue: "Separate three events: copying DNA, dividing the nucleus, and dividing the rest of the cell.",
    hint: "Look for the point where the two nuclei form."}],
  "atomic-number": [
    {worked: worked("Read the particle counts", "All sodium nuclei contain 11 protons. Changing protons would change the element.",
      "Sodium nuclei with 12 or 13 neutrons are different isotopes of sodium.",
      "The sodium ion has 10 electrons: +11 from the protons and −10 from the electrons gives a total of +1."),
      reference: readings("Three sodium examples", ["Example", "Protons", "Neutrons", "Electrons"], ["Atom", "11", "12", "11"], ["Ion", "11", "12", "10"], ["Isotope", "11", "13", "11"])},
    {...q("An ion has 9 protons and 10 electrons. What is its overall charge?", "−1", "+9 and −10 give −1. There is one extra negative charge.",
      ["+1", "There are more electrons than protons. Electrons are negative."],
      ["0", "A neutral atom has equal numbers of protons and electrons."]), guide: "Start with +9 for the protons. Add −10 for the electrons."},
    {...q("A magnesium atom starts with 12 protons, 12 neutrons and 12 electrons. It loses two electrons. Which result describes the new particle?", "A magnesium ion with charge +2",
      "Its 12 protons identify magnesium. +12 and −10 give charge +2.",
      ["A magnesium ion with charge −2", "Losing two negative electrons leaves two more positive charges than negative charges."],
      ["A different isotope of magnesium", "Isotopes differ in neutron number. Here only electron number changes."]),
      clue: "Proton number identifies the element. Compare the positive and negative charges that remain.", hint: "There are now 10 electrons. Work out +12 plus −10."}
  ],
  "periodic-table": [
    {worked: worked("Read from the inner shell outwards", "Lithium is 2, 1. The last number tells us there is one electron in the outer shell.",
      "Sodium (2, 8, 1) and potassium (2, 8, 8, 1) also end in 1. That shared outer arrangement helps explain their similar reactions."),
      reference: readings("Electron arrangements", ["Element", "Shells, from inner to outer"], ["Lithium", "2, 1"], ["Sodium", "2, 8, 1"], ["Potassium", "2, 8, 8, 1"])},
    {...q("An unfamiliar metal has the electron arrangement 2, 8, 18, 8, 1. Which of these elements is most likely to react similarly?", "Potassium (2, 8, 8, 1)",
      "Both have one outer-shell electron. Their inner shells can differ.",
      ["Magnesium (2, 8, 2)", "Magnesium ends in 2 and the unfamiliar metal ends in 1."],
      ["Chlorine (2, 8, 7)", "Chlorine has seven outer-shell electrons, whereas the unfamiliar metal has one."]),
      guide: "Read the last number in each arrangement. You only need the number of electrons in the outer shell."},
    {clue: "The final number counts the outer-shell electrons.", hint: "Compare the 7 in 2, 7 with the 7 in 2, 8, 7."}
  ],
  "energy-transfer": [
    {worked: worked("Distinguish power from total energy", "A transfers 100 J each second. In 2 seconds it transfers 200 J.",
      "B transfers only 50 J each second, but runs for 10 seconds and transfers 500 J. Its power is lower, but its total transfer is larger."),
      reference: readings("Two energy transfers", ["Device", "Power", "Time"], ["A", "100 W", "2 s"], ["B", "50 W", "10 s"])},
    {...q("A motor receives 150 J and transfers 60 J usefully. What percentage is useful?", "40%",
      "60 ÷ 150 = 0.4. Multiply by 100 to express it as 40%.",
      ["60%", "90 J goes to other transfers, so 60% is the non-useful fraction."],
      ["0.4%", "0.4 is the decimal. To write it as a percentage, multiply by 100."]),
      worked: worked("Calculate efficiency", "Efficiency = useful output ÷ total input. Use the same unit for both.",
        "A lamp transfers 30 J by useful light from 120 J supplied. 30 ÷ 120 = 0.25.",
        "0.25 is the decimal efficiency. Multiply by 100 to write it as 25%."),
      guide: "Put 60 J on top and 150 J underneath. Convert the decimal to a percentage."},
    {clue: "Find the part of the input that was useful. Use useful output divided by the whole input.", hint: "Calculate 70 ÷ 200 and multiply by 100."}
  ],
  "gas-exchange": [
    {worked: worked("Explain why a thin wall helps", "Start with structure: the air-sac and capillary walls form a thin barrier.",
      "Link it to diffusion: oxygen travels a shorter distance into the blood.",
      "With the same surface area and concentration difference, oxygen enters the blood faster."),
      reference: reference("Air sac and blood vessel", () => {
        const figure = airSac();
        figure.querySelector("figcaption span")?.remove();
        return figure;
      })},
    {...q("Two exchange surfaces are the same overall width. How could the folds on B affect exchange?", "More oxygen can cross in the same time.",
      "Folding increases the total surface area available for diffusion, with other conditions unchanged.",
      ["Each oxygen molecule has to travel through thicker walls.", "Folds add surface. The walls can still be equally thin."],
      ["Diffusion no longer needs a concentration difference.", "Folding changes the area. Net diffusion still depends on a concentration difference."]),
      guide: "Imagine tracing along each surface. Which offers more places for oxygen to cross?",
      reference: reference("Flat and folded surfaces", exchangeSurface)},
    {clue: "Identify what changed in the structure, then say how that affects the distance oxygen must travel.", hint: "Oxygen must cross a longer path through the thicker barrier."}
  ],
  enzymes: [
    {worked: worked("Separate collision effects from shape changes", "When cool, enzyme and substrate particles move more slowly and collide successfully less often.",
      "Gentle warming can increase successful collisions while the same substrate still fits.",
      "Strong heating can denature the enzyme. The active site changes, so fewer enzyme–substrate complexes form.")},
    {...q("An enzyme is gently warmed. The substrate still fits its active site. Why can the reaction speed up?", "Successful collisions happen more often.",
      "The particles move faster on average. The shape still allows enzyme–substrate complexes to form.",
      ["The enzyme has denatured.", "Denaturation changes the active site and can reduce binding. Here the substrate still fits."],
      ["Warming gives each enzyme more active sites.", "Gentle warming changes the frequency of successful collisions. It does not add active sites."]),
      guide: "Hold the shape constant in your explanation. What does warming do to particle movement?"},
    {clue: "Distinguish a change in particle speed from a change in enzyme shape.", hint: "Think about whether the original substrate fits the active site after cooling."}
  ],
  "ionic-conduction": [
    {worked: worked("Check charge, then movement", "A solid salt still has positive and negative ions. They vibrate in fixed positions.",
      "Melting frees the ions to move through the liquid. When a salt dissolves, its separated ions can move through the solution.",
      "Mobile ions carry charge. Both a molten salt and a salt solution can therefore conduct.")},
    {guide: "The two examples contain the same charged ions. Focus on what the ions can do in each state.",
      clue: "A current needs a flow of charge.", hint: "The ions can vibrate in a solid lattice. Can they travel through the solid?"},
    {clue: "First identify the charged particles in magnesium chloride. Then ask whether they can move through the solution.", hint: "The solvent lets separated positive and negative ions move."}
  ],
  "molecular-melting": [
    {worked: worked("Track the circled water molecule", "In ice, attractions between molecules hold them in an ordered arrangement.",
      "During melting, enough of those attractions are overcome for whole water molecules to move past one another.",
      "The covalent bonds within each water molecule stay intact."), reference: reference("Ice and liquid water models", () => year9Visual("molecular-melting"))},
    {...q("Solid iodine consists of pairs of bonded iodine atoms. When the solid melts, what can move past what?", "Whole iodine molecules can move past one another.",
      "Melting overcomes some attractions between molecules. The bonds within each iodine molecule remain intact.",
      ["Separate iodine atoms move past one another.", "The pairs stay bonded. The change is in how the whole molecules are arranged and move."],
      ["The same molecules remain fixed in a lattice.", "In a liquid the molecules can move past one another."]),
      guide: "Treat each bonded pair like the circled molecule in the ice model. Follow the whole pair as a unit."},
    {clue: "Think about what has to move past what when the solid turns into a liquid.", hint: "Forces between separate molecules are weaker than the covalent bonds inside them."}
  ]
};

export function applyYear9Scaffolds(lessons) {
  // The membrane model explains the first two stages; the cell view applies it
  // to a different situation rather than assuming the opening view does so.
  lessons.osmosis.steps[0].visual = () => year9Visual("osmosis");
  lessons.osmosis.steps[1].visual = () => year9Visual("osmosis");
  lessons.osmosis.steps[2].visual = waterLeavingCell;
  lessons["cell-structures"].steps[0].visual = nucleusAndRibosomes;
  lessons["cell-structures"].steps[1].visual = muscleCell;
  lessons["cell-structures"].steps[2].visual = plantCellJobs;
  lessons["active-transport"].steps[0].visual = transportComparison;
  lessons["active-transport"].steps[1].visual = () => year9Visual("active-transport");
  lessons["active-transport"].steps[2].visual = gutTransport;
  lessons.mitosis.steps[0].visual = () => year9Visual("mitosis");
  lessons.mitosis.steps[1].visual = () => year9Visual("mitosis");
  lessons.mitosis.steps[2].visual = mitosisInTissues;
  lessons["atomic-number"].retry = q("A neutral oxygen atom gains two electrons. What happens?", "It becomes an oxygen ion with charge −2.",
    "The proton number is unchanged. Two extra electrons give a net negative charge of −2.",
    ["It becomes an oxygen ion with charge +2.", "Each added electron contributes a negative charge."],
    ["It becomes a different element.", "Changing protons would change the element. This change affects only electrons."]);
  lessons["gas-exchange"].retry = q("A thin layer builds up across a fish’s gill surface. The area stays the same. How could this affect oxygen uptake?",
    "Oxygen diffuses more slowly because it crosses a longer distance.", "Increasing the thickness increases the diffusion distance, with other conditions unchanged.",
    ["Oxygen diffuses faster because the layer makes the barrier thicker.", "A thicker barrier increases the distance oxygen must travel."],
    ["Oxygen must move by active transport.", "Oxygen still diffuses across the barrier when there is a concentration difference."]);
  for (const [id, additions] of Object.entries(scaffolds)) {
    lessons[id].steps = lessons[id].steps.map((step, index) => ({...step, ...additions[index]}));
  }
  // Worked figures are shown with the worked explanation only, not the
  // independent check. Each model is selected for the reasoning it supports.
  for (const id of ["atomic-number", "periodic-table", "energy-transfer", "enzymes", "ionic-conduction", "molecular-melting"]) {
    const example = lessons[id].steps[0].worked;
    if (example) example.visual = () => year9Visual(id);
  }
  lessons["periodic-table"].steps[0].worked.visual = groupOneExamples;
  lessons["ionic-conduction"].steps[0].worked.visual = dissolvedIons;
  lessons["gas-exchange"].steps[0].worked.visual = () => year9Visual("gas-exchange");
  lessons["energy-transfer"].steps[1].worked.visual = efficiencyExample;
}

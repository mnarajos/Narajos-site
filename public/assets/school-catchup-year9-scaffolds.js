import { question as q } from "./school-catchup-journey.js";
import { airSac, diagram, line, node, picture, blue, ink, teal, text } from "./catchup-models.js";
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
}

import { arrow, blue, circle, compare, diagram, ink, line, picture, rust, teal, text, violet } from "./catchup-models.js";

// Schematic models: the same car and particles are shown in each comparison.
function ramp(angle, label, measurement = false) {
  const top = angle === "steep" ? 44 : 92;
  const carX = 83, carY = angle === "steep" ? 66 : 95;
  const shape = `<path d="M30 ${top} L180 135 H30 Z" fill="#e4f1ed" stroke="${teal}" stroke-width="2"/>
    <g transform="rotate(${angle === "steep" ? 31 : 16} ${carX} ${carY})">
      <rect x="${carX}" y="${carY}" width="32" height="10" rx="3" fill="#eab776" stroke="${rust}"/>
      ${circle(carX+6,carY+11,3,"#fff",ink)}${circle(carX+26,carY+11,3,"#fff",ink)}
    </g>
    ${line(20,135,300,135,ink,2)}${text(180,161,"Ramp foot",teal,14)}
    ${measurement ? `${line(180,147,292,147,blue,2)}${arrow(180,147,292,147,blue,2)}${arrow(292,147,180,147,blue,2)}${line(292,131,292,153,blue,2)}${text(240,125,"Stop",blue,14)}` : ""}`;
  return picture(label, diagram(`${label}: a toy starts near the top and rolls towards the ramp foot${measurement ? "; distance is measured from the foot to where the toy stops" : ""}.`, shape),
    measurement ? "Measure from the foot of the ramp to the stopping point." : "The same toy starts at the same release point on each ramp.");
}

function fairTest(index) {
  if (index === 0) return compare(ramp("shallow", "Shallow ramp"), ramp("steep", "Steeper ramp"));
  if (index === 1) return ramp("shallow", "Measure the outcome", true);
  return picture("Keep the other conditions the same", diagram("Two ramp tests use the same toy, surface and release point; only the ramp angle changes.",
    `${text(160,28,"Same in both runs",teal,17)}
    <rect x="42" y="52" width="42" height="15" rx="4" fill="#eab776" stroke="${rust}"/>
    ${circle(51,70,5,"white",ink)}${circle(75,70,5,"white",ink)}
    ${line(132,67,188,67,teal,5)}${line(136,56,142,62,teal)}${line(155,56,161,62,teal)}${line(174,56,180,62,teal)}
    ${line(231,52,282,76,teal,3)}${circle(240,56,5,"#eab776",rust)}${arrow(240,39,240,50,rust,2)}
    ${text(64,99,"Toy",ink,15)}${text(160,99,"Surface",ink,15)}${text(255,99,"Release point",ink,14)}
    ${text(160,135,"Change only the angle",rust,16)}`), "Compare the controls before linking a change in distance to angle.");
}

function particles(title, positions, note, description, motion = "") {
  const drawing = `<rect x="28" y="22" width="264" height="113" rx="5" fill="#f5fafb" stroke="${teal}" stroke-width="2"/>
    ${positions.map(([x,y]) => circle(x,y,7,"#cce4f1",blue,2)).join("")}${motion}`;
  return picture(title, diagram(description, drawing), note);
}

const solid = [[90,56],[130,56],[170,56],[210,56],[90,95],[130,95],[170,95],[210,95]];
const liquid = [[87,100],[110,98],[132,102],[154,98],[176,102],[198,99],[220,101],[143,81]];
const gas = [[58,42],[113,50],[188,39],[264,57],[83,113],[144,85],[214,109],[264,91]];

function states(index) {
  if (index === 0) return particles("Particles in a warming solid", solid,
    "The arrows show vibration around fixed positions; the circles stay the same size.",
    "Eight particles in regular rows. Double arrows show vibration around fixed positions.",
    `${arrow(119,39,141,39,rust,2)}${arrow(141,39,119,39,rust,2)}`);
  if (index === 1) return particles("Particles in a liquid", liquid,
    "The particles remain close but can move past their neighbours. The arrows indicate possible movement.",
    "Eight close particles in an irregular arrangement. Arrows show neighbouring particles can move in different directions.",
    `${arrow(108,74,125,74,rust,2)}${arrow(184,78,167,78,rust,2)}`);
  return compare(
    particles("Liquid", liquid, "Little space remains between particles.", "Liquid particles are close together with little space between them."),
    particles("Gas", gas, "More space between particles allows compression.", "Gas particles are spread out with more space between them."));
}

export const ks3StepVisuals = {
  "fair-tests": [0, 1, 2].map(index => () => fairTest(index)),
  "states-of-matter": [0, 1, 2].map(index => () => states(index))
};

function earthOrbit() {
  return picture("Earth's rotation and orbit", diagram(
    "Earth spins on its axis in about 24 hours. Earth travels around the Sun in about one year. The drawing is not to scale.", `
    <ellipse cx="100" cy="80" rx="97" ry="49" fill="none" stroke="${blue}" stroke-width="2" stroke-dasharray="5 4"/>
    ${circle(100,80,24,"#f8d47f",rust,2)}${text(100,124,"Sun",ink,15)}
    ${circle(195,80,15,"#a8d3e4",blue,2)}${line(190,57,201,101,ink,1.5)}
    <path d="M210 60q20 20 3 40" fill="none" stroke="${rust}" stroke-width="2.5"/>
    <path d="M213 100l-1-9 8 4Z" fill="${rust}"/>
    ${text(204,116,"Earth",blue,14)}${text(249,47,"Spin: about",rust,14)}${text(249,64,"24 hours",rust,14)}
    ${text(160,151,"Orbit: about one year",blue,15)}`,320,170),
    "Compare Earth's daily spin with its yearly path around the Sun. Sizes and distances are not to scale.");
}

function electromagnet() {
  return picture("An electromagnet in a complete circuit", diagram(
    "A cell, closed switch and wire coil around an iron core make a complete loop. An iron paper clip is attracted near the core while current flows.", `
    <path d="M55 47H100M116 47H170M205 47H245V119H55V47" fill="none" stroke="${ink}" stroke-width="3"/>
    ${circle(171,47,2.5,"white",ink)}${circle(204,47,2.5,"white",ink)}${line(174,47,201,47,ink,2.5)}${text(188,27,"Closed switch",ink,14)}
    ${line(100,34,100,60,ink,2)}${line(111,27,111,67,ink,4)}${line(116,47,132,47,ink,3)}
    <rect x="142" y="102" width="74" height="32" rx="4" fill="#d2dddd" stroke="${ink}"/>
    <path d="M150 99q-14 19 0 38m12-38q-14 19 0 38m12-38q-14 19 0 38m12-38q-14 19 0 38m12-38q-14 19 0 38m12-38q-14 19 0 38" fill="none" stroke="${rust}" stroke-width="3"/>
    ${text(106,20,"Cell",ink,14)}${text(135,159,"Coil on iron",rust,13)}
    <path d="M228 133q12-7 17 2t-3 17q-7 7-11 1l10-11" fill="none" stroke="${blue}" stroke-width="3"/>
    ${text(264,159,"Iron clip",blue,13)}`,320,170),
    "Trace the complete loop through the coil. When the switch opens, current stops and the electromagnet releases the clip.");
}

function neutralisation() {
  return picture("pH while alkali is added", diagram(
    "On a pH scale, the reading increases from pH 3 to pH 6 after alkali is added. Both readings are below neutral pH 7.", `
    ${line(35,90,285,90,ink,3)}${[3,6,7,10].map((v,i) => line([65,155,185,275][i],82,[65,155,185,275][i],98,ink,2)+text([65,155,185,275][i],116,String(v),ink,15)).join("")}
    ${circle(65,90,5,rust,rust)}${circle(155,90,5,blue,blue)}${arrow(72,63,148,63,teal,2.5)}
    ${text(110,48,"Add alkali",teal,15)}${text(110,146,"Still acidic",rust,14)}${text(200,146,"Neutral at 7",ink,14)}`,320,170),
    "Compare the final reading with 7: pH 6 is less acidic than pH 3, but it is still acidic.");
}

function breathing() {
  return picture("Breathing moves air", diagram(
    "Air moves in through the airway to the lungs when a person breathes in. Air moves out through the same airway when they breathe out.", `
    <path d="M148 60V24h24v36M148 60Q115 49 90 83Q70 111 87 139Q109 160 136 129V78M172 60Q205 49 230 83Q250 111 233 139Q211 160 184 129V78" fill="#d6eaf2" stroke="${teal}" stroke-width="3"/>
    ${arrow(135,28,135,68,blue,3)}${arrow(185,68,185,28,rust,3)}
    ${text(69,30,"Air in",blue,15)}${text(251,30,"Air out",rust,15)}${text(160,165,"Lungs",ink,15)}`,320,180),
    "Follow air in and out. Oxygen can pass from the air in the lungs into the blood; respiration occurs in cells.");
}

function humanFertilisation() {
  return picture("Human fertilisation", diagram(
    "A sperm cell reaches an egg cell. The male and female sex-cell nuclei can join during fertilisation.", `
    ${circle(215,89,42,"#f4e3d2",rust,3)}${circle(215,89,13,"#d8c7e4",ink,2)}
    <ellipse cx="88" cy="87" rx="14" ry="8" fill="#b6d4e5" stroke="${blue}" stroke-width="2"/>
    <path d="M74 87q-20-17-33 2t-22 0" fill="none" stroke="${blue}" stroke-width="2"/>
    ${arrow(108,88,162,88,teal,2)}${text(76,52,"Sperm cell",blue,15)}${text(215,155,"Egg cell",rust,15)}`,320,174),
    "Fertilisation is the joining of male and female sex-cell nuclei. This drawing is not to scale.");
}

function rockFormation() {
  return compare(picture("Sedimentary rock", diagram(
    "Sediment settles in layers and is compacted and cemented into sedimentary rock.", `
    <path d="M31 45h98v75H31Z" fill="#e8d7b7" stroke="${ink}"/><path d="M31 70h98M31 95h98" stroke="${rust}" stroke-width="2"/>
    ${arrow(145,82,185,82,teal)}<path d="M200 52h88v68h-88Z" fill="#cfae8e" stroke="${ink}"/>
    <path d="M201 76h86M201 99h86" stroke="${rust}" stroke-width="3"/>
    ${text(80,145,"Sediment",ink,15)}${text(246,145,"Rock",ink,15)}`),
    "Layers are pressed and cemented together."), picture("Igneous rock", diagram(
    "Molten rock cools and solidifies. Crystals grow as it cools.", `
    <path d="M35 53h85l-10 66H45Z" fill="#e8a76e" stroke="${rust}" stroke-width="2"/>
    ${arrow(140,86,180,86,teal)}<path d="M197 55h88v64h-88Z" fill="#e4dfe3" stroke="${ink}"/>
    <path d="M197 85l20-20 18 18 24-18 26 20M208 119l12-23 20 23M250 119l13-21 22 15" fill="none" stroke="${violet}" stroke-width="2"/>
    ${text(78,145,"Molten rock",rust,15)}${text(240,145,"Crystals",ink,15)}`),
    "Cooling and solidifying produces igneous rock."));
}

function meltingGraph() {
  return picture("Heating a pure solid at a steady rate", diagram(
    "A qualitative graph of temperature against time rises as a solid warms, is level while the substance melts, and rises again as the liquid warms.", `
    ${arrow(55,140,290,140,ink,2)}${arrow(55,140,55,18,ink,2)}
    <path d="M62 126L125 81H205L270 38" fill="none" stroke="${blue}" stroke-width="4"/>
    ${text(174,161,"Time heating",ink,15)}${text(6,24,"Temperature",ink,13,"start")}
    ${text(166,70,"Melting",blue,14)}${text(90,95,"Solid",ink,13)}${text(255,28,"Liquid",ink,13)}`,320,175),
    "Read the flat section: energy is supplied during melting while temperature stays steady. This graph is qualitative; it is not measured data.");
}

function warmingParticles() {
  return picture("Particle movement as a gas warms", diagram(
    "A cool gas and a warmer gas have the same particles. The arrows for the warmer gas are longer, indicating a higher average particle speed.", `
    <rect x="22" y="35" width="122" height="92" rx="6" fill="#f5fafb" stroke="${teal}" stroke-width="2"/>
    <rect x="176" y="35" width="122" height="92" rx="6" fill="#f5fafb" stroke="${teal}" stroke-width="2"/>
    ${[[47,58],[82,98],[115,62],[199,58],[234,98],[267,62]].map(([x,y])=>circle(x,y,6,"#cce4f1",blue,2)).join("")}
    ${arrow(52,58,65,58,rust,2)}${arrow(87,98,100,98,rust,2)}${arrow(204,58,228,58,rust,2)}${arrow(239,98,263,98,rust,2)}
    ${text(83,24,"Cooler",ink,15)}${text(237,24,"Warmer",ink,15)}${text(160,154,"Longer arrows: greater speed",rust,14)}`,320,169),
    "For a gas, warming increases average particle kinetic energy. The particles are unchanged; arrow lengths show movement, not particle size.");
}

function repeatedRuns() {
  const stops = [210, 214, 206];
  return picture("Repeat the same setup", diagram(
    "Three illustrative runs begin at the same ramp foot and end at similar stopping points. Double arrows show the measured distance each time.", `
    ${line(95,22,95,141,teal,2)}${text(95,16,"Ramp foot: 0",teal,14)}
    ${stops.map((x,i)=>{const y=44+i*45;return text(35,y+5,"Run "+(i+1),ink,14)+arrow(99,y,x,y,blue,2)+arrow(x,y,99,y,blue,2)+line(x,y-10,x,y+10,rust,2);}).join("")}
    ${text(249,35,"Stop",rust,14)}`,320,165),
    "Use the same zero for each run and compare the distances. The endpoints here are illustrative, not measured results.");
}

export const ks3ExplanationVisuals = {
  "fair-tests": {0: () => fairTest(0), 1: () => fairTest(2), 2: repeatedRuns},
  "states-of-matter": {0: () => compare(states(0), states(1)), 1: () => states(2), 2: () => compare(warmingParticles(), meltingGraph())},
  "acids-and-alkalis": {1: neutralisation}, respiration: {0: breathing}, reproduction: {1: humanFertilisation},
  "earth-structure": {0: rockFormation}, space: {1: earthOrbit}, electricity: {1: electromagnet}
};

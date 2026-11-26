import { arrow, blue, circle, compare, diagram, ink, line, node, picture, rust, teal, text, violet } from "./catchup-models.js";

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
  const host = node("div");
  host.append(picture("Fertilisation in a flower", diagram(
    "A pollen tube grows to the ovule, carrying a male nucleus. It joins the female nucleus inside the ovule.", `
    <ellipse cx="228" cy="93" rx="56" ry="47" fill="#f4e9da" stroke="${teal}" stroke-width="2"/>
    ${circle(239,94,13,"#d8c7e4",ink,2)}<path d="M26 88H155Q172 88 186 94H215" fill="none" stroke="${rust}" stroke-width="5"/>
    ${circle(202,94,5,"#e7b783",rust)}${arrow(209,94,223,94,rust,2)}
    ${text(88,60,"Pollen tube",rust,15)}${text(229,156,"Ovule",teal,15)}${text(160,25,"Male nucleus joins female nucleus",ink,13)}`,320,175),
    "Follow the male nucleus through the pollen tube to the female nucleus inside the ovule. The sizes are simplified."));
  host.append(picture("Human fertilisation", diagram(
    "A sperm cell reaches an egg cell. The male and female sex-cell nuclei can join during fertilisation.", `
    ${circle(215,89,42,"#f4e3d2",rust,3)}${circle(215,89,13,"#d8c7e4",ink,2)}
    <ellipse cx="88" cy="87" rx="14" ry="8" fill="#b6d4e5" stroke="${blue}" stroke-width="2"/>
    <path d="M74 87q-20-17-33 2t-22 0" fill="none" stroke="${blue}" stroke-width="2"/>
    ${arrow(108,88,162,88,teal,2)}${text(76,52,"Sperm cell",blue,15)}${text(215,155,"Egg cell",rust,15)}`,320,174),
    "Fertilisation is the joining of male and female sex-cell nuclei. This drawing is not to scale."));
  return host;
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

function atomsRearranged() {
  return picture("Atoms rearrange in a reaction", diagram(
    "Two X atoms are joined to one another and two Y atoms are joined to one another. After reaction there are two X–Y pairs. There are still two X atoms and two Y atoms.", `
    ${text(78,24,"Before",ink,15)}${text(244,24,"After",ink,15)}
    ${line(55,63,95,63,ink,3)}${circle(55,63,15,"#cce4f1",blue,2)}${circle(95,63,15,"#cce4f1",blue,2)}${text(55,68,"X",ink,14)}${text(95,68,"X",ink,14)}
    ${line(55,114,95,114,ink,3)}${circle(55,114,15,"#e7b783",rust,2)}${circle(95,114,15,"#e7b783",rust,2)}${text(55,119,"Y",ink,14)}${text(95,119,"Y",ink,14)}
    ${arrow(128,88,175,88,teal,2.5)}
    ${[63,114].map(y=>line(223,y,263,y,ink,3)+circle(223,y,15,"#cce4f1",blue,2)+circle(263,y,15,"#e7b783",rust,2)+text(223,y+5,"X",ink,14)+text(263,y+5,"Y",ink,14)).join("")}`,320,145),
    "Count each type before and after. Bonds have changed; the same atoms remain. X and Y stand for different types of atom.");
}

function speedTimeline() {
  return picture("Average speed for 10 m in 5 s", diagram(
    "A line marks 10 metres over 5 seconds. Five equal intervals represent an average of 2 metres for each second.", `
    ${line(35,90,285,90,blue,3)}${[0,1,2,3,4,5].map(i=>line(35+i*50,80,35+i*50,100,ink,2)+text(35+i*50,121,String(i*2),ink,14)).join("")}
    ${text(160,27,"10 m ÷ 5 s = 2 m/s",ink,16)}${text(60,51,"1 s",teal,14)}
    ${arrow(37,61,82,61,teal,2)}${text(160,151,"Distance (m)",blue,14)}`,320,170),
    "Divide total distance by total time. Equal 2 m sections illustrate an average of 2 m per second; the real speed need not have been constant.");
}

function proteinForRepair() {
  const host = node("div");
  host.append(picture("Food supplies energy", diagram(
    "Bread and oil represent sources of carbohydrate and lipid. After digestion and processing, their components can be used in respiration to transfer energy for activity.", `
    <path d="M22 61q8-27 42-19q27 7 22 32H22Z" fill="#e9c39a" stroke="${rust}" stroke-width="2"/>
    <path d="M104 42h17v8h6v27h-29V50h6Z" fill="#f1d889" stroke="${rust}" stroke-width="2"/>
    ${arrow(134,67,183,67,teal,2.5)}${text(158,26,"Digest, then",ink,13)}${text(158,43,"respire",ink,13)}
    <path d="M200 69q14-23 45-20 24 2 40 20-16 18-40 20-31 3-45-20Z" fill="#c4e0db" stroke="${teal}" stroke-width="2"/>
    ${text(75,119,"Carbohydrate / lipid",ink,14)}${text(241,119,"Activity",ink,14)}`,320,145),
    "After digestion and processing, substances from food can be used in respiration to transfer energy for activity."));
  host.append(picture("Protein provides building blocks", diagram(
    "Protein in food is digested into amino acids. Cells use these building blocks to make proteins needed for growth and repair.", `
    <path d="M16 66q5 48 46 48t46-48Z" fill="#e9d1ad" stroke="${rust}" stroke-width="2"/>
    ${[[37,70],[56,66],[76,71],[50,81],[71,84]].map(([x,y])=>circle(x,y,5,"#b18c60",rust,1)).join("")}
    ${arrow(112,87,143,87,teal,2)}${text(128,64,"Digest",ink,13)}
    ${[[161,72],[179,86],[160,101]].map(([x,y])=>circle(x,y,6,"#d9c7e8",violet,1)).join("")}
    ${arrow(192,87,216,87,teal,2)}
    ${[[236,68],[260,68],[236,92],[260,92]].map(([x,y])=>circle(x,y,10,"#c4e0db",teal,1)).join("")}
    ${text(62,145,"Food protein",ink,14)}${text(172,145,"Amino acids",ink,14)}${text(252,145,"Tissue",ink,14)}`,320,165),
    "Follow protein from food to amino acids. Cells use these to build proteins for growth and repair."));
  return host;
}

function plantGlucose() {
  return picture("Glucose can be made into starch", diagram(
    "A simplified model shows glucose units joining into a chain representing starch, which a plant can store.", `
    ${[29,59,89,119].map(x=>circle(x,77,10,"#e7b783",rust,2)).join("")}${arrow(145,77,177,77,teal,2)}
    ${line(201,77,285,77,rust,3)}${[201,229,257,285].map(x=>circle(x,77,10,"#e7b783",rust,2)).join("")}
    ${text(83,47,"Glucose",rust,15)}${text(243,47,"Starch",teal,15)}${text(160,130,"Building a storage substance",ink,14)}`,320,150),
    "Follow glucose units into the simplified starch chain. Water released as bonds form is omitted. Plants can also use glucose in respiration, including in darkness.");
}

function meltingGraph() {
  return picture("Heating a pure substance at a steady rate", diagram(
    "A qualitative graph of temperature against time rises as a solid warms, is level during melting, rises as the liquid warms, and is level again during boiling.", `
    ${arrow(43,140,300,140,ink,2)}${arrow(43,140,43,26,ink,2)}
    <path d="M50 128L90 105H143L191 62H251L290 39" fill="none" stroke="${blue}" stroke-width="4"/>
    ${text(174,161,"Time heating",ink,15)}${text(3,15,"Temperature",ink,13,"start")}
    ${text(116,95,"Melting",blue,13)}${text(221,51,"Boiling",blue,13)}`,320,175),
    "Read the flat sections: energy is supplied during melting and boiling while temperature stays steady. The graph is qualitative, not measured data.");
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
  "states-of-matter": {0: () => compare(states(0), states(1)), 1: () => states(2), 2: () => compare(warmingParticles(), meltingGraph()),
    3: () => particles("Water vapour moving", gas, "The arrows suggest movement in different directions. The circles represent water particles and are the same size as in the other states.",
      "Eight water particles are spread through the container. Arrows indicate particle movement in different directions.", `${arrow(58,42,83,42,rust,2)}${arrow(188,39,188,60,rust,2)}${arrow(214,109,190,109,rust,2)}`)},
  "acids-and-alkalis": {1: neutralisation}, respiration: {0: breathing}, reproduction: {1: humanFertilisation},
  "earth-structure": {0: rockFormation}, "chemical-reactions": {0: atomsRearranged}, "health-and-lifestyle": {0: proteinForRepair}, photosynthesis: {1: plantGlucose}, "journey-speed": {0: speedTimeline}, space: {1: earthOrbit}, electricity: {1: electromagnet}
};

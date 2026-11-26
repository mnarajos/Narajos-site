import { arrow, blue, circle, compare, diagram, ink, line, picture, rust, teal, text } from "./catchup-models.js";

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

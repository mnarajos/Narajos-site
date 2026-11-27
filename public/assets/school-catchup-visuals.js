import { airSac, arrow, blue, circle, compare, diagram, ink, line, node, periodicOutline,
  picture, rust, steps, teal, text, violet } from "./catchup-models.js";

function cells() {
  const host = node("div");
  const comparison = node("div", "", "school-cell-comparison");
  const views = [
    ["Cheek cell", "cheek", "Labelled cheek cell. Its mitochondria are small ovals with folded interiors."],
    ["Palisade cell", "palisade", "Labelled leaf cell. Its chloroplasts contain small stacks, distinct from the folds in its mitochondria."]
  ].map(([title, file, alt]) => {
    const figure = node("figure");
    const image = node("img");
    image.src = "/assets/ks3-diagrams/" + file + "-cell.svg";
    image.width = 360;
    image.height = 280;
    image.alt = alt;
    figure.append(node("figcaption", title), image);
    if (file === "palisade") figure.append(node("p", "In this specialised leaf cell, chloroplasts absorb light for photosynthesis."));
    return [title, figure];
  });
  const controls = node("div", "", "ks3-model-controls");
  const choices = ["Compare both", ...views.map(([title]) => "Inspect " + title.toLowerCase())];
  const buttons = choices.map((choice, index) => {
    const button = node("button", choice, "ks3-model-button");
    button.type = "button";
    button.setAttribute("aria-pressed", String(index === 0));
    button.addEventListener("click", () => {
      views.forEach(([, figure], i) => { figure.hidden = index > 0 && index !== i + 1; });
      buttons.forEach((item, i) => item.setAttribute("aria-pressed", String(index === i)));
    });
    return button;
  });
  const option = node("label", "", "school-diagram-option");
  const greyscale = node("input");
  greyscale.type = "checkbox";
  greyscale.addEventListener("change", () => host.classList.toggle("school-greyscale", greyscale.checked));
  option.append(greyscale, " Greyscale");
  controls.append(...buttons);
  comparison.append(...views.map(([, figure]) => figure));
  host.append(controls, comparison, option, node("p", "Structures are enlarged for clarity."));
  return host;
}

function osmosis(forQuestion = false) {
  const water = [[55,56],[38,82],[103,60],[84,112],[47,135],[113,150],[58,168],[124,177],
    [217,53],[192,106],[250,81],[265,172],[206,163],[283,146],[285,61],[235,137]];
  const solute = [[116,100],[94,154],[205,78],[241,55],[275,101],[209,139],[246,166],[272,124]];
  const drawing = `
    <rect x="14" y="33" width="292" height="154" rx="10" fill="#e6f3fa" stroke="${ink}" stroke-width="2"/>
    <rect x="154" y="32" width="12" height="155" fill="#90b8c8" stroke="${blue}"/>
    ${[54,81,108,135,162].map(y => line(154,y,166,y,"white",3)).join("")}
    ${water.map(([x,y]) => circle(x,y,4,"white",blue)).join("")}
    ${solute.map(([x,y]) => `<rect x="${x-5}" y="${y-5}" width="10" height="10" rx="1" fill="${violet}"/>`).join("")}
    ${forQuestion ? "" : arrow(99,81,185,81,blue,3.5)+arrow(203,120,125,120,blue,1.4)}
    ${text(77,23,"A · more dilute")}${text(237,23,"B · more concentrated",ink,14)}
    ${text(160,207,"Partially permeable membrane",blue)}
    ${circle(42,229,4,"white",blue)}${text(53,234,"Water",ink,15,"start")}
    <rect x="157" y="224" width="10" height="10" fill="${violet}"/>
    ${text(173,234,"Dissolved particles",ink,14,"start")}`;
  const description = "Equal volumes divided by a partially permeable membrane. Side A is more dilute. Side B is more concentrated.";
  return forQuestion ? picture("Sides A and B", diagram(description, drawing, 320, 244))
    : picture("Net water movement A → B",
      diagram(description + " Water crosses both ways, but more crosses from A to B.", drawing, 320, 244),
      "Water crosses both ways. The thicker arrow shows the direction in which more water crosses.");
}

function activeTransport() {
  const root = diagram("A root hair extends from a root cell into a space between soil particles.", `
    <rect x="10" y="33" width="297" height="113" rx="18" fill="#f5eadb"/>
    <path d="M14 54Q43 24 70 41T97 72Q67 92 33 84Z M20 112Q43 96 70 107L116 148H23Z M123 48Q151 22 194 41L170 74H111Z"
      fill="#d5b58a" stroke="#8a6441" stroke-width="2"/>
    <path d="M310 61H227Q198 61 186 81L86 92Q72 95 77 104Q80 111 92 110L195 107Q209 126 228 128H310Z"
      fill="#d8efe3" stroke="${teal}" stroke-width="4"/>
    ${circle(252,94,12,"#b496cd",violet)}
    ${line(150,108,150,138,ink,1.7)}${text(150,160,"Root hair",ink,19)}
    ${text(63,25,"Soil",ink,19)}
    ${text(263,51,"Root cell",teal,19)}
    <rect x="89" y="83" width="45" height="33" rx="5" fill="none" stroke="${rust}" stroke-width="2" stroke-dasharray="4 4"/>`,320,172);
  const membrane = diagram("In the magnified membrane, fewer ions are outside than inside. One ion moves through a protein from outside into the cell using energy from respiration.", `
    <rect x="12" y="36" width="296" height="111" rx="9" fill="#e8f3ef"/>
    <path d="M147 36h26v111h-26Z" fill="#abcdbf" stroke="${teal}"/>
    <path d="M148 70q12 7 24 0v42q-12-7-24 0Z" fill="#e0c9eb" stroke="${violet}" stroke-width="2.5"/>
    ${[[53,61],[66,122],[201,52],[226,66],[267,56],[290,76],[222,121],[265,108],[287,134]].map(([x,y]) => circle(x,y,5,"#d8964e",rust)).join("")}
    ${circle(112,90,5,"#d8964e",rust)}${arrow(120,90,207,90,blue,3.5)}
    ${text(75,24,"Soil water",ink,19)}${text(240,24,"Inside cell",ink,19)}
    ${text(74,166,"Fewer ions",rust,19)}${text(250,166,"More ions",rust,19)}
    ${line(160,112,180,187,ink,1.7)}${text(160,207,"Membrane protein",ink,19)}`,320,218);
  return compare(picture("Root hair in the soil", root, "Zoom in where the root hair takes up mineral ions."),
    picture("Across the cell membrane", membrane, "Energy from respiration allows the cell to move ions into the side with the higher concentration."));
}

function mitosis() {
  const chromosome = (x,y,paired) => line(x,y-11,x,y+11,violet,4) + line(x-3,y+1,x+3,y+1,ink,2) +
    (paired ? line(x+8,y-11,x+8,y+11,violet,4) + line(x+5,y+1,x+11,y+1,ink,2) : "");
  const nucleus = (x,y) => circle(x,y,28,"#ede5f3",violet,2);
  const cell = (x,y,r) => circle(x,y,r,"#e7f4eb",teal,2.5);
  return steps("From one cell to two", [
    ["Copy DNA", () => picture("The cell copies its DNA before mitosis",
      diagram("One original cell with a nucleus containing two matching copies of one chromosome.",
        cell(160,80,57)+nucleus(160,80)+chromosome(156,80,true)+text(160,157,"Two matching copies")), "One chromosome is shown as an example.")],
    ["Separate the copies", () => picture("Mitosis separates the chromosome copies",
      diagram("There is still one cell. Separate nuclei form, each around one copy of the chromosome.",
        `<ellipse cx="160" cy="80" rx="102" ry="53" fill="#e7f4eb" stroke="${teal}" stroke-width="2.5"/>`+
        nucleus(108,80)+nucleus(211,80)+chromosome(108,80,false)+chromosome(211,80,false)+text(160,158,"Two nuclei in one cell")),
      "Each new nucleus has one copy.")],
    ["Divide the cell", () => picture("Two genetically identical cells",
      diagram("Two separate cells, each with one nucleus and one matching copy of the chromosome.",
        cell(92,80,48)+cell(228,80,48)+nucleus(92,80)+nucleus(228,80)+chromosome(92,80,false)+chromosome(228,80,false)+text(160,156,"A full set of DNA in each cell")))]
  ]);
}

function atom(title, neutrons, shellCounts, note, highlightNeutron = false, lostElectron = false, protons = 11) {
  const centreX = 160, centreY = 120;
  const drawing = shellCounts.map((count, shell) => {
    const radius = 39 + shell * 32;
    return circle(centreX,centreY,radius,"none","#95acb2") + Array.from({length:count}, (_, index) => {
      const angle = -Math.PI / 2 + index * (2*Math.PI / count);
      const x = centreX + radius * Math.cos(angle), y = centreY + radius * Math.sin(angle);
      const outer = shell === shellCounts.length - 1;
      return circle(x,y,outer ? 6 : 4.5,outer && count === 1 ? "#edab65" : blue,outer && count === 1 ? rust : blue);
    }).join("");
  }).join("") + circle(centreX,centreY,34,"#e5eeef",teal,2) +
    text(160,114,protons + " p⁺",teal,21) + text(160,139,neutrons + " n",highlightNeutron ? rust : ink,21) +
    (lostElectron ? circle(160,17,6,"white",rust,2) + line(155,21,165,12,rust,2) : "");
  return picture(title,diagram(title + ". " + protons + " protons, " + neutrons + " neutrons, electron arrangement " + shellCounts.filter(Boolean).join(", ") + ".",drawing,320,229),note);
}

function atomicNumber() {
  const sodium23 = () => atom("Sodium-23 atom",12,[2,8,1],"11 electrons · no overall charge");
  return steps("Isotope and ion comparisons", [
    ["Change a neutron", () => compare(sodium23(),
      atom("Sodium-24 atom",13,[2,8,1],"One more neutron · still 11 protons",true))],
    ["Remove an electron", () => compare(sodium23(),
      atom("Sodium-23 ion",12,[2,8,0],"10 electrons · charge +1",false,true))]
  ]);
}

function groups() {
  const host = node("div");
  host.append(periodicOutline(), compare(
    atom("Lithium · 2, 1",4,[2,1],"One electron in the outer shell.",false,false,3),
    atom("Sodium · 2, 8, 1",12,[2,8,1],"One electron in the outer shell.")));
  return host;
}

function droppedBall() {
  const frames = [
    ["Held up",47,"Gravitational potential store of the ball and Earth."],
    ["Falling",91,"Energy transfers to the kinetic store as the ball speeds up."],
    ["At rest",132,"The ball and floor warm slightly. Some energy also transfers by sound."]
  ];
  return compare(...frames.map(([title,y,note],index) => picture(title,
    diagram("The same ball " + ["held above the ground","falling towards the ground","resting on the ground"][index] + ".", `
    <rect x="17" y="145" width="286" height="16" fill="#c4d6d4"/>${line(17,145,303,145,teal,2)}
    ${circle(160,y,13,"#e7aa64",rust,2.5)}
    ${index===0 ? '<path d="M20 64H144q10 0 10-9h-10V49H20" fill="#ebd3c3" stroke="#9d6a53" stroke-width="2"/>' : ""}
    ${index===1 ? arrow(198,72,198,126,blue,3.5) : ""}
    ${index===2 ? arrow(142,144,101,144,rust)+arrow(178,144,219,144,rust) : ""}`,320,174),note)));
}

function power() {
  function timeline(totals) {
    const panel = node("div", "", "catchup-clock");
    for (const [label, seconds, perSecond, total] of [["A",2,100,200],["B",10,50,500]]) {
      const row = node("div");
      const blocks = node("div", "", "catchup-clock-grid");
      blocks.setAttribute("role", "img");
      blocks.setAttribute("aria-label", seconds + " one-second blocks, each showing " + perSecond + " joules.");
      for (let i = 0; i < seconds; i++) {
        blocks.append(node("span", "", "catchup-clock-cell " + (perSecond === 100 ? "higher-rate" : "lower-rate")));
      }
      row.append(node("strong", label + " · " + perSecond + " W for " + seconds + " s"), blocks);
      if (totals) row.append(node("strong", perSecond + " J × " + seconds + " = " + total + " J"));
      panel.append(row);
    }
    const figure = node("figure", "", "catchup-picture");
    figure.append(panel,node("figcaption",totals ? "B transfers more energy in total because it runs for longer." :
      "Each block is one second. A taller block shows more energy transferred in that second."));
    return figure;
  }
  return steps("Joules each second", [["Compare the seconds", () => timeline(false)], ["Reveal both totals", () => timeline(true)]]);
}

function efficiencyNote() {
  return picture("Useful energy as a fraction of input", diagram(
    "A device receives 10 joules. Four joules are transferred usefully, and six joules are transferred in other ways. Four of ten equal blocks are highlighted.", `
    ${Array.from({length:10},(_,i)=>`<rect x="${20+i*28}" y="44" width="24" height="34" rx="2" fill="${i<4?'#a9d3c9':'#e9eeee'}" stroke="${i<4?teal:ink}"/>`).join("")}
    ${text(76,101,"4 J useful",teal,14)}${text(216,101,"6 J other",ink,14)}
    ${text(160,140,"10 J total input",ink,15)}`,320,160),
    "Read the four shaded blocks as 4 J out of 10 J supplied: the useful fraction is 4 ÷ 10 = 0.4, or 40%.");
}

function maintainedGradient() {
  const host = node("div");
  host.append(picture("Keeping oxygen moving into blood", diagram(
    "Air in an air sac has more oxygen than incoming blood. Ventilation refreshes the air and blood flow carries oxygen away. A net oxygen arrow points across the wall into the blood.", `
    <rect x="24" y="34" width="272" height="61" rx="7" fill="#e6f3fa" stroke="${teal}" stroke-width="2"/>
    <rect x="24" y="100" width="272" height="48" rx="7" fill="#f8e2de" stroke="${rust}" stroke-width="2"/>
    ${[[68,51],[105,66],[145,51],[190,66],[226,51],[262,67]].map(([x,y])=>circle(x,y,4,"white",blue)).join("")}
    ${[[67,116],[106,116]].map(([x,y])=>circle(x,y,4,"white",blue)).join("")}
    ${arrow(160,74,160,118,blue,3)}${arrow(195,124,270,124,rust,2.5)}
    ${text(160,22,"Air refreshed by breathing",blue,16)}${text(160,168,"Blood flows away",rust,16)}
    ${text(80,88,"More oxygen",ink,16)}${text(80,141,"Less oxygen",ink,16)}`,320,180),
    "Follow oxygen into the blood. Ventilation and blood flow help maintain a concentration difference; dots represent oxygen, not all particles present."));
  host.append(picture("Many small air spaces", diagram(
    "A model compares one spherical air space with four smaller spherical air spaces of the same total volume. The four small spheres have a greater total surface area.", `
    ${circle(70,90,39.685,"#e6f3fa",teal,2)}
    ${[[190,62],[244,62],[190,116],[244,116]].map(([x,y])=>circle(x,y,25,"#e6f3fa",teal,2)).join("")}
    ${text(70,29,"One space",ink,17)}${text(217,24,"Four smaller",ink,17)}
    ${text(160,160,"Same total volume",ink,17)}${text(160,181,"in this model",ink,17)}`,320,200),
    "Compare the boundaries. Dividing the same total volume into smaller spheres increases the total surface area. Air sacs are shown as simplified spheres."));
  return host;
}

export function year9OpeningSupplement(id) {
  return id === "energy-transfer" ? efficiencyNote() : id === "gas-exchange" ? maintainedGradient() : null;
}

function gasExchange() {
  return steps("Gas exchange at the lung surface", [
    ["Healthy air sac", () => airSac(true)],
    ["Make the barrier thicker", () => airSac(true,true)]
  ]);
}

function enzymes() {
  function example(changed, warm) {
    const solid = changed ? "M46 76H137l23 26 25-26h89v54q0 26-26 26H72q-26 0-26-26Z" :
      "M46 76H133v28h54V76h87v54q0 26-26 26H72q-26 0-26-26Z";
    return diagram(changed ? "The substrate keeps its shape. The active site is now a V-shaped recess and cannot fit the substrate."
      : "An orange rectangular substrate fits the rectangular pocket in a teal enzyme.", `
      <path d="${solid}" fill="#b6ded3" stroke="${teal}" stroke-width="2.5"/>
      <rect x="135" y="${changed ? 42 : 76}" width="50" height="26" rx="2" fill="#f5bc73" stroke="${rust}" stroke-width="2"/>
      ${text(changed ? 120 : 160,28,"Substrate",rust,20)}
      ${text(160,140,"Enzyme",teal,20)}
      ${changed ? text(250,48,"Active site",teal,20) + line(216,53,177,85,teal) : ""}
      ${warm ? arrow(109,65,129,82,rust)+arrow(211,65,191,82,rust) : ""}`);
  }
  return steps("How temperature changes enzyme activity", [
    ["Cool", () => picture("The substrate fits",example(false,false),"At a cool temperature there are fewer successful collisions each second.")],
    ["Warm gently", () => picture("Same shape, more successful collisions",example(false,true),"The particles move faster, so the reaction can speed up.")],
    ["Heat strongly", () => picture("The active site changes shape",example(true,false),"Fewer substrates can bind. This is denaturation.")]
  ]);
}

function conduction() {
  const solid = [[62,60],[117,60],[172,60],[227,60],[62,109],[117,109],[172,109],[227,109]];
  const liquid = [[57,60],[135,52],[202,75],[252,105],[79,110],[129,126],[175,108],[241,57]];
  function ions(title, points, moving) {
    const signs = [true,false,true,false,false,true,false,true];
    return picture(title, diagram(moving ?
      "Positive and negative ions are mixed. Positive ions move toward the negative electrode and negative ions move toward the positive electrode." :
      "Positive and negative ions form a regular lattice. They vibrate in position and do not move across the solid.", `
      ${moving ? line(22,35,22,136,ink,5)+line(294,35,294,136,ink,5)+text(22,25,"+")+text(294,25,"−") : ""}
      ${points.map(([x,y],i) => circle(x,y,13,signs[i] ? "#e7b783" : "#cce4f1",signs[i] ? rust : blue) + text(x,y+5,signs[i] ? "+" : "−",ink,19)).join("")}
      ${moving ? arrow(117,151,264,151,rust)+arrow(202,161,55,161,blue) : text(160,154,"Vibrate in fixed positions",teal,20)}
      `,320,179),moving ? "A voltage moves positive ions one way and negative ions the other." : "The ions have charge, but they cannot flow through the solid.");
  }
  return compare(ions("Solid salt",solid,false),ions("Molten salt",liquid,true));
}

function melting() {
  const fixed = [[83,53],[160,53],[237,53],[83,112],[160,112],[237,112]];
  const moving = [[74,68],[148,48],[219,71],[112,112],[184,113],[254,117]];
  function state(title, positions, liquid) {
    const molecule = ([x,y],index) => `<g ${index===1 ? `transform="rotate(${liquid ? 24 : 0} ${x} ${y})"` : ""}>
      ${line(x-14,y+12,x,y,blue,4)}${line(x,y,x+14,y+12,blue,4)}
      ${circle(x,y,12,"#e3a48e",rust)}${circle(x-14,y+12,6,"white",blue)}${circle(x+14,y+12,6,"white",blue)}
      ${index===1 ? `<ellipse cx="${x}" cy="${y+6}" rx="29" ry="24" fill="none" stroke="${teal}" stroke-width="2.5"/>` : ""}
      </g>`;
    return picture(title,diagram(liquid ?
      "Six complete water molecules are still close together in the liquid. The circled molecule has moved and still has its two blue bonds." :
      "Six complete water molecules occupy a fixed arrangement in ice. Dashed lines show attractions between molecules. Solid blue lines join atoms within each molecule.", `
      ${line(positions[0][0]+18,positions[0][1]+14,positions[3][0]-8,positions[3][1]-9,violet,2,"4 4")}
      ${line(positions[2][0],positions[2][1]+16,positions[5][0]-9,positions[5][1]-10,violet,2,"4 4")}
      ${positions.map(molecule).join("")}
      ${text(160,161,"Follow the circled molecule",teal,20)}`),liquid ? "The complete molecules can move past one another." : "Attractions hold molecules in a fixed arrangement overall.");
  }
  const panel = node("div");
  panel.append(compare(state("Ice",fixed,false),state("Liquid water",moving,true)),
    node("p","Solid blue lines join atoms within a molecule. Dashed lines show some attractions between molecules.","catchup-molecule-legend"));
  return panel;
}

const models = {
  "cell-structures": cells, osmosis, "active-transport": activeTransport, mitosis,
  "atomic-number": atomicNumber, "periodic-table": groups, "energy-stores": droppedBall,
  "energy-transfer": power, "gas-exchange": gasExchange, enzymes, "ionic-conduction": conduction,
  "molecular-melting": melting
};

export function year9Visual(id) {
  const region = node("div", "", "school-evidence-visual catchup-model");
  region.append(models[id]());
  return region;
}

export const osmosisQuestionDiagram = () => osmosis(true);

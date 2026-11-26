// Original schematic teaching diagrams. Colours distinguish features rather than
// representing their actual appearance; the drawings are not to scale.
import { arrow, blue, circle, diagram, ink, line, picture, rust, teal, text } from "./catchup-models.js";

function antibody() {
  return picture("Antibody and antigen", diagram(
    "A simplified Y-shaped antibody has binding sites at its tips. One tip fits an antigen on the surface of a pathogen; a different-shaped antigen does not fit.",
    '<path d="M116 121 L116 85 L79 48 M116 85 L153 48" fill="none" stroke="'+blue+'" stroke-width="13" stroke-linecap="round"/>' +
    '<path d="M72 43 L79 50 L86 43 M146 43 L153 50 L160 43" fill="none" stroke="'+blue+'" stroke-width="4"/>' +
    '<path d="M57 35 L79 35 L79 44 L86 37 L93 44 L93 35 L113 35" fill="none" stroke="'+rust+'" stroke-width="4"/>' +
    text(190,25,"Antigen on pathogen",rust,14) + line(168,29,104,35,rust,1.5) +
    text(116,151,"Antibody",blue,16) + text(240,82,"Different shape",ink,14) +
    '<path d="M216 49 Q226 31 236 49" fill="none" stroke="'+rust+'" stroke-width="4"/>' +
    text(240,104,"does not fit",ink,14), 320, 165),
    "Notice how a binding site fits a particular antigen. The shapes are simplified.");
}

function melting() {
  const solid = [[43,53],[62,53],[81,53],[43,72],[62,72],[81,72],[43,91],[62,91],[81,91]];
  const liquid = [[224,53],[243,49],[265,57],[218,75],[239,69],[259,78],[221,96],[242,92],[264,98]];
  const dots = points => points.map(([x,y]) => circle(x,y,6,"#9bd3cd",teal)).join("");
  return picture("Particles during melting", diagram(
    "A solid is shown with particles in an ordered arrangement. A liquid is shown with the same number of particles close together but in a less ordered arrangement. An arrow indicates melting as energy is supplied.",
    text(62,25,"Solid",ink,16)+text(241,25,"Liquid",ink,16)+dots(solid)+dots(liquid)+
    arrow(111,75,194,75,rust)+text(153,61,"Energy in",rust,14)+text(153,101,"Melting",ink,14),320,125),
    "Compare the arrangements: the particles stay the same size. The model does not show their continuous movement.");
}

function ions() {
  return picture("Ions move to electrodes", diagram(
    "In a molten ionic compound, positive ions move toward the negative electrode and negative ions move toward the positive electrode. The diagram shows ion movement, not electron movement through the liquid.",
    '<path d="M42 38 V142 H278 V38" fill="none" stroke="'+ink+'" stroke-width="2.5"/>' +
    '<path d="M44 70 H276 V140 H44 Z" fill="#e6f3f1"/>' +
    '<rect x="75" y="38" width="14" height="83" fill="#6d8588"/><rect x="231" y="38" width="14" height="83" fill="#6d8588"/>' +
    text(82,25,"−",blue,22)+text(238,25,"+",rust,22)+
    circle(136,97,12,"#dceafa",blue)+text(136,102,"+",blue,16)+arrow(121,97,96,97,blue)+
    circle(184,97,12,"#fae6da",rust)+text(184,102,"−",rust,16)+arrow(199,97,225,97,rust)+
    text(82,162,"Negative electrode",blue,13)+text(238,162,"Positive electrode",rust,13),320,175),
    "Follow each ion towards the electrode with the opposite charge. The ions must be free to move.");
}

function junction() {
  return picture("Current at a junction", diagram(
    "A current of 0.5 amperes enters a junction; 0.2 amperes and 0.3 amperes leave along two branches. The entering current equals the sum of the leaving currents.",
    arrow(20,80,143,80,blue,3)+circle(150,80,4,ink)+arrow(154,77,270,35,blue,3)+arrow(154,83,270,125,blue,3)+
    text(72,62,"0.5 A in",blue,16)+text(245,22,"0.2 A out",blue,16)+text(245,150,"0.3 A out",blue,16),320,165),
    "At the junction, 0.5 A in equals 0.2 A + 0.3 A out. The arrows show conventional current.");
}

function carbonCycle() {
  return picture("Carbon in a simple ecosystem", diagram(
    "Carbon dioxide in air is taken into plants by photosynthesis. Feeding transfers carbon from plants to animals. Plant and animal respiration return carbon dioxide to air. Dead material passes to decomposers, whose respiration also returns carbon dioxide to air.",
    text(160,23,"Carbon dioxide in air",blue,16)+text(58,92,"Plants",teal,16)+text(260,92,"Animals",rust,16)+text(160,162,"Decomposers",ink,16)+
    arrow(107,32,61,69,teal)+text(29,47,"Photo-",teal,12)+text(29,61,"synthesis",teal,12)+
    arrow(91,86,224,86,ink)+text(158,76,"Feeding",ink,14)+
    arrow(92,70,135,32,blue)+arrow(223,68,182,32,blue)+
    arrow(70,103,129,145,ink)+arrow(249,103,191,145,ink)+text(160,119,"Dead material",ink,13)+
    '<path d="M160 169 C311 220 320 61 245 31" fill="none" stroke="'+blue+'" stroke-width="2.5"/>'+
    arrow(255,35,245,31,blue)+text(265,184,"Respiration",blue,12),320,200),
    "Follow the arrows as carbon moves through organisms. Respiration by plants, animals and decomposers returns carbon dioxide to the air. This is a simplified cycle.");
}

function moltenSalt() {
  return picture("Molten sodium chloride", diagram(
    "Molten sodium chloride contains mobile sodium and chloride ions. Sodium ions move to the negative electrode, where sodium forms. Chloride ions move to the positive electrode, where chlorine gas forms.",
    '<path d="M42 42 V145 H278 V42" fill="none" stroke="'+ink+'" stroke-width="2.5"/>'+
    '<path d="M44 74 H276 V143 H44 Z" fill="#e6f3f1"/>'+
    '<rect x="75" y="40" width="14" height="85" fill="#6d8588"/><rect x="231" y="40" width="14" height="85" fill="#6d8588"/>'+
    text(82,27,"−",blue,21)+text(238,27,"+",rust,21)+
    text(122,99,"Na⁺",blue,15)+arrow(105,95,91,95,blue)+
    text(193,99,"Cl⁻",rust,15)+arrow(210,95,229,95,rust)+
    text(83,164,"Sodium",blue,15)+text(237,164,"Chlorine gas",rust,15),320,178),
    "Follow each ion to its electrode and the substance formed. This is molten salt, with no water present.");
}

function resultantForces() {
  const object = (y) => '<rect x="135" y="'+(y-15)+'" width="50" height="30" rx="5" fill="#dcebea" stroke="'+ink+'" stroke-width="2"/>';
  return picture("Forces on an object moving right", diagram(
    "Two views of an object moving to the right. In the first, forces of 40 newtons left and 40 newtons right balance and its velocity is constant. In the second, forces of 40 newtons left and 20 newtons right give a resultant of 20 newtons left, so it slows down while moving right.",
    text(160,22,"Moving right →",ink,15)+object(64)+arrow(135,64,35,64,blue,3)+arrow(185,64,285,64,blue,3)+
    text(60,50,"40 N",blue,15)+text(260,50,"40 N",blue,15)+text(160,100,"Resultant 0 N: constant velocity",ink,14)+
    text(160,130,"Moving right →",ink,15)+object(169)+arrow(135,169,35,169,blue,3)+arrow(185,169,235,169,blue,3)+
    text(60,155,"40 N",blue,15)+text(255,155,"20 N",blue,15)+text(160,207,"Resultant 20 N left: slowing down",ink,14),320,220),
    "Compare the force arrows, then the direction of motion. A force opposite to motion causes the moving object to slow down initially.");
}

function photosynthesis() {
  return picture("Inputs and products of photosynthesis", diagram(
    "Carbon dioxide from the air and water enter a plant. Light is absorbed by chlorophyll. Photosynthesis makes glucose in the plant and releases oxygen.",
    '<path d="M150 135 C100 118 100 56 160 40 C220 56 220 118 170 135 Z" fill="#d6edda" stroke="'+teal+'" stroke-width="2.5"/>'+
    line(160,138,160,59,teal,2)+line(160,100,131,79,teal,1.5)+line(160,91,190,72,teal,1.5)+
    text(160,20,"Light",rust,15)+arrow(160,25,160,48,rust)+
    text(45,64,"Carbon",blue,14)+text(45,80,"dioxide",blue,14)+arrow(67,88,123,99,blue)+
    text(47,133,"Water",blue,14)+arrow(73,128,129,121,blue)+
    arrow(198,98,246,82,teal)+text(269,80,"Oxygen",teal,14)+
    '<rect x="126" y="105" width="68" height="20" rx="3" fill="#f7fcf7"/>'+text(160,120,"Glucose",teal,14),320,158),
    "Follow the inputs into the leaf. Oxygen leaves; glucose made in the leaf can be used, stored or transported.");
}

function formulaMass() {
  return picture("Count atoms in carbon dioxide", diagram(
    "A carbon dioxide molecule has one carbon atom between two oxygen atoms. Its relative formula mass is 12 plus two times 16, which equals 44.",
    circle(73,63,26,"#f5d9cd",rust)+text(73,69,"O",rust,19)+line(99,58,130,58)+line(99,67,130,67)+
    circle(160,63,26,"#dde9ef",blue)+text(160,69,"C",blue,19)+line(186,58,217,58)+line(186,67,217,67)+
    circle(247,63,26,"#f5d9cd",rust)+text(247,69,"O",rust,19)+
    text(73,111,"16",rust,16)+text(160,111,"12",blue,16)+text(247,111,"16",rust,16)+
    text(160,145,"12 + 2 × 16 = 44",ink,17),320,163),
    "Count one carbon and two oxygen atoms. The circles are a model, not their actual size or colour.");
}

function glucoseControl() {
  return picture("Response to a rise in blood glucose", diagram(
    "After a meal blood glucose rises. The pancreas releases insulin, which acts on body cells and the liver. Cells take up glucose and the liver and muscles store glucose as glycogen; blood glucose falls towards its normal level.",
    text(160,22,"Blood glucose rises",rust,16)+arrow(160,28,160,53,ink)+
    text(160,72,"Pancreas releases insulin",ink,16)+arrow(160,79,160,103,ink)+
    text(160,123,"Body cells take up glucose",teal,15)+text(160,143,"Liver and muscles store glycogen",teal,15)+
    arrow(160,150,160,175,ink)+text(160,195,"Blood glucose falls",blue,16),320,213),
    "Follow the response from the rise in glucose to its return towards the normal range.");
}

function gasPressure() {
  const points = [[30,52],[72,44],[112,61],[43,99],[95,108],[132,92]];
  const panel = (offset, length) => {
    const particles = points.map(([x,y],i) => {
      const dx = i % 2 ? -length : length;
      return circle(x+offset,y,5,"#c2dfed",blue)+arrow(x+offset,y,x+offset+dx,y,blue,1.2);
    }).join("");
    return '<rect x="'+(10+offset)+'" y="28" width="140" height="105" fill="none" stroke="'+ink+'" stroke-width="2"/>'+particles;
  };
  return picture("Gas in the same rigid container", diagram(
    "Two containers of equal volume contain the same number of gas particles. The arrows in the warmer container are longer, representing higher average particle speed. Faster particles collide with the walls more often and transfer more momentum per collision.",
    panel(0,8)+panel(160,17)+text(80,157,"Cooler",ink,16)+text(240,157,"Warmer",ink,16),320,174),
    "Compare the motion arrows. Particle number, particle size and container volume stay the same; particles move in many directions in a real gas.");
}

export const gcseStepVisuals = {
  "vaccine-memory": {0: antibody},
  "latent-heat": {1: melting},
  "salt-electrolysis": {0: ions, 1: moltenSalt},
  "parallel-circuits": {1: junction},
  "carbon-cycling": {0: carbonCycle, 1: carbonCycle},
  "forces-motion": {0: resultantForces, 1: resultantForces},
  "photosynthesis-limits": {0: photosynthesis},
  "mass-conservation": {1: formulaMass},
  "glucose-control": {1: glucoseControl},
  "density-and-gas-pressure": {1: gasPressure}
};

/* Original compact diagrams for selected A-level energy and response passages. */
(function () {
 "use strict";
 const figures = {
  "a5/lightdep/0": {
   title: "Where light excites chlorophyll",
   alt: "A chloroplast contains stroma and a stack of thylakoids. In a thylakoid membrane, chlorophyll absorbs light and loses an excited electron. The light-independent reaction occurs in the surrounding stroma.",
   caption: "Locate the thylakoid membrane, then follow the electron lost from light-excited chlorophyll. The drawing is a simplified section and is not to scale.",
   art: `<ellipse cx="150" cy="132" rx="126" ry="101" fill="#ecf4e9" stroke="#538066" stroke-width="3"/><text x="150" y="59" text-anchor="middle">Stroma</text><g fill="#b4d7bd" stroke="#32776d" stroke-width="3"><rect x="77" y="87" width="146" height="24" rx="12"/><rect x="77" y="113" width="146" height="24" rx="12"/><rect x="77" y="139" width="146" height="24" rx="12"/></g><text x="150" y="193" text-anchor="middle">Thylakoid stack</text><path d="M32 70l58 17m-8-6 8 6-9 1M96 87h88m-7-7 7 7-7 7" fill="none" stroke="#a76125" stroke-width="3"/><text x="22" y="61">Light</text><text x="191" y="84">e⁻</text><text x="150" y="257" text-anchor="middle">Chlorophyll in membrane</text>`
  },
  "a5/lightdep/1": {
   title: "Water supplies replacement electrons",
   alt: "In the light-dependent reaction, water is split by photolysis into protons, electrons and oxygen. Electrons replace those lost from chlorophyll; the light-dependent reactions also produce ATP and reduced NADP.",
   caption: "Follow the electrons from water to replace those lost from chlorophyll. Protons and oxygen are also produced; ATP and reduced NADP arise in the wider light-dependent reaction.",
   art: `<text x="150" y="30" text-anchor="middle">Water: 2 H₂O</text><text x="150" y="57" text-anchor="middle">photolysis</text><path d="M150 65v32m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="124" text-anchor="middle">4 H⁺  +  4 e⁻  +  O₂</text><path d="M150 134v31m-6-7 6 7 6-7" stroke="#32776d" stroke-width="3" fill="none"/><text x="150" y="189" text-anchor="middle">Electrons replace those</text><text x="150" y="212" text-anchor="middle">lost from chlorophyll</text><text x="150" y="253" text-anchor="middle">Wider reaction: ATP + reduced NADP</text>`
  },
  "a5/chemios/0": {
   title: "Electron transfer builds a proton gradient",
   alt: "Electrons move along an electron transfer chain in a membrane. Energy released is used to pump protons from the low-proton side across the membrane to the high-proton side.",
   caption: "Follow the electrons along the chain and the pumped protons across the membrane. Energy released during electron transfer drives the pumping.",
   art: `<text x="150" y="25" text-anchor="middle">Higher H⁺ concentration</text><g fill="#a76125"><circle cx="65" cy="51" r="6"/><circle cx="95" cy="39" r="6"/><circle cx="136" cy="53" r="6"/><circle cx="184" cy="39" r="6"/><circle cx="229" cy="52" r="6"/></g><path d="M20 90h260M20 144h260" stroke="#32776d" stroke-width="5"/><rect x="74" y="84" width="64" height="66" rx="15" fill="#cbdcf0" stroke="#516eaa" stroke-width="3"/><rect x="170" y="84" width="60" height="66" rx="15" fill="#cbdcf0" stroke="#516eaa" stroke-width="3"/><path d="M42 117h213m-7-7 7 7-7 7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="179" text-anchor="middle">Electron transfer →</text><path d="M105 158V58m-6 7 6-7 6 7M200 158V58m-6 7 6-7 6 7" stroke="#a76125" stroke-width="3" fill="none"/><text x="150" y="215" text-anchor="middle">Lower H⁺ concentration</text><text x="150" y="247" text-anchor="middle">Membrane shown in section</text>`
  },
  "a5/chemios/1": {
   title: "Protons return through ATP synthase",
   alt: "Protons are at higher concentration on one side of a membrane. They flow down their electrochemical gradient through ATP synthase to the other side; ATP synthase produces ATP from ADP and inorganic phosphate.",
   caption: "Follow H⁺ through ATP synthase. In chloroplasts the high-proton side is the thylakoid space; in mitochondria it is the intermembrane space.",
   art: `<text x="150" y="26" text-anchor="middle">Higher H⁺ concentration</text><g fill="#a76125"><circle cx="77" cy="52" r="6"/><circle cx="110" cy="39" r="6"/><circle cx="150" cy="53" r="6"/><circle cx="190" cy="39" r="6"/><circle cx="222" cy="52" r="6"/></g><path d="M20 95h260M20 144h260" stroke="#32776d" stroke-width="5"/><rect x="115" y="85" width="70" height="73" rx="20" fill="#cbdcf0" stroke="#516eaa" stroke-width="3"/><path d="M150 58v112m-7-7 7 7 7-7" stroke="#a76125" stroke-width="4" fill="none"/><text x="150" y="197" text-anchor="middle">ATP synthase</text><text x="150" y="222" text-anchor="middle">ADP + Pi → ATP</text><text x="150" y="255" text-anchor="middle">Lower H⁺ concentration</text>`
  },
  "a5/calvin/0": {
   title: "Carbon fixation in the stroma",
   alt: "In the stroma, one carbon dioxide molecule combines with one five-carbon RuBP molecule in a reaction catalysed by rubisco. The unstable six-carbon product forms two three-carbon glycerate 3-phosphate molecules.",
   caption: "Count the carbons: carbon dioxide adds one to five-carbon RuBP; the unstable six-carbon product splits into two three-carbon GP molecules.",
   art: `<text x="150" y="25" text-anchor="middle">Stroma · carbon fixation</text><text x="76" y="62" text-anchor="middle">CO₂</text><text x="76" y="84" text-anchor="middle">1 carbon</text><text x="208" y="62" text-anchor="middle">RuBP</text><text x="208" y="84" text-anchor="middle">5 carbons</text><path d="M78 94l54 36M207 94l-54 36" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="152" text-anchor="middle">Unstable 6-carbon product</text><path d="M150 160v25m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="211" text-anchor="middle">2 GP molecules</text><text x="150" y="237" text-anchor="middle">3 carbons each</text><text x="150" y="267" text-anchor="middle">Rubisco catalyses fixation</text>`
  },
  "a5/calvin/1": {
   title: "Reduction and regeneration",
   alt: "Glycerate 3-phosphate is reduced to triose phosphate using ATP and reduced NADP. Some triose phosphate contributes to organic products; some regenerates RuBP using ATP, allowing the cycle to continue.",
   caption: "Follow GP to triose phosphate, then compare its two destinations: useful organic products and RuBP regeneration. The diagram shows relationships rather than molecule counts.",
   art: `<text x="150" y="26" text-anchor="middle">Glycerate 3-phosphate</text><path d="M150 37v36m-6-7 6 7 6-7" stroke="#32776d" stroke-width="3" fill="none"/><text x="165" y="53">ATP +</text><text x="165" y="73">reduced NADP</text><text x="150" y="96" text-anchor="middle">Triose phosphate</text><path d="M150 108v29M150 137l-70 37M150 137l70 37m-9-1 9 1-4-9M89 173l-9 1 4-9" stroke="#344958" stroke-width="3" fill="none"/><text x="73" y="197" text-anchor="middle">Organic</text><text x="73" y="218" text-anchor="middle">products</text><text x="225" y="197" text-anchor="middle">RuBP</text><text x="225" y="218" text-anchor="middle">regenerated</text><text x="225" y="240" text-anchor="middle">using ATP</text>`
  },
  "a5/calvin/2": {
   title: "Following carbon through the cycle",
   height: 320,
   alt: "Three molecules of carbon dioxide combine with three five-carbon RuBP molecules to make six three-carbon GP molecules. These are reduced to six three-carbon TP. Five TP regenerate three RuBP; one TP is a net output. Two net TP together contain six carbons for a carbohydrate through further reactions.",
   caption: "Count the carbon atoms: six three-carbon TP contain 18 carbons. Five TP regenerate three five-carbon RuBP; one TP is a net output. Two net TP contain six carbons for further carbohydrate synthesis.",
   art: `<text x="150" y="24" text-anchor="middle">3 CO₂ + 3 RuBP (5C)</text><path d="M150 34v23m-6-7 6 7 6-7" stroke="#344958" stroke-width="2" fill="none"/><text x="150" y="82" text-anchor="middle">6 GP (3C)</text><path d="M150 91v24m-6-7 6 7 6-7" stroke="#344958" stroke-width="2" fill="none"/><text x="150" y="141" text-anchor="middle">6 TP (3C)</text><path d="M150 150v18M150 167l-65 35M150 167l65 35m-9-1 9 1-4-8M94 201l-9 1 4-8" stroke="#344958" stroke-width="2" fill="none"/><text x="75" y="225" text-anchor="middle">5 TP →</text><text x="75" y="247" text-anchor="middle">3 RuBP</text><text x="225" y="225" text-anchor="middle">1 TP →</text><text x="225" y="247" text-anchor="middle">net output</text><text x="75" y="270" text-anchor="middle">uses ATP</text><text x="150" y="305" text-anchor="middle">2 net TP provide 6 carbons</text>`
  },
  "a5/krebs/0": {
   title: "The link reaction",
   alt: "In the mitochondrial matrix, pyruvate with three carbons is oxidised. One carbon is released as carbon dioxide, NAD is reduced, and the remaining two-carbon acetate combines with coenzyme A to form acetyl coenzyme A.",
   caption: "Count carbons in the link reaction: three enter in pyruvate, one leaves as carbon dioxide, and two enter acetyl coenzyme A. NAD is reduced.",
   art: `<text x="150" y="25" text-anchor="middle">Mitochondrial matrix</text><text x="150" y="58" text-anchor="middle">Pyruvate · 3 carbons</text><path d="M150 68v38m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="130" text-anchor="middle">Acetate · 2 carbons</text><text x="150" y="154" text-anchor="middle">+ coenzyme A</text><text x="150" y="181" text-anchor="middle">↓</text><text x="150" y="206" text-anchor="middle">Acetyl coenzyme A</text><text x="150" y="241" text-anchor="middle">CO₂ released · NAD reduced</text>`
  },
  "a5/krebs/1": {
   title: "A turn of the Krebs cycle",
   alt: "A two-carbon acetyl group combines with a four-carbon compound to make a six-carbon compound. Reactions release carbon dioxide and regenerate the four-carbon compound; reduced coenzymes and ATP are produced.",
   caption: "Follow the carbon skeleton: a two-carbon acetyl group joins a four-carbon compound. Reactions regenerate the four-carbon compound, allowing another turn.",
   art: `<text x="150" y="28" text-anchor="middle">Acetyl group · 2C</text><text x="150" y="53" text-anchor="middle">+ 4-carbon compound</text><path d="M150 64v29m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="117" text-anchor="middle">6-carbon compound</text><path d="M150 129v29m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="183" text-anchor="middle">4-carbon compound</text><path d="M230 171q54-58 0-93m3 10-3-10 10 3" stroke="#32776d" stroke-width="3" fill="none"/><text x="150" y="222" text-anchor="middle">CO₂ released</text><text x="150" y="246" text-anchor="middle">Reduced coenzymes + ATP</text>`
  },
  "a6/speed/0": {
   title: "Conduction along a myelinated axon",
   alt: "An axon is covered by myelin sheath segments, separated by nodes of Ranvier. Depolarisation occurs at nodes and local current carries the effect to the next node; arrows indicate propagation along the axon.",
   caption: "Follow propagation between the exposed nodes of Ranvier. Local current brings the next node to threshold; the impulse is regenerated at each node.",
   art: `<text x="150" y="26" text-anchor="middle">Direction of propagation →</text><path d="M20 123h260" stroke="#c47d49" stroke-width="17"/><g fill="#c9dcef" stroke="#516eaa" stroke-width="2"><rect x="20" y="94" width="45" height="58" rx="18"/><rect x="88" y="94" width="45" height="58" rx="18"/><rect x="156" y="94" width="45" height="58" rx="18"/><rect x="224" y="94" width="45" height="58" rx="18"/></g><path d="M76 81q34-35 68 0m-9-5 9 5-3-10M144 81q34-35 68 0m-9-5 9 5-3-10" stroke="#344958" stroke-width="3" fill="none"/><path d="M76 154v30M144 154v30M212 154v30" stroke="#344958" stroke-width="2"/><text x="140" y="207" text-anchor="middle">Nodes of Ranvier</text><text x="150" y="245" text-anchor="middle">Segments are myelin sheaths</text>`
  },
  "a6/adh/0": {
   title: "When blood water potential falls",
   alt: "A more negative blood water potential is detected by the hypothalamus. ADH is made in the hypothalamus and more is released into the blood from the posterior pituitary.",
   caption: "Follow the response to a more negative blood water potential. ADH is made in the hypothalamus and released into the blood from the posterior pituitary.",
   art: `<text x="150" y="24" text-anchor="middle">Blood water potential falls</text><path d="M150 33v24m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><path d="M45 119q-8-47 40-55q27-24 57-7q38-12 63 11q46 2 51 44q5 33-26 44H68q-26-10-23-37Z" fill="#e3edf5" stroke="#537a94" stroke-width="3"/><circle cx="150" cy="126" r="9" fill="#a76125"/><path d="M150 135v30q0 20 17 20" stroke="#537a94" stroke-width="5" fill="none"/><ellipse cx="171" cy="190" rx="15" ry="12" fill="#f1c48d" stroke="#a5792e" stroke-width="3"/><text x="150" y="92" text-anchor="middle">Hypothalamus</text><text x="150" y="113" text-anchor="middle">makes ADH</text><text x="150" y="225" text-anchor="middle">Posterior pituitary</text><text x="150" y="248" text-anchor="middle">releases ADH into blood</text>`
  },
  "a6/adh/1": {
   title: "ADH changes water permeability",
   alt: "ADH in blood acts on cells of the collecting duct. More ADH increases water permeability, so more water moves by osmosis from the duct toward the surrounding tissue and blood. Urine volume falls and the urine is more concentrated.",
   caption: "Follow the water from the duct towards blood. ADH changes permeability; water moves by osmosis, rather than being pumped by ADH.",
   art: `<text x="150" y="25" text-anchor="middle">More ADH in blood</text><path d="M150 34v25m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="84" text-anchor="middle">Collecting duct</text><path d="M84 101v119M205 101v119" stroke="#537a94" stroke-width="5"/><text x="145" y="135" text-anchor="middle">Duct fluid</text><path d="M154 157h96m-7-7 7 7-7 7" stroke="#32776d" stroke-width="3" fill="none"/><text x="231" y="140" text-anchor="middle">Water</text><text x="236" y="187" text-anchor="middle">To blood</text><text x="150" y="250" text-anchor="middle">Less urine · more concentrated</text>`
  }
 };
 window.ALevelEnergyMechanismFigures = {render(topic,id,group) {
  const f=figures[topic+"/"+id+"/"+group]; if(!f)return "";
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height || 290}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 }};
})();

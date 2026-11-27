/* Compact, original models of AQA A-level processes and practical methods. */
(function () {
 "use strict";
 const figures={
  "a5/limiting/0": {
   title:"Reading a limiting-factor curve",
   alt:"A schematic graph plots relative photosynthesis rate against light intensity. The line rises as light increases, then levels off. The graph has no numerical data and illustrates one set of conditions.",
   caption:"Read the rising section and the plateau. Under these conditions, increasing light no longer raises the rate at the plateau; another factor can limit it. This is a schematic, not experimental data.",
   art:`<path d="M60 32v186h211" stroke="#344958" stroke-width="2" fill="none"/><path d="M61 218C79 180 96 110 125 72S181 50 264 50" stroke="#32776d" stroke-width="4" fill="none"/><text x="20" y="124" text-anchor="middle" transform="rotate(-90 20 124)">Relative rate</text><text x="168" y="249" text-anchor="middle">Light intensity →</text><text x="154" y="37" text-anchor="middle">Plateau</text><text x="150" y="279" text-anchor="middle">Other conditions held constant</text>`
  },
  "a5/chromat/0": {
   title:"Preparing a leaf pigment spot",
   alt:"Leaves are ground with solvent in a mortar. The extract is applied in small spots to a pencil origin line on chromatography paper; the spot is dried between applications.",
   caption:"Follow the extract from crushed leaf to the origin line. Repeated small spots are dried between applications so the starting spot remains concentrated.",
   art:`<path d="M34 94q4 51 60 51t60-51Z" fill="#edf4ea" stroke="#537a94" stroke-width="3"/><path d="M80 100l52-48" stroke="#8b7460" stroke-width="8"/><path d="M60 112q19-21 34 0q-18 16-34 0Z" fill="#92be8e" stroke="#32776d" stroke-width="2"/><text x="94" y="172" text-anchor="middle">Grind leaf</text><text x="94" y="194" text-anchor="middle">with solvent</text><path d="M154 112h42m-7-6 7 6-7 6" stroke="#344958" stroke-width="3" fill="none"/><rect x="210" y="42" width="50" height="145" fill="#fff" stroke="#537a94" stroke-width="2"/><path d="M216 155h38" stroke="#596a68" stroke-width="2"/><circle cx="235" cy="155" r="4" fill="#458054"/><text x="235" y="214" text-anchor="middle">Spot on</text><text x="235" y="236" text-anchor="middle">pencil origin</text>`
  },
  "a5/chromat/1": {
   title:"Chromatography distances",
   alt:"A paper strip is shown after separation. A pencil origin line is above the earlier solvent level. The solvent front is near the top; a pigment spot lies between origin and front. Both distances are measured from the origin, to the centre of the spot and to the solvent front.",
   caption:"Measure both distances from the origin; use the centre of the spot. Rf is the spot distance divided by the solvent-front distance. The dashed solvent level shows its position at the start.",
   art:`<rect x="90" y="35" width="120" height="192" fill="#fff" stroke="#537a94" stroke-width="2"/><path d="M97 63h106M97 198h106" stroke="#596a68" stroke-width="2"/><path d="M97 214h106" stroke="#a76125" stroke-width="2" stroke-dasharray="4 3"/><ellipse cx="150" cy="120" rx="15" ry="9" fill="#85b884" stroke="#32776d" stroke-width="2"/><path d="M116 198V120m-5 6 5-6 5 6M184 198V63m-5 6 5-6 5 6" stroke="#344958" stroke-width="2" fill="none"/><text x="47" y="67" text-anchor="middle">Front</text><text x="47" y="202" text-anchor="middle">Origin</text><text x="245" y="210" text-anchor="middle">Initial</text><text x="245" y="230" text-anchor="middle">solvent</text><text x="150" y="258" text-anchor="middle">Rf = spot distance ÷ front distance</text>`
  },
  "a5/dcpip/1": {
   title:"DCPIP accepts electrons",
   alt:"A schematic compares oxidised DCPIP, which is blue, with reduced DCPIP, which is colourless. Light-dependent electron transfer reduces the dye. A falling absorbance can be followed with a colorimeter; chlorophyll may leave the extract green.",
   caption:"Compare the dye before and after reduction. A colorimeter can follow loss of blue absorbance; the chloroplast suspension may still look green because of chlorophyll.",
   art:`<path d="M55 59v95q0 20 26 20t26-20V59" fill="#81afd2" stroke="#537a94" stroke-width="3"/><path d="M193 59v95q0 20 26 20t26-20V59" fill="#fff" stroke="#537a94" stroke-width="3"/><path d="M114 111h72m-7-6 7 6-7 6" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="91" text-anchor="middle">Electrons</text><text x="81" y="206" text-anchor="middle">Oxidised</text><text x="81" y="228" text-anchor="middle">blue</text><text x="219" y="206" text-anchor="middle">Reduced</text><text x="219" y="228" text-anchor="middle">colourless</text><text x="150" y="267" text-anchor="middle">Blue absorbance falls</text>`
  },
  "a5/oxphos/0": {
   title:"Electron transfer in a mitochondrion",
   alt:"At the inner mitochondrial membrane, reduced NAD supplies electrons to an electron transfer chain. Energy released by the chain drives proton pumping from the matrix into the intermembrane space.",
   caption:"Reduced NAD supplies electrons to the chain. Energy released during electron transfer drives proton pumping from matrix to intermembrane space. The section simplifies the chain; arrows show direction rather than rates.",
   art:`<text x="150" y="25" text-anchor="middle">Intermembrane space</text><g fill="#a76125"><circle cx="52" cy="47" r="5"/><circle cx="102" cy="39" r="5"/><circle cx="150" cy="50" r="5"/><circle cx="198" cy="39" r="5"/><circle cx="248" cy="47" r="5"/></g><path d="M20 82h260M20 140h260" stroke="#32776d" stroke-width="5"/><rect x="60" y="76" width="60" height="70" rx="15" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><rect x="180" y="76" width="60" height="70" rx="15" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><path d="M124 110h45m-8-7 8 7-8 7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="101" text-anchor="middle">e⁻</text><path d="M90 155V60m-6 7 6-7 6 7M210 155V60m-6 7 6-7 6 7" stroke="#a76125" stroke-width="3" fill="none"/><g fill="#a76125"><circle cx="40" cy="158" r="5"/><circle cx="260" cy="158" r="5"/></g><text x="150" y="185" text-anchor="middle">Reduced NAD supplies e⁻</text><text x="150" y="218" text-anchor="middle">Matrix</text><text x="150" y="253" text-anchor="middle">Inner mitochondrial membrane</text>`
  },
  "a5/oxphos/1": {
   title:"ATP synthesis and oxygen",
   alt:"Protons move from the intermembrane space into the mitochondrial matrix through ATP synthase, producing ATP from ADP and phosphate. At the end of the electron transfer chain, oxygen accepts electrons and combines with protons to form water.",
   caption:"Follow protons through ATP synthase to the matrix. Separately, oxygen accepts electrons at the end of the transfer chain and combines with protons to form water.",
   art:`<text x="150" y="25" text-anchor="middle">Intermembrane space · H⁺</text><g fill="#a76125"><circle cx="70" cy="52" r="5"/><circle cx="110" cy="46" r="5"/><circle cx="150" cy="52" r="5"/><circle cx="200" cy="46" r="5"/><circle cx="235" cy="52" r="5"/></g><path d="M20 85h260M20 134h260" stroke="#32776d" stroke-width="5"/><rect x="110" y="77" width="66" height="65" rx="18" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><path d="M143 60v95m-6-7 6 7 6-7" stroke="#a76125" stroke-width="3" fill="none"/><text x="143" y="182" text-anchor="middle">ATP synthase</text><text x="143" y="206" text-anchor="middle">ADP + Pi → ATP</text><text x="150" y="237" text-anchor="middle">O₂ + 4 e⁻ + 4 H⁺ → 2 H₂O</text><text x="150" y="266" text-anchor="middle">Matrix</text>`
  },
  "a5/respiro/1": {
   title:"A capillary respirometer",
   alt:"A sealed chamber contains organisms and a carbon-dioxide absorber separated from them. A capillary tube contains a liquid marker. As oxygen is consumed and carbon dioxide absorbed, the marker moves toward the chamber. A scale measures displacement.",
   caption:"Follow the marker toward the chamber as oxygen is taken up and carbon dioxide is absorbed. Keep temperature stable and use a matched control; this schematic is not a set of results.",
   art:`<rect x="25" y="82" width="114" height="120" rx="8" fill="#edf4ea" stroke="#537a94" stroke-width="3"/><g fill="#91bb89"><circle cx="50" cy="117" r="7"/><circle cx="75" cy="133" r="7"/><circle cx="105" cy="113" r="7"/></g><path d="M35 161h94" stroke="#537a94" stroke-width="2" stroke-dasharray="4 3"/><rect x="48" y="171" width="69" height="19" fill="#edd5ad" stroke="#a5792e" stroke-width="2"/><path d="M139 105h132M139 118h132" stroke="#537a94" stroke-width="3"/><rect x="214" y="105" width="10" height="13" fill="#a76125"/><path d="M207 89h-45m7-6-7 6 7 6" stroke="#a76125" stroke-width="3" fill="none"/><text x="211" y="71" text-anchor="middle">Marker</text><text x="82" y="231" text-anchor="middle">Organisms</text><text x="82" y="253" text-anchor="middle">CO₂ absorber below</text>`
  },
  "a5/biomass/1": {
   title:"Estimating energy in dry biomass",
   alt:"A dry biomass sample burns beneath a container of a known mass of water. A thermometer measures the water temperature rise. Heating of the surroundings means not all released energy reaches the water.",
   caption:"Follow heat from the burning dry sample to the water. Measure the water mass and temperature rise; heat loss means this is an estimate of the sample's energy store.",
   art:`<path d="M73 61v104q0 16 77 16t77-16V61Z" fill="#e3f1f6" stroke="#537a94" stroke-width="3"/><path d="M74 95h152" stroke="#537a94" stroke-width="2"/><path d="M176 34v93" stroke="#a76125" stroke-width="5"/><circle cx="176" cy="131" r="7" fill="#a76125"/><path d="M150 248q-28-20 0-50q28 30 0 50Z" fill="#e6a65f" stroke="#a76125" stroke-width="2"/><path d="M116 253h68" stroke="#596a68" stroke-width="3"/><text x="130" y="120" text-anchor="middle">Known mass</text><text x="130" y="141" text-anchor="middle">of water</text><text x="225" y="43" text-anchor="middle">Thermometer</text><text x="150" y="278" text-anchor="middle">Burn dry sample</text>`
  },
  "a5/productivity/0": {
   title:"Gross and net production",
   alt:"A bar representing gross primary production is split into two portions: respiratory losses and net primary production. The lengths are illustrative and contain no numerical data.",
   caption:"Compare the portions of gross primary production: after respiratory losses, net primary production remains. The bar illustrates the relationship, not a measured amount.",
   art:`<text x="150" y="30" text-anchor="middle">Gross primary production</text><rect x="29" y="58" width="242" height="52" fill="#d7e9d4" stroke="#32776d" stroke-width="2"/><text x="150" y="91" text-anchor="middle">GPP</text><path d="M150 117v26m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><rect x="29" y="156" width="156" height="52" fill="#c7e2ef" stroke="#537a94" stroke-width="2"/><rect x="185" y="156" width="86" height="52" fill="#f0d3bb" stroke="#a76125" stroke-width="2"/><text x="107" y="188" text-anchor="middle">NPP</text><text x="228" y="188" text-anchor="middle">R</text><text x="150" y="249" text-anchor="middle">NPP = GPP − respiration</text>`
  },
  "a5/fertil/1": {
   title:"Leaching and eutrophication",
   alt:"Rain washes soluble nitrate and phosphate from fertilised soil into water. Algal growth increases and reduces light for submerged plants. Dead material is decomposed; microbial respiration uses oxygen, so less dissolved oxygen is available to aerobic organisms.",
   caption:"Follow soluble ions from soil to water, then from algal growth to plant death. Decomposers respire as they break down dead material, reducing dissolved oxygen available to aerobic organisms.",
   art:`<path d="M25 50h102v38H25Z" fill="#e8dec9" stroke="#9a7043" stroke-width="2"/><path d="M37 20l-8 18M60 20l-8 18M83 20l-8 18" stroke="#537a94" stroke-width="3"/><text x="76" y="75" text-anchor="middle">Soil ions</text><path d="M128 70h40m-7-6 7 6-7 6" stroke="#344958" stroke-width="3" fill="none"/><path d="M169 50h106v38H169Z" fill="#d5edf1" stroke="#537a94" stroke-width="2"/><text x="222" y="75" text-anchor="middle">Water</text><text x="150" y="112" text-anchor="middle">Algal bloom → less light</text><text x="150" y="137" text-anchor="middle">↓</text><text x="150" y="162" text-anchor="middle">Plants die → decay</text><text x="150" y="187" text-anchor="middle">↓</text><text x="150" y="212" text-anchor="middle">Decomposers use oxygen</text><text x="150" y="237" text-anchor="middle">↓</text><text x="150" y="263" text-anchor="middle">Aerobic animals may die</text>`
  },
  "a6/loop/0": {
   title:"Building the medullary gradient",
   alt:"The loop of Henle descends into the medulla and ascends again. Sodium and chloride move out of the ascending limb, which is impermeable to water. This contributes to a more negative water potential in the medulla.",
   caption:"Follow ions out of the ascending limb. Its wall is impermeable to water; transport contributes to a more negative medullary water potential. The nephron is simplified.",
   art:`<text x="150" y="25" text-anchor="middle">Cortex</text><path d="M20 45h260" stroke="#d6e1de" stroke-width="2"/><path d="M74 67v132q0 37 40 37t40-37V67" stroke="#537a94" stroke-width="10" fill="none"/><path d="M74 85v56m-6-7 6 7 6-7M154 150V94m-6 7 6-7 6 7" stroke="#344958" stroke-width="3" fill="none"/><path d="M161 113h68m-7-6 7 6-7 6M161 168h68m-7-6 7 6-7 6" stroke="#a76125" stroke-width="3" fill="none"/><text x="225" y="95" text-anchor="middle">Na⁺ / Cl⁻</text><text x="225" y="145" text-anchor="middle">ions out</text><text x="150" y="272" text-anchor="middle">Medulla · ascending limb</text>`
  },
  "a6/loop/1": {
   title:"Water leaves in the medulla",
   alt:"Water moves by osmosis from the descending limb of the loop of Henle and from the collecting duct toward the surrounding medulla, whose water potential is more negative. Water reabsorbed from the collecting duct returns to the blood.",
   caption:"Follow water out of the descending limb and collecting duct into the medulla, then into the blood. Water crosses the tubule epithelium by osmosis; collecting-duct permeability is regulated.",
   art:`<text x="150" y="25" text-anchor="middle">Cortex</text><path d="M65 53v132q0 37 35 37t35-37V53M222 53v170" stroke="#537a94" stroke-width="10" fill="none"/><path d="M55 96H24m6-6-6 6 6 6M55 156H24m6-6-6 6 6 6M232 96h36m-7-6 7 6-7 6M232 156h36m-7-6 7 6-7 6" stroke="#32776d" stroke-width="3" fill="none"/><text x="41" y="83" text-anchor="middle">H₂O</text><text x="250" y="83" text-anchor="middle">H₂O</text><path d="M278 53v170" stroke="#a65f5b" stroke-width="8"/><text x="274" y="272" text-anchor="middle">Blood</text><text x="98" y="251" text-anchor="middle">Loop</text><text x="222" y="251" text-anchor="middle">Collecting</text><text x="222" y="272" text-anchor="middle">duct</text>`
  }
 };
 window.ALevelPracticalsFigures={render(topic,id,group){
  const f=figures[topic+"/"+id+"/"+group];if(!f)return "";
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 290" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 }};
})();

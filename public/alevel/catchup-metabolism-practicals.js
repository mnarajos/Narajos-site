/* Original compact models for practicals, nutrients and metabolic pathways. */
(function () {
 "use strict";
 const figures={
  "a5/dcpip/0": [{
   title:"Preparing a chloroplast extract",
   alt:"Leaves are ground in a cold, isotonic, buffered solution. The mixture is filtered to remove larger debris, leaving a chloroplast-containing extract. Centrifugation can be used to enrich the chloroplast fraction.",
   caption:"Follow the preparation from leaves to filtered extract. The solution is cold, isotonic and buffered; centrifugation can then enrich the chloroplast fraction.",
   art:`<path d="M24 88q4 54 61 54t61-54Z" fill="#edf4ea" stroke="#537a94" stroke-width="3"/><path d="M73 100l47-52" stroke="#9a7043" stroke-width="8"/><path d="M55 110q20-20 36 0q-18 15-36 0Z" fill="#92be8e" stroke="#32776d" stroke-width="2"/><path d="M150 105h41m-7-6 7 6-7 6" stroke="#344958" stroke-width="3" fill="none"/><path d="M200 57h62l-25 45v57m-12-57-25-45" fill="#f8faf9" stroke="#537a94" stroke-width="3"/><path d="M210 85h42" stroke="#32776d" stroke-width="2"/><path d="M220 166v42q0 10 17 10t17-10v-42" fill="#dcefdc" stroke="#537a94" stroke-width="2"/><text x="84" y="177" text-anchor="middle">Grind leaves</text><text x="84" y="200" text-anchor="middle">cold, isotonic,</text><text x="84" y="222" text-anchor="middle">buffered</text><text x="237" y="245" text-anchor="middle">Filter</text>`
  }],
  "a5/respiro/0": [{
   title:"Following reduction of methylene blue",
   alt:"Yeast and methylene blue are shown before and at a colourless endpoint. Respiring yeast reduces the indicator. With the same dye quantity and endpoint, one divided by the elapsed time can compare rates.",
   caption:"Follow the blue indicator to its colourless endpoint. For the same dye amount and endpoint, compare rates using 1 ÷ time; no measured times are shown.",
   art:`<path d="M55 58v96q0 20 26 20t26-20V58" fill="#8fbada" stroke="#537a94" stroke-width="3"/><path d="M193 58v96q0 20 26 20t26-20V58" fill="#fff" stroke="#537a94" stroke-width="3"/><g fill="#b2ae8c"><circle cx="70" cy="138" r="5"/><circle cx="90" cy="150" r="5"/><circle cx="210" cy="138" r="5"/><circle cx="230" cy="150" r="5"/></g><path d="M113 108h74m-7-6 7 6-7 6" stroke="#344958" stroke-width="3" fill="none"/><text x="81" y="205" text-anchor="middle">Blue</text><text x="219" y="205" text-anchor="middle">Colourless</text><text x="150" y="245" text-anchor="middle">Yeast reduces indicator</text><text x="150" y="270" text-anchor="middle">Relative rate = 1 ÷ time</text>`
  }],
  "a5/substrates/0": [{
   title:"Respiring lipid breakdown products",
   alt:"A triglyceride is hydrolysed to glycerol and fatty acids. Glycerol can enter glycolysis; fatty acids are broken into two-carbon fragments that form acetyl coenzyme A, which enters the Krebs cycle.",
   caption:"Follow the products separately: fatty acids provide two-carbon fragments for acetyl coenzyme A; glycerol can enter glycolysis. The molecule is schematic, not a structural formula.",
   art:`<text x="150" y="26" text-anchor="middle">Triglyceride</text><path d="M85 49v59M85 58h111M85 78h111M85 98h111" stroke="#a76125" stroke-width="5"/><path d="M150 118v19M150 137l-67 17m8-6-8 6 9 2M150 137l67 17m-9 2 9-2-8-6" stroke="#344958" stroke-width="3" fill="none"/><text x="73" y="172" text-anchor="middle">Glycerol</text><text x="223" y="172" text-anchor="middle">Fatty acids</text><path d="M73 181v23m-6-6 6 6 6-6M223 181v23m-6-6 6 6 6-6" stroke="#344958" stroke-width="3" fill="none"/><text x="73" y="229" text-anchor="middle">Glycolysis</text><text x="223" y="229" text-anchor="middle">Acetyl CoA</text><text x="223" y="252" text-anchor="middle">→ Krebs cycle</text>`
  }],
  "a5/substrates/1": [{
   title:"Using amino acids in respiration",
   alt:"An amino acid has its amino group removed by deamination. The remaining carbon-containing skeleton can enter respiratory pathways, including the Krebs cycle.",
   caption:"Follow the amino acid after removal of its amino group. The remaining carbon skeleton can feed into respiratory pathways; the drawing is a simplified model.",
   art:`<text x="150" y="26" text-anchor="middle">Amino acid</text><path d="M112 65h82" stroke="#344958" stroke-width="3"/><circle cx="112" cy="65" r="17" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><circle cx="157" cy="65" r="17" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><circle cx="194" cy="65" r="17" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><text x="150" y="113" text-anchor="middle">Deamination</text><path d="M112 121l-44 50m7-3-7 3 1-8M176 121l36 50m-8-4 8 4-1-9" stroke="#344958" stroke-width="3" fill="none"/><circle cx="61" cy="191" r="17" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><circle cx="197" cy="191" r="17" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><circle cx="230" cy="191" r="17" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><text x="61" y="233" text-anchor="middle">Amino</text><text x="61" y="254" text-anchor="middle">group</text><text x="213" y="233" text-anchor="middle">Carbon</text><text x="213" y="254" text-anchor="middle">skeleton</text>`
  },{
   title:"Two uses of chemiosmosis",
   alt:"In a chloroplast, protons flow from the thylakoid space through ATP synthase into the stroma. In a mitochondrion, protons flow from the intermembrane space through ATP synthase into the matrix. ATP synthase produces ATP in each case. NADP is reduced in photosynthesis and NAD in respiration.",
   caption:"Compare the direction across each membrane: protons move through ATP synthase from the higher-concentration side. Photosynthesis reduces NADP; respiration reduces NAD. The diagrams simplify each membrane.",
   height:360,
   art:`<text x="150" y="25" text-anchor="middle">Chloroplast · NADP reduced</text><text x="150" y="52" text-anchor="middle">Thylakoid space · H⁺ high</text><path d="M20 85h260M20 110h260" stroke="#32776d" stroke-width="4"/><rect x="123" y="77" width="54" height="41" rx="10" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><path d="M150 62v72m-6-7 6 7 6-7" stroke="#a76125" stroke-width="3" fill="none"/><text x="231" y="103" text-anchor="middle">ATP synthase</text><text x="150" y="155" text-anchor="middle">Stroma · ATP made</text><path d="M25 176h250" stroke="#d6e1de" stroke-width="2"/><text x="150" y="199" text-anchor="middle">Mitochondrion · NAD reduced</text><text x="150" y="226" text-anchor="middle">Intermembrane space · H⁺ high</text><path d="M20 260h260M20 285h260" stroke="#32776d" stroke-width="4"/><rect x="123" y="252" width="54" height="41" rx="10" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><path d="M150 236v72m-6-7 6 7 6-7" stroke="#a76125" stroke-width="3" fill="none"/><text x="231" y="278" text-anchor="middle">ATP synthase</text><text x="150" y="333" text-anchor="middle">Matrix · ATP made</text>`
  }],
  "a5/biomass/0": [{
   title:"Carbon dioxide and plant biomass",
   alt:"Carbon dioxide enters a plant for photosynthesis. Some sugar made by photosynthesis is used in respiration; some contributes to synthesis of other organic molecules that form biomass.",
   caption:"Follow carbon dioxide into photosynthesis, then compare the destinations of the sugar made. Some is used in respiration and some forms biological molecules in plant biomass.",
   art:`<text x="150" y="25" text-anchor="middle">CO₂ from air or water</text><path d="M150 36v30m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><path d="M150 116V78m0 26q-24-1-25-20q23-2 25 20m0-12q23 0 23-20q-22-1-23 20" fill="#d7e9d4" stroke="#32776d" stroke-width="3"/><text x="150" y="144" text-anchor="middle">Photosynthesis → sugars</text><path d="M150 153v24M150 177l-70 29M150 177l70 29m-9 0 9 0-5-8M89 206h-9l5-8" stroke="#344958" stroke-width="3" fill="none"/><text x="75" y="233" text-anchor="middle">Respiration</text><text x="225" y="233" text-anchor="middle">Organic</text><text x="225" y="254" text-anchor="middle">biomass</text>`
  }],
  "a5/productivity/1": [{
   title:"Consumer energy budget",
   alt:"An illustrative energy bar for food ingested, I, is divided into net production, N, loss in faeces and urine, F, and respiratory losses, R. The bars have the same total length and contain no measured values.",
   caption:"Compare the same total energy store before and after partitioning. Net production is the ingested energy remaining after losses in faeces and urine and through respiration; the bar is illustrative.",
   art:`<text x="150" y="28" text-anchor="middle">Ingested food · I</text><rect x="30" y="53" width="240" height="51" fill="#d7e9d4" stroke="#32776d" stroke-width="2"/><text x="150" y="85" text-anchor="middle">I</text><path d="M150 112v25m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><rect x="30" y="151" width="120" height="51" fill="#c7e2ef" stroke="#537a94" stroke-width="2"/><rect x="150" y="151" width="60" height="51" fill="#f0d3bb" stroke="#a76125" stroke-width="2"/><rect x="210" y="151" width="60" height="51" fill="#e2d5e9" stroke="#80588f" stroke-width="2"/><text x="90" y="183" text-anchor="middle">N</text><text x="180" y="183" text-anchor="middle">F</text><text x="240" y="183" text-anchor="middle">R</text><text x="150" y="235" text-anchor="middle">N = I − (F + R)</text><text x="150" y="261" text-anchor="middle">F: faeces + urine · R: respiration</text>`
  }],
  "a5/fertil/0": [{
   title:"Replacing nutrients removed by harvest",
   alt:"Plants absorb nitrate and phosphate ions from soil. Harvesting crops removes these nutrients from the field. Fertilisers add nutrients back to the soil.",
   caption:"Follow nutrients from soil into crops and away in the harvest. Fertilisers replace ions; nutrients from organic material become available through decomposition, while soluble fertiliser ions can dissolve readily.",
   art:`<text x="150" y="24" text-anchor="middle">Crop removed at harvest →</text><path d="M151 149V62m0 60q-37-3-39-31q36-2 39 31m0-32q37 0 38-28q-36-1-38 28" fill="#d7e9d4" stroke="#32776d" stroke-width="4"/><path d="M20 157h260" stroke="#a76125" stroke-width="5"/><text x="150" y="190" text-anchor="middle">Soil: nitrate + phosphate</text><path d="M149 178v-18m-6 7 6-7 6 7M35 216V163m-6 7 6-7 6 7" stroke="#344958" stroke-width="3" fill="none"/><text x="85" y="236" text-anchor="middle">Fertiliser adds</text><text x="85" y="259" text-anchor="middle">nutrients</text>`
  }],
  "a6/glucal/0": [{
   title:"Heating glucose standards",
   alt:"Tubes with known glucose standards and quantitative Benedict's reagent stand in a hot water bath. Heating produces a precipitate as copper two ions are reduced; greater glucose leaves less blue copper two in solution.",
   caption:"Use a range of known glucose standards with the reagent and heat consistently. More glucose reduces more blue copper(II); the settled liquid is used for the colorimeter reading.",
   art:`<path d="M28 86v111q0 17 122 17t122-17V86" fill="#e3f1f6" stroke="#537a94" stroke-width="3"/><path d="M29 121h242" stroke="#537a94" stroke-width="2"/><g fill="#dceaf5" stroke="#537a94" stroke-width="2"><path d="M65 55v100q0 11 14 11t14-11V55Z"/><path d="M136 55v100q0 11 14 11t14-11V55Z"/><path d="M207 55v100q0 11 14 11t14-11V55Z"/></g><g fill="#fff" stroke="#9aabaa"><circle cx="76" cy="152" r="3"/><circle cx="147" cy="151" r="3"/><circle cx="218" cy="152" r="3"/></g><text x="150" y="28" text-anchor="middle">Standards + reagent</text><text x="150" y="243" text-anchor="middle">Hot water bath</text><text x="150" y="269" text-anchor="middle">Precipitate settles after heating</text>`
  }],
  "a6/glucal/1": [{
   title:"Reading a glucose calibration",
   alt:"A schematic calibration graph plots remaining blue absorbance against known glucose concentration. Absorbance decreases as glucose increases. An unknown absorbance is read horizontally to the line, then down to the concentration axis. No numerical values are shown.",
   caption:"Read the unknown absorbance across to the calibration line, then down to concentration. This example represents the remaining blue copper solution; use only the measured calibration range.",
   art:`<path d="M58 26v191h216" stroke="#344958" stroke-width="2" fill="none"/><path d="M69 48L252 197" stroke="#32776d" stroke-width="4"/><path d="M58 124h104v93" stroke="#a76125" stroke-width="2" stroke-dasharray="5 4" fill="none"/><circle cx="162" cy="124" r="5" fill="#a76125"/><text x="20" y="125" text-anchor="middle" transform="rotate(-90 20 125)">Remaining absorbance</text><text x="165" y="248" text-anchor="middle">Glucose concentration →</text><text x="150" y="276" text-anchor="middle">Schematic · no measured values</text>`
  }]
 };
 window.ALevelMetabolismPracticals={render(topic,id,group){
  const list=figures[topic+"/"+id+"/"+group];if(!list)return "";
  return list.map(f=>`<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height || 290}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`).join("");
 }};
})();

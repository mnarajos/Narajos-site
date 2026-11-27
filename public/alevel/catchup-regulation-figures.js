/* Original compact schematics of physiological control. */
(function () {
 "use strict";
 const figures={
  "a6/homeo/1": {
   title:"Two feedback patterns",
   alt:"Two schematic graphs plot deviation from an initial state against time. In negative feedback an initial deviation triggers a response that brings the state back toward its starting level. In positive feedback a change is amplified. These curves are illustrative, not measured data.",
   caption:"Compare the directions after a change: negative feedback counteracts the deviation, while positive feedback amplifies it. These curves are schematic and not measurements.",
   art:`<text x="150" y="24" text-anchor="middle">Negative feedback</text><path d="M50 42v70h220M50 100h220" stroke="#879b9b" stroke-width="2" fill="none"/><path d="M51 100h40q11 0 18-28q8-24 19-24q15 2 26 31q9 21 25 21h82" stroke="#32776d" stroke-width="4" fill="none"/><text x="20" y="77" text-anchor="middle" transform="rotate(-90 20 77)">Deviation</text><text x="150" y="138" text-anchor="middle">Returns toward initial state</text><text x="150" y="169" text-anchor="middle">Positive feedback</text><path d="M50 183v68h220M50 239h220" stroke="#879b9b" stroke-width="2" fill="none"/><path d="M51 239h55q15 0 26-9q20-16 30-25q19-14 45-20h52" stroke="#a76125" stroke-width="4" fill="none"/><text x="20" y="218" text-anchor="middle" transform="rotate(-90 20 218)">Deviation</text><text x="150" y="278" text-anchor="middle">Time → · deviation amplified</text>`
  },
  "a6/actionpot/2": {
   title:"Action potentials: size and frequency",
   alt:"Two schematic membrane-potential traces cover the same time interval. A weaker stimulus above threshold is associated with one action potential; a stronger stimulus with more frequent action potentials of the same size. The traces are illustrative, not measurements.",
   caption:"Compare peaks over equal time intervals. Each action potential is all-or-nothing; a stronger stimulus can increase their frequency, not their size. These traces are schematic.",
   art:`<text x="150" y="24" text-anchor="middle">Weaker suprathreshold stimulus</text><path d="M40 42v70h230" stroke="#879b9b" stroke-width="2" fill="none"/><path d="M42 98h43l12-45 12 45h156" stroke="#32776d" stroke-width="3" fill="none"/><text x="20" y="76" text-anchor="middle" transform="rotate(-90 20 76)">Potential</text><text x="150" y="143" text-anchor="middle">Stronger stimulus</text><path d="M40 157v70h230" stroke="#879b9b" stroke-width="2" fill="none"/><path d="M42 213h24l12-45 12 45h28l12-45 12 45h28l12-45 12 45h71" stroke="#a76125" stroke-width="3" fill="none"/><text x="20" y="192" text-anchor="middle" transform="rotate(-90 20 192)">Potential</text><text x="150" y="257" text-anchor="middle">Equal time interval →</text><text x="150" y="279" text-anchor="middle">Same peak height · more peaks</text>`
  },
  "a6/glucose/1": {
   title:"How insulin increases glucose uptake",
   alt:"Insulin binds a receptor on a muscle or fat cell's surface. Signalling promotes insertion of GLUT4 carrier proteins into the cell membrane. Glucose then enters by facilitated diffusion. Insulin also stimulates glycogen synthesis in liver and muscle.",
   caption:"Follow the signal from insulin binding to more GLUT4 carriers in the membrane. Glucose enters by facilitated diffusion; the diagram does not show the full signalling pathway.",
   art:`<text x="150" y="25" text-anchor="middle">Outside muscle or fat cell</text><circle cx="80" cy="55" r="10" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><text x="80" y="90" text-anchor="middle">Insulin</text><path d="M20 137h260M20 173h260" stroke="#32776d" stroke-width="4"/><path d="M58 139q22-33 44 0v32H58Z" fill="#d5c4e2" stroke="#80588f" stroke-width="2"/><path d="M80 99v21m-6-6 6 6 6-6" stroke="#a76125" stroke-width="3" fill="none"/><rect x="182" y="129" width="43" height="52" rx="12" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><path d="M101 177l39 24m-8-1 8 1-4-8M145 205l40-28m-10 1 10-1-4 9" stroke="#344958" stroke-width="3" fill="none"/><text x="132" y="229" text-anchor="middle">More GLUT4</text><path d="M203 99v100m-6-7 6 7 6-7" stroke="#a76125" stroke-width="3" fill="none"/><text x="220" y="98">Glucose</text><text x="150" y="267" text-anchor="middle">Inside cell</text>`
  },
  "a6/glucose/2": {
   title:"Hormones that raise blood glucose",
   alt:"Glucagon and adrenaline act through receptors on liver cells. Glucagon activates glycogen breakdown and gluconeogenesis; adrenaline stimulates glycogen breakdown. These pathways can increase blood glucose.",
   caption:"Follow each hormone to the liver. Both can activate glycogen breakdown; glucagon also stimulates gluconeogenesis. The intracellular signalling steps are omitted here.",
   art:`<text x="150" y="26" text-anchor="middle">Blood</text><circle cx="74" cy="63" r="18" fill="#d5c4e2" stroke="#80588f" stroke-width="2"/><circle cx="226" cy="63" r="18" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><text x="74" y="102" text-anchor="middle">Glucagon</text><text x="226" y="102" text-anchor="middle">Adrenaline</text><path d="M74 110l48 41m-9-3 9 3-3-9M226 110l-48 41m3-9-3 9 9-3" stroke="#344958" stroke-width="3" fill="none"/><path d="M65 166q14-32 82-27q75-1 88 27q2 43-80 43q-87 2-90-43Z" fill="#eac9b9" stroke="#a76125" stroke-width="2"/><path d="M115 155q7-12 14 0M171 155q7-12 14 0" stroke="#80588f" stroke-width="3" fill="none"/><text x="150" y="184" text-anchor="middle">Liver receptors</text><text x="150" y="232" text-anchor="middle">Glycogen → glucose</text><text x="150" y="258" text-anchor="middle">Glucagon also: new glucose</text>`
  },
  "a6/secondmsg/0": {
   title:"Hormone signalling starts at the membrane",
   alt:"A hormone outside a liver cell binds its cell-surface receptor. The signal activates adenylate cyclase in the membrane. Intermediate signalling proteins are omitted from the simplified diagram.",
   caption:"Locate the hormone outside the cell and the receptor in the surface membrane. Receptor activation leads to activation of adenylate cyclase; intermediate proteins are omitted.",
   art:`<text x="150" y="26" text-anchor="middle">Outside liver cell</text><circle cx="84" cy="58" r="12" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><text x="84" y="95" text-anchor="middle">Hormone</text><path d="M20 133h260M20 170h260" stroke="#32776d" stroke-width="4"/><path d="M63 135q21-30 42 0v32H63Z" fill="#d5c4e2" stroke="#80588f" stroke-width="2"/><rect x="190" y="124" width="48" height="55" rx="12" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><path d="M84 102v20m-6-6 6 6 6-6M111 151h69m-7-6 7 6-7 6" stroke="#344958" stroke-width="3" fill="none"/><text x="82" y="210" text-anchor="middle">Receptor</text><text x="215" y="210" text-anchor="middle">Adenylate</text><text x="215" y="231" text-anchor="middle">cyclase</text><text x="150" y="268" text-anchor="middle">Inside cell</text>`
  },
  "a6/secondmsg/1": {
   title:"cAMP carries the signal inside",
   alt:"Activated adenylate cyclase converts ATP to cyclic AMP. Cyclic AMP activates protein kinase, which starts an enzyme cascade leading to breakdown of glycogen to glucose.",
   caption:"Follow the signal: cAMP is made inside the cell and activates protein kinase; the ensuing enzyme cascade leads to glycogen breakdown.",
   art:`<text x="150" y="27" text-anchor="middle">Adenylate cyclase</text><text x="150" y="58" text-anchor="middle">ATP → cyclic AMP</text><path d="M150 68v32m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><circle cx="150" cy="125" r="19" fill="#d5c4e2" stroke="#80588f" stroke-width="2"/><text x="150" y="163" text-anchor="middle">Protein kinase activated</text><path d="M150 172v27m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="224" text-anchor="middle">Enzyme cascade</text><text x="150" y="254" text-anchor="middle">Glycogen → glucose</text>`
  },
  "a6/diabetes/0": {
   title:"Type I and type II diabetes",
   alt:"In type I diabetes immune destruction of pancreatic beta cells leaves little or no insulin. In type II diabetes target tissues respond less effectively to insulin, and insulin production may be insufficient. Both can lead to high blood glucose.",
   caption:"Compare the main mechanisms: type I usually involves beta-cell destruction; type II involves reduced tissue response and sometimes insufficient insulin production. The drawings are simplified.",
   art:`<text x="150" y="25" text-anchor="middle">Type I</text><ellipse cx="70" cy="72" rx="46" ry="23" fill="#eac9b9" stroke="#a76125" stroke-width="2"/><circle cx="57" cy="71" r="5" fill="#a76125"/><circle cx="81" cy="77" r="5" fill="#a76125"/><text x="179" y="67" text-anchor="middle">Few functioning</text><text x="179" y="89" text-anchor="middle">beta cells</text><text x="150" y="118" text-anchor="middle">Little or no insulin</text><path d="M30 136h240" stroke="#d6e1de" stroke-width="2"/><text x="150" y="160" text-anchor="middle">Type II</text><circle cx="71" cy="204" r="12" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><ellipse cx="210" cy="204" rx="49" ry="28" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><path d="M90 204h61m-7-6 7 6-7 6" stroke="#344958" stroke-width="3" fill="none"/><text x="71" y="245" text-anchor="middle">Insulin</text><text x="210" y="245" text-anchor="middle">Lower tissue</text><text x="210" y="266" text-anchor="middle">response</text>`
  },
  "a6/loop/2": {
   title:"Loop length and water conservation",
   alt:"Two schematic loops of Henle are compared at the same drawing scale. One extends further into the medulla than the other. A longer loop can contribute to a steeper medullary gradient and greater water reabsorption, which can support survival in dry habitats.",
   caption:"Compare how far the loops extend into the medulla. A longer loop can help establish a steeper gradient and support water conservation; the shapes are schematic and other adaptations also matter.",
   art:`<text x="150" y="25" text-anchor="middle">Cortex</text><path d="M22 43h256" stroke="#9aabaa" stroke-width="2"/><path d="M65 65v77q0 26 25 26t25-26V65M178 65v143q0 26 25 26t25-26V65" stroke="#537a94" stroke-width="8" fill="none"/><text x="90" y="207" text-anchor="middle">Shorter loop</text><text x="203" y="258" text-anchor="middle">Longer loop</text><text x="25" y="281">Medulla ↓</text>`
  }
 };
 window.ALevelRegulationFigures={render(topic,id,group){
  const f=figures[topic+"/"+id+"/"+group];if(!f)return "";
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 290" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 }};
})();

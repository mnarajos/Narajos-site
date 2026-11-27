/* Original A-level teaching schematics: pathway arrows show transformations or transfers. */
(function () {
 "use strict";
 const figures = {
  "a5/glycolysis/0": {
   title: "Beginning glycolysis in the cytoplasm",
   alt: "In the cytoplasm, a six-carbon glucose molecule receives phosphate as two ATP are used, forming a phosphorylated six-carbon sugar. The carbon skeleton remains six-carbon at this stage.",
   caption: "Follow the carbon skeleton. Phosphorylation uses ATP before the molecule is split; rearrangements are omitted. Green circles count carbons; orange circles represent phosphate groups. Shapes do not show molecular structure.",
   art: `<text x="150" y="24" text-anchor="middle">Cytoplasm</text><text x="150" y="53" text-anchor="middle">Glucose</text><g fill="#d9eee6" stroke="#32776d" stroke-width="2"><circle cx="100" cy="76" r="9"/><circle cx="120" cy="76" r="9"/><circle cx="140" cy="76" r="9"/><circle cx="160" cy="76" r="9"/><circle cx="180" cy="76" r="9"/><circle cx="200" cy="76" r="9"/></g><path d="M150 94v54m-7-8 7 8 7-8" fill="none" stroke="#344958" stroke-width="3"/><text x="167" y="121">2 ATP used</text><g fill="#d9eee6" stroke="#32776d" stroke-width="2"><circle cx="100" cy="180" r="9"/><circle cx="120" cy="180" r="9"/><circle cx="140" cy="180" r="9"/><circle cx="160" cy="180" r="9"/><circle cx="180" cy="180" r="9"/><circle cx="200" cy="180" r="9"/></g><circle cx="78" cy="180" r="10" fill="#f0c797" stroke="#a76125" stroke-width="2"/><circle cx="222" cy="180" r="10" fill="#f0c797" stroke="#a76125" stroke-width="2"/><text x="150" y="217" text-anchor="middle">Phosphorylated sugar</text><text x="150" y="242" text-anchor="middle">6 carbons</text>`
  },
  "a5/glycolysis/1": {
   title: "Splitting and oxidation",
   alt: "A phosphorylated six-carbon sugar splits into two three-carbon triose phosphates. These are oxidised to two three-carbon pyruvates; four ATP are produced and two NAD are reduced per original glucose.",
   caption: "Count the products per glucose: two triose phosphates lead to two pyruvates. Four ATP are made here; two ATP were used earlier, so the net gain is two.",
   art: `<text x="150" y="25" text-anchor="middle">Phosphorylated six-carbon sugar</text><text x="150" y="48" text-anchor="middle">6 carbons</text><path d="M150 59v30M150 88L78 124M150 88l72 36m-10-1 10 1-5-9M88 123l-10 1 5-9" fill="none" stroke="#344958" stroke-width="3"/><text x="78" y="149" text-anchor="middle">Triose</text><text x="222" y="149" text-anchor="middle">Triose</text><text x="78" y="169" text-anchor="middle">phosphate</text><text x="222" y="169" text-anchor="middle">phosphate</text><path d="M78 176v30m-6-7 6 7 6-7M222 176v30m-6-7 6 7 6-7" fill="none" stroke="#32776d" stroke-width="3"/><text x="78" y="231" text-anchor="middle">Pyruvate</text><text x="222" y="231" text-anchor="middle">Pyruvate</text><text x="150" y="265" text-anchor="middle">4 ATP made · 2 NAD reduced</text>`
  },
  "a5/anaerobic/0": {
   title: "Regenerating NAD without oxygen",
   alt: "Pyruvate from glycolysis has two alternative pathways. In animals and some bacteria it is reduced to lactate; in yeast and plants it is converted to ethanol and carbon dioxide. Both regenerate NAD from reduced NAD, allowing glycolysis to continue.",
   caption: "Compare the alternative products. Both pathways regenerate NAD, which glycolysis needs; the conversion shown does not itself produce ATP.",
   art: `<text x="150" y="30" text-anchor="middle">Pyruvate</text><path d="M150 42v25M150 66L73 100M150 66l77 34m-10-1 10 1-5-9M83 99l-10 1 5-9" fill="none" stroke="#344958" stroke-width="3"/><text x="73" y="124" text-anchor="middle">Lactate</text><text x="73" y="147" text-anchor="middle">animals and</text><text x="73" y="168" text-anchor="middle">some bacteria</text><text x="227" y="124" text-anchor="middle">Ethanol + CO₂</text><text x="227" y="147" text-anchor="middle">yeast and</text><text x="227" y="168" text-anchor="middle">plants</text><path d="M38 193h224" stroke="#cedddd" stroke-width="2"/><text x="150" y="218" text-anchor="middle">Reduced NAD → NAD</text><text x="150" y="243" text-anchor="middle">NAD returns to glycolysis</text>`
  },
  "a5/nitrogen/0": {
   title: "Decomposition releases ammonium",
   alt: "Nitrogen-containing compounds in dead organisms and waste are broken down by saprobionts. Ammonification releases ammonium ions into the soil.",
   caption: "Follow nitrogen from dead matter and waste to ammonium. Saprobionts carry out decomposition; the shapes represent sources, not molecular structures.",
   art: `<path d="M62 70q20-39 40 0q-20 20-40 0Z" fill="#d7e9d4" stroke="#32776d" stroke-width="3"/><path d="M180 50q22-15 43 0v32h-43z" fill="#edd1b2" stroke="#a76125" stroke-width="3"/><text x="82" y="113" text-anchor="middle">Dead matter</text><text x="201" y="113" text-anchor="middle">Waste</text><path d="M82 123l50 38m-10-2 10 2-4-9M201 123l-50 38m4-9-4 9 10-2" fill="none" stroke="#344958" stroke-width="3"/><text x="150" y="188" text-anchor="middle">Saprobionts</text><text x="150" y="211" text-anchor="middle">ammonification ↓</text><text x="150" y="246" text-anchor="middle">Ammonium in soil (NH₄⁺)</text>`
  },
  "a5/nitrogen/1": {
   title: "Nitrification and nitrogen fixation",
   alt: "Nitrifying bacteria oxidise ammonium to nitrite and then nitrate in aerobic conditions. Separately, nitrogen-fixing bacteria convert nitrogen gas to ammonia or ammonium.",
   caption: "Follow each arrow: nitrification is an oxygen-requiring oxidation pathway; fixation introduces nitrogen from the air into ammonium compounds.",
   art: `<text x="150" y="27" text-anchor="middle">Nitrifying bacteria · oxygen</text><text x="150" y="57" text-anchor="middle">Ammonium NH₄⁺</text><path d="M150 66v30m-6-7 6 7 6-7" fill="none" stroke="#32776d" stroke-width="3"/><text x="150" y="121" text-anchor="middle">Nitrite NO₂⁻</text><path d="M150 131v30m-6-7 6 7 6-7" fill="none" stroke="#32776d" stroke-width="3"/><text x="150" y="186" text-anchor="middle">Nitrate NO₃⁻</text><path d="M22 200h256" stroke="#d9e3e0" stroke-width="2"/><text x="150" y="224" text-anchor="middle">Nitrogen gas N₂</text><text x="150" y="247" text-anchor="middle">↓ nitrogen-fixing bacteria</text><text x="150" y="270" text-anchor="middle">Ammonia / ammonium</text>`
  },
  "a5/nitrogen/2": {
   title: "Denitrification",
   alt: "In waterlogged soil with little oxygen, denitrifying bacteria convert nitrate in the soil to nitrogen gas, which returns to the atmosphere.",
   caption: "Follow nitrogen back to the atmosphere. Denitrification occurs in low-oxygen soil; the arrow shows the net conversion rather than every intermediate.",
   art: `<text x="150" y="27" text-anchor="middle">Atmosphere</text><text x="150" y="58" text-anchor="middle">Nitrogen gas N₂</text><path d="M20 145Q50 135 80 145T140 145T200 145T280 145V260H20Z" fill="#e4f2f1" stroke="#67908c" stroke-width="2"/><path d="M150 177V85m-7 8 7-8 7 8" fill="none" stroke="#a76125" stroke-width="4"/><text x="150" y="207" text-anchor="middle">Nitrate NO₃⁻ in soil</text><text x="150" y="230" text-anchor="middle">Denitrifying bacteria</text><text x="150" y="252" text-anchor="middle">low oxygen / waterlogged</text>`
  },
  "a5/phosphorus/0": {
   title: "Phosphate from rock to organisms",
   alt: "Weathering releases phosphate ions from rock to soil. Plants absorb phosphate; animals obtain it by feeding on plants.",
   caption: "Follow phosphate from weathered rock into the soil, then into plants and animals. This pathway does not include a gaseous phase.",
   art: `<path d="M22 91l14-37 32-8 17 34-10 21H27Z" fill="#ddd9d0" stroke="#69665f" stroke-width="3"/><text x="52" y="125" text-anchor="middle">Rock</text><text x="69" y="27" text-anchor="middle">Weathering</text><path d="M68 131l16 29m-8-6 8 6 3-10" fill="none" stroke="#344958" stroke-width="3"/><path d="M150 104V55m0 23q-24 0-25-20q23-2 25 20m0-12q24 0 25-21q-23-1-25 21" fill="#d7e9d4" stroke="#32776d" stroke-width="3"/><text x="149" y="125" text-anchor="middle">Plant</text><path d="M202 61q4-13 16-13h34q12 0 13 13v24q-2 10-12 10h-40q-11 0-11-10Z" fill="#e4d2bc" stroke="#9a7043" stroke-width="3"/><circle cx="262" cy="57" r="11" fill="#e4d2bc" stroke="#9a7043" stroke-width="3"/><path d="M216 95v10m32-10v10" stroke="#9a7043" stroke-width="3"/><text x="236" y="125" text-anchor="middle">Animal</text><path d="M177 78h21m-7-6 7 6-7 6" fill="none" stroke="#344958" stroke-width="3"/><text x="198" y="32" text-anchor="middle">Feeding</text><path d="M20 160h260" stroke="#a76125" stroke-width="4"/><text x="150" y="191" text-anchor="middle">Phosphate in soil</text><path d="M150 158v-23m-6 7 6-7 6 7" fill="none" stroke="#32776d" stroke-width="3"/><text x="150" y="228" text-anchor="middle">Phosphate enters plant</text>`
  },
  "a5/phosphorus/1": {
   title: "Fungi and plant roots",
   alt: "Fungal hyphae extend into soil around a root. Phosphate ions and water move from the hyphae toward the root, while carbohydrates move from the root to the fungus.",
   caption: "Compare the arrows: fungal hyphae extend the absorbing area, and the plant supplies carbohydrate to the fungus. This is a schematic of a mycorrhizal association.",
   art: `<path d="M30 107h115q18 0 18 25t-18 25H30Z" fill="#f0dfbf" stroke="#9a7043" stroke-width="3"/><text x="90" y="138" text-anchor="middle">Root</text><path d="M162 110q40-38 79-27M162 123q64-22 102 4M162 141q50 3 83 36M162 155q30 22 44 49" fill="none" stroke="#8862a0" stroke-width="4"/><text x="205" y="30" text-anchor="middle">Fungal hyphae</text><text x="214" y="53" text-anchor="middle">Water + phosphate</text><path d="M241 68l-72 43m10-1-10 1 5-8" stroke="#32776d" stroke-width="3" fill="none"/><path d="M164 153l66 37m-10-1 10 1-5-9" stroke="#a76125" stroke-width="3" fill="none"/><text x="200" y="220" text-anchor="middle">Carbohydrates</text><text x="200" y="243" text-anchor="middle">to fungus</text>`
  },
  "a6/resting/1": {
   title: "Maintaining the resting potential",
   alt: "An axon membrane separates the outside from the inside. A sodium–potassium pump uses ATP to move three sodium ions out and two potassium ions in. Potassium can also move out through open potassium channels.",
   caption: "Follow the arrows: the pump uses ATP for the 3 Na⁺ out to 2 K⁺ in exchange. Potassium can also diffuse out through open channels; this schematic omits other ions and channels.",
   art: `<text x="150" y="25" text-anchor="middle">Outside axon</text><text x="93" y="53" text-anchor="middle">3 Na⁺ out</text><text x="215" y="53" text-anchor="middle">K⁺ out</text><path d="M20 100h260M20 150h260" stroke="#32776d" stroke-width="5"/><rect x="66" y="91" width="64" height="69" rx="16" fill="#bed5ed" stroke="#516eaa" stroke-width="2"/><rect x="193" y="93" width="38" height="64" fill="#e9d5ac" stroke="#a5792e" stroke-width="2"/><path d="M212 150V65m-7 7 7-7 7 7M85 144V65m-7 7 7-7 7 7M112 64v81m-7-7 7 7 7-7" fill="none" stroke="#344958" stroke-width="3"/><text x="112" y="187" text-anchor="middle">2 K⁺ in</text><text x="220" y="185" text-anchor="middle">K⁺ channel</text><text x="93" y="211" text-anchor="middle">Pump uses ATP</text><text x="150" y="252" text-anchor="middle">Inside axon: negative at rest</text>`
  },
  "a6/actionpot/0": {
   title: "An action potential over time",
   alt: "A qualitative membrane potential graph starts at about minus 70 millivolts, rises to threshold near minus 55 as sodium enters, then rises to a positive peak as voltage-gated sodium channels open. It falls as potassium exits, briefly goes below resting potential, then returns toward rest. The time axis has no numerical scale.",
   caption: "Read left to right: sodium entry depolarises the membrane, then potassium exit repolarises it. The dashed threshold and values are approximate; the time axis is qualitative.",
   art: `<path d="M54 25v200h220M49 183h7M49 166h7M49 102h7M49 55h7" fill="none" stroke="#344958" stroke-width="2"/><text x="46" y="60" text-anchor="end">+40</text><text x="46" y="107" text-anchor="end">0</text><text x="46" y="188" text-anchor="end">−70</text><path d="M54 166h220" stroke="#a76125" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M54 183h25q16 0 27-22q11-18 25-102q6-24 15-10q14 24 27 87q12 57 26 60q17 4 27-13h47" fill="none" stroke="#32776d" stroke-width="4"/><text x="100" y="40">Na⁺ in</text><text x="171" y="92">K⁺ out</text><text x="16" y="27">mV</text><text x="194" y="252">Time →</text><text x="150" y="276" text-anchor="middle">Dashed: threshold ≈ −55 mV</text>`
  },
  "a6/kidney/0": {
   title: "Nephron: filtration and the tubule",
   alt: "A glomerulus sits inside Bowman's capsule. Filtrate leaves the capsule through the proximal convoluted tubule, descends and ascends the loop of Henle, then enters the distal convoluted tubule and collecting duct. Ultrafiltration passes water and small solutes to the capsule, while cells and large proteins remain in blood.",
   caption: "Trace the filtrate from capsule through the tubule to the collecting duct. At the glomerulus, water and small solutes filter out; blood cells and large proteins are retained. The tubule is simplified and not to scale.",
   art: `<circle cx="54" cy="61" r="33" fill="#e7f2f3" stroke="#537a94" stroke-width="3"/><circle cx="54" cy="61" r="21" fill="#f2d4c5" stroke="#a76125" stroke-width="3"/><path d="M41 58q8-15 19 0t11 1" fill="none" stroke="#a76125" stroke-width="3"/><path d="M54 95q31 5 40-4t19 4q10 9 17 0t20 1v77q0 27 22 27t22-27V96q7-9 16 0t19 0q9-8 20 0v142" fill="none" stroke="#32776d" stroke-width="5"/><path d="M54 73v20m-6-7 6 7 6-7M150 165v16m-6-7 6 7 6-7M194 120v-16m-6 7 6-7 6 7M249 218v16m-6-7 6 7 6-7" fill="none" stroke="#344958" stroke-width="2"/><text x="54" y="68" text-anchor="middle">1</text><text x="113" y="78" text-anchor="middle">2</text><text x="174" y="224" text-anchor="middle">3</text><text x="213" y="78" text-anchor="middle">4</text><text x="264" y="158" text-anchor="middle">5</text><text x="15" y="242">1 Glomerulus + capsule</text><text x="15" y="262">2 Proximal tubule · 3 Loop</text><text x="15" y="280">4 Distal tubule · 5 Collecting duct</text>`
  },
  "a7/succession/0": {
   title: "Primary succession",
   alt: "Bare rock is colonised by pioneer organisms. As organisms change the environment and dead material decomposes, soil develops; later plants can establish in the altered conditions.",
   caption: "Follow the change in the same place: pioneers can colonise bare rock, and their activity and decomposition help change conditions for later species. Timing and particular species vary.",
   art: `<path d="M32 82l16-34 37-8 20 42H32Z" fill="#ddd9d0" stroke="#69665f" stroke-width="3"/><text x="68" y="110" text-anchor="middle">Bare rock</text><path d="M115 70h36m-7-7 7 7-7 7" fill="none" stroke="#344958" stroke-width="3"/><path d="M173 82l16-34 37-8 20 42h-73Z" fill="#ddd9d0" stroke="#69665f" stroke-width="3"/><circle cx="195" cy="54" r="5" fill="#6f9851"/><circle cx="214" cy="64" r="5" fill="#6f9851"/><text x="210" y="110" text-anchor="middle">Pioneers</text><path d="M210 120v32m-6-7 6 7 6-7" fill="none" stroke="#344958" stroke-width="3"/><path d="M95 240h130" stroke="#9a7043" stroke-width="6"/><path d="M150 239v-48m0 27q-24-1-23-22q22-1 23 22m0-9q23-1 23-21q-22 0-23 21" fill="#d7e9d4" stroke="#32776d" stroke-width="3"/><text x="150" y="175" text-anchor="middle">Soil develops</text><text x="150" y="266" text-anchor="middle">Later plants establish</text>`
  },
  "a6/reflex/1": {
   title: "A three-neurone reflex arc",
   alt: "A damaging stimulus activates a receptor. A sensory neurone carries an impulse to the spinal cord, where it passes through a relay neurone to a motor neurone. The motor neurone carries an impulse to an effector muscle, which contracts.",
   caption: "Follow the impulse from receptor to sensory, relay and motor neurones, then to the effector. This example uses the spinal cord; some reflexes involve the brain.",
   art: `<text x="150" y="24" text-anchor="middle">Stimulus → receptor</text><path d="M150 31v26m-6-7 6 7 6-7" fill="none" stroke="#344958" stroke-width="3"/><text x="150" y="78" text-anchor="middle">Sensory neurone</text><path d="M150 86v25m-6-7 6 7 6-7" fill="none" stroke="#32776d" stroke-width="3"/><rect x="36" y="118" width="228" height="55" rx="15" fill="#e1eef5" stroke="#537a94" stroke-width="2"/><text x="150" y="139" text-anchor="middle">Relay neurone</text><text x="150" y="160" text-anchor="middle">spinal cord (CNS)</text><path d="M150 174v25m-6-7 6 7 6-7" fill="none" stroke="#32776d" stroke-width="3"/><text x="150" y="220" text-anchor="middle">Motor neurone</text><path d="M150 228v25m-6-7 6 7 6-7" fill="none" stroke="#344958" stroke-width="3"/><text x="150" y="274" text-anchor="middle">Effector muscle contracts</text>`
  }
 };
 // The same pathway supports a further immediately related fact in the next group.
 figures["a5/glycolysis/2"] = figures["a5/glycolysis/1"];
 figures["a6/actionpot/1"] = figures["a6/actionpot/0"];
 figures["a7/succession/1"] = figures["a7/succession/0"];
 window.ALevelEnergyNeuralFigures = {render(topic, id, group) {
  const f = figures[topic + "/" + id + "/" + group];
  if (!f) return "";
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 290" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font: 16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 }};
})();

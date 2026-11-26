/* Original compact AQA response and homeostasis schematics. */
(function () {
 "use strict";
 const figures = {
  "a6/pacinian/0": {
   title: "A pressure receptor in section",
   alt: "A Pacinian corpuscle in section has concentric layers of connective tissue called lamellae around the end of a sensory neurone. It is a receptor for mechanical pressure.",
   caption: "Locate the sensory neurone ending inside the lamellae. Pressure deforms the receptor; the section is schematic and not to scale.",
   art: `<ellipse cx="150" cy="130" rx="104" ry="81" fill="#e6f0ee" stroke="#537a94" stroke-width="3"/><ellipse cx="150" cy="130" rx="85" ry="63" fill="none" stroke="#7aa49e" stroke-width="3"/><ellipse cx="150" cy="130" rx="65" ry="45" fill="none" stroke="#7aa49e" stroke-width="3"/><ellipse cx="150" cy="130" rx="45" ry="28" fill="none" stroke="#7aa49e" stroke-width="3"/><path d="M150 214v-72" stroke="#a76125" stroke-width="7"/><circle cx="150" cy="130" r="12" fill="#eabf9c" stroke="#a76125" stroke-width="3"/><path d="M220 65l-25 23" stroke="#344958" stroke-width="2"/><text x="230" y="55" text-anchor="middle">Lamellae</text><text x="150" y="250" text-anchor="middle">Sensory neurone ending</text>`
  },
  "a6/pacinian/1": {
   title: "From pressure to an electrical signal",
   alt: "Pressure deforms the Pacinian corpuscle and stretches the membrane of its sensory neurone ending. Stretch-mediated sodium channels open and sodium enters, producing a generator potential. If threshold is reached, an action potential is generated.",
   caption: "Follow the sequence from membrane stretch: stretch-mediated sodium channels open and sodium enters. An action potential is generated only if the generator potential reaches threshold.",
   art: `<text x="150" y="27" text-anchor="middle">Pressure deforms receptor</text><path d="M150 35v25m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="83" text-anchor="middle">Neurone membrane stretches</text><path d="M26 124h248M26 151h248" stroke="#32776d" stroke-width="4"/><rect x="123" y="115" width="54" height="46" fill="#d2e0f2" stroke="#537a94" stroke-width="2"/><path d="M150 99v75m-6-7 6 7 6-7" stroke="#a76125" stroke-width="3" fill="none"/><text x="215" y="101" text-anchor="middle">Na⁺ enters</text><text x="29" y="105">Outside</text><text x="29" y="178">Inside</text><text x="150" y="202" text-anchor="middle">Generator potential</text><text x="150" y="227" text-anchor="middle">If threshold is reached ↓</text><text x="150" y="254" text-anchor="middle">Action potential</text>`
  },
  "a6/eye/0": {
   title: "Rod and cone pathways compared",
   alt: "In a simplified retinal pathway, signals from several rods converge onto one neurone, while a foveal cone pathway is shown as one cone connected to one neurone. Converging rod signals can summate, increasing sensitivity but reducing spatial acuity; separate cone pathways preserve spatial detail.",
   caption: "Compare connections: signals from several rods can summate at one neurone, while separate foveal cone pathways preserve detail. Real retinal circuitry is simplified.",
   art: `<text x="150" y="25" text-anchor="middle">Rods: convergence</text><g fill="#c9dcef" stroke="#537a94" stroke-width="2"><rect x="53" y="40" width="28" height="39" rx="12"/><rect x="136" y="40" width="28" height="39" rx="12"/><rect x="219" y="40" width="28" height="39" rx="12"/></g><path d="M67 80l83 43M150 80v43M233 80l-83 43" stroke="#537a94" stroke-width="2"/><circle cx="150" cy="130" r="11" fill="#e9cba6" stroke="#a5792e" stroke-width="2"/><text x="150" y="160" text-anchor="middle">One neurone · signals summate</text><path d="M30 173h240" stroke="#d6e1de" stroke-width="2"/><text x="150" y="194" text-anchor="middle">Foveal cones: separate pathways</text><path d="M69 205l15 29H54ZM136 205l15 29h-30ZM203 205l15 29h-30Z" fill="#d5c4e2" stroke="#80588f" stroke-width="2"/><path d="M69 234v16M136 234v16M203 234v16" stroke="#80588f" stroke-width="2"/><g fill="#e9cba6" stroke="#a5792e" stroke-width="2"><circle cx="69" cy="259" r="8"/><circle cx="136" cy="259" r="8"/><circle cx="203" cy="259" r="8"/></g>`
  },
  "a6/resting/0": {
   title: "A myelinated motor neurone",
   alt: "A schematic motor neurone has dendrites and a cell body connected to a long axon. Myelin sheath segments cover the axon; the gaps between segments are nodes of Ranvier. At rest the axon interior is negative relative to the outside.",
   caption: "Trace the cell body into the axon, and locate the gaps between myelin segments. The relative lengths are greatly shortened; at rest the inside is negative relative to the outside.",
   art: `<path d="M52 123l-24-32M52 123L25 128M52 123l-23 34" stroke="#a76125" stroke-width="4"/><circle cx="66" cy="123" r="28" fill="#f0ddca" stroke="#a76125" stroke-width="3"/><circle cx="66" cy="123" r="9" fill="#d4bfdf" stroke="#80588f" stroke-width="2"/><path d="M94 123h171" stroke="#a76125" stroke-width="8"/><g fill="#c9dcef" stroke="#516eaa" stroke-width="2"><rect x="104" y="102" width="35" height="42" rx="14"/><rect x="155" y="102" width="35" height="42" rx="14"/><rect x="206" y="102" width="35" height="42" rx="14"/></g><path d="M147 145v28M198 145v28" stroke="#344958" stroke-width="2"/><text x="65" y="58" text-anchor="middle">Dendrites</text><text x="65" y="187" text-anchor="middle">Cell body</text><text x="189" y="58" text-anchor="middle">Myelin on axon</text><text x="173" y="200" text-anchor="middle">Nodes</text><text x="150" y="249" text-anchor="middle">Inside negative at rest</text>`
  },
  "a6/tropisms/1": {
   title: "IAA and directional growth",
   alt: "In a shoot illuminated from the left, more IAA accumulates on the shaded right side. That side elongates more, bending the shoot toward the light. In a horizontal root, more IAA accumulates on the lower side, where it inhibits elongation; the root bends downward.",
   caption: "Compare the two tissues: greater IAA promotes shoot elongation on the shaded side but inhibits root elongation on the lower side. The drawings show direction, not cell-level detail.",
   art: `<text x="150" y="23" text-anchor="middle">Shoot · light from left →</text><path d="M150 120Q145 79 110 52" stroke="#32776d" stroke-width="12" fill="none"/><path d="M154 109l20-2m-17-16 20-4" stroke="#a76125" stroke-width="3"/><text x="232" y="74" text-anchor="middle">More IAA</text><text x="232" y="95" text-anchor="middle">shaded side</text><text x="232" y="116" text-anchor="middle">elongates more</text><path d="M25 137h250" stroke="#d6e1de" stroke-width="2"/><text x="150" y="160" text-anchor="middle">Root · gravity ↓</text><path d="M38 203Q110 203 180 207Q207 210 208 245" stroke="#9a7043" stroke-width="12" fill="none"/><path d="M94 216h15m13 0h15m13 0h15" stroke="#a76125" stroke-width="3"/><text x="105" y="244" text-anchor="middle">More IAA below</text><text x="105" y="265" text-anchor="middle">less elongation</text>`
  },
  "a6/glucose/0": {
   title: "Three fates and sources of glucose",
   alt: "In the liver, glucose can be joined into glycogen by glycogenesis, and glycogen can be broken down to glucose by glycogenolysis. Gluconeogenesis makes glucose from non-carbohydrate starting materials such as glycerol or lactate.",
   caption: "Compare the directions: glycogenesis makes glycogen, while glycogenolysis releases glucose. Gluconeogenesis makes glucose from non-carbohydrate starting materials.",
   art: `<text x="150" y="25" text-anchor="middle">Liver</text><circle cx="68" cy="90" r="13" fill="#eabf9c" stroke="#a76125" stroke-width="2"/><text x="68" y="132" text-anchor="middle">Glucose</text><g fill="#eabf9c" stroke="#a76125" stroke-width="2"><circle cx="202" cy="78" r="10"/><circle cx="224" cy="78" r="10"/><circle cx="246" cy="78" r="10"/><circle cx="213" cy="99" r="10"/><circle cx="235" cy="99" r="10"/></g><text x="224" y="132" text-anchor="middle">Glycogen</text><path d="M87 72h99m-7-6 7 6-7 6M186 105H87m7-6-7 6 7 6" stroke="#344958" stroke-width="2" fill="none"/><text x="136" y="51" text-anchor="middle">Glycogenesis</text><text x="136" y="159" text-anchor="middle">Glycogenolysis</text><text x="150" y="212" text-anchor="middle">Glycerol or lactate</text><path d="M70 199V150m-6 7 6-7 6 7" stroke="#32776d" stroke-width="3" fill="none"/><text x="150" y="255" text-anchor="middle">Gluconeogenesis → glucose</text>`
  }
 };
 figures["a6/eye/1"]=figures["a6/eye/0"];
 window.ALevelResponseFigures = {render(topic,id,group) {
  const f=figures[topic+"/"+id+"/"+group]; if(!f)return "";
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 290" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 }};
})();

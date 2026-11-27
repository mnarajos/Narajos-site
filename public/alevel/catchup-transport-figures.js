/* Original schematic figures for the A-level plant transport catch-up. */
(function () {
 "use strict";
 function figure(title, alt, caption, art, height, width = 600) {
  const compact = width === 300;
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${title}</strong></div><div class="kc-visual-art${compact ? ' kc-visual-art-compact' : ''}"${compact ? '' : ' tabindex="0" role="region" aria-label="Scrollable science diagram"'}><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${alt}" xmlns="http://www.w3.org/2000/svg" style="font:15px system-ui,sans-serif; fill:#233e4c">${art}</svg></div><figcaption>${caption}</figcaption></figure>`;
 }
 const xylemRoute = figure(
  "Water movement through a leaf",
  "Water moves up a hollow, lignified xylem vessel into a leaf mesophyll cell. Water evaporates from cell surfaces into the leaf air space and water vapour diffuses through an opening between guard cells to the outside. The vessel and tissues are simplified.",
  "Follow water up the vessel and into mesophyll, then as vapour through the open stoma. The vessel wall and tissues are simplified and not to scale.",
  `<text x="190" y="25" text-anchor="middle">Mesophyll cell</text><path d="M28 47h55v174H28z" fill="#e4f2f8" stroke="#835e43" stroke-width="6"/><path d="M29 77h7m40 0h7M29 124h7m40 0h7M29 171h7m40 0h7" stroke="#a8734e" stroke-width="5"/><ellipse cx="190" cy="83" rx="58" ry="43" fill="#b9debf" stroke="#538866" stroke-width="3"/><path d="M55 203V67m-6 7 6-7 6 7M84 83h46m-7-6 7 6-7 6M190 127v31m-6-7 6 7 6-7" fill="none" stroke="#386ba8" stroke-width="3"/><text x="190" y="181" text-anchor="middle">Leaf air space</text><path d="M105 244h70M205 244h73" fill="none" stroke="#699474" stroke-width="3"/><path d="M175 233q-13 2-13 11t13 11q7-11 0-22ZM205 233q13 2 13 11t-13 11q-7-11 0-22Z" fill="#91cda3" stroke="#538866" stroke-width="2"/><path d="M190 193v78m-6-7 6 7 6-7" fill="none" stroke="#386ba8" stroke-width="3"/><text x="55" y="262" text-anchor="middle">Xylem</text><text x="55" y="284" text-anchor="middle">lignified wall</text><text x="190" y="307" text-anchor="middle">Vapour through stoma</text><path d="M245 293l-49-45" stroke="#344958" stroke-width="2"/>`, 330, 300);
 const xylemColumn = figure(
  "Cohesion in the xylem",
  "In an enlarged xylem vessel a column of water is pulled upward. Dashed links between water molecules represent hydrogen bonds responsible for cohesion. Adhesion is attraction between water and the vessel wall.",
  "Trace the upward pull through the continuous column. Dashed links represent hydrogen bonds, not fixed molecular chains; adhesion is attraction to the wall.",
  `<path d="M85 31h130v177H85z" fill="#e6f4fa" stroke="#986e50" stroke-width="6"/><path d="M161 193V52m-7 8 7-8 7 8" fill="none" stroke="#386ba8" stroke-width="3"/><g fill="#386ba8"><circle cx="119" cy="176" r="8"/><circle cx="137" cy="144" r="8"/><circle cx="119" cy="112" r="8"/><circle cx="137" cy="80" r="8"/><circle cx="119" cy="48" r="8"/></g><path d="M123 168l10-16m-2-16-8-16m1-16 9-16m-2-16-8-16" stroke="#7657aa" stroke-width="3" stroke-dasharray="5 4"/><text x="150" y="23" text-anchor="middle">Upward pull</text><text x="20" y="238">Cohesion</text><path d="M98 229l28-73" stroke="#344958" stroke-width="2"/><text x="180" y="238">Adhesion</text><path d="M205 224l8-47" stroke="#344958" stroke-width="2"/><text x="150" y="278" text-anchor="middle">Molecules greatly enlarged</text>`, 300, 300);
 const potometer = figure(
  "A bubble potometer measures uptake",
  "A leafy shoot is connected to a water-filled tube and capillary. The open end of the capillary is in water. An air bubble in the capillary moves towards the shoot as water is taken up. A ruler measures bubble movement over time.",
  "Follow the bubble towards the shoot and measure distance over time. Water uptake is an estimate of transpiration, not a direct measurement: some absorbed water is used or retained.",
  `<path d="M120 162V78" fill="none" stroke="#4b8361" stroke-width="6"/><path d="M120 104Q71 50 45 75Q78 111 120 104M120 82Q163 34 190 57Q163 91 120 82" fill="#9fd3aa" stroke="#4b8361" stroke-width="3"/>
   <path d="M120 161v45h380v50" fill="none" stroke="#47788b" stroke-width="14"/><path d="M120 161v45h380v50" fill="none" stroke="#e4f5fb" stroke-width="8"/>
   <rect x="282" y="201" width="20" height="10" rx="5" fill="#fff" stroke="#47788b" stroke-width="2"/><path d="M275 183h-70m9-7-9 7 9 7" fill="none" stroke="#386ba8" stroke-width="3"/>
   <path d="M451 232v53h100v-53" fill="#e6f4fa" stroke="#6d8d96" stroke-width="3"/><path d="M452 248h98" stroke="#79aabc" stroke-width="2"/><path d="M500 248v8" stroke="#47788b" stroke-width="8"/><path d="M500 248v8" stroke="#e4f5fb" stroke-width="4"/>
   <path d="M194 229h205m-180 0v7m25-7v7m25-7v7m25-7v7m25-7v7m25-7v7m25-7v7" stroke="#344958" stroke-width="2"/>
   <text x="105" y="36">Leafy shoot</text><text x="315" y="178">Air bubble</text><text x="245" y="264">Ruler along capillary</text><text x="465" y="310">Water</text>`, 330);
 const massFlow = figure(
  "Mass flow from source to sink",
  "At the source, sucrose is loaded into a phloem sieve tube, lowering its water potential. Water enters from adjacent xylem by osmosis and hydrostatic pressure increases. Sap flows along the sieve tube towards the sink where sucrose is unloaded, water leaves and pressure is lower.",
  "Follow sucrose loading, water entry and pressure-driven flow to the sink. This shows one source-to-sink route; other sieve tubes may serve other sinks.",
  `<text x="55" y="25" text-anchor="middle">Xylem</text><text x="153" y="25" text-anchor="middle">Sieve tube</text><rect x="29" y="46" width="52" height="195" rx="8" fill="#e0eff9" stroke="#52809e" stroke-width="3"/><rect x="127" y="46" width="52" height="195" rx="8" fill="#e4f3e9" stroke="#4f8c6a" stroke-width="3"/><path d="M127 115h52M127 171h52" stroke="#4f8c6a" stroke-width="2" stroke-dasharray="4 4"/><path d="M83 95h38m-6-5 6 5-6 5M153 116v52m-6-7 6 7 6-7M127 206H85m7-5-7 5 7 5M256 76h-72m7-5-7 5 7 5M183 204h73m-7-5 7 5-7 5" fill="none" stroke="#344958" stroke-width="2"/><text x="104" y="78" text-anchor="middle">Water</text><text x="104" y="231" text-anchor="middle">Water</text><text x="236" y="52" text-anchor="middle">Source</text><text x="239" y="100" text-anchor="middle">Sucrose in</text><text x="236" y="151" text-anchor="middle">Sap flows ↓</text><text x="237" y="183" text-anchor="middle">Sink</text><text x="238" y="232" text-anchor="middle">Sucrose out</text><text x="150" y="277" text-anchor="middle">Higher pressure → lower pressure</text>`, 300, 300);
 const ringing = figure(
  "Ringing and translocation evidence",
  "A stem before ringing has an outer bark and phloem layer around the xylem. A second stem has a ring of bark and phloem removed while the xylem remains. Tissue swells above the ring as transported substances accumulate there.",
  "Compare the stems. With phloem removed around the ring, sugars transported from the leaves can accumulate above it. The remaining xylem is shown intact.",
  `<path d="M105 45h95v190h-95z" fill="#c79b77" stroke="#805d45" stroke-width="3"/><rect x="127" y="45" width="51" height="190" fill="#efe1c9" stroke="#a68262" stroke-width="2"/>
   <path d="M368 45h95v70q24 14 13 33h-121q-11-19 13-33z" fill="#c79b77" stroke="#805d45" stroke-width="3"/><rect x="368" y="177" width="95" height="58" fill="#c79b77" stroke="#805d45" stroke-width="3"/><rect x="390" y="45" width="51" height="190" fill="#efe1c9" stroke="#a68262" stroke-width="2"/>
   <text x="153" y="28" text-anchor="middle">Before</text><text x="416" y="28" text-anchor="middle">After ringing</text><text x="28" y="275">Outer bark and phloem</text><path d="M142 260l-25-80" stroke="#344958"/><text x="298" y="275">Xylem remains</text><path d="M394 260l20-72" stroke="#344958"/>
   <text x="492" y="114">Swelling</text><path d="M490 118l-18 10" stroke="#344958"/><text x="491" y="178">Ring removed</text><path d="M490 182l-29-15" stroke="#344958"/>`, 300);
 const figures = {"a3/xylem/0": xylemRoute, "a3/xylem/1": xylemColumn + potometer, "a3/phloem/0": massFlow, "a3/phloem/1": ringing};
 window.ALevelTransportFigures = {render(topic, id, group) {
  const compact = window.ALevelTransportDetails?.render(topic, id, group);
  if (compact && topic === "a3" && id === "xylem" && group === 1) return xylemColumn + compact;
  if (compact && topic === "a3" && id === "phloem" && group === 1) return compact;
  return figures[topic + "/" + id + "/" + group] || "";
 }};
})();

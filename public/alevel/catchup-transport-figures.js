/* Original schematic figures for the A-level plant transport catch-up. */
(function () {
 "use strict";
 function figure(title, alt, caption, art, height) {
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${title}</strong></div><div class="kc-visual-art" tabindex="0" role="region" aria-label="Scrollable science diagram"><svg viewBox="0 0 600 ${height}" role="img" aria-label="${alt}" xmlns="http://www.w3.org/2000/svg" style="font:15px system-ui,sans-serif; fill:#233e4c">${art}</svg></div><figcaption>${caption}</figcaption></figure>`;
 }
 const xylemRoute = figure(
  "Water movement through a leaf",
  "Water moves up a hollow, lignified xylem vessel into leaf mesophyll cells. Water evaporates from their surfaces into an air space and water vapour diffuses out through an open stoma. The vessel is shown as a single tube.",
  "Follow water from the vessel into mesophyll, then as vapour through a stoma. The xylem wall and leaf tissues are simplified and not to scale.",
  `<path d="M70 35h72v228H70z" fill="#e4f2f8" stroke="#835e43" stroke-width="7"/><path d="M72 70h8m52 0h8M72 130h8m52 0h8M72 190h8m52 0h8M72 250h8m52 0h8" stroke="#a8734e" stroke-width="7"/>
   <path d="M107 238V62m-8 10 8-10 8 10" fill="none" stroke="#386ba8" stroke-width="4"/><text x="26" y="292">Xylem vessel</text><text x="19" y="313">lignified wall</text>
   <path d="M185 28Q355 5 553 28v200Q390 246 185 228Z" fill="#f0f9ec" stroke="#699474" stroke-width="3"/>
   <ellipse cx="265" cy="110" rx="57" ry="45" fill="#b9debf" stroke="#538866" stroke-width="3"/><ellipse cx="415" cy="110" rx="57" ry="45" fill="#b9debf" stroke="#538866" stroke-width="3"/>
   <text x="340" y="58" text-anchor="middle">Mesophyll cells</text><text x="341" y="194" text-anchor="middle">Air space</text>
   <path d="M144 110h60m-9-7 9 7-9 7M265 156v24m-7-8 7 8 7-8M341 199v55m-7-8 7 8 7-8" fill="none" stroke="#386ba8" stroke-width="3"/>
   <path d="M305 230q-22 8-17 28q13 12 28-3M377 230q22 8 17 28q-13 12-28-3" fill="#91cda3" stroke="#538866" stroke-width="3"/>
   <text x="480" y="274">Open stoma</text><path d="M478 264l-91-17" stroke="#344958"/><text x="340" y="297" text-anchor="middle">Water vapour out</text>`, 330);
 const xylemColumn = figure(
  "Cohesion in the xylem",
  "In an enlarged xylem vessel a column of water is pulled upward. Dashed links between water molecules represent hydrogen bonds responsible for cohesion. Adhesion is attraction between water and the vessel wall.",
  "Trace the upward pull through the continuous column. Dashed links represent hydrogen bonds, not fixed molecular chains; adhesion is attraction to the wall.",
  `<path d="M182 27h235v195H182z" fill="#e6f4fa" stroke="#986e50" stroke-width="8"/><path d="M299 202V49m-8 9 8-9 8 9" fill="none" stroke="#386ba8" stroke-width="3"/>
   <g fill="#386ba8"><circle cx="250" cy="177" r="9"/><circle cx="271" cy="144" r="9"/><circle cx="250" cy="111" r="9"/><circle cx="270" cy="78" r="9"/><circle cx="250" cy="45" r="9"/></g>
   <path d="M254 168l13-16m-2-16-11-16m2-17 10-16m-1-16-11-17" stroke="#7657aa" stroke-width="3" stroke-dasharray="5 4"/>
   <text x="438" y="83">Upward pull</text><path d="M432 89L308 100" stroke="#344958"/><text x="30" y="125">Cohesion</text><path d="M115 120l140 20" stroke="#344958"/><text x="30" y="192">Adhesion</text><path d="M115 187l63-25" stroke="#344958"/>
   <text x="300" y="257" text-anchor="middle">Molecules greatly enlarged; vessel wall shown in section</text>`, 280);
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
  "Follow sucrose loading, water entry and the pressure-driven flow to the sink. The diagram shows one source-to-sink route; other sieve tubes may serve other sinks.",
  `<rect x="170" y="40" width="95" height="230" rx="12" fill="#e0eff9" stroke="#52809e" stroke-width="3"/><rect x="330" y="40" width="95" height="230" rx="12" fill="#e4f3e9" stroke="#4f8c6a" stroke-width="3"/>
   <path d="M330 125h95M330 190h95" stroke="#4f8c6a" stroke-width="3" stroke-dasharray="4 5"/><text x="218" y="28" text-anchor="middle">Xylem</text><text x="378" y="28" text-anchor="middle">Sieve tube</text>
   <path d="M535 123H432m8-7-8 7 8 7M268 110h55m-8-7 8 7-8 7M377 139v88m-7-9 7 9 7-9M429 235h110m-9-7 9 7-9 7M330 251h-55m8-7-8 7 8 7" fill="none" stroke="#344958" stroke-width="3"/>
   <text x="455" y="114">Sucrose</text><text x="270" y="100">Water</text><text x="445" y="66">Source</text><text x="445" y="88">Higher pressure</text><text x="444" y="209">Sink</text><text x="444" y="229">Sucrose removed</text><text x="445" y="257">Lower pressure</text><text x="271" y="280">Water</text>
   <text x="377" y="160" text-anchor="middle">Sap</text><text x="377" y="180" text-anchor="middle">flow</text>`, 305);
 const ringing = figure(
  "Ringing and translocation evidence",
  "A stem before ringing has an outer bark and phloem layer around the xylem. A second stem has a ring of bark and phloem removed while the xylem remains. Tissue swells above the ring as transported substances accumulate there.",
  "Compare the stems. With phloem removed around the ring, sugars transported from the leaves can accumulate above it. The remaining xylem is shown intact.",
  `<path d="M105 45h95v190h-95z" fill="#c79b77" stroke="#805d45" stroke-width="3"/><rect x="127" y="45" width="51" height="190" fill="#efe1c9" stroke="#a68262" stroke-width="2"/>
   <path d="M368 45h95v70q24 14 13 33h-121q-11-19 13-33z" fill="#c79b77" stroke="#805d45" stroke-width="3"/><rect x="368" y="177" width="95" height="58" fill="#c79b77" stroke="#805d45" stroke-width="3"/><rect x="390" y="45" width="51" height="190" fill="#efe1c9" stroke="#a68262" stroke-width="2"/>
   <text x="153" y="28" text-anchor="middle">Before</text><text x="416" y="28" text-anchor="middle">After ringing</text><text x="28" y="275">Outer bark and phloem</text><path d="M142 260l-25-80" stroke="#344958"/><text x="298" y="275">Xylem remains</text><path d="M394 260l20-72" stroke="#344958"/>
   <text x="492" y="114">Swelling</text><path d="M490 118l-18 10" stroke="#344958"/><text x="491" y="178">Ring removed</text><path d="M490 182l-29-15" stroke="#344958"/>`, 300);
 const figures = {"a3/xylem/0": xylemRoute, "a3/xylem/1": xylemColumn + potometer, "a3/phloem/0": massFlow, "a3/phloem/1": ringing};
 window.ALevelTransportFigures = {render(topic, id, group) {return figures[topic + "/" + id + "/" + group] || "";}};
})();

/* Original compact A-level plant-transport practical diagrams. */
(function () {
 "use strict";
 const figures={
  "a3/xylem/1": {
   title:"A bubble potometer measures uptake",
   alt:"A leafy shoot is connected to a water-filled capillary tube whose open end is beneath the surface of water in a beaker. An air bubble in the capillary moves towards the shoot as water is taken up. A ruler along the capillary measures bubble movement over time.",
   caption:"Follow the bubble towards the shoot and measure its movement over time. Water uptake estimates transpiration rather than measuring it directly: some absorbed water is used or retained.",
   height:330,
   art:`<text x="70" y="23" text-anchor="middle">Leafy shoot</text><path d="M68 127V45" fill="none" stroke="#4b8361" stroke-width="5"/><path d="M68 75Q44 43 24 57Q42 82 68 75M68 59Q91 27 112 42Q95 66 68 59" fill="#9fd3aa" stroke="#4b8361" stroke-width="2"/><path d="M68 126v43h165v66" fill="none" stroke="#47788b" stroke-width="12"/><path d="M68 126v43h165v66" fill="none" stroke="#e4f5fb" stroke-width="6"/><rect x="135" y="165" width="17" height="8" rx="4" fill="#fff" stroke="#47788b" stroke-width="2"/><path d="M128 150H98m7-6-7 6 7 6" fill="none" stroke="#386ba8" stroke-width="3"/><text x="147" y="136" text-anchor="middle">Bubble</text><path d="M40 189h155m-140 0v6m20-6v6m20-6v6m20-6v6m20-6v6m20-6v6m20-6v6" stroke="#344958" stroke-width="2"/><text x="113" y="216" text-anchor="middle">Ruler</text><path d="M205 207v60h62v-60" fill="#e6f4fa" stroke="#6d8d96" stroke-width="2"/><path d="M206 220h60" stroke="#79aabc" stroke-width="2"/><path d="M233 220v15" stroke="#47788b" stroke-width="12"/><path d="M233 220v15" stroke="#e4f5fb" stroke-width="6"/><text x="236" y="289" text-anchor="middle">Water</text><text x="150" y="319" text-anchor="middle">Open end stays underwater</text>`
  },
  "a3/phloem/1": {
   title:"Ringing and translocation evidence",
   alt:"Two schematic stem sections are compared. Before ringing, outer bark and phloem surround the xylem. After a ring of bark and phloem is removed, the xylem remains continuous through the gap. Tissue swells above the ring as transported sugars accumulate there.",
   caption:"Compare the stems: after the phloem is removed, sugars can accumulate above the ring and the tissue swells. The xylem remains intact; this is a simplified stem section.",
   height:330,
   art:`<text x="62" y="24" text-anchor="middle">Before</text><text x="153" y="24" text-anchor="middle">After</text><rect x="34" y="42" width="56" height="181" fill="#c79b77" stroke="#805d45" stroke-width="2"/><rect x="51" y="42" width="22" height="181" fill="#efe1c9" stroke="#a68262" stroke-width="2"/><path d="M125 42h56v62q13 13 7 28h-70q-6-15 7-28Z" fill="#c79b77" stroke="#805d45" stroke-width="2"/><rect x="125" y="168" width="56" height="55" fill="#c79b77" stroke="#805d45" stroke-width="2"/><rect x="142" y="42" width="22" height="181" fill="#efe1c9" stroke="#a68262" stroke-width="2"/><text x="205" y="76">Swelling</text><text x="205" y="94">above ring</text><path d="M204 101l-17 17" stroke="#344958" stroke-width="2"/><text x="205" y="146">Ring</text><text x="205" y="164">removed</text><path d="M202 153h-23" stroke="#344958" stroke-width="2"/><text x="205" y="206">Xylem</text><text x="205" y="224">continuous</text><path d="M202 213l-38-20" stroke="#344958" stroke-width="2"/><text x="150" y="265" text-anchor="middle">Outer layer: bark and phloem</text>`
  }
 };
 window.ALevelTransportDetails={render(topic,id,group){
  const f=figures[topic+"/"+id+"/"+group]; if(!f)return "";
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 }};
})();

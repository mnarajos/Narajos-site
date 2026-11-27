/* Original schematic figures for A-level immunity catch-up. */
(function () {
 "use strict";
 const figures = {
  "a2/phago/1": {
   title: "Phagocytosis and digestion",
   alt: "Three stages: a phagocyte surrounds a pathogen, enclosing it in a phagosome. A lysosome fuses with the phagosome. Enzymes then digest the engulfed pathogen.",
   caption: "Follow the pathogen into a phagosome, then a lysosome approaches and fuses with it. Lysosomal enzymes digest the engulfed material. The stages are schematic.",
   height: 385,
   art: `<text x="150" y="24" text-anchor="middle">1 · Engulf</text><circle cx="69" cy="84" r="38" fill="#d8ece5" stroke="#32776d" stroke-width="3"/><circle cx="69" cy="35" r="9" fill="#d08b69" stroke="#9d563b" stroke-width="2"/><path d="M69 48v12m-5-5 5 5 5-5" stroke="#344958" stroke-width="2" fill="none"/><text x="128" y="81">Phagocyte</text><text x="128" y="104">surrounds pathogen</text><path d="M69 128v23m-5-6 5 6 5-6" stroke="#344958" stroke-width="2" fill="none"/><text x="150" y="162" text-anchor="middle">2 · Fuse</text><circle cx="69" cy="211" r="38" fill="#d8ece5" stroke="#32776d" stroke-width="3"/><circle cx="60" cy="203" r="17" fill="#fff" stroke="#496f90" stroke-width="2"/><circle cx="60" cy="203" r="9" fill="#d08b69" stroke="#9d563b" stroke-width="2"/><circle cx="90" cy="222" r="8" fill="#eacb82" stroke="#a5792e" stroke-width="2"/><path d="M82 219l-9-7m2 7-2-7 7 1" stroke="#344958" stroke-width="2" fill="none"/><text x="128" y="205">Phagosome +</text><text x="128" y="228">lysosome</text><path d="M69 255v23m-5-6 5 6 5-6" stroke="#344958" stroke-width="2" fill="none"/><text x="150" y="288" text-anchor="middle">3 · Digest</text><circle cx="69" cy="336" r="38" fill="#d8ece5" stroke="#32776d" stroke-width="3"/><circle cx="69" cy="336" r="18" fill="#fff" stroke="#496f90" stroke-width="2"/><g fill="#9d563b"><circle cx="61" cy="330" r="3"/><circle cx="76" cy="331" r="3"/><circle cx="70" cy="344" r="3"/></g><text x="128" y="331">Enzymes digest</text><text x="128" y="354">the pathogen</text>`
  },
  "a2/humoral/0": {
   title: "Clonal selection of a B cell",
   alt: "A foreign antigen binds a B cell whose surface antibody is complementary. With helper T-cell stimulation the selected B cell divides by mitosis. Its clone differentiates into antibody-secreting plasma cells and memory cells.",
   caption: "Follow the selected B cell: helper T-cell stimulation supports division, producing plasma cells and memory cells. Cells descended from the selected B cell have the same antigen specificity.",
   height: 385,
   art: `<text x="150" y="24" text-anchor="middle">Antigen binds matching B cell</text><g transform="translate(0 25)"><circle cx="150" cy="79" r="33" fill="#d8ece5" stroke="#32776d" stroke-width="3"/><path d="M150 46V35m0 8-8-8m8 8 8-8" stroke="#32776d" stroke-width="3" fill="none"/><path d="M150 31l-8-9 8-9 8 9z" fill="#d08b69" stroke="#9d563b" stroke-width="2"/><text x="150" y="85" text-anchor="middle">B cell</text><text x="17" y="129">Helper T cell</text><path d="M116 124h29m-7-6 7 6-7 6" stroke="#344958" stroke-width="2" fill="none"/><path d="M150 116v26m-6-7 6 7 6-7" stroke="#344958" stroke-width="2" fill="none"/><text x="150" y="165" text-anchor="middle">Mitosis · clone</text><circle cx="150" cy="198" r="20" fill="#d8ece5" stroke="#32776d" stroke-width="2"/><path d="M132 211l-45 31m2-9-2 9 9-2M168 211l45 31m-9-2 9 2-2-9" stroke="#344958" stroke-width="2" fill="none"/><circle cx="75" cy="269" r="24" fill="#d5ddf1" stroke="#516eaa" stroke-width="2"/><circle cx="225" cy="269" r="24" fill="#f4dfba" stroke="#a5792e" stroke-width="2"/><text x="75" y="315" text-anchor="middle">Plasma cells</text><text x="75" y="339" text-anchor="middle">secrete antibody</text><text x="225" y="315" text-anchor="middle">Memory cells</text><text x="225" y="339" text-anchor="middle">remain</text></g>`
  },
  "a2/humoral/1": {
   title: "Antibody binding and agglutination",
   alt: "An antibody has two antigen-binding tips in its variable regions and a constant region. Antibodies can link antigens on separate pathogens together, causing agglutination.",
   caption: "Locate the two binding sites at the antibody tips. Antibodies can link pathogens into a clump, helping phagocytes engulf them. Antibody and pathogen shapes are simplified.",
   height: 395,
   art: `<text x="150" y="23" text-anchor="middle">Antibody</text><path d="M150 151v-48l-55-50m55 50 55-50" fill="none" stroke="#516eaa" stroke-width="11" stroke-linecap="round"/><circle cx="95" cy="53" r="6" fill="#9d563b"/><circle cx="205" cy="53" r="6" fill="#9d563b"/><text x="150" y="39" text-anchor="middle">Binding sites</text><path d="M119 42l-18 8M181 42l18 8" stroke="#344958" stroke-width="2"/><text x="150" y="186" text-anchor="middle">Constant region</text><path d="M150 168v-12" stroke="#344958" stroke-width="2"/><path d="M20 209h260" stroke="#d6e1de" stroke-width="2"/><text x="150" y="236" text-anchor="middle">Pathogens linked together</text><circle cx="63" cy="292" r="35" fill="#e9c2ad" stroke="#9d563b" stroke-width="3"/><circle cx="237" cy="292" r="35" fill="#e9c2ad" stroke="#9d563b" stroke-width="3"/><path d="M98 283l52 31 52-31m-52 31v24" fill="none" stroke="#516eaa" stroke-width="6" stroke-linecap="round"/><circle cx="98" cy="283" r="5" fill="#9d563b"/><circle cx="202" cy="283" r="5" fill="#9d563b"/><text x="150" y="376" text-anchor="middle">Agglutination</text>`
  },
  "a2/humoral/2": {
   title: "Primary and secondary antibody responses",
   alt: "Illustrative graph of antibody concentration against time after exposure. The primary response rises slowly to a smaller peak. The secondary response rises sooner and reaches a larger peak after later exposure to the same antigen. No numerical values are implied.",
   caption: "Compare the curves after each exposure to the same antigen. Memory cells contribute to the faster, larger secondary response. This is a schematic graph, not experimental data.",
   height: 330,
   art: `<path d="M52 49v176h223" stroke="#344958" stroke-width="2" fill="none"/><text x="18" y="137" text-anchor="middle" transform="rotate(-90 18 137)">Antibody concentration</text><path d="M53 223h42C102 223 103 202 111 196C121 188 128 219 145 223H160" fill="none" stroke="#397fa4" stroke-width="4"/><path d="M160 223h4C166 223 168 126 174 85C180 60 185 64 191 80C207 110 220 190 240 215Q260 223 272 223" fill="none" stroke="#a05a75" stroke-width="4" stroke-dasharray="8 4"/><text x="83" y="185">Primary</text><text x="183" y="45">Secondary</text><path d="M75 251v-22m-5 5 5-5 5 5M160 251v-22m-5 5 5-5 5 5" stroke="#344958" stroke-width="2" fill="none"/><text x="75" y="272" text-anchor="middle">First</text><text x="75" y="292" text-anchor="middle">exposure</text><text x="160" y="272" text-anchor="middle">Later</text><text x="160" y="292" text-anchor="middle">exposure</text><text x="235" y="315" text-anchor="middle">Time →</text>`
  }
 };
 window.ALevelImmunityFigures = {render(topic, id, group) {
  const f = figures[topic + "/" + id + "/" + group];
  if (!f) return "";
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font: 16px system-ui, sans-serif; fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 }};
})();

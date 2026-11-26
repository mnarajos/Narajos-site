/* Original schematic figures for A-level immunity catch-up. */
(function () {
 "use strict";
 const figures = {
  "a2/phago/1": {
   title: "Phagocytosis and digestion",
   alt: "Three stages: a phagocyte surrounds a pathogen, enclosing it in a phagosome. A lysosome fuses with the phagosome. Enzymes then digest the engulfed pathogen.",
   caption: "Follow the pathogen into a phagosome, then a lysosome approaches and fuses with it. Lysosomal enzymes digest the engulfed material. The stages are schematic.",
   art: `<text x="100" y="28" text-anchor="middle">1. Engulf</text><text x="300" y="28" text-anchor="middle">2. Lysosome</text><text x="500" y="28" text-anchor="middle">3. Digest</text>
    <path d="M37 86Q25 165 100 171Q175 165 163 86Q147 109 127 94Q100 75 73 94Q53 109 37 86Z" fill="#d8ece5" stroke="#32776d" stroke-width="3"/>
    <circle cx="100" cy="79" r="16" fill="#d08b69" stroke="#9d563b" stroke-width="3"/><path d="M100 49v12m-6-7 6 7 6-7" fill="none" stroke="#344958" stroke-width="3"/>
    <circle cx="300" cy="120" r="62" fill="#d8ece5" stroke="#32776d" stroke-width="3"/><circle cx="291" cy="111" r="25" fill="#fff" stroke="#496f90" stroke-width="3"/><circle cx="291" cy="111" r="14" fill="#d08b69" stroke="#9d563b" stroke-width="3"/><circle cx="329" cy="139" r="13" fill="#eacb82" stroke="#a5792e" stroke-width="3"/>
    <circle cx="500" cy="120" r="62" fill="#d8ece5" stroke="#32776d" stroke-width="3"/><circle cx="500" cy="120" r="28" fill="#fff" stroke="#496f90" stroke-width="3"/><g fill="#9d563b"><circle cx="492" cy="111" r="4"/><circle cx="509" cy="112" r="4"/><circle cx="500" cy="128" r="4"/></g>
    <path d="M172 120h49m-8-7 8 7-8 7m167-7h39m-8-7 8 7-8 7" fill="none" stroke="#344958" stroke-width="3"/>
    <text x="100" y="211" text-anchor="middle">Phagocyte</text><text x="300" y="201" text-anchor="middle">Phagosome + lysosome</text><text x="500" y="201" text-anchor="middle">Enzymes break down</text><text x="500" y="221" text-anchor="middle">the pathogen</text>`
  },
  "a2/humoral/0": {
   title: "Clonal selection of a B cell",
   alt: "A foreign antigen binds a B cell whose surface antibody is complementary. With helper T-cell stimulation the selected B cell divides by mitosis. Its clone differentiates into antibody-secreting plasma cells and memory cells.",
   caption: "Follow the selected B cell: helper T-cell stimulation supports division, producing plasma cells and memory cells. Cells descended from the selected B cell have the same antigen specificity.",
   art: `<circle cx="72" cy="112" r="37" fill="#d8ece5" stroke="#32776d" stroke-width="3"/><path d="M90 78l9-12m-9 12-11-5m11 5 1 11" stroke="#32776d" stroke-width="4" fill="none"/><path d="M112 55l-10 11-11-5 10-11z" fill="#d08b69" stroke="#9d563b" stroke-width="2"/>
    <text x="72" y="183" text-anchor="middle">Matching B cell</text><text x="75" y="205" text-anchor="middle">+ antigen</text>
    <path d="M125 111h60m-8-7 8 7-8 7" stroke="#344958" stroke-width="3" fill="none"/><text x="175" y="30" text-anchor="middle">Helper T cell</text><text x="175" y="50" text-anchor="middle">stimulates</text>
    <circle cx="236" cy="112" r="37" fill="#d8ece5" stroke="#32776d" stroke-width="3"/><text x="236" y="117" text-anchor="middle">Clone</text><text x="236" y="183" text-anchor="middle">Mitosis</text>
    <path d="M275 99l58-37m-4 10 4-10-11 1M275 125l58 37m-11-1 11 1-4-10" stroke="#344958" stroke-width="3" fill="none"/>
    <circle cx="370" cy="58" r="28" fill="#d5ddf1" stroke="#516eaa" stroke-width="3"/><circle cx="370" cy="162" r="28" fill="#f4dfba" stroke="#a5792e" stroke-width="3"/>
    <text x="413" y="55">Plasma cells</text><text x="413" y="75">secrete antibodies</text><text x="413" y="157">Memory cells</text><text x="413" y="177">remain for later</text>`
  },
  "a2/humoral/1": {
   title: "Antibody binding and agglutination",
   alt: "An antibody has two antigen-binding tips in its variable regions and a constant region. Antibodies can link antigens on separate pathogens together, causing agglutination.",
   caption: "Locate the two binding sites at the antibody tips. Antibodies can link pathogens into a clump, helping phagocytes engulf them. Antibody and pathogen shapes are simplified.",
   art: `<text x="150" y="30" text-anchor="middle">Antibody</text><text x="450" y="30" text-anchor="middle">Pathogens linked together</text>
    <path d="M150 174v-55l-45-45m45 45 45-45" fill="none" stroke="#516eaa" stroke-width="14" stroke-linecap="round"/>
    <circle cx="105" cy="74" r="6" fill="#9d563b"/><circle cx="195" cy="74" r="6" fill="#9d563b"/>
    <text x="50" y="57">Binding site</text><path d="M125 61l-15 10" stroke="#344958"/><text x="50" y="216">Constant region</text><path d="M155 201l-5-22" stroke="#344958"/>
    <circle cx="388" cy="117" r="34" fill="#e9c2ad" stroke="#9d563b" stroke-width="3"/><circle cx="510" cy="117" r="34" fill="#e9c2ad" stroke="#9d563b" stroke-width="3"/>
    <path d="M421 106l27 13 29-13m-29 13v22" fill="none" stroke="#516eaa" stroke-width="6" stroke-linecap="round"/><circle cx="421" cy="106" r="4" fill="#9d563b"/><circle cx="477" cy="106" r="4" fill="#9d563b"/>
    
    <text x="450" y="213" text-anchor="middle">Agglutination</text>`
  },
  "a2/humoral/2": {
   title: "Primary and secondary antibody responses",
   alt: "Illustrative graph of antibody concentration against time after exposure. The primary response rises slowly to a smaller peak. The secondary response rises sooner and reaches a larger peak after later exposure to the same antigen. No numerical values are implied.",
   caption: "Compare the curves after each exposure to the same antigen. Memory cells contribute to the faster, larger secondary response. This is a schematic graph, not experimental data.",
   art: `<path d="M72 25V190H550" stroke="#344958" stroke-width="3" fill="none"/>
    <path d="M72 188L122 188C140 188 145 174 155 165C169 151 184 160 196 174C207 185 218 188 240 188" fill="none" stroke="#397fa4" stroke-width="4"/>
    <path d="M277 188C286 188 292 125 309 86C323 54 341 42 358 56C379 73 388 120 398 151C408 180 427 188 450 188" fill="none" stroke="#a05a75" stroke-width="4" stroke-dasharray="8 4"/>
    <path d="M122 219v-23m-6 7 6-7 6 7M277 219v-23m-6 7 6-7 6 7" fill="none" stroke="#344958" stroke-width="3"/>
    <text x="122" y="240" text-anchor="middle">First exposure</text><text x="277" y="240" text-anchor="middle">Later exposure</text><text x="465" y="214" text-anchor="middle">Time →</text>
    <text x="23" y="110" transform="rotate(-90 23 110)" text-anchor="middle">Antibody concentration</text><text x="151" y="145">Primary</text><text x="375" y="68">Secondary</text>`
  }
 };
 window.ALevelImmunityFigures = {render(topic, id, group) {
  const f = figures[topic + "/" + id + "/" + group];
  if (!f) return "";
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art" tabindex="0" role="region" aria-label="Scrollable science diagram"><svg viewBox="0 0 600 260" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font: 15px system-ui, sans-serif; fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 }};
})();

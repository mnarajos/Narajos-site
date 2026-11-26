/* Original, schematic figures for A-level catch-up key-idea groups. */
(function () {
 "use strict";
 const figures = {
  "a2/membrane/0": {
   title: "The fluid-mosaic membrane",
   alt: "Cross-section of a membrane: two layers of phospholipids have water-facing heads and inward-facing tails. A protein spans the bilayer. Cholesterol sits between phospholipid tails. A carbohydrate chain on the outside is attached to a membrane protein.",
   caption: "Locate the water-facing heads and inward-facing tails. The protein and cholesterol are embedded in the bilayer; the carbohydrate chain projects outside. Shapes and spacing are simplified.",
   art: `<text x="120" y="26" text-anchor="middle">Outside cell</text>
    <g fill="#a8d8d1" stroke="#296b65" stroke-width="2">
    ${[60,100,140,180,220,260,300,340,380,420,460,500,540].map(x=>`<circle cx="${x}" cy="65" r="11"/><circle cx="${x}" cy="165" r="11"/>`).join("")}</g>
    <g stroke="#47747a" stroke-width="3">${[60,100,140,180,220,260,300,340,380,420,460,500,540].map(x=>`<path d="M${x-4} 76v30m8-30v30m-8 48v-30m8 30v-30"/>`).join("")}</g>
    <path d="M260 53 Q238 90 257 115 Q239 142 260 177 L315 177 Q333 145 317 115 Q331 86 315 53Z" fill="#b9c9ee" stroke="#516eaa" stroke-width="3"/>
    <path d="M287 52V38l-12-9 12-9 12 9 12-9" fill="none" stroke="#995b86" stroke-width="4"/>
    <path d="M391 91l8 8-7 11 7 11-9 9" fill="none" stroke="#bc7729" stroke-width="5"/>
    <text x="75" y="222">Phospholipid</text><path d="M125 208L101 175" stroke="#344958" fill="none"/>
    <text x="263" y="222">Protein</text><path d="M292 208l-5-30" stroke="#344958" fill="none"/>
    <text x="408" y="222">Cholesterol</text><path d="M457 208l-62-78" stroke="#344958" fill="none"/>
    <text x="354" y="40">Carbohydrate chain</text><path d="M349 43l-38-14" stroke="#344958" fill="none"/>
    <text x="300" y="250" text-anchor="middle">Cytoplasm</text>`
  },
  "a1/enzymes/1": {
   title: "Induced fit at the active site",
   alt: "A complementary substrate approaches an enzyme active site. On binding, the enzyme changes shape slightly around the substrate. Products then leave the enzyme.",
   caption: "Follow the substrate into the active site. Binding changes the enzyme’s shape slightly; the enzyme can be reused after products leave. Shapes are a simplified model.",
   art: `<text x="95" y="30" text-anchor="middle">Substrate approaches</text><text x="300" y="30" text-anchor="middle">Induced fit</text><text x="505" y="30" text-anchor="middle">Products leave</text>
    <g fill="#b9dcd5" stroke="#32776d" stroke-width="3"><path d="M20 180Q15 95 65 85L78 115H112L125 85Q175 95 170 180Z"/><path d="M225 180Q220 95 270 85L279 110Q300 124 321 110L330 85Q380 95 375 180Z"/><path d="M430 180Q425 95 475 85L488 115H522L535 85Q585 95 580 180Z"/></g>
    <g fill="#efbb83" stroke="#a76125" stroke-width="3"><path d="M78 48h34v43H78z"/><path d="M283 75h34v39h-34z"/><path d="M475 45h14v30h-14zM510 45h14v30h-14z"/></g>
    <path d="M179 120h31m-8-6 8 6-8 6m181-6h31m-8-6 8 6-8 6" stroke="#344958" stroke-width="3" fill="none"/>
    <text x="95" y="211" text-anchor="middle">Enzyme</text><text x="300" y="211" text-anchor="middle">Enzyme–substrate complex</text><text x="505" y="211" text-anchor="middle">Enzyme unchanged overall</text>`
  },
  "a2/active/1": {
   title: "Glucose absorption by an ileum cell",
   alt: "Across an epithelial cell, sodium and glucose enter from the intestinal lumen together through a co-transporter. Sodium is pumped from the cell towards the blood using energy from ATP hydrolysis. Glucose leaves through a carrier by facilitated diffusion.",
   caption: "Trace sodium: the pump keeps its concentration low in the cell, so sodium can enter from the lumen with glucose. Glucose then leaves by facilitated diffusion. The diagram is simplified.",
   art: `<rect x="185" y="50" width="230" height="150" rx="12" fill="#e5f3ee" stroke="#32776d" stroke-width="3"/><text x="82" y="38" text-anchor="middle">Lumen</text><text x="300" y="38" text-anchor="middle">Epithelial cell</text><text x="515" y="38" text-anchor="middle">Blood side</text>
    <rect x="172" y="84" width="27" height="62" rx="8" fill="#c5d6f1" stroke="#516eaa" stroke-width="2"/><rect x="402" y="68" width="27" height="48" rx="8" fill="#f2d0ae" stroke="#ab682d" stroke-width="2"/><rect x="402" y="147" width="27" height="40" rx="8" fill="#c5d6f1" stroke="#516eaa" stroke-width="2"/>
    <path d="M75 104h175m-9-7 9 7-9 7M75 130h175m-9-7 9 7-9 7M355 91h150m-9-7 9 7-9 7M355 166h150m-9-7 9 7-9 7" fill="none" stroke="#344958" stroke-width="3"/>
    <text x="75" y="96">Na⁺</text><text x="75" y="122">Glucose</text><text x="455" y="84">Na⁺</text><text x="442" y="158">Glucose</text>
    <text x="300" y="225" text-anchor="middle">Co-transporter</text><path d="M246 213l-55-69" stroke="#344958"/><text x="440" y="225">ATP-powered pump</text><path d="M480 211l-55-106" stroke="#344958"/>`
  },
  "a2/euk/0": {
   title: "Inside a eukaryotic cell",
   alt: "Schematic animal cell with a cell-surface membrane, nucleus containing a nucleolus, a mitochondrion, rough endoplasmic reticulum studded with ribosomes, and a Golgi apparatus.",
   caption: "Locate the nucleus, mitochondrion, rough ER and Golgi apparatus. This simplified animal cell omits many structures; plant and algal cells also contain chloroplasts.",
   art: `<ellipse cx="300" cy="125" rx="200" ry="95" fill="#eef8f5" stroke="#32776d" stroke-width="3"/><circle cx="250" cy="120" r="42" fill="#d8d9f2" stroke="#665e99" stroke-width="3"/><circle cx="250" cy="120" r="12" fill="#665e99"/>
    <ellipse cx="380" cy="95" rx="38" ry="21" fill="#f5c9ad" stroke="#ad6436" stroke-width="3"/><path d="M351 94q10-15 20 0t20 0t15 0" fill="none" stroke="#ad6436" stroke-width="3"/>
    <path d="M190 167q55-15 105 0m-105 9q55-15 105 0m-105 9q55-15 105 0" fill="none" stroke="#4979a3" stroke-width="4"/><g fill="#2e638e"><circle cx="205" cy="160" r="3"/><circle cx="225" cy="157" r="3"/><circle cx="245" cy="156" r="3"/><circle cx="265" cy="157" r="3"/><circle cx="285" cy="160" r="3"/></g>
    <path d="M340 165q30 15 60 0m-60 8q30 15 60 0m-60 8q30 15 60 0" fill="none" stroke="#ab708b" stroke-width="4"/>
    <text x="70" y="55">Nucleus</text><path d="M142 58l70 44" stroke="#344958"/><text x="420" y="48">Mitochondrion</text><path d="M430 52l-30 25" stroke="#344958"/>
    <text x="60" y="240">Rough ER + ribosomes</text><path d="M208 226l20-42" stroke="#344958"/><text x="370" y="240">Golgi apparatus</text><path d="M405 226l-35-40" stroke="#344958"/>`
  },
  "a2/prok/0": {
   title: "A bacterial cell",
   alt: "Schematic bacterial cell with a cell-surface membrane inside a cell wall. Its cytoplasm contains small ribosomes, circular DNA free in the cytoplasm, and a plasmid. A flagellum extends from the cell.",
   caption: "Locate the free circular DNA and the smaller plasmid: neither is enclosed in a nucleus. Some bacteria have flagella and plasmids. The shapes and relative sizes are simplified.",
   art: `<rect x="110" y="60" width="370" height="135" rx="67" fill="#d4ebe6" stroke="#32776d" stroke-width="7"/><rect x="120" y="70" width="350" height="115" rx="57" fill="#f1faf7" stroke="#426c9c" stroke-width="3"/>
    <path d="M220 99c-35 10-32 48 3 55 22 5 26-20 48-13 35 11 45-20 16-33-22-10-38 5-67-9z" fill="none" stroke="#865a9b" stroke-width="4"/><circle cx="357" cy="125" r="17" fill="none" stroke="#b66f24" stroke-width="4"/>
    <g fill="#426c9c"><circle cx="160" cy="120" r="4"/><circle cx="187" cy="145" r="4"/><circle cx="320" cy="100" r="4"/><circle cx="390" cy="155" r="4"/><circle cx="420" cy="110" r="4"/></g><path d="M480 128c42-20 65 25 100 0" fill="none" stroke="#32776d" stroke-width="4"/>
    <text x="60" y="38">Cell wall</text><path d="M132 42l30 20" stroke="#344958"/><text x="240" y="34">Circular DNA</text><path d="M285 39l-30 62" stroke="#344958"/><text x="405" y="38">Plasmid</text><path d="M430 42l-61 71" stroke="#344958"/>
    <text x="75" y="237">Ribosomes</text><path d="M145 224l38-75" stroke="#344958"/><text x="300" y="237">Cell-surface membrane</text><path d="M400 223l20-40" stroke="#344958"/>`
  },
  "a3/vessels/1": {
   title: "Compare blood vessel walls",
   alt: "Schematic cross-sections compare an artery with a thick wall and narrower lumen, a vein with a thinner wall and wider lumen, and a capillary with a one-cell-thick endothelial wall. The vessels are not drawn to the same scale.",
   caption: "Compare wall thickness and lumen in the artery and vein; the capillary wall is one endothelial cell thick. Vessels are not drawn to the same scale. Vein valves are omitted from these cross-sections.",
   art: `<text x="100" y="35" text-anchor="middle">Artery</text><text x="300" y="35" text-anchor="middle">Vein</text><text x="500" y="35" text-anchor="middle">Capillary</text>
    <circle cx="100" cy="120" r="68" fill="#ddaaa7" stroke="#9d5e62" stroke-width="3"/><circle cx="100" cy="120" r="32" fill="#fff" stroke="#954f60" stroke-width="3"/>
    <circle cx="300" cy="120" r="68" fill="#b9c9e2" stroke="#5d7095" stroke-width="3"/><circle cx="300" cy="120" r="53" fill="#fff" stroke="#5d7095" stroke-width="3"/>
    <circle cx="500" cy="120" r="58" fill="#fff" stroke="#985b72" stroke-width="5"/>
    <text x="100" y="125" text-anchor="middle">Lumen</text><text x="300" y="125" text-anchor="middle">Lumen</text><text x="500" y="125" text-anchor="middle">Lumen</text>
    <text x="100" y="225" text-anchor="middle">Thicker wall</text><text x="300" y="225" text-anchor="middle">Thinner wall</text><text x="500" y="215" text-anchor="middle">One-cell-thick</text><text x="500" y="235" text-anchor="middle">endothelium</text>`
  },
  "a3/lungs/1": {
   title: "Across the alveolar exchange surface",
   alt: "An alveolar air space lies above a blood capillary. Oxygen crosses the thin alveolar epithelium and capillary endothelium into blood; carbon dioxide crosses in the opposite direction.",
   caption: "Follow oxygen across the two thin cell layers into blood. Ventilation and blood flow help maintain the concentration gradients. The layers are shown enlarged.",
   art: `<rect x="45" y="25" width="510" height="80" rx="20" fill="#e5f3fa"/><text x="300" y="57" text-anchor="middle">Alveolar air</text>
    <path d="M45 111h510" stroke="#4979a3" stroke-width="5"/><path d="M45 121h510" stroke="#aa607a" stroke-width="5"/><rect x="45" y="130" width="510" height="70" rx="20" fill="#fae9ea"/><ellipse cx="425" cy="165" rx="35" ry="19" fill="#cc8794"/><text x="160" y="166">Blood capillary</text>
    <path d="M235 75v78m-7-8 7 8 7-8M365 155V77m-7 8 7-8 7 8" stroke="#344958" stroke-width="3" fill="none"/><text x="215" y="82">O₂</text><text x="372" y="82">CO₂</text>
    <text x="40" y="239">Two thin layers: alveolar epithelium + capillary endothelium</text>`
  },
  "a4/transcription/0": {
   title: "Base pairing during transcription",
   alt: "The DNA template strand runs 3 prime to 5 prime with bases TAC GGA TTC. Complementary RNA runs 5 prime to 3 prime with bases AUG CCU AAG. The RNA uses uracil where it pairs with adenine in the template.",
   caption: "Compare the template with the RNA: A pairs with U in RNA. RNA polymerase joins RNA nucleotides; this is only a short section, shown with the strands apart for clarity.",
   art: `<text x="55" y="50">DNA template</text><text x="85" y="92" style="font: 24px monospace">3′  TAC  GGA  TTC  5′</text>
    
    <text x="85" y="160" style="font: 24px monospace">5′  AUG  CCU  AAG  3′</text><text x="55" y="204">RNA made by RNA polymerase</text>`
  },
  "a4/transcription/1": {
   title: "Splicing eukaryotic pre-mRNA",
   alt: "A pre-mRNA sequence has three exons separated by two introns. The introns are removed and the exons are joined to produce mature mRNA.",
   caption: "Follow the exons: splicing removes introns and joins the remaining exons in mature mRNA. Segment lengths are illustrative.",
   art: `<text x="40" y="43">Pre-mRNA</text><g stroke="#566d81" stroke-width="2"><rect x="45" y="62" width="90" height="40" fill="#a9d7d0"/><rect x="135" y="62" width="75" height="40" fill="#f1e2ce"/><rect x="210" y="62" width="90" height="40" fill="#a9d7d0"/><rect x="300" y="62" width="75" height="40" fill="#f1e2ce"/><rect x="375" y="62" width="90" height="40" fill="#a9d7d0"/></g>
    <text x="90" y="89" text-anchor="middle">Exon</text><text x="172" y="89" text-anchor="middle">Intron</text><text x="255" y="89" text-anchor="middle">Exon</text><text x="337" y="89" text-anchor="middle">Intron</text><text x="420" y="89" text-anchor="middle">Exon</text>
    <path d="M255 111v29m-7-8 7 8 7-8" fill="none" stroke="#344958" stroke-width="3"/><text x="40" y="169">Mature mRNA</text><g stroke="#566d81" stroke-width="2" fill="#a9d7d0"><rect x="45" y="180" width="90" height="40"/><rect x="135" y="180" width="90" height="40"/><rect x="225" y="180" width="90" height="40"/></g><text x="90" y="207" text-anchor="middle">Exon</text><text x="180" y="207" text-anchor="middle">Exon</text><text x="270" y="207" text-anchor="middle">Exon</text>`
  },
  "a4/translation/0": {
   title: "Codons and tRNA anticodons",
   alt: "Inside a ribosome two mRNA codons, AUG and GCU, run 5 prime to 3 prime. They pair with tRNA anticodons UAC and CGA running 3 prime to 5 prime. The tRNAs carry methionine and alanine respectively.",
   caption: "Read the mRNA 5′ to 3′. Each tRNA anticodon pairs with a complementary codon and carries its specific amino acid. This is a short example, not the whole mRNA.",
   art: `<ellipse cx="300" cy="150" rx="175" ry="88" fill="#e1eaf8" stroke="#607da7" stroke-width="3"/><text x="470" y="100">Ribosome</text>
    <path d="M80 198h440" stroke="#435b6d" stroke-width="5"/><text x="58" y="221">5′</text><text x="525" y="221">3′</text><text x="251" y="221" style="font: 22px monospace">AUG  GCU</text><text x="445" y="221">mRNA</text>
    <path d="M265 155v-36m70 36v-36" stroke="#32776d" stroke-width="8"/><text x="248" y="180" style="font: 20px monospace">UAC</text><text x="318" y="180" style="font: 20px monospace">CGA</text>
    <circle cx="265" cy="104" r="16" fill="#efbd8b" stroke="#a76125" stroke-width="2"/><circle cx="335" cy="104" r="16" fill="#efbd8b" stroke="#a76125" stroke-width="2"/><text x="265" y="59" text-anchor="middle">Methionine</text><text x="335" y="79" text-anchor="middle">Alanine</text><text x="190" y="130">tRNA</text>`
  },
  "a4/mutation/0": {
   title: "A base substitution",
   alt: "The coding strand is shown as triplets ATG CCA GAA TTT. Substitution changes the third base of CCA to T, giving CCT. The mRNA codons CCA and CCU both specify proline.",
   caption: "Compare the middle triplet: one base has changed. Both resulting mRNA codons specify proline, illustrating why a substitution can be silent. Only part of a coding strand is shown.",
   art: `<text x="45" y="45">Original DNA coding strand</text><text x="90" y="85" style="font: 24px monospace">ATG  CCA  GAA  TTT</text>
    <text x="45" y="130">After substitution</text><text x="90" y="170" style="font: 24px monospace">ATG  CC<tspan fill="#aa4f27" font-weight="bold">T</tspan>  GAA  TTT</text>
    <text x="45" y="222">mRNA: CCA → CCU; both code for proline</text>`
  },
  "a4/mutation/1": {
   title: "A deletion can shift the reading frame",
   alt: "Original coding DNA is grouped ATG CCA GAA TTT. Deleting the first C after ATG leaves ATG CAG AAT TT: the later triplet groupings are shifted.",
   caption: "Read from the same start. Deleting one base changes how the following bases are grouped into triplets; the final TT is incomplete in this short extract.",
   art: `<text x="45" y="45">Original coding strand</text><text x="90" y="85" style="font: 24px monospace">ATG  <tspan fill="#aa4f27" font-weight="bold">C</tspan>CA  GAA  TTT</text>
    <text x="45" y="130">After the highlighted C is deleted</text><text x="90" y="170" style="font: 24px monospace">ATG  CAG  AAT  TT…</text>
    <text x="45" y="222">The downstream reading frame has shifted.</text>`
  },
  "a2/diffusion/0": {
   title: "Two routes down a concentration gradient",
   alt: "A membrane separates higher and lower solute concentrations. Small lipid-soluble molecules pass directly through the bilayer; ions pass through a channel protein. Both arrows point from higher to lower concentration.",
   caption: "Follow both arrows from higher to lower concentration. The channel gives ions a route through the membrane; neither route uses ATP.",
   art: `<text x="300" y="30" text-anchor="middle">Higher concentration</text><g fill="#b66f24"><rect x="84" y="49" width="12" height="12"/><rect x="144" y="54" width="12" height="12"/><rect x="204" y="44" width="12" height="12"/></g><g fill="#396da8"><circle cx="370" cy="55" r="6"/><circle cx="430" cy="60" r="6"/><circle cx="490" cy="50" r="6"/></g><text x="70" y="85">O₂ molecules</text><text x="365" y="85">Ions</text>
    <rect x="25" y="92" width="550" height="65" rx="8" fill="#d4ebe6" stroke="#32776d" stroke-width="2"/><path d="M398 92h65v65h-65z" fill="#b9c9ee" stroke="#516eaa" stroke-width="3"/><path d="M427 92v65" stroke="white" stroke-width="9"/>
    <path d="M150 65v120m-7-8 7 8 7-8M430 65v120m-7-8 7 8 7-8" fill="none" stroke="#344958" stroke-width="3"/>
    <text x="150" y="210" text-anchor="middle">Through bilayer</text><text x="430" y="210" text-anchor="middle">Through channel</text><text x="300" y="250" text-anchor="middle">Lower concentration</text>`
  },
  "a1/enzfactors2/1": {
   title: "Two ways inhibitors reduce activity",
   alt: "Comparison: a competitive inhibitor occupies the enzyme active site, blocking substrate binding. A non-competitive inhibitor binds at a different site and changes the active site, reducing substrate binding or catalysis.",
   caption: "Compare where each inhibitor binds. Increasing substrate concentration can reduce competitive inhibition; it does not overcome non-competitive inhibition in this model.",
   art: `<text x="150" y="30" text-anchor="middle">Competitive</text><text x="450" y="30" text-anchor="middle">Non-competitive</text>
    <g fill="#b9dcd5" stroke="#32776d" stroke-width="3"><path d="M40 185Q35 90 104 85L116 120H184L196 85Q265 90 260 185Z"/><path d="M340 185Q335 90 404 85L421 115Q450 103 479 115L496 85Q565 90 560 185Z"/></g>
    <path d="M130 86h40v34h-40z" fill="#edbd88" stroke="#a76125" stroke-width="3"/><circle cx="545" cy="145" r="14" fill="#e0b5d9" stroke="#92557e" stroke-width="3"/>
    <text x="150" y="57" text-anchor="middle">Inhibitor in active site</text><text x="450" y="57" text-anchor="middle">Active site altered</text>
    <text x="300" y="226" text-anchor="middle">Different-site inhibitor binds here →</text><path d="M465 219l67-61" stroke="#344958" fill="none"/>`
  }
 };
 window.ALevelCatchupFigures = {render(topic, id, group) {
  const f = figures[topic + "/" + id + "/" + group];
  if (!f) return "";
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art" tabindex="0" role="region" aria-label="Scrollable science diagram"><svg viewBox="0 0 600 265" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font: 15px system-ui, sans-serif; fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 }};
})();

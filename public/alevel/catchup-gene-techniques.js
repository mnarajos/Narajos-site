/* Original compact A-level mutation, stem-cell and gene-technology examples. */
(function () {
 "use strict";
 const figures={
  "a8/mut8/0": [{
   title:"Changing a DNA base sequence",
   alt:"An example DNA sequence A C G T changes in three alternative ways: substitution changes C to T; deletion removes C; addition inserts A after C. The letters are short illustrative extracts, not a real gene.",
   caption:"Compare each example with the original. Substitution replaces a base, deletion removes one, and addition inserts one. These short sequences are illustrative extracts.",
   art:`<text x="150" y="25" text-anchor="middle">Original: A C G T</text><path d="M30 45h240" stroke="#d6e1de" stroke-width="2"/><text x="30" y="80">Substitution</text><text x="220" y="80" text-anchor="middle">A T G T</text><text x="30" y="133">Deletion</text><text x="220" y="133" text-anchor="middle">A G T</text><text x="30" y="186">Addition</text><text x="220" y="186" text-anchor="middle">A C A G T</text><text x="150" y="249" text-anchor="middle">Base sequences, not proteins</text>`
  }],
  "a8/mut8/2": [{
   title:"From amino-acid change to active site",
   alt:"A comparison shows an enzyme with an active site complementary to a substrate and an altered enzyme whose changed active site does not fit that substrate. A DNA mutation can change the amino-acid sequence and the enzyme's tertiary structure, but not every mutation has this effect.",
   caption:"Compare the active sites. A change in amino-acid sequence can alter folding and substrate binding; a mutation does not necessarily change the protein or its activity.",
   art:`<text x="150" y="25" text-anchor="middle">Enzyme before change</text><path d="M50 102q0-52 46-52l12 20h84l12-20q46 0 46 52v12H50Z" fill="#d7e9d4" stroke="#32776d" stroke-width="3"/><path d="M126 52h48v18h-48Z" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><text x="150" y="139" text-anchor="middle">Substrate fits</text><text x="150" y="171" text-anchor="middle">Altered folding</text><path d="M50 249q0-52 46-52l25 18q29-14 58 0l25-18q46 0 46 52v12H50Z" fill="#d7e9d4" stroke="#32776d" stroke-width="3"/><path d="M126 187h48v18h-48Z" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><text x="150" y="283" text-anchor="middle">Substrate no longer fits</text>`
  }],
  "a8/stemcells/0": [{
   title:"Early embryo and cell specialisation",
   alt:"A simplified early embryo cell can give rise to body cell types and extraembryonic cell types. Totipotent cells occur only for a limited time in an early mammalian embryo; subsequent specialisation is associated with differential gene expression.",
   caption:"Follow the branches from a totipotent early-embryo cell. As development proceeds, cells specialise through differences in gene expression; the diagram is a simplified model.",
   art:`<text x="150" y="26" text-anchor="middle">Early embryo</text><circle cx="150" cy="76" r="29" fill="#d5c4e2" stroke="#80588f" stroke-width="3"/><text x="150" y="121" text-anchor="middle">Totipotent cell</text><path d="M150 132v24M150 156l-74 38M150 156l74 38m-9-1 9 1-4-9M85 193l-9 1 4-9" stroke="#344958" stroke-width="3" fill="none"/><circle cx="76" cy="223" r="21" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><circle cx="224" cy="223" r="21" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><text x="76" y="270" text-anchor="middle">Body types</text><text x="224" y="263" text-anchor="middle">Extraembryonic</text><text x="224" y="283" text-anchor="middle">types</text>`
  }],
  "a8/stemcells/1": [{
   title:"Stem-cell potency narrows",
   alt:"A simplified comparison shows that pluripotent cells can form many body-cell types, multipotent cells a more limited range, and unipotent cells one type. A unipotent cell in the heart can form cardiomyocytes.",
   caption:"Compare the range of potential cell types, not the illustrative symbol counts. For example, a unipotent heart cell can give rise to cardiomyocytes.",
   art:`<text x="33" y="33">Pluripotent</text><path d="M145 27h45m-7-6 7 6-7 6" stroke="#344958" stroke-width="2" fill="none"/><circle cx="210" cy="27" r="9" fill="#cbdcf0"/><path d="M229 18l10 18h-20Z" fill="#e9bd8d"/><rect x="251" y="18" width="18" height="18" fill="#d5c4e2"/><text x="33" y="100">Multipotent</text><path d="M145 94h45m-7-6 7 6-7 6" stroke="#344958" stroke-width="2" fill="none"/><circle cx="210" cy="94" r="9" fill="#cbdcf0"/><path d="M239 85l10 18h-20Z" fill="#e9bd8d"/><text x="33" y="168">Unipotent</text><path d="M145 162h45m-7-6 7 6-7 6" stroke="#344958" stroke-width="2" fill="none"/><circle cx="210" cy="162" r="9" fill="#cbdcf0"/><text x="150" y="229" text-anchor="middle">Example: heart cell lineage</text><text x="150" y="255" text-anchor="middle">→ cardiomyocytes</text>`
  }],
  "a8/stemcells/2": [{
   title:"Induced pluripotent stem cells",
   alt:"A schematic adult somatic cell receives appropriate transcription factors and is reprogrammed into an induced pluripotent stem cell. It can divide and give rise to multiple body-cell types.",
   caption:"Follow an adult somatic cell through reprogramming by transcription factors. Induced pluripotent cells can form multiple body-cell types and are studied for potential treatments.",
   art:`<circle cx="150" cy="50" r="25" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><text x="150" y="96" text-anchor="middle">Adult somatic cell</text><path d="M150 105v26m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="153" text-anchor="middle">Transcription factors</text><path d="M150 161v24m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><circle cx="150" cy="210" r="20" fill="#d5c4e2" stroke="#80588f" stroke-width="2"/><text x="150" y="253" text-anchor="middle">Induced pluripotent cell</text>`
  }],
  "a8/cancer/0": [{
   title:"Localised and invasive growth",
   alt:"A simplified comparison shows a benign tumour with a boundary remaining localised and a malignant tumour growing into neighbouring tissue. Malignant cells can spread to distant sites. Benign tumours are often, but not always, encapsulated.",
   caption:"Compare the boundaries: a benign tumour is usually localised, while malignant growth invades surrounding tissue and can spread. Growth rates and individual tumours vary.",
   art:`<text x="150" y="25" text-anchor="middle">Benign · usually localised</text><ellipse cx="150" cy="78" rx="73" ry="36" fill="#f1dfc6" stroke="#a5792e" stroke-width="5"/><g fill="#b68161"><circle cx="120" cy="70" r="8"/><circle cx="151" cy="85" r="8"/><circle cx="180" cy="70" r="8"/></g><path d="M30 138h240" stroke="#d6e1de" stroke-width="2"/><text x="150" y="162" text-anchor="middle">Malignant · invasive</text><path d="M72 209q12-32 37-23q22-24 46-6q22-20 43 7q35 1 31 30l26 13-36 3q-18 28-41 13q-26 21-46 1q-36 11-40-15l-30-3Z" fill="#e8c4bd" stroke="#a76125" stroke-width="3"/><circle cx="258" cy="262" r="7" fill="#a76125"/><text x="150" y="280" text-anchor="middle">Can spread to distant sites</text>`
  },{
   title:"When a tumour suppressor is inactive",
   alt:"A simplified pathway shows a functioning tumour suppressor helping slow cell division or support DNA repair. Loss of function through mutation or increased promoter methylation can remove that restraint and contribute to uncontrolled division.",
   caption:"Follow the loss of restraint: a tumour-suppressor gene can be inactivated by mutation or by abnormal methylation. This can contribute to uncontrolled division; it is not a guarantee of cancer.",
   art:`<text x="150" y="26" text-anchor="middle">Tumour-suppressor gene</text><path d="M38 62h224" stroke="#537a94" stroke-width="6"/><text x="150" y="98" text-anchor="middle">Function: restrain division</text><text x="150" y="120" text-anchor="middle">or support DNA repair</text><path d="M150 132v30m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="188" text-anchor="middle">Function lost or reduced</text><text x="150" y="212" text-anchor="middle">mutation / methylation</text><path d="M150 221v20m-6-6 6 6 6-6" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="267" text-anchor="middle">Less restraint on division</text>`
  }],
  "a8/cancer/1": [{
   title:"A growth-promoting gene can be overactive",
   alt:"A proto-oncogene normally helps regulate cell division. An activating mutation can produce an oncogene; reduced promoter methylation can also increase expression of a growth-promoting gene. These are distinct routes to excess growth signalling.",
   caption:"Compare two routes to increased growth signalling. An activating mutation can produce an oncogene; reduced methylation can increase expression without changing the DNA base sequence.",
   art:`<text x="150" y="25" text-anchor="middle">Proto-oncogene</text><path d="M35 58h230" stroke="#537a94" stroke-width="6"/><path d="M150 69v26m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="120" text-anchor="middle">Two possible changes</text><path d="M150 130v21M150 151l-70 32M150 151l70 32m-9-1 9 1-5-9M89 182l-9 1 5-9" stroke="#344958" stroke-width="3" fill="none"/><text x="73" y="205" text-anchor="middle">Activating</text><text x="73" y="226" text-anchor="middle">mutation</text><text x="223" y="205" text-anchor="middle">Reduced</text><text x="223" y="226" text-anchor="middle">methylation</text><text x="150" y="268" text-anchor="middle">Growth signalling may increase</text>`
  }],
  "a8/fragments/0": [{
   title:"Staggered restriction cuts",
   alt:"A DNA recognition site is shown with top strand five prime G A A T T C three prime and bottom strand three prime C T T A A G five prime. The restriction enzyme cuts after the G on the top strand and before the G on the bottom strand, producing complementary sticky ends.",
   caption:"Read each strand 5′ to 3′: the recognition sequence is palindromic. The vertical bars mark offset cuts that leave single-stranded sticky ends. This is one enzyme example.",
   art:`<text x="150" y="26" text-anchor="middle">Example recognition site</text><text x="150" y="91" text-anchor="middle" style="font:22px monospace">5′ G│A A T T C 3′</text><text x="150" y="137" text-anchor="middle" style="font:22px monospace">3′ C T T A A│G 5′</text><text x="150" y="218" text-anchor="middle">Offset cuts → sticky ends</text><text x="150" y="249" text-anchor="middle">Enzyme: EcoRI</text>`
  }],
  "a8/fragments/2": [{
   title:"Ideal PCR copy number",
   alt:"A schematic sequence shows one DNA fragment becoming two copies after one ideal PCR cycle, four after two cycles and eight after three. The pattern is two to the power of the cycle number when doubling is assumed.",
   caption:"Count the copies after each ideal cycle: 1, 2, 4, 8. The 2ⁿ relationship assumes perfect doubling; real reaction efficiency can differ.",
   art:`<text x="150" y="26" text-anchor="middle">Before cycles</text><path d="M125 47h50" stroke="#32776d" stroke-width="5"/><text x="150" y="82" text-anchor="middle">Cycle 1 · 2 copies</text><path d="M80 100h55M165 100h55" stroke="#32776d" stroke-width="5"/><text x="150" y="135" text-anchor="middle">Cycle 2 · 4 copies</text><path d="M42 153h40M100 153h40M158 153h40M216 153h40" stroke="#32776d" stroke-width="5"/><text x="150" y="188" text-anchor="middle">Cycle 3 · 8 copies</text><path d="M25 207h24M58 207h24M91 207h24M124 207h24M157 207h24M190 207h24M223 207h24M256 207h24" stroke="#32776d" stroke-width="5"/><text x="150" y="258" text-anchor="middle">Ideal copies = 2ⁿ</text>`
  }],
  "a8/invivo/1": [{
   title:"Finding transformed cells",
   alt:"A schematic shows host cells after plasmid introduction. Some cells take up a plasmid and others do not. A marker on the vector can help identify cells carrying it; further checks may be needed to confirm the desired insert.",
   caption:"Compare the host cells: only some take up a plasmid. A marker can identify vector uptake; additional checks may be needed to establish that the desired insert is present.",
   art:`<text x="150" y="25" text-anchor="middle">After plasmid introduction</text><g fill="#edf4ea" stroke="#32776d" stroke-width="3"><ellipse cx="82" cy="80" rx="50" ry="28"/><ellipse cx="218" cy="80" rx="50" ry="28"/></g><circle cx="82" cy="80" r="11" fill="none" stroke="#a76125" stroke-width="4"/><text x="82" y="138" text-anchor="middle">Vector taken up</text><text x="218" y="138" text-anchor="middle">No vector</text><path d="M82 149v25m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="205" text-anchor="middle">Marker can identify cells</text><text x="150" y="229" text-anchor="middle">carrying the vector</text><text x="150" y="264" text-anchor="middle">Check the desired insert</text>`
  }],
  "a8/fingerprint/0": [{
   title:"Variable number tandem repeats",
   alt:"Two illustrative DNA fragments contain the same short repeated unit at the same location. One fragment has three consecutive units and the other has five, so the repeated region and fragments differ in length.",
   caption:"Count the repeated units at the same location. Different repeat counts can produce different fragment lengths; these are simplified examples, not profiles from real people.",
   art:`<text x="150" y="25" text-anchor="middle">Illustrative fragments</text><text x="40" y="59">A</text><path d="M65 53h155" stroke="#537a94" stroke-width="4"/><g fill="#e9bd8d" stroke="#a76125" stroke-width="2"><rect x="108" y="42" width="22" height="22"/><rect x="130" y="42" width="22" height="22"/><rect x="152" y="42" width="22" height="22"/></g><text x="150" y="94" text-anchor="middle">3 repeat units</text><text x="40" y="148">B</text><path d="M65 142h200" stroke="#537a94" stroke-width="4"/><g fill="#e9bd8d" stroke="#a76125" stroke-width="2"><rect x="108" y="131" width="22" height="22"/><rect x="130" y="131" width="22" height="22"/><rect x="152" y="131" width="22" height="22"/><rect x="174" y="131" width="22" height="22"/><rect x="196" y="131" width="22" height="22"/></g><text x="150" y="183" text-anchor="middle">5 repeat units</text><text x="150" y="237" text-anchor="middle">Same locus · different length</text>`
  }]
 };
 figures['a8/mut8/1']=[{
  title:'A base substitution',
  alt:'A coding DNA sequence changes from ATG CCA GAA TTT to ATG CCT GAA TTT by substituting the last base of the second triplet. The corresponding mRNA codons CCA and CCU both code for proline, so this example is silent.',
  caption:'Compare the second triplet: one base changes. The corresponding mRNA codons both specify proline, so this substitution is silent.',
  art:`<text x="150" y="28" text-anchor="middle">Coding DNA before</text><text x="150" y="76" text-anchor="middle" style="font:20px monospace">ATG CCA GAA TTT</text><text x="150" y="126" text-anchor="middle">After substitution</text><text x="150" y="174" text-anchor="middle" style="font:20px monospace">ATG CC<tspan fill="#a76125" font-weight="bold">T</tspan> GAA TTT</text><text x="150" y="228" text-anchor="middle">mRNA CCA → CCU</text><text x="150" y="257" text-anchor="middle">Both code for proline</text>`
 },{
  title:'A deletion shifts the reading frame',
  alt:'In a coding DNA sequence ATG CCA GAA TTT, deleting the first C after ATG changes the triplet grouping to ATG CAG AAT TT. The last two bases are incomplete in this short extract.',
  caption:'Start reading from the same point. Deleting one base shifts the later triplet groupings; the final TT is incomplete in this short extract.',
  art:`<text x="150" y="28" text-anchor="middle">Coding DNA before</text><text x="150" y="76" text-anchor="middle" style="font:20px monospace">ATG <tspan fill="#a76125" font-weight="bold">C</tspan>CA GAA TTT</text><text x="150" y="126" text-anchor="middle">After the C is deleted</text><text x="150" y="174" text-anchor="middle" style="font:20px monospace">ATG CAG AAT TT…</text><text x="150" y="228" text-anchor="middle">Later triplets regroup</text><text x="150" y="257" text-anchor="middle">Reading frame shifted</text>`
 }];
 window.ALevelGeneTechniques={render(topic,id,group){
  const list=figures[topic+"/"+id+"/"+group];if(!list)return "";
  return list.map(f=>`<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 290" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`).join("");
 }};
})();

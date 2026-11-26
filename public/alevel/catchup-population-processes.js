/* Original conceptual population and inheritance figures. All examples are schematic. */
(function () {
 "use strict";
 const figures={
  "a7/hardy/1": {
   title:"From allele to genotype frequencies",
   alt:"A Punnett-style probability grid has gamete allele frequencies p and q on both axes. Its cells are p squared, pq, pq and q squared. Combining the two heterozygote cells gives p squared plus two pq plus q squared equals one, under Hardy–Weinberg assumptions.",
   caption:"Combine the gamete frequencies: the two pq cells together give 2pq. These predictions depend on the Hardy–Weinberg assumptions in the notes; this is not a sample of observed counts.",
   art:`<text x="150" y="25" text-anchor="middle">Alleles: p + q = 1</text><path d="M91 87h146v146H91zM164 87v146M91 160h146" stroke="#537a94" stroke-width="2" fill="#f2f7f6"/><text x="127" y="76" text-anchor="middle">p</text><text x="201" y="76" text-anchor="middle">q</text><text x="68" y="130" text-anchor="middle">p</text><text x="68" y="203" text-anchor="middle">q</text><text x="127" y="130" text-anchor="middle">p²</text><text x="201" y="130" text-anchor="middle">pq</text><text x="127" y="203" text-anchor="middle">pq</text><text x="201" y="203" text-anchor="middle">q²</text><text x="150" y="265" text-anchor="middle">p² + 2pq + q² = 1</text>`
  },
  "a7/linkage/0": {
   title:"Linked loci on an autosome pair",
   alt:"Two homologous autosomes each carry loci A and B. One chromosome carries alleles A and B; its homologue carries alleles a and b. Alleles at these linked loci tend to be passed together, although crossing over can separate them.",
   caption:"Locate both loci on the same chromosome. Alleles A and B can travel together into a gamete; crossing over between the loci can make new combinations.",
   art:`<text x="150" y="25" text-anchor="middle">Homologous autosomes</text><rect x="74" y="55" width="30" height="165" rx="15" fill="#cbdcf0" stroke="#537a94" stroke-width="3"/><rect x="196" y="55" width="30" height="165" rx="15" fill="#f1dfc6" stroke="#a5792e" stroke-width="3"/><path d="M65 93h48M187 93h48M65 173h48M187 173h48" stroke="#344958" stroke-width="3"/><text x="89" y="85" text-anchor="middle">A</text><text x="211" y="85" text-anchor="middle">a</text><text x="89" y="165" text-anchor="middle">B</text><text x="211" y="165" text-anchor="middle">b</text><text x="150" y="260" text-anchor="middle">Two loci · one chromosome pair</text>`
  },
  "a7/linkage/1": {
   title:"Parental and recombinant combinations",
   alt:"For nearby linked loci in the example AB on one homologue and ab on the other, AB and ab are parental allele combinations. Crossing over between loci can produce Ab and aB recombinant combinations, usually fewer when the loci are close together.",
   caption:"Compare the allele combinations. Crossing over between nearby loci can make Ab or aB recombinant gametes; they are typically less frequent than the parental combinations in this example.",
   art:`<text x="150" y="25" text-anchor="middle">Example: nearby linked loci</text><text x="150" y="58" text-anchor="middle">Parental combinations</text><path d="M75 75v65M225 75v65" stroke="#537a94" stroke-width="8"/><text x="98" y="96">A</text><text x="98" y="130">B</text><text x="246" y="96">a</text><text x="246" y="130">b</text><text x="150" y="175" text-anchor="middle">Recombinants can arise</text><path d="M75 192v65M225 192v65" stroke="#a76125" stroke-width="8"/><text x="98" y="212">A</text><text x="98" y="246">b</text><text x="246" y="212">a</text><text x="246" y="246">B</text>`
  },
  "a7/speciation/0": {
   title:"Reproductive separation and divergence",
   alt:"A schematic allopatric example begins with one population, then a geographical barrier separates two populations. With no gene flow, changes in the two gene pools can accumulate; eventually the populations may no longer produce fertile offspring together. Circles and squares distinguish the populations.",
   caption:"Follow the separated populations. This example uses a geographical barrier; divergence of gene pools and reproductive isolation can eventually produce separate species.",
   art:`<text x="150" y="25" text-anchor="middle">One interbreeding population</text><g fill="#bfe0d7" stroke="#32776d" stroke-width="2"><circle cx="95" cy="58" r="9"/><circle cx="130" cy="58" r="9"/><circle cx="165" cy="58" r="9"/><circle cx="200" cy="58" r="9"/></g><path d="M150 75v25m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="123" text-anchor="middle">Geographical barrier</text><path d="M150 134v75" stroke="#a76125" stroke-width="5"/><g fill="#bfe0d7" stroke="#32776d" stroke-width="2"><circle cx="80" cy="163" r="9"/><circle cx="110" cy="183" r="9"/></g><g fill="#d5c4e2" stroke="#80588f" stroke-width="2"><rect x="181" y="154" width="18" height="18"/><rect x="211" y="174" width="18" height="18"/></g><text x="150" y="242" text-anchor="middle">No gene flow → divergence</text><text x="150" y="268" text-anchor="middle">Reproductive isolation may result</text>`
  },
  "a7/speciation/1": {
   title:"Two routes to reproductive separation",
   alt:"Allopatric separation is illustrated by a geographical barrier dividing populations. Sympatric separation is illustrated by populations in the same area breeding at different times. In each case, reduced gene flow can allow gene pools to diverge. Circles and squares distinguish the populations.",
   caption:"Compare the examples: a barrier separates the allopatric populations, while different breeding times can separate sympatric populations in the same area. Separation alone does not guarantee new species.",
   art:`<text x="150" y="25" text-anchor="middle">Allopatric: different places</text><rect x="35" y="40" width="230" height="70" fill="#edf4ea" stroke="#9aabaa" stroke-width="2"/><path d="M150 40v70" stroke="#a76125" stroke-width="6"/><g fill="#bfe0d7" stroke="#32776d" stroke-width="2"><circle cx="88" cy="75" r="12"/></g><g fill="#d5c4e2" stroke="#80588f" stroke-width="2"><rect x="200" y="63" width="24" height="24"/></g><text x="150" y="140" text-anchor="middle">Sympatric: same area</text><rect x="35" y="154" width="230" height="78" fill="#edf4ea" stroke="#9aabaa" stroke-width="2"/><g fill="#bfe0d7" stroke="#32776d" stroke-width="2"><circle cx="88" cy="191" r="12"/></g><g fill="#d5c4e2" stroke="#80588f" stroke-width="2"><rect x="200" y="179" width="24" height="24"/></g><text x="150" y="263" text-anchor="middle">Example: different breeding times</text>`
  },
  "a7/ecosys/0": {
   title:"Population, community, ecosystem",
   alt:"A schematic ecosystem includes non-living surroundings and a community of different species. Within that community a population consists of members of one species in the same place. Different shapes identify species.",
   caption:"Locate the population of one species inside the community, then include the non-living surroundings to identify the ecosystem. Shapes are symbols rather than organisms to scale.",
   art:`<rect x="23" y="42" width="254" height="191" rx="9" fill="#f3ede3" stroke="#a5792e" stroke-width="2"/><text x="150" y="29" text-anchor="middle">Ecosystem</text><text x="150" y="224" text-anchor="middle">+ non-living surroundings</text><rect x="42" y="58" width="216" height="129" rx="9" fill="#e7f1e9" stroke="#32776d" stroke-width="2"/><text x="150" y="82" text-anchor="middle">Community: different species</text><rect x="58" y="99" width="100" height="66" rx="8" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><g fill="#537a94"><circle cx="80" cy="125" r="7"/><circle cx="105" cy="125" r="7"/><circle cx="130" cy="125" r="7"/></g><path d="M183 118l10-15 10 15ZM216 148l10-15 10 15Z" fill="#a76125"/><text x="108" y="155" text-anchor="middle">Population</text><text x="150" y="269" text-anchor="middle">One species · one place</text>`
  },
  "a7/mrrc/1": {
   title:"Estimating population size",
   alt:"The mark–release–recapture estimate is N equals M multiplied by C divided by R. N is the estimated population, M is the number initially marked and released, C is the total caught in the second sample, and R is the number of marked individuals in that second sample.",
   caption:"Use the second sample's marked proportion to estimate the population. The method relies on assumptions including mixing, retained marks and a population with little change between samples.",
   art:`<text x="150" y="35" text-anchor="middle">N = (M × C) ÷ R</text><path d="M27 60h246" stroke="#d6e1de" stroke-width="2"/><text x="30" y="94">N</text><text x="63" y="94">estimated population</text><text x="30" y="133">M</text><text x="63" y="133">initially marked + released</text><text x="30" y="172">C</text><text x="63" y="172">total caught in second sample</text><text x="30" y="211">R</text><text x="63" y="211">marked in second sample</text><text x="150" y="265" text-anchor="middle">M ÷ N ≈ R ÷ C after mixing</text>`
  },
  "a7/varsel/1": {
   title:"Patterns of selection",
   alt:"Three schematic graphs compare a dashed before distribution with a solid after distribution. Directional selection shifts the distribution toward one extreme. Stabilising selection produces a narrower central distribution. Disruptive selection favours both extremes relative to the middle. No measured data are shown.",
   caption:"Compare the dashed before curve with the solid after curve in each graph. Directional selection favours one extreme, stabilising selection the centre, and disruptive selection both extremes. These are schematic distributions.",
   art:`<text x="193" y="20" text-anchor="middle">Relative frequency</text><text x="20" y="64">Directional</text><path d="M124 88C132 88 138 47 164 47S196 88 218 88" stroke="#80938d" stroke-width="2" stroke-dasharray="5 4" fill="none"/><path d="M153 88C164 88 174 47 201 47S231 88 262 88" stroke="#32776d" stroke-width="3" fill="none"/><path d="M119 88h151" stroke="#344958" stroke-width="1.5"/><text x="20" y="145">Stabilising</text><path d="M124 169C132 169 138 128 164 128S196 169 218 169" stroke="#80938d" stroke-width="2" stroke-dasharray="5 4" fill="none"/><path d="M139 169C148 169 151 116 164 116S181 169 192 169" stroke="#32776d" stroke-width="3" fill="none"/><path d="M119 169h151" stroke="#344958" stroke-width="1.5"/><text x="20" y="225">Disruptive</text><path d="M124 247C132 247 138 207 164 207S196 247 218 247" stroke="#80938d" stroke-width="2" stroke-dasharray="5 4" fill="none"/><path d="M120 247C129 247 130 207 140 207S151 236 164 236S177 207 188 207S200 247 220 247" stroke="#32776d" stroke-width="3" fill="none"/><path d="M119 247h151" stroke="#344958" stroke-width="1.5"/><text x="194" y="278" text-anchor="middle">Phenotype →</text>`
  },
  "a7/interact/0": {
   title:"Competition for the same resource",
   alt:"In one schematic, two individuals of species A both use the same water resource: intraspecific competition. In another, an individual of species A and one of species B both use the same water resource: interspecific competition. A circle and a triangle distinguish the species.",
   caption:"Compare the competitors using the same resource. The first pair is one species; the second includes two different species. Shapes identify species, not their abundance.",
   art:`<text x="150" y="24" text-anchor="middle">Intraspecific</text><circle cx="67" cy="68" r="18" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><circle cx="233" cy="68" r="18" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><text x="150" y="74" text-anchor="middle">Water</text><path d="M119 68H90m7-6-7 6 7 6M181 68h29m-7-6 7 6-7 6" stroke="#344958" stroke-width="2" fill="none"/><text x="150" y="112" text-anchor="middle">Same species A</text><path d="M30 126h240" stroke="#d6e1de" stroke-width="2"/><text x="150" y="151" text-anchor="middle">Interspecific</text><circle cx="67" cy="194" r="18" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><path d="M233 175l20 36h-40Z" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><text x="150" y="200" text-anchor="middle">Water</text><path d="M119 194H90m7-6-7 6 7 6M181 194h29m-7-6 7 6-7 6" stroke="#344958" stroke-width="2" fill="none"/><text x="150" y="255" text-anchor="middle">Species A and species B</text>`
  }
 };
 figures["a7/hardy/2"]=figures["a7/hardy/1"];
 window.ALevelPopulationProcesses={render(topic,id,group){
  const f=figures[topic+"/"+id+"/"+group];if(!f)return "";
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 290" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 }};
})();

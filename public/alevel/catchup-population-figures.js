/* Original illustrative population and inheritance diagrams. */
(function () {
 "use strict";
 const figures = {
  "a7/genterms/1": {
   title: "A monohybrid cross",
   alt: "A Punnett grid for two heterozygous parents, Aa crossed with Aa. Each parent produces A and a gametes. The four equally likely combinations are AA, Aa, Aa and aa. If A is completely dominant, three of the four show the dominant phenotype and one shows the recessive phenotype.",
   caption: "Combine one gamete from each parent. With complete dominance, three of the four combinations show the dominant phenotype; offspring counts in a real family can differ by chance.",
   art: `<text x="150" y="27" text-anchor="middle">Parents: Aa × Aa</text><text x="150" y="54" text-anchor="middle">Gametes</text><path d="M91 90h146v146H91zM164 90v146M91 163h146" stroke="#537a94" stroke-width="2" fill="#f2f7f6"/><text x="127" y="79" text-anchor="middle">A</text><text x="201" y="79" text-anchor="middle">a</text><text x="68" y="133" text-anchor="middle">A</text><text x="68" y="206" text-anchor="middle">a</text><text x="127" y="133" text-anchor="middle">AA</text><text x="201" y="133" text-anchor="middle">Aa</text><text x="127" y="206" text-anchor="middle">Aa</text><text x="201" y="206" text-anchor="middle">aa</text><text x="150" y="270" text-anchor="middle">Expected phenotype ratio 3 : 1</text>`
  },
  "a7/codom/1": {
   title: "ABO: alleles and genotypes",
   alt: "The ABO gene has three common alleles in the population: I A, I B and I O. One diploid individual has two alleles. A person with I A and I B has blood group AB because both A and B alleles are expressed.",
   caption: "Distinguish the three alleles available in the population from the two carried by one diploid individual. Iᴬ and Iᴮ are both expressed in blood group AB.",
   art: `<text x="150" y="25" text-anchor="middle">Alleles in the population</text><circle cx="70" cy="68" r="26" fill="#f2d9cf" stroke="#a76125" stroke-width="2"/><circle cx="150" cy="68" r="26" fill="#dceaf5" stroke="#537a94" stroke-width="2"/><circle cx="230" cy="68" r="26" fill="#edf0e8" stroke="#778465" stroke-width="2"/><text x="70" y="74" text-anchor="middle">Iᴬ</text><text x="150" y="74" text-anchor="middle">Iᴮ</text><text x="230" y="74" text-anchor="middle">Iᴼ</text><text x="150" y="130" text-anchor="middle">One example individual</text><path d="M78 160h144v68H78z" fill="#f8faf9" stroke="#537a94" stroke-width="2"/><text x="150" y="190" text-anchor="middle">Iᴬ Iᴮ</text><text x="150" y="213" text-anchor="middle">Blood group AB</text><text x="150" y="263" text-anchor="middle">Both alleles expressed</text>`
  },
  "a7/sexlink/2": {
   title: "A father's sex chromosomes",
   alt: "In an illustrative XX or XY inheritance example, a father has one X and one Y sex chromosome. He passes his X chromosome to each daughter and his Y chromosome to each son. The other sex chromosome shown in each child comes from the mother.",
   caption: "Follow the father's X to the daughter and Y to the son in this XX/XY model. Each child also receives an X from the mother.",
   art: `<text x="150" y="27" text-anchor="middle">Father: X Y</text><path d="M125 41L74 99m5-10-5 10 10-2M175 41l51 58m-10-2 10 2-5-10" stroke="#344958" stroke-width="3" fill="none"/><text x="74" y="128" text-anchor="middle">X</text><text x="226" y="128" text-anchor="middle">Y</text><path d="M74 138v26m-6-7 6 7 6-7M226 138v26m-6-7 6 7 6-7" stroke="#32776d" stroke-width="3" fill="none"/><circle cx="74" cy="206" r="34" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><rect x="192" y="172" width="68" height="68" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><text x="74" y="213" text-anchor="middle">XX</text><text x="226" y="213" text-anchor="middle">XY</text><text x="74" y="268" text-anchor="middle">Daughter</text><text x="226" y="268" text-anchor="middle">Son</text>`
  },
  "a7/epistasis/0": {
   title: "Two enzymes in one pathway",
   alt: "In a simplified pigment pathway, enzyme A converts a colourless precursor to an intermediate. Enzyme B converts the intermediate to pigment. If enzyme A is absent, the intermediate is not made and enzyme B cannot produce the pigment from it.",
   caption: "Follow the substrate through both enzyme-controlled steps. If enzyme A is absent, the second step lacks its intermediate, regardless of whether enzyme B is present.",
   art: `<circle cx="150" cy="34" r="13" fill="#fff" stroke="#537a94" stroke-width="3"/><text x="150" y="72" text-anchor="middle">Colourless precursor</text><path d="M150 80v30m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="166" y="101">Enzyme A</text><circle cx="150" cy="135" r="13" fill="#e8dcb8" stroke="#a5792e" stroke-width="3"/><text x="150" y="171" text-anchor="middle">Intermediate</text><path d="M150 179v30m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="166" y="200">Enzyme B</text><circle cx="150" cy="231" r="13" fill="#a15b85" stroke="#713f60" stroke-width="3"/><text x="150" y="270" text-anchor="middle">Pigment</text>`
  },
  "a7/interact/1": {
   title: "A schematic predator–prey cycle",
   alt: "An illustrative graph of relative population size against time shows prey and predator populations oscillating. The predator peaks follow the prey peaks. The curves are conceptual and are not measurements.",
   caption: "Compare the peaks: the predator population peaks after the prey in this simplified model. The curves illustrate a relationship, not measured population data.",
   art: `<path d="M53 27v204h223" stroke="#344958" stroke-width="2" fill="none"/><path d="M58 206C71 206 75 63 108 63S144 206 174 206S211 63 243 63S265 123 273 153" stroke="#32776d" stroke-width="4" fill="none"/><path d="M58 210C80 210 96 185 111 153S143 119 156 158S181 210 192 210S219 188 234 153S260 120 273 144" stroke="#a76125" stroke-width="4" stroke-dasharray="7 4" fill="none"/><text x="23" y="131" text-anchor="middle" transform="rotate(-90 23 131)">Relative population size</text><text x="180" y="256" text-anchor="middle">Time →</text><path d="M65 272h28" stroke="#32776d" stroke-width="4"/><text x="100" y="278">Prey</text><path d="M168 272h28" stroke="#a76125" stroke-width="4" stroke-dasharray="7 4"/><text x="203" y="278">Predator</text>`
  },
  "a7/fieldwork/0": {
   title: "Selecting quadrat positions",
   alt: "A square habitat is marked with two perpendicular distance axes. Example randomly generated coordinates 1,3 locate a quadrat at the crossing of x equals one and y equals three. Other random coordinate pairs would select other positions.",
   caption: "Read both coordinates along the axes, then place the quadrat at their intersection. The marked coordinate is an illustrative example, not a measured result.",
   art: `<path d="M56 31v184h184M56 169h184M56 123h184M56 77h184M102 31v184M148 31v184M194 31v184M240 31v184M56 31h184" stroke="#a6b8b2" stroke-width="1" fill="none"/><path d="M56 31v184h184" stroke="#344958" stroke-width="3" fill="none"/><rect x="91" y="66" width="22" height="22" fill="#f0c797" stroke="#a76125" stroke-width="3"/><text x="48" y="221" text-anchor="end">0</text><text x="102" y="238" text-anchor="middle">1</text><text x="148" y="238" text-anchor="middle">2</text><text x="194" y="238" text-anchor="middle">3</text><text x="240" y="238" text-anchor="middle">4</text><text x="48" y="175" text-anchor="end">1</text><text x="48" y="129" text-anchor="end">2</text><text x="48" y="83" text-anchor="end">3</text><text x="48" y="37" text-anchor="end">4</text><text x="150" y="268" text-anchor="middle">x distance (m)</text><text x="22" y="124" text-anchor="middle" transform="rotate(-90 22 124)">y distance (m)</text><text x="169" y="58" text-anchor="middle">Example: (1, 3)</text>`
  },
  "a7/fieldwork/1": {
   title: "Sampling along a transect",
   alt: "A transect tape crosses a habitat. Quadrats are placed at regular intervals along it, so measurements can be compared as conditions change along the line.",
   caption: "Follow the tape across the habitat. Equally spaced quadrats support systematic comparisons along a gradient; sample findings are not shown.",
   art: `<path d="M40 65v165M105 65v165M170 65v165M235 65v165" stroke="#e3eee5" stroke-width="25"/><path d="M34 148h232" stroke="#a76125" stroke-width="4"/><rect x="48" y="122" width="50" height="50" fill="none" stroke="#344958" stroke-width="3"/><rect x="125" y="122" width="50" height="50" fill="none" stroke="#344958" stroke-width="3"/><rect x="202" y="122" width="50" height="50" fill="none" stroke="#344958" stroke-width="3"/><text x="150" y="45" text-anchor="middle">Environmental gradient →</text><text x="150" y="207" text-anchor="middle">Quadrats at regular intervals</text><text x="150" y="247" text-anchor="middle">Transect tape</text>`
  },
  "a7/mrrc/0": {
   title: "Mark, release and recapture",
   alt: "Some animals from a first sample are marked and released. Marked and unmarked animals mix. A second sample contains some marked animals and some unmarked animals. The dots are schematic and do not represent results.",
   caption: "Follow the marked animals after release and mixing. The second sample contains marked and unmarked animals; the symbols are schematic, not counts from an experiment.",
   art: `<text x="150" y="25" text-anchor="middle">First sample: mark + release</text><g stroke="#32776d" stroke-width="2" fill="#bfe0d7"><circle cx="90" cy="55" r="9"/><circle cx="130" cy="55" r="9"/><circle cx="170" cy="55" r="9"/><circle cx="210" cy="55" r="9"/></g><path d="M150 72v23m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="120" text-anchor="middle">Allow marked animals to mix</text><g stroke="#32776d" stroke-width="2" fill="#bfe0d7"><circle cx="45" cy="145" r="9"/><circle cx="105" cy="145" r="9"/><circle cx="165" cy="145" r="9"/><circle cx="225" cy="145" r="9"/></g><g stroke="#537a94" stroke-width="2" fill="#fff"><circle cx="75" cy="145" r="9"/><circle cx="135" cy="145" r="9"/><circle cx="195" cy="145" r="9"/><circle cx="255" cy="145" r="9"/></g><path d="M150 161v23m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="207" text-anchor="middle">Take a second sample</text><g stroke="#32776d" stroke-width="2" fill="#bfe0d7"><circle cx="105" cy="232" r="9"/></g><g stroke="#537a94" stroke-width="2" fill="#fff"><circle cx="150" cy="232" r="9"/><circle cx="195" cy="232" r="9"/></g><text x="150" y="270" text-anchor="middle">Marked + unmarked</text>`
  }
 };
 window.ALevelPopulationFigures = {render(topic,id,group) {
  const f=figures[topic+"/"+id+"/"+group]; if(!f)return "";
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 290" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 }};
})();

/* Original worked representations for water potential and allele frequencies. */
(function () {
 "use strict";
 const figures = {
  "osmosis/0": {
   title: "Comparing water potentials",
   alt: "A number line from minus 600 to zero kilopascals places minus 200 to the right of minus 600. Minus 200 is higher because it is closer to zero.",
   caption: "Read towards zero to find the higher water potential. Keep the negative sign when comparing values.",
   art: `<text x="150" y="30" text-anchor="middle">Water potential / kPa</text><path d="M30 108h240m-8-6 8 6-8 6M48 97v22m135-22v22m67-22v22" stroke="#344958" stroke-width="3" fill="none"/><text x="48" y="147" text-anchor="middle">−600</text><text x="183" y="147" text-anchor="middle">−200</text><text x="250" y="147" text-anchor="middle">0</text><path d="M57 180h83m-8-6 8 6-8 6" stroke="#32776d" stroke-width="3" fill="none"/><text x="150" y="220" text-anchor="middle">Increasing water potential</text><text x="150" y="252" text-anchor="middle">−200 kPa is higher than −600 kPa</text>`
  },
  "osmosis/1": {
   title: "Net water movement across a membrane",
   alt: "A cell at minus 600 kilopascals is surrounded by solution at minus 200 kilopascals. Water crosses the partially permeable membrane in both directions, but net movement is into the cell, from higher to lower water potential.",
   caption: "Compare the solution and cell values: water crosses both ways, but net movement is into the cell. The arrows show direction, not measured rates.",
   art: `<text x="150" y="25" text-anchor="middle">Solution · −200 kPa</text><text x="150" y="46" text-anchor="middle">Higher water potential</text><ellipse cx="150" cy="155" rx="103" ry="66" fill="#e4f1ee" stroke="#32776d" stroke-width="3"/><text x="150" y="150" text-anchor="middle">Cell · −600 kPa</text><text x="150" y="173" text-anchor="middle">Lower water potential</text><path d="M95 72v48m-6-7 6 7 6-7" stroke="#32776d" stroke-width="4" fill="none"/><path d="M204 121V80m-6 7 6-7 6 7" stroke="#a76125" stroke-width="2" fill="none"/><text x="150" y="246" text-anchor="middle">Partially permeable membrane</text><path d="M150 230v-9" stroke="#344958" stroke-width="2"/><text x="150" y="274" text-anchor="middle">Net movement into cell</text>`
  },
  "pressures/0": {
   title: "Pressure and a one-way valve",
   alt: "An idealised one-way valve connects an upstream chamber to a downstream chamber. When upstream pressure exceeds downstream pressure the valve opens and blood can flow forward. When downstream pressure exceeds upstream pressure the valve closes, preventing backflow.",
   caption: "Compare pressure on both sides of the valve. A forward pressure difference opens it; a reverse difference closes it. The chambers and valve are schematic.",
   art: `<text x="150" y="24" text-anchor="middle">Upstream pressure higher</text><path d="M28 61h244M28 111h244" stroke="#537a94" stroke-width="3"/><path d="M130 61l22 15M130 111l22-15" stroke="#a76125" stroke-width="5"/><path d="M62 86h155m-9-6 9 6-9 6" stroke="#32776d" stroke-width="3" fill="none"/><text x="150" y="140" text-anchor="middle">Valve open · forward flow</text><path d="M20 153h260" stroke="#d6e1de" stroke-width="2"/><text x="150" y="180" text-anchor="middle">Downstream pressure higher</text><path d="M28 201h244M28 251h244" stroke="#537a94" stroke-width="3"/><path d="M145 201l7 25-7 25" stroke="#a76125" stroke-width="5" fill="none"/><text x="150" y="278" text-anchor="middle">Valve closed · backflow limited</text>`
  },
  "dihybrid/0": {
   title: "Two heterozygous parents",
   alt: "Each parent has two homologous pairs of chromosomes. The first pair carries A and a at the same locus; the other carries B and b. Both parents therefore have genotype AaBb. The genes are unlinked in this example.",
   caption: "Locate the two alleles at each locus. Both parents have the same genotype; the two loci are on different chromosome pairs in this example.",
   art: `<text x="150" y="27" text-anchor="middle">Each parent: AaBb</text><path d="M60 76v118M103 76v118M196 76v118M239 76v118" stroke="#537a94" stroke-width="7" stroke-linecap="round"/><path d="M49 119h21M92 119h21M185 119h21M228 119h21" stroke="#a76125" stroke-width="4"/><text x="60" y="67" text-anchor="middle">A</text><text x="103" y="67" text-anchor="middle">a</text><text x="196" y="67" text-anchor="middle">B</text><text x="239" y="67" text-anchor="middle">b</text><text x="81" y="225" text-anchor="middle">One locus</text><text x="218" y="225" text-anchor="middle">Other locus</text><text x="150" y="265" text-anchor="middle">Parent × parent: AaBb × AaBb</text>`
  },
  "dihybrid/1": {
   title: "One allele at each locus",
   alt: "Four possible gametes from each AaBb parent are shown: AB, Ab, aB and ab. Each has one allele from the A locus and one from the B locus. For unlinked loci with normal segregation, these gametes are equally likely.",
   caption: "Compare the four gametes. Each receives one allele at each locus; equal frequencies here assume unlinked loci and normal segregation.",
   art: `<text x="150" y="27" text-anchor="middle">Possible gametes from AaBb</text><g fill="#f2f8f6" stroke="#32776d" stroke-width="2"><circle cx="75" cy="91" r="45"/><circle cx="225" cy="91" r="45"/><circle cx="75" cy="208" r="45"/><circle cx="225" cy="208" r="45"/></g><g stroke="#537a94" stroke-width="5" stroke-linecap="round"><path d="M63 76v33M87 76v33M213 76v33M237 76v33M63 193v33M87 193v33M213 193v33M237 193v33"/></g><g text-anchor="middle"><text x="63" y="71">A</text><text x="87" y="71">B</text><text x="213" y="71">A</text><text x="237" y="71">b</text><text x="63" y="188">a</text><text x="87" y="188">B</text><text x="213" y="188">a</text><text x="237" y="188">b</text><text x="150" y="280">Four equally likely combinations</text></g>`
  },
  "hardy/0": {
   title: "Recessive phenotype and q²",
   alt: "Under Hardy–Weinberg equilibrium and complete dominance, the recessive phenotype has genotype aa, with frequency q squared. A nine percent recessive phenotype frequency is 0.09, so q squared is 0.09.",
   caption: "Start with the recessive phenotype: under the stated assumptions it represents aa, or q². Convert 9% to 0.09.",
   art: `<text x="150" y="30" text-anchor="middle">Recessive phenotype</text><path d="M150 42v29m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><rect x="65" y="81" width="170" height="52" rx="9" fill="#e4f1ee" stroke="#32776d" stroke-width="2"/><text x="150" y="113" text-anchor="middle">Genotype aa · q²</text><path d="M150 145v29m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="209" text-anchor="middle">9% = 0.09</text><text x="150" y="243" text-anchor="middle">q² = 0.09</text>`
  },
  "hardy/1": {
   title: "Find the allele frequency",
   alt: "The recessive genotype frequency q squared is 0.09. Taking its square root gives recessive allele frequency q equals 0.3.",
   caption: "Take the square root to move from genotype frequency q² to allele frequency q.",
   art: `<text x="150" y="54" text-anchor="middle">Recessive genotype frequency</text><text x="150" y="91" text-anchor="middle">q² = 0.09</text><path d="M150 109v39m-6-7 6 7 6-7" stroke="#32776d" stroke-width="3" fill="none"/><text x="150" y="180" text-anchor="middle">Square root</text><text x="150" y="224" text-anchor="middle">q = √0.09 = 0.3</text><text x="150" y="256" text-anchor="middle">Recessive allele frequency</text>`
  },
  "hardy/2": {
   title: "Calculate heterozygote frequency",
   alt: "Recessive allele frequency q is 0.3. Because p plus q equals one, p is 0.7. Heterozygote frequency is 2 p q, or two times 0.7 times 0.3, which equals 0.42 or 42 percent.",
   caption: "Find p from p + q = 1, then use both allele frequencies in 2pq.",
   art: `<text x="150" y="35" text-anchor="middle">q = 0.3</text><text x="150" y="75" text-anchor="middle">p = 1 − 0.3 = 0.7</text><path d="M150 87v29m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="155" text-anchor="middle">Heterozygotes · 2pq</text><text x="150" y="192" text-anchor="middle">2 × 0.7 × 0.3</text><text x="150" y="230" text-anchor="middle">= 0.42 = 42%</text>`
  },
  "hardy/3": {
   title: "Check the genotype frequencies",
   alt: "Under the model, dominant homozygotes p squared have frequency 0.49, heterozygotes 2 p q 0.42, and recessive homozygotes q squared 0.09. These three genotype frequencies add to one.",
   caption: "Add the three genotype frequencies to check that they total 1. Multiply by population size only when a number of individuals is needed.",
   art: `<text x="150" y="30" text-anchor="middle">Genotype frequencies</text><rect x="25" y="57" width="250" height="46" rx="6" fill="#e4f1ee" stroke="#32776d"/><text x="150" y="86" text-anchor="middle">p² = 0.49</text><rect x="25" y="116" width="250" height="46" rx="6" fill="#edf1f6" stroke="#537a94"/><text x="150" y="145" text-anchor="middle">2pq = 0.42</text><rect x="25" y="175" width="250" height="46" rx="6" fill="#f8efe1" stroke="#a76125"/><text x="150" y="204" text-anchor="middle">q² = 0.09</text><text x="150" y="258" text-anchor="middle">Total = 1.00</text>`
  }
 };
 window.ALevelGuidedFigures = {render(family,index) {
  const f=figures[family+"/"+index]; if(!f)return "";
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 290" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 }};
})();

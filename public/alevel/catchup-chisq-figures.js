/* Original illustrative worked chi-squared example; no experimental results. */
(function () {
 "use strict";
 const figures={
  "a7/chisq/0": [{
   title:"Compare observed and expected counts",
   alt:"An illustrative bar chart compares observed and expected offspring counts for a hypothetical cross with 40 offspring. A three to one null model predicts 30 dominant-phenotype and 10 recessive-phenotype offspring. The invented observed counts are 28 and 12 respectively; differences can arise by chance.",
   caption:"Compare each observed count with the count predicted by a 3 : 1 model: 40 × ¾ = 30 and 40 × ¼ = 10. These are hypothetical counts, not experimental results.",
   height:315,
   art:`<text x="150" y="24" text-anchor="middle">Hypothetical cross · 40 offspring</text><text x="12" y="49">Count</text><path d="M47 60v160h222M41 220h6M41 170h6M41 120h6M41 70h6" stroke="#344958" stroke-width="2" fill="none"/><text x="36" y="226" text-anchor="end">0</text><text x="36" y="176" text-anchor="end">10</text><text x="36" y="126" text-anchor="end">20</text><text x="36" y="76" text-anchor="end">30</text><rect x="68" y="80" width="31" height="140" fill="#a6d3ab" stroke="#4b8361" stroke-width="2"/><rect x="103" y="70" width="31" height="150" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><rect x="177" y="160" width="31" height="60" fill="#a6d3ab" stroke="#4b8361" stroke-width="2"/><rect x="212" y="170" width="31" height="50" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><text x="83" y="71" text-anchor="middle">28</text><text x="118" y="61" text-anchor="middle">30</text><text x="192" y="151" text-anchor="middle">12</text><text x="227" y="161" text-anchor="middle">10</text><text x="83" y="240" text-anchor="middle">O</text><text x="118" y="240" text-anchor="middle">E</text><text x="192" y="240" text-anchor="middle">O</text><text x="227" y="240" text-anchor="middle">E</text><text x="101" y="267" text-anchor="middle">Dominant</text><text x="210" y="267" text-anchor="middle">Recessive</text><text x="150" y="298" text-anchor="middle">O observed · E expected</text>`
  }],
  "a7/chisq/1": [{
   title:"Calculate χ² and degrees of freedom",
   alt:"For the hypothetical counts, the dominant category has observed 28 and expected 30, giving four divided by 30 or approximately 0.133. The recessive category has observed 12 and expected 10, giving four divided by 10 or 0.400. Their sum is chi-squared approximately 0.533. With two categories and no parameters fitted from the sample, degrees of freedom are two minus one, or one.",
   caption:"Work across each row, then add both contributions. χ² is unitless: O and E are counts. Here df = 2 − 1 = 1 with no model parameters estimated from the data. Counts must be independent, categories exclusive, and expected counts sufficiently large for the approximation.",
   height:330,
   art:`<text x="150" y="25" text-anchor="middle">χ² = Σ (O − E)² / E</text><path d="M20 62h260M20 112h260M20 164h260M20 216h260" stroke="#a6b8b2" stroke-width="2"/><text x="45" y="95" text-anchor="middle">O</text><text x="94" y="95" text-anchor="middle">E</text><text x="184" y="95" text-anchor="middle">(O − E)² / E</text><text x="45" y="145" text-anchor="middle">28</text><text x="94" y="145" text-anchor="middle">30</text><text x="184" y="145" text-anchor="middle">4/30 ≈ 0.133</text><text x="45" y="197" text-anchor="middle">12</text><text x="94" y="197" text-anchor="middle">10</text><text x="184" y="197" text-anchor="middle">4/10 = 0.400</text><text x="150" y="255" text-anchor="middle">χ² ≈ 0.533</text><text x="150" y="293" text-anchor="middle">df = 2 − 1 = 1</text>`
  }],
  "a7/chisq/2": [{
   title:"Compare with the critical value",
   alt:"A schematic upper-tail chi-squared distribution for one degree of freedom marks the calculated statistic 0.53 to the left of the 5 percent critical value 3.84. Values greater than 3.84 lie in the shaded rejection region. Because 0.53 is less than 3.84, do not reject the null hypothesis; this does not prove the null model true.",
   caption:"Compare 0.53 with 3.84: the result is outside the 5% rejection region, so do not reject the null hypothesis. This does not prove the 3 : 1 model true. The distribution is schematic.",
   height:330,
   art:`<text x="150" y="24" text-anchor="middle">Upper tail · df = 1 · 5%</text><path d="M52 54v164h222" stroke="#344958" stroke-width="2" fill="none"/><text x="18" y="140" text-anchor="middle" transform="rotate(-90 18 140)">Probability density</text><path d="M52 63C77 136 95 172 126 193S175 211 214 215L214 218H52Z" fill="#e3edf5"/><path d="M214 215C232 216 251 217 273 217V218H214Z" fill="#e8c4bd" stroke="#a76125" stroke-width="1"/><path d="M52 63C77 136 95 172 126 193S175 211 214 215S250 217 273 217" stroke="#537a94" stroke-width="3" fill="none"/><path d="M74 216v-34M212 218v-51" stroke="#a76125" stroke-width="2"/><text x="74" y="242" text-anchor="middle">0.53</text><text x="212" y="242" text-anchor="middle">3.84</text><text x="52" y="270" text-anchor="middle">0</text><text x="164" y="299" text-anchor="middle">χ² statistic →</text><text x="224" y="139" text-anchor="middle">Reject</text><path d="M225 148l22 60" stroke="#a76125" stroke-width="2"/>`
  }]
 };
 window.ALevelChiSquaredFigures={render(topic,id,group){
  const list=figures[topic+"/"+id+"/"+group];if(!list)return "";
  return list.map(f=>`<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`).join("");
 }};
})();

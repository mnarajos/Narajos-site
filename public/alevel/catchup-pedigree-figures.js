/* Original schematic pedigree and X-linked probability examples. */
(function () {
 "use strict";
 const figures={
  "a7/pedigree/0": [{
   title:"Unaffected parents: autosomal recessive",
   alt:"A pedigree shows an unaffected male square and unaffected female circle joined as parents. A vertical line leads to an affected daughter, shown as a shaded circle. In an idealised fully penetrant autosomal recessive model with no new mutation, both parents have genotype Aa and the daughter is aa.",
   caption:"Read the shapes and lines: square = male, circle = female, shaded = affected. In an autosomal recessive model with full penetrance and no new mutation, two unaffected parents with an affected child must both carry the recessive allele.",
   art:`<text x="150" y="25" text-anchor="middle">Unaffected parents</text><rect x="51" y="49" width="50" height="50" fill="#fff" stroke="#344958" stroke-width="3"/><circle cx="224" cy="74" r="25" fill="#fff" stroke="#344958" stroke-width="3"/><path d="M101 74h98M150 74v58" stroke="#344958" stroke-width="3"/><circle cx="150" cy="158" r="25" fill="#537a94" stroke="#344958" stroke-width="3"/><text x="76" y="126" text-anchor="middle">Aa</text><text x="224" y="126" text-anchor="middle">Aa</text><text x="150" y="216" text-anchor="middle">aa · affected daughter</text><text x="150" y="257" text-anchor="middle">Autosomal recessive</text>`
  }],
  "a7/pedigree/1": [{
   title:"Affected parents: autosomal dominant",
   alt:"A pedigree shows a shaded male square and shaded female circle as affected parents. A vertical line leads to an unaffected child, shown as an unshaded circle. In a simple fully penetrant autosomal dominant model without new mutations, both affected parents are heterozygous Aa and their unaffected child is aa.",
   caption:"Compare the parents and child. In an autosomal dominant model with full penetrance and no new mutation, two affected parents with an unaffected child must both have a recessive allele. Frequency alone does not establish dominance.",
   art:`<text x="150" y="25" text-anchor="middle">Affected parents</text><rect x="51" y="49" width="50" height="50" fill="#80588f" stroke="#344958" stroke-width="3"/><circle cx="224" cy="74" r="25" fill="#80588f" stroke="#344958" stroke-width="3"/><path d="M101 74h98M150 74v58" stroke="#344958" stroke-width="3"/><circle cx="150" cy="158" r="25" fill="#fff" stroke="#344958" stroke-width="3"/><text x="76" y="126" text-anchor="middle">Aa</text><text x="224" y="126" text-anchor="middle">Aa</text><text x="150" y="216" text-anchor="middle">aa · unaffected daughter</text><text x="150" y="257" text-anchor="middle">Autosomal dominant</text>`
  }],
  "a7/pedigree/2": [{
   title:"An affected daughter and her father's X",
   alt:"In a simple X-linked recessive model, a father without the recessive phenotype has genotype X H Y and passes X H to his daughter. Even if her mother gives X h, the daughter is X H X h and is unaffected. An affected daughter would need X h from her father as well as an X h from her mother, assuming no new mutation and complete penetrance.",
   caption:"Follow the father's X to the daughter. With full penetrance and no new mutation, an unaffected father cannot pass an affected daughter the required Xʰ; she receives her other X from her mother.",
   art:`<text x="150" y="25" text-anchor="middle">X-linked recessive model</text><text x="70" y="66" text-anchor="middle">Father</text><text x="230" y="66" text-anchor="middle">Mother</text><text x="70" y="101" text-anchor="middle">Xᴴ Y</text><text x="230" y="101" text-anchor="middle">Xʰ Xʰ</text><path d="M72 114l52 48m-10-2 10 2-2-10M228 114l-52 48m2-10-2 10 10-2" stroke="#344958" stroke-width="2" fill="none"/><circle cx="150" cy="193" r="31" fill="#fff" stroke="#537a94" stroke-width="3"/><text x="150" y="199" text-anchor="middle">Xᴴ Xʰ</text><text x="150" y="252" text-anchor="middle">Daughter: unaffected carrier</text>`
  },{
   title:"Probability of an affected son",
   alt:"A Punnett grid shows a heterozygous mother X H X h crossed with an unaffected father X H Y. The four equally likely offspring are X H X H, X H X h, X H Y and X h Y. Under the simple inheritance model one of four is an affected son: probability one half for a son times one half for inheriting X h, or one quarter.",
   caption:"Read the XʰY cell: one of four equally likely outcomes is an affected son. Equivalently, multiply ½ for a son by ½ for receiving Xʰ. The example assumes equal gamete probabilities.",
   height:320,
   art:`<text x="150" y="25" text-anchor="middle">Mother Xᴴ Xʰ × father Xᴴ Y</text><text x="126" y="69" text-anchor="middle">Xᴴ</text><text x="215" y="69" text-anchor="middle">Xʰ</text><text x="50" y="118" text-anchor="middle">Xᴴ</text><text x="50" y="195" text-anchor="middle">Y</text><rect x="80" y="78" width="178" height="154" fill="#f2f7f6" stroke="#537a94" stroke-width="2"/><rect x="169" y="155" width="89" height="77" fill="#e8c4bd" stroke="#a76125" stroke-width="3"/><path d="M169 78v154M80 155h178" stroke="#537a94" stroke-width="2"/><text x="125" y="121" text-anchor="middle">Xᴴ Xᴴ</text><text x="214" y="121" text-anchor="middle">Xᴴ Xʰ</text><text x="125" y="198" text-anchor="middle">Xᴴ Y</text><text x="214" y="198" text-anchor="middle">Xʰ Y</text><text x="150" y="267" text-anchor="middle">Affected son: ½ × ½ = ¼</text>`
  }]
 };
 window.ALevelPedigreeFigures={render(topic,id,group){
  const list=figures[topic+"/"+id+"/"+group];if(!list)return "";
  return list.map(f=>`<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height||290}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`).join("");
 }};
})();

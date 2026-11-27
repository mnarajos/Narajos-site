/* Original schematic diagrams for A-level inheritance terminology and crosses. */
(function () {
 "use strict";
 const cell = (x,y,t) => `<text x="${x}" y="${y}" text-anchor="middle">${t}</text>`;
 const grid = (columns, rows, values) => {
  const left=61, top=74, w=48, h=39;
  let art=`<path d="M${left} ${top}h${columns.length*w}v${rows.length*h}h-${columns.length*w}Z" fill="#f2f7f6" stroke="#537a94" stroke-width="2"/>`;
  for(let i=1;i<columns.length;i++) art+=`<path d="M${left+i*w} ${top}v${rows.length*h}" stroke="#537a94" stroke-width="2"/>`;
  for(let i=1;i<rows.length;i++) art+=`<path d="M${left} ${top+i*h}h${columns.length*w}" stroke="#537a94" stroke-width="2"/>`;
  columns.forEach((v,i)=>{art+=cell(left+i*w+w/2,top-12,v)});
  rows.forEach((v,i)=>{art+=cell(left-25,top+i*h+25,v); values[i].forEach((s,j)=>{art+=cell(left+j*w+w/2,top+i*h+25,s)})});
  return art;
 };
 const figures={
  "a7/genterms/0": [{
   title:"Genotype, phenotype and alleles",
   alt:"Two homologous chromosomes are shown at the same gene locus. The example AA is homozygous and Aa is heterozygous. In a simplified dominant/recessive example, both AA and Aa can show the dominant phenotype, while environment can also affect the observable phenotype.",
   caption:"Compare the alleles at the same locus: AA is homozygous; Aa is heterozygous. In this simple dominance model both show the dominant phenotype, which can also be influenced by the environment.",
   art:`<text x="150" y="24" text-anchor="middle">Alleles at the same locus</text><path d="M56 55v105M100 55v105M199 55v105M243 55v105" stroke="#537a94" stroke-width="9"/><circle cx="56" cy="105" r="15" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><circle cx="100" cy="105" r="15" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><circle cx="199" cy="105" r="15" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><circle cx="243" cy="105" r="15" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><text x="56" y="111" text-anchor="middle">A</text><text x="100" y="111" text-anchor="middle">A</text><text x="199" y="111" text-anchor="middle">A</text><text x="243" y="111" text-anchor="middle">a</text><text x="78" y="194" text-anchor="middle">AA: homozygous</text><text x="221" y="194" text-anchor="middle">Aa: heterozygous</text><text x="150" y="234" text-anchor="middle">Genotype + environment</text><text x="150" y="264" text-anchor="middle">influence phenotype</text>`
  }],
  "a7/codom/0": [{
   title:"Codominance: both alleles expressed",
   alt:"A hypothetical flower example compares a homozygote with red patches, a heterozygote with both red and white patches, and a homozygote with white patches. The alleles are written C superscript R and C superscript W. Both alleles are expressed in the heterozygote.",
   caption:"Compare the heterozygote with the homozygotes. Both allele products are visible in this hypothetical example; the red and white patches are not a blended pink.",
   art:`<text x="150" y="25" text-anchor="middle">Hypothetical flower colour</text><circle cx="53" cy="91" r="33" fill="#bb5f62" stroke="#8d4950" stroke-width="2"/><circle cx="150" cy="91" r="33" fill="#fff" stroke="#8d4950" stroke-width="2"/><path d="M150 58a33 33 0 0 0 0 66Z" fill="#bb5f62" stroke="#8d4950" stroke-width="2"/><circle cx="247" cy="91" r="33" fill="#fff" stroke="#8d4950" stroke-width="2"/><text x="53" y="160" text-anchor="middle">Cᴿ Cᴿ</text><text x="150" y="160" text-anchor="middle">Cᴿ Cᵂ</text><text x="247" y="160" text-anchor="middle">Cᵂ Cᵂ</text><text x="53" y="188" text-anchor="middle">Red</text><text x="150" y="188" text-anchor="middle">Both</text><text x="247" y="188" text-anchor="middle">White</text><text x="150" y="243" text-anchor="middle">Both alleles expressed</text>`
  }],
  "a7/sexlink/0": [{
   title:"X-linked alleles in an XX/XY model",
   alt:"An illustrative XX individual has two X chromosomes, each carrying an allele at an X-linked locus. An XY individual has one X carrying an allele and a Y that lacks the locus. X chromosomes are shown longer than Y.",
   caption:"Locate the same locus on each X chromosome. In this example the Y lacks that locus, so an XY individual has one allele for the gene.",
   art:`<text x="150" y="24" text-anchor="middle">A gene on the X chromosome</text><path d="M52 56v130M103 56v130M200 56v130M251 91v95" stroke="#537a94" stroke-width="12" stroke-linecap="round"/><circle cx="52" cy="106" r="14" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><circle cx="103" cy="106" r="14" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><circle cx="200" cy="106" r="14" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><text x="52" y="112" text-anchor="middle">H</text><text x="103" y="112" text-anchor="middle">h</text><text x="200" y="112" text-anchor="middle">h</text><text x="52" y="220" text-anchor="middle">Xᴴ</text><text x="103" y="220" text-anchor="middle">Xʰ</text><text x="200" y="220" text-anchor="middle">Xʰ</text><text x="251" y="220" text-anchor="middle">Y</text><text x="78" y="258" text-anchor="middle">XX</text><text x="225" y="258" text-anchor="middle">XY</text>`
  }],
  "a7/sexlink/1": [{
   title:"An X-linked recessive allele",
   alt:"In an idealised X-linked recessive example, an XX individual with X H and X h is heterozygous and does not show the recessive phenotype, whereas an XY individual with X h and Y has no second allele at that locus and shows the recessive phenotype.",
   caption:"Compare the allele copies at the X-linked locus. In this simple recessive model, Xᴴ masks Xʰ in the heterozygote; Xʰ is expressed in the XY individual because the Y lacks the allele.",
   art:`<text x="150" y="28" text-anchor="middle">Simple recessive model</text><circle cx="75" cy="100" r="54" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><circle cx="225" cy="100" r="54" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><text x="75" y="106" text-anchor="middle">Xᴴ Xʰ</text><text x="225" y="106" text-anchor="middle">Xʰ Y</text><text x="75" y="190" text-anchor="middle">XX</text><text x="225" y="190" text-anchor="middle">XY</text><text x="75" y="222" text-anchor="middle">Heterozygous</text><text x="225" y="222" text-anchor="middle">Recessive</text><text x="75" y="245" text-anchor="middle">not expressed</text><text x="225" y="245" text-anchor="middle">expressed</text>`
  }],
  "a7/dihybrid/0": [{
   title:"Making gametes for two genes",
   alt:"A parent with genotype AaBb has two allele pairs A and a, and B and b. If the genes assort independently, the possible gametes are AB, Ab, aB and ab in equal proportions. Each gamete contains one allele from each gene.",
   caption:"Choose one allele from each pair. With independent assortment, AaBb produces AB, Ab, aB and ab equally often; each gamete has one allele of each gene.",
   art:`<text x="150" y="25" text-anchor="middle">Parent: AaBb</text><text x="150" y="65" text-anchor="middle">One allele from each gene</text><circle cx="69" cy="105" r="23" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><circle cx="123" cy="105" r="23" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><circle cx="177" cy="105" r="23" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><circle cx="231" cy="105" r="23" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><text x="69" y="111" text-anchor="middle">A</text><text x="123" y="111" text-anchor="middle">a</text><text x="177" y="111" text-anchor="middle">B</text><text x="231" y="111" text-anchor="middle">b</text><path d="M150 141v30m-6-7 6 7 6-7" stroke="#344958" stroke-width="2" fill="none"/><text x="150" y="200" text-anchor="middle">Gametes if unlinked</text><text x="150" y="238" text-anchor="middle">AB · Ab · aB · ab</text><text x="150" y="269" text-anchor="middle">Each expected ¼</text>`
  }],
  "a7/dihybrid/1": [{
   title:"A dihybrid cross",
   alt:"A Punnett square for AaBb crossed with AaBb has gametes AB, Ab, aB and ab from each parent. The sixteen equally likely genotype combinations produce an expected nine to three to three to one phenotype ratio when both genes assort independently, show complete dominance and affect distinct traits without epistasis. The phenotype classes A underscore B underscore, A underscore bb, aa B underscore and aabb occur in nine, three, three and one cells respectively; underscore means either allele.",
   caption:"Combine one gamete from each parent. The expected 9 : 3 : 3 : 1 phenotype ratio assumes independent assortment, complete dominance, separate non-interacting traits and the same viability for each combination. In the class labels, _ means either allele.",
   height:405,
   art:`<text x="150" y="25" text-anchor="middle">AaBb × AaBb</text>${grid(['AB','Ab','aB','ab'],['AB','Ab','aB','ab'],[['AABB','AABb','AaBB','AaBb'],['AABb','AAbb','AaBb','Aabb'],['AaBB','AaBb','aaBB','aaBb'],['AaBb','Aabb','aaBb','aabb']])}<text x="150" y="267" text-anchor="middle">Expected phenotypes</text><text x="150" y="294" text-anchor="middle">9 : 3 : 3 : 1</text><text x="150" y="328" text-anchor="middle">A_B_: 9 · A_bb: 3</text><text x="150" y="354" text-anchor="middle">aaB_: 3 · aabb: 1</text><text x="150" y="385" text-anchor="middle">_ means either allele</text>`
  },{
   title:"A dihybrid test cross",
   alt:"A parent AaBb produces four gametes AB, Ab, aB and ab in equal proportions if the genes assort independently. A parent aabb produces only ab gametes. The four offspring genotypes AaBb, Aabb, aaBb and aabb each have expected probability one quarter. A one to one to one to one phenotype ratio additionally assumes complete dominance, separate non-interacting traits and equal survival.",
   caption:"Pair each AaBb gamete with ab from aabb. With independent assortment, complete dominance, separate non-interacting traits and equal survival, the four phenotype combinations are expected in equal proportions.",
   height:225,
   art:`<text x="150" y="25" text-anchor="middle">AaBb × aabb</text>${grid(['AB','Ab','aB','ab'],['ab'],[['AaBb','Aabb','aaBb','aabb']])}<text x="150" y="158" text-anchor="middle">Expected phenotypes</text><text x="150" y="187" text-anchor="middle">1 : 1 : 1 : 1</text>`
  }],
  "a7/dihybrid/2": [{
   title:"Unlinked and linked genes",
   alt:"A comparison shows two gene loci on different chromosome pairs, where independent assortment can yield AB, Ab, aB and ab in equal proportions, and two loci on the same chromosome pair, where parental AB and ab combinations may be more frequent. Crossing over can also produce Ab and aB.",
   caption:"Compare the chromosome positions. Different chromosome pairs can assort independently; genes on the same chromosome can be inherited together, although crossing over may produce recombinants.",
   height:320,
   art:`<text x="150" y="24" text-anchor="middle">Different chromosome pairs</text><path d="M50 49v60M80 49v60M180 49v60M210 49v60" stroke="#537a94" stroke-width="8"/><circle cx="50" cy="79" r="12" fill="#fff" stroke="#537a94" stroke-width="2"/><circle cx="80" cy="79" r="12" fill="#fff" stroke="#537a94" stroke-width="2"/><circle cx="180" cy="79" r="12" fill="#fff" stroke="#537a94" stroke-width="2"/><circle cx="210" cy="79" r="12" fill="#fff" stroke="#537a94" stroke-width="2"/><text x="50" y="85" text-anchor="middle">A</text><text x="80" y="85" text-anchor="middle">a</text><text x="180" y="85" text-anchor="middle">B</text><text x="210" y="85" text-anchor="middle">b</text><text x="150" y="140" text-anchor="middle">AB · Ab · aB · ab</text><text x="150" y="180" text-anchor="middle">Same chromosome pair</text><path d="M110 198v65M190 198v65" stroke="#80588f" stroke-width="8"/><text x="93" y="220">A</text><text x="93" y="252">B</text><text x="199" y="220">a</text><text x="199" y="252">b</text><text x="150" y="300" text-anchor="middle">Parental: AB and ab</text>`
  }]
 };
 window.ALevelInheritanceDetails={render(topic,id,group){
  const list=figures[topic+"/"+id+"/"+group];if(!list)return "";
  return list.map(f=>`<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height||290}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`).join("");
 }};
})();

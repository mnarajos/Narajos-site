/* Original hypothetical population estimate from quadrat sampling. */
(function () {
 "use strict";
 window.ALevelQuadratEstimate={render(topic,id,group){
  if(topic!=='a7'||id!=='fieldwork'||group!==1)return '';
  const counts=[3,4,5,4], dotPlaces=[[14,16],[28,15],[15,30],[31,30],[23,23]];
  const samples=counts.map((n,i)=>{const x=20+i*66;return `<rect x="${x}" y="50" width="48" height="48" fill="#edf6eb" stroke="#4a8663" stroke-width="2"/>`+dotPlaces.slice(0,n).map(([dx,dy])=>`<circle cx="${x+dx}" cy="${50+dy}" r="3" fill="#4a8663"/>`).join('')+`<text x="${x+24}" y="122" text-anchor="middle">${n}</text>`;}).join('');
  const grid=Array.from({length:11},(_,i)=>`<path d="M${75+i*15} 192v150M75 ${192+i*15}h150"/>`).join('');
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>Estimate a population from quadrats</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 430" role="img" aria-label="A hypothetical example uses four one-square-metre quadrats with 3, 4, 5 and 4 individuals, giving a mean of 4 per quadrat. A habitat of 100 square metres contains 100 quadrat-sized areas. The estimate is 4 multiplied by 100, or 400 individuals. Samples must be representative for this estimate to be useful." xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c"><text x="150" y="24" text-anchor="middle">Example: four 1 m² quadrats</text>${samples}<text x="150" y="151" text-anchor="middle">Mean = 4 individuals per quadrat</text><text x="150" y="180" text-anchor="middle">Habitat: 100 m²</text><g stroke="#8aa99b" stroke-width="1.5" fill="none">${grid}</g><text x="150" y="373" text-anchor="middle">100 ÷ 1 = 100 quadrat areas</text><text x="150" y="403" text-anchor="middle">Estimated population = 4 × 100 = 400</text></svg></div><figcaption>Count the illustrative samples, find their mean, then scale by habitat area divided by quadrat area. This is a hypothetical estimate, not measured data; its usefulness depends on representative sampling.</figcaption></figure>`;
 }};
})();

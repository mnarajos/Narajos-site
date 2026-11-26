/* Original hypothetical comparison of random and convenience sampling.
   AQA Biology practical handbook: https://filestore.aqa.org.uk/resources/science/AQA-SCIENCE-AS-A-LEVEL-PHBK.PDF */
(function () {
 "use strict";
 function plant(x, base, tall, selected, id) {
  const h = tall ? 28 : 15;
  const leaves = tall
   ? `M${x} ${base-13}q-10-1-10-9q9 0 10 9m0-6q9-8 10-8q0 8-10 8`
   : `M${x} ${base-7}q-7-1-8-6q7 0 8 6m0-3q6-6 8-6q0 6-8 6`;
  return `${selected ? `<ellipse cx="${x}" cy="${base-13}" rx="20" ry="23" fill="none" stroke="#a76125" stroke-width="2"/>` : ''}<path d="M${x} ${base}v-${h} ${leaves}" fill="none" stroke="#397956" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M${x-12} ${base+1}h24" stroke="#849a8a"/><text x="${x}" y="${base+24}" text-anchor="middle">${id}</text>`;
 }
 function population(shift, selected) {
  let result = '';
  for (let i=0; i<12; i++) {
   const col=i%4, row=Math.floor(i/4), id=i+1;
   result += plant(55+col*63,83+row*65+shift,col<2,selected.includes(id),id);
  }
  return result;
 }
 window.ALevelSamplingChoice={render(topic,id,group){
  if(topic!=='a4'||id!=='sampling'||group!==0)return '';
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>How selection affects a sample</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 590" role="img" aria-label="Two hypothetical views of the same twelve numbered plants: taller plants are clustered on the left and shorter plants on the right. Rings mark selected plants. A possible random selection, IDs 1, 4, 6 and 11, contains two tall and two short plants. A convenience selection of four plants near a path at the left, IDs 1, 2, 5 and 6, contains only tall plants and is biased towards taller plants in this example. Other random selections can also give an unrepresentative sample." xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c"><text x="150" y="24" text-anchor="middle">Randomly chosen IDs</text><text x="86" y="46" text-anchor="middle">Taller</text><text x="212" y="46" text-anchor="middle">Shorter</text>${population(0,[1,4,6,11])}<text x="150" y="265" text-anchor="middle">Selected: 1, 4, 6, 11</text><path d="M20 280h260" stroke="#d6e1de" stroke-width="2"/><text x="150" y="305" text-anchor="middle">Convenience: near path</text><text x="86" y="331" text-anchor="middle">Taller</text><text x="212" y="331" text-anchor="middle">Shorter</text><rect x="17" y="344" width="12" height="175" rx="3" fill="#ebe1d4"/><text x="12" y="432" text-anchor="middle" transform="rotate(-90 12 432)">Path</text>${population(285,[1,2,5,6])}<text x="150" y="550" text-anchor="middle">Selected: 1, 2, 5, 6</text><ellipse cx="48" cy="574" rx="13" ry="9" fill="none" stroke="#a76125" stroke-width="2"/><text x="69" y="580">Selected plant</text></svg></div><figcaption>Compare two hypothetical samples from the same population. In this clustered example, choosing plants close to the path favours taller plants. Random selection reduces selection bias, and a larger sample can reduce chance effects; neither guarantees a representative sample. A random number generator could choose the IDs.</figcaption></figure>`;
 }};
})();

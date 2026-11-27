/* Reuse the F170 alveolar barrier and area models for the F171 comparison.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHLBI lung structure: https://www.nhlbi.nih.gov/health/lungs/respiratory-system
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f171/1.2.1.airways'];
  if (!lesson) return;
  const route = {src:'/human-biology/f171-bronchiole-alveoli.svg',width:280,height:350,compact:true,
    alt:'A simplified branching airway narrows into bronchioles leading to a cluster of alveoli. The cluster is shown enlarged and the model is not to scale.',
    caption:'Follow a small airway branch towards the alveoli. The air sacs are enlarged and branching is simplified.'};
  const barrier = {src:'/human-biology/f170-alveolar-barrier.svg',width:280,height:295,compact:true,
    alt:'Oxygen moves from alveolar air across a thin alveolar cell and capillary wall into the blood, while carbon dioxide moves in the opposite direction. The layers are enlarged for clarity.',
    caption:'Follow oxygen across the short barrier to blood. Alveolar and capillary layers are enlarged so their arrangement can be seen.'};
  const area = {src:'/human-biology/f170-alveolar-area.svg',width:280,height:390,compact:true,
    alt:'One sphere is compared with eight spheres of half its radius. Their total volume is equal, but the smaller spheres have greater combined surface area. Real alveoli are not spheres.',
    caption:'Compare the boundaries in the model: many small spheres have more surface area for the same combined volume. Real alveoli are not spheres.'};
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[route,barrier,area]};
}());

/* Original simplified F170 aerobic ATP overview and reused ER/Golgi pathway.
 * OCR F170: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * OpenStax cellular respiration: https://openstax.org/books/biology-2e/pages/7-introduction
 */
(function () {
 'use strict';
 const respiration={src:'/human-biology/f170-respiration-atp.svg',width:280,height:375,compact:true,
  alt:'Glucose is broken down by glycolysis in the cytoplasm to pyruvate. Pyruvate enters a mitochondrion; oxygen enters, while carbon dioxide and water leave. Aerobic respiration transfers energy for ATP formation, and ATP supplies energy for cell processes. Glycolysis also makes some ATP. Intermediate reactions are omitted.',
  caption:'Follow glucose through glycolysis and pyruvate into the mitochondrion. Aerobic respiration transfers energy for ATP formation; some ATP also forms during glycolysis. The pathway is simplified.'};
 const routing=window.KeystoneHumanLessons?.['f170/1.1.3']?.explainDiagrams?.[3]?.find(item => item.src === '/human-biology/cell-protein-routing.svg');
 window.HumanF170OrganelleRecapFigures={
  'f170/1.1.1/1':[routing,respiration].filter(Boolean)
 };
}());

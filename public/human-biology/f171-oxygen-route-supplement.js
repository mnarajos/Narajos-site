/* Reuse the F170 oxygen-delivery model in the F171 comparison lesson.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHLBI ventilation and oxygen transport: https://www.nhlbi.nih.gov/health/lungs/breathing-benefits
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f171/1.2.1.oxygen'];
  if (!lesson) return;
  const route = {src:'/human-biology/f170-oxygen-delivery.svg',width:280,height:380,compact:true,
    alt:'Oxygen in alveolar air diffuses into blood, is carried on haemoglobin in red cells and leaves the blood for a respiring tissue cell. Ventilation moves air in and out of the alveolus.',
    caption:'Follow oxygen from alveolar air into the blood and on haemoglobin to tissue. Ventilation, gas exchange and blood transport are different stages.'};
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[route]};
}());

/* Simplified F171 management and functional-outcome models.
 * OCR Human Biology specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NINDS Parkinson's overview: https://www.ninds.nih.gov/health-information/disorders/parkinsons-disease
 * These are fictional teaching models, not individual treatment advice.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f171/2.2'];
  if (!lesson) return;
  const figure = (name,height,alt,caption) => ({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,alt,caption});
  const pathway = figure('f171-levodopa-signalling', 370,
    'A schematic shows levodopa crossing from blood into the brain, where some is converted to dopamine. Dopamine signalling influences movement pathways. Treatment may ease some movement symptoms without reversing the underlying disease.',
    'Follow levodopa from blood into the brain, then its conversion to dopamine. Improved signalling can ease some movement symptoms; it does not establish that the disease has been reversed.');
  const outcome = figure('f171-functional-outcome', 305,
    'An illustrative comparison of a timed walk over the same course shows a longer time before treatment and a shorter time after treatment. A shorter time is an improvement in the measured task, not evidence that the underlying disease has been reversed.',
    'Compare the elapsed times for the same walking task. A quicker walk supports a functional improvement; it does not measure whether the underlying disease has been reversed. Bars are illustrative, not patient data.');
  lesson.explainDiagrams = {...lesson.explainDiagrams, 0:[outcome]};
  lesson.modelDiagrams = {...lesson.modelDiagrams, 1:pathway, 2:outcome};
}());

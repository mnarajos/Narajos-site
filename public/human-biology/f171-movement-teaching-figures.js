/* Schematic comparison for F171 movement disorders.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NINDS motor neuron disease: https://www.ninds.nih.gov/health-information/disorders/motor-neuron-diseases
 * NINDS Parkinson's: https://www.ninds.nih.gov/health-information/disorders/parkinsons-disease
 * Each disease and the resulting symptoms vary between individuals.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/1.2.1.movement'];
 if(!lesson)return;
 const comparison={src:'/human-biology/f171-movement-pathways.svg',width:280,height:410,compact:true,assessmentSensitive:true,
  alt:'Two simplified movement pathways run from brain to motor neurone to muscle. In motor neurone disease, the motor neurone progressively stops working, so fewer effective signals reach the muscle. In Parkinson’s disease, loss of dopamine-producing cells disrupts movement circuits in the brain; the motor neurone is shown intact in this comparison. The diagram does not diagnose an individual.',
  caption:'Trace the route from brain to muscle in each example. In MND the motor-neurone pathway is affected; in Parkinson’s the diagram highlights disrupted brain circuits. Actual symptoms and progression vary.'};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[comparison],1:[comparison],2:[comparison]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:comparison,1:comparison};
}());

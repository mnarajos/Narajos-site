/* Reuse the reviewed villus section at each matching placental exchange step.
 * OCR F175: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f175/a2'];if(!lesson?.teachingDiagram)return;
 const original=lesson.teachingDiagram;
 const captions=[
  'Locate the maternal blood around the villus. Oxygen is carried to this space in maternal blood; the foetal capillary is inside the villus.',
  'Follow oxygen from maternal blood across the placental barrier into foetal blood. The arrow shows the net direction down its gradient.',
  'Locate the foetal capillary inside the villus. Oxygen enters foetal blood; carbon dioxide moves across the barrier in the opposite direction.'
 ];
 lesson.skipModelTeachingDiagram=true;
 lesson.modelDiagrams={...lesson.modelDiagrams,...Object.fromEntries(captions.map((caption,index)=>[index,{...original,caption,assessmentSensitive:true}]))};
}());

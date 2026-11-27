/* Original fictional evidence comparison, not a patient scan or diagnosis.
 * OCR F171: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS hiatus hernia: https://www.nhs.uk/conditions/hiatus-hernia/
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/1.2.1.hiatus']; if(!lesson)return;
 const figure={src:'/human-biology/f171-hiatus-evidence.svg',width:280,height:375,compact:true,assessmentSensitive:true,
  alt:'A fictional schematic imaging finding places the junction between oesophagus and stomach above the diaphragm. A separate speech bubble reports waking with a burning feeling. The position is observed evidence; the feeling is a symptom described by the person. The illustration is not a patient scan.',
  caption:'Compare the objective finding with the reported feeling. An image can show the junction’s position; the person describes the symptom. The drawing is schematic, and either can occur without the other.'};
 lesson.modelDiagrams={...lesson.modelDiagrams,2:figure};
}());

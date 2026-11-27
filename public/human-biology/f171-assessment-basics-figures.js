/* F171 initial assessment: schematic methods and fictional worked values.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS blood pressure: https://www.nhs.uk/tests-and-treatments/blood-pressure-test/
 * CDC BMI: https://www.cdc.gov/bmi/faq/
 * Icons and graphs are illustrative and do not show patient results.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/4.1'];if(!lesson)return;
 const fig=(name,height,alt,caption)=>({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,alt,caption});
 const methods=fig('f171-examination-methods',365,'Icons show inspection by looking, palpation by feeling, percussion by tapping and judging the sound, and auscultation by listening to body sounds. The icons are schematic.','Compare the action used for each examination method. These icons are a guide to the terms, not a complete clinical examination.');
 const pressure=fig('f171-blood-pressure-reading',320,'A fictional cuff reading is 128 over 76 millimetres of mercury. A schematic pulse identifies the first number as systolic pressure during ventricular contraction and the second as diastolic pressure between contractions. The waveform is not a recording.','Read the first and second values against the illustrative pulse. Rest, position and cuff fit can affect a reading.');
 const bmi=fig('f171-bmi-example',260,'A fictional person of mass 80 kilograms and height 2.00 metres has BMI 80 divided by 2.00 squared, giving 20 kilograms per square metre. BMI alone does not distinguish muscle from fat or diagnose disease.','Square the height before dividing mass by it. The result is a mass-to-height measure, not a diagnosis or direct body-composition measurement.');
 const evidence=fig('f171-image-tissue-evidence',335,'A schematic scan shows an altered area. A tissue sample from that area can be examined under a microscope to investigate tissue change. Icons are not patient images and a sample represents the sampled site.','Compare the questions: an image can locate an altered area; microscopy of sampled tissue can examine that tissue. The examples are schematic.');
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[methods],1:[pressure],2:[bmi],4:[evidence]};
}());

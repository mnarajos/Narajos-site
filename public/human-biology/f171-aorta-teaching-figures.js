/* Original structural and measurement schematics for OCR F171.
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * https://www.nhs.uk/conditions/abdominal-aortic-aneurysm/
 * Aneurysm and hypertension may coexist; neither diagram is a diagnosis.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f171/1.2.1.aorta'];
  if (!lesson) return;
  const fig = (name,height,alt,caption) => ({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,assessmentSensitive:true,alt,caption});
  const artery = fig('f171-aorta-local-widening', 335,
    'Two schematic longitudinal views compare a section of aorta with parallel walls and one with a local bulge. The wider region is an aneurysm; arrows show blood travelling through both. No measurements or patient images are shown.',
    'Compare the vessel outlines and locate the local widening. The arrows show the direction of blood flow; the drawing is illustrative, not a scan or a measurement.');
  const measures = fig('f171-aorta-measurements', 350,
    'A schematic scan view can show the width of the abdominal aorta, while a cuff measures arterial pressure. These are different quantities; vessel width alone does not establish blood pressure.',
    'Compare the measurement from each instrument. A scan can show the aorta’s diameter; a cuff reading concerns pressure. One does not by itself measure the other.');
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[artery],1:[artery],2:[measures]};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:artery,1:measures};
}());

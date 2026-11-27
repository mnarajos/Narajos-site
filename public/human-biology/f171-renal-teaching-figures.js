/* Original filtration-barrier model for F171 renal comparison.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NIDDK glomerular disease: https://www.niddk.nih.gov/health-information/kidney-disease/glomerular-diseases
 * Simplified barrier: inflammation does not always produce all the findings shown.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f171/1.2.1.renal'];
  if (!lesson) return;
  const barrier = {src:'/human-biology/f171-glomerular-barrier.svg',width:280,height:385,compact:true,assessmentSensitive:true,
    alt:'Two simplified glomerular filtration barriers are compared. A healthy barrier retains blood cells and most large proteins while water and small solutes pass into filtrate. An inflamed, damaged barrier may allow cells or protein to enter the filtrate.',
    caption:'Compare what passes each barrier. Damage can allow blood cells or protein into the filtrate, although inflammation does not always cause every finding shown. The drawing omits cellular layers and is not to scale.'};
  const cysts = {src:'/human-biology/f171-kidney-cysts.svg',width:280,height:350,compact:true,assessmentSensitive:true,
    alt:'A schematic kidney with no cysts shown is compared with an enlarged kidney containing several fluid-filled cysts. Cysts can displace or damage functioning kidney tissue.',
    caption:'Compare the kidney outlines and locate the cysts. Enlarging cysts may displace or damage functioning tissue; sizes and number are illustrative.'};
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[barrier],1:[barrier],2:[cysts]};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:barrier,1:cysts};
}());

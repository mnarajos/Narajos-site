/* Original schematics for OCR Human Biology F171, disease effects.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Kidney cysts and their effects: https://www.niddk.nih.gov/health-information/kidney-disease/polycystic-kidney-disease
 * Hodgkin lymphoma and symptoms: https://www.cancer.gov/types/lymphoma/patient/adult-hodgkin-treatment-pdq
 * Drawings are conceptual, not clinical images; cysts and nodes vary between people.
 */
(function () {
  'use strict';
  const lessons = window.KeystoneHumanLessons;
  if (!lessons) return;
  const fig = (name, height, alt, caption) => ({src:'/human-biology/'+name+'.svg', width:280, height, compact:true, alt, caption});
  const cysts = fig('f171-kidney-cysts', 350,
    'A schematic kidney with no cysts shown is compared with an enlarged kidney containing several fluid-filled cysts. Cysts can displace or damage functioning kidney tissue.',
    'Compare the fictional kidney outlines and locate the cysts. Enlarging cysts may displace or damage functioning tissue; sizes and number are illustrative.');
  const filtration = fig('f171-kidney-volume-filtration', 330,
    'A conceptual comparison shows similar urine volumes at two visits alongside blood-test evidence of reduced filtration at the second visit. Urine volume alone does not measure waste clearance.',
    'Compare the similar urine amounts with the separate filtration finding. Continued urine production does not by itself establish effective waste clearance. This is an illustrative example.');
  const node = fig('f171-lymph-node-airway', 380,
    'Schematic views compare an airway beside an ordinary-sized lymph node with an enlarged node pressing on the outside of the airway. Enlarged nodes have several possible causes, and pressure on an airway can contribute to cough.',
    'Compare the airway openings and locate the enlarged node outside the airway. Local pressure can contribute to cough; enlargement alone does not identify its cause.');
  const pkd = lessons['f171/1.2.1.pkd'];
  if (pkd) {
    pkd.explainDiagrams = {...pkd.explainDiagrams, 0:[cysts]};
    pkd.modelDiagrams = {...pkd.modelDiagrams, 0:cysts, 1:filtration};
  }
  const hodgkin = lessons['f171/1.2.1.hodgkin'];
  if (hodgkin) {
    hodgkin.explainDiagrams = {...hodgkin.explainDiagrams, 1:[node]};
    hodgkin.modelDiagrams = {...hodgkin.modelDiagrams, 0:node, 1:node};
  }
}());

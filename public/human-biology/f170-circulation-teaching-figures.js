/* Simplified circulation and pressure models for OCR F170 2.1.2.
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * https://www.nhlbi.nih.gov/health/heart/blood-flow
 * https://openstax.org/books/anatomy-and-physiology/pages/19-3-cardiac-cycle
 * Chambers and valve are schematic; no pressures or rates are invented.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f170/2.1.2'];
  if (!lesson) return;
  const figure = (file,height,alt,caption) => ({src:'/human-biology/'+file+'.svg',width:280,height,compact:true,alt,caption});
  const circulation = figure('f170-circulation-path',630,
    'Blood returns from body tissues to the right atrium and right ventricle. The pulmonary artery carries it to the lungs. Pulmonary veins return it to the left atrium, and the left ventricle pumps it to body tissues.',
    'Follow the blood from body to right heart, lungs and left heart, then back to the body. This is a path diagram, not an anatomical view.');
  const valve = figure('f170-pulmonary-valve',365,
    'In a schematic section the pulmonary valve lies between the right ventricle and pulmonary artery. Blood moves through the open valve into the artery when ventricular pressure is higher.',
    'Compare pressure on the two sides and follow blood upwards. Two of the pulmonary valve’s three cusps are shown in this simplified section.');
  const alveolus = figure('f170-alveolar-barrier',295,
    'Oxygen diffuses from alveolar air across a thin alveolar cell and capillary wall into blood; carbon dioxide diffuses in the opposite direction.',
    'Follow oxygen across the barrier into blood. The layers are enlarged and separated for clarity.');
  const delivery = figure('f170-oxygen-delivery',380,
    'Air moves in and out of an alveolus. Oxygen diffuses into blood, is carried on haemoglobin and leaves the blood for a respiring tissue cell.',
    'Trace oxygen from alveolar air into blood and then to a respiring cell. Air remains separate from the blood; ventilation, diffusion and circulation are different processes.');
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[circulation,delivery]};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:valve,1:[alveolus,delivery],2:circulation};
}());

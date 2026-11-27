/* Original teaching schematics for OCR Human Biology F170 1.2.1.
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Cardiac output and stroke volume cross-check:
 * https://www.ncbi.nlm.nih.gov/sites/books/NBK470455/
 * Damage and blood output are conditional, not numerical patient measurements.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f170/1.2.1'];
  if (!lesson) return;
  const figure = (file,height,alt,caption) => ({src:'/human-biology/'+file+'.svg',width:280,height,compact:true,alt,caption});
  const levels = figure('f170-levels-organisation',500,
    'A cardiac muscle cell contributes to cardiac muscle tissue. The heart contains several tissues; the heart and blood vessels contribute to the circulatory system.',
    'Follow the cell to its tissue, organ and system. The heart is represented by a symbol; many cells and several tissue types contribute to the organ.');
  const damage = figure('f170-ventricle-damage',460,
    'A cross-section shows a ventricular muscle wall around a cavity. In a second schematic a hatched region represents damaged muscle. Contraction generates pressure; damaged muscle may reduce blood ejected per beat and, at the same heart rate, per minute.',
    'Compare the muscle walls. A damaged region may reduce ejection per beat; if heart rate and other factors are held constant, less per beat means less per minute. These drawings are not measurements.');
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[levels],1:[damage]};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:damage,1:damage,2:damage};
}());

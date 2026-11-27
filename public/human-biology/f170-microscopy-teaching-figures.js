/* Original models for F170 microscopy and fractionation, based on the lesson's existing
 * calibrated micrograph and measurements. OCR specification F170 1.1.2:
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * https://openstax.org/books/concepts-biology/pages/3-1-how-cells-are-studied
 * https://www.ncbi.nlm.nih.gov/books/NBK26936/
 * The proportions in the ratio model reproduce the existing image readings; other drawings
 * are schematic and do not imply scale or purity.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f170/1.1.2'];
  if (!lesson) return;
  const figure = (file,height,alt,caption) => ({src:'/human-biology/'+file+'.svg',width:280,height,compact:true,alt,caption});
  const ratio = figure('f170-scale-bar-ratio',290,
    'Bars in the ratio 48 to 122 represent the measured cell width and scale bar on the source micrograph. The scale bar represents 20 micrometres, so the cell width is approximately 0.39 times 20, or 8 micrometres.',
    'Compare the two measured lengths from the same micrograph. The drawing preserves their ratio; the pixel readings refer to the source image, not the size of this drawing.');
  const resolution = figure('f170-magnification-resolution',310,
    'A blurred spot is shown beside a larger copy of the same blurred spot. Both remain unresolved; magnification equals image size divided by actual size.',
    'Compare the same blur before and after enlargement. It is larger, but no new detail has been resolved.');
  const wet = figure('f170-wet-mount',310,
    'A side view shows a coverslip over a thin specimen in liquid, supported by a glass slide, with light passing through.',
    'Locate the coverslip, specimen and slide. Thicknesses are exaggerated; some stains improve contrast but a preparation that kills cells cannot show their movement.');
  const prep = figure('f170-fractionation-prep',370,
    'Cells are broken open in a cold buffered isotonic solution. A filter holds larger debris while the filtered homogenate passes through for centrifugation.',
    'Follow the components from broken cells through the filter. The cold, buffered isotonic solution helps preserve suitable conditions for cell components.');
  const spins = figure('f170-fractionation-spins',440,
    'The first lower-speed spin leaves most nuclei in a pellet and many mitochondria and smaller particles in the supernatant. Only the supernatant is transferred. A faster second spin leaves many mitochondria in a pellet and many smaller particles in the new supernatant.',
    'Follow only the liquid from the first tube to the second spin. Pellets are enriched in the named components, not necessarily pure.');
  const printed = figure('f170-print-magnification',325,
    'In a hypothetical print, a 30 millimetre image of a scale bar represents 20 micrometres. Converting 30 millimetres to 30,000 micrometres gives a magnification of 1,500. A larger copy of a blur remains unresolved.',
    'Convert both lengths to the same units before dividing. The bar is schematic; enlarging a print does not add resolved detail.');
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[ratio],1:[resolution],2:[wet]};
  lesson.afterComparisonDiagrams = {...lesson.afterComparisonDiagrams,0:[prep],1:[spins],2:[spins]};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:ratio,1:ratio,2:ratio,3:printed};
}());

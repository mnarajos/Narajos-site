/* F173 chromatogram worked stages, using the existing proportional schematic.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * The lesson's fictional table gives X 2 cm, Y 4 cm, unknown spots 2 and 5 cm,
 * and solvent front 10 cm, all measured from the baseline. No real run is implied.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f173/a3'];if(!lesson)return;
 const diagram=(caption)=>({src:'/human-biology/chromatography.svg',width:280,height:300,compact:true,assessmentSensitive:true,
  alt:'A fictional chromatogram has a baseline and solvent front. Standard X and the lower unknown spot each travelled two centimetres; standard Y travelled four centimetres and the upper unknown spot travelled five centimetres. The solvent front travelled ten centimetres. A matching spot is consistent with, but does not prove, identity.',caption});
 lesson.modelDiagrams={...lesson.modelDiagrams,
  0:diagram('Measure from the same baseline: standard X travelled 2 cm while the solvent front travelled 10 cm, giving 2 ÷ 10 = 0.20.'),
  1:diagram('Compare X and the lower unknown spot at the same height. Both give 0.20; a match is consistent with X, but does not establish identity.'),
  2:diagram('The upper unknown spot travelled 5 cm, so its Rf is 5 ÷ 10 = 0.50. It does not match the supplied X or Y spots in this run.')};
}());

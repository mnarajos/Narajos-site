/* Normal tissue functions for the F171 tissues comparison, shown before disease examples.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Melanin: https://medlineplus.gov/ency/article/002256.htm
 * Bone mineral: https://medlineplus.gov/ency/article/002062.htm
 * Movable bones: https://medlineplus.gov/ency/article/002298.htm
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f171/1.2.1.tissues'];
  if (!lesson) return;
  const normal = {src:'/human-biology/f171-tissues-normal-functions.svg',width:280,height:620,compact:true,
    alt:'Four simplified views show a signal along a nerve fibre, movement between bones at a movable joint, a melanocyte producing the pigment melanin, and mineral within growing bone contributing to strength. Colours and dots are schematic, not measurements.',
    caption:'Compare the four normal functions: signals travel along nerves; movable joints allow movement; melanocytes make melanin; and mineral contributes to bone strength. The diagrams are simplified.'};
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[normal]};
}());

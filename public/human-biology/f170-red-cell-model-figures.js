/* OCR F170 1.1.1: red-cell structure and function; diagrams are conceptual.
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f170/1.1.1'];
  if (!lesson) return;
  const cell = lesson.teachingDiagram;
  const capacity = {src:'/human-biology/red-cell-capacity.svg',width:280,height:300,compact:true,
    alt:'Two schematic red-cell sections share the same shape but contain different numbers of dots representing haemoglobin. The lower-haemoglobin example has less capacity to bind oxygen. Dots are not counts of actual molecules.',
    caption:'Compare the cell contents while keeping shape the same. Fewer haemoglobin symbols represent less oxygen-binding capacity; this is a qualitative model.'};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:cell,1:cell,2:capacity};
}());

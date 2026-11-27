/* Original F170 bacterial growth figures. The compact graph repeats the lesson's
 * illustrative values, without changing the existing accessible graph/table.
 * OCR Human Biology F170 4.1.4:
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * https://openstax.org/books/microbiology/pages/9-1-how-microbes-grow
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f170/4.1.4'];
  if (!lesson) return;
  const figure = (file,height,alt,caption) => ({src:'/human-biology/'+file+'.svg',width:280,height,compact:true,alt,caption});
  const fission = figure('f170-binary-fission',330,
    'A bacterium copies its chromosome, forms a partition and divides into two daughter cells.',
    'Follow chromosome copying and partition formation to the two daughter cells. This is a simplified bacterial model.');
  const balance = figure('f170-population-balance',350,
    'In a hypothetical population of four cells, one divides and another dies while two remain. The resulting viable count is still four.',
    'Count before and after. Division and death could balance, but a constant count alone does not prove that this example occurred.');
  const graph = figure('f170-growth-graph',310,
    'Illustrative log base ten viable counts at time intervals 0 through 6 are 2, 2, 4, 6, 6, 6 and 5.',
    'Read the log values against time: 0–1 shows lag, 1–3 exponential growth, 3–5 a stationary plateau and 5–6 decline in this example. A plateau does not prove that division and death stopped.');
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[fission,balance]};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:graph,1:graph,2:[graph,balance]};
}());

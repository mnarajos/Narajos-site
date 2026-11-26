/* F177 receptor signalling example, not a measured dose response.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Receptor competition: https://pubmed.ncbi.nlm.nih.gov/20546783/
 * This example increases secretion; receptor effects vary by context.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f177/a1'];if(!lesson)return;
 const response={src:'/human-biology/f177-antagonist-response.svg',width:280,height:350,compact:true,assessmentSensitive:true,
  alt:'In a fictional example, agonist-bound receptors increase secretion. At the same agonist concentration, a competitive antagonist occupies some of the same sites without activating them. Fewer receptors are activated and secretion may fall. Counts of symbols are illustrative; other receptors can have different effects.',
  caption:'Compare the same fictional receptor at a given agonist concentration. The antagonist competes for its binding site, so fewer receptors may be activated. Here activation increases secretion; other receptors can have different effects.'};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:response,1:response};
}());

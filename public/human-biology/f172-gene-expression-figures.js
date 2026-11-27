/* F172 gene delivery: an illustrative cell-group example.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * MedlinePlus: https://medlineplus.gov/genetics/understanding/therapy/procedures/
 * FDA: https://www.fda.gov/consumers/consumer-updates/how-gene-therapy-can-cure-or-treat-diseases
 * Schematic counts are fictional; outcomes depend on the treatment and condition.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f172/a4'];if(!lesson)return;
 const comparison={src:'/human-biology/f172-gene-expression-comparison.svg',width:280,height:365,compact:true,assessmentSensitive:true,
  alt:'In a fictional example, four target cells each make a small amount of functional protein before treatment. After treatment, two cells express a delivered copy and make more, while two not reached still make little. Cells and protein dots illustrate the comparison, not measured results.',
  caption:'Compare the fictional cells before and after treatment. In this example only some cells receive and express the copy; the numbers and protein symbols are illustrative. Actual outcomes depend on delivery, expression and the condition.'};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:comparison,1:comparison,2:comparison};
}());

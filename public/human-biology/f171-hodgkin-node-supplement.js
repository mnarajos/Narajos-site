/* Conceptual F171 Hodgkin lymphoma explanation; not a diagnostic image.
 * NCI: https://www.cancer.gov/types/lymphoma/hp/child-hodgkin-treatment-pdq
 * https://www.cancer.gov/types/lymphoma/patient/adult-hodgkin-treatment-pdq
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f171/1.2.1.hodgkin'];
  if (!lesson) return;
  const node = {src:'/human-biology/f171-hodgkin-node-cells.svg',width:280,height:370,compact:true,
    alt:'A B-lymphocyte origin is linked to an affected lymph node containing a conceptual lymphoma cell marker among surrounding inflammatory-cell markers. The node can enlarge; there are other possible causes of enlargement. The markers do not depict a real biopsy or a cell count.',
    caption:'In this model of classical Hodgkin lymphoma, locate the lymphoma cell among inflammatory cells. An affected node can enlarge; swelling has other possible causes. Colours and sizes distinguish roles; this is not a tissue sample.'};
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[node]};
}());

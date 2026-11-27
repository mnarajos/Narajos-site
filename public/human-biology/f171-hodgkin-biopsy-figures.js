/* Original schematic of tissue diagnosis; no patient image or diagnostic result.
 * OCR F171: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NCI Hodgkin lymphoma diagnosis: https://www.cancer.gov/types/lymphoma/patient/adult-hodgkin-treatment-pdq
 * NHS Hodgkin lymphoma diagnosis: https://www.nhs.uk/conditions/hodgkin-lymphoma/diagnosis/
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/1.2.1.hodgkin'];if(!lesson)return;
 const figure={src:'/human-biology/f171-node-biopsy-evidence.svg',width:280,height:365,compact:true,assessmentSensitive:true,
  alt:'A schematic enlarged lymph node leads to a small tissue sample on a slide. Laboratory microscopy examines the tissue; findings can help identify why the node is enlarged. An enlarged node has other possible causes, and further tests may be needed. The symbols are not patient images.',
  caption:'Follow the sample from the node to laboratory examination. A swollen node alone does not establish lymphoma; tissue findings can establish a diagnosis, sometimes with additional tests. The drawing is schematic.'};
 lesson.explainDiagrams={...lesson.explainDiagrams,2:[...(lesson.explainDiagrams?.[2]||[]),figure]};
 lesson.modelDiagrams={...lesson.modelDiagrams,2:figure};
}());

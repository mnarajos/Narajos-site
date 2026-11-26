/* Schematic F171 airway and alveolar comparisons.
 * OCR Human Biology specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS asthma overview: https://www.nhs.uk/conditions/asthma/
 * NHS COPD overview: https://www.nhs.uk/conditions/chronic-obstructive-pulmonary-disease-copd/
 * The drawings are illustrative; individual airway changes and symptoms vary.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f171/1.2.1.airways'];
  if (!lesson) return;
  const airway = {src:'/human-biology/f171-asthma-airway.svg',width:280,height:405,compact:true,assessmentSensitive:true,
    alt:'Two simplified airway cross-sections have the same external diameter. The first has a wide opening. The second has a smaller opening, with a thicker wall, contracted smooth muscle and more mucus at the inner surface. A narrower opening can increase airflow resistance.',
    caption:'Compare the white openings. In this simplified asthma example, muscle tightening, wall swelling and mucus reduce the space for airflow; the drawing is not to scale.'};
  const alveoli = {src:'/human-biology/alveolar-wall-loss.svg',width:220,height:280,compact:true,assessmentSensitive:true,
    alt:'A simplified group of four intact alveoli is compared with a larger air space where some partitions have been lost. Fewer partitions mean less surface area for gas exchange.',
    caption:'Compare the partitions. Losing alveolar walls reduces gas-exchange area; this is a schematic, not to scale.'};
  lesson.explainDiagrams = {...lesson.explainDiagrams,1:[airway],2:[alveoli]};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:airway,1:[airway,alveoli]};
}());

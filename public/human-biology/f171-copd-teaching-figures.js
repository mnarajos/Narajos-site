/* F171 COPD: interpretation of airflow evidence and airway clearance.
 * Schematics, not clinical measurements or individual diagnostic rules.
 * Sources: https://www.nhs.uk/conditions/chronic-obstructive-pulmonary-disease-copd/symptoms/
 * https://www.nhs.uk/conditions/chronic-obstructive-pulmonary-disease-copd/diagnosis/
 * https://www.nhlbi.nih.gov/news/2023/extra-mucus-accumulation-copd-linked-increased-risk-death
 * https://www.nhlbi.nih.gov/health/primary-ciliary-dyskinesia
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f171/1.2.1'];
  if (!lesson) return;
  const diagram = (name,height,alt,caption) => ({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,alt,caption});
  const spirometry = diagram('f171-copd-spirometry',365,
    'A qualitative graph of exhaled volume over time shows a faster and a slower curve, with less volume exhaled in the first second for the slower curve. The two reach the same final volume in this illustration; it is not a patient test.',
    'Compare the heights at one second. Spirometry measures exhaled volume over time; diagnosing obstruction uses the test results and clinical context, not this illustrative graph alone.');
  const clearance = diagram('f171-copd-clearance',380,
    'A simplified airway lining shows cilia moving mucus in usual clearance. Reduced clearance can leave mucus behind, contributing to infection, which can worsen symptoms. Infection is a risk, not a certainty.',
    'Follow the mucus. Reduced clearance can leave secretions in the airways and contribute to infection; an infection can worsen symptoms.');
  const airway = {...lesson.modelDiagrams[0],caption:'Airflow evidence concerns how easily air passes through airways. This diagram represents one possible structural cause of narrowing.'};
  const alveoli = {...lesson.modelDiagrams[1],caption:'Tissue evidence addresses the alveolar walls and their exchange surface. A symptom alone cannot establish which structure has changed.'};
  lesson.explainDiagrams = {...lesson.explainDiagrams, 1:[spirometry], 2:[clearance]};
  lesson.modelDiagrams = {...lesson.modelDiagrams, 2:[airway,alveoli]};
}());

/* F177 preclinical, clinical and post-authorisation evidence models.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * MHRA Yellow Card scheme: https://yellowcard.mhra.gov.uk/
 * NHS clinical trials: https://www.nhs.uk/conditions/clinical-trials/
 * Illustrative icons and examples, not actual studies or medical advice.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f177/a3'];if(!lesson)return;
 const fig=(name,height,alt,caption,sensitive=false)=>({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,assessmentSensitive:sensitive,alt,caption});
 const model=fig('f177-preclinical-evidence',300,
  'A schematic laboratory dish represents a preclinical biological model. An observed effect in that model can justify further investigation, but it does not establish benefit for people.',
  'Trace the model result towards further research. Biological activity in a dish is not, by itself, evidence that patients benefit.');
 const trial=fig('f177-study-duration',300,
  'A schematic group of participants is shown with a one-month observation period. The study can provide evidence about those participants during that time, while uncommon or delayed effects may not be detected. The person symbols are not the sample size.',
  'Compare the people and observation period with the conclusion. A limited study can miss uncommon or delayed effects; the icons are not a participant count.');
 const report=fig('f177-safety-signal',300,
  'A suspected adverse-effect report is followed by investigation of timing, alternative explanations and comparison records. A report can raise a safety signal but does not alone establish that the medicine caused the event.',
  'Follow the report into investigation. A suspected signal needs further evidence before a causal conclusion; the document and magnifier are symbolic.',true);
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[model],1:[trial,report]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:model,1:trial,2:report};
}());

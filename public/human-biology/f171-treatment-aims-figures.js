/* F171 treatment intent: two illustrative examples.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS antibiotics: https://www.nhs.uk/medicines/antibiotics/
 * NCI supportive care: https://www.cancer.gov/publications/dictionaries/cancer-terms/def/supportive-care
 * Examples describe aims, not guaranteed outcomes or individual medical advice.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/2.1'];if(!lesson)return;
 const aims={src:'/human-biology/f171-treatment-aims.svg',width:280,height:360,compact:true,
  alt:'Two illustrative treatment aims are compared. An antibiotic can target susceptible bacteria as treatment aimed at clearing an infection. A walking aid can support mobility. Supportive care can be combined with treatment aimed at the cause; an intended cure is not guaranteed.',
  caption:'Compare the aims: treatment with curative intent targets the condition, while supportive care manages effects or helps function. They can be combined, and an intended cure is not guaranteed.'};
 lesson.explainDiagrams={...lesson.explainDiagrams,1:[aims]};
}());

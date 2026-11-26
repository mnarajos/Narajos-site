/* F171 treatment comparison, with fictional fracture evidence.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS fracture treatment: https://www.nhs.uk/conditions/broken-arm-or-wrist/
 * Frimley Health follow-up and fixation: https://www.fhft.nhs.uk/patients-and-visitors/patient-information-library/wrist-fractures
 * Original schematics, not images of a patient or an exhaustive treatment guide.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/2.1'];if(!lesson)return;
 const treatments={src:'/human-biology/f171-fracture-treatment.svg',width:280,height:350,compact:true,
  alt:'Two simplified side views compare a cast around an arm, limiting movement from outside, with a plate and screws attached across a bone fracture inside the body. This is one form of fixation; the sketches do not show full anatomy.',
  caption:'Compare where support acts. A cast limits movement from outside; a surgically placed plate and screws can hold fragments internally. Fixation involves an operation and its associated risks.'};
 const followup={src:'/human-biology/f171-fracture-alignment.svg',width:280,height:260,compact:true,
  alt:'Two fictional schematic views of the same broken bone show the fragments in alignment at the first and later review. They are drawings, not X-rays or actual patient data.',
  caption:'Compare the fragment positions in the fictional first and later reviews. Their maintained alignment supports the immediate goal, while follow-up and treatment decisions depend on the full case.'};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[treatments]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:followup,1:treatments,2:followup};
}());

/* F171 immune response distinctions and transplant treatment trade-off.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NIDDK kidney transplant: https://www.niddk.nih.gov/health-information/kidney-disease/kidney-failure/kidney-transplant
 * Simplified teaching models; outcomes vary and this is not treatment advice.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/3.2.1'];if(!lesson)return;
 const fig=(name,height,alt,caption)=>({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,assessmentSensitive:true,alt,caption});
 const compare=fig('f171-immune-targets',450,
  'Four schematic immune-response examples compare weaker defence against a pathogen, an autoimmune response against self tissue, an allergic response to a usually harmless antigen, and recipient immune cells responding to donor graft tissue. The targets and mechanisms differ.',
  'Compare the targets. Immunodeficiency weakens defence; autoimmunity targets self tissue; allergy reacts to a usually harmless antigen; rejection can target donor tissue. The examples are schematic.');
 const tradeoff=fig('f171-graft-immune-tradeoff',335,
  'A schematic immunosuppressive medicine reduces immune activity. One possible effect is less immune damage to a donor graft; another is weaker defence against pathogens, increasing infection risk. Infection is not inevitable.',
  'Follow the two branches from reduced immune activity. It may protect the graft while making infection more likely; rejection and infection have different targets.');
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[compare,tradeoff]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:compare,1:tradeoff,2:tradeoff};
}());

/* F171 viral evidence and prevention models, not patient records.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * WHO HIV fact sheet: https://www.who.int/news-room/fact-sheets/detail/hiv-aids
 * WHO ventilation: https://www.who.int/health-topics/ventilation
 * NHS blood donation testing: https://www.blood.co.uk/the-donation-process/after-your-donation/how-we-test-your-blood/
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/1.3.1.viruses'];if(!lesson)return;
 const fig=(name,height,alt,caption,sensitive=false)=>({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,assessmentSensitive:sensitive,alt,caption});
 const stage=fig('f171-hiv-stage',365,
  'A schematic branches from HIV infection to effective treatment protecting immune function, or without effective treatment to the possibility of advanced immune damage and AIDS. HIV infection does not by itself establish AIDS, and symptoms are not a reliable staging test.',
  'Follow the two possible pathways. Effective treatment protects immune function; without effective treatment, advanced disease can develop. HIV infection alone does not establish AIDS.',true);
 const evidence=fig('f171-sign-symptom',295,
  'A thermometer represents a measured temperature, a sign. A speech bubble represents a person reporting fatigue, a symptom. Both can occur for different reasons.',
  'Compare how each finding is obtained: a temperature is measured; fatigue is reported. Neither alone identifies a particular infection.');
 const prevention=fig('f171-air-blood-prevention',335,
  'A schematic open window allows indoor air to be replaced, reducing the build-up of infectious respiratory particles. In a separate route, donor blood is screened before use to reduce blood-borne infection risk. One measure does not substitute for the other.',
  'Match each measure to its exposure: ventilation changes shared air; screening addresses donated blood. Other measures address other routes.');
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[stage],1:[evidence]};
 lesson.comparisonFigures={...lesson.comparisonFigures,0:[prevention],1:[prevention],2:[stage]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:evidence,1:evidence,2:prevention};
}());

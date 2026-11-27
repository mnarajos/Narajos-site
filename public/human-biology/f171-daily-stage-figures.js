/* Conditional examples of symptoms and daily activities, not individual advice.
 * OCR F171: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS reflux: https://www.nhs.uk/conditions/heartburn-and-acid-reflux/
 * NHS Parkinson's: https://www.nhs.uk/conditions/parkinsons-disease/symptoms/
 */
(function () {
 'use strict';
 const lessons=window.KeystoneHumanLessons||{};
 const fig=(name,height,alt,caption)=>({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,assessmentSensitive:true,alt,caption});
 const reflux=fig('f171-reflux-daily-life',350,'A schematic shows stomach contents moving upwards into the oesophagus. A meal and a bed indicate two possible activities that symptoms can interrupt. Effects vary between people.','Follow reflux into the oesophagus, then compare two possible effects: meals or sleep may be interrupted. Symptoms and their effects vary.');
 const timing=fig('f171-care-activity-timeline',330,'A planned school or work activity and a care appointment or treatment overlap in a conceptual day. The overlap may require an adjustment; no times or treatment schedule are claimed.','Compare the overlapping plans. Visits or treatment may affect activity and travel arrangements; experiences and timings vary.');
 const start=fig('f171-starting-movement',320,'An illustrative sequence shows a person pausing before a first step and then moving a foot forward. Some people with Parkinson’s have difficulty starting movement; the drawing does not establish a diagnosis or a fixed delay.','Compare the possible pause with the start of a step. Initiating movement can be difficult for some people with Parkinson’s; the example does not apply to everyone.');
 const hiatus=lessons['f171/1.2.1.hiatus'];if(hiatus)hiatus.explainDiagrams={...hiatus.explainDiagrams,2:[...(hiatus.explainDiagrams?.[2]||[]),reflux]};
 const pkd=lessons['f171/1.2.1.pkd'];if(pkd)pkd.explainDiagrams={...pkd.explainDiagrams,2:[...(pkd.explainDiagrams?.[2]||[]),timing]};
 const management=lessons['f171/2.2'];if(management)management.modelDiagrams={...management.modelDiagrams,0:start};
}());

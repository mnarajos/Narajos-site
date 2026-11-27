/* Fictional sleep-study means and a qualitative confounding model.
 * OCR F171: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Random allocation and confounding: https://www.ncbi.nlm.nih.gov/books/NBK557780/
 * Values reproduce the authored teaching example; no real study is represented.
 */
(function(){
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/a5']; if(!lesson)return;
 const fig=(name,height,alt,caption)=>({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,assessmentSensitive:true,alt,caption});
 const bars=fig('f171-sleep-study-bars',280,'A graph of a fictional study shows mean reported nightly sleep gains of 35 minutes for workshop participants and 15 minutes for the comparison group. The difference is 20 minutes per night, which does not alone establish a cause.','Read both means on the same axis. The 20-minute difference is observed in this fictional study; it does not isolate a workshop effect.');
 const confound=fig('f171-sleep-study-confounding',320,'Motivation may influence both the choice to attend a workshop and changes to a sleep routine. Both workshop attendance and routine may relate to reported sleep; these arrows are possible influences, not established causes.','Follow the two possible paths from motivation. A difference in routines could help explain a group difference even without a workshop effect.');
 const random={...window.KeystoneHumanLessons?.['f177/a2']?.explainDiagrams?.[0]?.[0],assessmentSensitive:true};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[bars,confound]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:bars,1:confound,...(random.src?{2:random}:{})};
}());

/* F177 interpreting uncontrolled observations and randomised trial methods.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NCI randomisation: https://www.cancer.gov/research/participate/clinical-trials/how-trials-work
 * Counts match the lesson's fictional data; icons in the methods diagram are not counts.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f177/a2'];if(!lesson)return;
 const uncontrolled={src:'/human-biology/f177-uncontrolled-outcomes.svg',width:280,height:275,compact:true,assessmentSensitive:true,
  alt:'In a fictional uncontrolled observation, eight of twelve people who tried a medicine improved, shown as filled circles; four did not, shown as outlines. No comparison group is shown, so the result alone cannot establish how many would have improved without the medicine.',
  caption:'Count eight filled circles out of twelve. Without a comparison group, the observation alone cannot show how many would have improved anyway.'};
 const methods={src:'/human-biology/f177-random-blind.svg',width:280,height:390,compact:true,assessmentSensitive:true,
  alt:'A fictional trial assigns participants by chance to medicine and comparison groups. An assessor rates improvement without knowing each participant’s group. Random allocation helps reduce systematic starting differences, though groups may still differ by chance; blinding helps reduce rating bias. Icons indicate roles rather than participant counts.',
  caption:'Follow the two safeguards. Allocation by chance helps reduce systematic differences at the start, though small groups may differ by chance. Keeping the group hidden from the assessor helps reduce rating bias.'};
 const outcomes={...lesson.teachingDiagram,assessmentSensitive:true};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[methods]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:uncontrolled,1:[methods,outcomes],2:methods};
}());

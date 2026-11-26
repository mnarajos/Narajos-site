/* F171 prevention, screening, diagnosis and monitoring examples.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS screening: https://www.nhs.uk/conditions/nhs-screening/
 * NHS activity and health: https://www.nhs.uk/live-well/exercise/exercise-health-benefits/
 * Models are schematic; a positive screen is not by itself a diagnosis.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/2.3'];if(!lesson)return;
 const activity={src:'/human-biology/f171-risk-prevention.svg',width:280,height:275,compact:true,
  alt:'A schematic person walks along a path. Regular activity can reduce the risk of some diseases, but does not guarantee that a person remains disease-free.',
  caption:'The example targets risk before disease develops. Physical activity can reduce the risk of some conditions; it does not guarantee prevention.'};
 const sequence={src:'/human-biology/f171-screen-diagnose-monitor.svg',width:280,height:390,compact:true,assessmentSensitive:true,
  alt:'A schematic sequence shows a screen flagging a possible condition, a further assessment investigating whether it is present, and, if confirmed, repeat observations tracking change. A positive screen is not a diagnosis. The small graph is symbolic, not measured data.',
  caption:'Follow the purpose at each stage: screening flags a possibility, diagnostic assessment investigates it, and monitoring tracks an established condition over time.'};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[activity,sequence]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:activity,1:sequence,2:sequence,3:sequence};
}());

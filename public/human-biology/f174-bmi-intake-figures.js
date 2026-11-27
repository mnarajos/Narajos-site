/* F174 nutritional measurements: fictional, qualitative comparisons.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * CDC BMI explanation: https://www.cdc.gov/bmi/faq/
 * Diagram proportions and symbols are illustrative, not measured individual data.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f174/a4'];if(!lesson)return;
 const bmi={src:'/human-biology/f174-bmi-composition.svg',width:280,height:355,compact:true,assessmentSensitive:true,
  alt:'Two fictional adults have the same height and total mass and therefore the same BMI. Equal-height stacked bars show an illustrative example of different muscle and fat amounts. The other component is equal in this example. The portions are not measured data.',
  caption:'Compare the equal totals with the labelled portions. In this fictional example the adults have the same height and mass, but different amounts of muscle and fat. BMI alone cannot distinguish these components.'};
 const intake={src:'/human-biology/f174-intake-biomarker.svg',width:280,height:365,compact:true,assessmentSensitive:true,
  alt:'Two fictional food records show similar estimated nutrient intake. Paths through absorption and use lead to two blood measurement symbols that differ. Absorption, use and sampling conditions can affect the comparison; symbol counts are illustrative, not measured values.',
  caption:'Follow intake towards the blood measurement. Similar recorded intake need not produce identical measurements: absorption, use and sampling conditions can differ. The symbols are illustrative.'};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[bmi],1:[intake]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:bmi,1:intake,2:intake};
}());

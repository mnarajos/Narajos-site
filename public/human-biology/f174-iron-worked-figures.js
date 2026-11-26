/* F174 nutritional adequacy: fictional meal comparison and iron in haemoglobin.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHLBI: https://www.nhlbi.nih.gov/health/blood-tests
 * Schematics show qualitative relationships, not meal analyses or patient results.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f174/a1'];if(!lesson)return;
 const meals={src:'/human-biology/meals-energy-iron.svg',width:280,height:300,compact:true,assessmentSensitive:true,
  alt:'Two fictional meals have equal-length bars representing similar energy, while only meal A is labelled as including a substantial iron source. The comparison is qualitative, not measured data.',
  caption:'Compare the bars: these fictional meals supply similar energy, but their iron sources differ. The example does not give measured nutrient values.'};
 const iron={src:'/human-biology/f174-iron-haemoglobin-oxygen.svg',width:280,height:345,compact:true,assessmentSensitive:true,
  alt:'A schematic shows iron contributing to haemoglobin production in a developing red blood cell. A mature red blood cell contains haemoglobin, which binds oxygen carried by blood towards body tissues. The shapes are not molecular structures or to scale.',
  caption:'Follow iron into haemoglobin production. Haemoglobin in red blood cells binds oxygen; blood carries oxygen to tissues. Iron intake and energy intake describe different aspects of a diet.'};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:meals,1:[meals,iron]};
}());

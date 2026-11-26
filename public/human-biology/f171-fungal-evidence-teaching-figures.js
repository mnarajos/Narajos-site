/* F171 fungal sources; conceptual illustrations, not diagnostic images.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS thrush: https://www.nhs.uk/conditions/thrush-in-men-and-women/
 * CDC histoplasmosis: https://www.cdc.gov/histoplasmosis/causes/index.html
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/1.3.1.fungi'];if(!lesson)return;
 const fig=(name,height,alt,caption)=>({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,assessmentSensitive:true,alt,caption});
 const resident=fig('f171-candida-overgrowth',310,
  'A schematic mucosal surface is shown with a few yeast symbols and then more yeast symbols. Candida can be present without symptoms; overgrowth can cause thrush. The symbols are illustrative and are not measurements or a diagnosis.',
  'Compare the yeast symbols on the two surfaces. Candida can be present without illness; overgrowth can cause symptoms. This illustration does not diagnose a person.');
 const environmental=fig('f171-histoplasma-exposure',325,
  'A schematic shows particles from disturbed contaminated soil becoming airborne, then being inhaled by a person. Histoplasma spores from environmental material can cause infection when inhaled; shared attendance does not prove the source.',
  'Follow the possible route from contaminated material into the lungs. Breathing in environmental spores can cause histoplasmosis; exposure alone does not prove infection.');
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[resident,environmental]};
 lesson.comparisonFigures={...lesson.comparisonFigures,0:[resident],1:[environmental]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:environmental,1:resident};
}());

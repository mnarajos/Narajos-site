/* F171 disease basics: original examples and reused local teaching figures.
 * OCR Human Biology specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS pneumonia: https://www.nhs.uk/conditions/pneumonia/
 * NHS atherosclerosis: https://www.nhs.uk/conditions/atherosclerosis/
 * NHS asthma: https://www.nhs.uk/conditions/asthma/
 * Figures are illustrative examples, not diagnoses or measured risks.
 */
(function(){
 'use strict';
 function fig(file,height,alt,caption){return {src:'/human-biology/'+file+'.svg',width:280,height:height,compact:true,assessmentSensitive:true,alt:alt,caption:caption};}
 const signs=fig('f171-sign-symptom',295,'A thermometer represents measured temperature, a sign. A speech bubble reports feeling tired, a symptom. Either finding can have several causes.','Compare an objective measurement with a feeling reported by the person. Either finding can have several causes.');
 const causes=fig('f171-disease-cause-examples',385,'One example shows bacteria entering lungs, representing a possible infectious cause of pneumonia. A second shows plaque narrowing an artery, an example of non-infectious disease. The pictures are schematic, not diagnoses.','Compare an infectious cause with non-infectious plaque in an artery. Pneumonia and other diseases can have several causes.');
 const risk=fig('f171-risk-probability',355,'A hypothetical example compares two groups of ten. Two people in the group without a risk factor and four in the group with the factor experience an outcome. Some in either group do not experience the outcome. These counts are illustrative, not experimental data or real risk estimates.','Compare the marked outcomes in equal hypothetical groups. A higher associated chance does not determine what happens to an individual, and an association alone does not establish cause.');
 const airway=fig('f171-asthma-airway',405,'Matched cross-sections show the same outside airway width but a wider opening in one and a narrower opening in the other, with changes to wall, muscle and mucus. The drawings are schematic.','Compare the white airway openings. Narrowing can reduce airflow and contribute to breathlessness; symptoms and their causes vary.');
 window.KeystoneF171DiseaseBasicsRecaps={'f171/a1/0':[signs],'f171/a1/1':[causes,risk],'f171/a1/2':[airway]};
})();

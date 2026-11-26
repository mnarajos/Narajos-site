/* F171 tissue-change schematics, not patient images or diagnostic guides.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS MS: https://www.nhs.uk/conditions/multiple-sclerosis/
 * NHS rheumatoid arthritis: https://www.nhs.uk/conditions/rheumatoid-arthritis/
 * NHS melanoma: https://www.nhs.uk/conditions/melanoma-skin-cancer/
 * NHS rickets: https://www.nhs.uk/conditions/rickets-and-osteomalacia/
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/1.2.1.tissues'];
 if(!lesson)return;
 const fig=(name,height,alt,caption,sensitive=false)=>({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,assessmentSensitive:sensitive,alt,caption});
 const myelin=fig('f171-myelin-change',305,
  'A schematic central nervous system axon is shown with intact myelin and then with a damaged section. Damage to myelin can slow or block nerve signalling; outcomes vary.',
  'Compare the insulating myelin segments. In MS, immune-mediated damage can disrupt signalling along central nervous system axons; this is a simplified example.',true);
 const joint=fig('f171-inflamed-joint',300,
  'A simplified joint section shows two bone ends, their cartilage and an inflamed synovial lining around the joint. In rheumatoid arthritis inflammation can contribute to pain, swelling and restricted movement.',
  'Locate the inflamed lining around the joint space. Inflammation can contribute to swelling, pain and stiffness; this section is schematic.');
 const melanoma=fig('f171-melanocytes',300,
  'A simplified skin section shows pigment-producing melanocytes in the epidermis and a cluster representing uncontrolled growth of melanocytes. The drawing cannot show whether a real skin lesion is melanoma.',
  'Locate melanocytes within the epidermis. The cluster represents uncontrolled cell growth; a real changing skin lesion needs assessment, and this model cannot diagnose it.');
 const vitamin=fig('f171-vitamin-d-calcium',335,
  'Vitamin D helps absorption of calcium from the small intestine into blood. Calcium is needed for bone mineralisation. Vitamin D deficiency can reduce absorption and impair mineralisation.',
  'Follow calcium from the intestinal lumen into blood and then towards growing bone. Vitamin D helps absorption; the schematic omits many steps.',true);
 const bone=fig('f171-bone-mineral',310,
  'Two schematic growing bones are shown with more and fewer dots representing mineral content. Reduced mineralisation can weaken growing bone in rickets. The dots are symbolic rather than measured mineral deposits.',
  'Compare the symbolic mineral dots. Poor mineralisation can weaken growing bone; the dots and shapes are not patient measurements.',true);
 lesson.explainDiagrams={...lesson.explainDiagrams,1:[myelin,joint],2:[melanoma,vitamin,bone]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:joint,1:[joint,myelin,bone]};
}());

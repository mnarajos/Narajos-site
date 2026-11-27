/* F171 comparison of mechanisms that can reduce oxygen delivery.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS sickle cell disease overview: https://www.nhs.uk/conditions/sickle-cell-disease/
 * NHS cystic fibrosis overview: https://www.nhs.uk/conditions/cystic-fibrosis/
 * Schematic examples; effects and symptoms differ between individuals.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/1.2.1.oxygen'];
 if(!lesson)return;
 const airway={src:'/human-biology/airway-narrowing.svg',width:220,height:280,compact:true,
  alt:'Two airway cross-sections have equal outer widths. The second has a thicker mucus layer and a smaller open space for air.',
  caption:'Compare the white openings. Thick secretions can narrow an airway and hinder airflow; the sections are schematic.'};
 const sickle={src:'/human-biology/f171-sickle-vessel.svg',width:280,height:335,compact:true,assessmentSensitive:true,
  alt:'A simplified small vessel with round red cells is compared with a vessel partly obstructed by rigid sickled red cells. The obstruction can reduce blood flow to nearby tissue. Sickled cells may also break down early, contributing to anaemia.',
  caption:'Compare the routes through the vessels. Rigid sickled cells can obstruct small vessels and reduce local blood flow; their early breakdown can also contribute to anaemia. The drawing is schematic.'};
 const iron={src:'/human-biology/iron-blood-oxygen.svg',width:280,height:280,compact:true,assessmentSensitive:true,
  alt:'Less available iron over time can reduce haemoglobin production. Less haemoglobin can reduce the oxygen-carrying capacity of blood.',
  caption:'Follow the link from available iron to haemoglobin and blood oxygen-carrying capacity. Other causes of anaemia are possible.'};
 lesson.explainDiagrams={...lesson.explainDiagrams,1:[airway],2:[sickle],3:[iron]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:sickle,1:[iron,airway]};
}());

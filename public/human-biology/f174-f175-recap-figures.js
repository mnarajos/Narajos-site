/* F174/F175 teaching and recap: original, schematic visual explanations.
 * OCR Human Biology specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS BMI: https://www.nhs.uk/health-assessment-tools/calculate-your-body-mass-index/calculate-bmi-for-adults
 * NHS IVF: https://www.nhs.uk/conditions/ivf/what-happens/
 * NHS ultrasound: https://www.nhs.uk/conditions/ultrasound-scan/
 * NHS infertility: https://www.nhs.uk/conditions/infertility/causes/
 * Illustrations are original; fictional numerical values and model examples are labelled.
 */
(function(){
 'use strict';
 function figure(name,height,alt,caption){return {src:'/human-biology/'+name+'.svg',width:280,height:height,compact:true,assessmentSensitive:true,alt:alt,caption:caption};}
 const nutrients=figure('f174-nutrient-roles',360,'Starch can supply glucose for respiration; protein provides amino acids for synthesis and may also supply energy; fat can be an energy store. These are examples, not exclusive functions.','Follow one example of each nutrient’s role. Protein can also supply energy; none of the listed roles is exclusive.');
 const iron=figure('iron-blood-oxygen',280,'A schematic chain shows less iron available over time, potentially reducing haemoglobin production and blood oxygen-carrying capacity.','Follow one example of a mineral’s function: iron is needed for haemoglobin production. Other nutrients have other roles.');
 const feedback=figure('f174-glucose-feedback',495,'High blood glucose stimulates insulin release, increasing uptake in some tissues and glycogen storage so blood glucose falls. Low blood glucose stimulates glucagon release, causing liver glycogen breakdown and glucose release so blood glucose rises. Both changes move toward the usual range.','Compare the two pancreatic signals and their opposing effects on blood glucose. These are simplified feedback pathways.');
 const bmi=figure('f174-bmi-composition',355,'Two hypothetical people of equal height and mass have the same BMI but different body composition. The comparison does not establish individual health.','Compare equal mass and height with different body composition. BMI alone does not measure fat or muscle.');
 const bmiCalculation=figure('f174-bmi-calculation',265,'A fictional mass of 70 kilograms and height of 1.75 metres give a BMI of approximately 22.9 kilograms per square metre: 70 divided by 1.75 squared. This alone is not a diagnosis.','First square height in metres, then divide mass in kilograms by that value. The example is fictional.');
 const villi=figure('f175-many-villi',330,'Several branching chorionic villi extend into maternal blood. Fetal vessels lie inside the villi, separated from maternal blood by a barrier. The many branches provide a large exchange surface.','Compare the many branching villi. Their surfaces provide a large area for exchange; the diagram is schematic.');
 const bypass=figure('f175-ivf-bypass',370,'In an IVF cycle sperm and oocyte are brought together outside the body. If an embryo develops it may be transferred into the uterus, bypassing the oviducts. Implantation is not guaranteed.','Follow the outside-body fertilisation attempt and, if an embryo develops, transfer into the uterus. This bypasses the oviducts; implantation is a later event.');
 const fertility=figure('f175-fertility-factors',320,'A schematic compares failure to release an oocyte with reduced sperm motility. Either may reduce the chance that gametes meet; these examples do not diagnose a cause in an individual.','Compare where each example affects the route to fertilisation. Other causes, including a blocked oviduct, are possible.');
 const journey=figure('f175-fertilisation-development',410,'A sperm and oocyte may meet in the oviduct. If fertilisation occurs, a zygote forms, divides during transport, becomes a blastocyst and may later implant in the uterine lining. The schematic is not to scale.','Follow the conditional sequence from fertilisation in an oviduct to a blastocyst that may implant in the uterus.');
 const hormones=figure('f175-fsh-lh',325,'FSH supports the growth of an ovarian follicle containing an oocyte. An LH surge normally triggers release of the secondary oocyte; the remaining follicle forms the corpus luteum.','Compare the developing follicle with the released oocyte. The LH surge normally triggers ovulation.');
 const gametes=figure('f175-oocyte-route',350,'A secondary oocyte is released from the ovary, passes toward the fimbriae and may be transported along the oviduct towards the uterus.','Locate the oviduct, where fertilisation usually occurs. Transport is assisted by cilia and contractions.');
 const placenta={...window.KeystoneHumanLessons['f175/a2'].teachingDiagram,assessmentSensitive:true};
 const ivf={...window.KeystoneHumanLessons['f175/a4'].teachingDiagram,assessmentSensitive:true};
 const obstruction=figure('f175-blocked-gamete-routes',315,'Schematic opposing sperm and oocyte routes are interrupted by an obstructed oviduct. In this fictional example both tubes are blocked. Gametes may still be produced but their chance of meeting is reduced.','Follow both gamete routes to the obstruction. The example represents blocked tubes, one possible cause of reduced fertility.');
 function addExplain(key, visual) {
  const lesson=window.KeystoneHumanLessons?.[key]; if(!lesson)return;
  lesson.explainDiagrams={...lesson.explainDiagrams,0:[...(lesson.explainDiagrams?.[0]||[]),{...visual,assessmentSensitive:true}]};
 }
 function addModel(key,index,visual) {
  const lesson=window.KeystoneHumanLessons?.[key]; if(!lesson)return;
  const prior=lesson.modelDiagrams?.[index];
  lesson.modelDiagrams={...lesson.modelDiagrams,[index]:[...(Array.isArray(prior)?prior:prior?[prior]:[]),{...visual,assessmentSensitive:true}]};
 }
 addExplain('f174/a1',nutrients);
 addExplain('f174/a4',bmiCalculation);
 addExplain('f175/a2',villi);
 addExplain('f175/a3',fertility);
 addModel('f175/a4',0,bypass);
 addModel('f175/a4',1,bypass);
 window.KeystoneF174F175RecapFigures={
  'f174/a1/0':[nutrients], 'f174/a1/1':[iron],
  'f174/a3/1':[feedback], 'f174/a3/2':[feedback],
  'f174/a4/0':[bmiCalculation,bmi], 'f174/a4/1':[bmi],
  'f175/2.1/0':window.KeystoneHumanLessons['f175/2.1'].explainDiagrams[0].map(item=>({...item,assessmentSensitive:true})),
  'f175/a1/0':[gametes], 'f175/a1/1':[journey], 'f175/a1/2':[hormones],
  'f175/a2/0':[placenta,villi],
  'f175/a2/2':[figure('f175-ultrasound-echo',330,'A probe sends sound pulses into the body. Some sound reflects at a tissue boundary and returns as echoes. The scanner uses echoes to form an image.','Follow the sound pulse to the boundary and its echo back to the probe. The scanner uses returning echoes to create an image; the diagram is simplified.')],
  'f175/a3/0':[obstruction], 'f175/a3/1':[{...window.KeystoneHumanLessons['f175/a3'].teachingDiagram,assessmentSensitive:true},fertility,obstruction], 'f175/a4/0':[ivf], 'f175/a4/1':[bypass], 'f175/a4/2':[ivf]
 };
})();

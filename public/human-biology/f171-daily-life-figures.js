/* F171 applied impact schematics; all examples are conditional, not prescriptions.
 * OCR Human Biology specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS motor neurone disease: https://www.nhs.uk/conditions/motor-neurone-disease/
 * NHS abdominal aortic aneurysm: https://www.nhs.uk/conditions/abdominal-aortic-aneurysm/
 * NHS Crohn's disease: https://www.nhs.uk/conditions/crohns-disease/
 * NHS kidney disease treatments: https://www.nhs.uk/conditions/kidney-disease/treatment/
 * Images are original teaching examples; no real person or schedule is represented.
 */
(function(){
 'use strict';
 function fig(file,height,alt,caption){return {src:'/human-biology/'+file+'.svg',width:280,height,compact:true,assessmentSensitive:true,alt,caption};}
 const grip=fig('f171-grip-fasteners',360,'Two fingertips approach a small button to suggest a fingertip grip. A larger loop attached to a zip pull offers a wider opening, which some people with grip difficulty may find easier to hold. The examples are schematic and not guaranteed to suit an individual.','Compare the small button with the larger loop. A different grip may help some people dress independently; needs and suitable aids vary.');
 const timing=fig('f171-care-activity-timeline',330,'Two bars for a planned school or work activity and a care visit or treatment overlap on a conceptual day. Overlap may require an adjustment to activities or care arrangements. No times, durations or particular treatment schedules are claimed.','Compare the overlapping plans. A care visit or treatment may require activity or travel arrangements to change; the example is illustrative and needs vary.');
 const measures=fig('f171-aorta-measurements',350,'A schematic scan view can show aortic diameter, while a cuff measures arterial pressure. These are different measurements; the diagram is not a patient scan.','Compare the measurements. Monitoring can involve different checks for aortic diameter and blood pressure; the image does not show a patient result.');
 const activity=fig('f171-activity-breathlessness',350,'A schematic person follows a route up steps, pauses during the activity, which can happen with breathlessness. This is one possible experience; symptoms and support needs vary.','Follow the activity to a possible pause. Breathlessness can interrupt a task; the picture does not identify its cause or prescribe activity.');
 const fatigueActivity=fig('f171-activity-breathlessness',350,'A schematic person follows a route up steps, pauses during the activity. Fatigue can restrict exercise for some people; experiences and support needs vary.','Follow an activity to one possible pause. Fatigue can restrict exercise, but the effect differs between people.');
 const journey=fig('f171-travel-urgency',355,'A hypothetical route from home to work includes a planned stop where a toilet is available. Urgent bowel movements may mean someone plans a route or allows extra time. Experiences vary and planning does not treat the underlying condition.','Follow the planned journey. Bowel urgency can affect timing or route choices for some people; this example is not a treatment.');
 const walking=fig('f171-walking-mechanisms',430,'Schematic examples show a disrupted nerve signal, inflammation restricting a joint and a weakened curved bone under load. Each may affect walking by a different route. The diagrams do not establish an individual diagnosis.','Compare the three possible mechanisms. Different nervous, joint or bone changes can contribute to walking difficulties; symptoms and support needs vary.');
 function add(key,index,items){const lesson=window.KeystoneHumanLessons?.['f171/1.2.1.'+key];if(!lesson)return;lesson.explainDiagrams={...lesson.explainDiagrams,[index]:[...(lesson.explainDiagrams?.[index]||[]),...items]};}
 window.KeystoneF171DailyLifeRecaps={
  'f171/1.2.1.movement/3':[grip],
  'f171/1.2.1.aorta/3':[measures,timing],
  'f171/1.2.1.airways/3':[activity],
  'f171/1.2.1.digestive/3':[journey],
  'f171/1.2.1.renal/3':[timing],
  'f171/1.2.1.oxygen/4':[fatigueActivity,timing],
  'f171/1.2.1.tissues/3':[walking]
 };
 add('movement',3,[grip]);add('aorta',3,[measures,timing]);add('airways',3,[activity]);add('digestive',3,[journey]);add('renal',3,[timing]);add('oxygen',4,[fatigueActivity,timing]);add('tissues',3,[walking]);
})();

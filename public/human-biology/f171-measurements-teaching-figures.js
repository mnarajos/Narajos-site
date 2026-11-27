/* Fictional measurement comparisons for OCR Human Biology F171/4.1.
 * Volume-time curves are constructed illustrative models, not patient tests.
 * References: https://www.nhs.uk/conditions/spirometry/
 * https://medlineplus.gov/lab-tests/pulse-oximetry/
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f171/4.1'];
  if (!lesson) return;
  const fig = (name,height,alt,caption) => ({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,alt,caption});
  const flow = fig('f171-expired-volume-time', 370,
    'Two fictional exhaled-volume curves start at zero. Both have the same steepest initial slope, representing the same maximum flow, but after one second curve A shows 1.5 litres and curve B one litre. The curves are mathematical examples, not patient measurements.',
    'Compare the heights at one second: they show different first-second volumes. Both curves have the same steepest initial slope in this illustrative model, so their maximum flows are equal.');
  const saturation = fig('f171-pulse-oximetry', 305,
    'A schematic clip on a fingertip shines light through tissue to a sensor. The instrument estimates arterial oxygen saturation: the percentage of haemoglobin carrying oxygen. It does not measure expiratory airflow.',
    'Locate the light source and sensor on opposite sides of the finger. The estimated oxygen saturation is a different measurement from exhaled volume or peak flow.');
  saturation.assessmentSensitive = true;
  const peak = fig('peak-flow-method', 330,
    'A schematic mouth seals around a peak-flow meter. A forceful outward blow moves the meter indicator; the highest acceptable reading is recorded after repeated blows.',
    'Follow the air through the meter. It records peak expiratory flow, a maximum rate; technique affects the reading.');
  lesson.explainDiagrams = {...lesson.explainDiagrams,3:[peak,saturation]};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:flow,1:[flow,peak],2:saturation};
}());

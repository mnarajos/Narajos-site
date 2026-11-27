/* F171 measurement and evidence recaps. Original ECG schematic; other images are existing original assets.
 * OCR Human Biology specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS ECG: https://www.nhs.uk/conditions/electrocardiogram/ ; NHS peak flow: https://www.nhs.uk/conditions/peak-flow-test/
 * NIAID immunodeficiency: https://www.niaid.nih.gov/diseases-conditions/primary-immune-deficiency-diseases
 * NHS blood pressure test: https://www.nhs.uk/conditions/blood-pressure-test/
 */
(function(){
 'use strict';
 function fig(file,height,alt,caption){return {src:'/human-biology/'+file+'.svg',width:280,height:height,compact:true,assessmentSensitive:true,alt:alt,caption:caption};}
 const ecg=fig('f171-ecg-electrical',355,'Skin electrodes connect to an ECG recorder that displays an illustrative electrical trace. The graph is schematic and not a patient record or a direct measure of blood flow.','Follow the electrodes to the recorder. An ECG records electrical activity associated with heartbeats; this trace is schematic.');
 const peak=fig('peak-flow-method',330,'A person seals their lips around a peak-flow meter and blows out hard after breathing in. The indicator moves along a scale. Repeating acceptable blows helps identify the highest reading.','Follow the outward blow through the meter. Peak flow is the maximum expiratory airflow achieved during the blow.');
 const pressure=fig('f175-baseline-pressure',335,'A cuff is wrapped around an arm. A first blood-pressure measurement is plotted as a single point; a later value is unknown. The diagram is schematic and no patient readings are shown.','Locate the cuff on the arm. It is used to measure arterial pressure; a single reading does not establish a trend.');
 const immuneOrigins=fig('f171-immunodeficiency-origins',380,'A primary immunodeficiency can arise from an inherited or developmental difference and may be recognised at different ages. An acquired immunodeficiency develops later, for example after certain infections or treatments. The time line is conceptual.','Compare the different origins. Primary conditions can be recognised later in life; acquired conditions can develop at different ages.');
 const screen=fig('f171-screen-mismatches',300,'A two-by-two table compares a positive or negative screen with a later independent assessment. A positive screen can occur when the condition is absent, and a negative screen can miss a condition.','Read the screen and later assessment together. A positive screen may need follow-up and does not alone establish a diagnosis.');
 const bars=fig('f171-sleep-study-bars',280,'In a fictional four-week study, one group reports an average gain of 35 minutes of nightly sleep and a comparison group 15 minutes. The observed difference is 20 minutes; the values alone do not establish its cause.','Read the reported group means and their difference. These are fictional observations, not proof of a cause.');
 const confound=fig('f171-sleep-study-confounding',320,'In a fictional example, motivation could affect both the choice to attend a sleep workshop and changes to sleep routine. Both may relate to reported sleep. Arrows show possible influences, not established causes.','Follow one possible alternative explanation for the association. The arrows show plausible influences, not established causes in the example.');
 window.KeystoneF171MeasureEvidenceRecaps={
  'f171/3.2.1/1':[immuneOrigins], 'f171/a4/1':[ecg,peak,pressure], 'f171/a4/2':[screen], 'f171/a5/1':[bars,confound]
 };
})();

/* F176 nervous-system investigation schematics; no patient images or traces.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS EEG: https://www.nhs.uk/conditions/electroencephalogram/
 * NHS MRI: https://www.nhs.uk/conditions/mri-scan/
 * NHS CT: https://www.nhs.uk/conditions/ct-scan/
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f176/a5'];if(!lesson)return;
 const eeg={src:'/human-biology/f176-eeg-trace.svg',width:280,height:325,compact:true,assessmentSensitive:true,
  alt:'A schematic head has electrodes on the scalp. They connect to a graph of changing electrical activity against time. The waveform is illustrative and is not a patient recording.',
  caption:'Follow the electrodes to the time-varying trace. EEG records electrical activity at the scalp; this waveform is illustrative, not a patient recording.'};
 const scans={src:'/human-biology/f176-mri-ct.svg',width:280,height:365,compact:true,assessmentSensitive:true,
  alt:'A comparison shows a person in an MRI scanner using magnetic fields and radio waves, and a person in a CT scanner using X-rays. Both can produce anatomical images; structural MRI usually provides more soft-tissue detail for the stated lesson question. The scanner drawings are schematic.',
  caption:'Compare the methods used to obtain structural images. MRI uses magnetic fields and radio waves; CT uses X-rays. The icons are not patient scans.'};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[eeg,scans]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:eeg,1:scans};
}());

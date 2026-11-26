/* F175 antenatal-evidence comparisons; schematic, not patient images.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS antenatal appointments: https://www.nhs.uk/pregnancy/your-pregnancy-care/your-antenatal-appointments/
 * NHS ultrasound scans: https://www.nhs.uk/pregnancy/your-pregnancy-care/ultrasound-scans/
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f175/2.1'];if(!lesson)return;
 const compare={src:'/human-biology/f175-history-ultrasound.svg',width:280,height:360,compact:true,assessmentSensitive:true,
  alt:'A schematic compares a booking history, which gives context about previous pregnancies and health, with an ultrasound display and a measurement of the current fetus interpreted with gestational age. Neither icon is an actual patient record or scan.',
  caption:'Compare the evidence each source supplies. A history gives background; a scan measurement describes the current fetus and needs gestational context. The drawings are schematic.'};
 const baseline={src:'/human-biology/f175-baseline-pressure.svg',width:280,height:335,compact:true,
  alt:'A schematic blood-pressure cuff leads to one recorded reading on a graph. A later position is marked with a question mark, not a data point. A single baseline does not establish a trend.',
  caption:'Locate the single recorded point. A baseline gives a starting value; a later comparable measurement is needed before describing change. No numerical readings are shown.'};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[compare,baseline],1:[compare]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:compare,1:baseline,2:compare};
}());

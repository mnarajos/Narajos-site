/* F171 short-recap figures: screening outcomes and treatment reach.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NCI screening: https://www.cancer.gov/about-cancer/screening/patient-screening-overview-pdq
 * NCI local/systemic: https://www.cancer.gov/publications/dictionaries/cancer-terms/def/systemic-therapy
 * These are teaching schematics rather than diagnostic or treatment advice.
 */
(function () {
 'use strict';
 const screen={src:'/human-biology/f171-screen-mismatches.svg',width:280,height:300,compact:true,
  alt:'A two-by-two table compares a positive or negative screen with an independent assessment finding the condition present or absent. A positive screen with the condition absent is a false positive; a negative screen with the condition present is a false negative. The other two combinations are true results.',
  caption:'Read the screen row and assessment column together. A false positive can prompt unnecessary follow-up; a false negative misses a condition that is present.'};
 const treatment={src:'/human-biology/f171-local-systemic.svg',width:280,height:405,compact:true,
  alt:'Two schematic views show the same three fictional disease sites. Surgery is directed to one site, while a systemic medicine enters the blood and can reach cells at several sites. Reaching a site does not guarantee treatment response; the sites and vessels are schematic.',
  caption:'Compare reach: surgery acts at the operated site, while a systemic medicine can travel in blood to several sites. Response, adverse effects and recovery also influence treatment decisions.'};
 window.HumanF171ScreenTreatmentRecapFigures={
  'f171/2.3/1':[screen], 'f171/4.2.1/1':[screen], 'f171/2.1/1':[treatment]
 };
}());

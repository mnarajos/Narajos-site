/* F171 bacterial examples: routes and evidence are schematic, not diagnosis.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS Lyme disease: https://www.nhs.uk/conditions/lyme-disease/
 * NHS MRSA: https://www.nhs.uk/conditions/mrsa/
 * NHS tuberculosis: https://www.nhs.uk/conditions/tuberculosis-tb/
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/1.3.1.bacteria'];if(!lesson)return;
 const fig=(name,height,alt,caption,sensitive=false)=>({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,assessmentSensitive:sensitive,alt,caption});
 const tick=fig('f171-tick-bacterium',335,
  'A schematic tick is attached to skin. A separate enlarged spiral represents Borrelia bacteria. An infected tick can transfer the bacterium through a bite; the tick is the vector, not the bacterial cause. Not every tick carries it.',
  'Separate the vector from the pathogen: an infected tick can transmit Borrelia through a bite. The shapes are schematic and not at a common scale.');
 const contact=fig('f171-mrsa-contact',305,
  'A schematic hand can transfer bacteria through contact with a skin break. Hand hygiene and wound care can reduce contact transmission. A positive skin screen can reflect carriage without illness; a wound finding alone cannot identify antibiotic resistance.',
  'Follow the possible contact route from a hand to a break in skin. Hand hygiene and wound care reduce risk; carriage can occur without illness.',true);
 const tb=fig('f171-tb-ventilation',305,
  'A schematic person breathes infectious respiratory particles into indoor air, and an open window allows air exchange. Ventilation can reduce airborne exposure to infectious pulmonary TB; latent TB infection does not spread to others.',
  'Follow the particles into the shared air and towards the opening. Ventilation can reduce airborne exposure; latent TB is not infectious. This is schematic.');
 const rash={src:'/assets/micrographs/hb-lyme-erythema.webp',width:640,height:952,
  alt:'A real photograph of an upper arm shows a broad reddish rash with a darker centre and paler ring. This is one appearance of erythema migrans.',
  caption:'Notice one example of an expanding erythema migrans rash. Its appearance varies, some people do not notice a rash, and other conditions can look similar.',
  source:'https://phil.cdc.gov/Details.aspx?pid=9875',credit:'James Gathany / CDC, PHIL 9875',
  licence:'Public domain (US federal work)',licenceUrl:'https://commons.wikimedia.org/wiki/Template:PD-USGov-HHS-CDC',
  changes:'Resized; no crop'};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[tick]};
 lesson.comparisonFigures={...lesson.comparisonFigures,0:[tick],1:[contact],2:[tb]};
 lesson.comparisonPhotos={...lesson.comparisonPhotos,0:[rash]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:tick,1:tick};
 lesson.modelPhotos={...lesson.modelPhotos,1:[rash]};
}());

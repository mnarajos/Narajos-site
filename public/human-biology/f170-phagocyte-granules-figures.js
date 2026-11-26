/* Original simplified neutrophil phagocytosis model; structures not to scale.
 * OCR Human Biology F170 §1.1.1: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * https://www.ncbi.nlm.nih.gov/books/NBK26820/ (phagosome and lysosome fusion)
 * Granules deliver multiple antimicrobial contents; digestion is one component of defence.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f170/1.1.1'];
 if(!lesson)return;
 const fig={src:'/human-biology/f170-phagocyte-granules.svg',width:280,height:382,compact:true,assessmentSensitive:true,
  alt:'A schematic phagocyte has enclosed a particle in a membrane-bound phagosome. A granule fuses with that compartment and delivers contents; the next panel shows illustrative particle fragments inside.',
  caption:'Follow the granule to the enclosed particle. Fusion delivers digestive contents into the compartment, where they can help break down the material. Other antimicrobial mechanisms also contribute.'};
 lesson.comparisonDiagrams=[...(lesson.comparisonDiagrams||[]),fig];
}());

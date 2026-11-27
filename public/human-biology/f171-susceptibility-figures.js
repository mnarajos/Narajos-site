/* F171 MRSA comparison: one conceptual disc-diffusion measurement.
 * EUCAST standard methods: https://www.eucast.org/bacteria/methodology-and-instructions/disk-diffusion-and-quality-control/
 * WHO disk diffusion guide: https://iris.who.int/bitstream/handle/10665/68554/WHO_CDS_CSR_RMD_2003.6.pdf
 * No numerical zone, susceptibility conclusion or patient result is invented.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/1.3.1.bacteria'];if(!lesson)return;
 const test={src:'/human-biology/f171-susceptibility-test.svg',width:280,height:315,compact:true,assessmentSensitive:true,
  alt:'A schematic agar plate has bacterial growth and one antibiotic disc. A clear zone around the disc indicates inhibited visible growth. A diameter across the zone is interpreted using laboratory standards appropriate to the organism, antibiotic and method. No measured result or resistance conclusion is shown.',
  caption:'Follow one possible laboratory test: measure the diameter of the clear zone and interpret it using the correct standard. A wound’s appearance alone cannot show antibiotic resistance; a diagram without a measured result cannot establish it either.'};
 lesson.comparisonFigures={...lesson.comparisonFigures,1:[...(lesson.comparisonFigures?.[1]||[]),test]};
}());

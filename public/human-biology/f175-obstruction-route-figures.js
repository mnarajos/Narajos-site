/* F175 fertility example: simplified gamete paths on opposite sides of a blockage.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NHS discussion: https://www.nhs.uk/conditions/infertility/treatment/
 * Both tubes are obstructed in the fictional example; one is drawn.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f175/a3'];if(!lesson)return;
 const route={src:'/human-biology/f175-blocked-gamete-routes.svg',width:280,height:315,compact:true,assessmentSensitive:true,
  alt:'A schematic one-sided view shows an oocyte approaching an oviduct blockage from the ovarian side and sperm approaching from the uterine side. Arrows stop at the block. The fictional example specifies both tubes are obstructed; gamete production may continue, but the chance of meeting is reduced.',
  caption:'Follow the two routes towards the block. In this fictional example both tubes are obstructed, which reduces the chance of gametes meeting. Production of sperm and oocytes may still occur. One side is shown; the sketch is not to scale.'};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:route,1:route};
}());

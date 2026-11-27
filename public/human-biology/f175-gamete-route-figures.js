/* F175 gamete routes: original schematic and existing F170 pathway.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Oviduct anatomy and transport: https://www.ncbi.nlm.nih.gov/books/NBK547660/
 * Schematics show routes, not an anatomical section or patient data.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f175/a1'];if(!lesson)return;
 const sperm={src:'/human-biology/f170-sperm-route.svg',width:280,height:400,compact:true,
  alt:'A simplified pathway follows sperm from the testis to the epididymis, vas deferens and urethra. Seminal vesicle and prostate secretions join the route. The layout is not a body section or to scale.',
  caption:'Follow sperm from the epididymis along the vas deferens towards the urethra. Secretions added by accessory glands contribute to semen.'};
 const oocyte={src:'/human-biology/f175-oocyte-route.svg',width:280,height:350,compact:true,assessmentSensitive:true,
  alt:'A simplified pathway shows a secondary oocyte released from an ovary crossing a gap towards fimbriae at the opening of an oviduct. Cilia and muscular contractions help move it along the oviduct towards the uterus. The layout is not a body section or to scale.',
  caption:'Follow the released oocyte across the gap towards the fimbriae, then along the oviduct. Cilia and muscular contractions help its movement. This schematic is not to scale.'};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[sperm],1:[oocyte]};
}());

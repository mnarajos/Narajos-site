/* Original one-pair chromosome models; R/r track a locus unaffected by crossing over.
 * OCR AAQ Human Biology specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Meiosis and mitosis: https://openstax.org/books/biology-2e/pages/11-1-the-process-of-meiosis
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f172/a1'];if(!lesson)return;
 const meiosis={src:'/human-biology/f172-meiosis-alleles.svg',width:280,height:400,compact:true,assessmentSensitive:true,
  alt:'One duplicated homologous pair carries R and r. Meiosis I separates the homologues, leaving sisters joined. Meiosis II separates sisters, yielding two R and two r nuclei. Crossing over is omitted at this locus.',
  caption:'Follow the homologues into separate nuclei, then the sisters into four products. This model tracks one locus unaffected by crossing over.'};
 const mitosis={src:'/human-biology/f172-mitosis-alleles.svg',width:280,height:320,compact:true,assessmentSensitive:true,
  alt:'One duplicated homologous pair carries R and r. Sister chromatids separate in mitosis, and each of two daughter nuclei receives one R chromosome and one r chromosome.',
  caption:'Compare the two daughter nuclei: each receives both R and r in this simplified example. The X shapes represent joined sisters before division.'};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:lesson.teachingDiagram,1:meiosis,2:mitosis};
}());

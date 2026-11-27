/* Stage-adjacent schematics supplement the F175 interactive model.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Oviduct anatomy and transport: https://www.ncbi.nlm.nih.gov/books/NBK547660/
 * Fertilisation and implantation: https://medlineplus.gov/ency/article/002398.htm
 * Shapes and positions are schematic and do not predict an individual outcome.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f175/a1'];if(!lesson)return;
 const fig=(name,height,alt,caption)=>({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,assessmentSensitive:true,alt,caption});
 const follicle=fig('f175-fsh-lh',325,'FSH supports growth of an ovarian follicle containing an oocyte. An LH surge normally triggers release of the secondary oocyte; the remaining follicle forms the corpus luteum. This is a simplified sequence.','Locate the oocyte inside the follicle as it develops. The later LH surge normally triggers ovulation; the remaining follicle forms the corpus luteum.');
 const ovulation=fig('f175-oocyte-route',350,'A secondary oocyte leaves an ovary and crosses a gap towards fimbriae at the oviduct opening. Cilia and muscular contractions help move it along the oviduct. The pathway is schematic.','Follow the released oocyte across the gap towards the oviduct. Cilia and contractions assist transport.');
 const meeting=fig('f175-gamete-meeting',405,'Two schematic views compare gametes in the same or different oviducts. A sperm and oocyte in the ampulla of the same oviduct may meet; if they are in different oviducts they cannot meet at those locations. Symbols show positions, not actual cell size, and fusion is not guaranteed.','Compare the labelled S and O positions. Being in the same oviduct can allow meeting; being in different oviducts prevents meeting at those locations. Fusion is not guaranteed.');
 const development=fig('f175-fertilisation-development',410,'In a simplified example sperm and oocyte may meet in an oviduct. If fertilisation occurs, a zygote forms, divides during transport and develops into a blastocyst, which may later implant in the uterine lining. Stages are not to scale.','Follow the conditional sequence: fertilisation can form a zygote, cleavage occurs during transport, and a blastocyst may later implant in the endometrium.');
 lesson.modelDiagrams={...lesson.modelDiagrams,0:follicle,1:[follicle,ovulation],2:meeting,3:development};
}());

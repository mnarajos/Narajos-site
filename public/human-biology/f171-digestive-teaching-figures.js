/* Original F171 digestive-structure teaching schematics.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NIDDK Crohn's disease: https://www.niddk.nih.gov/health-information/digestive-diseases/crohns-disease
 * NIDDK GER and GERD: https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults
 * Disease distribution and effects vary; the examples are schematic, not clinical images.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/1.2.1.digestive'];
 if(!lesson)return;
 const uptake={src:'/human-biology/f171-intestinal-absorption.svg',width:280,height:390,compact:true,assessmentSensitive:true,
  alt:'A simplified comparison shows nutrients crossing a section of intestinal lining into blood. If extensive small-intestinal inflammation impairs absorption, fewer nutrients may enter the blood despite similar intake. The arrows are illustrative, not measurements.',
  caption:'Follow nutrients across the lining. If sufficient absorptive intestine is inflamed, uptake can fall despite similar intake; the arrows are illustrative rather than measured amounts.'};
 const hiatus={src:'/human-biology/f171-hiatus-position.svg',width:280,height:410,compact:true,
  alt:'Two schematic side views show the oesophagus joining the stomach below the diaphragm in the usual position and above the diaphragm in a sliding hiatus hernia. A dot marks the junction in each view. Some acidic stomach contents can reflux upwards into the oesophagus when the barrier is weakened.',
  caption:'Locate the dot marking the stomach–oesophagus junction relative to the dashed diaphragm. In a sliding hernia, the raised junction can weaken the barrier to reflux; symptoms are not inevitable.'};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[uptake,hiatus],1:[uptake],2:[hiatus]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:hiatus,1:[hiatus,uptake]};
}());

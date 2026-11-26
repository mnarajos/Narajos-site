/* F171 parasite routes and evidence; schematics, not diagnostic images.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * CDC Fasciola: https://www.cdc.gov/liver-flukes/fasciola/
 * CDC cystic echinococcosis: https://www.cdc.gov/echinococcosis/about/about-cystic-echinococcosis-ce.html
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/1.3.1.worms'];if(!lesson)return;
 const fig=(name,height,alt,caption,sensitive=false)=>({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,assessmentSensitive:sensitive,alt,caption});
 const fluke=fig('f171-fluke-ingestion',305,
  'A schematic shows a freshwater plant carrying liver-fluke larvae, followed by ingestion of the raw contaminated plant. Eating contaminated raw freshwater plants can transmit Fasciola; not every plant is contaminated.',
  'Follow the possible route from contaminated freshwater plants to ingestion. Avoiding uncooked aquatic plants from unsafe sources can reduce risk; the symbols are schematic.');
 const hydatid=fig('f171-hydatid-ingestion',335,
  'A schematic shows eggs from infected dog faeces contaminating a hand and potentially reaching the mouth before eating. Handwashing interrupts this possible route; not every dog carries the parasite.',
  'Follow the possible hand-to-mouth route from infected dog faeces. Handwashing before eating reduces the chance of swallowing eggs; contact alone does not establish infection.',true);
 const cyst=fig('f171-cyst-evidence',300,
  'A schematic scan display shows a circular cyst in an outline of the liver. The image is structural evidence; a cyst alone does not identify a parasite or establish its cause.',
  'Locate the cyst on this fictional scan schematic. It shows a structural change, but its appearance alone does not identify the organism or cause.');
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[fluke,hydatid]};
 lesson.comparisonFigures={...lesson.comparisonFigures,0:[fluke],1:[hydatid,cyst]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:cyst,1:hydatid};
}());

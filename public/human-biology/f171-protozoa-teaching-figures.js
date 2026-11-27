/* F171 protozoan transmission and blood evidence.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * CDC malaria transmission: https://www.cdc.gov/malaria/causes/index.html
 * CDC toxoplasmosis: https://www.cdc.gov/toxoplasmosis/causes/index.html
 * Micrograph licence/source: https://commons.wikimedia.org/wiki/File:Plasmodium_falciparum_in_Red_Blood_Cells.jpg
 * The models are illustrative and do not diagnose an individual.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/1.3.1.protozoa'];if(!lesson)return;
 const fig=(name,height,alt,caption)=>({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,assessmentSensitive:true,alt,caption});
 const vector=fig('f171-malaria-vector',325,
  'A schematic infected female Anopheles mosquito bites skin and can transmit a Plasmodium parasite. The mosquito is the vector; the parasite is the cause. The symbols are not drawn to the same scale.',
  'Separate the vector from the pathogen. An infected female Anopheles mosquito can transmit Plasmodium through a bite; the symbols are schematic.');
 const cells=fig('f171-malaria-blood-cells',300,
  'A conceptual comparison shows more and fewer red blood cells after red-cell loss. Malaria can damage and destroy red cells, contributing to anaemia and reducing oxygen-carrying capacity. Symbols do not represent measured cell counts.',
  'Compare the red-cell symbols. Their loss can reduce the haemoglobin available to carry oxygen; the numbers are illustrative, not blood-test results.');
 const toxo=fig('f171-toxoplasma-routes',345,
  'A schematic shows undercooked infected meat and soil contaminated by cat faeces as two possible routes by which Toxoplasma can be swallowed. Contact with a cat alone does not establish infection.',
  'Follow the two possible ingestion routes. Thorough cooking and handwashing after soil contact can reduce risk; contact with a cat alone does not establish infection.');
 const micro={src:'/assets/micrographs/hb-plasmodium-rings.webp',width:680,height:474,assessmentSensitive:true,
  alt:'An optical micrograph of human red blood cells shows purple ring-stage Plasmodium falciparum parasites inside some cells.',
  caption:'Locate the purple ring forms inside some red cells. This is one blood-film example; identifying parasites requires training, and the source supplies no scale bar.',
  source:'https://commons.wikimedia.org/wiki/File:Plasmodium_falciparum_in_Red_Blood_Cells.jpg',credit:'Ernst Hempelmann / Wikimedia Commons',
  licence:'Public domain (author release)',licenceUrl:'https://commons.wikimedia.org/wiki/Template:PD-author',changes:'Resized; no crop'};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[vector]};
 lesson.comparisonFigures={...lesson.comparisonFigures,0:[vector,cells],1:[toxo]};
 lesson.comparisonPhotos={...lesson.comparisonPhotos,0:[micro]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:cells,1:vector};
 lesson.modelPhotos={...lesson.modelPhotos,1:[micro]};
}());

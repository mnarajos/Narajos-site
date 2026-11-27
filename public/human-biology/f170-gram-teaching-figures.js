/* Original Gram-envelope and staining models plus a credited CC0 micrograph.
 * OCR Human Biology F170 4.1.1:
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Staining procedure cross-check: https://reach.cdc.gov/sites/default/files/job-aids-resources/Gram_Stain_Procedure_Branded_508.pdf
 * The schematics show typical results; technique and organism can affect an observation.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f170/4.1.1'];
  if (!lesson) return;
  const figure = (file,height,alt,caption) => ({src:'/human-biology/'+file+'.svg',width:280,height,compact:true,alt,caption});
  const envelope = figure('f170-gram-envelope',390,
    'A typical Gram-positive envelope has one cell membrane and a thick peptidoglycan wall. A typical Gram-negative envelope has a thin peptidoglycan layer between an inner and an outer membrane.',
    'Trace from cytoplasm outwards in each model. Compare wall thickness and the number and position of membranes; spacing is exaggerated.');
  const staining = figure('f170-gram-stain-sequence',500,
    'Schematic rods in both groups are purple after crystal violet and iodine. After decolourisation the positive rod remains purple and the negative rod is colourless. After counterstaining the negative rod is pink, while the positive remains purple.',
    'Follow both columns through decolourisation and counterstaining. These are typical outcomes; cells of either Gram class can have different shapes.');
  const photo = {
    src:'/assets/micrographs/hb-gram-comparison.webp',width:313,height:165,
    alt:'Source-labelled Gram-stained examples: a purple Gram-positive coccus at left and a pinkish Gram-negative rod at right, with a one-micrometre scale bar.',
    caption:'Compare the purple Gram-positive coccus on the left with the pinkish Gram-negative rod on the right. Shape does not determine Gram class. The source shows a 1 µm bar; do not assume both views share its scale.',
    source:'https://commons.wikimedia.org/wiki/File:Gram_positive_coccus_and_gram_negative_rod.png',
    credit:'Mikael Häggström',licence:'CC0 1.0',licenceUrl:'https://creativecommons.org/publicdomain/zero/1.0/',
    changes:'Full source image converted losslessly to WebP; labels and scale bar retained.'
  };
  lesson.explainPhotos = {...lesson.explainPhotos,1:[photo]};
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[envelope],1:[staining]};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:envelope,1:[envelope,staining]};
}());

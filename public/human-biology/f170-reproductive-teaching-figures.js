/* Human Biology F170 reproductive tissue and gamete support.
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * https://openstax.org/books/anatomy-and-physiology-2e/pages/27-1-anatomy-and-physiology-of-the-testicular-reproductive-system
 * https://openstax.org/books/anatomy-and-physiology/pages/28-1-fertilization
 * https://www.ncbi.nlm.nih.gov/sites/books/NBK278951/
 * https://www.ncbi.nlm.nih.gov/sites/books/NBK553142/
 * Source pages, creators, individual licences and adaptations for the micrographs are
 * recorded in their descriptors. Schematics are not to scale.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f170/3.3.1'];
  if (!lesson) return;
  const uterine = {...lesson.photo,
    caption:'Notice the upper free surface and the pale gland profiles beneath it. This H&E-stained proliferative endometrium has benign focal gland tortuosity.',
    changes:'Full image resized and converted to WebP.'};
  const ovarian = {
    src:'/assets/micrographs/hb-follicle-teaching.webp',width:1000,height:568,
    alt:'Human primary ovarian follicle showing a large oocyte at the centre surrounded by smaller follicle cells.',
    caption:'Locate the large central oocyte and compare it with the smaller surrounding cells. This human primary follicle is stained with H&E.',
    source:'https://commons.wikimedia.org/wiki/File:Human_ovarian_follicle.jpg',
    credit:'Jpogi',licence:'Public domain',licenceUrl:'https://commons.wikimedia.org/wiki/File:Human_ovarian_follicle.jpg#Licensing',
    changes:'Commons file is a cropped, pointer-removed version; the full file was resized and converted to WebP.'
  };
  const testis = {
    src:'/assets/micrographs/hb-tubule-teaching.webp',width:1000,height:875,
    alt:'H&E-stained testis biopsy showing several seminiferous tubule profiles with layers of cells around paler interiors.',
    caption:'Compare the repeated tubule profiles and the layers of cells around their paler interiors. This H&E-stained biopsy shows normal spermatogenesis.',
    source:'https://commons.wikimedia.org/wiki/File:Normal_spermatogenesis,_intermed._mag.jpg',
    credit:'CoRus13',licence:'CC BY-SA 4.0',licenceUrl:'https://creativecommons.org/licenses/by-sa/4.0/',
    changes:'Left-middle field cropped, resized and converted to WebP.'
  };
  const figure = (file,height,alt,caption) => ({src:'/human-biology/'+file+'.svg',width:280,height,compact:true,alt,caption});
  const patterns = figure('f170-reproductive-tissue-patterns',550,
    'Schematic sections compare endometrial gland profiles below a free surface, a large oocyte with smaller follicle cells, and layers of cells around a seminiferous-tubule lumen.',
    'Compare the position of the surface, large cell or lumen. These are simplified patterns, not scale-matched sections; stains can change colour.');
  const sperm = figure('f170-sperm-structure',365,
    'A sperm cell has an acrosome and nucleus in its head, mitochondria in its midpiece and a long flagellum.',
    'Locate the acrosome at the head and mitochondria in the midpiece. The flagellum propels the cell; mitochondria supply some of the ATP.');
  const oocyte = figure('f170-oocyte-structure',335,
    'An oocyte has a large cytoplasm and cortical granules just inside the cell membrane, surrounded by the zona pellucida.',
    'Locate the large cytoplasm and cortical granules. After sperm entry, released material changes the zona pellucida and helps prevent another sperm entering. Arrows show release; the diagram is not to scale.');
  lesson.photo = null;
  lesson.explainPhotos = {...lesson.explainPhotos,0:[uterine,ovarian,testis]};
  lesson.explainDiagrams = {...lesson.explainDiagrams,1:[patterns]};
  lesson.comparisonFigures = {...lesson.comparisonFigures,0:[sperm],1:[oocyte]};
  lesson.modelPhotos = {...lesson.modelPhotos,0:uterine,1:uterine};
  lesson.modelDiagrams = {...lesson.modelDiagrams,2:patterns};
}());

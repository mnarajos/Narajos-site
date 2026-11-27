/* Original mitosis models and a sourced human chromosome micrograph.
 * OCR Human Biology specification F170 1.1.5:
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * https://openstax.org/books/biology-2e/pages/10-2-the-cell-cycle
 * Chromosome counts and stage drawings are simplified model cells, not measurements.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f170/1.1.5'];
  if (!lesson) return;
  const figure = (file,height,alt,caption) => ({src:'/human-biology/'+file+'.svg',width:280,height,compact:true,alt,caption});
  const sisters = figure('f170-sister-chromatids',335,
    'One replicated chromosome consists of two sister chromatids joined around the centromere region. Each chromatid runs from one tip through the centromere region to its other tip.',
    'Trace each coloured sister from one end to the other. The short and long arms on one side belong to the same chromatid; the drawing is schematic.');
  const counts = figure('f170-mitosis-count',415,
    'A model cell with four unduplicated chromosomes has four DNA molecules. After S phase the four chromosomes have eight DNA molecules. After mitosis and cytokinesis, each daughter cell has four chromosomes and four DNA molecules.',
    'Count chromosomes before and after S phase, then compare each daughter cell. An X represents one duplicated chromosome with two DNA molecules; the model uses four chromosomes.');
  const stages = figure('f170-mitosis-stages',600,
    'In a model cell with two duplicated chromosomes, chromosomes condense in prophase, align at the equator in metaphase, sister chromatids separate in anaphase and two nuclei re-form in telophase.',
    'Follow the same two chromosomes through the stages. Spindle fibres attach after the nuclear envelope breaks down; each separated chromatid is now a daughter chromosome.');
  const cytokinesis = figure('f170-cytokinesis',355,
    'In an animal cell a cleavage furrow forms between two nuclei. In a plant cell a cell plate forms between the nuclei, dividing the cytoplasm.',
    'Compare the narrowing animal-cell surface with the forming plant cell plate. Cytokinesis separates cytoplasm and can overlap nuclear division.');
  lesson.explainPhotos = {...lesson.explainPhotos, 0:[{
    src:'/assets/micrographs/hb-sister-chromatid.webp', width:512, height:381,
    alt:'Microscopy image of human metaphase chromosomes, with an outlined chromosome enlarged at right. Arrows mark sister chromatids; white scale bars appear at the bottom.',
    caption:'Find the boxed chromosome on the left and its enlarged view on the right. The arrows mark sister chromatids; their full boundaries are not sharply resolved. The creator identifies the scale bars as 1 µm.',
    source:'https://commons.wikimedia.org/wiki/File:SisterChromatid1.png', credit:'Ascendinglotus2',
    licence:'CC BY-SA 3.0', licenceUrl:'https://creativecommons.org/licenses/by-sa/3.0/',
    changes:'Full image converted losslessly to WebP; both scale bars retained.'
  }]};
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[sisters,counts],1:[stages],2:[cytokinesis]};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:sisters,1:sisters,2:counts};
}());

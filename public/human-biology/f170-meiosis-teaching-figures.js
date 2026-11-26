/* Original simplified meiosis models; OCR Human Biology F170 1.1.5:
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * https://openstax.org/books/biology-2e/pages/11-1-the-process-of-meiosis
 * One maternal/paternal pair is long and one is short; colours distinguish models,
 * not the appearance of chromosomes under a microscope.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f170/1.1.5.meiosis'];
  if (!lesson) return;
  const figure = (file,height,alt,caption) => ({src:'/human-biology/'+file+'.svg',width:280,height,compact:true,alt,caption});
  const crossing = figure('f170-crossing-over',440,
    'Two duplicated homologous chromosomes carry the same gene positions but different alleles. Corresponding segments are exchanged between non-sister chromatids, changing the allele combinations from AB and ab to include Ab and aB.',
    'Follow the two inner, non-sister chromatids through the exchange. Gene positions match; the exchanged segments can create new allele combinations. The drawing is schematic.');
  const copying = figure('f170-meiosis-copying',250,
    'A model cell begins with two long and two short homologous chromosomes, four DNA molecules in total. After S phase the same four chromosomes each contain two sister chromatids, giving eight DNA molecules.',
    'Compare the counts before and after S phase. An X is one duplicated chromosome containing two DNA molecules; the long and short pairs are drawn schematically.');
  const first = figure('f170-meiosis-first-division',355,
    'In a model cell, a long homologous pair and a short homologous pair align at the equator. Homologues separate while sister chromatids remain joined, leaving each nucleus with one long and one short duplicated chromosome.',
    'Follow one long and one short homologue to each pole. Sisters remain together through division I; each resulting nucleus has two duplicated chromosomes.');
  const orientation = figure('f170-meiosis-orientation',395,
    'Two possible alignments of long and short homologous pairs are shown. The long pair faces the same way in both; the short pair reverses independently, giving different maternal and paternal combinations at each pole.',
    'Compare the two alignments. Reversing the short pair changes which maternal and paternal homologues move to a pole. Crossing over is omitted here; this is one of several possible orientations.');
  const second = figure('f170-meiosis-second-division',330,
    'Two nuclei each start with one long and one short duplicated chromosome. Sister chromatids separate in meiosis II, giving four nuclei each containing one long and one short unduplicated chromosome.',
    'Follow the sisters from the two nuclei to the four products. No DNA replication occurs between divisions I and II; each resulting chromosome has one DNA molecule.');
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[crossing],1:[first,orientation],2:[second]};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:copying,1:[first,orientation],2:second};
}());

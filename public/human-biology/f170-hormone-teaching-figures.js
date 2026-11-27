/* Original teaching diagrams for OCR Human Biology F170 3.3.2.
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * https://openstax.org/books/anatomy-and-physiology-2e/pages/27-1-anatomy-and-physiology-of-the-testicular-reproductive-system
 * https://openstax.org/books/anatomy-and-physiology-2e/pages/27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system
 * Sequences are schematic; feedback interactions are omitted from these figures.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f170/3.3.2'];
  if (!lesson) return;
  const figure = (file,height,alt,caption) => ({src:'/human-biology/'+file+'.svg',width:280,height,compact:true,alt,caption});
  const ovarian = figure('f170-ovarian-hormones',555,
    'The anterior pituitary releases FSH and LH into blood. FSH supports follicle development; an LH surge triggers ovulation. The remaining follicular tissue forms the corpus luteum, which produces progesterone that helps maintain the uterine lining.',
    'Follow the follicle through ovulation to the corpus luteum. FSH and LH are separate pituitary signals carried in blood; arrows between pictures show the ovarian sequence.');
  const testicular = figure('f170-testicular-hormones',390,
    'FSH from the anterior pituitary acts on Sertoli cells to support sperm production. LH acts on Leydig cells, stimulating testosterone production; testosterone also supports sperm production.',
    'Compare the two targets: FSH acts through Sertoli cells, while LH stimulates Leydig cells to produce testosterone. Feedback regulation is omitted.');
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[ovarian],1:[testicular]};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:ovarian,1:ovarian,2:ovarian};
}());

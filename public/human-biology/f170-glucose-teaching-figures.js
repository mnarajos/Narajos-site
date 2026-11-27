/* Original, conceptual models for OCR Human Biology F170 3.1.1.
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * https://www.niddk.nih.gov/news/archive/2021/story-discovery-medications-diabetes-obesity-emerged-research-one-pancreatic-hormone
 * https://openstax.org/books/anatomy-and-physiology-2e/pages/24-1-overview-of-metabolic-reactions
 * Curves and symbols are schematic; no experimental values are implied.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f170/3.1.1'];
  if (!lesson) return;
  const figure = (file,height,alt,caption) => ({src:'/human-biology/'+file+'.svg',width:280,height,compact:true,alt,caption});
  const response = figure('f170-glucose-response',330,
    'A conceptual graph shows blood glucose concentration rising after a meal and then moving back towards a usual range. The axes show concentration against time without numerical values.',
    'Compare the initial rise with the later fall towards the usual range. The curve illustrates the idea and is not a measured data set.');
  const beta = figure('f170-beta-insulin',330,
    'A rise in blood glucose stimulates pancreatic beta cells to release more insulin into blood. Insulin is carried in blood as a signal to target cells.',
    'Follow the signal from pancreatic beta cells into blood. Insulin is a hormone, not glucose or a digestive enzyme.');
  const targets = figure('f170-insulin-targets',475,
    'Insulin signals muscle and fat cells to take up more glucose. It promotes glycogen synthesis in liver and muscle and reduces glucose output by the liver.',
    'Follow glucose from blood into muscle and fat; then locate glycogen synthesis in the liver. Insulin also promotes glycogen synthesis in muscle and reduces liver glucose output.');
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[response]};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:response,1:beta,2:targets,3:response};
}());

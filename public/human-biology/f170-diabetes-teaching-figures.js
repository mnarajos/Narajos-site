/* Simplified comparison for OCR Human Biology F170 3.1.2.
 * The existing graph and its data table remain generated from the lesson's fictional data.
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes/type-1-diabetes
 * https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes/type-2-diabetes
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f170/3.1.2'];
  if (!lesson) return;
  const diabetes = {
    src:'/human-biology/f170-diabetes-comparison.svg',width:280,height:465,compact:true,
    alt:'In type 1 diabetes the immune system attacks pancreatic beta cells, so little insulin can be produced. In type 2 diabetes target tissues respond less well to insulin and secretion may later become insufficient.',
    caption:'Compare signal production with target-tissue response. Both can contribute to raised glucose; a glucose curve on its own cannot establish the cause or diabetes type.'
  };
  const graph = {
    src:'/human-biology/f170-glucose-tolerance-graph.svg',width:280,height:295,compact:true,
    alt:'Fictional blood-glucose values in millimoles per litre are 5.0 at 0 minutes, 8.8 at 30 minutes, 7.6 at 60 minutes, 6.1 at 90 minutes and 5.3 at 120 minutes.',
    caption:'Read time along the bottom and blood glucose up the side. These are fictional data; the worked example also offers the values in a table.'
  };
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[graph],1:[diabetes]};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:graph,1:graph,2:graph};
}());

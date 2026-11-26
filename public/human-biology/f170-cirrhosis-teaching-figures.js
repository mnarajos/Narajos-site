/* Simplified liver-function models for OCR Human Biology F170 2.1.3.
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * https://www.niddk.nih.gov/health-information/liver-disease/cirrhosis/definition-facts
 * https://www.ncbi.nlm.nih.gov/books/NBK554597/
 * These are schematic, not patient images; bruising and ascites have multiple causes.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f170/2.1.3.cirrhosis'];
  if (!lesson) return;
  const figure = (file,height,alt,caption) => ({src:'/human-biology/'+file+'.svg',width:280,height,compact:true,alt,caption});
  const liver = figure('f170-liver-cirrhosis',365,
    'A liver outline is compared with a schematic cirrhotic liver. Dashed bands mark scar tissue around areas of liver tissue.',
    'Compare the illustrative outlines and locate the scar tissue. Cirrhosis can change liver structure and function; these are not scans.');
  const functions = figure('f170-bilirubin-albumin',440,
    'Bilirubin from red-cell breakdown is processed by the liver for bile. Liver-produced albumin in blood contributes to oncotic pressure, a force opposing fluid loss from the circulation.',
    'Follow bilirubin to the liver and bile, then find albumin in blood. The lower arrow represents oncotic pull, not a guarantee of net fluid flow; other forces also act.');
  const bruise = figure('f170-liver-bruising',390,
    'Scarred liver tissue may produce fewer clotting proteins. Blood can escape for longer from a damaged small vessel, making bruising more likely.',
    'Trace one possible link from liver damage to bruising. Other factors can also contribute to bleeding or bruising.');
  lesson.explainDiagrams = {...lesson.explainDiagrams,0:[liver],1:[functions]};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:bruise,1:bruise,2:bruise};
}());

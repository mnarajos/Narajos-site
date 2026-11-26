/* Original teaching diagrams for F172 genetic results and F173 tests.
 * OCR Human Biology specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Variant interpretation: https://medlineplus.gov/genetics/understanding/testing/interpretingresults/
 * Consent discussion: https://www.genomicseducation.hee.nhs.uk/genotes/knowledge-hub/the-consent-conversation-for-genomic-testing/
 * Gene therapy methods: https://medlineplus.gov/genetics/understanding/therapy/procedures/
 * Off-target editing: https://www.fda.gov/regulatory-information/search-fda-guidance-documents/human-gene-therapy-products-incorporating-human-genome-editing
 * Colour and particle illustrations are qualitative and do not represent results from a real sample.
 */
(function () {
 'use strict';
 const lessons=window.KeystoneHumanLessons || {};
 const figure=(file,height,alt,caption)=>({src:'/human-biology/'+file+'.svg',width:280,height,compact:true,assessmentSensitive:true,alt,caption});
 const uncertain=figure('f172-variant-significance',320,
  'A test finds a marked variant in a DNA sequence. The report identifies the variant, but a question mark indicates that current evidence has not established its clinical effect.',
  'Follow the marked variant to the report. Finding a variant and knowing whether it causes disease are separate conclusions.');
 const tests=figure('f173-biomolecule-tests',400,
  'Three examples of positive biomolecule tests: Biuret becomes violet with peptide bonds, iodine becomes blue-black with starch, and heated Benedict’s reagent can become orange with a reducing sugar.',
  'Compare these positive examples with appropriate controls. Benedict’s colour varies with the result; the tube colours are illustrative.');
 const partition=figure('f173-chromatography-partition',390,
  'In a qualitative comparison, three A symbols are in the mobile solvent and one on the stationary paper; one B is in the solvent and three on the paper. Opposing arrows show movement between phases. A tends to travel farther. The symbols illustrate relative time, not measured counts.',
  'Follow the solvent upwards. Both substances move between phases; in this example A travels further because it spends relatively more time in the mobile phase. Symbols represent relative time, not measured counts.');
 const consent=figure('f172-genetic-consent',390,
  'A person and clinician discuss the test purpose, choices and implications before a decision. A protected report is linked by a dashed line to relatives who may find the information relevant; results are not automatically shared.',
  'Follow the discussion to an informed decision. Genetic information can matter to relatives, but confidentiality and how information is shared require careful consideration.');
 const methods=figure('f172-gene-therapy-methods',385,
  'A functional gene copy is delivered to a target cell in one example. A separate example changes an existing DNA sequence with an editing tool. An editing tool also needs delivery; neither process guarantees a treatment outcome.',
  'Compare adding a copy with changing an existing sequence. Editing tools also need a way into target cells; neither step guarantees a successful outcome.');
 const somatic=figure('f172-somatic-target',315,
  'A treated body cell is shown beside a person. Egg and sperm symbols are separate because gametes are not the target in this somatic example.',
  'Locate the somatic target. This example treats body cells rather than gametes, so it does not routinely alter inheritance.');
 const editingRisk=figure('f172-editing-risk',285,
  'A schematic DNA region contains an intended target and another site. After an editing attempt, the intended site changes and an unintended change at the other site illustrates a possible off-target event. This is not a measured rate or a claim that every treatment causes it.',
  'Compare the two DNA sites. An editing tool can sometimes change a site other than its intended target; this example does not show a measured frequency.');
 const genetic=lessons['f172/a3'];
 if(genetic) {
  genetic.explain=[...genetic.explain,'Informed consent includes discussing the test, possible results and their implications. Genetic information may also matter to relatives, so confidentiality needs care.'];
  genetic.explainDiagrams={...genetic.explainDiagrams,0:[...(genetic.explainDiagrams?.[0]||[]),uncertain],1:[consent]};
 }
 const therapy=lessons['f172/a4'];
 if(therapy) {
  therapy.explainDiagrams={...therapy.explainDiagrams,0:[...(therapy.explainDiagrams?.[0]||[]),methods]};
  therapy.modelDiagrams={...therapy.modelDiagrams,2:[therapy.modelDiagrams?.[2],somatic].filter(Boolean)};
 }
 const chromatography=lessons['f173/a3'];
 if(chromatography) {
  chromatography.explain=[...chromatography.explain,'Substances move between the mobile solvent and the stationary paper. Different distributions between these phases affect how far they travel.'];
  chromatography.explainDiagrams={...chromatography.explainDiagrams,1:[partition]};
 }
 window.KeystoneF172F173RecapFigures={
  'f172/a3/1':[['f172/a3','teachingDiagram'],uncertain],
  'f172/a3/2':[consent],
  'f172/a4/0':[somatic],
  'f172/a4/1':[methods],
  'f172/a4/2':[['f172/a4','teachingDiagram'],editingRisk],
  'f173/a3/0':[tests],
  'f173/a3/1':[['f173/a3','teachingDiagram'],partition]
 };
}());

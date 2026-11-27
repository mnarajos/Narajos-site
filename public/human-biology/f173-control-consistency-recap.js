/* Original fictional Benedict's control example for F173.
 * OCR Human Biology specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Northern Virginia Community College, biomolecules lab controls: https://blogs.nvcc.edu/oer-lab-manuals/files/2024/02/3-BIO-101-Biomolecules-Lab-sp24.pdf
 * A known negative and consistent test conditions help identify an unreliable run;
 * an unexpected control result alone does not establish why it occurred.
 */
(function () {
 'use strict';
 const registry=window.KeystoneF172F173RecapFigures || (window.KeystoneF172F173RecapFigures={});
 const comparison={src:'/human-biology/f173-control-comparison.svg',width:280,height:390,compact:true,assessmentSensitive:true,
  alt:'In a fictional Benedict’s test, a known negative sample and an unknown are heated for the same time at the same temperature. The known negative unexpectedly turns orange rather than remaining blue. Possible contamination or another error requires investigation, so the unknown result is not interpreted.',
  caption:'Compare the samples under the same heating conditions. An orange negative control is unexpected; investigate possible contamination or another error before interpreting the unknown.'};
 registry['f173/a3/2']=[...(registry['f173/a3/2']||[]),comparison];
}());

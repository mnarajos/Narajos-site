/* F173 specimen handling recap: original schematic, not shipping instructions.
 * CDC medical diagnostic laboratory guidance: https://www.cdc.gov/mmwr/preview/mmwrhtml/su6101a1.htm
 * OCR Human Biology specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 */
(function () {
 'use strict';
 const registry=window.KeystoneF172F173RecapFigures || (window.KeystoneF172F173RecapFigures={});
 const workflow={src:'/human-biology/lab-sample-workflow.svg',width:280,height:360,compact:true,
  alt:'A labelled sample passes through laboratory testing with quality controls to a result report. The report is considered alongside clinical context to inform a decision.',
  caption:'Locate the sample label and quality controls: they help make the reported result dependable.'};
 const containment={src:'/human-biology/f173-contained-sample.svg',width:280,height:370,compact:true,
  alt:'A schematic capped and labelled specimen tube is enclosed in a sealed secondary bag. These layers help contain leaks during a local transfer. Follow the laboratory’s own procedures.',
  caption:'Notice the capped tube and sealed bag. Suitable containment helps limit leaks and exposure; follow local procedures for the specimen and transfer.'};
 registry['f173/a1/1']=[workflow,containment];
}());

/* Additional F172/F173 recap placements. All examples are schematic.
 * OCR Human Biology specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Genotype and phenotype: https://medlineplus.gov/genetics/understanding/basics/traits/
 * Magnification and resolution: https://www.microscopyu.com/microscopy-basics/resolution
 */
(function () {
 'use strict';
 const registry=window.KeystoneF172F173RecapFigures || (window.KeystoneF172F173RecapFigures={});
 const influences={src:'/human-biology/f172-genotype-environment.svg',width:280,height:320,compact:true,
  alt:'Arrows lead from genotype, the alleles a person has, and environmental influences, such as nutrition, to phenotype, an observable characteristic. Effects depend on the characteristic.',
  caption:'Notice that phenotype can be influenced by both genotype and environment. Their relative contributions depend on the characteristic.'};
 const independent={src:'/human-biology/f172-independent-pregnancies.svg',width:280,height:405,compact:true,
  alt:'For Rr carrier parents in this fictional single-gene trait, each pregnancy has the equally likely outcomes RR, Rr, Rr and rr. The chance of rr is one quarter in each pregnancy; an earlier outcome does not change the chance in a later pregnancy.',
  caption:'Compare the four equally likely outcomes for each pregnancy. The chance of the recessive genotype is unchanged by the earlier outcome in this example.'};
 const magnification={src:'/human-biology/f170-print-magnification.svg',width:280,height:325,compact:true,
  alt:'A hypothetical print shows a scale bar 30 millimetres long representing 20 micrometres. Thirty millimetres equals 30,000 micrometres; 30,000 divided by 20 is a magnification of 1,500. An enlarged blur remains blurred.',
  caption:'Convert the printed and actual lengths to the same units before dividing. This is a hypothetical print: magnification changes if a digital image is resized.'};
 Object.assign(registry,{
  'f172/a1/0':[['f172/a1','explainDiagrams',0]],
  'f172/a1/2':[influences],
  'f172/a2/0':[['f172/a1','modelDiagrams',2],['f172/a1','modelDiagrams',1]],
  'f172/a2/2':[['f172/a2','teachingDiagram'],independent],
  'f172/a3/0':[['f172/a3','teachingDiagram']],
  'f173/a2/0':[['f173/a2','explainPhotos',0],['f173/a2','explanationPhoto']],
  'f173/a2/2':[magnification]
 });
}());

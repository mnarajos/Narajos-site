/* F172 fictional single-gene inheritance and conditional probability.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Inheritance overview: https://medlineplus.gov/genetics/understanding/inheritance/inheritancepatterns/
 * The cross assumes equally likely gametes and the fictional dominant trait in the lesson.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f172/a2'];if(!lesson)return;
 const phenotype={src:'/human-biology/f172-genotype-phenotype.svg',width:280,height:315,compact:true,assessmentSensitive:true,
  alt:'In this fictional single-gene trait, RR and Rr both give the dominant phenotype; rr gives the recessive phenotype. The Rr genotype carries a recessive r allele that can be passed on. Filled and outlined circles are symbols, not real appearances.',
  caption:'Compare genotype with phenotype. In this fictional trait one R is enough for the dominant phenotype; an Rr carrier can pass on r.'};
 const cross={src:'/human-biology/punnett-cross.svg',width:280,height:300,compact:true,assessmentSensitive:true,
  alt:'The Rr by Rr Punnett square combines each parent’s R and r gametes to give RR, Rr, Rr and rr. The four combinations are equally likely in this fictional example.',
  caption:'Combine one gamete from each parent. With equally likely gametes the four boxes are equally likely in this fictional example.'};
 const conditional={src:'/human-biology/f172-conditional-carrier.svg',width:280,height:335,compact:true,assessmentSensitive:true,
  alt:'In the Rr by Rr square, rr is crossed out because a dominant phenotype is known. Of the three equally likely remaining outcomes, two are Rr carriers, so the conditional probability is two thirds.',
  caption:'Exclude rr because the offspring shows the dominant phenotype. Two of the three equally likely remaining boxes are Rr carriers.'};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[phenotype]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:cross,1:cross,2:conditional};
}());

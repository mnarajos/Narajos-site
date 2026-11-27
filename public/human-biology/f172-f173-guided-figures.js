/* F172–F173 guided blocks. The diagrams are original schematics; the existing
 * micrographs retain their individual source, licence and adaptation credits.
 * OCR Human Biology: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Gene definition and alleles: https://medlineplus.gov/genetics/understanding/basics/gene/
 * Resolution: https://www.microscopyu.com/microscopy-basics/resolution
 */
(function () {
 'use strict';
 const lessons=window.KeystoneHumanLessons || {};
 const gene=lessons['f172/a1'];
 if(gene) {
  gene.skipModelTeachingDiagram=true;
  const diagram={src:'/human-biology/f172-gene-allele-locus.svg',width:280,height:410,compact:true,assessmentSensitive:true,
   alt:'A highlighted segment of DNA represents a gene and points to a functional RNA or protein product. Two homologous chromosomes carry alleles R and r at the same locus. Chromosomes, DNA and lengths are schematic.',
   caption:'Locate the gene region in DNA, then compare the R and r versions at corresponding loci on the two homologues. A gene can produce a functional RNA or protein.'};
  gene.explainDiagrams={...gene.explainDiagrams,0:[...(gene.explainDiagrams?.[0]||[]),diagram]};
 }
 const testing=lessons['f172/a3'];
 if(testing?.teachingDiagram) {
  testing.skipModelTeachingDiagram=true;
  const scope={...testing.teachingDiagram,assessmentSensitive:true};
  testing.modelDiagrams={...testing.modelDiagrams,0:scope,1:scope};
 }
 const microscopy=lessons['f173/a2'];
 if(microscopy) {
  const light={src:'/assets/micrographs/hb-skeletal-striated.webp',width:1200,height:800,assessmentSensitive:true,
   alt:'A stained longitudinal section of skeletal muscle shows long parallel fibres in a light micrograph.',
   caption:'Notice the parallel fibres in this prepared light-microscope section. It does not show living movement; the image is not at the same scale as the electron micrographs.',
   source:'https://commons.wikimedia.org/wiki/File:Skeletal_striated_muscle.jpg',credit:'Nephron',licence:'CC BY-SA 3.0',
   licenceUrl:'https://creativecommons.org/licenses/by-sa/3.0/',changes:'Full frame resized and converted to WebP.'};
  const sem={...microscopy.explanationPhoto,assessmentSensitive:true},tem={...microscopy.explanationPhoto2,assessmentSensitive:true};
  microscopy.explanationPhoto=sem;
  microscopy.explanationPhoto2=tem;
  const resolution={src:'/human-biology/f170-magnification-resolution.svg',width:280,height:310,compact:true,assessmentSensitive:true,
   alt:'A blurred spot and an enlarged copy of the same blurred spot remain unresolved. The diagram distinguishes enlargement from resolving detail.',
   caption:'Compare the blurred spot with its enlarged copy. Enlargement alone does not resolve details that were not distinguished in the original.'};
  microscopy.explainPhotos={...microscopy.explainPhotos,0:[...(microscopy.explainPhotos?.[0]||[]),light]};
  microscopy.modelPhotos={...microscopy.modelPhotos,0:[sem,tem]};
  microscopy.modelDiagrams={...microscopy.modelDiagrams,1:resolution};
  // The renderer places the existing credited, marked micrograph at these
  // steps, where it is explicitly discussed, instead of the model opening.
  microscopy.modelVisualAtSteps=[1,2];
 }
 const tests=lessons['f173/a3'];
 if(tests?.explanationDiagram) {
  tests.skipModelTeachingDiagram=true;
  const controls={...tests.explanationDiagram,assessmentSensitive:true};
  tests.explain=[
   'A positive control shows that a method can detect a known substance. A negative control shows the expected result without it.',
   'In chromatography, compare spots with standards run under the same conditions. Substances move between the mobile solvent and the stationary paper; different distributions affect how far they travel.'
  ];
  tests.explainDiagrams={...tests.explainDiagrams,0:[controls]};
  tests.explanationDiagram=null;
  const registry=window.KeystoneF172F173RecapFigures || (window.KeystoneF172F173RecapFigures={});
  registry['f173/a3/2']=[controls];
 }
}());

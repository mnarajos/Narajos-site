/* Reuse of reviewed F171 teaching diagrams beside matching recap lines.
 * OCR Human Biology F171: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * The separate teaching-figure modules record the NHS/WHO sources and caveats.
 */
(function () {
 'use strict';
 const antibacterials={src:'/human-biology/f177-antibiotic-targets.svg',width:300,height:465,compact:true,
  alt:'A typical bacterium has a murein wall and ribosomes, targets of some antibiotics. HIV has neither of these structures and depends on host-cell machinery. Some bacteria lack a murein wall and antibiotics have different targets.',
  caption:'Compare the targets: some antibiotics disrupt bacterial wall synthesis or ribosomes. Viruses lack these structures. Different antibiotics have different targets; some bacteria lack a murein wall.'};
 window.HumanF171FocusedRecapFigures={
  'f171/1.2.1.aorta/1':[['f171/1.2.1.aorta','modelDiagrams',0]],
  'f171/1.2.1.aorta/2':[['f171/1.2.1.aorta','modelDiagrams',1]],
  'f171/1.2.1.hiatus/1':[['f171/1.2.1.digestive','modelDiagrams',0]],
  'f171/1.3.1.viruses/1':[['f171/1.3.1.viruses','modelDiagrams',0]],
  'f171/a2/2':[antibacterials]
 };
}());

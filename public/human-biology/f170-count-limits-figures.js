/* Illustrative dilution and the limit of an electrical particle count.
 * https://www.qiagen.com/be/knowledge-and-support/knowledge-hub/bench-guide/animal-cell-culture/essential-protocols-for-animal-cell-culture/counting-cells
 * https://www.ncbi.nlm.nih.gov/books/NBK525999/
 * No observed cell count, measurement or viability result is claimed.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f170/1.1.2.counting'];if(!lesson)return;
 const dilution={src:'/human-biology/f170-count-dilution.svg',width:280,height:330,compact:true,
  alt:'A schematic twofold dilution adds an equal volume of diluent to a suspension: the same four cell symbols occupy twice the volume. The diluted concentration is half the original, so multiply its estimate by two for the original suspension.',
  caption:'Add an equal volume of cell-free diluent, then compare the same cells in twice the volume. In this example the diluted concentration is half the original; multiply the diluted estimate by two. Cell symbols are illustrative.'};
 const viability={src:'/human-biology/f170-pulses-viability.svg',width:280,height:290,compact:true,assessmentSensitive:true,
  alt:'A living and a non-living cell are shown as similar-sized examples, each producing a schematic electrical pulse. A particle pulse alone does not establish whether a cell is alive.',
  caption:'Compare the two illustrative pulses. The counter registers particles; a pulse alone does not establish whether a cell is alive.'};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[...(lesson.explainDiagrams?.[0]||[]),dilution],1:[...(lesson.explainDiagrams?.[1]||[]),viability]};
}());

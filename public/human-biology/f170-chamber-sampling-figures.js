/* Original illustrative sampling model; no observed count is represented.
 * https://www.qiagen.com/be/knowledge-and-support/knowledge-hub/bench-guide/animal-cell-culture/essential-protocols-for-animal-cell-culture/counting-cells
 * https://dctd.cancer.gov/drug-discovery-development/assays/pharmacodynamic-biomarker-assays/historical/lhtp003.8.1.1-ctc-gh2ax-qc.pdf
 * Mixing improves the chance of a representative sample but does not guarantee it.
 */
(function () {
  "use strict";
  const lesson = window.KeystoneHumanLessons?.["f170/1.1.2.counting"];
  if (!lesson) return;
  const figure = {
    src: "/human-biology/f170-chamber-sampling.svg", width: 280, height: 465, compact: true,
    alt: "Schematic settled and mixed suspensions illustrate why mixing can help a small sample represent the suspension. One counting square marks top and left borders as included, and bottom and right borders as excluded. Other consistent boundary rules are possible.",
    caption: "Compare the cell distribution before and after mixing. For this example, include cells touching the top or left edge, and exclude those touching the bottom or right. If a cell touches both an included and excluded edge, exclude it; other consistent conventions are possible. Mixing does not guarantee a representative sample."
  };
  lesson.explainDiagrams = {...lesson.explainDiagrams, 0: [...(lesson.explainDiagrams?.[0] || []), figure]};
})();

/* Original qualitative schematic, not plotted measurements. Reviewed against:
 * https://www.ncbi.nlm.nih.gov/books/NBK11059/
 * https://pmc.ncbi.nlm.nih.gov/articles/PMC10946592/
 * Curve widths, peaks and heights are illustrative rather than experimental data.
 */
(function () {
  "use strict";
  const lesson = window.KeystoneHumanLessons?.["f170/1.1.1.signals"];
  if (!lesson) return;
  const figure = {
    src: "/human-biology/f170-cone-sensitivity.svg", width: 280, height: 330, compact: true,
    alt: "Three unnumbered illustrative curves show that the short-, medium- and long-wavelength cone types respond to overlapping ranges. The shapes are conceptual rather than measured sensitivities, and cone signals contribute to colour vision together.",
    caption: "Compare the overlapping sensitivities of S, M and L cones. Each type responds to a range, not one exclusive colour; relative cone signals help colour vision. The curves are illustrative, with no measured values."
  };
  lesson.explainDiagrams = {...lesson.explainDiagrams, 0: [...(lesson.explainDiagrams?.[0] || []), figure]};
})();

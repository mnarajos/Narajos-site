/* An original conceptual schematic of tissue sectioning and contrast.
 * Checked against NHS histology guidance and NCBI microscopy preparation:
 * https://www.nuh.nhs.uk/histology
 * https://www.ncbi.nlm.nih.gov/books/NBK26880/
 * Other preparation routes and stain results differ; the drawing is not to scale.
 */
(function () {
  "use strict";
  const lesson = window.KeystoneHumanLessons?.["f170/1.1.2"];
  if (!lesson) return;
  const figure = {
    src: "/human-biology/f170-section-stain.svg", width: 280, height: 365, compact: true,
    alt: "A simplified microtome blade cuts a thin section from a fixed tissue block. Stained schematic cells show more contrast between nuclei and surrounding material. Fixed cells cannot show living motion.",
    caption: "Follow the fixed tissue from block to thin section. Compare the schematic before and after staining: contrast can improve, but fixed cells cannot show living motion. Methods and stain effects vary."
  };
  lesson.explainDiagrams = {...lesson.explainDiagrams, 2: [...(lesson.explainDiagrams?.[2] || []), figure]};
})();

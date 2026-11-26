/* Original qualitative model, not to scale. Checked against:
 * https://openstax.org/books/anatomy-and-physiology-2e/pages/18-3-erythrocytes
 * https://pmc.ncbi.nlm.nih.gov/articles/PMC5421513/
 * Shape change is exaggerated; capillary dimensions and haemoglobin are not measured.
 */
(function () {
  "use strict";
  const lesson = window.KeystoneHumanLessons?.["f170/1.1.1"];
  if (!lesson) return;
  const figure = {
    src: "/human-biology/f170-red-cell-flexibility.svg", width: 280, height: 315, compact: true,
    alt: "A schematic red blood cell appears at two positions in a capillary and changes shape to pass through a narrower part. Flexibility helps passage; haemoglobin binds oxygen. The shapes and dimensions are not to scale.",
    caption: "Follow the same flexible cell into the narrower part. Deformation helps it pass; oxygen-binding capacity also depends on haemoglobin. Shapes are exaggerated and not to scale."
  };
  const previous = lesson.modelDiagrams?.[2];
  lesson.modelDiagrams = {...lesson.modelDiagrams, 2: [...(Array.isArray(previous) ? previous : previous ? [previous] : []), figure]};
})();

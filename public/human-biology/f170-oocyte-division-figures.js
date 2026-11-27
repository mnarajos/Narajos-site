/* Original schematic of an oocyte's unequal cytokinesis; checked against
 * https://www.ncbi.nlm.nih.gov/books/NBK10008/
 * https://www.ncbi.nlm.nih.gov/books/NBK555917/
 * This comparison is not to scale and omits later stages and chromosome counts.
 */
(function () {
  "use strict";
  const lesson = window.KeystoneHumanLessons?.["f170/1.1.5.meiosis"];
  if (!lesson) return;
  const figure = {
    src: "/human-biology/f170-oocyte-unequal-division.svg", width: 280, height: 350, compact: true,
    alt: "During meiosis I a primary oocyte divides its cytoplasm unequally, producing a large secondary oocyte and a small first polar body. The drawing does not show chromosome counts or later stages.",
    caption: "Compare the products of the first division: the secondary oocyte retains most cytoplasm. In humans it normally arrests during meiosis II and completes that division only if fertilisation occurs. The diagram is not to scale."
  };
  lesson.explainDiagrams = {...lesson.explainDiagrams, 2: [...(lesson.explainDiagrams?.[2] || []), figure]};
})();

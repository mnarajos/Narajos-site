/* Original schematic; human red-cell maturation and division checked against:
 * https://www.ncbi.nlm.nih.gov/sites/books/NBK544245/
 * https://www.ncbi.nlm.nih.gov/books/NBK26919/
 * The paired examples omit intermediate stages and are not to scale.
 */
(function () {
  "use strict";
  const lesson = window.KeystoneHumanLessons?.["f170/1.1.5"];
  if (!lesson) return;
  const figure = {
    src: "/human-biology/f170-red-cell-division.svg", width: 280, height: 335, compact: true,
    alt: "A nucleated early erythroblast in bone marrow can divide. A mature human erythrocyte has no nucleus and cannot undergo mitosis. Intermediate stages are omitted.",
    caption: "Compare the nucleated early erythroblast with the mature red cell. Early precursors can divide; mature human erythrocytes have no nucleus and cannot divide. The drawings omit intermediate stages."
  };
  lesson.explainDiagrams = {...lesson.explainDiagrams, 2: [...(lesson.explainDiagrams?.[2] || []), figure]};
})();

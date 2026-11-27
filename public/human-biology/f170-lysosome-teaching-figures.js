/* Original schematic, simplified and not to scale. Lysosomal hydrolases, acidic
 * conditions and degradation of enclosed cell components checked against:
 * https://www.ncbi.nlm.nih.gov/sites/books/NBK9953/
 * https://pubmed.ncbi.nlm.nih.gov/25668017/
 * The diagram does not show all fusion, sorting or export intermediates.
 */
(function () {
  "use strict";
  const lessons = window.KeystoneHumanLessons;
  if (!lessons) return;
  const digestion = {
    src: "/human-biology/f170-lysosome-digestion.svg", width: 280, height: 350, compact: true,
    alt: "An enclosed worn cell component is delivered to a lysosome. Hydrolytic enzymes break down material in the acidic interior; some smaller products can be reused in the cell.",
    caption: "Follow enclosed cell material into the lysosome. Hydrolytic enzymes work in its acidic interior; some smaller products can be reused. The stages and sizes are simplified."
  };
  for (const [key, paragraph] of [["f170/1.1.3", 3], ["f170/1.1.3.evidence", 2]]) {
    const lesson = lessons[key];
    if (!lesson) continue;
    lesson.explainDiagrams = {...lesson.explainDiagrams, [paragraph]: [...(lesson.explainDiagrams?.[paragraph] || []), digestion]};
  }
})();

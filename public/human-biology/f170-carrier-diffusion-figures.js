/* Original simplified model of a carrier facilitating diffusion, checked against:
 * https://openstax.org/books/biology-2e/pages/5-2-passive-transport
 * https://www.ncbi.nlm.nih.gov/books/NBK9847/
 * Transport is reversible; no particle numbers or molecular scales are implied.
 */
(function () {
  "use strict";
  const lesson = window.KeystoneHumanLessons?.["f170/1.1.4"];
  if (!lesson) return;
  const figure = {
    src: "/human-biology/f170-carrier-diffusion.svg", width: 280, height: 465, compact: true,
    alt: "A solute binds an outward-facing carrier, the carrier changes shape and the solute is released inside. This example has more solute outside. The steps are reversible and no ATP is directly used for this diffusion.",
    caption: "Follow binding, shape change and release. In this example net movement is down the concentration gradient; individual transfers can occur in either direction. Colours and sizes are schematic."
  };
  lesson.explainDiagrams = {...lesson.explainDiagrams, 0: [...(lesson.explainDiagrams?.[0] || []), figure]};
})();

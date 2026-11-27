/* Original, qualitative schematic; mechanism checked against:
 * https://openstax.org/books/anatomy-and-physiology-2e/pages/25-4-microscopic-anatomy-of-the-kidney
 * https://openstax.org/books/anatomy-and-physiology-2e/pages/25-6-tubular-reabsorption
 * The simplified chain omits potassium movement and other transporters.
 */
(function () {
  "use strict";
  const lesson = window.KeystoneHumanLessons?.["f170/1.1.1.surfaces"];
  if (!lesson) return;
  const figure = {
    src: "/human-biology/f170-tubule-atp.svg", width: 280, height: 370, compact: true,
    alt: "A mitochondrion supplies ATP for a sodium pump that moves sodium out of a tubule cell. The maintained sodium gradient supports sodium and glucose entering together from filtrate.",
    caption: "Follow the indirect link from mitochondrial ATP to sodium pumping and the gradient for glucose uptake. ATP does not directly power the sodium-glucose transporter; potassium movement and other steps are omitted."
  };
  lesson.comparisonFigures = {...lesson.comparisonFigures, 0: [...(lesson.comparisonFigures?.[0] || []), figure]};
  const previous = lesson.modelDiagrams?.[1];
  lesson.modelDiagrams = {...lesson.modelDiagrams, 1: [...(Array.isArray(previous) ? previous : previous ? [previous] : []), figure]};
})();

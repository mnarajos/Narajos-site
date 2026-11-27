/* Reuse the existing kidney filtration comparison beside the matching F171 explanation.
 * NIDDK: https://www.niddk.nih.gov/health-information/kidney-disease/polycystic-kidney-disease
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f171/1.2.1.pkd'];
  if (!lesson?.modelDiagrams?.[1]) return;
  lesson.explainDiagrams = {...lesson.explainDiagrams, 1:[{
    ...lesson.modelDiagrams[1],
    caption:'Compare the amount of urine with the separate blood-test finding. Continued urine production does not by itself establish effective waste clearance. This is a fictional example.'
  }]};
}());

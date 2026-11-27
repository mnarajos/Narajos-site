/* Original qualitative CNS myelin comparison, checked against:
 * https://medlineplus.gov/multiplesclerosis.html
 * https://www.uhb.nhs.uk/gps/referrals/referrals-by-specialty/neurology/multiple-sclerosis-referral-pathway/multiple-sclerosis-faqs/
 * It is not a patient image, does not quantify conduction and omits other MS pathology.
 */
(function () {
  "use strict";
  const lesson = window.KeystoneHumanLessons?.["f170/3.2.1"];
  if (!lesson) return;
  const figure = {
    src: "/human-biology/f170-cns-myelin-damage.svg", width: 280, height: 345, compact: true, assessmentSensitive: true,
    alt: "Two schematic central nervous system axons are compared. One has intact myelin sections and nodes. In the other, a myelin section is damaged; conduction along affected axons can be slowed or interrupted. The arrows do not represent measured speeds.",
    caption: "Compare the intact sheath with a damaged region. In MS, CNS myelin damage can slow or interrupt conduction in affected axons; effects vary. The arrows are qualitative, not measured speeds."
  };
  lesson.explainDiagrams = {...lesson.explainDiagrams, 1: [...(lesson.explainDiagrams?.[1] || []), figure]};
})();

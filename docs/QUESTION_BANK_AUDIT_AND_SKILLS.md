# Question banks and repeated skills practice

Source inspection: 21 November 2026, starting from main `181c92325be74283674ae792d15375910cab2dda`.

## Inventory and meaning

| Application | Authored topic-question entries | Named generated skills | Interpretation |
|---|---:|---:|---|
| GCSE Trilogy | 2,331 | 48 | A substantial bank already exists across 24 topics. Expand after identifying coverage, distractor, transfer and tier gaps. |
| AQA A-level Biology | 2,486 | 25 | 208 concepts across eight content topics plus three Paper 3 sections. The immediate need is targeted depth and transfer, not a blanket numerical target. |
| Cambridge Human Biology | 194 | Previously none; 14 added here | 64 F170 and 52 F171 fixed questions, plus 13 knowledge-only questions for each of F172–F177. Many examined subtopics have only one or two questions. Substantial authored expansion remains necessary. |

These are source entries, not unique examination items, marks, validated specification coverage or a count of every generated variant. A-level and GCSE topic entries include generator placeholders. Flashcards are separate: GCSE has 241 starter cards; Human Biology has 112 F170 recall cards. Input-type keys number 14 in GCSE, 15 in A-level and 10 in Human Biology, but this does not measure intellectual variety or quality. There has been no full statement-by-statement or item-by-item scientific audit in this change.

## Answer to the expansion question

More questions are appropriate, particularly in Human Biology. Prioritise (1) untested specification knowledge, (2) alternate representations and unfamiliar contexts, (3) misconception discrimination, (4) repeated calculation/data/practical skills, and (5) independent explanation/evaluation. Preserve coherent concept sequences and early accessible success. Do not add more interfaces simply to increase the format count.

GCSE: inspect and fill topic/tier gaps, add examiner-report-informed misconception practice and more diagram/data/practical application; audit and expand the starter flashcards separately. No new GCSE questions are claimed in this change.

A-level: maintain its substantial existing bank and generated maths practice. Inspect practical/data reasoning, unfamiliar applications, synoptic discrimination and repeated independently self-assessed explanations for depth. A paper/topic question count alone cannot establish that these areas are deficient. No new A-level questions are claimed in this change.

Human Biology: first deepen the thin F170/F171 subtopics and F171 clinical evidence, graph interpretation and analyse/discuss practice. Retain knowledge-only F172–F177 pathways. Skills generators add practice volume but do not fill missing biological content statements, disease coverage or extended-response contexts.

## Existing A-level separation

`DATA` holds topic/concept question sequences. `CARDS` supplies recall. `SKILLS` lists 25 skills and `GEN` creates varied values and task forms. Skills are reachable globally at `#practice`, by paper through `#pskills-p1/p2/p3`, and through associated topics. Paper tiles currently call this route **Maths Skills**. Paper 3 selects seven relevant skills.

`startSlop`, `showSlopExample` and `nextSlop` produce a worked example followed by the ladder: Warm-up (choice), Getting going (easy typed), Steady, Stretch, Exam level. `nextSlop` tries to avoid exact repeats and matches early tasks to the example's shape. Response handling raises the level after two independent correct answers (three after previous difficulty), lowers it after an error and keeps generating until the learner finishes. Counters are locally retained. A-level's current "skill secure" label is a practice threshold, not evidence of delayed retention or general transfer.

Topic knowledge and skills therefore have different entry points and progression; biology still supplies the context for the skill. This is primarily repeated mathematical/procedural practice, not a complete separate system for every kind of scientific reasoning. The AQA-specific statistical tests, Hardy–Weinberg and required-practical structure should not be automatically copied into the OCR app.

## Human Biology implementation

The visible **Skills practice** route is available from the main navigation, homepage and both examined-unit overviews. It offers all skills or an F170/F171 filter.

| F170 | F171 |
|---|---|
| Microscope unit conversions | Cardiac output with a supplied equation |
| Magnification / actual size | Percentage change |
| Percentages of dividing cells | Means / medians |
| Pulmonary ventilation | Reading an original graph |
| Bacterial growth | Rates from an original graph |
| Inheritance probability | Practical design |
| Measurement uncertainty | Evaluation of evidence |

Each begins with an unscored worked example and a ten-question set. Two independent correct responses raise the step; an incorrect or unknown response lowers it; correct responses with help stay at the same step. The initial calculation step uses four choices; later tasks use typed values and, where appropriate, reversed equations, additional conversions or conditional information. Incorrect responses receive the existing explanation and misconceptions, followed by a fresh task at an easier step. There is no automated open-response marking.

Numeric variants are seeded and generated in the browser. The practical and evidence families use a finite authored set of contexts and varied data; they are not unlimited independent reasoning problems. Repeats are possible, particularly for inheritance/design. Graphs have labelled axes and a table with the same values for accessibility. Graphs support reading values, differences and interval rates; this first release does not cover every graph type or statistical skill.

The existing challenge engine owns checking, optional timed hints, feedback and leave protection. Seed metadata restores the same questions after reload, including feedback. Progress aggregates by skill rather than saving thousands of generated item records; fixed-question coverage is unaffected. Ten-question sets can be repeated, with no attempt limit. Scores describe practice and do not claim mastery.

## Source mapping

Mapped against [OCR specification v8, October 2026](https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf), especially Appendix C (HSW) and Appendix D (mathematical skills), and independently authored in light of [F170 SAM](https://www.ocr.org.uk/Images/697850-fundamentals-of-human-biology.pdf) and [F171 SAM](https://www.ocr.org.uk/Images/697856-health-and-disease.pdf). Appendix D states that at least 10% of externally assessed marks assess mathematical skills. Source references are stored internally, not used to predict exam frequency.

No OCR questions or diagrams are reproduced. The new route supports examined-unit disciplinary skills and does not create assignment outputs or provide NEA coaching. The 194-question fixed bank remains unchanged by this release.

## Validation

`check-human-skills.mjs` checks 22,400 seeded tasks across all 14 families and four steps: deterministic regeneration, numeric answers/choice validity, selected independent arithmetic checks, accessible graph tables, progression/easing, guided versus independent results, ten-question completion, exact reload/feedback restoration and bounded separate skill history. These software checks do not establish item-by-item scientific review or complete mathematical coverage.

The browser suite exercises a complete generated session, reload, leaving/cancelling, resume, repeat practice, and desktop/390px mobile layouts and graph tables, alongside the existing site checks.

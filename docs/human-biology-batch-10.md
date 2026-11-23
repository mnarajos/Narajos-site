# Human Biology Batch 10

## Baseline audit

Batch 8 passed its site and browser workflows and was merged in PR 59. Batch 10 starts at main commit `cc7845c`. The earlier A-level PR is outside this batch.

| Finding | Baseline |
| --- | --- |
| Graduated hints | Several progression stages use an answer explanation as a hint. A first hint can also contain the conclusion. |
| Self-rating and accuracy | Batch 8 separated self-rating from the independent numerator. Written responses still enter the denominator, and self-rating still changes objective history fields. The unconditional retry of a written response after a negative self-rating can also mix different forms of evidence. |
| Written comparison | The challenge engine displays a model and marking points. Students cannot see, revise or save judgements against their original response. |
| Selection and submission | A pointer can automatically submit a correct radio choice in four-option questions. The existing tests explicitly expect this asymmetry. |
| Catch-up practice | Decimal section routes already work. The links use generic wording and the originating lesson and an existing exam set can be lost when practice starts. Contextual Skills Practice already has its own saved set and return link. |
| F175 sequence | The simulation and guided lesson already distinguish early development and implantation. The corresponding order question still places unqualified embryonic development after implantation. |
| Other response formats | Order, match and sort can reveal feedback but do not provide a targeted correction with the student's current work. |

## Implementation

| Finding | What changed | Regression coverage |
| --- | --- | --- |
| Graduated hints | Replaced model excerpts in all 49 Build Understanding sequences and the new treatment families with a question-type strategy and a cue about the relevant biological relationship. Optional elimination follows these two prompts where applicable. The explanation remains available on request. | Timed clue and feedback checks for representative F170, F171 and F172–F177 questions. Generated Skills Practice tasks retain their own cues. |
| Outcome integrity | Objective first submissions, hint-supported success, corrections, written self-reviews and reveals are stored separately. Reviews and reveals are excluded from the objective first-submission denominator. Accepted submissions survive reload and are recorded once. | Checked objective outcomes, hint use, legacy text classifications, repeat submissions and saved feedback. |
| Written review | The original answer and model sit together. Each authored point can be marked Included or Needs work. The student can revise their response and explicitly finish the self-review. Six- and nine-mark F171 activities retain the reasoning criteria and use self-assessment. | Tested original and revised responses, criterion selections, refresh before and after finishing, and completion statistics. |
| Choice questions | Radio selection updates the draft. Check answer submits it. The same sequence applies to single choices and diagram questions. | Tested changed selections, touch, mouse, keyboard, duplicate submission and refresh. |
| Topic navigation | Preserved the decimal route support already present in Batch 8. Added specific link wording, an exact lesson return and a separate saved practice slot when needed. Contextual Skills Practice continues to work. | Checked generated topic queues against their sections or areas across all eight units, including all six F171 priorities. Exercised return and resume with another set already saved. |
| F175 chronology | The sequence now follows fertilisation, cleavage and early development, blastocyst formation, implantation and continued development. Updated the model and recap to match. The simulation keeps fertilisation and implantation conditional and separate. | Tested the order, model feedback, older four-item drafts and reproduction controls. |
| Correction and completion | Matching, sorting and ordering can offer an in-place correction before revealing the solution. Correct match and sort rows stay in place. Completion shows the recorded categories and a next action. | Tested a correction with previously correct rows preserved, reload during correction, and saved completion without the written drafts. |

## Saved data and scope

Progress, drafts and completion stay in the learner's browser. The current draft, checklist and revised answer remain available until the learner continues past that question. The last set summary retains outcome metadata. Clearing progress resets exam, contextual practice and summary storage.

Older attempt totals remain available. When a question receives new evidence, its pre-Batch-10 counters are kept with the legacy record. Uncertain historical attempts and self-ratings are excluded from the verified accuracy figures. An older set can retain clearly independent non-text successes. Its older unsuccessful flags cannot reliably distinguish an incorrect submission from viewing an explanation, so its objective denominator may contain fewer historical questions than the set originally displayed.

F170 and F171 remain examination practice. F172–F177 remain general NEA knowledge support. No assessed work is collected or evaluated. The fixed bank still contains 552 original questions, and Skills Practice still has 14 families.

## Verification and follow-up

The automated site, flashcard, Human Biology, challenge and Skills Practice suites passed. The latter checked 22,400 seeded tasks. Browser checks covered the review and choice workflow, contextual return, completion, reset, keyboard focus, touch in Chromium, a 320 px viewport and enlarged text. The focused Chromium axe scan found no violations. The visual suite also covered Human Biology Catch-up across all eight units, F175 simulation controls, flashcard drafts and contextual Skills Practice. The same reliability journey runs in the Chromium, Firefox and WebKit jobs in GitHub Actions. No physical-device or specialist screen-reader session was performed.

The [curriculum quality register](human-biology-curriculum-quality-register.md) indexes evidence and gaps against OCR v8. It records selected ideas, linked teaching and question evidence. Full statement-by-statement scientific and demand verification remains open.

For Batch 11, start with two retaught topics. In F170, use the uterine micrograph model to teach transfer to unfamiliar ovarian and testicular specimens. In F171, model how to distinguish screening, diagnosis and follow-up, then check that students can explain the distinction in a different scenario. Pilot the independent application and feedback before widening either topic.

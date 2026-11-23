# Batch 25 — Shared learning interactions

## What changed for pupils

Batch 24 was present on main at `1c785ae` (PR #76). Its site, browser and accessibility checks had passed. There were no open pull requests when Batch 25 started. The checks below used the previous main version and the published lesson routes.

| Activity | Reproduced on the previous version | Pupils can now |
|---|---|---|
| [Single Paragraph Outline](https://narajos.com/teaching/focused-writing/gcse/) | On a 320 px screen, a GCSE opening and developed explanation could not assemble without two notes, their expansions and a closing sentence. Checking a directly written draft saved no first version for comparison. | Choose **Write my response**, or assemble an opening and one or more developed sentences. Add an ending when the question warrants it. Compare the first assembled or checked version with the current draft. Reassembly offers a preview if the pupil has edited their prose. |
| [Sandstone paragraph](https://narajos.com/teaching/focused-writing/order/) | The pupil opened a picker for each position. Exchanging two placed sentences involved a further choice inside the picker. | Tap five sentences in reading order to fill five positions. Select two occupied positions to exchange them, or return a single sentence to the bank. A hint and the first misplaced position give a specific route back into the task. |
| [Separation sequence](https://narajos.com/ks3/lesson/?topic=separating-techniques) | The sand-and-salt exercise already supported individual moves. A reload lost the partial arrangement. Diagram Practice method sequences offered a whole-order restart to correct a misplaced step. | Resume the separation sequence where they left it. In a diagram method sequence, move a step earlier or later, remove it, or deliberately clear the order. A retry keeps the surrounding work. |
| [Filtration diagram](https://narajos.com/ks3/lesson/?topic=separating-techniques#activity-filtration) | The diagram was 260 CSS pixels wide on a 320 px viewport and offered no in-task enlargement. | Enlarge the actual drawing, pan to a target and label it in that view. The letter, line and endpoint keep their relative positions. If A and B are exchanged, feedback identifies both, preserves a correctly placed C, and a single replacement exchanges the pair. |
| [Amylase catch-up](https://narajos.com/science-catch-up/lesson/?topic=amylase-endpoint&year=10) | Restoring a guided-complete record produced “Catch-up complete!” above an untouched application. The catalogue treated the guided completion as the end. | See **Guided checks complete** followed by **Independent application**. A pupil entering 25 instead of 1/25 can leave, resume and enter 0.04 s⁻¹. The result says **Calculation correct after support**. Reviewing the guided work or moving to revision is still available. |

The ramp introduction retains the complete opening–notes–development–ending exercise. The shorter supported and direct routes retain the teaching and worked examples across KS3, GCSE and A-level Focused Writing. The existing eight catch-up applications retain their questions and scientific keys.

## Evidence, feedback and saved work

- Ordering checks compare the complete arrangement with the existing key. Reading the sandstone hint or receiving corrective feedback is recorded in the new optional support field. Existing checked records remain readable. For older records the display makes no claim about assistance that was never recorded.
- Diagram label and point checks use the original target identifiers. In the enlarged view the same interactive elements move into the inspection window and return on close. New saves for diagram labels and method arrangements validate the task signature and indices. A pupil can correct a placement after reloading.
- GCSE amylase still checks reciprocal time. The spring transfer still distinguishes loss of proportionality from evidence of permanent extension. On the 3 N example, 15 mm exceeds the 12 mm proportional prediction. The pupil needs the unloaded length to assess permanence.
- Written answers use comparison and self-review. The original spring explanation remains readable beside the pupil’s revision. A correct calculation, a correct calculation after support, a written attempt and a finished self-review have separate outcomes. An old guided completion continues to give access to the independent task without repeating the teaching.
- Focused Writing uses the existing same-tab draft storage. Ordering and catch-up use local browser storage. Restoring the old paragraph slot indices, checked flag and guided outcomes requires no conversion. No questions were added.

## Verification

The extended existing browser suites exercise 320 and 390 px portrait, 667 × 375 landscape, 768 px tablet, 1280 px desktop and 150% root text. They use touch and keyboard, a wrong attempt followed by a correction, page reloads, a catalogue return, enlarged label placement and first-versus-revised draft comparisons. The full Chromium check also sets tab zoom to 200% and verifies the viewport and pixel ratio before repeating the journey. Cross-engine and zoom results are recorded in [PR #77](https://github.com/mnarajos/Narajos-site/pull/77).

The mobile inspection sample included filtration apparatus, an I–V circuit, leaf tissue, a nephron and a genetic cross. The geometric regression checks rendered marker centres against their leader lines. Checks include focus on opening and closing, touch placement and keyboard panning. The tested routes fit the page while allowing the enlarged figure to scroll inside its own region. None of those tasks warranted a larger-device notice.

Local site validation checked 42 pages, parsed 10 inline scripts and checked 221 links. Existing checks exercised 35 writing-marking cases, all 37 KS3 opening checks, 18 senior guided journeys and 48 senior lesson routes. Chromium smoke and visual checks covered the other revision applications and Batch 24 drawing work. Targeted axe scans found no WCAG A/AA violations in the sampled selected-sentence, enlarged-filtration, paragraph-feedback and post-error calculation states. These observations are limited to the tested states. There was no pupil trial, physical-device observation or real screen-reader session.

## Entry-page performance baseline

The three entry HTML documents were byte-identical before and after this batch. The figures below are single compressed localhost samples from the existing performance measurement script on a 390 × 844 viewport. The synthetic profile used 4× CPU throttling, 120 ms network latency and 200,000 bytes/s. Readiness measures the first usable search field on the revision apps and populated question choices on the teacher tool. Action round trip includes the scripted click and two animation frames. Each pair shows previous main → candidate.

| Entry | HTML bytes | Compressed document bytes | Ready (s) | Script execution (ms) | First action round trip (ms) |
|---|---:|---:|---:|---:|---:|
| GCSE | 1,778,761 | 480,266 | 3.13 → 3.28 | 40 → 43 | 75 → 100 |
| A-level | 2,107,076 | 572,944 | 3.92 → 3.95 | 47 → 52 | 78 → 82 |
| Teacher | 430,190 | 132,076 | 0.98 → 1.01 | 32 → 62 | 96 → 85 |

The previous version’s sampled startup blocking was 247 ms, 300 ms and 20 ms respectively. Sampled layout shift was zero throughout. External font requests did not result in a loaded Poppins font in these runs. Test-runner load and font availability limit comparisons. The A-level entry took about four seconds to become usable under this profile. Repeated cold-start measurements on a physical mid-range phone would establish whether transfer or startup work merits a separate change. This batch made no entry-page architectural changes.

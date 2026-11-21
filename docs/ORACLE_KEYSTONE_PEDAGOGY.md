# Keystone pedagogy standard: the Oracle

**Status:** governing design standard for Narajos Keystone revision applications, November 2026. Applies to GCSE Science, AQA A-level Biology and Cambridge OCR AAQ Human Biology; implementation depth may differ between courses.

## What the Oracle means
The Oracle is an internal synthesis from the user's Pedagogical Project, drawing on Adam Boxer, Pritesh Raichura, Christian Moore-Anderson, Carl Hendrick, Adam Robbins, explicit/direct instruction, Rosenshine-style principles, cognitive load and retrieval research. It is **not** a new acronym, an AI service, a grading model or an independent named scientific theory. It does not imply endorsement by any listed educator.

Fundamental approach: **secure knowledge, organise it, retrieve it, explain and apply it, test transfer**, with the teacher retaining responsibility for the taught curriculum and individual diagnosis. The app should be complementary independent practice, not a substitute for high-quality initial instruction or real teacher feedback.

## Product non-negotiables

- **No student account or login; no student identifiers.**
- **No app analytics, ad trackers, event beacons, embedded AI services, or uploading student answers or progress.** Do not introduce telemetry without a separate design and privacy decision.
- **No AI marking.** Deterministic grading is permitted for objectively decidable answers (a predefined choice, matching, ordering, numbers with specified tolerance and units, exact approved key terms). An open biological explanation cannot be labelled right/wrong by keyword counting, fuzzy text similarity or a model. Show a concise model or mark-point checklist and ask the learner to self-assess.
- **Browser-only optional persistence** may retain local settings, in-progress queues and minimal per-item practice history using `localStorage`, with course-specific keys. No remote synchronisation. Explain that clearing browser data resets progress; provide a local reset control and avoid persisting long written responses needlessly.
- **No third-party font requests in new apps**, where possible. Use system fonts or locally hosted assets; externally linked supporting materials are opened only if the student clicks.
- **No coursework-writing, marking, feedback or submission coaching** for OCR AAQ NEA units. Generic biological content learning is different from assisting with a live assignment.
- **Accessibility and clarity first:** visible labels, keyboard controls, accessible diagrams, low-text overview, clear choices, readable typography and semantic feedback (not colour alone).

## Curriculum structure

1. **Mapping:** each question maps to the specification, with actual demand and misconceptions recorded. Coverage across every eligible statement comes before chasing a speculative idea of 'high yield'. Do not conflate public sample-assessment examples with repeated live-exam frequencies.
2. **Grain size:** group 4–12 coherent items around one concept or tightly related concepts; do not make 40-question unstructured sessions. Keep related prerequisite concepts close.
3. **Progression:** in a concept, start with an accessible warm-up and/or short model, then core retrieval, explanation, discrimination of near alternatives, familiar application, unfamiliar context/evaluation. The student's assessed answer should come *before* revealing feedback.
4. **Mode distinctions:** concept practice is progressive and scaffolded. A learner-facing **Quick Mix** should blend topics and question formats without randomly starting on a difficult task: begin with highly accessible retrieval, build through core understanding, then introduce application. Broader exam-focused revision may interleave already learned concepts more freely. Never randomise a novice's first introduction into an incoherent order.
5. **Core vs further challenge:** challenging questions should deepen rather than replace core knowledge. Stretch is **optional** after adequate foundation; unknown content must be provided in context rather than assumed.
6. **Mathematical methods:** show a worked example and then supported numerical tasks before harder transfer problems; return to a different-number variant where possible. Do not award answers with incorrect units by silently ignoring a unit requirement.

## Feedback and practice cycle

- **Correct independently:** confirm briefly, then explain the discriminating principle or causal chain. Avoid generic praise crowding out the science.
- **Incorrect:** give the correct answer, a *specific* explanation of the error, and no more than one or two relevant reteach points. Supply a related quick check, preferably not the exact same item, then revisit the missed item later.
- **I don't know:** immediately reveal the explanation without shame or penalty; record locally as needing more practice only if browser persistence is enabled.
- **Hints:** allow learner-controlled, graduated help (strategy → targeted cue → narrowing or first step), with no answer giveaway. A correct answer after help is distinct from independent retrieval; give a related independent check before implying security.
- **Extended writing:** model answer or bullet key points, comparison prompts and optional self-rating; **never a fabricated examination mark or automated semantic verdict**.
- **Diagnostic state:** “correct without help”, “correct with help”, “not yet”, and “not attempted” are more defensible than claims of proven mastery from a few questions. Avoid misleading precision in scores and labels.
- **Spacing:** locally reschedule previously missed or due cards; explain to learners that repetition and retrieval promote retention. In-browser progress is not shared with teachers or the site owner.

## Quality assurance

- Review correctness and OCR/AQA wording, level of demand, scope, feedback and distractor mechanisms against specification/SAM and, when available, examiner reports.
- For every new question: test the intended answer and distractors; scan for unintentional clues (correct choice always first or longest, grammatical articles revealing the gap, negative stems, impossible distractors, contradictory accepted variants).
- Draw diagram questions accurately; include spoken descriptions; avoid labelling cues in alt text that disclose the answer to screen-reader users.
- Numerical tests must handle full-input validation, units and permitted tolerances explicitly.
- Run all modes and transition paths (independent, hint, wrong, unknown, return, resume, clear local progress) in automated tests, then real browser visual/mobile and keyboard checks before describing the feature as verified.
- No gamification mechanic should obstruct correction or induce guessing. Accuracy and understanding take priority over a streak counter.

## Human Biology implementation priority

Adopt immediately: accessible warm-ups, progressive area practice, discrimination and explanation questions, brief targeted hints, specific feedback with a quick check and local-only progress. Later: worked-example maths ladders, more rotating number variants, carefully scaffolded OCR extended-response practice and richer data/graph interpretation. Do not import A-level-specific formats such as the 25-mark essay, AQA required-practical structure or AQA mark-scheme rules into OCR AAQ.

**Governance rule:** when another product/design choice conflicts with these principles, prefer the simpler activity that accurately teaches and tests the intended biology.

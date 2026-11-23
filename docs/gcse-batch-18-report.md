# Batch 18 implementation and coverage report

## Baseline and scientific corrections

Batch 17 was merged in [PR 69](https://github.com/mnarajos/Narajos-site/pull/69). Both main workflows passed for merge commit 71eade6 and the deployed A-level HTML matched that commit before this batch. No pull requests were open at the start of this work. The previous Batch 9 reconciliation and Batch 16 were also merged.

Phase 1 updated [A-level Biology Paper 3 and Maths Skills](/alevel/) on the existing Batch 18 branch. A non-significant result gives insufficient evidence to reject the null hypothesis. The p-value assumes the null model and includes outcomes at least as extreme as the observation. Statistical significance addresses evidence against that model. The size of an effect and its biological importance require separate evidence.

Standard deviation is the spread of observations. Students read the graph legend and describe the overlap or separation when an exam question asks about displayed bars. For example, the June 2023 Paper 1 Question 5.5 mark scheme credits a qualified bar-based comparison in that context. The teaching and generated answers explain that a significance test needs information beyond the bars. Fixed question keys, distractors, generated p-value and chi-squared questions, and SD-range arithmetic were updated with a targeted regression.

- [AQA 7402 specification](https://www.aqa.org.uk/subjects/biology/a-level/biology-7402/specification)
- [AQA June 2023 Paper 1 mark scheme, Question 5.5](https://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2023/june/AQA-74021-MS-JUN23.PDF)
- [American Statistical Association statement on p-values](https://www.amstat.org/asa/files/pdfs/P-ValueStatement.pdf)

## GCSE coverage and decisions

The [baseline coverage register](gcse-batch-18-coverage.md) maps the existing 19 Year 10 and 11 Year 11 routes, 12 reusable Year 9 routes, all 24 Trilogy subject topics, selected high-priority subtopics and all 21 required practicals. It records the difference between coverage in the revision app, an explanation with a guided check, and an independent catch-up application. The [AQA Trilogy 8464 specification](https://www.aqa.org.uk/subjects/science/gcse/science-8464/specification) Version 1.3 was used for scope, tier, equations and practical alignment.

There are now 23 distinct Year 10 and 14 distinct Year 11 guided lessons. The existing catalogue and question engine supply entry points and saved work.

| Subject | Before | After | Independent or further application |
|---|---|---|---|
| Biology | Inheritance moved from definitions to the outcome of Aa × Aa in a single paragraph. Photosynthesis included a rate comparison. | Inheritance shows where the four entries in the grid come from and how to count phenotypes. Photosynthesis models an oxygen-volume rate and the need to control temperature when the lamp is moved. | The existing inheritance check asks about a later child after three earlier outcomes. Photosynthesis asks pupils to infer a limiting factor in a new situation, and Higher Tier adds an inverse-square estimate and a reason that the biological rate can behave differently. |
| Chemistry | Concentration calculations were in the revision app. Reversible reactions received a short check inside the rates lesson. Chromatography already had a results diagram. | A new concentration lesson compares g/dm³ after converting volumes. A new equilibrium lesson traces forward and reverse rates from unequal to equal non-zero values. Chromatography now shows the starting setup and models the measurements for Rf. | Pupils select a solution for a specified concentration, infer equal rates with unequal concentrations, and judge what matching spots support. Higher Tier uses dilution and temperature changes at equilibrium. |
| Physics | The supply and Grid were revision-led. Forces used a qualitative cyclist example. Electromagnetism taught the coil field. | New guided lessons model a mains fault path, transmission current at fixed power, I–V meter placement, motion-graph slopes and the Higher-only motor effect. Visuals show cable cores, transformer stages, the I–V circuit, quantitative coordinate plots and forces on opposite sides of a coil. | Pupils reason about an open switch, a wind-farm transmission line, unfamiliar lamp readings, a trolley graph and reversing the supply to a motor. Higher Tier applies transformer power and area/tangent reasoning. |

The existing Year 10 photosynthesis lesson and Year 11 chromatography and inheritance lessons were revised in place. Their stage positions, prompts and option labels were retained. Required-practical work focuses on fair photosynthesis comparisons (RP5), a reliable chromatography layout and the two measurements (RP12), and suitable meter connections and interpretation of V/I (RP16). These investigations build on existing revision material. No hands-on practical is replaced by the online activity.

Common teaching uses short checks and worked numerical examples. Specification-defined Higher content is labelled, with an explanation and a self-check or a dedicated Higher-only lesson in the case of the motor effect. Guided checks record support. The final check uses a new context and tracks independent responses separately from work completed after help. During a check, pupils can revisit the worked example and resume with the same selected answer. Question diagrams give the underlying evidence, and labels or descriptions do not name the conclusion the pupil must draw.

## Verification and limits

- Static validation covered 42 pages, 10 inline scripts and 221 local links. Flashcard checks covered 241 GCSE cards across the 24 topics.
- A-level statistics regression checked 1,000 generated questions and fixed inference keys. The A-level Chromium suite also covered 70 Exam Skills tasks, 56 drawing judgements, contextual return and saved state. Both GitHub workflows passed for the Phase 1 branch head.
- Chromium opened all 37 senior routes from the correct year catalogue, exercised all seven new sequences, checked wrong-answer feedback, keyboard focus, a follow-up after help, completed and unfinished reloading, and preservation of an existing inheritance response. The Year 7–9 scaffolding checks also passed separately.
- The new tests used a touch-enabled 320px viewport with reduced motion. Chromatography was checked for overflow with enlarged text at 320px, 768px and 1280px and was scanned with axe. Accessible names on the new figures describe the drawing or readings. Automated checks establish interaction and layout, and no observed pupil trial was available.
- Scientific checks used AQA 8464 §§4.4.1, 4.6.1, 5.3.2, 5.6.2, 5.8.1, 6.2, 6.5.4 and 6.7, plus §10.2 for the practical work. Numerical examples were recalculated and diagrams were checked against the corresponding models.

## Outstanding work

The register is a map of guided and revision provision, with gaps retained. Topics with at least one available lesson can still lack an explicitly taught subtopic or independently checked practical decision. The highest-value next guided improvements are:

1. Biology: add practical decision points for pH/amylase, reaction time and random ecological sampling, then review circulation, plant transport and Higher hormonal explanations.
2. Chemistry: model limiting reactants, half-equations and the evidence from an electrolysis investigation, followed by a worked temperature-change method.
3. Physics: model force/extension, force–acceleration experimental controls, and practical wave and infrared measurements. Further build transfer with nonlinear graphs and evaluate the new motion model with pupils.

For a future pupil trial, use a fresh transfer question after each lesson and observe where pupils need extra prompting. Record the reasoning as well as the chosen answer.

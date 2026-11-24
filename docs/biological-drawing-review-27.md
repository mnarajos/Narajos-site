# Independent scientific review of the Biological Drawing activity

The reviewer worked separately from the implementation and compared each candidate with the actual photograph. This is an independent AI review against AQA guidance. A credentialled biology teacher has yet to sign off the activity. No pupil drawing or screen-reader-user trial formed part of this review.

## Standard used

AT e asks students to produce a scientific drawing from observation with annotations. The January 2026 handbook asks for representative outlines in pencil, appropriate detail, accurate relative sizes, an explanatory title and an indication of real size or magnification. If a dimension must be exaggerated for clarity, explain it. Labels and brief notes about functions or relationships depend on the task. A tissue map records tissue distribution and boundaries. A high-power cell drawing records resolved structures in a small number of cells. A dissection-based body plan records visible anatomy. The activity uses the first two types. Judging somebody else’s drawing supplies practice but cannot establish the learner’s own practical competency. [AQA 7402, section 7.1](https://www.aqa.org.uk/subjects/biology/a-level/biology-7402/specification/practical-assessment) · [Biology Practical Handbook v2.3, printed pages 54–55](https://cdn.sanity.io/files/p28bar15/green/2563b719d41442e27a14abbb2ae5360b85ca38c9.pdf) · [AQA’s version announcement](https://www.aqa.org.uk/news/as-and-alevel-biology-updated-practical-handbook)

## Findings on the merged Batch 26 activity

Each of the six photographs was genuine. The reviewer inspected all eighteen original comparisons, enlarged difficult regions, and superimposed the six model contours on their native photo crops. All six candidate graphics lacked an attached explanatory title. The screen offered a general acceptance decision for three specimens whose photographs supplied no physical calibration. No original model, as presented to the student, served as an unambiguous complete titled plate. The following observations distinguish the value of the individual specimens.

| Original model | Visible evidence and limits of use |
| --- | --- |
| Red onion | The complete oblique pink polygon has identifiable walls and a uniform interior. The outer contour and wall leader follow it closely. Pigmentation alone gives no boundary to a separate nucleus or vacuole. This is a good omission and boundary exercise but a weak first example of selecting internal cell structures. |
| Privet leaf | The upper surface dips over the midrib. The thin epidermis and the rounded vascular region correspond to the outlines. The lower surface extends below them. Several other tissues are visible. This is a selected-boundary task with no field calibration. |
| Buttercup root | The section has a broad cortex, a central cylinder roughly one seventh as wide as the root, and four diagonal arms of xylem. Enlarging the photograph showed that the vessel groups end in rounded lobes. The drawing’s pointed tips gave the tissue an idealised star shape. |
| Arterial wall | The oblique lumen has a small lower-left irregularity. There is a dark band with a further, paler rim outside it. The model followed the outside of that pale rim above and to the left, but followed the darker band below and to the right. It combined two different boundaries. The uncalibrated crop cannot establish actual wall thickness. |
| Stained cheek epithelium | The upper of two overlapping cells has an angular boundary and one distinct oval nucleus about one seventh of the cell width. The baseline outlines represent these structures well. Stain speckling supplies no further reliable organelle contours. No scale was supplied. |
| Human erythrocyte | The fluorescent boundary surrounds one complete, slightly elongated cell. The brightness change within it does not enclose a distinct internal body. Its outline agrees with the photograph, and the source supplies a scale. |

The baseline question IDs, photographs and selection criteria are preserved in the [Batch 24 drawing audit](alevel-drawing-batch-24.md) and the [Batch 26 assessment report](assessment-batch-26.md).

## Independent check of retained calibration

Measurements below are horizontal pixel spans in the actual local files. Physical values come from the photographers’ scale bars. Display dimensions have no role in assigning those values. An approximately measured boundary does not justify reporting an equally precise physical cell width.

| Source | Check in local field | Consequence for the drawing |
| --- | --- | --- |
| [Red onion, Adrian J. Hunter](https://commons.wikimedia.org/wiki/File:Cells_from_a_red_onion_epidermal_peel.tif) | The full segmented bar spans x = 610–966 inclusive (357 units) and is labelled 200 µm. Both the source description and visible inscription refer to the entire bar. | 50 µm uses 357 × 50 / 200 = 89.25 units. This applies to both selected cells in that field. |
| [Buttercup, Jon Houseman and Matthew Ford](https://commons.wikimedia.org/wiki/File:Ranunculus_root.jpg) | The source assigns 0.31 mm to the black bar. In the local 840 × 750 image its filled span is x = 682–804 inclusive (123 units). | 0.31 mm = 310 µm. A 310 µm bar uses the full 123 units. |
| [Erythrocytes, MDougM](https://commons.wikimedia.org/wiki/File:Sedimented_red_blood_cells.jpg) | The photographer identifies human red cells stained with octadecyl rhodamine and a 20 µm bar. The white span is approximately x = 244–365 inclusive in the 386 × 404 JPEG (122 units). | 5 µm uses 122 × 5 / 20 = 30.5 units. The central cell is about 40 units wide, consistent with approximately 6.6 µm across this profile. |

## Checked Batch 27 drawings

Each row below represents a separately rendered candidate, paired with its photograph in Chromium. The reviewer inspected the line or lines from the text to the endpoint as well as the outlines, figures, titles and bars. On an interior label, entering the relevant region can be necessary. A leader passing beyond an edge that it purports to label is an error. The task tests specified structures within the field of view.

| Candidate ID | Verdict for this task | What the rendering and feedback show |
| --- | --- | --- |
| `epidermis.outline` | Accept, complete for the requested wall drawing | One continuous, oblique wall encloses an unshaded cell. The leader ends at the right wall, the title names the epidermal cell, and the 50 µm bar has the correct length. |
| `epidermis.leader` | Reject · label endpoint | The line from the right crosses the wall and ends in cell contents. Shortening it places the endpoint on the wall. The rest of the outline and bar agree. |
| `epidermis.bar` | Reject · scale | The wall and leader agree. The candidate calls the same 50 µm length 100 µm. |
| `privet.outline` | Features match · focused practice | The outer surfaces, narrow upper band and rounded bundle occupy the observed positions. The upper-surface leader meets the dip from above. The title identifies selected tissue boundaries. Its missing physical calibration limits the judgement. |
| `privet.band` | Features need correction · proportions | The upper band is much deeper than the observed row. It includes underlying elongated tissue. The leader and bundle are unchanged. |
| `privet.cells` | Features need correction · biological detail | Five short subdivisions at the left introduce cell boundaries into the tissue map. The upper-surface leader remains correctly placed. |
| `buttercup.outline` | Accept, complete for the requested tissue map | A broad cortex surrounds a small cylinder. The four rounded xylem lobes match the observed groups of vessels without drawing individual vessels. The label ends inside the cortex. The attached annotation explains its relationship to the cylinder. The title and 310 µm bar are present. |
| `buttercup.core` | Reject · proportions | The enlarged cylinder is about one third of the root’s width compared with about one seventh in the photograph. The cortex leader is still in the cortex and the xylem shape is retained. |
| `buttercup.xylem` | Reject · biological detail | The small cylinder is empty even though its four-armed xylem is visible and required by the prompt. The cortex leader and bar agree. |
| `arterial.outline` | Accept, complete for the specified medial band and lumen | The replacement young control carotid has an irregular lumen, inward bend below the middle on the right, and a dark band separating it from diffuse pink outer tissue. Both outlines follow that band. The short leader and its text sit within the lumen. The title, positional annotation and 100 µm bar are present. |
| `arterial.rim` | Reject · proportions | The lumen expands until the band across the base is about 9 source units thick instead of about 30. Both contours remain distinct, and the leader still ends in the lumen. |
| `arterial.hatch-tip` | Reject · shading and label endpoint | Five diagonal strokes shade the lower band. The lumen leader starts at its text inside the space, passes its inner edge and ends in the band to the left. Both faults are visible and the feedback addresses both. |
| `buccal.outline` | Accept, complete | The replacement Feulgen control cell has an irregular perimeter and a single dark, almost circular nucleus slightly above the centre. The short line meets the nucleus from the right without traversing the cell perimeter. The title identifies the specimen and stain. The annotation relates the stain to the visible nucleus. The bar represents 10 µm. |
| `buccal.nucleus-size` | Reject · proportions | The nucleus is drawn almost half as wide as the cell instead of about one sixth. The angled label still reaches this enlarged body without crossing another line. |
| `buccal.sketch` | Reject · line quality | Several strokes compete for the same upper-left outer contour. The nuclear outline, its leader and the scale retain the model’s dimensions. |
| `redcell.outline` | Accept, complete | The external contour is slightly taller than wide. Its leader meets the right edge. There is no resolved, separately enclosed internal structure to outline. The title identifies a human erythrocyte and the bar represents 5 µm. |
| `redcell.interior` | Reject · biological detail | The extra closed oval has no corresponding boundary in the fluorescence image. Tone alone cannot establish an organelle. The outer leader and bar are correct. |
| `redcell.bar` | Reject · scale | The external outline and its label agree. The candidate gives 10 µm to the same length as the valid 5 µm bar. |

## New calibration and teaching examples

| Observation | Independent source and image check |
| --- | --- |
| Principal worked cell | Chen and colleagues identify Figure 1A as a tiger frog erythrocyte in a Wright–Giemsa-stained blood smear. The 10 µm bar runs from x = 31 to 285 inclusive in the local source panel, giving 255 units. Both the observation and model use 127.5 units for 5 µm. The near-central, slightly leftward nucleus is about one third of the cell’s horizontal width. Both contours follow the source image. Its purple mottling supplies no reliably closed outlines of separate structures. The three leaders reach the outer edge, nuclear edge and cytoplasm respectively. The original review placed two labels inside the cell to keep their lines short. The follow-up model places all three words in the margin. The nucleus and cytoplasm lines each enter the cell once. The cell-boundary line stops on the outer contour. [Figure and derivation](drawing-worked-source.md) |
| Human cheek | The Figure 5 caption identifies panel a as the normal control cell and explicitly assigns 20 µm to the bar. I measured a 198-unit span from x = 412–609 inclusive at y = 596–599. The 10 µm bar uses 99 units. This teaching claim uses the observed morphology and captioned calibration of the published preprint. [Source, version and geometry](drawing-calibration-search.md) |
| Mouse carotid | Figure 1A of Brown and colleagues identifies the unligated young control and explicitly applies the 100 µm bar to every panel. The black bar spans approximately 164 units, x = 3398–3561 inclusive in rows 680–683 of the local file. The selected arterial field retains that image scale. The correct drawing’s 100 µm bar uses those same 164 units. The medial outlines exclude diffuse outer connective tissue. [Published Figure 1](https://www.mdpi.com/1422-0067/26/21/10274) · [Source and tracing](drawing-artery-source.md) |
| Independent paper drawing | The neighbouring cell is distinct from the earlier oblique onion cell. Its height, bowed left wall and lower junctions can be seen. The model’s single outline, right-wall leader, title, observation note and 50 µm bar fit the selected cell. The learner receives the photograph and paper instructions first. The model and reflection follow a deliberate reveal. |

The Feulgen cheek, mouse carotid, buttercup, onion and human erythrocyte each have one complete model for the stated drawing task. The frog worked example and the paper model also include physical size. Privet is the sole focused-only comparison. Its choices ask whether named features match; absolute size and overall completeness are outside that decision. The decision to retain it and the calibrated alternative sources considered are recorded in the [calibration search](drawing-calibration-search.md).

## Accessible comparison, calculations and records

The reviewer also submitted independently assigned verdicts and categories through all three live sets in Chromium. All 18 matched this register on the first submission. The two-error artery required both shading and the displaced label. The UI recorded the privet results as focused judgements.

The readable descriptions and image names identify shapes, positions, relative sizes, label endpoints and bar values. They do not give the verdict or a list of faults. The cheek reference gives measurements for comparing nuclear proportions, and the carotid reference gives the basal wall thickness. A learner can therefore compare measurements using the two descriptions. Calibration-source notes are available while deciding. The additional teaching prompts and the marked feature overlays appear separately from the initial candidate.

In a fresh Chromium session the reviewer inspected the revealed model, opened its enlarged view, switched back to the photograph in the same dialog, and checked that the controls and page width remained usable at 320 × 640, 390 × 844, 667 × 320, 768 × 1024 and 1280 × 830. I repeated the 390 px check with root text at 150%. The worked photograph and model were also visually inspected at 320 px. Accessibility and browser-zoom suite results are recorded in the [completion report](biological-drawing-batch-27.md).

The existing independent calculation uses a 246-unit section of the buttercup photograph. It represents 2 × 310 µm = 620 µm. Where that length is 36 mm on paper, a 100 µm bar should be 36 × 100 / 620 = 5.806… mm, or 5.8 mm to one decimal place. A proportional resize changes the bar’s drawn length and preserves the actual length it signifies.

An independent migration check seeded version 2 with a part-finished set, two recorded observational outcomes and a saved paper reflection. Version 3 retained the earlier outcomes and session as historical records, began the revised judgements with no outcomes, and recovered the paper notes and checklist for the unchanged cell. The learner’s own drawing receives no automated score.

**Scientific review disposition.** All eighteen final judgements were inspected. Fifteen belong to the five complete-drawing tasks and three to the focused privet task. Across the bank, five candidates meet the full task, one meets the focused criteria and twelve contain the specified defects. The worked and paper models were checked separately. A qualified human biology teacher’s review remains outstanding.

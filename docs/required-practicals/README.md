# AQA A-level Biology required practicals

These activities prepare students to use evidence in teacher-assessed practical work. Find them under **Required practicals** from the A-level Biology home page, under **Practicals** on each paper page, or in the relevant **Catch up** lessons. The topic question banks remain available. These activities give feedback during the session and use the existing course progress separately.

The links below open the new routes on Narajos once the change is deployed. In a local preview of the branch, use the same fragments under `/alevel/`.

| Practical | Visual and student action |
| --- | --- |
| [RP1 · Enzyme activity](https://narajos.com/alevel/#practical-1) | Read the first visible cross in a simulated trypsin–casein sequence, calculate reciprocal time, and decide when to equilibrate and mix the reagents. Existing amylase questions and enzyme simulations remain available. |
| [RP2 · Root-tip squashes](https://narajos.com/alevel/#practical-2) | Follow a slide preparation diagram, identify a cell from its chromosome arrangement and count a second onion field using a boundary and uncertainty rule. |
| [RP3 · Water potential](https://narajos.com/alevel/#practical-3) | Follow the sucrose dilution series and potato weighing setup, compute percentage mass change and interpret the zero-change concentration. |
| [RP4 · Membrane permeability](https://narajos.com/alevel/#practical-4) | Trace beetroot pigment from the vacuole to a reading, then judge how rinsing and controlling volume affect the temperature comparison. |
| [RP5 · Dissection](https://narajos.com/alevel/#practical-5) | Identify features in a photographed lamb left ventricle, use the thick muscle wall to reason about function and continue into Biological Drawing. |
| [RP6 · Antimicrobials](https://narajos.com/alevel/#practical-6) | Compare discs on an authentic photograph, read total inhibition-zone diameter using a scaled schematic, and evaluate what a larger zone can establish. |
| [RP7 · Chromatography](https://narajos.com/alevel/#practical-7) | Explore the guided paper chromatography simulation, then measure bands on an authentic two-species TLC photograph, calculate Rf values and compare lanes. Existing paper chromatography questions remain available. |
| [RP8 · Chloroplast extracts](https://narajos.com/alevel/#practical-8) | Predict and step through illuminated, dark, and extract-free treatments. Compare dye colour and absorbance and calculate a rate of absorbance change. |
| [RP9 · Respiration](https://narajos.com/alevel/#practical-9) | Open the guided respiration simulation for methylene blue, a respirometer, paired examples and unfamiliar apparatus. Simulation progress and evidence are saved in this browser, separately from course progress. The existing endpoint activity and topic questions remain available. |
| [RP10 · Animal responses](https://narajos.com/alevel/#practical-10) | Follow tracks in a choice chamber, use speed and heading evidence to distinguish kinesis and taxis, and compare equal conditions. |
| [RP11 · Glucose calibration](https://narajos.com/alevel/#practical-11) | Follow quantitative Benedict’s colorimetry, interpolate unknown glucose values and account for dilution. |
| [RP12 · Fieldwork](https://narajos.com/alevel/#practical-12) | Choose random quadrats, a systematic transect or chosen positions, collect plant counts and compare the density estimate with the virtual field’s census. |

## Sources and image attribution

- [AQA 7402 practical assessment and the 12 practicals](https://www.aqa.org.uk/subjects/biology/a-level/biology-7402/specification/practical-assessment)
- [AQA apparatus set-up guides](https://www.aqa.org.uk/resources/science/as-and-a-level/biology-7401-7402/teach/practicals-apparatus-set-up-guides)
- [RP2, RP5 and RP6 photographs, reuse licences, modifications and answer evidence](../required-practicals-observations.md)
- [RP7 chromatogram, reuse licence, modifications, AQA and SAPS references](../required-practicals-chromatography.md)
- [RP8 and RP9 scientific sources and model assumptions](../required-practicals-mechanisms.md)
- [RP10 and RP12 model assumptions and sources](../required-practicals-simulations.md)
- [RP1, RP3, RP4 and RP11 apparatus and assay references](../required-practicals-methods.md)

The onion fields and agar photograph are uncalibrated. The agar calculation uses a separate explicitly scaled diagram. RP7 uses image units that cancel in the Rf calculation. The simulated values and movement rules are illustrative.

## Browser review

- [RP2 desktop, root-tip micrograph](rp2-desktop.png)
- [RP6 phone, inhibition-zone ruler](rp6-phone.png)
- [RP10 desktop, choice-chamber tracks](rp10-desktop.png)
- [RP12 phone, quadrat transect](rp12-phone.png)

Run `node scripts/check-alevel-practicals.mjs` after installing the browser dependencies from the Browser smoke workflow. The check covers student routes, phone and desktop reflow, keyboard enlargement, feedback states, existing progress isolation, and the two sampling and movement models.

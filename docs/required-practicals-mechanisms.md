# RP8 and RP9 method and source notes

| Practical | Existing provision reviewed on main | Activity |
| --- | --- | --- |
| RP8 | Absorbance graph, key knowledge, variables and control questions. | Read an original apparatus schematic, predict which tube will change, step through a high- or low-light simulation, measure the absorbance fall per minute and interpret a new control result. |
| RP9 | Yeast capillary respirometer readings, volume calculations and seed and woodlouse exam questions. | Use a baker’s yeast methylene-blue endpoint model to compare temperatures, calculate reciprocal time and explain the precision of an endpoint observation. Retain oxygen-uptake practice with its own apparatus schematic and explanation. |

## Scientific references

- AQA defines the required investigations and separately assesses practical endorsement through direct observation. The RP8 apparatus guide demonstrates cold spinach preparation and temperature control; the RP9 guide illustrates the yeast and methylene-blue setup. [AQA practical assessment](https://www.aqa.org.uk/subjects/biology/a-level/biology-7402/specification/practical-assessment), [RP8 apparatus guide](https://filestore.aqa.org.uk/resources/biology/AQA-7401-7402-P8.PDF), [RP9 apparatus guide](https://filestore.aqa.org.uk/resources/biology/AQA-7401-7402-P9.PDF)
- RP8 follows the light-dependent electron transfer comparison described by OCR and Practical Biology. The colorimeter zero uses the appropriate dye-free matrix for each sample type and the tests compare changes from each tube’s own start. [OCR Hill reaction teacher instructions](https://www.ocr.org.uk/Images/170050-the-hill-reaction-activity-teacher-instructions.pdf), [Practical Biology Hill investigation](https://practicalbiology.org/energy/photosynthesis/investigating-the-light-dependent-reaction-in-photosynthesis.html)
- RP9 follows the yeast and temperature example in the AQA handbook. Under matched conditions the time to a common dye endpoint is a comparative measure. The activity includes a heat-killed comparison. [AQA AS and A-level Biology practical handbook](https://filestore.aqa.org.uk/resources/biology/AQA-7401-7402-PHBK.PDF)

## Visuals and model assumptions

- [RP8 apparatus](../public/assets/required-practicals/rp8-hill.svg), [RP9 dye setup](../public/assets/required-practicals/rp9-yeast.svg), and [RP9 seed respirometer](../public/assets/required-practicals/rp9-respirometer.svg) are original Narajos teaching schematics. All graphics were drawn for this change under the site’s existing terms. The student-facing activities contain no external photographs or republished source diagrams.
- RP8 simulated absorbance readings are deterministic. In the illuminated extract, absorbance starts at 0.80 and falls by 0.05 per minute in lower light or 0.10 per minute in higher light. The simulation stops at 8 minutes and bounds the excess absorbance at zero. Control readings stay at 0.80. The dye’s contribution is isolated by measuring relative to a matched blank, so the extract still looks green when excess absorbance is zero. The model shows a short linear range for measuring rates and omits noise, reoxidation and light saturation.
- RP9 simulated endpoint observations are 6 min at 25 °C and 4 min at 35 °C. The heat-killed tube stays blue during the 7-minute model run. These timings illustrate how observing at one-minute intervals limits precision. Actual endpoint times vary with preparation and handling.

## Guided RP9 simulation

The RP9 practical page links to `/alevel/respiration/`, where students can learn the methylene-blue method and respirometer, compare paired examples and apply the ideas to unfamiliar diagrams. The shorter existing activity remains available. Simulation progress, written self-checks, settings and run evidence are stored together in this browser, separately from the course question progress. An unfinished run is restored paused. A calculation retains its original run and readings even if another run is performed; if the required evidence is unavailable, the dependent answer is reset.

The methylene-blue model uses the handbook's 20, 35 and 45 °C trial means as illustrative anchors; values outside that range are illustrative modelling. A later shake invalidates a tube for comparison, and an endpoint not observed within 600 seconds is reported separately from a measured rate. The gas model assumes aerobic respiration of glucose in its aerobic case, with approximately equal oxygen and carbon-dioxide volumes; under the model's established anaerobic conditions it represents carbon-dioxide release. Particle counts are schematic projections of the same state that drives the apparatus, not measurements of individual molecules. Written answers are explicitly self-checked; keyword matches do not mark them.

Run `node scripts/check-rp9-simulation.mjs` and `node scripts/check-rp9-resume.mjs` with the browser dependencies from the Browser smoke workflow to exercise the main feedback, controls, evidence, units, resume and responsive paths.

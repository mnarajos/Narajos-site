/* Independently written high-yield questions informed by OCR specification v8 and public SAMPLE assessments.
   Sample alignment does not establish live-exam frequency. No copied OCR exam stems or mark schemes. */
window.KeystoneHumanChallenges={
  "version": "2026-11-21-confidence-ladder",
  "units": [
    {
      "id": "f170",
      "title": "F170 Fundamentals of human biology",
      "label": "Exam unit · 60 marks · 75 minutes"
    },
    {
      "id": "f171",
      "title": "F171 Health and disease",
      "label": "Exam unit · 60 marks · 75 minutes"
    }
  ],
  "questions": [
    {
      "id": "cell-ser",
      "unit": "f170",
      "area": 1,
      "section": "1.1.3",
      "type": "single",
      "level": "core",
      "stem": "A cell is producing large quantities of lipids for new membranes. Which organelle is especially involved?",
      "options": [
        "Smooth endoplasmic reticulum",
        "Rough endoplasmic reticulum",
        "Lysosome",
        "Nucleolus"
      ],
      "correct": 0,
      "model": "Smooth endoplasmic reticulum",
      "explain": "Smooth ER synthesises lipids, including phospholipids, used to build membranes.",
      "misconception": "Rough ER is mainly associated with proteins translated on bound ribosomes.",
      "samAligned": true,
      "hintCue": "Which cell compartment is associated with lipid synthesis rather than ribosomes making polypeptides?"
    },
    {
      "id": "cell-protein-route",
      "unit": "f170",
      "area": 1,
      "section": "1.1.3",
      "type": "order",
      "level": "apply",
      "stem": "Put the stages of secretion of a protein in the most appropriate order.",
      "items": [
        "Translation on ribosomes attached to rough ER",
        "Transport through rough ER and vesicles",
        "Modification and sorting in Golgi apparatus",
        "Secretory vesicle fuses with cell membrane"
      ],
      "model": "Rough ER ribosome → ER/vesicles → Golgi → exocytosis.",
      "explain": "Follow the protein through the secretory pathway rather than memorising an unordered list.",
      "misconception": "The Golgi does not synthesise the polypeptide.",
      "samAligned": false,
      "hintCue": "Think about where a protein is first made and how it is then processed before leaving the cell."
    },
    {
      "id": "cell-mito-ribosomes",
      "unit": "f170",
      "area": 1,
      "section": "1.1.3",
      "type": "single",
      "level": "core",
      "stem": "Which organelle contains its own ribosomes as well as the cell's cytoplasmic ribosomes?",
      "options": [
        "Mitochondrion",
        "Smooth ER",
        "Lysosome",
        "Golgi apparatus"
      ],
      "correct": 0,
      "model": "Mitochondrion",
      "explain": "Mitochondria contain ribosomes, mitochondrial DNA and enzymes for parts of aerobic respiration.",
      "misconception": "Lysosomes and Golgi do not contain independent protein-synthesis machinery.",
      "samAligned": true,
      "hintCue": "Which energy-transferring organelle retains its own genetic material and translation machinery?"
    },
    {
      "id": "cell-identify-membrane",
      "unit": "f170",
      "area": 1,
      "section": "1.1.1",
      "type": "diagram",
      "level": "core",
      "stem": "On the simplified cell diagram, what does label A indicate?",
      "figure": "cell",
      "options": [
        "Cell-surface membrane",
        "Nuclear envelope",
        "Cytoplasm",
        "Mitochondrion"
      ],
      "correct": 0,
      "model": "Cell-surface membrane",
      "explain": "The thin boundary encloses the cytoplasm and regulates exchange with the environment.",
      "misconception": "A nuclear envelope surrounds the nucleus, not the entire cell.",
      "samAligned": true,
      "hintCue": "Follow the arrow to the precise boundary of the whole cell, not the boundary of its nucleus."
    },
    {
      "id": "cell-stem-benefits",
      "unit": "f170",
      "area": 1,
      "section": "1.1.1",
      "type": "multi",
      "level": "apply",
      "stem": "Which TWO potential benefits apply when a patient's own adult stem cells are used to produce replacement blood cells?",
      "options": [
        "Reduced risk of immune rejection",
        "No concerns about control of cell division",
        "Avoids obtaining cells from an embryo",
        "All transplanted cells are guaranteed to work"
      ],
      "correct": [
        0,
        2
      ],
      "model": "Reduced rejection risk; avoids harvesting embryonic stem cells.",
      "explain": "Both benefits are conditional: autologous cells may be better matched but are not risk-free.",
      "misconception": "Stem cell culture still requires safety and effectiveness checks.",
      "samAligned": true,
      "hintCue": "Focus on how closely the donated cells match the recipient and where the original cells came from."
    },
    {
      "id": "cell-magnification",
      "unit": "f170",
      "area": 1,
      "section": "1.1.2",
      "type": "number",
      "level": "apply",
      "stem": "A photomicrograph shows a cell measuring 36 mm across on the image. Its actual width is 12 µm. Calculate magnification.",
      "correct": 3000,
      "tolerance": 0,
      "model": "×3000",
      "explain": "36 mm = 36 000 µm; 36 000 ÷ 12 = 3000.",
      "misconception": "Convert image size and actual size to the same unit first.",
      "samAligned": true,
      "answerUnit": "×",
      "hintCue": "Convert the image measurement into micrometres before using image size divided by actual size."
    },
    {
      "id": "cell-actual-width",
      "unit": "f170",
      "area": 1,
      "section": "1.1.2",
      "type": "number",
      "level": "stretch",
      "stem": "A cell appears 24 mm wide at a magnification of ×6000. What is its actual width?",
      "correct": 4,
      "tolerance": 0,
      "model": "4 µm",
      "explain": "24 mm = 24 000 µm; actual size = 24 000 ÷ 6000 = 4 µm.",
      "misconception": "Do not multiply image size by magnification.",
      "samAligned": false,
      "answerUnit": "µm",
      "hintCue": "Rearrange image size = magnification × actual size; convert millimetres to micrometres first."
    },
    {
      "id": "cell-microscope-method",
      "unit": "f170",
      "area": 1,
      "section": "1.1.2",
      "type": "match",
      "level": "apply",
      "stem": "Match the microscopy technique to its most characteristic use.",
      "pairs": [
        [
          "Light microscopy",
          "Observe living or stained cells at relatively low resolution"
        ],
        [
          "TEM",
          "Observe thin sections of internal ultrastructure"
        ],
        [
          "SEM",
          "Observe detailed surfaces of prepared specimens"
        ]
      ],
      "model": "Light microscope → live/stained cells; TEM → internal ultrastructure; SEM → surface detail.",
      "explain": "Resolution, specimen preparation and whether the sample can be living distinguish these methods.",
      "misconception": "TEM does not normally provide a live-cell image.",
      "samAligned": false,
      "hintCue": "One method reveals surfaces, another internal thin sections; only one routinely examines living cells."
    },
    {
      "id": "cell-stage-metaphase",
      "unit": "f170",
      "area": 1,
      "section": "1.1.5",
      "type": "single",
      "level": "apply",
      "stem": "In a dividing cell, condensed chromosomes are aligned near the centre of the spindle. What is the stage?",
      "options": [
        "Metaphase",
        "Prophase",
        "Anaphase",
        "Telophase"
      ],
      "correct": 0,
      "model": "Metaphase",
      "explain": "Alignment at the equatorial region is the key structural evidence.",
      "misconception": "Do not identify a stage from chromosome visibility alone.",
      "samAligned": true,
      "hintCue": "Notice the position of the chromosomes: have they separated to opposite poles yet?"
    },
    {
      "id": "cell-stage-anaphase",
      "unit": "f170",
      "area": 1,
      "section": "1.1.5",
      "type": "single",
      "level": "apply",
      "stem": "Two groups of sister chromatids are moving towards opposite spindle poles. What stage is shown?",
      "options": [
        "Anaphase",
        "Metaphase",
        "Interphase",
        "Cytokinesis"
      ],
      "correct": 0,
      "model": "Anaphase",
      "explain": "In anaphase, sister chromatids separate and move towards opposite poles.",
      "misconception": "Cytokinesis divides the cytoplasm and is distinct from nuclear division.",
      "samAligned": true,
      "hintCue": "Use what the chromatids are physically doing, rather than simply whether they are visible."
    },
    {
      "id": "cell-s-phase",
      "unit": "f170",
      "area": 1,
      "section": "1.1.5",
      "type": "short",
      "level": "core",
      "stem": "In which phase of the cell cycle is DNA replicated?",
      "accepted": [
        "S phase",
        "S",
        "synthesis phase",
        "S phase of interphase"
      ],
      "model": "S phase of interphase",
      "explain": "DNA replication occurs during S phase of interphase, before mitosis.",
      "misconception": "Interphase includes G1, S and G2; 'interphase' is less precise.",
      "samAligned": false,
      "hintCue": "DNA synthesis occurs before nuclear division, during a particular part of interphase."
    },
    {
      "id": "cell-bone-repair",
      "unit": "f170",
      "area": 1,
      "section": "1.2.2",
      "type": "multi",
      "level": "apply",
      "stem": "Which TWO materials supplied by blood are especially relevant to energy production and mineral deposition during bone repair?",
      "options": [
        "Glucose",
        "Calcium ions",
        "Keratin",
        "Starch"
      ],
      "correct": [
        0,
        1
      ],
      "model": "Glucose and calcium ions",
      "explain": "Glucose supports ATP production; calcium contributes to bone mineral.",
      "misconception": "Human tissues do not use starch directly as a bone-building substrate.",
      "samAligned": true,
      "hintCue": "Think of one circulating fuel for ATP generation and one ion needed for mineralised tissue."
    },
    {
      "id": "cell-epithelium",
      "unit": "f170",
      "area": 1,
      "section": "1.2.2",
      "type": "match",
      "level": "core",
      "stem": "Match each epithelial tissue to a characteristic function.",
      "pairs": [
        [
          "Simple squamous",
          "Rapid diffusion across a thin barrier"
        ],
        [
          "Ciliated",
          "Transport material over a surface"
        ],
        [
          "Cuboidal",
          "Secretion and absorption in ducts or tubules"
        ]
      ],
      "model": "Squamous → diffusion; ciliated → surface transport; cuboidal → secretion/absorption.",
      "explain": "Link histological structure to function rather than learning labels alone.",
      "misconception": "A thin exchange epithelium is not usually thickly layered.",
      "samAligned": false,
      "hintCue": "Relate tissue thickness, movement over the surface, and secretion to three distinct epithelial shapes."
    },
    {
      "id": "cell-organoid",
      "unit": "f170",
      "area": 1,
      "section": "1.2.3",
      "type": "written",
      "level": "stretch",
      "stem": "A medicine appears effective in a miniature human liver organoid. Give TWO reasons this alone does not prove it is safe in patients.",
      "markPoints": [
        "An organoid lacks some physiological interactions of a whole body or other organs.",
        "Its metabolism, immune interactions, vascular supply or exposure may differ from a patient."
      ],
      "model": "Whole-body effects and interactions are not reproduced; further evidence is required.",
      "explain": "A three-dimensional organoid models selected features of a tissue, not the entire patient.",
      "misconception": "Do not claim organoids are simply identical miniature organs.",
      "samAligned": false,
      "hintCue": "Ask which effects depend on blood circulation, immune responses, or other organs outside the culture."
    },
    {
      "id": "cell-membrane-transport",
      "unit": "f170",
      "area": 1,
      "section": "1.1.4",
      "type": "single",
      "level": "apply",
      "stem": "A transporter uses ATP to move ions from low to high concentration. Which process is this?",
      "options": [
        "Active transport",
        "Facilitated diffusion",
        "Simple diffusion",
        "Osmosis"
      ],
      "correct": 0,
      "model": "Active transport",
      "explain": "Transport against a concentration gradient requires energy; some transporters use ATP directly.",
      "misconception": "Facilitated diffusion is passive.",
      "samAligned": false,
      "hintCue": "Use both facts: ATP is consumed, and the ions move against their concentration gradient."
    },
    {
      "id": "cell-culture-safety",
      "unit": "f170",
      "area": 1,
      "section": "1.2.3",
      "type": "single",
      "level": "apply",
      "stem": "Why must a cultured cell model be tested further before use to predict patient outcomes?",
      "options": [
        "It omits some whole-body physiology",
        "No cultured cell has a membrane",
        "All human tissue culture is genetically identical",
        "A culture cannot contain proteins"
      ],
      "correct": 0,
      "model": "It omits some whole-body physiology",
      "explain": "Cell models may miss the effects of other organs, circulation, and immune responses.",
      "misconception": "In vitro results can be useful without being conclusive.",
      "samAligned": false,
      "hintCue": "A cell culture is not the same as testing the medicine within an interacting whole body."
    },
    {
      "id": "phys-heart-septum",
      "unit": "f170",
      "area": 2,
      "section": "2.1.2",
      "type": "diagram",
      "level": "core",
      "stem": "In the simplified heart diagram, which structure is indicated by label A?",
      "figure": "heart",
      "options": [
        "Interventricular septum",
        "Aortic valve",
        "Right atrium",
        "Pericardium"
      ],
      "correct": 0,
      "model": "Interventricular septum",
      "explain": "The septum divides the two ventricles and limits mixing of ventricular blood.",
      "misconception": "A septal defect is a hole in the partition, not the heart's outer wall.",
      "samAligned": true,
      "hintCue": "Identify whether the line separates chambers, surrounds the heart, or controls blood flow between chambers."
    },
    {
      "id": "phys-diagnosis-tools",
      "unit": "f170",
      "area": 2,
      "section": "2.2.3",
      "type": "match",
      "level": "apply",
      "stem": "Choose the most appropriate tool for each clinical observation.",
      "pairs": [
        [
          "Electrical activity of the heart",
          "Electrocardiogram (ECG)"
        ],
        [
          "A hole in the wall between ventricles",
          "Echocardiography"
        ],
        [
          "Lung volumes and airflow",
          "Spirometry"
        ]
      ],
      "model": "ECG → electrical activity; echocardiography → heart structure; spirometry → lung function.",
      "explain": "Decide what is being measured before naming an instrument.",
      "misconception": "ECG alone does not image a hole in the ventricular septum.",
      "samAligned": true,
      "hintCue": "Separate electrical recordings, ultrasound images, and tests measuring air movement."
    },
    {
      "id": "phys-ventilation",
      "unit": "f170",
      "area": 2,
      "section": "2.2.3",
      "type": "number",
      "level": "apply",
      "stem": "A patient takes 14 breaths each minute, with a tidal volume of 0.45 L. Calculate minute ventilation.",
      "correct": 6.3,
      "tolerance": 0.02,
      "model": "6.3 L min⁻¹",
      "explain": "Ventilation = 14 × 0.45 = 6.3 L min⁻¹.",
      "misconception": "Do not confuse minute ventilation with oxygen uptake.",
      "samAligned": true,
      "answerUnit": "L min⁻¹",
      "hintCue": "Multiply the volume of one breath by the number of breaths in one minute."
    },
    {
      "id": "phys-vsd",
      "unit": "f170",
      "area": 2,
      "section": "2.1.3",
      "type": "written",
      "level": "apply",
      "stem": "A child has a sizeable ventricular septal defect. Explain ONE possible physiological consequence.",
      "markPoints": [
        "A left-to-right shunt may increase pulmonary blood flow and load.",
        "This can cause breathlessness, fatigue, or cardiac strain."
      ],
      "model": "Increased blood flow towards the lungs can increase cardiac work and contribute to breathlessness.",
      "explain": "Small defects may cause few symptoms; severity and physiology vary.",
      "misconception": "A VSD does not always cause severe symptoms.",
      "samAligned": true,
      "hintCue": "Consider what happens if blood flows through an opening between the high- and low-pressure ventricles."
    },
    {
      "id": "phys-peakflow-technique",
      "unit": "f170",
      "area": 2,
      "section": "2.2.3",
      "type": "multi",
      "level": "apply",
      "stem": "Which TWO actions improve the validity of repeated peak-expiratory-flow measurements?",
      "options": [
        "Make a tight seal around the mouthpiece",
        "Use a strong, rapid expiration after a deep inhalation",
        "Choose the lowest of three readings",
        "Change posture between every attempt"
      ],
      "correct": [
        0,
        1
      ],
      "model": "Tight lip seal; blow hard and fast after a deep breath.",
      "explain": "Peak flow requires a maximum effort and suitable technique.",
      "misconception": "Typically record the highest of three technically acceptable attempts.",
      "samAligned": true,
      "hintCue": "A good attempt needs an airtight seal and a maximal, forceful exhalation."
    },
    {
      "id": "phys-peakflow-record",
      "unit": "f170",
      "area": 2,
      "section": "2.2.3",
      "type": "single",
      "level": "core",
      "stem": "A patient obtains three valid peak-flow readings: 390, 430 and 410 L/min. Which value should usually be recorded?",
      "options": [
        "430 L/min",
        "410 L/min",
        "390 L/min",
        "Mean = 410 L/min"
      ],
      "correct": 0,
      "model": "430 L/min",
      "explain": "The highest technically acceptable of three attempts is usually recorded.",
      "misconception": "Taking the mean is not the standard peak-flow recording convention.",
      "samAligned": true,
      "hintCue": "This test aims to measure maximal flow on a technically valid attempt, rather than an average."
    },
    {
      "id": "phys-tissue-order",
      "unit": "f170",
      "area": 2,
      "section": "2.2.1",
      "type": "order",
      "level": "core",
      "stem": "Order the biological levels from smallest to largest.",
      "items": [
        "Cell",
        "Tissue",
        "Organ",
        "Organ system"
      ],
      "model": "Cell → tissue → organ → organ system.",
      "explain": "Each higher level organises multiple components into coordinated functions.",
      "misconception": "An organ is made of several tissue types.",
      "samAligned": false,
      "hintCue": "Each level contains the preceding level; start from the smallest living component."
    },
    {
      "id": "phys-hepatic-blood",
      "unit": "f170",
      "area": 2,
      "section": "2.1.2",
      "type": "single",
      "level": "apply",
      "stem": "What does the hepatic portal vein mainly transport to the liver?",
      "options": [
        "Nutrient-rich blood from the gut",
        "Oxygenated blood from the left ventricle",
        "Urine from the kidneys",
        "Bile to the gallbladder"
      ],
      "correct": 0,
      "model": "Nutrient-rich venous blood from the gut",
      "explain": "The portal vein connects digestive capillary beds to the liver.",
      "misconception": "The hepatic artery, not the portal vein, provides much of the liver's oxygenated arterial supply.",
      "samAligned": false,
      "hintCue": "Consider what reaches the liver immediately after nutrients have crossed the intestinal wall."
    },
    {
      "id": "phys-ecg-explanation",
      "unit": "f170",
      "area": 2,
      "section": "2.2.3",
      "type": "written",
      "level": "apply",
      "stem": "A doctor suspects an abnormal electrical rhythm in the heart. Explain why an ECG is an appropriate investigation.",
      "markPoints": [
        "It records electrical potential changes associated with cardiac activity.",
        "An abnormal rhythm or timing pattern can be recognised from the trace."
      ],
      "model": "An ECG records electrical activity and allows heart rhythm and intervals to be assessed.",
      "explain": "The ECG does not directly measure blood flow or the diameter of a valve.",
      "misconception": "Do not claim an ECG is a photographic image of the heart.",
      "samAligned": false,
      "hintCue": "The suspected problem is electrical timing; which investigation records voltage changes?"
    },
    {
      "id": "phys-bone-dexa",
      "unit": "f170",
      "area": 2,
      "section": "2.1.3",
      "type": "single",
      "level": "core",
      "stem": "Which method is particularly useful for assessing low bone mineral density?",
      "options": [
        "DEXA scan",
        "ECG",
        "FeNO test",
        "Spirometry"
      ],
      "correct": 0,
      "model": "DEXA scan",
      "explain": "DEXA estimates bone mineral density; it can contribute to diagnosis of osteoporosis.",
      "misconception": "Heart and lung tests do not directly assess bone mineral density.",
      "samAligned": false,
      "hintCue": "Think about a measurement of mineral content rather than the lung or cardiac electrical activity."
    },
    {
      "id": "phys-transplant",
      "unit": "f170",
      "area": 2,
      "section": "2.1.4",
      "type": "multi",
      "level": "apply",
      "stem": "Which TWO are recognised limitations of organ transplantation?",
      "options": [
        "Immune rejection",
        "Limited supply of suitable donor organs",
        "No donor tissue can ever function",
        "Transplantation cannot restore physiological function"
      ],
      "correct": [
        0,
        1
      ],
      "model": "Rejection risk and donor-organ availability.",
      "explain": "Immunosuppression and matching reduce rejection risk, not abolish it.",
      "misconception": "A successful transplant can restore substantial organ function.",
      "samAligned": false,
      "hintCue": "Consider whether the recipient's immune system recognises foreign tissue and whether organs are available."
    },
    {
      "id": "phys-homeostasis-cross",
      "unit": "f170",
      "area": 2,
      "section": "2.2.2",
      "type": "written",
      "level": "stretch",
      "stem": "During exercise, explain how the circulatory and respiratory systems work together to support active skeletal muscles.",
      "markPoints": [
        "Ventilation helps replace oxygen in alveoli and remove carbon dioxide.",
        "Cardiac output and blood flow deliver oxygen and substrates to muscles.",
        "Blood transports carbon dioxide away from muscles."
      ],
      "model": "Increased ventilation supports gas exchange while increased blood flow supplies active muscles and removes carbon dioxide.",
      "explain": "A complete explanation links functions across systems.",
      "misconception": "Avoid saying the lungs pump oxygen directly into muscles.",
      "samAligned": false,
      "hintCue": "Connect ventilation in the lungs to the delivery and removal work of blood in muscle capillaries."
    },
    {
      "id": "endo-insulin-loop",
      "unit": "f170",
      "area": 3,
      "section": "3.1.1",
      "type": "order",
      "level": "apply",
      "stem": "Put these events in the physiological response to rising blood glucose in order.",
      "items": [
        "Plasma glucose concentration rises",
        "Pancreatic beta cells release more insulin",
        "Tissues increase glucose uptake and/or storage",
        "Blood glucose moves towards its normal range"
      ],
      "model": "Rise in glucose → insulin secretion → uptake/storage → fall towards normal range.",
      "explain": "This negative-feedback sequence opposes the original glucose change.",
      "misconception": "Glucagon is not the main hormone released in response to high glucose.",
      "samAligned": true,
      "hintCue": "Begin with the stimulus detected by the pancreas, then the signal, effector response, and correction."
    },
    {
      "id": "endo-hormone-match",
      "unit": "f170",
      "area": 3,
      "section": "3.1.1",
      "type": "match",
      "level": "core",
      "stem": "Match the hormone to its main function.",
      "pairs": [
        [
          "Insulin",
          "Lower plasma glucose"
        ],
        [
          "ADH",
          "Increase kidney water reabsorption"
        ],
        [
          "Erythropoietin",
          "Stimulate red blood cell production"
        ],
        [
          "Thyroxine",
          "Influence metabolic activity"
        ]
      ],
      "model": "Insulin → glucose regulation; ADH → water; EPO → red cells; thyroxine → metabolism.",
      "explain": "A hormone acts through cells bearing its receptors.",
      "misconception": "ADH does not directly lower glucose.",
      "samAligned": false,
      "hintCue": "Which hormone acts on the kidneys, which acts on blood glucose, and which stimulates marrow?"
    },
    {
      "id": "endo-type1",
      "unit": "f170",
      "area": 3,
      "section": "3.1.2",
      "type": "single",
      "level": "core",
      "stem": "Which change is central to type 1 diabetes?",
      "options": [
        "Autoimmune destruction of pancreatic beta cells",
        "Excess production of insulin by beta cells",
        "Loss of haemoglobin in red blood cells",
        "Increased secretion of ADH"
      ],
      "correct": 0,
      "model": "Autoimmune destruction of beta cells",
      "explain": "Loss of beta-cell function causes marked insulin deficiency.",
      "misconception": "Type 2 diabetes is not defined by autoimmune beta-cell destruction.",
      "samAligned": true,
      "hintCue": "The key defect originates in the insulin-secreting cells rather than kidney water regulation."
    },
    {
      "id": "endo-percent",
      "unit": "f170",
      "area": 3,
      "section": "3.1.2",
      "type": "number",
      "level": "apply",
      "stem": "A reference value is 100 mg/dL. A sample result is 118 mg/dL. Calculate the percentage by which the result exceeds the reference value.",
      "correct": 18,
      "tolerance": 0,
      "model": "18%",
      "explain": "Percentage increase = (118 − 100) ÷ 100 × 100 = 18%.",
      "misconception": "Divide by the reference value, not the result.",
      "samAligned": true,
      "answerUnit": "%",
      "hintCue": "Find the difference first; divide that difference by the original reference value."
    },
    {
      "id": "endo-closed-loop",
      "unit": "f170",
      "area": 3,
      "section": "3.1.2",
      "type": "written",
      "level": "stretch",
      "stem": "Give ONE advantage and ONE limitation of a closed-loop insulin delivery system for diabetes management.",
      "markPoints": [
        "Advantage: frequent sensor measurements can support timely insulin adjustments.",
        "Limitation: sensor delay/error, cannula issues or user input may still affect control."
      ],
      "model": "Continuous monitoring and automated adjustment can improve control, but devices still need checks and can fail.",
      "explain": "A closed-loop system uses a sensor, algorithm, and insulin delivery mechanism.",
      "misconception": "Not every system automatically manages food intake without user input.",
      "samAligned": true,
      "hintCue": "Think about how frequently a sensor can sample and what could happen if the sensor or delivery system fails."
    },
    {
      "id": "endo-ms-myelin",
      "unit": "f170",
      "area": 3,
      "section": "3.2.1",
      "type": "diagram",
      "level": "apply",
      "stem": "The highlighted interrupted segments surround a neuron axon. What does loss of this structure mainly impair?",
      "figure": "neuron",
      "options": [
        "Speed and reliability of saltatory conduction",
        "Chemical digestion in lysosomes",
        "Hormone synthesis by the pituitary",
        "DNA replication in the nucleus"
      ],
      "correct": 0,
      "model": "Saltatory conduction",
      "explain": "Myelin helps impulses travel rapidly between nodes of Ranvier; damage reduces efficient conduction.",
      "misconception": "Myelin is not a lumen through which impulses flow.",
      "samAligned": true,
      "hintCue": "Look at which insulating covering has gaps where the electrical signal is regenerated."
    },
    {
      "id": "endo-reflex-arc",
      "unit": "f170",
      "area": 3,
      "section": "3.2.1",
      "type": "order",
      "level": "apply",
      "stem": "Arrange the simplified pathway of a spinal withdrawal reflex.",
      "items": [
        "A stimulus activates a skin receptor",
        "A sensory neuron transmits a signal into the CNS",
        "The signal is relayed to a motor pathway",
        "A motor neuron activates a muscle effector"
      ],
      "model": "Receptor → sensory neuron → CNS relay → motor neuron → effector.",
      "explain": "The withdrawal pathway is coordinated through the spinal cord.",
      "misconception": "Conscious perception is not always required before the withdrawal begins.",
      "samAligned": false,
      "hintCue": "A signal starts at a receptor, passes to the CNS and then travels to an effector."
    },
    {
      "id": "endo-neuron",
      "unit": "f170",
      "area": 3,
      "section": "3.2.1",
      "type": "single",
      "level": "core",
      "stem": "Which neuron carries impulses from the central nervous system to an effector?",
      "options": [
        "Motor neuron",
        "Sensory neuron",
        "Receptor cell",
        "Glial cell"
      ],
      "correct": 0,
      "model": "Motor neuron",
      "explain": "Motor neurons transmit CNS signals towards effectors such as muscles.",
      "misconception": "Sensory neurons transmit impulses towards the CNS.",
      "samAligned": false,
      "hintCue": "Does the signal travel towards the central nervous system, or away from it?"
    },
    {
      "id": "endo-brain",
      "unit": "f170",
      "area": 3,
      "section": "3.2.2",
      "type": "match",
      "level": "core",
      "stem": "Match these brain regions with their common roles.",
      "pairs": [
        [
          "Cerebellum",
          "Movement coordination"
        ],
        [
          "Hypothalamus",
          "Homeostatic and endocrine regulation"
        ],
        [
          "Medulla oblongata",
          "Control of breathing and cardiovascular reflexes"
        ]
      ],
      "model": "Cerebellum → coordination; hypothalamus → homeostasis; medulla → vital autonomic centres.",
      "explain": "Functional descriptions are simplified; these brain regions interact.",
      "misconception": "A brain function need not be completely confined to one structure.",
      "samAligned": false,
      "hintCue": "Distinguish movement coordination from internal-state regulation and automatic respiratory control."
    },
    {
      "id": "endo-repro-hormones",
      "unit": "f170",
      "area": 3,
      "section": "3.3.2",
      "type": "match",
      "level": "apply",
      "stem": "Match reproductive hormones to their physiological roles.",
      "pairs": [
        [
          "FSH",
          "Supports follicle development or spermatogenesis"
        ],
        [
          "LH",
          "Triggers ovulation and stimulates Leydig cells"
        ],
        [
          "Progesterone",
          "Supports secretory endometrial changes"
        ],
        [
          "Testosterone",
          "Supports male-typical secondary sex traits"
        ]
      ],
      "model": "FSH → gamete support; LH → ovulation/Leydig cells; progesterone → endometrium; testosterone → male-typical traits.",
      "explain": "These hormones have different functions and feedback relationships.",
      "misconception": "LH is not the same hormone as progesterone.",
      "samAligned": false,
      "hintCue": "Separate the hormones released by the pituitary from steroids acting on reproductive tissues."
    },
    {
      "id": "endo-gametes",
      "unit": "f170",
      "area": 3,
      "section": "3.3.1",
      "type": "single",
      "level": "core",
      "stem": "Where do sperm typically mature after leaving the testes?",
      "options": [
        "Epididymis",
        "Ureter",
        "Prostate gland",
        "Seminal vesicle"
      ],
      "correct": 0,
      "model": "Epididymis",
      "explain": "Sperm transit and mature within the epididymis.",
      "misconception": "The ureter carries urine from kidney to bladder.",
      "samAligned": false,
      "hintCue": "The sperm leave their site of production before they are fully mature."
    },
    {
      "id": "endo-menopause",
      "unit": "f170",
      "area": 3,
      "section": "3.3.3",
      "type": "written",
      "level": "apply",
      "stem": "Explain why falling ovarian activity around menopause can lead to changes in menstruation and body temperature regulation.",
      "markPoints": [
        "Follicular function and oestrogen/progesterone secretion decline.",
        "Ovarian cycling and endometrial responses change, eventually ending periods.",
        "Reduced oestrogen can affect thermoregulatory pathways, contributing to vasomotor symptoms."
      ],
      "model": "Changes in ovarian hormone secretion alter menstrual cycling and can affect hypothalamic thermoregulation.",
      "explain": "Symptoms vary and clinical management depends on context.",
      "misconception": "Menopause is not caused by complete absence of all sex hormones.",
      "samAligned": false,
      "hintCue": "Link declining ovarian steroid secretion both to changes in the endometrium and to temperature control."
    },
    {
      "id": "micro-gram",
      "unit": "f170",
      "area": 4,
      "section": "4.1.1",
      "type": "single",
      "level": "core",
      "stem": "Which structural feature distinguishes many Gram-negative bacteria from Gram-positive bacteria?",
      "options": [
        "Outer membrane surrounding a thin peptidoglycan layer",
        "A membrane-bound nucleus containing linear chromosomes",
        "Numerous mitochondria in the cytoplasm producing ATP",
        "A complete absence of cytoplasmic ribosomes in the cell"
      ],
      "correct": 0,
      "model": "Outer membrane plus relatively thin peptidoglycan",
      "explain": "Gram-negative bacteria have an outer membrane containing lipopolysaccharide.",
      "misconception": "Both groups typically have ribosomes; bacteria lack nuclei.",
      "samAligned": false,
      "hintCue": "Focus on the layers outside the bacterial cell membrane, not structures unique to eukaryotes."
    },
    {
      "id": "micro-virus",
      "unit": "f170",
      "area": 4,
      "section": "4.1.5",
      "type": "multi",
      "level": "apply",
      "stem": "Which TWO statements about viruses are generally correct?",
      "options": [
        "Viruses require host-cell machinery to replicate",
        "All viruses have both DNA and RNA genomes",
        "A virion typically contains a protein capsid",
        "Viruses have 80S ribosomes"
      ],
      "correct": [
        0,
        2
      ],
      "model": "Host dependence and protein capsid",
      "explain": "A virus has a DNA or RNA genome enclosed by capsid proteins; some have envelopes.",
      "misconception": "Viruses lack ribosomes.",
      "samAligned": false,
      "hintCue": "Think about which cell machinery viruses lack, and what encloses their nucleic acid."
    },
    {
      "id": "micro-growth-curve",
      "unit": "f170",
      "area": 4,
      "section": "4.1.4",
      "type": "diagram",
      "level": "apply",
      "stem": "On the bacterial population growth curve, what is phase B?",
      "figure": "growth",
      "options": [
        "Exponential growth",
        "Stationary phase",
        "Decline phase",
        "Lag phase"
      ],
      "correct": 0,
      "model": "Exponential growth",
      "explain": "During this phase, cells divide rapidly and the population rises steeply.",
      "misconception": "A flat section can be a stationary phase, not exponential growth.",
      "samAligned": true,
      "hintCue": "Which labelled segment rises most rapidly while nutrients still support repeated doubling?"
    },
    {
      "id": "micro-doublings",
      "unit": "f170",
      "area": 4,
      "section": "4.1.4",
      "type": "number",
      "level": "apply",
      "stem": "A culture starts with 25 viable bacteria and undergoes 4 ideal population doublings. How many cells are there?",
      "correct": 400,
      "tolerance": 0,
      "model": "400 cells",
      "explain": "25 × 2⁴ = 25 × 16 = 400.",
      "misconception": "Four doublings multiply by 16, not by 4.",
      "samAligned": true,
      "answerUnit": "cells",
      "hintCue": "A doubling means multiply by two each generation, starting from the original population."
    },
    {
      "id": "micro-growth-rate",
      "unit": "f170",
      "area": 4,
      "section": "4.1.4",
      "type": "number",
      "level": "stretch",
      "stem": "The log10 viable cell count rises from 3 to 7 over 8 hours in an approximately linear segment. What is the mean rate of increase in log10 units per hour?",
      "correct": 0.5,
      "tolerance": 0.0001,
      "model": "0.5 log10 units h⁻¹",
      "explain": "Gradient = (7 − 3) ÷ 8 = 0.5 log10 units h⁻¹.",
      "misconception": "This is a log-scale gradient, not a change of 0.5 cells per hour.",
      "samAligned": true,
      "answerUnit": "log10 units h⁻¹",
      "hintCue": "On a log scale, find the change in log units and divide by elapsed time."
    },
    {
      "id": "micro-culture-phases",
      "unit": "f170",
      "area": 4,
      "section": "4.1.4",
      "type": "order",
      "level": "core",
      "stem": "Put these phases of a typical closed bacterial culture in order.",
      "items": [
        "Lag phase",
        "Exponential phase",
        "Stationary phase",
        "Decline phase"
      ],
      "model": "Lag → exponential → stationary → decline.",
      "explain": "Populations tend to stop increasing as nutrient availability, waste accumulation, and mortality change.",
      "misconception": "Stationary does not mean that all bacteria have stopped dividing.",
      "samAligned": false,
      "hintCue": "The population first adjusts, then divides quickly, then plateaus as resources become limiting."
    },
    {
      "id": "micro-aseptic",
      "unit": "f170",
      "area": 4,
      "section": "4.1.3",
      "type": "written",
      "level": "apply",
      "stem": "Name TWO reasons aseptic technique is important during a bacterial culture investigation.",
      "markPoints": [
        "Reduce contamination that could distort results.",
        "Limit accidental exposure, spread, or escape of cultured organisms."
      ],
      "model": "Avoid contamination of the culture and reduce exposure or spread.",
      "explain": "Laboratory procedures need a risk assessment for the organisms and materials involved.",
      "misconception": "A Bunsen flame alone does not make every microbial procedure safe.",
      "samAligned": true,
      "hintCue": "Consider both the validity of the culture results and protecting people or the surroundings."
    },
    {
      "id": "micro-hypha",
      "unit": "f170",
      "area": 4,
      "section": "4.1.2",
      "type": "single",
      "level": "core",
      "stem": "What is the fungal mycelium?",
      "options": [
        "A network of hyphae",
        "A bacterial chromosome",
        "A viral protein shell",
        "A kind of human connective tissue"
      ],
      "correct": 0,
      "model": "A network of hyphae",
      "explain": "Hyphae are branching filaments that help fungi grow through and absorb nutrients from substrates.",
      "misconception": "A mycelium is not one large viral particle.",
      "samAligned": false,
      "hintCue": "Look for the name of an interconnected network rather than an individual fungal filament."
    },
    {
      "id": "micro-fungus",
      "unit": "f170",
      "area": 4,
      "section": "4.1.2",
      "type": "short",
      "level": "core",
      "stem": "What is the medical term for athlete's foot?",
      "accepted": [
        "Tinea pedis"
      ],
      "model": "Tinea pedis",
      "explain": "This is a fungal skin infection commonly caused by dermatophytes such as Trichophyton.",
      "misconception": "Tinea is the infection name, not a genus of fungi.",
      "samAligned": false,
      "hintCue": "The diagnosis is a named fungal skin condition; the term has two words, the second refers to the foot."
    },
    {
      "id": "micro-microbiota",
      "unit": "f170",
      "area": 4,
      "section": "4.2",
      "type": "multi",
      "level": "apply",
      "stem": "Which TWO are credible roles of a healthy gut microbiota?",
      "options": [
        "Competition limiting some pathogens",
        "Production of certain vitamins",
        "Guaranteed prevention of all infections",
        "Manufacture of human antibodies"
      ],
      "correct": [
        0,
        1
      ],
      "model": "Colonisation resistance and some vitamin synthesis.",
      "explain": "Microbes can compete for nutrients and make useful metabolites.",
      "misconception": "Human plasma cells produce antibodies, not bacteria.",
      "samAligned": true,
      "hintCue": "Think of useful substances microbes can make and how resident organisms affect incoming pathogens."
    },
    {
      "id": "micro-probiotics",
      "unit": "f170",
      "area": 4,
      "section": "4.2",
      "type": "written",
      "level": "stretch",
      "stem": "A supplement advertises that it will permanently cure obesity by replacing intestinal bacteria. Explain TWO reasons to question that claim.",
      "markPoints": [
        "Changes to the microbiota are complex, variable, and may not persist.",
        "Evidence for treating obesity is not sufficient for a guaranteed cure; safety and clinical trials matter."
      ],
      "model": "Claims need controlled evidence; microbiota interventions may be variable or have risks.",
      "explain": "Do not extrapolate from a laboratory microbiota change to proven benefit in patients.",
      "misconception": "Recurrent C. difficile treatment should not be conflated with treating obesity.",
      "samAligned": false,
      "hintCue": "Separate a claimed biological mechanism from evidence that it improves outcomes in real patients."
    },
    {
      "id": "health-sign-symptom",
      "unit": "f171",
      "area": 1,
      "section": "1.1",
      "type": "match",
      "level": "core",
      "stem": "Match the description to the correct clinical term.",
      "pairs": [
        [
          "Sign",
          "Finding observed or measured by another person"
        ],
        [
          "Symptom",
          "Experience reported by the patient"
        ],
        [
          "Disease",
          "Disruption of normal structure or function with characteristic features"
        ]
      ],
      "model": "Sign → measured/observed; symptom → patient-reported; disease → pathological condition.",
      "explain": "Classification depends on how the information is obtained.",
      "misconception": "Pain is usually a symptom, whereas a measured fever is a sign.",
      "samAligned": true,
      "hintCue": "One term refers to something a patient experiences; the other to what can be observed or measured."
    },
    {
      "id": "health-copd",
      "unit": "f171",
      "area": 1,
      "section": "1.2.2",
      "type": "multi",
      "level": "apply",
      "stem": "Which TWO changes help explain persistent airflow limitation or poor gas exchange in smoking-related COPD?",
      "options": [
        "Impaired cilia leave more mucus in the airways",
        "Loss of alveolar walls reduces exchange surface and elastic recoil",
        "Less mucus is produced, leaving the airways easier to clear",
        "Greater elastic recoil makes expiration less effective"
      ],
      "correct": [
        0,
        1
      ],
      "model": "Impaired mucus clearance and loss of alveolar walls",
      "explain": "Mucus can obstruct smaller airways. Loss of alveolar walls reduces gas-exchange surface area and loss of recoil can make expiration harder.",
      "misconception": "Smoking does not improve alveolar diffusion surface area.",
      "samAligned": true,
      "hintCue": "Think about what smoke does to airway clearance and to the walls separating alveoli.",
      "assessmentRevision": 1,
      "optionFeedback": [
        null,
        null,
        "Damaged cilia clear mucus less effectively. Retained mucus can narrow the airways.",
        "Emphysema reduces elastic recoil, making it harder to drive air out of the lungs."
      ]
    },
    {
      "id": "health-disease",
      "unit": "f171",
      "area": 1,
      "section": "1.1",
      "type": "single",
      "level": "core",
      "stem": "Which example is a sign rather than a symptom?",
      "options": [
        "A measured blood pressure of 165/100 mmHg",
        "A patient reporting persistent episodes of dizziness",
        "A patient describing nausea after eating a meal",
        "A patient reporting intermittent pain in their leg"
      ],
      "correct": 0,
      "model": "A measured raised blood pressure",
      "explain": "Signs can be objectively observed or measured by an examiner.",
      "misconception": "Subjective sensations reported by patients are symptoms.",
      "samAligned": false,
      "hintCue": "Could another person measure the finding directly, without relying on the patient's description?"
    },
    {
      "id": "health-antibiotic-zones",
      "unit": "f171",
      "area": 2,
      "section": "2.1",
      "type": "single",
      "level": "apply",
      "stem": "A teaching laboratory compared existing records for two antibiotics against the same bacterial sample. Which conclusion follows from these fictional results?",
      "figure": null,
      "options": [
        "B had the larger zone in this test. The difference alone does not rank clinical effectiveness.",
        "B is clinically more effective because a 6 mm larger zone means a stronger treatment at any site.",
        "The carrier result establishes that differences in diffusion played no role.",
        "The zone sizes alone classify the sample as resistant to A and susceptible to B."
      ],
      "correct": 0,
      "model": "B had a larger measured zone under the test conditions. Clinical effectiveness and susceptibility need additional evidence.",
      "explain": "The measured zones differ by 6 mm. Zone size can depend on diffusion and the conditions. Susceptibility interpretation uses criteria for the relevant organism, drug and test.",
      "misconception": "An inhibition zone alone does not establish the best treatment for every patient.",
      "samAligned": true,
      "hintCue": "Separate what was measured on the plate from what would be needed to interpret the result.",
      "assessmentRevision": 1,
      "evidenceTable": {
        "caption": "Recorded clear-zone diameters",
        "columns": [
          "Disc",
          "Diameter (mm)"
        ],
        "rows": [
          [
            "Antibiotic A",
            "14"
          ],
          [
            "Antibiotic B",
            "20"
          ],
          [
            "Carrier only",
            "No clear zone"
          ]
        ],
        "focus": [
          [
            0,
            1
          ],
          [
            1,
            1
          ]
        ]
      },
      "optionFeedback": [
        null,
        "This measures inhibition in a test. Treatment effects also depend on whether suitable concentrations reach the site and other clinical factors.",
        "The carrier result checks whether the carrier appeared to inhibit growth. Different substances can still diffuse differently.",
        "A diameter needs a relevant validated interpretation criterion before it can support a susceptibility category."
      ],
      "independentFollowups": [
        "health-antibiotic-control-v2"
      ]
    },
    {
      "id": "health-antibiotic-control",
      "unit": "f171",
      "area": 2,
      "section": "2.1",
      "type": "single",
      "level": "apply",
      "stem": "Why include a disc containing only solvent in an agar diffusion test?",
      "options": [
        "Estimate the contribution of the solvent to any clear zone",
        "Estimate how much zone size varies across repeats",
        "Estimate the effect of the antibiotic dose on zone size",
        "Estimate the effect of the type of bacterium on zone size"
      ],
      "correct": 0,
      "model": "To check for an effect of the solvent",
      "explain": "A negative control can help attribute inhibition to the antibiotic rather than its carrier.",
      "misconception": "Without a control, an observed effect may have an alternative explanation.",
      "samAligned": true,
      "hintCue": "Ask whether the liquid used to deliver the drug could itself have an effect.",
      "assessmentRevision": 1,
      "optionFeedback": [
        null,
        "Repeated readings estimate variation. A solvent-only comparison asks whether the carrier contributed to inhibition.",
        "A concentration comparison needs results at different doses. The solvent-only result checks for an effect of the carrier.",
        "A comparison between organisms needs data from both. The control isolates the effect of the carrier."
      ],
      "independentFollowups": [
        "health-antibiotic-control-v2"
      ]
    },
    {
      "id": "health-antibody",
      "unit": "f171",
      "area": 3,
      "section": "3.1",
      "type": "diagram",
      "level": "core",
      "stem": "What region of the simplified antibody is labelled A?",
      "figure": "antibody",
      "options": [
        "Antigen-binding region at the tip",
        "Constant region at the base",
        "Flexible hinge between the arms",
        "Bond joining a light and heavy chain"
      ],
      "correct": 0,
      "model": "Antigen-binding region",
      "explain": "The tips of the Y-shaped antibody contain variable regions that bind specific antigens.",
      "misconception": "The stem is the Fc region, not the antigen-binding site.",
      "samAligned": true,
      "hintCue": "Identify the region that makes specific contact with an antigen rather than the constant stem.",
      "assessmentRevision": 1,
      "optionFeedback": [
        null,
        "The base is the Fc region. Label A points to an arm tip.",
        "The hinge is where the two arms can flex relative to the base. A points farther out.",
        "The bond helps hold chains together. The tip forms the region that recognises the antigen."
      ],
      "independentFollowups": [
        "p-f171-antigen-antibody-complex-diagnostic"
      ]
    },
    {
      "id": "health-bp-repeat",
      "unit": "f171",
      "area": 4,
      "section": "4.1",
      "type": "multi",
      "level": "apply",
      "stem": "Which TWO changes improve the comparability of repeated clinic measurements of resting blood pressure?",
      "options": [
        "Allow a comparable period of quiet rest",
        "Use an appropriately sized cuff",
        "Repeat just after walking to reproduce typical activity",
        "Use a narrower cuff to detect smaller differences"
      ],
      "correct": [
        0,
        1
      ],
      "model": "Quiet rest under comparable conditions and an appropriately sized cuff",
      "explain": "Standardised technique helps reduce preventable measurement error.",
      "misconception": "A single high clinic reading is not always sufficient for a final diagnosis.",
      "samAligned": true,
      "hintCue": "Measurement conditions should remain stable, with the correct cuff for the patient's arm.",
      "assessmentRevision": 1,
      "optionFeedback": [
        null,
        null,
        "Recent activity can change blood pressure. To compare resting readings, take them under comparable rested conditions.",
        "A cuff that is too small for the arm can bias the result. Select the cuff size to suit the arm."
      ],
      "independentFollowups": [
        "p-f171-monitoring-repeats-diagnostic"
      ]
    },
    {
      "id": "health-peakflow",
      "unit": "f171",
      "area": 4,
      "section": "4.1",
      "type": "multi",
      "level": "apply",
      "stem": "Which TWO steps would undermine a reliable peak-flow measurement?",
      "options": [
        "Leaning forwards in an inconsistent position",
        "Leaving a gap between the lips and mouthpiece",
        "Resetting the marker to the start",
        "Blowing hard and fast after full inhalation"
      ],
      "correct": [
        0,
        1
      ],
      "model": "Inconsistent posture and poor mouthpiece seal",
      "explain": "A poor seal lets air escape; position and effort affect measurements.",
      "misconception": "Choose a technically valid, maximal reading.",
      "samAligned": true,
      "hintCue": "Think about actions that cause air to escape elsewhere or change the way the test is performed."
    },
    {
      "id": "health-count-mean",
      "unit": "f171",
      "area": 4,
      "section": "4.2.2",
      "type": "number",
      "level": "apply",
      "stem": "Five platelet counts are 95, 105, 100, 90 and 110 (same units). Calculate the mean.",
      "correct": 100,
      "tolerance": 0,
      "model": "100",
      "explain": "Total = 500; divide by 5 = 100.",
      "misconception": "Count observations and retain any requested units/precision.",
      "samAligned": true,
      "answerUnit": "given units",
      "hintCue": "Add the five values and divide by the number of measurements."
    },
    {
      "id": "health-care-records",
      "unit": "f171",
      "area": 5,
      "section": "5.3",
      "type": "written",
      "level": "stretch",
      "stem": "A community respiratory clinic is considering an electronic record system that could securely share information with nearby hospitals. Staff expect faster access to results, but are concerned about setup costs, cybersecurity and the system being unavailable during outages. Discuss whether the clinic should introduce the new system.",
      "markPoints": [
        "Explain how faster access to records could improve continuity or coordination of care.",
        "Explain how appropriate sharing across services might reduce duplicated testing or communication errors.",
        "Consider a limitation such as implementation cost, training demands, or staff workload during transition.",
        "Consider risks to confidentiality, cybersecurity, availability during outages, or unequal patient access.",
        "Discuss practical mitigations such as role-based access, backups, audits, and staff training.",
        "Discuss the relative importance of the benefits and risks for this clinic, and reach a justified judgement with conditions."
      ],
      "model": "Electronic records could reduce delays and help clinicians share relevant results when patients move between services. However, training, cost, confidentiality and downtime are substantial practical issues. A phased rollout with access controls, secure backups, staff training and auditing may be justified if the clinic can sustain those safeguards; a different conclusion could be reasonable if supported.",
      "explain": "Strong evaluation weighs advantages against limitations, applies both to the scenario and reaches a supported judgement. There is no single mandatory conclusion.",
      "misconception": "'Digital is always better' is not an evaluation.",
      "samAligned": true,
      "marks": 9,
      "levelsNote": "For OCR-style 9-mark DISCUSS practice, consider both sides in context, evaluate their relative importance and conclude with a reasoned judgement. This is not OCR's official mark scheme.",
      "hintCue": "Use the specific clinic context: access to results, training, security, continuity, and outages."
    },
    {
      "id": "health-parkinsons-therapy",
      "unit": "f171",
      "area": 2,
      "section": "2.2",
      "type": "written",
      "level": "stretch",
      "stem": "A patient with early Parkinson's disease experiences hand tremor, slower movement, and anxiety about maintaining independence. Analyse how medication and non-drug therapies might affect the patient's symptoms and day-to-day functioning.",
      "markPoints": [
        "Identify an appropriate medication option as a possible way of managing motor symptoms.",
        "Explain a plausible benefit for tremor, rigidity, or bradykinesia, while noting individual response varies.",
        "Explain a relevant limitation or adverse effect of medication.",
        "Describe physiotherapy, occupational therapy or psychological support relevant to this patient's needs.",
        "Link non-drug support to functional independence, mobility, daily activities, or anxiety.",
        "Make a contextualised judgement about combining or sequencing approaches and review as needs change."
      ],
      "model": "Drug treatment may help some motor symptoms, although side effects and timing need individual consideration. Physiotherapy can support mobility and balance; occupational therapy can help daily activities, while psychological support may help anxiety. A tailored combination with regular review may protect independence better than assuming one intervention will address every need.",
      "explain": "Explain mechanisms or functions where relevant, link therapies to the patient's symptoms and compare benefits with limitations; there is no universal treatment sequence.",
      "misconception": "Do not equate supportive therapy with a lack of biological effect.",
      "samAligned": true,
      "marks": 6,
      "levelsNote": "For OCR-style 6-mark ANALYSE practice, develop causal links between treatments, effects, benefits, and limitations in the given context. This is not OCR's official mark scheme.",
      "hintCue": "Compare how a medicine and a supportive intervention affect both motor signs and daily independence."
    },
    {
      "id": "health-immunisation",
      "unit": "f171",
      "area": 3,
      "section": "3.2.2",
      "type": "single",
      "level": "core",
      "stem": "Why can a vaccinated person mount a faster specific response on later exposure to the same antigen?",
      "options": [
        "Antigen-specific memory cells can respond and multiply rapidly",
        "The vaccine supplies antibodies that keep multiplying after vaccination",
        "Antigen remains in the blood and directly neutralises the pathogen",
        "Memory cells engulf matching pathogens before any other cells respond"
      ],
      "correct": 0,
      "model": "Antigen-specific memory lymphocytes enable a faster response",
      "explain": "Memory lymphocytes can support a more rapid specific response to the same antigen.",
      "misconception": "Immunity is not always sterilising or lifelong.",
      "samAligned": false,
      "hintCue": "Think about why later exposure can evoke a more rapid antibody response.",
      "assessmentRevision": 1,
      "optionFeedback": [
        null,
        "Antibodies are proteins. They cannot divide. Activated lymphocytes can proliferate.",
        "Antigen provides the target recognised during a response. It does not neutralise the pathogen.",
        "Some phagocytes engulf material. Memory lymphocytes help organise a faster specific response."
      ],
      "independentFollowups": [
        "health-immunisation-v2"
      ]
    },
    {
      "id": "health-casts",
      "unit": "f171",
      "area": 2,
      "section": "2.1",
      "type": "multi",
      "level": "apply",
      "stem": "Which TWO potential advantages can modern fibreglass casts have over traditional plaster casts?",
      "options": [
        "Lower weight",
        "Greater resistance to water damage",
        "Guaranteed elimination of swelling",
        "No requirement for clinical fitting"
      ],
      "correct": [
        0,
        1
      ],
      "model": "Typically lighter and more water resistant.",
      "explain": "Material characteristics affect use; padding and fitting still matter.",
      "misconception": "Fibreglass casts are not automatically completely waterproof.",
      "samAligned": true,
      "hintCue": "Compare typical mass and moisture resistance, without assuming either material removes clinical risks."
    },
    {
      "id": "health-screening",
      "unit": "f171",
      "area": 4,
      "section": "4.2.1",
      "type": "written",
      "level": "apply",
      "stem": "A screening result is positive. Explain why this does not automatically mean that the patient has the condition.",
      "markPoints": [
        "Screening tests may give false-positive results.",
        "Predictive value depends on prevalence and test performance; diagnostic follow-up may be needed."
      ],
      "model": "A positive screen indicates further assessment may be necessary; it does not establish a diagnosis.",
      "explain": "Distinguish screening from a definitive diagnostic test.",
      "misconception": "A positive result is not a diagnosis in every context.",
      "samAligned": true,
      "hintCue": "A positive test can occur even in someone who does not have the condition."
    },
    {
      "id": "health-infection-control",
      "unit": "f171",
      "area": 2,
      "section": "2.1",
      "type": "single",
      "level": "apply",
      "stem": "Which process most directly selects for existing antibiotic-resistant bacteria during antibiotic exposure?",
      "options": [
        "Susceptible bacteria die while resistant variants survive and multiply",
        "Every bacterium deliberately mutates its DNA until it becomes resistant",
        "Antibiotic exposure changes viruses into antibiotic-resistant bacterial cells",
        "Immune cells transfer genes for antibiotic resistance into bacterial genomes"
      ],
      "correct": 0,
      "model": "Selection of resistant variants",
      "explain": "Antibiotic pressure favours bacteria carrying resistance determinants.",
      "misconception": "Resistance arises by genetic change or acquisition; antibiotics do not create purposeful adaptive mutations.",
      "samAligned": false,
      "hintCue": "Consider what happens to bacterial variants that were already less susceptible to the drug."
    },
    {
      "id": "health-therapy-categories",
      "unit": "f171",
      "area": 2,
      "section": "2.1",
      "type": "match",
      "level": "core",
      "stem": "Match the treatment approach to its main objective.",
      "pairs": [
        [
          "Preventative",
          "Reduce the chance of disease or complications"
        ],
        [
          "Curative",
          "Eliminate the underlying disease when possible"
        ],
        [
          "Supportive",
          "Reduce symptoms or improve function/quality of life"
        ]
      ],
      "model": "Preventative → reduce risk; curative → eliminate disease; supportive → maintain function/comfort.",
      "explain": "A real intervention can have more than one purpose.",
      "misconception": "Supportive treatment is not the same as doing nothing.",
      "samAligned": false,
      "hintCue": "Ask whether each intervention prevents disease, removes its cause or supports the person's function.",
      "correctionHint": "Ask whether the approach aims to remove a cause, relieve effects, or reduce the chance of future disease."
    },
    {
      "id": "health-therapy-eval",
      "unit": "f171",
      "area": 2,
      "section": "2.2",
      "type": "written",
      "level": "stretch",
      "stem": "A hospital is considering a new treatment that improves mobility but has substantial adverse effects. State a reasoned approach to deciding whether to offer it.",
      "markPoints": [
        "Compare likely clinical benefits against adverse effects and uncertainty.",
        "Consider the patient's goals, preferences, and informed consent.",
        "Use reliable evidence, individual context, and monitoring plans."
      ],
      "model": "Compare benefits and harms using evidence, then support a decision reflecting patient goals and informed choice.",
      "explain": "Risk-benefit decisions vary by patient and treatment context.",
      "misconception": "A treatment should not be adopted purely because it is new.",
      "samAligned": false,
      "hintCue": "Compare likely improvement in function with the severity and probability of harms for this patient."
    },
    {
      "id": "health-ethics-data",
      "unit": "f171",
      "area": 5,
      "section": "5.3",
      "type": "multi",
      "level": "apply",
      "stem": "Which TWO principles protect patient confidentiality in a clinical research dataset?",
      "options": [
        "Restrict access to authorised users",
        "Remove or minimise directly identifying data where practicable",
        "Publish all names beside laboratory values",
        "Share unencrypted identifiable data indiscriminately"
      ],
      "correct": [
        0,
        1
      ],
      "model": "Access control and data minimisation",
      "explain": "Appropriate permissions, security, and governance protect confidential information.",
      "misconception": "Anonymisation must be assessed; stripping names alone may not prevent re-identification.",
      "samAligned": false,
      "hintCue": "Consider whether identifying information is essential and who needs permission to view it."
    },
    {
      "id": "health-review-charts",
      "unit": "f171",
      "area": 5,
      "section": "5.2",
      "type": "single",
      "level": "apply",
      "stem": "How could a bar chart's y-axis starting well above zero affect the visual interpretation of counts?",
      "options": [
        "It may make differences between counts appear much larger than they are",
        "It makes the smallest count on the chart become equal to zero",
        "It converts the original observed counts into percentages",
        "It removes random variation from the values used for each bar"
      ],
      "correct": 0,
      "model": "A truncated y-axis can exaggerate the visual differences between counts.",
      "explain": "The numerical values remain unchanged, but the displayed bar-height differences can be misleading.",
      "misconception": "Bar charts representing counts are usually most interpretable when the vertical scale starts at zero.",
      "samAligned": false,
      "hintCue": "If zero is hidden from a count axis, small numeric differences can occupy much more visual space."
    },
    {
      "id": "warm-f170-cells",
      "unit": "f170",
      "area": 1,
      "section": "1.1.1",
      "type": "single",
      "level": "warmup",
      "warmup": true,
      "stem": "Which structure controls movement into and out of a human cell?",
      "options": [
        "Cell-surface membrane",
        "Nuclear envelope",
        "Ribosome",
        "Nucleolus"
      ],
      "correct": 0,
      "model": "Cell-surface membrane",
      "explain": "Its lipid bilayer and proteins support selective exchange.",
      "misconception": "Distinguish the defining function from related but different biological ideas.",
      "hints": [
        "Recall the main function before checking the options.",
        "Think about the boundary between the whole cell and its environment."
      ],
      "samAligned": false,
      "onRamp": true,
      "hintCue": "Imagine the cell as a room: which structure controls what crosses between inside and outside?"
    },
    {
      "id": "warm-f170-physiology",
      "unit": "f170",
      "area": 2,
      "section": "2.2.1",
      "type": "single",
      "level": "warmup",
      "warmup": true,
      "stem": "Which organ pumps blood through the human circulatory system?",
      "options": [
        "Heart",
        "Liver",
        "Kidney",
        "Lung"
      ],
      "correct": 0,
      "model": "Heart",
      "explain": "Cardiac muscle contracts to move blood through pulmonary and systemic vessels.",
      "misconception": "Distinguish the defining function from related but different biological ideas.",
      "hints": [
        "Recall the main function before checking the options.",
        "Which organ contains myocardium?"
      ],
      "samAligned": false,
      "onRamp": true,
      "hintCue": "Which muscular organ contracts to produce a pulse in the arteries?"
    },
    {
      "id": "warm-f170-endocrine",
      "unit": "f170",
      "area": 3,
      "section": "3.1.1",
      "type": "single",
      "level": "warmup",
      "warmup": true,
      "stem": "Which hormone lowers blood glucose after a meal?",
      "options": [
        "Insulin",
        "Glucagon",
        "Adrenaline",
        "ADH"
      ],
      "correct": 0,
      "model": "Insulin",
      "explain": "Pancreatic beta cells secrete insulin as blood glucose rises.",
      "misconception": "Distinguish the defining function from related but different biological ideas.",
      "hints": [
        "Recall the main function before checking the options.",
        "Think of the hormone made by pancreatic beta cells."
      ],
      "samAligned": false,
      "hintCue": "Which hormone is released when the pancreas detects a rise in plasma glucose?"
    },
    {
      "id": "warm-f170-microbes",
      "unit": "f170",
      "area": 4,
      "section": "4.1.5",
      "type": "single",
      "level": "warmup",
      "warmup": true,
      "stem": "Which structure is not present in viruses as a group?",
      "options": [
        "Ribosomes",
        "Protein capsid",
        "Genetic material",
        "Lipid envelope in some viruses"
      ],
      "correct": 0,
      "model": "Ribosomes",
      "explain": "Viruses rely on host cells to synthesise viral proteins.",
      "misconception": "Distinguish the defining function from related but different biological ideas.",
      "hints": [
        "Recall the main function before checking the options.",
        "Think about why a virus cannot independently translate proteins."
      ],
      "samAligned": false,
      "hintCue": "Think about the machinery a virus must borrow from a living host to build proteins."
    },
    {
      "id": "warm-f171-disease",
      "unit": "f171",
      "area": 1,
      "section": "1.1",
      "type": "single",
      "level": "warmup",
      "warmup": true,
      "stem": "Which is a symptom rather than a sign?",
      "options": [
        "Pain reported by a patient",
        "A measured pulse rate",
        "An observed rash",
        "A measured fever"
      ],
      "correct": 0,
      "model": "Pain reported by a patient",
      "explain": "Symptoms are experiences reported by patients; signs can be observed or measured.",
      "misconception": "Distinguish the defining function from related but different biological ideas.",
      "hints": [
        "Recall the main function before checking the options.",
        "Ask whether the information was reported or measured."
      ],
      "samAligned": false,
      "hintCue": "Ask whether this information can be directly measured by the examiner."
    },
    {
      "id": "warm-f171-therapy",
      "unit": "f171",
      "area": 2,
      "section": "2.1",
      "type": "single",
      "level": "warmup",
      "warmup": true,
      "stem": "Which is an example of supportive treatment?",
      "options": [
        "Physiotherapy to maintain function in progressive disease",
        "Antibiotics eliminating a susceptible bacterial infection",
        "Surgery removing a localised tumour",
        "Vaccination to prevent infection"
      ],
      "correct": 0,
      "model": "Physiotherapy to maintain function",
      "explain": "Supportive treatment can improve symptoms and independence without necessarily removing the underlying disorder.",
      "misconception": "Distinguish the defining function from related but different biological ideas.",
      "hints": [
        "Recall the main function before checking the options.",
        "Which option focuses primarily on daily function?"
      ],
      "samAligned": false,
      "hintCue": "Look for an intervention aimed at maintaining function rather than eliminating the disease."
    },
    {
      "id": "warm-f171-immunity",
      "unit": "f171",
      "area": 3,
      "section": "3.1",
      "type": "single",
      "level": "warmup",
      "warmup": true,
      "stem": "Which cells can become antibody-secreting plasma cells?",
      "options": [
        "B lymphocytes",
        "Erythrocytes",
        "Platelets",
        "Ciliated epithelial cells"
      ],
      "correct": 0,
      "model": "B lymphocytes",
      "explain": "Activated B lymphocytes can differentiate into plasma cells that secrete antibodies.",
      "misconception": "Distinguish the defining function from related but different biological ideas.",
      "hints": [
        "Recall the main function before checking the options.",
        "Which lymphocytes mediate the humoral immune response?"
      ],
      "samAligned": false,
      "hintCue": "Which type of lymphocyte is involved in the humoral rather than cellular immune response?"
    },
    {
      "id": "warm-f171-diagnostics",
      "unit": "f171",
      "area": 4,
      "section": "4.1",
      "type": "single",
      "level": "warmup",
      "warmup": true,
      "stem": "Which test records the electrical activity of the heart?",
      "options": [
        "ECG",
        "Spirometry",
        "Peak-flow measurement",
        "DEXA scanning"
      ],
      "correct": 0,
      "model": "ECG",
      "explain": "An electrocardiogram records changes in electrical potential associated with cardiac activity.",
      "misconception": "Distinguish the defining function from related but different biological ideas.",
      "hints": [
        "Recall the main function before checking the options.",
        "Which instrument records a voltage-time trace?"
      ],
      "samAligned": false,
      "hintCue": "Which test produces a trace of voltage changes rather than an image or airflow reading?"
    },
    {
      "id": "warm-f171-data",
      "unit": "f171",
      "area": 5,
      "section": "5.3",
      "type": "single",
      "level": "warmup",
      "warmup": true,
      "stem": "What is a principal reason to minimise identifying information in a clinical dataset?",
      "options": [
        "To protect patient privacy",
        "To increase instrument resolution",
        "To remove statistical variation",
        "To guarantee no further privacy risks"
      ],
      "correct": 0,
      "model": "To protect patient privacy",
      "explain": "De-identification reduces risk but does not always eliminate re-identification possibilities.",
      "misconception": "Distinguish the defining function from related but different biological ideas.",
      "hints": [
        "Recall the main function before checking the options.",
        "This concerns confidentiality, not the quality of instruments."
      ],
      "samAligned": false,
      "hintCue": "Identifying data could expose confidential information about a patient."
    },
    {
      "id": "best-f170-magnification",
      "unit": "f170",
      "area": 1,
      "section": "1.1.2",
      "type": "best",
      "level": "apply",
      "stem": "Which calculation explanation is correct, and which reason supports it?",
      "options": [
        "Magnification equals image size divided by actual size, using consistent units.",
        "Magnification equals actual size divided by image size, using consistent units.",
        "Magnification is the sum of image size and actual size, in matching units.",
        "Magnification is image size multiplied by actual size, after unit conversion."
      ],
      "correct": 0,
      "reasons": [
        "Magnification is the ratio of image dimensions to the object's actual dimensions.",
        "Microscope magnification depends only on the eyepiece lens.",
        "Consistent units mean either quantity can be used as the numerator.",
        "Magnification compares the image and specimen by adding their lengths."
      ],
      "reasonCorrect": 0,
      "model": "Magnification = image size ÷ actual size.",
      "explain": "Both sizes must be in the same unit before calculating a dimensionless ratio.",
      "misconception": "Dividing actual size by image size produces the reciprocal.",
      "hints": [
        "Decide which explanation is scientifically accurate before looking at the reasons.",
        "Recheck which dimension is made larger in the image."
      ],
      "samAligned": false,
      "hintCue": "The numerator of the ratio is the length measured on the image, not the specimen itself."
    },
    {
      "id": "best-f170-insulin",
      "unit": "f170",
      "area": 3,
      "section": "3.1.1",
      "type": "best",
      "level": "apply",
      "stem": "Which account of insulin action is biologically accurate? Select the best supporting reason.",
      "options": [
        "Insulin acts on target cells to increase glucose uptake or storage, lowering blood glucose.",
        "Insulin acts as an enzyme that directly destroys glucose molecules circulating in plasma.",
        "Insulin is released from pancreatic alpha cells and raises plasma glucose.",
        "Insulin is produced by kidney cells and changes glucose filtration directly."
      ],
      "correct": 0,
      "reasons": [
        "Insulin is a hormone that binds receptors and modifies target-cell activity.",
        "Insulin hydrolyses glucose because it contains an enzyme active site.",
        "Insulin changes blood glucose by raising the secretion of glucagon.",
        "Insulin stimulates the liver to convert glycogen into glucose for release."
      ],
      "reasonCorrect": 0,
      "model": "Insulin affects cells through receptor-mediated signalling.",
      "explain": "It is not an enzyme that chemically digests glucose in the circulation.",
      "misconception": "Hormones are not necessarily catalysts.",
      "hints": [
        "Decide which explanation is scientifically accurate before looking at the reasons.",
        "How does a hormone signal to a target cell?"
      ],
      "samAligned": false,
      "hintCue": "The signal must bind to a receptor; hormones are not enzymes that digest blood glucose."
    },
    {
      "id": "best-f170-myelin",
      "unit": "f170",
      "area": 3,
      "section": "3.2.1",
      "type": "best",
      "level": "apply",
      "stem": "Which statement best describes how myelin improves impulse conduction?",
      "options": [
        "Myelin insulates axons so impulses travel rapidly between nodes of Ranvier.",
        "Myelin contains fluid that conducts impulses down the centre of the sheath.",
        "Myelin acts as a chemical neurotransmitter between adjacent nerve cells.",
        "Myelin increases speed by creating extra synapses along the same axon."
      ],
      "correct": 0,
      "reasons": [
        "Action potentials are regenerated at specialised sites on the axon membrane.",
        "The sheath produces electrical impulses independently of the neuron.",
        "The sheath replaces synapses between each pair of neurons.",
        "More synapses along an axon increase the speed of impulse propagation."
      ],
      "reasonCorrect": 0,
      "model": "Myelin supports saltatory conduction along an axon.",
      "explain": "Impulse propagation depends on membrane excitability, especially at nodes.",
      "misconception": "The sheath is not a hollow channel for impulses.",
      "hints": [
        "Decide which explanation is scientifically accurate before looking at the reasons.",
        "Where are action potentials regenerated?"
      ],
      "samAligned": false,
      "hintCue": "Focus on electrical activity at the gaps between insulating segments along the axon."
    },
    {
      "id": "best-f170-culture",
      "unit": "f170",
      "area": 4,
      "section": "4.1.4",
      "type": "best",
      "level": "apply",
      "stem": "Which interpretation of the stationary phase of a bacterial growth curve is most defensible?",
      "options": [
        "Cell division may continue while the number of cells dying approximately balances new cells.",
        "Every bacterial cell permanently stops dividing once the culture reaches stationary phase.",
        "The population stops rising because all bacterial cells have been destroyed.",
        "The total number rises steadily but the graph appears flat because time stops."
      ],
      "correct": 0,
      "reasons": [
        "Stationary describes an approximately constant net population, not necessarily total inactivity.",
        "Binary fission cannot occur in a closed container of nutrient broth.",
        "An unchanged total cell number proves that no cell has died.",
        "In stationary phase the population grows exponentially but the graph conceals it."
      ],
      "reasonCorrect": 0,
      "model": "Population stability can coexist with individual cell division and death.",
      "explain": "In a closed culture, growth can become limited as nutrient supply changes and waste accumulates.",
      "misconception": "Stationary does not mean all cells are dormant.",
      "hints": [
        "Decide which explanation is scientifically accurate before looking at the reasons.",
        "What does the graph tell you about the net count, rather than each cell?"
      ],
      "samAligned": false,
      "hintCue": "A flat population graph describes a net total, not whether any individual bacterium is dividing."
    },
    {
      "id": "best-f171-antibiotics",
      "unit": "f171",
      "area": 2,
      "section": "2.1",
      "type": "best",
      "level": "apply",
      "stem": "Which clinical conclusion follows from a large zone of inhibition around an antibiotic disc?",
      "options": [
        "Growth was inhibited under test conditions; treating a patient needs more evidence.",
        "The antibiotic is guaranteed to cure infections caused by every strain of that species.",
        "The largest zone proves that the disc contains the greatest dose of drug.",
        "The zone confirms the exact antibiotic dose needed for every patient."
      ],
      "correct": 0,
      "reasons": [
        "A zone is influenced by testing conditions and does not directly establish clinical effectiveness.",
        "The agar and all human tissues maintain the same antibiotic concentration.",
        "All strains of one bacterial species respond identically to the same drug.",
        "A zone directly measures the safe dose of a drug in the patient's bloodstream."
      ],
      "reasonCorrect": 0,
      "model": "An agar result supports a limited laboratory conclusion.",
      "explain": "Drug distribution, safety, susceptibility and the clinical context also affect treatment.",
      "misconception": "Do not infer guaranteed patient outcomes from a single agar result.",
      "hints": [
        "Decide which explanation is scientifically accurate before looking at the reasons.",
        "What is actually measured on the agar plate?"
      ],
      "samAligned": false,
      "hintCue": "What can you conclude about microbial growth on agar, and what remains unknown about a patient?"
    },
    {
      "id": "best-f171-screening",
      "unit": "f171",
      "area": 4,
      "section": "4.2.1",
      "type": "best",
      "level": "apply",
      "stem": "Which interpretation of a positive screening result is justified?",
      "options": [
        "The result may require diagnostic confirmation because false positives can occur.",
        "A positive screen definitively establishes disease regardless of prevalence.",
        "A positive screening result has no value until symptoms develop.",
        "A positive screening result is proof that treatment must start immediately."
      ],
      "correct": 0,
      "reasons": [
        "Predictive value depends partly on test sensitivity, specificity, and condition prevalence.",
        "All screening tests have complete specificity.",
        "A screening result is always the same as a definitive diagnosis.",
        "Screening identifies all affected people without any diagnostic uncertainty."
      ],
      "reasonCorrect": 0,
      "model": "Screening is distinct from confirming a diagnosis.",
      "explain": "Even useful screening tests can produce false-positive results.",
      "misconception": "A test's positive predictive value depends on context.",
      "hints": [
        "Decide which explanation is scientifically accurate before looking at the reasons.",
        "What would happen if a test occasionally misclassified a healthy patient?"
      ],
      "samAligned": false,
      "hintCue": "Screening performance and how common a disease is both affect what a positive result means."
    },
    {
      "id": "error-f170-sphase",
      "unit": "f170",
      "area": 1,
      "section": "1.1.5",
      "type": "single",
      "subtype": "error",
      "level": "apply",
      "stem": "A pupil writes: ‘Mitosis is the stage of the cell cycle when DNA is copied.’ Which correction is appropriate?",
      "options": [
        "DNA replication takes place during S phase of interphase.",
        "DNA replication normally takes place during metaphase.",
        "DNA replication is the same event as cytokinesis.",
        "DNA replication normally takes place after telophase."
      ],
      "correct": 0,
      "model": "DNA replicates in S phase of interphase.",
      "explain": "Mitosis divides a nucleus and is not the DNA synthesis phase.",
      "misconception": "Interphase contains several phases; S phase is the precise answer.",
      "hints": [
        "Identify the statement that contradicts the underlying biological mechanism.",
        "Check whether the student's wording confuses a process with a related but different process."
      ],
      "samAligned": false,
      "hintCue": "DNA must be copied before chromatids can be separated at nuclear division."
    },
    {
      "id": "error-f170-adh",
      "unit": "f170",
      "area": 3,
      "section": "3.1.1",
      "type": "single",
      "subtype": "error",
      "level": "apply",
      "stem": "A student writes: ‘ADH increases urine volume by reducing the permeability of collecting ducts to water.’ Which correction makes the mechanism accurate?",
      "options": [
        "ADH increases collecting-duct water permeability and reduces urine volume.",
        "ADH decreases collecting-duct water permeability and reduces urine volume.",
        "ADH makes water move by active transport directly into the urine.",
        "ADH acts only in the bladder, where the urine is stored."
      ],
      "correct": 0,
      "model": "ADH increases reabsorption of water by the collecting ducts.",
      "explain": "It reduces urine volume in response to a fall in blood water potential.",
      "misconception": "Water reabsorption occurs by osmosis, not ATP-driven pumping of water.",
      "hints": [
        "Identify the statement that contradicts the underlying biological mechanism.",
        "Check whether the student's wording confuses a process with a related but different process."
      ],
      "samAligned": false,
      "hintCue": "Think about whether more water returns to the blood or remains in the urine."
    },
    {
      "id": "error-f170-viral-ribosomes",
      "unit": "f170",
      "area": 4,
      "section": "4.1.5",
      "type": "single",
      "subtype": "error",
      "level": "apply",
      "stem": "A pupil claims that a virus makes proteins using its own ribosomes. Which statement is correct?",
      "options": [
        "Viral proteins are synthesised using host-cell machinery.",
        "Viruses use 80S ribosomes enclosed within their capsid.",
        "Viral proteins are produced by bacterial binary fission.",
        "The viral lipid envelope acts as a ribosome."
      ],
      "correct": 0,
      "model": "Viruses require host ribosomes for protein synthesis.",
      "explain": "Viruses contain nucleic acid and a capsid, but have no ribosomes.",
      "misconception": "Do not confuse viruses with cellular microorganisms.",
      "hints": [
        "Identify the statement that contradicts the underlying biological mechanism.",
        "Check whether the student's wording confuses a process with a related but different process."
      ],
      "samAligned": false,
      "hintCue": "Viruses require host cells to translate the proteins encoded by their genetic material."
    },
    {
      "id": "error-f171-peakflow",
      "unit": "f171",
      "area": 4,
      "section": "4.1",
      "type": "single",
      "subtype": "error",
      "level": "apply",
      "stem": "A student records three technically acceptable peak-flow attempts: 380, 430 and 405 L/min. Which value should usually be recorded?",
      "options": [
        "430 L/min, the highest technically acceptable reading.",
        "405 L/min, the final reading in the sequence.",
        "380 L/min, the lowest valid reading.",
        "405 L/min, because the middle value is most representative."
      ],
      "correct": 0,
      "model": "430 L/min.",
      "explain": "Peak flow usually records the highest technically acceptable effort rather than the mean, lowest, or final value.",
      "misconception": "The middle or final reading is not automatically the correct result.",
      "hints": [
        "Identify the statement that contradicts the underlying biological mechanism.",
        "Check whether the student's wording confuses a process with a related but different process."
      ],
      "samAligned": false,
      "hintCue": "This clinical test records the maximum technically acceptable effort, not the latest reading."
    },
    {
      "id": "warm-f171-influenza",
      "unit": "f171",
      "area": 1,
      "section": "1.3.1",
      "type": "single",
      "level": "warmup",
      "warmup": true,
      "onRamp": true,
      "stem": "Which type of infectious agent causes influenza?",
      "options": [
        "Virus",
        "Bacterium",
        "Fungus",
        "Protozoan"
      ],
      "correct": 0,
      "model": "A virus",
      "explain": "Influenza is caused by influenza viruses, which replicate using cells in the respiratory tract.",
      "misconception": "Antibiotics act against susceptible bacteria, not influenza viruses.",
      "hints": [
        "Recall the type of microorganism associated with influenza.",
        "This infectious agent does not have its own ribosomes."
      ],
      "samAligned": false,
      "hintCue": "The organism must replicate inside host cells and is not susceptible to ordinary antibacterial treatment."
    },
    {
      "id": "warm-f171-heart",
      "unit": "f171",
      "area": 4,
      "section": "4.1",
      "type": "single",
      "level": "warmup",
      "warmup": true,
      "onRamp": true,
      "stem": "Which organ pumps blood around the body?",
      "options": [
        "Heart",
        "Kidney",
        "Liver",
        "Stomach"
      ],
      "correct": 0,
      "model": "The heart",
      "explain": "Contractions of cardiac muscle move blood through the pulmonary and systemic circulations.",
      "misconception": "The kidneys filter blood and regulate its composition but do not pump it around the body.",
      "hints": [
        "Think of the organ whose muscle contracts rhythmically.",
        "It contains atria and ventricles."
      ],
      "samAligned": false,
      "hintCue": "Which organ's chambers contract in sequence to move blood through vessels?"
    }
  ]
};

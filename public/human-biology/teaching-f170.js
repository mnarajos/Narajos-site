/* Original F170 teaching sequences. Keys match the existing Catch-up routes. */
window.KeystoneHumanLessons = {
  "f170/1.2.1": {
    goal: "Use a change in one tissue to explain an effect on an organ and the system it belongs to.",
    activate: ["What makes a group of cells a tissue?", "Cells in a tissue work together for a particular function. A tissue may contain more than one cell type."],
    prior: ["f170/1.1.1", "Review specialised cells"],
    explain: [
      "Specialised cells contribute to a tissue. Several tissues work together in an organ. Organs cooperate in an organ system.",
      "To explain the effect of damage, start with the job the affected tissue normally does. Then trace what changes in the organ and system."
    ],
    modelTitle: "Trace damage from tissue to system",
    model: [
      "Ventricular cardiac muscle cells normally contract together to generate pressure.",
      "A large damaged area contracts less effectively. The ventricle may eject less blood per beat.",
      "If the heart rate and other factors stay the same, the circulatory system delivers less blood per minute."
    ],
    guided: {
      prompt: "A region of small-intestine epithelium loses many of its microvilli. Which step links that damage to the organ's job?",
      options: [
        ["Less epithelial membrane is available for absorption.", ""],
        ["The muscles of the stomach can no longer contract.", "Follow the affected tissue first. Microvilli are projections of the absorptive epithelial surface."],
        ["The liver stops making all digestive enzymes.", "The change is at the small-intestine lining. Ask what crosses that lining."]
      ], answer: 0, hints: ["Identify the normal role of the surface facing the gut contents.", "Microvilli enlarge its membrane surface area."],
      explanation: "Less surface area for transport can reduce the rate at which the small intestine absorbs digested nutrients."
    },
    apply: {
      prompt: "Smoke exposure damages cilia in the airway lining. Explain how this can make respiratory infection more likely.",
      hints: ["Recall what airway mucus traps.", "Trace the effect of reduced ciliary movement on movement of mucus."],
      points: ["Mucus traps particles and microorganisms.", "Cilia normally move the mucus towards the throat.", "Reduced clearance leaves microorganisms in the airways for longer."],
      explanation: "When damaged cilia clear mucus less effectively, trapped microorganisms stay in the airways for longer. This can increase the chance of infection."
    }
  }
};

(function () {
  const { choice, written } = window.KeystoneHumanTeaching;
  const commons = "https://commons.wikimedia.org/wiki/File:";
  function micrograph(file, source, credit, licence, width, height, alt) {
    return {
      src: "/assets/micrographs/hb-" + file + ".webp",
      source: commons + source, credit, licence: "CC " + licence,
      licenceUrl: "https://creativecommons.org/licenses/" + (licence === "BY 2.0" ? "by/2.0/" : "by-sa/3.0/"),
      width, height, alt
    };
  }
  const uterine = micrograph("endometrium", "Endometrium_with_marked_gland_tortuosity_--_low_mag.jpg",
    "Nephron", "BY-SA 3.0", 760, 507, "Tissue with an exposed upper surface and many pale, curved gland spaces in darker tissue below.");
  const ovarian = micrograph("ovary", "Graafian_Follicle,_Human_Ovary_(3595010317).jpg",
    "Ed Uthman", "BY 2.0", 710, 590, "A large round pink cell with a distinct rim lies among smaller purple cells beside an open space.");
  const testicular = micrograph("testis", "Seminiferous_tubule_and_sperm.jpg",
    "Nephron", "BY-SA 3.0", 479, 590, "A pale central lumen is edged by several layers of cells. Fine dark profiles project into the lumen.");

  Object.assign(window.KeystoneHumanLessons, {
    "f170/1.1.2.counting": {
      revision: 1,
      goal: "Compare how a haemocytometer and a Coulter counter obtain a cell count and choose a method for a stated purpose.",
      activate: ["What does cells per mL tell you?", "It is the number of cells per millilitre, a concentration. A count to estimate concentration needs a known volume."],
      prior: ["f170/1.1.2", "Review light microscopy and measurement"],
      explain: [
        "A haemocytometer is a ruled counting chamber of known depth. Under a light microscope, the area counted and the chamber depth give the sampled volume. Apply a consistent boundary rule and account for dilution. Mix the suspension so the small sample is representative. Dilution can make an overcrowded field countable.",
        "A Coulter counter passes particles suspended in a conducting liquid through a narrow aperture. A brief change in electrical impedance is registered as a pulse. Pulse number gives a particle count in the sampled volume and pulse size can estimate particle volume. A mixture of clumps, debris and cells may give misleading results. The electrical count alone does not establish whether cells are alive."
      ],
      table: {caption: "What each method records", head: ["Method", "Readout", "Trade-off"], rows: [
        ["Haemocytometer", "Visible cells in a known volume", "Can inspect cell appearance; slower and dependent on the observer and sampling"],
        ["Coulter counter", "Electrical pulses from particles in a measured volume", "Fast for many comparable suspensions; similar-sized debris can be counted and clumps can distort the result"]
      ]},
      focusCells: [["0:0","0:1"],["1:0","1:1"]],
      modelTitle: "Choose what information the count must contain",
      nodes: ["Inspect selectively", "Count efficiently"],
      model: [
        "A researcher needs to exclude clearly recognisable fragments that overlap the target cells in size. A chamber lets the observer inspect appearance before counting each target cell. Counting takes longer and is sensitive to how the grid and cell features are judged.",
        "For many already separated suspensions of similar intact cells with little debris, a Coulter counter can obtain a rapid concentration estimate. If particles clump, one pulse may represent several cells, so the numerical result needs that limitation."
      ],
      guided: choice("Which part of a manual chamber makes it possible to turn a grid count into a concentration?",
        0, [["The counted grid area together with the known chamber depth.", ""], ["The microscope magnification alone.", "Magnification changes apparent size. Concentration needs the sampled volume."], ["The total depth of the liquid in the original tube.", "Use the depth and grid area of the volume that was counted."]],
        "Area × depth gives the counted volume. Account for any dilution when estimating the concentration of the original suspension."),
      apply: choice("A laboratory must compare the concentration of intact cells in 40 prepared suspensions. Checks show separate cells with very little debris. The count is needed quickly and there is no requirement to assess viability. Which choice fits?",
        2, [["Use the chamber because grid counts are independent of how the suspension is sampled.", "A small chamber sample still needs to be representative."], ["Use an electrical counter because every pulse proves that the particle was a live cell.", "A pulse signals a particle. It does not establish viability."], ["Use a Coulter counter for rapid counts, and check that the suspensions stay sufficiently dispersed.", ""]],
        "The aim is a fast concentration comparison. In these checked suspensions pulses are a useful proxy for cells, provided clumping remains limited.")
    },
    "f170/1.1.3": {
      further: [["catchup/f170/1.1.3.evidence", "Investigate ribosomes, ER and lysosome delivery"]],
      revision: 1,
      goal: "Trace a secreted protein through a cell and predict where it will collect if one step fails.",
      activate: ["What do ribosomes make?", "They join amino acids into a polypeptide. Some ribosomes are attached to the rough endoplasmic reticulum (RER)."],
      explain: [
        "The nuclear envelope surrounds most of the cell’s DNA. Its pores allow selected molecules, such as messenger RNA and ribosome subunits, to pass into the cytoplasm. The nucleolus is a region inside the nucleus where ribosomal RNA is made and ribosome subunits are assembled.",
        "Mitochondria supply much of the ATP for cell processes. Their own DNA specifies a small fraction of their proteins. Most mitochondrial proteins are encoded by nuclear genes, made on cytoplasmic ribosomes and imported. Nuclear gene expression can therefore affect ATP supply even if mitochondrial DNA is unchanged.",
        "Rough ER has ribosomes on its cytoplasmic surface and receives many proteins made for secretion. Smooth ER lacks these attached ribosomes and makes many lipids. Cytoplasmic ribosomes in human cells are 80S. Typical bacterial ribosomes are 70S. The S values describe sedimentation behaviour. Human mitochondrial ribosomes differ from both.",
        "The Golgi modifies and sorts proteins. For example, it sends some hydrolytic enzymes towards lysosomes. A lysosome is a membrane-bound compartment where these enzymes work in acidic conditions to break down material, such as components of worn-out organelles."
      ],
      table: {caption: "Route of a secreted digestive enzyme", head: ["Structure", "What happens to the protein"], rows: [
        ["Ribosomes on rough ER", "The polypeptide is made and enters the RER"], ["Golgi apparatus", "The protein is processed and sorted"],
        ["Secretory vesicle", "The protein travels towards the cell surface"], ["Cell surface membrane", "The vesicle fuses and releases its contents"]
      ]},
      focusCells: [["0:0"], ["1:0", "2:0"], ["3:0"]],
      nodes: ["Make the protein", "Process and move it", "Release it"],
      model: [
        "Ribosomes attached to the RER make a digestive enzyme using instructions from the nucleus. The polypeptide enters the RER, where it can fold.",
        "Carrier vesicles move it to the Golgi for processing and sorting. A secretory vesicle carries the enzyme from the Golgi to the surface. Some other proteins are sorted for a different destination, such as a lysosome.",
        "If the surface fusion step fails, the enzyme can still be made and carried there. It collects in vesicles inside the cell and less appears outside."
      ],
      guided: choice("A protein is present in the RER but absent from the Golgi and extracellular fluid. Which step would you check first?", 1,
        [["Assembly of the protein by ribosomes.", "The protein is already present in the RER."], ["Delivery from the RER to the Golgi.", ""], ["Fusion with the cell surface.", "Loss of surface fusion would not explain why the protein is absent from the Golgi."]],
        "Follow the route to the first point where the protein is missing.", ["Start with the last compartment where the protein was detected."]),
      apply: written("A cell releases less collagen than usual. New collagen precursor is still made and processed in the Golgi, but it accumulates there. Explain which step has most likely been affected and why.",
        ["Synthesis and Golgi delivery still occur.", "Sorting into secretory vesicles or exit from the Golgi is impaired.", "Less precursor reaches the cell surface for secretion."],
        "The location of accumulation points to sorting or transport out of the Golgi. Loss of synthesis would lower the amount reaching the Golgi, rather than produce a build-up there."),
      followup: choice("A new secreted protein is absent even in the RER. Where should the investigation start?", 0,
        [["Protein production or entry into the RER.", ""], ["Fusion of Golgi-derived vesicles at the surface.", "A late fault cannot explain a missing protein at the start."], ["Secretion into the space outside the cell.", "Use the first missing compartment."]],
        "Check production or the earliest delivery step before investigating later transport.")
    },
    "f170/4.1.1": {
      goal: "Use the arrangement of cell-envelope layers to distinguish Gram-positive and Gram-negative bacteria.",
      activate: ["What is a cell envelope?", "It is the set of layers surrounding the cell contents. Compare the layers from inside to outside."],
      explain: [
        "Both groups have a cell membrane and a peptidoglycan wall. A typical Gram-positive wall has a thick peptidoglycan layer outside the membrane. A typical Gram-negative envelope has a thin peptidoglycan layer between the inner and outer membranes.",
        "Gram-positive cells typically retain the first purple stain. Gram-negative cells typically lose it and appear pink or red after a contrasting stain. Treat this as evidence about the envelope. Gram class alone cannot identify a species or establish which antibiotic will work."
      ],
      table: {caption: "Read envelope layers from the cytoplasm outwards", head: ["Group", "Layers in order", "Typical result"], rows: [
        ["Gram-positive", "Cell membrane → thick peptidoglycan", "Purple"],
        ["Gram-negative", "Inner membrane → thin peptidoglycan → outer membrane", "Pink or red"]
      ]},
      focusCells: [["1:0","1:1"],["0:0","0:1"]],
      modelTitle: "Read the outer membrane and wall together",
      nodes: ["Trace the layers", "Predict the result"],
      model: [
        "In an unfamiliar description, a thin wall lies between two membranes. That arrangement indicates a typical Gram-negative envelope. Start with the number and position of membranes rather than just noticing that a wall exists.",
        "In a second specimen there is one membrane and thick peptidoglycan. This is typical of Gram-positive bacteria, for which a purple result is expected. The structural class does not tell you what species was examined."
      ],
      guided: choice("A drawing shows thin peptidoglycan outside the inner membrane. Which additional feature supports a Gram-negative interpretation?",
        1, [["A second wall made of chitin.", "Chitin is characteristic of fungal walls, not a bacterial Gram distinction."], ["A membrane outside the peptidoglycan.", ""], ["A nucleus enclosed by its own membrane.", "Bacteria lack a membrane-bound nucleus."]],
        "Locate the peptidoglycan relative to both membranes."),
      apply: choice("Two fictional samples contain rods of similar size. X has a single cell membrane and a thick peptidoglycan layer. Y has thin peptidoglycan between two membranes. Which interpretation is supported?",
        0, [["X usually stains purple and Y usually stains pink; the shared shape does not make their envelopes alike.", ""], ["Both should stain purple because both are rods.", "Gram staining depends on envelope structure rather than cell shape."], ["X usually stains pink because thick peptidoglycan makes it Gram-negative.", "Thick peptidoglycan favours retention of the purple stain in a typical Gram-positive envelope."]],
        "Use both observations about layers. Cell shape is a separate feature.")
    },
    "f170/4.1.4": {
      revision: 1,
      goal: "Read a supplied microbial population graph and explain net change from the direction of the curve.",
      activate: ["What does a viable count estimate?", "The number of living cells in the sample represented by the count."],
      explain: ["Binary fission produces two daughter cells. A population increases when more cells are added than lost. A constant viable count can conceal simultaneous division and death."],
      graph: {times: [0, 1, 2, 3, 4, 5, 6], values: [2, 2, 4, 6, 6, 6, 5], scaleMax: 8,
        xLabel: "Time (intervals)", yLabel: "Log₁₀ viable count", caption: "Illustrative microbial population graph"},
      nodes: ["Read the axes", "Identify each phase", "Explain the balance"],
      model: [
        "This teaching graph uses a logarithmic vertical axis. A rise from 2 to 4 means a rise from 100 to 10,000, not an increase of two cells.",
        "The first period shows little net increase (lag). The straight rising part represents exponential growth on a logarithmic scale. The later plateau is stationary phase. Then the viable count falls.",
        "From intervals 3 to 5 the viable count remains about the same. Division could be continuing at roughly the same rate as cell death. Between 5 and 6 the net loss exceeds any new additions."
      ],
      skills: ["growth", "graph"],
      guided: choice("At interval 5, a pupil says every cell stopped dividing when the graph first flattened. What can the graph establish?", 1,
        [["No new cells were produced.", "Net count does not measure division separately from death."], ["The viable count stayed roughly constant over the plateau.", ""], ["No cells died during the plateau.", "Cells may be lost even if the total remains steady."]],
        "A horizontal line establishes little net change. It gives no separate count of divisions and deaths.", ["What does the vertical axis measure?"]),
      apply: {...written("A second dataset shows a fall from 7 to 5 on the log scale and then a plateau at 5. Explain what happened to the viable count and what the plateau cannot establish.",
        ["The viable count became 100 times smaller.", "A fall is evidence of net loss rather than a total of two cells lost.", "The plateau does not establish that division or death stopped."],
        "The count falls from 10⁷ to 10⁵. That is a hundredfold fall and shows net loss. At the later plateau, additions and losses may be balanced."),
        table: {caption: "Independent population readings", head: ["Time interval", "Log₁₀ viable count"], rows: [["A", "7"], ["B", "5"], ["C", "5"]]} }
    },
    "f170/1.1.2": {
      revision: 1,
      goal: "Use a micrograph's scale bar or stated magnification to estimate size. Explain whether a larger image shows finer detail.",
      activate: ["Quick check: how many µm are in 1 mm?", "1 mm = 1,000 µm and 1 µm = 1,000 nm. Convert to the same unit before dividing two lengths."],
      explain: [
        "A scale bar labels a known actual length. The structure and bar are measured on the same image, so resizing both together preserves their ratio.",
        "Magnification is image size ÷ actual size. Resolution is the ability to distinguish two nearby points. Enlarging a blurred image spreads out the same information.",
        "In transmitted light microscopy, a thin specimen lets light pass through and reduces overlapping layers. A microtome cuts thin sections of prepared tissue. In a temporary wet mount the slide supports the specimen and the coverslip holds it flat in the liquid. A stain can improve contrast, but a preparation that kills cells cannot show their motion."
      ],
      compare: {
        caption: "What kind of representation am I reading?",
        head: ["Representation", "What it shows"],
        rows: [["Schematic", "Selected features drawn for clarity. Check whether it is to scale."], ["Light micrograph", "An image made with light. Some preparations can show living material."], ["Electron micrograph", "Finer detail in a prepared specimen. TEM shows internal details in a thin section. SEM shows surface detail."]]
      },
      visual: "model",
      modelTitle: "Measure a red cell from its scale bar",
      nodes: ["Identify the two lengths", "Compare like with like", "Calculate actual size", "Check the result and magnification"],
      model: [
        "Measure the marked width of one cell and the length of the bar on the same image. Here they are 48 pixels and 122 pixels. The 20 µm label describes the actual length represented by the bar.",
        "Both image readings use pixels. Divide the cell width by the bar width: 48 ÷ 122 ≈ 0.39. This number is a fraction of one bar and has no units.",
        "Multiply the ratio by 20 µm: 0.39 × 20 µm ≈ 8 µm. The cell is less than half a bar wide, so the result should be below 10 µm.",
        "If the 20 µm bar is 30 mm in print, convert 30 mm to 30,000 µm. Printed magnification is 30,000 ÷ 20 = ×1,500. Reprinting at another size changes this number, but no additional detail becomes resolvable."
      ],
      skills: ["magnification", "units"],
      guided: choice("A second cell spans 60 pixels. The 20 µm bar is 122 pixels. The cell spans about 0.49 of a bar. Use this ratio to estimate actual width.",
        1, [["41 µm", "You divided by the fraction. A cell shorter than one bar must be smaller than 20 µm."], ["10 µm", ""], ["0.49 µm", "0.49 describes a fraction of the bar. Multiply it by the actual length one bar represents."]],
        "0.49 × 20 µm ≈ 10 µm. The marked cell is just under half as wide as the bar.", ["Convert the fraction of one bar into a physical length."]),
      apply: choice("A printed image of a nucleus is 12 mm wide at ×2,000. Two structures merge into one blur. Which gives its actual width and the effect of enlarging this print?",
        0, [["6 µm; the structures remain unresolved.", ""], ["0.006 µm; enlargement reveals the two structures.", "12 ÷ 2,000 gives 0.006 mm, which is 6 µm. Enlarging the print does not resolve the original detail."], ["24,000 µm; the structures remain unresolved.", "Actual size is image size divided by magnification. Multiply only when finding image size."]],
        "12 mm ÷ 2,000 = 0.006 mm = 6 µm. The same blurred detail stays unresolved in a larger print.", ["Rearrange magnification = image size ÷ actual size. Check what units the division leaves."]),
      followup: choice("A printed 2 µm bar is 8 mm long. What is the magnification of that print?",
        2, [["×4", "The ratio uses one unit. Convert the 8 mm to µm before dividing."], ["×0.00025", "That reverses image size and actual size."], ["×4,000", ""]],
        "8 mm = 8,000 µm. The image is 8,000 ÷ 2 = 4,000 times its actual size.")
    },
    "f170/1.1.4": {
      further: [["catchup/f170/1.1.4.surface", "Interpret a membrane and investigate its components"]],
      goal: "Use gradients and the membrane to explain the direction of net transport.",
      activate: ["What is a concentration gradient?", "A difference in concentration between two places. Name the substance before comparing its concentrations."],
      explain: [
        "Particles move randomly. In diffusion, more particles move down the concentration gradient than move the other way, giving net movement. Some solutes diffuse through membrane proteins.",
        "Osmosis is net movement of water through a partially permeable membrane from higher to lower water potential. Active transport uses energy and membrane proteins to move a substance against its gradient."
      ],
      compare: {
        caption: "Read a membrane example by comparing both sides",
        head: ["Particle", "Net movement", "What enables movement"],
        rows: [
          ["Oxygen", "Higher to lower oxygen concentration", "Directly through the lipid bilayer"],
          ["Water", "Higher to lower water potential", "Partially permeable membrane, often via water channels"],
          ["Ion in active uptake", "Lower to higher ion concentration", "A transporter and an energy source"]
        ]
      },
      modelTitle: "Decide which way particles move overall",
      nodes: ["Compare oxygen on both sides", "Check the membrane", "Predict net movement"],
      model: [
        "A respiring cell uses oxygen, so there is more dissolved oxygen per unit volume outside than inside.",
        "Oxygen can pass through the lipid bilayer. Individual oxygen molecules cross in both directions.",
        "More cross in than out. The net movement is into the cell down the oxygen concentration gradient."
      ],
      guided: choice("A cell takes up a mineral ion even though its concentration is already higher inside. Which explanation fits?", 2,
        [["Ions diffuse from low to high concentration.", "Diffusion gives net movement down the gradient."], ["Water enters by osmosis and brings the ion through the bilayer.", "Osmosis describes water movement. Ions usually require membrane proteins."], ["A membrane transporter uses energy to move the ion against its gradient.", ""]],
        "Compare the ion concentration first. Uptake from the lower concentration requires an energy-coupled mechanism.", ["Name the particle and compare the two concentrations.", "Which process can move that particle uphill?"]),
      apply: written("A cell is placed in a solution of lower water potential than its cytoplasm. Explain its change in volume.",
        ["The membrane is partially permeable.", "There is net movement of water out, down its water potential gradient.", "Loss of water reduces cell volume."],
        "Water moves in both directions, with net movement out into the lower-water-potential solution. The cell loses water and shrinks.", ["Track water and compare water potential."]),
      followup: choice("A membrane channel opens when the concentration of a permeant, uncharged solute is equal on both sides. What happens?", 1,
        [["All crossings stop.", "Individual particles still move randomly."], ["Crossings occur in both directions with no net movement.", ""], ["The channel automatically pumps solute inward.", "Opening a channel does not supply energy to pump solute."]],
        "At equal concentrations, the rates of crossing balance.")
    },
    "f170/2.1.2": {
      revision: 1,
      goal: "Use chamber pressure to explain blood flow and trace how circulation delivers oxygen in different situations.",
      activate: ["What makes blood flow through an open valve?", "Blood moves from higher to lower pressure. A valve opens when its upstream pressure exceeds its downstream pressure."],
      explain: ["The right heart pumps to the lungs. The left heart pumps to the body. Ventilation moves air, diffusion moves oxygen across the exchange surface, and circulation carries oxygen in blood."],
      modelTitle: "Follow a red cell from the right ventricle",
      nodes: ["Right ventricle", "Lung capillaries", "Left heart and body"],
      model: [
        "The right ventricle contracts. Compare its pressure with the pulmonary artery. When ventricular pressure is higher, the pulmonary valve opens and blood enters the pulmonary artery.",
        "Follow the blood into capillaries beside alveoli. Air does not enter the blood. Oxygen diffuses across the barrier and binds to haemoglobin.",
        "Pulmonary veins return this blood to the left atrium. The left ventricle pumps it into the body, where oxygen can diffuse from blood into respiring tissues."
      ],
      skills: ["cardiac"],
      guided: choice("Pressure in the left ventricle rises above the left atrium but stays below the aorta. Which valves are closed?", 1,
        [["Only the aortic valve.", "Ventricular pressure also exceeds atrial pressure, closing the mitral valve."], ["Both the mitral and aortic valves.", ""], ["Only the mitral valve.", "Ventricular pressure has not yet exceeded aortic pressure."]],
        "Compare each pair: ventricular pressure closes the mitral valve, but aortic pressure keeps the aortic valve closed.", ["Compare pressures across one valve at a time."]),
      apply: written("During exercise, blood picks up oxygen normally in the lungs. A narrowing limits blood flow to one leg. Explain why its working muscles could still receive too little oxygen.",
        ["Oxygen is carried mainly bound to haemoglobin.", "Reduced blood flow can lower oxygen delivery per minute even if oxygen loading in the lungs is normal.", "The working muscle's demand for oxygen rises with aerobic respiration."],
        "Normal gas exchange can supply oxygen to each volume of blood. If less blood reaches the working muscles each minute, oxygen delivery may fail to meet their greater demand.", ["Separate the oxygen carried in a volume of blood from the volume arriving each minute."])
    },
    "f170/2.1.3": {
      goal: "Explain how oxygen travels from air to respiring tissues and predict what a damaged exchange surface changes.",
      activate: ["What determines the direction of net oxygen movement?", "For simple diffusion, oxygen moves down its gradient. In gas-exchange explanations, compare oxygen partial pressures."],
      prior: ["f170/1.1.4", "Review diffusion and net movement"],
      explain: ["Ventilation renews air in the alveoli. Gas exchange moves oxygen across the alveolar and capillary walls. Circulation carries it to tissues. Cellular respiration uses oxygen inside cells."],
      nodes: ["Ventilate the alveoli", "Diffuse into blood", "Deliver oxygen"],
      model: [
        "Fresh air helps keep alveolar oxygen partial pressure above that in incoming blood.",
        "A large surface area and thin walls support exchange. Oxygen diffuses into blood, where it binds to haemoglobin.",
        "Blood carries oxygen to capillaries near tissues. Oxygen dissociates from haemoglobin and diffuses towards cells using it in respiration."
      ],
      skills: ["ventilation"],
      guided: choice("Fluid accumulates between alveolar air and blood. Which change directly makes diffusion slower?", 0,
        [["The distance oxygen must diffuse increases.", ""], ["Haemoglobin can no longer bind any oxygen.", "The added fluid is at the barrier. Binding may still occur after oxygen reaches the blood."], ["Cellular respiration in the lungs must stop.", "The immediate change is to the route through the barrier."]],
        "A thicker barrier increases diffusion distance, reducing diffusion rate when other variables are similar.", ["Trace how far oxygen must travel before it reaches blood."]),
      apply: written("Some alveolar walls break down, reducing total exchange surface. Explain how this could limit oxygen delivery during exercise.",
        ["Less surface is available for diffusion.", "At a similar gradient, less oxygen can enter blood per unit time.", "Working muscles require more oxygen for aerobic respiration."],
        "Loss of alveolar surface can reduce the rate of oxygen entry into the blood. Circulation may deliver less oxygen relative to the increased demand of working muscles.", ["Start at the alveolar surface and end at the muscle."])
    },
    "f170/2.2.2": {
      revision: 1,
      goal: "Explain how the respiratory and circulatory systems cooperate as working muscles demand more oxygen.",
      activate: ["Quick check: why can working muscle need more oxygen?", "More contractions require more ATP. An increase in aerobic respiration can increase demand for oxygen."],
      explain: ["Follow three transfers: air moves into alveoli, oxygen diffuses into blood, and circulation delivers oxygen to tissues. Changing one process does not guarantee that the others keep pace."],
      prior: ["f170/2.1.3", "Review diffusion from an alveolus"],
      nodes: ["Demand", "Exchange", "Delivery"],
      model: [
        "When a cyclist's leg muscles work harder, their demand for oxygen rises as aerobic respiration increases.",
        "Deeper or more frequent breaths renew alveolar air. Oxygen diffuses into the blood and binds to haemoglobin.",
        "If more blood reaches the working muscles per minute, delivery can rise. Oxygen leaves haemoglobin and diffuses towards respiring cells."
      ],
      guided: choice("Lung exchange is normal and the oxygen content of arterial blood stays similar, but blood flow to a working muscle falls. Which link limits delivery?", 1,
        [["Oxygen can no longer diffuse into the lungs from the air.", "Ventilation brings air into the lungs. Exchange is stated to be normal."], ["Less oxygen-carrying blood reaches the muscle per minute.", ""], ["The muscle must now require less ATP.", "The change in blood flow does not establish lower demand."]],
        "Track the quantity delivered per minute. Similar oxygen content does not compensate for a lower volume of blood arriving.", ["Identify which of the three transfers is affected."]),
      apply: written("Two runners have similar blood flow to their muscles. One has fewer circulating red cells and a lower concentration of haemoglobin. Explain why oxygen delivery may differ even if breathing rates match.",
        ["Haemoglobin carries most oxygen in blood.", "At comparable loading, less haemoglobin can reduce oxygen content per volume.", "With comparable blood flow, lower oxygen content can reduce oxygen delivered per minute."],
        "Equal flow delivers a similar blood volume each minute. If there is less haemoglobin in that volume, it can carry less oxygen even when the runners breathe at similar rates.", ["Identify what carries oxygen and what matching flow actually tells you."]),
      followup: choice("A person's blood flow is unchanged but alveolar oxygen falls. Which step would help explain less oxygen reaching the tissues?", 0,
        [["Less oxygen may diffuse into the blood and bind to haemoglobin.", ""], ["Oxygen uptake is unaffected by the gradient.", "Oxygen transfer depends on the gradient between alveolar air and blood."], ["Air would enter a vein and increase O₂ delivery.", "Oxygen diffuses across the barrier; air does not travel in veins."]],
        "A fall in alveolar oxygen partial pressure can reduce diffusion into the blood when other conditions are similar.")
    },
    "f170/2.2.3": {
      revision: 1,
      goal: "Interpret ventilation measurements and explain what they tell you about oxygen delivery.",
      activate: ["Quick check: what does tidal volume measure?", "It is the volume of air moved in one breath. Breathing rate tells you how many breaths occur each minute."],
      explain: [
        "Pulmonary ventilation is tidal volume multiplied by breathing rate. This measures air moved per minute. Oxygen transfer also depends on gas exchange and blood flow.",
        "Peak expiratory flow is the greatest rate during a forceful blow out after a full breath in. A weak effort, obstructing the mouthpiece or a poor seal can distort a reading. Record the highest of repeated acceptable blows rather than simply averaging good and poor efforts. Compare results obtained using a consistent procedure."
      ],
      model: [
        "At rest the tidal volume is 500 mL and the rate is 12 breaths per minute. Convert to 0.50 L per breath before multiplying if the answer is required in litres.",
        "0.50 L per breath × 12 breaths per minute gives 6.0 L per minute. The unit tells us this is air volume, not oxygen absorbed.",
        "When a muscle works harder its oxygen demand can rise. More ventilation can renew alveolar air, but oxygen must still diffuse into blood and be delivered by circulation."
      ],
      skills: ["ventilation"],
      guided: choice("Breaths become shallower and more frequent. The calculated air volume per minute is unchanged. What can you conclude?", 1,
        [["The oxygen delivered to muscle must be unchanged.", "The calculation measures total air movement. Gas exchange and blood transport can differ."], ["The measured volume of air moved per minute is unchanged.", ""], ["Less total air moves because only breath size matters.", "Changes in rate and volume per breath can offset one another."]],
        "The product of the two readings measures total airflow. In particular, each breath also moves some air in airways where exchange does not occur.", ["Check the quantity and units calculated."]),
      apply: written("During exercise a student records a higher ventilation rate. A second student claims this proves that twice as much oxygen reaches the working muscles. Explain what other evidence or processes matter.",
        ["Higher ventilation measures greater air movement.", "Oxygen must diffuse from alveoli into blood and be carried to the tissues.", "Blood flow and the oxygen content of blood matter. The ventilation data alone do not quantify the change in delivery."],
        "More ventilation can help maintain alveolar oxygen, but oxygen delivery also depends on exchange into blood and circulation to the muscle. Airflow alone cannot establish the increase in delivery.", ["Follow the oxygen from the alveoli to the cells."])
    },
    "f170/3.1.1": {
      revision: 1,
      goal: "Explain how insulin opposes a rise in blood glucose and predict the effect of a weaker response.",
      activate: ["Quick check: what do glucose concentration and target cell mean?", "Concentration is the amount of glucose in a volume of blood. Insulin is a hormone, a chemical signal. Target cells have receptors that allow them to respond."],
      explain: ["In negative feedback, a response opposes a change in the regulated variable. Identify the variable first. A hormone may increase during the response."],
      nodes: ["Disturbance: glucose rises", "Signal: insulin secretion rises", "Response: target tissues act", "Effect: glucose moves back towards range"],
      model: [
        "After a meal, glucose absorbed from the gut raises its concentration in the blood. Blood glucose concentration is the regulated variable.",
        "Pancreatic beta cells respond by releasing more insulin into blood. Insulin is a signal to target cells, not a digestive enzyme or a source of glucose.",
        "Muscle and fat cells can take up more glucose. Insulin promotes glycogen synthesis in liver and muscle and reduces glucose output from the liver.",
        "Removing glucose from the blood and reducing its release into the blood oppose the initial rise. As the concentration moves back towards its usual range, the extra stimulus for insulin release falls."
      ],
      guided: choice("In a fictional comparison, beta-cell secretion rises normally after a meal, but the muscle cells respond less strongly. Which change is most likely, other things being similar?", 2,
        [["Less insulin must have been secreted.", "Secretion is the release of the signal. Tissue responsiveness is a separate step."], ["Insulin converts into glucose to compensate.", "Insulin binds to receptors and changes cell activity. It is not converted into glucose in this response."], ["Muscle glucose uptake rises less, so the raised blood glucose can last longer.", ""]],
        "Follow the effect from the target step onwards. A normal signal can have a smaller effect when target cells respond less strongly.", ["Locate the altered step: signal production or tissue response?", "Now predict what changes about the removal of glucose from blood."]),
      writing: {
        title: "Build a short causal explanation",
        prompt: "Why can glucose uptake rise more slowly when muscle cells respond weakly to insulin?",
        responses: [
          ["Description", "Glucose uptake rises more slowly."],
          ["Explanation", "Muscle cells respond less strongly to the same insulin signal, so less extra glucose is taken up from the blood."]
        ],
        compare: ["The description states what changes. The explanation links a cause, a biological mechanism and a consequence in one sentence. Add a second sentence only if it develops the next causal link."]
      },
      apply: written("Body temperature drops in cold surroundings. Muscles begin shivering, releasing more heat. Explain why this is an example of negative feedback.",
        ["Body temperature is the regulated variable and it initially falls.", "Shivering increases heat production.", "Increased heat production helps raise temperature towards its usual range, opposing the fall."],
        "Shivering increases heat production when body temperature drops. Its effect tends to reverse the disturbance. Negative describes the direction of the effect relative to the change.", ["Compare the direction of the initial change with the effect of the response."]),
      followup: choice("After a meal, a beta-cell disorder reduces insulin release. Target cells respond normally to the insulin they receive. Which part of the loop has primarily changed?", 0,
        [["Secretion of the signal.", ""], ["Target cells' sensitivity to insulin.", "Their sensitivity is stated to be normal."], ["The identity of the regulated variable.", "Blood glucose concentration is still the variable being regulated."]],
        "The signal is weaker because less insulin is released, even though the target cells remain responsive.")
    },
    "f170/3.1.2": {
      revision: 1,
      goal: "Interpret fictional glucose-tolerance data and separate a slower return from an explanation of its cause.",
      activate: ["Quick check: what is a baseline?", "A value at the start that you compare later readings with. Fasting helps reduce the immediate influence of a recent meal before the starting measurement."],
      explain: [
        "A glucose-tolerance test tracks blood glucose after a measured glucose load under a standard procedure. Compare the starting value, peak and later readings. The graph shows how glucose changes over time.",
        "In type 1 diabetes, autoimmune damage to pancreatic beta cells can lead to very little insulin being produced. In type 2 diabetes, target tissues respond poorly to insulin, and insulin secretion may later become insufficient. Both can result in raised blood glucose. A glucose curve alone does not identify the type."
      ],
      prior: ["f170/3.1.1", "Review the insulin feedback loop"],
      graph: { times: [0, 30, 60, 90, 120], values: [5, 8.8, 7.6, 6.1, 5.3], scaleMax: 12,
        xLabel: "Time (min)", yLabel: "Glucose (mmol/L)", caption: "Fictional glucose data" },
      nodes: ["Read the baseline", "Locate the highest reading", "Compare the late value with the baseline"],
      model: [
        "The x-axis shows time from the glucose load. The y-axis is blood glucose concentration in mmol/L. At time 0 the reading is 5.0 mmol/L.",
        "The highest measured point is 8.8 at 30 minutes. A peak shows the period when glucose is elevated. It does not give the rate of insulin release.",
        "By 120 minutes the reading is 5.3 mmol/L, close to its starting value. This is consistent with glucose disposal and regulation. The data cannot identify the contribution of secretion or target tissue sensitivity on their own."
      ],
      guided: choice("Another fictional series starts at 5.0, reaches 8.8 at 30 minutes and is 7.2 mmol/L at 120 minutes. What is the direct comparison with the worked data?", 2,
        [["The second series had the higher measured peak.", "The two measured peaks are the same."], ["The second series proves that the pancreas released no insulin.", "Glucose data alone cannot identify the source of the difference."], ["At 120 minutes the second series is further above its own baseline.", ""]],
        "Subtract each baseline from the late reading: 2.2 versus 0.3 mmol/L above baseline.", ["Compare the late value with the starting value for each series."]),
      apply: {
        ...written("Use these fictional readings to evaluate the claim that Sample B cleared glucose more slowly simply because its final reading is higher. Identify what further evidence would help.",
          ["A falls by 2.5 mmol/L from the 30-minute reading, while B falls by 2.7 mmol/L.", "B starts higher. A's final reading is 0.7 above baseline and B's is 0.4 above baseline.", "More time points under the same protocol would help compare the pattern. Separate measures would be needed to infer a specific hormonal cause."],
          "The final value alone does not establish slower clearance. B begins higher, ends closer to its own baseline and has a slightly larger measured drop. More measurements under comparable conditions would improve the inference.", ["Compare each final reading with its own starting value and highest measured reading."]),
        table: {caption: "Fictional blood glucose concentrations (mmol/L)", head: ["Sample", "0 min", "30 min", "120 min"], rows: [["A", "4.8", "8.0", "5.5"], ["B", "6.2", "9.3", "6.6"]] }
      },
      followup: choice("A curve falls slowly after a glucose load. Which conclusion follows from this curve alone?", 1,
        [["It establishes that insulin receptors do not function.", "The curve does not identify a specific mechanism."], ["It describes a slower fall in recorded glucose during those observations.", ""], ["It shows that no glucose was absorbed.", "Glucose initially rose after the load."]],
        "Describe the time pattern directly. Additional evidence is necessary to identify its mechanism.")
    },
    "f170/3.2.1": {
      goal: "Follow a reflex pathway and predict which parts still work if one link is interrupted.",
      activate: ["What is an effector?", "A muscle or gland that produces a response to a signal."],
      explain: [
        "Electrical signals travel along neurones. At a chemical synapse, a neurotransmitter carries information across the gap. A relay neurone in the spinal cord can connect sensory input to a motor response.",
        "Myelin insulates sections of an axon. Current spreads quickly under myelin and action potentials are regenerated at nodes of Ranvier, the small gaps in the sheath. This faster node-to-node propagation is saltatory conduction. In multiple sclerosis, damage to myelin in the CNS can slow or interrupt conduction along affected axons."
      ],
      visual: "model",
      nodes: ["Receptor and sensory neurone", "Relay in the spinal cord", "Motor neurone and effector"],
      model: [
        "A hot surface activates receptors in the skin. The sensory neurone carries impulses towards the CNS.",
        "Neurotransmitter passes the signal across synapses in the spinal pathway.",
        "A motor neurone carries impulses to a muscle. Contraction causes withdrawal of the limb."
      ],
      guided: choice("Transmission fails at the first synapse in the spinal pathway. Which event can still occur?", 0,
        [["The sensory impulse can reach the end of its neurone.", ""], ["The spinal relay must still be activated by that input.", "That input must cross the affected synapse before activating the relay."], ["The motor neurone carries the impulse from the skin to the cord.", "That is the direction of the sensory branch."]],
        "Events before the block can still happen. The pathway fails at the junction before it reaches the motor route.", ["Trace forwards from the receptor to the first failed step."]),
      apply: written("A damaged sensory neurone cannot carry impulses from the receptor to the spinal cord. Explain why a healthy muscle still fails to withdraw the limb via this reflex.",
        ["The receptor may still respond to the stimulus.", "The sensory signal fails to reach the CNS through that neurone.", "The reflex motor pathway is not activated and the effector does not contract via this route."],
        "The interruption is upstream of the spinal relay and motor neurone. The effector may still respond to other signals, but this input cannot trigger the reflex.", ["Trace the affected pathway in order before deciding what the muscle can do."])
    },
    "f170/3.3.1": {
      revision: 1,
      goal: "Use visible features to distinguish uterine lining, ovarian follicle and testicular tissue in micrographs.",
      activate: ["How does a tissue section differ from an anatomy diagram?", "A section is a thin slice. A tube may look round or elongated depending on the cut, and a field of view may show only part of the tissue."],
      explain: [
        "The endometrium is the uterine lining, with glands. Ovarian follicles enclose developing oocytes. Seminiferous tubules in testes have layers of developing germ cells around a lumen.",
        "Use the positions and sizes of cells and spaces as evidence. The colour depends on the stain and is less useful for identification."
      ],
      compare: {caption: "Two gametes and their contributions", head: ["Gamete", "Feature and function"], rows: [
        ["Sperm cell", "A flagellum propels the cell. Mitochondria in the midpiece supply some of the ATP for movement. The head carries a haploid nucleus and an acrosome whose contents help the sperm penetrate the coverings around the oocyte."],
        ["Oocyte (egg cell)", "The large cytoplasm provides organelles, stored RNA and nutrients for early development. Following sperm entry, cortical granules release material that changes the surrounding coat and helps prevent entry by another sperm."]
      ]},
      further: [["challenge/f170/f170-gamete-contributions", "Explain what each gamete contributes"]],
      photo: uterine,
      modelTitle: "Identify the uterine lining from its glands",
      model: [
        "Start at the upper free surface. The pale shapes below it are profiles of glands, set within darker supporting tissue.",
        "The surface and the distribution of multiple small gland profiles support endometrium. This field does not show the whole uterine wall.",
        "A round space alone is weak evidence. Ask whether the field shows multiple small gland profiles, one unusually large cell with a surrounding layer, or a lumen lined by layers of developing germ cells."
      ],
      guided: choice("In an unlabelled field, pale spaces lie beneath an exposed surface. Each has a small rim of cells, and none encloses a large cell. Which feature supports the identity best?", 1,
        [["The image is pink, so it must be ovary.", "Stain colour is not specific to a tissue."], ["Multiple gland profiles beneath a free surface support uterine lining.", ""], ["Any round space indicates a seminiferous tubule.", "Look for the layered germ cells and the spatial pattern, not a round space alone."]],
        "Use the combination of surface and scattered glands to justify the identification.", ["Identify the free surface first, then compare the pattern beneath it."]),
      apply: {
        ...written("The first and second fields show different reproductive tissues. Identify each and give a separate visible reason for each decision.",
          ["First: ovarian follicle, supported by one large oocyte surrounded by smaller follicle cells.", "Second: testis, supported by layers of developing germ cells lining a seminiferous tubule around a lumen."],
          "In the first field, the very large cell and the ring of smaller cells indicate an ovarian follicle. In the second, several layers lining the pale lumen indicate a seminiferous tubule. The organ names alone do not explain the identification."),
        photos: [ovarian, testicular]
      },
      followup: choice("A new low-power field shows many neighbouring tube profiles. Each has layers of cells arranged towards its lumen. Which inference uses the best evidence?", 0,
        [["Testis, from repeated layered tubule profiles.", ""], ["Endometrium, because the profiles are rounded.", "Both tissues can contain rounded profiles. The layers around many lumens are the stronger evidence."], ["Ovary, because the largest space must be an oocyte.", "A lumen is a space. An oocyte is a large cell."]],
        "Identify what sits around the space. Repeated profiles with layers of germ cells support seminiferous tubules.")
    },
    "f170/3.3.2": {
      goal: "Connect reproductive hormones to the processes they regulate.",
      activate: ["Where do FSH and LH come from?", "Both are released by the anterior pituitary and carried in the blood to their target tissues."],
      explain: [
        "FSH supports ovarian follicle development. A surge of LH triggers ovulation. After ovulation the corpus luteum produces progesterone, which helps maintain the uterine lining.",
        "In testes, FSH acts through Sertoli cells to support sperm production. LH stimulates Leydig cells to produce testosterone, which also supports sperm production. Follow the fuller ovarian sequence in the F175 model."
      ],
      prior: ["f175/a1", "Explore ovulation and fertilisation in the F175 model"],
      nodes: ["Follicle development", "Ovulation", "After ovulation"],
      model: [
        "Begin with the follicle as a target. FSH supports its development.",
        "Once a mature follicle is present, the LH surge triggers release of the secondary oocyte.",
        "The remaining follicular tissue forms the corpus luteum. Progesterone helps maintain the endometrium."
      ],
      guided: choice("A follicle develops, but the LH surge fails. Which event is most directly affected?", 1,
        [["FSH being produced by the pituitary.", "Follicle development has already occurred in this example."], ["Release of the secondary oocyte.", ""], ["Sperm maturation in the epididymis.", "The context is ovarian physiology."]],
        "The surge is the trigger for release. Follicle growth and ovulation are separate steps.", ["Which hormone acts as the trigger?"]),
      apply: choice("LH signalling to Leydig cells falls. Which change is most direct?", 2,
        [["Leydig cells release more progesterone to maintain the endometrium.", "The tissue is testis and the direct signal is to Leydig cells."], ["FSH can no longer act on any Sertoli cells.", "The disrupted signal is LH. Sertoli cells are targets for FSH."], ["Leydig cells produce less testosterone.", ""]],
        "Reduced LH stimulation of Leydig cells can lower testosterone production.", ["Match LH to its target cell and that cell to its product."])
    }
  });
})();

(function () {
  const { choice, written } = window.KeystoneHumanTeaching;
  Object.assign(window.KeystoneHumanLessons, {
    "f170/1.1.1": {
      revision: 1,
      goal: "Use the shape and contents of a blood cell to predict what it can do.",
      activate: ["What is a structural adaptation?", "A feature can help a cell perform a particular job. Explain the step between the feature and the job."],
      explain: [
        "A mature erythrocyte (red blood cell) is a flexible biconcave disc. Its thin centre shortens the diffusion distance for oxygen. Loss of the nucleus leaves room for haemoglobin, which binds oxygen. Its flexible membrane helps it pass through narrow capillaries.",
        "White blood cells have nuclei. A nuclear outline can help you recognise a cell. To explain its function, look for the equipment it uses to recognise, engulf or release material."
      ],
      compare: {caption: "How four white cells defend the body", head: ["Cell", "Feature and consequence"], rows: [
        ["Neutrophil", "A flexible cell with a multi-lobed nucleus can move through tissue. It engulfs particles and delivers granule contents to the compartment holding them."],
        ["Lymphocyte", "Many small lymphocytes have a large rounded nucleus and little visible cytoplasm. Specific receptors on B and T cells recognise particular antigens. Activated B cells can give rise to antibody-secreting plasma cells."],
        ["Eosinophil", "Often has two nuclear lobes and conspicuous granules. Releasing granule proteins outside the cell helps it act against parasites too large to engulf."],
        ["Monocyte", "A large cell with an indented nucleus and ample cytoplasm. It can engulf material and can develop into a macrophage after entering tissue."]
      ]},
      modelTitle: "Trace oxygen from the surface into a red cell",
      nodes: ["Distance", "Capacity", "Limit"],
      model: ["Oxygen crosses the cell membrane and diffuses a short distance to haemoglobin in the thin disc.",
        "Without a nucleus there is more internal space for haemoglobin. Oxygen can bind there and later be released in tissues.",
        "Shape and haemoglobin do different jobs. A flexible cell with very little haemoglobin could still enter a capillary but would carry less oxygen."],
      guided: choice("A large target stays outside two white cells. Which observation best explains how one cell acts on it?", 1,
        [["An indented nucleus takes the target inside.", "Nuclear shape can help identification. Engulfment involves the cell surface."], ["An eosinophil releases proteins from its granules onto the target.", ""], ["A small lymphocyte carries oxygen to the target.", "Haemoglobin in erythrocytes carries most blood oxygen."]],
        "Granule release can act on an external target without enclosing the whole target.", ["Consider which material can reach the outside."]),
      apply: written("A white cell still surrounds particles with its membrane. Its granules can no longer deliver enzymes into the compartment around each particle. Predict what a time-lapse study would show after uptake. Explain why.",
        ["Particles can still be taken inside.", "Less digestive enzyme reaches the enclosed material.", "Engulfed material may remain visible for longer or be broken down more slowly."],
        "Entry could look normal. Once inside, particles would receive fewer digestive enzymes, so their breakdown could be slower. Counting only how many particles enter could miss the defect.",
        ["Separate the evidence for entry from the evidence for breakdown."]),
      further: [
        ["catchup/f170/1.1.1.surfaces", "Compare transporting and protective surfaces"],
        ["catchup/f170/1.1.1.signals", "Compare neurones, rods and cones"],
        ["catchup/f170/1.1.1.muscle", "Compare muscle cells"],
        ["catchup/f170/3.3.1", "Compare sperm and oocytes and study reproductive micrographs"],
        ["catchup/f170/1.1.2", "Measure a real red cell"]
      ]
    },
    "f170/1.1.1.surfaces": {
      revision: 1, title: "Transporting and protective cell surfaces",
      goal: "Use the surface facing a space to explain how a cell absorbs, moves or secretes material.",
      explain: ["Find the lumen, the space beside the lining. Short microvilli give the cell more membrane for transport. Longer motile cilia beat to move material along the surface. A single thin layer gives a short diffusion distance."],
      compare: {caption: "Match the structure to the movement", head: ["Cell and site", "How the feature helps"], rows: [
        ["Proximal renal tubule", "Microvilli increase the membrane area facing the filtrate. Many mitochondria supply ATP for ion pumps. The gradients these pumps maintain also support glucose reabsorption."],
        ["Hepatocyte", "Ribosomes on rough ER make plasma proteins for secretion. Smooth ER contains enzymes that help process lipids and some drugs. Glycogen granules store a supply of glucose units."],
        ["Trachea and oviduct", "Tracheal cilia move mucus and trapped particles towards the throat. Cilia in the oviduct help move the oocyte towards the uterus, alongside muscular contractions."],
        ["Alveolus", "A thin, flattened squamous cell forms part of a very short path between air and blood for oxygen and carbon dioxide."],
        ["Surface and upper gastric pits", "Surface mucous cells release mucus from vesicles at their exposed end. The mucus retains bicarbonate and protects the lining from acid and digestive enzymes."]
      ]},
      modelTitle: "Explain reabsorption at two surfaces of a tubule cell",
      model: ["Start at the filtrate. The brush border provides room for more transporters per cell.",
        "At the blood-facing side, sodium pumps use ATP to maintain an ion gradient. Uptake of some solutes from the filtrate depends on this gradient.",
        "Losing brush-border area can limit uptake even when ATP is available. Losing ATP can impair uptake even with the brush border intact."],
      guided: choice("Two linings have equal area. Oxygen crosses one flattened cell layer faster than several layers. Which feature explains this?", 2,
        [["More cilia beat oxygen into blood.", "Cilia move material along a surface. Alveolar gases diffuse across the barrier."], ["A longer path lets more oxygen enter per second.", "Increasing diffusion distance slows exchange when other conditions match."], ["There is a shorter diffusion path across the single layer.", ""]],
        "Use the direction of movement. The gas crosses the lining.", ["Is the substance travelling along or across the lining?"]),
      apply: written("Two preparations keep their normal number of cells. In A, oviduct cilia stop beating. In B, gastric pit surface cells make mucus but their vesicles cannot fuse with the exposed membrane. Predict a different consequence in each preparation.",
        ["A loses part of the mechanism moving the oocyte along the oviduct.", "B can make mucus but releases less onto the stomach surface.", "Reduced mucus weakens protection against acid or digestive enzymes."],
        "In A, ciliary transport is impaired even though muscle may still move the oocyte. In B, mucus can remain inside vesicles. Less reaches the surface, weakening the protective layer.",
        ["Trace where movement or delivery stops in each lining."]),
      practice: "f170-microvilli-transfer"
    },
    "f170/1.1.1.signals": {
      revision: 1, title: "From light detection to a nerve signal",
      goal: "Explain how cell shape, connections and light-sensitive membranes contribute to signalling.",
      explain: ["Rods and cones have outer segments with folded or stacked membranes containing visual pigments. Light absorption changes the signal sent to connected retinal cells. Rod pathways are sensitive in dim light. Three cone types have different wavelength sensitivities, allowing colour discrimination in brighter light.",
        "In a typical sensory neurone, a long fibre carries impulses from the receptor region towards the central nervous system. Relay neurones have branching processes that connect neurones within it. A motor neurone has branched inputs and a long axon ending at an effector. Myelin on many long axons speeds conduction."],
      visual: "model", visualFrom: ["f170","3.2.1"],
      modelTitle: "Read a pathway by following its connections",
      model: ["In the withdrawal reflex diagram, find the fibre that carries information from the receptor into the spinal cord. Its destination identifies the sensory route.",
        "The relay neurone links incoming activity to a motor neurone. The motor axon carries the output to muscle. The reflex illustrates these directions. The retina has its own circuits."],
      guided: choice("A branching cell connects two neurones entirely inside the spinal cord. Which evidence supports a relay role?", 0,
        [["Its connections link the input pathway to another neurone within the CNS.", ""], ["Its branches prove that it detects light.", "Branches indicate possible connections. Light detection needs visual pigments."], ["Every neurone with branches directly activates muscle.", "Follow the destination. This cell ends on another neurone."]],
        "Use the connections to infer the role.", ["Follow where the output goes."]),
      apply: written("In a vision study a person detects faint white lights as well as the comparison group. In bright light they struggle to distinguish two colours that the group can separate. Which receptor pathway would you investigate first? Use both findings and state a limit of your conclusion.",
        ["The colour result points towards cone signals or their comparison.", "Preserved faint-light detection is consistent with functioning rod pathways.", "These results cannot locate the change to the receptor itself or prove one particular diagnosis."],
        "Investigate cone pathways first. Comparing signals from different cone types supports colour discrimination. Faint-light detection can remain effective through rods. A later change in the visual pathway could also affect the colour task.",
        ["Which condition depends on comparing wavelength sensitivities?"]),
      practice: "p-endo-reflex-arc"
    },
    "f170/1.1.1.muscle": {
      revision: 1, title: "How muscle cells produce force together",
      goal: "Use cell shape and connections to explain how three muscle tissues produce movement.",
      explain: ["Actin and myosin filaments slide to generate force. In skeletal and cardiac muscle, repeating sarcomeres give the cells a banded appearance. The way cells are arranged affects where force is applied."],
      compare: {caption: "Three arrangements of contractile cells", head: ["Muscle", "Structure and consequence"], rows: [
        ["Skeletal", "Long, multinucleate striated fibres contain parallel myofibrils. Shortening along the fibres pulls on a tendon."],
        ["Cardiac", "Branched, striated cells meet at intercalated discs. Mechanical junctions transmit force and gap junctions allow excitation to spread between cells."],
        ["Smooth", "Spindle-shaped cells have contractile filaments arranged without visible striations. Slow, sustained contraction in a ring of cells can narrow a hollow organ."]
      ]},
      modelTitle: "Follow the force around a small artery",
      model: ["Imagine a ring of smooth muscle around a lumen. Shortening around the ring makes the lumen narrower.",
        "The absence of stripes does not mean these cells lack contractile proteins. It reflects how the filaments are organised."],
      guided: choice("A sample has striations. What further observation most strongly supports cardiac rather than skeletal muscle?", 2,
        [["It contains actin and myosin.", "Both tissues contain those filaments."], ["It shortens when stimulated.", "Both muscle types can shorten."], ["Branched cells join end to end at intercalated discs.", ""]],
        "Striations occur in both. Look at the boundaries between cells.", ["Which feature links one cell to its neighbours?"]),
      apply: written("In an experimental strip of heart muscle, a single cell still shortens when directly stimulated. Electrical signals spread poorly across its junctions with neighbouring cells. Explain how the strip can produce a weaker coordinated contraction.",
        ["Direct stimulation shows that the cell can still generate force.", "Poor electrical coupling impairs excitation of neighbouring cells.", "Fewer cells contract together, reducing coordinated force."],
        "The first cell can generate force. Poor signal transfer through gap junctions prevents nearby cells from being activated together, reducing the force of the coordinated contraction.",
        ["Separate the cell's ability to shorten from the timing across the strip."]),
      practice: "p-f170-tissue-hierarchy"
    }
  });
})();

(function () {
  const { choice, written } = window.KeystoneHumanTeaching;
  Object.assign(window.KeystoneHumanLessons, {
    "f170/1.1.3.evidence": {
      revision: 1, title: "What organelle evidence can tell us",
      goal: "Use a location, a ribosome reading or a changed product to explain where a cell process takes place.",
      prior: ["f170/1.1.3","Trace a secreted protein through a cell"],
      explain: ["The nucleus contains chromosomes. Inside it the nucleolus makes much of the ribosomal RNA and assembles ribosomal subunits. The subunits leave through nuclear pores. In the cytoplasm they can join on an mRNA to make a polypeptide.",
        "Human cytosolic ribosomes are 80S, including those attached to rough ER. Typical bacterial ribosomes are 70S. The S value measures how a particle sediments. Free and ER-bound cytosolic ribosomes are the same type. Human mitochondrial ribosomes are a distinct type.",
        "Rough ER receives many newly made proteins. Smooth ER makes many lipids. At the Golgi, different proteins can enter vesicles bound for different destinations. Some digestive enzymes reach acidic lysosomes, where they break down material."],
      table: {caption: "A tagged digestive enzyme in a fictional cell", head: ["Observation", "Finding"], rows:[
        ["New protein in rough ER", "Present"], ["Processed protein leaving Golgi", "Present"], ["Enzyme in lysosomes", "Very little"], ["Tagged enzyme outside cell", "Much more than usual"]
      ]},
      focusCells: [["0:0","1:0"],["2:0","3:0"]],
      modelTitle: "Locate a delivery fault",
      model: ["Start at the beginning. Finding the protein in rough ER and in the Golgi supports synthesis and passage between these compartments.",
        "Now compare destinations. Finding much of the enzyme outside and little in lysosomes suggests misdirected delivery. It does not by itself identify which sorting molecule failed."],
      guided: choice("A preparation from human cells contains 80S ribosomes on membranes. A second contains 80S ribosomes free in the cytosol. Which conclusion fits?", 1,
        [["The membrane sample must come from bacteria.", "Typical bacterial ribosomes are 70S. Position is a separate observation."], ["A human cytosolic ribosome can attach to the ER while making certain proteins.", ""], ["Attachment converts a 70S ribosome into an 80S ribosome.", "Attachment changes location without changing the ribosome type."]],
        "Use the S value to compare ribosome type and the attachment to infer location.", ["Which observation describes position?"]),
      apply: { ...written("The drawings show two regions of ER from different secretory cells. Cell P exports a protein hormone. Cell Q makes a steroid hormone from lipids. Use a visible feature to explain why each region suits its cell's product.",
        ["P has ribosomes on the surface of flattened sacs.", "These ribosomes synthesise the polypeptide that enters the rough ER.", "Q's tubules lack attached ribosomes and contain enzymes involved in lipid and steroid synthesis."],
        "The dots on P's sacs are attached ribosomes, linking rough ER to production of the exported protein. Q shows smooth tubules without attached ribosomes. Enzymes in smooth ER participate in making steroids. An ER profile alone would not identify a particular hormone.",
        ["Compare the outer faces of the membranes, then consider what each product is made of."]),
        illustration: {src:"/human-biology/er-profiles.svg", width:360,height:186,alt:"P shows flattened sacs with small dots along the outside. Q shows branching tubules with no surface dots. Same-scale schematics."}
      },
      practice: "f170-lysosome-evidence",
      further: [["challenge/f170/f170-nucleolus-export","Distinguish assembly from export"],["challenge/f170/f170-ribosome-fractions","Interpret ribosome measurements"]]
    },
    "f170/1.1.4.surface": {
      revision: 1, title: "How a membrane's components work together",
      goal: "Use the position of a membrane component to predict what changes when it is altered.",
      prior: ["f170/1.1.4","Review transport down and against gradients"],
      explain: ["In the fluid mosaic model, hydrophilic phospholipid heads face water on both sides. Hydrophobic tails point inwards. Many lipids and proteins move laterally. Small nonpolar molecules can diffuse through the core. Charged particles need a suitable transport protein.",
        "Intrinsic proteins are embedded in the bilayer and some span it. Extrinsic (peripheral) proteins attach at a surface. A receptor must have an accessible binding site of the right shape for its signal. Some receptors are surface-associated and many span the membrane. Binding can change activity inside the cell.",
        "Glycoproteins have carbohydrate chains on the extracellular side. Cell-surface antigens, including HLA proteins, allow immune recognition. Recognition of a donor's different antigens can trigger a response that damages a graft.",
        "In endocytosis the membrane encloses material in an inward-moving vesicle. In exocytosis a vesicle fuses with the surface and releases its contents. Both can move large cargo without the cargo crossing the hydrophobic core."],
      illustration: {src:"/human-biology/membrane-section.svg",width:384,height:232,alt:"Membrane cross-section. 1 points to a head at the fluid boundary, 2 to a small molecule among the tails, 3 to a chain on an outward-facing spanning protein and 4 to a protein on the cytoplasmic surface."},
      modelTitle: "Read from the water into the membrane",
      model: ["At 1, polar heads face the fluid. Between the two head layers is the oily core. Cholesterol (2) sits among the tails with its small polar end close to the heads.",
        "At body temperature cholesterol restrains some movement of nearby tails and can reduce leakage of small polar molecules. This stabilises the exposed membrane of a blood-vessel lining cell. Excessive ordering can reduce flexibility. At low temperatures cholesterol also prevents tight packing.",
        "At 3, a chain on a glycoprotein faces the outside, where other cells can encounter it. At 4, a peripheral protein is attached at the cytoplasmic face. Which side a binding site faces matters."],
      guided: choice("An external signal no longer binds to its receptor. A separate glucose carrier still moves glucose down its gradient. Which account fits?", 2,
        [["Glucose must enter by active transport because a protein is present.", "Facilitated diffusion uses a protein and can proceed down a gradient."], ["The signal must cross the bilayer to act.", "A signal can bind outside and trigger an intracellular response."], ["The accessible binding site for the signal may have changed while the carrier still functions.", ""]],
        "Recognition and transport rely on different interactions. A signal can cause a response without entering the cell.", ["Separate what binds from what crosses."]),
      apply: {...written("Two models of the blood-facing membrane of an endothelial cell have the same proteins and are tested at 37 °C. Use both readings to explain one benefit and one possible cost of the higher cholesterol content.",
        ["Lower tracer leakage supports a stronger barrier to this small polar tracer.", "Lower lateral mobility indicates more restricted movement within the membrane.", "This can limit flexibility or rearrangement. The experiment measures membrane properties, not a person's artery narrowing."],
        "The higher-cholesterol model leaks less tracer, which could help maintain a barrier. Its lipids also move laterally more slowly, consistent with greater ordering that could limit membrane flexibility. These findings concern cholesterol in the cell membrane.",
        ["Read the direction of each change separately."]),
        table: {caption:"Fictional membrane measurements at 37 °C",head:["Membrane","Tracer leakage (units/min)","Lateral lipid mobility (relative units)"],rows:[["Lower cholesterol","8","10"],["Higher cholesterol","3","6"]]}
      },
      practice: "f170-graft-recognition", further: [["challenge/f170/f170-vesicle-directions","Follow labelled cargo across a cell boundary"]]
    }
  });
})();

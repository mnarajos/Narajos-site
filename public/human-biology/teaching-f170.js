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
    "f170/1.1.2": {
      revision: 1,
      goal: "Use a micrograph's scale bar or stated magnification to estimate size. Explain whether a larger image shows finer detail.",
      activate: ["Quick check: how many µm are in 1 mm?", "1 mm = 1,000 µm and 1 µm = 1,000 nm. Convert to the same unit before dividing two lengths."],
      explain: [
        "A scale bar labels a known actual length. The structure and bar are measured on the same image, so resizing both together preserves their ratio.",
        "Magnification is image size ÷ actual size. Resolution is the ability to distinguish two nearby points. Enlarging a blurred image spreads out the same information."
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
    "f170/2.2.3": {
      revision: 1,
      goal: "Interpret ventilation measurements and explain what they tell you about oxygen delivery.",
      activate: ["Quick check: what does tidal volume measure?", "It is the volume of air moved in one breath. Breathing rate tells you how many breaths occur each minute."],
      explain: ["Pulmonary ventilation is tidal volume multiplied by breathing rate. This measures air moved per minute. Oxygen transfer also depends on gas exchange and blood flow."],
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
    "f170/3.2.1": {
      goal: "Follow a reflex pathway and predict which parts still work if one link is interrupted.",
      activate: ["What is an effector?", "A muscle or gland that produces a response to a signal."],
      explain: ["Electrical signals travel along neurones. At a chemical synapse, a neurotransmitter carries information across the gap. A relay neurone in the spinal cord can connect sensory input to a motor response."],
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

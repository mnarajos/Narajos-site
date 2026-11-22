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
      goal: "Read a photomicrograph and use a scale bar to estimate actual size.",
      activate: ["Which is smaller, a micrometre or a nanometre?", "One micrometre (µm) equals 1,000 nanometres (nm). One millimetre (mm) equals 1,000 µm."],
      explain: [
        "A schematic selects features to make a structure clear. A photomicrograph shows what was actually captured from a specimen. Stain, viewing angle and section thickness can change its appearance.",
        "Magnification is how many times larger an image is than the object. Resolution is the ability to distinguish nearby points. Electron microscopy can resolve smaller details than light microscopy. Conventional electron microscopy uses prepared, non-living specimens."
      ],
      visual: "model",
      modelTitle: "Measure a red cell from its scale bar",
      model: [
        "Find the two lengths on the photograph below. The marked cell spans 48 pixels. The bar spans 122 pixels and represents 20 µm.",
        "Divide the marked width by the bar width: 48 ÷ 122 ≈ 0.39. The cell is a little under half a scale bar wide.",
        "Multiply this ratio by the length represented: 0.39 × 20 µm ≈ 8 µm. Both pixel lengths change by the same factor if you resize the image."
      ],
      skills: ["magnification", "units"],
      guided: choice("A second cell spans 60 pixels. The 20 µm bar still spans 122 pixels. What is the closest estimate?",
        1, [["3 µm", "At roughly half the bar width, the answer should be roughly half of 20 µm."], ["10 µm", ""], ["61 µm", "The measurement in pixels needs to be converted using the scale bar."]],
        "60 ÷ 122 is close to 0.5. Half of 20 µm is about 10 µm.", ["Compare the cell width with the bar width.", "Multiply the fraction of the bar by 20 µm."]),
      apply: choice("On another image, a nucleus is 18 mm wide and the 5 µm scale bar is 15 mm long. Estimate the actual width.",
        2, [["4.2 µm", "The nucleus is wider than the bar, so it must be larger than 5 µm."], ["1.2 µm", "1.2 is the ratio in scale-bar lengths. It has no units."], ["6 µm", ""]],
        "18 ÷ 15 = 1.2. The nucleus is 1.2 × 5 µm = 6 µm wide.", ["Work out how many scale bars fit across the nucleus."]),
      followup: choice("A bacterium spans 45 pixels. A 2 µm bar spans 30 pixels. What is the actual length?",
        0, [["3 µm", ""], ["1.3 µm", "The bacterium is longer than the bar. Start with 45 ÷ 30."], ["15 µm", "The pixel difference is not a physical length."]],
        "The bacterium spans 1.5 scale bars: 1.5 × 2 µm = 3 µm.")
    },
    "f170/1.1.4": {
      goal: "Use gradients and the membrane to explain the direction of net transport.",
      activate: ["What is a concentration gradient?", "A difference in concentration between two places. Name the substance before comparing its concentrations."],
      explain: [
        "Particles move randomly. In diffusion, more particles move down the concentration gradient than move the other way, giving net movement. Some solutes diffuse through membrane proteins.",
        "Osmosis is net movement of water through a partially permeable membrane from higher to lower water potential. Active transport uses energy and membrane proteins to move a substance against its gradient."
      ],
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
      goal: "Trace blood through the heart and use chamber pressure to explain blood flow.",
      activate: ["What happens when a muscle chamber contracts?", "Its pressure rises if the blood is confined. A valve opens when the pressure on its upstream side exceeds downstream pressure."],
      explain: ["The right side of the heart pumps blood to the lungs. The left side pumps blood to the body. Valves respond to pressure differences and help keep flow one-way."],
      modelTitle: "Follow a red cell from the right ventricle",
      nodes: ["Right ventricle", "Lungs", "Left heart and body"],
      model: [
        "The right ventricle contracts. When its pressure exceeds pulmonary-artery pressure, the pulmonary valve opens and blood enters the pulmonary artery.",
        "Blood passes through capillaries next to alveoli. Oxygen diffuses into the blood and binds to haemoglobin.",
        "Pulmonary veins carry blood to the left atrium. Blood then enters the left ventricle, which pumps it into the aorta towards the body."
      ],
      skills: ["cardiac"],
      guided: choice("Pressure in the left ventricle rises above the left atrium but stays below the aorta. Which valves are closed?", 1,
        [["Only the aortic valve.", "A high ventricular pressure also closes the valve leading back to the atrium."], ["Both the mitral and aortic valves.", ""], ["Only the mitral valve.", "Check whether the ventricle can push open the valve against aortic pressure."]],
        "The mitral valve closes when ventricular pressure exceeds atrial pressure. Aortic pressure still exceeds ventricular pressure, so the aortic valve stays closed.", ["Compare pressures across one valve at a time."]),
      apply: choice("A tracer is injected into a vein returning blood from the leg. Where does it pass before reaching the left atrium?", 2,
        [["Aorta, left ventricle, lungs.", "The aorta carries blood out of the left ventricle towards the body."], ["Right atrium, left ventricle, pulmonary vein.", "The right atrium empties to the right ventricle."], ["Right atrium, right ventricle, lungs, pulmonary vein.", ""]],
        "Systemic veins return to the right heart. Pulmonary veins return blood from the lungs to the left atrium.", ["Veins return blood towards the heart. Which side receives blood from the body first?"])
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
      goal: "Interpret a change in breathing measurements using tidal volume and breathing rate.",
      explain: ["Tidal volume is the volume moved per breath. Pulmonary ventilation per minute is tidal volume multiplied by breaths per minute."],
      model: ["Read the units first. A tidal volume of 500 mL is 0.50 L.", "Multiply by 12 breaths per minute to get 6.0 L per minute. The same calculation works even when both factors change."],
      skills: ["ventilation", "cardiac"],
      guided: choice("A tidal volume of 0.60 L and 15 breaths per minute give what ventilation?", 1,
        [["0.04 L/min", "Multiply the volume per breath by the number of breaths."], ["9.0 L/min", ""], ["25 L/min", "Using consistent units, calculate 0.60 × 15."]],
        "0.60 × 15 = 9.0 L/min.", ["The two quantities are multiplied."]),
      apply: choice("Breathing changes from 12 × 0.50 L to 24 × 0.30 L per minute. How does pulmonary ventilation change?", 0,
        [["It rises from 6.0 to 7.2 L/min.", ""], ["It doubles to 12 L/min.", "Breathing rate doubles but tidal volume also changes."], ["It falls to 3.6 L/min.", "Use the new tidal volume and the new rate together."]],
        "Compare both products: 12 × 0.50 = 6.0 and 24 × 0.30 = 7.2 L/min.")
    },
    "f170/3.1.1": {
      goal: "Use a feedback loop to explain a change in blood glucose and predict the effect of an interrupted response.",
      activate: ["What are the target cells in a hormonal response?", "They have receptors for the hormone and can change their activity when they receive the signal."],
      explain: ["Negative feedback counteracts a deviation in a regulated variable. Track the variable at the start and at the end of the loop."],
      nodes: ["Blood glucose rises", "Insulin release rises", "Target tissues respond", "Blood glucose falls"],
      model: [
        "After a meal, absorbed glucose enters the blood.",
        "Pancreatic beta cells detect the rise and release more insulin.",
        "Muscle and adipose cells take up more glucose. The liver and muscle promote glycogen storage.",
        "The response opposes the original rise. As glucose falls towards its usual range, the stimulus for extra insulin release diminishes."
      ],
      guided: choice("After a meal, muscle cells respond poorly to insulin. What happens compared with an otherwise similar person?", 2,
        [["Muscle takes up extra glucose in direct response to impaired signalling.", "Reduced sensitivity weakens the effect of a given insulin signal."], ["The meal can no longer raise blood glucose.", "Glucose can still be absorbed from the gut."], ["Glucose uptake by muscle may rise less, so the rise in blood glucose may last longer.", ""]],
        "Follow the failure at the target tissue through to its effect on the original variable.", ["Identify the step after insulin release."]),
      apply: written("Between meals, blood glucose begins to fall. Explain how glucagon can help oppose this change.",
        ["Pancreatic alpha cells increase glucagon release.", "Glucagon acts on the liver, increasing glycogen breakdown and glucose release.", "Blood glucose rises towards its usual range."],
        "Glucagon signals the liver to release more glucose, partly by breaking down glycogen. The response counteracts the original decrease.", ["Start with a fall. Which response tends to raise blood glucose?"])
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
      goal: "Recognise reproductive tissues in photomicrographs using visible features.",
      activate: ["How does a tissue section differ from an anatomy diagram?", "It shows a thin slice through part of a structure. A single field may show only one region, and a tube may appear round or elongated depending on the cut."],
      explain: [
        "The uterine endometrium is the inner lining, with glands. The deeper myometrium is smooth muscle. Ovarian follicles enclose developing oocytes. Seminiferous tubules in testes are lined by layers of developing germ cells.",
        "Use the arrangement of structures as evidence. Staining colour can vary across preparations."
      ],
      photo: uterine,
      modelTitle: "Identify the uterine lining from its glands",
      model: [
        "Find the free surface at the top of the field. The pale spaces below are sections through glands in surrounding tissue.",
        "The surface and multiple gland profiles support identification of the endometrium. The image shows a gland-rich field, not the full uterine wall.",
        "A round outline alone is weak evidence. Look for an oocyte surrounded by follicle cells in ovary, or layers of germ cells around a lumen in testis."
      ],
      guided: choice("Which visible feature supports identification of an ovarian follicle?", 1,
        [["Small glands scattered beneath a free surface.", "That arrangement fits uterine lining."], ["A large cell encircled by much smaller cells.", ""], ["A broad lumen with many layers of cells along one edge.", "A lumen with layered developing germ cells is typical of a seminiferous tubule."]],
        "The large central cell is an oocyte with surrounding follicle cells. The source is a close view of a mature follicle.",
        ["Look for one unusually large cell near the centre."], { photo: ovarian }),
      apply: choice("Identify the tissue using the cell arrangement around the pale space.", 2,
        [["Uterine endometrium.", "Look for layers of germ cells and profiles near the lumen rather than scattered glands beneath a surface."], ["Ovarian follicle.", "The field does not contain a single large oocyte surrounded by follicle cells."], ["Testis, showing part of a seminiferous tubule.", ""]],
        "Developing germ cells are arranged in layers towards the lumen of the tubule. The dark profiles near the lumen are compatible with later stages of sperm development.", ["Ask whether the pale space is surrounded by several layers of developing cells."], { photo: testicular }),
      followup: choice("A new tissue section shows closely packed tube profiles with layered cells around their lumens. A second section shows glands under an epithelial surface. Which is which?", 0,
        [["First testis; second uterine endometrium.", ""], ["First endometrium; second testis.", "Use the layered tubule lining and the free surface to distinguish the specimens."], ["Both are ovarian follicles.", "No large oocyte enclosed by follicle cells is described."]],
        "The combination of repeated tube profiles and layered germ cells supports testis. Glands below a lining are consistent with endometrium.")
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

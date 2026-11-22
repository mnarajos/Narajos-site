const part = (x, y, cue, name, role) => ({ x, y, cue, name, role });
const label = (parts, feedback) => ({
  type: "label", prompt: "Put each label where its line ends.", parts, feedback
});
const point = (prompt, answer, feedback) => ({ type: "point", prompt, answer, feedback });
const choose = (prompt, options, answer, feedback) => ({ type: "choice", prompt, options, answer, feedback });
const order = (prompt, items, feedback) => ({ type: "order", prompt, items, feedback });
const number = (prompt, answer, unit, feedback) => ({ type: "number", prompt, answer, unit, feedback });
const written = (prompt, points) => ({ type: "written", prompt, points });

export const topics = {
  breathing: {
    group: "Human Biology F170", title: "Breathing in and out",
    cue: "Compare the ribs and diaphragm in the two positions. Follow the change in chest volume.",
    states: [
      ["breath-in", "Breathing in", "Ribs move up and out. The diaphragm contracts and flattens. Chest volume rises.", "Front view of rib cage with expanded lungs and a low, flat diaphragm."],
      ["breath-out", "Breathing out", "In quiet breathing the muscles relax. The diaphragm returns to a dome and chest volume falls.", "Front view with a narrower rib cage and a raised, dome-shaped diaphragm."]
    ],
    parts: {
      A: part(300, 82, "Upper central airway", "Trachea", "Carries air towards the two bronchi."),
      B: part(155, 157, "Curved bar outside a lung", "Rib cage", "Moves up and out during inhalation."),
      C: part(301, 282, "Curved muscle below the lungs", "Diaphragm", "Contracts and flattens during inhalation.")
    },
    questions: [
      label(["A", "B", "C"], "Use each leader line to distinguish an airway, bones and the muscle below the lungs."),
      point("Which structure flattens when it contracts?", "C", "The diaphragm contracts and becomes flatter, leaving more space in the chest."),
      order("Put these changes in order for a breath in.", ["The diaphragm contracts and flattens", "Chest volume increases", "Pressure in the lungs falls below atmospheric pressure", "Air moves into the lungs"], "The pressure difference follows the increase in volume and causes airflow."),
      choose("At the end of a quiet breath in, airflow briefly stops. How do the pressures compare at that instant?", ["Lung pressure is at its minimum", "Lung pressure equals atmospheric pressure", "Atmospheric pressure is zero"], 1, "With the airway open, air stops flowing when there is no pressure difference."),
      written("Explain why weaker contraction of the diaphragm can reduce the volume of air breathed in.", ["The diaphragm flattens less.", "Chest volume increases by less.", "There is a smaller pressure difference to drive air in."])
    ]
  },
  airway: {
    group: "Human Biology F170", title: "The lining of an airway",
    cue: "Look at the surface facing the air. Follow the trapped particles towards the throat.",
    states: [["airway", "Airway lining", "This enlarged cross-section shows mucus over ciliated cells, with smaller cells near the base. The arrow shows mucus movement towards the throat.", "Airway lining with hair-like projections, a cup-shaped cell, a layer above the cells and dots in that layer."]],
    parts: {
      A: part(118, 113, "Layer containing small dots", "Mucus", "Traps particles carried in inhaled air."),
      B: part(260, 139, "Hair-like projections on the cell surface", "Cilia", "Beat to move the mucus towards the throat."),
      C: part(349, 191, "Cup-shaped cell between cells with projections", "Goblet cell", "Secretes mucus into the airway.")
    },
    questions: [
      label(["A", "B", "C"], "The goblet cell makes the mucus. The cilia move it."),
      point("Which structure provides the movement that carries trapped dust towards the throat?", "B", "Cilia beat. Dust is carried in the mucus they move."),
      order("Put the steps in order from inhaling dusty air to clearing the dust.", ["Air containing dust enters the airway", "Dust sticks to the mucus", "Cilia move the mucus towards the throat"], "Dust sticks to mucus before the mucus is moved."),
      choose("A tissue section shows thin, flat cells and no cilia. Which job does this structure suit best?", ["Moving mucus towards the throat", "Providing a short diffusion distance", "Contracting to change airway diameter"], 1, "Thin, flat cells provide a short diffusion distance. This suits gas exchange at an alveolus."),
      written("A chemical stops cilia beating. Explain one consequence for particles already caught in mucus.", ["The particles are still trapped.", "Mucus clearance slows, so the particles stay in the airway longer."])
    ]
  },
  cuff: {
    group: "Human Biology F171", title: "Measuring blood pressure",
    cue: "Follow the cuff from the upper arm to the monitor. Trace the artery under the cuff.",
    states: [["cuff", "Upper-arm measurement", "The pressure cuff goes around the upper arm. Keep the supported arm at heart level when comparing readings.", "Upper arm and forearm, red vessel underneath, cuff around the upper arm and tube to a digital display showing 124 over 78."]],
    parts: {
      A: part(243, 118, "Band around the upper arm", "Inflatable cuff", "Applies pressure around the arm."),
      B: part(385, 183, "Red vessel drawn beneath the skin", "Artery", "Carries blood away from the heart."),
      C: part(474, 271, "Two numbers on the display", "Blood pressure reading", "Shows systolic pressure above diastolic pressure in mmHg.")
    },
    questions: [
      label(["A", "B", "C"], "Follow the tube from the inflatable cuff to the monitor."),
      point("Which part applies pressure to the arm?", "A", "The cuff is inflated around the upper arm."),
      number("The reading is 124/78 mmHg. Calculate the difference between systolic and diastolic pressure.", 46, "mmHg", "Subtract diastolic from systolic pressure: 124 − 78 = 46 mmHg."),
      choose("A pupil compares a reading taken immediately after climbing stairs with one taken after a seated rest. What is the greatest weakness?", ["The readings are in the same units", "The arm was supported both times", "Activity before the measurements differed"], 2, "Activity can change the reading. Compare measurements made under standardised conditions."),
      written("Three resting systolic readings are 122, 125 and 123 mmHg. One reading immediately after exercise is 154 mmHg. Explain why the readings should be recorded as separate sets.", ["The resting readings are close together.", "The high reading was made under a different condition.", "A combined mean would conceal the difference between resting and post-exercise measurements."])
    ]
  },
  cast: {
    group: "Human Biology F171", title: "How a cast supports healing",
    cue: "Follow the two bone ends in the cutaway. Notice what surrounds them.",
    states: [["cast", "Forearm cast cutaway", "A window in this drawing shows a simplified fracture. A rigid cast limits movement while healing takes place.", "Side view of a forearm with a rigid shell drawn in cutaway and a narrow zigzag break in the bone."]],
    parts: {
      A: part(221, 128, "Outer covering above the cutaway", "Cast shell", "Limits movement."),
      B: part(294, 176, "Gap between the two bone ends", "Fracture", "Break in the bone."),
      C: part(381, 178, "Solid structure inside the arm", "Bone", "Living tissue repairs the damaged region.")
    },
    questions: [
      label(["A", "B", "C"], "The cutaway lets you see the bone and the break through the external cast."),
      point("Select the site where new bone tissue needs to bridge the break.", "B", "New tissue must bridge the fracture between the two bone ends."),
      choose("Which statement explains how a cast helps?", ["It replaces the damaged bone", "It limits movement and helps maintain alignment", "It increases movement at the fracture"], 1, "Immobilising the region helps maintain alignment while the bone heals."),
      choose("Two fractures differ in stability. Which extra fact best helps explain why one may need fixation as well as external support?", ["Whether the bone ends stay aligned after repositioning", "Whether both arms have the same length", "Whether the person prefers a particular cast colour"], 0, "Whether alignment can be maintained is relevant to a decision about additional support."),
      written("A learner says the plaster does the healing. Improve that explanation.", ["The cast keeps the region still and helps maintain alignment.", "Living tissue carries out repair."])
    ]
  },
  antibody: {
    group: "Human Biology F171", title: "Antibody structure and binding",
    cue: "Match each coloured antigen to a binding tip. Compare the tips with the stem.",
    states: [["antibody", "One antibody molecule", "Two matching antigen-binding regions are at the tips of this simplified antibody. The constant stem region can interact with other immune components.", "Y-shaped antibody with matching tips, a stem and two matching antigen shapes."]],
    parts: {
      A: part(156, 91, "Tip of the left arm of the Y", "Antigen-binding site", "Its shape and chemical properties allow specific binding."),
      B: part(143, 44, "Separate shape above the arm", "Antigen", "A target recognised by the antibody."),
      C: part(301, 266, "Lower stem of the Y", "Constant region", "Can interact with other immune components.")
    },
    questions: [
      label(["A", "B", "C"], "The antigen and antibody are different molecules. The site on the antibody binds the antigen."),
      point("Which region must match the part of the antigen it binds?", "A", "Specific binding occurs at the antigen-binding site."),
      choose("An antigen changes at the part that previously bound this antibody. What is a possible effect?", ["The antibody may bind less strongly", "The antibody automatically changes shape to fit every antigen", "The antigen binds only to the constant region"], 0, "A change in a binding surface may change the strength of binding."),
      written("Explain why production of many antibodies after one exposure does not guarantee strong binding to a differently shaped antigen.", ["Antibody binding depends on a complementary site.", "A differently shaped antigen may have poorer complementarity, even if many antibodies are present."])
    ]
  },
  filtration: {
    group: "KS3", title: "Separating sand from water",
    cue: "Follow the mixture into the funnel. Look at what stays on the paper and what reaches the beaker.",
    states: [["filtration", "Filtration apparatus", "Sand stays on the filter paper. Water passes through the paper into the beaker.", "A beaker pours a mixture into a funnel. A triangle of paper in the funnel holds solid above a receiving beaker."]],
    parts: {
      A: part(236, 150, "Thin lining inside the funnel", "Filter paper", "Its pores let the water through."),
      B: part(300, 179, "Solid layer resting on the lining", "Residue", "The insoluble solid stays on the paper."),
      C: part(342, 302, "Liquid in the receiving beaker", "Filtrate", "The liquid collected after passing through the filter.")
    },
    questions: [
      label(["A", "B", "C"], "Use the position of each part to distinguish the paper, the residue and the filtrate."),
      point("Where would you collect the separated water?", "C", "Water goes through the paper and collects as the filtrate."),
      choose("What happens if the mixture is a clear salt solution?", ["Salt stays on the paper as crystals", "Dissolved salt passes through with the water", "The water remains on the filter paper"], 1, "Ordinary filter paper separates suspended solids. Dissolved salt passes through."),
      written("The collected water looks cloudy. Give one possible fault in the setup and explain how it could let sand through.", ["The paper could be torn or not fitted to the funnel.", "Solid particles could bypass the paper through the gap."])
    ]
  },
  circuits: {
    group: "KS3", title: "Follow a complete circuit",
    cue: "Look at the gap in the wire. Close the switch and trace one complete loop.",
    states: [
      ["circuit-open", "Switch open", "There is a break in the loop. No current flows through the lamp.", "Series circuit with a cell at the base, an open switch at the top and an unlit lamp on the right."],
      ["circuit-closed", "Switch closed", "The switch completes the loop. Current flows through the lamp.", "The switch connects the wire at the top and the lamp is lit."]
    ],
    parts: {
      A: part(203, 77, "Moving contact at the top", "Switch", "Opens or closes the circuit."),
      B: part(476, 198, "Circle with a cross", "Lamp", "Lights when enough current flows through it."),
      C: part(273, 275, "One long line and one short line", "Cell", "Provides a potential difference.")
    },
    questions: [
      label(["A", "B", "C"], "Identify components by their standard circuit symbols."),
      point("Which component creates a gap when it is opened?", "A", "Opening the switch breaks the conducting loop."),
      choose("A wire comes loose below the lamp. The switch stays closed. What happens?", ["The lamp stays lit because the switch is closed", "The lamp goes out because the loop is broken", "The lamp becomes brighter because there is less wire"], 1, "A break anywhere in this single loop stops current through the lamp."),
      written("A pupil moves the open switch to the wire below the lamp. Explain why the lamp still goes out.", ["The circuit is one loop.", "A break anywhere in that loop stops current through the lamp."])
    ]
  },
  syringe: {
    group: "KS3", title: "Squeezing a gas",
    cue: "Follow the piston as it moves towards the sealed end. Think about what happens to the same gas particles.",
    states: [["gas-syringe", "A sealed syringe", "The arrow shows the direction of the applied push. This model assumes the gas stays at the same temperature.", "A capped syringe with gas particles trapped to the left of a piston. An arrow points from the handle towards the gas."]],
    parts: { A: part(460, 169, "Moving rectangle attached to the handle", "Piston", "Changes the volume of the trapped gas."),
      B: part(72, 176, "Closed tip at the far left", "Sealed end", "Keeps the gas inside."),
      C: part(276, 169, "Region containing the green dots", "Trapped gas", "Its particle number stays fixed.") },
    questions: [
      point("What moves to reduce the volume?", "A", "The piston moves into the gas space."),
      choose("The piston moves in at constant temperature. What changes?", ["The particles get smaller", "The same particles collide with the walls more often", "More particles enter through the closed tip"], 1, "Less space means particles reach the walls more often."),
      order("Put these changes in order.", ["Push the piston in", "The gas occupies less space", "Collisions with the walls happen more often", "Gas pressure rises"], "Pressure rises because the frequency of collisions increases at constant temperature."),
      written("Explain why a sealed syringe is harder to squeeze as the piston goes in.", ["The same number of particles occupies less volume.", "Wall collisions are more frequent.", "Gas pressure increases, so a greater force on the piston is needed to move it further."])
    ]
  },
  "iv-circuit": {
    group: "GCSE Combined Science", title: "Measuring current and potential difference",
    cue: "Trace the main loop and the branch across the resistor. See which meter sits in each.",
    states: [["iv-circuit", "An I–V circuit", "The ammeter is in series with the component. The voltmeter is across it. The diagram shows the measurement connections.", "A cell and ammeter form a loop with a resistor at the bottom. A voltmeter lies on a branch joining the two sides of the resistor."]],
    parts: { A: part(490, 202, "Meter in the outside loop", "Ammeter", "Measures current through the resistor."),
      B: part(300, 176, "Meter on the branch", "Voltmeter", "Measures potential difference across the resistor."),
      C: part(298, 287, "Rectangle in the outside loop", "Resistor", "The component being tested.") },
    questions: [
      label(["A", "B", "C"], "Ammeter in series. Voltmeter across the component."),
      point("Where is the meter that measures charge passing through the component each second?", "A", "Charge per second is current, measured by the ammeter."),
      choose("Two points on the graph for a fixed resistor are 1.0 V at 0.10 A and 2.0 V at 0.20 A. What does this show?", ["The resistance doubled", "The resistance halved", "Resistance stayed constant across these readings"], 2, "The ratio V/I is 10 Ω in both readings."),
      number("Calculate the resistance when the meters read 3.0 V and 0.30 A.", 10, "Ω", "Use R = V/I. 3.0 ÷ 0.30 = 10 Ω."),
      written("To investigate more points on the graph, suggest one circuit change and one condition to control.", ["Vary the supply or use a variable resistor to change the potential difference across the component.", "Keep the tested resistor at a constant temperature."])
    ]
  },
  electrolysis: {
    group: "GCSE Combined Science", title: "Electrolysis of copper chloride solution",
    cue: "Trace each electrode to its supply terminal. Compare the coating with the bubbles.",
    states: [["electrolysis", "Copper chloride solution", "This is a teaching diagram of products at inert electrodes. The arrows represent movement of oppositely charged ions.", "Two electrodes in solution connected to a power supply. The left is negative and gains an orange coating. The right is positive and has bubbles."]],
    parts: { A: part(220, 155, "Electrode connected to the minus terminal", "Cathode", "Copper ions gain electrons here."),
      B: part(393, 154, "Electrode connected to the plus terminal", "Anode", "Chloride ions lose electrons here."),
      C: part(302, 210, "Liquid carrying the ions", "Electrolyte", "Contains mobile ions that carry charge.") },
    questions: [
      label(["A", "B", "C"], "Use the supply signs to identify the electrodes. The electrolyte is the liquid."),
      point("Select the electrode that gains a copper coating.", "A", "Positive copper ions are attracted to the negative cathode."),
      choose("The supply connections are reversed. What happens to the position of new copper deposits?", ["They remain on the original negative electrode", "They form on the electrode that is now negative", "They form on both electrodes equally"], 1, "The cathode is defined by the connection. Copper ions gain electrons at the electrode now connected to the negative terminal."),
      order("Put the steps leading to the copper coating in order.", ["Copper ions move towards the negative electrode", "Copper ions gain electrons at the electrode", "Copper atoms build up on the electrode"], "Gaining electrons turns the ions into copper atoms."),
      written("Solid copper chloride contains ions. Explain why its solution can conduct when the solid cannot.", ["Ions in the solution are free to move and carry charge.", "Ions are held in fixed positions in the solid."])
    ]
  },
  leaf: {
    group: "GCSE Combined Science", title: "Leaf structure and gas exchange",
    cue: "Follow the arrow from outside air to the air spaces. Compare the densely packed upper cells with the lower layer.",
    states: [["leaf", "Leaf cross-section", "The upper cells receive light. Carbon dioxide can pass through a stoma into the air spaces. This diagram shows selected tissues in one section.", "A cuticle covers the upper surface. Closely packed cells containing many chloroplasts are above a layer with open spaces. A pore interrupts the lower surface."]],
    parts: { A: part(183, 189, "Column of cells with many small green bodies", "Palisade mesophyll", "Contains many chloroplasts for photosynthesis."),
      B: part(313, 249, "Gap between the irregular cells", "Air space", "Lets gases diffuse within the leaf."),
      C: part(302, 293, "Opening between two curved cells", "Stoma", "Allows gases to move between the leaf and outside air."),
      D: part(428, 91, "Thin waterproof layer at the top", "Waxy cuticle", "Reduces water loss at the surface.") },
    questions: [
      label(["A", "B", "C", "D"], "Distinguish a tissue, an air space, a surface pore and the outer coating."),
      point("Select the opening through which carbon dioxide enters from outside air.", "C", "A stoma is a pore. Guard cells surround it."),
      choose("Why are many chloroplasts in cells just below the upper surface useful?", ["These cells can absorb more light for photosynthesis", "They keep all water out of the leaf", "Chloroplasts carry sugars out through the stoma"], 0, "Chloroplasts absorb light. Their placement gives these cells access to light."),
      choose("A pupil labels the tall cells packed with chloroplasts as upper epidermis. Which visible feature supports a better label?", ["A single thin sheet at the surface", "Tall cells containing many chloroplasts below the surface", "An open pore between two curved cells"], 1, "These are palisade mesophyll cells. The epidermis is the sheet above them."),
      order("Order the path of carbon dioxide from outside the leaf.", ["Outside air", "Stoma", "Internal air space", "Photosynthesising cell"], "Gas passes through the surface pore and then diffuses through spaces inside the leaf."),
      written("Stomata close on a hot dry day. Explain one benefit and one cost.", ["Closing stomata reduces water loss.", "Less carbon dioxide enters, which can limit photosynthesis."])
    ]
  },
  phloem: {
    group: "A-level Biology", title: "The mass flow hypothesis",
    cue: "Follow sucrose into the sieve tube at the source. Compare movement of water near the source and near the sink.",
    states: [["phloem", "One source-to-sink route", "The blue vessel is xylem. The green column is a sieve tube. The side arrows show loading, unloading and the net movement of water between the tubes.", "Two adjacent tubes run from source to sink. Water moves from the blue tube into the green tube at the source and back near the sink."]],
    parts: { A: part(208, 179, "Blue water-conducting vessel", "Xylem", "Supplies water that can enter the phloem at the source."),
      B: part(382, 178, "Green conducting column", "Sieve tube", "Transports sucrose in the phloem sap."),
      C: part(377, 239, "Perforated cross-wall in the green column", "Sieve plate", "Has pores through which sap can pass."),
      D: part(488, 276, "Tissue receiving sucrose", "Sink", "Uses or stores sucrose, keeping it moving out of the tube.") },
    questions: [
      label(["A", "B", "C", "D"], "Follow the direction of sucrose movement and find the route water takes between the vessels."),
      point("Which structure lets sap pass from one sieve tube element to the next?", "C", "Pores through the sieve plate connect neighbouring sieve tube elements."),
      order("Put these events near the source in order.", ["Sucrose is loaded into the sieve tube", "Water potential in the sieve tube decreases", "Water enters the sieve tube by osmosis", "Hydrostatic pressure at the source increases"], "The change in water potential precedes water entry and the rise in hydrostatic pressure."),
      choose("A leaf becomes a net exporter while a growing root uses the sugars. What drives flow along this sieve tube?", ["A hydrostatic pressure difference between source and sink", "A difference in light intensity acting directly on the sap", "Water actively pumped from one sieve element to the next"], 0, "The pressure gradient drives bulk movement along the tube."),
      choose("A leaf takes up labelled carbon dioxide. Labelled sugars are later detected below that leaf. Which conclusion fits the evidence?", ["Sugar produced in the leaf can move to another part of the plant", "The observation by itself establishes what drives mass flow", "Only water moved away from the leaf"], 0, "Labelled sugar traces transport. The observation alone cannot identify the force driving the transport."),
      written("Predict how failing to unload sucrose at the sink could affect mass flow.", ["Sucrose may accumulate at the sink, lowering water potential there.", "Less water leaves the sieve tube at the sink.", "The hydrostatic pressure difference may decrease, slowing mass flow."])
    ]
  },
  nephron: {
    group: "A-level Biology", title: "The nephron and selective reabsorption",
    cue: "Trace the filtrate from the cup around the capillary knot to the collecting duct.",
    states: [["nephron", "Blood and filtrate routes", "The red route shows vessels around the glomerulus. The blue route shows the tubule and collecting duct. The short red vessels alongside the tubule are examples of capillaries that receive reabsorbed substances. The arrows show filtration and selected movements out of the tubule.", "A red capillary knot sits inside a blue cup at upper left. A coiled tube leaves it, loops down, returns upwards and joins a straight collecting duct."]],
    parts: { A: part(174, 94, "Red capillary knot within the cup", "Glomerulus", "Provides the high-pressure capillary bed for ultrafiltration."),
      B: part(133, 132, "Blue cup enclosing the knot", "Bowman’s capsule", "Receives the ultrafiltrate."),
      C: part(300, 146, "First coiled tubule after the cup", "Proximal convoluted tubule", "Selectively reabsorbs glucose and other useful solutes."),
      D: part(505, 225, "Straight tube leading away on the right", "Collecting duct", "Water permeability changes in response to ADH.") },
    questions: [
      label(["A", "B", "C", "D"], "Keep the capillaries, the receiving capsule and the following tubule distinct."),
      point("Where does the filtrate first collect after crossing the filtration barrier?", "B", "The filtrate enters Bowman’s capsule before passing into the proximal tubule."),
      choose("A large plasma protein is normally absent from filtrate. What best accounts for this?", ["It cannot cross the filtration barrier in appreciable amounts", "It cannot move along a concentration gradient anywhere in the body", "It was already reabsorbed in the collecting duct"], 0, "The barrier restricts passage of large proteins before selective reabsorption can occur."),
      order("Order the events affecting a glucose molecule that is filtered and then reabsorbed.", ["The molecule crosses the filtration barrier", "Filtrate enters Bowman’s capsule", "Glucose moves from the proximal tubule into epithelial cells", "Glucose returns to the blood"], "Selective reabsorption follows filtration and returns glucose to the blood."),
      written("Explain how an increase in ADH can reduce water loss.", ["ADH increases collecting duct permeability to water.", "More water moves out of the filtrate by osmosis down a water potential gradient.", "Less water is lost in a smaller volume of more concentrated urine."])
    ]
  },
  sarcomere: {
    group: "A-level Biology", title: "Sliding filaments in a sarcomere",
    cue: "Compare the positions of the ends of the blue filaments. Watch the distance between the Z lines and the width of the A band.",
    states: [
      ["sarcomere-long", "Longer sarcomere", "The Z lines are farther apart, with less overlap between actin and myosin.", "Blue thin filaments attach to the outer Z lines. Thick red filaments occupy the central A band."],
      ["sarcomere-short", "Shorter sarcomere", "The Z lines are closer and overlap is greater. The thick and thin filaments keep the same lengths.", "The Z lines and attached blue filaments have moved inwards. The red filaments and A band have the same width."]
    ],
    parts: { A: part(63, 132, "Vertical boundary at the left", "Z line", "The thin filaments anchor here."),
      B: part(113, 181, "Thin line extending inwards from the boundary", "Actin filament", "Slides past the thick filament."),
      C: part(308, 160, "Thick line within the middle band", "Myosin filament", "Myosin heads pull actin towards the middle.") },
    questions: [
      label(["A", "B", "C"], "A Z line anchors thin filaments. Thick filaments are central."),
      point("Find the left-hand boundary that moves inwards during shortening.", "A", "The Z lines move closer together."),
      choose("Which dimension remains constant as the sarcomere shortens in the model?", ["Distance between Z lines", "Width of the A band", "Width of the central region with no thin filaments"], 1, "The A band corresponds to the length of the thick filaments."),
      choose("Why does the central region without actin become narrower?", ["Myosin shrinks along its length", "Actin and myosin both dissolve", "Actin moves farther into the central region"], 2, "Thin filaments slide inward, increasing the overlap with myosin."),
      written("Explain how the models show sliding rather than shortening of individual filaments.", ["The Z lines are closer together.", "The filaments keep their lengths.", "The overlap between the thin and thick filaments increases."])
    ]
  },
  insulation: {
    group: "Focused Writing", title: "Explain a difference in cooling",
    cue: "Compare the two cans. Find the one thing the experiment changes.",
    states: [["insulation", "Two cooling setups", "Each can starts at 60 °C. After ten minutes the bare can reads 47 °C and the felt-wrapped can reads 53 °C.", "Two metal cans each holding water and a thermometer. Only the right-hand can has a layer around its sides. Heat transfer is shown by arrows."]],
    parts: { A: part(219, 146, "Probe dipping into the first can", "Thermometer", "Measures the water temperature."),
      B: part(457, 175, "Layer outside the second can", "Felt insulation", "Reduces the rate of energy transfer to the surroundings."),
      C: part(388, 231, "Liquid underneath the second probe", "Water", "Its temperature is measured.") },
    questions: [
      point("Which feature is the independent variable here?", "B", "The felt wrapping is what changes between the two cans."),
      number("How much more did the bare can cool than the wrapped can?", 6, "°C", "The drops were 13 °C and 7 °C. The difference is 6 °C."),
      choose("Which sentence uses the evidence most precisely?", ["The felt-wrapped can cooled by 7 °C and the bare can cooled by 13 °C", "The bare can cooled to 13 °C", "The felt created 6 °C of heat"], 0, "Use temperature change for both cans. A temperature difference does not give an amount of energy."),
      written("Use both drops to support a conclusion, then explain the difference.", ["Compare 7 °C with 13 °C using the correct cans.", "Felt reduced the rate of energy transfer to the surroundings."])
    ]
  },
  quadrats: {
    group: "Focused Writing", title: "Evaluate a claim about mowing",
    cue: "Compare the two patches and the size and spread of the squares used to sample them.",
    states: [["quadrats", "Sampling two meadow patches", "Each drawn grid is one quadrat of the same area. The drawing shows sampling positions. Use the supplied counts, rather than counting drawing marks.", "Two adjacent meadow patches. Six equal square grids sample locations in each patch."]],
    parts: { A: part(120, 123, "Square grid in the left patch", "Quadrat", "Defines a standard area to sample."),
      B: part(268, 204, "Area around the grids on the left", "Patch A", "Mown weekly in this example."),
      C: part(520, 83, "Area around the grids on the right", "Patch B", "Mown once a term in this example.") },
    questions: [
      point("Which item defines the area used for one sample?", "A", "A quadrat gives a fixed area for each sample."),
      choose("One survey recorded four species in the weekly mown patch and nine in the patch mown once a term. Which claim fits these data?", ["The weekly mown patch had more species", "Mowing once a term always increases species richness", "More species were recorded in the patch mown once a term"], 2, "The counts support a comparison of these patches. Other differences could explain the result."),
      choose("Which change would most improve the evidence about mowing?", ["Sample several comparable patches for each mowing schedule", "Use a larger quadrat only in the patch mown once a term", "Sample the same one spot repeatedly"], 0, "Sampling several independent patches reduces reliance on the features of a single patch."),
      written("Support a cautious conclusion with both counts, then give one possible alternative explanation.", ["Nine species compared with four, with the higher count in the patch mown once a term.", "Other differences such as light, soil or past management may affect species richness."])
    ]
  }
};

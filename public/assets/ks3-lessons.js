const check = (prompt, answer, correctFeedback, distractors) => ({
  prompt, answer, correctFeedback, distractors
});

const lesson = (id, unit, title, visual, notice, explain, questions, transfer, model, related) => ({
  id, unit, title, visual, notice, explain, questions, transfer, model, related
});

export const curriculum = {
  7: [
    lesson("fair-tests", "Science Skills", "What makes a test fair?",
      { caption: "Two tests of how a ramp affects rolling distance", headers: ["Test", "Ramp height", "Car", "Distance rolled"], rows: [["A", "10 cm", "Green", "60 cm"], ["B", "20 cm", "Blue", "95 cm"]] },
      "Spot the two things that changed between tests A and B.",
      ["A fair test changes the factor you want to investigate. This is the independent variable. Here it is ramp height.",
       "The distance rolled is what you measure. It is the dependent variable. Use the same car and release it in the same way. Then a difference is more likely to be due to ramp height."],
      [
        check("Which condition should change to answer the question?", "The height of the ramp", "The question asks about ramp height. Change this and measure the distance the car rolls.", [
          ["The car used", "Changing the car makes it harder to tell whether any difference was due to the ramp."],
          ["The surface the car rolls on", "Keep the surface the same. The ramp height is the factor you want to test."]
        ]),
        check("The green car is used in both tests. What should the pupil record each time?", "How far the car rolls", "This is the outcome the pupil is comparing.", [
          ["The colour of the car", "Colour is held the same in both tests. The pupil needs to measure an outcome."],
          ["The height only", "Record the height too, but the distance rolled tells you what difference the height made."]
        ])
      ],
      "You want to test whether water temperature affects the time for sugar to dissolve. Say what to change, what to measure and one thing to keep the same.",
      "Change the water temperature, measure the time until the sugar dissolves and keep the mass of sugar the same. You could also control the water volume and how you stir."),
    { unit: "Cells", title: "Cells and microscopes", href: "/ks3/cells/" },
    lesson("states-of-matter", "Particles and their Behaviour", "What changes when ice melts?",
      { type: "particles", caption: "Particle model of water", panels: [{ label: "Ice", layout: "solid" }, { label: "Liquid water", layout: "liquid" }, { label: "Water vapour", layout: "gas" }] },
      "Where are the particles close together? Where are they spread out?",
      ["In a solid the particles vibrate around fixed positions. In a liquid they are still close together, but they can move past each other.",
       "A change of state changes the arrangement and movement. The particles are still water particles."],
      [
        check("Which statement describes the particles in ice?", "They vibrate in fixed positions.", "The particles move back and forth around their positions.", [
          ["They never move.", "Particles in ice still vibrate. They stay in fixed positions overall."],
          ["They move freely past each other.", "Moving past each other is what happens in a liquid. Ice has a fixed arrangement."]
        ]),
        check("What happens to the particles when ice melts?", "They can move past each other.", "The particles can move past each other in liquid water.", [
          ["They become larger particles.", "The same particles move differently after melting. Each particle stays the same size."],
          ["They turn into a different substance.", "Ice and liquid water are the same substance in different states."]
        ])
      ],
      "A puddle dries on a cool day. Explain what happens to water particles that leave it.",
      "Some water particles at the surface have enough energy to escape into the air. They become more spread out as water vapour. This is evaporation."),
    lesson("atoms-and-compounds", "Atoms, Elements and Compounds", "How can you tell an element from a compound?",
      { type: "molecules", caption: "Three samples shown as particles", panels: [{ label: "Sample A", groups: ["aa", "aa", "aa"] }, { label: "Sample B", groups: ["ab", "ab", "ab"] }, { label: "Sample C", groups: ["aa", "ab", "aa"] }] },
      "Each colour stands for a type of atom. Joined circles are bonded. Find the sample with the same two colours in every group.",
      ["An element contains only one type of atom. Two atoms of the same type can be bonded together in an element.",
       "A compound contains two or more types of atom chemically bonded. A mixture contains more than one substance."],
      [
        check("What is sample A?", "An element", "All its atoms are one type, even though they are joined in pairs.", [
          ["A compound", "A compound contains different types of atom bonded together. All the atoms in A are the same type."],
          ["A mixture", "All the groups in A are identical. There is just one substance."]
        ]),
        check("Why is sample C a mixture?", "It contains two different substances.", "Some pairs contain one type of atom, while other pairs contain two types.", [
          ["Both types of atom are in every pair.", "Look at each pair. Only some pairs have two types of atom."],
          ["None of its atoms are joined.", "Touching circles represent bonded atoms. C contains two different kinds of bonded pair."]
        ])
      ],
      "One sample contains only identical groups. Every group has three atoms of one type bonded to one atom of another type. Is it an element, compound or mixture? Explain.",
      "It is a compound. Different types of atom are chemically bonded in each group, and the sample contains only that substance."),
    lesson("forces", "Forces", "Does a moving object need a forward force?",
      { type: "forces", caption: "Two horizontal forces on a moving cyclist", left: "40 N backwards", right: "40 N forwards" },
      "Compare the sizes and directions of the forces.",
      ["Forces acting in opposite directions can balance. Here the overall horizontal force is zero.",
       "Balanced forces keep the motion the same. A cyclist already moving straight ahead keeps the same speed. An unbalanced force can change the speed or direction."],
      [
        check("What happens to the cyclist’s speed in the diagram?", "It stays the same.", "The opposing forces are equal, so the cyclist does not speed up or slow down.", [
          ["The cyclist stops.", "The cyclist is already moving. With zero overall force, the motion stays the same."],
          ["The cyclist speeds up.", "The forward force would need to be bigger than the backward force for the cyclist to speed up."]
        ]),
        check("The forward force drops to 20 N. The backward force is still 40 N. What happens next?", "The cyclist slows down.", "There is now an overall force backwards, opposite the cyclist’s motion.", [
          ["The cyclist turns straight away.", "The forces shown are along the direction of travel. The backward overall force reduces speed."],
          ["The cyclist’s speed stays the same.", "The forces no longer balance. Backwards is bigger than forwards."]
        ])
      ],
      "A crate is moving to the right. You push right with 70 N and friction acts left with 30 N. Give the overall force and describe the effect on the crate.",
      "The overall force is 40 N to the right. The crate speeds up because the overall force acts in the direction it is moving."),
    lesson("the-body", "The Body", "How does oxygen get from the air to your muscles?",
      { type: "flow", caption: "Follow oxygen through the body", panels: ["Air in the lungs", "Blood", "Muscle cells"] },
      "Follow the arrows. What carries oxygen from the lungs to a muscle?",
      ["When you breathe in, air reaches tiny air sacs in the lungs. Oxygen moves from the air sacs into the blood by diffusion.",
       "The blood carries oxygen to muscle cells. Muscles use oxygen in aerobic respiration, a process that transfers energy for their activity."],
      [
        check("Where does oxygen enter the blood?", "At the air sacs in the lungs", "Oxygen diffuses from air in the air sacs into the blood nearby.", [
          ["Inside the heart", "The heart pumps blood. Oxygen enters the blood at the lungs."],
          ["Inside the muscles", "Oxygen leaves the blood to enter muscle cells. It first enters the blood at the lungs."]
        ]),
        check("What takes oxygen from the lungs to the leg muscles?", "The blood", "The heart pumps blood through vessels, including the vessels that supply the muscle.", [
          ["The airways", "Airways get air to the lungs. Blood carries oxygen onwards."],
          ["The digestive system", "The digestive system breaks down food. Oxygen is carried in the blood."]
        ])
      ],
      "Why do breathing and heart rate rise during a run? Use the idea of oxygen supply.",
      "Working muscles need more oxygen for aerobic respiration. Faster breathing helps bring in more oxygen and a faster heartbeat helps carry it to muscles more quickly."),
    lesson("energy-transfers", "Energy", "Where does the energy go in a lamp?",
      { type: "bars", caption: "Energy transferred by a lamp in one second", max: 10, bars: [["By light", 3, "J"], ["By heating", 7, "J"]] },
      "Which transfer is bigger? Add the two values.",
      ["The lamp transfers energy to the surroundings by light and by heating. If the job is to light a room, light is the useful transfer.",
       "The lamp receives 10 J in this example. All 10 J can be accounted for. Energy spreads to the surroundings and becomes less useful. It is still there."],
      [
        check("How much energy was usefully transferred to light the room?", "3 J", "The light transfer is the one that lights the room.", [
          ["7 J", "7 J is the heating transfer. When the job is to light the room, the light is useful."],
          ["10 J", "That is all the energy transferred. Some of it warmed the surroundings."]
        ]),
        check("What happened to the energy transferred by heating?", "It warmed the surroundings.", "Energy is transferred to the surroundings. It is conserved.", [
          ["The lamp destroyed it.", "Energy is conserved. It spreads to the surroundings as the lamp warms them."],
          ["It all became light later.", "Some energy warmed the surroundings. The heating and light transfers both contribute to the total."]
        ])
      ],
      "Another lamp transfers 4 J by light and 6 J by heating for the same 10 J input. Which lamp is more efficient at lighting the room? Explain.",
      "The second lamp transfers 4 J usefully instead of 3 J, with the same input. A greater fraction of its input is useful, so it is more efficient."),
    lesson("reproduction", "Human and Plant Reproduction", "What is the difference between pollination and fertilisation?",
      { type: "flow", caption: "A flowering plant forms seeds", panels: ["Pollen reaches a stigma", "A male sex cell reaches an ovule", "Sex cells join", "A seed develops"] },
      "Which stage shows pollen moving between parts of a flower? Which shows sex cells joining?",
      ["Pollination is the transfer of pollen from an anther to a stigma. It may happen with help from insects or wind.",
       "Fertilisation is the joining of a male and female sex cell. In flowering plants this can happen in an ovule. In humans fertilisation also involves two sex cells joining, a sperm cell and an egg cell."],
      [
        check("A bee carries pollen from an anther to a stigma. What has taken place?", "Pollination", "Pollen has reached a stigma. The sex cells have not yet joined in this step.", [
          ["Fertilisation", "Fertilisation is the joining of sex cells. A bee transferring pollen is pollination."],
          ["Seed dispersal", "Seed dispersal moves seeds away later. Here pollen is moving to a stigma."]
        ]),
        check("What is shared by fertilisation in humans and flowering plants?", "Two sex cells join.", "The joining of sex cells is the common process.", [
          ["An insect carries the male sex cell.", "Insects can move pollen for some flowers. The common step is the joining of sex cells."],
          ["It happens after a seed forms.", "In plants, seed development follows fertilisation. Humans do not make seeds."]
        ])
      ],
      "Pollen reaches a flower’s stigma, but no male sex cell reaches the ovule. Explain why the ordinary sexual route to a seed stops there.",
      "Pollination happened, but the sex cells could not join in the ovule. Without fertilisation, a seed cannot develop by this route."),
    lesson("acids-and-alkalis", "Acids and Alkalis", "What does a change in pH tell you?",
      { type: "ph", caption: "Universal indicator readings for three solutions", panels: [{ label: "A", value: 3 }, { label: "B", value: 7 }, { label: "C", value: 10 }] },
      "Find the pH 7 solution, then find the one with the lowest pH.",
      ["A pH below 7 is acidic. A pH of 7 is neutral. A pH above 7 is alkaline. Universal indicator changes colour to help estimate pH.",
       "Adding an alkali to an acid can raise its pH. Neutralisation is a reaction between the acid and the alkali."],
      [
        check("Which sample is alkaline?", "C, pH 10", "Alkaline solutions have a pH above 7.", [
          ["A, pH 3", "A pH of 3 is below 7, so A is acidic."],
          ["B, pH 7", "A pH of 7 is neutral."]
        ]),
        check("An alkali is added to a solution at pH 3. The pH becomes 6. What is the solution like now?", "Less acidic, and still acidic", "The pH has moved up towards 7, but is still below it.", [
          ["Neutral", "Neutral is pH 7. The solution is still on the acidic side of 7."],
          ["Alkaline", "A pH of 6 is below 7. Adding alkali does not guarantee a final pH above 7."]
        ])
      ],
      "Two pupils start with identical acidic solutions. Both add the same alkali. One finishes at pH 7 and the other at pH 9. Explain why the second result can happen.",
      "The second pupil may have added alkali in excess, after there was enough to neutralise the acid. The solution is then alkaline."),
    lesson("chemical-reactions", "Types of Reaction", "Where does the mass go in a reaction?",
      { caption: "Mass of a closed flask and its contents", headers: ["Before mixing", "After bubbles stop"], rows: [["132 g", "132 g"]] },
      "The mixture fizzes after mixing. What happens to the measured mass?",
      ["In a chemical reaction the atoms rearrange to form new substances. A gas can be a new substance.",
       "In a closed container the gas stays inside. The same atoms are present, so the total mass stays the same."],
      [
        check("Where is the gas after the reaction in this example?", "Inside the flask", "The container is closed, so the gas remains part of the measured contents.", [
          ["It all escaped from the flask.", "The flask is closed. The new gas stays inside."],
          ["It lost all its mass as the bubbles formed.", "Gas has mass, and is included when the closed flask is weighed."]
        ]),
        check("What happened to the atoms during the reaction?", "They rearranged to form new substances.", "The reaction changed how the atoms were joined. The total number of each type of atom stayed the same.", [
          ["Some turned into energy.", "In this chemical reaction the atoms are conserved. The gas is made of some of those atoms."],
          ["There were no new substances.", "A reaction makes new substances. The gas is one of them."]
        ])
      ],
      "The same reaction happens in an open flask. The mass reading falls. Explain why the reading can fall even though mass is conserved.",
      "Some gas escapes and is no longer on the balance. If the escaped gas were included, the total mass would be the same."),
    lesson("light-and-sound", "Light and Sound", "Why do you see lightning before hearing thunder?",
      { type: "flow", caption: "Two signals from the same lightning strike", panels: ["Lightning strike", "Light reaches you", "Thunder reaches you later"] },
      "Which signal reaches you first even though both start at the lightning strike?",
      ["Light and sound both transfer energy. Light travels much faster through air than sound.",
       "Sound needs matter to travel through. Light can travel through empty space, which is how light from the Sun reaches Earth."],
      [
        check("Why do you see the flash first?", "Light travels faster than sound in air.", "In the same time light can travel much further.", [
          ["Thunder is blocked by air.", "Sound does travel through air. It just takes longer than the light to arrive."],
          ["The flash has to reach you before sound starts.", "Both signals start at the strike. They travel at different speeds."]
        ]),
        check("Which signal could cross a vacuum?", "Light", "Light can travel without particles. Sound cannot.", [
          ["Sound", "Sound travels through vibrations passed through matter. A vacuum has no matter to pass them on."],
          ["Both light and sound", "Light can cross a vacuum. Sound needs matter, such as air."]
        ])
      ],
      "Two fireworks burst at different distances. The light arrives almost at once for both. Which is likely to have the longer wait before you hear it, and why?",
      "The more distant firework. Its sound has further to travel at the speed of sound, so the delay is longer."),
    lesson("space", "Space", "What causes day and night?",
      { type: "earth", caption: "Light from the Sun illuminates one side of Earth", panels: ["Day", "Night"] },
      "Which side faces the Sun? Imagine the dot turning with Earth.",
      ["Earth rotates about its axis about once every 24 hours. When your location faces the Sun, it is daytime there.",
       "Earth also orbits the Sun. One orbit takes about a year. The daily change from light to dark is caused by Earth’s rotation."],
      [
        check("What changes a location from day to night?", "Earth rotates so the location faces away from the Sun.", "Earth’s rotation carries the location into the unlit side.", [
          ["The Sun switches off.", "The Sun keeps giving out light. The opposite side of Earth is in shadow."],
          ["Earth completes its yearly orbit.", "An orbit takes about a year. A day and night are due to rotation."]
        ]),
        check("What takes about one year?", "Earth going once around the Sun", "This is Earth’s orbit. Earth rotates about its axis once a day.", [
          ["Earth spinning once about its axis", "Earth spins about its axis in roughly 24 hours."],
          ["The Moon moving once around Earth", "The Moon orbits Earth in about a month."]
        ])
      ],
      "If it is midday on your side of Earth, what is it like on the opposite side? Explain from the model.",
      "The opposite side faces away from the Sun. Earth blocks the light, so that side is experiencing night.")
  ],
  8: [
    lesson("health-and-lifestyle", "Health and Lifestyle", "Why do we need different nutrients?",
      { caption: "Some nutrients in typical foods", headers: ["Food", "Some nutrients it supplies"], rows: [["Wholemeal bread", "Carbohydrate, fibre"], ["Lentils", "Protein, carbohydrate, fibre"], ["Sunflower oil", "Lipid"]] },
      "Find a food that provides more than one kind of nutrient.",
      ["A nutrient is a substance in food that the body uses. Carbohydrates and lipids can supply energy. Protein provides building blocks for growth and repair.",
       "Food can supply several nutrients. A varied, balanced diet helps supply enough energy and all the nutrients the body needs."],
      [
        check("Which nutrient is particularly useful for growth and repair?", "Protein", "Proteins in food provide building blocks the body can use to grow or repair tissues.", [
          ["Fibre", "Fibre helps the digestive system work well. Protein provides building blocks for growth and repair."],
          ["Water", "The body needs water, but protein supplies the building blocks for this job."]
        ]),
        check("What can you tell from the lentil row?", "One food can supply several nutrients.", "Lentils supply protein, carbohydrate and fibre in this example.", [
          ["Lentils only supply protein.", "Read the whole row. It also lists carbohydrate and fibre."],
          ["A food and a nutrient are the same thing.", "Lentils are a food. They contain different substances that we call nutrients."]
        ])
      ],
      "A pupil says bread and oil are enough for a balanced diet because both supply energy. Use the table to explain a problem with that reasoning.",
      "The body needs more than energy. A balanced diet must supply enough protein for growth and repair, as well as other nutrients. The table shows that a wider selection adds nutrients.",
      { title: "Explore how enzymes help digest food", href: "/teaching/simulations/enzyme-kinetics/" }),
    lesson("periodic-table", "The Periodic Table", "How can the periodic table help us predict properties?",
      { type: "periodic", caption: "Examples from two groups in the periodic table", panels: [{ label: "Group 1", values: ["Li · lithium", "Na · sodium", "K · potassium"] }, { label: "Group 0", values: ["He · helium", "Ne · neon", "Ar · argon"] }] },
      "Which elements are in the same column as neon?",
      ["A vertical column in the periodic table is a group. Elements in a group often have similar chemical properties.",
       "Lithium, sodium and potassium are reactive metals in Group 1. Helium, neon and argon are very unreactive gases in Group 0."],
      [
        check("Which element shown is in the same group as lithium?", "Sodium", "Lithium and sodium are both in Group 1.", [
          ["Neon", "Neon is in Group 0. Look for an element directly below lithium."],
          ["Argon", "Argon is in a different vertical column. Groups are vertical."]
        ]),
        check("What would you predict about argon from its group?", "It is very unreactive.", "Argon is a Group 0 gas, like helium and neon.", [
          ["It reacts like sodium.", "Sodium is in Group 1, a group of reactive metals."],
          ["It is a reactive metal.", "Group 0 elements are very unreactive gases."]
        ])
      ],
      "Rubidium appears directly below potassium in Group 1. Predict one of its chemical properties and explain the link to its position.",
      "Rubidium is likely to be reactive. It belongs to the same group as lithium, sodium and potassium, which are reactive metals."),
    { unit: "Motion and Pressure", title: "Particles and gas pressure", href: "/ks3/particles/" },
    { unit: "Adaptation and Inheritance", title: "Adaptation and variation", href: "/ks3/adaptation/" },
    lesson("separating-techniques", "Separating Techniques", "Why does a filter catch sand but let dissolved salt through?",
      { type: "flow", caption: "Salt water containing sand passes through a filter", panels: ["Sand + salt water", "Filter paper", "Sand stays in the paper. Salt solution passes through."] },
      "Trace what stays in the filter and what reaches the container below.",
      ["Sand stays as tiny grains in water. The grains are too large to pass through the holes in the filter paper.",
       "Dissolved salt is spread through the water at particle level, so it passes through with the water. If water evaporates from the solution, salt crystals can form."],
      [
        check("What stays in the filter paper?", "The sand", "The sand grains do not dissolve and are too large to pass through.", [
          ["The dissolved salt", "Dissolved salt passes through with the water."],
          ["The water", "Water can pass through the paper. The solid sand stays behind."]
        ]),
        check("Which step could you use to recover the salt from the filtered liquid?", "Evaporate water from the solution.", "As water evaporates, the remaining solution can form salt crystals.", [
          ["Filter it again through the same kind of paper.", "Dissolved salt passes through that paper. Use a different separation method."],
          ["Stir the filtered liquid.", "Stirring mixes it. Evaporating the water can leave salt crystals behind."]
        ])
      ],
      "You have a mixture of sand and sugar. Describe how to recover both solids using water, a filter and evaporation.",
      "Dissolve the sugar in water. Filter the mixture to collect the sand in the paper. Gently evaporate some water from the sugar solution and allow crystals to form."),
    lesson("work-done", "Energy", "How are force, distance and work done linked?",
      { type: "bars", caption: "Same 10 N push in the direction of movement on two carts", max: 4, bars: [["Cart A moved", 2, "m"], ["Cart B moved", 4, "m"]] },
      "Which cart is pushed further? Is the force the same?",
      ["When a force moves an object in the direction of the force, work is done. Work done is an amount of energy transferred. It is measured in joules.",
       "Work done = force × distance moved in the direction of the force. For Cart A, 10 N × 2 m = 20 J."],
      [
        check("How much work does the push do on Cart B?", "40 J", "10 N × 4 m = 40 J.", [
          ["20 J", "20 J is for 2 m. Use 4 m for Cart B."],
          ["4 J", "4 m is the distance. Multiply it by the 10 N force."]
        ]),
        check("Why is more work done on Cart B?", "The same force acts over a longer distance.", "Doubling distance with the same force doubles the work done.", [
          ["A larger force is used for Cart B.", "Both pushes are 10 N. The distance is different."],
          ["The unit for force changes to joules.", "Newtons measure force. Joules measure work done, an energy transfer."]
        ])
      ],
      "A winch pulls a crate with 50 N for 3 m. Another winch pulls with 25 N for 6 m. Compare the work done.",
      "The first winch does 50 × 3 = 150 J. The second does 25 × 6 = 150 J. They do the same work because halving force and doubling distance leaves the product unchanged."),
    lesson("respiration", "Respiration", "How is respiration different from breathing?",
      { type: "flow", caption: "From breathing to aerobic respiration", panels: ["Air moves in and out of your lungs", "Blood carries oxygen to cells", "Cells use oxygen and glucose in respiration"] },
      "Find the step that takes place in body cells such as muscle cells.",
      ["Breathing moves air in and out of the lungs. It helps supply oxygen for respiration.",
       "Aerobic respiration is a chemical process in cells. It uses glucose and oxygen, makes carbon dioxide and water, and transfers energy for cell activities."],
      [
        check("Which statement describes aerobic respiration?", "Cells use glucose and oxygen.", "Cells transfer energy from glucose in a process that uses oxygen.", [
          ["Air moves in and out of the lungs.", "That is breathing. It helps supply oxygen to cells where respiration happens."],
          ["The heart moves blood round the body.", "That is circulation. Blood carries some substances used in respiration."]
        ]),
        check("What are the products of aerobic respiration?", "Carbon dioxide and water", "Glucose and oxygen are used, and carbon dioxide and water are made.", [
          ["Glucose and oxygen", "Those are the reactants. They are used up in the process."],
          ["Glucose and carbon dioxide", "Carbon dioxide is a product, but glucose is a reactant."]
        ])
      ],
      "A germinating seed has no lungs. Explain why it can still respire aerobically.",
      "Its living cells can take in oxygen by diffusion and use it with glucose. Respiration is a chemical process in cells, so lungs are unnecessary for it."),
    lesson("earth-structure", "Earth Structure", "What clues tell us how a rock formed?",
      { caption: "What a pupil sees in two rock samples", headers: ["Sample", "Visible clues"], rows: [["A", "Layers with grains stuck together"], ["B", "Interlocking mineral crystals"]] },
      "Which sample shows grains in layers? Which shows crystals fitted together?",
      ["Sedimentary rock can form when sediment settles in layers and the grains are pressed and cemented together.",
       "Igneous rock can form when molten rock cools and crystals grow. A rock’s features are clues. Sometimes you need more than one clue to identify it."],
      [
        check("Which process could make the layered, cemented grains in Sample A?", "Sediment settles and becomes compacted and cemented.", "Sediment layers can build up. Pressure and cementing turn them into rock.", [
          ["Molten rock cools into crystals.", "That is how igneous rock forms. Sample A shows cemented grains in layers."],
          ["The rock melts and stays liquid.", "The sample is solid. Look for a process that sticks grains together."]
        ]),
        check("What happens when molten rock cools to make igneous rock?", "It solidifies and crystals can grow.", "The crystals can fit together as the molten material solidifies.", [
          ["It stays molten under less pressure.", "Cooling can make molten rock solidify. That is how igneous rock forms."],
          ["It turns straight into loose sediment.", "Weathering can break rock into pieces later. Cooling makes solid igneous rock."]
        ])
      ],
      "A river carries grains into a lake. Over a long time, how could those grains become part of a sedimentary rock?",
      "The grains settle in layers. More sediment piles on top and compacts them. Minerals can cement the grains together into solid rock."),
    lesson("photosynthesis", "Photosynthesis", "Where does a plant get its glucose?",
      { type: "flow", caption: "A leaf exposed to light", panels: ["Carbon dioxide + water", "Leaf in light", "Glucose + oxygen"] },
      "Point to what goes in and what comes out. What reaches the leaf from the Sun?",
      ["Plants use energy transferred by light to make glucose from carbon dioxide and water. This process is photosynthesis and it also makes oxygen.",
       "Chlorophyll in leaf cells absorbs light. Plants can use glucose in respiration or use it to build other substances."],
      [
        check("Which two substances does a plant use to make glucose in photosynthesis?", "Carbon dioxide and water", "These are the reactants. Light supplies energy for the process.", [
          ["Oxygen and glucose", "Those two substances are produced in photosynthesis."],
          ["Water and oxygen", "Water goes in, but oxygen is a product. Carbon dioxide is the other reactant."]
        ]),
        check("Where does the energy for photosynthesis come from?", "Light absorbed by chlorophyll", "Chlorophyll absorbs light, which transfers energy for making glucose.", [
          ["Minerals absorbed by the roots", "Minerals help plants grow, but light supplies energy for photosynthesis."],
          ["Glucose absorbed by the roots", "The plant makes its own glucose using light, carbon dioxide and water."]
        ])
      ],
      "A plant has plenty of water and carbon dioxide but is kept in darkness. Explain what happens to photosynthesis and what its cells can still do.",
      "Photosynthesis stops without light to supply energy. Cells can still respire using stored sugars while they have fuel and, for aerobic respiration, oxygen."),
    lesson("electricity", "Electricity and Electromagnetism", "What allows a lamp to light in a circuit?",
      { type: "circuits", caption: "Two circuits with the same lamp and cell" },
      "Trace each wire. Which path has a gap?",
      ["An electric current is a flow of charge. A working cell can drive a current when there is a complete conducting path through the circuit.",
       "Opening the switch breaks the path. A gap anywhere in the loop stops current flowing around it, wherever the lamp sits."],
      [
        check("Which circuit can light its lamp?", "Circuit B", "Circuit B has a closed switch and a complete conducting path.", [
          ["Circuit A", "The switch in circuit A has a gap. The path is incomplete."],
          ["Both circuits", "Circuit A has a gap. Only B provides a complete conducting path."]
        ]),
        check("A wire breaks on the opposite side of the cell from the lamp. What happens to the lamp in this single loop?", "It goes out.", "A gap anywhere in the loop stops current throughout this single path.", [
          ["It stays lit because the gap is after the lamp.", "Charge needs a complete path through the whole circuit. The gap can be anywhere."],
          ["It gets brighter because current builds up.", "Current does not build up at the break. The open circuit stops the flow."]
        ])
      ],
      "An electromagnet works when a current flows through its wire coil. Explain why its switch can make it pick up and drop a small iron object.",
      "Closing the switch completes the circuit. Current in the coil makes a magnetic field that attracts iron. Opening the switch breaks the circuit, so the field from the current disappears and the object can fall."),
    lesson("metals", "Metals and their Reactions", "What can a displacement reaction tell you?",
      { type: "flow", caption: "An iron strip is placed in copper sulfate solution", panels: ["Grey iron in blue solution", "A reddish copper coating appears", "Iron enters the solution"] },
      "What new solid coating is observed?",
      ["A more reactive metal can displace a less reactive metal from a compound in solution.",
       "Here iron displaces copper from copper sulfate solution. Copper metal forms and iron sulfate remains in solution. The reaction is evidence that iron is more reactive."],
      [
        check("Which metal is more reactive in the example?", "Iron", "Iron displaces copper from its compound, so iron is more reactive.", [
          ["Copper", "Copper is the metal that was displaced. The metal that displaces it is more reactive."],
          ["They are equally reactive.", "The displacement shows a difference in reactivity."]
        ]),
        check("What would you predict if copper metal were placed in iron sulfate solution?", "No displacement reaction", "Copper is less reactive than iron, so it cannot displace iron.", [
          ["Copper displaces iron.", "The more reactive metal can displace the less reactive one. Copper is less reactive."],
          ["Iron metal forms because copper is reddish.", "Colour helps identify a metal, but reactivity determines whether displacement occurs."]
        ])
      ],
      "A strip of zinc displaces iron from iron sulfate. Iron displaces copper from copper sulfate. Put the three metals in order from most to least reactive.",
      "Zinc, iron, copper. Zinc displaces iron, so it is more reactive than iron. Iron displaces copper, so copper is the least reactive of the three.")
  ]
};

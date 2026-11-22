const check = (prompt, answer, correctFeedback, distractors) => ({
  prompt, answer, correctFeedback, distractors
});

const lesson = (id, unit, title, visual, notice, explain, questions, transfer, model, related) => ({
  id, unit, title, visual, notice, explain, questions, transfer, model, related
});

export const rampAngleQuestion = "How does ramp angle affect the distance a toy car rolls after it leaves the ramp?";

export const curriculum = {
  7: [
    lesson("fair-tests", "Science Skills", "How could you find out what makes a toy roll farther?",
      { caption: "Example results from the ramp model", headers: ["Setting or result", "Run A", "Run B"],
        rows: [["Ramp angle", "10° (shallow)", "30° (steep)"], ["Toy and load", "Car, unloaded", "Car, unloaded"],
          ["Ramp surface", "Smooth plastic", "Smooth plastic"], ["Release point", "Near the top", "Near the top"],
          ["Distance from the ramp foot", "45 cm", "130 cm"]] },
      "Look across each row. Which setting changes and which settings stay the same?",
      ["Change one factor on purpose. This is the [independent variable]. Here it is the ramp angle. Measure how far the toy rolls from the foot of the ramp to where it stops. This is the [dependent variable].",
       "Keep other factors that could affect the result the same. These are [control variables|control variable]. Use the same toy and load, the same ramp surface and the same release point. Let go without pushing.",
       "A clear method lets someone else repeat the test. Use the foot of the ramp as 0 cm each time. Repeat each setup and check whether the readings are similar."],
      [
        check(rampAngleQuestion + " Which condition should change?", "The ramp angle", "Change the angle to answer this question. Keep the toy, load, ramp surface, and release point the same.", [
          ["The toy used", "Changing the toy could change the distance. Use the same one for both runs."],
          ["The ramp surface", "Keep the surface the same here. A different surface would be an independent variable in a different test."]
        ]),
        check("In the ramp-angle investigation, what should the pupil measure each time?", "How far the car rolls from the foot of the ramp", "Measure from the same zero point to where the toy stops.", [
          ["The colour of the car", "Repainting this toy in the model does not change how far it rolls."],
          ["Only the angle of the ramp", "Record the angle too. The distance is the outcome you need to compare."]
        ]),
        check("A pupil starts the toy near the top on the shallow ramp and halfway up on the steep ramp. What should they change to make this a fair test of angle?", "Start the toy at the same release point in both runs", "Then ramp angle is the only setting deliberately changed. Starting lower down can also change the distance.", [
          ["Use the same angle for both runs", "Keep two different angles because angle is the factor being tested."],
          ["Repeat each setup with the current release points", "Repeats help you check consistency. Both angle and release point would still differ."]
        ])
      ],
      "How does water temperature affect how long sugar takes to dissolve? Plan two runs. Say what you would change, what you would measure and two things you would keep the same. Explain why one of your controls matters.",
      "Use two different water temperatures and time how long the sugar takes to dissolve. Keep the amount of sugar and the volume of water the same. If the amount of sugar changes, the time might change because there is more sugar to dissolve. You could also use the same type of sugar and stir each sample in the same way."),
    { unit: "Cells", title: "How could you spot a plant cell without a label?", href: "/ks3/cells/" },
    lesson("states-of-matter", "Particles and their Behaviour", "Can ice get warmer and stay solid?",
      { type: "particles", caption: "Particle model of water", panels: [{ label: "Ice", layout: "solid" }, { label: "Liquid water", layout: "liquid" }, { label: "Water vapour", layout: "gas" }] },
      "Where are the particles close together? Where are they spread out?",
      ["Use a [particle model] to explain the pictures. Solid particles [vibrate] in fixed positions. In a liquid they are still close together, but they can move past each other.",
       "A liquid is almost [incompressible]. Its particles are already packed close together, so squeezing it hardly changes its volume.",
       "As a substance warms, its particles have more [kinetic energy] on average. A pure substance can keep taking in energy while melting or boiling without getting hotter.",
       "In a [change of state], the arrangement or motion of the particles changes. Gas particles move quickly and spread through the container. Ice, liquid water and water vapour are the same substance."],
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
      "A puddle dries on a cool day. Do its water particles disappear? Explain what happens to the particles that leave it.",
      "Some water particles at the surface have enough energy to escape into the air. They are still water particles. They move freely in all directions and spread out as water vapour. This is evaporation."),
    lesson("atoms-and-compounds", "Atoms, Elements, and Compounds", "Can two joined atoms still be part of an element?",
      { type: "molecules", caption: "Three samples shown as particles", panels: [{ label: "Sample A", groups: ["aa", "aa", "aa"] }, { label: "Sample B", groups: ["ab", "ab", "ab"] }, { label: "Sample C", groups: ["aa", "ab", "aa"] }] },
      "The letters X and Y stand for different types of atom. Joined circles are bonded. Find the sample with both types in every group.",
      ["Use the letter in each circle to identify the type of [atom]. An [element] has one type of atom. Two atoms of that type can still be joined together.",
       "A [compound] has different types of atom chemically bonded together. A [mixture] contains more than one substance. Compare groups of circles to see whether the sample contains one substance or more."],
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
      "One sample contains only identical groups. Every group has three atoms of one type bonded to one atom of another type. Is it an element, compound, or mixture? Explain.",
      "It is a compound. Different types of atom are chemically bonded in each group, and the sample contains only that substance."),
    lesson("forces", "Forces", "Can a cyclist keep moving when the forces balance?",
      { type: "forces", caption: "Two horizontal forces on a moving cyclist", left: "40 N backwards", right: "40 N forwards" },
      "Compare the sizes and directions of the forces.",
      ["In the diagram, two equal forces act on the cyclist in opposite directions. These are [balanced forces]. The *overall push or pull*, called the [resultant force], is zero.",
       "A cyclist already moving straight ahead continues at the same speed when the forces balance. A non-zero resultant force can change the speed or direction."],
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
    lesson("the-body", "The Body", "How does oxygen from one breath reach the muscles in your feet?",
      { type: "flow", caption: "Follow oxygen through the body", panels: ["Air in the lungs", "Blood", "Muscle cells"] },
      "Follow the arrows. What carries oxygen from the lungs to a muscle?",
      ["When you breathe in, air reaches tiny air sacs in the lungs. Particles of oxygen pass into the nearby blood by [diffusion].",
       "The blood carries oxygen to muscle cells. The cells use oxygen in [aerobic respiration], which transfers energy for their activity."],
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
    lesson("energy-transfers", "Energy", "Why does a lamp get warm when its job is to give light?",
      { type: "bars", caption: "Energy transferred by a lamp in one second", max: 10, bars: [["By light", 3, "J"], ["By heating", 7, "J"]] },
      "Which transfer is bigger? Add the two values.",
      ["The lamp transfers energy to the surroundings by light and by heating. An [energy transfer] is useful if it helps with the job. Light is useful for lighting a room.",
       "The lamp receives 10 J in this example. The total is [conserved]. Energy can *spread into the surroundings*, where it is harder to use, but all 10 J are still accounted for."],
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
    lesson("reproduction", "Human and Plant Reproduction", "Does a flower get fertilised as soon as pollen lands on its stigma?",
      { type: "flow", caption: "A flowering plant forms seeds", panels: ["Pollen reaches a stigma", "A male sex cell reaches an ovule", "Sex cells join", "A seed develops"] },
      "Follow the pollen from anther to stigma. Then see how a sex cell reaches the ovule.",
      ["[Pollination] moves pollen from an anther to a stigma. Wind or an animal can move the pollen.",
       "[Fertilisation] is the joining of male and female sex cells. In a flowering plant this can happen in an [ovule]. In humans a sperm cell and an egg cell join."],
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
      "A pollen grain lands on a stigma. Its tube stops before reaching the ovule. Explain why this pollen grain cannot lead to a seed.",
      "Pollination has happened. The male nucleus cannot reach the egg cell in the ovule, so fertilisation cannot happen and the ovule cannot form a seed by this route."),
    lesson("acids-and-alkalis", "Acids and Alkalis", "If a liquid goes from pH 3 to pH 5, has it stopped being acidic?",
      { type: "ph", caption: "Universal indicator readings for three solutions", panels: [{ label: "A", value: 3 }, { label: "B", value: 7 }, { label: "C", value: 10 }] },
      "Find the pH 7 solution, then find the one with the lowest pH.",
      ["Use [pH|ph] to describe a solution. At room temperature, below 7 is acidic, 7 is neutral, and above 7 is alkaline. [Universal indicator] changes colour across the scale.",
       "Adding an alkali to an acid can raise its pH. The reaction is called [neutralisation]. Use the final pH to decide whether the solution is still acidic, neutral, or now alkaline."],
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
    lesson("chemical-reactions", "Types of Reaction", "Why might a fizzing reaction seem to lose mass?",
      { caption: "Mass of a closed flask and its contents", headers: ["Before mixing", "After bubbles stop"], rows: [["132 g", "132 g"]] },
      "Watch the balance in the sealed case. Then compare what happens when gas can escape.",
      ["A [chemical reaction] rearranges atoms to form new substances. Bubbles can be evidence that a new gas has formed.",
       "The sealed flask is a [closed system], so the gas stays inside. The same atoms are present before and after, so the total mass is [conserved]."],
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
    lesson("light-and-sound", "Light and Sound", "Why can you see lightning before you hear thunder?",
      { type: "flow", caption: "Two signals from the same lightning strike", panels: ["Lightning strike", "Light reaches you", "Thunder reaches you later"] },
      "Start both signals at the strike. Step through to see which reaches you first.",
      ["Light and sound both transfer energy. Compare the light and sound from the same lightning strike. The light travels much faster through air.",
       "Sound travels as a [vibration] passed through matter, such as air. Light can also travel through *empty space*, a [vacuum]. That is how sunlight reaches Earth."],
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
    lesson("space", "Space", "If the Sun is still shining, why is it night where you live?",
      { type: "earth", caption: "Light from the Sun illuminates one side of Earth", panels: ["Day", "Night"] },
      "The dot marks one place on Earth. Watch it move from the lit side to the dark side.",
      ["Earth's [rotation] is its *spin* about an [axis], roughly once every 24 hours. When your location faces the Sun, it is daytime there.",
       "An [orbit] is a different movement. Earth takes about a year to go around the Sun. The change from day to night happens as Earth spins."],
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
    lesson("health-and-lifestyle", "Health and Lifestyle", "Can two lunches give you the same energy and different nutrients?",
      { caption: "Some nutrients in typical foods", headers: ["Food", "Some nutrients it supplies"], rows: [["Wholemeal bread", "Carbohydrate, fibre"], ["Lentils", "Protein, carbohydrate, fibre"], ["Sunflower oil", "Lipid"]] },
      "Look at the foods. Find one that supplies more than one kind of nutrient.",
      ["A [nutrient] is a substance in food that the body uses. A [carbohydrate] or a [lipid] can supply energy. [Protein] supplies building blocks for growth and repair.",
       "Look at the lentil row. One food can supply several nutrients. A varied, balanced diet helps supply both the energy and the nutrients the body needs."],
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
    lesson("periodic-table", "The Periodic Table", "Can you predict how an unfamiliar element behaves from its place in the periodic table?",
      { type: "periodic", caption: "Examples from two groups in the periodic table", panels: [{ label: "Group 1", values: ["Li · lithium", "Na · sodium", "K · potassium"] }, { label: "Group 0", values: ["He · helium", "Ne · neon", "Ar · argon"] }] },
      "Which elements are in the same column as neon?",
      ["Elements appear in a particular order in the periodic table. A vertical column is called a [group]. Elements in a group often have similar [chemical properties].",
       "Lithium, sodium and potassium are reactive metals in Group 1. Helium, neon and argon are very unreactive gases in Group 0. In this GCSE layout, hydrogen is shown separately at the top centre. It is a non-metal and is not an alkali metal. A position in the table helps you make a prediction about an unfamiliar element."],
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
      "Rubidium is likely to be reactive. It belongs to the same group as lithium, sodium, and potassium, which are reactive metals."),
    { unit: "Motion and Pressure", title: "Why is a bicycle pump harder to push when you block the outlet?", href: "/ks3/particles/" },
    { unit: "Adaptation and Inheritance", title: "How could darker tree bark make dark insects more common?", href: "/ks3/adaptation/" },
    lesson("separating-techniques", "Separating Techniques", "How can a filter catch sand but let dissolved salt through?",
      { type: "flow", caption: "Salt water containing sand passes through a filter", panels: ["Sand + salt water", "Filter paper", "Sand stays in the paper. Salt solution passes through."] },
      "Trace what stays in the filter and what collects in the container.",
      ["In a salt [solution], salt has dissolved in water. Sand remains as solid grains. Examine where both substances go in the diagram.",
       "[Filtration] traps insoluble sand in the filter paper. Water and the dissolved salt pass through. The two substances are separated because they behave differently in water."],
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
    lesson("work-done", "Energy", "If you push two trolleys equally hard, do you always transfer the same energy?",
      { type: "bars", caption: "Same 10 N push in the direction of movement on two carts", max: 4, bars: [["Cart A moved", 2, "m"], ["Cart B moved", 4, "m"]] },
      "Which cart is pushed further? Is the force the same?",
      ["A push or pull transfers energy when it moves an object in the direction of the force. The energy transferred is called [work done].",
       "Here the force acts along the movement. Multiply force by distance to find the work done. A larger force or a longer distance means more work is done when the other factor is the same."],
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
    lesson("respiration", "Respiration", "Why do seeds need oxygen even before they have leaves?",
      { type: "flow", caption: "From breathing to aerobic respiration", panels: ["Air moves in and out of your lungs", "Blood carries oxygen to cells", "Cells use oxygen and glucose in respiration"] },
      "Trace oxygen and glucose into the cell. Then find the products.",
      ["[Breathing] *moves air in and out*. In humans, it helps supply oxygen for a different process inside cells.",
       "[Aerobic respiration] uses oxygen and [glucose] to transfer energy for cell activities. Carbon dioxide and water are produced. Plant cells and animal cells both respire."],
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
    lesson("earth-structure", "Earth Structure", "Could you tell how a rock formed just by looking at it closely?",
      { caption: "What a pupil sees in two rock samples", headers: ["Sample", "Visible clues"], rows: [["A", "Layers with grains stuck together"], ["B", "Interlocking mineral crystals"]] },
      "Which sample shows grains in layers? Which shows crystals fitted together?",
      ["[Sediment] can settle in layers. Its grains can be pressed and cemented together to form [sedimentary rock]. When molten rock cools and solidifies, crystals can grow to form [igneous rock].",
       "Existing rock can change under heat or pressure while staying solid. This can make [metamorphic rock]. Layers alone may be ambiguous. Use clues such as the grains or crystals and how they fit together."],
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
      "Two samples both have bands. In one, the bands contain rounded grains cemented together. In the other, the bands are made of interlocking crystals. Which do you have stronger evidence for calling sedimentary? Explain.",
      "The rounded, cemented grains are stronger evidence for sedimentary rock. Grains settle in layers and can become compacted and cemented. The bands of interlocking crystals need a different explanation or more evidence."),
    lesson("photosynthesis", "Photosynthesis", "Can a plant make glucose in the dark if it has plenty of water?",
      { type: "flow", caption: "A leaf exposed to light", panels: ["Carbon dioxide + water", "Leaf in light", "Glucose + oxygen"] },
      "Point to the arrows for what reaches the leaf and what leaves it. Find the substance made in the leaf.",
      ["[Photosynthesis] uses energy transferred by light to make [glucose] from carbon dioxide and water. The process also makes oxygen.",
       "[Chlorophyll] in chloroplasts absorbs light. The plant can use the glucose in respiration or to build other substances. Plants still respire when it is dark."],
      [
        check("Which two substances does a plant use to make glucose in photosynthesis?", "Carbon dioxide and water", "These are the reactants. Light supplies energy for the process.", [
          ["Oxygen and glucose", "Those two substances are produced in photosynthesis."],
          ["Water and oxygen", "Water goes in, but oxygen is a product. Carbon dioxide is the other reactant."]
        ]),
        check("Where does the energy for photosynthesis come from?", "Light absorbed by chlorophyll", "Chlorophyll absorbs light, which transfers energy for making glucose.", [
          ["Minerals absorbed by the roots", "Minerals help plants grow, but light supplies energy for photosynthesis."],
          ["Glucose absorbed by the roots", "The plant makes its own glucose using light, carbon dioxide, and water."]
        ])
      ],
      "A plant has plenty of water and carbon dioxide but is kept in darkness. Explain what happens to photosynthesis and what its cells can still do.",
      "Photosynthesis stops without light to supply energy. Cells can still respire using stored sugars while they have fuel and, for aerobic respiration, oxygen."),
    lesson("electricity", "Electricity and Electromagnetism", "Can a break anywhere in the loop put the lamp out?",
      { type: "circuits", caption: "Two circuits with the same lamp and cell" },
      "Trace each wire. Which path has a gap?",
      ["An [electric current] is a flow of charge. A working electrical cell can drive a current around a [complete circuit].",
       "Opening the switch makes a gap. In this single loop, a gap anywhere stops current flowing all the way around. A coil that acts as a magnet when it carries a current is an [electromagnet]."],
      [
        check("Before you move either switch, which circuit can light its lamp?", "Circuit B", "Circuit B has a closed switch and a complete conducting path.", [
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
    lesson("metals", "Metals and their Reactions", "Can one metal take another metal’s place in a solution?",
      { type: "flow", caption: "An iron strip is placed in copper sulfate solution", panels: ["Grey iron in blue solution", "A reddish copper coating appears", "Iron enters the solution"] },
      "Find the new solid coating. What changed about the metal strip?",
      ["[Reactivity] describes how readily a substance reacts. In [displacement], a more reactive metal can take the place of a less reactive metal in a compound in solution.",
       "An iron strip forms a copper coating in copper sulfate solution. Iron displaces copper from its compound, so this is evidence that iron is more reactive than copper."],
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

export const motionLessons = [
  lesson("journey-speed", "Motion and Pressure · Speed", "Can a shorter journey still be the faster one?",
    { type: "bars", caption: "Distance covered in the same 5 seconds", max: 20, bars: [["Runner",10,"m"],["Cyclist",20,"m"]] },
    "Who travelled further? Which part of the comparison stayed the same?",
    ["[Average speed] is the total distance divided by the total time. If we measure in metres and seconds, the answer tells us *metres per second*.",
     "The runner covers 10 m in 5 s, an average of 2 m/s. The cyclist covers 20 m in 5 s, an average of 4 m/s. With equal times, the greater distance gives the higher average speed."],
    [
      check("An athlete covers 15 m in 5 s. What is their average speed?", "3 m/s", "15 m divided by 5 s gives 3 m/s.", [
        ["75 m/s", "Divide distance by time to find metres covered per second."],
        ["10 m/s", "Subtracting the numbers does not give the distance travelled each second."]
      ]),
      check("A skateboarder and a cyclist each travel 30 m. The cyclist takes less time. Which has the higher average speed?", "The cyclist", "For the same distance, a shorter time gives a higher average speed.", [
        ["The skateboarder", "The skateboarder needs more time to cover the same distance."],
        ["They have the same average speed", "You also need the travel times. The cyclist covers the distance faster."]
      ])
    ],
    "One pupil walks 60 m in 30 s. Another walks 100 m in 50 s. Compare their average speeds and explain.",
    "Both average 2 m/s. The second pupil goes further, but also takes proportionally longer."),
  lesson("balanced-moments", "Motion and Pressure · Moments", "How could a lighter pupil balance a heavier pupil on a seesaw?",
    { type: "moments", caption: "A simple seesaw with equal weights and a movable load" },
    "Keep both weights the same. Predict what happens when you move the right weight further from the pivot.",
    ["A force can turn an object about a [pivot]. The *turning effect*, called a [moment], depends on the force and its perpendicular distance from the pivot.",
     "Both forces in the model act downwards. Moving one outwards increases its moment. The seesaw balances when the moments acting in opposite directions are equal."],
    [
      check("Where should the right weight go to balance the left weight?", "The same distance from the pivot", "With equal forces, equal distances give equal moments.", [
        ["Closer to the pivot than the left weight", "The same weight closer to the pivot produces a smaller moment."],
        ["Anywhere on the right", "Position matters. The turning effect depends on distance from the pivot."]
      ]),
      check("The left moment is 4 N m. The right moment is 6 N m. Which end drops?", "The right end", "The moment on the right is larger.", [
        ["The left end", "The larger moment belongs to the right end."],
        ["Neither end", "The moments would need to be equal for balance."]
      ])
    ],
    "A 20 N weight hangs 1 m to the left of a pivot. You have a 10 N weight on the right. How far from the pivot should it go to balance?",
    "Put it 2 m from the pivot. Each turning effect is 20 N m, in opposite directions.")
];

export const extraChecks = {
  "fair-tests": [
    "Does wing length affect how long a paper spinner takes to fall? Two spinners have different wing lengths and are dropped from different heights. What should stay the same?",
    "Drop each spinner from the same height",
    "Drop height can change the fall time. Keep it the same so you can test wing length.",
    [
      [
        "Give each spinner a different mass",
        "Mass could also change flight time."
      ],
      [
        "Keep the wing lengths the same",
        "Wing length is what the test is meant to change."
      ]
    ]
  ],
  "states-of-matter": [
    "Which observation best distinguishes the gas in the model from the liquid?",
    "The gas particles spread throughout the box. The liquid particles stay close together near the bottom.",
    "The two states have the same particles. In the gas they are farther apart and move freely.",
    [
      ["Only the gas particles can move and collide.", "Liquid particles also move and collide. Look at the spacing and the part of the box occupied."],
      ["The gas particles grow as the box fills.", "Each particle stays the same size. The gaps between gas particles are much bigger."]
    ]
  ],
  "atoms-and-compounds": [
    "A diagram shows each red particle bonded to a blue one. Every pair is identical. What does the diagram show?",
    "A pure compound",
    "Two elements are chemically joined in each identical pair.",
    [
      [
        "A mixture of two unbonded elements",
        "Each pair contains bonded atoms."
      ],
      [
        "A pure element",
        "The two colours represent different kinds of atom."
      ]
    ]
  ],
  "forces": [
    "A bicycle moves at a steady speed along a straight, flat road. What must be true of its horizontal forces?",
    "The forward and backward forces balance",
    "Its velocity is steady, so the horizontal resultant is zero.",
    [
      [
        "The forward force must be bigger",
        "That would make it speed up."
      ],
      [
        "There must be zero backward force",
        "Resistive forces can be present and balance the forward force."
      ]
    ]
  ],
  "the-body": [
    "Which sequence takes oxygen from inhaled air to an active muscle?",
    "Air in lungs → blood → muscle cells",
    "Oxygen crosses a gas exchange surface and is carried in the blood.",
    [
      [
        "Air in lungs → stomach → muscle cells",
        "The stomach is not on the oxygen transport route."
      ],
      [
        "Heart muscle → blood → air in lungs",
        "That reverses the overall direction of oxygen movement."
      ]
    ]
  ],
  "energy-transfers": [
    "A lamp becomes hot while it shines. Where has some of the energy gone?",
    "It has been transferred to the surroundings by heating",
    "Warming the lamp and surrounding air accounts for some of the transfer.",
    [
      [
        "It has disappeared",
        "Energy is conserved."
      ],
      [
        "All of it became light",
        "The heating shows that energy also reached the surroundings in another way."
      ]
    ]
  ],
  "reproduction": [
    "A pollen grain lands on the stigma. Why is that not yet fertilisation?",
    "The male and female nuclei have yet to fuse",
    "Pollination moves pollen. Fertilisation occurs after delivery of the male nucleus to the ovule.",
    [
      [
        "The flower must first make a fruit",
        "Fruit development follows fertilisation in a typical flowering plant."
      ],
      [
        "The landing immediately joins the nuclei",
        "They are still in separate parts of the flower."
      ]
    ]
  ],
  "acids-and-alkalis": [
    "An acidic solution changes from pH 2 to pH 5. Which description fits it now?",
    "It is less acidic and still acidic",
    "The pH has moved closer to 7, but it is still below 7.",
    [
      [
        "It has become alkaline",
        "Its pH would need to be above 7."
      ],
      [
        "It is more acidic",
        "A lower pH means the solution is more acidic."
      ]
    ]
  ],
  "chemical-reactions": [
    "A reaction releases a gas inside a sealed flask. What happens to the mass of the whole flask and its contents?",
    "It stays the same",
    "The gas remains inside, so the same material is on the balance.",
    [
      [
        "It becomes smaller because gases have no mass",
        "Gases have mass and the gas is still inside."
      ],
      [
        "It gets larger because a new substance formed",
        "The atoms are rearranged during the reaction."
      ]
    ]
  ],
  "light-and-sound": [
    "You see a distant firework before you hear its bang. What explains the delay?",
    "Light travels faster than sound in air",
    "Both can reach you through air, but sound takes longer.",
    [
      [
        "Sound was reflected back to the firework first",
        "A direct sound can reach you without reflecting."
      ],
      [
        "Light needed air to reach you",
        "Light can also travel through a vacuum."
      ]
    ]
  ],
  "space": [
    "A town turns from morning towards midday. Which change causes this?",
    "The town turns to face the Sun more directly as Earth rotates",
    "Earth’s rotation changes how directly sunlight reaches the town.",
    [
      [
        "The Sun moves closer to the town over the morning",
        "Day and night result from rotation."
      ],
      [
        "The Moon moves away from Earth",
        "The Moon's distance does not cause the daily cycle."
      ]
    ]
  ],
  "health-and-lifestyle": [
    "Two pupils need energy for exercise. One says that only fat supplies energy. Is that correct?",
    "Carbohydrate can also supply energy",
    "Cells can release energy from glucose during respiration.",
    [
      [
        "Only protein can supply energy",
        "Carbohydrate and fat can both be used as energy sources."
      ],
      [
        "Vitamins provide most of the energy",
        "Vitamins play important roles but are not the main energy sources."
      ]
    ]
  ],
  "periodic-table": [
    "Two elements are directly above and below each other in the periodic table. What does this tell you?",
    "They are in the same group",
    "Groups are vertical columns.",
    [
      [
        "They are in the same period",
        "Periods run left to right."
      ],
      [
        "They have the same number of protons",
        "Different elements have different proton numbers."
      ]
    ]
  ],
  "separating-techniques": [
    "Sand and dissolved salt are mixed with water. Which step could separate the sand first?",
    "Filter the mixture",
    "Sand remains on the paper while the salt solution passes through.",
    [
      [
        "Evaporate all the water first",
        "Sand and salt would then remain together."
      ],
      [
        "Use a sieve to remove the dissolved salt",
        "Dissolved salt passes through ordinary sieves."
      ]
    ]
  ],
  "work-done": [
    "The same force moves a box 2 m in one trial and 4 m in another. What happens to the work done by that force?",
    "It doubles",
    "When the force acts in the direction of movement, work done is force × distance.",
    [
      [
        "It stays the same",
        "The force is the same, but the distance changed."
      ],
      [
        "It halves",
        "The same force acting over a longer distance does more work."
      ]
    ]
  ],
  "respiration": [
    "A plant in darkness still needs energy for cell processes. Which process continues to release it?",
    "Respiration",
    "Living plant cells respire in the light and in the dark.",
    [
      [
        "Photosynthesis alone",
        "Photosynthesis depends on light and stores energy in sugars."
      ],
      [
        "Water uptake releases the energy",
        "Water uptake is not the process releasing energy from glucose."
      ]
    ]
  ],
  "earth-structure": [
    "Which label should go on the inward side of the mantle?",
    "Core",
    "The core lies inside the mantle, towards Earth's centre.",
    [
      [
        "Crust",
        "The crust is outside the mantle."
      ],
      [
        "Atmosphere",
        "The atmosphere surrounds Earth's outside."
      ]
    ]
  ],
  "photosynthesis": [
    "A plant gains dry mass as it grows. Which gas provides carbon for its new carbohydrates?",
    "Carbon dioxide",
    "Carbon dioxide supplies carbon for the sugars made by photosynthesis.",
    [
      [
        "Oxygen",
        "Oxygen is released during photosynthesis."
      ],
      [
        "Nitrogen",
        "Nitrogen in the air is not the direct source of carbon for sugars."
      ]
    ]
  ],
  "electricity": [
    "One wire is disconnected in a circuit with a cell, switch, and lamp in one loop. What happens if the switch is closed?",
    "The lamp stays off",
    "The disconnected wire still breaks the loop.",
    [
      [
        "The lamp lights when the switch closes",
        "There is still a gap at the loose wire."
      ],
      [
        "The lamp flickers because the cell changes direction",
        "A gap in the loop stops a steady current."
      ]
    ]
  ],
  "metals": [
    "A strip of magnesium is placed in copper sulfate solution. What visible result would support displacement?",
    "A reddish-brown solid forms on the strip",
    "Magnesium is more reactive and copper metal can be produced.",
    [
      [
        "Magnesium metal appears on a copper strip",
        "That would require copper to displace magnesium."
      ],
      [
        "The strip stays clean and the solution does not change",
        "That supplies no visible evidence of displacement."
      ]
    ]
  ],
  "journey-speed": [
    "A runner covers 120 m in 20 s. What is their average speed?",
    "6 m/s",
    "Distance ÷ time = 120 ÷ 20.",
    [
      [
        "0.17 m/s",
        "That calculation divides time by distance."
      ],
      [
        "2400 m/s",
        "Speed uses division by the time, not multiplication."
      ]
    ]
  ],
  "balanced-moments": [
    "A 20 N load acts 1 m to the left of a pivot. Where should a 10 N load act to balance it?",
    "2 m to the right",
    "Both moments have magnitude 20 N m in opposite directions.",
    [
      [
        "1 m to the right",
        "The lighter load needs a greater distance."
      ],
      [
        "2 m to the left",
        "Both loads would turn the beam in the same direction."
      ]
    ]
  ]
};

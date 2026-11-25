(window.ALevelPaperPractice ||= {}).passages = {
  id: "passages",
  title: "Paper 2 comprehension",
  principle: "Read the passage and decide which observations your answer needs to explain.",
  modelStimulus: "Coral cells contain algae that supply them with sugars. After several weeks in unusually warm water, the algae have damaged thylakoid membranes. The carbon dioxide concentration around the algae remains unchanged.",
  modelQuestion: "Explain why the algae might now make less sugar.",
  model: [
    "The question asks about sugar production in the alga. I’ll follow what happens inside its chloroplast.",
    "The measured carbon dioxide concentration has stayed the same. It cannot by itself explain the drop in sugar production. The changed condition is the damage to the thylakoids.",
    "The thylakoid membranes contain the electron transfer chains and ATP synthase used in the light-dependent reaction. Damage can reduce the supply of ATP and reduced NADP. Now connect that change to the product the question asks about.",
    "A complete answer could read, ‘Damage to the thylakoids can reduce production of ATP and reduced NADP in the light-dependent reaction. The alga then has less ATP and reducing power to convert glycerate 3-phosphate to triose phosphate. Less triose phosphate is available to make sugars even though carbon dioxide is still supplied.’",
  ],
  tasks: [
    {
      kind: "writing",
      guided: true,
      passage: [
        "Corals can expel their algae after prolonged warming. A coral that has lost its algae can survive for several weeks on stored lipids, but its growth slows. Previously, the algae supplied much of the coral’s sugar.",
        "A student starts an explanation. ‘Once the algae leave, the coral receives less sugar. Its own cells can still use stored lipids as respiratory substrates.’",
      ],
      prompt: "Complete the explanation. How can the coral stay alive for a time while its growth slows?",
      points: [
        "Link respiration of lipid reserves to continued ATP production for essential processes in coral cells.",
        "Explain how a smaller supply of respiratory substrate or carbon for new biomass can slow growth. Give a process affected.",
        "Account for the time limit by identifying what can happen to the reserves.",
      ],
      modelAnswer: [
        "Respiring stored lipids still supplies ATP for essential processes such as active transport. With less sugar arriving, less organic material is available to build new tissue, so the coral can survive while growing slowly. If other food cannot replace the lost supply, the lipid reserves will eventually run low.",
      ],
      repairs: [
        "What does respiration of a lipid supply that a coral cell can use to transport ions?",
        "Where would the carbon in newly grown coral tissue have to come from?",
        "What happens to a reserve when its use exceeds its replacement?",
      ],
    },
    {
      kind: "writing",
      guided: true,
      passage: [
        "Red and grey squirrels eat seeds and nuts. Oak trees produce acorns, which grey squirrels digest more effectively than red squirrels. Red squirrels compete better than greys for the small seeds in conifer forests. Both species use trees for nesting.",
        "In otherwise similar woods, red squirrels raise fewer young when they share oak woodland with greys than when they share conifer woodland with greys.",
      ],
      prompt: "Suggest an explanation for the difference in the number of young. Decide which detail distinguishes the two woods before you write.",
      points: [
        "Use the difference between acorns and small seeds to compare the relative feeding advantage of the two species.",
        "Explain how competition for a limited food supply can reduce the amount available to red squirrels.",
        "Connect the food or energy available to red squirrels to a particular cost of producing or rearing young.",
      ],
      modelAnswer: [
        "Where acorns are the main food, greys can obtain more energy than reds from the same mass of acorns. If food is limited, acorns eaten by greys also leave less for reds. Reds compete more successfully for small seeds in conifer woodland. The difference in food intake could leave red squirrels in oak woods with less energy or material to produce milk and rear their young.",
      ],
      repairs: [
        "Which species has the feeding advantage for the main seeds in each wood?",
        "When two species use a limited resource, how does consumption by one affect the amount left for the other?",
        "Think of one cost to a female squirrel of rearing a litter.",
      ],
    },
    {
      kind: "writing",
      passage: [
        "In a variety of pea, the pod wall stays green while its developing seeds contain no chlorophyll. A chamber around each pod supplied the outer wall with carbon dioxide enriched in ¹³C, a stable isotope of carbon. All leaves remained in ordinary air. Sugar continued to reach all the pods from the leaves.",
        "Half the pods had transparent covers and half had opaque covers. The temperature and carbon dioxide concentration were the same. Before the investigation, 1.1% of the carbon atoms in seed starch were ¹³C.",
      ],
      evidence: [
        "Mean measurements after six hours",
        ["Pod cover", "Increase in seed starch per pod (mg)", "¹³C in seed starch (% of carbon atoms)"],
        [["Transparent", "6.1", "9.6"], ["Opaque", "6.0", "1.1"]],
      ],
      prompt: "Use the passage and your own knowledge to explain how seeds under both covers could gain starch and why the proportion of ¹³C in their starch differed.",
      points: [
        "Identify the common incoming source of carbon that can account for starch gain in both sets of seeds.",
        "Explain how labelled carbon enters an organic molecule in the illuminated pod wall.",
        "Link light to the supply of ATP and reduced NADP for producing triose phosphate, accounting for the difference under opaque covers.",
        "Trace carbon from the pod wall into the starch of the seeds and relate this to the measured enrichment.",
      ],
      modelAnswer: [
        "Leaves supplied sugar made from ordinary carbon dioxide to both sets of pods. The seeds could use this sugar to make starch under either cover. In an illuminated green pod wall, rubisco can fix ¹³CO₂ by combining it with RuBP. The resulting glycerate 3-phosphate is converted to triose phosphate using ATP and reduced NADP from the light-dependent reaction.",
        "Some of this carbon can reach the seeds in sugar from the pod wall and be incorporated into starch, accounting for the rise to 9.6% ¹³C. Under the opaque cover, darkness restricts the light-dependent supply of ATP and reduced NADP. The seeds still gain starch from incoming sugar, but its ¹³C proportion stays at the initial 1.1%.",
      ],
      repairs: [
        "Trace the origin of the sugar that reached the seeds in both treatments.",
        "Which five-carbon compound can accept carbon dioxide in the green wall, and what product forms?",
        "What does an illuminated thylakoid provide for the conversion of glycerate 3-phosphate to triose phosphate?",
        "The isotope was supplied to the wall and detected in the seeds. In what form could carbon travel between them?",
      ],
    },
    {
      kind: "writing",
      passage: [
        "Water flow bends a hair on the leg of a pond insect. The base of the hair pulls on the membrane of a sensory neurone. Scientists observed that, during steady flow, the socket gradually shifted. The hair stayed bent, but the pull on the membrane eased.",
        "At the start of steady flow, the neurone fired a burst of impulses and then fell silent. When the scientists held the socket fixed, the same steady flow kept the membrane stretched and impulses continued throughout the recording.",
      ],
      prompt: "A student suggests that after the first burst the neurone needs the rest of the recording to recover before it can fire again. Use the passage and your own knowledge to assess this explanation.",
      points: [
        "Account for the initial firing by linking membrane stretch to ion movement, depolarisation and threshold.",
        "Explain why a bent hair can give a silent neurone once the socket shifts.",
        "Use the fixed-socket result to judge the proposed recovery time, while allowing for a refractory period between successive impulses.",
      ],
      modelAnswer: [
        "Stretch could open mechanically gated ion channels. An inward flow of positive ions would depolarise the sensory ending, and a large enough generator potential would bring the neurone to threshold. The recording establishes when impulses occur. Identifying the ions would require a separate measurement. As the socket shifts, the membrane is stretched less even though the hair stays bent. Fewer channels may remain open, so the generator potential can fall below threshold.",
        "Holding the socket fixed preserves the stretch and the neurone fires repeatedly. There can still be a short refractory period after each action potential, but the repeated firing shows that recovery need not take the rest of the recording. The comparison supports weaker membrane stretch as an explanation for the silence.",
      ],
      repairs: [
        "Which way would positive charge have to move across the sensory membrane to depolarise it? How could stretching the membrane cause that movement?",
        "Which part of the receptor stops being stretched as much, despite the hair staying bent?",
        "Could recovery take the rest of the recording? Which observation tests that claim?",
      ],
    },
  ],
};

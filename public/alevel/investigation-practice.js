(window.ALevelPaperPractice ||= {}).investigations = {
  id: "investigations",
  title: "Paper 3 investigations",
  principle: "Decide how far an investigation supports its claim.",
  modelStimulus: "Students measured oxygen uptake using equal masses of germinating seeds at the same temperature. Each reading comes from a separate batch. One packet supplied the unstirred group and a different packet supplied the stirred group.",
  modelQuestion: "How far do the results support the claim that stirring increases oxygen uptake? Explain how you would test the claim more convincingly.",
  evidence: [
    "Initial oxygen uptake by germinating seeds (µL g⁻¹ min⁻¹)",
    ["Batch number within group", "Unstirred", "Stirred"],
    [["1", "3.2", "4.2"], ["2", "3.8", "4.9"], ["3", "4.4", "3.8"]],
  ],
  model: [
    "The batch numbers start again in each group. Batch 1 in one packet has no particular match in the other packet. I’ll compare the two groups as a whole.",
    "The mean rates are (3.2 + 3.8 + 4.4) ÷ 3 = 3.8 and (4.2 + 4.9 + 3.8) ÷ 3 = 4.3 µL g⁻¹ min⁻¹. The stirred group took up 0.5 µL g⁻¹ min⁻¹ more on average. Individual batches varied. The lowest stirred rate was lower than the highest unstirred rate.",
    "Could a property of the seeds account for the difference? If seeds from the second packet were further through germination, they might respire faster. Using a different packet for each treatment leaves that explanation open, even with equal masses and temperatures.",
    "Use several packets. Randomly split comparable batches from each packet between the two conditions. That gives a comparison of stirring within each packet. Include seed-free chambers in both conditions to check whether stirring changes the reading through the apparatus itself.",
  ],
  tasks: [
    {
      kind: "writing", guided: true,
      passage: [
        "A group recorded mean initial enzyme reaction rates of 1.2, 2.0, 2.3 and 1.1 µmol min⁻¹ at bath temperatures of 20, 30, 40 and 50 °C. They started timing as soon as they added refrigerated enzyme.",
        "The group has begun its evaluation. The largest measured mean was at 40 °C, but the optimum might lie between two temperatures tested. Cold enzyme could also have lowered the temperature of the mixture as timing began.",
      ],
      prompt: "Complete the evaluation. Describe how you would change the investigation to locate the optimum more precisely and judge how much the measured rates vary.",
      points: [
        "Bring enzyme and substrate separately to the intended temperature before starting the reaction and check the temperature of the mixture during measurement.",
        "Measure at intervals smaller than 10 °C on both sides of 40 °C to locate the peak more closely.",
        "Start several fresh reactions at each temperature and use their rates to report variation as well as a mean.",
      ],
      repairs: [
        "At what point does the reaction start? Which liquids need to be at the intended temperature before that point?",
        "If the highest rate were at 38 °C, which measurements either side of 40 °C would help you detect it?",
        "Reading the same tube again follows the same reaction. What would provide separate estimates of the initial rate at one temperature?",
      ],
      modelAnswer: [
        "Bring enzyme and substrate to the selected temperature separately. Use the same equilibration time in each trial. Mix, start timing and check the temperature of the reacting mixture. Try temperatures from 30 to 50 °C at 2 °C intervals. This distinguishes possible peaks that fell between the original readings.",
        "Set up fresh reaction mixtures independently at each temperature. Report their mean initial rate and a measure of variation, such as the standard deviation. This shows how consistent the rates are near the apparent peak.",
      ],
    },
    {
      kind: "writing", guided: true,
      passage: [
        "A second group used three new seed packets. They split each packet into two equal-mass batches and allocated one at random to stirring. The other was left unstirred. Temperature was the same in all chambers. Seed-free chambers showed no measurable change under either condition.",
      ],
      evidence: [
        "Initial oxygen uptake per gram of seed",
        ["Packet", "Unstirred (µL g⁻¹ min⁻¹)", "Stirred (µL g⁻¹ min⁻¹)"],
        [["A", "3.0", "3.4"], ["B", "4.2", "4.8"], ["C", "3.6", "3.5"]],
      ],
      prompt: "The group concludes that stirring increases oxygen uptake in seeds from every packet. Judge their conclusion. Consider both the measurements and the way the groups were formed.",
      points: [
        "Compare stirred and unstirred batches within each packet. Rates rose by 0.4 and 0.6 µL g⁻¹ min⁻¹ in A and B but were 0.1 µL g⁻¹ min⁻¹ lower with stirring in C.",
        "The allocation allowed each packet to supply its own comparison. Differences in seed origin alone cannot explain a consistent difference between the treatments.",
        "Only three packet comparisons were made and their differences varied. The higher mean rate with stirring provides limited support for an average increase and does not justify the claim about every packet.",
      ],
      repairs: [
        "Follow one row at a time. Is the change from unstirred to stirred always in the same direction?",
        "If seeds in one packet were further through germination, which of the two conditions would contain these seeds?",
        "How many separate packets support the statement about every packet? Consider how large the observed differences were in each.",
      ],
      modelAnswer: [
        "Stirred batches took up 0.4 and 0.6 µL g⁻¹ min⁻¹ more oxygen than their unstirred comparisons in packets A and B respectively. In C the stirred batch took up 0.1 µL g⁻¹ min⁻¹ less. The mean difference across packets was an increase of 0.3 µL g⁻¹ min⁻¹.",
        "The random allocation within each packet helps separate an effect of stirring from differences between packets. The observations suggest a possible average increase. With just three packets and a difference in the opposite direction in C, there is little basis for saying that stirring increases uptake in every packet.",
      ],
    },
    {
      kind: "writing",
      passage: [
        "A grower tested a clear film sprayed on bean leaves. Thirty-two similar potted plants were allocated at random to four groups of eight. Each plant spent six hours in its own humidity-controlled enclosure. Control plants received the spray carrier alone. The soil surface was sealed and all sprays had dried before the initial weighing.",
        "The supplier claims that the film cuts water loss by at least a third at either humidity and will keep bean plants from wilting during a two-day journey.",
      ],
      evidence: [
        "Loss of mass per plant over six hours",
        ["Relative humidity (%)", "Spray", "Mean loss (g)", "Standard deviation (g)"],
        [["35", "Carrier", "5.1", "0.8"], ["35", "Film", "3.2", "0.7"], ["80", "Carrier", "2.1", "0.5"], ["80", "Film", "1.9", "0.5"]],
      ],
      prompt: "How far do the results support the supplier’s claim? Use the investigation to justify your answer.",
      points: [
        "Compare plants at the same humidity. At 35% the mean loss fell from 5.1 to 3.2 g, a reduction of about 37% relative to the carrier. Comparing 3.2 g with the 3.4 g maximum allowed by the claim also works.",
        "At 80% humidity mean loss fell from 2.1 to 1.9 g, about 10%. Equivalently, a one-third reduction would require a mean of 1.4 g or less. The observed means reach the claimed reduction at only one humidity.",
        "Use the SDs as measures of variation among plants. The 0.2 g difference at 80% is small relative to the SD of 0.5 g in each group. A population effect or its size would need an estimate of uncertainty for the treatment comparison.",
        "The measurements covered mass loss over six hours. Wilting over two days would need direct observation over that period.",
      ],
      repairs: [
        "The supplier promises a reduction compared with a carrier-only plant in the same air. Which mean supplies the reference value at 35% humidity?",
        "Check what fraction 0.2 g is of the carrier mean at 80% humidity. How does it compare with one third?",
        "The SDs describe differences between plants in a group. What information would a confidence interval for the treatment difference give you instead?",
        "Find the outcome and duration of the test, then compare them with the outcome and duration of the journey claim.",
      ],
      modelAnswer: [
        "At 35% humidity the film group lost (5.1 − 3.2) ÷ 5.1 × 100 ≈ 37% less mass on average than the carrier group. At 80% the reduction was (2.1 − 1.9) ÷ 2.1 × 100 ≈ 10%. Both means suggest less water loss, but only the drier condition gave a reduction as large as a third.",
        "At 80% humidity the difference of 0.2 g is small compared with the 0.5 g SD within each group. Those SDs describe variation among plants. To judge the precision of the percentage reductions we would need uncertainty estimates for those reductions. Finally the study measured mass loss for six hours. It did not record whether plants wilted over two days.",
      ],
    },
    {
      kind: "writing",
      passage: [
        "An observer walked a fixed route through each of two meadows on six mornings in July each year and counted butterfly sightings. In year 1 both owners cut their meadows in May. In year 2 Alder meadow was first cut in August, while Birch meadow was again cut in May.",
        "An ecologist concluded that delaying the cut doubled the number of adult butterflies living in Alder meadow.",
      ],
      evidence: [
        "Butterfly sightings per walk, mean (range)",
        ["Meadow", "Year 1", "Year 2"],
        [["Alder", "12 (8–16)", "24 (18–30)"], ["Birch", "8 (5–11)", "16 (11–21)"]],
      ],
      prompt: "Evaluate the ecologist’s conclusion and justify one change that would make the evidence stronger.",
      points: [
        "Compare the changes in both meadows. Sightings doubled in each. In absolute terms the increases were 12 per walk at Alder and 8 at Birch, a difference of 4. Either comparison leaves the cause of the increase uncertain.",
        "Ranges describe variation between walks. Repeated walks in one meadow under each schedule give no estimate of how the effect varies between independently treated meadows.",
        "Explain a limit on the conclusion in context, such as a change affecting both meadows between years, or differences in butterfly activity or visibility affecting sightings.",
        "Propose a change that addresses a specific limitation and explain how it would strengthen the comparison or the estimate of the resident population.",
      ],
      repairs: [
        "For each meadow, compare its own July count in year 2 with its July count in year 1.",
        "Which unit received the change to the mowing schedule? How many such units supplied the six counts?",
        "A walk records encounters. What else might change the number an observer encounters besides the number living in the meadow?",
        "Choose the weakness you want to address. Explain what new comparison or measurement your design would make possible.",
      ],
      modelAnswer: [
        "Sightings in Alder rose from 12 to 24 per walk. That is a doubling, but Birch also doubled, from 8 to 16, with its usual cut. A difference between years, such as weather affecting butterfly activity, could contribute to both rises. These counts measure sightings, so more encounters need not mean twice as many resident adults.",
        "The ranges show the variation across walks within each meadow. All six walks sampled the same mowing decision in each meadow. Use several comparable meadows and randomly assign them to May or August cutting. Count before and after the change on the same schedule in both groups. The resulting comparisons across independent meadows would help separate a mowing effect from differences between meadows or years.",
      ],
    },
  ],
};

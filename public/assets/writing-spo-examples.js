export const rampQuestion = "A pupil wants to find out whether ramp height changes how far a toy car rolls. Why should they use the same car each time?";

export const rampExample = {
  prompt: rampQuestion,
  topic: "Using the same car each time helps show whether differences in distance travelled are due to ramp height rather than differences between the cars.",
  details: [
    ["Different cars → different wheels and friction", "Different cars can have different wheels and amounts of friction."],
    ["Different friction → different rolling distances", "These differences could affect how far a car rolls, even when the ramp height is unchanged."],
    ["Same car → car characteristics kept constant", "Using the same car keeps these characteristics constant while the ramp height is varied."]
  ],
  conclusion: "This makes the comparison between different ramp heights a more valid test.",
  openingChoices: [
    ["The pupil is doing an experiment.", "Name the scientific point. The reader still needs to know which feature matters and why."],
    ["To test ramp height fairly, use the same car each time.", "This tells the pupil what to do. Explain how using the same car helps them interpret the distances."],
    ["Using the same car helps show whether ramp height caused the difference in distance travelled.", "Correct. It explains the purpose of keeping the car the same."]
  ],
  closingChoices: [
    ["The pupil should therefore use the same car each time.", "This repeats the action. Use the reasoning about wheels and friction to say what the test can show."],
    ["This makes the comparison between different ramp heights a more valid test.", "Correct. It draws together the explanation by saying why the comparison is stronger."]
  ]
};

export const examples = {
  7: rampExample,
  8: {
    prompt: "Why do both muscle cells and root cells need oxygen?",
    topic: "Muscle cells and root cells both use oxygen for aerobic respiration.",
    details: [
      ["Muscles get oxygen from blood", "Blood carries oxygen to muscle cells."],
      ["Roots get oxygen from air spaces in soil", "Root cells can get oxygen from air spaces in the soil."],
      ["Both use oxygen and glucose → energy transferred", "Both types of cell use oxygen and glucose in aerobic respiration, which transfers energy for their activities."]
    ],
    conclusion: "Different routes supply oxygen for the same process in both types of cell."
  },
  9: {
    prompt: "Why does a thicker air-sac wall slow oxygen uptake?",
    topic: "A thicker air-sac wall slows oxygen diffusion into the blood.",
    details: [
      ["Oxygen concentration higher in air sac than arriving blood", "The oxygen concentration is higher inside the air sac than in the arriving blood."],
      ["Thicker barrier → longer diffusion distance", "Oxygen molecules must travel further to reach the capillary across a thicker barrier."]
    ],
    conclusion: "A thin barrier helps the lung supply oxygen to the blood quickly."
  },
  10: {
    prompt: "Potato samples gained 4% mass in dilute solution and lost 3% in concentrated solution. Explain these results.",
    topic: "The potato samples changed mass because water moved into or out of their cells by osmosis.",
    details: [
      ["Dilute solution, +4% → net water movement into cells", "The sample in dilute solution gained 4% mass as more water entered its cells than left."],
      ["Concentrated solution, −3% → net water movement out", "The sample in concentrated solution lost 3% mass as more water left its cells than entered."],
      ["Water crosses partially permeable membranes", "In both samples, water crossed partially permeable cell membranes."]
    ],
    conclusion: "The opposite mass changes show that the surrounding solution affected the direction of net water movement."
  },
  11: {
    prompt: "A felt-covered can cooled by 7 °C in ten minutes. An uncovered can cooled by 13 °C. What do the results show?",
    topic: "The felt reduced the rate of energy transfer from the hot water to the surroundings.",
    details: [
      ["Same time → compare 7 °C and 13 °C drops", "In the same ten minutes, the covered can cooled by 7 °C and the uncovered can cooled by 13 °C."],
      ["Felt traps air → slower conduction", "The felt traps air, which conducts thermal energy poorly, so less energy is transferred by conduction."]
    ],
    conclusion: "These results support using felt as insulation when the aim is to keep the water warm for longer."
  },
  12: {
    prompt: "Explain the importance of the proton gradient across the inner mitochondrial membrane.",
    topic: "A proton gradient across the inner mitochondrial membrane enables ATP synthesis.",
    details: [
      ["Energy from electron transfer → pumps H⁺ out of matrix", "Energy released by electron transfer drives proton pumping from the matrix into the intermembrane space."],
      ["H⁺ down electrochemical gradient through ATP synthase", "Protons then move back into the matrix through ATP synthase, down their electrochemical gradient."],
      ["Energy from proton flow → ATP from ADP and Pi", "ATP synthase uses the energy from this flow to phosphorylate ADP, forming ATP."]
    ],
    conclusion: "The gradient links electron transfer to the ATP supply needed for energy-requiring processes."
  },
  13: {
    prompt: "For the essay ‘The importance of gradients in living organisms’, explain how a sodium ion gradient enables glucose absorption.",
    topic: "An epithelial sodium ion gradient enables uptake of glucose from the ileum even when glucose is less concentrated in the lumen.",
    details: [
      ["Na⁺/K⁺ pump uses ATP → low intracellular Na⁺", "The sodium–potassium pump uses ATP to move sodium ions out of the epithelial cell, maintaining a low intracellular sodium ion concentration."],
      ["Luminal Na⁺ down gradient → glucose in via co-transporter", "Sodium ions enter from the lumen down their electrochemical gradient through a co-transporter, allowing glucose to move into the cell against its concentration gradient."],
      ["Glucose → blood by facilitated diffusion", "As glucose accumulates in the epithelial cell, it can move towards the blood by facilitated diffusion."]
    ],
    conclusion: "The sodium ion gradient thus couples the use of ATP at one membrane to the absorption of a nutrient across another."
  }
};

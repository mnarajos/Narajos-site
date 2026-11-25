/* Original teaching families. Each task states the conditions needed for its predictions. */
(() => {
function withStimulus(stimulus, instruction, { examQuestion = false, instructionFirst = false } = {}) {
  const task = Array.isArray(instruction) ? instruction.join(" ") : instruction;
  // Keep the full prompt available to the assessment parser and saved-work review.
  const prompt = instructionFirst ? task + " " + stimulus : stimulus + " " + task;
  return { prompt, stimulus, instruction, examQuestion };
}

window.ALevelTeachingFamilies = {
  osmosis: {
    id: "osmosis",
    title: "Water potential and calibration",
    topics: ["a2"],
    papers: ["p1", "p3"],
    principle:
      "Compare the signed water potentials, then specify the membrane and direction of net movement.",
    model: [
      "Recall that 0 kPa is higher than any negative water potential. −200 kPa is higher than −600 kPa because it is closer to zero.",
      "Across a partially permeable membrane, net water movement is from −200 kPa to −600 kPa. Individual water molecules can cross in both directions.",
      "In the example graph, start at 0% change in mass on the vertical axis. Trace horizontally to the best-fit line and down to the water-potential axis. The intercept is −400 kPa.",
      "At zero percentage change, there is no net gain or loss of water. Estimate the tissue water potential as −400 kPa, assuming mass change reflects water movement and sufficient equilibration. This is an estimate from a tissue investigation.",
    ],
    tasks: [
      {
        kind: "choice",
        ...withStimulus(
          "Guided practice. A cell is at −700 kPa and the surrounding solution at −300 kPa.",
          "Predict net movement.",
        ),
        options: ["Into the cell", "Out of the cell", "No net movement"],
        answer: 0,
        why: "−300 kPa is higher than −700 kPa. Water enters across the partially permeable membrane.",
        hints: ["Which of the two values is closer to zero?", "The solution has the higher water potential."],
        guided: true,
      },
      {
        kind: "number",
        ...withStimulus(
          "A calibration line crosses 0% change at −500 kPa.",
          "Estimate the tissue water potential in kPa.",
        ),
        answer: -500,
        why: "The intercept estimates the tissue water potential. Include the negative sign.",
        hints: ["Start at 0% mass change. Which axis gives the tissue estimate?", "Read the intercept on the horizontal axis, including its sign."],
        unit: "kPa",
      },
      {
        kind: "choice",
        ...withStimulus(
          "A cell and solution are both at −450 kPa.",
          "What occurs?",
        ),
        options: [
          "Water crosses in both directions with no net movement",
          "All water movement stops",
          "Water only leaves the cell",
        ],
        answer: 0,
        why: "Equal water potentials give no net movement while molecules still cross.",
        hints: ["Compare the two water potentials before predicting net movement.", "Equal water potentials give no net movement while molecules still cross."],
      },
      {
        kind: "writing",
        prompt:
          "Explain why a tissue gains mass at −200 kPa if its initial water potential is −600 kPa.",
        points: [
          "The solution has the higher water potential.",
          "Water enters cells by osmosis across partially permeable membranes.",
          "Net water uptake increases tissue mass.",
        ],
      },
    ],
    visual: "calibration",
    catchup: "a2-osmosis",
    misconception:
      "Treating a more negative value as the higher water potential or reading a calibration intercept on the wrong axis.",
    specification: "3.2.3 / RP3",
    schemaVersion: 1,
  },
  countercurrent: {
    id: "countercurrent",
    title: "Countercurrent exchange",
    topics: ["a3"],
    papers: ["p1", "p3"],
    principle:
      "Compare the two fluids at the same physical position, following each flow direction.",
    model: [
      "Compare dissolved oxygen in water and blood at the same point. The model readings represent oxygen available for diffusion. In real gills, oxygen diffuses from higher to lower oxygen partial pressure.",
      "Follow the arrows. At the highlighted position, compare the water with the blood immediately next to it.",
      "Now compare every pair. Blood enters on the right at 30 units and leaves on the left at 90. The gradient stays in the same direction along the exchange surface.",
      "In parallel flow the fluids move in the same direction. At the last position the model readings are equal, so there is no net oxygen diffusion there. The model readings do not count oxygen bound to haemoglobin.",
    ],
    tasks: [
      {
        kind: "choice",
        ...withStimulus(
          "Guided practice. In the model, one position shows a dissolved oxygen reading of 60 units in water and 50 units in blood.",
          "In which direction is there net oxygen diffusion?",
        ),
        options: ["Water to blood", "Blood to water", "Neither"],
        answer: 0,
        why: "At that position the water has more dissolved oxygen in the model. The resulting gradient gives net diffusion into the blood.",
        hints: ["Compare water and blood at the same position.", "The model shows a higher dissolved oxygen reading in the water."],
        guided: true,
      },
      {
        kind: "choice",
        ...withStimulus(
          "Two aqueous solutions flow in opposite directions on either side of a membrane that the dissolved nutrient can cross. At every position the donor solution has a higher nutrient concentration than the receiver solution.",
          "What follows?",
        ),
        options: [
          "Net diffusion can continue along its length",
          "Opposite flow makes diffusion active transport",
          "The two fluids must have equal inlet concentrations",
        ],
        answer: 0,
        why: "The local concentration difference permits diffusion along the whole exchange surface.",
        hints: ["Can you find any point along the membrane where the two concentrations are equal?", "The local concentration difference permits diffusion along the whole exchange surface."],
      },
      {
        kind: "writing",
        prompt: "Use the model to explain why changing from parallel to countercurrent blood flow can improve oxygen uptake.",
        points: [
          "With countercurrent flow, water has a higher dissolved oxygen reading than the adjacent blood at each position in the model.",
          "Countercurrent flow maintains a gradient from water to blood along the lamella. In the parallel-flow model the gradient reaches zero at the end.",
          "Net oxygen diffusion into the blood can continue along more of the exchange surface, increasing uptake.",
        ],
        reviewNote: "Across a real gill, oxygen partial pressure is the driving gradient. In this model, dissolved oxygen readings represent that gradient.",
      },
    ],
    visual: "countercurrent",
    catchup: "a3-fish",
    misconception:
      "Comparing inlet values instead of concentrations at the same physical position.",
    specification: "3.3.2",
    schemaVersion: 1,
  },
  calvin: {
    id: "calvin",
    title: "Follow the Calvin cycle",
    topics: ["a5"],
    papers: ["p2", "p3"],
    principle:
      "Track carbon compounds separately from energy and reducing power.",
    model: [
      "Recall the light-dependent reaction supplies ATP and reduced NADP. The Calvin cycle occurs in the stroma.",
      "Rubisco catalyses fixation of one CO₂ onto a five-carbon RuBP molecule. The unstable six-carbon intermediate forms two three-carbon GP molecules.",
      "GP is reduced to triose phosphate (TP). ATP supplies energy and reduced NADP supplies reducing power. NADP returns to the light-dependent reaction.",
      "For three CO₂, six GP form and are reduced to six TP. Five TP regenerate three RuBP using ATP. One TP is a net output for making other organic substances.",
      "The cycle can continue only if RuBP is regenerated. Two net TP contain enough carbon for a six-carbon carbohydrate, through further reactions.",
    ],
    tasks: [
      {
        kind: "choice",
        ...withStimulus(
          "Guided practice. The supply of reduced NADP becomes limiting while ATP remains available.",
          "Which stage is directly restricted?",
        ),
        options: [
          "Reduction of GP to TP",
          "Fixation of CO₂ by rubisco",
          "Diffusion of CO₂ through stomata",
        ],
        answer: 0,
        why: "GP reduction requires reducing power from reduced NADP, as well as ATP.",
        hints: ["Follow carbon from carbon dioxide into the first stable product.", "GP reduction requires reducing power from reduced NADP, as well as ATP."],
        guided: true,
      },
      {
        kind: "choice",
        ...withStimulus(
          "In a chloroplast, ATP production stops. As existing ATP is used up, the supply becomes limiting.",
          "Which conclusion is justified?",
        ),
        options: [
          "Both GP reduction and RuBP regeneration are restricted",
          "Only CO₂ entry is restricted",
          "TP production continues indefinitely",
        ],
        answer: 0,
        why: "ATP is required in GP reduction and in regeneration. Predictions about pool sizes depend on timing.",
        hints: ["Find the step that makes TP. Which two light-dependent products does it use?", "ATP is required in GP reduction and in regeneration. Predictions about pool sizes depend on timing."],
      },
      {
        kind: "writing",
        prompt:
          "Explain why GP may initially accumulate after transfer to darkness.",
        points: [
          "Less ATP and reduced NADP become available from the light-dependent reaction.",
          "Reduction of GP to TP slows.",
          "GP can initially accumulate while carbon fixation continues, before substrates become limiting.",
        ],
      },
    ],
    visual: "calvin",
    catchup: "a5-calvin",
    misconception:
      "Confusing carbon fixation, reduction, energy supply and regeneration.",
    specification: "3.5.1",
    schemaVersion: 1,
  },
  dihybrid: {
    id: "dihybrid",
    title: "Derive gametes and crosses",
    topics: ["a7"],
    papers: ["p2", "p3"],
    principle: "Each gamete receives one allele at each gene locus.",
    model: [
      "Start with the parents. Each parent is heterozygous at both gene loci.",
      "Take A or a from one locus and B or b from the other. For unlinked genes with normal segregation, the four gametes are equally likely.",
      "Place the gametes from one parent along the top and those from the other along the side.",
      "Combine one gamete from each parent. AB × AB produces AABB.",
      "Complete the other combinations. More than one pair of gametes can give AaBb.",
      "Group the genotypes by phenotype. The displayed ratio assumes complete dominance, independent assortment and no modifying interaction or differential survival. A test cross AaBb × aabb instead gives an expected 1:1:1:1 under the same assumptions.",
    ],
    tasks: [
      {
        kind: "multi",
        prompt:
          "Guided practice. Select all gametes from Aabb, with normal segregation.",
        options: ["Ab", "ab", "AB", "Aa"],
        answer: [0, 1],
        why: "The first locus contributes A or a. The second can contribute only b.",
        hints: ["Take one allele from each of the two loci.", "Both gametes end in b."],
        guided: true,
      },
      {
        kind: "number",
        prompt:
          "In an unlinked AaBb × aabb test cross, what fraction is expected to be aabb? Give a decimal.",
        answer: 0.25,
        why: "ab from AaBb has probability ¼. The other parent always supplies ab.",
        hints: ["Which gamete must each parent contribute for the offspring to be aabb?", "The aabb parent has one possible gamete. Consider the AaBb parent next."],
        unit: "fraction",
      },
      {
        kind: "choice",
        ...withStimulus(
          "Two heterozygous parents have linked loci.",
          "Can you immediately apply 9:3:3:1?",
        ),
        options: [
          "No, independent assortment cannot be assumed",
          "Yes, it applies to every two-gene cross",
          "Yes, linkage only changes sex ratios",
        ],
        answer: 0,
        why: "Linkage affects gamete frequencies. The expected phenotype ratio also depends on dominance and gene interaction.",
        hints: ["Can linked loci always assort independently?", "Linkage affects gamete frequencies. The expected phenotype ratio also depends on dominance and gene interaction."],
      },
    ],
    visual: "punnett",
    catchup: "a7-dihybrid",
    misconception:
      "Giving a gamete two alleles at one locus or applying 9:3:3:1 universally.",
    specification: "3.7.1",
    schemaVersion: 1,
  },
  hardy: {
    id: "hardy",
    title: "Hardy–Weinberg calculations",
    topics: ["a7"],
    papers: ["p2", "p3"],
    principle:
      "For two alleles with complete dominance in a population at Hardy–Weinberg equilibrium, q is the recessive allele frequency and q² is the recessive phenotype frequency.",
    model: [
      "Assume a two-allele locus with complete dominance and a population in Hardy–Weinberg equilibrium. If 9% show the recessive phenotype, q² = 0.09.",
      "Take the square root: q = 0.3. This is the frequency of the recessive allele, not the recessive genotype.",
      "Use p + q = 1, so p = 0.7. Heterozygotes have frequency 2pq = 2 × 0.7 × 0.3 = 0.42, or 42%.",
      "Check the genotype sum: p² + 2pq + q² = 0.49 + 0.42 + 0.09 = 1. Multiply a genotype frequency by population size only if a number of individuals is requested.",
    ],
    tasks: [
      {
        kind: "number",
        ...withStimulus(
          "Guided practice. 16% show the recessive phenotype under the stated assumptions.",
          "Find q.",
        ),
        answer: 0.4,
        why: "q² = 0.16, so q = √0.16 = 0.4.",
        hints: ["Identify the recessive phenotype frequency before taking a square root.", "q² = 0.16, so q = √0.16 = 0.4."],
        guided: true,
        unit: "frequency",
      },
      {
        kind: "number",
        ...withStimulus(
          "In a different equilibrium population 4% have the recessive phenotype.",
          "Find the heterozygote frequency.",
        ),
        answer: 0.32,
        why: "q² = 0.04, q = 0.2, p = 0.8, and 2pq = 0.32.",
        hints: ["Find q and p separately before multiplying the two frequencies.", "q² = 0.04, q = 0.2, p = 0.8, and 2pq = 0.32."],
        unit: "frequency",
      },
      {
        kind: "number",
        ...withStimulus(
          "In an equilibrium population of 500, q² = 0.25.",
          "How many heterozygotes are expected?",
        ),
        answer: 250,
        why: "q = 0.5, p = 0.5, 2pq = 0.5, and 0.5 × 500 = 250.",
        hints: ["Write q² for the recessive genotype and compare it with 2pq.", "q = 0.5, p = 0.5, 2pq = 0.5, and 0.5 × 500 = 250."],
        unit: "individuals",
      },
    ],
    catchup: "a7-hardy",
    misconception:
      "Substituting the recessive phenotype frequency for q instead of q².",
    specification: "3.7.2",
    schemaVersion: 1,
  },
  regulation: {
    id: "regulation",
    title: "Regulate gene expression",
    topics: ["a8"],
    papers: ["p2", "p3"],
    principle:
      "Distinguish access to DNA from binding of a regulatory protein.",
    model: [
      "Recall that transcription produces RNA from a DNA template. RNA polymerase and appropriate transcription factors must be able to interact with regulatory DNA.",
      "In the introductory model, increased DNA methylation in a promoter region can reduce transcription by reducing access or recruiting repression machinery. The effect depends on where methylation occurs.",
      "Histone acetylation commonly reduces the interaction between histones and DNA, making chromatin more accessible. It can increase transcription when the required activators are present.",
      "A transcriptional activator can promote transcription. A repressor can inhibit it. Reducing a repressor can increase transcription if other requirements remain available. These mechanisms do not change the base sequence.",
    ],
    tasks: [
      {
        catchup: "a8-epigen",
        kind: "choice",
        ...withStimulus(
          "Guided practice. Promoter methylation increases at a gene where it reduces access.",
          "Predict transcription.",
        ),
        options: [
          "The transcription rate can decrease",
          "It must increase",
          "The gene changes base sequence",
        ],
        answer: 0,
        why: "Reduced access can make it harder for the transcription machinery to initiate transcription at this promoter.",
        hints: ["Check what the question says about access to this promoter.", "The supplied mechanism reduces access to the promoter."],
        guided: true,
      },
      {
        catchup: "a8-epigen",
        kind: "choice",
        ...withStimulus(
          "Histones become acetylated but a necessary activator is absent.",
          "Is increased transcription guaranteed?",
        ),
        options: [
          "No, increased access alone is insufficient",
          "Yes, acetylation replaces all activators",
          "Yes, acetylation changes the genetic code",
        ],
        answer: 0,
        why: "Accessibility can permit transcription, but does not replace necessary regulatory components.",
        hints: ["Which requirement for increased transcription is missing?", "Accessibility can permit transcription, but does not replace necessary regulatory components."],
      },
      {
        catchup: "a8-transfac",
        kind: "choice",
        ...withStimulus(
          "An activator normally increases RNA polymerase binding at a promoter. Activator activity falls, with other requirements unchanged.",
          "Predict the effect.",
        ),
        options: [
          "Transcription rate can fall because polymerase binding is reduced",
          "Transcription must rise because regulation decreased",
          "Translation immediately changes the gene base sequence",
        ],
        answer: 0,
        why: "Follow the activator-to-polymerase interaction. Less activation can reduce initiation of transcription.",
        hints: ["Connect activator activity to the probability of RNA polymerase binding.", "Follow the activator-to-polymerase interaction. Less activation can reduce initiation of transcription."],
      },
      {
        catchup: "a8-transfac",
        hints: ["What was the repressor doing before it was removed?"],
        kind: "writing",
        ...withStimulus(
          "A repressor is degraded.",
          "Explain why transcription can rise.",
        ),
        points: [
          "Less active repressor binds its regulatory site.",
          "Inhibition of transcription decreases.",
          "RNA polymerase can transcribe more frequently if required activators and substrates are available.",
        ],
      },
    ],
    visual: "regulation",
    catchup: "a8-epigen",
    misconception:
      "Confusing DNA methylation with histone acetylation or assuming accessibility guarantees transcription.",
    specification: "3.8.2.2",
    schemaVersion: 1,
  },
  pressures: {
    id: "pressures",
    title: "Explain cardiac valve movements",
    topics: ["a3"],
    papers: ["p1", "p3"],
    principle:
      "Valve position depends on a pressure difference across the valve.",
    model: [
      "Recall that blood flows down a pressure gradient and valves respond passively to pressure differences.",
      "Follow the solid ventricular and dotted atrial traces. Compare them just after crossing B.",
      "Compare ventricular pressure with both other traces between B and C. Pressure rises while ventricular volume stays approximately constant.",
      "Follow the solid ventricular and dashed aortic traces at C. Ejection then reduces ventricular volume.",
      "Follow the falling ventricular trace at D during relaxation.",
      "Compare ventricular and atrial pressure just after E. Blood can enter the ventricle again.",
    ],
    tasks: [
      {
        kind: "choice",
        ...withStimulus(
          "Guided practice. Pressures are atrium 8, ventricle 20, aorta 80 mmHg.",
          "Which valves are closed?",
        ),
        options: ["Both mitral and aortic", "Only mitral", "Only aortic"],
        answer: 0,
        why: "20 > 8 closes the mitral valve. 20 < 80 keeps the aortic valve closed.",
        hints: ["Compare ventricular pressure with atrial pressure first.", "Now compare the same ventricular pressure with the aorta."],
        guided: true,
      },
      {
        kind: "choice",
        ...withStimulus(
          "Atrium 8, ventricle 110, aorta 90 mmHg.",
          "What permits ejection?",
        ),
        options: [
          "Ventricular pressure exceeds aortic pressure",
          "The atrium contracts more strongly than the aorta",
          "Ventricular volume must already have halved",
        ],
        answer: 0,
        why: "110 > 90 opens the aortic valve. Volume falls during ejection.",
        hints: ["For ejection, compare pressure in the ventricle with pressure in the aorta.", "110 > 90 opens the aortic valve. Volume falls during ejection."],
      },
      {
        kind: "group",
        prompt:
          "Complete the causal chain for the start of ventricular systole.",
        groups: ["Increases", "Closes", "Approximately constant"],
        items: [
          ["Ventricular pressure as myocardium contracts", 0],
          ["Mitral valve when ventricular pressure exceeds atrial pressure", 1],
          ["Ventricular volume while both valves are closed", 2],
        ],
        why: "Myocardial contraction raises pressure, closing the mitral valve when ventricular pressure exceeds atrial pressure. Initially both valves are closed and volume remains approximately constant.",
        hints: ["Start with contraction, then compare ventricular pressure with atrial pressure.", "Volume decreases once the aortic valve opens."],
      },
      {
        kind: "choice",
        ...withStimulus(
          "During relaxation the atrial, ventricular and aortic pressures are 9, 4 and 75 mmHg.",
          "What happens?",
        ),
        options: [
          "The mitral valve opens and the aortic valve stays closed",
          "Both valves open because the ventricle relaxes",
          "The aortic valve opens because 75 exceeds 4",
        ],
        answer: 0,
        why: "9 > 4 permits atrial-to-ventricular flow and opens the mitral valve. Aortic pressure exceeding ventricular pressure keeps the aortic valve closed.",
        hints: ["Compare the sides of the mitral valve separately from the sides of the aortic valve.", "9 > 4 permits atrial-to-ventricular flow and opens the mitral valve. Aortic pressure exceeding ventricular pressure keeps the aortic valve closed."],
      },
      {
        kind: "choice",
        ...withStimulus(
          "“The ventricle contracts, so the mitral valve closes.”",
          "What reasoning is missing?",
        ),
        options: [
          "Ventricular pressure becomes greater than atrial pressure",
          "The name ventricular systole",
          "Blood pressure exists",
        ],
        answer: 0,
        why: "Name both compartments and compare their pressures.",
        hints: ["The mitral valve lies between the left atrium and left ventricle.", "Name both compartments and compare their pressures."],
      },
      {
        kind: "choice",
        ...withStimulus(
          "On the graph, ventricular pressure falls through aortic pressure at D.",
          "Which event follows?",
        ),
        options: [
          "Aortic valve closes",
          "Mitral valve closes",
          "Aortic valve opens",
        ],
        answer: 0,
        why: "Aortic pressure now exceeds ventricular pressure, tending to drive blood back and closing the semilunar valve.",
        hints: ["At D, decide which trace is higher just to the right of the crossing.", "Aortic pressure now exceeds ventricular pressure, tending to drive blood back and closing the semilunar valve."],
        visual: "pressure",
      },
      {
        hints: ["Describe the two valve comparisons separately during contraction and relaxation."],
        kind: "writing",
        prompt:
          "Explain the one-way flow through the left side during contraction and relaxation.",
        points: [
          "Ventricular pressure above atrial closes the mitral valve.",
          "Ventricular pressure above aortic opens the aortic valve, allowing ejection.",
          "Ventricular pressure below aortic closes the aortic valve.",
          "Ventricular pressure below atrial opens the mitral valve for filling.",
        ],
      },
    ],
    visual: "pressure",
    catchup: "a3-heart",
    misconception:
      "Naming systole or a rise in pressure without identifying the pressure difference across the valve.",
    specification: "3.3.4.1",
    schemaVersion: 1,
  },
  causal: {
    id: "causal",
    title: "Unfamiliar contexts and causal reasoning",
    topics: ["a1", "a6", "a8"],
    papers: ["p1", "p2", "p3"],
    principle:
      "Trace every intermediate relationship before predicting the final effect.",
    model: [
      "Stimulation promotes activity. Inhibition reduces activity. Disinhibition means removing or reducing an inhibitory influence. It permits activity, subject to other limiting inputs.",
      "A reversible inhibitor decreases → enzyme inhibition decreases → catalytic rate increases → protein hydrolysis is faster → less protein substrate remains after a fixed interval.",
      "This comparison assumes equal initial enzyme and substrate, temperature, pH and time, available substrate, and no replenishment or other limiting changes. Reducing free irreversible inhibitor need not restore enzymes already inactivated.",
      "A inhibits B. Increasing A lowers B activity.",
      "B inhibits C. When B is less active, it inhibits C less, so C can become more active if conditions allow.",
      "In a simplified inhibitory synapse where inhibition hyperpolarises the postsynaptic membrane, less inhibitory input reduces that hyperpolarising influence. Reaching threshold still requires sufficient net excitation. Other inhibitory mechanisms can act by shunting current.",
      "In a competing pathway, activation and inhibition can change together. Without their relative magnitudes, the net outcome may be undetermined. A pathway diagram states relationships, not the size of each effect.",
    ],
    tasks: [
      {
        catchup: "a1-enzfactors",
        kind: "choice",
        ...withStimulus(
          "Level 1 · Guided. A reversible inhibitor concentration falls. Other conditions stay suitable.",
          "Predict enzyme rate.",
        ),
        options: [
          "It can increase",
          "It must decrease",
          "All substrate is instantly removed",
        ],
        answer: 0,
        why: "Less reversible inhibition allows more catalytic activity when substrate remains available.",
        hints: ["First ask what the reversible inhibitor normally does to the enzyme.", "Less reversible inhibition allows more catalytic activity when substrate remains available."],
        guided: true,
      },
      {
        visual: "pathway-enzyme",
        catchup: "a1-enzfactors",
        kind: "choice",
        ...withStimulus(
          "Level 2. Two reactions contain the same starting amounts of a protease and its intact protein substrate. A lower concentration of reversible inhibitor increases protease activity. All other conditions are the same. Stop both reactions after the same time, while substrate remains.",
          "What remains in the reaction with less inhibitor compared with the other reaction?",
        ),
        options: [
          "Less intact protein",
          "More intact protein",
          "No change because enzymes are never affected",
        ],
        answer: 0,
        why: "Protease activity rises, hydrolysing peptide bonds faster, leaving less protein substrate.",
        hints: ["Trace the change in protease activity before predicting how much protein remains.", "Protease activity rises, hydrolysing peptide bonds faster, leaving less protein substrate."],
      },
      {
        catchup: "a1-enzfactors",
        kind: "choice",
        ...withStimulus(
          "An enzyme was irreversibly inactivated. Free inhibitor is washed away, and no new enzyme is supplied.",
          "What can be inferred?",
        ),
        options: [
          "Previously inactivated enzyme need not regain activity",
          "All enzyme activity immediately returns",
          "The enzyme concentration must increase",
        ],
        answer: 0,
        why: "Removing free inhibitor does not necessarily reverse an irreversible chemical modification of enzyme molecules.",
        hints: ["Distinguish the free inhibitor from enzyme molecules it has already inactivated.", "Removing free inhibitor does not necessarily reverse an irreversible chemical modification of enzyme molecules."],
      },
      {
        catchup: "a1-enzfactors",
        kind: "choice",
        ...withStimulus(
          "A reaction has already used all its substrate. Reversible inhibitor concentration then falls.",
          "What happens to product formation without added substrate?",
        ),
        options: [
          "It remains limited by lack of substrate",
          "It must immediately increase",
          "Product is converted into inhibitor",
        ],
        answer: 0,
        why: "Relieving inhibition cannot create substrate. Increased enzyme activity only increases product formation when substrate is available.",
        hints: ["Which reactant does the enzyme need in order to form product?", "Relieving inhibition cannot create substrate. Increased enzyme activity only increases product formation when substrate is available."],
      },
      {
        visual: "pathway-double",
        catchup: null,
        kind: "group",
        ...withStimulus(
          "A inhibits B, and B inhibits C.",
          "Level 3 · Complete the chain when A increases.", { instructionFirst: true },
        ),
        groups: ["Increases", "Decreases"],
        items: [
          ["B activity", 1],
          ["Inhibition of C by B", 1],
          ["C activity, other conditions suitable", 0],
        ],
        why: "A inhibits B more. Less active B inhibits C less, allowing C activity to increase.",
        hints: ["First decide what happens to B when A increases.", "Then ask how the change in B affects the restraint on C."],
      },
      {
        visual: "pathway-double",
        catchup: null,
        kind: "choice",
        ...withStimulus(
          "A inhibits B and B inhibits C. A falls. Other conditions are suitable.",
          "Predict C.",
        ),
        options: [
          "C can decrease as B becomes more active",
          "C must rise because A is lower",
          "C cannot change because there are two inhibitors",
        ],
        answer: 0,
        why: "Less A releases B from inhibition. More active B inhibits C more strongly, so C can decrease.",
        hints: ["Start with the effect of less A on B.", "Less A releases B from inhibition. More active B inhibits C more strongly, so C can decrease."],
      },
      {
        visual: "pathway-neural",
        catchup: "a6-synapse",
        kind: "choice",
        ...withStimulus(
          "Level 4. In a model inhibitory input hyperpolarises a neurone. The input decreases, but excitation remains weak.",
          "What can be concluded?",
        ),
        options: [
          "Threshold becomes more likely, but an action potential is not guaranteed",
          "An action potential must occur immediately",
          "Any action potential becomes larger",
        ],
        answer: 0,
        why: "Reduced hyperpolarisation can bring the membrane closer to threshold. Sufficient net excitation is still needed.",
        hints: ["Compare the change in inhibition with whether excitation can still reach threshold.", "Reduced hyperpolarisation can bring the membrane closer to threshold. Sufficient net excitation is still needed."],
      },
      {
        catchup: "a8-transfac",
        kind: "choice",
        ...withStimulus(
          "Level 4. A repressor is inhibited by a newly described molecule R. R increases. RNA polymerase and activators remain available.",
          "Predict transcription.",
        ),
        options: [
          "It can increase as repressor activity falls",
          "It must decrease because R is an inhibitor",
          "The DNA sequence changes",
        ],
        answer: 0,
        why: "R inhibits the repressor. Reduced repression permits increased transcription.",
        hints: ["Follow the effect of R on the repressor before deciding what happens to transcription.", "R inhibits the repressor. Reduced repression permits increased transcription."],
      },
      {
        catchup: "a1-enzfactors",
        kind: "choice",
        ...withStimulus(
          "Level 5. A signal both activates an enzyme and increases its inhibitor concentration. Magnitudes are unknown.",
          "Predict net rate.",
        ),
        options: [
          "The information is insufficient",
          "It must increase",
          "It must decrease",
        ],
        answer: 0,
        why: "Opposing influences occur together. Their relative effects are needed to predict the net rate.",
        hints: ["Decide whether the two effects push enzyme activity in the same direction.", "Opposing influences occur together. Their relative effects are needed to predict the net rate."],
      },
      {
        catchup: "a6-homeo",
        kind: "group",
        ...withStimulus(
          "A hypothetical homeostatic pathway uses hormone H to promote hormone J. J inhibits H release.",
          "Immediately after J rises, classify the direct change.",
        ),
        groups: ["Increases", "Decreases"],
        items: [
          ["Inhibition of H release", 0],
          ["Rate of H release", 1],
        ],
        why: "More J increases inhibitory feedback on H release. The later time course depends on secretion, clearance and other inputs.",
        hints: ["Find the direct effect of J on the release of H.", "The feedback acts on the release of H."],
      },
      {
        catchup: "a1-enzfactors",
        kind: "choice",
        ...withStimulus(
          "Investigators vary only the initial inhibitor concentration. All reactions start without product, and the product is stable. At 0, 2 and 4 µmol dm⁻³ inhibitor, the amounts of product after 30 s are 12, 8 and 4 nmol, respectively.",
          "What does this support?",
        ),
        options: [
          "Higher inhibitor concentrations led to less product being formed by 30 s under these conditions",
          "The rate of product formation was constant throughout the 30 s in each reaction",
          "Each further increase of 2 µmol dm⁻³ inhibitor would lower the amount formed by another 4 nmol",
        ],
        answer: 0,
        why: "The inhibitor concentration was the only variable changed. Each reaction started without product and the product was stable, so the endpoint measures how much formed by 30 s. One endpoint per reaction cannot show how its rate changed over time or what would happen at other concentrations.",
        feedback: [null, "One endpoint gives an amount formed over the whole interval. To assess how the rate changed, compare readings taken at several times.", "The three measurements establish a pattern within the tested range. Measurements at higher concentrations would be needed to establish whether it continues."],
        hints: ["What quantity was measured and at what time?", "Compare the product amounts at the tested concentrations only."],
      },
      {
        catchup: "a1-enzfactors",
        hints: ["Follow inhibitor concentration through amylase activity to starch remaining after one minute."],
        kind: "writing",
        prompt:
          "Explain why reducing a reversible inhibitor of amylase can leave less starch after one minute. State assumptions.",
        points: [
          "Inhibitor concentration decreases, reducing inhibition of amylase.",
          "The rate of starch hydrolysis increases.",
          "With equal initial starch and enzyme, suitable fixed pH and temperature, and before depletion, less starch remains after the fixed time.",
          "Irreversibly inhibited enzyme would not necessarily recover when free inhibitor falls.",
        ],
      },
    ],
    visual: "pathway",
    catchup: "a1-enzfactors",
    misconception:
      "Assuming every downstream quantity changes in the same direction, or that disinhibition guarantees output.",
    specification: "Transferable examination reasoning",
    schemaVersion: 1,
  },
  points: {
    id: "points",
    title: "Recognise distinct marking points",
    topics: ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8"],
    papers: ["p1", "p2", "p3"],
    principle:
      "Count distinct criteria in the supplied framework, rather than sentences.",
    model: [
      "For the drawing framework here, “continuous line”, “do not sketch”, “no overlapping outlines” and “no hanging lines” all address one category: line quality.",
      "“Continuous outlines, no shading, correct proportions, and a scale bar” addresses four categories when those four requirements are stated.",
      "A sentence can address several criteria. Several sentences can repeat one criterion. Scientific correctness alone does not show that a new point has been made.",
      "Use the question-specific framework beside each task. When improving an answer, replace repeated ideas with a missing mechanism, evidence or consequence.",
    ],
    tasks: [
      {
        catchup: null,
        kind: "number",
        prompt:
          "Guided. In the supplied drawing framework, how many categories do “continuous lines, no sketching, no overlapping outlines, no hanging lines” address?",
        answer: 1,
        why: "All four concern line quality.",
        hints: ["Group descriptions of the same drawing feature before counting.", "All four concern line quality."],
        guided: true,
        unit: "categories",
      },
      {
        catchup: null,
        kind: "number",
        ...withStimulus(
          "Continuous outlines, no shading, correct proportions and a scale bar.",
          "How many of these drawing categories are addressed?",
        ),
        answer: 4,
        why: "Line quality, shading, proportions, and scale are four separate categories in this framework.",
        hints: ["Assign each statement to a drawing criterion before counting.", "Line quality, shading, proportions, and scale are four separate categories in this framework."],
        unit: "categories",
      },
      {
        catchup: null,
        kind: "group",
        prompt: "Group each statement by the supplied criterion.",
        groups: [
          "Surface area",
          "Diffusion distance",
          "Concentration gradient",
        ],
        items: [
          ["Many lamellae provide more area", 0],
          ["Numerous filaments provide more area", 0],
          ["A thin epithelium shortens the path", 1],
          ["Blood flow removes absorbed oxygen", 2],
        ],
        why: "Two surface-area statements repeat one criterion. Thin walls and maintenance of a gradient are distinct.",
        hints: ["Ask whether a statement describes the outline, shading, scale or another feature.", "“More area” appears twice."],
      },
      {
        catchup: "a1-enzfactors",
        kind: "choice",
        ...withStimulus(
          "An enzyme-rate answer repeats “more collisions” twice. The framework credits collision frequency and active-site shape.",
          "Which replacement adds a distinct point?",
        ),
        options: [
          "Strong heat changes active-site shape and reduces substrate binding",
          "Particles hit each other more often",
          "There are a greater number of collisions",
        ],
        answer: 0,
        why: "The replacement adds the second criterion, active-site shape, instead of rephrasing collisions.",
        hints: ["Look for a change to the active site rather than another way of describing collisions.", "The replacement adds the second criterion, active-site shape, instead of rephrasing collisions."],
      },
      {
        catchup: "p3s-methods",
        kind: "choice",
        ...withStimulus(
          "Framework: control temperature, measure rate, and repeat.",
          "Which response covers more criteria?",
        ),
        options: [
          "Keep temperature fixed, measure product per minute, repeat trials",
          "Use a water bath, keep temperature constant, avoid temperature change",
          "Repeat several times, repeat again, do many repeats",
        ],
        answer: 0,
        why: "Controlling temperature, measuring a rate and repeating trials address three different requirements.",
        hints: ["Check control, rate and repeats separately.", "Controlling temperature, measuring a rate and repeating trials address three different requirements."],
      },
      {
        catchup: "p3s-methods",
        kind: "choice",
        ...withStimulus(
          "Framework: state the trend, quote data, and qualify uncertainty.",
          "Which response covers more criteria?",
        ),
        options: [
          "Rate increases from 3 to 7 units, but the small sample limits confidence",
          "Rate rises, increases, and goes up",
          "Rate is higher and greater and larger",
        ],
        answer: 0,
        why: "The response that gives a trend, a numerical comparison and a limitation addresses three distinct criteria.",
        hints: ["Find a trend, a quoted numerical comparison and a qualifier separately.", "The response that gives a trend, a numerical comparison and a limitation addresses three distinct criteria."],
      },
      {
        catchup: "p3s-methods",
        kind: "number",
        ...withStimulus(
          "New framework: numerical comparison, trend, limitation. Answer “A is 12 and B is 8, a difference of 4.”",
          "How many categories are addressed?",
        ),
        answer: 1,
        why: "These are numerical comparisons. The answer still lacks a trend across conditions and a limitation.",
        hints: ["Decide whether the sentence describes a trend, gives a numerical comparison or identifies a limitation.", "These are numerical comparisons. The answer still lacks a trend across conditions and a limitation."],
        unit: "categories",
      },
      {
        catchup: "p3s-methods",
        hints: ["Keep one statement about repeats. Identify the two criteria it leaves uncovered."],
        kind: "writing",
        ...withStimulus(
          "Framework: random-error reduction, control of temperature, and calibration.",
          "Improve “use many repeats, repeat again, do more repeats”.", { instructionFirst: true },
        ),
        points: [
          "Use independent repeats to reduce the effect of random measurement error on the mean.",
          "Control temperature so it does not confound the comparison.",
          "Calibrate the instrument against a suitable known standard.",
        ],
      },
    ],
    catchup: "p3s-methods",
    misconception:
      "Counting statements or sentences instead of distinct question-specific criteria.",
    specification: "Transferable examination reasoning",
    schemaVersion: 1,
  },
  mechanisms: {
    id: "mechanisms",
    title: "Explain biological mechanisms",
    topics: ["a1", "a2", "a3", "a5", "a6", "a8"],
    papers: ["p1", "p2", "p3"],
    principle:
      "Connect the observation to the specific mechanism and consequence requested.",
    model: [
      "Start by answering the question. Develop it with the mechanism that connects the evidence to that answer.",
      "“The wall is thin” describes structure. “A thin wall shortens the diffusion distance, increasing diffusion rate with other factors constant” explains significance.",
      "“Pressure rises” leaves a comparison unstated. “Ventricular pressure exceeds aortic pressure, opening the aortic valve” supplies the causal relationship.",
      "Use a concluding inference when it adds a consequence. A short answer can finish once it has explained the mechanism asked for.",
    ],
    tasks: [
      {
        catchup: "a2-diffusion",
        kind: "choice",
        prompt:
          "Guided. Why does a thinner exchange surface increase diffusion rate?",
        options: [
          "It shortens the diffusion distance",
          "It is thin",
          "It always creates a higher concentration gradient",
        ],
        answer: 0,
        why: "A shorter diffusion distance links the thin surface to a higher diffusion rate when other factors are constant.",
        hints: ["Ask how far a particle must travel across a thinner surface.", "A useful explanation names the change in the route between the two sides."],
        guided: true,
      },
      {
        catchup: "a2-active",
        kind: "choice",
        ...withStimulus(
          "A membrane transport protein is inhibited.",
          "Which explanation is complete if it normally carries ions against their gradient?",
        ),
        options: [
          "Active transport falls because fewer functional carriers can move ions against the gradient",
          "Ions stop being charged",
          "The membrane becomes completely impermeable to every molecule",
        ],
        answer: 0,
        why: "Name the process and the molecular component affected, without overextending to unrelated pathways.",
        hints: ["Identify the process that moves ions against their gradient.", "Name the process and the molecular component affected, without overextending to unrelated pathways."],
      },
      {
        catchup: "a6-glucose",
        kind: "choice",
        prompt: "Which explains insulin lowering blood glucose?",
        options: [
          "Insulin promotes glucose uptake and storage, reducing its concentration in the blood",
          "Insulin is released after a meal",
          "Insulin hydrolyses glucose in the bloodstream",
        ],
        answer: 0,
        why: "Release describes an event. Uptake and storage explain the consequence. Insulin is a hormone, not a glucose-hydrolysing enzyme.",
        hints: ["Ask where glucose can go when its concentration in the blood falls.", "Release describes an event. Uptake and storage explain the consequence. Insulin is a hormone, not a glucose-hydrolysing enzyme."],
      },
      {
        catchup: "a6-adh",
        kind: "choice",
        ...withStimulus(
          "A collecting duct has more aquaporins after ADH binding. The surrounding tissue fluid has a lower water potential than the fluid in the duct. This difference is the same at the start of a comparison with and without ADH.",
          "What explains a faster initial net movement of water out of the duct after ADH treatment?",
        ),
        options: [
          "Water permeability increases, allowing faster net osmosis out of the duct at the same water-potential difference",
          "ADH pumps water against its gradient",
          "Aquaporins make water hydrolyse ATP",
        ],
        answer: 0,
        why: "ADH increases the number of aquaporins and therefore water permeability. The same water-potential gradient can then drive faster net water movement by osmosis towards the surrounding tissue fluid.",
        hints: ["Relate the number of water channels to membrane permeability.", "The water-potential difference is already present. What changes is the ease with which water crosses the membrane."],
      },
      {
        catchup: "a6-synapse",
        hints: ["First state what acetylcholinesterase normally does in the synaptic cleft."],
        kind: "writing",
        prompt:
          "Explain how inhibition of acetylcholinesterase can prolong stimulation at a cholinergic synapse.",
        points: [
          "Acetylcholinesterase hydrolyses acetylcholine in the synaptic cleft.",
          "Inhibition reduces hydrolysis, so acetylcholine remains available longer.",
          "Acetylcholine can continue binding postsynaptic receptors, prolonging depolarising stimulation.",
        ],
      },
    ],
    catchup: "a6-synapse",
    misconception:
      "Restating an observation without explaining the causal link.",
    specification: "Transferable examination reasoning",
    schemaVersion: 1,
  },
};

window.ALevelTeachingFamilies.interpret = {
  id: "interpret",
  title: "Understand the question",
  topics: ["a1", "a2", "a3", "a6", "a8"],
  papers: ["p1", "p2", "p3"],
  specification: "AO2 and AO3 across Papers 1–3",
  schemaVersion: 2,
};

window.ALevelTeachingFamilies.practical = {
  id: "practical",
  title: "Reason through practicals",
  topics: ["a1", "a2", "a5", "p3s"],
  papers: ["p1", "p2", "p3"],
  principle: "Identify what the method measures. For each decision, link the method to its purpose, the mechanism and the limit on the claim. These tasks prepare for the written papers. The practical endorsement is assessed separately through practical work.",
  commandGuide: [
    ["Validity", "Does the method and design address the intended question? A confound can prevent attributing the outcome to the tested variable."],
    ["Accuracy and precision", "Accuracy is closeness to the true value. Precision concerns how close repeated measured values are to one another. Tight agreement can coexist with a systematic error."],
    ["Repeatability and reproducibility", "Repeatability concerns agreement when the same person uses the same method and equipment. Reproducibility concerns agreement under changed conditions, such as different operators or equipment."],
    ["Error and uncertainty", "Random error contributes to scatter. Systematic error biases measurements. Uncertainty quantifies the doubt about a measured value, often given as a ± value. Repetition can reduce the effect of random variation on a mean. Calibration against a reference can help detect measurement bias."],
  ],
  guideLabel: "Measurement and investigation terms",
  evidence: [
    "Illustrative beetroot readings at 10 minutes",
    ["Treatment", "Temperature (°C)", "Absorbance"],
    [["Water", "20", "0.12"], ["20% ethanol", "30", "0.38"]],
  ],
  evidenceHighlights: [[], [1], [1], [2]],
  model: [
    "The colorimeter measures absorbance after 10 minutes. Use the same wavelength and optical path length. A calibration for each solvent converts absorbance within its calibrated range into pigment concentration.",
    "Both the solvent and temperature change. A warmer treatment can itself affect pigment release, so the difference in the readings cannot be attributed to ethanol alone.",
    "Hold temperature, tissue dimensions, solution volume and exposure time constant. Rinse pigment from the cut surfaces before treatment and use matched solvent blanks to account for background absorbance.",
    "At equal solution volumes, a higher calibrated pigment concentration means more pigment is present in the solution at 10 minutes. To estimate an initial rate of pigment release, take several early readings and use the initial gradient of pigment amount against time.",
  ],
  tasks: [
    {
      kind: "choice", guided: true, catchup: "p3s-methods",
      ...withStimulus(
          "An enzyme forms a coloured product in reactions of equal volume. After blanking, absorbance increases with product concentration on the same calibration curve for every treatment.",
          "The investigation compares time taken to reach a fixed amount of product. Which method applies a consistent endpoint?",
        ),
      options: [
        "Use the same colorimeter setting and record when each reaction reaches the same absorbance within the calibrated range.",
        "Measure the absorbance of every tube after the same elapsed time and record those readings as the endpoint times.",
        "Repeat the colour judgement three times with the same observer and average the times.",
      ],
      answer: 0,
      why: "On the shared calibration curve, the same absorbance corresponds to the same product concentration. Equal volumes mean this is the same amount of product. Record each treatment’s time to reach that endpoint.",
      feedback: [null, "This compares the amount present after a fixed interval. It does not return the time each treatment took to reach the specified amount.", "A mean can reduce the effect of random variation. It does not set an objective colour threshold or address consistent observer bias."],
      hints: ["Separate the quantity you hold fixed from the quantity you record."],
    },
    {
      kind: "choice", catchup: "a2-mitosis",
      ...withStimulus(
          "Two root-tip slides are used to compare the proportion of cells in mitosis. The observer chooses fields that contain many dark chromosome clusters.",
          "What change best addresses the bias?",
        ),
      options: [
        "Choose non-overlapping fields at random from the same defined region on both slides before checking for mitoses.",
        "Count every cell twice in the selected fields and take the mean of the two estimates.",
        "Choose the same number of fields on each slide, keeping the visible-cluster rule.",
      ],
      answer: 0,
      why: "Choosing fields for visible mitoses favours the outcome being measured. Comparable regions and an outcome-independent sampling rule address this source of bias.",
      feedback: [null, "Recounting checks counting consistency. It cannot undo the biased choice of fields.", "Equal field counts balance sample size. Both sets of fields are still selected for having the outcome of interest."],
      hints: ["Ask which decision has already biased the sample before any cells are counted."],
    },
    {
      kind: "choice", catchup: "a5-chromat",
      ...withStimulus(
          "An unknown pigment and a reference pigment travel the same fraction of the distance to the solvent front on one chromatogram.",
          "Suggest the best next comparison to investigate whether they are the same compound.",
        ),
      options: [
        "Run both pigments on the same chromatogram with a different solvent and compare their Rf values again.",
        "Measure both distances from the top edge of the paper and compare the absolute distances.",
        "Repeat the readings on this chromatogram and conclude identity if the repeat measurements agree.",
      ],
      answer: 0,
      why: "Different pigments can have the same Rf value in one solvent. Using a different solvent can separate pigments whose spots travelled together in the first one. If the Rf values still match, there is more evidence for identity, but the pigments could still be different.",
      feedback: [null, "Measure from the baseline relative to the solvent front. Changing the reference point does not add independent evidence about the compounds.", "Taking more readings of this chromatogram can improve precision. It cannot reveal whether two substances travelled the same relative distance."],
      hints: ["Could different pigments have the same Rf value in one solvent?"],
    },
    {
      kind: "writing", catchup: "p3s-methods",
      ...withStimulus(
          "Two identical respirometers contain equal masses of the same species of seed and enough absorbent to remove all the carbon dioxide produced. The germinating seeds are at 25 °C and the dormant seeds at 15 °C. After each apparatus equilibrates at its own temperature, the indicator moves faster with the germinating seeds.",
          "Explain the key limitation of the comparison and justify one change.",
        ),
      points: [
        "Germination state and temperature differ. Temperature can affect enzyme-controlled respiration and hence oxygen uptake.",
        "With carbon dioxide absorbed and measurement conditions stable, the indicator movement is used to estimate oxygen uptake. The difference cannot be assigned to germination alone.",
        "Hold both groups at the same controlled temperature and allow them and the apparatus to equilibrate before recording. This removes temperature as a competing explanation.",
      ],
    },
  ],
  misconception: "Naming a technique, repeating trials or equalising sample sizes without addressing the actual source of bias.",
  specification: "7.2–7.4, PS 1.1–2.4, RP1, RP2, RP4, RP7, RP9 and RP11",
  schemaVersion: 1,
};

window.ALevelTeachingFamilies.precision = {
  id: "precision",
  title: "Explain precisely",
  topics: ["a1", "a2", "a3", "a4", "a6", "a8"],
  papers: ["p1", "p2", "p3"],
  principle: "Decide what the biology means, name the relevant entity or process, then connect it to the context. Different wording can convey the same scientific relationship.",
  model: [
    "Sodium ion channels open in a sensory neurone. Initially the inside is negative relative to the outside, and the sodium ion concentration is higher outside. Explain why opening the channels makes the membrane potential less negative.",
    "‘Sodium enters and stimulates the cell’ leaves the particle and the change imprecise. The particles moving are sodium ions, Na⁺. Their inward movement makes the inside less negative relative to the outside.",
    "‘Sodium ions diffuse into the neurone through the open channels’ and ‘Na⁺ moves passively into the neurone through the channels, down its electrochemical gradient’ express the same transport mechanism here.",
    "Carry the explanation to the target: inward movement of positive charge depolarises the membrane. Depolarisation alone does not establish that the threshold for an action potential is reached.",
  ],
  tasks: [
    {
      kind: "choice", guided: true, catchup: "a2-osmosis",
      ...withStimulus(
          "The water potential inside a plant cell is −600 kPa. Outside it is −200 kPa.",
          "Which answer accurately explains why the cell gains water?",
        ),
      options: [
        "The net movement of water by osmosis across the partially permeable membrane is from −200 kPa outside to −600 kPa inside.",
        "The net movement of water by osmosis across the partially permeable membrane is from −600 kPa inside to −200 kPa outside.",
        "Solute diffuses out down its water-potential gradient, and that movement of solute is osmosis.",
      ],
      answer: 0,
      why: "Osmosis refers to net water movement from higher to lower water potential across a partially permeable membrane. −200 is higher than −600.",
      feedback: [null, "The mechanism is osmosis, but −600 kPa is the lower value. The net movement is towards the more negative water potential.", "Water potential predicts the direction of net water movement. A movement of solute is not itself osmosis."],
      hints: ["Compare the two signed values using their positions on a number line."],
    },
    {
      kind: "choice", catchup: "a2-mitosis",
      ...withStimulus(
          "A diploid cell has completed DNA replication. One maternal chromosome and its paternal counterpart both carry a locus for the same gene.",
          "Which description preserves the distinction between the chromosome copies and the partners?",
        ),
      options: [
        "Each chromosome has two sister chromatids. The maternal and paternal chromosomes are homologues.",
        "The maternal and paternal chromosomes are sister chromatids. Each chromosome contains two homologues.",
        "The maternal and paternal chromosomes are homologues only if the alleles at that locus are identical.",
      ],
      answer: 0,
      why: "Sister chromatids are the replicated copies of one chromosome. Homologues carry corresponding loci and can carry different alleles.",
      feedback: [null, "Replication produces the two sister chromatids of each chromosome. The maternal and paternal partners were homologues before replication.", "Homologues carry the same genes at corresponding loci. Their alleles need not be identical."],
      hints: ["Which term describes two copies produced from a single chromosome?"],
    },
    {
      kind: "choice", catchup: "a4-translation",
      ...withStimulus(
          "A substitution changes an mRNA codon to one specifying a different amino acid.",
          "Which wording accurately describes how the change can affect the polypeptide?",
        ),
      options: [
        "During translation, the changed codon corresponds to a different amino acid, which is delivered by an appropriate tRNA and incorporated.",
        "During transcription, the changed codon causes RNA polymerase to add a different amino acid to the polypeptide.",
        "During translation, the ribosome uses the changed codon to make a new amino acid from nucleotides.",
      ],
      answer: 0,
      why: "The codon specifies an amino acid. A charged tRNA supplies it at translation. The nucleotide sequence does not make the amino acid.",
      feedback: [null, "RNA polymerase makes RNA from nucleotides. Adding an amino acid to a polypeptide occurs during translation at a ribosome.", "The ribosome links amino acids supplied by tRNAs. It does not turn the codon's nucleotides into an amino acid."],
      hints: ["Separate what carries the information from what carries the amino acid."],
    },
    {
      kind: "writing", catchup: "a3-heart",
      ...withStimulus(
          "A learner writes, ‘The ventricle contracts so the valve opens.’",
          "Using the left side of the heart, rewrite this to explain why the aortic valve stays shut briefly after ventricular contraction begins and then opens.",
        ),
      points: [
        "The pressure in the left ventricle is initially below the pressure in the aorta, so the aortic valve stays shut.",
        "Contraction raises the pressure in the left ventricle.",
        "The aortic valve opens when the pressure in the left ventricle rises above the pressure in the aorta.",
      ],
    },
  ],
  misconception: "Using a related term or generic event in place of the specified entity and causal link.",
  specification: "3.2.2, 3.2.3, 3.3.4.1, 3.4.2 and 3.6.2",
  schemaVersion: 1,
};

window.ALevelTeachingFamilies.evidence = {
  id: "evidence",
  title: "Interpret data",
  topics: ["a2", "a5", "a6", "a7", "p3e"],
  papers: ["p1", "p2", "p3"],
  principle: "Identify the quantity required, select a method, calculate with the appropriate units, and state what the result means in this investigation.",
  evidence: [
    "Illustrative respirometer readings",
    ["Time (min)", "Estimated cumulative O₂ uptake (µL)"],
    [["0", "0"], ["2", "8"], ["4", "14"], ["6", "14"]],
  ],
  model: [
    "Compare the mean rates of oxygen uptake between minutes 2 and 4 and between minutes 4 and 6. The readings are cumulative volumes.",
    "Divide the change in volume by the elapsed time. From 2 to 4 minutes the mean rate is (14 − 8) ÷ (4 − 2) = 3 µL min⁻¹. Dividing 14 by 4 would give the mean rate from the start to minute 4.",
    "From 4 to 6 minutes the mean rate estimated from the readings is (14 − 14) ÷ (6 − 4) = 0 µL min⁻¹. This is lower than the earlier estimate. The readings show no measurable increase in that interval. Any uptake below the measurement resolution could be missed, and the readings do not identify a cause for the plateau.",
    "A numerical change may be biologically small or large. To make a statistical claim, consider sampling variation and the test used. A significant association does not itself establish a cause.",
  ],
  tasks: [
    {
      kind: "choice", guided: true, catchup: "a6-glucal",
      ...withStimulus(
          "The glucose calibration is linear from 0 to 8 mmol dm⁻³. A sample measured under the same conditions as the standards has an absorbance of 0.46. The nearest standards read 0.38 at 4 mmol dm⁻³ and 0.54 at 6 mmol dm⁻³.",
          "Which method gives the appropriate estimate?",
        ),
      options: [
        "Interpolate between the two standards. The sample absorbance is halfway between their readings, so estimate 5 mmol dm⁻³.",
        "Use the midpoint of the full concentration range and estimate 4 mmol dm⁻³.",
        "Scale the concentration of the 6 mmol dm⁻³ standard by 0.46 ÷ 0.54 and estimate 5.1 mmol dm⁻³.",
      ],
      answer: 0,
      why: "For a linear calibration, the fractional change in absorbance corresponds to the same fractional change in concentration within that interval.",
      feedback: [null, "The full range tells you where the method is calibrated. Locate the sample between the standards that bracket its absorbance.", "Scaling from a single standard assumes the line passes through the origin. The two standards give different absorbance-to-concentration ratios, so use both to interpolate."],
      hints: ["How far is 0.46 from each neighbouring absorbance?"],
    },
    {
      kind: "number", unit: "%", answer: 25, catchup: "a2-osmosis",
      ...withStimulus(
          "A tissue sample has a mass of 1.60 g before immersion and 1.20 g afterwards.",
          "What percentage of its starting mass was lost?",
        ),
      why: "The loss is 0.40 g. Divide by the starting mass of 1.60 g and multiply by 100 to obtain 25%. The question asks for the magnitude of the loss.",
      numberFeedback: { "33.3": "The final mass is the wrong denominator. The question asks how large the loss is relative to the starting mass.", "0.25": "0.25 is the proportion. Express it as a percentage.", "-25": "−25% is the signed percentage change. Enter the magnitude because the question asks how much was lost.", "75": "That is the percentage of the starting mass left. The question asks for the fraction that was lost." },
      hints: ["Find the mass lost before choosing the reference mass."],
    },
    {
      kind: "choice",
      ...withStimulus(
          "A randomised experiment compares mean leaf growth between two treatments. The null hypothesis is that the treatments produce the same mean leaf growth. The investigators set a 5% significance level before collecting data. An appropriate test gives P = 0.18.",
          "Which statement is supported?",
        ),
      options: [
        "The difference is not statistically significant at the 5% level. The results are insufficient to conclude that mean leaf growth differs between treatments.",
        "There is an 18% probability that the null hypothesis is true, so an effect is more likely than no effect.",
        "The treatments have identical effects because the test does not reach the threshold.",
      ],
      answer: 0,
      why: "P = 0.18 is greater than 0.05, so the test does not reject the null hypothesis. A real difference may still be consistent with the data. The estimated difference and a confidence interval would help show which effect sizes are plausible.",
      feedback: [null, "If the null hypothesis and test assumptions hold, P is the probability of a test result at least as extreme as the one observed. The calculation assumes the null hypothesis and gives no probability that it is true.", "Failure to detect a difference at the chosen significance level does not establish that the treatment means are equal. The size of the plausible difference depends on the evidence and its uncertainty."],
      hints: ["Compare P with the chosen significance level, then consider what that comparison can establish."],
    },
    {
      kind: "writing", catchup: "p3s-methods",
      ...withStimulus(
          "Researchers used the same method to sample mayfly larvae at river sites upstream and downstream of towns. At each site they also measured water temperature and dissolved oxygen.",
          "Use the data to evaluate the claim that higher temperature alone accounts for the lower mean number of larvae per sample at downstream sites.",
        ),
      evidence: [
        "Illustrative means from six sites in each group",
        ["Sites", "Temperature (°C)", "Dissolved oxygen (mg L⁻¹)", "Mayfly larvae per sample"],
        [["Upstream", "14", "9.8", "21"], ["Downstream", "19", "7.2", "8"]],
      ],
      points: [
        "The downstream group was 5 °C warmer on average and had a mean of 8 larvae per sample compared with 21 upstream. These group means describe an association.",
        "Mean dissolved oxygen was also lower downstream (7.2 compared with 9.8 mg L⁻¹). Lower oxygen could affect larval survival, and the oxygen difference could result from temperature or from other site conditions.",
        "The survey cannot isolate a direct effect of temperature. An experiment that varies temperature while keeping dissolved oxygen and other conditions constant could test whether temperature affects larvae independently of oxygen.",
      ],
    },
  ],
  misconception: "Dividing by the wrong reference, reading a cumulative volume as a rate, or treating a numerical or statistical difference as a causal explanation.",
  specification: "Section 6, especially MS 0.1, 0.3, 1.9–1.11 and 3.1–3.6, and PS 2.3–2.4",
  schemaVersion: 1,
};

window.ALevelTeachingFamilies.extended = {
  id: "extended",
  title: "Develop extended answers",
  topics: ["a3", "a5", "a6", "a7", "a8", "p3w"],
  papers: ["p1", "p2", "p3"],
  principle: "Select the concepts that explain the outcome in the title or question. Make each causal link explicit and use separate details only when they explain something new.",
  model: [
    "A runner's cardiac output rises but oxygen delivery to the working muscles plateaus. The arterial oxygen content falls and the fraction of cardiac output reaching the working muscles is unchanged. Explain why the two observations can coexist.",
    "The target is oxygen delivery per unit time. Muscle blood flow increases with cardiac output at the stated fraction. A second quantity matters: the oxygen carried in each unit volume of arterial blood.",
    "If muscle flow rises from 2.0 to 2.5 L min⁻¹ and arterial oxygen content falls from 200 to 160 mL L⁻¹, delivery remains 400 mL min⁻¹. More blood reaches muscle per minute while each litre delivers less oxygen.",
    "Review relevance. Explaining how oxygen is used in aerobic respiration would describe what happens after delivery. It does not explain why delivery plateaued. Repeating that blood moves faster adds no new causal step.",
  ],
  tasks: [
    {
      kind: "choice", guided: true,
      ...withStimulus(
          "An essay title asks why gradients matter for cell function. A pupil develops an accurate paragraph on pumping hydrogen ions across the inner mitochondrial membrane.",
          "Which ending makes that paragraph most relevant?",
        ),
      options: [
        "Link hydrogen ion flow through ATP synthase to ATP production and explain why that ATP matters for a named cellular process.",
        "Add the locations of glycolysis, the link reaction and the Krebs cycle to show breadth.",
        "Explain how hydrogen ions are pumped again, using 'protons' in place of 'hydrogen ions'.",
      ],
      answer: 0,
      why: "The title asks why the gradient matters. Hydrogen ion flow provides the missing link between the gradient and ATP production, and the use of ATP establishes importance.",
      feedback: [null, "Those locations can be accurate but do not explain the importance of the gradient in this example.", "Hydrogen ion and proton convey equivalent information here. Rephrasing the same step does not extend the causal chain."],
      hints: ["What does the gradient enable the cell to do?"],
    },
    {
      kind: "writing",
      ...withStimulus(
          "A plant grown in dry soil closes its stomata. Light intensity is stable. Over several hours its net carbon dioxide uptake falls and root growth later slows.",
          ["Explain one chain connecting the stomatal change to root growth.","State one reason the available evidence cannot isolate this effect."],
        ),
      points: [
        "Stomatal closure restricts diffusion of carbon dioxide into the leaf, reducing the supply for carbon fixation.",
        "Reduced fixation can reduce the production of carbohydrates and the supply of assimilate carried in phloem to the roots.",
        "Roots may have less substrate for respiration and less carbon for building biomass, reducing growth.",
        "The observations are consistent with this chain. Dry soil can also affect root growth directly, for example by reducing cell turgor. The evidence does not separate the two effects.",
      ],
    },
  ],
  misconception: "Adding accurate but irrelevant breadth or restating a single explanation as if it were two.",
  specification: "AO2 and AO3, 3.3.2, 3.3.4, 3.5.1–3.5.2 and Paper 3 extended responses",
  schemaVersion: 1,
};

})();

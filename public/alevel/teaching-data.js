/* Original teaching families. Each task states the conditions needed for its predictions. */
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
        prompt:
          "Guided practice. A cell is at −700 kPa and the surrounding solution at −300 kPa. Predict net movement.",
        options: ["Into the cell", "Out of the cell", "No net movement"],
        answer: 0,
        why: "−300 kPa is higher than −700 kPa. Water enters across the partially permeable membrane.",
        hints: ["Which of the two values is closer to zero?", "The solution has the higher water potential."],
        guided: true,
      },
      {
        kind: "number",
        prompt:
          "A calibration line crosses 0% change at −500 kPa. Estimate the tissue water potential in kPa.",
        answer: -500,
        why: "The intercept estimates the tissue water potential. Include the negative sign.",
        hints: ["Start at 0% mass change. Which axis gives the tissue estimate?", "Read the intercept on the horizontal axis, including its sign."],
        unit: "kPa",
      },
      {
        kind: "choice",
        prompt: "A cell and solution are both at −450 kPa. What occurs?",
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
      "Recall that oxygen diffuses from higher to lower concentration. Compare neighbouring water and blood at the same point, not their two entry values.",
      "Follow the arrows. At the highlighted position, compare the water with the blood immediately next to it.",
      "Now compare every pair. Blood enters on the right at 30 units and leaves on the left at 90. The gradient stays in the same direction along the exchange surface.",
      "In parallel flow the fluids move in the same direction. Compare the last pair. These figures are idealised oxygen concentrations.",
    ],
    tasks: [
      {
        kind: "choice",
        prompt:
          "Guided practice. At one position, water is 60 units and blood is 50 units. Which way does oxygen diffuse?",
        options: ["Water to blood", "Blood to water", "Neither"],
        answer: 0,
        why: "Compare the adjacent values. Water has the higher oxygen concentration.",
        hints: ["Compare water and blood at the same position.", "Compare the adjacent values. Water has the higher oxygen concentration."],
        guided: true,
      },
      {
        kind: "choice",
        prompt:
          "An unfamiliar membrane exchanger carries a dissolved nutrient. Both fluids flow oppositely and the donor concentration exceeds the receiver concentration at every position. What follows?",
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
        prompt: "Explain why reversing blood flow can improve oxygen uptake.",
        points: [
          "Opposite flow brings blood alongside water with a higher oxygen concentration at each position.",
          "This maintains a diffusion gradient along the lamella.",
          "Oxygen can diffuse into blood over the full exchange length.",
        ],
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
        prompt:
          "Guided practice. Reduced NADP becomes scarce while ATP remains available. Which stage is directly restricted?",
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
        prompt: "ATP production stops. Which conclusion is justified?",
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
        prompt:
          "Two heterozygous parents have linked loci. Can you immediately apply 9:3:3:1?",
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
      "Recessive phenotype frequency is q², while q is an allele frequency.",
    model: [
      "Assume a two-allele locus with complete dominance and a population in Hardy–Weinberg equilibrium. If 9% show the recessive phenotype, q² = 0.09.",
      "Take the square root: q = 0.3. This is the frequency of the recessive allele, not the recessive genotype.",
      "Use p + q = 1, so p = 0.7. Heterozygotes have frequency 2pq = 2 × 0.7 × 0.3 = 0.42, or 42%.",
      "Check the genotype sum: p² + 2pq + q² = 0.49 + 0.42 + 0.09 = 1. Multiply a genotype frequency by population size only if a number of individuals is requested.",
    ],
    tasks: [
      {
        kind: "number",
        prompt:
          "Guided practice. 16% show the recessive phenotype under the stated assumptions. Find q.",
        answer: 0.4,
        why: "q² = 0.16, so q = √0.16 = 0.4.",
        hints: ["Identify the recessive phenotype frequency before taking a square root.", "q² = 0.16, so q = √0.16 = 0.4."],
        guided: true,
        unit: "frequency",
      },
      {
        kind: "number",
        prompt:
          "In a different equilibrium population 4% have the recessive phenotype. Find the heterozygote frequency.",
        answer: 0.32,
        why: "q² = 0.04, q = 0.2, p = 0.8, and 2pq = 0.32.",
        hints: ["Find q and p separately before multiplying the two frequencies.", "q² = 0.04, q = 0.2, p = 0.8, and 2pq = 0.32."],
        unit: "frequency",
      },
      {
        kind: "number",
        prompt:
          "In an equilibrium population of 500, q² = 0.25. How many heterozygotes are expected?",
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
        prompt:
          "Guided practice. Promoter methylation increases at a gene where it reduces access. Predict transcription.",
        options: [
          "It decreases",
          "It must increase",
          "The gene changes base sequence",
        ],
        answer: 0,
        why: "The supplied mechanism reduces access to the promoter.",
        hints: ["Check what the question says about access to this promoter.", "The supplied mechanism reduces access to the promoter."],
        guided: true,
      },
      {
        catchup: "a8-epigen",
        kind: "choice",
        prompt:
          "Histones become acetylated but a necessary activator is absent. Is increased transcription guaranteed?",
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
        prompt:
          "An activator normally increases RNA polymerase binding at a promoter. Activator activity falls, with other requirements unchanged. Predict the effect.",
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
        prompt: "A repressor is degraded. Explain why transcription can rise.",
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
      "Ventricular contraction raises ventricular pressure. When left ventricular pressure exceeds left atrial pressure, the mitral valve closes.",
      "Initially both valves are closed. Myocardial force raises pressure during approximately isovolumetric contraction. Ventricular volume has not yet fallen appreciably.",
      "When ventricular pressure exceeds aortic pressure, the aortic valve opens. Ejection then reduces ventricular volume.",
      "During relaxation, ventricular pressure falls below aortic pressure. The aortic valve closes.",
      "As the ventricle continues to relax, ventricular pressure falls below atrial pressure. The mitral valve opens and filling begins.",
    ],
    tasks: [
      {
        kind: "choice",
        prompt:
          "Guided practice. Pressures are atrium 8, ventricle 20, aorta 80 mmHg. Which valves are closed?",
        options: ["Both mitral and aortic", "Only mitral", "Only aortic"],
        answer: 0,
        why: "20 > 8 closes the mitral valve. 20 < 80 keeps the aortic valve closed.",
        hints: ["Compare ventricular pressure with atrial pressure first.", "Now compare the same ventricular pressure with the aorta."],
        guided: true,
      },
      {
        kind: "choice",
        prompt:
          "Atrium 8, ventricle 110, aorta 90 mmHg. What permits ejection?",
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
        prompt:
          "During relaxation the atrial, ventricular and aortic pressures are 9, 4 and 75 mmHg. What happens?",
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
        prompt:
          "“The ventricle contracts, so the mitral valve closes.” What reasoning is missing?",
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
        prompt:
          "On the graph, ventricular pressure falls through aortic pressure at D. Which event follows?",
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
        prompt:
          "Level 1 · Guided. A reversible inhibitor concentration falls. Other conditions stay suitable. Predict enzyme rate.",
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
        prompt:
          "Level 2. A protease is reversibly inhibited. Inhibitor falls, with equal starting protein and fixed time before depletion. What remains?",
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
        prompt:
          "An enzyme was irreversibly inactivated. Free inhibitor is washed away, and no new enzyme is supplied. What can be inferred?",
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
        prompt:
          "A reaction has already used all its substrate. Reversible inhibitor concentration then falls. What happens to product formation without added substrate?",
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
        prompt:
          "Level 3 · Complete the chain when A increases. A inhibits B, and B inhibits C.",
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
        prompt:
          "A inhibits B and B inhibits C. A falls. Other conditions are suitable. Predict C.",
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
        prompt:
          "Level 4. In a model inhibitory input hyperpolarises a neurone. The input decreases, but excitation remains weak. What can be concluded?",
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
        prompt:
          "Level 4. A repressor is inhibited by a newly described molecule R. R increases. RNA polymerase and activators remain available. Predict transcription.",
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
        prompt:
          "Level 5. A signal both activates an enzyme and increases its inhibitor concentration. Magnitudes are unknown. Predict net rate.",
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
        prompt:
          "A hypothetical homeostatic pathway uses hormone H to promote hormone J. J inhibits H release. Immediately after J rises, classify the direct change.",
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
        prompt:
          "Experimental data. At 0, 2 and 4 µmol dm⁻³ reversible inhibitor, product after 30 s is 12, 8 and 4 units. What does this support?",
        options: [
          "Higher inhibitor reduced product formation under these conditions",
          "Inhibitor permanently destroyed every enzyme",
          "Product must always decline linearly at all doses",
        ],
        answer: 0,
        why: "The data support reduced formation within the tested range. They establish neither irreversibility nor behaviour at untested doses.",
        hints: ["Compare the measured product amounts within the stated concentration range.", "The data support reduced formation within the tested range. They establish neither irreversibility nor behaviour at untested doses."],
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
        prompt:
          "Continuous outlines, no shading, correct proportions and a scale bar. How many of these drawing categories are addressed?",
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
        prompt:
          "An enzyme-rate answer repeats “more collisions” twice. The framework credits collision frequency and active-site shape. Which replacement adds a distinct point?",
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
        prompt:
          "Framework: control temperature, measure rate, and repeat. Which response covers more criteria?",
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
        prompt:
          "Framework: state the trend, quote data, and qualify uncertainty. Which response covers more criteria?",
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
        prompt:
          "New framework: numerical comparison, trend, limitation. Answer “A is 12 and B is 8, a difference of 4.” How many categories are addressed?",
        answer: 1,
        why: "These are numerical comparisons. The answer still lacks a trend across conditions and a limitation.",
        hints: ["Decide whether the sentence describes a trend, gives a numerical comparison or identifies a limitation.", "These are numerical comparisons. The answer still lacks a trend across conditions and a limitation."],
        unit: "categories",
      },
      {
        catchup: "p3s-methods",
        hints: ["Keep one statement about repeats. Identify the two criteria it leaves uncovered."],
        kind: "writing",
        prompt:
          "Improve “use many repeats, repeat again, do more repeats”. Framework: random-error reduction, control of temperature, and calibration.",
        points: [
          "Use repeats to reduce random error in the mean.",
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
        prompt:
          "A membrane transport protein is inhibited. Which explanation is complete if it normally carries ions against their gradient?",
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
        prompt:
          "A collecting duct has more aquaporins after ADH binding. Which explanation links mechanism to water movement?",
        options: [
          "Water permeability increases, allowing more osmosis down the water-potential gradient",
          "ADH pumps water against its gradient",
          "Aquaporins make water hydrolyse ATP",
        ],
        answer: 0,
        why: "ADH changes permeability through aquaporin insertion. Water moves by osmosis down an existing water-potential gradient.",
        hints: ["Relate the number of water channels to membrane permeability.", "ADH changes permeability through aquaporin insertion. Water moves by osmosis down an existing water-potential gradient."],
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

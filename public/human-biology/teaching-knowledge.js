/* General knowledge for NEA units. Examples are unrelated to OCR assignments. */
(function () {
  const { choice, written } = window.KeystoneHumanTeaching;

  window.KeystoneHumanLessons["f172/a1"] = {
    revision: 1,
    goal: "Relate chromosomes, genes and alleles to the outcomes of mitosis and meiosis.",
    activate: ["Where is most DNA found in a human cell?", "In the nucleus, organised into chromosomes. A small amount is also in mitochondria."],
    explain: ["A gene is a region of DNA with a functional product. Alleles are versions of a gene. Homologous chromosomes carry the same genes in corresponding positions and can carry different alleles."],
    table: {caption: "Trace a homologous chromosome pair. Each letter represents one chromatid.", head: ["Stage", "Chromosome carrying R", "Homologue carrying r"], rows: [
      ["Before replication", "R", "r"], ["After replication", "R and R joined", "r and r joined"],
      ["After meiosis I", "Joined R sisters in one cell", "Joined r sisters in the other cell"],
      ["After meiosis II", "An R chromatid in each of two cells", "An r chromatid in each of two cells"]
    ]},
    focusCells: [["0:0", "0:1", "1:0", "1:1"], ["2:0", "2:1", "3:0", "3:1"], ["1:0", "1:1"]],
    model: [
      "Track one homologous pair. The two chromosomes carry the same gene, but one carries R and the other r. DNA replication copies each chromosome into a joined pair of sister chromatids.",
      "In meiosis I the homologues move apart, taking their joined sisters with them. In meiosis II the sisters separate. This simplified example tracks a locus unaffected by crossing over.",
      "In mitosis the two homologues do not pair up and separate as a pair. The sisters of each replicated chromosome separate so each daughter nucleus receives both R and r chromosomes."
    ],
    guided: choice("In the model, one cell receives the chromosome carrying R at the end of meiosis I. What is it made of?", 1,
      [["One R chromatid.", "Sister chromatids are still joined immediately after meiosis I."], ["Two joined R sister chromatids.", ""], ["An R chromatid joined to an r chromatid.", "The r was on the homologue that moved to the other cell."]],
      "Meiosis I separates homologous chromosomes. The sister chromatids still share one centromere.", ["Which pair separates in this division?"]),
    apply: choice("A starting cell has one homologue carrying E and one carrying e. An imaging sequence shows sister chromatids separating and each of two daughter nuclei receives both E and e. Which division fits?", 0,
      [["Mitosis.", ""], ["Meiosis I.", "Meiosis I separates the E and e homologues before their sisters separate."], ["Meiosis II after normal meiosis I.", "The E and e homologues would already be in separate cells."]],
      "Receiving both homologues while their sisters separate produces daughter nuclei with the original chromosome number, as in mitosis.")
  };

  window.KeystoneHumanLessons["f172/a2"] = {
    revision: 1,
    goal: "Build a Punnett square and use the right denominator when information excludes an outcome.",
    activate: ["What does heterozygous mean?", "Having different alleles of a gene, such as Rr."],
    prior: ["f172/a1", "Review genes and alleles"],
    explain: ["Genotype names the alleles. Phenotype is an observable characteristic. For this fictional single-gene trait, one R allele gives the dominant phenotype. A carrier with Rr can pass on the recessive r allele."],
    table: {caption: "Cross between Rr and Rr", head: ["One parent's gametes", "Other parent's R", "Other parent's r"], rows: [["R", "RR", "Rr"], ["r", "Rr", "rr"]]},
    model: ["Put the possible gametes from each parent on the outside of the square. Each carries either R or r.", "Combine alleles. The four equally likely boxes give RR, Rr, Rr and rr.", "If you know an offspring shows the dominant phenotype, remove rr. Two of the three remaining outcomes are Rr, so the conditional carrier probability is 2/3."],
    skills: ["genetics"],
    guided: choice("Use the worked cross. An offspring shows the dominant phenotype. What is the probability that it has two R alleles?", 1,
      [["1/4", "The known dominant phenotype rules out rr. Recount the remaining boxes."], ["1/3", ""], ["1/2", "RR and Rr are two possible genotypes, but they do not have equal numbers of boxes."]],
      "Among three equally likely non-rr boxes, exactly one is RR.", ["Cross out the box that is incompatible with the known phenotype."]),
    apply: choice("A fictional recessive trait appears only in tt. In a cross between Tt and tt, an offspring does not show the recessive trait. What is the probability it carries t?", 2,
      [["1/2", "Half the boxes would be Tt before you know the phenotype. Re-evaluate using only compatible outcomes."], ["2/3", "That ratio can occur with two heterozygous parents. Here the tt parent contributes t every time."], ["1", ""]],
      "Every offspring receives t from the tt parent. Without the recessive phenotype the offspring must also have received T, so the genotype is Tt.", ["List the possible contributions from the tt parent before considering the phenotype."]),
    followup: choice("In another fictional trait, MM and Mm are purple and mm is white. For Mm × Mm, what fraction of purple offspring have genotype Mm?", 1,
      [["1/2", "That uses all four boxes. White offspring have been excluded."], ["2/3", ""], ["3/4", "That is the fraction of all offspring predicted to be purple."]],
      "Two boxes show Mm out of the three boxes compatible with purple.")
  };

  window.KeystoneHumanLessons["f172/a3"] = {
    goal: "Explain what one genetic test result establishes and identify its limits.",
    explain: ["Some tests look for selected variants. Others survey larger regions. A result may identify a variant without establishing what effect it will have."],
    model: ["A fictional test looks only for variant A. The test does not detect variant A in the sample.", "That result only addresses variant A within the limits of the assay. Variant B outside the test's scope could still be present."],
    guided: choice("A result reports a variant of uncertain significance. What is a defensible interpretation?", 1,
      [["It confirms the condition.", "The evidence has not established that the variant causes the trait."], ["A variant was detected, and its clinical significance remains uncertain.", ""], ["The variant must be absent.", "Uncertainty concerns its effect, not whether it was detected."]],
      "Detection and interpretation are separate steps."),
    apply: written("Explain why relatives may still receive different results on a test for a recessive allele.",
      ["Relatives can inherit different combinations of parental alleles.", "A test reports the tested person's result for the variants covered."],
      "Relatives share some inherited DNA but can receive different alleles. Each genetic test concerns the sample and variants it covers.")
  };

  window.KeystoneHumanLessons["f172/a4"] = {
    goal: "Trace how a change in gene expression could affect the function of a target tissue.",
    explain: ["Gene therapy aims to alter gene activity in target cells. Some approaches supply a functional copy. Others change expression or edit DNA. Delivery and the proportion of target cells reached affect the outcome."],
    model: ["In a fictional disorder, target cells make too little of a functional protein.", "If treated target cells receive and express a functional copy, they may make more of that protein.", "Improvement depends on whether enough relevant cells make sufficient protein. Somatic treatment affects treated cells rather than routinely altering inheritance."],
    guided: choice("The new copy reaches a cell but is not expressed. What is missing?", 0,
      [["Production of the functional gene product.", ""], ["Delivery of the copy.", "The scenario already says delivery succeeded."], ["Inheritance by the next generation.", "The target in this example is a somatic cell."]],
      "Delivery must be followed by suitable expression for this treatment mechanism."),
    apply: written("Why might a treatment that improves function in one group of target cells still leave symptoms?",
      ["Other relevant cells may not have been reached.", "The amount or duration of expression may be insufficient."],
      "Partial delivery or limited expression can leave too little functional product to fully restore tissue function.")
  };

  window.KeystoneHumanLessons["f173/a2"] = {
    revision: 1,
    visual: "model",
    visualFrom: ["f170", "1.1.2"],
    goal: "Choose the appropriate imaging method and use scale evidence to interpret a micrograph.",
    activate: ["Is a larger image always more informative?", "Magnification increases image size. Resolution determines which nearby structures can be distinguished."],
    prior: ["f170/1.1.2", "Work through a real red-cell scale bar"],
    explain: ["Light microscopy can show many whole cells or living material. Transmission electron microscopy (TEM) shows detail within thin prepared sections. Scanning electron microscopy (SEM) shows surface topography."],
    nodes: ["Choose the view", "Check what is resolved", "Read the scale bar"],
    model: ["To compare projections on the outside of a prepared cell, choose a view of the surface. SEM provides that view. TEM would be more useful for closely spaced membranes inside a thin section.",
      "Inspect the red-cell image. A light micrograph can show outlines of cells where they are distinct. Enlarging its print would not reveal unresolved internal detail.",
      "Compare a cell width with the white bar on the same image. The marked width is less than half of the bar labelled 20 µm, so the cell is less than 10 µm wide. The label is the actual length represented by the bar."],
    skills: ["magnification", "units"],
    guided: choice("Which image is best suited to distinguish closely spaced internal membranes?", 2,
      [["A larger copy of a blurred light image.", "Enlargement does not recover detail."], ["An SEM view of the cell exterior.", "This question needs internal detail."], ["A thin TEM section.", ""]],
      "TEM can resolve internal detail in thin sections.", ["Decide whether the feature is external or internal."]),
    apply: choice("A new image resolves a small vesicle inside a thin tissue section. Its width is 16 pixels and a 500 nm scale bar spans 40 pixels. Which image type and actual width best fit?", 1,
      [["SEM and 200 nm.", "The scale calculation works, but a thin section showing internal detail fits TEM."], ["TEM and 200 nm.", ""], ["TEM and 1,250 nm.", "This reverses the ratio. The vesicle is shorter than the bar, so its actual width must be less than 500 nm."]],
      "TEM suits fine detail inside a thin section. The vesicle spans 16 ÷ 40 of the bar, giving 0.40 × 500 nm = 200 nm.", ["Choose based on the view, then compare the two pixel lengths."])
  };

  window.KeystoneHumanLessons["f173/a3"] = {
    goal: "Use reference evidence to interpret biochemical tests and a chromatogram.",
    explain: ["A positive control shows that a method can detect a known substance. A negative control shows the expected result without it. In chromatography, compare spots with standards run under the same conditions."],
    table: {caption: "Fictional chromatogram measurements", head: ["Lane", "Distance from baseline"], rows: [["Standard X", "2 cm"], ["Standard Y", "4 cm"], ["Unknown: first spot", "2 cm"], ["Unknown: second spot", "5 cm"], ["Solvent front", "10 cm"]]},
    model: ["Measure from the same baseline. Divide the spot distance by the solvent-front distance: 2 ÷ 10 = 0.20 for X.", "One unknown spot also gives 0.20, which is consistent with X under these conditions. Other substances may share an Rf, so this alone cannot establish identity.", "The second spot has Rf 0.50 and does not match either supplied reference in this run."],
    skills: ["variables", "uncertainty"],
    guided: choice("Benedict's reagent remains blue in the unknown and in a known reducing-sugar sample after heating. What can be concluded?", 2,
      [["The unknown definitely contains no reducing sugar.", "The positive control failed, so this run cannot support that conclusion."], ["The unknown definitely contains reducing sugar.", "The expected positive colour was not produced."], ["The positive control failed and the unknown is inconclusive.", ""]],
      "A known positive needs to produce its expected result before the negative result is interpretable.", ["What should a valid positive control do?"]),
    apply: choice("A different chromatogram gives a spot at 3 cm and a solvent front at 8 cm. What is the spot's Rf?", 0,
      [["0.375", ""], ["2.67", "Divide the spot distance by the solvent-front distance."], ["5 cm", "Rf is a ratio of distances and has no unit."]],
      "Rf = 3 ÷ 8 = 0.375.")
  };

  window.KeystoneHumanLessons["f174/a1"] = {
    goal: "Explain why energy intake alone gives limited information about nutritional adequacy.",
    explain: ["Carbohydrate and fats supply energy. Protein supplies amino acids for synthesis, and can also contribute energy. Vitamins and minerals are needed for particular physiological functions. Fibre and water also have roles."],
    model: ["Two fictional meals supply similar energy.", "Only one provides a substantial iron source. Iron supports haemoglobin production. Their energy totals cannot establish that they contribute equally to iron intake."],
    guided: choice("Which comparison would help to evaluate protein intake across typical diets?", 1,
      [["Compare energy alone.", "Many different nutrient mixes can give the same energy."], ["Compare protein quantity and amino acid supply.", ""], ["Compare volume of food alone.", "Volume does not reveal nutrient composition."]],
      "Use a measurement relevant to the nutrient and consider the pattern of intake."),
    apply: written("Explain why low iron intake over time can affect oxygen delivery even when energy intake is sufficient.",
      ["Iron is needed for haemoglobin.", "Iron deficiency can reduce haemoglobin and the oxygen-carrying capacity of blood."],
      "Adequate energy intake does not guarantee adequate iron. With less haemoglobin, blood may carry less oxygen to tissues.")
  };

  window.KeystoneHumanLessons["f174/a3"] = {
    revision: 1,
    goal: "Follow a carbohydrate from digestion to absorption and metabolic use.",
    activate: ["What does an enzyme change?", "It increases the rate of a reaction. Digestive enzymes break larger molecules into smaller products."],
    prior: ["f170/3.1.1", "Review blood glucose feedback"],
    explain: ["Digestion breaks food molecules down. Absorption moves molecules from the gut into the body. Metabolism is the network of chemical reactions in cells, including respiration and synthesis."],
    table: {caption: "Trace glucose from dietary starch", head: ["Where", "What changes", "What this enables"], rows: [
      ["Gut lumen and intestinal surface", "Starch is digested to glucose", "Glucose becomes available for absorption"],
      ["Small-intestine epithelium", "Glucose crosses the lining", "Glucose enters the blood"],
      ["Target tissues", "Insulin signals after blood glucose rises", "Some tissues increase uptake or store glucose as glycogen"]
    ]},
    focusCells: [["0:0", "0:1"], ["1:0", "1:1"], ["2:0", "2:1"]],
    nodes: ["Digest", "Absorb", "Use or store"],
    model: [
      "Amylase breaks starch into smaller carbohydrates. Other enzymes finish the process and release glucose. Less starch digestion can mean less glucose is available at the intestinal surface.",
      "Glucose moves across the epithelium into the blood. An absorptive defect can reduce this movement even when digestion has produced the usual amount of glucose.",
      "When blood glucose rises, insulin signals target tissues. Skeletal muscle increases uptake and can store glucose as glycogen. The liver can also increase glycogen storage. Cells can use glucose in respiration."
    ],
    guided: choice("Digestive enzymes act normally, but the absorptive surface is reduced. Which change is most direct?", 0,
      [["Less glucose can pass from the intestine into the body per unit time.", ""], ["Amylase necessarily stops hydrolysing starch.", "Digestion and absorption are separate steps."], ["All cells stop metabolising glucose immediately.", "The direct change is at the intestinal surface."]],
      "The products can still be made. Less surface can reduce their uptake.", ["Identify which step the change affects."]),
    apply: written("In a fictional model, less starch is digested, but absorption of glucose works normally. Explain why less starch-derived glucose may enter the blood and why glucose already present in the food can still be absorbed.",
      ["Reduced digestion releases less glucose from the starch.", "With less glucose available at the intestine, less starch-derived glucose can cross into blood.", "Glucose already in the gut can be absorbed directly because the absorptive mechanism still works."],
      "The bottleneck is making glucose from starch. Less is available to cross the intestinal lining. Glucose already present in the food can still cross without being digested.", ["Identify where the two sources of glucose first join the pathway."])
  };

  window.KeystoneHumanLessons["f174/a4"] = {
    goal: "Interpret nutritional measurements in context.",
    explain: ["BMI relates mass to height. It gives no direct measurement of body composition, nutrient intake or fitness. A change in mass can reflect fluid as well as body tissue."],
    model: ["Two fictional adults have the same BMI and very different muscle mass.", "BMI alone cannot tell us who has more body fat. Choose measurements matched to the question and consider context."],
    skills: ["graph", "averages"],
    guided: choice("Body mass falls after sweating. Which explanation needs checking before attributing the fall to fat loss?", 2,
      [["Bone length increases immediately.", "This is not a likely cause of the short-term change."], ["Nutrient composition has been directly measured.", "A weighing scale gives mass."], ["Fluid has been lost.", ""]],
      "A short-term change can result from fluid loss."),
    apply: choice("Which evidence would best investigate whether a fictional diet supplies enough iron?", 1,
      [["BMI alone.", "BMI does not quantify nutrient intake."], ["Information about the amounts and iron content of foods eaten over time.", ""], ["One reading of height.", "This does not measure dietary iron."]],
      "Use evidence about intake over time for a question about intake.")
  };
})();

(function () {
  const { choice, written } = window.KeystoneHumanTeaching;
  Object.assign(window.KeystoneHumanLessons, {
    "f175/a1": {
      revision: 1,
      goal: "Trace the routes of the gametes and explain how an interruption can change what happens next.",
      activate: ["Where do sperm and oocytes develop?", "Sperm are produced in seminiferous tubules in the testes and mature in the epididymis. An oocyte develops inside an ovarian follicle."],
      prior: ["f170/3.3.1", "Compare reproductive anatomy and tissue images"],
      explain: [
        "Sperm travel from the epididymis along the vas deferens. Secretions from accessory glands contribute to semen, which leaves through the urethra.",
        "The oviduct (Fallopian tube) opens near the ovary. Fimbriae help receive the released oocyte, then cilia and muscular contractions help move it along the oviduct."
      ],
      simulation: true,
      modelTitle: "Follow the two routes and the later implantation",
      nodes: ["FSH supports follicle growth", "LH surge triggers ovulation", "Gametes can meet", "Implantation comes later"],
      model: [
        "Locate the growing follicle. FSH supports its development, so growth is visible while the oocyte is still inside.",
        "Look for what moves when LH acts. The follicle stays in the ovary and forms the corpus luteum. The released secondary oocyte crosses the gap towards the opening of the oviduct.",
        "Compare the two routes. Both can reach the ampulla of an oviduct. If the gametes are in different oviducts, they cannot fuse at that time.",
        "Follow the embryo only on the fertilisation branch. Cleavage starts during transport. The blastocyst may implant several days later in the endometrium, the lining of the uterus."
      ],
      guided: choice("The sperm and oocyte are in different oviducts in the model. Which condition for this fertilisation is missing?", 1,
        [["Sperm must enter the ovary.", "Sperm usually meet the oocyte in the oviduct."], ["A viable sperm and a viable oocyte must meet in the same place.", ""], ["Implantation must happen first.", "Implantation occurs after fertilisation and early development."]],
        "In this model, the gametes must meet in the same oviduct.", ["Compare where each gamete is shown."]),
      apply: written("In a fictional model, viable gametes fuse and an embryo reaches the uterus, but the uterine lining is unsuitable for attachment. Explain which events can already have happened and which event is affected.",
        ["Fertilisation has occurred, forming a zygote in the oviduct.", "Cleavage and development into a blastocyst can occur before attachment.", "The unsuitable endometrium can prevent implantation despite fertilisation and early development."],
        "Gamete fusion forms a zygote. Cleavage and development can proceed before the blastocyst contacts the endometrium. Successful implantation depends on suitable conditions in the lining, so the earlier events alone do not establish that it implants.", ["Consider where each event occurs and whether it depends on the uterine lining."]),
      followup: choice("Which event follows a normal LH surge most directly?", 2,
        [["Attachment of a blastocyst.", "Several stages precede implantation."], ["Sperm entry into the cervix.", "This route is separate from the ovarian response to LH."], ["Release of a secondary oocyte from a follicle.", ""]],
        "The LH surge triggers ovulation.")
    },
    "f175/a2": {
      goal: "Explain how placental structure supports exchange between maternal and fetal circulations.",
      explain: ["Chorionic villi contain fetal vessels and are bathed by maternal blood. The circulations remain largely separate. A large area and short diffusion distances help exchange."],
      nodes: ["Maternal blood", "Placental barrier", "Fetal circulation"],
      model: ["Oxygen reaches the spaces around the villi in maternal blood.", "Oxygen moves down its gradient across the placental barrier.", "Fetal capillaries take up oxygen and fetal blood carries it away. Carbon dioxide moves in the opposite direction."],
      guided: choice("Which change would directly reduce exchange area?", 0,
        [["Fewer villi in contact with maternal blood.", ""], ["A faster fetal pulse alone.", "Pulse changes flow, rather than surface area itself."], ["Mixing of the two circulations is stopped.", "Exchange usually occurs across a barrier between the circulations."]],
        "Villi increase the area across which substances can move."),
      apply: written("Explain why a thicker placental barrier could reduce oxygen transfer.",
        ["The diffusion distance increases.", "At otherwise comparable conditions, the oxygen transfer rate can fall."],
        "Oxygen must diffuse further to reach a fetal capillary. A longer distance reduces diffusion rate if other factors stay similar.")
    },
    "f175/a3": {
      goal: "Link general causes of reduced fertility to the affected biological step.",
      explain: ["Fertility can be affected by gamete production, ovulation, transport or conditions affecting fertilisation and implantation. A finding at one step may have several explanations."],
      model: ["In a fictional example both oviducts are obstructed.", "An oocyte and sperm may still be produced. The obstruction can reduce their chance of meeting in an oviduct."],
      guided: choice("Which step is most directly affected if ovulation does not occur?", 1,
        [["Sperm maturation in the epididymis.", "This is separate from ovarian function."], ["Release of a secondary oocyte.", ""], ["Attachment of an already developed blastocyst.", "First identify the missing upstream event."]],
        "Ovulation is the release of the secondary oocyte."),
      apply: written("Explain why reduced sperm motility may reduce the chance of fertilisation.",
        ["Motility contributes to travel through the reproductive tract.", "Fewer sperm may reach and successfully interact with the oocyte."],
        "Lower sperm motility can reduce the probability that viable sperm reach the oocyte and fertilisation occurs.")
    },
    "f175/a4": {
      goal: "Distinguish IVF and ICSI by the biological step each method addresses.",
      explain: ["In vitro fertilisation (IVF) involves fertilisation outside the body and later embryo transfer. Intracytoplasmic sperm injection (ICSI) is a particular fertilisation method within an IVF cycle in which one sperm is injected into an oocyte."],
      model: ["When fertilisation is attempted outside the body, the usual journey through the oviduct is bypassed.", "Transfer places an embryo in the uterus. Implantation is still a later process, and its occurrence is uncertain."],
      guided: choice("Which action distinguishes ICSI from conventional insemination of oocytes in IVF?", 2,
        [["Transferring an embryo.", "Both may involve a later transfer."], ["Preserving an embryo for later use.", "Storage does not distinguish how fertilisation was attempted."], ["Injecting an individual sperm into an oocyte.", ""]],
        "ICSI changes the method used for fertilisation during an IVF cycle."),
      apply: choice("An embryo has been transferred after IVF. Which statement is justified?", 1,
        [["The pregnancy has necessarily started.", "Transfer does not establish that implantation occurred."], ["The embryo has been placed in the uterus and may implant.", ""], ["Fertilisation now normally occurs in the uterine lining.", "Fertilisation has already been attempted outside the body."]],
        "Embryo transfer and implantation describe different events.")
    },
    "f176/a1": {
      goal: "Trace a sensory-to-motor route and distinguish central and peripheral structures.",
      prior: ["f170/3.2.1", "Follow the illustrated spinal reflex"],
      explain: ["The CNS consists of the brain and spinal cord. Peripheral nerves connect these with receptors and effectors. The cerebrum supports conscious processing, the cerebellum coordinates movement, and the medulla helps control involuntary functions."],
      model: ["A receptor signals through sensory neurones towards the CNS.", "The CNS integrates the input. Motor neurones carry instructions back to muscles."],
      guided: choice("Which region is most directly associated with coordinating and refining a voluntary movement?", 1,
        [["A peripheral sensory nerve.", "The nerve transmits input. The question asks about central coordination."], ["Cerebellum.", ""], ["An endocrine gland.", "The task is central coordination of movement."]],
        "The cerebellum integrates feedback to help coordinate movement."),
      apply: choice("Which route carries a signal from a toe receptor towards the spinal cord?", 2,
        [["A motor pathway.", "Motor output travels towards an effector."], ["An endocrine pathway.", "The signal is carried by neurones."], ["A sensory pathway in the peripheral nervous system.", ""]],
        "Sensory neurones carry information from a receptor towards the CNS.")
    },
    "f176/a2": {
      revision: 1,
      visual: "model",
      visualFrom: ["a6", "synapse"],
      goal: "Follow electrical and chemical signalling and distinguish excitation from reduced inhibition.",
      activate: ["What is threshold?", "The membrane potential that must be reached to trigger an action potential at the usual site of initiation."],
      explain: ["Voltage-gated sodium channels open during depolarisation and sodium enters. Potassium leaving contributes to repolarisation. At a chemical synapse, neurotransmitters carry the signal to receptors on the next cell."],
      table: {caption: "Two ways to bring a receiving neurone closer to threshold. Fictional readings at the trigger zone.", head: ["Change", "Excitatory input", "Inhibitory input", "Membrane potential"], rows: [
        ["Starting point", "Usual", "Usual", "−65 mV"], ["More excitation", "Increases", "Unchanged", "−58 mV"],
        ["Less inhibition", "Unchanged", "Decreases", "−58 mV"], ["Threshold in this example", "—", "—", "−55 mV"]
      ]},
      focusCells: [[], [], [], [], ["0:2"], ["1:0", "2:1", "1:2", "2:2", "3:2"]],
      nodes: ["Action potential arrives", "Calcium enters", "Vesicles fuse", "Neurotransmitter binds", "Postsynaptic effect", "Compare changes in input"],
      model: [
        "Depolarisation reaches the presynaptic terminal.",
        "Voltage-gated calcium channels open and calcium ions enter.",
        "Calcium promotes vesicle fusion. Neurotransmitter is released into the synaptic cleft.",
        "The transmitter diffuses across and binds specific postsynaptic receptors.",
        "Depending on the receptors, the effect makes firing more or less likely. The receiving cell integrates that input with others. Its starting potential in this example is −65 mV.",
        "More excitation or less inhibition can each bring the trigger zone closer to threshold. With reduced inhibition the excitatory input has stayed the same. In both examples −58 mV is below the threshold of −55 mV, so the neurone has not fired."
      ],
      guided: choice("A change reduces calcium entry at an excitatory terminal. Predict the immediate effect.", 0,
        [["Less vesicle fusion and less transmitter release.", ""], ["The postsynaptic cell must fire faster.", "There is less excitatory input from this terminal."], ["Faster diffusion of the transmitter across the cleft.", "The change acts before release."]],
        "Calcium entry helps trigger vesicle fusion.", ["Find the step immediately after calcium entry."]),
      apply: written("Neurone A inhibits relay neurone B. A separate excitatory signal also reaches B. A stops firing, but the excitatory signal is unchanged. Explain why B could become more likely to fire and why firing is uncertain.",
        ["When A stops firing, inhibitory input from A to B falls.", "The unchanged excitatory signal is less opposed. This is reduced inhibition.", "B fires only if its combined inputs bring its membrane potential to threshold."],
        "Trace the change through A to B. B loses an inhibitory input while keeping the same excitatory input. Whether B reaches threshold depends on the remaining inputs and their timing.", ["Compare what changes at the two synapses onto B."]),
      followup: choice("The cell receives very weak excitation and loses one inhibitory input. What can be predicted?", 1,
        [["It must fire immediately.", "The remaining net input may still be below threshold."], ["Firing may be more likely, and reaching threshold is uncertain.", ""], ["Less inhibition always makes an action potential less likely.", "Reduced inhibition tends to favour excitation, other factors being equal."]],
        "The firing decision depends on the combined inputs.")
    },
    "f176/a3": {
      goal: "Distinguish nociceptive signalling from the experience of pain.",
      explain: ["Nociceptors detect potentially damaging stimuli. Nociception is the neural encoding and processing of such stimuli. Pain is an experience shaped by processing, context and other influences."],
      model: ["A hot object activates nociceptors and signals travel into the CNS.", "A withdrawal reflex can occur while signals also travel to brain regions involved in the experience of pain."],
      guided: choice("A rapid withdrawal starts before someone can report pain. What is consistent with that observation?", 0,
        [["A spinal pathway can organise withdrawal before conscious report.", ""], ["The muscles detected pain without a neural pathway.", "The movement can be explained by sensory input and motor output."], ["The nociceptors cannot have acted.", "They can supply input to the reflex."]],
        "The spinal motor response and the later report are different outcomes of processing."),
      apply: written("Why do similar nociceptive inputs not guarantee identical pain experiences?",
        ["Nociceptive input is processed by the CNS.", "Other inputs and context can alter the experience."],
        "The experience reflects how the CNS processes the input alongside other influences, so two similar stimuli can be experienced differently.")
    },
    "f176/a4": {
      goal: "Connect a change in nervous tissue to a possible effect on function.",
      explain: ["Symptoms depend on which structures and pathways are affected. Similar symptoms can have several causes. Anatomical and functional evidence answer different questions."],
      model: ["A fictional scan shows an injury near a region involved in coordinating movement.", "A coordination difficulty is consistent with interruption of circuits involving that region. Other structures and underlying causes still need to be considered."],
      guided: choice("Why can a nervous-system injury affect a muscle that has no local tissue damage?", 0,
        [["An interrupted motor pathway can reduce activation of the muscle.", ""], ["All muscle fibres must have been destroyed.", "The affected structure can be upstream of the muscle."], ["The muscle can no longer have any sensory input anywhere.", "The conclusion is broader than the evidence."]],
        "Muscle contraction depends on motor signals reaching the effector in this pathway."),
      apply: written("Explain why a brain injury can affect both movement and sensation.",
        ["Different pathways carry motor output and sensory input.", "An injury can affect more than one pathway or a region that processes both."],
        "Damage can disrupt incoming sensory information and outgoing motor signals. The exact pattern depends on the structures involved.")
    },
    "f176/a5": {
      goal: "Choose an investigation based on the kind of evidence needed.",
      explain: ["Electroencephalography (EEG) records changes in electrical activity at the scalp. MRI produces anatomical images and can distinguish soft tissues. CT uses X-rays to reconstruct cross-sectional images."],
      model: ["To examine changes over milliseconds, look for a method that records activity over time.", "EEG can show patterns with high time resolution. A standard anatomical MRI gives structural detail instead."],
      guided: choice("Which technique uses ionising X-rays to form cross-sectional images?", 2,
        [["EEG.", "EEG records electrical activity at the scalp."], ["MRI.", "MRI uses magnetic fields and radiofrequency signals."], ["CT.", ""]],
        "CT reconstructs structural images from X-ray measurements."),
      apply: choice("Which method best addresses the timing of a brief change in scalp electrical activity?", 0,
        [["EEG.", ""], ["Structural MRI.", "This images anatomy rather than directly recording scalp voltage over milliseconds."], ["CT.", "This provides a structural image, not a scalp electrical recording."]],
        "Match the measurement to the question. EEG is sensitive to changes over short timescales.")
    },
    "f177/a1": {
      goal: "Distinguish receptor agonists from antagonists and predict their general effect on signalling.",
      explain: ["An agonist binds and activates a receptor. An antagonist binds and reduces activation by an agonist without activating the receptor itself."],
      model: ["A fictional receptor increases secretion when activated by a natural signal.", "A competitive antagonist occupies the binding site. At a given agonist concentration, fewer receptors may be activated and secretion may fall."],
      guided: choice("Which description fits an agonist?", 1,
        [["Blocks binding without activating the receptor.", "That describes a competitive antagonist."], ["Activates the receptor after binding.", ""], ["Never needs to interact with a target.", "The example concerns a receptor target."]],
        "An agonist produces receptor activation."),
      apply: written("A receptor suppresses secretion when activated. Explain how a competitive antagonist could increase secretion.",
        ["It reduces activation by the natural agonist.", "The normal suppression becomes weaker.", "Secretion can rise if other factors are comparable."],
        "Follow the sign of the receptor's usual response. Reduced activation means less inhibition of secretion.", ["Start with what the receptor normally does."])
    },
    "f177/a3": {
      goal: "Use the sample and follow-up to judge how widely a result can be applied.",
      explain: ["Participants may differ from the wider population in age, health or other treatments. Sample size and follow-up limit detection of uncommon or delayed effects."],
      model: ["A fictional one-month study includes adults under 40 with no other conditions.", "The measured effect applies most directly to similar adults during that month. The result gives limited direct evidence for older adults or longer use."],
      skills: ["evidence"],
      guided: choice("An uncommon side effect is not seen in 20 participants. What is a fair conclusion?", 2,
        [["The side effect is impossible.", "A rare event may not occur in a small sample."], ["Everyone would have the effect after a longer trial.", "The available measurements do not show that."], ["No cases were observed; the study has limited power to detect rare effects.", ""]],
        "State what was observed and the limitation of the sample."),
      apply: written("Why might a result from one young, healthy group need more evidence before it is applied to a wider population?",
        ["The sample may not represent older people or those with other health conditions.", "Benefits, responses and risks could differ in those groups."],
        "The trial can give evidence for the group studied. Further evidence is needed to judge whether the effect generalises to groups with different characteristics.")
    },
    "f177/a2": {
      revision: 1,
      goal: "Compare the evidence from an uncontrolled observation and a randomised controlled trial.",
      activate: ["What does a comparison group show?", "It helps estimate what might have happened under otherwise similar conditions without the intervention being studied."],
      explain: ["Preclinical investigation informs the decision to study a drug in humans. Randomisation allocates people to groups by chance. Blinding can reduce biases due to knowing the allocation. Comparison groups help estimate what might have happened otherwise."],
      table: {caption: "Fictional counts of improvement after one week", head: ["Study", "Medicine group", "Comparison group"], rows: [
        ["Uncontrolled observation", "8 of 12", "No comparison group"],
        ["Randomised trial", "15 of 24", "11 of 24"]
      ]},
      focusCells: [["0:0", "0:1"], ["1:0", "1:1"], ["1:0", "1:1"]],
      nodes: ["Uncontrolled observation", "Compare the groups", "Limit the conclusion"],
      model: [
        "Eight of twelve people improved after trying a fictional medicine. We cannot see how many would have improved anyway, so this alone does not identify the cause.",
        "In the trial, 15 of 24 people improve with the medicine and 11 of 24 in the comparison group. The comparison shows that people can improve without the medicine. Random allocation reduces systematic differences between groups at the start; a small trial can still have chance imbalances.",
        "The outcome assessor is blinded so knowledge of the group is less likely to influence the rating. The difference supports possible short-term benefit, but the small groups leave uncertainty. A week of follow-up tells us little about rare or delayed harms."
      ],
      skills: ["variables", "evidence"],
      guided: choice("An investigator rates improvement on a five-point scale. Which change most directly limits bias in that rating?", 2,
        [["Allocate participants by chance.", "Random allocation helps with starting differences. The assessor could still know the groups."], ["Measure more participants using the same rating process.", "A larger sample reduces some uncertainty, but the ratings could still be biased."], ["Keep the investigator unaware of each participant's group.", ""]],
        "Blinding the investigator reduces the chance that knowledge of the allocation influences the judgement.", ["Who makes the rating, and what information might affect it?"]),
      apply: written("In a new fictional trial, people are allocated at random. After two weeks an assessor records improvement in 16 of 25 people on a treatment and 12 of 25 in the comparison group. The assessor knew their groups. Explain what the results suggest and why blinding the assessor would help.",
        ["The observed improvement was 64% with treatment and 48% in the comparison group, or 4 more people out of 25.", "The difference is evidence about short-term improvement, with uncertainty in this small trial.", "Knowing the allocation may influence how the assessor judges improvement. Blinding reduces this risk, which random allocation alone does not address."],
        "More people were rated as improved in the treatment group. The small trial and potential rating bias limit how strongly the difference supports a treatment effect. Blinding would keep the assessor from knowing each participant's group.", ["Separate what random allocation changes at the start from what blinding changes during measurement."])
    }
  });
})();

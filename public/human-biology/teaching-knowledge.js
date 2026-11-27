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
    focusCells: [[], ["0:0", "0:1", "1:0", "1:1"], ["0:0", "0:1", "1:0"]],
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
    teachingDiagram: {src:"/human-biology/gene-delivery.svg", width:280, height:300, compact:true,
      alt:"A functional gene copy is delivered to a simplified target cell with a nucleus, followed by expression producing a functional protein. The diagram notes that some cells may not receive the copy.",
      caption:"Follow this example from delivery to protein production. Other gene therapies use different approaches; delivery does not ensure expression in every target cell."},
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
    revision: 1,
    goal: "Use reference evidence to interpret biochemical tests and a chromatogram.",
    explain: ["A positive control shows that a method can detect a known substance. A negative control shows the expected result without it. In chromatography, compare spots with standards run under the same conditions."],
    table: {caption: "Fictional chromatogram measurements", head: ["Lane", "Distance from baseline"], rows: [["Standard X", "2 cm"], ["Standard Y", "4 cm"], ["Unknown: first spot", "2 cm"], ["Unknown: second spot", "5 cm"], ["Solvent front", "10 cm"]]},
    model: ["Measure from the same baseline. Divide the spot distance by the solvent-front distance: 2 ÷ 10 = 0.20 for X.", "One unknown spot also gives 0.20, which is consistent with X under these conditions. Other substances may share an Rf, so this alone cannot establish identity.", "The second spot has Rf 0.50 and does not match either supplied reference in this run."],
    skills: ["variables", "uncertainty"],
    guided: choice("Benedict's reagent remains blue in the unknown and in a known reducing-sugar sample after heating. What can be concluded?", 2,
      [["The unknown definitely contains no reducing sugar.", "The positive control failed, so this run cannot support that conclusion."], ["The unknown definitely contains reducing sugar.", "The expected positive colour was not produced."], ["The positive control failed and the unknown is inconclusive.", ""]],
      "A known positive needs to produce its expected result before the negative result is interpretable.", ["What should a valid positive control do?"]),
    apply: {...written("On this new chromatogram, positions were recorded from the bottom edge. Calculate the Rf of the unknown spot and explain what the run supports about its identity.",
      ["Measure from the baseline at 1 cm, so the spot travelled 3 cm and the solvent front travelled 6 cm.", "The unknown Rf is 3 ÷ 6 = 0.50. Its spot matches standard A under these conditions.", "The match is consistent with A. Different substances can have the same Rf, so this is not definitive identification."],
      "Subtract the baseline coordinate from each position before dividing. The unknown and A each have Rf 0.50 in the same run. A matching result is evidence consistent with A, rather than proof of identity.",
      ["Find the starting line before measuring travel."]),
      table: {caption: "Fictional dye chromatogram. Positions above the bottom edge.", head: ["Feature", "Position (cm)"], rows: [
        ["Baseline", "1.0"], ["Solvent front", "7.0"], ["Standard A spot", "4.0"], ["Standard B spot", "5.0"], ["Unknown spot", "4.0"]
      ]}}
  };

  window.KeystoneHumanLessons["f174/a1"] = {
    goal: "Explain why energy intake alone gives limited information about nutritional adequacy.",
    explain: ["Carbohydrate and fats supply energy. Protein supplies amino acids for synthesis, and can also contribute energy. Vitamins and minerals are needed for particular physiological functions. Fibre and water also have roles."],
    teachingDiagram: {src:"/human-biology/meals-energy-iron.svg", width:280, height:300, compact:true,
      alt:"Two fictional meals have equal-length bars for similar energy. Meal A contains a substantial iron source, whereas meal B does not. The comparison is qualitative and does not show measured values.",
      caption:"Compare the equal energy bars with the iron-source labels. Similar energy alone does not establish that meals contribute equally to iron intake."},
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
    revision: 1,
    goal: "Use dietary records, BMI and biomarkers to answer different questions about nutrition.",
    activate: ["What is a biomarker?", "A measurable feature of the body, such as the concentration of a substance in blood."],
    explain: ["BMI is mass in kilograms divided by height in metres squared. It gives no direct measurement of body composition or nutrient intake. A change in mass can reflect fluid as well as body tissue.",
      "Dietary records can estimate intake over time. A biomarker supplies evidence about physiological status. Absorption, use and measurement conditions can affect it independently of intake."],
    table: {caption: "Choose evidence for the question", head: ["Source", "What it helps answer", "One limit"], rows: [
      ["Food record", "How much of a nutrient was eaten?", "Omitted foods and portions can distort estimates"],
      ["BMI", "How does mass relate to height?", "Cannot separate muscle, fat and fluid"],
      ["Blood biomarker", "What was measured in the body?", "Timing, illness and other factors may affect it"]
    ]},
    focusCells: [["1:0","1:1"], ["0:0","2:0"], ["0:1","2:1"]],
    model: [
      "Two fictional adults have the same BMI and very different muscle mass. BMI describes their mass relative to height. It cannot partition mass into muscle and fat.",
      "One adult has a food record with a similar nutrient intake estimate to the other. If a blood marker differs, check that it measures the right feature and that sampling conditions are comparable.",
      "The record is evidence about what was eaten. The blood marker is evidence about physiology. Differences in absorption or use could help explain why these results do not always track each other."
    ],
    skills: ["graph", "averages"],
    guided: choice("Body mass falls after sweating. Which factor most directly explains why the fall alone is weak evidence of fat loss?", 2,
      [["The person may have eaten fewer calories over the month.", "Long-term intake could affect body mass. The immediate change has a more direct explanation."], ["The scale calculates body mass relative to height.", "A mass reading alone does not include height or body composition."], ["Loss of water contributes to the change in mass.", ""]],
      "A short-term change can result from fluid loss."),
    apply: written("In a fictional study, two groups have similar BMI and recorded vitamin intake. Blood measurements of a vitamin differ. Explain what each measurement contributes and suggest one reason for the difference that does not require the groups to have eaten different amounts.",
      ["Similar BMI means their mass-to-height relationship is similar.", "The record estimates intake. A blood test measures the vitamin at the sampling time.", "Different absorption, metabolism or sampling conditions could contribute even with similar intake."],
      "BMI is a separate measurement. Intake records and measurements in the body answer different questions. A difference in physiological status could arise after ingestion, or from how the measurements were taken.")
  };
})();

(function () {
  const { choice, written } = window.KeystoneHumanTeaching;
  Object.assign(window.KeystoneHumanLessons, {
    "f175/2.1": {
      revision: 1,
      goal: "Distinguish the purpose of the first antenatal appointment from tracking foetal development.",
      activate: ["What is a baseline?", "It is a starting observation against which later observations can be compared."],
      prior: ["f175/a2", "Review placental exchange and ultrasound"],
      explain: [
        "A first antenatal appointment helps a midwife establish a pregnancy and health history, discuss support needs and obtain starting measurements. The information helps the team decide what further assessment may be relevant.",
        "Later follow-up may track development or offer distinct screening and diagnostic assessments. A booking history and a later growth measure provide different evidence."
      ],
      table: {caption: "Purposes of antenatal evidence", head: ["Context", "What it contributes"], rows: [
        ["Booking history", "Context about health, previous pregnancies and support"],
        ["Initial blood pressure", "A measurement to interpret and compare at follow-up"],
        ["Later ultrasound measurements", "Evidence about growth when interpreted with gestational age and previous observations"]
      ]},
      focusCells: [["0:0"], ["1:0"], ["2:0"]],
      model: [
        "In a fictional record, the initial visit includes questions about previous pregnancies. The purpose is to understand the background and identify topics that may need follow-up.",
        "The record also has one blood-pressure reading. This supplies a starting measurement. A single entry alone does not describe a trend.",
        "Later scan measurements provide evidence about development. Compare them with gestational age and relevant previous findings rather than with the history alone."
      ],
      guided: choice("A record says blood pressure has increased since the first appointment. What makes this a monitoring claim?", 1,
        [["The first reading concerned the mother's health.", "The subject of a measurement does not establish change."], ["It compares readings over time.", ""], ["It used the same record as the booking history.", "Location in the record does not establish a trend."]],
        "Monitoring depends on comparable observations over time.", ["Look for what the later reading is being compared with."]),
      apply: written("Why can a fictional record of previous pregnancies help at booking while leaving the growth of the current foetus unknown? Name a different type of evidence for growth.",
        ["History supplies context for the assessment.", "History is not a measurement of this foetus.", "Ultrasound measurements interpreted with gestational age or previous measurements provide growth evidence."],
        "Separate background information from measurements of the current pregnancy. Ultrasound can provide direct size measurements that help assess development in context.")
    },
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
      goal: "Explain how placental structure supports exchange between maternal and foetal circulations.",
      // Orientation checked against OpenStax Anatomy and Physiology 2e, 28.2:
      // https://openstax.org/books/anatomy-and-physiology-2e/pages/28-2-embryonic-development
      explain: ["The placenta is attached to the wall of the uterus. The foetus is connected to the placenta by the umbilical cord, which carries foetal blood between them.", "Chorionic villi contain foetal vessels and are bathed by maternal blood. The circulations remain largely separate. A large area and short diffusion distances help exchange."],
      // Original schematics, checked against OCR F175 and OpenStax Anatomy and
      // Physiology 2e 28.2 (see docs/placenta-visual-followup.md). Figures 2
      // and 3 are deliberately enlarged and are not anatomically scaled.
      explainDiagrams: {
        0: [{src:"/human-biology/f175-placenta-orientation.svg", width:280, height:390, compact:true, assessmentSensitive:true,
          alt:"A simplified section through a pregnant female's body shows the placenta attached to the wall of the uterus. An umbilical cord connects the placenta to the foetus and carries foetal blood. A dashed box marks the placenta region enlarged in figure 2. Fine lines label the structures. The drawing is not to scale.",
          caption:"Locate the placenta on the uterus wall, then follow the umbilical cord to the foetus. The dashed box marks the area enlarged in figure 2. The drawing is not to scale."}],
        1: [{src:"/human-biology/f175-placenta-many-villi.svg", width:280, height:580, compact:true, assessmentSensitive:true,
          alt:"A section of the placenta selected in figure 1 is turned so the foetal side, towards the cord, is at the top and the uterine wall below. Several branching chorionic villi extend into maternal blood; only a few are shown. All remain attached to the foetal-side tissue. One also anchors to the uterine wall; the others project freely into maternal blood without attaching to the wall. Blue loops represent the main foetal vessels inside the villi. Fine lines with contrasting dots point to the maternal blood, a foetal vessel, a chorionic villus and the uterus wall. A dashed box marks the middle villus enlarged in figure 3. Maternal and foetal blood normally remain separate; the schematic is not to scale.",
          caption:"The selected section is turned so the foetal side is at the top. Fine lines and dots point to structures. Many villi extend into maternal blood; only a few are shown. All remain attached to the foetal-side tissue. Some also anchor to the wall; others project freely into the blood without attaching to the wall. Foetal vessels are inside the villi. The dashed box marks the villus enlarged in figure 3."},
          {src:"/human-biology/f175-placenta-villus.svg", width:280, height:434, compact:true, assessmentSensitive:true,
          alt:"An enlargement of the marked villus in figure 2 shows a chorionic villus attached to tissue on the foetal side, with a foetal capillary inside and maternal blood around it. A thick arrow shows net oxygen transfer from maternal blood across the placental barrier into foetal blood. A second thick arrow shows carbon dioxide moving the other way. Fine lines ending in dots label structures. The barrier is exaggerated and the drawing is not to scale.",
          caption:"Zoom in on the marked villus from figure 2. Follow the thick arrows for net gas transfer; fine lines and dots label structures. The barrier includes tissue between the villus surface and the foetal capillary, and is exaggerated here."}]
      },
      // Retained for a future, orientated redesign; not shown in Phase 1.
      deferredTeachingDiagram: {src:"/human-biology/placental-exchange.svg", width:280, height:310, compact:true,
        alt:"Schematic section of a chorionic villus. Maternal blood surrounds the villus, and a foetal capillary lies inside it. Oxygen moves from maternal blood across the placental barrier to foetal blood; carbon dioxide moves in the opposite direction. The circulations are separated by the barrier.",
        caption:"Follow oxygen across the placental barrier into a foetal capillary; carbon dioxide moves the other way. This schematic shows one villus, not its true scale."},
      nodes: ["Maternal blood", "Placental barrier", "Foetal circulation"],
      model: ["Oxygen reaches the spaces around the villi in maternal blood.", "Oxygen moves down its gradient across the placental barrier.", "Foetal capillaries take up oxygen and foetal blood carries it away. Carbon dioxide moves in the opposite direction."],
      guided: choice("Which change would directly reduce exchange area?", 0,
        [["Fewer villi in contact with maternal blood.", ""], ["A faster foetal pulse alone.", "Pulse changes flow, rather than surface area itself."], ["Mixing of the two circulations is stopped.", "Exchange usually occurs across a barrier between the circulations."]],
        "Villi increase the area across which substances can move."),
      apply: written("Explain why a thicker placental barrier could reduce oxygen transfer.",
        ["The diffusion distance increases.", "At otherwise comparable conditions, the oxygen transfer rate can fall."],
        "Oxygen must diffuse further to reach a foetal capillary. A longer distance reduces diffusion rate if other factors stay similar.")
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
      teachingDiagram: {src:"/human-biology/ivf-icsi.svg", width:280, height:300, compact:true,
        alt:"Comparison of fertilisation methods outside the body: conventional IVF brings sperm and an oocyte together, while ICSI injects one sperm into an oocyte. Both can be followed by embryo transfer, then implantation may occur later.",
        caption:"Compare how sperm reaches the oocyte. Transfer follows embryo development; implantation is a later event and is not guaranteed."},
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
      teachingDiagram: {src:"/human-biology/nociception-pathway.svg", width:280, height:300, compact:true,
        alt:"A potentially damaging stimulus activates a nociceptor. Sensory signalling travels to the spinal cord; pathways lead to a withdrawal response and to brain processing. Context also influences the experience of pain.",
        caption:"Follow the sensory signal to the spinal cord, then compare the pathway to a withdrawal response with signalling to the brain. Pain is an experience influenced by more than the incoming signal."},
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
      revision: 1,
      goal: "Choose an investigation based on the kind of evidence needed.",
      explain: ["Electroencephalography (EEG) records changes in electrical activity at the scalp. MRI produces anatomical images and can distinguish soft tissues. CT uses X-rays to reconstruct cross-sectional images."],
      table: {caption: "Readouts of nervous-system investigations", head: ["Method", "Main type of evidence"], rows: [
        ["EEG", "Changes in scalp electrical activity over time"], ["Structural MRI", "Detailed anatomy, particularly soft tissue"], ["CT", "X-ray-based cross-sections showing features such as skull structure"]
      ]},
      focusCells: [["0:0"], ["1:0","2:0"]],
      model: ["To examine changes over milliseconds, look for a method that records activity over time. EEG provides a time-varying signal.",
        "Structural MRI and CT address anatomy. For example, a question about the edge of a skull fracture calls for structural evidence rather than an electrical recording."],
      guided: choice("Which technique uses ionising X-rays to form cross-sectional images?", 2,
        [["EEG.", "EEG records electrical activity at the scalp."], ["MRI.", "MRI uses magnetic fields and radiofrequency signals."], ["CT.", ""]],
        "CT reconstructs structural images from X-ray measurements."),
      apply: written("A team investigating a fictional movement problem needs high-detail images of the soft tissue of the cerebellum. Explain which of EEG, CT and structural MRI best meets that aim and why the other methods answer it less directly.",
        ["Structural MRI gives detailed soft-tissue anatomy.", "EEG gives a signal over time rather than a structural brain image.", "CT can show anatomy, but structural MRI generally distinguishes soft tissues better for this purpose."],
        "The question concerns soft-tissue structure. MRI can show that detail. EEG measures electrical activity, and the X-ray-based CT comparison answers many structural questions with less soft-tissue contrast for this particular aim.")
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
      revision: 1,
      goal: "Distinguish what preclinical, clinical and post-market records can establish.",
      activate: ["What is a comparison group for?", "It supplies a reference for what might have happened without the intervention."],
      explain: [
        "Preclinical evidence comes from studies before testing in people. A biological effect in a model can justify further research. It does not establish benefit in patients.",
        "Clinical studies address safety and effectiveness in people under specified conditions. Later surveillance can flag suspected uncommon or delayed harms in broader use. Suspicion prompts investigation, which needs more evidence to establish causation."
      ],
      table: {caption: "Three types of evidence for a fictional medicine", head: ["Stage", "Evidence"], rows: [
        ["Preclinical", "A biological effect is measured in a model"], ["Clinical", "Participants are followed for one month"], ["After authorisation", "A suspected delayed effect is reported in routine use"]
      ]},
      focusCells: [["0:0"], ["1:0"], ["2:0"]],
      model: [
        "The model result shows biological activity under study conditions. It cannot show whether patients would improve.",
        "The trial gives direct evidence in the people studied during one month. Its size and duration still limit what it can say about uncommon or delayed effects.",
        "A report after wider use can raise a signal. Investigators check timing, other possible causes and the frequency in suitable comparison records before drawing a causal conclusion."
      ],
      skills: ["evidence"],
      guided: choice("An uncommon side effect is not seen in 20 participants. What is a fair conclusion?", 2,
        [["The side effect is impossible.", "A rare event may not occur in a small sample."], ["Everyone would have the effect after a longer trial.", "The available measurements do not show that."], ["No cases were observed; the study has limited power to detect rare effects.", ""]],
        "State what was observed and the limitation of the sample."),
      apply: written("Two fictional medicines have 18 and 9 suspected side-effect reports after authorisation. What can the raw counts establish, and what would you need before comparing how often the event occurs?",
        ["There are more reports for the first medicine in these records.", "The number exposed and period observed must be known for meaningful rates.", "Comparable populations and reporting processes matter. Reports alone do not prove causation."],
        "The report counts are a starting point for investigation. Differences in use, reporting or the people treated could affect them. Comparable denominators and follow-up would make the frequency comparison more informative.")
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
        "In the trial, 15 of 24 people improve with the medicine and 11 of 24 in the comparison group. The comparison shows that people can improve without the medicine. Random allocation reduces systematic differences between groups at the start. In a small trial, the groups can still start out different by chance.",
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

// Compact original diagrams for the named explanation and worked-example blocks.
(function () {
  const figures = {
    "f172/a1": {src:"/human-biology/meiosis.svg", alt:"One pair of homologous chromosomes carries alleles R and r. After DNA replication each homologue consists of two joined sister chromatids carrying the same allele.", caption:"Compare homologues carrying R and r, then follow replication to joined sisters. The table in the worked example follows their separation in meiosis.", compact:true},
    "f172/a2": {src:"/human-biology/punnett-cross.svg", alt:"Punnett square for Rr crossed with Rr. Both parents can produce R or r gametes. The four equally likely combinations are RR, Rr, Rr and rr.", caption:"Combine one gamete from each parent in each cell. In this fictional trait R is dominant; among the three dominant-phenotype cells, two are Rr.", compact:true},
    "f172/a3": {src:"/human-biology/genetic-test.svg", alt:"A schematic DNA region marks the sites of possible variants A and B. A test checks for variant A, while B is outside its scope. A is not detected; whether B is present remains unknown.", caption:"The dots mark possible variant sites, not results. The test checks for A; the result does not establish whether B is present.", compact:true},
    "f173/a3": {src:"/human-biology/chromatography.svg", alt:"Chromatography paper has a pencil baseline and solvent front. An arrow shows the solvent moving up the stationary paper. Standard X and one unknown spot travelled the same distance; standard Y and a second unknown spot travelled different distances.", caption:"Follow the solvent up the stationary paper, then compare the spots. A matching position in the same run is consistent with, but does not prove, identity.", compact:true},
    "f174/a3": {src:"/human-biology/digestion.svg", alt:"Starch is digested to glucose in the gut lumen. Glucose crosses the intestinal lining into blood and can reach tissues, where it may be used in respiration or stored.", caption:"Follow the glucose: digestion makes it available, absorption moves it into blood, and tissues use or store it.", compact:true},
    "f175/a3": {src:"/human-biology/oviduct-obstruction.svg", alt:"Simplified reproductive anatomy shows one ovary, an oviduct with an obstruction and the uterus. The lesson example specifies that both oviducts are obstructed.", caption:"Locate the block in the oviduct. In the example both tubes are obstructed, so the chance of sperm and oocyte meeting is reduced. One side is shown and the drawing is not to scale.", compact:true},
    "f176/a1": {src:"/human-biology/sensory-motor-route.svg", alt:"A receptor sends sensory signals along a peripheral route towards the brain and spinal cord. A motor route carries output from the central nervous system to a muscle effector.", caption:"Follow sensory input towards the central nervous system and motor output back to the muscle. PNS means peripheral nervous system.", compact:true},
    "f177/a2": {src:"/human-biology/trial-comparison.svg", alt:"Two groups of 24 participants are represented by 24 circles each. Fifteen treatment-group circles and eleven comparison-group circles are filled, representing people who improved after one week.", caption:"Compare the filled circles out of equal-sized groups. Some people improved in the comparison group too; this small fictional study still leaves uncertainty.", compact:true},
    "f177/a1": {src:"/human-biology/receptor.svg", alt:"An agonist binds and activates a receptor. A competitive antagonist occupies its binding site without activating it, reducing activation by the agonist.", caption:"Compare the effect after binding: the agonist activates the receptor; the competitive antagonist occupies the site without activating it.", compact:true}
  };
  window.KeystoneHumanLessons["f173/a2"].explanationPhoto = {
    src:"/assets/micrographs/hb-blood-cells-sem.webp", width:500, height:326,
    alt:"Colourised scanning electron micrograph showing a red blood cell at left, a platelet at centre and a white blood cell at right; their external surfaces are visible.",
    caption:"Notice the external surfaces: this scanning electron micrograph shows a red blood cell, platelet and white blood cell. Colour was added.",
    source:"https://commons.wikimedia.org/wiki/File:Red_White_Blood_cells.jpg",
    credit:"Electron Microscopy Facility, NCI-Frederick", licence:"Public domain (US government work)",
    licenceUrl:"https://commons.wikimedia.org/wiki/Template:PD-USGov", changes:"Converted to WebP; no crop"
  };
  window.KeystoneHumanLessons["f173/a2"].explanationPhoto2 = {
    src:"/assets/micrographs/hb-pancreas-tem.webp", width:640, height:480,
    alt:"Transmission electron micrograph of a thin section of mammalian pancreatic tissue. A large cell nucleus and closely spaced profiles of rough endoplasmic reticulum are visible. A scale bar of 500 nanometres is at the bottom.",
    caption:"Compare this thin section with the SEM surface above. Notice the internal membrane profiles. The original scale bar is 500 nm.",
    source:"https://commons.wikimedia.org/wiki/File:Mammalian_pancreatic_tissue,_nuclear_pores_and_rough_endoplasmic_reticulum.jpg",
    credit:"Louisa Howard, Dartmouth College", licence:"Public domain (author release)",
    licenceUrl:"https://commons.wikimedia.org/wiki/Template:PD-author", changes:"Converted to WebP; no crop"
  };
  window.KeystoneHumanLessons["f176/a2"].modelDiagrams = {5: {
    src:"/human-biology/threshold-comparison.svg", width:220, height:280, compact:true,
    alt:"Vertical potential axis from minus 70 to minus 50 millivolts. A starting point at minus 65 rises to a changed point at minus 58; both lie below the dashed threshold at minus 55 millivolts.",
    caption:"Read the fictional potentials against threshold. The changed value is closer to −55 mV but remains below threshold, so the example has not fired."
  }};
  window.KeystoneHumanLessons["f176/a2"].explanationDiagram = {
    src:"/human-biology/action-potential-ions.svg", width:280, height:300, compact:true,
    alt:"Two simplified stages of an action potential. Sodium ions enter through channels during depolarisation; potassium ions leave through channels during repolarisation.",
    caption:"Compare the stages and the direction of ion movement. Sodium entry contributes to depolarisation; potassium leaving contributes to repolarisation."
  };
  window.KeystoneHumanLessons["f176/a1"].explanationDiagram = {
    src:"/human-biology/brain-regions.svg", width:280, height:300, compact:true,
    alt:"Simplified side view of the brain. The cerebrum forms the large upper part. The cerebellum lies toward the back, behind the brainstem; the medulla connects with the spinal cord below.",
    caption:"Locate the cerebrum, cerebellum and medulla in this simplified side view. The medulla continues into the spinal cord."
  };
  window.KeystoneHumanLessons["f173/a3"].explanationDiagram = {
    src:"/human-biology/benedicts-controls.svg", width:280, height:270, compact:true,
    alt:"Two control tubes after heating with Benedict's reagent. A known reducing-sugar sample is orange, an expected positive result. A sample without reducing sugar is blue, an expected negative result.",
    caption:"Compare the expected control results. If the known positive stays blue, the test has not demonstrated detection and the unknown result is inconclusive."
  };
  for (const [id, figure] of Object.entries(figures)) {
    window.KeystoneHumanLessons[id].teachingDiagram = {width:280, height:300, ...figure};
  }
})();

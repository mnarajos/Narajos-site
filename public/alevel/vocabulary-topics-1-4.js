(function () {
  "use strict";

  const entries = (window.ALevelVocabularyData ??= []);
  const aqa = "https://www.aqa.org.uk/subjects/biology/a-level/biology-7402/specification/subject-content/";
  const specification = [
    "biological-molecules",
    "cells",
    "organisms-exchange-substances-with-their-environment",
    "genetic-information-variation-and-relationships-between-organisms",
  ];
  const biology = "https://openstax.org/books/biology-2e/pages/";
  const practical = "https://filestore.aqa.org.uk/resources/biology/AQA-7401-7402-PHBK.PDF";
  const pmt = "https://pmt.physicsandmathstutor.com/download/Biology/A-level/Notes/AQA/";
  // Candidate inventories. Curriculum scope and meanings are checked against the
  // specification and the subject references attached to each lesson group.
  const inventories = [
    pmt + "1-Biological-Molecules/Definitions.pdf",
    pmt + "2-Cells/Definitions.pdf",
    pmt + "3-Exchange-of-Substances/Definitions.pdf",
    pmt + "4-Genetics-Biodiversity-Classification/Definitions.pdf",
  ];

  function group(topic, lesson, prerequisites, references, terms) {
    const sources = [aqa + specification[topic - 1], inventories[topic - 1], ...references];
    for (const { id, term, meaning, ...options } of terms) {
      entries.push({
        id, term, meaning, topics: [topic], prerequisites,
        status: "core",
        support: "increased",
        sources,
        catchup: "#catchup-a" + topic + "-" + lesson,
        ...options,
      });
    }
  }

  function word(id, term, meaning, options = {}) {
    return { id, term, meaning, ...options };
  }

  group(1, "monopoly", [], [biology + "3-1-synthesis-of-biological-macromolecules"], [
    word("monomer", "Monomer", "A small unit that can join to other units to form a larger molecule.", { variants: ["monomers"], topics: [1, 4] }),
    word("polymer", "Polymer", "A large molecule made from many smaller units joined together.", { variants: ["polymers"], example: "Starch is a polymer of glucose.", topics: [1, 2] }),
    word("condensation-reaction", "Condensation reaction", "A reaction that joins molecules by forming a bond and releases a small molecule. In this course that small molecule is water.", { variants: ["condensation", "condensation reactions"], match: { cue: "reaction|join|bond|molecule|nucleotide|glycerol|glucose|peptide|synthesis|water" } }),
    word("hydrolysis", "Hydrolysis", "A reaction in which a molecule of water is used to break a chemical bond.", { support: "selective", variants: ["hydrolyse", "hydrolyses", "hydrolysed", "hydrolysing", "hydrolytic"], topics: [1, 3, 5, 6], example: "Splitting maltose into two glucose molecules uses one water molecule." }),
    word("covalent-bond", "Covalent bond", "A bond formed when atoms share a pair of electrons.", { status: "prerequisite", variants: ["covalent bonds"], sources: [biology + "2-1-atoms-isotopes-ions-and-molecules-the-building-blocks"] }),
  ]);

  group(1, "sugars", ["monopoly"], [biology + "3-2-carbohydrates"], [
    word("monosaccharide", "Monosaccharide", "A single sugar unit.", { variants: ["monosaccharides"], example: "Glucose and fructose are examples." }),
    word("disaccharide", "Disaccharide", "A sugar made from two single sugar units joined together.", { variants: ["disaccharides"], example: "Di- means two. Maltose contains two glucose units." }),
    word("glycosidic-bond", "Glycosidic bond", "The chemical bond that joins sugar units in a carbohydrate.", { variants: ["glycosidic bonds", "glycosidic link", "glycosidic links"] }),
    word("isomer", "Isomer", "One of two or more compounds with the same molecular formula and different arrangements of atoms.", { status: "additional", support: "selective", variants: ["isomers"], sources: ["https://goldbook.iupac.org/terms/view/I03289"] }),
    word("pentose", "Pentose", "A sugar with five carbon atoms.", { variants: ["pentoses", "pentose sugar", "pentose sugars"], example: "Ribose is a pentose." }),
    word("hexose", "Hexose", "A sugar with six carbon atoms.", { status: "additional", variants: ["hexoses"], example: "Glucose is a hexose." }),
    word("maltose", "Maltose", "A sugar made from two joined glucose units."),
    word("sucrose", "Sucrose", "A sugar made from one glucose unit and one fructose unit.", { example: "Sucrose is table sugar." }),
    word("lactose", "Lactose", "A sugar made from one glucose unit and one galactose unit.", { example: "Lactose is a sugar found in milk." }),
  ]);

  group(1, "polysac", ["monopoly", "sugars"], [biology + "3-2-carbohydrates"], [
    word("polysaccharide", "Polysaccharide", "A carbohydrate made from many sugar units joined together.", { variants: ["polysaccharides"], example: "Poly- means many." }),
    word("glycogen", "Glycogen", "A highly branched chain of glucose units. Animals store glucose in this form.", { topics: [1, 5, 6] }),
    word("starch", "Starch", "A plant carbohydrate made from many glucose units. Plants store glucose in this form.", { topics: [1, 3, 5] }),
    word("cellulose", "Cellulose", "A carbohydrate made of long, straight chains of β-glucose. Bundles of these chains strengthen plant cell walls.", { topics: [1, 2, 3] }),
    word("amylose", "Amylose", "The part of starch made mostly of long, unbranched chains of α-glucose."),
    word("amylopectin", "Amylopectin", "The part of starch made of branched chains of α-glucose."),
    word("microfibril", "Microfibril", "A tiny bundle of parallel cellulose chains held together by many hydrogen bonds.", { support: "selective", variants: ["microfibrils"] }),
  ]);

  group(1, "tests", ["sugars"], [practical, biology + "3-2-carbohydrates"], [
    word("reducing-sugar", "Reducing sugar", "A sugar that gives electrons to another substance in a reaction.", { variants: ["reducing sugars"], here: "When heated with Benedict’s reagent, a reducing sugar can turn its blue copper ions into a coloured solid." }),
    word("non-reducing-sugar", "Non-reducing sugar", "A sugar that gives a negative Benedict’s test under the usual test conditions.", { variants: ["non-reducing sugars", "nonreducing sugar", "nonreducing sugars"], here: "Sucrose can first be split into glucose and fructose, which are reducing sugars." }),
    word("precipitate", "Precipitate", "A solid that forms in a solution during a reaction.", { status: "prerequisite", support: "selective", variants: ["precipitates"] }),
    word("emulsion", "Emulsion", "A mixture containing tiny droplets of one liquid spread through another liquid.", { support: "selective", variants: ["emulsions"], here: "In the lipid test, a cloudy mixture forms when tiny lipid droplets disperse in water." }),
    word("reagent", "Reagent", "A substance added to make a chemical reaction happen or to test for another substance.", { status: "prerequisite", variants: ["reagents"], sources: ["https://goldbook.iupac.org/terms/view/R05163", practical] }),
    word("neutralise", "Neutralise", "React an acid with a base so the mixture becomes less acidic, or react a base with an acid so it becomes less alkaline.", { status: "prerequisite", variants: ["neutralised", "neutralising", "neutralisation", "neutralize"], here: "Neutralise the acid before repeating Benedict’s test." }),
  ]);

  group(1, "lipids", ["monopoly"], [biology + "3-3-lipids", biology + "5-1-components-and-structure"], [
    word("lipid", "Lipid", "A member of a group of molecules, including fats and phospholipids, which have parts that mix poorly with water.", { variants: ["lipids"], topics: [1, 2, 3] }),
    word("triglyceride", "Triglyceride", "A lipid with three fatty acids attached to one glycerol molecule.", { variants: ["triglycerides"], topics: [1, 3, 5] }),
    word("fatty-acid", "Fatty acid", "A molecule with a chain of carbon atoms and an acidic group at one end. It can form part of a fat or phospholipid.", { variants: ["fatty acids"], topics: [1, 3, 5] }),
    word("ester-bond", "Ester bond", "A bond formed between an acid group and an alcohol group, releasing water.", { variants: ["ester bonds", "ester linkage", "ester linkages"], here: "An ester bond joins each of the three fatty acids to glycerol in a triglyceride." }),
    word("saturated-fatty-acid", "Saturated fatty acid", "A fatty acid with no carbon–carbon double bonds in its chain.", { variants: ["saturated fatty acids", "saturated"], match: { cue: "fatty acid|glycerol|lipid|triglyceride|carbon[–-]carbon|double bond|C=C" } }),
    word("unsaturated-fatty-acid", "Unsaturated fatty acid", "A fatty acid with at least one carbon–carbon double bond in its chain.", { variants: ["unsaturated fatty acids", "unsaturated"], match: { cue: "fatty acid|glycerol|lipid|triglyceride|carbon[–-]carbon|double bond|C=C" } }),
    word("phospholipid", "Phospholipid", "A lipid with a phosphate-containing head that interacts with water and tails that mix poorly with water.", { variants: ["phospholipids"], topics: [1, 2], here: "In a membrane, the heads face water on each side and the tails point inwards." }),
    word("hydrophilic", "Hydrophilic", "Able to interact readily with water.", { topics: [1, 2], here: "The membrane’s phospholipid heads face the watery surroundings." }),
    word("hydrophobic", "Hydrophobic", "Having little tendency to interact with or mix with water.", { topics: [1, 2, 3], here: "The fatty acid tails of membrane phospholipids point away from the water." }),
  ]);

  group(1, "proteins", ["monopoly"], [biology + "3-4-proteins"], [
    word("amino-acid", "Amino acid", "A small molecule that can be joined to others to build proteins.", { variants: ["amino acids"], topics: [1, 3, 4, 8] }),
    word("peptide-bond", "Peptide bond", "The chemical bond that joins amino acids in a protein chain.", { variants: ["peptide bonds", "peptide link", "peptide links"], topics: [1, 3, 4] }),
    word("dipeptide", "Dipeptide", "Two amino acids linked by one peptide bond.", { variants: ["dipeptides"], topics: [1, 3] }),
    word("polypeptide", "Polypeptide", "A chain of many amino acids joined by peptide bonds. One or more of these chains make up a protein.", { support: "selective", variants: ["polypeptides", "polypeptide chain", "polypeptide chains"], topics: [1, 3, 4, 8] }),
    word("r-group", "R group (amino acid)", "The part of an amino acid that varies between different amino acids.", { variants: ["R group", "R groups", "R-group", "R-groups"], match: { cue: "amino acid|protein|peptide|fold" }, synonyms: ["side chain"] }),
    word("primary-structure", "Primary structure", "The order of amino acids along a protein chain.", { variants: ["primary protein structure"] }),
    word("secondary-structure", "Secondary structure", "Regular shapes formed in parts of a protein chain, such as coils or folded sheets held by hydrogen bonds."),
    word("tertiary-structure", "Tertiary structure", "The overall three-dimensional shape of one protein chain after it folds.", { topics: [1, 4, 6, 8] }),
    word("quaternary-structure", "Quaternary structure", "The way two or more protein chains fit together to form a working protein.", { topics: [1, 3], example: "Haemoglobin contains four protein chains." }),
    word("disulfide-bridge", "Disulfide bridge", "A strong bond that can form between sulfur atoms in two cysteine side chains and help hold a protein in shape.", { support: "selective", variants: ["disulfide bridges", "disulphide bridge", "disulphide bridges", "disulfide bond", "disulfide bonds", "disulphide bond", "disulphide bonds"] }),
  ]);

  group(1, "enzymes", ["proteins"], [biology + "6-5-enzymes"], [
    word("enzyme", "Enzyme", "A biological catalyst. Most enzymes are proteins that speed up a reaction and can be used again.", { variants: ["enzymes"], topics: [1, 2, 3, 4, 5, 6, 8] }),
    word("catalyst", "Catalyst", "A substance that speeds up a reaction and is still available at the end.", { status: "prerequisite", variants: ["catalyse", "catalyses", "catalysed", "catalytic", "catalysts"] }),
    word("active-site", "Active site", "The part of an enzyme where its substrate binds and the reaction happens.", { variants: ["active sites"], topics: [1, 5, 6] }),
    word("enzyme-substrate", "Substrate (enzyme)", "The substance an enzyme binds and acts on in a reaction.", { support: "selective", variants: ["substrate", "substrates"], match: { cue: "enzyme|cataly|active site|inhibit|product|reaction|bind|amylase|lipase|lactase|reactant|hydroly" }, topics: [1, 3, 5, 6] }),
    word("activation-energy", "Activation energy", "The energy needed for reacting particles to reach a state from which the reaction can proceed.", { here: "An enzyme lowers the activation energy for its reaction." }),
    word("induced-fit", "Induced fit", "A change in an enzyme’s shape as a substrate binds to it.", { variants: ["induced-fit model", "induced fit model"], here: "The change helps the enzyme speed up the reaction." }),
    word("enzyme-substrate-complex", "Enzyme–substrate complex", "The temporary combination formed when a substrate binds to an enzyme.", { variants: ["enzyme–substrate complexes", "enzyme-substrate complex", "enzyme-substrate complexes"] }),
  ]);

  group(1, "enzfactors", ["enzymes"], [biology + "6-5-enzymes"], [
    word("denature", "Denature (protein)", "Change the folded shape of a protein so it can no longer work normally.", { variants: ["denature", "denatured", "denatures", "denaturing", "denaturation"], match: { cue: "enzyme|protein|active site|temperature|tertiary|pH" }, here: "In an enzyme, a substrate may stop fitting its active site." }),
    word("competitive-inhibition", "Competitive inhibition", "An inhibitor reduces enzyme activity by competing with the substrate for the same active site.", { variants: ["competitive inhibitors", "competitive inhibitor"], support: "selective", here: "More substrate makes it more likely that a substrate molecule will bind and reduces the inhibitor’s effect." }),
    word("non-competitive-inhibition", "Non-competitive inhibition", "An inhibitor reduces enzyme activity by binding away from the active site. In this model, adding more substrate cannot overcome the effect.", { variants: ["non-competitive inhibitor", "non-competitive inhibitors", "noncompetitive inhibition", "noncompetitive inhibitor", "noncompetitive inhibitors"], support: "selective" }),
    word("allosteric-regulation", "Allosteric regulation", "A molecule binds at one site on a protein and changes how another site works.", { status: "additional", support: "selective", variants: ["allosteric", "allosteric site"], here: "This can increase or reduce the activity of an enzyme." }),
  ]);

  group(1, "nucleic", ["monopoly"], [biology + "3-5-nucleic-acids", biology + "14-2-dna-structure-and-sequencing"], [
    word("dna", "DNA", "The molecule that stores genetic information in the order of its bases.", { variants: ["deoxyribonucleic acid"], topics: [1, 2, 4, 7, 8] }),
    word("rna", "RNA", "A molecule made of a chain of units containing ribose. Different forms of RNA have different jobs in cells.", { variants: ["ribonucleic acid"], topics: [1, 4, 8] }),
    word("nucleotide", "Nucleotide", "A building block of DNA or RNA. It has a sugar, a phosphate group and a base.", { variants: ["nucleotides"], topics: [1, 4, 8] }),
    word("nitrogenous-base", "Nitrogenous base", "The part of a nucleotide that can pair with a matching base on another DNA or RNA strand.", { variants: ["nitrogenous bases", "organic base", "organic bases", "nitrogen-containing base"], synonyms: ["DNA base", "RNA base"] }),
    word("phosphodiester-bond", "Phosphodiester bond", "A strong bond that links the sugar of one nucleotide to the phosphate of the next along a DNA or RNA strand.", { variants: ["phosphodiester bonds"], support: "selective", topics: [1, 4, 8] }),
    word("antiparallel", "Antiparallel", "Side by side and running in opposite directions.", { support: "selective", here: "One strand of the DNA double helix runs 5′ to 3′ while the other runs 3′ to 5′." }),
    word("complementary-base-pairing", "Complementary base pairing", "The matching of particular bases between nucleic acid strands.", { variants: ["complementary base pairs", "complementary bases"], example: "In DNA, A pairs with T and C pairs with G.", topics: [1, 4, 8] }),
  ]);

  group(1, "replication", ["nucleic"], [biology + "14-4-dna-replication-in-prokaryotes", biology + "14-5-dna-replication-in-eukaryotes"], [
    word("semi-conservative-replication", "Semi-conservative replication", "Copying DNA so each new double helix contains one original strand and one newly made strand.", { variants: ["semi-conservative", "semiconservative replication", "semiconservative"] }),
    word("dna-helicase", "DNA helicase", "An enzyme that separates the two strands of DNA so each strand can be copied.", { variants: ["helicase"] }),
    word("dna-polymerase", "DNA polymerase", "An enzyme that builds a new DNA strand by joining nucleotides in the order set by an existing strand.", { variants: ["DNA polymerases"], topics: [1, 8] }),
    word("template-strand", "Template strand", "An existing DNA or RNA strand whose base order determines the order of bases in a new complementary strand.", { variants: ["template strands", "DNA template"], topics: [1, 4, 8] }),
  ]);

  group(1, "atp", ["nucleic", "monopoly"], [biology + "6-4-atp-adenosine-triphosphate"], [
    word("atp", "ATP", "A molecule cells use to supply energy for processes that need it. Reactions that break down ATP can be linked to these processes.", { variants: ["adenosine triphosphate"], topics: [1, 2, 3, 5, 6, 8] }),
    word("inorganic-phosphate", "Inorganic phosphate", "Phosphate present as a free ion. ATP hydrolysis can release it.", { variants: ["inorganic phosphate ion", "inorganic phosphate ions"], synonyms: ["Pi"], topics: [1, 5, 6] }),
    word("phosphorylation", "Phosphorylation", "Adding a phosphate group to a molecule.", { variants: ["phosphorylate", "phosphorylates", "phosphorylated"], topics: [1, 5, 6, 8] }),
    word("atp-synthase", "ATP synthase", "An enzyme that joins ADP and inorganic phosphate to make ATP.", { topics: [1, 5] }),
  ]);

  group(1, "water", ["monopoly"], [biology + "2-2-water", biology + "6-1-energy-and-metabolism"], [
    word("metabolite", "Metabolite", "A substance made or used in a chemical reaction in a living organism.", { support: "selective", variants: ["metabolites"] }),
    word("metabolism", "Metabolism", "All the chemical reactions occurring in a cell or organism.", { status: "prerequisite", variants: ["metabolic reactions", "metabolic reaction"], topics: [1, 5, 6] }),
    word("solute", "Solute", "A substance dissolved in a liquid.", { status: "prerequisite", support: "selective", variants: ["solutes"], topics: [1, 2, 3, 6] }),
    word("solvent", "Solvent", "A substance that dissolves another substance. Water is the main solvent in cells.", { status: "prerequisite", variants: ["solvents"], topics: [1, 2, 5] }),
    word("ion", "Ion", "An atom or group of atoms with an overall electric charge.", { status: "prerequisite", variants: ["ions"], topics: [1, 2, 3, 5, 6], sources: [biology + "2-1-atoms-isotopes-ions-and-molecules-the-building-blocks"] }),
    word("cohesion", "Cohesion", "Attraction between particles of the same substance.", { here: "Hydrogen bonds make water molecules stick to one another.", topics: [1, 3] }),
    word("specific-heat-capacity", "Specific heat capacity", "The energy needed to raise the temperature of one kilogram of a substance by one degree Celsius."),
    word("latent-heat-of-vaporisation", "Latent heat of vaporisation", "The energy needed for a liquid to turn into vapour at the same temperature.", { variants: ["latent heat of evaporation", "latent heat of vaporization"], support: "selective", here: "Water needs a relatively large amount of energy to evaporate, so evaporation can cool a surface." }),
  ]);

  group(1, "pass1", ["enzymes", "sugars"], [biology + "34-3-digestive-system-processes"], [
    word("lactase", "Lactase", "An enzyme in the small intestine that splits lactose into glucose and galactose.", { status: "additional", support: "selective" }),
    word("immobilised-enzyme", "Immobilised enzyme", "An enzyme fixed in place, for example by attaching it to beads, so it can act on a substance without travelling with it.", { status: "additional", support: "selective", variants: ["immobilised", "immobilized", "immobilised enzymes", "immobilized enzyme"], match: { cue: "enzyme|lactase|beads|substrate" }, sources: ["https://edu.rsc.org/download?ac=11845"] }),
  ]);

  group(1, "pass1b", ["proteins"], ["https://pubmed.ncbi.nlm.nih.gov/12180993/"], [
    word("spidroin", "Spidroin", "One of the proteins that makes up spider silk.", { status: "additional", support: "selective", variants: ["spidroins"] }),
    word("beta-pleated-sheet", "β-pleated sheet", "A folded arrangement of parts of a protein chain, held in place by hydrogen bonds.", { variants: ["β-pleated sheets", "beta-pleated sheet", "beta-pleated sheets", "beta sheet", "β-sheet"], support: "selective", sources: [biology + "3-4-proteins"], catchup: "#catchup-a1-proteins" }),
  ]);

  group(2, "euk", [], [biology + "4-3-eukaryotic-cells"], [
    word("organelle", "Organelle", "A specialised structure inside a cell that performs a particular job.", { variants: ["organelles"], example: "A mitochondrion is an organelle.", topics: [2, 5] }),
    word("eukaryotic-cell", "Eukaryotic cell", "A cell with its main store of DNA enclosed inside a nucleus.", { variants: ["eukaryotic cells", "eukaryote", "eukaryotes", "eukaryotic"], topics: [2, 4, 8] }),
    word("nucleolus", "Nucleolus", "A region inside the nucleus where ribosomal RNA is made and ribosome parts start to come together.", { variants: ["nucleoli"], support: "selective" }),
    word("mitochondrion", "Mitochondrion", "A cell structure that carries out the later stages of aerobic respiration and supplies most of the cell’s ATP under aerobic conditions.", { variants: ["mitochondria"], topics: [2, 5, 6] }),
    word("chloroplast", "Chloroplast", "A structure in plants and algae where photosynthesis takes place.", { variants: ["chloroplasts"], topics: [2, 5] }),
    word("ribosome", "Ribosome", "A small structure that uses the instructions in messenger RNA to join amino acids into a protein chain.", { variants: ["ribosomes"], topics: [2, 4] }),
    word("rough-endoplasmic-reticulum", "Rough endoplasmic reticulum", "A network of membranes with ribosomes attached. It helps make and process proteins for membranes or export.", { variants: ["rough ER"], synonyms: ["RER"], support: "selective" }),
    word("smooth-endoplasmic-reticulum", "Smooth endoplasmic reticulum", "A network of membranes without attached ribosomes. One of its jobs is making lipids.", { variants: ["smooth ER"], synonyms: ["SER"], support: "selective" }),
    word("golgi-apparatus", "Golgi apparatus", "A stack of membrane sacs that modifies, sorts and packages molecules such as proteins.", { variants: ["Golgi body", "Golgi complex"] }),
    word("vesicle", "Vesicle", "A small sac enclosed by a membrane. Vesicles can carry substances within a cell or to its surface.", { variants: ["vesicles"], topics: [2, 6] }),
    word("lysosome", "Lysosome", "A membrane-enclosed structure containing enzymes that break down substances inside a cell.", { variants: ["lysosomes"] }),
    word("chitin", "Chitin", "A tough carbohydrate that strengthens structures such as fungal cell walls and insect outer skeletons.", { support: "selective", topics: [2, 3] }),
    word("tissue", "Tissue", "A group of cells organised to carry out a job.", { status: "prerequisite", variants: ["tissues"], topics: [2, 3, 6] }),
  ]);

  group(2, "prok", ["euk", "nucleic"], [biology + "4-2-prokaryotic-cells"], [
    word("prokaryotic-cell", "Prokaryotic cell", "A cell without a membrane-enclosed nucleus.", { variants: ["prokaryotic cells", "prokaryote", "prokaryotes", "prokaryotic"], example: "Bacteria are prokaryotes.", topics: [2, 4, 8] }),
    word("peptidoglycan", "Peptidoglycan", "A strong mesh of sugar chains linked by short chains of amino acids. It supports bacterial cell walls.", { variants: ["murein"], support: "selective" }),
    word("plasmid", "Plasmid", "A DNA molecule that can be copied independently of a cell’s main chromosome. In bacteria it is usually a small ring.", { variants: ["plasmids"], topics: [2, 4, 8] }),
    word("flagellum", "Flagellum", "A long structure extending from a cell’s surface that can move the cell.", { variants: ["flagella"], here: "A bacterial flagellum rotates and helps propel the cell." }),
    word("acellular", "Acellular", "Having no cells as part of its structure.", { support: "selective", here: "A virus particle is acellular. It uses a host cell to make copies of itself.", sources: [aqa + "cells", biology + "21-key-terms"] }),
    word("capsid", "Capsid", "A protein shell that encloses the genetic material of a virus.", { variants: ["capsids"], support: "selective", sources: [aqa + "cells", biology + "21-key-terms"] }),
    word("bacteriophage", "Bacteriophage", "A virus that infects bacteria.", { status: "additional", variants: ["bacteriophages", "phage", "phages"], support: "selective", sources: [biology + "21-key-terms"], catchup: "#catchup-a2-pass2b" }),
    word("binary-fission", "Binary fission", "Division of one cell into two after its DNA is copied.", { here: "Bacteria usually reproduce this way.", sources: [aqa + "cells", biology + "10-5-prokaryotic-cell-division"] }),
  ]);

  group(2, "micro", ["euk"], [practical, biology + "4-1-studying-cells"], [
    word("magnification", "Magnification", "How many times larger an image is than the object it shows.", { variants: ["magnified"], topics: [2, 3] }),
    word("micrograph", "Micrograph", "A picture made using a microscope.", { variants: ["micrographs"] }),
    word("scale-bar", "Scale bar", "A line on an image that shows how long that distance is in the real object.", { variants: ["scale bars"], topics: [2, 3] }),
    word("microscopy-resolution", "Resolution (microscopy)", "How close two points can be while still appearing as separate points in an image.", { variants: ["resolution", "microscope resolution", "resolving power"], match: { cue: "microscop|image|specimen|magnification|points|wavelength|electrons|separate" }, support: "selective", here: "Better resolution makes two points appear separate at a smaller distance." }),
    word("artefact", "Artefact", "A feature created by how a sample was prepared or observed, rather than by the original sample itself.", { variants: ["artefacts", "artifact", "artifacts"], support: "selective", example: "A bubble trapped under a slide coverslip can look like part of the sample." }),
    word("eyepiece-graticule", "Eyepiece graticule", "A scale you can see through a microscope eyepiece. Its divisions need to be calibrated for the lens in use.", { variants: ["eyepiece graticules"], support: "selective" }),
    word("stage-micrometer", "Stage micrometer", "A slide marked with a scale of known length, used to calibrate a microscope’s eyepiece scale.", { variants: ["stage micrometers"] }),
  ]);

  group(2, "fract", ["euk", "osmosis"], [biology + "4-3-eukaryotic-cells", "https://www.ncbi.nlm.nih.gov/books/NBK26936/"], [
    word("cell-fractionation", "Cell fractionation", "Separating a broken-up cell mixture into parts so its structures can be studied."),
    word("homogenise", "Homogenise", "Break up a sample and mix its contents to make a more even mixture.", { variants: ["homogenised", "homogenising", "homogenisation", "homogenize", "homogenized", "homogenate"], support: "selective", here: "Cell fractionation breaks open cells to release their organelles." }),
    word("ultracentrifugation", "Ultracentrifugation", "Spinning a mixture extremely fast to separate its components by how they settle."),
    word("supernatant", "Supernatant", "The liquid above the solid material that has settled.", { support: "selective", topics: [2, 6], variants: ["supernatant liquid"], here: "In cell fractionation, the liquid may still contain smaller cell structures." }),
    word("pellet", "Pellet (centrifugation)", "The material packed together at the bottom of a centrifuge tube after spinning.", { variants: ["pellet", "pellets"], match: { cue: "centrifug|spin|spun|settle|supernatant|organelle" }, support: "selective" }),
    word("isotonic", "Isotonic", "A solution is isotonic to a cell when the cell neither swells nor shrinks in it.", { support: "selective", topics: [2, 5], here: "There is no net movement of water into or out of the cell by osmosis.", sources: [aqa + "cells", biology + "5-2-passive-transport"] }),
  ]);

  group(2, "mitosis", ["euk", "replication"], [biology + "10-2-the-cell-cycle"], [
    word("cell-cycle", "Cell cycle", "The sequence in which a cell grows, copies its DNA and divides.", { variants: ["cell cycles"] }),
    word("interphase", "Interphase", "The part of the cell cycle before mitosis. The cell grows and copies its DNA during this time."),
    word("mitosis", "Mitosis", "Division of a nucleus into two nuclei, each with the same set of chromosomes as the original nucleus.", { variants: ["mitotic"], topics: [2, 4, 8] }),
    word("sister-chromatid", "Sister chromatid", "One of the two copies of a chromosome after it is copied. The copies are joined at a centromere until they separate.", { variants: ["sister chromatids", "chromatid", "chromatids"], topics: [2, 4] }),
    word("centromere", "Centromere", "The region of a chromosome where sister chromatids stay joined before they separate.", { variants: ["centromeres"], topics: [2, 4] }),
    word("spindle-fibre", "Spindle fibre", "Part of the temporary network of protein tubes that helps move chromosomes during cell division.", { variants: ["spindle fibres", "spindle microtubules"], topics: [2, 4] }),
    word("cytokinesis", "Cytokinesis", "Division of the cell’s contents to form separate daughter cells after nuclear division."),
  ]);

  group(2, "mitindex", ["mitosis"], [practical, biology + "30-2-stems"], [
    word("meristem", "Meristem", "Plant tissue containing cells that divide to allow growth.", { variants: ["meristems"], support: "selective", example: "The growing tips of shoots and roots contain meristems." }),
    word("mitotic-index", "Mitotic index", "The fraction of cells counted that are in mitosis.", { here: "Count the cells in mitosis and divide by the total number of cells counted." }),
  ]);

  group(2, "membrane", ["lipids"], [biology + "5-1-components-and-structure", practical], [
    word("phospholipid-bilayer", "Phospholipid bilayer", "Two layers of phospholipids with their water-avoiding tails pointing towards each other.", { variants: ["phospholipid bilayers", "bilayer", "bilayers"], topics: [2, 3, 5] }),
    word("fluid-mosaic-model", "Fluid-mosaic model", "A model of membranes in which lipids can move sideways and different proteins are scattered through the membrane.", { variants: ["fluid mosaic model", "fluid-mosaic", "fluid mosaic"] }),
    word("permeability", "Permeability", "How easily a substance can pass through a barrier.", { variants: ["permeable"], topics: [2, 6], here: "A membrane may allow some substances through more readily than others." }),
    word("partially-permeable", "Partially permeable", "Allows some substances through while blocking others.", { variants: ["selectively permeable", "semi-permeable", "semipermeable"], topics: [2, 3, 6], example: "A cell membrane lets water pass through much more readily than charged ions." }),
    word("tonoplast", "Tonoplast", "The membrane that surrounds a plant cell’s vacuole.", { status: "additional", variants: ["tonoplasts"], support: "selective", sources: [practical, biology + "4-3-eukaryotic-cells"] }),
    word("betalain", "Betalain", "A pigment that gives some plants their red, violet or yellow colours.", { status: "additional", variants: ["betalains"], support: "selective", here: "Red beetroot stores betalain pigments inside its cell vacuoles.", sources: ["https://www.saps.org.uk/teaching-resources/resources/754/using-beetroot-in-the-lab/"] }),
  ]);

  group(2, "diffusion", ["membrane"], [biology + "5-2-passive-transport"], [
    word("concentration-gradient", "Concentration gradient", "A difference in concentration between two places.", { variants: ["concentration gradients"], topics: [2, 3, 5, 6], here: "Down the gradient means from the higher concentration towards the lower one." }),
    word("diffusion", "Diffusion", "The net movement of particles from higher to lower concentration due to their random motion.", { variants: ["simple diffusion", "diffuse", "diffuses", "diffused", "diffusing"], topics: [2, 3, 5, 6] }),
    word("facilitated-diffusion", "Facilitated diffusion", "Net movement of a substance down its concentration gradient through a membrane protein.", { here: "Ions can pass through channel proteins this way, without ATP being used for the movement.", topics: [2, 3, 6] }),
    word("carrier-protein", "Carrier protein", "A membrane protein that binds a substance and changes shape to move it across the membrane.", { variants: ["carrier proteins"], topics: [2, 3, 6] }),
  ]);

  group(2, "osmosis", ["diffusion", "water"], [biology + "30-5-transport-of-water-and-solutes-in-plants", practical], [
    word("water-potential", "Water potential", "A measure that predicts the direction of water movement. Water moves overall from higher to lower water potential.", { variants: ["water potentials", "water-potential"], support: "selective", topics: [1, 2, 3, 6], here: "Dissolving solute lowers water potential. Pressure can change it too." }),
    word("osmosis", "Osmosis", "The net movement of water through a partially permeable membrane from higher to lower water potential.", { variants: ["osmotic movement"], topics: [2, 3, 6] }),
    word("turgid", "Turgid", "Firm because water inside a cell pushes out against its wall.", { topics: [2, 3] }),
    word("turgor-pressure", "Turgor pressure", "Pressure exerted when the water-filled contents of a cell push against its wall.", { variants: ["turgor"], topics: [2, 3] }),
    word("plasmolysis", "Plasmolysis", "Water loss from a plant cell that makes the cell membrane pull away from the wall.", { variants: ["plasmolysed", "plasmolysing"], support: "selective" }),
  ]);

  group(2, "active", ["diffusion", "atp"], [biology + "5-3-active-transport"], [
    word("active-transport", "Active transport", "Movement of a substance across a membrane against its concentration or charge gradient, using energy.", { synonyms: ["active uptake"], topics: [2, 3, 5, 6] }),
    word("co-transport", "Co-transport", "Transport in which movement of one substance down its gradient drives movement of a second substance across the same membrane.", { variants: ["cotransport"], topics: [1, 2, 3, 5, 6] }),
    word("co-transporter", "Co-transporter", "A membrane protein that links the movement of two substances across the membrane.", { variants: ["co-transporters", "cotransporter", "co-transporter protein", "co-transporter proteins"], topics: [2, 3, 5, 6] }),
  ]);

  group(2, "phago", ["membrane"], [biology + "42-1-innate-immune-response", biology + "42-2-adaptive-immune-response"], [
    word("antigen", "Antigen", "A molecule or part of a molecule that can be specifically recognised by part of the immune system.", { variants: ["antigens"], here: "An antigen on a microorganism can trigger an immune response." }),
    word("phagocytosis", "Phagocytosis", "A cell surrounds and takes in a particle, such as a bacterium, inside a membrane sac.", { here: "Digestive enzymes can then break down the particle." }),
    word("phagocyte", "Phagocyte", "A cell that takes in particles such as bacteria and can break them down.", { variants: ["phagocytes"] }),
    word("phagosome", "Phagosome", "A membrane sac that forms around a particle after a cell takes it in.", { variants: ["phagosomes"], support: "selective" }),
    word("lysozyme", "Lysozyme", "An enzyme that breaks bonds in bacterial cell walls.", { variants: ["lysozymes"], support: "selective", topics: [2, 3] }),
  ]);

  group(2, "cellmed", ["phago", "mitosis"], [biology + "42-2-adaptive-immune-response"], [
    word("lymphocyte", "Lymphocyte", "A white blood cell involved in the immune response. B cells and T cells are types of lymphocyte.", { variants: ["lymphocytes"] }),
    word("cell-mediated-response", "Cell-mediated response", "An immune response carried out by T cells, for example by recognising and killing infected cells.", { variants: ["cellular response", "cell-mediated immunity"], support: "selective" }),
    word("clonal-selection", "Clonal selection", "Activation of the lymphocytes that recognise a particular antigen."),
    word("clonal-expansion", "Clonal expansion", "Division of an activated lymphocyte to make many copies that recognise the same antigen."),
  ]);

  group(2, "humoral", ["cellmed"], [biology + "42-2-adaptive-immune-response", biology + "42-3-antibodies"], [
    word("antibody", "Antibody", "A protein made by plasma cells that binds to a particular antigen.", { variants: ["antibodies"], synonyms: ["immunoglobulin", "immunoglobulins"] }),
    word("humoral-response", "Humoral response", "The part of an immune response in which B cells give rise to plasma cells that release antibodies.", { variants: ["humoral immunity"], support: "selective" }),
    word("agglutination", "Agglutination", "Clumping together of particles or cells.", { variants: ["agglutinate", "agglutinates"], support: "selective", here: "An antibody can link particles carrying matching antigens so the particles form clumps." }),
  ]);

  group(2, "vaccines", ["humoral"], [biology + "42-2-adaptive-immune-response", "https://www.cdc.gov/vaccines/basics/explaining-how-vaccines-work.html"], [
    word("active-immunity", "Active immunity", "Protection developed when your immune system responds to an antigen and can remember it.", { example: "A vaccination can give active immunity." }),
    word("passive-immunity", "Passive immunity", "Protection from antibodies received from another source.", { here: "It is usually temporary because the recipient does not make memory cells in response to those antibodies." }),
    word("herd-immunity", "Herd immunity", "Indirect protection that occurs when enough people are immune to make a disease less likely to spread.", { synonyms: ["community immunity"] }),
    word("monoclonal-antibody", "Monoclonal antibody", "One of many identical antibodies made from copies of the same cell or its antibody-producing DNA.", { variants: ["monoclonal antibodies"], catchup: "#catchup-a2-hiv" }),
  ]);

  group(3, "sav", ["diffusion"], [biology + "33-3-homeostasis", biology + "39-2-gas-exchange-across-respiratory-surfaces"], [
    word("surface-area-to-volume-ratio", "Surface area to volume ratio", "The amount of surface area for each unit of volume.", { variants: ["surface area to volume ratios", "surface area : volume ratio", "surface-area-to-volume ratio"], synonyms: ["SA:V", "SA : V"], here: "A small cube has more surface area per unit of volume than a large cube." }),
    word("exchange-surface", "Exchange surface", "A boundary across which substances move between an organism and its surroundings, or between different parts of the organism.", { variants: ["exchange surfaces"] }),
  ]);

  group(3, "insects", ["sav", "diffusion"], [biology + "39-1-systems-of-gas-exchange"], [
    word("spiracle", "Spiracle", "An opening on the body of an insect that lets air enter or leave its internal tubes.", { variants: ["spiracles"], support: "selective" }),
    word("insect-trachea", "Trachea (insects)", "One of the tubes that carries air into an insect from an opening in its body.", { variants: ["trachea", "tracheae"], match: { cue: "insect|spiracle|tracheole|abdomen" }, support: "selective" }),
    word("tracheole", "Tracheole", "A fine branch of an insect’s air tubes. Gases can diffuse between it and nearby cells.", { variants: ["tracheoles"], support: "selective" }),
  ]);

  group(3, "fish", ["sav", "diffusion"], [biology + "39-1-systems-of-gas-exchange"], [
    word("gill-filament", "Gill filament", "One of the thin structures projecting from a fish’s gill arch. It carries smaller exchange surfaces.", { variants: ["gill filaments"] }),
    word("gill-lamella", "Gill lamella", "One of the small, thin plates on a gill filament where gases diffuse between water and blood.", { variants: ["gill lamellae", "lamella", "lamellae"], support: "selective", match: { cue: "gill|water|fish|filament|capillary|countercurrent" } }),
    word("countercurrent-exchange", "Countercurrent exchange", "Exchange between two fluids flowing past one another in opposite directions.", { variants: ["countercurrent flow", "counter-current exchange", "countercurrent", "counter-current"], support: "selective", topics: [3, 6], here: "In gills, this arrangement keeps oxygen concentration higher in the water than in the blood along the exchange surface." }),
  ]);

  group(3, "leafgas", ["sav", "diffusion"], [biology + "30-4-leaves", biology + "30-5-transport-of-water-and-solutes-in-plants"], [
    word("stoma", "Stoma", "A pore in a leaf surface through which gases can pass. Guard cells control how far it opens.", { variants: ["stomata"], topics: [3, 5, 6] }),
    word("guard-cell", "Guard cell", "One of the two cells that change shape to open or close a leaf pore.", { variants: ["guard cells"], topics: [3, 5, 6] }),
    word("spongy-mesophyll", "Spongy mesophyll", "Leaf tissue made of loosely packed cells with air spaces between them.", { support: "selective" }),
    word("xerophyte", "Xerophyte", "A plant with features that help it survive where water is hard to obtain.", { variants: ["xerophytes", "xerophytic"], support: "selective", example: "A thick waxy surface can reduce water loss." }),
  ]);

  group(3, "lungs", ["diffusion", "sav"], [biology + "39-1-systems-of-gas-exchange", biology + "39-3-breathing"], [
    word("mammal-trachea", "Trachea (mammals)", "The main tube leading from the throat towards the lungs.", { variants: ["trachea", "windpipe"], match: { cue: "mammal|lung|bronch|cartilage|throat|windpipe" } }),
    word("cartilage", "Cartilage", "A firm, flexible tissue. It supports body parts and can cushion joints.", { status: "prerequisite", here: "Cartilage helps stop the main airway from collapsing." }),
    word("bronchus", "Bronchus", "A large airway that branches from the main airway and leads into a lung.", { variants: ["bronchi"] }),
    word("bronchiole", "Bronchiole", "A small branching airway inside a lung.", { variants: ["bronchioles"] }),
    word("alveolus", "Alveolus", "A tiny air sac in a lung. Oxygen and carbon dioxide move between its air and the nearby blood.", { variants: ["alveoli", "alveolar sac", "alveolar sacs"] }),
    word("epithelium", "Epithelium", "A layer of cells that covers a surface or lines a cavity.", { variants: ["epithelial", "epithelia", "epithelial cells", "epithelial cell"], support: "selective", topics: [3, 6], here: "The epithelium in an alveolus is thin, so gases cross it over a short distance." }),
  ]);

  group(3, "ventilation", ["lungs"], [biology + "39-3-breathing"], [
    word("ventilation", "Ventilation", "Movement of air into and out of the lungs, or of air or water past another gas exchange surface.", { variants: ["ventilate", "ventilated"], here: "Breathing moves air, while gas exchange moves particular gases between air and blood." }),
    word("intercostal-muscle", "Intercostal muscle", "A muscle between two ribs. These muscles move the ribcage during breathing.", { variants: ["intercostal muscles", "external intercostal muscles", "internal intercostal muscles"], support: "selective" }),
    word("tidal-volume", "Tidal volume", "The volume of air moved in or out in one breath.", { variants: ["tidal volumes"], catchup: "#catchup-a3-lungdata" }),
    word("pulmonary-ventilation", "Pulmonary ventilation", "The volume of air moved into or out of the lungs per unit time.", { variants: ["pulmonary ventilation rate"], synonyms: ["minute ventilation"], catchup: "#catchup-a3-lungdata", here: "Multiply the volume per breath by the number of breaths per unit time." }),
  ]);

  group(3, "digestion", ["monopoly", "enzymes", "lipids"], [biology + "34-3-digestive-system-processes"], [
    word("amylase", "Amylase", "An enzyme that breaks bonds in starch to produce smaller sugars.", { variants: ["amylases"] }),
    word("lipase", "Lipase", "An enzyme that breaks bonds in lipids, releasing fatty acids.", { variants: ["lipases"] }),
    word("trypsin", "Trypsin", "An enzyme that cuts bonds within protein chains during digestion.", { topics: [1, 3], support: "selective", here: "In the enzyme practical, trypsin cuts protein in the cloudy milk suspension." }),
    word("endopeptidase", "Endopeptidase", "An enzyme that cuts bonds between amino acids within a protein chain.", { variants: ["endopeptidases"], support: "selective" }),
    word("exopeptidase", "Exopeptidase", "An enzyme that cuts peptide bonds at the ends of protein chains.", { variants: ["exopeptidases"], support: "selective" }),
    word("dipeptidase", "Dipeptidase", "An enzyme that separates two amino acids joined in a dipeptide.", { variants: ["dipeptidases"] }),
    word("emulsify", "Emulsify", "Break up one liquid into tiny droplets spread through another liquid.", { variants: ["emulsifies", "emulsified", "emulsification"], support: "selective", here: "Bile salts disperse fat droplets, giving lipase a larger total surface to work on." }),
    word("micelle", "Micelle", "A tiny cluster that lets products of fat digestion travel through watery fluid in the intestine.", { variants: ["micelles"], support: "selective", here: "Bile salts help form micelles, which bring products of fat digestion to the surface of intestinal cells." }),
  ]);

  group(3, "absorption", ["digestion", "active"], [biology + "34-3-digestive-system-processes"], [
    word("ileum", "Ileum", "The last part of the small intestine. It absorbs products of digestion.", { support: "selective" }),
    word("villus", "Villus", "One of many small finger-like projections lining the small intestine. Villi increase the area available for absorption.", { variants: ["villi"] }),
    word("microvillus", "Microvillus", "One of the tiny projections on the surface of an individual cell.", { variants: ["microvilli"], topics: [3, 6], here: "Microvilli on cells lining the intestine give each cell a larger area for absorption." }),
    word("lacteal", "Lacteal", "A small lymph vessel inside a villus that takes up particles carrying absorbed fats.", { status: "additional", variants: ["lacteals"], support: "selective" }),
  ]);

  group(3, "haemo", ["proteins", "lungs"], [biology + "39-4-transport-of-gases-in-human-bodily-fluids"], [
    word("haemoglobin", "Haemoglobin", "A protein in red blood cells that can bind and carry oxygen.", { variants: ["hemoglobin", "haemoglobins"], topics: [1, 3] }),
    word("erythrocyte", "Erythrocyte", "A red blood cell. It carries oxygen using haemoglobin.", { status: "additional", support: "selective", variants: ["erythrocytes"], synonyms: ["red blood cell", "red blood cells"] }),
    word("oxygen-affinity", "Oxygen affinity", "How readily a molecule such as haemoglobin binds oxygen.", { variants: ["affinity for oxygen"], support: "selective", here: "At the same oxygen partial pressure, haemoglobin with higher affinity is more saturated with oxygen." }),
    word("partial-pressure", "Partial pressure", "The share of the total pressure contributed by one gas in a mixture.", { variants: ["partial pressures"], support: "selective", here: "Oxygen partial pressure indicates how available oxygen is to bind to haemoglobin." }),
    word("oxygen-dissociation-curve", "Oxygen dissociation curve", "A graph showing how much oxygen is bound to haemoglobin at different oxygen partial pressures.", { variants: ["dissociation curve", "dissociation curves", "oxygen dissociation curves"] }),
    word("positive-cooperativity", "Positive cooperativity", "Binding at one site makes it easier for the same substance to bind at another site.", { variants: ["cooperative binding", "cooperativity"], support: "selective", here: "When one oxygen molecule binds to haemoglobin, further oxygen molecules bind more readily." }),
    word("bohr-effect", "Bohr effect", "Haemoglobin binds oxygen less readily when carbon dioxide rises and pH falls.", { catchup: "#catchup-a3-bohr", here: "This helps oxygen leave the blood where respiration is releasing carbon dioxide." }),
  ]);

  group(3, "heart", ["circulation"], [biology + "40-3-mammalian-heart-and-blood-vessels"], [
    word("atrium", "Atrium", "A chamber of the heart that receives blood returning to it.", { variants: ["atria"] }),
    word("ventricle", "Ventricle (heart)", "A chamber of the heart that pumps blood out of the heart.", { variants: ["ventricle", "ventricles", "ventricular"], match: { cue: "heart|blood|atri|pump|cardiac|valve|systole|diastole|artery" }, topics: [3, 6] }),
    word("aorta", "Aorta", "The main artery carrying blood from the left ventricle towards the rest of the body.", { topics: [3, 6] }),
    word("systole", "Systole", "The part of the heartbeat in which a chamber contracts.", { variants: ["atrial systole", "ventricular systole"], support: "selective", topics: [3, 6] }),
    word("diastole", "Diastole", "The part of the heartbeat in which a chamber relaxes and can fill with blood.", { support: "selective", topics: [3, 6] }),
    word("cardiac-output", "Cardiac output", "The volume of blood one ventricle pumps in a given time.", { topics: [3, 6], here: "Multiply heart rate by stroke volume." }),
    word("stroke-volume", "Stroke volume", "The volume of blood pumped out of one ventricle in one beat.", { topics: [3, 6] }),
  ]);

  group(3, "vessels", ["circulation", "osmosis"], [biology + "40-4-blood-flow-and-blood-pressure-regulation", "https://www.ncbi.nlm.nih.gov/books/NBK53447/"], [
    word("lumen", "Lumen", "The space inside a tube or hollow structure.", { variants: ["lumens"], support: "selective", topics: [3, 5, 6], example: "Blood flows through the lumen of a blood vessel." }),
    word("endothelium", "Endothelium", "A single layer of cells lining the inside of blood vessels.", { variants: ["endothelial"], support: "selective" }),
    word("arteriole", "Arteriole", "A small branch of an artery that leads towards capillaries.", { variants: ["arterioles"], topics: [3, 6] }),
    word("capillary", "Capillary (blood vessel)", "A very small blood vessel with a thin wall through which substances can pass between blood and tissues.", { variants: ["capillary", "capillaries"], match: { cue: "blood|vessel|arter|vein|tissue|exchange|flow|endothelium|pressure|alveol|lamell" }, topics: [2, 3, 6], sources: [aqa + specification[2], biology + "40-3-mammalian-heart-and-blood-vessels"] }),
    word("hydrostatic-pressure", "Hydrostatic pressure", "The pressure a fluid exerts against its surroundings.", { support: "selective", topics: [3, 6], here: "Blood pressure can push water and small solutes out through a capillary wall." }),
    word("interstitial-fluid", "Interstitial fluid", "The liquid in the spaces around tissue cells.", { variants: ["tissue fluid"], synonyms: ["intercellular fluid"], support: "selective", here: "It supplies cells with substances from the blood and receives wastes from cells. You may know it as tissue fluid." }),
    word("interstitial", "Interstitial", "Between the cells of a tissue.", { status: "additional", support: "selective", here: "Interstitial fluid is the liquid in the spaces around tissue cells." }),
    word("oncotic-pressure", "Oncotic pressure", "The part of osmotic pressure caused by large molecules, mainly proteins.", { status: "additional", support: "selective", catchup: "#catchup-a3-bwater", here: "Proteins in blood plasma help oppose loss of fluid from a capillary." }),
    word("lymph", "Lymph", "Fluid that enters lymph vessels from the spaces between tissue cells.", { here: "Lymph vessels return this fluid to the blood." }),
  ]);

  group(3, "xylem", ["leafgas", "osmosis", "water"], [biology + "30-5-transport-of-water-and-solutes-in-plants"], [
    word("xylem", "Xylem", "Plant tissue that transports water and mineral ions, mostly from the roots towards the leaves.", { topics: [3, 5] }),
    word("transpiration", "Transpiration", "Loss of water vapour from a plant, mainly through pores in the leaves.", { topics: [3, 5] }),
    word("transpiration-stream", "Transpiration stream", "The flow of water through a plant from the roots to the leaves, where water is lost to the air."),
    word("cohesion-tension-theory", "Cohesion–tension theory", "The idea that loss of water from leaves pulls a continuous column of water up the xylem.", { variants: ["cohesion-tension theory", "cohesion tension theory", "cohesion-tension mechanism"], support: "selective", here: "Water molecules attract one another, so pulling at the top can move the column below." }),
  ]);

  group(3, "phloem", ["xylem", "active"], [biology + "30-5-transport-of-water-and-solutes-in-plants"], [
    word("phloem", "Phloem", "Plant tissue that transports dissolved substances such as sucrose between different parts of a plant."),
    word("translocation", "Translocation (plants)", "Movement of dissolved sugars and other substances through the phloem.", { variants: ["translocation", "translocated"], match: { cue: "phloem|sucrose|plant|sieve|source|sink|aphid" }, support: "selective" }),
    word("sieve-tube-element", "Sieve tube element", "A living cell that joins others end to end to form a tube carrying dissolved substances through the phloem.", { variants: ["sieve tube elements", "sieve tube", "sieve tubes"] }),
    word("companion-cell", "Companion cell", "A cell alongside a sieve tube that helps it function and can help move sugars into or out of the phloem.", { variants: ["companion cells"] }),
    word("phloem-source", "Source (phloem)", "A part of a plant that supplies sugars to the phloem.", { variants: ["source", "sources"], match: { cue: "phloem|sieve|translocat|sucrose|sink" }, example: "A mature leaf can supply sugar made in photosynthesis." }),
    word("phloem-sink", "Sink (phloem)", "A part of a plant that takes up sugar from the phloem to use or store.", { variants: ["sink", "sinks"], match: { cue: "phloem|sieve|translocat|sucrose|source" }, support: "selective", example: "A growing bud uses sugar to build new tissue." }),
    word("mass-flow-hypothesis", "Mass flow hypothesis", "The idea that a pressure difference pushes dissolved substances through the phloem from sources to sinks.", { variants: ["mass-flow hypothesis", "pressure-flow hypothesis"], support: "selective" }),
    word("aphid-stylet", "Stylet (aphid)", "A slender feeding structure that an aphid pushes into a plant.", { status: "additional", variants: ["stylet", "stylets"], support: "selective", match: { cue: "aphid|sap|phloem|sieve|mouthpart" }, sources: ["https://pmc.ncbi.nlm.nih.gov/articles/PMC4552766/"], catchup: "#catchup-a3-pass3b" }),
  ]);

  group(4, "dnachrom", ["nucleic", "euk"], [biology + "14-2-dna-structure-and-sequencing", biology + "14-6-dna-repair"], [
    word("gene", "Gene", "A stretch of DNA containing instructions for making a protein or a functional RNA.", { variants: ["genes"], topics: [4, 7, 8] }),
    word("chromosome", "Chromosome", "A structure made from a long DNA molecule carrying genes and associated proteins.", { variants: ["chromosomes"], topics: [2, 4, 7, 8], here: "In the nucleus of a eukaryotic cell, proteins help package the DNA into chromosomes." }),
    word("histone", "Histone", "A protein that DNA wraps around to help package it in the nucleus.", { variants: ["histones"], topics: [4, 8], here: "Changes to histones can affect how easily a cell can use its genes." }),
    word("locus", "Locus", "The position of a gene or other DNA sequence on a chromosome.", { variants: ["loci"], support: "selective", topics: [4, 7, 8] }),
    word("allele", "Allele", "One version of a DNA sequence at a particular position. In inheritance questions it usually means one version of a gene.", { variants: ["alleles"], topics: [4, 7, 8] }),
  ]);

  group(4, "code", ["dnachrom", "proteins"], [biology + "15-1-the-genetic-code"], [
    word("triplet", "Triplet (DNA)", "A group of three bases that corresponds to a genetic instruction.", { variants: ["triplet", "triplets", "base triplet", "base triplets", "DNA triplet"], match: { cue: "DNA|base|code|codon|amino acid" }, here: "A triplet can correspond to an amino acid or a stop instruction." }),
    word("codon", "Codon", "A group of three bases in messenger RNA that specifies one amino acid or a stop instruction.", { variants: ["codons"], topics: [4, 8] }),
    word("degenerate-genetic-code", "Degenerate genetic code", "A genetic code in which more than one group of three bases can specify the same amino acid.", { variants: ["degenerate", "degeneracy"], match: { cue: "code|triplet|codon|amino acid|silent|substitution" }, support: "selective", example: "The messenger RNA codons GGU and GGC both specify glycine." }),
    word("non-overlapping-genetic-code", "Non-overlapping genetic code", "Bases are read in separate groups of three. Each base is part of only one group in that reading frame.", { variants: ["non-overlapping"], match: { cue: "genetic code|codon|triplet|bases" }, support: "selective" }),
  ]);

  group(4, "rnas", ["dnachrom"], [biology + "15-1-the-genetic-code", biology + "17-3-whole-genome-sequencing", biology + "17-5-genomics-and-proteomics"], [
    word("genome", "Genome", "The complete set of genetic material in a cell or organism, including DNA that does not code for proteins.", { variants: ["genomes"], topics: [4, 8] }),
    word("proteome", "Proteome", "The set of proteins a cell or organism can produce, or the proteins present in it under particular conditions.", { variants: ["proteomes"], support: "selective", topics: [4, 8], here: "Different cells can contain different proteins even though they have the same genome." }),
    word("messenger-rna", "Messenger RNA", "An RNA copy of genetic instructions that a ribosome can read to make a protein chain.", { variants: ["mRNA"], topics: [4, 8] }),
    word("transfer-rna", "Transfer RNA", "An RNA molecule that brings an amino acid to the ribosome and matches it to the messenger RNA instruction.", { variants: ["tRNA"], topics: [4, 8] }),
  ]);

  group(4, "transcription", ["rnas", "replication"], [biology + "15-3-eukaryotic-transcription", biology + "15-4-rna-processing-in-eukaryotes"], [
    word("transcription", "Transcription", "Making an RNA copy from the base sequence of a DNA strand.", { variants: ["transcribe", "transcribed", "transcribing"], topics: [4, 8], here: "In eukaryotes the first RNA copy of a protein-coding gene is usually edited before it is translated." }),
    word("rna-polymerase", "RNA polymerase", "An enzyme that joins RNA nucleotides using a DNA strand as the template.", { topics: [4, 8] }),
    word("intron", "Intron", "A section copied from DNA into the first RNA transcript but removed when that RNA is spliced.", { variants: ["introns"], support: "selective", topics: [4, 8] }),
    word("exon", "Exon", "A section of the first RNA transcript that stays in the mature RNA after splicing.", { variants: ["exons"], support: "selective", topics: [4, 8], here: "Exons can include parts that do not specify amino acids." }),
    word("rna-splicing", "RNA splicing", "Removing introns from an RNA copy and joining the remaining sections together.", { variants: ["splicing", "spliced"], match: { cue: "RNA|intron|exon|transcript" }, support: "selective", topics: [4, 8] }),
  ]);

  group(4, "translation", ["transcription", "code", "rnas"], [biology + "15-5-ribosomes-and-protein-synthesis"], [
    word("translation", "Translation (protein synthesis)", "Using the sequence in messenger RNA to join amino acids in the right order and make a protein chain.", { variants: ["translation", "translated", "translating"], match: { cue: "RNA|ribosome|codon|polypeptide|protein|transcription|amino acid|gene" }, topics: [4, 8] }),
    word("anticodon", "Anticodon", "A group of three bases on a transfer RNA that pairs with the matching codon on messenger RNA.", { variants: ["anticodons"], support: "selective" }),
  ]);

  group(4, "mutation", ["code", "replication"], [biology + "14-6-dna-repair", biology + "19-2-population-genetics"], [
    word("gene-mutation", "Gene mutation", "A change in the sequence of DNA bases in a gene.", { variants: ["gene mutations", "mutation", "mutations"], match: { cue: "gene|DNA|base|allele|codon|protein|amino acid|mutagen|organism|selection" }, topics: [4, 7, 8] }),
    word("base-substitution", "Base substitution", "A change in which one base in DNA is replaced with a different base.", { variants: ["substitution", "substitutions", "base substitutions"], match: { cue: "DNA|base|mutation|codon|amino acid|triplet" }, topics: [4, 8] }),
    word("base-deletion", "Base deletion", "Loss of one or more bases from a DNA sequence.", { variants: ["deletion", "deletions", "base deletions"], match: { cue: "DNA|base|mutation|codon|amino acid|triplet|reading frame" }, topics: [4, 8] }),
    word("frameshift", "Frameshift", "A change in how bases are grouped into sets of three when the instructions for a protein are read.", { variants: ["frame shift", "frameshift mutation", "frameshift mutations"], support: "selective", here: "Adding or removing a number of bases that is not a multiple of three can change the groups that follow.", topics: [4, 8] }),
    word("mutagen", "Mutagen", "Something that increases the chance of a change in DNA.", { variants: ["mutagens", "mutagenic", "mutagenic agent", "mutagenic agents"], support: "selective", example: "Ultraviolet light can act as a mutagen.", topics: [4, 8] }),
  ]);

  group(4, "chromut", ["dnachrom", "meiosis"], [biology + "13-2-chromosomal-basis-of-inherited-disorders"], [
    word("non-disjunction", "Non-disjunction", "Failure of chromosomes or sister chromatids to separate during cell division.", { variants: ["nondisjunction"], support: "selective", here: "If this happens during meiosis, a gamete can end up with an extra or missing chromosome." }),
    word("polyploid", "Polyploid", "Having more than two complete sets of chromosomes.", { variants: ["polyploidy"], support: "selective" }),
  ]);

  group(4, "meiosis", ["mitosis", "dnachrom"], [biology + "11-1-the-process-of-meiosis"], [
    word("meiosis", "Meiosis", "Two divisions that produce nuclei with half the original number of chromosome sets.", { variants: ["meiotic"], topics: [4, 7], here: "In animals this process makes the cells that form gametes." }),
    word("gamete", "Gamete", "A reproductive cell with one set of chromosomes. Two gametes can fuse at fertilisation.", { variants: ["gametes"], topics: [4, 7], example: "Sperm cells and egg cells are gametes." }),
    word("haploid", "Haploid", "Having one complete set of chromosomes.", { topics: [4, 7] }),
    word("diploid", "Diploid", "Having two complete sets of chromosomes.", { topics: [4, 7] }),
    word("homologous-chromosomes", "Homologous chromosomes", "Two chromosomes carrying the same genes at corresponding positions. They can carry different versions of those genes.", { variants: ["homologous chromosome", "homologous pairs", "homologous pair"], support: "selective", topics: [4, 7] }),
  ]);

  group(4, "meiosisvar", ["meiosis"], [biology + "11-1-the-process-of-meiosis"], [
    word("crossing-over", "Crossing over", "Exchange of corresponding pieces of DNA between two paired chromosomes during meiosis.", { variants: ["crossing-over"], here: "The exchange happens between chromatids from different chromosomes of the pair. It can create new combinations of alleles." }),
    word("independent-segregation", "Independent segregation", "The members of each chromosome pair separate independently of the other pairs in meiosis.", { variants: ["independent assortment", "random segregation"], support: "selective", topics: [4, 7] }),
  ]);

  group(4, "natsel", ["dnachrom", "mutation", "meiosisvar"], [biology + "18-1-understanding-evolution", biology + "19-1-population-evolution"], [
    word("genetic-diversity", "Genetic diversity", "The variety of inherited DNA differences within a group, such as the number of different alleles in a population.", { topics: [4, 7] }),
    word("natural-selection", "Natural selection", "Individuals with certain inherited features tend to leave more offspring in a particular environment. Over generations those features can become more common.", { topics: [4, 7] }),
    word("selection-pressure", "Selection pressure", "An aspect of the environment that affects which inherited features make leaving offspring more likely.", { variants: ["selection pressures", "selective pressure"], support: "selective", topics: [4, 7] }),
    word("adaptation", "Adaptation (evolution)", "An inherited feature that increases an organism’s chance of surviving and reproducing in a particular environment.", { variants: ["adaptation", "adaptations", "adapted"], match: { cue: "organism|surviv|reproduc|species|plant|animal|selection|environment|feature" }, topics: [3, 4, 7] }),
  ]);

  group(4, "selection", ["natsel"], [biology + "19-3-adaptive-evolution"], [
    word("directional-selection", "Directional selection", "Natural selection in which individuals near one end of a range of inherited features tend to leave more offspring.", { topics: [4, 7] }),
    word("stabilising-selection", "Stabilising selection", "Natural selection in which individuals with intermediate values of an inherited feature tend to leave more offspring than those at the extremes.", { variants: ["stabilizing selection"], topics: [4, 7] }),
  ]);

  group(4, "aseptic", ["prok", "natsel"], [practical], [
    word("aseptic-technique", "Aseptic technique", "Working in ways that reduce the chance that unwanted microorganisms enter a sample or spread from it.", { variants: ["aseptic techniques", "aseptic"], support: "selective" }),
    word("antimicrobial", "Antimicrobial", "An agent that kills microorganisms or slows their growth.", { variants: ["antimicrobials", "antimicrobial agent", "antimicrobial agents"], support: "selective" }),
    word("zone-of-inhibition", "Zone of inhibition", "An area where a microorganism has failed to grow because of an agent being tested.", { variants: ["zones of inhibition", "inhibition zone"], support: "selective" }),
  ]);

  group(4, "species", [], [biology + "18-2-formation-of-new-species"], [
    word("species", "Species", "A group of organisms that can usually breed with one another and produce fertile offspring.", { topics: [4, 7], here: "This definition is useful for organisms that reproduce sexually." }),
    word("courtship", "Courtship", "Behaviour that helps members of a species recognise and attract a potential mate.", { variants: ["courtship behaviour", "courtship behavior"] }),
  ]);

  group(4, "taxonomy", ["species", "natsel"], [biology + "20-1-organizing-life-on-earth", biology + "20-2-determining-evolutionary-relationships"], [
    word("taxonomy", "Taxonomy", "The study of naming and classifying organisms.", { support: "selective" }),
    word("taxon", "Taxon", "A named group in a system that classifies organisms.", { variants: ["taxa"], support: "selective", example: "A species or a family can be a taxon." }),
    word("phylogeny", "Phylogeny", "The evolutionary history and relationships of an organism or group of organisms.", { support: "selective" }),
    word("phylogenetic-tree", "Phylogenetic tree", "A branching diagram showing how groups of organisms are thought to be related through common ancestors.", { variants: ["phylogenetic trees"] }),
    word("phylogenetic-classification", "Phylogenetic classification", "Grouping organisms by their evolutionary relationships.", { support: "selective" }),
    word("binomial-name", "Binomial name", "A scientific name made of two parts. The first is the genus name and the second identifies the species within that genus.", { variants: ["binomial names", "binomial system", "binomial nomenclature"] }),
  ]);

  group(4, "biodiv", ["species"], [biology + "47-1-the-biodiversity-crisis"], [
    word("biodiversity", "Biodiversity", "The variety of life in an area. It can include variety within species, between species and between habitats.", { topics: [4, 7] }),
    word("species-richness", "Species richness", "The number of different species in a place.", { topics: [4, 7], here: "Richness does not depend on how many individuals of each species are present." }),
    word("species-diversity", "Species diversity", "The variety of species in a community, taking into account both the number of species and how many individuals of each are present.", { topics: [4, 7] }),
    word("index-of-diversity", "Index of diversity", "A value that combines how many species are present and how evenly individuals are spread among them.", { variants: ["diversity index"], support: "selective" }),
  ]);
}());

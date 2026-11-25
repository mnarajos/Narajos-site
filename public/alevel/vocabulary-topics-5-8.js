(function () {
  "use strict";

  const reference = window.ALevelVocabularyData ??= [];
  const aqa = "https://www.aqa.org.uk/subjects/biology/a-level/biology-7402/specification/subject-content/";
  const pmt = "https://pmt.physicsandmathstutor.com/download/Biology/A-level/Notes/AQA/";
  const biology = "https://openstax.org/books/biology-2e/pages/";
  const genomics = "https://www.genome.gov/genetics-glossary";
  const practical = "https://www.aqa.org.uk/subjects/biology/a-level/biology-7402/specification/practical-assessment";
  const practicalHandbook = "https://filestore.aqa.org.uk/resources/biology/AQA-7401-7402-PHBK.PDF";
  const specifications = {
    5: ["energy-transfers-in-and-between-organisms-a-level-only", "5-Energy-Transfers-In-and-Between-Organisms"],
    6: ["organisms-respond-to-changes-in-their-internal-and-external-environments-a-level-only", "6-Responding-to-Changes-in-the-Environment"],
    7: ["genetics-populations-evolution-and-ecosystems-a-level-only", "7-Genetics-Populations-Evolution-and-Ecosystems"],
    8: ["the-control-of-gene-expression-a-level-only", "8-Control-of-Gene-Expression"]
  };

  // Topics and prerequisite concepts describe curriculum placement. Support separately
  // describes when an inline definition is likely to be useful.
  function add(topic, lesson, prerequisites, reviewedAgainst, entries) {
    const [specification, inventory] = specifications[topic];
    const sources = [aqa + specification, pmt + inventory + "/Definitions.pdf", ...reviewedAgainst];
    for (const entry of entries) {
      reference.push({
        topics: [topic],
        prerequisites,
        status: "core",
        support: "increased",
        sources,
        catchup: "#catchup-a" + topic + "-" + lesson,
        ...entry
      });
    }
  }

  // 3.5 Energy transfers in and between organisms
  add(5, "lightdep", ["a2-euk"], [biology + "8-2-the-light-dependent-reactions-of-photosynthesis"], [
    {id: "thylakoid", term: "Thylakoid", variants: ["thylakoids", "thylakoid membrane", "thylakoid membranes"],
      meaning: "A flattened membrane sac inside a chloroplast.", here: "The reactions that use light take place on its membrane."},
    {id: "granum", term: "Granum", variants: ["grana"],
      meaning: "A stack of flattened membrane sacs called thylakoids inside a chloroplast.", example: "One granum, several grana."},
    {id: "stroma", term: "Stroma", support: "selective",
      meaning: "The fluid inside a chloroplast around the stacks of thylakoids.", here: "This is where the Calvin cycle takes place."},
    {id: "chlorophyll", term: "Chlorophyll", meaning: "A light-absorbing pigment used in photosynthesis."},
    {id: "photosynthetic-pigment", term: "Photosynthetic pigment", variants: ["photosynthetic pigments"], status: "prerequisite",
      meaning: "A substance that absorbs particular wavelengths of light.", here: "In photosynthesis, these pigments capture light energy."},
    {id: "light-dependent-reaction", term: "Light-dependent reaction", variants: ["light-dependent reactions", "light dependent reaction"],
      meaning: "A stage of photosynthesis that uses light energy to make ATP and reduced NADP.", here: "It takes place on thylakoid membranes."},
    {id: "photoionisation", term: "Photoionisation", variants: ["photoionization"], support: "selective",
      meaning: "Light gives an electron enough energy to leave a molecule.", here: "Chlorophyll loses an electron and becomes positively charged."},
    {id: "photolysis", term: "Photolysis", support: "selective",
      meaning: "The splitting of a molecule using light energy.", here: "In photosynthesis it is water that splits, providing electrons, hydrogen ions and oxygen."},
    {id: "proton", term: "Proton", variants: ["protons", "hydrogen ion", "hydrogen ions"], status: "prerequisite", topics: [5, 6],
      meaning: "A positively charged particle in an atom’s nucleus.", here: "A hydrogen ion, H⁺, is a hydrogen atom that has lost its electron. It is often called a proton."},
    {id: "reduced-nadp", term: "Reduced NADP", synonyms: ["NADPH"],
      meaning: "The electron-carrying form of NADP that has gained electrons and hydrogen.", here: "It supplies electrons for the Calvin cycle."}
  ]);

  add(5, "chemios", ["a5-lightdep", "a2-active"], [biology + "7-1-energy-in-living-systems"], [
    {id: "electron-transfer-chain", term: "Electron transfer chain", variants: ["electron transfer chains", "electron transport chain", "electron transport chains"], topics: [5, 8],
      meaning: "A series of molecules that pass electrons from one to the next.", here: "In respiration and photosynthesis the transfers help build up a difference in proton concentration across a membrane."},
    {id: "proton-gradient", term: "Proton gradient", variants: ["proton concentration gradient", "proton gradients"],
      meaning: "A difference in hydrogen ion concentration between two places.", here: "In chemiosmosis the two places are on opposite sides of a membrane."},
    {id: "chemiosmosis", term: "Chemiosmosis", variants: ["chemiosmotic theory"], support: "selective",
      meaning: "The movement of hydrogen ions through a membrane down their gradient.", here: "Hydrogen ions move through ATP synthase, providing the energy for it to make ATP."},
    {id: "electron-acceptor", term: "Electron acceptor", variants: ["electron acceptors", "final electron acceptor"],
      meaning: "A substance that takes up electrons.", here: "An electron acceptor is reduced when it gains the electrons."},
    {id: "reduction-redox", term: "Reduction (electron transfer)", variants: ["reduction", "reduction reaction"], status: "prerequisite",
      meaning: "The gain of electrons by a substance.", example: "NADP is reduced when it takes up electrons.",
      match: {cue: "\\b(?:NADP?|FAD|DCPIP|electron|pyruvate|phosphorylation|redox|GP)\\b"}},
    {id: "oxidation-redox", term: "Oxidation (electron transfer)", variants: ["oxidation", "oxidation reaction"], status: "prerequisite",
      meaning: "The loss of electrons from a substance.", example: "An electron carrier is oxidised when it passes on its electrons.",
      match: {cue: "\\b(?:NADP?|FAD|DCPIP|electron|pyruvate|phosphorylation|redox)\\b"}}
  ]);

  add(5, "calvin", ["a5-lightdep"], [biology + "8-3-using-light-energy-to-make-organic-molecules"], [
    {id: "calvin-cycle", term: "Calvin cycle", variants: ["light-independent reaction", "light-independent reactions", "light independent reaction"],
      meaning: "A set of reactions that uses carbon dioxide, ATP and reduced NADP to make small sugar molecules in a chloroplast."},
    {id: "carbon-fixation", term: "Carbon fixation", variants: ["fixed carbon", "fixes carbon dioxide", "carbon dioxide is fixed"],
      meaning: "Taking carbon from carbon dioxide and making it part of an organic molecule.", here: "In the Calvin cycle, rubisco helps attach carbon dioxide to RuBP."},
    {id: "rubisco", term: "Rubisco",
      meaning: "The enzyme that helps carbon dioxide react with RuBP at the start of the Calvin cycle."},
    {id: "rubp", term: "Ribulose bisphosphate", variants: ["RuBP", "ribulose-1,5-bisphosphate"],
      meaning: "The five-carbon molecule that combines with carbon dioxide in the Calvin cycle.", here: "The cycle makes new RuBP so it can continue."},
    {id: "glycerate-phosphate", term: "Glycerate 3-phosphate", variants: ["glycerate-3-phosphate", "glycerate phosphate", "GP"],
      meaning: "A three-carbon molecule formed when carbon dioxide reacts with RuBP.", here: "ATP and reduced NADP help convert it to triose phosphate.",
      match: {cue: "\\b(?:RuBP|triose|Calvin|rubisco|stroma|chloroplasts?|NADP)\\b"}},
    {id: "triose-phosphate", term: "Triose phosphate", variants: ["TP", "triose phosphates"],
      meaning: "A three-carbon sugar with an attached phosphate group.", here: "Some is used to make other sugars and some to make RuBP again.",
      match: {cue: "\\b(?:RuBP|glycerate|Calvin|rubisco|stroma|chloroplasts?|NADP|triose phosphate)\\b"}}
  ]);

  add(5, "limiting", ["a5-calvin"], [biology + "8-3-using-light-energy-to-make-organic-molecules"], [
    {id: "limiting-factor", term: "Limiting factor", variants: ["limiting factors"],
      meaning: "The condition currently holding a process back.", here: "If light is limiting photosynthesis, increasing light can raise the rate until another condition limits it."}
  ]);

  add(5, "chromat", ["a5-lightdep"], [practical, practicalHandbook], [
    {id: "chromatography", term: "Chromatography", variants: ["paper chromatography"],
      meaning: "A way to separate a mixture by letting it travel with a liquid or gas over a material that stays still."},
    {id: "solvent-front", term: "Solvent front", variants: ["solvent fronts"], support: "selective",
      meaning: "The furthest point reached by the solvent as it moves through the paper."},
    {id: "origin-line", term: "Origin line", variants: ["pencil line", "baseline"], synonyms: ["start line"],
      meaning: "The line where samples are first placed for chromatography.", here: "Measure how far each spot moved from this line.",
      match: {cue: "\\b(?:chromatography|chromatogram|Rf|solvent|pigments?|spot)\\b"}},
    {id: "rf-value", term: "Rf value", variants: ["Rf", "Rf values", "retention factor"],
      meaning: "The fraction of the solvent’s travel distance that a spot travelled.", here: "Measure both distances from the origin line. The ratio has no units."},
    {id: "chromatogram", term: "Chromatogram", variants: ["chromatograms"], support: "selective",
      meaning: "The pattern of spots or bands produced when chromatography separates a mixture."},
    {id: "mobile-phase", term: "Mobile phase", meaning: "The liquid or gas that moves during chromatography and carries the sample with it."},
    {id: "stationary-phase", term: "Stationary phase", meaning: "The material that stays in place during chromatography. It interacts differently with each substance in the sample."}
  ]);

  add(5, "dcpip", ["a5-lightdep", "a2-osmosis"], [practical, practicalHandbook, biology + "8-2-the-light-dependent-reactions-of-photosynthesis"], [
    {id: "dcpip", term: "DCPIP", support: "selective",
      meaning: "A dye that can take up electrons. Under the conditions of this practical, it changes from blue to colourless when reduced."},
    {id: "dehydrogenase", term: "Dehydrogenase", variants: ["dehydrogenases", "dehydrogenase activity"], support: "selective",
      meaning: "An enzyme that helps remove hydrogen from a molecule, often transferring its electrons to a carrier."},
    {id: "buffer", term: "Buffer solution", variants: ["buffer", "buffers", "buffered", "buffer solutions"], status: "prerequisite", topics: [1, 5],
      meaning: "A solution that resists changes in pH when small amounts of acid or alkali are added."}
  ]);

  add(5, "glycolysis", ["a1-atp"], [biology + "7-2-glycolysis", biology + "7-3-oxidation-of-pyruvate-and-the-citric-acid-cycle"], [
    {id: "glycolysis", term: "Glycolysis",
      meaning: "A series of reactions that split glucose into two three-carbon molecules of pyruvate.", here: "This happens in the cytoplasm and makes a small net gain of ATP."},
    {id: "hexose-bisphosphate", term: "Hexose bisphosphate", status: "additional", support: "selective",
      meaning: "A six-carbon sugar with two phosphate groups attached.", here: "A form of this sugar is split into smaller molecules in glycolysis."},
    {id: "pyruvate", term: "Pyruvate", meaning: "The three-carbon substance made when glucose is split in glycolysis."},
    {id: "nad", term: "NAD", variants: ["reduced NAD"], synonyms: ["nicotinamide adenine dinucleotide"],
      meaning: "A molecule that carries electrons between reactions.", here: "NAD becomes reduced NAD when it gains electrons and hydrogen."},
    {id: "substrate-level-phosphorylation", term: "Substrate-level phosphorylation", variants: ["substrate level phosphorylation"], support: "selective",
      meaning: "Making ATP by transferring a phosphate group straight from another molecule to ADP.",
      here: "This makes some of the ATP in glycolysis and the Krebs cycle."}
  ]);

  add(5, "anaerobic", ["a5-glycolysis"], [biology + "7-5-metabolism-without-oxygen"], [
    {id: "anaerobic-respiration", term: "Anaerobic respiration", variants: ["anaerobic"], status: "prerequisite",
      meaning: "Releasing energy from a fuel without using oxygen.", here: "At AQA level, the term includes fermentation in animals and yeast, where recycling NAD lets glycolysis continue.",
      match: {cue: "\\b(?:respir\w*|yeast|oxygen|glycolysis|lactate|ethanol|pyruvate|ATP)\\b"}},
    {id: "lactate", term: "Lactate", topics: [5, 6], meaning: "A three-carbon substance made when animal cells convert pyruvate without using oxygen.", here: "The reaction recycles NAD so glycolysis can continue."},
    {id: "fermentation", term: "Fermentation", variants: ["ferment", "ferments"], meaning: "Reactions that recycle the electron carrier NAD without using oxygen, allowing glycolysis to continue."}
  ]);

  add(5, "krebs", ["a5-glycolysis"], [biology + "7-3-oxidation-of-pyruvate-and-the-citric-acid-cycle"], [
    {id: "link-reaction", term: "Link reaction", meaning: "The step between glycolysis and the Krebs cycle that converts pyruvate to acetyl coenzyme A."},
    {id: "acetyl-coa", term: "Acetyl coenzyme A", variants: ["acetyl-CoA", "acetyl CoA"], support: "selective",
      meaning: "A molecule that carries a two-carbon acetyl group to other reactions.", here: "The acetyl group enters the Krebs cycle."},
    {id: "mitochondrial-matrix", term: "Mitochondrial matrix", variants: ["matrix of the mitochondrion"], meaning: "The enclosed space inside the inner membrane of a mitochondrion.", here: "The link reaction and Krebs cycle happen here."},
    {id: "decarboxylation", term: "Decarboxylation", variants: ["decarboxylated", "decarboxylate"], support: "selective",
      meaning: "Removal of part of a molecule as carbon dioxide."},
    {id: "krebs-cycle", term: "Krebs cycle", synonyms: ["citric acid cycle"], meaning: "A series of reactions that transfers electrons from fuel molecules to carriers, releases carbon dioxide and produces a little ATP."},
    {id: "coenzyme", term: "Coenzyme", variants: ["coenzymes"], support: "selective", meaning: "A small organic molecule that helps an enzyme carry out a reaction.", example: "NAD acts as a coenzyme in some respiration reactions."},
    {id: "fad", term: "FAD", variants: ["reduced FAD"], meaning: "A molecule that can collect and carry electrons and hydrogen during respiration."}
  ]);

  add(5, "oxphos", ["a5-krebs", "a5-chemios"], [biology + "7-4-oxidative-phosphorylation"], [
    {id: "oxidative-phosphorylation", term: "Oxidative phosphorylation", support: "selective",
      meaning: "Making ATP using energy from electrons passed along a chain of carriers.", here: "In aerobic respiration, oxygen accepts the electrons at the end of the chain."},
    {id: "intermembrane-space", term: "Intermembrane space", variants: ["inter-membrane space"],
      meaning: "The narrow space between two membranes.", here: "In mitochondrial respiration, hydrogen ions are moved into the space between the inner and outer membranes."},
    {id: "uncoupler", term: "Uncoupler", variants: ["uncouple", "uncouples", "uncoupling"], status: "additional", support: "selective",
      meaning: "A substance that lets electron transfer continue while reducing how much ATP is made.", here: "It can let hydrogen ions cross the membrane without passing through ATP synthase."}
  ]);

  add(5, "substrates", ["a5-krebs"], [biology + "7-6-connections-of-carbohydrate-protein-and-lipid-metabolic-pathways"], [
    {id: "respiratory-substrate", term: "Respiratory substrate", variants: ["respiratory substrates"],
      meaning: "A substance that a cell can break down during respiration to provide energy.", example: "Glucose and fatty acids can serve as respiratory substrates."},
    {id: "deamination", term: "Deamination", variants: ["deaminated", "deaminate"], support: "selective",
      meaning: "Removing the amino group from an amino acid.", here: "The rest of the molecule may then be used in respiration."}
  ]);

  add(5, "respiro", ["a5-anaerobic"], [practical, practicalHandbook], [
    {id: "respirometer", term: "Respirometer", variants: ["respirometers"], support: "selective",
      meaning: "Apparatus for measuring gas changes associated with respiration.", here: "With a carbon dioxide absorber, the change in gas volume can be used to estimate oxygen uptake."},
    {id: "soda-lime", term: "Soda lime", status: "additional", support: "selective",
      meaning: "A solid mixture that absorbs carbon dioxide gas.", here: "In a respirometer it removes carbon dioxide released by the organisms."},
    {id: "methylene-blue", term: "Methylene blue", variants: ["methylene-blue"], status: "additional", support: "selective",
      meaning: "A blue dye that loses its colour as it gains electrons.", here: "The time taken for the dye to fade can be used to compare respiration under the same measurement conditions."}
  ]);

  add(5, "biomass", [], [biology + "46-2-energy-flow-through-ecosystems"], [
    {id: "biomass", term: "Biomass", topics: [5, 7],
      meaning: "The mass of living material in an organism, group or area.", here: "Dry mass is often used so that differences in water content do not affect the comparison."},
    {id: "calorimetry", term: "Calorimetry", variants: ["calorimeter"], support: "selective",
      meaning: "Measuring energy transferred as heat.", here: "Burning a sample and measuring the rise in water temperature can estimate its chemical energy store."},
    {id: "photoautotroph", term: "Photoautotroph", variants: ["photoautotrophs", "photoautotrophic"], support: "selective",
      meaning: "An organism that uses light energy to make organic molecules from carbon dioxide.", example: "Green plants and many algae are photoautotrophs."},
    {id: "trophic-level", term: "Trophic level", variants: ["trophic levels"],
      meaning: "A feeding position in a food chain, counted from the producers.", example: "A plant is at the first trophic level and a herbivore that eats it is at the second."}
  ]);

  add(5, "productivity", ["a5-biomass"], [biology + "46-2-energy-flow-through-ecosystems"], [
    {id: "gross-primary-production", term: "Gross primary production", variants: ["GPP"],
      meaning: "The total chemical energy stored by producers through photosynthesis over the period being considered, before allowing for respiration."},
    {id: "net-primary-production", term: "Net primary production", variants: ["NPP"],
      meaning: "The chemical energy remaining in producers’ new biomass after their respiratory losses over a given period.",
      here: "It is available for growth and can be passed to organisms that feed on the producers."},
    {id: "net-production-consumer", term: "Net production of consumers", variants: ["net production", "secondary production"],
      meaning: "The chemical energy that a consumer can store as new biomass after losses in waste and respiration.",
      match: {cue: "\\b(?:consumer\w*|faeces|feces|urine|secondary|ingest\w*)\\b"}},
    {id: "ecosystem-productivity", term: "Productivity (ecosystems)", variants: ["productivity", "primary productivity", "secondary productivity"],
      meaning: "How fast new biomass or its stored energy is produced.", here: "Productivity is a rate and is measured per unit time.",
      match: {cue: "\\b(?:biomass|production|trophic|ecosystem|photosynthesis|consumers?|GPP|NPP)\\b"}}
  ]);

  add(5, "nitrogen", ["a5-biomass"], [biology + "46-3-biogeochemical-cycles"], [
    {id: "saprobiont", term: "Saprobiont", variants: ["saprobionts", "saprotroph", "saprotrophs", "saprobiontic", "saprotrophic"], synonyms: ["decomposer"], support: "selective",
      meaning: "An organism that feeds on dead material by releasing enzymes outside itself and absorbing the soluble products."},
    {id: "ammonification", term: "Ammonification", support: "selective",
      meaning: "The release of ammonia or ammonium as decomposers break down nitrogen-containing compounds in dead material and waste."},
    {id: "nitrification", term: "Nitrification", variants: ["nitrifying bacteria"], support: "selective",
      meaning: "The conversion of ammonium to nitrite and then to nitrate by microorganisms.", here: "The conversions usually take place where oxygen is available."},
    {id: "nitrogen-fixation", term: "Nitrogen fixation", variants: ["nitrogen fixing", "nitrogen-fixing bacteria"], support: "selective",
      meaning: "The conversion of nitrogen gas into ammonia.", here: "Some microorganisms, including bacteria in legume root nodules, carry out this process."},
    {id: "denitrification", term: "Denitrification", variants: ["denitrifying bacteria"], support: "selective",
      meaning: "The conversion of nitrate to nitrogen gases by microorganisms.", here: "It usually takes place where very little oxygen is available."},
    {id: "nitrate", term: "Nitrate", variants: ["nitrates", "nitrate ions"],
      meaning: "A negatively charged ion containing nitrogen and oxygen.", here: "Plants take up nitrate from soil and can use its nitrogen to make amino acids."},
    {id: "root-nodule", term: "Root nodule", variants: ["root nodules"], meaning: "A small swelling on some plant roots that houses microbes.", here: "In legumes, the microbes fix nitrogen."}
  ]);

  add(5, "phosphorus", ["a5-nitrogen"], [biology + "46-3-biogeochemical-cycles"], [
    {id: "mycorrhiza", term: "Mycorrhiza", variants: ["mycorrhizae", "mycorrhizal"], support: "selective",
      meaning: "An association between a fungus and the roots of a plant.", here: "Fungal threads can help the plant take up water and mineral ions. The plant supplies sugars."},
    {id: "hypha", term: "Hypha", variants: ["hyphae", "fungal threads"], status: "additional", support: "selective",
      meaning: "One of the fine threads that make up the body of a fungus.", example: "Hyphae is the plural."},
    {id: "weathering", term: "Weathering", status: "prerequisite",
      meaning: "The breaking down of rock in place by physical, chemical or biological processes.", here: "In the phosphorus cycle it helps release phosphate from rocks."}
  ]);

  add(5, "fertil", ["a5-nitrogen", "a5-phosphorus"], [biology + "46-3-biogeochemical-cycles"], [
    {id: "leaching", term: "Leaching", variants: ["leach", "leached"], support: "selective",
      meaning: "Water moving through a material carries dissolved substances out of it.", here: "Rain can move nitrate from soil into groundwater, streams or lakes."},
    {id: "eutrophication", term: "Eutrophication", support: "selective",
      meaning: "An increase in nutrient levels in water, often leading to rapid growth of algae.", here: "When the algae and other organisms die, their decomposition can use up oxygen in the water."},
    {id: "algal-bloom", term: "Algal bloom", variants: ["algal blooms"], status: "additional", support: "selective",
      meaning: "A rapid increase in algae in a body of water."}
  ]);

  add(5, "pass5b", ["a5-lightdep", "a5-productivity"], ["https://oceanservice.noaa.gov/facts/coral_bleach.html"], [
    {id: "coral-bleaching", term: "Coral bleaching", variants: ["bleached corals", "bleaching"], status: "additional", support: "selective",
      meaning: "A coral turns pale or white when it loses many of the algae that live in its tissues.",
      here: "It can survive for a time if conditions improve and the algae return.",
      match: {cue: "\\b(?:corals?|sea|reef|algae|bleaching event)\\b"}}
  ]);

  // 3.6 Responses to internal and external changes
  add(6, "tropisms", [], [biology + "30-6-plant-sensory-systems-and-responses"], [
    {id: "stimulus", term: "Stimulus", variants: ["stimuli"], status: "prerequisite",
      meaning: "A change an organism can detect, inside or outside its body.", example: "Light reaching a shoot from one direction is a stimulus for growth."},
    {id: "tropism", term: "Tropism", variants: ["tropisms"],
      meaning: "Growth towards or away from the direction of a stimulus.", here: "Shoots often grow towards light."},
    {id: "phototropism", term: "Phototropism", meaning: "Growth in response to the direction light comes from."},
    {id: "gravitropism", term: "Gravitropism", synonyms: ["geotropism"], meaning: "Growth in response to the direction of gravity."},
    {id: "auxin", term: "Indoleacetic acid", variants: ["indole-3-acetic acid", "IAA", "auxin"], support: "selective",
      meaning: "A plant growth regulator that can change how much cells lengthen.", here: "IAA is a type of auxin. The same concentration can affect growth in roots and shoots differently."},
    {id: "elongation", term: "Cell elongation", variants: ["elongate", "elongates", "elongation"], status: "prerequisite", support: "selective",
      meaning: "A cell becoming longer.",
      match: {cue: "\\b(?:cells?|growth|root|shoot|IAA|auxin)\\b"}}
  ]);

  add(6, "taxes", ["a6-tropisms"], [practical, practicalHandbook, biology + "45-7-behavioral-biology-proximate-and-ultimate-causes-of-behavior"], [
    {id: "taxis", term: "Taxis", variants: ["taxes", "phototaxis", "chemotaxis"], support: "selective",
      meaning: "Movement towards or away from a stimulus.", here: "Phototaxis is directed by light. Chemotaxis is directed by a chemical.",
      match: {cue: "\\b(?:stimulus|stimuli|movement|kines[ie]s|organisms?|phototaxis|chemotaxis|taxi[sc])\\b"}},
    {id: "kinesis", term: "Kinesis", variants: ["kineses"], support: "selective",
      meaning: "A change in speed or how often an organism turns in response to a stimulus.", here: "The movement itself has no fixed direction towards or away from the stimulus."},
    {id: "choice-chamber", term: "Choice chamber", status: "additional", meaning: "An apparatus that offers an organism a choice between different conditions, such as light and shade."},
    {id: "habituation", term: "Habituation", status: "additional", support: "selective",
      meaning: "A smaller response after a stimulus has been repeated.", example: "An animal may gradually stop responding to a harmless repeated sound."}
  ]);

  add(6, "reflex", ["a6-tropisms"], [biology + "35-2-how-neurons-communicate"], [
    {id: "reflex-arc", term: "Reflex arc", variants: ["reflex arcs"], meaning: "The pathway a signal takes from a receptor to the part of the body that produces a reflex response."},
    {id: "effector", term: "Effector", variants: ["effectors"], support: "selective",
      meaning: "A part of the body that carries out a response.", example: "A muscle can contract, or a gland can release a substance."},
    {id: "sensory-neurone", term: "Sensory neurone", variants: ["sensory neurones", "sensory neuron", "sensory neurons"],
      meaning: "A nerve cell that carries signals from a receptor towards the brain or spinal cord."},
    {id: "relay-neurone", term: "Relay neurone", variants: ["relay neurones", "intermediate neurone", "intermediate neurones", "interneurone"],
      meaning: "A nerve cell that passes signals between other nerve cells within the brain or spinal cord."},
    {id: "motor-neurone", term: "Motor neurone", variants: ["motor neurones", "motor neuron", "motor neurons"],
      meaning: "A nerve cell that carries signals from the brain or spinal cord to a muscle or another effector."}
  ]);

  add(6, "pacinian", ["a6-reflex"], [biology + "36-1-sensory-processes"], [
    {id: "sensory-receptor", term: "Sensory receptor", variants: ["sensory receptors"], meaning: "A cell or nerve ending that detects a particular kind of change, such as light or pressure."},
    {id: "pacinian-corpuscle", term: "Pacinian corpuscle", variants: ["Pacinian corpuscles"], support: "selective",
      meaning: "A pressure receptor with layered tissue wrapped round a nerve ending.", here: "Pressure distorts the ending and opens ion channels."},
    {id: "generator-potential", term: "Generator potential", variants: ["generator potentials"], support: "selective",
      meaning: "A change in voltage across the membrane of a sensory receptor when it detects a stimulus.", here: "Its size can vary with the strength of the stimulus."},
    {id: "transducer", term: "Transducer", variants: ["transducers", "transduce", "transduces"], support: "selective",
      meaning: "Something that converts one form of signal or energy into another.", here: "In a sensory receptor, a stimulus such as pressure is converted into a change in membrane voltage."}
  ]);

  add(6, "eye", ["a6-pacinian"], [biology + "36-5-vision"], [
    {id: "photoreceptor", term: "Photoreceptor", variants: ["photoreceptors"], meaning: "A cell that detects light.", example: "Rods and cones are the two light-detecting cell types in the human retina."},
    {id: "visual-pigment", term: "Visual pigment", variants: ["visual pigments", "optical pigment", "optical pigments"], support: "selective",
      meaning: "A light-sensitive substance in a rod or cone that helps the cell detect light."},
    {id: "retinal-convergence", term: "Retinal convergence", support: "selective",
      meaning: "Signals from several light-detecting cells join the same route out of the retina.", here: "Pooling signals from rods makes weak light easier to detect."},
    {id: "visual-acuity", term: "Visual acuity", support: "selective",
      meaning: "How clearly the eye can distinguish fine details.", example: "High acuity lets you see two nearby points as separate."},
    {id: "fovea", term: "Fovea", support: "selective",
      meaning: "A tiny region of the retina with densely packed cones that gives sharp central vision."}
  ]);

  add(6, "heartrate", ["a3-heart"], [biology + "40-3-mammalian-heart-and-blood-vessels"], [
    {id: "myogenic", term: "Myogenic",
      meaning: "Starting within the muscle itself.", here: "The heartbeat starts in heart muscle without a signal from a nerve."},
    {id: "sinoatrial-node", term: "Sinoatrial node", variants: ["SAN", "sino-atrial node"], synonyms: ["pacemaker"],
      meaning: "A group of specialised cells in the right atrium that starts each normal heartbeat."},
    {id: "atrioventricular-node", term: "Atrioventricular node", variants: ["AVN", "atrio-ventricular node"],
      meaning: "A group of heart cells that briefly delays the signal travelling from the atria to the ventricles.", here: "The delay gives the ventricles time to fill before they contract."},
    {id: "purkyne-tissue", term: "Purkyne tissue", variants: ["Purkinje fibres", "Purkyne fibres", "Purkinje tissue"], support: "selective",
      meaning: "Specialised heart muscle fibres that carry the electrical signal through the ventricles."},
    {id: "apex", term: "Apex (heart)", variants: ["apex"], support: "selective",
      meaning: "The pointed lower end of the heart.", here: "Contraction starts near this end of the ventricles and pushes blood upwards.",
      match: {cue: "\\b(?:heart|ventricles?|Purkyne|Purkinje)\\b"}}
  ]);

  add(6, "hrcontrol", ["a6-heartrate", "a6-reflex"], [biology + "40-4-blood-flow-and-blood-pressure-regulation"], [
    {id: "medulla-oblongata", term: "Medulla oblongata", variants: ["medulla"], support: "selective",
      meaning: "Part of the brainstem involved in automatic functions such as changing the heart rate.",
      match: {cue: "\\b(?:brainstem|brain|heart|breathing|cardiac|oblongata)\\b"}},
    {id: "chemoreceptor", term: "Chemoreceptor", variants: ["chemoreceptors"], support: "selective",
      meaning: "A receptor that detects chemical changes.", here: "Changes associated with blood carbon dioxide help trigger changes in heart rate."},
    {id: "baroreceptor", term: "Baroreceptor", variants: ["baroreceptors", "pressure receptors"], meaning: "A receptor in a blood vessel that detects how much its wall is stretched as pressure changes.",
      match: {cue: "\\b(?:blood|heart|cardiac|carotid|baroreceptors?)\\b"}},
    {id: "sympathetic", term: "Sympathetic nervous system", variants: ["sympathetic", "sympathetic nerve", "sympathetic nerves"], support: "selective",
      meaning: "A branch of the nervous system that automatically adjusts organs during activity or stress.", here: "Its signals to the heart’s pacemaker can speed the heartbeat up."},
    {id: "parasympathetic", term: "Parasympathetic nervous system", variants: ["parasympathetic", "parasympathetic nerve", "parasympathetic nerves"], support: "selective",
      meaning: "A branch of the nervous system that automatically adjusts organs, especially when the body is at rest.", here: "Its signals to the heart’s pacemaker can slow the heartbeat down."}
  ]);

  add(6, "resting", ["a2-active", "a6-reflex"], [biology + "35-1-neurons-and-glial-cells", biology + "35-2-how-neurons-communicate"], [
    {id: "neurone", term: "Neurone", variants: ["neurones", "neuron", "neurons"], status: "prerequisite", meaning: "A nerve cell that carries signals."},
    {id: "axon", term: "Axon", variants: ["axons"], meaning: "The long part of a nerve cell that carries signals away from its cell body."},
    {id: "myelin", term: "Myelin", variants: ["myelin sheath", "myelin sheaths", "myelination", "myelinated"],
      meaning: "A layer of fatty material that insulates parts of an axon.", here: "It helps nerve impulses travel faster."},
    {id: "resting-potential", term: "Resting potential", variants: ["resting membrane potential"],
      meaning: "The voltage difference across a cell membrane when it is not sending a signal.", here: "In a resting neurone, the inside is more negative than the outside."},
    {id: "sodium-potassium-pump", term: "Sodium–potassium pump", variants: ["sodium-potassium pump", "sodium potassium pump", "Na⁺/K⁺ pump"],
      meaning: "A membrane protein that uses ATP to move sodium ions out of a cell and potassium ions in."}
  ]);

  add(6, "actionpot", ["a6-resting"], [biology + "35-2-how-neurons-communicate"], [
    {id: "action-potential", term: "Action potential", variants: ["action potentials"],
      meaning: "A brief change in the voltage across a cell membrane that then returns towards its starting level.", here: "An action potential can travel along an axon as a nerve impulse."},
    {id: "depolarisation", term: "Depolarisation", variants: ["depolarization", "depolarise", "depolarised", "depolarises", "depolarising"], support: "selective",
      meaning: "A change in membrane voltage that makes the inside of a cell less negative.", here: "During an action potential, sodium ions entering a neurone produce depolarisation."},
    {id: "repolarisation", term: "Repolarisation", variants: ["repolarization", "repolarise", "repolarised", "repolarises"], support: "selective",
      meaning: "A return towards the resting voltage after the inside of the cell became less negative.", here: "In an axon, potassium ions leaving the cell drive this change."},
    {id: "hyperpolarisation", term: "Hyperpolarisation", variants: ["hyperpolarization", "hyperpolarised", "hyperpolarises"], support: "selective",
      meaning: "A change in membrane voltage that makes the inside of the cell more negative than before.", here: "At the end of an action potential it can take the voltage below its resting level."},
    {id: "threshold-potential", term: "Threshold potential", variants: ["threshold", "threshold voltage", "threshold value"],
      meaning: "The membrane voltage at which an action potential is triggered.",
      match: {cue: "\\b(?:axon|action potential|neurones?|neurons?|generator potential|synap\\w*|membrane voltage|depolari\\w*)\\b"}},
    {id: "all-or-nothing", term: "All-or-nothing response", variants: ["all-or-nothing", "all or nothing"],
      meaning: "A full action potential occurs if the membrane reaches threshold. Below threshold, it does not occur."}
  ]);

  add(6, "speed", ["a6-actionpot"], [biology + "35-2-how-neurons-communicate"], [
    {id: "node-of-ranvier", term: "Node of Ranvier", variants: ["nodes of Ranvier"],
      meaning: "A small gap in the myelin coating of an axon.", here: "Action potentials are renewed at these gaps."},
    {id: "saltatory-conduction", term: "Saltatory conduction", support: "selective",
      meaning: "A nerve impulse travels rapidly because action potentials are renewed at gaps in the myelin.", here: "The impulse appears to jump from one node to the next."},
    {id: "refractory-period", term: "Refractory period", support: "selective",
      meaning: "The short recovery time after an action potential when a neurone cannot fire again, or needs a stronger stimulus."}
  ]);

  add(6, "synapse", ["a6-actionpot"], [biology + "35-2-how-neurons-communicate"], [
    {id: "synapse", term: "Synapse", variants: ["synapses", "synaptic junction"], meaning: "The junction where one nerve cell passes a signal to another cell."},
    {id: "cholinergic-synapse", term: "Cholinergic synapse", variants: ["cholinergic synapses"], support: "selective",
      meaning: "A junction where acetylcholine carries a signal from a nerve cell to another cell."},
    {id: "synaptic-cleft", term: "Synaptic cleft", variants: ["synaptic gap"],
      meaning: "The narrow space between the cells at a synapse.", here: "A chemical messenger diffuses across it."},
    {id: "presynaptic", term: "Presynaptic", variants: ["pre-synaptic"], support: "selective",
      meaning: "On the sending side of a synapse.", example: "The presynaptic neurone releases the chemical messenger."},
    {id: "postsynaptic", term: "Postsynaptic", variants: ["post-synaptic"], support: "selective",
      meaning: "On the receiving side of a synapse.", example: "The postsynaptic cell has receptors for the chemical messenger."},
    {id: "neurotransmitter", term: "Neurotransmitter", variants: ["neurotransmitters"],
      meaning: "A chemical messenger released by a neurone to pass a signal to another cell."},
    {id: "acetylcholine", term: "Acetylcholine", variants: ["ACh"], meaning: "A chemical messenger released by some neurones, including those that activate skeletal muscle."},
    {id: "acetylcholinesterase", term: "Acetylcholinesterase", meaning: "An enzyme that breaks down acetylcholine after it has carried a signal across a synapse."}
  ]);

  add(6, "summation", ["a6-synapse"], [biology + "35-2-how-neurons-communicate"], [
    {id: "summation", term: "Summation", variants: ["summate", "summates"], support: "selective",
      meaning: "Several small changes in membrane voltage add together.", here: "Together they may bring the neurone to threshold and trigger an action potential."},
    {id: "spatial-summation", term: "Spatial summation", support: "selective",
      meaning: "Changes in membrane voltage from signals arriving at different synapses add together."},
    {id: "temporal-summation", term: "Temporal summation", support: "selective",
      meaning: "Changes in membrane voltage from repeated signals arriving in quick succession at one synapse add together."},
    {id: "inhibitory-synapse", term: "Inhibitory synapse", variants: ["inhibitory synapses"],
      meaning: "A synapse that makes the receiving neurone less likely to fire an action potential."},
    {id: "neuromuscular-junction", term: "Neuromuscular junction", variants: ["neuromuscular junctions", "NMJ"],
      meaning: "The junction where a motor neurone passes a signal to a muscle fibre."}
  ]);

  add(6, "muscle", ["a6-synapse"], [biology + "38-4-muscle-contraction-and-locomotion"], [
    {id: "antagonistic-pair", term: "Antagonistic pair", variants: ["antagonistic pairs", "antagonistic muscles"], support: "selective",
      meaning: "Two muscles that pull in opposite directions to move a body part back and forth."},
    {id: "myofibril", term: "Myofibril", variants: ["myofibrils"], support: "selective",
      meaning: "A long bundle of protein filaments inside a muscle cell.", here: "A myofibril is made of repeating units called sarcomeres."},
    {id: "sarcomere", term: "Sarcomere", variants: ["sarcomeres"], support: "selective",
      meaning: "One repeating contractile unit along a muscle fibre, measured from one Z line to the next."},
    {id: "actin", term: "Actin", meaning: "The protein that makes up most of the thin filaments in muscle."},
    {id: "myosin", term: "Myosin", meaning: "The protein that makes up most of the thick filaments in muscle.", here: "Myosin heads pull on actin during a contraction."},
    {id: "a-band", term: "A band", variants: ["A bands"], meaning: "The region spanning the entire length of the thick myosin filaments.", here: "It keeps the same length when a sarcomere shortens."},
    {id: "i-band", term: "I band", variants: ["I bands"], meaning: "The region containing thin actin filaments without overlapping thick myosin filaments."},
    {id: "h-zone", term: "H zone", variants: ["H zones", "H-zone"], meaning: "The central part of the thick filament region where the thin filaments do not overlap."}
  ]);

  add(6, "sliding", ["a6-muscle", "a6-synapse"], [biology + "38-4-muscle-contraction-and-locomotion"], [
    {id: "sliding-filament", term: "Sliding filament theory", variants: ["sliding filament model"],
      meaning: "The model in which thin and thick filaments slide past one another, making the sarcomere shorter."},
    {id: "sarcoplasmic-reticulum", term: "Sarcoplasmic reticulum",
      meaning: "A network inside muscle fibres that stores calcium ions.", here: "It releases calcium when the fibre is activated."},
    {id: "tropomyosin", term: "Tropomyosin", support: "selective",
      meaning: "A protein lying along the thin filament.", here: "In relaxed skeletal muscle it blocks the sites where myosin can bind to actin."},
    {id: "troponin", term: "Troponin", status: "additional", support: "selective",
      meaning: "A group of proteins that responds to calcium ions in skeletal and heart muscle.", here: "When calcium binds, troponin moves tropomyosin aside so myosin can attach to actin."},
    {id: "cross-bridge", term: "Cross-bridge", variants: ["cross-bridges", "cross bridge", "cross bridges"],
      meaning: "A temporary link between a myosin head and actin during muscle contraction."},
    {id: "power-stroke", term: "Power stroke", variants: ["power strokes"],
      meaning: "The movement of an attached myosin head that pulls on the thin actin filament."}
  ]);

  add(6, "fibres", ["a6-sliding", "a5-glycolysis"], [biology + "38-4-muscle-contraction-and-locomotion"], [
    {id: "phosphocreatine", term: "Phosphocreatine", variants: ["creatine phosphate"], support: "selective",
      meaning: "A compound in muscle that can quickly donate a phosphate group to ADP to remake ATP."},
    {id: "slow-twitch", term: "Slow-twitch fibre", variants: ["slow-twitch fibres", "slow twitch fibres", "slow-twitch"],
      meaning: "A muscle fibre that contracts relatively slowly and can keep working for longer before tiring."},
    {id: "fast-twitch", term: "Fast-twitch fibre", variants: ["fast-twitch fibres", "fast twitch fibres", "fast-twitch"],
      meaning: "A muscle fibre that contracts quickly and generates large forces but generally tires sooner."}
  ]);

  add(6, "homeo", [], [biology + "33-3-homeostasis"], [
    {id: "homeostasis", term: "Homeostasis", meaning: "Keeping conditions inside the body within suitable limits as things change."},
    {id: "negative-feedback", term: "Negative feedback", meaning: "A response that acts against the original change.", here: "This brings the measured condition back towards its usual range."},
    {id: "positive-feedback", term: "Positive feedback", meaning: "A response that makes the original change larger.", example: "During birth, contractions trigger a hormone release that increases contractions."},
    {id: "set-point", term: "Set point", variants: ["set-point", "set points"], meaning: "A value a control system tends to return a measurement towards."}
  ]);

  add(6, "glucose", ["a6-homeo", "a1-polysac"], [biology + "37-3-regulation-of-body-processes", "https://www.ncbi.nlm.nih.gov/books/NBK541119/"], [
    {id: "glycogenesis", term: "Glycogenesis", support: "selective",
      meaning: "Making glycogen from glucose.", example: "The ending ‘genesis’ means formation."},
    {id: "glycogenolysis", term: "Glycogenolysis", support: "selective",
      meaning: "Breaking down stored glycogen.", here: "The liver can release glucose into the blood as a result.", example: "The ending ‘lysis’ means splitting."},
    {id: "gluconeogenesis", term: "Gluconeogenesis", support: "selective",
      meaning: "Making new glucose from molecules that are not carbohydrates.", example: "The liver can make glucose from lactate, glycerol and some amino acids."},
    {id: "insulin", term: "Insulin", meaning: "A hormone made by pancreatic beta cells that lowers blood glucose concentration.", here: "It helps some cells take up glucose and promotes storage as glycogen."},
    {id: "glucagon", term: "Glucagon", meaning: "A hormone made by pancreatic alpha cells that raises blood glucose concentration.", here: "It signals the liver to release glucose."},
    {id: "target-cell", term: "Target cell", variants: ["target cells"], topics: [2, 6, 8], status: "prerequisite",
      meaning: "A cell that carries the right receptor to respond to a particular messenger."},
    {id: "glut4", term: "GLUT4", status: "additional", support: "selective",
      meaning: "A protein that carries glucose across a cell membrane.", here: "Insulin increases the number of these transporters at the surface of muscle and fat cells."}
  ]);

  add(6, "secondmsg", ["a6-glucose"], [biology + "37-2-how-hormones-work"], [
    {id: "second-messenger", term: "Second messenger", variants: ["second messengers", "second messenger model"], support: "selective",
      meaning: "A small molecule inside a cell that passes on a signal after a hormone or other messenger binds to a receptor."},
    {id: "camp", term: "Cyclic AMP", variants: ["cAMP"], meaning: "A small molecule that carries signals inside a cell.", here: "It can activate protein kinases after glucagon or adrenaline binds to a cell surface receptor.",
      match: {cue: "\\b(?:cyclic|ATP|hormone|kinase|glucagon|adrenaline|second messenger|cyclase)\\b"}}
  ]);

  add(6, "diabetes", ["a6-glucose"], [biology + "37-3-regulation-of-body-processes", "https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes"], [
    {id: "type-1-diabetes", term: "Type 1 diabetes", variants: ["Type I diabetes"], meaning: "A condition in which the immune system damages the pancreatic cells that make insulin, so the body makes little or no insulin."},
    {id: "type-2-diabetes", term: "Type 2 diabetes", variants: ["Type II diabetes"], meaning: "A condition in which cells respond less to insulin and the body cannot make enough insulin to keep blood glucose in range."},
    {id: "insulin-resistance", term: "Insulin resistance", variants: ["insulin resistant"], meaning: "A weaker than usual response to insulin by body cells."}
  ]);

  add(6, "kidney", ["a6-homeo", "a2-osmosis"], [biology + "41-2-the-kidneys-and-osmoregulatory-organs", biology + "41-3-excretion-systems"], [
    {id: "nephron", term: "Nephron", variants: ["nephrons"], support: "selective",
      meaning: "One of the many tiny units in a kidney that filters blood and then adjusts the fluid to make urine."},
    {id: "glomerulus", term: "Glomerulus", variants: ["glomeruli"],
      meaning: "A knot of tiny blood vessels at the start of a nephron, where fluid is filtered out of the blood."},
    {id: "bowmans-capsule", term: "Bowman’s capsule", variants: ["Bowman's capsule", "Bowmans capsule", "renal capsule"],
      meaning: "The cup-shaped part of a nephron that collects fluid filtered out of the glomerulus."},
    {id: "ultrafiltration", term: "Ultrafiltration", support: "selective",
      meaning: "Using pressure to drive water and small dissolved substances through a filter.", here: "In the kidney, blood cells and most large proteins remain in the blood."},
    {id: "filtrate", term: "Filtrate", variants: ["glomerular filtrate"], support: "selective",
      meaning: "The fluid that has passed through a filter.", here: "Kidney filtrate starts as water and small dissolved substances filtered from blood."},
    {id: "selective-reabsorption", term: "Selective reabsorption", support: "selective",
      meaning: "Taking particular substances back into the blood from the fluid in a kidney tubule.", example: "Glucose is normally taken back rather than lost in urine."},
    {id: "proximal-tubule", term: "Proximal convoluted tubule", variants: ["PCT", "proximal tubule"],
      meaning: "The folded section of a kidney tubule nearest Bowman’s capsule.", here: "Most reabsorption takes place here."},
    {id: "distal-tubule", term: "Distal convoluted tubule", variants: ["DCT", "distal tubule"],
      meaning: "The folded section of a kidney tubule after the loop of Henle, before the collecting duct."},
    {id: "afferent-arteriole", term: "Afferent arteriole",
      meaning: "The small blood vessel bringing blood into the glomerulus."},
    {id: "efferent-arteriole", term: "Efferent arteriole",
      meaning: "The small blood vessel taking blood away from the glomerulus."},
    {id: "podocyte", term: "Podocyte", variants: ["podocytes"], status: "additional", support: "selective",
      meaning: "A specialised kidney cell with extensions that wrap around tiny blood vessels.", here: "Small spaces between the extensions are part of the filter in a glomerulus."}
  ]);

  add(6, "loop", ["a6-kidney", "a2-osmosis"], [biology + "41-4-nitrogenous-wastes", biology + "41-5-hormonal-control-of-osmoregulatory-functions"], [
    {id: "loop-of-henle", term: "Loop of Henle", variants: ["loops of Henle"], meaning: "The U-shaped part of a kidney tubule that helps build up a salt concentration gradient in the kidney."},
    {id: "renal-medulla", term: "Renal medulla", variants: ["medulla"], support: "selective",
      meaning: "The inner part of the kidney.", here: "The loops of Henle and collecting ducts extend into this region.",
      match: {cue: "\\b(?:kidney|renal|tubule|Henle|collecting duct|filtrate|medullary)\\b"}},
    {id: "collecting-duct", term: "Collecting duct", variants: ["collecting ducts"], meaning: "A tube that receives fluid from several kidney tubules.", here: "Water can leave the duct before the remaining fluid passes out as urine."},
    {id: "impermeable", term: "Impermeable", status: "prerequisite", topics: [2, 6], meaning: "Does not allow a particular substance to pass through."}
  ]);

  add(6, "adh", ["a6-loop", "a6-homeo"], [biology + "41-5-hormonal-control-of-osmoregulatory-functions"], [
    {id: "hypothalamus", term: "Hypothalamus", support: "selective",
      meaning: "A region at the base of the brain that helps coordinate automatic body functions.", here: "It detects changes in the concentration of the blood and makes ADH."},
    {id: "posterior-pituitary", term: "Posterior pituitary", variants: ["posterior pituitary gland"], support: "selective",
      meaning: "The rear part of a small gland under the brain.", here: "It stores and releases ADH made in the hypothalamus."},
    {id: "adh", term: "Antidiuretic hormone", variants: ["ADH", "anti-diuretic hormone"], synonyms: ["vasopressin"], support: "selective",
      meaning: "A hormone that reduces how much water is lost as urine.", here: "It makes part of the kidney tubule and the collecting duct more permeable to water."},
    {id: "osmoreceptor", term: "Osmoreceptor", variants: ["osmoreceptors"], status: "additional", support: "selective",
      meaning: "A cell that detects changes in the concentration of dissolved substances in body fluids."},
    {id: "aquaporin", term: "Aquaporin", variants: ["aquaporins"], status: "additional", support: "selective", topics: [2, 6],
      meaning: "A channel protein in a cell membrane that allows water to pass through.", here: "ADH increases the number of water channels in the collecting duct’s surface facing the filtrate."}
  ]);

  // 3.7 Inheritance, populations and ecosystems
  add(7, "genterms", ["a4-dnachrom", "a4-meiosis"], [genomics], [
    {id: "genotype", term: "Genotype", variants: ["genotypes", "genetic constitution"],
      meaning: "The version or combination of versions of a gene an organism carries.", here: "It can also refer to an organism’s genetic make-up more generally."},
    {id: "phenotype", term: "Phenotype", variants: ["phenotypes", "phenotypic"],
      meaning: "The characteristics of an organism that can be observed or measured.", here: "They depend on the organism’s genes and its environment."},
    {id: "dominant", term: "Dominant allele", variants: ["dominant alleles", "dominant"], meaning: "An allele that affects the trait even when just one copy is present.",
      match: {cue: "\\b(?:alleles?|genes?|genotypes?|phenotypes?|recessive|inherit\\w*|heterozyg\\w*)\\b"}},
    {id: "recessive", term: "Recessive allele", variants: ["recessive alleles", "recessive"], meaning: "An allele whose effect on the trait is hidden when a dominant allele is also present.",
      here: "In an ordinary two-copy example, two recessive copies are needed to show the recessive trait."},
    {id: "heterozygous", term: "Heterozygous", variants: ["heterozygote", "heterozygotes"],
      meaning: "Having two different versions of a gene at the same position, one on each matching chromosome.", example: "Aa represents a heterozygous genotype."},
    {id: "homozygous", term: "Homozygous", variants: ["homozygote", "homozygotes"],
      meaning: "Having the same version of a gene on each of a pair of matching chromosomes.", example: "AA and aa are both homozygous genotypes."},
    {id: "monohybrid-cross", term: "Monohybrid cross", variants: ["monohybrid crosses"], support: "selective",
      meaning: "A study or prediction of how one gene is passed from parents to offspring."}
  ]);

  add(7, "codom", ["a7-genterms"], [genomics, biology + "12-3-laws-of-inheritance"], [
    {id: "codominance", term: "Codominance", variants: ["codominant", "co-dominance", "co-dominant"], support: "selective",
      meaning: "When two versions of a gene both contribute recognisable effects to a trait in an individual carrying both.",
      example: "Someone with one A and one B blood-group allele has both A and B markers on their red blood cells."},
    {id: "multiple-alleles", term: "Multiple alleles", meaning: "More than two versions of one gene exist in the population.", here: "An individual with two matching chromosomes normally carries at most two of these versions."}
  ]);

  add(7, "sexlink", ["a7-genterms"], [genomics, biology + "13-1-chromosomal-theory-and-genetic-linkage"], [
    {id: "sex-linkage", term: "Sex linkage", variants: ["sex-linkage", "sex linked", "sex-linked", "X-linked", "X-linked inheritance"],
      meaning: "Inheritance of a gene carried on a sex chromosome.", here: "The term X-linked specifically means that the gene is carried on the X chromosome."},
    {id: "carrier-genetics", term: "Carrier (genetics)", variants: ["carrier", "carriers"], support: "selective",
      meaning: "An individual who carries a recessive allele and can pass it on without usually showing the associated trait.",
      match: {cue: "\\b(?:alleles?|recessive|inherit\\w*|pedigree|heterozyg\\w*|X-linked|genotypes?)\\b"}}
  ]);

  add(7, "dihybrid", ["a7-genterms", "a4-meiosis"], [genomics, biology + "12-3-laws-of-inheritance"], [
    {id: "dihybrid-cross", term: "Dihybrid cross", variants: ["dihybrid crosses", "dihybrid inheritance"], support: "selective",
      meaning: "A study or prediction of how versions of two genes are passed from parents to offspring."},
    {id: "segregation", term: "Segregation (inheritance)", variants: ["segregation", "segregate", "segregates"], support: "selective",
      meaning: "Separation of the two copies of a gene as gametes form, so each gamete has one copy.",
      match: {cue: "\\b(?:alleles?|meiosis|chromosomes?|gametes?|cross|genes?)\\b"}}
  ]);

  add(7, "linkage", ["a7-dihybrid", "a4-meiosis"], [genomics, biology + "13-1-chromosomal-theory-and-genetic-linkage"], [
    {id: "autosome", term: "Autosome", variants: ["autosomes"], support: "selective", meaning: "A chromosome other than a sex chromosome."},
    {id: "autosomal-linkage", term: "Autosomal linkage", variants: ["linked genes", "autosomal linked"], support: "selective",
      meaning: "Genes on the same non-sex chromosome tend to be passed on together.", here: "Crossing over can separate them. The closer two genes are, the less often that happens."},
    {id: "recombinant-offspring", term: "Recombinant offspring", variants: ["recombinant phenotype", "recombinants"], support: "selective",
      meaning: "Offspring with a combination of linked gene versions different from either original combination.", here: "Crossing over can produce these combinations.",
      match: {cue: "\\b(?:offspring|crossing over|linkage|linked|phenotype|recombinants)\\b"}}
  ]);

  add(7, "epistasis", ["a7-dihybrid"], [genomics, biology + "12-3-laws-of-inheritance"], [
    {id: "epistasis", term: "Epistasis", variants: ["epistatic"], support: "selective",
      meaning: "When one gene affects how another gene shows up in a trait.", example: "A gene that prevents pigment production can hide the effect of a second gene that controls pigment colour."}
  ]);

  add(7, "hardy", ["a7-genterms"], [biology + "19-1-population-evolution", biology + "19-2-population-genetics"], [
    {id: "population", term: "Population", variants: ["populations"], topics: [4, 7], status: "prerequisite",
      meaning: "The individuals of one species living in an area at the same time."},
    {id: "gene-pool", term: "Gene pool", variants: ["gene pools"], support: "selective",
      meaning: "All the copies of all the genes carried by members of a population."},
    {id: "allele-frequency", term: "Allele frequency", variants: ["allele frequencies"], meaning: "The fraction of a gene’s copies in a population that are a particular version.",
      example: "If 30 of 100 copies are allele A, the frequency of A is 0.30."},
    {id: "hardy-weinberg", term: "Hardy–Weinberg principle", variants: ["Hardy-Weinberg principle", "Hardy–Weinberg", "Hardy-Weinberg", "Hardy–Weinberg equation", "Hardy-Weinberg equation"], support: "selective",
      meaning: "A model for predicting how common gene versions and their combinations will be in a population.", here: "Under the model’s conditions, allele frequencies stay the same across generations."}
  ]);

  add(7, "varsel", ["a7-hardy", "a4-natsel"], [biology + "19-3-adaptive-evolution"], [
    {id: "disruptive-selection", term: "Disruptive selection", support: "selective",
      meaning: "Natural selection that favours individuals at both ends of the range of a trait over those in the middle."},
    {id: "differential-reproduction", term: "Differential reproductive success", variants: ["differential reproduction", "differential survival"], support: "selective",
      meaning: "Some individuals survive or produce offspring more successfully than others.", here: "This difference can change how common inherited traits are in the next generation."},
    {id: "evolution", term: "Evolution", status: "prerequisite", topics: [4, 7],
      meaning: "Inherited changes in a population over generations.", here: "For AQA, this can be described as a change in allele frequencies."}
  ]);

  add(7, "speciation", ["a7-varsel"], [genomics, biology + "18-2-formation-of-new-species", biology + "19-2-population-genetics"], [
    {id: "speciation", term: "Speciation",
      meaning: "The formation of new species from an existing species."},
    {id: "reproductive-isolation", term: "Reproductive isolation", variants: ["reproductive separation", "reproductively isolated"],
      meaning: "Barriers prevent two populations from breeding successfully with one another.", here: "Those barriers can stop individuals mating or stop them producing fertile offspring."},
    {id: "allopatric-speciation", term: "Allopatric speciation", support: "selective",
      meaning: "The formation of new species after populations are separated by a physical barrier."},
    {id: "sympatric-speciation", term: "Sympatric speciation", support: "selective",
      meaning: "The formation of new species within the same geographical area."},
    {id: "genetic-drift", term: "Genetic drift", support: "selective", meaning: "Change in how common gene versions are in a population because of chance.", here: "The effect tends to be stronger in a small population."},
    {id: "gene-flow", term: "Gene flow", support: "selective",
      meaning: "The movement of versions of genes between populations when individuals or their gametes enter another population and contribute to its offspring."}
  ]);

  add(7, "ecosys", [], [biology + "44-1-the-scope-of-ecology", biology + "45-6-community-ecology"], [
    {id: "habitat", term: "Habitat", variants: ["habitats"], status: "prerequisite", topics: [5, 7], meaning: "The place or type of environment where an organism lives."},
    {id: "ecosystem", term: "Ecosystem", variants: ["ecosystems"], status: "prerequisite", topics: [5, 7],
      meaning: "The organisms in an area, their physical surroundings and how they interact."},
    {id: "community-ecology", term: "Community (ecology)", variants: ["community", "communities"], topics: [5, 7],
      meaning: "The populations of different species living in the same area.",
      match: {cue: "\\b(?:ecosystem\\w*|populations?|habitats?|species|succession|pioneer)\\b"}},
    {id: "ecological-niche", term: "Ecological niche", variants: ["niche", "niches"], support: "selective",
      meaning: "How a species lives in its ecosystem, including the resources it uses and the conditions it needs."},
    {id: "abiotic-factor", term: "Abiotic factor", variants: ["abiotic factors", "abiotic condition", "abiotic conditions", "abiotic"], topics: [5, 7],
      meaning: "A non-living part of the environment that affects organisms.", example: "Light intensity, temperature and soil pH are abiotic factors."},
    {id: "biotic-factor", term: "Biotic factor", variants: ["biotic factors", "biotic condition", "biotic conditions", "biotic"], topics: [5, 7],
      meaning: "An effect of living organisms on another organism in its environment.", example: "The presence of predators is a biotic factor for a prey species."},
    {id: "carrying-capacity", term: "Carrying capacity", support: "selective",
      meaning: "The population size an environment can support over time with its available resources and conditions."}
  ]);

  add(7, "interact", ["a7-ecosys"], [biology + "45-6-community-ecology"], [
    {id: "intraspecific-competition", term: "Intraspecific competition", variants: ["intraspecific"], support: "selective",
      meaning: "Competition among members of the same species.", example: "‘Intra-’ means within."},
    {id: "interspecific-competition", term: "Interspecific competition", variants: ["interspecific"], support: "selective",
      meaning: "Competition between members of different species.", example: "‘Inter-’ means between."},
    {id: "predator", term: "Predator", variants: ["predators"], status: "prerequisite",
      meaning: "An animal that catches and eats other organisms, called its prey."},
    {id: "predation", term: "Predation", status: "prerequisite", meaning: "An animal catching and eating another organism.", here: "The hunter is the predator and the organism it eats is the prey."}
  ]);

  add(7, "fieldwork", ["a7-ecosys"], [practical, practicalHandbook], [
    {id: "quadrat", term: "Quadrat", variants: ["quadrats", "frame quadrat", "frame quadrats", "point quadrat", "point quadrats"],
      meaning: "A tool for sampling organisms in a small, known area.", here: "A frame outlines the area. A point quadrat records which organisms are touched at fixed points."},
    {id: "transect", term: "Transect", variants: ["transects", "line transect", "line transects", "belt transect", "belt transects"], support: "selective",
      meaning: "A line used to sample changes across a habitat.", here: "A belt transect samples a strip along the line, often using a series of quadrats."},
    {id: "abundance", term: "Abundance", status: "prerequisite",
      meaning: "How much or how many of a particular species are present.", here: "A count, percentage cover or frequency can be used, depending on the fieldwork question."},
    {id: "percentage-cover", term: "Percentage cover", variants: ["percent cover", "% cover"], meaning: "The percentage of a sample area covered by a particular species."},
    {id: "frequency-ecology", term: "Frequency (field sampling)", variants: ["frequency"], meaning: "How often a species is recorded across a set of samples.",
      here: "In quadrat sampling this is commonly the percentage of quadrats containing the species.",
      match: {cue: "\\b(?:quadrats?|transects?|abundance|cover|fieldwork)\\b"}}
  ]);

  add(7, "mrrc", ["a7-fieldwork"], [practical, practicalHandbook], [
    {id: "mark-recapture", term: "Mark–release–recapture", variants: ["mark-release-recapture", "mark release recapture", "mark–release–recapture method", "mark-recapture"], support: "selective",
      meaning: "A way to estimate the size of a moving population by marking a first sample and checking how many previously marked individuals are in a later sample."},
    {id: "motile", term: "Motile", variants: ["motility"], status: "prerequisite", topics: [2, 7], support: "selective",
      meaning: "Able to move by itself.", here: "Mobile animals can move between sampling sites."}
  ]);

  add(7, "succession", ["a7-ecosys"], [biology + "45-6-community-ecology"], [
    {id: "succession", term: "Ecological succession", variants: ["succession"], support: "selective",
      meaning: "Change in the species living in an area over time as organisms arrive, die and alter the environment."},
    {id: "primary-succession", term: "Primary succession", support: "selective",
      meaning: "Ecological succession beginning on a surface where soil has yet to form, such as new bare rock."},
    {id: "secondary-succession", term: "Secondary succession", meaning: "Ecological succession beginning after a disturbance in a place where soil remains."},
    {id: "pioneer-species", term: "Pioneer species", support: "selective",
      meaning: "A species among the first to establish itself in a newly available area."},
    {id: "climax-community", term: "Climax community", support: "selective",
      meaning: "A relatively stable late stage of succession for the conditions in that area."},
    {id: "colonisation", term: "Colonisation (ecology)", variants: ["colonisation", "colonization", "colonise", "colonises"], status: "prerequisite",
      meaning: "Organisms arrive and become established in a new area.",
      match: {cue: "\\b(?:area|ecosystem|habitat|pioneer|species|succession|rock)\\b"}}
  ]);

  add(7, "conserve", ["a7-succession"], [biology + "47-4-preserving-biodiversity"], [
    {id: "conservation", term: "Conservation", meaning: "Protecting or managing species, habitats and biodiversity."},
    {id: "deflected-succession", term: "Deflected succession", variants: ["plagioclimax"], status: "additional", support: "selective",
      meaning: "Succession changes course because of repeated disturbance or management, such as grazing or cutting."}
  ]);

  // 3.8 The control of gene expression
  add(8, "mut8", ["a4-dnachrom", "a4-mutation"], [genomics], [
    {id: "insertion-mutation", term: "Insertion (mutation)", variants: ["addition", "insertion", "insertions", "addition mutation"], topics: [4, 8],
      meaning: "One or more bases are added to a DNA sequence.",
      match: {cue: "\\b(?:mutation\\w*|bases?|nucleotides?|DNA|frameshift)\\b"}},
    {id: "inversion-mutation", term: "Inversion (mutation)", variants: ["inversion", "inversions", "inversion mutation"],
      meaning: "A stretch of DNA is reversed within a chromosome.",
      match: {cue: "\\b(?:mutation\\w*|bases?|nucleotides?|DNA|chromosomes?)\\b"}},
    {id: "duplication-mutation", term: "Duplication (mutation)", variants: ["duplication", "duplications", "duplication mutation"],
      meaning: "A stretch of DNA is copied, leaving an extra copy in the genetic material.",
      match: {cue: "\\b(?:mutation\\w*|bases?|nucleotides?|DNA|chromosomes?)\\b"}},
    {id: "translocation-mutation", term: "Translocation (mutation)", variants: ["translocation", "translocations", "translocation mutation"],
      meaning: "A stretch of DNA moves to a new position, often on a different chromosome.",
      match: {cue: "\\b(?:mutation\\w*|bases?|nucleotides?|DNA|chromosomes?)\\b"}},
    {id: "silent-mutation", term: "Silent mutation", variants: ["silent mutations"], topics: [4, 8],
      meaning: "In this course, a change in a DNA base that leaves the amino acid encoded at that position unchanged."}
  ]);

  add(8, "stemcells", ["a2-euk"], [genomics, "https://stemcells.nih.gov/info/basics/stc-basics"], [
    {id: "stem-cell", term: "Stem cell", variants: ["stem cells"], topics: [2, 8],
      meaning: "A cell that can make more cells like itself and produce cells that develop into specialised types."},
    {id: "differentiation", term: "Cell differentiation", variants: ["differentiate", "differentiates", "differentiation", "cell specialisation", "cell specialization"], topics: [2, 8],
      meaning: "A cell changes to take on a specialised role.", here: "Cells with the same DNA can develop differently because they use different genes.",
      match: {cue: "\\b(?:cells?|stem|develop\\w*|embryos?|tissues?|pluripotent|multipotent|totipotent)\\b"}},
    {id: "totipotent", term: "Totipotent", variants: ["totipotency"], support: "selective",
      meaning: "Able to give rise to all cell types needed for a whole organism, including supporting tissues such as the placenta in mammals."},
    {id: "pluripotent", term: "Pluripotent", variants: ["pluripotency"],
      meaning: "Able to give rise to all the main cell types of the body.", here: "Pluripotent cells cannot by themselves produce all the supporting tissues, such as the placenta."},
    {id: "multipotent", term: "Multipotent", variants: ["multipotency"],
      meaning: "Able to produce several related types of specialised cell.", example: "A blood stem cell can make several types of blood cell."},
    {id: "unipotent", term: "Unipotent", variants: ["unipotency"],
      meaning: "Able to produce one type of specialised cell."},
    {id: "ips-cell", term: "Induced pluripotent stem cell", variants: ["induced pluripotent stem cells", "iPS cell", "iPS cells", "iPSC", "iPSCs"], support: "selective",
      meaning: "A specialised cell that has been changed so it can again give rise to many types of body cell."}
  ]);

  add(8, "transfac", ["a4-transcription", "a4-translation", "a8-stemcells"], [genomics, biology + "16-1-regulation-of-gene-expression"], [
    {id: "gene-expression", term: "Gene expression", variants: ["expression", "expressed"], support: "selective",
      meaning: "Using the information in a gene to make a working product, such as an RNA molecule or a protein.",
      here: "A cell can change which genes it uses and how much product it makes.",
      match: {cue: "\\b(?:genes?|transcription|translation|DNA|mRNA|protein|promoter|epigen\\w*|alleles?)\\b"}},
    {id: "transcription-factor", term: "Transcription factor", variants: ["transcription factors", "transcriptional factor", "transcriptional factors"], support: "selective",
      meaning: "A protein that binds to particular DNA sequences and helps increase or decrease transcription."},
    {id: "promoter", term: "Promoter", variants: ["promoters", "promoter region", "promoter regions"],
      meaning: "A region of DNA near the start of a gene where the machinery that copies DNA into RNA can assemble."},
    {id: "oestrogen", term: "Oestrogen", variants: ["estrogen"], meaning: "A group of steroid hormones involved in reproduction and other body functions.", here: "Some oestrogens change gene activity in cells that contain the appropriate receptor."}
  ]);

  add(8, "epigen", ["a8-transfac"], [genomics, biology + "16-3-eukaryotic-epigenetic-gene-regulation"], [
    {id: "epigenetics", term: "Epigenetics", variants: ["epigenetic", "epigenetic change", "epigenetic changes"], support: "selective",
      meaning: "Changes in how genes are used without changing the order of the DNA bases.", here: "Some of these changes can be passed on when cells divide."},
    {id: "dna-methylation", term: "DNA methylation", variants: ["methylation", "methylated", "promoter methylation", "methyl group", "methyl groups"],
      meaning: "The addition of small chemical groups called methyl groups to DNA.", here: "Increased methylation in a promoter often decreases transcription of the gene."},
    {id: "histone-acetylation", term: "Histone acetylation", variants: ["acetylation", "acetylated", "acetyl group", "acetyl groups"],
      meaning: "The addition of small chemical groups called acetyl groups to histones.", here: "This often makes nearby DNA easier to reach and can increase transcription."},
    {id: "chromatin", term: "Chromatin", status: "additional", support: "selective",
      meaning: "The material made of DNA and associated proteins that forms chromosomes."}
  ]);

  add(8, "rnai", ["a8-transfac", "a4-translation"], [genomics, biology + "16-6-eukaryotic-translational-and-post-translational-gene-regulation"], [
    {id: "rna-interference", term: "RNA interference", variants: ["RNAi"],
      meaning: "Small RNA molecules reduce the amount of protein made using a particular messenger RNA.",
      here: "They can guide proteins to break down the messenger RNA or prevent it from being read."},
    {id: "sirna", term: "Small interfering RNA", variants: ["siRNA", "siRNAs"],
      meaning: "A short RNA that helps a cell find and silence messenger RNA with a matching sequence."}
  ]);

  add(8, "cancer", ["a8-epigen", "a8-mut8"], [genomics, "https://www.cancer.gov/about-cancer/understanding/what-is-cancer"], [
    {id: "benign", term: "Benign tumour", variants: ["benign tumours", "benign tumor", "benign tumors", "benign"], support: "selective",
      meaning: "A non-cancerous growth that does not invade nearby tissues or spread to other parts of the body."},
    {id: "malignant", term: "Malignant tumour", variants: ["malignant tumours", "malignant tumor", "malignant tumors", "malignant"], support: "selective",
      meaning: "A cancerous growth whose cells can invade nearby tissues and may spread to elsewhere in the body."},
    {id: "metastasis", term: "Metastasis", variants: ["metastasise", "metastasize", "metastatic"], support: "selective",
      meaning: "Cancer cells spread from the original tumour and can form tumours elsewhere in the body."},
    {id: "tumour-suppressor", term: "Tumour suppressor gene", variants: ["tumour suppressor genes", "tumour-suppressor gene", "tumour-suppressor genes", "tumor suppressor gene", "tumor suppressor genes"], support: "selective",
      meaning: "A gene whose normal product helps prevent uncontrolled growth.", here: "It may slow cell division, help repair DNA or help remove badly damaged cells."},
    {id: "proto-oncogene", term: "Proto-oncogene", variants: ["proto-oncogenes"], support: "selective",
      meaning: "A normal gene involved in regulating cell growth or division.", here: "If changed or too active it can become an oncogene."},
    {id: "oncogene", term: "Oncogene", variants: ["oncogenes"], support: "selective",
      meaning: "A gene that can contribute to cancer when its activity makes cells grow or divide too much."}
  ]);

  add(8, "pass8", ["a8-transfac", "a8-cancer"], ["https://www.cancer.gov/publications/dictionaries/cancer-terms/def/estrogen-receptor-positive"], [
    {id: "oestrogen-receptor-positive", term: "Oestrogen receptor-positive", variants: ["estrogen receptor-positive", "oestrogen receptor positive", "ER-positive"], status: "additional", support: "selective",
      meaning: "Describes a tumour whose cells contain receptors for the hormone oestrogen.", here: "These cells can grow in response to oestrogen."},
    {id: "oestrogen-receptor-negative", term: "Oestrogen receptor-negative", variants: ["estrogen receptor-negative", "oestrogen receptor negative", "ER-negative"], status: "additional", support: "selective",
      meaning: "Describes a tumour whose cells lack detectable oestrogen receptors."}
  ]);

  add(8, "genome", ["a4-rnas"], [genomics], [
    {id: "non-coding-dna", term: "Non-coding DNA", variants: ["noncoding DNA"], support: "selective",
      meaning: "DNA that does not provide the instructions for making a chain of amino acids.",
      here: "Some non-coding DNA helps control genes or encodes RNA with a different job."},
    {id: "dna-sequencing", term: "DNA sequencing", variants: ["sequencing", "sequence the genome"], support: "selective",
      meaning: "Determining the order of bases in a piece of DNA.",
      match: {cue: "\\b(?:DNA|genomes?|bases?|genes?|nucleotide\\w*|sequencing projects?)\\b"}}
  ]);

  add(8, "fragments", ["a4-transcription", "a4-dnachrom"], [genomics], [
    {id: "reverse-transcriptase", term: "Reverse transcriptase", support: "selective",
      meaning: "An enzyme that makes DNA by using RNA as the template."},
    {id: "cdna", term: "Complementary DNA", variants: ["cDNA"], support: "selective",
      meaning: "DNA made by copying an RNA molecule.", here: "A copy made from mature messenger RNA normally lacks the regions that were removed when the RNA was processed."},
    {id: "restriction-endonuclease", term: "Restriction endonuclease", variants: ["restriction endonucleases", "restriction enzyme", "restriction enzymes"],
      meaning: "An enzyme that cuts DNA at or near a particular base sequence."},
    {id: "recognition-sequence", term: "Recognition sequence", variants: ["recognition sequences", "recognition site", "recognition sites"], meaning: "A particular order of DNA bases that a protein recognises and binds to.", here: "Restriction enzymes recognise particular sequences in DNA."},
    {id: "palindromic-sequence", term: "Palindromic DNA sequence", variants: ["palindromic recognition sequence", "palindromic recognition sequences", "palindromic", "palindrome"], support: "selective",
      meaning: "A DNA sequence that reads the same on both strands when each is read in its usual direction.",
      match: {cue: "\\b(?:DNA|bases?|strands?|restriction|recognition|sequence)\\b"}},
    {id: "sticky-ends", term: "Sticky ends", variants: ["sticky end", "overhangs"], support: "selective",
      meaning: "Short, single-stranded tails at the ends of some DNA fragments.", here: "Matching tails can pair by their bases."},
    {id: "pcr", term: "Polymerase chain reaction", variants: ["PCR"], support: "selective",
      meaning: "A laboratory technique that makes many copies of a selected piece of DNA."},
    {id: "primer", term: "Primer (DNA copying)", variants: ["primer", "primers"],
      meaning: "A short piece of nucleic acid that gives DNA copying a place to start.",
      match: {cue: "\\b(?:DNA|PCR|polymerase|nucleotides?|amplify\\w*|strands?)\\b"}},
    {id: "thermocycler", term: "Thermocycler", variants: ["thermal cycler"], support: "selective", status: "additional",
      meaning: "A machine that repeatedly changes the temperature of samples.", here: "It is used in PCR."},
    {id: "in-vitro", term: "In vitro", support: "selective",
      meaning: "In laboratory conditions outside a living body or cell.", example: "A reaction in a test tube is in vitro."}
  ]);

  add(8, "invivo", ["a8-fragments"], [genomics], [
    {id: "in-vivo", term: "In vivo", support: "selective",
      meaning: "Inside a living organism or cell."},
    {id: "vector-genetics", term: "Vector (genetics)", variants: ["vector", "vectors", "cloning vector", "cloning vectors"], support: "selective",
      meaning: "A carrier used to bring DNA into a cell.", example: "A plasmid can be a vector.",
      match: {cue: "\\b(?:DNA|plasmids?|cloning|transgenic|ligation|host cells?|recombinant)\\b"}},
    {id: "recombinant-dna", term: "Recombinant DNA", variants: ["recombinant plasmid", "recombinant plasmids"],
      meaning: "DNA that combines pieces joined from different sources."},
    {id: "dna-ligase", term: "DNA ligase", variants: ["ligase"],
      meaning: "An enzyme that seals breaks in the backbone of a DNA strand.", here: "It can permanently join DNA pieces together."},
    {id: "transformation", term: "Transformation (genetics)", variants: ["transformation", "transformed cells", "transformed"], support: "selective",
      meaning: "A cell takes up DNA from its surroundings.",
      match: {cue: "\\b(?:plasmids?|DNA|vectors?|recombinant|cloning|host cells?)\\b"}},
    {id: "marker-gene", term: "Marker gene", variants: ["marker genes"], meaning: "A gene whose easily identified effect can help show whether cells carry particular DNA."},
    {id: "transgenic", term: "Transgenic", support: "selective",
      meaning: "Containing a gene introduced from another species using genetic technology."}
  ]);

  add(8, "probes", ["a8-fragments"], [genomics], [
    {id: "dna-probe", term: "DNA probe", variants: ["DNA probes", "labelled probes"], support: "selective",
      meaning: "A short single strand of DNA used to find a matching sequence.", here: "Its label lets you tell whether the probe has bound to the sample."},
    {id: "dna-hybridisation", term: "DNA hybridisation", variants: ["DNA hybridization", "hybridisation", "hybridises", "hybridization", "hybridizes"], support: "selective", topics: [4, 8],
      meaning: "Two strands of DNA, or a strand of DNA and one of RNA, pair where their base sequences match.",
      match: {cue: "\\b(?:DNA|RNA|base\\w*|strands?|alleles?|probes?|sequence)\\b"}},
    {id: "genetic-screening", term: "Genetic screening", meaning: "Testing for particular DNA variants in people who may have a related condition or risk."},
    {id: "genetic-counselling", term: "Genetic counselling", variants: ["genetic counseling"], meaning: "Support that helps people understand inherited risks, genetic test results and possible next choices."},
    {id: "personalised-medicine", term: "Personalised medicine", variants: ["personalized medicine"], meaning: "Using information about a person, such as their genetic variants, to guide their treatment."}
  ]);

  add(8, "fingerprint", ["a8-fragments", "a8-probes"], [genomics], [
    {id: "vntr", term: "Variable number tandem repeat", variants: ["variable number tandem repeats", "VNTR", "VNTRs"], support: "selective",
      meaning: "A short DNA sequence repeated directly next to itself, with the number of copies varying between individuals."},
    {id: "genetic-fingerprinting", term: "Genetic fingerprinting", synonyms: ["DNA profiling"], support: "selective",
      meaning: "Comparing patterns in DNA to distinguish individuals or assess how closely they are related."},
    {id: "gel-electrophoresis", term: "Gel electrophoresis", variants: ["electrophoresis"], support: "selective",
      meaning: "Using an electric field to separate molecules as they move through a gel.", here: "For the DNA fragments in this course, shorter pieces generally travel further in the same time."}
  ]);
})();

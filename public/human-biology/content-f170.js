/* Original revision content. Educational preview; see data.scope. */
window.KeystoneHumanData={
  "version": "f170-v1-2026-11",
  "specification": "Cambridge OCR H049/H149, version 8 (October 2026)",
  "specUrl": "https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf",
  "scope": "F170 learning pilot: curated coverage of all four topic areas, not every specification statement. Independently authored questions; not OCR exam questions.",
  "areas": [
    {
      "id": "area-1",
      "number": 1,
      "title": "Human cells and tissues",
      "intro": "Cell structure, observation, cell division, tissue specialisation and research models.",
      "sections": [
        {
          "id": "1.1.1",
          "title": "Human cells and specialisation",
          "summary": "Specialised human cells retain the core organisation of eukaryotes, but their organelles and shape reflect their roles.",
          "points": [
            "Most differentiated human cells have a membrane, cytoplasm and nucleus. A mature erythrocyte is an important exception: it lacks a nucleus and mitochondria.",
            "Rough endoplasmic reticulum carries ribosomes; the Golgi modifies and packages cell products. Mitochondria supply ATP by aerobic respiration.",
            "Adult stem cells may remain quiescent, then divide and differentiate in response to local signals; pluripotent stem cells can form a wider range of cell types."
          ],
          "cards": [
            {
              "id": "1.1.1-01",
              "q": "Organelle that modifies and packages proteins into vesicles",
              "a": "Golgi apparatus",
              "aliases": [
                "Golgi body"
              ],
              "explain": ""
            },
            {
              "id": "1.1.1-02",
              "q": "Why do mature human erythrocytes lack a nucleus?",
              "a": "It leaves more internal space for haemoglobin",
              "aliases": [
                "More room for haemoglobin"
              ],
              "explain": "Mature mammalian red cells also lack mitochondria."
            },
            {
              "id": "1.1.1-03",
              "q": "Where do adult blood-forming stem cells occur?",
              "a": "Bone marrow",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "1.1.1-04",
              "q": "Organelle enriched in cells requiring large amounts of ATP",
              "a": "Mitochondria",
              "aliases": [
                "Mitochondrion"
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "A protein-secreting cell has abundant rough ER and Golgi stacks. Explain the link.",
            "answer": "Ribosomes on the rough ER synthesise proteins; the Golgi modifies, sorts and packages them into vesicles.",
            "explain": "Mention the sequence of organelles rather than just naming them."
          }
        },
        {
          "id": "1.1.2",
          "title": "Microscopy and cell measurements",
          "summary": "Microscopy methods reveal different scales of organisation; image size and actual size must use consistent units.",
          "points": [
            "A light microscope can examine live cells; electron microscopes offer much greater resolution but require extensive specimen preparation.",
            "TEM reveals thin internal sections; SEM provides detailed images of surfaces.",
            "Magnification = image size ÷ actual size. Differential centrifugation separates components by sedimentation; a haemocytometer estimates cell concentration from a known chamber volume."
          ],
          "cards": [
            {
              "id": "1.1.2-01",
              "q": "Microscope best suited for a detailed image of the internal ultrastructure of a cell",
              "a": "Transmission electron microscope",
              "aliases": [
                "TEM"
              ],
              "explain": ""
            },
            {
              "id": "1.1.2-02",
              "q": "Microscope commonly used to show the three-dimensional appearance of a specimen surface",
              "a": "Scanning electron microscope",
              "aliases": [
                "SEM"
              ],
              "explain": ""
            },
            {
              "id": "1.1.2-03",
              "q": "Formula linking magnification, image size and actual size",
              "a": "Magnification = image size ÷ actual size",
              "aliases": [
                "Image size / actual size"
              ],
              "explain": ""
            },
            {
              "id": "1.1.2-04",
              "q": "Number of micrometres in one millimetre",
              "a": "1000",
              "aliases": [
                "1,000"
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "A cell is 40 mm long in a printed image and 20 µm long in reality. Calculate magnification.",
            "answer": "40,000 µm ÷ 20 µm = ×2000.",
            "explain": "Convert 40 mm into 40,000 µm before dividing."
          }
        },
        {
          "id": "1.1.3",
          "title": "Organelles working together",
          "summary": "Organelles function in networks; protein production requires genetic information, ribosomes and transport compartments.",
          "points": [
            "The nucleus contains DNA; the nucleolus is involved in ribosome assembly.",
            "Ribosomes synthesise polypeptides. Proteins for secretion move through rough ER and Golgi, then vesicles fuse with the plasma membrane.",
            "Mitochondria provide ATP for energy-requiring processes. Human cytoplasmic ribosomes are 80S; mitochondrial ribosomes are more prokaryote-like."
          ],
          "cards": [
            {
              "id": "1.1.3-01",
              "q": "Structure within the nucleus involved in ribosome assembly",
              "a": "Nucleolus",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "1.1.3-02",
              "q": "Organelle whose ribosomes synthesise many proteins destined for secretion",
              "a": "Rough endoplasmic reticulum",
              "aliases": [
                "RER"
              ],
              "explain": ""
            },
            {
              "id": "1.1.3-03",
              "q": "Ribosome type found in human cytoplasm",
              "a": "80S",
              "aliases": [
                "80 S"
              ],
              "explain": ""
            },
            {
              "id": "1.1.3-04",
              "q": "Process by which a vesicle fuses with the membrane and releases its contents",
              "a": "Exocytosis",
              "aliases": [],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Trace the route of a secreted protein from manufacture to release.",
            "answer": "Ribosomes on rough ER → rough ER → transport vesicle → Golgi apparatus → secretory vesicle → exocytosis.",
            "explain": "This subtopic does not require the molecular details of transcription and translation."
          }
        },
        {
          "id": "1.1.4",
          "title": "Cell membranes and transport",
          "summary": "The fluid mosaic model links membrane structure to selective transport, signalling and tissue recognition.",
          "points": [
            "Phospholipids form a bilayer with hydrophilic heads outward and hydrophobic tails inward; proteins and cholesterol are embedded within it.",
            "Simple diffusion needs no transport protein; facilitated diffusion uses a channel or carrier down a gradient. Active transport uses energy to move against a gradient.",
            "Osmosis is net water movement across a partially permeable membrane down a water-potential gradient. Cell-surface glycoproteins contribute to recognition and transplant rejection."
          ],
          "cards": [
            {
              "id": "1.1.4-01",
              "q": "Membrane model with a mobile phospholipid bilayer and embedded proteins",
              "a": "Fluid mosaic model",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "1.1.4-02",
              "q": "Passive transport down a gradient through membrane proteins",
              "a": "Facilitated diffusion",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "1.1.4-03",
              "q": "Bulk uptake of material by inward budding of the membrane",
              "a": "Endocytosis",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "1.1.4-04",
              "q": "Substances in the membrane important for cell recognition",
              "a": "Glycoproteins",
              "aliases": [
                "Cell surface glycoproteins"
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "A cell uses ATP to accumulate ions despite a higher ion concentration inside. Identify and explain the process.",
            "answer": "Active transport: membrane transport proteins move ions against the concentration gradient using energy.",
            "explain": "Do not confuse facilitated diffusion with ATP-driven transport."
          }
        },
        {
          "id": "1.1.5",
          "title": "Cell division and inheritance",
          "summary": "DNA replication, mitosis and meiosis contribute differently to growth, repair and genetic variation.",
          "points": [
            "Interphase includes growth and DNA replication (S phase). Mitosis is nuclear division followed usually by cytokinesis.",
            "Meiosis includes two divisions, reducing chromosome number and generating genetic variation through crossing over and independent assortment.",
            "Punnett squares model allele transmission. Most mitochondrial DNA is maternally inherited; mitochondrial replacement can reduce transmission of some mtDNA disorders."
          ],
          "cards": [
            {
              "id": "1.1.5-01",
              "q": "Phase of interphase when DNA is replicated",
              "a": "S phase",
              "aliases": [
                "S",
                "Synthesis phase"
              ],
              "explain": ""
            },
            {
              "id": "1.1.5-02",
              "q": "Mitosis stage when sister chromatids separate",
              "a": "Anaphase",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "1.1.5-03",
              "q": "Cell division that normally produces haploid gametes",
              "a": "Meiosis",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "1.1.5-04",
              "q": "Inheritance pattern of most human mitochondrial DNA",
              "a": "Maternal inheritance",
              "aliases": [
                "Maternally inherited"
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Two unaffected carriers of a recessive condition have a child. What is the chance the child is affected?",
            "answer": "25% (one in four), assuming both are heterozygous and the trait is fully recessive.",
            "explain": "Show Aa × Aa and distinguish genotype from phenotype."
          }
        },
        {
          "id": "1.2.1",
          "title": "Tissues, organs and systems",
          "summary": "Human biological organisation can be described at cell, tissue, organ and organ-system levels.",
          "points": [
            "A tissue is a group of cells organised to carry out related functions.",
            "An organ contains different tissues functioning together; an organ system comprises interacting organs.",
            "Different tissue types coexist within single organs, for example muscle, epithelium, connective tissue and nervous tissue in the gut."
          ],
          "cards": [
            {
              "id": "1.2.1-01",
              "q": "Level of organisation between cell and organ",
              "a": "Tissue",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "1.2.1-02",
              "q": "A structure composed of different tissues working together",
              "a": "Organ",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "1.2.1-03",
              "q": "Level of organisation above an organ",
              "a": "Organ system",
              "aliases": [
                "System"
              ],
              "explain": ""
            },
            {
              "id": "1.2.1-04",
              "q": "The four broad tissue classes include epithelial, muscle, connective and what else?",
              "a": "Nervous tissue",
              "aliases": [
                "Nervous"
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Explain why the stomach is an organ rather than a tissue.",
            "answer": "It contains multiple tissue types (for example epithelium, smooth muscle and nervous tissue) working together.",
            "explain": "A tissue is not defined by having only one cell type, but an organ has multiple tissue types."
          }
        },
        {
          "id": "1.2.2",
          "title": "Tissue structure and function",
          "summary": "The organisation of epithelia, muscle, connective tissues and blood explains their different roles.",
          "points": [
            "Squamous epithelium is thin for exchange; ciliated epithelium moves surface materials; cuboidal epithelium is common in secretion and absorption.",
            "Skeletal muscle is typically voluntary and striated; cardiac muscle is striated and interconnected; smooth muscle occurs in hollow organs.",
            "Bone and cartilage are specialised connective tissues. Blood is a tissue composed of plasma, erythrocytes, leukocytes and platelets."
          ],
          "cards": [
            {
              "id": "1.2.2-01",
              "q": "Thin epithelial tissue suitable for rapid diffusion",
              "a": "Squamous epithelium",
              "aliases": [
                "Simple squamous epithelium"
              ],
              "explain": ""
            },
            {
              "id": "1.2.2-02",
              "q": "Muscle tissue that forms the wall of the heart",
              "a": "Cardiac muscle",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "1.2.2-03",
              "q": "Fluid component of blood carrying cells and dissolved substances",
              "a": "Plasma",
              "aliases": [
                "Blood plasma"
              ],
              "explain": ""
            },
            {
              "id": "1.2.2-04",
              "q": "Membrane supporting epithelial cells and helping tissue repair",
              "a": "Basement membrane",
              "aliases": [],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Explain why the alveolar lining is made of thin squamous epithelium.",
            "answer": "It provides a short diffusion distance for oxygen and carbon dioxide.",
            "explain": "Focus on structure and function."
          }
        },
        {
          "id": "1.2.3",
          "title": "Tissue cultures and organoids",
          "summary": "Human tissue models support research but do not reproduce all interactions of a whole organism.",
          "points": [
            "Cell and tissue cultures grow under controlled, sterile conditions in suitable media.",
            "Organoids are three-dimensional, self-organised tissue models that reproduce selected structural or functional features of organs.",
            "Human-based models may reduce animal use and improve human relevance, but often lack complete blood supply, immune interactions or whole-body physiology."
          ],
          "cards": [
            {
              "id": "1.2.3-01",
              "q": "Three-dimensional miniature tissue model that reproduces some organ features",
              "a": "Organoid",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "1.2.3-02",
              "q": "Term for maintaining cells or tissues outside the body under laboratory conditions",
              "a": "In vitro",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "1.2.3-03",
              "q": "Major limitation of an organoid compared with a whole organ",
              "a": "It lacks some whole-organ interactions",
              "aliases": [
                "Incomplete organ interactions",
                "Lacks full circulation and immune interactions"
              ],
              "explain": ""
            },
            {
              "id": "1.2.3-04",
              "q": "A benefit of human tissue cultures for drug research",
              "a": "They provide human-relevant test material",
              "aliases": [
                "Reduced animal use"
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "A drug works in a liver organoid. Explain why its clinical safety is not yet established.",
            "answer": "The organoid cannot capture all whole-body metabolism, immune responses or drug effects in other tissues.",
            "explain": "An organoid finding needs further validation."
          }
        }
      ]
    },
    {
      "id": "area-2",
      "number": 2,
      "title": "Human physiology, organs and systems",
      "intro": "How organs and systems support each other, what happens when they fail, and how function is measured.",
      "sections": [
        {
          "id": "2.1.1",
          "title": "What physiologists study",
          "summary": "Human physiology studies the functions of organs and organ systems in health, exercise and disease.",
          "points": [
            "Anatomy describes structure; physiology investigates function and regulation.",
            "Physiologists use measurements to characterise responses to exercise, illness, treatment or ageing.",
            "Measurements need context: a result may change with activity, hydration or time of day."
          ],
          "cards": [
            {
              "id": "2.1.1-01",
              "q": "Discipline concerned with how human organs and organ systems function",
              "a": "Human physiology",
              "aliases": [
                "Physiology"
              ],
              "explain": ""
            },
            {
              "id": "2.1.1-02",
              "q": "Discipline primarily concerned with the structure of the body",
              "a": "Anatomy",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "2.1.1-03",
              "q": "Profession that investigates the functions of body systems",
              "a": "Physiologist",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "2.1.1-04",
              "q": "Why repeat a physiological measurement under standard conditions?",
              "a": "To improve comparability",
              "aliases": [
                "To control variables",
                "To improve reliability"
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Why might pulse rate differ between two measurements on the same healthy person?",
            "answer": "Activity, stress, posture or temperature can change heart rate.",
            "explain": "A physiological variable is not necessarily constant."
          }
        },
        {
          "id": "2.1.2",
          "title": "Organs and their specialisations",
          "summary": "Organ histology is closely related to function, particularly in circulation, digestion, breathing and excretion.",
          "points": [
            "The heart has right and left atria and ventricles, valves and a septum. Myocardium contracts; endocardium lines the chambers; the pericardium surrounds the heart.",
            "Alveoli provide a large surface area for gas exchange. The small intestine absorbs digested molecules; the colon reabsorbs water.",
            "Nephrons form urine by filtration and selective reabsorption; the pancreas has exocrine digestive and endocrine hormonal functions."
          ],
          "cards": [
            {
              "id": "2.1.2-01",
              "q": "Muscular layer of the heart wall",
              "a": "Myocardium",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "2.1.2-02",
              "q": "Blood vessel bringing nutrient-rich blood from the gut to the liver",
              "a": "Hepatic portal vein",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "2.1.2-03",
              "q": "Air sacs where gas exchange takes place",
              "a": "Alveoli",
              "aliases": [
                "Alveolus"
              ],
              "explain": ""
            },
            {
              "id": "2.1.2-04",
              "q": "Organ with both endocrine and exocrine functions",
              "a": "Pancreas",
              "aliases": [],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Why does the liver receive blood from both the hepatic artery and the hepatic portal vein?",
            "answer": "The artery supplies oxygenated blood; the portal vein brings absorbed nutrients and other substances from the gut.",
            "explain": "These are different sources with different functions."
          }
        },
        {
          "id": "2.1.3",
          "title": "When organs fail",
          "summary": "Disorders change tissue structure or function and can disrupt several systems simultaneously.",
          "points": [
            "Examples include atherosclerosis, valve defects, osteoporosis, cirrhosis, COPD, inflammatory bowel disease, kidney failure and pancreatic disorders.",
            "Atherosclerotic plaques narrow arteries and may restrict blood supply. COPD can reduce effective ventilation and gas exchange.",
            "DEXA scans estimate bone mineral density and help assess osteoporosis."
          ],
          "cards": [
            {
              "id": "2.1.3-01",
              "q": "Plaque build-up in arterial walls",
              "a": "Atherosclerosis",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "2.1.3-02",
              "q": "Chronic liver damage with fibrosis and altered architecture",
              "a": "Cirrhosis",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "2.1.3-03",
              "q": "Scanning method used to assess bone mineral density",
              "a": "DEXA",
              "aliases": [
                "Dual-energy X-ray absorptiometry",
                "DXA"
              ],
              "explain": ""
            },
            {
              "id": "2.1.3-04",
              "q": "Obstructive lung disease associated with damaged alveoli and reduced elastic recoil",
              "a": "Emphysema",
              "aliases": [],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "A person has extensive pulmonary emphysema. Explain why gas exchange may be reduced.",
            "answer": "Alveolar walls are destroyed, reducing surface area for diffusion.",
            "explain": "Mention surface area, not simply that breathing is difficult."
          }
        },
        {
          "id": "2.1.4",
          "title": "Transplants and artificial organs",
          "summary": "Replacing organ function can be lifesaving, but transplantation and artificial support have limitations.",
          "points": [
            "Donor-organ immune recognition can trigger rejection; matching and immunosuppressive medication reduce risk.",
            "Artificial or mechanical organs can bridge to recovery or transplant, but may carry infection, clotting, mechanical or resource burdens.",
            "Corrective surgery may repair a damaged organ without replacing it."
          ],
          "cards": [
            {
              "id": "2.1.4-01",
              "q": "Immune attack on transplanted tissue",
              "a": "Transplant rejection",
              "aliases": [
                "Rejection"
              ],
              "explain": ""
            },
            {
              "id": "2.1.4-02",
              "q": "Medicines used to reduce immune activity after transplant",
              "a": "Immunosuppressants",
              "aliases": [
                "Immunosuppressive drugs"
              ],
              "explain": ""
            },
            {
              "id": "2.1.4-03",
              "q": "One major limitation of mechanical organ support",
              "a": "Risk of infection or thrombosis",
              "aliases": [
                "Infection",
                "Blood clots",
                "Mechanical failure"
              ],
              "explain": ""
            },
            {
              "id": "2.1.4-04",
              "q": "Surgery repairing a native organ rather than replacing it",
              "a": "Corrective surgery",
              "aliases": [],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Why are matched donor organs still not always free from rejection risk?",
            "answer": "Recipient immune responses can recognise remaining donor antigens as foreign.",
            "explain": "Matching reduces risk; it does not abolish it."
          }
        },
        {
          "id": "2.2.1",
          "title": "Organ systems",
          "summary": "A system coordinates the actions of several organs to achieve a common physiological function.",
          "points": [
            "The circulatory system transports blood and dissolved substances; the respiratory system provides ventilation and gas exchange.",
            "The gastrointestinal system digests and absorbs; the renal/excretory system removes wastes and regulates water and ions.",
            "Systems depend on one another, especially the circulation that supplies tissues."
          ],
          "cards": [
            {
              "id": "2.2.1-01",
              "q": "Group of organs working together to perform a common function",
              "a": "Organ system",
              "aliases": [
                "System"
              ],
              "explain": ""
            },
            {
              "id": "2.2.1-02",
              "q": "System responsible for blood transport",
              "a": "Circulatory system",
              "aliases": [
                "Blood circulatory system"
              ],
              "explain": ""
            },
            {
              "id": "2.2.1-03",
              "q": "System that removes urea in urine",
              "a": "Excretory system",
              "aliases": [
                "Urinary system"
              ],
              "explain": ""
            },
            {
              "id": "2.2.1-04",
              "q": "System coordinating movements through muscles and skeleton",
              "a": "Musculoskeletal system",
              "aliases": [],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Explain why the digestive and circulatory systems are functionally linked.",
            "answer": "Digestion produces absorbable nutrients; blood transports absorbed nutrients to tissues.",
            "explain": "Identify what is transferred between the systems."
          }
        },
        {
          "id": "2.2.2",
          "title": "How human systems interact",
          "summary": "Homeostasis, respiration, excretion, lymphatic drainage and circulation require coordinated organs.",
          "points": [
            "Blood transports gases, nutrients, hormones and immune cells. The lymphatic system returns interstitial fluid and supports immune surveillance.",
            "The skeleton supports movement, stores calcium and contains blood-forming marrow.",
            "Homeostatic regulation includes body temperature, plasma glucose and water balance; mechanisms commonly use negative feedback."
          ],
          "cards": [
            {
              "id": "2.2.2-01",
              "q": "System that returns excess interstitial fluid towards the bloodstream",
              "a": "Lymphatic system",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "2.2.2-02",
              "q": "Mechanism opposing deviations from a physiological set point",
              "a": "Negative feedback",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "2.2.2-03",
              "q": "Blood cell production in marrow",
              "a": "Haematopoiesis",
              "aliases": [
                "Hematopoiesis"
              ],
              "explain": ""
            },
            {
              "id": "2.2.2-04",
              "q": "System involving trachea, bronchi, lungs and breathing muscles",
              "a": "Respiratory system",
              "aliases": [],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "During exercise, both breathing rate and cardiac output rise. Explain why.",
            "answer": "Working muscles need more oxygen and fuel and produce more carbon dioxide; ventilation and blood flow support exchange and transport.",
            "explain": "Link at least two organ systems."
          }
        },
        {
          "id": "2.2.3",
          "title": "Measuring system activity",
          "summary": "Clinical measurements are useful only when taken appropriately and interpreted with relevant limitations.",
          "points": [
            "Examples include blood pressure, radial pulse, ECG, spirometry, peak expiratory flow, FeNO, glucose testing, temperature, ultrasound, colonoscopy and urinalysis.",
            "Spirometry measures volumes and flow; peak flow measures maximal expiratory flow; FeNO can indicate airway inflammation in an appropriate clinical context.",
            "Pulmonary ventilation rate = breathing rate × tidal volume. Test sensitivity, technique, context and repeatability influence interpretation."
          ],
          "cards": [
            {
              "id": "2.2.3-01",
              "q": "Device commonly used to measure arterial blood pressure",
              "a": "Sphygmomanometer",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "2.2.3-02",
              "q": "Electrical recording of the heart's activity",
              "a": "ECG",
              "aliases": [
                "Electrocardiogram"
              ],
              "explain": ""
            },
            {
              "id": "2.2.3-03",
              "q": "Test measuring maximal forced expiratory airflow",
              "a": "Peak expiratory flow",
              "aliases": [
                "Peak flow"
              ],
              "explain": ""
            },
            {
              "id": "2.2.3-04",
              "q": "Pulmonary ventilation rate formula",
              "a": "Breathing rate × tidal volume",
              "aliases": [
                "Respiratory rate × tidal volume"
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "A person takes 15 breaths each minute, each with a tidal volume of 500 cm³. Calculate ventilation rate.",
            "answer": "15 × 500 = 7500 cm³ min⁻¹ (7.5 L min⁻¹).",
            "explain": "Include the time and volume units."
          }
        }
      ]
    },
    {
      "id": "area-3",
      "number": 3,
      "title": "Endocrinology, neurobiology and reproduction",
      "intro": "Hormones, negative feedback, nerve signalling and reproductive function.",
      "sections": [
        {
          "id": "3.1.1",
          "title": "Hormones and homeostasis",
          "summary": "Endocrine signals act through the blood; negative feedback helps stabilise the internal environment.",
          "points": [
            "Hormones act on cells with appropriate receptors. Examples include adrenaline, thyroxine, somatostatin, erythropoietin, calcitonin, insulin and ADH.",
            "Negative feedback involves a change being detected, coordination of a response and an effector acting to oppose the change.",
            "Insulin lowers plasma glucose; ADH increases water reabsorption in kidney collecting ducts; erythropoietin stimulates red cell production."
          ],
          "cards": [
            {
              "id": "3.1.1-01",
              "q": "Hormone released by pancreatic beta cells that lowers blood glucose",
              "a": "Insulin",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "3.1.1-02",
              "q": "Hormone that increases water reabsorption by kidneys",
              "a": "ADH",
              "aliases": [
                "Antidiuretic hormone",
                "Vasopressin"
              ],
              "explain": ""
            },
            {
              "id": "3.1.1-03",
              "q": "Hormone that stimulates red blood cell production",
              "a": "Erythropoietin",
              "aliases": [
                "EPO"
              ],
              "explain": ""
            },
            {
              "id": "3.1.1-04",
              "q": "Control process that opposes a deviation from a normal range",
              "a": "Negative feedback",
              "aliases": [],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "After dehydration, ADH secretion rises. Explain how this helps restore balance.",
            "answer": "ADH makes collecting ducts more permeable to water, increasing water reabsorption and reducing urine volume.",
            "explain": "A homeostatic response acts to counter the original change."
          }
        },
        {
          "id": "3.1.2",
          "title": "Monitoring homeostasis",
          "summary": "Physiological measurements can identify abnormal temperature, water balance or plasma glucose regulation.",
          "points": [
            "Hypoglycaemia means abnormally low blood glucose; hyperglycaemia means abnormally high blood glucose.",
            "Type 1 diabetes involves autoimmune destruction of beta cells; type 2 involves impaired insulin sensitivity and progressive insulin-secretion problems.",
            "Fasting provides a more standardised starting point for glucose testing. Wearable glucose sensors offer useful trends but have measurement limitations."
          ],
          "cards": [
            {
              "id": "3.1.2-01",
              "q": "Abnormally low plasma glucose concentration",
              "a": "Hypoglycaemia",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "3.1.2-02",
              "q": "Abnormally high plasma glucose concentration",
              "a": "Hyperglycaemia",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "3.1.2-03",
              "q": "Type of diabetes involving autoimmune beta-cell destruction",
              "a": "Type 1 diabetes",
              "aliases": [
                "Type 1 diabetes mellitus"
              ],
              "explain": ""
            },
            {
              "id": "3.1.2-04",
              "q": "Purpose of fasting before an oral glucose tolerance test",
              "a": "To standardise baseline glucose",
              "aliases": [
                "To establish a standard baseline",
                "To reduce effects of recent food intake"
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "A patient is thirsty and passes unusually large volumes of urine. Why could uncontrolled hyperglycaemia produce both signs?",
            "answer": "Glucose in the filtrate can reduce water reabsorption, causing osmotic diuresis and increased thirst.",
            "explain": "These signs require clinical investigation, not diagnosis from symptoms alone."
          }
        },
        {
          "id": "3.2.1",
          "title": "Neurons and the reflex arc",
          "summary": "Specialised neurons carry signals, and rapid reflex pathways can operate through the spinal cord.",
          "points": [
            "Sensory neurons transmit signals from receptors; relay neurons coordinate within the CNS; motor neurons transmit signals to effectors.",
            "An action potential involves depolarisation and repolarisation. Myelin increases conduction speed by supporting saltatory conduction between nodes of Ranvier.",
            "The autonomic nervous system is part of the peripheral nervous system, regulated through central pathways; it is not an alternative to the CNS."
          ],
          "cards": [
            {
              "id": "3.2.1-01",
              "q": "Neuron carrying signals from a receptor towards the CNS",
              "a": "Sensory neuron",
              "aliases": [
                "Sensory neurone"
              ],
              "explain": ""
            },
            {
              "id": "3.2.1-02",
              "q": "Neuron carrying signals from the CNS to an effector",
              "a": "Motor neuron",
              "aliases": [
                "Motor neurone"
              ],
              "explain": ""
            },
            {
              "id": "3.2.1-03",
              "q": "Gaps between myelin sheaths along an axon",
              "a": "Nodes of Ranvier",
              "aliases": [
                "Node of Ranvier"
              ],
              "explain": ""
            },
            {
              "id": "3.2.1-04",
              "q": "Jumping-like conduction between nodes on myelinated axons",
              "a": "Saltatory conduction",
              "aliases": [],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Multiple sclerosis can damage myelin. Predict the effect on nerve conduction.",
            "answer": "Saltatory conduction becomes slower or disrupted, impairing signal transmission.",
            "explain": "Do not describe nerve impulses as simply travelling inside the myelin."
          }
        },
        {
          "id": "3.2.2",
          "title": "Brain and spinal cord",
          "summary": "Major brain regions contribute to behaviour, coordination and physiological regulation.",
          "points": [
            "The cerebrum supports higher processing and voluntary function; the cerebellum supports movement coordination.",
            "The hypothalamus regulates aspects of homeostasis and influences the pituitary; the medulla contains centres important in cardiovascular and respiratory control.",
            "Meninges protect the CNS; cerebrospinal fluid cushions and circulates within ventricles and surrounding spaces."
          ],
          "cards": [
            {
              "id": "3.2.2-01",
              "q": "Brain region important in coordinating movement",
              "a": "Cerebellum",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "3.2.2-02",
              "q": "Brain region linking homeostatic regulation and endocrine control",
              "a": "Hypothalamus",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "3.2.2-03",
              "q": "Membranes protecting the brain and spinal cord",
              "a": "Meninges",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "3.2.2-04",
              "q": "Fluid circulating around the CNS and within cerebral ventricles",
              "a": "Cerebrospinal fluid",
              "aliases": [
                "CSF"
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Why might cerebrospinal fluid be sampled when infection of the CNS is suspected?",
            "answer": "It can be tested for organisms, immune cells and biochemical changes associated with infection.",
            "explain": "A lumbar puncture is an investigation, not a treatment."
          }
        },
        {
          "id": "3.3.1",
          "title": "Reproductive anatomy",
          "summary": "Structures of the reproductive systems cooperate in gamete production, fertilisation and development.",
          "points": [
            "Ovaries produce oocytes; oviducts transport them; uterus supports implantation and pregnancy. The cervix connects uterus and vagina.",
            "Testes produce sperm; epididymides support sperm maturation and storage; vas deferens transports sperm; accessory glands add seminal fluid.",
            "Human sex traits vary; reproductive anatomy does not always fit two typical patterns. The specification also requires recognition of uterine, ovarian and testicular tissues in photomicrographs."
          ],
          "cards": [
            {
              "id": "3.3.1-01",
              "q": "Tube carrying an oocyte from ovary towards the uterus",
              "a": "Oviduct",
              "aliases": [
                "Fallopian tube"
              ],
              "explain": ""
            },
            {
              "id": "3.3.1-02",
              "q": "Structure where sperm mature and are stored",
              "a": "Epididymis",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "3.3.1-03",
              "q": "Duct transporting sperm from the epididymis towards the urethra",
              "a": "Vas deferens",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "3.3.1-04",
              "q": "Organ whose lining supports implantation",
              "a": "Uterus",
              "aliases": [],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Why is seeing an ovarian follicle in a tissue section evidence of ovarian rather than uterine tissue?",
            "answer": "Ovarian follicles contain developing oocytes surrounded by follicular cells, unlike the uterine endometrium.",
            "explain": "Images must be interpreted using visible structural features."
          }
        },
        {
          "id": "3.3.2",
          "title": "Hormonal control of gametes",
          "summary": "FSH, LH and sex steroids coordinate reproductive processes and secondary sexual characteristics.",
          "points": [
            "FSH supports ovarian follicle development and sperm production. LH triggers ovulation and supports testosterone production in testes.",
            "Oestrogen and progesterone are important in endometrial and reproductive regulation; testosterone supports male-typical secondary sexual characteristics and sperm production.",
            "Oocyte maturation and release are generally cyclic, while sperm production after puberty is relatively continuous."
          ],
          "cards": [
            {
              "id": "3.3.2-01",
              "q": "Pituitary hormone associated with ovulation",
              "a": "Luteinising hormone",
              "aliases": [
                "LH"
              ],
              "explain": ""
            },
            {
              "id": "3.3.2-02",
              "q": "Pituitary hormone supporting ovarian follicle development",
              "a": "Follicle-stimulating hormone",
              "aliases": [
                "FSH"
              ],
              "explain": ""
            },
            {
              "id": "3.3.2-03",
              "q": "Hormone important in maintaining the uterine lining during pregnancy",
              "a": "Progesterone",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "3.3.2-04",
              "q": "Principal androgen secreted by testicular Leydig cells",
              "a": "Testosterone",
              "aliases": [],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Explain why loss of pituitary FSH secretion can impair fertility.",
            "answer": "FSH supports ovarian follicle development and also supports spermatogenesis; insufficient signalling can disrupt gamete production.",
            "explain": "Do not assume effects are identical in all reproductive systems."
          }
        },
        {
          "id": "3.3.3",
          "title": "Reproduction and ageing",
          "summary": "Ageing changes endocrine function, fertility and the risk-benefit balance of treatments.",
          "points": [
            "Menopause follows declining ovarian follicular function; symptoms can include vasomotor changes and urogenital symptoms.",
            "Hormone therapy may relieve symptoms but suitability depends on individual benefits, risks and clinical circumstances.",
            "Benign prostatic enlargement can obstruct the urethra and affect urination; fertility and pregnancy risks change with age."
          ],
          "cards": [
            {
              "id": "3.3.3-01",
              "q": "Life stage marking the permanent cessation of menstruation due to ovarian ageing",
              "a": "Menopause",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "3.3.3-02",
              "q": "Organ whose enlargement can obstruct urinary flow in some ageing males",
              "a": "Prostate gland",
              "aliases": [
                "Prostate"
              ],
              "explain": ""
            },
            {
              "id": "3.3.3-03",
              "q": "Therapy sometimes used to relieve menopausal symptoms",
              "a": "Hormone replacement therapy",
              "aliases": [
                "HRT",
                "Menopausal hormone therapy"
              ],
              "explain": ""
            },
            {
              "id": "3.3.3-04",
              "q": "One factor that increases with maternal age and can affect pregnancy outcomes",
              "a": "Risk of chromosomal abnormalities",
              "aliases": [
                "Chromosomal abnormality risk"
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Why can prostatic enlargement alter urination?",
            "answer": "The prostate surrounds the proximal urethra; enlargement can compress it and impede urine flow.",
            "explain": "A larger prostate does not always cause symptoms."
          }
        }
      ]
    },
    {
      "id": "area-4",
      "number": 4,
      "title": "Basics of microbiology",
      "intro": "Bacteria, fungi, viruses, culture methods and the beneficial human microbiota.",
      "sections": [
        {
          "id": "4.1.1",
          "title": "Bacterial cells",
          "summary": "Bacteria are prokaryotic cells with structures and growth patterns distinct from human cells.",
          "points": [
            "Typical bacterial structures include a plasma membrane, peptidoglycan wall, cytoplasm, 70S ribosomes, circular chromosome and sometimes plasmids, capsule and flagellum.",
            "Gram-positive cells have relatively thick peptidoglycan; Gram-negative cells have an outer membrane and a thinner peptidoglycan layer.",
            "The OCR specification lists 'mesosomes'; modern microscopy regards many classical mesosome images as chemical-fixation artefacts, not established membrane organelles."
          ],
          "cards": [
            {
              "id": "4.1.1-01",
              "q": "Major structural polymer in bacterial cell walls",
              "a": "Peptidoglycan",
              "aliases": [
                "Murein"
              ],
              "explain": ""
            },
            {
              "id": "4.1.1-02",
              "q": "Type of cytoplasmic ribosome found in most bacteria",
              "a": "70S",
              "aliases": [
                "70 S"
              ],
              "explain": ""
            },
            {
              "id": "4.1.1-03",
              "q": "Small extra-chromosomal DNA molecule in many bacteria",
              "a": "Plasmid",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "4.1.1-04",
              "q": "Bacterial group with an outer membrane as well as peptidoglycan",
              "a": "Gram-negative",
              "aliases": [
                "Gram negative"
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "A student claims a mesosome is a proven bacterial respiration organelle. Evaluate the claim.",
            "answer": "Many reported mesosomes are electron-microscopy preparation artefacts; do not treat them as established respiration organelles.",
            "explain": "The specification names mesosomes, but current biological evidence requires care."
          }
        },
        {
          "id": "4.1.2",
          "title": "Fungi and fungal disease",
          "summary": "Fungi are eukaryotes whose cell walls, hyphae and spores differ from bacterial structures.",
          "points": [
            "Fungal walls contain chitin. Hyphae extend through substrates; branching hyphae form a mycelium. Septa can subdivide hyphae.",
            "Fungal extracellular enzymes digest material outside cells. Saprotrophs use non-living material; parasites obtain resources from hosts.",
            "Relevant diseases include aspergillosis, Candida-associated candidiasis and athlete's foot caused by dermatophyte fungi (including Tinea)."
          ],
          "cards": [
            {
              "id": "4.1.2-01",
              "q": "Structural polymer associated with fungal cell walls",
              "a": "Chitin",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "4.1.2-02",
              "q": "Long branching fungal filament",
              "a": "Hypha",
              "aliases": [
                "Hyphae"
              ],
              "explain": ""
            },
            {
              "id": "4.1.2-03",
              "q": "Network of fungal hyphae",
              "a": "Mycelium",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "4.1.2-04",
              "q": "Fungal infection commonly causing athlete's foot",
              "a": "Tinea",
              "aliases": [
                "Tinea species",
                "Tinea sp."
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Why are extracellular enzymes useful to a saprotrophic fungus?",
            "answer": "They hydrolyse complex nutrients outside the fungus into smaller soluble molecules that can be absorbed.",
            "explain": "Enzymes need not act inside a cell."
          }
        },
        {
          "id": "4.1.3",
          "title": "Where bacteria are found",
          "summary": "Microbes occupy skin, mucosal surfaces, the gut and many external environments.",
          "points": [
            "Bacteria can colonise skin, conjunctiva, teeth, gastrointestinal and reproductive tracts, and environmental water, soil and surfaces.",
            "Sampling methods must account for contamination, location and the risks of culturing unknown organisms.",
            "Aseptic technique limits accidental introduction or escape of microbes, but it cannot make an unverified clinical sample automatically safe."
          ],
          "cards": [
            {
              "id": "4.1.3-01",
              "q": "Term for methods that minimise contamination during microbiological work",
              "a": "Aseptic technique",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "4.1.3-02",
              "q": "Large-intestine region with a dense microbial community",
              "a": "Colon",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "4.1.3-03",
              "q": "One major limitation of environmental bacterial sampling",
              "a": "Risk of contamination",
              "aliases": [
                "Sampling bias",
                "Contamination risk"
              ],
              "explain": ""
            },
            {
              "id": "4.1.3-04",
              "q": "Biological barrier made of epithelial cells and secreted mucus",
              "a": "Mucous membrane",
              "aliases": [
                "Mucosa"
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Two swabs give different colony counts. Name one potential sampling limitation.",
            "answer": "Differences in swabbed area, pressure, technique, transfer efficiency or contamination can change the count.",
            "explain": "Counts are estimates dependent on method."
          }
        },
        {
          "id": "4.1.4",
          "title": "Bacterial growth and culture",
          "summary": "Bacterial populations grow by binary fission but are limited by changing culture conditions.",
          "points": [
            "Binary fission usually produces two genetically identical daughter cells, unless mutation occurs.",
            "Growth curves often show lag, exponential, stationary and decline phases as nutrient availability and death rates change.",
            "After n ideal divisions from one cell the population is 2^n. Agar gives a solid surface; nutrient broth is liquid. Culture handling requires appropriate risk assessment and aseptic technique."
          ],
          "cards": [
            {
              "id": "4.1.4-01",
              "q": "Asexual bacterial reproduction by division into two cells",
              "a": "Binary fission",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "4.1.4-02",
              "q": "Growth-curve phase of rapid repeated doubling",
              "a": "Exponential phase",
              "aliases": [
                "Log phase"
              ],
              "explain": ""
            },
            {
              "id": "4.1.4-03",
              "q": "Growth-curve phase where division and death rates are approximately balanced",
              "a": "Stationary phase",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "4.1.4-04",
              "q": "Ideal population after five doublings starting from one cell",
              "a": "32",
              "aliases": [],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "A population starts with 40 bacteria and doubles five times. Estimate its size.",
            "answer": "40 × 2^5 = 1280 bacteria.",
            "explain": "The simple doubling model assumes no deaths and sufficient resources."
          }
        },
        {
          "id": "4.1.5",
          "title": "Viruses",
          "summary": "Viruses are acellular infectious particles that reproduce only using host cells.",
          "points": [
            "Virions contain genetic material (DNA or RNA) inside a protein capsid; some also have a lipid envelope and glycoprotein spikes.",
            "Viruses lack ribosomes and independent metabolic machinery, so they depend on living cells to reproduce.",
            "Bacteriophages infect bacteria, often with specialised structures for attachment and genome delivery."
          ],
          "cards": [
            {
              "id": "4.1.5-01",
              "q": "Protein shell enclosing viral nucleic acid",
              "a": "Capsid",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "4.1.5-02",
              "q": "Virus that infects bacteria",
              "a": "Bacteriophage",
              "aliases": [
                "Phage"
              ],
              "explain": ""
            },
            {
              "id": "4.1.5-03",
              "q": "Molecule a virus can use as its genome",
              "a": "DNA or RNA",
              "aliases": [
                "RNA or DNA"
              ],
              "explain": ""
            },
            {
              "id": "4.1.5-04",
              "q": "Why do viruses rely on host cells for reproduction?",
              "a": "They lack independent protein synthesis machinery",
              "aliases": [
                "They lack ribosomes",
                "They require host machinery"
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "Explain why antibiotics targeting bacterial ribosomes do not directly stop viral replication.",
            "answer": "Viruses have no bacterial ribosomes; they use host-cell machinery.",
            "explain": "This does not mean all viral infections are untreatable."
          }
        },
        {
          "id": "4.2",
          "title": "Beneficial microbes and the human microbiota",
          "summary": "Microbes can support health, but interventions that alter the microbiota need sound evidence and safety checks.",
          "points": [
            "The human microbiota includes bacteria and fungi in different body sites; its activities can support metabolism, colonisation resistance and immune responses.",
            "Certain intestinal bacteria synthesise vitamins. Microbial competition can make it harder for some pathogens to establish themselves.",
            "Probiotics may alter microbial communities in some contexts. Faecal microbiota transplantation is established for selected recurrent C. difficile infections, but its use for obesity remains investigational rather than established routine treatment."
          ],
          "cards": [
            {
              "id": "4.2-01",
              "q": "Community of microorganisms living in a particular body site",
              "a": "Microbiota",
              "aliases": [
                "Microbial community"
              ],
              "explain": ""
            },
            {
              "id": "4.2-02",
              "q": "Interaction in which resident microbes limit pathogen growth",
              "a": "Colonisation resistance",
              "aliases": [
                "Colonization resistance"
              ],
              "explain": ""
            },
            {
              "id": "4.2-03",
              "q": "Food or product containing live microorganisms intended to confer a health benefit",
              "a": "Probiotic",
              "aliases": [],
              "explain": ""
            },
            {
              "id": "4.2-04",
              "q": "Potential benefit of some gut bacteria",
              "a": "Vitamin production",
              "aliases": [
                "Production of vitamins",
                "Pathogen competition",
                "Immune support"
              ],
              "explain": ""
            }
          ],
          "scenario": {
            "prompt": "A social-media post claims a microbiota transplant is an established cure for obesity. Evaluate the claim.",
            "answer": "Evidence for obesity treatment is still investigational; microbiota interventions have variable results and potential safety risks.",
            "explain": "Do not conflate experimental research with recommended clinical practice."
          }
        }
      ]
    }
  ]
};

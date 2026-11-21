/* Original supplementary questions mapped to OCR Human Biology specification v8 (October 2026).
   Exam-unit subject knowledge only: no official question text or coursework support.
   Keep this file loaded after challenge-bank.js and before challenge.js. */
(function(){
"use strict";
var bank=window.KeystoneHumanChallenges;
if(!bank||!Array.isArray(bank.questions))return;
var additions=[
  {
    "id": "f170-tissue-hierarchy",
    "unit": "f170",
    "area": 1,
    "section": "1.2.1",
    "type": "order",
    "level": "core",
    "stem": "Arrange these levels of organisation from smallest to largest.",
    "items": [
      "Cell",
      "Tissue",
      "Organ",
      "Organ system"
    ],
    "model": "Cell → tissue → organ → organ system.",
    "explain": "Cells form tissues; different tissues work together within an organ, and organs cooperate in systems.",
    "misconception": "An organ contains several tissue types, so a tissue and an organ are not interchangeable.",
    "hintCue": "Start with an individual living cell; which level contains several different tissues?"
  },
  {
    "id": "f170-physiology-function",
    "unit": "f170",
    "area": 2,
    "section": "2.1.1",
    "type": "single",
    "level": "core",
    "stem": "Which investigation primarily studies physiology rather than anatomy?",
    "options": [
      "Measuring breathing-rate changes during exercise",
      "Identifying the four chambers of a heart",
      "Locating the pancreas in an abdomen",
      "Describing the shape of a vertebra"
    ],
    "correct": 0,
    "model": "Measuring breathing-rate changes during exercise",
    "explain": "Physiology concerns how living systems function and respond; anatomy describes their structures and locations.",
    "misconception": "Naming or locating a structure does not in itself show how that structure functions.",
    "hintCue": "Choose an investigation of a changing bodily function, rather than a description of structure."
  },
  {
    "id": "f171-skin-barrier",
    "unit": "f171",
    "area": 3,
    "section": "3.1",
    "type": "single",
    "level": "core",
    "stem": "How does intact skin contribute to innate immunity?",
    "options": [
      "It forms a physical barrier to pathogen entry",
      "It produces a unique antibody to each new infection",
      "It stores all the body's memory B cells",
      "It replaces the need for white blood cells"
    ],
    "correct": 0,
    "model": "It forms a physical barrier to pathogen entry.",
    "explain": "Intact skin is a first-line physical defence, part of the innate immune system.",
    "misconception": "A barrier is non-specific; producing antigen-specific antibodies belongs to adaptive immunity.",
    "hintCue": "Consider whether intact skin must recognise a particular antigen before protecting the body."
  },
  {
    "id": "f171-phagocytosis-sequence",
    "unit": "f171",
    "area": 3,
    "section": "3.1",
    "type": "order",
    "level": "apply",
    "stem": "Put these simplified stages of phagocytosis in order.",
    "items": [
      "Phagocyte encounters and recognises a bacterium",
      "Phagocyte engulfs the bacterium in a vesicle",
      "The vesicle fuses with a lysosome",
      "Lysosomal enzymes break down the engulfed material"
    ],
    "model": "Recognition → engulfment → fusion with lysosome → digestion.",
    "explain": "Neutrophils and macrophages can engulf pathogens and digest material within intracellular compartments.",
    "misconception": "Antibodies may help recognition, but they do not themselves engulf bacteria.",
    "hintCue": "Identify the step that brings the pathogen inside the cell before enzymes can digest it."
  },
  {
    "id": "f171-mast-cell-histamine",
    "unit": "f171",
    "area": 3,
    "section": "3.1",
    "type": "single",
    "level": "core",
    "stem": "Which immune cell can release histamine during an allergic response?",
    "options": [
      "Mast cell",
      "Plasma cell",
      "Cytotoxic T cell",
      "Memory B cell"
    ],
    "correct": 0,
    "model": "Mast cell",
    "explain": "Activated mast cells release histamine and other mediators that contribute to local inflammation and allergy symptoms.",
    "misconception": "Plasma cells mainly secrete antibodies; they are not the main histamine-releasing cells in tissues.",
    "hintCue": "Think of the granule-containing cells found in tissues that contribute to immediate allergic reactions."
  },
  {
    "id": "f171-immune-cell-roles",
    "unit": "f171",
    "area": 3,
    "section": "3.1",
    "type": "match",
    "level": "apply",
    "stem": "Match each immune cell to its principal role.",
    "pairs": [
      [
        "Plasma cell",
        "Secretes antibodies"
      ],
      [
        "Helper T cell",
        "Coordinates aspects of the adaptive response"
      ],
      [
        "Neutrophil",
        "Can engulf and destroy microbes"
      ],
      [
        "Cytotoxic T cell",
        "Can kill infected body cells"
      ]
    ],
    "model": "Plasma cell → antibodies; helper T cell → coordination; neutrophil → phagocytosis; cytotoxic T cell → killing infected cells.",
    "explain": "Different immune cells make complementary contributions to specific and non-specific defences.",
    "misconception": "Antibodies are secreted by plasma cells, not by cytotoxic T cells.",
    "hintCue": "Separate the cell that secretes immunoglobulins from the one that directly kills infected cells."
  },
  {
    "id": "f171-antigen-antibody-complex",
    "unit": "f171",
    "area": 3,
    "section": "3.1",
    "type": "multi",
    "level": "apply",
    "stem": "Which TWO statements about antigen–antibody complexes are correct?",
    "options": [
      "They form through binding to specific antigen features",
      "They can help identify targets for immune clearance",
      "They are made when an antigen changes into an antibody",
      "They require red blood cells to manufacture antibodies"
    ],
    "correct": [
      0,
      1
    ],
    "model": "Specific binding; complexes can aid immune clearance.",
    "explain": "Antibodies bind specific antigenic sites; the resulting complexes can neutralise targets or help other immune mechanisms remove them.",
    "misconception": "Antigens do not transform into antibodies, and erythrocytes do not produce immunoglobulins.",
    "hintCue": "What recognises a particular part of an antigen, and how might that help other immune cells?"
  },
  {
    "id": "f171-autoimmunity",
    "unit": "f171",
    "area": 3,
    "section": "3.2.1",
    "type": "single",
    "level": "core",
    "stem": "What happens in an autoimmune disease?",
    "options": [
      "An immune response targets the body's own tissues",
      "The immune system stops recognising all microbes",
      "The body acquires antibodies only through injection",
      "The skin becomes completely impermeable to antigens"
    ],
    "correct": 0,
    "model": "The immune response mistakenly targets self tissues.",
    "explain": "Autoimmunity involves inappropriate immune responses against components of the person's own body.",
    "misconception": "An immunodeficiency is impaired defence; it is not the same as an autoimmune attack on self.",
    "hintCue": "Distinguish an attack on 'self' from failure to respond adequately to infection."
  },
  {
    "id": "f171-immune-dysfunction-match",
    "unit": "f171",
    "area": 3,
    "section": "3.2.1",
    "type": "match",
    "level": "apply",
    "stem": "Match each description to the immune-system concept.",
    "pairs": [
      [
        "Inherited defect causing poor immune defence",
        "Primary immunodeficiency"
      ],
      [
        "HIV-associated weakening of immune defence",
        "Acquired immunodeficiency"
      ],
      [
        "Immune attack on healthy self tissue",
        "Autoimmune disease"
      ],
      [
        "Immune attack on transplanted donor tissue",
        "Transplant rejection"
      ]
    ],
    "model": "Primary → inherited defect; acquired → develops later; autoimmune → self tissue; rejection → donor tissue.",
    "explain": "Problems with immune function can involve insufficient defence or an inappropriate immune response against particular targets.",
    "misconception": "An autoimmune disease should not be described as a general lack of immunity.",
    "hintCue": "Ask whether the issue is too little defence, a response against self, or recognition of donor tissue."
  },
  {
    "id": "f171-allergy-sequence",
    "unit": "f171",
    "area": 3,
    "section": "3.2.1",
    "type": "order",
    "level": "apply",
    "stem": "Put this simplified immediate allergic reaction in the correct order.",
    "items": [
      "An allergen binds and cross-links IgE on sensitised mast cells",
      "Mast cells release histamine and other mediators",
      "Nearby blood vessels become more permeable",
      "Swelling and other inflammatory symptoms can develop"
    ],
    "model": "Allergen cross-links surface IgE → mediator release → vascular effects → symptoms.",
    "explain": "An immediate IgE-mediated allergic reaction can trigger mast-cell degranulation and local inflammatory effects.",
    "misconception": "Histamine is released after mast-cell activation, not before antigen recognition.",
    "hintCue": "Begin with an encounter with the allergen, and follow the effects of released mediators."
  },
  {
    "id": "f171-transplant-immunosuppression",
    "unit": "f171",
    "area": 3,
    "section": "3.2.1",
    "type": "written",
    "level": "apply",
    "stem": "Why can immunosuppressant medicines help after an organ transplant, yet create a new health risk? Give TWO linked points.",
    "markPoints": [
      "Reduced immune activation can lower the risk of immune rejection of donor tissue.",
      "Suppressing immune defence can increase susceptibility to infection (and may have other adverse effects)."
    ],
    "model": "They reduce the response against the donor organ but can also weaken protection against infections.",
    "explain": "The same reduction in immune activity can protect a graft while impairing the body's responses to pathogens.",
    "misconception": "Preventing rejection does not make a transplanted organ genetically identical to the recipient.",
    "hintCue": "Think about the wanted effect on the donor organ and the unwanted effect on responses to microbes."
  },
  {
    "id": "f171-vaccine-types",
    "unit": "f171",
    "area": 3,
    "section": "3.2.2",
    "type": "match",
    "level": "core",
    "stem": "Match each vaccine type to what it introduces or delivers.",
    "pairs": [
      [
        "Inactivated vaccine",
        "A killed pathogen that cannot replicate"
      ],
      [
        "mRNA vaccine",
        "Instructions for cells to make a selected antigen"
      ],
      [
        "Toxoid vaccine",
        "An inactivated toxin used as an antigen"
      ],
      [
        "Viral-vector vaccine",
        "A modified viral carrier of genetic instructions"
      ]
    ],
    "model": "Inactivated → non-replicating killed pathogen; mRNA → instructions; toxoid → inactivated toxin; viral vector → genetic carrier.",
    "explain": "Vaccines differ in how they present antigen or instructions for antigen production; they are not all live pathogens.",
    "misconception": "A toxoid vaccine uses an inactivated toxin, not a live toxin producing disease.",
    "hintCue": "Separate delivering an antigen from providing genetic instructions for the recipient's cells to make one."
  },
  {
    "id": "f171-vaccine-mrna",
    "unit": "f171",
    "area": 3,
    "section": "3.2.2",
    "type": "single",
    "level": "apply",
    "stem": "What is the main role of mRNA delivered by an mRNA vaccine?",
    "options": [
      "It instructs some recipient cells to make a selected antigen",
      "It directly supplies ready-made antibodies to every pathogen",
      "It acts as a living attenuated bacterium in the body",
      "It replaces the recipient's chromosomal DNA"
    ],
    "correct": 0,
    "model": "Instructions for making a selected antigen",
    "explain": "Delivered mRNA can be translated by cells into a protein antigen, which can provoke an adaptive immune response.",
    "misconception": "mRNA vaccination does not require integration into the cell's chromosomal DNA.",
    "hintCue": "Think about what ribosomes do with a messenger RNA molecule."
  },
  {
    "id": "f171-vaccine-live",
    "unit": "f171",
    "area": 3,
    "section": "3.2.2",
    "type": "written",
    "level": "apply",
    "stem": "Give ONE potential benefit and ONE limitation of using a live attenuated vaccine.",
    "markPoints": [
      "A weakened replicating organism can provoke a broad, often strong immune response.",
      "It may be unsuitable in some severely immunocompromised individuals because even a weakened organism can cause disease."
    ],
    "model": "Live attenuated vaccines can generate robust immune responses, but may present a risk for some people with impaired immune defence.",
    "explain": "Vaccine choice depends on the biological characteristics of the formulation and the recipient's circumstances.",
    "misconception": "Attenuated does not mean incapable of replication, and an effective vaccine is not necessarily appropriate for everyone.",
    "hintCue": "Consider how limited replication affects both immune stimulation and potential risk."
  },
  {
    "id": "f171-palliative-care-goal",
    "unit": "f171",
    "area": 2,
    "section": "2.2",
    "type": "single",
    "level": "core",
    "stem": "Which statement best describes the purpose of palliative care?",
    "options": [
      "Improve quality of life by relieving distressing symptoms",
      "Guarantee a cure for the underlying disease",
      "Replace all treatment immediately after diagnosis",
      "Provide care only during the final hours of life"
    ],
    "correct": 0,
    "model": "Improve quality of life and relieve suffering.",
    "explain": "Palliative care can manage symptoms and support quality of life alongside other appropriate care, not solely at the very end of life.",
    "misconception": "Palliative care is not synonymous with giving up all disease-directed treatment.",
    "hintCue": "Distinguish control of symptoms and distress from removal of the disease's underlying cause."
  },
  {
    "id": "f171-diagnostic-methods",
    "unit": "f171",
    "area": 4,
    "section": "4.1",
    "type": "match",
    "level": "core",
    "stem": "Match each examination technique to what the clinician does.",
    "pairs": [
      [
        "Auscultation",
        "Listens to internal sounds using a stethoscope"
      ],
      [
        "Palpation",
        "Feels structures using the hands"
      ],
      [
        "Percussion",
        "Taps the body and assesses the resulting sound"
      ],
      [
        "Inspection",
        "Observes visible features or movements"
      ]
    ],
    "model": "Auscultation → listen; palpation → feel; percussion → tap and listen; inspection → observe.",
    "explain": "Physical examination combines different techniques to collect evidence before further investigations.",
    "misconception": "Auscultation uses sound; palpation relies on touch.",
    "hintCue": "Start with the terms you can connect to listening and touching."
  },
  {
    "id": "f171-monitoring-repeats",
    "unit": "f171",
    "area": 4,
    "section": "4.2.2",
    "type": "single",
    "level": "apply",
    "stem": "Why are measurements repeated under similar conditions when monitoring a chronic condition?",
    "options": [
      "To compare change over time more meaningfully",
      "To guarantee the condition has been cured",
      "To ensure every reading has exactly the same value",
      "To remove the need to interpret symptoms"
    ],
    "correct": 0,
    "model": "To make changes over time more comparable.",
    "explain": "Standardised repeat measurements help distinguish trends from variation caused by technique or changing conditions.",
    "misconception": "A series of results needs interpretation; identical values are not expected or necessary.",
    "hintCue": "Think about whether a difference between visits reflects the patient or a changed measurement method."
  }
];
var ids=new Set(bank.questions.map(function(q){return q.id;}));
additions.forEach(function(q){if(!ids.has(q.id)){bank.questions.push(q);ids.add(q.id);}});
})();

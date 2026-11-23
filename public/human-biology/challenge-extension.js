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
  },
  {
    "id": "f171-pkd-physiology",
    "unit": "f171",
    "area": 1,
    "section": "1.2.1",
    "type": "single",
    "level": "apply",
    "stem": "Polycystic kidney disease damages kidney tissue over time. Which body function may be reduced?",
    "options": [
      "Removing metabolic wastes and regulating body-fluid composition",
      "Secreting digestive enzymes into the stomach",
      "Moving air into and out of the lungs",
      "Producing antibodies in lymph nodes"
    ],
    "correct": 0,
    "model": "Kidney filtration and regulation of body-fluid composition.",
    "explain": "Loss of functioning kidney tissue can impair removal of wastes and regulation of water and dissolved ions.",
    "misconception": "The kidney's main role is not the digestion of food or ventilation of the lungs.",
    "hintCue": "Focus on the role of functional kidney tissue in blood filtration and fluid balance.",
    "samAligned": false
  },
  {
    "id": "f171-malaria-anaemia",
    "unit": "f171",
    "area": 1,
    "section": "1.3.2",
    "type": "written",
    "level": "apply",
    "stem": "Explain why malaria can lead to anaemia and reduced oxygen transport.",
    "markPoints": [
      "Malaria parasites infect red blood cells, which are damaged or destroyed during infection.",
      "Loss of red blood cells or haemoglobin reduces the blood's capacity to transport oxygen."
    ],
    "model": "Malaria can destroy infected erythrocytes; reduced red-cell mass decreases oxygen-carrying capacity.",
    "explain": "Connect the pathogen's effect on a particular blood cell to the physiological consequence, rather than listing symptoms.",
    "misconception": "Anaemia is not caused simply by an absence of oxygen in inhaled air.",
    "hintCue": "Identify which blood cells Plasmodium infects and what those cells normally transport.",
    "samAligned": false
  },
  {
    "id": "f171-vaccination-prevention",
    "unit": "f171",
    "area": 2,
    "section": "2.3",
    "type": "single",
    "level": "core",
    "stem": "Why is routine vaccination primarily a preventative intervention?",
    "options": [
      "It prepares specific immune responses before a later infection",
      "It removes all symptoms immediately after any infection",
      "It replaces antibiotics in every bacterial illness",
      "It restores organs already damaged by a disease"
    ],
    "correct": 0,
    "model": "Vaccination primes adaptive immunity in advance of future exposure.",
    "explain": "Vaccination aims to reduce the risk or severity of subsequent illness by stimulating an antigen-specific immune response.",
    "misconception": "Vaccination is generally preventative, not a treatment that immediately cures an existing infection.",
    "hintCue": "Consider the timing: how does the immune system change before the pathogen is encountered?",
    "samAligned": false
  },
  {
    "id": "f171-wearable-records",
    "unit": "f171",
    "area": 5,
    "section": "5.1.1",
    "type": "multi",
    "level": "apply",
    "stem": "Which TWO statements about health data from wearable devices are defensible?",
    "options": [
      "Repeated readings may reveal patterns over time",
      "Privacy and the accuracy of measurements need consideration",
      "Every device provides a clinically definitive diagnosis",
      "A correlation in device data proves what caused a symptom"
    ],
    "correct": [
      0,
      1
    ],
    "model": "Trends can be informative; data quality and confidentiality matter.",
    "explain": "Wearables may provide useful longitudinal observations, but readings need interpretation and responsible data handling.",
    "misconception": "Consumer measurements are not automatically diagnostic, and correlations alone do not establish causation.",
    "hintCue": "Distinguish useful repeated observations from certainty about diagnosis or cause.",
    "samAligned": false
  },
  {
    "id": "f171-analytics-process",
    "unit": "f171",
    "area": 5,
    "section": "5.1.2",
    "type": "order",
    "level": "apply",
    "stem": "Order the main stages of a simplified healthcare data-analysis workflow.",
    "items": [
      "Collect data",
      "Extract the relevant data",
      "Transform or clean the data",
      "Analyse the prepared data",
      "Interpret the findings",
      "Report the results"
    ],
    "model": "Collection → extraction → transformation → analysis → interpretation → reporting.",
    "explain": "Raw data need selection and preparation before analysis; findings then require interpretation and communication.",
    "misconception": "Presenting a chart is not the same stage as cleaning, analysing, or interpreting the underlying data.",
    "hintCue": "Start by obtaining observations; finish by communicating the meaning of the findings.",
    "samAligned": false
  },
  {
    "id": "f171-research-designs",
    "unit": "f171",
    "area": 5,
    "section": "5.2",
    "type": "match",
    "level": "core",
    "stem": "Match each research design to its defining feature.",
    "pairs": [
      [
        "Randomised controlled trial",
        "Participants are assigned to comparison groups by chance"
      ],
      [
        "Cohort study",
        "Groups are followed over time to compare outcomes"
      ],
      [
        "Case–control study",
        "People with and without an outcome are compared for past exposures"
      ],
      [
        "Epidemiological research",
        "Patterns and determinants of health in populations are investigated"
      ]
    ],
    "model": "RCT → random allocation; cohort → follow-up; case–control → compare prior exposures; epidemiology → population patterns.",
    "explain": "Research methodology determines the kinds of comparisons and conclusions that are possible.",
    "misconception": "Observational cohort and case–control studies do not randomly allocate exposure in the way an RCT allocates treatments.",
    "hintCue": "Ask which design allocates groups by chance and which begins with people who already have the outcome.",
    "samAligned": false
  },
  {
    "id": "f171-chronic-asthma-monitor",
    "unit": "f171",
    "area": 4,
    "section": "4.2.1",
    "type": "single",
    "level": "apply",
    "stem": "Why might an asthma clinic monitor a patient's breathing measurements over several visits?",
    "options": [
      "To recognise changes in control and inform care decisions",
      "To guarantee identical results at every appointment",
      "To establish that asthma can never change over time",
      "To replace every discussion of symptoms with one number"
    ],
    "correct": 0,
    "model": "Monitor changes and help guide care.",
    "explain": "Repeated measurements, interpreted alongside symptoms and context, may reveal deterioration or improvement in asthma control.",
    "misconception": "A single reading does not capture the whole clinical picture, and physiological measurements naturally vary.",
    "hintCue": "Think about how a trend across visits can be more useful than one isolated result.",
    "samAligned": false
  },
  {
    "id": "f171-tb-transmission",
    "unit": "f171",
    "area": 1,
    "section": "1.3.1",
    "type": "single",
    "level": "core",
    "stem": "Which route is most relevant to the spread of infectious pulmonary tuberculosis?",
    "options": [
      "Inhaling airborne particles containing the bacterium",
      "Receiving a bite from an infected tick",
      "Swallowing food containing a tapeworm egg",
      "Touching intact skin briefly without exposure to respiratory particles"
    ],
    "correct": 0,
    "model": "Inhaling airborne particles containing Mycobacterium tuberculosis.",
    "explain": "Pulmonary TB can spread through inhalation of infectious airborne particles released by someone with infectious disease.",
    "misconception": "The mode of transmission depends on the pathogen; tick-borne and helminth infections spread differently.",
    "hintCue": "Consider the organ system primarily affected and how particles from the respiratory tract travel.",
    "samAligned": false
  },
  {
    "id": "case-follow-up-response",
    "section": "5.2",
    "area": 5,
    "type": "written",
    "level": "stretch",
    "marks": 6,
    "caseTitle": "Did reminders make a difference?",
    "stem": "Two clinics tried different ways of booking follow-ups. Analyse whether the figures support the claim that reminders improved attendance.",
    "evidenceTable": {
      "caption": "Fictional booking data",
      "columns": [
        "Clinic",
        "Patients invited",
        "Attended"
      ],
      "rows": [
        [
          "A · reminder text",
          "80",
          "64"
        ],
        [
          "B · no reminder",
          "50",
          "35"
        ]
      ]
    },
    "markPoints": [
      "Calculate and compare the proportions: 64/80 = 80% and 35/50 = 70%, a difference of 10 percentage points.",
      "The reminder group had higher attendance. The clinics may differ in other ways, such as appointment times or transport access.",
      "A fairer comparison would allocate reminder or no reminder within the same clinic, record follow-up over the same period and use the same definition of attendance."
    ],
    "model": "Attendance was 80% at clinic A and 70% at clinic B, so the reminder clinic was 10 percentage points higher. This is consistent with a benefit, but the comparison also changes the clinic. Easier transport or more convenient appointments at clinic A could explain part of the difference. Comparing people randomly allocated to reminder and no-reminder groups within the same clinic would give better evidence about the effect of reminders.",
    "explain": "Compare proportions because the groups differ in size. Then explain exactly what else differs and why it matters.",
    "misconception": "A higher percentage in a different clinic is evidence of an association. Other differences between clinics can contribute.",
    "hints": [
      "Divide the number who attended by the number invited for each clinic.",
      "What changed at the same time as the reminders?"
    ],
    "levelsNote": "Compare both groups, qualify the inference and suggest a design that addresses a named limitation.",
    "unit": "f171",
    "samAligned": false
  },
  {
    "id": "case-analytics-missing-records",
    "section": "5.1.2",
    "area": 5,
    "type": "written",
    "level": "stretch",
    "marks": 6,
    "caseTitle": "When a blank changes the conclusion",
    "stem": "A service compares equipment returns at two sites. The draft report says Site B performs worse because its spreadsheet shows only 28 returns. Analyse the report's conclusion.",
    "evidenceTable": {
      "caption": "Fictional equipment-loan records",
      "columns": [
        "Site",
        "Confirmed returned",
        "Confirmed outstanding",
        "Unknown status"
      ],
      "rows": [
        [
          "A",
          "36",
          "12",
          "2"
        ],
        [
          "B",
          "28",
          "7",
          "15"
        ]
      ]
    },
    "markPoints": [
      "Both sites have 50 loans. Confirmed returns are 36/50 (72%) at A and 28/50 (56%) at B.",
      "Fifteen records are unknown at B, compared with two at A. Counting all unknowns as outstanding could understate the true return rate, especially at B.",
      "Check original records using the same rules. Keep unknowns visible or report a range. B could have 28 to 43 returns, so the ranking could change."
    ],
    "model": "Site A has 36 confirmed returns and Site B has 28, out of 50 loans each. However, B also has 15 unknown records and A only two. If ten of B's unknown records were confirmed as returned, B's total would rise to 38 and the comparison could change. I would verify the missing records in both sites using the same rules and report unresolved cases separately.",
    "explain": "A missing value should stay visible. Check how it could alter the comparison before ranking the sites.",
    "misconception": "An empty field cannot be interpreted as a confirmed non-return.",
    "hints": [
      "Compare the number of unknowns as well as the confirmed returns.",
      "Could the conclusion change if some of B's unknown loans were returned?"
    ],
    "levelsNote": "Use the figures to explain the direction of the possible error and what to do about it.",
    "unit": "f171",
    "samAligned": false
  },
  {
    "id": "case-sharing-service-data",
    "section": "5.3",
    "area": 5,
    "type": "written",
    "level": "stretch",
    "marks": 9,
    "caseTitle": "Sharing a service summary",
    "stem": "A fictional community service wants to publish a report about missed appointments. One option gives counts for each age band and location. Another shares a record for each visit with a code, exact age, and date. Discuss what the service should publish to help explain patterns while protecting privacy.",
    "markPoints": [
      "Grouped counts can show broad patterns with fewer identifying details. Very small groups can still make individuals easier to recognise.",
      "Coded records allow more detailed analysis, but exact age, date and location can sometimes combine with other information to identify a person.",
      "Recommend a proportionate approach and justify it. Publish aggregated data with sensible grouping or combine small groups. Keep detailed records restricted to authorised analysis where needed."
    ],
    "model": "I would publish grouped counts because the purpose is to explain overall patterns in attendance. Local counts can still disclose information where a group contains only one or two visits, so I would combine small groups and explain how the figures were prepared. Coded visit records could help an authorised team check causes in more detail, but exact dates and ages could be combined with other information to work out who attended. Restrict those records to staff with a defined need and share only the fields required for that analysis.",
    "explain": "Tie the recommendation to the intended audience, the required detail and the possibility of identifying someone from several fields together.",
    "misconception": "Replacing a name with a code does not always prevent identification.",
    "hints": [
      "Which figures does the public need to see to understand the trend?",
      "What happens when several precise details can be matched?"
    ],
    "levelsNote": "Weigh the usefulness of both options and justify the level of detail the public needs.",
    "unit": "f171",
    "samAligned": false
  },
  {
    "id": "health-missing-status",
    "section": "5.1.2",
    "area": 5,
    "type": "single",
    "level": "apply",
    "stem": "In the table one reading is marked unknown. A pupil replaces it with zero before finding a mean. What should they do instead?",
    "evidenceTable": {
      "caption": "Fictional sensor readings",
      "columns": [
        "Record",
        "Reading"
      ],
      "rows": [
        [
          "A",
          "17"
        ],
        [
          "B",
          "Unknown"
        ],
        [
          "C",
          "19"
        ]
      ]
    },
    "options": [
      "Flag the missing reading and state how many values any mean uses",
      "Estimate it from the same person’s previous visit and count it as observed",
      "Divide the total of observed readings by the number of scheduled readings",
      "Omit it from the calculation but report the mean as if all readings were taken"
    ],
    "correct": 0,
    "model": "Check the source and keep unknowns visible. The mean of the two known readings is 18.",
    "explain": "An unknown is not a measured zero. Give the number of observations used in any mean.",
    "misconception": "Replacing a blank by zero gives it a value without evidence.",
    "unit": "f171",
    "samAligned": false,
    "assessmentRevision": 1,
    "optionFeedback": [
      null,
      "A previous reading is a different observation. It cannot be counted as a new measurement.",
      "Divide by the number of readings actually included. A scheduled but unobserved measurement contributes neither a value nor a count.",
      "Report the number actually measured so the reader can judge the completeness of the comparison."
    ]
  }
];
additions.push(...[
  {
    "id": "visual-f170-airway-goblet",
    "unit": "f170",
    "area": 1,
    "section": "1.2.2",
    "stem": "Which cell made the layer above the cells with cilia?",
    "model": "Goblet cell",
    "explain": "Goblet cells secrete mucus, which forms the layer facing the airway.",
    "misconception": "Cilia move the layer. They do not secrete it.",
    "level": "apply",
    "samAligned": false,
    "type": "diagram",
    "options": [
      "Goblet cell",
      "Squamous epithelial cell",
      "Red blood cell",
      "Fibroblast"
    ],
    "correct": 0,
    "figure": "practice-airway"
  },
  {
    "id": "visual-f170-airway-alveolus",
    "unit": "f170",
    "area": 1,
    "section": "1.2.2",
    "stem": "The airway lining is replaced in a teaching model by one layer of flat cells without cilia. Which adaptation for gas exchange does this add?",
    "model": "A short diffusion distance",
    "explain": "Very thin squamous epithelium shortens the route across the barrier.",
    "misconception": "Gas exchange depends on diffusion. Cilia have a different role in conducting airways.",
    "level": "apply",
    "samAligned": false,
    "type": "single",
    "options": [
      "An increased airway diameter",
      "A short diffusion distance",
      "A greater rate of mucus secretion",
      "More active transport of oxygen"
    ],
    "correct": 1
  },
  {
    "id": "visual-f170-airway-block",
    "unit": "f170",
    "area": 1,
    "section": "1.2.2",
    "stem": "An air pollutant reduces ciliary beating. Explain why inhaled particles may build up near the airway lining.",
    "model": "Particles are trapped in mucus. Reduced ciliary movement slows transport of mucus towards the throat.",
    "explain": "Link the changed cell activity to movement of the material above the cell.",
    "misconception": "Mucus can still be produced when ciliary beating slows.",
    "level": "apply",
    "samAligned": false,
    "type": "written",
    "markPoints": [
      "Particles are trapped in mucus.",
      "Reduced ciliary movement slows transport of mucus towards the throat."
    ],
    "figure": "practice-airway"
  },
  {
    "id": "visual-f170-airway-cause",
    "unit": "f170",
    "area": 1,
    "section": "1.2.2",
    "stem": "Order the steps that remove a particle from a conducting airway.",
    "model": "Inhale a particle → Trap the particle in mucus → Move the mucus towards the throat by ciliary beating",
    "explain": "Trapping and moving are separate processes.",
    "misconception": "Cilia do not directly bind and carry each particle.",
    "level": "apply",
    "samAligned": false,
    "type": "order",
    "items": [
      "Inhale a particle",
      "Trap the particle in mucus",
      "Move the mucus towards the throat by ciliary beating"
    ]
  },
  {
    "id": "visual-f170-volume-pressure",
    "unit": "f170",
    "area": 2,
    "section": "2.2.2",
    "stem": "The model shows the diaphragm in a flatter position. What starts air moving into the lungs?",
    "model": "Pressure in the lungs temporarily falls below pressure outside",
    "explain": "A larger chest volume lowers pressure in the lungs. The pressure difference draws air in.",
    "misconception": "A muscle changes chest volume. The resulting pressure difference moves the air.",
    "level": "apply",
    "samAligned": false,
    "type": "diagram",
    "options": [
      "Pressure in the lungs temporarily falls below pressure outside",
      "Atmospheric pressure falls below pressure in the lungs",
      "The diaphragm pushes air straight down the airway",
      "Lung pressure rises as chest volume increases"
    ],
    "correct": 0,
    "figure": "practice-breath-in"
  },
  {
    "id": "visual-f170-quiet-expiration",
    "unit": "f170",
    "area": 2,
    "section": "2.2.2",
    "stem": "Put the changes during quiet expiration in order.",
    "model": "The diaphragm relaxes → The chest volume decreases → Lung pressure rises above atmospheric pressure → Air flows out",
    "explain": "Quiet expiration follows relaxation and elastic recoil.",
    "misconception": "An increase in lung pressure follows the decrease in volume.",
    "level": "apply",
    "samAligned": false,
    "type": "order",
    "items": [
      "The diaphragm relaxes",
      "The chest volume decreases",
      "Lung pressure rises above atmospheric pressure",
      "Air flows out"
    ]
  },
  {
    "id": "visual-f170-minute-ventilation",
    "unit": "f170",
    "area": 2,
    "section": "2.2.2",
    "stem": "After a short activity, a person breathes 16 times per minute and takes in an average of 0.45 dm³ per breath. Calculate the volume of air breathed in per minute.",
    "model": "7.2 dm³/min",
    "explain": "Multiply 16 breaths per minute by 0.45 dm³ per breath.",
    "misconception": "The rate is based on a minute. A tidal volume is the volume for one breath.",
    "level": "apply",
    "samAligned": false,
    "type": "number",
    "correct": 7.2,
    "answerUnit": "dm³/min",
    "tolerance": 0.01
  },
  {
    "id": "visual-f170-volume-effort",
    "unit": "f170",
    "area": 2,
    "section": "2.2.2",
    "stem": "A person has reduced movement of the diaphragm. Explain why their depth of inspiration may be reduced.",
    "model": "A smaller change in diaphragm position gives a smaller increase in thoracic volume. The pressure difference driving airflow into the lungs is smaller.",
    "explain": "Follow each link from muscle movement to volume, pressure, and flow.",
    "misconception": "Inhalation is explained by a pressure difference, not a separate suction action of the diaphragm.",
    "level": "apply",
    "samAligned": false,
    "type": "written",
    "markPoints": [
      "A smaller change in diaphragm position gives a smaller increase in thoracic volume.",
      "The pressure difference driving airflow into the lungs is smaller."
    ]
  },
  {
    "id": "visual-f171-cuff-systolic",
    "unit": "f171",
    "area": 4,
    "section": "4.1",
    "stem": "The monitor shows 124/78. Which statement identifies the upper value?",
    "model": "124 mmHg is systolic pressure",
    "explain": "The systolic reading is the higher arterial pressure between the displayed values.",
    "misconception": "Pulse rate and arterial pressure measure different things.",
    "level": "apply",
    "samAligned": false,
    "type": "diagram",
    "options": [
      "124 mmHg is systolic pressure",
      "124 mmHg is diastolic pressure",
      "124 is pulse rate in beats per minute",
      "124 is the difference between the two pressures"
    ],
    "correct": 0,
    "figure": "practice-cuff"
  },
  {
    "id": "visual-f171-cuff-supported",
    "unit": "f171",
    "area": 4,
    "section": "4.1",
    "stem": "Two blood pressure readings are to be compared. Which change makes the comparison fairer?",
    "model": "Hold the arm at heart level for both readings",
    "explain": "Standardise the measurement conditions, including arm position.",
    "misconception": "A difference can come from procedure rather than a physiological change.",
    "level": "apply",
    "samAligned": false,
    "type": "single",
    "options": [
      "Record one after exercise and one after rest",
      "Hold the arm at heart level for both readings",
      "Use a different cuff size each time regardless of fit",
      "Take the second reading while the person is speaking"
    ],
    "correct": 1
  },
  {
    "id": "visual-f171-pressure-range",
    "unit": "f171",
    "area": 4,
    "section": "4.2.2",
    "stem": "Three systolic readings taken under the same conditions are 125, 121 and 128 mmHg. Calculate the range.",
    "model": "7 mmHg",
    "explain": "128 − 121 = 7 mmHg.",
    "misconception": "Range uses the highest and lowest values. It is not a mean.",
    "level": "apply",
    "samAligned": false,
    "type": "number",
    "correct": 7,
    "answerUnit": "mmHg",
    "tolerance": 0.01
  },
  {
    "id": "visual-f171-cuff-odd",
    "unit": "f171",
    "area": 4,
    "section": "4.2.2",
    "stem": "Two resting systolic readings are 123 and 125 mmHg. A third of 147 mmHg was recorded while the person moved their arm. Explain what should happen next.",
    "model": "Record the original reading and annotate the different measurement conditions. Repeat under the same standardised conditions before judging whether the higher value represents a sustained change.",
    "explain": "Repeat the measurement under comparable conditions and keep its context.",
    "misconception": "A reading made under different conditions cannot by itself establish a trend.",
    "level": "apply",
    "samAligned": false,
    "type": "written",
    "markPoints": [
      "Record the original reading and annotate the different measurement conditions.",
      "Repeat under the same standardised conditions before judging whether the higher value represents a sustained change."
    ]
  },
  {
    "id": "visual-f171-cast-mechanism",
    "unit": "f171",
    "area": 2,
    "section": "2.1",
    "stem": "What is the direct purpose of the rigid layer around the forearm?",
    "model": "Keep the break stable while living tissue repairs",
    "explain": "The cast provides mechanical stability so the bone ends can stay aligned.",
    "misconception": "The cast helps create conditions for repair. Bone cells and other living tissues carry out repair.",
    "level": "apply",
    "samAligned": false,
    "type": "diagram",
    "options": [
      "Replace the damaged bone",
      "Keep the break stable while living tissue repairs",
      "Provide blood to the fracture",
      "Increase movement at the break"
    ],
    "correct": 1,
    "figure": "practice-cast"
  },
  {
    "id": "visual-f171-cast-followup",
    "unit": "f171",
    "area": 2,
    "section": "2.1",
    "stem": "Two fractures have similar positions. What difference would be most relevant to considering additional fixation?",
    "model": "How stable the bone ends are after alignment",
    "explain": "Stability and maintenance of alignment are relevant to the method of support.",
    "misconception": "The choice depends on characteristics of the fracture and the person, not the cast colour.",
    "level": "apply",
    "samAligned": false,
    "type": "single",
    "options": [
      "How stable the bone ends are after alignment",
      "Whether both scans are printed at the same scale",
      "Which cast colour the person prefers",
      "Whether both forearms were measured on the same day"
    ],
    "correct": 0
  },
  {
    "id": "visual-f171-antibody-region",
    "unit": "f171",
    "area": 3,
    "section": "3.1",
    "stem": "What determines whether this antibody can bind a specific part of an antigen?",
    "model": "Complementarity at its antigen-binding site",
    "explain": "The binding surface must be sufficiently complementary in shape and chemical properties.",
    "misconception": "Antibody and antigen are not the same molecule.",
    "level": "apply",
    "samAligned": false,
    "type": "diagram",
    "options": [
      "Complementarity at its antigen-binding site",
      "The length of its stem alone",
      "The colour of the molecule in the diagram",
      "The antigen having the same mass as the antibody"
    ],
    "correct": 0,
    "figure": "practice-antibody"
  },
  {
    "id": "visual-f171-antibody-change",
    "unit": "f171",
    "area": 3,
    "section": "3.1",
    "stem": "An altered antigen has a different shape at the part that normally binds an antibody. Explain how that can affect recognition.",
    "model": "The antibody binding site may be less complementary to that part of the antigen. Binding may become weaker, or may not occur for that antibody.",
    "explain": "Specify which surfaces interact and predict how their fit changes.",
    "misconception": "A change in the antigen does not cause antibodies already present to reshape to fit it.",
    "level": "apply",
    "samAligned": false,
    "type": "written",
    "markPoints": [
      "The antibody binding site may be less complementary to that part of the antigen.",
      "Binding may become weaker, or may not occur for that antibody."
    ],
    "figure": "practice-antibody"
  },
  {
    "id": "case-visual-rested-pressure",
    "unit": "f171",
    "area": 4,
    "section": "4.2.2",
    "stem": "A trainee says the higher readings after a walk show that a monitor is unreliable. Analyse the evidence and suggest a better check of repeatability.",
    "model": "Resting values are close together, and all values after walking are higher. There is a systematic change in measurement conditions, so the results could reflect physiology. Use repeated readings with the same person, device, and resting conditions to assess variation.",
    "explain": "Compare both sets and separate measurement variation from changes in the person.",
    "misconception": "Higher readings under a different condition do not by themselves show an instrument fault.",
    "level": "stretch",
    "samAligned": false,
    "type": "written",
    "markPoints": [
      "Resting values are close together, and all values after walking are higher.",
      "There is a systematic change in measurement conditions, so the results could reflect physiology.",
      "Use repeated readings with the same person, device, and resting conditions to assess variation."
    ],
    "marks": 6,
    "caseTitle": "Resting and post-activity blood pressure",
    "levelsNote": "Use details from both sets and connect the proposed repeat check to the claimed fault.",
    "figure": "practice-cuff",
    "evidenceTable": {
      "caption": "Fictional systolic readings",
      "columns": [
        "Condition",
        "Readings (mmHg)"
      ],
      "rows": [
        [
          "After seated rest",
          "122, 124, 123"
        ],
        [
          "Immediately after brisk walking",
          "146, 150, 148"
        ]
      ]
    }
  },
  {
    "id": "case-visual-cast-comparison",
    "unit": "f171",
    "area": 5,
    "section": "5.2",
    "stem": "A fictional service compares outcomes for two approaches to supporting fractures. Discuss whether the results justify choosing either approach for a new patient.",
    "model": "Calculate the proportions with alignment maintained: 36/40 = 90% and 43/50 = 86%. The lower proportion is in a group with more unstable fractures at the start. This could affect the outcome independently of the method. Consider whether alignment was measured in the same way and whether the outcomes include recovery, pain, or complications. For a new patient, consider fracture stability and relevant evidence in comparable cases. These data alone do not establish which treatment is better.",
    "explain": "Weigh what the comparison shows, the systematic group differences and the information needed for a decision.",
    "misconception": "A higher percentage in one group does not remove confounding by the initial severity.",
    "level": "stretch",
    "samAligned": false,
    "type": "written",
    "markPoints": [
      "Calculate the proportions with alignment maintained: 36/40 = 90% and 43/50 = 86%.",
      "The lower proportion is in a group with more unstable fractures at the start. This could affect the outcome independently of the method.",
      "Consider whether alignment was measured in the same way and whether the outcomes include recovery, pain, or complications.",
      "For a new patient, consider fracture stability and relevant evidence in comparable cases. These data alone do not establish which treatment is better."
    ],
    "marks": 9,
    "caseTitle": "Comparing fracture support outcomes",
    "levelsNote": "A sustained discussion should weigh evidence, limitations, and implications for the patient.",
    "figure": "practice-cast",
    "evidenceTable": {
      "caption": "Fictional follow-up records",
      "columns": [
        "Approach",
        "Cases",
        "Aligned at follow-up",
        "Unstable initially"
      ],
      "rows": [
        [
          "External cast",
          "40",
          "36",
          "6"
        ],
        [
          "Internal fixation",
          "50",
          "43",
          "34"
        ]
      ]
    }
  }
]);

// A small set of independent transfers from the assessment audit.
additions.push({
 id:"cell-testis-photo-evidence",unit:"f170",area:3,section:"3.3.1",type:"diagram",level:"apply",
 stem:"Which interpretation is best supported by the cell arrangement around the pale space in this field?",
 figure:{src:"/assets/micrographs/hb-testis.webp",width:479,height:590,
  alt:"A pale central space has several layers of cells along its edge. Some profiles project into the space.",
  credit:"Nephron",licenceName:"CC BY-SA 3.0",adaptation:"Resized and converted to WebP",
  source:"https://commons.wikimedia.org/wiki/File:Seminiferous_tubule_and_sperm.jpg",
  licence:"https://creativecommons.org/licenses/by-sa/3.0/"},
 options:["A seminiferous tubule because developing cells form layers towards its lumen","An ovarian follicle because a large oocyte occupies the centre","Endometrium because separate glands lie below a free epithelial surface","A blood vessel because a single thin lining surrounds red blood cells"],
 correct:0,model:"Layers of developing germ cells around a lumen support identification of a seminiferous tubule.",
 explain:"Identify the boundary of the space first. The lining contains multiple cell layers rather than a single cell at the centre.",
 optionFeedback:[null,"A follicle identification needs evidence of an oocyte surrounded by follicle cells. The central feature here is a space.","Endometrial glands would appear as separate profiles within supporting tissue beneath a surface.","A vessel lumen has an endothelial lining. The multiple layers shown support a different structure."],
 hintCue:"Compare the cell arrangement around the pale space with the arrangement each explanation requires.",
 misconception:"Colour can vary with stains. Use spatial features to distinguish tissue."
},{
 id:"f171-rested-pressure-interpret",independentFollowups:["p-health-bp-repeat-diagnostic"],unit:"f171",area:4,section:"4.2.2",type:"single",level:"apply",
 stem:"A teammate says the first and last visits prove that resting pressure rose. Which conclusion follows from these fictional records?",
 evidenceTable:{caption:"Systolic readings (mmHg)",columns:["Visit","First","Second","Conditions"],
  rows:[["1","132","134","Rested"],["2","131","133","Rested"],["3","151","Missing","Just after cycling"]],focus:[[0,3],[1,3],[2,3]]},
 options:["The rested readings overlap. Visit 3 gives insufficient evidence about resting change.","Visit 3 shows a higher resting pressure because the first reading was 151.","The missing value can be treated as zero to estimate the visit 3 mean.","The higher value proves a systematic instrument error."],
 correct:0,model:"The comparable rested readings overlap. A measurement under different conditions does not establish a resting trend.",
 explain:"Visits 1 and 2 used comparable conditions. A single post-activity value cannot establish resting pressure. The second value is unknown.",
 optionFeedback:[null,"The conditions differ. The value of 151 was taken after activity, not under the rested conditions used earlier.","Zero is a value. A missing measurement cannot be included as measured evidence.","There is no instrument comparison. A physiological response to exercise could account for the difference."],
 hintCue:"Compare the test conditions before deciding which visits can be compared.",
 misconception:"An association in the record does not identify what caused the difference."
},{
 id:"f171-trial-conclusion-interval",independentFollowups:["p-f171-research-designs-diagnostic"],unit:"f171",area:5,section:"5.2",type:"single",level:"stretch",
 stem:"In a fictional randomised trial, a walking aid group improved by 4 m more on average after four weeks. The 95% confidence interval for that difference runs from −3 to +11 m. Which conclusion fits the evidence?",
 options:["The estimated benefit is 4 m, but the interval includes no difference and the trial gives limited long-term evidence.","The result establishes a benefit because most of the interval is above zero.","Random allocation guarantees that sampling uncertainty has been removed.","Four weeks of improvement establish that rare harms are unlikely after a year."],
 correct:0,model:"The 4 m estimate is uncertain. Compatible values include zero difference. Longer follow-up and adequate sample sizes are needed for longer-term outcomes and rare harms.",
 explain:"Random allocation reduces systematic imbalance on average. It does not remove sampling uncertainty. Trial duration limits the outcomes it can inform.",
 optionFeedback:[null,"The interval includes zero, so the stated result is compatible with no difference.","Random allocation helps make groups comparable. Estimates can still vary between samples.","A short study cannot establish safety at later times or reliably rule out rare events."],
 hintCue:"Consider whether there are plausible values on both sides of no difference and which outcomes were actually observed.",
 misconception:"Separate sampling uncertainty from differences in how groups were formed."
});
// Context-first method selection uses the same question session and outcome model.
additions.push({
 id:"f171-method-choose-baseline",unit:"f171",area:4,section:"4.2.2",methodOrder:1,type:"single",level:"apply",
 stem:"A fictional service records fewer missed appointments after a reminder. It wants to know how large the fall was relative to the original count. Which quantities should it compare?",
 options:["The fall in count and the original count","The fall in count and the new count","The new count and the total across both dates","The original count and the total across both dates"],
 correct:0,model:"Compare the change with the starting value.",
 explain:"The fall is the original count minus the later count. Relate it to the original count because that is the stated baseline.",
 optionFeedback:[null,"The new count describes where the service ended. The requested comparison is relative to the original count.","Pooling the dates changes the question. The amount of change must be compared with the baseline.","The total combines the two dates. It does not measure the fall."],
 misconception:"The comparison is relative to the original count.",
 hintCue:"Identify which number measures change and which represents the starting point."
},{
 id:"f171-method-baseline-change",unit:"f171",area:5,section:"5.1.2",methodOrder:2,type:"number",level:"apply",
 stem:"A fictional monitoring service recorded 80 late reports at baseline and 68 after a reminder. What percentage of the baseline count was the fall? Give your answer to the nearest whole percent.",
 correct:15,answerUnit:"%",tolerance:1e-6,model:"15%",
 explain:"The fall is 80 − 68 = 12. Relative to the original count, 12 ÷ 80 × 100 = 15%.",
 numberFeedback:[[12,"12 is the number of reports, not the percentage."],[18,"This uses 68 as the denominator. The baseline count is 80."],[85,"This is the proportion that remained. Use the amount of change."]],
 misconception:"The baseline is the denominator.",
 hintCue:"Find the change first. Which time point is the baseline?"
},{
 id:"f171-method-time-rate",unit:"f171",area:4,section:"4.1",methodOrder:3,type:"number",level:"apply",
 stem:"Use the whole fictional activity record in the graph. What value should go in the box labelled beats per minute?",
 graph:{times:[0,30,60,90],values:[0,43,90,135],xLabel:"Time (s)",yLabel:"Cumulative beats",caption:"Fictional cumulative heartbeat count"},
 correct:90,answerUnit:"beats/min",tolerance:1e-6,model:"90 beats/min",
 explain:"90 seconds is 1.5 minutes. 135 ÷ 1.5 gives 90 beats per minute.",
 numberFeedback:[[135,"This is the total over 90 seconds. Convert to a one-minute rate."],[1.5,"Dividing by 90 gives beats per second. Convert the time to minutes before dividing."],[202.5,"You multiplied by the duration. Divide the count by the time in minutes."]],
 misconception:"The duration must be in minutes to report beats per minute.",
 hintCue:"Check that the time has the unit requested by the rate."
},{
 id:"f171-method-rearrange",unit:"f171",area:4,section:"4.2.2",methodOrder:4,type:"number",level:"stretch",
 stem:"Three fictional resting pulse readings have a mean of 72 beats/min. Two readings were 67 and 74 beats/min. The remaining recorded value is obscured. What reading makes this stated mean possible?",
 correct:75,answerUnit:"beats/min",tolerance:1e-6,model:"75 beats/min",
 explain:"A mean of 72 across three readings gives a total of 216. Subtract 67 and 74 to find the obscured reading.",
 numberFeedback:[[70.5,"70.5 is the mean of the two visible readings. Work from the stated mean of all three."],[216,"216 is the sum of all three readings. Subtract the two shown values."]],
 misconception:"Use the count of all values to recover the total from a mean.",
 hintCue:"Use the mean and number of readings to recover the sum."
},{
 id:"f171-method-missing-reading",unit:"f171",area:4,section:"4.2.2",methodOrder:5,type:"number",level:"apply",
 stem:"A fictional record has four slots for resting systolic pressure but only three observed readings. Report the mean of the observed readings to the nearest whole mmHg.",
 evidenceTable:{caption:"Rested readings",columns:["Slot","Systolic pressure (mmHg)"],rows:[["1","134"],["2","131"],["3","Missing"],["4","132"]],focus:[[0,1],[1,1],[3,1]]},
 correct:132,answerUnit:"mmHg",tolerance:1e-6,model:"132 mmHg from three observations",
 explain:"(134 + 131 + 132) ÷ 3 = 132.33, which rounds to 132. The missing observation contributes no value and no count.",
 numberFeedback:[[99,"Dividing by four treats the unobserved value as zero. Only three readings were observed."],[132.33,"The calculation is right. Report the mean rounded to the nearest whole mmHg."],[397,"397 is the total. Divide it by the number of observed values."]],
 misconception:"A missing observation contributes neither a value nor a count.",
 hintCue:"Count observed values before choosing the denominator."
},{
 id:"f171-method-interpret-reading",unit:"f171",area:4,section:"4.2.2",methodOrder:6,type:"single",level:"stretch",
 stem:"A monitor gives three similar readings with a mean of 132 mmHg. A checked reference taken under comparable conditions gives 124 mmHg. Which interpretation is warranted?",
 options:["The monitor shows repeatability within the set. The difference warrants checking its accuracy.","The similar readings establish accuracy. The reference must be wrong.","The monitor readings lack repeatability because they differ from the reference.","The 8 mmHg difference establishes that the person's resting pressure rose."],
 correct:0,model:"Agreement inside the set is evidence of repeatability. Comparison against a checked reference helps assess accuracy.",
 explain:"A close group of readings can share an offset. The measurements compare devices under comparable conditions and do not establish biological change.",
 optionFeedback:[null,"Agreement among readings shows repeatability. A consistent error can remain.","Repeatability compares repeated readings from the monitor. The reference comparison raises a different issue.","The evidence compares measurement methods. It does not establish a change over time."],
 misconception:"Agreement between readings and agreement with a reference answer different questions.",
 hintCue:"Distinguish comparisons within the group of readings from comparisons with the reference."
});
additions.push({
 id:"f170-microscopy-preparation-transfer",unit:"f170",area:1,section:"1.1.2",type:"single",level:"apply",
 stem:"A team needs to compare the beating of cilia on living epithelial cells over a short period. Which preparation would let them record the required observation?",
 options:["A living specimen observed with a light microscope.","A fixed, thin section examined with TEM.","A prepared surface examined with SEM.","An enlarged print of a stained section."],
 correct:0,model:"Light microscopy of a living specimen can show movement over time.",
 explain:"The required evidence is change in position. A fixed electron micrograph can reveal detail of a structure, and an enlarged still image cannot record its movement.",
 optionFeedback:[null,"TEM can show internal structure in a thin fixed section. That does not record live movement.","SEM can show surface detail. The preparation does not show living cilia beating.","A larger still image cannot supply a record over time."],
 misconception:"Higher resolution is useful only when the method records the feature being investigated.",
 hintCue:"Decide whether the evidence needs to show fine structure or movement over time."
},{
 id:"f171-expiratory-evidence-transfer",unit:"f171",area:4,section:"4.1",type:"single",level:"apply",
 stem:"Two fictional records show technically acceptable readings under comparable conditions. Which comparison is supported?",
 evidenceTable:{caption:"Fictional respiratory measurements",columns:["Record","Peak expiratory flow (L/min)","Volume expired in the first second (L)","Estimated oxygen saturation (%)"],
  rows:[["A","400","2.0","97"],["B","400","2.6","97"]],focus:[[0,2],[1,2]]},
 options:["A and B must have expelled the same volume in the first second.","B had the higher peak expiratory flow.","B expelled more air in the first second, despite reaching the same recorded peak flow.","B achieved higher oxygen saturation because the expired volume was larger."],
 correct:2,model:"Record B shows 2.6 L in the first second, compared with 2.0 L in A. The highest measured flow was the same.",
 explain:"Peak expiratory flow is the highest recorded rate. The volume over the first second depends on flow throughout that second. The recorded saturations are also equal.",
 optionFeedback:["The first-second volumes are shown in their own column. A matching peak rate does not imply matching volumes.","The peak-flow column is 400 L/min for both records.",null,"The recorded estimates are both 97%. Volume expired is a different measurement."],
 misconception:"A peak rate and the amount moved over an interval are different measurements.",
 hintCue:"Find the column measuring the amount of air moved in the first second."
});
additions.push({
 id:"f170-cell-counting-transfer",unit:"f170",area:1,section:"1.1.2",catchup:"1.1.2.counting",type:"single",level:"apply",
 stem:"Two small samples contain round intact cells and irregular fragments of similar volume. The aim is to estimate the concentration of the intact cells only. What approach provides the most useful evidence?",
 options:["Take a Coulter count and treat every pulse as an intact cell.","Use a haemocytometer and count cells that meet the visible criteria in the known grid volume.","Use a Coulter counter and assume particles of the target volume are intact cells.","Count intact cells in any area of an ordinary slide and report the total as cells per mL."],
 correct:1,model:"Inspect and count intact cells in the haemocytometer’s known volume, then account for any dilution.",
 explain:"The distinction depends on appearance rather than volume alone. The chamber allows visual selection and supplies the volume needed for concentration.",
 optionFeedback:["Both fragments and cells can produce pulses.","", "Fragments overlap the cells in volume. This size filter cannot reliably distinguish them.","Visible identification is useful, but concentration also needs a known sampled volume."],
 misconception:"An electrical pulse indicates a particle. It does not identify that particle as an intact cell.",
 hintCue:"Decide what distinguishes the intact cells in this particular mixture."
},{
 id:"f171-hiatus-mechanism-transfer",unit:"f171",area:1,section:"1.2.1",catchup:"1.2.1.hiatus",type:"single",level:"apply",
 stem:"A fictional image shows the stomach junction above the diaphragm. After a meal, stomach contents are detected in the lower oesophagus and the person reports a sour taste. Which mechanism best connects the findings?",
 options:["The shifted junction increases acid secretion, which explains the findings even with an effective reflux barrier.","The findings are better explained by a sensitive oesophagus, with no change in the movement of stomach contents.","The raised junction establishes that slowed gastric emptying is driving reflux after meals.","Displacement can weaken the barrier to backflow, allowing stomach contents to reach the oesophagus."],
 correct:3,model:"Weaker resistance to backflow can explain why stomach contents reached the oesophagus.",
 explain:"The junction normally works with the diaphragm to reduce reflux. If the two no longer align, the barrier can be less effective. Finding a hernia on its own would not establish that reflux occurred.",
 optionFeedback:["The evidence records the presence of stomach contents in the oesophagus. Increased secretion was not measured.","Sensitivity might affect how the person feels. It does not explain the detected movement of contents.","The observations show reflux but do not measure how quickly the stomach empties.",""],
 misconception:"Reflux describes movement of existing contents rather than production of more acid.",
 hintCue:"Trace which way the stomach contents have travelled and what would normally resist that movement."
},{
 id:"f171-hodgkin-mechanism-transfer",unit:"f171",area:1,section:"1.2.1",catchup:"1.2.1.hodgkin",type:"single",level:"apply",
 stem:"In a fictional case, a biopsy confirms Hodgkin lymphoma. Imaging shows enlarged lymph nodes alongside the oesophagus. The person reports difficulty swallowing. Which conclusion is best supported?",
 options:["Expansion of affected lymphatic tissue can press on the oesophagus and contribute to the swallowing difficulty.","Difficulty swallowing proves that the cancer began in the oesophagus.","Lymphoma can only affect immunity, so the location of the nodes cannot explain the symptom.","Enlarged nodes establish that stomach acid has damaged the oesophageal lining."],
 correct:0,model:"The enlarged lymph nodes could compress the adjacent oesophagus.",
 explain:"Tumour tissue and accompanying inflammation can enlarge lymph nodes. A nearby structure may then be compressed, providing a plausible mechanism for the symptom. The symptom alone would not identify the cause.",
 optionFeedback:["","The biopsy identifies the disease in lymphatic tissue. A symptom can come from pressure outside the oesophagus.","An enlarged node can have a local effect on another structure as well as lymphatic or immune effects.","Neither the location of the nodes nor the report of difficulty swallowing measures reflux or injury to the lining."],
 misconception:"Symptoms can arise from the position of an enlarged lymph node rather than from where a person feels the effect.",
 hintCue:"Use the location of the enlarged nodes in relation to the structure involved in swallowing."
});
additions.push({
 id:"f170-organelle-coordination-transfer",unit:"f170",area:1,section:"1.1.3",type:"single",level:"apply",
 stem:"In a fictional cell model, one nuclear gene stops producing a protein normally imported into mitochondria for aerobic respiration. The mitochondrial DNA has not changed. What is the most direct prediction?",
 options:["ATP production stays normal because imported proteins cannot affect mitochondria.","ATP production may fall because mitochondria rely on some proteins encoded by nuclear genes.","ATP production rises because mitochondria can translate the missing nuclear gene directly.","ATP production moves to the nucleolus because it assembles ribosome subunits."],
 correct:1,model:"Loss of a nuclear-encoded mitochondrial protein may reduce ATP production.",
 explain:"The nucleus supplies instructions for most mitochondrial proteins. A protein made in the cytoplasm may be imported and act inside mitochondria. Unchanged mitochondrial DNA does not guarantee unchanged mitochondrial function.",
 optionFeedback:["The stated protein is needed inside the mitochondrion. Its source does not make it dispensable.","","Mitochondria cannot replace every missing nuclear-encoded protein using their own DNA.","The nucleolus makes ribosomal components. It does not take over aerobic ATP production."],
 misconception:"Having its own DNA does not make a mitochondrion independent of nuclear gene expression.",
 hintCue:"Separate where the protein is encoded from where it acts."
},{
 id:"f170-microvilli-transfer",unit:"f170",area:1,section:"1.1.1",type:"single",level:"apply",
 stem:"Two fictional epithelial samples have the same number of cells and the same footprint. In sample P the exposed cell membranes have many short projections. In sample Q the membranes are relatively flat. With similar transporter density per unit of membrane, which prediction is most reasonable?",
 options:["P could transfer solute faster because more exposed membrane is available for transport.","P could transfer solute faster because the projections pump liquid along the surface.","Both must transfer solute at the same rate because cell number and footprint match.","Q could transfer solute faster because a flat surface provides more membrane per cell."],
 correct:0,model:"Microvilli increase the exposed cell membrane area and can increase transport capacity.",
 explain:"The projections are extensions of the membrane. They increase the area available for transport even when the cell count and footprint are unchanged.",
 optionFeedback:["","This confuses microvilli with motile cilia, whose movement can move material along a surface.","The footprint omits the extra membrane covering the projections.","A flat surface has less area than the same footprint with membrane projections."],
 misconception:"Microvilli increase membrane area. Motile cilia have a different function.",
 hintCue:"Compare the exposed membrane area rather than the overall footprint."
},{
 id:"f170-microscopy-slide-transfer",unit:"f170",area:1,section:"1.1.2",type:"single",level:"apply",
 stem:"A wet mount drifts and wrinkles on its slide, and its cell boundaries are difficult to see. A separate thick fixed tissue sample shows many overlapping layers. Which plan best addresses the problems?",
 options:["Stain both samples more strongly; stronger staining makes the fixed tissue thinner.","Use a coverslip to improve contrast and cut thicker fixed sections to keep cells in view.","Use a coverslip to hold the wet mount flat and a suitable stain if compatible with the aim; cut a thin fixed section with a microtome.","Use higher magnification for the wet mount and increase lamp brightness for the fixed sample."],
 correct:2,model:"Use physical support for the wet mount, suitable contrast and a thin section for overlapping layers.",
 explain:"The slide supports the sample and the coverslip steadies and flattens it. A stain can improve contrast. In the fixed sample, cutting a thin slice reduces overlapping layers and lets transmitted light pass through.",
 optionFeedback:["Stain changes contrast. It does not remove overlapping layers.","A coverslip holds the mount flat. Cutting a thicker section increases overlap.","","Magnification and brightness do not stabilise a wet mount or remove overlying cells."],
 misconception:"Physical support, optical contrast and tissue thickness are distinct preparation choices.",
 hintCue:"Identify which problem is due to movement, weak contrast or superimposed layers."
},{
 id:"f171-bmi-interpretation-transfer",unit:"f171",area:4,section:"4.1",type:"single",level:"apply",
 stem:"A fictional adult has a mass of 75.0 kg and a height of 1.65 m. The adult asks whether BMI shows how much of their mass is body fat. Which result and interpretation are appropriate?",
 options:["45.5 kg/m²; the result cannot distinguish fat from muscle.","27.5 kg/m²; the number gives the percentage of body mass made up of fat.","1.4 kg/m²; the result describes mass relative to height.","27.5 kg/m²; the result describes mass relative to height but cannot distinguish fat from muscle."],
 correct:3,model:"75.0 ÷ (1.65 × 1.65) ≈ 27.5 kg/m². BMI does not give the percentage of body fat.",
 explain:"Use height squared in metres. The result represents mass relative to height. It can be used alongside other evidence but it does not measure body composition directly.",
 optionFeedback:["The limitation is right, but this value uses the height only once.","The number is right, but BMI and percentage body fat are different quantities.","Square the height alone, then divide the mass by it.",""],
 misconception:"Correct calculation and appropriate interpretation are separate steps.",
 hintCue:"Check which term is squared and what the resulting units describe."
},{
 id:"f171-next-investigation-transfer",unit:"f171",area:4,section:"4.1",type:"single",level:"apply",
 stem:"In a fictional investigation, two breast images show a similar patch of altered density. The team needs to distinguish benign changes from malignant cells within that specific patch. Which test gives evidence directly relevant to that decision?",
 options:["Compare repeat mammograms to see whether the patch remains visible.","Examine a targeted tissue sample to inspect cell and tissue features in the patch.","Measure a blood-cell count to see whether it is outside the reference range.","Collect a urine sample to check for a change in protein concentration."],
 correct:1,model:"Examine a biopsy sample taken from the patch to assess its tissue and cell features.",
 explain:"Repeat imaging can compare appearance or change over time. A biopsy can provide evidence directly from the tissue in question. The result still depends on adequate sampling and appropriate examination.",
 optionFeedback:["Further images can show persistence or change, but they do not directly inspect the cell types in the patch.","","A blood count is useful for different questions. It does not directly show the cells in the patch.","Urine protein measures a different biological feature and cannot characterise the patch."],
 misconception:"A test must provide the evidence needed for the inference, even when another test can measure a related change.",
 hintCue:"Decide whether the requested evidence concerns location, blood composition or the nature of the tissue."
});
additions.push({
 id:"f171-infection-group-transfer",catchup:"1.3.1.fungi",unit:"f171",area:1,section:"1.3.1",type:"match",level:"apply",
 stem:"A public-health report groups infections by cause. Match each named cause to its broad group.",
 pairs:[["SARS-CoV-2 (COVID-19)","Virus"],["Borrelia (Lyme disease)","Bacterium"],["Candida (vaginal thrush)","Fungus"],["Toxoplasma (toxoplasmosis)","Protozoan"],["Liver fluke (fasciolosis)","Multicellular parasite"]],
 model:"SARS-CoV-2 is a virus, Borrelia a bacterium, Candida a fungal yeast, Toxoplasma a single-celled protozoan, and a liver fluke a multicellular worm.",
 explain:"Classify the organism responsible. A tick can carry Borrelia but does not determine its biological group.",
 misconception:"A vector and the organism that causes the disease may belong to different groups.",
 correctionHint:"Keep the single-celled protozoan separate from the multicellular worm. A yeast belongs with fungi.",
 hintCue:"Which names refer to worms or yeasts? Then distinguish the remaining pathogen groups."
},{
 id:"f171-route-prevention-transfer",unit:"f171",area:1,section:"1.3.1",type:"single",level:"apply",
 stem:"A youth centre improves ventilation to reduce respiratory infection risk. Its report calls this an HIV prevention measure too, since HIV and SARS-CoV-2 are both viruses. Which revision is justified?",
 options:["Keep the claim because ventilation reduces exposure to all viruses.","Explain the respiratory benefit. For HIV, describe a measure such as condom use that addresses sexual transmission.","Replace ventilation with blood-product screening to prevent both infections in shared air.","Remove both claims because ventilation cannot guarantee that nobody will become infected."],
 correct:1,model:"Ventilation addresses shared air. Condoms address one route by which HIV can be transmitted.",
 explain:"The biological group does not specify the exposure. HIV is not acquired by sharing air. Blood-product screening addresses a blood route.",
 optionFeedback:["Viral classification does not imply a shared route.","","Screening donated blood does not reduce exposure to respiratory particles in a room.","A measure can reduce risk without preventing every case."],
 misconception:"Preventive measures must act on the relevant route of exposure.",
 hintCue:"Identify the route affected by each proposed measure.",catchup:"1.3.1.viruses"
});
additions.push({
 id:"f170-gamete-contributions",unit:"f170",area:1,section:"1.1.1",catchup:"3.3.1",type:"written",level:"apply",
 stem:"A student argues that either gamete could supply all the materials for the first stages of development because both contribute a set of chromosomes. Use one feature of each gamete to evaluate that argument.",
 markPoints:["A feature of the sperm is linked to delivery of its haploid nucleus, such as the flagellum providing propulsion or the acrosome helping penetration.", "The oocyte contributes a haploid set and substantial cytoplasm with organelles and stored molecules used in early development.", "Equal numbers of chromosomes do not imply equal contributions of cytoplasmic material."],
 model:"A sperm transports its chromosomes in a small, mobile cell. The large oocyte supplies chromosomes and most of the cytoplasm, including organelles and stored molecules for early development. A chromosome count misses that functional difference.",
 explain:"Connect the structure of each gamete to a contribution. Accept egg cell or ovum for the female gamete here, and tail or flagellum for the sperm's propulsive structure.",
 misconception:"A chromosome count measures only one part of a gamete's contribution.", hintCue:"Think about what surrounds the chromosomes in each cell."
});
additions.push({
 id:"f170-nucleolus-export",unit:"f170",area:1,section:"1.1.3",catchup:"1.1.3.evidence",type:"single",level:"apply",
 stem:"A label enters newly assembled ribosomal subunits in a human cell. The labelled subunits build up inside the nucleus and few reach the cytoplasm. Which interpretation uses both observations?",
 options:["Nucleolar assembly has stopped, since few labelled subunits reach the cytoplasm.","The subunits are made in the Golgi and then transferred into the nucleus.","Assembly still occurs. Investigate transport out through the nuclear pores.","Translation has moved into the nucleolus, where the subunits accumulate."],correct:2,
 model:"Subunits are being assembled in the nucleolus, but their appearance in the cytoplasm is reduced.",
 explain:"The build-up distinguishes production inside the nucleus from export through its envelope. A failure somewhere in the export process fits these data. They do not identify a particular defective pore.",
 optionFeedback:["The presence of newly assembled labelled subunits is evidence that assembly still occurs.","The Golgi sorts cellular products. Ribosomal subunit assembly occurs mainly in the nucleolus.","","Finding subunits in a location does not show that they make polypeptides there."],
 misconception:"A low amount at the destination can reflect delivery even when assembly continues.",hintCue:"Where was the newly assembled material actually found?"
},{
 id:"f170-ribosome-fractions",unit:"f170",area:1,section:"1.1.3",catchup:"1.1.3.evidence",type:"single",level:"apply",
 stem:"A lab mixes two purified preparations, typical bacterial ribosomes and human cytosolic ribosomes. It then separates particles by sedimentation. Peak X is 70S and peak Y is 80S. Which result would fit a reagent that acts only on these bacterial ribosomes?",
 options:["Protein synthesis falls in X, while Y remains active.","Protein synthesis falls in Y, because attachment to human rough ER produces 70S particles.","Both peaks stop working because all ribosomes have the same sedimentation behaviour.","X loses the ability to make lipids, while Y can still assemble proteins."],correct:0,
 model:"The bacterial 70S preparation is affected. The human cytosolic 80S preparation remains active.",
 explain:"Both preparations make polypeptides. Their different sedimentation properties distinguish the two populations specified here. Attachment of a human cytosolic ribosome to ER does not make it 70S.",
 optionFeedback:["","This reverses the two preparations and confuses location with type.","A shared function does not make the two particles structurally identical.","Ribosomes join amino acids to make polypeptides."],
 misconception:"A shared job does not imply identical ribosome structure.",hintCue:"Use the two stated sources of the purified particles."
},{
 id:"f170-lysosome-evidence",unit:"f170",area:1,section:"1.1.3",catchup:"1.1.3.evidence",type:"written",level:"apply",
 stem:"A cell takes material into a lysosome. Tagged digestive enzymes reach it in normal amounts. Its interior becomes less acidic and material persists. Explain which stage is most likely impaired, using the delivery evidence.",
 markPoints:["Usual amounts of tagged enzymes reach the lysosome, supporting delivery from the Golgi via vesicles.","The change in pH can reduce activity of the lysosomal enzymes.","Slower digestion can explain why material persists despite enzyme delivery."],
 model:"The evidence supports delivery of the tagged enzymes. Lysosomal hydrolases usually work best in acidic conditions. A less acidic lumen can slow breakdown, leaving material behind.",
 explain:"Distinguish location from function. Accumulation alone cannot show whether the problem is sorting, delivery or activity after arrival.",
 misconception:"Finding an enzyme in the right place does not establish that conditions support its activity.",hintCue:"Which observation tests delivery, and which changes the conditions for digestion?"
},{
 id:"f170-graft-recognition",unit:"f170",area:1,section:"1.1.4",catchup:"1.1.4.surface",type:"single",level:"apply",
 stem:"Recipient immune cells respond strongly to donor cells but weakly to the recipient's own cells. Masking particular external donor HLA proteins reduces the response. Donor cells remain alive and still take up glucose. Which conclusion fits?",
 options:["Masking the donor cells blocked all membrane transport.","The donor proteins normally carry glucose through the bilayer.","Masking the proteins proves that rejection is impossible in the recipient.","Recognition of accessible donor antigens contributes to the immune response."],correct:3,
 model:"Recognition of the donor's surface antigens contributes to immune activation and can lead to tissue rejection.",
 explain:"The response falls when the donor markers are masked while uptake of glucose continues. The experiment supports a role for surface recognition, without measuring the eventual outcome of a transplant.",
 optionFeedback:["Glucose uptake continues, so general transport failure does not fit.","The evidence links the protein to recognition and provides no evidence that it carries glucose.","A reduced response in this experiment cannot predict every immune pathway in a recipient.",""],
 misconception:"Recognition and transport can be tested separately.",hintCue:"Which measured function changed when the external marker was masked?"
},{
 id:"f170-vesicle-directions",unit:"f170",area:1,section:"1.1.4",catchup:"1.1.4.surface",type:"written",level:"apply",
 stem:"In film A, a protein particle outside a cell becomes enclosed as the surface pinches inward. In film B, a sac of protein inside joins the surface and its contents appear outside. Explain how each protein changes location without passing through lipid tails.",
 markPoints:["In A, endocytosis encloses the outside material in a vesicle.","In B, exocytosis involves fusion of the vesicle membrane with the cell surface and release of its contents.","In both cases the membrane changes shape or joins another membrane. The protein stays on the same side of the lipid boundary."],
 model:"A pocket of surface membrane encloses the particle during endocytosis. In B, fusion during exocytosis opens the vesicle lumen to the outside. Neither protein has to diffuse through the hydrophobic interior.",
 explain:"Describe the direction, the membrane event and where the cargo ends up. A receptor may help select cargo, but binding alone cannot explain the movement.",
 misconception:"A macromolecule in a vesicle need not cross the phospholipid core.",hintCue:"Track the membrane around the cargo in each film."
});
additions.push({
 id:"f170-division-variation",unit:"f170",area:1,section:"1.1.5",catchup:"1.1.5.meiosis",type:"single",level:"apply",
 stem:"In a model germ cell, one homologue carries A and B together and the other carries a and b at the same two positions. After meiosis an intact chromosome carrying A and b is recovered. No mutations occurred. Which event explains that new combination on one chromosome?",
 options:["Independent orientation of intact homologues at metaphase I, without exchange of DNA.","A crossover between the two positions on non-sister chromatids during prophase I.","Copying an intact AB chromosome during the interval between meiosis I and II.","Separating unchanged sister chromatids during mitosis."],correct:1,
 model:"Crossing over between the loci can put A and b on the same chromatid.",
 explain:"Independent orientation changes which whole homologues from different pairs travel together. It cannot alone rearrange two alleles on the same chromosome. Exchanging corresponding segments between homologues can.",
 optionFeedback:["Orientation can change the combination across chromosomes. These markers are on the same chromosome.","","There is no additional S phase between the divisions. Copying an intact AB sequence also keeps the two alleles together.","Separating unchanged copies does not exchange their segments."],
 misconception:"Recombination within a chromosome and assortment of entire homologues can give different evidence.",hintCue:"Are the two markers on one chromosome or on separate pairs?"
});
additions.push({
 id:"f170-blood-cell-evidence",unit:"f170",area:1,section:"1.1.1",type:"match",level:"apply",
 stem:"Each observation points to a different cellular job. Match the observation to the function it best supports.",
 pairs:[["A haemoglobin-rich disc bends through a narrow passage","Carrying oxygen through a capillary"],["A cell with a multi-lobed nucleus encloses a small particle and delivers enzymes into the pocket","Neutrophil digestion of an engulfed particle"],["A B cell binds one antigen and its descendants secrete matching antibodies","Antigen-specific lymphocyte response"],["A cell with a two-lobed nucleus releases large granules against an external target","Eosinophil action without engulfing the target"],["A labelled blood cell enters tissue and matures into a large phagocyte","Monocyte contribution to tissue macrophages"]],
 model:"The disc carries haemoglobin through a narrow capillary. The neutrophil digests material inside a compartment. Specific binding initiates a B-cell response. Eosinophil granules can act outside the cell. A monocyte can mature into a tissue macrophage.",
 explain:"Use the process as well as the outline. A lobed nucleus alone would not tell you where granule contents acted. Detecting a macrophage in a tissue does not by itself establish its origin.",
 misconception:"All white cells do not handle a target in the same way.",correctionHint:"Locate the target, identify whether it is taken inside and look for evidence of a change of cell type.",hintCue:"Which observation follows a cell over time? Which follows material across its surface?"
},{
 id:"f170-tubule-liver-evidence",unit:"f170",area:1,section:"1.1.1",catchup:"1.1.1.surfaces",type:"written",level:"apply",
 stem:"In kidney sample K the proximal tubule cells retain their brush border, but ATP supply falls and less glucose is recovered from the filtrate. In liver sample L, pulse labelling shows new plasma protein accumulating in rough ER while less appears outside. Explain why intact microvilli in K and abundant rough ER in L are insufficient evidence of normal function.",
 markPoints:["Microvilli provide membrane area for uptake in K.","Reduced ATP can weaken the ion gradient maintained by pumps, reducing glucose reabsorption.","L can still make protein in rough ER. Less release with accumulation suggests a later delivery or secretion problem."],
 model:"K has absorptive surface area, but reabsorption also depends on gradients maintained using ATP. In L the protein is made, but transfer through the secretory pathway must also work. The readings do not locate one precise fault in L.",
 explain:"Use the readout of solute recovery or protein release. The abundance of a structure cannot establish the rate of a process that needs several steps.",
 misconception:"Seeing the expected structures cannot establish that their whole pathway works.",hintCue:"After identifying each structure, ask which other step is needed for the measured output."
});
var ids=new Set(bank.questions.map(function(q){return q.id;}));
additions.forEach(function(q){if(!ids.has(q.id)){bank.questions.push(q);ids.add(q.id);}});
})();


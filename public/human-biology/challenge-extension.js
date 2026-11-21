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
    "misconception": "Presenting a chart is not the same stage as cleaning, analysing or interpreting the underlying data.",
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
    "stem": "A fictional community service wants to publish a report about missed appointments. One option gives counts for each age band and location. Another shares a record for each visit with a code, exact age and date. Discuss what the service should publish to help explain patterns while protecting privacy.",
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
      "Flag the missing reading and check its source before calculating",
      "Keep zero because a blank is normally zero",
      "Copy 19 into B because the next reading was 19",
      "Ignore the missing status and say the mean used all three readings"
    ],
    "correct": 0,
    "model": "Check the source and keep unknowns visible. The mean of the two known readings is 18.",
    "explain": "An unknown is not a measured zero. Give the number of observations used in any mean.",
    "misconception": "Replacing a blank by zero gives it a value without evidence.",
    "unit": "f171",
    "samAligned": false
  }
];
var ids=new Set(bank.questions.map(function(q){return q.id;}));
additions.forEach(function(q){if(!ids.has(q.id)){bank.questions.push(q);ids.add(q.id);}});
})();


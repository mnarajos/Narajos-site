/* Clinical examples are fictional and illustrate general reasoning. */
(function () {
  const { choice, written } = window.KeystoneHumanTeaching;
  const screening = {
    caption: "Fictional screening results compared with diagnostic assessment",
    head: ["Screen", "Condition present", "Condition absent"],
    rows: [["Positive", "18", "12"], ["Negative", "2", "68"]]
  };
  const readings = {
    caption: "Fictional repeat systolic blood pressure readings (mmHg)",
    head: ["Visit", "First", "Second", "Third", "Conditions"],
    rows: [["1", "136", "134", "135", "Seated, rested"], ["2", "146", "145", "147", "Immediately after walking"], ["3", "135", "—", "134", "Seated, rested"]]
  };
  const study = {
    caption: "Fictional study of an optional sleep workshop after four weeks",
    head: ["Group", "People", "Mean gain in sleep per night"],
    rows: [["Chose workshop", "25", "35 min"], ["Usual information", "25", "15 min"]]
  };

  Object.assign(window.KeystoneHumanLessons, {
    "f171/1.2.1": {
      revision: 1,
      goal: "Explain how a change in airway or alveolar structure affects a different part of breathing.",
      activate: ["How do ventilation and gas exchange differ?", "Ventilation moves air into and out of the lungs. Gas exchange moves oxygen and carbon dioxide across the surfaces of the alveoli."],
      prior: ["f170/2.1.3", "Work through the alveolar diffusion model"],
      explain: [
        "COPD involves persistent difficulty moving air out of the lungs. Narrowed small airways and excess mucus can reduce airflow. In emphysema, destruction of alveolar walls reduces the surface for gas exchange and loss of elastic recoil adds to difficulty breathing out.",
        "Breathlessness during daily activity and a persistent cough with mucus are common symptoms. An examiner may hear wheeze, and spirometry can provide objective evidence of airflow obstruction. Similar symptoms can occur with different conditions.",
        "Reduced airway clearance can contribute to chest infections, which can worsen symptoms. Persistent breathlessness can limit activities such as climbing stairs. Repeated flare-ups can mean missed work, greater healthcare use and extra help from family."
      ],
      table: {caption: "Match a structural change to its most direct consequence", head: ["Change", "Direct consequence"], rows: [
        ["Smaller airway opening", "Greater resistance to airflow"], ["Loss of alveolar walls", "Less gas exchange area and reduced recoil"]
      ]},
      focusCells: [["0:0"], ["1:0"], ["0:0","1:0"]],
      nodes: ["Identify the structure", "Identify the second effect", "Limit the conclusion"],
      model: [
        "In a fictional model, mucus narrows the airway opening. Air meets greater resistance, so the same driving pressure can move less air.",
        "In a different part of the model, alveolar walls have been lost. This reduces the area across which gas can diffuse. The amount of mucus does not measure this loss of area.",
        "Breathlessness can occur with either problem. To distinguish them, compare evidence about airflow with evidence about the tissue and gas exchange."
      ],
      guided: choice("The same pressure moves less air through a model airway after its lumen narrows. Which explanation fits?", 1,
        [["The smaller lumen increases the area available for diffusion.", "The measurement concerns movement of air along a tube."], ["Narrowing increases resistance to air movement.", ""], ["The alveoli have necessarily lost their walls.", "The model changed the airway. It supplied no alveolar evidence."]],
        "Explain the observation using the structure that changed.", ["Locate the change on the pathway taken by air."]),
      apply: written("In another fictional lung, an intervention improves airflow through narrowed airways. Imaging still shows loss of alveolar walls. Explain why better airflow does not establish that gas exchange has recovered.",
        ["Air can move more easily through the airways.", "Loss of alveolar walls leaves less exchange area.", "The evidence about airflow does not measure diffusion or show that the lost walls were restored."],
        "Airflow describes ventilation. Oxygen transfer also depends on surviving exchange surfaces. Better flow can coexist with reduced diffusion area, so the two effects require different evidence.")
    },
    "f171/1.2.1.hiatus": {
      revision: 1,
      goal: "Explain how a sliding hiatus hernia can change digestive function and cause symptoms.",
      activate: ["What separates the chest from the abdomen?", "The diaphragm is a sheet of muscle. The oesophagus normally passes through an opening in it before joining the stomach."],
      explain: [
        "In a sliding hiatus hernia, the junction of the oesophagus and stomach and part of the upper stomach move through the opening into the chest. Normally the lower oesophageal sphincter and the surrounding diaphragm work together to reduce backflow.",
        "The displacement can weaken this barrier. Stomach contents can then reflux into the oesophagus and irritate its lining. Heartburn or a sour taste are possible symptoms. The displaced junction seen on imaging is objective evidence of the anatomical change. Some people have no symptoms.",
        "Recurrent reflux can disturb meals or sleep. The impact on an individual and their family depends on symptom frequency and severity."
      ],
      visual: "model",
      modelTitle: "Trace the change from stomach position to heartburn",
      nodes: ["Locate the change", "Explain the effect", "Separate sign and symptom"],
      model: [
        "In the sliding example, the stomach joins the oesophagus above the diaphragm. Look for the junction marker relative to the diaphragm.",
        "The displaced junction can separate the two parts of the barrier to reflux. This makes it easier for existing acidic stomach contents to move up into the oesophagus. Irritation can cause a burning feeling.",
        "In a fictional case, the raised junction on imaging is objective evidence. Waking with a burning feeling is an experienced symptom. Either the hernia or reflux can be present without the other."
      ],
      guided: choice("A fictional image shows the junction above the diaphragm. Which function is most directly affected?",
        1, [["Bile entering the small intestine.", "The change is at the stomach entrance, not the bile duct."], ["The barrier to stomach contents moving back up the oesophagus.", ""], ["Acid being made by the diaphragm.", "Acid is made in the stomach. The diaphragm helps the barrier to backflow."]],
        "Relate the changed location of the junction to loss of support for the reflux barrier."),
      apply: choice("A fictional study finds that reflux episodes fall after the position of the junction is restored, even though stomach acidity stays similar. Which explanation fits?",
        2, [["The diaphragm now neutralises the acid.", "The diaphragm contributes to the barrier. The evidence does not show chemical neutralisation."], ["The stomach must be making less acid despite the unchanged acidity.", "Reflux can fall because less of the stomach contents travels upwards."], ["Restoring the position can improve the barrier and reduce entry of acidic contents into the oesophagus.", ""]],
        "How much acid reaches the oesophagus depends on both stomach contents and the barrier to backflow.")
    },
    "f171/1.2.1.hodgkin": {
      revision: 1,
      goal: "Relate Hodgkin lymphoma in lymphatic tissue to enlarged nodes and effects on nearby structures.",
      activate: ["What do lymph nodes normally do?", "Lymph nodes filter lymph and provide places where immune cells encounter material carried from tissues."],
      explain: [
        "Hodgkin lymphoma is a cancer of the lymphatic system. In classical Hodgkin lymphoma the cancer cells come from B lymphocytes. Tumour tissue and surrounding inflammatory cells accumulate in affected lymph nodes, which can become visibly or palpably enlarged and are often painless.",
        "Effects depend partly on where the enlarged nodes are. Nodes in the chest can press on nearby structures and contribute to cough or breathlessness. Some people also experience fever, drenching night sweats, unexplained weight loss or fatigue. A measured temperature is a sign. Reported tiredness is a symptom.",
        "Fatigue and appointments can affect daily life and family routines. Swollen nodes can have other causes, including infection. Tissue examined after a biopsy can establish a diagnosis."
      ],
      table: {caption: "Separate local effects, symptoms and diagnostic evidence", head: ["Finding", "Biological interpretation"], rows: [
        ["An enlarged node", "More tissue within an affected node can increase its size"],
        ["Cough with enlarged chest nodes", "Pressure on a nearby airway can contribute to cough"],
        ["Reported night sweats", "A symptom that can occur in several conditions"],
        ["Diagnostic tissue changes in a biopsy", "Evidence about what is causing the enlargement"]
      ]},
      focusCells: [["0:0"],["1:0","2:0"],["3:0"]],
      nodes: ["Identify the tissue", "Trace the local effect", "Limit the conclusion"],
      model: [
        "A swollen node can develop where the cancer and the surrounding inflammatory response increase the volume of lymphatic tissue. The swelling is an observable sign.",
        "In a fictional case, enlarged chest nodes press against a large airway. The pressure can contribute to cough, even without a primary tumour in the lung tissue.",
        "A cough or enlarged node alone is not specific to lymphoma. Use tissue findings to decide the cause and the site of affected nodes to explain local effects."
      ],
      guided: choice("In a fictional case, enlarged nodes press on an airway. Which reasoning connects the changes?",
        0, [["Expansion of lymphatic tissue narrows the space available to the airway.", ""], ["A cough proves that the cancer began inside the lung.", "Nearby enlarged nodes can compress an airway from outside."], ["Painless swelling rules out a cancer.", "A node can enlarge without causing pain."]],
        "The relationship between the node and the airway explains a possible local consequence."),
      apply: choice("A fictional person with confirmed Hodgkin lymphoma has a painless lump in the armpit and swelling of the nearby arm. Imaging shows the enlarged nodes impeding lymph drainage from the arm. What explains the swelling?",
        1, [["The blocked nodes increase drainage, so fluid collects in the arm.", "Greater drainage would remove more tissue fluid. The evidence shows reduced drainage."], ["The enlarged nodes restrict drainage, allowing tissue fluid to accumulate in the arm.", ""], ["Any painless lump blocks lymph because it is painless.", "Pain does not indicate drainage. The anatomical relationship on the image is the relevant evidence."]],
        "Impaired lymph drainage can leave excess fluid in the tissue. The supplied imaging is needed to connect that effect to the enlarged nodes.")
    },
    "f171/1.2.1.pkd": {
      goal: "Explain how cysts can change kidney function and interpret urine volume alongside other evidence.",
      activate: ["What does a kidney do besides making urine?", "It removes wastes and helps regulate the amount of water and dissolved ions in the blood."],
      explain: [
        "Autosomal dominant polycystic kidney disease is an inherited disorder. Fluid-filled cysts can enlarge the kidneys and disrupt functioning tissue over time. This can reduce the kidneys’ capacity to remove wastes and regulate water and ions.",
        "Some people experience pain in the side or back. Blood in the urine and raised blood pressure can be signs. Kidney function can decline even while the person continues to pass urine.",
        "Symptoms vary. Pain or repeated hospital appointments can affect everyday activities. If kidney failure develops, treatment can affect work, household routines and healthcare use."
      ],
      table: {caption: "Identify what each observation measures", head: ["Fictional finding", "What it establishes"], rows: [
        ["Imaging shows both kidneys are enlarged with multiple cysts", "Structural change"],
        ["Urine continues to be produced", "Some fluid still leaves the body via the kidneys"],
        ["Repeat blood tests indicate falling filtration", "Loss of functional clearance despite continued urine production"]
      ]},
      focusCells: [["0:0"],["1:0","2:0"]],
      modelTitle: "Separate urine production from filtration",
      nodes: ["Link cysts to function", "Interpret two measures"],
      model: [
        "Follow the effect of the structural change. Enlarging cysts can displace and damage functioning kidney tissue, leaving less capacity to regulate the blood and remove waste.",
        "In a fictional example, the urine volume stays similar but blood tests indicate reduced clearance. The volume measures the amount of fluid passed. It does not measure how effectively wastes were removed from the blood."
      ],
      guided: choice("An image shows large cysts and less remaining functioning kidney tissue. Which effect is plausible?",
        0, [["The kidneys may remove wastes from blood less effectively.", ""], ["The remaining tissue must compensate fully.", "The image alone cannot establish how well the remaining tissue works."], ["Normal urine colour confirms normal filtration.", "Appearance does not measure filtration."]],
        "Start with the change in working kidney tissue and ask which normal functions could be affected."),
      apply: written("Two fictional people with polycystic kidney disease report similar pain. One has blood in the urine but similar filtration results at both visits. Explain how the findings can coexist and what they establish.",
        ["Blood in urine is an observed sign and pain is a reported symptom.", "Urine composition and filtration measure different aspects of kidney function.", "The results do not establish that filtration declined over the two visits."],
        "Blood in the urine can be present even when there is little detectable change in filtration over the stated interval. The observations answer different questions.")
    },
    "f171/4.1": {
      revision: 1,
      goal: "Choose a measurement for a biological question and state what its result can establish.",
      activate: ["What is the difference between a symptom and a measurement?", "A symptom is reported by the person. A measurement records a specific feature, such as oxygen saturation or airflow."],
      prior: ["f171/4.2.2", "Compare serial readings taken under different conditions"],
      explain: [
        "Start with the medical history. Ask when symptoms began, what affects them, and what else might explain them. Clear language, enough time to answer, and a private, accessible room can improve the information a person is able to share. Inspection means looking, palpation means feeling, percussion means tapping and judging the sound, and auscultation means listening to body sounds.",
        "Initial measurements target different features. A cuff reading of 128/76 mmHg gives systolic pressure first, when the ventricles contract, and diastolic pressure second, between contractions. A single reading is affected by conditions such as rest, position and cuff fit. Temperature is an objective measurement but by itself cannot establish why someone feels feverish.",
        "BMI is mass in kilograms divided by height in metres squared. For a fictional adult of 80 kg and 2.00 m, BMI is 80 ÷ 4 = 20 kg/m². It puts mass in context of height but does not distinguish fat from muscle or diagnose disease.",
        "Peak expiratory flow estimates the greatest flow during a forced breath out. Spirometry can record both volume and flow. Pulse oximetry estimates the percentage of haemoglobin carrying oxygen. Saturation gives no direct measure of expiratory flow or of the cause of a change.",
        "Choose further tests for the information still missing. For example, an image can show an area of altered tissue. Examining a sample from that area under a microscope addresses whether the tissue itself has changed."
      ],
      compare: {caption: "What further investigations can contribute", head: ["Investigation", "Evidence it provides", "One limit"], rows: [
        ["Biopsy", "A sample of tissue for examination", "The sample represents only the site taken"],
        ["Blood test", "A chosen blood cell count or substance concentration", "An abnormal level may have several causes"],
        ["Cognitive assessment", "Performance on defined thinking tasks", "Language or hearing can affect the result"],
        ["Mammogram", "An X-ray image of breast tissue", "An abnormal image alone may not establish its cause"],
        ["Urine test", "Evidence such as blood, protein or glucose in urine", "A finding usually needs other clinical context"]
      ]},
      table: {caption: "Three measurements used in fictional initial assessments", head: ["Tool", "Readout", "One limitation"], rows: [
        ["Peak flow meter", "Maximum expiratory flow", "Effort and technique matter"],
        ["Spirometer", "Volume and flow during breathing manoeuvres", "Technique and appropriate reference values matter"],
        ["Pulse oximeter", "Estimated oxygen saturation", "Does not measure the volume or flow of air"]
      ]},
      focusCells: [["0:0","1:0","2:0"], ["1:0","1:1"], ["2:0","2:1"]],
      nodes: ["Name the variable", "Choose a tool", "Limit the inference"],
      model: [
        "An investigator wants to compare how much air two people exhale in the first second. The target variable is exhaled volume over a defined time.",
        "Spirometry can provide that volume. A peak-flow reading reports an instant of highest flow, which could be similar even if the first-second volumes differ.",
        "A saturation reading answers an oxygenation question. Using the right variable under comparable conditions improves the comparison, though one result is still only part of an assessment."
      ],
      guided: choice("A pupil wants the highest flow reached during a forced breath out. Which readout answers that question?", 0,
        [["Peak expiratory flow.", ""], ["The percentage of haemoglobin carrying oxygen.", "This estimates oxygen saturation."], ["The total expired volume.", "Two people can reach the same total volume at different rates."]],
        "Peak flow is a maximum rate rather than the total volume.", ["Separate the amount of air from its rate of movement."]),
      apply: written("Two fictional records have the same maximum expiratory flow. An investigator wants to know whether the percentage of oxygenated haemoglobin fell during walking. Which measurement addresses the question, and what does it leave uncertain?",
        ["Pulse oximetry estimates oxygen saturation.", "Comparable readings before and during walking can show whether the estimate changed.", "Saturation does not establish the cause of a change or show how much air is exhaled."],
        "Compare oxygen saturation estimates obtained under defined conditions. Matching peak-flow readings give no direct evidence about this variable. A saturation change alone cannot establish the underlying cause.")
    },
    "f171/2.1": {
      revision: 1,
      goal: "Use evidence about a fictional patient to explain a treatment mechanism and justify a choice.",
      activate: ["Quick check: what does fracture stability tell you?", "If fragments stay in an acceptable position, the immediate task is to protect that alignment while bone repairs."],
      explain: [
        "Identify the problem and the goal before comparing treatments. In this fictional case, a cast limits movement externally. Surgical fixation stabilises the fragments internally but carries procedural risks.",
        "A choice depends on how a mechanism fits the circumstances and whether the expected benefit justifies the risks. Supportive care manages effects or helps recovery. Treatment with curative intent aims to resolve the condition."
      ],
      modelTitle: "Compare immobilisation with surgical fixation",
      nodes: ["Problem and goal", "Mechanisms and trade-off", "Use the evidence"],
      model: [
        "A fictional wrist fracture remains aligned on repeat images. That is the evidence that matters for the immediate goal: maintain alignment while the bone heals.",
        "A cast limits movement without an operation. Fixation can hold fragments from within, but adds risks such as infection and recovery from surgery.",
        "Since alignment is maintained, the case shows no clear added stabilising benefit from an operation. External immobilisation could be sufficient here. If alignment changed, the balance could change."
      ],
      guided: choice("After a different fictional fracture is realigned, two follow-up images show displacement despite a fitted cast. Which comparison best justifies considering fixation?", 2,
        [["Fixation avoids procedural complications.", "Internal fixation requires an operation and brings its own risks."], ["The cast has failed to repair the bone itself.", "The cast protects alignment. Living tissue carries out repair."], ["Fixation may address the lost alignment that the cast did not maintain.", ""]],
        "The new evidence changes the balance. Internal support could maintain alignment, although the procedural risk still matters.", ["Identify which treatment goal the images show was not met."],
        { table: {caption: "Options in this fictional case", head: ["Option", "How it acts", "Relevant limit"], rows: [["Cast", "Limits motion from outside", "Alignment was lost"], ["Fixation", "Holds fragments internally", "Invasive procedure"]] } }),
      writing: {
        title: "Plan a justified scientific paragraph",
        prompt: "Two fictional patients with stable fractures are offered different forms of immobilisation. Explain how maintaining alignment affects your judgement.",
        responses: [
          ["Topic sentence", "For a stable fracture, the priority is to preserve satisfactory alignment while the bone repairs."],
          ["Supporting reasoning", "Immobilisation reduces movement between fragments. If follow-up shows that alignment is maintained, an intervention with added risks needs a reason beyond its greater invasiveness."],
          ["Concluding sentence", "The follow-up evidence supports the option that can maintain alignment at an acceptable risk in this case."]
        ],
        compare: ["The opening answers the question with a scientific claim. The middle explains the mechanism and applies the evidence. The conclusion weighs the benefit and risk in the stated circumstances."]
      },
      apply: written("A fictional cancer has spread to three sites. One mass is pressing on a nerve. Compare local surgery with a systemic medicine, and justify which better addresses the stated aim of treating disease at all three sites. Include a limit of your judgement.",
        ["Local surgery could relieve pressure at the operated site but would not by itself treat distant sites.", "A systemic medicine can circulate to all three sites and act if the tumour cells are susceptible.", "The wider reach fits the stated aim. Suitability still depends on treatment response and adverse effects."],
        "For the goal of treating disease at all three sites, a suitable systemic drug has wider reach through the circulation. Local surgery could still help the nerve compression. Wider reach alone does not prove the drug will work or that its benefits outweigh its harms.", ["Compare what each option can reach with the stated goal."]),
      followup: choice("Surgery removes a local mass that is pressing on a nerve. Which conclusion follows from the mechanism?", 1,
        [["It establishes that disease has been cured everywhere.", "A local operation does not provide evidence about distant sites."], ["Removal can relieve local pressure on the nerve.", ""], ["It works by delivering medication through the circulation.", "Here the mechanism is physical removal."]],
        "Match the claim to the local mechanism and the evidence available.")
    },
    "f171/2.2": {
      revision: 1,
      goal: "Explain how a management therapy affects function and judge what the improvement shows.",
      activate: ["Quick check: what is a functional outcome?", "A measured change in what a person can do, such as walking more easily or completing a daily task."],
      explain: ["Management therapy can reduce symptoms, help function or improve quality of life. A change in one outcome can be valuable even if the disease persists. Check whether the evidence measures an effect of the disease or the underlying disease process."],
      nodes: ["Identify the effect being managed", "Connect the therapy and function", "Limit the claim"],
      model: [
        "A fictional person with Parkinson's has difficulty starting movements. The target is an effect that makes walking and everyday tasks harder.",
        "Levodopa can be converted into dopamine in the brain. Improving dopamine signalling can ease some movement symptoms. A timed walk can provide evidence about one aspect of daily function.",
        "A quicker comparable walk supports a functional benefit in this example. It does not show that the underlying disease has been reversed. Effects, unwanted effects and individual priorities still matter."
      ],
      guided: choice("After a course of physiotherapy, a fictional person's balance task improves and they can stand from a chair more easily. Which conclusion best fits these measurements?", 1,
        [["The therapy eliminated the underlying cause of Parkinson's.", "Balance and standing do not measure whether neurodegeneration has reversed."], ["The person shows improvement in two measured functions.", ""], ["The therapy has no benefit because it did not cure the condition.", "Improved function can be a meaningful benefit of a management therapy."]],
        "State what the tasks measure. Better performance supports a change in function, and the measurements leave the underlying disease status open.", ["Identify the outcome measured in each task."]),
      apply: written("A fictional person with inflammatory arthritis reports less pain after symptom management and returns to a favourite activity. The follow-up measure of joint damage is unchanged. Explain how these findings can coexist and what they show about benefit.",
        ["Less pain can make movement or participation easier.", "Pain and ability to participate are different outcomes from structural joint damage.", "There is evidence of symptomatic or functional benefit. The findings do not establish repair of the damage."],
        "A therapy can ease pain so that activity becomes possible, even when measured joint damage is unchanged. The two measures describe different effects, so the improvement supports symptom management without demonstrating structural recovery.", ["Separate what the person can do from what happened to the underlying tissue."]),
      followup: choice("A support aid improves a person's measured independence at home. Which outcome does the evidence establish most directly?", 0,
        [["Improvement in the measured daily function.", ""], ["A reversal of the underlying cause.", "The assessment did not measure a reversal of the underlying process."], ["Benefit for every user with this condition.", "One example cannot establish the same benefit in other people."]],
        "State the outcome supported by the evidence and keep the scope of the claim proportionate.")
    },
    "f171/2.3": {
      revision: 1,
      goal: "Distinguish prevention, screening, diagnostic follow-up and monitoring by the purpose in each situation.",
      activate: ["Quick check: does a screening result establish whether a condition is present?", "A screen identifies a higher chance. A further assessment can help establish whether the condition is present."],
      explain: ["Prevention aims to reduce risk. Screening identifies people who may need further assessment. Diagnosis investigates whether a condition is present. Monitoring uses repeated observations to track change."],
      prior: ["f171/4.2.1", "Work through a screening results table"],
      nodes: ["Reduce risk", "Identify who needs assessment", "Establish the condition", "Track change"],
      model: [
        "A fictional programme supports physical activity to lower the chance of disease developing. The aim is prevention.",
        "The programme invites apparently well people to a test. The key facts are who is invited and why. A positive result flags a higher chance for follow-up.",
        "A different assessment investigates whether the condition is present. That is diagnostic follow-up, even if it uses a similar measurement.",
        "Once the condition is established, the team repeats a measurement to check change over time. Its purpose is now monitoring."
      ],
      guided: choice("An apparently well person has a raised reading at a routine screening invitation. A different test is arranged. Why is the second stage different?", 1,
        [["It monitors treatment response.", "No diagnosis or treatment response has been established."], ["It investigates whether the condition is present.", ""], ["It prevents the original condition by ensuring the first reading falls.", "An investigation can clarify a result without changing the condition."]],
        "The first test flags a higher chance. The second supplies evidence for a diagnosis.", ["Ask what the first result establishes and what is still uncertain."]),
      apply: written("A fictional hearing programme invites people without known hearing loss. A participant has an abnormal first result, receives a full hearing assessment, then returns six months after a diagnosis for a repeat measurement. Explain the purpose of all three stages.",
        ["The invitation and initial test screen for people who may have hearing loss.", "The full assessment investigates or establishes whether hearing loss is present.", "After diagnosis, a repeat measurement monitors change."],
        "The first stage flags possible hearing loss, the second investigates whether it is present, and the third checks how an established condition changes over time."),
      followup: choice("A screening test is negative. Later diagnostic assessment finds the condition. What was the earlier result?", 1,
        [["A true negative.", "A true negative means the condition was absent at the time of screening."], ["A false negative, if the condition was already present.", ""], ["A false positive.", "The screening result was negative."]],
        "If follow-up shows the condition was present at the time, the earlier negative screen missed it.")
    },
    "f171/4.2.1": {
      revision: 1,
      goal: "Classify four screening outcomes from a table and use the relevant group to interpret the results.",
      activate: ["Quick check: which result is the screen and which is the comparison?", "The screen reports positive or negative. For this exercise, a separate diagnostic assessment establishes whether the condition is present."],
      explain: ["Read the screen row first. Then use the diagnostic column. A screen result is true when it agrees with the diagnostic assessment and false when it disagrees."],
      table: screening,
      focusCells: [["0:0"], ["0:1"], ["1:0"], ["1:1"]],
      nodes: ["True positive", "False positive", "False negative", "True negative"],
      model: [
        "Start at Positive. Move to Condition present. The screen and diagnostic assessment agree. This cell contains 18 true positives.",
        "Stay in Positive and move to Condition absent. These 12 people were flagged by the screen even though they did not have the condition.",
        "Start at Negative and move to Condition present. These two people had the condition and were missed by the screen.",
        "In Negative and Condition absent, the results agree. These 68 people are true negatives. Use the whole relevant row or column if asked for a proportion."
      ],
      guided: choice("A service wants to review people who had the condition but were missed. Which cell and count give this group?", 1,
        [["Positive / condition absent: 9.", "That group was flagged by the screen and did not have the condition."], ["Negative / condition present: 4.", ""], ["Negative / condition absent: 57.", "That group did not have the condition, so it was correctly screened negative."]],
        "Read the negative row because the screen missed the person, and the present column because diagnostic assessment found the condition.", ["Find the row for a screen that failed to flag the person.", "Then choose the column where diagnostic assessment finds the condition."],
        { table: {caption: "Fictional pilot screening and follow-up", head: screening.head, rows: [["Positive", "10", "9"], ["Negative", "4", "57"]] } }),
      apply: choice("A leaflet says most positive screens in this fictional group were confirmed. Which comparison justifies or corrects the claim?", 0,
        [["Correct it: only 7 of 24 positive screens were confirmed.", ""], ["Keep it: 7 of the 10 people with the condition screened positive.", "That is the proportion of people with the condition picked up. The claim is about all positive screens."], ["Correct it: 3 of 50 negative screens were missed.", "That is a useful result for a different group. It cannot test a claim about positive screens."]],
        "The denominator is everyone who screened positive: 7 + 17 = 24. Only 7 had the condition on diagnostic assessment, so most positive screens were not confirmed.", ["Which set of people belongs in the denominator of the leaflet's claim?"],
        { table: {caption: "A different fictional screening programme", head: screening.head, rows: [["Positive", "7", "17"], ["Negative", "3", "47"]] } }),
      followup: choice("A service reports 32 positive screens. Diagnostic assessment finds the condition in 11 of them. How many positive results were false?", 2,
        [["11", "Those are true positives because the condition was present."], ["32", "This counts all positive screens, including those confirmed by diagnostic assessment."], ["21", ""]],
        "32 − 11 = 21 people screened positive but did not have the condition.")
    },
    "f171/4.2.2": {
      revision: 1,
      goal: "Use repeated measurements and their conditions to judge whether an apparent trend is credible.",
      activate: ["Quick check: how do repeatability and accuracy differ?", "Repeated measurements may agree with one another but still differ from a trusted reference. That would show good repeatability and poor accuracy."],
      explain: ["Check units, conditions and equipment before inferring change. Small differences can reflect normal variation. A missing value is unknown. A consistent instrument offset can remain even when you take many readings."],
      table: readings,
      focusCells: [["0:0", "0:1", "0:2", "1:0", "1:1", "1:2"], ["0:3", "1:3"], ["2:0", "2:1", "2:2", "2:3"]],
      nodes: ["Compare values", "Check measurement conditions", "Use comparable readings"],
      model: [
        "Visit 1 readings are near 135 mmHg. Visit 2 readings are near 146 mmHg. Each set is tightly grouped, but the two visits differ.",
        "The person rested at visit 1 and had just walked at visit 2. The higher readings do not isolate a change in resting pressure.",
        "The comparable rested readings at visit 3 sit close to visit 1. The second reading was not recorded. Any mean for that visit uses the two observed readings and states that one is missing."
      ],
      skills: ["averages", "graph"],
      guided: choice("The available readings at the third visit are 135 and 134 mmHg. One field is missing. A reference check also finds that this cuff reads 8 mmHg high every time. Which comment is justified?", 0,
        [["The two readings are close, but the cuff can be consistently inaccurate and the missing value remains unknown.", ""], ["The omitted value can be treated as normal because the other readings are close.", "Agreement among observed values cannot establish a value that was never recorded."], ["Averaging the readings removes the cuff's constant offset.", "A systematic shift persists when readings are averaged."]],
        "Separate agreement between readings from agreement with a trusted reference. Report missing information as missing.", ["Distinguish variation within a set from error shared by the whole set."]),
      apply: {
        ...written("Use this fictional peak-flow record to assess the claim that lung function steadily declined. Cite the comparison you trust most and explain what you would check next.",
          ["Weeks 1 and 3 used comparable conditions and have overlapping readings.", "Week 2 is lower, but different equipment and technique could account for it. One result is missing.", "Repeat measures with consistent equipment and technique and check device accuracy before deciding whether a trend is present."],
          "The comparable weeks show similar recorded values. The lower week 2 values were recorded under different conditions, so the record does not establish a steady decline. Flag the missing week 3 value and take standardised readings with checked equipment.", ["Which weeks used comparable equipment and technique?"]),
        table: { caption: "Fictional peak-flow record (L/min)", head: ["Week", "First", "Second", "Third", "Conditions"],
          rows: [["1", "390", "400", "390", "Same device and technique"], ["2", "340", "350", "345", "Different device, no technique reminder"], ["3", "395", "—", "390", "As week 1"]] }
      },
      followup: choice("Four comparable visits give readings around 420, 410, 400 and 390 L/min. The same checked method is used. What conclusion is supported?", 1,
        [["The readings prove the cause of the change.", "A trend in the readings does not identify a cause."], ["There is evidence of a downward trend in measured peak flow.", ""], ["Only the first reading matters because it was the highest.", "Monitoring compares readings over time."]],
        "A consistent fall under comparable conditions supports a measured trend. It does not identify its cause.")
    },
    "f171/a3": {
      revision: 1,
      goal: "Trace who does what in an adaptive immune response and predict the effect of an interruption.",
      activate: ["Quick check: how does an antigen differ from an antibody?", "An antigen is a target recognised by the immune system. An antibody is a protein that binds to a specific feature of that target."],
      explain: [
        "Innate defences act rapidly. Phagocytes can engulf material. The adaptive response uses selected B and T lymphocytes. Plasma cells secrete antibodies. Cytotoxic T cells can kill infected host cells.",
        "Vaccination can prepare adaptive immunity for later exposure. Developing memory takes time. It does not act as an immediate cure for an existing infection."
      ],
      nodes: ["Recognise antigen", "Activate matching lymphocytes", "Produce effectors", "Retain memory"],
      model: [
        "An antigen-presenting cell displays a fragment of the pathogen. A suitable T cell can recognise that presentation. A B cell can bind its matching antigen.",
        "In many responses, activated helper T cells support the selected B cells. The cells multiply. Ask which downstream step would be weaker if that help were lost.",
        "Some B cells become plasma cells and secrete antibodies. Antibodies can bind or tag a target. A phagocyte engulfs material, while a cytotoxic T cell can kill a suitable infected cell.",
        "Some selected B and T cells persist as memory cells. On re-exposure to a matching antigen, they can produce a faster specific response."
      ],
      guided: choice("Matching B cells recognise an antigen, but the helper T-cell signals required for this response are weak. Which downstream result would you predict?", 1,
        [["Cytotoxic T cells start making antibodies instead.", "Cytotoxic T cells and antibody-secreting plasma cells have different roles."], ["Fewer B cells may become plasma cells, so less specific antibody may be secreted.", ""], ["The antigen is converted into antibody by phagocytes.", "Phagocytes can engulf material. An antigen is the target and is not converted into antibody."]],
        "For this helper-dependent response, weaker help can reduce activation and expansion of the matching B cells and their plasma-cell descendants.", ["Locate the interrupted step, then follow the B-cell branch."]),
      apply: written("A fictional vaccine induces antigen-specific memory. A student predicts it should immediately clear an existing infection. Explain what memory can change on a later exposure and why the immediate claim is unsupported.",
        ["Memory lymphocytes support a faster antigen-specific response on re-exposure.", "B-cell descendants can become plasma cells that secrete antibody, and T-cell responses can contribute.", "The initial adaptive response and memory take time to develop. Vaccination does not by itself establish immediate clearance."],
        "Vaccination can prime a faster response on later exposure, because antigen-specific memory cells can rapidly give rise to effectors. This does not mean a newly administered vaccine immediately removes an infection.", ["Separate the time needed to establish memory from the response after memory already exists."]),
      followup: choice("Plasma cells have already released antibody. Cytotoxic T cells now fail to recognise infected cells. Which action is directly impaired?", 2,
        [["Antibody binding to its target.", "Antibodies already released can bind independently of this recognition step."], ["All engulfment by phagocytes.", "Engulfment is a different process."], ["Killing of those infected cells by cytotoxic T cells.", ""]],
        "The disrupted recognition belongs to the cytotoxic T-cell branch.")
    },
    "f171/3.2.1": {
      revision: 1,
      goal: "Distinguish weakened, misdirected and transplant-directed immunity by the mechanism and its consequences.",
      activate: ["Quick check: what can adaptive immune cells recognise?", "They can recognise specific molecular features. Immune responses are ordinarily regulated to limit damage to the person's own tissues."],
      explain: ["Immunodeficiency weakens defence. Autoimmunity damages self tissue. Allergy is an inappropriate response to a usually harmless antigen. Transplant rejection can arise when recipient immune cells recognise donor tissue as foreign."],
      model: [
        "An immune response damages a fictional donor graft. The target is the donor tissue. Immune damage to the graft can occur without a pathogen causing it.",
        "Suppressing part of the recipient's immune response may reduce rejection. The same reduction in immune activity can weaken protection against pathogens.",
        "Explain each outcome by naming the target and mechanism. Rejection and infection are distinct processes, and a patient can experience both."
      ],
      guided: choice("A fictional condition reduces functioning helper T cells and increases susceptibility to infections. Which reasoning supports immunodeficiency?", 2,
        [["The immune cells must be attacking self tissue.", "No attack on self is shown."], ["A harmless external antigen has caused allergy.", "No inappropriate response to a harmless antigen is described."], ["A weaker adaptive response reduces effective defence against pathogens.", ""]],
        "Evidence of reduced defence supports immunodeficiency. Identify what the immune response does less effectively.", ["Ask whether defence is reduced or redirected at a target."]),
      apply: written("A fictional transplant recipient has less graft inflammation while receiving an immunosuppressive medicine, but develops an infection. Explain how one effect of the medicine can account for both outcomes.",
        ["Lower immune activity can reduce immune damage to donor tissue.", "Reduced activity can also weaken the response to pathogens.", "Infection involves a pathogen; rejection involves an immune attack on donor tissue."],
        "Suppressing immune responses can protect a donor graft while weakening defence against infection. These different outcomes share a change in immune activity but have different targets.")
    },
    "f171/3.2.2": {
      goal: "Compare vaccine types by what they deliver and explain how they prepare adaptive immunity.",
      explain: ["A vaccine can deliver antigen directly, deliver instructions for cells to make an antigen, or expose the immune system to a weakened or inactivated organism. Which vaccine is suitable depends on the formulation and recipient."],
      model: ["An inactivated vaccine provides antigens in killed organisms. The organisms cannot replicate.", "An mRNA vaccine delivers instructions. Recipient cells temporarily produce an antigen, which the adaptive immune system can recognise.", "Both routes can stimulate immune memory. The delivered material differs."],
      guided: choice("Which feature distinguishes a toxoid vaccine?", 1,
        [["It provides a live toxin-producing pathogen.", "A toxoid is an altered toxin. It does not contain a live pathogen by definition."], ["It provides an inactivated toxin that retains recognisable antigenic features.", ""], ["It directly provides antibodies against a toxin.", "The vaccinated person's adaptive response produces antibodies."]],
        "An inactivated toxin can stimulate immunity to toxin features without the toxin's original harmful activity.", ["What does the word toxoid refer to?"]),
      apply: choice("A vaccine contains a bacterial polysaccharide joined to a carrier protein. What is the point of the carrier in a conjugate vaccine?", 2,
        [["It makes the bacterium replicate in the vaccinated person.", "The vaccine supplies selected material."], ["It stops all B cells recognising the polysaccharide.", "The aim is to improve the antibody response to that antigen."], ["It can recruit helper T-cell support for a stronger response to the polysaccharide.", ""]],
        "B cells that bind the polysaccharide can present carrier-protein peptides to helper T cells. This can strengthen antibody responses and memory.", ["Think about the additional adaptive response made possible by the protein."])
    },
    "f171/a5": {
      revision: 1,
      goal: "Use outcomes, group differences and uncertainty to decide what a fictional study supports about cause.",
      activate: ["Quick check: what is a confounding variable?", "A difference linked to both the group someone is in and the outcome. It can help explain a difference even if the intervention has no effect."],
      explain: ["Identify the outcome and compare the groups. Then ask how the groups were formed, what else differed and how much uncertainty remains. Random allocation helps reduce systematic differences. A modest sample or short follow-up still limits the conclusion."],
      table: study,
      focusCells: [["0:1", "1:1"], [], ["0:0", "1:0"]],
      nodes: ["Compare the outcome", "Find another explanation", "Qualify the conclusion"],
      model: [
        "The outcome is change in reported nightly sleep after four weeks. Compare both groups: 35 minutes versus 15, a difference of 20 minutes. Improvement within one group alone cannot isolate an effect.",
        "People chose whether to attend. Motivation could influence both that choice and changes in sleep routine, providing another explanation.",
        "The workshop group reported a larger gain. Self-selection prevents attributing that gain solely to the workshop. A randomised comparison under similar conditions could strengthen a causal inference. A larger sample and longer follow-up would address other limitations."
      ],
      skills: ["variables", "evidence", "graph", "rate"],
      guided: choice("In the sleep study, workshop volunteers are also more likely to change their evening routine. How does this affect the conclusion?", 2,
        [["It establishes that 20 minutes is the workshop effect.", "The observed difference combines the intervention and any effect of the group differences."], ["It makes the reported means unusable as observations.", "The means still describe what was reported. The causal interpretation is limited."], ["It gives an alternative explanation for part of the difference.", ""]],
        "A group difference that could affect the outcome limits the inference from a simple comparison of means.", ["Name the measured outcome and ask what else could have changed it."]),
      writing: {
        title: "Compare description, explanation, analysis and evaluation",
        prompt: "Two fictional groups improved on a balance test. The exercise group improved more, but its members started with higher activity levels.",
        choose: "Which answer uses the evidence to make a qualified judgement? Decide before opening the comparison.",
        responses: [
          ["Description", "The exercise group improved more."],
          ["Explanation", "Frequent exercise may improve coordination, which can help with balancing."],
          ["Analysis", "The larger observed gain could relate to the exercise or to differences in how active the groups already were."],
          ["Evaluation", "The result supports an association. A fairer comparison would allocate participants randomly and use the same test for both groups before judging a causal effect."]
        ],
        compare: ["Analysis uses the group difference to identify a competing explanation. The evaluation makes a qualified judgement and names an improvement that addresses that specific limitation."]
      },
      apply: {
        ...written("Evaluate the claim that the new walking aid alone caused the larger improvement. Use both rows and explain how you would strengthen the study.",
          ["The new-aid group improved by 16 m, compared with 9 m, a 7 m observed difference.", "The new-aid group had more supervised practice, which could also affect walking distance.", "Keep practice comparable or use a design that separates the two factors. A larger and longer study can address precision or durability."],
          "The new-aid group gained 7 m more on average. Extra practice could explain some of this difference, so the observed improvement does not isolate the aid's effect. Compare the aids with matched practice and assess uncertainty over longer follow-up.", ["What differed between the groups apart from the aid?"]),
        table: {caption: "Fictional walking-aid study after four weeks", head: ["Group", "People", "Practice per week", "Mean gain"], rows: [["New aid", "18", "3 sessions", "16 m"], ["Usual aid", "18", "1 session", "9 m"]] }
      },
      followup: choice("A randomised study in 40 people reports a small average benefit after four weeks. What can it say about rare harms after a year?", 0,
        [["The study gives limited evidence on rare long-term harms.", ""], ["Random allocation rules out further harms.", "Random allocation does not extend follow-up or make rare events common."], ["Short-term benefit proves safety for a year.", "Effectiveness and safety are different outcomes."]],
        "Rare and late effects require enough participants and follow-up time to be detected.")
    }
  });

  const lessons = window.KeystoneHumanLessons;
  lessons["f171/a2"] = lessons["f171/2.1"];
  lessons["f171/a4"] = lessons["f171/4.2.2"];
})();

// Each comparison has its own stable catch-up route and saved written response.
(function () {
  const {choice, written} = window.KeystoneHumanTeaching;
  function comparison(id, title, normal, changes, impact, model, check, transfer, criteria, answer) {
    const options = [[check[1], check[3]], [check[2], ""]];
    const correct = ["aorta", "digestive", "oxygen"].includes(id) ? 0 : 1;
    if (correct === 0) options.reverse();
    window.KeystoneHumanLessons["f171/1.2.1." + id] = {
      title, revision: 1, goal: title + " — trace the change from structure to daily function.",
      explain: [normal, ...changes, impact],
      modelTitle: "Reason from the evidence", model,
      guided: choice(check[0], correct, options, check[4], [normal]),
      apply: written(transfer, criteria, answer)
    };
  }
  comparison("movement", "Motor neurone disease and Parkinson’s disease",
    "Brain circuits help initiate and scale movement. Motor neurones carry signals that activate voluntary muscles.",
    ["In motor neurone disease (MND), motor neurones progressively stop working. Fewer effective signals reach the muscles. Weakness and muscle wasting can affect grip, swallowing, speech or breathing.",
     "In Parkinson’s disease, loss of dopamine-producing cells disrupts circuits that coordinate movement. Slowness and stiffness can make starting a movement difficult. A resting tremor may be visible."],
    "Someone may need extra time to dress, adapted equipment or help with meals. Progressive changes can alter a family’s caring responsibilities and demand for therapy services.",
    ["A person can hold a cup firmly once they reach it but takes a long time to start reaching. That observation concerns movement initiation.",
     "In contrast, a declining measured grip force is evidence of weakness. Ask what function changed before suggesting a mechanism. Neither finding identifies a disease on its own."],
    ["Which change most directly explains muscle wasting in MND?", "Difficulty initiating movement alone", "Loss of signals from motor neurones", "Slow initiation and loss of muscle activation are different problems.", "Trace the last part of the pathway to the muscle."],
    "A person with MND understands a conversation but their speech becomes less clear and swallowing takes longer. Explain the link and one possible consequence for family life.",
    ["Link impaired motor signals to weaker or less coordinated muscle action.", "Apply the link to speech or swallowing.", "Give a specific consequence without assuming loss of understanding."],
    "Loss of motor signals can weaken muscles used to articulate words and swallow. Meals may take longer and relatives may need to allow more time for communication. Unclear speech alone gives no evidence of impaired understanding.");
  comparison("aorta", "Abdominal aortic aneurysm and hypertension",
    "The aorta carries blood from the left ventricle. Its elastic wall stretches under pressure and recoils between beats.",
    ["An abdominal aortic aneurysm is a local widening of a weakened section of the aortic wall. It often causes no symptoms. Rupture can cause severe pain and rapid internal blood loss.",
     "Hypertension is persistently raised arterial blood pressure. It usually has no symptoms. Over time it increases strain on the heart and risk of damage to vessels and organs. Higher body mass can increase risk, but it cannot establish someone’s blood pressure."],
    "Monitoring an aneurysm can require repeat scans and time away from work. Hypertension may require long-term monitoring even when a person feels well. Complications can increase family and health-service support needs.",
    ["A fictional scan shows a local widening of the abdominal aorta. This is evidence about diameter.",
     "A pressure cuff measures arterial pressure. Repeated readings under comparable conditions address persistent pressure; they do not measure the width of the aorta."],
    ["Which result directly describes an aneurysm?", "One high cuff reading", "A scan showing local aortic dilation", "A pressure reading does not show vessel shape.", "Identify the quantity measured."],
    "Two scans show a local abdominal aortic widening increasing from 3.4 to 4.1 cm. A pupil says this proves the person’s blood pressure rose. Evaluate the claim and explain one possible consequence if the wall ruptures.",
    ["Compare the same structural measurement.", "Separate diameter from pressure.", "Link rupture to internal blood loss and reduced organ perfusion."],
    "Diameter increased by 0.7 cm. Neither scan measured arterial pressure. If the wall ruptures, blood can leave the circulation rapidly, reducing blood flow to organs.");
  comparison("airways", "Asthma and COPD",
    "Air flows through bronchioles to alveoli. Thin alveolar walls provide a large surface for diffusion.",
    ["Asthma involves inflamed, sensitive airways. Muscle tightening and mucus can narrow their openings, causing episodes of wheeze, cough or chest tightness. Air pollution can trigger symptoms in some people.",
     "COPD produces persistent airflow obstruction. In emphysema, loss of alveolar walls also reduces surface area and elastic recoil. Smoking is a major risk factor; a smoking history alone cannot diagnose COPD."],
    "Both conditions can limit activity. Fluctuating symptoms may interrupt school or sport; persistent breathlessness may increase the need for help with shopping. Flare-ups can require healthcare.",
    ["A narrower airway offers greater resistance. At the same driving pressure less air moves through it.",
     "Reopening that airway can improve ventilation. It cannot replace destroyed alveolar walls."],
    ["Which change directly reduces diffusion area?", "Contraction of airway muscle", "Loss of alveolar walls", "Airway muscle chiefly changes airway diameter.", "Distinguish the air passages from the exchange surface."],
    "Two people report breathlessness on stairs. One has variable airway narrowing. The other has evidence of lost alveolar walls. Explain how the same symptom could arise by different routes.",
    ["Explain reduced airflow in narrowed airways.", "Explain reduced exchange area.", "Distinguish the reported symptom from evidence of structure."],
    "Narrowed airways resist airflow, making ventilation more difficult. Lost alveolar walls leave less surface for gas exchange. Breathlessness is a symptom shared by both; it cannot locate the affected structure.");
  comparison("digestive", "Crohn’s disease and hiatus hernia",
    "The small intestine absorbs nutrients through its lining. At the stomach entrance a barrier normally limits reflux into the oesophagus.",
    ["Crohn’s disease causes inflammation in parts of the digestive tract. Inflamed bowel can cause diarrhoea, pain and fatigue. If enough absorptive intestine is affected, nutrient uptake may fall and weight loss may follow.",
     "In a sliding hiatus hernia the upper stomach and its junction with the oesophagus move through the diaphragm. Reflux can cause heartburn or a sour taste. Some hernias cause no symptoms."],
    "Urgent bowel movements may interrupt travel or work. Families may adjust meals or journeys, and flare-ups may require treatment and time away from school.",
    ["After a meal someone reports burning behind the breastbone. Backflow can expose the oesophageal lining to acidic stomach contents.",
     "That mechanism does not explain every digestive symptom. For weight loss, consider intake and absorption separately."],
    ["Which change directly impairs nutrient uptake?", "Displacement of the stomach junction alone", "Inflammation of absorptive small intestine", "Displacement primarily affects the reflux barrier.", "Locate where nutrients normally enter the body."],
    "A fictional patient’s food intake is stable, but extensive small-intestinal inflammation accompanies weight loss. Explain one plausible mechanism and why this evidence alone cannot name the disease.",
    ["Link the inflamed lining to reduced absorption.", "Connect nutrient availability to weight.", "Recognise that other causes are possible."],
    "Inflammation can impair absorption, so less nutrient enters the body despite similar intake. That could contribute to weight loss. The findings are compatible with Crohn’s disease but do not uniquely identify it.");
  comparison("renal", "Nephritis and polycystic kidney disease",
    "Glomeruli filter water and small solutes from blood. Healthy filtration barriers retain blood cells and most large proteins.",
    ["Nephritis means kidney inflammation. In glomerulonephritis the inflamed filters may leak blood cells or protein into urine. Reduced filtration and salt and water retention can contribute to swelling.",
     "In polycystic kidney disease, enlarging fluid-filled cysts can damage functioning tissue. Blood pressure may rise and clearance of waste may decline. Pain or blood in urine can occur."],
    "Swelling or fatigue can restrict daily activities. Appointments and, in advanced disease, kidney replacement therapy can affect family routines and demand on services.",
    ["Protein in urine suggests a problem retaining protein, but does not show the shape of the kidney.",
     "A scan can reveal cysts. To assess function, consider evidence about waste clearance as well as structure."],
    ["Which finding directly shows a structural change in PKD?", "Fatigue", "Multiple fluid-filled cysts on imaging", "Fatigue has several possible causes.", "Separate a reported experience from a scan finding."],
    "One report describes inflamed glomeruli and protein in urine. Another shows enlarging cysts and falling waste clearance. Explain the different routes to altered function.",
    ["Relate glomerular inflammation to leakage.", "Relate cyst enlargement to loss of functioning tissue.", "Distinguish leakage from clearance."],
    "Damaged glomerular barriers can let protein enter urine. Enlarging cysts can damage working kidney tissue, reducing its capacity to remove waste. These results describe different aspects of kidney function.");
  comparison("oxygen", "Cystic fibrosis, sickle cell anaemia and iron-deficiency anaemia",
    "Oxygen must reach the alveoli, bind to haemoglobin in red cells and be carried through vessels to tissues.",
    ["Inherited CFTR variants in cystic fibrosis can produce thick secretions. Mucus can obstruct airways and impair clearance, contributing to cough and recurrent chest infections. Blocked pancreatic ducts may reduce delivery of digestive enzymes.",
     "In sickle cell disease an inherited haemoglobin variant can make red cells rigid and sickle-shaped. Cells may break down early, causing anaemia, and can obstruct small vessels, causing painful episodes.",
     "In iron-deficiency anaemia too little available iron limits haemoglobin production. Blood then carries less oxygen per unit volume; fatigue, breathlessness and pallor may occur."],
    "Fatigue may restrict exercise. Repeated respiratory treatment or unpredictable pain may disrupt education, employment and family plans, with differing needs for healthcare.",
    ["Trace the route backwards from a muscle. A blocked small vessel limits blood reaching it even if air reaches the lungs.",
     "With low haemoglobin, each volume of blood can carry less oxygen even with open vessels. Airway obstruction affects a different stage."],
    ["Which consequence most directly follows low available iron?", "Mucus blocks pancreatic ducts", "Less haemoglobin can be made", "Mucus obstruction is associated with cystic fibrosis.", "Identify the oxygen-carrying protein."],
    "One patient has normal air entry, low iron stores and low haemoglobin. Another has sickle cell disease, anaemia and episodes of local pain. Explain the shared limitation and the extra mechanism in the second case.",
    ["Identify reduced oxygen-carrying capacity in anaemia.", "Explain the role of iron in haemoglobin formation.", "Link sickling to impaired local blood flow."],
    "Both may carry less oxygen per volume of blood. Low iron limits haemoglobin synthesis in the first case. In the second, red cells can break down early and rigid cells can obstruct small vessels, reducing oxygen delivery locally and causing pain.");
  comparison("tissues", "Multiple sclerosis, rheumatoid arthritis, melanoma and rickets",
    "Nerves transmit signals, joints permit movement, pigment cells produce melanin and growing bones need mineral for strength.",
    ["In multiple sclerosis, immune-mediated damage to myelin in the central nervous system disrupts nerve conduction. Weakness, visual difficulties or fatigue can vary over time. In rheumatoid arthritis, the immune system mistakenly attacks joint tissues. The resulting inflammation affects joints, causing swelling, pain and stiffness.",
     "Melanoma develops when melanocytes grow uncontrollably and may spread. A changing pigmented lesion is an observable sign needing assessment, not a diagnosis. Vitamin D deficiency can reduce calcium absorption. In rickets, poor mineralisation weakens growing bones, sometimes causing bowed legs, bone pain or difficulty walking."],
    "Walking difficulties can have nervous, joint or bone causes. School access, transport, family support and treatment needs depend on the particular functional limitation.",
    ["A clinician observes swollen finger joints. The patient reports pain when gripping a handle. Swelling is a sign; pain is a symptom.",
     "Inflammation can restrict joint movement. This differs from disrupted nerve signalling or reduced bone strength."],
    ["Which observation is a sign?", "Reported joint pain", "Visible joint swelling", "Pain is experienced and reported by the person.", "Ask how the information was obtained."],
    "Two pupils say walking is tiring. One has evidence of poor bone mineralisation, the other of disrupted central nerve conduction. Explain why the same daily difficulty does not identify the same disorder.",
    ["Link mineralisation to bone strength.", "Link nerve conduction to movement control.", "Use the limits of the symptom evidence."],
    "Weak growing bones can deform under load, making walking difficult. Disrupted nerve conduction can instead impair control of movement. Feeling tired when walking cannot distinguish these mechanisms.");
  window.KeystoneHumanLessons["f171/1.2.1.aorta"].apply.illustration = {
    src: "/human-biology/aorta-comparison.svg",
    alt: "Two longitudinal views of the abdominal aorta above its iliac branches. The line across the local widening measures 3.4 cm at visit one and 4.1 cm at visit two. Schematic, not to scale."
  };
})();

// F171 1.3.1–1.3.2. Each pair compares evidence as well as pathogen group.
(function () {
  const {choice, written} = window.KeystoneHumanTeaching;
  function add(key, lesson) {
    window.KeystoneHumanLessons["f171/1.3.1." + key] = {revision: 1, ...lesson};
  }
  add("viruses", {
    title: "COVID-19 and HIV: which evidence matters?", practice: "f171-route-prevention-transfer",
    goal: "Use the route of exposure to explain prevention, and distinguish HIV infection from AIDS.",
    explain: [
      "A virus is a type of pathogen. Different viruses can reach the body by different routes. COVID-19 is caused by SARS-CoV-2. HIV is the virus that can cause AIDS, an advanced stage of HIV infection involving severe damage to immune defences.",
      "A sign can be observed or measured, such as a raised temperature. A symptom is experienced and reported, such as loss of smell or fatigue. Either can prompt assessment. They are quick to collect and can guide further assessment. Overlap between infections, and infection without symptoms, limit what they can establish."
    ],
    compare: {caption:"Two viral infections",head:["Infection","Prevention and evidence"],rows:[
      ["COVID-19","Infectious respiratory particles can be breathed in. Ventilation reduces the amount in shared indoor air. Cough, fever and altered smell can occur; other infections can cause overlapping findings."],
      ["HIV","Certain body fluids can transmit HIV during sex, through blood exposure or from parent to child during pregnancy, birth or breastfeeding. During sexual exposure, the genital lining is one possible portal of entry. Condoms and screened blood products address sexual and blood exposure respectively. HIV care during pregnancy and birth reduces transmission to the baby. Ordinary social contact and saliva do not transmit HIV."],
      ["HIV over time","Early HIV may cause measured fever or swollen lymph nodes and reported tiredness or sore throat. There can also be no obvious illness. With advanced untreated infection, opportunistic infections can occur. Effective treatment protects immune function. A person maintaining an undetectable viral load does not pass HIV on through sex."]
    ]},
    prior:["f171/3.2.1","Revisit immune dysfunction"],
    model:["A school records three pupils who feel tired and have measured fevers. Fatigue is a symptom; the thermometer readings are signs.",
      "These findings justify attention but cannot distinguish COVID-19 from other causes. Appropriate testing provides different evidence from counting people with fever.",
      "Suppose the review now concerns safety of donated blood. Screening donations can reduce blood-borne infection risk. It cannot change the air shared in a classroom. Check which exposure a measure actually changes."],
    guided:choice("A patient feels hot but has no temperature reading. What has been recorded?",0,
      [["A reported symptom.",""],["A measured sign of fever.","Feeling hot and recording a temperature are different observations."]],"Use how the information was obtained.",["Who made a measurement?"]),
    apply:written("A fictional survey labels everyone with confirmed HIV infection as having AIDS. Some report no symptoms. Explain two problems with using symptoms or HIV status this way.",
      ["HIV infection can be present without symptoms.","AIDS refers to advanced HIV disease; a positive HIV result alone does not establish this stage."],
      "Absence of symptoms does not rule out HIV. A confirmed positive result establishes infection, but classifying AIDS requires evidence of advanced immune damage or an AIDS-defining illness.")
  });
  add("bacteria", {
    title:"Lyme disease, MRSA and TB: three bacterial examples", practice:"p-f171-tb-transmission",
    goal:"Distinguish the cause from its carrier, and a positive screen from evidence of disease.",
    explain:["A bacterium can cause disease; a vector carries a pathogen between hosts. The tick in Lyme disease is the vector. The bacterium it carries is the cause. The route describes how exposure occurs. The portal is where the organism enters: for example, a break in the skin or the respiratory tract. Hand hygiene interrupts contact transmission."],
    compare:{caption:"Bacterial causes with different routes",head:["Example","Route and prevention","Findings"],rows:[
      ["Lyme disease","An infected tick can transmit Borrelia bacteria through a bite. Cover exposed skin and check for ticks after outdoor activity.","An expanding rash can be a distinctive visible sign. Fatigue or headache may be reported. Some people never notice a rash."],
      ["MRSA","Methicillin-resistant Staphylococcus aureus can spread by contact. Clean hands and covered wounds reduce risk. Intact skin may carry the bacteria harmlessly.","An infected wound may be swollen or discharge pus; it may feel painful. Appearance alone cannot show antibiotic resistance."],
      ["Pulmonary TB","Infectious particles can be inhaled from a person with active infectious pulmonary TB. Ventilation and effective case treatment help reduce spread.","A prolonged cough, night sweats or measured weight loss can prompt assessment. These findings have other possible causes. Latent TB infection does not spread to others."]
    ]},
    model:["A tick is seen attached to skin. That establishes a possible exposure. It does not show that the tick carried the Lyme bacterium.",
      "A characteristic expanding rash can support a clinical diagnosis of Lyme disease. A tired person after a walk, without this evidence, gives a much weaker basis for that conclusion."],
    guided:choice("Two pupils in the same classroom have a persistent cough. Does this identify the cause as TB?",1,
      [["Yes. Airborne spread is unique to TB.","Several infections spread through shared air, and cough has many possible causes."],["No. An improvement in cough does not identify a bacterium.",""]],"Separate the observation from a conclusion about its cause."),
    apply:choice("Patient A has MRSA on a routine skin screen and feels well. Patient B has a painful wound with visible pus but no organism result. Which conclusion fits both records?",2,
      [["Both have active MRSA disease.","Carriage is possible without illness. Pus alone cannot identify a resistant strain."],["Only B has confirmed MRSA.","The wound findings support infection but do not identify its cause."],["A may be colonised. B has findings compatible with wound infection; its cause remains uncertain.",""]],
      "The screen establishes carriage at the sampled site. Pain is reported and pus is observed. Neither tells us the organism or its antibiotic susceptibility.")
  });
  add("fungi", {
    title:"Vaginal thrush and histoplasmosis: two fungal diseases", practice:"f171-infection-group-transfer",
    goal:"Explain how different sources of fungi change the interpretation of an exposure history.",
    explain:["Fungi include yeasts. An infection can follow overgrowth of organisms already present in the body. In other cases a person encounters a fungus in the environment."],
    compare:{caption:"Source and findings",head:["Example","What happens","Evidence and prevention"],rows:[
      ["Vaginal candidiasis (thrush)","Candida yeast already present can overgrow. It is not usually acquired through sex.","Itching and soreness may be reported; white discharge may be observed. Microscopy showing yeast can support the interpretation alongside these findings. Candida can also be present without illness. Breathable clothing can help reduce the risk of vaginal thrush. A precaution against environmental dust addresses a different source."],
      ["Histoplasmosis","Histoplasma spores from the environment can be inhaled. Ordinary contact with a patient is not the usual route.","Many infections cause no symptoms. Lung illness may include cough, measured fever and chest discomfort. Public-health precautions against relevant environmental dust exposure address this route."]
    ]},
    model:["Several people report chest discomfort. That symptom does not identify a fungus. A shared environmental exposure can guide further investigation.",
      "A separate person reports vaginal itching. A different site and possible Candida overgrowth require a different explanation; sharing a pathogen group does not imply a shared route."],
    guided:choice("Which is a reported symptom in the thrush example?",0,[["Vaginal soreness.",""],["Discharge seen during examination.","This describes an observation made during examination."]],"Distinguish what is felt from what is seen."),
    apply:written("Two people with histoplasmosis attended the same outdoor event but did not meet. A pupil argues that one must have infected the other because both illnesses were fungal. Evaluate this argument and explain why vaginal thrush is a poor analogy.",
      ["A shared environmental exposure is possible.","The cases alone do not prove who infected whom or the source.","Vaginal candidiasis can result from overgrowth of resident yeast."],
      "Both could independently have inhaled the fungus from the environment. Attendance is a clue, not proof of the source. Candida can overgrow in the body. Neither fungal classification nor timing establishes person-to-person spread.")
  });
  add("protozoa", {
    title:"Malaria and toxoplasmosis: interpreting exposure and blood evidence", practice:"p-f171-malaria-anaemia",
    goal:"Separate a vector from a protozoan pathogen and explain what a microscopic finding adds.",
    explain:["Protozoans are single-celled parasites. A mosquito transmits the malaria parasite; the mosquito itself is not the cause of malaria. Toxoplasmosis shows why a mosquito-control measure cannot prevent all protozoan infections."],
    compare:{caption:"Contrasting protozoan infections",head:["Example","Route and prevention","Possible findings"],rows:[
      ["Malaria","Infected mosquitoes transmit Plasmodium through bites. Bite avoidance, including suitable nets, addresses the vector.","Fever and chills are possible. Red-cell loss can cause anaemia and fatigue. A laboratory can examine a blood film for malaria parasites."],
      ["Toxoplasmosis","Toxoplasma can be acquired through undercooked infected meat or accidentally ingesting material contaminated by infected cat faeces. Cook meat thoroughly and wash hands after handling soil. A new infection during pregnancy can cross the placenta.","Often there are no symptoms. Swollen lymph nodes can be observed; aches and tiredness may be reported. Contact with a cat does not itself establish infection."]
    ]},
    model:["A measured fever and reported chills after travel are compatible with malaria but overlap with other illnesses.",
      "A laboratory report identifying malaria parasites in blood is direct evidence of the organism. It does not establish exactly when or where a bite occurred."],
    guided:choice("Why can malaria reduce oxygen delivery even if air reaches the lungs normally?",1,
      [["Mosquito bites usually obstruct the airways.","Look at the blood's oxygen-carrying capacity."],["Loss of red cells can reduce the haemoglobin available.",""]],"Link the change in blood to oxygen transport."),
    apply:written("Two patients report fatigue after a trip. A trained microscopist identifies Plasmodium in A’s blood film. B has swollen lymph nodes but no pathogen result. Which conclusion is supported for A, and can B be labelled as having toxoplasmosis?",
      ["The blood film gives organism-specific evidence for malaria in A.","Enlarged nodes and fatigue can occur with several illnesses.","A shared trip does not establish the same exposure or a particular cause in B."],
      "Identified Plasmodium supports malaria in A. In B, the observed nodes and reported fatigue could occur in toxoplasmosis but are nonspecific. The shared trip cannot settle B’s diagnosis.")
  });
  add("worms", {
    title:"Fasciolosis and hydatid disease: following the route to prevention", practice:"f171-infection-group-transfer",
    goal:"Link an exposure to ingestion and explain why liver symptoms alone do not identify a parasite.",
    explain:["Flukes, tapeworms and roundworms are helminths: multicellular parasitic worms. Fasciolosis and hydatid disease are caused by different flatworms. Ectoparasites live on the outside of a host; a tick can also act as a vector. Mites can also be ectoparasites. In the two worm examples below, the portal of entry is the gastrointestinal tract."],
    compare:{caption:"Two parasites, two preventive decisions",head:["Example","Exposure and prevention","Possible findings"],rows:[
      ["Fasciolosis (fascioliasis)","People can acquire liver fluke infection by eating contaminated raw freshwater plants. Avoid eating uncooked aquatic plants from unsafe sources.","Fever or liver enlargement may be observed. Abdominal pain and nausea may be reported. Some people have few symptoms."],
      ["Hydatid disease","People can accidentally swallow Echinococcus tapeworm eggs from dog faecal contamination of hands, food or water. Hand hygiene, veterinary control and safe food and water reduce risk.","Cysts can grow slowly in organs such as the liver or lungs. A scan may show a cyst; pain or chest discomfort may develop. A cyst alone does not identify a tapeworm."]
    ]},
    model:["A fictional liver scan shows a cyst. It provides structural evidence but cannot, from that description alone, identify the organism.",
      "The person's work with dogs may make an exposure plausible. Ask whether ingestion was possible before drawing a conclusion from occupation."],
    guided:choice("Which is a sign rather than a symptom?",0,[["An enlarged liver recorded during examination.",""],["A feeling of nausea.","Nausea is experienced and reported by the person."]],"Identify what was observed."),
    apply:choice("A farm already provides safe drinking water. Workers clean dog pens before lunch. Which added measure most directly addresses the hydatid exposure described?",1,
      [["Give mosquito nets to all workers.","Nets address a biting vector. The described exposure concerns accidental ingestion."],["Provide handwashing facilities and time to wash before eating.",""],["Screen every worker with abdominal pain and stop there.","Assessment may investigate illness, but it does not interrupt exposure."]],
      "Eggs from faecal contamination can reach the mouth from hands. Washing before eating interrupts that route even where the water supply is safe.")
  });
  const chapters = window.KeystoneHumanLessons;
  chapters["f171/1.3.1.protozoa"].apply.illustration = {
    src: "/human-biology/protozoan-evidence.svg",
    alt: "Record A includes a blood film with Plasmodium identified by a microscopist. Record B has enlarged lymph nodes and reported fatigue, with no organism test result."
  };
  chapters["f171/1.3.1.bacteria"].apply.illustration = {
    src: "/human-biology/mrsa-evidence.svg",
    alt: "A has intact skin, a positive MRSA screen and feels well. B has pus at a wound and reports pain. B has no organism result."
  };
})();

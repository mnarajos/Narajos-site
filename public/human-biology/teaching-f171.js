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
          "The comparable weeks show similar recorded values. The lower week 2 values were recorded under different conditions, so the record does not establish a steady decline. Flag the missing week 3 value and take standardised readings with checked equipment."),
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
          "The new-aid group gained 7 m more on average. Extra practice could explain some of this difference, so the observed improvement does not isolate the aid's effect. Compare the aids with matched practice and assess uncertainty over longer follow-up."),
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

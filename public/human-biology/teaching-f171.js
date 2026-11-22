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
      goal: "Use evidence about a fictional fracture to justify a treatment choice and explain its mechanism.",
      activate: ["What does stable mean in this example?", "The bone fragments remain in an acceptable position during ordinary management. A fracture that cannot stay aligned may need a different method of stabilisation."],
      explain: [
        "A cast limits movement and can help maintain alignment while bone tissue repairs itself. Surgical fixation can hold fragments that are difficult to keep aligned, but involves risks such as infection and complications from the procedure.",
        "Choose the mechanism and trade-offs that fit the case. These examples are for study."
      ],
      modelTitle: "Compare immobilisation with surgical fixation",
      nodes: ["Define the problem", "Compare the mechanisms", "Make a qualified judgement"],
      model: [
        "A fictional patient has a stable wrist fracture with fragments in an acceptable position. The immediate goal is to protect that alignment.",
        "A cast restricts movement externally. Fixation can stabilise the fragments internally but adds an invasive procedure and recovery.",
        "If a cast can maintain this alignment, immobilisation is a reasonable option in this case. The living tissue repairs the bone."
      ],
      guided: choice("After the fragments are realigned, repeat images show that a cast cannot hold them in position. What best supports considering fixation?", 2,
        [["Surgery eliminates all risk of infection.", "Fixation adds risks including infection. Compare its possible benefit with those risks."], ["A cast never supports bone healing.", "A cast can protect alignment when it holds the fracture adequately."], ["Fixation can maintain alignment where external immobilisation has failed.", ""]],
        "The new evidence changes the balance of benefits and risks. Under these conditions, internal stabilisation may address the problem that the cast could not.", ["Identify the problem that the cast failed to solve.", "Compare how each treatment keeps fragments aligned."]),
      apply: written("A fictional cancer has spread to several organs. Explain one reason a suitable systemic drug might be chosen and one limitation compared with treating a local site.",
        ["A systemic treatment can reach cells at multiple sites via the circulation.", "It must act on cells that are susceptible to it.", "It may also affect healthy tissues and cause adverse effects."],
        "A systemic drug can reach disease at several sites that one local operation would not remove. Its suitability still depends on tumour sensitivity and likely adverse effects.", ["Compare the location of the disease with the reach of each treatment."]),
      followup: choice("Surgery removes a local mass that is pressing on a nerve. Which is a supported conclusion?", 1,
        [["It proves the disease has been cured everywhere.", "Relieving pressure at one site gives no evidence about disease elsewhere."], ["It may relieve the local pressure by removing the mass.", ""], ["It works mainly by delivering medication through the circulation.", "The causal change here is physical removal."]],
        "Describe the benefit shown by the mechanism and keep the conclusion within the evidence.")
    },
    "f171/2.3": {
      goal: "Distinguish prevention, screening, diagnostic follow-up and monitoring by their purpose.",
      explain: ["Prevention reduces risk. Screening estimates risk in an apparently well population. Diagnostic follow-up investigates whether disease is present. Monitoring follows a known condition over time."],
      prior: ["f171/4.2.1", "Work through a screening results table"],
      model: ["A fictional programme supports physical activity to reduce disease risk. Its aim is prevention.", "The same programme invites apparently well people to a test. That is screening. A result above the threshold leads to diagnostic follow-up.", "After a diagnosis, repeat visits track change. The same measurement may be used for a different purpose."],
      guided: choice("An apparently well person receives an invitation for a routine test based on age. What is the immediate purpose?", 0,
        [["Screening.", ""], ["Confirming an existing diagnosis.", "The invitation identifies people who may benefit from further assessment."], ["Monitoring known disease.", "No established condition is given."]],
        "The test is offered as screening because the person has no known condition or symptoms in the scenario.", ["Ask what is already known about the condition."]),
      apply: choice("A clinic tracks lung function after a condition has already been diagnosed. Which purpose fits?", 2,
        [["Prevention of the initial condition.", "The condition is already established."], ["Population screening.", "The group is defined by a diagnosis rather than a screening population."], ["Monitoring.", ""]],
        "The aim is to observe change in an existing condition over time.")
    },
    "f171/4.2.1": {
      goal: "Use both the screen and the diagnostic assessment to classify results.",
      explain: ["Positive and negative refer to what the screen reports. True and false describe how that result compares with whether the condition is present."],
      table: screening,
      nodes: ["Read the row", "Read the column", "Join both pieces of evidence"],
      model: [
        "Find the positive row. Thirty people had a positive screen: 18 plus 12.",
        "Within that row, the condition-present column gives 18 true positives. The condition-absent column gives 12 false positives.",
        "A positive screen prompts follow-up. In this fictional group, 12 of the 30 positive results were false positives."
      ],
      guided: choice("Use the same results. How many people had a false negative?", 1,
        [["12", "Those people had a positive screen and no condition."], ["2", ""], ["68", "Those people had a negative screen and no condition, so they are true negatives."]],
        "Find the negative row and the condition-present column. Two people who had the condition screened negative.", ["Start with the screen result.", "Now find the group where that result disagrees with their condition."], { table: screening }),
      apply: choice("In a new programme, 9 people with the condition screen negative and 41 people without it screen negative. How many negative screens missed the condition?", 0,
        [["9 out of 50.", ""], ["9 out of 41.", "The denominator must include everybody with a negative screen."], ["41 out of 50.", "Those 41 correctly screened negative."]],
        "The negative-screen group contains 9 + 41 = 50 people. Nine had the condition, so nine were missed.", ["Decide which group belongs in the denominator."]),
      followup: choice("A screen is positive for 25 people. Diagnostic follow-up finds that 7 of them have the condition. How many false positives were there?", 2,
        [["7", "Those seven are true positives."], ["25", "Separate the true positives from all positive screens."], ["18", ""]],
        "25 − 7 = 18 positive results in people without the condition.")
    },
    "f171/4.2.2": {
      goal: "Decide what repeated measurements support by comparing the readings and their conditions.",
      activate: ["What is repeatability?", "Similar values when the same method is repeated under the same conditions. Accuracy concerns closeness to the true value."],
      explain: ["Closely grouped readings can still be systematically offset. A missing reading is unknown. Check how each measurement was taken before interpreting a trend."],
      table: readings,
      model: [
        "Visit 1 readings cluster near 135 mmHg. Visit 2 readings cluster near 146 mmHg, so readings within each visit are similar.",
        "The person rested before visit 1 and had just walked before visit 2. The two sets do not isolate a change in resting pressure.",
        "Visit 3 is closer to visit 1, under more comparable conditions. Record the third reading as missing and base any mean on the two observed values."
      ],
      skills: ["averages", "graph"],
      guided: choice("A cuff reads 8 mmHg high each time compared with a trusted reference. Repeated measurements are close together. What does that show?", 0,
        [["Good repeatability with a systematic accuracy problem.", ""], ["Good accuracy because the values are close together.", "Closely grouped readings only show agreement with one another."], ["No repeatability because there is an offset.", "The constant offset can occur even when the instrument is repeatable."]],
        "Repeating the same method can reduce the influence of random variation on the mean. The shared offset remains.", ["Compare agreement among the readings with agreement against the reference."]),
      apply: written("In a fictional peak-flow record, readings fall for one visit after the person is given a different mouthpiece and less practice. Explain what can be concluded and what comparison would help.",
        ["Readings were lower at the visit.", "The change in conditions gives an alternative explanation to lower underlying lung function.", "Use repeat readings with the same equipment and procedure before drawing a stronger conclusion."],
        "The single visit shows lower recorded peak flow. Standardised repeat readings would help determine whether the pattern persists under comparable conditions.", ["Separate the observed readings from any inference about physiology."]),
      followup: choice("A third measurement was never recorded. Which summary is valid?", 1,
        [["Enter zero and calculate a mean of three.", "Zero is a measurement and would bias the mean."], ["Report a mean of the two observed values and flag the missing reading.", ""], ["Assume the missing result was the same as the second.", "The pattern of the other readings does not establish the missing value."]],
        "Use the values actually measured, and report what information is missing.")
    },
    "f171/a3": {
      goal: "Trace an adaptive immune response and use it to explain faster responses after repeat exposure.",
      activate: ["What is an antigen?", "A structure the immune system can recognise specifically. An antibody is a protein that can bind a particular antigen."],
      explain: [
        "Innate defences act rapidly and recognise broad features. Adaptive immunity selects particular lymphocytes. B cells can become antibody-secreting plasma cells. Helper T cells coordinate responses and cytotoxic T cells can kill infected cells."
      ],
      nodes: ["Antigen recognition", "Lymphocyte activation", "Response", "Memory"],
      model: [
        "Antigen-presenting cells display fragments of a pathogen to suitable T cells.",
        "With activation signals, selected lymphocytes multiply. Helper T cells support activation of appropriate B cells in many responses.",
        "Plasma cells secrete antibodies. Activated cytotoxic T cells can recognise and kill appropriate infected cells.",
        "Some activated lymphocytes form memory cells. Later exposure to the same antigen usually produces a faster adaptive response."
      ],
      guided: choice("A response contains many plasma cells. What do they release?", 1,
        [["The antigen they originally recognised.", "The antigen is the recognised target."], ["Antibodies specific to the antigen.", ""], ["Cytotoxic T cells.", "Plasma cells are differentiated B cells."]],
        "Plasma cells secrete antibodies. Antibodies bind particular molecular features on an antigen.", ["Which product of B cells binds an antigen?"]),
      apply: written("Explain how immune memory could make a response to a second exposure to the same antigen faster.",
        ["Memory cells were produced during the first response.", "Cells specific to that antigen can activate and multiply more rapidly.", "Effector cells or antibodies are produced sooner."],
        "Antigen-specific memory cells persist after the first response. They respond more rapidly on re-exposure, so immune effectors can act sooner.", ["Name a cell population that lasts after the first response."])
    },
    "f171/3.2.1": {
      goal: "Use the target of an immune response to explain immunodeficiency, autoimmunity and allergy.",
      explain: ["Immunodeficiency weakens part of immune defence. Autoimmunity targets the person's own tissues. Allergy is an inappropriate response to an otherwise typically harmless substance."],
      model: ["A fictional condition lowers the number of functioning helper T cells.", "This can impair the adaptive responses they coordinate. Greater susceptibility to infection fits immunodeficiency."],
      guided: choice("A person's immune response attacks their own insulin-producing cells. Which term fits?", 2,
        [["Allergy.", "The target is the person's own cells, rather than a usually harmless external substance."], ["Immunodeficiency.", "The response is misdirected and damages its own tissues."], ["Autoimmunity.", ""]],
        "Use the target to classify the process. In autoimmunity, the target belongs to the body.", ["Identify whether the target is self or external."]),
      apply: choice("Exposure to a harmless pollen protein triggers an inappropriate immune response. Which term fits?", 0,
        [["Allergy.", ""], ["Immunodeficiency.", "The description shows a triggered response rather than deficient defence."], ["Autoimmunity.", "The target is an external protein."]],
        "An inappropriate response to an ordinarily harmless environmental antigen fits allergy.")
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
      goal: "Separate what a study observed from what its design lets you conclude about cause.",
      activate: ["What is a confounding variable?", "A characteristic associated with both group membership and the outcome. It can provide an alternative explanation for a difference."],
      explain: ["Compare outcomes across groups and consider how people entered those groups. Random allocation can reduce systematic differences. A small sample can still give an imprecise estimate."],
      table: study,
      model: [
        "Both groups report more sleep. The workshop group reports 20 minutes more improvement on average than the comparison group.",
        "People selected their group. Those choosing the workshop may already be more motivated to change their routines.",
        "The result is consistent with benefit. Self-selection and the short follow-up limit a causal or long-term conclusion."
      ],
      skills: ["variables", "evidence", "graph", "rate"],
      guided: choice("Which one change would best reduce self-selection in a repeat study?", 2,
        [["Run the workshop for twice as long.", "Duration affects follow-up but does not decide who joins each group."], ["Report more decimal places in the sleep means.", "More decimal places do not make the groups comparable."], ["Allocate consenting participants to the two groups at random.", ""]],
        "Random allocation reduces systematic differences introduced by people choosing which group to enter.", ["Focus on how group membership was decided."]),
      apply: written("In another fictional study, one group receives a new walking aid. Both groups improve, but the new-aid group improves more and also receives extra supervised practice. Evaluate the conclusion that the new aid caused the difference.",
        ["The between-group difference is a relevant observation.", "Extra supervised practice could also account for some improvement.", "A fairer comparison would hold practice time similar or use a design that separates the two effects."],
        "The observed difference supports a benefit of the package of care used in the study. The design cannot isolate how much of that difference came from the aid itself.", ["List everything that differed between the groups."]),
      followup: choice("A randomised study finds a small average benefit after four weeks. What can it say about rare harms after a year?", 0,
        [["The study provides limited evidence about that question.", ""], ["Random allocation proves there are no late harms.", "Allocation helps compare groups. It does not extend follow-up."], ["Any short-term benefit rules out a rare harm.", "Effectiveness and safety are distinct outcomes."]],
        "Rare or late effects generally require enough participants and longer follow-up to detect.")
    }
  });

  const lessons = window.KeystoneHumanLessons;
  lessons["f171/a2"] = lessons["f171/2.1"];
  lessons["f171/a4"] = lessons["f171/4.2.2"];
})();

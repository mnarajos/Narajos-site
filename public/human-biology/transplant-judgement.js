/* Original, fictional cases for F170 2.1.4. */
(function () {
  "use strict";

  const comparison = `<h3>Comparing the treatments</h3>
    <dl class="hb-treatment-comparison">
      <div>
        <dt>Haemodialysis</dt>
        <dd>The machine removes waste from the blood during each session. Regular sessions take time and may involve travel.</dd>
      </div>
      <div>
        <dt>Successful kidney transplant</dt>
        <dd>A functioning donor kidney removes waste continuously and can free the patient from regular dialysis. The patient still needs follow-up and takes immunosuppressants, which increase infection risk.</dd>
      </div>
    </dl>`;

  function choices(id, label, options) {
    return { id, label, type: "radio", options: options.map(([value, label]) => ({ value, label })) };
  }

  const joModel = "If avoiding those repeated journeys matters most to Jo, fewer trips could outweigh the extra infection risk for Jo. Jo would still need transplant check-ups.";
  const dialysisModel = "Sam’s kidneys cannot remove enough waste such as urea. Haemodialysis removes waste from the blood while Sam waits for a donor kidney. It can also remove excess water that Sam’s kidneys cannot remove adequately.";
  const weekModel = "If the transplanted kidney functions well, Sam may be able to stop regular dialysis and regain the three afternoons each week currently spent at hospital. Sam would still have transplant check-ups.";
  const judgementModels = [
    "The benefit could outweigh the risk if Sam places a high value on regaining three afternoons a week for work, family or other activities. Immunosuppressants reduce the immune response to pathogens and raise the infection risk, but Sam might judge that the time gained is more important.",
    "The risk could outweigh the benefit if Sam places more value on avoiding infection than on regaining the three afternoons each week. Immunosuppressants weaken the immune response to pathogens, so Sam might give infection risk greater weight even though dialysis takes a substantial part of the week."
  ];

  window.KeystoneTransplantActivities.register({
    id: "dialysis-judgement",
    title: "Weigh dialysis against transplantation",
    description: "Use two fictional cases to explain why a benefit or risk might matter more to an individual.",
    cases: [
      {
        title: "Jo’s journey to dialysis · worked example",
        intro: "Jo lives two hours from the dialysis centre.",
        evidence: comparison,
        steps: [{
          title: "Find the detail that matters",
          prompt: "How might Jo’s situation affect the importance Jo gives to the benefits and risks of a transplant?",
          fields: [choices("detail", "Which detail helps you explain why a benefit might carry particular weight for Jo?", [
            ["follow-up", "Transplant recipients still need follow-up appointments."],
            ["journey", "Jo lives two hours from the dialysis centre."],
            ["session", "A dialysis machine removes waste during a session."]
          ])],
          check({ detail }) {
            const correct = detail === "journey";
            const cues = {
              "follow-up": "Follow-up matters to the comparison. Find a detail specific to Jo that affects the time spent getting to regular dialysis sessions.",
              session: "Waste removal explains why the treatment is needed. Which detail tells you about the effort it takes Jo to attend each session?"
            };
            return {
              correct,
              feedback: correct ? "You identified Jo’s two-hour journey. Avoiding regular dialysis could save a substantial amount of travel time." : cues[detail],
              model: joModel
            };
          }
        }]
      },
      {
        title: "Sam’s treatment week · independent practice",
        intro: "Sam has kidney failure and spends three afternoons each week at hospital for haemodialysis. Sam is waiting for a donor kidney.",
        evidence: comparison,
        steps: [
          {
            title: "Explain why Sam needs dialysis",
            prompt: "Why does Sam need dialysis while waiting for a donor kidney?",
            fields: [choices("explanation", "Choose a reason that links kidney failure with what dialysis does.", [
              ["immune", "Sam’s kidneys cannot suppress the immune response, so dialysis protects a future donor kidney."],
              ["waste", "Sam’s kidneys cannot remove enough waste such as urea, so dialysis removes it from the blood."],
              ["water", "Sam’s kidneys cannot remove enough excess water, so dialysis removes it from the blood."],
              ["oxygen", "Sam’s kidneys cannot oxygenate the blood, so dialysis replaces the oxygen that the kidneys would add."]
            ])],
            check({ explanation }) {
              const correct = explanation === "waste" || explanation === "water";
              return {
                correct,
                feedback: correct ? "You linked a function the failing kidneys cannot perform adequately to the job dialysis does." :
                  "Think about what builds up in the blood when the kidneys can no longer remove enough of it. How does the machine help?",
                model: dialysisModel
              };
            }
          },
          {
            title: "Explain what could change in Sam’s week",
            prompt: "How could a successful kidney transplant change Sam’s week?",
            fields: [choices("change", "Choose the explanation that uses the timing of Sam’s current treatment.", [
              ["checkups", "Sam would regain the three afternoons because successful transplants remove the need for all future hospital visits."],
              ["waiting", "Sam would regain the three afternoons as soon as a donor is found, even before the kidney is working."],
              ["continuous", "A functioning donor kidney could remove waste continuously, so Sam could regain the three afternoons now spent on dialysis."]
            ])],
            check({ change }) {
              const correct = change === "continuous";
              const cues = {
                checkups: "Sam would still need transplant check-ups. Which regular treatment could a functioning graft make unnecessary?",
                waiting: "Finding a donor is a step towards treatment. What would need to happen before Sam could stop spending those afternoons on dialysis?"
              };
              return {
                correct,
                feedback: correct ? "You linked the donor kidney’s function to the three afternoons Sam could regain each week." : cues[change],
                model: weekModel
              };
            }
          },
          {
            title: "Make and justify a judgement for Sam",
            prompt: "Would this benefit outweigh a transplant risk for Sam? Justify your judgement using the case and a possible priority. The case leaves Sam’s priorities open.",
            fields: [
              choices("conclusion", "Which conclusion will you argue for?", [
                ["benefit", "The benefit could outweigh the risk."],
                ["risk", "The risk could outweigh the benefit."]
              ]),
              choices("evidence", "Which case detail supports a possible benefit?", [
                ["waiting", "Sam is waiting for a donor kidney."],
                ["afternoons", "Sam spends three afternoons each week in hospital for dialysis."],
                ["journey", "Sam lives two hours from the dialysis centre."]
              ]),
              choices("risk", "Which explanation gives a biologically justified transplant risk?", [
                ["waste", "The donor kidney removes waste continuously, so blood becomes more likely to carry pathogens."],
                ["attack", "Immunosuppressants strengthen the attack on donor tissue, increasing the risk of rejection."],
                ["infection", "Immunosuppressants weaken the immune response to pathogens, increasing infection risk."]
              ]),
              choices("reasoning", "Which reasoning supports your chosen conclusion?", [
                ["assumption", "Sam definitely values a free afternoon above any health risk because dialysis takes so much time."],
                ["risk", "If avoiding infections matters most to Sam, that risk could carry more weight than the three afternoons of free time."],
                ["mention", "Sam might have an infection, so the infection risk should be mentioned."],
                ["benefit", "If Sam needs those afternoons for work or caring responsibilities, that time could matter more to Sam than the extra risk of infection."]
              ])
            ],
            check({ conclusion, evidence, risk, reasoning }) {
              const evidenceOK = evidence === "afternoons";
              const riskOK = risk === "infection";
              const reasoningOK = reasoning === conclusion;
              const feedback = [
                evidenceOK ? "You identified the case detail that supports the benefit." :
                  "Find the detail that shows how much of Sam’s regular week dialysis takes up.",
                riskOK ? "You explained the infection risk using the effect of immunosuppression on responses to pathogens." :
                  "For the risk, link reduced immune activity to weaker defence against pathogens.",
                reasoningOK ? "You weighed the benefit and the risk using a possible priority that supports your conclusion." :
                  "Choose a possible priority for Sam and use it to weigh both sides in the direction of your conclusion."
              ].join(" ");
              return { correct: evidenceOK && riskOK && reasoningOK, feedback, model: judgementModels };
            }
          }
        ]
      }
    ]
  });
})();

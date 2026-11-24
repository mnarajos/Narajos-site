import {diagram, line, picture, text} from "./catchup-models.js";

// Keep transfer evidence separate from the scored checks and their historic outcomes.
const tasks = {
  "fair-tests": ["Two groups compare how ramp height affects the distance a toy car travels. Name what to change, what to measure and one control. Explain why that control matters.", "Identify ramp height and distance travelled. Connect a named control to a possible effect on distance.", "Change ramp height and measure distance travelled from the ramp. Release the same car without pushing so a different starting push cannot explain a longer distance."],
  "separating-techniques": ["Write three steps, in order, to recover salt and gravel from a dry mixture. Why must filtration happen before evaporation?", "Dissolve the salt, separate the gravel, then recover the salt. Explain where the salt is after filtration.", "Add water and stir. Filter off the gravel. Evaporate water from the filtrate to recover salt. Evaporating first would leave salt mixed with gravel again."],
  "cell-structures": ["A gland cell releases large amounts of a protein. Use the cell diagram to name a structure it needs in large numbers and explain why.", "Name ribosomes and link protein synthesis to the cell’s function.", "Many ribosomes allow the cell to synthesise the proteins it secretes."],
  "amylase-endpoint": ["Equal starch samples first test negative at 25 s and 50 s. Calculate the reciprocal time for the faster reaction.", "s⁻¹", 0.04, "Use the shorter endpoint time. Divide 1 by that time in seconds."],
  "quadrat-evidence": ["Look at the meadow diagram. What population can the quadrats describe? Explain how you would estimate density across the whole meadow.", "Identify the sampled habitat and explain how to include the interior without choosing sites by eye.", "All the quadrats sample the stream edge. Use random coordinates throughout the meadow and divide the total count by the total area sampled."],
  "electrode-evidence": ["With inert electrodes, a gas from aqueous copper sulfate relights a glowing splint. Identify the gas and electrode. Explain why bubbles alone are weaker evidence.", "Name oxygen and the positive anode. Explain what the test distinguishes.", "The gas is oxygen from the positive anode. Several gases form bubbles, but oxygen relights a glowing splint."],
  "motion-graphs": ["On a velocity–time graph a straight segment joins (2 s, 9 m/s) to (6 s, 3 m/s). Calculate its gradient, including the sign.", "m/s²", -1.5, "Subtract the starting velocity from the final velocity. Divide by elapsed time, not the final clock reading."],
  "spring-evidence": ["A spring extends 4, 8 and 15 mm at 1, 2 and 3 N. A pupil says the final point proves permanent deformation. Correct the claim using a number and a further measurement.", "Compare 15 mm with the proportional prediction. Describe an unloaded-length test.", "Proportional extension would be 12 mm at 3 N. The 15 mm reading shows a departure from proportionality. Remove the load and compare the length with the original to test for permanent extension."]
};

export function applicationStatus(id, record = {}) {
  if (!Object.hasOwn(tasks,id)) return null;
  const outcomes = {
    independent: "Application complete", supported: "Application complete",
    attempted: "Written response saved · compare with the model",
    "self-reviewed": "Written response self-reviewed"
  };
  return outcomes[record.outcome] || (record.draft || record.helped ? "Application in progress" : "Application ready to try");
}

export function appendTransfer(host, id, state, save, evidence) {
  const task = tasks[id];
  if (!task) return false;
  const record = state.transfer20 ||= {};
  const form = document.createElement("form");
  const add = (tag, value) => {
    const el = document.createElement(tag);
    el.textContent = value;
    form.append(el);
    return el;
  };
  const numeric = typeof task[2] === "number";
  add("h4", "Independent application");
  const progress = add("p", applicationStatus(id,record));
  function saveApplication() {
    progress.textContent = applicationStatus(id,record);
    save();
  }
  if (id === "quadrat-evidence" || id === "cell-structures") {
    const figure = evidence?.();
    if (figure) form.append(figure);
  }
  if (id === "motion-graphs") {
    const axes = line(48,24,48,132)+line(48,132,260,132);
    const points = line(108,42,228,102)+line(108,42,108,132,undefined,1,"4 3")+
      line(48,42,108,42,undefined,1,"4 3")+line(228,102,228,132,undefined,1,"4 3")+
      line(48,102,228,102,undefined,1,"4 3");
    form.append(picture("Velocity against time", diagram("A straight line decreases from 9 metres per second at 2 seconds to 3 metres per second at 6 seconds.",
      axes+points+text(78,17,"Velocity (m/s)")+text(39,46,"9")+text(39,106,"3")+
      text(108,150,"2")+text(228,150,"6")+text(151,172,"Time (s)"), 285,180)));
  }
  const label = add("label", task[0] + (numeric ? " Answer in " + task[1] + "." : ""));
  const input = add(numeric ? "input" : "textarea", "");
  label.htmlFor = input.id = "catchup-transfer-answer";
  input.required = true;
  if (numeric) { input.type = "number"; input.step = "any"; }
  input.value = record.first ?? record.draft ?? "";
  input.readOnly = record.first !== undefined;
  input.oninput = () => { record.draft = input.value; saveApplication(); };
  const submit = add("button", numeric ? "Check calculation" : "Compare with model");
  submit.className = "school-primary";
  const feedback = add("p", numeric && ["independent", "supported"].includes(record.outcome) ? "Correct!" : record.feedback || "");
  feedback.setAttribute("role","status");
  function finish(focus) {
    input.readOnly = true;
    submit.hidden = true;
    if (!numeric) {
      add("p","Check your reasoning. " + task[1]);
      add("p","Model explanation. " + task[2]);
      const revisionLabel = add("label","Your revised explanation (optional)");
      const revision = add("textarea","");
      revision.id = revisionLabel.htmlFor = "catchup-transfer-revision";
      revision.value = record.revision || "";
      revision.oninput = () => { record.revision = revision.value; saveApplication(); };
      if (record.outcome !== "self-reviewed") {
        const done = add("button","Finish self-review");
        done.type = "button";
        done.className = "school-primary";
        done.onclick = () => {
          record.outcome = "self-reviewed";
          feedback.textContent = record.feedback = "Self-review complete. Your first answer and any revision are saved.";
          done.hidden = true;
          feedback.tabIndex = -1;
          feedback.focus();
          saveApplication();
        };
      }
      if (focus) revision.focus();
    } else if (focus) { feedback.tabIndex = -1; feedback.focus(); }
  }
  form.onsubmit = event => {
    event.preventDefault();
    if (!input.value.trim() || record.first !== undefined) return;
    record.firstAttempt ??= input.value;
    if (numeric && input.valueAsNumber !== task[2]) {
      record.helped = true;
      feedback.textContent = record.feedback = task[3];
      input.focus();
    } else {
      record.first = input.value;
      record.outcome = numeric ? (record.helped ? "supported" : "independent") : "attempted";
      feedback.textContent = record.feedback = numeric ? "Correct!" : "Review the first answer you wrote. Compare it with the model, then finish your self-review.";
      finish(true);
    }
    saveApplication();
  };
  if (record.first !== undefined) finish(false);
  host.append(form);
  return true;
}

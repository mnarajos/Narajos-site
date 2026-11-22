const surfaceControls = [
  {label: "Ramp angle", control: true},
  {label: "Ramp surface", feedback: "Change the ramp surface. That is what this question tests."},
  {label: "Toy used", control: true},
  {label: "Added load", control: true},
  {label: "Distance rolled", feedback: "Measure the distance. It is the outcome you compare."},
  {label: "Release point", control: true},
  {label: "Paint colour of the same toy", feedback: "Repainting the same toy makes no difference in this model. Look for settings that could affect the distance."}
];

export function fairTestPlan(id, prompt) {
  const wrapper = document.createElement("div");
  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = prompt;
  const draft = document.createElement("textarea");
  draft.id = id;
  draft.rows = 3;
  wrapper.append(label, draft);
  return wrapper;
}

function surfaceCheck() {
  const card = document.createElement("article");
  card.className = "practice-card";
  card.id = "fair-test-surface";
  card.innerHTML = `
    <h3>Choose the controls</h3>
    <p><strong>How does the ramp surface affect the distance a toy rolls after it leaves the ramp?</strong></p>
    <p>Keep the other factors steady so you can compare smooth plastic with felt.</p>
    <form class="ks3-fair-check">
      <fieldset>
        <legend>Which four factors do you need to keep the same?</legend>
        <div class="ks3-fair-options">
          ${surfaceControls.map(({label}, i) =>
            '<label><input type="checkbox" name="control" value="' + i + '"> ' + label + '</label>').join("")}
        </div>
      </fieldset>
      <button type="submit" class="ks3-model-button">Check my controls</button>
      <p class="ks3-feedback" role="status"></p>
    </form>
    <details>
      <summary>Need a hint?</summary>
      <p>Look back at the angle test. Which setting used to change but now needs to stay the same? Then check which toy you release, what it is carrying and where it starts.</p>
    </details>`;
  const form = card.querySelector("form");
  const result = form.querySelector('[role="status"]');
  form.addEventListener("change", () => { result.textContent = ""; });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const selected = [...form.querySelectorAll("input:checked")].map(input => surfaceControls[Number(input.value)]);
    const count = selected.filter(option => option.control).length;
    const reminders = selected.filter(option => !option.control).map(option => option.feedback);
    if (selected.length === 0) {
      result.textContent = "Choose four factors that could affect the distance and should be kept the same.";
    } else if (count === 4 && reminders.length === 0) {
      result.textContent = "Correct. Keep the angle, toy, added load and release point the same. Angle was the independent variable in the first test. It is a control variable in this one.";
    } else {
      result.textContent = [
        count + " of the 4 controls selected.",
        ...reminders,
        count < 4 ? "Look for another setting that could affect the distance." : "Keep just the four relevant controls."
      ].filter(Boolean).join(" ");
    }
  });
  return card;
}

function releasePointPlan() {
  const card = document.createElement("article");
  card.className = "practice-card";
  card.innerHTML = `
    <h3>Choose your own controls</h3>
    <p><strong>How does the release point affect the distance a toy rolls after it leaves the ramp?</strong></p>
    <p>Plan two runs. Describe what you will change and what you will measure. Name two controls and explain why one matters.</p>`;
  card.append(fairTestPlan("release-point-plan", "Write your plan"));
  const support = document.createElement("div");
  support.innerHTML = `
    <details>
      <summary>Use a sentence starter</summary>
      <p>I would change … and measure … . I would keep … and … the same. If I changed … as well, it could affect the distance because … .</p>
    </details>
    <details>
      <summary>Compare with an example plan</summary>
      <div class="ks3-fair-example">
        <p>Release the same toy near the top in one run and halfway up in the other. Measure how far it rolls from the foot of the ramp. Keep the ramp angle and surface the same. If the angle changed as well, the difference in distance could be due to the angle.</p>
        <p>Other valid controls include keeping the toy and load the same and letting go without pushing.</p>
      </div>
    </details>
    <p><a href="#fair-test-ramp">Try the release-point plan in the model above</a>.</p>`;
  card.append(support);
  return card;
}

export function fairTestPractice() {
  return [surfaceCheck(), releasePointPlan()];
}

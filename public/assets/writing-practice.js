import { reviewWriting } from "./writing-marking.js";

const activities = document.querySelectorAll("[data-writing-exercise]");

for (const activity of activities) {
  const field = activity.querySelector("textarea");
  const check = activity.querySelector("[data-check-sentence]");
  const status = activity.querySelector("[data-sentence-status]");
  const results = activity.querySelector("[data-sentence-results]");
  const model = activity.querySelector("[data-sentence-model]");
  const comparison = activity.querySelector("[data-sentence-comparison]");
  const key = "narajos-first-writing:" + field.id;
  let first = null;
  try {
    first = sessionStorage.getItem(key);
    activity.dataset.checkedSentence = sessionStorage.getItem(key + ":latest") || "";
  } catch (_) {}
  activity.dataset.firstSentence = first || "";

  activity.querySelector("[data-use-starter]")?.addEventListener("click", (event) => {
    if (!field.value.trim()) {
      field.value = event.currentTarget.dataset.useStarter;
      field.dispatchEvent(new Event("input", { bubbles: true }));
    }
    field.focus();
    field.setSelectionRange(field.value.length, field.value.length);
  });

  field.addEventListener("input", () => {
    if (!results.hidden) status.textContent = "You’ve edited your sentence. Check it again when ready.";
    activity.closest(".writing-card")?.querySelector("[data-sentence-selection]")?.remove();
    results.hidden = true;
    comparison.hidden = true;
  });

  check.addEventListener("click", () => {
    const text = field.value.trim();
    if (!text) {
      status.textContent = "Write one sentence, then check it here.";
      field.focus();
      return;
    }

    const criteria = reviewWriting(activity.dataset.writingExercise, activity.dataset.writingKind, text);
    if (first === null) {
      first = text;
      activity.dataset.firstSentence = first;
      try { sessionStorage.setItem(key, first); } catch (_) {}
    }
    const data = criteria.filter(item => item.kind === "data");
    const reasoning = criteria.filter(item => item.kind === "reasoning");
    const summary = [];
    if (data.length) summary.push(data.filter(item => item.state === "matched").length + " of " + data.length + " data results matched.");
    if (reasoning.length) summary.push(reasoning.some(item => item.state === "detected")
      ? "Possible reasoning link found. Compare it with the model." : "Compare your reasoning with the model.");
    status.textContent = summary.join(" ");
    results.replaceChildren(...criteria.map(createRow));
    results.hidden = false;
    model.hidden = false;

    activity.dataset.checkedSentence = text;
    try { sessionStorage.setItem(key + ":latest", text); } catch (_) {}
    const changed = text !== first;
    comparison.hidden = !changed;
    if (changed) {
      comparison.querySelector("[data-first-sentence]").textContent = first;
      comparison.querySelector("[data-revised-sentence]").textContent = text;
    }
  });
}

for (const button of document.querySelectorAll("[data-use-sentences]")) {
  button.addEventListener("click", () => {
    const card = button.closest(".writing-card");
    const paragraph = card.querySelector("textarea[id$='-paragraph']");
    const status = button.nextElementSibling;
    if (paragraph.value.trim()) {
      status.textContent = "Your paragraph already has a draft. You can copy a sentence into it yourself.";
      paragraph.focus();
      return;
    }

    const sentences = [...card.querySelectorAll("[data-writing-exercise]")].filter(section =>
      section.dataset.writingKind !== "transfer").map(section => section.querySelector("textarea").value.trim()).filter(Boolean);
    if (!sentences.length) {
      status.textContent = "Write a practice sentence first, or start directly in the paragraph box.";
      return;
    }
    // Copy only a pupil's own live text. They can choose to keep a useful
    // sentence even when its wording is outside the pattern checker's scope.
    function add(selected) {
      if (!selected.length) { status.textContent = "Choose a sentence to add."; return; }
      if (paragraph.value.trim()) { status.textContent = "Your draft already has text. Copy across the changes you want."; return; }
      paragraph.value = selected.map(text => /[.!?]$/.test(text) ? text : text + ".").join(" ");
      paragraph.dispatchEvent(new Event("input", {bubbles:true}));
      card.querySelector("[data-sentence-selection]")?.remove();
      status.textContent = "Added your wording. Check the evidence and explanation as you revise.";
      paragraph.focus();
      paragraph.setSelectionRange(paragraph.value.length,paragraph.value.length);
    }
    card.querySelector("[data-sentence-selection]")?.remove();
    if (sentences.length === 1) { add(sentences); return; }
    const group = document.createElement("fieldset");
    group.dataset.sentenceSelection = "";
    const legend = document.createElement("legend");
    legend.textContent = "Which of your sentences do you want to use?";
    group.append(legend);
    for (const text of sentences) {
      const label = document.createElement("label"), choice = document.createElement("input");
      choice.type = "checkbox";
      choice.value = text;
      label.append(choice, " " + text);
      group.append(label);
    }
    const insert = document.createElement("button");
    insert.type = "button";
    insert.textContent = "Add selected sentences";
    insert.onclick = () => add([...group.querySelectorAll("input:checked")].map(input => input.value));
    group.append(insert);
    button.before(group);
    group.querySelector("input").focus();
  });
}

export function createRow(criterion) {
  const row = document.createElement("li");
  const status = document.createElement("strong");
  const labels = {
    matched: "Matches the data",
    detected: "Possible link found",
    revise: criterion.kind === "reasoning" ? "Check for a possible conflict" : "Recheck the data",
    compare: "Compare with model"
  };
  status.textContent = labels[criterion.state] + " · " + criterion.label;
  row.dataset.reviewState = criterion.state;
  row.append(status);
  const feedback = document.createElement("span");
  feedback.textContent = criterion.feedback;
  row.append(feedback);
  return row;
}

import { readCatchup, saveCatchup } from "./school-catchup-progress.js";

const lessonStages = ["Notice and explain", "Practise with a clue", "Try an unfamiliar example"];

export function question(prompt, answer, reasoning, ...distractors) {
  return {
    prompt,
    answer,
    reasoning,
    options: distractors.map(item => typeof item === "string"
      ? {label: item, feedback: "Compare that choice with the evidence, then try again."}
      : {label: item[0], feedback: item[1]})
  };
}

function element(tag, text, className) {
  const el = document.createElement(tag);
  if (text) el.textContent = text;
  if (className) el.className = className;
  return el;
}

function button(text, action, className = "school-secondary") {
  const el = element("button", text, className);
  el.type = "button";
  el.addEventListener("click", action);
  return el;
}

function link(text, href, className) {
  const el = element("a", text, className);
  el.href = href;
  return el;
}

export function mountJourney(host, model, lesson) {
  if (!host || !model || !lesson?.steps?.length || host.dataset.journeyMounted) return;
  host.dataset.journeyMounted = "true";
  const {id, year, title, hook, steps, retry, code} = lesson;
  const prior = readCatchup(id);
  const state = {
    ...prior,
    title,
    year: String(year),
    href: location.pathname + location.search,
    step: Math.min(prior.step, steps.length - 1)
  };
  model.id ||= "catchup-evidence";
  model.tabIndex = -1;
  const journey = element("section", "", "school-journey");
  const versions = element("p", "", "school-journey-status");
  versions.setAttribute("role", "status");
  const progress = element("progress", "", "school-progress");
  progress.max = steps.length;
  progress.setAttribute("aria-label", "Lesson progress");
  const checkList = element("div", "", "school-stages");
  const storageNote = element("p", "", "school-storage-note");
  const dialog = element("dialog", "", "school-check");
  dialog.setAttribute("aria-labelledby", "school-check-heading");
  dialog.setAttribute("aria-describedby", "school-check-prompt");

  const topic = link("Year " + year + " catch-up topics", "/science-catch-up/?year=" + year, "school-journey-back");
  journey.append(topic, element("h2", hook), versions, progress, checkList, storageNote, dialog);
  host.before(journey);
  const cue = element("p", "When you’re ready, try the next check.");
  const shortcut = button("Open the current check", showCheck, "school-primary");
  const actions = element("div", "", "school-journey-actions");
  actions.append(cue, shortcut);
  model.after(actions);

  let viewOnly = false;
  let shownIndex = state.step;
  let storageAvailable = true;

  function write() {
    storageAvailable = saveCatchup(id, state);
    if (!storageAvailable) storageNote.textContent = "Progress is available while this page is open.";
  }

  function renderStages() {
    versions.textContent = state.done ? "Lesson complete" : "Check " + (state.step + 1) + " of " + steps.length;
    progress.value = state.done ? steps.length : state.step;
    storageNote.textContent = state.started ? (storageAvailable ? "Progress is saved in this browser." : "Progress is available while this page is open.") : "";
    checkList.replaceChildren();
    for (const [index, step] of steps.entries()) {
      const stage = element("details");
      const completed = state.done || index < state.step;
      const active = !state.done && index === state.step;
      stage.open = active;
      stage.append(element("summary", step.title || lessonStages[index]));
      if (active) {
        stage.append(element("p", step.notice || "Use the lesson model or example to think this through."),
          link("Look at the model", "#" + model.id, "school-secondary"),
          button(state.open ? "Resume this check" : "Open check", showCheck, "school-primary"));
      } else if (completed) {
        stage.append(button("Review this check", () => openCheck(index, true)));
      } else {
        stage.append(element("p", "Complete the previous check to open this one."));
      }
      checkList.append(stage);
    }
    shortcut.hidden = Boolean(state.done);
    cue.hidden = Boolean(state.done);
    if (state.done) {
      const next = element("div", "", "school-completion");
      if (code) next.append(link("Practise " + code + " in GCSE revision", "/gcse/#topic-" + code.toLowerCase(), "school-primary"));
      next.append(link("Choose another Year " + year + " topic", "/science-catch-up/?year=" + year, "school-secondary"));
      checkList.append(next);
    }
  }

  function showCheck() {
    if (!state.done) openCheck(state.step, false);
  }

  function currentQuestion() {
    return !viewOnly && state.repeating && shownIndex === steps.length - 1 && retry ? retry : steps[shownIndex];
  }

  function openCheck(index, review) {
    shownIndex = index;
    viewOnly = review;
    if (!review) {
      state.started = true;
      state.open = true;
      write();
    }
    renderCheck();
    if (!dialog.open) dialog.showModal();
    dialog.querySelector("h2").focus();
  }

  function pause() {
    if (!viewOnly) write();
    dialog.close();
    renderStages();
    checkList.querySelector("details[open] button")?.focus({preventScroll: true});
  }

  function renderCheck() {
    const q = currentQuestion();
    const heading = element("h2", state.repeating && !viewOnly ? "Try one more on your own" : (q.title || lessonStages[shownIndex]));
    heading.id = "school-check-heading";
    heading.tabIndex = -1;
    const prompt = element("p", q.prompt, "school-check-question");
    prompt.id = "school-check-prompt";
    dialog.replaceChildren(heading, prompt);
    if (viewOnly) {
      dialog.append(element("p", q.answer), element("p", q.reasoning));
      for (const note of state.notes?.[shownIndex] || []) dialog.append(element("p", "Your thinking. " + note));
      dialog.append(button("Close review", pause));
      return;
    }

    const form = element("form");
    const choices = element("fieldset", "", "school-check-options");
    choices.append(element("legend", "Choose your answer"));
    const options = [...q.options];
    const shift = [...id].reduce((n, letter) => n + letter.charCodeAt(0), 0);
    options.splice((shift + shownIndex + (state.repeating ? 1 : 0)) % (options.length + 1), 0, {label: q.answer});
    for (const option of options) {
      const label = element("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = option.label;
      input.required = true;
      input.checked = state.selected === option.label;
      input.disabled = Boolean(state.correct);
      label.append(input, document.createTextNode(option.label));
      choices.append(label);
    }

    const thought = element("details", "", "school-thought");
    thought.open = Boolean(state.thoughtOpen);
    thought.append(element("summary", "Write down your thinking"));
    const label = element("label", "Your thinking");
    const draft = document.createElement("textarea");
    draft.rows = 3;
    draft.maxLength = 2000;
    draft.value = state.draft || "";
    label.append(draft);
    thought.append(label);
    thought.addEventListener("toggle", () => {
      if (!thought.isConnected) return;
      state.thoughtOpen = thought.open;
      write();
    });
    draft.addEventListener("input", () => { state.draft = draft.value; write(); });

    const result = element("p", state.feedback || "", "school-check-feedback");
    result.setAttribute("role", "status");
    const submit = element("button", "Check answer", "school-primary");
    submit.type = "submit";
    submit.hidden = Boolean(state.correct);
    const nextLabel = () => shownIndex === steps.length - 1 && (!retry || state.repeating || !state.helped)
      ? "Finish catch-up" : "Continue";
    const next = button(nextLabel(), advance, "school-primary");
    next.hidden = !state.correct;
    const tools = element("div", "", "school-journey-actions");
    tools.append(submit, next, button("Look at the model", () => {
      if (!state.correct) state.helped = true;
      pause();
      model.scrollIntoView({block: "start"});
      model.focus({preventScroll: true});
    }), button("Save and pause", pause));
    if (shownIndex === steps.length - 1) form.append(element("p", "Say or write your own answer before you choose."));
    form.append(choices, thought, result, tools);
    if (q.hint && !state.repeating) {
      const hint = element("details");
      hint.append(element("summary", "Need a clue?"), element("p", q.hint));
      hint.open = Boolean(state.hintOpen);
      hint.addEventListener("toggle", () => {
        if (!hint.isConnected) return;
        state.hintOpen = hint.open;
        if (hint.open && !state.correct) state.helped = true;
        write();
      });
      dialog.append(hint);
    }
    dialog.append(form);

    form.addEventListener("change", event => {
      if (event.target.name !== "answer") return;
      state.selected = event.target.value;
      write();
    });
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (state.correct || !state.selected) return;
      state.correct = state.selected === q.answer;
      if (!state.correct) state.helped = true;
      state.feedback = state.correct ? "Correct. " + q.reasoning :
        (q.options.find(option => option.label === state.selected)?.feedback || "Try a different answer.");
      write();
      result.textContent = state.feedback;
      if (state.correct) {
        for (const input of choices.querySelectorAll("input")) input.disabled = true;
        submit.hidden = true;
        next.textContent = nextLabel();
        next.hidden = false;
        next.focus();
      }
    });
  }

  function advance() {
    const atEnd = state.step === steps.length - 1;
    const repeat = atEnd && retry && state.helped && !state.repeating;
    if (state.draft?.trim()) {
      state.notes ||= {};
      state.notes[state.step] ||= [];
      state.notes[state.step].push(state.draft.trim());
    }
    Object.assign(state, {selected: "", feedback: "", draft: "", thoughtOpen: false,
      hintOpen: false, correct: false, helped: false, repeating: Boolean(repeat)});
    if (repeat) {
      write();
      renderCheck();
      dialog.querySelector("h2").focus();
    } else {
      state.open = false;
      if (atEnd) state.done = true;
      else state.step++;
      pause();
      checkList.querySelector(state.done ? ".school-completion a" : "details[open] summary")?.focus();
    }
  }

  dialog.addEventListener("cancel", event => { event.preventDefault(); pause(); });
  renderStages();
}

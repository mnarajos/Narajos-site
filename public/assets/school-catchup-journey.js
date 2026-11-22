import { readCatchup, saveCatchup } from "./school-catchup-progress.js";

const lessonStages = ["Notice", "Practise", "Apply it"];

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

function checkButton(text, action) {
  const check = button(text, action, "school-primary");
  const arrow = element("span", " →");
  arrow.setAttribute("aria-hidden", "true");
  check.append(arrow);
  return check;
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
  const guided = Number(year) >= 9 || new URLSearchParams(location.search).has("guided");
  const progressKey = year + "." + id;
  const prior = readCatchup(progressKey);
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

  journey.append(element("h2", hook), versions, progress, checkList, storageNote, dialog);
  host.before(journey);
  const shortcut = checkButton("Check", showCheck);
  const actions = element("div", "", "school-journey-actions");
  actions.append(shortcut);
  model.after(actions);
  const evidence = guided ? element("div", "", "school-evidence-panel") : null;
  if (evidence) {
    evidence.hidden = true;
    model.before(evidence);
    evidence.append(model, actions);
    if (Number(year) < 9 && evidence.nextElementSibling) {
      const extras = element("details", "", "school-lesson-extras");
      extras.append(element("summary", "More practice and activities"));
      while (evidence.nextElementSibling) extras.append(evidence.nextElementSibling);
      evidence.after(extras);
    }
  }

  let viewOnly = false;
  let shownIndex = state.step;
  function write() {
    storageNote.textContent = saveCatchup(progressKey, state) ? "" : "Progress can only be kept while this page is open.";
  }

  function renderStages() {
    versions.textContent = state.done ? "Lesson complete" : "Step " + (state.step + 1) + " of " + steps.length;
    progress.value = state.done ? steps.length : state.step;
    checkList.replaceChildren();
    const completeCount = state.done ? steps.length : state.step;
    if (!state.done) {
      const step = steps[state.step];
      const stage = element("section", "", "school-current-stage");
      const heading = element("h3", lessonStages[state.step]);
      heading.tabIndex = -1;
      stage.append(heading);
      if (step.notice) stage.append(element("p", step.notice));
      stage.append(button("Catch-up notes", showEvidence),
        checkButton(state.open ? "Resume check" : "Check", showCheck));
      checkList.append(stage);
    }
    shortcut.hidden = Boolean(state.done);
    if (state.done) {
      const next = element("div", "", "school-completion");
      if (code) next.append(link("Practise " + code + " in GCSE revision", "/gcse/#topic-" + code.toLowerCase(), "school-primary"));
      next.append(link("Choose another Year " + year + " topic", "/science-catch-up/?year=" + year, "school-secondary"));
      if (evidence) next.append(button("Catch-up notes", showEvidence));
      checkList.append(next);
    }
    if (completeCount) {
      const review = element("details");
      review.append(element("summary", "Review answers"));
      for (let index = 0; index < completeCount; index++) {
        review.append(button("Check " + (index + 1), () => openCheck(index, true)));
      }
      checkList.append(review);
    }
  }

  function showCheck() {
    if (!state.done) openCheck(state.step, false);
  }

  function showEvidence() {
    if (evidence) evidence.hidden = false;
    const target = state.step === 0 && model.querySelector("[data-catchup-first-evidence]") || model;
    if (target.matches("details")) target.open = true;
    target.tabIndex = -1;
    target.focus({preventScroll: true});
    target.scrollIntoView({block: "start"});
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
    if (viewOnly) return;
    renderStages();
    checkList.querySelector(".school-current-stage button")?.focus({preventScroll: true});
  }

  function renderCheck() {
    const q = currentQuestion();
    const heading = element("h2", q.prompt, "school-check-question");
    heading.id = "school-check-heading";
    heading.tabIndex = -1;
    dialog.replaceChildren(heading);
    if (state.repeating && !viewOnly) heading.before(element("p", "Try one more on your own", "school-check-context"));
    if (viewOnly) {
      dialog.append(element("p", q.answer), element("p", q.reasoning));
      const notes = state.notes?.[shownIndex] || [];
      if (notes.length) dialog.append(element("h3", "Saved notes"), ...notes.map(note => element("p", note)));
      dialog.append(button("Close review", pause));
      return;
    }

    const form = element("form");
    const choices = element("fieldset", "", "school-check-options");
    choices.append(element("legend", "Choose your answer", "school-visually-hidden"));
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
    tools.append(submit, next, button("Catch-up notes", () => {
      if (!state.correct) state.helped = true;
      pause();
      showEvidence();
    }), button("Save and pause", pause));
    if (shownIndex === steps.length - 1 && !state.repeating) form.append(element("p", "Say how you know, then choose."));
    form.append(choices, result, tools);
    if (state.draft?.trim()) {
      const note = element("details");
      note.append(element("summary", "Saved note"), element("p", state.draft));
      form.append(note);
    }
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
    Object.assign(state, {selected: "", feedback: "", draft: "",
      hintOpen: false, correct: false, helped: false, repeating: Boolean(repeat)});
    if (repeat) {
      write();
      renderCheck();
      dialog.querySelector("h2").focus();
    } else {
      if (evidence) evidence.hidden = true;
      state.open = false;
      if (atEnd) state.done = true;
      else state.step++;
      pause();
      checkList.querySelector(state.done ? ".school-completion a" : ".school-current-stage h3")?.focus();
    }
  }

  dialog.addEventListener("cancel", event => { event.preventDefault(); pause(); });
  renderStages();
}

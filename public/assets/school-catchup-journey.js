import {appendTransfer} from "./school-catchup-transfer.js";
import { readCatchup, saveCatchup } from "./school-catchup-progress.js";

const lessonStages = ["Notice", "Practise", "Apply it", "Try it on your own"];

export function question(prompt, answer, reasoning, ...distractors) {
  return {
    prompt,
    answer,
    reasoning,
    options: distractors.map(item => typeof item === "string"
      ? {label: item}
      : {label: item[0], feedback: item[1]})
  };
}

function distractorFeedback(option, question) {
  const text = option?.feedback?.trim();
  if (!text || text === question.reasoning.trim()) return "";
  return text.replace(/^Incorrect[.!]\s*/i, "");
}

function feedbackFor(question, selected) {
  if (selected === question.answer) return ["Correct!", ""];
  const detail = distractorFeedback(question.options.find(option => option.label === selected), question);
  return detail ? ["Incorrect.", detail]
    : ["Incorrect.", "Key idea: " + question.reasoning];
}

function supportStatus(outcome) {
  return {
    independent: "Correct!",
    supported: "Correct!",
    explained: "Explanation used"
  }[outcome] || "";
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

export function identifyCatchupYear(year) {
  document.documentElement.dataset.catchupYear = String(year);
  document.dispatchEvent(new Event("narajos:catchup-year"));
}

export function mountJourney(host, model, lesson) {
  if (!host || !model || !lesson?.steps?.length || host.dataset.journeyMounted) return;
  host.dataset.journeyMounted = "true";
  const {id, year, hook, steps, retry, code} = lesson;
  if (!document.documentElement.dataset.catchupYear) identifyCatchupYear(year);
  const inlineCheck = Number(year) >= 10;
  const guided = Number(year) >= 9 || new URLSearchParams(location.search).has("guided");
  const practice = guided ? model.parentElement.querySelector("[data-ks3-transfer]") : null;
  const hasScaffolding = guided && steps.some(step => step.worked || step.guide);
  const progressKey = year + "." + id;
  const prior = readCatchup(progressKey);
  const state = {
    ...prior,
    step: Math.min(prior.step, steps.length - 1),
    clues: prior.clues ?? Number(Boolean(prior.hintOpen))
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
  const dialog = element(inlineCheck ? "section" : "dialog", "", "school-check" + (inlineCheck ? " school-check-inline" : ""));
  dialog.setAttribute("aria-labelledby", "school-check-heading");

  const checkHeading = element("h2", "Checks");
  if (inlineCheck) checkHeading.classList.add("school-visually-hidden");
  const pauseControl = inlineCheck ? button("Pause check", pause, "school-pause") : null;
  if (pauseControl) document.querySelector(".resource-breadcrumb")?.after(pauseControl);
  journey.append(checkHeading, versions, progress, checkList, storageNote);
  if (!inlineCheck) journey.append(dialog);
  const opening = element("h2", hook, "school-opening-hook");
  const evidence = guided ? element("div", "", "school-evidence-panel") : null;
  if (evidence) {
    evidence.hidden = !inlineCheck && Boolean(state.done || state.step > 0);
    model.before(evidence);
    evidence.append(opening, model);
    evidence.after(journey);
    if (model.dataset.catchupFirstTopic === "cells") {
      const microscopy = model.querySelector("[data-catchup-first-evidence]");
      if (microscopy) {
        microscopy.open = true;
        model.querySelector("h2")?.after(microscopy);
      }
    }
    if (Number(year) < 9 && journey.nextElementSibling) {
      const extras = element("details", "", "school-lesson-extras");
      extras.append(element("summary", "More practice and activities"));
      while (journey.nextElementSibling) extras.append(journey.nextElementSibling);
      journey.after(extras);
    }
  } else {
    model.before(opening);
    model.after(journey);
  }

  const workedModel = Number(year) >= 10 && steps.find(step => step.worked)?.worked;
  const workedReview = workedModel ? element("details", "", "school-worked-example") : null;
  if (workedReview) {
    const workedLines = element("ol");
    workedLines.append(...workedModel.lines.map(line => element("li", line)));
    workedReview.append(element("summary", "Review the worked example"),
      element("h3", workedModel.title), workedLines);
    model.append(workedReview);
  }

  function addQuestionEvidence(q) {
    if (!q.image && !q.reference) return;
    const support = element(inlineCheck ? "section" : "details", "", "school-question-evidence");
    if (!inlineCheck) support.open = true;
    support.append(element(inlineCheck ? "h3" : "summary", q.reference?.label || "Question diagram"));
    if (q.image) {
      const img = element("img", "", "school-question-diagram");
      [img.src, img.alt] = q.image;
      support.append(img);
    } else {
      support.append(q.reference.render());
    }
    dialog.append(support);
  }

  let viewOnly = false;
  let paused = false;
  let shownIndex = state.step;
  const savedQuestion = (state.repeating && retry) || steps[state.step];
  const changedPrompt = state.prompt && state.prompt !== savedQuestion.prompt;
  const missingChoice = state.selected && state.selected !== savedQuestion.answer
    && !savedQuestion.options.some(option => option.label === state.selected);
  if (changedPrompt || missingChoice || state.correct && state.selected !== savedQuestion.answer) {
    Object.assign(state, {selected: "", correct: false, feedback: "", clues: 0, helped: false, explained: false});
  }
  function write() {
    state.prompt = (state.repeating && retry ? retry : steps[state.step]).prompt;
    storageNote.textContent = saveCatchup(progressKey, state) ? "" : "Progress can only be kept while this page is open.";
  }

  function renderStages() {
    if (pauseControl) pauseControl.hidden = Boolean(state.done || paused);
    if (workedReview) workedReview.hidden = state.step === 0 && !state.done;
    checkHeading.hidden = Boolean(state.done);
    versions.textContent = state.done ? "Guided checks complete" : "Step " + (state.step + 1) + " of " + steps.length;
    versions.classList.toggle("school-visually-hidden", Boolean(state.done));
    progress.hidden = Boolean(state.done);
    progress.value = state.done ? steps.length : state.step;
    checkList.replaceChildren();
    const completeCount = state.done ? state.step + 1 : state.step;
    if (!state.done) {
      const step = steps[state.step];
      const stage = element("section", "", "school-current-stage");
      let stageName = lessonStages[state.step];
      if (hasScaffolding) {
        if (step.guide) stageName = inlineCheck ? "Guided practice" : "We do · Guided practice";
        else if (step.worked) stageName = inlineCheck ? "Worked example" : "I do · Worked example";
        else if (state.step === steps.length - 1) stageName = inlineCheck ? "Independent practice" : "You do · On your own";
        else if (Number(year) >= 10) stageName = "Apply it";
      }
      const heading = element("h3", stageName);
      heading.tabIndex = -1;
      stage.append(heading);
      if (step.notice) stage.append(element("p", step.notice));
      if (step.teach) {
        const [title, text] = step.teach;
        const teaching = element("div", "", "school-step-notes");
        teaching.append(element("h4", title), element("p", text));
        stage.append(teaching);
      }
      if (guided && step.worked) {
        const { title, lines, visual } = step.worked;
        const example = element("div", "", "school-worked-example");
        example.append(element("h4", title));
        if (visual) example.append(visual());
        const reasoning = element("ol");
        reasoning.append(...lines.map(line => element("li", line)));
        example.append(reasoning);
        stage.append(example);
      }
      if (inlineCheck && !paused) {
        shownIndex = state.step;
        viewOnly = false;
        state.open = true;
        stage.append(dialog);
        renderCheck();
      } else {
        stage.append(checkButton(state.open ? "Resume check" : "Check", showCheck));
      }
      if (state.step > 0 && !inlineCheck) stage.append(button("Catch-up notes", () => showEvidence()));
      checkList.append(stage);
    }
    if (state.done) {
      const next = element("div", "", "school-completion");
      const heading = element("h3", "Guided checks complete");
      heading.tabIndex = -1;
      const tick = element("span", "✓", "school-completion-tick");
      tick.setAttribute("aria-hidden", "true");
      heading.prepend(tick);
      next.append(heading);
      const transfer = appendTransfer(next, id, state, write, () => id === "quadrat-evidence"
        ? steps.at(-1).reference?.render() : model.querySelector("figure")?.cloneNode(true));
      if (transfer) next.append(element("p", "You can also review your checks or move on to revision."));
      if (code) next.append(link("Revise " + code, "/gcse/#topic-" + code.toLowerCase(), transfer ? "school-secondary" : "school-primary"));
      if (id === "enzymes") next.append(link("Try a guided enzyme investigation",
        "/teaching/enzyme-investigations/gcse/", "school-secondary"));
      if (practice) next.append(button("Try it yourself", () => {
        const section = practice.closest("details");
        if (section) section.open = true;
        practice.querySelector("textarea")?.focus();
      }));
      if (evidence && !inlineCheck) next.append(button("Catch-up notes", () => showEvidence()));
      if (completeCount < steps.length) next.append(button("Try the extra check", () => {
        Object.assign(state, {done: false, step: completeCount});
        write();
        renderStages();
        checkList.querySelector(".school-current-stage h3")?.focus();
      }));
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

  function showEvidence(target = state.step === 0 && model.querySelector("[data-catchup-first-evidence]") || model) {
    if (evidence) evidence.hidden = false;
    if (target.matches("details")) target.open = true;
    target.tabIndex = -1;
    target.focus({preventScroll: true});
    target.scrollIntoView({block: "start"});
  }

  function currentQuestion() {
    return !viewOnly && state.repeating && shownIndex === state.step && retry ? retry : steps[shownIndex];
  }

  function openCheck(index, review) {
    shownIndex = index;
    viewOnly = review;
    if (!review) {
      state.open = true;
      write();
    }
    if (inlineCheck && !review) {
      paused = false;
      renderStages();
    } else {
      if (inlineCheck) checkList.append(dialog);
      renderCheck();
      if (!inlineCheck && !dialog.open) dialog.showModal();
    }
    dialog.querySelector("h2").focus();
  }

  function pause() {
    if (!viewOnly) write();
    if (inlineCheck) {
      paused = !viewOnly;
      viewOnly = false;
      renderStages();
      checkList.querySelector(paused ? ".school-current-stage button" : "summary")?.focus({preventScroll: true});
      return;
    }
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
    if (state.repeating && !viewOnly) heading.before(element("p", state.explained ? "Follow-up check" : "Try one more on your own", "school-check-context"));
    addQuestionEvidence(q);
    if (viewOnly) {
      const status = supportStatus(state.outcomes?.[shownIndex]);
      if (status) dialog.append(element("p", status, "school-check-context"));
      dialog.append(element("p", q.answer), element("p", q.reasoning));
      if (shownIndex === steps.length - 1 && state.followUp && retry) {
        const followUp = element("details");
        followUp.append(element("summary", "Follow-up check"),
          element("p", supportStatus(state.followUp)), element("p", retry.prompt),
          element("p", retry.answer), element("p", retry.reasoning));
        dialog.append(followUp);
      }
      const notes = state.notes?.[shownIndex] || [];
      if (notes.length) dialog.append(element("h3", "Saved notes"), ...notes.map(note => element("p", note)));
      dialog.append(button("Close review", pause));
      return;
    }

    if (state.explained) {
      renderExplanation(q);
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

    const result = element("p", "", "school-check-feedback");
    result.setAttribute("role", "status");

    function showVerdict() {
      result.replaceChildren();
      if (!state.feedback || !state.selected) return;
      const [verdict, detail] = feedbackFor(q, state.selected);
      result.dataset.verdict = state.correct ? "correct" : "incorrect";
      result.append(element("strong", verdict), " " + detail);
    }
    showVerdict();

    const submit = element("button", "Check answer", "school-primary");
    submit.type = "submit";
    submit.hidden = Boolean(state.correct);
    const next = checkButton(nextLabel(), advance);
    next.hidden = !state.correct;
    const tools = element("div", "", "school-journey-actions");
    tools.append(submit, next);
    if (!inlineCheck) tools.append(button("Save and pause", pause));
    if (guided && q.guide) form.append(element("p", q.guide, "school-guided-prompt"));
    if (!inlineCheck && shownIndex === steps.length - 1 && !state.repeating) form.append(element("p", "Say how you know, then choose."));
    form.append(choices, result, tools);
    if (state.draft?.trim()) {
      const note = element("details");
      note.append(element("summary", "Saved note"), element("p", state.draft));
      form.append(note);
    }
    const support = element(inlineCheck ? "details" : "div", "", "school-check-support");
    if (inlineCheck) support.append(element("summary", "Need help?"));
    support.hidden = Boolean(state.correct);
    const clue = button("Need a clue?", () => {
      state.clues++;
      state.helped = true;
      write();
      renderClues();
      clueText.focus();
    });
    if (workedReview && state.step > 0) support.append(button("Revisit the worked example", () => {
      state.helped = true;
      pause();
      showEvidence(workedReview);
    }));
    const clueText = element("p", "", "school-clue");
    clueText.tabIndex = -1;
    function renderClues() {
      const first = q.clue || (Number(year) < 10 && q.hint) || (q.image || q.reference ? "Trace each label to the exact feature it points to."
        : q.teach ? "Think about the idea in “" + q.teach[0] + "”. Which option uses it?"
        : "Look for the option that fits the change in the question.");
      const second = q.clue || Number(year) >= 10 ? q.hint : "";
      clueText.hidden = !state.clues;
      clueText.textContent = state.clues > 1 && second ? second : first;
      clue.hidden = state.clues >= (second ? 2 : 1);
      clue.textContent = state.clues ? "Another clue" : "Need a clue?";
    }
    renderClues();
    support.append(clue, button("I don’t know — explain it", () => {
      state.helped = true;
      state.explained = true;
      write();
      renderCheck();
      dialog.querySelector(".school-check-explanation h3").focus();
    }), clueText);
    form.append(support);
    dialog.append(form);

    form.addEventListener("change", event => {
      if (event.target.name !== "answer") return;
      state.selected = event.target.value;
      state.feedback = "";
      showVerdict();
      write();
    });
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (state.correct || !state.selected) return;
      state.correct = state.selected === q.answer;
      if (!state.correct) state.helped = true;
      state.feedback = feedbackFor(q, state.selected).join(" ");
      write();
      showVerdict();
      if (state.correct) {
        support.hidden = true;
        choices.disabled = true;
        submit.hidden = true;
        next.firstChild.textContent = nextLabel();
        next.hidden = false;
        next.focus();
      }
    });
  }

  function nextLabel() {
    return shownIndex === steps.length - 1 && (!retry || state.repeating || !state.helped)
      ? "Finish guided checks" : "Continue";
  }

  function renderExplanation(q) {
    const section = element("section", "", "school-check-explanation");
    const heading = element("h3", "Explanation");
    heading.tabIndex = -1;
    section.append(heading, element("p", q.answer), element("p", q.reasoning));
    const example = q.options.find(option => option.label === state.selected && distractorFeedback(option, q))
      || q.options.find(option => distractorFeedback(option, q));
    const quickCheck = element("details");
    const compare = element("details");
    compare.append(element("summary", "Compare your reasoning"),
      element("p", example ? distractorFeedback(example, q) : q.reasoning));
    quickCheck.append(element("summary", "Quick check"),
      element("p", example ? "Why does “" + example.label + "” not fit here?" : "Say the key idea in your own words."),
      compare);
    section.append(quickCheck);
    const tools = element("div", "", "school-journey-actions");
    tools.append(checkButton(nextLabel(), advance));
    if (!inlineCheck) tools.append(button("Save and pause", pause));
    const visual = !q.image && !q.reference && model.querySelector(
      "[data-catchup-first-evidence], .catchup-model, .gcse-catchup-visual, .writing-data, .ks3-illustration, .ks3-visual");
    if (visual) tools.append(button("See lesson visual", () => {
      pause();
      showEvidence(visual);
    }));
    dialog.append(section, tools);
  }

  function advance() {
    const atEnd = state.step === steps.length - 1;
    const repeat = atEnd && retry && state.helped && !state.repeating;
    const {guide, worked} = currentQuestion();
    const usedSupport = state.helped || (guided && (guide || worked));
    const outcome = state.explained ? "explained" : usedSupport ? "supported" : "independent";
    if (state.repeating) state.followUp = outcome;
    else {
      state.outcomes ||= {};
      state.outcomes[state.step] = outcome;
    }
    if (state.draft?.trim()) {
      state.notes ||= {};
      state.notes[state.step] ||= [];
      state.notes[state.step].push(state.draft.trim());
    }
    Object.assign(state, {selected: "", feedback: "", draft: "",
      clues: 0, hintOpen: false, correct: false, helped: false, explained: false, repeating: Boolean(repeat)});
    if (repeat) {
      write();
      renderCheck();
      dialog.querySelector("h2").focus();
    } else {
      if (evidence && !inlineCheck) evidence.hidden = true;
      state.open = false;
      if (inlineCheck) paused = false;
      if (atEnd) state.done = true;
      else state.step++;
      if (inlineCheck) { write(); renderStages(); }
      else pause();
      checkList.querySelector(state.done ? ".school-completion h3" : ".school-current-stage h3")?.focus();
    }
  }

  dialog.addEventListener("cancel", event => { event.preventDefault(); pause(); });
  renderStages();
  if (!inlineCheck && state.open && !state.done && new URLSearchParams(location.search).has("resume")) showCheck();
}

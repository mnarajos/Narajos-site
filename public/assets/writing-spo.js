import { examples, rampExample } from "./writing-spo-examples.js";

function element(tag, content, className) {
  const node = document.createElement(tag);
  if (content) node.textContent = content;
  if (className) node.className = className;
  return node;
}

function button(label, action) {
  const control = element("button", label);
  control.type = "button";
  control.addEventListener("click", action);
  return control;
}

function disclosure(label, ...contents) {
  const panel = element("details");
  panel.append(element("summary", label), ...contents);
  return panel;
}

function savedField(id, label, initial = "") {
  const wrapper = element("div", "", "spo-field");
  const field = element("textarea");
  field.id = id;
  field.rows = 2;
  field.dataset.draft = "";
  field.maxLength = 1500;
  const heading = element("label", label);
  heading.htmlFor = id;
  const key = "narajos-paragraph:" + id;
  try { field.value = sessionStorage.getItem(key) ?? initial; } catch { field.value = initial; }
  field.addEventListener("input", () => {
    try { sessionStorage.setItem(key, field.value); } catch {}
  });
  wrapper.append(heading, field);
  return { wrapper, field };
}

function setValue(field, value) {
  field.value = value;
  field.dispatchEvent(new Event("input", { bubbles: true }));
}

function labelled(role, content, note, type) {
  const block = element("div", "", "spo-role spo-" + type);
  block.append(element("strong", role), element("p", content), element("small", note));
  return block;
}

function modelCard(example) {
  const mode = element("section", "", "spo-worked");
  const topic = labelled("Topic sentence", example.topic, "Give the reader the scientific idea you will explain.", "topic");
  const notes = element("ol", "", "spo-pairs");
  for (const [index, [note, sentence]] of example.details.entries()) {
    const item = element("li");
    item.append(labelled("Supporting note " + (index + 1), note, "A short reminder of the idea.", "note"),
      disclosure("Develop note " + (index + 1) + " into a sentence",
        labelled("Supporting sentence " + (index + 1), sentence, "Explain the idea so the reader can follow it.", "sentence")));
    notes.append(item);
  }
  const model = [example.topic, ...example.details.map(([, sentence]) => sentence), example.conclusion].join(" ");
  const zoom = button("Larger text", () => {
    const enlarged = mode.classList.toggle("spo-project");
    zoom.setAttribute("aria-pressed", String(enlarged));
  });
  zoom.setAttribute("aria-pressed", "false");
  mode.append(element("h3", "I do · Model the decisions"), zoom,
    element("p", example.prompt, "writing-example-question"),
    disclosure("Reveal the topic sentence", topic),
    disclosure("Reveal the notes and develop them", notes),
    disclosure("Reveal the concluding sentence",
      labelled("Concluding sentence", example.conclusion, "Say what the explanation shows or why it matters.", "conclusion")),
    disclosure("Read the assembled model", element("p", model, "model")));
  return mode;
}

function choicePractice(legend, choices) {
  const group = element("fieldset", "", "spo-choice");
  const status = element("p", "", "spo-status");
  status.setAttribute("role", "status");
  const buttons = choices.map(([sentence, feedback]) => button(sentence, event => {
    for (const candidate of buttons) candidate.setAttribute("aria-pressed", String(candidate === event.currentTarget));
    status.textContent = feedback;
  }));
  for (const control of buttons) control.setAttribute("aria-pressed", "false");
  group.append(element("legend", legend), ...buttons, status);
  return group;
}

export function mountIntroduction(card, id) {
  if (id.startsWith("gcse-")) return;
  const years = id === "alevel" ? [12, 13] : id === "gcse" ? [10, 11] : [7, 8, 9];
  const requested = Number(new URLSearchParams(location.search).get("year"));
  const year = years.includes(requested) ? requested : years[0];
  const example = id === "ramp" ? rampExample : examples[year];
  const intro = element("section", "", "spo-intro");
  intro.id = "spo-introduction";
  intro.setAttribute("aria-labelledby", "spo-intro-heading");
  const heading = element("h2", "Introduction to the SPO");
  heading.id = "spo-intro-heading";
  const definition = element("ul", "", "spo-roles");
  const roles = [
    ["Topic sentence", "A complete sentence that answers the question and gives the main idea.", "topic"],
    ["Supporting details", "Short notes in a logical order. Develop them into sentences when you write.", "note"],
    ["Concluding sentence", "A complete sentence that draws the explanation together.", "conclusion"]
  ];
  for (const [label, definitionText, type] of roles) {
    const item = element("li", "", "spo-role spo-" + type);
    item.append(element("strong", label), element("span", definitionText));
    definition.append(item);
  }
  intro.append(heading, element("p", "A single paragraph outline is a plan."), definition);
  if (id !== "ramp") {
    const yearNav = element("nav", "", "spo-year-links");
    yearNav.setAttribute("aria-label", "Choose a worked example");
    for (const option of years) {
      const link = element("a", "Year " + option);
      link.href = "?year=" + option + "#spo-introduction";
      if (option === year) link.setAttribute("aria-current", "page");
      yearNav.append(link);
    }
    intro.append(yearNav);
  }
  const guided = element("section", "", "spo-guided");
  const openingChoices = example.openingChoices ?? [
    ["There are several ideas to explain here.", "This is too vague. Name the scientific claim that your paragraph will explain."],
    [example.topic, "Correct. The reader knows what the explanation will develop."]
  ];
  const endingChoices = example.closingChoices ?? [
    [example.topic, "This repeats the opening. Bring the reasoning together to show its significance."],
    [example.conclusion, "Correct. This draws together the reasoning and says what it shows."]
  ];
  const rewrite = savedField(id + "-intro-rewrite-" + year, "Write a stronger topic sentence");
  guided.append(element("h3", "We do · Choose the opening and ending"),
    element("p", example.prompt), choicePractice("Which opening answers the question?", openingChoices),
    ...(id === "ramp" || year === 7 ? [choicePractice("Which note comes next after ‘different wheels and friction’?", [
      ["Different paint colours", "Paint colour does not explain the rolling distance in this experiment."],
      ["Different friction → different rolling distances", "Correct. This note links the difference between cars to the result."],
      ["Same car → car characteristics kept constant", "This belongs later. First explain how the differences between cars can affect the result."]
    ])] : []),
    choicePractice("Which ending draws the reasoning together?", endingChoices),
    disclosure("Try writing your own opening", rewrite.wrapper,
      disclosure("Compare with the model opening", element("p", example.topic, "model"))));
  const own = element("button", "You do · Plan your paragraph");
  own.type = "button";
  own.addEventListener("click", () => {
    const plan = card.querySelector("textarea[id$='-topic']");
    const container = plan?.closest("details.writing-step");
    if (container) container.open = true;
    plan?.focus();
  });
  const courseNotes = disclosure("Short exam answers", element("p",
    "Use the outline to practise developing an explanation. A short exam question may need only one or two sentences."));
  const connectors = disclosure("Connect ideas after planning", element("p",
    "Because gives a reason. But sets up a contrast. So gives a result. Choose a connective only when it makes the relationship clearer."),
  element("ul"));
  const list = connectors.querySelector("ul");
  for (const sample of [
    "Because: The comparison is fairer because the same car is used.",
    "But: The ramp height changes, but the car stays the same.",
    "So: The car stays the same, so differences in its wheels cannot explain the change in distance."
  ]) list.append(element("li", sample));
  connectors.append(choicePractice("Which word introduces the reason in ‘The comparison is fairer … the same car is used’?", [
    ["Because", "Correct. The words after ‘because’ explain why the comparison is fairer."],
    ["But", "Use ‘but’ for a contrast. The next words give the reason."],
    ["So", "Use ‘so’ to give a result. The next words tell us why."]
  ]));
  intro.append(disclosure("I do · Open the worked example", modelCard(example)),
    disclosure("We do · Practise the decisions", guided), own, courseNotes, connectors);
  const stimulus = card.querySelector("figure");
  if (stimulus) stimulus.after(intro);
  else card.prepend(intro);
}

const sessionKey = id => "narajos-writing-first-assembly:" + id;

export function mountDevelopment(card, id, fields, guide, resetOutlineReport) {
  const [topic, previousNote, conclusion] = fields;
  const paragraph = document.getElementById(id + "-paragraph");
  if (!paragraph) return null;
  const model = guide[1][1].split(/;\s*/);
  const older = previousNote.value.trim().split(/\n+/);
  const oldNotes = [older[0] || "", older[1] || "", older.slice(2).join("\n")];
  const plan = previousNote.closest("details.writing-step");
  const group = element("div", "", "spo-notes");
  group.append(element("p", "Jot down two or three ideas in the order you will explain them."));
  const notes = oldNotes.map((value, index) => {
    const item = savedField(id + "-note-" + (index + 1), "Supporting note " + (index + 1), value);
    group.append(item.wrapper);
    item.field.addEventListener("input", resetOutlineReport);
    return item.field;
  });
  previousNote.dataset.legacyOutline = "";
  previousNote.hidden = true;
  previousNote.removeAttribute("data-draft");
  const oldLabel = previousNote.labels[0];
  if (oldLabel) oldLabel.replaceWith(element("strong", "Supporting notes"));
  previousNote.after(group);

  const develops = element("div", "", "spo-development");
  const selectors = element("div", "", "spo-controls");
  const noteSummary = [];
  const slots = notes.map((note, index) => {
    const panel = element("div", "", "spo-develop-row");
    const cue = element("p", "", "spo-role spo-note");
    const detailLabel = element("strong", "Supporting note " + (index + 1));
    const detailValue = element("span");
    cue.append(detailLabel, detailValue);
    noteSummary.push(detailValue);
    const { wrapper, field } = savedField(id + "-expanded-" + (index + 1), "Supporting sentence " + (index + 1));
    field.setAttribute("aria-describedby", id + "-develop-instruction");
    panel.append(cue, wrapper);
    if (id === "ramp") {
      const [modelNote, modelLine] = rampExample.details[index];
      panel.append(disclosure("Compare with a worked pair",
        labelled("Model note", modelNote, "The idea in shorthand.", "note"),
        labelled("Model sentence", modelLine, "The same idea explained for a reader.", "sentence")));
    }
    develops.append(panel);
    return { panel, field };
  });
  const tabs = slots.map(({field}, index) => button("Develop note " + (index + 1), () => {
    show(index);
    field.focus();
  }));
  function show(index) {
    for (const [position, {panel}] of slots.entries()) {
      panel.hidden = index !== position;
      tabs[position].setAttribute("aria-pressed", String(index === position));
      noteSummary[position].textContent = notes[position].value.trim() || "Add this idea in your plan.";
    }
  }
  notes.forEach((note, index) => note.addEventListener("input", () => {
    noteSummary[index].textContent = note.value.trim() || "Add this idea in your plan.";
  }));
  selectors.append(...tabs);
  const instructions = element("p", "Turn each note into a sentence that makes sense by itself. A note can take more than one sentence.");
  instructions.id = id + "-develop-instruction";
  const develop = disclosure("Develop your supporting sentences", instructions, selectors, develops);
  develop.className = "writing-step";
  show(0);
  plan.after(develop);

  const assembly = element("div", "", "spo-assembly");
  const status = element("p", "", "spo-status");
  status.setAttribute("role", "status");
  const preview = element("textarea");
  preview.readOnly = true;
  preview.hidden = true;
  preview.rows = 4;
  preview.setAttribute("aria-label", "Reassembled version to compare");
  let first = "";
  try { first = sessionStorage.getItem(sessionKey(id)) || ""; } catch {}
  const original = element("p");
  const revised = element("p");
  const review = disclosure("Compare first and current versions",
    labelled("First version", "", "", "note"), labelled("Current version", "", "", "topic"));
  review.children[1].querySelector("p").replaceWith(original);
  review.children[2].querySelector("p").replaceWith(revised);
  function update() {
    review.hidden = !first;
    original.textContent = first;
    revised.textContent = paragraph.value || "Your current paragraph is empty.";
  }
  const assemble = button("Assemble my paragraph", () => {
    const active = slots.map(({field}, index) => [notes[index], field]).filter(([note, field]) => note.value.trim() || field.value.trim());
    const incomplete = active.find(([note, field]) => !note.value.trim() || !field.value.trim());
    if (!topic.value.trim() || !conclusion.value.trim() || active.length < 2 || incomplete) {
      status.textContent = "Add a topic sentence, at least two notes and their supporting sentences, and a concluding sentence.";
      return;
    }
    const text = [topic, ...active.map(([, field]) => field), conclusion].map(field => field.value.trim()).join(" ");
    if (paragraph.value.trim() && paragraph.value.trim() !== text) {
      preview.value = text;
      preview.hidden = false;
      status.textContent = "Your edited paragraph is still below. Compare it with this new assembly and copy across any changes you want.";
      preview.focus();
      return;
    }
    if (!first) {
      first = text;
      try { sessionStorage.setItem(sessionKey(id), first); } catch {}
    }
    setValue(paragraph, text);
    preview.hidden = true;
    update();
    status.textContent = "Your sentences are together. Read the paragraph, then improve one part if it needs changing.";
    paragraph.focus();
  });
  assembly.append(assemble, status, preview);
  const improve = disclosure("Improve your paragraph", element("ul"));
  for (const question of [
    "Does your opening answer the science question?",
    "Does each sentence build on the previous one and get the science right?",
    "Does the ending say what your reasoning shows or why it matters?",
    "Which sentence could you make clearer or more precise?"
  ]) improve.querySelector("ul").append(element("li", question));
  paragraph.before(assembly);
  paragraph.after(improve, review);
  paragraph.addEventListener("input", update);
  update();

  function fillScaffold(opening, parts) {
    if (!topic.value.trim()) setValue(topic, opening);
    if (notes.every(note => !note.value.trim())) {
      const seed = parts?.length ? parts : model.slice(0, 1);
      seed.slice(0, notes.length - 1).forEach((value, index) => setValue(notes[index], value));
    }
    (notes.find(note => !note.value.trim()) || notes[0]).focus();
  }
  return { notes, fillScaffold };
}

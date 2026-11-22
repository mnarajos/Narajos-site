import { reviewWriting } from "./writing-marking.js";
import { createRow } from "./writing-practice.js";

const messages = {
  empty: "Write a draft before checking it.",
  short: "You have a start. Read the feedback and decide what your reader still needs.",
  separate: "There are separate blocks or list points. Turn your notes into connected sentences.",
  connected: "Read your paragraph aloud. Check that each sentence follows from the one before it."
};

const normalise = text => text.toLowerCase().replace(/[−–]/g, "-").replace(/\s+/g, " ").trim();

for (const area of document.querySelectorAll("[data-writing-check]")) {
  const field = document.getElementById(area.dataset.writingCheck);
  const card = area.closest(".writing-card");
  const button = area.querySelector("button");
  const status = area.querySelector("[role=status]");
  const report = area.querySelector("[data-writing-report]");
  const results = report.querySelector("ul");
  const pilot = card.dataset.writingMark;
  const cues = Array.from(card.querySelectorAll("[data-look-for]"), item => ({
    question: item.textContent.trim(),
    signals: JSON.parse(item.dataset.lookFor).map(pattern => new RegExp(pattern, "i"))
  }));
  const focus = document.createElement("p");
  focus.className = "writing-next-step";
  const marked = document.createElement("ul");
  marked.className = "writing-mark-list";
  const detail = document.createElement("details");
  const summary = document.createElement("summary");
  summary.textContent = "Words and figures found";
  const guidance = report.querySelector("p");
  detail.append(summary, guidance, results);
  report.append(focus, marked, detail);

  field.addEventListener("input", () => {
    if (!report.hidden) status.textContent = "Draft changed. Check it again when you’re ready.";
    else if (status.textContent === messages.empty) status.textContent = "";
    report.hidden = true;
  });

  button.addEventListener("click", () => {
    const draft = field.value.trim();
    if (!draft) {
      status.textContent = messages.empty;
      field.focus();
      return;
    }

    const prose = normalise(draft);
    const criteria = pilot ? reviewWriting(pilot, "paragraph", draft) : [];
    const next = criteria.find(item => item.state === "revise") || criteria.find(item => item.state === "compare");
    const cue = cues.find(({ signals }) => signals.length && !signals.every(signal => signal.test(prose))) || cues[0];
    focus.textContent = next ? "Try one change. " + next.feedback :
      card.querySelector("[data-writing-order='ramp']") ? "Check the reasoning. If using a different car could change the distance, does your paragraph explain why that matters when testing ramp height?" :
      criteria.length ? "Now read your paragraph aloud. Can the reader follow how the science explains what happened?"
        : "Try one change. " + (cue?.question || "Check that every sentence helps answer the question.");
    marked.replaceChildren(...criteria.map(createRow));
    marked.hidden = !criteria.length;

    results.replaceChildren(...cues.map(({ question, signals }) => {
      const row = document.createElement("li");
      const matching = signals.map(signal => prose.match(signal)?.[0]).filter(Boolean);
      const lead = document.createElement("strong");
      lead.textContent = matching.length
        ? "Found in your draft: " + Array.from(new Set(matching)).map(phrase => "“" + phrase.trim() + "”").join(", ") + ". "
        : "Check this idea. ";
      row.append(lead, question);
      return row;
    }));
    detail.open = false;
    detail.hidden = !cues.length;
    const separate = /\n[ \t]*\n|(?:^|\n)[ \t]*(?:[-*•]|\d+[.)])[ \t]+/.test(draft);
    const sentences = draft.split(/[.!?]+(?=\s|$)/).filter(part => part.trim());
    status.textContent = separate ? messages.separate : sentences.length < 3 ? messages.short : messages.connected;
    if (criteria.some(item => item.kind === "reasoning")) status.textContent += " Compare any reasoning links with the model.";
    if (next) status.textContent += " " + next.feedback;
    report.hidden = false;
  });
  area.hidden = false;
  addCopyButton(card, area, field);
}

function addCopyButton(card, area, paragraph) {
  const panel = document.createElement("div");
  panel.className = "writing-share";
  const copy = document.createElement("button");
  copy.type = "button";
  copy.textContent = "Copy for teacher";
  const status = document.createElement("p");
  status.setAttribute("role", "status");
  const fallback = document.createElement("textarea");
  fallback.readOnly = true;
  fallback.setAttribute("aria-label", "Writing to copy for your teacher");
  fallback.rows = 5;
  fallback.hidden = true;
  panel.append(copy, status, fallback);
  (area.closest("details") || area).after(panel);

  copy.addEventListener("click", async () => {
    const heading = document.querySelector("main h1").textContent.trim();
    const task = card.querySelector('p[data-writing-cue="respond"]')?.textContent.trim();
    const lines = [];
    for (const activity of card.querySelectorAll("[data-writing-exercise]")) {
      const field = activity.querySelector("textarea");
      const current = field.value.trim();
      const first = activity.dataset.firstSentence;
      const prompt = field.labels[0].textContent.trim();
      if (first) lines.push(prompt + "\nFirst checked: " + first);
      if (current && current !== first) lines.push((first ? "Latest sentence: " : prompt + "\n") + current);
    }
    for (const field of card.querySelectorAll("textarea[data-draft]")) {
      if (field === paragraph || field.closest("[data-writing-exercise], .spo-intro") || !field.value.trim()) continue;
      const label = field.labels[0]?.textContent.trim().replace(/:$/, "");
      if (label) lines.push(label + ": " + field.value.trim());
    }
    if (paragraph.value.trim()) lines.push("Paragraph\n" + paragraph.value.trim());
    if (!lines.length) {
      status.textContent = "Write a sentence, outline, or draft first.";
      return;
    }

    const text = [heading, task, ...lines].filter(Boolean).join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      fallback.hidden = true;
      status.textContent = "Copied. You can paste it into the place your teacher asks you to use.";
    } catch (_) {
      fallback.value = text;
      fallback.hidden = false;
      fallback.focus();
      fallback.select();
      status.textContent = "Your writing is selected. Copy it using your device’s copy command.";
    }
  });
}

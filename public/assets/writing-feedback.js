(function () {
  "use strict";

  const feedbackMessages = {
    empty: "Write a draft before checking it.",
    short: "You have a start. Add supporting sentences and an ending, then check again.",
    separate: "There are separate blocks or list points. Use your notes to write one connected paragraph.",
    connected: "Read your paragraph aloud. Check that the opening answers the question and that each sentence follows from the one before it."
  };

  function normalise(text) {
    return text.toLowerCase().replace(/[−–]/g, "-").replace(/\s+/g, " ").trim();
  }

  for (const area of document.querySelectorAll("[data-writing-check]")) {
    const field = document.getElementById(area.dataset.writingCheck);
    const card = area.closest(".writing-card");
    const button = area.querySelector("button");
    const status = area.querySelector("[role=status]");
    const report = area.querySelector("[data-writing-report]");
    const results = report.querySelector("ul");
    const criteria = Array.from(card.querySelectorAll("[data-look-for]"), (item) => ({
      question: item.textContent.trim(),
      signals: JSON.parse(item.dataset.lookFor).map((pattern) => new RegExp(pattern, "i"))
    })).filter(({ signals }) => signals.length);

    function clearReport() {
      report.hidden = true;
      results.replaceChildren();
    }

    field.addEventListener("input", () => {
      if (!report.hidden) status.textContent = "Draft changed. Check it again when you’re ready.";
      else if (status.textContent === feedbackMessages.empty) status.textContent = "";
      clearReport();
    });

    button.addEventListener("click", () => {
      clearReport();
      const draft = field.value.trim();
      if (!draft) {
        status.textContent = feedbackMessages.empty;
        field.focus();
        return;
      }

      const separate = /\n[ \t]*\n|(?:^|\n)[ \t]*(?:[-*•]|\d+[.)])[ \t]+/.test(draft);
      const sentences = draft.split(/[.!?]+(?=\s|$)/).filter((part) => part.trim());
      let message = feedbackMessages.connected;
      if (separate) message = feedbackMessages.separate;
      else if (sentences.length < 3) message = feedbackMessages.short;

      const prose = normalise(draft);
      for (const { question, signals } of criteria) {
        const row = document.createElement("li");
        const matching = signals.map((signal) => prose.match(signal)?.[0]).filter(Boolean);
        const lead = document.createElement("strong");
        lead.textContent = matching.length
          ? "Found in your draft: " + Array.from(new Set(matching)).map((phrase) => "“" + phrase.trim() + "”").join(", ") + ". "
          : "Check whether you’ve included this. ";
        row.append(lead, question);
        results.append(row);
      }
      report.hidden = false;
      status.textContent = message + " Review the checks below.";
    });
    area.hidden = false;
  }
})();

(function () {
  "use strict";

  const attempts = new WeakMap();

  document.addEventListener("click", (event) => {
    const choice = event.target.closest("button[data-feedback]");
    const question = choice?.closest("[data-catchup-check]");
    if (!question) return;

    let attempt = attempts.get(question);
    if (!attempt) {
      attempt = { missed: false, solved: false };
      attempts.set(question, attempt);
    }
    const alreadySelected = choice.getAttribute("aria-pressed") === "true";
    for (const button of question.querySelectorAll("button[data-feedback]")) {
      button.setAttribute("aria-pressed", String(button === choice));
    }
    const status = question.querySelector("[role=status]");
    if (!choice.hasAttribute("data-correct")) {
      if (!attempt.solved) attempt.missed = true;
      status.textContent = choice.dataset.feedback;
      return;
    }
    if (alreadySelected && attempt.solved) return;
    status.innerHTML = window.KeystoneFeedback?.markup(attempt.missed ? "corrected" : "correct", {
      key: question.querySelector("h3").textContent,
      animate: !attempt.solved
    }) ?? "Correct.";
    status.append(" ", choice.dataset.feedback);
    attempt.solved = true;
  });
})();

(function () {
  "use strict";

  document.addEventListener("click", (event) => {
    const choice = event.target.closest("button[data-feedback]");
    const question = choice?.closest("[data-catchup-check]");
    if (!question) return;

    for (const button of question.querySelectorAll("button[data-feedback]")) {
      button.setAttribute("aria-pressed", String(button === choice));
    }
    question.querySelector("[role=status]").textContent = choice.dataset.feedback;
  });
})();

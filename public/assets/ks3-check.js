(function(){
  "use strict";

  for (const question of document.querySelectorAll("[data-catchup-check]")) {
    const feedback = question.querySelector("[role=status]");
    for (const choice of question.querySelectorAll("button[data-feedback]")) {
      choice.addEventListener("click", function() {
        for (const button of question.querySelectorAll("button[data-feedback]")) {
          button.setAttribute("aria-pressed", String(button === choice));
        }
        feedback.textContent = choice.dataset.feedback;
      });
    }
  }
})();

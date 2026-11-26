(function () {
  "use strict";
  const vocabulary = window.NarajosVocabularyEngine.create({ entries: window.ALevelVocabularyData || [] });
  window.NarajosVocabulary = { append: vocabulary.append };
  window.ALevelVocabulary = vocabulary;

  const standalone = document.querySelector("[data-word-help-page]");
  if (standalone) {
    vocabulary.mount(standalone, { context: standalone.dataset.wordHelpPage, visible: true, sectional: true });
    for (const exercise of standalone.querySelectorAll("[data-word-help-incidental]")) {
      vocabulary.setAssessment(exercise, { incidental: exercise.dataset.wordHelpIncidental.split(" ") });
    }
    for (const review of standalone.querySelectorAll("[data-word-help-review]")) vocabulary.setAssessment(review, { completed: true });
  }
})();

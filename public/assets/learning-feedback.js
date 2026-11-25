(function (root) {
  "use strict";

  const praise = ["Correct!", "Well done!", "Nicely done!", "That’s right!"];
  const labels = {
    corrected: "You corrected your mistake!",
    complete: "Activity complete"
  };
  const tick = '<path class="learning-feedback__tick" d="m5 11 4 4 8-8" pathLength="1"/>';
  const star = '<path class="learning-feedback__star" d="M11 4c.7 4 2 5.3 6 6-4 .7-5.3 2-6 6-.7-4-2-5.3-6-6 4-.7 5.3-2 6-6Z"/>';
  const accent = '<path class="learning-feedback__accent" d="M20 2c.3 1.9 1.1 2.7 3 3-1.9.3-2.7 1.1-3 3-.3-1.9-1.1-2.7-3-3 1.9-.3 2.7-1.1 3-3Z"/>';
  const glints = '<path class="learning-feedback__glints" d="m3 5-1-2m17 13 2 1"/>';

  function praiseFor(key) {
    let index = Number.isSafeInteger(key) ? key : 0;
    if (typeof key === "string") {
      for (const character of key) index = (31 * index + character.codePointAt(0)) >>> 0;
    }
    return praise[Math.abs(index % praise.length)];
  }

  function markup(kind, { key, animate = false, label } = {}) {
    if (kind !== "correct" && !Object.hasOwn(labels, kind)) return "";
    const text = String(label ?? (kind === "correct" ? praiseFor(key) : labels[kind]))
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const icon = (kind === "complete" ? star : tick) + accent + (kind === "correct" ? "" : glints);
    return `<span class="learning-feedback" data-learning-feedback="${kind}"${animate ? " data-feedback-animate" : ""}><svg class="learning-feedback__icon" viewBox="0 0 24 20" aria-hidden="true" focusable="false">${icon}</svg>${text}</span>`;
  }

  root.KeystoneFeedback = { markup };
})(window);

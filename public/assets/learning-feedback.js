(function (root) {
  "use strict";

  const praise = ["Correct!", "Well done!", "Nicely done!", "That’s right!"];
  const labels = {
    corrected: "You corrected your mistake!",
    complete: "Activity complete"
  };
  const tick = '<path class="learning-feedback__tick" d="m8.5 13.5 2.8 3 5.6-6" pathLength="1"/>';
  const star = '<path class="learning-feedback__star" d="M13 7.5c.7 3.8 2.2 5.3 6 6-3.8.7-5.3 2.2-6 6-.7-3.8-2.2-5.3-6-6 3.8-.7 5.3-2.2 6-6Z"/>';
  const disc = '<circle class="learning-feedback__disc" cx="13" cy="13.5" r="8.7"/>';
  const accents = '<path class="learning-feedback__accent" d="M24.5 2.5a5 5 0 0 0 4 4 5 5 0 0 0-4 4 5 5 0 0 0-4-4 5 5 0 0 0 4-4Z"/>' +
    '<path class="learning-feedback__accent learning-feedback__accent--small" d="M26.5 14.5a3 3 0 0 0 2.5 2.5 3 3 0 0 0-2.5 2.5A3 3 0 0 0 24 17a3 3 0 0 0 2.5-2.5Z"/>';
  const glints = '<path class="learning-feedback__glints" d="M5 5 3.4 3.6M4.4 17l-2 .8M20.2 20.6l2 1.6"/>';

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
    const mark = `<g class="learning-feedback__mark">${disc}${kind === "complete" ? star : tick}</g>`;
    const icon = mark + accents + (kind === "correct" ? "" : glints);
    return `<span class="learning-feedback" data-learning-feedback="${kind}"${animate ? " data-feedback-animate" : ""}><svg class="learning-feedback__icon" viewBox="0 0 32 26" aria-hidden="true" focusable="false">${icon}</svg>${text}</span>`;
  }

  root.KeystoneFeedback = { markup };
})(window);

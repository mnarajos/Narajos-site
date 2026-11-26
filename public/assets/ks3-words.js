// Bracketed terms are authored first-use annotations. The shared word-help
// engine resolves them against the KS3 reference in the current lesson.
function termButton(label, key = label.toLowerCase()) {
  const id = "ks3-" + key.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  if (!window.SiteVocabularyData?.some(entry => entry.id === id)) return document.createTextNode(label);
  const span = document.createElement("span");
  span.dataset.contextVocabulary = id;
  span.textContent = label;
  return span;
}

// Square brackets mark first-use science vocabulary. Asterisks mark a brief everyday phrase.
export function scienceParagraph(copy) {
  const paragraph = document.createElement("p");
  let start = 0;
  for (const mark of copy.matchAll(/\[([^\]]+)\]|\*([^*]+)\*/g)) {
    paragraph.append(copy.slice(start, mark.index));
    if (mark[1]) {
      const [label, key] = mark[1].split("|");
      paragraph.append(termButton(label, key));
    } else {
      const phrase = document.createElement("em");
      phrase.textContent = mark[2];
      paragraph.append(phrase);
    }
    start = mark.index + mark[0].length;
  }
  paragraph.append(copy.slice(start));
  return paragraph;
}

for (const term of document.querySelectorAll("strong[data-ks3-term]")) {
  term.dataset.contextVocabulary = "ks3-" + term.dataset.ks3Term.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

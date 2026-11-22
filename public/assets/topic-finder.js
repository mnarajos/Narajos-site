/* Shared course search. Paths belong to the app that supplies each result. */
(function(){
  "use strict";
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function mount(container, options) {
    const panel = container.querySelector("[data-topic-finder]");
    if (!panel) return;
    const search = panel.querySelector("input");
    const filter = panel.querySelector("select");
    const feedback = panel.querySelector("[role=status]");
    const results = panel.querySelector("ul");
    for (const group of options.groups) {
      const option = element("option", group.label);
      option.value = group.id;
      filter.append(option);
    }

    function update() {
      const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
      const group = filter.value;
      results.replaceChildren();
      if (!terms.length && !group) {
        feedback.textContent = "";
        return;
      }
      const entries = typeof options.entries === "function" ? options.entries() : options.entries;
      const matches = entries.filter(entry => {
        if (group && entry.group !== group) return false;
        if (entry.concept && !terms.length) return false;
        const words = [entry.title, entry.concept ? "" : entry.context, entry.keywords].join(" ").toLowerCase();
        return terms.every(term => words.includes(term));
      });
      matches.sort((a, b) => {
        const query = terms.join(" ");
        const score = (entry) => {
          const title = entry.title.toLowerCase();
          return (title === query ? 4 : title.startsWith(query) && query ? 2 : 0) + (entry.concept ? 1 : 0);
        };
        return score(b) - score(a);
      });
      feedback.textContent = matches.length
        ? matches.length + (matches.length === 1 ? " result" : " results")
        : "No matching topics. Try a shorter term or choose a different subject or unit.";
      for (const entry of matches) {
        const item = element("li", "", "study-finder-result");
        item.append(element("small", entry.context), element("strong", entry.title));
        const actions = element("div", "", "study-finder-actions");
        for (const [label, href] of entry.actions) {
          const link = element("a", label);
          link.href = href;
          link.setAttribute("aria-label", label + ": " + entry.title);
          actions.append(link);
        }
        item.append(actions);
        results.append(item);
      }
    }

    search.addEventListener("input", update);
    filter.addEventListener("change", update);
    panel.addEventListener("study-tier-change", update);
  }

  const diagramTopics = {
    "/gcse/": [["I–V circuit","iv-circuit"],["Electrolysis","electrolysis"]],
    "/alevel/": [["Nephron","nephron"],["Sarcomere","sarcomere"]],
    "/human-biology/": [["Breathing","breathing"],["Blood pressure","cuff"],["Antibodies","antibody"]]
  };
  const diagrams = typeof location !== "undefined" ? diagramTopics[location.pathname] || [] : [];
  const diagramLinks = diagrams.length ? '<div class="study-finder-actions">' + diagrams.map(([title, id]) =>
    '<a href="/diagram-practice/#' + id + '">' + title + ' diagram practice</a>').join("") + '</div>' : "";
  const markup = '<section class="study-finder" data-topic-finder aria-labelledby="study-find-heading">' +
    '<h2 id="study-find-heading">Find a topic</h2>' +
    '<div class="study-finder-fields"><label>Topic or keyword<input type="search" placeholder="Try enzymes or cells"></label>' +
    '<label>Subject or unit<select><option value="">All</option></select></label></div>' +
    '<p role="status"></p><ul aria-label="Topic results"></ul>' + diagramLinks + '</section>';
  window.NarajosTopicFinder = {markup, mount};
})();

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

  const markup = '<section class="study-finder" data-topic-finder aria-labelledby="study-find-heading">' +
    '<h2 id="study-find-heading">Find a topic</h2>' +
    '<div class="study-finder-fields"><label>Topic or keyword<input type="search" placeholder="Try enzymes or cells"></label>' +
    '<label>Subject or unit<select><option value="">All</option></select></label></div>' +
    '<p role="status"></p><ul aria-label="Topic results"></ul>' + '</section>';
  const practiceTopics = {
    c1: [["distillation", "Simple distillation"]],
    c4: [["electrolysis", "Electrolysis in solution"]],
    p2: [["iv-circuit", "Measuring current and potential difference"]],
    b2: [["leaf", "Leaf structure and gas exchange"]],
    b6: [["inheritance", "Inheritance grids"]],
    a3: [["phloem", "The mass flow hypothesis"]],
    a6: [["synapse", "Synaptic transmission"], ["sarcomere", "Sliding filaments"], ["nephron", "The nephron"]]
  };

  function topicPractice(topicId) {
    const activities = practiceTopics[topicId];
    if (!activities || !document.head) return "";
    if (!document.querySelector('script[src="/assets/diagram-practice.js"]')) {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "/assets/diagram-practice.css";
      const script = document.createElement("script");
      script.type = "module";
      script.src = "/assets/diagram-practice.js";
      document.head.append(css, script);
    }
    const requested = new URLSearchParams(location.search).get("activity");
    return activities.map(([id, title]) =>
      '<details class="topic-diagram-activity"' + (id === requested ? ' open' : '') + '><summary>' + title +
      ' · Diagram and questions</summary><diagram-practice topic="' + id + '"></diagram-practice></details>'
    ).join("");
  }

  window.NarajosTopicFinder = {markup, mount, topicPractice};
})();

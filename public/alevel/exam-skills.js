(function () {
  "use strict";
  const families = window.ALevelTeachingFamilies;
  const drawing = window.ALevelDrawingBank;
  const storageKey = "keystone.alevel.exam-skills.v1";
  function read() {
    try {
      const data = JSON.parse(localStorage.getItem(storageKey));
      return data && typeof data === "object" && !Array.isArray(data)
        ? data
        : {};
    } catch {
      return {};
    }
  }
  function save(value) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }
  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined && text !== null) element.textContent = text;
    if (className) element.className = className;
    return element;
  }
  function button(text, action) {
    const b = node("button", text, "btn");
    b.type = "button";
    b.onclick = action;
    return b;
  }
  function link(text, href) {
    const a = node("a", text, "btn");
    a.href = href;
    return a;
  }
  function focus(element) {
    element.tabIndex = -1;
    element.focus();
  }
  function table(caption, headers, rows, highlights = []) {
    const wrap = node("div", null, "al-table"),
      t = node("table");
    t.createCaption().textContent = caption;
    const hr = t.createTHead().insertRow();
    headers.forEach((h, i) => {
      const th = node("th", h);
      th.scope = "col";
      if (highlights.includes(i)) th.classList.add("al-highlight-cell");
      hr.append(th);
    });
    const body = t.createTBody();
    rows.forEach((row) => {
      const r = body.insertRow();
      row.forEach((value, i) => {
        const cell = node(i ? "td" : "th", value);
        if (!i) cell.scope = "row";
        if (highlights.includes(i)) cell.classList.add("al-highlight-cell");
        r.append(cell);
      });
    });
    wrap.append(t);
    return wrap;
  }
  function pressureGraph(step) {
    const samples = [
      [0, 7, 5, 82], [.12, 10, 7, 78], [.20, 8, 35, 75], [.28, 7, 86, 74],
      [.36, 7, 115, 112], [.45, 8, 106, 101], [.50, 9, 90, 93], [.57, 10, 40, 86],
      [.65, 9, 7, 82], [.72, 7, 5, 79], [.80, 7, 5, 77],
    ];
    const traces = [
      ["Atrium", "2 4"], ["Ventricle", ""], ["Aorta", "8 5"],
    ];
    const stages = [
      [null, "Compare the pressure on opposite sides of one valve."],
      ["B", "After B, ventricular pressure exceeds atrial pressure. The mitral valve closes."],
      [null, "Between B and C, ventricular pressure is above atrial pressure and below aortic pressure. Both valves are closed."],
      ["C", "After C, ventricular pressure exceeds aortic pressure. The aortic valve opens."],
      ["D", "After D, aortic pressure exceeds ventricular pressure. The aortic valve closes."],
      ["E", "After E, atrial pressure exceeds ventricular pressure. The mitral valve opens."],
    ];
    const [mark, explanation] = stages[step] || ["D", "At D, the falling ventricular trace crosses the aortic trace."];
    const x = t => 42 + 280 * t / .8;
    const y = p => 185 - 1.18 * p;
    function crossover(name, other, at) {
      const a = samples[at], b = samples[at + 1];
      const delta = a[2] - a[other];
      const fraction = delta / (delta - (b[2] - b[other]));
      return { name, x: x(a[0] + fraction * (b[0] - a[0])), y: y(a[2] + fraction * (b[2] - a[2])) };
    }
    const points = [crossover("B", 1, 1), crossover("C", 3, 2), crossover("D", 3, 5), crossover("E", 1, 7)];
    const comparison = step === 1 || step === 5 ? [0, 1] : step === 0 || step === 2 ? [0, 1, 2] : [1, 2];
    const paths = traces.map(([name, dash], i) => {
      const line = samples.map(sample => x(sample[0]).toFixed(2) + "," + y(sample[i + 1]).toFixed(2)).join(" ");
      return '<polyline data-trace="' + name + '" class="' + (comparison.includes(i) ? "al-trace-current" : "al-trace-context") +
        '" points="' + line + '" stroke-dasharray="' + dash + '"/>';
    }).join("");
    const markers = points.map(({name, x: cx, y: cy}) =>
      '<g data-crossover="' + name + '"' + (mark === name ? ' class="al-crossover-current"' : '') +
      '><circle cx="' + cx + '" cy="' + cy + '" r="' + (mark === name ? 6 : 3) +
      '"/><text x="' + (cx + 8) + '" y="' + (cy - 7) + '">' + name + '</text></g>').join("");
    const figure = node("figure", null, "al-science-plot");
    figure.innerHTML = '<svg role="img" aria-label="Illustrative left-heart pressures. The solid trace represents the ventricle, the dashed trace the aorta and the dotted trace the atrium. ' +
      explanation + '" viewBox="0 0 350 229"><g stroke="currentColor" fill="none"><path d="M42 25V185H328"/>' +
      paths + '</g>' + markers + '<text x="42" y="18">Pressure / mmHg</text><text x="45" y="210">Time after start / s</text>' +
      '<text x="6" y="188">0</text><text x="6" y="71">100</text><text x="286" y="210">0.8</text></svg>';
    figure.append(node("figcaption", explanation),
      node("p", "Solid: ventricle · dashed: aorta · dotted: atrium", "al-figure-key"));
    return figure;
  }

  function graph() {
    const figure = node("figure", null, "al-science-plot");
    figure.innerHTML =
      '<svg role="img" aria-label="Plant-tissue calibration. The best-fit line crosses zero percentage change in mass at minus 400 kPa." viewBox="0 0 360 245"><g fill="none" stroke="currentColor"><path d="M40 15V190H330"/><polyline stroke-width="2.5" points="55,164 115,130 175,96 235,62 295,28"/><path stroke-dasharray="4 4" d="M40 96H320M175 96V190"/></g><text x="43" y="208">−800</text><text x="156" y="208">−400</text><text x="290" y="208">0</text><text x="16" y="100">0</text><text x="8" y="168">−10</text><text x="12" y="31">10</text><text x="65" y="235">Solution water potential / kPa</text><text x="42" y="16">Change in mass / %</text></svg>';
    figure.append(node("figcaption", "Read across from zero change, then down to the water potential axis."));
    return figure;
  }

  function pathway(step) {
    const box = node("figure", null, "al-causal-visual");
    function line(parts, active = -1) {
      const diagram = node("p", null, "al-causal-line");
      parts.forEach((part, i) => {
        const term = ["→", "┤"].includes(part) ? node("span", part, "al-causal-edge") : node("span", part, "al-causal-node");
        if (part === "→" || part === "┤") {
          term.setAttribute("aria-hidden", "true");
          diagram.append(term, node("span", part === "→" ? "promotes" : "inhibits", "al-edge-label"));
        } else diagram.append(term);
        if (i === active) term.classList.add("al-causal-focus");
      });
      box.append(diagram);
    }
    if (step === 0) {
      line(["Signal", "→", "Target"]);
      line(["Inhibitor", "┤", "Target"]);
    } else if (step === 1 || step === 2 || step === "enzyme") {
      line(["Reversible inhibitor", "┤", "Protease (enzyme)"], step === "enzyme" ? -1 : step === 1 ? 1 : 2);
      line(["Protease", "→", "Hydrolysis"], step === 1 ? 2 : -1);
      box.append(node("p", "Protein substrate → shorter peptide products"));
    } else if (step === 3 || step === 4 || step === "double") {
      line(["A", "┤", "B", "┤", "C"], step === "double" ? -1 : step === 3 ? 1 : 3);
    } else if (step === 5 || step === "neural") {
      line(["Excitatory input", "→", "Postsynaptic neurone"]);
      line(["Inhibitory neurone", "┤", "Postsynaptic neurone"], step === "neural" ? -1 : 1);
      if (step === 5) box.append(node("p", "Less inhibition makes reaching threshold more likely if other inputs stay the same."));
    } else {
      line(["Activation", "→", "Enzyme activity"]);
      line(["Inhibitor", "┤", "Enzyme activity"]);
    }
    return box;
  }

  function visual(type, step = 99) {
    if (type === "calibration") return graph();
    if (type === "pressure") return pressureGraph(step);
    if (type === "countercurrent") {
      const box = node("div");
      const columns = ["Fluid", "Left", "2", "3", "Right"];
      const counter = ["Countercurrent model · oxygen concentration", columns,
        [["Water →", 100, 80, 60, 40], ["Blood ←", 90, 70, 50, 30]]];
      const parallel = ["Parallel-flow model · oxygen concentration", columns,
        [["Water →", 100, 75, 60, 55], ["Blood →", 10, 35, 50, 55]]];
      if (step < 3) {
        box.append(table(...counter, step < 2 ? [3] : [1, 2, 3, 4]));
        if (step >= 2) box.append(node("p", "At each paired position, water has 10 more units of oxygen than blood."));
      } else {
        box.append(table(...parallel, [4]), node("p", "At the right, both fluids are at 55 units. The model shows no concentration gradient there."));
        const comparison = node("details", null, "al-key-notes");
        comparison.append(node("summary", "Compare the countercurrent values"), table(...counter));
        box.append(comparison);
      }
      return box;
    }
    if (type === "punnett") {
      const gametes = ["AB", "Ab", "aB", "ab"];
      const box = node("div");
      if (step < 2) {
        box.append(node("p", "AaBb × AaBb", "al-cross"));
        if (step === 1) box.append(node("p", "Gametes for each parent · AB, Ab, aB, ab"));
      } else {
        const combine = (x, y) => [x[0], y[0]].sort().join("") + [x[1], y[1]].sort().join("");
        const title = step === 2 ? "Put one parent's gametes along each edge" :
          step === 3 ? "Combine the highlighted row and column" : "AaBb × AaBb · worked cross";
        box.append(table(title, ["Gametes", ...gametes], gametes.map((x, i) =>
          [x, ...gametes.map((y, j) => step >= 4 || (step === 3 && i === 0 && j === 0) ? combine(x, y) : "—")]),
        step === 3 ? [1] : []));
        if (step >= 5) box.append(node("p", "Expected phenotypes · 9 A_B_ : 3 A_bb : 3 aaB_ : 1 aabb"));
      }
      return box;
    }
    if (type === "calvin") {
      const parts = [
        "CO₂ + RuBP (5C) → unstable 6C → 2 GP (3C)",
        "GP + ATP + reduced NADP → TP + NADP",
        "Most TP + ATP → RuBP regenerated",
        "Net TP → carbohydrates, lipids, and other organic compounds",
      ];
      const box = node("div", null, "al-path");
      parts.slice(0, Math.min(parts.length, step + 1)).forEach(p => box.append(node("p", p)));
      return box;
    }
    if (type === "regulation") {
      const box = node("div", null, "al-science-plot");
      box.innerHTML =
        '<svg viewBox="0 0 400 235" role="img" aria-label="Two regulatory models. Closely packed nucleosomes restrict access to DNA. Acetylated, more separated nucleosomes permit greater access. A repressor bound at regulatory DNA inhibits transcription, and removal of it reduces repression."><g fill="none" stroke="currentColor" stroke-width="2"><path d="M20 68Q55 25 90 68T160 68T230 68"/><circle cx="65" cy="63" r="20"/><circle cx="108" cy="63" r="20"/><circle cx="151" cy="63" r="20"/><path d="M20 158Q60 110 100 158T180 158T260 158T340 158"/><circle cx="63" cy="151" r="17"/><circle cx="162" cy="151" r="17"/><circle cx="261" cy="151" r="17"/></g><text x="20" y="20">Compact chromatin · access restricted</text><text x="20" y="111">Histone acetylation · access increased</text><text x="20" y="197">Promoter methylation can reduce access.</text><text x="20" y="222">Repressor ┤ transcription</text></svg>';
      return box;
    }
    if (type === "pathway") return pathway(step);
    if (type?.startsWith("pathway-")) return pathway(type.slice("pathway-".length));
    return node("div");
  }
  const icons = {
    idea: '<path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z"/>',
    model: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    guided: '<path d="m3 6 1 1 2-2m-3 7 1 1 2-2m-3 7 1 1 2-2M9 6h12M9 12h12M9 18h12"/>',
    independent: '<path d="M5 5h14v14H5zM9 12h6m-3-3v6"/>',
    review: '<path d="M9 4H5v16h14V4h-4M9 3h6v4H9zm0 11 2 2 4-4"/>',
    bulb: '<path d="M9 19h6m-4 3h2M9 16c0-2-3-3-3-7a6 6 0 1 1 12 0c0 4-3 5-3 7Z"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    retry: '<path d="M4 11a8 8 0 1 1 1 6m-1-6V5m0 6h6"/>',
    pen: '<path d="m5 16-1 4 4-1L20 7l-3-3ZM14 7l3 3"/>',
    calculator: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8m-8 5h2m4 0h2m-8 4h2m4 0h2"/>',
    pathway: '<path d="M4 5h7v6H4zM13 13h7v6h-7zM11 8h5v5M8 11v5h5"/>',
    diagram: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="10" r="1"/><path d="m4 17 5-4 3 3 4-5 5 5"/>',
  };

  function icon(name) {
    const element = node("span", null, "al-icon");
    element.setAttribute("aria-hidden", "true");
    element.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + icons[name] + "</svg>";
    return element;
  }

  const stages = [
    ["idea", "Key idea"], ["model", "Worked example"], ["guided", "With support"],
    ["independent", "Your turn"], ["review", "Review"],
  ];

  function stageBar(sequence = stages) {
    const list = node("ol", null, "al-stages");
    list.setAttribute("aria-label", "Learning stages");
    list.setAttribute("role", "list");
    for (const [id, label] of sequence) {
      const item = node("li");
      item.dataset.stage = id;
      item.append(icon(id), node("span", label));
      list.append(item);
    }
    return list;
  }

  function currentStage(bar, id, symbol) {
    for (const item of bar.children) {
      if (item.dataset.stage === id) {
        item.setAttribute("aria-current", "step");
        if (symbol && item.dataset.icon !== symbol) {
          item.firstChild.replaceWith(icon(symbol));
          item.dataset.icon = symbol;
        }
      } else item.removeAttribute("aria-current");
    }
  }

  function model(host, family, state, persist, finish, revisiting = false) {
    const block = node("section", null, "al-teaching al-model");
    const heading = node("h2", "Worked example");
    const panel = node("div", null, "al-step");
    panel.setAttribute("aria-live", "polite");
    panel.setAttribute("aria-atomic", "true");
    const art = node("div", null, "al-model-visual");
    const controls = node("div", null, "al-controls");
    const last = family.model.length - 1;
    let index = Math.min(last, Math.max(0, state.modelIndex || 0));
    function show(i) {
      index = i;
      state.modelIndex = index;
      persist();
      update();
    }
    const previous = button("Previous step", () => show(index - 1));
    const next = button("Next step", () => index < last ? show(index + 1) : finish());
    next.classList.add("primary");
    const replay = button("Replay example", () => {
      show(0);
      next.focus();
    });
    controls.append(next, previous, replay);
    block.append(heading, panel, art, controls);
    host.append(block);
    function update() {
      panel.replaceChildren(node("p", family.model[index]),
        node("p", (index + 1) + " of " + (last + 1), "al-task-count"));
      art.replaceChildren(visual(family.visual, index));
      previous.disabled = index === 0;
      next.textContent = index < last ? "Next step" : revisiting ? "Back to the question" : "Try with support";
      replay.hidden = index === 0;
    }
    update();
    return block;
  }

  function journey(host, family, options = {}) {
    const state = loadFamily(family);
    const savedPractice = ["outcomes", "drafts", "hints", "responses", "reviews"].some(field => Object.keys(state[field]).length);
    state.phase ||= savedPractice || state.completed ? "practice" : "idea";
    const persist = () => saveFamily(family, state);
    const bar = stageBar();
    const active = node("div", null, "al-journey-stage");
    const secondary = node("div", null, "al-journey-links");
    host.append(bar, active, secondary);

    function practiseNow(moveFocus, independent = false) {
      if (independent) {
        state.queue = family.tasks.flatMap((q, i) => q.guided ? [] : [i]);
        state.index = state.queue[0];
      }
      state.phase = "practice";
      persist();
      show(moveFocus);
    }

    function show(moveFocus = false) {
      active.replaceChildren();
      secondary.replaceChildren();
      if (state.phase === "idea") {
        currentStage(bar, "idea");
        const heading = node("h2", "Key idea");
        const panel = node("section", null, "al-teaching al-key");
        const start = button("See worked example", () => {
          state.phase = "model";
          persist();
          show(true);
        });
        start.classList.add("primary");
        panel.append(heading, node("p", family.principle));
        if (options.notes) panel.append(options.notes);
        panel.append(start);
        active.append(panel);
        if (moveFocus) focus(heading);
      } else if (state.phase === "model") {
        currentStage(bar, "model");
        const content = model(active, family, state, persist, () => practiseNow(true));
        const key = button("Review the key idea", () => {
          state.phase = "idea";
          persist();
          show(true);
        });
        key.classList.add("al-secondary");
        secondary.append(key);
        if (moveFocus) focus(content.querySelector("h2"));
      } else {
        const review = node("details", null, "al-review-example");
        const content = practise(active, family, state, {
          stage: (id, symbol) => currentStage(bar, id, symbol),
          context: options.context,
          moved: () => { review.open = false; },
        });
        review.append(node("summary", "Review the worked example"));
        review.ontoggle = () => {
          if (!review.open) return;
          if (!review.querySelector(".al-model")) {
            model(review, family, state, persist, () => {
              review.open = false;
              focus(content.querySelector("h3, h2"));
            }, true);
          }
          if (!state.completed && !state.outcomes[state.index] && !family.tasks[state.index].guided) {
            state.modelAssists[state.index] = true;
            persist();
          }
        };
        secondary.append(review);
        if (moveFocus) focus(content.querySelector("h2"));
      }
      if (state.phase !== "practice") {
        const skip = button("Go straight to questions", () => practiseNow(true, true));
        skip.classList.add("al-secondary");
        secondary.append(skip);
      }
      if (options.extra) secondary.append(options.extra);
    }
    show();
  }
  const outcomeNames = {
    independent: "Independently correct",
    "hint-supported": "Correct with a clue",
    corrected: "Correct after correction",
    "model-supported": "Correct after revisiting the model",
    guided: "Correct in guided practice",
    "self-reviewed": "Written response self-reviewed",
    "needs-practice": "Still needs practice",
  };

  function loadFamily(family) {
    const state = read()[family.id] || {};
    for (const field of ["outcomes", "drafts", "attempts", "hints", "responses", "results", "reviews", "modelAssists"]) {
      if (!state[field] || typeof state[field] !== "object" || Array.isArray(state[field])) state[field] = {};
    }
    const valid = i => Number.isInteger(i) && i >= 0 && i < family.tasks.length;
    if (!valid(state.index)) state.index = 0;
    if (!Array.isArray(state.queue) || !state.queue.length || !state.queue.every(valid))
      state.queue = family.tasks.map((_, i) => i);
    if (!state.queue.includes(state.index)) state.index = state.queue[0];
    for (const [i, outcome] of Object.entries(state.outcomes)) {
      if (outcome === "self-reviewed" && !state.reviews[i]?.finished) {
        // The previous interface logged opening the criteria as a completed review.
        delete state.outcomes[i];
        state.reviews[i] = { open: true, choices: {} };
        if (state.completed) state.completed = false;
      }
    }
    return state;
  }

  function saveFamily(family, state) {
    const data = read();
    data[family.id] = state;
    return save(data);
  }

  function quietLink(text, href) {
    const a = node("a", text, "al-quiet-link");
    a.href = href;
    return a;
  }

  function outcomeOverview(entries) {
    const list = node("ul", null, "al-outcomes");
    for (const [value, label] of Object.entries(outcomeNames)) {
      const count = entries.filter(entry => entry === value).length;
      if (count) list.append(node("li", count + " · " + label));
    }
    return list;
  }

  function practise(host, family, state = loadFamily(family), flow = {}) {
    const block = node("section", null, "al-teaching al-practice");
    host.append(block);
    const persist = () => saveFamily(family, state);
    const hintsFor = q => q.hints || ["Identify what changes, then connect it to the effect named in the question."];
    const isAccepted = i => Boolean(state.outcomes[i] && state.outcomes[i] !== "needs-practice");
    const hasCompletedTask = i => isAccepted(i) || state.results[i]?.kind === "revealed";

    function begin(queue) {
      for (const i of queue) {
        for (const field of ["outcomes", "attempts", "hints", "responses", "results", "reviews", "modelAssists"])
          delete state[field][i];
      }
      state.queue = queue;
      state.index = queue[0];
      state.completed = false;
      persist();
      render(true);
    }

    function renderReview(moveFocus) {
      const heading = node("h2", "Review your progress", "al-task-heading");
      const outcomes = family.tasks.map((_, i) => state.outcomes[i]);
      block.append(heading, outcomeOverview(outcomes));
      const revisit = state.queue.filter(i => outcomes[i] !== "independent" &&
        (outcomes[i] !== "self-reviewed" || Object.values(state.reviews[i]?.choices || {}).includes("revise")));
      const actions = node("div", null, "al-controls");
      const recommendation = revisit.length
        ? button("Retry questions I needed help with", () => begin(revisit))
        : link("Choose another skill", "#exam");
      recommendation.classList.add("primary");
      actions.append(recommendation);
      if (revisit.length) actions.append(quietLink("Exam Skills catalogue", "#exam"));
      const details = node("details");
      details.append(node("summary", "Review the completed questions"));
      const completed = node("ol");
      family.tasks.forEach((q, i) => {
        if (!outcomes[i] && !state.results[i] && !state.reviews[i]?.open) return;
        const item = node("li");
        item.append(node("p", q.prompt));
        if (q.kind === "writing") {
          item.append(node("p", state.drafts[i]));
          const criteria = node("ul");
          q.points.forEach((point, j) => {
            const answer = state.reviews[i]?.choices?.[j];
            if (answer) criteria.append(node("li", point + " — " + (answer === "included" ? "Included" : "Needs work")));
          });
          if (criteria.children.length) item.append(criteria);
        } else {
          const answer = state.responses[i];
          const text = Array.isArray(answer) ? answer.map((value, j) =>
            q.kind === "group" ? q.items[j][0] + " → " + q.groups[value] : q.options[value]).join(" · ") : answer;
          if (text) item.append(node("p", "Your response · " + text));
        }
        item.append(node("strong", outcomeNames[outcomes[i]] || "Review still open"));
        completed.append(item);
      });
      details.append(completed);
      block.append(actions, details);
      if (moveFocus) focus(heading);
    }

    function render(moveFocus = false) {
      block.replaceChildren();
      if (state.completed) {
        flow.stage?.("review");
        renderReview(moveFocus);
        return;
      }
      const i = state.index;
      const q = family.tasks[i];
      const at = state.queue.indexOf(i);
      const writing = q.kind === "writing";
      const accepted = isAccepted(i);
      const revealed = state.results[i]?.kind === "revealed";
      const review = state.reviews[i] || { choices: {} };
      const symbol = { writing: "pen", group: "guided", number: "calculator" }[q.kind] ||
        (q.visual?.startsWith("pathway") ? "pathway" : q.visual ? "diagram" : "independent");
      flow.stage?.(q.guided ? "guided" : "independent", q.guided ? "guided" : symbol);
      const heading = node("h2", q.guided ? "With support" : "Your turn", "al-task-heading");
      block.append(heading, node("p", "Task " + (at + 1) + " of " + state.queue.length, "al-task-count"),
        node("h3", q.prompt));
      if (q.visual) block.append(visual(q.visual));

      const form = node("form");
      if (q.kind === "choice" || q.kind === "multi") {
        const field = node("fieldset");
        field.append(node("legend", q.kind === "multi" ? "Select every applicable answer" : "Choose one answer"));
        const order = q.options.map((option, j) => ({ option, j }));
        const rotation = i + family.id.length;
        order.sort((a, b) => ((a.j + rotation) % order.length) - ((b.j + rotation) % order.length));
        for (const { option, j } of order) {
          const label = node("label", null, "al-choice");
          const input = node("input");
          input.type = q.kind === "multi" ? "checkbox" : "radio";
          input.name = "answer";
          input.value = j;
          input.checked = (state.responses[i] || []).includes(j);
          label.append(input, node("span", option));
          field.append(label);
        }
        form.append(field);
      } else if (q.kind === "number") {
        const label = node("label", "Your answer" + (q.unit ? " (" + q.unit + ")" : ""));
        const input = node("input");
        input.type = "text";
        input.inputMode = "decimal";
        input.name = "number";
        input.autocomplete = "off";
        input.value = state.responses[i] ?? "";
        label.append(input);
        form.append(label);
      } else if (q.kind === "group") {
        const checked = state.results[i]?.kind === "incorrect" ? state.results[i].matched || [] : [];
        q.items.forEach(([text], j) => {
          const label = node("label", text, "al-group-row");
          const select = node("select");
          select.name = "group" + j;
          select.append(new Option("Choose a category", ""));
          q.groups.forEach((name, k) => select.append(new Option(name, k)));
          select.value = (state.responses[i] || [])[j] ?? "";
          if (checked.length) {
            select.disabled = checked[j];
            if (!checked[j]) select.setAttribute("aria-invalid", "true");
            label.append(node("span", checked[j] ? "Correct group" : "Reconsider this group", "al-row-result"));
          }
          label.append(select);
          form.append(label);
        });
      } else {
        const label = node("label", "Your explanation");
        const text = node("textarea");
        text.maxLength = 4000;
        text.name = "draft";
        text.value = state.drafts[i] || "";
        text.readOnly = accepted;
        label.append(text);
        form.append(label);
      }
      if (accepted || revealed) {
        for (const input of form.querySelectorAll("input, select")) input.disabled = true;
      }

      const status = node("div", null, "al-feedback");
      status.setAttribute("role", "status");
      const controls = node("div", null, "al-controls");
      function announce(text, kind) {
        const symbol = { correct: "check", improve: "retry", hint: "bulb", explained: "model", review: "review" }[kind];
        status.replaceChildren();
        if (symbol) status.append(icon(symbol));
        if (text) status.append(node("span", text));
        status.dataset.kind = kind;
        status.hidden = !text;
      }
      const result = state.results[i];
      if (accepted) announce(writing ? "Review finished. Your draft and judgements are saved." :
        outcomeNames[state.outcomes[i]] + ". " + q.why, writing ? "review" : "correct");
      else if (revealed) announce("Explanation revealed. " + q.why, "explained");
      else if (result?.clue && state.hints[i]) announce("Clue · " + hintsFor(q)[state.hints[i] - 1], "hint");
      else if (result?.kind === "incorrect")
        announce(q.kind === "group" ? "Review and improve the flagged rows. Your correct groups are kept." :
          "Review and improve. " + q.why, "improve");
      else if (state.hints[i]) announce("Clue · " + hintsFor(q)[state.hints[i] - 1], "hint");
      else announce("", "");

      form.oninput = () => {
        if (hasCompletedTask(i)) return;
        if (writing) state.drafts[i] = form.elements.draft.value;
        else if (q.kind === "number") state.responses[i] = form.elements.number.value;
        else if (q.kind === "group") state.responses[i] = [...form.querySelectorAll("select")].map(select => select.value);
        else state.responses[i] = [...form.querySelectorAll('input[name="answer"]:checked')].map(input => +input.value);
        persist();
      };

      form.append(status);
      if (review.open && writing) {
        const criteria = node("section", null, "al-criteria");
        criteria.append(node("h3", "Check and improve"));
        const model = node("details");
        model.append(node("summary", "Compare with a model explanation"), node("p", q.points.join(" ")));
        criteria.append(model);
        q.points.forEach((point, j) => {
          const field = node("fieldset");
          field.append(node("legend", point));
          for (const [value, text] of [["included", "Included"], ["revise", "Needs work"]]) {
            const label = node("label", null, "al-choice");
            const input = node("input");
            input.type = "radio";
            input.name = "criterion-" + j;
            input.value = value;
            input.checked = review.choices[j] === value;
            input.disabled = accepted;
            input.onchange = () => {
              review.choices[j] = value;
              persist();
            };
            label.append(input, node("span", text));
            field.append(label);
          }
          criteria.append(field);
        });
        form.append(criteria);
      }

      const submit = node("button", accepted || revealed ? "" : review.open ? "Finish review" :
        writing ? "Compare with the checklist" : result?.kind === "incorrect" ? "Try again" : "Check answer", "btn primary");
      submit.type = "submit";
      if (accepted || revealed) {
        const next = button(at === state.queue.length - 1 ? "Review progress" : "Next task", () => {
          if (at === state.queue.length - 1) state.completed = true;
          else state.index = state.queue[at + 1];
          persist();
          flow.moved?.();
          render(true);
        });
        next.classList.add("primary");
        controls.append(next);
      } else {
        controls.append(submit);
        const hints = hintsFor(q);
        function labelHint(text) {
          hint.replaceChildren(icon("bulb"), node("span", text));
        }
        const hint = button("", () => {
          const previous = state.hints[i] || 0;
          if (previous >= hints.length) return;
          const count = previous + 1;
          state.hints[i] = count;
          state.results[i] = { ...state.results[i], clue: true };
          announce("Clue · " + hints[count - 1], "hint");
          labelHint(count < hints.length ? "Another clue" : "Clues shown");
          hint.setAttribute("aria-disabled", String(count >= hints.length));
          persist();
        });
        labelHint(state.hints[i] ? "Another clue" : "Need a clue?");
        hint.classList.add("al-secondary");
        if ((!writing || (q.hints && !review.open)) && (state.hints[i] || 0) < hints.length) controls.append(hint);
        if (!writing) {
          const reveal = button("Show explanation", () => {
            state.results[i] = { kind: "revealed" };
            state.outcomes[i] = "needs-practice";
            persist();
            render();
            focus(block.querySelector('[role="status"]'));
          });
          reveal.classList.add("al-secondary");
          controls.append(reveal);
        }
      }
      form.append(controls);
      block.append(form);
      const catchup = flow.context ? flow.context(q) : (family.catchup ? ["Revisit catch-up teaching", "#catchup-" + family.catchup] : null);
      if (catchup) block.append(quietLink(...catchup));
      if (moveFocus) focus(heading);

      form.onsubmit = event => {
        event.preventDefault();
        if (hasCompletedTask(i)) return;
        if (writing) {
          if (form.elements.draft.value.trim().length < 12) {
            announce("Write an explanation before comparing it.", "improve");
            return;
          }
          state.drafts[i] = form.elements.draft.value;
          if (!review.open) {
            review.open = true;
            state.reviews[i] = review;
            persist();
            render();
            focus(block.querySelector(".al-criteria h3"));
          } else if (q.points.some((_, j) => !review.choices[j])) {
            announce("Choose Included or Needs work for each criterion.", "improve");
            focus(status);
          } else {
            review.finished = true;
            state.outcomes[i] = "self-reviewed";
            persist();
            render();
            focus(block.querySelector('[role="status"]'));
          }
          return;
        }

        let correct, matched;
        if (q.kind === "number") {
          const raw = form.elements.number.value.trim().replace(/−/g, "-");
          if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw)) {
            announce("Enter a number in the stated units, including any negative sign.", "improve");
            return;
          }
          state.responses[i] = form.elements.number.value;
          correct = Math.abs(Number(raw) - q.answer) < 1e-6;
        } else if (q.kind === "group") {
          const values = [...form.querySelectorAll("select")].map(select => select.value);
          if (values.some(value => value === "")) {
            announce("Choose a category for every statement.", "improve");
            return;
          }
          state.responses[i] = values;
          matched = values.map((value, j) => +value === q.items[j][1]);
          correct = matched.every(Boolean);
        } else {
          const values = [...form.querySelectorAll('input[name="answer"]:checked')].map(input => +input.value);
          if (!values.length) {
            announce("Choose an answer first.", "improve");
            return;
          }
          state.responses[i] = values;
          correct = q.kind === "multi"
            ? values.length === q.answer.length && q.answer.every(value => values.includes(value))
            : values[0] === q.answer;
        }
        const attempts = (state.attempts[i] || 0) + 1;
        state.attempts[i] = attempts;
        state.results[i] = { kind: correct ? "accepted" : "incorrect", ...(matched ? { matched } : {}) };
        state.outcomes[i] = !correct ? "needs-practice" : q.guided ? "guided" :
          attempts > 1 ? "corrected" : state.hints[i] ? "hint-supported" :
            state.modelAssists[i] ? "model-supported" : "independent";
        persist();
        render();
        focus(block.querySelector('[role="status"]'));
      };
    }
    render();
    return block;
  }
  function drawingComparison(item, session, persist) {
    const root = node("div", null, "al-drawing-comparison");
    const switcher = node("div", null, "al-drawing-switch");
    switcher.setAttribute("role", "group");
    switcher.setAttribute("aria-label", "Drawing comparison");
    const figures = node("div", null, "al-figures");
    const dialog = node("dialog", null, "al-figure-dialog");
    dialog.setAttribute("aria-labelledby", "al-enlarged-title");
    const title = node("h2");
    title.id = "al-enlarged-title";
    const preview = node("div");
    const close = button("Close enlarged image", () => dialog.close());
    dialog.append(title, close, preview);
    const labels = [["reference", "Reference observation"], ["candidate", "Candidate drawing"]];
    function update() {
      root.dataset.active = session.view || "reference";
      for (const choice of switcher.children)
        choice.setAttribute("aria-pressed", String(choice.dataset.view === root.dataset.active));
    }
    for (const [id, label] of labels) {
      const isReference = id === "reference";
      const choose = button(label, () => {
        session.view = id;
        persist();
        update();
      });
      choose.dataset.view = id;
      switcher.append(choose);
      const figure = node("figure");
      figure.dataset.view = id;
      const image = node("div");
      const mark = session.verdict === 1 && session.attempts > 0;
      image.innerHTML = drawing.svg(item, isReference, mark);
      const enlarge = button("Enlarge " + label.toLowerCase(), () => {
        title.textContent = label;
        preview.innerHTML = image.innerHTML;
        dialog.showModal();
        close.focus();
      });
      enlarge.classList.add("al-secondary");
      figure.append(node("figcaption", label), image, enlarge);
      figures.append(figure);
    }
    root.append(switcher, figures, dialog);
    update();
    return root;
  }

  function drawings(host) {
    const block = node("section", null, "al-teaching al-drawing");
    const bar = stageBar([["model", "Compare"], ["guided", "With support"],
      ["independent", "Your turn"], ["review", "Review"]]);
    currentStage(bar, "model");
    host.append(bar, block);
    const introduction = node("details", null, "al-drawing-example");
    introduction.open = !read().drawingSession && !read().drawingReview;
    introduction.append(node("summary", "Worked example · Compare two drawings"),
      node("p", "Use the requirements for the drawing. Several problems with outlines can belong to one category."));
    const comparison = node("div", null, "al-figures");
    [drawing.bank[0], drawing.bank[1]].forEach((item, i) => {
      const fig = node("figure");
      fig.innerHTML = drawing.svg(item);
      fig.append(
        node(
          "figcaption",
          i
            ? "Reject for line quality · overlapping outlines"
            : "Accept · clear, single outlines",
        ),
      );
      comparison.append(fig);
    });
    introduction.append(comparison);
    block.append(introduction);
    const start = button(
      read().drawingSession ? "Resume drawing set" : "Start a six-drawing set",
      () => round(true),
    );
    start.classList.add("primary");
    block.append(start);
    const exercise = node("section");
    block.append(exercise);
    function drawReview(review, moveFocus) {
      currentStage(bar, "review");
      const heading = node("h3", "Review your drawings");
      exercise.replaceChildren(heading, outcomeOverview(review.entries.map(entry => entry.outcome)));
      const detail = node("details");
      detail.append(node("summary", "Review the completed drawings"));
      const entries = node("ol");
      for (const entry of review.entries) {
        const item = drawing.bank.find(candidate => candidate.id === entry.id);
        if (item) entries.append(node("li", item.specimen.name + " · " + outcomeNames[entry.outcome] + ". " + item.why));
      }
      detail.append(entries);
      exercise.append(detail);
      if (moveFocus) focus(heading);
    }
    const savedDrawing = read();
    if (savedDrawing.drawingSession) round();
    else if (savedDrawing.drawingReview) drawReview(savedDrawing.drawingReview, false);
    function round(moveFocus = false) {
      const data = read();
      let session = data.drawingSession;
      if (
        !session ||
        !Number.isInteger(session.round) ||
        !Number.isInteger(session.index) ||
        session.index < 0 ||
        session.index > 5
      ) {
        const round = Number.isInteger(data.drawingRound)
          ? data.drawingRound
          : 0;
        session = { round, index: 0, attempts: 0, helped: false };
        data.drawingRound = round + 1;
      }
      const round = session.round;
      session.entries ||= [];
      let at = session.index;
      function persistDrawing() {
        const stored = read();
        stored.drawingRound = data.drawingRound;
        stored.drawingSession = session;
        save(stored);
      }
      persistDrawing();
      start.hidden = true;
      introduction.open = false;
      const pool = Array.from(
        { length: 6 },
        (_, j) => drawing.bank[((round * 6 + j) * 9) % drawing.bank.length],
      );
      function show() {
        exercise.replaceChildren();
        const item = pool[at];
        currentStage(bar, at === 0 ? "guided" : "independent", at === 0 ? "guided" : "diagram");
        exercise.append(
          node(
            "h3",
            (at === 0 ? "Guided judgement" : "Independent judgement") +
              " · " +
              (at + 1) +
              " of 6",
          ),
          node("p", item.specimen.name),
          node("p", item.criterion),
        );
        exercise.append(drawingComparison(item, session, persistDrawing));
        const verdict = node("fieldset");
        verdict.append(
          node("legend", "Does the candidate meet the stated task?"),
        );
        ["Accept", "Reject"].forEach((text, j) => {
          const label = node("label"),
            input = node("input");
          input.type = "radio";
          input.name = "drawing-verdict";
          input.value = j;
          input.checked = session.verdict === j;
          input.disabled = Boolean(session.outcome);
          label.append(input, document.createTextNode(text));
          verdict.append(label);
        });
        const categories = node("fieldset");
        categories.hidden = session.verdict !== 1;
        verdict.onchange = () => {
          if (session.outcome) return;
          session.verdict = Number(verdict.querySelector("input:checked").value);
          categories.hidden = session.verdict !== 1;
          if (categories.hidden) {
            categories.querySelectorAll("input").forEach(input => { input.checked = false; });
            session.categories = [];
          }
          persistDrawing();
        };
        categories.append(
          node("legend", "If rejected, select every category affected"),
        );
        drawing.categories.forEach((name, j) => {
          const label = node("label"),
            input = node("input");
          input.type = "checkbox";
          input.value = j;
          input.checked = (session.categories || []).includes(j);
          input.disabled = Boolean(session.outcome);
          label.append(input, document.createTextNode(name));
          categories.append(label);
        });
        categories.onchange = () => {
          session.categories = [...categories.querySelectorAll("input:checked")].map(input => +input.value);
          persistDrawing();
        };
        const feedback = node("p", null, "al-feedback");
        feedback.setAttribute("role", "status");
        if (session.outcome) feedback.textContent = outcomeNames[session.outcome] + ". " + item.why;
        else if (session.attempts) feedback.textContent = "Review and improve. " +
          (session.verdict === 1 ? item.why : "Compare the candidate with each stated requirement.");
        feedback.hidden = !feedback.textContent;
        const next = button(at < pool.length - 1 ? "Next drawing" : "Review progress", () => {
          if (!session.outcome) return;
          session.entries[at] = { id: item.id, outcome: session.outcome };
          const entries = session.entries;
          at++;
          session = { round, index: at, attempts: 0, helped: false, entries };
          if (at < pool.length) {
            persistDrawing();
            show();
            focus(exercise.querySelector("h3"));
          } else {
            const finished = read();
            delete finished.drawingSession;
            finished.drawingReview = { entries: entries.filter(Boolean) };
            save(finished);
            start.hidden = false;
            start.textContent = "Start a six-drawing set";
            drawReview(finished.drawingReview, true);
          }
        });
        next.classList.add("primary");
        const check = button(session.attempts ? "Try judgement again" : "Check judgement", () => {
          if (session.outcome) return;
          if (session.verdict === undefined) {
            feedback.textContent = "Choose Accept or Reject first.";
            feedback.hidden = false;
            return;
          }
          const cats = session.categories || [];
          const ok = session.verdict === Number(item.defects.length > 0) &&
            cats.length === item.defects.length && item.defects.every(value => cats.includes(value));
          session.attempts++;
          session.view = "candidate";
          if (ok) session.outcome = at === 0 ? "guided" : session.attempts > 1 ? "corrected" : session.helped ? "hint-supported" : "independent";
          persistDrawing();
          if (ok) {
            const stored = read();
            stored.drawingOutcomes ||= {};
            stored.drawingOutcomes[item.id] = session.outcome;
            save(stored);
          }
          show();
          focus(exercise.querySelector('[role="status"]'));
        });
        check.classList.add("primary");
        exercise.append(verdict, categories, feedback, session.outcome ? next : check);
        if (at === 0 && !session.outcome) {
          const hint = node("details");
          hint.append(
            node("summary", "Help with this judgement"),
            node(
              "p",
              "Compare outlines, fill, detail, relative sizes, label endpoints, and then the scale bar with the reference.",
            ),
          );
          hint.ontoggle = () => {
            if (hint.open) {
              session.helped = true;
              persistDrawing();
            }
          };
          exercise.append(hint);
        }
      }
      show();
      if (moveFocus) focus(exercise.querySelector("h3"));
    }
  }
  const catalogue = [
    ["Drawing and observation", ["drawings"]],
    ["Mark schemes and explanations", ["points", "mechanisms", "pressures", "regulation"]],
    ["Unfamiliar contexts", ["causal"]],
    ["Data, calculations and models", ["osmosis", "countercurrent", "calvin", "dihybrid", "hardy"]],
  ];
  const skillDetails = {
    drawings: ["Biological drawings", "Compare drawings and identify defects.", "diagram", "biological drawing scientific drawing tissue plan observation accept reject scale bar"],
    points: ["Independent marking points", "Recognise distinct criteria in an answer.", "review", "marking points mark schemes marking scheme group criteria"],
    mechanisms: ["Biological mechanisms", "Connect a biological change to its effect.", "pen", "scientific explanations diffusion distance mechanism active transport synapse"],
    pressures: ["Cardiac valve movements", "Compare pressures across the heart valves.", "pathway", "cardiac pressure cardiac pressures heart valves ventricular atrial aortic", "a3-heart"],
    regulation: ["Gene regulation", "Explain how gene access and regulators affect transcription.", "pathway", "transcription factors gene expression epigenetics methylation histone", "a8-epigen"],
    causal: ["Causal reasoning", "Trace a chain of effects in unfamiliar contexts.", "pathway", "disinhibition enzyme inhibition unfamiliar context causal reasoning inhibitor"],
    osmosis: ["Water potential and calibration", "Use gradients and read the zero-change intercept.", "calculator", "water potential calibration osmosis", "a2-osmosis"],
    countercurrent: ["Countercurrent exchange", "Compare the fluids at the same position.", "pathway", "countercurrent exchange fish gills oxygen diffusion", "a3-fish"],
    calvin: ["Calvin cycle", "Follow carbon fixation, reduction and regeneration.", "pathway", "calvin cycle light independent photosynthesis", "a5-calvin"],
    dihybrid: ["Dihybrid crosses", "Derive gametes and build a Punnett square.", "calculator", "dihybrid cross dihybrid inheritance punnett square", "a7-dihybrid"],
    hardy: ["Hardy–Weinberg calculations", "Distinguish allele and genotype frequencies.", "calculator", "hardy weinberg hardy-weinberg population genetics", "a7-hardy"],
  };
  function activityStatus(id, saved) {
    if (id === "drawings") {
      if (saved.drawingSession) return ["Resume", "Drawing " + (saved.drawingSession.index + 1) + " of 6"];
      return saved.drawingReview ? ["Review", "Six-drawing set"] : ["Start", ""];
    }
    const state = saved[id];
    if (!state) return ["Start", ""];
    if (state.completed) return ["Review", "Completed set"];
    if (state.phase === "model") return ["Resume", "Worked example"];
    if (state.phase === "practice" || ["responses", "outcomes", "drafts", "hints", "reviews"].some(field => Object.keys(state[field] || {}).length)) {
      const at = Math.max(0, state.queue?.indexOf(state.index) ?? state.index ?? 0);
      return ["Resume", "Question " + (at + 1) + " of " + (state.queue?.length || families[id].tasks.length)];
    }
    return ["Start", ""];
  }

  function index(host) {
    host.append(node("h1", "Exam Skills"));
    const saved = read();
    for (const [title, ids] of catalogue) {
      const section = node("section", null, "al-catalogue-group");
      const rows = node("ul", null, "al-catalogue");
      section.append(node("h2", title));
      for (const id of ids) {
        const [name, description, symbol] = skillDetails[id];
        const [action, progress] = activityStatus(id, saved);
        const row = node("li");
        const entry = node("a", null, "al-catalogue-row");
        entry.href = "#exam-" + id;
        const copy = node("span", null, "al-catalogue-copy");
        copy.append(node("strong", name), node("span", description));
        if (progress) copy.append(node("small", progress));
        entry.append(icon(symbol), copy, node("span", action, "al-row-action"));
        row.append(entry);
        rows.append(row);
      }
      section.append(rows);
      host.append(section);
    }
    const other = node("p", null, "al-journey-links");
    other.append(quietLink("Evaluate unfamiliar data", "/alevel/evidence/"), quietLink("Maths Skills", "#practice"));
    host.append(other);
  }

  function searchActivities() {
    const saved = read();
    return Object.entries(skillDetails).map(([id, [title, description, , keywords, equivalent]]) => {
      const [action] = activityStatus(id, saved);
      return { group: "exam", title, keywords, context: "Exam Skills · " + description,
        equivalent, actions: [[action, "#exam-" + id]] };
    });
  }
  const contextualLabels = {
    "a2-diffusion": "Review diffusion distance",
    "a2-active": "Review active transport",
    "a2-osmosis": "Review water potential",
    "a3-fish": "Review countercurrent exchange",
    "a3-heart": "Review valve pressures",
    "a5-calvin": "Review the Calvin cycle",
    "a6-glucose": "Review control of blood glucose",
    "a6-adh": "Review ADH and water balance",
    "a6-synapse": "Review synaptic transmission",
    "a6-homeo": "Review feedback in homeostasis",
    "a7-dihybrid": "Review dihybrid crosses",
    "a7-hardy": "Review Hardy–Weinberg",
    "a8-epigen": "Review epigenetic control",
    "a8-transfac": "Review transcription factors",
    "a1-enzfactors": "Review enzyme inhibition",
    "p3s-methods": "Review practical methods",
  };

  function contextualLink(family, returnTo) {
    return question => {
      const destination = question.catchup === undefined ? family.catchup : question.catchup;
      if (!destination || !contextualLabels[destination]) return null;
      return [contextualLabels[destination], "#catchup-" + destination + "?return=" + returnTo];
    };
  }

  function breadcrumb(label, href) {
    const line = node("p", null, "crumb");
    line.append(quietLink("← " + label, href));
    return line;
  }
  const catchupMap = {
    "a2-osmosis": "osmosis",
    "a3-fish": "countercurrent",
    "a5-calvin": "calvin",
    "a7-dihybrid": "dihybrid",
    "a7-hardy": "hardy",
    "a8-epigen": "regulation",
    "a8-transfac": "regulation",
    "a3-heart": "pressures",
  };
  window.ALevelExamSkills = {
    families,
    model,
    practise,
    hasCatchup(topic, concept) {
      return Boolean(catchupMap[topic + "-" + concept]);
    },
    catchup(host, topic, concept, options) {
      const source = topic + "-" + concept;
      const family = families[catchupMap[source]];
      if (family) journey(host, family, { ...options, context: contextualLink(family, "catchup-" + source) });
    },
    searchActivities,
    validFamily(id) {
      return Object.hasOwn(families, id);
    },
    route(host, id) {
      host.classList.add("al-exam");
      if (!id || (!Object.hasOwn(families, id) && id !== "drawings")) {
        host.append(breadcrumb("A-level Biology", "#"));
        index(host);
        return;
      }
      host.append(breadcrumb("Exam Skills", "#exam"));
      if (id === "drawings") {
        host.append(node("h1", "Biological drawings"));
        drawings(host);
        return;
      }
      const family = families[id];
      host.append(node("h1", family.title));
      journey(host, family, { context: contextualLink(family, "exam-" + id) });
    },
    links(topic) {
      const ids = Object.values(families)
        .filter((f) => f.topics.includes(topic))
        .map((f) => f.id);
      return ids
        .map(
          (id) =>
            '<a class="btn" href="#exam-' +
            id +
            '">' +
            families[id].title +
            "</a>",
        )
        .join("");
    },
  };
})();

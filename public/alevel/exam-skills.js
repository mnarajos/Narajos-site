(function () {
  "use strict";
  const families = window.ALevelTeachingFamilies;
  const drawing = window.ALevelDrawingBank;
  const storageKey = "keystone.alevel.exam-skills.v1";
  const paperRoutes = {
    passages: { stimulus: "Passage", back: ["Paper 2", "#paper-p2"], related: [["Passage and topic questions", "#ptopics-p2"], ["Understand the question", "#exam-interpret"]] },
    investigations: { stimulus: "Investigation", back: ["Evidence practice", "/alevel/evidence/"], related: [["Paper 3 Maths Skills", "#pskills-p3"], ["Practical reasoning", "#exam-practical"]] },
    essaywriting: { stimulus: "Essay title", back: ["Paper 3 essay", "#topic-p3w"], related: [["Develop extended answers", "#exam-extended"]] },
  };
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
  customElements.define("al-paper-scroll", class extends HTMLElement {
    connectedCallback() {
      const update = () => {
        if (this.scrollWidth > this.clientWidth || this.scrollHeight > this.clientHeight) {
          this.tabIndex = 0;
          this.setAttribute("role", "region");
          this.setAttribute("aria-label", this.dataset.label);
        } else {
          this.removeAttribute("tabindex");
          this.removeAttribute("role");
          this.removeAttribute("aria-label");
        }
      };
      this.sizeObserver = new ResizeObserver(update);
      this.sizeObserver.observe(this);
      this.sizeObserver.observe(this.firstElementChild);
      update();
    }
    disconnectedCallback() {
      this.sizeObserver.disconnect();
    }
  });

  function table(caption, headers, rows, highlights = [], paper = false, gene = false, compact = false) {
    const wrap = node(paper ? "al-paper-scroll" : "div", null, "al-table"),
      t = node("table");
    if (paper) wrap.dataset.label = caption;
    const tableCaption = t.createCaption();
    tableCaption.textContent = caption;
    if (gene) tableCaption.classList.add("sr-only");
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
    if (!gene) return wrap;
    const container = node("div", null, compact ? "al-gene-table al-gene-table-compact" : "al-gene-table");
    const visibleCaption = node("p", caption, "al-gene-caption");
    visibleCaption.setAttribute("aria-hidden", "true");
    container.append(visibleCaption, node("p", "Scroll the table horizontally to see all columns.", "al-gene-scroll-hint"), wrap);
    return container;
  }
  function enlargePlot(figure, name) {
    const dialog = node("dialog", null, "al-figure-dialog");
    dialog.setAttribute("aria-label", name);
    const scroll = node("div", null, "al-plot-scroll");
    scroll.setAttribute("role", "region");
    scroll.setAttribute("aria-label", name);
    scroll.tabIndex = 0;
    const close = button("Close enlarged diagram", () => dialog.close());
    const open = button("Enlarge diagram", () => {
      const svg = figure.querySelector("svg");
      scroll.replaceChildren(svg.cloneNode(true));
      dialog.showModal();
      close.focus();
    });
    open.classList.add("al-secondary");
    dialog.append(node("h2", name), close, scroll);
    figure.append(open, dialog);
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
    enlargePlot(figure, "Cardiac pressure graph");
    return figure;
  }

  function graph() {
    const figure = node("figure", null, "al-science-plot");
    figure.innerHTML =
      '<svg role="img" aria-label="Plant-tissue calibration. The best-fit line crosses zero percentage change in mass at minus 400 kPa." viewBox="0 0 360 245"><g fill="none" stroke="currentColor"><path d="M40 15V190H330"/><polyline stroke-width="2.5" points="55,164 115,130 175,96 235,62 295,28"/><path stroke-dasharray="4 4" d="M40 96H320M175 96V190"/></g><text x="43" y="208">−800</text><text x="156" y="208">−400</text><text x="290" y="208">0</text><text x="16" y="100">0</text><text x="8" y="168">−10</text><text x="12" y="31">10</text><text x="65" y="235">Solution water potential / kPa</text><text x="42" y="16">Change in mass / %</text></svg>';
    figure.append(node("figcaption", "Read across from zero change, then down to the water potential axis."));
    enlargePlot(figure, "Water potential graph");
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
      const counter = ["Countercurrent model · dissolved oxygen concentration", columns,
        [["Water →", 100, 80, 60, 40], ["Blood ←", 90, 70, 50, 30]]];
      const parallel = ["Parallel-flow model · dissolved oxygen concentration", columns,
        [["Water →", 100, 75, 60, 55], ["Blood →", 10, 35, 50, 55]]];
      if (step < 3) {
        box.append(table(...counter, step < 2 ? [3] : [1, 2, 3, 4]));
        if (step >= 2) box.append(node("p", "At each paired position, the model gives water a dissolved oxygen concentration 10 units higher than blood."));
      } else {
        box.append(table(...parallel, [4]), node("p", "At the right, both fluids are at 55 units. The model shows no dissolved oxygen concentration gradient there."));
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

  // These diagrams explain the current worked step. They are not mounted in
  // independent practice, and do not change progress or mastery state.
  function workedStepVisual(family, index) {
    const control = window.ALevelGeneControlFigures;
    const energy = window.ALevelEnergyMechanismFigures;
    const maps = {
      regulation: [[control, "a8", "transfac", 0], [control, "a8", "epigen", 0],
        [control, "a8", "epigen", 1], [control, "a8", "transfac", 2]],
      calvin: [[energy, "a5", "lightdep", 0], [energy, "a5", "calvin", 0],
        [energy, "a5", "calvin", 1], [energy, "a5", "calvin", 2], [energy, "a5", "calvin", 2]],
    };
    const selected = maps[family.id]?.[index];
    if (!selected?.[0]) return null;
    const box = node("div", null, "al-guided-visual");
    box.innerHTML = selected[0].render(selected[1], selected[2], selected[3]);
    return box.firstElementChild ? box : null;
  }

  function model(host, family, state, persist, finish, finishLabel = "Try with support", backToIdea = null) {
    const paper = paperRoutes[family.id] || (family.id === "geneExpression" ? { stimulus: "Investigation" } : null);
    const block = node("section", null, "al-teaching al-model");
    const heading = node("h2", "Worked example");
    const panel = node("div", null, "al-step");
    const announcement = node("div", null, "sr-only");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
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
    const previous = button("Previous step", () => index ? show(index - 1) : backToIdea?.());
    const next = button("Next step", () => index < last ? show(index + 1) : finish());
    next.classList.add("primary");
    previous.classList.add("al-secondary");
    controls.append(next, previous);
    block.append(heading, panel, announcement, art, controls);
    const count = node("span", null, "al-task-count");
    if (paper) {
      const context = node("div", null, "al-task-stimulus");
      context.append(node("h3", paper.stimulus, "al-stimulus-heading"));
      context.append(node("p", family.modelStimulus, family.id === "essaywriting" ? "al-essay-title" : null));
      if (family.evidence) context.append(art);
      heading.append(count);
      block.replaceChildren(heading, context, node("h3", family.modelQuestion, "al-task-prompt"), panel, announcement, controls);
    }
    host.append(block);
    function update() {
      // Keep the opening context beside each new step. Earlier steps remain
      // available with Previous without making the controls recede down a phone.
      if (paper) {
        count.textContent = "Step " + (index + 1) + " of " + (last + 1);
        panel.replaceChildren(node("p", family.model[index]));
      } else {
        const steps = node("ol", null, "al-model-steps");
        family.model.forEach((text, i) => {
          if (i !== 0 && i !== index) return;
          const step = node("li", text);
          step.value = i + 1;
          if (i === index) step.setAttribute("aria-current", "step");
          steps.append(step);
        });
        panel.replaceChildren(steps, node("p", (index + 1) + " of " + (last + 1), "al-task-count"));
      }
      announcement.textContent = "Step " + (index + 1) + " of " + (last + 1) + ". " + family.model[index];
      const relevantVisual = workedStepVisual(family, index);
      art.replaceChildren(relevantVisual || (family.evidence ? table(...family.evidence, family.evidenceHighlights?.[index], paper, family.id === "geneExpression") : visual(family.visual, index)));
      previous.disabled = index === 0 && !backToIdea;
      previous.textContent = index === 0 && backToIdea ? "Key idea" : "Previous step";
      next.textContent = index < last ? "Next step" : finishLabel;
    }
    update();
    return block;
  }

  function journey(host, family, options = {}) {
    if (family.id === "interpret") {
      interpretationJourney(host, options.back);
      return;
    }
    const state = loadFamily(family);
    const savedPractice = ["outcomes", "drafts", "hints", "responses", "reviews"].some(field => Object.keys(state[field]).length);
    state.phase ||= savedPractice || state.completed ? "practice" : "idea";
    const persist = () => saveFamily(family, state);
    const active = node("div", null, "al-journey-stage");
    const secondary = node("div", null, "al-journey-links");
    host.append(active, secondary);

    function pendingIndependent() {
      return family.tasks.flatMap((q, i) => q.guided || state.reviews[i]?.finished ? [] : [i]);
    }
    function skipLabel() {
      return pendingIndependent().some(i => !state.modelAssists[i]) ? "Try an independent question" : "Return to your response";
    }
    function openModel() {
      state.phase = "model";
      state.modelIndex = 0;
      persist();
      show(true);
    }
    function practiseNow(moveFocus, independent = false) {
      if (options.paper) {
        const pending = family.tasks.map((_, i) => i).filter(i => !state.reviews[i]?.finished);
        // Reserve a different context when a pupil leaves a question to get help.
        const unassisted = pending.filter(i => !family.tasks[i].guided && !state.modelAssists[i]);
        const written = unassisted.length ? unassisted : pendingIndependent();
        state.queue = independent ? written : [...pending.filter(i => family.tasks[i].guided), ...written];
        state.completed = !state.queue.length;
        state.index = state.queue[0] ?? state.index;
      } else if (independent) {
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
        const heading = node("h2", "Key idea");
        const panel = node("section", null, "al-teaching al-key");
        const start = button("See worked example", () => {
          state.phase = "model";
          persist();
          show(true);
        });
        start.classList.add("primary");
        panel.append(heading, node("p", family.principle));
        // Keep explanatory models beside the principle, before the worked steps.
        if (family.id === "regulation") {
          const access = workedStepVisual(family, 2);
          const binding = workedStepVisual(family, 0);
          if (access) panel.append(access);
          if (binding) panel.append(binding);
        } else if (family.id === "calvin") {
          const carbon = workedStepVisual(family, 2);
          if (carbon) panel.append(carbon);
        }
        if (family.commandGuide) {
          const guide = node("details", null, "al-key-notes");
          const entries = node("dl");
          for (const [term, meaning] of family.commandGuide)
            entries.append(node("dt", term), node("dd", meaning));
          guide.append(node("summary", family.guideLabel || "Common command words"), entries);
          panel.append(guide);
        }
        panel.append(start);
        if (options.notes) panel.append(options.notes);
        active.append(panel);
        if (moveFocus) focus(heading);
      } else if (state.phase === "model") {
        const allReviewed = options.paper && family.tasks.every((_, i) => state.reviews[i]?.finished);
        const content = model(active, family, state, persist, () => practiseNow(true), allReviewed ? "Return to your responses" : undefined, () => {
          state.phase = "idea";
          persist();
          show(true);
        });
        if (moveFocus) focus(content.querySelector("h2"));
      } else if (options.paper) {
        const content = practise(active, family, state, {
          paper: options.paper,
          openModel,
          independent: () => practiseNow(true, true),
          skipLabel,
          support: () => {
            const i = state.index;
            state.modelAssists[i] = true;
            if (state.drafts[i]?.trim()) {
              state.reviews[i] ||= { choices: {} };
              state.reviews[i].original ??= state.drafts[i];
            }
            openModel();
          },
        });
        if (moveFocus) focus(content.querySelector(".al-stimulus-heading, .al-task-prompt") || content.querySelector("h2"));
      } else {
        const review = node("details", null, "al-review-example");
        const content = practise(active, family, state, {
          context: options.context,
          back: options.back,
          review,
          extra: options.extra,
          moved: () => { review.open = false; },
        });
        review.append(node("summary", "Review the worked example"));
        review.ontoggle = () => {
          if (!review.open) return;
          if (!review.querySelector(".al-model")) {
            model(review, family, state, persist, () => {
              review.open = false;
              focus(content.querySelector(".al-task-prompt") || content.querySelector("h2"));
            }, "Back to the question");
          }
          if (!state.completed && !state.outcomes[state.index] && !family.tasks[state.index].guided) {
            state.modelAssists[state.index] = true;
            persist();
          }
        };
        if (moveFocus) focus(content.querySelector(".al-stimulus-heading, .al-task-prompt") || content.querySelector("h2"));
      }
      if (state.phase !== "practice" && (!options.paper || pendingIndependent().length)) {
        const skip = button(options.paper ? skipLabel() : "Go straight to questions", () => practiseNow(true, true));
        skip.classList.add("al-secondary");
        secondary.append(skip);
      }
      if (options.extra && state.phase !== "practice") secondary.append(options.extra);
    }
    show();
  }
  const outcomeNames = {
    independent: "Correct",
    "hint-supported": "Correct",
    corrected: "Correct",
    "model-supported": "Correct",
    guided: "Correct",
    "self-reviewed": "Written response self-reviewed",
    "needs-practice": "Still needs practice",
  };

  function loadFamily(family) {
    return preparePractice(family, read()[family.id] || {});
  }

  function preparePractice(family, state) {
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

  function vocabularyParagraph(content) {
    const paragraph = node("p");
    window.NarajosVocabulary.append(paragraph, content);
    return paragraph;
  }

  function interpretationJourney(host, back) {
    const { principle, lessons } = window.ALevelQuestionInterpretation;
    const legacy = read().interpret || {};
    const course = legacy.sequences || { units: {} };
    const shell = node("section", null, "al-interpretation");
    const menu = node("details", null, "al-key-notes");
    const summary = node("summary", "Choose a sequence");
    const list = node("ol", null, "al-catalogue");
    const active = node("div", null, "al-journey-stage");
    const overview = node("p", principle);
    menu.append(summary, list);
    shell.append(overview, menu, active);
    if (legacy.completed || ["outcomes", "drafts", "responses"].some(field => Object.keys(legacy[field] || {}).length)) {
      const history = node("details", null, "al-key-notes");
      history.append(node("summary", "Earlier activity progress"),
        node("p", legacy.completed ? "Your earlier set was completed. The new sequences have their own progress." : "Your earlier attempts are saved. The new sequences have their own progress."));
      if (legacy.drafts?.[3]?.trim()) history.append(node("h3", "Your earlier written response"), node("p", legacy.drafts[3], "al-saved-draft"));
      shell.append(history);
    }
    host.append(shell);

    function saveUnit(lesson, unit) {
      const data = read();
      const previous = data.interpret || {};
      const units = previous.sequences?.units || {};
      data.interpret = { ...previous, sequences: { active: lesson.id, units: { ...units, [lesson.id]: unit } } };
      save(data);
    }

    function show(lesson, moveFocus = false) {
      const unit = course.units[lesson.id] ||= {};
      const persist = () => saveUnit(lesson, unit);
      course.active = lesson.id;
      overview.hidden = lesson !== lessons[0] || Boolean(unit.stage);
      list.replaceChildren();
      lessons.forEach(candidate => {
        const row = node("li");
        const control = button(candidate.title, () => {
          menu.open = false;
          saveUnit(candidate, course.units[candidate.id] ||= {});
          show(candidate, true);
        });
        control.className = "al-catalogue-row";
        if (candidate === lesson) control.setAttribute("aria-current", "step");
        if (course.units[candidate.id]?.practice?.completed) control.append(node("small", "Complete"));
        row.append(control);
        list.append(row);
      });
      const title = node("h2", lesson.title);
      active.replaceChildren(title);

      function setStage(stage) {
        unit.stage = stage;
        persist();
        show(lesson, true);
      }

      function primary(label, action) {
        const control = button(label, action);
        control.classList.add("primary");
        return control;
      }

      if (unit.stage === "worked") {
        const worked = lesson.worked;
        const panel = node("section", null, "al-teaching al-model");
        const heading = node("h3", "Worked example");
        const step = Math.min(unit.step || 0, worked.reasoning.length);
        const fullyRevealed = step === worked.reasoning.length;
        const context = node("div", null, "al-task-stimulus");
        if (worked.stimulus) context.append(vocabularyParagraph(worked.stimulus));
        if (worked.table) context.append(table(worked.table.caption, worked.table.headers, worked.table.rows));
        const question = node("p", worked.question, "al-interpretation-exam-question");
        if (step && worked.highlight) {
          const { before, target, after } = worked.highlight;
          question.replaceChildren(before, node("mark", target), after);
        }
        context.append(question);
        panel.append(heading, context);
        let focusTarget = heading;
        if (!step && worked.think) panel.append(node("p", worked.think));
        if (step) {
          const reasoning = node("ol", null, "al-model-steps al-step");
          worked.reasoning.slice(0, step).forEach(({ label, text }) => {
            const item = node("li");
            const reason = node("strong", label);
            item.append(reason, node("p", text));
            reasoning.append(item);
            focusTarget = reason;
          });
          panel.append(reasoning);
        }
        if (fullyRevealed) {
          if (worked.chain?.length) {
            const chain = node("ol", null, "al-interpretation-chain");
            worked.chain.forEach(text => chain.append(node("li", text)));
            panel.append(chain);
          }
          panel.append(node("h4", "Model response"), node("p", worked.model));
        }
        panel.append(primary(fullyRevealed ? (unit.practice ? "Return to practice" : "Try with support") : step ? "Next reasoning step" : "Show the reasoning", () => {
          if (fullyRevealed) {
            setStage(unit.practice?.completed ? "complete" : "practice");
          } else {
            unit.step = step + 1;
            persist();
            show(lesson, true);
          }
        }));
        active.append(panel);
        if (moveFocus) focus(focusTarget);
        return;
      }

      if (unit.stage === "practice") {
        const { guided, independent } = lesson;
        const guidedFeedback = guided.kind === "multi" || guided.kind === "group" ? guided.takeaway :
          [guided.options[guided.answer].feedback, guided.takeaway].filter(Boolean).join(" ");
        const practice = {
          id: "interpret",
          tasks: [{
            kind: guided.kind || "choice", guided: true, vocabulary: true,
            stimulus: guided.stimulus, examPrompt: guided.question, prompt: guided.prompt,
            options: guided.options?.map(option => option.text), answer: guided.answer,
            feedback: guided.options?.map(option => option.feedback),
            groups: guided.groups, items: guided.items, retry: guided.retry,
            evidence: guided.table && [guided.table.caption, guided.table.headers, guided.table.rows],
            hints: guided.hints, why: guidedFeedback, wordHelp: guided.wordHelp,
          }, {
            kind: "writing", stimulus: independent.stimulus, prompt: independent.question,
            evidence: independent.table && [independent.table.caption, independent.table.headers, independent.table.rows],
            modelAnswer: [independent.model], points: independent.points, reviewNote: independent.reflection,
            wordHelp: independent.wordHelp,
          }],
        };
        unit.practice = preparePractice(practice, unit.practice || {});
        const revisit = button("Revisit the worked example", () => setStage("worked"));
        revisit.classList.add("al-secondary");
        const panel = practise(active, practice, unit.practice, {
          interpretation: true, persist, finish: () => setStage("complete"), extra: revisit,
        });
        if (moveFocus) focus(panel.querySelector("h2"));
        return;
      }

      if (unit.stage === "complete") {
        const heading = node("h3", "Sequence complete");
        const next = lessons.slice(lessons.indexOf(lesson) + 1).find(candidate => !course.units[candidate.id]?.practice?.completed)
          || lessons.find(candidate => !course.units[candidate.id]?.practice?.completed);
        const responses = node("details", null, "al-key-notes");
        const firstDraft = unit.practice.reviews[1]?.original;
        const latestDraft = unit.practice.drafts[1];
        responses.append(node("summary", "Review your saved response"));
        if (firstDraft && firstDraft !== latestDraft) responses.append(node("h4", "First draft"), node("p", firstDraft, "al-saved-draft"));
        responses.append(node("p", latestDraft, "al-saved-draft"), node("h4", "Model response"), node("p", lesson.independent.model));
        const controls = node("div", null, "al-controls");
        if (next) controls.append(primary("Next sequence", () => {
          saveUnit(next, course.units[next.id] ||= {});
          show(next, true);
        }));
        else if (back) controls.append(primary("Back to your question", back));
        else controls.append(link("Choose another exam skill", "#exam"));
        const revisit = button("Revisit the worked example", () => setStage("worked"));
        revisit.classList.add("al-secondary");
        controls.append(revisit);
        active.append(heading, node("p", lesson.independent.reflection), responses, controls);
        if (moveFocus) focus(heading);
        return;
      }

      active.append(node("p", lesson.objective, "al-interpretation-objective"), node("p", lesson.instruction));
      if (lesson.commandGuide) {
        const guide = node("details", null, "al-key-notes");
        const entries = node("dl");
        for (const [term, meaning] of lesson.commandGuide) entries.append(node("dt", term), node("dd", meaning));
        guide.append(node("summary", "Common command words"), entries);
        active.append(guide);
      }
      active.append(primary("See worked example", () => setStage("worked")));
      if (moveFocus) focus(title);
    }

    show(lessons.find(lesson => lesson.id === course.active) || lessons[0]);
  }

  function quietLink(text, href) {
    const a = node("a", text, "al-quiet-link");
    a.href = href;
    return a;
  }

  function outcomeOverview(entries) {
    const list = node("ul", null, "al-outcomes");
    for (const label of new Set(Object.values(outcomeNames))) {
      const count = entries.filter(entry => outcomeNames[entry] === label).length;
      if (count) list.append(node("li", count + " · " + label));
    }
    return list;
  }

  function practise(host, family, state = loadFamily(family), flow = {}) {
    const block = node("section", null, "al-teaching al-practice");
    host.append(block);
    const persist = flow.persist || (() => saveFamily(family, state));
    const hintsFor = q => q.hints || ["Identify what changes, then connect it to the effect named in the question."];
    const isAccepted = i => Boolean(state.outcomes[i] && state.outcomes[i] !== "needs-practice");
    const hasCompletedTask = i => isAccepted(i) || state.results[i]?.kind === "revealed";

    function begin(queue) {
      for (const i of queue) {
        for (const field of ["outcomes", "attempts", "hints", "responses", "results", "reviews", "modelAssists"])
          delete state[field][i];
        delete state.vocabularyHints?.[i];
      }
      state.queue = queue;
      state.index = queue[0];
      state.completed = false;
      persist();
      render(true);
    }

    function renderReview(moveFocus, animate) {
      const heading = node("h2", "Review your progress", "al-task-heading");
      const outcomes = family.tasks.map((_, i) => state.outcomes[i]);
      block.append(heading);
      if (!flow.paper) {
        if (state.queue.length > 1) {
          const completion = node("p");
          completion.innerHTML = KeystoneFeedback.markup("complete", { label: "Practice set complete", animate });
          block.append(completion);
        }
        block.append(outcomeOverview(outcomes));
      }
      const revisit = state.queue.filter(i => outcomes[i] !== "independent" &&
        (outcomes[i] !== "self-reviewed" || Object.values(state.reviews[i]?.choices || {}).includes("revise")));
      const actions = node("div", null, "al-controls");
      const recommendation = flow.paper ? link("Back to " + flow.paper.back[0], flow.paper.back[1]) : revisit.length
        ? button("Retry questions I needed help with", () => begin(revisit))
        : flow.back ? button("Back to your question", flow.back) : link("Choose another skill", "#exam");
      recommendation.classList.add("primary");
      actions.append(recommendation);
      if (flow.paper) {
        actions.append(button("Review the worked example", flow.openModel));
        for (const related of flow.paper.related) actions.append(quietLink(...related));
      } else if (revisit.length && !flow.back) actions.append(quietLink("Exam Skills catalogue", "#exam"));
      const details = node("details");
      details.append(node("summary", flow.paper ? "Read or revise your responses" : "Review the completed questions"));
      const completed = node("ol");
      family.tasks.forEach((q, i) => {
        if (!outcomes[i] && !state.results[i] && !state.reviews[i]?.open && !(flow.paper && state.drafts[i])) return;
        const item = node("li");
        if (q.essayTitle) {
          item.append(node("p", q.essayTitle, "al-essay-title"), node("p", q.prompt));
        } else if (q.stimulus) {
          item.append(node("p", q.stimulus));
          for (const instruction of [q.instruction].flat()) item.append(node("p", instruction));
        } else item.append(node("p", q.prompt));
        if (q.kind === "writing") {
          const original = state.reviews[i]?.original;
          if (flow.paper && original && original !== state.drafts[i]) {
            const first = node("details");
            first.append(node("summary", "Read your first draft"), node("p", original, "al-saved-draft"));
            item.append(first);
          }
          const draft = node("p", state.drafts[i], flow.paper ? "al-saved-draft" : null);
          draft.dataset.wordHelpIgnore = "";
          item.append(draft);
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
        if (flow.paper) {
          item.append(button("Edit this response", () => {
            if (state.reviews[i]) state.reviews[i].finished = false;
            delete state.outcomes[i];
            state.index = i;
            state.queue = [i];
            state.completed = false;
            persist();
            render(true);
          }));
        } else item.append(node("strong", outcomeNames[outcomes[i]] || "Review still open"));
        completed.append(item);
      });
      details.append(completed);
      block.append(actions, details);
      if (moveFocus) focus(heading);
    }

    function render(moveFocus = false, animate = false) {
      block.replaceChildren();
      if (state.completed) {
        window.ALevelVocabulary?.setAssessment(block, { completed: true });
        renderReview(moveFocus, animate);
        return;
      }
      const i = state.index;
      const q = family.tasks[i];
      block.toggleAttribute("data-guided", Boolean(q.guided));
      const at = state.queue.indexOf(i);
      const writing = q.kind === "writing";
      const accepted = isAccepted(i);
      const revealed = state.results[i]?.kind === "revealed";
      const review = state.reviews[i] || { choices: {} };
      const paperReview = flow.paper && writing && review.open;
      if (paperReview) review.original ??= state.drafts[i] || "";
      const revised = paperReview && state.drafts[i] !== review.original;
      let phaseLabel = q.guided ? "With support" : "Your turn";
      if (flow.interpretation && !q.guided) phaseLabel = review.open ? "Review your response" : "Independent question";
      if (flow.paper) {
        if (review.open) phaseLabel = "Response review";
        else if (!q.guided && !state.modelAssists[i]) phaseLabel = "Independent question";
      }
      const heading = node("h2", phaseLabel, "al-task-heading");
      const count = "Task " + (at + 1) + " of " + state.queue.length;
      block.append(heading);
      if (flow.paper) heading.append(node("span", count, "al-task-count"));
      else if (!flow.interpretation) block.append(node("p", count, "al-task-count"));
      const hasStimulus = q.stimulus || q.essayTitle || q.passage?.length || q.visual || q.evidence;
      let question = block;
      if (flow.paper && review.open) {
        question = node("details", null, "al-question-review");
        question.append(node("summary", "Reread the question"));
        block.append(question);
      }
      let stimulusHeading;
      let prompt;
      if (hasStimulus) {
        const stimulus = node("div", null, "al-task-stimulus");
        const label = flow.interpretation ? "Question context" : flow.paper ? flow.paper.stimulus : q.examQuestion ? "Exam-style question to analyse" : q.passage?.length ? "Passage to analyse" : "Evidence to analyse";
        stimulusHeading = node("h3", label, "al-stimulus-heading");
        stimulus.append(stimulusHeading);
        if (q.essayTitle) stimulus.append(node("p", q.essayTitle, "al-essay-title"));
        if (q.stimulus) stimulus.append(q.vocabulary ? vocabularyParagraph(q.stimulus) : node("p", q.stimulus));
        for (const paragraph of q.passage || []) stimulus.append(node("p", paragraph));
        if (q.visual) stimulus.append(visual(q.visual));
        if (q.evidence) stimulus.append(table(...q.evidence, [], flow.paper, family.id === "geneExpression", q.compactEvidence));
        if (q.examPrompt) stimulus.append(node("p", q.examPrompt, "al-interpretation-exam-question"));
        question.append(stimulus);
        if (flow.paper) {
          prompt = node("h3", q.prompt, "al-task-prompt");
        } else {
          if (!flow.interpretation) question.append(node("h3", "Your task", "al-instruction-heading"));
          prompt = node("div", null, "al-task-prompt");
          for (const instruction of [q.instruction ?? q.prompt].flat()) prompt.append(node("p", instruction));
        }
      } else {
        prompt = node("h3", q.prompt, "al-task-prompt");
      }
      prompt.id = family.id === "geneExpression" ? "al-gene-expression-question" : "al-current-question";
      question.append(prompt);

      const form = node("form");
      form.setAttribute("aria-labelledby", prompt.id);
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
        let labelText = flow.paper || flow.interpretation ? "Your response" : "Your explanation";
        if (paperReview && (!accepted || revised)) labelText = "Your revised response";
        const label = node("label", null, flow.paper ? "al-response-label" : null);
        label.append(node("span", labelText, paperReview && !accepted ? "sr-only" : null));
        const text = node("textarea");
        if (!flow.paper) text.maxLength = 4000;
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
      status.setAttribute("aria-atomic", "true");
      const controls = node("div", null, "al-controls");
      const help = node("details", null, "al-practice-help");
      help.append(node("summary", "Help with this question"));
      function announce(text, kind) {
        const symbol = { improve: "retry", hint: "bulb", explained: "model", review: "review" }[kind];
        status.replaceChildren();
        if (symbol) status.append(icon(symbol));
        if (text) status.append(node("span", text));
        status.dataset.kind = kind;
      }
      const result = state.results[i];
      if (accepted && writing) announce("Review finished. Your draft and judgements are saved.", "review");
      else if (accepted) {
        const kind = state.outcomes[i] === "corrected" ? "corrected" : "correct";
        const label = flow.interpretation && kind === "correct" ? "Correct." : undefined;
        const message = node("span");
        message.innerHTML = KeystoneFeedback.markup(kind, { key: i, animate, label });
        if (flow.interpretation) message.append(" " + q.why);
        status.dataset.kind = "correct";
        status.append(message);
      } else if (revealed) announce("Explanation revealed. " + q.why, "explained");
      else if (result?.clue && state.hints[i]) announce("Clue · " + hintsFor(q)[state.hints[i] - 1], "hint");
      else if (result?.kind === "incorrect")
        announce(q.kind === "group" ? "Review and improve the flagged rows. Your correct groups are kept." :
          "Review and improve. " + (result.feedback ?? q.retry ?? q.why), "improve");
      else if (state.hints[i]) announce("Clue · " + hintsFor(q)[state.hints[i] - 1], "hint");
      else announce("", "");

      let previousDraft;
      form.oninput = () => {
        if (hasCompletedTask(i)) return;
        if (writing) {
          state.drafts[i] = form.elements.draft.value;
          if (previousDraft) previousDraft.hidden = review.original === state.drafts[i];
        }
        else if (q.kind === "number") state.responses[i] = form.elements.number.value;
        else if (q.kind === "group") state.responses[i] = [...form.querySelectorAll("select")].map(select => select.value);
        else state.responses[i] = [...form.querySelectorAll('input[name="answer"]:checked')].map(input => +input.value);
        persist();
      };

      form.append(status);
      if (review.open && writing) {
        const criteria = node("section", null, "al-criteria");
        if (flow.paper) {
          const first = node("div", null, "al-first-draft");
          const title = node("h3", "Your first draft");
          const excerpt = node("al-paper-scroll", null, "al-draft-text");
          excerpt.dataset.label = title.textContent;
          const cue = node("span", "Scroll to read", "al-draft-cue");
          cue.setAttribute("aria-hidden", "true");
          title.append(cue);
          excerpt.append(node("p", review.original, "al-saved-draft"));
          first.append(title, excerpt);
          criteria.append(first, node("h3", "Check your reasoning"));
          // With enlarged fonts the heading can wrap past the CSS scroll clearance.
          const clearFirstDraft = event => {
            const control = event.target;
            if (first.contains(control)) return;
            requestAnimationFrame(() => {
              if (document.activeElement !== control) return;
              const target = control.closest("label") || control;
              const gap = target.getBoundingClientRect().top - first.getBoundingClientRect().bottom;
              if (gap < 4) window.scrollBy({ top: gap - 4, behavior: "instant" });
            });
          };
          criteria.addEventListener("focusin", clearFirstDraft);
          criteria.addEventListener("change", clearFirstDraft);
        } else criteria.append(node("h3", "Check and improve"), node("p", flow.interpretation
          ? "Check your response against each criterion. Revise any part of your answer before finishing the review."
          : "Compare each point with your draft. Add any missing scientific link before finishing your review."));
        const model = node("details");
        const summary = node("summary", "Compare with a model explanation");
        model.append(summary);
        for (const paragraph of q.modelAnswer || [q.points.join(" ")]) model.append(node("p", paragraph));
        if (flow.paper) summary.onclick = () => {
          if (!model.open && !review.modelRead) { review.modelRead = true; persist(); }
        };
        if (!flow.paper && review.original) {
          previousDraft = node("details");
          previousDraft.dataset.wordHelpIgnore = "";
          previousDraft.hidden = review.original === state.drafts[i];
          previousDraft.append(node("summary", "Read your first draft"), node("p", review.original));
          criteria.append(previousDraft);
        }
        if (!flow.paper) criteria.append(model);
        q.points.forEach((point, j) => {
          const field = node("fieldset");
          field.append(node("legend", point));
          const repair = q.repairs && node("p", q.repairs[j], "al-repair");
          if (repair) {
            repair.id = "al-repair-" + (family.id === "geneExpression" ? "gene-expression-" : "") + j;
            repair.hidden = review.choices[j] !== "revise";
          }
          for (const [value, text] of [["included", "Included"], ["revise", "Needs work"]]) {
            const label = node("label", null, "al-choice");
            const input = node("input");
            input.type = "radio";
            input.name = "criterion-" + j;
            input.value = value;
            input.checked = review.choices[j] === value;
            input.disabled = accepted;
            if (repair && value === "revise") input.setAttribute("aria-controls", repair.id);
            input.onchange = () => {
              review.choices[j] = value;
              if (repair) {
                repair.hidden = value !== "revise";
                if (!repair.hidden) {
                  review.repairsSeen ||= {};
                  review.repairsSeen[j] = (review.repairsSeen[j] || 0) + 1;
                }
              }
              persist();
            };
            label.append(input, node("span", text));
            field.append(label);
          }
          if (repair) field.append(repair);
          criteria.append(field);
        });
        if (q.reviewNote) criteria.append(node("p", q.reviewNote));
        if (flow.paper) criteria.append(model);
        if (flow.paper && !accepted) {
          const revision = node("details", null, "al-revision");
          revision.open = revised;
          revision.append(node("summary", "Revise your response"), form.querySelector(".al-response-label"));
          criteria.append(revision);
        }
        if (flow.paper && accepted) {
          const checklist = node("details", null, "al-completed-review");
          checklist.append(node("summary", "Review your checklist"), criteria);
          form.append(form.querySelector(".al-response-label"), checklist);
        } else form.append(criteria);
      }

      const submit = node("button", accepted || revealed ? "" : review.open ? "Finish review" :
        writing ? "Compare with the checklist" : result?.kind === "incorrect" ? "Try again" : "Check", "btn primary");
      submit.type = "submit";
      if (accepted || revealed) {
        const last = at === state.queue.length - 1;
        const nextQuestion = family.tasks[state.queue[at + 1]];
        const nextLabel = flow.interpretation ? "Try the independent question" : flow.paper && !last && !nextQuestion.guided ? "Try a different question" : "Next task";
        const next = button(last ? (flow.interpretation ? "Finish sequence" : "Review progress") : nextLabel, () => {
          if (at === state.queue.length - 1) state.completed = true;
          else state.index = state.queue[at + 1];
          persist();
          if (last && flow.interpretation) {
            flow.finish();
            return;
          }
          flow.moved?.();
          render(true, last);
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
          focus(status);
          labelHint(count < hints.length ? "Another clue" : "Clues shown");
          hint.setAttribute("aria-disabled", String(count >= hints.length));
          persist();
        });
        labelHint(state.hints[i] ? "Another clue" : "Need a clue?");
        hint.classList.add("al-secondary");
        if ((!flow.interpretation || q.hints) && (!writing || (q.hints && !review.open)) && (state.hints[i] || 0) < hints.length) help.append(hint);
        if (!writing) {
          const reveal = button("Show explanation", () => {
            state.results[i] = { kind: "revealed" };
            state.outcomes[i] = "needs-practice";
            persist();
            render();
            focus(block.querySelector('[role="status"]'));
          });
          reveal.classList.add("al-secondary");
          if (!flow.interpretation || state.attempts[i]) help.append(reveal);
        }
      }
      form.append(controls);
      block.append(form);
      if (flow.paper) {
        const hasIndependent = family.tasks.some((task, index) => !task.guided && !state.reviews[index]?.finished);
        if (q.guided && hasIndependent && (!accepted || family.tasks[state.queue[at + 1]]?.guided)) {
          const skip = button(flow.skipLabel(), flow.independent);
          skip.classList.add("al-secondary");
          block.append(skip);
        } else if (!q.guided && !review.open && !accepted) {
          const model = button("Work through an example", flow.support);
          model.classList.add("al-secondary");
          block.append(model);
        }
      }
      const catchup = flow.context ? flow.context(q) : (family.catchup ? ["Revisit catch-up teaching", "#catchup-" + family.catchup] : null);
      if (catchup) help.append(quietLink(...catchup));
      if (flow.review) help.append(flow.review);
      if (flow.extra && (!flow.interpretation || q.guided)) help.append(flow.extra);
      if (help.children.length > 1) block.append(help);
      window.ALevelVocabulary?.setAssessment(block, {
        completed: accepted || revealed || Boolean(review.open),
        ...q.wordHelp,
        reveal() {
          if (!block.isConnected || state.index !== i || hasCompletedTask(i) || state.reviews[i]?.open) return false;
          if (!q.guided && !writing && !state.attempts[i] && !state.vocabularyHints?.[i]) {
            state.vocabularyHints ||= {};
            state.vocabularyHints[i] = true;
            persist();
          }
          return true;
        },
      });
      if (moveFocus) focus(question.tagName === "DETAILS" ? question.querySelector("summary") : stimulusHeading || prompt);

      form.onsubmit = event => {
        event.preventDefault();
        if (hasCompletedTask(i)) return;
        if (writing) {
          if (form.elements.draft.value.trim().length < 12) {
            const revision = form.querySelector(".al-revision");
            if (revision) revision.open = true;
            announce(flow.interpretation ? "Write a response before opening the checklist." :
              revision ? "Write your revised explanation before finishing." : "Write an explanation before comparing it.", "improve");
            if (flow.paper || flow.interpretation) form.elements.draft.focus();
            return;
          }
          state.drafts[i] = form.elements.draft.value;
          if (!review.open) {
            review.open = true;
            review.original ??= state.drafts[i];
            if (flow.paper) state.attempts[i] = (state.attempts[i] || 0) + 1;
            state.reviews[i] = review;
            persist();
            render();
            focus(block.querySelector(".al-criteria h3"));
          } else if (q.points.some((_, j) => !review.choices[j])) {
            announce("Choose Included or Needs work for each criterion.", "improve");
            if (flow.paper) form.querySelector("fieldset:not(:has(:checked)) input").focus();
            else focus(status);
          } else {
            if (flow.paper && state.drafts[i] !== (review.lastSubmission || review.original)) {
              state.attempts[i] = (state.attempts[i] || 0) + 1;
              review.lastSubmission = state.drafts[i];
            }
            review.finished = true;
            state.outcomes[i] = "self-reviewed";
            persist();
            render();
            focus(block.querySelector('[role="status"]'));
          }
          return;
        }

        let correct, matched, feedback;
        if (q.kind === "number") {
          const reading = NarajosAssessment.parse(form.elements.number.value, q.unit, q.prompt);
          if (!Number.isFinite(reading.value)) {
            announce(reading.message, "improve");
            return;
          }
          state.responses[i] = form.elements.number.value;
          const value = reading.value;
          correct = NarajosAssessment.matches(value, q.answer, 1e-6, q.prompt, q.unit);
          if (!correct) feedback = q.numberFeedback?.[value];
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
          if (!correct && q.kind === "choice") feedback = q.feedback?.[values[0]];
          if (!correct && q.kind === "multi" && flow.interpretation) {
            const extra = values.find(value => !q.answer.includes(value));
            feedback = q.feedback?.[extra] || "Check whether your selections answer all parts of the question.";
          }
        }
        const attempts = (state.attempts[i] || 0) + 1;
        state.attempts[i] = attempts;
        state.results[i] = { kind: correct ? "accepted" : "incorrect", ...(matched ? { matched } : {}), ...(feedback ? { feedback } : {}) };
        state.outcomes[i] = !correct ? "needs-practice" : q.guided ? "guided" :
          attempts > 1 ? "corrected" : (state.hints[i] || state.vocabularyHints?.[i]) ? "hint-supported" :
            state.modelAssists[i] ? "model-supported" : "independent";
        persist();
        render(false, correct);
        focus(block.querySelector('[role="status"]'));
      };
    }
    render();
    return block;
  }
  function drawingCredit(item) {
    const s = item.specimen, credit = node("small", null, "al-drawing-credit");
    const source = node("a", s.author), licence = node("a", s.licence);
    source.href = item.credit;
    licence.href = s.licenceUrl;
    credit.append(source, " · ", licence, " · photograph cropped for comparison. Drawing adapted under the same terms.");
    return credit;
  }

  function drawingInspector() {
    const dialog = node("dialog", null, "al-figure-dialog");
    const title = node("h2");
    const close = button("Close", dismiss);
    close.setAttribute("aria-label", "Close enlarged image");
    const views = node("div", null, "al-inspector-views");
    views.setAttribute("role", "group");
    views.setAttribute("aria-label", "Switch enlarged image");
    views.hidden = true;
    const preview = node("div", null, "al-drawing-zoom");
    preview.tabIndex = 0;
    preview.setAttribute("role", "region");
    preview.setAttribute("aria-label", "Enlarged image. Use the arrow keys or swipe to move across it.");
    let opener;
    const controls = node("div", null, "al-inspector-tools");
    controls.append(views, close);
    dialog.append(title, controls, preview);
    function dismiss() {
      dialog.close();
      opener?.focus();
    }
    dialog.addEventListener("cancel", event => {
      event.preventDefault();
      dismiss();
    });
    function add(label, picture, shortLabel = label) {
      function display() {
        title.textContent = label;
        dialog.setAttribute("aria-label", label);
        preview.replaceChildren(picture.firstElementChild.cloneNode(true));
        for (const option of views.children)
          option.setAttribute("aria-pressed", String(option === view));
      }
      const view = button(shortLabel, display);
      view.setAttribute("aria-label", label);
      views.append(view);
      views.hidden = views.children.length < 2;
      title.classList.toggle("sr-only", !views.hidden);
      const enlarge = button("Enlarge " + label.toLowerCase(), () => {
        opener = enlarge;
        display();
        dialog.showModal();
        preview.scrollTo(0, 0);
        close.focus();
      });
      enlarge.classList.add("al-secondary");
      return enlarge;
    }
    return {dialog, add};
  }

  function workedCredit(worked) {
    const credit = node("small", null, "al-drawing-credit");
    const source = node("a", worked.author), licence = node("a", worked.licence);
    source.href = worked.credit;
    licence.href = worked.licenceUrl;
    credit.append(source, " · ", licence, " · ", worked.alterations);
    return credit;
  }

  function drawingWorked(bar) {
    const worked = window.ALevelDrawingWorked;
    const panel = node("details", null, "al-drawing-worked al-drawing-example");
    panel.append(node("summary", "Worked example · From a micrograph to a drawing"));
    const figures = node("div", null, "al-figures");
    const reference = node("figure"), photo = node("div");
    photo.innerHTML = worked.observationSvg();
    const inspector = drawingInspector();
    reference.append(node("figcaption", worked.name), photo, inspector.add("Observation", photo));
    figures.append(reference);
    const reveal = button("Show the worked drawing", () => {
      const figure = node("figure", null, "al-worked-model");
      const title = node("figcaption", "Worked drawing"), model = node("div");
      model.innerHTML = worked.modelSvg();
      figure.append(title, model, inspector.add("Worked drawing", model, "Drawing"));
      figures.append(figure);
      const steps = node("ol");
      worked.steps.forEach(step => steps.append(node("li", step)));
      reveal.replaceWith(steps, node("p", "On paper, write the explanatory title beside your drawing. Include a calibrated scale bar, actual size or a magnification calculated for the drawing itself."));
      currentStage(bar, "model");
      focus(title);
    });
    panel.append(node("p", worked.observe), figures, node("p", worked.decide), reveal, workedCredit(worked), inspector.dialog);
    panel.ontoggle = () => {
      if (panel.open) currentStage(bar, figures.children.length === 1 ? "idea" : "model");
    };
    return panel;
  }

  function paperDrawing(bar) {
    const item = drawing.paper, s = item.specimen, panel = node("details", null, "al-paper");
    panel.append(node("summary", "Draw a specimen on paper"));
    const prompt = node("section", null, "al-paper-prompt");
    const picture = node("div"), inspector = drawingInspector();
    picture.innerHTML = drawing.svg(item,true);
    prompt.append(node("h3", s.name), node("p", s.task + " Use a sharp pencil. Add a short annotation explaining how you identified the nucleus."), picture, inspector.add("Paper observation", picture, "Observation"),
      node("p", "Use the reference bar to set the length on your page. If you enlarge the cell, enlarge the bar in the same proportion."), drawingCredit(item));
    const print = button("Print observation and instructions", () => window.print());
    print.classList.add("al-secondary");
    panel.append(prompt, print);
    const review = node("section", null, "al-paper-review");
    const points = [
      "I followed the changes in direction around this cell.",
      "My label lines reach the cell wall and nucleus.",
      "My bar has the same length relative to the cell as the reference bar.",
      "My title names the specimen and the cell I drew.",
      "I used clear, single pencil lines and left out shading and unresolved detail.",
      "I ruled both label lines and kept the outlines clear.",
      "I labelled my scale bar in µm.",
      "I checked the relative sizes of the cell and nucleus. My annotation explains how I identified the nucleus."
    ];
    function getPaper(saved = read()) {
      const paper = saved.drawingPaper || {};
      // Keep the student's note, but require a fresh check of this photograph.
      return paper.image === s.image ? paper : {improvement:paper.improvement};
    }
    function update(patch) {
      const saved = read();
      saved.drawingPaper = {...getPaper(saved), ...patch, image:s.image};
      save(saved);
    }
    const reveal = button("I’ve drawn it · compare with the model", () => {
      update({compared:true});
      showReview(true);
    });
    function showReview(moveFocus) {
      reveal.hidden = true;
      const state = getPaper(), heading = node("h4", "Self-review your paper drawing");
      const picture = node("div");
      picture.innerHTML = drawing.svg(item);
      const checks = node("fieldset");
      checks.append(node("legend", "Check your drawing against the model"));
      points.forEach((point,index) => {
        const input = node("input"), label = node("label");
        input.type = "checkbox";
        input.checked = Boolean(state.checks?.[index]);
        input.onchange = () => update({checks:{...getPaper().checks,[index]:input.checked}});
        label.append(input, " ", point);
        checks.append(label);
      });
      const note = node("label", "One change I would make"), response = node("textarea");
      response.rows = 2;
      response.value = state.improvement || "";
      response.oninput = () => update({improvement:response.value});
      note.append(response);
      review.replaceChildren(heading, picture, inspector.add("Paper model", picture, "Model"), checks, note, node("p","Your checklist and improvement are saved on this device as self-review."));
      if (moveFocus) focus(heading);
    }
    panel.append(reveal, review, inspector.dialog);
    panel.ontoggle = () => { if (panel.open) currentStage(bar, "review"); };
    if (getPaper().compared) showReview(false);
    return panel;
  }

  function drawingComparison(item, session, persist) {
    const root = node("div", null, "al-drawing-comparison");
    const switcher = node("div", null, "al-drawing-switch");
    switcher.setAttribute("role", "group");
    switcher.setAttribute("aria-label", "Drawing comparison");
    const figures = node("div", null, "al-figures");
    const inspector = drawingInspector();
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
      image.innerHTML = drawing.svg(item, isReference, Boolean(session.outcome));
      figure.append(node("figcaption", label), image, inspector.add(label, image, isReference ? "Reference" : "Candidate"));
      if (item.specimen.id === "buttercup") {
        const detail = node("div", null, "al-vascular-detail");
        detail.innerHTML = drawing.vascularDetail(item, isReference);
        figure.append(node("p", "Vascular region · enlarged"), detail);
      }
      figures.append(figure);
    }
    const descriptions = node("details", null, "al-drawing-evidence");
    descriptions.append(node("summary", "Read the visual evidence"),
      node("h4","Observation"), node("p",drawing.evidence(item,true)),
      node("h4","Candidate"), node("p",drawing.evidence(item,false)));
    const full = node("details");
    full.append(node("summary","Inspect the full photograph"));
    const photo = node("img");
    photo.loading = "lazy";
    photo.src = "/assets/micrographs/" + item.specimen.image;
    photo.alt = "Full field before cropping. " + drawing.scaleText(item.specimen);
    full.append(photo, drawingCredit(item));
    root.append(switcher, figures, descriptions, full, inspector.dialog);
    update();
    return root;
  }

  function drawingTypes() {
    const comparison = node("details", null, "al-drawing-example");
    comparison.append(node("summary", "Cell drawing or tissue plan?"));
    const figures = node("div", null, "al-figures");
    const worked = window.ALevelDrawingWorked;
    const section = drawing.bank.find(item => item.specimen.id === "leaf");
    const examples = [
      ["Cell drawing · " + worked.name, worked.observationSvg(), "Trace the cell boundaries and the internal structures you can resolve. Preserve their positions and proportions.", workedCredit(worked)],
      ["Tissue plan · " + section.specimen.name, drawing.svg(section, true), "Follow the boundaries between the tissue regions. Compare their relative thickness and position. A plan shows the distribution of tissues and leaves out individual cells.", drawingCredit(section)]
    ];
    const inspector = drawingInspector();
    for (const [title, svg, instruction, credit] of examples) {
      const figure = node("figure"), observation = node("div");
      observation.innerHTML = svg;
      figure.append(node("figcaption", title), observation, inspector.add(title, observation, title.split(" · ")[0]), node("p", instruction), credit);
      figures.append(figure);
    }
    comparison.append(figures, node("p", "In a dissection, a body plan records the arrangement of the organs or other anatomical structures visible in the specimen."), inspector.dialog);
    return comparison;
  }

  function scalePractice() {
    const panel = node("details", null, "al-scale-practice");
    const title = "Calculate a scale bar for a resized drawing";
    panel.append(node("summary", title),
      node("p", "The buttercup micrograph’s 0.31 mm bar spans 123 image units. A pupil draws a 246-unit length from the same field as 36 mm on paper."));
    const form = node("form"), label = node("label", "How long on paper should a 100 µm scale bar be? Give the length in mm to 1 decimal place.");
    const input = node("input"), check = node("button", "Check length"), hint = node("details");
    input.type = "text";
    input.inputMode = "decimal";
    input.autocomplete = "off";
    label.append(input);
    check.type = "submit";
    hint.append(node("summary", "Hint about the two scales"),
      node("p", "First find the real length of the 246-unit segment in µm. Then find the same fraction of the 36 mm drawing."));
    const feedback = node("p", null, "al-feedback");
    feedback.setAttribute("role", "status");
    feedback.setAttribute("aria-atomic", "true");
    const state = {...read().drawingCalibration};
    function persist() {
      const data = read();
      data.drawingCalibration = {...state};
      save(data);
    }
    function refreshVocabulary() {
      window.ALevelVocabulary?.setAssessment(panel, {
        completed: !panel.open || Boolean(state.outcome),
        incidental: ["micrograph"],
        targets: ["magnification", "scale-bar"],
        reveal() {
          if (!panel.open || !panel.isConnected || state.outcome) return false;
          state.helped = true;
          persist();
          return true;
        },
      });
    }
    function render(animate = false) {
      input.value = state.draft || "";
      input.readOnly = Boolean(state.outcome);
      check.hidden = Boolean(state.outcome);
      refreshVocabulary();
      if (state.outcome) {
        feedback.dataset.kind = "correct";
        feedback.innerHTML = KeystoneFeedback.markup(state.outcome === "corrected" ? "corrected" : "correct", { animate });
      } else feedback.textContent = state.feedback || "";
    }
    input.oninput = () => {
      state.draft = input.value;
      if (state.feedback) {
        state.feedback = "Answer changed. Check your new length.";
        feedback.textContent = state.feedback;
      }
      persist();
    };
    hint.ontoggle = () => {
      if (hint.open && !state.outcome) { state.helped = true; persist(); }
    };
    panel.ontoggle = refreshVocabulary;
    form.onsubmit = event => {
      event.preventDefault();
      if (state.outcome) return;
      const answer = input.value.trim(), quantity = window.NarajosAssessment.parse(answer, "mm");
      if (!Number.isFinite(quantity.value)) {
        state.draft = input.value;
        state.feedback = quantity.message;
        if (answer) state.helped = true;
        persist(); render(); input.focus(); return;
      }
      const correct = window.NarajosAssessment.matches(quantity.value, 36*100/620, 0, "to 1 decimal place", "mm");
      state.attempts = (state.attempts || 0) + 1;
      state.firstAttempt ||= {answer, correct, helped:Boolean(state.helped || hint.open)};
      state.draft = input.value;
      if (correct) {
        state.outcome = state.attempts > 1 ? "corrected" : state.helped || hint.open ? "hint-supported" : "independent";
        state.feedback = "Correct!";
      } else {
        state.feedback = Math.abs(quantity.value - 18) < 1e-6 ? "18 mm is the drawn length for 310 µm. Use the fraction that represents 100 µm." :
          Math.abs(quantity.value - 0.1) < 1e-6 ? "0.1 mm is the real length of 100 µm. Use the enlargement to find the length on paper." :
          "Recheck the scale. The 246-unit segment spans two reference bars. Use its real length and the 36 mm drawn length, then round.";
        state.helped = true;
      }
      persist(); render(correct); focus(feedback);
    };
    form.append(label, check, feedback);
    panel.append(hint, form, node("p", "Drawing magnification is the length on the page divided by the actual length, in the same units. When you resize a drawing, resize its bar in the same proportion. The bar still represents the same actual length."));
    render();
    return panel;
  }

  function drawings(host) {
    const stored = read();
    if (stored.drawingVersion !== drawing.version) {
      const outcomes = Object.entries(stored.drawingOutcomes || {});
      const oldObservation = id => typeof id === "string" && id.includes(".");
      const observations = outcomes.filter(([id]) => oldObservation(id));
      const hasObservationSet = stored.drawingVersion === 2 ||
        stored.drawingSession?.ids?.some(oldObservation) || stored.drawingReview?.entries?.some(entry => oldObservation(entry.id));
      const prior = {session:stored.drawingSession, review:stored.drawingReview, round:stored.drawingRound};
      if (stored.drawingVersion === 3 && (hasObservationSet || observations.length)) {
        // The images and criteria changed. Keep the previous attempts as
        // history rather than applying their scores to the revised bank.
        stored.batch27DrawingSet = {...(hasObservationSet ? prior : {}), outcomes:Object.fromEntries(observations)};
        stored.drawingOutcomes = Object.fromEntries(outcomes.filter(([id]) => !oldObservation(id)));
      } else if (hasObservationSet || observations.length) {
        stored.earlierObservationSet = {...(hasObservationSet ? prior : {}), outcomes:Object.fromEntries(observations)};
        stored.drawingOutcomes = Object.fromEntries(outcomes.filter(([id]) => !oldObservation(id)));
      }
      if (!hasObservationSet && (prior.session || prior.review)) stored.previousDrawingSet = prior;
      delete stored.drawingSession;
      delete stored.drawingReview;
      stored.drawingRound = 0;
      stored.drawingVersion = drawing.version;
      save(stored);
    }
    if (stored.earlierObservationSet) {
      const prior = stored.earlierObservationSet, history = node("details");
      history.append(node("summary", "Earlier observation judgements"),
        node("p", "These attempts used the earlier drawings and criteria. Your current set starts with the revised questions."));
      if (prior.session) history.append(node("p", "Your earlier set reached drawing " + (prior.session.index + 1) + " of 6."));
      if (prior.review) history.append(node("p", "Your completed earlier set contains " + prior.review.entries.length + " judgements."));
      const records = node("ul");
      for (const [id, result] of Object.entries(prior.outcomes || {}))
        records.append(node("li", id + " · " + (outcomeNames[result] || result)));
      history.append(records);
      host.append(history);
    }
    if (stored.batch27DrawingSet) {
      const prior = stored.batch27DrawingSet, history = node("details");
      history.append(node("summary", "Previous drawing judgements"),
        node("p", "These attempts used the previous photographs and drawings. They are kept separately from the revised practice."));
      const records = node("ul");
      for (const [id, result] of Object.entries(prior.outcomes || {}))
        records.append(node("li", id + " · " + (outcomeNames[result] || result)));
      history.append(records);
      host.append(history);
    }
    if (stored.previousDrawingSet || Object.keys(stored.drawingOutcomes || {}).some(id => /-\d$/.test(id))) {
      const history = node("details");
      history.append(node("summary", "Earlier schematic drawing practice"));
      const previous = stored.previousDrawingSet || {};
      history.append(node("p", previous.session ? "Your earlier set was saved at drawing " + (previous.session.index + 1) + " of 6." : "Your earlier practice is saved."));
      const records = node("ul");
      for (const [id, result] of Object.entries(stored.drawingOutcomes || {})) {
        if (/-\d$/.test(id)) records.append(node("li", id + " · " + (outcomeNames[result] || result)));
      }
      history.append(records);
      host.append(history);
    }
    if (!drawing.bank.length) {
      host.append(node("p", "The schematic examples have been retired for scientific review."));
      return;
    }
    const block = node("section", null, "al-teaching al-drawing");
    const bar = stageBar([["idea", "Observe and decide"], ["model", "Worked drawing"],
      ["guided", "Evaluate examples"], ["review", "Draw and review"]]);
    currentStage(bar, "idea");
    host.append(bar, block);
    const introduction = drawingWorked(bar);
    introduction.open = !stored.drawingSession && !stored.drawingReview;
    block.append(introduction, drawingTypes());
    const conventions = node("section", null, "al-drawing-conventions");
    conventions.append(node("h3", "Before you judge a drawing"));
    const reminders = node("ul");
    [
      "Use single continuous lines and leave out shading or hatching. Show the observed relative sizes.",
      "Put labels beside the drawing. Follow each line to the structure it names. The nucleus label line may enter the cell, but it must end on the nucleus.",
      "Draw only structures the observation supports. In a tissue map, show tissue boundaries rather than individual cells.",
      "Give the drawing an explanatory title and an indication of size. A calibrated scale bar must change length in proportion when the drawing is resized."
    ].forEach(text => reminders.append(node("li", text)));
    conventions.append(reminders, node("p", "Start with a guided onion-cell comparison, then practise cell drawings before the tissue maps."));
    block.append(conventions);
    const start = button(
      read().drawingSession ? "Resume drawing set" : "Start a six-drawing set",
      () => round(true),
    );
    start.classList.add("primary");
    block.append(start);
    const exercise = node("section", null, "al-drawing-judgement");
    block.append(exercise, scalePractice(), paperDrawing(bar));
    function drawReview(review, moveFocus) {
      currentStage(bar, "review");
      window.ALevelVocabulary?.setAssessment(exercise, { completed: true });
      const heading = node("h3", "Review your drawings");
      const completion = node("p");
      completion.innerHTML = KeystoneFeedback.markup("complete", { label: "Drawing set complete", animate: moveFocus });
      exercise.replaceChildren(heading, completion, outcomeOverview(review.entries.map(entry => entry.outcome)),
        node("p","These results record your judgements of supplied drawings. Use the paper task to practise producing your own."));
      const detail = node("details");
      detail.append(node("summary", "Review the completed drawings"));
      const entries = node("ol");
      for (const entry of review.entries) {
        const item = drawing.bank.find(candidate => candidate.id === entry.id);
        if (item) entries.append(node("li", item.specimen.name + " · " + (item.scope === "complete" ? "complete drawing judgement" : "focused judgement") + " · " + outcomeNames[entry.outcome] + ". " + item.why));
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
        session.index > 5 || !Array.isArray(session.ids) || session.ids.length !== 6 ||
        !session.ids.every(id => drawing.bank.some(item => item.id === id))
      ) {
        const round = Number.isInteger(data.drawingRound)
          ? data.drawingRound
          : 0;
        session = { round, index: 0, attempts: 0, helped: false, ids: drawing.setFor(round).map(item => item.id) };
        data.drawingRound = round + 1;
      }
      const round = session.round;
      session.entries ||= [];
      let at = session.index;
      function persistDrawing() {
        const stored = read();
        stored.drawingVersion = drawing.version;
        stored.drawingRound = data.drawingRound;
        stored.drawingSession = session;
        save(stored);
      }
      persistDrawing();
      start.hidden = true;
      introduction.open = false;
      const pool = session.ids.map(id => drawing.bank.find(item => item.id === id));
      function show(animate = false) {
        exercise.replaceChildren();
        const item = pool[at];
        window.ALevelVocabulary?.setAssessment(exercise, { completed: Boolean(session.outcome) });
        const complete = item.scope === "complete";
        currentStage(bar, "guided");
        exercise.append(
          node(
            "h3",
            (at === 0 ? "Guided judgement" : "Independent judgement") +
              " · " +
              (at + 1) +
              " of 6",
          ),
          node("p", item.specimen.name),
          node("strong", complete ? "Complete drawing" : "Focused practice · " + item.focus),
        );
        const criteria = node("ul", null, "al-drawing-criteria");
        criteria.append(node("li", item.criterion));
        if (complete) {
          criteria.append(node("li", "Check which structures are shown and compare their relative sizes. Look for single continuous lines, no shading or hatching, and labels that clearly identify the structures."),
            node("li", "Read the title on the drawing. Check that it explains what is shown and that the scale bar agrees with the calibrated observation."));
        } else {
          criteria.append(node("li", "Judge only the named features. The source lacks verified size information, so this exercise cannot establish whether the drawing is complete."));
        }
        exercise.append(criteria, drawingComparison(item, session, persistDrawing));
        const verdict = node("fieldset");
        verdict.append(node("legend", complete ? "Is this a complete drawing for the stated task?" : "How well do the specified features match the observation and task?"));
        const choices = complete ? ["Accept", "Reject"] : ["Features match", "Features need correction"];
        choices.forEach((text, j) => {
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
        categories.append(node("legend", "Which features need correcting?"),
          node("p","Choose “Structures shown” when a structure is added or left out. Choose “Relative size” when a structure is drawn too large or too small compared with the rest."));
        drawing.categories.forEach((name, j) => {
          if (item.allowedCategories && !item.allowedCategories.includes(j)) return;
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
        feedback.setAttribute("aria-atomic", "true");
        if (session.outcome) {
          const reason = item.defects.map(index => drawing.categories[index]).join(", ");
          const message = node("span");
          message.innerHTML = KeystoneFeedback.markup(session.outcome === "corrected" ? "corrected" : "correct", { key: at, animate });
          if (reason) message.append(" " + reason + ". " + item.why);
          feedback.dataset.kind = "correct";
          feedback.append(message);
        } else if (session.attempts) {
          const previous = session.lastAttempt || session.firstAttempt;
          const extra = (previous?.categories || []).find(category => !item.defects.includes(category));
          const lead = extra === undefined ? "Compare again. " : "Recheck your choice of " + drawing.categories[extra].toLowerCase() + ". ";
          feedback.textContent = lead + (session.attempts > 1 ? item.why : drawing.cues[item.id]?.[1] || item.specimen.clue);
        }
        const next = button(at < pool.length - 1 ? "Next drawing" : "Review progress", () => {
          if (!session.outcome) return;
          session.entries[at] = { id:item.id, scope:item.scope, outcome:session.outcome, firstAttempt:session.firstAttempt, attempts:session.attempts };
          const entries = session.entries;
          at++;
          session = { round, index: at, attempts: 0, helped: false, entries, ids: session.ids };
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
            feedback.textContent = "Choose “" + choices[0] + "” or “" + choices[1] + "” first.";
            return;
          }
          const cats = session.categories || [];
          if (session.verdict === 1 && !cats.length) {
            feedback.textContent = "Select the feature that needs correcting.";
            focus(categories.querySelector("input"));
            return;
          }
          const ok = session.verdict === Number(item.defects.length > 0) &&
            cats.length === item.defects.length && item.defects.every(value => cats.includes(value));
          session.lastAttempt = {verdict:session.verdict, categories:cats.slice(), correct:ok, withClue:session.helped};
          session.firstAttempt ||= session.lastAttempt;
          session.attempts++;
          session.view = "candidate";
          if (ok) session.outcome = session.attempts > 1 ? "corrected" : at === 0 ? "guided" : session.helped ? "hint-supported" : "independent";
          persistDrawing();
          if (ok) {
            const stored = read();
            stored.drawingOutcomes ||= {};
            stored.drawingOutcomes[item.id] = session.outcome;
            save(stored);
          }
          show(ok);
          focus(exercise.querySelector('[role="status"]'));
        });
        check.classList.add("primary");
        exercise.append(verdict, categories, feedback, session.outcome ? next : check);
        if (!session.outcome) {
          const hint = node("details");
          hint.append(
            node("summary", "Help with this judgement"),
            node(
              "p",
              drawing.cues[item.id]?.[1] || item.specimen.clue,
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
    ["Question interpretation and practical reasoning", ["interpret", "practical"]],
    ["Extended answers", ["extended"]],
    ["Drawing and observation", ["drawings"]],
    ["Scientific precision and explanations", ["precision", "points", "mechanisms", "pressures", "regulation"]],
    ["Unfamiliar contexts", ["causal"]],
    ["Data, calculations and models", ["evidence", "osmosis", "countercurrent", "calvin", "dihybrid", "hardy"]],
  ];
  const skillDetails = {
    interpret: ["Understand the question", "Identify the target, select evidence and build a relevant answer.", "idea", "interpret question command words task target use data relevant answering suggest explain"],
    precision: ["Explain precisely", "Compare scientific statements and improve your own explanation.", "pen", "precise terminology scientific language osmosis chromatids homologous transcription translation"],
    practical: ["Reason through practicals", "Explain how the method affects the result and the claim.", "guided", "practical reasoning method controls confounding accuracy repeatability colorimeter stain chromatography"],
    evidence: ["Interpret data", "Choose the method and decide what the evidence supports.", "calculator", "interpret data statistical significance p values graph rate percentage calibration uncertainty extrapolation"],
    extended: ["Develop extended answers", "Connect relevant mechanisms and develop the answer to a title.", "pen", "extended response synoptic essay title relevance application breadth"],
    drawings: ["Biological drawings", "Compare real specimens with drawings, then try drawing on paper.", "diagram", "biological drawing scientific drawing tissue plan observation accept reject scale bar"],
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
      if (saved.drawingVersion !== drawing.version) return ["Start", ""];
      if (saved.drawingSession) return ["Resume", "Drawing " + (saved.drawingSession.index + 1) + " of 6"];
      return saved.drawingReview ? ["Review", "Six-drawing set"] : ["Start", ""];
    }
    const state = saved[id];
    if (!state) return ["Start", ""];
    if (id === "interpret") {
      const lessons = window.ALevelQuestionInterpretation.lessons;
      const units = state.sequences?.units;
      if (!units) return ["Start", ""];
      const complete = lessons.filter(lesson => units[lesson.id]?.practice?.completed).length;
      return [complete === lessons.length ? "Review" : "Resume", complete + " of " + lessons.length + " sequences complete"];
    }
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
        const [name, description] = skillDetails[id];
        const [action, progress] = activityStatus(id, saved);
        const row = node("li");
        const entry = node("a", null, "al-catalogue-row");
        entry.href = "#exam-" + id;
        const copy = node("span", null, "al-catalogue-copy");
        copy.append(node("strong", name), node("span", description));
        if (progress) copy.append(node("small", progress));
        entry.append(copy);
        if (action !== "Start") entry.append(node("span", action, "al-row-action"));
        row.append(entry);
        rows.append(row);
      }
      section.append(rows);
      host.append(section);
    }
    const other = node("p", null, "al-journey-links");
    other.append(quietLink("Evaluate unfamiliar data", "/alevel/evidence/"),
      quietLink("Maths Skills", "#practice"), quietLink("Paper 3 essay practice", "#topic-p3w"));
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
    "a2-mitosis": "Review mitosis",
    "a4-translation": "Review translation",
    "a5-chromat": "Review chromatography",
    "a6-glucal": "Review glucose calibration",
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
  const questionSkills = {
    "a2-mitosis": "interpret",
    "a2-mitindex": "practical",
    "a2-membrane": "practical",
    "a2-osmosis": "evidence",
    "a3-digestion": "interpret",
    "a3-heart": "precision",
    "a4-translation": "precision",
    "a5-chromat": "practical",
    "a5-respiro": "practical",
    "a6-adh": "interpret",
    "a6-glucal": "evidence",
    "a8-transfac": "interpret",
    "p3e-usedata": "evidence",
    "p3s-methods": "practical",
    "p3w-eplan": "extended",
  };

  function addQuestionSupport() {
    const main = document.getElementById("main");
    if (!main) return;
    function offer() {
      const family = families[questionSkills[location.hash.slice("#lesson-".length)]];
      const feedback = main.querySelector("#qf #fb");
      if (!location.hash.startsWith("#lesson-") || !family || !feedback || feedback.hidden ||
          !feedback.matches(".bad, .idk") || feedback.querySelector(".al-question-skill")) return;

      const open = button(family.title, () => {
        const dialog = node("dialog", null, "al-question-dialog al-exam");
        const heading = node("h2", family.title);
        const close = () => dialog.close();
        heading.id = "al-question-skill-title";
        dialog.setAttribute("aria-labelledby", heading.id);
        dialog.append(heading, button("Close skill lesson", close));
        journey(dialog, family, { context: () => null, back: close });
        // Keep activity-wide shortcuts from changing the question behind the modal.
        dialog.addEventListener("keydown", event => event.stopPropagation());
        dialog.addEventListener("close", () => {
          dialog.remove();
          open.focus();
        }, { once: true });
        main.append(dialog);
        dialog.showModal();
        focus(heading);
      });
      open.classList.add("al-question-skill");
      feedback.append(open);
    }
    // Topic questions replace the main content and then expose their existing feedback panel.
    new MutationObserver(records => {
      if (records.some(record => record.target === main || record.target.id === "fb")) offer();
    }).observe(main, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden"] });
    offer();
  }
  document.addEventListener("DOMContentLoaded", addQuestionSupport, { once: true });

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
      if (Object.hasOwn(paperRoutes, id)) {
        const paper = paperRoutes[id];
        const family = window.ALevelPaperPractice[id];
        host.classList.add("al-paper-practice");
        host.append(breadcrumb(...paper.back), node("h1", family.title));
        journey(host, family, { paper });
        return;
      }
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
      const original = id === "regulation" ? node("div", null, "al-regulation-original") : host;
      if (original !== host) host.append(original);
      journey(original, family, { context: contextualLink(family, "exam-" + id) });
      if (id === "regulation") {
        const investigation = node("section", null, "al-paper-practice al-gene-expression");
        investigation.append(node("h2", "Gene expression investigations"));
        host.append(investigation);
        journey(investigation, window.ALevelPaperPractice.geneExpression, { paper: { stimulus: "Investigation", back: ["Exam Skills", "#exam"], related: [] } });
      }
      const followOn = { interpret: "passages", practical: "investigations", evidence: "investigations", extended: "essaywriting" }[id];
      if (followOn) host.append(quietLink(window.ALevelPaperPractice[followOn].title, "#exam-" + followOn));
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

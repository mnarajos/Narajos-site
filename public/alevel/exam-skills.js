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
    if (text) element.textContent = text;
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
  function table(caption, headers, rows) {
    const wrap = node("div", null, "al-table"),
      t = node("table");
    t.createCaption().textContent = caption;
    const hr = t.createTHead().insertRow();
    headers.forEach((h) => {
      const th = node("th", h);
      th.scope = "col";
      hr.append(th);
    });
    const body = t.createTBody();
    rows.forEach((row) => {
      const r = body.insertRow();
      row.forEach((v) => (r.insertCell().textContent = v));
    });
    wrap.append(t);
    return wrap;
  }
  function graph(type) {
    const figure = node("figure"),
      svg = node("div");
    const points =
      type === "pressure"
        ? "40,178 110,176 140,150 170,38 210,33 250,60 280,160 320,180"
        : "55,164 115,130 175,96 235,62 295,28";
    const desc =
      type === "pressure"
        ? "Illustrative left-heart pressures. Solid ventricular line rises above atrial pressure at B, crosses above dashed aortic pressure at C, and falls below aortic pressure at D. Dotted atrial pressure remains low."
        : "Plant-tissue calibration example. Water potential in kPa is on x-axis, percentage change in mass on y-axis. The best-fit line passes through minus 800 kPa and minus 10%, minus 400 kPa and 0%, and 0 kPa and plus 10%.";
    svg.innerHTML =
      '<svg role="img" aria-label="' +
      desc +
      '" viewBox="0 0 360 245"><g fill="none" stroke="currentColor"><path d="M40 15V190H330"/><polyline stroke-width="2.5" points="' +
      points +
      '"/>' +
      (type === "pressure"
        ? '<path stroke-dasharray="8 5" stroke-width="2" d="M40 70L140 80 210 45 255 62 270 69 320 80"/><path stroke-dasharray="2 4" stroke-width="2" d="M40 178L105 170 140 175 320 173"/>'
        : '<path stroke-dasharray="4 4" d="M40 96H320M175 96V190"/>') +
      "</g>" +
      (type === "pressure"
        ? '<text x="113" y="148">B</text><text x="158" y="66">C</text><text x="253" y="93">D</text><text x="45" y="24">Pressure / mmHg</text><text x="155" y="220">Time / s</text>'
        : '<text x="43" y="208">−800</text><text x="156" y="208">−400</text><text x="290" y="208">0</text><text x="16" y="100">0</text><text x="8" y="168">−10</text><text x="12" y="31">10</text><text x="65" y="235">Solution water potential / kPa</text><text x="42" y="16">Change in mass / %</text>') +
      "</svg>";
    figure.append(
      svg,
      node(
        "figcaption",
        type === "pressure"
          ? "Solid · ventricle. Dashed · aorta. Dotted · atrium. Schematic pressure traces, with time increasing to the right."
          : "Model calibration line. Read the horizontal zero-change line, then down to the x-axis.",
      ),
    );
    return figure;
  }
  function visual(type, step = 99) {
    if (type === "calibration" || type === "pressure") return graph(type);
    if (type === "countercurrent") {
      const box = node("div");
      box.append(
        table(
          "Countercurrent model · positions left to right",
          ["Fluid", "Left", "2", "3", "Right"],
          [
            ["Water →", 100, 80, 60, 40],
            ["Blood ←", 90, 70, 50, 30],
          ],
        ),
        table(
          "Parallel-flow model · positions left to right",
          ["Fluid", "Left", "2", "3", "Right"],
          [
            ["Water →", 100, 75, 60, 55],
            ["Blood →", 10, 35, 50, 55],
          ],
        ),
      );
      return box;
    }
    if (type === "punnett") {
      const g = ["AB", "Ab", "aB", "ab"];
      const combine = (x, y) =>
        [x[0], y[0]].sort().join("") + [x[1], y[1]].sort().join("");
      return table(
        "AaBb × AaBb · complete worked cross",
        ["Gametes", ...g],
        g.map((x) => [x, ...g.map((y) => combine(x, y))]),
      );
    }
    if (type === "calvin") {
      const parts = [
        "CO₂ + RuBP (5C) → unstable 6C → 2 GP (3C)",
        "GP + ATP + reduced NADP → TP + NADP",
        "Most TP + ATP → RuBP regenerated",
        "Net TP → carbohydrates, lipids, and other organic compounds",
      ];
      const box = node("div", null, "al-path");
      parts
        .slice(0, Math.min(parts.length, step + 1))
        .forEach((p) => box.append(node("p", p)));
      return box;
    }
    if (type === "regulation") {
      const box = node("div");
      box.innerHTML =
        '<svg viewBox="0 0 400 235" role="img" aria-label="Two regulatory models. Closely packed nucleosomes restrict access to DNA. Acetylated, more separated nucleosomes permit greater access. A repressor bound at regulatory DNA inhibits transcription, and removal of it reduces repression."><g fill="none" stroke="currentColor" stroke-width="2"><path d="M20 68Q55 25 90 68T160 68T230 68"/><circle cx="65" cy="63" r="20"/><circle cx="108" cy="63" r="20"/><circle cx="151" cy="63" r="20"/><path d="M20 158Q60 110 100 158T180 158T260 158T340 158"/><circle cx="63" cy="151" r="17"/><circle cx="162" cy="151" r="17"/><circle cx="261" cy="151" r="17"/></g><text x="20" y="20">Compact chromatin · access restricted</text><text x="20" y="111">Histone acetylation · access increased</text><text x="20" y="197">Promoter methylation can reduce access.</text><text x="20" y="222">Repressor ┤ transcription</text></svg>';
      return box;
    }
    if (type === "pathway") {
      const box = node("div");
      box.innerHTML =
        '<svg viewBox="0 0 400 155" role="img" aria-label="Pathway A inhibits B, and B inhibits process C. Arrowhead means activation. A blunt end means inhibition."><g fill="none" stroke="currentColor" stroke-width="2"><rect x="15" y="35" width="65" height="45" rx="8"/><rect x="163" y="35" width="65" height="45" rx="8"/><rect x="310" y="35" width="75" height="45" rx="8"/><path d="M80 57H153M153 44V70M228 57H300M300 44V70M25 122H75M65 115L75 122L65 129M220 122H270M270 113V131"/></g><text x="43" y="64">A</text><text x="190" y="64">B</text><text x="343" y="64">C</text><text x="88" y="127">promotes</text><text x="285" y="127">inhibits</text></svg>';
      if (step > 2)
        box.append(
          node(
            "p",
            "A increases → B activity falls → inhibition of C falls → C activity can rise.",
          ),
        );
      return box;
    }
    return node("div");
  }
  function model(host, family) {
    const block = node("section", null, "al-teaching");
    block.append(
      node("h2", "Work through the reasoning"),
      node("p", family.principle),
    );
    let index = 0;
    const panel = node("div", null, "al-step"),
      art = node("div"),
      controls = node("div", null, "al-controls");
    const previous = button("Previous step", () => {
        index--;
        update();
      }),
      next = button("Next step", () => {
        index++;
        update();
      });
    controls.append(
      previous,
      next,
      button("Replay example", () => {
        index = 0;
        update();
      }),
    );
    block.append(panel, art, controls);
    host.append(block);
    function update() {
      panel.replaceChildren(
        node(
          "p",
          "Step " + (index + 1) + " of " + family.model.length,
          "al-stage",
        ),
        node("p", family.model[index]),
      );
      art.replaceChildren(visual(family.visual, index));
      previous.disabled = index === 0;
      next.disabled = index === family.model.length - 1;
      panel.setAttribute("aria-live", "polite");
    }
    update();
    return block;
  }
  const outcomeNames = {
    independent: "Independently correct",
    "hint-supported": "Correct with a clue",
    corrected: "Correct after correction",
    guided: "Correct in guided practice",
    "self-reviewed": "Written response self-reviewed",
    "needs-practice": "Still needs practice",
  };

  function loadFamily(family) {
    const state = read()[family.id] || {};
    for (const field of ["outcomes", "drafts", "attempts", "hints", "responses", "results", "reviews"]) {
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
        for (const field of ["outcomes", "attempts", "hints", "responses", "results", "reviews"])
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
      flow.stage?.(q.guided ? "guided" : "independent");
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
        status.textContent = text;
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
          render(true);
        });
        next.classList.add("primary");
        controls.append(next);
      } else {
        controls.append(submit);
        const hints = hintsFor(q);
        const hint = button(state.hints[i] ? "Another clue" : "Need a clue?", () => {
          const count = (state.hints[i] || 0) + 1;
          state.hints[i] = count;
          state.results[i] = { ...state.results[i], clue: true };
          announce("Clue · " + hints[count - 1], "hint");
          hint.textContent = count < hints.length ? "Another clue" : "Clues shown";
          hint.setAttribute("aria-disabled", String(count >= hints.length));
          persist();
        });
        hint.onclick = ((handler) => () => {
          if (hint.getAttribute("aria-disabled") !== "true") handler();
        })(hint.onclick);
        if (!writing && (state.hints[i] || 0) < hints.length) controls.append(hint);
        if (!writing) {
          const reveal = button("Show explanation", () => {
            state.results[i] = { kind: "revealed" };
            state.outcomes[i] = "needs-practice";
            persist();
            render();
            focus(block.querySelector('[role="status"]'));
          });
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
          attempts > 1 ? "corrected" : state.hints[i] ? "hint-supported" : "independent";
        persist();
        render();
        focus(block.querySelector('[role="status"]'));
      };
    }
    render();
    return block;
  }
  function drawings(host) {
    const block = node("section", null, "al-teaching");
    host.append(block);
    block.append(
      node("h2", "Learn to judge a drawing"),
      node(
        "p",
        "The task below specifies the requirements. Several flaws in line quality still belong to one category. A scale or label is judged when the task asks for it. These categories do not carry a universal mark each.",
      ),
    );
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
    block.append(comparison);
    const start = button(
      read().drawingSession ? "Resume drawing set" : "Start a six-drawing set",
      () => round(),
    );
    block.append(start);
    const exercise = node("section");
    block.append(exercise);
    function drawReview(review, moveFocus) {
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
    function round() {
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
      const pool = Array.from(
        { length: 6 },
        (_, j) => drawing.bank[((round * 6 + j) * 9) % drawing.bank.length],
      );
      function show() {
        exercise.replaceChildren();
        const item = pool[at];
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
        const figures = node("div", null, "al-figures");
        [true, false].forEach((ref) => {
          const fig = node("figure");
          fig.append(
            node(
              "figcaption",
              ref ? "Reference observation" : "Candidate drawing",
            ),
          );
          const image = node("div");
          image.innerHTML = drawing.svg(item, ref);
          fig.append(image);
          figures.append(fig);
        });
        exercise.append(figures);
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
        else if (session.attempts) feedback.textContent = "Review and improve. " + item.why;
        feedback.hidden = !feedback.textContent;
        const next = button("Next drawing", () => {
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
    }
  }
  function index(host, filter) {
    host.append(
      node("h1", "Exam Skills"),
      node(
        "p",
        "Choose a worked example, then practise the reasoning with guided and independent tasks.",
      ),
    );
    const list = node("div");
    const groups = [
      ["Biological drawings", ["drawings"]],
      ["Understanding mark schemes", ["points"]],
      [
        "Explaining biological mechanisms",
        ["mechanisms", "pressures", "regulation"],
      ],
      ["Unfamiliar contexts and causal reasoning", ["causal"]],
      [
        "Scientific data, calculations, and representations",
        ["osmosis", "countercurrent", "calvin", "dihybrid", "hardy"],
      ],
    ];
    for (const [title, ids] of groups) {
      const section = node("section"),
        rows = node("ul", null, "concepts");
      section.append(node("h2", title));
      for (const id of ids) {
        const family = families[id];
        if (
          filter &&
          family &&
          !family.topics.includes(filter) &&
          !family.papers.includes(filter)
        )
          continue;
        const li = node("li");
        li.append(
          link(
            id === "drawings" ? "Accept or Reject?" : family.title,
            "#exam-" + id,
          ),
        );
        if (family) li.append(node("p", family.principle));
        rows.append(li);
      }
      section.append(rows);
      list.append(section);
    }
    host.append(
      node(
        "p",
        "Progress and drafts are saved on this browser. Clearing browser data removes them. You can also reset progress in Settings.",
      ),
      list,
      link("Evaluate unfamiliar data", "/alevel/evidence/"),
      link("Maths Skills", "#practice"),
    );
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
    catchup(host, topic, concept) {
      const family = families[catchupMap[topic + "-" + concept]];
      if (family) {
        model(host, family);
        practise(host, family);
      }
    },
    route(host, id, filter) {
      host.append(
        link("A-level Biology home", "#"),
        link("Exam Skills", "#exam"),
      );
      if (!id || (!families[id] && id !== "drawings")) {
        index(host, filter);
        return;
      }
      if (id === "drawings") {
        host.append(node("h1", "Biological drawings"));
        drawings(host);
        return;
      }
      const f = families[id];
      host.append(node("h1", f.title));
      model(host, f);
      practise(host, f);
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

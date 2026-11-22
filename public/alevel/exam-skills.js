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
  function practise(host, family) {
    const saved = read(),
      key = family.id;
    let state = saved[key] || {};
    if (
      !Number.isInteger(state.index) ||
      state.index < 0 ||
      state.index >= family.tasks.length
    )
      state = { index: 0 };
    for (const field of [
      "outcomes",
      "drafts",
      "attempts",
      "hints",
      "responses",
    ]) {
      if (
        !state[field] ||
        typeof state[field] !== "object" ||
        Array.isArray(state[field])
      )
        state[field] = {};
    }
    const block = node("section", null, "al-teaching");
    host.append(block);
    const persist = () => {
      const data = read();
      data[key] = state;
      return save(data);
    };
    function render() {
      block.replaceChildren();
      const i = state.index,
        q = family.tasks[i];
      block.append(
        node("h2", q.guided ? "Guided practice" : "Independent application"),
        node("p", "Task " + (i + 1) + " of " + family.tasks.length),
        node("h3", q.prompt),
      );
      if (q.visual) block.append(visual(q.visual));
      const form = node("form"),
        feedback = node("div", null, "al-feedback");
      feedback.setAttribute("role", "status");
      let help = state.hints[i] || 0,
        correct = false,
        attempts = state.attempts[i] || 0;
      if (q.kind === "choice" || q.kind === "multi") {
        const field = node("fieldset");
        field.append(
          node(
            "legend",
            q.kind === "multi"
              ? "Select every applicable answer"
              : "Choose one answer",
          ),
        );
        q.options
          .map((option, j) => ({ option, j }))
          .sort(
            (a, b) =>
              ((a.j + i + family.id.length) % q.options.length) -
              ((b.j + i + family.id.length) % q.options.length),
          )
          .forEach(({ option, j }) => {
            const label = node("label"),
              input = node("input");
            input.type = q.kind === "multi" ? "checkbox" : "radio";
            input.name = "answer";
            input.value = j;
            input.checked = (state.responses[i] || []).includes(j);
            label.append(input, document.createTextNode(option));
            field.append(label);
          });
        form.append(field);
      } else if (q.kind === "number") {
        const label = node(
            "label",
            "Your answer" + (q.unit ? " (" + q.unit + ")" : ""),
          ),
          input = node("input");
        input.type = "text";
        input.inputMode = "decimal";
        input.name = "number";
        input.autocomplete = "off";
        input.value = state.responses[i] || "";
        label.append(input);
        form.append(label);
      } else if (q.kind === "group") {
        q.items.forEach(([text], j) => {
          const label = node("label", text),
            select = node("select");
          select.name = "group" + j;
          select.append(new Option("Choose a category", ""));
          q.groups.forEach((name, k) => select.append(new Option(name, k)));
          select.value = (state.responses[i] || [])[j] ?? "";
          label.append(select);
          form.append(label);
        });
      } else {
        const label = node("label", "Your explanation"),
          text = node("textarea");
        text.maxLength = 4000;
        text.name = "draft";
        text.value = state.drafts[i] || "";
        text.oninput = () => {
          state.drafts[i] = text.value;
          persist();
        };
        label.append(text);
        form.append(label);
      }
      const controls = node("div", null, "al-controls"),
        submit = node(
          "button",
          q.kind === "writing" ? "Compare with the checklist" : "Check answer",
          "btn primary",
        );
      submit.type = "submit";
      const hint = button("Need a clue?", () => {
        help++;
        state.hints[i] = help;
        const hints = q.hints || [
          "Answer the question first, then connect the mechanism to the consequence.",
          "Use the scientific terms in the worked example.",
        ];
        feedback.textContent = hints[Math.min(help - 1, hints.length - 1)];
        hint.textContent = "More help";
        hint.disabled = help >= hints.length;
        persist();
      });
      const next = button(
        i === family.tasks.length - 1 ? "Review this set" : "Next task",
        () => {
          if (i === family.tasks.length - 1) {
            block.replaceChildren(
              node("h2", "Set complete"),
              node(
                "p",
                "Review your outcomes or try the questions again after a delay.",
              ),
              button("Practise this set again", () => {
                state = {
                  index: 0,
                  outcomes: {},
                  drafts: {},
                  attempts: {},
                  hints: {},
                  responses: {},
                };
                persist();
                render();
                focus(block.querySelector("h2"));
              }),
              link("Choose another skill", "#exam"),
            );
            focus(block.querySelector("h2"));
            return;
          }
          state.index = i + 1;
          persist();
          render();
          focus(block.querySelector("h2"));
        },
      );
      next.hidden = true;
      form.addEventListener("input", () => {
        state.responses[i] =
          q.kind === "number"
            ? form.elements.number.value
            : q.kind === "group"
              ? [...form.querySelectorAll("select")].map((x) => x.value)
              : [...form.querySelectorAll("input:checked")].map(
                  (x) => +x.value,
                );
        persist();
      });
      controls.append(submit, hint, next);
      form.append(controls, feedback);
      block.append(
        form,
        link("Revisit catch-up teaching", "#catchup-" + family.catchup),
      );
      const record = (outcome) => {
        state.outcomes[i] = outcome;
        persist();
      };
      form.onsubmit = (e) => {
        e.preventDefault();
        if (q.kind === "writing") {
          if (form.elements.draft.value.trim().length < 12) {
            feedback.textContent = "Write an explanation before comparing it.";
            return;
          }
          feedback.replaceChildren(
            node(
              "p",
              "Compare each scientific point with your response. Use the checklist to revise your answer.",
            ),
          );
          q.points.forEach((point) => {
            const label = node("label"),
              check = node("input");
            check.type = "checkbox";
            label.append(check, document.createTextNode(point));
            feedback.append(label);
          });
          record("self-reviewed");
          next.hidden = false;
          return;
        }
        let response;
        if (q.kind === "number") {
          const raw = form.elements.number.value.trim().replace(/−/g, "-");
          if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw)) {
            feedback.textContent =
              "Enter a number in the stated units, including any negative sign.";
            return;
          }
          response = Number(raw);
          correct = Math.abs(response - q.answer) < 1e-6;
        } else if (q.kind === "group") {
          const selects = [...form.querySelectorAll("select")];
          if (selects.some((s) => s.value === "")) {
            feedback.textContent = "Choose a category for every statement.";
            return;
          }
          correct = selects.every((s, j) => +s.value === q.items[j][1]);
        } else {
          const answers = [...form.querySelectorAll("input:checked")].map(
            (x) => +x.value,
          );
          if (!answers.length) {
            feedback.textContent = "Choose an answer first.";
            return;
          }
          correct =
            q.kind === "multi"
              ? JSON.stringify(answers.sort((a, b) => a - b)) ===
                JSON.stringify([...q.answer].sort((a, b) => a - b))
              : answers[0] === q.answer;
        }
        attempts++;
        state.attempts[i] = attempts;
        persist();
        feedback.textContent =
          (correct ? "Correct. " : "Review this reasoning. ") + q.why;
        if (correct) {
          record(
            q.guided
              ? "guided"
              : attempts > 1
                ? "corrected"
                : help
                  ? "hint-supported"
                  : "independent",
          );
          next.hidden = false;
          submit.disabled = true;
          hint.hidden = true;
        } else {
          record("needs-practice");
        }
      };
      const outcomes = Object.values(state.outcomes);
      if (outcomes.length)
        block.append(
          node(
            "p",
            outcomes.filter((v) => v === "independent").length +
              " independent · " +
              outcomes.filter((v) =>
                ["guided", "hint-supported", "corrected"].includes(v),
              ).length +
              " supported · " +
              outcomes.filter((v) => v === "self-reviewed").length +
              " self-reviewed",
            "al-note",
          ),
        );
    }
    render();
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
          label.append(input, document.createTextNode(text));
          verdict.append(label);
        });
        const categories = node("fieldset");
        categories.hidden = true;
        verdict.onchange = () => {
          categories.hidden =
            verdict.querySelector("input:checked")?.value !== "1";
          if (categories.hidden)
            categories
              .querySelectorAll("input")
              .forEach((input) => (input.checked = false));
        };
        categories.append(
          node("legend", "If rejected, select every category affected"),
        );
        drawing.categories.forEach((name, j) => {
          const label = node("label"),
            input = node("input");
          input.type = "checkbox";
          input.value = j;
          label.append(input, document.createTextNode(name));
          categories.append(label);
        });
        const feedback = node("p");
        feedback.setAttribute("role", "status");
        const next = button("Next drawing", () => {
          at++;
          session = { round, index: at, attempts: 0, helped: false };
          persistDrawing();
          if (at < pool.length) {
            show();
            focus(exercise.querySelector("h3"));
          } else {
            const finished = read();
            delete finished.drawingSession;
            save(finished);
            start.hidden = false;
            start.textContent = "Start a six-drawing set";
            exercise.replaceChildren(
              node("h3", "Set complete"),
              node("p", "Use a new set for different specimens and defects."),
            );
            focus(exercise.querySelector("h3"));
          }
        });
        next.hidden = true;
        exercise.append(
          verdict,
          categories,
          button("Check judgement", () => {
            const chosen = verdict.querySelector("input:checked");
            if (!chosen) {
              feedback.textContent = "Choose Accept or Reject first.";
              return;
            }
            const cats = [...categories.querySelectorAll("input:checked")].map(
              (x) => +x.value,
            );
            const ok =
              +chosen.value === Number(item.defects.length > 0) &&
              JSON.stringify(cats) === JSON.stringify(item.defects);
            session.attempts++;
            persistDrawing();
            if (ok) {
              const stored = read();
              stored.drawingOutcomes ||= {};
              stored.drawingOutcomes[item.id] =
                at === 0
                  ? "guided"
                  : session.attempts > 1
                    ? "corrected"
                    : session.helped
                      ? "hint-supported"
                      : "independent";
              save(stored);
            }
            feedback.textContent =
              (ok ? "Correct. " : "Compare with the criteria. ") + item.why;
            next.hidden = !ok;
          }),
          feedback,
          next,
        );
        if (at === 0) {
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

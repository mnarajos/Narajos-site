import { curriculum } from "./ks3-lessons.js";

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function link(text, href) {
  const node = element("a", text);
  node.href = href;
  return node;
}

for (const list of document.querySelectorAll("[data-ks3-year]")) {
  const year = list.dataset.ks3Year;
  for (const { id, unit, title, href } of curriculum[year]) {
    const item = element("li");
    const lessonLink = link("", href || "/ks3/lesson/?topic=" + id);
    lessonLink.append(element("strong", unit), element("span", title));
    item.append(lessonLink);
    list.append(item);
  }
  if (location.hash === "#year-" + year) list.closest("details").open = true;
}

const lessonRoot = document.querySelector("[data-ks3-lesson]");
if (lessonRoot) {
  const id = new URLSearchParams(location.search).get("topic");
  for (const [year, lessons] of Object.entries(curriculum)) {
    const index = lessons.findIndex((lesson) => lesson.id === id);
    if (index >= 0) {
      renderLesson(lessons[index], year, index);
      break;
    }
  }
}

function disclosure(label, ...contents) {
  const details = element("details");
  details.append(element("summary", label), ...contents);
  return details;
}

function renderTable(visual) {
  const table = element("table");
  table.append(element("caption", visual.caption));
  const header = table.createTHead().insertRow();
  for (const name of visual.headers) {
    const cell = element("th", name);
    cell.scope = "col";
    header.append(cell);
  }
  const body = table.createTBody();
  for (const row of visual.rows) {
    const tr = body.insertRow();
    for (const value of row) tr.insertCell().textContent = value;
  }
  const wrapper = element("div", "", "writing-data");
  wrapper.append(table);
  return wrapper;
}

function renderParticles(layout) {
  const positions = {
    solid: [[25, 27], [44, 27], [63, 27], [25, 51], [44, 51], [63, 51], [25, 75], [44, 75], [63, 75]],
    liquid: [[22, 45], [43, 39], [64, 47], [78, 58], [33, 61], [53, 65], [19, 78], [43, 83], [65, 83]],
    gas: [[14, 14], [88, 14], [48, 25], [23, 48], [77, 50], [55, 63], [14, 83], [42, 91], [87, 85]]
  };
  const panel = element("div", "", "ks3-particle-box");
  panel.setAttribute("role", "img");
  panel.setAttribute("aria-label", {
    solid: "Nine particles close together in regular rows",
    liquid: "Nine particles close together in a jumbled group",
    gas: "Nine particles spread around the whole container"
  }[layout]);
  for (const [x, y] of positions[layout]) {
    const dot = element("span");
    dot.style.left = x + "%";
    dot.style.top = y + "%";
    panel.append(dot);
  }
  return panel;
}

function svgCircuit(closed) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 160 98");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", closed
    ? "A closed switch joins the wires in the loop"
    : "An open switch leaves a gap between the wires in the loop");
  function draw(tag, attributes) {
    const shape = document.createElementNS(ns, tag);
    for (const [name, value] of Object.entries(attributes)) shape.setAttribute(name, value);
    svg.append(shape);
  }
  draw("path", { d: "M75 15H24V77H52 M69 77H136V57 M136 35V15H87 M75 1V29 M87 7V23", fill: "none", stroke: "currentColor", "stroke-width": 2 });
  draw("path", { d: closed ? "M52 77H69" : "M52 77L68 63", fill: "none", stroke: "currentColor", "stroke-width": 2 });
  draw("circle", { cx: 136, cy: 46, r: 11, fill: "#f7faf8", stroke: "currentColor", "stroke-width": 2 });
  draw("path", { d: "M128 38L144 54 M128 54L144 38", fill: "none", stroke: "currentColor", "stroke-width": 2 });
  return svg;
}

function renderVisual(visual) {
  if (visual.headers) return renderTable(visual);
  const figure = element("figure", "", "ks3-diagram");
  figure.append(element("figcaption", visual.caption));
  const panels = element("div", "", "ks3-diagram-panels");
  figure.append(panels);

  switch (visual.type) {
    case "flow":
      panels.classList.add("ks3-flow");
      for (const [index, label] of visual.panels.entries()) {
        if (index > 0) {
          const arrow = element("span", "→", "ks3-flow-arrow");
          arrow.setAttribute("aria-hidden", "true");
          panels.append(arrow);
        }
        panels.append(element("div", label, "ks3-diagram-box"));
      }
      break;
    case "particles":
    case "molecules":
    case "periodic":
    case "ph":
      for (const panel of visual.panels) {
        const box = element("div", "", "ks3-diagram-box");
        box.append(element("strong", panel.label));
        if (visual.type === "particles") box.append(renderParticles(panel.layout));
        if (visual.type === "molecules") {
          const groups = element("div", "", "ks3-molecule-groups");
          for (const atoms of panel.groups) {
            const pair = element("span", "", "ks3-molecule");
            pair.setAttribute("role", "img");
            pair.setAttribute("aria-label", Array.from(atoms, (atom) => atom === "a" ? "green atom" : "purple atom").join(" bonded to "));
            for (const atom of atoms) pair.append(element("span", "", "ks3-atom ks3-atom-" + atom));
            groups.append(pair);
          }
          box.append(groups);
        }
        if (visual.type === "periodic") {
          for (const item of panel.values) box.append(element("div", item, "ks3-element-box"));
        }
        if (visual.type === "ph") {
          const swatch = element("div", "pH " + panel.value, "ks3-ph-" + panel.value);
          box.append(swatch);
        }
        panels.append(box);
      }
      break;
    case "forces":
      panels.append(element("div", "← " + visual.left, "ks3-force"),
        element("div", "Cyclist →", "ks3-diagram-box"),
        element("div", visual.right + " →", "ks3-force"));
      break;
    case "bars":
      panels.classList.add("ks3-bar-rows");
      for (const [label, value, unit] of visual.bars) {
        const row = element("div");
        row.append(element("span", label + " · " + value + " " + unit));
        const bar = element("span", "", "ks3-bar");
        bar.style.width = (value / visual.max) * 100 + "%";
        bar.setAttribute("aria-hidden", "true");
        row.append(bar);
        panels.append(row);
      }
      break;
    case "earth": {
      const earth = element("div", "", "ks3-day-night");
      earth.setAttribute("role", "img");
      earth.setAttribute("aria-label", "The Sun is on the left. The left side of Earth is lit. A dot marks a location on Earth.");
      earth.append(element("span", "Sun →"));
      const globe = element("div", "", "ks3-earth-globe");
      for (const label of visual.panels) globe.append(element("span", label));
      earth.append(globe);
      panels.append(earth);
      break;
    }
    case "circuits":
      for (const [label, closed] of [["Circuit A", false], ["Circuit B", true]]) {
        const box = element("div", "", "ks3-diagram-box ks3-circuit");
        box.append(element("strong", label), svgCircuit(closed));
        panels.append(box);
      }
      break;
  }
  return figure;
}

function renderQuestion(question, number, offset) {
  const article = element("article", "", "practice-card");
  article.dataset.catchupCheck = "";
  const heading = element("h3", question.prompt);
  heading.id = "catchup-q" + number;
  article.setAttribute("aria-labelledby", heading.id);
  const options = [...question.distractors];
  options.splice(offset % 3, 0, [question.answer, "Correct. " + question.correctFeedback]);
  const choices = element("ul", "", "ks3-choices");
  for (const [answer, feedback] of options) {
    const item = element("li");
    const button = element("button", answer);
    button.type = "button";
    button.dataset.feedback = feedback;
    button.setAttribute("aria-pressed", "false");
    item.append(button);
    choices.append(item);
  }
  const message = element("p", "", "ks3-feedback");
  message.setAttribute("role", "status");
  article.append(heading, choices, message);
  return article;
}

function renderLesson(lesson, year, index) {
  document.title = lesson.unit + " | KS3 Science Catch-up | Narajos";
  document.querySelector("h1").textContent = lesson.unit;
  const yearLink = document.querySelector("[data-year-link]");
  yearLink.textContent = "← Year " + year + " topics";
  yearLink.href = "/ks3/#year-" + year;

  const teaching = element("section", "", "practice-card ks3-lesson");
  const title = element("h2", lesson.title);
  const cue = element("p");
  cue.append(element("strong", "Start here. "), lesson.notice);
  const explanation = disclosure("Read the explanation", ...lesson.explain.map((sentence) => element("p", sentence)));
  teaching.append(title, renderVisual(lesson.visual), cue, explanation);
  if (lesson.related) {
    const more = element("p");
    more.append(link(lesson.related.title, lesson.related.href));
    teaching.append(more);
  }

  const checks = element("section", "", "ks3-checks");
  checks.append(element("h2", "Check your understanding"));
  for (const [number, question] of lesson.questions.entries()) {
    checks.append(renderQuestion(question, number + 1, index + number));
  }
  const transfer = element("article", "", "practice-card");
  transfer.append(element("h3", "Try it yourself"), element("p", lesson.transfer),
    disclosure("Compare your answer", element("p", lesson.model)));
  checks.append(transfer);
  const finish = element("p", "", "catchup-finish");
  finish.append(link("Choose another Year " + year + " topic", yearLink.href));
  lessonRoot.replaceChildren(teaching, checks, finish);
}

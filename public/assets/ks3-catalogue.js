import { curriculum, motionLessons, extraChecks, rampAngleQuestion } from "./ks3-lessons.js";
import { homeActivity } from "./ks3-home-activities.js";
import { recallFor, linkForward } from "./ks3-connections.js";
import { scienceParagraph } from "./ks3-words.js";
import { explore } from "./ks3-explorations.js";
import { fairTestPractice, fairTestPlan } from "./ks3-fair-tests.js";
import { addKS3Journey } from "./school-catchup-ks3.js";
import { ks3CatchupModel } from "./ks3-catchup-models.js";
import { separationOrder } from "./separation-order.js";

const illustrations = {
  "fair-tests": ["ramps", "A green toy car on a low ramp and a blue car on a higher ramp."],
  "the-body": ["oxygen-route", "Arrows run from a pair of lungs to a blood vessel, then to muscle cells."],
  reproduction: ["flower", "Cross-section of a flower showing pollen moving from an anther to a stigma, with an ovule below."],
  "chemical-reactions": ["reaction-flask", "A flask with a stopper in place before mixing and while gas bubbles form. Both pictures show a closed flask."],
  "separating-techniques": ["filtration", "A mixture of sand and salt water is poured through filter paper. Sand collects in the paper. The salt solution passes through into the beaker."],
  "earth-structure": ["rock-samples", "Sample A has bands with separate rounded grains. Sample B has interlocking angular crystals."],
  photosynthesis: ["photosynthesis", "Light, carbon dioxide, and water reach the leaf. The leaf makes glucose. Oxygen leaves."],
  metals: ["displacement", "A grey iron strip in blue solution. A reddish coating appears on the immersed part of the strip and the solution becomes paler."]
};

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
    solid: [[37, 64], [50, 64], [63, 64], [37, 78], [50, 78], [63, 78], [37, 92], [50, 92], [63, 92]],
    liquid: [[19, 92], [32, 92], [45, 92], [58, 92], [71, 92], [25, 80], [38, 77], [51, 80], [65, 79]],
    gas: [[14, 14], [88, 14], [48, 25], [23, 48], [77, 50], [55, 63], [14, 83], [42, 91], [87, 85]]
  };
  const panel = element("div", "", "ks3-particle-box");
  panel.setAttribute("role", "img");
  panel.setAttribute("aria-label", {
    solid: "Nine particles close together in regular rows",
    liquid: "Nine closely packed particles in an irregular group at the bottom",
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
  draw("circle", { cx: 136, cy: 46, r: 11, fill: closed ? "#ffdf82" : "#f7faf8", stroke: "currentColor", "stroke-width": 2 });
  draw("path", { d: "M128 38L144 54 M128 54L144 38", fill: "none", stroke: "currentColor", "stroke-width": 2 });
  return svg;
}

function renderIllustration(id) {
  const figure = element("figure", "", "ks3-illustration");
  const [file, description] = illustrations[id];
  const image = element("img");
  image.src = "/assets/ks3-diagrams/" + file + ".svg";
  image.alt = description;
  figure.append(image);
  return figure;
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
            pair.setAttribute("aria-label", Array.from(atoms, (atom) => atom === "a" ? "type X atom" : "type Y atom").join(" bonded to "));
            for (const atom of atoms) {
              const symbol = element("span", atom === "a" ? "X" : "Y", "ks3-atom ks3-atom-" + atom);
              symbol.setAttribute("aria-hidden", "true");
              pair.append(symbol);
            }
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
      earth.append(element("span", "Sun →"));
      const globe = element("div", "", "ks3-earth-globe");
      globe.setAttribute("aria-hidden", "true");
      for (const label of visual.panels) globe.append(element("span", label));
      const place = element("span", "", "ks3-location");
      globe.append(place);
      earth.append(globe);
      const positions = [
        ["Morning at the edge of the lit side.", 50, 17],
        ["Daytime. The location faces the Sun.", 19, 50],
        ["Evening at the edge of the dark side.", 50, 83],
        ["Night. The location faces away from the Sun.", 81, 50]
      ];
      let step = 0;
      const report = modelReport();
      function turn() {
        const [description, x, y] = positions[step];
        place.style.left = x + "%";
        place.style.top = y + "%";
        report.textContent = description;
      }
      panels.append(earth, modelButton("Turn Earth a quarter turn", () => { step = (step + 1) % positions.length; turn(); }), report);
      turn();
      break;
    }
    case "circuits": {
      const boxes = [["Circuit A", false], ["Circuit B", true]];
      for (const [label, closed] of boxes) {
        const box = element("div", "", "ks3-diagram-box ks3-circuit");
        box.append(element("strong", label), svgCircuit(closed));
        panels.append(box);
      }
      if (visual.reference) break;
      const report = modelReport();
      const controls = element("div", "", "ks3-model-controls");
      controls.append(modelButton("Close switch in circuit A", () => {
        const diagram = panels.querySelector(".ks3-circuit svg");
        const isClosed = controls.firstElementChild.getAttribute("aria-pressed") === "true";
        const next = !isClosed;
        diagram.replaceWith(svgCircuit(next));
        controls.firstElementChild.setAttribute("aria-pressed", String(next));
        controls.firstElementChild.textContent = next ? "Open switch in circuit A" : "Close switch in circuit A";
        report.textContent = next ? "Circuit A is closed. The lamp lights." : "Circuit A has a gap. The lamp goes out.";
      }));
      controls.firstElementChild.setAttribute("aria-pressed", "false");
      panels.append(controls, report);
      break;
    }
    case "moments": {
      const scale = element("div", "", "ks3-seesaw");
      const board = element("div", "", "ks3-seesaw-board");
      board.setAttribute("aria-hidden", "true");
      const leftWeight = element("span", "10 N");
      const rightWeight = element("span", "10 N");
      board.append(leftWeight, rightWeight);
      scale.append(board, element("span", "▲ Pivot", "ks3-seesaw-pivot"));
      const report = modelReport();
      const controls = element("div", "", "ks3-model-controls");
      const options = [1,2,3].map(distance=>modelButton(distance + " m", () => setDistance(distance)));
      function setDistance(distance) {
        board.style.transform = "rotate(" + (distance - 2) * 9 + "deg)";
        rightWeight.style.left = 50 + 14 * distance + "%";
        options.forEach((control,index)=>control.setAttribute("aria-pressed",String(index + 1 === distance)));
        report.textContent = "Left moment: 20 N m. Right moment: " + (distance * 10) + " N m. " +
          (distance === 2 ? "The seesaw balances." : (distance === 1 ? "The left" : "The right") + " end drops.");
      }
      controls.append(element("strong", "Move the right weight"), ...options);
      panels.append(scale, controls, report);
      setDistance(2);
      break;
    }
  }
  return figure;
}

function modelButton(label, action) {
  const control = element("button", label, "ks3-model-button");
  control.type = "button";
  control.addEventListener("click", action);
  return control;
}

function modelReport() {
  const output = element("p", "", "ks3-model-report");
  output.setAttribute("role", "status");
  return output;
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

const externalModels = {
  "states-of-matter": ["States of Matter: Basics", "states-of-matter-basics", "Choose Water, then compare the motion in Solid and Liquid. What changes, and what stays the same?"],
  forces: ["Forces and Motion: Basics", "forces-and-motion-basics", "Choose Net Force. Set up two equal pulls in opposite directions. Predict what happens when one side pulls harder."],
  "acids-and-alkalis": ["pH Scale: Basics", "ph-scale-basics", "Compare one acidic liquid and one alkaline liquid. Find the pH reading in each case and decide which side of 7 it is on."],
  electricity: ["Circuit Construction Kit: DC", "circuit-construction-kit-dc", "In Intro, make one loop with a battery, bulb, and switch. Predict what the bulb will do when you open the switch at a different position."]
};

function externalActivity(id) {
  const [name, slug, prompt] = externalModels[id];
  const step = element("p", prompt);
  const go = element("p");
  go.append(link("Open " + name + " on PhET", "https://phet.colorado.edu/en/simulations/" + slug));
  return disclosure("Explore with PhET (optional)", step, go);
}

function renderLesson(lesson, year, index) {
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  const canonical = new URL(canonicalLink.href);
  canonical.searchParams.set("topic", lesson.id);
  canonicalLink.href = canonical.href;
  document.title = lesson.unit + " | KS3 Science Catch-up | Narajos";
  document.querySelector("h1").textContent = lesson.unit;
  const yearLink = document.querySelector("[data-year-link]");
  yearLink.textContent = "← Year " + year + " topics";
  yearLink.href = "/science-catch-up/?year=" + year;
  document.querySelector("[data-lesson-breadcrumb]").textContent = lesson.unit;

  const teaching = element("section", "", "practice-card ks3-lesson");
  const cue = element("p");
  cue.append(element("strong", "Start here. "), lesson.notice);
  const fairTests = lesson.id === "fair-tests";
  const explanation = element("section", "", "ks3-explanation");
  explanation.append(element("h3", fairTests ? "Worked example · testing ramp angle" : "The key idea"));
  if (fairTests) {
    const aim = element("p", "", "ks3-fair-aim");
    aim.append(element("strong", rampAngleQuestion));
    const ramp = element("toy-ramp");
    ramp.id = "fair-test-ramp";
    ramp.dataset.catchupFirstEvidence = "";
    ramp.tabIndex = -1;
    const setup = element("p", "Release a toy from a ramp. It keeps rolling along the floor. Use the ruler to measure how far it goes from the foot of the ramp.", "ks3-ramp-setup");
    teaching.append(setup, element("p", "Try a shallow ramp and a steep ramp with the same toy. Change only the angle."), ramp);
    import("./toy-ramp.js");
    explanation.classList.add("ks3-fair-example");
    explanation.append(aim, element("p", lesson.notice), renderVisual(lesson.visual));
  } else {
    teaching.append(cue);
    if (lesson.id === "states-of-matter") {
      const model = element("ks3-states-model");
      model.dataset.catchupFirstEvidence = "";
      teaching.append(model);
      import("./ks3-states.js");
    } else {
      const original = [];
      const model = ks3CatchupModel(lesson.id);
      if (model) {
        original.push(model);
        if (lesson.id === "periodic-table") original.push(renderVisual(lesson.visual));
        if (lesson.visual.headers || lesson.id === "work-done") {
          original.push(disclosure(lesson.id === "work-done" ? "Compare the measured distances" : "Read the table", renderVisual(lesson.visual)));
        }
      } else {
        if (illustrations[lesson.id]) original.push(renderIllustration(lesson.id));
        if (!illustrations[lesson.id] || lesson.visual.headers) original.push(renderVisual(lesson.visual));
      }
      teaching.append(...explore(lesson, original, renderVisual));
    }
  }
  explanation.append(...lesson.explain.map(scienceParagraph));
  teaching.append(recallFor(lesson.id), explanation);
  if (fairTests) {
    teaching.append(disclosure("Compare the two ramp shapes", renderIllustration(lesson.id),
      element("p", "The drawing uses two colours to show the setups. In your test, use the same toy in both runs.")));
  }
  if (lesson.id === "states-of-matter") {
    teaching.append(disclosure("Compare the three arrangements", renderVisual(lesson.visual)));
  }
  if (lesson.id === "reproduction") {
    const sequence = element("science-sequence");
    sequence.setAttribute("kind", "pollen");
    teaching.append(disclosure("Follow a pollen grain", sequence));
  }
  const checks = element("section", "", "ks3-checks");
  checks.append(element("h2", "Check your understanding"));
  for (const [number, question] of lesson.questions.entries()) {
    checks.append(renderQuestion(question, number + 1, index + number));
  }
  if (fairTests) checks.append(...fairTestPractice());
  const extra = extraChecks[lesson.id];
  if (extra) {
    const [prompt, answer, correctFeedback, distractors] = extra;
    const number = lesson.questions.length + 1;
    checks.append(renderQuestion({prompt, answer, correctFeedback, distractors}, number, index + number));
  }
  const transfer = element("article", "", "practice-card");
  transfer.dataset.ks3Transfer = "";
  transfer.append(element("h3", "Try it yourself"), element("p", lesson.transfer));
  if (fairTests) transfer.append(fairTestPlan("sugar-investigation-plan", "Write your plan"));
  transfer.append(disclosure("Compare your answer", element("p", lesson.model)));
  const follow = linkForward(lesson.id);
  const finish = element("p", "", "catchup-finish");
  finish.append(link("Choose another Year " + year + " topic", yearLink.href));
  const diagramTopic = { "separating-techniques": ["filtration", "distillation"], electricity: "circuits",
    "the-body": "breathing", photosynthesis: "leaf", "light-and-sound": "refraction" }[lesson.id];
  if (diagramTopic) for (const id of [diagramTopic].flat()) {
    const practice = element("diagram-practice");
    practice.setAttribute("topic", id);
    if (["breathing","leaf"].includes(id)) practice.setAttribute("question-limit", "3");
    if (id === "distillation") practice.setAttribute("question-limit", "3");
    checks.append(practice);
  }
  if (lesson.id === "separating-techniques") checks.append(separationOrder());
  checks.append(transfer);
  if (externalModels[lesson.id]) checks.append(externalActivity(lesson.id));
  if (lesson.related) {
    const more = element("p");
    more.append(link(lesson.related.title, lesson.related.href));
    checks.append(more);
  }
  if (follow) checks.append(follow);
  lessonRoot.replaceChildren(teaching, checks, homeActivity(lesson.id), finish);
  addKS3Journey(teaching, lesson, year, renderVisual);
}

const lessonRoot = document.querySelector("[data-ks3-lesson]");
if (lessonRoot) {
  const id = new URLSearchParams(location.search).get("topic");
  for (const [year, units] of Object.entries(curriculum)) {
    const lessons = year === "8" ? [...units, ...motionLessons] : units;
    const index = lessons.findIndex((lesson) => lesson.id === id);
    if (index >= 0) {
      renderLesson(lessons[index], year, index);
      break;
    }
  }
}

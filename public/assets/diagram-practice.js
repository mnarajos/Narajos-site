import { topics as originalTopics } from "./diagram-practice-data.js";
import { depthTopics } from "./diagram-depth-data.js";
const topics = {...originalTopics, ...depthTopics};

function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function button(text, handler, className) {
  const node = el("button", text, className);
  node.type = "button";
  if (handler) node.addEventListener("click", handler);
  return node;
}

function status() {
  const node = el("p", "", "dp-status");
  node.setAttribute("role", "status");
  return node;
}

const callouts = {
  "skin-warm": [[118, 51], [371, 302], [454, 167]],
  "cycle-curves": [[327, 57], [130, 96], [498, 121]],
  "screening-grid": [[159, 116], [504, 116], [159, 272], [504, 272]],
  "simple-distillation": [[64, 73], [377, 87], [525, 313]],
  "glass-ray": [[179, 55], [407, 189], [494, 304], [156, 201]],
  "synapse-rest": [[77, 74], [330, 190], [78, 303]],
  "trolley-force": [[71, 55], [272, 59], [541, 249]],
  "inheritance-grid": [[252, 119], [416, 119], [252, 247], [416, 247]],
  "breath-in": [[355, 47], [58, 218], [340, 330]],
  airway: [[72, 48], [272, 65], [492, 275]],
  cuff: [[224, 47], [382, 126], [536, 316]],
  cast: [[220, 56], [309, 285], [475, 252]],
  antibody: [[84, 124], [222, 47], [388, 286]],
  filtration: [[154, 167], [420, 163], [425, 310]],
  "circuit-open": [[217, 30], [545, 192], [267, 320]],
  "gas-syringe": [[513, 95], [59, 65], [276, 57]],
  "iv-circuit": [[541, 134], [307, 122], [343, 322]],
  electrolysis: [[154, 119], [460, 121], [326, 309]],
  leaf: [[128, 64], [421, 177], [301, 332], [500, 54]],
  phloem: [[81, 190], [498, 161], [277, 233], [540, 309]],
  nephron: [[70, 55], [56, 220], [322, 59], [553, 268]],
  "sarcomere-long": [[97, 44], [67, 275], [329, 85]],
  insulation: [[222, 32], [528, 145], [386, 282]],
  quadrats: [[67, 174], [217, 314], [517, 32]]
};

function svgElement(name, attributes) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
  return node;
}

function draw(state, marks = [], tools = {}) {
  const figure = el("figure", "", "dp-figure");
  const stage = el("div", "", "dp-stage");
  const image = el("img");
  image.src = "/assets/practice-diagrams/" + state[0] + ".svg";
  image.alt = state[3];
  image.loading = "lazy";
  image.width = 600;
  image.height = 360;
  stage.append(image);
  const leaders = svgElement("svg", { viewBox: "0 0 600 360", "aria-hidden": "true", class: "dp-leaders" });
  stage.append(leaders);
  for (const [key, part, node] of marks) {
    const [x, preferredY] = callouts[state[0]][key.charCodeAt(0) - 65];
    const y = Math.max(50, Math.min(310, preferredY));
    leaders.append(svgElement("line", { x1:x, y1:y, x2:part.x, y2:part.y }));
    leaders.append(svgElement("circle", { cx:part.x, cy:part.y, r:4.5 }));
    node.classList.add("dp-marker");
    node.style.left = (x / 6) + "%";
    node.style.top = (y / 3.6) + "%";
    if (node.tagName === "BUTTON") {
      node.dataset.target = key;
      node.setAttribute("aria-label", key + ". " + part.cue);
    } else {
      node.setAttribute("aria-hidden", "true");
    }
    stage.append(node);
  }
  const inspect = button("Enlarge diagram", () => {
    const dialog = el("dialog", "", "dp-inspect");
    dialog.setAttribute("aria-label", "Enlarged diagram · " + state[1]);
    const close = button("Close enlarged diagram", () => dialog.close());
    const region = el("div", "", "dp-pan");
    region.tabIndex = 0;
    region.setAttribute("role","region");
    region.setAttribute("aria-label","Diagram detail. Swipe or use arrow keys to pan.");
    dialog.append(close, region);
    figure.append(dialog);
    const moved = [];
    function move(node, target) {
      if (!node) return;
      const placeholder = document.createComment("diagram position");
      node.before(placeholder);
      moved.push([node,placeholder]);
      target.append(node);
    }
    move(stage, region);
    move(tools.bank, dialog);
    move(tools.check, dialog);
    move(tools.report, dialog);
    dialog.addEventListener("close", () => {
      for (const [node,placeholder] of moved) placeholder.replaceWith(node);
      dialog.remove();
      inspect.focus();
    }, {once:true});
    dialog.showModal();
    region.focus();
  });
  figure.append(stage, inspect);
  return figure;
}

function buildModel(topic) {
  const section = el("section", "", "dp-model");
  const toggle = el("div", "", "dp-states");
  const diagram = el("div");
  const description = status();
  const labels = el("dl", "", "dp-key");
  for (const [key, part] of Object.entries(topic.parts)) {
    const row = el("div");
    row.append(el("dt", key + " · " + part.name), el("dd", part.role));
    labels.append(row);
  }

  function select(i) {
    const state = topic.states[i];
    const marks = i === 0 ? Object.entries(topic.parts).map(([key, part]) => [key, part, el("span", key)]) : [];
    diagram.replaceChildren(draw(state, marks));
    description.textContent = state[2];
    labels.hidden = i !== 0;
    Array.from(toggle.children).forEach((choice, index) => choice.setAttribute("aria-pressed", String(index === i)));
  }

  if (topic.states.length > 1) {
    toggle.setAttribute("role", "group");
    toggle.setAttribute("aria-label", "Model position");
    topic.states.forEach((state, i) => toggle.append(button(state[1], () => select(i))));
    section.append(toggle);
  }
  section.append(diagram, description, labels);
  select(0);
  return section;
}

function checkButton(section, report, check) {
  const control = button("Check answer", () => {
    const result = check();
    report.textContent = result;
  }, "dp-primary");
  section.append(control, report);
  return control;
}

function makeDiagramTask(section, topic, task, report) {
  const keys = task.parts || Object.keys(topic.parts);
  const labelFor = key => task.assignments?.[key] || topic.parts[key].name;
  let selected = null;
  const placed = new Map();
  const chips = new Map();
  const targets = new Map();
  const placements = el("ul", "", "dp-placements");
  const labelBank = el("div", "", "dp-bank");

  const marks = keys.map(key => {
    const target = button(key, () => selectTarget(key));
    targets.set(key, target);
    return [key, topic.parts[key], target];
  });

  function renderPlacements() {
    placements.replaceChildren(...keys.map(key => {
      const label = placed.get(key);
      const row = el("li", key + " · " + (label ? labelFor(label) : "empty"));
      if (label) row.append(button("Remove", () => {
        placed.delete(key);
        report.textContent = "Label removed from " + key + ".";
        renderPlacements();
        chips.get(label).focus();
      }, "dp-remove"));
      return row;
    }));
    for (const [key, target] of targets) {
      const label = placed.get(key);
      target.classList.toggle("dp-filled", Boolean(label));
      target.setAttribute("aria-label", key + ". " + topic.parts[key].cue + (label ? ". Label: " + labelFor(label) : ". Empty."));
    }
    for (const [key, chip] of chips) {
      chip.setAttribute("aria-pressed", String(key === selected));
      chip.classList.toggle("dp-used", Array.from(placed.values()).includes(key));
    }
  }

  function selectTarget(key) {
    if (task.type === "point") {
      selected = key;
      targets.forEach((target, targetKey) => target.setAttribute("aria-pressed", String(targetKey === key)));
      report.textContent = "Selected " + key + ".";
      return;
    }
    if (!selected) {
      report.textContent = "Choose a label first.";
      return;
    }
    drop(selected, key);
  }

  function drop(label, key) {
    for (const [target, value] of placed) if (value === label) placed.delete(target);
    placed.set(key, label);
    selected = null;
    report.textContent = labelFor(label) + " placed at " + key + ".";
    renderPlacements();
  }

  if (task.type === "label") {
    const hint = el("p", "Choose a label, then a letter. You can also drag a label to its letter.");
    labelBank.setAttribute("role", "group");
    labelBank.setAttribute("aria-label", "Labels");
    for (const key of [...keys.slice(1), keys[0]]) {
      const chip = button(labelFor(key), () => {
        selected = selected === key ? null : key;
        report.textContent = selected ? "Selected " + labelFor(key) + ". Choose a letter." : "Selection cleared.";
        renderPlacements();
      }, "dp-chip");
      const badge = el("span", "Selected · ", "dp-selection");
      badge.setAttribute("aria-hidden", "true");
      chip.prepend(badge);
      chips.set(key, chip);
      addDrag(chip, target => drop(key, target), section);
      labelBank.append(chip);
    }
    section.append(hint, labelBank);
  } else {
    for (const target of targets.values()) target.setAttribute("aria-pressed", "false");
  }
  const tools = {bank: task.type === "label" ? labelBank : null, report};
  section.append(draw(topic.states[0], marks, tools));
  if (task.type === "label") {
    section.append(placements);
    renderPlacements();
  }

  tools.check = checkButton(section, report, () => {
    if (task.type === "point") {
      if (!selected) return "Select a letter first.";
      return (selected === task.answer ? "Correct. " : "Look again. The answer is " + task.answer + ". ") + task.feedback;
    }
    if (placed.size < keys.length) return "Place the remaining labels first.";
    const correct = keys.filter(key => placed.get(key) === key);
    if (correct.length === keys.length) return "All labels correct. " + task.feedback;
    const retry = keys.filter(key => !correct.includes(key));
    for (const key of retry) placed.delete(key);
    renderPlacements();
    return correct.length + " of " + keys.length + " correct. Try " + retry.join(", ") + " again. " + task.feedback;
  });
}

function addDrag(chip, drop, section) {
  let active = null;
  let lastDrag = -Infinity;
  chip.addEventListener("click", event => {
    if (event.detail && performance.now() - lastDrag < 250) event.stopImmediatePropagation();
  }, { capture: true });
  function position(event) {
    active.ghost.style.left = event.clientX + "px";
    active.ghost.style.top = event.clientY + "px";
  }
  function finish(event, cancelled) {
    if (!active || active.id !== event.pointerId) return;
    const ghost = active.ghost;
    active = null;
    if (!ghost) return;
    ghost.remove();
    const target = cancelled ? null : document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-target]");
    lastDrag = performance.now();
    if (target && section.contains(target)) drop(target.dataset.target);
  }
  // A genuine keyboard click has no pointer event and must never be suppressed.
  chip.addEventListener("pointerdown", event => {
    if (!event.isPrimary || event.button !== 0) return;
    active = { id: event.pointerId, x: event.clientX, y: event.clientY };
    chip.setPointerCapture(event.pointerId);
  });
  chip.addEventListener("pointermove", event => {
    if (!active || active.id !== event.pointerId) return;
    if (!active.ghost && Math.hypot(event.clientX - active.x, event.clientY - active.y) > 7) {
      active.ghost = el("span", chip.innerText, "dp-ghost");
      active.ghost.setAttribute("aria-hidden", "true");
      (chip.closest("dialog") || document.body).append(active.ghost);
    }
    if (active.ghost) position(event);
  });
  chip.addEventListener("pointerup", event => finish(event, false));
  chip.addEventListener("pointercancel", event => finish(event, true));
  chip.addEventListener("lostpointercapture", event => finish(event, true));
}

function makeOrder(section, task, report) {
  const bank = el("div", "", "dp-bank");
  const answer = el("ol", "", "dp-order");
  const topic = section.closest("diagram-practice").getAttribute("topic");
  const key = "narajos-diagram-order:v1:" + topic + ":" + task.prompt;
  const signature = JSON.stringify(task.items);
  let chosen = [], compared = false, checked = false;
  const correct = () => chosen.length === task.items.length && chosen.every((id,i) => id === i);
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved?.signature === signature && Array.isArray(saved.chosen) &&
        saved.chosen.every(i => Number.isInteger(i) && i >= 0 && i < task.items.length) &&
        new Set(saved.chosen).size === saved.chosen.length) {
      chosen = saved.chosen;
      compared = saved.compared === true;
      checked = saved.checked === true && correct();
    }
  } catch {}
  function save() {
    try { localStorage.setItem(key, JSON.stringify({signature,chosen,compared,checked})); } catch {}
  }
  function draw() {
    answer.replaceChildren();
    chosen.forEach((id,index) => {
      const row = el("li");
      row.append(el("span",task.items[id]));
      const actions = el("div", "", "dp-move");
      for (const [name,offset] of [["Earlier",-1],["Later",1],["Remove",0]]) {
        const control = button(name, () => {
          const next = index + offset;
          chosen.splice(index,1);
          if (offset) chosen.splice(next,0,id);
          checked = false;
          draw();
          save();
          report.textContent = offset ? "Moved to step " + (next+1) + "." : "Step returned to the choices.";
          if (offset) (answer.children[next].querySelector('button:not(:disabled)')).focus();
          else bank.querySelector('[data-item="'+id+'"]').focus();
        });
        control.setAttribute("aria-label",name + " · step " + (index+1));
        control.disabled = index + offset < 0 || index + offset >= chosen.length;
        actions.append(control);
      }
      row.append(actions);
      answer.append(row);
    });
    for (const control of bank.children) control.disabled = chosen.includes(Number(control.dataset.item));
  }
  const rotation = task.items.length - 1;
  for (let index=0;index<task.items.length;index++) {
    const id = (index + rotation) % task.items.length;
    const choice = button(task.items[id], () => {
      chosen.push(id);
      checked = false;
      draw();
      save();
      (bank.querySelector("button:not(:disabled)") || section.querySelector(".dp-primary")).focus();
      report.textContent = "Added step " + chosen.length + ".";
    });
    choice.dataset.item = id;
    bank.append(choice);
  }
  section.append(el("p","Choose the steps in order. Use Earlier or Later to move one."), bank, answer);
  const success = () => (compared ? "Correct after a retry. " : "Correct. ") + task.feedback;
  checkButton(section, report, () => {
    if (chosen.length < task.items.length) return "Choose all the steps first.";
    const wrong = chosen.findIndex((id,index) => id !== index);
    checked = wrong === -1;
    if (!checked) compared = true;
    save();
    return checked ? success() : "Recheck step " + (wrong + 1) + ". Compare it with the steps immediately before and after it.";
  });
  draw();
  if (checked) report.textContent = success();
}

function makeCheck(section, task, report) {
  if (task.type === "order") return makeOrder(section, task, report);
  if (task.type === "choice") {
    const options = el("div", "", "dp-bank");
    options.setAttribute("role", "group");
    options.setAttribute("aria-label", "Answers");
    let selected = null;
    task.options.forEach((option, i) => {
      const choice = button(option, () => {
        selected = i;
        Array.from(options.children).forEach((node, index) => node.setAttribute("aria-pressed", String(index === i)));
        report.textContent = "";
      });
      choice.setAttribute("aria-pressed", "false");
      options.append(choice);
    });
    section.append(options);
    checkButton(section, report, () => selected === null ? "Choose an answer first."
      : (selected === task.answer ? "Correct. " : "Try again. ") + task.feedback);
    return;
  }
  const field = el("label", "", "dp-field");
  const cue = el("span", task.type === "number" ? "Your answer in " + task.unit : "Write your explanation");
  const input = el(task.type === "number" ? "input" : "textarea");
  if (task.type === "written") cue.className = "dp-write";
  field.append(cue, input);
  section.append(field);
  if (task.type === "number") {
    input.inputMode = "decimal";
    checkButton(section, report, () => {
      const value = input.value.trim().replace("−", "-");
      if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value)) return "Enter a number in " + task.unit + ".";
      return (Number(value) === task.answer ? "Correct. " : "Check the calculation. ") + task.feedback;
    });
    return;
  }
  input.rows = 3;
  const points = el("ul", "", "dp-model-points");
  points.hidden = true;
  points.replaceChildren(...task.points.map(point => el("li", point)));
  section.append(button("Compare with explanation points", () => {
    if (!input.value.trim()) {
      report.textContent = "Write your explanation first.";
      input.focus();
      return;
    }
    points.hidden = false;
    report.textContent = "Check your explanation against the points below.";
  }), report, points);
}

class DiagramPractice extends HTMLElement {
  connectedCallback() {
    const topic = topics[this.getAttribute("topic")];
    if (!topic || this.dataset.mounted) return;
    this.dataset.mounted = "true";
    this.classList.add("dp-practice");
    const overview = el("div", "", "dp-overview");
    overview.append(el("h2", topic.title), el("p", topic.cue));
    const study = el("details", "", "dp-study");
    study.open = true;
    study.append(el("summary", "Explore the model"), buildModel(topic));
    this.id ||= "activity-" + this.getAttribute("topic");
    this.append(overview, study);
    if (location.hash === "#" + this.id || new URLSearchParams(location.search).get("activity") === this.getAttribute("topic")) {
      requestAnimationFrame(() => this.isConnected && this.scrollIntoView({block:"start"}));
    }
    const limit = Number(this.getAttribute("question-limit")) || topic.questions.length;
    for (const task of topic.questions.slice(0, limit)) {
      const question = el("details", "", "dp-question");
      question.append(el("summary", task.prompt));
      const content = el("div", "", "dp-question-body");
      const report = status();
      question.append(content);
      question.addEventListener("toggle", () => {
        if (question.open) {
          study.open = false;
          for (const other of this.querySelectorAll(".dp-question[open]")) if (other !== question) other.open = false;
        }
      });
      this.append(question);
      if (["label", "point"].includes(task.type)) makeDiagramTask(content, topic, task, report);
      else makeCheck(content, task, report);
    }
  }
}

customElements.define("diagram-practice", DiagramPractice);

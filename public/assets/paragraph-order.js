function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function button(text, action) {
  const control = element("button", text);
  control.type = "button";
  control.addEventListener("click", action);
  return control;
}

export function mountParagraph(root, { cards, order, hints, success, guidance }, onChange) {
  const key = "narajos-paragraph-order:v1:" + root.dataset.writingOrder;
  const empty = () => cards.map(() => null);
  const roles = cards.map((_, index) => index === 0 ? "Topic sentence" : index === cards.length - 1
    ? "Concluding sentence" : "Supporting sentence " + index);
  const correct = () => slots.every((id, index) => id === index);
  let slots = empty();
  let checked = false;
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved?.slots?.length === cards.length && saved.slots.every(id => id === null || Number.isInteger(id) && id >= 0 && id < cards.length)) {
      const used = saved.slots.filter(id => id !== null);
      if (new Set(used).size === used.length) {
        slots = saved.slots;
        checked = saved.checked === true && correct();
      }
    }
  } catch { /* Storage can be unavailable on a shared device. */ }

  function save() {
    try { localStorage.setItem(key, JSON.stringify({ slots, checked })); } catch { /* Keep the activity usable. */ }
    onChange?.();
  }

  root.classList.add("sequence-order", "paragraph-order");
  const instructions = element("p", "Choose sentences in paragraph order. To swap two placed sentences, select one and then the other.");
  const bank = element("section", "", "writing-order-bank paragraph-bank");
  const bankCards = element("ul", "", "writing-order-options");
  const bankEmpty = element("p", "All sentences are in the paragraph.");
  bank.append(element("h4", "Available sentences"), bankCards, bankEmpty);
  const board = element("div", "", "writing-order-board paragraph-board");
  const builder = element("div", "", "writing-order-group");
  const list = element("ol", "", "paragraph-slots");
  builder.append(list);
  board.append(bank, builder);
  const status = element("p", "", "paragraph-status");
  status.setAttribute("role", "status");
  const result = element("p", "", "ks3-feedback writing-order-feedback");
  result.setAttribute("role", "status");
  const model = element("details", "", "paragraph-model");
  model.append(element("summary", "Read the completed paragraph"), element("p", cards.join(" "), "model"));
  const controls = element("div", "", "writing-order-controls");
  let destination = slots.indexOf(null);
  let moving = null;
  const nextPosition = element("p", "", "paragraph-next");
  const tip = element("details", "", "paragraph-hint");
  const tipText = element("p");
  tip.append(element("summary","Hint"), tipText);
  const undo = button("Return selected sentence to choices", () => {
    const position = moving;
    slots[position] = null;
    moving = null;
    destination = position;
    checked = false;
    draw();
    save();
    status.textContent = "Sentence returned to the choices.";
    entries[position].control.focus();
  });
  bank.prepend(nextPosition);
  bank.append(tip);
  const check = button("Check order", () => {
    if (slots.includes(null)) return;
    const firstError = slots.findIndex((id, index) => id !== index);
    if (firstError === -1) {
      checked = true;
      showResult();
      save();
      return;
    }
    clearReview();
    const { item, feedback, control } = entries[firstError];
    item.dataset.orderReview = "";
    feedback.textContent = "Not quite. " + hints[firstError];
    feedback.hidden = false;
    control.setAttribute("aria-describedby", feedback.id);
    control.focus({ preventScroll: true });
    item.scrollIntoView({ block: "nearest" });
  });
  const restart = button("Start again", () => {
    slots = empty();
    destination = 0;
    moving = null;
    checked = false;
    draw();
    save();
    status.textContent = "This paragraph has been cleared.";
    entries[0].control.focus();
  });
  const restartPrompt = element("details", "", "paragraph-restart");
  restartPrompt.append(element("summary", "Restart paragraph"), restart);
  controls.append(check, undo, restartPrompt);
  root.append(instructions, board, controls, status, result, model);

  function place(id, position) {
    const previousPosition = slots.indexOf(id);
    if (previousPosition !== -1) slots[previousPosition] = slots[position];
    slots[position] = id;
    destination = slots.indexOf(null);
    moving = null;
    checked = false;
    draw();
    save();
    status.textContent = "Updated " + roles[position].toLowerCase() + ".";
  }

  function choosePosition(position) {
    if (moving !== null && moving !== position) {
      place(slots[moving], position);
      entries[position].control.focus();
      return;
    }
    moving = slots[position] === null || moving === position ? null : position;
    destination = position;
    updateSelection();
    status.textContent = moving === null ? "Choose a sentence for " + roles[position].toLowerCase() + "." :
      "Selected " + roles[position].toLowerCase() + ". Choose another position to move or swap it.";
  }

  const canDrag = matchMedia("(min-width: 761px) and (pointer: fine)");
  let dragging = null;
  function draggable(control, getId) {
    control.addEventListener("dragstart", event => {
      const id = getId();
      if (!canDrag.matches || id === null) { event.preventDefault(); return; }
      dragging = id;
      event.dataTransfer.setData("text/plain", cards[id]);
      event.dataTransfer.effectAllowed = "move";
    });
    control.addEventListener("dragend", () => { dragging = null; });
  }

  const entries = roles.map((role, index) => {
    const item = element("li");
    item.dataset.orderPosition = index;
    if (index === 0 || index === roles.length - 1) item.classList.add("paragraph-boundary");
    const control = button("", () => choosePosition(index));
    const feedback = element("p", "", "paragraph-position-feedback");
    feedback.id = key.replaceAll(":", "-") + "-feedback-" + index;
    feedback.setAttribute("role", "status");
    draggable(control, () => slots[index]);
    item.addEventListener("dragover", event => {
      if (dragging === null) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    });
    item.addEventListener("drop", event => {
      if (dragging === null) return;
      event.preventDefault();
      const id = dragging;
      dragging = null;
      if (slots[index] !== id) place(id, index);
    });
    item.append(element("strong", role), control, feedback);
    list.append(item);
    return { item, control, feedback };
  });

  const sources = order.map(id => {
    const item = element("li");
    const control = button(cards[id], () => {
      if (destination < 0) return;
      place(id, destination);
      const next = sources.find(source => !source.item.hidden);
      (next?.item.querySelector("button") || check).focus({preventScroll:Boolean(next)});
    });
    control.className = "paragraph-drag-card";
    control.draggable = true;
    draggable(control, () => id);
    item.append(control);
    bankCards.append(item);
    return { id, item };
  });
  const updateDraggable = () => entries.forEach(({ control }, index) => {
    control.draggable = canDrag.matches && slots[index] !== null;
  });
  canDrag.addEventListener("change", updateDraggable);

  function clearReview() {
    for (const { item, control, feedback } of entries) {
      delete item.dataset.orderReview;
      control.removeAttribute("aria-describedby");
      feedback.hidden = true;
      feedback.textContent = "";
    }
  }

  function showResult() {
    result.hidden = !checked;
    model.hidden = !checked;
    if (checked) {
      result.dataset.result = "correct";
      result.replaceChildren(element("strong", "Correct."), " " + success);
    } else {
      delete result.dataset.result;
      result.textContent = "";
      model.open = false;
    }
  }

  function updateSelection() {
    for (const [i,entry] of entries.entries()) {
      const selected = moving === i;
      entry.control.setAttribute("aria-pressed", String(selected));
      const prefix = selected ? "Selected · " : i === destination && slots[i] === null ? "Next · " : "";
      entry.control.textContent = prefix + (slots[i] === null ? "Place here" : cards[slots[i]]);
      entry.control.setAttribute("aria-label", roles[i] + ". " + entry.control.textContent);
    }
    nextPosition.textContent = destination < 0 ? "All sentences placed. Check the order." :
      (moving === null ? "Next position · " : "Selected position · ") + roles[destination];
    const index = destination < 0 ? 0 : destination;
    tipText.textContent = (guidance?.[index] || "") + " " + hints[index];
    tip.hidden = destination < 0;
    undo.hidden = moving === null;
  }
  function draw() {
    clearReview();
    updateSelection();
    for (const { id, item } of sources) item.hidden = slots.includes(id);
    bankEmpty.hidden = slots.includes(null);
    check.disabled = slots.includes(null);
    restartPrompt.hidden = slots.every(id => id === null);
    restartPrompt.open = false;
    updateDraggable();
    showResult();
  }

  draw();
  return { get completed() { return checked; } };
}

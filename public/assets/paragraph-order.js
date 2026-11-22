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
  const instructions = element("p", "Choose a position, then pick a sentence.");
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
  const picker = element("dialog", "", "paragraph-picker");
  const pickerTitle = element("h3");
  pickerTitle.id = key.replaceAll(":", "-") + "-picker";
  pickerTitle.tabIndex = -1;
  picker.setAttribute("aria-labelledby", pickerTitle.id);
  const pickerTools = element("div", "", "paragraph-picker-tools");
  const pickerContent = element("div", "", "paragraph-picker-content");
  const close = button("Close", () => picker.close());
  picker.append(pickerTitle, pickerContent, pickerTools);
  let returnFocus;
  picker.addEventListener("close", () => returnFocus?.focus({ preventScroll: true }));

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
    checked = false;
    draw();
    save();
    status.textContent = "This paragraph has been cleared.";
    entries[0].control.focus();
  });
  const restartPrompt = element("details", "", "paragraph-restart");
  restartPrompt.append(element("summary", "Restart paragraph"), restart);
  controls.append(check, restartPrompt);
  root.append(instructions, board, controls, status, result, model, picker);

  function place(id, position) {
    const previousPosition = slots.indexOf(id);
    if (previousPosition !== -1) slots[previousPosition] = slots[position];
    slots[position] = id;
    checked = false;
    draw();
    save();
    status.textContent = "Updated " + roles[position].toLowerCase() + ".";
  }

  function remove(position) {
    slots[position] = null;
    checked = false;
    draw();
    save();
    status.textContent = "Sentence returned to the choices.";
  }

  function openPicker(position) {
    pickerTitle.textContent = roles[position];
    returnFocus = entries[position].control;
    pickerContent.replaceChildren();
    pickerTools.replaceChildren();
    const current = slots[position];
    if (current !== null) pickerContent.append(element("p", "Current sentence: " + cards[current]));
    if (guidance) pickerContent.append(element("p", guidance[position], "paragraph-hint"));
    const help = element("details", "", "paragraph-hint");
    const hint = hints[position].replace(/^Review [^.]+\. /, "");
    help.append(element("summary", "Hint"), element("p", hint));
    pickerContent.append(help);
    const choices = element("ul", "", "writing-order-options");
    for (const id of order) {
      if (id === current || slots.includes(id)) continue;
      const item = element("li");
      item.append(button(cards[id], () => { place(id, position); picker.close(); }));
      choices.append(item);
    }
    if (choices.childElementCount) pickerContent.append(choices);
    const taken = slots.map((id, index) => [id, index]).filter(([id, index]) => id !== null && index !== position);
    if (taken.length) {
      const exchange = element("details");
      const other = element("ul", "", "writing-order-options");
      for (const [id, index] of taken) {
        const item = element("li");
        item.append(button(roles[index] + " · " + cards[id], () => { place(id, position); picker.close(); }));
        other.append(item);
      }
      exchange.append(element("summary", current === null ? "Move a sentence from another position" : "Swap with another position"), other);
      pickerContent.append(exchange);
    }
    if (current !== null) pickerTools.append(button("Remove sentence", () => { remove(position); picker.close(); }));
    pickerTools.append(close);
    picker.showModal();
    pickerTitle.focus();
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
    const control = button("", () => openPicker(index));
    const feedback = element("p", "", "paragraph-position-feedback");
    feedback.id = pickerTitle.id + "-feedback-" + index;
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
    const control = element("span", cards[id], "paragraph-drag-card");
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

  function draw() {
    clearReview();
    for (const [index, { control }] of entries.entries()) {
      const id = slots[index];
      control.textContent = id === null ? "Choose sentence" : cards[id];
      control.setAttribute("aria-label", id === null ? "Choose sentence for " + roles[index].toLowerCase()
        : cards[id] + " Change " + roles[index].toLowerCase() + ".");
    }
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

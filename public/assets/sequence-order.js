function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function button(text, action, label = text) {
  const control = element("button", text);
  control.type = "button";
  if (label !== text) control.setAttribute("aria-label", label);
  control.addEventListener("click", action);
  return control;
}

export function mountSequence(root, {
  groups, order, bankTitle, itemName, reviewLabel, success, answerTitle, answer, storageKey
}) {
  const cards = groups.flatMap(group => group.cards);
  const positions = groups.flatMap(group => group.roles);
  const slots = cards.map(() => null);
  const signature = JSON.stringify(cards);
  let completed = false;
  let usedFeedback = false;
  if (storageKey) {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved?.signature === signature && Array.isArray(saved.slots) && saved.slots.length === slots.length) {
        const used = saved.slots.filter(id => id !== null);
        if (used.every(id => Number.isInteger(id) && id >= 0 && id < cards.length) && new Set(used).size === used.length) {
          usedFeedback = saved.usedFeedback === true;
          slots.splice(0, slots.length, ...saved.slots);
          completed = saved.completed === true && slots.every((id,index) => id === index);
        }
      }
    } catch {}
  }
  function save() {
    if (storageKey) try { localStorage.setItem(storageKey, JSON.stringify({signature,slots,completed,usedFeedback})); } catch {}
  }
  let selected = null;
  let drag = null;
  let suppressDragClick = false;

  const board = element("div", "", "writing-order-board");
  const bankPanel = element("section", "", "writing-order-bank");
  const bank = element("ul", "", "writing-order-options");
  const bankEmpty = element("p", "All items are placed.");
  bankPanel.append(element("h3", bankTitle), bank, bankEmpty);
  const destinations = element("div", "", "writing-order-groups");
  board.append(bankPanel, destinations);
  const action = element("p", "", "writing-order-announcement");
  const feedback = element("p", "", "ks3-feedback writing-order-feedback");
  action.setAttribute("role", "status");
  feedback.setAttribute("role", "status");
  const controls = element("div", "", "writing-order-controls");
  const model = element("details");
  if (answer) model.append(element("summary", answerTitle), ...answer.map(text => element("p", text, "model")));
  let solved = completed;
  let missed = false;

  function showCorrect(animate = false) {
    const lead = element("strong");
    lead.innerHTML = window.KeystoneFeedback?.markup(missed ? "corrected" : "correct", { animate }) ?? "Correct!";
    feedback.replaceChildren(lead, " " + success);
  }

  function refreshAssessment() {
    usedFeedback ||= completed;
    completed = false;
    save();
    feedback.textContent = "";
    delete feedback.dataset.result;
    model.hidden = true;
    model.open = false;
    check.disabled = slots.includes(null);
  }

  const check = button("Check order", () => {
    const firstError = slots.findIndex((id, index) => id !== index);
    feedback.dataset.result = firstError === -1 ? "correct" : "retry";
    if (firstError === -1) {
      if (!completed) showCorrect(!solved);
      solved = true;
      completed = true;
      save();
      model.hidden = !answer;
    } else {
      if (!solved) missed = true;
      usedFeedback = true;
      save();
      draw(firstError);
      const { label, hint } = positions[firstError];
      feedback.replaceChildren(element("strong", "Not quite."), " Review " + label.toLowerCase() + ". " + hint);
    }
    feedback.scrollIntoView({ block: "nearest" });
  });
  controls.append(check, button("Start again", () => {
    slots.fill(null);
    selected = null;
    draw();
    refreshAssessment();
    action.textContent = "Order cleared.";
    bank.querySelector("button").focus();
  }));
  root.classList.add("sequence-order");
  root.append(element("p", "Choose an item, then choose where it goes. You can also drag it by the handle."),
    board, action, controls, feedback, model);

  function place(id, position, focus) {
    const from = slots.indexOf(id);
    const previous = slots[position];
    if (from !== position) {
      if (from !== -1) slots[from] = previous;
      slots[position] = id;
    }
    selected = null;
    draw();
    refreshAssessment();
    action.textContent = "Placed in " + positions[position].label.toLowerCase() + ".";
    if (focus) destinations.querySelector('[data-order-card="' + id + '"]').focus({ preventScroll: true });
  }

  function card(id) {
    const control = button("", event => {
      selected = selected === id ? null : id;
      updateSelection();
      action.textContent = selected === null ? "Selection cleared." : "Choose a position for this " + itemName + ".";
      if (event.detail === 0 && selected !== null) {
        const target = destinations.querySelector("[data-order-place]:not(:disabled)");
        target?.focus();
      }
    });
    control.dataset.orderCard = id;
    control.className = "writing-order-card";
    const grip = element("span", "⠿", "writing-order-grip");
    grip.setAttribute("aria-hidden", "true");
    control.append(grip, element("span", cards[id]));
    return control;
  }

  function updateSelection() {
    root.toggleAttribute("data-order-selected", selected !== null);
    for (const control of root.querySelectorAll("[data-order-card]")) {
      control.setAttribute("aria-pressed", String(Number(control.dataset.orderCard) === selected));
    }
    for (const slot of destinations.querySelectorAll("[data-order-position]")) {
      const position = Number(slot.dataset.orderPosition);
      const available = selected !== null && slots[position] !== selected;
      slot.toggleAttribute("data-order-target", available);
      slot.querySelector("[data-order-place]").disabled = !available;
    }
  }

  function draw(review = -1) {
    bank.replaceChildren();
    for (const id of order) {
      if (slots.includes(id)) continue;
      const item = element("li");
      item.append(card(id));
      bank.append(item);
    }
    bankEmpty.hidden = bank.childElementCount !== 0;
    destinations.replaceChildren();
    let position = 0;
    for (const group of groups) {
      const section = element("section", "", "writing-order-group");
      const list = element("ol");
      section.append(element("h3", group.title), list);
      for (const { label } of group.roles) {
        const index = position++;
        const id = slots[index];
        const slot = element("li");
        slot.dataset.orderPosition = index;
        const placeLabel = id === null ? "Place here" : "Move here";
        const placeButton = button(placeLabel, () => place(selected, index, true), placeLabel + " · " + label);
        placeButton.dataset.orderPlace = "";
        const slotActions = element("div", "", "writing-order-slot-actions");
        slotActions.append(placeButton);
        slot.append(element("strong", label));
        if (id !== null) {
          slot.append(card(id));
          slotActions.append(button("Remove", () => {
            slots[index] = null;
            selected = null;
            draw();
            refreshAssessment();
            action.textContent = itemName[0].toUpperCase() + itemName.slice(1) + " returned to the choices.";
            bank.querySelector('[data-order-card="' + id + '"]').focus();
          }, "Remove · " + label));
        }
        slot.append(slotActions);
        if (review === index) {
          slot.dataset.orderReview = "";
          slot.append(element("strong", reviewLabel, "writing-order-review"));
        }
        list.append(slot);
      }
      destinations.append(section);
    }
    updateSelection();
  }

  function targetAt(x, y) {
    const slot = document.elementFromPoint(x, y)?.closest("[data-order-position]");
    return slot && destinations.contains(slot) ? slot : null;
  }

  root.addEventListener("keydown", event => {
    if (event.key !== "Escape" || selected === null) return;
    const original = root.querySelector('[data-order-card="' + selected + '"]');
    selected = null;
    updateSelection();
    original?.focus();
    action.textContent = "Selection cleared.";
  });
  root.addEventListener("pointerdown", event => {
    if (event.isPrimary) suppressDragClick = false;
    const grip = event.target.closest(".writing-order-grip");
    const source = grip?.closest("[data-order-card]");
    if (!source || !event.isPrimary || event.button !== 0) return;
    drag = { id: Number(source.dataset.orderCard), pointer: event.pointerId,
      startX: event.clientX, startY: event.clientY };
    grip.setPointerCapture(event.pointerId);
  });
  root.addEventListener("pointermove", event => {
    if (drag?.pointer !== event.pointerId) return;
    if (!drag.ghost && Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < 8) return;
    if (!drag.ghost) {
      selected = drag.id;
      updateSelection();
      drag.ghost = element("div", cards[drag.id], "writing-order-ghost");
      drag.ghost.setAttribute("aria-hidden", "true");
      document.body.append(drag.ghost);
      function scrollAtEdge() {
        if (!drag?.ghost) return;
        if (drag.y < 80) window.scrollBy({ top: -12, behavior: "instant" });
        else if (drag.y > innerHeight - 80) window.scrollBy({ top: 12, behavior: "instant" });
        drag.hover?.removeAttribute("data-order-hover");
        drag.hover = targetAt(drag.x, drag.y);
        drag.hover?.setAttribute("data-order-hover", "");
        drag.frame = requestAnimationFrame(scrollAtEdge);
      }
      drag.frame = requestAnimationFrame(scrollAtEdge);
    }
    drag.x = event.clientX;
    drag.y = event.clientY;
    drag.ghost.style.transform = "translate(" + (drag.x + 12) + "px," + (drag.y + 12) + "px)";
  });

  function finishDrag(event) {
    if (drag?.pointer !== event.pointerId) return;
    const { ghost, hover, frame, id } = drag;
    drag = null;
    if (!ghost) return;
    suppressDragClick = true;
    cancelAnimationFrame(frame);
    ghost.remove();
    hover?.removeAttribute("data-order-hover");
    const target = event.type === "pointerup" ? targetAt(event.clientX, event.clientY) : null;
    if (target) place(id, Number(target.dataset.orderPosition), false);
    else {
      selected = null;
      updateSelection();
      action.textContent = "Item not moved.";
    }
  }
  for (const type of ["pointerup", "pointercancel", "lostpointercapture"]) {
    root.addEventListener(type, finishDrag);
  }
  root.addEventListener("click", event => {
    if (event.detail && suppressDragClick) {
      suppressDragClick = false;
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  draw();
  check.disabled = slots.includes(null);
  model.hidden = !completed || !answer;
  if (completed) {
    feedback.dataset.result = "correct";
    showCorrect();
  }
}

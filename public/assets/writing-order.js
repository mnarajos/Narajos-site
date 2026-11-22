const exercises = {
  ramp: {
    paragraphs: [{
      title: "Why use the same car?",
      openingHint: "Start by saying what the pupil should keep the same.",
      cards: [
        "To test ramp height fairly, use the same car each time.",
        "Changing the car could change how far it rolls.",
        "If both the car and ramp height change, we cannot tell which change affected the distance.",
        "Keeping the car the same makes it easier to link any change in distance to the ramp height."
      ]
    }],
    order: [2, 0, 3, 1]
  },
  rocks: {
    paragraphs: [
      {
        title: "How Sample A formed",
        cards: [
          "The layers in Sample A suggest it formed from sediment.",
          "First, loose grains settled and built up in layers.",
          "As more layers formed on top, their weight pressed the grains below together.",
          "Minerals then cemented the grains together.",
          "Together, these steps explain the layers of hard, cemented grains in Sample A."
        ]
      },
      {
        title: "How Sample B formed",
        cards: [
          "The interlocking crystals in Sample B suggest it formed from molten rock.",
          "First, the molten rock began to cool.",
          "As it cooled, minerals began to form crystals.",
          "The crystals grew until their edges met.",
          "That is how the crystals came to fit together in the solid rock in Sample B."
        ]
      }
    ],
    order: [2, 9, 5, 1, 6, 0, 8, 3, 4, 7]
  }
};

function elm(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function button(text, handler) {
  const control = elm("button", text);
  control.type = "button";
  control.addEventListener("click", handler);
  return control;
}

for (const root of document.querySelectorAll("[data-writing-order]")) {
  const { paragraphs, order } = exercises[root.dataset.writingOrder];
  const bank = paragraphs.flatMap(({ cards }) => cards);
  const selection = [];
  const groupCounts = paragraphs.map(({ cards }) => cards.length);
  const chosen = elm("div", "", "writing-order-groups");
  const options = elm("ul", "", "ks3-choices writing-order-options");
  const optionsHeading = elm("h3", "Sentences to choose from");
  const controls = elm("div", "", "writing-order-controls");
  const feedback = elm("p", "", "ks3-feedback writing-order-feedback");
  feedback.setAttribute("role", "status");
  const model = elm("details");
  model.hidden = true;
  model.append(elm("summary", paragraphs.length === 1 ? "Read the completed paragraph" : "Read the completed paragraphs"),
    ...paragraphs.map(({ cards }) => elm("p", cards.join(" "), "model")));

  function report(result, verdict, detail) {
    feedback.dataset.result = result;
    feedback.replaceChildren(elm("strong", verdict), " " + detail);
    feedback.scrollIntoView({block: "nearest"});
  }

  const check = button("Check the order", () => {
    if (selection.length < bank.length) {
      const remaining = bank.length - selection.length;
      report("incomplete", "Not checked yet.", "Choose " + remaining + " more " +
        (remaining === 1 ? "sentence" : "sentences") + ".");
      return;
    }
    const firstError = selection.findIndex((id, index) => id !== index);
    if (firstError === -1) {
      report("correct", "Correct.", paragraphs.length === 1
        ? "Your opening gives the main idea. The middle explains it and the ending links it back to the question."
        : "Both paragraphs give the main idea, explain the steps in order and link them to the rock.");
      model.hidden = false;
      return;
    }
    const group = firstError < groupCounts[0] ? 0 : 1;
    const slot = group === 0 ? firstError : firstError - groupCounts[0];
    const roleHint = slot === 0 ? paragraphs[group].openingHint || "Start with the sentence that introduces the main idea."
      : slot === groupCounts[group] - 1 ? "Finish with the sentence that ties the explanation back to the question."
      : "Look for the sentence that directly follows the one before it.";
    const marked = chosen.querySelectorAll("li")[firstError];
    if (!marked.hasAttribute("data-order-review")) {
      marked.dataset.orderReview = "";
      const label = elm("strong", "Review this sentence", "writing-order-review");
      label.id = root.dataset.writingOrder + "-order-review";
      marked.append(label);
      marked.querySelector("button").setAttribute("aria-describedby", label.id);
    }
    const location = paragraphs.length > 1 ? paragraphs[group].title + ", sentence " : "Sentence ";
    report("retry", "Not quite.", location + (slot + 1) + " needs another look. " + roleHint +
      " Select the marked sentence to try again.");
  });
  const reset = button("Start again", () => {
    selection.length = 0;
    draw();
    options.querySelector("button").focus();
  });
  controls.append(check, reset);
  root.append(chosen, optionsHeading, options, controls, feedback, model);

  function draw() {
    chosen.replaceChildren();
    options.replaceChildren();
    optionsHeading.hidden = selection.length === bank.length;
    options.hidden = optionsHeading.hidden;
    feedback.textContent = "";
    delete feedback.dataset.result;
    model.hidden = true;
    model.open = false;
    let first = 0;
    for (const paragraph of paragraphs) {
      const group = elm("section", "", "writing-order-group");
      group.append(elm("h3", paragraph.title));
      const slots = elm("ol");
      const roles = ["Topic sentence", ...Array(paragraph.cards.length - 2).fill("Supporting sentence"), "Concluding sentence"];
      for (const [index, role] of roles.entries()) {
        const item = elm("li");
        item.append(elm("strong", role + ": "));
        const position = first + index;
        const id = selection[position];
        if (id !== undefined) {
          item.append(button(bank[id], () => {
            selection.splice(position);
            draw();
            options.querySelector("button").focus();
          }));
        } else {
          item.append(elm("span", "Choose a sentence"));
        }
        slots.append(item);
      }
      group.append(slots);
      chosen.append(group);
      first += paragraph.cards.length;
    }
    for (const id of order) {
      if (selection.includes(id)) continue;
      const item = elm("li");
      item.append(button(bank[id], () => {
        selection.push(id);
        draw();
        (options.querySelector("button") || check).focus();
      }));
      options.append(item);
    }
  }

  draw();
}

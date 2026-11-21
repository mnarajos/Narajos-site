const exercises = {
  ramp: {
    paragraphs: [{
      title: "Why use the same car?",
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
  const controls = elm("div", "", "writing-order-controls");
  const feedback = elm("p", "", "ks3-feedback");
  feedback.setAttribute("role", "status");
  const model = elm("details");
  model.hidden = true;
  model.append(elm("summary", paragraphs.length === 1 ? "Read the completed paragraph" : "Read the completed paragraphs"),
    ...paragraphs.map(({ cards }) => elm("p", cards.join(" "), "model")));

  const check = button("Check the order", () => {
    if (selection.length < bank.length) {
      feedback.textContent = "Choose " + (bank.length - selection.length) + " more " +
        (bank.length - selection.length === 1 ? "sentence" : "sentences") + " before you check the order.";
      return;
    }
    const firstError = selection.findIndex((id, index) => id !== index);
    if (firstError === -1) {
      feedback.textContent = paragraphs.length === 1
        ? "Correct. Your opening introduces the main idea. The middle explains it and the ending brings it back to the question."
        : "Correct. Both paragraphs open with their own main idea, explain the steps in order, and finish by linking to the features of that rock.";
      model.hidden = false;
      return;
    }
    const group = firstError < groupCounts[0] ? 0 : 1;
    const slot = group === 0 ? firstError : firstError - groupCounts[0];
    const roleHint = slot === 0 ? "Start with the sentence that introduces the main idea."
      : slot === groupCounts[group] - 1 ? "Finish with the sentence that ties the explanation back to the question."
      : "Look for the sentence that directly follows the one before it.";
    feedback.textContent = paragraphs[group].title + ", sentence " + (slot + 1) + ". " + roleHint +
      " Select that sentence in your paragraph to return it and the later ones for another try.";
  });
  const reset = button("Start again", () => {
    selection.length = 0;
    draw();
    options.querySelector("button").focus();
  });
  controls.append(check, reset);
  root.append(chosen, elm("h3", "Sentences to choose from"), options, controls, feedback, model);

  function draw() {
    chosen.replaceChildren();
    options.replaceChildren();
    feedback.textContent = "";
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

import { ks3CatchupModel } from "./ks3-catchup-models.js";

const flow = (caption, ...panels) => ({type: "flow", caption, panels});
const table = (caption, headers, ...rows) => ({caption, headers, rows});

const comparisons = {
  "atoms-and-compounds": {
    original: "Original samples", change: "Add a different pair to A",
    prompt: "Predict. If you add one pair with two types of atom to A, will A still be one substance?",
    visual: {type: "molecules", caption: "Sample A after adding one new pair", panels: [{label: "Sample A", groups: ["aa", "aa", "aa", "ab"]}]},
    notice: "The new pair has two types of atom bonded together. A now contains two different substances."
  },
  forces: {
    original: "Equal forces", change: "Reduce the forward force",
    prompt: "Predict the direction of the overall force if the forward force becomes smaller than the backward force.",
    visual: {type: "forces", caption: "Two horizontal forces on the same cyclist", left: "40 N backwards", right: "20 N forwards"},
    notice: "Compare the arrows. The backward force is 20 N bigger. The moving cyclist slows down."
  },
  "the-body": {
    original: "Whole oxygen route", change: "Zoom in on the lung",
    prompt: "Which part of the route gets oxygen into the blood? Follow the arrows, then check that step.",
    visual: flow("Oxygen passes from an air sac into a nearby blood vessel", "Oxygen in an air sac", "Across the thin air-sac wall", "Into the blood"),
    notice: "Air reaches the air sac. Oxygen passes into the blood, which then carries it away."
  },
  "energy-transfers": {
    original: "First lamp", change: "Compare a second lamp",
    prompt: "Both lamps receive 10 J. Which transfers more by light, and how can you tell that the energy is still accounted for?",
    visual: {type: "bars", caption: "Energy transferred by the second lamp in one second", max: 10, bars: [["By light", 5, "J"], ["By heating", 5, "J"]]},
    notice: "The second lamp transfers more energy by light. Its two transfers still add to 10 J."
  },
  reproduction: {
    original: "Pollen reaches the stigma", change: "Pollen misses the stigma",
    prompt: "A pollen grain leaves an anther. What else has to happen before there has been pollination?",
    visual: flow("Pollen is carried past the flower", "Pollen leaves an anther", "Wind carries it away", "It does not reach a stigma"),
    notice: "Moving away from the anther is only part of pollination. The pollen must reach a stigma."
  },
  "acids-and-alkalis": {
    original: "Before adding alkali", change: "Add a little alkali to A",
    prompt: "If the pH of A rises, must the liquid have become alkaline? Look at its new position relative to 7.",
    visual: {type: "ph", caption: "New reading for A and the unchanged comparison solutions", panels: [{label: "A", value: 5}, {label: "B", value: 7}, {label: "C", value: 10}]},
    notice: "A has moved closer to 7. It is less acidic and still has a pH below 7."
  },
  "chemical-reactions": {
    original: "Seal the flask", change: "Leave the flask open",
    prompt: "The same gas forms in both flasks. Predict what the balance will show if gas can leave the flask.",
    visual: table("Mass of an open flask and its remaining contents", ["Before mixing", "After some gas leaves"], ["132 g", "130 g"]),
    notice: "Gas leaves the balance when the flask is open. Include that gas to account for the total mass."
  },
  "light-and-sound": {
    original: "Lightning through air", change: "Light and sound in empty space",
    prompt: "If a light flash and a vibration began together where there was no air or any other matter, which could cross the space?",
    visual: flow("What crosses the space?", "A flash of light", "Travels through a vacuum"),
    notice: "Light reaches a distant observer. A sound wave needs matter to carry the vibration."
  },
  "health-and-lifestyle": {
    original: "Compare three foods", change: "Compare a snack",
    prompt: "Compare the two snack choices. Can each food provide more than one kind of nutrient?",
    visual: table("Some nutrients in a snack", ["Food", "Some nutrients it supplies"],
      ["Plain yoghurt", "Protein, carbohydrate, calcium"], ["Orange", "Carbohydrate, fibre, vitamin C"]),
    notice: "Read the whole row for each food. Foods provide different combinations of nutrients."
  },
  "periodic-table": {
    original: "First elements", change: "Reveal more of each group",
    prompt: "If you find a new element underneath elements in Group 0, predict whether they are likely to react in similar ways.",
    visual: {type: "periodic", caption: "Two vertical groups with an extra element", panels: [
      {label: "Group 1", values: ["Li · lithium", "Na · sodium", "K · potassium", "Rb · rubidium"]},
      {label: "Group 0", values: ["He · helium", "Ne · neon", "Ar · argon", "Kr · krypton"]}
    ]},
    notice: "Krypton is in the same group as argon. Both are very unreactive under ordinary conditions."
  },
  "separating-techniques": {
    original: "Filter the mixture", change: "Evaporate some water",
    prompt: "After filtration, the liquid looks clear. Where would you look for evidence that it still contains salt?",
    visual: flow("Use the liquid that passed through the filter", "Clear salt solution", "Water evaporates", "Salt crystals are left"),
    notice: "Dissolved salt passed through the filter with water. It remains as a solid when enough water leaves."
  },
  "work-done": {
    original: "First pushes", change: "Use the same force twice",
    prompt: "If the force stays the same but the object moves twice as far in its direction, what happens to the energy transferred?",
    visual: table("Forces acting in the direction of travel", ["Force", "Distance moved", "Work done"], ["10 N", "1 m", "10 J"], ["10 N", "2 m", "20 J"]),
    notice: "The distance doubles and the work done doubles. The force is the same in both rows."
  },
  respiration: {
    original: "Look at a muscle cell", change: "Look at cells in a root",
    prompt: "A root has no lungs. What do its living cells need to respire aerobically?",
    visual: flow("Respiration in a root cell", "Glucose from the plant and oxygen from air in soil", "Aerobic respiration in the root cell", "Energy transferred for cell activities"),
    notice: "Both cells can use glucose and oxygen. The root gets its oxygen locally instead of breathing it in."
  },
  "earth-structure": {
    original: "Compare two rock samples", change: "Heat and press solid rock",
    prompt: "If a rock changes under heat and pressure but stays solid, could it have formed by molten rock cooling?",
    visual: flow("A model of how metamorphic rock can form", "Existing solid rock", "Heat and pressure change it", "A changed solid rock"),
    notice: "The rock stayed solid. Cooling from molten rock is a different route."
  },
  photosynthesis: {
    original: "Leaf in light", change: "Put the leaf in darkness",
    prompt: "Water and carbon dioxide are still available. Predict what changes when there is no light.",
    visual: flow("Same leaf without a light supply", "Carbon dioxide and water available", "No light reaches the leaf", "No glucose made by photosynthesis"),
    notice: "Light supplies energy for photosynthesis. It is the input you changed in this comparison."
  },
  metals: {
    original: "Iron in copper sulfate", change: "Copper in iron sulfate",
    prompt: "Swap the metals. Predict whether the second strip will get a coating.",
    visual: flow("Reverse which metal starts in solution", "Copper strip in iron sulfate solution", "No new iron coating forms"),
    notice: "Copper is less reactive than iron. It cannot displace iron from its compound."
  },
  "journey-speed": {
    original: "Same time", change: "Compare journeys of equal distance",
    prompt: "When the distance is the same, does the shorter or longer time mean a higher average speed?",
    visual: table("Times to travel the same distance", ["Journey", "Distance", "Time"], ["A", "20 m", "5 s"], ["B", "20 m", "4 s"]),
    notice: "Both journeys cover 20 m. B covers the same distance in less time, so its average speed is higher."
  }
};

function button(label) {
  const control = document.createElement("button");
  control.type = "button";
  control.className = "ks3-model-button";
  control.textContent = label;
  return control;
}

export function explore(lesson, original, renderVisual) {
  const setup = comparisons[lesson.id];
  if (!setup) return original;
  const block = document.createElement("div");
  block.className = "ks3-explore";
  const prompt = document.createElement("p");
  prompt.textContent = setup.prompt;
  const controls = document.createElement("div");
  controls.className = "ks3-model-controls";
  const first = button(setup.original);
  const second = button(setup.change);
  const view = document.createElement("div");
  const feedback = document.createElement("p");
  feedback.setAttribute("role", "status");
  feedback.className = "ks3-explore-result";
  function show(changed) {
    first.setAttribute("aria-pressed", String(!changed));
    second.setAttribute("aria-pressed", String(changed));
    if (changed) {
      const model = ks3CatchupModel(lesson.id, true);
      if (model) {
        view.replaceChildren(model);
        if (lesson.id === "periodic-table") view.append(renderVisual(setup.visual));
        if (setup.visual.headers) {
          const table = document.createElement("details");
          const label = document.createElement("summary");
          label.textContent = "Read the table";
          table.append(label, renderVisual(setup.visual));
          view.append(table);
        }
      } else {
        view.replaceChildren(renderVisual(setup.visual));
      }
    } else {
      view.replaceChildren(...original);
    }
    feedback.textContent = changed ? setup.notice : "";
  }
  first.addEventListener("click", () => show(false));
  second.addEventListener("click", () => show(true));
  controls.append(first, second);
  block.append(prompt, controls, view, feedback);
  show(false);
  return [block];
}

for (const host of document.querySelectorAll("[data-ks3-look]")) {
  const views = [...host.querySelectorAll("[data-ks3-view]")];
  const controls = document.createElement("div");
  controls.className = "ks3-model-controls";
  const result = document.createElement("p");
  result.className = "ks3-explore-result";
  result.setAttribute("role", "status");
  const showBoth = button("Compare both");
  const buttons = views.map(view => button(view.dataset.ks3View));
  function choose(index) {
    for (const [i, view] of views.entries()) view.hidden = index >= 0 && index !== i;
    for (const [i, control] of [showBoth, ...buttons].entries()) {
      control.setAttribute("aria-pressed", String(index === i - 1));
    }
    result.textContent = index < 0 ? "" : views[index].dataset.ks3Notice;
  }
  showBoth.addEventListener("click", () => choose(-1));
  buttons.forEach((control, i) => control.addEventListener("click", () => choose(i)));
  controls.append(showBoth, ...buttons);
  host.prepend(controls);
  host.append(result);
  choose(-1);
}

import { mountParagraph } from "./paragraph-order.js";
import { rampExample } from "./writing-spo-examples.js";

const sandstone = {
  cards: [
    "This sandstone formed when loose grains of sediment became solid rock.",
    "Sand grains settled and built up in layers.",
    "The weight of the layers above pressed the buried grains closer together.",
    "Minerals deposited between the grains cemented them together.",
    "Deposition, compaction and cementation explain how loose sand became the layered sandstone in the photograph."
  ],
  order: [2, 0, 4, 1, 3],
  guidance: ["Which sentence gives the overall explanation?", "What happened to the loose grains?",
    "What happened to the grains as more layers accumulated?", "What eventually held the grains together?",
    "Which sentence draws the steps together and links them to the photograph?"],
  hints: ["Review the topic sentence. Introduce the whole explanation of how loose grains became rock.",
    "Review supporting sentence 1. The grains have to settle before other layers bury them.",
    "Review supporting sentence 2. Think about what the weight of the layers above does to the grains.",
    "Review supporting sentence 3. The grains have been pressed together. Explain what holds them together.",
    "Review the concluding sentence. Connect the processes to the layers in the photograph."],
  success: "The opening explains how loose sand became rock. The middle traces the process and the ending links it to the layers you can see."
};

const granite = {
  cards: [
    "This granite formed when molten rock solidified underground.",
    "The molten rock cooled slowly below the surface.",
    "As the temperature fell, minerals began to crystallise.",
    "The crystals had time to grow until their edges met.",
    "Slow cooling produced the large, interlocking crystals you can see in the solid rock."
  ],
  order: [3, 0, 2, 4, 1],
  hints: ["Review the topic sentence. Introduce what the granite formed from.",
    "Review supporting sentence 1. What happens to the temperature of the molten rock?",
    "Review supporting sentence 2. What starts forming as the molten rock cools?",
    "Review supporting sentence 3. The crystals have started to form. What changes as they have more time?",
    "Review the concluding sentence. Link the complete process to the crystal texture."],
  success: "The opening explains where the rock came from. The middle explains cooling and crystal growth, and the ending connects these steps to the texture you can see."
};

const ramp = {
  cards: [rampExample.topic, ...rampExample.details.map(([, sentence]) => sentence), rampExample.conclusion],
  order: [2, 0, 4, 1, 3],
  hints: ["Review the topic sentence. Choose the sentence that explains why keeping the car the same matters.",
    "Give a difference between cars before explaining what that difference does.",
    "Link the differences in the cars to the distance rolled.",
    "Explain what keeping the car the same controls.",
    "End with what the pupil can tell from the comparison."],
  success: "The opening answers the question, the middle explains the control, and the ending says what the comparison can show."
};

const rockSteps = ["sandstone", "granite"];
const rockProgress = "narajos-paragraph-order:rock-step";
const activities = {};
const stages = rockSteps.map(id => document.getElementById(id));
const transitions = [...document.querySelectorAll("[data-rock-next]")];

function updateTransitions() {
  for (const control of transitions) {
    const from = control.closest("section").id;
    const onward = control.dataset.rockNext !== "sandstone";
    control.hidden = onward && !activities[from]?.completed;
  }
}

function showStage(id, focus) {
  if (!rockSteps.includes(id) || id !== "sandstone" && !activities.sandstone.completed) id = "sandstone";
  for (const stage of stages) stage.hidden = stage.id !== id;
  try { localStorage.setItem(rockProgress, id); } catch { /* Stages work without storage. */ }
  if (focus) {
    const heading = document.getElementById(id).querySelector("h2");
    heading.tabIndex = -1;
    heading.focus();
  }
}

for (const root of document.querySelectorAll("[data-writing-order]")) {
  const id = root.dataset.writingOrder;
  activities[id] = mountParagraph(root, { ramp, sandstone, granite }[id], updateTransitions);
}
for (const control of transitions) control.addEventListener("click", () => showStage(control.dataset.rockNext, true));
updateTransitions();
let remembered = "sandstone";
try { remembered = localStorage.getItem(rockProgress) || remembered; } catch { /* Start with the first rock. */ }
showStage(remembered, false);

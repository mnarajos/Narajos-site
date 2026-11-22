import { readCatchup, saveCatchup } from "./school-catchup-progress.js";

const prompts = {
  "fair-tests": "Name what changes, what you measure and two things you keep the same. Explain how one control makes the comparison fair.",
  forces: "Give the size and direction of the resultant. Compare it with the direction of travel to decide what happens to speed.",
  "the-body": "Name what the working muscles need. Explain separately what faster breathing and a faster heartbeat do.",
  "energy-transfers": "Say which lamp you chose, use the useful light transfers as evidence and explain why the equal inputs matter.",
  reproduction: "Say which process has happened. Then explain what the blocked pollen tube prevents.",
  "separating-techniques": "Use one short sentence for each stage. Say where each solid is after dissolving, filtering and recovering crystals.",
  metals: "Write down each pair in order of reactivity. Use the metal appearing in both comparisons to connect the pairs.",
  particles: "Link temperature to particle speed, then to collisions with the walls and pressure.",
  electricity: "Compare switch closed with switch open. Link the complete loop to current and then to the magnetic field.",
  "work-done": "Write the force and distance for each trolley. Multiply and include joules in each answer.",
  "journey-speed": "Divide each distance by its time, include m/s, then compare.",
  "balanced-moments": "Find the moment on the left. Find the distance on the right that gives the same moment in the other direction.",
  adaptation: "Start with an inherited difference. Explain how survival and reproduction change the population over generations.",
  cells: "Name the two structures. For each, give the job it does in the leaf cell."
};

export const year9Writing = {
  "gas-exchange": ["A material covers part of an exchange surface. Its thickness and the concentration difference are unchanged. Explain why less oxygen can cross in one second.",
    "Name the change in available surface area. Link it to how much oxygen can diffuse in the same time.",
    "Covering part of the surface reduces the area that oxygen can cross. With less area available for diffusion, less oxygen crosses per second."],
  enzymes: ["An enzyme works more quickly at 30 °C than at 10 °C, but works much more slowly after strong heating. Explain the two changes in rate.",
    "Explain how gentle warming affects collisions. Then explain what strong heating can do to binding at the active site.",
    "Gentle warming makes the particles move faster and collide successfully more often. Strong heating can denature the enzyme and change its active-site shape, so fewer enzyme–substrate complexes form."],
  "ionic-conduction": ["Explain why the same ionic compound can conduct when molten but cannot normally conduct as a solid.",
    "Name the charged particles. Compare their movement in the solid and the liquid. Link that difference to the flow of charge.",
    "Both states contain charged ions. In the solid they vibrate in fixed positions. In the molten compound the ions can move through the liquid and carry charge."],
  "molecular-melting": ["Explain why the molecules in a simple molecular substance are still present after it melts.",
    "Contrast what happens between molecules with what happens inside each molecule.",
    "Melting overcomes some attractions between molecules, so the molecules can move past each other. The covalent bonds within each molecule stay intact." ]
};

function node(tag, text) {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  return element;
}

export function createWritingPractice(topic, [prompt, help, example]) {
  const card = node("article");
  card.className = "practice-card";
  card.dataset.ks3Transfer = "";
  card.dataset.writingHelp = help;
  const compare = node("details");
  compare.append(node("summary", "Compare your explanation"), node("p", example));
  card.append(node("h3", "Try it yourself"), node("p", prompt), compare);
  addPracticeAnswer(card, topic);
  return card;
}

export function addPracticeAnswer(card, topic) {
  if (!card) return;
  card.classList.add("ks3-try-practice");
  let draft = card.querySelector("textarea");
  let label = card.querySelector("label");
  const example = card.querySelector(":scope > details");
  if (!draft) {
    draft = node("textarea");
    draft.id = "practice-answer-" + topic.replaceAll(".", "-");
    draft.rows = 3;
    label = node("label", "Your answer");
    label.htmlFor = draft.id;
    if (example) example.before(label, draft);
    else card.append(label, draft);
  }
  const help = card.dataset.writingHelp || prompts[topic.slice(topic.indexOf(".") + 1)];
  if (help) {
    const scaffold = node("details");
    scaffold.append(node("summary", "Help with your answer"), node("p", help));
    label.before(scaffold);
  }
  const pen = node("span", "✎");
  pen.setAttribute("aria-hidden", "true");
  label.prepend(pen);
  const key = topic + ".practice";
  draft.maxLength = 2000;
  draft.value = readCatchup(key).draft || "";
  draft.addEventListener("input", () => saveCatchup(key, {step: 0, draft: draft.value}));
}

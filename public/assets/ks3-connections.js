const connections = {
  "fair-tests": {
    recall: ["For the two ramp runs, name the setting to change and the result to measure."],
    next: ["photosynthesis", "Use the idea of changing one factor at a time when you investigate a leaf in different light."]
  },
  cells: {
    recall: ["You can use a microscope to see more detail. Think about what feature you would use to tell two cells apart."],
    next: ["the-body", "Follow oxygen from the air to cells in a working muscle."]
  },
  "states-of-matter": {
    recall: ["Think of ice that melts and then freezes again. Which substance is present throughout?"],
    next: ["atoms-and-compounds", "Keep using particle pictures. The next step is to read what the different particles are made of."]
  },
  "atoms-and-compounds": {
    recall: ["A particle picture is a model of matter. Use the colours here to distinguish types of atom.", "states-of-matter"],
    next: ["chemical-reactions", "Use the same atom model to explain where the mass goes in a reaction."]
  },
  forces: {
    recall: ["Think of a push and a pull. Describe which way each one acts."],
    next: ["balanced-moments", "Use the size and direction of a force to explain how it can turn a seesaw."]
  },
  "the-body": {
    recall: ["Muscles are made of living cells. Think about what those cells need to keep working.", "cells"],
    next: ["respiration", "Find out what the cells do with the oxygen when it arrives."]
  },
  "energy-transfers": {
    recall: ["Think about what a lamp gives out. What makes the room brighter? What makes the lamp feel warm?"],
    next: ["work-done", "Connect energy transfer to a force moving an object."]
  },
  reproduction: {
    recall: ["Think of an egg cell and a sperm cell as two specialised cells. What is inside their nuclei?", "cells"],
    next: ["adaptation", "Use the idea of offspring to explain how inherited features can become more common."]
  },
  "acids-and-alkalis": {
    recall: ["A measurement can help you compare samples. Here the measurement is pH, a number read from a colour scale.", "fair-tests"],
    next: ["chemical-reactions", "Use another example to see how a measurement helps explain a reaction."]
  },
  "chemical-reactions": {
    recall: ["The same types of atom can be joined in different ways. Look for the atoms before and after a reaction.", "atoms-and-compounds"],
    next: ["metals", "Use evidence of new substances to compare the reactivity of metals."]
  },
  "light-and-sound": {
    recall: ["Air contains moving particles. Think about whether light and sound need those particles to travel.", "states-of-matter"],
    next: ["space", "Use the fact that light crosses empty space to explain why one side of Earth is lit."]
  },
  space: {
    recall: ["Sunlight can travel through space. Think about what happens when a solid object blocks it.", "light-and-sound"]
  },
  "health-and-lifestyle": {
    recall: ["Muscle cells need materials as well as an energy supply. Think about how substances from food reach cells.", "the-body"],
    next: ["respiration", "Find out how cells use a sugar from food to transfer energy."]
  },
  "periodic-table": {
    recall: ["An element contains one type of atom. The periodic table arranges these elements.", "atoms-and-compounds"],
    next: ["metals", "See how a reaction can give evidence about the properties of a metal."]
  },
  particles: {
    recall: ["Picture gas particles moving around with spaces between them.", "states-of-matter"],
    next: ["journey-speed", "Compare how far moving objects travel in the same amount of time."]
  },
  adaptation: {
    recall: ["Think about features that offspring can inherit from their parents.", "reproduction"]
  },
  "separating-techniques": {
    recall: ["A mixture contains more than one substance. Which property could help you separate them?", "atoms-and-compounds"]
  },
  "work-done": {
    recall: ["A force is a push or pull. Think about the direction of the force and the movement.", "forces"]
  },
  respiration: {
    recall: ["Trace oxygen from an air sac in a lung to a muscle cell.", "the-body"],
    next: ["photosynthesis", "Compare what a leaf cell makes in photosynthesis with what its cells use in respiration."]
  },
  "earth-structure": {
    recall: ["Cooling can change a liquid into a solid. Think about how this could happen to molten rock.", "states-of-matter"]
  },
  photosynthesis: {
    recall: ["Locate chloroplasts in a green leaf cell. Then think about why a cell needs a supply of glucose.", "cells"]
  },
  electricity: {
    recall: ["A lamp transfers energy by light and heating. Trace the path it needs before it can light up.", "energy-transfers"]
  },
  metals: {
    recall: ["A chemical reaction makes new substances. Look for that evidence on the surface of the strip.", "chemical-reactions"]
  },
  "journey-speed": {
    recall: ["To make a fair comparison, look for what you can keep the same, such as the time allowed.", "fair-tests"]
  },
  "balanced-moments": {
    recall: ["Forces can act in opposite directions. On a seesaw, look at turning effects in opposite directions.", "forces"]
  }
};

const specialPaths = { cells: "/ks3/cells/", particles: "/ks3/particles/", adaptation: "/ks3/adaptation/" };

const names = {
  "fair-tests": "Science Skills",
  cells: "Cells and microscopes",
  "states-of-matter": "Particles and their Behaviour",
  "atoms-and-compounds": "Atoms, Elements, and Compounds",
  forces: "Forces",
  "the-body": "The Body",
  "energy-transfers": "Energy transfers",
  reproduction: "Human and Plant Reproduction",
  "chemical-reactions": "Types of Reaction",
  "light-and-sound": "Light and Sound",
  space: "Space",
  "work-done": "Work done",
  respiration: "Respiration",
  photosynthesis: "Photosynthesis",
  metals: "Metals and their Reactions",
  "journey-speed": "Speed",
  "balanced-moments": "Moments",
  adaptation: "Adaptation and Inheritance"
};

function topicLink(id, label) {
  const link = document.createElement("a");
  link.href = specialPaths[id] || "/ks3/lesson/?topic=" + id;
  link.textContent = label + names[id];
  return link;
}

export function recallFor(id) {
  const [prompt, earlier] = connections[id].recall;
  const note = document.createElement("p");
  note.className = "ks3-connection";
  const heading = document.createElement("strong");
  heading.textContent = "Recall. ";
  note.append(heading, prompt);
  if (earlier) note.append(" ", topicLink(earlier, "Revisit "));
  return note;
}

export function linkForward(id) {
  const next = connections[id].next;
  if (!next) return null;
  const [target, why] = next;
  const note = document.createElement("p");
  note.className = "ks3-connection";
  note.append(topicLink(target, "Continue to "), " · " + why);
  return note;
}

for (const placeholder of document.querySelectorAll("[data-ks3-recall]")) {
  placeholder.replaceWith(recallFor(placeholder.dataset.ks3Recall));
}
for (const placeholder of document.querySelectorAll("[data-ks3-next]")) {
  const link = linkForward(placeholder.dataset.ks3Next);
  if (link) placeholder.replaceWith(link);
}

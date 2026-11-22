const definitions = {
  "independent variable": "The factor you deliberately change in an investigation.",
  "dependent variable": "The outcome you measure to find out what effect a change has.",
  "control variable": "A factor you keep the same so it cannot explain a difference in the results.",
  "cell membrane": "A thin boundary that controls what enters and leaves the cell.",
  cytoplasm: "The material inside the cell where many chemical reactions happen.",
  nucleus: "The part of a plant or animal cell that contains most of its DNA.",
  dna: "The material that carries genetic information.",
  mitochondria: "Site of aerobic respiration.",
  ribosomes: "Small cell structures that make proteins.",
  "cell wall": "A rigid layer outside the cell membrane that supports a plant cell.",
  chloroplasts: "Structures in some plant cells that absorb light for photosynthesis.",
  vacuole: "A fluid-filled space inside a cell. A large vacuole in a plant cell helps keep the cell firm.",
  "particle model": "An explanation of matter using tiny moving particles.",
  incompressible: "Cannot be squeezed into a smaller volume.",
  "kinetic energy": "The energy a moving object or particle has because it is moving.",
  vibrate: "Move back and forth around a fixed position.",
  "change of state": "A change between solid, liquid and gas. The substance stays the same.",
  atom: "The smallest particle of an element that retains that element’s identity.",
  element: "A substance that contains only one type of atom.",
  compound: "A substance made of two or more types of atom chemically bonded together.",
  mixture: "Two or more substances together without being chemically joined to each other.",
  "balanced forces": "Forces on the same object that cancel out, so the total force is zero.",
  "resultant force": "The overall force on an object after all the forces on it have been combined.",
  diffusion: "The overall movement of particles from where they are more crowded to where they are less crowded.",
  "aerobic respiration": "A chemical process in cells that uses oxygen to transfer energy from glucose.",
  "energy transfer": "Energy moving between objects or spreading into the surroundings.",
  conserved: "The total amount stays the same.",
  pollination: "The transfer of pollen from an anther to a stigma.",
  fertilisation: "The joining of a male and a female sex cell.",
  ovule: "A structure inside a flower’s ovary that contains an egg cell. An ovule can develop into a seed after fertilisation.",
  ph: "A number that tells us how acidic or alkaline a solution is.",
  "universal indicator": "A mixture that changes colour over a range of pH values.",
  neutralisation: "The reaction of an acid with a base such as an alkali.",
  "chemical reaction": "A process that makes new substances by rearranging atoms.",
  "closed system": "A system that substances cannot enter or leave.",
  vacuum: "A space with no matter in it.",
  vibration: "Movement back and forth around a fixed position.",
  rotation: "A spin about an axis.",
  orbit: "The path one object takes around another in space, or the movement along that path.",
  "axis": "An imaginary line through a spinning object that it rotates around.",
  nutrient: "A substance from food that the body uses for processes such as growth, repair or energy supply.",
  carbohydrate: "A kind of nutrient that includes sugars and starch and can supply energy.",
  protein: "A nutrient that supplies building blocks the body needs for growth and repair.",
  lipid: "A kind of nutrient that includes fats and oils and can supply and store energy.",
  group: "A vertical column of elements in the periodic table.",
  "chemical properties": "How a substance behaves in chemical reactions.",
  pressure: "The force acting on each unit of area.",
  "collision": "An event in which objects or particles hit each other.",
  volume: "The amount of space something takes up.",
  variation: "Differences between individuals of the same species.",
  inherited: "Passed from parents to their offspring through genetic information.",
  adaptation: "A feature that helps an organism survive or reproduce in its environment.",
  population: "The organisms of one species living in an area.",
  generation: "A group at the same stage in the chain from parents to offspring.",
  filtration: "Separating an insoluble solid from a liquid using a filter.",
  solution: "A mixture made when one or more substances dissolve in another.",
  "work done": "Energy transferred when a force moves an object through a distance in the direction of the force.",
  breathing: "Moving air into and out of the lungs.",
  glucose: "A simple sugar that cells can use as a fuel for respiration.",
  sediment: "Loose pieces of material that settle from water, wind or ice, or collect on the ground.",
  "sedimentary rock": "Rock that can form when sediment collects and is pressed and cemented together.",
  "igneous rock": "Rock formed when molten rock cools and solidifies.",
  "metamorphic rock": "Rock changed by heat or pressure while it remains solid.",
  photosynthesis: "The process in which plants use energy from light to make glucose from carbon dioxide and water. Oxygen is also made.",
  chlorophyll: "A green substance in chloroplasts that absorbs light for photosynthesis.",
  "electric current": "A flow of electric charge.",
  "complete circuit": "An unbroken path that lets electric charge flow around the whole circuit.",
  electromagnet: "A magnet produced by an electric current, usually through a coil of wire.",
  reactivity: "How readily a substance takes part in a chemical reaction.",
  displacement: "A reaction in which a more reactive element takes the place of a less reactive element in a compound.",
  "average speed": "Total distance travelled divided by the total time taken.",
  pivot: "The point about which something turns.",
  moment: "The turning effect of a force about a point."
};

function termButton(label, key = label.toLowerCase()) {
  if (!Object.hasOwn(definitions, key)) return document.createTextNode(label);
  const button = document.createElement("button");
  button.type = "button";
  button.className = "ks3-term";
  button.textContent = label;
  button.dataset.ks3Term = key;
  button.setAttribute("aria-expanded", "false");
  return button;
}

// Square brackets mark first-use science vocabulary. Asterisks mark a brief everyday phrase.
export function scienceParagraph(copy) {
  const paragraph = document.createElement("p");
  let start = 0;
  for (const mark of copy.matchAll(/\[([^\]]+)\]|\*([^*]+)\*/g)) {
    paragraph.append(copy.slice(start, mark.index));
    if (mark[1]) {
      const [label, key] = mark[1].split("|");
      paragraph.append(termButton(label, key));
    } else {
      const phrase = document.createElement("em");
      phrase.textContent = mark[2];
      paragraph.append(phrase);
    }
    start = mark.index + mark[0].length;
  }
  paragraph.append(copy.slice(start));
  return paragraph;
}

for (const term of document.querySelectorAll("strong[data-ks3-term]")) {
  term.replaceWith(termButton(term.textContent, term.dataset.ks3Term));
}

let active;
let definitionNumber = 0;
const definitionPanels = new WeakMap();

function closeDefinition() {
  active.button.setAttribute("aria-expanded", "false");
  active.panel.hidden = true;
  active = null;
}

document.addEventListener("click", event => {
  const button = event.target.closest("button.ks3-term");
  if (!button) return;
  const wasOpen = active?.button === button;
  if (active) closeDefinition();
  if (wasOpen) return;
  const host = button.closest("p, li");
  let panel = definitionPanels.get(host);
  if (!panel) {
    panel = document.createElement("span");
    panel.className = "ks3-definition";
    panel.id = "ks3-definition-" + ++definitionNumber;
    panel.setAttribute("role", "status");
    host.append(panel);
    definitionPanels.set(host, panel);
  }
  const term = document.createElement("strong");
  term.textContent = button.textContent;
  panel.replaceChildren(term, " · " + definitions[button.dataset.ks3Term]);
  button.setAttribute("aria-controls", panel.id);
  button.setAttribute("aria-expanded", "true");
  panel.hidden = false;
  active = {button, panel};
});

document.addEventListener("keydown", event => {
  if (event.key !== "Escape" || active?.button !== event.target) return;
  event.preventDefault();
  closeDefinition();
});

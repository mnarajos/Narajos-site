import { mountJourney, question } from "./school-catchup-journey.js";
import { readCatchup, saveCatchup } from "./school-catchup-progress.js";
import { curriculum } from "./ks3-lessons.js";

const extendedJourneys = {
  "fair-tests": {
    practiceHint: "Look at the ruler. Where is the zero, and what are you measuring from there?",
    teaching: [
      ["Change one thing", "The independent variable is the factor you change on purpose. In the model, you can change the angle and compare the two runs."],
      ["Measure the result", "The dependent variable is what you measure. Here the ruler starts at the foot of the ramp. Measure from there to where the toy stops."],
      ["Keep the test fair", "A control variable is a factor you keep the same. In the angle test, use the same toy, surface and release point. Then you can link any difference to the angle."],
    ],
    transfer: question("You now want to test rough and smooth ramps. Which pair of settings should you keep the same?",
      "Ramp angle and release point", "Changing the angle or release point could also change the distance. Keep both the same while changing the surface.",
      ["Ramp surface and distance rolled", "Change the surface on purpose. Measure the distance rolled each time."],
      ["Ramp surface and ramp angle", "Keep the angle the same, then change the surface to compare rough and smooth ramps."])
  },
  "states-of-matter": {
    practiceHint: "Watch the particles change neighbours. Do the circles change size?",
    teaching: [
      ["Warm the solid", "Press Heat once. The particles vibrate faster around the same positions. The substance gets warmer and stays solid."],
      ["Watch the particles slide", "A liquid can flow because its particles can move past each other. They stay close together. The same particles are present before and after melting."],
      ["Compare a liquid and a gas", "Gas particles have much more space between them. When you squeeze a gas, they can move closer. A liquid changes very little in volume when squeezed."],
    ],
    transfer: question("In the model, you keep heating the liquid as it starts to boil. What happens to the temperature while liquid and gas are both present?",
      "It stays steady while the liquid boils.", "At the boiling point, energy is still transferred to the substance. It changes state while the temperature stays steady.",
      ["It keeps rising while the liquid boils.", "The liquid warms before it reaches the boiling point. While it boils, the temperature stays steady in this model."],
      ["It drops as the gas forms.", "Heating supplies energy. At the boiling point, it changes the state while the temperature stays steady."])
  }
};

const topics = {
  "fair-tests": [
    "Use the ramp to compare two angles with the same toy.",
    ["Does wing length affect how slowly a paper spinner falls? Which plan would let you test that?",
      "Use different wing lengths and drop both spinners from the same height.",
      "Drop height can also change fall time, so keep it the same.",
      ["Make both wings the same length.", "Wing length is the factor this investigation needs to change."],
      ["Make one spinner heavier and drop it higher.", "Two extra changes make it difficult to isolate the effect of wing length."]]
  ],
  cells: [
    "Trace one cell boundary and look for structures inside it.",
    ["A new image shows a dark nucleus and sections of straight cell edge. You cannot identify a wall or chloroplasts. What can you conclude?",
      "The visible evidence is insufficient to decide between a plant and an animal cell.",
      "Both kinds of cell can contain nuclei. A straight outline alone does not identify a cell wall.",
      ["It is plant tissue because of the line.", "The appearance of a line alone does not identify a wall."],
      ["It is animal tissue because you see a nucleus.", "Plant cells can have visible nuclei too."]]
  ],
  "states-of-matter": [
    "Press Heat once. Does the motion change? Does the state change?",
    ["Two syringes with blocked tips contain air and water. Why is the water harder to squeeze into a smaller volume?",
      "Water particles are already close together.",
      "There is very little room to push liquid particles closer. Gas particles are much farther apart.",
      ["Water particles cannot move.", "Liquid particles can slide past each other while staying close together."],
      ["Water particles get bigger when pushed.", "The particles stay the same size. Look at the gaps between them."]]
  ],
  "atoms-and-compounds": [
    "Look at what each colour represents and whether the groups of circles are all the same.",
    ["Every particle in a sample has one red atom bonded to two blue atoms. What kind of sample is it?",
      "A compound, because different kinds of atom are bonded in every identical group.",
      "Only one substance is present, and its particles contain chemically bonded atoms of two elements.",
      ["An element, because all groups are alike.", "Look at the kinds of atom inside each group, as well as whether the groups match."],
      ["A mixture, because there are two colours.", "Each group has the same bonded combination, so there is one substance."]]
  ],
  forces: [
    "Compare the two force arrows before predicting what happens to the motion.",
    ["A crate moves right. A 70 N pull acts right and friction acts left at 30 N. What happens?",
      "It speeds up. The resultant force is 40 N to the right.",
      "The opposite forces subtract. The resultant acts in the direction of motion.",
      ["It moves at the same speed because it is already moving.", "The motion can change when the forces are unequal."],
      ["It slows because friction is present.", "Friction acts left, but the larger pull means the resultant acts right."]]
  ],
  "the-body": [
    "On the visual, follow the arrows from an air sac into a blood vessel, then to a muscle cell.",
    ["Blood flows past a working muscle. How does oxygen get from the blood into the muscle cells?",
      "It diffuses from the blood where its concentration is higher into the cells.",
      "Circulation brings oxygen near the muscle. Diffusion moves oxygen across the short distance to the cells.",
      ["It travels from the lungs through a tube directly to the foot.", "Airways reach the lungs. Blood carries oxygen around the body."],
      ["The muscle makes oxygen during respiration.", "Aerobic respiration uses oxygen supplied by the blood."]]
  ],
  "energy-transfers": [
    "Find the energy by light and by heating in the example. Add the pieces.",
    ["A fan gets warmer and makes a sound while it moves air. Where has some of the input energy gone?",
      "Some has spread to the surroundings by heating and sound.",
      "The total energy is conserved. Its usefulness can change when it spreads to the surroundings.",
      ["It has disappeared because the fan wasted it.", "Energy still exists when it spreads into the surroundings."],
      ["It all went into moving air because that is the fan’s purpose.", "Energy can transfer in several ways during the same process."]]
  ],
  reproduction: [
    "Trace where the pollen lands, then follow the route towards the ovule.",
    ["Pollen lands on a stigma, but no male nucleus reaches an ovule. Which process has occurred?",
      "Pollination has occurred. Fertilisation has not occurred.",
      "Pollen reached the stigma, but the male and female gamete nuclei did not fuse.",
      ["Both processes happen as soon as pollen lands.", "Landing is pollination. Fertilisation requires gamete nuclei to fuse."],
      ["Neither has occurred because there is no seed.", "Pollination can happen even if no seed later develops."]]
  ],
  "acids-and-alkalis": [
    "Find pH 7 on the scale before comparing the two readings.",
    ["An alkali is added and the pH moves from 4 to 6. What is the final solution?",
      "It is less acidic than before and still acidic.",
      "The pH has moved closer to 7, but 6 remains below 7.",
      ["It is alkaline because an alkali was added.", "Use the final reading rather than the name of what was added."],
      ["It is neutral because the pH increased.", "A rise towards 7 is different from reaching 7."]]
  ],
  "chemical-reactions": [
    "Compare the boundaries of the open and sealed apparatus.",
    ["A tablet reacts in a sealed bottle. Bubbles appear. What happens to the total mass of the sealed bottle and its contents?",
      "It stays the same because the gas remains in the bottle.",
      "The atoms are rearranged into products. All the products, including gas, remain on the balance.",
      ["It falls because gas has no mass.", "Gas is made of particles and has mass."],
      ["It rises because a new substance appears.", "The gas is made from atoms already present before the reaction."]]
  ],
  "light-and-sound": [
    "Compare what the diagrams show about what each wave needs to travel.",
    ["An alarm rings inside a sealed chamber and a light flashes next to it. Most of the air is pumped out. What happens outside?",
      "The light is still visible. The sound from the alarm becomes much harder to hear.",
      "Light can travel through empty space. Sound needs vibrating particles of a medium.",
      ["Both signals stop because both need air.", "Light can also reach you through a vacuum."],
      ["Sound stays equally loud because it travels faster than light.", "Sound moves through vibrations in a medium. There is less air to transmit them."]]
  ],
  space: [
    "Keep the lamp still in the model and trace which way a point on Earth faces.",
    ["Earth turns so a town faces away from the Sun. Why is it night there?",
      "Earth’s rotation has moved the town onto the side facing away from the Sun.",
      "The sunlight reaches the side facing the Sun. Rotation brings locations in and out of that light.",
      ["The Sun has moved behind the Moon.", "Regular day and night are caused by Earth rotating."],
      ["Earth has gone all the way around the Sun.", "Earth takes about a year to orbit. Day and night repeat as it rotates."]]
  ],
  "health-and-lifestyle": [
    "Use the examples to distinguish an energy supply from all the nutrients a body needs.",
    ["Two lunches provide the same amount of energy. What else matters when comparing them?",
      "Whether they provide a range of nutrients needed for different jobs.",
      "Cells and tissues need materials for growth and repair as well as an energy supply.",
      ["Both are identical for the body because their energy values match.", "The energy value alone does not show what nutrients each meal supplies."],
      ["Only the weight of each lunch matters.", "Two foods of the same mass can supply different nutrients."]]
  ],
  "periodic-table": [
    "Trace one group down its column and compare the examples.",
    ["An unfamiliar element is listed directly below sodium in Group 1. Which prediction is supported?",
      "It is likely to be a reactive metal because it is in the same group.",
      "Elements in the same group often have similar chemical properties.",
      ["It is the next element along sodium’s period.", "A position directly below is in the same group, not the same row."],
      ["It is likely to be an unreactive gas.", "Compare the Group 1 metals with the separate group that contains unreactive gases."]]
  ],
  particles: [
    "Keep temperature and particle count the same. Compare collisions at the wall when the container gets smaller.",
    ["An airtight syringe is gently compressed at the same temperature. Why does its pressure rise?",
      "The same particles hit the walls more often in the smaller space.",
      "At the same temperature their typical speed stays the same, but the walls are closer.",
      ["Each particle becomes bigger.", "The particles stay the same size. The gaps between them get smaller."],
      ["More particles enter the syringe.", "The syringe is sealed, so its particle count stays the same."]]
  ],
  adaptation: [
    "Compare what a bird can spot on both backgrounds.",
    ["Some plants inherit thicker waxy coatings, which reduce water loss. During a long dry period, how could the coating become more common?",
      "More plants with the thicker coating could survive and reproduce, passing it on.",
      "Differences already exist. Over generations, inherited features of organisms that reproduce more can become more common.",
      ["Each plant chooses to grow a coating because the soil dries.", "The question concerns an inherited difference in a population over generations."],
      ["The plants without a coating all change immediately.", "The proportions can change over generations as some individuals leave more offspring."]]
  ],
  "separating-techniques": [
    "Trace where the solid and the dissolved substance go separately.",
    ["You have sand mixed with sugar. Which order helps you recover both?",
      "Dissolve the sugar, filter out the sand, then let water evaporate from the filtrate.",
      "The filter catches the insoluble sand. The sugar in solution can be recovered as water leaves.",
      ["Filter the dry mixture through damp paper, then boil the sand.", "Dissolve the soluble solid first so it can pass through the filter as a solution."],
      ["Evaporate all the water before filtering the mixture.", "You would get the two solids together again instead of separating them."]]
  ],
  "work-done": [
    "Compare the distances while keeping the force the same.",
    ["A 12 N force moves a trolley 5 m in the direction of the force. How much work is done?",
      "60 J, because work done is force multiplied by distance in this case.",
      "12 N × 5 m = 60 J of energy transferred.",
      ["17 J, because you add the force and distance.", "Work done combines these quantities by multiplying."],
      ["12 J, because the force stays the same.", "The distance travelled also affects the work done."]]
  ],
  respiration: [
    "Identify where respiration happens and what an aerobic cell uses.",
    ["A seed germinates in darkness and has a supply of oxygen. Can its cells respire aerobically?",
      "Yes. The cells can use oxygen and glucose from the seed’s food stores.",
      "Aerobic respiration transfers energy from glucose. It does not require light.",
      ["No, because respiration requires light.", "Light provides energy for photosynthesis. Aerobic respiration can occur in the dark."],
      ["Only if the seed has lungs.", "Respiration happens in cells. Oxygen can reach cells without lungs."]]
  ],
  "earth-structure": [
    "Compare loose grains, layers and what later holds layers together.",
    ["A sandstone contains many rounded grains cemented together. What sequence best explains its formation?",
      "Sediment was deposited, then buried, compacted and cemented.",
      "Grains are deposited in layers. Pressure packs them together and minerals can cement them.",
      ["Lava cooled and all the grains formed as crystals at once.", "Cemented grains are evidence of deposition and later change."],
      ["The rock formed because the sand stayed loose.", "Some process must bind the loose grains into solid rock."]]
  ],
  photosynthesis: [
    "Trace matter into the leaf and find the separate supply of energy.",
    ["A healthy green plant is put in darkness. Which prediction makes sense?",
      "Photosynthesis stops while respiration can continue using stored sugars.",
      "Photosynthesis needs light. Plant cells can respire in darkness while they have suitable fuel.",
      ["Both processes stop because both need light.", "Aerobic respiration uses glucose and oxygen, not light directly."],
      ["Photosynthesis continues as normal while there is water.", "Water is a reactant. Light still supplies the energy."]]
  ],
  electricity: [
    "Trace the full loop, including both terminals, before opening the switch.",
    ["An electromagnet releases an iron object when its switch opens. Why?",
      "Opening the loop stops current flowing through the coil.",
      "The coil’s magnetic field is produced by its current. Opening the circuit stops that current.",
      ["The iron object is still held because the switch is before the coil.", "A gap anywhere in the single loop stops current throughout the loop."],
      ["The coil produces new current when the switch opens.", "An open loop provides no complete conducting path for the current."]]
  ],
  metals: [
    "Use the example to decide which metal can displace which.",
    ["Zinc displaces copper from a copper compound. What does this show?",
      "Zinc is more reactive than copper under these conditions.",
      "A more reactive metal can take the place of a less reactive metal in its compound.",
      ["Copper is more reactive because we can see it form.", "The replacement metal is zinc. Copper is displaced."],
      ["They have equal reactivity because both are metals.", "Metals differ in how readily they react."]]
  ],
  "journey-speed": [
    "Compare the distances travelled in equal time intervals.",
    ["Two pupils' distance–time lines are straight. P reaches 20 m in 4 s. Q reaches 20 m in 5 s. Who is faster?",
      "P, because P covers the same distance in less time.",
      "P’s line has the greater gradient. P travels 5 m/s and Q travels 4 m/s.",
      ["Q, because the clock shows a bigger number.", "For the same distance, more time means a lower speed."],
      ["They are equally fast because both cover 20 m.", "Speed also depends on how long the distance takes."]]
  ],
  "balanced-moments": [
    "Compare how far each force acts from the pivot.",
    ["A 40 N force acts 1 m to the left of a pivot. A 20 N force acts 2 m to the right. Will they balance?",
      "Yes. Both moments are 40 N m in opposite directions.",
      "Multiply each force by its perpendicular distance from the pivot.",
      ["No. The side with 40 N always wins.", "A smaller force can give the same turning effect when it acts farther from the pivot."],
      ["No. The forces must act at the same distance.", "Balance depends on equal opposing moments. Force and distance can differ."]]
  ]
};

function fromLesson(source) {
  return question(source.prompt, source.answer, source.correctFeedback, ...source.distractors);
}

function addPracticeAnswer(card, id) {
  if (!card) return;
  card.classList.add("ks3-try-practice");
  let draft = card.querySelector("textarea");
  let label = card.querySelector("label");
  if (!draft) {
    draft = document.createElement("textarea");
    draft.id = "practice-answer-" + id.replaceAll(".", "-");
    draft.rows = 3;
    label = document.createElement("label");
    label.htmlFor = draft.id;
    label.textContent = "Your answer";
    const example = card.querySelector(":scope > details");
    if (example) example.before(label, draft);
    else card.append(label, draft);
  }
  const pen = document.createElement("span");
  pen.setAttribute("aria-hidden", "true");
  pen.textContent = "✎";
  label.prepend(pen);
  const key = id + ".practice";
  draft.maxLength = 2000;
  draft.value = readCatchup(key).draft || "";
  draft.addEventListener("input", () => saveCatchup(key, {step: 0, draft: draft.value}));
}

export function addKS3Journey(model, lesson, year) {
  const item = topics[lesson.id];
  if (!item) return;
  const [hint, transfer] = item;
  addPracticeAnswer(model.parentElement.querySelector("[data-ks3-transfer]"), year + "." + lesson.id);
  const steps = [
    {...fromLesson(lesson.questions[0]), notice: hint},
    {...fromLesson(lesson.questions[1]), hint},
    question(...transfer)
  ];
  const extension = extendedJourneys[lesson.id];
  if (extension) {
    extension.teaching.forEach((teach, index) => { steps[index].teach = teach; });
    steps[1].hint = extension.practiceHint;
    steps.push(extension.transfer);
  }
  mountJourney(model, model, {id: lesson.id, year, hook: lesson.title, steps});
}

function fromCard(card) {
  const prompt = card.querySelector("h3").textContent;
  const options = [...card.querySelectorAll("button[data-feedback]")];
  const answer = options.find(option => /^Correct\./.test(option.dataset.feedback));
  if (!answer) return null;
  return {
    prompt, answer: answer.textContent, reasoning: answer.dataset.feedback.replace(/^Correct\.\s*/, ""),
    options: options.filter(option => option !== answer).map(option => ({
      label: option.textContent, feedback: option.dataset.feedback
    }))
  };
}

for (const host of document.querySelectorAll("[data-school-catchup-topic]")) {
  const id = host.dataset.schoolCatchupTopic;
  const item = topics[id];
  const model = host.querySelector(".ks3-lesson");
  if (!item || !model) continue;
  const [hint, transfer] = item;
  const guided = [...host.querySelectorAll("[data-catchup-check]")].map(fromCard).filter(Boolean);
  if (guided.length < 2) continue;
  const year = id === "cells" ? 7 : 8;
  const lesson = curriculum[year].find(topic => topic.href === "/ks3/" + id + "/");
  if (!lesson) continue;
  addPracticeAnswer(host.querySelector("[data-ks3-transfer]"), year + "." + id);
  mountJourney(model, model, {
    id, year, hook: lesson.title,
    steps: [{...guided[0], notice: hint}, {...guided[1], hint}, question(...transfer)]
  });
}

import { mountDevelopment, mountIntroduction } from "./writing-spo.js";
import { rampExample } from "./writing-spo-examples.js";

const guides = {
  ramp: [
    ["Does the opening explain why keeping the car the same helps?", rampExample.topic],
    ["Do your notes connect wheels and friction to the distance rolled, then explain the control?", rampExample.details.map(([note]) => note).join("; ")],
    ["Does the ending explain how the control makes the comparison more valid?", rampExample.conclusion]
  ],
  ks3: [
    ["Does your first sentence say which beaker showed the colour spreading further?", "The food colouring spreads further in the warm water in the same time."],
    ["Do your notes link warmer water, faster-moving dye particles and faster spreading, in that order?", "warmer water → dye particles move faster on average in random directions → spread further in the same time"],
    ["Does your last sentence use that chain to answer why the spread was different?", "The faster particle movement explains why the dye spreads further in the warm water."]
  ],
  gcse: [
    ["Does your first sentence compare the two treatments and refer to the change in mass?", "The potato gained mass in dilute solution and lost mass in concentrated solution."],
    ["Do your notes give both percentages, link each to the direction of net water movement and name osmosis?", "+7% in dilute → net water into cells; −9% in concentrated → net water out; water crosses partially permeable membranes by osmosis"],
    ["Does your last sentence give a next test that can answer where the mass stays the same?", "I would test intermediate sugar concentrations to find where there is no net change in mass."]
  ],
  alevel: [
    ["Does your first sentence say what the sodium gradient enables, linking it to the essay title?", "A sodium ion gradient across the ileum epithelium enables glucose absorption."],
    ["Do your notes give the mechanism in order, including the direction of each movement and the energy source?", "ATP-powered sodium pump moves Na⁺ out towards blood → low intracellular Na⁺ → Na⁺ moves from lumen down gradient via co-transporter → glucose enters with it → glucose leaves by facilitated diffusion"],
    ["Does your last sentence explain the biological importance of the mechanism?", "The sodium gradient enables glucose uptake even when its concentration is lower in the lumen than inside the epithelial cell."]
  ],
  "gcse-light-and-photosynthesis": [
    ["Does the opening cover both parts of the pattern?", "Oxygen collection increased from low to medium light and then levelled off."],
    ["Do the notes link the values to light and a plausible limiting factor?", "2 → 5 cm³/min as light energy increases → higher photosynthesis rate; 5 cm³/min at high light → another factor could be limiting"],
    ["Does your ending give a test at high light and what to measure?", "I would increase the carbon dioxide supply at high light and measure the volume of oxygen collected in one minute again."]
  ],
  "gcse-meadow-biodiversity": [
    ["Does your opening state what the samples suggest about mowing?", "The samples suggest that mowing less often can increase plant species richness."],
    ["Do your notes include the counts, a biological reason and an alternative explanation?", "9 vs 4 species → slower mowing cycle can allow flowering and seed set; shade or soil may also differ; one area per routine"],
    ["Does your ending give a cautious judgement and a specific improvement?", "The result is consistent with the claim. I would compare several similar areas for each mowing routine to judge it more confidently."]
  ],
  "gcse-temperature-change-method": [
    ["Does your opening state what the method is comparing?", "I would compare the temperature changes when equal masses of the two salts dissolve in equal volumes of water."],
    ["Are your measurements and controls in the order you would use them?", "same starting temperature and cup → measure starting temperature → add salt and stir → record highest or lowest temperature → subtract start reading"],
    ["Does your ending say how to repeat and compare results?", "I would repeat each test with fresh water and compare the mean temperature change for each salt."]
  ],
  "gcse-compare-bags": [
    ["Does your first sentence identify the choice for ten trips?", "The sturdy bag has lower emissions for ten trips in this example."],
    ["Do your notes compare the totals and give one condition that could change the result?", "paper 10 × 24 = 240 g CO₂e; sturdy 180 + (10 × 2) = 200 g CO₂e; fewer reuses or higher washing emissions can change the comparison"],
    ["Does your ending say how far the conclusion applies or identify extra evidence needed?", "I would choose the sturdy bag for ten trips on these figures and would need transport and disposal data for a fuller comparison."]
  ],
  "gcse-compare-insulation": [
    ["Does the opening say what difference the felt made?", "The felt-covered can cooled less in ten minutes than the uncovered one."],
    ["Do the notes link the two temperature drops to the rate of energy transfer?", "13 °C without felt vs 7 °C with felt → felt and trapped air are poor thermal conductors → slower energy transfer to surroundings"],
    ["Does your ending say what to change, keep the same and measure next?", "I would vary the layers of felt, keep the can and starting water conditions the same, and compare each ten-minute temperature drop."]
  ],
  "gcse-trolley-acceleration": [
    ["Does the opening state what you are changing and what you are measuring?", "I would change the pulling force and measure the acceleration of the same total mass."],
    ["Do the notes explain how to measure acceleration and vary the force without adding mass to the system?", "same release point, no push → motion sensor for speed and time → change in speed ÷ time; transfer masses from trolley to hanger → more weight pulling, same total mass"],
    ["Does your ending say how to repeat and compare the results?", "I would repeat for each pulling force, then plot mean acceleration against force."]
  ]
};

function element(tag, content) {
  const node = document.createElement(tag);
  if (content) node.textContent = content;
  return node;
}

const evidence = {
  gcse: { values: [["7%", /(?<![\d.])7\s*(?:%|per ?cent\b)/i], ["9%", /(?<![\d.])9\s*(?:%|per ?cent\b)/i]], guidance: "Pair each value with the right solution and state whether mass went up or down." },
  "gcse-light-and-photosynthesis": { values: [["2", /(?<![\d.])2(?![\d.])/], ["5", /(?<![\d.])5(?![\d.])/]], guidance: "Check which light level goes with each value and include the units." },
  "gcse-meadow-biodiversity": { values: [["4", /(?<![\d.])4(?![\d.])/], ["9", /(?<![\d.])9(?![\d.])/]], guidance: "Check which mowing routine goes with each species count." },
  "gcse-compare-bags": { values: [["240", /(?<![\d.])240(?![\d.])/], ["200", /(?<![\d.])200(?![\d.])/]], guidance: "Check that your notes match each total to the correct bag and include the units." },
  "gcse-compare-insulation": { values: [["13", /(?<![\d.])13(?![\d.])/], ["7", /(?<![\d.])7(?![\d.])/]], guidance: "Check that you label each result as a temperature drop in °C." }
};

const sections = ["Topic sentence", "Supporting notes", "Concluding sentence"];
const closingField = document.querySelector(".writing-card textarea[id$='-close']");
if (closingField) {
  const id = closingField.id.slice(0, -"-close".length);
  const guide = guides[id];
  if (guide) mount(closingField, id, guide);
}

function mount(closing, id, guide) {
  const fields = ["topic", "plan", "close"].map((key) => document.getElementById(id + "-" + key));
  const wrapper = element("div");
  wrapper.className = "writing-check writing-outline-review";
  const button = element("button", "Check my outline");
  button.type = "button";
  const status = element("p");
  status.setAttribute("role", "status");
  const report = element("div");
  report.className = "writing-report";
  report.hidden = true;
  wrapper.append(button, status, report);
  closing.after(wrapper);

  function resetOutlineReport() {
    if (!report.hidden) status.textContent = "Outline changed. Check it again when you’re ready.";
    report.hidden = true;
  }
  const card = closing.closest(".writing-card");
  mountIntroduction(card, id);
  const development = mountDevelopment(card, id, fields, guide, resetOutlineReport);
  const plan = closing.closest(".writing-step");
  let scaffold = plan.querySelector("[data-outline-scaffold]");
  if (!scaffold) {
    scaffold = element("div");
    scaffold.className = "writing-scaffold";
    const control = element("button", "Use a partly filled plan");
    control.type = "button";
    const message = element("p");
    message.dataset.outlineStatus = "";
    message.setAttribute("role", "status");
    scaffold.append(control, message);
    plan.querySelector("summary").after(scaffold);
  }
  scaffold.querySelector("button").addEventListener("click", event => {
    const { scaffoldOpening, scaffoldNotes } = event.currentTarget.dataset;
    const [firstNote] = guide[1][1].split(";", 1);
    const start = [id === "ramp" ? rampExample.details[0][0] : scaffoldNotes || firstNote];
    development.fillScaffold(scaffoldOpening || guide[0][1], start);
    scaffold.querySelector("[data-outline-status]").textContent = "Add your own reasoning to complete the plan.";
  });

  fields[0].addEventListener("input", resetOutlineReport);
  fields[2].addEventListener("input", resetOutlineReport);

  button.addEventListener("click", () => {
    const values = [fields[0].value.trim(), development.notes.map(note => note.value.trim()).filter(Boolean).join("\n"), fields[2].value.trim()];
    const missing = sections.filter((_, index) => !values[index]);
    const numberOfNotes = development.notes.filter(note => note.value.trim()).length;
    const sameOpeningAndClosing = values[0] && values[2] && normalise(values[0]) === normalise(values[2]);
    if (missing.length) {
      status.textContent = "Still to add: " + missing.map((label) => label.toLowerCase()).join(", ") + ".";
    } else if (sameOpeningAndClosing) {
      status.textContent = "Your opening and ending repeat each other. Use the ending to show what you can now conclude.";
    } else if (numberOfNotes < 2) {
      status.textContent = "Add a second note so the reader can follow how the explanation develops.";
    } else {
      status.textContent = "The three parts have entries. Use the prompts, then develop each note into a supporting sentence.";
    }

    const prompts = element("ul");
    const example = element("details");
    const exampleList = element("ul");
    for (const [index, [prompt, model]] of guide.entries()) {
      const item = element("li");
      const label = element("strong", sections[index] + ": ");
      item.append(label, prompt);
      prompts.append(item);

      const sample = element("li");
      sample.append(element("strong", sections[index] + ": "), model);
      exampleList.append(sample);
    }
    example.append(element("summary", "See a possible outline"), exampleList);
    report.replaceChildren(prompts, example);
    if (evidence[id] && values[1]) {
      const { values: targets, guidance } = evidence[id];
      const unseen = targets.filter(([, pattern]) => !pattern.test(values[1])).map(([value]) => value);
      const message = unseen.length
        ? "Look for " + unseen.join(" and ") + " in your supporting notes. Include the figures you are comparing."
        : "Both figures appear in your supporting notes. " + guidance;
      report.prepend(element("p", message));
    }
    report.hidden = false;
  });
}

function normalise(text) {
  return text.toLowerCase().replace(/[\p{P}\s]+/gu, "");
}

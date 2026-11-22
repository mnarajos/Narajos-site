import { curriculum, motionLessons } from "./ks3-lessons.js";
import { latestCatchup } from "./school-catchup-progress.js";

const root = "/science-catch-up/";
const revision = code => "/gcse/#topic-" + code.toLowerCase();
const ks3Link = topic => topic.href || "/ks3/lesson/?topic=" + topic.id;
const year = new URLSearchParams(location.search).get("year");
const years = ["7", "8", "9", "10", "11"];

const gcseYears = {
  9: [
    ["B1", "Cells", [["cell-structures", "What do cell structures do?"], ["osmosis", "Which way does water move?"], ["active-transport", "How do roots take up mineral ions?"], ["mitosis", "What must happen before a cell divides?"]]],
    ["C1", "Atomic structure and the periodic table", [["atomic-number", "What makes an atom that element?"], ["periodic-table", "Why do elements in a group react similarly?"]]],
    ["P1", "Energy", [["energy-stores", "Where does the energy go?"], ["energy-transfer", "Which device transfers energy faster?"]]],
    ["B2", "Organisation", [["gas-exchange", "Why are alveoli good for gas exchange?"], ["enzymes", "Why does an enzyme stop working when it gets too hot?"]]],
    ["C2", "Bonding", [["ionic-conduction", "Why do molten salts conduct?"], ["molecular-melting", "What is overcome when a molecular substance melts?"]]]
  ],
  10: [
    ["B3", "Infection and response"], ["B4", "Bioenergetics"], ["P3", "Particle model of matter"],
    ["P4", "Radioactivity"], ["P2", "Electricity"], ["C3", "Quantitative chemistry"], ["C4", "Chemical changes"],
    ["C5", "Energy changes"], ["B5", "Homeostasis"], ["B7", "Ecology"]
  ],
  11: [
    ["C4", "Chemical changes"], ["C6", "Rates of reaction"], ["C7", "Organic chemistry"],
    ["C8", "Chemical analysis"], ["C9", "Chemistry of the atmosphere"], ["C10", "Using resources"],
    ["P5", "Forces"], ["P6", "Waves"], ["P7", "Magnetism and electromagnets"], ["B5", "Homeostasis"], ["B6", "Genetics"]
  ]
};

function element(tag, text, className) {
  const el = document.createElement(tag);
  if (text) el.textContent = text;
  if (className) el.className = className;
  return el;
}

function link(text, href, className) {
  const el = element("a", text, className);
  el.href = href;
  return el;
}

const yearNav = document.querySelector("[data-catchup-years]");
for (const number of years) {
  const target = link("Year " + number, root + "?year=" + number);
  if (year === number) target.setAttribute("aria-current", "page");
  yearNav.append(target);
}

const main = document.querySelector("[data-catchup-catalogue]");
const saved = latestCatchup(years.includes(year) ? year : undefined);
if (saved) {
  const resume = element("aside", "", "school-resume");
  resume.append(element("div", "Year " + saved.year + " · " + saved.title), link("Continue catch-up", saved.href, "school-primary"));
  main.append(resume);
}
if (years.includes(year)) {
  document.title = "Year " + year + " Science Catch-up | Narajos";
  document.querySelector("h1").textContent = "Year " + year + " Science";
  const headings = element("div", "", "school-section-heading");
  headings.append(element("h2", "Catch-up topics"));
  if (Number(year) >= 9) headings.append(link("Open GCSE revision", "/gcse/", "school-secondary"));
  main.append(headings);
  const list = element("ul", "", "school-topic-list");
  if (year === "7" || year === "8") {
    const topics = year === "8" ? [...curriculum[year], ...motionLessons] : curriculum[year];
    for (const topic of topics) {
      const item = element("li");
      item.append(link(topic.unit, ks3Link(topic), "school-topic-link"), element("p", topic.title));
      list.append(item);
    }
  } else if (year === "9") {
    for (const [code, topic, lessons] of gcseYears[year]) {
      const item = element("li");
      const title = element("h3");
      title.append(element("span", code, "school-code"), document.createTextNode(" " + topic));
      const links = element("ul", "", "school-concept-list");
      for (const [id, concept] of lessons) {
        const row = element("li");
        row.append(link(concept, root + "lesson/?topic=" + id));
        links.append(row);
      }
      item.append(title, links, link("Revise " + code, revision(code), "school-revise-link"));
      list.append(item);
    }
  } else {
    main.append(element("p", "Guided catch-up is piloting in Years 7–9. Use GCSE revision for the topics below."));
    for (const [code, topic] of gcseYears[year]) {
      const item = element("li");
      item.append(element("h3", code + " · " + topic), link("Revise " + code, revision(code), "school-revise-link"));
      list.append(item);
    }
  }
  main.append(list);
} else {
  const list = element("ul", "", "school-year-grid");
  for (const number of years) {
    const item = element("li");
    const card = link("", root + "?year=" + number);
    card.append(element("strong", "Year " + number), element("span", Number(number) < 9 ? "Catch-up lessons" :
      number === "9" ? "Catch-up lessons and GCSE revision" : "GCSE revision · catch-up in development"));
    item.append(card);
    list.append(item);
  }
  main.append(list);
}

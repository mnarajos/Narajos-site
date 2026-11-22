import { identifyCatchupYear } from "./school-catchup-journey.js";
import { curriculum, motionLessons } from "./ks3-lessons.js";
import { year9 } from "./school-catchup-year9.js";
import { gcseCatchup } from "./gcse-catchup-data.js";
import { clearCatchupProgress, hasCatchupProgress } from "./school-catchup-progress.js";

const root = "/science-catch-up/";
const revision = code => "/gcse/#topic-" + code.toLowerCase();
function guidedHref(href) {
  const url = new URL(href, location.origin);
  url.searchParams.set("guided", "1");
  return url.pathname + url.search;
}
const query = new URLSearchParams(location.search);
const selectedCode = query.get("topic")?.toUpperCase();
const years = ["7", "8", "9", "10", "11"];

const gcseYears = {
  9: [
    ["B1", "Cells", ["cell-structures", "osmosis", "active-transport", "mitosis"]],
    ["C1", "Atomic structure and the periodic table", ["atomic-number", "periodic-table"]],
    ["P1", "Energy", ["energy-stores", "energy-transfer"]],
    ["B2", "Organisation", ["gas-exchange", "enzymes"]],
    ["C2", "Bonding", ["ionic-conduction", "molecular-melting"]]
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

const topicYears = Object.keys(gcseYears).filter(number => gcseYears[number].some(([code]) => code === selectedCode));
const year = query.get("year") || topicYears[0];
const lessonsByCode = Object.create(null);
for (const entry of Object.entries(gcseCatchup)) {
  const code = entry[1].code;
  (lessonsByCode[code] ||= []).push(entry);
}

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
const yearSelected = years.includes(year);
if (!yearSelected) yearNav.classList.add("school-year-chooser");

const main = document.querySelector("[data-catchup-catalogue]");
if (yearSelected) {
  identifyCatchupYear(year);
  for (const number of years) {
    const target = link("Year " + number, root + "?year=" + number);
    if (year === number) target.setAttribute("aria-current", "page");
    yearNav.append(target);
  }
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
      const href = guidedHref(topic.href || "/ks3/lesson/?topic=" + topic.id);
      item.append(link(topic.unit, href, "school-topic-link"), element("p", topic.title));
      list.append(item);
    }
  } else {
    const explanation = element("p");
    explanation.append(element("strong", "Catch up"), " if you missed the topic or need it explained again. ",
      element("strong", "Revise and practise"), " if you’ve learnt it and want to test yourself.");
    main.append(explanation);
    for (const [code, topic, lessonIds] of gcseYears[year]) {
      if (topicYears.includes(year) && code !== selectedCode) continue;
      const item = element("li");
      item.id = "catchup-" + code.toLowerCase();
      const title = element("h3");
      title.append(element("span", code, "school-code"), document.createTextNode(" " + topic));
      const links = element("ul", "", "school-concept-list");
      const lessons = year === "9" ? lessonIds.map(id => [id, year9[id]]) : lessonsByCode[code] || [];
      for (const [id, lesson] of lessons) {
        const row = element("li");
        const url = root + "lesson/?topic=" + id + (year === "9" ? "" : "&year=" + year);
        row.append(link(lesson.title, url), element("p", lesson.hook, "school-concept-question"));
        links.append(row);
      }
      const revise = link("Revise " + code, revision(code), "school-revise-link");
      revise.setAttribute("aria-label", "Revise and practise " + code + " " + topic);
      item.append(title, links, revise);
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
      "Catch-up lessons and GCSE revision"));
    item.append(card);
    list.append(item);
  }
  yearNav.append(list);
}

const clearButton = document.querySelector("[data-catchup-clear]");
const clearDialog = document.querySelector("[data-catchup-clear-dialog]");
const clearStatus = document.querySelector("[data-catchup-clear-status]");
function refreshClearButton() {
  clearButton.hidden = !hasCatchupProgress();
}
clearButton.addEventListener("click", () => {
  clearDialog.returnValue = "";
  clearDialog.showModal();
});
clearDialog.addEventListener("close", () => {
  if (clearDialog.returnValue !== "clear") return;
  const cleared = clearCatchupProgress();
  refreshClearButton();
  clearStatus.hidden = false;
  clearStatus.textContent = cleared ? "Catch-up progress cleared." : "Catch-up progress could not be cleared.";
  clearStatus.focus();
});
window.addEventListener("pageshow", refreshClearButton);
window.addEventListener("storage", refreshClearButton);
refreshClearButton();

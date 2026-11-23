import { identifyCatchupYear } from "./school-catchup-journey.js";
import { curriculum, motionLessons } from "./ks3-lessons.js";
import { year9 } from "./school-catchup-year9.js";
import { gcseCatchup } from "./gcse-catchup-data.js";
import { clearCatchupProgress, hasCatchupProgress, readCatchup } from "./school-catchup-progress.js";

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

function juniorTopics(number) {
  return number === "8" ? [...curriculum[number], ...motionLessons] : curriculum[number];
}

function seniorTopics(number, code, lessonIds) {
  return number === "9" ? lessonIds.map(id => [id, year9[id]]) : lessonsByCode[code] || [];
}

function juniorHref(topic) {
  return guidedHref(topic.href || "/ks3/lesson/?topic=" + topic.id);
}

function seniorHref(number, id) {
  return root + "lesson/?topic=" + id + (number === "9" ? "" : "&year=" + number);
}

function catalogueEntries() {
  const entries = new Map();
  for (const number of years) {
    const context = "Year " + number;
    const add = (key, title, detail, keywords, href) => {
      const existing = entries.get(key);
      if (existing) {
        existing.groups.push(number);
        existing.context = existing.groups.map(group => "Year " + group).join(" / ") + " · " + detail;
        if (year === number) existing.actions = [["Open lesson", href]];
      } else {
        entries.set(key, {key, group: number, groups: [number], title, context: context + " · " + detail,
          keywords, actions: [["Open lesson", href]]});
      }
    };
    if (Number(number) < 9) {
      for (const topic of juniorTopics(number)) {
        const id = topic.id || topic.href.split("/").filter(Boolean).at(-1);
        add(number + "." + id, topic.unit, topic.title, id.replaceAll("-", " "), juniorHref(topic));
      }
    } else {
      for (const [code, name, lessonIds] of gcseYears[number]) {
        for (const [id, lesson] of seniorTopics(number, code, lessonIds)) {
          add(lesson.year + "." + id, lesson.title, name, id.replaceAll("-", " ") + " " + code + " " + lesson.hook,
            seniorHref(number, id));
        }
      }
    }
  }
  return Array.from(entries.values());
}

function resumeHref(entry) {
  const url = new URL(entry.actions[0][1], location.origin);
  url.searchParams.set("resume", "1");
  return url.pathname + url.search;
}

function renderContinue(main, entries) {
  main.querySelector(".school-continue")?.remove();
  const unfinished = entries.filter(entry => !years.includes(year) || entry.groups.includes(year)).flatMap(entry => {
    const state = readCatchup(entry.key);
    return !state.done && (state.step || state.open || state.draft?.trim()) ? [{entry, step: state.step + 1}] : [];
  });
  if (unfinished.length) {
    const panel = element("section", "", "school-continue");
    panel.setAttribute("aria-labelledby", "school-continue-title");
    const heading = element("h2", "Continue learning");
    heading.id = "school-continue-title";
    panel.append(heading);
    const [first, ...others] = unfinished;
    const row = element("div", "", "school-continue-row");
    row.append(element("p", first.entry.title + " · Step " + first.step),
      link("Resume", resumeHref(first.entry), "school-primary"));
    panel.append(row);
    if (others.length) {
      const more = element("details");
      more.append(element("summary", "Other saved lessons"));
      const list = element("ul");
      for (const {entry, step} of others) {
        const item = element("li");
        item.append(link("Resume " + entry.title + " · Step " + step, resumeHref(entry)));
        list.append(item);
      }
      more.append(list);
      panel.append(more);
    }
    main.prepend(panel);
  }
}

function learningTools(main) {
  const entries = catalogueEntries();
  renderContinue(main, entries);
  window.addEventListener("pageshow", event => {
    if (event.persisted) renderContinue(main, entries);
  });
  const finder = window.NarajosTopicFinder;
  if (finder) {
    main.insertAdjacentHTML("beforeend", finder.markup);
    finder.mount(main, {groups: years.map(number => ({id: number, label: "Year " + number})), entries});
  }
}

const yearNav = document.querySelector("[data-catchup-years]");
const yearSelected = years.includes(year);
if (!yearSelected) yearNav.classList.add("school-year-chooser");

const main = document.querySelector("[data-catchup-catalogue]");
learningTools(main);
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
    const topics = juniorTopics(year);
    for (const topic of topics) {
      const item = element("li");
      const href = juniorHref(topic);
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
      const lessons = seniorTopics(year, code, lessonIds);
      for (const [id, lesson] of lessons) {
        const row = element("li");
        const url = seniorHref(year, id);
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

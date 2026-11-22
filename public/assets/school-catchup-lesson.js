import { identifyCatchupYear, mountJourney } from "./school-catchup-journey.js";
import { createWritingPractice, year9Writing } from "./school-catchup-writing.js";
import { year9 } from "./school-catchup-year9.js";
import { year9Visual } from "./school-catchup-visuals.js";
import { gcseCatchup } from "./gcse-catchup-data.js";
import { gcseVisual } from "./gcse-catchup-visuals.js";

const params = new URLSearchParams(location.search);
const id = params.get("topic");
if (Object.hasOwn(year9, id) || Object.hasOwn(gcseCatchup, id)) {
  const senior = Object.hasOwn(gcseCatchup, id);
  const lesson = senior ? gcseCatchup[id] : year9[id];
  const back = senior && params.get("year") === "11" && [ "B5", "C4" ].includes(lesson.code) ? 11 : lesson.year;
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  const canonical = new URL(canonicalLink.href);
  canonical.searchParams.set("topic", id);
  if (senior) canonical.searchParams.set("year", lesson.year);
  canonicalLink.href = canonical.href;
  const breadcrumb = document.querySelector(".school-breadcrumb");
  breadcrumb.href = "/science-catch-up/?year=" + back;
  breadcrumb.textContent = "← Year " + back + " topics";
  document.querySelector("[data-lesson-breadcrumb]").textContent = lesson.title;
  identifyCatchupYear(back);
  const host = document.querySelector("[data-catchup-lesson]");
  const model = document.createElement("section");
  model.className = "practice-card ks3-lesson";
  model.id = "catchup-evidence";
  const heading = document.querySelector("h1");
  heading.textContent = lesson.title;
  document.title = lesson.code + " · " + lesson.title + " | Narajos";
  const code = document.createElement("p");
  code.className = "school-code";
  code.textContent = lesson.code;
  heading.before(code);
  const title = document.createElement("h2");
  title.textContent = "Catch-up notes";
  const notice = document.createElement("p");
  notice.textContent = lesson.notice;
  const idea = document.createElement("p");
  const label = document.createElement("strong");
  label.textContent = "The key idea. ";
  idea.append(label, lesson.idea);
  model.append(title, notice);
  const visual = senior ? gcseVisual(lesson.visual) : year9Visual(id);
  if (visual) model.append(visual);
  if (!senior && lesson.visual) {
    const [caption, columns, rows] = lesson.visual;
    const box = document.createElement("div");
    box.className = "writing-data";
    const table = document.createElement("table");
    table.className = "school-lesson-table";
    table.createCaption().textContent = caption;
    const headings = table.createTHead().insertRow();
    for (const text of columns) {
      const column = document.createElement("th");
      column.scope = "col";
      column.textContent = text;
      headings.append(column);
    }
    const body = table.createTBody();
    for (const row of rows) {
      const tr = body.insertRow();
      for (const text of row) tr.insertCell().textContent = text;
    }
    box.append(table);
    if (visual && id !== "cell-structures" && id !== "gas-exchange") {
      const tableView = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = "Read the table";
      tableView.append(summary, box);
      model.append(tableView);
    } else model.append(box);
  }
  model.append(idea);
  const earlier = {
    osmosis: ["States of matter", "/ks3/lesson/?topic=states-of-matter&guided=1"],
    "active-transport": ["Osmosis and partially permeable membranes", "/science-catch-up/lesson/?topic=osmosis"],
    "gas-exchange": ["How blood carries oxygen to the muscles", "/ks3/lesson/?topic=the-body&guided=1"],
    "ionic-conduction": ["Atomic number, isotopes and ions", "/science-catch-up/lesson/?topic=atomic-number"]
  }[id];
  if (!senior && earlier) {
    const prerequisite = document.createElement("details");
    const summary = document.createElement("summary");
    const link = document.createElement("a");
    summary.textContent = "Revisit an earlier idea";
    [link.textContent, link.href] = earlier;
    prerequisite.append(summary, link);
    model.append(prerequisite);
  }
  if (lesson.higher) {
    const extension = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Higher Tier";
    const detail = document.createElement("p");
    detail.textContent = lesson.higher.replace(/^Higher Tier · /, "");
    extension.append(summary, detail);
    model.append(extension);
  }
  host.replaceChildren(model);
  if (!senior && year9Writing[id]) {
    const extra = document.createElement("details");
    extra.className = "school-lesson-extras";
    const summary = document.createElement("summary");
    summary.textContent = "Practise writing a short explanation";
    extra.append(summary, createWritingPractice("9." + id, year9Writing[id]));
    host.append(extra);
  }
  mountJourney(model, model, {...lesson, id});
}

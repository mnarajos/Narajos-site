import { mountJourney } from "./school-catchup-journey.js";
import { year9 } from "./school-catchup-year9.js";
import { year9Visual } from "./school-catchup-visuals.js";

const id = new URLSearchParams(location.search).get("topic");
if (Object.hasOwn(year9, id)) {
  const lesson = year9[id];
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
  title.textContent = "Look at the evidence";
  const cue = document.createElement("p");
  cue.textContent = lesson.notice;
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
  const idea = document.createElement("p");
  const label = document.createElement("strong");
  label.textContent = "The key idea. ";
  idea.append(label, lesson.idea);
  model.append(title, cue);
  const visual = year9Visual(id);
  if (visual) model.append(visual);
  model.append(box, idea);
  host.replaceChildren(model);
  mountJourney(model, model, {...lesson, id});
}

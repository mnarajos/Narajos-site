const form = document.querySelector("[data-writing-filter]");
if (form) {
  const buttons = Array.from(form.querySelectorAll("select"));
  const rows = Array.from(document.querySelectorAll("[data-phase][data-subject][data-purpose]"));
  const paperMenu = document.getElementById("gcse-tasks");
  const mainCards = document.querySelector("[data-writing-task-list]");
  const status = form.querySelector("[role=status]");
  form.addEventListener("submit", event => event.preventDefault());
  form.addEventListener("change", () => {
    for (const row of rows) {
      row.hidden = buttons.some(select => select.value && row.dataset[select.name] !== select.value);
    }
    paperMenu.hidden = !paperMenu.querySelector("li:not([hidden])");
    mainCards.hidden = !mainCards.querySelector("li:not([hidden])");
    status.textContent = rows.some(row => !row.hidden) ? "" : "No matching activities. Choose a different filter.";
  });
  form.hidden = false;
}

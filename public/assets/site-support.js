const form = document.querySelector(".support-confirmation");
const adult = document.getElementById("support-adult");
const outsideClass = document.getElementById("support-pupil");
const goToKofi = document.getElementById("support-continue");

function showAvailability() {
  const allowed = adult.checked && outsideClass.checked;
  if (allowed) goToKofi.href = "https://ko-fi.com/narajos";
  else goToKofi.removeAttribute("href");
  goToKofi.setAttribute("aria-disabled", String(!allowed));
}

form.addEventListener("submit", event => event.preventDefault());
form.addEventListener("change", showAvailability);
window.addEventListener("pageshow", () => {
  form.reset();
  showAvailability();
});
showAvailability();

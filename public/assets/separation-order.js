import { mountSequence } from "./sequence-order.js";

export function separationOrder() {
  const activity = document.createElement("article");
  activity.className = "practice-card";
  activity.dataset.separationOrder = "";
  const heading = document.createElement("h3");
  heading.textContent = "Recover salt from a sandy mixture";
  const prompt = document.createElement("p");
  prompt.textContent = "A beaker contains sand and salt water. Put the steps in order to collect salt crystals.";
  activity.append(heading, prompt);
  const cards = [
    "Pour the mixture through filter paper.",
    "Collect the salt solution that passes through.",
    "Gently heat the salt solution until some water has evaporated and the solution is nearly saturated.",
    "Let the concentrated solution cool so crystals form."
  ];
  const hints = [
    "First separate the sand from the salt solution.",
    "Keep the liquid that passes through the filter.",
    "Concentrate the solution before letting it cool.",
    "Cooling the concentrated solution lets crystals form."
  ];
  mountSequence(activity, {
    groups: [{ title: "Method", cards, roles: hints.map((hint, index) => ({ label: "Step " + (index + 1), hint })) }],
    order: [2, 0, 3, 1],
    bankTitle: "Steps to choose from",
    itemName: "step",
    reviewLabel: "Review this step",
    success: "The filter removes the sand. Evaporation concentrates the salt solution, and crystals form as it cools."
  });
  return activity;
}

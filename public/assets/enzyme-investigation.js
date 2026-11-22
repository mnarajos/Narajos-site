function plausible(value) {
  const words = value.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
  if (new Set(words).size < 2 || words.join("").length < 6) return false;
  return words.some(word => /[aeiouy]/i.test(word) && /[bcdfghjklmnpqrstvwxz]/i.test(word) &&
    !/^(?:asdf|qwer|zxcv|hjkl|jkl|qaz)+$/i.test(word) && !/(.)\1{3,}/u.test(word));
}

for (const form of document.querySelectorAll("[data-enzyme-explain]")) {
  const answer = form.querySelector("textarea");
  const model = form.querySelector("[data-explanation-model]");
  const status = form.querySelector("[role=status]");
  const alternate = form.querySelector("[data-explain-aloud]");
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!plausible(answer.value.trim())) {
      status.textContent = "Add a little more about what happened and why, or use the support below.";
      answer.focus();
      return;
    }
    status.textContent = "Now compare your reasoning with the checklist.";
    model.hidden = false;
    model.focus();
  });
  alternate.addEventListener("click", () => {
    status.textContent = "Now compare the explanation you gave with the checklist.";
    model.hidden = false;
    model.focus();
  });
}

const investigation = document.querySelector("[data-enzyme-model]");
if (investigation) {
  const result = investigation.querySelector("[data-enzyme-result]");
  const pairs = investigation.querySelector("[data-enzyme-test]");
  const diagram = investigation.querySelector("[data-enzyme-drawing]");
  const evidence = investigation.querySelector("[data-enzyme-evidence]");
  const shapes = {
    amylase: {
      enzyme: "M19 43H96L117 64 138 43H213V104Q213 132 185 132H47Q19 132 19 104Z",
      substrate: "M97 29H137L117 50Z", name: "Amylase", product: "Maltose"
    },
    protease: {
      enzyme: "M19 43H94Q94 69 117 69T140 43H213V104Q213 132 185 132H47Q19 132 19 104Z",
      substrate: "M96 25H138Q138 53 117 53T96 25Z", name: "Protease", product: "Smaller products"
    }
  };
  const observations = new Set();
  pairs.addEventListener("click", () => {
    const enzyme = investigation.querySelector("#compare-enzyme").value;
    const substrate = investigation.querySelector("#compare-substrate").value;
    const [enzymeModel, substrateModel] = [shapes[enzyme], shapes[substrate === "starch" ? "amylase" : "protease"]];
    const reacts = enzymeModel === substrateModel;
    const name = substrate === "starch" ? "Starch" : "Protein";
    const description = reacts
      ? name + " fits the active site. " + enzymeModel.product + " made."
      : name + " does not fit the active site. No product is made.";
    diagram.innerHTML = `<svg viewBox="0 0 240 154" role="img" aria-label="${description}">
      <path d="${enzymeModel.enzyme}" fill="#c8e5e0" stroke="#245e63" stroke-width="3"/>
      <text x="117" y="98" text-anchor="middle" fill="#1d3b47" font-size="16" font-weight="700">${enzymeModel.name}</text>
      <text x="117" y="120" text-anchor="middle" fill="#1d3b47" font-size="13">Active site at top</text>
      <path d="${substrateModel.substrate}" transform="translate(0 ${reacts ? 14 : -2})" fill="#e7a970" stroke="#8a4926" stroke-width="2"/>
      </svg>`;
    result.textContent = description;
    const key = enzyme + ":" + substrate;
    if (!observations.has(key)) {
      observations.add(key);
      const item = document.createElement("li");
      item.textContent = enzymeModel.name + " + " + name.toLowerCase() + " · " + (reacts ? "Product made" : "No product");
      evidence.append(item);
    }
  });
}

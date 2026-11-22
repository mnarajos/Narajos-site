export const ink = "#263e4a";
export const teal = "#23656c";
export const rust = "#98451e";
export const blue = "#23558c";
export const violet = "#69447f";

export function node(tag, text, className) {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.className = className;
  return element;
}

export function line(x1, y1, x2, y2, color = ink, width = 2, dash = "") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;
}

export function arrow(x1, y1, x2, y2, color = teal, width = 2.5) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 7 + width;
  const x = x2 - size * Math.cos(angle);
  const y = y2 - size * Math.sin(angle);
  const dx = size * .45 * Math.sin(angle);
  const dy = size * .45 * Math.cos(angle);
  return line(x1, y1, x2, y2, color, width) +
    `<path d="M${x2} ${y2} L${x + dx} ${y - dy} L${x - dx} ${y + dy} Z" fill="${color}"/>`;
}

export function text(x, y, value, color = ink, size = 16, anchor = "middle") {
  return `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" text-anchor="${anchor}" font-weight="650">${value}</text>`;
}

export function circle(x, y, r, fill, stroke = ink, width = 1.5) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
}

export function diagram(description, drawing, width = 320, height = 170) {
  return `<svg role="img" aria-label="${description}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${drawing}</svg>`;
}

export function picture(title, drawing, note) {
  const figure = node("figure", "", "catchup-picture");
  const caption = node("figcaption");
  caption.append(node("strong", title));
  if (note) caption.append(node("span", note));
  const image = node("div", "", "catchup-drawing");
  image.innerHTML = drawing;
  figure.append(image, caption);
  return figure;
}

export function compare(...panels) {
  const row = node("div", "", "catchup-model-grid");
  row.append(...panels);
  return row;
}

// Each step is a still. Pupils can inspect it for as long as they need.
export function steps(label, stages) {
  const model = node("section", "", "catchup-model");
  model.setAttribute("aria-label", label);
  const controls = node("div", "", "ks3-model-controls catchup-model-controls");
  const view = node("div");
  const status = node("p", "", "school-visually-hidden");
  status.setAttribute("role", "status");
  const buttons = stages.map(([stage]) => {
    const button = node("button", stage, "ks3-model-button");
    button.type = "button";
    return button;
  });
  function show(index, announce) {
    buttons.forEach((button, i) => button.setAttribute("aria-pressed", String(i === index)));
    view.replaceChildren(stages[index][1]());
    if (announce) status.textContent = stages[index][0] + " shown.";
  }
  buttons.forEach((button, index) => button.addEventListener("click", () => show(index, true)));
  controls.append(...buttons);
  model.append(controls, view, status);
  show(0, false);
  return model;
}

export function airSac(detailed = false, thick = false) {
  const offset = thick ? 17 : 0;
  const drawing = `
    <path d="M144 22V47 C104 36 67 61 64 96 C59 130 88 152 124 149 H196 C233 149 260 125 256 93 C252 62 219 38 176 47 V22"
      fill="#e2f3f6" stroke="${teal}" stroke-width="3"/>
    <path d="M31 ${115 + offset} Q66 ${164 + offset} 119 ${165 + offset} H190 Q249 ${165 + offset} 288 ${116 + offset}
      L301 ${134 + offset} Q254 ${189 + offset} 194 ${190 + offset} H117 Q58 ${190 + offset} 17 ${136 + offset} Z"
      fill="#f8e2de" stroke="${rust}" stroke-width="2.5"/>
    ${text(160, 74, "Air in the air sac")}
    ${text(160, 96, "Oxygen", blue)}
    ${arrow(160, 105, 160, 174 + offset, blue, 3)}
    ${text(160, 225, "Blood in the capillary", rust)}
    ${detailed ? arrow(187, 179 + offset, 236, 169 + offset, rust) + text(255, 208, "Blood flow", rust, 15) : ""}
    ${thick ? text(225, 165, "Thicker barrier", rust, 14) : ""}`;
  return picture(thick ? "Thicker barrier" : "An air sac and its capillary",
    diagram(thick ? "Oxygen crosses a longer path from the air sac to the capillary because the barrier is thicker."
      : "An oxygen arrow crosses from air inside one alveolus, through its wall and the capillary wall, into blood.", drawing, 320, 239),
    thick ? "The longer diffusion distance slows gas exchange."
      : detailed ? "Oxygen diffuses into the blood across a thin barrier. Many small sacs provide a large total surface."
        : "Oxygen passes from air in the lung into the nearby blood.");
}

export function periodicOutline() {
  const grid = node("div", "", "catchup-periodic");
  grid.setAttribute("role", "img");
  grid.setAttribute("aria-label", "GCSE periodic-table outline. Hydrogen is shown separately at the top centre. Group 1 is the left-hand column, starting with lithium. Group 0 is the right-hand column, starting with helium.");
  for (let period = 1; period <= 7; period++) {
    for (let group = 1; group <= 18; group++) {
      if (period === 1 && group !== 1 && group !== 18) continue;
      if ((period === 2 || period === 3) && group > 2 && group < 13) continue;
      const square = node("span");
      square.style.gridArea = period + " / " + group;
      if (period === 1 && group === 1) {
        square.style.gridArea = "1 / 9 / 2 / 11";
        square.className = "catchup-hydrogen";
        square.textContent = "H";
      }
      if (period === 1 && group === 18) square.textContent = "He";
      if (group === 1 && period > 1) square.className = "catchup-group-one";
      if (group === 18) square.className = "catchup-group-zero";
      grid.append(square);
    }
  }
  const key = node("div", "", "catchup-periodic-key");
  key.append(node("span", "Group 1 · left"), node("span", "Group 0 · right"));
  const model = node("div");
  model.append(grid, key);
  return model;
}

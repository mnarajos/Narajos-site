const toys = {
  car: {name: "Car", paint: "red", roll: 1, wheel: 5,
    body: '<path d="M-23-7v-7l10-3 7-9H7l10 9 7 3v7Z"/><path class="tr-glass" d="m-9-17 6-7h8l8 7Z"/><path class="tr-trim" d="M-22-12h5m35 0h5"/>'},
  van: {name: "Van", paint: "blue", roll: .86, wheel: 5,
    body: '<path d="M-24-7v-20H10l6 8 9 4v8Z"/><path class="tr-glass" d="M7-24h3l5 8H7Z"/><path class="tr-trim" d="M-20-23H1v11h-21Z"/>'},
  motorbike: {name: "Motorbike", paint: "green", roll: 1.11, wheel: 7,
    body: '<path d="M-18-7l8-11H3l8 5 7 6-12-2-7 4h-7Z"/><path class="tr-trim" d="m17-7-7-15-5-2M-14-19h11"/><path class="tr-glass" d="m6-17 5 4H2Z"/>'},
  bicycle: {name: "Bicycle", paint: "purple", roll: .92, wheel: 8,
    body: '<path class="tr-frame" d="m-17-8 8-13 8 13h-16l8-13H9L-1-8m18 0-8-13-1-6h5"/><path class="tr-trim" d="M-14-23h9M-4-7h5"/>'}
};
const colours = {
  red: "#b83c33", blue: "#276dac", green: "#237b52", purple: "#8050a0", orange: "#bc551a"
};
const surfaces = {
  plastic: {name: "Smooth plastic", roll: 3, base: "#c4e3ef", ink: "#436a7d",
    texture: '<path d="M0 2h16m0 5H0" stroke-width="1"/>'},
  wood: {name: "Wood", roll: 2.35, base: "#efd09e", ink: "#8a592f",
    texture: '<path d="M0 3c5-3 10 3 16 0M0 7c4-3 12 2 16 0" stroke-width="1"/>'},
  felt: {name: "Rough felt", roll: 1.28, base: "#bee1d2", ink: "#397659",
    texture: '<path d="m0 2 3-2m5 4 3-2m2 6 3-2M2 8l3-2" stroke-width="2"/>'}
};
const startPoints = {top: .87, middle: .55, bottom: .25};
const pointNames = {top: "Near the top", middle: "Halfway up", bottom: "Near the bottom"};
const foot = 154;
const floor = 123;
const rampLength = 115;
const rulerScale = 1.65;
const style = new URL("./toy-ramp.css", import.meta.url).href;

function toyDrawing(id, paint, loaded = false) {
  const {wheel, body} = toys[id];
  const wheels = [-17, 17].map(x =>
    '<circle cx="' + x + '" cy="' + -wheel + '" r="' + wheel + '"/>' +
    '<circle class="tr-hub" cx="' + x + '" cy="' + -wheel + '" r="' + (wheel - 3) + '"/>').join("");
  const colour = colours[paint];
  return '<g class="tr-wheels">' + wheels + '</g><g class="tr-body" fill="' + colour +
    '" style="--tr-paint:' + colour + '">' +
    body + (loaded ? '<rect class="tr-load" x="-9" y="-30" width="11" height="8" rx="1"/>' : "") + '</g>';
}

function options(values) {
  return Object.entries(values).map(([value, label]) =>
    '<option value="' + value + '">' + label + '</option>').join("");
}

function tickMarks() {
  return Array.from({length: 21}, (_, index) => {
    const x = foot + index * 10 * rulerScale;
    const major = index % 5 === 0;
    return '<path d="M' + x + ' 152v-' + (major ? 12 : 6) + '"/>' +
      (major ? '<text x="' + x + '" y="173">' + index * 10 + '</text>' : "");
  }).join("");
}

function pointOnRamp(fraction, angle) {
  const radians = angle * Math.PI / 180;
  return [foot - rampLength * fraction * Math.cos(radians), floor - rampLength * fraction * Math.sin(radians)];
}

if (!document.querySelector('link[href="' + style + '"]')) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = style;
  document.head.append(link);
}

let models = 0;

class ToyRamp extends HTMLElement {
  connectedCallback() {
    if (this.firstElementChild) return;
    const id = "toy-ramp-" + ++models;
    this.innerHTML = `
      <section class="tr-model" aria-labelledby="${id}-title">
        <h3 id="${id}-title">Roll a toy down a ramp</h3>
        <p>Roll once. Change one thing, then roll again.</p>
        <fieldset class="tr-setup">
          <legend class="tr-sr">Choose your setup</legend>
          <div class="tr-toys" role="group" aria-label="Toy vehicle">
            ${Object.entries(toys).map(([key, toy]) =>
              '<button type="button" data-toy="' + key + '" aria-pressed="' + (key === "car") + '">' +
              '<svg viewBox="-32 -32 64 36" aria-hidden="true">' + toyDrawing(key, toy.paint) +
              '</svg><span>' + toy.name + '</span></button>').join("")}
          </div>
          <p class="tr-placement">Tap or choose a toy, or drag it onto the ramp.</p>
          <div class="tr-settings">
            <label>Ramp surface
              <select data-surface>${options(Object.fromEntries(Object.entries(surfaces).map(([key, surface]) => [key, surface.name])))}</select>
            </label>
            <label>Ramp angle
              <select data-angle>${options({10: "10° · Shallow", 20: "20° · Intermediate", 30: "30° · Steep"})}</select>
            </label>
            <label>Release point
              <select data-point>${options(pointNames)}</select>
            </label>
          </div>
          <details class="tr-extra">
            <summary>Change the toy’s paint or load</summary>
            <div class="tr-settings">
              <label>Paint colour
                <select data-paint>${options(Object.fromEntries(Object.keys(colours).map(colour => [colour, colour[0].toUpperCase() + colour.slice(1)])))}</select>
              </label>
              <label class="tr-load-setting"><input data-load type="checkbox"> Add a small load</label>
            </div>
          </details>
        </fieldset>
        <figure class="tr-apparatus">
          <svg viewBox="0 0 514 184" aria-hidden="true">
            <defs>
              ${Object.entries(surfaces).map(([key, surface]) =>
                '<pattern id="' + id + '-' + key + '" width="16" height="8" patternUnits="userSpaceOnUse">' +
                '<rect width="16" height="8" fill="' + surface.base + '"/><g stroke="' + surface.ink +
                '" fill="none" opacity=".75">' + surface.texture + '</g></pattern>').join("")}
            </defs>
            <rect x="1" y="1" width="512" height="182" rx="11" fill="#f2f7fa"/>
            <path class="tr-support" data-support/>
            <path class="tr-board" data-board/>
            <path class="tr-ground" d="M12 ${floor}H502"/>
            <path class="tr-drop-zone" data-drop-zone/>
            <g class="tr-ruler">
              <rect x="${foot - 7}" y="138" width="344" height="42" rx="4"/>
              ${tickMarks()}
            </g>
            <line class="tr-stop" data-stop y1="101" y2="151" visibility="hidden"/>
            <circle class="tr-release" data-release r="4.5"/>
            <g data-track-toy></g>
          </svg>
          <figcaption>Measure in cm from 0 at the foot of the ramp.</figcaption>
        </figure>
        <div class="tr-actions">
          <button type="button" data-roll>Roll toy</button>
          <p role="status" data-result>Ready to roll.</p>
        </div>
        <dl class="tr-runs" data-runs hidden></dl>
        <p class="tr-model-note">Model distances can differ from what happens with real toys.</p>
      </section>`;

    const setup = this.querySelector(".tr-setup");
    const buttons = [...setup.querySelectorAll("[data-toy]")];
    const surface = setup.querySelector("[data-surface]");
    const angle = setup.querySelector("[data-angle]");
    const point = setup.querySelector("[data-point]");
    const paint = setup.querySelector("[data-paint]");
    const load = setup.querySelector("[data-load]");
    const apparatus = this.querySelector(".tr-apparatus svg");
    const support = apparatus.querySelector("[data-support]");
    const board = apparatus.querySelector("[data-board]");
    const dropZone = apparatus.querySelector("[data-drop-zone]");
    const release = apparatus.querySelector("[data-release]");
    const trackToy = apparatus.querySelector("[data-track-toy]");
    const stop = apparatus.querySelector("[data-stop]");
    const roll = this.querySelector("[data-roll]");
    const result = this.querySelector("[data-result]");
    const runs = this.querySelector("[data-runs]");
    const history = [];
    const paints = Object.fromEntries(Object.entries(toys).map(([key, toy]) => [key, toy.paint]));
    const loads = {};
    let toy = "car";
    let rolling = false;
    let drag = null;
    let justDragged = false;

    angle.value = "20";
    point.value = "top";

    function placeToy(x, y, pitch) {
      trackToy.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + pitch + ")");
    }

    function refresh() {
      const pitch = Number(angle.value);
      const [topX, topY] = pointOnRamp(1, pitch);
      const [x, y] = pointOnRamp(startPoints[point.value], pitch);
      support.setAttribute("d", "M" + (topX + 5) + " " + (topY + 10) + "V" + floor + "h28V" + (topY + 21) + "Z");
      const rampPath = "M" + topX + " " + topY + "L" + foot + " " + floor;
      board.setAttribute("d", rampPath + "L" + (foot - 21) + " " + floor + "L" + topX + " " + (topY + 12) + "Z");
      board.setAttribute("fill", "url(#" + id + "-" + surface.value + ")");
      dropZone.setAttribute("d", rampPath);
      release.setAttribute("cx", x);
      release.setAttribute("cy", y);
      trackToy.innerHTML = toyDrawing(toy, paint.value, load.checked);
      stop.setAttribute("visibility", "hidden");
      placeToy(x, y, pitch);
      if (result.textContent !== "Ready to roll.") result.textContent = "Ready to roll.";
    }

    function chooseToy(key) {
      toy = key;
      paint.value = paints[toy];
      load.checked = Boolean(loads[toy]);
      buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.toy === toy)));
    }

    function stagePoint(event) {
      const rect = apparatus.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width * 514;
      const y = (event.clientY - rect.top) / rect.height * 184;
      if (x < 0 || x > foot + 16 || y < 0 || y > floor + 13) return null;
      const [topX] = pointOnRamp(1, Number(angle.value));
      const fraction = (foot - x) / (foot - topX);
      return Object.entries(startPoints).sort((a, b) =>
        Math.abs(a[1] - fraction) - Math.abs(b[1] - fraction))[0][0];
    }

    function showRuns() {
      runs.replaceChildren();
      history.forEach(({distance, description}, index) => {
        const card = document.createElement("div");
        const title = document.createElement("dt");
        const reading = document.createElement("dd");
        const value = document.createElement("strong");
        const settings = document.createElement("span");
        title.textContent = index === 0 ? "Latest run" : "Previous run";
        value.textContent = distance + " cm";
        settings.textContent = description;
        reading.append(value, settings);
        card.append(title, reading);
        runs.append(card);
      });
      runs.hidden = false;
    }

    for (const button of buttons) {
      const key = button.dataset.toy;
      button.addEventListener("click", () => {
        if (justDragged || rolling) return;
        chooseToy(key);
        refresh();
      });
      button.addEventListener("pointerdown", event => {
        if (rolling || !event.isPrimary || event.button !== 0) return;
        justDragged = false;
        drag = {key, id: event.pointerId, x: event.clientX, y: event.clientY, preview: null};
        button.setPointerCapture(event.pointerId);
      });
      button.addEventListener("pointermove", event => {
        if (drag?.id !== event.pointerId) return;
        if (!drag.preview && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 7) return;
        if (!drag.preview) {
          drag.preview = document.createElement("span");
          drag.preview.className = "tr-drag-preview";
          drag.preview.setAttribute("aria-hidden", "true");
          drag.preview.innerHTML = '<svg viewBox="-32 -32 64 36">' + toyDrawing(key, paints[key], loads[key]) + '</svg>';
          this.append(drag.preview);
        }
        drag.preview.style.transform = "translate(" + event.clientX + "px," + event.clientY + "px)";
        apparatus.toggleAttribute("data-drop-ready", Boolean(stagePoint(event)));
      });
      function endDrag(event, cancelled = false) {
        if (drag?.id !== event.pointerId) return;
        if (drag.preview) {
          justDragged = true;
          drag.preview.remove();
          apparatus.removeAttribute("data-drop-ready");
          const target = !cancelled && stagePoint(event);
          if (target) {
            chooseToy(key);
            point.value = target;
            refresh();
            result.textContent = toys[key].name + " ready. " + pointNames[target] + ".";
          }
          setTimeout(() => { justDragged = false; }, 0);
        }
        drag = null;
      }
      button.addEventListener("pointerup", endDrag);
      button.addEventListener("pointercancel", event => endDrag(event, true));
      button.addEventListener("lostpointercapture", event => endDrag(event, true));
    }

    apparatus.addEventListener("click", event => {
      if (rolling) return;
      const target = stagePoint(event);
      if (target) {
        point.value = target;
        refresh();
        result.textContent = pointNames[target] + ". Ready to roll.";
      }
    });

    setup.addEventListener("change", event => {
      if (event.target === paint) paints[toy] = paint.value;
      if (event.target === load) loads[toy] = load.checked;
      refresh();
    });

    roll.addEventListener("click", () => {
      if (rolling) return;
      rolling = true;
      setup.disabled = true;
      roll.setAttribute("aria-disabled", "true");
      result.textContent = "Rolling…";
      stop.setAttribute("visibility", "hidden");
      const pitch = Number(angle.value);
      const fraction = startPoints[point.value];
      const [, startY] = pointOnRamp(fraction, pitch);
      // Deliberately illustrative: vertical drop drives distance; surfaces and toys
      // have different losses. A loaded toy in this model retains more motion.
      const distance = Math.round((floor - startY) / rampLength * 100 *
        surfaces[surface.value].roll * toys[toy].roll * (load.checked ? 1.12 : 1));
      const endX = foot + distance * rulerScale;

      function finish() {
        placeToy(endX, floor, 0);
        stop.setAttribute("x1", endX);
        stop.setAttribute("x2", endX);
        stop.setAttribute("visibility", "visible");
        const description = [
          paints[toy] + " " + toys[toy].name.toLowerCase(), pitch + "°", surfaces[surface.value].name,
          pointNames[point.value], load.checked ? "With a load" : "No extra load"
        ].join(" · ");
        history.unshift({distance, description});
        if (history.length > 2) history.pop();
        showRuns();
        result.textContent = "Distance from the ramp: " + distance + " cm.";
        rolling = false;
        setup.disabled = false;
        roll.removeAttribute("aria-disabled");
      }

      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finish();
        return;
      }
      let began;
      function animate(time) {
        began ??= time;
        const elapsed = time - began;
        if (elapsed < 540) {
          const next = fraction * (1 - (elapsed / 540) ** 2);
          placeToy(...pointOnRamp(next, pitch), next > .08 ? pitch : pitch * next / .08);
        } else if (elapsed < 1410) {
          const progress = (elapsed - 540) / 870;
          placeToy(foot + (endX - foot) * (1 - (1 - progress) ** 2), floor, 0);
        } else {
          finish();
          return;
        }
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    });

    refresh();
  }
}

customElements.define("toy-ramp", ToyRamp);

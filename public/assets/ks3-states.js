const width = 300;
const height = 166;
const radius = 8.8;
const count = 48;
const states = [
  {name: "Solid", observe: "Particles are packed in a regular arrangement. Watch them vibrate around fixed positions."},
  {name: "Liquid", observe: "Particles stay close together and collect at the bottom. Watch them change neighbours as they slide past each other."},
  {name: "Gas", observe: "Particles are much farther apart and move quickly throughout the box. They collide with one another and the walls."}
];
const onHeating = ["", "Melting. ", "Boiling. "];
const onCooling = ["Freezing. ", "Condensing. ", ""];

function makeParticles(state) {
  let seed = 21;
  const random = () => {
    seed = seed * 16807 % 2147483647;
    return seed / 2147483647;
  };
  const particles = [];
  for (let index = 0; index < count; index++) {
    const columns = state === 0 ? 8 : 9;
    const row = Math.floor(index / columns);
    const col = index % columns;
    const speed = state === 2 ? 75 + 56 * random() : 24 + 31 * random();
    const angle = random() * 2 * Math.PI;
    const packed = state === 0;
    const spacing = radius * 2;
    let x = packed ? (width - spacing * (columns - 1)) / 2 + col * spacing : 19 + col * 32 + random() * 10;
    const bottom = height - radius - row * spacing;
    let y = packed ? bottom : bottom - random() * 8;
    if (state === 2) {
      do {
        x = radius + random() * (width - 2 * radius);
        y = radius + random() * (height - 2 * radius);
      } while (particles.some(p => Math.hypot(p.x - x, p.y - y) < spacing));
    }
    particles.push({x, y, vx: speed * Math.cos(angle), vy: speed * Math.sin(angle), phase: random() * 12, hit: 0});
  }
  if (state === 1) {
    for (let step = 0; step < 360; step++) moveParticles(particles, state, 1 / 120, step / 120);
  }
  return particles;
}

function bounceOffWalls(p, restitution) {
  if (p.x < radius || p.x > width - radius) {
    p.x = Math.max(radius, Math.min(width - radius, p.x));
    p.vx = p.x === radius ? Math.abs(p.vx) * restitution : -Math.abs(p.vx) * restitution;
    p.hit = .09;
  }
  if (p.y < radius || p.y > height - radius) {
    p.y = Math.max(radius, Math.min(height - radius, p.y));
    p.vy = p.y === radius ? Math.abs(p.vy) * restitution : -Math.abs(p.vy) * restitution;
    p.hit = .09;
  }
}

function moveParticles(particles, state, dt, time) {
  const liquid = state === 1;
  for (const p of particles) {
    p.hit = Math.max(0, p.hit - dt);
    if (liquid) {
      // Gravity collects the liquid at the bottom. Gentle stirring keeps particles rearranging.
      p.vx += (Math.sin(time * (6 + p.phase / 6) + p.phase) * 470 - p.vx * 1.5) * dt;
      p.vy += (280 + Math.cos(time * 7.3 + p.phase) * 650 - p.vy * 2.5) * dt;
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    bounceOffWalls(p, liquid ? .42 : 1);
  }

  const diameter = radius * 2;
  const contact = diameter ** 2;
  for (let pass = 0; pass < (liquid ? 3 : 1); pass++) {
    for (let i = 0; i < particles.length - 1; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const squared = dx * dx + dy * dy;
        if (squared >= contact || squared === 0) continue;
        const separation = Math.sqrt(squared);
        const nx = dx / separation;
        const ny = dy / separation;
        const correction = (diameter - separation) / 2;
        a.x -= nx * correction;
        a.y -= ny * correction;
        b.x += nx * correction;
        b.y += ny * correction;
        const approach = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
        if (approach >= 0) continue;
        const impulse = approach * (liquid ? .81 : 1);
        a.vx += impulse * nx;
        a.vy += impulse * ny;
        b.vx -= impulse * nx;
        b.vy -= impulse * ny;
        if (!liquid) a.hit = b.hit = .09;
      }
    }
    for (const p of particles) bounceOffWalls(p, liquid ? .42 : 1);
  }
}

let modelCount = 0;

class KS3StatesModel extends HTMLElement {
  connectedCallback() {
    if (this.firstElementChild) return;
    const heading = "ks3-states-title-" + ++modelCount;
    this.innerHTML = `
      <section class="ks3-states-model" aria-labelledby="${heading}">
        <h3 id="${heading}">What changes when a substance heats or cools?</h3>
        <p>Play the motion. Heat or cool one step at a time. What changes about how the particles are arranged and how they move?</p>
        <figure>
          <canvas width="600" height="332" aria-hidden="true"></canvas>
          <figcaption role="status" data-particle-state></figcaption>
        </figure>
        <div class="ks3-model-controls">
          <button type="button" class="ks3-model-button" data-motion>Play motion</button>
          <button type="button" class="ks3-model-button" data-heat>Heat</button>
          <button type="button" class="ks3-model-button" data-cool>Cool</button>
        </div>
        <label class="ks3-tracer"><input type="checkbox" data-trace> Follow one particle</label>
        <p class="ks3-cell-note">The same number of particles is shown in each state. Their size stays the same.</p>
      </section>`;
    const canvas = this.querySelector("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(2, 2);
    const caption = this.querySelector("[data-particle-state]");
    const play = this.querySelector("[data-motion]");
    const heat = this.querySelector("[data-heat]");
    const cool = this.querySelector("[data-cool]");
    const trace = this.querySelector("[data-trace]");
    let state = 0;
    let particles = makeParticles(state);
    let clock = 0;
    let lastTime;
    let frame = 0;

    function draw() {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#f2f8fa";
      context.fillRect(0, 0, width, height);
      particles.forEach((particle, index) => {
        const x = particle.x + (state === 0 ? .84 * Math.sin(clock * 16 + particle.phase) : 0);
        const y = particle.y + (state === 0 ? .7 * Math.cos(clock * 16 + particle.phase) : 0);
        const selected = trace.checked && index === 16;
        context.beginPath();
        context.arc(x, y, radius - .2, 0, Math.PI * 2);
        context.fillStyle = selected ? "#f9d47b" : "#5594ae";
        context.fill();
        context.lineWidth = selected || particle.hit > 0 ? 1.9 : .85;
        context.strokeStyle = selected ? "#563b21" : "#244f65";
        context.stroke();
        if (selected) {
          context.beginPath();
          context.arc(x, y, 2, 0, Math.PI * 2);
          context.fillStyle = "#563b21";
          context.fill();
        }
      });
    }

    function updateState(change = "") {
      const {name, observe} = states[state];
      caption.textContent = change + name + ". " + observe;
      heat.setAttribute("aria-disabled", String(state === 2));
      cool.setAttribute("aria-disabled", String(state === 0));
      draw();
    }

    function changeState(direction) {
      const next = state + direction;
      if (next < 0 || next >= states.length) return;
      state = next;
      clock = state === 1 ? 3 : 0;
      particles = makeParticles(state);
      updateState(direction > 0 ? onHeating[state] : onCooling[state]);
    }

    function animate(timestamp) {
      const elapsed = lastTime === undefined ? 0 : Math.min((timestamp - lastTime) / 1000, .03);
      lastTime = timestamp;
      const dt = elapsed / 3;
      for (let step = 0; step < 3; step++) {
        clock += dt;
        if (state > 0) moveParticles(particles, state, dt, clock);
      }
      draw();
      frame = requestAnimationFrame(animate);
    }

    play.addEventListener("click", () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
        play.textContent = "Play motion";
      } else {
        lastTime = undefined;
        frame = requestAnimationFrame(animate);
        play.textContent = "Pause motion";
      }
    });
    heat.addEventListener("click", () => changeState(1));
    cool.addEventListener("click", () => changeState(-1));
    trace.addEventListener("change", draw);
    updateState();
  }
}

customElements.define("ks3-states-model", KS3StatesModel);

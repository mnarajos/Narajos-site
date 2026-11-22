const width = 300;
const height = 166;
const radius = 8.8;
const diameter = radius * 2;
const count = 48;
const solid = 0;
const liquid = 1;
const gas = 2;

// A teaching model with two intermediate snapshots at the phase boundaries.
const stages = [
  {phases: [48, 0], pace: .58, label: "Cool solid", note: "Particles vibrate in fixed positions."},
  {phases: [48, 0], pace: 1, label: "Warmer solid", note: "Particles vibrate faster. It is still solid."},
  {phases: [24, 24], pace: 1, heating: "Melting", cooling: "Freezing", note: "Solid and liquid together. Temperature stays steady."},
  {phases: [0, 48], pace: .72, label: "Liquid", note: "Close-packed particles slide past each other. The liquid is hard to compress."},
  {phases: [0, 48], pace: 1.25, label: "Warmer liquid", note: "Particles move faster. They are still close together."},
  {phases: [0, 24], pace: 1, heating: "Boiling", cooling: "Condensing", note: "Liquid and gas together. Temperature stays steady."},
  {phases: [0, 0], pace: .9, label: "Gas", note: "Particles move throughout the box. They hit each other and the walls."},
  {phases: [0, 0], pace: 1.4, label: "Warmer gas", note: "Particles move faster. It is still a gas."}
];

function makeParticles([solidCount, liquidCount]) {
  let seed = 21;
  const random = () => {
    seed = seed * 16807 % 2147483647;
    return seed / 2147483647;
  };
  const particles = [];
  const solidColumns = solidCount === count ? 8 : 6;
  const solidCentre = solidCount === count ? width / 2 : 61;
  const liquidLeft = solidCount ? 117 : 0;
  const liquidColumns = Math.floor((width - liquidLeft - radius) / diameter);

  for (let index = 0; index < count; index++) {
    const phase = index < solidCount ? solid : index < solidCount + liquidCount ? liquid : gas;
    let x;
    let y;
    if (phase === solid) {
      x = solidCentre + (index % solidColumns - (solidColumns - 1) / 2) * diameter;
      y = height - radius - Math.floor(index / solidColumns) * diameter;
    } else if (phase === liquid) {
      const local = index - solidCount;
      const row = Math.floor(local / liquidColumns);
      x = liquidLeft + radius + (local % liquidColumns + (row % 2 ? .48 : 0)) * diameter + random() * .55;
      y = height - radius - row * diameter * .883 - random() * .5;
    } else {
      do {
        x = radius + random() * (width - diameter);
        y = radius + random() * (height - diameter);
      } while (particles.some(p => (p.x - x) ** 2 + (p.y - y) ** 2 < diameter ** 2));
    }
    const speed = phase === gas ? 72 + 39 * random() : 18 + 24 * random();
    const angle = random() * 2 * Math.PI;
    particles.push({x, y, vx: speed * Math.cos(angle), vy: speed * Math.sin(angle), phase, offset: random() * 12, hit: 0});
  }
  // Let the liquid settle into an irregular, tightly packed layer before drawing it.
  if (liquidCount) {
    for (let i = 0; i < 160; i++) moveParticles(particles, 1 / 120, i / 120);
  }
  return particles;
}

function bounceOffWalls(p) {
  const restitution = p.phase === liquid ? .35 : 1;
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

function moveParticles(particles, dt, time) {
  for (const p of particles) {
    if (p.phase === solid) continue;
    p.hit = Math.max(0, p.hit - dt);
    if (p.phase === liquid) {
      // Downward acceleration keeps the liquid pooled. Stirring lets neighbours exchange places.
      p.vx += (Math.sin(time * (4 + p.offset / 6) + p.offset) * 320 - p.vx * 2.5) * dt;
      p.vy += (520 + Math.cos(time * 6.3 + p.offset) * 245 - p.vy * 3) * dt;
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    bounceOffWalls(p);
  }

  const contact = diameter ** 2;
  for (let pass = 0; pass < 4; pass++) {
    for (let i = 0; i < particles.length - 1; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const movableA = a.phase !== solid;
        const movableB = b.phase !== solid;
        if (!movableA && !movableB) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const squared = dx * dx + dy * dy;
        if (squared >= contact || squared === 0) continue;
        const separation = Math.sqrt(squared);
        const nx = dx / separation;
        const ny = dy / separation;
        const participants = Number(movableA) + Number(movableB);
        const correction = (diameter - separation) / participants;
        const approach = (b.vx * movableB - a.vx * movableA) * nx + (b.vy * movableB - a.vy * movableA) * ny;
        const restitution = a.phase === liquid || b.phase === liquid ? .55 : 1;
        const impulse = Math.min(0, approach) * (1 + restitution) / participants;
        if (movableA) {
          a.x -= nx * correction;
          a.y -= ny * correction;
          a.vx += impulse * nx;
          a.vy += impulse * ny;
        }
        if (movableB) {
          b.x += nx * correction;
          b.y += ny * correction;
          b.vx -= impulse * nx;
          b.vy -= impulse * ny;
        }
        if (impulse && (a.phase === gas || b.phase === gas)) a.hit = b.hit = .09;
      }
    }
    for (const p of particles) if (p.phase !== solid) bounceOffWalls(p);
  }
}

let modelCount = 0;

class KS3StatesModel extends HTMLElement {
  connectedCallback() {
    if (this.firstElementChild) return;
    const heading = "ks3-states-title-" + ++modelCount;
    this.innerHTML = `
      <section class="ks3-states-model" aria-labelledby="${heading}">
        <h3 id="${heading}">What changes as a substance warms?</h3>
        <p>Press Heat once. Watch the solid before it melts.</p>
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
        <p class="ks3-cell-note">Particle size and number stay the same.</p>
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
    let level = 0;
    let particles = makeParticles(stages[level].phases);
    let clock = 0;
    let lastTime;
    let frame = 0;
    let hasPaused = matchMedia("(prefers-reduced-motion: reduce)").matches;

    function draw() {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#f2f8fa";
      context.fillRect(0, 0, width, height);
      const vibration = .34 + .63 * stages[level].pace;
      particles.forEach((particle, index) => {
        const x = particle.x + (particle.phase === solid ? vibration * Math.sin(clock * 22 + particle.offset) : 0);
        const y = particle.y + (particle.phase === solid ? vibration * Math.cos(clock * 22 + particle.offset) : 0);
        const selected = trace.checked && index === 16;
        context.beginPath();
        context.arc(x, y, radius - .24, 0, Math.PI * 2);
        context.fillStyle = selected ? "#f9d47b" : "#5594ae";
        context.fill();
        context.lineWidth = selected || particle.hit > 0 ? 1.8 : .85;
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

    function updateState(direction) {
      const stage = stages[level];
      caption.textContent = (stage.label || (direction > 0 ? stage.heating : stage.cooling)) + ". " + stage.note;
      heat.setAttribute("aria-disabled", String(level === stages.length - 1));
      cool.setAttribute("aria-disabled", String(level === 0));
      draw();
    }

    function startMotion() {
      if (frame) return;
      lastTime = undefined;
      frame = requestAnimationFrame(animate);
      play.textContent = "Pause motion";
    }

    function changeTemperature(direction) {
      const next = level + direction;
      if (next < 0 || next >= stages.length) return;
      const [solids, liquids] = stages[level].phases;
      const phases = stages[next].phases;
      if (solids !== phases[0] || liquids !== phases[1]) {
        particles = makeParticles(phases);
        clock = phases[1] ? 160 / 120 : 0;
      }
      level = next;
      updateState(direction);
      if (!hasPaused) startMotion();
    }

    function animate(timestamp) {
      const elapsed = lastTime === undefined ? 0 : Math.min((timestamp - lastTime) / 1000, .03);
      lastTime = timestamp;
      const dt = elapsed * stages[level].pace / 3;
      for (let step = 0; step < 3; step++) {
        clock += dt;
        if (stages[level].phases[0] < count) moveParticles(particles, dt, clock);
      }
      draw();
      frame = requestAnimationFrame(animate);
    }

    play.addEventListener("click", () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
        hasPaused = true;
        play.textContent = "Play motion";
      } else {
        hasPaused = false;
        startMotion();
      }
    });
    heat.addEventListener("click", () => changeTemperature(1));
    cool.addEventListener("click", () => changeTemperature(-1));
    trace.addEventListener("change", draw);
    updateState();
  }
}

customElements.define("ks3-states-model", KS3StatesModel);

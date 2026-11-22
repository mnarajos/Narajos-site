(function () {
  "use strict";

  const model = document.querySelector("[data-gas-pressure]");
  const canvas = model.querySelector("canvas");
  const context = canvas.getContext("2d");
  if (!context) return;

  const controls = model.querySelectorAll('input[name="gas-condition"]');
  const toggle = model.querySelector("[data-gas-motion]");
  const change = model.querySelector("[data-gas-change]");
  const next = model.querySelector("[data-gas-next]");
  const back = model.querySelector("[data-gas-back]");
  const free = model.querySelector("[data-gas-free]");
  const guide = model.querySelector(".gas-guide");
  const label = model.querySelector("[data-gas-step]");
  const prompt = model.querySelector("[data-gas-prompt]");
  const output = model.querySelector("[role=status]");
  const conditions = {
    start: { width: 336, speed: 1, pressure: 1, description: "Starting pressure. The particles bounce off the walls." },
    warm: { width: 336, speed: Math.sqrt(1.8), pressure: 1.8, description: "Higher pressure. The same particles move faster. The box stays the same size." },
    small: { width: 210, speed: 1, pressure: 1.6, description: "Higher pressure. The same particles move at the same speeds, in a smaller box." }
  };

  const observations = [
    {before: "Press Start motion. Watch for an outlined dot when a particle hits a wall."},
    {before: "Keep the box the same size. Predict what happens to pressure when you warm the gas.",
     action: "Warm the gas", condition: "warm", after: "Look at the pressure bar. Compare it with the starting pressure."},
    {before: "The gas is back at its starting temperature. Predict what happens to pressure in a smaller box.",
     action: "Make the box smaller", condition: "small", after: "Watch the particles meet the walls. Have their speeds changed?"}
  ];
  let step = 0;
  let observed = false;
  let freeMode = false;

  const left = 16;
  const top = 12;
  const height = 126;
  const radius = 4.5;
  const particles = Array.from({ length: 14 }, (_, index) => {
    const angle = index * 2.4 + 0.3;
    const speed = 45 + (index * 17) % 51;
    return {
      x: left + 20 + (index * 71) % 298,
      y: top + 16 + (index * 31) % 96,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      hit: 0
    };
  });

  let condition = conditions.start;
  let frame = null;
  let previousTime = null;

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ecf6f3";
    context.fillRect(left, top, condition.width, height);
    context.strokeStyle = "#335b56";
    context.lineWidth = 3;
    context.strokeRect(left, top, condition.width, height);

    for (const particle of particles) {
      context.fillStyle = particle.hit > 0 ? "#ac4e14" : "#26786e";
      context.beginPath();
      context.arc(particle.x, particle.y, radius, 0, 2 * Math.PI);
      context.fill();
      if (particle.hit > 0) {
        context.lineWidth = 1.5;
        context.strokeStyle = "#51250e";
        context.stroke();
      }
    }

    context.fillStyle = "#24343b";
    context.font = "14px system-ui";
    context.fillText("Relative pressure", left, 162);
    context.fillStyle = "#d8e7e4";
    context.fillRect(left + 136, 151, 186, 12);
    context.fillStyle = "#26786e";
    context.fillRect(left + 136, 151, 93 * condition.pressure, 12);
  }

  function animate(time) {
    const elapsed = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    for (const particle of particles) {
      particle.x += particle.vx * condition.speed * elapsed;
      particle.y += particle.vy * condition.speed * elapsed;
      particle.hit = Math.max(0, particle.hit - elapsed);

      const minX = left + radius;
      const maxX = left + condition.width - radius;
      const minY = top + radius;
      const maxY = top + height - radius;
      if (particle.x < minX || particle.x > maxX) {
        particle.x = Math.max(minX, Math.min(maxX, particle.x));
        particle.vx *= -1;
        particle.hit = 0.13;
      }
      if (particle.y < minY || particle.y > maxY) {
        particle.y = Math.max(minY, Math.min(maxY, particle.y));
        particle.vy *= -1;
        particle.hit = 0.13;
      }
    }
    draw();
    frame = requestAnimationFrame(animate);
  }

  function selectCondition(id) {
    const setting = conditions[id];
    const widthRatio = (setting.width - 2 * radius) / (condition.width - 2 * radius);
    for (const particle of particles) {
      particle.x = left + radius + (particle.x - left - radius) * widthRatio;
      particle.hit = 0;
    }
    condition = setting;
    controls.forEach(control => { control.checked = control.value === id; });
    if (output.textContent !== setting.description) output.textContent = setting.description;
    draw();
  }

  function guideControls() {
    const observation = observations[step];
    const stepLabel = "Observation " + (step + 1) + " of " + observations.length;
    const stepPrompt = observed && observation.after ? observation.after : observation.before;
    if (label.textContent !== stepLabel) label.textContent = stepLabel;
    if (prompt.textContent !== stepPrompt) prompt.textContent = stepPrompt;
    change.textContent = observation.action || "";
    change.hidden = freeMode || step === 0 || observed;
    next.hidden = freeMode || !observed || step === observations.length - 1;
    back.hidden = freeMode || step === 0;
  }

  function goToStep(index) {
    step = index;
    if (step === 0) setMotion(false);
    observed = false;
    selectCondition("start");
    guideControls();
    (step === 0 ? toggle : change).focus();
  }

  controls.forEach(control => {
    control.addEventListener("change", () => selectCondition(control.value));
  });
  next.addEventListener("click", () => goToStep(step + 1));
  back.addEventListener("click", () => goToStep(step - 1));
  change.addEventListener("click", () => {
    selectCondition(observations[step].condition);
    observed = true;
    guideControls();
    (next.hidden ? toggle : next).focus();
  });
  free.addEventListener("click", () => {
    freeMode = !freeMode;
    guide.hidden = freeMode;
    controls[0].closest("fieldset").hidden = !freeMode;
    free.textContent = freeMode ? "Follow the observations" : "Explore freely";
    if (freeMode) {
      guide.querySelector("listen-to").stop?.();
      guideControls();
    } else goToStep(0);
  });

  function setMotion(running) {
    if (running) frame = requestAnimationFrame(animate);
    else if (frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
      previousTime = null;
    }
    toggle.textContent = running ? "Pause motion" : "Start motion";
  }

  toggle.addEventListener("click", () => {
    setMotion(frame === null);
    if (frame !== null && !freeMode && step === 0 && !observed) {
      observed = true;
      guideControls();
    }
  });

  selectCondition("start");
  model.hidden = false;
})();

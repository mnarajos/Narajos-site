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
  const sound = model.querySelector("[data-gas-sound]");
  const soundNote = model.querySelector("#gas-sound-note");
  const Audio = window.AudioContext || window.webkitAudioContext;
  const guide = model.querySelector(".gas-guide");
  const label = model.querySelector("[data-gas-step]");
  const prompt = model.querySelector("[data-gas-prompt]");
  const output = model.querySelector("#gas-result");
  const particleCount = model.querySelector("#gas-particle-count");
  const particleReading = model.querySelector("[data-gas-particles]");
  const volumeReading = model.querySelector("[data-gas-volume]");
  const pressureReading = model.querySelector("[data-gas-pressure-value]");
  const pressureMeter = model.querySelector("#gas-pressure-meter");
  const comparePanel = model.querySelector(".gas-compare");
  const compareButton = model.querySelector("[data-gas-compare]");
  const compareStatus = model.querySelector("[data-gas-compare-status]");
  const compareResults = model.querySelector("[data-gas-compare-results]");
  const compareStart = model.querySelector('[data-gas-compare-count="start"]');
  const compareSmall = model.querySelector('[data-gas-compare-count="small"]');
  const countDetails = model.querySelector(".gas-count");
  const countStatus = model.querySelector("[data-gas-count-status]");
  const counts = Object.fromEntries(
    Array.from(model.querySelectorAll("[data-gas-total]"), el => [el.dataset.gasTotal, el])
  );
  const conditions = {
    start: { width: 336, speed: 1, pressure: 1, description: "Starting pressure. The particles bounce off the walls." },
    warm: { width: 336, speed: Math.sqrt(1.8), pressure: 1.8, description: "Higher pressure. The same particles move faster. The box stays the same size." },
    small: { width: 168, speed: 1, pressure: 2, description: "Higher pressure. The same particles move at the same speeds, in a smaller box." }
  };

  const observations = [
    {before: "Press Start motion. Watch for an outlined dot when a particle hits a wall."},
    {before: "Keep the box the same size. Predict what happens to pressure when you warm the gas.",
     action: "Warm the gas", condition: "warm", after: "Look at the pressure bar. Compare it with the starting pressure."},
    {before: "The gas is back at its starting temperature. Predict what happens to pressure in a smaller box.",
     action: "Make the box smaller", condition: "small", after: "Compare box sizes. Watch how often particles hit the moving wall."}
  ];
  let step = 0;
  let observed = false;
  let freeMode = false;

  const left = 16;
  const top = 12;
  const height = 126;
  const radius = 4.5;
  function makeParticles(number, width) {
    return Array.from({ length: number }, (_, index) => {
      const angle = index * 2.4 + 0.3;
      const speed = 50 + (index % 7) * 7;
      return {
        x: left + radius + (((index * 71 + 20) % 301) / 301) * (width - 2 * radius),
        y: top + 16 + (index * 31) % 96,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        hit: 0
      };
    });
  }

  const defaultCount = Number(particleCount.value);
  let particles = makeParticles(defaultCount, conditions.start.width);
  let comparison = null;

  let condition = conditions.start;
  let conditionId = "start";
  const sampleDuration = 5;
  let sampleTime = 0, sampleHits = 0;
  let frame = null;
  let previousTime = null;

  let audio, clickBuffer, volume;
  let soundOn = false;
  function hitWall(isRightWall = false) {
    if (comparison) {
      if (!isRightWall) return;
      comparison.hits++;
    } else {
      sampleHits++;
    }
    if (!soundOn || audio?.state !== "running") return;
    const click = audio.createBufferSource();
    click.buffer = clickBuffer;
    click.connect(volume);
    click.start();
  }

  if (Audio) {
    sound.hidden = false;
    sound.addEventListener("click", async () => {
      soundOn = !soundOn;
      sound.setAttribute("aria-pressed", String(soundOn));
      soundNote.hidden = !soundOn;
      soundNote.textContent = "Each click is a wall collision. Listen for how often the clicks happen.";
      try {
        if (!audio) {
          audio = new Audio();
          clickBuffer = audio.createBuffer(1, Math.ceil(audio.sampleRate * 0.024), audio.sampleRate);
          const samples = clickBuffer.getChannelData(0);
          for (let i = 0; i < samples.length; i++) {
            const seconds = i / audio.sampleRate;
            samples[i] = Math.sin(2 * Math.PI * 265 * seconds) * Math.exp(-180 * seconds);
          }
          volume = audio.createGain();
          volume.gain.value = 0.05;
          volume.connect(audio.destination);
        }
        if (soundOn && audio.state !== "running") await audio.resume();
      } catch (_) {
        soundOn = false;
        sound.setAttribute("aria-pressed", "false");
        soundNote.hidden = false;
        soundNote.textContent = "Collision sound is unavailable on this device.";
      }
    });
  }

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

    if (comparison) {
      const wall = left + condition.width;
      context.beginPath();
      context.moveTo(wall, top);
      context.lineTo(wall, top + height);
      context.strokeStyle = "#6f3917";
      context.lineWidth = 4;
      context.stroke();
    }
  }

  function moveParticles(elapsed) {
    for (const particle of particles) {
      particle.x += particle.vx * condition.speed * elapsed;
      particle.y += particle.vy * condition.speed * elapsed;
      particle.hit = Math.max(0, particle.hit - elapsed);

      const minX = left + radius;
      const maxX = left + condition.width - radius;
      const minY = top + radius;
      const maxY = top + height - radius;
      if (particle.x < minX || particle.x > maxX) {
        const rightWall = particle.x > maxX;
        particle.x = rightWall ? 2 * maxX - particle.x : 2 * minX - particle.x;
        particle.vx *= -1;
        particle.hit = 0.13;
        hitWall(rightWall);
      }
      if (particle.y < minY || particle.y > maxY) {
        particle.y = particle.y > maxY ? 2 * maxY - particle.y : 2 * minY - particle.y;
        particle.vy *= -1;
        particle.hit = 0.13;
        hitWall();
      }
    }
  }

  function animate(time) {
    let elapsed = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    if (comparison) {
      updateComparison(elapsed);
      return;
    }
    const remaining = sampleDuration - sampleTime;
    if (elapsed >= remaining) {
      moveParticles(remaining);
      counts[conditionId].textContent = sampleHits;
      if (countDetails.open) {
        const setting = counts[conditionId].previousElementSibling.textContent;
        countStatus.textContent = setting + " · " + sampleHits + " wall collisions in 5 seconds.";
      }
      elapsed -= remaining;
      sampleTime = 0;
      sampleHits = 0;
    }
    moveParticles(elapsed);
    sampleTime += elapsed;
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
    if (conditionId !== id) {
      sampleTime = 0;
      sampleHits = 0;
      countStatus.textContent = "";
    }
    conditionId = id;
    condition = setting;
    controls.forEach(control => { control.checked = control.value === id; });
    updateReadings();
    draw();
  }

  function updateReadings() {
    particleReading.textContent = particles.length;
    volumeReading.textContent = Math.round(condition.width / conditions.start.width * 100) + "%";
    const pressure = condition.pressure * particles.length / defaultCount;
    pressureReading.textContent = pressure.toFixed(1) + "×";
    pressureMeter.value = pressure;
    // The default descriptions compare like-for-like particle counts. After a
    // count change, report the current conditions instead of calling a 2×
    // reading the starting pressure (or a 0.9× reading simply "higher").
    const description = particles.length === defaultCount ? condition.description :
      `${particles.length} particles in the ${conditionId === "warm" ? "warmer" : conditionId === "small" ? "smaller" : "starting"} box. Relative pressure is ${pressure.toFixed(1)} times the starting ${defaultCount}-particle box.`;
    if (output.textContent !== description) output.textContent = description;
  }

  function startComparison() {
    const wasRunning = frame !== null;
    setMotion(false);
    comparison = { previousId: conditionId, previousParticles: particles, wasRunning, time: 0, hits: 0 };
    compareStart.textContent = "—";
    compareSmall.textContent = "—";
    compareResults.hidden = false;
    compareButton.textContent = "Stop comparison";
    setComparisonControls(true);
    showComparisonBox("start", "Starting box · Counting hits on the right wall.");
    setMotion(true);
  }

  function showComparisonBox(id, status) {
    particles = makeParticles(comparison.previousParticles.length, condition.width);
    selectCondition(id);
    compareStatus.textContent = status;
  }

  function setComparisonControls(disabled) {
    for (const control of [...controls, particleCount, toggle, change, next, back, free]) {
      control.disabled = disabled;
    }
  }

  function updateComparison(elapsed) {
    if (comparison.gap > 0) {
      comparison.gap -= elapsed;
      if (comparison.gap <= 0) showComparisonBox("small", "Half the volume · Counting hits on the same wall.");
      frame = requestAnimationFrame(animate);
      return;
    }
    const remaining = sampleDuration - comparison.time;
    moveParticles(Math.min(elapsed, remaining));
    comparison.time += elapsed;
    if (comparison.time >= sampleDuration) {
      if (conditionId === "small") {
        compareSmall.textContent = comparison.hits;
        finishComparison("Compare the two counts. These are hits on the right wall in 5 seconds.");
        return;
      }
      compareStart.textContent = comparison.hits;
      comparison.time = 0;
      comparison.hits = 0;
      comparison.gap = 0.7;
      compareStatus.textContent = "Now listen or watch as the box gets smaller.";
    }
    draw();
    frame = requestAnimationFrame(animate);
  }

  function finishComparison(message) {
    setMotion(false);
    const { previousId, previousParticles, wasRunning } = comparison;
    comparison = null;
    selectCondition(previousId);
    particles = previousParticles;
    draw();
    compareStatus.textContent = message;
    compareButton.textContent = "Compare box sizes";
    setComparisonControls(false);
    if (wasRunning) setMotion(true);
  }

  compareButton.addEventListener("click", () => {
    if (comparison) {
      compareResults.hidden = true;
      finishComparison("Comparison stopped.");
    } else {
      startComparison();
    }
  });

  particleCount.addEventListener("change", () => {
    particles = makeParticles(Number(particleCount.value), condition.width);
    sampleTime = 0;
    sampleHits = 0;
    for (const count of Object.values(counts)) count.textContent = "—";
    countStatus.textContent = "";
    compareResults.hidden = true;
    compareStatus.textContent = "";
    updateReadings();
    draw();
  });

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
    comparePanel.hidden = !freeMode && !(step === 2 && observed);
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
    (next.hidden ? compareButton : next).focus();
  });
  free.addEventListener("click", () => {
    freeMode = !freeMode;
    guide.hidden = freeMode;
    controls[0].closest("fieldset").hidden = !freeMode;
    free.textContent = freeMode ? "Follow the observations" : "Explore freely";
    if (freeMode) guideControls();
    else {
      particleCount.value = defaultCount;
      particleCount.dispatchEvent(new Event("change"));
      goToStep(0);
    }
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

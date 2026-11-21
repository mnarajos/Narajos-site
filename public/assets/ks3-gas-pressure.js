(function () {
  "use strict";

  const model = document.querySelector("[data-gas-pressure]");
  const canvas = model.querySelector("canvas");
  const context = canvas.getContext("2d");
  if (!context) return;

  const controls = model.querySelectorAll('input[name="gas-condition"]');
  const toggle = model.querySelector("button");
  const output = model.querySelector("[role=status]");
  const conditions = {
    start: { width: 336, speed: 1, pressure: 1, description: "Starting pressure. The particles bounce off the walls." },
    warm: { width: 336, speed: Math.sqrt(1.8), pressure: 1.8, description: "Higher pressure. The same particles move faster. The box stays the same size." },
    small: { width: 210, speed: 1, pressure: 1.6, description: "Higher pressure. The same particles move at the same speeds, in a smaller box." }
  };

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

  for (const control of controls) {
    control.addEventListener("change", () => {
      const next = conditions[control.value];
      const widthRatio = (next.width - 2 * radius) / (condition.width - 2 * radius);
      for (const particle of particles) {
        particle.x = left + radius + (particle.x - left - radius) * widthRatio;
        particle.hit = 0;
      }
      condition = next;
      output.textContent = condition.description;
      draw();
    });
  }

  toggle.addEventListener("click", () => {
    if (frame === null) {
      frame = requestAnimationFrame(animate);
      toggle.textContent = "Pause motion";
    } else {
      cancelAnimationFrame(frame);
      frame = null;
      previousTime = null;
      toggle.textContent = "Start motion";
    }
  });

  const startingControl = Array.from(controls).find((control) => control.checked);
  if (startingControl.value === "start") draw();
  else startingControl.dispatchEvent(new Event("change"));
  model.hidden = false;
})();

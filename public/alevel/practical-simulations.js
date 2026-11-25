(function () {
  "use strict";

  const practicals = window.ALevelPracticals;
  const conditions = {
    humidity: ["Drier air", "More humid air"],
    light: ["Brighter light", "Lower light"],
    equal: ["Equal conditions", "Equal conditions"]
  };
  const chamber = { width: 200, height: 100, maximumTime: 24 };
  const field = [
    [0, 0, 2, 3, 5, 6, 4, 3],
    [0, 1, 3, 1, 4, 8, 8, 7],
    [1, 2, 0, 4, 6, 9, 7, 6],
    [1, 0, 1, 6, 3, 5, 2, 6],
    [0, 2, 5, 6, 6, 7, 9, 5],
    [1, 0, 2, 1, 3, 5, 7, 4]
  ];
  const fieldArea = field.length * field[0].length;
  const fieldTotal = field.flat().reduce((sum, count) => sum + count, 0);

  function generator(seed) {
    return function () {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }

  function reflect(position, limit) {
    if (position < 0) return -position;
    return position > limit ? 2 * limit - position : position;
  }

  function side(x) {
    return x < chamber.width / 2 ? 0 : 1;
  }

  function mountChoiceChamber(host, ui) {
    host.innerHTML = `
      <div class="rp-card">
        <h2>Follow an animal’s track</h2>
        <p>A <strong>choice chamber</strong> lets animals move between conditions. Record where they are at fixed intervals, and follow individuals to see how they move.</p>
        <details>
          <summary>How the chamber is set up</summary>
          <figure class="rp-diagram rp-chamber-setup">
            <svg viewBox="0 0 320 118" role="img" aria-label="Side view of a choice chamber. Animals enter through the middle of the lid and walk on a dry gauze floor. Drier and more humid air are produced below the gauze in separate base compartments.">
              <g fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 29H148m24 0h126v74H22V29M160 103V75"/>
                <path d="M22 74h276" stroke-dasharray="3 3"/>
                <path d="M160 13v38m-5-5 5 5 5-5"/>
                <path d="M123 66q6-12 12 0zM197 66q6-12 12 0z" fill="currentColor"/>
              </g>
              <g text-anchor="middle" font-size="12" fill="currentColor">
                <text x="160" y="11">Central release hole</text>
                <text x="251" y="63">Dry gauze</text>
                <text x="91" y="94">Drying agent</text>
                <text x="229" y="94">Damp cotton wool</text>
              </g>
            </svg>
            <figcaption>Original side-view schematic. The dry gauze separates the animals from the materials that set humidity. To compare light, shade one side with an opaque cover and keep the humidity and temperature the same on both sides.</figcaption>
          </figure>
        </details>
        <details>
          <summary>Worked example. Read two tracks</summary>
          <p>In three equal intervals, animal A moves 2 units left, 2 right and 2 left. Animal B moves 6 left, 6 right and 6 left. They show the same mix of directions, but B moves three times as far per interval. A difference in distance per interval is evidence about speed.</p>
        </details>
        <div class="rp-sim-options">
          <label>Compare conditions
            <select data-condition><option value="humidity">Humidity contrast</option><option value="light">Light contrast</option><option value="equal">Equal conditions</option></select>
          </label>
          <label>Highlight a track
            <select data-animal>${Array.from({ length: 12 }, (_, i) => `<option value="${i}">Animal ${i + 1}</option>`).join("")}</select>
          </label>
        </div>
        <figure class="rp-diagram rp-chamber">
          <svg viewBox="0 0 320 184" role="img" aria-label="Top-view model of the choice chamber. A dotted line separates the two conditions. A line traces the selected animal. The same movement evidence is in the observation table and track coordinates below.">
            <rect x="22" y="25" width="138" height="138" class="rp-chamber-left"/>
            <rect x="160" y="25" width="138" height="138" class="rp-chamber-right"/>
            <rect x="22" y="25" width="276" height="138" fill="none" stroke="currentColor"/>
            <line x1="160" y1="25" x2="160" y2="163" stroke="currentColor" stroke-dasharray="4 4"/>
            <g text-anchor="middle" font-size="13" fill="currentColor">
              <text x="91" y="16" data-left></text><text x="229" y="16" data-right></text>
              <text x="160" y="180">Central release line</text>
            </g>
            <g data-positions></g>
          </svg>
          <figcaption>Illustrative model. The line joins successive positions of the selected animal. All animals start near the middle.</figcaption>
        </figure>
        <div class="actions rp-sim-actions">
          <button type="button" class="btn primary" data-step>Advance 4 intervals</button>
          <button type="button" class="btn" data-play>Play</button>
          <button type="button" class="btn" data-reset>Reset same group</button>
          <button type="button" class="btn" data-new>New group</button>
        </div>
        <p data-time></p>
        <p class="sr-only" role="status" data-announcement></p>
        <p>Advance both the humidity and light trials at least eight intervals. Then use their recorded movement to compare the responses.</p>
        <table class="rp-table">
          <thead><tr><th scope="col">Observation</th><th scope="col" data-left></th><th scope="col" data-right></th></tr></thead>
          <tbody data-summary></tbody>
        </table>
        <details>
          <summary>Track coordinates and model assumptions</summary>
          <p data-track></p>
          <p>Coordinates are in model units from the top left. The horizontal coordinate increases to the right. The movement table groups intervals by the side where each interval started.</p>
          <p>The humidity comparison changes speed only. Every direction has the same chance at the start of each interval. The light comparison keeps speed the same and gives directions away from the bright side an extra chance. In equal conditions neither side changes speed or direction. The walls reflect movement. These rules illustrate possible responses of animals.</p>
          <p>Temperature stays equal throughout. Light is held equal in the humidity comparison and humidity is held equal in the light comparison. Resetting or changing conditions reuses the same starting group and random sequence. A new group models another trial. In a real practical, successive observations of the same animals belong to one trial. An independent repeat uses a new group under the same conditions.</p>
        </details>
      </div>
      <div class="rp-card" data-supported hidden>
        <h2>Explain the movement evidence</h2>
        <table class="rp-table">
          <thead><tr><th scope="col">Trial (interval)</th><th scope="col">Distance per interval, left / right</th><th scope="col">Rightward intervals (%)</th></tr></thead>
          <tbody data-comparison></tbody>
        </table>
      </div>
      <div class="rp-card" data-independent hidden><h2>Apply the distinction</h2></div>`;

    const query = selector => host.querySelector(selector);
    const condition = query("[data-condition]");
    const animal = query("[data-animal]");
    const playButton = query("[data-play]");
    const stepButton = query("[data-step]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animals;
    let readings;
    let random;
    let timer;
    let time;
    let seed = 30419;

    const supported = query("[data-supported]");
    let supportedChoice;
    const snapshots = new Map();
    const observe = () => {
      if (time >= 8) {
        const rightward = readings[0].rightward + readings[1].rightward;
        const percent = Math.round(100 * rightward / (time * animals.length));
        snapshots.set(condition.value, { time, percent, distances: readings.map(meanDistance) });
      }
      if (snapshots.has("humidity") && snapshots.has("light") && !supportedChoice) {
        supportedChoice = ui.choice(supported, {
          prompt: "Compare the movement rows from the humidity and light trials. Which feature distinguishes the two responses?",
          options: [
            "Both groups can have more animals on one side at the end.",
            "Movements differ in speed between humidity conditions, and in direction in the light comparison.",
            "Each interval uses a new group of animals."
          ],
          correct: 1,
          feedback: [
            "Counting where animals end up can show accumulation. Use the distance and direction rows to identify the mechanism.",
            "Distance per interval indicates speed. Directional bias away from bright light indicates taxis. Accumulation can result from either response.",
            "The same animals are tracked across the intervals. Select New group for a separate simulated trial."
          ],
          hint: "Compare distance per interval and the proportion of rightward movements.",
          independent: false
        });
        supported.hidden = false;
        query("[data-independent]").hidden = false;
      }
      if (supportedChoice) {
        query("[data-comparison]").innerHTML = [["humidity", "Humidity"], ["light", "Light"], ["equal", "Equal conditions"]]
          .filter(([key]) => snapshots.has(key)).map(([key, label]) => {
            const trial = snapshots.get(key);
            return `<tr><th scope="row">${label} (${trial.time})</th><td>${trial.distances.join(" / ")}</td><td>${trial.percent}</td></tr>`;
          }).join("");
      }
    };

    const independent = query("[data-independent]");
    ui.choice(independent, {
      prompt: "In another investigation with a lamp on the right, animals move the same distance per interval on both sides. At the middle line, 31 of their first 40 steps go left. Which interpretation fits this evidence?",
      options: [
        "They show evidence of negative phototaxis because initial movement is biased away from the lamp.",
        "They show evidence of kinesis because they move faster on the left.",
        "Only their final distribution could distinguish the two responses."
      ],
      correct: 0,
      feedback: [
        "The directional bias is away from the light, consistent with negative phototaxis. Here speed was similar on both sides.",
        "The distances per interval are equal, so there is no speed difference here. The direction of the initial steps is the evidence for taxis.",
        "The initial step directions help distinguish the mechanisms. Final distribution alone can result from either."
      ],
      independent: true
    });
    ui.stretch(independent, "How could you rule out a preference for the left side of the chamber?", "Swap the lamp to the other side and repeat with fresh groups. Include a trial with equal light on both sides. A leftward bias that reverses when the lamp moves provides stronger evidence of a response to light.");

    function meanDistance({ intervals, distance }) {
      return intervals ? (distance / intervals).toFixed(1) : "—";
    }

    function draw() {
      const labels = conditions[condition.value];
      host.querySelectorAll("[data-left]").forEach(el => { el.textContent = labels[0]; });
      host.querySelectorAll("[data-right]").forEach(el => { el.textContent = labels[1]; });
      const selected = Number(animal.value);
      const track = animals[selected];
      const display = ([x, y]) => [22 + x * 1.38, 25 + y * 1.38];
      const line = track.map(point => display(point).join(",")).join(" ");
      query("[data-positions]").innerHTML = `
        <polyline points="${line}" fill="none" stroke="currentColor" stroke-width="2"/>
        ${animals.map((path, i) => {
          const [x, y] = display(path.at(-1));
          return i === selected
            ? `<circle cx="${x}" cy="${y}" r="5" fill="white" stroke="currentColor" stroke-width="2"/>`
            : `<circle cx="${x}" cy="${y}" r="3" class="rp-animal-dot"/>`;
        }).join("")}`;
      const left = animals.filter(track => side(track.at(-1)[0]) === 0).length;
      function directions({ intervals, rightward }) {
        return intervals ? `${rightward} of ${intervals}` : "—";
      }
      query("[data-summary]").innerHTML = `
        <tr><th scope="row">Animals here now</th><td>${left}</td><td>${animals.length - left}</td></tr>
        <tr><th scope="row">Mean distance per interval (model units)</th><td>${meanDistance(readings[0])}</td><td>${meanDistance(readings[1])}</td></tr>
        <tr><th scope="row">Intervals moving right</th><td>${directions(readings[0])}</td><td>${directions(readings[1])}</td></tr>`;
      query("[data-track]").textContent = `Animal ${selected + 1}, from interval 0 to ${time}: ${track.map(([x, y]) => `(${Math.round(x)}, ${Math.round(y)})`).join(" → ")}.`;
      query("[data-time]").textContent = `Interval ${time} of ${chamber.maximumTime}.`;
      const finished = time === chamber.maximumTime;
      stepButton.disabled = finished;
      playButton.disabled = finished;
      observe();
    }

    function announce() {
      query("[data-announcement]").textContent = query("[data-time]").textContent;
    }

    function step(count) {
      const end = Math.min(time + count, chamber.maximumTime);
      while (time < end) {
        animals.forEach(track => {
          const [x, y] = track.at(-1);
          const startSide = side(x);
          const angle = random() * 2 * Math.PI;
          const direction = random();
          const heading = condition.value === "light" && direction < 0.65 ? (angle - Math.PI) / 3 : angle;
          const speed = condition.value === "humidity" ? [12, 3][startSide] : 7;
          const newX = reflect(x + speed * Math.cos(heading), chamber.width);
          const newY = reflect(y + speed * Math.sin(heading), chamber.height);
          track.push([newX, newY]);
          readings[startSide].intervals++;
          readings[startSide].distance += speed;
          readings[startSide].rightward += Number(newX > x);
        });
        time++;
      }
      if (time === chamber.maximumTime) stop();
      draw();
      if (!timer) announce();
    }

    function stop() {
      window.clearInterval(timer);
      timer = null;
      playButton.textContent = reducedMotion.matches ? "Run to end" : "Play";
    }

    function reset() {
      stop();
      time = 0;
      random = generator(seed);
      animals = Array.from({ length: 12 }, () => [[96 + 8 * random(), 26 + 48 * random()]]);
      readings = Array.from({ length: 2 }, () => ({ intervals: 0, distance: 0, rightward: 0 }));
      draw();
      announce();
    }

    stepButton.addEventListener("click", () => {
      stop();
      step(4);
    });
    playButton.addEventListener("click", () => {
      if (reducedMotion.matches) {
        step(chamber.maximumTime - time);
        return;
      }
      if (timer) {
        stop();
        announce();
        return;
      }
      playButton.textContent = "Pause";
      timer = window.setInterval(() => {
        if (!host.isConnected) {
          stop();
          return;
        }
        step(1);
      }, 400);
    });
    condition.addEventListener("change", reset);
    animal.addEventListener("change", draw);
    query("[data-reset]").addEventListener("click", reset);
    query("[data-new]").addEventListener("click", () => {
      seed += 104729;
      snapshots.clear();
      supportedChoice?.remove();
      supportedChoice = null;
      supported.hidden = true;
      reset();
    });
    reducedMotion.addEventListener("change", stop);
    reset();
    return () => {
      stop();
      reducedMotion.removeEventListener("change", stop);
    };
  }

  function mountField(host, ui) {
    host.innerHTML = `
      <div class="rp-card">
        <h2>Sample a meadow from the path</h2>
        <p>Does common daisy abundance vary with soil moisture? The meadow map shows a moisture gradient from the path. Place a <strong>quadrat</strong> (a sampling frame) to count daisies rooted in its 1 m² square and record soil moisture there.</p>
        <details>
          <summary>Worked example. Estimate density</summary>
          <p>Two 1 m² quadrats contain 2 and 4 daisies. The estimated density is (2 + 4) ÷ 2 = 3 daisies per m². Across a 60 m² area, that density would predict 180 daisies if the sample represented the area.</p>
        </details>
        <div class="rp-sim-options">
          <label>Sampling method
            <select data-method>
              <option value="random">Random coordinates</option>
              <option value="transect">Systematic transect</option>
              <option value="chosen">Choose coordinates</option>
            </select>
          </label>
          <div data-row-choice hidden>
            <label for="rp-field-row">Row</label>
            <select id="rp-field-row" data-row>${field.map((_, y) => `<option value="${y}">${y + 1}</option>`).join("")}</select>
          </div>
          <div data-column-choice hidden>
            <label for="rp-field-column">Column</label>
            <select id="rp-field-column" data-column>${field[0].map((_, x) => `<option value="${x}">${"ABCDEFGH"[x]}</option>`).join("")}</select>
          </div>
        </div>
        <p data-method-note></p>
        <figure class="rp-diagram rp-field">
          <svg viewBox="0 0 344 216" role="img" aria-label="A meadow map of 48 one-square-metre quadrats. The path borders column A. Soil is generally drier near the path and wetter farther away. The table below gives observations for each sampled square.">
            <defs><pattern id="rp-field-path" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 6 6 0" stroke="#6c6558" stroke-width="1"/></pattern></defs>
            <rect x="35" y="36" width="20" height="156" fill="url(#rp-field-path)"/>
            <g font-size="11" text-anchor="middle" fill="currentColor">
              <text x="60" y="18" text-anchor="start">Drier</text><text x="329" y="18" text-anchor="end">Wetter</text>
              <text x="22" y="110" transform="rotate(-90 22 110)">Path edge</text>
              <text x="196" y="210">Columns are 1 m wide</text>
              ${field[0].map((_, x) => `<text x="${76 + x * 34}" y="31">${"ABCDEFGH"[x]}</text>`).join("")}
              ${field.map((_, y) => `<text x="47" y="${52 + y * 26}" class="rp-field-row">${y + 1}</text>`).join("")}
            </g>
            <g data-grid></g>
          </svg>
          <figcaption>Simulated field. Numbers in sampled squares are daisy counts. The distance from the path is measured to the centre of each quadrat.</figcaption>
        </figure>
        <div class="actions rp-sim-actions">
          <button type="button" class="btn primary" data-sample>Sample quadrat</button>
          <button type="button" class="btn" data-reset>Clear sample</button>
          <button type="button" class="btn" data-reveal disabled>Reveal whole field</button>
        </div>
        <p role="status" data-status>Collect your first observation.</p>
        <p data-density></p>
        <p data-field-total hidden></p>
        <table class="rp-table" data-observations hidden>
          <thead><tr><th scope="col">Square</th><th scope="col">From path (m)</th><th scope="col">Soil moisture (%)</th><th scope="col">Daisies</th></tr></thead>
          <tbody></tbody>
        </table>
        <details>
          <summary>Sampling rule and what counts as a repeat</summary>
          <p>Count plants rooted inside the frame. Include the top and left edges and the top-left corner. Exclude the bottom and right edges and the other three corners so neighbouring squares share no plants. This model stores one count per square. Soil moisture is water as a percentage of soil volume.</p>
          <p>One quadrat is one sampling unit. Counting the same quadrat again checks the reading. A second transect in the same meadow samples more of that meadow; it gives no independent replicate of the site. To test how widely the pattern applies, sample several comparable meadows.</p>
        </details>
      </div>
      <div class="rp-card" data-supported hidden><h2>Use your observations</h2><p data-reading-comparison></p></div>
      <div class="rp-card" data-independent hidden><h2>Apply your method to a new site</h2></div>`;

    const query = selector => host.querySelector(selector);
    const method = query("[data-method]");
    const sampleButton = query("[data-sample]");
    const revealButton = query("[data-reveal]");
    const table = query("[data-observations]");
    const row = query("[data-row]");
    const column = query("[data-column]");
    const labels = {
      random: "Draw coordinate pairs from across the meadow without replacing sampled squares. This gives each quadrat an equal chance of selection and supports a field-wide density estimate.",
      transect: "Choose a row for a transect. Sample the next quadrat every metre along the line away from the path. This measures change along a gradient.",
      chosen: "Select any coordinates. Try taking all your measurements near the path, then compare the result with the whole field."
    };
    let sampled = [];
    let revealed = false;
    let supportedChoice;
    const supported = query("[data-supported]");
    let sampledRow = null;

    function observations(x, y) {
      const moisture = [12, 15, 16, 19, 22, 23, 26, 27][x] + [-1, 1, 0, -1, 2, 0][y];
      return { x, y, name: "ABCDEFGH"[x] + (y + 1), distance: x + 0.5, moisture, count: field[y][x] };
    }

    function draw() {
      const counts = new Map(sampled.map(({ name, count }) => [name, count]));
      query("[data-grid]").innerHTML = field.map((line, y) => line.map((count, x) => {
        const { name } = observations(x, y);
        const left = 59 + x * 34;
        const top = 36 + y * 26;
        const recorded = counts.has(name);
        const show = revealed || recorded;
        const shade = 97 - x * 3;
        return `<rect x="${left}" y="${top}" width="34" height="26" fill="hsl(155 25% ${shade}%)" stroke="#456756" stroke-width="${recorded ? 2 : 0.5}"/>` +
          (show ? `<text x="${left + 17}" y="${top + 17}" text-anchor="middle" font-size="12" fill="#193c30">${count}</text>` : "");
      }).join("")).join("");
      table.hidden = sampled.length === 0;
      table.tBodies[0].innerHTML = sampled.map(({ name, distance, moisture, count }) =>
        `<tr><th scope="row">${name}</th><td>${distance}</td><td>${moisture}</td><td>${count}</td></tr>`).join("");
      const mean = sampled.length && sampled.reduce((sum, reading) => sum + reading.count, 0) / sampled.length;
      const isTransect = method.value === "transect";
      query("[data-density]").textContent = sampled.length
        ? `${sampled.length} quadrats sampled. ${isTransect ? "Along this transect" : "In your sample"}, the mean is ${mean.toFixed(1)} daisies per m².`
        : "";
      const total = query("[data-field-total]");
      total.hidden = !revealed;
      total.textContent = isTransect
        ? `The model contains ${fieldTotal} daisies in ${fieldArea} m², or ${(fieldTotal / fieldArea).toFixed(1)} per m². Your transect measures change along one line. Other rows may show a different pattern.`
        : `Extrapolating your sample to ${fieldArea} m² gives about ${Math.round(mean * fieldArea)} daisies. The whole model contains ${fieldTotal} daisies, or ${(fieldTotal / fieldArea).toFixed(1)} per m². Compare your estimate with that count. Sample location and chance can both affect the result.`;
      query("[data-row-choice]").hidden = method.value === "random";
      query("[data-column-choice]").hidden = method.value !== "chosen";
      query("[data-method-note]").textContent = labels[method.value];
      row.disabled = isTransect && sampled.length > 0;
      sampleButton.disabled = revealed || sampled.length >= (isTransect ? field[0].length : 12);
      revealButton.disabled = revealed || sampled.length < 4;
      if (sampled.length >= 4 && !supportedChoice) {
        supportedChoice = showSupported();
        supported.hidden = false;
        query("[data-independent]").hidden = false;
      }
      const comparison = query("[data-reading-comparison]");
      if (sampled.length >= 2) {
        const sorted = [...sampled].sort((a, b) => a.distance - b.distance || a.moisture - b.moisture);
        const [near, far] = [sorted[0], sorted.at(-1)];
        comparison.textContent = near.distance === far.distance
          ? `Your samples are all ${near.distance} m from the path. Sample another distance to compare counts along the gradient.`
          : `Compare ${near.name} and ${far.name} from your sample. They contain ${near.count} and ${far.count} daisies, with soil moisture of ${near.moisture}% and ${far.moisture}%. Check whether the other quadrats show a similar pattern.`;
      } else {
        comparison.textContent = "Collect quadrats at different distances to compare counts along the gradient.";
      }
    }

    function clearSample() {
      sampled = [];
      sampledRow = null;
      revealed = false;
      supportedChoice?.remove();
      supportedChoice = null;
      supported.hidden = true;
      query("[data-status]").textContent = "Collect your first observation.";
      draw();
    }

    function sample() {
      const isTransect = method.value === "transect";
      let x = Number(column.value);
      let y = Number(row.value);
      if (isTransect) {
        sampledRow ??= y;
        y = sampledRow;
        x = sampled.length;
      } else if (method.value === "random") {
        const options = field.flatMap((line, rowIndex) => line.map((_, columnIndex) => observations(columnIndex, rowIndex)))
          .filter(candidate => !sampled.some(reading => reading.name === candidate.name));
        ({ x, y } = options[Math.floor(Math.random() * options.length)]);
      }
      const reading = observations(x, y);
      const status = query("[data-status]");
      if (sampled.some(previous => previous.name === reading.name)) {
        status.textContent = `${reading.name} is already recorded. Choose another square for a new sampling unit.`;
        return;
      }
      sampled.push(reading);
      const limit = isTransect ? field[0].length : 12;
      const next = sampled.length === limit ? " Sample complete." : "";
      status.textContent = `${reading.name}: ${reading.count} daisies at ${reading.moisture}% soil moisture.${next}`;
      draw();
    }

    function showSupported() {
      return ui.choice(supported, {
        prompt: "A group sampling this meadow finds more daisies at wetter positions. Which conclusion is justified?",
        options: [
          "A second moisture reading from each quadrat would show that moisture caused the difference.",
          "The quadrats suggest an association. Trampling near the path could also explain some of the difference.",
          "An association proves the sample represents every meadow."
        ],
        correct: 1,
        feedback: [
          "Reading the same point again checks the measurement. It leaves the possible effects of other variables unresolved.",
          "Moisture and daisy counts may vary together. Trampling or another variable could also change with distance from the path.",
          "The observations apply to the sampled locations. Wider claims need data from other sites and consideration of other variables."
        ],
        hint: "In an observational study, the investigator measures the environmental variable in place.",
        independent: false
      });
    }
    const independent = query("[data-independent]");
    ui.choice(independent, {
      prompt: "A student wants to compare daisy counts every metre from the edge of a pond into a meadow. Which design best answers that question?",
      options: [
        "Sample squares with the most visible daisies.",
        "Choose random squares across the meadow without recording their distance.",
        "Place 1 m² quadrats at 1 m intervals along a line perpendicular to the edge."
      ],
      correct: 2,
      feedback: [
        "Picking places with visible daisies favours high counts and can miss parts of the gradient.",
        "Random quadrats can estimate the field mean. Without recording distance, they cannot describe change away from the pond.",
        "Regular spacing gives direct evidence of how abundance changes with distance from the pond. More transects would sample more of the meadow."
      ],
      independent: true
    });
    ui.stretch(independent, "Why compare more than one meadow?", "More quadrats in one meadow improve coverage of that site. Several meadows with comparable transects provide independently sampled sites. Record other variables like soil type and trampling to help evaluate whether the moisture association holds under different conditions.");

    method.addEventListener("change", clearSample);
    sampleButton.addEventListener("click", sample);
    query("[data-reset]").addEventListener("click", clearSample);
    revealButton.addEventListener("click", () => {
      revealed = true;
      query("[data-status]").textContent = "Whole field revealed. Clear the sample to hide the full counts and start again.";
      draw();
    });
    draw();
  }

  practicals.register(10, mountChoiceChamber);
  practicals.register(12, mountField);
})();

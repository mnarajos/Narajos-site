(function () {
  "use strict";

  function add(host, tag, text, className) {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    if (className) el.className = className;
    host.append(el);
    return el;
  }

  function card(host, heading) {
    const section = add(host, "section", null, "rp-card");
    add(section, "h2", heading);
    return section;
  }

  function details(host, label, text) {
    const disclosure = add(host, "details");
    add(disclosure, "summary", label);
    add(disclosure, "p", text);
    return disclosure;
  }

  function diagram(host, asset, description, caption, height) {
    const figure = add(host, "figure");
    const image = add(figure, "img", null, "rp-diagram");
    image.alt = description;
    image.width = 500;
    image.height = height;
    image.loading = "lazy";
    image.src = "/assets/required-practicals/" + asset + ".svg";
    add(figure, "figcaption", caption);
  }

  function select(host, prompt, options) {
    const label = add(host, "label", prompt, "numlab");
    const input = add(label, "select");
    input.add(new Option("Choose an option", ""));
    input.options[0].disabled = true;
    options.forEach((option, index) => input.add(new Option(option, String(index))));
    return input;
  }

  function button(host, text, primary) {
    const el = add(host, "button", text, primary ? "btn primary" : "btn");
    el.type = "button";
    return el;
  }

  function readings(host, headings, rows) {
    const table = add(host, "table", null, "rp-table");
    const top = table.createTHead().insertRow();
    headings.forEach(label => { add(top, "th", label).scope = "col"; });
    const tbody = table.createTBody();
    return rows.map(label => {
      const row = tbody.insertRow();
      add(row, "th", label).scope = "row";
      return headings.slice(1).map(() => row.insertCell());
    });
  }

  function appearance(cell, label, colour) {
    cell.replaceChildren();
    const swatch = add(cell, "span");
    swatch.setAttribute("aria-hidden", "true");
    swatch.style.cssText = "display:inline-block;width:.8em;height:.8em;border-radius:50%;border:1px solid #627581;margin-inline-end:.35em;background:" + colour;
    cell.append(document.createTextNode(label));
  }

  function hillReading(time, highLight) {
    return Math.max(0, 0.8 - time * (highLight ? 0.10 : 0.05));
  }

  function hillAppearance(absorbance) {
    if (absorbance < 0.01) return ["Green", "#487940"];
    if (absorbance >= 0.60) return ["Blue-green, strong blue", "#2c606b"];
    return ["Blue-green, less blue", "#41766c"];
  }

  function mountHill(host, ui) {
    const setup = card(host, "Measure electron transfer with DCPIP");
    add(setup, "p", "Light drives electron transfer in chloroplasts. DCPIP is an artificial electron acceptor. At the working pH its oxidised form is blue and its reduced form is colourless. The suspension can remain green because it still contains chlorophyll.");
    diagram(setup, "rp8-hill", "A lamp illuminates tubes A and C. Tube B is wrapped in foil. All three are held at the same temperature in a water bath. Samples go into a red-filter colorimeter. When light-driven electron transfer reduces DCPIP, the blue dye fades and red absorbance falls.",
      "Original apparatus schematic. A contains extract in light, B contains extract in darkness, and C contains buffer instead of extract in light. All receive the same amount of DCPIP.", 310);
    details(setup, "Prepare the extract and compare readings", "Grind spinach in cold, isotonic buffer, filter off debris and use a chloroplast-rich suspension. Isotonic means the medium limits net water movement into or out of the organelles. Illuminate A and C equally, keep the samples at the same monitored temperature and match total volume, dye and pH. Use a red filter to follow the blue dye. Zero the colorimeter with the same chloroplast suspension and buffer but no dye for A and B. For C use the equivalent buffer-only blank. A blank sets the reference reading and accounts for background absorbance. Keep B covered between rapid readings and minimise its exposure. Compare the change from each tube’s own starting reading.");
    details(setup, "Worked example", "One illuminated sample fell from 0.64 to 0.40 absorbance units in 3 minutes. Its mean fall was (0.64 − 0.40) ÷ 3 = 0.08 absorbance units per minute. For an initial rate from a curved trace, find the magnitude of its starting gradient instead.");

    const trial = card(host, "Predict and compare three treatments");
    add(trial, "p", "Illustrative simulation. A and C receive the selected light intensity. The water bath holds all three at the same temperature. The example intensities are below the range where the initial response levels off.");
    const prediction = select(trial, "Which tube should show the greatest fall in absorbance?", ["A · extract in light", "B · extract in darkness", "C · buffer in light"]);
    const intensity = select(trial, "Light intensity for A and C", ["Lower", "Higher"]);
    intensity.value = "1";
    const controls = add(trial, "div", null, "actions");
    const step = button(controls, "Advance 2 minutes", true);
    const reset = button(controls, "Reset comparison");
    const rows = readings(trial, ["Treatment", "Appearance", "Absorbance"], ["A · extract in light", "B · extract in darkness", "C · buffer in light"]);
    const status = add(trial, "p");
    status.setAttribute("role", "status");
    const interpretation = add(trial, "div");
    let time = 0;

    function showReadings() {
      const absorbance = hillReading(time, intensity.value === "1");
      appearance(rows[0][0], ...hillAppearance(absorbance));
      appearance(rows[1][0], "Blue-green, strong blue", "#2c606b");
      appearance(rows[2][0], "Blue", "#2a6096");
      rows[0][1].textContent = absorbance.toFixed(2);
      rows[1][1].textContent = "0.80";
      rows[2][1].textContent = "0.80";
      status.textContent = "At " + time + " min, A reads " + absorbance.toFixed(2) + " and looks " + hillAppearance(absorbance)[0].toLowerCase() + ". B and C remain at 0.80.";
      if (time === 8) {
        const predicted = prediction.selectedOptions[0].textContent;
        status.textContent += " You predicted " + predicted + ". Compare it with the fall in tube A.";
        ui.number(interpretation, {
          prompt: "What is the mean fall in absorbance per minute in tube A over these 8 minutes?",
          answer: (0.8 - absorbance) / time,
          unit: "min⁻¹",
          tolerance: 0.005,
          feedback: "The initial reading was 0.80. Subtract " + absorbance.toFixed(2) + " and divide by 8 minutes. A larger fall per minute indicates faster dye reduction under these conditions.",
          retry: "Use the starting absorbance and the final reading for A. Divide the fall by the time.",
          hint: "The elapsed time is 8 minutes. Find the difference between A’s initial reading of 0.80 and its reading now."
        });
        details(interpretation, "Explain what each control tests", "Compare A with B to test whether the reduction depends on light. Compare A with C to test whether the illuminated dye fades without chloroplast extract. The readout gives evidence about light-dependent electron transfer to the dye. Carbon fixation and glucose production would require different measurements.");
      }
    }

    step.addEventListener("click", () => {
      if (time === 8) return;
      if (!prediction.value) {
        status.textContent = "Choose a prediction before advancing.";
        prediction.focus();
        return;
      }
      time += 2;
      prediction.disabled = true;
      intensity.disabled = true;
      if (time === 8) {
        step.setAttribute("aria-disabled", "true");
        step.textContent = "Comparison complete";
      }
      showReadings();
    });
    reset.addEventListener("click", () => {
      time = 0;
      prediction.value = "";
      prediction.disabled = false;
      intensity.disabled = false;
      step.removeAttribute("aria-disabled");
      step.textContent = "Advance 2 minutes";
      interpretation.replaceChildren();
      showReadings();
    });
    showReadings();

    const transfer = card(host, "Apply the control in a new run");
    ui.choice(transfer, {
      prompt: "A new batch shows a large absorbance fall in both illuminated tubes, including the tube with buffer in place of extract. The dark extract tube barely changes. What does the no-extract reading tell you?",
      options: ["You can attribute the entire fall in A to chloroplast electron transfer.", "Something besides added chloroplast extract can cause a fall under the lit conditions.", "The drop measures glucose production."],
      correct: 1,
      feedback: ["A fall occurred even in C, so the full change in A cannot be assigned to the extract.", "The fall in the no-extract control reveals a background effect. Check the dye, blank and reading procedure before attributing changes to the extract.", "The colorimeter follows the dye. It provides no glucose measurement."],
      hint: "Ask which component differs between the two illuminated tubes.",
      independent: true
    });
    ui.stretch(transfer, "How would you test the effect of moving the lamp closer while ruling out a second effect of the lamp?", "A closer lamp can warm the tubes as well as changing their illumination. Compare measured light intensities in a monitored temperature-controlled bath. Match the same extract, volumes and time points and repeat with fresh samples.");
  }

  function yeastAppearance(time, endpoint) {
    if (time >= endpoint) return ["Blue absent; cloudy yeast remains", "#e2d8b4"];
    if (Number.isFinite(endpoint) && time >= endpoint - 2) return ["Faint blue visible", "#7f98b4"];
    return ["Blue visible", "#3c669a"];
  }

  function mountYeast(host, ui) {
    const explore = card(host, "Investigate respiration in yeast");
    add(explore, "p", "Explore methylene blue, a respirometer, paired examples and unfamiliar apparatus in a guided simulation. Your progress in the simulation is saved separately in this browser.");
    const link = add(explore, "a", "Open the RP9 simulation", "btn primary");
    link.href = "/alevel/respiration/";

    const setup = card(host, "Time a colour endpoint in baker’s yeast");
    add(setup, "p", "Baker’s yeast is a single-celled fungus. Respiration involves electron transfers, and respiring yeast can reduce methylene blue. This redox indicator, a dye that changes colour when electrons are gained or lost, is blue when oxidised and colourless when reduced. Time how long the blue takes to disappear.");
    diagram(setup, "rp9-yeast", "Glass water baths with thermometers hold one live yeast tube at the cooler temperature and two tubes at the warmer temperature, including a control with no viable yeast. A timer is used to record the first observation without visible blue.",
      "Original apparatus schematic. Observe the mixtures through the glass; standardise lighting and use the same endpoint for every tube.", 244);
    details(setup, "Set up a fair comparison", "Bring the yeast and glucose mixtures to their assigned bath temperatures first. Start timing when the dye is added. Use the same starting yeast concentration in the live tubes, and match glucose, dye, volumes and mixing at the start. Leave the tubes undisturbed after that. Oxygen exposure can affect dye colour, so handle the tubes in the same way. Use an otherwise matched tube of heat-killed yeast at the warmer temperature as a comparison. The timed dye change is an indirect comparison of respiration under these conditions. It does not directly measure oxygen uptake or carbon dioxide output.");
    details(setup, "Worked example", "For the same starting dye amount and same endpoint, a shorter time means a faster comparative rate. If blue first disappears at 5 minutes, 1 ÷ 5 gives 0.20 min⁻¹. This is a reciprocal time, with no measurement of gas volume or amount of dye converted.");

    const trial = card(host, "Find the first reading without visible blue");
    add(trial, "p", "Illustrative simulation. Check the first colour reading now and then at each one-minute interval. Record the first observed endpoint separately for both live tubes.");
    const controls = add(trial, "div", null, "actions");
    const step = button(controls, "Advance 1 minute", true);
    const reset = button(controls, "Reset comparison");
    const rows = readings(trial, ["Treatment", "Appearance", "Blue gone"], ["Live yeast · 25 °C", "Live yeast · 35 °C", "Heat-killed yeast · 35 °C"]);
    const status = add(trial, "p");
    status.setAttribute("role", "status");
    const interpretation = add(trial, "div");
    let time = 0;

    function showReadings() {
      const endpoints = [6, 4, Infinity];
      const appearances = endpoints.map(endpoint => yeastAppearance(time, endpoint));
      rows.forEach(([reading, firstEndpoint], i) => {
        appearance(reading, ...appearances[i]);
        firstEndpoint.textContent = time >= endpoints[i] ? endpoints[i] + " min" : "Still blue";
      });
      status.textContent = "At " + time + " min. 25 °C: " + appearances[0][0] + ". 35 °C: " + appearances[1][0] + ". Heat-killed control: blue visible.";
      if (time === 7) {
        ui.number(interpretation, {
          prompt: "Calculate 1 ÷ time for the live yeast at 35 °C, using the first time you observed the endpoint. Give your answer in min⁻¹.",
          answer: 0.25,
          unit: "min⁻¹",
          tolerance: 0.005,
          feedback: "Blue was first absent at 4 minutes in the 35 °C tube. The reciprocal is 1 ÷ 4 = 0.25 min⁻¹. At 25 °C, 1 ÷ 6 ≈ 0.17 min⁻¹. The control remained blue over the reading period.",
          retry: "Identify when blue was first absent from the live 35 °C tube. Take the reciprocal of that time.",
          hint: "The endpoint is the first reading with blue absent, even though the yeast itself is still cloudy. Divide 1 by that time in minutes."
        });
      }
    }

    step.addEventListener("click", () => {
      if (time === 7) return;
      time += 1;
      if (time === 7) {
        step.setAttribute("aria-disabled", "true");
        step.textContent = "Comparison complete";
      }
      showReadings();
    });
    reset.addEventListener("click", () => {
      time = 0;
      step.removeAttribute("aria-disabled");
      step.textContent = "Advance 1 minute";
      interpretation.replaceChildren();
      showReadings();
    });
    showReadings();

    const transfer = card(host, "Evaluate a repeat");
    ui.choice(transfer, {
      prompt: "For a fresh live tube, blue is visible at 2 minutes and first absent at the 3-minute check. What can you infer about the time of the change?",
      options: ["It happened exactly at 3 minutes.", "It happened after 2 minutes and by 3 minutes.", "It happened before 2 minutes."],
      correct: 1,
      feedback: ["You only checked at whole minutes. The change could have occurred between the two observations.", "Your two observations bound the endpoint. Shorter intervals improve the time resolution; fresh, independently prepared tubes let you see how results vary.", "The indicator was still blue when you checked at 2 minutes."],
      hint: "Separate the last blue reading from the first reading without blue.",
      independent: true
    });
    ui.stretch(transfer, "How would you calculate and summarise comparative rates for several independent repeats?", "Calculate 1 ÷ time separately for each fresh mixture before comparing mean rates and their spread. Timing the same tube again gives another observation of one reaction. It does not provide an independent repeat.");

    const related = card(host, "Oxygen uptake in related exam questions");
    diagram(related, "rp9-respirometer", "A water bath surrounds an airtight chamber with seeds above separated soda lime. A capillary connects the chamber to a liquid marker. The marker moves towards the chamber. A matching setup uses glass beads.",
      "Original respirometer schematic. The capillary’s uniform cross-section converts movement into a volume estimate.", 286);
    add(related, "p", "Soda lime absorbs the CO₂ released, so oxygen uptake lowers the chamber pressure and moves the marker inwards. At stable temperature and pressure the volume change is estimated by πr² × distance, where r is the inner radius of the capillary tube. Divide by time for a rate. A matching control with glass beads keeps the gas space comparable and shows background movement from temperature or pressure. Correct the test reading by subtracting the control’s signed movement.");
  }

  window.ALevelPracticals.register(8, mountHill);
  window.ALevelPracticals.register(9, mountYeast);
}());

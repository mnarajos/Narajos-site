(function () {
  "use strict";

  const practicals = window.ALevelPracticals;
  const svgNS = "http://www.w3.org/2000/svg";

  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text != null) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function section(host, heading) {
    const card = node("section", null, "rp-card");
    card.append(node("h2", heading));
    host.append(card);
    return card;
  }

  function apparatus(host, number, alt, caption) {
    const figure = node("figure", null, "rp-diagram");
    const image = node("img");
    image.src = "/assets/required-practicals/rp" + number + "-apparatus.svg";
    image.alt = alt;
    image.width = 460;
    image.height = {1: 184, 3: 184, 4: 200, 11: 190}[number];
    const description = node("figcaption", "Apparatus schematic. " + caption);
    const enlargement = node("a", "Open full-size diagram (new tab)");
    enlargement.href = image.src;
    enlargement.target = "_blank";
    enlargement.rel = "noopener";
    description.append(node("br"), enlargement);
    figure.append(image, description);
    host.append(figure);
  }

  function table(host, caption, headers, rows) {
    const grid = node("table", null, "rp-table");
    const top = node("thead");
    const columns = node("tr");
    headers.forEach(label => {
      const header = node("th", label);
      header.scope = "col";
      columns.append(header);
    });
    top.append(columns);
    const body = node("tbody");
    rows.forEach(row => {
      const line = node("tr");
      row.forEach((value, index) => {
        const cell = node(index === 0 ? "th" : "td");
        if (index === 0) cell.scope = "row";
        cell.append(value);
        line.append(cell);
      });
      body.append(line);
    });
    grid.append(node("caption", caption), top, body);
    host.append(grid);
  }

  function disclosure(host, label, paragraphs) {
    const details = node("details");
    details.append(node("summary", label), ...paragraphs.map(text => node("p", text)));
    host.append(details);
    return details;
  }

  function svg(tag, attributes = {}, label) {
    const element = document.createElementNS(svgNS, tag);
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    if (label != null) element.textContent = label;
    return element;
  }

  function plot(host, options) {
    const { points, xTicks, yTicks, xLabel, yLabel, description, caption, headers, rows } = options;
    const xMin = xTicks[0];
    const xMax = xTicks.at(-1);
    const yMin = yTicks[0];
    const yMax = yTicks.at(-1);
    const x = value => 62 + 310 * (value - xMin) / (xMax - xMin);
    const y = value => 185 - 152 * (value - yMin) / (yMax - yMin);
    const chart = svg("svg", {viewBox: "0 0 394 240", role: "img", "aria-label": description});
    chart.append(
      svg("title", {}, description),
      svg("rect", {x: 1, y: 1, width: 392, height: 238, rx: 12, fill: "#f1f6f8", stroke: "#bdcdd5"})
    );
    const marks = svg("g", {"font-family": "system-ui, sans-serif", "font-size": 16, fill: "#203c4c"});
    yTicks.forEach(value => {
      marks.append(
        svg("path", {
          d: "M62 " + y(value) + "H372",
          stroke: value === 0 ? "#5c7482" : "#bdcdd5"
        }),
        svg("text", {x: 53, y: y(value) + 5, "text-anchor": "end"}, value.toString().replace("-", "−"))
      );
    });
    xTicks.forEach(value => {
      marks.append(
        svg("path", {d: "M" + x(value) + " 185v6", stroke: "#56707e"}),
        svg("text", {x: x(value), y: 208, "text-anchor": "middle"}, value)
      );
    });
    marks.append(
      svg("path", {d: "M62 33V185H372", fill: "none", stroke: "#56707e", "stroke-width": 1.5}),
      svg("text", {x: 20, y: 110, transform: "rotate(-90 20 110)", "text-anchor": "middle"}, yLabel),
      svg("text", {x: 218, y: 229, "text-anchor": "middle"}, xLabel),
      svg("polyline", {
        points: points.map(([a, b]) => x(a) + "," + y(b)).join(" "),
        fill: "none", stroke: "#155b79", "stroke-width": 2.5
      }),
      ...points.map(([a, b]) => svg("circle", {cx: x(a), cy: y(b), r: 3.6, fill: "#155b79"}))
    );
    chart.append(marks);
    const figure = node("figure", null, "rp-diagram");
    figure.append(chart, node("figcaption", caption));
    host.append(figure);
    const readings = disclosure(host, "Read the plotted values", []);
    table(readings, "Simulated readings shown on the plot", headers, rows);
  }

  function endpointTube(visible) {
    const result = node("span");
    const diagram = svg("svg", {width: 35, height: 25, viewBox: "0 0 35 25", "aria-hidden": "true"});
    diagram.append(svg("rect", {
      x: 1, y: 1, width: 33, height: 23, rx: 7,
      fill: visible ? "#fafcfa" : "#f4e2bd", stroke: "#617682"
    }));
    if (visible) {
      diagram.append(svg("path", {d: "M13 8l9 9m0-9-9 9", stroke: "#163a4b", "stroke-width": 2.5}));
    }
    result.append(diagram, node("br"), document.createTextNode(visible ? "Visible" : "Hidden"));
    return result;
  }

  practicals.register(1, function (host, ui) {
    const setup = section(host, "Time the clearing of milk");
    setup.append(node("p", "Trypsin breaks down casein, a milk protein that makes the mixture cloudy. Compare temperatures by timing how long it takes for a cross marked on the tube to become visible through the liquid. This is the endpoint, the observation that stops the timer."));
    apparatus(setup, 1, "Separate tubes of milk and buffered trypsin in one water bath, then one mixed tube and a stopwatch. A cross is visible in the clear mixed tube.",
      "Repeat at each temperature with the same pH, reagent volumes, viewing conditions and cross.");
    const evidence = section(host, "Read the endpoint");
    table(evidence, "Simulated tube views at 15-second intervals", ["Time", "30 °C cross", "40 °C cross"], [
      ["15 s", endpointTube(false), endpointTube(false)],
      ["30 s", endpointTube(false), endpointTube(false)],
      ["45 s", endpointTube(false), endpointTube(true)],
      ["60 s", endpointTube(true), endpointTube(true)]
    ]);
    evidence.append(node("p", "At 30 °C the cross is first visible at the 60 s check. The comparative rate is 1 ÷ 60 ≈ 0.0167 s⁻¹. Under the same conditions a shorter time to the same endpoint gives a higher reciprocal time."));
    ui.number(evidence, {
      prompt: "Use the first visible cross to calculate the comparative rate at 40 °C in s⁻¹. Give at least two significant figures.",
      answer: 0.0222, tolerance: 0.0005, unit: "s⁻¹",
      hint: "Find the first row where the 40 °C cross is visible. Divide 1 by that time in seconds.",
      feedback: "The first clear view at 40 °C is at 45 s, so 1 ÷ 45 ≈ 0.0222 s⁻¹. The endpoint occurred between the 30 s and 45 s checks.",
      retry: "Check the 40 °C column for the first visible cross, and take the reciprocal of that time."
    });
    const application = section(host, "Choose how to start a new run");
    ui.choice(application, {
      prompt: "For a 35 °C run, the milk is already at 35 °C and the buffered trypsin is colder. Which decision makes the temperature comparison valid?",
      options: [
        "Warm the milk and buffered trypsin separately to 35 °C, then mix and start the timer.",
        "Add the cold buffered trypsin and start the timer when the mixture reaches 35 °C.",
        "Add the cold buffered trypsin to the warmed milk and start the timer immediately."
      ],
      correct: 0, independent: true,
      hint: "Identify the moment when the enzyme first meets its substrate.",
      feedback: [
        "Mixing starts the reaction. Equilibrating both liquids first makes the starting mixture close to the intended temperature.",
        "The reaction begins on mixing. Waiting to start the clock misses some digestion and includes an uncontrolled warming period.",
        "The mixture begins below 35 °C. The recorded time includes enzyme activity while the mixture is warming."
      ]
    });
    ui.stretch(application, "Compare with a continuous recording",
      "With continuous measurements of product amount, draw a tangent at time zero. Its change in amount divided by change in time estimates the initial rate, for example in µmol s⁻¹. The clearing experiment gives a comparative 1 ÷ time value for a threshold in cloudiness. Check more often to narrow the interval containing the endpoint.");
  });

  practicals.register(3, function (host, ui) {
    const setup = section(host, "Soak and reweigh potato cylinders");
    setup.append(node("p", "Use different volumes of 0.50 mol dm⁻³ sucrose stock and make each standard up to 10.0 cm³ with water. Cut peeled cylinders of the same length and diameter. Weigh each before soaking and after gently blotting it dry. Keep solution volume, soak time and temperature the same."));
    apparatus(setup, 3, "A pipette transfers sucrose stock. Three labelled tubes hold equal potato cylinders in different sucrose concentrations. The balance shows 2.60 grams after blotting. The initial mass was 2.50 grams.",
      "Use 0, 2, 4, 6, 8 or 10 cm³ of stock and enough water to reach 10 cm³. This gives 0.00 to 0.50 mol dm⁻³ in steps of 0.10 mol dm⁻³.");
    const masses = section(host, "Compare changes in mass");
    table(masses, "Simulated balance readings for two individual potato cylinders", ["Sucrose (mol dm⁻³)", "Initial (g)", "Final (g)"], [
      ["0.20", "2.50", "2.60"],
      ["0.40", "2.40", "2.26"]
    ]);
    masses.append(node("p", "Net water movement changes mass. For the cylinder in 0.20 mol dm⁻³ sucrose, percentage change = (2.60 − 2.50) ÷ 2.50 × 100 = +4.0%. Dividing by the starting mass makes changes comparable."));
    ui.number(masses, {
      prompt: "Calculate the percentage change in mass for the 0.40 mol dm⁻³ cylinder.",
      answer: -5.8, tolerance: 0.1, unit: "%", signed: true,
      hint: "Subtract initial mass from final mass, divide by initial mass, then multiply by 100. Keep the sign.",
      feedback: "(2.26 − 2.40) ÷ 2.40 × 100 ≈ −5.8%. The cylinder lost water to the more concentrated solution.",
      retry: "Use the initial mass as the denominator. A fall in mass gives a negative result."
    });
    const application = section(host, "Estimate the matching sucrose concentration");
    application.append(node("p", "This simulated series plots the mean percentage change from separate cylinders at each concentration. Look for the solution in which the tissue has no net gain or loss of water."));
    const points = [[0, 13], [0.1, 9], [0.2, 4], [0.3, -1], [0.4, -6], [0.5, -10]];
    plot(application, {
      points, xTicks: [0, 0.1, 0.2, 0.3, 0.4, 0.5], yTicks: [-10, -5, 0, 5, 10, 15],
      xLabel: "Sucrose concentration (mol dm⁻³)", yLabel: "Mass change (%)",
      description: "A downward-sloping plot of mean percentage mass change against sucrose concentration. The line crosses zero between the points at 0.20 and 0.30 moles per cubic decimetre. The plotted values are available below.",
      caption: "Simulated data. Each point is a mean. Read the crossing along the line between the nearest points.",
      headers: ["Sucrose (mol dm⁻³)", "Mean mass change (%)"],
      rows: points.map(([a, b]) => [a.toFixed(2), String(b)])
    });
    ui.number(application, {
      prompt: "Estimate the sucrose concentration matching the potato tissue’s water potential, in mol dm⁻³.",
      answer: 0.28, tolerance: 0.015, unit: "mol dm⁻³", independent: true,
      feedback: "Zero is four-fifths of the way from +4% to −1%. Read four-fifths of the way from 0.20 to 0.30 mol dm⁻³, giving about 0.28 mol dm⁻³. That solution has an estimated water potential equal to the tissue’s.",
      retry: "Follow the zero mass-change line, then read down to the concentration axis.",
      hint: "Use the two neighbouring readings where the mass change switches sign."
    });
    ui.stretch(application, "Convert the concentration into a water potential",
      "At atmospheric pressure the solution’s water potential is approximately its solute potential. For an ideal dilute solution, Ψ ≈ −CRT, where C is sucrose concentration, R is 8.314 kPa dm³ mol⁻¹ K⁻¹ and T is absolute temperature. At 20 °C, 0.28 mol dm⁻³ gives about −680 kPa. This conversion is approximate. A reference table or an independent calibration can supply water potentials for the actual solutions.");
  });

  practicals.register(4, function (host, ui) {
    const setup = section(host, "Trace pigment from beetroot to the cuvette");
    setup.append(node("p", "Cut equal beetroot discs and rinse away pigment already released by cutting. Put each in the same volume of distilled water for the same time, using different water-bath temperatures. Betalain, the red pigment, leaves the vacuole across its membrane (the tonoplast), then crosses the cell-surface membrane."));
    apparatus(setup, 4, "Temperature treatments at 20 and 60 degrees Celsius. The warmer tube is darker. An arrow crosses the tonoplast and the cell-surface membrane. A colorimeter shows 530 nanometres.",
      "Remove the discs and bring the liquids to the same measurement temperature. Zero with distilled water and read absorbance at 530 nm using clean, matched cuvettes.");
    const comparison = section(host, "Decide which comparison is valid");
    table(comparison, "Simulated observations after 10 minutes", ["Tube", "Bath", "Disc", "Liquid and absorbance"], [
      ["A", "20 °C", "Rinsed", "Pale pink · 0.12"],
      ["B", "60 °C", "Unrinsed", "Deep pink · 0.72"],
      ["C", "60 °C", "Rinsed", "Pink · 0.49"]
    ]);
    comparison.append(node("p", "Worked example. Compare B and C: bath temperature is the same, but B reads higher. Pigment from cut surfaces can add to pigment released during treatment, raising the reading."));
    ui.choice(comparison, {
      prompt: "Which tubes make the fairest comparison of the two temperatures?",
      options: ["A and B", "A and C", "B and C"],
      correct: 1,
      hint: "Look for two different temperatures with the same preparation.",
      feedback: [
        "A and B differ in temperature and rinsing. Pigment from cut surfaces could contribute to the higher reading.",
        "A and C differ in temperature and received the same rinse. At equal volumes, C’s higher absorbance is evidence that more pigment entered the water under the warmer condition.",
        "Both tubes are at 60 °C. Their difference can help assess rinsing."
      ]
    });
    const application = section(host, "Check a second experiment");
    ui.choice(application, {
      prompt: "In a second simulated experiment, a group measures rinsed discs. Its 20 °C tubes contain 10 cm³ of water and its 60 °C tubes contain 5 cm³. The 60 °C liquid reads 0.52 and the 20 °C liquid reads 0.30. What can this comparison establish?",
      options: [
        "The 60 °C discs released more total pigment because their absorbance was higher.",
        "The 20 °C discs released more total pigment because they sat in more water.",
        "The warmer liquid absorbs more light, but different water volumes leave the effect on total pigment unresolved."
      ],
      correct: 2, independent: true,
      hint: "What happens to the colour of a fixed amount of pigment when its solution is diluted?",
      feedback: [
        "Absorbance reflects pigment concentration under matched optical conditions. The reading can rise when the same amount of pigment is in less water.",
        "Extra water dilutes the pigment. Higher volume alone does not establish how much pigment leaked.",
        "The same amount of pigment would produce a more concentrated solution in 5 cm³. Repeat with equal volumes, or use a suitable calibration and multiply each concentration by its volume."
      ]
    });
    ui.stretch(application, "Identify what the colorimeter cannot distinguish",
      "The reading shows how much light is absorbed by the external solution. It cannot distinguish whether the tonoplast or cell-surface membrane became permeable first. The pigment passes both barriers when it leaves a vacuole inside an intact cell.");
  });

  practicals.register(11, function (host, ui) {
    const setup = section(host, "Prepare standards and measure the residual blue colour");
    setup.append(node("p", "Prepare 0, 2, 4, 6, 8 and 10 mmol dm⁻³ glucose standards from a 10 mmol dm⁻³ stock. For 6 mmol dm⁻³, mix 6.0 cm³ stock with 4.0 cm³ water. Use equal volumes of each standard or simulated urine sample and treat them with the same volume of quantitative Benedict’s reagent. Heat them together for the same time."));
    apparatus(setup, 11, "Clear glucose standards and an unknown go into a water bath with reagent. A paler blue tube has white precipitate; the pale blue liquid is transferred to a colorimeter reading at 680 nanometres.",
      "Once the white solid has settled, pipette the clear liquid above it (the supernatant) into a cuvette. Use a 680 nm red filter and a distilled-water optical blank. Measure the treated zero-glucose standard like the others.");
    const evidence = section(host, "Read the glucose calibration curve");
    evidence.append(node("p", "Glucose reduces blue copper(II) ions during heating. As glucose concentration increases, less blue copper remains, so absorbance falls. The clear glucose standards before adding reagent have no blue colour."));
    const points = [[0, 0.85], [2, 0.73], [4, 0.61], [6, 0.49], [8, 0.37], [10, 0.25]];
    plot(evidence, {
      points, xTicks: [0, 2, 4, 6, 8, 10], yTicks: [0.2, 0.4, 0.6, 0.8, 1],
      xLabel: "Glucose concentration (mmol dm⁻³)", yLabel: "Absorbance at 680 nm",
      description: "A calibration graph with six standards forming a descending line. As glucose concentration increases from zero to ten millimoles per cubic decimetre, absorbance drops from 0.85 to 0.25. The plotted values are available below.",
      caption: "Simulated standards. Use the calibrated range from 0 to 10 mmol dm⁻³.",
      headers: ["Glucose (mmol dm⁻³)", "Absorbance"],
      rows: points.map(([a, b]) => [String(a), b.toFixed(2)])
    });
    evidence.append(node("p", "Worked reading. Absorbance 0.37 lines up with the 8 mmol dm⁻³ standard. If a reading falls between standards, estimate the concentration between them."));
    ui.number(evidence, {
      prompt: "Undiluted sample A reads 0.55. Estimate its glucose concentration in mmol dm⁻³.",
      answer: 5, tolerance: 0.25, unit: "mmol dm⁻³",
      hint: "0.55 is halfway between 0.61 and 0.49. Find their glucose concentrations and take the midpoint.",
      feedback: "0.55 falls halfway between the 4 and 6 mmol dm⁻³ standards, giving 5 mmol dm⁻³.",
      retry: "Start at 0.55 on the absorbance axis. Reach the line and then read down to the concentration axis."
    });
    const application = section(host, "Correct for dilution");
    ui.number(application, {
      prompt: "Sample B was mixed with an equal volume of water before the assay. The diluted sample reads 0.43. Estimate the glucose concentration of the original sample in mmol dm⁻³.",
      answer: 14, tolerance: 0.5, unit: "mmol dm⁻³", independent: true,
      hint: "Read the concentration of the diluted sample first. Adding an equal volume of water halves the concentration.",
      feedback: "The assayed sample is about 7 mmol dm⁻³, halfway between 6 and 8. Before the twofold dilution its concentration was approximately 14 mmol dm⁻³. The measured sample was inside the calibrated range.",
      retry: "Find 0.43 between the two neighbouring standards and then account for the water added before the assay."
    });
    ui.stretch(application, "Decide when dilution is needed",
      "For this assay, an absorbance of 0.18 is below the range of the standards and may represent a sample above the concentration range. Dilute a fresh aliquot before adding reagent, repeat the assay, check that its reading is within the calibration range and multiply the resulting estimate by the dilution factor. Benedict’s responds to reducing sugars. The concentration estimate assumes glucose is the only reducing sugar in this simulated sample.");
  });
})();

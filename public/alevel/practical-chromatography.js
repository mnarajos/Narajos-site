(function () {
  "use strict";

  const photograph = "/assets/required-practicals/rp7-leaf-chromatogram.webp";
  const study = "https://doi.org/10.32388/I14RGE.2";
  const license = "https://creativecommons.org/licenses/by/4.0/";
  // Positions in the proportional crop, rounded to a 10-image-unit ruler at the left lane.
  const baseline = 820;
  const solventDistance = 760;

  function addRuler(card) {
    const figure = document.createElement("figure");
    figure.innerHTML = `
      <svg viewBox="0 0 610 910" width="420" height="627" role="img" aria-label="Photograph of a thin-layer chromatogram. The left lane has three separated spots below the solvent front. The right lane has a large round spot centred near the baseline. Dashed guides locate the solvent front and baseline at the left lane." style="display:block;margin-inline:auto">
        <rect width="610" height="910" rx="12" fill="#f7fbfe"/>
        <image href="${photograph}" x="0" y="0" width="423" height="865"/>
        <g fill="none" stroke="#203647" stroke-width="2.5">
          <path d="M435 ${baseline - solventDistance}V${baseline}"/>
          <path stroke-dasharray="7 6" d="M28 ${baseline - solventDistance}H438M29 ${baseline}H438"/>
          <path d="M429 120h13m-13 100h13m-13 100h13m-13 100h13m-13 100h13m-13 100h13m-13 100h13"/>
        </g>
        <g fill="#173148" font-family="system-ui,sans-serif" font-size="26" font-weight="650">
          <text x="449" y="54">760</text>
          <text x="449" y="81" font-size="22">Solvent front</text>
          <text x="449" y="129">700</text>
          <text x="449" y="229">600</text>
          <text x="449" y="329">500</text>
          <text x="449" y="429">400</text>
          <text x="449" y="529">300</text>
          <text x="449" y="629">200</text>
          <text x="449" y="729">100</text>
          <text x="449" y="812">0</text>
          <text x="449" y="839" font-size="22">Baseline</text>
          <text x="7" y="897" font-size="24">Basswood</text>
          <text x="295" y="897" font-size="24">Copperleaf</text>
        </g>
        <path data-ruler-marker fill="none" stroke="#111827" stroke-width="4"/>
        <path data-ruler-highlight fill="none" stroke="white" stroke-width="1.5"/>
      </svg>
      <figcaption>Photograph of leaf extracts from American basswood (left) and copperleaf (right) on one TLC plate. Use the outer lanes.</figcaption>`;
    const control = document.createElement("label");
    control.style.display = "block";
    control.append("Move the line to the centre of a spot in the basswood lane");
    const range = document.createElement("input");
    range.type = "range";
    range.min = 0;
    range.max = solventDistance;
    range.step = 10;
    range.value = 350;
    range.style.cssText = "display:block;width:100%;min-height:44px;margin:0";
    control.append(range);
    const readout = document.createElement("p");
    const marker = figure.querySelector("[data-ruler-marker]");
    const highlight = figure.querySelector("[data-ruler-highlight]");

    function updateRuler() {
      const y = baseline - range.valueAsNumber;
      const horizontal = `M14 ${y}H135`;
      marker.setAttribute("d", horizontal);
      highlight.setAttribute("d", horizontal);
      range.setAttribute("aria-valuetext", `${range.value} image units above the baseline`);
      readout.textContent = `Measuring line ${range.value} image units above the baseline. Solvent front ${solventDistance} image units above the baseline.`;
    }

    range.addEventListener("input", updateRuler);
    updateRuler();
    const alternative = document.createElement("details");
    alternative.innerHTML = `
      <summary>Read the photographic evidence</summary>
      <p>The pencil baseline defines zero. The front is about 760 image units above it at the left lane.</p>
      <table class="rp-table">
        <thead><tr><th scope="col">Lane</th><th scope="col">Feature</th><th scope="col">Approximate height above baseline in image units</th></tr></thead>
        <tbody>
          <tr><th scope="row">Basswood</th><td>Highest clearly separated spot, green</td><td>560</td></tr>
          <tr><th scope="row">Basswood</th><td>Middle of the three clearly separated spots, yellow-green</td><td>510</td></tr>
          <tr><th scope="row">Basswood</th><td>Lowest of the three clearly separated spots, yellow</td><td>430</td></tr>
          <tr><th scope="row">Copperleaf</th><td>Large round red spot</td><td>About 0</td></tr>
        </tbody>
      </table>`;
    const photoLink = document.createElement("a");
    photoLink.href = photograph;
    photoLink.target = "_blank";
    photoLink.rel = "noopener";
    photoLink.textContent = "Open full-size photograph in a new tab";
    const credit = document.createElement("p");
    credit.innerHTML = `Photograph by Adiga, Chandra P, Kikkeri, Praveen and Senapati, <a href="${study}">Figure 2C</a>, <a href="${license}">CC BY 4.0</a>. Cropped from the original figure.`;
    const task = document.createElement("p");
    task.textContent = "Measure the highest of the three distinct basswood spots first. Then measure the lowest of those three.";
    card.append(task, control, readout, figure, alternative, photoLink, credit);
  }

  function mount(host, ui) {
    const simulation = document.createElement("section");
    simulation.className = "rp-card";
    simulation.innerHTML = `<h2>Explore paper chromatography</h2><p>Practise the method, compare chromatograms and apply the ideas to unfamiliar examples. Progress is saved separately in this browser.</p><a class="btn primary" href="/alevel/chromatography/">Open the RP7 simulation</a>`;
    host.append(simulation);
    const method = document.createElement("section");
    method.className = "rp-card";
    method.innerHTML = `
      <h2>Measure pigment movement</h2>
      <p>Leaf extracts contain a mixture of pigments. The solvent carries pigments up the chromatography plate. Pigments move different distances because they differ in how readily they dissolve in the solvent and how strongly they interact with the plate.</p>
      <details>
        <summary>See the thin-layer chromatography setup</summary>
        <figure class="rp-diagram">
          <img src="/assets/required-practicals/rp7-tlc.svg" width="540" height="300" loading="lazy" alt="A lid covers a chamber. A silica-coated plate touches the shallow solvent at its base. Two sample spots on the pencil baseline stay above the solvent level. An arrow shows solvent moving up the plate.">
          <figcaption>Apparatus schematic. Each extract starts as a spot on the pencil baseline. Keeping the baseline above the solvent prevents the samples washing into the liquid. Mark the solvent front as soon as you remove the plate.</figcaption>
        </figure>
      </details>
      <details>
        <summary>See a worked Rf example</summary>
        <p>The solvent front is the furthest point the solvent reached. Measure from the same baseline to the front and to the centre of the pigment spot. If a spot moved 24 mm and the solvent moved 40 mm, Rf = 24 ÷ 40 = 0.60. The distances use the same units, which cancel.</p>
      </details>`;
    const evidence = document.createElement("section");
    evidence.className = "rp-card";
    addRuler(evidence);
    host.append(method, evidence);

    ui.number(host, {
      prompt: "Supported attempt. Find the Rf of the highest clearly separated spot in the basswood lane. Round to two decimal places.",
      answer: 0.74,
      tolerance: 0.02,
      feedback: "The highest green spot is about 560 image units above the baseline, giving 560 ÷ 760 ≈ 0.74.",
      retry: "Find the centre of the uppermost well-defined spot in the left lane, then divide its distance above the baseline by the solvent distance.",
      hint: "Look for the green spot at the top of the group of three. The measuring line should pass through the middle of the spot. Both readings come from the same image scale.",
      independent: false
    });
    ui.number(host, {
      prompt: "Independent attempt. Find the Rf of the lowest of the three clearly separated spots in the basswood lane. Round to two decimal places.",
      answer: 0.57,
      tolerance: 0.02,
      feedback: "The lowest distinct yellow spot is about 430 or 440 image units above the baseline, giving an Rf of about 0.57.",
      retry: "Use the centre of the lowest well-defined spot in the upper group of three, above the large sample residue at the baseline.",
      hint: "The spot is yellow. Reuse the distance to the solvent front and move the measuring line to this spot.",
      independent: true
    });
    ui.choice(host, {
      prompt: "What comparison is supported by the photograph?",
      options: [
        "The largest round copperleaf spot stayed near the baseline, while the three distinct basswood spots moved much further.",
        "All pigments found in the basswood extract were missing from the copperleaf extract.",
        "A spot at a similar height in both lanes shows that the two samples contained equal amounts of that pigment."
      ],
      correct: 0,
      feedback: [
        "The biggest copperleaf spot is centred on the pencil baseline. The three clearly separated basswood spots are well above it. This comparison describes what separated under these conditions.",
        "Spots may be faint, overlap or stay near the baseline under these conditions. Compare the visible separated spots before making claims about what the leaf contained.",
        "Equal height means similar Rf on this plate. Concentration would require a separate measurement, and identification requires further evidence."
      ],
      independent: true
    });
    ui.stretch(host,
      "A student finds an Rf of 0.57 for a spot in a paper chromatogram prepared with a different solvent and calls it the same pigment as the lowest distinct basswood spot. What would give stronger evidence?",
      "Run the extracts alongside a reference pigment on the same kind of plate using the same solvent and conditions. Compare migration and appearance. Two compounds can migrate together, so further evidence such as their absorption spectra makes identification stronger.");
  }

  window.ALevelPracticals.register(7, mount);
}());

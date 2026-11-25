(() => {
  "use strict";

  const { register } = window.ALevelPracticals;
  const assets = "/assets/required-practicals/";
  const svgNamespace = "http://www.w3.org/2000/svg";
  const shareAlike = "https://creativecommons.org/licenses/by-sa/4.0/";

  function element(tag, text, className) {
    const result = document.createElement(tag);
    if (text) result.textContent = text;
    if (className) result.className = className;
    return result;
  }

  function link(text, href) {
    const anchor = element("a", text);
    anchor.href = href;
    return anchor;
  }

  function details(summary, ...content) {
    const disclosure = element("details");
    disclosure.append(element("summary", summary), ...content);
    return disclosure;
  }

  function card(host, heading, text) {
    const section = element("section", null, "rp-card");
    section.append(element("h2", heading), element("p", text));
    host.append(section);
    return section;
  }

  function marker(letter, labelX, labelY, targetX, targetY) {
    return `<path d="M${labelX} ${labelY}L${targetX} ${targetY}" stroke="#122429" stroke-width="8"/>
      <path d="M${labelX} ${labelY}L${targetX} ${targetY}" stroke="white" stroke-width="4"/>
      <circle cx="${targetX}" cy="${targetY}" r="6" fill="white" stroke="#122429" stroke-width="3"/>
      <circle cx="${labelX}" cy="${labelY}" r="24" fill="#122429" stroke="white" stroke-width="3"/>
      <text x="${labelX}" y="${labelY}" dy=".35em" fill="white" text-anchor="middle" font-size="28" font-weight="700" font-family="sans-serif">${letter}</text>`;
  }

  function photo(host, info) {
    const figure = element("figure", null, "rp-diagram");
    const frame = element("div");
    frame.style.position = "relative";
    frame.style.maxWidth = `${Math.min(info.width, 520)}px`;
    const img = element("img");
    img.src = assets + info.file;
    img.width = info.width;
    img.height = info.height;
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = info.alt;
    Object.assign(img.style, { display: "block", width: "100%", height: "auto" });
    frame.append(img);
    if (info.marks) {
      const overlay = document.createElementNS(svgNamespace, "svg");
      overlay.setAttribute("viewBox", `0 0 ${info.width} ${info.height}`);
      overlay.setAttribute("aria-hidden", "true");
      Object.assign(overlay.style, { position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" });
      overlay.innerHTML = info.marks;
      frame.append(overlay);
    }
    const caption = element("figcaption", info.caption + " ");
    const credit = element("small");
    credit.append(link(info.author, info.source), " · ", info.licence ? link("CC BY-SA 4.0", info.licence) : "Public domain", " · " + info.modifications);
    caption.append(credit);

    const dialog = element("dialog", null, "al-figure-dialog");
    dialog.setAttribute("aria-label", info.title);
    const enlarge = element("button", "Enlarge " + info.title, "btn");
    const close = element("button", "Close", "btn");
    const view = element("div", null, "al-drawing-zoom");
    view.tabIndex = 0;
    view.setAttribute("role", "region");
    view.setAttribute("aria-label", "Enlarged photograph. Scroll to inspect it.");
    enlarge.type = close.type = "button";
    dialog.append(element("h2", info.title), close, view);
    enlarge.addEventListener("click", () => {
      const enlarged = frame.cloneNode(true);
      enlarged.style.width = `${Math.max(info.width, 740)}px`;
      enlarged.style.maxWidth = "none";
      enlarged.querySelector("img").loading = "eager";
      const marks = enlarged.querySelector("svg");
      if (marks) marks.style.minWidth = "0";
      view.replaceChildren(enlarged);
      dialog.showModal();
      view.scrollTo(0, 0);
      close.focus();
    });
    close.addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => enlarge.focus());
    figure.append(frame, caption);
    host.append(figure, enlarge, dialog);
  }

  function squashDiagram() {
    const figure = element("figure", null, "rp-diagram");
    figure.innerHTML = `<svg viewBox="0 0 600 146" role="img" aria-label="A root tip is softened and stained, spread under a coverslip, then viewed through a light microscope.">
      <defs>
        <marker id="rp2-sequence-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0L8 4L0 8Z" fill="#26605d"/>
        </marker>
      </defs>
      <g fill="#eef7f3" stroke="#96aaa3" stroke-width="2">
        <rect x="4" y="4" width="176" height="135" rx="13"/>
        <rect x="212" y="4" width="176" height="135" rx="13"/>
        <rect x="420" y="4" width="176" height="135" rx="13"/>
      </g>
      <g fill="none" stroke="#26605d" stroke-width="3" marker-end="url(#rp2-sequence-arrow)">
        <path d="M186 63h18"/><path d="M394 63h18"/><path d="M300 33v23"/>
      </g>
      <path d="M63 32v53q0 11 12 11h34q12 0 12-11V32M65 80h54" fill="#d4eaf0" stroke="#235765" stroke-width="3"/>
      <path d="M99 40q-3 17-11 23q-7 6-6 20" fill="none" stroke="#8a3b55" stroke-width="6" stroke-linecap="round"/>
      <rect x="236" y="82" width="128" height="11" rx="4" fill="#d4eaf0" stroke="#235765" stroke-width="3"/>
      <path d="M280 79h37" stroke="#8a3b55" stroke-width="6" stroke-linecap="round"/>
      <path d="M268 73h64" stroke="#235765" stroke-width="5"/>
      <g fill="none" stroke="#235765" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M530 33c20 10 24 48 0 63h-52h80M486 72h42M493 24l23 13-13 24-23-13"/>
      </g>
      <g fill="#172e35" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="700">
        <text x="92" y="125">Soften and stain</text><text x="300" y="125">Squash on slide</text><text x="508" y="125">Focus and scan</text>
      </g>
    </svg><figcaption>Original schematic of slide preparation and microscope use.</figcaption>`;
    return figure;
  }

  register(2, (host, ui) => {
    const setup = card(host, "From root tip to microscope", "Cells divide in the meristem, a region just behind the root tip. Staining makes chromosomes visible. A squash spreads the cells into a thin layer so you can distinguish neighbouring cells and count them.");
    const prep = element("ol");
    ["Soften the tip with hydrochloric acid, rinse, then stain the tissue. The stain increases contrast between chromosomes and the background.",
      "Place a coverslip over the tissue. Press straight down to spread it without sliding the coverslip sideways.",
      "Find the meristem at low power. Centre and focus it before moving to a higher-power objective. At high power, use the fine focus."]
      .forEach(step => prep.append(element("li", step)));
    setup.append(squashDiagram(), details("Why each preparation step matters", prep));

    const worked = card(host, "Count the cells in Field A", "Mitotic index is the number of cells in mitosis divided by all counted cells, including interphase. Use the centre of the nucleus or the midpoint between two chromosome groups to decide whether a cell is in the frame. Include centres on the top and left edges and exclude those on the bottom and right. Record unclear cells separately and leave them out of both counts.");
    photo(worked, {
      file: "rp2-onion-field-a.webp", width: 515, height: 221, title: "Field A",
      alt: "Onion root-tip micrograph. The included centres show one set of thick pink threads on the left and two round, diffuse pink patches, one in the middle and one on the right. A further patch is clipped at the left with its centre outside the image.",
      caption: "Field A · onion root-tip micrograph.", author: "Shoba Shanti · CIL:43552",
      source: "https://www.cellimagelibrary.org/images/CIL_43552", modifications: "cropped and converted to WebP"
    });
    worked.append(element("p", "Worked example. The cell on the left has visibly condensed chromosomes and counts as one dividing cell. The two other nuclei whose centres lie inside the frame are in interphase. The partial nucleus at the far left has its centre outside. Mitotic index = 1 ÷ 3 ≈ 0.33."),
      details("Review the visible signs of each stage", element("p", "Interphase has an intact nucleus with diffuse staining. In prophase, chromosomes condense and become individually visible. In metaphase they line up at the equator. In anaphase two sets move apart. In telophase two nuclei reform in a single cell and chromosomes become less distinct.")));

    const practice = card(host, "Apply the same rule to Field B", "In this second onion root-tip micrograph, mark the faint patch at the lower left and the mottled round patch midway down the right as unclear. Apply the same count to the rest of the frame. The two practice fields help you learn the rule. For a real estimate, choose positions in advance across the same region at fixed stage intervals or by random coordinates.");
    photo(practice, {
      file: "rp2-onion-field-b.webp", width: 901, height: 1120, title: "Field B",
      alt: "Onion root-tip micrograph. Left of the pale channel from top to bottom are four oval bodies with rounded outlines and diffuse staining, then a cell showing two dark groups separated by a paler region. To the right are two sets of curved rods separated across one cell at the top, a mottled round body halfway down, and an oval, diffusely stained body with its centre inside the lower-right frame. At the bottom right only part of a further stained body is visible, with its centre outside. A faint patch near the lower left is also visible.",
      caption: "Field B · onion root-tip micrograph.", author: "Natalierussell77", licence: shareAlike,
      source: "https://commons.wikimedia.org/wiki/File:Mitosis_in_Onion_Root_-_various_stages_(Anaphase_and_Telophase).jpg", modifications: "cropped, resized and converted to WebP"
    });
    ui.choice(practice, {
      prompt: "Which stage does the top-right cell in Field B show?",
      options: ["Interphase", "Metaphase", "Anaphase", "Telophase"], correct: 2,
      feedback: ["An interphase nucleus would show diffuse staining. Here two groups of distinct chromosomes are separating.",
        "Metaphase would show the chromosomes clustered at one equator. Here two groups are visibly separated.",
        "The separated groups of visibly condensed chromosomes are moving towards opposite poles. This is anaphase.",
        "The distinct chromosome groups are still clearly visible in this cell. In telophase, the daughter nuclei reform and chromosomes begin to decondense."],
      hint: "Look for separate groups of clearly condensed chromosomes. Compare their positions with the patterns described in the stage guide.", independent: true
    });
    ui.number(practice, {
      prompt: "What is the mitotic index for Field B as a decimal? Round to two decimal places.", answer: .29, tolerance: .005,
      feedback: "Count two dividing cells and five in interphase, giving 2 ÷ 7 = 0.29 to two decimal places. The two unclear patches and the nucleus centred outside the frame stay out of the denominator.",
      retry: "Check the two separated groups in each dividing cell count as one cell. Include interphase cells in the denominator.",
      hint: "Scan down the left column, then the right. The partial interphase nucleus centred inside the lower-right edge still counts.", independent: true
    });
    ui.stretch(practice, "Would choosing fields with the clearest clusters affect the estimate?",
      "Choosing fields because they have visible chromosome clusters tends to overestimate the proportion dividing. Agree the sampling positions before looking at division and keep the focus, region and counting rules consistent. Report how many cells were excluded because they were unclear.");
  });

  register(5, (host, ui) => {
    const specimen = card(host, "Observe a dissected lamb heart", "A cut through the left ventricle exposes its chamber and the tissues beside it. The photograph looks into the cut-open chamber. The cut muscle faces are above and below the opening.");
    photo(specimen, {
      file: "rp5-lamb-heart.webp", width: 932, height: 1100, title: "dissected heart",
      alt: "The lamb's left ventricle has been held open. Marker A points to a narrow, pale strand bridging the dark chamber. Marker B points to the broad, solid cut face forming its upper edge. Forceps and a gloved hand hold the specimen.",
      caption: "Dissection photograph · left ventricle of a lamb, viewed through the opening in its wall.",
      author: "Greyzxq", licence: shareAlike,
      source: "https://commons.wikimedia.org/wiki/File:Heart_strings_in_lamb_heart.jpg",
      modifications: "resized and converted to WebP, with separate letter markers",
      marks: marker("A", 118, 440, 384, 330) + marker("B", 775, 110, 594, 216)
    });
    specimen.append(details("Worked example: find the chamber first", element("p", "Follow the broad dark opening between the cut faces. That space is the chamber that normally holds blood. A drawn outline should show the opening and the shapes visible around it. The cut itself was made during dissection.")));
    ui.choice(specimen, {
      prompt: "Which description best identifies A and B from the photograph?",
      options: ["A is the thick ventricle wall and B is a valve cord.", "A is a valve cord and B is the cut ventricle wall.", "A is a vein and B is the inner edge of an atrium."], correct: 1,
      feedback: ["Follow the leader lines. A meets a narrow strand in the opening. B ends on the broad cut muscle.",
        "A marks a thin valve cord (chorda tendinea). B marks the thick cut muscle of the ventricle wall.",
        "The thin strand inside the chamber is continuous with valve supporting tissue. The broad cut face surrounds the left ventricular chamber."],
      hint: "Compare the width and shape of the structures at the ends of the two leader lines."
    });
    ui.choice(specimen, {
      prompt: "A student says both structures pump blood. Which explanation uses what you can see to improve that claim?",
      options: ["Both contain the same kind of muscle because they lie in the same chamber.",
        "The narrow cords squeeze to pump blood and the wall holds the valve shut.",
        "The broad muscle wall contracts to generate pressure. The thin cords become taut and support the valve as pressure rises."], correct: 2,
      feedback: ["The photograph shows two different forms of tissue. The broad cut wall is muscular and the pale strands are fibrous valve supports.",
        "The thick muscle surrounding the chamber can contract and raise pressure. The cords tether the valve as the ventricle contracts.",
        "The visibly thick wall is the contracting muscle. The narrow cords connect the valve to muscle projections and keep the closed valve from inverting into the atrium."],
      independent: true
    });
    const drawing = element("p", "Draw the opening, one cord and the thick wall in proportion. Compare your outline with the photograph. Label only what you can see. Continue with ");
    drawing.append(link("Biological drawings", "#exam-drawings"), ".");
    specimen.append(drawing);
  });

  function zoneRuler(host) {
    const figure = element("figure", null, "rp-diagram");
    const mmToX = mm => 30 + 6 * mm;
    const ticks = Array.from({ length: 51 }, (_, mm) => {
      const x = mmToX(mm);
      const labelled = mm % 10 === 0;
      return `<path d="M${x} 183v${labelled ? 15 : mm % 5 === 0 ? 11 : 6}"/>` +
        (labelled ? `<text x="${x}" y="215" stroke="none" fill="#172e35">${mm}</text>` : "");
    });
    figure.innerHTML = `<svg viewBox="0 0 360 227" aria-hidden="true">
      <defs><pattern id="rp6-lawn" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1" fill="#7f9087"/></pattern></defs>
      <rect x="14" y="4" width="332" height="175" rx="18" fill="#d9e5db" stroke="#3e5c51" stroke-width="2"/>
      <rect x="15" y="5" width="330" height="173" rx="18" fill="url(#rp6-lawn)"/>
      <circle cx="216" cy="90" r="78" fill="#fff" stroke="#193d3b" stroke-width="2"/>
      <circle cx="216" cy="90" r="12" fill="#e2cea0" stroke="#193d3b" stroke-width="2"/>
      <path d="M30 90H330" stroke="#52615c" stroke-dasharray="4 4"/>
      <rect x="25" y="181" width="310" height="40" rx="5" fill="#f5f8f4" stroke="#193d3b" stroke-width="2"/>
      <g stroke="#193d3b" font-family="sans-serif" font-size="13" text-anchor="middle">${ticks.join("")}</g>
      <text x="343" y="215" fill="#172e35" font-family="sans-serif" font-size="10">mm</text>
      <path data-zone-guide="left" stroke="#264c74" stroke-width="2"/>
      <path data-zone-guide="right" stroke="#7a3d1b" stroke-width="2"/>
    </svg><figcaption>Calibrated teaching schematic · disc N. Dots represent visible growth. Each minor ruler tick represents 1 mm.</figcaption>`;
    host.append(figure);
    const controls = element("fieldset", null, "rp-options");
    controls.append(element("legend", "Align the two guide lines with the edges of the clear zone"));
    for (const edge of ["left", "right"]) {
      const label = element("label", `${edge === "left" ? "Left" : "Right"} guide `);
      const slider = element("input");
      const reading = element("span");
      slider.type = "range";
      slider.min = "0";
      slider.max = "50";
      slider.step = "1";
      slider.value = edge === "left" ? "10" : "40";
      slider.style.accentColor = "var(--acc)";
      slider.setAttribute("aria-label", `${edge} ruler guide`);
      const guide = figure.querySelector(`[data-zone-guide="${edge}"]`);
      function update() {
        const x = mmToX(Number(slider.value));
        guide.setAttribute("d", `M${x} 90V182m-4-4 4 4 4-4`);
        guide.setAttribute("stroke-dasharray", edge === "left" ? "5 3" : "2 2");
        slider.setAttribute("aria-valuetext", `${slider.value} millimetres`);
        reading.textContent = `${slider.value} mm`;
      }
      slider.addEventListener("input", update);
      update();
      label.append(slider, " ", reading);
      const line = element("p");
      line.append(label);
      controls.append(line);
    }
    const reset = element("button", "Reset ruler guides", "btn");
    reset.type = "button";
    reset.addEventListener("click", () => {
      const sliders = controls.querySelectorAll("input");
      sliders.forEach((slider, index) => {
        slider.value = index ? "40" : "10";
        slider.dispatchEvent(new Event("input"));
      });
    });
    controls.append(reset);
    host.append(controls, details("Read the ruler as text", element("p", "The clear zone's left edge lies two minor ticks before the 20 mm mark. The right edge lies four minor ticks after the 40 mm mark. Each minor tick is 1 mm.")));
  }

  register(6, (host, ui) => {
    const observation = card(host, "Find the zone of inhibition", "Where an antimicrobial diffuses from a disc and inhibits growth, a clear zone can appear in the surrounding lawn of microbes. Aseptic technique uses sterile equipment and limits exposure of the plate to reduce contamination. Keep plates closed for observation. A disc with the same solvent but no active substance checks whether the solvent or disc contributes to a zone.");
    photo(observation, {
      file: "rp6-inhibition-plate.webp", width: 900, height: 892, title: "agar plate",
      alt: "Square agar plate with rows of round paper discs. At A, a wide smooth region extends from the disc into the textured background. At B, the textured background reaches the edge of the disc.",
      caption: "Agar plate photograph · comparison of visible growth around paper discs.",
      author: "Dr Graham Beards", licence: shareAlike,
      source: "https://commons.wikimedia.org/wiki/File:Antibiotic_sensitivity_test.jpg", modifications: "resized and converted to WebP, with separate letter markers",
      marks: marker("A", 670, 240, 603, 281) + marker("B", 260, 760, 330, 750)
    });
    ui.choice(observation, {
      prompt: "Which observation supports growth inhibition around a disc?",
      options: ["The smooth area around A extends beyond the edge of its disc.", "A white paper disc is visible at B.", "The plate has a textured background around B."], correct: 0,
      feedback: ["The smooth area extends beyond the disc and interrupts the textured lawn. This is evidence of inhibited visible growth.",
        "The shape of a paper disc alone tells you where a substance was applied. Look for a clear region around the disc.",
        "The textured lawn extends up to the disc at B. Look for a break in that lawn that extends beyond a disc."],
      hint: "Compare the area immediately outside each paper disc with the background further away."
    });

    const measurement = card(host, "Measure the total zone diameter", "Measure across the centre from one edge of the clear zone to the other, including the disc. If the edges fall at 11 mm and 27 mm, the total diameter is 27 − 11 = 16 mm. Use the ruler in the schematic for the next disc.");
    zoneRuler(measurement);
    ui.number(measurement, {
      prompt: "What is the total zone diameter for disc N, in mm?", answer: 26, tolerance: 1, unit: "mm",
      feedback: "The left edge is at 18 mm and the right edge is at 44 mm. The diameter is 44 − 18 = 26 mm. Answers within 1 mm allow for reading the edge against the nearest tick.",
      retry: "Read both outer edges along the line through the centre, then subtract the left reading from the right reading.",
      hint: "Use the transition between the smooth area and the dotted lawn as the edge, including the pale disc in the span.", independent: true
    });
    ui.choice(measurement, {
      prompt: "Disc M produced an 18 mm zone. M and N carried different substances at different concentrations. What can you conclude?",
      options: ["N must be better at killing this microorganism than M.",
        "N produced the larger zone under these conditions. Concentration and diffusion can affect how far inhibition extends.",
        "M and N inhibited growth to the same distance because the discs were the same size."], correct: 1,
      feedback: ["The plate shows an absence of visible growth in the zone. Survival cannot be determined from the appearance, and concentrations and diffusion can differ.",
        "A larger zone shows inhibition further from the disc under the conditions tested. The comparison alone cannot separate antimicrobial activity from effects of concentration or diffusion.",
        "The outer edges of the clear zones are different distances from the discs. The discs' own sizes cannot establish equal inhibition."], independent: true
    });
    ui.stretch(measurement, "Estimate the total circular zone area for N", "The radius is 26 ÷ 2 = 13 mm. Total zone area = π × 13² ≈ 531 mm². This includes the area covered by the disc. To report only the clear agar area, subtract the measured disc area and state the convention.");
  });
})();

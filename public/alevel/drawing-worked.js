/* Detailed cell drawing from the published light micrograph. See docs/drawing-worked-source.md. */
(function () {
  "use strict";

  const imagePath = "/assets/micrographs/drawing-tiger-frog.webp";
  const crop = [256, 208, 392, 300];
  const sourceBar = { width: 255, micrometres: 10 };
  const ink = "#18232a";
  const cell = "M22 112 C29 78 57 47 94 32 C121 21 151 19 180 22 C231 24 279 45 310 71 C340 98 363 136 369 164 C377 199 355 233 322 252 C290 270 250 276 208 272 C165 270 123 259 93 243 C54 223 30 191 22 156 C18 141 18 125 22 112 Z";
  const nucleus = "M129 123 C135 107 150 99 166 98 C182 96 199 100 211 109 C224 119 232 132 233 146 C234 160 225 173 211 179 C197 186 181 187 165 181 C151 177 138 168 131 154 C126 144 125 132 129 123 Z";

  function frame(width, height, description, content) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width + ' ' + height +
      '" role="img" aria-label="' + description + '" style="display:block;width:100%;height:auto;background:white;color:' + ink +
      '" font-family="Arial, sans-serif" fill="' + ink + '">' + content + '</svg>';
  }

  function scaleBar(x, y) {
    const end = x + 5 * sourceBar.width / sourceBar.micrometres;
    return '<g data-worked-scale="5"><line x1="' + x + '" y1="' + y + '" x2="' + end + '" y2="' + y +
      '" stroke="' + ink + '" stroke-width="3" stroke-linecap="butt"/><text x="' + (end + 10) + '" y="' +
      (y + 6) + '" font-size="19">5 µm</text></g>';
  }

  function observationSvg() {
    const content = '<svg x="6" y="35" width="' + crop[2] + '" height="' + crop[3] + '" viewBox="' + crop.join(" ") +
      '" overflow="hidden"><image href="' + imagePath + '" width="780" height="590"/></svg>';
    return frame(516, 374, "Light micrograph of a Wright–Giemsa-stained tiger frog blood smear. One whole, oblique pink cell fills the centre. A smaller dark purple region lies within it. The bar represents five micrometres.",
      '<text x="14" y="24" font-weight="bold" font-size="19">Tiger frog blood smear under a light microscope</text>' +
      content + scaleBar(24, 354));
  }

  function leader(label, targetX, y) {
    return '<g data-worked-label="' + label + '"><line x1="' + targetX + '" x2="377" y1="' + y + '" y2="' + y +
      '" stroke="' + ink + '" stroke-width="1.35"/><text x="384" y="' + (y + 6) + '" font-size="19">' + label + '</text></g>';
  }

  function modelSvg() {
    const outlines = '<g fill="none" stroke="' + ink + '" stroke-width="2.2" stroke-linejoin="round">' +
      '<path data-worked-contour="cell" d="' + cell + '"/><path data-worked-contour="nucleus" d="' + nucleus + '"/></g>';
    const drawing = '<g transform="translate(6 35)">' + outlines + leader("Cell boundary", 310, 71) +
      leader("Nucleus", 233, 146) + leader("Cytoplasm", 300, 216) + '</g>';
    return frame(516, 374, "Drawing of the stained tiger frog erythrocyte in the photograph. The larger oblique contour encloses a smaller oval nucleus. Labels identify the cell boundary, nucleus and surrounding cytoplasm. The bar represents five micrometres.",
      '<text x="14" y="24" font-weight="bold" font-size="19">Wright–Giemsa-stained tiger frog erythrocyte</text>' +
      drawing + scaleBar(24, 354));
  }

  window.ALevelDrawingWorked = {
    name: "Tiger frog erythrocyte",
    observe: "Follow the edge of the one whole cell in this blood smear. Compare its long axis with its width, then locate the dark region within it.",
    decide: "Which edges can you follow all the way round? Decide what to draw inside the cell and what the stain leaves uncertain.",
    steps: [
      "Trace the slightly tilted outer edge with one continuous pencil line. Leave out the fragments of neighbouring cells at the edge of the photograph.",
      "The dark purple nucleus lies near the centre, slightly to the left. Its width along the page is about a third of the cell’s. Outline it once and leave the lighter cytoplasm unshaded.",
      "The stain lets you distinguish nucleus from cytoplasm. It does not resolve the identity of every patch of colour. Leave out a nucleolus, chromosomes and other structures whose boundaries you cannot identify here.",
      "Write the labels together beside the cell. Use a ruler to take each line to its feature without crossing another label line. Stop the nucleus line at its edge and the cytoplasm line in the pale region. Add a title naming the specimen and preparation. If asked to annotate it, explain how staining helps you identify the nucleus.",
      "The published 10 µm bar spans 255 source pixels. The 5 µm bar shown here spans half that distance. On paper, compare the same dimension of your cell with the photograph and resize the bar in the same proportion."
    ],
    observationSvg,
    modelSvg,
    credit: "https://doi.org/10.7717/peerj.13915/fig-1",
    author: "Xianxian Chen and colleagues (2022)",
    licence: "CC BY 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by/4.0/",
    alterations: "Figure 1A cropped for this observation. The 5 µm bar is derived from the authors’ 10 µm bar."
  };
})();

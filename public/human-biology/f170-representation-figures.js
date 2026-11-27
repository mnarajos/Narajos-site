/* F170 microscopy comparison uses a schematic and three independently sourced
 * images. Each image is credited at the figure; no images are to a common scale.
 * The TEM field is distinct from the pancreatic assessment specimen.
 */
(function () {
  "use strict";
  const lesson = window.KeystoneHumanLessons?.["f170/1.1.2"];
  if (!lesson) return;
  lesson.comparisonFigures = {0: [{
    src: "/human-biology/red-cell-section.svg", width: 220, height: 260, compact: true,
    alt: "A schematic section through a red blood cell shows an indented centre and dots representing haemoglobin.",
    caption: "This drawing selects a cell outline and haemoglobin for explanation. Its sizes are not to scale."
  }]};
  lesson.comparisonPhotos = {
    1: [{
      src: "/assets/micrographs/hb-skeletal-striated.webp", width: 1200, height: 800,
      alt: "A stained longitudinal section of skeletal muscle shows long parallel fibres.",
      caption: "Notice the parallel fibres in this light micrograph of right fibularis longus (HPS stain). This stained section does not show living movement.",
      source: "https://commons.wikimedia.org/wiki/File:Skeletal_striated_muscle.jpg", credit: "Nephron", licence: "CC BY-SA 3.0",
      licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/", changes: "Full frame resized and converted to WebP."
    }],
    2: [{
      src: "/assets/micrographs/hb-blood-cells-sem.webp", width: 500, height: 326,
      alt: "A colourised scanning electron micrograph shows the surfaces of a red blood cell at left, a platelet at centre and a white blood cell at right.",
      caption: "Notice the cell surfaces in this scanning electron micrograph. Colour was added; these are prepared cells.",
      source: "https://commons.wikimedia.org/wiki/File:Red_White_Blood_cells.jpg", credit: "Electron Microscopy Facility, NCI-Frederick", licence: "Public domain (US government work)",
      licenceUrl: "https://commons.wikimedia.org/wiki/Template:PD-USGov", changes: "Converted to WebP; no crop."
    }, {
      src: "/assets/micrographs/hb-lung-mitochondrion-tem.webp", width: 640, height: 480,
      alt: "A transmission electron micrograph of a thin section of mammalian lung tissue shows internal membranes of a mitochondrion. The original scale bar is 50 nanometres.",
      caption: "Compare the internal membranes of this mitochondrion in a thin section of mammalian lung. The original scale bar is 50 nm.",
      source: "https://commons.wikimedia.org/wiki/File:Mitochondria_-_TEM.jpg", credit: "Louisa Howard", licence: "Public domain (author release)",
      licenceUrl: "https://commons.wikimedia.org/wiki/Template:PD-author", changes: "Converted to WebP; full original frame retained."
    }]
  };
})();

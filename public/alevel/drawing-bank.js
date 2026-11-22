/* Original schematic observations and candidate drawings, with controlled task-specific defects. */
(function () {
  "use strict";
  const categories = [
    "Line quality",
    "Shading",
    "Biological detail",
    "Proportions",
    "Identification and presentation",
    "Scale",
  ];
  const specimens = [
    {
      id: "leaf",
      name: "Leaf transverse section",
      type: "plan",
      width: 1000,
      label: "Palisade tissue",
      target: [180, 63],
      shape:
        '<path d="M40 40Q180 24 320 40V155Q180 169 40 155Z"/><path d="M40 54Q180 38 320 54M40 85Q180 69 320 85M40 143Q180 157 320 143"/>',
    },
    {
      id: "stem",
      name: "Dicot stem transverse section",
      type: "plan",
      width: 2000,
      label: "Vascular bundle",
      target: [259, 101],
      shape:
        '<ellipse cx="180" cy="100" rx="105" ry="78"/><ellipse cx="180" cy="100" rx="88" ry="63"/>' +
        Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            '<ellipse cx="' +
            (180 + 73 * Math.cos(a)) +
            '" cy="' +
            (100 + 49 * Math.sin(a)) +
            '" rx="10" ry="12"/>'
          );
        }).join(""),
    },
    {
      id: "root",
      name: "Young dicot root transverse section",
      type: "plan",
      width: 1200,
      label: "Cortex",
      target: [244, 100],
      shape:
        '<ellipse cx="180" cy="100" rx="96" ry="77"/><ellipse cx="180" cy="100" rx="42" ry="40"/><path d="M174 66H186V94H214V106H186V134H174V106H146V94H174Z"/>',
    },
    {
      id: "artery",
      name: "Artery transverse section",
      type: "plan",
      width: 800,
      label: "Muscular wall",
      target: [244, 100],
      shape:
        '<ellipse cx="180" cy="100" rx="95" ry="76"/><ellipse cx="180" cy="100" rx="77" ry="61"/><ellipse cx="180" cy="100" rx="46" ry="36"/>',
    },
    {
      id: "onion",
      name: "Onion epidermal cells",
      type: "cell",
      width: 300,
      label: "Nucleus",
      target: [105, 111],
      shape:
        '<rect x="60" y="40" width="120" height="115" rx="5"/><rect x="180" y="40" width="120" height="115" rx="5"/><rect x="71" y="51" width="98" height="93" rx="8"/><rect x="191" y="51" width="98" height="93" rx="8"/><ellipse cx="105" cy="111" rx="9" ry="13"/><ellipse cx="265" cy="78" rx="9" ry="13"/>',
    },
    {
      id: "cheek",
      name: "Cheek epithelial cell",
      type: "cell",
      width: 60,
      label: "Nucleus",
      target: [175, 101],
      shape:
        '<path d="M79 75Q78 30 139 29Q181 12 233 42Q296 52 289 110Q283 166 219 169Q161 187 108 149Q61 126 79 75Z"/><ellipse cx="175" cy="101" rx="22" ry="25"/>',
    },
    {
      id: "yeast",
      name: "Budding yeast cells",
      type: "cell",
      width: 12,
      label: "Cell wall",
      target: [230, 111],
      shape:
        '<ellipse cx="180" cy="103" rx="53" ry="63"/><ellipse cx="230" cy="53" rx="26" ry="31"/><ellipse cx="180" cy="103" rx="46" ry="56"/><ellipse cx="230" cy="53" rx="19" ry="24"/>',
    },
  ];
  const variants = [[], [0], [1], [2], [3], [4], [5], [0, 1]];
  const feedback = [
    "Repeated or overlapping strokes spoil the single clear outline. Several examples still belong to one line-quality category.",
    "The shaded or hatched region breaks the stated requirement for an unshaded line drawing.",
    "The tissue plan adds individual cells, or the cell drawing omits structures clearly visible in the reference. Match the requested level of detail.",
    "The drawing is stretched vertically relative to its width. Compare its aspect ratio and boundary proportions with the reference observation.",
    "The label line ends at the wrong structure or misses the structure. Labels must identify the feature they actually reach.",
    "The scale label represents twice the length justified by the reference. The same drawn length must represent the same real length.",
  ];
  const bank = specimens.flatMap((specimen, si) =>
    variants.map((defects, vi) => ({
      id: specimen.id + "-" + vi,
      specimen,
      defects,
      criterion:
        "Draw an unshaded " +
        (specimen.type === "plan"
          ? "low-power tissue plan showing tissue boundaries without individual cells"
          : "drawing showing the cell boundaries and internal structures visible in the reference") +
        ". Preserve relative sizes. Label " +
        specimen.label.toLowerCase() +
        " and include a correctly calibrated scale bar. Use single, clear outlines.",
      why: defects.length
        ? defects.map((i) => feedback[i]).join(" ")
        : "The candidate meets the stated requirements. Clear outlines, appropriate detail, relative sizes, the requested label and the calibrated scale all agree with this reference.",
    })),
  );
  function svg(item, reference = false) {
    const s = item.specimen,
      d = reference ? [] : item.defects;
    let shape = s.shape;
    if (d.includes(2)) {
      if (s.type === "plan")
        shape += Array.from(
          { length: 16 },
          (_, i) =>
            '<rect x="' +
            (103 + (i % 8) * 19) +
            '" y="' +
            (66 + Math.floor(i / 8) * 18) +
            '" width="18" height="17"/>',
        ).join("");
      else if (s.id === "yeast")
        shape = shape.replace(/<ellipse cx="230"[^>]+\/>/g, "");
      else shape = shape.replace(/<ellipse[^>]+\/>/g, "");
    }
    if (d.includes(3))
      shape = '<g transform="translate(0 -13) scale(1 1.45)">' + shape + "</g>";
    const shadow = d.includes(0)
      ? '<g transform="translate(3 2)">' +
        shape +
        '</g><path d="M78 69l18-21 22-9"/>'
      : "";
    const shading = d.includes(1)
      ? Array.from(
          { length: 12 },
          (_, i) => '<path d="M' + (120 + i * 8) + ' 70l-13 31"/>',
        ).join("")
      : "";
    const tx = d.includes(4) ? [180, 185] : s.target;
    const scale = (s.width / 4) * (d.includes(5) ? 2 : 1);
    const desc = reference
      ? "Reference observation of " +
        s.name +
        ". The labelled feature is " +
        s.label +
        ". The scale bar represents " +
        s.width / 4 +
        " micrometres."
      : "Candidate " +
        s.name +
        ". " +
        (d.includes(0)
          ? "Some outlines have repeated displaced strokes. "
          : "Single outlines. ") +
        (d.includes(1) ? "There are diagonal hatch marks. " : "Unshaded. ") +
        (d.includes(2)
          ? s.type === "plan"
            ? "Individual cell outlines are added. "
            : "Internal ellipse structures are omitted. "
          : "The visible boundaries match the reference. ") +
        (d.includes(3)
          ? "The drawing is stretched vertically relative to its width. "
          : "Relative sizes match the reference. ") +
        "The " +
        s.label +
        " label " +
        (d.includes(4)
          ? "ends in blank space below the specimen"
          : "reaches the indicated structure") +
        ". The scale bar has the same displayed length as the reference and is labelled " +
        scale +
        " micrometres.";
    return (
      '<svg viewBox="0 0 360 245" role="img" aria-label="' +
      desc +
      '"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round">' +
      shape +
      shadow +
      shading +
      '<path d="M310 17H328L' +
      tx[0] +
      " " +
      tx[1] +
      '"/><path d="M75 219H145M75 215V223M145 215V223"/></g><text x="310" y="12" text-anchor="end">' +
      s.label +
      '</text><text x="110" y="239" text-anchor="middle">' +
      scale +
      " µm</text></svg>"
    );
  }
  window.ALevelDrawingBank = { bank, categories, svg };
})();

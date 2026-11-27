/* Original teaching models for F170 organelle evidence. Review references:
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * https://www.ncbi.nlm.nih.gov/books/NBK9889/
 * https://www.ncbi.nlm.nih.gov/books/NBK9897/
 * Models are simplified; the destination pattern is the lesson's fictional example.
 */
(function () {
  "use strict";
  const lesson = window.KeystoneHumanLessons?.["f170/1.1.3.evidence"];
  if (!lesson) return;
  const figure = (file, height, alt, caption) => ({src: "/human-biology/" + file + ".svg", width: 280, height, compact: true, alt, caption});
  const assembly = figure("f170-ribosome-assembly", 310,
    "The nucleolus in the nucleus makes ribosomal RNA and assembles ribosome subunits. Subunits leave through a nuclear pore and can join on messenger RNA to make a polypeptide.",
    "Follow the subunits from nucleolus through a nuclear pore, then find them joining on mRNA. The drawing simplifies the assembly and translation processes.");
  const types = figure("f170-ribosome-types", 320,
    "Human cytoplasmic ribosomes are 80S both free and attached to rough ER. Typical bacterial ribosomes are 70S. Human mitochondrial ribosomes are a distinct type.",
    "Compare type and location: an ER-bound human cytoplasmic ribosome remains 80S. S describes sedimentation; these symbols are not a size comparison.");
  const er = figure("cell-er-comparison", 320,
    "Rough ER has ribosomes attached on its cytoplasmic surface and receives proteins. Smooth ER lacks attached ribosomes and makes many lipids.",
    "Compare the outer surfaces of the two ER regions. The rough ER dots represent attached ribosomes; smooth ER makes many lipids.");
  const routing = figure("cell-protein-routing", 370,
    "A protein made on rough ER moves to the Golgi in a vesicle. The Golgi sorts proteins toward a lysosome or a secretory vesicle and the cell exterior.",
    "Follow the route from rough ER through the Golgi, then compare destinations. Intermediate compartments are omitted from this schematic.");
  const misrouting = figure("f170-enzyme-misrouting", 320,
    "The fictional enzyme is present in rough ER and Golgi. Little is detected in lysosomes and much more than usual appears outside the cell, consistent with misdirected delivery.",
    "Compare the two destinations after the Golgi: the arrow widths describe the fictional finding. This pattern does not identify the specific sorting molecule that failed.");
  lesson.explainDiagrams = {...lesson.explainDiagrams, 0: [assembly], 1: [types], 2: [er, routing]};
  lesson.modelDiagrams = {...lesson.modelDiagrams, 0: routing, 1: misrouting};
})();

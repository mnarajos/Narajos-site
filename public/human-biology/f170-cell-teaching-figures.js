/* Original F170 teaching schematics. The simplified relationships were checked
 * against the OCR Human Biology specification (F170):
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * and reference explanations of cell counting and protein routing:
 * https://pubmed.ncbi.nlm.nih.gov/31676576/
 * https://pmc.ncbi.nlm.nih.gov/articles/PMC4911306/
 * https://www.ncbi.nlm.nih.gov/books/NBK9889/
 * https://www.ncbi.nlm.nih.gov/books/NBK9897/
 * Schematics are original and not to scale. No measured results are implied.
 */
(function () {
  "use strict";
  const lessons = window.KeystoneHumanLessons;
  if (!lessons) return;
  const figure = (file, height, alt, caption) => ({
    src: "/human-biology/" + file + ".svg", width: 280, height, compact: true, alt, caption
  });
  const chamber = figure("cell-counting-chamber", 300,
    "A chamber has a ruled counting grid and a cover glass above the chamber floor. Grid area multiplied by the known liquid depth gives the sampled volume.",
    "Locate the counted grid area and the chamber depth. Their product gives the volume represented by the count; the cells are schematic.");
  const impedance = figure("cell-counting-impedance", 320,
    "Particles in conducting liquid pass an aperture between electrodes, producing impedance pulses. The pulse count estimates particle count and pulse height relates to particle volume.",
    "Follow particles through the aperture, then read the illustrative pulses over time. Electrical pulses alone do not show whether a particle is alive.");
  const clumps = figure("cell-counting-clumps", 300,
    "Two separated cells can generate two pulses; a clump of two cells can generate one pulse. An electrical pulse does not establish whether cells are viable.",
    "Compare separate cells with a clump. A clump can be counted as one event, while debris may also be counted as a particle.");
  const nucleus = figure("cell-nucleus-traffic", 300,
    "A nucleus contains DNA and a nucleolus within a double nuclear envelope. Messenger RNA and ribosome subunits pass through a nuclear pore into the cytoplasm.",
    "Locate the DNA and nucleolus, then follow the arrows through a pore. The nucleolus makes ribosomal RNA and assembles ribosome subunits; details are simplified.");
  const mitochondrion = figure("cell-mito-protein-import", 300,
    "Nuclear DNA provides instructions via messenger RNA for proteins made by cytoplasmic ribosomes; many such proteins are imported into mitochondria. Mitochondrial DNA encodes some proteins, and mitochondria supply ATP.",
    "Follow instructions from nuclear DNA to a cytoplasmic ribosome and protein import. The mitochondrion also contains its own DNA; only a small fraction of its proteins are encoded there.");
  const er = figure("cell-er-comparison", 320,
    "Rough ER has ribosomes attached to its cytoplasmic surface and receives proteins. Smooth ER lacks attached ribosomes and makes many lipids. Human cytoplasmic ribosomes are 80S; typical bacterial ribosomes are 70S.",
    "Compare the surfaces of rough and smooth ER. The S values describe sedimentation behaviour, not a simple measurement of size.");
  const routing = figure("cell-protein-routing", 370,
    "A protein made on rough ER is carried in a vesicle to the Golgi. The Golgi modifies and sorts proteins; one route goes toward a lysosome and another uses a secretory vesicle to release protein outside the cell.",
    "Follow the rough ER to the Golgi, then compare the lysosomal and secretory routes. The drawing omits intermediate compartments and is not to scale.");
  const synthesis = figure("cell-nucleus-rer", 310,
    "Messenger RNA carrying instructions leaves the nucleus. A ribosome on the cytoplasmic surface of rough ER makes a polypeptide that enters the ER lumen and can fold.",
    "Follow the mRNA instructions to an attached ribosome, then the polypeptide into rough ER. The drawing is simplified.");
  const blocked = figure("cell-secretion-failure", 320,
    "In one view a protein-containing vesicle fuses with the cell surface and releases its contents. In the other view surface fusion is blocked, vesicles collect inside and less protein is released.",
    "Compare normal surface fusion with blocked fusion. Accumulation inside the cell can locate a fault late in the pathway.");

  const counting = lessons["f170/1.1.2.counting"];
  if (counting) {
    counting.explainDiagrams = {...counting.explainDiagrams, 0: [chamber], 1: [impedance]};
    counting.modelDiagrams = {...counting.modelDiagrams, 0: chamber, 1: clumps};
  }
  const organelles = lessons["f170/1.1.3"];
  if (organelles) {
    organelles.explainDiagrams = {...organelles.explainDiagrams, 0: [nucleus], 1: [mitochondrion], 2: [er], 3: [routing]};
    organelles.modelDiagrams = {...organelles.modelDiagrams, 0: synthesis, 1: routing, 2: blocked};
  }
})();

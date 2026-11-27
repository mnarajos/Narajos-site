/* Original F170 membrane schematics, not to scale. Course scope was checked
 * against OCR's membrane topic (including extrinsic receptor sites):
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Structure and cholesterol conventions were checked against:
 * https://www.ncbi.nlm.nih.gov/books/NBK9898/
 * https://www.ncbi.nlm.nih.gov/books/NBK26871/
 */
(function () {
  "use strict";
  const lessons = window.KeystoneHumanLessons;
  if (!lessons) return;
  const figure = (file, height, alt, caption) => ({src: "/human-biology/" + file + ".svg", width: 280, height, compact: true, alt, caption});
  const oxygen = figure("f170-oxygen-diffusion", 290,
    "A respiring cell has more oxygen per volume outside than inside. Oxygen crosses its lipid bilayer both ways; a thicker arrow shows more crossing into the cell.",
    "Compare oxygen on each side and follow both arrows. More enters than leaves, so the net movement is inward; dots are an illustrative model.");
  const channel = figure("f170-channel-diffusion", 290,
    "A permeant solute is more concentrated on the left than on the right. It crosses both ways through a channel protein, with net movement towards the lower concentration.",
    "Follow the arrows through the channel. More solute crosses down the concentration gradient; facilitated diffusion does not require ATP from the channel.");
  const waterActive = figure("f170-water-active", 340,
    "Water crosses a partially permeable membrane both ways, with net movement from higher to lower water potential. A separate ion moves from lower to higher concentration through a transporter using energy.",
    "Compare the two movements: Ψ means water potential. Water crosses both ways, with net movement down its water-potential gradient; the ion goes against its concentration gradient using energy.");
  const membrane = figure("f170-membrane-labelled", 365,
    "Membrane cross-section. 1 is a phospholipid head facing water, 2 is cholesterol among the inward-pointing tails with its polar tip near the heads, 3 is a carbohydrate chain facing outside on a glycoprotein, and 4 is a peripheral protein on the cytoplasmic surface. Oxygen crosses the lipid core and a horizontal arrow shows lateral movement.",
    "Locate 1–4 and compare the outer and inner faces. Tails point inward; cholesterol’s polar tip sits near the heads. The arrows indicate oxygen diffusion through the lipid and lateral movement. Structures are not to scale.");
  const receptor = figure("f170-receptor-signalling", 300,
    "An external signal binds an accessible site on a membrane-spanning receptor and can trigger a response inside the cell. A separate peripheral protein is attached to the cytoplasmic surface.",
    "Follow the signal to its receptor, then the response arrow into the cell. The inner peripheral protein is a separate example; receptors need not all span the membrane.");
  const extrinsic = figure("f170-extrinsic-receptor", 300,
    "A signal binds a receptor associated with the outer surface of a membrane. In this simplified example a separate spanning partner relays a response into the cell.",
    "Compare this surface-associated receptor with the spanning receptor above. A coupled partner can relay a signal; other arrangements are possible.");
  const antigen = figure("f170-antigen-recognition", 320,
    "An immune cell encounters a donor-cell surface. The diagram indicates an outer carbohydrate chain, a surface antigen and an immune-cell receptor. Differences in donor antigens can trigger a response.",
    "Locate the chain on the outside, then compare antigen and immune-cell receptor. A response can damage a graft; the drawing is a simplified encounter.");
  const vesicles = figure("f170-vesicle-traffic", 340,
    "Endocytosis encloses material in an inward-moving vesicle. In exocytosis an internal vesicle fuses with the surface and releases material outside.",
    "Follow the cargo in each example: the membrane encloses it on the way in, while fusion releases it on the way out. The two views are schematic stages.");
  const cholesterol = figure("f170-cholesterol-membrane", 405,
    "Cholesterol lies among phospholipid tails. At body temperature it can restrain nearby motion and reduce leakage; at low temperature it can limit tight packing of tails.",
    "Locate cholesterol among the tails. Horizontal arrows show lateral movement; downward arrows show tracer leakage. Compare the illustrative changes at body temperature and the packing effect at low temperature.");

  const transport = lessons["f170/1.1.4"];
  if (transport) {
    transport.explainDiagrams = {...transport.explainDiagrams, 0: [oxygen, channel], 1: [waterActive]};
    transport.modelDiagrams = {...transport.modelDiagrams, 0: oxygen, 1: oxygen, 2: oxygen};
  }
  const surface = lessons["f170/1.1.4.surface"];
  if (surface) {
    surface.explainDiagrams = {...surface.explainDiagrams, 0: [membrane], 1: [receptor, extrinsic], 2: [antigen], 3: [vesicles]};
    surface.modelDiagrams = {...surface.modelDiagrams, 0: membrane, 1: cholesterol, 2: membrane};
  }
})();

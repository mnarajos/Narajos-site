/* Original schematic teaching models, checked against the OCR Human Biology specification
 * F170 sections 1.1.1 and 1.2.2:
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Supporting descriptions: https://pubmed.ncbi.nlm.nih.gov/21035933/
 * https://pubmed.ncbi.nlm.nih.gov/15591243/
 * These diagrams simplify cell arrangements; they are not to scale.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f170/1.1.1.surfaces'];
  if (!lesson) return;
  const figure = (name, height, alt, caption) => ({src: '/human-biology/' + name + '.svg', width: 280, height, compact: true, alt, caption});
  const surfaces = figure('f170-surface-comparison', 495,
    'Microvilli increase the membrane area facing a lumen. Cilia extend from a lining and move mucus along it. A thin alveolar lining lies between air and blood, providing a short diffusion path.',
    'Compare movement at each surface: microvilli increase area for transport, cilia move material along the lining, and gas diffuses across a thin alveolar barrier. Diagrams are not to scale.');
  const tubule = figure('f170-tubule-transport', 395,
    'At the filtrate-facing brush border of a proximal tubule cell, sodium and glucose enter together. A sodium pump uses ATP to move sodium out towards tissue fluid; glucose also leaves the cell towards the blood.',
    'Follow Na⁺ and glucose from filtrate into the cell, then towards tissue fluid. The ATP-powered sodium pump maintains a gradient that supports glucose uptake; potassium movement and other transporters are omitted.');
  const limits = figure('f170-tubule-limits', 380,
    'Two tubule cells face filtrate. One has a reduced brush border and less membrane for transport; the other retains its brush border but has little ATP for sodium pumping.',
    'Compare the two changes. Either reduced brush-border area or impaired ATP-dependent pumping can limit reabsorption.');
  const liver = figure('f170-hepatocyte-features', 395,
    'A simplified hepatocyte contains ribosome-studded rough ER, smooth ER without ribosomes and glycogen granules. An arrow indicates proteins made on rough ER can be sent out of the cell.',
    'Locate rough and smooth ER and the stored glycogen. The route for protein secretion is simplified; the Golgi and vesicles are omitted.');
  const stomach = figure('f170-gastric-mucus', 355,
    'In a gastric surface mucous cell, vesicles fuse at the exposed surface and release mucus. The mucus layer retains bicarbonate and helps protect cells from acid and enzymes in the lumen.',
    'Follow the vesicle to the exposed cell surface. Mucus retains bicarbonate, helping protect the lining from stomach acid and digestive enzymes.');
  const cilia = figure('f170-cilia-movement', 330,
    'Cilia on the tracheal lining move mucus and trapped particles towards the throat. Cilia in the oviduct help move an oocyte towards the uterus.',
    'Follow the arrows along each lining. Oviduct muscle contractions also help move the oocyte; the views are simplified.');
  const alveolus = figure('f170-alveolar-barrier', 295,
    'Oxygen diffuses from alveolar air across a thin alveolar cell and capillary wall into blood; carbon dioxide diffuses the other way.',
    'Follow oxygen to blood and carbon dioxide to the air. The layers are enlarged and separated for clarity.');
  lesson.explainDiagrams = {...lesson.explainDiagrams, 0: [surfaces]};
  lesson.comparisonFigures = {...lesson.comparisonFigures, 0: [tubule], 1: [liver], 2: [cilia], 3: [alveolus], 4: [stomach]};
  lesson.modelDiagrams = {...lesson.modelDiagrams, 0: tubule, 1: tubule, 2: limits};
}());

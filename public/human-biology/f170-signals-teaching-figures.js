/* Original schematic photoreceptor figures; reflex and myelin figures are reused.
 * OCR Human Biology F170 1.1.1 includes rods, cones and sensory, relay and motor neurones:
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Structure, pigments and retinal pathways reviewed against:
 * https://openstax.org/books/anatomy-and-physiology-2e/pages/14-1-sensory-perception
 * https://www.nei.nih.gov/research-and-training/research-news/study-uncovers-novel-synaptic-intricacies-inside-retina
 * The simplified pathways do not show all retinal interneurones.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f170/1.1.1.signals'];
  if (!lesson) return;
  const figure = (file, width, height, alt, caption) => ({src:'/human-biology/' + file + '.svg', width, height, compact:true, alt, caption});
  const receptors = figure('f170-rod-cone-structure', 280, 380,
    'A rod has a cylindrical outer segment and a cone a tapering outer segment. Lines represent layers of membrane containing light-sensitive pigments. Both cells connect to other retinal cells.',
    'Compare the lined outer segments at the top. Their membranes contain visual pigment; three human cone types differ in wavelength sensitivity. The cells are simplified and not to scale.');
  const reflex = figure('reflex-pathway', 220, 320,
    'A pathway runs from a receptor along a sensory neurone to synapses and a relay neurone in the spinal cord, then along a motor neurone to a muscle effector.',
    'Follow sensory input to the spinal cord, then the relay and motor output to muscle. This is a withdrawal reflex, not a retinal circuit.');
  const myelin = figure('myelinated-axon', 280, 270,
    'A schematic axon has myelin-covered sections separated by nodes of Ranvier; current spreads under the myelin and action potentials regenerate at the nodes.',
    'Notice the myelin-covered regions and the gaps between them. Myelin speeds conduction along many long axons.');
  const convergence = figure('f170-retinal-convergence', 280, 465,
    'Several rod inputs converge on one shared retinal output, so responses can combine but location is less precise. Two idealised foveal cone inputs have separate outputs, preserving finer spatial detail.',
    'Compare shared rod output with separate cone outputs. These idealised circuits show the trade-off in dim-light sensitivity and spatial detail; retinal connections are more complex.');
  lesson.explainDiagrams = {...lesson.explainDiagrams, 0:[receptors, convergence], 1:[reflex, myelin]};
  lesson.modelDiagrams = {...lesson.modelDiagrams, 0:reflex, 1:reflex, 2:convergence};
}());

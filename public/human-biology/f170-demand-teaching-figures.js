/* Focused supplements for two worked-stage gaps in F170.
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * https://openstax.org/books/anatomy-and-physiology-2e/pages/22-4-gas-exchange
 * https://openstax.org/books/anatomy-and-physiology-2e/pages/10-6-exercise-and-muscle-performance
 * Both drawings are conceptual and contain no measured pressures or rates.
 */
(function () {
  'use strict';
  const lessons = window.KeystoneHumanLessons;
  if (!lessons) return;
  const figure = (file,height,alt,caption) => ({src:'/human-biology/'+file+'.svg',width:280,height,compact:true,alt,caption});
  const gradient = figure('f170-alveolar-gradient',340,
    'Ventilation renews alveolar air. Oxygen partial pressure is higher in the air than in incoming capillary blood, so net oxygen diffusion is into blood.',
    'Compare oxygen partial pressures on each side of the barrier. Ventilation helps maintain the gradient; the layers are enlarged for clarity.');
  const demand = figure('f170-muscle-oxygen-demand',380,
    'More muscle contractions increase ATP demand. If aerobic respiration increases, muscle oxygen demand can rise.',
    'Follow the increased ATP demand to aerobic respiration and oxygen demand. This conceptual model does not state a measured rate.');
  const gas = lessons['f170/2.1.3'];
  if (gas) gas.modelDiagrams = {...gas.modelDiagrams,0:gradient};
  const exercise = lessons['f170/2.2.2'];
  if (exercise) exercise.modelDiagrams = {...exercise.modelDiagrams,0:demand};
}());

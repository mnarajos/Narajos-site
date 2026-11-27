/* Original chemical-synapse schematic. OCR F176 3.1 and OpenStax A&P 12.5:
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * https://openstax.org/books/anatomy-and-physiology-2e/pages/12-5-communication-between-neurons
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f176/a2']; if(!lesson)return;
 const synapse={src:'/human-biology/f176-synapse-stages.svg',width:320,height:365,compact:true,assessmentSensitive:true,
  alt:'At a chemical synapse, an action potential reaches the presynaptic terminal. Calcium enters through a channel; this helps vesicles fuse and release neurotransmitter into the synaptic cleft. Transmitter diffuses across and binds to receptors on the postsynaptic cell. The effect on firing depends on receptors and other inputs.',
  caption:'Follow the signal from the arriving action potential to calcium entry, vesicle fusion and transmitter binding. The postsynaptic effect depends on the receptor and other inputs; the drawing is simplified.'};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:synapse,1:synapse,2:synapse,3:synapse,4:synapse};
}());

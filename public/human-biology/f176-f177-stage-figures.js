/* Keep reviewed nervous-system diagrams beside the worked stage they explain.
 * OCR Human Biology F176 §3.1: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * OpenStax A&P: https://openstax.org/books/anatomy-and-physiology-2e/pages/12-5-communication-between-neurons
 */
(function () {
 'use strict';
 const lessons=window.KeystoneHumanLessons || {};
 for (const id of ['f176/a1','f176/a3']) {
  const lesson=lessons[id]; if (!lesson?.teachingDiagram) continue;
  const stage={...lesson.teachingDiagram,assessmentSensitive:true};
  lesson.modelDiagrams={...lesson.modelDiagrams,0:stage,1:stage};
 }
 const synapse=lessons['f176/a2'];
 if(synapse){
  const figure={src:'/human-biology/f176-synapse-stages.svg',width:320,height:365,compact:true,assessmentSensitive:true,
   alt:'At a chemical synapse, an action potential reaches the presynaptic terminal. Calcium enters through a channel; this helps vesicles fuse and release neurotransmitter into the synaptic cleft. Transmitter crosses and binds receptors on the postsynaptic cell. The effect depends on receptors and other inputs.',
   caption:'Follow the signal from the arriving action potential to calcium entry, vesicle fusion and transmitter binding. The postsynaptic effect depends on the receptor and other inputs; the drawing is simplified.'};
  synapse.explainDiagrams={...synapse.explainDiagrams,0:[...(synapse.explainDiagrams?.[0]||[]),figure]};
 }
}());

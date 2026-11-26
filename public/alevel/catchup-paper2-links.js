/* Reuse course diagrams beside the relevant Paper 2 synoptic notes. */
(function () {
 "use strict";
 const draw = (name, topic, id, group) => window[name]?.render(topic,id,group) || '';
 window.ALevelPaper2Links = {render(topic,id,group) {
  if(topic !== 'a8') return '';
  switch(id+'/'+group) {
   case 'linkp2/0':
    return draw('ALevelRegulationFigures','a6','secondmsg',0)
      +draw('ALevelRegulationFigures','a6','secondmsg',1)
      +draw('ALevelGeneControlFigures','a8','transfac',1);
   case 'linkp2/1':
    return draw('ALevelGeneTechniques','a8','mut8',0)
      +draw('ALevelCatchupFigures','a4','natsel',0)
      +draw('ALevelEnergyMechanismFigures','a5','chemios',1);
   case 'wordp2/0':
    return draw('ALevelRegulationFigures','a6','secondmsg',0)
      +draw('ALevelEnergyMechanismFigures','a6','adh',1)
      +draw('ALevelEnergyNeuralFigures','a6','actionpot',0);
   case 'wordp2/1':
    return draw('ALevelMuscleFigures','a6','sliding',1)
      +draw('ALevelMuscleFigures','a6','sliding',2)
      +draw('ALevelEnergyRecapFigures','a5','traps5',0);
   default: return '';
  }
 }};
})();

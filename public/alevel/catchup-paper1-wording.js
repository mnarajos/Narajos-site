/* Reuse the figures that directly explain Paper 1 terminology. */
(function () {
 "use strict";
 const draw = (name,topic,id,group) => window[name]?.render(topic,id,group) || '';
 function select(html,title) {
  return (html.match(/<figure\b[\s\S]*?<\/figure>/g)||[])
   .find(figure => figure.includes(`<strong>${title}</strong>`)) || '';
 }
 window.ALevelPaper1Wording={render(topic,id,group) {
  if(topic!=='a4' || id!=='wordp1')return '';
  if(group===0)return draw('ALevelCatchupFigures','a3','digestion',0)
    +draw('ALevelCatchupFigures','a2','micro',0);
  if(group===1)return select(draw('ALevelBiomoleculeExtraFigures','a1','enzymes',0),'An enzyme–substrate complex')
    +select(draw('ALevelCellReuseFigures','a2','traps2',2),'Antibodies bind antigens');
  return '';
 }};
})();

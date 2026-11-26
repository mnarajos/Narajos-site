/* Reuse the compact alveolar barrier beside its matching gas-exchange notes. */
(function () {
 "use strict";
 window.ALevelCompactLungs={render(topic,id,group){
  if(topic!=='a3'||id!=='lungs'||group!==1)return '';
  const html=window.ALevelExchangeExtraFigures?.render('a3','lungs',0)||'';
  return (html.match(/<figure\b[\s\S]*?<\/figure>/g)||[])
   .find(figure=>figure.includes('<strong>A short diffusion path</strong>'))||'';
 }};
})();

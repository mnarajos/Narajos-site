/* Reuse the concise tumour comparison beside the cell-cycle recap. */
(function () {
 "use strict";
 window.ALevelMitosisCancer={render(topic,id,group){
  if(topic!=='a2'||id!=='mitosis'||group!==2)return '';
  const html=window.ALevelGeneTechniques?.render('a8','cancer',0)||'';
  return (html.match(/<figure\b[\s\S]*?<\/figure>/g)||[])
   .find(figure=>figure.includes('<strong>Localised and invasive growth</strong>'))||'';
 }};
})();

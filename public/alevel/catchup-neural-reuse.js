/* Keep previously reviewed diagrams beside the later explanations they support. */
(function () {
 "use strict";
 window.ALevelNeuralReuse={render(topic,id,group){
  if(topic!=='a6')return '';
  if(id==='traps6'&&group===3)return window.ALevelCardiacFigures?.render('a6','heartrate',1)||'';
  return '';
 }};
})();

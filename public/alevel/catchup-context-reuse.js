/* Reuse reviewed explanations beside related teaching facts. */
(function () {
 "use strict";
 window.ALevelContextReuse={render(topic,id,group){
  if(topic==='a2'&&id==='phago'&&group===1){
   const figures=window.ALevelAntigenBonds?.render('a4','linkp1',1)||'';
   return (figures.match(/<figure\b[\s\S]*?<\/figure>/g)||[]).find(f=>f.includes('<strong>A gene change can alter an antigen</strong>'))||'';
  }
  if(topic==='a7'&&id==='varsel'&&group===1)return window.ALevelCatchupFigures?.render('a4','natsel',0)||'';
  if(topic==='a3'&&id==='absorption'&&group===2)return window.ALevelIleumAdaptations?.render('a2','active',1)||'';
  if(topic==='a8'&&id==='fragments'&&group===0){
   const figures=window.ALevelGeneRecapFigures?.render('a8','ctx8',1)||'';
   return (figures.match(/<figure\b[\s\S]*?<\/figure>/g)||[]).find(f=>f.includes('<strong>From a gene to intron-free cDNA</strong>'))||'';
  }
  if(topic==='a8'&&id==='cancer'&&group===1)return window.ALevelGeneControlFigures?.render('a8','transfac',1)||'';
  if(topic==='a7'&&id==='traps7'&&group===1)return window.ALevelSelectionFrequency?.render('a7','varsel',2)||'';
  return '';
 }};
})();

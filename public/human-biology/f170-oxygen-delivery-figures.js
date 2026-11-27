/* Original oxygen-delivery and ventilation models; arrows indicate relationships,
 * not measured rates. Ventilation values are the lesson's fictional example.
 * OCR F170 2.1.2, 2.1.3 and 2.2.2–2.2.3: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 */
(function(){
 'use strict';
 const lessons=window.KeystoneHumanLessons;
 if(!lessons)return;
 const fig=(file,height,alt,caption)=>({src:'/human-biology/'+file+'.svg',width:280,height,compact:true,alt,caption});
 const delivery=fig('f170-oxygen-delivery',380,'Air moves in and out of an alveolus. Oxygen diffuses from alveolar air to blood, is carried on haemoglobin and leaves blood for a respiring tissue cell.','Follow oxygen from alveolar air into blood and on to a respiring cell. Ventilation, diffusion and blood flow are distinct parts of the route. This is a schematic, not to scale.');
 const alveolus=fig('f170-alveolar-barrier',295,'Oxygen diffuses from alveolar air across a thin alveolar cell and capillary wall into blood; carbon dioxide diffuses in the opposite direction.','Follow oxygen into blood. A thin barrier supports diffusion; layers are enlarged for clarity.');
 const ventilation=fig('f170-ventilation-example',270,'A worked example multiplies 0.50 litres per breath by 12 breaths per minute to give 6.0 litres of air per minute.','Read the units through the multiplication. This describes air moved, not oxygen absorbed.');
 const gas=lessons['f170/2.1.3'];
 if(gas){gas.explainDiagrams={...gas.explainDiagrams,0:[delivery]};gas.modelDiagrams={...gas.modelDiagrams,1:alveolus,2:delivery};}
 const interaction=lessons['f170/2.2.2'];
 if(interaction){interaction.explainDiagrams={...interaction.explainDiagrams,0:[delivery]};interaction.modelDiagrams={...interaction.modelDiagrams,1:alveolus,2:delivery};}
 const peak=fig('peak-flow-method',330,'A schematic mouth seals around a peak-flow meter mouthpiece. An arrow shows a forceful outward blow through the meter, and an indicator moves along a scale.','Follow the forced blow through the meter. Reset and repeat acceptable blows, then record the highest reading; the scale is illustrative.');
 const measure=lessons['f170/2.2.3'];
 if(measure){measure.explainDiagrams={...measure.explainDiagrams,0:[ventilation],1:[peak]};measure.modelDiagrams={...measure.modelDiagrams,0:ventilation,1:ventilation,2:delivery};}
})();

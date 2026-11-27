/* Orientate the worked example even when the learner opens it directly. */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f175/a2'];
 if(!lesson?.explainDiagrams?.[0]?.[0] || !lesson?.explainDiagrams?.[1]?.[1])return;
 const orientation=lesson.explainDiagrams[0][0], many=lesson.explainDiagrams[1][0], villus=lesson.explainDiagrams[1][1];
 lesson.modelDiagrams={...lesson.modelDiagrams,
  0:[
   {...orientation,caption:'Locate the placenta and umbilical cord. The dashed box marks the area shown in figure 2.'},
   {...many,caption:'Figure 2 turns the selected section so the foetal side is at the top. Maternal blood surrounds the villi; foetal vessels are inside. Only a few villi are shown. The dashed box marks the villus shown in figure 3.'},
   {...villus,caption:'Figure 3 enlarges the marked villus. Locate maternal blood around it and the foetal capillary inside; the barrier is exaggerated.'}
  ],
  1:{...villus,caption:'Follow the oxygen arrow across the barrier into the foetal capillary. The arrow shows net transfer.'},
  2:{...villus,caption:'Compare the oxygen and carbon dioxide arrows. The gases move across the barrier in opposite directions.'}
 };
}());

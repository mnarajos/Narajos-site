/* Orientate the worked example even when the learner opens it directly. */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f175/a2'];
 if(!lesson?.explainDiagrams?.[0]?.[0] || !lesson?.explainDiagrams?.[1]?.[0])return;
 const orientation=lesson.explainDiagrams[0][0], villus=lesson.explainDiagrams[1][0];
 lesson.modelDiagrams={...lesson.modelDiagrams,
  0:[
   {...orientation,caption:'Locate the placenta and umbilical cord before following exchange in the enlarged view below.'},
   {...villus,caption:'Locate maternal blood around the villus. The foetal capillary lies inside it; the barrier is exaggerated.'}
  ],
  1:{...villus,caption:'Follow the oxygen arrow across the barrier into the foetal capillary. The arrow shows net transfer.'},
  2:{...villus,caption:'Compare the oxygen and carbon dioxide arrows. The gases move across the barrier in opposite directions.'}
 };
}());

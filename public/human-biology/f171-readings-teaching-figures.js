/* The plotted observations are the fictional values in the F171/4.2.2 lesson.
 * An unrecorded reading has no plotted point. Different circumstances limit
 * comparisons; the diagram does not claim the walking caused the difference.
 */
(function () {
  'use strict';
  const lesson = window.KeystoneHumanLessons?.['f171/4.2.2'];
  if (!lesson) return;
  const figure = {src:'/human-biology/f171-pressure-readings.svg',width:280,height:365,compact:true,
    alt:'A dot plot shows the fictional systolic readings. Visit 1, rested: 136, 134 and 135 millimetres of mercury. Visit 2, immediately after walking: 146, 145 and 147. Visit 3, rested: 135 and 134; one reading is missing. The readings at each visit are close, but the conditions differ between visits.',
    caption:'Compare the separate dots, then read the conditions. Visits 1 and 3 were rested; visit 2 followed walking. The absent third value at visit 3 is unknown and is not plotted.'};
  lesson.modelDiagrams = {...lesson.modelDiagrams,0:figure,1:figure,2:figure};
}());

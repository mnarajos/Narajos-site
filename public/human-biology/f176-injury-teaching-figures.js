/* F176 injury and function: original schematic plus existing pathway diagram.
 * OCR specification: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NINDS brain basics: https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-know-your-brain
 * A fictional illustration is not a scan and cannot identify an individual's cause.
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f176/a4'];if(!lesson)return;
 const injury={src:'/human-biology/f176-coordination-injury.svg',width:280,height:320,compact:true,assessmentSensitive:true,
  alt:'A schematic side view of the brain locates the cerebellum, a region involved in coordination. A mark near it represents the location of a fictional injury. A coordination difficulty is consistent with disrupted circuits but is not proven to be caused by that location alone.',
  caption:'Locate the marked injury near the cerebellum. Coordination difficulty is consistent with disruption of circuits in this region, but a drawing or symptom alone cannot establish the cause.'};
 const route={src:'/human-biology/sensory-motor-route.svg',width:280,height:300,compact:true,assessmentSensitive:true,
  alt:'A simplified route shows sensory input travelling from a receptor to brain or spinal cord, and motor output travelling from the central nervous system to a muscle.',
  caption:'Follow sensory input into the central nervous system and motor output to muscle. An injury can affect one or more pathways; actual effects depend on the location.'};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[injury,route]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:injury,1:[injury,route]};
}());

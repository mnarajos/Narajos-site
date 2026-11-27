/* Original route-specific Human Biology recap diagrams, simplified and not to scale.
 * OCR F170 sections 2.1.2, 2.2.2 and 4.1.4:
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Pancreatic exocrine and endocrine functions: https://www.niddk.nih.gov/health-information/digestive-diseases/pancreatitis
 * Ideal bacterial doubling is a mathematical model; actual growth depends on conditions.
 */
(function(){
 'use strict';
 const fig=(name,height,alt,caption)=>({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,alt,caption});
 window.HumanF170SystemsGrowthRecapFigures={
  'f170/2.1.2/2':[
   fig('f170-nephron-overview',425,'Blood is filtered at a glomerulus. Some water and ions are reabsorbed into blood from the nephron; the remaining fluid and wastes continue as urine.','Follow filtration into the tubule, then reabsorption of some water and ions back to blood. Remaining fluid and wastes form urine; this overview omits secretion and detailed tubule regions.'),
   fig('f170-pancreas-two-functions',360,'Pancreatic exocrine cells release digestive enzymes into a duct leading to the small intestine. Endocrine islet cells release hormones, including insulin, into blood.','Compare the destinations: digestive enzymes enter a duct; hormones enter the blood. The two pathways are simplified.')
  ],
  'f170/2.2.2/2':[fig('f174-glucose-feedback',495,'High blood glucose leads pancreatic beta cells to release insulin, supporting uptake and storage and a fall towards the usual range. Low blood glucose leads alpha cells to release glucagon, prompting the liver to release glucose and a rise towards the usual range.','Follow either response: it opposes the initial change in blood glucose. This is one example of negative feedback; the pathways are simplified.')],
  'f170/4.1.4/2':[fig('f170-growth-media',365,'One cell produces two, four and eight cells after three ideal divisions: starting from one, the ideal count is two to the power n after n divisions. A plate contains solid agar; a tube contains liquid broth.','Follow the ideal doubling from one to eight, then compare solid agar with liquid broth. Counts are illustrative; actual growth depends on conditions and safe handling requires risk assessment.')]
 };
}());

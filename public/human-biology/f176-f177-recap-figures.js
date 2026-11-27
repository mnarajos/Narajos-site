/* Existing Human Biology teaching figures reused beside matching short recaps.
 * NHS ibuprofen: https://www.nhs.uk/medicines/ibuprofen-for-adults/
 * NHS morphine: https://www.nhs.uk/medicines/morphine/
 * These schematic diagrams and their original sources are recorded in the
 * Human Biology visual review; maps below do not represent assessment answers. */
(function () {
 'use strict';
 const fig=(name,height,alt,caption)=>({src:'/human-biology/'+name+'.svg',width:280,height,compact:true,alt,caption});
 const pituitary=fig('hypothalamus-pituitary',300,'A side-view schematic locates the hypothalamus within the brain and the pituitary below it.','Locate the hypothalamus and the pituitary below it. The hypothalamus contributes to homeostasis and influences pituitary activity.');
 const meninges=fig('meninges-csf',360,'A schematic section shows skull, dura, arachnoid, a cerebrospinal-fluid-filled subarachnoid space, pia, and brain tissue containing a ventricle with cerebrospinal fluid.','Locate the cerebrospinal fluid around the brain and within the ventricle. Protective layers are exaggerated for clarity.');
 const analgesic={...fig('f176-analgesic-pathways',415,'An NSAID reduces prostaglandin production, which can otherwise increase nociceptor sensitivity after tissue injury. An opioid acts at receptors in the brain or spinal cord to modify pain signalling. These simplified examples do not depict repair of the original injury.','Compare two examples: the bar shows an NSAID reducing prostaglandin production; opioids act on receptors in the nervous system. Pain relief does not necessarily remove the cause of pain.'),width:300};
 const antibacterial={...fig('f177-antibiotic-targets',465,'A typical bacterium has a murein wall and ribosomes, targets of some antibiotics. HIV is shown with an envelope and capsid but no murein wall or ribosomes of its own; viruses depend on host-cell machinery. Some bacteria lack a murein wall and antibiotic targets differ.','Compare the possible targets. Some antibiotics disrupt bacterial wall synthesis or ribosomes; viruses do not have these structures. Targets differ between antibiotics and some bacteria lack a murein wall.'),width:300};
 const synapse={...fig('f176-synapse-stages',365,'At a chemical synapse an action potential reaches the presynaptic terminal; calcium enters, helping vesicles fuse and release neurotransmitter. The transmitter crosses the cleft and binds postsynaptic receptors.','Follow transmitter release across the cleft to receptors. The postsynaptic effect depends on the receptor and other inputs.'),width:320};
 window.HumanF176F177RecapFigures={
  'f176/a1/1':[['f176/a1','explanationDiagram'],pituitary],
  'f176/a1/2':[meninges],
  'f176/a2/1':[['f170/3.2.1','myelinDiagram']],
  'f176/a2/2':[synapse],
  'f176/a3/0':[['f176/a3','teachingDiagram']],
  'f176/a3/2':[analgesic],
  'f176/a4/1':[['f176/a4','explainDiagrams',0]],
  'f176/a4/2':[['f176/a5','modelDiagrams',1]],
  'f176/a5/0':[['f176/a5','modelDiagrams',0]],
  'f176/a5/1':[['f176/a5','modelDiagrams',1]],
  'f177/a1/1':[antibacterial],
  'f177/a2/0':[['f177/a3','explainDiagrams',0],['f177/a3','modelDiagrams',1]],
  'f177/a2/1':[['f177/a2','explainDiagrams',0]],
  'f177/a3/1':[['f177/a3','modelDiagrams',1],['f177/a3','modelDiagrams',2]]
 };
}());

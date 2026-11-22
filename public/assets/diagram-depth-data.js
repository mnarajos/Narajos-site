const part=(x,y,cue,name,role)=>({x,y,cue,name,role});
const label=(parts,feedback)=>({type:"label",prompt:"Put each label where its line ends.",parts,feedback});
const match=(prompt,assignments,feedback)=>({type:"label",prompt,parts:Object.keys(assignments),assignments,feedback});
const point=(prompt,answer,feedback)=>({type:"point",prompt,answer,feedback});
const choice=(prompt,options,answer,feedback)=>({type:"choice",prompt,options,answer,feedback});
const order=(prompt,items,feedback)=>({type:"order",prompt,items,feedback});
const number=(prompt,answer,unit,feedback)=>({type:"number",prompt,answer,unit,feedback});
const written=(prompt,points)=>({type:"written",prompt,points});
const topic=(group,title,cue,states,parts,questions)=>({group,title,cue,states,parts,questions});

export const depthTopics={
 thermoregulation:topic("Human Biology F170","Heat loss through the skin","Switch conditions and compare blood flow near the skin surface and the presence of sweat.",[
  ["skin-warm","Too warm","More blood flows near the surface. Evaporation of sweat increases heat transfer to the surroundings.","Widened vessels run near the surface. Sweat reaches the skin."],
  ["skin-cool","Too cold","Less blood flows near the surface, reducing heat loss. Sweating decreases.","Narrowed vessels run under the skin. No sweat is shown."]
 ],{
  A:part(220,104,"Outer edge next to the air","Skin surface","Sweat evaporates from here."),
  B:part(306,246,"Coiled structure with a duct to the surface","Sweat gland","Secretes sweat."),
  C:part(281,193,"Red vessel below the outer layers","Blood vessel","Blood carries energy towards the surface.")
 },[
  match("Match each role to the part of the skin.",{A:"Where evaporation cools the skin",B:"Produces sweat",C:"Carries warm blood near the surface"},"The gland produces sweat. Evaporation at the surface cools the skin."),
  point("Which structure secretes sweat?","B","Follow the duct from the coiled gland."),
  order("Order the changes when a person is too warm.",["Core temperature rises","The hypothalamus coordinates a response","Blood flow near the skin surface increases","More energy transfers from blood to the surroundings"],"The response helps return core temperature towards its usual level."),
  choice("Two people sweat at the same rate. Why might the person in more humid air cool less?",["Their sweat evaporates more slowly","Their sweat contains no water","Humid air prevents blood flowing to the skin"],0,"Cooling depends on evaporation. Humid air can slow evaporation."),
  written("Explain why skin can go pale in a cold environment.",["Vasoconstriction reduces blood flow near the skin surface.","Less blood near the surface can make the skin appear paler and reduce heat loss."])
 ]),
 cycle:topic("Human Biology F170","Hormone patterns across the menstrual cycle","Compare the narrow mid-cycle LH peak with the broader progesterone rise after ovulation.",[
  ["cycle-curves","Illustrative cycle","Solid orange shows LH, dashed blue shows FSH, solid green shows oestrogen and dashed purple shows progesterone. Cycle length and timing can vary.","Typical relative hormone patterns across 28 illustrative days. Orange peaks sharply around day 14, green peaks earlier and dashed purple peaks later."]
 ],{
  A:part(311,62,"Sharp orange peak close to day 14","LH surge","Triggers ovulation."),
  B:part(268,124,"Green curve peaking just before day 14","Oestrogen rise","Oestrogen supports the rebuilding of the uterine lining."),
  C:part(423,149,"Broad dashed purple curve highest after day 14","Progesterone rise","Progesterone helps maintain the uterine lining.")
 },[
  label(["A","B","C"],"Compare the timing and shape of the peaks."),
  point("Identify the surge that triggers ovulation.","A","The LH surge occurs close to ovulation."),
  order("Order the changes around ovulation.",["A follicle develops","Oestrogen rises","LH surges","Ovulation takes place","Progesterone rises"],"The LH surge precedes ovulation. The progesterone rise follows it."),
  choice("Progesterone falls late in a cycle without pregnancy. What follows?",["The uterine lining is shed","Ovulation immediately occurs again","A fertilised egg implants"],0,"The fall in progesterone removes support for maintaining the lining."),
  written("Why is the LH surge more informative about ovulation than the calendar reaching day 14?",["Cycle length and timing vary.","The LH surge is linked to the mechanism of ovulation."])
 ]),
 screening:topic("Human Biology F171","Interpreting screening results","Read the screening result across rows and the actual condition down columns.",[
  ["screening-grid","Fictional results","Of 200 people, 28 screened positive. A separate assessment established who actually had the condition.","Positive row: 16 with the condition and 12 without it. Negative row: 4 with the condition and 168 without it."]
 ],{
  A:part(206,153,"Positive row, condition-present column","True positive","Screened positive and had the condition."),
  B:part(438,153,"Positive row, condition-absent column","False positive","Screened positive without having the condition."),
  C:part(206,252,"Negative row, condition-present column","False negative","Screened negative despite having the condition."),
  D:part(438,252,"Negative row, condition-absent column","True negative","Screened negative and did not have the condition.")
 },[
  label(["A","B","C","D"],"Compare the screening result with the actual condition."),
  point("Select the people the screening test missed.","C","Four people had the condition despite screening negative."),
  number("Among the 20 people with the condition, what percentage screened positive?",80,"%","16 ÷ 20 × 100 = 80%."),
  number("Among the 28 people with a positive result, how many did not have the condition?",12,"people","Read the positive row and condition-absent column."),
  written("A second test misses fewer cases but produces more false positives. Explain one benefit and one drawback.",["More people with the condition are found.","More people without the condition may need a further assessment."])
 ]),
 distillation:topic("GCSE Combined Science","Simple distillation of salt solution","Follow vapour through the inner tube. Trace a separate route for cooling water.",[
  ["simple-distillation","Distillation apparatus","Cooling water enters the lower jacket connection and leaves at the upper connection. The thermometer bulb is by the sidearm.","A heated flask and thermometer connect to an inclined condenser, which drains into an open receiver."]
 ],{
  A:part(124,106,"Thermometer at the sidearm","Thermometer bulb","Measures the vapour temperature near the entrance to the condenser."),
  B:part(295,171,"Inclined tube with an outer cooling jacket","Condenser","Transfers energy away from vapour."),
  C:part(470,303,"Liquid in the receiving beaker","Distillate","Liquid collected after condensation.")
 },[
  label(["A","B","C"],"Distinguish the thermometer, cooler and collected liquid."),
  point("Where does water vapour condense?","B","Condensation takes place inside the inner condenser tube."),
  order("Follow water through the setup.",["Water evaporates in the flask","Vapour enters the condenser","Water condenses in the inner tube","Liquid collects in the beaker"],"The vapour and cooling water move through separate spaces."),
  choice("What stays behind when water distils from salt solution?",["The dissolved salt","The cooling water","All the water and all the salt"],0,"Under these conditions water passes over as vapour while salt stays in the flask."),
  written("Predict what happens to collection if cooling water stops flowing.",["The condenser removes energy less effectively as it warms.","Less vapour condenses in the condenser, so less liquid may collect."])
 ]),
 refraction:topic("KS3","Trace light through a glass block","Compare the angle between the ray and the dashed normal at each surface.",[
  ["glass-ray","Air, glass, air","The ray bends towards the normal entering glass and away from it leaving glass. The emerging ray is parallel to the incoming ray.","A red ray passes into a glass block between air regions. It is nearer the vertical normal inside the block."]
 ],{
  A:part(224,99,"Ray in air before it reaches the block","Incident ray","Approaches the first surface."),
  B:part(304,193,"Ray within the glass","Refracted ray","Travels at a smaller angle to the normal in glass."),
  C:part(421,305,"Ray in air after it leaves the block","Emergent ray","Leaves the second surface."),
  D:part(272,160,"Dashed line perpendicular to the first surface","Normal","Angles of incidence and refraction are measured from this line.")
 },[
  label(["A","B","C","D"],"Follow the arrows and distinguish the dashed reference line."),
  point("Which line is used when measuring the angle of incidence?","D","Angles are measured to the normal."),
  choice("A ray enters along the normal. What happens to its direction at the surface?",["It continues along the normal","It bends by 90°","It turns back towards the source"],0,"At normal incidence its speed can change while its direction stays the same."),
  written("Describe how the first and last rays compare.",["They have the same direction and slope.","They are offset because the ray travelled in a different direction inside the glass."])
 ]),
 synapse:topic("A-level Biology","Transmission across a cholinergic synapse","Follow the signal from the terminal to the receiving membrane.",[
  ["synapse-rest","Impulse arrives","An action potential opens voltage-gated calcium channels in the presynaptic membrane.","A presynaptic terminal has vesicles. Receptors below it face a narrow gap."],
  ["synapse-release","Transmitter crosses","Calcium entry triggers vesicle fusion. Released acetylcholine diffuses across the cleft and binds to receptors.","Neurotransmitter moves across a narrow space towards receptors."]
 ],{
  A:part(116,116,"Round sac inside the terminal","Synaptic vesicle","Contains acetylcholine."),
  B:part(179,203,"Space between the two membranes","Synaptic cleft","Acetylcholine diffuses through it."),
  C:part(181,227,"Shape in the receiving membrane","Postsynaptic receptor","Binds acetylcholine.")
 },[
  match("Place each process where it happens.",{A:"Stores acetylcholine before release",B:"Acetylcholine crosses by diffusion",C:"Acetylcholine binds here"},"The electrical signal leads to chemical transmission across the gap."),
  point("Where does acetylcholine bind after release?","C","Receptors in the postsynaptic membrane bind it."),
  order("Order the events leading to postsynaptic depolarisation.",["Action potential reaches the terminal","Voltage-gated calcium channels open","Calcium entry triggers vesicle fusion","Acetylcholine binds to receptors and sodium enters"],"Calcium acts at the presynaptic terminal and sodium entry depolarises the receiving membrane."),
  choice("Presynaptic calcium channels are blocked. What happens to transmitter release?",["It decreases","It increases","It stays the same because the arriving action potential remains"],0,"Less calcium entry leads to less vesicle fusion."),
  written("Explain why inhibiting acetylcholinesterase can prolong the response.",["Acetylcholine is broken down more slowly.","It can bind to receptors for longer.","Sodium entry and depolarisation may persist."])
 ]),
 trolley:topic("Focused Writing","A fair test of force and acceleration","Trace the string to the hanging mass. Locate the device used to measure motion.",[
  ["trolley-force","Trolley, pulley and hanging mass","Transferring masses from the trolley to the hanger varies the weight of the hanger while keeping the total moving mass constant.","A trolley on a track is connected over a pulley to a hanging mass. A motion sensor faces the trolley."]
 ],{
  A:part(96,140,"Device pointing towards the trolley","Motion sensor","Supplies data about the trolley's motion."),
  B:part(242,112,"Blocks on top of the trolley","Removable masses","Can be transferred to the hanger."),
  C:part(513,267,"Mass hanging from the string","Hanger","Its weight provides the driving force.")
 },[
  match("Match each role to the equipment.",{A:"Measure the motion",B:"Transfer pieces to vary force",C:"Provides the pulling force"},"Transfer mass within the moving system."),
  point("Which part pulls the string down?","C","The hanging weight provides the driving force."),
  choice("Which change increases the pulling force while total moving mass stays constant?",["Add extra mass from the bench","Move a mass from the trolley to the hanger","Take a mass off the trolley and put it on the bench"],1,"Transferring the mass keeps it inside the moving system."),
  written("Justify moving a mass from trolley to hanger.",["The hanging weight and driving force rise.","The total moving mass stays the same.","This helps isolate the effect of force on acceleration."])
 ]),
 inheritance:topic("GCSE Combined Science","An inheritance grid for two carriers","Follow the row and column headings to work out the two alleles in each outcome.",[
  ["inheritance-grid","Ff × Ff","Each offspring inherits one allele from each parent. In this example cystic fibrosis occurs when both inherited alleles are recessive.","A two-by-two Punnett grid with F and f across the top and F and f down the side."]
 ],{
  A:part(253,130,"Top-left box below F and beside F","FF","Two dominant alleles."),
  B:part(423,130,"Top-right box below f and beside F","Ff","One dominant and one recessive allele."),
  C:part(253,247,"Bottom-left box below F and beside f","Ff","A second heterozygous outcome."),
  D:part(423,247,"Bottom-right box below f and beside f","ff","Two recessive alleles.")
 },[
  match("Match each description to its homozygous outcome.",{A:"Homozygous dominant",D:"Homozygous recessive"},"The diagonal corners pair the same allele from both parents."),
  point("Select the outcome associated with cystic fibrosis.","D","The affected genotype in this cross is ff."),
  number("What percentage of offspring are expected to be unaffected carriers?",50,"%","Two of four outcomes are Ff."),
  choice("The first child is affected. What is the probability that the next child is affected?",["0%","25%","50%"],1,"The grid applies again to the next fertilisation."),
  written("Explain why being unaffected is more likely than being an unaffected carrier.",["FF and Ff are unaffected.","Only Ff is an unaffected carrier."])
 ])
};

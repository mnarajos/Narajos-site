/* Original teaching schematics and carefully matched internal simulation links.
   Supplementary to the key ideas, never exam artwork or assessed coursework evidence. */
(function(){
"use strict";
var palettes={teal:"#1d7469",blue:"#386ba8",orange:"#b66f24",purple:"#7657aa"};
function svg(description,inner,height){
 return '<svg viewBox="0 0 480 '+height+'" role="img" aria-label="'+description+'" xmlns="http://www.w3.org/2000/svg">'+inner+'</svg>';
}
function box(x,y,w,h,fill){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="12" fill="'+fill+'" stroke="#c3d2d2" stroke-width="1.6"/>';}
function text(x,y,string,size,weight,colour,anchor){
 return '<text x="'+x+'" y="'+y+'" font-family="system-ui, sans-serif" font-size="'+(size||17)+'" font-weight="'+(weight||600)+'" fill="'+(colour||"#233e4c")+'" text-anchor="'+(anchor||"middle")+'">'+string+'</text>';
}
function arrow(x1,y1,x2,y2,color){
 return '<path d="M'+x1+' '+y1+' L'+x2+' '+y2+'" stroke="'+(color||"#477184")+'" stroke-width="2.8" fill="none" stroke-linecap="round"/><path d="M'+(x2-8)+' '+(y2-5)+' L'+x2+' '+y2+' L'+(x2-8)+' '+(y2+5)+'" fill="none" stroke="'+(color||"#477184")+'" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>';
}
var diagrams={
 organisation:{
  label:"Levels of biological organisation",
  caption:"Cells form tissues; different tissues together form an organ. Organs cooperate in organ systems.",
  image:svg("Four levels of organisation in increasing order: cell, tissue, organ, organ system.",
   [14,134,254,374].map(function(x,i){return box(x,60,92,67,["#e5f3ec","#e9f1fc","#fff0df","#eee9f9"][i]);}).join("")+
   ["Cell","Tissue","Organ","System"].map(function(t,i){return text(60+120*i,99,t,16,700);}).join("")+
   arrow(107,93,130,93)+arrow(227,93,250,93)+arrow(347,93,370,93)+
   text(240,161,"A tissue is more than one cell; an organ contains multiple tissue types.",13,500),
   185)
 },
 condensation:{
  label:"Condensation and hydrolysis",
  caption:"Condensation forms a covalent link and releases water; hydrolysis uses water to break that link.",
  image:svg("Condensation: A-OH and H-B form A-B and water. Hydrolysis reverses the reaction.",
   box(18,20,444,76,"#e4f2ed")+text(240,42,"CONDENSATION",14,800,palettes.teal)+text(240,76,"A–OH + H–B   →   A–B + H₂O",20,700)+
   box(18,109,444,76,"#fff0e0")+text(240,131,"HYDROLYSIS",14,800,palettes.orange)+text(240,165,"A–B + H₂O   →   A–OH + H–B",20,700),
   205)
 },
 enzyme:{
  label:"Substrate concentration and enzyme activity",
  caption:"At fixed enzyme concentration, the initial rate eventually levels off as enzyme active sites become saturated.",
  image:svg("Graph of initial reaction rate against substrate concentration. The rate rises steeply then approaches a plateau at high substrate concentration.",
   '<path d="M65 22V185H455" stroke="#344958" stroke-width="3" fill="none"/>'+
   '<path d="M78 172C120 120 158 83 217 62S335 46 436 45" stroke="'+palettes.teal+'" stroke-width="5" stroke-linecap="round" fill="none"/>'+
   '<path d="M260 45H439" stroke="'+palettes.orange+'" stroke-width="2" stroke-dasharray="5 5" fill="none"/>'+
   text(280,211,"Substrate concentration",16,600)+
   '<text x="23" y="118" transform="rotate(-90 23 118)" fill="#344958" font-family="system-ui" font-size="15" font-weight="600" text-anchor="middle">Initial rate</text>'+
   text(350,34,"Plateau",14,700,palettes.orange)+text(240,236,"Fixed enzyme concentration · schematic, not experimental data",12,500),
   250)
 },
 dna:{
  label:"Semi-conservative DNA replication",
  caption:"Each daughter DNA molecule contains one original template strand and one newly synthesised strand.",
  image:svg("Before replication there are two original strands. After replication there are two DNA molecules, each with one original and one newly made strand.",
   text(85,30,"Parent DNA",17,700)+text(327,30,"Two daughter DNA molecules",17,700)+
   '<path d="M65 53V153M84 53V153" stroke="'+palettes.blue+'" stroke-width="8" stroke-linecap="round"/>'+
   arrow(119,104,178,104)+
   '<path d="M232 53V153" stroke="'+palettes.blue+'" stroke-width="8" stroke-linecap="round"/>'+
   '<path d="M251 53V153" stroke="'+palettes.orange+'" stroke-width="8" stroke-linecap="round"/>'+
   '<path d="M377 53V153" stroke="'+palettes.orange+'" stroke-width="8" stroke-linecap="round"/>'+
   '<path d="M396 53V153" stroke="'+palettes.blue+'" stroke-width="8" stroke-linecap="round"/>'+
   '<path d="M232 65h19M232 89h19M232 113h19M232 137h19M377 65h19M377 89h19M377 113h19M377 137h19M65 65h19M65 89h19M65 113h19M65 137h19" stroke="#a8b8bf" stroke-width="2"/>'+
   '<path d="M195 190h30" stroke="'+palettes.blue+'" stroke-width="6"/>'+text(258,195,"Original",14,600,"#344958","start")+
   '<path d="M195 214h30" stroke="'+palettes.orange+'" stroke-width="6"/>'+text(258,219,"New",14,600,"#344958","start"),
   238)
 },
 expression:{
  label:"Gene expression in eukaryotes",
  caption:"A DNA template is transcribed into pre-mRNA, introns are removed to make mature mRNA, and ribosomes translate its codons.",
  image:svg("Eukaryotic gene expression: DNA is transcribed to pre-mRNA, which is spliced to mRNA, which is translated to a polypeptide.",
   box(10,55,102,57,"#e9effb")+box(135,55,102,57,"#e7f5ee")+box(260,55,102,57,"#f8ebf8")+box(385,55,85,57,"#fff0df")+
   text(61,89,"DNA",19,800)+text(186,89,"pre-mRNA",15,700)+text(311,89,"mRNA",19,800)+text(427,89,"Protein",16,700)+
   arrow(115,82,132,82)+arrow(240,82,257,82)+arrow(365,82,382,82)+
   text(125,40,"Transcription",12,500)+text(250,133,"Splicing",12,500)+text(389,40,"Translation",12,500)+
   text(235,177,"Eukaryotic cells: RNA processing occurs before translation.",14,500),
   201)
 },
 photosynthesis:{
  label:"Two stages of photosynthesis",
  caption:"Light-dependent reactions generate ATP and reduced NADP; these support carbon fixation in the Calvin cycle.",
  image:svg("Light and water support light-dependent reactions in the thylakoid membranes, generating oxygen, ATP and reduced NADP. ATP and reduced NADP support the Calvin cycle in the stroma where carbon dioxide is fixed.",
   box(16,65,198,88,"#e4f1fa")+box(266,65,198,88,"#e9f4e4")+
   text(115,90,"Light-dependent",18,700)+text(115,113,"reactions",18,700)+text(115,138,"Thylakoid membranes",13,500)+
   text(365,92,"Calvin cycle",18,700)+text(365,117,"Stroma",14,500)+
   arrow(218,104,263,104)+text(242,42,"ATP + reduced NADP",13,600)+
   text(113,47,"Light + H₂O in",13,600)+text(365,47,"CO₂ in",13,600)+
   text(113,186,"O₂ released",14,600,palettes.blue)+text(365,186,"Triose phosphate produced",14,600,palettes.teal),
   209)
 },
 respiration:{
  label:"Stages of aerobic respiration",
  caption:"Glycolysis occurs in the cytoplasm. The link reaction and Krebs cycle occur in the mitochondrial matrix; oxidative phosphorylation takes place at the inner membrane.",
  image:svg("Simplified sequence: glycolysis in cytoplasm, then link reaction and Krebs cycle in mitochondrial matrix, then oxidative phosphorylation at inner mitochondrial membrane.",
   box(11,55,141,91,"#eef3ff")+box(169,55,141,91,"#e7f5ee")+box(327,55,141,91,"#fff0df")+
   text(81,83,"Glycolysis",17,700)+text(81,110,"Cytoplasm",13,500)+
   text(239,79,"Link + Krebs",16,700)+text(239,106,"Matrix",13,500)+
   text(397,77,"Oxidative",16,700)+text(397,99,"phosphorylation",15,700)+text(397,124,"Inner membrane",12,500)+
   arrow(154,100,166,100)+arrow(312,100,324,100)+
   text(240,178,"O₂ is the final electron acceptor in the electron transport chain.",13,500),
   198)
 },
 heart:{
  label:"The cardiac cycle",
  caption:"Pressure changes open and close valves as the heart passes through atrial systole, ventricular systole and diastole.",
  image:svg("Cardiac-cycle overview: atrial systole fills ventricles, ventricular systole ejects blood, and diastole allows chambers to relax and refill.",
   box(8,54,148,95,"#e6f3f0")+box(166,54,148,95,"#fce8eb")+box(324,54,148,95,"#ecedfa")+
   text(82,77,"Atrial",17,700)+text(82,97,"systole",17,700)+text(82,123,"Atria contract",13,500)+
   text(240,77,"Ventricular",17,700)+text(240,97,"systole",17,700)+text(240,123,"Blood ejected",13,500)+
   text(398,86,"Diastole",17,700)+text(398,115,"Chambers relax",13,500)+
   text(240,184,"Valve opening depends on pressure differences.",14,600),
   205)
 },
 reflex:{
  label:"Reflex arc",
  caption:"A reflex response follows a defined pathway from receptor to effector. Sensory and motor neurones communicate through the CNS.",
  image:svg("Reflex arc: stimulus detected by receptor; sensory neurone sends impulses into CNS where synaptic processing occurs; motor neurone carries impulses to effector.",
   box(12,52,100,76,"#edf3ff")+box(135,52,100,76,"#e7f4ef")+box(258,52,100,76,"#f2eafa")+box(381,52,87,76,"#fff0df")+
   text(62,81,"Receptor",16,700)+text(62,104,"detects",13,500)+
   text(185,76,"Sensory",16,700)+text(185,96,"neurone",16,700)+
   text(308,76,"CNS",16,700)+text(308,101,"synapse(s)",12,500)+
   text(424,77,"Motor",15,700)+text(424,99,"neurone",15,700)+
   arrow(114,89,132,89)+arrow(237,89,255,89)+arrow(360,89,378,89)+
   text(240,163,"Motor neurone then activates an effector (muscle or gland).",14,600),
   187)
 },
 vaccines:{
  label:"Vaccination and immune memory",
  caption:"Different vaccines present antigens or instructions for producing them. The ensuing adaptive immune response can form memory cells.",
  image:svg("Vaccine antigen or genetic instructions lead to specific immune activation and memory B and T cells; later exposure may provoke a faster response.",
   box(12,55,137,83,"#e9f1fd")+box(171,55,137,83,"#e6f4ee")+box(330,55,138,83,"#f1ebfa")+
   text(80,81,"Vaccine",18,700)+text(80,106,"antigen / instructions",12,500)+
   text(239,82,"Adaptive",17,700)+text(239,104,"response",17,700)+
   text(399,82,"Memory B",16,700)+text(399,103,"and T cells",16,700)+
   arrow(151,94,168,94)+arrow(310,94,327,94)+
   text(240,177,"Later exposure may trigger a faster, specific response.",14,600),
   200)
 },
 reproduction:{
  label:"Female reproductive anatomy (schematic)",
  caption:"The oviduct (Fallopian tube) extends from the uterus towards the ovary; fertilisation usually occurs in an oviduct.",
  image:svg("Schematic frontal view of a uterus, cervix and vagina, with oviducts curving towards the two ovaries. The oviducts open near the ovaries rather than attaching directly to them.",
   '<path d="M188 88C168 66 126 60 91 78M293 88C312 65 361 64 390 81" stroke="#bb6c8e" stroke-width="12" stroke-linecap="round" fill="none"/>'+
   '<circle cx="83" cy="101" r="17" fill="#e9adcb" stroke="#a85d7e" stroke-width="3"/><circle cx="396" cy="103" r="17" fill="#e9adcb" stroke="#a85d7e" stroke-width="3"/>'+
   '<path d="M184 82Q240 55 296 82Q307 137 265 178H215Q173 137 184 82Z" fill="#f4cbd8" stroke="#ab5778" stroke-width="4"/>'+
   '<path d="M206 92Q240 75 274 92L260 156H220Z" fill="#fff0f4" stroke="#c58ba0" stroke-width="2"/>'+
   '<path d="M226 170V213H254V170" fill="#f4cbd8" stroke="#ab5778" stroke-width="3"/>'+
   text(53,35,"Ovary",14,600)+arrow(66,40,79,80)+
   text(360,33,"Oviduct",14,600)+arrow(361,41,344,66)+
   text(240,36,"Uterus",14,600)+arrow(240,41,240,72)+
   text(306,211,"Cervix / vagina below",13,500,"#344958"),
   239)
 }
};
var simulations={
 kinetics:{name:"Enzyme kinetics",href:"/teaching/simulations/enzyme-kinetics/"},
 inhibition:{name:"Enzyme inhibition",href:"/teaching/simulations/enzyme-inhibition/"},
 molecular:{name:"Molecular biology",href:"/teaching/simulations/molecular-biology/"},
 bioenergetics:{name:"Bioenergetics",href:"/teaching/simulations/bioenergetics/"},
 cardiac:{name:"Cardiac cycle",href:"/teaching/simulations/cardiac-cycle/"}
};
var curated={
 "a1/monopoly":{diagram:"condensation"},
 "a1/enzymes":{diagram:"enzyme",links:["kinetics"]},
 "a1/enzfactors":{diagram:"enzyme",links:["kinetics","inhibition"]},
 "a1/enzfactors2":{diagram:"enzyme",links:["inhibition"]},
 "a1/replication":{diagram:"dna",links:["molecular"]},
 "a4/transcription":{diagram:"expression",links:["molecular"]},
 "a4/translation":{diagram:"expression",links:["molecular"]},
 "a5/lightdep":{diagram:"photosynthesis",links:["bioenergetics"]},
 "a5/calvin":{diagram:"photosynthesis",links:["bioenergetics"]},
 "a5/chemios":{links:["bioenergetics"]},
 "a5/glycolysis":{diagram:"respiration",links:["bioenergetics"]},
 "a5/krebs":{diagram:"respiration",links:["bioenergetics"]},
 "a5/oxphos":{diagram:"respiration",links:["bioenergetics"]},
 "a3/heart":{diagram:"heart",links:["cardiac"]},
 "a6/heartrate":{diagram:"heart",links:["cardiac"]},
 "a6/hrcontrol":{links:["cardiac"]},
 "a6/reflex":{diagram:"reflex"},
 "a2/vaccines":{diagram:"vaccines"},
 "f170/1.1.5":{diagram:"dna",links:["molecular"]},
 "f170/1.2.1":{diagram:"organisation"},
 "f170/2.1.2":{diagram:"heart",links:["cardiac"]},
 "f170/2.2.1":{diagram:"heart",links:["cardiac"]},
 "f170/3.2.1":{diagram:"reflex"},
 "f170/3.3.1":{diagram:"reproduction"},
 "f171/a3":{diagram:"vaccines"},
 "f171/3.2.2":{diagram:"vaccines"},
 "f172/a1":{diagram:"dna"},
 "f175/a1":{diagram:"reproduction"}
};
function render(course,id){
 var item=curated[course+"/"+id];
 if(!item)return "";
 var html='<aside class="kc-catchup-extra" aria-label="Visual explanation and related simulations">';
 if(item.diagram){
  var d=diagrams[item.diagram];
  html+='<figure class="kc-visual"><div class="kc-visual-heading"><span class="kc-visual-icon" aria-hidden="true">◈</span><strong>'+d.label+'</strong></div><div class="kc-visual-art">'+d.image+'</div><figcaption>'+d.caption+'</figcaption></figure>';
 }
 if(item.links&&item.links.length){
  html+='<div class="kc-simulation-links"><p>Explore this idea in a simulation</p><div class="kc-simulation-actions">';
  item.links.forEach(function(key){
   var sim=simulations[key];
   if(sim)html+='<a href="'+sim.href+'" target="_blank" rel="noopener noreferrer" class="kc-simulation-link"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h11v11M19 5 6 18M5 9V5h6M5 14v5h5"/></svg>'+sim.name+'<span class="kc-visually-hidden"> (opens in a new tab)</span></a>';
  });
  html+='</div><small>The simulation opens in a new tab, so you can return to this key idea.</small></div>';
 }
 return html+'</aside>';
}
window.KeystoneCatchupVisuals={render:render,has:function(course,id){return !!curated[course+"/"+id];}};
})();

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
 var dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy)||1,ux=dx/len,uy=dy/len,px=-uy,py=ux;
 var ax=(x2-9*ux+5*px).toFixed(1),ay=(y2-9*uy+5*py).toFixed(1);
 var bx=(x2-9*ux-5*px).toFixed(1),by=(y2-9*uy-5*py).toFixed(1);
 return '<path d="M'+x1+' '+y1+' L'+x2+' '+y2+'" stroke="'+(color||"#477184")+'" stroke-width="2.8" fill="none" stroke-linecap="round"/><path d="M'+ax+' '+ay+' L'+x2+' '+y2+' L'+bx+' '+by+'" fill="none" stroke="'+(color||"#477184")+'" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>';
}
var diagrams={
 osmosis:{
  label:"Osmosis and water potential",
  caption:"At equal pressure, the solution with more dissolved solute has a lower water potential. Water moves in both directions; the net movement is towards the lower water potential.",
  image:svg("Two solutions at equal pressure separated by a partially permeable membrane; the left has fewer solute particles and higher water potential. Net water movement is left to right, towards lower water potential.",
   box(12,48,215,118,"#eaf5fb")+box(253,48,215,118,"#f8eaf4")+
   '<path d="M240 35V173" stroke="#45677c" stroke-width="7" stroke-dasharray="9 9"/>'+
   '<g fill="#7a56a6"><circle cx="77" cy="108" r="6"/><circle cx="138" cy="85" r="6"/><circle cx="175" cy="133" r="6"/>'+
   '<circle cx="290" cy="84" r="6"/><circle cx="317" cy="123" r="6"/><circle cx="350" cy="95" r="6"/><circle cx="395" cy="120" r="6"/><circle cx="420" cy="83" r="6"/><circle cx="436" cy="138" r="6"/></g>'+
   text(121,29,"Higher water potential",14,700)+text(364,29,"Lower water potential",14,700)+
   '<path d="M167 111H310" stroke="#15796f" stroke-width="4" stroke-linecap="round"/>'+arrow(285,111,310,111,palettes.teal)+
   text(240,194,"Net movement of water →",15,700,palettes.teal)+
   text(240,217,"Equal pressure; purple dots represent dissolved solute.",12,500),
   239)
 },
 chemiosmosis:{
  label:"Proton gradient and ATP synthase",
  caption:"H⁺ moves down its electrochemical gradient through ATP synthase, providing energy to make ATP from ADP and phosphate.",
  image:svg("A membrane separates a high proton concentration from a lower proton concentration. Protons move through ATP synthase; ADP and inorganic phosphate are converted to ATP.",
   box(16,13,448,78,"#e7f3fc")+box(16,137,448,79,"#edf6e8")+
   '<path d="M17 116H210M275 116H463" stroke="#a5aab3" stroke-width="10" stroke-linecap="round"/>'+
   '<rect x="208" y="96" width="69" height="40" rx="15" fill="#efd9ad" stroke="#b67b23" stroke-width="3"/>'+
   text(243,114,"ATP",12,800,palettes.orange)+text(243,128,"synthase",10,700,palettes.orange)+text(116,40,"High H⁺",18,800)+text(362,181,"Low H⁺",18,800)+
   '<g fill="#396da8"><circle cx="90" cy="69" r="7"/><circle cx="144" cy="69" r="7"/><circle cx="200" cy="61" r="7"/><circle cx="272" cy="65" r="7"/><circle cx="351" cy="64" r="7"/><circle cx="430" cy="67" r="7"/><circle cx="120" cy="187" r="7"/><circle cx="205" cy="191" r="7"/></g>'+
   arrow(242,78,242,149,palettes.blue)+text(240,239,"ADP + Pi → ATP",15,700,palettes.teal),
   256)
 },
 glucose:{
  label:"Blood-glucose negative feedback",
  caption:"Insulin and glucagon act in opposing directions to return blood glucose towards the regulated range.",
  image:svg("Raised blood glucose stimulates insulin secretion, encouraging glucose uptake and storage, lowering glucose. Low blood glucose stimulates glucagon, promoting glucose release from liver glycogen and raising glucose.",
   box(11,12,458,92,"#e8f3eb")+box(11,121,458,92,"#fff0e0")+
   text(93,43,"Raised glucose",17,700)+text(241,43,"Insulin",18,800,palettes.teal)+text(389,43,"Glucose falls",17,700)+
   arrow(151,56,190,56)+arrow(292,56,328,56)+
   text(240,83,"More glucose uptake and storage",13,500)+
   text(93,152,"Low glucose",17,700)+text(241,152,"Glucagon",18,800,palettes.orange)+text(389,152,"Glucose rises",17,700)+
   arrow(151,165,190,165)+arrow(292,165,328,165)+
   text(240,194,"Liver releases glucose",13,500),
   230)
 },
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
  image:svg("Graph of initial reaction rate against substrate concentration. The curve begins at the origin: zero substrate gives zero reaction rate. The rate increases then approaches a plateau at high substrate concentration.",
   '<path d="M65 22V185H455" stroke="#344958" stroke-width="3" fill="none"/>'+
   '<path d="M65 185C118 112 168 76 217 62S335 46 436 45" stroke="'+palettes.teal+'" stroke-width="5" stroke-linecap="round" fill="none"/>'+
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
  caption:"Atrial systole tops up ventricular filling; ventricular systole ejects blood. Ventricular diastole allows the ventricles to relax and fill. Atrial and ventricular relaxation overlap.",
  image:svg("Simplified cardiac-cycle sequence: atrial systole tops up ventricular filling; ventricular systole ejects blood; ventricular diastole allows ventricles to relax and fill. Atria and ventricles do not share identical contraction phases.",
   box(8,54,148,95,"#e6f3f0")+box(166,54,148,95,"#fce8eb")+box(324,54,148,95,"#ecedfa")+
   text(82,77,"Atrial",17,700)+text(82,97,"systole",17,700)+text(82,123,"Atria contract",13,500)+
   text(240,77,"Ventricular",17,700)+text(240,97,"systole",17,700)+text(240,123,"Blood ejected",13,500)+
   text(398,77,"Ventricular",16,700)+text(398,97,"diastole",16,700)+text(398,121,"Relax + fill",13,500)+
   text(240,184,"Valve opening depends on pressure differences.",14,600),
   205)
 },
 heartAnatomy:{
  label:"Heart chambers and septum",
  caption:"The right side of the heart sends blood towards the lungs and the left towards the body. The interventricular septum separates the ventricles; the myocardium is the muscular wall.",
  image:svg("Simplified frontal heart-chamber diagram: the anatomical right side is shown on the left of the image. A right atrium sits above a right ventricle, and a left atrium sits above a left ventricle. Arrows show blood passing from each atrium to its corresponding ventricle, and a vertical septum separates the ventricles.",
   text(240,24,"Front view (anatomical right appears on left)",14,600)+
   box(23,40,204,65,"#e4f1fc")+box(252,40,204,65,"#fae8eb")+
   box(23,140,204,65,"#dceaf9")+box(252,140,204,65,"#f5dadd")+
   text(125,76,"Right atrium",17,700)+text(354,76,"Left atrium",17,700)+
   text(125,176,"Right ventricle",17,700)+text(354,176,"Left ventricle",17,700)+
   arrow(125,110,125,136,palettes.blue)+arrow(354,110,354,136,palettes.orange)+
   '<path d="M240 142V211" stroke="#586575" stroke-width="7" stroke-linecap="round"/>'+
   text(240,232,"Interventricular septum",14,600)+
   text(125,261,"To lungs",14,700,palettes.blue)+text(354,261,"To body",14,700,palettes.orange),
   284)
 },
 systems:{
  label:"Organ systems work together",
  caption:"Respiratory exchange, digestive absorption and renal regulation are linked through blood circulation. This is a systems overview, not an anatomical illustration.",
  image:svg("Three organ systems are shown at the top: respiratory system exchanging oxygen and carbon dioxide, digestive system absorbing digested nutrients, and kidneys controlling water, ions and waste. Lines connect each to the circulatory system below because blood transport links their functions.",
   box(9,33,146,89,"#e5f1fc")+box(167,33,146,89,"#f0ebf9")+box(325,33,146,89,"#e9f3ea")+
   text(82,59,"Respiratory",16,700)+text(82,79,"O₂ in / CO₂ out",13,500)+
   text(240,59,"Digestive",16,700)+text(240,79,"Nutrients",13,500)+
   text(398,59,"Renal",16,700)+text(398,79,"Water and waste",12,500)+
   '<path d="M82 122L190 168M240 122V161M398 122L290 168" stroke="#6c8795" stroke-width="3" fill="none" stroke-linecap="round"/>'+
   box(145,166,190,78,"#fff0df")+text(240,193,"Circulatory",18,700)+text(240,216,"Blood transport",14,600)+
   text(240,267,"Interacting functions, not separate isolated organs",12,500),
   285)
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
  caption:"The oviducts open near the ovaries. The cervix is the lower part of the uterus, with a canal that opens into the vagina.",
  image:svg("Frontal section. The uterus opens into the central cervical canal. The cervix projects into the upper vagina. An oviduct curves from either side of the uterus to an opening near an ovary.",
   '<path d="M190 86C169 66 126 60 92 78M290 86C311 66 354 60 389 78" stroke="#aa617e" stroke-width="13" stroke-linecap="round" fill="none"/>'+
   '<path d="M190 86C169 66 126 60 92 78M290 86C311 66 354 60 389 78" stroke="#fff3f7" stroke-width="5" stroke-linecap="round" fill="none"/>'+
   '<ellipse cx="77" cy="105" rx="20" ry="14" fill="#e9adcb" stroke="#a85d7e" stroke-width="3"/><ellipse cx="403" cy="105" rx="20" ry="14" fill="#e9adcb" stroke="#a85d7e" stroke-width="3"/>'+
   '<path d="M216 183Q190 192 202 223L207 274H273L278 223Q290 192 264 183Z" fill="#edc4d5" stroke="#a35a78" stroke-width="3"/>'+
   '<path d="M220 197Q200 193 214 220Q222 244 223 274H257Q258 244 266 220Q280 193 260 197Z" fill="#fff9fc" stroke="#bf7b99" stroke-width="2"/>'+
   '<path d="M183 82Q240 51 297 82Q305 114 271 164Q260 180 262 201Q271 227 247 230H233Q209 227 218 201Q220 180 209 164Q175 114 183 82Z" fill="#f2bfd1" stroke="#98476c" stroke-width="3.5"/>'+
   '<path d="M218 176Q240 183 262 176L262 201Q271 227 247 230H233Q209 227 218 201Z" fill="#de96b6" stroke="#aa5b81" stroke-width="2"/>'+
   '<path d="M191 85Q240 79 289 85Q263 110 251 145Q244 168 244 188Q247 203 243 216L248 229H232L237 216Q233 203 236 188Q236 168 229 145Q217 110 191 85Z" fill="#fff9fc" stroke="#ad6080" stroke-width="1.8"/>'+
   text(45,40,"Ovary",15,650)+arrow(53,46,70,88)+
   text(381,36,"Oviduct",15,650)+arrow(370,42,350,65)+
   text(241,32,"Uterus",15,650)+arrow(240,39,240,64)+
   text(346,190,"Cervix",16,650)+arrow(312,185,262,190)+
   text(90,209,"Cervical canal",15,650)+arrow(148,204,237,203)+
   text(345,251,"Vagina",16,650)+arrow(308,246,276,243),
   290)
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
 "a2/osmosis":{diagram:"osmosis"},
 "a2/membrane":{diagram:"osmosis"},
 "a4/transcription":{diagram:"expression",links:["molecular"]},
 "a4/translation":{diagram:"expression",links:["molecular"]},
 "a5/lightdep":{diagram:"photosynthesis",links:["bioenergetics"]},
 "a5/calvin":{diagram:"photosynthesis",links:["bioenergetics"]},
 "a5/chemios":{diagram:"chemiosmosis",links:["bioenergetics"]},
 "a5/glycolysis":{diagram:"respiration",links:["bioenergetics"]},
 "a5/krebs":{diagram:"respiration",links:["bioenergetics"]},
 "a5/oxphos":{diagram:"chemiosmosis",links:["bioenergetics"]},
 "a3/heart":{diagram:"heart",links:["cardiac"]},
 "a6/heartrate":{diagram:"heart",links:["cardiac"]},
 "a6/hrcontrol":{links:["cardiac"]},
 "a6/reflex":{diagram:"reflex"},
 "a6/glucose":{diagram:"glucose"},
 "a2/vaccines":{diagram:"vaccines"},
 "f170/1.1.5":{diagram:"dna",links:["molecular"]},
 "f170/1.1.4":{diagram:"osmosis"},
 "f170/3.1.1":{diagram:"glucose"},
 "f170/1.2.1":{diagram:"organisation"},
 "f170/2.1.2":{diagram:"heartAnatomy",links:["cardiac"]},
 "f170/2.2.1":{diagram:"systems"},
 "f170/3.2.1":{diagram:"reflex"},
 "f170/3.3.1":{diagram:"reproduction"},
 "f171/a3":{diagram:"vaccines"},
 "f171/3.2.2":{diagram:"vaccines"},
 "f172/a1":{diagram:"dna"},
 "f175/a1":{}
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


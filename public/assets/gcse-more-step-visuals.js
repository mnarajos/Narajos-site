// Original teaching schematics. Positions, sizes and colours are illustrative.
import { arrow, blue, circle, diagram, ink, line, node, picture, rust, teal, text, airSac } from './catchup-models.js';
import { gcseStepVisuals } from './gcse-step-visuals.js';
import { gcseVisual, gcseChromatogramSetup, gcseChromatogramResult } from './gcse-catchup-visuals.js';
import { investigationFigure } from './gcse-investigation-figures.js';
import { photo } from './catchup-photos.js';
// At phone widths a 320-unit SVG is scaled down inside its card. Use an
// 18-unit label floor, then reflow individual figures where labels would overlap.
const readableLabels = art => art.replace(/font-size="(\d+)"/g, (_, size) => `font-size="${Math.max(18, Number(size))}"`);
const fig = (title,alt,art,caption,h=185) => picture(title,diagram(alt,readableLabels(art),320,h),caption);

function greenhouse() {
  return fig('Radiation and greenhouse gases',
    'Short-wave radiation from the Sun reaches and warms Earth’s surface. The surface emits infrared radiation. Greenhouse gases absorb some infrared and re-emit it in all directions, including back towards the surface.',
    circle(43,35,20,'#ffe1a2',rust)+text(43,40,'Sun',rust,14)+arrow(62,49,119,116,rust,3)+text(75,83,'Sunlight',rust,14)+
    '<path d="M0 149 Q160 91 320 149 V185 H0Z" fill="#c7e3d2" stroke="'+teal+'" stroke-width="2"/>'+
    text(161,170,'Earth’s surface',ink,15)+arrow(156,132,191,90,blue,3)+text(213,38,'Infrared',blue,14)+
    circle(199,81,10,'#dbe8f7',blue)+text(254,75,'Greenhouse',ink,13)+text(254,107,'gas',ink,13)+
    arrow(205,88,248,120,blue,2)+arrow(195,91,175,126,blue,2),
    'Follow sunlight to the surface, then infrared from the surface. The gas re-emits absorbed radiation in different directions.');
}
function filtration() {
  return fig('Filtration and sterilisation',
    'A filter retains suspended solid particles while water passes through. A separate sterilisation stage kills microbes in the filtered water. Dissolved salt passes through the filter and needs a separate desalination process.',
    '<path d="M35 28 H142 L100 83 V126 H78 V83 Z" fill="#eef5ee" stroke="'+ink+'" stroke-width="2"/>'+
    line(53,49,124,49,teal,2)+circle(75,43,4,rust)+circle(95,38,4,rust)+circle(110,43,4,rust)+
    '<path d="M65 128 H114 V166 H65 Z" fill="#d7edf4" stroke="'+ink+'" stroke-width="2"/>'+
    text(89,24,'Filter',ink,15)+text(80,181,'Filtered water',blue,14)+arrow(121,143,174,143,blue)+
    '<circle cx="231" cy="119" r="35" fill="#e6f2ed" stroke="'+teal+'" stroke-width="2"/>'+
    text(231,108,'Sterilise',teal,17)+text(231,140,'microbes',teal,16)+
    text(229,185,'Dissolved salts',ink,17)+text(229,215,'remain',ink,17),
    'The filter catches suspended particles; sterilisation acts on microbes. Removing dissolved salts requires desalination.',235);
}
function quadrat() {
  const plant=(x,y)=>'<path d="M'+x+' '+(y+5)+' v-12 m0 6 q-8-8-10-5 m10 5 q7-8 10-5" fill="none" stroke="'+teal+'" stroke-width="2"/>';
  return fig('Sampling a field',
    'On a field grid, several quadrats are placed at random coordinates to estimate overall abundance. On a separate field, quadrats are placed at regular positions along a transect from a hedge to compare abundance with distance.',
    '<rect x="10" y="34" width="135" height="110" fill="#edf6ed" stroke="'+teal+'" stroke-width="2"/>'+
    '<rect x="26" y="52" width="24" height="24" fill="none" stroke="'+blue+'" stroke-width="2"/><rect x="93" y="98" width="24" height="24" fill="none" stroke="'+blue+'" stroke-width="2"/>'+
    plant(37,69)+plant(105,115)+plant(60,120)+
    '<rect x="175" y="34" width="135" height="110" fill="#edf6ed" stroke="'+teal+'" stroke-width="2"/>'+
    '<path d="M178 34 V144" stroke="'+teal+'" stroke-width="7"/>'+line(184,88,300,88,rust,2)+
    [196,230,264].map(x=>'<rect x="'+x+'" y="76" width="22" height="24" fill="none" stroke="'+blue+'" stroke-width="2"/>').join('')+
    text(94,24,'Random quadrats',ink,14)+text(242,24,'Transect',ink,14)+text(77,172,'Whole area',ink,14)+text(242,175,'Distance from',ink,14)+text(242,207,'hedge',ink,14),
    'Compare random locations for a whole-area estimate with regular positions along a gradient. The sketches show only a few samples.',225);
}
function quadratMeanWorked() {
  const positions=[[10,15],[25,11],[40,15],[15,32],[35,32]];
  const sample=(x,count)=>'<rect x="'+x+'" y="41" width="50" height="47" fill="#edf6ed" stroke="'+teal+'" stroke-width="2"/>'+
    positions.slice(0,count).map(([dx,dy])=>circle(x+dx,41+dy,3,teal,teal)).join('')+text(x+25,115,String(count),ink,16);
  return fig('Estimate a whole-field population',
    'Four randomly placed one-square-metre quadrats contain 2, 4, 5 and 5 plants. Their mean is 16 divided by 4, or 4 plants per square metre. For a 200-square-metre field, the estimate is 4 times 200, or 800 plants.',
    text(160,24,'Four 1 m² quadrats',ink,15)+sample(20,2)+sample(95,4)+sample(170,5)+sample(245,5)+
    text(160,155,'Mean = 16 ÷ 4 = 4 / m²',blue,15)+text(160,190,'200 m² × 4 / m² = 800',teal,15),
    'Count each quadrat, find the mean per square metre, then multiply by the field area. The dots represent plants in the worked example.',210);
}
function randomCoordinates() {
  const lines=[1,2].map(i=>line(180+i*38,43,180+i*38,157,ink,1)+line(180,43+i*38,294,43+i*38,ink,1)).join('');
  return fig('Choose a random quadrat position',
    'A grid over a field has lettered columns and numbered rows. The randomly selected pair B and 2 identifies the shaded square where the quadrat is placed. Select coordinates before looking at where plants are growing.',
    text(72,48,'Random pair',ink,15)+text(72,82,'B, 2',blue,17)+
    '<rect x="180" y="43" width="114" height="114" fill="#edf6ed" stroke="'+teal+'" stroke-width="2"/><rect x="218" y="81" width="38" height="38" fill="#c9e5ed"/>'+lines+
    text(199,28,'A',ink,15)+text(237,28,'B',ink,15)+text(275,28,'C',ink,15)+text(163,69,'1',ink,15)+text(163,107,'2',ink,15)+text(163,145,'3',ink,15),
    'Choose the coordinate pair before looking for plants, then locate its column and row on the field grid. This is one illustrative position.',175);
}
function quadratBoundary() {
  const cross=(x,y)=>line(x-5,y-5,x+5,y+5,rust,2)+line(x-5,y+5,x+5,y-5,rust,2);
  return fig('Use one boundary rule',
    'A quadrat has plant symbols touching each of its four edges. In this example rule, the two circles touching the top or left edge are included, while the two crosses touching the bottom or right edge are excluded. The same rule is used for every quadrat.',
    '<rect x="80" y="40" width="160" height="112" fill="#edf6ed" stroke="'+ink+'" stroke-width="2"/>'+circle(125,40,6,teal,teal)+circle(80,96,6,teal,teal)+cross(195,152)+cross(240,96)+
    text(160,190,'● Include top / left',teal,15)+text(160,222,'× Exclude bottom / right',rust,15),
    'Apply the same agreed rule every time. Here circles mark included plants and crosses mark excluded plants; other consistent rules can be used.',240);
}
function parallelTransects() {
  const row=y=>line(53,y,281,y,rust,2)+[89,145,201,257].map(x=>'<rect x="'+(x-10)+'" y="'+(y-10)+'" width="20" height="20" fill="none" stroke="'+blue+'" stroke-width="2"/>').join('');
  return fig('Repeat transects along a gradient',
    'Three parallel transects start at a hedge. Quadrats are placed at the same regular distances along each transect. Replication can show how abundance varies between locations at a given distance.',
    text(35,25,'Hedge',teal,15)+text(190,25,'Parallel transects',ink,15)+'<rect x="40" y="40" width="250" height="145" fill="#edf6ed" stroke="'+ink+'" stroke-width="2"/>'+line(42,41,42,184,teal,7)+
    row(65)+row(112)+row(159)+text(160,215,'Same distance spacing',ink,15),
    'Compare the repeated lines: each uses the same distances from the hedge. Real surveys may use more samples.',235);
}
function quadratWorked(){return grouped(randomCoordinates,quadratBoundary,quadratMeanWorked,parallelTransects);}
function glucoseUptakeAndStorage() {
  const glycogen=[105,133,161,189,217];
  return fig('Insulin, uptake and storage',
    'A simplified muscle cell is shown below the blood. Insulin signals at the cell surface. Glucose enters the cell, and some is converted to glycogen for storage. The circles and short links are schematic, not molecular structures or quantities.',
    text(160,25,'Blood',ink,15)+circle(151,57,8,'#d9e9f7',blue,2)+circle(179,57,8,'#d9e9f7',blue,2)+
    '<rect x="45" y="145" width="230" height="111" rx="32" fill="#eef7f0" stroke="'+teal+'" stroke-width="2"/>'+
    text(240,96,'Glucose',blue,15)+text(49,96,'Insulin',teal,15)+arrow(151,76,151,151,blue,2)+arrow(49,107,85,145,teal,2)+
    line(105,197,217,197,rust,2)+glycogen.map(x=>circle(x,197,8,'#f4dbc8',rust,2)).join('')+arrow(151,157,151,181,blue,2)+
    text(160,238,'Glycogen',rust,15)+text(160,286,'Muscle cell',ink,15),
    'Insulin signals at the cell surface. Follow glucose into the cell and its storage as glycogen; the linked circles are a simplified model.',305);
}
function glucoseResponseDetailed(){return grouped(gcseStepVisuals['glucose-control'][1],glucoseUptakeAndStorage);}
export function randomDecay() {
  const places=[[29,62],[59,62],[89,62],[29,102],[59,102],[89,102]];
  const nuclei=(dx,changed)=>places.map(([x,y],i)=>circle(x+dx,y,10,changed.includes(i)?'#f8e9db':'#d6e9f7',changed.includes(i)?rust:blue,2)+
    (changed.includes(i)?line(x+dx-5,y-5,x+dx+5,y+5,rust,2)+line(x+dx-5,y+5,x+dx+5,y-5,rust,2):'')).join('');
  return fig('A possible pattern of decay',
    'Six model nuclei are shown before and later. In this illustrative outcome, two have decayed and are marked with crosses. Which individual nucleus decays, and when, cannot be predicted; the picture is one possible outcome, not a prediction.',
    text(59,25,'Before',ink,15)+text(261,25,'Later',ink,15)+nuclei(0,[])+arrow(112,82,208,82,teal,2)+nuclei(202,[0,4])+
    text(85,154,'● Undecayed',blue,15)+text(239,154,'× Decayed',rust,15),
    'Compare the nuclei before and later. Crosses mark two illustrative decays; neither their identities nor their timing can be predicted.',173);
}
export function activityUnit() {
  const event=(x,y)=>circle(x,y,10,'#d6e9f7',blue,2)+line(x+14,y,x+21,y,teal,2)+line(x,y-14,x,y-21,teal,2);
  return fig('Activity measures decays per second',
    'An activity of eighty becquerels means a decay rate of eighty decays per second. Four small event symbols indicate the kind of event being counted; they do not represent the total of eighty. Actual counts in a short interval can fluctuate.',
    text(203,25,'Decay events',ink,15)+circle(65,96,36,'#f4f5ee',ink,2)+line(65,52,65,60,ink,3)+text(65,102,'1 s',ink,16)+
    event(166,72)+event(230,72)+event(166,125)+event(230,125)+text(160,182,'80 decays per second',blue,15)+text(160,215,'= 80 Bq',teal,16),
    'A becquerel is one decay per second. The small symbols indicate decay events; they are not a count of all 80 events.',234);
}
function trolleySensors() {
  const gate=x=>'<path d="M'+x+' 139 V70 H'+(x+32)+' V139" fill="none" stroke="'+blue+'" stroke-width="3"/>'+line(x+2,92,x+30,92,blue,1,'3 3');
  return fig('Measure motion with light gates',
    'A trolley carrying a vertical card moves along a level track through two light gates. The gates send timing measurements to a data logger, which can be used to determine acceleration. Release the trolley consistently without pushing it.',
    text(160,25,'Two light gates',ink,15)+gate(125)+gate(224)+line(18,139,285,139,ink,3)+
    '<rect x="30" y="111" width="68" height="20" fill="#dcecf1" stroke="'+ink+'"/><rect x="58" y="74" width="9" height="37" fill="#d9b07d" stroke="'+ink+'"/>'+
    circle(45,136,5,'#fff',ink,2)+circle(83,136,5,'#fff',ink,2)+arrow(40,60,94,60,teal,2)+
    '<rect x="104" y="174" width="112" height="43" rx="4" fill="#edf6ed" stroke="'+teal+'" stroke-width="2"/>'+text(160,202,'Data logger',teal,15)+
    line(141,139,141,174,blue,1,'4 4')+line(240,139,240,164,blue,1,'4 4')+line(240,164,195,174,blue,1,'4 4'),
    'The card interrupts each gate as the trolley passes. The dashed lines represent connections to the logger; release without a push.',236);
}
function trolleyTrial(y,cartCount,hangerCount) {
  const blocks=(x,base,count,vertical)=>Array.from({length:count},(_,i)=>'<rect x="'+(x+(vertical?0:i*20))+'" y="'+(base+(vertical?i*14:0))+'" width="18" height="14" fill="#e4bc88" stroke="'+rust+'" stroke-width="1.5"/>').join('');
  return '<rect x="40" y="'+(y+36)+'" width="95" height="20" fill="#dcecf1" stroke="'+ink+'"/>'+blocks(55,y+22,cartCount,false)+
    circle(59,y+62,6,'#fff',ink,2)+circle(116,y+62,6,'#fff',ink,2)+line(20,y+68,221,y+68,ink,2)+
    line(135,y+46,230,y+46,ink,2)+circle(230,y+55,9,'#fff',ink,2)+line(239,y+55,239,y+83,ink,2)+blocks(230,y+83,hangerCount,true);
}
function trolleyTransfer() {
  return fig('Change force at fixed moving mass',
    'In trial A, two equal slotted masses sit on the trolley and one hangs from the string. In trial B, one mass has been transferred from the trolley to the hanger, so the trolley and hanger together still carry three masses while the hanging weight is larger.',
    text(160,25,'Trial A',ink,15)+trolleyTrial(35,2,1)+text(160,194,'Trial B',ink,15)+trolleyTrial(204,1,2)+
    text(160,359,'Same three masses',teal,15),
    'Move a mass from trolley to hanger: the driving weight rises while the total moving mass stays the same. Allow for friction.',378);
}
function trolleyAddMass() {
  return fig('Change moving mass at fixed drive',
    'In two trials the same slotted mass remains on the hanger. An additional equal mass is added to the trolley for trial B. The total moving mass increases while the hanging weight stays the same.',
    text(160,25,'Trial A',ink,15)+trolleyTrial(35,1,1)+text(160,194,'Trial B',ink,15)+trolleyTrial(204,2,1)+
    text(160,359,'Same hanging mass',teal,15),
    'Keep the hanger unchanged and add a mass to the trolley. Keep friction small and comparable between runs.',378);
}
function copperElectrolysis() {
  return fig('Electrolyse copper sulfate solution',
    'A direct-current supply connects its negative terminal to one graphite electrode and its positive terminal to another. Both electrodes dip into copper sulfate solution without touching. Copper coats the negative electrode and oxygen bubbles form at the positive electrode; the products can be collected separately for testing.',
    '<rect x="120" y="12" width="80" height="50" rx="4" fill="#e9f1f4" stroke="'+ink+'" stroke-width="2"/>'+text(160,35,'DC',ink,15)+text(136,57,'−',ink,15)+text(184,57,'+',ink,15)+
    line(136,62,136,72,ink,2)+line(136,72,80,72,ink,2)+line(80,72,80,110,ink,2)+
    line(184,62,184,72,ink,2)+line(184,72,240,72,ink,2)+line(240,72,240,110,ink,2)+
    '<path d="M35 100v100h250V100" fill="#edf6f7" stroke="'+ink+'" stroke-width="2"/>'+line(37,128,283,128,blue,2)+
    line(80,98,80,178,ink,8)+line(240,98,240,178,ink,8)+line(75,145,75,176,rust,3)+line(85,145,85,176,rust,3)+
    circle(251,156,4,'#fff',blue,1)+circle(245,143,4,'#fff',blue,1)+circle(254,132,4,'#fff',blue,1)+
    text(80,231,'− Cathode',ink,15)+text(240,231,'+ Anode',ink,15),
    'The electrodes remain separate. Copper forms on the cathode; oxygen forms at the anode and can be collected for a gas test.',250);
}
function anodeGasCollection() {
  return fig('Collect the gas separately',
    'A tube initially filled with solution is inverted over the anode. Gas bubbles rise from the anode and displace solution from the tube, leaving a sample above the liquid. The wider circuit and other electrode are omitted from this close-up.',
    text(160,24,'Collected gas',ink,15)+'<rect x="40" y="115" width="240" height="80" fill="#dceef4"/>'+line(40,115,125,115,blue,2)+line(195,115,280,115,blue,2)+
    '<path d="M125 165 V48 Q160 33 195 48 V165" fill="none" stroke="'+ink+'" stroke-width="2"/>'+line(125,115,195,115,blue,2)+
    line(160,190,160,145,ink,8)+circle(168,136,4,'#fff',blue,1)+circle(153,127,4,'#fff',blue,1)+circle(165,119,3,'#fff',blue,1)+
    text(160,224,'Anode in solution',ink,15),
    'Prefill the inverted tube with solution. Gas displaces liquid as it collects; this close-up omits the rest of the circuit.',243);
}
function copperElectrolysisAndCollection(){return grouped(copperElectrolysis,anodeGasCollection);}
function electrodeProducts() {
  return fig('Follow ions to the electrodes',
    'At the negative cathode, positive copper ions move to the graphite and gain electrons, forming a coating of copper. At the positive anode, negative ions move towards the electrode and oxygen forms in this copper sulfate solution.',
    text(160,25,'Cathode −',ink,15)+line(65,48,65,125,ink,9)+line(72,65,72,117,rust,4)+
    circle(220,85,25,'#e0eef7',blue,2)+text(220,91,'Cu²⁺',blue,15)+arrow(185,85,84,85,blue,2)+
    text(160,156,'Copper coating forms',rust,15)+text(160,195,'Anode +',ink,15)+
    line(255,214,255,289,ink,9)+text(91,242,'Anions',ink,15)+arrow(130,263,237,263,teal,2)+
    circle(265,240,5,'#fff',blue,1)+circle(272,226,5,'#fff',blue,1)+circle(265,212,5,'#fff',blue,1)+text(160,324,'Oxygen forms',blue,15),
    'Follow positive copper ions to the cathode and negative ions to the anode. The colours distinguish the graphite, coating and gas.',343);
}
function glowingSplint() {
  return fig('Test the gas for oxygen',
    'A glowing wooden splint is placed into a test tube containing the collected gas. If it relights, the test indicates oxygen. The presence of bubbles alone does not identify a gas.',
    text(75,25,'Glowing',ink,15)+text(245,25,'Relights',ink,15)+line(95,47,70,115,rust,4)+circle(68,119,5,'#d77528',rust,1)+
    '<path d="M208 52v94q32 26 64 0V52" fill="#e8f3f4" stroke="'+ink+'" stroke-width="2"/>'+line(251,46,232,108,rust,4)+
    '<path d="M232 109 Q218 98 231 86 Q231 95 239 96 Q246 104 232 109Z" fill="#f3bb42" stroke="'+rust+'" stroke-width="2"/>'+
    text(240,188,'Collected gas',ink,15),
    'A glowing splint relights in oxygen. Bubbles show that a gas formed, but do not identify it.',207);
}
function temperatureRises() {
  return fig('Compare measured temperature rises',
    'Both methods start at twenty degrees Celsius. The glass beaker reaches twenty-six degrees, a rise of six degrees Celsius. The insulated cup reaches twenty-nine degrees, a rise of nine degrees Celsius. The vertical comparison starts at twenty degrees, not zero.',
    text(72,25,'Glass',ink,15)+text(246,25,'Insulated',ink,15)+line(30,182,290,182,ink,2)+
    arrow(72,178,72,112,blue,3)+circle(72,110,5,blue,blue)+arrow(246,178,246,76,teal,3)+circle(246,74,5,teal,teal)+
    text(72,91,'26 °C',blue,15)+text(246,55,'29 °C',teal,15)+text(72,215,'+6 °C',blue,16)+text(246,215,'+9 °C',teal,16)+
    text(160,252,'Both start at 20 °C',ink,15),
    'Subtract the common starting temperature from each maximum. The arrows compare rises from 20 °C; the example readings are illustrative.',271);
}
function energyTransferDirections() {
  return fig('Warming and cooling reactions',
    'In an exothermic reaction, energy transfers from the reaction to the surroundings and the surrounding mixture warms. In an endothermic reaction, energy transfers from the surroundings to the reaction and the surrounding mixture can cool.',
    text(75,25,'Exothermic',ink,15)+text(245,25,'Endothermic',ink,15)+
    '<path d="M43 58v52h56V58 M221 58v52h56V58" fill="#e8f3f4" stroke="'+ink+'" stroke-width="2"/>'+
    arrow(101,82,137,82,rust,2)+arrow(183,82,219,82,blue,2)+text(70,146,'Warmer',rust,15)+text(250,146,'Cooler',blue,15)+
    text(76,180,'Energy out',rust,15)+text(244,180,'Energy in',blue,15),
    'Follow energy out of an exothermic reaction or into an endothermic reaction. The surrounding mixture can warm or cool.',199);
}
function temperatureTrace() {
  return fig('Record the peak during the reaction',
    'A qualitative temperature–time trace rises to a peak and then falls. A reading taken only after the peak misses the maximum temperature change. A cooling reaction is monitored in the same way to find its minimum.',
    text(160,25,'Temperature',ink,15)+line(52,48,52,150,ink,2)+line(52,150,280,150,ink,2)+
    '<path d="M52 140 C85 135 104 64 155 58 C200 59 230 100 275 113" fill="none" stroke="'+blue+'" stroke-width="3"/>'+circle(155,58,4,rust,rust)+
    text(215,62,'Peak',rust,15)+text(160,183,'Time',ink,15),
    'Monitor throughout mixing to capture the peak or minimum, and repeat the method to examine variation. This trace is qualitative.',202);
}
function temperatureControls() {
  const fluid=x=>'<path d="M'+x+' 58 v84 h92 V58" fill="#e7f2f3" stroke="'+ink+'" stroke-width="2"/>'+line(x+2,91,x+90,91,blue,2)+[20,45,70].map(dx=>circle(x+dx,112,4,blue,blue)).join('');
  return fig('Keep the starting conditions matched',
    'A glass beaker and an insulated cup contain the same starting volume and concentration of reactants at the same starting temperature of twenty degrees Celsius. The dots are schematic and represent the same concentration in each test.',
    text(66,24,'Glass',ink,15)+text(254,24,'Insulated',ink,15)+fluid(20)+fluid(208)+
    '<path d="M202 53 v96 h104 V53" fill="none" stroke="'+teal+'" stroke-width="4"/>'+line(203,53,305,53,teal,4)+
    text(66,175,'20 °C',ink,15)+text(254,175,'20 °C',ink,15)+text(160,213,'Same volume and',ink,15)+text(160,245,'concentration',ink,15),
    'Use equal reactant volumes and concentrations, with the same starting temperature. Dots are a model, not counted molecules.',264);
}
function temperatureWorkedRises(){return grouped(temperatureRises,energyTransferDirections);}
function temperatureMeasurement(){return grouped(() => investigationFigure('temperature-evidence', 'Insulation and a lid reduce energy transfer to the surroundings; monitor and stir the mixture.'),temperatureTrace);}
function infraredReadings() {
  return fig('Compare infrared readings',
    'In the worked example, the detector reads 78 arbitrary units from the matt black face and 24 arbitrary units from the polished face, under matched conditions. Both bars start at zero and use the same scale.',
    text(160,25,'Detector reading',ink,16)+text(160,55,'arbitrary units',ink,15)+
    line(36,163,287,163,ink,2)+'<rect x="60" y="85" width="76" height="78" fill="#48515b" stroke="'+ink+'"/>'+
    '<rect x="188" y="139" width="76" height="24" fill="#dce6ed" stroke="'+ink+'"/>'+text(98,112,'78','#fff',16)+text(226,131,'24',ink,16)+
    text(98,193,'Matt black',ink,15)+text(226,193,'Polished',ink,15),
    'Compare the illustrative readings on the same scale. Repeat measurements while checking that the cube temperature remains comparable.',212);
}
function infraredAbsorption() {
  return fig('Compare infrared absorption',
    'Two identical plates have different surface finishes. A source sends infrared towards both plates from equal distances. Thermometers measure the temperature rise of each plate over the same time.',
    text(50,25,'Matt',ink,15)+text(270,25,'Shiny',ink,15)+text(160,25,'Infrared',ink,15)+text(160,57,'source',ink,15)+
    '<rect x="25" y="75" width="45" height="50" fill="#48515b" stroke="'+ink+'"/><rect x="250" y="75" width="45" height="50" fill="#dce6ed" stroke="'+ink+'"/>'+
    '<rect x="140" y="80" width="40" height="40" fill="#f5cfac" stroke="'+rust+'"/>'+arrow(135,100,78,100,rust,2)+arrow(185,100,242,100,rust,2)+
    line(50,125,50,151,rust,3)+circle(50,155,5,rust,rust)+line(270,125,270,151,rust,3)+circle(270,155,5,rust,rust)+
    text(160,190,'Same distance and time',ink,15)+text(160,225,'Compare temperature rise',teal,15),
    'Use matching plates and equal source distances. Measure their temperature rises over the same period.',244);
}
function springReading() {
  return fig('Read a spring at eye level',
    'A spring and load hang from a fixed support beside a vertical ruler. A pointer at the lower end of the spring is read on the ruler at eye level, after the spring stops oscillating.',
    line(52,32,171,32,ink,4)+'<path d="M95 32v12l-12 7 24 8-24 8 24 8-24 8 12 7v12" fill="none" stroke="'+ink+'" stroke-width="2"/>'+
    '<rect x="82" y="102" width="26" height="28" fill="#d9eaf0" stroke="'+ink+'"/>'+line(95,102,175,102,teal,2)+
    line(177,37,177,143,ink,2)+Array.from({length:8},(_,i)=>line(177,45+i*12,186,45+i*12,ink,1)).join('')+
    '<path d="M221 102q17-14 34 0q-17 14-34 0Z" fill="#eef5ee" stroke="'+ink+'" stroke-width="2"/>'+circle(238,102,4,ink,ink)+line(190,102,219,102,rust,1,'4 4')+
    text(134,177,'Pointer',teal,15)+text(238,177,'Eye level',rust,15),
    'Let the spring settle, then read the pointer straight across the ruler to reduce parallax.',195);
}
function springLengths() {
  const spring=(x,bottom)=>{const top=48,dy=(bottom-top)/8;let d='M'+x+' '+top+' v'+(dy/2);for(let i=0;i<7;i++)d+=' l'+(i%2===0?-9:9)+' '+dy;d+=' L'+x+' '+bottom;return '<path d="'+d+'" fill="none" stroke="'+blue+'" stroke-width="2"/>';};
  return fig('Compare lengths from one reference',
    'A spring measures eight centimetres unloaded and twelve centimetres with a two-newton force. Both lengths are measured from the same upper reference. The extension is twelve minus eight, or four centimetres.',
    text(75,25,'0 N',ink,16)+text(245,25,'2 N',ink,16)+line(36,48,284,48,ink,3)+
    spring(75,128)+spring(245,168)+'<rect x="235" y="168" width="20" height="18" fill="#d9eaf0" stroke="'+ink+'"/>'+
    text(75,158,'8 cm',blue,15)+text(245,210,'12 cm',blue,15)+text(160,248,'12 − 8 = 4 cm',teal,16),
    'Compare lengths from the same fixed top; subtract the unloaded length to find the extension.',267);
}
function springProportional() {
  return fig('Plot extension against force',
    'The plotted values are zero, two, four and six centimetres extension at zero, one, two and three newtons respectively. A straight line through the origin represents proportionality in these measurements.',
    text(160,23,'Extension (cm)',ink,15)+line(54,40,54,164,ink,2)+line(54,164,270,164,ink,2)+
    line(54,164,249,44,blue,2)+[0,1,2,3].map(n=>circle(54+65*n,164-40*n,4,blue,blue)+text(54+65*n,190,String(n),ink,15)+text(32,169-40*n,String(2*n),ink,15)).join('')+
    text(160,224,'Force (N)',ink,15),
    'Each additional newton produces 2 cm of extension in these measurements. The straight line passes through the origin.',243);
}
function springRecovery() {
  return fig('Departure from proportionality',
    'A schematic extension–force graph is straight at first and then curves away. This shows departure from proportionality; it does not establish whether the spring will recover its original length.',
    text(160,23,'Extension',ink,15)+line(50,40,50,145,ink,2)+line(50,145,273,145,ink,2)+
    '<path d="M50 145 L160 105 Q210 95 255 44" fill="none" stroke="'+blue+'" stroke-width="3"/>'+circle(160,105,4,rust,rust)+
    text(235,110,'Curve',rust,15)+text(160,177,'Force',ink,15),
    'The curve shows a departure from proportionality. Unload the spring separately to check whether it recovers.',196);
}
function springUnloading() {
  const coil=x=>'<path d="M'+x+' 52 v10 l-9 8 18 8-18 8 18 8-18 8 9 8 v10" fill="none" stroke="'+blue+'" stroke-width="2"/>';
  return fig('Compare the unloaded lengths',
    'The same spring has the same unloaded length before loading and after unloading. Recovery to the original length shows elastic recovery for this load, separately from whether extension was proportional to force.',
    text(80,25,'Before',ink,16)+text(240,25,'After',ink,16)+line(40,52,280,52,ink,3)+coil(80)+coil(240)+
    line(60,120,260,120,teal,1,'5 4')+text(160,157,'Same unloaded length',teal,15),
    'Compare the unloaded length before loading and after removal of the load. Here the spring recovered for this load.',177);
}
function springWorkedLengths(){return grouped(springLengths,springProportional);}
function springDepartureAndRecovery(){return grouped(springRecovery,springUnloading);}
function rippleCrestIntervals() {
  const crests = [32,96,160,224,288];
  return fig('Measure across several crests',
    'A simplified top view of a ripple tank shows five successive parallel crests. The measured distance from the first crest to the fifth is 24 centimetres, which contains four wavelengths. One wavelength is therefore 24 divided by 4, or 6 centimetres.',
    text(160,25,'24 cm',ink,16)+line(32,43,288,43,ink,2)+
    crests.map(x=>line(x,37,x,49,ink,2)+line(x,65,x,121,blue,3)).join('')+
    text(160,153,'Five crests: four intervals',ink,15)+text(160,190,'λ = 24 ÷ 4 = 6 cm',teal,15),
    'Count the gaps between crests, not the crests themselves. The parallel lines are a simplified view from above.',210);
}
function rippleFrequency() {
  const wave = Array.from({length:201},(_,i)=>[40+i*1.2,(103-25*Math.sin(i*Math.PI/10)).toFixed(2)].join(',')).join(' ');
  return fig('Count oscillations at one point',
    'A displacement–time graph at a fixed point shows ten complete oscillations during five seconds, corresponding to two oscillations per second or two hertz. With wavelength 0.06 metres, speed is two times 0.06, or 0.12 metres per second.',
    text(160,25,'10 oscillations',ink,16)+text(112,54,'Displacement',ink,15)+
    line(40,65,40,135,ink,2)+line(40,103,280,103,ink,1,'4 4')+
    '<polyline points="'+wave+'" fill="none" stroke="'+blue+'" stroke-width="2"/>'+
    line(40,135,280,135,ink,2)+line(40,130,40,140,ink,2)+line(280,130,280,140,ink,2)+
    text(40,160,'0',ink,15)+text(280,160,'5 s',ink,15)+text(160,195,'f = 10 ÷ 5 = 2 Hz',teal,15)+
    text(160,232,'v = 2 × 0.06 = 0.12 m/s',ink,15),
    'Follow the complete cycles at one fixed point. Convert 6 cm to 0.06 m before using wave speed = frequency × wavelength.',250);
}
function rippleAmplitude() {
  const wave = Array.from({length:141},(_,i)=>[20+i*2,(110-30*Math.cos((20+i*2-100)*Math.PI/60)).toFixed(2)].join(',')).join(' ');
  return fig('Amplitude and a moving ripple',
    'A simplified side view shows the maximum vertical displacement from equilibrium to a crest. A floating marker moves up and down as the wave pattern travels horizontally; the diagram represents this visible vertical motion, not the marker’s exact path.',
    text(221,25,'Wave travels',ink,15)+arrow(182,44,274,44,teal,2)+
    line(20,110,300,110,ink,1,'5 4')+'<polyline points="'+wave+'" fill="none" stroke="'+blue+'" stroke-width="2"/>'+
    circle(100,80,6,'#f3c381',rust,2)+arrow(130,77,130,53,rust,2)+arrow(130,53,130,77,rust,2)+line(55,80,100,80,ink,1,'4 4')+
    arrow(60,109,60,81,rust,2)+arrow(60,81,60,109,rust,2)+
    text(78,171,'Amplitude',rust,15)+text(230,171,'Equilibrium',ink,15)+
    text(160,208,'Marker rises and falls',ink,15),
    'Measure from equilibrium to a crest. The marker oscillates as the pattern travels; its exact path is simplified.',225);
}
function iodineEndpoint() {
  return fig('Reading iodine samples',
    'In an illustrative amylase test, separate iodine wells receive samples at regular 10-second intervals. Selected wells at 0 and 30 seconds are blue-black because starch remains; the first orange-brown well at 40 seconds is the recorded endpoint.',
    text(70,25,'0 s',ink,15)+text(160,25,'30 s',ink,15)+text(250,25,'40 s',ink,15)+circle(70,72,23,'#253e63',ink,2)+circle(160,72,23,'#253e63',ink,2)+circle(250,72,23,'#db9a53',rust,2)+
    text(115,133,'Starch present',ink,15)+text(250,133,'Endpoint',rust,15)+text(160,185,'Samples every 10 s',ink,15),
    'Compare the blue-black wells with the first orange-brown well. The displayed wells are selected samples from an illustrative sequence.',205);
}
function amylaseSetup() {
  const tube=x=>'<path d="M'+(x-15)+' 43 V74 Q'+x+' 86 '+(x+15)+' 74 V43" fill="#e5f1f5" stroke="'+ink+'" stroke-width="2"/>';
  return fig('Prepare an amylase reaction',
    'Equal volumes of amylase and starch are brought to the same temperature. The volume and concentration of each reagent are kept the same between tests. The reagents are combined with a buffer at the chosen pH, and timing begins.',
    text(55,25,'Enzyme',ink,15)+text(160,25,'Starch',ink,15)+text(265,25,'Buffer',ink,15)+tube(55)+tube(160)+tube(265)+
    '<path d="M75 137 V214 H245 V137" fill="#dceef5" stroke="'+ink+'" stroke-width="2"/><path d="M142 119 V190 Q160 211 178 190 V119" fill="#eef5ee" stroke="'+teal+'" stroke-width="2"/>'+
    arrow(70,84,150,130,teal,2)+arrow(160,85,160,130,teal,2)+arrow(250,84,170,130,teal,2)+text(160,246,'Water bath',blue,15),
    'Keep each reagent’s volume and concentration the same between tests. Change the buffer pH and hold temperature steady.',265);
}
function amylaseControls() {
  const tube=x=>'<path d="M'+x+' 43 V148 Q'+(x+55)+' 171 '+(x+110)+' 148 V43" fill="#eef6f3" stroke="'+teal+'" stroke-width="2"/>'+
    circle(x+25,73,7,'#c7dff0',blue)+circle(x+25,113,7,'#c7dff0',blue)+line(x+59,73,x+91,73,rust,4)+line(x+59,113,x+91,113,rust,4);
  return fig('Change pH while keeping other factors the same',
    'Two identical reaction tubes, labelled pH 5 and pH 7, contain the same numbers of enzyme and starch symbols in the same volume. This models keeping reagent amounts and concentrations the same while changing buffer pH; the symbols are illustrative, not literal molecule counts.',
    text(80,25,'pH 5',ink,15)+text(240,25,'pH 7',ink,15)+tube(25)+tube(185)+
    text(82,195,'● Enzyme',blue,15)+text(238,195,'— Starch',rust,15),
    'Compare both tubes: same starting amounts and volume, different pH. The circle and line symbols are a model, not actual molecule counts.',215);
}
function amylasePreparation(){return grouped(amylaseSetup,amylaseControls);}
function amylaseRates() {
  return fig('Compare reciprocal times',
    'In the worked example, one divided by 40 seconds gives 0.025 per second at pH 7. One divided by 80 seconds gives 0.0125 per second at pH 5. With equal starting starch amounts, these are estimates of relative activity.',
    text(160,25,'Relative activity (s⁻¹)',ink,15)+'<rect x="45" y="50" width="90" height="120" fill="#d9eaf4" stroke="'+blue+'" stroke-width="2"/><rect x="185" y="110" width="90" height="60" fill="#d9eee4" stroke="'+teal+'" stroke-width="2"/>'+
    text(90,118,'0.025',blue,15)+text(230,147,'0.0125',teal,15)+text(90,201,'pH 7',ink,15)+text(230,201,'pH 5',ink,15),
    'Divide one by each time. The same-scale bars show the relative activity estimates for equal starting starch amounts.',220);
}
function iodineInterval() {
  return fig('The endpoint is an interval',
    'In the illustrative 10-second sampling sequence, starch is still detected at 30 seconds and is not detected at 40 seconds. The endpoint occurred between these tests; the recorded time is not an exact instant.',
    text(160,25,'Change occurs between tests',ink,15)+line(55,82,265,82,ink,2)+circle(70,82,8,'#253e63',ink,2)+circle(250,82,8,'#db9a53',rust,2)+
    text(70,117,'30 s',ink,15)+text(250,117,'40 s',ink,15)+text(70,152,'Positive',blue,15)+text(250,152,'Negative',rust,15),
    'The last positive and first negative tests bracket the endpoint. Shorter intervals can reduce this timing uncertainty.',175);
}
function rulerMeans() {
  return fig('Compare ruler-drop distances',
    'In the illustrative trials, person A catches the ruler after a mean drop of 20 centimetres and person B after 18 centimetres. Under the same method, the shorter distance corresponds to a shorter reaction time.',
    text(160,25,'Mean drop distance (cm)',ink,15)+'<rect x="55" y="50" width="70" height="120" fill="#d9eaf4" stroke="'+blue+'" stroke-width="2"/><rect x="195" y="62" width="70" height="108" fill="#d9eee4" stroke="'+teal+'" stroke-width="2"/>'+
    text(90,116,'20 cm',blue,15)+text(230,128,'18 cm',teal,15)+text(90,201,'Person A',ink,15)+text(230,201,'Person B',ink,15),
    'Compare the mean drop distances on the same scale. This pair of illustrative results cannot represent everyone.',220);
}
function rulerControls() {
  const trial=x=>circle(x,56,10,'#f2d4c3',rust)+line(x,67,x,97,ink,2)+line(x,77,x+28,91,ink,2)+
    line(x+28,87,x+34,87,ink,2)+line(x+28,95,x+34,95,ink,2)+line(x-10,100,x+10,100,ink,2)+line(x,97,x+16,111,ink,2)+
    '<rect x="'+(x+37)+'" y="53" width="14" height="58" fill="#fff4d9" stroke="'+ink+'" stroke-width="2"/>'+line(x+37,91,x+45,91,ink,2);
  const clock=(x,second)=>circle(x,171,17,'#edf4f2',teal,2)+line(x,171,x,158,teal,2)+line(x,171,x+(second?10:5),171+(second?6:-8),teal,2);
  return fig('Keep the ruler-drop start comparable',
    'Two schematic trials show the same seated posture, hand position and gap beside the ruler zero. Clock hands differ to represent varying the delay before release, rather than releasing at a predictable count. The clocks do not show measured times.',
    text(70,25,'Trial 1',ink,15)+text(225,25,'Trial 2',ink,15)+trial(50)+trial(205)+
    text(160,135,'Same starting position',ink,15)+clock(120,false)+clock(200,true)+text(160,222,'Vary release delay',teal,15),
    'Compare posture and the starting gap, then vary the release delay so the catcher cannot anticipate it. Use practice trials before collecting results.',240);
}
function circuitMeters() {
  return fig('Measuring a component',
    'An ammeter is in series in the main loop with a cell and lamp. A voltmeter forms a parallel branch connected across the lamp terminals.',
    '<path d="M147 22 H44 V105 H54 M82 105 H142 M176 105 H275 V22 H164 M102 105 V159 H145 M173 159 H215 V105" fill="none" stroke="'+ink+'" stroke-width="2.5"/>'+
    line(147,11,147,33)+line(164,15,164,29)+circle(68,105,14,'white',ink)+text(68,110,'A',ink,16)+
    circle(159,105,17,'white',ink)+line(148,94,170,116)+line(148,116,170,94)+
    circle(159,159,14,'white',ink)+text(159,164,'V',ink,16)+circle(102,105,3,ink)+circle(215,105,3,ink)+
    text(88,82,'Ammeter',ink,14)+line(177,160,207,172,ink,1)+text(250,179,'Voltmeter',ink,14),
    'Trace the main loop through the ammeter; the voltmeter connects across the lamp.',195);
}
function shield() {
  return fig('Penetration of radiation',
    'A source emits alpha, beta and gamma. A sheet of paper stops alpha. An aluminium sheet stops beta. Thick lead reduces the intensity of gamma, but does not necessarily stop every gamma ray.',
    '<circle cx="35" cy="94" r="18" fill="#eee2d7" stroke="'+rust+'" stroke-width="2"/>'+text(45,167,'Source',ink,12)+
    '<rect x="105" y="45" width="5" height="111" fill="#c5c5c5"/><rect x="185" y="45" width="10" height="111" fill="#97a6ad"/><rect x="268" y="45" width="24" height="111" fill="#68777d"/>'+
    arrow(53,66,102,66,rust,2)+arrow(53,96,181,96,teal,2)+arrow(53,123,267,123,blue,1.5)+arrow(53,137,267,137,blue,1.5)+arrow(292,130,307,130,blue,1.5)+
    text(78,57,'α',rust,16)+text(141,87,'β',teal,16)+text(240,117,'γ',blue,16)+
    text(97,29,'Paper',ink,13)+text(197,29,'Aluminium',ink,13)+text(278,29,'Lead',ink,13),
    'Follow each ray to the shielding that stops or reduces it. Fewer gamma arrows after the lead illustrate attenuation; their number is not a measurement.');
}
function waveCompare() {
  let a=''; for(let x=35;x<=285;x+=25)a+=circle(x,55+18*Math.sin((x-35)/35),3,teal,teal);
  let b=''; [35,43,51,93,101,109,151,159,167,209,217,225,267,275,283].forEach(x=>b+=line(x,129,x,149,blue,3));
  return fig('Two directions of oscillation',
    'A transverse wave travels right while its particles move up and down, perpendicular to the direction of travel. A longitudinal wave travels right while its particles move backwards and forwards parallel to that direction. Closely spaced lines represent compressions.',
    a+arrow(188,20,282,20,ink)+text(145,24,'Wave travels',ink,13,'end')+arrow(35,77,35,35,rust)+arrow(35,35,35,77,rust)+text(160,105,'Transverse: perpendicular',ink,14)+
    b+arrow(188,117,282,117,ink)+arrow(58,166,110,166,rust)+arrow(110,166,58,166,rust)+text(195,173,'Longitudinal: parallel',ink,14),
    'Compare the particle motion arrows with the direction in which each wave travels.');
}
function wavelength() {
  const points=Array.from({length:65},(_,i)=>{const x=15+i*4.5;return x+','+(90-35*Math.cos((x-30)*Math.PI/80));}).join(' ');
  return fig('Read wavelength and amplitude',
    'A transverse wave is drawn about its equilibrium line. Wavelength is the distance from one crest to the next crest. Amplitude is the maximum displacement from the equilibrium line to a trough.',
    line(14,90,307,90,'#91a3a3',1,'5 4')+'<polyline points="'+points+'" fill="none" stroke="'+teal+'" stroke-width="3"/>'+
    arrow(30,34,190,34,blue,2)+arrow(190,34,30,34,blue,2)+text(110,22,'Wavelength',blue,14)+
    arrow(110,90,110,125,rust,2)+text(110,149,'Amplitude',rust,14),
    'Measure one complete cycle between matching points. The dashed line is equilibrium. Frequency counts complete cycles each second.',160);
}
function stopping() {
  return fig('Thinking distance and braking distance',
    'A car moving right travels a thinking distance before the brakes are applied, then a braking distance while it slows to rest. Stopping distance is the total of these consecutive distances.',
    line(20,133,302,133,ink,2)+'<path d="M25 108 h47 l12 12 v11 H17 v-10 z" fill="#d3e6f3" stroke="'+blue+'" stroke-width="2"/>'+circle(31,133,6,ink)+circle(70,133,6,ink)+
    '<path d="M113 108 h47 l12 12 v11 h-67 v-10 z" fill="#d3e6f3" stroke="'+blue+'" stroke-width="2"/>'+circle(119,133,6,ink)+circle(158,133,6,ink)+
    '<path d="M232 108 h47 l12 12 v11 h-67 v-10 z" fill="#e3e9e9" stroke="'+ink+'" stroke-width="2"/>'+circle(238,133,6,ink)+circle(277,133,6,ink)+
    arrow(25,78,116,78,rust,2)+text(72,60,'Thinking',rust,14)+arrow(116,78,259,78,teal,2)+text(188,60,'Braking',teal,14)+
    text(45,165,'Hazard',ink,13)+text(140,165,'Brake',ink,13)+text(262,165,'Stopped',ink,13)+text(72,28,'Reaction time',rust,13)+text(200,28,'Tyre grip',teal,13),
    'Reaction time affects thinking distance; tyre grip affects braking distance. Add the two distances to find the total.');
}
function stationaryBalanced() {
  return fig('Balanced forces on an object at rest',
    'A stationary box rests on a horizontal surface. Its 4 newton weight acts downwards and the surface exerts a 4 newton normal contact force upwards. These opposite forces balance, so the resultant force and acceleration are zero. The values are an example.',
    line(32,135,288,135,ink,2)+'<rect x="110" y="85" width="100" height="50" rx="4" fill="#dcebea" stroke="'+ink+'" stroke-width="2"/>'+
    arrow(140,135,140,55,blue,3)+arrow(180,103,180,183,rust,3)+text(70,50,'4 N up',blue,15)+text(250,183,'4 N down',rust,15)+text(160,220,'Box at rest',ink,15),
    'Compare the upward contact force with the equal downward weight. The stationary box has zero resultant force; the values are illustrative.',240);
}
function movingAndStationary(){return grouped(gcseStepVisuals['forces-motion'][0],stationaryBalanced);}
function neuron() {
  return fig('Withdrawal reflex pathway',
    'A receptor in the skin detects a stimulus. An impulse travels along a sensory neurone to a relay neurone in the spinal cord, then along a motor neurone to a muscle. The muscle contracts and withdraws the hand. Signals can also reach the brain, but a conscious decision is not needed for the rapid reflex.',
    '<ellipse cx="156" cy="28" rx="37" ry="21" fill="#edf0f8" stroke="'+blue+'" stroke-width="2"/>'+text(156,34,'Brain',ink,14)+arrow(156,94,156,53,blue,2)+
    '<path d="M15 127 q20-20 40 0 v35 h-40 z" fill="#f3d4c0" stroke="'+rust+'" stroke-width="2"/>'+text(35,182,'Skin',ink,14)+
    arrow(55,140,112,140,blue,2)+text(72,121,'Sensory',blue,13)+
    '<rect x="115" y="98" width="83" height="85" rx="16" fill="#e5eaf8" stroke="'+blue+'" stroke-width="2"/>'+text(156,122,'Spinal',ink,14)+text(156,154,'cord',ink,14)+
    arrow(199,140,251,140,teal,2)+text(226,121,'Motor',teal,13)+
    '<path d="M253 117 Q310 95 303 164 Q270 177 253 161 Z" fill="#efc8c2" stroke="'+rust+'" stroke-width="2"/>'+text(280,188,'Muscle',ink,14)+
    text(160,220,'Automatic withdrawal',ink,15),
    'Follow the spinal pathway to the muscle. The brain can also receive signals, but the rapid withdrawal does not wait for a conscious decision.',240);
}
function reflexWithSynapse() {
  const group = node('div');
  group.append(neuron(), fig('Across a synapse',
    'An electrical impulse reaches the end of one neurone. A chemical transmitter crosses the synaptic gap and binds to receptors on the next neurone, triggering a new electrical impulse.',
    '<path d="M18 45 H116 Q133 45 133 62 V120 Q133 137 116 137 H18 Z" fill="#dce9f8" stroke="'+blue+'" stroke-width="2"/>'+
    '<path d="M210 45 H302 V137 H210 Q193 137 193 120 V62 Q193 45 210 45 Z" fill="#d8eee6" stroke="'+teal+'" stroke-width="2"/>'+
    arrow(38,90,110,90,blue,2)+text(71,71,'Impulse',blue,14)+
    circle(151,74,4,rust,rust)+circle(160,91,4,rust,rust)+circle(151,107,4,rust,rust)+arrow(142,90,181,90,rust,2)+
    arrow(212,90,279,90,teal,2)+text(247,71,'Impulse',teal,14)+text(161,28,'Chemical crosses gap',rust,13)+text(160,161,'Synaptic gap',ink,14),
    'Follow the signal across the small gap: a chemical carries it between the two neurones.',175));
  return group;
}
function emissions() {
  return fig('Three emissions from a nucleus',
    'Alpha is a helium nucleus containing two protons and two neutrons. Beta minus is an electron emitted from the nucleus. Gamma is an electromagnetic wave.',
    circle(67,78,26,'#e8eaf6',blue)+circle(58,69,8,'#e7b2a3',rust)+circle(75,69,8,'#e7b2a3',rust)+circle(58,87,8,'#bed5eb',blue)+circle(75,87,8,'#bed5eb',blue)+
    text(67,115,'Alpha',ink,14)+text(67,147,'2p + 2n',ink,13)+circle(159,78,10,'#c6e0f5',blue)+text(159,83,'−',blue,16)+text(159,115,'Beta',ink,14)+text(159,147,'electron',ink,13)+
    '<path d="M230 79 q6-20 12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="'+teal+'" stroke-width="3"/>'+text(263,115,'Gamma',ink,14)+text(263,147,'wave',ink,13),
    'Compare the composition of each emission. The sketches are not to scale.',170);
}
function temperaturePractical() {
  return fig('Measure a temperature change',
    'A thermometer is held in a reaction mixture in an insulated cup with a lid. The initial temperature and the highest or lowest temperature after mixing are recorded.',
    '<path d="M54 66 L67 155 H155 L168 66 Z" fill="#e2f0ee" stroke="'+teal+'" stroke-width="3"/>'+
    '<path d="M64 103 H158 L151 151 H71 Z" fill="#c7dfea"/>'+line(48,65,174,65,ink,5)+line(115,19,115,120,rust,5)+circle(115,121,7,rust,rust)+
    text(228,25,'Thermometer',ink,14)+line(125,24,166,24,ink,1.5)+text(242,93,'Insulated cup',ink,13)+line(170,89,189,89,ink,1.5)+
    text(229,125,'Stir and record',ink,14)+text(229,157,'peak or minimum',ink,14),
    'Compare the starting temperature with the peak or minimum. Insulation reduces energy transfer to the surroundings.');
}


function irradiation() {
  return fig('Exposure and contamination',
    'During irradiation radiation from a source reaches a person but radioactive material is not transferred. During contamination particles of radioactive material are deposited on the person and can continue emitting radiation.',
    circle(33,64,13,'#e8d3cb',rust)+text(45,40,'Source',ink,13)+arrow(48,64,95,64,rust)+
    '<circle cx="119" cy="42" r="10" fill="none" stroke="'+ink+'" stroke-width="2"/><path d="M119 52 V91 M102 68 H136 M119 91 L105 116 M119 91 L133 116" stroke="'+ink+'" stroke-width="2" fill="none"/>'+text(79,146,'Irradiation',ink,14)+
    circle(195,64,13,'#e8d3cb',rust)+text(195,40,'Source',ink,13)+arrow(209,64,252,64,rust)+circle(250,75,4,rust,rust)+circle(264,84,4,rust,rust)+
    '<circle cx="267" cy="42" r="10" fill="none" stroke="'+ink+'" stroke-width="2"/><path d="M267 52 V91 M250 68 H284 M267 91 L253 116 M267 91 L281 116" stroke="'+ink+'" stroke-width="2" fill="none"/>'+text(237,146,'Contamination',ink,14),
    'Compare radiation reaching the person with radioactive material being deposited on them.');
}
function density() {
  return fig('Equal volume, different mass',
    'Two equal-size blocks each have volume 1 cubic centimetre. Block A has mass 2 grams and block B has mass 4 grams. Their densities are 2 and 4 grams per cubic centimetre respectively.',
    '<rect x="40" y="42" width="80" height="80" fill="#d7e9f4" stroke="'+blue+'" stroke-width="2"/>'+text(80,36,'A',blue,16)+text(80,87,'2 g',ink,17)+text(80,148,'2 g/cm³',ink,15)+
    '<rect x="200" y="42" width="80" height="80" fill="#f4ddce" stroke="'+rust+'" stroke-width="2"/>'+text(240,36,'B',rust,16)+text(240,87,'4 g',ink,17)+text(240,148,'4 g/cm³',ink,15)+
    text(160,177,'Each block: volume 1 cm³',ink,14),
    'Compare the masses of equal volumes: density is mass divided by volume. Values are worked examples.');
}
function alkene() {
  return fig('A cracking example',
    'One butane molecule, C4H10, can crack into one ethane molecule, C2H6, and one ethene molecule, C2H4. Ethene has a carbon–carbon double bond. The atom count is the same on both sides.',
    text(67,24,'Butane',ink,15)+text(67,54,'C₄H₁₀',blue,19)+
    [34,56,78,100].map(x=>circle(x,82,8,'#dbe7f0',blue)).join('')+
    line(42,82,48,82)+line(64,82,70,82)+line(86,82,92,82)+arrow(115,82,151,82,rust,2)+
    text(195,24,'Ethane',ink,15)+text(195,54,'C₂H₆',blue,18)+circle(185,82,8,'#dbe7f0',blue)+circle(205,82,8,'#dbe7f0',blue)+line(193,82,197,82)+
    text(268,24,'Ethene',ink,15)+text(268,54,'C₂H₄',blue,18)+circle(258,82,8,'#dbe7f0',blue)+circle(278,82,8,'#dbe7f0',blue)+line(266,79,270,79)+line(266,85,270,85)+
    text(160,128,'C: 4 → 2 + 2',ink,15)+text(160,155,'H: 10 → 6 + 4',ink,15),
    'Count the atoms on both sides. Ethene contains a carbon–carbon double bond; hydrogen atoms are omitted from the structural sketch.');
}
function emSpectrum() {
  const names=['Radio','Microwaves','Infrared','Visible','Ultraviolet','X-rays','Gamma'];
  const colours=['#d9e7f1','#cfdfef','#f1d0c0','#f4dd9a','#e5d5ed','#d8d8e8','#c3d0dc'];
  return fig('The electromagnetic spectrum',
    'From top to bottom, wavelength decreases and frequency increases: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays and gamma rays. All travel at the same speed in a vacuum.',
    names.map((n,i)=>'<rect x="10" y="'+(20+i*28)+'" width="150" height="25" rx="3" fill="'+colours[i]+'" stroke="#687e86"/>'+text(85,38+i*28,n,ink,19)).join('')+
    arrow(180,33,180,205,blue,2)+text(245,75,'Frequency',blue,18)+text(245,107,'increases',blue,18)+
    arrow(310,205,310,33,rust,2)+text(245,147,'Wavelength',rust,17)+text(245,179,'increases',rust,18),
    'Read down the bands for increasing frequency. Their displayed sizes are illustrative, not to scale.',225);
}

function electromagneticWaves() {
  const wave=(y,period)=>Array.from({length:81},(_,i)=>{const x=20+2.8*i;return x+','+(y-13*Math.sin((x-20)*Math.PI*2/period)).toFixed(1)}).join(' ');
  return fig('Electromagnetic waves in a vacuum',
    'Two schematic electromagnetic waves travel to the right at the same speed in a vacuum. The wave with the shorter wavelength has more oscillations over the same distance. The oscillation is transverse, perpendicular to the direction of travel.',
    '<polyline points="'+wave(49,112)+'" fill="none" stroke="'+blue+'" stroke-width="3"/><polyline points="'+wave(121,56)+'" fill="none" stroke="'+rust+'" stroke-width="3"/>'+
    arrow(231,21,292,21,blue,2)+arrow(231,93,292,93,rust,2)+arrow(25,67,25,32,ink,1.5)+
    text(111,21,'Longer wavelength',ink,14)+text(111,93,'Shorter wavelength',ink,14)+text(160,170,'Same speed in a vacuum',ink,15),
    'Compare the wavelength and the equal travel arrows. The oscillations are perpendicular to the direction of travel; spacing is illustrative.',185);
}
function spectrumAndWaves(){return grouped(emSpectrum,electromagneticWaves);}
function highLightExperiment() {
  return fig('Testing a limiting factor',
    'A lamp illuminates pondweed in water. Gas collects in an inverted measuring cylinder. Compare oxygen collected per minute at two carbon dioxide supplies, keeping light, temperature and the pondweed the same.',
    '<path d="M33 90 H92 L80 54 H45 Z" fill="#ffe5ae" stroke="'+rust+'" stroke-width="2"/>'+line(62,90,62,134)+line(37,135,87,135)+
    arrow(100,82,153,95,rust,2)+text(63,30,'Lamp',ink,14)+
    '<path d="M160 82 H286 V153 H160 Z" fill="#dbeef4"/>'+
    '<path d="M158 47 V155 H288 V47 M208 98 V19 H257 V98" fill="none" stroke="'+ink+'" stroke-width="2"/>'+
    '<path d="M200 147 Q214 120 211 105 M212 123 Q190 114 192 105 M211 117 Q230 109 229 97" fill="none" stroke="'+teal+'" stroke-width="3"/>'+
    circle(222,87,3,'white',blue)+circle(230,74,3,'white',blue)+text(280,56,'Gas',blue,14)+text(225,172,'Pondweed',teal,14)+text(225,198,'CO₂ in solution',blue,14),
    'Collect oxygen per minute. Change carbon dioxide supply in the solution while keeping other factors the same.',215);
}
function homeostasis() {
  return fig('A negative feedback response',
    'A receptor detects a change from the normal level. A coordination centre sends a signal to an effector. The response reverses the change, reducing the original stimulus.',
    circle(52,64,26,'#dce8f3',blue)+text(52,69,'R',ink,16)+text(52,106,'Receptor',ink,13)+arrow(80,64,123,64,blue,2)+
    circle(160,64,32,'#e7ebf7',blue)+text(160,69,'C',ink,16)+text(160,109,'Coordinator',ink,13)+arrow(193,64,236,64,teal,2)+
    circle(267,64,26,'#d9eee5',teal)+text(267,69,'E',ink,16)+text(267,106,'Effector',ink,13)+
    '<path d="M267 114 C267 153 52 153 52 114" fill="none" stroke="'+rust+'" stroke-width="2"/>'+arrow(52,129,52,114,rust,2)+text(160,158,'Response reduces the change',rust,14),
    'Follow detection, coordination and response. Negative feedback reduces the original change.',175);
}
function diabetes() {
  return fig('Two forms of diabetes',
    'In Type 1 diabetes the pancreas produces little or no insulin. In Type 2 diabetes insulin is produced but body cells respond less well to it. The diagrams simplify both conditions.',
    '<path d="M22 49 Q56 20 88 49 Q80 73 40 71 Z" fill="#efc7b7" stroke="'+rust+'" stroke-width="2"/>'+text(56,27,'Type 1',ink,15)+text(56,100,'Too little',rust,14)+text(56,132,'insulin',rust,14)+
    '<path d="M170 49 Q204 20 236 49 Q228 73 188 71 Z" fill="#efc7b7" stroke="'+rust+'" stroke-width="2"/>'+text(205,27,'Type 2',ink,15)+circle(238,84,4,blue,blue)+circle(249,84,4,blue,blue)+
    '<circle cx="280" cy="83" r="27" fill="#dceee5" stroke="'+teal+'" stroke-width="2"/>'+text(280,88,'Cell',teal,14)+text(238,127,'Reduced cell',ink,14)+text(238,159,'response',ink,14),
    'Compare the source of insulin with the response of the body cells. Real patients have varied symptoms and treatments.',175);
}
function waterTreatment() {
  return fig('Drinking water and pure water',
    'Water suitable for drinking is not necessarily pure water. It can contain dissolved substances at acceptable concentrations; harmful substances and microbes must be at safe levels.',
    '<rect x="37" y="26" width="105" height="118" rx="5" fill="#dceff5" stroke="'+blue+'" stroke-width="2"/>'+text(89,165,'Potable water',ink,14)+
    [[57,56],[83,44],[115,67],[70,91],[106,120]].map(([x,y])=>circle(x,y,5,'#c9e4f3',blue)).join('')+circle(92,79,3,rust,rust)+circle(61,122,3,rust,rust)+
    '<rect x="179" y="26" width="105" height="118" rx="5" fill="#dceff5" stroke="'+blue+'" stroke-width="2"/>'+text(231,165,'Pure water',ink,14)+
    [[198,56],[224,44],[256,67],[211,91],[247,120]].map(([x,y])=>circle(x,y,5,'#c9e4f3',blue)).join('')+
    '',
    'The filled dots represent dissolved substances. Compare the samples; the model does not show actual concentrations.');
}
function waterSafetyTests() {
  return fig('Checking water is safe to drink',
    'A drinking-water sample is checked for microorganisms and harmful chemicals. The results are compared with the relevant safety limits. This is a schematic of the checks, not a set of real test results.',
    '<path d="M37 39 V104 H112 V39 M39 64 H110" fill="#dceef5" stroke="'+ink+'" stroke-width="2"/>'+text(74,130,'Sample',blue,15)+line(122,73,155,73,teal,2)+line(155,58,155,107,teal,2)+arrow(155,58,168,58,teal,2)+arrow(155,107,168,107,teal,2)+
    '<circle cx="188" cy="58" r="17" fill="#e2edf5" stroke="'+blue+'" stroke-width="2"/>'+line(181,58,195,58,blue,2)+line(188,51,188,65,blue,2)+text(216,64,'Microbes',ink,15,'start')+
    '<path d="M176 107 l12 -20 12 20 -12 20 z" fill="#f3e1d7" stroke="'+rust+'" stroke-width="2"/>'+text(216,113,'Chemicals',ink,15,'start')+
    text(160,175,'Compare results with limits',teal,15),
    'The two checks address microbes and harmful chemicals. Limits depend on what is being tested; this model does not show measured results.',195);
}
function waterForDrinking(){return grouped(waterTreatment,waterSafetyTests);}
function glucoseFates() {
  const glucose=(x,y)=>'<polygon points="'+(x-10)+','+y+' '+(x-5)+','+(y-9)+' '+(x+5)+','+(y-9)+' '+(x+10)+','+y+' '+(x+5)+','+(y+9)+' '+(x-5)+','+(y+9)+'" fill="#e2efe4" stroke="'+teal+'" stroke-width="2"/>';
  return fig('What a plant can do with glucose',
    'A plant can use glucose in respiration, or link glucose units to make starch for storage. The hexagons are simplified symbols for glucose units; the drawing is not a molecular structure or to scale.',
    glucose(160,44)+text(160,25,'Glucose',teal,15)+arrow(149,56,97,99,blue,2)+arrow(171,56,223,99,rust,2)+
    '<ellipse cx="75" cy="130" rx="47" ry="27" fill="#f4ddd4" stroke="'+rust+'" stroke-width="2"/><path d="M40 130 q9 -17 18 0 t18 0 t18 0 t18 0" fill="none" stroke="'+rust+'" stroke-width="2"/>'+text(75,186,'Respiration',rust,15)+
    glucose(207,130)+line(218,130,226,130,teal,2)+glucose(237,130)+line(248,130,256,130,teal,2)+glucose(267,130)+text(237,186,'Starch',teal,15)+text(237,218,'for storage',teal,15),
    'Follow glucose into respiration or into a chain used for storage. Each hexagon stands for one glucose unit.',240);
}
export function atomsRearranged() {
  return fig('Atoms are rearranged in a reaction',
    'One hydrogen molecule and one chlorine molecule react to form two hydrogen chloride molecules. There are two hydrogen atoms and two chlorine atoms both before and after. Colours distinguish the two elements; the model is not to scale.',
    text(160,25,'Before',ink,15)+circle(55,70,10,'#d9e8f5',blue)+circle(79,70,10,'#d9e8f5',blue)+line(65,70,69,70,ink,2)+
    text(110,75,'+',ink,18)+circle(140,70,10,'#d9eee2',teal)+circle(164,70,10,'#d9eee2',teal)+line(150,70,154,70,ink,2)+
    text(67,107,'H₂',blue,15)+text(152,107,'Cl₂',teal,15)+arrow(160,119,160,144,rust,2)+text(160,170,'After',ink,15)+
    circle(75,211,10,'#d9e8f5',blue)+circle(99,211,10,'#d9eee2',teal)+line(85,211,89,211,ink,2)+circle(206,211,10,'#d9e8f5',blue)+circle(230,211,10,'#d9eee2',teal)+line(216,211,220,211,ink,2)+
    text(87,246,'HCl',ink,15)+text(218,246,'HCl',ink,15),
    'Count each kind of atom before and after. The atoms are joined differently but none are lost or created in this model.',265);
}
function photosynthesisAndGlucose(){return grouped(gcseStepVisuals['photosynthesis-limits'][0],glucoseFates);}
export function heatingCurve() {
  return fig('Heating ice and water',
    'As energy is supplied ice warms to 0 degrees Celsius. At 0 degrees Celsius the temperature stays constant while the ice melts. After melting the liquid water warms. The example assumes ordinary atmospheric pressure.',
    line(45,150,291,150,ink,2)+line(45,150,45,35,ink,2)+line(40,95,291,95,'#8b9d9c',1,'5 4')+
    '<polyline points="55,140 115,95 205,95 275,43" fill="none" stroke="'+teal+'" stroke-width="3.5"/>'+
    text(45,22,'Temperature (°C)',ink,15,'start')+text(37,100,'0',ink,14,'end')+text(171,91,'Melting',teal,14)+text(166,182,'Energy supplied',ink,14),
    'Read the 0 °C plateau: energy continues to be supplied while ice melts at atmospheric pressure.',195);
}
function heatParticles() {
  const points=[[30,45],[80,45],[130,45],[40,95],[90,95],[130,95]];
  const p=(offset,len)=>points.map(([x,y],i)=>circle(x+offset,y,5,'#c2dfed',blue)+arrow(x+offset,y,x+offset+(i%2?-len:len),y,blue,1.3)).join('');
  return fig('Particle motion and temperature',
    'In the same gas, particles in a warmer sample have a higher average kinetic energy and are shown with longer motion arrows. Particles have the same size in the two models.',
    '<rect x="8" y="25" width="145" height="98" fill="none" stroke="'+ink+'" stroke-width="2"/><rect x="168" y="25" width="145" height="98" fill="none" stroke="'+ink+'" stroke-width="2"/>'+p(0,7)+p(160,17)+text(80,148,'Cooler',ink,15)+text(240,148,'Warmer',ink,15),
    'Compare the arrow lengths: higher temperature means greater average particle kinetic energy. Real particles move in many directions.',165);
}

function halfLifeRatio() {
  return fig('A reduction over two half-lives',
    'Activity halves from 48 becquerels to 24 becquerels, then halves again to 12 becquerels. The starting activity is four times the final activity, giving a ratio of 4 to 1.',
    '<rect x="38" y="32" width="54" height="120" fill="#bcd6e9" stroke="'+blue+'"/><rect x="133" y="92" width="54" height="60" fill="#bcd6e9" stroke="'+blue+'"/><rect x="228" y="122" width="54" height="30" fill="#bcd6e9" stroke="'+blue+'"/>'+
    text(65,25,'48 Bq',ink,15)+text(160,85,'24 Bq',ink,15)+text(255,115,'12 Bq',ink,15)+arrow(95,65,130,65,rust,2)+arrow(190,105,225,105,rust,2)+
    text(160,168,'Start : finish = 4 : 1',ink,16),
    'Halve the remaining activity twice, then compare the first and final activity.');
}
function reactionBonds() {
  return fig('Energy and chemical bonds',
    'In this example hydrogen and chlorine molecules form hydrogen chloride. Energy is taken in to break bonds in the reactants, and energy is released when new bonds form in the products.',
    circle(44,53,9,'#d9e8f5',blue)+circle(70,53,9,'#d9e8f5',blue)+line(53,53,61,53)+text(57,81,'H₂',blue,15)+
    circle(110,53,9,'#d9eee2',teal)+circle(136,53,9,'#d9eee2',teal)+line(119,53,127,53)+text(123,81,'Cl₂',teal,15)+
    arrow(151,53,189,53,rust,2)+circle(214,53,9,'#d9e8f5',blue)+circle(240,53,9,'#d9eee2',teal)+line(223,53,231,53)+
    circle(263,53,9,'#d9e8f5',blue)+circle(289,53,9,'#d9eee2',teal)+line(272,53,280,53)+text(252,81,'2 HCl',ink,15)+
    arrow(90,110,90,136,rust,2)+text(80,156,'Break bonds',rust,14)+text(80,188,'Energy in',rust,14)+arrow(238,136,238,110,blue,2)+text(240,156,'Form bonds',blue,14)+text(240,188,'Energy out',blue,14),
    'Compare energy needed to break reactant bonds with energy released as product bonds form. Atom counts are conserved.',205);
}
function acidStrength() {
  const cross=(x,y,c)=>text(x,y,c,ink,17);
  return fig('Strength and concentration',
    'Two acid solutions contain equal total amounts of acid particles in equal volumes. In the strong acid the acid is almost completely ionised into hydrogen and negative ions; in the weak acid only some acid molecules are ionised.',
    '<rect x="14" y="32" width="130" height="110" fill="#e8f4f5" stroke="'+blue+'" stroke-width="2"/><rect x="176" y="32" width="130" height="110" fill="#e8f4f5" stroke="'+blue+'" stroke-width="2"/>'+
    text(79,24,'Strong acid',ink,15)+text(241,24,'Weak acid',ink,15)+
    cross(40,62,'H⁺')+cross(68,62,'A⁻')+cross(102,62,'H⁺')+cross(126,62,'A⁻')+cross(40,102,'H⁺')+cross(68,102,'A⁻')+cross(102,102,'H⁺')+cross(126,102,'A⁻')+
    cross(206,62,'HA')+cross(250,62,'HA')+cross(206,102,'HA')+cross(252,102,'H⁺')+cross(280,102,'A⁻')+
    text(160,169,'Same total acid concentration',ink,14),
    'Compare the fraction ionised in equal volumes. Strength is not the same as the concentration of the acid solution.');
}
function molarRatio() {
  return fig('Formula and reaction ratios',
    'Two magnesium atoms react with one oxygen molecule to form two units of magnesium oxide. The balanced coefficient ratio is two magnesium to one oxygen molecule to two magnesium oxide, and also applies to amounts in moles.',
    circle(38,72,10,'#d6e8f4',blue)+circle(62,72,10,'#d6e8f4',blue)+text(50,47,'2 Mg',blue,16)+
    text(89,77,'+',ink,18)+circle(113,72,10,'#f4d7cb',rust)+circle(137,72,10,'#f4d7cb',rust)+line(123,69,127,69)+line(123,75,127,75)+text(125,47,'O₂',rust,16)+
    arrow(152,72,188,72,ink,2)+circle(209,72,10,'#d6e8f4',blue)+circle(230,72,10,'#f4d7cb',rust)+circle(260,72,10,'#d6e8f4',blue)+circle(281,72,10,'#f4d7cb',rust)+text(245,47,'2 MgO',ink,16)+
    text(160,127,'2 mol : 1 mol : 2 mol',ink,16)+text(160,159,'Compare mole amounts',ink,14),
    'Use the balanced coefficients as an amount ratio. Convert mass to moles before applying it.');
}

function collisionFrequency() {
  const dots=(pts)=>pts.map(([x,y])=>circle(x,y,5,'#b9d9ec',blue)).join('');
  return fig('Concentration and collisions',
    'Two equal volumes contain the same kind of moving particles. The concentrated sample has more particles in the same volume, leading to more frequent collisions. The arrows illustrate movement; real particles move in many directions.',
    '<rect x="14" y="33" width="130" height="100" fill="none" stroke="'+ink+'" stroke-width="2"/><rect x="176" y="33" width="130" height="100" fill="none" stroke="'+ink+'" stroke-width="2"/>'+
    dots([[38,57],[93,80],[62,112]])+dots([[192,56],[217,64],[240,48],[276,57],[201,101],[229,111],[255,87],[286,111]])+
    arrow(42,56,63,56,blue,1.5)+arrow(221,64,239,64,blue,1.5)+arrow(275,87,256,87,blue,1.5)+
    text(79,23,'Dilute',ink,15)+text(241,23,'Concentrated',ink,15)+text(160,165,'Same volume',ink,15),
    'Compare particle numbers in equal volumes. More concentrated reactants collide more often. Higher temperature also changes the energy distribution.');
}
function dynamicEquilibrium() {
  return fig('Reactions continue in both directions',
    'At dynamic equilibrium in a closed system, the forward and reverse reactions continue at equal rates. Product and reactant concentrations stay constant, but need not be equal.',
    '<rect x="20" y="30" width="280" height="110" rx="12" fill="#f4f8f8" stroke="'+ink+'" stroke-width="2"/>'+
    circle(59,60,8,'#c6dff0',blue)+circle(88,102,8,'#c6dff0',blue)+circle(115,58,8,'#c6dff0',blue)+
    circle(211,60,8,'#efcabc',rust)+circle(253,102,8,'#efcabc',rust)+
    arrow(132,72,189,72,teal,2)+arrow(189,100,132,100,rust,2)+text(160,60,'Forward',teal,13)+text(160,122,'Reverse',rust,13)+
    text(76,165,'Reactants',blue,14)+text(241,165,'Products',rust,14),
    'The two arrows show equal reaction rates, not stopped particles or necessarily equal concentrations.');
}
function equilibriumStart() {
  return fig('At the start of the model',
    'A closed vessel initially contains reactant but no product in this model. The forward reaction can form product; the reverse rate starts at zero because no product is present yet.',
    '<rect x="20" y="35" width="280" height="112" rx="10" fill="#f4f8f8" stroke="'+ink+'" stroke-width="2"/>'+
    circle(48,66,8,'#c6dff0',blue)+circle(79,66,8,'#c6dff0',blue)+circle(110,66,8,'#c6dff0',blue)+circle(48,111,8,'#c6dff0',blue)+circle(79,111,8,'#c6dff0',blue)+circle(110,111,8,'#c6dff0',blue)+
    arrow(142,90,216,90,teal,3)+text(224,76,'Product',rust,15)+text(224,108,'forms',rust,15)+text(80,177,'Reactant',blue,15),
    'Start with reactant in the closed vessel. As product forms, the reverse reaction can begin; the particle count is a model.',195);
}
function equilibriumRateGraph() {
  return fig('Both reaction rates change',
    'In the worked model, forward reaction rate falls from 8 to 5 to 4 arbitrary units at 0, 2 and 4 minutes. Reverse rate rises from 0 to 3 to 4 at the same times. Both remain at 4 at 6 minutes. The curves coincide from 4 to 6 minutes but both reactions continue.',
    text(55,23,'Rate (arbitrary units)',ink,15,'start')+line(55,170,285,170)+line(55,170,55,40)+
    '<polyline points="55,50 125,95 195,110 265,110" fill="none" stroke="'+blue+'" stroke-width="4"/><polyline points="55,170 125,125 195,110 265,110" fill="none" stroke="'+rust+'" stroke-width="2.5" stroke-dasharray="6 4"/>'+
    text(43,175,'0',ink,14,'end')+text(43,115,'4',ink,14,'end')+text(43,55,'8',ink,14,'end')+
    text(55,192,'0',ink,14)+text(125,192,'2',ink,14)+text(195,192,'4',ink,14)+text(265,192,'6',ink,14)+text(160,224,'Time (min)',ink,15)+
    line(32,252,58,252,blue,4)+text(106,258,'Forward',ink,14)+line(177,252,203,252,rust,2,'6 4')+text(251,258,'Reverse',ink,14),
    'Read both lines at 4 minutes. They coincide at a non-zero rate; the reactions continue in both directions. Values are illustrative.',275);
}
function saltsApparatus() {
  return fig('Making soluble salt crystals',
    'Copper oxide is added in excess to warm sulfuric acid. The mixture is filtered to remove excess solid. The copper sulfate solution is evaporated to concentrate it and cooled to crystallise.',
    '<path d="M18 50 H90 L84 117 H25 Z" fill="#d8edf1" stroke="'+ink+'" stroke-width="2"/>'+circle(41,88,3,ink,ink)+circle(57,100,3,ink,ink)+circle(70,88,3,ink,ink)+text(65,35,'Oxide',ink,13)+
    arrow(96,84,127,84,rust,2)+'<path d="M130 48 H187 L164 78 V113 H153 V78 Z" fill="#edf5ee" stroke="'+ink+'" stroke-width="2"/>'+line(139,62,178,62,teal,2)+text(159,35,'Filter',ink,14)+
    arrow(192,84,218,84,rust,2)+'<path d="M223 89 Q253 115 283 89 M226 89 H280" fill="#d8edf1" stroke="'+ink+'" stroke-width="2"/>'+text(253,35,'Evaporate',ink,14)+text(253,143,'then cool',ink,14),
    'Add the oxide in excess, then follow the solid through filtration and the solution through concentration and cooling.');
}
function rulerDrop() {
  return fig('A ruler-drop test',
    'A ruler is held vertically, with its zero level at the upper edges of an open thumb and finger. It is released without warning; the distance at the top of the fingers when caught is read.',
    '<rect x="118" y="12" width="36" height="93" fill="#fff2d7" stroke="'+ink+'" stroke-width="2"/>'+
    Array.from({length:7},(_,i)=>line(141,20+i*13,153,20+i*13,ink,1)).join('')+
    text(122,101,'0',ink,14,'start')+line(140,105,154,105,ink,2)+
    '<path d="M61 106 Q75 90 98 97 L116 104 M180 106 Q165 90 162 97 L155 104" fill="none" stroke="'+rust+'" stroke-width="5"/>'+
    line(115,105,155,105,teal,2,'4 3')+text(132,165,'Read at finger level',ink,14)+arrow(183,38,183,82,blue,2)+text(213,29,'Release',blue,14),
    'Align zero at the fingers before release; read the distance at the same level on catching.');
}
function brine() {
  return fig('Electrolysis of brine',
    'In concentrated aqueous sodium chloride, sodium ions and hydrogen-containing species are present. Hydrogen forms at the negative electrode rather than sodium. Chlorine forms at the positive electrode.',
    '<path d="M36 48 V139 H284 V48" fill="none" stroke="'+ink+'" stroke-width="2"/><path d="M38 72 H282 V137 H38 Z" fill="#deeff3"/>'+
    '<rect x="79" y="43" width="12" height="70" fill="#70848b"/><rect x="229" y="43" width="12" height="70" fill="#70848b"/>'+
    text(85,29,'−',blue,21)+text(235,29,'+',rust,21)+text(85,161,'Hydrogen',blue,14)+text(235,161,'Chlorine',rust,14)+
    circle(127,89,12,'#e7ecf9',blue)+text(127,94,'Na⁺',blue,13)+text(185,110,'water',ink,14)+arrow(160,105,98,105,blue,2)+
    text(160,190,'Sodium ions stay in water',ink,13),
    'Water is present in brine: hydrogen is produced at the negative electrode instead of sodium. The diagram represents concentrated solution.',210);
}
function reflexMeasure(){return rulerDrop();}
function treatmentTesting() {
  const person=x=>circle(x,100,5,'#d7e9ef',blue)+'<path d="M'+x+' 105 v17 m-7-9 h14 m-7 9 -6 9 m6-9 6 9" stroke="'+blue+'" stroke-width="2" fill="none"/>';
  return fig('Stages in testing a medicine',
    'Potential medicines may first be tested using cells, tissues and animals as appropriate. Clinical testing starts with safety and dose in smaller groups and progresses to larger comparisons of effectiveness, often with controls.',
    circle(45,82,14,'#d4ecde',teal)+circle(71,92,14,'#d4ecde',teal)+text(58,132,'Cells',ink,13)+
    arrow(91,85,126,85,rust,2)+'<ellipse cx="149" cy="93" rx="19" ry="12" fill="#e4e5ea" stroke="'+ink+'"/>'+circle(164,83,6,'#e4e5ea',ink)+text(150,132,'Animals*',ink,13)+
    arrow(174,85,200,85,rust,2)+person(215)+person(238)+person(261)+person(284)+text(249,151,'People',ink,13),
    'Follow the progression towards human trials. *Animal studies are used where appropriate; each stage has its own purpose.',170);
}
function respiratoryComparison() {
  return fig('Aerobic and anaerobic respiration',
    'Aerobic respiration uses glucose and oxygen and produces carbon dioxide and water. In the GCSE muscle model anaerobic respiration produces lactic acid. Yeast anaerobic respiration produces ethanol and carbon dioxide.',
    text(18,25,'Aerobic',ink,15,'start')+text(18,57,'Glucose + O₂',blue,15,'start')+arrow(157,52,190,52,teal,2)+text(198,57,'CO₂ + H₂O',teal,15,'start')+
    line(16,75,304,75,'#aabebc',1)+text(18,100,'Anaerobic in muscle',ink,15,'start')+text(18,132,'Glucose',blue,15,'start')+arrow(102,127,147,127,rust,2)+text(157,132,'Lactic acid',rust,15,'start')+
    line(16,149,304,149,'#aabebc',1)+text(18,174,'Anaerobic in yeast',ink,15,'start')+text(18,206,'Glucose',blue,15,'start')+arrow(102,201,147,201,rust,2)+text(157,206,'Ethanol + CO₂',rust,15,'start'),
    'Compare the inputs and products. If oxygen supply cannot meet demand, muscle cells can also respire anaerobically, transferring less energy per glucose.',225);
}
function menstrualHormones() {
  return fig('Hormones act on target organs',
    'The pituitary gland releases FSH and LH into the blood. FSH supports follicle maturation; a surge of LH triggers ovulation. The ovary releases oestrogen and progesterone, which act on the uterus lining.',
    circle(130,33,22,'#e1e6f7',blue)+text(130,38,'P',ink,16)+text(177,38,'Pituitary',ink,15,'start')+
    arrow(130,57,130,85,blue,2)+text(177,76,'via blood',ink,15,'start')+text(13,66,'FSH',blue,20,'start')+text(13,98,'LH',blue,20,'start')+
    '<ellipse cx="130" cy="111" rx="28" ry="20" fill="#f3d6ce" stroke="'+rust+'" stroke-width="2"/>'+circle(130,111,7,'#f6eee1',rust)+text(177,116,'Ovary',ink,15,'start')+
    arrow(130,133,130,160,teal,2)+text(5,140,'Oestrogen',teal,16,'start')+text(5,172,'Progesterone',teal,16,'start')+
    '<path d="M109 166 Q110 193 130 201 Q150 193 151 166 L140 174 L130 183 L120 174 Z" fill="#f4d2cc" stroke="'+rust+'" stroke-width="2"/>'+text(177,182,'Uterus',ink,15,'start')+text(177,214,'lining',ink,14,'start'),
    'FSH helps a follicle mature; LH triggers ovulation. Oestrogen helps rebuild the uterus lining; progesterone helps maintain it. Hormones travel in blood. The organ sketches are simplified.',235);
}


function physicalBarriers() {
  return fig('Skin and mucus as barriers',
    'Intact skin forms a physical barrier that prevents many pathogens entering the body. In the airways, mucus traps pathogens; cilia help move mucus out of the airways.',
    text(76,25,'Intact skin',ink,15)+circle(48,48,6,'#b8cfed',blue)+circle(79,48,6,'#b8cfed',blue)+circle(111,48,6,'#b8cfed',blue)+
    '<rect x="16" y="65" width="120" height="33" fill="#efd4bf" stroke="'+rust+'" stroke-width="2"/>'+text(76,128,'Barrier',rust,14)+
    text(239,25,'Airway mucus',ink,15)+'<rect x="179" y="66" width="120" height="30" fill="#dcece5" stroke="'+teal+'" stroke-width="2"/>'+
    circle(201,77,6,'#b8cfed',blue)+circle(236,84,6,'#b8cfed',blue)+circle(274,76,6,'#b8cfed',blue)+arrow(197,108,282,108,teal,2),
    'Compare intact skin blocking entry with mucus trapping pathogens. The sketches are simplified.',145);
}
function barriersAndAntibodies(){return grouped(physicalBarriers,gcseStepVisuals['vaccine-memory'][0]);}
function antibioticTargets() {
  return fig('Why antibiotics do not treat viruses',
    'A bacterium has its own cell structures, including a cell wall and ribosomes. A virus has genetic material in a protein coat and uses a host cell to reproduce. Some antibiotics target bacterial cell structures; viruses do not have these bacterial targets.',
    '<rect x="34" y="43" width="95" height="54" rx="26" fill="#dceee6" stroke="'+teal+'" stroke-width="3"/>'+circle(62,65,4,blue,blue)+circle(81,76,4,blue,blue)+circle(105,63,4,blue,blue)+text(81,122,'Bacterium',ink,15)+
    '<path d="M229 36 L254 50 V82 L229 97 L204 82 V50 Z" fill="#e1e8f7" stroke="'+blue+'" stroke-width="3"/>'+
    '<path d="M217 64 q7-10 14 0 t14 0" fill="none" stroke="'+rust+'" stroke-width="2"/>'+text(229,122,'Virus',ink,15)+
    arrow(80,28,80,40,rust,2)+text(85,24,'Antibiotics',rust,13)+text(229,154,'Needs host cells',ink,14),
    'Compare the bacterial cell with the virus. Antibiotics work against susceptible bacteria, not viral infections. The models are not to scale.');
}
function naturalSelection() {
  const moth=(x,y,dark)=>'<path d="M'+x+' '+y+' l-11 -7 v14 z M'+x+' '+y+' l11 -7 v14 z" fill="'+(dark?'#374b50':'#f0e4c9')+'" stroke="#283e43" stroke-width="1.5"/>';
  return fig('Variation and natural selection',
    'On dark bark, some moths have dark wings and some have light wings. If predators find the light moths more often, more dark moths may survive and reproduce. Their offspring can inherit the dark variant, so its frequency can increase over generations.',
    '<rect x="14" y="32" width="130" height="98" rx="5" fill="#6d675e"/><rect x="176" y="32" width="130" height="98" rx="5" fill="#6d675e"/>'+
    moth(43,59,true)+moth(77,59,false)+moth(112,59,true)+moth(43,100,false)+moth(77,100,true)+moth(112,100,false)+
    moth(205,59,true)+moth(241,59,true)+moth(277,59,false)+moth(205,100,true)+moth(241,100,true)+moth(277,100,true)+
    arrow(146,81,174,81,rust,2)+text(79,23,'Variation',ink,15)+text(235,23,'Later',ink,15),
    'Compare the inherited wing colours in the starting and later generations. The example is illustrative, not a record of real population counts.');
}
function genotypeAndPhenotype() {
  return fig('Genotype and visible phenotype',
    'In a simplified single-gene model of pea seed shape, A and a are two alleles. Seeds with AA or Aa are round; seeds with aa are wrinkled. The letter pair is the genotype and the visible seed shape is the phenotype.',
    text(55,25,'AA',ink,16)+text(160,25,'Aa',ink,16)+text(260,25,'aa',ink,16)+
    circle(55,71,25,'#e7edcf',teal,2)+circle(160,71,25,'#e7edcf',teal,2)+
    '<path d="M260 46 q9 -5 14 4 q11 0 10 11 q8 7 1 15 q3 11 -8 13 q-6 10 -16 5 q-10 6 -15 -4 q-11 0 -10 -11 q-8 -8 -1 -15 q-2 -11 9 -13 q6 -9 16 -5 Z" fill="#e7edcf" stroke="'+teal+'" stroke-width="2"/>'+
    text(55,131,'Round',ink,15)+text(160,131,'Round',ink,15)+text(260,131,'Wrinkled',ink,15),
    'Compare the allele pairs with the seed shapes. A and a are model allele labels; the seed shape is the observable phenotype.',150);
}
function predationAndInheritance() {
  const moth=(x,y,colour)=>'<path d="M'+x+' '+y+' l-12 -8 v16 z M'+x+' '+y+' l12 -8 v16 z" fill="'+colour+'" stroke="#283e43" stroke-width="1.5"/>';
  return fig('Selection and inherited variation',
    'On dark bark, a bird may spot and eat a light moth more readily than a camouflaged dark moth. A surviving dark moth may reproduce and pass an allele associated with dark wings to offspring. Two parents contribute alleles; the second parent is omitted from this simplified illustration.',
    text(160,23,'Predation',ink,16)+
    '<rect x="15" y="35" width="290" height="75" rx="5" fill="#6d675e"/>'+circle(55,72,17,'#d8e5e4',ink,2)+circle(59,67,2,ink,ink)+'<path d="M71 67 l20 6 -20 6 z" fill="#f1c49c" stroke="'+ink+'"/>'+arrow(100,73,195,73,rust,2)+moth(232,73,'#f0e4c9')+
    text(160,132,'Light moth is easier to see',ink,15)+text(160,169,'Survival and reproduction',ink,16)+
    '<rect x="15" y="182" width="290" height="57" rx="5" fill="#6d675e"/>'+moth(58,210,'#374b50')+arrow(85,210,230,210,'white',2)+moth(264,210,'#374b50')+
    text(60,260,'Survivor',ink,14)+text(260,260,'Offspring',ink,14)+text(160,286,'Allele may be inherited',teal,15),
    'Notice the bird can find the light moth, then follow the surviving dark moth to offspring. The second parent is omitted.',305);
}
function selectionAndInheritance(){return grouped(naturalSelection,predationAndInheritance);}
function selectiveBreeding() {
  const parent=(x,y,dark)=>circle(x,y,13,dark?'#5b7366':'#e0edd7',teal,2)+line(x,y+13,x,y+25,teal,2)+line(x,y+18,x-9,y+13,teal,2)+line(x,y+18,x+9,y+13,teal,2);
  return fig('Selecting parents for breeding',
    'People select two parent plants with a desired inherited characteristic and breed them. Some offspring inherit the trait, and selected offspring can be bred again. Natural selection depends on differential survival and reproduction in the environment.',
    parent(55,60,true)+parent(110,60,true)+text(82,28,'Chosen parents',ink,15)+arrow(138,74,180,74,rust,2)+
    parent(210,60,true)+parent(262,60,false)+text(237,28,'Offspring vary',ink,15)+
    '<path d="M197 95 h25" stroke="'+rust+'" stroke-width="3"/>'+arrow(210,106,210,135,rust,2)+text(210,164,'Select offspring',ink,14),
    'Follow the chosen parents to the offspring. Only inherited variation can be passed on through breeding.');
}
function gasTests() {
  return fig('Tests for three gases',
    'Carbon dioxide bubbled through limewater makes it cloudy. Oxygen relights a glowing splint. Hydrogen burns with a squeaky pop when a lit splint is applied.',
    '<path d="M25 30 V65 Q35 77 45 65 V30 M25 54 H45" fill="#e3f0f4" stroke="'+ink+'" stroke-width="2"/>'+circle(35,57,5,'#d2d7da','#d2d7da')+
    text(65,40,'Carbon dioxide',ink,15,'start')+text(65,70,'Limewater turns cloudy',blue,14,'start')+
    '<path d="M25 107 V142 Q35 154 45 142 V107" fill="none" stroke="'+ink+'" stroke-width="2"/>'+line(35,100,35,122,rust,3)+circle(35,118,4,'#eeb875',rust)+
    text(65,116,'Oxygen',ink,15,'start')+text(65,146,'Glowing splint relights',rust,14,'start')+
    '<path d="M25 184 V219 Q35 231 45 219 V184" fill="none" stroke="'+ink+'" stroke-width="2"/>'+line(35,176,35,193,rust,3)+text(43,184,'✦',rust,16)+
    text(65,192,'Hydrogen',ink,15,'start')+text(65,222,'Lit splint: squeaky pop',rust,14,'start'),
    'Match each test to its observation. These sketches are simplified; carry out gas tests only using the practical guidance provided.',240);
}
function electrolysisReduction() {
  return fig('Electron gain at the cathode',
    'In molten sodium chloride, a positive sodium ion moves to the negative cathode and gains an electron to form a sodium atom. Electron gain is reduction.',
    '<rect x="36" y="30" width="24" height="90" fill="#82969c"/>'+text(60,22,'Cathode −',ink,14)+
    circle(111,72,22,'#dce8f5',blue)+text(111,77,'Na⁺',blue,17)+arrow(87,56,61,56,blue,2)+
    text(73,103,'e⁻',blue,15)+arrow(61,84,87,84,blue,2)+arrow(140,72,200,72,teal,2)+circle(238,72,22,'#e1f0e6',teal)+text(238,77,'Na',teal,17)+
    text(160,155,'Na⁺ + e⁻ → Na',ink,18),
    'Follow a sodium ion to the negative electrode. It gains an electron, so the ion is reduced.',175);
}

function latentCalculation() {
  return fig('Energy to melt an ice sample',
    'An illustrative sample of 0.10 kilograms of ice melts at constant temperature. With a specific latent heat of fusion of 334,000 joules per kilogram, the energy transferred is 0.10 times 334,000, or 33,400 joules.',
    '<path d="M28 57 l30 -18 30 18 -30 18 z M28 57 v39 l30 18 v-39 M88 57 v39 l-30 18" fill="#dceef5" stroke="'+blue+'" stroke-width="2"/>'+text(58,135,'0.10 kg',ink,15)+
    arrow(103,78,145,78,rust,2)+text(225,48,'334,000 J/kg',ink,15)+text(225,76,'× 0.10 kg',blue,16)+text(225,106,'= 33,400 J',teal,16),
    'Multiply the mass by the energy required per kilogram. The sample values are an example, not a measurement.');
}
function concentrationExample() {
  return fig('Mass of solute per volume',
    'A sample contains 3 grams of solute in 0.20 cubic decimetres of solution. Three divided by 0.20 equals 15 grams per cubic decimetre.',
    '<path d="M35 30 V135 H137 V30" fill="none" stroke="'+ink+'" stroke-width="2"/><path d="M37 62 H135 V133 H37 Z" fill="#dceef5"/>'+
    circle(59,86,4,rust,rust)+circle(85,105,4,rust,rust)+circle(111,81,4,rust,rust)+text(86,157,'0.20 dm³',ink,15)+
    text(229,46,'3 g solute',ink,15)+text(229,77,'÷ 0.20 dm³',blue,15)+text(229,112,'= 15 g/dm³',teal,16)+text(160,189,'0.20 dm³ = 200 cm³',ink,15),
    'Divide the solute mass by the total solution volume in dm³. One dm³ is 1,000 cm³. The dots represent solute, not actual concentration.',205);
}
function methaneStructure() {
  return fig('A simple hydrocarbon',
    'Methane has one carbon atom bonded to four hydrogen atoms. Its formula is CH4. It is a hydrocarbon because it contains only carbon and hydrogen.',
    circle(160,85,19,'#c9dfec',blue)+text(160,91,'C',blue,17)+
    circle(160,28,13,'#e8edee',ink)+text(160,33,'H',ink,15)+circle(160,142,13,'#e8edee',ink)+text(160,147,'H',ink,15)+
    circle(99,85,13,'#e8edee',ink)+text(99,90,'H',ink,15)+circle(221,85,13,'#e8edee',ink)+text(221,90,'H',ink,15)+
    line(160,41,160,66)+line(160,104,160,129)+line(112,85,141,85)+line(179,85,208,85)+text(280,92,'CH₄',ink,17),
    'Count the carbon and hydrogen atoms. The drawing shows connections, not the three-dimensional shape.');
}
function emissionsSources() {
  return fig('Sources of greenhouse gases',
    'Burning fossil fuels releases carbon dioxide. Methane can be released by livestock, among other sources. Both gases can absorb infrared radiation.',
    '<path d="M20 126 V73 H51 V56 H69 V126 Z M49 56 V29 H66 V56" fill="#dde4e7" stroke="'+ink+'" stroke-width="2"/>'+
    '<path d="M57 26 Q47 16 59 10 Q72 8 73 22" fill="none" stroke="'+ink+'" stroke-width="2"/>'+arrow(80,59,130,59,rust,2)+text(103,43,'CO₂',rust,16)+text(65,152,'Fuel burning',ink,14)+
    '<path d="M195 85 H264 V113 H195 Z M264 88 L281 80 V102 H264 M205 113 V132 M254 113 V132" fill="#e9e0d2" stroke="'+ink+'" stroke-width="2"/>'+arrow(263,66,300,46,blue,2)+text(268,34,'CH₄',blue,16)+text(232,152,'Livestock',ink,14),
    'Trace each gas to an example source. These are not the only sources of carbon dioxide or methane.');
}
function pollutants() {
  return fig('Pollutants from combustion',
    'Incomplete combustion can produce carbon monoxide. Burning sulfur-containing fuels can produce sulfur dioxide; nitrogen oxides can form when nitrogen and oxygen react at high temperatures. Sulfur dioxide and nitrogen oxides contribute to acid rain.',
    '<path d="M22 142 V74 H57 V50 H77 V142 Z M55 50 V27 H72 V50" fill="#dde4e7" stroke="'+ink+'" stroke-width="2"/>'+arrow(88,70,123,45,rust,2)+arrow(88,83,123,83,teal,2)+arrow(88,96,123,125,blue,2)+
    text(140,48,'CO',rust,16)+text(140,88,'SO₂',teal,16)+text(140,130,'NOₓ',blue,16)+
    arrow(161,84,209,93,teal,2)+arrow(163,125,209,110,blue,2)+
    '<path d="M224 129 q-12 -12 0-21 q-4-14 12-14 q11 0 12 10 q17-4 17 10 q9 14-6 15 z" fill="#e3eef4" stroke="'+blue+'" stroke-width="2"/>'+line(235,133,230,145,blue,2)+line(252,133,247,145,blue,2)+text(246,169,'Acid rain',blue,14),
    'Different pollutants have different effects. Sulfur dioxide (SO₂) and nitrogen oxides (NOₓ) can contribute to acid rain.');
}
function lifeCycle() {
  return fig('A product life cycle',
    'A life-cycle assessment compares impacts across obtaining materials, manufacturing, use and disposal or recycling. Reuse, transport and other assumptions can affect the result.',
    '<path d="M18 83 l22-37 22 37 Z" fill="#dbe6df" stroke="'+teal+'" stroke-width="2"/>'+text(48,135,'Extract',ink,13)+arrow(66,74,91,74,rust,2)+
    '<path d="M95 83 V51 l16 8 V48 l17 10 V83 Z" fill="#dce6ec" stroke="'+blue+'" stroke-width="2"/>'+text(111,109,'Make',ink,13)+arrow(134,74,160,74,rust,2)+
    '<path d="M177 43 H193 V54 H200 V89 H170 V54 H177 Z" fill="#def0ec" stroke="'+teal+'" stroke-width="2"/>'+text(185,109,'Use',ink,13)+arrow(207,74,231,74,rust,2)+
    '<path d="M253 45 C277 45 282 76 269 87 M269 87 l-2 -11 M269 87 l10 -4 M255 89 C231 89 226 58 239 47 M239 47 l2 10 M239 47 l-10 4" fill="none" stroke="'+teal+'" stroke-width="3"/>'+text(256,109,'End of life',ink,13)+
    '',
    'Follow the product from materials to its end of life. Compare the same stages and assumptions for both products.');
}
function reverseCoil() {
  const coil=(y,left,right)=>'<rect x="63" y="'+(y-12)+'" width="190" height="24" rx="5" fill="#e2e9e9" stroke="'+ink+'"/>'+[88,115,142,169,196,223].map(x=>'<ellipse cx="'+x+'" cy="'+y+'" rx="9" ry="19" fill="none" stroke="'+rust+'" stroke-width="2"/>').join('')+text(56,y+5,left,blue,17)+text(264,y+5,right,blue,17);
  return fig('Reversing an electromagnet',
    'With a fixed winding, reversing the current reverses the direction of the magnetic field: the north and south poles of the coil swap.',
    text(160,24,'Current in one direction',ink,15)+coil(57,'N','S')+arrow(99,94,220,94,blue,2)+
    text(160,125,'Current reversed',ink,15)+coil(162,'S','N')+arrow(220,198,99,198,blue,2),
    'Compare the pole labels and external field arrows. In this schematic the winding remains fixed while the current reverses.',215);
}
function ironCore() {
  const coil=y=>'<rect x="65" y="'+(y-12)+'" width="180" height="25" fill="#bccacd" stroke="'+ink+'"/>'+[91,116,141,166,191,216].map(x=>'<ellipse cx="'+x+'" cy="'+y+'" rx="8" ry="20" fill="none" stroke="'+rust+'" stroke-width="2"/>').join('');
  const objects=y=>[110,142,174,206].map(x=>line(x,y,x,y+28,blue,5)).join('');
  return fig('Soft iron in an electromagnet',
    'A coil around soft iron produces a stronger electromagnet when current flows. When the current is switched off, the coil field disappears and soft iron loses most of its induced magnetisation, allowing a load to be released.',
    text(155,25,'Current on',ink,15)+coil(58)+objects(71)+text(155,127,'Iron objects held',blue,14)+
    text(155,167,'Current off',ink,15)+coil(198)+objects(246)+text(155,299,'Objects can be released',blue,14),
    'Compare the same soft iron core with current on and off. Soft iron loses most induced magnetisation after switching off.',320);
}
function currentStrength() {
  const coil=y=>'<rect x="85" y="'+(y-11)+'" width="150" height="22" fill="#dce7e7" stroke="'+ink+'"/>'+[104,130,156,182,208].map(x=>'<ellipse cx="'+x+'" cy="'+y+'" rx="8" ry="18" fill="none" stroke="'+rust+'" stroke-width="2"/>').join('');
  return fig('Current and magnetic field strength',
    'Two otherwise identical coils have different currents. The coil with the larger current can produce a stronger magnetic field. The extra field line is a qualitative model, not a measurement.',
    text(160,22,'Smaller current',ink,15)+coil(85)+'<path d="M90 85 Q160 20 230 85" fill="none" stroke="'+blue+'" stroke-width="2"/>'+text(160,128,'Weaker field',blue,14)+
    text(160,155,'Larger current',ink,15)+coil(220)+'<path d="M90 220 Q160 155 230 220 M80 220 Q160 140 240 220" fill="none" stroke="'+blue+'" stroke-width="2"/>'+text(160,270,'Stronger field',blue,14),
    'Compare the external field-line sections for coils with the same core and winding. Complete field loops are omitted; increasing current can strengthen the field.',290);
}
function currentMagnitudeAndDirection(){return grouped(currentStrength,reverseCoil);}

function sulfateSalt() {
  return fig('Naming copper sulfate',
    'Sulfuric acid reacts with copper oxide to form copper sulfate and water. Sulfuric acid supplies the sulfate part of the salt, and copper oxide supplies copper.',
    text(16,38,'Sulfuric acid',blue,15,'start')+text(16,70,'H₂SO₄',blue,17,'start')+text(151,70,'+',ink,18)+text(175,38,'Copper oxide',rust,15,'start')+text(175,70,'CuO',rust,17,'start')+
    arrow(160,84,160,112,teal,2)+text(17,145,'Copper sulfate',teal,15,'start')+text(17,177,'CuSO₄',teal,17,'start')+text(175,145,'and water',ink,15,'start')+text(175,177,'H₂O',ink,17,'start'),
    'Match copper from copper oxide and sulfate from sulfuric acid to the name of the soluble salt.',200);
}
function xray() {
  return fig('X-rays and body tissue',
    'X-rays passing through the body are absorbed by different amounts in different tissues. Bone absorbs more X-rays than soft tissue, so fewer X-rays reach the detector behind bone. X-rays are ionising radiation.',
    text(66,22,'X-ray source',ink,14)+arrow(38,49,137,49,blue,2)+arrow(38,68,137,68,blue,2)+arrow(38,82,137,82,blue,2)+arrow(38,101,137,101,blue,2)+
    '<rect x="140" y="33" width="55" height="90" rx="14" fill="#ecd8cf" stroke="'+rust+'" stroke-width="2"/><rect x="157" y="43" width="18" height="70" rx="8" fill="#f7f4e8" stroke="'+ink+'" stroke-width="2"/>'+
    arrow(196,49,250,49,blue,2)+arrow(196,68,250,68,blue,2)+arrow(196,101,250,101,blue,2)+'<rect x="257" y="33" width="15" height="90" fill="#9aaeb6"/>'+text(168,145,'Bone within tissue',ink,14)+text(264,175,'Detector',ink,13),
    'Compare the X-rays reaching the detector where bone and soft tissue lie. This is an illustrative model, not a radiograph.',195);
}
function transmission() {
  return fig('Different infection routes',
    'Measles can spread in droplets from an infected person. Malaria is caused by a protist transmitted by a mosquito. Salmonella bacteria can spread in contaminated food.',
    circle(27,35,9,'#efd1bd',rust)+circle(67,35,9,'#efd1bd',rust)+circle(42,35,2,blue,blue)+circle(51,35,2,blue,blue)+text(90,40,'Measles: droplets',ink,15,'start')+
    '<ellipse cx="35" cy="86" rx="13" ry="6" fill="#ccd9db" stroke="'+ink+'"/><path d="M25 86 l-10 -12 M45 86 l10 -12 M25 90 l-10 12 M45 90 l10 12" stroke="'+ink+'" stroke-width="1.5"/>'+text(90,92,'Malaria: mosquito',ink,15,'start')+
    '<path d="M20 146 H55 L49 161 H26 Z" fill="#edc89f" stroke="'+rust+'" stroke-width="2"/><path d="M23 146 Q37 132 52 146" fill="#dce9cf" stroke="'+teal+'" stroke-width="2"/>'+text(90,153,'Salmonella: food',ink,15,'start'),
    'Match each pathogen to a route so that prevention can interrupt transmission.',180);
}
function transmissionPrevention() {
  return fig('Interrupting infection routes',
    'A mosquito net can reduce bites that transmit malaria. Thorough cooking can reduce the risk of Salmonella in food. Vaccination reduces the risk of measles. These methods act on different transmission routes.',
    '<path d="M24 70 V54 Q24 28 53 28 Q82 28 82 54 V70 M24 70 H82" fill="none" stroke="'+blue+'" stroke-width="2"/><circle cx="52" cy="54" r="9" fill="#efd1bd" stroke="'+rust+'"/>'+line(43,65,65,65,rust,2)+
    '<ellipse cx="12" cy="39" rx="7" ry="3" fill="#cbd8dc" stroke="'+ink+'"/>'+line(8,37,3,31,ink,1)+line(16,37,21,31,ink,1)+
    text(98,40,'Mosquito net',ink,15,'start')+text(98,72,'reduces bites',teal,15,'start')+
    '<path d="M25 146 H82 L74 163 H33 Z" fill="#edc89f" stroke="'+rust+'" stroke-width="2"/><path d="M31 146 Q53 128 76 146" fill="#dce9cf" stroke="'+teal+'" stroke-width="2"/>'+arrow(53,125,53,106,rust,2)+
    text(98,128,'Cook food',ink,15,'start')+text(98,160,'thoroughly',teal,15,'start')+
    '<path d="M26 225 l32-32 13 13 -32 32 z M22 229 l8 8 M58 193 l6 -6 M64 187 l8 8" fill="#dceaf4" stroke="'+blue+'" stroke-width="2"/><path d="M72 205 l12-12" stroke="'+ink+'" stroke-width="2"/>'+
    text(98,216,'Vaccination',ink,15,'start')+text(98,248,'reduces measles risk',teal,15,'start'),
    'Match each prevention to its route: bites, contaminated food or a vaccine-preventable infection.',270);
}
function transmissionAndPrevention(){return grouped(transmission,transmissionPrevention);}
function alphaDecay() {
  return fig('An example of alpha decay',
    'A uranium-238 nucleus with atomic number 92 emits an alpha particle containing two protons and two neutrons. The remaining thorium nucleus has mass number 234 and atomic number 90.',
    circle(65,75,34,'#dfe7f4',blue)+text(65,60,'U',blue,21)+text(65,90,'238 / 92',ink,13)+arrow(104,75,144,75,rust,2)+
    circle(190,75,30,'#e0efe5',teal)+text(190,60,'Th',teal,18)+text(190,90,'234 / 90',ink,13)+text(244,80,'+',ink,18)+
    circle(285,75,18,'#f3d8c9',rust)+text(285,80,'α',rust,16)+
    text(160,145,'Mass: 238 = 234 + 4',ink,15)+text(160,175,'Protons: 92 = 90 + 2',ink,15),
    'Compare the mass numbers and proton numbers before and after emission. The nuclei are simplified models.',195);
}
function electricalPower() {
  return fig('Power and energy',
    'A device supplied at 5 volts drawing 2 amperes transfers energy at 10 watts, because power equals potential difference times current. Over 3 seconds it transfers 30 joules, because energy equals power times time.',
    '<path d="M35 38 H138 V112 H35 Z" fill="#eef5f5" stroke="'+teal+'" stroke-width="2"/>'+circle(86,75,20,'white',ink)+text(86,81,'P',ink,18)+
    text(212,42,'5 V × 2 A',blue,16)+text(212,70,'= 10 W',teal,17)+arrow(212,78,212,100,rust,2)+text(212,125,'10 W × 3 s',blue,16)+text(212,151,'= 30 J',teal,17),
    'First calculate joules transferred each second, then multiply by time. These values are a worked example.',170);
}
function contraception() {
  return fig('Two ways to prevent pregnancy',
    'A condom is a barrier that can prevent sperm reaching an egg. Hormonal contraceptives can prevent ovulation. Condoms also reduce the risk of transmission of many sexually transmitted infections when used correctly.',
    text(74,27,'Barrier',ink,15)+circle(34,75,6,'#d5e8f3',blue)+line(40,75,56,75,blue,2)+arrow(56,75,95,75,blue,2)+line(105,48,105,104,rust,5)+circle(130,75,12,'#f6e3d2',rust)+
    text(46,137,'Sperm',blue,14)+text(130,137,'Egg',rust,14)+
    '<rect x="194" y="48" width="43" height="65" rx="7" fill="#dce9f2" stroke="'+blue+'" stroke-width="2"/>'+circle(215,69,7,'#fff4e3',rust)+text(257,27,'Hormonal',ink,15)+
    '<ellipse cx="275" cy="80" rx="20" ry="14" fill="#f3d6ce" stroke="'+rust+'" stroke-width="2"/>'+line(244,58,300,105,rust,3)+text(253,137,'No ovulation',rust,14),
    'Compare a barrier stopping sperm with hormonal prevention of ovulation. The sketches are simplified.');
}
function habitatDiversity() {
  const leaf=(x,y)=>'<path d="M'+x+' '+y+' q-13-14-20 0 q7 14 20 0 q13-14 20 0 q-7 14-20 0" fill="#c9e4d1" stroke="'+teal+'" stroke-width="2"/>';
  return fig('A variety of habitats',
    'Different habitats such as a pond and a meadow can support different organisms. Protecting several habitats can help maintain biodiversity, the variety of living organisms.',
    '<path d="M10 84 Q75 50 145 84 V129 H10 Z" fill="#d8ece3" stroke="'+teal+'" stroke-width="2"/>'+leaf(73,76)+text(77,156,'Meadow',ink,15)+
    '<ellipse cx="244" cy="94" rx="61" ry="36" fill="#cbe5ee" stroke="'+blue+'" stroke-width="2"/><path d="M227 94 q15-15 30 0 q-15 15-30 0 M257 94 l12-9 v18 z" fill="#f0d2a6" stroke="'+rust+'" stroke-width="2"/>'+text(244,156,'Pond',ink,15),
    'Compare habitats and the organisms they can support. More kinds of organisms mean greater biodiversity.');
}
function protectedPondMargin() {
  const reed=x=>'<path d="M'+x+' 108 V65 M'+x+' 87 l-9 -9 M'+x+' 78 l9 -9" fill="none" stroke="'+teal+'" stroke-width="3"/>';
  return fig('Protecting and restoring a habitat',
    'A fence limits trampling at a pond margin. Plants can re-establish around the water and provide shelter and food for organisms. Protecting or restoring suitable habitats can help populations survive.',
    text(160,25,'Protected pond margin',ink,15)+'<path d="M20 121 Q160 82 300 121 V151 H20 Z" fill="#e2f0df" stroke="'+teal+'" stroke-width="2"/>'+
    '<ellipse cx="160" cy="125" rx="79" ry="25" fill="#d5ebf4" stroke="'+blue+'" stroke-width="2"/>'+reed(71)+reed(114)+reed(206)+reed(249)+
    '<path d="M29 50 V111 M291 50 V111 M29 55 H291 M29 70 H291" fill="none" stroke="#8a6850" stroke-width="3"/>'+
    text(160,183,'Plants can re-establish',teal,15),
    'A fence can reduce trampling while pond-margin vegetation recovers. The plants can provide food or shelter for other organisms.',205);
}
function habitatAndProtection(){return grouped(habitatDiversity,protectedPondMargin);}

function pondweedLight() {
  return fig('Testing light and pondweed',
    'A lamp illuminates pondweed in water, and gas collects in an inverted measuring cylinder. Change the lamp distance and compare oxygen collected in equal times. Keep the plant, carbon dioxide supply and temperature the same.',
    '<path d="M33 90 H92 L80 54 H45 Z" fill="#ffe5ae" stroke="'+rust+'" stroke-width="2"/>'+line(62,90,62,134)+line(37,135,87,135)+
    arrow(100,82,153,95,rust,2)+text(63,30,'Lamp',ink,14)+
    '<path d="M160 82 H286 V153 H160 Z" fill="#dbeef4"/>'+
    '<path d="M158 47 V155 H288 V47 M208 98 V19 H257 V98" fill="none" stroke="'+ink+'" stroke-width="2"/>'+
    '<path d="M200 147 Q214 120 211 105 M212 123 Q190 114 192 105 M211 117 Q230 109 229 97" fill="none" stroke="'+teal+'" stroke-width="3"/>'+
    circle(222,87,3,'white',blue)+circle(230,74,3,'white',blue)+text(280,56,'Gas',blue,14)+text(225,177,'Pondweed',teal,14),
    'Change lamp distance and compare oxygen volume per minute. Keep carbon dioxide supply and temperature the same.');
}
function pondweedRateWorked() {
  return fig('Calculate oxygen production rate',
    'An illustrative measuring cylinder contains 8 cubic centimetres of collected oxygen after 4 minutes. The mean rate is 8 divided by 4, giving 2 cubic centimetres per minute.',
    '<path d="M48 130 V30 H130 V130" fill="#fffdf3" stroke="'+ink+'" stroke-width="2"/><path d="M50 94 H128 V130 H50 Z" fill="#dceef5"/>'+
    line(48,30,130,30,ink,1)+line(48,94,130,94,blue,2)+text(145,37,'0 cm³',ink,15,'start')+text(145,100,'8 cm³',blue,15,'start')+
    circle(245,68,25,'#edf4f2',teal)+line(245,68,245,52,teal,2)+line(245,68,256,75,teal,2)+text(245,132,'4 min',ink,15)+
    text(160,184,'8 ÷ 4 = 2 cm³/min',ink,16),
    'Read the collected gas volume and divide by the collection time. These values are the worked example, not measured results.',205);
}
function pondweedTemperature() {
  return fig('Keep temperature steady',
    'A thermometer measures water temperature around the pondweed while the lamp distance is changed. If the lamp also warms the water, temperature becomes another variable that may affect photosynthesis rate.',
    text(53,25,'Lamp',ink,15)+text(225,25,'Thermometer',ink,15)+
    '<path d="M24 78 H82 L70 45 H36 Z" fill="#ffe5ae" stroke="'+rust+'" stroke-width="2"/>'+line(53,78,53,139)+line(31,140,75,140)+arrow(86,80,121,92,rust,2)+
    '<path d="M122 63 V153 H288 V63" fill="#dceef5" stroke="'+ink+'" stroke-width="2"/><path d="M177 144 Q179 118 177 92 M177 120 Q156 109 157 99 M178 113 Q196 104 197 93" fill="none" stroke="'+teal+'" stroke-width="3"/>'+
    line(244,37,244,134,rust,4)+circle(244,135,6,rust,rust)+text(201,185,'Water around plant',blue,15),
    'Monitor and keep the water temperature steady. A warmer lamp can otherwise change temperature as well as light intensity.',205);
}
function concentrationVolumes() {
  return fig('Convert solution volumes',
    'Two equal one-cubic-decimetre containers show 250 cubic centimetres, or 0.250 cubic decimetres, and 500 cubic centimetres, or 0.500 cubic decimetres. The first is one quarter of a cubic decimetre and the second is one half.',
    text(70,25,'Sample A',ink,15)+text(240,25,'Sample B',ink,15)+
    '<path d="M25 43 V143 H115 V43 M195 43 V143 H285 V43" fill="none" stroke="'+ink+'" stroke-width="2"/>'+
    '<rect x="27" y="118" width="86" height="23" fill="#d7ebf5"/><rect x="197" y="93" width="86" height="48" fill="#d7ebf5"/>'+
    text(70,174,'250 cm³',blue,15)+text(240,174,'500 cm³',blue,15)+text(70,206,'0.250 dm³',teal,15)+text(240,206,'0.500 dm³',teal,15),
    'Each container represents 1 dm³. Compare a quarter and a half of the same capacity; divide cm³ by 1,000 to obtain dm³.',225);
}
function concentrationBars() {
  return fig('Compare equal solution volumes',
    'The worked example gives sample A a concentration of 24 grams per cubic decimetre and sample B a concentration of 20 grams per cubic decimetre. Two bars on the same scale show that A contains more solute in each cubic decimetre of solution.',
    text(160,25,'Mass per 1 dm³',ink,15)+'<rect x="55" y="50" width="70" height="120" fill="#d9eaf4" stroke="'+blue+'" stroke-width="2"/><rect x="195" y="70" width="70" height="100" fill="#d9eee4" stroke="'+teal+'" stroke-width="2"/>'+
    text(90,117,'24 g',blue,16)+text(230,127,'20 g',teal,16)+text(90,201,'Sample A',ink,15)+text(230,201,'Sample B',ink,15),
    'Compare equal volumes. A is 6 ÷ 0.250 = 24 g/dm³; B is 10 ÷ 0.500 = 20 g/dm³. Bar heights use the same scale.',220);
}
export function gridCurrentComparison() {
  return fig('Current at the same transmitted power',
    'The worked example transmits 24 kilowatts, or 24,000 watts. At 2,000 volts the current is 12 amperes; at 12,000 volts it is 2 amperes. The bars share a scale and compare current for equal power.',
    text(160,22,'Same power: 24 kW',ink,15)+text(90,50,'12 A',blue,16)+'<rect x="58" y="60" width="64" height="120" fill="#d9eaf4" stroke="'+blue+'" stroke-width="2"/>'+
    text(230,150,'2 A',teal,16)+'<rect x="198" y="160" width="64" height="20" fill="#d9eee4" stroke="'+teal+'" stroke-width="2"/>'+
    text(90,211,'2,000 V',ink,15)+text(230,211,'12,000 V',ink,15),
    'Use I = P ÷ V. For the same power, the higher potential difference gives a smaller current.',230);
}
export function gridHeatingComparison() {
  return fig('Heating in cables of equal resistance',
    'For two cables with equal resistance, heating power is proportional to current squared. The 12 ampere current gives 36 times the heating power of 2 amperes, because 12 squared divided by 2 squared is 36. The displayed units are relative, not measured watts.',
    text(160,25,'Same cable resistance',ink,15)+text(52,78,'12 A',blue,15)+'<rect x="102" y="55" width="180" height="32" fill="#f1d8c7" stroke="'+rust+'" stroke-width="2"/>'+text(192,78,'36 units',ink,15)+
    text(52,145,'2 A',teal,15)+'<rect x="102" y="122" width="5" height="32" fill="#d9eee4" stroke="'+teal+'" stroke-width="2"/>'+text(166,145,'1 unit',ink,15),
    'Compare equal-resistance cables: 12² : 2² = 36 : 1. The bars show relative heating power, not measured values.',175);
}
export function ohmicCurrentGraph() {
  return fig('Current through an ohmic resistor',
    'At constant temperature, a graph of current against potential difference for an ohmic resistor is a straight line through the origin. As potential difference doubles, current doubles.',
    line(50,150,285,150)+line(50,150,50,33)+text(50,24,'Current (A)',ink,15,'start')+text(165,184,'Potential difference (V)',ink,15)+
    line(50,150,265,48,blue,3),
    'Follow the straight line from the origin. This qualitative model assumes the resistor stays at constant temperature.',205);
}
export function filamentCurrentGraph() {
  return fig('Current through a filament lamp',
    'As potential difference rises, current increases but the current–potential difference graph becomes less steep because the filament heats up and its resistance rises. The graph is qualitative.',
    line(50,150,285,150)+line(50,150,50,33)+text(50,24,'Current (A)',ink,15,'start')+text(165,184,'Potential difference (V)',ink,15)+
    '<path d="M50 150 C82 96 145 65 265 57" fill="none" stroke="'+rust+'" stroke-width="3"/>',
    'Follow the curve as potential difference rises. It becomes less steep as the filament heats and its resistance increases.',205);
}
function circulation() {
  return fig('Oxygen from lungs to working muscle',
    'The right ventricle pumps blood to lung capillaries, where oxygen diffuses into blood and binds to haemoglobin. Blood returns to the left atrium, then left ventricle, and is pumped to muscle capillaries. Oxygen diffuses from blood into muscle cells.',
    '<path d="M126 18 Q111 23 109 54 Q117 68 140 59 L140 30 Z M180 18 Q195 23 197 54 Q189 68 166 59 L166 30 Z" fill="#e2f2f3" stroke="'+teal+'" stroke-width="2"/>'+text(153,83,'Lungs',teal,14)+
    '<rect x="65" y="95" width="174" height="70" rx="8" fill="#f5dfda" stroke="'+rust+'" stroke-width="2"/>'+line(153,95,153,165,rust,1)+text(109,117,'Right',ink,14)+text(109,149,'ventricle',ink,13)+text(196,117,'Left',ink,14)+text(196,149,'heart',ink,14)+
    arrow(100,95,99,43,blue,2)+arrow(208,45,208,93,rust,2)+arrow(186,167,186,193,rust,2)+
    '<rect x="105" y="198" width="104" height="33" rx="12" fill="#e7ede1" stroke="'+teal+'" stroke-width="2"/>'+text(157,220,'Muscle cells',ink,14)+text(70,184,'Blood',blue,13)+text(248,181,'Oxygen',rust,13),
    'Follow blood from the right ventricle to the lungs and back to the left side of the heart, then to muscle. This is a simplified pathway.',245);
}
function bloodMicrograph() {
  const figure = node('figure', '', 'catchup-picture');
  const image = node('img', '', 'catchup-photo');
  image.src = '/assets/micrographs/human-erythrocytes.jpg';
  image.width = 386; image.height = 404; image.loading = 'lazy';
  image.alt = 'Fluorescent micrograph of human red blood cells stained at their membranes; a white 20 micrometre scale bar is at the lower right.';
  const caption = node('figcaption');
  const credit = node('small');
  const source = node('a', 'MDougM · source');
  source.href = 'https://commons.wikimedia.org/wiki/File:Sedimented_red_blood_cells.jpg';
  const licence = node('a', 'Public domain');
  licence.href = 'https://commons.wikimedia.org/wiki/Template:PD-self';
  credit.append(source, ' · ', licence, ' · original image, no annotation');
  caption.append(node('strong', 'Human red blood cells'),
    node('span', 'Locate several cells. Their membranes are stained; the white scale bar is 20 µm. Haemoglobin is not visible in this image.'), credit);
  figure.append(image, caption);
  return figure;
}
function haemoglobinBinding() {
  return fig('Oxygen and haemoglobin',
    'Oxygen moves into a red blood cell and binds to haemoglobin inside it. The large oval represents the cell; the smaller red circles represent haemoglobin. The model is greatly simplified and is not to scale.',
    text(160,25,'Red blood cell',ink,15)+'<ellipse cx="160" cy="99" rx="93" ry="58" fill="#f5d9d4" stroke="'+rust+'" stroke-width="2"/><ellipse cx="160" cy="99" rx="47" ry="27" fill="#faeae6" stroke="none"/>'+
    circle(130,102,9,'#bc675c',rust)+circle(164,88,9,'#bc675c',rust)+circle(195,108,9,'#bc675c',rust)+
    text(36,57,'O₂',blue,15)+arrow(40,64,123,98,blue,2)+line(198,191,195,118,ink,1.5)+text(160,210,'Haemoglobin',ink,15),
    'Follow oxygen into the cell and locate the haemoglobin symbols. This is a model: haemoglobin cannot be seen in the adjacent micrograph.',230);
}
function oxygenInBlood(){return grouped(bloodMicrograph,haemoglobinBinding);}
function leftHeartChambers() {
  return fig('Blood returns to the left heart',
    'Oxygenated blood returns from the lungs to the left atrium and then passes to the left ventricle. The left ventricle has a thicker muscular wall and pumps blood around the body. The layout is a simplified pathway, not an anatomical view.',
    text(160,25,'From lungs',blue,15)+
    '<rect x="90" y="55" width="150" height="48" rx="8" fill="#f5dfda"/><path d="M145 103 H98 Q90 103 90 95 V63 Q90 55 98 55 H145 M175 55 H232 Q240 55 240 63 V95 Q240 103 232 103 H175" fill="none" stroke="'+rust+'" stroke-width="2"/>'+arrow(160,32,160,64,blue,2)+text(165,86,'Left atrium',ink,15)+
    line(145,103,145,121,rust,2)+line(175,103,175,121,rust,2)+
    '<rect x="90" y="121" width="150" height="80" rx="10" fill="#f5dfda"/><path d="M145 121 H100 Q90 121 90 131 V191 Q90 201 100 201 H230 Q240 201 240 191 V131 Q240 121 230 121 H175" fill="none" stroke="'+rust+'" stroke-width="7"/>'+text(165,151,'Left',ink,15)+text(165,183,'ventricle',ink,15)+
    arrow(160,99,160,132,rust,2)+arrow(241,161,282,161,rust,2)+text(263,213,'To body',rust,15),
    'Follow blood from atrium to ventricle and on to the body. The thick outline represents the ventricle’s muscular wall.',235);
}
function oxygenToMuscle() {
  return fig('Oxygen reaches muscle cells',
    'Oxygen diffuses from blood in a muscle capillary into nearby muscle cells. During exercise, a higher heart rate can increase blood flow and oxygen delivery. The vessel and cell are not drawn to scale.',
    text(85,25,'Capillary',ink,15)+text(235,25,'Muscle cell',ink,15)+'<rect x="25" y="55" width="120" height="80" rx="20" fill="#f5dfda" stroke="'+rust+'" stroke-width="2"/>'+
    circle(55,82,10,'#d88f83',rust)+circle(100,108,10,'#d88f83',rust)+'<ellipse cx="234" cy="95" rx="55" ry="40" fill="#e3eddd" stroke="'+teal+'" stroke-width="2"/>'+
    arrow(145,95,193,95,blue,2)+text(160,72,'O₂',blue,15)+text(160,176,'Oxygen diffuses into muscle',blue,15),
    'Follow oxygen from the capillary into the muscle cell. Greater blood flow during exercise can increase delivery.',195);
}
function exerciseDelivery() {
  const beat=(x,y)=>'<path d="M'+x+' '+(y+9)+' c-22 -14 -13 -29 0 -18 c13 -11 22 4 0 18 Z" fill="#efc8c2" stroke="'+rust+'" stroke-width="2"/>';
  return fig('Heart rate and delivery during exercise',
    'The model compares two equal time intervals. There are more heartbeats during the exercise interval than the rest interval. If each beat pumps the same volume, more beats per minute can increase blood and oxygen delivery. The icons are illustrative, not measurements.',
    text(160,25,'Same time interval',ink,15)+text(62,74,'Rest',ink,15)+beat(145,67)+beat(225,67)+
    text(62,140,'Exercise',ink,15)+beat(125,132)+beat(170,132)+beat(215,132)+beat(260,132)+text(160,205,'More beats per minute',rust,15),
    'Compare the number of beat symbols in equal times. If volume per beat is unchanged, a higher heart rate can increase delivery; these counts are illustrative.',225);
}
function muscleDelivery(){return grouped(oxygenToMuscle,exerciseDelivery);}
function circulationWithMicrograph(){return grouped(circulation,bloodMicrograph);}
function faultPath() {
  return fig('A fault to an earthed metal case',
    'If a live wire touches an earthed metal case, current can flow through the low-resistance earth wire back towards the supply. The large fault current causes a correctly rated fuse or circuit breaker to disconnect the circuit.',
    text(47,25,'Live',rust,16)+line(18,48,103,48,rust,4)+'<rect x="103" y="34" width="48" height="29" rx="4" fill="#f5e6dc" stroke="'+rust+'" stroke-width="2"/>'+text(127,54,'Fuse',rust,14)+
    line(151,48,181,48,rust,4)+'<path d="M181 34 H283 V125 H181 Z" fill="#e6eeee" stroke="'+ink+'" stroke-width="3"/>'+text(232,68,'Metal case',ink,14)+circle(184,49,5,rust,rust)+text(237,100,'Fault contact',rust,13)+
    '<path d="M230 125 V151 H65" fill="none" stroke="'+teal+'" stroke-width="4"/>'+arrow(189,151,92,151,teal,2)+text(108,176,'Earth wire to supply',teal,14),
    'Follow the fault path through the earth connection. The diagram shows the fault path only; the fuse or breaker then disconnects the supply.',190);
}
function directPotential() {
  return fig('Direct potential difference',
    'An ideal direct supply is represented by a horizontal line above zero on a potential-difference–time graph. Its polarity remains the same. This is a qualitative model.',
    text(48,24,'Potential difference (V)',ink,15,'start')+line(48,145,285,145)+line(48,145,48,36)+line(48,64,270,64,blue,3)+text(36,150,'0',ink,14,'end')+text(160,181,'Time',ink,15),
    'A direct supply keeps the same polarity. This horizontal line models an ideal steady supply.',200);
}
function alternatingPotential() {
  const points=Array.from({length:81},(_,i)=>{const x=50+i*2.875;return x+','+(125-44*Math.sin(i*Math.PI/20));}).join(' ');
  return fig('Alternating potential difference',
    'A qualitative alternating-potential-difference graph crosses zero and reverses polarity repeatedly. Two complete cycles take 40 milliseconds, so one cycle takes 20 milliseconds and the frequency is 50 hertz.',
    text(50,24,'Potential difference (V)',ink,15,'start')+line(50,125,285,125)+line(50,174,50,37)+
    '<polyline points="'+points+'" fill="none" stroke="'+rust+'" stroke-width="3"/>'+text(38,130,'0',ink,14,'end')+
    text(50,200,'0',ink,14)+text(165,200,'20',ink,14)+text(280,200,'40',ink,14)+text(160,232,'Time (ms)',ink,15),
    'Follow one complete cycle from 0 to 20 ms. That period corresponds to 50 cycles each second; the vertical scale is illustrative.',250);
}
function alternatingAndDirect(){return grouped(directPotential,alternatingPotential);}
function mainsWorkingLoop() {
  return fig('Live and neutral in the working circuit',
    'A simplified alternating supply, lamp and connecting wires form a complete loop. The live conductor is at an alternating potential difference relative to earth; the neutral conductor, normally near earth potential, completes the circuit. The diagram does not show the protective earth connection to an appliance case.',
    '<path d="M55 87 V40 H185 M215 40 H270 V160 H55 V123" fill="none" stroke="'+ink+'" stroke-width="2.5"/>'+circle(55,105,18,'white',ink)+text(55,111,'~',blue,18)+
    circle(200,40,15,'white',ink)+line(190,30,210,50)+line(190,50,210,30)+text(120,27,'Live',rust,15)+text(200,190,'Neutral',blue,15)+
    line(120,160,120,174,teal,2)+line(108,174,132,174,teal,2)+line(112,179,128,179,teal,2)+line(116,184,124,184,teal,2),
    'Trace the complete working loop. The earth symbol marks the supply reference; a protective earth connection to a metal case is shown separately.',205);
}
function magnesiumParticles() {
  const mg=(x,y)=>circle(x,y,8,'#d7e8f4',blue); const o=(x,y)=>circle(x,y,8,'#f3d5c8',rust);
  let art=text(80,22,'Reactants',ink,15)+text(244,22,'Products',ink,15);
  for(let i=0;i<6;i++)art+=mg(26+(i%3)*25,50+Math.floor(i/3)*26);
  for(let i=0;i<4;i++)art+=circle(24+i*29,115,6,'#f3d5c8',rust)+circle(36+i*29,115,6,'#f3d5c8',rust);
  for(let i=0;i<6;i++)art+=mg(190+(i%3)*31,50+Math.floor(i/3)*26)+o(205+(i%3)*31,50+Math.floor(i/3)*26);
  art+=o(229,115)+o(244,115)+arrow(119,82,163,82,ink,2)+text(75,154,'6 Mg + 4 O₂',ink,14)+text(234,154,'6 MgO + O₂ left',ink,14)+mg(65,181)+text(81,186,'Mg',blue,14,'start')+o(200,181)+text(216,186,'O',rust,14,'start');
  return fig('A limiting reactant in particles',
    'Six magnesium atoms react with three of four oxygen molecules to form six magnesium oxide units. One oxygen molecule remains. Magnesium is the limiting reactant in this model.',art,
    'Count atoms on each side. Six magnesium atoms use three oxygen molecules, leaving one oxygen molecule.',200);
}
function oxygenRequirement() {
  return fig('Compare oxygen needed and available',
    'In the worked example, 0.20 moles of magnesium need 0.10 moles of oxygen according to the two-to-one equation ratio. The 4.8 gram oxygen sample supplies 0.15 moles. The required amount is less than available, so magnesium is limiting.',
    text(160,24,'Oxygen amounts',ink,15)+text(55,70,'Needed',blue,15)+'<rect x="110" y="48" width="100" height="30" fill="#d7e8f4" stroke="'+blue+'" stroke-width="2"/>'+text(160,70,'0.10 mol',ink,15)+
    text(55,125,'Available',teal,15)+'<rect x="110" y="103" width="150" height="30" fill="#d9eee2" stroke="'+teal+'" stroke-width="2"/>'+text(185,125,'0.15 mol',ink,15)+
    text(160,174,'0.20 mol Mg needs',ink,15)+text(160,206,'0.10 mol O₂',ink,15),
    'Compare oxygen required with oxygen available on the same scale. The oxygen is in excess, so magnesium limits the yield.',225);
}
function magnesiumOxideMass() {
  return fig('Convert product amount to mass',
    'The equation ratio gives 0.20 moles of magnesium oxide from 0.20 moles of magnesium. Multiplying 0.20 moles by the molar mass of magnesium oxide, 40 grams per mole, gives a maximum mass of 8.0 grams. Paired circles represent a formula unit; the ionic lattice is not shown.',
    circle(62,70,14,'#d7e8f4',blue)+circle(92,70,14,'#f3d5c8',rust)+text(76,112,'MgO',ink,15)+arrow(112,70,188,70,teal,2)+
    '<path d="M206 89 H279 L270 126 H215 Z M211 89 Q242 68 274 89" fill="#edf4ed" stroke="'+teal+'" stroke-width="2"/>'+text(242,151,'8.0 g',teal,16)+
    text(160,190,'0.20 mol × 40 g/mol',ink,15)+text(160,222,'= 8.0 g',ink,16),
    'Use the one-to-one Mg-to-MgO amount ratio, then multiply by molar mass. The paired circles represent a formula unit; the ionic lattice is omitted.',240);
}
function magnesiumYield(){return grouped(molarRatio,magnesiumOxideMass);}
function plantPaths() {
  return fig('Water and sugar transport',
    'Water enters roots and moves upwards in xylem to the leaf. Water vapour leaves the leaf. Sugars made in a mature source leaf are transported in phloem to a sink such as a growing root; phloem movement depends on source and sink.',
    '<path d="M137 53 Q87 15 49 48 Q76 84 137 68 M183 53 Q233 15 271 48 Q244 84 183 68" fill="#d8eddb" stroke="'+teal+'" stroke-width="2"/>'+
    '<rect x="137" y="47" width="46" height="131" fill="#e9efe0" stroke="'+teal+'" stroke-width="2"/><path d="M160 177 Q141 204 112 215 M160 177 Q179 204 208 215" fill="none" stroke="'+teal+'" stroke-width="3"/>'+
    arrow(149,166,149,65,blue,2)+arrow(171,72,171,167,rust,2)+arrow(69,40,49,17,blue,2)+arrow(239,40,259,17,blue,2)+
    text(84,100,'Xylem',blue,15)+text(84,132,'water up',blue,14)+text(239,98,'Phloem',rust,15)+text(239,130,'sugar to',rust,14)+text(239,162,'root sink',rust,14)+text(160,241,'Roots',ink,15),
    'Trace water up the xylem and sugar from the source leaf to a root sink. Phloem direction varies with source and sink.',255);
}
function rootHairOsmosis() {
  return fig('Water entering a root hair cell',
    'A root hair cell extends into the soil. When the soil solution is more dilute than the cell contents, water enters the cell by osmosis through its partially permeable membrane. The outer boundary is the cell wall and the inner boundary is the membrane.',
    text(75,25,'Soil solution',blue,15)+text(230,25,'Root hair cell',teal,15)+
    '<path d="M145 44 H277 V128 H145 V100 H64 Q38 100 38 86 Q38 72 64 72 H145 Z" fill="#e4f2df" stroke="'+teal+'" stroke-width="3"/>'+
    '<path d="M151 51 H270 V121 H151 V94 H64 Q45 94 45 86 Q45 78 64 78 H151 Z" fill="none" stroke="'+ink+'" stroke-width="1.5"/>'+arrow(15,86,115,86,blue,3)+
    text(160,159,'Water enters',blue,15)+text(160,191,'by osmosis',blue,15),
    'Follow water across the wall and the inner cell membrane. Net osmosis occurs when the soil solution is more dilute than the cell contents.',210);
}
function leafVapourPath() {
  return fig('Water vapour leaves a leaf',
    'Water evaporates from moist leaf cells into an internal air space, then water vapour diffuses out through the stoma, the pore between guard cells. The leaf section is simplified.',
    '<ellipse cx="160" cy="55" rx="56" ry="31" fill="#d9eedc" stroke="'+teal+'" stroke-width="2"/>'+text(160,61,'Leaf cell',ink,15)+text(65,135,'Air space',ink,15)+
    '<path d="M25 185 H142 M178 185 H295" fill="none" stroke="'+ink+'" stroke-width="3"/><path d="M142 173 Q128 185 142 197 Q150 185 142 173 Z M178 173 Q192 185 178 197 Q170 185 178 173 Z" fill="#b5dec9" stroke="'+teal+'" stroke-width="2"/>'+
    arrow(160,92,160,216,blue,3)+text(80,235,'Water vapour',blue,14)+text(247,235,'Stoma',ink,15)+line(222,222,168,185,ink,1.5),
    'Follow the vapour arrow from the leaf air space through the pore. The stoma is the opening between the two guard cells.',255);
}
function hollowXylem() {
  return fig('A hollow xylem vessel',
    'A simplified xylem vessel is a hollow tube with thickened walls. Water and dissolved mineral ions move up through the open lumen. No end wall blocks the section shown.',
    text(160,25,'Water + mineral ions',blue,15)+'<rect x="100" y="42" width="120" height="128" fill="#e2f1f7"/>'+line(100,42,100,170,rust,6)+line(220,42,220,170,rust,6)+
    arrow(160,154,160,55,blue,3)+text(160,205,'Hollow vessel',ink,15),
    'Follow water up the open channel. The thick side walls represent lignin strengthening; the vessel section is simplified.',225);
}
function xylemRouteWorked(){return grouped(plantPaths,hollowXylem);}
function sourceAndSink() {
  return fig('Phloem carries sugars from source to sink',
    'In one situation, a mature leaf is a source and a growing fruit is a sink for sugars. Later, a storage organ may become a source supplying a growing shoot. The arrows show the direction of sugar movement in each example.',
    '<path d="M21 58 Q55 20 91 58 Q55 96 21 58 Z" fill="#d9eedc" stroke="'+teal+'" stroke-width="2"/>'+line(28,58,84,58,teal,2)+arrow(104,58,199,58,rust,2)+circle(247,58,23,'#f3d4bd',rust,2)+
    text(72,121,'Source: leaf',teal,14)+text(247,121,'Sink: fruit',rust,14)+
    '<ellipse cx="55" cy="190" rx="33" ry="24" fill="#e9d7b9" stroke="'+rust+'" stroke-width="2"/>'+arrow(99,190,194,190,blue,2)+line(246,211,246,169,teal,3)+'<path d="M246 187 Q217 164 211 181 Q225 194 246 187 M246 178 Q268 156 279 172 Q268 184 246 178" fill="#cfe9d5" stroke="'+teal+'" stroke-width="2"/>'+
    text(72,250,'Source: store',rust,14)+text(246,250,'Sink: shoot',teal,14),
    'Follow each arrow from a source to a sink. A storage organ can change roles when its stored sugars supply new growth.',270);
}
function vapourBoundaryLayer(wind) {
  const outside=wind?[[82,70]]:[[52,70],[82,70],[205,70],[235,70]];
  const inside=[[53,139],[90,139],[127,139],[195,139],[232,139]];
  return fig(wind?'Moving air removes vapour':'Moist air near a leaf',
    wind?'Air movement carries water vapour away from an open stoma. With other conditions unchanged, this can maintain a steeper concentration gradient from the leaf to outside air. Dots are a qualitative model.':'In still air, water vapour can accumulate near an open stoma. Dots illustrate water vapour inside and outside the leaf; the numbers are not measured concentrations.',
    text(160,24,wind?'Moving air':'Still air',ink,15)+(wind?arrow(48,43,269,43,teal,2):'')+
    '<path d="M25 108 H145 M175 108 H295 M25 108 V160 H295 V108" fill="#eaf5e9" stroke="'+teal+'" stroke-width="2"/>'+
    outside.map(([x,y])=>circle(x,y,5,'#c8dff0',blue)).join('')+inside.map(([x,y])=>circle(x,y,5,'#c8dff0',blue)).join('')+
    arrow(160,140,160,75,blue,2)+text(160,190,'Leaf surface and open pore',ink,15),
    wind?'Dots represent water vapour. Moving air can keep the outside drier and maintain a steeper gradient.':'Dots represent water vapour. In still air it can accumulate near the pore; the dots are illustrative, not measurements.',210);
}
function windAndVapour(){return grouped(()=>vapourBoundaryLayer(false),()=>vapourBoundaryLayer(true));}
function waterTransportWorked(){return grouped(rootHairOsmosis,plantPaths,leafVapourPath);}
export const gcseWorkedVisuals = {
  'photosynthesis-limits': pondweedLight,
  'chromatography': chromatographyWorked,
  'respiration-exercise': circulationWithMicrograph,
  'domestic-electricity': faultPath,
  'reacting-masses': magnesiumParticles,
  'plant-transport': waterTransportWorked,
  'quadrat-evidence': quadratWorked
};
// These worked groups contain several distinct ideas. The renderer places
// each selected visual directly with its matching line in the teaching stage.
export const gcseWorkedLineVisuals = {
  'trolley-evidence': [trolleySensors, trolleyTransfer, trolleyAddMass],
  'electrode-evidence': [copperElectrolysisAndCollection, electrodeProducts, glowingSplint],
  'temperature-evidence': [temperatureWorkedRises, temperatureMeasurement, temperatureControls],
  'infrared-evidence': [() => investigationFigure('infrared-evidence', 'Keep the same detector distance and angle as you compare cube faces at similar temperatures.'), infraredReadings, infraredAbsorption],
  'spring-evidence': [springReading, springWorkedLengths, springDepartureAndRecovery],
  'wave-measurement': [rippleCrestIntervals, rippleFrequency, rippleAmplitude],
  'amylase-endpoint': [amylasePreparation, iodineEndpoint, amylaseRates, iodineInterval],
  'chromatography': [gcseChromatogramSetup, gcseChromatogramResult, rfWorked],
  'domestic-electricity': [alternatingAndDirect, mainsWorkingLoop, faultPath],
  'dynamic-equilibrium': [equilibriumStart, equilibriumRateGraph, dynamicEquilibrium],
  'photosynthesis-limits': [pondweedRateWorked, pondweedLight, pondweedTemperature],
  'reacting-masses': [magnesiumParticles, oxygenRequirement, magnesiumYield],
  'ruler-drop': [() => investigationFigure('ruler-drop', 'Align zero with the top of the open fingers. The sketch shows only the lower part of a centimetre ruler.'), rulerMeans, rulerControls],
  'respiration-exercise': [circulation, () => airSac(true), oxygenInBlood, leftHeartChambers, muscleDelivery],
  'plant-transport': [rootHairOsmosis, xylemRouteWorked, leafVapourPath, sourceAndSink, windAndVapour],
  'solution-concentration': [concentrationVolumes, concentrationBars, null],
  'quadrat-evidence': [() => grouped(randomCoordinates,quadratBoundary), quadratMeanWorked, parallelTransects]
};

function inverseSquare() {
  return fig('Doubling distance from a point source',
    'At 10 centimetres an illustrative light intensity is one unit. At 20 centimetres, twice the distance from the same point source, the intensity is one quarter of that at 10 centimetres.',
    circle(44,58,18,'#ffe1a2',rust)+text(44,63,'Lamp',rust,13)+arrow(64,58,104,58,rust,2)+text(84,30,'10 cm',ink,14)+
    '<rect x="110" y="33" width="80" height="50" fill="#ecd197" stroke="'+rust+'"/>'+text(257,63,'1',ink,16)+
    circle(44,137,18,'#ffe1a2',rust)+text(44,142,'Lamp',rust,13)+arrow(64,137,144,137,rust,2)+text(104,109,'20 cm',ink,14)+
    '<rect x="145" y="112" width="20" height="50" fill="#ecd197" stroke="'+rust+'"/>'+text(257,142,'¼',ink,16),
    'Compare intensities at twice the distance from the same point source. The bars use an illustrative starting intensity.',180);
}
function glucagonResponse() {
  return fig('Response to low blood glucose',
    'When blood glucose falls the pancreas releases glucagon. Glucagon causes liver glycogen to be converted to glucose and released into the blood. As the glucose concentration recovers, the stimulus for glucagon secretion decreases. An arrow returns to the pancreas to show this feedback.',
    text(160,22,'Blood glucose falls',blue,16)+arrow(160,29,160,52,ink,2)+
    '<path d="M96 65 Q160 37 224 65 Q214 91 116 84 Z" fill="#f2d1c4" stroke="'+rust+'" stroke-width="2"/>'+text(160,78,'Pancreas',ink,15)+arrow(160,89,160,112,ink,2)+
    text(160,130,'Glucagon → liver',rust,15)+text(160,157,'Glycogen → glucose',teal,15)+arrow(160,161,160,184,ink,2)+text(160,204,'Blood glucose rises',blue,16)+
    arrow(160,212,160,235,ink,2)+text(160,251,'Less stimulus for',teal,15)+text(160,283,'glucagon release',teal,15)+
    '<path d="M64 269 H35 V75 H88" fill="none" stroke="'+teal+'" stroke-width="2"/>'+arrow(75,75,88,75,teal,2),
    'Follow the hormonal signal to the liver, then the feedback to the pancreas: as glucose recovers, the stimulus for glucagon release decreases.',300);
}
function dilution() {
  const beaker=(x,top)=>'<path d="M'+x+' 40 V143 H'+(x+90)+' V40" fill="none" stroke="'+ink+'" stroke-width="2"/><path d="M'+(x+2)+' '+top+' H'+(x+88)+' V141 H'+(x+2)+' Z" fill="#dceef5"/>';
  return fig('Dilution conserves solute',
    'One hundred cubic centimetres of a 30 grams per cubic decimetre solution contains 3 grams of solute. Diluting to 250 cubic centimetres without loss leaves 3 grams of solute in 0.250 cubic decimetres, giving 12 grams per cubic decimetre.',
    beaker(15,104)+circle(37,121,4,rust,rust)+circle(60,128,4,rust,rust)+circle(83,120,4,rust,rust)+
    arrow(111,85,185,85,teal,2)+text(148,70,'Add water',teal,14)+
    beaker(210,53)+circle(232,91,4,rust,rust)+circle(255,112,4,rust,rust)+circle(279,72,4,rust,rust)+
    text(60,165,'100 cm³',ink,14)+text(255,165,'250 cm³',ink,14)+text(160,192,'3 g solute throughout',ink,15)+text(160,224,'3 ÷ 0.250 = 12 g/dm³',blue,15),
    'Compare the same solute amount in a larger total volume. The dots are a model, not the real number of particles.',245);
}
function momentum() {
  return fig('Momentum in a closed system',
    'A 1 kilogram trolley moving right at 2 metres per second meets a stationary 1 kilogram trolley. If they stick, the 2 kilogram pair moves right at 1 metre per second. Total momentum is 2 kilogram metres per second before and after.',
    text(160,21,'Before',ink,15)+
    '<rect x="30" y="41" width="64" height="30" fill="#dcebf4" stroke="'+blue+'"/><rect x="184" y="41" width="64" height="30" fill="#f2dfd2" stroke="'+rust+'"/>'+text(62,61,'1 kg',ink,14)+text(216,61,'1 kg',ink,14)+arrow(97,55,170,55,blue,2)+text(133,47,'2 m/s',blue,13)+
    text(160,103,'After sticking',ink,15)+'<rect x="77" y="117" width="128" height="30" fill="#dfebe5" stroke="'+teal+'"/>'+text(140,137,'2 kg',ink,14)+arrow(209,132,246,132,teal,2)+text(257,154,'1 m/s',teal,13)+
    text(160,190,'2 kg m/s before and after',ink,14),
    'Compare total momentum before and after the collision. The example assumes a closed system.',210);
}
function equilibriumHeating() {
  return fig('Temperature and equilibrium',
    'In this example the forward reaction is exothermic, transferring energy to the surroundings; the reverse reaction is endothermic. Increasing temperature favours the endothermic reverse reaction, decreasing the equilibrium yield of product.',
    circle(45,70,10,'#c8e0f0',blue)+circle(71,70,10,'#c8e0f0',blue)+text(58,150,'Reactants',blue,14)+
    arrow(98,56,207,56,rust,2)+text(154,41,'Forward: exothermic',rust,13)+
    arrow(207,87,98,87,teal,4)+text(154,118,'Reverse: endothermic',teal,13)+
    circle(240,70,10,'#efcfbf',rust)+circle(260,70,10,'#efcfbf',rust)+text(250,150,'Product',rust,14)+
    text(160,180,'Heating favours reverse',ink,14),
    'The thicker arrow shows the favoured direction as the system responds. At the new equilibrium, both reaction rates are equal again.',195);
}
function velocityArea() {
  return fig('Distance from a velocity–time graph',
    'A trolley accelerates uniformly from 0 to 4 metres per second in 2 seconds, then continues at 4 metres per second until 5 seconds. The triangular area is 4 metres; the rectangular area is 12 metres. Total distance is 16 metres.',
    '<path d="M44 146 L132 52 H264 V146 Z" fill="#d9eee6" stroke="none"/><path d="M44 146 L132 52 H264" fill="none" stroke="'+teal+'" stroke-width="3"/>'+line(44,146,285,146)+line(44,146,44,32)+line(132,146,132,52,ink,1,'5 4')+
    text(44,24,'Velocity (m/s)',ink,14,'start')+text(35,151,'0',ink,13,'end')+text(35,57,'4',ink,13,'end')+text(44,165,'0',ink,13)+text(132,165,'2',ink,13)+text(264,165,'5',ink,13)+text(164,197,'Time (s)',ink,14)+
    text(100,129,'4 m',blue,14)+text(199,109,'12 m',blue,14),
    'Add the triangle and rectangle under the velocity–time graph to find the 16 m travelled.',215);
}

function rateTangent() {
  return fig('Rate from a tangent',
    'On a product quantity against time graph, the gradient of a straight tangent touching the curve gives the rate at that instant. A steep tangent means a high rate; here the tangent rises from left to right.',
    line(45,146,288,146)+line(45,146,45,28)+'<path d="M45 140 C120 80 195 60 270 60" fill="none" stroke="'+teal+'" stroke-width="3"/>'+line(75,105,240,50,rust,2)+circle(158,78,4,rust,rust)+
    text(45,24,'Product (relative)',ink,14,'start')+text(167,174,'Time (arbitrary units)',ink,14)+text(255,112,'Tangent',rust,14),
    'Draw a straight tangent at the point, then calculate its gradient as change in product quantity divided by change in time.',190);
}
function pressureShift() {
  return fig('Pressure and a gas equilibrium',
    'In the illustrative equilibrium nitrogen plus three hydrogen molecules reversibly form two ammonia molecules. For gases at constant temperature, increasing pressure favours the side with fewer gas molecules: the ammonia side.',
    circle(37,57,8,'#bed7ef',blue)+circle(52,57,8,'#bed7ef',blue)+text(45,31,'N₂',blue,15)+text(73,62,'+',ink,17)+
    [100,130,160].map(x=>circle(x,57,6,'#e3e9e9',ink)+circle(x+11,57,6,'#e3e9e9',ink)).join('')+text(135,31,'3 H₂',ink,15)+
    arrow(182,50,213,50,rust,2)+arrow(213,68,182,68,blue,2)+circle(239,57,10,'#c9e6d3',teal)+circle(270,57,10,'#c9e6d3',teal)+text(255,31,'2 NH₃',teal,15)+
    text(76,116,'4 molecules',ink,14)+text(244,116,'2 molecules',ink,14)+text(160,150,'Pressure favours →',teal,14),
    'Count gas molecules on each side. Each product circle represents one ammonia molecule; its atomic structure is omitted. Higher pressure favours the side with fewer gas molecules.',170);
}
function rateAndShift(){const group=node('div');group.append(rateTangent(),pressureShift());return group;}
function motorForce() {
  return fig('Force on a current-carrying wire',
    'A wire carries conventional current out of the page, shown by a dot. The magnetic field points from north on the left to south on the right. The force on the wire is upwards. At right angles the force magnitude is magnetic flux density times current times length in the field.',
    text(29,79,'N',blue,20)+text(291,79,'S',blue,20)+arrow(50,40,270,40,blue,2)+text(160,26,'Magnetic field',blue,14)+
    circle(160,91,19,'white',ink)+circle(160,91,4,ink,ink)+arrow(160,69,160,46,rust,2)+text(239,105,'Current out',ink,14)+text(239,137,'of page',ink,14)+text(85,67,'Force',rust,14)+
    text(160,175,'F = B × I × l  (at 90°)',ink,16),
    'Use the conventional current and field directions to find the force. A dot means current out of the page.',195);
}
function coilReversal() {
  function side(x,y,label,out) {
    return circle(x,y,13,'white',ink)+
      (out?circle(x,y,3,ink,ink):line(x-6,y-6,x+6,y+6)+line(x-6,y+6,x+6,y-6))+
      text(x,y+55,label,ink,15);
  }
  return fig('Current reverses after half a turn',
    'At first, side A is left with conventional current into the page and force downwards; side B is right with current out of the page and force upwards. After half a turn, B is left with current into the page and A is right with current out of the page. The commutator swaps each side’s connection, so the direction in each named side reverses and the turning effect stays anticlockwise.',
    text(160,24,'Before half-turn',ink,15)+side(78,60,'Side A',false)+side(242,60,'Side B',true)+arrow(78,76,78,95,rust,2)+arrow(242,44,242,25,rust,2)+
    text(160,140,'Field: N → S',blue,13)+text(160,170,'After half-turn',ink,15)+side(78,210,'Side B',false)+side(242,210,'Side A',true)+arrow(78,226,78,245,rust,2)+arrow(242,194,242,175,rust,2)+
    text(160,295,'Dot: out of page   ×: into page',ink,14),
    'Follow a named side as the coil turns. The split-ring commutator reverses its current, keeping the turning effect in the same direction.',315);
}
function motorOverview(){return grouped(motorForce,coilReversal,splitRing);}
export function leftHandDirections() {
  return fig('Use Fleming’s left-hand rule',
    'The first finger points right, from north to south in the magnetic field. The second finger points into the page, shown by a cross. The thumb points down, showing the force. These three directions are mutually perpendicular.',
    text(160,25,'First finger: field',blue,15)+arrow(95,87,255,87,blue,3)+circle(95,87,15,'white',ink)+line(88,80,102,94,ink,2)+line(88,94,102,80,ink,2)+
    arrow(95,104,95,166,rust,3)+text(210,163,'Thumb: force',rust,15)+text(160,215,'Second finger: into page',ink,15),
    'Point the first finger with the field and the second finger into the page. The thumb then points down; the cross means into the page.',235);
}
export function motorReversalWorked(){return grouped(coilReversal,splitRing);}
function oxygenDebt() {
  return fig('Lactate after exercise',
    'Blood transports lactic acid from muscle to the liver after exercise. The body needs additional oxygen after exercise to deal with the lactic acid produced.',
    '<path d="M23 57 Q65 35 93 57 Q83 97 23 97 Z" fill="#f1d5cc" stroke="'+rust+'" stroke-width="2"/>'+text(58,122,'Muscle',ink,15)+
    arrow(95,78,205,78,blue,3)+text(150,59,'Blood transports',blue,14)+text(150,101,'lactic acid',blue,14)+
    '<path d="M210 49 Q274 30 297 58 Q302 94 230 99 Q204 91 210 49 Z" fill="#dec5be" stroke="'+rust+'" stroke-width="2"/>'+text(252,123,'Liver',ink,15)+
    text(160,157,'Extra oxygen after exercise',ink,14),
    'Follow lactic acid in the blood from muscle to liver. Extra oxygen is required after exercise.',175);
}
function hormoneFeedback() {
  return fig('Hormones and feedback',
    'The pituitary releases FSH and LH, which act on the ovary. Oestrogen and progesterone from the ovary feed back on pituitary hormone release. In fertility treatment FSH and LH can be used to stimulate follicle maturation and ovulation.',
    circle(66,70,32,'#e1e6f7',blue)+text(66,75,'Pituitary',ink,13)+
    '<ellipse cx="247" cy="70" rx="33" ry="24" fill="#f3d6ce" stroke="'+rust+'" stroke-width="2"/>'+circle(247,70,8,'#fff5df',rust)+text(247,115,'Ovary',ink,15)+
    arrow(101,58,211,58,blue,2)+text(156,44,'FSH and LH',blue,14)+arrow(211,88,101,88,teal,2)+text(156,145,'Oestrogen and progesterone',teal,13)+text(156,177,'feed back to pituitary',teal,13),
    'Follow pituitary hormones to the ovary, then the feedback signal in the other direction. Feedback effects vary through the cycle.',195);
}
function fertilityHormones() {
  return fig('Hormones used in fertility treatment',
    'FSH and LH may be given as fertility medicines. FSH stimulates follicles containing eggs to mature in the ovary; LH triggers ovulation, the release of an egg. This is a simplified treatment pathway and does not imply treatment always succeeds.',
    text(74,25,'FSH and LH',blue,15)+'<rect x="48" y="43" width="52" height="62" rx="5" fill="#dcecf3" stroke="'+blue+'" stroke-width="2"/><rect x="58" y="33" width="32" height="10" fill="#c9d7dd" stroke="'+ink+'"/>'+
    arrow(110,76,171,76,blue,2)+'<ellipse cx="211" cy="75" rx="32" ry="24" fill="#f3d6ce" stroke="'+rust+'" stroke-width="2"/>'+circle(211,75,8,'#fff5df',rust)+arrow(247,75,271,75,teal,2)+circle(285,75,8,'#fff5df',rust)+
    text(74,136,'Medicine',blue,15)+text(213,136,'Ovary',ink,15)+text(160,173,'Maturation → ovulation',ink,15),
    'Follow the medicines to the ovary. FSH stimulates follicle maturation and LH can trigger ovulation; treatment does not always succeed.',195);
}
function feedbackAndFertility(){return grouped(hormoneFeedback,fertilityHormones);}
function transformerComparison() {
  return fig('An ideal step-up transformer',
    'The primary has 500 volts and 12 amperes, so its power is 6,000 watts. An ideal transformer has the same output power; at 3,000 volts the secondary current is 2 amperes. In cables of equal resistance, heating power is proportional to current squared, so 12 amperes gives 36 times the heating of 2 amperes.',
    text(75,25,'Primary',ink,15)+text(245,25,'Secondary',ink,15)+text(75,56,'500 V',blue,16)+text(75,88,'12 A',blue,16)+
    '<path d="M116 44 q10 0 10 10 q0 10 -10 10 M129 44 q10 0 10 10 q0 10 -10 10 M158 44 q-10 0 -10 10 q0 10 10 10 M171 44 q-10 0 -10 10 q0 10 10 10" fill="none" stroke="'+rust+'" stroke-width="3"/>'+text(245,56,'3,000 V',teal,16)+text(245,88,'2 A',teal,16)+
    text(160,123,'6,000 W in = 6,000 W out',ink,15)+text(160,155,'Heating ratio: 12² : 2² = 36 : 1',ink,14),
    'Compare power on both sides of the ideal transformer. At equal cable resistance, compare the squares of the currents.',175);
}
function halfEquations() {
  return fig('Electrode half-equations',
    'Copper ions gain electrons at the negative cathode to form copper. Hydroxide ions lose electrons at the positive anode, forming oxygen and water. The half-equations conserve atoms and charge.',
    '<rect x="33" y="31" width="11" height="71" fill="#82969c"/><rect x="277" y="31" width="11" height="71" fill="#82969c"/>'+text(65,21,'− cathode',blue,14)+text(255,21,'+ anode',rust,14)+
    circle(95,67,20,'#dce8f5',blue)+text(95,72,'Cu²⁺',blue,14)+arrow(73,67,50,67,blue,2)+text(260,109,'O₂ ↑',rust,16)+circle(222,67,20,'#e1f0e6',teal)+text(222,72,'OH⁻',teal,13)+arrow(244,67,271,67,teal,2)+
    text(160,132,'Cu²⁺ + 2e⁻ → Cu',blue,15)+text(160,161,'4OH⁻ → O₂ + 2H₂O + 4e⁻',rust,14),
    'Follow ions to opposite electrodes. The electrons show reduction at the cathode and oxidation at the anode.',180);
}

function waterRoutes() {
  return fig('Treating fresh water and seawater',
    'Fresh water can be filtered to remove suspended solids and then sterilised to kill microbes. Seawater requires desalination to remove dissolved salts as well as suitable treatment for microbes. One desalination method uses a membrane that lets water through while retaining salts.',
    text(75,24,'Fresh water',ink,15)+text(240,24,'Seawater',ink,15)+
    '<path d="M25 42 H100 L72 76 V103 H53 V76 Z" fill="#eef5ee" stroke="'+ink+'" stroke-width="2"/>'+line(37,57,88,57,teal,2)+circle(49,50,3,rust,rust)+circle(71,50,3,rust,rust)+text(62,127,'Filter solids',teal,14)+
    '<rect x="181" y="44" width="120" height="58" fill="#dceef5" stroke="'+ink+'" stroke-width="2"/>'+line(239,44,239,102,teal,3)+circle(201,61,4,rust,rust)+circle(217,84,4,rust,rust)+arrow(224,73,254,73,blue,2)+text(241,127,'Remove salts',blue,14)+
    text(160,162,'Sterilise to reduce microbes',ink,14),
    'Compare the treatments. Filtering removes suspended solids; desalination removes dissolved salts. Microbes need appropriate treatment too.',180);
}
export function readableGcseFigure(render) {
  const visual = render();
  // Also normalise reused diagrams, which may predate the phone-size label floor.
  const enlargeLabels = () => {
    for (const label of visual.querySelectorAll?.('svg text[font-size]') || []) {
      const size = Number(label.getAttribute('font-size'));
      if (Number.isFinite(size) && size < 18) label.setAttribute('font-size', '18');
    }
  };
  enlargeLabels();
  // Existing student-controlled diagrams replace their SVG synchronously on click.
  visual.addEventListener?.('click', enlargeLabels);
  return visual;
}
function grouped(...renderers) {const group=node('div');group.append(...renderers.map(readableGcseFigure));return group;}

function storedEnergy(){return grouped(heatParticles,gcseStepVisuals['latent-heat'][1]);}
function ionisation() {
  return fig('Ionisation along a path',
    'Alpha radiation is more strongly ionising per unit distance than gamma radiation. In this schematic, atoms are shown with electrons removed along each path; the number of events is illustrative, not experimental data.',
    text(55,24,'Alpha',rust,15)+arrow(21,43,296,43,rust,2)+[66,129,192,255].map(x=>circle(x,69,12,'#edf1f1',ink)+text(x,74,'+',ink,14)+circle(x+16,56,3,blue,blue)).join('')+
    text(57,113,'Gamma',blue,15)+arrow(21,132,296,132,blue,2)+[66,129,192,255].map((x,i)=>circle(x,157,12,'#edf1f1',ink)+(i===1?text(x,162,'+',ink,14)+circle(x+16,144,3,blue,blue):'')).join(''),
    'Compare ionisations over equal illustrated path lengths. Actual events are random and depend on radiation and material.',190);
}
function shieldingAndIonisation(){return grouped(shield,ionisation);}
function frequency() {
  const pts=Array.from({length:93},(_,i)=>{const x=40+i*2.5;return x+','+(85-31*Math.sin((x-40)*Math.PI/57.5));}).join(' ');
  return fig('Count oscillations in time',
    'A graph of displacement against time shows two complete oscillations in one second. Its frequency is two hertz. The vertical displacement values are illustrative.',
    line(40,130,289,130)+line(40,130,40,30)+'<polyline points="'+pts+'" fill="none" stroke="'+teal+'" stroke-width="3"/>'+line(40,85,270,85,ink,1,'5 4')+
    text(40,24,'Displacement (illustrative)',ink,14,'start')+text(40,151,'0',ink,13)+text(155,151,'0.5',ink,13)+text(270,151,'1',ink,13)+text(160,183,'Time (s)',ink,15),
    'Count two complete cycles in one second: the frequency is 2 Hz. This is an illustrative example.',200);
}
function waveMeasures(){return grouped(wavelength,frequency);}
function energyDistribution() {
  const curve=(t)=>Array.from({length:101},(_,e)=>{const x=40+2.45*e;const f=Math.sqrt(e)*Math.exp(-e/t)/Math.pow(t,1.5);return x.toFixed(1)+','+(145-3100*f).toFixed(1);}).join(' ');
  return fig('Temperature and collision energy',
    'Illustrative particle energy distributions for a cooler and a warmer sample. The warmer curve is broader with a lower peak; a larger fraction lies above the same activation energy threshold.',
    line(40,145,292,145)+line(40,145,40,35)+'<polyline points="'+curve(16)+'" fill="none" stroke="'+blue+'" stroke-width="3"/>'+
    '<polyline points="'+curve(28)+'" fill="none" stroke="'+rust+'" stroke-width="3" stroke-dasharray="7 4"/>'+line(187,33,187,145,ink,1.5,'5 3')+
    text(40,24,'Relative particle count',ink,15,'start')+text(163,173,'Particle energy',ink,15)+text(240,55,'Threshold',ink,14),
    'Solid: cooler. Dashed: warmer. The dotted line shows activation energy. Compare the proportion beyond the threshold.',190);
}
function collisionsAndEnergy(){return grouped(collisionFrequency,energyDistribution);}
function resistanceSelection() {
  const dot=(x,y,resistant)=>circle(x,y,7,resistant?'#b9dfc8':'#c9def1',resistant?teal:blue)+(resistant?text(x,y+4,'R',teal,11):'');
  return fig('Antibiotic resistance and selection',
    'Before treatment, a bacterial population includes a resistant variant. An antibiotic kills susceptible bacteria, while the resistant bacterium survives and can reproduce. The antibiotic selects an existing variant; it does not direct bacteria to develop resistance.',
    text(50,22,'Before',ink,15)+text(160,22,'Treated',ink,14)+text(270,22,'Later',ink,15)+
    dot(28,53,false)+dot(53,53,false)+dot(77,53,true)+dot(40,82,false)+dot(66,82,false)+
    arrow(94,70,123,70,rust,2)+dot(160,68,true)+arrow(190,70,219,70,rust,2)+
    dot(246,53,true)+dot(270,53,true)+dot(294,53,true)+dot(258,82,true)+dot(282,82,true)+
    circle(74,121,6,'#c9def1',blue)+text(87,126,'susceptible',blue,13,'start')+circle(74,153,6,'#b9dfc8',teal)+text(87,158,'resistant',teal,13,'start'),
    'Follow a resistant bacterium already present before treatment. It can survive and reproduce as susceptible bacteria are killed.',175);
}
function painRelief() {
  const person=(x,mouth)=>circle(x,65,27,'#efd1bd',rust)+circle(x-9,59,2,ink,ink)+circle(x+9,59,2,ink,ink)+'<path d="M'+(x-10)+' 79 Q'+x+' '+mouth+' '+(x+10)+' 79" fill="none" stroke="'+ink+'" stroke-width="2"/>';
  const microbe=(x,y)=>circle(x,y,7,'#c9def1',blue)+line(x-4,y,x+4,y,blue,1.5)+line(x,y-4,x,y+4,blue,1.5);
  return fig('Pain relief and infection',
    'A painkiller can relieve pain, a symptom of illness. The same pathogens are shown before and after the painkiller: pain relief does not kill them. Other treatments may be needed for the underlying cause.',
    text(70,25,'Pain',rust,15)+text(250,25,'Less pain',teal,15)+person(70,68)+person(250,87)+microbe(39,114)+microbe(100,114)+microbe(220,114)+microbe(280,114)+
    arrow(110,65,210,65,teal,2)+text(160,48,'Painkiller',teal,14)+text(160,153,'Pathogens remain',blue,15),
    'Compare the symptom and the pathogen symbols. Painkillers can relieve pain without killing the pathogen.',175);
}
function antibioticsAndSelection(){return grouped(painRelief,antibioticTargets,resistanceSelection);}


function carbonDioxideComparison() {
  const beaker=(x,bubbles)=>'<path d="M'+x+' 40 V142 H'+(x+100)+' V40" fill="none" stroke="'+ink+'" stroke-width="2"/><path d="M'+(x+2)+' 65 H'+(x+98)+' V140 H'+(x+2)+' Z" fill="#dceef5"/>'+
    '<path d="M'+(x+50)+' 130 q-12 -18 0 -45 q12 12 0 45" fill="#d6edda" stroke="'+teal+'" stroke-width="2"/>'+Array.from({length:bubbles},(_,i)=>circle(x+55+(i%2)*8,74-i*11,3,'white',blue)).join('');
  return fig('Compare two carbon dioxide supplies',
    'Two otherwise similar pondweed samples are compared at the same high light and temperature. The higher-carbon-dioxide setup shows more bubbles in the same time in this illustrative example. Bubble size can vary, so collected gas volume is a more reliable rate comparison.',
    beaker(20,1)+beaker(200,3)+text(70,24,'Less CO₂',blue,15)+text(250,24,'More CO₂',blue,15)+text(160,171,'Same light, heat and time',ink,15),
    'More bubbles can suggest a faster rate, but bubble size varies. Compare collected gas volume per minute for a more reliable test. These bubbles are illustrative.',190);
}
function testCarbonDioxide(){return grouped(highLightExperiment,carbonDioxideComparison);}
function ovulationAndLining() {
  return fig('Ovary and uterus responses',
    'FSH supports maturation of a follicle containing an egg in the ovary. LH triggers ovulation, the release of an egg. Oestrogen helps rebuild the uterus lining; progesterone helps maintain it.',
    '<ellipse cx="65" cy="58" rx="40" ry="28" fill="#f3d6ce" stroke="'+rust+'" stroke-width="2"/>'+circle(65,58,12,'#fff5df',rust)+text(65,26,'Follicle',ink,15)+arrow(112,58,151,58,blue,2)+circle(177,58,10,'#fff5df',rust)+text(177,26,'Egg released',ink,15)+
    '<path d="M113 121 Q114 167 160 186 Q206 167 207 121 L182 132 L160 154 L138 132 Z" fill="#f4d2cc" stroke="'+rust+'" stroke-width="2"/><path d="M133 135 Q135 159 160 171 Q185 159 187 135" fill="none" stroke="'+teal+'" stroke-width="6"/>'+text(160,218,'Uterus lining',teal,15),
    'Follow follicle maturation and egg release. Oestrogen helps rebuild the uterus lining; progesterone helps maintain it.',235);
}
function hormonesAndEffects(){return grouped(menstrualHormones,ovulationAndLining);}
function splitRing() {
  const ring=(y,left,right)=>'<path d="M157 '+(y-34)+' A34 34 0 0 0 157 '+(y+34)+' M163 '+(y-34)+' A34 34 0 0 1 163 '+(y+34)+'" fill="none" stroke="'+rust+'" stroke-width="8"/>'+
    '<rect x="103" y="'+(y-8)+'" width="22" height="16" fill="#82969c"/><rect x="195" y="'+(y-8)+'" width="22" height="16" fill="#82969c"/>'+text(141,y+6,left,ink,16)+text(179,y+6,right,ink,16)+text(89,y+6,'+',blue,18)+text(231,y+6,'−',blue,18);
  return fig('A split-ring commutator',
    'Two separate ring segments rotate with the coil, while brushes at the left and right stay in place. After half a turn, segment A contacts the opposite brush and segment B does too. This reverses the current in each named coil side.',
    text(160,24,'Before half-turn',ink,15)+ring(76,'A','B')+text(160,147,'After half-turn',ink,15)+ring(200,'B','A')+text(160,273,'Brushes stay fixed',ink,15),
    'Track segment A from one brush to the other. The split ring swaps each side’s connection every half-turn.',295);
}
function vaccineMemory() {
  return fig('How vaccination prepares a response',
    'A vaccine safely introduces antigens, or instructions to make an antigen, so that the immune system responds and memory cells can form. On later exposure to that same antigen, the immune response can be faster.',
    circle(50,72,24,'#dceaf7',blue)+text(50,77,'Vaccine',blue,13)+arrow(78,72,108,72,teal,2)+
    circle(155,72,43,'#dcefe6',teal)+text(155,59,'Memory',teal,13)+text(155,91,'cells',teal,13)+arrow(201,72,226,72,teal,2)+
    '<path d="M238 51 L257 43 L276 51 V76 Q270 91 257 98 Q244 91 238 76 Z" fill="#f4e4d3" stroke="'+rust+'" stroke-width="2"/>'+text(257,126,'Faster',ink,13)+text(257,158,'response',ink,13)+text(240,190,'on exposure',ink,13),
    'Follow the preparation of immune memory. On later exposure, the response to the same antigen can be faster.',210);
}
function vaccineAndAntibiotics(){return grouped(vaccineMemory,antibioticTargets);}
function moleCalculation() {
  return fig('Convert mass to amount',
    'An illustrative 4.8 gram sample of magnesium has a molar mass of 24 grams per mole. Dividing 4.8 grams by 24 grams per mole gives 0.20 moles of magnesium.',
    '<rect x="30" y="42" width="92" height="72" rx="8" fill="#e2eef4" stroke="'+blue+'" stroke-width="2"/>'+text(76,72,'Mg',blue,18)+text(76,98,'4.8 g',ink,16)+
    arrow(129,78,164,78,rust,2)+text(238,45,'Molar mass',ink,14)+text(238,76,'24 g/mol',blue,15)+text(238,106,'4.8 ÷ 24',ink,15)+text(238,139,'= 0.20 mol',teal,16),
    'Divide mass by molar mass before using the balanced equation ratio. The values are a worked example.',160);
}
function molesAndRatio(){return grouped(moleCalculation,molarRatio);}
function bondEnergyBalance() {
  return fig('A separate bond-energy example',
    'In a separate hypothetical reaction, not the hydrogen and chlorine reaction shown above, breaking bonds takes in 300 kilojoules per mole of reaction and making bonds releases 500 kilojoules per mole. The overall change is 300 minus 500, or minus 200 kilojoules per mole: the reaction is exothermic.',
    '<rect x="55" y="80" width="70" height="60" fill="#f1d8c7" stroke="'+rust+'" stroke-width="2"/><rect x="195" y="40" width="70" height="100" fill="#d9e8f4" stroke="'+blue+'" stroke-width="2"/>'+
    text(90,65,'Energy in',rust,15)+text(230,25,'Energy out',blue,15)+text(90,119,'300',ink,16)+text(230,105,'500',ink,16)+text(90,170,'Break bonds',ink,14)+text(230,170,'Form bonds',ink,14)+
    text(160,204,'Values in kJ/mol',ink,15)+text(160,236,'300 − 500 = −200',ink,15),
    'For this separate hypothetical reaction, subtract energy out from energy in. A negative result indicates an exothermic change.',255);
}
function bondsAndBalance(){return grouped(reactionBonds,bondEnergyBalance);}
function lightLimitation() {
  return fig('When another factor limits the rate',
    'Under the same high light and temperature, the photosynthesis rate can be limited by the carbon dioxide supply. If carbon dioxide is increased while other factors are controlled, the rate may rise.',
    text(83,26,'Same high light',ink,14)+text(244,26,'Same temp.',ink,14)+
    '<path d="M29 42 H127 V135 H29 Z M192 42 H290 V135 H192 Z" fill="#e8f4f1" stroke="'+teal+'" stroke-width="2"/>'+
    circle(57,75,5,blue,blue)+circle(91,104,5,blue,blue)+circle(213,65,5,blue,blue)+circle(234,89,5,blue,blue)+circle(255,65,5,blue,blue)+circle(276,104,5,blue,blue)+
    text(78,160,'Less CO₂',blue,15)+text(241,160,'More CO₂',blue,15),
    'Compare carbon dioxide supply when light and temperature are held the same. A higher supply may allow a higher rate; the dots are a model.',180);
}
function lightRatePlateau() {
  return fig('Light intensity and photosynthesis rate',
    'An illustrative graph shows photosynthesis rate rising with light intensity and then levelling off when another factor limits it. At the marked intensities I and one quarter I, both points lie on the same plateau, so this example has the same rate at both intensities.',
    line(45,145,295,145)+line(45,145,45,35)+text(45,24,'Rate of photosynthesis',ink,15,'start')+
    '<path d="M45 143 Q70 60 105 60 H285" fill="none" stroke="'+teal+'" stroke-width="3"/>'+
    line(105,60,105,145,blue,1.5,'4 4')+line(285,60,285,145,blue,1.5,'4 4')+circle(105,60,4,rust,rust)+circle(285,60,4,rust,rust)+
    text(105,173,'I ÷ 4',blue,15)+text(285,173,'I',blue,15)+text(165,205,'Light intensity',ink,15),
    'Compare the two marked intensities on the same illustrative plateau. Another factor limits the rate, so here the rate does not fall fourfold.',225);
}
function inverseSquareAndLimit(){return grouped(inverseSquare,lightLimitation,lightRatePlateau);}
function distanceTangent() {
  return fig('Speed at an instant',
    'A curved distance–time graph has a straight tangent touching it at one point. The gradient of that tangent is the speed at that instant. The graph is qualitative and no numerical readings are implied.',
    line(45,146,288,146)+line(45,146,45,30)+'<path d="M45 142 C108 138 186 101 270 43" fill="none" stroke="'+teal+'" stroke-width="3"/>'+line(85,141.76,246,69.49,rust,2)+circle(149.625,112.75,4,rust,rust)+
    text(45,24,'Distance (m)',ink,14,'start')+text(160,175,'Time (s)',ink,14)+text(233,57,'Tangent',rust,14),
    'At the chosen point, draw a tangent and find change in distance divided by change in time along that straight line.',190);
}
function distanceAndVelocity(){return grouped(velocityArea,distanceTangent);}

function voltageCircuits() {
  return fig('Potential difference in two circuits',
    'In a 6 volt parallel circuit, each lamp is connected across the supply and has a potential difference of 6 volts. In a series circuit with two identical lamps, the 6 volts is shared equally, 3 volts across each. Current is the same at every point in the series loop.',
    text(160,22,'Parallel branches',ink,16)+
    '<path d="M48 45 H145 M175 45 H272 V122 H174 M146 122 H48 V45 M48 84 H146 M174 84 H272" fill="none" stroke="'+ink+'" stroke-width="2"/>'+line(145,35,145,55)+line(175,40,175,50)+
    circle(160,84,14,'white',ink)+line(151,75,169,93)+line(151,93,169,75)+circle(160,122,14,'white',ink)+line(151,113,169,131)+line(151,131,169,113)+
    text(210,73,'6 V',blue,16)+text(210,111,'6 V',blue,16)+
    text(160,194,'Series: identical lamps',ink,16)+
    '<path d="M48 215 H145 M175 215 H272 V285 H228 M200 285 H120 M92 285 H48 V215" fill="none" stroke="'+ink+'" stroke-width="2"/>'+line(145,205,145,225)+line(175,210,175,220)+
    circle(106,285,14,'white',ink)+line(97,276,115,294)+line(97,294,115,276)+circle(214,285,14,'white',ink)+line(205,276,223,294)+line(205,294,223,276)+
    text(106,321,'3 V',blue,16)+text(214,321,'3 V',blue,16)+text(160,247,'6 V supply in each circuit',ink,15),
    'Compare each lamp’s potential difference. The equal series shares shown require identical lamps; the parallel branches each span the supply.',340);
}
function paperPhases() {
  return fig('Paper and solvent during chromatography',
    'The paper is the stationary phase. Solvent moves up the paper as the mobile phase. Different substances distribute differently between the paper and the solvent, so their spots can travel different distances.',
    '<rect x="53" y="20" width="205" height="142" fill="#fffdf3" stroke="'+ink+'" stroke-width="2"/>'+line(66,132,245,132,ink,2)+
    circle(110,84,8,'#c0d6ef',blue)+circle(190,52,8,'#f0cfba',rust)+arrow(72,116,72,43,teal,2)+
    text(100,190,'Slower',blue,15)+text(207,190,'Faster',rust,15)+text(160,222,'Solvent moves up paper',teal,15),
    'Follow the solvent up the stationary paper. The two spots have moved different distances from the same starting line.',245);
}
function phaseDistribution() {
  const particle=(x,y,kind)=>kind==='A'?circle(x,y,7,'#c8dcf3',blue):'<path d="M'+x+' '+(y-8)+' l8 8 -8 8 -8 -8 z" fill="#f0cdbb" stroke="'+rust+'" stroke-width="2"/>';
  return fig('Distribution between the phases',
    'In a simplified snapshot, four particles of substance A are distributed with three on the stationary paper and one in the moving solvent. Four of substance B are distributed with one on the paper and three in the solvent. Their different distributions can make them travel different distances. The numbers are a model, not measurements.',
    text(80,25,'On paper',ink,15)+text(240,25,'In solvent',ink,15)+
    '<rect x="15" y="40" width="130" height="130" fill="#fffdf3" stroke="'+ink+'" stroke-width="2"/><rect x="175" y="40" width="130" height="130" fill="#e6f1f6" stroke="'+blue+'" stroke-width="2"/>'+
    text(28,83,'A',blue,16)+particle(55,77,'A')+particle(85,77,'A')+particle(115,77,'A')+particle(240,77,'A')+
    text(28,143,'B',rust,16)+particle(85,137,'B')+particle(200,137,'B')+particle(235,137,'B')+particle(270,137,'B')+
    arrow(295,159,295,52,teal,2)+text(160,202,'Solvent moves up',ink,15),
    'Compare the circles and diamonds between paper and solvent. This snapshot is a simplified model: both substances can move between phases.',220);
}
function chromatographyPhases(){return grouped(paperPhases,phaseDistribution);}
function muscleOxygenDemand() {
  return fig('Oxygen supply during intense exercise',
    'When a muscle’s oxygen demand exceeds the supply, aerobic respiration continues and the muscle also respires anaerobically. In the GCSE model this produces lactic acid.',
    '<rect x="46" y="30" width="80" height="108" fill="#d5e9f3" stroke="'+blue+'" stroke-width="2"/><rect x="194" y="72" width="80" height="66" fill="#e6eee2" stroke="'+teal+'" stroke-width="2"/>'+
    text(86,162,'Demand',blue,15)+text(234,162,'Supply',teal,15)+text(160,195,'Supply is below demand',ink,15),
    'Compare the illustrative bars. The model does not imply that aerobic respiration stops.',215);
}
function muscleRespiration(){return grouped(muscleOxygenDemand,respiratoryComparison);}
function crystallisation() {
  return fig('Crystals form on cooling',
    'After filtration, some water is evaporated from the salt solution. Cooling the concentrated solution allows salt crystals to form. The crystals can then be separated and dried.',
    '<path d="M67 35 V142 H253 V35" fill="none" stroke="'+ink+'" stroke-width="2"/><path d="M69 68 H251 V140 H69 Z" fill="#e0eff4"/>'+
    '<path d="M101 132 l12 -18 l12 18 l-12 9 Z M148 130 l13 -21 l13 21 l-13 10 Z M196 132 l12 -18 l12 18 l-12 9 Z" fill="#aad0e8" stroke="'+blue+'" stroke-width="2"/>'+text(160,22,'Cool concentrated solution',ink,15)+text(160,174,'Salt crystals',blue,15),
    'Locate crystals that form as the concentrated solution cools. The apparatus is schematic.',190);
}
function saltsAndCrystals(){return grouped(saltsApparatus,crystallisation);}
function infraredCamera() {
  return fig('Detecting infrared',
    'A warm object emits infrared radiation. An infrared camera detects some of that radiation and produces an image. X-rays and gamma rays, unlike infrared, are ionising.',
    '<rect x="31" y="58" width="78" height="80" rx="8" fill="#efd1b9" stroke="'+rust+'" stroke-width="2"/>'+text(70,104,'Warm',rust,15)+
    arrow(114,72,190,72,rust,2)+arrow(114,103,190,103,rust,2)+text(150,52,'Infrared',rust,15)+
    '<rect x="194" y="61" width="86" height="64" rx="6" fill="#dce8ef" stroke="'+blue+'" stroke-width="2"/>'+circle(218,93,15,'white',blue)+circle(218,93,6,blue,blue)+text(239,157,'Camera',ink,15),
    'Follow infrared emitted by the warm object to the detector. The diagram is a model, not a thermal photograph.',180);
}
function ionisingRadiation() {
  return fig('Ionising electromagnetic radiation',
    'An X-ray or gamma photon can transfer energy to an atom and remove an electron. The atom becomes a positive ion. Such ionisation can damage living cells.',
    '<path d="M16 70 q9 -20 18 0 t18 0 t18 0" fill="none" stroke="'+blue+'" stroke-width="3"/>'+arrow(72,70,102,70,blue,2)+
    circle(134,70,25,'#e8efef',ink)+text(134,76,'Atom',ink,14)+arrow(162,70,195,70,rust,2)+
    circle(225,70,25,'#e8efef',ink)+text(225,76,'+',ink,18)+arrow(251,57,271,48,blue,1.5)+circle(279,46,5,'#c9def1',blue)+text(279,29,'e⁻',blue,16)+
    text(75,25,'X-ray / gamma',blue,14)+text(225,125,'Positive ion',rust,15),
    'Follow the radiation to the atom and the electron removed. This ionisation model is not to scale.',145);
}
function emApplications(){return grouped(infraredCamera,xray,ionisingRadiation);}
function clinicalTrials() {
  const person=(x,y)=>circle(x,y,5,'#d7e9ef',blue)+'<path d="M'+x+' '+(y+5)+' v13 m-6 -6 h12 m-6 6 -5 7 m5 -7 5 7" stroke="'+blue+'" stroke-width="2" fill="none"/>';
  return fig('Clinical trials progress in stages',
    'Early clinical testing examines safety and dose in small groups. Larger controlled trials compare effectiveness and monitor side effects, using treatment and control groups.',
    text(76,25,'Early stage',ink,15)+person(58,57)+person(93,57)+text(88,120,'Safety and dose',blue,14)+
    arrow(118,75,160,75,rust,2)+text(240,25,'Larger trial',ink,15)+person(204,57)+person(226,57)+person(254,57)+person(276,57)+
    line(240,52,240,97,ink,1,'4 3')+text(214,153,'Treatment',teal,13)+text(267,186,'Control',rust,13),
    'Follow from small early groups to larger controlled comparisons. Trials continue to monitor safety.',210);
}
function testingAndTrials(){return grouped(treatmentTesting,clinicalTrials);}
function parallelAndSeries() {
  return fig('Potential difference in two circuits',
    'In a 9 volt parallel circuit, each lamp is connected across the supply and has a potential difference of 9 volts. In a series circuit with two identical lamps, the 9 volts is shared equally, 4.5 volts across each. Matching arrows show the same conventional current at two points in the series loop.',
    text(160,25,'Parallel branches',ink,16)+
    '<path d="M48 45 H145 M175 45 H272 V122 H174 M146 122 H48 V45 M48 84 H146 M174 84 H272" fill="none" stroke="'+ink+'" stroke-width="2"/>'+line(145,35,145,55)+line(175,40,175,50)+
    circle(160,84,14,'white',ink)+line(151,75,169,93)+line(151,93,169,75)+circle(160,122,14,'white',ink)+line(151,113,169,131)+line(151,131,169,113)+
    text(210,73,'9 V',blue,16)+text(210,111,'9 V',blue,16)+
    text(160,193,'Series: identical lamps',ink,16)+
    '<path d="M48 215 H145 M175 215 H272 V285 H228 M200 285 H120 M92 285 H48 V215" fill="none" stroke="'+ink+'" stroke-width="2"/>'+line(145,205,145,225)+line(175,210,175,220)+
    circle(106,285,14,'white',ink)+line(97,276,115,294)+line(97,294,115,276)+circle(214,285,14,'white',ink)+line(205,276,223,294)+line(205,294,223,276)+
    text(106,321,'4.5 V',blue,16)+text(214,321,'4.5 V',blue,16)+text(160,247,'Each supply: 9 V',ink,15)+
    arrow(48,235,48,270,teal,2)+arrow(272,270,272,235,teal,2)+text(160,360,'Same current throughout',teal,15),
    'Compare potential differences. Equal series shares require identical lamps; the arrows show the same current at both points in the series loop.',380);
}
function rfDistance() {
  return fig('Measure both chromatography distances',
    'A sample spot and a solvent front started from the same baseline. The spot is 2 centimetres from the baseline and the solvent front is 8 centimetres from it, so Rf is 2 divided by 8, or 0.25.',
    '<rect x="51" y="20" width="216" height="158" fill="#fffdf3" stroke="'+ink+'" stroke-width="2"/>'+line(61,40,257,40,teal,2,'5 4')+line(61,160,257,160,ink,2)+circle(102,130,8,'#e5bf9c',rust)+
    line(147,130,147,160,blue,2)+line(140,130,154,130,blue,2)+line(140,160,154,160,blue,2)+text(158,151,'2 cm',blue,15,'start')+
    line(218,40,218,160,rust,2)+line(211,40,225,40,rust,2)+line(211,160,225,160,rust,2)+text(230,104,'8 cm',rust,15,'start')+
    text(160,205,'Rf = 2 ÷ 8 = 0.25',ink,16),
    'Both distances start at the baseline. Divide the spot distance by the solvent-front distance. The values are illustrative.',225);
}
function rfWorked() {
  return fig('Worked Rf measurement',
    'The sample spot centre is 4 centimetres above the baseline and the solvent front is 8 centimetres above it. Rf is the spot distance divided by the front distance: 4 divided by 8 equals 0.50, with no units.',
    '<rect x="51" y="20" width="216" height="158" fill="#fffdf3" stroke="'+ink+'" stroke-width="2"/>'+line(61,40,257,40,teal,2,'5 4')+line(61,160,257,160,ink,2)+circle(102,100,8,'#e5bf9c',rust)+
    line(147,100,147,160,blue,2)+line(140,100,154,100,blue,2)+line(140,160,154,160,blue,2)+text(158,137,'4 cm',blue,15,'start')+
    line(218,40,218,160,rust,2)+line(211,40,225,40,rust,2)+line(211,160,225,160,rust,2)+text(230,104,'8 cm',rust,15,'start')+
    text(160,205,'Rf = 4 ÷ 8 = 0.50',ink,16),
    'Measure both distances from the baseline. Divide the distance to the spot centre by the solvent-front distance.',225);
}
function chromatographyWorked(){return grouped(()=>gcseVisual(['chromatogram']),rfWorked);}
function activationBarrier() {
  return fig('Read activation energy',
    'A reaction energy profile starts at a reactant energy level, rises to a peak, then falls to a lower product energy level. Activation energy is the vertical energy difference between the reactants and the peak.',
    line(45,148,286,148)+line(45,148,45,35)+text(45,25,'Energy (arbitrary units)',ink,15,'start')+text(160,198,'Progress of reaction',ink,15)+
    '<path d="M55 125 H100 C132 125 135 55 164 55 S202 136 247 136 H277" fill="none" stroke="'+teal+'" stroke-width="3"/>'+
    line(75,125,75,55,rust,2)+line(68,125,82,125,rust,2)+line(68,55,82,55,rust,2)+text(160,225,'Activation energy: red marker',rust,15)+
    text(89,172,'Reactants',ink,14)+text(243,172,'Products',ink,14),
    'Measure the energy difference from the reactant level to the peak. This example has lower-energy products.',246);
}
function wireField() {
  return fig('Field around a straight wire',
    'A dot represents current coming out of the page. The magnetic field circles the wire anticlockwise, as given by the right-hand grip rule.',
    '<circle cx="160" cy="100" r="58" fill="none" stroke="'+blue+'" stroke-width="2"/>'+circle(160,100,15,'white',ink)+circle(160,100,4,ink,ink)+
    arrow(185,47,160,42,blue,2)+arrow(218,110,218,80,blue,2)+arrow(135,153,160,158,blue,2)+arrow(102,80,102,110,blue,2)+
    text(160,25,'Current out of page',ink,15)+text(160,193,'Field circles the wire',blue,15),
    'Use the right-hand grip rule: thumb out of the page, fingers curl around the field. The dot marks current towards you.',210);
}
function coilWithCurrent(){return gcseVisual(['coil', true]);}
function wireAndCoil(){return grouped(wireField,coilWithCurrent);}
export const gcseOpeningVisuals = {
  'salt-electrolysis': () => grouped(gcseStepVisuals['salt-electrolysis'][1], brine),
  'latent-heat': () => grouped(heatingCurve, gcseStepVisuals['latent-heat'][1]),
  'glucose-control': glucoseResponseDetailed,
  'greenhouse': greenhouse,
  'potable-water': waterRoutes,
  'forces-motion': movingAndStationary,
  'respiration-exercise': respiratoryComparison,
  'density-and-gas-pressure': () => grouped(density, gcseStepVisuals['density-and-gas-pressure'][1]),
  'salts-and-reactivity': () => grouped(saltsApparatus, () => photo('copper-deposit', 'Copper deposited on iron', 'In copper sulfate solution, iron displaces copper. Locate the reddish copper on the iron shavings.')),
  'reflex-response': neuron,
  'electromagnetic-spectrum': spectrumAndWaves,
  'prevention-and-medicines': () => grouped(transmission, treatmentTesting),
  'radiation-types': () => grouped(shield, emissions, ionisation),
  'reproductive-hormones': hormonesAndEffects,
  'carbon-cycling': gcseStepVisuals['carbon-cycling'][0]
};
export const gcseHigherVisuals = {
  'decay-half-life': halfLifeRatio,
  'reaction-profiles': bondsAndBalance,
  'salts-and-reactivity': acidStrength,
  'mass-conservation': molesAndRatio,
  'salt-electrolysis': electrolysisReduction,
  'photosynthesis-limits': inverseSquareAndLimit,
  'glucose-control': glucagonResponse,
  'solution-concentration': dilution,
  'forces-motion': momentum,
  'dynamic-equilibrium': equilibriumHeating,
  'motion-graphs': distanceAndVelocity,
  'reaction-rate': rateAndShift,
  'electromagnet-switch': motorOverview,
  'respiration-exercise': oxygenDebt,
  'reproductive-hormones': feedbackAndFertility,
  'national-grid': transformerComparison,
  'electrode-evidence': halfEquations
};
export const moreGcseStepVisuals = {
  'food-web-change': {2:quadrat},
  'wave-motion': {1:waveMeasures,2:waveCompare},
  'forces-motion': {2:stopping},
  'decay-half-life': {2:irradiation},
  'density-and-gas-pressure': {0:density},
  'photosynthesis-limits': {0:photosynthesisAndGlucose,2:() => grouped(testCarbonDioxide, carbonDioxideComparison)},
  'glucose-control': {0:homeostasis,1:glucoseResponseDetailed,2:diabetes},
  'reaction-rate': {1:collisionsAndEnergy,2:dynamicEquilibrium},
  'salt-electrolysis': {2:brine},
  'reflex-response': {0:neuron,1:reflexWithSynapse,2:reflexMeasure},
  'respiration-exercise': {0:respiratoryComparison,1:muscleRespiration},
  'vaccine-memory': {0:barriersAndAntibodies,1:vaccineMemory,2:vaccineAndAntibiotics},
  'selection-and-variation': {0:selectionAndInheritance,1:selectionAndInheritance,2:selectiveBreeding},
  'inheritance-cross': {0:genotypeAndPhenotype,2:selectionAndInheritance},
  'chromatography': {0:chromatographyPhases,1:rfDistance,2:gasTests},
  'latent-heat': {0:storedEnergy,1:() => grouped(heatingCurve, gcseStepVisuals['latent-heat'][1]),2:latentCalculation},
  'parallel-circuits': {2:parallelAndSeries},
  'reaction-profiles': {0:activationBarrier,2:temperaturePractical},
  'mass-conservation': {2:concentrationExample},
  'crude-oil': {0:methaneStructure,2:alkene},
  'greenhouse': {0:greenhouse,1:emissionsSources,2:pollutants},
  'potable-water': {0:waterForDrinking,1:filtration,2:lifeCycle},
  'electromagnet-switch': {0:wireAndCoil,1:currentMagnitudeAndDirection,2:ironCore},
  'salts-and-reactivity': {0:sulfateSalt,1:saltsAndCrystals},
  'electromagnetic-spectrum': {0:spectrumAndWaves,1:emSpectrum,2:emApplications},
  'prevention-and-medicines': {0:transmissionAndPrevention,1:antibioticsAndSelection,2:testingAndTrials},
  'radiation-types': {0:emissions,1:shieldingAndIonisation,2:alphaDecay},
  'circuit-resistance': {0:circuitMeters,2:electricalPower},
  'reproductive-hormones': {0:menstrualHormones,1:hormonesAndEffects,2:contraception},
  'carbon-cycling': {2:habitatAndProtection}
};

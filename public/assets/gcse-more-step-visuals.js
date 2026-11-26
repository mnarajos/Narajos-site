// Original teaching schematics. Positions, sizes and colours are illustrative.
import { arrow, blue, circle, diagram, ink, line, node, picture, rust, teal, text } from './catchup-models.js';
const fig = (title,alt,art,caption,h=185) => picture(title,diagram(alt,art,320,h),caption);

function greenhouse() {
  return fig('Radiation and greenhouse gases',
    'Short-wave radiation from the Sun reaches and warms Earth’s surface. The surface emits infrared radiation. Greenhouse gases absorb some infrared and re-emit it in all directions, including back towards the surface.',
    circle(43,35,20,'#ffe1a2',rust)+text(43,40,'Sun',rust,14)+arrow(62,49,119,116,rust,3)+text(75,83,'Sunlight',rust,14)+
    '<path d="M0 149 Q160 91 320 149 V185 H0Z" fill="#c7e3d2" stroke="'+teal+'" stroke-width="2"/>'+
    text(161,170,'Earth’s surface',ink,15)+arrow(156,132,191,90,blue,3)+text(213,50,'Infrared',blue,14)+
    circle(199,81,10,'#dbe8f7',blue)+text(265,79,'Greenhouse',ink,13)+text(265,95,'gas',ink,13)+
    arrow(205,88,248,120,blue,2)+arrow(195,91,175,126,blue,2),
    'Follow sunlight to the surface, then infrared from the surface. The gas re-emits absorbed radiation in different directions.');
}
function filtration() {
  return fig('Filtration and sterilisation',
    'A filter retains suspended solid particles while water passes through. A separate sterilisation stage kills microbes in the filtered water. Dissolved salt passes through the filter and needs a separate desalination process.',
    '<path d="M35 28 H142 L100 83 V126 H78 V83 Z" fill="#eef5ee" stroke="'+ink+'" stroke-width="2"/>'+
    line(53,49,124,49,teal,2)+circle(75,43,4,rust)+circle(95,38,4,rust)+circle(110,43,4,rust)+
    '<path d="M65 128 H114 V166 H65 Z" fill="#d7edf4" stroke="'+ink+'" stroke-width="2"/>'+
    text(89,18,'Filter',ink,15)+text(89,181,'Filtered water',blue,14)+arrow(121,143,174,143,blue)+
    '<circle cx="231" cy="119" r="35" fill="#e6f2ed" stroke="'+teal+'" stroke-width="2"/>'+
    text(231,116,'Sterilise',teal,14)+text(231,135,'microbes',teal,13)+
    text(229,173,'Dissolved salts remain',ink,13),
    'The filter catches suspended particles; sterilisation acts on microbes. Removing dissolved salts requires desalination.');
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
    text(77,20,'Random quadrats',ink,14)+text(242,20,'Transect',ink,14)+text(77,164,'Whole area',ink,14)+text(242,164,'Distance from hedge',ink,14),
    'Compare random locations for a whole-area estimate with regular positions along a gradient. The sketches show only a few samples.');
}
function circuitMeters() {
  return fig('Measuring a component',
    'An ammeter is in series in the main loop with a cell and lamp. A voltmeter forms a parallel branch connected across the lamp terminals.',
    '<path d="M147 22 H44 V105 H54 M82 105 H142 M176 105 H275 V22 H164 M102 105 V159 H145 M173 159 H215 V105" fill="none" stroke="'+ink+'" stroke-width="2.5"/>'+
    line(147,11,147,33)+line(164,15,164,29)+circle(68,105,14,'white',ink)+text(68,110,'A',ink,16)+
    circle(159,105,17,'white',ink)+line(148,94,170,116)+line(148,116,170,94)+
    circle(159,159,14,'white',ink)+text(159,164,'V',ink,16)+circle(102,105,3,ink)+circle(215,105,3,ink)+
    text(88,82,'Ammeter',ink,14)+text(159,183,'Voltmeter',ink,14),
    'Trace the main loop through the ammeter; the voltmeter connects across the lamp.',195);
}
function shield() {
  return fig('Penetration of radiation',
    'A source emits alpha, beta and gamma. A sheet of paper stops alpha. An aluminium sheet stops beta. Thick lead reduces the intensity of gamma, but does not necessarily stop every gamma ray.',
    '<circle cx="35" cy="94" r="18" fill="#eee2d7" stroke="'+rust+'" stroke-width="2"/>'+text(35,99,'Source',ink,12)+
    '<rect x="105" y="45" width="5" height="111" fill="#c5c5c5"/><rect x="185" y="45" width="10" height="111" fill="#97a6ad"/><rect x="268" y="45" width="24" height="111" fill="#68777d"/>'+
    arrow(53,66,102,66,rust,2)+arrow(53,96,181,96,teal,2)+arrow(53,126,304,126,blue,2)+
    text(78,57,'α',rust,16)+text(141,87,'β',teal,16)+text(240,117,'γ',blue,16)+
    text(107,29,'Paper',ink,13)+text(190,29,'Aluminium',ink,13)+text(278,29,'Lead',ink,13)+text(160,176,'Gamma is reduced, not necessarily stopped',ink,13),
    'Follow each ray to the shielding that stops or reduces it. Shielding effectiveness depends on thickness and radiation energy.');
}
function waveCompare() {
  let a=''; for(let x=35;x<=285;x+=25)a+=circle(x,55+18*Math.sin((x-35)/35),3,teal,teal);
  let b=''; [35,43,51,93,101,109,151,159,167,209,217,225,267,275,283].forEach(x=>b+=line(x,129,x,149,blue,3));
  return fig('Two directions of oscillation',
    'A transverse wave travels right while its particles move up and down, perpendicular to the direction of travel. A longitudinal wave travels right while its particles move backwards and forwards parallel to that direction. Closely spaced lines represent compressions.',
    a+arrow(188,20,282,20,ink)+text(145,24,'Wave travels',ink,13,'end')+arrow(35,77,35,35,rust)+arrow(35,35,35,77,rust)+text(160,105,'Transverse: motion perpendicular',ink,14)+
    b+arrow(188,117,282,117,ink)+arrow(58,166,110,166,rust)+arrow(110,166,58,166,rust)+text(218,173,'Longitudinal: parallel',ink,14),
    'Compare the particle motion arrows with the direction in which each wave travels.');
}
function wavelength() {
  const points=Array.from({length:65},(_,i)=>{const x=15+i*4.5;return x+','+(90-35*Math.cos((x-30)*Math.PI/80));}).join(' ');
  return fig('Read wavelength and amplitude',
    'A transverse wave is drawn about its equilibrium line. Wavelength is the distance from one crest to the next crest. Amplitude is the maximum displacement from the equilibrium line to a crest.',
    line(14,90,307,90,'#91a3a3',1,'5 4')+'<polyline points="'+points+'" fill="none" stroke="'+teal+'" stroke-width="3"/>'+
    arrow(30,34,190,34,blue,2)+arrow(190,34,30,34,blue,2)+text(110,22,'Wavelength',blue,14)+
    arrow(110,90,110,125,rust,2)+text(110,149,'Amplitude',rust,14)+text(241,149,'Dashed: equilibrium',ink,12),
    'Measure one complete cycle between matching points. Frequency counts complete cycles each second.',160);
}
function stopping() {
  return fig('Thinking distance and braking distance',
    'A car moving right travels a thinking distance before the brakes are applied, then a braking distance while it slows to rest. Stopping distance is the total of these consecutive distances.',
    line(20,133,302,133,ink,2)+'<path d="M25 108 h47 l12 12 v11 H17 v-10 z" fill="#d3e6f3" stroke="'+blue+'" stroke-width="2"/>'+circle(31,133,6,ink)+circle(70,133,6,ink)+
    '<path d="M113 108 h47 l12 12 v11 h-67 v-10 z" fill="#d3e6f3" stroke="'+blue+'" stroke-width="2"/>'+circle(119,133,6,ink)+circle(158,133,6,ink)+
    '<path d="M232 108 h47 l12 12 v11 h-67 v-10 z" fill="#e3e9e9" stroke="'+ink+'" stroke-width="2"/>'+circle(238,133,6,ink)+circle(277,133,6,ink)+
    arrow(25,78,116,78,rust,2)+text(72,60,'Thinking',rust,14)+arrow(116,78,259,78,teal,2)+text(188,60,'Braking',teal,14)+
    text(30,165,'Hazard',ink,13)+text(140,165,'Brakes applied',ink,13)+text(262,165,'Stopped',ink,13),
    'Add the distance travelled during the reaction to the distance travelled after the brakes are applied.');
}
function neuron() {
  return fig('Withdrawal reflex pathway',
    'A receptor in the skin detects a stimulus. An impulse travels along a sensory neurone to a relay neurone in the spinal cord, then along a motor neurone to a muscle. The muscle contracts and withdraws the hand.',
    '<path d="M15 67 q20-20 40 0 v35 h-40 z" fill="#f3d4c0" stroke="'+rust+'" stroke-width="2"/>'+text(35,122,'Skin',ink,14)+
    arrow(55,80,112,80,blue,2)+text(84,61,'Sensory',blue,13)+
    '<rect x="115" y="38" width="83" height="85" rx="16" fill="#e5eaf8" stroke="'+blue+'" stroke-width="2"/>'+text(156,70,'Spinal',ink,14)+text(156,87,'cord',ink,14)+
    arrow(199,80,251,80,teal,2)+text(226,61,'Motor',teal,13)+
    '<path d="M253 57 Q310 35 303 104 Q270 117 253 101 Z" fill="#efc8c2" stroke="'+rust+'" stroke-width="2"/>'+text(280,128,'Muscle',ink,14)+
    text(160,161,'Receptor → CNS → effector',ink,15),
    'Follow the impulse to the spinal cord and then to the muscle. The pathway is simplified.');
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
    text(67,120,'Alpha',ink,14)+text(67,139,'2p + 2n',ink,13)+circle(159,78,10,'#c6e0f5',blue)+text(159,83,'−',blue,16)+text(159,120,'Beta',ink,14)+text(159,139,'electron',ink,13)+
    '<path d="M230 79 q6-20 12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="'+teal+'" stroke-width="3"/>'+text(263,120,'Gamma',ink,14)+text(263,139,'wave',ink,13),
    'Compare the composition of each emission. The sketches are not to scale.',155);
}
function temperaturePractical() {
  return fig('Measure a temperature change',
    'A thermometer is held in a reaction mixture in an insulated cup with a lid. The initial temperature and the highest or lowest temperature after mixing are recorded.',
    '<path d="M54 66 L67 155 H155 L168 66 Z" fill="#e2f0ee" stroke="'+teal+'" stroke-width="3"/>'+
    '<path d="M64 103 H158 L151 151 H71 Z" fill="#c7dfea"/>'+line(48,65,174,65,ink,5)+line(115,19,115,120,rust,5)+circle(115,121,7,rust,rust)+
    text(117,17,'Thermometer',ink,14)+text(242,93,'Insulated cup',ink,13)+line(170,89,189,89,ink,1.5)+
    text(229,135,'Stir and record',ink,14)+text(229,154,'peak or minimum',ink,14),
    'Compare the starting temperature with the peak or minimum. Insulation reduces energy transfer to the surroundings.');
}


function irradiation() {
  return fig('Exposure and contamination',
    'During irradiation radiation from a source reaches a person but radioactive material is not transferred. During contamination particles of radioactive material are deposited on the person and can continue emitting radiation.',
    circle(33,64,13,'#e8d3cb',rust)+text(33,40,'Source',ink,13)+arrow(48,64,95,64,rust)+
    '<circle cx="119" cy="42" r="10" fill="none" stroke="'+ink+'" stroke-width="2"/><path d="M119 52 V91 M102 68 H136 M119 91 L105 116 M119 91 L133 116" stroke="'+ink+'" stroke-width="2" fill="none"/>'+text(79,146,'Irradiation',ink,14)+
    circle(195,64,13,'#e8d3cb',rust)+text(195,40,'Source',ink,13)+arrow(209,64,252,64,rust)+circle(250,75,4,rust,rust)+circle(264,84,4,rust,rust)+
    '<circle cx="267" cy="42" r="10" fill="none" stroke="'+ink+'" stroke-width="2"/><path d="M267 52 V91 M250 68 H284 M267 91 L253 116 M267 91 L281 116" stroke="'+ink+'" stroke-width="2" fill="none"/>'+text(253,146,'Contamination',ink,14),
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
    text(67,27,'Butane',ink,15)+text(67,50,'C₄H₁₀',blue,19)+
    [34,56,78,100].map(x=>circle(x,82,8,'#dbe7f0',blue)).join('')+
    line(42,82,48,82)+line(64,82,70,82)+line(86,82,92,82)+arrow(115,82,151,82,rust,2)+
    text(195,27,'Ethane',ink,15)+text(195,50,'C₂H₆',blue,18)+circle(185,82,8,'#dbe7f0',blue)+circle(205,82,8,'#dbe7f0',blue)+line(193,82,197,82)+
    text(268,27,'Ethene',ink,15)+text(268,50,'C₂H₄',blue,18)+circle(258,82,8,'#dbe7f0',blue)+circle(278,82,8,'#dbe7f0',blue)+line(266,79,270,79)+line(266,85,270,85)+
    text(160,130,'C: 4 → 2 + 2',ink,15)+text(160,151,'H: 10 → 6 + 4',ink,15),
    'Count the atoms on both sides. Ethene contains a carbon–carbon double bond; hydrogen atoms are omitted from the structural sketch.');
}
function emSpectrum() {
  const names=['Radio','Microwaves','Infrared','Visible','Ultraviolet','X-rays','Gamma'];
  const colours=['#d9e7f1','#cfdfef','#f1d0c0','#f4dd9a','#e5d5ed','#d8d8e8','#c3d0dc'];
  return fig('The electromagnetic spectrum',
    'From top to bottom, wavelength decreases and frequency increases: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays and gamma rays. All travel at the same speed in a vacuum.',
    names.map((n,i)=>'<rect x="30" y="'+(20+i*28)+'" width="165" height="25" rx="3" fill="'+colours[i]+'" stroke="#687e86"/>'+text(112,38+i*28,n,ink,17)).join('')+
    arrow(227,33,227,205,blue,2)+text(271,85,'Frequency',blue,15)+text(271,103,'increases',blue,15)+
    arrow(303,205,303,33,rust,2)+text(271,154,'Wavelength',rust,15)+text(271,172,'increases',rust,15),
    'Read down the bands for increasing frequency. Their displayed sizes are illustrative, not to scale.',225);
}
function highLightExperiment() {
  return fig('Testing a limiting factor',
    'A lamp illuminates pondweed in water. Gas collects in an inverted measuring cylinder. Compare oxygen collected per minute at two carbon dioxide supplies, keeping light, temperature and the pondweed the same.',
    '<path d="M33 90 H92 L80 54 H45 Z" fill="#ffe5ae" stroke="'+rust+'" stroke-width="2"/>'+line(62,90,62,134)+line(37,135,87,135)+
    arrow(100,82,153,95,rust,2)+text(63,30,'Lamp',ink,14)+
    '<path d="M160 82 H286 V153 H160 Z" fill="#dbeef4"/>'+
    '<path d="M158 47 V155 H288 V47 M208 98 V19 H257 V98" fill="none" stroke="'+ink+'" stroke-width="2"/>'+
    '<path d="M200 147 Q214 120 211 105 M212 123 Q190 114 192 105 M211 117 Q230 109 229 97" fill="none" stroke="'+teal+'" stroke-width="3"/>'+
    circle(222,87,3,'white',blue)+circle(230,74,3,'white',blue)+text(241,15,'Gas',blue,14)+text(225,177,'Pondweed',teal,14),
    'Collect oxygen per minute. Change carbon dioxide supply while keeping other factors the same.');
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
    '<path d="M22 49 Q56 20 88 49 Q80 73 40 71 Z" fill="#efc7b7" stroke="'+rust+'" stroke-width="2"/>'+text(56,27,'Type 1',ink,15)+text(56,102,'Too little',rust,14)+text(56,119,'insulin',rust,14)+
    '<path d="M170 49 Q204 20 236 49 Q228 73 188 71 Z" fill="#efc7b7" stroke="'+rust+'" stroke-width="2"/>'+text(205,27,'Type 2',ink,15)+circle(238,84,4,blue,blue)+circle(249,84,4,blue,blue)+
    '<circle cx="280" cy="83" r="27" fill="#dceee5" stroke="'+teal+'" stroke-width="2"/>'+text(280,88,'Cell',teal,14)+text(238,130,'Reduced cell response',ink,14),
    'Compare the source of insulin with the response of the body cells. Real patients have varied symptoms and treatments.',150);
}
function waterTreatment() {
  return fig('Drinking water and pure water',
    'Water suitable for drinking is not necessarily pure water. It can contain dissolved substances at acceptable concentrations; harmful substances and microbes must be at safe levels.',
    '<rect x="37" y="26" width="105" height="118" rx="5" fill="#dceff5" stroke="'+blue+'" stroke-width="2"/>'+text(89,165,'Potable water',ink,14)+
    [[57,56],[83,44],[115,67],[70,91],[106,120]].map(([x,y])=>circle(x,y,5,'#c9e4f3',blue)).join('')+circle(92,79,3,rust,rust)+circle(61,122,3,rust,rust)+
    '<rect x="179" y="26" width="105" height="118" rx="5" fill="#dceff5" stroke="'+blue+'" stroke-width="2"/>'+text(231,165,'Pure water',ink,14)+
    [[198,56],[224,44],[256,67],[211,91],[247,120]].map(([x,y])=>circle(x,y,5,'#c9e4f3',blue)).join('')+
    text(160,20,'Key: ● dissolved substance',rust,13),
    'Compare the dissolved particles. The diagram is a model and does not show actual concentrations.');
}
export function heatingCurve() {
  return fig('Heating ice and water',
    'As energy is supplied ice warms to 0 degrees Celsius. At 0 degrees Celsius the temperature stays constant while the ice melts. After melting the liquid water warms. The example assumes ordinary atmospheric pressure.',
    line(45,150,291,150,ink,2)+line(45,150,45,35,ink,2)+line(40,95,291,95,'#8b9d9c',1,'5 4')+
    '<polyline points="55,140 115,95 205,95 275,43" fill="none" stroke="'+teal+'" stroke-width="3.5"/>'+
    text(45,22,'Temperature (°C)',ink,15,'start')+text(37,100,'0',ink,14,'end')+text(171,91,'Melting',teal,14)+text(166,182,'Energy supplied (arbitrary units)',ink,14),
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
    text(160,178,'Start : finish = 4 : 1',ink,16),
    'Halve the remaining activity twice, then compare the first and final activity.');
}
function reactionBonds() {
  return fig('Energy and chemical bonds',
    'In this example hydrogen and chlorine molecules form hydrogen chloride. Energy is taken in to break bonds in the reactants, and energy is released when new bonds form in the products.',
    circle(44,53,9,'#d9e8f5',blue)+circle(70,53,9,'#d9e8f5',blue)+line(53,53,61,53)+text(57,81,'H₂',blue,15)+
    circle(110,53,9,'#d9eee2',teal)+circle(136,53,9,'#d9eee2',teal)+line(119,53,127,53)+text(123,81,'Cl₂',teal,15)+
    arrow(151,53,189,53,rust,2)+circle(214,53,9,'#d9e8f5',blue)+circle(240,53,9,'#d9eee2',teal)+line(223,53,231,53)+
    circle(263,53,9,'#d9e8f5',blue)+circle(289,53,9,'#d9eee2',teal)+line(272,53,280,53)+text(252,81,'2 HCl',ink,15)+
    arrow(90,110,90,136,rust,2)+text(90,161,'Breaking: energy in',rust,14)+arrow(238,136,238,110,blue,2)+text(238,161,'Forming: energy out',blue,14),
    'Compare energy needed to break reactant bonds with energy released as product bonds form. Atom counts are conserved.');
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
    text(160,127,'2 mol : 1 mol : 2 mol',ink,16)+text(160,151,'Compare amounts, not masses',ink,14),
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
function saltsApparatus() {
  return fig('Making soluble salt crystals',
    'Copper oxide is added in excess to warm sulfuric acid. The mixture is filtered to remove excess solid. The copper sulfate solution is evaporated to concentrate it and cooled to crystallise.',
    '<path d="M18 50 H90 L84 117 H25 Z" fill="#d8edf1" stroke="'+ink+'" stroke-width="2"/>'+circle(41,88,3,ink,ink)+circle(57,100,3,ink,ink)+circle(70,88,3,ink,ink)+text(54,35,'Excess oxide',ink,13)+
    arrow(96,84,127,84,rust,2)+'<path d="M130 48 H187 L164 78 V113 H153 V78 Z" fill="#edf5ee" stroke="'+ink+'" stroke-width="2"/>'+line(139,62,178,62,teal,2)+text(159,35,'Filter',ink,14)+
    arrow(192,84,218,84,rust,2)+'<path d="M223 89 Q253 115 283 89 M226 89 H280" fill="#d8edf1" stroke="'+ink+'" stroke-width="2"/>'+text(253,35,'Evaporate',ink,14)+text(253,143,'then cool',ink,14),
    'Follow the excess solid through filtration and the solution through concentration and cooling.');
}
function rulerDrop() {
  return fig('A ruler-drop test',
    'A ruler is held vertically, with its zero level at the upper edges of an open thumb and finger. It is released without warning; the distance at the top of the fingers when caught is read.',
    '<rect x="118" y="12" width="26" height="130" fill="#fff2d7" stroke="'+ink+'" stroke-width="2"/>'+
    Array.from({length:9},(_,i)=>line(129,20+i*13,143,20+i*13,ink,1)).join('')+
    '<path d="M61 106 Q75 90 98 97 L116 104 M180 106 Q165 90 153 97 L145 104" fill="none" stroke="'+rust+'" stroke-width="5"/>'+
    line(115,105,144,105,teal,2,'4 3')+text(132,165,'Read at finger level',ink,14)+arrow(183,38,183,82,blue,2)+text(213,29,'Release',blue,14),
    'Align zero at the fingers before release; read the distance at the same level on catching.');
}
function brine() {
  return fig('Electrolysis of brine',
    'In concentrated aqueous sodium chloride, sodium ions and hydrogen-containing species are present. Hydrogen forms at the negative electrode rather than sodium. Chlorine forms at the positive electrode.',
    '<path d="M36 48 V139 H284 V48" fill="none" stroke="'+ink+'" stroke-width="2"/><path d="M38 72 H282 V137 H38 Z" fill="#deeff3"/>'+
    '<rect x="79" y="43" width="12" height="70" fill="#70848b"/><rect x="229" y="43" width="12" height="70" fill="#70848b"/>'+
    text(85,29,'−',blue,21)+text(235,29,'+',rust,21)+text(85,161,'Hydrogen',blue,14)+text(235,161,'Chlorine',rust,14)+
    circle(127,89,12,'#e7ecf9',blue)+text(127,94,'Na⁺',blue,13)+text(185,110,'water',ink,14)+arrow(160,105,98,105,blue,2)+
    text(160,136,'Sodium ions remain in solution',ink,13),
    'Water is present in brine: hydrogen is produced at the negative electrode instead of sodium. The diagram represents concentrated solution.');
}
function reflexMeasure(){return rulerDrop();}
function treatmentTesting() {
  const person=x=>circle(x,100,5,'#d7e9ef',blue)+'<path d="M'+x+' 105 v17 m-7-9 h14 m-7 9 -6 9 m6-9 6 9" stroke="'+blue+'" stroke-width="2" fill="none"/>';
  return fig('Stages in testing a medicine',
    'Potential medicines may first be tested using cells, tissues and animals as appropriate. Clinical testing starts with safety and dose in smaller groups and progresses to larger comparisons of effectiveness, often with controls.',
    circle(45,82,14,'#d4ecde',teal)+circle(71,92,14,'#d4ecde',teal)+text(58,132,'Cells / tissue',ink,13)+
    arrow(91,85,126,85,rust,2)+'<ellipse cx="149" cy="93" rx="19" ry="12" fill="#e4e5ea" stroke="'+ink+'"/>'+circle(164,83,6,'#e4e5ea',ink)+text(150,132,'Animals*',ink,13)+
    arrow(174,85,200,85,rust,2)+person(215)+person(238)+person(261)+person(284)+text(249,151,'Clinical trials',ink,13),
    'Follow the progression towards human trials. *Animal studies are used where appropriate; each stage has its own purpose.',170);
}
function respiratoryComparison() {
  return fig('Aerobic and anaerobic respiration',
    'Aerobic respiration uses glucose and oxygen and produces carbon dioxide and water. In the GCSE muscle model anaerobic respiration produces lactic acid. Yeast anaerobic respiration produces ethanol and carbon dioxide.',
    text(18,27,'Aerobic',ink,15,'start')+text(18,51,'Glucose + oxygen',blue,15,'start')+arrow(157,46,190,46,teal,2)+text(198,51,'CO₂ + water',teal,15,'start')+
    line(16,67,304,67,'#aabebc',1)+text(18,90,'Anaerobic in muscle',ink,15,'start')+text(18,115,'Glucose',blue,15,'start')+arrow(94,110,147,110,rust,2)+text(157,115,'Lactic acid',rust,15,'start')+
    line(16,128,304,128,'#aabebc',1)+text(18,151,'Anaerobic in yeast',ink,15,'start')+text(18,176,'Glucose',blue,15,'start')+arrow(94,171,147,171,rust,2)+text(157,176,'Ethanol + CO₂',rust,15,'start'),
    'Compare the inputs and products. Anaerobic respiration transfers less energy per glucose than aerobic respiration.',195);
}
function menstrualHormones() {
  return fig('Hormones act on target organs',
    'The pituitary gland releases FSH and LH into the blood. FSH supports follicle maturation; a surge of LH triggers ovulation. The ovary releases oestrogen and progesterone, which act on the uterus lining.',
    circle(130,33,22,'#e1e6f7',blue)+text(130,38,'P',ink,16)+text(177,38,'Pituitary',ink,15,'start')+
    arrow(130,57,130,85,blue,2)+text(68,74,'FSH and LH',blue,15)+
    '<ellipse cx="130" cy="111" rx="28" ry="20" fill="#f3d6ce" stroke="'+rust+'" stroke-width="2"/>'+circle(130,111,7,'#f6eee1',rust)+text(177,116,'Ovary',ink,15,'start')+
    arrow(130,133,130,160,teal,2)+text(5,147,'Oestrogen',teal,14,'start')+text(5,165,'and progesterone',teal,14,'start')+
    '<path d="M109 166 Q110 193 130 201 Q150 193 151 166 L140 174 L130 183 L120 174 Z" fill="#f4d2cc" stroke="'+rust+'" stroke-width="2"/>'+text(177,188,'Uterus',ink,15,'start'),
    'Follow each hormone from its source to a target. The organ sketches are simplified.',215);
}

function antibioticTargets() {
  return fig('Why antibiotics do not treat viruses',
    'A bacterium has its own cell structures, including a cell wall and ribosomes. A virus has genetic material in a protein coat and uses a host cell to reproduce. Some antibiotics target bacterial cell structures; viruses do not have these bacterial targets.',
    '<rect x="34" y="43" width="95" height="54" rx="26" fill="#dceee6" stroke="'+teal+'" stroke-width="3"/>'+circle(62,65,4,blue,blue)+circle(81,76,4,blue,blue)+circle(105,63,4,blue,blue)+text(81,122,'Bacterium',ink,15)+
    '<path d="M229 36 L254 50 V82 L229 97 L204 82 V50 Z" fill="#e1e8f7" stroke="'+blue+'" stroke-width="3"/>'+
    '<path d="M217 64 q7-10 14 0 t14 0" fill="none" stroke="'+rust+'" stroke-width="2"/>'+text(229,122,'Virus',ink,15)+
    arrow(80,17,80,40,rust,2)+text(80,12,'Some antibiotics',rust,13)+text(229,154,'Needs host cells',ink,14),
    'Compare the bacterial cell with the virus. Antibiotics work against susceptible bacteria, not viral infections. The models are not to scale.');
}
function naturalSelection() {
  const moth=(x,y,dark)=>'<path d="M'+x+' '+y+' l-11 -7 v14 z M'+x+' '+y+' l11 -7 v14 z" fill="'+(dark?'#374b50':'#f0e4c9')+'" stroke="#283e43" stroke-width="1.5"/>';
  return fig('Variation and natural selection',
    'On dark bark, some moths have dark wings and some have light wings. If predators find the light moths more often, more dark moths may survive and reproduce. Their offspring can inherit the dark variant, so its frequency can increase over generations.',
    '<rect x="14" y="32" width="130" height="98" rx="5" fill="#6d675e"/><rect x="176" y="32" width="130" height="98" rx="5" fill="#6d675e"/>'+
    moth(43,59,true)+moth(77,59,false)+moth(112,59,true)+moth(43,100,false)+moth(77,100,true)+moth(112,100,false)+
    moth(205,59,true)+moth(241,59,true)+moth(277,59,false)+moth(205,100,true)+moth(241,100,true)+moth(277,100,true)+
    arrow(146,81,174,81,rust,2)+text(79,23,'Variation',ink,15)+text(241,23,'Later generation',ink,15)+text(160,159,'Differential survival and reproduction',ink,14),
    'Compare the inherited wing colours. The example is illustrative, not a record of real population counts.');
}
function selectiveBreeding() {
  const parent=(x,y,dark)=>circle(x,y,13,dark?'#5b7366':'#e0edd7',teal,2)+line(x,y+13,x,y+25,teal,2)+line(x,y+18,x-9,y+13,teal,2)+line(x,y+18,x+9,y+13,teal,2);
  return fig('Selecting parents for breeding',
    'People select two parent plants with a desired inherited characteristic and breed them. Some offspring inherit the trait, and selected offspring can be bred again. Natural selection depends on differential survival and reproduction in the environment.',
    parent(55,60,true)+parent(110,60,true)+text(82,28,'Chosen parents',ink,15)+arrow(138,74,180,74,rust,2)+
    parent(210,60,true)+parent(262,60,false)+text(237,28,'Offspring vary',ink,15)+
    '<path d="M197 95 h25" stroke="'+rust+'" stroke-width="3"/>'+arrow(210,106,210,135,rust,2)+text(210,164,'Choose desired offspring',ink,14),
    'Follow the chosen parents to the offspring. Only inherited variation can be passed on through breeding.');
}
function gasTests() {
  return fig('Tests for three gases',
    'Carbon dioxide bubbled through limewater makes it cloudy. Oxygen relights a glowing splint. Hydrogen burns with a squeaky pop when a lit splint is applied.',
    '<path d="M25 35 V70 Q35 82 45 70 V35 M25 59 H45" fill="#e3f0f4" stroke="'+ink+'" stroke-width="2"/>'+circle(35,62,5,'#d2d7da','#d2d7da')+
    text(65,49,'Carbon dioxide',ink,15,'start')+text(65,69,'Limewater turns cloudy',blue,14,'start')+
    '<path d="M25 98 V133 Q35 145 45 133 V98" fill="none" stroke="'+ink+'" stroke-width="2"/>'+line(35,92,35,113,rust,3)+circle(35,109,4,'#eeb875',rust)+
    text(65,111,'Oxygen',ink,15,'start')+text(65,131,'Glowing splint relights',rust,14,'start')+
    '<path d="M25 160 V195 Q35 207 45 195 V160" fill="none" stroke="'+ink+'" stroke-width="2"/>'+line(35,153,35,169,rust,3)+text(43,159,'✦',rust,16)+
    text(65,173,'Hydrogen',ink,15,'start')+text(65,193,'Lit splint: squeaky pop',rust,14,'start'),
    'Match each test to its observation. These sketches are simplified; carry out gas tests only using the practical guidance provided.',220);
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
export const gcseHigherVisuals = {
  'decay-half-life': halfLifeRatio,
  'reaction-profiles': reactionBonds,
  'salts-and-reactivity': acidStrength,
  'mass-conservation': molarRatio,
  'salt-electrolysis': electrolysisReduction
};
export const moreGcseStepVisuals = {
  'greenhouse': {0:greenhouse},
  'potable-water': {0:waterTreatment,1:filtration},
  'food-web-change': {2:quadrat},
  'circuit-resistance': {0:circuitMeters},
  'radiation-types': {0:emissions,1:shield},
  'wave-motion': {1:wavelength,2:waveCompare},
  'forces-motion': {2:stopping},
  'reaction-profiles': {2:temperaturePractical},
  'decay-half-life': {2:irradiation},
  'density-and-gas-pressure': {0:density},
  'crude-oil': {2:alkene},
  'electromagnetic-spectrum': {0:emSpectrum,1:emSpectrum},
  'photosynthesis-limits': {2:highLightExperiment},
  'glucose-control': {0:homeostasis,2:diabetes},
  'reaction-rate': {1:collisionFrequency,2:dynamicEquilibrium},
  'salts-and-reactivity': {1:saltsApparatus},
  'salt-electrolysis': {2:brine},
  'reflex-response': {0:neuron,1:reflexWithSynapse,2:reflexMeasure},
  'respiration-exercise': {0:respiratoryComparison,1:respiratoryComparison},
  'reproductive-hormones': {0:menstrualHormones,1:menstrualHormones},
  'latent-heat': {0:heatParticles},
  'vaccine-memory': {2:antibioticTargets},
  'prevention-and-medicines': {1:antibioticTargets,2:treatmentTesting},
  'selection-and-variation': {0:naturalSelection,1:naturalSelection,2:selectiveBreeding},
  'inheritance-cross': {2:naturalSelection},
  'chromatography': {2:gasTests}
};

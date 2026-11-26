// Original teaching schematics. Positions, sizes and colours are illustrative.
import { arrow, blue, circle, diagram, ink, line, node, picture, rust, teal, text } from './catchup-models.js';
import { gcseStepVisuals } from './gcse-step-visuals.js';
import { photo } from './catchup-photos.js';
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
    'Reaction time affects thinking distance; tyre grip affects braking distance. Add the two distances to find the total.');
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
    'Compare the inputs and products. If oxygen supply cannot meet demand, muscle cells can also respire anaerobically, transferring less energy per glucose.',195);
}
function menstrualHormones() {
  return fig('Hormones act on target organs',
    'The pituitary gland releases FSH and LH into the blood. FSH supports follicle maturation; a surge of LH triggers ovulation. The ovary releases oestrogen and progesterone, which act on the uterus lining.',
    circle(130,33,22,'#e1e6f7',blue)+text(130,38,'P',ink,16)+text(177,38,'Pituitary',ink,15,'start')+
    arrow(130,57,130,85,blue,2)+text(7,68,'FSH: maturation',blue,13,'start')+text(7,86,'LH: ovulation',blue,13,'start')+
    '<ellipse cx="130" cy="111" rx="28" ry="20" fill="#f3d6ce" stroke="'+rust+'" stroke-width="2"/>'+circle(130,111,7,'#f6eee1',rust)+text(177,116,'Ovary',ink,15,'start')+
    arrow(130,133,130,160,teal,2)+text(5,147,'Oestrogen',teal,14,'start')+text(5,165,'and progesterone',teal,14,'start')+
    '<path d="M109 166 Q110 193 130 201 Q150 193 151 166 L140 174 L130 183 L120 174 Z" fill="#f4d2cc" stroke="'+rust+'" stroke-width="2"/>'+text(177,188,'Uterus',ink,15,'start')+text(177,206,'lining',ink,14,'start'),
    'Follow hormones carried in blood from their source to a target. Oestrogen helps rebuild the uterus lining; progesterone helps maintain it. The organ sketches are simplified.',225);
}


function physicalBarriers() {
  return fig('Skin and mucus as barriers',
    'Intact skin forms a physical barrier that prevents many pathogens entering the body. In the airways, mucus traps pathogens; cilia help move mucus out of the airways.',
    text(76,25,'Intact skin',ink,15)+circle(48,48,6,'#b8cfed',blue)+circle(79,48,6,'#b8cfed',blue)+circle(111,48,6,'#b8cfed',blue)+
    '<rect x="16" y="65" width="120" height="33" fill="#efd4bf" stroke="'+rust+'" stroke-width="2"/>'+text(76,128,'Barrier',rust,14)+
    text(239,25,'Airway mucus',ink,15)+'<rect x="179" y="66" width="120" height="30" fill="#dcece5" stroke="'+teal+'" stroke-width="2"/>'+
    circle(201,77,6,'#b8cfed',blue)+circle(236,84,6,'#b8cfed',blue)+circle(274,76,6,'#b8cfed',blue)+arrow(197,108,282,108,teal,2)+text(239,128,'Traps pathogens',teal,14),
    'Compare intact skin blocking entry with mucus trapping pathogens. The sketches are simplified.',145);
}
function barriersAndAntibodies(){return grouped(physicalBarriers,gcseStepVisuals['vaccine-memory'][0]);}
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
    text(229,46,'3 g solute',ink,15)+text(229,77,'÷ 0.20 dm³',blue,15)+text(229,112,'= 15 g/dm³',teal,16),
    'Divide the solute mass by the total solution volume in dm³. The dots represent dissolved solute, not actual concentration.');
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
    '<path d="M57 26 Q47 16 59 10 Q72 8 73 22" fill="none" stroke="'+ink+'" stroke-width="2"/>'+arrow(80,59,130,59,rust,2)+text(103,43,'CO₂',rust,16)+text(47,152,'Fuel burning',ink,14)+
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
    '<path d="M18 83 l22-37 22 37 Z" fill="#dbe6df" stroke="'+teal+'" stroke-width="2"/>'+text(40,109,'Materials',ink,13)+arrow(66,74,91,74,rust,2)+
    '<path d="M95 83 V51 l16 8 V48 l17 10 V83 Z" fill="#dce6ec" stroke="'+blue+'" stroke-width="2"/>'+text(111,109,'Make',ink,13)+arrow(134,74,160,74,rust,2)+
    '<path d="M177 43 H193 V54 H200 V89 H170 V54 H177 Z" fill="#def0ec" stroke="'+teal+'" stroke-width="2"/>'+text(185,109,'Use',ink,13)+arrow(207,74,231,74,rust,2)+
    '<path d="M253 45 C277 45 282 76 269 87 M269 87 l-2 -11 M269 87 l10 -4 M255 89 C231 89 226 58 239 47 M239 47 l2 10 M239 47 l-10 4" fill="none" stroke="'+teal+'" stroke-width="3"/>'+text(256,109,'End of life',ink,13)+
    text(160,150,'Transport and reuse affect the comparison',ink,14),
    'Follow the product from materials to its end of life. Compare the same stages and assumptions for both products.');
}
function reverseCoil() {
  const coil=(y,left,right)=>'<rect x="63" y="'+(y-12)+'" width="190" height="24" rx="5" fill="#e2e9e9" stroke="'+ink+'"/>'+[88,115,142,169,196,223].map(x=>'<ellipse cx="'+x+'" cy="'+y+'" rx="9" ry="19" fill="none" stroke="'+rust+'" stroke-width="2"/>').join('')+text(56,y+5,left,blue,17)+text(264,y+5,right,blue,17);
  return fig('Reversing an electromagnet',
    'With a fixed winding, reversing the current reverses the direction of the magnetic field: the north and south poles of the coil swap.',
    text(160,20,'Current in one direction',ink,15)+coil(57,'N','S')+arrow(99,94,220,94,blue,2)+
    text(160,125,'Current reversed',ink,15)+coil(162,'S','N')+arrow(220,198,99,198,blue,2),
    'Compare the pole labels and external field arrows. In this schematic the winding remains fixed while the current reverses.',215);
}
function ironCore() {
  return fig('Soft iron in an electromagnet',
    'A coil around soft iron produces a stronger electromagnet when current flows. When the current is switched off, the coil field disappears and soft iron loses most of its induced magnetisation, allowing a load to be released.',
    '<rect x="65" y="47" width="180" height="25" fill="#bccacd" stroke="'+ink+'"/>'+[91,116,141,166,191,216].map(x=>'<ellipse cx="'+x+'" cy="59" rx="8" ry="20" fill="none" stroke="'+rust+'" stroke-width="2"/>').join('')+
    text(155,25,'Current on',ink,15)+text(155,103,'Soft iron core',ink,14)+
    '<path d="M110 133 V167 M142 133 V167 M174 133 V167 M206 133 V167" stroke="'+blue+'" stroke-width="5"/>'+text(155,194,'Attracts iron objects',blue,14),
    'The core strengthens the field while current flows. Soft iron loses most induced magnetisation after switching off.',210);
}
function sulfateSalt() {
  return fig('Naming copper sulfate',
    'Sulfuric acid reacts with copper oxide to form copper sulfate and water. Sulfuric acid supplies the sulfate part of the salt, and copper oxide supplies copper.',
    text(16,40,'Sulfuric acid',blue,15,'start')+text(16,65,'H₂SO₄',blue,17,'start')+text(151,65,'+',ink,18)+text(175,40,'Copper oxide',rust,15,'start')+text(175,65,'CuO',rust,17,'start')+
    arrow(160,82,160,107,teal,2)+text(17,138,'Copper sulfate',teal,15,'start')+text(17,163,'CuSO₄',teal,17,'start')+text(175,138,'and water',ink,15,'start')+text(175,163,'H₂O',ink,17,'start'),
    'Match copper from copper oxide and sulfate from sulfuric acid to the name of the soluble salt.',180);
}
function xray() {
  return fig('X-rays and body tissue',
    'X-rays passing through the body are absorbed by different amounts in different tissues. Bone absorbs more X-rays than soft tissue, so fewer X-rays reach the detector behind bone. X-rays are ionising radiation.',
    text(46,22,'X-ray source',ink,14)+arrow(38,49,137,49,blue,2)+arrow(38,68,137,68,blue,2)+arrow(38,82,137,82,blue,2)+arrow(38,101,137,101,blue,2)+
    '<rect x="140" y="33" width="55" height="90" rx="14" fill="#ecd8cf" stroke="'+rust+'" stroke-width="2"/><rect x="157" y="43" width="18" height="70" rx="8" fill="#f7f4e8" stroke="'+ink+'" stroke-width="2"/>'+
    arrow(196,49,250,49,blue,2)+arrow(196,68,250,68,blue,2)+arrow(196,101,250,101,blue,2)+'<rect x="257" y="33" width="15" height="90" fill="#9aaeb6"/>'+text(168,147,'Bone within tissue',ink,14)+text(264,166,'Detector',ink,13),
    'Compare the X-rays reaching the detector where bone and soft tissue lie. This is an illustrative model, not a radiograph.',180);
}
function transmission() {
  return fig('Different infection routes',
    'Measles can spread in droplets from an infected person. Malaria is caused by a protist transmitted by a mosquito. Salmonella bacteria can spread in contaminated food.',
    circle(27,35,9,'#efd1bd',rust)+circle(67,35,9,'#efd1bd',rust)+circle(42,35,2,blue,blue)+circle(51,35,2,blue,blue)+text(90,40,'Measles: droplets',ink,15,'start')+
    '<ellipse cx="35" cy="86" rx="13" ry="6" fill="#ccd9db" stroke="'+ink+'"/><path d="M25 86 l-10 -12 M45 86 l10 -12 M25 90 l-10 12 M45 90 l10 12" stroke="'+ink+'" stroke-width="1.5"/>'+text(90,92,'Malaria: mosquito',ink,15,'start')+
    '<path d="M20 146 H55 L49 161 H26 Z" fill="#edc89f" stroke="'+rust+'" stroke-width="2"/><path d="M23 146 Q37 132 52 146" fill="#dce9cf" stroke="'+teal+'" stroke-width="2"/>'+text(90,153,'Salmonella: food',ink,15,'start'),
    'Match each pathogen to a route so that prevention can interrupt transmission.',180);
}
function alphaDecay() {
  return fig('An example of alpha decay',
    'A uranium-238 nucleus with atomic number 92 emits an alpha particle containing two protons and two neutrons. The remaining thorium nucleus has mass number 234 and atomic number 90.',
    circle(65,75,34,'#dfe7f4',blue)+text(65,68,'U',blue,21)+text(65,89,'238 / 92',ink,13)+arrow(104,75,144,75,rust,2)+
    circle(190,75,30,'#e0efe5',teal)+text(190,69,'Th',teal,18)+text(190,88,'234 / 90',ink,13)+text(229,80,'+',ink,18)+
    circle(265,75,18,'#f3d8c9',rust)+text(265,80,'α',rust,16)+
    text(160,145,'Mass: 238 = 234 + 4',ink,15)+text(160,168,'Protons: 92 = 90 + 2',ink,15),
    'Compare the mass numbers and proton numbers before and after emission. The nuclei are simplified models.',185);
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
    text(78,137,'Sperm',blue,14)+text(125,137,'Egg',rust,14)+
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

function pondweedLight() {
  return fig('Testing light and pondweed',
    'A lamp illuminates pondweed in water, and gas collects in an inverted measuring cylinder. Change the lamp distance and compare oxygen collected in equal times. Keep the plant, carbon dioxide supply and temperature the same.',
    '<path d="M33 90 H92 L80 54 H45 Z" fill="#ffe5ae" stroke="'+rust+'" stroke-width="2"/>'+line(62,90,62,134)+line(37,135,87,135)+
    arrow(100,82,153,95,rust,2)+text(63,30,'Lamp',ink,14)+
    '<path d="M160 82 H286 V153 H160 Z" fill="#dbeef4"/>'+
    '<path d="M158 47 V155 H288 V47 M208 98 V19 H257 V98" fill="none" stroke="'+ink+'" stroke-width="2"/>'+
    '<path d="M200 147 Q214 120 211 105 M212 123 Q190 114 192 105 M211 117 Q230 109 229 97" fill="none" stroke="'+teal+'" stroke-width="3"/>'+
    circle(222,87,3,'white',blue)+circle(230,74,3,'white',blue)+text(241,15,'Gas',blue,14)+text(225,177,'Pondweed',teal,14),
    'Change lamp distance and compare oxygen volume per minute. Keep carbon dioxide supply and temperature the same.');
}
function circulation() {
  return fig('Oxygen from lungs to working muscle',
    'The right ventricle pumps blood to lung capillaries, where oxygen diffuses into blood and binds to haemoglobin. Blood returns to the left atrium, then left ventricle, and is pumped to muscle capillaries. Oxygen diffuses from blood into muscle cells.',
    '<path d="M126 18 Q111 23 109 54 Q117 68 140 59 L140 30 Z M180 18 Q195 23 197 54 Q189 68 166 59 L166 30 Z" fill="#e2f2f3" stroke="'+teal+'" stroke-width="2"/>'+text(153,83,'Lungs: oxygen in',teal,14)+
    '<rect x="90" y="101" width="126" height="57" rx="8" fill="#f5dfda" stroke="'+rust+'" stroke-width="2"/>'+line(153,101,153,158,rust,1)+text(122,124,'Right',ink,14)+text(122,143,'ventricle',ink,13)+text(185,124,'Left',ink,14)+text(185,143,'heart',ink,14)+
    arrow(100,101,99,43,blue,2)+arrow(208,45,208,99,rust,2)+arrow(186,160,186,193,rust,2)+
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
function circulationWithMicrograph(){return grouped(circulation,bloodMicrograph);}
function faultPath() {
  return fig('A fault to an earthed metal case',
    'If a live wire touches an earthed metal case, current can flow through the low-resistance earth wire back towards the supply. The large fault current causes a correctly rated fuse or circuit breaker to disconnect the circuit.',
    text(47,25,'Live',rust,16)+line(18,48,103,48,rust,4)+'<rect x="103" y="34" width="48" height="29" rx="4" fill="#f5e6dc" stroke="'+rust+'" stroke-width="2"/>'+text(127,54,'Fuse',rust,14)+
    line(151,48,181,48,rust,4)+'<path d="M181 34 H283 V125 H181 Z" fill="#e6eeee" stroke="'+ink+'" stroke-width="3"/>'+text(232,72,'Metal case',ink,14)+circle(184,49,5,rust,rust)+text(237,96,'Fault contact',rust,13)+
    '<path d="M230 125 V151 H65" fill="none" stroke="'+teal+'" stroke-width="4"/>'+arrow(189,151,92,151,teal,2)+text(108,176,'Earth wire to supply',teal,14),
    'Follow the fault path through the earth connection. The diagram shows the fault path only; the fuse or breaker then disconnects the supply.',190);
}
function magnesiumParticles() {
  const mg=(x,y)=>circle(x,y,8,'#d7e8f4',blue); const o=(x,y)=>circle(x,y,8,'#f3d5c8',rust);
  let art=text(80,22,'Reactants',ink,15)+text(244,22,'Products',ink,15);
  for(let i=0;i<6;i++)art+=mg(26+(i%3)*25,50+Math.floor(i/3)*26);
  for(let i=0;i<4;i++)art+=o(24+i*32,115)+o(39+i*32,115);
  for(let i=0;i<6;i++)art+=mg(190+(i%3)*31,50+Math.floor(i/3)*26)+o(205+(i%3)*31,50+Math.floor(i/3)*26);
  art+=o(229,115)+o(244,115)+arrow(119,82,163,82,ink,2)+text(75,154,'6 Mg + 4 O₂',ink,14)+text(246,154,'6 MgO + O₂ left',ink,14)+mg(65,181)+text(81,186,'Mg',blue,14,'start')+o(200,181)+text(216,186,'O',rust,14,'start');
  return fig('A limiting reactant in particles',
    'Six magnesium atoms react with three of four oxygen molecules to form six magnesium oxide units. One oxygen molecule remains. Magnesium is the limiting reactant in this model.',art,
    'Count atoms on each side. Six magnesium atoms use three oxygen molecules, leaving one oxygen molecule.',200);
}
function plantPaths() {
  return fig('Water and sugar transport',
    'Water enters roots and moves upwards in xylem to the leaf. Water vapour leaves the leaf. Sugars made in a mature source leaf are transported in phloem to a sink such as a growing root; phloem movement depends on source and sink.',
    '<path d="M137 53 Q87 15 49 48 Q76 84 137 68 M183 53 Q233 15 271 48 Q244 84 183 68" fill="#d8eddb" stroke="'+teal+'" stroke-width="2"/>'+
    '<rect x="137" y="47" width="46" height="131" fill="#e9efe0" stroke="'+teal+'" stroke-width="2"/><path d="M160 177 Q141 204 112 215 M160 177 Q179 204 208 215" fill="none" stroke="'+teal+'" stroke-width="3"/>'+
    arrow(149,166,149,65,blue,2)+arrow(171,72,171,167,rust,2)+arrow(69,40,49,17,blue,2)+arrow(239,40,259,17,blue,2)+
    text(84,112,'Xylem',blue,15)+text(84,132,'water up',blue,14)+text(239,112,'Phloem',rust,15)+text(239,132,'sugar to',rust,14)+text(239,150,'root sink',rust,14)+text(160,241,'Roots',ink,15),
    'Trace water up the xylem and sugar from the source leaf to a root sink. Phloem direction varies with source and sink.',255);
}
export const gcseWorkedVisuals = {
  'photosynthesis-limits': pondweedLight,
  'respiration-exercise': circulationWithMicrograph,
  'domestic-electricity': faultPath,
  'reacting-masses': magnesiumParticles,
  'plant-transport': plantPaths,
  'quadrat-evidence': quadrat
};

function inverseSquare() {
  return fig('Doubling distance from a point source',
    'At 10 centimetres an illustrative light intensity is one unit. At 20 centimetres, twice the distance from the same point source, the intensity is one quarter of that at 10 centimetres.',
    circle(44,58,18,'#ffe1a2',rust)+text(44,63,'Lamp',rust,13)+arrow(64,58,104,58,rust,2)+text(84,41,'10 cm',ink,14)+
    '<rect x="110" y="33" width="80" height="50" fill="#ecd197" stroke="'+rust+'"/>'+text(257,63,'1',ink,16)+
    circle(44,137,18,'#ffe1a2',rust)+text(44,142,'Lamp',rust,13)+arrow(64,137,144,137,rust,2)+text(104,120,'20 cm',ink,14)+
    '<rect x="145" y="112" width="20" height="50" fill="#ecd197" stroke="'+rust+'"/>'+text(257,142,'¼',ink,16),
    'Compare intensities at twice the distance from the same point source. The bars use an illustrative starting intensity.',180);
}
function glucagonResponse() {
  return fig('Response to low blood glucose',
    'When blood glucose falls the pancreas releases glucagon. Glucagon causes liver glycogen to be converted to glucose and released into the blood. As the glucose concentration recovers, the stimulus for glucagon secretion decreases.',
    text(160,22,'Blood glucose falls',blue,16)+arrow(160,29,160,52,ink,2)+
    '<path d="M96 65 Q160 37 224 65 Q214 91 116 84 Z" fill="#f2d1c4" stroke="'+rust+'" stroke-width="2"/>'+text(160,78,'Pancreas',ink,15)+arrow(160,89,160,112,ink,2)+
    text(160,132,'Glucagon → liver',rust,15)+text(160,154,'Glycogen → glucose',teal,15)+arrow(160,161,160,184,ink,2)+text(160,204,'Blood glucose rises',blue,16),
    'Follow the hormonal signal to the liver and the glucose released to the blood. As glucose recovers, the original stimulus decreases.',220);
}
function dilution() {
  const beaker=(x,top)=>'<path d="M'+x+' 40 V143 H'+(x+90)+' V40" fill="none" stroke="'+ink+'" stroke-width="2"/><path d="M'+(x+2)+' '+top+' H'+(x+88)+' V141 H'+(x+2)+' Z" fill="#dceef5"/>';
  return fig('Dilution conserves solute',
    'One hundred cubic centimetres of a 30 grams per cubic decimetre solution contains 3 grams of solute. Diluting to 250 cubic centimetres without loss leaves 3 grams of solute in 0.250 cubic decimetres, giving 12 grams per cubic decimetre.',
    beaker(15,104)+circle(37,121,4,rust,rust)+circle(60,128,4,rust,rust)+circle(83,120,4,rust,rust)+
    arrow(111,85,185,85,teal,2)+text(148,70,'Add water',teal,14)+
    beaker(210,53)+circle(232,91,4,rust,rust)+circle(255,112,4,rust,rust)+circle(279,72,4,rust,rust)+
    text(60,165,'100 cm³',ink,14)+text(255,165,'250 cm³',ink,14)+text(160,193,'3 g solute throughout',ink,15)+text(160,217,'3 ÷ 0.250 = 12 g/dm³',blue,15),
    'Compare the same solute amount in a larger total volume. The dots are a model, not the real number of particles.',235);
}
function momentum() {
  return fig('Momentum in a closed system',
    'A 1 kilogram trolley moving right at 2 metres per second meets a stationary 1 kilogram trolley. If they stick, the 2 kilogram pair moves right at 1 metre per second. Total momentum is 2 kilogram metres per second before and after.',
    text(160,23,'Before',ink,15)+
    '<rect x="30" y="41" width="64" height="30" fill="#dcebf4" stroke="'+blue+'"/><rect x="184" y="41" width="64" height="30" fill="#f2dfd2" stroke="'+rust+'"/>'+text(62,61,'1 kg',ink,14)+text(216,61,'1 kg',ink,14)+arrow(97,55,170,55,blue,2)+text(133,42,'2 m/s',blue,13)+
    text(160,103,'After sticking',ink,15)+'<rect x="77" y="117" width="128" height="30" fill="#dfebe5" stroke="'+teal+'"/>'+text(140,137,'2 kg',ink,14)+arrow(209,132,246,132,teal,2)+text(257,120,'1 m/s',teal,13)+
    text(160,177,'2 kg m/s before = 2 kg m/s after',ink,14),
    'Compare total momentum before and after the collision. The example assumes a closed system.',195);
}
function equilibriumHeating() {
  return fig('Temperature and equilibrium',
    'In this example the forward reaction is exothermic, transferring energy to the surroundings; the reverse reaction is endothermic. Increasing temperature favours the endothermic reverse reaction, decreasing the equilibrium yield of product.',
    circle(45,70,10,'#c8e0f0',blue)+circle(71,70,10,'#c8e0f0',blue)+text(58,105,'Reactants',blue,14)+
    arrow(98,56,207,56,rust,2)+text(154,41,'Forward: exothermic',rust,13)+
    arrow(207,87,98,87,teal,4)+text(154,118,'Reverse: endothermic',teal,13)+
    circle(240,70,10,'#efcfbf',rust)+circle(260,70,10,'#efcfbf',rust)+text(250,105,'Product',rust,14)+
    text(160,156,'Heating favours the reverse reaction',ink,14),
    'The thicker arrow shows the favoured direction as the system responds. At the new equilibrium, both reaction rates are equal again.',175);
}
function velocityArea() {
  return fig('Distance from a velocity–time graph',
    'A trolley accelerates uniformly from 0 to 4 metres per second in 2 seconds, then continues at 4 metres per second until 5 seconds. The triangular area is 4 metres; the rectangular area is 12 metres. Total distance is 16 metres.',
    '<path d="M44 146 L132 52 H264 V146 Z" fill="#d9eee6" stroke="none"/><path d="M44 146 L132 52 H264" fill="none" stroke="'+teal+'" stroke-width="3"/>'+line(44,146,285,146)+line(44,146,44,32)+line(132,146,132,52,ink,1,'5 4')+
    text(44,20,'Velocity (m/s)',ink,14,'start')+text(35,151,'0',ink,13,'end')+text(35,57,'4',ink,13,'end')+text(44,165,'0',ink,13)+text(132,165,'2',ink,13)+text(264,165,'5',ink,13)+text(164,189,'Time (s)',ink,14)+
    text(100,129,'4 m',blue,14)+text(199,109,'12 m',blue,14),
    'Add the triangle and rectangle under the velocity–time graph to find the 16 m travelled.',205);
}

function rateTangent() {
  return fig('Rate from a tangent',
    'On a product quantity against time graph, the gradient of a straight tangent touching the curve gives the rate at that instant. A steep tangent means a high rate; here the tangent rises from left to right.',
    line(45,146,288,146)+line(45,146,45,28)+'<path d="M45 140 C120 80 195 60 270 60" fill="none" stroke="'+teal+'" stroke-width="3"/>'+line(75,105,240,50,rust,2)+circle(158,78,4,rust,rust)+
    text(45,18,'Product quantity (arbitrary units)',ink,14,'start')+text(167,174,'Time (arbitrary units)',ink,14)+text(247,39,'Tangent',rust,14),
    'Draw a straight tangent at the point, then calculate its gradient as change in product quantity divided by change in time.',190);
}
function pressureShift() {
  return fig('Pressure and a gas equilibrium',
    'In the illustrative equilibrium nitrogen plus three hydrogen molecules reversibly form two ammonia molecules. For gases at constant temperature, increasing pressure favours the side with fewer gas molecules: the ammonia side.',
    circle(37,57,8,'#bed7ef',blue)+circle(52,57,8,'#bed7ef',blue)+text(45,31,'N₂',blue,15)+text(73,62,'+',ink,17)+
    [100,130,160].map(x=>circle(x,57,6,'#e3e9e9',ink)+circle(x+11,57,6,'#e3e9e9',ink)).join('')+text(135,31,'3 H₂',ink,15)+
    arrow(182,50,213,50,rust,2)+arrow(213,68,182,68,blue,2)+circle(239,57,10,'#c9e6d3',teal)+circle(270,57,10,'#c9e6d3',teal)+text(255,31,'2 NH₃',teal,15)+
    text(84,116,'4 gas molecules',ink,14)+text(244,116,'2 gas molecules',ink,14)+text(160,150,'Higher pressure favours this side →',teal,14),
    'Count gas molecules on each side. Each product circle represents one ammonia molecule; its atomic structure is omitted. Higher pressure favours the side with fewer gas molecules.',170);
}
function rateAndShift(){const group=node('div');group.append(rateTangent(),pressureShift());return group;}
function motorForce() {
  return fig('Force on a current-carrying wire',
    'A wire carries conventional current out of the page, shown by a dot. The magnetic field points from north on the left to south on the right. The force on the wire is upwards. At right angles the force magnitude is magnetic flux density times current times length in the field.',
    text(29,79,'N',blue,20)+text(291,79,'S',blue,20)+arrow(50,40,270,40,blue,2)+text(160,26,'Magnetic field',blue,14)+
    circle(160,91,19,'white',ink)+circle(160,91,4,ink,ink)+arrow(160,69,160,46,rust,2)+text(239,94,'Current out',ink,14)+text(239,111,'of page',ink,14)+text(85,67,'Force',rust,14)+
    text(160,152,'F = B × I × l  (at 90°)',ink,16),
    'Use the conventional current and field directions to find the force. A dot means current out of the page.',170);
}
function coilReversal() {
  function side(x,y,label,out) {
    return circle(x,y,13,'white',ink)+
      (out?circle(x,y,3,ink,ink):line(x-6,y-6,x+6,y+6)+line(x-6,y+6,x+6,y-6))+
      text(x,y+55,label,ink,15);
  }
  return fig('Current reverses after half a turn',
    'At first, side A is left with conventional current out of the page and force upwards; side B is right with current into the page and force downwards. After half a turn, B is left with current out of the page and A is right with current into the page. The commutator swaps each side’s connection, so the direction in each named side reverses and the turning effect stays clockwise.',
    text(160,20,'Before half-turn',ink,15)+side(78,60,'Side A',true)+side(242,60,'Side B',false)+arrow(78,44,78,25,rust,2)+arrow(242,76,242,95,rust,2)+
    text(160,105,'Field: N → S',blue,13)+text(160,125,'After half-turn',ink,15)+side(78,165,'Side B',true)+side(242,165,'Side A',false)+arrow(78,149,78,130,rust,2)+arrow(242,181,242,200,rust,2)+
    text(160,250,'Dot: out of page   ×: into page',ink,14),
    'Follow a named side as the coil turns. The split-ring commutator reverses its current, keeping the turning effect in the same direction.',265);
}
function motorOverview(){const group=node('div');group.append(motorForce(),coilReversal());return group;}
function oxygenDebt() {
  return fig('Lactate after exercise',
    'Blood transports lactic acid from muscle to the liver after exercise. The body needs additional oxygen after exercise to deal with the lactic acid produced.',
    '<path d="M23 57 Q65 35 93 57 Q83 97 23 97 Z" fill="#f1d5cc" stroke="'+rust+'" stroke-width="2"/>'+text(58,122,'Muscle',ink,15)+
    arrow(95,78,205,78,blue,3)+text(150,59,'Blood transports',blue,14)+text(150,101,'lactic acid',blue,14)+
    '<path d="M210 49 Q274 30 297 58 Q302 94 230 99 Q204 91 210 49 Z" fill="#dec5be" stroke="'+rust+'" stroke-width="2"/>'+text(252,123,'Liver',ink,15)+
    text(160,157,'Extra oxygen needed after exercise',ink,14),
    'Follow lactic acid in the blood from muscle to liver. Extra oxygen is required after exercise.',175);
}
function hormoneFeedback() {
  return fig('Hormones and feedback',
    'The pituitary releases FSH and LH, which act on the ovary. Oestrogen and progesterone from the ovary feed back on pituitary hormone release. In fertility treatment FSH and LH can be used to stimulate follicle maturation and ovulation.',
    circle(66,70,32,'#e1e6f7',blue)+text(66,75,'Pituitary',ink,13)+
    '<ellipse cx="247" cy="70" rx="33" ry="24" fill="#f3d6ce" stroke="'+rust+'" stroke-width="2"/>'+circle(247,70,8,'#fff5df',rust)+text(247,115,'Ovary',ink,15)+
    arrow(101,58,211,58,blue,2)+text(156,44,'FSH and LH',blue,14)+arrow(211,88,101,88,teal,2)+text(156,132,'Oestrogen and progesterone',teal,13)+text(156,150,'feed back to pituitary',teal,13),
    'Follow pituitary hormones to the ovary, then the feedback signal in the other direction. Feedback effects vary through the cycle.',170);
}
function transformerComparison() {
  return fig('An ideal step-up transformer',
    'The primary has 500 volts and 12 amperes, so its power is 6,000 watts. An ideal transformer has the same output power; at 3,000 volts the secondary current is 2 amperes. In cables of equal resistance, heating power is proportional to current squared, so 12 amperes gives 36 times the heating of 2 amperes.',
    text(75,25,'Primary',ink,15)+text(245,25,'Secondary',ink,15)+text(75,54,'500 V',blue,16)+text(75,78,'12 A',blue,16)+
    '<path d="M116 44 q10 0 10 10 q0 10 -10 10 M129 44 q10 0 10 10 q0 10 -10 10 M158 44 q-10 0 -10 10 q0 10 10 10 M171 44 q-10 0 -10 10 q0 10 10 10" fill="none" stroke="'+rust+'" stroke-width="3"/>'+text(245,54,'3,000 V',teal,16)+text(245,78,'2 A',teal,16)+
    text(160,112,'6,000 W in = 6,000 W out',ink,15)+text(160,142,'Heating ratio: 12² : 2² = 36 : 1',ink,14),
    'Compare power on both sides of the ideal transformer. At equal cable resistance, compare the squares of the currents.',160);
}
function halfEquations() {
  return fig('Electrode half-equations',
    'Copper ions gain electrons at the negative cathode to form copper. Hydroxide ions lose electrons at the positive anode, forming oxygen and water. The half-equations conserve atoms and charge.',
    '<rect x="33" y="31" width="11" height="71" fill="#82969c"/><rect x="277" y="31" width="11" height="71" fill="#82969c"/>'+text(38,21,'− cathode',blue,14)+text(278,21,'+ anode',rust,14)+
    circle(95,67,16,'#dce8f5',blue)+text(95,72,'Cu²⁺',blue,14)+arrow(77,67,50,67,blue,2)+text(260,109,'O₂ ↑',rust,16)+circle(222,67,16,'#e1f0e6',teal)+text(222,72,'OH⁻',teal,13)+arrow(240,67,271,67,teal,2)+
    text(160,132,'Cu²⁺ + 2e⁻ → Cu',blue,15)+text(160,161,'4OH⁻ → O₂ + 2H₂O + 4e⁻',rust,14),
    'Follow ions to opposite electrodes. The electrons show reduction at the cathode and oxidation at the anode.',180);
}

function waterRoutes() {
  return fig('Treating fresh water and seawater',
    'Fresh water can be filtered to remove suspended solids and then sterilised to kill microbes. Seawater requires desalination to remove dissolved salts as well as suitable treatment for microbes. One desalination method uses a membrane that lets water through while retaining salts.',
    text(62,24,'Fresh water',ink,15)+text(240,24,'Seawater',ink,15)+
    '<path d="M25 42 H100 L72 76 V103 H53 V76 Z" fill="#eef5ee" stroke="'+ink+'" stroke-width="2"/>'+line(37,57,88,57,teal,2)+circle(49,50,3,rust,rust)+circle(71,50,3,rust,rust)+text(62,127,'Filter solids',teal,14)+
    '<rect x="181" y="44" width="120" height="58" fill="#dceef5" stroke="'+ink+'" stroke-width="2"/>'+line(239,44,239,102,teal,3)+circle(201,61,4,rust,rust)+circle(217,84,4,rust,rust)+arrow(224,73,254,73,blue,2)+text(241,127,'Remove salts',blue,14)+
    text(160,162,'Sterilise to reduce harmful microbes',ink,14),
    'Compare the treatments. Filtering removes suspended solids; desalination removes dissolved salts. Microbes need appropriate treatment too.',180);
}
function grouped(...renderers) {const group=node('div');group.append(...renderers.map(render=>render()));return group;}

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
    text(40,20,'Displacement (illustrative)',ink,14,'start')+text(40,151,'0',ink,13)+text(155,151,'0.5',ink,13)+text(270,151,'1',ink,13)+text(160,176,'Time (s)',ink,15),
    'Count two complete cycles in one second: the frequency is 2 Hz. This is an illustrative example.',190);
}
function waveMeasures(){return grouped(wavelength,frequency);}
function energyDistribution() {
  const curve=(t)=>Array.from({length:101},(_,e)=>{const x=40+2.45*e;const f=Math.sqrt(e)*Math.exp(-e/t)/Math.pow(t,1.5);return x.toFixed(1)+','+(145-3100*f).toFixed(1);}).join(' ');
  return fig('Temperature and collision energy',
    'Illustrative particle energy distributions for a cooler and a warmer sample. The warmer curve is broader with a lower peak; a larger fraction lies above the same activation energy threshold.',
    line(40,145,292,145)+line(40,145,40,25)+'<polyline points="'+curve(16)+'" fill="none" stroke="'+blue+'" stroke-width="3"/>'+
    '<polyline points="'+curve(28)+'" fill="none" stroke="'+rust+'" stroke-width="3" stroke-dasharray="7 4"/>'+line(187,33,187,145,ink,1.5,'5 3')+
    text(40,17,'Relative number of particles',ink,15,'start')+text(163,173,'Particle energy (arbitrary units)',ink,15)+text(240,51,'Activation',ink,14)+text(240,67,'energy',ink,14),
    'Solid: cooler. Dashed: warmer. Compare the proportion of each distribution beyond the same activation energy.',190);
}
function collisionsAndEnergy(){return grouped(collisionFrequency,energyDistribution);}
function resistanceSelection() {
  const dot=(x,y,resistant)=>circle(x,y,7,resistant?'#b9dfc8':'#c9def1',resistant?teal:blue)+(resistant?text(x,y+4,'R',teal,11):'');
  return fig('Antibiotic resistance and selection',
    'Before treatment, a bacterial population includes a resistant variant. An antibiotic kills susceptible bacteria, while the resistant bacterium survives and can reproduce. The antibiotic selects an existing variant; it does not direct bacteria to develop resistance.',
    text(50,22,'Before',ink,15)+text(160,22,'After treatment',ink,14)+text(270,22,'Later',ink,15)+
    dot(28,53,false)+dot(53,53,false)+dot(77,53,true)+dot(40,82,false)+dot(66,82,false)+
    arrow(94,70,123,70,rust,2)+dot(160,68,true)+arrow(190,70,219,70,rust,2)+
    dot(246,53,true)+dot(270,53,true)+dot(294,53,true)+dot(258,82,true)+dot(282,82,true)+
    circle(74,121,6,'#c9def1',blue)+text(87,126,'susceptible',blue,13,'start')+circle(205,121,6,'#b9dfc8',teal)+text(218,126,'resistant',teal,13,'start'),
    'Follow a resistant bacterium already present before treatment. It can survive and reproduce as susceptible bacteria are killed.',145);
}
function antibioticsAndSelection(){return grouped(antibioticTargets,resistanceSelection);}
export const gcseOpeningVisuals = {
  'salt-electrolysis': () => grouped(gcseStepVisuals['salt-electrolysis'][1], brine),
  'glucose-control': gcseStepVisuals['glucose-control'][1],
  'greenhouse': greenhouse,
  'potable-water': waterRoutes,
  'forces-motion': gcseStepVisuals['forces-motion'][0],
  'respiration-exercise': respiratoryComparison,
  'density-and-gas-pressure': () => grouped(density, gcseStepVisuals['density-and-gas-pressure'][1]),
  'salts-and-reactivity': () => grouped(saltsApparatus, () => photo('copper-deposit', 'Copper deposited on iron', 'In copper sulfate solution, iron displaces copper. Locate the reddish copper on the iron shavings.')),
  'reflex-response': neuron,
  'electromagnetic-spectrum': spectrumAndWaves,
  'prevention-and-medicines': () => grouped(transmission, treatmentTesting),
  'radiation-types': () => grouped(shield, emissions, ionisation),
  'reproductive-hormones': menstrualHormones,
  'carbon-cycling': gcseStepVisuals['carbon-cycling'][0]
};
export const gcseHigherVisuals = {
  'decay-half-life': halfLifeRatio,
  'reaction-profiles': reactionBonds,
  'salts-and-reactivity': acidStrength,
  'mass-conservation': molarRatio,
  'salt-electrolysis': electrolysisReduction,
  'photosynthesis-limits': inverseSquare,
  'glucose-control': glucagonResponse,
  'solution-concentration': dilution,
  'forces-motion': momentum,
  'dynamic-equilibrium': equilibriumHeating,
  'motion-graphs': velocityArea,
  'reaction-rate': rateAndShift,
  'electromagnet-switch': motorOverview,
  'respiration-exercise': oxygenDebt,
  'reproductive-hormones': hormoneFeedback,
  'national-grid': transformerComparison,
  'electrode-evidence': halfEquations
};
export const moreGcseStepVisuals = {
  'food-web-change': {2:quadrat},
  'wave-motion': {1:waveMeasures,2:waveCompare},
  'forces-motion': {2:stopping},
  'reaction-profiles': {2:temperaturePractical},
  'decay-half-life': {2:irradiation},
  'density-and-gas-pressure': {0:density},
  'photosynthesis-limits': {2:highLightExperiment},
  'glucose-control': {0:homeostasis,2:diabetes},
  'reaction-rate': {1:collisionsAndEnergy,2:dynamicEquilibrium},
  'salt-electrolysis': {2:brine},
  'reflex-response': {0:neuron,1:reflexWithSynapse,2:reflexMeasure},
  'respiration-exercise': {0:respiratoryComparison,1:respiratoryComparison},
  'vaccine-memory': {0:barriersAndAntibodies,2:antibioticTargets},
  'selection-and-variation': {0:naturalSelection,1:naturalSelection,2:selectiveBreeding},
  'inheritance-cross': {2:naturalSelection},
  'chromatography': {2:gasTests},
  'latent-heat': {0:storedEnergy,2:latentCalculation},
  'mass-conservation': {2:concentrationExample},
  'crude-oil': {0:methaneStructure,2:alkene},
  'greenhouse': {0:greenhouse,1:emissionsSources,2:pollutants},
  'potable-water': {0:waterTreatment,1:filtration,2:lifeCycle},
  'electromagnet-switch': {1:reverseCoil,2:ironCore},
  'salts-and-reactivity': {0:sulfateSalt,1:saltsApparatus},
  'electromagnetic-spectrum': {0:spectrumAndWaves,1:emSpectrum,2:xray},
  'prevention-and-medicines': {0:transmission,1:antibioticsAndSelection,2:treatmentTesting},
  'radiation-types': {0:emissions,1:shieldingAndIonisation,2:alphaDecay},
  'circuit-resistance': {0:circuitMeters,2:electricalPower},
  'reproductive-hormones': {0:menstrualHormones,1:menstrualHormones,2:contraception},
  'carbon-cycling': {2:habitatDiversity}
};

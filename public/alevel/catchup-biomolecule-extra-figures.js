/* Original biological-molecule teaching schematics; shapes are models, not atomic structures. */
(function () {
 "use strict";
 const figures={
  'monopoly/0': [{
   title:'Units and a polymer',
   alt:'One circle represents a single monomer. Five joined circles represent repeated monomer units in one polymer. Monosaccharides, amino acids and nucleotides are examples of biological monomers.',
   caption:'Compare a single unit with many linked units. The circles represent monomers, not atoms; monosaccharides, amino acids and nucleotides can form biological polymers.',
   art:`<text x="150" y="28" text-anchor="middle">One monomer</text><circle cx="150" cy="72" r="25" fill="#bfe4dc" stroke="#32776d" stroke-width="2"/><text x="150" y="131" text-anchor="middle">Many linked monomers</text><g fill="#bfe4dc" stroke="#32776d" stroke-width="2"><circle cx="46" cy="188" r="21"/><circle cx="98" cy="188" r="21"/><circle cx="150" cy="188" r="21"/><circle cx="202" cy="188" r="21"/><circle cx="254" cy="188" r="21"/></g><path d="M67 188h10m42 0h10m42 0h10m42 0h10" stroke="#344958" stroke-width="4"/><text x="150" y="246" text-anchor="middle">One polymer chain</text>`
  }],
  'monopoly/2': [{
   title:'Hydrolysis splits a bond',
   alt:'A bond between two linked units is broken by hydrolysis. Water supplies an H group to one unit and an OH group to the other; the units are schematic.',
   caption:'Follow the bond that breaks. Water supplies H and OH to the two resulting pieces; the coloured shapes represent molecular units.',
   art:`<text x="150" y="26" text-anchor="middle">Joined units + H₂O</text><circle cx="112" cy="71" r="27" fill="#bfe4dc" stroke="#32776d"/><circle cx="188" cy="71" r="27" fill="#f1d0ad" stroke="#a76125"/><path d="M139 71h22" stroke="#344958" stroke-width="4"/><path d="M150 109v34m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="165" text-anchor="middle">Hydrolysis</text><circle cx="82" cy="220" r="27" fill="#bfe4dc" stroke="#32776d"/><circle cx="218" cy="220" r="27" fill="#f1d0ad" stroke="#a76125"/><text x="117" y="225">H</text><text x="161" y="225">OH</text><path d="M109 220h8M190 220h-8" stroke="#344958" stroke-width="2"/>`
  }],
  'enzymes/0': [{
   title:'A lower activation energy', height:320,
   alt:'A schematic energy profile plots energy vertically against reaction progress horizontally. Two curves start and finish at the same levels; the catalysed pathway has a lower peak and thus lower activation energy than the uncatalysed pathway.',
   caption:'Compare the height from the reactants to each peak: the enzyme-catalysed pathway has lower activation energy. The curves are schematic, not measured results.',
   art:`<path d="M40 35v190h240" stroke="#344958" stroke-width="2" fill="none"/><text x="42" y="24">Energy</text><text x="152" y="268" text-anchor="middle">Reaction progress</text><path d="M52 188C90 188 110 56 164 57S213 163 269 163" stroke="#a76125" stroke-width="3" fill="none"/><path d="M52 188C92 188 111 115 164 116S213 163 269 163" stroke="#32776d" stroke-width="3" stroke-dasharray="6 4" fill="none"/><path d="M48 278h25" stroke="#a76125" stroke-width="3"/><text x="81" y="284">Without enzyme</text><path d="M48 302h25" stroke="#32776d" stroke-width="3" stroke-dasharray="6 4"/><text x="81" y="308">With enzyme</text><text x="50" y="214">Reactants</text><text x="213" y="189">Products</text>`
  },{
   title:'An enzyme–substrate complex',
   alt:'A substrate with a shape complementary to an enzyme active site binds to form an enzyme–substrate complex. The active site is part of the enzyme’s folded tertiary structure; shapes and fit are simplified.',
   caption:'Locate the active site in the folded enzyme and follow the complementary substrate as it binds. The shape model omits the site’s chemical interactions.',
   art:`<text x="40" y="27" text-anchor="middle">Enzyme</text><path d="M20 144q0-72 56-72t56 72v40H20z" fill="#bfe4dc" stroke="#32776d" stroke-width="3"/><path d="M58 72l18 18 18-18" fill="white" stroke="#32776d" stroke-width="3"/><path d="M65 42l11 11 11-11-11-11z" fill="#f1d0ad" stroke="#a76125" stroke-width="2"/><text x="75" y="212" text-anchor="middle">Active site</text><path d="M36 198H6V58l52 15" stroke="#344958" stroke-width="2" fill="none"/><text x="130" y="38" text-anchor="middle">Substrate</text><path d="M111 42H88" stroke="#344958" stroke-width="2"/><path d="M139 129h28m-7-6 7 6-7 6" stroke="#344958" stroke-width="2" fill="none"/><path d="M173 144q0-72 56-72t56 72v40H173z" fill="#bfe4dc" stroke="#32776d" stroke-width="3"/><path d="M211 72l18 18 18-18" fill="#f1d0ad" stroke="#a76125" stroke-width="2"/><text x="229" y="220" text-anchor="middle">Complex</text><text x="150" y="266" text-anchor="middle">Complementary substrate binds</text>`
  }],
  'replication/2': [{
   title:'Meselson and Stahl: DNA bands',
   alt:'After cells grown in heavy nitrogen were transferred to light nitrogen, centrifuged DNA showed an intermediate-density band after one replication and both intermediate and light bands after two replications. The bands are qualitative and not to scale.',
   caption:'Compare the band positions after transfer to light nitrogen. An intermediate band after one replication and intermediate plus light bands after two support the semi-conservative model. Band thickness is not quantitative.',
   art:`<text x="150" y="25" text-anchor="middle">DNA density bands</text><g fill="#eef4f6" stroke="#537a94" stroke-width="2"><path d="M37 51v119q0 17 30 17t30-17V51z"/><path d="M120 51v119q0 17 30 17t30-17V51z"/><path d="M203 51v119q0 17 30 17t30-17V51z"/></g><g stroke="#32776d" stroke-width="7"><path d="M40 153h54M123 115h54M206 115h54M206 77h54"/></g><g text-anchor="middle"><text x="67" y="215">Before</text><text x="150" y="215">After 1</text><text x="233" y="215">After 2</text><text x="150" y="239">replications in light nitrogen</text><text x="150" y="270">Light at top · heavy below</text></g>`
  }]
 };
 figures['sugars/1']=[{
  title:'Three disaccharides',
  alt:'A model compares two joined monosaccharides for each disaccharide. Maltose contains glucose and glucose; sucrose contains glucose and fructose; lactose contains glucose and galactose.',
  caption:'Compare the paired units: maltose is glucose plus glucose, sucrose is glucose plus fructose, and lactose is glucose plus galactose. The circles represent whole sugar units.',
  art:`<text x="150" y="25" text-anchor="middle">Maltose</text><g fill="#bfe4dc" stroke="#32776d"><circle cx="85" cy="59" r="23"/><circle cx="215" cy="59" r="23"/></g><path d="M108 59h84" stroke="#344958" stroke-width="3"/><text x="85" y="98" text-anchor="middle">Glucose</text><text x="215" y="98" text-anchor="middle">Glucose</text><text x="150" y="129" text-anchor="middle">Sucrose</text><circle cx="85" cy="165" r="23" fill="#bfe4dc" stroke="#32776d"/><circle cx="215" cy="165" r="23" fill="#f1d0ad" stroke="#a76125"/><path d="M108 165h84" stroke="#344958" stroke-width="3"/><text x="85" y="204" text-anchor="middle">Glucose</text><text x="215" y="204" text-anchor="middle">Fructose</text><text x="150" y="232" text-anchor="middle">Lactose: glucose + galactose</text><circle cx="85" cy="266" r="15" fill="#bfe4dc" stroke="#32776d"/><circle cx="215" cy="266" r="15" fill="#d7d5ee" stroke="#665e99"/><path d="M100 266h100" stroke="#344958" stroke-width="3"/>`
 }];
 figures['polysac/0']=[{
  title:'Polysaccharides and glucose units',
  alt:'Three schematic polysaccharides are compared. Starch and glycogen are formed from alpha glucose; cellulose is formed from beta glucose. Starch in plants and glycogen in animals are compact energy stores that are insoluble and can be hydrolysed to glucose.',
  caption:'Compare the glucose units used in each polymer. Starch and glycogen store energy; their insolubility means they do not affect water potential. Shapes represent units, not complete molecular structures.',
  art:`<text x="150" y="25" text-anchor="middle">Starch · plants</text><text x="150" y="47" text-anchor="middle">α-glucose units</text><g fill="#bfe4dc" stroke="#32776d">${[40,85,130,175,220,265].map(x=>`<circle cx="${x}" cy="77" r="14"/>`).join('')}</g><path d="M54 77h17m28 0h17m28 0h17m28 0h17m28 0h17" stroke="#344958" stroke-width="3"/><text x="150" y="123" text-anchor="middle">Glycogen · animals</text><text x="150" y="145" text-anchor="middle">α-glucose units</text><g fill="#bfe4dc" stroke="#32776d">${[62,106,150,194,238].map(x=>`<circle cx="${x}" cy="174" r="14"/>`).join('')}<circle cx="150" cy="207" r="14"/></g><path d="M76 174h16m28 0h16m28 0h16m28 0h16M150 188v5" stroke="#344958" stroke-width="3"/><text x="150" y="247" text-anchor="middle">Cellulose · β-glucose units</text><text x="150" y="275" text-anchor="middle">Structural material in plant walls</text>`
 }];
 figures['lipids/0']=[{
  title:'Saturated and unsaturated chains',
  alt:'A simplified part of a fatty acid chain compares carbon to carbon single bonds in a saturated chain with a carbon to carbon double bond in an unsaturated chain. Other atoms and the carboxyl group are omitted.',
  caption:'Locate the C=C in the unsaturated example. Saturated fatty acid chains have no carbon–carbon double bonds; the full chains and hydrogen atoms are omitted.',
  art:`<text x="150" y="33" text-anchor="middle">Saturated segment</text><text x="150" y="85" text-anchor="middle">C — C — C — C</text><text x="150" y="117" text-anchor="middle">Carbon–carbon single bonds</text><path d="M20 145h260" stroke="#d6e1de" stroke-width="2"/><text x="150" y="179" text-anchor="middle">Unsaturated segment</text><text x="150" y="231" text-anchor="middle">C — C = C — C</text><text x="150" y="265" text-anchor="middle">One carbon–carbon double bond</text>`
 }];
 figures['enzfactors/1']=[{
  title:'Initial rate from a tangent',
  alt:'A schematic graph of product formed against time rises and flattens. A straight tangent touches the curve at time zero. Its gradient represents the initial rate; no numerical results are shown.',
  caption:'At time zero, compare the steepness of the straight tangent with the curve. Its gradient gives the initial rate; this sketch is not experimental data.',
  art:`<path d="M43 40v183h224" fill="none" stroke="#344958" stroke-width="2"/><text x="43" y="26">Product formed</text><text x="155" y="260" text-anchor="middle">Time</text><text x="35" y="244">0</text><path d="M43 223C72 130 120 97 181 87S238 82 267 82" stroke="#32776d" stroke-width="3" fill="none"/><path d="M43 223L98 46.6" stroke="#a76125" stroke-width="3" stroke-dasharray="6 4" fill="none"/><text x="105" y="57">Tangent at</text><text x="105" y="78">time zero</text>`
 }];
 figures['tests/1']=[{
  title:'Reading a glucose calibration curve',
  alt:'A schematic calibration graph plots colorimeter absorbance against concentration of glucose. The absorbance of an unknown sample is traced horizontally to the calibration line and then down to the concentration axis. No actual measurements are shown.',
  caption:'Read across from the unknown sample’s absorbance to the calibration line, then down to estimate glucose concentration. This graph is illustrative, with no experimental values.',
  art:`<path d="M44 41v178h223" fill="none" stroke="#344958" stroke-width="2"/><text x="44" y="26">Absorbance</text><text x="153" y="260" text-anchor="middle">Glucose concentration</text><path d="M44 219L259 62" fill="none" stroke="#32776d" stroke-width="3"/><path d="M44 125h129v94" fill="none" stroke="#a76125" stroke-width="2" stroke-dasharray="5 4"/><circle cx="173" cy="125" r="5" fill="#a76125"/><text x="46" y="88">Unknown</text><text x="46" y="106">absorbance</text><text x="181" y="151">Calibration</text><text x="181" y="172">line</text>`
 }];
 figures['water/0']=[...figures['monopoly/2'],{
  title:'Heating and evaporating water',
  alt:'Two schematic views show energy entering liquid water and a small temperature rise for a given mass and energy input, and water molecules evaporating from the liquid surface, removing energy. Water has a relatively high specific heat capacity and latent heat of vaporisation.',
  caption:'Compare the two processes. Heating a kilogram of water by one degree requires relatively much energy; evaporating water also transfers energy away and can cool the remaining liquid. Molecules are schematic.',
  art:`<text x="150" y="24" text-anchor="middle">Heating liquid water</text><path d="M115 48v74q0 12 35 12t35-12V48" fill="#e4f1ee" stroke="#32776d" stroke-width="2"/><path d="M116 85h68" stroke="#32776d" stroke-width="2"/><path d="M30 93h70m-8-6 8 6-8 6" stroke="#a76125" stroke-width="3" fill="none"/><text x="65" y="75" text-anchor="middle">Energy in</text><path d="M220 62v50" stroke="#a76125" stroke-width="4"/><circle cx="220" cy="115" r="7" fill="#a76125"/><text x="222" y="48" text-anchor="middle">+1°C</text><text x="150" y="159" text-anchor="middle">Relatively high heat capacity</text><path d="M20 172h260" stroke="#d6e1de" stroke-width="2"/><text x="150" y="196" text-anchor="middle">Evaporation</text><path d="M54 235q48-9 96 0t96 0" fill="none" stroke="#32776d" stroke-width="3"/><g fill="#537a94"><circle cx="88" cy="248" r="5"/><circle cx="137" cy="255" r="5"/><circle cx="193" cy="248" r="5"/><circle cx="150" cy="211" r="5"/></g><path d="M150 236v-16m-5 5 5-5 5 5" stroke="#a76125" stroke-width="2" fill="none"/><text x="150" y="281" text-anchor="middle">Energy leaves with water vapour</text>`
 }];
 function render(topic,id,group){if(topic!=='a1')return '';const key=id==='enzfactors2'&&group===1?'enzfactors/1':id+'/'+group;return (figures[key]||[]).map(f=>`<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height||290}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`).join('');}
 window.ALevelBiomoleculeExtraFigures={render};
})();

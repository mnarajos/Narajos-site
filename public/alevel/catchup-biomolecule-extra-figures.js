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
 function render(topic,id,group){if(topic!=='a1')return '';return (figures[id+'/'+group]||[]).map(f=>`<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height||290}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`).join('');}
 window.ALevelBiomoleculeExtraFigures={render};
})();

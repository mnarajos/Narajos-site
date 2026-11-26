import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import vm from 'node:vm';
const context = {window: {}};
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-figures.js', import.meta.url), 'utf8'), context);
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-molecules-figures.js', import.meta.url), 'utf8'), context);
for (const [id, group] of [['monopoly',1],['sugars',0],['sugars',1],['polysac',1],['lipids',0],['lipids',1],['proteins',0],['proteins',1],['nucleic',0],['nucleic',1],['atp',0],['atp',1],['tests',0],['tests',1],['enzfactors',0],['enzfactors2',0],['replication',0],['replication',1],['water',1]]) {
  const figure = context.window.ALevelCatchupFigures.render('a1', id, group);
  assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
  assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
for (const [id, group] of [['euk',1],['fract',0],['fract',1],['cellmed',0],['cellmed',1]]) {
  const figure = context.window.ALevelCatchupFigures.render('a2', id, group);
  assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
  assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
const photo = context.window.ALevelCatchupFigures.render('a2','euk',2);
assert.match(photo, /alt="[^"]{20,}"/);
assert.match(photo, /https:\/\/creativecommons\.org\/licenses\/by\/4\.0\//);
assert(existsSync(new URL('../public/assets/micrographs/drawing-onion-stained.webp', import.meta.url)));
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-cell-figures.js', import.meta.url), 'utf8'), context);
for (const [id, group] of [['mitosis',0],['mitosis',1],['mitindex',1],['micro',0],['micro',2],['micro',3],['vaccines',1],['vaccines',0],['mitosis',2],['mitindex',2],['prok',1],['hiv',0],['hiv',1],['hiv',2]]) {
 const figure = context.window.ALevelCatchupFigures.render('a2',id,group);
 assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
 assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
for (const [id,group,path] of [['mitindex',0,'hb-root-field.webp'],['micro',1,'hb-pancreas-tem.webp']]) {
 const figure = context.window.ALevelCatchupFigures.render('a2',id,group);
 assert.match(figure, /alt="[^"]{20,}"/);
 assert(figure.includes(path));
 assert(existsSync(new URL('../public/assets/micrographs/' + path, import.meta.url)));
}
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-exchange-figures.js', import.meta.url), 'utf8'), context);
for (const [id, group] of [['sav',0],['insects',0],['leafgas',0],['haemo',1],['bohr',0],['bohr',1],['circulation',0],['leafgas',1],['ventilation',0],['ventilation',1],['digestion',0],['digestion',1],['absorption',1],['haemo',0],['absorption',0],['absorption',2],['lungdata',0],['vessels',2],['circulation',1]]) {
 const figure = context.window.ALevelCatchupFigures.render('a3',id,group);
 assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
 assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-genetics-figures.js', import.meta.url), 'utf8'), context);
for (const [id, group] of [['dnachrom',0],['code',0],['rnas',1],['chromut',0],['meiosis',0],['meiosis',1],['meiosisvar',0],['taxonomy',2],['dnachrom',1],['chromut',1],['meiosisvar',1],['natsel',0],['natsel',1],['selection',0],['investdiv',0],['biodiv',0],['biodiv',1],['aseptic',0],['aseptic',1],['traps4',0],['traps4',1],['traps4',2],['traps4',3],['linkp1',0],['ctx4',0],['ctx4',1],['ctx4',2],['code',1],['translation',1],['translation',2],['mutation',2],['aseptic',2],['taxonomy',0],['taxonomy',1],['dnachrom',2],['rnas',0],['sampling',0],['sampling',1]]) {
 const figure = context.window.ALevelCatchupFigures.render('a4',id,group);
 assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
 assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-energy-neural-figures.js', import.meta.url), 'utf8'), context);
for (const [topic,id,group] of [['a5','glycolysis',0],['a5','glycolysis',1],['a5','glycolysis',2],['a5','anaerobic',0],['a5','nitrogen',0],['a5','nitrogen',1],['a5','nitrogen',2],['a5','phosphorus',0],['a5','phosphorus',1],['a6','reflex',1],['a6','resting',1],['a6','actionpot',0],['a6','actionpot',1],['a6','kidney',0],['a7','succession',0],['a7','succession',1]]) {
 const figure=context.window.ALevelEnergyNeuralFigures.render(topic,id,group);
 assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
 assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-gene-regulation-figures.js', import.meta.url), 'utf8'), context);
for (const [id,group] of [['rnai',0],['rnai',1],['fragments',1],['fingerprint',1]]) {
 const figure=context.window.ALevelGeneRegulationFigures.render('a8',id,group);
 assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
 assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
const courtship = context.window.ALevelCatchupFigures.render('a4','species',0);
assert.match(courtship, /alt="[^"]{20,}"/);
assert.match(courtship, /https:\/\/creativecommons\.org\/licenses\/by-sa\/3\.0\//);
assert(existsSync(new URL('../public/assets/catchup-photos/grebe-courtship.webp', import.meta.url)));
for (const [file,global,rows] of [
 ['catchup-energy-mechanism-figures.js','ALevelEnergyMechanismFigures', [['a5','lightdep',0],['a5','lightdep',1],['a5','chemios',0],['a5','chemios',1],['a5','calvin',0],['a5','calvin',1],['a5','calvin',2],['a5','krebs',0],['a5','krebs',1],['a6','speed',0],['a6','adh',0],['a6','adh',1]]],
 ['catchup-population-figures.js','ALevelPopulationFigures', [['a7','genterms',1],['a7','codom',1],['a7','sexlink',2],['a7','epistasis',0],['a7','interact',1],['a7','fieldwork',0],['a7','fieldwork',1],['a7','mrrc',0]]],
 ['catchup-gene-control-figures.js','ALevelGeneControlFigures', [['a8','transfac',0],['a8','transfac',1],['a8','transfac',2],['a8','epigen',0],['a8','epigen',1],['a8','invivo',0],['a8','probes',0]]],
 ['catchup-response-figures.js','ALevelResponseFigures', [['a6','pacinian',0],['a6','pacinian',1],['a6','eye',0],['a6','eye',1],['a6','resting',0],['a6','tropisms',1],['a6','glucose',0]]],
 ['catchup-synapse-figures.js','ALevelSynapseFigures', [['a6','synapse',0],['a6','synapse',1],['a6','synapse',2],['a6','synapse',3]]],
 ['catchup-practicals-figures.js','ALevelPracticalsFigures', [['a5','limiting',0],['a5','chromat',0],['a5','chromat',1],['a5','dcpip',1],['a5','oxphos',0],['a5','oxphos',1],['a5','respiro',1],['a5','biomass',1],['a5','productivity',0],['a5','fertil',1],['a6','loop',0],['a6','loop',1]]],
 ['catchup-biomolecule-extra-figures.js','ALevelBiomoleculeExtraFigures', [['a1','monopoly',0],['a1','monopoly',2],['a1','enzymes',0],['a1','replication',2],['a1','sugars',1],['a1','polysac',0],['a1','lipids',0],['a1','enzfactors',1],['a1','enzfactors2',1],['a1','tests',1],['a1','water',0],['a1','traps1',0],['a1','traps1',1],['a1','traps1',2]]],
 ['catchup-regulation-figures.js','ALevelRegulationFigures', [['a6','homeo',1],['a6','actionpot',2],['a6','glucose',1],['a6','glucose',2],['a6','secondmsg',0],['a6','secondmsg',1],['a6','diabetes',0],['a6','loop',2]]],
 ['catchup-population-processes.js','ALevelPopulationProcesses', [['a7','hardy',1],['a7','hardy',2],['a7','linkage',0],['a7','linkage',1],['a7','speciation',0],['a7','speciation',1],['a7','ecosys',0],['a7','interact',0],['a7','mrrc',1],['a7','varsel',1]]],
 ['catchup-metabolism-practicals.js','ALevelMetabolismPracticals', [['a5','dcpip',0],['a5','respiro',0],['a5','substrates',0],['a5','substrates',1],['a5','biomass',0],['a5','productivity',1],['a5','fertil',0],['a6','glucal',0],['a6','glucal',1]]],
 ['catchup-gene-techniques.js','ALevelGeneTechniques', [['a8','mut8',0],['a8','mut8',1],['a8','mut8',2],['a8','stemcells',0],['a8','stemcells',1],['a8','stemcells',2],['a8','cancer',0],['a8','cancer',1],['a8','fragments',0],['a8','fragments',2],['a8','invivo',1],['a8','fingerprint',0]]],
 ['catchup-exchange-extra-figures.js','ALevelExchangeExtraFigures', [['a3','lungs',0],['a3','sav',1],['a3','fish',0],['a3','fish',1],['a3','vessels',0],['a3','heart',0],['a3','heart',1],['a3','insects',1],['a3','lungdata',2]]],
 ['catchup-muscle-figures.js','ALevelMuscleFigures', [['a6','summation',0],['a6','muscle',0],['a6','muscle',1],['a6','sliding',0],['a6','sliding',1],['a6','sliding',2],['a6','sliding',3],['a6','sliding2',0],['a6','sliding2',1],['a6','sliding2',2],['a6','sliding2',3],['a6','fibres',0],['a6','fibres',1]]],
 ['catchup-cardiac-figures.js','ALevelCardiacFigures', [['a6','heartrate',0],['a6','heartrate',1],['a6','hrcontrol',1]]],
 ['catchup-exchange-disease-figures.js','ALevelExchangeDiseaseFigures', [['a2','membrane',1],['a3','lungdata',1]]],
 ['catchup-farming-figures.js','ALevelFarmingFigures', [['a5','farming',0],['a5','farming',1]]],
 ['catchup-energy-recap-figures.js','ALevelEnergyRecapFigures', [['a5','traps5',0],['a5','traps5',1],['a5','traps5',2],['a5','traps5',3],['a5','ctx5',1],['a5','ctx5',2],['a5','limiting',1],['a5','anaerobic',1]]],
 ['catchup-risk-surface-figures.js','ALevelRiskSurfaceFigures', [['a3','sav',2],['a3','cvd',0],['a3','cvd',1]]],
 ['catchup-response-recap-figures.js','ALevelResponseRecapFigures', [['a6','eye',1],['a6','reflex',0],['a6','tropisms',0],['a6','homeo',0],['a6','hrcontrol',0],['a6','kidney',1],['a6','traps6',0],['a6','traps6',1],['a6','traps6',2],['a6','traps6',3],['a6','ctx6',0],['a6','ctx6',1],['a6','ctx6',2]]],
 ['catchup-inheritance-details.js','ALevelInheritanceDetails', [['a7','genterms',0],['a7','codom',0],['a7','sexlink',0],['a7','sexlink',1],['a7','dihybrid',0],['a7','dihybrid',1],['a7','dihybrid',2]]],
 ['catchup-context-molecules.js','ALevelContextMolecules', [['a1','ctx1',1],['a1','ctx1',2]]],
 ['catchup-pedigree-figures.js','ALevelPedigreeFigures', [['a7','pedigree',0],['a7','pedigree',1],['a7','pedigree',2]]],
 ['catchup-response-core-figures.js','ALevelResponseCoreFigures', [['a6','taxes',0],['a6','taxes',1],['a6','speed',1],['a6','summation',1]]],
 ['catchup-conservation-details.js','ALevelConservationDetails', [['a7','speciation',2],['a7','ecosys',1],['a7','conserve',0],['a7','conserve',1]]],
 ['catchup-gene-recap-figures.js','ALevelGeneRecapFigures', [['a8','ctx8',0],['a8','ctx8',1],['a8','ctx8',2],['a8','traps8',0],['a8','traps8',1],['a8','traps8',2]]],
 ['catchup-chisq-figures.js','ALevelChiSquaredFigures', [['a7','chisq',0],['a7','chisq',1],['a7','chisq',2]]],
 ['catchup-population-recap.js','ALevelPopulationRecap', [['a7','traps7',0],['a7','traps7',1],['a7','traps7',2],['a7','traps7',3],['a7','ctx7',0],['a7','ctx7',1],['a7','ctx7',2]]],
 ['catchup-paper2-links.js','ALevelPaper2Links', [['a8','linkp2',0],['a8','linkp2',1],['a8','wordp2',0],['a8','wordp2',1]]],
 ['catchup-genome-context.js','ALevelGenomeContext', [['a8','genome',0],['a8','genome',1],['a8','invivo',2],['a8','probes',1]]],
 ['catchup-variation-pool.js','ALevelVariationPool', [['a7','varsel',0],['a7','hardy',0]]],
 ['catchup-antigen-bonds.js','ALevelAntigenBonds', [['a4','linkp1',1]]],
 ['catchup-ecology-recap.js','ALevelEcologyRecap', [['a7','epistasis',1],['a7','fieldwork',2],['a7','interact',2]]]
]) {
 vm.runInNewContext(readFileSync(new URL('../public/alevel/'+file, import.meta.url), 'utf8'), context);
 for (const [topic,id,group] of rows) { const figure=context.window[global].render(topic,id,group); assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/); assert.match(figure, /<figcaption>.{20,}<\/figcaption>/); }
}
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-guided-figures.js', import.meta.url), 'utf8'), context);
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-cell-reuse-figures.js', import.meta.url), 'utf8'), context);
for (const [id,group] of [['prok',2],['active',0],['ctx2',1],['ctx2',2],['osmchain',0],['osmchain',1],['osmchain',2],['osmosis',0],['osmosis',1],['phago',0],['diffusion',1],['traps2',0],['traps2',1],['traps2',2]]) {
 const figure=context.window.ALevelCellReuseFigures.render('a2',id,group);
 assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
 assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-transport-figures.js', import.meta.url), 'utf8'), context);
for (const [id,group] of [['traps3',0],['traps3',1],['traps3',2],['ctx3',1],['ctx3',2],['bwater',0],['bwater',1],['bwater',2]]) {
 const figure=context.window.ALevelExchangeExtraFigures.render('a3',id,group);
 assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
 assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-practical-extra-figures.js', import.meta.url), 'utf8'), context);
const practicalPhoto=context.window.ALevelPracticalExtraFigures.render('a3','dissect',0);
assert.match(practicalPhoto, /<img[^>]+alt="[^"]{20,}"/);
assert.match(practicalPhoto, /https:\/\/creativecommons\.org\/licenses\/by-sa\/4\.0\//);
assert(existsSync(new URL('../public/assets/required-practicals/rp5-lamb-heart.webp', import.meta.url)));
for (const g of [0,1]) {
 const figure=context.window.ALevelPracticalExtraFigures.render('a3','dissect',g);
 assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
 assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-paper1-wording.js', import.meta.url), 'utf8'), context);
for (const group of [0,1]) {
 const figure=context.window.ALevelPaper1Wording.render('a4','wordp1',group);
 assert.equal((figure.match(/<figure\b/g)||[]).length,2);
 assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
 assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-foundation-gene-figures.js', import.meta.url), 'utf8'), context);
for (const [topic,id,group] of [['a1','enzymes',1],['a4','transcription',0],['a4','transcription',1],['a4','translation',0],['a4','mutation',0],['a4','mutation',1]]) {
 const figure=context.window.ALevelCatchupFigures.render(topic,id,group);
 assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
 assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
 assert(!figure.includes('aria-label="Scrollable science diagram"'));
}
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-compact-cells.js', import.meta.url), 'utf8'), context);
for (const [id,group] of [['euk',0],['prok',0],['diffusion',0],['active',1]]) {
 const figure=context.window.ALevelCompactCells.render('a2',id,group);
 assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
 assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
 assert(!figure.includes('aria-label="Scrollable science diagram"'));
}
assert.equal(context.window.ALevelCompactCells.render('a2','active',0), '');
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-compact-lungs.js', import.meta.url), 'utf8'), context);
const compactLung=context.window.ALevelCompactLungs.render('a3','lungs',1);
assert.match(compactLung, /A short diffusion path/);
assert.match(compactLung, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
assert(!compactLung.includes('aria-label="Scrollable science diagram"'));
assert.equal(context.window.ALevelCompactLungs.render('a3','lungs',0), '');
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-selection-frequency.js', import.meta.url), 'utf8'), context);
const frequency=context.window.ALevelSelectionFrequency.render('a7','varsel',2);
assert.match(frequency, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
assert.match(frequency, /<figcaption>.{20,}<\/figcaption>/);
assert.equal(context.window.ALevelSelectionFrequency.render('a7','varsel',1), '');
vm.runInNewContext(readFileSync(new URL('../public/alevel/catchup-enzyme-denaturation.js', import.meta.url), 'utf8'), context);
for (const id of ['enzfactors','enzfactors2']) {
 const figure=context.window.ALevelEnzymeDenaturation.render('a1',id,0);
 assert.match(figure, /<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/);
 assert.match(figure, /<figcaption>.{20,}<\/figcaption>/);
}
assert.equal(context.window.ALevelEnzymeDenaturation.render('a1','enzfactors',1), '');
assert.equal(context.window.ALevelCatchupFigures.render('a1','sugars',2), '');
console.log('A-level molecular figure alternatives, captions, mapping and local image checked.');

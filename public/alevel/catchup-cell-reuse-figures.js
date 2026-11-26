/* Reuses course diagrams for related cell-transport concepts; adds two compact models. */
(function(){
 'use strict';
 const svgFigures={
  equal:{title:'Equal water potentials',alt:'A partially permeable membrane separates two solutions both at minus 450 kilopascals. Equal arrows show water molecules crossing in both directions; there is no net water movement.',caption:'Compare the two equal water potentials. Water molecules continue crossing in both directions, with no net movement. Equal arrows are a model of balanced movement.',art:`<text x="150" y="26" text-anchor="middle">Partially permeable membrane</text><path d="M150 52v158" stroke="#32776d" stroke-width="6"/><text x="72" y="83" text-anchor="middle">−450 kPa</text><text x="228" y="83" text-anchor="middle">−450 kPa</text><path d="M52 121h147m-8-6 8 6-8 6M208 162H61m8-6-8 6 8 6" stroke="#537a94" stroke-width="3" fill="none"/><text x="150" y="246" text-anchor="middle">No net water movement</text><text x="150" y="271" text-anchor="middle">Molecules still cross both ways</text>`},
  attachment:{title:'Virus attachment to a cell',alt:'A schematic virus has an attachment protein that binds a complementary receptor on the host cell surface. The interaction can allow entry by a mechanism specific to that virus.',caption:'Locate the complementary attachment protein and host-cell receptor. Binding can allow entry; how entry occurs depends on the virus.',art:`<circle cx="150" cy="74" r="41" fill="#e4f1ee" stroke="#32776d" stroke-width="3"/><path d="M140 114l10 43 10-43z" fill="#f1d0ad" stroke="#a76125" stroke-width="2"/><text x="150" y="30" text-anchor="middle">Virus</text><path d="M20 190h260" stroke="#537a94" stroke-width="6"/><path d="M139 157l11 13 11-13M150 170v20" fill="none" stroke="#a76125" stroke-width="4"/><text x="15" y="120">Attachment</text><text x="15" y="140">protein</text><path d="M83 144l57-6" stroke="#344958" stroke-width="2"/><text x="186" y="224">Receptor</text><path d="M187 211l-28-31" stroke="#344958" stroke-width="2"/><text x="150" y="267" text-anchor="middle">Host cell surface</text>`}
 };
 function own(key){const f=svgFigures[key];return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 290" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;}
 function render(topic,id,group){if(topic!=='a2')return '';const key=id+'/'+group;const g=window.ALevelGuidedFigures;const shared=window.ALevelCatchupFigures;
  // The absorption group also has a micelle figure; only the first figure explains co-transport here.
  const cotransport=()=> (shared?.render('a3','absorption',0)||'').match(/<figure\b[\s\S]*?<\/figure>/)?.[0]||'';
  if(key==='prok/2')return shared?.render('a2','hiv',0)||'';
  if(key==='active/0')return cotransport();
  if(key==='ctx2/1')return cotransport()+own('attachment');
  if(key==='osmchain/2')return shared?.render('a3','vessels',2)||'';
  if(key==='osmosis/0')return g?.render('osmosis',0)||'';
  if(['osmosis/1','osmchain/0','ctx2/2'].includes(key))return g?.render('osmosis',1)||'';
  if(key==='osmchain/1')return own('equal');
  return '';
 }
 window.ALevelCellReuseFigures={render};
})();

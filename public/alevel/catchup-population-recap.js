/* Carefully matched reuse for genetics and ecosystem recap blocks. */
(function(){
 'use strict';
 const diversity={title:'Diversity and a new selection pressure',alt:'A hypothetical model compares two populations before a new selection pressure. One contains heritable variants A, B and C; another contains only variant A. In this example only B survives the new condition, so the diverse population has a survivor while the other does not. Variation increases the chance of a suitable variant but does not guarantee survival.',caption:'Compare the heritable variants before the condition changes. Here B happens to survive; greater diversity can increase the chance of a suitable variant, but survival is not guaranteed. This is a hypothetical model.',art:`<text x="150" y="24" text-anchor="middle">Before a new pressure</text><text x="75" y="52" text-anchor="middle">More variants</text><text x="225" y="52" text-anchor="middle">One variant</text><g stroke="#537a94" stroke-width="2"><circle cx="35" cy="92" r="15" fill="#e3edf5"/><circle cx="75" cy="92" r="15" fill="#d7e9d4"/><circle cx="115" cy="92" r="15" fill="#f1dfc6"/><circle cx="185" cy="92" r="15" fill="#e3edf5"/><circle cx="225" cy="92" r="15" fill="#e3edf5"/><circle cx="265" cy="92" r="15" fill="#e3edf5"/></g><g text-anchor="middle"><text x="35" y="98">A</text><text x="75" y="98">B</text><text x="115" y="98">C</text><text x="185" y="98">A</text><text x="225" y="98">A</text><text x="265" y="98">A</text></g><text x="150" y="144" text-anchor="middle">Example: only B tolerates change</text><path d="M75 156v25m-6-7 6 7 6-7M225 156v25m-6-7 6 7 6-7" fill="none" stroke="#344958" stroke-width="2"/><circle cx="75" cy="210" r="15" fill="#d7e9d4" stroke="#537a94" stroke-width="2"/><text x="75" y="216" text-anchor="middle">B</text><text x="225" y="216" text-anchor="middle">No survivor</text><text x="150" y="268" text-anchor="middle">Outcome depends on the pressure</text>`};
 const pack=f=>`<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 290" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 window.ALevelPopulationRecap={render(topic,id,group){if(topic!=='a7')return '';const key=id+'/'+group,p=window.ALevelPopulationProcesses,i=window.ALevelInheritanceDetails,c=window.ALevelConservationDetails,n=window.ALevelEnergyNeuralFigures,f=window.ALevelPopulationFigures;
  if(key==='traps7/0')return (p?.render('a7','linkage',1)||'')+(i?.render('a7','sexlink',1)||'');
  if(key==='traps7/1')return (p?.render('a7','hardy',1)||'')+(p?.render('a7','speciation',0)||'');
  if(key==='traps7/2')return (c?.render('a7','speciation',2)||'')+(n?.render('a7','succession',0)||'');
  if(key==='traps7/3')return f?.render('a7','fieldwork',0)||'';
  if(key==='ctx7/0')return p?.render('a7','hardy',1)||'';
  if(key==='ctx7/1')return (p?.render('a7','linkage',1)||'')+(p?.render('a7','speciation',0)||'');
  if(key==='ctx7/2')return pack(diversity);
  return '';
 }};
})();

/* Original schematic A-level secondary structure and disulfide bridge models. */
(function () {
 "use strict";
 const wave=[];
 for(let i=0;i<=120;i++){
  const t=i*8*Math.PI/120;
  const x=(150+48*Math.sin(t)).toFixed(1), y=(49+175*i/120).toFixed(1);
  wave.push((i?'L':'M')+x+' '+y);
 }
 const figs=[{
  title:'Two secondary structures',
  alt:'A single polypeptide backbone is drawn as a coiled alpha helix, with short dashed links between adjacent turns indicating hydrogen bonds between backbone groups. Below it, three ribbon arrows point alternately up and down to show an antiparallel beta sheet; dashed lines between adjacent strands indicate hydrogen bonds between backbone groups. The drawing is schematic, not an atomic structure.',
  caption:'Compare the coiled α-helix with the β-sheet. Dashed lines represent hydrogen bonds between peptide-backbone groups. The sheet arrows show an antiparallel example; the shapes and bond positions are schematic.',
  height:450,
  art:`<text x="150" y="23" text-anchor="middle">α-helix · one backbone</text><path d="M198 62v39M198 106v38M198 150v38" stroke="#80588f" stroke-width="2" stroke-dasharray="5 5"/><path d="${wave.join(' ')}" stroke="#32776d" stroke-width="5" fill="none"/><text x="150" y="248" text-anchor="middle">β-sheet · adjacent strands</text><path d="M42 278h35v94l-17.5 23L42 372ZM132 301l17.5-23 17.5 23v94h-35ZM222 278h35v94l-17.5 23L222 372Z" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><path d="M78 310h53M78 339h53M78 368h53M168 310h53M168 339h53M168 368h53" stroke="#80588f" stroke-width="2" stroke-dasharray="5 5"/><text x="150" y="425" text-anchor="middle">Dashes: hydrogen bonds</text>`
 },{
  title:'A disulfide bridge in a folded chain',
  alt:'A single folded polypeptide backbone is shown in a simplified loop. Two cysteine side chains extend from separate parts of the backbone, and their sulfur atoms are connected by a covalent S–S disulfide bridge. Such bridges can stabilise a protein’s tertiary structure.',
  caption:'Follow the two cysteine side chains to the covalent S–S bridge. It can stabilise a folded polypeptide; hydrogen bonds and ionic interactions can also contribute. The chain shape is schematic.',
  height:300,
  art:`<text x="150" y="24" text-anchor="middle">One folded polypeptide</text><path d="M38 83C63 37 115 38 117 112C119 155 151 199 180 112C183 39 237 38 262 83" fill="none" stroke="#32776d" stroke-width="5"/><path d="M117 112v32M180 112v32" stroke="#80588f" stroke-width="3"/><text x="117" y="156" text-anchor="middle">S</text><text x="180" y="156" text-anchor="middle">S</text><path d="M127 150h43" stroke="#a76125" stroke-width="3"/><text x="150" y="200" text-anchor="middle">Disulfide bridge</text><path d="M150 183v-27" stroke="#344958" stroke-width="2"/><text x="150" y="244" text-anchor="middle">Cysteine side chains</text><text x="150" y="271" text-anchor="middle">S–S is a covalent bond</text>`
 }];
 window.ALevelProteinDetail={render(topic,id,group){
  if(topic!=='a1'||id!=='proteins'||group!==1)return '';
  return figs.map(f=>`<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`).join('');
 }};
})();

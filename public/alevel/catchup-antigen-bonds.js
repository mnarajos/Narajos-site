/* Original simplified antigen and bond comparisons for Paper 1 links. */
(function () {
 "use strict";
 const figures={
  "a4/linkp1/1": [{
   title:"A gene change can alter an antigen",
   alt:"Two schematic gene versions are compared: one contains a changed DNA segment. Each is connected to an antigen protein, shown with a different recognition-site shape in one possible outcome. A mutation can change an antigen's amino-acid sequence and shape, but it may also leave the antigen unchanged.",
   caption:"Compare one possible outcome of a mutation in an antigen-coding gene: a changed protein can present a different recognition site. Not every mutation changes the protein or the site; shapes are schematic.",
   height:315,
   art:`<text x="150" y="25" text-anchor="middle">One possible outcome</text><text x="75" y="58" text-anchor="middle">Original gene</text><text x="225" y="58" text-anchor="middle">Changed gene</text><path d="M27 88h96M177 88h96" stroke="#537a94" stroke-width="7"/><path d="M219 81v14" stroke="#a76125" stroke-width="6"/><path d="M75 103v24m-6-7 6 7 6-7M225 103v24m-6-7 6 7 6-7" stroke="#344958" stroke-width="2" fill="none"/><circle cx="75" cy="174" r="37" fill="#d9e8ca" stroke="#4b8361" stroke-width="2"/><circle cx="225" cy="174" r="37" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><path d="M61 140l14-17 14 17Z" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><path d="M212 126h26v14h-26z" fill="#d5c4e2" stroke="#80588f" stroke-width="2"/><text x="75" y="242" text-anchor="middle">Antigen</text><text x="225" y="242" text-anchor="middle">Antigen</text><text x="150" y="282" text-anchor="middle">Recognition sites shown at top</text>`
  },{
   title:"Compare recurring bonds",
   alt:"Four bond models are compared. A glycosidic C–O–C link joins carbohydrate units through an oxygen. An ester contains carbon double-bonded to oxygen followed by oxygen. A peptide contains carbon double-bonded to oxygen followed by nitrogen. A dotted line shows one hydrogen bond from an oxygen-bonded hydrogen to another oxygen. R denotes the rest of a molecule; the sugar units are simplified.",
   caption:"Locate each link: glycosidic in carbohydrates, ester in lipids, peptide in proteins, and hydrogen bonds between suitable groups such as water molecules. R represents the rest of a molecule; structures are simplified.",
   height:345,
   art:`<text x="18" y="55">Glycosidic</text><text x="142" y="55">R–C–O–C–R′</text><path d="M18 77h264" stroke="#d6e1de" stroke-width="2"/><text x="18" y="116">Ester</text><text x="142" y="116">R–C(=O)–O–R′</text><path d="M18 139h264" stroke="#d6e1de" stroke-width="2"/><text x="18" y="178">Peptide</text><text x="130" y="178">R–C(=O)–NH–R′</text><path d="M18 201h264" stroke="#d6e1de" stroke-width="2"/><text x="18" y="237">Hydrogen</text><text x="18" y="259">bond</text><text x="143" y="248">O–H</text><path d="M180 242h24" stroke="#80588f" stroke-width="3" stroke-dasharray="4 4"/><text x="213" y="248">O</text><text x="150" y="314" text-anchor="middle">Dotted line: hydrogen bond</text>`
  }]
 };
 window.ALevelAntigenBonds={render(topic,id,group){
  const list=figures[topic+"/"+id+"/"+group];if(!list)return "";
  return list.map(f=>`<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`).join("");
 }};
})();

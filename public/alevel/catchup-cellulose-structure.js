/* Original schematic of cellulose chain orientation and intermolecular bonding. */
(function () {
 "use strict";
 window.ALevelCelluloseStructure={render(topic,id,group){
  if(topic!=='a1'||id!=='polysac'||group!==1)return '';
  const positions=[48,116,184,252];
  const chain=y=>positions.map((x,i)=>`<path d="M${x-25} ${y}l12-21h26l12 21-12 21h-26Z" fill="#d9eee4" stroke="#4a8663" stroke-width="2"/><circle cx="${x}" cy="${y+(i%2?10:-10)}" r="4" fill="#9a6134"/>`).join('')+positions.slice(0,-1).map(x=>`<path d="M${x+25} ${y}h18" stroke="#344958" stroke-width="2"/>`).join('');
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>Alternating units in cellulose</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 275" role="img" aria-label="Two parallel cellulose chains are shown as simplified hexagons linked into straight chains. Markers alternate between the top and bottom of successive beta-glucose units to show that alternate units are inverted. Dashed lines between the chains represent hydrogen bonds. The markers are orientation cues, not atoms, and the hexagons are not full chemical structures." xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c"><text x="150" y="24" text-anchor="middle">β-glucose units in two chains</text>${chain(65)}<path d="M48 86v58M116 86v58M184 86v58M252 86v58" stroke="#80588f" stroke-width="2" stroke-dasharray="5 5"/>${chain(165)}<text x="150" y="217" text-anchor="middle">Dots: alternating orientation</text><text x="150" y="246" text-anchor="middle">Dashes: hydrogen bonds</text></svg></div><figcaption>Follow the markers along each chain: alternate β-glucose units are inverted. Hydrogen bonds between cellulose chains help form strong fibres. Hexagons and markers are schematic, not full chemical structures.</figcaption></figure>`;
 }};
})();

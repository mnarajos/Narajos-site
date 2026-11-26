/* Original schematic top views of lateral membrane movement. */
(function () {
 "use strict";
 const xs=[70,110,150,190,230];
 function patch(top,lipidX,proteinX){
  let art=`<rect x="45" y="${top}" width="210" height="125" rx="8" fill="#f2f7f6" stroke="#789c94" stroke-width="2"/>`;
  [top+30,top+65,top+100].forEach((y,row)=>xs.forEach(x=>{
   if(row===1&&x===proteinX)return;
   if(row===0&&x===lipidX){art+=`<circle cx="${x}" cy="${y}" r="11" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><text x="${x}" y="${y+6}" text-anchor="middle">A</text>`;return;}
   art+=`<circle cx="${x}" cy="${y}" r="9" fill="#bfe4dc" stroke="#32776d" stroke-width="2"/>`;
  }));
  art+=`<rect x="${proteinX-12}" y="${top+53}" width="24" height="24" rx="4" fill="#d5c4e2" stroke="#80588f" stroke-width="2"/><text x="${proteinX}" y="${top+71}" text-anchor="middle">P</text>`;
  return art;
 }
 window.ALevelMembraneFluidity={render(topic,id,group){
  if(topic!=='a2'||id!=='membrane'||group!==0)return '';
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>Movement within the membrane</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 450" role="img" aria-label="Two schematic top views show the same membrane patch at two moments. A labelled phospholipid head A has moved sideways within the same leaflet, and a labelled membrane protein P has also moved sideways. Other heads are represented as circles. The lower leaflet and the rest of each molecule are not shown; movement across the bilayer is not depicted and some proteins are anchored." xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c"><text x="150" y="24" text-anchor="middle">Before · top view</text>${patch(50,110,150)}<path d="M110 62h40m-7-6 7 6-7 6M150 133h40m-7-6 7 6-7 6" fill="none" stroke="#a76125" stroke-width="2"/><path d="M150 184v18m-6-6 6 6 6-6" stroke="#344958" stroke-width="2" fill="none"/><text x="150" y="225" text-anchor="middle">Later · same leaflet</text>${patch(245,150,190)}<text x="150" y="407" text-anchor="middle">A = lipid head · P = protein</text><text x="150" y="433" text-anchor="middle">Positions are schematic</text></svg></div><figcaption>Track A and P between the two views: a phospholipid and some proteins can move sideways in the membrane. This top view shows one leaflet; no movement across the bilayer is depicted, and some proteins are anchored.</figcaption></figure>`;
 }};
})();

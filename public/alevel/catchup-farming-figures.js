/* Original schematic diagrams of farming and energy transfer. */
(function () {
 "use strict";
 const figures={
  "a5/farming/0": [{
   title:"Crop energy can follow different paths",
   alt:"A crop has arrows to people who eat it and to an insect pest that feeds on it. The pest-feeding arrow is dashed to show that pest management can reduce this route. Reducing pest damage can leave more crop available for people; the diagram does not show every food-web link.",
   caption:"Follow both routes from the crop. Reducing feeding by pests can leave more of the crop available to people. The food web is simplified; pest control can also affect other organisms.",
   height:300,
   art:`<text x="150" y="24" text-anchor="middle">Chemical energy in crop</text><path d="M150 133V63M150 96Q116 96 116 71Q146 71 150 96M150 117Q184 117 184 90Q154 90 150 117" fill="#a6d3ab" stroke="#4b8361" stroke-width="3"/><path d="M130 140L67 188m3-10-3 10 10 1M170 140l63 48m-10 1 10-1-3-10" fill="none" stroke="#344958" stroke-width="3"/><path d="M170 140l63 48" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="5 5"/><circle cx="58" cy="214" r="12" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><path d="M58 226v30m-15-18h30m-15 18-12 15m12-15 12 15" stroke="#a76125" stroke-width="3"/><g fill="#d9e8ca" stroke="#4b8361" stroke-width="2"><circle cx="222" cy="221" r="10"/><circle cx="238" cy="221" r="10"/><circle cx="254" cy="221" r="10"/></g><text x="58" y="291" text-anchor="middle">People</text><text x="239" y="259" text-anchor="middle">Pest feeding</text><text x="239" y="281" text-anchor="middle">can be reduced</text>`
  },{
   title:"Crops and weeds compete",
   alt:"A crop and a weed have arrows from shared light, water and mineral ions. They compete for these limited resources. Reducing weed competition can leave more resources available to the crop.",
   caption:"Compare the two plants using the same resources. Reducing weed competition can increase the resources available to the crop; herbicide use may have environmental effects.",
   height:280,
   art:`<text x="150" y="26" text-anchor="middle">Light · water · mineral ions</text><path d="M113 45L77 101m-1-10 1 10 9-4M187 45l36 56m-9-4 9 4 1-10" stroke="#344958" stroke-width="2" fill="none"/><path d="M76 203v-80M76 167Q42 167 42 140Q72 140 76 167M76 147Q107 147 107 121Q79 121 76 147" fill="#a6d3ab" stroke="#4b8361" stroke-width="3"/><path d="M224 203v-80M224 167Q190 167 190 140Q220 140 224 167M224 147Q255 147 255 121Q227 121 224 147" fill="#d9e8ca" stroke="#789464" stroke-width="3"/><path d="M26 205h248" stroke="#805d45" stroke-width="3"/><text x="76" y="239" text-anchor="middle">Crop</text><text x="224" y="239" text-anchor="middle">Weed</text>`
  }],
  "a5/farming/1": [{
   title:"Energy available for livestock growth",
   alt:"Feed transfers chemical energy to livestock. Some is transferred in respiration to support movement and maintain body temperature, while some is stored in new biomass. Warm housing and reduced activity can reduce energy transferred by these processes, leaving more available for growth; energy is also lost in waste.",
   caption:"Follow energy from feed into the animal. Warm housing and less movement can reduce energy transferred in respiration, leaving more available for growth. Waste is another loss; arrows are not quantitative. Animal welfare also matters when choosing housing and activity levels.",
   height:345,
   art:`<text x="150" y="25" text-anchor="middle">Chemical energy in feed</text><path d="M150 37v24m-6-7 6 7 6-7" stroke="#344958" stroke-width="2" fill="none"/><ellipse cx="150" cy="99" rx="65" ry="32" fill="#e8c4bd" stroke="#a76125" stroke-width="2"/><circle cx="212" cy="88" r="16" fill="#e8c4bd" stroke="#a76125" stroke-width="2"/><path d="M111 124v16M178 124v16" stroke="#a76125" stroke-width="4"/><text x="150" y="104" text-anchor="middle">Livestock</text><path d="M112 140L54 181m1-10-1 10 10-1M150 141v40m-6-7 6 7 6-7M188 140l58 41m-10-1 10 1-1-10" stroke="#344958" stroke-width="2" fill="none"/><text x="48" y="205" text-anchor="middle">Heat and</text><text x="48" y="226" text-anchor="middle">activity</text><text x="150" y="205" text-anchor="middle">Growth</text><text x="150" y="226" text-anchor="middle">(biomass)</text><text x="247" y="205" text-anchor="middle">Waste</text><text x="150" y="271" text-anchor="middle">Warm housing and less movement</text><text x="150" y="297" text-anchor="middle">can reduce respiratory transfers</text><text x="150" y="324" text-anchor="middle">and leave more for growth</text>`
  }]
 };
 window.ALevelFarmingFigures={render(topic,id,group){
  const list=figures[topic+"/"+id+"/"+group];if(!list)return "";
  return list.map(f=>`<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`).join("");
 }};
})();

/* Original models for surface-to-volume ratio and evaluating risk data. */
(function () {
 "use strict";
 const figures={
  "a3/sav/2": [{
   title:"Size, surface area and heat loss",
   alt:"Two same-shaped cube models are compared. A cube of side one unit has surface area six square units, volume one cubic unit and surface area to volume ratio six to one. A cube of side two units has surface area 24 square units, volume eight cubic units and ratio three to one. The smaller model has more surface per unit volume; small mammals similarly tend to lose heat faster relative to their mass and need a higher metabolic rate per unit mass.",
   caption:"Compare the ratios, not just the total surface areas. The smaller model has more surface per unit volume. Small mammals generally need more energy per unit mass to replace heat lost; body shape, insulation and surroundings also matter.",
   height:330,
   art:`<text x="150" y="24" text-anchor="middle">Same shape · different size</text><path d="M32 110l12-12h50l-12 12ZM82 110l12-12v50l-12 12ZM32 110h50v50H32Z" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><path d="M157 89l20-20h100l-20 20ZM257 89l20-20v100l-20 20ZM157 89h100v100h-100Z" fill="#d9e9df" stroke="#4b8361" stroke-width="2"/><text x="57" y="195" text-anchor="middle">Side 1</text><text x="204" y="213" text-anchor="middle">Side 2</text><text x="57" y="222" text-anchor="middle">Area 6</text><text x="204" y="240" text-anchor="middle">Area 24</text><text x="57" y="247" text-anchor="middle">Volume 1</text><text x="204" y="265" text-anchor="middle">Volume 8</text><text x="57" y="280" text-anchor="middle">Ratio 6 : 1</text><text x="204" y="298" text-anchor="middle">Ratio 3 : 1</text>`
  }],
  "a3/cvd/0": [{
   title:"Reading a risk-factor association",
   alt:"A schematic scatterplot with hypothetical points shows a positive association: as a risk-factor level increases, disease incidence tends to increase, although points are scattered. Axes are qualitative and the points are not real study results.",
   caption:"Notice the overall trend and the spread of points. This illustrative pattern is an association, not proof that the risk factor alone caused the disease; use real units and incidence data when provided.",
   height:300,
   art:`<text x="150" y="24" text-anchor="middle">Illustrative data pattern</text><text x="15" y="51">Disease incidence</text><path d="M49 67v161h223" stroke="#344958" stroke-width="2" fill="none"/><g fill="#32776d"><circle cx="74" cy="203" r="5"/><circle cx="91" cy="188" r="5"/><circle cx="111" cy="199" r="5"/><circle cx="125" cy="159" r="5"/><circle cx="146" cy="169" r="5"/><circle cx="166" cy="145" r="5"/><circle cx="181" cy="130" r="5"/><circle cx="199" cy="145" r="5"/><circle cx="217" cy="108" r="5"/><circle cx="240" cy="96" r="5"/></g><text x="160" y="266" text-anchor="middle">Risk-factor level →</text>`
  }],
  "a3/cvd/1": [{
   title:"A possible confounder",
   alt:"A diagram shows that age distribution may affect both blood pressure and cardiovascular disease risk. A dashed double-headed line indicates an observed association between blood pressure and cardiovascular disease risk. A study must consider age and other variables before interpreting the relationship; high blood pressure can itself affect cardiovascular disease risk.",
   caption:"Trace the two arrows from age distribution: it may influence both variables. High blood pressure can affect cardiovascular risk, but an observed association alone cannot establish how much is causal; consider confounders, sample size and other studies.",
   height:300,
   art:`<circle cx="150" cy="58" r="36" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><text x="150" y="53" text-anchor="middle">Age</text><text x="150" y="73" text-anchor="middle">mix</text><path d="M122 84L70 152m0-10v10l10-3M178 84l52 68m-10-3 10 3v-10" stroke="#344958" stroke-width="2" fill="none"/><circle cx="60" cy="193" r="43" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><circle cx="240" cy="193" r="43" fill="#e8c4bd" stroke="#a76125" stroke-width="2"/><text x="60" y="188" text-anchor="middle">Blood</text><text x="60" y="208" text-anchor="middle">pressure</text><text x="240" y="188" text-anchor="middle">CVD</text><text x="240" y="208" text-anchor="middle">risk</text><path d="M105 193h90m-7-6 7 6-7 6m-76-12-7 6 7 6" stroke="#754b84" stroke-width="2" stroke-dasharray="5 4" fill="none"/><text x="150" y="269" text-anchor="middle">Observed association</text>`
  }]
 };
 window.ALevelRiskSurfaceFigures={render(topic,id,group){
  const list=figures[topic+"/"+id+"/"+group];if(!list)return "";
  return list.map(f=>`<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`).join("");
 }};
})();

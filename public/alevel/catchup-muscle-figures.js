/* Original, schematic A-level muscle and synaptic-integration figures. */
(function () {
 "use strict";
 const figures={
  "a6/summation/0": [{
   title:"Spatial and temporal summation",
   alt:"Spatial summation is illustrated by signals from several presynaptic neurones arriving at one postsynaptic neurone. Temporal summation is illustrated by repeated signals from one presynaptic neurone arriving close together in time. The resulting postsynaptic changes can add toward threshold.",
   caption:"Compare the sources: spatial summation combines inputs from different neurones; temporal summation combines closely spaced inputs from one neurone. Either can help reach threshold.",
   art:`<text x="150" y="25" text-anchor="middle">Spatial: several inputs</text><g fill="#cbdcf0" stroke="#537a94" stroke-width="2"><circle cx="63" cy="58" r="14"/><circle cx="150" cy="58" r="14"/><circle cx="237" cy="58" r="14"/></g><path d="M68 74l68 44M150 74v40M232 74l-68 44" stroke="#537a94" stroke-width="2"/><circle cx="150" cy="127" r="14" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><path d="M30 153h240" stroke="#d6e1de" stroke-width="2"/><text x="150" y="177" text-anchor="middle">Temporal: repeated input</text><circle cx="70" cy="218" r="14" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><path d="M91 218h110m-7-6 7 6-7 6" stroke="#537a94" stroke-width="3" fill="none"/><path d="M116 198v-12M143 198v-12M170 198v-12" stroke="#a76125" stroke-width="3"/><circle cx="230" cy="218" r="14" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><text x="150" y="261" text-anchor="middle">Postsynaptic neurone</text>`
  },{
   title:"An inhibitory synapse",
   alt:"An inhibitory transmitter acts on a postsynaptic membrane. Chloride enters and potassium leaves, making the inside more negative; this hyperpolarisation makes an action potential less likely.",
   caption:"Follow chloride into and potassium out of the postsynaptic cell. The resulting hyperpolarisation makes threshold less likely to be reached.",
   art:`<text x="150" y="25" text-anchor="middle">Outside postsynaptic cell</text><path d="M25 110h250M25 150h250" stroke="#32776d" stroke-width="4"/><rect x="77" y="102" width="42" height="56" rx="10" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><rect x="181" y="102" width="42" height="56" rx="10" fill="#e9d5ac" stroke="#a5792e" stroke-width="2"/><path d="M98 66v120m-7-8 7 8 7-8M202 186V66m-7 8 7-8 7 8" stroke="#344958" stroke-width="3" fill="none"/><text x="98" y="57" text-anchor="middle">Cl⁻ in</text><text x="202" y="57" text-anchor="middle">K⁺ out</text><text x="150" y="223" text-anchor="middle">Inside becomes more negative</text><text x="150" y="250" text-anchor="middle">Hyperpolarisation</text>`
  }],
  "a6/muscle/0": [{
   title:"Muscle is built from repeating units",
   alt:"A muscle contains muscle fibres; each fibre contains myofibrils. A myofibril contains repeating sarcomeres between adjacent Z lines.",
   caption:"Move from the whole muscle to a fibre, then a myofibril. The myofibril is made of repeating sarcomeres; the sizes are not to scale.",
   art:`<path d="M33 55q40-27 89 0q-40 27-89 0Z" fill="#e8c4bd" stroke="#a76125" stroke-width="2"/><text x="75" y="95" text-anchor="middle">Muscle</text><path d="M133 55h25m-7-6 7 6-7 6" stroke="#344958" stroke-width="2" fill="none"/><rect x="171" y="43" width="91" height="24" rx="12" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><text x="216" y="95" text-anchor="middle">Fibre</text><path d="M150 110v25m-6-7 6 7 6-7" stroke="#344958" stroke-width="2" fill="none"/><rect x="38" y="152" width="224" height="20" rx="10" fill="#d5c4e2" stroke="#80588f" stroke-width="2"/><path d="M75 148v28M130 148v28M185 148v28M240 148v28" stroke="#344958" stroke-width="3"/><text x="150" y="209" text-anchor="middle">Myofibril · repeated units</text><path d="M130 224h55m-6-6 6 6-6 6M130 224l6-6m-6 6 6 6" stroke="#344958" stroke-width="2" fill="none"/><text x="150" y="258" text-anchor="middle">One sarcomere</text>`
  }],
  "a6/muscle/1": [{
   title:"Filament overlap as a sarcomere shortens",
   alt:"Two schematic sarcomeres show actin thin filaments extending inward from the Z lines and a myosin thick filament in the centre. In the shortened sarcomere the Z lines are closer together and actin overlaps more of myosin. The myosin length and A band stay the same; actin-only I bands and the central myosin-only H zone are shorter.",
   caption:"Compare the two panels: the Z lines move closer and overlap increases. The A band, defined by the myosin length, is unchanged; the I bands and H zone are shorter. Filaments themselves do not shorten.",
   height:360,
   art:`<text x="150" y="20" text-anchor="middle">Less shortened</text><path d="M40 32v66M260 32v66" stroke="#344958" stroke-width="4"/><path d="M40 50h85M260 50h-85" stroke="#32776d" stroke-width="5"/><path d="M105 76h90" stroke="#a76125" stroke-width="12"/><path d="M40 87v7h65v-7M125 87v7h50v-7" stroke="#537a94" stroke-width="2" fill="none"/><text x="72" y="113" text-anchor="middle">I</text><text x="150" y="113" text-anchor="middle">H</text><path d="M105 123v7h90v-7" stroke="#a76125" stroke-width="2" fill="none"/><text x="150" y="150" text-anchor="middle">A band</text><text x="40" y="116" text-anchor="middle">Z</text><text x="260" y="116" text-anchor="middle">Z</text><text x="150" y="177" text-anchor="middle">More shortened</text><path d="M60 190v66M240 190v66" stroke="#344958" stroke-width="4"/><path d="M60 208h85M240 208h-85" stroke="#32776d" stroke-width="5"/><path d="M105 234h90" stroke="#a76125" stroke-width="12"/><path d="M60 245v7h45v-7M145 245v7h10v-7" stroke="#537a94" stroke-width="2" fill="none"/><text x="82" y="271" text-anchor="middle">I</text><text x="150" y="271" text-anchor="middle">H</text><path d="M105 282v7h90v-7" stroke="#a76125" stroke-width="2" fill="none"/><text x="150" y="308" text-anchor="middle">A unchanged</text><text x="60" y="274" text-anchor="middle">Z</text><text x="240" y="274" text-anchor="middle">Z</text><text x="150" y="343" text-anchor="middle">Thin actin · thick myosin</text>`
  }],
  "a6/sliding/0": [{
   title:"Calcium exposes binding sites",
   alt:"A simplified comparison shows tropomyosin covering myosin-binding sites on an actin filament. Calcium released from the sarcoplasmic reticulum causes tropomyosin to move, exposing the sites.",
   caption:"Compare the two views of actin: calcium causes tropomyosin to move away, exposing myosin-binding sites. The positions and sizes are schematic.",
   art:`<text x="150" y="25" text-anchor="middle">Before calcium signal</text><g fill="#cbdcf0" stroke="#537a94" stroke-width="2"><circle cx="62" cy="67" r="15"/><circle cx="106" cy="67" r="15"/><circle cx="150" cy="67" r="15"/><circle cx="194" cy="67" r="15"/><circle cx="238" cy="67" r="15"/></g><path d="M43 67h214" stroke="#a76125" stroke-width="8"/><text x="150" y="113" text-anchor="middle">Tropomyosin covers sites</text><path d="M150 124v23m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="171" text-anchor="middle">Calcium causes movement</text><g fill="#cbdcf0" stroke="#537a94" stroke-width="2"><circle cx="62" cy="214" r="15"/><circle cx="106" cy="214" r="15"/><circle cx="150" cy="214" r="15"/><circle cx="194" cy="214" r="15"/><circle cx="238" cy="214" r="15"/></g><path d="M43 190h214" stroke="#a76125" stroke-width="8"/><g fill="#344958"><circle cx="62" cy="214" r="4"/><circle cx="106" cy="214" r="4"/><circle cx="150" cy="214" r="4"/><circle cx="194" cy="214" r="4"/><circle cx="238" cy="214" r="4"/></g><text x="150" y="264" text-anchor="middle">Binding sites exposed</text>`
  }],
  "a6/sliding/1": [{
   title:"Cross-bridge and power stroke",
   alt:"A myosin head binds an exposed site on actin. The head then pivots while attached, pulling the actin filament toward the centre of the sarcomere. Phosphate and then ADP are released; energy stored in the head powers the movement.",
   caption:"Follow the attached myosin head as it pivots and pulls actin toward the sarcomere centre. Pi and then ADP are released; the head detaches later when ATP binds.",
   art:`<text x="150" y="25" text-anchor="middle">1 · Head binds actin</text><path d="M42 64h216" stroke="#537a94" stroke-width="8"/><path d="M70 112h160" stroke="#a76125" stroke-width="12"/><path d="M150 106l26-38" stroke="#a76125" stroke-width="8"/><circle cx="176" cy="68" r="8" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><text x="150" y="145" text-anchor="middle">2 · Head pivots while attached</text><path d="M20 183h216" stroke="#537a94" stroke-width="8"/><path d="M70 231h160" stroke="#a76125" stroke-width="12"/><path d="M150 225l4-38" stroke="#a76125" stroke-width="8"/><circle cx="154" cy="187" r="8" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><path d="M112 164H58m7-6-7 6 7 6" stroke="#32776d" stroke-width="3" fill="none"/><text x="150" y="270" text-anchor="middle">Actin pulled toward centre ←</text>`
  }],
  "a6/sliding/2": [{
   title:"ATP detaches and recocks myosin",
   alt:"A myosin head attached to actin binds ATP and detaches. ATP hydrolysis to ADP and inorganic phosphate recocks the detached head, leaving it ready to bind a further site.",
   caption:"Keep the roles distinct: ATP binding detaches myosin; ATP hydrolysis provides energy to recock the detached head. ADP and Pi remain associated before the next binding.",
   height:350,
   art:`<text x="150" y="25" text-anchor="middle">Head attached to actin</text><path d="M45 55h210" stroke="#537a94" stroke-width="7"/><path d="M150 96l25-37" stroke="#a76125" stroke-width="7"/><circle cx="175" cy="59" r="7" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><text x="150" y="124" text-anchor="middle">ATP binds → detaches</text><path d="M45 145h210" stroke="#537a94" stroke-width="7"/><path d="M150 190l-18-27" stroke="#a76125" stroke-width="7"/><circle cx="132" cy="163" r="7" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><text x="150" y="218" text-anchor="middle">ATP hydrolysed → recock</text><path d="M45 240h210" stroke="#537a94" stroke-width="7"/><path d="M150 288l27-31" stroke="#a76125" stroke-width="7"/><circle cx="177" cy="257" r="7" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><text x="150" y="330" text-anchor="middle">ADP + Pi remain on head</text>`
  }],
  "a6/sliding/3": [{
   title:"Calcium is returned to storage",
   alt:"When stimulation stops, calcium ions are actively transported from the muscle cell's cytoplasm back into the sarcoplasmic reticulum. Tropomyosin again covers the binding sites on actin.",
   caption:"Follow calcium back into the sarcoplasmic reticulum by active transport. As calcium falls around the filaments, tropomyosin again covers binding sites.",
   art:`<text x="150" y="25" text-anchor="middle">Cytoplasm</text><g fill="#a76125"><circle cx="90" cy="51" r="6"/><circle cx="150" cy="51" r="6"/><circle cx="210" cy="51" r="6"/></g><path d="M150 66v44m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><rect x="38" y="119" width="224" height="63" rx="12" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><text x="150" y="145" text-anchor="middle">Sarcoplasmic reticulum</text><text x="150" y="168" text-anchor="middle">calcium stored</text><text x="150" y="213" text-anchor="middle">Active transport uses ATP</text><text x="150" y="249" text-anchor="middle">Sites are covered again</text>`
  }],
  "a6/fibres/0": [{
   title:"Phosphocreatine regenerates ATP",
   alt:"Phosphocreatine transfers a phosphate group to ADP, regenerating ATP in muscle. This can supply ATP rapidly for a short period without needing oxygen directly in this reaction.",
   caption:"Follow the transferred phosphate: phosphocreatine can rapidly regenerate ATP from ADP for a short burst. This step does not directly require oxygen.",
   art:`<text x="150" y="25" text-anchor="middle">Muscle cell</text><text x="150" y="70" text-anchor="middle">Phosphocreatine</text><circle cx="150" cy="95" r="12" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><text x="150" y="101" text-anchor="middle">P</text><path d="M150 112v39m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="184" text-anchor="middle">ADP + P → ATP</text><text x="150" y="229" text-anchor="middle">Rapid, short-term supply</text><text x="150" y="257" text-anchor="middle">Creatine remains</text>`
  }],
  "a6/fibres/1": [{
   title:"Slow and fast fibres compared",
   alt:"A schematic comparison shows a slow-twitch fibre with many mitochondria, supporting sustained aerobic activity, and a fast-twitch fibre with abundant glycogen and phosphocreatine stores, suited to brief powerful activity. The symbols are qualitative, not measurements.",
   caption:"Compare the features with the job: slow fibres support endurance; fast fibres support brief powerful activity but fatigue more quickly. Symbols are qualitative, not measured counts.",
   art:`<text x="150" y="25" text-anchor="middle">Slow twitch · endurance</text><rect x="40" y="43" width="220" height="59" rx="25" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><g fill="#a76125"><ellipse cx="77" cy="71" rx="9" ry="5"/><ellipse cx="111" cy="71" rx="9" ry="5"/><ellipse cx="145" cy="71" rx="9" ry="5"/><ellipse cx="179" cy="71" rx="9" ry="5"/><ellipse cx="213" cy="71" rx="9" ry="5"/></g><text x="150" y="132" text-anchor="middle">Many mitochondria · aerobic</text><path d="M30 145h240" stroke="#d6e1de" stroke-width="2"/><text x="150" y="170" text-anchor="middle">Fast twitch · short bursts</text><rect x="40" y="187" width="220" height="59" rx="25" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><g fill="#80588f"><path d="M80 207l9 9-9 9-9-9Z"/><path d="M125 207l9 9-9 9-9-9Z"/><path d="M170 207l9 9-9 9-9-9Z"/><path d="M215 207l9 9-9 9-9-9Z"/></g><text x="150" y="276" text-anchor="middle">Glycogen + phosphocreatine</text>`
  }]
 };
 // The two sliding-filament catch-up concepts present the same four groups.
 [0,1,2,3].forEach(function(i){figures["a6/sliding2/"+i]=figures["a6/sliding/"+i];});
 // The slow-twitch fact is paired with phosphocreatine in the first block.
 figures["a6/fibres/0"].push(figures["a6/fibres/1"][0]);
 window.ALevelMuscleFigures={render(topic,id,group){
  const list=figures[topic+"/"+id+"/"+group];if(!list)return "";
  return list.map(f=>`<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height || 290}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`).join("");
 }};
})();

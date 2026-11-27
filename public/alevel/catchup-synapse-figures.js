/* Original cholinergic synapse teaching diagrams. Structures and distances are schematic. */
(function () {
 "use strict";
 const figures = [
  {
   title: "Calcium triggers transmitter release",
   alt: "An action potential reaches a presynaptic terminal. Calcium ions enter through opened channels. A vesicle containing acetylcholine fuses with the presynaptic membrane and releases acetylcholine into the synaptic cleft by exocytosis.",
   caption: "Follow calcium into the terminal, then follow acetylcholine from a vesicle into the cleft. The terminal, channels and molecules are not to scale.",
   art: `<text x="150" y="24" text-anchor="middle">Presynaptic terminal</text><path d="M25 126h250" stroke="#537a94" stroke-width="5"/><rect x="45" y="107" width="35" height="38" fill="#d2e0f2" stroke="#537a94" stroke-width="2"/><path d="M63 182V98m-6 7 6-7 6 7" stroke="#a76125" stroke-width="3" fill="none"/><text x="63" y="203" text-anchor="middle">Ca²⁺ in</text><circle cx="166" cy="90" r="20" fill="#f1dfc6" stroke="#a5792e" stroke-width="2"/><g fill="#a76125"><circle cx="158" cy="88" r="3"/><circle cx="171" cy="88" r="3"/><circle cx="166" cy="99" r="3"/></g><path d="M166 112v24m-6-7 6 7 6-7" stroke="#344958" stroke-width="2" fill="none"/><g fill="#a76125"><circle cx="157" cy="160" r="4"/><circle cx="173" cy="174" r="4"/><circle cx="188" cy="158" r="4"/></g><text x="213" y="79" text-anchor="middle">Vesicle</text><text x="150" y="244" text-anchor="middle">Acetylcholine in cleft</text><text x="168" y="51" text-anchor="middle">Action potential arrives</text>`
  },
  {
   title: "Acetylcholine opens channels",
   height: 315,
   alt: "In the synaptic cleft, acetylcholine diffuses to a receptor on the postsynaptic membrane and binds on the outside. This opens the receptor channel. Sodium ions then enter the postsynaptic cell through the channel, depolarising it. The drawing is schematic, and shows sodium movement rather than every ion passing through the channel.",
   caption: "The diamond represents acetylcholine (ACh); it binds to the receptor outside the cell. Follow the orange arrow: sodium enters through the opened channel and depolarises the postsynaptic membrane. Shapes are schematic.",
   art: `<text x="150" y="24" text-anchor="middle">Synaptic cleft</text><path d="M55 48l9 9-9 9-9-9z" fill="#d7c8e8" stroke="#76518a" stroke-width="2"/><text x="73" y="63">ACh</text><path d="M65 72l40 40m-2-10 2 10-10-2" fill="none" stroke="#344958" stroke-width="2"/><text x="177" y="73">Na⁺</text><circle cx="160" cy="68" r="6" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><path d="M25 172h250" stroke="#537a94" stroke-width="5"/><rect x="100" y="140" width="100" height="62" rx="8" fill="#d2e0f2" stroke="#537a94" stroke-width="2"/><path d="M155 141v60" stroke="#fff" stroke-width="16"/><path d="M120 123l9 9-9 9-9-9z" fill="#d7c8e8" stroke="#76518a" stroke-width="2"/><path d="M160 83v140m-7-8 7 8 7-8" fill="none" stroke="#a76125" stroke-width="3"/><text x="205" y="125">Receptor</text><path d="M205 132l-19 8" stroke="#344958" stroke-width="2"/><text x="150" y="254" text-anchor="middle">Na⁺ enters the cell</text><text x="150" y="279" text-anchor="middle">Membrane depolarises</text>`
  },
  {
   title: "Ending the signal",
   alt: "Acetylcholinesterase in the synaptic cleft hydrolyses acetylcholine into choline and acetate. Choline can be taken back into the presynaptic terminal and used to remake acetylcholine.",
   caption: "Follow acetylcholine to its breakdown products. Removing it from the cleft ends receptor stimulation; choline can be taken back for reuse.",
   art: `<text x="150" y="24" text-anchor="middle">Synaptic cleft</text><circle cx="55" cy="52" r="9" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><circle cx="72" cy="52" r="9" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><text x="182" y="59" text-anchor="middle">Acetylcholine</text><path d="M150 68v31m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="124" text-anchor="middle">Acetylcholinesterase</text><text x="150" y="148" text-anchor="middle">hydrolyses it</text><path d="M150 156v27m-6-7 6 7 6-7" stroke="#344958" stroke-width="3" fill="none"/><circle cx="52" cy="202" r="9" fill="#e9bd8d" stroke="#a76125" stroke-width="2"/><circle cx="78" cy="202" r="9" fill="#cbdcf0" stroke="#537a94" stroke-width="2"/><text x="184" y="208" text-anchor="middle">Choline + acetate</text><path d="M150 219v22m-6-7 6 7 6-7" stroke="#32776d" stroke-width="3" fill="none"/><text x="150" y="267" text-anchor="middle">Choline can be taken back</text>`
  },
  {
   title: "Why transmission is one-way",
   alt: "A cholinergic synapse is shown with acetylcholine-filled vesicles on the presynaptic side and acetylcholine receptors on the postsynaptic membrane. The signal travels from the presynaptic cell across the cleft to the postsynaptic cell.",
   caption: "Compare the two sides: transmitter vesicles are presynaptic and the receptors that respond are postsynaptic, so transmission across this synapse is one-way.",
   art: `<text x="150" y="24" text-anchor="middle">Presynaptic side</text><g fill="#f1dfc6" stroke="#a5792e" stroke-width="2"><circle cx="108" cy="61" r="17"/><circle cx="151" cy="61" r="17"/><circle cx="194" cy="61" r="17"/></g><text x="150" y="105" text-anchor="middle">Transmitter vesicles</text><path d="M150 115v44m-7-8 7 8 7-8" stroke="#344958" stroke-width="3" fill="none"/><text x="150" y="183" text-anchor="middle">Synaptic cleft</text><path d="M30 207h240" stroke="#537a94" stroke-width="5"/><g fill="#d2e0f2" stroke="#537a94" stroke-width="2"><rect x="74" y="193" width="38" height="29" rx="6"/><rect x="131" y="193" width="38" height="29" rx="6"/><rect x="188" y="193" width="38" height="29" rx="6"/></g><text x="150" y="252" text-anchor="middle">Postsynaptic receptors</text>`
  }
 ];
 window.ALevelSynapseFigures={render(topic,id,group){
  if(topic!=="a6"||id!=="synapse")return "";
  const f=figures[group]; if(!f)return "";
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height || 290}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 }};
})();

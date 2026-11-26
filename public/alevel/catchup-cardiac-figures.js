/* Original, simplified A-level cardiac conduction and regulation diagrams. */
(function () {
 "use strict";
 const figures={
  "a6/heartrate/0": {
   title:"The heartbeat starts in the SAN",
   alt:"A simplified heart viewed from the front shows the sinoatrial node in the wall of the right atrium. Arrows spread from it across both atria, which contract. Cardiac muscle is myogenic: the heartbeat starts without a nerve impulse.",
   caption:"Locate the SAN in the right atrial wall, then follow the electrical activity across both atria. The SAN initiates the rhythm without nervous stimulation.",
   art:`<text x="150" y="22" text-anchor="middle">Front view · heart’s right is left</text><path d="M46 107C24 51 79 40 139 82C198 40 256 51 234 107C230 166 196 214 140 247C84 214 50 166 46 107Z" fill="#f5e5db" stroke="#a76125" stroke-width="3"/><path d="M47 151Q140 165 233 151M140 82v143" stroke="#a76125" stroke-width="2" fill="none"/><circle cx="64" cy="92" r="7" fill="#754b84"/><path d="M74 93h35m-7-6 7 6-7 6M116 93h49m-7-6 7 6-7 6M171 93h25m-7-6 7 6-7 6" stroke="#754b84" stroke-width="3" fill="none"/><text x="12" y="67">SAN</text><path d="M40 71l20 16" stroke="#344958" stroke-width="2"/><text x="91" y="119" text-anchor="middle">Right</text><text x="91" y="136" text-anchor="middle">atrium</text><text x="189" y="119" text-anchor="middle">Left</text><text x="189" y="136" text-anchor="middle">atrium</text><text x="140" y="277" text-anchor="middle">Atria contract</text>`
  },
  "a6/heartrate/1": {
   title:"The AVN delays the signal",
   alt:"A simplified conduction pathway shows the wave spreading across the atria to the atrioventricular node, then being delayed. Non-conducting tissue blocks direct spread to the ventricles. The signal passes down the bundle of His in the septum and up the ventricular walls in Purkyne tissue, stimulating contraction from the apex upwards.",
   caption:"The AVN delay lets the atria finish contracting. Then follow the signal down the bundle of His and up the Purkyne tissue: ventricular contraction starts at the apex.",
   height:340,
   art:`<text x="150" y="21" text-anchor="middle">Atrial activity</text><path d="M150 30v24m-6-7 6 7 6-7" stroke="#344958" stroke-width="2" fill="none"/><rect x="83" y="58" width="134" height="43" rx="9" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><text x="150" y="84" text-anchor="middle">AVN · delay</text><path d="M18 113h100M182 113h100" stroke="#a76125" stroke-width="4" stroke-dasharray="7 4"/><text x="150" y="137" text-anchor="middle">Non-conducting layer</text><path d="M150 101v63m-6-7 6 7 6-7" stroke="#754b84" stroke-width="3" fill="none"/><text x="180" y="164">Bundle of His</text><path d="M56 179Q64 256 150 300Q236 256 244 179" stroke="#a76125" stroke-width="3" fill="#f5e5db"/><path d="M150 164v107m-6-7 6 7 6-7M150 271Q105 249 86 208m-2 9 2-9 9 3M150 271Q195 249 214 208m-9 3 9-3 2 9" stroke="#754b84" stroke-width="3" fill="none"/><text x="150" y="330" text-anchor="middle">Purkyne tissue: apex upwards</text>`
  },
  "a6/hrcontrol/1": {
   title:"Nervous control changes the rate",
   alt:"Two routes from the medulla to the sinoatrial node are compared. Sympathetic impulses increase heart rate; parasympathetic impulses decrease it. Increased carbon dioxide during exercise lowers blood pH, stimulating chemoreceptors that signal to the medulla; increased sympathetic impulses reach the SAN, increasing heart rate.",
   caption:"Compare the two nerve pathways. During exercise, more carbon dioxide lowers pH; chemoreceptor signals to the medulla increase sympathetic impulses to the SAN.",
   height:350,
   art:`<text x="150" y="24" text-anchor="middle">Medulla</text><path d="M150 34v26M150 60H70v27M150 60h80v27" stroke="#344958" stroke-width="2" fill="none"/><text x="70" y="111" text-anchor="middle">Sympathetic</text><text x="230" y="111" text-anchor="middle">Parasympathetic</text><path d="M70 121v28m-6-7 6 7 6-7M230 121v28m-6-7 6 7 6-7" stroke="#344958" stroke-width="2" fill="none"/><text x="70" y="171" text-anchor="middle">SAN → rate ↑</text><text x="230" y="171" text-anchor="middle">SAN → rate ↓</text><path d="M20 188h260" stroke="#cbdedb" stroke-width="2"/><text x="150" y="213" text-anchor="middle">Exercise example</text><text x="150" y="240" text-anchor="middle">More CO₂ → pH falls</text><path d="M150 250v16m-5-5 5 5 5-5" stroke="#344958" stroke-width="2" fill="none"/><text x="150" y="286" text-anchor="middle">Chemoreceptors → medulla</text><path d="M150 293v16m-5-5 5 5 5-5" stroke="#344958" stroke-width="2" fill="none"/><text x="150" y="333" text-anchor="middle">More sympathetic impulses</text>`
  }
 };
 window.ALevelCardiacFigures={render(topic,id,group){
  const f=figures[topic+"/"+id+"/"+group];if(!f)return "";
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 ${f.height||290}" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 }};
})();

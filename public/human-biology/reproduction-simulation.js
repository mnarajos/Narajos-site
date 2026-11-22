/* Educational, deterministic, browser-only F175 reproduction simulation.
   Illustrates (not predicts) pituitary hormone signalling and gamete transport.
   No data collection, student assessment, or coursework submission support. */
(function(){
"use strict";
const checkpoints = [
 {
  id:"follicle", title:"Follicular development", action:"fsh",
  prompt:"FSH concentration rises. Which structure responds by developing?",
  options:[["The ovarian follicle.",""],["The lining of the uterus.","Look inside the ovary for the structure that houses the oocyte."],["The opening of the oviduct.","The opening receives an oocyte after release. It does not house the developing oocyte."]],
  cue:"Use FSH or select an ovary. Watch what happens around the oocyte.",
  observation:"The follicle enlarges around the oocyte, which remains inside it. FSH supports follicle development. Release needs a different signal."
 },{
  id:"ovulation", title:"Ovulation", action:"lh",
  prompt:"A follicle has matured. What does the LH surge trigger most directly?",
  options:[["The entire follicle moves into the oviduct.","Follow the small cell. The follicle remains in the ovary."],["A secondary oocyte is released from the follicle.",""],["A sperm fuses with the oocyte.","Fusion requires a sperm to reach the oocyte later."]],
  cue:"Once the follicle matures, use LH. Watch the gap between the ovary and the end of the oviduct.",
  observation:"The follicle stays in the ovary. The secondary oocyte is released nearby, where the finger-like fimbriae help receive it into the oviduct. Cilia and muscular contractions help move it along."
 },{
  id:"transport", title:"Gamete transport", action:"sperm",
  prompt:"Sperm and a secondary oocyte are both travelling. Where are they most likely to meet?",
  options:[["In the uterine cavity.","Sperm pass through the uterus. Follow their route one structure further."],["In the ovary.","The oocyte has already left the ovary before a sperm can meet it."],["In the widest region of an oviduct.",""]],
  cue:"Introduce sperm. Follow the route from the vagina and look for where it can converge with the oocyte's route.",
  observation:"Sperm enter through the vagina and pass through the cervical canal, uterine cavity and into an oviduct. The gametes usually meet in the widest region of an oviduct, the ampulla."
 },{
  id:"fertilisation", title:"Possible fertilisation", action:"fert",
  prompt:"Sperm have reached an oviduct. Why might no zygote form?",
  options:[["The gametes may fail to meet while viable or may fail to fuse.",""],["Fertilisation requires the oocyte to attach to the endometrium first.","Attachment to the endometrium is a later event involving an embryo."],["Sperm cannot fertilise an oocyte until it reaches the uterus.","The oviduct is the usual site of fertilisation."]],
  cue:"Compare where the gametes are. Show one possible fertilisation, or continue without fertilisation.",
  observation:"This model shows possible outcomes. Fertilisation requires viable gametes to meet at the right time and fuse successfully. If they do, a zygote forms. Without fertilisation the oocyte usually degenerates."
 },{
  id:"development", title:"Early development",
  prompt:"A zygote has formed in the oviduct. Which event can occur before the embryo attaches to the uterus?",
  options:[["It stays as one cell until contact with the lining.","Look for divisions during its journey."],["It undergoes cleavage and can develop into a blastocyst.",""],["It becomes a blastocyst only after a second fertilisation.","Fertilisation formed the zygote. Later stages arise from its development."]],
  cue:"Follow the embryo on the fertilisation branch. Compare the single cell, divisions and hollow blastocyst.",
  observation:"The zygote undergoes cleavage, a series of cell divisions, during transport. The embryo becomes a blastocyst with a fluid-filled cavity before it can implant."
 },{
  id:"implantation", title:"Possible implantation", action:"implant",
  prompt:"What attaches, and where, if implantation occurs?",
  options:[["A secondary oocyte attaches to the wall of the oviduct.","A secondary oocyte has yet to form an embryo. The model shows typical implantation in the uterus."],["A sperm attaches to an oocyte in the uterus.","Gamete fusion is fertilisation, which normally occurs in an oviduct."],["A blastocyst attaches to the uterine lining.",""]],
  cue:"Once a blastocyst has formed, show possible implantation. Look for where it attaches.",
  observation:"The blastocyst attaches to the endometrium several days after fertilisation if conditions allow. Fertilisation and implantation are separate events; one does not guarantee the other."
 }
];
function guideMarkup(){
 return '<details class="krp-guide"><summary>Predict and explain</summary>'+
  '<label for="krp-checkpoint">Revisit a stage</label><select id="krp-checkpoint">'+
  checkpoints.map(step=>'<option value="'+step.id+'">'+step.title+'</option>').join("")+'</select>'+
  '<form><fieldset><legend></legend><div class="krp-options"></div></fieldset>'+
  '<button class="krp-btn" type="submit">Check prediction</button></form>'+
  '<p class="krp-prediction" role="status" aria-atomic="true"></p>'+
  '<details class="krp-anatomy-note krp-explanation"><summary>Review this stage</summary><p></p></details>'+
  '<p class="krp-observation" role="status" aria-atomic="true"></p>'+
  '<button class="krp-btn" type="button" data-next-checkpoint hidden>Next checkpoint</button>'+
  '<a data-f175-apply href="#challenge/f175/f175-transport?from=catchup/f175/a1" hidden>Apply to a different situation</a></details>';
}
function writtenSequence(){
 return '<details class="krp-anatomy-note"><summary>Read the pathway without animation</summary><ol>'+
  checkpoints.map(step=>'<li><strong>'+step.title+'</strong> '+step.observation+'</li>').join("")+'</ol></details>';
}
function mountGuide(root, observed, withoutFertilisation, onChange, initialStep, returnLink){
 const guide = root.querySelector(".krp-guide");
 const select = guide.querySelector("select");
 const form = guide.querySelector("form");
 const feedback = guide.querySelector(".krp-prediction");
 const explanation = guide.querySelector(".krp-explanation");
 const observation = guide.querySelector(".krp-observation");
 const next = guide.querySelector("[data-next-checkpoint]");
 const apply = guide.querySelector("[data-f175-apply]");
 let index = 0;
 let answered = false;
 let accepted = false;
 function update(){
  const step = checkpoints[index];
  const seen = observed(step.id);
  const end = index === checkpoints.length - 1 || (step.id === "fertilisation" && withoutFertilisation());
  const message = answered && seen ? step.observation : "";
  if(observation.textContent !== message) observation.textContent = message;
  explanation.hidden = Boolean(message);
  next.hidden = !answered || !seen || end;
  apply.hidden = Boolean(returnLink) || !answered || !seen || !end;
  onChange(guide.open && answered && !seen ? step.action : null);
 }
 function choose(i){
  index = i;
  answered = false;
  accepted = false;
  const step = checkpoints[index];
  select.value = step.id;
  form.querySelector("legend").textContent = step.prompt;
  explanation.open = false;
  explanation.querySelector("p").textContent = step.observation;
  form.querySelector("fieldset").disabled = false;
  form.querySelector("button").hidden = false;
  form.querySelector(".krp-options").innerHTML = step.options.map(([label], j)=>
   '<label><input type="radio" name="prediction" value="'+j+'"> <span>'+label+'</span></label>').join("");
  feedback.textContent = "";
  update();
 }
 select.addEventListener("change",()=>choose(select.selectedIndex));
 guide.addEventListener("toggle",update);
 form.addEventListener("submit",event=>{
  event.preventDefault();
  if(accepted)return;
  const selected = form.querySelector("input:checked");
  if(!selected){
   feedback.textContent = "Choose a prediction to check.";
   form.querySelector("input").focus();
   return;
  }
  const step = checkpoints[index];
  const correction = step.options[Number(selected.value)][1];
  answered = true;
  accepted = !correction;
  feedback.textContent = correction ? correction+" "+step.cue : "That prediction fits. "+step.cue;
  if(accepted){
   feedback.setAttribute("tabindex","-1");
   feedback.focus({preventScroll:true});
   form.querySelector("fieldset").disabled = true;
   form.querySelector("button").hidden = true;
  }
  update();
 });
 next.addEventListener("click",()=>{
  choose(index + 1);
  form.querySelector("input").focus();
 });
 const initialIndex = checkpoints.findIndex(step=>step.id===initialStep);
 guide.open = initialIndex !== -1;
 if(returnLink){
  returnLink.classList.add("krp-return");
  guide.insertBefore(returnLink,form);
 }
 choose(Math.max(0,initialIndex));
 if(guide.open)select.focus();
 return {
  update,
  reset:()=>choose(0),
  nextAction:()=>guide.open && (!next.hidden ? next : !apply.hidden ? apply : null)
 };
}
function svg(){
 return '<svg class="krp-diagram" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" role="group" aria-labelledby="krp-title" aria-describedby="krp-description">'+
 '<title id="krp-title">Female reproductive anatomy and gamete transport</title>'+
 '<desc id="krp-description">A frontal section showing the uterus, ovaries, oviducts and vagina. The fimbriae face each ovary across a gap. The cervical canal connects the uterine cavity to the vagina. The controls and a written sequence are available below the diagram.</desc>'+
 '<rect width="900" height="600" rx="17" fill="#fffafb"/>'+
 /* Tubes have darker wall with a lighter lumen to distinguish them from solid lines. */
 '<path d="M390 184 C355 147 321 140 286 158 S222 191 205 191" fill="none" stroke="#aa617e" stroke-width="23" stroke-linecap="round"/>'+
 '<path d="M390 184 C355 147 321 140 286 158 S222 191 205 191" fill="none" stroke="#fff1f5" stroke-width="11" stroke-linecap="round"/>'+
 '<path d="M510 184 C545 147 579 140 614 158 S678 191 695 191" fill="none" stroke="#aa617e" stroke-width="23" stroke-linecap="round"/>'+
 '<path d="M510 184 C545 147 579 140 614 158 S678 191 695 191" fill="none" stroke="#fff1f5" stroke-width="11" stroke-linecap="round"/>'+
 '<g fill="none" stroke="#aa617e" stroke-width="7" stroke-linecap="round">'+
 '<path d="M200 190Q184 169 174 173M200 191Q180 196 170 209M200 194Q183 215 178 223"/>'+
 '<path d="M700 190Q716 169 726 173M700 191Q720 196 730 209M700 194Q717 215 722 223"/></g>'+
 /* Draw the vaginal walls behind the cervix so the upper vagina wraps around it. */
 '<path d="M416 383C392 394 389 413 397 439C406 468 405 500 409 520H491C495 500 494 468 503 439C511 413 508 394 484 383Z" fill="#edc4d5" stroke="#a35a78" stroke-width="4"/>'+
 '<path d="M425 398C409 395 405 405 413 420C427 441 431 478 431 520H469C469 478 473 441 487 420C495 405 491 395 475 398Z" fill="#fff8fb" stroke="#bf7b99" stroke-width="2.5"/>'+
 '<g fill="none" stroke="#cb91ac" stroke-width="2.2"><path d="M405 450Q417 448 423 455M408 468Q420 466 427 473M410 486Q421 484 430 491M495 450Q483 448 477 455M492 468Q480 466 473 473M490 486Q479 484 470 491"/></g>'+
 /* The lower uterus continues into the cervix. The open canal joins both cavities. */
 '<path d="M363 176C392 153 419 145 450 145S508 153 537 176C546 209 527 255 508 290C495 312 485 334 482 354C478 372 484 392 485 405C487 421 475 432 457 433H443C425 432 413 421 415 405C416 392 422 372 418 354C415 334 405 312 392 290C373 255 354 209 363 176Z" fill="#f1bacf" stroke="#98476c" stroke-width="4.5"/>'+
 '<path d="M418 350Q450 365 482 350C478 373 484 392 485 405C487 421 475 432 457 433H443C425 432 413 421 415 405C416 392 422 373 418 350Z" fill="#de96b6" stroke="#aa5b81" stroke-width="2.4"/>'+
 '<path d="M378 180Q450 168 522 180C505 193 492 216 478 252C462 293 457 317 456 346H444C443 317 438 293 422 252C408 216 395 193 378 180Z" fill="#d7759d" stroke="#b2577d" stroke-width="2.5"/>'+
 '<path d="M386 181Q450 173 514 181C498 194 482 224 470 263C458 299 453 318 453 349L457 371Q459 386 454 405L454 423L461 433H439L446 423V405Q441 386 443 371L447 349C447 318 442 299 430 263C418 224 402 194 386 181Z" fill="#fff9fc" stroke="#ad6080" stroke-width="1.8"/>'+
 '<path d="M429 382L441 379M428 393L441 386M430 403L443 394M471 382L459 379M472 393L459 386M470 403L457 394" fill="none" stroke="#bd7196" stroke-width="1.7" stroke-linecap="round"/>'+
 '<g class="krp-ovary" data-side="left" tabindex="0" role="button" aria-label="Select left ovary and start follicle development with FSH">'+
 '<ellipse cx="135" cy="212" rx="56" ry="37" fill="#eac6df" stroke="#9a5887" stroke-width="4"/>'+
 '<g fill="#ffeff9" stroke="#b987b4" stroke-width="2"><circle cx="112" cy="203" r="9"/><circle cx="159" cy="222" r="9"/><circle cx="147" cy="190" r="6"/></g>'+
 '<ellipse class="krp-ovary-target" cx="135" cy="212" rx="67" ry="50" fill="#fff" fill-opacity="0"/></g>'+
 '<g class="krp-ovary" data-side="right" tabindex="0" role="button" aria-label="Select right ovary and start follicle development with FSH">'+
 '<ellipse cx="765" cy="212" rx="56" ry="37" fill="#eac6df" stroke="#9a5887" stroke-width="4"/>'+
 '<g fill="#ffeff9" stroke="#b987b4" stroke-width="2"><circle cx="740" cy="222" r="9"/><circle cx="788" cy="203" r="9"/><circle cx="751" cy="190" r="6"/></g>'+
 '<ellipse class="krp-ovary-target" cx="765" cy="212" rx="67" ry="50" fill="#fff" fill-opacity="0"/></g>'+
 '<g id="krp-follicle" hidden aria-hidden="true"><circle r="13" fill="#fff3d4" stroke="#ca8740" stroke-width="3"/><circle r="5.8" fill="#dc9351"/></g>'+
 '<path id="krp-egg-left" d="M135 212Q181 223 201 190Q225 177 286 158" fill="none"/>'+
 '<path id="krp-egg-right" d="M765 212Q719 223 699 190Q675 177 614 158" fill="none"/>'+
 '<path id="krp-sperm-left" d="M450 515L450 438L450 354L450 300Q422 201 390 184Q344 140 286 158" fill="none"/>'+
 '<path id="krp-sperm-right" d="M450 515L450 438L450 354L450 300Q478 201 510 184Q556 140 614 158" fill="none"/>'+
 '<path id="krp-embryo-left" d="M286 158Q344 140 390 184Q422 201 450 281" fill="none"/>'+
 '<path id="krp-embryo-right" d="M614 158Q556 140 510 184Q478 201 450 281" fill="none"/>'+
 '<g id="krp-egg" hidden aria-hidden="true"><circle r="11.5" fill="#ffe6a2" stroke="#c78436" stroke-width="3"/><circle r="5" fill="#d79746"/></g>'+
 '<g id="krp-sperm" hidden aria-hidden="true"><circle r="5" fill="#147ea4"/><path d="M-5 0Q-14 -11 -23 1Q-28 8 -37 0" stroke="#147ea4" stroke-width="3" fill="none" stroke-linecap="round"/></g>'+
 '<g id="krp-embryo" hidden aria-hidden="true"><circle r="13" fill="#f6d7ef" stroke="#a05591" stroke-width="3"/><path id="krp-divisions" hidden d="M0 -12V12M-12 0H12" stroke="#ad6ca1" stroke-width="2"/>'+
 '<g id="krp-blastocyst" hidden><circle cx="1" cy="-1" r="8" fill="#fffafb" stroke="#a05591" stroke-width="1.5"/><path d="M-9 3Q0 0 4 10Q-2 14-9 8Z" fill="#a05591"/></g></g>'+
 '<g id="krp-implant" hidden aria-hidden="true"><circle r="10" fill="#f6d7ef" stroke="#782858" stroke-width="3"/><circle r="3" fill="#782858"/></g>'+
 '<g font-family="system-ui,sans-serif" font-size="17" font-weight="600" fill="#334858">'+
 '<text x="135" y="140" text-anchor="middle">Ovary</text><text x="765" y="140" text-anchor="middle">Ovary</text>'+
 '<text x="278" y="100" text-anchor="middle">Oviduct</text><text x="621" y="100" text-anchor="middle">Oviduct</text>'+
 '<path d="M278 107L281 145M621 107L618 145" stroke="#566e7c" stroke-width="2"/>'+
 '<text x="199" y="276" text-anchor="middle">Fimbriae</text><text x="701" y="276" text-anchor="middle">Fimbriae</text>'+
 '<path d="M198 260L193 222M701 260L708 222" stroke="#566e7c" stroke-width="2"/>'+
 '<text x="449" y="84" text-anchor="middle">Uterus</text><path d="M450 93V151" stroke="#566e7c" stroke-width="2"/>'+
 '<text x="556" y="318">Endometrium</text><path d="M546 310L471 263" stroke="#566e7c" stroke-width="2"/>'+
 '<text x="548" y="376">Cervix</text><path d="M538 370L481 376" stroke="#566e7c" stroke-width="2"/>'+
 '<text x="335" y="405" text-anchor="end">Cervical canal</text><path d="M346 399L393 399L450 390" stroke="#566e7c" stroke-width="2" fill="none"/>'+
 '<text x="548" y="481">Vagina</text><path d="M538 474L490 469" stroke="#566e7c" stroke-width="2"/>'+
 '</g><g class="krp-entry" role="button" tabindex="0" aria-label="Sperm entry on the diagram">'+
 '<rect x="350" y="536" width="200" height="45" rx="21" fill="#e5f3fb" stroke="#87b2ce"/>'+
 '<text x="430" y="565" text-anchor="middle" font-size="18" font-weight="700" fill="#23668a">Sperm entry</text><path d="M529 569V545M518 556L529 545L540 556" stroke="#23668a" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
 '</g></svg>';
}
function markup(){
 return '<section class="krp-root" id="krp-model" aria-label="Interactive ovulation and sperm transport model">'+
 '<div class="krp-intro"><h2>Explore ovulation and fertilisation</h2><p>Make a prediction or explore the diagram freely.</p></div>'+
 guideMarkup()+
 '<button class="krp-btn krp-zoom" data-krp="zoom" type="button" aria-pressed="false" aria-controls="krp-view">Follow the current stage</button>'+
 '<div class="krp-view" id="krp-view" role="region" aria-label="Reproductive anatomy diagram" tabindex="0">'+svg()+'</div>'+
 '<p class="krp-swipe">Swipe to see the whole diagram, or select Follow the current stage.</p>'+
 '<details class="krp-anatomy-note"><summary>Look closer at the cervix</summary>'+
 '<p>The cervix is the narrow lower part of the uterus. It projects into the top of the vagina. The cervical canal is the passage through it, from the vagina into the uterine cavity.</p>'+
 '<p>Follow this route in the model: vagina → cervical canal → uterine cavity → oviduct.</p></details>'+
 '<div class="krp-controls">'+
 '<button class="krp-btn krp-fsh" data-krp="fsh" type="button">FSH <small>Develop follicle</small></button>'+
 '<button class="krp-btn krp-lh" data-krp="lh" type="button" hidden>LH surge <small>Trigger ovulation</small></button>'+
 '<button class="krp-btn krp-sperm" data-krp="sperm" type="button">Introduce sperm <small>Follow sperm transport</small></button>'+
 '<button class="krp-btn krp-fert" data-krp="fert" type="button" hidden>Show possible fertilisation</button>'+
 '<button class="krp-btn krp-continue" data-krp="continue" type="button" hidden>Continue without fertilisation</button>'+
 '<button class="krp-btn" data-krp="implant" type="button" hidden>Show possible implantation <small>Several days after fertilisation</small></button>'+
 '<button class="krp-btn" data-krp="pause" type="button" aria-pressed="false">Pause animation</button>'+
 '<button class="krp-btn krp-reset" data-krp="reset" type="button">Reset</button>'+
 '<button class="krp-btn krp-reset" data-krp="replay" type="button">Replay from FSH</button></div>'+
 '<p class="krp-status" role="status" aria-live="polite" tabindex="-1">Select an ovary or press FSH to begin.</p>'+
 writtenSequence()+
 '<p class="krp-note"><strong>Schematic, not to scale.</strong> A real menstrual cycle takes weeks. The animations compress time, and the LH surge follows sustained oestradiol signalling rather than a user-controlled hormone dose. Ovulation releases a secondary oocyte into the region near an oviduct; fertilisation usually occurs in its ampulla. A sperm reaching an oocyte does not guarantee fertilisation, and implantation is a later, separate event.</p></section>';
}
function mount(host,initialStep,returnLink){
 var root=host&&host.querySelector&&host.querySelector("#krp-model");
 if(!root||root.dataset.mounted)return;
 root.dataset.mounted="1";
 var q=function(sel){return root.querySelector(sel);};
 var btn={},group={"follicle":q("#krp-follicle"),"egg":q("#krp-egg"),"sperm":q("#krp-sperm"),"embryo":q("#krp-embryo"),"implant":q("#krp-implant")};
 root.querySelectorAll("[data-krp]").forEach(function(b){btn[b.dataset.krp]=b;});
 var state={side:"left",phase:"idle",sperm:"idle",spermSide:null,fertilised:false,paused:false,view:"ovary",viewSide:"left",zoom:false};
 var animations=new Set();
 var diagram=q(".krp-diagram"),view=q(".krp-view"),progress=q(".krp-status");
 const seen = new Set();
 const guide = mountGuide(root,step=>seen.has(step),()=>state.phase==="complete"&&!state.fertilised,action=>{
  Object.entries(btn).forEach(([key,control])=>control.classList.toggle("krp-next",key===action));
 },initialStep,returnLink);
 var hotspots=root.querySelectorAll(".krp-ovary, .krp-entry");
 var areas={ovary:[48,86,320,228],oviduct:[75,73,390,242],sperm:[205,95,360,484],uterus:[250,102,390,445]};
 function frameView(area,side){
  state.view=area;
  state.viewSide=side;
  if(!state.zoom)return;
  var box=areas[area].slice();
  if(side==="right")box[0]=900-box[0]-box[2];
  diagram.setAttribute("viewBox",box.join(" "));
 }
 function moveFocus(from){
  if(document.activeElement===from)progress.focus({preventScroll:true});
 }
 function offerFocus(to){
  to=guide.nextAction()||to;
  if(to&&document.activeElement===progress)to.focus({preventScroll:true});
 }
 var reduced=!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);
 function status(t){progress.textContent=t;}
 function show(g,yes){if(g)g.toggleAttribute("hidden",!yes);}
 function positionAt(g,path,p){
  var l=path.getTotalLength(),xy=path.getPointAtLength(Math.max(0,Math.min(1,p))*l);
  g.setAttribute("transform","translate("+xy.x.toFixed(1)+" "+xy.y.toFixed(1)+")");
 }
 function animate(duration,draw,done){
  if(reduced){draw(1);done();return;}
  var animation={elapsed:0,last:null,frame:0};
  function step(time){
   animation.frame=0;
   if(!root.isConnected){animations.delete(animation);return;}
   if(animation.last!==null)animation.elapsed+=time-animation.last;
   animation.last=time;
   var fraction=Math.min(1,animation.elapsed/duration);
   draw(fraction);
   if(fraction<1)animation.play();
   else{animations.delete(animation);done();update();}
  }
  animation.play=function(){animation.frame=window.requestAnimationFrame(step);};
  animation.stop=function(){
   window.cancelAnimationFrame(animation.frame);
   animation.frame=0;animation.last=null;
  };
  animations.add(animation);
  if(!state.paused)animation.play();
  update();
 }
 function transport(g,path,duration,done,onPosition){
  animate(duration,function(fraction){
   var eased=fraction*fraction*(3-2*fraction);
   positionAt(g,path,eased);
   if(onPosition)onPosition(fraction);
  },done);
 }
 function locate(g,x,y){g.setAttribute("transform","translate("+x+" "+y+")");}
 function update(){
  btn.fsh.disabled=state.phase!=="idle";
  btn.lh.hidden=state.phase!=="mature";
  btn.sperm.disabled=state.sperm!=="idle";
  q(".krp-entry").setAttribute("aria-disabled",String(btn.sperm.disabled));
  btn.fert.hidden=!canFertilise();
  btn.continue.hidden=state.phase!=="oviduct";
  btn.implant.hidden=state.phase!=="ready-to-implant";
  btn.pause.disabled=!animations.size;
  btn.pause.setAttribute("aria-pressed",String(state.paused));
  btn.pause.textContent=state.paused?"Resume animation":"Pause animation";
  guide.update();

  root.querySelectorAll(".krp-ovary").forEach(function(o){
   o.classList.toggle("krp-active",o.dataset.side===state.side&&state.phase!=="idle");
   o.setAttribute("aria-disabled",state.phase==="idle"?"false":"true");
  });
 }
 function select(side,from){
  if(state.phase!=="idle")return;
  state.side=side;
  state.phase="growing";
  moveFocus(from);
  frameView("ovary",side);
  var x=side==="left"?135:765;
  locate(group.follicle,x,212);show(group.follicle,true);
  q("#krp-follicle circle:first-child").setAttribute("r","13");
  update();
  status("FSH supports growth and maturation of an ovarian follicle. The oocyte develops within the follicle.");
  animate(1500,function(fraction){
   q("#krp-follicle circle:first-child").setAttribute("r",String(13+18*fraction));
  },function(){
   state.phase="mature";seen.add("follicle");update();
   status("The follicle has matured. The LH surge control is now available.");
   offerFocus(btn.lh);
  });
 }
 function ovulate(){
  if(state.phase!=="mature")return;
  moveFocus(btn.lh);
  frameView("oviduct",state.side);
  state.phase="ovulating";show(group.follicle,false);show(group.egg,true);
  var path=q("#krp-egg-"+state.side);positionAt(group.egg,path,0);update();
  status("The secondary oocyte leaves the follicle near the opening of an oviduct. The fimbriae help receive it and cilia and muscular contractions help move it along.");
  transport(group.egg,path,2300,function(){
   state.phase="oviduct";seen.add("ovulation");update();
   status("The secondary oocyte is in the oviduct (typically the ampulla). It can be fertilised only if a viable sperm reaches it within a limited period.");
   maybeMeet();
   if(state.sperm!=="travelling")offerFocus(state.sperm==="idle"?btn.sperm:canFertilise()?btn.fert:btn.continue);
  });
 }
 function introduceSperm(from){
  if(state.sperm!=="idle")return;
  state.sperm="travelling";show(group.sperm,true);
  state.spermSide=state.side;
  moveFocus(from);
  frameView("sperm",state.spermSide);
  var path=q("#krp-sperm-"+state.spermSide);positionAt(group.sperm,path,0);update();
  status("Follow one representative sperm from the vagina through the cervical canal and uterus. Many sperm do not reach an oviduct.");
  transport(group.sperm,path,3500,function(){
   state.sperm="oviduct";seen.add("transport");update();
   status("The representative sperm has reached an oviduct. Fertilisation is possible only if a viable secondary oocyte is present in that oviduct.");
   maybeMeet();
   if(state.phase==="oviduct")offerFocus(canFertilise()?btn.fert:btn.continue);
   else if(state.phase==="mature")offerFocus(btn.lh);
   else if(state.phase==="idle")offerFocus(btn.fsh);
  });
 }
 function canFertilise(){
  return state.phase==="oviduct"&&state.sperm==="oviduct"&&state.spermSide===state.side&&!state.fertilised;
 }
 function maybeMeet(){
  if(state.phase!=="oviduct"||state.sperm!=="oviduct")return;
  status(canFertilise()
    ?"The representative sperm and the secondary oocyte are in the same oviduct. You can show one possible outcome."
    :"The representative sperm is in the other oviduct. Continue without fertilisation, or reset and choose an ovary before introducing sperm.");
 }
 function fertilise(){
  if(!canFertilise())return;
  moveFocus(btn.fert);
  frameView("uterus",state.side);
  state.fertilised=true;state.phase="embryo";
  show(group.sperm,false);show(group.egg,false);show(group.embryo,true);
  var divisions=q("#krp-divisions");show(divisions,false);
  const blastocyst=q("#krp-blastocyst");show(blastocyst,false);
  var path=q("#krp-embryo-"+state.side);positionAt(group.embryo,path,0);update();
  status("Possible fertilisation: sperm and secondary oocyte fuse to form a zygote. Cell divisions begin as the early embryo travels towards the uterus.");
  transport(group.embryo,path,2400,function(){
   state.phase="ready-to-implant";seen.add("fertilisation");seen.add("development");
   show(divisions,false);show(blastocyst,true);update();
   status("The blastocyst is now shown in the uterus. You can show one possible later outcome at the uterine lining.");
   offerFocus(btn.implant);
  },function(fraction){if(fraction>.3)show(divisions,true);});
 }
 function implant(){
  if(state.phase!=="ready-to-implant")return;
  moveFocus(btn.implant);
  state.phase="complete";
  show(group.embryo,false);
  locate(group.implant,state.side==="left"?433:467,267);
  show(group.implant,true);
  seen.add("implantation");
  update();
  status("Possible implantation: the blastocyst attaches at the uterine lining. Implantation is a separate event and is not guaranteed.");
  offerFocus(btn.replay);
 }
 function noFertilisation(){
  if(state.phase!=="oviduct")return;
  moveFocus(btn.continue);
  state.phase="complete";show(group.egg,false);seen.add("fertilisation");update();
  status("Without fertilisation, the secondary oocyte typically degenerates. It does not develop into an embryo; menstrual changes depend on the hormonal cycle.");
  offerFocus(btn.replay);
 }
 function reset(){
  animations.forEach(function(animation){animation.stop();});animations.clear();
  state.paused=false;state.side="left";state.phase="idle";state.sperm="idle";state.spermSide=null;state.fertilised=false;
  Object.keys(group).forEach(function(k){show(group[k],false);});
  frameView("ovary","left");
  seen.clear();guide.reset();
  update();status("Select an ovary or press FSH to begin.");
 }
 btn.fsh.addEventListener("click",function(){select(state.side,btn.fsh);});
 btn.lh.addEventListener("click",ovulate);
 btn.sperm.addEventListener("click",function(){introduceSperm(btn.sperm);});
 btn.fert.addEventListener("click",fertilise);
 btn.continue.addEventListener("click",noFertilisation);
 btn.reset.addEventListener("click",reset);
 btn.implant.addEventListener("click",implant);
 btn.replay.addEventListener("click",function(){
  var side=state.side;
  reset();select(side,btn.replay);
 });
 btn.pause.addEventListener("click",function(){
  state.paused=!state.paused;
  animations.forEach(function(animation){if(state.paused)animation.stop();else animation.play();});
  update();
 });
 btn.zoom.addEventListener("click",function(){
  state.zoom=!state.zoom;
  btn.zoom.setAttribute("aria-pressed",String(state.zoom));
  view.classList.toggle("krp-follow",state.zoom);
  if(state.zoom){
   view.scrollLeft=0;
   frameView(state.view,state.viewSide);
  }else diagram.setAttribute("viewBox","0 0 900 600");
  hotspots.forEach(function(control){control.setAttribute("tabindex",state.zoom?"-1":"0");});
 });
 function connectDiagramControl(control, action){
  control.addEventListener("click",action);
  control.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();action();}});
 }
 root.querySelectorAll(".krp-ovary").forEach(function(o){
  connectDiagramControl(o,function(){select(o.dataset.side,o);});
 });
 var entry=q(".krp-entry");
 connectDiagramControl(entry,function(){introduceSperm(entry);});
 update();
}
window.KeystoneReproductionSimulation={render:markup,mount:mount};
})();


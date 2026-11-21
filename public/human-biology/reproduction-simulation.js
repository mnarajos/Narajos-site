/* Educational, deterministic, browser-only F175 reproduction simulation.
   Illustrates (not predicts) pituitary hormone signalling and gamete transport.
   No data collection, student assessment or coursework submission support. */
(function(){
"use strict";
function svg(){
 return '<svg class="krp-diagram" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="krp-title krp-description">'+
 '<title id="krp-title">Female reproductive anatomy and gamete transport</title>'+
 '<desc id="krp-description">A frontal schematic showing uterus, two hollow oviducts with fimbriae, ovaries, endometrium, narrow cervix and a vagina below. Select an ovary, simulate follicle growth with FSH, trigger ovulation with LH and follow the routes of an oocyte and sperm.</desc>'+
 '<rect width="900" height="600" rx="17" fill="#fffafb"/>'+
 /* Tubes have darker wall with a lighter lumen to distinguish them from solid lines. */
 '<path d="M390 184 C355 147 321 140 286 158 S222 191 205 191" fill="none" stroke="#aa617e" stroke-width="23" stroke-linecap="round"/>'+
 '<path d="M390 184 C355 147 321 140 286 158 S222 191 205 191" fill="none" stroke="#fff1f5" stroke-width="11" stroke-linecap="round"/>'+
 '<path d="M510 184 C545 147 579 140 614 158 S678 191 695 191" fill="none" stroke="#aa617e" stroke-width="23" stroke-linecap="round"/>'+
 '<path d="M510 184 C545 147 579 140 614 158 S678 191 695 191" fill="none" stroke="#fff1f5" stroke-width="11" stroke-linecap="round"/>'+
 '<g fill="none" stroke="#aa617e" stroke-width="7" stroke-linecap="round">'+
 '<path d="M200 190Q184 169 174 173M200 191Q180 196 170 209M200 194Q183 215 178 223"/>'+
 '<path d="M700 190Q716 169 726 173M700 191Q720 196 730 209M700 194Q717 215 722 223"/></g>'+
 /* Uterus, endometrium and cervix / vagina */
 '<path d="M367 176Q450 116 533 176Q544 241 502 324L488 359H412L398 324Q356 241 367 176Z" fill="#f3bfd1" stroke="#9c4d72" stroke-width="5"/>'+
 '<path d="M390 181Q450 151 510 181Q509 224 482 303L467 338H433L418 303Q391 224 390 181Z" fill="#fff3f7" stroke="#dc8da9" stroke-width="4"/>'+
 '<path d="M420 197Q450 184 480 197L461 278L454 330H446L439 278Z" fill="#fffdfb" stroke="#dca0b4" stroke-width="2"/>'+
 '<path d="M412 351Q405 375 413 421Q450 435 487 421Q495 375 488 351Z" fill="#efbbcd" stroke="#a35a78" stroke-width="4"/>'+
 '<path d="M447 352Q443 382 448 423L452 423Q457 382 453 352" fill="#fff8fb"/>'+
 '<path d="M416 423Q401 476 412 519L488 519Q499 476 484 423Z" fill="#f0cada" stroke="#a35a78" stroke-width="4"/>'+
 '<path d="M443 429Q437 464 440 518L460 518Q463 464 457 429Z" fill="#fff8fb"/>'+
 '<g class="krp-ovary" data-side="left" tabindex="0" role="button" aria-label="Select left ovary and start follicle development with FSH">'+
 '<ellipse cx="135" cy="212" rx="56" ry="37" fill="#eac6df" stroke="#9a5887" stroke-width="4"/>'+
 '<g fill="#ffeff9" stroke="#b987b4" stroke-width="2"><circle cx="112" cy="203" r="9"/><circle cx="159" cy="222" r="9"/><circle cx="147" cy="190" r="6"/></g>'+
 '<ellipse class="krp-ovary-target" cx="135" cy="212" rx="67" ry="50" fill="transparent"/></g>'+
 '<g class="krp-ovary" data-side="right" tabindex="0" role="button" aria-label="Select right ovary and start follicle development with FSH">'+
 '<ellipse cx="765" cy="212" rx="56" ry="37" fill="#eac6df" stroke="#9a5887" stroke-width="4"/>'+
 '<g fill="#ffeff9" stroke="#b987b4" stroke-width="2"><circle cx="740" cy="222" r="9"/><circle cx="788" cy="203" r="9"/><circle cx="751" cy="190" r="6"/></g>'+
 '<ellipse class="krp-ovary-target" cx="765" cy="212" rx="67" ry="50" fill="transparent"/></g>'+
 '<g id="krp-follicle" hidden aria-hidden="true"><circle r="13" fill="#fff3d4" stroke="#ca8740" stroke-width="3"/><circle r="5.8" fill="#dc9351"/></g>'+
 '<path id="krp-egg-left" d="M135 212Q181 223 201 190Q225 177 286 158Q344 140 390 184Q422 201 450 281" fill="none"/>'+
 '<path id="krp-egg-right" d="M765 212Q719 223 699 190Q675 177 614 158Q556 140 510 184Q478 201 450 281" fill="none"/>'+
 '<path id="krp-sperm-left" d="M450 515L450 425L450 350L450 300Q422 201 390 184Q344 140 286 158" fill="none"/>'+
 '<path id="krp-sperm-right" d="M450 515L450 425L450 350L450 300Q478 201 510 184Q556 140 614 158" fill="none"/>'+
 '<path id="krp-embryo-left" d="M286 158Q344 140 390 184Q422 201 450 281" fill="none"/>'+
 '<path id="krp-embryo-right" d="M614 158Q556 140 510 184Q478 201 450 281" fill="none"/>'+
 '<g id="krp-egg" hidden aria-hidden="true"><circle r="11.5" fill="#ffe6a2" stroke="#c78436" stroke-width="3"/><circle r="5" fill="#d79746"/></g>'+
 '<g id="krp-sperm" hidden aria-hidden="true"><circle r="5" fill="#147ea4"/><path d="M-5 0Q-14 -11 -23 1Q-28 8 -37 0" stroke="#147ea4" stroke-width="3" fill="none" stroke-linecap="round"/></g>'+
 '<g id="krp-embryo" hidden aria-hidden="true"><circle r="13" fill="#f6d7ef" stroke="#a05591" stroke-width="3"/><path d="M0 -12V12M-12 0H12" stroke="#ad6ca1" stroke-width="2"/></g>'+
 '<g font-family="system-ui,sans-serif" font-size="17" font-weight="600" fill="#334858">'+
 '<text x="135" y="140" text-anchor="middle">Ovary</text><text x="765" y="140" text-anchor="middle">Ovary</text>'+
 '<text x="278" y="100" text-anchor="middle">Oviduct</text><text x="621" y="100" text-anchor="middle">Oviduct</text>'+
 '<path d="M278 107L281 145M621 107L618 145" stroke="#566e7c" stroke-width="2"/>'+
 '<text x="199" y="276" text-anchor="middle">Fimbriae</text><text x="701" y="276" text-anchor="middle">Fimbriae</text>'+
 '<path d="M198 260L193 222M701 260L708 222" stroke="#566e7c" stroke-width="2"/>'+
 '<text x="449" y="84" text-anchor="middle">Uterus</text><path d="M450 93V151" stroke="#566e7c" stroke-width="2"/>'+
 '<text x="571" y="310">Endometrium</text><path d="M561 300L482 271" stroke="#566e7c" stroke-width="2"/>'+
 '<text x="553" y="382">Cervix</text><path d="M545 375L489 380" stroke="#566e7c" stroke-width="2"/>'+
 '<text x="555" y="485">Vagina</text><path d="M546 477L489 469" stroke="#566e7c" stroke-width="2"/>'+
 '</g><rect x="350" y="536" width="200" height="45" rx="21" fill="#e5f3fb" stroke="#87b2ce"/>'+
 '<text x="430" y="565" text-anchor="middle" font-size="18" font-weight="700" fill="#23668a">Sperm entry</text><path d="M529 569V545M518 556L529 545L540 556" stroke="#23668a" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
 '</svg>';
}
function markup(){
 return '<section class="krp-root" id="krp-model" aria-label="Interactive ovulation and sperm transport model">'+
 '<div class="krp-intro"><h2>Explore ovulation and fertilisation</h2><p>Choose an ovary or press FSH, then follow the sequence.</p></div>'+
 '<div class="krp-view" role="region" aria-label="Scrollable reproductive anatomy diagram" tabindex="0">'+svg()+'</div>'+
 '<div class="krp-controls">'+
 '<button class="krp-btn krp-fsh" data-krp="fsh" type="button">FSH <small>Develop follicle</small></button>'+
 '<button class="krp-btn krp-lh" data-krp="lh" type="button" hidden>LH surge <small>Trigger ovulation</small></button>'+
 '<button class="krp-btn krp-sperm" data-krp="sperm" type="button">Introduce sperm <small>Follow sperm transport</small></button>'+
 '<button class="krp-btn krp-fert" data-krp="fert" type="button" hidden>Show possible fertilisation</button>'+
 '<button class="krp-btn krp-continue" data-krp="continue" type="button" hidden>Continue without fertilisation</button>'+
 '<button class="krp-btn krp-reset" data-krp="reset" type="button">Reset</button></div>'+
 '<p class="krp-status" role="status" aria-live="polite">FSH supports development of ovarian follicles. Select an ovary or press FSH to begin.</p>'+
 '<p class="krp-note"><strong>Schematic, not to scale.</strong> A real menstrual cycle takes weeks. The animations compress time, and the LH surge follows sustained oestradiol signalling rather than a user-controlled hormone dose. Ovulation releases a secondary oocyte into the region near an oviduct; fertilisation usually occurs in its ampulla. A sperm reaching an oocyte does not guarantee fertilisation, and implantation is a later, separate event.</p></section>';
}
function mount(host){
 var root=host&&host.querySelector&&host.querySelector("#krp-model");
 if(!root||root.dataset.mounted)return;
 root.dataset.mounted="1";
 var q=function(sel){return root.querySelector(sel);};
 var btn={},group={"follicle":q("#krp-follicle"),"egg":q("#krp-egg"),"sperm":q("#krp-sperm"),"embryo":q("#krp-embryo")};
 root.querySelectorAll("[data-krp]").forEach(function(b){btn[b.dataset.krp]=b;});
 var state={side:"left",phase:"idle",sperm:"idle",fertilised:false,ticket:0};
 var reduced=!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);
 function status(t){q(".krp-status").textContent=t;}
 function show(g,yes){if(g)g.hidden=!yes;}
 function positionAt(g,path,p){
  var l=path.getTotalLength(),xy=path.getPointAtLength(Math.max(0,Math.min(1,p))*l);
  g.setAttribute("transform","translate("+xy.x.toFixed(1)+" "+xy.y.toFixed(1)+")");
 }
 function transport(g,path,from,to,ms,done){
  var id=state.ticket,start;
  if(reduced)ms=0;
  function step(t){
   if(!root.isConnected||id!==state.ticket)return;
   if(start===undefined)start=t;
   var p=ms?Math.min(1,(t-start)/ms):1;
   var eased=p*p*(3-2*p);
   positionAt(g,path,from+(to-from)*eased);
   if(p<1)window.requestAnimationFrame(step);else if(done)done();
  }
  window.requestAnimationFrame(step);
 }
 function locate(g,x,y){g.setAttribute("transform","translate("+x+" "+y+")");}
 function update(){
  btn.fsh.disabled=state.phase!=="idle";
  btn.lh.hidden=state.phase!=="mature";
  btn.sperm.disabled=state.sperm!=="idle";
  btn.fert.hidden=!(state.phase==="oviduct"&&state.sperm==="oviduct"&&!state.fertilised);
  btn.continue.hidden=state.phase!=="oviduct";
  root.querySelectorAll(".krp-ovary").forEach(function(o){
   o.classList.toggle("krp-active",o.dataset.side===state.side&&state.phase!=="idle");
   o.setAttribute("aria-disabled",state.phase==="idle"?"false":"true");
  });
 }
 function select(side){
  if(state.phase!=="idle")return;
  state.side=side;
  state.phase="growing";
  var x=side==="left"?135:765;
  locate(group.follicle,x,212);show(group.follicle,true);
  q("#krp-follicle circle:first-child").setAttribute("r","13");
  update();
  status("FSH supports growth and maturation of an ovarian follicle. The oocyte develops within the follicle.");
  var id=state.ticket,start;function grow(t){
   if(!root.isConnected||id!==state.ticket)return;
   if(start===undefined)start=t;
   var p=reduced?1:Math.min(1,(t-start)/1500);
   q("#krp-follicle circle:first-child").setAttribute("r",String(13+18*p));
   if(p<1)window.requestAnimationFrame(grow);
   else {state.phase="mature";update();status("The follicle has matured in this simplified model. A naturally occurring LH surge normally triggers ovulation. Press LH surge.");}
  }window.requestAnimationFrame(grow);
 }
 function ovulate(){
  if(state.phase!=="mature")return;
  state.phase="ovulating";show(group.follicle,false);show(group.egg,true);
  var path=q("#krp-egg-"+state.side);positionAt(group.egg,path,0);update();
  status("The LH surge triggers ovulation, releasing a secondary oocyte. Fimbriae and ciliary movement help transport it into an oviduct.");
  transport(group.egg,path,0,.50,2300,function(){
   state.phase="oviduct";update();
   status("The secondary oocyte is in the oviduct (typically the ampulla). It can be fertilised only if a viable sperm reaches it within a limited period.");
   maybeMeet();
  });
 }
 function introduceSperm(){
  if(state.sperm!=="idle")return;
  state.sperm="travelling";show(group.sperm,true);
  var path=q("#krp-sperm-"+state.side);positionAt(group.sperm,path,0);update();
  status("Sperm have entered the vagina. One representative sperm is shown moving through the cervix and uterus towards an oviduct; most sperm do not complete this journey.");
  transport(group.sperm,path,0,1,3500,function(){
   state.sperm="oviduct";update();
   status(state.phase==="oviduct"?"Sperm and secondary oocyte are both in the oviduct. Meeting does not guarantee fertilisation. You may show one possible outcome.":"The representative sperm has reached an oviduct. Fertilisation is possible only if a viable secondary oocyte is present.");
   maybeMeet();
  });
 }
 function maybeMeet(){update();}
 function fertilise(){
  if(!(state.phase==="oviduct"&&state.sperm==="oviduct"))return;
  state.fertilised=true;state.phase="embryo";
  show(group.sperm,false);show(group.egg,false);show(group.embryo,true);
  var path=q("#krp-embryo-"+state.side);positionAt(group.embryo,path,0);update();
  status("Possible fertilisation: sperm and secondary oocyte fuse to form a zygote. Cell divisions begin as the early embryo travels towards the uterus.");
  transport(group.embryo,path,0,1,2400,function(){state.phase="complete";update();status("Early embryo has reached the uterus in this model. Implantation into the endometrium is a separate later process and is not guaranteed.");});
 }
 function noFertilisation(){
  if(state.phase!=="oviduct")return;
  state.phase="complete";show(group.egg,false);update();
  status("Without fertilisation, the secondary oocyte typically degenerates. It does not develop into an embryo; menstrual changes depend on the hormonal cycle.");
 }
 function reset(){
  state.ticket++;state.side="left";state.phase="idle";state.sperm="idle";state.fertilised=false;
  Object.keys(group).forEach(function(k){show(group[k],false);});
  update();status("FSH supports development of ovarian follicles. Select an ovary or press FSH to begin.");
 }
 btn.fsh.addEventListener("click",function(){select(state.side);});
 btn.lh.addEventListener("click",ovulate);
 btn.sperm.addEventListener("click",introduceSperm);
 btn.fert.addEventListener("click",fertilise);
 btn.continue.addEventListener("click",noFertilisation);
 btn.reset.addEventListener("click",reset);
 root.querySelectorAll(".krp-ovary").forEach(function(o){
  function action(){select(o.dataset.side);}
  o.addEventListener("click",action);
  o.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();action();}});
 });
 update();
}
window.KeystoneReproductionSimulation={render:markup,mount:mount};
})();

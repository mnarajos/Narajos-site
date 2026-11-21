/* Keystone Human Biology: independent learning only. No coursework functions or submissions. */
(function(){
"use strict";
var D=window.KeystoneHumanData, scheduler=window.KeystoneReview;
var main=document.getElementById("main");
if(!D||!scheduler||!main){if(main)main.textContent="This revision app could not load. Please refresh the page.";return;}
var areas=D.areas, sections=[],bySection={},cards=[],byCard={},areaById={};
areas.forEach(function(area){
 areaById[area.id]=area;
 area.sections.forEach(function(section){
  section.areaId=area.id;section.areaTitle=area.title;
  bySection[section.id]=section;sections.push(section);
  section.cards.forEach(function(card){card.sectionId=section.id;card.areaId=area.id;byCard[card.id]=card;cards.push(card);});
 });
});
var review=scheduler.open("ocr-human-biology-f170");
var sessionKey="narajos-human-biology-session-v1",practiceKey="narajos-human-biology-practice-v1";
var progress={};try{var raw=JSON.parse(localStorage.getItem(practiceKey)||"null");if(raw&&typeof raw==="object"&&!Array.isArray(raw))progress=raw;}catch(_){}
var active=null,previousRoute="",allowRoute=false,pending=null;
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(x){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x];});}
function slugArea(id){return id==="all"?"all":(id||"").replace(/^area-/,"");}
function shuffle(input){var a=input.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),v=a[i];a[i]=a[j];a[j]=v;}return a;}
function storePractice(){try{localStorage.setItem(practiceKey,JSON.stringify(progress));}catch(_){}}
function saveSession(){try{if(active)localStorage.setItem(sessionKey,JSON.stringify(active));else localStorage.removeItem(sessionKey);}catch(_){}}
function restoreSession(){try{var old=JSON.parse(localStorage.getItem(sessionKey)||"null");if(!old||!Array.isArray(old.queue)||!old.queue.length||old.complete===true)return null;
 if(old.type==="cards"&&!old.queue.every(function(id){return !!byCard[id];}))return null;
 if(old.type==="practice"&&!old.queue.every(function(id){return !!bySection[id];}))return null;
 return old;}catch(_){return null;}}
function render(html){main.innerHTML=html;window.scrollTo(0,0);main.focus({preventScroll:true});updateNav();}
function updateNav(){var here=previousRoute.split("/")[0]||"home";document.querySelectorAll(".nav a").forEach(function(a){var r=a.getAttribute("href").slice(1);if((r==="home"&&here==="home")||(r==="topics"&&(here==="area"||here==="learn"||here==="topics"))||(r==="flashcards"&&(here==="flashcards"||here==="cards"||here==="review"))||(r==="practice"&&here==="practice")||(r==="challenge"&&here==="challenge")||(r==="knowledge"&&here==="knowledge")||(r==="catchup"&&here==="catchup"))a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});}
function link(h,label,cls){return '<a class="button '+(cls||"secondary")+'" href="#'+esc(h)+'">'+esc(label)+'</a>';}
function metric(n,label){return '<div class="metric"><strong>'+esc(n)+'</strong><span>'+esc(label)+'</span></div>';}
function stats(){var ids=cards.map(function(c){return c.id;}),r=review.stats(ids);var done=Object.keys(progress).filter(function(id){return progress[id]&&progress[id].good>0;}).length;
 return {cards:cards.length,areas:areas.length,sections:sections.length,done:done,due:r.due,weak:r.weak,seen:r.seen,newCards:r.new};}
function topicLabel(s){return '<span class="tag">'+esc(s.id)+' · '+esc(s.areaTitle)+'</span>';}
function crumb(dest,label){return '<p class="crumb"><a href="#'+esc(dest)+'">← '+esc(label)+'</a></p>';}
function sourceNote(){return '<p class="source-note">Independent study content mapped to <a href="'+esc(D.specUrl)+'" target="_blank" rel="noopener">Cambridge OCR Human Biology specification, version 8 (October 2026)</a>. This app is not affiliated with or endorsed by Cambridge OCR.</p>';}
function scopeName(scope){
 if(scope==="all")return "All F170 topics";
 if(areaById[scope])return "Topic Area "+areaById[scope].number+": "+areaById[scope].title;
 if(bySection[scope])return bySection[scope].id+": "+bySection[scope].title;
 if(scope==="due")return "Due flashcards";
 if(scope==="weak")return "Weak flashcards";
 if(scope==="new")return "New flashcards";
 return "F170";
}
function areaHtml(a){
 var count=a.sections.reduce(function(n,s){return n+s.cards.length;},0);
 return '<article class="paper area-card"><span class="number">TOPIC AREA '+a.number+'</span><h3>'+esc(a.title)+'</h3><p>'+esc(a.intro)+'</p><p class="summary">'+a.sections.length+' learning sections · '+count+' flashcards</p><div class="area-actions">'+link("area/"+a.id,"Explore topics","primary")+link("cards/"+a.id,"Flashcards")+link("practice/"+a.id,"Practice")+'</div></article>';
}
function kIcon(name){var E=window.KeystoneHumanChallenge;return E&&E.icon?E.icon(name):"▤";}
function showHome(){
 var st=stats(),old=restoreSession(),E=window.KeystoneHumanChallenge,fs=E?E.stats("f170"):null,hs=E?E.stats("f171"):null;
 var icon=E&&E.icon?E.icon:function(){return "▤";};
 var h='<div class="k-wrap"><section class="k-home-hero"><span class="k-eyebrow">Narajos Keystone · Cambridge OCR AAQ</span><h1>Ready to revise?</h1><p>Choose an exam unit, then practise the biology.</p></section>';
 h+='<section class="k-home-units" aria-label="Choose your exam unit">';
 h+='<a class="k-home-unit teal" href="#challenge/f170"><span class="k-unit-symbol">'+icon("brain")+'</span><span class="k-unit-copy"><small>F170 · Exam unit</small><strong>Fundamentals of human biology</strong><em>'+(fs?fs.questions:0)+' varied questions · '+(fs?fs.seen:0)+' attempted</em></span><span class="k-unit-chev">›</span></a>';
 h+='<a class="k-home-unit blue" href="#challenge/f171"><span class="k-unit-symbol">'+icon("flask")+'</span><span class="k-unit-copy"><small>F171 · Exam unit · Preview</small><strong>Health and disease</strong><em>'+(hs?hs.questions:0)+' original questions · '+(hs?hs.seen:0)+' attempted</em></span><span class="k-unit-chev">›</span></a>';
 h+='</section>';
 h+='<section class="k-companion-entry"><div class="k-companion-symbol">'+kIcon("book")+'</div><div><strong>Missed a lesson or feeling unsure?</strong><p>Catch up with a few key ideas, then return to questions.</p></div>'+link("catchup","Catch up","secondary")+'</section>';
 h+='<a class="k-more-units" href="#knowledge"><span>'+kIcon("book")+'</span><span><strong>Other Human Biology units</strong><small>F172–F177 · Knowledge questions only</small></span><span aria-hidden="true">›</span></a>';
 h+='<h2 class="k-subhead">Other ways to revise F170</h2><section class="k-home-actions">';
 h+='<a href="#flashcards" class="k-mini-action flash"><span class="k-mini-symbol">'+kIcon("layers")+'</span><strong>Flashcards</strong><small>Recall and spaced review</small></a>';
 h+='<a href="#topics" class="k-mini-action learn"><span class="k-mini-symbol">'+kIcon("book")+'</span><strong>Learn a topic</strong><small>Short explanations</small></a>';
 h+='<a href="#challenge/f170/weak" class="k-mini-action fix"><span class="k-mini-symbol">'+kIcon("rotate")+'</span><strong>Fix mistakes</strong><small>Try missed questions</small></a>';
 h+='</section>';
 if(old)h+='<section class="k-continue"><div><strong>Unfinished flashcards or explanation practice</strong><p>Continue your saved set.</p></div>'+link("resume","Resume","primary")+'</section>';
 var savedChallenge=E&&E.hasResume();
 if(savedChallenge){var route=E.resumeRoute();h+='<section class="k-continue"><div><strong>Revision questions in progress</strong><p>Return to your unfinished questions.</p></div>'+link(route,"Resume questions","primary")+'</section>';}
 h+='<p class="k-small-note">F170 covers the four topic areas in this first learning bank; F171 exam questions are an initial selection. This is not yet complete specification coverage. Original questions only; no coursework assistance.</p><p class="k-privacy-small">Your progress stays in this browser. <button class="k-local-reset" id="clear-human-bio" type="button">Clear progress on this device</button></p></div>';
 render(h);
}
function showTopics(){render(crumb("home","Overview")+'<div class="hero"><div class="eyebrow">F170 topic map</div><h1>Explore the specification</h1><p class="lead">Select an area to study its learning sections. This pilot does not yet cover every individual breadth-and-depth statement.</p></div><div class="grid">'+areas.map(areaHtml).join("")+'</div>'+sourceNote());}
function showArea(id){
 var a=areaById[id];if(!a)return notFound();
 var h=crumb("topics","All topic areas")+'<div class="k-compact-hero"><div class="eyebrow">F170 · Topic Area '+a.number+'</div><h1>'+esc(a.title)+'</h1></div>';
 h+='<div class="k-quick-buttons"><a class="k-shortcut primary" href="#challenge/f170/a'+a.number+'"><span class="k-mini-symbol">'+kIcon("bolt")+'</span><span><strong>Practise questions</strong><small>Different formats and feedback</small></span></a><a class="k-shortcut secondary" href="#cards/'+a.id+'"><span class="k-mini-symbol">▤</span><span><strong>Flashcards</strong><small>Active recall</small></span></a></div>';
 h+='<h2 class="k-subhead">Learn a specific topic</h2><div class="lesson-list">';
 a.sections.forEach(function(s){h+='<article class="paper lesson"><div><span class="num">'+esc(s.id)+'</span><h3>'+esc(s.title)+'</h3></div><div class="right">'+link("learn/"+s.id,"Open topic")+'</div></article>';});
 render('<div class="k-wrap">'+h+'</div></div>');
}
function showLearn(id){
 var s=bySection[id];if(!s)return notFound();
 var h='<div class="learning">'+crumb("area/"+s.areaId,"Topic Area "+areaById[s.areaId].number)+'<div class="eyebrow">Learning · '+esc(s.id)+'</div><h1>'+esc(s.title)+'</h1><p class="lead">'+esc(s.summary)+'</p><section class="paper"><h2>What you need to understand</h2><ul class="keylines">'+s.points.map(function(x){return '<li>'+esc(x)+'</li>';}).join("")+'</ul><div class="callout"><strong>Check your understanding</strong><p>Can you explain these ideas without looking? If not, read again before attempting the flashcards.</p></div><div class="actions">'+link("cards/"+s.id,"Recall with flashcards","primary")+link("practice/"+s.id,"Apply to a question")+'</div></section><div class="session-tools">'+link("area/"+s.areaId,"Back to topic area")+'</div></div>'+sourceNote();
 render(h);
}
function cardsFor(scope){
 if(scope==="due")return cards.filter(function(c){return review.due(c.id);});
 if(scope==="weak")return cards.filter(function(c){return review.weak(c.id);});
 if(scope==="new")return cards.filter(function(c){return !review.get(c.id);});
 if(scope==="all")return cards.slice();
 if(areaById[scope])return cards.filter(function(c){return c.areaId===scope;});
 if(bySection[scope])return bySection[scope].cards.slice();
 return [];
}
function sectionsFor(scope){
 if(scope==="all")return sections.slice();
 if(areaById[scope])return areaById[scope].sections.slice();
 if(bySection[scope])return [bySection[scope]];
 return [];
}
function chooserOptions(mode){
 return '<div class="grid">'+areas.map(function(a){var n=mode==="cards"?cardsFor(a.id).length:a.sections.length;return '<div class="paper area-card"><span class="number">TOPIC AREA '+a.number+'</span><h3>'+esc(a.title)+'</h3><p>'+n+' '+(mode==="cards"?"cards":"practice prompts")+'</p><div class="area-actions">'+link((mode==="cards"?"cards/":"practice/")+a.id,mode==="cards"?"Start flashcards":"Start practice","primary")+'</div></div>';}).join("")+'</div>';
}
function showFlashMenu(){
 var st=stats();
 var h=crumb("home","Overview")+'<div class="k-compact-hero"><div class="eyebrow">F170 · Active recall</div><h1>Flashcards</h1></div>';
 h+='<div class="k-mini-stats"><span><strong>'+st.due+'</strong> due today</span><span><strong>'+st.weak+'</strong> previously missed</span><span><strong>'+st.newCards+'</strong> new</span></div>';
 h+='<div class="k-action-grid"><a class="k-action teal" href="#cards/due"><span class="k-mini-symbol">↻</span><span><strong>Review due cards</strong><small>Spaced practice</small></span><span>›</span></a><a class="k-action orange" href="#cards/weak"><span class="k-mini-symbol">'+kIcon("alert")+'</span><span><strong>Weak cards</strong><small>Revisit errors</small></span><span>›</span></a><a class="k-action blue" href="#cards/new"><span class="k-mini-symbol">'+kIcon("layers")+'</span><span><strong>Learn new cards</strong><small>Try unfamiliar terms</small></span><span>›</span></a><a class="k-action purple" href="#cards/all"><span class="k-mini-symbol">▤</span><span><strong>Mixed revision</strong><small>Across F170</small></span><span>›</span></a></div>';
 h+='<h2 class="k-subhead">By topic</h2>'+chooserOptions("cards")+'<p class="k-small-note">Type first, reveal, then self-assess equivalent scientific wording. Your review progress remains in this browser.</p>';
 render('<div class="k-wrap">'+h+'</div>');
}
function showPracticeMenu(){
 var st=stats();
 render('<div class="k-wrap">'+crumb("home","Overview")+'<div class="k-compact-hero"><div class="eyebrow">F170 · Explanation practice</div><h1>Explain the biology</h1><p>Write a short answer, then check the key points.</p></div><div class="k-quick-buttons"><a class="k-shortcut primary" href="#challenge/f170/all"><span class="k-mini-symbol">⚡</span><span><strong>Varied exam questions</strong><small>Choose, order, calculate and explain</small></span></a><a class="k-shortcut secondary" href="#practice/all"><span class="k-mini-symbol">'+kIcon("book")+'</span><span><strong>Explanation-only practice</strong><small>'+st.sections+' independent prompts</small></span></a></div><h2 class="k-subhead">Choose a topic</h2>'+chooserOptions("practice")+'</div>');
}
function createSession(type,scope){
 var selected=type==="cards"?cardsFor(scope).map(function(x){return x.id;}):sectionsFor(scope).map(function(x){return x.id;});
 if(!selected.length)return empty("No items are available in this selection. Try another topic or review mode.");
 var n=(areaById[scope]||scope==="all")?10:12;
 selected=shuffle(selected).slice(0,n);
 active={type:type,scope:scope,queue:selected,initial:selected.length,completed:0,phase:"question",draft:"",first:{},correctFirst:0,started:Date.now()};
 saveSession();drawSession();
}
function showCard(){
 var id=active.queue[0],c=byCard[id];if(!c){active.queue.shift();saveSession();return drawSession();}
 var h='<div class="flash-panel">'+crumb("flashcards","Flashcards")+'<div class="eyebrow">'+esc(scopeName(active.scope))+'</div><h1>Recall the biology</h1>';
 h+='<section class="paper"><div class="flash-brow"><span>'+esc(c.sectionId)+' · '+esc(bySection[c.sectionId].title)+'</span><span>'+active.completed+' / '+active.initial+' completed</span></div><div class="progress-track" role="progressbar" aria-label="Flashcards completed" aria-valuemin="0" aria-valuemax="'+active.initial+'" aria-valuenow="'+Math.min(active.completed,active.initial)+'"><div style="width:'+(100*active.completed/active.initial)+'%"></div></div>';
 h+='<div class="eyebrow">Question</div><p class="question">'+esc(c.q)+'</p><label for="typed" class="small muted">Your answer (optional)</label><input id="typed" class="typed" autocomplete="off" spellcheck="false" placeholder="Try to recall before revealing">';
 h+='<button class="button primary" type="button" data-action="reveal">Reveal answer</button>';
 h+='<div class="answer-box" id="answer-box" hidden><div class="eyebrow">Expected answer</div><p class="answer">'+esc(c.a)+'</p>'+(c.explain?'<p class="small">'+esc(c.explain)+'</p>':'')+'<p id="comparison" class="feedback" aria-live="polite"></p><div class="action-row"><button class="button secondary" data-action="again" type="button">Not yet · show again</button><button class="button primary" data-action="got-it" type="button">Got it</button></div></div></section>';
 h+='<p class="source-note">Equivalent accurate scientific wording may be acceptable. Use the expected answer to judge the underlying concept, not spelling alone.</p></div>';
 render(h);var input=document.getElementById("typed");if(input){input.value=active.draft||"";input.focus();input.addEventListener("input",function(){active.draft=input.value;saveSession();});input.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();var b=main.querySelector('[data-action="reveal"]');if(b)b.click();}});}
 if(active.phase==="answer")reveal(true);
}
function showPractice(){
 var id=active.queue[0],s=bySection[id];if(!s){active.queue.shift();saveSession();return drawSession();}
 var h='<div class="flash-panel">'+crumb("practice","Practice")+'<div class="eyebrow">'+esc(scopeName(active.scope))+'</div><h1>Apply your knowledge</h1>';
 h+='<section class="paper"><div class="flash-brow"><span>'+esc(s.id)+' · '+esc(s.title)+'</span><span>'+active.completed+' / '+active.initial+' completed</span></div><div class="progress-track" role="progressbar" aria-label="Practice prompts completed" aria-valuemin="0" aria-valuemax="'+active.initial+'" aria-valuenow="'+Math.min(active.completed,active.initial)+'"><div style="width:'+(100*active.completed/active.initial)+'%"></div></div>';
 h+='<div class="eyebrow">Independent question</div><p class="question">'+esc(s.scenario.prompt)+'</p><label class="small muted" for="typed">Write an explanation, then compare it with the suggested response</label><textarea id="typed" class="typed" rows="4" placeholder="Write your explanation before revealing the suggested response"></textarea>';
 h+='<button type="button" class="button primary" data-action="reveal">Compare with suggested response</button><div class="answer-box" id="answer-box" hidden><div class="eyebrow">Suggested response</div><p class="answer">'+esc(s.scenario.answer)+'</p><p>'+esc(s.scenario.explain)+'</p><p class="feedback">Consider whether your answer contains the key biological point. This is not an OCR mark scheme.</p><div class="action-row"><button type="button" class="button secondary" data-action="again">Need more practice</button><button type="button" class="button primary" data-action="got-it">Understood</button></div></div></section></div>';
 render(h);var input=document.getElementById("typed");if(input){input.value=active.draft||"";input.addEventListener("input",function(){active.draft=input.value;saveSession();});input.addEventListener("keydown",function(e){if(e.key==="Enter"&&(e.ctrlKey||e.metaKey)){e.preventDefault();var b=main.querySelector('[data-action="reveal"]');if(b)b.click();}});}
 if(active.phase==="answer")reveal(true);
}
function reveal(restored){
 if(!active)return;
 var box=document.getElementById("answer-box"),button=main.querySelector('[data-action="reveal"]'),field=document.getElementById("typed");
 if(!box||!button||!field)return;
 var answer=active.type==="cards"?byCard[active.queue[0]].a:"";
 var exact=active.type==="cards"?review.matches(field.value,answer,byCard[active.queue[0]].aliases):false;
 if(active.type==="cards"){
  var comp=document.getElementById("comparison");
  if(comp)comp.textContent=!field.value.trim()?"No typed answer supplied. Judge your recall after reading the model answer.":exact?"Your response matches an approved wording. Check your understanding before selecting Got it.":"This is not an exact listed wording. A scientifically equivalent answer may still be correct: compare the meaning before grading.";
 }
 field.readOnly=true;box.hidden=false;button.hidden=true;active.draft=field.value;active.phase="answer";saveSession();
 if(!restored){var first=box.querySelector("button");if(first)first.focus();}
}
function rate(success){
 if(!active||active.phase!=="answer")return;
 var id=active.queue.shift();if(!id)return;
 if(active.type==="cards"){review.mark(id,success);}else{var p=progress[id]||{seen:0,good:0};p.seen++;if(success)p.good++;progress[id]=p;storePractice();}
 if(!(id in active.first)){active.first[id]=success;if(success)active.correctFirst++;}
 if(success){active.completed++;}else{active.queue.push(id);}
 active.phase="question";active.draft="";saveSession();drawSession();
}
function drawSession(){if(!active)return showHome();if(!active.queue.length)return finish();if(active.type==="cards")showCard();else showPractice();}
function finish(){
 var old=active;if(!old)return showHome();active=null;saveSession();
 var h='<div class="flash-panel">'+crumb(old.type==="cards"?"flashcards":"practice","Back to revision")+'<div class="eyebrow">Session complete</div><h1>Good work</h1><div class="paper panel"><h2>'+old.initial+' '+(old.type==="cards"?"flashcards":"questions")+' completed</h2><p>'+old.correctFirst+' answered confidently on the first attempt. Items marked “Not yet” were revisited in this set.</p>';
 if(old.type==="cards")h+='<p>Cards recalled successfully are scheduled to return after an interval. Your review progress stays in this browser.</p>';
 h+='<div class="actions">'+link(old.type==="cards"?"flashcards":"practice","Choose another set","primary")+link("home","Back to overview")+'</div></div></div>';
 render(h);
}
function empty(message){render(crumb("home","Overview")+'<div class="empty"><h2>Nothing to review here</h2><p>'+esc(message)+'</p><div class="actions">'+link("flashcards","Choose flashcards","primary")+link("practice","Practice instead")+'</div></div>');}
function notFound(){render('<div class="empty"><h1>Topic not found</h1><p>Try the topic overview to choose a current F170 section.</p>'+link("topics","Browse topics","primary")+'</div>');}
function runRoute(){
 var r=decodeURIComponent(location.hash.replace(/^#/,""))||"home";previousRoute=r;
 if(r==="home"){showHome();return;}
 if(r==="catchup"||r.startsWith("catchup/")){if(window.KeystoneHumanCatchup)return window.KeystoneHumanCatchup.route(r,render);return notFound();}
 if(r==="knowledge"||r==="challenge"||r.startsWith("challenge/")){if(window.KeystoneHumanChallenge)return window.KeystoneHumanChallenge.route(r,render);return notFound();}
 if(r==="topics"){showTopics();return;}
 if(r==="flashcards"){showFlashMenu();return;}
 if(r==="practice"){showPracticeMenu();return;}
 if(r==="resume"){active=restoreSession();if(active){drawSession();}else empty("There is no unfinished set to resume.");return;}
 var m=/^(area|learn|cards|practice)\/([a-zA-Z0-9.-]+)$/.exec(r);
 if(!m)return notFound();
 if(m[1]==="area")return showArea(m[2]);
 if(m[1]==="learn")return showLearn(m[2]);
 if(m[1]==="cards"||m[1]==="practice"){var type=m[1]==="cards"?"cards":"practice";if(!active){var old=restoreSession();if(old&&old.type===type&&old.scope===m[2])active=old;}if(!active||active.type!==type||active.scope!==m[2])createSession(type,m[2]);else drawSession();return;}
}
function showLeave(callback){
 var modal=document.getElementById("leave-dialog");
 pending=callback;modal.hidden=false;
 var keep=document.getElementById("leave-stay"),go=document.getElementById("leave-confirm");
 keep.focus();
 keep.onclick=function(){modal.hidden=true;pending=null;};
 go.onclick=function(){var cb=pending;pending=null;modal.hidden=true;active=null;if(window.KeystoneHumanChallenge)window.KeystoneHumanChallenge.pause();if(cb)cb();};
}
document.addEventListener("click",function(e){
 var btn=e.target.closest("#clear-human-bio");if(!btn)return;
 if(!window.confirm("Clear all Human Biology revision progress and unfinished sets saved in this browser? This cannot be undone."))return;
 var keys=["narajos-human-challenge-v2-session","narajos-human-challenge-v2-progress","narajos-human-biology-session-v1","narajos-human-biology-practice-v1","narajos-keystone-review-v1-ocr-human-biology-f170"];
 keys.forEach(function(k){try{localStorage.removeItem(k);}catch(_){}});
 location.reload();
});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){var m=document.getElementById("leave-dialog");if(!m.hidden){m.hidden=true;pending=null;document.getElementById("leave-stay").blur();}}});
document.addEventListener("click",function(e){
 var action=e.target.closest("[data-action]");
 if(action){if(action.getAttribute("data-action")==="reveal")reveal(false);if(action.getAttribute("data-action")==="again")rate(false);if(action.getAttribute("data-action")==="got-it")rate(true);return;}
 var a=e.target.closest("a[href]");if(!a||(!active&&!(window.KeystoneHumanChallenge&&window.KeystoneHumanChallenge.isActive())))return;
 var href=a.getAttribute("href")||"";
 if(href.startsWith("#")&&href.replace(/^#/,"")===previousRoute)return;
 if(href.startsWith("#")||href.startsWith("/")){
  e.preventDefault();
  showLeave(function(){allowRoute=true;location.assign(href);if(href.startsWith("#")&&href.slice(1)===previousRoute)runRoute();});
 }
});
window.addEventListener("hashchange",function(){
 var next=decodeURIComponent(location.hash.replace(/^#/,""))||"home";
 if((active||(window.KeystoneHumanChallenge&&window.KeystoneHumanChallenge.isActive()))&&next!==previousRoute&&!allowRoute){
  var restore=previousRoute;location.hash="#"+restore;
  showLeave(function(){allowRoute=true;location.hash="#"+next;});
  return;
 }
 allowRoute=false;runRoute();
});
window.addEventListener("beforeunload",function(e){if(active||(window.KeystoneHumanChallenge&&window.KeystoneHumanChallenge.isActive())){e.preventDefault();e.returnValue="";}});
window.KeystoneHumanApp={stats:stats,content:function(){return {areas:areas.length,sections:sections.length,cards:cards.length};}};
runRoute();
})();
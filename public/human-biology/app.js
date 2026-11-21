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
function updateNav(){var here=previousRoute.split("/")[0]||"home";document.querySelectorAll(".nav a").forEach(function(a){var r=a.getAttribute("href").slice(1);if((r==="home"&&here==="home")||(r==="topics"&&(here==="area"||here==="learn"||here==="topics"))||(r==="flashcards"&&(here==="flashcards"||here==="cards"||here==="review"))||(r==="practice"&&here==="practice"))a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});}
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
function showHome(){
 var st=stats(),old=restoreSession();
 var html='<section class="hero"><div class="eyebrow">Narajos Keystone · Cambridge Advanced National</div><h1>Human Biology</h1><p class="lead">Build your understanding of the human body with short explanations, active recall, spaced flashcards and independent practice.</p><p class="sub">Cambridge OCR AAQ · F170 Fundamentals of human biology</p></section>';
 html+='<aside class="pilot"><strong>F170 learning pilot.</strong> All four topic areas are represented, but this is a curated first bank, not yet complete statement-by-statement specification coverage. F171 and the learning-only parts of other units will follow. No coursework generation or assessment is provided.</aside>';
 if(old)html+='<section class="paper panel"><h2>Continue your session</h2><p>Your unfinished '+(old.type==="cards"?"flashcard":"practice")+' set is saved in this browser.</p>'+link("resume","Resume where you left off","primary")+'</section>';
 html+='<div class="section-head"><h2>Your revision at a glance</h2></div><div class="stats">'+metric(st.cards,"Original flashcards")+metric(st.seen,"Practised cards")+metric(st.due,"Due for review")+metric(st.done,"Topics practised successfully")+'</div>';
 html+='<div class="section-head"><h2>Choose a topic area</h2>'+link("topics","See all sections")+'</div><div class="grid">'+areas.map(areaHtml).join("")+'</div>';
 html+='<div class="section-head"><h2>Quick revision</h2></div><div class="two-actions"><div class="paper"><h3>Spaced flashcard review</h3><p>Return to earlier material at increasing intervals; retry missed cards.</p>'+link("flashcards","Choose a flashcard set","primary")+'</div><div class="paper"><h3>Apply your knowledge</h3><p>Answer original prompts, reveal a suggested response and evaluate your understanding.</p>'+link("practice","Choose practice","primary")+'</div></div>'+sourceNote();
 render(html);
}
function showTopics(){render(crumb("home","Overview")+'<div class="hero"><div class="eyebrow">F170 topic map</div><h1>Explore the specification</h1><p class="lead">Select an area to study its learning sections. This pilot does not yet cover every individual breadth-and-depth statement.</p></div><div class="grid">'+areas.map(areaHtml).join("")+'</div>'+sourceNote());}
function showArea(id){
 var a=areaById[id];if(!a)return notFound();
 var h=crumb("topics","All topic areas")+'<div class="hero"><div class="eyebrow">F170 · Topic Area '+a.number+'</div><h1>'+esc(a.title)+'</h1><p class="lead">'+esc(a.intro)+'</p><div class="actions">'+link("cards/"+a.id,"Revise flashcards","primary")+link("practice/"+a.id,"Apply knowledge")+'</div></div>';
 h+='<div class="section-head"><h2>Learning sections</h2></div><div class="lesson-list">';
 a.sections.forEach(function(s){var p=progress[s.id]||{};h+='<article class="paper lesson"><div><span class="num">'+esc(s.id)+'</span><h3>'+esc(s.title)+'</h3><p>'+esc(s.summary)+'</p></div><div class="right">'+(p.good?'<span class="pill">Practised</span>':'')+link("learn/"+s.id,"Learn","primary")+link("cards/"+s.id,"Cards")+'</div></article>';});
 render(h+'</div>'+sourceNote());
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
 var h=crumb("home","Overview")+'<div class="hero"><div class="eyebrow">Active recall</div><h1>Flashcards</h1><p class="lead">Type an answer, reveal the expected wording, then decide whether you recalled the essential biology. Answers are not graded solely by exact text matching.</p></div><div class="stats">'+metric(st.due,"Due now")+metric(st.weak,"Previously missed")+metric(st.newCards,"Not yet practised")+metric(st.seen,"Practised before")+'</div><div class="section-head"><h2>Recommended review</h2></div><div class="actions">'+link("cards/due","Review due cards","primary")+link("cards/weak","Review weak cards")+link("cards/new","Learn new cards")+link("cards/all","Mixed F170 cards")+'</div><div class="section-head"><h2>Choose a topic area</h2></div>'+chooserOptions("cards")+sourceNote();
 render(h);
}
function showPracticeMenu(){
 var st=stats();
 render(crumb("home","Overview")+'<div class="hero"><div class="eyebrow">Apply your knowledge</div><h1>Practice</h1><p class="lead">Original application prompts with a suggested response. Your answer is self-assessed: there is no unreliable automatic judgement of longer biological explanations.</p></div><div class="paper panel"><h2>Practice across F170</h2><p>'+st.sections+' independently authored prompts covering all four topic areas. The full statement-by-statement question bank is still being developed.</p>'+link("practice/all","Start mixed practice","primary")+'</div><div class="section-head"><h2>Choose a topic area</h2></div>'+chooserOptions("practice")+sourceNote());
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
 go.onclick=function(){var cb=pending;pending=null;modal.hidden=true;active=null;if(cb)cb();};
}
document.addEventListener("keydown",function(e){if(e.key==="Escape"){var m=document.getElementById("leave-dialog");if(!m.hidden){m.hidden=true;pending=null;document.getElementById("leave-stay").blur();}}});
document.addEventListener("click",function(e){
 var action=e.target.closest("[data-action]");
 if(action){if(action.getAttribute("data-action")==="reveal")reveal(false);if(action.getAttribute("data-action")==="again")rate(false);if(action.getAttribute("data-action")==="got-it")rate(true);return;}
 var a=e.target.closest("a[href]");if(!a||!active)return;
 var href=a.getAttribute("href")||"";
 if(href.startsWith("#")&&href.replace(/^#/,"")===previousRoute)return;
 if(href.startsWith("#")||href.startsWith("/")){
  e.preventDefault();
  showLeave(function(){allowRoute=true;location.assign(href);if(href.startsWith("#")&&href.slice(1)===previousRoute)runRoute();});
 }
});
window.addEventListener("hashchange",function(){
 var next=decodeURIComponent(location.hash.replace(/^#/,""))||"home";
 if(active&&next!==previousRoute&&!allowRoute){
  var restore=previousRoute;location.hash="#"+restore;
  showLeave(function(){allowRoute=true;location.hash="#"+next;});
  return;
 }
 allowRoute=false;runRoute();
});
window.addEventListener("beforeunload",function(e){if(active){e.preventDefault();e.returnValue="";}});
window.KeystoneHumanApp={stats:stats,content:function(){return {areas:areas.length,sections:sections.length,cards:cards.length};}};
runRoute();
})();
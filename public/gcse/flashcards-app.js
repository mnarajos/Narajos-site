/* GCSE Combined Science flashcards. Uses KeystoneReview and the topic-specific data files. */
(function(root){
"use strict";
function create(env){
 var E=env, engine=root.KeystoneReview.open("gcse-trilogy-8464");
 var prefKey="narajos-gcse-fc-pref-v1", activeKey="narajos-gcse-fc-active-v1", pref={typed:false,reverse:false};
 try{Object.assign(pref,JSON.parse(localStorage.getItem(prefKey)||"{}"));}catch(_){}
 var cards=[],byId={},active=null;
 var topicInfo={};
 E.SCI.forEach(function(sc){sc.topics.forEach(function(t){topicInfo[t[0]]={name:t[2],subject:sc.name};});});
 Object.keys(root.KeystoneGcseDecks||{}).forEach(function(t){
  (root.KeystoneGcseDecks[t]||[]).forEach(function(row,i){
   var card={id:t+"-"+String(i+1).padStart(3,"0"),topic:t,front:row[0],back:row[1],
    aliases:row[2]||[],tier:row[3]||"F"};
   cards.push(card);byId[card.id]=card;
  });
 });
 function valid(card){return card&&!(card.tier==="H"&&E.getTier()==="F");}
 function pool(){return cards.filter(valid);}
 function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
 function reverseCard(c){
  var m=/^Define (.+)$/i.exec(c.front);if(!m)return null;
  return {id:c.id+":reverse",topic:c.topic,front:"Which term is defined as: "+c.back+"?",back:m[1],aliases:[],tier:c.tier};
 }
 function withReverse(list){
  var arr=list.slice();if(pref.reverse)list.forEach(function(c){var r=reverseCard(c);if(r)arr.push(r);});
  return arr;
 }
 function card(id){if(byId[id])return byId[id];if(id.endsWith(":reverse")){var b=byId[id.slice(0,-8)];return b&&reverseCard(b);}return null;}
 function storePrefs(){try{localStorage.setItem(prefKey,JSON.stringify(pref));}catch(_){}}
 function saveActive(){try{if(active&&!active.over)localStorage.setItem(activeKey,JSON.stringify(active));else localStorage.removeItem(activeKey);}catch(_){}}
 function restored(){
  try{var a=JSON.parse(localStorage.getItem(activeKey)||"null");if(!a||a.over||!Array.isArray(a.queue)||!a.queue.length||!a.route||!Array.isArray(a.original))return null;
   if(!a.queue.every(function(id){return !!card(id);})){return null;}return a;
  }catch(_){return null;}
 }
 function eligibleIds(){return pool().map(function(c){return c.id;});}
 function stats(){return engine.stats(eligibleIds());}
 function menu(){
  active=null;var st=stats(),resume=restored();
  var h='<p class="crumb"><a href="#">← Home</a></p><h1>Flashcards</h1>'+
   '<p class="lead">Recall essential GCSE science knowledge, then check and mark your answer. Cards you miss return later in the session; successful cards come back on later days.</p>'+
   '<section class="kr-entry"><h2>Review for today</h2>'+
   '<div class="kr-metrics"><span><strong>'+st.due+'</strong> due</span><span><strong>'+st.seen+'</strong> practised</span><span><strong>'+st.weak+'</strong> needing attention</span><span><strong>'+st.retained+'</strong> at a longer review interval</span></div>'+
   '<div class="kr-actions"><a class="btn primary" href="#flashreview">Review due cards</a><a class="btn" href="#flashweak">My weak cards</a><a class="btn" href="#flashmixed">Mixed new cards</a></div>'+
   (resume?'<p class="kr-subtle" style="margin-top:12px"><a class="btn" href="#flashresume">Resume unfinished flashcards ('+resume.queue.length+' remaining)</a></p>':'')+
   '<p class="kr-subtle" style="margin-top:12px">Progress stays in this browser. No login required. New cards are not considered overdue until you have studied them.</p></section>'+
   '<div class="kr-choice"><label><input id="kr-typed" type="checkbox"'+(pref.typed?' checked':'')+'> Type my answers (optional)</label>'+
   '<label><input id="kr-reverse" type="checkbox"'+(pref.reverse?' checked':'')+'> Include reverse definition cards</label></div>';
  E.PAPERS.forEach(function(p){
   var pcs=pool().filter(function(c){return p.topics.indexOf(c.topic)>=0;});
   h+='<section class="kr-section"><h2>'+E.esc(p.name)+'</h2><p class="kr-subtle">'+pcs.length+' recall cards · Foundation and Higher filtered according to Settings</p>'+
     '<div class="kr-actions"><a href="#paperflash-'+p.id+'" class="btn">Mixed cards for this paper</a></div><div class="kr-decks">';
   p.topics.forEach(function(t){
    var info=topicInfo[t],list=pool().filter(function(c){return c.topic===t;}),n=engine.stats(list.map(function(c){return c.id;}));
    if(info)h+='<a class="kr-deck" href="#cards-'+t+'"><strong>'+E.esc(info.name)+'</strong><small>'+list.length+' cards · '+n.seen+' practised · '+n.due+' due</small></a>';
   });
   h+='</div></section>';
  });
  E.render(h);
  var t=document.getElementById("kr-typed"),r=document.getElementById("kr-reverse");
  t.onchange=function(){pref.typed=t.checked;storePrefs();};
  r.onchange=function(){pref.reverse=r.checked;storePrefs();};
 }
 function select(route){
  var base=pool(),ids=[];
  if(route==="flashreview"){
   ids=base.filter(function(c){return engine.due(c.id);});
   if(pref.reverse)return shuffle(ids.concat(base.map(reverseCard).filter(function(c){return c&&engine.due(c.id);}))).map(function(c){return c.id;});
   return shuffle(ids).map(function(c){return c.id;});
  }
  else if(route==="flashweak"){
   ids=base.filter(function(c){return engine.weak(c.id);});
   if(pref.reverse)return shuffle(ids.concat(base.map(reverseCard).filter(function(c){return c&&engine.weak(c.id);}))).map(function(c){return c.id;});
   return shuffle(ids).map(function(c){return c.id;});
  }
  else if(route==="flashmixed")ids=shuffle(base.filter(function(c){return !engine.get(c.id);})).slice(0,15);
  else if(/^cards-[bcp]\d+$/.test(route))ids=base.filter(function(c){return c.topic===route.slice(6);});
  else if(/^paperflash-[bcp]\d$/.test(route)){
   var p=E.PAPERS.filter(function(p){return p.id===route.slice(11);})[0];ids=p?base.filter(function(c){return p.topics.indexOf(c.topic)>=0;}):[];
   ids=shuffle(ids).slice(0,15);
  }
  ids=withReverse(ids);
  return shuffle(ids).map(function(c){return c.id;});
 }
 function applyTier(session){
  if(!session)return session;
  var allowed=function(id){return valid(card(id));};
  var oldFront=session.queue[0];session.queue=session.queue.filter(allowed);
  if(oldFront!==session.queue[0]){session.phase="front";delete session.draftId;delete session.draft;}
  session.original=session.original.filter(allowed);
  session.complete=Math.min(session.complete,session.original.length);
  return session;
 }
 function session(route){
  var prior=applyTier(restored());
  if(route==="flashresume"){if(!prior||!prior.queue.length)return empty("There is no unfinished flashcard session compatible with your current tier.");active=prior;if(E.pushGuard)E.pushGuard();return show();}
  if(prior&&prior.route===route&&prior.queue.length){active=prior;if(E.pushGuard)E.pushGuard();return show();}
  var ids=select(route);
  if(!ids.length)return empty(route==="flashreview"?"No reviews are due yet. Choose a topic to learn new cards.":route==="flashweak"?"No weak cards recorded yet. Practise some flashcards first.":"No cards are available for this selection.");
  active={route:route,original:ids.slice(),queue:ids.slice(),first:{},attempts:{},complete:0,started:Date.now(),over:false,
   typed:!!pref.typed,reverse:!!pref.reverse,phase:"front"};
  saveActive();
  if(E.pushGuard)E.pushGuard();
  show();
 }
 function empty(message){
  active=null;E.render('<p class="crumb"><a href="#flashcards">← Flashcards</a></p><h1>Flashcards</h1><div class="kr-empty"><p>'+E.esc(message)+'</p><a class="btn primary" href="#flashcards">Choose cards</a></div>');
 }
 function show(){
  if(!active||!active.queue.length)return finished();
  var c=card(active.queue[0]);if(!c||!valid(c)){var excluded=active.queue.shift();active.original=active.original.filter(function(id){return id!==excluded;});saveActive();return show();}
  var s=active,completed=s.complete,total=s.original.length;
  var h='<p class="crumb"><a href="#flashcards">✕ Leave flashcards</a></p>'+
   '<h1>Flashcard review</h1><p class="kr-subtle">'+E.esc((topicInfo[c.topic]||{}).name||"Mixed science")+' · '+completed+' of '+total+' cards completed · '+s.queue.length+' remaining in queue</p>'+
   '<div class="kr-progress" role="progressbar" aria-valuemin="0" aria-valuemax="'+total+'" aria-valuenow="'+Math.min(completed,total)+'" aria-label="Cards completed"><div style="width:'+(100*Math.min(1,completed/total))+'%"></div></div>'+
   '<section class="kr-review-card" aria-labelledby="kr-front"><p class="kr-label">Recall the answer before revealing it</p>'+
   '<p id="kr-front" class="kr-question">'+E.esc(c.front)+'</p>'+
   (s.typed?'<label for="kr-input" class="kr-subtle">Your answer</label><input class="kr-typed" id="kr-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false">':'')+
   '<div class="kr-actions"><button type="button" class="btn primary" id="kr-reveal">Reveal answer</button></div>'+
   '<div class="kr-result" id="kr-result" hidden><p class="kr-label">Expected answer</p><p class="kr-answer">'+E.esc(c.back)+'</p>'+
   '<p class="kr-typed-feedback" id="kr-comparison" aria-live="polite"></p>'+
   '<p class="kr-subtle">Did you recall the essential idea? If your scientifically correct answer uses different wording, mark it yourself.</p>'+
   '<div class="kr-grade"><button type="button" class="btn" id="kr-again">Not yet — show again</button><button type="button" class="btn primary" id="kr-good">Record my recall</button><button type="button" class="btn" id="kr-reviewed">Finish as reviewed</button></div></div></section>';
  E.render(h,false);
  root.KeystoneReview.bindReview(active,active.queue[0],function(value){return engine.matches(value,c.back,c.aliases);},saveActive,function(outcome){
   root.KeystoneReview.recordReview(active,engine,outcome);saveActive();
   if(active.queue.length)show();else finished();
  });
 }
 function finished(){
  if(!active)return menu();
  var total=active.original.length;
  active.over=true;saveActive();
  var h='<p class="crumb"><a href="#flashcards">← Flashcards</a></p><h1>Review complete</h1>'+
   '<div class="kr-entry"><h2>'+total+' cards completed</h2><p>'+root.KeystoneReview.firstReviewText(active)+'</p>'+
   '<p>Successful cards will reappear after a delay, rather than counting as permanently mastered today.</p>'+
   '<div class="kr-actions"><a class="btn primary" href="#flashcards">Choose another set</a><a class="btn" href="#flashreview">Review due cards</a></div></div>';
  E.render(h);active=null;
 }
 function route(hash){
  if(hash==="flashcards")return menu();
  if(/^flash(?:review|weak|mixed|resume)$/.test(hash)||/^cards-[bcp]\d+$/.test(hash)||/^paperflash-[bcp]\d$/.test(hash))return session(hash);
  menu();
 }
 function isActive(){return !!(active&&!active.over);}
 return {route:route,isActive:isActive,stats:stats,hasContent:function(){return cards.length>0;},count:function(){return cards.length;}};
}
root.KeystoneGcseFlash={create:create};
})(window);

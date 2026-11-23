/* A-level Biology spaced reviews, alongside the existing untimed, timed, and reverse decks. */
(function(root){
"use strict";
function create(E){
 var engine=root.KeystoneReview.open("aqa-alevel-biology-7402");
 var storageKey="narajos-alevel-spaced-active-v1", cards=[],byId={},byRef=new WeakMap(),active=null;
 function hash(s){var x=2166136261;for(var i=0;i<s.length;i++){x^=s.charCodeAt(i);x=Math.imul(x,16777619);}return(x>>>0).toString(36);}
 Object.keys(E.CARDS).forEach(function(deck){
  E.CARDS[deck].forEach(function(c){
   var id=deck+":"+hash(String(c[0])+"|"+String(c[1]));
   var o={id:id,deck:deck,front:String(c[0]),back:String(c[1]),aliases:Array.isArray(c[2])?c[2]:[],note:typeof c[3]==="string"?c[3]:""};
   if(!byId[id]){byId[id]=o;cards.push(o);}
   byRef.set(c,id);
  });
 });
 function allIds(){return cards.map(function(c){return c.id;});}
 function reverseId(c){return c.id+":reverse";}
 function lookup(id){var r=id.endsWith(":reverse"),base=r?id.slice(0,-8):id;return byId[base]||null;}
 function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var x=a[i];a[i]=a[j];a[j]=x;}return a;}
 function progress(){return engine.stats(allIds());}
 function trackExisting(deck,c,good,reverse){
  var id=byRef.get(c);if(!id&&c){var d=E.CARDS[deck]||[];var match=d.filter(function(x){return x[0]===c[0]&&x[1]===c[1];})[0];if(match)id=byRef.get(match);}
  if(id)engine.mark(id+(reverse?":reverse":""),!!good);
 }
 function saveActive(){try{if(active&&!active.over)localStorage.setItem(storageKey,JSON.stringify(active));else localStorage.removeItem(storageKey);}catch(_){}}
 function restore(){try{var a=JSON.parse(localStorage.getItem(storageKey)||"null");if(a&&a.queue&&Array.isArray(a.queue)&&a.queue.length&&a.queue.every(function(id){return !!lookup(id);})&&Array.isArray(a.original)&&a.route&&!a.over)return a;}catch(_){}return null;}
 function menu(){
  active=null;var st=progress(),r=restore(),total=cards.length;
  var h='<p class="crumb"><a href="#flashcards">← Flashcards</a></p><h1>Spaced flashcard review</h1>'+
   '<p class="lead">Cards you know return after increasingly long intervals. Cards you miss return during the session and are scheduled for further review. Progress is kept in this browser.</p>'+
   '<section class="kr-entry"><h2>Review for today</h2><div class="kr-metrics">'+
   '<span><strong>'+st.due+'</strong> due</span><span><strong>'+st.seen+'</strong> practised</span><span><strong>'+st.weak+'</strong> needing attention</span><span><strong>'+st.retained+'</strong> at a longer review interval</span><span><strong>'+total+'</strong> in the bank</span></div>'+
   '<div class="kr-actions"><a href="#spaced-due" class="btn primary">Review due cards</a>'+
   '<a href="#spaced-new" class="btn">Learn new cards</a><a href="#spaced-weak" class="btn">My weak cards</a><a href="#spaced-reverse" class="btn">Reverse definitions</a></div>'+
   (r?'<p style="margin-top:14px"><a href="#spaced-resume" class="btn">Resume unfinished set ('+r.queue.length+' remaining)</a></p>':'')+
   '<p class="kr-subtle" style="margin-top:12px">Existing topic, timed and reverse flashcard practice also contributes to this review history. You can continue using those modes.</p></section>';
  E.render(h);
 }
 function pick(route){
  var list=cards;
  if(route==="spaced-due")list=list.filter(function(c){return engine.due(c.id);});
  else if(route==="spaced-weak")list=list.filter(function(c){return engine.weak(c.id);});
  else if(route==="spaced-new")list=list.filter(function(c){return !engine.get(c.id);});
  else if(route==="spaced-reverse"){
   list=list.filter(function(c){return engine.due(reverseId(c))||!engine.get(reverseId(c));});
   return shuffle(list).slice(0,12).map(function(c){return reverseId(c);});
  }
  return shuffle(list).slice(0,route==="spaced-due"?20:12).map(function(c){return c.id;});
 }
 function start(route){
  var old=restore();
  if(route==="spaced-resume"){if(!old)return empty("There is no unfinished set.");active=old;if(E.guardOn)E.guardOn();return show();}
  if(old&&old.route===route){active=old;if(E.guardOn)E.guardOn();return show();}
  var ids=pick(route);
  if(!ids.length)return empty(route==="spaced-due"?"No reviews are due today. You can study new cards instead.":route==="spaced-weak"?"You have no recorded weak cards yet.":"No cards available in this selection.");
  active={route:route,original:ids.slice(),queue:ids.slice(),first:{},complete:0,over:false,phase:"front"};
  saveActive();if(E.guardOn)E.guardOn();show();
 }
 function empty(message){
  active=null;E.render('<p class="crumb"><a href="#spaced">← Spaced review</a></p><h1>Spaced review</h1><div class="kr-empty"><p>'+E.esc(message)+'</p><a class="btn primary" href="#spaced">Choose another set</a></div>');
 }
 function show(){
  if(!active||!active.queue.length)return finish();
  var id=active.queue[0],base=lookup(id);if(!base){active.queue.shift();saveActive();return show();}
  var reverse=id.endsWith(":reverse"),front=reverse?base.back:base.front,answer=reverse?base.front:base.back;
  var total=active.original.length;
  var h='<p class="crumb"><a href="#spaced">✕ Leave review</a></p><h1>Spaced review</h1>'+
    '<p class="kr-subtle">'+E.esc(base.deck.toUpperCase())+' · '+active.complete+' of '+total+' completed · '+active.queue.length+' in queue</p>'+
    '<div class="kr-progress" role="progressbar" aria-valuemin="0" aria-valuemax="'+total+'" aria-valuenow="'+Math.min(total,active.complete)+'" aria-label="Cards completed"><div style="width:'+(100*Math.min(1,active.complete/total))+'%"></div></div>'+
    '<section class="kr-review-card"><p class="kr-label">'+(reverse?"Give the definition":"Recall the key term")+'</p>'+
    '<p class="kr-question">'+(reverse?E.esc(front):E.fmt(front))+'</p>'+
    '<label for="kr-input" class="kr-subtle">Your answer (optional)</label><input type="text" class="kr-typed" id="kr-input" autocomplete="off" spellcheck="false">'+
    '<button type="button" class="btn primary" id="kr-reveal">Reveal answer</button>'+
    '<div class="kr-result" id="kr-result" hidden><p class="kr-label">Expected answer</p><p class="kr-answer">'+(reverse?E.fmt(answer):E.esc(answer))+'</p>'+
    (base.note&&!reverse?'<p class="kr-subtle">'+E.esc(base.note)+'</p>':'')+
    '<p class="kr-typed-feedback" id="kr-comparison" aria-live="polite"></p><p class="kr-subtle">Mark your understanding honestly. Equivalent scientific wording may be acceptable.</p>'+
    '<div class="kr-grade"><button type="button" class="btn" id="kr-again">Not yet — show again</button><button type="button" class="btn primary" id="kr-good">Record my recall</button><button type="button" class="btn" id="kr-reviewed">Finish as reviewed</button></div></div></section>';
  E.render(h,false);
  root.KeystoneReview.bindReview(active,active.queue[0],function(value){return engine.matches(value,answer,reverse?[]:base.aliases);},saveActive,function(outcome){
   root.KeystoneReview.recordReview(active,engine,outcome);saveActive();
   if(active.queue.length)show();else finish();
  });
 }
 function finish(){
  if(!active)return menu();
  var total=active.original.length;
  active.over=true;saveActive();
  E.render('<p class="crumb"><a href="#spaced">← Spaced review</a></p><h1>Review complete</h1><div class="kr-entry"><h2>'+total+' cards reviewed</h2><p>'+root.KeystoneReview.firstReviewText(active)+'</p><p>Successful cards will return after a delay.</p><div class="kr-actions"><a href="#spaced" class="btn primary">Review dashboard</a><a href="#flashcards" class="btn">Other flashcard modes</a></div></div>');
  active=null;
 }
 function route(hash){if(hash==="spaced")return menu();if(/^spaced-(?:due|new|weak|reverse|resume)$/.test(hash))return start(hash);menu();}
 function isActive(){return !!(active&&!active.over);}
 return {route:route,isActive:isActive,trackExisting:trackExisting,progress:progress,count:function(){return cards.length;}};
}
root.KeystoneAlevelReview={create:create};
})(window);

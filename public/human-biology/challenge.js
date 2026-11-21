/* Human Biology high-yield question engine v2. Original questions only; not live OCR exam material. */
(function(){
"use strict";
var db=window.KeystoneHumanChallenges,main=document.getElementById("main");
if(!db||!main)return;
var K="narajos-human-challenge-v2-",SK=K+"session",PK=K+"progress",session=null,progress={};
try{var r=JSON.parse(localStorage.getItem(PK)||"{}");if(r&&typeof r==="object"&&!Array.isArray(r))progress=r;}catch(_){}
var all=db.questions,byId={};all.forEach(function(q){byId[q.id]=q;});
var render=null,visible=false,lastRoute="";
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(a){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[a];});}
function shuffle(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=b[i];b[i]=b[j];b[j]=t;}return b;}
function save(){try{if(session)localStorage.setItem(SK,JSON.stringify(session));else localStorage.removeItem(SK);}catch(_){}}
function saveProgress(){try{localStorage.setItem(PK,JSON.stringify(progress));}catch(_){}}
function restore(){try{var x=JSON.parse(localStorage.getItem(SK)||"null");if(x&&Array.isArray(x.queue)&&x.queue.length&&x.queue.every(function(id){return !!byId[id];})&&x.index<x.queue.length&&!x.complete&&x.route&&x.unit){x.hintsUsed=x.hintsUsed||{};x.quickCheckIds=x.quickCheckIds||{};x.quickCheckLinks=x.quickCheckLinks||{};x.guidedFirst=x.guidedFirst||0;x.quickChecksSeen=x.quickChecksSeen||0;x.quickChecksPassed=x.quickChecksPassed||0;return x;}}catch(_){}return null;}
function isActive(){return !!session&&session.index<session.queue.length;}
function pause(){stopHintTimer();session=null;visible=false;} // Preserve the unfinished set in localStorage.
function discard(){stopHintTimer();session=null;visible=false;save();}
function icon(name){
 var paths={
 brain:'<path d="M12 18V5a4 4 0 0 0-7.5-1.9A4 4 0 0 0 3 10a4 4 0 0 0 1 7.5A4 4 0 0 0 12 18ZM12 18V5a4 4 0 0 1 7.5-1.9A4 4 0 0 1 21 10a4 4 0 0 1-1 7.5A4 4 0 0 1 12 18Z" transform="translate(0 2) scale(1 .9)"/>',
 bolt:'<path d="m13 2-9 12h7l-1 8 10-12h-7l0-8Z"/>',
 layers:'<rect x="4" y="4" width="14" height="15" rx="2"/><path d="M8 2h10a3 3 0 0 1 3 3v13"/>',
 target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
 book:'<path d="M3 5h7a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H3zM21 5h-5a3 3 0 0 0-3 3v12a3 3 0 0 1 3-3h5z"/>',
 flask:'<path d="M9 3h6M10 3v7l-5 8a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-8V3M8 16h8"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 rotate:'<path d="M3 11a9 9 0 0 1 15-6l3 3M21 4v4h-4M21 13a9 9 0 0 1-15 6l-3-3M3 20v-4h4"/>',
 graph:'<path d="M4 4v16h16M7 16l4-5 4 2 5-7"/>',
 calc:'<rect x="5" y="2" width="14" height="20" rx="2"/><rect x="8" y="5" width="8" height="4"/><path d="M8 13h2m3 0h3m-8 4h2m3 0h3"/>',
 check:'<path d="m4 12 5 5L20 6"/>',
 alert:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 4h.01"/>',
 chevron:'<path d="m9 5 7 7-7 7"/>'
 };
 return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+(paths[name]||paths.target)+'</svg>';
}
function labelType(q){if(q.subtype==="error")return "Spot the error";return {single:"Choose one",multi:"Choose two",order:"Put in order",match:"Match pairs",number:"Calculate",written:"Explain and check",short:"Short answer",diagram:"Use the diagram",best:"Choose and justify"}[q.type]||"Question";}
function iconFor(q){return {single:"target",multi:"check",order:"layers",match:"grid",number:"graph",written:"book",short:"bolt",diagram:"target",best:"brain"}[q.type]||"target";}
function areaName(unit,area){var F=["","Human cells and tissues","Physiology and organ systems","Endocrinology, nerves and reproduction","Microbiology"];var H=["","Causes and effects of disease","Treatment and prevention","Immunology","Diagnosis and monitoring","Research and confidentiality"];return (unit==="f170"?F:H)[area]||"Topic";}
function filter(unit,scope){
 var list=all.filter(function(q){return q.unit===unit;});
 if(/^a[1-5]$/.test(scope))list=list.filter(function(q){return q.area===Number(scope.slice(1));});
 else if(scope==="core"||scope==="apply"||scope==="stretch")list=list.filter(function(q){return q.level===scope;});
 else if(scope==="sam")list=list.filter(function(q){return q.samAligned;});
 else if(scope==="weak")list=list.filter(function(q){var p=progress[q.id];return p&&(((p.wrong>0&&(p.lastCorrect===false||p.good/Math.max(1,p.seen)<.75)||((p.guided||0)>0&&(p.independent||0)===0))||((p.guided||0)>0&&(p.independent||0)===0)));});
 return list;
}
function unitStats(u){var qs=filter(u,"all"),seen=0,weak=0;
 qs.forEach(function(q){var p=progress[q.id];if(p&&p.seen){seen++;if(p.wrong>0&&(p.lastCorrect===false||p.good/Math.max(1,p.seen)<.75))weak++;}});
 return {questions:qs.length,seen:seen,weak:weak};}
function source(){return '<p class="k-source">Original revision questions mapped against <a href="https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf" target="_blank" rel="noopener">OCR specification v8</a> and informed by the <a href="https://www.ocr.org.uk/qualifications/cambridge-advanced-nationals/human-biology-level-3-h049-h149/assessment/" target="_blank" rel="noopener">public sample assessment materials</a>. Examples are not official OCR questions, and sample alignment does not imply exam frequency.</p>';}
function title(u){return u==="f171"?"F171 · Health and disease":"F170 · Fundamentals";}
function show(html){if(render)render(html);}
function intro(unit){
 var f=unit==="f170",stats=unitStats(unit);
 var areas=f?[1,2,3,4]:[1,2,3,4,5],colors=["","#58bcb0","#7da8df","#a18bdd","#e2a05c","#e18c96"];
 var h='<div class="k-wrap"><p class="crumb"><a href="#home">← Home</a></p><div class="k-unit-hero"><div class="k-eyebrow">'+(f?"F170 · Exam practice":"F171 · Exam practice preview")+'</div><h1>'+esc(f?"Fundamentals of human biology":"Health and disease")+'</h1><p>'+esc(f?"Build speed and accuracy with short exam-focused challenges.":"Apply what you know through clinical decisions, data and explanation. F171 is an early question-bank preview.")+'</p></div>';
 h+='<div class="k-mini-stats"><span><strong>'+stats.questions+'</strong> original questions</span><span><strong>'+stats.seen+'</strong> attempted</span><span><strong>'+stats.weak+'</strong> to revisit</span></div>';
 h+='<h2 class="k-subhead">Start practising</h2><div class="k-action-grid">';
 var tiles=[
  ["all","Quick mix","Start easy, then build up","bolt","teal"],
  ["sam","Exam-style focus","Skills found in OCR samples","target","blue"],
  ["weak","Fix mistakes","Revisit questions you missed","rotate","orange"],
  ["stretch","Challenge","Application and explanation","brain","purple"]];
 tiles.forEach(function(t){h+='<a class="k-action '+t[4]+'" href="#challenge/'+unit+'/'+t[0]+'"><span class="k-icon">'+icon(t[3])+'</span><span><strong>'+t[1]+'</strong><small>'+t[2]+'</small></span><span class="k-arrow">'+icon("chevron")+'</span></a>';});
 h+='</div><div class="k-headrow"><h2>Choose a topic</h2><small>'+areas.length+' areas</small></div><div class="k-areas">';
 areas.forEach(function(a){var n=filter(unit,"a"+a).length;h+='<a href="#challenge/'+unit+'/a'+a+'" class="k-area" style="--topic-color:'+colors[a]+'"><span class="k-area-num">'+a+'</span><span class="k-area-label"><strong>'+esc(areaName(unit,a))+'</strong><small>'+n+' questions</small></span>'+icon("chevron")+'</a>';});
 h+='</div><p class="k-source">'+(f?"Includes all four F170 areas.":"F171 sample bank is not yet a complete specification resource.")+'</p>'+source()+'</div>';show(h);
}
function landing(){
 var h='<div class="k-wrap"><p class="crumb"><a href="#home">← Home</a></p><div class="k-unit-hero"><div class="k-eyebrow">Keystone Human Biology</div><h1>Choose an exam unit</h1><p>Short, varied questions first. See an explanation when you need it.</p></div><div class="k-unit-tiles">'+["f170","f171"].map(function(u){var s=unitStats(u);return '<a href="#challenge/'+u+'" class="k-unit-tile '+(u==="f170"?"teal":"blue")+'"><span class="k-icon">'+icon(u==="f170"?"brain":"flask")+'</span><span><small>'+u.toUpperCase()+' · 60-mark paper</small><strong>'+esc(u==="f170"?"Fundamentals of human biology":"Health and disease")+'</strong><em>'+s.questions+' questions · '+s.seen+' attempted'+(u==="f171"?" · preview":"")+'</em></span>'+icon("chevron")+'</a>';}).join("")+'</div>'+source()+'</div>';show(h);
}
/* Quick Mix is a short confidence ladder, not a randomly ordered mini-exam.
   Deliberately accessible entry -> core retrieval -> application -> conditional stretch.
   Selection and grading are entirely deterministic and remain in this browser. */
function quickMixQueue(unit,limit){
 var pool=all.filter(function(q){return q.unit===unit;}),chosen=[],taken={};
 function choose(candidates,preferredTypes){
  candidates=candidates.filter(function(q){return !taken[q.id];});
  if(!candidates.length)return null;
  candidates=shuffle(candidates).sort(function(a,b){return score(a)-score(b);});
  var q=candidates[0];chosen.push(q);taken[q.id]=true;return q;
  function score(q){
   var prior=progress[q.id]||{},areas=chosen.filter(function(c){return c.area===q.area;}).length;
   var types=chosen.filter(function(c){return c.type===q.type;}).length;
   var pref=preferredTypes?preferredTypes.indexOf(q.type):-1;
   return areas*7+types*3+(prior.seen||0)*2+(pref===-1?10:pref*2);
  }
 }
 var warm=pool.filter(function(q){return q.warmup||q.level==="warmup";});
 // Always establish confidence with two familiar, low-barrier retrieval items.
 choose(warm.filter(function(q){return q.onRamp;}),["single"]);
 choose(warm,["single"]);
 // Next recover core vocabulary and a core concept. Avoid difficult written work here.
 for(var i=0;i<2;i++)choose(pool.filter(function(q){return q.level==="core";}),i===0?["single","short","diagram","order","match"]:["short","single","order","match","diagram"]);
 // Application starts with supported recognition, then gradually demands more.
 var preferences=[["single","multi","diagram","match","order","best","number","written"],
  ["diagram","match","order","multi","single","number","best","written"],
  ["number","best","order","match","multi","diagram","single","written"]];
 preferences.forEach(function(types){choose(pool.filter(function(q){return q.level==="apply";}),types);});
 // Keep a reasonable application task as the final default. A stretch can be
 // substituted only if independent performance during the set warrants it.
 choose(pool.filter(function(q){return q.level==="apply";}),["best","written","number","order","diagram","match","single","multi"]);
 while(chosen.length<limit){if(!choose(pool,["single","short","match","order","diagram","multi","number","best","written"]))break;}
 return chosen.slice(0,limit).map(function(q){return q.id;});
}
function adaptQuickMixMiddle(){
 if(!session||session.scope!=="all"||!session.quickMixBase)return;
 var slot=session.quickMixBase.indexOf(session.queue[session.index]);
 if(slot!==4&&slot!==5)return;
 session.quickMixMiddleChecked=session.quickMixMiddleChecked||{};
 if(session.quickMixMiddleChecked[slot])return;
 var early=session.quickMixBase.slice(0,4);
 if(!early.every(function(id){return Object.prototype.hasOwnProperty.call(session.first,id);}))return;
 var secure=early.filter(function(id){return session.first[id]===true;}).length;
 session.quickMixMiddleChecked[slot]=true;
 // Two or more early difficulties: put another familiar/core step before
 // applying the ideas. Three difficulties: offer two core steps.
 if((slot===4&&secure<=2)||(slot===5&&secure<=1)){
  var candidates=all.filter(function(q){
   return q.unit===session.unit&&q.level==="core"&&
    ["single","short","order","diagram"].indexOf(q.type)>=0&&
    session.queue.indexOf(q.id)<0&&
    !Object.prototype.hasOwnProperty.call(session.first,q.id);
  });
  if(candidates.length){
   candidates=shuffle(candidates);
   candidates.sort(function(a,b){
    var p1=progress[a.id]||{},p2=progress[b.id]||{};
    return (p1.seen||0)-(p2.seen||0);
   });
   session.queue[session.index]=candidates[0].id;
   session.quickMixBase[slot]=candidates[0].id;
   session.quickMixSoftened=true;
  }
 }
 save();
}
function adaptQuickMixEnd(){
 if(!session||session.scope!=="all"||session.quickMixAdjusted||!session.quickMixFinalId)return;
 if(session.queue[session.index]!==session.quickMixFinalId)return;
 var coreIds=(session.quickMixBase||[]).slice(0,7);
 var completed=coreIds.filter(function(id){return Object.prototype.hasOwnProperty.call(session.first,id);});
 // No speculative inference of mastery: simply avoid pitching a harder
 // question after difficulty, and offer an optional stretch after strong recall.
 var correct=completed.filter(function(id){return session.first[id]===true;}).length;
 var target=correct>=6&&completed.length>=7?"stretch":correct<=3?"core":"apply";
 var candidates=all.filter(function(q){
  return q.unit===session.unit&&q.level===target&&
   session.queue.indexOf(q.id)<0&&!session.first.hasOwnProperty(q.id)&&
   !q.warmup;
 });
 // Prefer previously unseen cards and a topic not already over-represented.
 if(candidates.length&&target!=="apply"){
  candidates=shuffle(candidates);
  candidates.sort(function(a,b){
   var p1=progress[a.id]||{},p2=progress[b.id]||{};
   return (p1.seen||0)-(p2.seen||0);
  });
  session.queue[session.index]=candidates[0].id;
 }
 session.quickMixAdjusted=true;
 save();
}
function makeSession(unit,scope,route){
 var selected=filter(unit,scope);if(!selected.length){show('<div class="k-wrap"><p class="crumb"><a href="#challenge/'+unit+'">← Exam unit</a></p><div class="paper panel"><h1>No questions here yet</h1><p>Try a mixed set or choose another area.</p><a class="button primary" href="#challenge/'+unit+'/all">Start mixed questions</a></div></div>');return;}
 var size=scope==="all"?8:scope==="sam"?10:scope==="stretch"?6:8;
 // Mixed sessions deliberately span question formats; the sample-informed mode
 // also spreads questions across topic areas where the bank permits.
 var pool=shuffle(selected),chosen=[];
 if(scope==="all"||scope==="sam"){
  var types=shuffle(Array.from(new Set(pool.map(function(q){return q.type;}))));
  types.forEach(function(t){
   if(chosen.length>=size)return;
   var candidates=pool.filter(function(q){return q.type===t&&chosen.indexOf(q)<0;});
   candidates.sort(function(a,b){return chosen.filter(function(z){return z.area===a.area;}).length-chosen.filter(function(z){return z.area===b.area;}).length;});
   if(candidates.length)chosen.push(candidates[0]);
  });
 }
 while(chosen.length<size&&chosen.length<selected.length){
  var next=pool.filter(function(q){return chosen.indexOf(q)<0;}).sort(function(a,b){
   var areaA=chosen.filter(function(z){return z.area===a.area;}).length,areaB=chosen.filter(function(z){return z.area===b.area;}).length;
   return areaA-areaB;
  })[0];if(!next)break;chosen.push(next);
 }
 var ids;
 if(scope==="all"){ids=quickMixQueue(unit,size);}
 else if(/^a[1-5]$/.test(scope)){
  // Topic practice is instructionally sequenced; unlike the mixed revision mode,
  // it must not begin with the hardest randomly selected application task.
  var buckets=[[],[],[],[]],quota=[1,2,3,2],arr=[];
  function stage(q){return q.warmup||q.level==="warmup"?0:q.level==="core"?1:q.level==="apply"?2:3;}
  selected.forEach(function(q){buckets[stage(q)].push(q);});
  buckets=buckets.map(shuffle);
  quota.forEach(function(n,i){for(var j=0;j<n&&buckets[i].length;j++)arr.push(buckets[i].shift());});
  for(var b=0;b<buckets.length&&arr.length<size;b++)while(buckets[b].length&&arr.length<size)arr.push(buckets[b].shift());
  ids=arr.sort(function(a,b){return stage(a)-stage(b);}).map(function(q){return q.id;});
 }else ids=shuffle(chosen).map(function(x){return x.id;});
 session={unit:unit,scope:scope,route:route,queue:ids,index:0,first:{},correctFirst:0,guidedFirst:0,phase:"ask",answers:{},retries:{},hintsUsed:{},quickCheckIds:{},quickCheckLinks:{},quickChecksPassed:0,quickChecksSeen:0,quickMixVersion:scope==="all"?2:null,quickMixBase:scope==="all"?ids.slice():null,quickMixFinalId:scope==="all"?ids[ids.length-1]:null,quickMixAdjusted:false,complete:false,started:Date.now()};
 save();drawQuestion();
}
function current(){return session&&byId[session.queue[session.index]];}
function isQuickCheck(q){return !!(session&&session.quickCheckIds&&q&&session.quickCheckIds[q.id]);}
function formChoice(q,answer){
 var selected=answer&&Array.isArray(answer.selected)?answer.selected:[];
 if(!answer.optionOrder){answer.optionOrder=shuffle(q.options.map(function(_,i){return i;}));session.answers[q.id]=answer;save();}
 return '<div class="k-options" role="group" aria-label="Answer choices">'+answer.optionOrder.map(function(i,pos){var o=q.options[i];
  var checked=selected.indexOf(i)!==-1;
  return '<label class="k-option'+(checked?" selected":"")+'"><input type="'+(q.type==="multi"?"checkbox":"radio")+'" name="kchoice" value="'+i+'"'+(checked?" checked":"")+'><span class="k-option-letter">'+String.fromCharCode(65+pos)+'</span><span>'+esc(o)+'</span></label>';
 }).join("")+'</div>';
}
function bestForm(q,answer){
 answer=answer||{};
 if(!answer.optionOrder){answer.optionOrder=shuffle(q.options.map(function(_,i){return i;}));session.answers[q.id]=answer;save();}
 if(!answer.reasonOrder){answer.reasonOrder=shuffle(q.reasons.map(function(_,i){return i;}));session.answers[q.id]=answer;save();}
 var h='<div class="k-justify"><fieldset><legend><span class="k-step-num">1</span> Choose the scientifically accurate explanation</legend><div class="k-options">';
 h+=answer.optionOrder.map(function(i,pos){return '<label class="k-option"><input type="radio" name="kbest" value="'+i+'"'+(answer.choice===i?' checked':'')+'><span class="k-option-letter">'+String.fromCharCode(65+pos)+'</span><span>'+esc(q.options[i])+'</span></label>';}).join("");
 h+='</div></fieldset><fieldset><legend><span class="k-step-num">2</span> Which scientific reason supports your choice?</legend><div class="k-options">';
 h+=answer.reasonOrder.map(function(i,pos){return '<label class="k-option"><input type="radio" name="kreason" value="'+i+'"'+(answer.reason===i?' checked':'')+'><span class="k-option-letter">'+String.fromCharCode(65+pos)+'</span><span>'+esc(q.reasons[i])+'</span></label>';}).join("");
 return h+'</div></fieldset></div>';
}
function orderForm(q,answer){
 var current=answer&&Array.isArray(answer.order)?answer.order:null;
 if(!current){current=shuffle(q.items.map(function(_,i){return i;}));if(current.every(function(v,i){return v===i;}))current.reverse();session.answers[q.id]={order:current};save();}
 return '<ol class="k-order">'+current.map(function(idx,pos){
 return '<li><span class="k-order-num">'+(pos+1)+'</span><span>'+esc(q.items[idx])+'</span><span class="k-order-controls"><button class="k-small-btn" type="button" data-move="up" data-pos="'+pos+'" aria-label="Move step '+(pos+1)+' up" '+(pos===0?"disabled":"")+'>↑</button><button class="k-small-btn" type="button" data-move="down" data-pos="'+pos+'" aria-label="Move step '+(pos+1)+' down" '+(pos===current.length-1?"disabled":"")+'>↓</button></span></li>';
 }).join("")+'</ol><p class="k-hint">Use the arrows to put the steps in order.</p>';
}
function matchForm(q,answer){
 var vals=answer&&Array.isArray(answer.match)?answer.match:[];
 if(!answer.targetOrder){answer.targetOrder=shuffle(q.pairs.map(function(_,i){return i;}));session.answers[q.id]=answer;save();}
 return '<div class="k-matches">'+q.pairs.map(function(p,i){
 return '<label class="k-match"><span>'+esc(p[0])+'</span><select data-match="'+i+'" aria-label="Match for '+esc(p[0])+'"><option value="">Choose a match</option>'+answer.targetOrder.map(function(j){return '<option value="'+j+'"'+(String(vals[i])===String(j)?" selected":"")+'>'+esc(q.pairs[j][1])+'</option>';}).join("")+'</select></label>';
 }).join("")+'</div>';
}
function figure(name){
 var tag='<div class="k-figure">';
 if(name==="cell")tag+='<svg viewBox="0 0 440 210" role="img" aria-label="A simplified human cell. Label A points to the outer cell boundary. A nucleus and mitochondria appear inside."><ellipse cx="187" cy="105" rx="137" ry="82" fill="#e2f3f0" stroke="#167a77" stroke-width="5"/><circle cx="164" cy="105" r="37" fill="#d9d3f4" stroke="#7652ac" stroke-width="3"/><circle cx="170" cy="100" r="11" fill="#9679cb"/><ellipse cx="249" cy="78" rx="24" ry="13" fill="#efbd77" stroke="#98692c" stroke-width="3" transform="rotate(-24 249 78)"/><path d="M236 74q12 6 25 0" stroke="#98692c" stroke-width="2" fill="none"/><path d="M320 58L367 35" stroke="#1e5360" stroke-width="3"/><text x="374" y="37" font-size="25" font-weight="800" fill="#1e5360">A</text></svg>';
 else if(name==="heart")tag+='<svg viewBox="0 0 440 235" role="img" aria-label="A highly simplified cross-section of a heart with two lower ventricular chambers. Label A points to the central wall between the ventricles."><path d="M98 69Q90 20 135 20L201 55 266 20Q321 20 309 85L291 167Q285 212 205 214 130 211 117 163Z" fill="#fbe4e4" stroke="#a64a56" stroke-width="4"/><path d="M205 57L205 209" stroke="#9b4050" stroke-width="12"/><path d="M142 92Q116 125 157 172L194 193V102Z" fill="#c4dcef" stroke="#447da7" stroke-width="2"/><path d="M220 102V193L260 172Q298 125 268 92Z" fill="#edaaaa" stroke="#a64a56" stroke-width="2"/><path d="M205 131L346 78" stroke="#1e5360" stroke-width="3"/><text x="355" y="83" font-size="24" font-weight="800" fill="#1e5360">A</text></svg>';
 else if(name==="neuron")tag+='<svg viewBox="0 0 440 188" role="img" aria-label="Simplified neuron. A long axon with several myelin-covered segments and a dashed damaged segment highlighted near the centre."><circle cx="55" cy="95" r="26" fill="#e6d7f5" stroke="#835ca7" stroke-width="3"/><path d="M29 81L10 63M31 108L11 131M55 69L55 48M78 88L120 94M119 94H403" stroke="#65539c" stroke-width="5" fill="none"/><rect x="134" y="77" width="61" height="34" rx="14" fill="#bce3df" stroke="#167a77" stroke-width="3"/><rect x="216" y="77" width="61" height="34" rx="14" fill="#f6e1cb" stroke="#d79035" stroke-dasharray="6 5" stroke-width="3"/><rect x="298" y="77" width="62" height="34" rx="14" fill="#bce3df" stroke="#167a77" stroke-width="3"/><path d="M244 68L252 33" stroke="#d79035" stroke-width="3"/><text x="263" y="28" font-size="18" fill="#8e5919" font-weight="800">Damage</text></svg>';
 else if(name==="growth")tag+='<svg viewBox="0 0 440 230" role="img" aria-label="Stylised bacterial growth curve: A flat initial region A, a steeply rising region B, a flat region C, and a decreasing region D."><path d="M48 15V185H420" stroke="#354c58" stroke-width="3" fill="none"/><path d="M65 164C100 165 111 165 135 157S205 80 243 47S298 47 343 47 383 68 401 109" stroke="#0b7973" stroke-width="5" fill="none"/><g fill="#263e4b" font-size="19" font-weight="750"><text x="87" y="151">A</text><text x="175" y="92">B</text><text x="293" y="31">C</text><text x="393" y="57">D</text><text x="177" y="217" font-size="14">Time</text><text x="56" y="15" font-size="14">Living cells</text></g></svg>';
 else if(name==="antibody")tag+='<svg viewBox="0 0 440 230" role="img" aria-label="Y-shaped antibody schematic. Label A points to the tip of one upper arm, the antigen-binding region."><g fill="none" stroke-linecap="round" stroke-width="19"><path d="M217 199V113L155 38" stroke="#5c88b4"/><path d="M217 113L279 38" stroke="#5c88b4"/><path d="M226 199V116L165 33" stroke="#bd8ad3" stroke-width="5"/><path d="M226 116L289 33" stroke="#bd8ad3" stroke-width="5"/></g><path d="M150 34L93 17" stroke="#233d50" stroke-width="3"/><text x="63" y="25" font-size="23" font-weight="800">A</text></svg>';
 else if(name==="antibiotic")tag+='<svg viewBox="0 0 440 220" role="img" aria-label="A simplified petri dish showing four discs A, B, C and D. Disc B has the largest clear zone around it."><ellipse cx="210" cy="109" rx="158" ry="94" fill="#dbecce" stroke="#77955e" stroke-width="4"/><g fill="#fff" stroke="#b3c3a8" stroke-width="2"><circle cx="125" cy="75" r="20"/><circle cx="227" cy="79" r="43"/><circle cx="145" cy="150" r="24"/><circle cx="282" cy="155" r="14"/></g><g fill="#d2b58b" stroke="#917a55" stroke-width="2"><circle cx="125" cy="75" r="8"/><circle cx="227" cy="79" r="8"/><circle cx="145" cy="150" r="8"/><circle cx="282" cy="155" r="8"/></g><g font-size="17" font-weight="800" fill="#273e42"><text x="104" y="50">A</text><text x="222" y="24">B</text><text x="130" y="186">C</text><text x="295" y="180">D</text></g></svg>';
 return tag+'</div>';
}
function inputForm(q,answer){
 answer=answer||{};
 if(q.type==="best")return bestForm(q,answer);
 if(q.type==="single"||q.type==="diagram"||q.type==="multi")return formChoice(q,answer);
 if(q.type==="order")return orderForm(q,answer);
 if(q.type==="match")return matchForm(q,answer);
 if(q.type==="number")return '<label class="k-field">Your calculation'+(q.answerUnit?' · '+esc(q.answerUnit):'')+'<input id="k-number" type="text" inputmode="decimal" autocomplete="off" placeholder="Enter the number" value="'+esc(answer.text||"")+'"></label>';
 if(q.type==="short")return '<label class="k-field">Your answer<input id="k-text" type="text" autocomplete="off" spellcheck="false" placeholder="Type your answer" value="'+esc(answer.text||"")+'"></label>';
 return '<label class="k-field">Explain in your own words<textarea id="k-written" rows="5" placeholder="Write an explanation before seeing the suggested points">'+esc(answer.text||"")+'</textarea></label>';
}
function answerKey(q){
 if(q.type==="best")return '<strong>'+esc(q.options[q.correct])+'</strong><p><strong>Why:</strong> '+esc(q.reasons[q.reasonCorrect])+'</p>';
 if(q.type==="single"||q.type==="diagram")return '<strong>'+esc(q.options[q.correct])+'</strong>';
 if(q.type==="multi")return '<strong>'+q.correct.map(function(i){return esc(q.options[i]);}).join("; ")+'</strong>';
 if(q.type==="order")return '<ol>'+q.items.map(function(i){return '<li>'+esc(i)+'</li>';}).join("")+'</ol>';
 if(q.type==="match")return '<ul>'+q.pairs.map(function(p){return '<li>'+esc(p[0])+' → '+esc(p[1])+'</li>';}).join("")+'</ul>';
 if(q.type==="number")return '<strong>'+esc(q.model)+'</strong>';
 if(q.type==="short")return '<strong>'+esc(q.model)+'</strong>';
 return '<div class="k-criteria"><p>'+esc(q.model)+'</p><strong>Key points to look for</strong><ul>'+q.markPoints.map(function(p){return '<li>'+esc(p)+'</li>';}).join("")+'</ul></div>';
}
function currentAnswer(){var q=current();return q&&(session.answers[q.id]||{});}
/* 10-second cooldown, following the A-level app's timed support.
   A rung is strategy -> authored conceptual cue -> one eliminated distractor. */
var HINT_DELAY=10000,hintTimer=null;
function stopHintTimer(){if(hintTimer!==null&&typeof clearInterval==="function")clearInterval(hintTimer);hintTimer=null;}
function hintStrategy(q){
 var v={
  number:"Write the calculation and check the units before you use the numbers.",
  order:"Find the first and final steps, then connect the events between them.",
  match:"Find the easiest pair first. For the others, think about function.",
  written:"Give a cause, explain how it works, then state the effect.",
  short:"Recall the exact term, not just a related word.",
  best:"First decide which statement is true. Then ask which reason explains it.",
  diagram:"Use the parts you recognise to identify the labelled structure.",
  multi:"Decide whether each option is true before selecting the two that fit."
 };
 return v[q.type]||(q.subtype==="error"?"Find the biological word or claim that makes the pupil's statement wrong.":"Cover the choices. Recall the idea first, then choose.");
}
function excludedOption(q){
 if(!q.options||q.options.length!==4)return null;
 var correct=Array.isArray(q.correct)?q.correct:[q.correct],
 chosen=(session.answers[q.id]||{}).selected||[];
 var wrong=q.options.map(function(_,i){return i;}).filter(function(i){return correct.indexOf(i)<0&&chosen.indexOf(i)<0;});
 return wrong.length?wrong[wrong.length-1]:null;
}
function hintsFor(q){
 var items=[hintStrategy(q)];
 if(typeof q.hintCue==="string"&&q.hintCue.trim())items.push(q.hintCue);
 if(["single","diagram","multi"].indexOf(q.type)>=0&&q.options&&q.options.length===4){
  var i=session.hintExcluded&&session.hintExcluded[q.id];
  if(!Number.isInteger(i))i=excludedOption(q);
  if(i!==null)items.push("You can rule out: "+q.options[i]+".");
 }
 return items;
}
function ensureHintClock(q){
 if(!session||session.phase!=="ask")return;
 var key=q.id+"@"+session.index;
 if(session.hintQuestionId!==key){
  session.hintQuestionId=key;
  session.hintReadyAt=Date.now()+HINT_DELAY;
  save();
 }
}
function hintRemaining(){return session?Math.max(0,(session.hintReadyAt||0)-Date.now()):0;}
function updateHintButton(){
 if(!session||session.phase!=="ask"){stopHintTimer();return;}
 var b=main.querySelector('[data-k-action="hint"]');if(!b){stopHintTimer();return;}
 var rem=hintRemaining(),fraction=1-Math.min(1,rem/HINT_DELAY);
 b.disabled=rem>0;b.classList.toggle("hint-wait",rem>0);
 b.style.setProperty("--hint-progress",fraction.toFixed(3));
 var label=session.hintsUsed&&session.hintsUsed[current().id]?"More help":"Hint";
 b.textContent=rem>0?label+" · "+Math.ceil(rem/1000)+"s":label;
 b.setAttribute("aria-label",rem>0?label+" available in "+Math.ceil(rem/1000)+" seconds":label);
 if(rem===0)stopHintTimer();
}
function startHintTimer(){
 stopHintTimer();updateHintButton();
 if(hintRemaining()>0&&typeof setInterval==="function")hintTimer=setInterval(updateHintButton,150);
}
function showNextHint(){
 if(!session||session.phase!=="ask"||hintRemaining()>0)return;
 var q=current(),h=hintsFor(q),n=session.hintsUsed[q.id]||0;
 if(n>=h.length)return;
 readForm();
 if(n===2){
  var idx=excludedOption(q);
  if(idx!==null){session.hintExcluded=session.hintExcluded||{};session.hintExcluded[q.id]=idx;}
 }
 session.hintsUsed[q.id]=n+1;
 session.hintReadyAt=Date.now()+HINT_DELAY;
 save();drawQuestion();
}
function drawQuestion(){
 if(!session||!isActive())return;
 stopHintTimer();
 adaptQuickMixMiddle();
 adaptQuickMixEnd();
 visible=true;var q=current(),a=currentAnswer();
 if(session.phase==="ask")ensureHintClock(q);
 var sub=q.unit==="f171"?"F171 · Health and disease":"F170 · Fundamentals",num=session.index+1,max=session.queue.length;
 var prog=(100*(session.index/max)).toFixed(1),showing=session.phase==="feedback";
 var used=session.hintsUsed&&session.hintsUsed[q.id]||0,availableHints=hintsFor(q);
 var h='<div class="k-wrap k-question-view"><p class="crumb"><a href="#challenge/'+q.unit+'">← Leave this set</a></p><div class="k-question-meta"><span>'+esc(sub)+'</span><span>'+num+' of '+max+'</span></div><div class="progress-track" role="progressbar" aria-label="Questions completed" aria-valuemin="0" aria-valuemax="'+max+'" aria-valuenow="'+session.index+'"><div style="width:'+prog+'%"></div></div>';
 h+='<div class="k-question-paper"><div class="k-question-tags"><span class="k-type">'+icon(iconFor(q))+esc(labelType(q))+'</span><span class="k-level '+esc(q.level)+'">'+esc(q.level==="warmup"?"Warm-up":q.level==="core"?"Core knowledge":q.level==="apply"?"Application":"Challenge")+'</span>'+(q.marks?'<span class="k-level stretch">'+q.marks+'-mark response</span>':'')+'</div><h1>'+esc(q.stem)+'</h1>';
 if(q.type==="number"||q.calculator)h+='<div class="k-calculator-note">'+icon("calc")+'<span>Calculator may help</span></div>';
 if(q.figure)h+=figure(q.figure);
 if(isQuickCheck(q))h+='<p class="k-quick-label"><strong>Quick check:</strong> Apply the same idea independently.</p>';
 if(!showing){h+=inputForm(q,a);
  if(used)h+='<div class="k-hint-box" role="note"><strong>Hint '+used+' of '+availableHints.length+'</strong>'+availableHints.slice(0,used).map(function(t){return '<p>'+esc(t)+'</p>';}).join('')+'</div>';
 }
 else{
  var correct=session.lastResult===true,subjective=!session.wasSkipped&&(session.lastResult===null||q.type==="written");
  var helped=!!used,unknown=!!session.wasSkipped,quick=isQuickCheck(q);
  var neutral=unknown||subjective||(correct&&helped);
  var header=unknown?"Here’s how it works":subjective?"Check your explanation":correct&&helped?"Correct with a hint":correct&&quick?"Quick check passed":correct?"Correct":"Not yet";
  h+='<div class="k-feedback '+(neutral?"pending":correct?"correct":"incorrect")+'"><div class="k-feedback-head">'+icon(neutral?"book":correct?"check":"alert")+'<strong>'+header+'</strong></div>';
  h+='<p class="k-model-title">Expected answer</p><div class="k-model">'+answerKey(q)+'</div><p><strong>'+(correct&&!helped?'Why it works':unknown?'Explanation':'Quick reteach')+':</strong> '+esc(q.explain)+'</p>';
  if(q.type==='best'&&!correct&&!unknown){var partial=session.answers[q.id]||{};if(partial.choice===q.correct&&partial.reason!==q.reasonCorrect)h+='<p class="k-diagnostic-note">You chose the correct explanation; now focus on why it is correct.</p>';}
  if((!correct||helped)&&session.lastPlannedCheck)h+='<p class="k-quick-note">A related quick check is next, so you can try the idea again independently.</p>';
  if(q.levelsNote)h+='<p class="k-level-guidance">'+esc(q.levelsNote)+'</p>';
  if(!correct&&!unknown&&q.misconception)h+='<div class="k-misconception"><strong>Watch out</strong><p>'+esc(q.misconception)+'</p></div>';
  h+='</div>';
 }
 if(!showing)h+='<div class="k-foot-actions"><button class="button primary k-cta" type="button" data-k-action="'+(q.type==="written"?"reveal":"check")+'">'+(q.type==="written"?"Compare with key points":"Check answer")+' →</button>'+(used<availableHints.length?'<button class="button secondary k-hint-button" type="button" data-k-action="hint">'+(used?'More help':'Hint')+'</button>':'')+'<button class="button quiet" type="button" data-k-action="skip">I don’t know · show me</button></div>';
 else if(!session.wasSkipped&&(q.type==="written"||session.lastResult===null))h+='<div class="k-foot-actions"><button class="button primary" data-k-action="self-good" type="button">I included the key ideas</button><button class="button secondary" data-k-action="self-weak" type="button">I need more practice</button></div>';
 else h+='<div class="k-foot-actions"><button class="button primary k-cta" data-k-action="next" type="button">'+(session.lastPlannedCheck?'Try a quick check':'Next question')+' →</button></div>';
 h+='</div><p class="k-question-footer">Topic '+q.area+' · '+esc(areaName(q.unit,q.area))+(q.samAligned?' · Skills reflected in OCR sample material':' · Specification coverage')+' · Original question</p></div>';
 show(h);
 if(!showing&&used<availableHints.length)startHintTimer();
}
function norm(s){return String(s||"").normalize("NFKC").trim().toLowerCase().replace(/[’‘]/g,"'").replace(/[.!?]+$/,"").replace(/\s+/g," ");}
function validateAnswer(q,a){
 if(q.type==="best"){if(!Number.isInteger(a.choice)||!Number.isInteger(a.reason))return {ready:false,msg:"Choose an explanation and the reason for it."};return {ready:true,correct:a.choice===q.correct&&a.reason===q.reasonCorrect};}
 if(q.type==="single"||q.type==="diagram"||q.type==="multi"){
  if(!a.selected||!a.selected.length)return {ready:false};
  if(q.type==="multi"&&a.selected.length!==q.correct.length)return {ready:false,msg:"Select exactly "+q.correct.length+" answers."};
  return {ready:true,correct:q.type==="multi"?(a.selected.slice().sort().join(",")===q.correct.slice().sort().join(",")):a.selected[0]===q.correct};
 }
 if(q.type==="order")return {ready:true,correct:a.order&&a.order.every(function(v,i){return v===i;})};
 if(q.type==="match"){if(!a.match||a.match.length!==q.pairs.length||a.match.some(function(v){return v===""||v==null;}))return {ready:false,msg:"Choose a match for each row."};return {ready:true,correct:a.match.every(function(v,i){return +v===i;})};}
 if(q.type==="number"){var val=String(a.text||"").trim().replace(/,/g,"").replace(/^×\s*/,"");if(!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?$/i.test(val))return {ready:false,msg:"Enter a number only. The expected unit is shown above the box."};return {ready:true,correct:Math.abs(Number(val)-q.correct)<=(q.tolerance||1e-9)};}
 if(q.type==="short"){if(!String(a.text||"").trim())return {ready:false,msg:"Enter an answer first, or choose Not sure."};return {ready:true,correct:q.accepted.some(function(x){return norm(x)===norm(a.text);})};}
 return {ready:true,correct:null};
}
function planQuickCheck(q){
 if(!session||isQuickCheck(q)||(session.quickChecksPlanned||0)>=2)return null;
 var seen=session.first||{};
 var rank={warmup:0,core:1,apply:2,stretch:3};
 var candidates=all.filter(function(x){
  return x.id!==q.id&&x.unit===q.unit&&x.section===q.section&&
   (rank[x.level]||0)<=(rank[q.level]||0)&&
   !(x.id in seen)&&!(session.quickCheckIds||{})[x.id]&&
   ["single","diagram","match","best"].indexOf(x.type)>=0;
 });
 // If this idea has no appropriate independent follow-up, retry it later
 // rather than springing an unrelated or more difficult question.

 if(!candidates.length)return null;
 // Prefer the same specification subtopic and a manageable core question.
 candidates.sort(function(a,b){
  function rank(x){return (x.section===q.section?0:20)+(x.level==="warmup"?0:x.level==="core"?1:x.level==="apply"?3:6);}
  return rank(a)-rank(b);
 });
 var choice=candidates[0],at=session.queue.indexOf(choice.id);
 if(at>=0&&at<=session.index)return null;
 if(at>session.index)session.queue.splice(at,1);
 session.queue.splice(session.index+1,0,choice.id);
 session.quickCheckIds[choice.id]=true;
 session.quickCheckLinks[choice.id]=q.id;
 session.quickChecksPlanned=(session.quickChecksPlanned||0)+1;
 session.lastPlannedCheck=choice.id;
 return choice.id;
}
function record(q,got){
 var helped=!!(session.hintsUsed&&session.hintsUsed[q.id]);
 var independent=!!got&&!helped&&!session.wasSkipped;
 var p=progress[q.id]||{seen:0,good:0,wrong:0,independent:0,guided:0};p.seen++;
 if(got){p.good++;if(helped)p.guided=(p.guided||0)+1;else p.independent=(p.independent||0)+1;p.lastCorrect=true;}
 else{p.wrong++;p.lastCorrect=false;}
 p.last=Date.now();progress[q.id]=p;saveProgress();
 if(!(q.id in session.first)){
  session.first[q.id]=independent;
  if(independent)session.correctFirst++;
  if(got&&!independent)session.guidedFirst=(session.guidedFirst||0)+1;
 }
 if(isQuickCheck(q)){session.quickChecksSeen=(session.quickChecksSeen||0)+1;if(independent)session.quickChecksPassed=(session.quickChecksPassed||0)+1;}
 session.lastPlannedCheck=null;
 var checkId=(!got||helped)?planQuickCheck(q):null;
 // When no suitable same-concept question exists, a guided response returns
 // later in the set for another unaided attempt rather than being counted secure.
 if((!got||(helped&&!checkId))&&(session.retries[q.id]||0)<1){session.queue.push(q.id);session.retries[q.id]=(session.retries[q.id]||0)+1;}
 save();
}
function readForm(){
 var q=current();if(!q)return;
 var a=session.answers[q.id]||{};var input=null;
 if(q.type==="best"){var chosen=main.querySelector('input[name="kbest"]:checked'),reason=main.querySelector('input[name="kreason"]:checked');a.choice=chosen?Number(chosen.value):undefined;a.reason=reason?Number(reason.value):undefined;}
 else if(q.type==="single"||q.type==="diagram"||q.type==="multi")a.selected=Array.from(main.querySelectorAll('input[name="kchoice"]:checked')).map(function(x){return Number(x.value);});
 else if(q.type==="match")a.match=Array.from(main.querySelectorAll("[data-match]")).map(function(x){return x.value;});
 else if(q.type==="number"||q.type==="short"||q.type==="written"){input=main.querySelector("#k-number, #k-text, #k-written");a.text=input?input.value:"";}
 session.answers[q.id]=a;save();return a;
}
function check(skip){
 var q=current();if(!q||session.phase==="feedback")return;
 var a=readForm()||{},v=validateAnswer(q,a);
 if(!skip&&!v.ready){var msg=main.querySelector(".k-error");if(!msg){msg=document.createElement("p");msg.className="k-error";msg.setAttribute("role","alert");main.querySelector(".k-foot-actions").prepend(msg);}msg.textContent=v.msg||"Choose an answer before checking.";return;}
 session.lastResult=skip?false:v.correct;
 session.wasSkipped=!!skip;
 if(!skip&&q.type==="short"&&session.lastResult===false)session.lastResult=null; // allow scientifically equivalent synonyms to be self-assessed
 session.phase="feedback";
 if(session.lastResult!==null)record(q,session.lastResult);
 save();drawQuestion();
}
function gradeSelf(got){var q=current();if(!q)return;record(q,got);next();}
function next(){
 if(!session)return;
 var previous=current();if(previous&&session.answers)delete session.answers[previous.id]; // Do not retain free-text answers beyond feedback.
 session.index++;session.phase="ask";session.lastResult=undefined;session.wasSkipped=false;session.lastPlannedCheck=null;session.quickTapAttempted=false;save();
 if(session.index>=session.queue.length)finish();else drawQuestion();
}
function finish(){
 stopHintTimer();if(!session)return;var old=session;session=null;save();
 var repeat=Object.keys(old.retries).length,done=old.queue.length;
 var h='<div class="k-wrap k-done"><p class="crumb"><a href="#challenge/'+old.unit+'">← Unit overview</a></p><div class="k-done-icon">'+icon("check")+'</div><h1>Practice complete</h1><p class="lead">'+old.correctFirst+' of '+Object.keys(old.first).length+' questions recalled independently on first attempt.</p>';
 h+='<div class="k-mini-stats"><span><strong>'+Object.keys(old.first).length+'</strong> unique questions</span><span><strong>'+repeat+'</strong> revisited</span><span><strong>'+(old.guidedFirst||0)+'</strong> answered with help</span><span><strong>'+(old.quickChecksPassed||0)+'/'+(old.quickChecksSeen||0)+'</strong> quick checks without help</span></div><div class="k-action-grid"><a class="k-action teal" href="#challenge/'+old.unit+'/weak"><span class="k-icon">'+icon("rotate")+'</span><span><strong>Fix weak areas</strong><small>Practise questions you missed</small></span></a><a class="k-action blue" href="#challenge/'+old.unit+'"><span class="k-icon">'+icon("grid")+'</span><span><strong>Choose another set</strong><small>Topic or mixed practice</small></span></a></div></div>';show(h);
}
function route(r,renderer){
 render=renderer;lastRoute=r;
 if(r==="challenge")return landing();
 var m=/^challenge\/(f170|f171)(?:\/([a-z0-9-]+))?$/.exec(r);
 if(!m)return landing();
 var unit=m[1],scope=m[2]||null;
 if(!scope){visible=false;return intro(unit);}
 var old=session||restore();
 if(old&&old.route===r){
  // An unstarted legacy Quick Mix may still open on a random hard question.
  if(scope==="all"&&!old.quickMixVersion&&old.index===0&&old.phase==="ask"&&!Object.keys(old.first||{}).length)return makeSession(unit,scope,r);
  session=old;return drawQuestion();}
 return makeSession(unit,scope,r);
}
main.addEventListener("change",function(e){
 if(!session||session.phase!=="ask"||!visible)return;
 if(e.target.matches('input[name="kbest"],input[name="kreason"]')){readForm();}
 else if(e.target.matches('input[name="kchoice"]')){
  var q=current();if(!q)return;
  var a=session.answers[q.id]||{};
  if(q.type==="multi")a.selected=Array.from(main.querySelectorAll('input[name="kchoice"]:checked')).map(function(x){return Number(x.value);});
  else a.selected=[Number(e.target.value)];
  session.answers[q.id]=a;save();
  main.querySelectorAll(".k-option").forEach(function(l){l.classList.toggle("selected",!!l.querySelector("input").checked);});
 }else if(e.target.matches("[data-match]")){readForm();}
});
/* Quick tap from the A-level tool: a correct first physical tap checks immediately.
   A first wrong tap produces no visible grading, disables further auto-checks,
   and the learner can revise the selection before using the Check button.
   Keyboard choices never auto-check. */
function pointerQuickTap(e){
 if(!session||session.phase!=="ask"||!visible||!e||!e.detail||session.quickTapAttempted)return;
 var q=current();if(!q||!(q.type==="single"||q.type==="diagram")||!q.options||q.options.length!==4)return;
 var choice=e.target.closest&&e.target.closest(".k-option");
 if(!choice)return;
 var questionId=q.id;
 if(typeof setTimeout!=="function")return;
 setTimeout(function(){
  if(!session||session.phase!=="ask"||current().id!==questionId||session.quickTapAttempted)return;
  var selected=main.querySelector('input[name="kchoice"]:checked');
  if(!selected)return;
  session.quickTapAttempted=true;save();
  if(+selected.value===q.correct)check(false);
 },110);
}
main.addEventListener("input",function(e){
 if(!session||session.phase!=="ask"||!visible)return;
 if(e.target.matches("#k-number, #k-text, #k-written")){var q=current(),a=session.answers[q.id]||{};a.text=e.target.value;session.answers[q.id]=a;save();}
});
main.addEventListener("click",function(e){
 if(!session||!visible)return;
 pointerQuickTap(e);
 var move=e.target.closest("[data-move]");
 if(move){var q=current();if(!q||q.type!=="order")return;
  var a=session.answers[q.id],i=Number(move.dataset.pos),j=i+(move.dataset.move==="up"?-1:1);
  if(!a||!a.order||j<0||j>=a.order.length)return;
  var t=a.order[i];a.order[i]=a.order[j];a.order[j]=t;save();drawQuestion();return;
 }
 var btn=e.target.closest("[data-k-action]");if(!btn)return;
 if(btn.dataset.kAction==="hint")showNextHint();
 if(btn.dataset.kAction==="check")check(false);
 if(btn.dataset.kAction==="reveal")check(false);
 if(btn.dataset.kAction==="skip")check(true);
 if(btn.dataset.kAction==="next")next();
 if(btn.dataset.kAction==="self-good")gradeSelf(true);
 if(btn.dataset.kAction==="self-weak")gradeSelf(false);
});
window.addEventListener("beforeunload",function(e){if(isActive()){e.preventDefault();e.returnValue="";}});
window.KeystoneHumanChallenge={route:route,isActive:isActive,discard:discard,pause:pause,stats:unitStats,questionCount:all.length,types:Array.from(new Set(all.map(function(q){return q.type;}))),icon:icon,hasResume:function(){return !!restore();},resumeRoute:function(){var old=restore();return old?old.route:null;}};
})();
/* Human Biology high-yield question engine v2. Original questions only; not live OCR exam material. */
(function(){
"use strict";
var db=window.KeystoneHumanChallenges,main=document.getElementById("main");
if(!db||!main)return;
if(window.KeystoneHumanKnowledge){db.units=db.units.concat(window.KeystoneHumanKnowledge.units);db.questions=db.questions.concat(window.KeystoneHumanKnowledge.questions);}
var K="narajos-human-challenge-v2-",SK=K+"session",PK=K+"progress",RK=K+"rotation",CK=K+"completed",session=null,progress={},rotation={};
try{var r=JSON.parse(localStorage.getItem(PK)||"{}");if(r&&typeof r==="object"&&!Array.isArray(r))progress=r;}catch(_){}
try{var rr=JSON.parse(localStorage.getItem(RK)||"{}");if(rr&&typeof rr==="object"&&!Array.isArray(rr))rotation=rr;}catch(_){}
var all=db.questions,byId={},skills=window.KeystoneHumanSkills,ladders=window.KeystoneHumanProgressions;all.forEach(function(q){byId[q.id]=q;});
var render=null,visible=false,lastRoute="",skillExampleStem="";
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(a){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[a];});}
function shuffle(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=b[i];b[i]=b[j];b[j]=t;}return b;}
const methodKey=SK+"-mixed-method";
function contextualKey(skillId){return SK+"-catchup-"+skillId;}
function topicKey(unit,scope){return SK+"-topic-"+unit+"/"+scope;}
function sessionKey(item){
 if(item&&item.scope==="methods")return methodKey;
 if(item&&item.topicContext)return topicKey(item.unit,item.scope);
 return item&&item.skillId&&item.returnTo?contextualKey(item.skillId):SK;
}
function localSessionKeys(){
 var keys=[CK,methodKey].concat(skills?skills.definitions.map(function(skill){return contextualKey(skill.id);}):[]);
 try{for(var i=0;i<localStorage.length;i++){var key=localStorage.key(i);if(key.startsWith(SK+"-topic-"))keys.push(key);}}catch(_){}
 return keys;
}
function save(){try{if(session)localStorage.setItem(sessionKey(session),JSON.stringify(session));}catch(_){}}
function clearSession(item){try{localStorage.removeItem(sessionKey(item));}catch(_){}}
function skillReturnLink(route){
 return route?'<a class="button secondary" href="#'+esc(route)+'">Return to the catch-up lesson</a>':"";
}
function parseSkillRoute(route){
 var match=/^skills(?:\/(f17[01]))?(?:\/([a-z]+))?(?:\?from=(catchup\/f17[0-7]\/[a-z0-9.]+))?$/.exec(route);
 return match?{unit:match[1],skillId:match[2],returnTo:match[3]||null}:null;
}
function saveProgress(){try{localStorage.setItem(PK,JSON.stringify(progress));}catch(_){}}
function rotatePool(list){
 var groups={},keys=[];list.forEach(function(q){var key=q.family||q.id;if(!groups[key]){groups[key]=[];keys.push(key);}groups[key].push(q);});
 return keys.map(function(key){var group=shuffle(groups[key]),recent=rotation[key]||[];
  group.sort(function(a,b){var ai=recent.indexOf(a.id),bi=recent.indexOf(b.id);return (ai<0?-1:ai)-(bi<0?-1:bi);});return group[0];
 });
}
function rememberVersions(ids){ids.forEach(function(id){var q=byId[id];if(!q||!q.family)return;var past=rotation[q.family]||[];rotation[q.family]=past.filter(function(x){return x!==id;}).concat(id).slice(-2);});try{localStorage.setItem(RK,JSON.stringify(rotation));}catch(_){}}
function familyInQueue(q){return session&&session.queue.some(function(id){var x=byId[id];return x&&(x.family||x.id)===(q.family||q.id);});}
function restore(key=SK){try{var x=JSON.parse(localStorage.getItem(key)||"null");if(x&&x.skillId){if(!skills||x.skillsVersion!==skills.version||!skills.get(x.skillId)||!Array.isArray(x.generated)||x.generated.length>10)return null;x.generated.forEach(function(g){var q=skills.generate(x.skillId,g.level,g.seed);byId[q.id]=q;});}if(x&&Array.isArray(x.queue)&&x.queue.length&&x.queue.every(function(id){return !!byId[id];})&&x.index<x.queue.length&&!x.complete&&x.route&&x.unit){x.hintsUsed=x.hintsUsed||{};x.quickCheckIds=x.quickCheckIds||{};x.quickCheckLinks=x.quickCheckLinks||{};x.guidedFirst=x.guidedFirst||0;x.quickChecksSeen=x.quickChecksSeen||0;x.quickChecksPassed=x.quickChecksPassed||0;initialiseOutcomes(x);return x;}}catch(_){}return null;}
function initialiseOutcomes(item){
 if(item.outcomes)return;
 item.outcomes={};item.objectiveFirst={};
 // Historical first-attempt flags do not distinguish a submitted error from a reveal.
 // Never carry a written or unmatched short-answer self-rating into objective evidence.
 Object.keys(item.first||{}).forEach(function(id){
  var q=byId[id];if(!q||q.type==="written"||q.type==="short")item.first[id]=false;
 });
 item.correctFirst=Object.keys(item.first||{}).filter(function(id){return item.first[id]===true;}).length;
 Object.keys(item.first||{}).filter(function(id){return item.first[id]===true;}).forEach(function(id){item.objectiveFirst[id]="independent";});
}
function progressEntry(id){
 var old=progress[id];if(old&&old.outcomeVersion===1)return old;
 return {outcomeVersion:1,seen:old&&old.seen||0,checked:0,good:0,wrong:0,independent:0,guided:0,legacy:old||undefined};
}
function needsPractice(p){
 return !!(p&&(p.needsPractice===true||p.lastCorrect===false||(p.guided||0)>0&&!(p.independent||0)));
}
function isActive(){return !!session&&session.index<session.queue.length;}
function pause(){stopHintTimer();session=null;visible=false;} // Preserve the unfinished set in localStorage.
function discard(){stopHintTimer();clearSession(session);session=null;visible=false;}
function savedSession(origin){
 var standard=restore();
 if(!origin&&standard)return standard;
 var candidates=[standard].concat(localSessionKeys().map(function(key){return restore(key);}))
  .filter(Boolean).sort(function(a,b){return b.started-a.started;});
 if(origin)return candidates.find(function(item){return item.reteachTo===origin;})||candidates.find(function(item){return item.returnTo===origin;})||null;
 return candidates[0]||null;
}
function icon(name){
 var paths={
 brain:'<path d="M12 18V5a4 4 0 0 0-7.5-1.9A4 4 0 0 0 3 10a4 4 0 0 0 1 7.5A4 4 0 0 0 12 18ZM12 18V5a4 4 0 0 1 7.5-1.9A4 4 0 0 1 21 10a4 4 0 0 1-1 7.5A4 4 0 0 1 12 18Z" transform="translate(0 2) scale(1 .9)"/>',
 pen:'<path d="m4 16-1 5 5-1L21 7l-4-4L4 16Zm10-10 4 4"/>',
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
function labelType(q){if(q.subtype==="error")return "Spot the error";return {single:"Choose one",multi:"Choose two",order:"Put in order",match:"Match pairs",sort:"Sort statements",number:"Calculate",written:"Explain and check",short:"Short answer",diagram:"Use the diagram",best:"Choose and justify"}[q.type]||"Question";}
function iconFor(q){return {single:"target",multi:"check",order:"layers",match:"grid",sort:"grid",number:"calc",written:"pen",short:"pen",diagram:"target",best:"brain"}[q.type]||"target";}
function isKnowledge(unit){return /^f17[2-7]$/.test(unit);}
function unitMeta(unit){return db.units.filter(function(x){return x.id===unit;})[0]||null;}
function areaName(unit,area){var F=["","Human cells and tissues","Physiology and organ systems","Endocrinology, nerves, and reproduction","Microbiology"];var H=["","Causes and effects of disease","Treatment and prevention","Immunology","Diagnosis and monitoring","Research and confidentiality"];var U=unitMeta(unit);return (unit==="f170"?F:unit==="f171"?H:U&&U.areas||[])[area]||"Topic";}
function filter(unit,scope){
 var list=all.filter(function(q){return q.unit===unit;});
 if(/^a[1-5]$/.test(scope))list=list.filter(function(q){return q.area===Number(scope.slice(1));});
 else if(/^\d+(?:\.\d+)*$/.test(scope))list=list.filter(function(q){return q.section===scope;});
 else if(scope==="methods")list=list.filter(function(q){return q.methodOrder;});
 else if(scope==="core"||scope==="apply"||scope==="stretch")list=list.filter(function(q){return q.level===scope;});
 else if(scope.startsWith("case-"))list=list.filter(q=>q.id===scope&&q.caseTitle);
 else if(scope==="f175-transport")list=list.filter(q=>q.id===scope);
 else if(scope==="sam")list=list.filter(function(q){return q.samAligned;});
 else if(scope==="weak")list=list.filter(function(q){return needsPractice(progress[q.id]);});
 return list;
}
function unitStats(u){var qs=filter(u,"all"),seen=0,weak=0;
 qs.forEach(function(q){var p=progress[q.id];if(p&&p.seen){seen++;if(needsPractice(p))weak++;}});
 return {questions:qs.length,seen:seen,weak:weak};}
function source(){return '<p class="k-source">Original revision questions mapped against <a href="https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf" target="_blank" rel="noopener">OCR specification v8</a> and informed by the <a href="https://www.ocr.org.uk/qualifications/cambridge-advanced-nationals/human-biology-level-3-h049-h149/assessment/" target="_blank" rel="noopener">public sample assessment materials</a>. Examples are not official OCR questions, and sample alignment does not imply exam frequency.</p>';}
function title(u){var U=unitMeta(u);return u.toUpperCase()+" · "+(U?U.title:"Human Biology");}
function show(html){if(render)render(html);}
function knowledgeLanding(){
 var modules=db.units.filter(function(u){return isKnowledge(u.id);});
 var h='<div class="k-wrap"><p class="crumb"><a href="#home">← Home</a></p><div class="k-unit-hero"><div class="k-eyebrow">Cambridge AAQ · Knowledge learning</div><h1>More Human Biology</h1><p>Study the biology in F172–F177 and practise with original examples.</p></div><div class="k-unit-tiles">';
 modules.forEach(function(u){var n=filter(u.id,"all").length;
  h+='<a class="k-unit-tile k-knowledge-tile" href="#challenge/'+u.id+'"><span class="k-icon">'+icon("book")+'</span><span><small>'+u.id.toUpperCase()+' · NEA knowledge support</small><strong>'+esc(u.title)+'</strong><em>'+n+' short practice questions · starter bank</em></span>'+icon("chevron")+'</a>';
 });
 h+='</div><p class="k-source">Use these activities for general learning. Submit assessed coursework through your school or college.</p></div>';show(h);
}
function actionTile(route,label,description,symbol,colour){
 return '<a class="k-action '+colour+'" href="#'+route+'"><span class="k-icon">'+icon(symbol)+'</span><span><strong>'+label+'</strong><small>'+description+'</small></span><span class="k-arrow">'+icon("chevron")+'</span></a>';
}
function intro(unit){
 var f=unit==="f170",knowledge=isKnowledge(unit),meta=unitMeta(unit),stats=unitStats(unit);
 var areas=knowledge?meta.areas.map(function(_,i){return i;}).filter(function(i){return i>0&&filter(unit,"a"+i).length>0;}):(f?[1,2,3,4]:[1,2,3,4,5]),colors=["","#58bcb0","#7da8df","#a18bdd","#e2a05c","#e18c96"];
 var h='<div class="k-wrap"><p class="crumb"><a href="'+(knowledge?"#knowledge":"#home")+'">← '+(knowledge?"Other units":"Home")+'</a></p><div class="k-unit-hero"><div class="k-eyebrow">'+(knowledge?unit.toUpperCase()+" · NEA knowledge support":f?"F170 · Externally assessed":"F171 · Externally assessed")+'</div><h1>'+esc(meta?meta.title:"Human Biology")+'</h1><p>'+esc(knowledge?"General science questions and guided lessons for independent learning.":f?"Choose how you want to revise.":"Apply knowledge in clinical contexts. F171 is an early question-bank preview.")+'</p></div>';
 if(f){
  h+='<section class="k-action-grid k-f170-start" aria-label="Start F170 revision">'+
   actionTile("catchup/f170","Catch up","Learn from guided examples","book","teal")+
   actionTile("challenge/f170/all","Practise questions","Start easy, then build up","bolt","teal")+
   (skills?actionTile("skills/f170","Practise skills","Calculations, data, and evidence","calc","blue"):"")+'</section>';
  h+='<details class="k-f170-more"><summary>More practice options</summary>';
 } else {
  h+='<div class="k-mini-stats"><span><strong>'+stats.questions+'</strong> original questions</span><span><strong>'+stats.seen+'</strong> attempted</span><span><strong>'+stats.weak+'</strong> to revisit</span></div>';
  h+='<p><a href="#catchup/'+unit+'">Catch up on this unit</a></p><h2 class="k-subhead">Start practising</h2>';
  if(unit==="f175")h+='<p><a href="#catchup/f175/a1?stage=follicle">Open the reproductive pathway model</a></p>';
 }
 h+='<div class="k-action-grid">';
 var tiles=[
  ...(!knowledge&&ladders?[["build","Build understanding","One idea, four progressive steps","layers","teal"]]:[]),
  ...(unit==="f171"?[["clinical","Clinical case questions","Practise 6-mark and 9-mark responses","book","blue"]]:[]),
  ...(!f?[["all","Quick mix","Start easy, then build up","bolt","teal"]]:[]),
  [knowledge?"core":"sam",knowledge?"Core knowledge":"Exam-style focus",knowledge?"Learn the essentials":"Skills found in OCR samples","target","blue"],
  ["weak","Fix mistakes","Revisit questions you missed","rotate","orange"],
  ["stretch","Challenge","Apply your understanding","brain","purple"]];
 tiles.forEach(function(t){h+=actionTile("challenge/"+unit+"/"+t[0],t[1],t[2],t[3],t[4]);});
 h+='</div>';
 if(f)h+='</details>';
 if(skills&&!knowledge&&!f)h+='<a class="k-more-units" href="#skills/'+unit+'"><span>'+icon("calc")+'</span><span><strong>Skills practice</strong><small>Worked examples and fresh practice sets</small></span>'+icon("chevron")+'</a>';
 h+='<div class="k-headrow"><h2>Choose a topic</h2><small>'+areas.length+' areas</small></div><div class="k-areas">';
 areas.forEach(function(a){var n=filter(unit,"a"+a).length;h+='<a href="#challenge/'+unit+'/a'+a+'" class="k-area" style="--topic-color:'+colors[a]+'"><span class="k-area-num">'+a+'</span><span class="k-area-label"><strong>'+esc(areaName(unit,a))+'</strong><small>'+n+' questions</small></span>'+icon("chevron")+'</a>';});
 h+='</div>';
 if(unit==="f171"){
  h+='<details class="k-coverage"><summary>What practice is available?</summary><ul>';
  areas.forEach(function(a){
   var qs=filter(unit,"a"+a);
   var cases=qs.filter(function(q){return q.caseTitle;}).length;
   var evidence=qs.filter(function(q){return q.evidenceTable||q.figure||q.graph||q.type==="number";}).length;
   h+='<li><strong>'+esc(areaName(unit,a))+'</strong>. '+evidence+' diagram, data, or calculation questions. '+cases+' extended case '+(cases===1?"response":"responses")+'.</li>';
  });
  h+='</ul><p>Counts include alternative versions of some questions. Topic areas have different depths of coverage.</p></details>';
 }
 h+='<p class="k-source">'+(knowledge?"Practise general biology here. Discuss assessed coursework with your school or college.":f?"Includes all four F170 areas.":"F171 questions cover selected specification content.")+'</p>'+(knowledge?"":source())+'</div>';show(h);
}
function landing(){
 var h='<div class="k-wrap"><p class="crumb"><a href="#home">← Home</a></p><div class="k-unit-hero"><div class="k-eyebrow">Keystone Human Biology</div><h1>Choose an exam unit</h1><p>Short, varied questions first. See an explanation when you need it.</p></div><div class="k-unit-tiles">'+["f170","f171"].map(function(u){var s=unitStats(u);return '<a href="#challenge/'+u+'" class="k-unit-tile '+(u==="f170"?"teal":"blue")+'"><span class="k-icon">'+icon(u==="f170"?"brain":"flask")+'</span><span><small>'+u.toUpperCase()+' · 60-mark paper</small><strong>'+esc(u==="f170"?"Fundamentals of human biology":"Health and disease")+'</strong><em>'+s.questions+' questions · '+s.seen+' attempted'+(u==="f171"?" · preview":"")+'</em></span>'+icon("chevron")+'</a>';}).join("")+'</div>'+source()+'</div>';show(h);
}
/* Quick Mix is a short confidence ladder, not a randomly ordered mini-exam.
   Deliberately accessible entry -> core retrieval -> application -> conditional stretch.
   Selection and grading are entirely deterministic and remain in this browser. */
function quickMixQueue(unit,limit){
 var pool=all.filter(function(q){return q.unit===unit;}),chosen=[],taken={};
 pool=pool.filter(function(q){var recent=rotation[q.family]||[];return !q.family||q.id!==recent[recent.length-1];});
 function choose(candidates,preferredTypes){
  candidates=candidates.filter(function(q){return !taken[q.id]&&!chosen.some(function(c){return (c.family||c.id)===(q.family||q.id);});});
  if(!candidates.length)return null;
  candidates=shuffle(candidates).sort(function(a,b){return score(a)-score(b);});
  var q=candidates[0];chosen.push(q);taken[q.id]=true;return q;
  function score(q){
   var prior=progress[q.id]||{},areas=chosen.filter(function(c){return c.area===q.area;}).length;
   var types=chosen.filter(function(c){return c.type===q.type;}).length;
   var pref=preferredTypes?preferredTypes.indexOf(q.type):-1;
   var recent=rotation[q.family]||[],last=recent.indexOf(q.id),rotationCost=last<0?0:10+last;
   return areas*7+types*100+rotationCost+Math.min(20,(prior.seen||0)*2)+(pref===-1?10:pref*2);
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
  var candidates=rotatePool(all.filter(function(q){
   return q.unit===session.unit&&q.level==="core"&&
    ["single","short","order","diagram"].indexOf(q.type)>=0&&
    session.queue.indexOf(q.id)<0&&
    !Object.prototype.hasOwnProperty.call(session.first,q.id)&&!familyInQueue(q);
  }));
  if(candidates.length){
   candidates=shuffle(candidates);
   candidates.sort(function(a,b){
    var p1=progress[a.id]||{},p2=progress[b.id]||{};
    return (p1.seen||0)-(p2.seen||0);
   });
   session.queue[session.index]=candidates[0].id;rememberVersions([candidates[0].id]);
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
 var candidates=rotatePool(all.filter(function(q){
  return q.unit===session.unit&&q.level===target&&
   session.queue.indexOf(q.id)<0&&!session.first.hasOwnProperty(q.id)&&
   !q.warmup&&!familyInQueue(q);
 }));
 // Prefer previously unseen cards and a topic not already over-represented.
 if(candidates.length&&target!=="apply"){
  candidates=shuffle(candidates);
  candidates.sort(function(a,b){
   var p1=progress[a.id]||{},p2=progress[b.id]||{};
   return (p1.seen||0)-(p2.seen||0);
  });
  session.queue[session.index]=candidates[0].id;rememberVersions([candidates[0].id]);
 }
 session.quickMixAdjusted=true;
 save();
}
function makeSession(unit,scope,route,origin){
 if(ladders&&scope==="build")return progressionMenu(unit);
 if(unit==="f171"&&scope==="clinical")return showClinicalCases();
 var point=ladders&&ladders.get(scope);
 if(point&&point.unit!==unit)return intro(unit);
 var selected=rotatePool(filter(unit,scope));if(!selected.length){show('<div class="k-wrap"><p class="crumb"><a href="#challenge/'+unit+'">← Exam unit</a></p><div class="paper panel"><h1>No questions here yet</h1><p>Try a mixed set or choose another area.</p><a class="button primary" href="#challenge/'+unit+'/all">Start mixed questions</a></div></div>');return;}
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
 if(point){ids=[point.foundation,rotatePool(point.core.map(function(id){return byId[id];}))[0].id];ids=[ids[0],point.diagnostic,ids[1],point.challenge];}
 else if(scope==="methods"){ids=selected.sort(function(a,b){return a.methodOrder-b.methodOrder;}).map(function(q){return q.id;});}
 else if(scope==="all"){ids=quickMixQueue(unit,size);}
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
 if(point)session.point=point.id;
 if(origin){session.topicContext=true;session.returnTo=origin;}
 rememberVersions(ids);save();drawQuestion();
}
function showClinicalCases(){
 visible=false;
 const cases=all.filter(q=>q.unit==="f171"&&q.caseTitle);
 const links=cases.map(q=>'<a class="k-action blue" href="#challenge/f171/'+esc(q.id)+'"><span class="k-icon">'+icon("book")+'</span><span><strong>'+esc(q.caseTitle)+'</strong><small>'+q.marks+' marks · '+(q.marks===6?"Analyse":"Discuss")+'</small></span></a>');
 show('<div class="k-wrap"><p class="crumb"><a href="#challenge/f171">← F171</a></p><div class="k-unit-hero"><h1>Clinical case questions</h1><p>Write an answer, then compare your reasoning with an example and the key points.</p></div><details class="k-coverage"><summary>What the command words ask for</summary><dl>'+
  '<dt><strong>Describe</strong></dt><dd>State relevant observations, features or events.</dd>'+
  '<dt><strong>Explain</strong></dt><dd>Use a biological mechanism to show why something happens.</dd>'+
  '<dt><strong>Analyse</strong></dt><dd>Connect relevant information in this case and explain what the relationships mean.</dd>'+
  '<dt><strong>Discuss</strong></dt><dd>Weigh evidence, implications and limitations to reach a justified view.</dd>'+
  '</dl></details><div class="k-action-grid">'+links.join("")+'</div></div>');
}
function progressionMenu(unit){
 visible=false;var points=ladders.points.filter(function(p){return p.unit===unit;});
 var h='<div class="k-wrap"><p class="crumb"><a href="#challenge/'+unit+'">← Unit overview</a></p><div class="k-unit-hero"><div class="k-eyebrow">'+unit.toUpperCase()+' · Step by step</div><h1>Build understanding</h1><p>Choose one idea. Start with prior knowledge, check a misconception, try a rotating exam-focused question, then tackle a challenge. Read the explanation after each step.</p></div><p class="k-source">'+points.length+' selected teaching ideas across the unit. Each section contains further required content: this is not yet complete statement-by-statement coverage. Repeats rotate the third question; the supporting steps currently stay the same.</p>';
 var area=0;points.forEach(function(p){if(area!==p.area){if(area)h+='</div></details>';area=p.area;h+='<details class="k-progression-area"'+(area===1?' open':'')+'><summary>'+esc(areaName(unit,area))+'</summary><div class="k-progression-list">';}
  h+='<article class="paper k-skill-card"><small>'+unit.toUpperCase()+' · '+esc(p.section)+'</small><h3>'+esc(p.statement)+'</h3><p>Foundation → misconception → exam focus → challenge</p><a class="button primary" href="#challenge/'+unit+'/'+p.id+'">Start sequence<span class="sr-only">: '+esc(p.statement)+'</span></a></article>';
 });if(area)h+='</div></details>';show(h+source()+'</div>');
}
function current(){return session&&byId[session.queue[session.index]];}
/* Skills reuse the question engine. Store seeds, not a second bank of answers.
   Aggregate history by skill, keeping topic-question scores independent. */
function skillsMenu(unit){
 visible=false;
 if(!skills)return landing();
 var defs=skills.definitions.filter(function(s){return !unit||s.unit===unit;}),old=restore();
 var h='<div class="k-wrap"><p class="crumb"><a href="#home">← Home</a></p><div class="k-unit-hero"><div class="k-eyebrow">Human Biology · Repeated practice</div><h1>Skills practice</h1><p>Choose a method. See a worked example, then try ten questions. Start with choices; build towards independent application.</p></div><div class="actions"><a class="button secondary" href="#skills">All skills</a><a class="button secondary" href="#skills/f170">F170 skills</a><a class="button secondary" href="#skills/f171">F171 skills</a></div>';
 if(!unit||unit==="f171")h+='<p><a class="button primary" href="#challenge/f171/methods">Choose a method from the context</a></p>';
 if(old&&old.skillId)h+='<div class="k-continue"><div><strong>Unfinished skills set</strong><p>'+esc(skills.get(old.skillId).name)+'</p></div><a class="button primary" href="#'+esc(old.route)+'">Resume practice</a></div>';
 ["f170","f171"].forEach(function(u){var group=defs.filter(function(s){return s.unit===u;});if(!group.length)return;
  h+='<h2>'+u.toUpperCase()+'</h2><div class="k-skills-grid">';
  group.forEach(function(s){var p=progress["skill:"+s.id]||{};
   var saved=old&&old.skillId===s.id?old:restore(contextualKey(s.id));
   h+='<article class="paper k-skill-card"><h3>'+esc(s.name)+'</h3><p>'+esc(s.description)+'</p>'+(p.checked?'<p class="k-source">'+p.independent+' of '+p.checked+' checked responses answered independently</p>':'')+'<a class="button primary" href="#'+(saved?esc(saved.route):'skills/'+u+'/'+s.id)+'">'+(saved?'Resume':'Practise')+'<span class="sr-only"> '+esc(s.name)+'</span></a></article>';
  });h+='</div>';
 });
 h+='<p class="k-source">Calculations vary numbers and, where appropriate, the unknown quantity. Reasoning questions rotate through authored contexts. Repeats are possible. These skills support F170/F171; they are not complete knowledge coverage.</p>'+source()+'</div>';show(h);
}
function skillExample(sk,returnTo){
 visible=false;var q=skills.generate(sk.id,2,Math.floor(Math.random()*4294967296));skillExampleStem=q.stem+JSON.stringify(q.graph||null);
 var h='<div class="k-wrap"><p class="crumb"><a href="#skills/'+sk.unit+'">← Skills practice</a></p><div class="k-unit-hero"><div class="k-eyebrow">'+sk.unit.toUpperCase()+' · Skills practice</div><h1>'+esc(sk.name)+'</h1><p>Work through this example. Your practice starts with a different question.</p></div><section class="paper k-skill-example"><h2>Worked example</h2><p>'+esc(q.stem)+'</p>'+skills.graphHTML(q.graph)+'<h3>Method</h3><p>'+esc(q.explain)+'</p><p><strong>'+answerKey(q)+'</strong></p></section><p>Two independent correct answers move you up one step. An error moves the next question down one step. Using help keeps you at the same step.</p><button type="button" class="button primary" data-start-skill="'+sk.id+'">Now try one</button>'+skillReturnLink(returnTo)+'</div>';
 show(h);
}
function addSkillQuestion(){
 var q,tries=0;
 do{q=skills.generate(session.skillId,session.skillLevel,Math.floor(Math.random()*4294967296));tries++;}while(((q.stem+JSON.stringify(q.graph||null))===skillExampleStem||session.generated.some(function(g){return byId[g.id]&&(byId[g.id].stem+JSON.stringify(byId[g.id].graph||null))===(q.stem+JSON.stringify(q.graph||null));}))&&tries<50);
 byId[q.id]=q;session.generated.push({id:q.id,level:q.skillLevel,seed:q.generatedSeed});session.queue.push(q.id);
 session.maxSkillLevel=Math.max(session.maxSkillLevel||1,session.skillLevel);
}
function startSkill(sk,r){
 session={unit:sk.unit,scope:"skill",route:r,returnTo:parseSkillRoute(r).returnTo,skillId:sk.id,skillsVersion:skills.version,skillLevel:1,maxSkillLevel:1,skillStreak:0,generated:[],queue:[],index:0,first:{},correctFirst:0,guidedFirst:0,phase:"ask",answers:{},retries:{},hintsUsed:{},quickCheckIds:{},quickCheckLinks:{},quickChecksPassed:0,quickChecksSeen:0,complete:false,started:Date.now()};
 addSkillQuestion();save();drawQuestion();
}
function skillRoute(r){
 var path=parseSkillRoute(r);
 if(!path)return skillsMenu();
 var sk=path.skillId&&skills&&skills.get(path.skillId);
 if(!sk||sk.unit!==path.unit)return skillsMenu(path.unit);
 var old=restore(path.returnTo?contextualKey(sk.id):SK);
 if(old&&old.skillId===sk.id){
  session=old;session.returnTo=path.returnTo;session.route=r;save();return drawQuestion();
 }
 return skillExample(sk,path.returnTo);
}
function isQuickCheck(q){return !!(session&&session.quickCheckIds&&q&&session.quickCheckIds[q.id]);}
function formChoice(q,answer){
 var selected=answer&&Array.isArray(answer.selected)?answer.selected:[];
 if(!answer.optionOrder){answer.optionOrder=shuffle(q.options.map(function(_,i){return i;}));session.answers[q.id]=answer;save();}
 return '<div class="k-options" role="group" aria-label="Answer choices">'+answer.optionOrder.map(function(i,pos){var o=q.options[i];
  var checked=selected.indexOf(i)!==-1;
  var excluded=session.hintExcluded&&session.hintExcluded[q.id]===i&&(session.hintsUsed[q.id]||0)>=3;
  return '<label class="k-option'+(checked?" selected":"")+(excluded?" k-option-out":"")+'"><input type="'+(q.type==="multi"?"checkbox":"radio")+'" name="kchoice" value="'+i+'"'+(checked?" checked":"")+(excluded?' disabled':'')+'><span class="k-option-letter">'+String.fromCharCode(65+pos)+'</span><span>'+esc(o)+'</span>'+(excluded?'<span class="k-ruled-out">Ruled out</span>':'')+'</label>';
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
function usableOrder(q,order){
 return Array.isArray(order)&&order.length===q.items.length&&new Set(order).size===order.length&&order.every(function(i){return Number.isInteger(i)&&i>=0&&i<q.items.length;});
}
function rowStatus(answer,i){
 if(!answer.correction)return "";
 return '<span class="k-row-status">'+(answer.correction[i]?"Correct so far":"Review this row")+'</span>';
}
function orderForm(q,answer){
 var current=usableOrder(q,answer.order)?answer.order:null;
 if(!current){current=shuffle(q.items.map(function(_,i){return i;}));if(current.every(function(v,i){return v===i;}))current.reverse();session.answers[q.id]={order:current};save();}
 return '<ol class="k-order">'+current.map(function(idx,pos){
 return '<li><span class="k-order-num">'+(pos+1)+'</span><span>'+esc(q.items[idx])+(answer.correction&&idx!==pos?' <span class="k-row-status">Review position</span>':'')+'</span><span class="k-order-controls"><button class="k-small-btn" type="button" data-move="up" data-pos="'+pos+'" aria-label="Move step '+(pos+1)+' up" '+(pos===0?"disabled":"")+'>↑</button><button class="k-small-btn" type="button" data-move="down" data-pos="'+pos+'" aria-label="Move step '+(pos+1)+' down" '+(pos===current.length-1?"disabled":"")+'>↓</button></span></li>';
 }).join("")+'</ol><p class="k-hint">Use the arrows to put the steps in order.</p>';
}
function sortForm(q,answer){
 var selected=answer&&Array.isArray(answer.sort)?answer.sort:[];
 return '<div class="k-sort"><p class="k-hint">Choose one group for each statement.</p>'+
 q.rows.map(function(row,i){
  return '<fieldset class="k-sort-row"'+(answer.correction&&answer.correction[i]?' disabled':'')+'><legend>'+esc(row[0])+'</legend>'+rowStatus(answer,i)+'<div class="k-sort-choices">'+q.groups.map(function(group,j){
   return '<label><input type="radio" name="ksort-'+i+'" value="'+j+'" data-sort-row="'+i+'"'+(selected[i]!==undefined&&selected[i]!==''&&Number(selected[i])===j?' checked':'')+'><span>'+esc(group)+'</span></label>';
  }).join("")+'</div></fieldset>';
 }).join("")+'</div>';
}
function matchForm(q,answer){
 var vals=answer&&Array.isArray(answer.match)?answer.match:[];
 if(!answer.targetOrder){answer.targetOrder=shuffle(q.pairs.map(function(_,i){return i;}));session.answers[q.id]=answer;save();}
 return '<div class="k-matches">'+q.pairs.map(function(p,i){
 return '<label class="k-match"><span>'+esc(p[0])+rowStatus(answer,i)+'</span><select'+(answer.correction&&answer.correction[i]?' disabled':'')+' data-match="'+i+'" aria-label="Match for '+esc(p[0])+'"><option value="">Choose a match</option>'+answer.targetOrder.map(function(j){return '<option value="'+j+'"'+(String(vals[i])===String(j)?" selected":"")+'>'+esc(q.pairs[j][1])+'</option>';}).join("")+'</select></label>';
 }).join("")+'</div>';
}
function evidenceTable(table,reveal){
 return '<div class="k-evidence-table" tabindex="0" role="region" aria-label="'+esc(table.caption)+'"><table><caption>'+esc(table.caption)+'</caption><thead><tr>'+
  table.columns.map(function(heading){return '<th scope="col">'+esc(heading)+'</th>';}).join("")+
  '</tr></thead><tbody>'+table.rows.map(function(row,r){
   return '<tr><th scope="row">'+esc(row[0])+'</th>'+row.slice(1).map(function(value,c){
    var focus=reveal&&table.focus?.some(function(pair){return pair[0]===r&&pair[1]===c+1;});
    return '<td'+(focus?' class="k-evidence-focus"':'')+'>'+esc(value)+'</td>';
   }).join("")+'</tr>';
  }).join("")+'</tbody></table></div>';
}
const practiceFigures={
 "practice-airway":["airway","Airway lining showing cilia and a mucus layer with trapped particles."],
 "practice-breath-in":["breath-in","Chest cavity in inspiration with a flattened diaphragm, expanded lungs, and outward rib movement."],
 "practice-cuff":["cuff","A cuff is wrapped around the upper arm, connected to a display reading 124 over 78."],
 "practice-cast":["cast","Forearm cutaway showing the cast shell and a break in the bone."],
 "practice-antibody":["antibody","A Y-shaped antibody with matching antigen fragments near its two tips."],
 "practice-chromatogram":["chromatogram","Three lanes share a baseline at 2 cm and a solvent front at 10 cm. Standard J has a spot at 4 cm, K at 8 cm. The unknown has spots at 6 cm and 8 cm."]
};
function figure(name,reveal){
 if(typeof name==="object"){
  return '<figure class="k-figure k-question-photo"><img width="'+name.width+'" height="'+name.height+'" src="'+esc(name.src)+'" alt="'+esc(name.alt)+'">'+
   '<figcaption><a href="'+esc(name.source)+'">'+esc(name.credit)+'</a> · <a href="'+esc(name.licence)+'">'+esc(name.licenceName)+'</a> · '+esc(name.adaptation)+'</figcaption></figure>';
 }
 var art=practiceFigures[name];
 if(art)return '<figure class="k-figure"><img width="600" height="360" style="width:100%;height:auto;max-width:600px" src="/assets/practice-diagrams/'+art[0]+'.svg" alt="'+esc(art[1])+'"></figure>';
 var tag='<div class="k-figure">';
 if(name==="cell")tag+='<svg viewBox="0 0 440 210" role="img" aria-label="A schematic human cell with label A pointing to one structure. A nucleus and several organelles are shown."><ellipse cx="187" cy="105" rx="137" ry="82" fill="#e2f3f0" stroke="#167a77" stroke-width="5"/><circle cx="164" cy="105" r="37" fill="#d9d3f4" stroke="#7652ac" stroke-width="3"/><circle cx="170" cy="100" r="11" fill="#9679cb"/><ellipse cx="249" cy="78" rx="24" ry="13" fill="#efbd77" stroke="#98692c" stroke-width="3" transform="rotate(-24 249 78)"/><path d="M236 74q12 6 25 0" stroke="#98692c" stroke-width="2" fill="none"/><path d="M291 52L367 35" stroke="#1e5360" stroke-width="3"/><text x="374" y="37" font-size="25" font-weight="800" fill="#1e5360">A</text></svg>';
 else if(name==="heart")tag+='<svg viewBox="0 0 440 235" role="img" aria-label="Schematic heart cross-section with two lower chambers and a pointer labelled A."><path d="M98 69Q90 20 135 20L201 55 266 20Q321 20 309 85L291 167Q285 212 205 214 130 211 117 163Z" fill="#fbe4e4" stroke="#a64a56" stroke-width="4"/><path d="M205 57L205 209" stroke="#9b4050" stroke-width="12"/><path d="M142 92Q116 125 157 172L194 193V102Z" fill="#c4dcef" stroke="#447da7" stroke-width="2"/><path d="M220 102V193L260 172Q298 125 268 92Z" fill="#edaaaa" stroke="#a64a56" stroke-width="2"/><path d="M205 131L346 78" stroke="#1e5360" stroke-width="3"/><text x="355" y="83" font-size="24" font-weight="800" fill="#1e5360">A</text></svg>';
 else if(name==="neuron")tag+='<svg viewBox="0 0 440 188" role="img" aria-label="Schematic neuron showing an axon, insulating segments and a highlighted damaged region."><circle cx="55" cy="95" r="26" fill="#e6d7f5" stroke="#835ca7" stroke-width="3"/><path d="M29 81L10 63M31 108L11 131M55 69L55 48M78 88L120 94M119 94H403" stroke="#65539c" stroke-width="5" fill="none"/><rect x="134" y="77" width="61" height="34" rx="14" fill="#bce3df" stroke="#167a77" stroke-width="3"/><rect x="216" y="77" width="61" height="34" rx="14" fill="#f6e1cb" stroke="#d79035" stroke-dasharray="6 5" stroke-width="3"/><rect x="298" y="77" width="62" height="34" rx="14" fill="#bce3df" stroke="#167a77" stroke-width="3"/><path d="M244 68L252 33" stroke="#d79035" stroke-width="3"/><text x="263" y="28" font-size="18" fill="#8e5919" font-weight="800">Damage</text></svg>';
 else if(name==="growth")tag+='<svg viewBox="0 0 440 230" role="img" aria-label="Bacterial population growth graph with four regions labelled A to D, and time on the horizontal axis."><path d="M48 15V185H420" stroke="#354c58" stroke-width="3" fill="none"/><path d="M65 164C100 165 111 165 135 157S205 80 243 47S298 47 343 47 383 68 401 109" stroke="#0b7973" stroke-width="5" fill="none"/><g fill="#263e4b" font-size="19" font-weight="750"><text x="87" y="151">A</text><text x="175" y="92">B</text><text x="293" y="31">C</text><text x="393" y="57">D</text><text x="177" y="217" font-size="14">Time</text><text x="56" y="15" font-size="14">Living cells</text></g></svg>';
 else if(name==="antibody")tag+='<svg viewBox="0 0 440 230" role="img" aria-label="Y-shaped antibody with an arrow labelled A pointing at part of one upper arm."><g fill="none" stroke-linecap="round" stroke-width="19"><path d="M217 199V113L155 38" stroke="#5c88b4"/><path d="M217 113L279 38" stroke="#5c88b4"/><path d="M226 199V116L165 33" stroke="#bd8ad3" stroke-width="5"/><path d="M226 116L289 33" stroke="#bd8ad3" stroke-width="5"/></g><path d="M150 34L93 17" stroke="#233d50" stroke-width="3"/><text x="63" y="25" font-size="23" font-weight="800">A</text></svg>';
 else if(name==="antibiotic")tag+='<svg viewBox="0 0 440 220" role="img" aria-label="Petri dish containing four discs labelled A, B, C and D, each with a different-sized clear zone."><ellipse cx="210" cy="109" rx="158" ry="94" fill="#dbecce" stroke="#77955e" stroke-width="4"/><g fill="#fff" stroke="#b3c3a8" stroke-width="2"><circle cx="125" cy="75" r="20"/><circle cx="227" cy="79" r="43"/><circle cx="145" cy="150" r="24"/><circle cx="282" cy="155" r="14"/></g><g fill="#d2b58b" stroke="#917a55" stroke-width="2"><circle cx="125" cy="75" r="8"/><circle cx="227" cy="79" r="8"/><circle cx="145" cy="150" r="8"/><circle cx="282" cy="155" r="8"/></g><g font-size="17" font-weight="800" fill="#273e42"><text x="104" y="50">A</text><text x="222" y="24">B</text><text x="130" y="186">C</text><text x="295" y="180">D</text></g></svg>';

 else if(name==="hb-alleles")tag+='<svg viewBox="0 0 440 210" role="img" aria-label="Two homologous chromosome diagrams with the same labelled location on each, marked A on one and a on the other."><g stroke="#516b84" stroke-width="4" fill="#d7e5f0"><rect x="124" y="30" width="38" height="147" rx="18"/><rect x="272" y="30" width="38" height="147" rx="18"/></g><path d="M132 97H154M280 97H302" stroke="#bc5c59" stroke-width="8" stroke-linecap="round"/><path d="M168 97H197M310 97H341" stroke="#50687a" stroke-width="2"/><g fill="#243d4d" font-size="25" font-weight="700"><text x="201" y="106">A</text><text x="349" y="106">a</text></g><text x="84" y="200" fill="#536874" font-size="13">Simplified chromosome pair · not to scale</text></svg>';
 else if(name==="hb-blood")tag+='<svg viewBox="0 0 440 216" role="img" aria-label="Schematic blood film with several smaller circular cells, tiny fragments and one larger nucleated cell marked B."><rect x="15" y="9" width="408" height="190" rx="16" fill="#fbf5f5"/><g fill="#f4a7a2" stroke="#c47373" stroke-width="2"><circle cx="65" cy="53" r="24"/><circle cx="130" cy="138" r="23"/><circle cx="363" cy="133" r="24"/><circle cx="96" cy="178" r="17"/><circle cx="365" cy="48" r="22"/></g><g fill="#ffddd6"><circle cx="65" cy="53" r="10"/><circle cx="130" cy="138" r="10"/><circle cx="363" cy="133" r="10"/><circle cx="365" cy="48" r="10"/></g><circle cx="254" cy="95" r="51" fill="#e0c8ed" stroke="#8b6bb8" stroke-width="3"/><path d="M235 63Q212 97 239 109Q259 137 282 105Q302 73 265 68Z" fill="#78549e"/><g fill="#8568aa"><circle cx="185" cy="164" r="5"/><circle cx="205" cy="169" r="4"/></g><path d="M291 70L347 27" stroke="#304c61" stroke-width="3"/><text x="355" y="30" fill="#304c61" font-size="26" font-weight="800">B</text></svg>';
 else if(name==="hb-glucose")tag+='<svg viewBox="0 0 440 240" role="img" aria-label="Plasma glucose graph after a meal. It rises from baseline, reaches a peak and then gradually returns towards baseline over two hours."><path d="M55 19V191H424" stroke="#394c5a" stroke-width="3" fill="none"/><g stroke="#d5dedc" stroke-width="1"><path d="M55 149H415M55 99H415M55 49H415"/></g><g fill="#455965" font-size="14"><text x="33" y="154">4</text><text x="33" y="104">6</text><text x="33" y="54">8</text><text x="42" y="213">0</text><text x="139" y="213">30</text><text x="229" y="213">60</text><text x="312" y="213">90</text><text x="397" y="213">120</text><text x="168" y="233">Time after meal (min)</text><text x="64" y="17">Blood glucose (mmol/L)</text></g><path d="M56 149C91 147 116 118 151 68S192 40 211 57S292 147 418 144" fill="none" stroke="#11766d" stroke-width="5" stroke-linecap="round"/><path d="M55 149H418" stroke="#b6c2bf" stroke-dasharray="4 7" stroke-width="2"/></svg>';
 else if(name==="hb-oviduct")tag+='<svg viewBox="0 0 440 220" role="img" aria-label="Simplified front view of a uterus with two curved tubes leading towards two round structures. Arrow A identifies one of the curved tubes."><path d="M166 76C157 62 133 54 96 68Q83 73 72 91M271 77C290 55 323 55 345 66Q362 73 373 92" stroke="#b45c83" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="66" cy="105" r="18" fill="#eab4ce" stroke="#ad6082" stroke-width="3"/><circle cx="377" cy="105" r="18" fill="#eab4ce" stroke="#ad6082" stroke-width="3"/><path d="M174 67Q220 40 264 67Q270 113 247 146L234 185H207L192 145Q165 112 174 67Z" fill="#e9b4c2" stroke="#ad617d" stroke-width="4"/><path d="M192 78Q220 60 246 77Q251 114 228 147V177H213V147Q190 115 192 78Z" fill="#fbe6eb" stroke="#bd7c97" stroke-width="2"/><path d="M114 67L81 22" stroke="#314f64" stroke-width="3"/><text x="60" y="23" font-size="24" font-weight="800" fill="#314f64">A</text></svg>';
 else if(name==="hb-brain")tag+='<svg viewBox="0 0 440 220" role="img" aria-label="Side view schematic of a brain. The larger upper folded region, a smaller folded region at the back and a lower brain stem are shown; label A marks the small folded region."><path d="M73 116Q43 79 80 54Q104 22 150 31Q187 8 221 30Q258 12 302 40Q354 55 344 105Q335 130 315 133Q299 149 272 140Q238 165 184 150Q154 174 122 151Q83 153 73 116Z" fill="#e8d8f0" stroke="#8d69a8" stroke-width="4"/><path d="M114 48Q101 76 129 85M172 35Q183 59 161 80M229 33Q245 61 227 84M291 48Q303 70 278 93M91 109Q115 96 126 122M197 106Q222 92 240 121" fill="none" stroke="#a78cba" stroke-width="3"/><path d="M261 139Q255 185 282 190L298 202" stroke="#8d69a8" stroke-width="18" fill="none" stroke-linecap="round"/><ellipse cx="323" cy="150" rx="41" ry="29" fill="#c5b0e2" stroke="#8055a5" stroke-width="4"/><path d="M292 145L350 145M294 155L350 155" stroke="#9a7ac4" stroke-width="2"/><path d="M359 151L402 164" stroke="#314f64" stroke-width="3"/><text x="407" y="169" fill="#314f64" font-size="24" font-weight="800">A</text></svg>';
 else if(name==="hb-trial")tag+='<svg viewBox="0 0 440 240" role="img" aria-label="Flow chart: eligible participants are randomly allocated between two groups, one receiving a new treatment and the other a comparison. Outcomes are recorded."><rect x="133" y="12" width="174" height="45" rx="10" fill="#dceee9" stroke="#32887d" stroke-width="2"/><text x="220" y="31" text-anchor="middle" fill="#23554c" font-size="15" font-weight="700">Participants</text><text x="220" y="48" text-anchor="middle" fill="#23554c" font-size="12">enrolled with consent</text><path d="M220 58V87M220 87H117V112M220 87H322V112" fill="none" stroke="#526779" stroke-width="3"/><text x="220" y="80" text-anchor="middle" font-size="12" fill="#344e5e">Random allocation</text><rect x="30" y="111" width="178" height="48" rx="10" fill="#d9e9fd" stroke="#6292cc" stroke-width="2"/><rect x="232" y="111" width="178" height="48" rx="10" fill="#fbe6d7" stroke="#cb9767" stroke-width="2"/><text x="119" y="139" text-anchor="middle" fill="#2c557a" font-size="16" font-weight="700">New medicine</text><text x="321" y="139" text-anchor="middle" fill="#78553b" font-size="16" font-weight="700">Comparison group</text><path d="M119 160V186M321 160V186" stroke="#526779" stroke-width="3"/><rect x="33" y="186" width="172" height="39" rx="8" fill="#f5f7f6" stroke="#becdc6"/><rect x="235" y="186" width="172" height="39" rx="8" fill="#f5f7f6" stroke="#becdc6"/><g font-size="14" fill="#354a50"><text x="119" y="210" text-anchor="middle">Measure outcomes</text><text x="321" y="210" text-anchor="middle">Measure outcomes</text></g></svg>';

 if(reveal){
  var notes={
   cell:"A = cell-surface membrane. It regulates exchange across the whole-cell boundary.",
   heart:"A = interventricular septum. This tissue separates the right and left ventricles.",
   neuron:"Myelin improves conduction between nodes of Ranvier; damage may slow or interrupt signalling.",
   growth:"B = exponential phase. The living-cell population rises rapidly as cells repeatedly divide.",
   antibody:"A = antigen-binding region. Variable regions at the antibody tips recognise particular antigens.",
   antibiotic:"Disc B has the largest visible clear zone. This is a result under the stated agar-test conditions.",
   "hb-alleles":"A and a occur at corresponding gene loci: two versions of one gene.",
   "hb-blood":"B = white blood cell (leukocyte). Its nucleus distinguishes it from mature red blood cells.",
   "hb-glucose":"After the peak, insulin supports glucose uptake or storage, helping plasma glucose return towards baseline.",
   "hb-oviduct":"A = oviduct. It connects the region near the ovary to the uterus and is a usual site of fertilisation.",
   "hb-brain":"A = cerebellum. This smaller folded region helps coordinate movement.",
   "hb-trial":"Random allocation reduces selection bias, improving comparability of the treatment and comparison groups."
  };
  if(notes[name])tag+='<p class="k-diagram-answer"><strong>Look again:</strong> '+esc(notes[name])+'</p>';
 }
 return tag+'</div>';
}
function inputForm(q,answer){
 answer=answer||{};
 if(q.type==="best")return bestForm(q,answer);
 if(q.type==="single"||q.type==="diagram"||q.type==="multi")return formChoice(q,answer);
 if(q.type==="order")return orderForm(q,answer);
 if(q.type==="sort")return sortForm(q,answer);
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
 if(q.type==="sort")return '<ul>'+q.rows.map(function(row){return '<li>'+esc(row[0])+' → '+esc(q.groups[row[1]])+'</li>';}).join("")+'</ul>';
 if(q.type==="match")return '<ul>'+q.pairs.map(function(p){return '<li>'+esc(p[0])+' → '+esc(p[1])+'</li>';}).join("")+'</ul>';
 if(q.type==="number")return '<strong>'+esc(q.model)+'</strong>';
 if(q.type==="short")return '<strong>'+esc(q.model)+'</strong>';
 return '<div class="k-criteria"><p>'+esc(q.model)+'</p><strong>Key points to look for</strong><ul>'+q.markPoints.map(function(p){return '<li>'+esc(p)+'</li>';}).join("")+'</ul></div>';
}
function currentAnswer(){var q=current();return q&&(session.answers[q.id]||{});}
/* Quiet inactivity delay; optional least-help-first conceptual scaffolds. */
var HINT_DELAY=10000,hintTimer=null;
function stopHintTimer(){if(hintTimer!==null&&typeof clearTimeout==="function")clearTimeout(hintTimer);hintTimer=null;}
function hintStrategy(q){
 var v={
  number:"Write the calculation and check the units before you use the numbers.",
  order:"Find the first and final steps, then connect the events between them.",
  match:"Find the easiest pair first. For the others, think about function.",
  sort:"Read each statement separately. Which group describes it?",
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
 var items=Array.isArray(q.hints)&&q.hints.length?q.hints.slice(0,2):[hintStrategy(q)];
 if(!q.hints&&typeof q.hintCue==="string"&&q.hintCue.trim())items.push(q.hintCue);
 if(items.length===2&&["single","diagram","multi"].indexOf(q.type)>=0&&q.options&&q.options.length===4){
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
 b.hidden=hintRemaining()>0;b.disabled=false;
 var label=session.hintsUsed&&session.hintsUsed[current().id]?"More help":"Hint";
 b.textContent=label;b.setAttribute("aria-label",label);
}
function startHintTimer(){
 stopHintTimer();updateHintButton();
 var remaining=hintRemaining();
 if(remaining>0&&typeof setTimeout==="function")hintTimer=setTimeout(function(){hintTimer=null;updateHintButton();},remaining+5);
}
function noteAnswerActivity(){
 if(!session||session.phase!=="ask"||!visible)return;
 session.hintReadyAt=Date.now()+HINT_DELAY;save();startHintTimer();
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
function questionPrompt(q){
 if(q.unit!=="f170")return '<h1>'+esc(q.stem)+'</h1>';
 // Keep the authored wording. Give standalone instructions their own line where
 // a question follows a complete context sentence. Decimal points are untouched.
 var stem=q.stem;
 var split=session.scope==="sam"?-1:stem.search(/(?<=[.!?])\s+(?=(?:Which|What|How|Why|Calculate|Explain|Find|Identify|Suggest|Predict|Describe|State|Give|Use)\b)/);
 var context=split<0?"":stem.slice(0,split);
 var task=split<0?stem:stem.slice(split).trimStart();
 return '<div id="f170-prompt" class="k-reading-prompt">'+
  (context?'<p class="reading-copy k-reading-context">'+esc(context)+'</p>':'')+
  '<h1>'+esc(task)+'</h1></div>';
}
function compareCase(q){
 var comparison=q.comparison;
 var responses=comparison.order.map(function(key,i){
  return '<div><h4>Response '+String.fromCharCode(65+i)+'</h4><p>'+esc(key==="model"?q.model:comparison.partial)+'</p></div>';
 }).join("");
 var annotations=comparison.notes.map(function(note){
  return '<li><strong>'+esc(note[0])+'</strong><blockquote>'+esc(note[2])+'</blockquote><p>'+esc(note[1])+'</p></li>';
 }).join("");
 var command=q.marks===6?"Analyse how the case details relate and what those relationships mean.":
  "Discuss the benefits, limitations and implications for this case. Reach a justified view.";
 return '<section><h3>Compare two answers</h3><p>'+command+'</p><p>Which response better answers the case, and why?</p>'+
  '<details><summary>Read responses A and B</summary>'+responses+'<details><summary>Check your comparison</summary>'+
  '<p>'+esc(comparison.comparison)+'</p><ul class="k-case-annotations">'+annotations+'</ul><p>'+esc(q.explain)+'</p></details></details></section>';
}
function writtenReview(q,a){
 var review=a.review||{},finished=!!session.outcomes[session.index];
 var student='<section><h3>Your answer</h3><p class="k-review-draft">'+esc(a.text||"No draft was saved.")+'</p></section>';
 var model=q.comparison?compareCase(q):'<section><h3>Expected ideas</h3><p>'+esc(q.model)+'</p><p>'+esc(q.explain)+'</p></section>';
 var criteria=q.markPoints.map(function(point,i){
  var value=(review.criteria||{})[i];
  return '<label><span>'+esc(point)+'</span><select data-review-criterion="'+i+'"'+(finished?' disabled':'')+'><option value=""'+(!value?' selected':'')+'>Choose a rating</option><option value="met"'+(value==="met"?' selected':'')+'>Included</option><option value="work"'+(value==="work"?' selected':'')+'>Needs work</option></select></label>';
 }).join("");
 return '<div class="k-feedback pending"><h2 data-feedback-heading tabindex="-1">'+(finished?"Self-review complete":"Compare your reasoning")+'</h2><div class="k-review-grid">'+student+model+'</div>'+
  (q.levelsNote?'<p class="k-level-guidance">'+esc(q.levelsNote)+'</p>':'')+
  (q.comparison?'<p>Use the criteria to assess how well your answer applies biology and evidence across the whole response.</p>':'')+
  '<fieldset class="k-review-criteria"><legend>Key points to look for</legend><p>Check where your answer explains each point. Choose Needs work where a link is missing.</p>'+criteria+'</fieldset>'+
  '<label class="k-field" for="k-revised">Improve your answer</label><textarea id="k-revised" rows="5"'+(finished?' readonly':'')+'>'+esc(review.revised==null?a.text||"":review.revised)+'</textarea>'+
  (finished?'<p role="status">Self-reviewed'+(session.outcomes[session.index]==="review-needs-work"?' · further practice useful':'')+'</p>':'')+'</div>';
}
function focusFeedback(){
 var heading=main.querySelector("[data-feedback-heading]");if(heading)heading.focus();
}
function canCorrect(q,a){
 return ["match","sort","order"].includes(q.type)&&session.outcomes&&session.outcomes[session.index]==="incorrect"&&session.lastResult===false&&!session.wasSkipped&&!a.correction;
}
function correctionRows(q,a){
 if(q.type==="sort")return q.rows.map(function(row,i){return +a.sort[i]===row[1];});
 if(q.type==="match")return q.pairs.map(function(_,i){return +a.match[i]===i;});
 return a.order.map(function(idx,pos){return idx===pos;});
}
function correctOrReveal(reveal){
 var q=current(),a=currentAnswer();
 if(!q||session.phase!=="feedback"||!canCorrect(q,a))return;
 delete session.outcomes[session.index]; // The initial incorrect submission remains in objective history.
 if(reveal){
  session.wasSkipped=true;record(q,"revealed");drawQuestion();focusFeedback();
 }else{
  a.correction=correctionRows(q,a);
  session.answers[q.id]=a;session.phase="ask";save();drawQuestion();
  var pending=main.querySelector("[data-correction-heading]");if(pending)pending.focus();
 }
}
function misconceptionFeedback(q,a){
 if(a.priorResponse)return "";
 var messages=[];
 if(q.optionFeedback&&a.selected)messages=a.selected.map(function(i){return q.optionFeedback[i];}).filter(Boolean);
 if(q.numberFeedback&&a.text){
  var value=Number(String(a.text).trim().replace(/,/g,"").replace(/^×\s*/,""));
  var error=q.numberFeedback.find(function(entry){return Math.abs(value-entry[0])<=(entry[2]??1e-6);});
  if(error)messages.push(error[1]);
 }
 return messages.length?'<div class="k-misconception"><strong>About your answer</strong>'+
  messages.map(function(message){return '<p>'+esc(message)+'</p>';}).join("")+'</div>':"";
}
function correctionCue(q,rows){
 if(q.correctionHint)return q.correctionHint;
 if(q.type==="order")return "Recheck sequence positions "+rows.flatMap(function(ok,i){return ok?[]:[i+1];}).join(", ")+
  ". Think about which events depend on earlier ones.";
 if(q.type==="match")return "Use the term in each marked row to reconsider the relationship.";
 return "Use the category definition to check each marked row.";
}
function drawQuestion(){
 if(!session||!isActive())return;
 initialiseOutcomes(session);
 stopHintTimer();
 adaptQuickMixMiddle();
 adaptQuickMixEnd();
 visible=true;var q=current(),a=currentAnswer();
 // An earlier selection may refer to different option wording. Keep its recorded outcome.
 if(q.assessmentRevision&&a.assessmentRevision!==q.assessmentRevision){
  a={assessmentRevision:q.assessmentRevision,priorResponse:session.phase==="feedback"};
  session.answers[q.id]=a;
  if(session.hintExcluded)delete session.hintExcluded[q.id];
  save();
 }
 if(session.phase==="ask")ensureHintClock(q);
 var sub=session.scope==="methods"?"Choose and apply a method":session.skillId?skills.get(session.skillId).name:title(q.unit),num=session.index+1,max=session.skillId?10:session.queue.length;
 var prog=(100*(session.index/max)).toFixed(1),showing=session.phase==="feedback";
 var used=session.hintsUsed&&session.hintsUsed[q.id]||0,availableHints=hintsFor(q);
 var h='<div class="k-wrap k-question-view"><p class="crumb"><a href="#'+(session.skillId?'skills/'+q.unit:'challenge/'+q.unit)+'">← Leave this set</a></p>'+skillReturnLink(session.returnTo)+'<div class="k-question-meta"><span>'+esc(sub)+'</span><span>'+num+' of '+max+'</span></div><div class="progress-track" role="progressbar" aria-label="Questions completed" aria-valuemin="0" aria-valuemax="'+max+'" aria-valuenow="'+session.index+'"><div style="width:'+prog+'%"></div></div>';
 if(session.point){var point=ladders.get(session.point);h+='<p class="k-sequence-note"><strong>'+esc(point.statement)+'</strong><br>'+esc(q.stage==="foundation"?"1 · Activate prior knowledge":q.stage==="diagnostic"?"2 · Check a misconception":q.stage==="challenge"?"4 · Transfer and challenge":"3 · Use the idea")+'</p>';}
 h+='<div class="k-question-paper"><div class="k-question-tags"><span class="k-type">'+icon(iconFor(q))+esc(labelType(q))+'</span><span class="k-level '+esc(q.level)+'">'+esc(q.level==="warmup"?"Warm-up":q.level==="core"?"Core knowledge":q.level==="apply"?"Application":"Challenge")+'</span>'+(q.marks?'<span class="k-level stretch">'+q.marks+'-mark response</span>':'')+'</div>'+questionPrompt(q);
 if(q.type==="number"||q.calculator)h+='<div class="k-calculator-note">'+icon("calc")+'<span>Calculator may help</span></div>';
 if(q.figure&&!showing)h+=figure(q.figure);
 if(q.graph&&skills)h+=skills.graphHTML(q.graph);
 if(q.evidenceTable)h+=evidenceTable(q.evidenceTable,showing);
 if(isQuickCheck(q))h+='<p class="k-quick-label"><strong>Quick check:</strong> Apply the same idea independently.</p>';
 if(!showing){if(a.correction)h+='<h2 class="k-correction-title" data-correction-heading tabindex="-1">Review and try again</h2>';
  h+=inputForm(q,a);
  if(used)h+='<div class="k-hint-box" role="note"><strong>Hint '+used+' of '+availableHints.length+'</strong>'+availableHints.slice(0,used).map(function(t){return '<p>'+esc(t)+'</p>';}).join('')+'</div>';
 }
 else if(q.type==="written"&&!session.wasSkipped)h+=writtenReview(q,a);
 else if(canCorrect(q,a)){
  var rows=correctionRows(q,a),reviewCount=rows.filter(function(ok){return !ok;}).length;
  h+='<div class="k-feedback incorrect"><h2 class="k-feedback-head" data-feedback-heading tabindex="-1">Review and improve</h2><p>'+reviewCount+' '+(q.type==="order"?(reviewCount===1?"position needs":"positions need"):(reviewCount===1?"row needs":"rows need"))+' another look. Your choices are saved.</p><p>'+esc(correctionCue(q,rows))+'</p></div>';
 }
 else{
  var correct=session.lastResult===true,subjective=!session.wasSkipped&&(session.lastResult===null||q.type==="written");
  var helped=!!used,unknown=!!session.wasSkipped,quick=isQuickCheck(q);
  var neutral=unknown||subjective||(correct&&helped);
  var header=unknown?"Explanation revealed":subjective?"Check your explanation":correct&&session.outcomes[session.index]==="corrected"?"Correct after a retry":correct&&helped?"Correct with a hint":correct&&quick?"Quick check passed":correct?"Correct":"Not yet";
  h+='<div class="k-feedback '+(neutral?"pending":correct?"correct":"incorrect")+'"><h2 class="k-feedback-head" data-feedback-heading tabindex="-1">'+icon(neutral?"book":correct?"check":"alert")+header+'</h2>';
  if(q.figure)h+=figure(q.figure,true);
  h+='<div'+(q.unit==="f170"?' class="reading-copy"':'')+'>'+
   '<p class="k-model-title">Expected answer</p><div class="k-model">'+answerKey(q)+'</div><p><strong>'+(correct&&!helped?'Why it works':unknown?'Explanation':'Quick reteach')+':</strong> '+esc(q.explain)+'</p></div>';
  if(a.priorResponse)h+='<p>Your saved result is from an earlier version of this question.</p>';
  if(!correct&&!unknown&&a.selected&&q.options)h+='<p><strong>Your selection</strong> '+a.selected.map(function(i){return esc(q.options[i]);}).join('; ')+'</p>';
  if(q.type==='best'&&!correct&&!unknown){var partial=session.answers[q.id]||{};if(partial.choice===q.correct&&partial.reason!==q.reasonCorrect)h+='<p class="k-diagnostic-note">You chose the correct explanation; now focus on why it is correct.</p>';}
  if((!correct||helped)&&session.lastPlannedCheck)h+='<p class="k-quick-note">A related quick check is next, so you can try the idea again independently.</p>';
  if(q.levelsNote)h+='<p class="k-level-guidance">'+esc(q.levelsNote)+'</p>';
  if(!correct&&!unknown){
   var diagnosis=misconceptionFeedback(q,a);
   if(diagnosis)h+=diagnosis;
   else if(q.misconception)h+='<div class="k-misconception"><strong>Watch out</strong><p>'+esc(q.misconception)+'</p></div>';
  }
  h+='</div>';
 }
 if(showing&&(session.lastResult!==true||used||session.wasSkipped)&&
    (q.type!=="written"||session.outcomes[session.index])){
  var catchup=window.KeystoneHumanCatchup?.reteachFor(q,a);
  if(catchup)h+='<p class="k-catchup-after"><a href="#'+esc(catchup.href)+'" data-reteach-to="'+esc(catchup.route)+'">'+esc(catchup.label)+'</a></p>';
 }
 if(!showing)h+='<div class="k-foot-actions"><button class="button primary k-cta" type="button" data-k-action="'+(q.type==="written"?"reveal":"check")+'">'+(q.type==="written"?"Compare with key points":"Check answer")+' →</button>'+(used<availableHints.length?'<button class="button secondary k-hint-button" type="button" data-k-action="hint"'+(hintRemaining()>0?' hidden':'')+'>'+(used?'More help':'Hint')+'</button>':'')+'<button class="button quiet" type="button" data-k-action="skip">I don’t know · show me</button></div>';
 else if(canCorrect(q,a))h+='<div class="k-foot-actions"><button class="button primary" data-k-action="correct" type="button">Try again</button><button class="button quiet" data-k-action="show-correction" type="button">Show answer</button></div>';
 else if(!session.wasSkipped&&q.type==="written"&&!session.outcomes[session.index])h+='<div class="k-foot-actions"><button class="button primary" data-k-action="finish-review" type="button">Finish review</button></div>';
 else if(!session.wasSkipped&&q.type==="short"&&session.lastResult===null)h+='<div class="k-foot-actions"><button class="button primary" data-k-action="self-good" type="button">I included the key ideas</button><button class="button secondary" data-k-action="self-weak" type="button">I need more practice</button></div>';
 else h+='<div class="k-foot-actions"><button class="button primary k-cta" data-k-action="next" type="button">'+(session.lastPlannedCheck?'Try a quick check':'Next question')+' →</button></div>';
 h+='</div><p class="k-question-footer">Topic '+q.area+' · '+esc(areaName(q.unit,q.area))+(q.knowledgeOnly?' · Knowledge practice only':q.samAligned?' · Skills reflected in OCR sample material':' · Specification coverage')+' · Original question</p></div>';
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
 if(q.type==="order")return {ready:usableOrder(q,a.order),correct:usableOrder(q,a.order)&&a.order.every(function(v,i){return v===i;})};
 if(q.type==="sort"){if(!a.sort||a.sort.length!==q.rows.length||a.sort.some(function(v){return v===""||v==null;}))return {ready:false,msg:"Choose a group for each statement."};return {ready:true,correct:a.sort.every(function(v,i){return +v===q.rows[i][1];})};}
 if(q.type==="match"){if(!a.match||a.match.length!==q.pairs.length||a.match.some(function(v){return v===""||v==null;}))return {ready:false,msg:"Choose a match for each row."};return {ready:true,correct:a.match.every(function(v,i){return +v===i;})};}
 if(q.type==="number"){var val=String(a.text||"").trim().replace(/,/g,"").replace(/^×\s*/,"");if(!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?$/i.test(val))return {ready:false,msg:"Enter a number only. The expected unit is shown above the box."};return {ready:true,correct:Math.abs(Number(val)-q.correct)<=(q.tolerance||1e-9)};}
 if(q.type==="short"){if(!String(a.text||"").trim())return {ready:false,msg:"Enter an answer first, or choose Not sure."};return {ready:true,correct:q.accepted.some(function(x){return norm(x)===norm(a.text);})};}
 return {ready:!!String(a.text||"").trim(),correct:null,msg:"Write an explanation first, or choose I don’t know."};
}
function planQuickCheck(q){
 if(session&&(session.skillId||session.point||session.scope==="methods"))return null; // Keep authored point sequences in their intended order.
 if(!session||isQuickCheck(q)||(session.quickChecksPlanned||0)>=2)return null;
 var seen=session.first||{};
 var rank={warmup:0,core:1,apply:2,stretch:3};
 var candidates=all.filter(function(x){
  if(q.point&&x.point!==q.point&&ladders.get(q.point).core.indexOf(x.id)<0)return false;
  var sameIdea=q.independentFollowups?q.independentFollowups.includes(x.id):x.section===q.section;
  return x.id!==q.id&&x.unit===q.unit&&sameIdea&&
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
  return ((a.family&&a.family===q.family)?-10:0)+rank(a)-((b.family&&b.family===q.family)?-10:0)-rank(b);
 });
 var choice=candidates[0],at=session.queue.indexOf(choice.id);rememberVersions([choice.id]);
 if(at>=0&&at<=session.index)return null;
 if(at>session.index)session.queue.splice(at,1);
 session.queue.splice(session.index+1,0,choice.id);
 session.quickCheckIds[choice.id]=true;
 session.quickCheckLinks[choice.id]=q.id;
 session.quickChecksPlanned=(session.quickChecksPlanned||0)+1;
 session.lastPlannedCheck=choice.id;
 return choice.id;
}
function record(q,outcome){
 initialiseOutcomes(session);
 if(session.outcomes[session.index])return;
 var helped=!!session.hintsUsed[q.id],quick=isQuickCheck(q);
 var previous=Object.prototype.hasOwnProperty.call(session.first,q.id);
 if(outcome==="correct")outcome=!previous||quick?(helped?"supported":"independent"):"corrected";
 var independent=outcome==="independent",got=independent||outcome==="supported"||outcome==="corrected";
 var objective=got||outcome==="incorrect";
 session.outcomes[session.index]=outcome;
 var progressId=session.skillId?"skill:"+session.skillId:q.id,p=progressEntry(progressId);
 p.seen++;
 if(objective){
  p.checked++;p.lastCorrect=got;
  if(got)p.good++;else p.wrong++;
 }
 var key={independent:"independent",supported:"guided",corrected:"corrected",reviewed:"selfReviewed","review-needs-work":"selfReviewed",revealed:"revealed"}[outcome];
 if(key)p[key]=(p[key]||0)+1;
 p.needsPractice=outcome==="review-needs-work"||outcome==="revealed"||outcome==="incorrect"||outcome==="supported";
 p.last=Date.now();progress[progressId]=p;saveProgress();
 if(!previous){
  session.first[q.id]=independent;
  if(objective)session.objectiveFirst[q.id]=outcome;
  if(independent)session.correctFirst++;
  if(outcome==="supported")session.guidedFirst++;
 }
 if(outcome==="reviewed"||outcome==="review-needs-work")session.selfReviewed=(session.selfReviewed||0)+1;
 if(quick){session.quickChecksSeen++;if(independent)session.quickChecksPassed++;}
 session.lastPlannedCheck=null;
 if(session.skillId){
  if(independent){session.skillStreak++;if(session.skillStreak>=2){session.skillLevel=Math.min(4,session.skillLevel+1);session.skillStreak=0;}}
  else if(outcome==="incorrect"||outcome==="revealed"||outcome==="supported"||outcome==="corrected"){
   session.skillStreak=0;if(!got)session.skillLevel=Math.max(1,session.skillLevel-1);
  }
  save();return;
 }
 var needsHelp=p.needsPractice&&outcome!=="review-needs-work"&&!(outcome==="incorrect"&&canCorrect(q,currentAnswer()));
 var checkId=needsHelp?planQuickCheck(q):null;
 if(needsHelp&&(!got||!checkId)&&(session.retries[q.id]||0)<1){session.queue.push(q.id);session.retries[q.id]=(session.retries[q.id]||0)+1;}
 save();
}
function readForm(){
 var q=current();if(!q)return;
 var a=session.answers[q.id]||{};var input=null;
 if(q.type==="best"){var chosen=main.querySelector('input[name="kbest"]:checked'),reason=main.querySelector('input[name="kreason"]:checked');a.choice=chosen?Number(chosen.value):undefined;a.reason=reason?Number(reason.value):undefined;}
 else if(q.type==="single"||q.type==="diagram"||q.type==="multi")a.selected=Array.from(main.querySelectorAll('input[name="kchoice"]:checked')).map(function(x){return Number(x.value);});
 else if(q.type==="match")a.match=Array.from(main.querySelectorAll("[data-match]")).map(function(x){return x.value;});
 else if(q.type==="sort")a.sort=q.rows.map(function(_,i){var el=main.querySelector('input[name="ksort-'+i+'"]:checked');return el?el.value:"";});
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
 if(skip)record(q,"revealed");
 else if(session.lastResult!==null)record(q,session.lastResult?"correct":"incorrect");
 save();drawQuestion();focusFeedback();
}
function gradeSelf(got){
 var q=current();if(!q||q.type!=="short"||session.phase!=="feedback"||session.wasSkipped||session.lastResult!==null)return;
 record(q,got?"reviewed":"review-needs-work");next();
}
function finishWrittenReview(){
 var q=current(),a=currentAnswer();
 if(!q||q.type!=="written"||session.phase!=="feedback"||session.wasSkipped||session.outcomes[session.index])return;
 var criteria=a.review&&a.review.criteria||{};
 var needsWork=q.markPoints.some(function(_,i){return criteria[i]!=="met";});
 record(q,needsWork?"review-needs-work":"reviewed");
 drawQuestion();focusFeedback();
}
function saveReviewField(target){
 var q=current();if(!q||q.type!=="written"||session.phase!=="feedback"||session.wasSkipped||session.outcomes[session.index])return;
 var a=currentAnswer();a.review=a.review||{criteria:{}};
 if(target.matches("#k-revised"))a.review.revised=target.value;
 else a.review.criteria[target.dataset.reviewCriterion]=target.value;
 session.answers[q.id]=a;save();
}
function next(){
 if(!session||session.phase!=="feedback"||session.lastResult===null&&!session.outcomes[session.index])return;
 var previous=current();if(previous&&session.answers)delete session.answers[previous.id]; // Do not retain free-text answers beyond feedback.
 session.index++;session.phase="ask";session.lastResult=undefined;session.wasSkipped=false;session.lastPlannedCheck=null;save();
 if(session.skillId&&session.index<10&&session.index>=session.queue.length){addSkillQuestion();save();}
 if(session.index>=session.queue.length)finish();else drawQuestion();
}
function outcomeSummary(old){
 var outcomes=Object.values(old.outcomes||{}),total=Object.keys(old.objectiveFirst||{}).length;
 var count=function(type){return outcomes.filter(function(result){return result===type;}).length;};
 var review=total?old.correctFirst+' of '+total+' objectively checked questions answered independently on the first submission.':'No objective first submissions were recorded in this set.';
 var stats=[[(old.guidedFirst||0),"answered with help"],[count("corrected"),"correct after a retry"],[(old.selfReviewed||0),"self-reviewed"],[count("revealed"),"explanations revealed"],[(old.quickChecksPassed||0)+"/"+(old.quickChecksSeen||0),"quick checks without help"]];
 if(old.needsReview)stats.push([old.needsReview,"to revisit from this set"]);
 return '<p class="lead">'+review+'</p><dl class="k-mini-stats k-outcome-stats">'+stats.map(function(stat){return '<div><dt>'+stat[1]+'</dt><dd>'+stat[0]+'</dd></div>';}).join("")+'</dl>';
}
function finish(){
 stopHintTimer();if(!session)return;
 var old=session;clearSession(old);session=null;visible=false;
 old.needsReview=old.skillId?0:Object.keys(old.first).filter(function(id){return needsPractice(progress[id]);}).length;
 var result={};
 ["correctFirst","objectiveFirst","outcomes","guidedFirst","selfReviewed","quickChecksPassed","quickChecksSeen","unit","skillId","point","returnTo","route","maxSkillLevel","needsReview"].forEach(function(key){result[key]=old[key];});
 try{localStorage.setItem(CK,JSON.stringify(result));}catch(_){}
 if(window.KeystoneHumanApp)window.KeystoneHumanApp.replaceRoute("challenge/review");
 showCompletion(result);
}
function showCompletion(old){
 var summary=outcomeSummary(old);
 if(old.skillId){
  var sk=skills.get(old.skillId);
  show('<div class="k-wrap k-done"><h1>Skills set complete</h1>'+summary+'<p>Highest practice step: '+old.maxSkillLevel+' of 4.</p><div class="actions"><button class="button primary" type="button" data-start-skill="'+sk.id+'">Practise this skill again</button><a class="button secondary" href="#skills/'+sk.unit+'">Choose another skill</a><a class="button secondary" href="#challenge/'+sk.unit+'">Apply to topic questions</a>'+skillReturnLink(old.returnTo)+'</div></div>');return;
 }
 if(old.point){var p=ladders.get(old.point);show('<div class="k-wrap k-done"><h1>Sequence complete</h1><p>'+esc(p.statement)+'</p>'+summary+'<div class="actions"><a class="button primary" href="#challenge/'+old.unit+'/build">Choose another idea</a><button class="button secondary" type="button" data-repeat-point="'+p.id+'">Repeat this idea</button><a class="button secondary" href="#catchup/'+old.unit+'/'+p.section+'">Revisit the explanation</a></div></div>');return;}
 var h='<div class="k-wrap k-done"><p class="crumb"><a href="#challenge/'+old.unit+'">← Unit overview</a></p><div class="k-done-icon">'+icon("check")+'</div><h1>Practice complete</h1>'+summary+'<div class="actions">'+
 (old.needsReview?'<a class="button primary" href="#challenge/'+old.unit+'/weak">Practise questions to revisit</a>':'')+
 '<a class="button '+(old.needsReview?'secondary':'primary')+'" href="#challenge/'+old.unit+'">Choose another set</a>'+skillReturnLink(old.returnTo)+'</div></div>';show(h);
}
function route(r,renderer){
 render=renderer;lastRoute=r;
 if(r==="skills"||r.startsWith("skills/"))return skillRoute(r);
 if(r==="challenge")return landing();
 if(r==="knowledge")return knowledgeLanding();
 if(r==="challenge/review"){
  var completed=null;try{completed=JSON.parse(localStorage.getItem(CK)||"null");}catch(_){}
  if(completed){visible=false;lastRoute=completed.route;return showCompletion(completed);}
  return landing();
 }
 var m=/^challenge\/(f17[0-7])(?:\/([a-z0-9.-]+))?(?:\?from=(catchup\/f17[0-7]\/[a-z0-9.]+(?:\/\d+)?))?$/.exec(r);
 if(!m)return landing();
 var unit=m[1],scope=m[2]||null,origin=m[3];
 if(!scope){visible=false;return intro(unit);}
 if(origin){
  var source=origin.split("/");
  var topicScope=(source[2]===scope||window.KeystoneHumanCatchup?.topicPracticeScope(unit,source[2])===scope)&&/^(?:a[1-5]|\d+(?:\.\d+)*)$/.test(scope);
  var buildScope=window.KeystoneHumanCatchup?.practiceScope(unit,source[2])===scope;
  var reproductionTransfer=unit==="f175"&&source[2]==="a1"&&scope==="f175-transport";
  if(source[1]!==unit||(!topicScope&&!buildScope&&!reproductionTransfer)||!filter(unit,scope).length)return intro(unit);
 }
 var key=scope==="methods"?methodKey:origin?topicKey(unit,scope):SK;
 var old=sessionKey(session)===key?session:null;
 old=old||restore(key);
 if(origin&&!old)old=restore();
 if(old&&old.unit===unit&&old.scope===scope&&(origin||old.route===r||old.returnTo&&!old.topicContext&&!old.skillId)){
  // An unstarted legacy Quick Mix may still open on a random hard question.
  if(scope==="all"&&!old.quickMixVersion&&old.index===0&&old.phase==="ask"&&!Object.keys(old.first||{}).length)return makeSession(unit,scope,r);
  session=old;
  if(origin){session.returnTo=origin;session.route=r;save();}
  return drawQuestion();
 }
 return makeSession(unit,scope,r,origin);
}
main.addEventListener("change",function(e){
 if(session&&visible&&e.target.matches("[data-review-criterion]")){saveReviewField(e.target);return;}
 noteAnswerActivity();
 if(!session||session.phase!=="ask"||!visible)return;
 if(e.target.matches('input[name="kbest"],input[name="kreason"]')){readForm();}
 else if(e.target.matches('input[name="kchoice"]')){
  var q=current();if(!q)return;
  var a=session.answers[q.id]||{};
  if(q.type==="multi")a.selected=Array.from(main.querySelectorAll('input[name="kchoice"]:checked')).map(function(x){return Number(x.value);});
  else a.selected=[Number(e.target.value)];
  session.answers[q.id]=a;save();
  main.querySelectorAll(".k-option").forEach(function(l){l.classList.toggle("selected",!!l.querySelector("input").checked);});
 }else if(e.target.matches("[data-match], [data-sort-row]")){readForm();}
});
main.addEventListener("input",function(e){
 if(session&&visible&&e.target.matches("#k-revised")){saveReviewField(e.target);return;}
 noteAnswerActivity();
 if(!session||session.phase!=="ask"||!visible)return;
 if(e.target.matches("#k-number, #k-text, #k-written")){var q=current(),a=session.answers[q.id]||{};a.text=e.target.value;session.answers[q.id]=a;save();}
});
main.addEventListener("click",function(e){
 var help=e.target.closest("[data-k-action]");if(!help||help.dataset.kAction!=="hint")noteAnswerActivity();
 var start=e.target.closest("[data-start-skill]");
 var repeatPoint=e.target.closest("[data-repeat-point]");if(repeatPoint&&ladders){var point=ladders.get(repeatPoint.getAttribute("data-repeat-point"));if(point){var again="challenge/"+point.unit+"/"+point.id;if(window.KeystoneHumanApp)window.KeystoneHumanApp.replaceRoute(again);return makeSession(point.unit,point.id,again);}}
 if(start&&skills){var sk=skills.get(start.getAttribute("data-start-skill"));var path=parseSkillRoute(lastRoute);if(sk&&path&&path.skillId===sk.id&&path.unit===sk.unit){if(window.KeystoneHumanApp)window.KeystoneHumanApp.replaceRoute(lastRoute);return startSkill(sk,lastRoute);}}
 if(!session||!visible)return;
 var reteach=e.target.closest("[data-reteach-to]");
 if(reteach){session.reteachTo=reteach.dataset.reteachTo;save();}
 var move=e.target.closest("[data-move]");
 if(move){var q=current();if(!q||q.type!=="order")return;
  var a=session.answers[q.id],i=Number(move.dataset.pos),j=i+(move.dataset.move==="up"?-1:1);
  if(!a||!a.order||j<0||j>=a.order.length)return;
  var t=a.order[i];a.order[i]=a.order[j];a.order[j]=t;save();drawQuestion();
  var controls=main.querySelectorAll('[data-pos="'+j+'"]:not(:disabled)');
  if(controls.length)(Array.from(controls).find(function(el){return el.dataset.move===move.dataset.move;})||controls[0]).focus();
  return;
 }
 var btn=e.target.closest("[data-k-action]");if(!btn)return;
 if(btn.dataset.kAction==="hint")showNextHint();
 if(btn.dataset.kAction==="check")check(false);
 if(btn.dataset.kAction==="reveal")check(false);
 if(btn.dataset.kAction==="skip")check(true);
 if(btn.dataset.kAction==="correct")correctOrReveal(false);
 if(btn.dataset.kAction==="show-correction")correctOrReveal(true);
 if(btn.dataset.kAction==="next")next();
 if(btn.dataset.kAction==="finish-review")finishWrittenReview();
 if(btn.dataset.kAction==="self-good")gradeSelf(true);
 if(btn.dataset.kAction==="self-weak")gradeSelf(false);
});
main.addEventListener("keydown",function(e){if(e.target&&e.target.closest&&e.target.closest('[data-k-action="hint"]'))return;if(e.key!=="Tab"&&e.key!=="Shift")noteAnswerActivity();});
window.addEventListener("beforeunload",function(e){if(isActive()){e.preventDefault();e.returnValue="";}});
window.KeystoneHumanChallenge={route:route,isActive:isActive,discard:discard,pause:pause,stats:unitStats,questionCount:all.length,types:Array.from(new Set(all.map(function(q){return q.type;}))),icon:icon,localSessionKeys:localSessionKeys,hasResume:function(){return !!savedSession();},resumeRoute:function(origin){var old=savedSession(origin);return old?old.route:null;}};
})();

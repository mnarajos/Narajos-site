import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const read=path=>readFileSync("public/"+path,"utf8");
const data=new Map(),events={},mainEvents={};
const main={innerHTML:"",focus(){},addEventListener(name,fn){mainEvents[name]=fn;},querySelector(sel){return null;},querySelectorAll(){return [];}};
const elements={};
function elem(id){if(id==="main")return main;return elements[id]||(elements[id]={hidden:id==="leave-dialog",value:"",readOnly:false,focus(){},blur(){},addEventListener(){},querySelector(){return null;}});}
const document={getElementById:elem,querySelectorAll(){return[];},addEventListener(name,fn){events["doc:"+name]=fn;},createElement(){return {className:"",setAttribute(){},textContent:""};}};
const location={hash:"#home",assign(x){this.hash=x;}};
const window={addEventListener(name,fn){events[name]=fn;},scrollTo(){}};
const store={get length(){return data.size;},key(i){return [...data.keys()][i]||null;},getItem(k){return data.get(k)||null;},setItem(k,v){data.set(k,String(v));},removeItem(k){data.delete(k);}};
const c=vm.createContext({window,document,location,localStorage:store,Date,Math,console,setTimeout:fn=>fn()});
function load(p){vm.runInContext(read(p),c,{filename:p});}
load("assets/science-answer.js");
load("assets/spaced-review.js");
load("human-biology/content-f170.js");
load("human-biology/challenge-bank.js");
load("human-biology/content-knowledge.js");
load("human-biology/challenge-extension.js");
load("human-biology/question-families.js");
load("human-biology/progressions.js");
load("human-biology/challenge.js");
load("human-biology/companion.js");
const db=window.KeystoneHumanChallenges,app=window.KeystoneHumanChallenge,companion=window.KeystoneHumanCatchup;
assert(companion,"Human Biology companion not available");
assert.equal(companion.count().units,8,"Both examined and six knowledge-only units need catch-up entry points");
for(const u of ["f170","f171","f172","f173","f174","f175","f176","f177"]){
 let html="";companion.route("catchup/"+u,h=>{html=h;});
 assert(html.includes("Catch up")||html.includes("Catch-up"),"Missing unit catch-up page "+u);
}
let help="";
companion.route("catchup/f170/1.1.1",h=>{help=h;});
assert(help.includes("Human cells and specialisation")&&help.includes("Key idea 1"),"F170 stepwise catch-up missing");
companion.route("catchup/f175/a1",h=>{help=h;});
assert(help.includes("oviduct")&&help.includes("Fallopian tube"),"F175 terminology catch-up missing");
assert.equal(companion.linkFor({unit:"f170",section:"1.1.1",area:1}),"catchup/f170/1.1.1","Concept-specific reteach link missing");
assert.equal(companion.linkFor({unit:"f175",section:"1.1",area:1}),"catchup/f175/a1","NEA unit knowledge catch-up route missing");
assert.equal(companion.linkFor({unit:"f171",section:"3.2.1",area:3}),"catchup/f171/3.2.1","Immune dysfunction reteach route missing");
assert.equal(companion.linkFor({unit:"f171",section:"3.2.2",area:3}),"catchup/f171/3.2.2","Vaccine types reteach route missing");
companion.route("catchup/f171/3.2.2",h=>{help=h;});
assert(help.includes("Vaccine types")&&help.includes("Key idea 1"),"Vaccine type catch-up lesson missing");
companion.route("catchup/f171",h=>{help=h;});
assert(help.includes("Immune dysfunction")&&help.includes("Vaccine types"),"Missing F171 subsections from catch-up navigation");

// Every generated topic practice link must open a queue at the requested scope.
for(const unit of ["f170","f171","f172","f173","f174","f175","f176","f177"]){
 companion.route("catchup/"+unit,h=>{help=h;});
 const topics=[...new Set([...help.matchAll(/href="#(catchup\/f17[0-7]\/[a-z0-9.]+)"/g)].map(m=>m[1]))];
 assert(topics.length>=3,unit);
 for(const topic of topics){
  companion.route(topic,h=>{help=h;});
  const href=help.match(/data-hb-practice href="#(challenge\/f17[0-7]\/[a-z0-9.-]+\?from=catchup[^"]+)"/)?.[1];
  assert(href,"No practice route for "+topic);
  const scope=href.split("?")[0].split("/")[2];
  assert.equal(scope,companion.topicPracticeScope(unit,topic.split("/")[2]),topic);
  app.route(href,h=>{main.innerHTML=h;});
  const state=JSON.parse(data.get("narajos-human-challenge-v2-session-topic-"+unit+"/"+scope));
  assert.equal(state.returnTo,topic);
  assert(main.innerHTML.includes('href="#'+topic+'"')&&main.innerHTML.includes("Return to the catch-up lesson"));
  assert(state.queue.every(id=>{
   const q=db.questions.find(q=>q.id===id);
   return q&&q.unit===unit&&(scope.startsWith("a")?q.area===+scope.slice(1):q.id===scope||q.section===scope);
  }),topic);
  app.pause();app.route(href,h=>{main.innerHTML=h;});
  assert.deepEqual(JSON.parse(data.get("narajos-human-challenge-v2-session-topic-"+unit+"/"+scope)).queue,state.queue);
  app.discard();
 }
}
assert.equal(db.questions.length,588);
assert.equal(db.questions.filter(q=>q.unit==="f170").length,267);
assert.equal(db.questions.filter(q=>q.unit==="f171").length,237);
for(const u of ["f172","f173","f174","f175","f176","f177"])assert.equal(db.questions.filter(q=>q.unit===u).length,u==="f175"?15:["f172","f173","f176","f177"].includes(u)?14:13,u+" knowledge bank missing");
assert.deepEqual([...new Set(db.questions.map(q=>q.type))].sort(),["best","diagram","match","multi","number","order","short","single","sort","written"].sort());
const ids=new Set();
const validUnits=new Set(["f170","f171","f172","f173","f174","f175","f176","f177"]);
const map=window.KeystoneHumanData.areas.flatMap(a=>a.sections.map(s=>s.id));
assert(db.questions.some(q=>q.unit==="f170"&&q.section==="1.2.1"),"F170 tissue hierarchy gap remains");
assert(db.questions.some(q=>q.unit==="f170"&&q.section==="2.1.1"),"F170 physiology gap remains");
const f171Sections=["1.1","1.2.1","1.2.2","1.3.1","1.3.2","2.1","2.2","2.3","3.1","3.2.1","3.2.2","4.1","4.2.1","4.2.2","5.1.1","5.1.2","5.2","5.3"];
const validF171=new Set(f171Sections);
for(const q of db.questions.filter(q=>q.unit==="f171")){
 assert(validF171.has(q.section),"F171 question has invalid specification section: "+q.id+" → "+q.section);
 assert(q.section.startsWith(q.area+"."),"F171 topic area and section disagree: "+q.id);
}
for(const section of f171Sections){
 assert(db.questions.some(q=>q.unit==="f171"&&q.section===section),"No varied-format F171 question mapped to section "+section);
}
for(const section of map){
 assert(db.questions.some(q=>q.unit==="f170"&&q.section===section),"No varied-format F170 question mapped to section "+section);
}

for(const section of ["3.1","3.2.1","3.2.2"]){
 assert(db.questions.filter(q=>q.unit==="f171"&&q.section===section).length>=3,"F171 immunology topic needs several question checks: "+section);
}
for(const q of db.questions){
 assert(!ids.has(q.id),"Duplicate question ID: "+q.id);ids.add(q.id);
 assert(validUnits.has(q.unit),"Missing/incorrect unit: "+q.id);
 assert(q.area>0&&q.area<=(q.unit==="f170"?4:5),"Incorrect topic area: "+q.id);
 if(q.unit==="f170")assert(map.includes(q.section),"Question not mapped to current F170 section: "+q.id);
 assert(q.model&&q.explain&&q.misconception,"Missing explanatory feedback: "+q.id);
 if(q.type==="number")assert(Number.isFinite(q.correct)&&q.answerUnit!==undefined,"Missing numeric answer and units: "+q.id);
 if(q.type==="best")assert(q.options.length===4&&q.reasons.length===4&&q.correct>=0&&q.correct<q.options.length&&q.reasonCorrect>=0&&q.reasonCorrect<q.reasons.length,"Two-stage reasoning needs four options in both steps: "+q.id);
 if(q.warmup)assert(q.level==="warmup"&&q.type==="single","Warm-up should be a low-load single-answer question");
 if(q.optionFeedback){
  assert.equal(q.optionFeedback.length,q.options.length,q.id);
  const correct=[].concat(q.correct);
  for(const [index,feedback] of q.optionFeedback.entries())assert.equal(Boolean(feedback),!correct.includes(index),q.id+" feedback for option "+index);
 }
 if(q.numberFeedback){
  assert.equal(q.type,"number",q.id);
  for(const [value,message] of q.numberFeedback)assert(Number.isFinite(value)&&value!==q.correct&&message,q.id);
 }
 if(q.comparison){
  assert(q.caseTitle&&q.comparison.order.includes("model")&&q.comparison.order.includes("partial"),q.id);
  assert(q.comparison.notes.length&&q.comparison.comparison,q.id);
  for(const note of q.comparison.notes)assert(q.model.includes(note[2]),q.id+" annotation should quote the model");
 }
 if(q.type==="multi")assert(Array.isArray(q.correct)&&q.correct.length>=2,"Invalid multi-answer: "+q.id);
 if(q.type==="match")assert(q.pairs.length>=2,"Too few match pairs: "+q.id);
 if(q.type==="sort")assert(q.groups.length>=2&&q.rows.length>=4&&q.rows.every(r=>Number.isInteger(r[1])&&r[1]>=0&&r[1]<q.groups.length),"Invalid sort: "+q.id);
 if(q.type==="order")assert(q.items.length>=3,"Too short sequence: "+q.id);
 if(q.type==="written")assert(q.markPoints.length>=2,"Unscaffolded written response: "+q.id);
 if(q.marks)assert(q.type==="written"&&(q.marks===6||q.marks===9),"Unexpected extended-answer mark count: "+q.id);
}
assert.equal(db.questions.filter(q=>q.warmup).length,86,"Warm-up coverage");
assert.equal(db.questions.filter(q=>q.type==="best").length,7,"Two-step reasoning coverage");
assert.equal(db.questions.filter(q=>q.subtype==="error").length,4,"Misconception correction coverage");
assert.equal(db.questions.find(q=>q.id==="health-parkinsons-therapy").marks,6);
assert.equal(db.questions.find(q=>q.id==="health-care-records").marks,9);
const knowledgeQuestions=db.questions.filter(q=>/^f17[2-7]$/.test(q.unit));
assert(knowledgeQuestions.every(q=>q.knowledgeOnly),"Knowledge-only unit item missing safety scope");
assert(knowledgeQuestions.every(q=>!q.marks&&!q.levelsNote&&!q.caseTitle),
 "NEA knowledge practice must use general questions and unmarked self-review");
assert(!knowledgeQuestions.some(q=>/draft|complete the coursework|report for your assignment|submit your assignment|meet the assessment criteria/i.test(q.stem)),"Assessment-writing task leaked into knowledge bank");
assert(knowledgeQuestions.filter(q=>q.figure).length>=6,"Each NEA-unit knowledge bank needs visual understanding checks");
assert(db.questions.filter(q=>["single","diagram","best"].includes(q.type)).every(q=>q.options.length===4),"Four-option rule not met");
load("human-biology/app.js");
assert(main.innerHTML.includes("<h1>Human Biology</h1>"));
for(const unit of db.units)assert(main.innerHTML.includes('href="#challenge/'+unit.id+'"'),"Missing overview link for "+unit.id);
assert(!main.innerHTML.includes("Continue learning"),"An empty browser should not show a resume panel");

function route(hash){location.hash="#"+hash;events.hashchange();
 const modal=elem("leave-dialog");
 if(!modal.hidden&&typeof elem("leave-confirm").onclick==="function"){elem("leave-confirm").onclick();events.hashchange();}
}
route("challenge/f170");
assert(main.innerHTML.includes("Exam-style focus")&&main.innerHTML.includes("Fix mistakes"),"F170 mode chooser missing");
route("challenge/f170/all");
const mixed=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.equal(mixed.queue.length,8,"Mixed set should have eight questions");
const stageOf=id=>db.questions.find(q=>q.id===id).level;
assert(db.questions.find(q=>q.id===mixed.queue[0]).onRamp===true,"Quick Mix must open with an attainable entry question");
assert.deepEqual(mixed.queue.slice(0,2).map(stageOf),["warmup","warmup"],"Quick Mix must begin with two warm-up questions");
assert.deepEqual(mixed.queue.slice(2,4).map(stageOf),["core","core"],"Quick Mix must build on warm-ups with core retrieval");
assert(mixed.queue.slice(4).every(id=>stageOf(id)==="apply"),"Quick Mix application questions must occur after the first four questions");
assert(mixed.quickMixVersion===2,"New Quick Mix progression version should be recorded for safe session migration");

const selectedTypes=new Set(mixed.queue.map(id=>db.questions.find(q=>q.id===id).type));
assert(selectedTypes.size>=6,"Mixed sessions must deliberately use varied question types");
assert(new Set(mixed.queue.map(id=>db.questions.find(q=>q.id===id).area)).size>=3,"Mixed session should span multiple topic areas");
route("home");
assert(main.innerHTML.includes("Continue learning")&&main.innerHTML.includes('href="#challenge/f170/all"'),"Leaving exam questions should offer a direct resume link");
const paused=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.deepEqual(paused.queue,mixed.queue,"Leaving an unfinished set must preserve its queue");
route("challenge/f170/all");
const resumed=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.deepEqual(resumed.queue,mixed.queue,"Resume must restore the same shuffled questions");
// Each exam unit should begin safely over many random selections, not only one seed.
for(const unit of ["f170","f171"]){
 for(let i=0;i<25;i++){
  app.discard();app.route("challenge/"+unit+"/all",html=>{main.innerHTML=html;});
  const state=JSON.parse(data.get("narajos-human-challenge-v2-session"));
  const selected=state.queue.map(id=>db.questions.find(q=>q.id===id));
  assert(selected[0].onRamp===true,unit+" opened on an unexpectedly demanding question");
  assert(selected[0].level==="warmup"&&selected[1].level==="warmup",unit+" lost the easy start");
  assert(selected[2].level==="core"&&selected[3].level==="core",unit+" skipped the core level");
  assert(selected.slice(4).every(q=>q.level==="apply"),unit+" included an early stretch");
  assert(new Set(selected.map(q=>q.type)).size>=6,unit+" lacks question format variety: "+selected.map(q=>q.id+"/"+q.type+"/"+q.level).join(", "));
 }
}
// Difficulty must soften at the first application step after poor early recall.
app.discard();app.route("challenge/f170/all",html=>{main.innerHTML=html;});
const mids=JSON.parse(data.get("narajos-human-challenge-v2-session"));
for(const secure of [true,false]){
 const simulate=JSON.parse(JSON.stringify(mids));
 simulate.index=4;simulate.phase="ask";
 simulate.first=Object.fromEntries(simulate.quickMixBase.slice(0,4).map((id,i)=>[id,secure||i===0]));
 data.set("narajos-human-challenge-v2-session",JSON.stringify(simulate));
 app.pause();app.route("challenge/f170/all",html=>{main.innerHTML=html;});
 const adjusted=JSON.parse(data.get("narajos-human-challenge-v2-session"));
 const question=db.questions.find(q=>q.id===adjusted.queue[adjusted.index]);
 assert.equal(question.level,secure?"apply":"core","Difficulty must respond to early independent recall");
}
app.discard();
// The final question may be a stretch only after strong *independent* responses.
app.discard();app.route("challenge/f170/all",html=>{main.innerHTML=html;});
const baseState=JSON.parse(data.get("narajos-human-challenge-v2-session"));
for(const confident of [true,false]){
 const simulated=JSON.parse(JSON.stringify(baseState));
 simulated.index=7;simulated.phase="ask";simulated.quickMixAdjusted=false;
 simulated.first=Object.fromEntries(simulated.quickMixBase.slice(0,7).map((id,i)=>[id,confident||i<2]));
 data.set("narajos-human-challenge-v2-session",JSON.stringify(simulated));
 app.pause();app.route("challenge/f170/all",html=>{main.innerHTML=html;});
 const after=JSON.parse(data.get("narajos-human-challenge-v2-session"));
 const finalItem=db.questions.find(q=>q.id===after.queue[after.index]);
 assert.equal(finalItem.level,confident?"stretch":"core","Final Quick Mix difficulty should respond to unaided performance");
}
app.discard();
route("challenge/f171");
assert(main.innerHTML.includes("Health and disease")&&main.innerHTML.includes("Diagnosis and monitoring"),"F171 chooser missing");
route("challenge/f170/a1");
assert(app.isActive(),"New challenge session was not started");
assert(main.innerHTML.includes("Check answer")||main.innerHTML.includes("Compare with key points"),"Practice question not rendered");
let record=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.equal(record.unit,"f170");
assert(record.queue.every(id=>db.questions.some(q=>q.id===id&&q.area===1)),"Area filter selected other questions");
const stages={warmup:0,core:1,apply:2,stretch:3};
const stageSequence=record.queue.map(id=>stages[db.questions.find(q=>q.id===id).level]);
assert.equal(stageSequence[0],0,"Area practice must begin with an accessible warm-up");
assert(stageSequence.every((stage,i)=>i===0||stage>=stageSequence[i-1]),"Area practice must progress from recall to application");
assert(main.innerHTML.includes("<svg"),"Expected in-app SVG icons");
assert(typeof mainEvents.click==="function","Practice input handler missing");
function unlockHintClock(){
 const saved=JSON.parse(data.get("narajos-human-challenge-v2-session"));
 saved.hintReadyAt=0;data.set("narajos-human-challenge-v2-session",JSON.stringify(saved));
 app.pause();app.route(saved.route,html=>{main.innerHTML=html;});
}
unlockHintClock();
mainEvents.click({target:{closest(selector){return selector==="[data-k-action]"?{dataset:{kAction:"hint"}}:null;}}});
assert(main.innerHTML.includes("Hint 1"),"A learner-controlled hint should appear");
assert(JSON.parse(data.get("narajos-human-challenge-v2-session")).hintsUsed[record.queue[0]]===1,"Hint use should be recorded on the local session");
mainEvents.click({target:{closest(selector){return selector==="[data-k-action]"?{dataset:{kAction:"skip"}}:null;}}});
assert(main.innerHTML.includes("Expected answer"),"Answer reveal failed");
assert(main.innerHTML.includes("Explanation revealed"),"Unknown answers should not be treated as punitive errors");
const afterSkip=JSON.parse(data.get("narajos-human-challenge-v2-session"));
for(const id of Object.keys(afterSkip.quickCheckIds)){const next=db.questions.find(q=>q.id===id),missed=db.questions.find(q=>q.id===record.queue[0]);assert.equal(next.family,missed.family,"A warm-up follow-up must test the same idea");assert.equal(next.level,"warmup","A missed warm-up must not trigger a harder follow-up");}
assert(afterSkip.queue.includes(record.queue[0]),"Missed warm-up should be returned to later");
assert.equal(main.innerHTML.includes("Try a quick check"),Object.keys(afterSkip.quickCheckIds).length>0,"Quick-check promise must match an actual related item");
assert(window.KeystoneHumanChallenge.stats("f170").weak>=1,"Not sure should record an area for re-practice");
mainEvents.click({target:{closest(selector){return selector==="[data-k-action]"?{dataset:{kAction:"next"}}:null;}}});
record=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert(record.index>=1,"Question did not advance");
assert.equal(window.KeystoneHumanChallenge.questionCount,588);
// Verify the entire deterministic answer flow, not merely presence of new item types.
function forcedQuestion(id){
 const q=db.questions.find(x=>x.id===id);assert(q,"Unknown forced test item: "+id);
 const state={unit:q.unit,scope:"a"+q.area,route:"challenge/"+q.unit+"/a"+q.area,queue:[q.id],index:0,first:{},correctFirst:0,guidedFirst:0,phase:"ask",answers:{},retries:{},hintsUsed:{},quickCheckIds:{},quickCheckLinks:{},quickChecksPassed:0,quickChecksSeen:0,complete:false,started:Date.now()};
 app.pause();data.set("narajos-human-challenge-v2-session",JSON.stringify(state));
 app.route(state.route,html=>{main.innerHTML=html;});return q;
}
const clickAction=name=>mainEvents.click({target:{closest(selector){return selector==="[data-k-action]"?{dataset:{kAction:name}}:null;}}});
const best=forcedQuestion("best-f170-magnification");
assert(main.innerHTML.includes("Choose the scientifically accurate explanation")&&main.innerHTML.includes("Which scientific reason supports"),"Two-step reasoning must present both choices");
main.querySelector=selector=>selector==='input[name="kbest"]:checked'?{value:String(best.correct)}:selector==='input[name="kreason"]:checked'?{value:String(best.reasonCorrect)}:null;
clickAction("check");
assert(main.innerHTML.includes("Correct")&&main.innerHTML.includes("Expected answer"),"Two-step answer should require both correct components");
assert(JSON.parse(data.get("narajos-human-challenge-v2-progress"))[best.id].independent===1,"Correct independent reasoning should be counted");
const written=forcedQuestion("health-parkinsons-therapy");
main.querySelector=selector=>selector==="#k-number, #k-text, #k-written"?{value:"Treatment can reduce tremor."}:null;
clickAction("reveal");
assert.equal(JSON.parse(data.get("narajos-human-challenge-v2-progress"))[written.id],undefined,"Opening the model must not record an outcome");
assert(main.innerHTML.includes("Your answer")&&main.innerHTML.includes("Treatment can reduce tremor."));
mainEvents.change({target:{matches:selector=>selector==="[data-review-criterion]",dataset:{reviewCriterion:"0"},value:"work"}});
mainEvents.input({target:{matches:selector=>selector==="#k-revised",value:"Revision after comparing."}});
app.pause();app.route("challenge/f171/a2",html=>{main.innerHTML=html;});
assert(main.innerHTML.includes("Revision after comparing.")&&main.innerHTML.includes('value="work" selected'));
clickAction("finish-review");
assert(main.innerHTML.includes("Self-review complete"));
clickAction("finish-review");
clickAction("next");
const reviewProgress=JSON.parse(data.get("narajos-human-challenge-v2-progress"))[written.id];
assert.equal(reviewProgress.selfReviewed,1);
assert.equal(reviewProgress.independent,0);
assert.equal(reviewProgress.checked,0,"Written reviews must not enter objective accuracy");
assert.match(main.innerHTML,/No objective first submissions were recorded/);
assert.match(main.innerHTML,/<dt>self-reviewed<\/dt><dd>1<\/dd>/);
app.route("challenge/review",h=>main.innerHTML=h);
assert.match(main.innerHTML,/<dt>self-reviewed<\/dt><dd>1<\/dd>/);
assert(!data.get("narajos-human-challenge-v2-completed").includes("Revision after comparing."));

clickAction("self-good");
assert.equal(JSON.parse(data.get("narajos-human-challenge-v2-progress"))[written.id].seen,1,"Repeated review must not create another attempt");
// Legacy records with unreliable provenance remain available as history.
const legacy=forcedQuestion("health-care-records");
let legacySave=JSON.parse(data.get("narajos-human-challenge-v2-session"));
legacySave.first={[legacy.id]:true};legacySave.correctFirst=1;delete legacySave.evidenceVersion;delete legacySave.outcomes;delete legacySave.objectiveFirst;
data.set("narajos-human-challenge-v2-session",JSON.stringify(legacySave));
app.pause();app.route(legacySave.route,h=>main.innerHTML=h);
main.querySelector=selector=>selector==="#k-number, #k-text, #k-written"?{value:"Consider consent and confidentiality."}:null;
clickAction("reveal");
legacySave=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.equal(legacySave.correctFirst,0);
assert.deepEqual(legacySave.objectiveFirst,{});
assert.equal(legacySave.earlierPractice.first[legacy.id],true);
assert.equal(legacySave.first[legacy.id],false);
// Recover an earlier migrated flag independently from a submitted answer in the same saved queue.
const inherited=forcedQuestion("f175-early");
let inheritedSave=JSON.parse(data.get("narajos-human-challenge-v2-session"));
const proved=db.questions.find(q=>q.id!==inherited.id && q.type==="single").id;
inheritedSave.queue=[proved,inherited.id];inheritedSave.index=1;inheritedSave.first={[proved]:true,[inherited.id]:true};
inheritedSave.objectiveFirst={[proved]:"independent",[inherited.id]:"independent"};inheritedSave.outcomes={0:"independent"};
delete inheritedSave.evidenceVersion;inheritedSave.correctFirst=2;
data.set("narajos-human-challenge-v2-session",JSON.stringify(inheritedSave));
app.pause();app.route(inheritedSave.route,h=>main.innerHTML=h);
clickAction("skip");
inheritedSave=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.equal(inheritedSave.correctFirst,1);assert.equal(inheritedSave.objectiveFirst[proved],"independent");
assert.equal(inheritedSave.earlierPractice.first[inherited.id],true);
const sequence=forcedQuestion("f175-early");
let sequenceSave=JSON.parse(data.get("narajos-human-challenge-v2-session"));
sequenceSave.answers[sequence.id].order=[0,1,2,3]; // a pre-Batch-10 saved draft
data.set("narajos-human-challenge-v2-session",JSON.stringify(sequenceSave));
app.pause();app.route(sequenceSave.route,h=>main.innerHTML=h);
sequenceSave=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.equal(sequenceSave.answers[sequence.id].order.length,5);
sequenceSave.answers[sequence.id].order=[0,1,2,3,4];
data.set("narajos-human-challenge-v2-session",JSON.stringify(sequenceSave));
app.pause();app.route(sequenceSave.route,h=>main.innerHTML=h);
clickAction("check");
assert.match(main.innerHTML,/<li>Fertilisation<\/li><li>Cleavage.*<\/li><li>Blastocyst formation.*<\/li><li>Implantation.*<\/li><li>Continued embryonic development<\/li>/);
assert.equal(JSON.parse(data.get("narajos-human-challenge-v2-session")).lastResult,true);
const warm=forcedQuestion("warm-f170-cells");
main.querySelector=()=>null;main.querySelectorAll=()=>[{value:String(warm.correct)}];
unlockHintClock();clickAction("hint");assert(main.innerHTML.includes("Hint 1"),"Warm-up should offer a hint");
clickAction("check");
const guided=JSON.parse(data.get("narajos-human-challenge-v2-progress"))[warm.id];
assert.equal(guided.guided,1,"Guided success must be recorded as guided");
assert.equal(guided.independent,0,"Guided success must not be scored as independent retrieval");
const state=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.equal(state.correctFirst,0,"Hints must not inflate independent first-attempt score");
assert.equal(Object.keys(state.quickCheckIds).length,1,"A guided answer should now have an independent same-family alternative");
assert.equal(db.questions.find(q=>q.id===Object.keys(state.quickCheckIds)[0]).family,warm.family);
// For a related core concept, a quick check can follow immediately.
forcedQuestion("cell-ser");main.querySelector=()=>null;main.querySelectorAll=()=>[];
clickAction("skip");
const linked=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.equal(db.questions.find(q=>q.id===Object.keys(linked.quickCheckIds)[0]).family,"cell-ser","Prefer the same objective over a different organelle in the same subtopic");
forcedQuestion("cell-magnification");
main.querySelector=selector=>selector===".k-error"?{textContent:""}:selector==="#k-number, #k-text, #k-written"?{value:"3000xyz"}:null;
main.querySelectorAll=()=>[];
clickAction("check");
assert.equal(JSON.parse(data.get("narajos-human-challenge-v2-session")).phase,"ask","Malformed numeric input must not be credited");

// Timed hints are not available immediately and require another wait after a rung.
const delayed=forcedQuestion("warm-f171-heart");
const initialTimer=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert(initialTimer.hintReadyAt>Date.now(),"Hint should initially have a ten-second delay");
clickAction("hint");
assert.equal(Object.keys(JSON.parse(data.get("narajos-human-challenge-v2-session")).hintsUsed).length,0,"Premature hint tap must do nothing");
unlockHintClock();clickAction("hint");
let afterHint=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.equal(afterHint.hintsUsed[delayed.id],1,"Timed hint should reveal one rung");
assert(afterHint.hintReadyAt>Date.now(),"More help should have another ten-second delay");
clickAction("hint");
assert.equal(JSON.parse(data.get("narajos-human-challenge-v2-session")).hintsUsed[delayed.id],1,"One tap must not reveal two rungs");

// Simulate physical pointer taps, separately from keyboard selections.
const physical=forcedQuestion("warm-f170-cells");
main.querySelector=selector=>selector==='input[name="kchoice"]:checked'?{value:String(physical.correct)}:null;
main.querySelectorAll=selector=>selector==='input[name="kchoice"]:checked'?[{value:String(physical.correct)}]:[];
mainEvents.click({detail:1,target:{closest(selector){return selector===".k-option"?{}:null;}}});
assert.equal(JSON.parse(data.get("narajos-human-challenge-v2-session")).phase,"ask","A correct first selection waits for submission");
clickAction("check");clickAction("check");
let submitted=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.deepEqual(submitted.outcomes,{"0":"independent"});
assert.equal(submitted.correctFirst,1);
app.pause();app.route(submitted.route,h=>main.innerHTML=h);
assert(main.innerHTML.includes("Expected answer")&&main.innerHTML.includes("Next question"));
clickAction("check");
assert.deepEqual(JSON.parse(data.get("narajos-human-challenge-v2-session")).outcomes,submitted.outcomes);
const falseFirst=forcedQuestion("warm-f170-physiology");
main.querySelector=selector=>selector==='input[name="kchoice"]:checked'?{value:String((falseFirst.correct+1)%4)}:null;
main.querySelectorAll=()=>[{value:String((falseFirst.correct+1)%4)}];
mainEvents.click({detail:1,target:{closest(selector){return selector===".k-option"?{}:null;}}});
let wrongState=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.equal(wrongState.phase,"ask","First wrong tap should remain unanswered");
assert.equal(Object.keys(wrongState.first).length,0,"Changing a selection before Check is not a graded correction");
main.querySelector=selector=>selector==='input[name="kchoice"]:checked'?{value:String(falseFirst.correct)}:null;
main.querySelectorAll=()=>[{value:String(falseFirst.correct)}];
mainEvents.click({detail:1,target:{closest(selector){return selector===".k-option"?{}:null;}}});
assert.equal(JSON.parse(data.get("narajos-human-challenge-v2-session")).phase,"ask","Correcting an earlier wrong tap should require Check");
clickAction("check");
submitted=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.equal(submitted.phase,"feedback");
assert.deepEqual(submitted.outcomes,{"0":"independent"},"Check grades the submitted answer only");

const sort=forcedQuestion(db.questions.find(q=>q.type==="sort").id);
let wrongRow=true;
main.querySelector=selector=>{
 const index=selector.match(/ksort-(\d+)/)?.[1];
 if(index===undefined)return null;
 return {value:String(wrongRow&&index==="0"?(sort.rows[0][1]+1)%sort.groups.length:sort.rows[+index][1])};
};
clickAction("check");
assert(main.innerHTML.includes("1 row needs another look")&&!main.innerHTML.includes("Expected answer"));
clickAction("correct");
let sorting=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.deepEqual(sorting.answers[sort.id].correction,Array.from(sort.rows,(_,i)=>i!==0));
assert(main.innerHTML.includes("Review this row")&&main.innerHTML.includes("Correct so far"));
app.pause();app.route(sorting.route,h=>main.innerHTML=h);
assert(main.innerHTML.includes("Review this row"),"Correction should restore the submitted work");
wrongRow=false;
clickAction("check");
assert(main.innerHTML.includes("Correct!"));
sorting=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.equal(sorting.outcomes[0],"corrected");
assert.equal(sorting.objectiveFirst[sort.id],"incorrect");
clickAction("next");
assert.equal(JSON.parse(data.get("narajos-human-challenge-v2-completed")).outcomes[0],"corrected","Retry evidence must remain saved on completion");
// Each new schematic must support feedback, without disclosing an answer in alt text.
for(const id of ["f172-diagram-alleles","f173-diagram-blood","f174-diagram-glucose","f175-diagram-oviduct","f176-diagram-brain","f177-diagram-randomise"]){
 const question=forcedQuestion(id);
 assert(main.innerHTML.includes("<svg")&&!main.innerHTML.includes("Look again:"),"Diagram should appear without worked caption on the question");
 main.querySelectorAll=()=>[{value:String(question.correct)}];
 main.querySelector=()=>null;
 clickAction("skip");
 assert(main.innerHTML.includes("Look again:"),"Feedback should include an annotated diagram");
}
const html=read("human-biology/index.html");
assert(!html.includes("fonts.googleapis.com"),"Human Biology should not request remote fonts");
assert(!/\b(?:fetch\(|sendBeacon\(|XMLHttpRequest\(|WebSocket\()/.test(read("human-biology/challenge.js")),"No network upload API should be used in this revision app");
assert(!read("human-biology/challenge.js").includes("openai.com"),"No remote AI marking");
assert(read("human-biology/index.html").includes("content-knowledge.js"),"Knowledge bank script not linked");
assert(read("human-biology/index.html").includes("challenge-extension.js"),"Exam extension not loaded");
// A normal new set contains one variant per family. Repeated visits avoid the
// immediately previous version, while a resumed set keeps its exact queue.
assert.equal(db.families.length,91);
for(const family of db.families){
 assert.equal(family.members.length,3);
 const members=family.members.map(id=>db.questions.find(q=>q.id===id));
 assert.equal(new Set(members.map(q=>q.stem)).size,3,"Alternatives need distinct tasks: "+family.id);
 assert(members.every(q=>q.section===family.section&&q.objective===family.objective&&q.level===members[0].level),"Alternatives must preserve mapping and broad demand");
 assert(members.every(q=>(q.hintCue?.length>30||Array.isArray(q.hints)&&q.hints.length===2&&q.hints.every(h=>h.length>30))),"Missing authored conceptual hints: "+family.id);
}
const recentVersions={};
for(const unit of ["f170","f171"]){
 for(let i=0;i<80;i++){
  app.discard();const scope=i%2?"all":"a"+(i%(unit==="f170"?4:5)+1);
  app.route("challenge/"+unit+"/"+scope,html=>main.innerHTML=html);
  const s=JSON.parse(data.get("narajos-human-challenge-v2-session"));
  const qs=s.queue.map(id=>db.questions.find(q=>q.id===id));
  assert.equal(new Set(qs.map(q=>q.family||q.id)).size,qs.length,"Normal sets must not repeat one objective's alternatives");
  for(const q of qs.filter(q=>q.family)){
   assert.notEqual(q.id,recentVersions[q.family],"Repeated task immediately reused a family version: "+q.id);
   recentVersions[q.family]=q.id;
  }
  app.pause();app.route(s.route,html=>main.innerHTML=html);
  assert.deepEqual(JSON.parse(data.get("narajos-human-challenge-v2-session")).queue,s.queue,"Resume rotated an unfinished set");
 }
}
// Deterministic clock checks: no countdown/fill, genuine inactivity reset,
// learner-controlled conceptual hints and keyboard access to a visible hint.
let fakeNow=Date.now(),nextTimer=1;const timers=new Map();
class ClockDate extends Date {static now(){return fakeNow;}}
c.Date=ClockDate;c.setTimeout=(fn,delay=0)=>{const id=nextTimer++;timers.set(id,{fn,at:fakeNow+delay});return id;};c.clearTimeout=id=>timers.delete(id);
function tick(ms){fakeNow+=ms;for(const [id,t] of [...timers])if(t.at<=fakeNow){timers.delete(id);t.fn();}}
const hintButton={hidden:false,disabled:false,textContent:"",setAttribute(){}};
main.querySelector=sel=>sel==='[data-k-action="hint"]'?hintButton:null;
main.querySelectorAll=()=>[];
forcedQuestion("cell-ser");
assert(hintButton.hidden,"Hint must initially be invisible");
assert(!main.innerHTML.includes("hint-wait")&&!main.innerHTML.includes("--hint-progress"),"Countdown/fill styling returned");
tick(9999);assert(hintButton.hidden);
mainEvents.input({target:{matches:selector=>selector.includes("#k-written"),value:"starting an answer"}});
tick(20);assert(hintButton.hidden,"Activity must reset the ten-second inactivity period");
tick(10000);assert(!hintButton.hidden,"Hint must appear after inactivity");
assert.equal(hintButton.textContent,"Hint");
mainEvents.keydown({key:"Enter",target:{closest:()=>({})}});
assert(!hintButton.hidden,"Keyboard activation must not hide the hint before its click");
clickAction("hint");
assert(main.innerHTML.includes("A new cell membrane needs material"),"First hint must use the authored prompt");
assert(hintButton.hidden,"More help must wait for another inactive interval");
tick(10010);clickAction("hint");
assert(main.innerHTML.includes("Separate the production of membrane lipids"),"Second hint must teach the prerequisite principle");
// Exercise the learner-visible progression hints before submitting an answer.
for(const id of ["p-cell-membrane-transport-challenge","p-health-screening-foundation","p-f171-monitoring-repeats-diagnostic",...["f172","f173","f174","f175","f176","f177"].map(unit=>db.questions.find(q=>q.unit===unit&&q.hintCue).id)]){
 const question=forcedQuestion(id);
 tick(10010);clickAction("hint");
 assert(main.innerHTML.includes("Hint 1")&&!main.innerHTML.includes("Hint 2"),id);
 tick(10010);clickAction("hint");
 assert(main.innerHTML.includes("Hint 2")&&!main.innerHTML.includes("Expected answer"),id);
 assert(question.hintCue&&!question.explain.includes(question.hintCue)&&!question.model.includes(question.hintCue),id);
}
console.log("Human Biology checks passed: 588 questions, 91 rotating families, same-idea follow-ups, exact resume and quiet inactivity-based conceptual hints.");


// Point practice must preserve one biological idea while support is withdrawn.
const ladders=window.KeystoneHumanProgressions;
assert.equal(ladders.points.length,49);
assert.equal(new Set(ladders.points.map(p=>p.unit+":"+p.section)).size,46);
for(const point of ladders.points){
 assert.equal(point.core.length,3,"Each selected idea needs rotating core tasks");
 for(const unit of [point.unit]){
  app.discard();app.route("challenge/"+unit+"/build",h=>main.innerHTML=h);
  assert(main.innerHTML.includes("#challenge/"+point.unit+"/"+point.id)&&main.innerHTML.includes("not yet complete"));
 }
 app.discard();const r="challenge/"+point.unit+"/"+point.id;
 app.route(r,h=>main.innerHTML=h);
 const first=JSON.parse(data.get("narajos-human-challenge-v2-session"));
 assert.equal(first.point,point.id);
 assert.deepEqual(first.queue.slice(0,2),[point.foundation,point.diagnostic]);
 assert(point.core.includes(first.queue[2]));assert.equal(first.queue[3],point.challenge);
 assert(first.queue.every(id=>db.questions.find(q=>q.id===id).section===point.section));
 app.pause();app.route(r,h=>main.innerHTML=h);
 assert.deepEqual(JSON.parse(data.get("narajos-human-challenge-v2-session")).queue,first.queue,"Resume must preserve this sequence's selected variant");
 app.discard();app.route(r,h=>main.innerHTML=h);
 const second=JSON.parse(data.get("narajos-human-challenge-v2-session"));
 assert.notEqual(second.queue[2],first.queue[2],"Repeat must rotate the same-idea core question");
 assert.equal(db.questions.find(q=>q.id===second.queue[0]).stage,"foundation");
 assert.equal(db.questions.find(q=>q.id===second.queue[3]).level,"stretch");
}
app.discard();
console.log("49 teaching-idea sequences passed: prior knowledge, misconception, same-idea rotating core, transfer challenge and exact resume.");

// Validate the register against the same resources the site uses.
load("human-biology/skills.js");
load("human-biology/teaching.js");
load("human-biology/teaching-f170.js");
load("human-biology/teaching-f171.js");
load("human-biology/teaching-knowledge.js");
for (const [id, route, expected] of [
 ["f170-nucleolus-export","1.1.3.evidence",/transport out through the nuclear pores/],
 ["f170-ribosome-fractions","1.1.3.evidence",/falls in X, while Y remains active/],
 ["f170-graft-recognition","1.1.4.surface",/accessible donor antigens/],
 ["f170-division-variation","1.1.5.meiosis",/crossover between the two positions/]
]) {
 const q=db.questions.find(item=>item.id===id);
 assert.match(q.options[q.correct],expected,id);
 // Resolve focused lessons even when modules are loaded after the companion in this harness.
 companion.route("catchup/f170/"+route, html=>{help=html;});
 assert.equal(companion.linkFor(q),"catchup/f170/"+route,id);
 assert.equal(companion.reteachFor(q).route,companion.linkFor(q),id);
}
const register = readFileSync("docs/human-biology-curriculum-quality-register.md", "utf8");
const files = ["f170","f171","f172","f173","f174","f175","f176","f177","shared-skills"];
const expectedSections = [28,18,21,29,25,16,17,18,39];
const validStatuses = new Set(["Verified","Taught","Practised","Represented","Gap","Review","Unresolved","Centre-only"]);
const checkedRoutes = new Set();
const totalStatuses = Object.fromEntries([...validStatuses].map(status => [status, 0]));
let mapped = 0;
for (const [i, unit] of files.entries()) {
 const path = "human-biology-curriculum/" + unit + ".md";
 assert(register.includes("(" + path + ")"), "Unlinked register unit: " + unit);
 const doc = readFileSync("docs/" + path, "utf8");
 const headings = [...doc.matchAll(/^## (\S+)$/gm)].map(match => match[1]);
 assert.equal(headings.length, expectedSections[i], "Coverage headings for " + unit);
 const refs = new Set();
 const unitStatuses = Object.fromEntries([...validStatuses].map(status=>[status,0]));
 for (const row of doc.split("\n").filter(line => /^\| (?:\d|HSW|M\d|E-r)/.test(line))) {
  const cells = row.split("|").slice(1, -1).map(cell => cell.trim());
  const [id, requirement, demand, teachingRef, model, practice, representation, note, status] = cells;
  assert.equal(cells.length, 11, row);
  assert(!refs.has(id), "Duplicate curriculum row " + unit + "/" + id);
  assert(headings.includes(id.replace(/-r\d+$/, "")), "Unmapped OCR reference: " + id);
  assert(requirement && demand && note && validStatuses.has(status), "Incomplete curriculum row: " + id);
  const route = teachingRef.match(/#catchup\/([a-z0-9./]+)\)/)?.[1];
  if (status === "Verified") assert(route && model !== "—", "Verified row needs reviewed teaching evidence: " + id);
  if (route && !checkedRoutes.has(route)) {
   companion.route("catchup/" + route, html => { help = html; });
   assert(help.includes("k-catchup-concept"), "Missing mapped lesson or recap: " + route);
   checkedRoutes.add(route);
  }
  if (route && model !== "—") assert(window.KeystoneHumanLessons[route], "Missing worked lesson: " + route);
  for (const [, item] of practice.matchAll(/`([^`]+)`/g)) {
   assert(item.startsWith("skills:") ? window.KeystoneHumanSkills.get(item.slice(7)) : ids.has(item),
    "Missing mapped practice evidence " + item + " in " + unit + "/" + id);
  }
  refs.add(id);
  totalStatuses[status]++;
  unitStatuses[status]++;
  mapped++;
 }
 const summary=register.split("\n").find(line=>line.startsWith("| [")&&line.includes("]("+path+")"));
 assert.deepEqual(summary.split("|").slice(2,-1).map(Number), [refs.size,...Object.values(unitStatuses)], "Stale coverage counts for "+unit);
 for (const heading of headings) assert([...refs].some(id => id.startsWith(heading + "-r")), "Empty curriculum section: " + heading);
}
const totalRow=register.split("\n").find(line=>line.startsWith("| **All rows**"));
assert.deepEqual(totalRow.split("|").slice(2,-1).map(value=>Number(value.replace(/\*/g,""))), [mapped,...Object.values(totalStatuses)]);
console.log("Curriculum register checked " + mapped + " requirement rows, specification headings and live evidence identifiers.");

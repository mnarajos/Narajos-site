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
const store={getItem(k){return data.get(k)||null;},setItem(k,v){data.set(k,String(v));},removeItem(k){data.delete(k);}};
const c=vm.createContext({window,document,location,localStorage:store,Date,Math,console});
function load(p){vm.runInContext(read(p),c,{filename:p});}
load("assets/spaced-review.js");
load("human-biology/content-f170.js");
load("human-biology/challenge-bank.js");
load("human-biology/content-knowledge.js");
load("human-biology/challenge.js");
const db=window.KeystoneHumanChallenges,app=window.KeystoneHumanChallenge;
assert.equal(db.questions.length,163);
assert.equal(db.questions.filter(q=>q.unit==="f170").length,62);
assert.equal(db.questions.filter(q=>q.unit==="f171").length,29);
for(const u of ["f172","f173","f174","f175","f176","f177"])assert.equal(db.questions.filter(q=>q.unit===u).length,12,u+" knowledge bank missing");
assert.deepEqual([...new Set(db.questions.map(q=>q.type))].sort(),["best","diagram","match","multi","number","order","short","single","sort","written"].sort());
const ids=new Set();
const validUnits=new Set(["f170","f171","f172","f173","f174","f175","f176","f177"]);
const map=window.KeystoneHumanData.areas.flatMap(a=>a.sections.map(s=>s.id));
for(const q of db.questions){
 assert(!ids.has(q.id),"Duplicate question ID: "+q.id);ids.add(q.id);
 assert(validUnits.has(q.unit),"Missing/incorrect unit: "+q.id);
 assert(q.area>0&&q.area<=(q.unit==="f170"?4:5),"Incorrect topic area: "+q.id);
 if(q.unit==="f170")assert(map.includes(q.section),"Question not mapped to current F170 section: "+q.id);
 assert(q.model&&q.explain&&q.misconception,"Missing explanatory feedback: "+q.id);
 if(q.type==="number")assert(Number.isFinite(q.correct)&&q.answerUnit!==undefined,"Missing numeric answer and units: "+q.id);
 if(q.type==="best")assert(q.options.length>=2&&q.reasons.length>=3&&q.correct>=0&&q.correct<q.options.length&&q.reasonCorrect>=0&&q.reasonCorrect<q.reasons.length,"Invalid two-step answer: "+q.id);
 if(q.warmup)assert(q.level==="warmup"&&q.type==="single","Warm-up should be a low-load single-answer question");
 if(q.type==="multi")assert(Array.isArray(q.correct)&&q.correct.length>=2,"Invalid multi-answer: "+q.id);
 if(q.type==="match")assert(q.pairs.length>=2,"Too few match pairs: "+q.id);
 if(q.type==="sort")assert(q.groups.length>=2&&q.rows.length>=4&&q.rows.every(r=>Number.isInteger(r[1])&&r[1]>=0&&r[1]<q.groups.length),"Invalid sort: "+q.id);
 if(q.type==="order")assert(q.items.length>=3,"Too short sequence: "+q.id);
 if(q.type==="written")assert(q.markPoints.length>=2,"Unscaffolded written response: "+q.id);
 if(q.marks)assert(q.type==="written"&&(q.marks===6||q.marks===9),"Unexpected extended-answer mark count: "+q.id);
}
assert.equal(db.questions.filter(q=>q.warmup).length,23,"Warm-up coverage");
assert.equal(db.questions.filter(q=>q.type==="best").length,7,"Two-step reasoning coverage");
assert.equal(db.questions.filter(q=>q.subtype==="error").length,4,"Misconception correction coverage");
assert.equal(db.questions.find(q=>q.id==="health-parkinsons-therapy").marks,6);
assert.equal(db.questions.find(q=>q.id==="health-care-records").marks,9);
assert(!JSON.stringify(db).match(/complete.*coursework|draft.*NEA|submit.*assignment/i),"NEA task assistance present");
load("human-biology/app.js");
assert(main.innerHTML.includes("Ready to revise?"));

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
assert(main.innerHTML.includes("Resume questions"),"Leaving exam questions should offer a direct resume link");
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
  assert(new Set(selected.map(q=>q.type)).size>=6,unit+" lacks question format variety");
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
assert(main.innerHTML.includes("Here’s how it works"),"Unknown answers should not be treated as punitive errors");
const afterSkip=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.equal(Object.keys(afterSkip.quickCheckIds).length,0,"An unrelated or harder item must not be inserted after a missed warm-up");
assert(afterSkip.queue.includes(record.queue[0]),"Missed warm-up should be returned to later");
assert(!main.innerHTML.includes("Try a quick check"),"App must not promise an unrelated quick check");
assert(window.KeystoneHumanChallenge.stats("f170").weak>=1,"Not sure should record an area for re-practice");
mainEvents.click({target:{closest(selector){return selector==="[data-k-action]"?{dataset:{kAction:"next"}}:null;}}});
record=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert(record.index>=1,"Question did not advance");
assert.equal(window.KeystoneHumanChallenge.questionCount,163);
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
const warm=forcedQuestion("warm-f170-cells");
main.querySelector=()=>null;main.querySelectorAll=()=>[{value:String(warm.correct)}];
unlockHintClock();clickAction("hint");assert(main.innerHTML.includes("Hint 1"),"Warm-up should offer a hint");
clickAction("check");
const guided=JSON.parse(data.get("narajos-human-challenge-v2-progress"))[warm.id];
assert.equal(guided.guided,1,"Guided success must be recorded as guided");
assert.equal(guided.independent,0,"Guided success must not be scored as independent retrieval");
const state=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert.equal(state.correctFirst,0,"Hints must not inflate independent first-attempt score");
assert.equal(Object.keys(state.quickCheckIds).length,0,"Guided warm-up should not trigger an unrelated check");
assert(state.retries[warm.id]===1,"A guided answer with no related quick check should return later for unaided retrieval");
// For a related core concept, a quick check can follow immediately.
forcedQuestion("cell-ser");main.querySelector=()=>null;main.querySelectorAll=()=>[];
clickAction("skip");
const linked=JSON.parse(data.get("narajos-human-challenge-v2-session"));
assert(linked.quickCheckIds["cell-mito-ribosomes"]===true,"Related quick checks must target the same subtopic");
forcedQuestion("cell-magnification");
main.querySelector=selector=>selector===".k-error"?{textContent:""}:selector==="#k-number, #k-text, #k-written"?{value:"3000xyz"}:null;
main.querySelectorAll=()=>[];
clickAction("check");
assert.equal(JSON.parse(data.get("narajos-human-challenge-v2-session")).phase,"ask","Malformed numeric input must not be credited");

const html=read("human-biology/index.html");
assert(!html.includes("fonts.googleapis.com"),"Human Biology should not request remote fonts");
assert(!/\b(?:fetch\(|sendBeacon\(|XMLHttpRequest\(|WebSocket\()/.test(read("human-biology/challenge.js")),"No network upload API should be used in this revision app");
assert(!read("human-biology/challenge.js").includes("openai.com"),"No remote AI marking");
assert(read("human-biology/index.html").includes("content-knowledge.js"),"Knowledge bank script not linked");
console.log("Human Biology checks passed: 163 original questions across eight units, ten answer formats, private deterministic marking, and Quick Mix progression.");

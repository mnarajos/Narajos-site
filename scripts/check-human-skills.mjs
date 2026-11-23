import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const read=p=>readFileSync("public/human-biology/"+p,"utf8");
function fixture(data=new Map()){
 const events={},mainEvents={},elements={};let typed="",selected=[];
 const main={innerHTML:"",focus(){},addEventListener(n,fn){mainEvents[n]=fn;},querySelector(sel){
  if(sel==="#k-number, #k-text, #k-written")return {value:typed};
  return null;
 },querySelectorAll(sel){return sel==='input[name="kchoice"]:checked'?selected.map(value=>({value})):[];}};
 const document={getElementById(id){return id==="main"?main:elements[id]||(elements[id]={hidden:true,focus(){},blur(){},addEventListener(){}});},querySelectorAll(){return[];},addEventListener(n,fn){events[n]=fn;}};
 const window={scrollTo(){},addEventListener(n,fn){events[n]=fn;}};
 let seed=42;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const c=vm.createContext({window,document,Math:math,Date,console,localStorage:{getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)},setInterval:()=>1,clearInterval(){}});
 for(const file of ["challenge-bank.js","content-knowledge.js","challenge-extension.js","question-families.js","progressions.js","skills.js","challenge.js"])vm.runInContext(read(file),c,{filename:file});
 const api=window.KeystoneHumanChallenge,skills=window.KeystoneHumanSkills;
 function route(r){api.route(r,h=>main.innerHTML=h);}
 function action(key){mainEvents.click({target:{closest:sel=>sel==="[data-k-action]"?{dataset:{kAction:key}}:null}});}
 function start(id){mainEvents.click({target:{closest:sel=>sel==="[data-start-skill]"?{getAttribute:()=>id}:null}});}
 function state(){return JSON.parse(data.get("narajos-human-challenge-v2-session")||"null");}
 function answer(correct=true){const s=state(),g=s.generated[s.index],q=skills.generate(s.skillId,g.level,g.seed);typed=String(correct?q.correct:q.correct+12345);selected=[correct?q.correct:(q.correct+1)%4];action("check");return q;}
 return {skills,api,main,route,start,action,state,answer,data,window};
}
const f=fixture(),S=f.skills;
assert.equal(S.definitions.length,14);
assert(S.definitions.every(s=>["f170","f171"].includes(s.unit)),"Generated practice must stay within examined-unit support");
// Check many genuinely different values, all levels, and all numeric choice distractors.
for(const sk of S.definitions){
 const stems=new Set();
 for(let level=1;level<=4;level++)for(let seed=0;seed<400;seed++){
  const q=S.generate(sk.id,level,seed*7919+17);stems.add(q.stem+JSON.stringify(q.graph||null));
  assert(q.stem&&q.explain&&q.model&&q.hintCue,sk.id+" lacks feedback or support");
  assert.deepEqual(JSON.parse(JSON.stringify(q)),JSON.parse(JSON.stringify(S.generate(sk.id,level,seed*7919+17))),"Saved seeds must reproduce the same task");
  if(q.type==="number")assert(Number.isFinite(q.correct)&&q.answerUnit,"Invalid generated answer: "+q.id);
  else assert.equal(new Set(q.options).size,4,"Duplicate or missing choice: "+q.id);
  if(q.graph)assert.equal(q.graph.values.length,q.graph.times.length);
  // Independent arithmetic checks from the presented values, not stored solutions.
  if(sk.id==="division"&&level===2){const [n,total]=q.stem.match(/\d+/g).map(Number);assert.equal(q.correct,n*100/total);}
  if(sk.id==="growth"){
   const v=q.stem.match(/\d+/g).map(Number);const generations=level<3?v[1]:v[2]/v[1];
   assert.equal(q.type==="number"?q.correct:q.numericAnswer,v[0]*2**generations);
  }
  if(sk.id==="percentage"){
   const [a,b]=q.stem.match(/\d+/g).map(Number);assert.equal(q.type==="number"?q.correct:q.numericAnswer,Math.round((b-a)/a*100));
  }
  if(sk.id==="magnification"&&level===2){const [actual,image]=q.stem.match(/\d+(?:\.\d+)?/g).map(Number);assert.equal(q.correct,image*1000/actual);}
  if(sk.id==="rate"){const [start,end]=q.stem.match(/\d+/g).map(Number);const v=q.graph.values;assert.equal(q.type==="number"?q.correct:q.numericAnswer,(v[2]-v[1])/(end-start));}
 }
 assert(stems.size>=(sk.id==="variables"?19:sk.id==="genetics"?7:30),sk.id+" has too few meaningful variants");
}
const graph=S.graphHTML(S.generate("graph",2,123).graph);
assert(graph.includes('role="img"')&&graph.includes('<caption>')&&graph.includes('scope="row"'),"Graph needs accessible tabular values");
f.route("skills");assert(f.main.innerHTML.includes("Skills practice")&&f.main.innerHTML.includes("F171"));
f.route("skills/f170");assert(!f.main.innerHTML.includes("Cardiac output"));
f.route("skills/f171");assert(!f.main.innerHTML.includes("Bacterial growth"));
// A worked example must be unscored and practice must progress through the existing checker.
const r="skills/f170/magnification";f.route(r);assert(f.main.innerHTML.includes("Worked example"));assert(!f.api.isActive());
f.start("magnification");assert(f.api.isActive());
assert.equal(f.state().skillLevel,1);f.answer();f.action("next");assert.equal(f.state().skillLevel,1);
f.answer();f.action("next");assert.equal(f.state().skillLevel,2);
f.answer(false);f.action("next");assert.equal(f.state().skillLevel,1,"An error must ease the next task");
// Hint-assisted success is recorded separately and must not advance the ladder.
let state=f.state();state.hintsUsed[state.queue[state.index]]=1;
f.data.set("narajos-human-challenge-v2-session",JSON.stringify(state));f.api.pause();f.route(r);f.answer();f.action("next");
assert.equal(f.state().skillStreak,0);assert.equal(f.state().guidedFirst,1);
// A full reload has no generated byId entries. Seeds must restore the exact question and feedback.
const before=f.state(),qBefore=S.generate(before.skillId,before.generated[before.index].level,before.generated[before.index].seed);
const fresh=fixture(f.data);fresh.route(r);
assert.equal(fresh.state().queue[fresh.state().index],qBefore.id);
const reloadedPrompt=fresh.main.innerHTML.match(/<div id="f170-prompt"[^>]*>([\s\S]*?)<\/div>/)?.[1];
assert.equal(reloadedPrompt?.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim(),qBefore.stem);
fresh.answer();const feedback=fresh.main.innerHTML;fresh.api.pause();fresh.route(r);assert.equal(fresh.main.innerHTML,feedback,"Feedback reload changed task or answer state");
fresh.action("next");
while(fresh.api.isActive()){fresh.answer();fresh.action("next");}
assert(fresh.main.innerHTML.includes("Skills set complete"));
assert.equal(fresh.state(),null,"Completed skills sets must clear resumable state");
const progress=JSON.parse(fresh.data.get("narajos-human-challenge-v2-progress"));
assert.deepEqual(Object.keys(progress),["skill:magnification"],"Generated variants must not pollute or indefinitely expand topic progress");
assert.equal(progress["skill:magnification"].seen,10);
fresh.start("magnification");assert.equal(fresh.state().index,0,"Repeat practice should start a fresh set");
assert.notEqual(fresh.state().queue[0],before.queue[0]);
fresh.api.pause();fresh.route("skills");assert(fresh.main.innerHTML.includes("Resume practice"));
assert.equal(fresh.api.questionCount,580,"Fixed knowledge bank count must remain honest");
assert.equal(fresh.api.stats("f170").seen,0,"Skill performance must stay separate from topic coverage");
console.log("Human Biology skills checks passed: 14 families, 22,400 seeded tasks, arithmetic, adaptive support, full reload/resume, ten-question sets and separate local history.");

import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const read=p=>readFileSync("public/"+p,"utf8");
const memory=new Map(),listeners={},elements={};
const main={innerHTML:"",focus(){},querySelector(){return null;}};
function element(id){if(id==="main")return main;return elements[id]||(elements[id]={hidden:id==="leave-dialog",value:"",readOnly:false,focus(){},blur(){},addEventListener(){},querySelector(){return null;}});}
const document={getElementById:element,querySelectorAll(){return [];},addEventListener(name,fn){listeners["doc-"+name]=fn;}};
const location={hash:"#home",assign(x){this.hash=x;}};
const window={scrollTo(){},addEventListener(name,fn){listeners[name]=fn;}};
const localStorage={getItem(k){return memory.has(k)?memory.get(k):null;},setItem(k,v){memory.set(k,String(v));},removeItem(k){memory.delete(k);}};
const ctx=vm.createContext({window,document,location,localStorage,console,Date,Math});
function load(p){vm.runInContext(read(p),ctx,{filename:p});}
load("assets/spaced-review.js");
load("human-biology/content-f170.js");
const D=window.KeystoneHumanData;
assert.match(D.specification,/version 8.*October 2026/);
assert.equal(D.areas.length,4,"All four F170 topic areas must exist");
assert.deepEqual(Array.from(D.areas,a=>a.number),[1,2,3,4]);
const sections=D.areas.flatMap(a=>a.sections),cards=sections.flatMap(s=>s.cards);
assert.equal(sections.length,28,"Expected F170 section coverage");
assert.equal(cards.length,112,"Expected first F170 flashcard bank");
const sectionIds=new Set(),cardIds=new Set();
for(const a of D.areas)for(const s of a.sections){
 assert(!sectionIds.has(s.id),"Duplicate section id "+s.id);sectionIds.add(s.id);
 assert(s.title&&s.summary&&s.points.length>=3&&s.scenario.prompt&&s.scenario.answer);
 assert(s.cards.length>=4,"Too few cards: "+s.id);
 for(const c of s.cards){
  assert(!cardIds.has(c.id),"Duplicate card id "+c.id);cardIds.add(c.id);
  assert(typeof c.q==="string"&&c.q.length>8);
  assert(typeof c.a==="string"&&c.a.length>0);
  assert(Array.isArray(c.aliases));
 }
}
for(const a of D.areas)assert(a.sections.length>=5,"Area has too few sections: "+a.id);
const required=["1.1.1","1.1.2","1.1.3","1.1.4","1.1.5","1.2.1","1.2.2","1.2.3","2.1.1","2.1.2","2.1.3","2.1.4","2.2.1","2.2.2","2.2.3","3.1.1","3.1.2","3.2.1","3.2.2","3.3.1","3.3.2","3.3.3","4.1.1","4.1.2","4.1.3","4.1.4","4.1.5","4.2"];
assert.deepEqual([...sectionIds].sort(),required.slice().sort(),"F170 specification subtopic map differs");
assert(!JSON.stringify(D).match(/set assignment task|complete.*coursework|submit.*NEA/i),"Coursework content detected");
load("human-biology/app.js");
assert.equal(window.KeystoneHumanApp.stats().cards,112);
assert(main.innerHTML.includes("Human Biology")&&main.innerHTML.includes("F170 learning pilot"),"Overview failed");
location.hash="#topics";listeners.hashchange();
assert(main.innerHTML.includes("Explore the specification")&&main.innerHTML.includes("Basics of microbiology"));
location.hash="#area/area-2";listeners.hashchange();
assert(main.innerHTML.includes("Measuring system activity")&&main.innerHTML.includes("Transplants and artificial organs"));
location.hash="#learn/3.2.1";listeners.hashchange();
assert(main.innerHTML.includes("Nodes of Ranvier")&&main.innerHTML.includes("Apply to a question"));
location.hash="#flashcards";listeners.hashchange();
assert(main.innerHTML.includes("Review due cards")&&main.innerHTML.includes("Learn new cards"));
location.hash="#practice";listeners.hashchange();
assert(main.innerHTML.includes("Start mixed practice"));
location.hash="#cards/area-4";listeners.hashchange();
assert(main.innerHTML.includes("Recall the biology"),"Flashcard session failed to start");
assert(memory.has("narajos-human-biology-session-v1"),"Flashcard session is not saved");
assert.equal(window.KeystoneHumanApp.stats().seen,0,"New cards should not be marked completed");
assert.notEqual(window.KeystoneReview.open("ocr-human-biology-f170").storageKey,window.KeystoneReview.open("aqa-alevel-biology-7402").storageKey,"Course review histories must be isolated");
console.log("Human Biology checks passed: 4 topic areas, 28 sections, 112 cards, 28 original application prompts; routes, progress isolation and session storage verified.");

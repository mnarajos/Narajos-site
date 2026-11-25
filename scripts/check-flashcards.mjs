import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const root="public/";
function read(path){return readFileSync(root+path,"utf8");}
const data=new Map();
const elements={};
function el(id){return elements[id]||(elements[id]={checked:false,hidden:false,value:"",readOnly:false,focus(){},click(){if(this.onclick)this.onclick();}});}
const box={
 window:{},localStorage:{
  getItem(k){return data.get(k)||null;},setItem(k,v){data.set(k,v);},removeItem(k){data.delete(k);}
 },
 document:{getElementById:el},console
};
const context=vm.createContext(box);
function load(path){vm.runInContext(read(path),context,{filename:path});}
load("assets/learning-feedback.js");
load("assets/spaced-review.js");
load("gcse/cards-biology.js");
load("gcse/cards-chemistry.js");
load("gcse/cards-physics.js");
load("gcse/flashcards-app.js");
load("alevel/spaced-review-app.js");
const decks=box.window.KeystoneGcseDecks;
const topics=["b1","b2","b3","b4","b5","b6","b7","c1","c2","c3","c4","c5","c6","c7","c8","c9","c10","p1","p2","p3","p4","p5","p6","p7"];
assert.deepEqual(Object.keys(decks).sort(),topics.slice().sort(),"All 24 Trilogy topics must have cards");
const count=topics.reduce((sum,topic)=>{
 const rows=decks[topic];assert(rows.length>=9,"Too few cards for "+topic);
 rows.forEach((row,i)=>{
  assert(typeof row[0]==="string"&&row[0].length>7&&row[0].length<175,"Invalid prompt "+topic+" "+i);
  assert(typeof row[1]==="string"&&row[1].length>0&&row[1].length<175,"Invalid answer "+topic+" "+i);
  if(row[3])assert(row[3]==="H","Unrecognised tier");
  if(row[2])assert(Array.isArray(row[2]),"Alternatives must be array");
 });
 return sum+rows.length;
},0);
assert(count>=240,"Expected at least 240 starter flashcards");
const engine=box.window.KeystoneReview.open("test");
assert.equal(engine.stats(["a","b"]).new,2);
const t0=1730000000000;
engine.mark("a",false,t0);
assert(engine.weak("a"),"Incorrect answer not flagged weak");
engine.mark("a",true,t0+1000);
assert.equal(engine.get("a").stage,1);
engine.mark("a",true,t0+2000);
assert.equal(engine.get("a").stage,1,"Same-day repeat should not advance review stage");
engine.mark("a",true,t0+86400000+2000);
assert.equal(engine.get("a").stage,2);
engine.mark("a",true,t0+4*86400000+2000);
assert.equal(engine.get("a").stage,3);
assert.equal(engine.stats(["a"],t0+4*86400000+2000).retained,1);
assert(engine.matches("S","S phase",["S"]),"Explicitly approved alias not accepted");
assert(!engine.matches("ion","iron",[]),"Unsafe fuzzy acceptance");
assert(!engine.matches("H+","H-",[]),"Meaningful chemical charges should not be normalised away");
const co=Object.values(decks).flat().find(row=>row[1]==="Carbon monoxide");
for(const answer of ["CO","carbon monoxide"])assert(engine.matches(answer,co[1],co[2]));
for(const answer of ["Co","co","CO₂"])assert(!engine.matches(answer,co[1],co[2]));
assert(!engine.matches("j","Joule",["J"]));assert(engine.matches("J","Joule",["J"]));
const oldReview={first:{one:true,two:false}};
assert.match(box.window.KeystoneReview.firstReviewText(oldReview),/2 earlier ratings/);
// Mock presentation scaffolding: menu, session, reveal and rating must all run.
const SCI=[
 {name:"Biology",topics:topics.filter(x=>x.startsWith("b")).map(x=>[x,"","Biology "+x])},
 {name:"Chemistry",topics:topics.filter(x=>x.startsWith("c")).map(x=>[x,"","Chemistry "+x])},
 {name:"Physics",topics:topics.filter(x=>x.startsWith("p")).map(x=>[x,"","Physics "+x])}
];
const PAPERS=["b1","b2","c1","c2","p1","p2"].map(id=>({id,name:id.toUpperCase()+" paper",topics: id[0]==="b"?(id==="b1"?["b1","b2","b3","b4"]:["b5","b6","b7"]):id[0]==="c"?(id==="c1"?["c1","c2","c3","c4","c5"]:["c6","c7","c8","c9","c10"]):(id==="p1"?["p1","p2","p3","p4"]:["p5","p6","p7"])}));
let last="",guards=0;
const display=(html)=>{last=html;};
const GCSE=box.window.KeystoneGcseFlash.create({
 SCI,PAPERS,render:display,esc:s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;"),
 getTier:()=>"FH",pushGuard:()=>{guards++;}
});
assert.equal(GCSE.count(),count);
GCSE.route("flashcards");
assert(last.includes("Review for today")&&last.includes("paperflash-b1"));
GCSE.route("cards-b1");
assert(GCSE.isActive()&&last.includes("Reveal answer")&&guards>0);
el("kr-reveal").click();
assert.equal(el("kr-result").hidden,false);
el("kr-good").click();
assert(box.window.KeystoneReview.open("gcse-trilogy-8464").stats(Array.from({length:11},(_,i)=>"b1-"+String(i+1).padStart(3,"0"))).seen>=1);
// Test reverse prompt generation as a real review session preference.
GCSE.route("flashcards");el("kr-reverse").checked=true;el("kr-reverse").onchange();
GCSE.route("cards-b1");
assert(last.includes("Flashcard review")&&GCSE.isActive());
// A-level: previously existing deck references contribute to the same engine.
const a1=[["Definition of mitochondrion","mitochondrion",[],1],["Definition of allele","allele",[],1]];
const A=box.window.KeystoneAlevelReview.create({CARDS:{a1},render:display,esc:s=>s,fmt:s=>s,guardOn:()=>{guards++;}});
assert.equal(A.count(),2);
A.trackExisting("a1",a1[0],false,false);
assert.equal(A.progress().weak,1);
A.route("spaced");assert(last.includes("Spaced flashcard review"));
A.route("spaced-new");assert(A.isActive()&&last.includes("Reveal answer"));
el("kr-reveal").click();el("kr-good").click();
assert.match(last,/data-learning-feedback="complete"[^>]*>.*Review complete/);
console.log("Flashcard checks passed:",count,"GCSE cards across",topics.length,"topics; scheduler, aliases and review controls verified.");

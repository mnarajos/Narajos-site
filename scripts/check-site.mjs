import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";

// Dependency-free static verification. Browser interaction and visual tests remain manual.
const root=path.resolve("public");
const failures=[];
const requireTrue=(condition,message)=>{if(!condition)failures.push(message);};
const read=relative=>readFileSync(path.join(root,relative),"utf8");
const fileList=[];
function walk(directory){
 for(const name of readdirSync(directory)){
  const full=path.join(directory,name);
  if(statSync(full).isDirectory())walk(full);
  else fileList.push(full);
 }
}
walk(root);
const htmlFiles=fileList.filter(f=>f.endsWith(".html"));
const required=[
 "index.html","gcse/index.html","alevel/index.html","teacher/index.html",
 "teaching/index.html","teaching/simulations/index.html","privacy/index.html"
];
for(const p of required)requireTrue(existsSync(path.join(root,p)),"Missing public page: "+p);
const simSlugs=["enzyme-kinetics","enzyme-inhibition","molecular-biology","bioenergetics","cardiac-cycle"];
for(const slug of simSlugs)requireTrue(existsSync(path.join(root,"teaching/simulations",slug,"index.html")),"Missing simulation: "+slug);
let scriptCount=0,linkCount=0;
for(const full of htmlFiles){
 const relative=path.relative(root,full).replaceAll(path.sep,"/");
 const html=readFileSync(full,"utf8");
 requireTrue(/<html\b[^>]*lang="en(?:-GB)?"/i.test(html),"Missing English language attribute: "+relative);
 requireTrue(/<title>[^<]+<\/title>/i.test(html),"Missing page title: "+relative);
 requireTrue(/<meta[^>]*name="viewport"/i.test(html),"Missing viewport meta: "+relative);
 // Script syntax only: never execute untrusted page code in tests.
 const withoutScripts=html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi,(_all,attrs,code)=>{
  const type=/\btype\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1]||"";
  if(!/\bsrc\s*=/.test(attrs)&&!type.includes("json")&&type!=="module"&&code.trim()){
   scriptCount++;
   try{new vm.Script(code,{filename:relative});}
   catch(e){failures.push("Script parse error in "+relative+": "+e.message);}
  }
  return "";
 });
 // Local absolute hrefs must point to files or folders with an index.
 const links=[...withoutScripts.matchAll(/<a\b[^>]*\bhref=["'](\/[^"']*)["']/gi)].map(m=>m[1]);
 for(const href of links){
  linkCount++;
  const urlPath=href.split(/[?#]/,1)[0];
  if(urlPath.includes("{")||urlPath.includes("$"))continue;
  const target=path.join(root,decodeURIComponent(urlPath).replace(/^\/+/,""));
  requireTrue(existsSync(target)||(existsSync(path.join(target,"index.html"))),"Broken internal link in "+relative+": "+href);
 }
 if(relative.startsWith("teaching/simulations/")&&relative!=="teaching/simulations/index.html"){
  requireTrue(html.includes('class="sim-utility-nav"'),"Missing shared simulation navigation: "+relative);
  requireTrue(/<h1\b/.test(html),"Missing primary heading: "+relative);
 }
}
const home=read("index.html"),teacher=read("teacher/index.html");
const alevel=read("alevel/index.html"),gcse=read("gcse/index.html");
requireTrue(home.includes("nav-short"),"Homepage mobile labels missing");
requireTrue(home.includes("Focused Questions"),"Teacher tool not discoverable from homepage");
requireTrue(teacher.includes('href="/" aria-label="Return to Narajos homepage"'),"Focused Questions return link missing");
requireTrue(teacher.includes("function saveDraft()")&&teacher.includes("function restoreDraft()"),"Focused Questions draft recovery missing");
requireTrue(teacher.includes("function printSheet(answers)"),"Focused Questions print option missing");
requireTrue(teacher.includes("Topic you’re teaching"),"Teacher topic label missing");
requireTrue(teacher.includes("No assumption about another school"),"Incorrect date-based default topic");
for(const [name,html] of [["GCSE",gcse],["A-level",alevel]]){
 requireTrue(html.includes('class="site-home"'),name+" main site return link missing");
 requireTrue(html.includes("function siteLeavePrompt("),name+" leave confirmation missing");
 requireTrue(html.includes("beforeunload"),name+" browser exit protection missing");
}
requireTrue(alevel.includes('"The stage of the cell cycle in which DNA replicates","S phase",["interphase","synthesis phase","S phase of interphase","S"]'),"A-level S phase or S answer missing");
requireTrue(existsSync(path.join(root,"assets/site.css")),"Site CSS missing");
requireTrue(existsSync(path.join(root,"assets/simulation-shell.css")),"Simulation shell CSS missing");

if(failures.length){
 console.error("Website check failed ("+failures.length+" issue(s)):");
 for(const f of failures)console.error(" - "+f);
 process.exitCode=1;
}else{
 console.log("Website check passed: "+htmlFiles.length+" pages, "+scriptCount+" inline scripts parsed, "+linkCount+" local links checked.");
}

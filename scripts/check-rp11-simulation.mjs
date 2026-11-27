import { chromium, firefox, webkit } from 'playwright';
import assert from 'node:assert/strict';
import axe from 'axe-core';
import { mkdir } from 'node:fs/promises';
import { servePublic } from './browser-test-site.mjs';

const {server,base}=await servePublic();
const engineName=process.argv[2]||'chromium';
const capture=engineName==='chromium'&&process.env.RP11_CAPTURE_SCREENSHOTS==='1';
const engine={chromium,firefox,webkit}[engineName];
assert(engine,`Unsupported browser: ${engineName}`);
const browser=await engine.launch({headless:true});
const page=await browser.newPage({viewport:{width:1280,height:900},reducedMotion:'reduce'});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
const url=base+'/alevel/glucose-calibration/';
await page.addInitScript(()=>{const seed=sessionStorage.getItem('rp11-test-seed');if(seed){if(seed==='clear')localStorage.clear();else localStorage.setItem('kst-rp11-v3',seed);sessionStorage.removeItem('rp11-test-seed');}});
const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('kst-rp11-v3')));
const fresh=async()=>{await page.evaluate(()=>sessionStorage.setItem('rp11-test-seed','clear'));await page.reload();};
const waitRun=async n=>page.waitForFunction(n=>JSON.parse(localStorage.getItem('kst-rp11-v3')||'{}').runs?.length>=n,n,{timeout:15000});
const next=async()=>page.locator('#tasks [data-act="adv"]').click();
const choose=async(name,value)=>page.locator(`#tasks input[name="${name}"][value="${value}"]`).check();
const check=async()=>page.locator('#tasks [data-act="check"]').click();
const chooseSetting=async(p,name,value)=>{const input=p.locator(`input[name="${name}"][value="${value}"]`);await input.locator('..').click();assert(await input.isChecked(),`${name} should select ${value}`);};
async function seedTask(sectionIndex,taskIndex,variant=0){
 await page.evaluate(({sectionIndex,taskIndex,variant})=>{
  const d=JSON.parse(localStorage.getItem('kst-rp11-v3'));
  const sections=window.__rp11.SECTIONS,sec=sections[sectionIndex];
  d.st={area:sec.area,sec:sectionIndex,res:{},adv:{},pick:{},vr:{},wr:{},lock:{},hint:{},txt:{},self:{},seen:{},bind:{},peek:{},rt:{},tried:{},lost:{}};
  d.runs=[];d.cid=0;d.ui={settings:window.__rp11.CSTD,speed:'fast',line:'none',axis:'A',guides:false};
  for(const t of sec.tasks.slice(0,taskIndex)){
   d.st.adv[t.id]=true;
   if(t.type==='predict'||t.type==='run'){
    const r=window.__rp11.simRun(t.need,91);r.id=++d.cid;d.runs.push(r);d.st.seen[t.id]=r;
   }
  }
  d.st.vr[sec.tasks[taskIndex].id]=variant;
  sessionStorage.setItem('rp11-test-seed',JSON.stringify(d));
 },{sectionIndex,taskIndex,variant});
 await page.reload();
}
try {
 await page.goto(url);await fresh();
 // A previously saved run keeps its readings and assessment evidence under the new labels.
 const oldReadings=await page.evaluate(()=>{
  const d=JSON.parse(localStorage.getItem('kst-rp11-v3')),r=window.__rp11.simRun(window.__rp11.CSTD,27),old={Katniss:'Tom',Arya:'Dick',Carrie:'Harry'};
  r.id=7;r.unk.forEach(u=>{u.n=old[u.n]||u.n;});d.runs=[r];d.cid=7;d.st.area='core';d.st.sec=0;
  for(const id of ['c1','c2','c3','c4','c5'])d.st.adv[id]=true;
  d.st.res.c3='sup';d.st.seen.c3=structuredClone(r);d.st.refs={h3:structuredClone(r)};d.st.bind.c6=7;
  d.st.txt['c6:0']='4.2';d.st.txt.a9='Dick is a name in my own draft.';d.st.wr['c6:0']="That is Harry's sample.";
  sessionStorage.setItem('rp11-test-seed',JSON.stringify(d));return JSON.parse(JSON.stringify(r.unk.map(({c,A,df})=>({c,A,df}))));
 });
 await page.reload();let migrated=await state();
 assert.deepEqual(migrated.runs[0].unk.map(u=>u.n),['Katniss','Arya','Carrie']);
 assert.deepEqual(migrated.runs[0].unk.map(({c,A,df})=>({c,A,df})),oldReadings);
 assert.deepEqual(migrated.st.seen.c3.unk.map(u=>u.n),['Katniss','Arya','Carrie']);assert.deepEqual(migrated.st.refs.h3.unk.map(u=>u.n),['Katniss','Arya','Carrie']);
 assert.equal(migrated.st.bind.c6,7);assert.equal(migrated.st.txt['c6:0'],'4.2');assert.equal(migrated.st.txt.a9,'Dick is a name in my own draft.');assert.equal(migrated.st.wr['c6:0'],"That is Carrie's sample.");
 assert.match(await page.locator('#task-c6').innerText(),/Arya/);assert.match(await page.locator('#results').innerText(),/Katniss/);assert.match(await page.locator('#results').innerText(),/Carrie/);
 await fresh();
 const names=await page.evaluate(()=>window.__rp11.simRun(window.__rp11.CSTD,1).unk.map(({n,c})=>[n,c]));assert.deepEqual(names,[['Katniss',0],['Arya',5],['Carrie',8]]);
 // The longer names must not overlap on the live apparatus.
 const labels=await page.locator('#csvg .t-lab').evaluateAll(nodes=>nodes.slice(6,9).map(n=>{const b=n.getBBox();return {x:b.x,y:b.y,w:b.width,h:b.height}}));
 for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){const a=labels[i],b=labels[j];assert(a.x+a.w<=b.x||b.x+b.w<=a.x||a.y+a.h<=b.y||b.y+b.h<=a.y,'Sample labels overlap on the apparatus');}
 assert.match(await page.locator('#tasks').innerText(),/Task 1 of 8/);
 assert.equal(await page.locator('#cadvw').evaluate(el=>el.open),false);
 await next();
 await page.locator('#in-c2').fill('0.8');await page.locator('[data-act="num"]').click();
 assert.match(await page.locator('#tasks').innerText(),/volume of water/);
 await page.locator('#in-c2').fill('1.2');await page.locator('[data-act="num"]').click();
 assert.equal((await state()).st.res.c2,'sup');await next();
 await choose('c3o',2);await choose('c3r',0);await page.locator('[data-act="lock"]').click();
 await page.locator('#call').click();await waitRun(1);
 assert.match(await page.locator('#tasks').innerText(),/Correct your prediction/);
 assert.equal(await page.locator('#tasks [data-act="adv"]').count(),0);
 await choose('c3co',0);await page.locator('[data-act="corr"]').click();
 assert.equal((await state()).st.res.c3,'sup');await next();
 for(let i=0;i<6;i++)await page.locator(`#tasks input[data-multi="c4"][value="${i}"]`).check();
 await page.locator('[data-act="multi"]').click();assert.equal((await state()).st.res.c4,'ind');await next();
 await chooseSetting(page,'gline','curve');await page.locator('[data-act="ctl"]').click();await next();
 let s=await state(),first=s.st.bind.c6;assert.equal(first,1);
 const oldQuestion=await page.locator('#task-c6').innerText();
 await page.emulateMedia({reducedMotion:'no-preference'});await chooseSetting(page,'speed','fast');await page.locator('#call').click();
 await page.waitForFunction(()=>document.querySelector('#cstate')?.textContent==='Measuring',null,{timeout:25000});assert.match(await page.locator('#gnote').innerText(),/graph remains linked to the current question/);assert.match(await page.locator('#gnote').innerText(),/Showing run 1/);
 await page.emulateMedia({reducedMotion:'reduce'});await waitRun(2);
 assert.equal((await state()).st.bind.c6,first);
 assert.match(await page.locator('#task-c6').innerText(),/Using run 1/);
 assert((await page.locator('#task-c6').innerText()).includes(oldQuestion.split('Read Arya\'s glucose concentration')[1].split('Your answer')[0]));
 assert.equal(await page.locator('#runsel').isDisabled(),true);
 if(capture){
  await page.locator('#gfig').scrollIntoViewIfNeeded();await page.screenshot({path:'docs/required-practicals/rp11-graph-desktop.png'});
  await page.setViewportSize({width:390,height:844});await page.locator('#tasks').scrollIntoViewIfNeeded();await page.screenshot({path:'docs/required-practicals/rp11-question-phone.png'});await page.setViewportSize({width:1280,height:900});
 }
 await page.locator('#gguide').click();await page.locator('#gguide').click();assert.equal((await state()).st.peek.c6,1);await page.locator('[data-act="rebind"]').click();assert.equal((await state()).st.tried.c6,1);assert.equal((await state()).st.bind.c6,2);
 const answer=await page.evaluate(()=>{const d=JSON.parse(localStorage.getItem('kst-rp11-v3'));const r=d.runs.find(x=>x.id===d.st.bind.c6),u=r.unk.find(x=>x.n==='Arya');return window.__rp11.readOff(r,u.A,'curve','A').toFixed(1)});
 await page.locator('#in-c6').fill(answer);await page.locator('[data-act="num"]').click();assert.equal((await state()).st.res.c6,'sup');
 const feedback=await page.locator('#task-c6 .fb.good').innerText();await page.locator('#call').click();await waitRun(3);await page.reload();
 assert.equal((await state()).st.bind.c6,2);assert.equal(await page.locator('#task-c6 .fb.good').innerText(),feedback);
 // Pinned evidence is kept when older unbound runs are trimmed.
 await page.evaluate(()=>{const d=JSON.parse(localStorage.getItem('kst-rp11-v3')),r=d.runs[0];for(let id=4;id<=35;id++)d.runs.push({...r,id});d.cid=35;sessionStorage.setItem('rp11-test-seed',JSON.stringify(d));});
 await page.reload();await page.locator('#call').click();await page.waitForFunction(()=>JSON.parse(localStorage.getItem('kst-rp11-v3')).cid>=36);
 s=await state();assert(s.runs.some(r=>r.id===2));assert(s.runs.length<=30);assert.equal(s.st.bind.c6,2);await page.reload();assert.equal(await page.locator('#task-c6 .fb.good').innerText(),feedback);await next();
 await choose('c7:0',0);await check();await next();await choose('c8:0',0);await check();await next();
 assert.match(await page.locator('#tasks').innerText(),/complete/i);
 assert(!/all sections complete/i.test(await page.locator('#tasks').innerText()));

 // The mathematical model: independently calculated volume and concentration expectations.
 const facts=await page.evaluate(()=>{
  const m=window.__rp11,base=m.CSTD,q=m.QSTD;
  const run=(o,seed=44)=>m.simRun({...base,...o},seed);
  const normal=run({}),serial=run({dil:'serial'}),spill=run({dil:'serial',pip:'slip'}),mistake=run({pip:'slip'}),narrow=run({dil:'custom',urine:'yz'}),quant=m.simRun(q,44),orange=m.simRun({...q,filt:'600'},44),zero=m.simRun({...q,blank:'zero'},44),water=run({blank:'water'}),bad=m.simRun({...q,tech:'bad'},44),late=run({heat:'late'}),high=run({urine:'x'}),x2=run({urine:'x2'}),z4=run({urine:'yz4'});
  const poor=structuredClone(normal);poor.std[2].A+=.6;const arya=normal.unk.find(x=>x.n==='Arya');return {normal,serial,spill,mistake,narrow,quant,orange,zero,water,bad,late,high,x2,z4,T:m.gT(.3),poorResult:m.readOff(poor,arya.A,'curve','A'),straightResult:m.readOff(normal,arya.A,'straight','A'),readA:m.readOff(normal,arya.A,'curve','A'),readT:m.readOff(normal,arya.A,'curve','T'),highResult:m.readOff(high,high.unk.find(x=>x.n==='X').A,'curve','A'),badResult:m.readOff(bad,bad.unk[1].A,'curve','A'),xResult:m.readOff(x2,x2.unk.find(x=>x.n==='X ÷ 2').A,'curve','A'),zResult:m.readOff(z4,z4.unk.find(x=>x.n==='Z ÷ 4').A,'curve','A')};
 });
 const close=(a,b,t=1e-6)=>assert(Math.abs(a-b)<=t,`${a} not close to ${b}`);
 facts.normal.std.forEach(p=>{close(p.conc,p.c);close(p.vol,2)});
 facts.serial.std.forEach(p=>{close(p.conc,p.c);close(p.vol,2)});
 close(facts.mistake.std[1].conc,1.111111,1e-5);close(facts.mistake.std[1].vol,1.8);
 close(facts.spill.std[3].conc,1.6666667,1e-5);close(facts.spill.std[3].vol,1);
 close(facts.spill.std[2].conc,.8333333,1e-5);close(facts.spill.std[1].conc,.4166667,1e-5);
 facts.narrow.std.forEach((p,i)=>{close(p.c,i*.5);close(p.conc,p.c);close(p.vol,2)});
 assert(facts.normal.std[5].A>facts.normal.std[0].A);assert(facts.quant.std[5].A<facts.quant.std[0].A);
 assert(facts.quant.std[0].A>facts.orange.std[0].A);assert(facts.zero.std[5].A<0);
 assert(facts.water.std[0].A>facts.normal.std[0].A);assert(facts.bad.std[5].A>facts.quant.std[5].A+.1);assert(facts.late.unk[1].A<facts.normal.unk[1].A);assert(facts.badResult===null);assert(facts.highResult===null);assert(facts.poorResult===null);assert(facts.straightResult===null);close(facts.readA,facts.readT,1e-5);
 close(facts.T,50.1187,.001);close(facts.xResult*2,15,2);close(facts.zResult*4,17,2);

 // Independent Explore and Apply, including interrupted settings and a written draft.
 await fresh();
 await page.locator('[data-area="explore"]').click();assert.equal(await page.locator('.vcard').count(),9);assert.equal(await page.locator('.col-app').isVisible(),false);
 await page.locator('[data-area="apply"]').click();assert.match(await page.locator('#tasks').innerText(),/Task 1 of 9/);
 for(const id of ['a1','a3']){
  if(id==='a3'){await choose('a2:0',0);await check();await next();}
  const answer=await page.evaluate(id=>window.__rp11.SECTIONS[10].tasks.find(t=>t.id===id).v[0].ans(),id);
  await page.locator(`#in-${id}`).fill(String(answer));await page.locator('[data-act="num"]').click();await next();
 }
 for(let i=0;i<4;i++)await page.locator(`#tasks input[data-multi="a4"][value="${i}"]`).check();
 await page.locator('[data-act="multi"]').click();await next();await page.locator('#in-a5').fill('0.02');await page.locator('[data-act="num"]').click();await next();
 for(const id of ['a6','a7']){await choose(`${id}:0`,0);await check();await next();}
 for(let i=0;i<4;i++)await page.locator(`#tasks input[data-multi="a8"][value="${i}"]`).check();await page.locator('[data-act="multi"]').click();await next();
 await page.locator('#wr-a9').fill('This is a partly written response about uncertainty.');await page.reload();assert.equal(await page.locator('#wr-a9').inputValue(),'This is a partly written response about uncertainty.');
 await page.locator('[data-act="write"]').click();assert.match(await page.locator('#tasks').innerText(),/not marked automatically/);await page.locator('[data-self="a9"]').first().check();await page.locator('[data-act="selfdone"]').click();await next();
 assert.match(await page.locator('#tasks').innerText(),/complete/i);assert(!/all sections complete/i.test(await page.locator('#tasks').innerText()));assert.equal((await state()).runs.length,0);assert.equal((await state()).st.adv.c1,undefined);

 // A real interruption preserves selected conditions and does not invent readings. The enlarged apparatus follows the live run.
 const live=await browser.newPage({viewport:{width:1000,height:850},reducedMotion:'no-preference'});const liveErrors=[];live.on('pageerror',e=>liveErrors.push(e.message));
 await live.goto(url);await live.locator('#cadvw summary').click();await chooseSetting(live,'ben','quant');await chooseSetting(live,'dil','serial');
 await live.locator('#call').click();await live.locator('#csvg + .diagram-zoom').click();const before=await live.locator('#zoom-content svg').innerHTML();await live.waitForTimeout(500);const after=await live.locator('#zoom-content svg').innerHTML();assert.notEqual(after,before);await live.keyboard.press('Escape');assert.equal(await live.locator('#zoom-dialog').evaluate(el=>el.open),false);
 await live.reload();assert.match(await live.locator('#cnote').innerText(),/interrupted/);const interrupted=await live.evaluate(()=>JSON.parse(localStorage.getItem('kst-rp11-v3')));assert.equal(interrupted.runs.length,0);assert.equal(interrupted.ui.settings.ben,'quant');assert.equal(interrupted.ui.settings.dil,'serial');assert.deepEqual(liveErrors,[]);await live.close();

 // All authored MCQ distractors must show their own option-specific feedback, in every variant.
 const questions=await page.evaluate(()=>window.__rp11.SECTIONS.flatMap((s,si)=>s.tasks.flatMap((t,ti)=>t.type==='mcq'?t.v.map((v,vi)=>({si,ti,vi,id:t.id,opts:v.opts.map(o=>({ok:o.ok,fb:o.fb}))})):[])));
 const lengthAudit=await page.evaluate(()=>window.__rp11.SECTIONS.flatMap(s=>s.tasks.flatMap(t=>t.type==='mcq'?t.v.map(v=>v.opts):t.type==='predict'?[t.out,t.why]:[])).map(opts=>({correct:opts.find(o=>o.ok).t.length,lengths:opts.map(o=>o.t.length)})));
 const longest=lengthAudit.filter(x=>x.correct===Math.max(...x.lengths)&&x.lengths.filter(n=>n===x.correct).length===1).length;
 assert(longest/lengthAudit.length<.35,'Correct options must not systematically be the longest');
 let paths=0;
 for(const q of questions){for(let i=0;i<q.opts.length;i++)if(!q.opts[i].ok){
  assert(q.opts[i].fb,`Missing feedback ${q.id} ${q.vi} ${i}`);await seedTask(q.si,q.ti,q.vi);await choose(`${q.id}:${q.vi}`,i);await check();
  assert((await page.locator('#tasks .fb.bad').innerText()).includes(q.opts[i].fb),`Wrong feedback ${q.id} ${q.vi} ${i}`);paths++;
 }}
 // Numerical misconception paths are evaluated against the selected question variant and its bound run.
 const numbers=await page.evaluate(()=>window.__rp11.SECTIONS.flatMap((sec,si)=>sec.tasks.flatMap((t,ti)=>{
  if(t.type!=='num')return [];const run=t.m?window.__rp11.simRun(t.need,61):null;
  return (t.v||[t]).map((v,vi)=>({si,ti,vi,id:t.id,run,answer:v.ans(run),tol:t.rel?Math.abs(v.ans(run))*t.rel:t.tol,errs:v.errs?v.errs(run):[]}));
 })));
 let numericPaths=0;
 for(const q of numbers)for(const [value,expected] of q.errs){
  if(value==null||!Number.isFinite(value)||q.answer==null||Math.abs(value-q.answer)<=q.tol+1e-12)continue;
  const first=q.errs.find(([x])=>x!=null&&Math.abs(value-x)<=Math.max(q.tol,Math.abs(x)*.02)+1e-12);
  if(first[1]!==expected)continue;
  await seedTask(q.si,q.ti,q.vi);
  if(q.run)await page.evaluate(q=>{const d=JSON.parse(localStorage.getItem('kst-rp11-v3'));const r={...q.run,id:++d.cid};d.runs.push(r);d.st.bind[q.id]=r.id;d.ui.settings=r.s;sessionStorage.setItem('rp11-test-seed',JSON.stringify(d));},q);
  if(q.run)await page.reload();await page.locator(`#in-${q.id}`).fill(String(value));await page.locator('[data-act="num"]').click();
  assert((await page.locator('#tasks .fb.bad').innerText()).includes(expected),`Wrong numerical feedback ${q.id} ${q.vi}: ${value}`);numericPaths++;
 }
 // Prediction distractors are observed before a checked correction can count.
 const predictions=await page.evaluate(()=>window.__rp11.SECTIONS.flatMap((s,si)=>s.tasks.flatMap((t,ti)=>t.type==='predict'?[{si,ti,id:t.id,out:t.out.map(o=>({ok:o.ok,fb:o.fb})),why:t.why.map(o=>({ok:o.ok,fb:o.fb}))}]:[])));
 let predictionPaths=0;
 for(const q of predictions)for(const kind of ['out','why'])for(let i=0;i<q[kind].length;i++)if(!q[kind][i].ok){
  await seedTask(q.si,q.ti);await page.evaluate(({q,kind,i})=>{const d=JSON.parse(localStorage.getItem('kst-rp11-v3')),t=window.__rp11.SECTIONS[q.si].tasks[q.ti],r=window.__rp11.simRun(t.need,123);r.id=++d.cid;d.runs.push(r);d.st.seen[t.id]=r;d.st.lock[t.id]=0;d.st.pick[t.id+'o']=kind==='out'?i:0;d.st.pick[t.id+'r']=kind==='why'?i:0;sessionStorage.setItem('rp11-test-seed',JSON.stringify(d));},{q,kind,i});
  await page.reload();assert((await page.locator('#tasks .fb.bad').innerText()).includes(q[kind][i].fb),`Wrong prediction feedback ${q.id} ${kind} ${i}`);
  assert.equal(await page.locator('#tasks [data-act="adv"]').count(),0);await choose(q.id+(kind==='out'?'co':'cr'),0);await page.locator('[data-act="corr"]').click();assert.equal((await state()).st.res[q.id],'sup');predictionPaths++;
 }
 // Custom ranges use real preparation volumes and survive a reload.
 await fresh();await page.locator('#cadvw summary').click();await chooseSetting(page,'dil','custom');
 for(const bad of ['1,2,3,4,5,6','0,1,1,2,3,4','0,0.03,1,2,3,4','0,2,4,6,8,11']){await page.locator('#custom-values').fill(bad);await page.locator('#custom-apply').click();assert.match(await page.locator('#custom-error').innerText(),/six increasing values/);}
 await page.locator('#custom-values').fill('0,0.4,0.8,1.2,1.6,2');await page.locator('#custom-apply').click();await page.reload();
 assert.equal((await state()).ui.settings.cst,'0,0.4,0.8,1.2,1.6,2');
 const custom=await page.evaluate(()=>window.__rp11.simRun({...window.__rp11.CSTD,dil:'custom',cst:JSON.parse(localStorage.getItem('kst-rp11-v3')).ui.settings.cst},17));
 custom.std.forEach((point,i)=>{close(point.c,i*.4);close(point.conc,point.c);close(point.vol,2)});

 // A diagram that already displays construction lines cannot earn an independent badge.
 await seedTask(7,0);const guided=await page.evaluate(()=>window.__rp11.SECTIONS[7].tasks[0].v[0].ans());await page.locator('#in-l1').fill(String(guided));await page.locator('[data-act="num"]').click();assert.equal((await state()).st.res.l1,'sup');

 // Variant-specific calculation help must refer to the actual dilution.
 await seedTask(2,0,1);await page.locator('#in-s1').fill('4');await page.locator('[data-act="num"]').click();assert.match(await page.locator('#tasks').innerText(),/divides the concentration by 10/);

 // Layout, focus and automated accessibility in representative independent areas.
 await fresh();
 await mkdir('docs/required-practicals',{recursive:true});
 for(const [width,height,name] of [[1280,900,'desktop'],[320,820,'phone']]){
  await page.setViewportSize({width,height});await page.emulateMedia({colorScheme:'light',reducedMotion:'reduce'});await fresh();
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),`${name}: horizontal overflow`);
  if(capture)await page.screenshot({path:`docs/required-practicals/rp11-simulation-${name}.png`,fullPage:true});
  await page.locator('[data-area="explore"]').click();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),`${name}: hub overflow`);
 }
 await page.emulateMedia({colorScheme:'dark',reducedMotion:'reduce'});await page.reload();assert(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor!=='rgb(248, 247, 243)'));
 await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.classList.contains('skip')),true);
 await page.addScriptTag({content:axe.source});const accessibility=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}));});
 assert.deepEqual(accessibility,[]);
 await fresh();await page.addScriptTag({content:axe.source});const coreA11y=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa']}});return r.violations.map(v=>v.id)});assert.deepEqual(coreA11y,[]);
 await page.locator('[data-area="apply"]').click();const applyA11y=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa']}});return r.violations.map(v=>v.id)});assert.deepEqual(applyA11y,[]);
 // Course activity, overview, catch-up and catalogue all provide direct entry points.
 for(const path of ['/alevel/#practical-11','/alevel/#practicals','/alevel/#catchup-a6-glucal']){
  await page.goto(base+path);await page.getByRole('link',{name:'Open the RP11 simulation',exact:true}).first().waitFor();
 }
 await page.goto(base+'/teaching/simulations/');assert.equal(await page.getByRole('link',{name:/Glucose calibration \(RP11\)/}).first().getAttribute('href'),'/alevel/glucose-calibration/');
 assert.deepEqual(errors,[]);
 console.log(`RP11 Core journey, independent Explore and Apply, model calculations, persistence, ${paths} MCQ, ${numericPaths} numerical and ${predictionPaths} prediction distractors, responsive layout and accessibility passed (${engineName}).`);
} finally {await browser.close();server.close();}

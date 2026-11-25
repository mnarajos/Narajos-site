import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import axe from 'axe-core';
import { servePublic } from './browser-test-site.mjs';
const {server,base}=await servePublic();
const browser=await chromium.launch();
const key='keystone.alevel.exam-skills.v1';
const errors=[];
try {
 for(const width of [320,390,1200]) {
  const page=await browser.newPage({viewport:{width,height:850},reducedMotion:'reduce'});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/alevel/#exam-regulation');
  const host=page.locator('section').filter({has:page.getByRole('heading',{name:'Gene expression investigations',exact:true})}).last();
  const check=async label=>{
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),label+' overflow');
   const duplicate=await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(x=>x.id);return ids.filter((v,i)=>ids.indexOf(v)!==i)});
   assert.deepEqual(duplicate,[],label+' duplicate ids');
   await page.addScriptTag({content:axe.source});
   const violations=await page.evaluate(async()=> (await window.axe.run({runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(x=>x.id));
   assert.deepEqual(violations,[],label+' accessibility');
  };
  const data=await page.evaluate(()=>window.ALevelPaperPractice.geneExpression);
  await host.getByRole('button',{name:'Try an independent question'}).click();
  await host.getByRole('heading',{name:data.tasks[1].prompt,exact:true}).waitFor();
  assert.equal(await host.locator('.al-model,.al-criteria').count(),0);
  const text=await host.innerText();
  for(const cue of [...data.tasks[1].points,...data.tasks[1].modelAnswer]) assert(!text.includes(cue));
  await check('independent '+width);
  if (width < 400) {
   const table=host.getByRole('table',{name:data.tasks[1].evidence[0],exact:true});
   assert(await table.evaluate(el=>el.scrollWidth<=el.parentElement.clientWidth));
   assert.deepEqual(await table.locator('tbody tr').allTextContents(), ['CControl1.0 (0.9–1.1)1.0 (0.9–1.1)','CMatching0.3 (0.2–0.4)0.5 (0.4–0.6)','DControl1.0 (0.9–1.1)1.0 (0.9–1.1)','DMatching1.0 (0.9–1.1)1.0 (0.9–1.1)']);
  }
  await host.screenshot({path:`/tmp/gene-independent-${width}.png`});
  const first='First response: RNA may affect protein production.';
  await host.getByRole('textbox',{name:'Your response'}).fill(first);
  await page.reload();
  assert.equal(await host.getByRole('textbox',{name:'Your response'}).inputValue(),first);
  if(width!==320) await host.screenshot({path:`/tmp/gene-response-${width}.png`});
  await host.getByRole('button',{name:'Compare with the checklist'}).click();
  assert.equal(await host.locator('.al-draft-text').innerText(),first);
  await check('review '+width);
  if(width!==320) await host.screenshot({path:`/tmp/gene-review-${width}.png`});
  for(const f of await host.locator('.al-criteria fieldset').all()) await f.getByRole('radio',{name:'Needs work'}).check();
  await host.getByText('Compare with a model explanation',{exact:true}).click();
  await host.getByText('Revise your response',{exact:true}).click();
  const revised=first+' A complementary RNA could lead to mRNA degradation.';
  await host.getByRole('textbox',{name:'Your revised response'}).fill(revised);
  await page.reload();
  assert.equal(await host.locator('.al-draft-text').innerText(),first);
  if (!await host.getByRole('textbox',{name:'Your revised response'}).isVisible()) await host.getByText('Revise your response',{exact:true}).click();
  assert.equal(await host.getByRole('textbox',{name:'Your revised response'}).inputValue(),revised);
  await host.getByRole('button',{name:'Finish review'}).click();
  let saved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).geneExpression,key);
  assert.equal(saved.reviews[1].original,first); assert.equal(saved.drafts[1],revised); assert.equal(saved.outcomes[1],'self-reviewed');
  await host.getByRole('button',{name:'Try a different question'}).click();
  await host.getByRole('heading',{name:data.tasks[2].prompt,exact:true}).waitFor();
  const transferText=await host.innerText();
  for(const cue of [...data.tasks[2].points,...data.tasks[2].modelAnswer]) assert(!transferText.includes(cue));
  assert.equal(await host.locator('.al-model,.al-criteria').count(),0);
  await check('transfer '+width);
  await host.screenshot({path:`/tmp/gene-transfer-${width}.png`});
  const transfer='The environment may affect the gene.';
  await host.getByRole('textbox',{name:'Your response'}).fill(transfer);
  await host.getByRole('button',{name:'Compare with the checklist'}).click();
  for(const f of await host.locator('.al-criteria fieldset').all()) await f.getByRole('radio',{name:'Needs work'}).check();
  await host.getByRole('button',{name:'Finish review'}).click();
  await host.getByRole('button',{name:'Review progress'}).click();
  await host.getByRole('heading',{name:'Review your progress'}).waitFor();
  await page.reload();
  await host.getByRole('heading',{name:'Review your progress'}).waitFor();
  await host.getByText('Read or revise your responses',{exact:true}).click();
  assert(await host.getByText(transfer,{exact:true}).isVisible());
  saved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).geneExpression,key);
  assert.equal(saved.reviews[2].original,transfer); assert.equal(saved.outcomes[2],'self-reviewed');
  await page.close();
 }
 for (const width of [390,1200]) {
 const page=await browser.newPage({viewport:{width,height:850}});
 await page.goto(base+'/alevel/#exam-regulation');
 const host=page.locator('section').filter({has:page.getByRole('heading',{name:'Gene expression investigations',exact:true})}).last();
 const data=await page.evaluate(()=>window.ALevelPaperPractice.geneExpression);
 await host.getByRole('button',{name:'See worked example'}).click();
 if(width===390) {
  const region=host.getByRole('region',{name:data.evidence[0],exact:true});
  assert(await region.evaluate(el=>el.scrollWidth>el.clientWidth && el.tabIndex===0));
  await region.focus(); await page.keyboard.press('ArrowRight');
  await page.waitForFunction(()=>document.querySelector('.al-gene-expression .al-table')?.scrollLeft>0);
  await region.evaluate(el=>{ el.scrollLeft=0; });
 }
 await host.screenshot({path:`/tmp/gene-worked-${width}.png`});
 for(let i=1;i<data.model.length;i++) await host.getByRole('button',{name:'Next step'}).click();
 await host.getByRole('button',{name:'Try with support'}).click();
 await host.getByRole('heading',{name:data.tasks[0].prompt,exact:true}).waitFor();
 await host.getByRole('textbox',{name:'Your response'}).fill('A short supported answer.');
 await host.getByRole('button',{name:'Compare with the checklist'}).click();
 for(const f of await host.locator('.al-criteria fieldset').all()) await f.getByRole('radio',{name:'Needs work'}).check();
 await host.getByRole('button',{name:'Finish review'}).click();
 await host.getByRole('button',{name:'Try a different question'}).click();
 await host.getByRole('heading',{name:data.tasks[1].prompt,exact:true}).waitFor();
 assert.equal(await host.locator('.al-criteria,.al-model').count(),0);
 await page.close();
 }
 assert.deepEqual(errors,[]);
 console.log('Gene expression: direct entry, worked and supported route, unseen transfer, drafts, accessibility and 320/390/1200 layouts passed.');
} finally {await browser.close();await new Promise(done=>server.close(done));}

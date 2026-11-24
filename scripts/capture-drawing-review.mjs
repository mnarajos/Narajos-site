// Render an auditable contact sheet from the same bank and instructions as the live activity.
// Run with Playwright Chromium installed: node scripts/capture-drawing-review.mjs
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';
import { servePublic } from './browser-test-site.mjs';

const destination=resolve('docs/biological-drawing-visual-review');
await mkdir(destination,{recursive:true});
const {server,base}=await servePublic();
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const groups=['epidermis','leaf','buttercup','arterial','buccal','redcell'];
const key='keystone.alevel.exam-skills.v1';
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
try {
  await page.goto(base+'/alevel/#exam-drawings');
  await page.waitForFunction(()=>window.ALevelDrawingBank?.version===4);
  const instructions={};
  for(const id of groups){
    await page.evaluate(({key,id})=>localStorage.setItem(key,JSON.stringify({
      drawingVersion:4,drawingRound:1,drawingSession:{round:0,index:1,attempts:0,helped:false,ids:Array(6).fill(id+'.outline')}
    })),{key,id});
    await page.reload();
    await page.locator('.al-drawing-judgement .al-figures').waitFor();
    instructions[id]=await page.locator('.al-drawing-criteria li').allTextContents();
  }
  const paperInstructions=await page.locator('.al-paper-prompt > p').allTextContents();
  const sheet=await browser.newPage({viewport:{width:1880,height:700},deviceScaleFactor:1});
  await sheet.goto(base+'/alevel/#exam-drawings');
  await sheet.waitForFunction(()=>window.ALevelDrawingBank?.version===4);
  await sheet.evaluate(async ({groups,instructions,paperInstructions})=>{
    const bank=window.ALevelDrawingBank,w=window.ALevelDrawingWorked;
    const sources=[...new Set(bank.specimens.map(s=>'/assets/micrographs/'+s.image).concat('/assets/micrographs/drawing-tiger-frog.webp'))];
    await Promise.all(sources.map(src=>new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=reject;img.src=src;})));
    document.head.innerHTML=`<meta charset="utf-8"><style>
      *{box-sizing:border-box}body{font:17px Arial,sans-serif;color:#17232c;background:white;margin:0}
      h1{font-size:28px;margin:0 0 10px}h2{font-size:24px;margin:0 0 8px}h3{font-size:17px;margin:0 0 8px}
      p{margin:6px 0;line-height:1.35}ul,ol{margin:6px 0;padding-left:24px;line-height:1.3}
      .intro{padding:25px 28px;background:#f4f6f5}.section{padding:22px 28px;border-top:3px solid #b8c4c3}
      .panels{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:12px}
      .pair{grid-template-columns:repeat(2,minmax(0,1fr));max-width:1220px}
      .panel{border:1px solid #aebac1;border-radius:4px;padding:10px;min-width:0;background:white}
      .panel svg{display:block;width:100%;height:auto}.panel svg text{font-family:Arial,sans-serif;font-size:17px;fill:currentColor}
      .detail{width:75%;border:1px solid #aebac1}.small{font-size:14px;color:#45565f}.detail-title{font-weight:bold;font-size:15px;margin-top:10px}
    </style>`;
    document.body.replaceChildren();
    const el=(tag,text,parent,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;parent.append(n);return n};
    const top=el('header','',document.body,'intro');
    el('h1','Biological Drawing · visual contact sheet',top);
    el('p','Each section uses the activity’s actual reference and candidate renders, with its student-facing instructions. The site presents one candidate at a time; the answer-key headings here are for review.',top);
    function panel(parent,title,markup,extra){const p=el('div','',parent,'panel');el('h3',title,p);const art=el('div','',p);art.innerHTML=markup;if(extra){el('p','Vascular region · enlarged',p,'detail-title');const d=el('div','',p,'detail');d.innerHTML=extra;}return p}
    for(const id of groups){
      const list=bank.bank.filter(item=>item.specimen.id===id),s=list[0].specimen;
      const section=el('section','',document.body,'section');section.dataset.review=id;
      el('h2',s.name,section);const ul=el('ul','',section);
      instructions[id].forEach(line=>el('li',line,ul));
      el('p','Reference: '+s.author+' · '+s.licence+' · crop of published image.',section,'small');
      const row=el('div','',section,'panels');
      panel(row,'Reference observation',bank.svg(list[0],true),bank.vascularDetail(list[0],true));
      for(const item of list){const verdict=item.defects.length?'Rejected · '+item.defects.map(i=>bank.categories[i]).join(', '):'Accepted';
        const candidate=panel(row,item.id+' — '+verdict,bank.svg(item),bank.vascularDetail(item));
        if(item.defects.length)el('p',item.why,candidate);
      }
    }
    const worked=el('section','',document.body,'section');worked.dataset.review='worked';
    el('h2','Worked example · '+w.name,worked);el('p',w.observe,worked);el('p',w.decide,worked);
    const wr=el('div','',worked,'panels pair');panel(wr,'Reference observation',w.observationSvg());panel(wr,'Revealed worked drawing',w.modelSvg());
    const steps=el('ol','',worked);w.steps.forEach(line=>el('li',line,steps));el('p','Reference: '+w.author+' · '+w.licence,worked,'small');
    const paper=el('section','',document.body,'section');paper.dataset.review='paper';const item=bank.paper;
    el('h2','Paper task · '+item.specimen.name,paper);
    paperInstructions.forEach(line=>el('p',line,paper));
    const pr=el('div','',paper,'panels pair');panel(pr,'Reference observation',bank.svg(item,true));panel(pr,'Revealed paper model',bank.svg(item));
    el('p','Reference: '+item.specimen.author+' · '+item.specimen.licence,paper,'small');
  },{groups,instructions,paperInstructions});
  await sheet.screenshot({path:resolve(destination,'contact-sheet.png'),fullPage:true});
  for(const id of [...groups,'worked','paper'])
    await sheet.locator('[data-review="'+id+'"]').screenshot({path:resolve(destination,id+'.png')});
  await sheet.close();

  async function seed(round,index){
    await page.evaluate(({key,round,index})=>{
      const ids=window.ALevelDrawingBank.setFor(round).map(item=>item.id);
      localStorage.setItem(key,JSON.stringify({drawingVersion:4,drawingRound:round+1,
        drawingSession:{round,index,attempts:0,helped:false,ids}}));
    },{key,round,index});
    await page.reload();await page.locator('.al-drawing-judgement .al-figures').waitFor();
  }
  async function place(selector,offset){
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.evaluate(({selector,offset})=>window.scrollTo(0,document.querySelector(selector).getBoundingClientRect().top+scrollY-offset),{selector,offset});
    await page.waitForTimeout(200);
  }
  await page.setViewportSize({width:1440,height:1500});
  await seed(0,4); // the accepted root model in the first set
  await place('.al-drawing-judgement',145);
  await page.screenshot({path:resolve(destination,'desktop-root.png')});
  await page.setViewportSize({width:390,height:844});
  await seed(1,1); // the accepted cheek model in the second set
  await place('.al-drawing-comparison',145);
  await page.screenshot({path:resolve(destination,'phone-reference.png')});
  await page.locator('.al-drawing-comparison').getByRole('button',{name:'Candidate drawing',exact:true}).click();
  await place('.al-drawing-comparison',145);
  await page.screenshot({path:resolve(destination,'phone-candidate.png')});
  console.log('Captured all six comparisons, worked/paper models, and desktop/phone screens in '+destination);
} finally {await page.close();await browser.close();server.close();}

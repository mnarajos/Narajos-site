/* Check the article, its no-data disclosures, and the manually routed figures. */
import assert from "node:assert/strict";

const slugs=["framework","performance","challenge-support","responsive-teaching","success-motivation"];
const route="/teaching-for-lasting-learning/";
const figureSources={
 framework:["ausubel","soderstrom","black"],
 performance:["soderstrom"],
 "challenge-support":["wood","kalyuga"],
 "responsive-teaching":["black"],
 "success-motivation":["bandura"]
};
const descriptionSources={
 framework:["Ausubel","Soderstrom and Bjork","Black and Wiliam","Bandura","Zimmerman"],
 performance:["Soderstrom and Bjork"],
 "challenge-support":["Wood, Bruner, and Ross","Kalyuga"],
 "responsive-teaching":["Black and Wiliam"],
 "success-motivation":["Bandura"]
};

export async function checkTeachingArticle(browser,base,{screenshots=true,audit=null}={}) {
 for(const width of [1280,320]) {
  const context=await browser.newContext({viewport:{width,height:900},hasTouch:width===320});
  const page=await context.newPage();
  await page.goto(base+"/about/");
  assert.equal(await page.getByRole("link",{name:"Teaching and learning",exact:true}).getAttribute("href"),route);
  await page.getByRole("link",{name:"Teaching and learning",exact:true}).click();
  await page.waitForURL(base+route);
  assert.equal(await page.title(),"Teaching for lasting learning | Narajos");
  assert.equal(await page.locator("main h1").textContent(),"Teaching for lasting learning");
  assert.deepEqual(await page.locator(".article-body > p").allTextContents(),[
   "Educational research has helped us understand how pupils learn and how teachers can support that learning. However, knowing which teaching strategies are effective is not quite the same as knowing when and how to use them.",
   "Retrieval practice, scaffolding, and feedback can all support learning, but their effectiveness depends on what pupils already know, what they are learning, and what they are finding difficult.",
   "An important distinction is that between learning and performance (Soderstrom and Bjork, 2015). Pupils may complete a task successfully during a lesson but struggle to do something similar a week later. Equally, pupils who find an activity difficult may still be learning from it.",
   "I consider four characteristics of knowledge particularly important: how much pupils know, how accurate their knowledge is, how readily they can retrieve it, and how well they can connect different ideas.",
   "Alongside developing knowledge, I believe teachers have an important role in helping pupils become more independent learners. This involves teaching pupils how to evaluate their understanding, recognise gaps in their knowledge, and make better decisions about how they study.",
   "Drawing on educational research and my experiences as a teacher, I have brought these ideas together to help me think about how different aspects of learning and teaching interact. I am particularly interested in identifying what is limiting pupils’ learning and where teachers can make the greatest difference.",
   "The eight principles presented here inform both my classroom practice and the design of the learning resources on Narajos.com. Although many of the same principles apply to independent learning, Narajos.com cannot replicate the professional judgement of a classroom teacher."
  ],"The approved opening changed");
  assert.equal(await page.locator(".site-nav details").count(),2);
  assert.equal(await page.locator(".article-figure").count(),5);
  assert.equal(await page.locator(".diagnostic-scenario").count(),8);
  assert.equal(await page.locator("#references li").count(),20);
  assert.equal(await page.locator("#diagnostic input, #diagnostic textarea, #diagnostic form").count(),0);
  assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=2,`Article overflows at ${width}px`);
  await page.evaluate(()=>Promise.all([document.fonts.ready,...[...document.images].map(img=>img.decode())]));
  for(const link of await page.locator('main a[href^="#ref-"]').all()) {
   const href=await link.getAttribute("href");
   assert.equal(await page.locator(href).count(),1,"Missing reference target "+href);
  }
  for(const slug of slugs){
   const figure=page.locator("#figure-"+slug);
   for(const source of figureSources[slug])assert.equal(await figure.locator(`figcaption a[href="#ref-${source}"]`).count(),1,`Missing figure source: ${slug} / ${source}`);
   const current=await figure.locator("img").evaluate(img=>img.currentSrc);
   assert(current.endsWith(`${slug}-${width===320?"mobile":"desktop"}.svg`),"Incorrect responsive diagram: "+current);
   if(screenshots)await figure.screenshot({path:`/tmp/narajos-teaching-${slug}-${width}.png`});
  }
  const before=await page.evaluate(()=>JSON.stringify(localStorage));
  const requests=[];
  page.on("request",request=>requests.push(request.url()));
  for(const summary of await page.locator(".diagnostic-scenario summary").all()) await summary.click();
  assert.equal(await page.locator(".diagnostic-scenario[open]").count(),8);
  assert.equal(await page.evaluate(()=>JSON.stringify(localStorage)),before,"Diagnostic tool changed local storage");
  assert.deepEqual(requests,[],"Opening a diagnostic disclosure sent a request");
  if(screenshots)await page.screenshot({path:`/tmp/narajos-teaching-article-${width}.png`,fullPage:true});
  if(audit){
   await page.addScriptTag({content:audit});
   const violations=await page.evaluate(async()=> (await window.axe.run({runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa","wcag22aa"]}})).violations.map(rule=>({id:rule.id,impact:rule.impact,nodes:rule.nodes.map(node=>node.target)})));
   assert.deepEqual(violations,[],`Accessibility findings at ${width}px`);
  }
  await context.close();
 }
 // The diagnostic material is ordinary HTML and remains operable without scripts.
 const noScript=await browser.newContext({viewport:{width:320,height:800},javaScriptEnabled:false});
 const noScriptPage=await noScript.newPage();
 await noScriptPage.goto(base+route);
 await noScriptPage.locator(".diagnostic-scenario summary").first().focus();
 await noScriptPage.keyboard.press("Enter");
 assert(await noScriptPage.locator(".diagnostic-scenario").first().evaluate(el=>el.open));
 await noScript.close();

 const page=await browser.newPage();
 for(const slug of slugs)for(const mode of ["desktop","mobile"])for(const font of [null,"DejaVu Sans"]) {
  await page.goto(base+`/assets/teaching-for-lasting-learning/${slug}-${mode}.svg`);
  const description=await page.locator("desc#description").textContent();
  for(const source of descriptionSources[slug])assert(description.includes(source),`Missing accessible source: ${slug} ${mode} / ${source}`);
  // Check a common wider fallback as well as the browser's default system font.
  if(font)await page.evaluate(font=>{
   const style=document.createElementNS("http://www.w3.org/2000/svg","style");
   style.textContent=`text { font-family: "${font}" !important; }`;
   document.querySelector("svg").append(style);
  },font);
  const errors=await page.evaluate(({mode,slug})=>{
   const svg=document.querySelector("svg"),view=svg.viewBox.baseVal;
   const scale=mode==="desktop"?Math.min(1,800/view.width):Math.min(1,288/view.width);
   const b=el=>{const r=el.getBBox();return {x:r.x,y:r.y,w:r.width,h:r.height};};
   const texts=[...svg.querySelectorAll("text")].map(el=>({label:el.textContent,box:b(el),node:el.closest("[data-node]")?.getAttribute("data-node")}));
   const nodes=[...svg.querySelectorAll(".diagram-node")].map(el=>({id:el.getAttribute("data-node"),group:el.getAttribute("data-related-group"),box:b(el.querySelector("rect"))}));
   const errors=[];
   const overlaps=(a,c)=>a.x<c.x+c.w&&a.x+a.w>c.x&&a.y<c.y+c.h&&a.y+a.h>c.y;
   const expand=(r,n)=>({x:r.x-n,y:r.y-n,w:r.w+2*n,h:r.h+2*n});
   for(const t of texts){
    const r=t.box;
    if(r.x<-.1||r.y<-.1||r.x+r.w>view.width+.1||r.y+r.h>view.height+.1)errors.push(`Text outside canvas: ${t.label}`);
    if(t.node){const n=nodes.find(n=>n.id===t.node).box;const inset=Math.min(r.x-n.x,r.y-n.y,n.x+n.w-r.x-r.w,n.y+n.h-r.y-r.h)*scale;if(inset<11.9)errors.push(`Text padding ${inset.toFixed(1)}px: ${t.label}`);}
   }
   for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++)if(overlaps(texts[i].box,texts[j].box))errors.push(`Overlapping text: ${texts[i].label} / ${texts[j].label}`);
   for(const t of texts)for(const n of nodes)if(t.node!==n.id&&overlaps(t.box,expand(n.box,8/scale)))errors.push(`Text too close to unrelated node: ${t.label} / ${n.id}`);
   for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
    const a=nodes[i].box,c=nodes[j].box;
    const dx=Math.max(c.x-(a.x+a.w),a.x-(c.x+c.w),0),dy=Math.max(c.y-(a.y+a.h),a.y-(c.y+c.h),0);
    if(dx===0&&dy===0)errors.push(`Overlapping nodes: ${nodes[i].id} / ${nodes[j].id}`);
    // Related cells in the mobile matrix share axes and remain at least 12px apart.
    const relatedMatrix=slug==="challenge-support"&&mode==="mobile"&&nodes[i].group==="matrix"&&nodes[j].group==="matrix";
    if((dx!==0||dy!==0)&&(dx===0||dy===0)&&Math.max(dx,dy)*scale<(relatedMatrix?11.5:23.5))errors.push(`Node spacing: ${nodes[i].id} / ${nodes[j].id}`);
   }
   // The figures use explicitly positioned orthogonal M/H/V paths.
   const edges=[...svg.querySelectorAll(".diagram-edge")].map(path=>{
    const tokens=path.getAttribute("d").match(/[MHV]|-?\d+(?:\.\d+)?/g),segments=[];let x=0,y=0,i=0;
    while(i<tokens.length){const command=tokens[i++];if(command==="M"){x=Number(tokens[i++]);y=Number(tokens[i++]);}else if(command==="H"){const next=Number(tokens[i++]);segments.push({x1:x,y1:y,x2:next,y2:y});x=next;}else if(command==="V"){const next=Number(tokens[i++]);segments.push({x1:x,y1:y,x2:x,y2:next});y=next;}else errors.push("Unsupported path command");}
    return segments;
   });
   const lineHits=(s,r)=>s.x1===s.x2?s.x1>r.x&&s.x1<r.x+r.w&&Math.max(s.y1,s.y2)>r.y&&Math.min(s.y1,s.y2)<r.y+r.h:s.y1>r.y&&s.y1<r.y+r.h&&Math.max(s.x1,s.x2)>r.x&&Math.min(s.x1,s.x2)<r.x+r.w;
   const onBoundary=(x,y,r)=>((Math.abs(x-r.x)<.1||Math.abs(x-r.x-r.w)<.1)&&y>=r.y&&y<=r.y+r.h)||((Math.abs(y-r.y)<.1||Math.abs(y-r.y-r.h)<.1)&&x>=r.x&&x<=r.x+r.w);
   const relations=[];
   for(const edge of edges){
    if(!edge.length)continue;
    const start=nodes.find(n=>onBoundary(edge[0].x1,edge[0].y1,n.box));
    if(!start)errors.push("Connector starts away from a node");
    const last=edge.at(-1),end=nodes.find(n=>onBoundary(last.x2,last.y2,n.box));
    if(!end)errors.push("Arrow ends away from a node");
    if(start&&end)relations.push(`${start.id}->${end.id}`);
    for(const seg of edge){
     for(const n of nodes){
      if(lineHits(seg,{x:n.box.x+.1,y:n.box.y+.1,w:n.box.w-.2,h:n.box.h-.2}))errors.push(`Connector crosses node: ${n.id}`);
      if(n!==start&&n!==end&&lineHits(seg,expand(n.box,8/scale)))errors.push(`Connector too close to unrelated node: ${n.id}`);
     }
     for(const t of texts)if(lineHits(seg,expand(t.box,8/scale)))errors.push(`Connector too close to text: ${t.label}`);
    }
   }
   for(let i=0;i<edges.length;i++)for(let j=i+1;j<edges.length;j++)for(const a of edges[i])for(const c of edges[j]){
    const ah=a.y1===a.y2,ch=c.y1===c.y2;
    if(ah!==ch){const h=ah?a:c,v=ah?c:a;if(v.x1>Math.min(h.x1,h.x2)&&v.x1<Math.max(h.x1,h.x2)&&h.y1>Math.min(v.y1,v.y2)&&h.y1<Math.max(v.y1,v.y2))errors.push("Connectors cross");}
    else if(ah&&a.y1===c.y1&&Math.min(Math.max(a.x1,a.x2),Math.max(c.x1,c.x2))>Math.max(Math.min(a.x1,a.x2),Math.min(c.x1,c.x2)))errors.push("Connectors overlap");
    else if(!ah&&a.x1===c.x1&&Math.min(Math.max(a.y1,a.y2),Math.max(c.y1,c.y2))>Math.max(Math.min(a.y1,a.y2),Math.min(c.y1,c.y2)))errors.push("Connectors overlap");
   }
   if(slug==="framework"){
    if(svg.querySelector("title")?.textContent!=="Bringing together ideas about learning and teaching")errors.push("The central figure title is inconsistent");
    const titleLines=mode==="desktop"?["Bringing together ideas about learning and teaching"]:["Bringing together ideas","about learning and teaching"];
    for(const line of titleLines)if(!texts.some(t=>t.label===line))errors.push(`Missing visible title: ${line}`);
    for(const relation of ["prior->developed","developed->prior","instruction->developed","instruction->performance","developed->performance","developed->competence","performance->teacher","teacher->instruction"]){
     if(!relations.includes(relation))errors.push(`Missing framework relationship: ${relation}`);
    }
    if(relations.includes("prior->instruction")||relations.includes("prior->teacher"))errors.push("Prior knowledge incorrectly shown as direct teacher access");
    for(const label of ["Accessibility","Learner influences throughout:","Motivation","Self-regulation"])if(!svg.textContent.includes(label))errors.push(`Missing framework label: ${label}`);
   }
   if(slug==="challenge-support"&&mode==="mobile"){
    const get=id=>nodes.find(n=>n.id===id)?.box;
    const a=get("independent-stretch"),b=get("supported-stretch"),c=get("independent-consolidation"),d=get("supported-foundations");
    if(!a||!b||!c||!d||a.x!==c.x||b.x!==d.x||a.y!==b.y||c.y!==d.y||a.x>=b.x||a.y>=c.y)errors.push("Challenge and support are not arranged as a two-dimensional matrix");
   }
   return errors;
  },{mode,slug});
  assert.deepEqual(errors,[],`${slug} ${mode} ${font??"default font"} geometry`);
 }
 await page.close();
 console.log("Teaching article: responsive diagrams, geometry, disclosures, links, privacy, and screenshots passed.");
}

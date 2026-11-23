/* Headless real-browser smoke checks for Narajos revision tools.
 * Distinct from unit tests: these exercise rendered DOM, navigation and mobile layout.
 * Run after: npm install --no-save playwright@1.56.1 && npx playwright install chromium
 */
import assert from "node:assert/strict";
import {servePublic} from "./browser-test-site.mjs";
import {chromium} from "playwright";
import "./check-writing-marking.mjs";
import {checkCatchupScaffolds} from "./check-catchup-scaffolds.mjs";

const {server,base}=await servePublic();
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const errors=[];
async function checkReadingSpacing(page, label) {
 const style=await page.addStyleTag({content:`
  * { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; }
  p { margin-bottom: 2em !important; }
 `});
 assert((await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,label+" overflows with text spacing applied");
 await style.evaluate(el=>el.remove());
}
async function screen(page,label){
 await page.screenshot({path:"/tmp/narajos-"+label+".png",fullPage:true});
}
async function checkPage(page,name){
 page.on("pageerror",err=>errors.push(name+": "+err.message));
 await page.goto(base+"/"+name+"/",{waitUntil:"load"});
 await page.locator("main").waitFor({state:"visible"});
 await page.waitForTimeout(250);
 assert(!(await page.locator("main").innerText()).includes("Loading Human Biology revision"),name+" failed to boot");
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
 assert(overflow<=3,name+" overflows viewport horizontally by "+overflow+"px");
}
try{
 await checkCatchupScaffolds(browser,base);
 {
 const writingTouch=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 writingTouch.on("pageerror",err=>errors.push("Sentence picker: "+err.message));
 await writingTouch.goto(base+"/teaching/focused-writing/order/");
 const touchOrder=writingTouch.locator('[data-writing-order="sandstone"]');
 const touchSlot=touchOrder.locator('[data-order-position="0"]');
 const touchControl=touchSlot.getByRole("button");
 const dialog=touchOrder.getByRole("dialog",{name:"Topic sentence"});
 assert(await touchOrder.locator(".paragraph-bank").isHidden());
 await touchControl.scrollIntoViewIfNeeded();
 await touchControl.tap();
 await dialog.waitFor({timeout:3000}).catch(async error=>{
  await screen(writingTouch,"writing-touch-picker-not-open");
  throw new Error("Tap should open the picker. "+await touchSlot.innerText(),{cause:error});
 });
 await dialog.getByRole("button",{name:/^Sand grains settled/}).tap();
 assert.match(await touchSlot.innerText(),/Sand grains settled/);
 await touchControl.tap();
 await dialog.getByRole("button",{name:/^This sandstone/}).tap();
 assert.match(await touchSlot.innerText(),/This sandstone/);
 await touchControl.tap();
 await dialog.getByRole("button",{name:"Remove sentence",exact:true}).tap();
 assert(await touchSlot.getByRole("button",{name:"Choose sentence for topic sentence"}).isVisible());
 await writingTouch.close();
 }
 {
 const pilotPage=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 pilotPage.on("pageerror",err=>errors.push("Science Catch-up: "+err.message));
 await pilotPage.goto(base+"/science-catch-up/");
 const yearNavigation=pilotPage.getByRole("navigation",{name:"Choose a year group"});
 await yearNavigation.getByRole("link",{name:/^Year 7/}).waitFor();
 assert.equal(await yearNavigation.getByRole("link").count(),5);
 await yearNavigation.getByRole("link",{name:/^Year 7/}).click();
 await pilotPage.getByRole("heading",{name:"Year 7 Science",exact:true}).waitFor();
 const siteNavigation=pilotPage.getByRole("navigation",{name:"Main navigation"});
 const siteMenus=siteNavigation.locator("summary");
 assert.equal(await siteMenus.count(),3);
 await siteMenus.nth(2).press("Enter");
 const teacherLinks=siteNavigation.locator(".teacher-menu a");
 assert.deepEqual(await teacherLinks.allTextContents(),["Focused Questions","Focused Writing"]);
 await pilotPage.keyboard.press("Escape");
 assert(!(await teacherLinks.first().isVisible()));
 for(const width of [320,390]){
  await pilotPage.setViewportSize({width,height:844});
  const rows=await yearNavigation.getByRole("link").evaluateAll(links=>links.map(a=>Math.round(a.getBoundingClientRect().top)));
  assert.deepEqual(rows,[rows[0],rows[0],rows[2],rows[2],rows[2]]);
  assert(rows[2]>rows[0]);
  assert((await pilotPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3);
 }
 const selectedYear=yearNavigation.locator('[aria-current="page"]');
 assert.equal(await selectedYear.textContent(),"Year 7");
 const selectedStyle=await selectedYear.evaluate(el=>[getComputedStyle(el).backgroundColor,getComputedStyle(el,"::before").content]);
 assert.equal(selectedStyle[0],"rgb(23, 84, 102)");
 assert.match(selectedStyle[1],/✓/);
 await selectedYear.press("Tab");
 await pilotPage.keyboard.press("Shift+Tab");
 assert(await selectedYear.evaluate(el=>el===document.activeElement&&getComputedStyle(el).outlineStyle==="solid"));
 await screen(pilotPage,"catch-up-year-navigation-mobile");
 assert.equal(await pilotPage.locator(".school-topic-list > li").count(),12);
 assert.equal(await pilotPage.getByRole("link",{name:"Open GCSE revision"}).count(),0);
 const year7Openings=await pilotPage.locator(".school-topic-list > li").evaluateAll(rows=>rows.map(row=>[row.querySelector("a").href,row.querySelector("p").textContent]));
 await pilotPage.getByRole("link",{name:"Science Skills",exact:true}).click();
 await pilotPage.getByRole("heading",{name:"How could you find out what makes a toy roll farther?",exact:true}).waitFor({timeout:10000}).catch(async error=>{
  throw new Error("Science Skills opening missing at "+pilotPage.url()+": "+(await pilotPage.locator("main").innerText()).slice(0,420),{cause:error});
 });
 const workedRamp=pilotPage.getByRole("heading",{name:"Worked example · testing ramp angle"});
 assert(await workedRamp.isVisible());
 assert(!(await pilotPage.getByRole("heading",{name:"Check your understanding",exact:true}).isVisible()));
 await pilotPage.getByRole("heading",{name:"Roll a toy down a ramp",exact:true}).waitFor();
 assert(await pilotPage.evaluate(()=>{
  const parts=[".school-opening-hook",".ks3-ramp-setup","toy-ramp",".ks3-connection",".school-journey"].map(selector=>document.querySelector(selector));
  return parts.every((part,i)=>part&&(i===0||Boolean(parts[i-1].compareDocumentPosition(part)&Node.DOCUMENT_POSITION_FOLLOWING)));
 }),"Introduce the toy and model before the recall prompt and checks");
 assert(await pilotPage.locator(".school-evidence-panel").evaluate(el=>!!(el.compareDocumentPosition(document.querySelector(".school-journey"))&Node.DOCUMENT_POSITION_FOLLOWING)));
 const scienceSkills=pilotPage.locator(".school-journey");
 assert(await scienceSkills.getByText("Step 1 of 4",{exact:true}).isVisible());
 assert(await scienceSkills.getByRole("heading",{name:"Change one thing",exact:true}).isVisible());
 await scienceSkills.getByRole("button",{name:"Check",exact:true}).click();
 const scienceSkillsCheck=scienceSkills.getByRole("dialog");
 assert(!(await scienceSkillsCheck.getByText(/The independent variable is the factor/).isVisible()));
 await scienceSkillsCheck.getByRole("radio",{name:"The ramp angle",exact:true}).check();
 await scienceSkillsCheck.getByRole("button",{name:"Check answer",exact:true}).click();
 await scienceSkillsCheck.getByRole("button",{name:"Continue",exact:true}).click();
 assert(await scienceSkills.getByRole("heading",{name:"Measure the result",exact:true}).isVisible());
 assert.equal(await pilotPage.evaluate(()=>JSON.parse(localStorage.getItem("narajos.catchup.v1.7.fair-tests")).outcomes[0]),"independent");
 await pilotPage.getByText("More practice and activities",{exact:true}).click();
 assert(await pilotPage.getByRole("heading",{name:"Check your understanding",exact:true}).isVisible());
 assert.equal(await pilotPage.locator("[data-ks3-transfer] textarea").count(),1);
 await pilotPage.goto(base+"/science-catch-up/?year=8");
 assert.equal(await pilotPage.locator(".school-topic-list > li").count(),13);
 assert.equal(await pilotPage.getByRole("link",{name:"Open GCSE revision"}).count(),0);
 const year8Openings=await pilotPage.locator(".school-topic-list > li").evaluateAll(rows=>rows.map(row=>[row.querySelector("a").href,row.querySelector("p").textContent]));
 for(const [path,opening] of [...year7Openings,...year8Openings]){
  await pilotPage.goto(path);
  assert.equal(await pilotPage.locator(".school-opening-hook").textContent(),opening,path);
 }
 await pilotPage.goto(base+"/ks3/cells/");
 assert(await pilotPage.getByRole("heading",{name:"How could you spot a plant cell without a label?",exact:true}).isVisible());
 assert.match(await pilotPage.locator(".ks3-cell-functions").first().innerText(),/Mitochondria\s+are the site of aerobic respiration/);
 const cellsAnswer=pilotPage.locator("[data-ks3-transfer]").getByRole("textbox",{name:"Your answer",exact:true});
 await cellsAnswer.fill("A cell wall supports the leaf cell.");
 await pilotPage.reload();
 assert.equal(await cellsAnswer.inputValue(),"A cell wall supports the leaf cell.");
 await pilotPage.locator("[data-ks3-transfer]").getByText("Compare your explanation",{exact:true}).click();
 assert(await pilotPage.locator("[data-ks3-transfer]").getByText(/The cell wall supports the plant cell/).isVisible());
 await pilotPage.goto(base+"/ks3/lesson/?topic=states-of-matter&guided=1");
 assert(await pilotPage.getByRole("heading",{name:"Warm the solid",exact:true}).isVisible());
 await pilotPage.getByText("More practice and activities",{exact:true}).click();
 assert(await pilotPage.locator("[data-ks3-transfer]").getByRole("textbox",{name:"Your answer",exact:true}).isVisible());
 await pilotPage.evaluate(()=>localStorage.setItem("narajos.catchup.v1.7.states-of-matter",JSON.stringify({step:2,done:true})));
 await pilotPage.reload();
 await pilotPage.getByRole("button",{name:"Try the extra check",exact:true}).click();
 await pilotPage.getByText("Step 4 of 4",{exact:true}).waitFor();
 await pilotPage.locator(".school-current-stage").getByRole("button",{name:"Check",exact:true}).click();
 const boilingCheck=pilotPage.getByRole("dialog");
 await boilingCheck.getByRole("radio",{name:"It stays steady while the liquid boils.",exact:true}).check();
 await boilingCheck.getByRole("button",{name:"Check answer",exact:true}).click();
 await boilingCheck.getByRole("button",{name:"Finish catch-up",exact:true}).click();
 await pilotPage.getByRole("heading",{name:"Catch-up complete!",exact:true}).waitFor();
 await pilotPage.goto(base+"/science-catch-up/?year=9");
 assert.equal(await pilotPage.locator(".school-topic-list > li").count(),5);
 await pilotPage.evaluate(()=>{
  localStorage.setItem("narajos.catchup.v1.8.periodic-table", JSON.stringify({step:2,started:true,done:true}));
 });
 const conceptLinks=await pilotPage.locator(".school-concept-list a").evaluateAll(links=>links.map(a=>[a.href,a.parentElement.querySelector("p").textContent]));
 assert.equal(conceptLinks.length,12);
 for(const [path,opening] of conceptLinks){
  await pilotPage.goto(path);
  await pilotPage.getByRole("heading",{name:"Catch-up notes",exact:true}).waitFor();
  assert.equal(await pilotPage.locator(".school-opening-hook").textContent(),opening,path);
  assert(await pilotPage.locator(".school-evidence-panel").evaluate(el=>!!(el.compareDocumentPosition(document.querySelector(".school-journey"))&Node.DOCUMENT_POSITION_FOLLOWING)));
  if(path.endsWith("topic=cell-structures")){
   const comparison=pilotPage.locator(".school-cell-comparison img");
   assert.equal(await comparison.count(),2);
   for(const diagram of await comparison.all()){
    await diagram.evaluate(img=>img.decode());
    assert.equal(await diagram.evaluate(img=>getComputedStyle(img).filter),"none");
   }
   await pilotPage.getByRole("checkbox",{name:"Greyscale",exact:true}).check();
   assert.equal(await comparison.first().evaluate(img=>getComputedStyle(img).filter),"grayscale(1)");
  }
  assert(await pilotPage.locator(".school-evidence-visual").isVisible(), path);
  assert(await pilotPage.locator(".school-evidence-visual").locator('svg[role="img"],img,.catchup-clock-grid').count() > 0, path);
  assert(await pilotPage.getByRole("progressbar",{name:"Lesson progress"}).isVisible());
  assert.equal(await pilotPage.getByRole("progressbar",{name:"Lesson progress"}).getAttribute("value"),"0");
  assert((await pilotPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"Year 9 catch-up overflows at phone width");
 }
 await pilotPage.setViewportSize({width:320,height:844});
 await pilotPage.goto(base+"/science-catch-up/lesson/?topic=energy-transfer");
 await pilotPage.getByRole("button",{name:"Reveal both totals",exact:true}).press("Enter");
 for(const total of ["100 J × 2 = 200 J", "50 J × 10 = 500 J"]){
   assert(await pilotPage.getByText(total,{exact:true}).isVisible());
 }
 assert((await pilotPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"The energy timeline overflows at 320px");
 await pilotPage.goto(base+"/ks3/lesson/?topic=earth-structure&guided=1");
 const specimenImages=pilotPage.locator("#catchup-evidence .catchup-photo");
 await specimenImages.first().waitFor();
 assert.equal(await specimenImages.count(),2);
 for(const image of await specimenImages.all()){
   await image.evaluate(img=>img.decode());
   const links=image.locator("..").getByRole("link");
   assert.match(await links.nth(0).getAttribute("href"),/^https:\/\/commons\.wikimedia\.org/);
   assert.match(await links.nth(1).getAttribute("href"),/^https:\/\/creativecommons\.org\/licenses\/by/);
 }
 await pilotPage.getByRole("button",{name:"Heat and press solid rock",exact:true}).press("Enter");
 await pilotPage.getByRole("img",{name:/remains solid throughout/}).waitFor();
 assert((await pilotPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"The rock model overflows at 320px");
 await pilotPage.setViewportSize({width:390,height:844});
 await pilotPage.goto(base+"/science-catch-up/lesson/?topic=osmosis");
 const guide=pilotPage.locator(".school-journey");
 const check=guide.getByRole("dialog");
 const startCheck=guide.getByRole("button",{name:"Check",exact:true});
 assert.match(await startCheck.textContent(),/Check.*→/);
 assert(!(await pilotPage.locator(".school-lesson-table").isVisible()));
 assert(await pilotPage.getByText("Net water movement A → B",{exact:true}).isVisible());
 const osmosisBreadcrumb=pilotPage.getByRole("navigation",{name:"Breadcrumb",exact:true});
 assert.equal(await osmosisBreadcrumb.getByRole("link",{name:"Science Catch-up",exact:true}).getAttribute("href"),"/science-catch-up/");
 assert.equal(await osmosisBreadcrumb.getByRole("link",{name:"← Year 9 topics",exact:true}).getAttribute("href"),"/science-catch-up/?year=9");
 assert.equal(await osmosisBreadcrumb.locator('[aria-current="page"]').textContent(),"Osmosis");
 assert.equal(await pilotPage.locator('.site-nav [aria-current=location]').textContent(),"Year 9");
 assert.match(await pilotPage.locator('link[rel="canonical"]').getAttribute("href"),/\?topic=osmosis$/);

 await pilotPage.getByText("Read the table",{exact:true}).click();
 assert(await pilotPage.locator(".school-lesson-table").isVisible());
 await guide.getByRole("button",{name:"Check",exact:true}).click();
 assert.equal(await check.getByRole("button",{name:"Catch-up notes",exact:true}).count(),0);
 assert.equal(await check.locator(".school-check-options label").first().evaluate(el=>getComputedStyle(el).backgroundColor),"rgb(239, 245, 244)");
 assert(await check.getByRole("heading",{name:"What moves through the membrane by osmosis?",exact:true}).isVisible());
 assert.equal(await check.getByRole("button",{name:"Continue",exact:true}).count(),0);
 assert.equal(await check.getByRole("textbox").count(),0);
 await check.getByRole("radio",{name:"Dissolved sugar",exact:true}).check();
 await check.getByRole("button",{name:"Check answer",exact:true}).click();
 await check.getByRole("status").filter({hasText:"Incorrect. Osmosis describes the water"}).waitFor();
 await check.getByRole("radio",{name:"All particles in the solution",exact:true}).check();
 await check.getByRole("button",{name:"Check answer",exact:true}).click();
 await check.getByRole("status").filter({hasText:"Incorrect. Key idea: Osmosis describes movement of water"}).waitFor();
 await check.getByRole("radio",{name:"Dissolved sugar",exact:true}).check();
 await screen(pilotPage,"year-9-catch-up-check-mobile");
 await check.getByRole("button",{name:"Save and pause",exact:true}).click();
 await pilotPage.evaluate(()=>{
  const key="narajos.catchup.v1.9.osmosis";
  const saved=JSON.parse(localStorage.getItem(key));
  localStorage.setItem(key,JSON.stringify({...saved,draft:"Water can move in both directions."}));
 });
 await pilotPage.goto(base+"/science-catch-up/?year=9");
 assert.equal(await pilotPage.getByRole("link",{name:"Continue catch-up",exact:true}).count(),0);
 await pilotPage.getByRole("link",{name:"Osmosis",exact:true}).click();
 await guide.getByRole("button",{name:"Resume check",exact:true}).click();
 assert(await check.getByRole("radio",{name:"Dissolved sugar",exact:true}).isChecked());
 await check.getByText("Saved note",{exact:true}).click();
 assert(await check.getByText("Water can move in both directions.",{exact:true}).isVisible());
 await check.getByRole("radio",{name:"Water molecules",exact:true}).check();
 await check.getByRole("button",{name:"Check answer",exact:true}).click();
 await check.getByRole("button",{name:"Continue",exact:true}).click();
 assert(!(await pilotPage.getByRole("heading",{name:"Catch-up notes",exact:true}).isVisible()));
 assert(await guide.getByText("Step 2 of 4",{exact:true}).isVisible());
 assert(await guide.getByRole("heading",{name:"Movement in both directions",exact:true}).isVisible());
 await guide.getByRole("button",{name:"Check",exact:true}).click();
 assert(await check.getByRole("button",{name:"Need a clue?",exact:true}).isVisible());
 assert(await check.getByRole("img",{name:/Side A is more dilute/}).isVisible());
 assert((await check.locator(".school-question-evidence").innerText()).includes("Partially permeable membrane"));
 assert(!(await check.locator(".school-question-evidence").innerText()).includes("A → B"));
 await check.getByRole("radio",{name:"From B to A",exact:true}).check();
 await check.getByRole("button",{name:"Check answer",exact:true}).click();
 assert(await check.getByRole("status").filter({hasText:"B is the more concentrated side."}).isVisible());
 assert(await check.getByRole("button",{name:"Need a clue?",exact:true}).isVisible());
 await check.getByRole("radio",{name:"From A to B",exact:true}).check();
 await check.getByRole("button",{name:"Check answer",exact:true}).click();
 await check.getByRole("button",{name:"Continue",exact:true}).click();
 await guide.getByRole("button",{name:"Check",exact:true}).click();
 await check.getByRole("radio",{name:"Salt leaves the potato by osmosis.",exact:true}).check();
 await check.getByRole("button",{name:"Check answer",exact:true}).click();
 await check.getByRole("radio",{name:"Water moves out by osmosis.",exact:true}).check();
 await check.getByRole("button",{name:"Check answer",exact:true}).click();
 assert.equal(await guide.getByRole("link",{name:"Revise B1",exact:true}).count(),0);
 await check.getByRole("button",{name:"Continue",exact:true}).click();
 await guide.getByRole("button",{name:"Check",exact:true}).click();
 await check.getByRole("radio",{name:"From the cells into the water",exact:true}).check();
 await check.getByRole("button",{name:"Check answer",exact:true}).click();
 await check.getByRole("radio",{name:"From the water into the leaf cells",exact:true}).check();
 await check.getByRole("button",{name:"Check answer",exact:true}).click();
 await check.getByRole("button",{name:"Continue",exact:true}).click();
 await check.getByText("Try one more on your own",{exact:true}).waitFor();
 await check.getByRole("radio",{name:"From the water into the potato cells",exact:true}).check();
 await check.getByRole("button",{name:"Check answer",exact:true}).click();
 await check.getByRole("button",{name:"Finish catch-up",exact:true}).click();
 assert.equal(await guide.getByRole("link",{name:"Revise B1",exact:true}).getAttribute("href"),"/gcse/#topic-b1");
 assert.equal(await guide.getByRole("link",{name:/Choose another Year/}).count(),0);
 await pilotPage.reload();
 await guide.getByRole("heading",{name:"Catch-up complete!",exact:true}).waitFor();
 await guide.getByText("Review answers",{exact:true}).click();
 await guide.getByRole("button",{name:"Check 1",exact:true}).click();
 assert(await check.getByText("Water can move in both directions.",{exact:true}).isVisible());
 const catalogueWithoutGroupBy=await browser.newPage();
 await catalogueWithoutGroupBy.addInitScript(()=>{Object.groupBy=undefined;});
 for(const year of [7,8,9,10,11]){
  await catalogueWithoutGroupBy.goto(base+"/science-catch-up/?year="+year);
  const yearCurrent=catalogueWithoutGroupBy.locator(".school-years [aria-current=page]");
  assert.equal(await yearCurrent.textContent(),"Year "+year);
  assert.equal(await yearCurrent.evaluate(el=>getComputedStyle(el).backgroundColor),"rgb(23, 84, 102)");
  assert.equal(await catalogueWithoutGroupBy.locator(".site-nav [aria-current=page]").textContent(),"Year "+year);
  const topic=catalogueWithoutGroupBy.locator(".school-topic-list").getByRole("link").first();
  await topic.click();
  await catalogueWithoutGroupBy.locator(".school-journey").getByRole("button",{name:"Check",exact:true}).waitFor();
 }
 await catalogueWithoutGroupBy.close();
 const helpPage=await browser.newPage({viewport:{width:320,height:780},isMobile:true,hasTouch:true});
 const helpJourney=helpPage.locator(".school-journey");
 const helpDialog=helpJourney.getByRole("dialog");
 const askForHelp=()=>helpDialog.getByRole("button",{name:"I don’t know — explain it",exact:true}).tap();
 for(const [year,id,path,steps,hasFollowUp] of [
  [7,"fair-tests","/ks3/lesson/?topic=fair-tests&guided=1",4,false],
  [8,"separating-techniques","/ks3/lesson/?topic=separating-techniques&guided=1",3,false],
  [9,"osmosis","/science-catch-up/lesson/?topic=osmosis",4,true],
  [10,"vaccine-memory","/science-catch-up/lesson/?topic=vaccine-memory&year=10",4,true],
  [11,"wave-motion","/science-catch-up/lesson/?topic=wave-motion&year=11",4,true],
 ]){
  await helpPage.goto(base+path);
  for(let index=0;index<steps;index++){
   await helpJourney.getByRole("button",{name:"Check",exact:true}).tap();
   if(index===0){
    await helpDialog.getByRole("button",{name:"Need a clue?",exact:true}).press("Enter");
    assert(await helpDialog.locator(".school-clue").isVisible());
    assert.equal(await helpDialog.getByRole("radio",{checked:true}).count(),0);
   }
   await askForHelp();
   assert(await helpDialog.getByRole("heading",{name:"Explanation",exact:true}).isVisible());
   assert.equal(await helpDialog.getByRole("radio").count(),0);
   if(index===0){
    await helpDialog.getByText("Quick check",{exact:true}).tap();
    await helpDialog.getByText("Compare your reasoning",{exact:true}).tap();
    assert(await helpDialog.locator(".school-check-explanation details details p").isVisible());
    if(await helpDialog.getByRole("button",{name:"See lesson visual",exact:true}).count()){
     await helpDialog.getByRole("button",{name:"See lesson visual",exact:true}).tap();
     await helpJourney.getByRole("button",{name:"Resume check",exact:true}).tap();
    } else await helpDialog.getByRole("button",{name:"Save and pause",exact:true}).tap();
    await helpPage.reload();
    await helpJourney.getByRole("button",{name:"Resume check",exact:true}).tap();
    assert(await helpDialog.getByRole("heading",{name:"Explanation",exact:true}).isVisible());
   }
   await helpDialog.getByRole("button",{name:index===steps-1&&!hasFollowUp?"Finish catch-up":"Continue",exact:true}).tap();
  }
  if(hasFollowUp){
   assert(await helpDialog.getByText("Try one more on your own",{exact:true}).isVisible());
   await askForHelp();
   await helpDialog.getByRole("button",{name:"Finish catch-up",exact:true}).tap();
  }
  await helpJourney.getByRole("heading",{name:"Catch-up complete!",exact:true}).waitFor();
  const saved=await helpPage.evaluate(key=>JSON.parse(localStorage.getItem("narajos.catchup.v1."+key)),year+"."+id);
  assert.deepEqual(Object.values(saved.outcomes),Array(steps).fill("explained"));
  assert.equal(saved.followUp,hasFollowUp?"explained":undefined);
  await helpJourney.getByText("Review answers",{exact:true}).tap();
  await helpJourney.getByRole("button",{name:"Check 1",exact:true}).tap();
  assert(await helpDialog.getByText("Explanation used",{exact:true}).isVisible());
  await helpDialog.getByRole("button",{name:"Close review",exact:true}).tap();
 }
 await helpPage.close();
 const seniorLessonIds=new Set();
 for(const [year,count] of [[10,11],[11,11]]){
  await pilotPage.goto(base+"/science-catch-up/?year="+year);
  assert(await pilotPage.getByText(/if you missed the topic or need it explained again/).isVisible());
  assert(await pilotPage.getByRole("link",{name:"Open GCSE revision"}).isVisible());
  const topicCards=pilotPage.locator(".school-topic-list > li");
  assert.equal(await topicCards.count(),count);
  for(const topic of await topicCards.all()){
   assert(await topic.locator(".school-concept-list a").count()>0);
   assert(await topic.getByRole("link",{name:/^Revise and practise/}).isVisible());
  }
  const urls=await pilotPage.locator(".school-concept-list a").evaluateAll(links=>links.map(a=>a.href));
  for(const url of urls){
   const id=new URL(url).searchParams.get("topic");
   await pilotPage.goto(url);
   await pilotPage.locator("#catchup-evidence").waitFor({timeout:10000});
   assert(await pilotPage.locator("#catchup-evidence").locator('.catchup-picture,.gcse-catchup-punnett,.school-lesson-table').count()>0,id);
   assert.equal(await pilotPage.getByRole("link",{name:"← Year "+year+" topics"}).count(),1,id);
   assert((await pilotPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,id+" overflows at phone width");
   seniorLessonIds.add(id);
  }
 }
 assert.equal(seniorLessonIds.size,48);
 await pilotPage.goto(base+"/science-catch-up/lesson/?topic=vaccine-memory&year=10");
 for(const [index,answer] of ["Specific antigens","Their immune system has already responded to its antigens.","The virus lacks the bacterial targets of antibiotics.","Those antibodies may not bind to the new pathogen’s antigens."].entries()){
  await guide.getByRole("button",{name:"Check",exact:true}).click();
  if(index===0){
   await check.getByRole("radio",{name:"Any body cell",exact:true}).check();
   await check.getByRole("button",{name:"Check answer",exact:true}).click();
   assert(await check.getByRole("status").filter({hasText:"Recognition depends on the antigen"}).isVisible());
  }
  await check.getByRole("radio",{name:answer,exact:true}).check();
  await check.getByRole("button",{name:"Check answer",exact:true}).click();
  await check.getByRole("button",{name:index===3?"Finish catch-up":"Continue",exact:true}).click();
 }
 await guide.getByRole("link",{name:"Revise B3",exact:true}).click();
 await pilotPage.getByRole("link",{name:"Catch up on this topic",exact:true}).click();
 await pilotPage.waitForURL(base+"/science-catch-up/?topic=b3");
 const vaccineLesson=pilotPage.getByRole("link",{name:"Vaccination and the immune response",exact:true});
 await vaccineLesson.waitFor();
 assert.equal(await pilotPage.locator(".school-topic-list > li").count(),1);
 await vaccineLesson.click();
 await guide.getByRole("heading",{name:"Catch-up complete!",exact:true}).waitFor();
 await pilotPage.goto(base+"/science-catch-up/?year=11");
 await pilotPage.evaluate(()=>localStorage.setItem("gcse-test-progress","kept"));
 const clearCatchup=pilotPage.getByRole("button",{name:"Clear catch-up progress",exact:true});
 const clearDialog=pilotPage.getByRole("dialog",{name:"Clear catch-up progress?"});
 await clearCatchup.click();
 await clearDialog.getByRole("button",{name:"Cancel",exact:true}).click();
 assert(await pilotPage.evaluate(()=>!!localStorage.getItem("narajos.catchup.v1.9.osmosis")));
 await clearCatchup.click();
 await clearDialog.getByRole("button",{name:"Clear progress",exact:true}).click();
 await pilotPage.getByText("Catch-up progress cleared.",{exact:true}).waitFor();
 assert(await clearCatchup.isHidden());
 assert.deepEqual(await pilotPage.evaluate(()=>[Object.keys(localStorage).filter(k=>k.startsWith("narajos.catchup.v1.")),localStorage.getItem("gcse-test-progress")]),[[],"kept"]);
 await pilotPage.goto(base+"/science-catch-up/lesson/?topic=osmosis");
 await pilotPage.getByText("Step 1 of 4",{exact:true}).waitFor();
 await pilotPage.evaluate(()=>{window.name="kstest";});
 await pilotPage.goto(base+"/gcse/#topic-p2");
 await pilotPage.waitForFunction(()=>!!window.__k);
 const diagramTasks=await pilotPage.evaluate(()=>window.__k.ev(
  '[["b1","cells","rootProfile"],["c2","covalent","waterMissing"],["p2","resistance","voltmeterPlace"],["b6","alleles","punnett"]].map(([topic,concept,fig])=>DATA[topic].byId[concept].qs.filter(q=>q.fig===fig).map(q=>q.t+":"+q.a))'
 ));
 assert.deepEqual(diagramTasks.slice(0,3),[["mcq:1","mcq:2"],["mcq:1"],["tap:1"]]);
 assert(diagramTasks[3].includes("multi:0,1,2"));
  await pilotPage.close();
 }
 const desktop=await browser.newPage({viewport:{width:1280,height:900}});
 await desktop.goto(base+"/",{waitUntil:"load"});
 assert(await desktop.title(),"Homepage title missing");
 assert.equal(await desktop.title(),"Learning & Teaching in Science | Narajos");
 assert(await desktop.getByRole("heading",{name:"Learning & Teaching in Science",exact:true}).isVisible());
 assert(await desktop.getByRole("heading",{name:"Biology Simulations",exact:true}).isVisible());
 assert(await desktop.getByRole("heading",{name:"Learning Companions"}).isVisible(),"Learning Companions missing from homepage");
 assert((await desktop.locator(".home-philosophy").innerText()).includes("complement classroom teaching"),"Public purpose statement missing");
 assert.deepEqual(await desktop.locator(".home-option--questions .home-links a").evaluateAll(links=>links.map(a=>a.pathname)),["/teacher/","/teaching/focused-writing/"]);
 const homeMenu=desktop.locator(".site-nav details").first();
 await homeMenu.locator("summary").click();
 assert(await homeMenu.locator('a[href="/human-biology/"]').isVisible(),"Human Biology missing from homepage dropdown");
 assert.equal(await homeMenu.getByRole("link",{name:/^Year (7|8|9|10|11)$/}).count(),5);
 for(const [label, route, heading] of [
  ["A-level Biology — AQA", "/alevel/", "Ready to revise?"],
  ["Human Biology — Cambridge OCR AAQ", "/human-biology/", "Human Biology"]
 ]){
  await homeMenu.getByRole("link",{name:label,exact:true}).press("Enter");
  await desktop.waitForURL(base+route);
  await desktop.getByRole("heading",{name:heading,exact:true}).waitFor();
  await desktop.goto(base+"/");
  await homeMenu.locator("summary").press("Enter");
 }
 await homeMenu.locator("summary").press("Enter");
 const navTargets=await desktop.locator(".site-nav a").evaluateAll(links=>links.map(a=>[a.getAttribute("href"),a.textContent]));
 assert.deepEqual(navTargets.slice(0,8).map(([route])=>route),[
  ...[7,8,9,10,11].map(year=>"/science-catch-up/?year="+year),
  "/gcse/","/alevel/","/human-biology/"
 ]);
 for(const path of ["/teaching/","/privacy/","/teaching/simulations/","/science-catch-up/?year=8","/teaching/focused-writing/"]){
  await desktop.goto(base+path);
  assert.deepEqual(await desktop.locator(".site-nav a").evaluateAll(links=>links.map(a=>[a.getAttribute("href"),a.textContent])),navTargets);
 }
 await desktop.goto(base+"/");
 const menus=desktop.locator(".site-nav details");
 await menus.nth(0).locator("summary").click();
 await menus.nth(1).locator("summary").click();
 await desktop.waitForFunction(()=>!document.querySelectorAll(".site-nav details")[0].open);
 assert(await menus.nth(1).evaluate(el=>el.open),"Second dropdown did not open");
 await desktop.locator("h1").click();
 await desktop.waitForFunction(()=>![...document.querySelectorAll(".site-nav details")].some(el=>el.open));
 await menus.nth(0).locator("summary").click();
 await desktop.keyboard.press("Escape");
 await desktop.waitForFunction(()=>!document.querySelector(".site-nav details").open);
 assert(await menus.nth(0).locator("summary").evaluate(el=>document.activeElement===el),"Escape did not return focus to menu summary");
 assert((await desktop.locator(".home-option--learn .home-links").innerText()).includes("GCSE Combined Science (AQA)"),"Missing AQA on homepage");
 const teacherMenu=desktop.locator(".site-nav .teacher-menu");
 await teacherMenu.locator("summary").click();
 assert(await teacherMenu.getByRole("link",{name:"Focused Writing",exact:true}).isVisible());
 assert(await teacherMenu.getByRole("link",{name:"Focused Questions",exact:true}).isVisible());
 await teacherMenu.getByRole("link",{name:"Focused Writing",exact:true}).click();
 await desktop.getByRole("heading",{name:"Focused Writing",exact:true,level:1}).waitFor();
 assert.equal(await desktop.locator("main textarea").count(),0,"The chooser should contain links to activities");
 for (const thumbnail of await desktop.locator(".writing-choices img").all()) {
  await thumbnail.scrollIntoViewIfNeeded();
  await thumbnail.evaluate(image=>image.decode());
  assert(await thumbnail.evaluate(image=>image.naturalWidth>0 && image.alt===""),"Writing route thumbnails should load beside their text labels");
 }
 await screen(desktop,"focused-writing");
 await desktop.goto(base+"/");
 await screen(desktop,"home-structure");
 await checkPage(desktop,"teaching");
 const companionCards=desktop.locator('a.app-card[href="/gcse/"],a.app-card[href="/alevel/"],a.app-card[href="/human-biology/"]');
 assert.equal(await companionCards.count(),3,"Teaching overview must show three learner applications");
 assert(await desktop.locator('a[href="/teacher/"]').count(),"Teaching tool should remain discoverable");
 await screen(desktop,"teaching-overview");
 await checkPage(desktop,"teaching/simulations");
 const simulationCards=desktop.locator(".simulation-list a.sim-card");
 assert.equal(await simulationCards.count(),5,"Simulation catalogue does not contain five clickable cards");
 assert(!(await simulationCards.first().innerText()).includes("Open simulation"),"Redundant simulation CTA is still visible");
 await simulationCards.first().click();
 await desktop.waitForURL("**/teaching/simulations/enzyme-kinetics/");
 await desktop.goBack();
 await screen(desktop,"simulation-catalogue");
 await checkPage(desktop,"alevel");
 await desktop.locator('a[href="#catchup"]').first().click();
 await desktop.waitForURL("**/alevel/#catchup");
 const selectorPaperGroups=desktop.locator(".catchup-paper-group");
 await selectorPaperGroups.first().waitFor({state:"visible",timeout:10000});
 assert.equal(await selectorPaperGroups.count(),2,"A-level catch-up should have Paper 1 and Paper 2 columns");
 assert((await selectorPaperGroups.nth(0).innerText()).includes("Topic 4"),"Left column must contain Topics 1–4");
 assert((await selectorPaperGroups.nth(1).innerText()).includes("Topic 8"),"Right column must contain Topics 5–8");
 const settingsLink=desktop.locator(".settings-shortcut");
 assert(await settingsLink.isVisible(),"Settings shortcut missing from A-level header");
 assert((await settingsLink.boundingBox()).x>600,"Settings should sit at the right-hand side of the header");
 assert((await settingsLink.boundingBox()).width<=46,"Settings should be a compact icon on desktop");
 assert(await settingsLink.getAttribute("aria-label"),"Icon-only Settings needs an accessible name");
 for(const width of [1024,1280]){
  await desktop.setViewportSize({width,height:900});
  const gear=await settingsLink.boundingBox();
  const flash=await desktop.locator('.top-inner a[href="#flashcards"]').boundingBox();
  if(flash)assert(gear.x>=flash.x+flash.width+8||gear.y>=flash.y+flash.height||flash.y>=gear.y+gear.height,"Settings overlaps or crowds Flashcards on a laptop");
 }
 await desktop.locator('a[href="#catchup-a1"]').first().click();
 await desktop.waitForURL("**/alevel/#catchup-a1");
 const firstConcept=desktop.locator('a[href^="#catchup-a1-"]').first();
 await firstConcept.waitFor({state:"visible",timeout:10000}).catch(async()=>{throw new Error("A-level catch-up concepts not rendered: "+(await desktop.locator("main").innerText()).slice(0,700));});
 await firstConcept.click();
 await desktop.locator("section.companion-key").waitFor({state:"visible",timeout:10000});
 assert((await desktop.locator("main").innerText()).includes("Key idea"),"A-level key knowledge step not visible");
 await screen(desktop,"alevel-catchup");
 await desktop.goto(base+"/alevel/#catchup-a1-enzfactors",{waitUntil:"load"});
 await desktop.locator(".kc-visual-art svg").waitFor({state:"visible"});
 assert.equal(await desktop.locator(".kc-simulation-link").count(),2,"Enzyme catch-up should link to both relevant simulations");
 assert((await desktop.locator(".kc-visual-art svg").getAttribute("aria-label")).includes("reaction rate"),"Accessible enzyme schematic missing");
 await screen(desktop,"alevel-enzyme-visual");

 await checkPage(desktop,"human-biology");
 assert(await desktop.getByRole("heading",{name:"Externally assessed units",exact:true}).isVisible());
 assert.equal(await desktop.locator(".hb-nea-list a").count(),6);
 assert.equal(await desktop.locator("main").evaluate(el=>getComputedStyle(el).outlineStyle),"none","Main-content focus outline should not frame the whole app");
 await desktop.goto(base+"/human-biology/#challenge/f170");
 const firstF170Actions=desktop.getByRole("region",{name:"Learning activities"});
 assert.deepEqual(await firstF170Actions.locator("a").evaluateAll(links=>links.map(a=>a.hash)),
  ["#catchup/f170","#challenge/f170/core","#flashcards"]);
 const examFocus=desktop.getByRole("link",{name:/Exam-style focus/});
 assert(await examFocus.isHidden());
 await desktop.getByText("More practice options",{exact:true}).click();
 assert(await examFocus.isVisible());
 await desktop.setViewportSize({width:320,height:800});
 await checkReadingSpacing(desktop,"F170 start");
 await desktop.setViewportSize({width:1280,height:900});
 // Quiet hints: an interaction restarts the inactivity delay, then keyboard
 // activation reveals the conceptual prompt without stealing navigation.
 await desktop.goto(base+"/human-biology/#skills/f170/units");
 await desktop.getByRole("button",{name:"Now try one"}).click();
 const quietHint=desktop.locator('[data-k-action="hint"]');
 assert(await quietHint.isHidden(),"Hint must initially be hidden");
 await desktop.waitForTimeout(6000);
 await desktop.locator('input[name="kchoice"]').first().focus();
 await desktop.keyboard.press("Space");
 await desktop.waitForTimeout(4200);
 assert(await quietHint.isHidden(),"Changing an answer should restart the inactivity delay");
 await quietHint.waitFor({state:"visible",timeout:8000});
 assert.equal(await quietHint.innerText(),"Hint");
 await quietHint.focus();await desktop.keyboard.press("Enter");
 await desktop.locator(".k-hint-box").waitFor();
 assert(await quietHint.isHidden(),"More help should wait quietly after the first hint");
 await desktop.getByRole("link",{name:"← Leave this set"}).click();
 await desktop.locator("#leave-confirm").click();
 await desktop.getByRole("link",{name:"← Home",exact:true}).click();
 // Generated skills use the same real DOM checker and navigation protection.
 await desktop.locator('.hb-unit-list a[href="#challenge/f170"]').click();
 await desktop.getByText("More practice options",{exact:true}).press("Enter");
 await desktop.getByRole("link",{name:"Skills Practice",exact:true}).click();
 await desktop.getByRole("link",{name:"All skills",exact:true}).click();
 await desktop.waitForURL("**/#skills");
 await desktop.locator(".k-skill-card").nth(13).waitFor();
 assert.equal(await desktop.locator(".k-skill-card").count(),14);
 await screen(desktop,"human-skills-desktop");
 await desktop.locator('a[href="#skills/f170/magnification"]').click();
 await desktop.getByRole("heading",{name:"Worked example",exact:true}).waitFor();
 await desktop.getByRole("button",{name:"Now try one"}).click();
 await desktop.locator(".k-question-view").waitFor();
 assert(await desktop.locator(".k-reading-context").isVisible());
 assert.equal(await desktop.getByRole("button",{name:"Listen to the question"}).count(),0);
 for(let i=0;i<10;i++){
  const task=await desktop.evaluate(()=>{
   const s=JSON.parse(localStorage.getItem("narajos-human-challenge-v2-session"));
   const g=s.generated[s.index];return window.KeystoneHumanSkills.generate(s.skillId,g.level,g.seed);
  });
  if(task.type==="single"){await desktop.locator('input[name="kchoice"][value="'+task.correct+'"]').focus();await desktop.keyboard.press("Space");}
  else await desktop.locator("#k-number").fill(String(task.correct));
  if(await desktop.locator('[data-k-action="check"]').count())await desktop.locator('[data-k-action="check"]').click();
  await desktop.locator(".k-feedback.correct").waitFor();
  if(i===2){
   await desktop.reload();await desktop.locator(".k-feedback.correct").waitFor();
   await desktop.getByRole("link",{name:"← Leave this set"}).click();
   await desktop.locator("#leave-dialog").waitFor({state:"visible"});
   await desktop.locator("#leave-stay").click();
  }
  await desktop.locator('[data-k-action="next"]').click();
 }
 await desktop.getByRole("heading",{name:"Skills set complete"}).waitFor();
 await desktop.getByRole("button",{name:"Practise this skill again"}).click();
 await desktop.locator(".k-question-view").waitFor();
 await desktop.getByRole("link",{name:"← Leave this set"}).click();
 await desktop.locator("#leave-confirm").click();
 await desktop.getByRole("heading",{name:"Skills practice",exact:true}).waitFor();
 await desktop.getByRole("link",{name:"Resume practice"}).click();
 await desktop.locator(".k-question-view").waitFor();
 await desktop.getByRole("link",{name:"← Leave this set"}).click();
 await desktop.locator("#leave-confirm").click();
 await desktop.goto(base+"/human-biology/#skills/f171/rate");
 await desktop.locator(".k-skill-graph svg").waitFor();
 await screen(desktop,"human-skill-graph");
 await desktop.goto(base+"/human-biology/#catchup/f171",{waitUntil:"load"});
 await desktop.locator('a[href="#catchup/f171/3.2.2"]').first().click();
 await desktop.locator(".k-catchup-concept").waitFor({state:"visible",timeout:10000});
 assert((await desktop.locator("main").innerText()).includes("Vaccine types"),"F171 vaccine catch-up not visible");
 await desktop.goto(base+"/human-biology/#catchup/f171/3.2.2/1");
 await desktop.getByRole("heading",{name:"Key idea 2"}).waitFor({state:"visible",timeout:10000});
 assert((await desktop.locator("main").innerText()).includes("Key idea 2"),"Catch-up step did not advance");
 await screen(desktop,"human-vaccines");
 await desktop.goto(base+"/human-biology/#catchup/f170/3.2.1",{waitUntil:"load"});
 await desktop.locator("[data-hb-model-step] > summary").click();
 await desktop.getByText("Trace a withdrawal reflex",{exact:true}).click();
 const reflex=desktop.locator('science-sequence[kind="reflex"]');
 await reflex.locator("svg").waitFor({state:"visible"});
 const reflexNext=reflex.getByRole("button",{name:"Next step"});
 for(let step=0;step<4;step++) await reflexNext.click();
 await reflex.getByRole("status").filter({hasText:"Effector muscle"}).waitFor();
 assert.equal(await reflexNext.getAttribute("aria-disabled"),"true");
 await reflex.getByRole("button",{name:"Previous step"}).press("Enter");
 await reflex.getByRole("status").filter({hasText:"Motor neuron"}).waitFor();
 await desktop.goto(base+"/human-biology/#catchup/f170/1.1.2",{waitUntil:"load"});
 await desktop.locator("[data-hb-model-step] > summary").click();
 const microscope=desktop.locator("[data-hb-model-step]");
 assert(await microscope.locator(".micrograph-single img").evaluate(async img=>{await img.decode();return img.naturalWidth===386;}));
 assert(await microscope.locator(".hb-bar-length").isVisible());
 await microscope.getByRole("button",{name:"Show next step"}).press("Enter");
 await microscope.getByRole("button",{name:"Show next step"}).press("Enter");
 await microscope.getByText(/≈ 8 µm/).waitFor();
 await desktop.goto(base+"/human-biology/#catchup/f170/2.1.2",{waitUntil:"load"});
 await desktop.locator(".kc-simulation-link").waitFor({state:"visible"});
 assert((await desktop.locator(".kc-simulation-link").getAttribute("href"))==="/teaching/simulations/cardiac-cycle/","Heart concept should link to cardiac-cycle simulation");
 await screen(desktop,"human-cardiac-visual");
 const heartVideo=desktop.locator(".kc-video");
 await heartVideo.getByText("Video · Blood flow through the heart",{exact:true}).press("Enter");
 const hhmi=heartVideo.getByRole("link",{name:/HHMI BioInteractive/});
 assert.equal(await hhmi.getAttribute("href"),"https://www.biointeractive.org/classroom-resources/heart-function");
 assert.equal(await hhmi.getAttribute("target"),"_blank");
 await heartVideo.getByText("Check your answer",{exact:true}).press("Enter");
 await heartVideo.getByText(/enters the left atrium/).waitFor();
 await desktop.goto(base+"/alevel/#catchup-a6-synapse",{waitUntil:"load"});
 const synapseVideo=desktop.locator(".kc-video");
 await synapseVideo.locator(":scope > summary").click();
 assert(await synapseVideo.evaluate(el=>el.open),"Video disclosure should open on activation");
 assert.match(await synapseVideo.locator("p").first().innerText(),/31:12\s+to\s+36:45/);
 const estruch=synapseVideo.getByRole("link",{name:/Miss Estruch/});
 assert.equal(await estruch.getAttribute("href"),"https://www.youtube.com/watch?v=DVqHoZTZedw&t=1872s");
 assert.equal(await synapseVideo.locator("iframe").count(),0);
 await desktop.goto(base+"/human-biology/#catchup/f170/3.3.1",{waitUntil:"load"});
 const reproductiveOverview=desktop.locator(".kc-visual-art svg");
 await reproductiveOverview.getByText("Cervical canal",{exact:true}).waitFor();
 assert(await reproductiveOverview.getByText("Vagina",{exact:true}).isVisible());
 await desktop.emulateMedia({reducedMotion:"reduce"});
 await desktop.goto(base+"/human-biology/#catchup/f175/a1/2",{waitUntil:"load"});
 await desktop.locator("#krp-model").waitFor({state:"visible",timeout:10000});
 assert(await desktop.locator(".krp-diagram").isVisible(),"F175 anatomy simulation missing");
 assert(await desktop.locator(".krp-diagram").getByText("Cervix",{exact:true}).isVisible());
 assert(await desktop.locator(".krp-diagram").getByText("Cervical canal",{exact:true}).isVisible());
 assert(await desktop.locator(".krp-diagram").getByText("Vagina",{exact:true}).isVisible());
 await desktop.getByText("Look closer at the cervix",{exact:true}).click();
 assert(await desktop.getByText(/The cervix is the narrow lower part of the uterus/).isVisible());
 assert(await desktop.locator('[data-krp="lh"]').isHidden(),"LH should not appear before follicle maturation");
 await screen(desktop,"human-f175-anatomy");
 await desktop.locator('[data-krp="fsh"]').press("Enter");
 await desktop.locator('[data-krp="lh"]').waitFor({state:"visible",timeout:8000});
 assert(await desktop.locator('[data-krp="lh"]').evaluate(el=>el===document.activeElement),"Focus should move to LH when the follicle is ready");
 assert((await desktop.locator(".krp-status").innerText()).includes("LH surge"),"Mature follicle should introduce LH surge");
 assert(await desktop.locator("#krp-follicle").isVisible(),"Mature follicle must be visible in the diagram");
 await desktop.locator('[data-krp="lh"]').click();
 const spermEntry=desktop.getByRole("button",{name:"Sperm entry on the diagram"});
 await spermEntry.focus();
 await desktop.keyboard.press("Enter");
 assert.equal(await spermEntry.getAttribute("aria-disabled"),"true");
 await desktop.locator('[data-krp="fert"]').waitFor({state:"visible",timeout:8000});
 await desktop.getByRole("status").filter({hasText:"are in the same oviduct"}).waitFor();
 assert(await desktop.locator("#krp-egg").isVisible() && await desktop.locator("#krp-sperm").isVisible(),"Gametes must appear in the diagram");
 await desktop.locator('[data-krp="fert"]').click();
 await desktop.getByRole("status").filter({hasText:"The blastocyst is now shown in the uterus"}).waitFor();
 assert(await desktop.locator("#krp-blastocyst").isVisible(),"The blastocyst must be distinct from the earlier cleavage stage");
 await screen(desktop,"human-f175-embryo");
 await desktop.locator('[data-krp="reset"]').click();
 assert(await desktop.locator('[data-krp="lh"]').isHidden(),"Reset should hide LH until follicle matures");
 await desktop.locator('[data-krp="sperm"]').click();
 await desktop.getByRole("status").filter({hasText:"The representative sperm has reached an oviduct."}).waitFor();
 await desktop.getByRole("button",{name:/^Select right ovary/}).click();
 await desktop.locator('[data-krp="lh"]').click();
 await desktop.getByRole("status").filter({hasText:"The representative sperm is in the other oviduct"}).waitFor();
 assert(await desktop.locator('[data-krp="fert"]').isHidden());
 await desktop.goto(base+"/human-biology/#challenge/f171/case-follow-up-response");
 await desktop.getByRole("table",{name:"Fictional booking data"}).waitFor();
 assert(await desktop.getByRole("rowheader",{name:"A · reminder text"}).isVisible());
 await desktop.getByRole("link",{name:"← Leave this set"}).click();
 await desktop.locator("#leave-confirm").click();
 await desktop.waitForURL("**/#challenge/f171");
 await desktop.getByRole("heading",{name:"Health and disease",exact:true,level:1}).waitFor();


 await desktop.goto(base+"/human-biology/#challenge/f171/a3",{waitUntil:"load"});
 await desktop.locator(".k-question-view").waitFor({state:"visible"});
 const count=await desktop.evaluate(()=>window.KeystoneHumanChallenge?.questionCount);
 assert.equal(count,577,"Live engine did not load all questions");
 assert((await desktop.locator("main").innerText()).length>90,"Question activity is blank");
 await desktop.locator("#site-home").click();
 const dialog=desktop.locator("#leave-dialog");
 await dialog.waitFor({state:"visible"});
 await desktop.locator("#leave-stay").click();
 assert((await desktop.evaluate(()=>location.pathname)).startsWith("/human-biology/"),"Cancelled leave left the activity");
 await desktop.locator("#site-home").click();
 await dialog.waitFor({state:"visible"});
 await desktop.locator("#leave-confirm").click();
 await desktop.waitForURL(base+"/");
 await screen(desktop,"homepage");

 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 await mobile.goto(base+"/",{waitUntil:"load"});
 await mobile.locator(".home-philosophy").waitFor({state:"visible"});
 const mobileMenu=mobile.locator(".site-nav details").first();
 await mobileMenu.locator("summary").click();
 assert(await mobileMenu.locator('a[href="/human-biology/"]').isVisible(),"Human Biology missing from mobile homepage dropdown");
 assert((await mobile.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth))<=3,"Mobile homepage has horizontal overflow");
 await mobile.setViewportSize({width:320,height:780});
 assert.equal(await mobileMenu.getByRole("group",{name:"Catch up by year"}).getByRole("link").count(),5);
 assert.equal(await mobileMenu.getByRole("group",{name:"By qualification"}).getByRole("link").count(),3);
 const dropdown=await mobileMenu.locator(".site-dropdown").boundingBox();
 assert(dropdown.x>=0&&dropdown.x+dropdown.width<=321,"The grouped menu must fit a narrow phone");
 await mobile.setViewportSize({width:390,height:844});
 await screen(mobile,"home-mobile");
 for(const name of ["teaching","teaching/simulations","privacy","alevel","human-biology"]){
  await checkPage(mobile,name);
  if(name==="teaching"||name==="alevel"||name==="human-biology")await screen(mobile,name.replaceAll("/","-")+"-mobile");
 }
 await mobile.goto(base+"/human-biology/#catchup/f175/a1/2",{waitUntil:"load"});
 await mobile.locator("#krp-model").waitFor({state:"visible"});
 assert((await mobile.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth))<=3,"F175 diagram must scroll inside its container, not overflow the page");
 assert((await mobile.locator(".krp-view").evaluate(el=>el.scrollWidth>el.clientWidth)),"F175 labelled diagram needs a scrollable phone viewport");
 await mobile.getByRole("button",{name:"Follow the current stage"}).click();
 assert.equal(await mobile.locator(".krp-diagram").getAttribute("viewBox"),"48 86 320 228");
 assert(await mobile.locator(".krp-view").evaluate(el=>el.scrollWidth<=el.clientWidth+2),"The focused diagram should fit on a phone");
 await mobile.getByRole("button",{name:"Follow the current stage"}).click();
 assert.equal(await mobile.locator(".krp-diagram").getAttribute("viewBox"),"0 0 900 600");
 await screen(mobile,"human-f175-mobile");
 await mobile.goto(base+"/human-biology/#skills");
 await mobile.getByRole("heading",{name:"Skills practice",exact:true}).waitFor();
 assert((await mobile.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth))<=3,"Skills menu overflows on phone");
 assert.equal(await mobile.getByRole("navigation",{name:"Human Biology app navigation"}).getByRole("link").count(),3);
 await screen(mobile,"human-skills-mobile");
 await mobile.locator('a[href="#skills/f171/rate"]').click();
 await mobile.locator(".k-skill-graph svg").waitFor();
 assert((await mobile.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth))<=3,"Skills graph overflows on phone");
 await mobile.getByText("Graph values in a table",{exact:true}).click();
 assert(await mobile.getByRole("table").isVisible(),"Accessible graph table cannot be opened");
 await screen(mobile,"human-skills-graph-mobile");
 // Shared site-return control must look and behave consistently across every page.
 const navPage=await browser.newPage({viewport:{width:1280,height:900}});
 navPage.on("pageerror",e=>errors.push("Shared navigation: "+e.message));
 let standard=null;
 await navPage.setViewportSize({width:320,height:800});
 await navPage.goto(base+"/");
 const homeFooter=navPage.locator("footer");
 const copyright=homeFooter.getByText("© 2026 Narajos",{exact:false});
 assert(await copyright.isVisible());
 const pronunciation=homeFooter.locator("em.site-pronunciation");
 assert.equal(await pronunciation.textContent(),"It’s /nerr-RA-hoss/.");
 assert.equal(await pronunciation.evaluate(node=>getComputedStyle(node).fontStyle),"italic");
 await homeFooter.getByRole("link",{name:"Terms of Use",exact:true}).click();
 await navPage.getByRole("heading",{name:"Terms of Use",exact:true}).waitFor();
 assert(await navPage.getByRole("heading",{name:"Third-party materials",exact:true}).isVisible());
 assert((await navPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"Terms overflow at phone width");
 await navPage.goto(base+"/science-catch-up/?year=8");
 assert(await navPage.locator("footer").getByRole("link",{name:"Terms of Use",exact:true}).isVisible());
 await navPage.setViewportSize({width:1280,height:900});

 const supporter=await browser.newPage({viewport:{width:320,height:780},isMobile:true,hasTouch:true});
 // The support form resets on pageshow. Wait for that lifecycle event before tapping.
 await supporter.addInitScript(()=>{
  window.addEventListener("pageshow",()=>{document.documentElement.dataset.smokePageShown="true";});
 });
 let kofiRequests=0;
 await supporter.route("https://ko-fi.com/narajos",route=>{
  kofiRequests++;
  return route.fulfill({status:200,contentType:"text/html",body:"<!doctype html><title>Ko-fi link test</title><h1>Ko-fi link test</h1>"});
 });
 await supporter.goto(base+"/");
 await supporter.locator("footer").getByRole("link",{name:"Support this website",exact:true}).tap();
 await supporter.getByRole("heading",{name:"Support this website",exact:true}).waitFor();
 await supporter.locator("html[data-smoke-page-shown]").waitFor({state:"attached"});
 const continueToKofi=supporter.getByRole("link",{name:"Continue to Ko-fi",exact:true});
 const adult=supporter.getByRole("checkbox",{name:"I am aged 18 or over.",exact:true});
 const outsideClass=supporter.getByRole("checkbox",{name:"I am not one of the website creator’s current students.",exact:true});
 assert.equal(await continueToKofi.getAttribute("href"),null);
 assert(await continueToKofi.isDisabled());
 await adult.tap();
 assert.equal(await continueToKofi.getAttribute("href"),null);
 await outsideClass.tap();
 assert.equal(await continueToKofi.getAttribute("href"),"https://ko-fi.com/narajos");
 await adult.tap();
 assert.equal(await continueToKofi.getAttribute("href"),null);
 await adult.tap();
 assert((await supporter.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"Support page overflows on a phone");
 assert.equal(kofiRequests,0,"The page must not contact Ko-fi before the visitor follows the link");
 await continueToKofi.tap();
 await supporter.getByRole("heading",{name:"Ko-fi link test",exact:true}).waitFor();
 assert.equal(kofiRequests,1);
 await supporter.goBack();
 await supporter.getByRole("heading",{name:"Support this website",exact:true}).waitFor();
 assert.equal(await continueToKofi.getAttribute("href"),null);
 assert(!(await adult.isChecked())&&!(await outsideClass.isChecked()));
 await supporter.setViewportSize({width:1280,height:900});
 assert((await supporter.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3);
 for(const path of ["/science-catch-up/","/science-catch-up/lesson/?topic=diffusion&year=10","/teaching/focused-writing/order/","/gcse/","/alevel/","/human-biology/","/teacher/"]){
  await supporter.goto(base+path);
  assert.equal(await supporter.locator('a[href="/support/"]').count(),0,"Support link in a learning or teaching activity "+path);
 }
 await supporter.close();

 const fq=await browser.newPage({viewport:{width:1280,height:900}});
 await fq.context().grantPermissions(["clipboard-read","clipboard-write"]);
 await fq.addInitScript(()=>{
  const open=window.open.bind(window);
  window.open=(...args)=>{
   const popup=open(...args);
   if(popup)popup.print=()=>{popup.document.documentElement.dataset.printCalled="true";};
   return popup;
  };
 });
 await fq.goto(base+"/teacher/");
 const setup=fq.getByRole("region",{name:"Set up",exact:true});
 assert.deepEqual((await setup.locator(".step h2").allTextContents()).map(x=>x.trim()),["1 Year","2 Topic","3 Activity","4 Purpose(s)"]);
 for(const year of [7,8,9,10,11]){
  const toggle=setup.getByRole("button",{name:"Year "+year,exact:true});
  await toggle.click();
  assert.equal(await toggle.getAttribute("aria-pressed"),"true");
  assert(await fq.locator("#lesson option").count()>0);
 }
 const topic=setup.getByLabel("2 Topic",{exact:true});
 assert.equal(await topic.inputValue(),await topic.locator("option").first().getAttribute("value"));
 await topic.selectOption({index:2});
 const remember=setup.getByRole("button",{name:"Remember",exact:true});
 const understanding=setup.getByRole("button",{name:"Check understanding",exact:true});
 await understanding.click();
 assert.equal(await remember.getAttribute("aria-pressed"),"true");
 assert.equal(await understanding.getAttribute("aria-pressed"),"true");
 assert(await understanding.locator("svg").isVisible());
 await setup.getByText("Advanced settings",{exact:true}).click();
 await setup.getByRole("button",{name:"Securing basics",exact:true}).click();
 assert.equal(await setup.getByRole("button",{name:"Securing basics",exact:true}).getAttribute("aria-pressed"),"true");
 const challenge=setup.getByRole("button",{name:"+ 1 Challenge question",exact:true});
 await challenge.click();
 assert.equal(await challenge.getAttribute("aria-pressed"),"true");
 assert(await fq.getByRole("checkbox",{name:"Use challenge question",exact:true}).isChecked());
 await setup.getByRole("button",{name:"MWB quiz",exact:true}).click();
 assert(await challenge.isHidden());
 const startQuiz=fq.getByRole("button",{name:"Start MWB quiz",exact:true});
 await startQuiz.click();
 await fq.locator("#stage.open").getByText(/Write your answer on your whiteboard/).waitFor();
 await fq.keyboard.press("Escape");
 await setup.getByRole("button",{name:"Do Now",exact:true}).click();
 assert.equal(await challenge.getAttribute("aria-pressed"),"true");
 const startDoNow=fq.getByRole("button",{name:"Start Do Now",exact:true});
 await startDoNow.click();
 await fq.locator("#stage.open").getByRole("button",{name:"Go to answers",exact:true}).click();
 await fq.locator("#stage.open").getByRole("button",{name:"3, 2, 1, show me",exact:true}).waitFor();
 await fq.keyboard.press("Escape");

 const bank=fq.getByRole("checkbox",{name:"Use question",exact:true});
 await bank.first().uncheck();
 const snapshot=()=>fq.locator("#qlist .q:not(.ext)").evaluateAll(rows=>rows.map(row=>[row.querySelector(".txt").textContent,row.querySelector("input").checked]));
 const customSet=await snapshot();
 await fq.reload();
 assert.deepEqual(await snapshot(),customSet);
 fq.once("dialog",dialog=>dialog.dismiss());
 const generate=fq.getByRole("button",{name:"Generate different questions",exact:true});
 await generate.click();
 assert.deepEqual(await snapshot(),customSet);
 fq.once("dialog",dialog=>dialog.accept());
 await generate.click();
 assert.notDeepEqual((await snapshot()).map(([question])=>question),customSet.map(([question])=>question));

 // Use an actual question with an authored common error for the clipboard and print checks.
 let questionWithError=await fq.evaluate(()=>sugg.findIndex(q=>q.w));
 for(let attempt=0;questionWithError<0&&attempt<4;attempt++){
  await generate.click();
  questionWithError=await fq.evaluate(()=>sugg.findIndex(q=>q.w));
 }
 assert(questionWithError>=0,"The selected bank should supply a common error for this check");
 await bank.nth(questionWithError).check();
 const readClipboard=()=>fq.evaluate(()=>navigator.clipboard.readText());
 const questionsButton=fq.getByRole("button",{name:"Copy questions",exact:true});
 const markButton=fq.getByRole("button",{name:"Copy mark scheme",exact:true});
 await questionsButton.click();
 await fq.getByRole("status").filter({hasText:"Questions copied"}).waitFor();
 const initialQuestions=await readClipboard();
 assert.match(initialQuestions,/Do Now.*Year 11/);
 assert.doesNotMatch(initialQuestions,/Watch for:/);
 await markButton.click();
 await fq.getByRole("status").filter({hasText:"Mark scheme copied"}).waitFor();
 assert.doesNotMatch(await readClipboard(),/Watch for:/);
 const chosenBefore=await snapshot();
 const commonErrors=async enabled=>{
  await fq.locator("#mark-options summary").click();
  await fq.getByLabel("Include common errors",{exact:true}).setChecked(enabled);
  await fq.keyboard.press("Escape");
 };
 await commonErrors(true);
 assert.deepEqual(await snapshot(),chosenBefore);
 await markButton.click();
 await fq.getByRole("status").filter({hasText:"Mark scheme copied"}).waitFor();
 assert.match(await readClipboard(),/Watch for:/);
 await questionsButton.click();
 await fq.getByRole("status").filter({hasText:"Questions copied"}).waitFor();
 assert.equal(await readClipboard(),initialQuestions);
 const sheet=async name=>{
  await fq.locator("#print-menu summary").click();
  const opened=fq.waitForEvent("popup");
  await fq.getByRole("button",{name,exact:true}).click();
  const popup=await opened;
  await popup.locator("html[data-print-called=true]").waitFor({state:"attached"});
  return popup;
 };
 const questionsSheet=await sheet("Question sheet");
 assert(await questionsSheet.locator(".question-sheet").isVisible());
 assert.equal(await questionsSheet.locator(".answer-sheet").count(),0);
 assert.doesNotMatch(await questionsSheet.locator("body").innerText(),/Watch for:/);
 await questionsSheet.close();
 const answersSheet=await sheet("Answer sheet");
 assert(await answersSheet.locator(".answer-sheet").isVisible());
 assert.match(await answersSheet.locator("body").innerText(),/Watch for:/);
 await answersSheet.close();
 await commonErrors(false);
 const combined=await sheet("Questions + answers");
 assert.deepEqual(await combined.locator("body>section").evaluateAll(el=>el.map(section=>section.className)),["question-sheet","answer-sheet"]);
 assert.doesNotMatch(await combined.locator("body").innerText(),/Watch for:/);
 await combined.emulateMedia({media:"print"});
 assert.equal(await combined.locator(".answer-sheet").evaluate(el=>getComputedStyle(el).breakBefore),"page");
 const combinedPdf=await combined.pdf({preferCSSPageSize:true});
 assert((combinedPdf.toString("latin1").match(/\/Type \/Page\b/g)||[]).length>=2,"The combined printout must use at least two pages");
 await combined.close();
 for(const width of [320,390,768,1280]){
  await fq.setViewportSize({width,height:844});
  const fqOverflow=await fq.evaluate(()=>{
   if(document.documentElement.scrollWidth-innerWidth<=3)return [];
   return [...document.body.querySelectorAll("*")].filter(el=>el.getBoundingClientRect().right>innerWidth+3)
    .slice(0,8).map(el=>[el.tagName,el.className,Math.round(el.getBoundingClientRect().right)]);
  });
  assert.deepEqual(fqOverflow,[],"Focused Questions overflows at "+width);
  const bar=fq.locator("#sumbar");
  await bar.evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY+200,behavior:"instant"}));
  assert((await bar.boundingBox()).y>=-1,"The question actions should stay visible while scrolling");
  await fq.locator("#mark-options summary").click();
  const popoverBox=await fq.locator("#mark-options .action-panel").boundingBox();
  assert(popoverBox.x>=0&&popoverBox.x+popoverBox.width<=width+1,"Mark scheme settings overflow at "+width);
  await fq.keyboard.press("Escape");
 }
 await fq.setViewportSize({width:390,height:844});
 await screen(fq,"focused-questions-mobile");
 await fq.close();

 for(const path of ["/","/404.html","/privacy/","/terms/","/teaching/","/teacher/","/gcse/","/alevel/","/human-biology/","/science-practice/","/teaching/simulations/",...['bioenergetics','cardiac-cycle','enzyme-inhibition','enzyme-kinetics','molecular-biology'].map(x=>"/teaching/simulations/"+x+"/")]){
  await navPage.goto(base+path,{waitUntil:"load"});
  const control=navPage.locator("#site-home");assert(await control.isVisible(),"Missing homepage control: "+path);
  assert.equal(await control.getAttribute("href"),"/");assert.equal(await control.innerText(),"narajos");
  const style=await control.evaluate(el=>{const s=getComputedStyle(el);return [s.fontSize,s.fontWeight,s.color,s.backgroundColor,s.borderRadius,s.minHeight];});
  if(!standard)standard=style;else assert.deepEqual(style,standard,"Homepage control style differs: "+path);
 }
 await navPage.goto(base+"/teaching/simulations/molecular-biology/");
 const molecularPlay=navPage.getByRole("button",{name:/Play/});
 await molecularPlay.waitFor();
 await navPage.getByText("Find the base pairs that hold the two strands together.",{exact:true}).waitFor();
 assert(await navPage.locator("#step-desc").isHidden());
 await navPage.getByRole("button",{name:/Step/,exact:false}).press("Enter");
 await navPage.getByText("Watch the two DNA strands separate at helicase.",{exact:true}).waitFor();
 assert(await molecularPlay.isVisible(),"Molecular Biology should stop after one step");
 await navPage.getByRole("button",{name:"Transcription",exact:true}).click();
 assert(await molecularPlay.isVisible(),"Changing process should start paused");
 await navPage.getByRole("button",{name:/Step/,exact:false}).press("Enter");
 await navPage.getByText("Look for the exposed bases on the template strand.",{exact:true}).waitFor();
 await navPage.getByText("Read the explanation",{exact:true}).press("Enter");
 assert.match(await navPage.locator("#step-desc").textContent(),/hydrogen bonds between the paired bases break/);
 await navPage.getByRole("button",{name:"Gene expression",exact:true}).click();
 const overview=navPage.getByRole("region",{name:"Explore the gene expression diagram"});
 await overview.getByRole("button",{name:"1. Epigenetic control",exact:true}).press("Enter");
 assert.equal(await overview.getByRole("button",{name:"1. Epigenetic control",exact:true}).getAttribute("aria-pressed"),"true");
 await overview.getByRole("status").filter({hasText:/tightly the DNA is wound/}).waitFor();
 await overview.getByText("Parts of the cell",{exact:true}).press("Enter");
 await overview.getByRole("button",{name:"Ribosome",exact:true}).press("Space");
 await overview.getByRole("status").filter({hasText:"Where mRNA is translated into a polypeptide."}).waitFor();
 await navPage.setViewportSize({width:320,height:800});
 await checkReadingSpacing(navPage,"Molecular Biology");
 await navPage.setViewportSize({width:1280,height:900});
 await navPage.goto(base+"/teaching/simulations/enzyme-inhibition/");
 await navPage.locator('button[data-level="3"]').click();
 const enzymePatterns=await navPage.locator("#series .series-swatch line").evaluateAll(lines=>lines.map(line=>line.getAttribute("stroke-dasharray")));
 assert.deepEqual(enzymePatterns,["none","7 4","1 4"]);
 await navPage.getByText("Graph values as a table",{exact:true}).press("Enter");
 const inhibitionTable=navPage.getByRole("table",{name:"Modelled values for the visible curves"});
 await inhibitionTable.locator("tbody tr").first().waitFor();
 assert.equal(await inhibitionTable.locator("tbody tr").count(),18);
 await navPage.locator("#series input").first().uncheck();
 assert.equal(await inhibitionTable.locator("tbody tr").count(),12);
 await navPage.setViewportSize({width:390,height:844});
 assert((await inhibitionTable.boundingBox()).width<=390,"Enzyme Inhibition data table is wider than the phone");
 await navPage.setViewportSize({width:1280,height:900});
 await navPage.goto(base+"/teaching/simulations/bioenergetics/");
 const guide=navPage.getByRole("region",{name:"Guided observations"});
 const guidePlay=guide.locator("#btn-guide-play");
 const guideNext=guide.getByRole("button",{name:"Next observation"});
 await guidePlay.waitFor();
 assert(await navPage.locator("#full-controls").isHidden());
 assert(await guideNext.isHidden());
 assert(await navPage.evaluate(()=>!S.playing && chemiOf().split===null),"Guided model should start still");
 await guidePlay.press("Enter");
 await navPage.waitForFunction(()=>chemiOf().totals.byp>0);
 assert(await navPage.evaluate(()=>chemiOf().protons.filter(p=>p.state==="high"&&p.y<LG.memTop).length>=4),"Photolysis should release protons into the lumen");
 await guide.getByText("What happened?",{exact:true}).click();
 assert(await guide.getByText(/releases oxygen and hydrogen ions into the thylakoid lumen/).isVisible());
 await guideNext.click();
 await guide.getByText("Observation 2 of 3",{exact:true}).waitFor();
 assert(await guidePlay.evaluate(el=>el===document.activeElement));
 await navPage.setViewportSize({width:320,height:800});
 assert((await navPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"Guided bioenergetics overflows a narrow viewport");
 await navPage.waitForFunction(()=>{
  const canvas=document.querySelector("#viz");
  return canvas.getBoundingClientRect().width<=320 && canvas.width<=640;
 });
 await checkReadingSpacing(navPage,"Bioenergetics guide");
 await navPage.getByRole("button",{name:"Open full model"}).click();
 assert(await navPage.getByRole("button",{name:/Switch to dark/}).isVisible());
 assert(await guide.isHidden());
 await navPage.getByRole("button",{name:"Calvin cycle",exact:true}).click();
 assert(await navPage.getByRole("button",{name:/Remove CO₂/}).isVisible());
 await navPage.setViewportSize({width:1280,height:900});
 await navPage.goto(base+"/teaching/simulations/cardiac-cycle/");
 await navPage.locator("body:not(.booting)").waitFor();
 const cardiacPatterns=await navPage.locator("#legend .series-swatch line").evaluateAll(lines=>lines.map(line=>line.getAttribute("stroke-dasharray")));
 assert.deepEqual(cardiacPatterns,["7 4","none","1 4","9 3 2 3"]);
 const cycleSlider=navPage.getByRole("slider",{name:"Position in the cycle"});
 assert.equal(await navPage.locator("#sound-flash").textContent(),"","No heart sound should appear before the first valve event");
 await cycleSlider.press("End");
 assert.equal(await cycleSlider.inputValue(),"100");
 assert.equal(await navPage.locator("#sound-flash").textContent(),"","Scrubbing should not claim a valve event");
 await cycleSlider.press("Home");
 await cycleSlider.press("ArrowRight");
 assert.equal(await cycleSlider.inputValue(),"1");
 const ecg=navPage.locator("#ecg-panel"),mechanical=navPage.locator("#mechanical-graph-panel");
 assert(await ecg.isHidden());assert(await mechanical.isVisible());
 for(const level of [1,2,3]){await navPage.locator('button[data-level="'+level+'"]').click();assert(await ecg.isHidden(),"Detail level must not reveal optional ECG");}
 await navPage.locator("#btn-ecg").click();assert(await ecg.isVisible());assert(await mechanical.isVisible());
 assert.equal(await navPage.locator("#btn-ecg").getAttribute("aria-expanded"),"true");
 await navPage.waitForTimeout(120);
 assert(await navPage.locator("#ecg").evaluate(c=>c.width>100&&c.height>80),"Visible ECG canvas has no useful size");
 const heartBox=await navPage.locator(".heartbox").boundingBox(),ecgBox=await ecg.boundingBox();
 assert(ecgBox.x>=heartBox.x+heartBox.width,"Desktop ECG must sit beside heart");
 const pressureBox=await navPage.locator("#graph").boundingBox(),pressurePanel=await mechanical.boundingBox();
 assert(pressureBox.y+pressureBox.height<=pressurePanel.y+pressurePanel.height+1,"Pressure graph is clipped inside its panel");
 await screen(navPage,"cardiac-optional-ecg");
 await navPage.locator('button[data-scene="elec"]').click();assert(await ecg.isVisible());assert(await mechanical.isHidden());
 await navPage.locator("#hide-ecg").click();assert(await ecg.isHidden());
 assert(await navPage.locator("#btn-ecg").evaluate(el=>document.activeElement===el));
 const coreCopy=await navPage.locator(".stage").innerText();assert(!/P wave|QRS|T wave/.test(coreCopy),"Core conduction view still exposes ECG wave labels");
 await navPage.locator("#btn-ecg").click();
 await navPage.evaluate(()=>setRunning(false));
 const canvas=await navPage.locator("#ecg").boundingBox();
 await navPage.mouse.click(canvas.x+canvas.width*.6,canvas.y+canvas.height*.5);
 const scrubbedPhase=await navPage.evaluate(()=>S.phi);assert(scrubbedPhase>.4&&scrubbedPhase<.8,"ECG scrubbing did not change the shared heart clock");
 await navPage.evaluate(()=>{S.block=true;S.ventPhi=.4;S.phi=.2;});
 assert(await navPage.evaluate(()=>Math.abs(ecgVentricularPhase(S.phi)-S.ventPhi)<1e-9),"ECG cursor must share the ventricular clock during block");
 await navPage.evaluate(()=>{S.block=false;});

 await navPage.setViewportSize({width:1280,height:720});
 await navPage.locator('button[data-scene="mech"]').click();
 assert(await ecg.isVisible());assert((await navPage.locator("#ecg").boundingBox()).height>80);
 await navPage.setViewportSize({width:390,height:844});
 assert((await navPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"Optional ECG overflows phone width");
 const phoneHeart=await navPage.locator(".heartbox").boundingBox(),phoneEcg=await ecg.boundingBox();
 assert(phoneEcg.y>phoneHeart.y,"Phone ECG should stack below the heart");
 await ecg.scrollIntoViewIfNeeded();
 await screen(navPage,"cardiac-optional-ecg-mobile");
 await navPage.setViewportSize({width:1280,height:900});
 await navPage.goto(base+"/human-biology/#challenge/f170/build");
 await navPage.getByRole("heading",{name:"Build understanding",exact:true}).waitFor();
 assert.equal(await navPage.locator("[href^='#challenge/f170/p-']").count(),28);
 assert.equal(await navPage.locator(".k-progression-area").count(),4);
 const labelledLink=navPage.locator("[href^='#challenge/f170/p-']").first();
 assert((await labelledLink.locator(".sr-only").boundingBox()).width<=1,"Accessible label must not repeat visibly in the button");
 const secondGroup=navPage.locator(".k-progression-area").nth(1);
 assert(await secondGroup.locator(".k-skill-card").first().isHidden());
 await secondGroup.locator("summary").click();assert(await secondGroup.locator(".k-skill-card").first().isVisible());
 await navPage.evaluate(()=>scrollTo(0,0));
 await screen(navPage,"human-progressive-menu");
 const route="/human-biology/#challenge/f170/p-cell-stage-metaphase";
 await navPage.goto(base+route);
 let chosenCore;
 for(let i=0;i<4;i++){
  await navPage.locator(".k-question-view").waitFor();
  const state=await navPage.evaluate(()=>JSON.parse(localStorage.getItem("narajos-human-challenge-v2-session")));
  if(i===0){chosenCore=state.queue[2];assert((await navPage.locator(".k-sequence-note").innerText()).includes("1 ·"));}
  const task=await navPage.evaluate(id=>window.KeystoneHumanChallenges.questions.find(q=>q.id===id),state.queue[state.index]);
  if(task.type==="written"){
   await navPage.locator("#k-written").fill("Sister chromatids separate to opposite poles. Each pole receives one copy of each of the 46 chromosomes, so each daughter cell receives 46.");
   await navPage.locator('[data-k-action="reveal"]').click();
   await navPage.locator('[data-k-action="finish-review"]').click();
   await navPage.locator('[data-k-action="next"]').click();
  }else{
   await navPage.locator('input[name="kchoice"][value="'+task.correct+'"]').focus();await navPage.keyboard.press("Space");
   if(await navPage.locator('[data-k-action="check"]').count())await navPage.locator('[data-k-action="check"]').click();
   await navPage.locator(".k-feedback.correct").waitFor();
   if(i===1){await navPage.reload();await navPage.locator(".k-feedback.correct").waitFor();}
   await navPage.locator('[data-k-action="next"]').click();
  }
 }
 await navPage.getByRole("heading",{name:"Sequence complete",exact:true}).waitFor();
 await navPage.getByRole("button",{name:"Repeat this idea"}).click();
 assert.notEqual(await navPage.evaluate(()=>JSON.parse(localStorage.getItem("narajos-human-challenge-v2-session")).queue[2]),chosenCore);
 await navPage.getByRole("link",{name:"← Leave this set"}).click();
 await navPage.locator("#leave-confirm").click();
 await navPage.setViewportSize({width:390,height:844});
 await navPage.goto(base+"/human-biology/#challenge/f171/build");
 await navPage.getByRole("heading",{name:"Build understanding",exact:true}).waitFor();
 assert.equal(await navPage.locator("[href^='#challenge/f171/p-']").count(),21);
 assert((await navPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"Progression menu overflows phone width");
 await screen(navPage,"human-progressive-mobile");
 // Start from the new student entry points at phone width.
 await navPage.goto(base+"/gcse/");
 const tier=navPage.getByLabel("Exam tier",{exact:true});
 await tier.selectOption("F");
 const query=navPage.getByRole("searchbox",{name:"Topic or keyword"});
 await query.fill("osmosis");
 const exactOsmosis=navPage.getByRole("link",{name:"Practise questions: Osmosis (part 1)",exact:true});
 await exactOsmosis.click();
 await navPage.waitForURL("**/#lesson-b1-osmosis");
 await navPage.locator(".ltop").waitFor();
 await navPage.goto(base+"/gcse/");
 await query.fill("amylase");
 const biologyResult=navPage.getByRole("link",{name:"Learn and practise: Organisation",exact:true});
 await biologyResult.click();
 await navPage.getByRole("heading",{name:/Organisation/,level:1}).waitFor();
 await navPage.goto(base+"/gcse/");
 assert.equal(await tier.inputValue(),"F","GCSE tier choice did not persist");
 await query.fill("this topic does not exist");
 await navPage.getByRole("status").filter({hasText:"No matching topics"}).waitFor();
 await navPage.goto(base+"/alevel/");
 const advancedSearch=navPage.getByRole("searchbox",{name:"Topic or keyword"});
 await advancedSearch.fill("osmosis");
 const advancedOsmosis=navPage.locator('[data-topic-finder] a[href="#catchup-a2-osmosis"]');
 await advancedOsmosis.click();
 await navPage.getByRole("heading",{name:/^Osmosis and water potential/,level:1}).waitFor();
 await navPage.goto(base+"/human-biology/");
 await navPage.getByLabel("Subject or unit").selectOption("f171");
 await navPage.getByRole("searchbox",{name:"Topic or keyword"}).fill("casts");
 const castQuestion=navPage.getByRole("link",{name:/Practise: Compare plaster/});
 await castQuestion.click();
 await navPage.getByRole("heading",{name:/main purpose of a cast/}).waitFor();
 await navPage.getByRole("link",{name:"← Leave this set"}).click();
 await navPage.locator("#leave-confirm").click();
 await navPage.getByText("More practice options",{exact:true}).click();
 await navPage.getByRole("link",{name:/Clinical case questions/}).click();
 await navPage.getByRole("link",{name:/Follow-up after screening/}).click();
 await navPage.locator("#k-written").fill("Only 45 of the 60 people with a positive screen attended follow-up.");
 await navPage.locator('[data-k-action="reveal"]').click();
 await navPage.getByText("Key points to look for").waitFor();
 const originalClinical="Only 45 of the 60 people with a positive screen attended follow-up.";
 const revisedClinical=originalClinical+" Those who did not attend may have differed from those who did.";
 assert.equal(await navPage.locator(".k-review-draft").textContent(),originalClinical);
 assert.equal(await navPage.locator("[data-feedback-heading]").evaluate(el=>document.activeElement===el),true);
 const reviewCriterion=navPage.locator("[data-review-criterion]").first();
 await reviewCriterion.selectOption("work");
 await navPage.locator("#k-revised").fill(revisedClinical);
 await navPage.reload();
 assert.equal(await reviewCriterion.inputValue(),"work");
 assert.equal(await navPage.locator("#k-revised").inputValue(),revisedClinical);
 assert.equal(await navPage.locator(".k-review-draft").textContent(),originalClinical);
 assert.equal(await navPage.evaluate(()=>JSON.parse(localStorage.getItem("narajos-human-challenge-v2-session")).selfReviewed||0),0);
 await navPage.locator('[data-k-action="finish-review"]').click();
 await navPage.reload();
 await navPage.getByText("Self-reviewed · further practice useful").waitFor();
 assert.equal(await navPage.locator("#k-revised").inputValue(),revisedClinical);
 assert.equal(await navPage.evaluate(()=>JSON.parse(localStorage.getItem("narajos-human-challenge-v2-session")).selfReviewed),1);
 await navPage.locator('[data-k-action="next"]').click();
 await navPage.getByRole("heading",{name:"Practice complete"}).waitFor();
 await navPage.goto(base+"/human-biology/#flashcards/f171");
 await navPage.getByRole("link",{name:"Practise monitoring",exact:true}).click();
 await navPage.getByRole("button",{name:"Reveal answer"}).click();
 await navPage.getByText("Expected answer",{exact:true}).waitFor();
 await navPage.getByRole("link",{name:"← Flashcards",exact:true}).click();
 await navPage.locator("#leave-confirm").click();
 await navPage.getByRole("heading",{name:"F171 flashcards",exact:true}).waitFor();
 await navPage.goto(base+"/");
 const phoneTeacherMenu=navPage.locator(".site-nav .teacher-menu");
 await phoneTeacherMenu.locator("summary").click();
 assert((await navPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"Teacher Tools dropdown overflows the phone viewport");
 assert(await phoneTeacherMenu.getByRole("link",{name:"Focused Questions",exact:true}).isVisible());
 await phoneTeacherMenu.getByRole("link",{name:"Focused Writing",exact:true}).click();
 const yearIntroLinks = await navPage.locator('.spo-year-links a').evaluateAll(links=>links.map(link=>link.href));
 assert.equal(yearIntroLinks.length,7);
 for(const path of yearIntroLinks){
   await navPage.goto(path);
   await navPage.getByRole("heading",{name:"Introduction to the SPO",exact:true}).waitFor();
   const year=new URL(path).searchParams.get("year");
   assert.equal(await navPage.locator('.spo-year-links [aria-current="page"]').textContent(),"Year "+year);
   assert((await navPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"SPO introduction overflows");
 }
 await navPage.goto(base+"/teaching/focused-writing/");
 await navPage.getByRole("link",{name:/KS3 · Explain a change/}).click();
 await navPage.getByRole("heading",{name:"KS3 · Explain a change",exact:true}).waitFor();
 await navPage.waitForLoadState("load");
 const ks3Sentence=navPage.locator('[data-writing-exercise="dye"][data-writing-kind="short"]');
 await ks3Sentence.getByRole("button",{name:"Use sentence starter",exact:true}).press("Enter");
 const dyeDraft=ks3Sentence.locator("textarea");
 assert((await dyeDraft.inputValue()).endsWith("because "));
 await dyeDraft.fill("The dye spread further in the warm water because there were more particles.");
 await ks3Sentence.getByRole("button",{name:"Check my sentence",exact:true}).click();
 await ks3Sentence.getByRole("status").filter({hasText:"Compare your reasoning with the model."}).waitFor();
 assert(await ks3Sentence.locator('[data-review-state="revise"]').getByText("Check for a possible conflict",{exact:false}).isVisible());
 assert.equal(await ks3Sentence.locator('[data-review-state="matched"]').count(),0);
 await dyeDraft.fill("The dye spread further in the warm water because its particles moved faster.");
 await ks3Sentence.getByRole("button",{name:"Check my sentence",exact:true}).click();
 await ks3Sentence.getByRole("status").filter({hasText:"Possible reasoning link found."}).waitFor();
 await ks3Sentence.getByText("Compare your first and latest sentences",{exact:true}).click();
 assert((await ks3Sentence.locator("[data-first-sentence]").innerText()).includes("more particles"));

 const outline=navPage.getByLabel("Supporting note 1",{exact:true});
 await navPage.getByText("Plan your paragraph",{exact:true}).click();
 await outline.fill("warmer → faster random movement → quicker spread");
 await navPage.getByRole("button",{name:"Use a partly filled plan",exact:true}).click();
 assert.equal(await outline.inputValue(),"warmer → faster random movement → quicker spread","A scaffold must preserve a pupil’s existing notes");
 assert((await navPage.getByLabel("Topic sentence:",{exact:true}).inputValue()).includes("Food colouring"));

 await navPage.reload();
 if(!await outline.isVisible())await navPage.getByText("Plan your paragraph",{exact:true}).click();
 assert.equal(await outline.inputValue(),"warmer → faster random movement → quicker spread");
 await navPage.getByText("See a worked example",{exact:true}).click();
 assert.equal(await navPage.locator(".writing-example-plan dt").count(),3);
 assert(await navPage.locator(".writing-card .writing-model .model").isHidden(),"The full KS3 paragraph should be available on request");
 await navPage.getByText("Read the full paragraph",{exact:true}).click();
 assert(await navPage.locator(".writing-card .writing-model .model").isVisible());
 for(const [level,visual] of [["ks3","dye-spread"],["gcse","osmosis-results"],["alevel","glucose-cotransport"]]){
  await navPage.goto(base+"/teaching/focused-writing/"+level+"/");
  assert.equal(await navPage.locator("main .writing-card").count(),1,"Share links should show one writing activity");
  const image=navPage.locator('img[src$="/'+visual+'.png"]');
  assert(await image.evaluate(img=>img.complete&&img.naturalWidth>0&&img.alt.length>20),"Writing prompt image or alternative text missing");
  assert((await navPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"Writing activity overflows at phone width");
  await screen(navPage,"focused-writing-"+level+"-mobile");
 }
 await navPage.goto(base+"/teaching/focused-writing/gcse/");
 const potatoSentence=navPage.locator('[data-writing-exercise="potato"][data-writing-kind="short"]');
 const potatoEvidence=potatoSentence.locator("textarea");
 await potatoEvidence.fill("Dilute: −9% and concentrated: +7%.");
 await potatoSentence.getByRole("button",{name:"Check my sentence",exact:true}).click();
 await potatoSentence.getByRole("status").filter({hasText:"0 of 2 data results matched."}).waitFor();
 assert.equal(await potatoSentence.locator('[data-review-state="revise"]').count(),2);
 await potatoEvidence.fill("The potato gained 7% in dilute solution and lost 9% in concentrated solution.");
 await potatoSentence.getByRole("button",{name:"Check my sentence",exact:true}).press("Enter");
 await potatoSentence.getByRole("status").filter({hasText:"2 of 2 data results matched."}).waitFor();
 await navPage.getByText("Explain one result",{exact:true}).click();
 const potatoReason=navPage.locator('[data-writing-exercise="potato"][data-writing-kind="reason"]');
 await potatoReason.locator("textarea").fill("The sample gained mass because water moved into the potato cells.");
 await potatoReason.getByRole("button",{name:"Check my sentence",exact:true}).click();
 await potatoReason.getByRole("status").filter({hasText:"Possible reasoning link found."}).waitFor();
 assert.equal(await potatoReason.locator('[data-review-state="detected"]').count(),1);
 assert.equal(await potatoReason.locator('[data-review-state="matched"]').count(),0);
 assert(await potatoReason.locator("[data-sentence-model]").isVisible());
 await navPage.getByText("Try a new pair of results",{exact:true}).click();
 const potatoTransfer=navPage.locator('[data-writing-exercise="potato"][data-writing-kind="transfer"]');
 await potatoTransfer.locator("textarea").fill("Dilute solution: +5%, concentrated solution: −6%.");
 await potatoTransfer.getByRole("button",{name:"Check my sentence",exact:true}).click();
 await potatoTransfer.getByRole("status").filter({hasText:"2 of 2 data results matched."}).waitFor();
 await checkReadingSpacing(navPage,"Focused Writing short answers");
 await navPage.getByText("Plan your paragraph",{exact:true}).click();
 const outlineCheck=navPage.getByRole("button",{name:"Check my outline",exact:true});
 const outlineReview=navPage.locator(".writing-outline-review");
 await outlineCheck.click();
 await outlineReview.getByRole("status").filter({hasText:"Still to add: topic sentence, supporting notes, concluding sentence."}).waitFor();
 const opening=navPage.getByLabel("Topic sentence:",{exact:true});
 const supports=navPage.getByLabel("Supporting note 1",{exact:true});
 const concluding=navPage.getByLabel("Concluding sentence:",{exact:true});
 await opening.fill("The potato mass changed.");
 await supports.fill("The potato gained 17%.");
 await concluding.fill("The potato mass changed!");
 await outlineCheck.click();
 await outlineReview.getByRole("status").filter({hasText:"Your opening and ending repeat each other."}).waitFor();
 assert(await outlineReview.getByText("Look for 7% and 9%",{exact:false}).isVisible());
 await supports.fill("+7% in dilute and -9% in concentrated");
 assert(await outlineReview.locator(".writing-report").isHidden(),"Outline feedback should reset when the learner revises");
 await concluding.fill("Test more sugar concentrations between the starting values.");
 await outlineCheck.click();
 assert(await outlineReview.getByText("Both figures appear",{exact:false}).isVisible());
 await outlineReview.getByText("See a possible outline",{exact:true}).click();
 assert(await outlineReview.getByText("I would test intermediate sugar concentrations",{exact:false}).isVisible());
 const notesHelp=navPage.locator('summary[aria-label="Help with supporting notes"]');
 await notesHelp.focus();
 await navPage.keyboard.press("Enter");
 await navPage.getByText(/Evidence is what you measured or observed/).waitFor();
 await navPage.getByText("Write your paragraph",{exact:true}).click();
 await navPage.locator('summary[aria-label="Help with your paragraph"]').click();
 await navPage.getByText(/Write it all as one paragraph/).waitFor();
 const draft=navPage.getByLabel("Your paragraph:",{exact:true});
 const checkDraft=navPage.getByRole("button",{name:"Check my paragraph",exact:true});
 await checkDraft.click();
 await navPage.getByRole("status").filter({hasText:"Write a draft before checking it."}).waitFor();
 assert(await draft.evaluate(element=>element===document.activeElement));
 await navPage.getByRole("button",{name:"Use my checked sentences",exact:true}).click();
 assert((await draft.inputValue()).includes("The potato gained 7%") &&
  (await draft.inputValue()).includes("water moved into the potato cells"),"Checked sentences should be available to build a paragraph");

 await draft.fill("The potato lost 7% in dilute solution. In concentrated solution it gained 9%. There was no osmosis.");
 await checkDraft.click();
 const report=navPage.locator("[data-writing-report]");
 assert.equal(await report.locator('[data-review-state="matched"]').count(),0,"Swapped results must not match the data");
 await report.getByText("Words and figures found",{exact:true}).click();
 await report.getByText(/Found in your draft: “7%”, “9%”/).waitFor();
 assert((await report.innerText()).includes("gained 7% in dilute solution and lost 9% in concentrated solution"));
 assert((await report.innerText()).includes("The checker looks for words or values in your draft."));
 await draft.fill("My observations.\n\n- 7% increase");
 assert(await report.isHidden(),"Editing a checked draft should clear stale feedback");
 await checkDraft.click();
 await navPage.getByRole("status").filter({hasText:"There are separate blocks or list points."}).waitFor();
 await navPage.context().grantPermissions(["clipboard-read","clipboard-write"]);
 await navPage.getByRole("button",{name:"Copy for teacher",exact:true}).click();
 await navPage.getByRole("status").filter({hasText:"Copied."}).waitFor();
 const copied=await navPage.evaluate(()=>navigator.clipboard.readText());
 assert(copied.includes("Report both changes in mass.") && copied.includes("First checked: Dilute: −9%") &&
  copied.includes("Latest sentence: The potato gained 7%") && copied.includes("Supporting note 1:") &&
  copied.includes("Paragraph\nMy observations."),"The teacher copy must include the prompt, revision, outline and paragraph");

 await navPage.getByText("Compare with the key ideas",{exact:true}).click();
 assert.equal(await navPage.locator(".writing-key li").count(),4);
 await navPage.getByRole("link",{name:"More GCSE writing tasks",exact:true}).click();
 const writingTasks=navPage.locator("#gcse-tasks a");
 assert.equal(await writingTasks.count(),6);
 const taskPaths=await writingTasks.evaluateAll(links=>links.map(link=>link.href));
 for(const path of taskPaths){
  await navPage.goto(path);
  assert.equal(await navPage.locator("main .writing-card").count(),1);
  assert(await navPage.locator(".writing-data, diagram-practice[topic=trolley]").isVisible());
  await navPage.getByText("Write your paragraph",{exact:true}).click();
  assert.equal(await navPage.getByLabel("Your paragraph:",{exact:true}).inputValue(),"");
  assert((await navPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"GCSE writing task overflows at phone width");
 }
 await desktop.goto(base+"/ks3/lesson/?topic=fair-tests");
 await desktop.getByRole("heading",{name:"Roll a toy down a ramp"}).waitFor();
 const rampOnDesktop=desktop.locator("toy-ramp");
 await rampOnDesktop.locator(".tr-apparatus svg").scrollIntoViewIfNeeded();
 const bike=await rampOnDesktop.getByRole("button",{name:"Bicycle",exact:true}).boundingBox();
 const rampSvg=await rampOnDesktop.locator(".tr-apparatus svg").boundingBox();
 await desktop.mouse.move(bike.x+bike.width/2,bike.y+bike.height/2);
 await desktop.mouse.down();
 await desktop.mouse.move(rampSvg.x+rampSvg.width*.18,rampSvg.y+rampSvg.height*.5,{steps:12});
 await desktop.mouse.up();
 assert.equal(await rampOnDesktop.getByRole("button",{name:"Bicycle",exact:true}).getAttribute("aria-pressed"),"true");
 assert.equal(await rampOnDesktop.getByLabel("Release point").inputValue(),"middle");
 await rampOnDesktop.getByRole("button",{name:"Roll toy"}).click();
 await rampOnDesktop.getByRole("status").filter({hasText:/Distance from the ramp: \d+ cm/}).waitFor();
 await navPage.goto(base+"/teaching/focused-writing/order/");
 const ramp=navPage.locator("toy-ramp");
 assert(await ramp.isHidden());
 await navPage.getByText("Try the ramp model",{exact:true}).click();
 const reading=ramp.locator("[data-runs] dd strong").first();
 async function rollAndRead(){
  await ramp.getByRole("button",{name:"Roll toy"}).press("Enter");
  await ramp.getByRole("status").filter({hasText:/Distance from the ramp: \d+ cm/}).waitFor();
  return parseInt(await reading.textContent(),10);
 }
 await navPage.emulateMedia({reducedMotion:"reduce"});
 const original=await rollAndRead();
 await ramp.getByText("Change the toy’s paint or load",{exact:true}).click();
 await ramp.getByLabel("Paint colour").selectOption("blue");
 assert.equal(await rollAndRead(),original,"Repainting the same toy changed its result");
 assert.equal(await ramp.locator("[data-runs] dt").count(),2);
 await ramp.getByLabel("Ramp angle").selectOption("30");
 assert(await rollAndRead()>original,"The same toy should roll further from the steeper ramp");
 await ramp.getByLabel("Ramp angle").selectOption("20");
 await ramp.getByLabel("Ramp surface").selectOption("felt");
 assert(await rollAndRead()<original,"The felt should shorten the run in this model");
 await ramp.getByLabel("Ramp surface").selectOption("plastic");
 await ramp.getByLabel("Release point").selectOption("bottom");
 assert(await rollAndRead()<original,"A lower release point should shorten the run");
 await ramp.getByLabel("Release point").selectOption("top");
 await ramp.getByLabel("Add a small load").check();
 assert(await rollAndRead()>original,"The test load should affect this toy's model distance");
 await checkReadingSpacing(navPage,"Toy ramp investigation");
 await navPage.emulateMedia({reducedMotion:"no-preference"});
 const oneParagraph=navPage.locator('[data-writing-order="ramp"]');
 const checkOrder=activity=>activity.getByRole("button",{name:"Check order",exact:true});
 const bankCard=(activity,start)=>activity.locator(".writing-order-options").getByRole("button",{name:new RegExp("^"+start)});
 const slot=(activity,index)=>activity.locator('[data-order-position="'+index+'"]');
 const placeCard=async(activity,start,index)=>{
  await bankCard(activity,start).click();
  await slot(activity,index).locator("[data-order-place]").click();
 };
 const chooseSentence=async(activity,start,index)=>{
  await slot(activity,index).getByRole("button").press("Enter");
  const dialog=activity.getByRole("dialog");
  await dialog.getByRole("button",{name:new RegExp("^"+start)}).press("Enter");
  await dialog.waitFor({state:"hidden"});
 };
 const rampModel=navPage.locator("[data-ramp-model]");
 await rampModel.getByText("Reveal the topic sentence",{exact:true}).press("Enter");
 assert(await rampModel.getByText(/It answers the question by showing/).isVisible());
 await navPage.getByText("Practise with the ramp",{exact:true}).press("Enter");
 assert(await checkOrder(oneParagraph).isDisabled());
 for(const [i,start] of ["Different cars","Using the same car each time helps","These differences","Using the same car keeps","This makes the comparison"].entries()){
  await chooseSentence(oneParagraph,start,i);
 }
 assert.equal(await oneParagraph.locator("[data-result]").count(),0,"Placing the last card must not mark the answer");
 await checkOrder(oneParagraph).click();
 const rampReview=oneParagraph.locator("[data-order-review]");
 assert.match(await rampReview.getByRole("status").textContent(),/^Not quite. Review the topic sentence/);
 assert(await rampReview.getByRole("button").evaluate(el=>el===document.activeElement));
 await slot(oneParagraph,0).getByRole("button").press("Enter");
 const rampPicker=oneParagraph.getByRole("dialog");
 await rampPicker.getByText("Swap with another position",{exact:true}).press("Enter");
 await rampPicker.getByRole("button",{name:/Supporting sentence 1 · Using the same car each time helps/}).press("Enter");
 await checkOrder(oneParagraph).click();
 await oneParagraph.getByRole("status").filter({hasText:"Correct."}).waitFor();
 await oneParagraph.getByText("Read the completed paragraph",{exact:true}).click();
 assert(await oneParagraph.locator(".model").isVisible());
 const spoRamp=navPage.locator("[data-ramp-practice]");
 await spoRamp.getByText("We do · Practise the decisions",{exact:true}).press("Enter");
 await spoRamp.getByRole("button",{name:"To test ramp height fairly, use the same car each time.",exact:true}).press("Enter");
 await spoRamp.getByText(/This tells the pupil what to do/).waitFor();
 await spoRamp.getByText("Plan your paragraph",{exact:true}).press("Enter");
 const supportingNotes=["different wheels and friction","different friction changes distance"];
 await spoRamp.getByLabel("Topic sentence:",{exact:true}).fill("Using the same car helps isolate the effect of ramp height.");
 for(const [index,note] of supportingNotes.entries()){
   await spoRamp.getByLabel("Supporting note "+(index+1),{exact:true}).fill(note);
 }
 await spoRamp.getByLabel("Concluding sentence:",{exact:true}).fill("The distances can then be compared more fairly.");
 await spoRamp.getByText("Develop your supporting sentences",{exact:true}).press("Enter");
 await spoRamp.getByLabel("Supporting sentence 1",{exact:true}).fill("Different cars can have different wheels and friction.");
 await spoRamp.getByRole("button",{name:"Develop note 2",exact:true}).press("Enter");
 assert(await spoRamp.getByText(supportingNotes[1],{exact:true}).isVisible());
 await spoRamp.getByLabel("Supporting sentence 2",{exact:true}).fill("Friction can change how far the car rolls.");
 await spoRamp.getByText("Write your paragraph",{exact:true}).press("Enter");
 const assembled=spoRamp.getByLabel("Your paragraph:",{exact:true});
 await spoRamp.getByRole("button",{name:"Assemble my paragraph",exact:true}).press("Enter");
 const beforeRevision=await assembled.inputValue();
 assert.match(beforeRevision,/height\. Different cars.*Friction can change.*more fairly\./);
 await assembled.fill(beforeRevision.replace("more fairly","with fewer confounding factors"));
 const afterRevision=await assembled.inputValue();
 await spoRamp.getByRole("button",{name:"Assemble my paragraph",exact:true}).press("Enter");
 assert.equal(await assembled.inputValue(),afterRevision,"Reassembling must preserve an edited paragraph");
 await spoRamp.getByText("Compare first and current versions",{exact:true}).press("Enter");
 assert(await spoRamp.getByText("with fewer confounding factors",{exact:false}).isVisible());
 await navPage.reload();
 await navPage.getByText("Practise with the ramp",{exact:true}).press("Enter");
 await spoRamp.getByText("Write your paragraph",{exact:true}).press("Enter");
 assert.equal(await assembled.inputValue(),afterRevision);
 const sand=navPage.locator('[data-writing-order="sandstone"]');
 const igneous=navPage.locator('[data-writing-order="granite"]');
 const advance=navPage.getByRole("button",{name:"Continue to granite",exact:true});
 assert(await igneous.isHidden());
 assert(await advance.isHidden());
 await slot(sand,0).getByRole("button").press("Enter");
 assert(await sand.getByRole("dialog").getByText("Which sentence gives the overall explanation?").isVisible());
 await navPage.keyboard.press("Escape");
 assert(await slot(sand,0).getByRole("button").evaluate(el=>el===document.activeElement));
 for(const [i,start] of ["This sandstone","Sand grains","The weight","Minerals deposited","Deposition"].entries()){
  await chooseSentence(sand,start,i);
 }
 await checkOrder(sand).press("Enter");
 await advance.press("Enter");
 assert(await sand.isHidden());
 await slot(igneous,0).getByRole("button").press("Enter");
 assert(await igneous.getByRole("dialog").getByText("Hint",{exact:true}).isVisible());
 assert(await igneous.getByRole("dialog").getByText("Introduce what the granite formed from.").isHidden());
 await navPage.keyboard.press("Escape");
 for(const [i,start] of ["This granite","As the temperature","The molten rock","The crystals had","Slow cooling"].entries()){
  await chooseSentence(igneous,start,i);
 }
 await checkOrder(igneous).press("Enter");
 assert.match(await igneous.locator("[data-order-review]").innerText(),/Review supporting sentence 1/);
 await slot(igneous,1).getByRole("button").press("Enter");
 await igneous.getByRole("dialog").getByText("Swap with another position",{exact:true}).press("Enter");
 await igneous.getByRole("button",{name:/Supporting sentence 2 · The molten rock/}).press("Enter");
 await checkOrder(igneous).press("Enter");
 await navPage.getByRole("button",{name:"Compare both paragraphs",exact:true}).press("Enter");
 const comparison=navPage.locator("#rock-review");
 assert(await comparison.isVisible());
 assert.equal(await comparison.locator(".model").count(),2);
 await navPage.reload();
 assert(await comparison.isVisible(),"The checked stage should survive a refresh");
 await navPage.getByRole("button",{name:"Back to granite",exact:true}).press("Enter");
 await igneous.getByText("Restart paragraph",{exact:true}).press("Enter");
 await igneous.getByRole("button",{name:"Start again",exact:true}).press("Enter");
 await navPage.getByRole("button",{name:"Back to sandstone",exact:true}).press("Enter");
 assert(await advance.isVisible(),"Restarting granite must preserve the checked sandstone paragraph");
 assert((await navPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"Sentence ordering overflows at phone width");
 await screen(navPage,"writing-sentence-order-mobile");
 await navPage.goto(base+"/ks3/");
 const ks3Menu7=navPage.locator("#year-7");
 const ks3Menu8=navPage.locator("#year-8");
 await ks3Menu7.locator("summary").click();
 assert.equal(await ks3Menu7.getByRole("link").count(),12);
 assert(!(await ks3Menu8.locator("ul").isVisible()),"Year 8 topics should stay collapsed when choosing Year 7");
 const year7Paths=await ks3Menu7.getByRole("link").evaluateAll(links=>links.map(link=>link.href));
 await ks3Menu8.locator("summary").click();
 assert.equal(await ks3Menu8.getByRole("link").count(),11);
 assert(!(await ks3Menu7.locator("ul").isVisible()),"Only one year list should open at a time");
 const year8Paths=await ks3Menu8.getByRole("link").evaluateAll(links=>links.map(link=>link.href));
 for(const path of [...year7Paths,...year8Paths]){
  await navPage.goto(path);
  await navPage.getByRole("heading",{name:"Check your understanding",exact:true}).waitFor();
  const firstCheck=navPage.locator("[data-catchup-check]").first();
  const expectedChecks=new URL(path).searchParams.get("topic")==="fair-tests" ? 4 : /\/ks3\/(lesson|cells)\//.test(path) ? 3 : 2;
  assert.equal(await navPage.locator("[data-catchup-check]").count(),expectedChecks);
  await navPage.locator(".ks3-lesson figure,.ks3-lesson table").first().waitFor({state:"visible"});
  assert(await navPage.locator(".ks3-lesson .ks3-connection").first().isVisible(),"KS3 lesson is missing a recall cue");
  assert(await navPage.locator(".ks3-lesson .ks3-term").first().isVisible(),"KS3 lesson is missing vocabulary help");
  await navPage.locator(".ks3-lesson button:visible:not(.ks3-term)").first().waitFor({state:"visible"});
  const pictures=navPage.locator(".ks3-illustration img");
  for(const picture of await pictures.all()){
   await picture.evaluate(img=>img.decode());
   assert(await picture.evaluate(img=>img.naturalWidth>0&&img.alt.length>20));
  }
  const atHome=navPage.locator(".ks3-home-activity");
  assert.equal(await atHome.count(),1);
  assert.equal(await atHome.evaluate(el=>el.open),false);
  await atHome.getByText("Try at home (optional)",{exact:true}).click();
  assert(await atHome.getByText("Think about it.",{exact:true}).isVisible());
  await atHome.getByText("Check your idea",{exact:true}).click();
  assert(await atHome.locator("details p").isVisible());
  const firstOption=firstCheck.getByRole("button").first();
  await firstOption.focus();
  await navPage.keyboard.press("Enter");
  await firstCheck.getByRole("status").filter({hasText:/\S/}).waitFor();
  assert.equal(await firstOption.getAttribute("aria-pressed"),"true");
  assert((await navPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"KS3 catch-up lesson overflows at phone width");
 }
 await navPage.goto(base+"/ks3/lesson/?topic=fair-tests");
 const independent=navPage.getByRole("button",{name:"independent variable",exact:true});
 await independent.press("Enter");
 assert.equal(await independent.getAttribute("aria-expanded"),"true");
 await navPage.getByRole("status").filter({hasText:"The factor you deliberately change"}).waitFor();
 await independent.press("Escape");
 assert.equal(await independent.getAttribute("aria-expanded"),"false");
 assert.match(await navPage.locator(".ks3-fair-aim").innerText(),/How does ramp angle affect the distance/);
 assert(await navPage.getByRole("table",{name:"Example results from the ramp model"}).isVisible());
 const surfaceTest=navPage.locator("#fair-test-surface");
 const checkControls=surfaceTest.getByRole("button",{name:"Check my controls"});
 const controlsFeedback=surfaceTest.getByRole("status");
 await checkControls.press("Enter");
 await controlsFeedback.filter({hasText:/Choose four factors/}).waitFor();
 await surfaceTest.getByRole("checkbox",{name:"Ramp angle",exact:true}).check();
 await surfaceTest.getByRole("checkbox",{name:"Ramp surface",exact:true}).check();
 await checkControls.press("Enter");
 await controlsFeedback.filter({hasText:"1 of the 4 controls selected. Change the ramp surface."}).waitFor();
 await surfaceTest.getByRole("checkbox",{name:"Ramp surface",exact:true}).uncheck();
 await surfaceTest.getByRole("checkbox",{name:"Paint colour of the same toy",exact:true}).check();
 await checkControls.press("Enter");
 await controlsFeedback.filter({hasText:"Repainting the same toy makes no difference in this model."}).waitFor();
 await surfaceTest.getByRole("checkbox",{name:"Paint colour of the same toy",exact:true}).uncheck();
 for(const name of ["Toy used","Added load","Release point"]){
   await surfaceTest.getByRole("checkbox",{name,exact:true}).press("Space");
 }
 await checkControls.press("Enter");
 await controlsFeedback.filter({hasText:"It is a control variable in this one."}).waitFor();
 const releasePlan=navPage.locator("#release-point-plan");
 await releasePlan.fill("Keep the ramp surface and ramp angle the same.");
 await navPage.getByText("Use a sentence starter",{exact:true}).press("Enter");
 assert(await navPage.getByText("I would change … and measure … .",{exact:false}).isVisible());
 await navPage.getByText("Compare with an example plan",{exact:true}).press("Enter");
 assert(await navPage.getByText(/Other valid controls include/).isVisible());
 assert.equal(await releasePlan.inputValue(),"Keep the ramp surface and ramp angle the same.");
 await navPage.locator("#sugar-investigation-plan").fill("Keep the mass of sugar and volume of water the same.");
 await navPage.setViewportSize({width:320,height:800});
 await checkReadingSpacing(navPage,"KS3 fair-test variables");
 await navPage.setViewportSize({width:390,height:844});
 await navPage.goto(base+"/ks3/lesson/?topic=states-of-matter");
 const stateModel=navPage.locator("ks3-states-model");
 const particleStatus=stateModel.getByRole("status");
 await particleStatus.filter({hasText:/Cool solid/}).waitFor();
 await stateModel.getByRole("button",{name:"Play motion"}).press("Enter");
 await stateModel.getByRole("button",{name:"Pause motion"}).waitFor();
 const heatParticles=stateModel.getByRole("button",{name:"Heat",exact:true});
 const coolParticles=stateModel.getByRole("button",{name:"Cool",exact:true});
 for(const caption of [
  /Warmer solid.*vibrate faster/,
  /Melting.*Temperature stays steady/,
  /Liquid.*hard to compress/,
  /Warmer liquid.*still close together/,
  /Boiling.*Temperature stays steady/,
  /^Gas.*walls/,
  /^Warmer gas.*move faster/
 ]){
  await heatParticles.press("Enter");
  await particleStatus.filter({hasText:caption}).waitFor();
 }
 assert.equal(await heatParticles.getAttribute("aria-disabled"),"true");
 for(const caption of [
  /^Gas/,
  /Condensing.*Temperature stays steady/,
  /^Warmer liquid/,
  /^Liquid.*hard to compress/,
  /Freezing.*Temperature stays steady/,
  /^Warmer solid/,
  /^Cool solid/
 ]){
  await coolParticles.press("Enter");
  await particleStatus.filter({hasText:caption}).waitFor();
 }
 assert.equal(await coolParticles.getAttribute("aria-disabled"),"true");
 await stateModel.getByRole("checkbox",{name:"Follow one particle"}).check();
 await stateModel.getByRole("button",{name:"Pause motion"}).press("Enter");
 await navPage.setViewportSize({width:320,height:800});
 await checkReadingSpacing(navPage,"KS3 states of matter");
 await navPage.setViewportSize({width:390,height:844});
 await navPage.goto(base+"/ks3/lesson/?topic=atoms-and-compounds");
 await navPage.getByRole("button",{name:"Add a different pair to A"}).press("Enter");
 await navPage.getByRole("status").filter({hasText:/A now contains two different substances/}).waitFor();
 await navPage.getByRole("button",{name:"Original samples"}).press("Enter");
 assert(await navPage.getByText("Three samples shown as particles",{exact:true}).isVisible());
 await navPage.goto(base+"/ks3/lesson/?topic=reproduction");
 await navPage.getByText("Follow a pollen grain",{exact:true}).click();
 const pollen=navPage.locator('science-sequence[kind="pollen"]');
 await pollen.getByRole("button",{name:"Next step"}).press("Enter");
 await pollen.getByRole("status").filter({hasText:"The tube starts growing"}).waitFor();
 assert.equal(await pollen.locator("svg g:not([hidden])").count(),1);
 assert((await pollen.locator("svg").boundingBox()).width<=390);
 await navPage.goto(base+"/ks3/cells/");
 const cellDiagrams=await navPage.locator(".ks3-cell-diagrams img").all();
 assert.equal(cellDiagrams.length,2);
 for(const img of cellDiagrams) {
  await img.evaluate(el=>el.decode());
  assert.match(await img.getAttribute("alt"),/mitochondria.*ribosome.*DNA/i);
 }
 await navPage.getByText("Look through a microscope",{exact:true}).click();
 const cellPhotos=await navPage.locator(".micrograph-grid img").all();
 assert.equal(cellPhotos.length,2);
 for(const img of cellPhotos) await img.evaluate(el=>el.decode());
 assert.equal(await cellPhotos[0].getAttribute("src"),"/assets/micrographs/elodea-leaf.webp");
 assert.match(await cellPhotos[0].getAttribute("alt"),/small green oval bodies/);
 assert(await navPage.locator(".micrograph-grid").getByRole("link",{name:"Juan Carlos Fonseca Mata"}).isVisible());
 await navPage.getByText("Check what you spotted",{exact:true}).press("Enter");
 assert(await navPage.getByText("Sample A is plant tissue.",{exact:true}).isVisible());
 assert(await navPage.getByText(/small green bodies inside the cells are chloroplasts/).isVisible());
 const microscopeCheck=navPage.locator('[aria-labelledby="catchup-q3"]');
 await microscopeCheck.getByRole("button",{name:/edges are straight/}).press("Enter");
 await microscopeCheck.getByRole("status").filter({hasText:/Some animal cells/}).waitFor();
 await microscopeCheck.getByRole("button",{name:"There is too little evidence to decide."}).press("Enter");
 await microscopeCheck.getByRole("status").filter({hasText:/Correct/}).waitFor();
 await checkReadingSpacing(navPage,"Year 7 cell diagrams");
 await navPage.goto(base+"/ks3/adaptation/");
 await navPage.getByText("Compare rock pocket mouse populations",{exact:true}).click();
 assert((await navPage.getByRole("link",{name:/Open the HHMI pictures/}).getAttribute("href")).endsWith("MouseColorVar-Illustrations-act.pdf"));
 await navPage.goto(year7Paths[11]);
 const rotateEarth=navPage.getByRole("button",{name:"Turn Earth a quarter turn"});
 await rotateEarth.click();
 await navPage.getByRole("status").filter({hasText:"Daytime. The location faces the Sun."}).waitFor();
 await navPage.goto(year8Paths[9]);
 await navPage.getByRole("button",{name:"Close switch in circuit A"}).click();
 await navPage.getByRole("status").filter({hasText:"The lamp lights."}).waitFor();
 await navPage.getByText("Explore with PhET (optional)",{exact:true}).click();
 assert(await navPage.getByRole("link",{name:/Open Circuit Construction Kit/}).isVisible());
 await navPage.goto(base+"/ks3/lesson/?topic=balanced-moments");
 await navPage.getByRole("button",{name:"3 m",exact:true}).click();
 await navPage.getByRole("status").filter({hasText:"The right end drops."}).waitFor();
 await navPage.goto(year8Paths[10]);
 await navPage.getByRole("link",{name:"Choose another Year 8 topic"}).click();
 await navPage.waitForURL(base+"/science-catch-up/?year=8");
 await navPage.getByRole("heading",{name:"Year 8 Science",exact:true}).waitFor();
 await navPage.addInitScript(()=>{
  window.collisionClicks=0;
  window.AudioContext=class {
   state="suspended";
   sampleRate=8000;
   createBuffer(channels, samples) {return {getChannelData:()=>new Float32Array(samples)};}
   createGain() {return {gain:{},connect(){}};}
   createBufferSource() {return {connect(){},start(){window.collisionClicks++;}};}
   async resume() {this.state="running";}
  };
 });
 await navPage.goto(base+"/ks3/particles/");
 const gasModel=navPage.locator("[data-gas-pressure]");
 assert(await gasModel.getByRole("radio",{name:"Warmer gas"}).isHidden());
 const collisions=gasModel.getByRole("button",{name:"Listen to collisions"});
 assert.equal(await collisions.getAttribute("aria-pressed"),"false");
 await collisions.click();
 assert.equal(await navPage.evaluate(()=>window.collisionClicks),0,"Paused gas should make no sound");
 await gasModel.getByRole("button",{name:"Start motion"}).click();
 await navPage.waitForFunction(()=>window.collisionClicks>1);
 await collisions.click();
 assert.equal(await collisions.getAttribute("aria-pressed"),"false");
 const lastClick=await navPage.evaluate(()=>window.collisionClicks);
 await gasModel.getByRole("button",{name:"Next observation"}).click();
 await gasModel.getByText(/Predict what happens to pressure when you warm/).waitFor();
 await gasModel.getByRole("button",{name:"Warm the gas"}).click();
 await gasModel.getByRole("status").filter({hasText:"The same particles move faster."}).waitFor();
 assert.equal(await navPage.evaluate(()=>window.collisionClicks),lastClick,"Muting should stop wall clicks while animation continues");
 await gasModel.getByRole("button",{name:"Next observation"}).click();
 await gasModel.getByRole("status").filter({hasText:"Starting pressure."}).waitFor();
 await gasModel.getByRole("button",{name:"Make the box smaller"}).click();
 await gasModel.getByRole("status").filter({hasText:"The same particles move at the same speeds"}).waitFor();
 await gasModel.getByRole("button",{name:"Pause motion"}).click();
 await gasModel.getByRole("button",{name:"Explore freely"}).click();
 await gasModel.getByRole("radio",{name:"Warmer gas"}).check();
 await gasModel.getByRole("status").filter({hasText:"The same particles move faster."}).waitFor();
 await gasModel.getByRole("radio",{name:"Starting box"}).check();
 await gasModel.getByText("Compare collision counts",{exact:true}).press("Enter");
 await gasModel.getByRole("button",{name:"Start motion"}).click();
 const startingCount=gasModel.locator('[data-gas-total="start"]');
 await startingCount.filter({hasText:/[0-9]+/}).waitFor({timeout:12000});
 assert(Number(await startingCount.textContent())>0);
 await gasModel.getByRole("radio",{name:"Warmer gas"}).check();
 const warmCount=gasModel.locator('[data-gas-total="warm"]');
 assert.equal(await warmCount.textContent(),"—","A new setting must receive a full timed sample");
 await warmCount.filter({hasText:/[0-9]+/}).waitFor({timeout:12000});
 assert(Number(await warmCount.textContent())>0);
 assert(Number(await startingCount.textContent())>0,"Previous settings should remain available for comparison");
 assert.equal(await navPage.evaluate(()=>window.collisionClicks),lastClick,"Visual counts should work with audio muted");
 const particleSelect=gasModel.getByLabel("Number of gas particles");
 await particleSelect.selectOption("28");
 assert.equal(await gasModel.locator("[data-gas-particles]").textContent(),"28");
 assert.equal(await warmCount.textContent(),"—","Changing the particle number must clear earlier samples");
 await gasModel.getByRole("radio",{name:"Starting box"}).check();
 assert.equal(await gasModel.locator("[data-gas-pressure-value]").textContent(),"2.0×");
 await gasModel.getByRole("radio",{name:"Smaller box"}).check();
 assert.equal(await gasModel.locator("[data-gas-volume]").textContent(),"50%");
 assert.equal(await gasModel.locator("[data-gas-pressure-value]").textContent(),"4.0×");
 await gasModel.getByRole("button",{name:"Pause motion"}).click();
 await collisions.click();
 const beforeComparison=await navPage.evaluate(()=>window.collisionClicks);
 const compareBoxSizes=gasModel.getByRole("button",{name:"Compare box sizes"});
 await compareBoxSizes.press("Enter");
 await gasModel.locator("[data-gas-compare-status]").filter({hasText:/Counting hits on the right wall/}).waitFor();
 assert(await particleSelect.isDisabled(),"Particle count stays fixed during the volume comparison");
 await compareBoxSizes.waitFor({timeout:20000});
 const startHits=Number(await gasModel.locator('[data-gas-compare-count="start"]').textContent());
 const smallHits=Number(await gasModel.locator('[data-gas-compare-count="small"]').textContent());
 assert(startHits>0 && smallHits>startHits,"The smaller box must produce more hits on the right wall");
 assert.equal((await navPage.evaluate(()=>window.collisionClicks))-beforeComparison,startHits+smallHits,"The comparison should play one click per counted hit");
 assert.equal(await particleSelect.inputValue(),"28","The comparison should preserve the selected particle number");
 await collisions.click();
 await gasModel.getByRole("button",{name:"Follow the observations"}).click();
 await gasModel.getByRole("button",{name:"Start motion"}).waitFor();
 assert.equal(await gasModel.locator("[data-gas-particles]").textContent(),"14");
 await navPage.setViewportSize({width:320,height:800});
 await checkReadingSpacing(navPage,"Gas pressure guide");
 await navPage.setViewportSize({width:390,height:844});
 await screen(navPage,"ks3-gas-pressure-mobile");
 await navPage.goto(base+"/science-practice/#gcse-writing");
 await navPage.waitForURL(base+"/teaching/focused-writing/gcse/");
 await navPage.goto(base+"/science-practice/#ks3-cells");
 await navPage.waitForURL(base+"/ks3/cells/");
 await navPage.getByRole("heading",{name:"Cells and microscopes",exact:true}).waitFor();
 await navPage.getByRole("button",{name:"Cell membrane",exact:true}).click();
 await navPage.getByRole("status").filter({hasText:"firm layer outside it is the cell wall"}).waitFor();
 await navPage.getByRole("button",{name:"Cell wall",exact:true}).click();
 await navPage.getByRole("status").filter({hasText:"Correct. The cell wall gives the cell support"}).waitFor();
 await navPage.getByText("Compare your explanation",{exact:true}).click();
 assert(await navPage.getByText(/The cell wall supports the plant cell/).isVisible());

 await navPage.goto(base+"/teaching/simulations/enzyme-kinetics/");
 assert(await navPage.locator("#btn-std").isHidden());
 assert(await navPage.locator("#s-temp").isHidden());
 await navPage.getByRole("button",{name:/Investigate/}).click();
 const standardConditions=navPage.locator("#btn-std");
 assert((await standardConditions.boundingBox()).height<65,"Standard conditions button is oversized");
 await navPage.goto(base+"/teaching/simulations/enzyme-kinetics/?activity=gcse");
 await navPage.getByRole("heading",{name:"Compare temperatures",exact:true}).waitFor();
 const instructionButton=navPage.getByRole("button",{name:"Instructions",exact:true});
 await instructionButton.press("Enter");
 const enzymeInstructions=navPage.getByRole("dialog",{name:"Compare temperatures"});
 await enzymeInstructions.getByText(/Predict which temperature/).waitFor();
 await navPage.keyboard.press("Escape");
 assert(!(await enzymeInstructions.isVisible()));
 assert(await instructionButton.evaluate(button=>button===document.activeElement));
 const runControls=navPage.getByRole("group",{name:"Simulation controls"});
 for(const [id,pH,enzyme] of [["starch","7","amylase"],["protein","2","protease"],["lipid","8","lipase"]]){
  const substrate=navPage.locator('.stab[data-sub="'+id+'"]');
  await substrate.click();
  await navPage.locator("#s-temp").press("Home");
  await runControls.getByRole("button",{name:"Start",exact:true}).press("Enter");
  await standardConditions.click();
  assert.equal(await substrate.getAttribute("aria-pressed"),"true");
  assert.equal(await navPage.locator("#s-temp").inputValue(),"37");
  assert.equal(await navPage.locator("#s-ph").inputValue(),pH);
  assert.equal(await navPage.locator("#s-sub").inputValue(),"20");
  assert.equal(await navPage.locator('.mixrow[data-k="'+enzyme+'"] .ct').textContent(),"4");
  assert.equal(await navPage.locator(".mixrow .ct").allTextContents().then(values=>values.map(Number).reduce((sum,number)=>sum+number,0)),4);
  await runControls.getByRole("button",{name:"Start",exact:true}).press("Enter");
  await runControls.getByRole("button",{name:"Pause",exact:true}).press("Enter");
  await runControls.getByRole("button",{name:"Reset",exact:true}).press("Enter");
  assert.equal(await substrate.getAttribute("aria-pressed"),"true");
 }
 for(const width of [320,768,1366]){
  await navPage.setViewportSize({width,height:720});
  await navPage.locator("#graph-readout").scrollIntoViewIfNeeded();
  const box=await runControls.boundingBox();
  assert(box.y>=0&&box.y+box.height<=720,"Run controls scrolled off screen at "+width);
  assert((await runControls.getByRole("button",{name:"Start",exact:true}).boundingBox()).height>=44);
 }
 await navPage.setViewportSize({width:390,height:844});
 await navPage.locator('.stab[data-sub="starch"]').click();
 await standardConditions.click();
 await navPage.locator("#btn-run").click();
 await navPage.locator("#graph-readout summary").click();
 await navPage.waitForFunction(()=>document.querySelector("#rate-rows td")?.textContent==="1");
 // Force only the final step of accumulated stress, then observe the real model feedback.
 await navPage.evaluate(()=>{
  S.running=false;
  S.ph=2;
  S.temp=37;
  resetRun();
  const affected=S.enzymes.find(e=>e.type===SUBS.starch.enzyme);
  affected.stress=.999;
  step();
 });
 await navPage.waitForFunction(()=>document.querySelector("#coach-text").textContent.includes("Some enzymes have denatured by extreme pH"));
 await navPage.evaluate(()=>{S.ph=7;});
 assert(!(await navPage.locator("#coach-text").innerText()).includes("cooling"));
 for(const [temperature,pH,expected] of [[65,7,"by heat"],[65,2,"by heat and extreme pH"]]){
  await navPage.evaluate(([t,p])=>{
   S.temp=t;S.ph=p;
   resetRun();
   S.enzymes.forEach(e=>{e.stress=.999;});
   step();
  },[temperature,pH]);
  await navPage.waitForFunction(suffix=>document.querySelector("#coach-text").textContent.includes("All enzymes have denatured "+suffix+"."),expected);
 }
 await navPage.getByRole("link",{name:"Return to the follow-up question"}).click();
 await navPage.waitForURL(base+"/teaching/enzyme-investigations/gcse/#follow-up");
 assert(await navPage.locator("#follow-up").isVisible());
 await navPage.getByRole("heading",{name:"GCSE · Compare two temperatures"}).waitFor();
 await navPage.goto(base+"/teaching/enzyme-investigations/ks3/");
 await navPage.getByRole("heading",{name:/Can the same enzyme break down starch and protein/}).waitFor();
 const compareButton=navPage.getByRole("button",{name:"Test the pair",exact:true});
 for(const [enzyme,substrate,reacts] of [["amylase","starch",true],["amylase","protein",false],["protease","starch",false],["protease","protein",true]]){
  await navPage.getByLabel("Enzyme",{exact:true}).selectOption(enzyme);
  await navPage.getByLabel("Substrate",{exact:true}).selectOption(substrate);
  await compareButton.press("Enter");
  assert((await navPage.locator("[data-enzyme-result]").textContent()).includes(reacts?"fits the active site":"No product is made"));
 }
 const explanation=navPage.locator("[data-enzyme-explain]");
 const modelExplanation=explanation.locator("[data-explanation-model]");
 for(const failure of ["","i","15","asdfasdf qwer","qwertyuiop","aaaaaa aaaaaa","fits fits fits"]){
  await explanation.locator("textarea").fill(failure);
  await explanation.getByRole("button",{name:"Check your explanation",exact:true}).press("Enter");
  assert(await modelExplanation.isHidden());
 }
 for(const attempt of ["I thnk amylase works on protien as well.","Starch matches the shape of the pocket.","fits","Protien fits"]){
  await navPage.reload();
  await explanation.locator("textarea").fill(attempt);
  await explanation.getByRole("button",{name:"Check your explanation",exact:true}).press("Enter");
  assert(await modelExplanation.isVisible(),"A plausible attempt should unlock model feedback: "+attempt);
 }
 await navPage.reload();
 await explanation.getByText("Help me write my explanation",{exact:true}).click();
 await explanation.getByRole("button",{name:"I explained it aloud"}).press("Enter");
 assert(await modelExplanation.isVisible());
 for(const width of [320,768,1366]){
  await navPage.setViewportSize({width,height:800});
  assert((await navPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"Guided enzyme investigation overflows at "+width);
 }
 await navPage.setViewportSize({width:390,height:844});
 await navPage.goto(base+"/diagram-practice/#filtration");
 await navPage.waitForURL(/\/ks3\/lesson\/\?topic=separating-techniques/);
 const desktopSequence=desktop.locator("[data-separation-order]");
 await desktop.goto(base+"/ks3/lesson/?topic=separating-techniques");
 await desktopSequence.locator(".writing-order-board").evaluate(el=>el.scrollIntoView({block:"center",behavior:"instant"}));
 const firstGrip=bankCard(desktopSequence,"Pour the mixture").locator(".writing-order-grip");
 const firstSlot=slot(desktopSequence,0);
 const gripBox=await firstGrip.boundingBox(), slotBox=await firstSlot.boundingBox();
 await desktop.mouse.move(gripBox.x+gripBox.width/2,gripBox.y+gripBox.height/2);
 await desktop.mouse.down();
 await desktop.mouse.move(slotBox.x+slotBox.width/2,slotBox.y+slotBox.height/2,{steps:10});
 await desktop.mouse.up();
 assert.match(await firstSlot.innerText(),/Pour the mixture/);
 for(const [i,start] of ["Collect the salt","Gently heat","Let the concentrated"].entries()){
  await placeCard(desktopSequence,start,i+1);
 }
 await checkOrder(desktopSequence).click();
 await desktopSequence.locator(".writing-order-feedback").filter({hasText:"Correct."}).waitFor();
 const visualLab=navPage.locator('diagram-practice[topic="filtration"]');
 const labels=visualLab.locator(".dp-question").first();
 await labels.locator("summary").click();
 await labels.getByRole("button",{name:"Filter paper",exact:true}).press("Enter");
 await labels.getByRole("button",{name:/^A\./}).press("Enter");
 assert.match(await labels.locator(".dp-placements").innerText(),/A · Filter paper/);
 await labels.getByRole("button",{name:"Residue",exact:true}).click();
 await labels.getByRole("button",{name:/^B\./}).click();
 await labels.getByRole("button",{name:"Filtrate",exact:true}).click();
 await labels.getByRole("button",{name:/^C\./}).click();
 await labels.getByRole("button",{name:"Check answer",exact:true}).click();
 await labels.getByRole("status").filter({hasText:"All labels correct"}).waitFor();
 const point=visualLab.locator(".dp-question").nth(1);
 await point.locator("summary").click();
 await point.getByRole("button",{name:/^C\./}).click();
 await point.getByRole("button",{name:"Check answer",exact:true}).click();
 await point.getByRole("status").filter({hasText:"Correct."}).waitFor();
 assert((await navPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"Diagram practice overflows on mobile");
 await screen(navPage,"diagram-practice-mobile");

 await desktop.goto(base+"/diagram-practice/#iv-circuit");
 await desktop.waitForURL(/\/gcse\/\?activity=iv-circuit#topic-p2/);
 const circuit=desktop.locator('diagram-practice[topic="iv-circuit"] .dp-question').first();
 await circuit.locator("summary").click();
 const chip=circuit.getByRole("button",{name:"Ammeter",exact:true});
 const target=circuit.getByRole("button",{name:/^A\./});
 await chip.scrollIntoViewIfNeeded();
 const ch=await chip.boundingBox(), to=await target.boundingBox();
 await desktop.mouse.move(ch.x+ch.width/2,ch.y+ch.height/2);
 await desktop.mouse.down();
 await desktop.mouse.move(to.x+to.width/2,to.y+to.height/2,{steps:8});
 await desktop.mouse.up();
 assert.match(await circuit.locator(".dp-placements").innerText(),/A · Ammeter/);

 const touch=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 await touch.goto(base+"/diagram-practice/#electrolysis");
 await touch.waitForURL(/\/gcse\/\?activity=electrolysis#topic-c4/);
 const touchLabels=touch.locator('diagram-practice[topic="electrolysis"] .dp-question').first();
 await touchLabels.locator("summary").tap();
 const tch=touchLabels.getByRole("button",{name:"Cathode",exact:true});
 const dst=touchLabels.getByRole("button",{name:/^A\./});
 await tch.scrollIntoViewIfNeeded();
 const t1=await tch.boundingBox(),t2=await dst.boundingBox();
 const device=await touch.context().newCDPSession(touch);
 const center=rect=>({x:rect.x+rect.width/2,y:rect.y+rect.height/2});
 await device.send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[center(t1)]});
 await device.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[center(t2)]});
 await device.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
 assert.match(await touchLabels.locator(".dp-placements").innerText(),/A · Cathode/);
 await desktop.goto(base+"/teaching/focused-writing/order/");
 const desktopOrder=desktop.locator('[data-writing-order="sandstone"]');
 const firstSandSentence=desktopOrder.locator(".paragraph-bank .paragraph-drag-card").filter({hasText:"This sandstone formed"});
 await firstSandSentence.dragTo(slot(desktopOrder,0));
 assert.match(await slot(desktopOrder,0).innerText(),/This sandstone formed/);
 await touch.close();

 await navPage.goto(base+"/diagram-practice/#breathing");
 await navPage.waitForURL(/#catchup\/f170\/2\.2\.2/);
 const breath=navPage.locator('diagram-practice[topic="breathing"]');
 await breath.getByRole("button",{name:"Breathing out",exact:true}).click();
 await breath.getByRole("status").filter({hasText:"the muscles relax"}).waitFor();
 await breath.getByRole("button",{name:"Breathing in",exact:true}).click();
 assert.equal(await breath.getByRole("button",{name:"Breathing in",exact:true}).getAttribute("aria-pressed"),"true");

 await navPage.goto(base+"/gcse/#topic-b6");
 await navPage.getByText("Inheritance grids · Diagram and questions",{exact:true}).click();
 const grid=navPage.locator('diagram-practice[topic="inheritance"]');
 await grid.getByText("Match each description to its homozygous outcome.",{exact:true}).click();
 const gridQuestion=grid.locator(".dp-question[open]");
 await gridQuestion.getByRole("button",{name:"Homozygous dominant",exact:true}).press("Enter");
 await gridQuestion.getByRole("button",{name:/^A\./}).press("Enter");
 await gridQuestion.getByRole("button",{name:"Homozygous recessive",exact:true}).press("Enter");
 await gridQuestion.getByRole("button",{name:/^D\./}).press("Enter");
 await gridQuestion.getByRole("button",{name:"Check answer",exact:true}).click();
 await gridQuestion.getByRole("status").filter({hasText:"All labels correct"}).waitFor();
 await navPage.goto(base+"/teaching/focused-writing/gcse/compare-insulation/");
 const cooling=navPage.locator('[data-writing-exercise="insulation"]');
 await cooling.getByRole("textbox").fill("The bare can cooled by 7 °C while the felt-wrapped can cooled by 13 °C.");
 await cooling.getByRole("button",{name:"Check my sentence"}).click();
 await cooling.getByRole("status").filter({hasText:"0 of 2 data results matched."}).waitFor();
 await cooling.getByRole("textbox").fill("The bare can cooled by 13 °C while the felt-wrapped can cooled by 7 °C.");
 await cooling.getByRole("button",{name:"Check my sentence"}).click();
 await cooling.getByRole("status").filter({hasText:"2 of 2 data results matched."}).waitFor();
 await navPage.close();
 await mobile.close();
 await desktop.close();
 assert.deepEqual(errors,[],"Uncaught page errors: "+errors.join("; "));
 console.log("Browser smoke checks passed: dropdown dismissal and keyboard focus, AQA label, simulation card links, accessible diagrams, curated simulation cross-links, A-level/Human Biology catch-up, 577 questions and mobile layout.");
}finally{
 await browser.close();await new Promise(done=>server.close(done));
}

/* Headless real-browser smoke checks for Narajos revision tools.
 * Distinct from unit tests: these exercise rendered DOM, navigation and mobile layout.
 * Run after: npm install --no-save playwright@1.56.1 && npx playwright install chromium
 */
import assert from "node:assert/strict";
import {createServer} from "node:http";
import {readFile,stat} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {chromium} from "playwright";

const root=resolve("public");
const types={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".json":"application/json",".png":"image/png",".jpg":"image/jpeg",".webp":"image/webp",".woff2":"font/woff2"};
const server=createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,"http://localhost");
  let path=resolve(root,"."+decodeURIComponent(url.pathname));
  if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  const meta=await stat(path).catch(()=>null);
  if(meta?.isDirectory()||url.pathname.endsWith("/"))path=resolve(path,"index.html");
  const content=await readFile(path);
  res.writeHead(200,{"Content-Type":types[extname(path)]||"application/octet-stream","Cache-Control":"no-store"});
  res.end(content);
 }catch(_){res.writeHead(404);res.end("Not found");}
});
await new Promise(done=>server.listen(0,"127.0.0.1",done));
const port=server.address().port,base="http://127.0.0.1:"+port;
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const errors=[];
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
 const desktop=await browser.newPage({viewport:{width:1280,height:900}});
 await desktop.goto(base+"/",{waitUntil:"load"});
 assert(await desktop.title(),"Homepage title missing");
 assert.equal(await desktop.title(),"Science Resources | Narajos");
 assert(await desktop.getByRole("heading",{name:"Science Resources",exact:true}).isVisible());
 assert(await desktop.getByRole("heading",{name:"Biology Simulations",exact:true}).isVisible());
 assert(await desktop.getByRole("heading",{name:"Learning Companions"}).isVisible(),"Learning Companions missing from homepage");
 assert((await desktop.locator(".home-philosophy").innerText()).includes("complement classroom teaching"),"Public purpose statement missing");
 const homeMenu=desktop.locator(".site-nav details").first();
 await homeMenu.locator("summary").click();
 assert(await homeMenu.locator('a[href="/human-biology/"]').isVisible(),"Human Biology missing from homepage dropdown");
 await homeMenu.locator("summary").click();
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
 assert(await desktop.getByRole("heading",{name:"Other ways to revise F170",exact:true}).isVisible());
 assert(await desktop.getByRole("heading",{name:"Other ways to revise F171",exact:true}).isVisible());
 assert(await desktop.locator('.k-home-actions a[href="#skills/f171"]').isVisible());
 assert.equal(await desktop.locator("main").evaluate(el=>getComputedStyle(el).outlineStyle),"none","Main-content focus outline should not frame the whole app");
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
 await desktop.getByRole("link",{name:"Skills practice",exact:true}).first().click();
 await desktop.getByRole("heading",{name:"Skills practice",exact:true}).waitFor();
 assert.equal(await desktop.locator(".k-skill-card").count(),14);
 await screen(desktop,"human-skills-desktop");
 await desktop.locator('a[href="#skills/f170/magnification"]').click();
 await desktop.getByRole("heading",{name:"Worked example",exact:true}).waitFor();
 await desktop.getByRole("button",{name:"Now try one"}).click();
 await desktop.locator(".k-question-view").waitFor();
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
 await desktop.locator('a[href="#catchup/f171/3.2.2/1"]').first().click();
 await desktop.getByRole("heading",{name:"Key idea 2"}).waitFor({state:"visible",timeout:10000});
 assert((await desktop.locator("main").innerText()).includes("Key idea 2"),"Catch-up step did not advance");
 await screen(desktop,"human-vaccines");
 await desktop.goto(base+"/human-biology/#catchup/f170/3.2.1",{waitUntil:"load"});
 await desktop.locator(".kc-visual-art svg").waitFor({state:"visible"});
 assert((await desktop.locator(".kc-visual-art svg").getAttribute("aria-label")).includes("Reflex arc"),"Human Biology reflex diagram missing");
 await desktop.goto(base+"/human-biology/#catchup/f170/2.1.2",{waitUntil:"load"});
 await desktop.locator(".kc-simulation-link").waitFor({state:"visible"});
 assert((await desktop.locator(".kc-simulation-link").getAttribute("href"))==="/teaching/simulations/cardiac-cycle/","Heart concept should link to cardiac-cycle simulation");
 await screen(desktop,"human-cardiac-visual");
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
 await desktop.locator('[data-krp="fsh"]').click();
 await desktop.locator('[data-krp="lh"]').waitFor({state:"visible",timeout:8000});
 assert((await desktop.locator(".krp-status").innerText()).includes("LH surge"),"Mature follicle should introduce LH surge");
 await desktop.locator('[data-krp="lh"]').click();
 const spermEntry=desktop.getByRole("button",{name:"Sperm entry on the diagram"});
 await spermEntry.focus();
 await desktop.keyboard.press("Enter");
 assert.equal(await spermEntry.getAttribute("aria-disabled"),"true");
 await desktop.locator('[data-krp="fert"]').waitFor({state:"visible",timeout:8000});
 await desktop.getByRole("status").filter({hasText:"are in the same oviduct"}).waitFor();
 await desktop.locator('[data-krp="fert"]').click();
 await desktop.waitForFunction(()=>document.querySelector(".krp-status")?.textContent.includes("Early embryo"));
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
 await desktop.getByRole("heading",{name:"F171 Health and disease",exact:true,level:1}).waitFor();


 await desktop.goto(base+"/human-biology/#challenge/f171/a3",{waitUntil:"load"});
 await desktop.locator(".k-question-view").waitFor({state:"visible"});
 const count=await desktop.evaluate(()=>window.KeystoneHumanChallenge?.questionCount);
 assert.equal(count,534,"Live engine did not load all questions");
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
 await screen(mobile,"home-mobile");
 for(const name of ["teaching","teaching/simulations","privacy","alevel","human-biology"]){
  await checkPage(mobile,name);
  if(name==="teaching"||name==="alevel"||name==="human-biology")await screen(mobile,name.replaceAll("/","-")+"-mobile");
 }
 await mobile.goto(base+"/human-biology/#catchup/f175/a1/2",{waitUntil:"load"});
 await mobile.locator("#krp-model").waitFor({state:"visible"});
 assert((await mobile.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth))<=3,"F175 diagram must scroll inside its container, not overflow the page");
 assert((await mobile.locator(".krp-view").evaluate(el=>el.scrollWidth>el.clientWidth)),"F175 labelled diagram needs a scrollable phone viewport");
 await screen(mobile,"human-f175-mobile");
 await mobile.goto(base+"/human-biology/#skills");
 await mobile.getByRole("heading",{name:"Skills practice",exact:true}).waitFor();
 assert((await mobile.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth))<=3,"Skills menu overflows on phone");
 assert(await mobile.locator('.nav a[href="#skills"]').getAttribute("aria-current"),"Skills navigation state missing");
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
 for(const path of ["/","/404.html","/privacy/","/teaching/","/teacher/","/gcse/","/alevel/","/human-biology/","/science-practice/","/teaching/simulations/",...['bioenergetics','cardiac-cycle','enzyme-inhibition','enzyme-kinetics','molecular-biology'].map(x=>"/teaching/simulations/"+x+"/")]){
  await navPage.goto(base+path,{waitUntil:"load"});
  const control=navPage.locator("#site-home");assert(await control.isVisible(),"Missing homepage control: "+path);
  assert.equal(await control.getAttribute("href"),"/");assert.equal(await control.innerText(),"Narajos");
  const style=await control.evaluate(el=>{const s=getComputedStyle(el);return [s.fontSize,s.fontWeight,s.color,s.backgroundColor,s.borderRadius,s.minHeight];});
  if(!standard)standard=style;else assert.deepEqual(style,standard,"Homepage control style differs: "+path);
 }
 await navPage.goto(base+"/teaching/simulations/cardiac-cycle/");
 await navPage.locator("body:not(.booting)").waitFor();
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
   await navPage.locator('[data-k-action="self-good"]').click();
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
 await navPage.getByRole("link",{name:/Clinical case questions/}).click();
 await navPage.getByRole("link",{name:/Follow-up after screening/}).click();
 await navPage.locator("#k-written").fill("Only 45 of the 60 people with a positive screen attended follow-up.");
 await navPage.locator('[data-k-action="reveal"]').click();
 await navPage.getByText("Key points to look for").waitFor();
 await navPage.locator('[data-k-action="self-good"]').click();
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
 await navPage.getByRole("link",{name:/KS3 · Explain a change/}).click();
 await navPage.getByRole("heading",{name:"KS3 · Explain a change",exact:true}).waitFor();
 const outline=navPage.getByLabel("Supporting notes:",{exact:true});
 await navPage.getByText("Plan your paragraph",{exact:true}).click();
 await outline.fill("warmer → faster random movement → quicker spread");
 await navPage.reload();
 if(!await outline.isVisible())await navPage.getByText("Plan your paragraph",{exact:true}).click();
 assert.equal(await outline.inputValue(),"warmer → faster random movement → quicker spread");
 await navPage.getByText("See a worked example",{exact:true}).click();
 assert(await navPage.locator(".writing-card .model").isVisible());
 for(const [level,visual] of [["ks3","dye-spread"],["gcse","osmosis-results"],["alevel","glucose-cotransport"]]){
  await navPage.goto(base+"/teaching/focused-writing/"+level+"/");
  assert.equal(await navPage.locator("main .writing-card").count(),1,"Share links should show one writing activity");
  const image=navPage.locator('img[src$="/'+visual+'.png"]');
  assert(await image.evaluate(img=>img.complete&&img.naturalWidth>0&&img.alt.length>20),"Writing prompt image or alternative text missing");
  assert((await navPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"Writing activity overflows at phone width");
  await screen(navPage,"focused-writing-"+level+"-mobile");
 }
 await navPage.goto(base+"/teaching/focused-writing/gcse/");
 await navPage.getByText("Plan your paragraph",{exact:true}).click();
 const outlineCheck=navPage.getByRole("button",{name:"Check my outline",exact:true});
 const outlineReview=navPage.locator(".writing-outline-review");
 await outlineCheck.click();
 await outlineReview.getByRole("status").filter({hasText:"Still to add: topic sentence, supporting notes, concluding sentence."}).waitFor();
 const opening=navPage.getByLabel("Topic sentence:",{exact:true});
 const supports=navPage.getByLabel("Supporting notes:",{exact:true});
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
 await draft.fill("The potato lost 7% in dilute solution. In concentrated solution it gained 9%. There was no osmosis.");
 await checkDraft.click();
 const report=navPage.locator("[data-writing-report]");
 await report.getByText(/Found in your draft: “7%”, “9%”/).waitFor();
 assert((await report.innerText()).includes("gained 7% in dilute solution and lost 9% in concentrated solution"));
 assert((await report.innerText()).includes("The checker looks for words or values in your draft."));
 await draft.fill("My observations.\n\n- 7% increase");
 assert(await report.isHidden(),"Editing a checked draft should clear stale feedback");
 await checkDraft.click();
 await navPage.getByRole("status").filter({hasText:"There are separate blocks or list points."}).waitFor();
 await navPage.getByText("Compare with the key ideas",{exact:true}).click();
 assert.equal(await navPage.locator(".writing-key li").count(),4);
 await navPage.getByRole("link",{name:"More GCSE writing tasks",exact:true}).click();
 const writingTasks=navPage.locator("#gcse-tasks a");
 assert.equal(await writingTasks.count(),6);
 const taskPaths=await writingTasks.evaluateAll(links=>links.map(link=>link.href));
 for(const path of taskPaths){
  await navPage.goto(path);
  assert.equal(await navPage.locator("main .writing-card").count(),1);
  assert(await navPage.locator(".writing-data, .trolley-setup").isVisible());
  await navPage.getByText("Write your paragraph",{exact:true}).click();
  assert.equal(await navPage.getByLabel("Your paragraph:",{exact:true}).inputValue(),"");
  assert((await navPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"GCSE writing task overflows at phone width");
 }
 await navPage.goto(base+"/teaching/focused-writing/order/");
 const oneParagraph=navPage.locator('[data-writing-order="ramp"]');
 await oneParagraph.getByRole("button",{name:"Check the order",exact:true}).click();
 await oneParagraph.getByRole("status").filter({hasText:"Choose 4 more sentences"}).waitFor();
 for(const start of ["Changing the car","To test ramp","If both","Keeping the car"]){
  await oneParagraph.locator(".writing-order-options").getByRole("button",{name:new RegExp("^"+start)}).click();
 }
 await oneParagraph.getByRole("button",{name:"Check the order",exact:true}).click();
 await oneParagraph.getByRole("status").filter({hasText:"sentence 1"}).waitFor();
 await oneParagraph.locator(".writing-order-group").getByRole("button",{name:/^Changing the car/}).click();
 assert.equal(await oneParagraph.locator(".writing-order-options button").count(),4);
 for(const start of ["To test ramp","Changing the car","If both","Keeping the car"]){
  await oneParagraph.locator(".writing-order-options").getByRole("button",{name:new RegExp("^"+start)}).click();
 }
 await oneParagraph.getByRole("button",{name:"Check the order",exact:true}).click();
 await oneParagraph.getByRole("status").filter({hasText:"Correct."}).waitFor();
 await oneParagraph.getByText("Read the completed paragraph",{exact:true}).click();
 assert(await oneParagraph.locator(".model").isVisible());
 await navPage.getByText("Build two paragraphs",{exact:true}).click();
 const twoParagraphs=navPage.locator('[data-writing-order="rocks"]');
 assert.equal(await twoParagraphs.locator(".writing-order-options button").count(),10);
 for(const start of ["The layers","First, loose","As more","Minerals then","Together","The interlocking","First, the molten","As it cooled","The crystals grew","That is how"]){
  await twoParagraphs.locator(".writing-order-options").getByRole("button",{name:new RegExp("^"+start)}).click();
 }
 await twoParagraphs.getByRole("button",{name:"Check the order",exact:true}).click();
 await twoParagraphs.getByRole("status").filter({hasText:"Correct."}).waitFor();
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
  assert.equal(await navPage.locator("[data-catchup-check]").count(),2);
  assert(await navPage.locator(".ks3-lesson figure,.ks3-lesson table").first().isVisible(),"KS3 lesson is missing a visual prompt");
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
 await navPage.waitForURL(base+"/ks3/#year-8");
 await ks3Menu8.locator("ul").waitFor();
 await navPage.goto(base+"/ks3/particles/");
 const gasModel=navPage.locator("[data-gas-pressure]");
 await gasModel.getByRole("button",{name:"Start motion"}).click();
 await gasModel.getByRole("radio",{name:"Warmer gas"}).check();
 await gasModel.getByRole("status").filter({hasText:"The same particles move faster."}).waitFor();
 await gasModel.getByRole("radio",{name:"Smaller box"}).check();
 await gasModel.getByRole("status").filter({hasText:"The same particles move at the same speeds"}).waitFor();
 await gasModel.getByRole("button",{name:"Pause motion"}).click();
 await gasModel.getByRole("button",{name:"Start motion"}).waitFor();
 assert((await navPage.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3,"Gas pressure model overflows at phone width");
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
 await navPage.waitForURL(base+"/teaching/enzyme-investigations/gcse/");
 await navPage.getByRole("heading",{name:"GCSE · Compare two temperatures"}).waitFor();
 await navPage.close();
 await mobile.close();
 await desktop.close();
 assert.deepEqual(errors,[],"Uncaught page errors: "+errors.join("; "));
 console.log("Browser smoke checks passed: dropdown dismissal and keyboard focus, AQA label, simulation card links, accessible diagrams, curated simulation cross-links, A-level/Human Biology catch-up, 534 questions and mobile layout.");
}finally{
 await browser.close();await new Promise(done=>server.close(done));
}


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
 assert(await desktop.getByRole("heading",{name:"Learning companions"}).isVisible(),"Learning companions missing from homepage");
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

 await desktop.goto(base+"/human-biology/#challenge/f171/a3",{waitUntil:"load"});
 await desktop.locator(".k-question-view").waitFor({state:"visible"});
 const count=await desktop.evaluate(()=>window.KeystoneHumanChallenge?.questionCount);
 assert.equal(count,194,"Live engine did not load all questions");
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
 await mobile.close();
 await desktop.close();
 assert.deepEqual(errors,[],"Uncaught page errors: "+errors.join("; "));
 console.log("Browser smoke checks passed: dropdown dismissal and keyboard focus, AQA label, simulation card links, accessible diagrams, curated simulation cross-links, A-level/Human Biology catch-up, 194 questions and mobile layout.");
}finally{
 await browser.close();await new Promise(done=>server.close(done));
}

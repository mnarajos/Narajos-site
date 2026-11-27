import assert from "node:assert/strict";

// Exercise the shared menu with keyboard, pointer and touch at constrained viewports.
export async function checkAboutNavigation(browser, base) {
 const simRoutes=["/teaching/simulations/","/teaching/simulations/#gcse-and-alevel","/teaching/simulations/#alevel","/alevel/glucose-calibration/","/teaching/enzyme-investigations/"];
 for(const [width,height,touch] of [[320,568,true],[390,844,true],[640,360,true],[1024,600,false],[1280,800,false]]) {
  const page=await browser.newPage({viewport:{width,height},hasTouch:touch,isMobile:touch});
  await page.goto(base+"/");
  const nav=page.getByRole("navigation",{name:"Main navigation"});
  const menus=nav.locator("details");
  assert.deepEqual(await nav.locator("summary").allTextContents(),["Learning Tools","Teaching Tools"]);
  assert(await nav.getByText("Learning Tools",{exact:true}).isVisible());
  assert(await nav.getByText("Teaching Tools",{exact:true}).isVisible());
  assert.equal(await menus.count(),2,"Only the learning and teacher menus should be top-level");
  const learning=menus.first(), summary=learning.locator("summary"), dropdown=learning.locator(".site-dropdown");
  if(touch) await summary.tap(); else await summary.click();
  await page.waitForFunction(()=>document.querySelector(".site-nav details[open] .site-dropdown")?.style.getPropertyValue("--dropdown-available"));
  const groups=learning.getByRole("group");
  assert.deepEqual(await groups.evaluateAll(nodes=>nodes.map(n=>n.getAttribute("aria-labelledby"))),["nav-years","nav-qualifications","nav-simulations"]);
  const simulations=learning.getByRole("group",{name:"Biology simulations"});
  assert.deepEqual(await simulations.getByRole("link").evaluateAll(links=>links.map(a=>a.getAttribute("href"))),simRoutes);
  assert.deepEqual(await simulations.getByRole("link").allTextContents(),["All simulations","GCSE & A-level","A-level Biology","Glucose calibration (RP11)","Guided enzyme investigations"]);
  const box=await dropdown.boundingBox();
  assert(box.x>=0 && box.x+box.width<=width+1 && box.y>=0 && box.y+box.height<=height+1,`Menu must fit ${width}x${height}: ${JSON.stringify(box)}`);
  assert(await dropdown.evaluate(el=>el.scrollHeight>el.clientHeight),"Long menu should scroll in the available space");
  await simulations.getByRole("link",{name:"Guided enzyme investigations"}).focus();
  assert(await dropdown.evaluate(el=>el.scrollTop>0),"Keyboard focus must scroll to the final link");
  await page.waitForFunction(()=>{
   const dropdown=document.querySelector(".site-nav details[open] .site-dropdown");
   const focused=document.activeElement.getBoundingClientRect(), bounds=dropdown.getBoundingClientRect();
   return focused.top>=bounds.top-1 && focused.bottom<=bounds.bottom+1;
  },null,{timeout:3000});
  await page.keyboard.press("Escape");
  assert(!(await learning.evaluate(el=>el.open)) && await summary.evaluate(el=>el===document.activeElement),"Escape must close the menu and restore focus");
  if(!touch){
   await summary.press("Enter");
   for(let i=0;i<13;i++) await page.keyboard.press("Tab");
   assert(await simulations.getByRole("link",{name:"Guided enzyme investigations"}).evaluate(el=>el===document.activeElement),"Tab should reach every link in order");
   await page.keyboard.press("Escape");
  }
  if(width===390){
   await summary.tap();
   await dropdown.evaluate(el=>{el.scrollTop=el.scrollHeight;});
   await page.screenshot({path:"/tmp/narajos-about-menu-mobile.png"});
   await simulations.getByRole("link",{name:"GCSE & A-level"}).tap();
   await page.waitForURL(base+simRoutes[1]);
   assert.equal(await page.locator(".site-nav [aria-current=page]").getAttribute("href"),"/teaching/simulations/");
  }
  await page.close();
 }
 const page=await browser.newPage({viewport:{width:1280,height:800}});
 await page.goto(base+"/about/");
 assert.deepEqual(await page.locator("main h2").allTextContents(),["Educational philosophy","About me","Influences","Feedback and suggestions"]);
 assert.equal(await page.getByRole("link",{name:"Feedback is not a gift"}).getAttribute("href"),"https://my.chartered.college/impact_article/feedback-is-not-a-gift/");
 assert.equal(await page.getByRole("link",{name:"Solving the Problem of Feedback"}).getAttribute("href"),"https://www.sagepub.com/shop/buy-a-book/teaching-hacks-fixing-everyday-classroom-issues-with-metacognition-1-285877");
 await page.screenshot({path:"/tmp/narajos-about-desktop.png",fullPage:true});
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:"/tmp/narajos-about-mobile.png",fullPage:true});
 await page.setViewportSize({width:1280,height:800});
 for(const path of ["/","/about/","/privacy/","/science-catch-up/","/gcse/","/alevel/","/human-biology/","/teacher/","/alevel/respiration/"]) {
  await page.goto(base+path);
  const footer=page.locator("footer");
  assert.equal(await footer.getByRole("link",{name:"About",exact:true}).getAttribute("href"),"/about/",path);
  assert.equal(await footer.getByRole("link",{name:"Feedback & Suggestions",exact:true}).getAttribute("href"),"/about/#feedback",path);
 }
 await page.goto(base+"/teaching/simulations/");
 assert.equal(await page.locator(".site-nav [aria-current=page]").textContent(),"All simulations");
 assert(await page.locator(".site-nav details").first().evaluate(el=>el.classList.contains("site-section-current")));
 await page.close();
}

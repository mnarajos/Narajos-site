import assert from "node:assert/strict";
import {mkdtemp,writeFile,rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {chromium} from "playwright";
import {checkStudentJourney} from "./check-shared-interactions.mjs";

// Chromium's tab zoom changes the layout viewport. Pinch zoom and a CSS
// transform don't exercise this behaviour. This extension exists only in CI.
export async function checkBrowserZoom(base) {
  const extension=await mkdtemp(join(tmpdir(),"narajos-zoom-"));
  let context;
  try{
    await writeFile(join(extension,"manifest.json"),JSON.stringify({name:"Local zoom regression",version:"1.0",manifest_version:3,permissions:["tabs"],background:{service_worker:"worker.js"}}));
    await writeFile(join(extension,"worker.js"),"chrome.runtime.onInstalled.addListener(() => {});");
    context=await chromium.launchPersistentContext("",{channel:"chromium",viewport:null,args:["--window-size=1280,900","--disable-extensions-except="+extension,"--load-extension="+extension]});
    const page=await context.newPage();
    await page.goto(base+"/teaching/focused-writing/order/");
    const before=await page.evaluate(()=>({width:innerWidth,ratio:devicePixelRatio}));
    const worker=context.serviceWorkers()[0] || await context.waitForEvent("serviceworker");
    const factor=await worker.evaluate(async base=>{
      const tabs=await chrome.tabs.query({});
      const tab=tabs.find(tab=>tab.url?.startsWith(base+"/"));
      await chrome.tabs.setZoom(tab.id,2);
      return chrome.tabs.getZoom(tab.id);
    },base);
    assert.equal(factor,2);
    await page.waitForFunction(old=>innerWidth<=old.width*.52 && devicePixelRatio>=old.ratio*1.95,before);
    await checkStudentJourney(page,base);
    assert(await page.evaluate(old=>devicePixelRatio>=old*1.95,before.ratio));
  }finally{
    await context?.close();
    await rm(extension,{recursive:true,force:true});
  }
}

import { chromium } from "playwright";
import { servePublic } from "./browser-test-site.mjs";

const browser = await chromium.launch();
const servers = [];
const previous = process.argv[2];
const routes = [
  ["/", ".home-options a", ".site-nav summary", ".site-nav details[open]"],
  ["/gcse/", 'input[type="search"]', 'input[type="search"]', null],
  ["/alevel/", 'input[type="search"]', 'input[type="search"]', null],
  ["/human-biology/", ".k-home-unit", ".k-home-unit", "main h1"],
  ["/teacher/", "#lesson option", "#newset", "#qlist .q"]
];
const device = [
  { label: "desktop", width: 1280, height: 850, cpu: 1, bandwidth: 1000000, latency: 25 },
  { label: "slower mobile", width: 390, height: 844, cpu: 4, bandwidth: 200000, latency: 120 }
];
const round = value => value == null ? null : Math.round(value);

try {
  async function measure(site, profile, [path, ready, action, result], fallbackFonts = false) {
    const context = await browser.newContext({
      viewport: { width: profile.width, height: profile.height },
      isMobile: profile.width < 500,
      hasTouch: profile.width < 500,
      deviceScaleFactor: 1
    });
    try {
      const page = await context.newPage();
      if (fallbackFonts) await page.route(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\//, route => route.abort());
      const cdp = await context.newCDPSession(page);
      await cdp.send("Network.enable");
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false, latency: profile.latency, downloadThroughput: profile.bandwidth, uploadThroughput: profile.bandwidth
      });
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: profile.cpu });
      await cdp.send("Performance.enable");
      await page.addInitScript(() => {
        window.samples = { lcp: null, shifts: [], tasks: [], events: [] };
        for (const [type, key] of [["largest-contentful-paint", "lcp"], ["layout-shift", "shifts"], ["longtask", "tasks"], ["event","events"]]) {
          if (!PerformanceObserver.supportedEntryTypes.includes(type)) continue;
          new PerformanceObserver(list => {
            for (const entry of list.getEntries()) {
              if (key === "lcp") window.samples.lcp = entry.startTime;
              else if (key === "shifts" && !entry.hadRecentInput) window.samples.shifts.push([entry.startTime, entry.value]);
              else if (key === "tasks") window.samples.tasks.push(entry.duration);
              else if (key === "events" && entry.interactionId) window.samples.events.push(entry.duration);
            }
          }).observe({ type, buffered: true, ...(type === "event" ? { durationThreshold: 16 } : {}) });
        }
      });
      await page.goto(site.base + path, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.locator(ready).first().waitFor({ state: ready === "#lesson option" ? "attached" : "visible", timeout: 15000 });
      const readyMs = await page.evaluate(() => performance.now());
      await page.waitForTimeout(650);
      const metric = Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map(x => [x.name, x.value]));
      const data = await page.evaluate(() => {
        const nav = performance.getEntriesByType("navigation")[0];
        const resources = performance.getEntriesByType("resource");
        const own = resources.filter(resource => new URL(resource.name).origin === location.origin);
        let maxShift = 0;
        let sum = 0;
        let start = -1;
        let previous = -1;
        for (const [time, value] of window.samples.shifts) {
          if (start === -1 || time - previous >= 1000 || time - start >= 5000) {
            sum = 0;
            start = time;
          }
          sum += value;
          maxShift = Math.max(maxShift, sum);
          previous = time;
        }
        return {
          lcp: window.samples.lcp, cls: maxShift,
          startupBlockingMs: window.samples.tasks.reduce((total, time) => total + Math.max(0, time - 50), 0),
          transferBytes: nav.transferSize + own.reduce((total, resource) => total + resource.transferSize, 0),
          documentBytes: nav.encodedBodySize,
          scripts: own.filter(resource => resource.initiatorType === "script" || new URL(resource.name).pathname.endsWith(".js")).length,
          externalFontRequests: resources.filter(resource => /fonts\.(?:googleapis|gstatic)\.com/.test(resource.name)).length,
          loadedPoppins: Array.from(document.fonts).filter(font => font.family.includes("Poppins") && font.status === "loaded").length
        };
      });
      const started = Date.now();
      await page.locator(action).first().click();
      if (result) await page.locator(result).first().waitFor({ state: "visible" });
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const event = await page.evaluate(() => window.samples.events.length ? Math.max(...window.samples.events) : null);
      return {
        path, profile: profile.label + (fallbackFonts ? " / system fallback" : ""),
        lcpMs: round(data.lcp), readyMs: round(readyMs), cls: Number(data.cls.toFixed(3)),
        scriptMs: round(metric.ScriptDuration * 1000), startupBlockingMs: round(data.startupBlockingMs),
        documentBytes: data.documentBytes, transferBytes: data.transferBytes,
        scripts: data.scripts, externalFontRequests: data.externalFontRequests, loadedPoppins: data.loadedPoppins,
        actionRoundTripMs: Date.now() - started, eventMs: event
      };
    } finally {
      await context.close();
    }
  }

  for (const [label, directory] of [...(previous ? [["before", previous]] : []), ["candidate", "public"]]) {
    const site = await servePublic({ directory, compress: true });
    servers.push(site.server);
    for (const profile of device) {
      for (const route of routes) {
        console.log("Performance sample " + JSON.stringify({ label, ...await measure(site, profile, route) }));
      }
    }
    if (label === "candidate") {
      console.log("Performance sample " + JSON.stringify({ label, ...await measure(site, device[1], routes[0], true) }));
    }
  }
} finally {
  await browser.close();
  await Promise.all(servers.map(server => new Promise(done => server.close(done))));
}

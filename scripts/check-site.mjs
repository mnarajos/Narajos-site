import "./check-assessment-integrity.mjs";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";

// Dependency-free static verification. Browser interaction and visual tests remain manual.
const root=path.resolve("public");
const failures=[];
const requireTrue=(condition,message)=>{if(!condition)failures.push(message);};
const read=relative=>readFileSync(path.join(root,relative),"utf8");
const siteOrigin = "https://narajos.com";
const requiredSharingFields = ["og:title", "og:description", "og:image", "og:image:width", "og:image:height",
 "og:image:type", "og:image:alt", "og:url", "og:type", "og:site_name",
 "twitter:card", "twitter:title", "twitter:description", "twitter:image", "twitter:image:alt"];
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function pngSize(relative) {
 const file = path.join(root, relative);
 if (!existsSync(file) || !statSync(file).isFile()) return;
 const png = readFileSync(file);
 if (png.length >= 33 && png.subarray(0, 8).equals(pngSignature) && png.toString("ascii", 12, 16) === "IHDR") {
  return `${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`;
 }
}

function htmlTags(html, tag) {
 const tags = new RegExp(`<${tag}(?=[\\s/>])((?:[^"'<>]|"[^"]*"|'[^']*')*)>`, "gi");
 return [...html.matchAll(tags)].map(([, attributes]) => Object.fromEntries(
  [...attributes.matchAll(/([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)]
   .map(([, name, doubleQuoted, singleQuoted, bare]) => [name.toLowerCase(), doubleQuoted ?? singleQuoted ?? bare ?? ""])
 ));
}

function checkSharing(relative, html) {
 // Strip non-markup content before looking for metadata that a crawler can read without scripts.
 const markup = html.replace(/<!--[\s\S]*?-->|<(style|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "");
 const head = /<head\b[^>]*>([\s\S]*?)<\/head\s*>/i.exec(markup)?.[1] ?? "";
 const links = htmlTags(head, "link");
 const icons = links.filter(link => link.rel?.toLowerCase() === "icon");
 const touchIcons = links.filter(link => link.rel?.toLowerCase() === "apple-touch-icon");
 requireTrue(icons.length === 1 && icons[0].href === "/favicon.svg" && icons[0].type === "image/svg+xml",
  "Expected one Narajos SVG favicon in " + relative);
 requireTrue(touchIcons.length === 1 && touchIcons[0].href === "/apple-touch-icon.png" && touchIcons[0].sizes === "180x180",
  "Expected one 180×180 Apple touch icon in " + relative);

 const socialTags = source => htmlTags(source, "meta").flatMap(tag => ["name", "property"]
  .filter(attribute => /^(og|twitter):/i.test(tag[attribute] ?? ""))
  .map(attribute => ({ key: tag[attribute].toLowerCase(), attribute, content: tag.content })));
 const tags = socialTags(head);
 requireTrue(socialTags(markup).length === tags.length, "Social sharing metadata outside initial head in " + relative);
 if (relative === "404.html") {
  requireTrue(tags.length === 0, "Social sharing metadata on error page: " + relative);
  return;
 }

 const canonical = `${siteOrigin}/${relative.replace(/index\.html$/, "")}`;
 const canonicals = links.filter(link => link.rel?.toLowerCase() === "canonical");
 requireTrue(canonicals.length === 1 && canonicals[0].href === canonical, "Incorrect canonical URL in " + relative);
 const values = new Map();
 for (const { key, attribute, content } of tags) {
  const expectedAttribute = key.startsWith("og:") ? "property" : "name";
  requireTrue(attribute === expectedAttribute, `Expected ${expectedAttribute} for ${key} in ${relative}`);
  requireTrue(!values.has(key), `Duplicate ${key} in ${relative}`);
  values.set(key, content);
 }
 for (const key of requiredSharingFields) {
  requireTrue(values.get(key)?.trim(), `Missing ${key} in ${relative}`);
 }
 requireTrue(values.get("og:url") === canonical, "Open Graph URL disagrees with the canonical URL in " + relative);
 requireTrue(values.get("twitter:card") === "summary_large_image", "Incorrect Twitter card type in " + relative);
 for (const field of ["title", "description", "image", "image:alt"]) {
  requireTrue(values.get(`twitter:${field}`) === values.get(`og:${field}`), `Twitter and Open Graph ${field} disagree in ${relative}`);
 }

 const image = values.get("og:image");
 let imageUrl;
 try { imageUrl = new URL(image); } catch {}
 requireTrue(imageUrl?.origin === siteOrigin && !imageUrl.username && !imageUrl.password && imageUrl.pathname.endsWith(".png"),
  "Expected an absolute HTTPS URL for a Narajos PNG preview in " + relative);
 requireTrue(values.get("og:image:width") === "1200" && values.get("og:image:height") === "630" && values.get("og:image:type") === "image/png",
  "Incorrect Open Graph PNG type or dimensions in " + relative);
 if (imageUrl?.origin === siteOrigin) {
  requireTrue(pngSize(imageUrl.pathname.slice(1)) === "1200x630", `Expected a 1200×630 PNG at ${image} in ${relative}`);
 }
}

const fileList=[];
function walk(directory){
 for(const name of readdirSync(directory)){
  const full=path.join(directory,name);
  if(statSync(full).isDirectory())walk(full);
  else fileList.push(full);
 }
}
walk(root);
const htmlFiles=fileList.filter(f=>f.endsWith(".html"));
const required=[
 "index.html","gcse/index.html","alevel/index.html","human-biology/index.html","teacher/index.html",
 "teaching/index.html","teaching/simulations/index.html","privacy/index.html","about/index.html","teaching-for-lasting-learning/index.html"
];
for(const p of required)requireTrue(existsSync(path.join(root,p)),"Missing public page: "+p);
const simSlugs=["enzyme-kinetics","enzyme-inhibition","molecular-biology","bioenergetics","cardiac-cycle"];
for(const slug of simSlugs)requireTrue(existsSync(path.join(root,"teaching/simulations",slug,"index.html")),"Missing simulation: "+slug);
requireTrue(existsSync(path.join(root, "favicon.svg")) && /<svg\b/.test(read("favicon.svg")), "Missing Narajos SVG favicon");
requireTrue(pngSize("apple-touch-icon.png") === "180x180", "Expected a 180×180 PNG Apple touch icon");
let scriptCount=0,linkCount=0;
for(const full of htmlFiles){
 const relative=path.relative(root,full).replaceAll(path.sep,"/");
 const html=readFileSync(full,"utf8");
 requireTrue(html.includes('href="/assets/home-link.css"'),"Shared homepage control styles missing: "+relative);
 requireTrue(html.includes('href="/" id="site-home" class="narajos-home" aria-label="Narajos homepage"'),"Canonical homepage control missing: "+relative);
 requireTrue(/<html\b[^>]*lang="en(?:-GB)?"/i.test(html),"Missing English language attribute: "+relative);
 requireTrue(/<title>[^<]+<\/title>/i.test(html),"Missing page title: "+relative);
 requireTrue(/<meta[^>]*name="viewport"/i.test(html),"Missing viewport meta: "+relative);
 // Script syntax only: never execute untrusted page code in tests.
 const withoutScripts=html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi,(_all,attrs,code)=>{
  const type=/\btype\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1]||"";
  if(!/\bsrc\s*=/.test(attrs)&&!type.includes("json")&&type!=="module"&&code.trim()){
   scriptCount++;
   try{new vm.Script(code,{filename:relative});}
   catch(e){failures.push("Script parse error in "+relative+": "+e.message);}
  }
  return "";
 });
 checkSharing(relative, withoutScripts);
 const footers=(withoutScripts.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi)||[]).join("\n");
 const copyright=footers.match(/<p\b[^>]*\bclass="[^"]*\bsite-copyright\b[^"]*"[^>]*>([\s\S]*?)<\/p>/i)?.[1];
 requireTrue(copyright?.replace(/\s+/g," ").trim()==="© 2026 <strong>Narajos</strong> <em>/nerr-RA-hoss/</em>","Missing or incorrect footer copyright: "+relative);
 requireTrue((footers.match(/\/nerr-RA-hoss\//g)||[]).length===1,"Expected one footer pronunciation: "+relative);
 requireTrue(!/(?:designed|made) by Dr\.?\s+Narajos\b|\bVersion\s+1\.1\b/i.test(footers),"Obsolete project credit or version in footer: "+relative);
 // Local absolute hrefs must point to files or folders with an index.
 const links=[...withoutScripts.matchAll(/<a\b[^>]*\bhref=["'](\/[^"']*)["']/gi)].map(m=>m[1]);
 for(const href of links){
  linkCount++;
  const urlPath=href.split(/[?#]/,1)[0];
  if(urlPath.includes("{")||urlPath.includes("$"))continue;
  const target=path.join(root,decodeURIComponent(urlPath).replace(/^\/+/,""));
  requireTrue(existsSync(target)||(existsSync(path.join(target,"index.html"))),"Broken internal link in "+relative+": "+href);
 }
 if(relative.startsWith("teaching/simulations/")&&relative!=="teaching/simulations/index.html"){
  requireTrue(html.includes('class="sim-utility-nav"'),"Missing shared simulation navigation: "+relative);
  requireTrue(/<h1\b/.test(html),"Missing primary heading: "+relative);
 }
}
const home=read("index.html"),teacher=read("teacher/index.html");
const alevel=read("alevel/index.html"),gcse=read("gcse/index.html");
const humanIndex=read("human-biology/index.html");
requireTrue(humanIndex.includes('/human-biology/companion.js'),"Human Biology companion not loaded");
requireTrue(alevel.includes('href="#catchup-')&&alevel.includes('href="#catchup"'),"A-level catch-up navigation missing");
requireTrue(home.includes('href="/human-biology/"'),"Human Biology link missing from homepage");
requireTrue(read("human-biology/index.html").includes('/human-biology/app.js'),"Human Biology application script missing");
requireTrue(read("human-biology/index.html").includes('href="/" id="site-home"'),"Human Biology site return link missing");
requireTrue(home.includes("Focused Questions"),"Teacher tool not discoverable from homepage");
const sharedHeaderPages=["index.html","teaching/index.html","teaching/simulations/index.html","privacy/index.html","about/index.html"];
for(const p of sharedHeaderPages){
 const html=read(p);
 requireTrue(!/<nav class="site-nav"/.test(html),"Duplicate shared navigation in "+p);
 requireTrue(html.includes('src="/assets/site-nav.js"'),"Shared navigation script missing from "+p);
}

const about=read("about/index.html"), sharedNav=read("assets/site-nav.js");
const teachingArticle=read("teaching-for-lasting-learning/index.html");
requireTrue(about.includes('href="/teaching-for-lasting-learning/">Teaching and learning</a>'),"About article link missing");
requireTrue(read("sitemap.xml").includes("https://narajos.com/teaching-for-lasting-learning/"),"Teaching article missing from sitemap");
requireTrue(!sharedNav.includes('/teaching-for-lasting-learning/'),"Teaching article should not be added to the main navigation");
requireTrue((teachingArticle.match(/class="article-figure"/g)||[]).length===5,"Teaching article needs five diagrams");
requireTrue((teachingArticle.match(/class="diagnostic-scenario"/g)||[]).length===8,"Teaching article needs eight diagnostic scenarios");
for(const slug of ["framework","performance","challenge-support","responsive-teaching","success-motivation"])for(const mode of ["desktop","mobile"]){
 const figure="assets/teaching-for-lasting-learning/"+slug+"-"+mode+".svg";
 requireTrue(existsSync(path.join(root,figure)),"Teaching diagram missing: "+figure);
 if(existsSync(path.join(root,figure)))requireTrue(/<title\b/.test(read(figure))&&/<desc\b/.test(read(figure)),"Accessible SVG title or description missing: "+figure);
}
requireTrue(read("sitemap.xml").includes("https://narajos.com/about/"),"About missing from sitemap");
requireTrue(about.includes('id="feedback"') && about.includes('href="mailto:support@narajos.com"'),"About feedback anchor or email missing");
for(const href of ["https://my.chartered.college/impact_article/feedback-is-not-a-gift/","https://www.sagepub.com/shop/buy-a-book/teaching-hacks-fixing-everyday-classroom-issues-with-metacognition-1-285877"]){
 requireTrue(about.includes('href="'+href+'"'),"About publication link missing: "+href);
}
requireTrue(sharedNav.indexOf('id="nav-qualifications"') < sharedNav.indexOf('id="nav-simulations"'),"Simulations must follow qualifications in shared navigation");
requireTrue(sharedNav.includes('["/about/","About"]') && sharedNav.includes('["/about/#feedback","Feedback & Suggestions"]'),"Shared footer links missing");
for(const p of ["gcse/index.html","alevel/index.html","human-biology/index.html","teacher/index.html","alevel/respiration/index.html"]){
 const html=read(p);
 requireTrue(html.includes('href="/about/"') && html.includes('href="/about/#feedback"'),"Resource footer links missing: "+p);
}
const teachingOverview=read("teaching/index.html");
const learnerCards=[...teachingOverview.matchAll(/<a class="app-card[^"]*" href="(\/[^"]+)"/g)].map(m=>m[1]);
requireTrue(learnerCards.join(",")==="/gcse/,/alevel/,/human-biology/","Teaching overview must show all three learner apps before educator tools");
requireTrue(teachingOverview.includes('href="/teacher/"')&&teachingOverview.includes("For educators"),"Focused Questions needs a separate educator section");
requireTrue(home.includes("complement classroom teaching rather than replace it"),"Homepage missing teacher-complement rationale");
requireTrue(home.includes("Learning &amp; Teaching in Science"),"Homepage title missing");
requireTrue(home.includes("used freely for personal study and classroom teaching"),"Homepage missing educational permission");
requireTrue(home.includes('href="/terms/"'),"Homepage Terms of Use link missing");
const terms=read("terms/index.html");
requireTrue(terms.includes("Third-party materials")&&terms.includes("their own licences"),"Terms must describe third-party licences separately");
const support=read("support/index.html");
requireTrue(home.includes('<a href="/support/">Support this website</a>'),"Footer support link missing");
requireTrue(support.includes("I am aged 18 or over")&&support.includes("current students"),"Support declaration is incomplete");
requireTrue(!support.includes('href="https://ko-fi.com/narajos"'),"Ko-fi link must only be enabled after both declarations");
requireTrue(home.includes("GCSE Combined Science (AQA)"),"Homepage must name AQA after GCSE Combined Science");
requireTrue((home.match(/class="home-icon"/g)||[]).length===3,"Homepage must give each resource type a distinctive icon");
const simulated=read("teaching/simulations/index.html");
requireTrue((simulated.match(/class="app-card sim-card sim-card--/g)||[]).length===6,"Simulation catalogue should have six fully clickable cards");
requireTrue(existsSync(path.join(root,"assets/site-nav.js")),"Site nav script missing");
requireTrue(existsSync(path.join(root,"assets/catchup-visuals.css")),"Catch-up diagram styles missing");
requireTrue(alevel.includes('src="/assets/catchup-visuals.js"')&&alevel.includes("KeystoneCatchupVisuals.render(t,c.id)"),"A-level catch-up visuals not wired");
requireTrue(humanIndex.includes('src="/assets/catchup-visuals.js"')&&read("human-biology/companion.js").includes("KeystoneCatchupVisuals.render(unit,id)"),"Human Biology catch-up visuals not wired");
try{
 const visualSandbox=vm.createContext({window:{}});
 vm.runInContext(read("assets/catchup-visuals.js"),visualSandbox);
 const visual=visualSandbox.window.KeystoneCatchupVisuals;
 for(const [u,id,expected] of [["a1","enzfactors","enzyme-kinetics"],["a4","transcription","molecular-biology"],["a3","heart","cardiac-cycle"],["f170","2.1.2","cardiac-cycle"]]){
  requireTrue(visual.render(u,id).includes("/teaching/simulations/"+expected+"/"),"Missing curated simulation cross-link "+u+"/"+id);
 }
 for(const [u,id] of [["a1","monopoly"],["a2","osmosis"],["a5","chemios"],["f171","3.2.2"]]){
  requireTrue(visual.render(u,id).includes('role="img"'),"Missing accessible catch-up diagram "+u+"/"+id);
 }
 requireTrue(visual.render("f170","3.2.1").includes('<science-sequence kind="reflex">')&&humanIndex.includes('src="/assets/science-sequences.js"'),"F170 reflex sequence is not wired");
 requireTrue(visual.render("f175","a1").indexOf("kc-simulation-link")<0,"Unrelated simulation link in F175 knowledge recap");
 requireTrue(humanIndex.includes("reproduction-simulation.js")&&humanIndex.includes("reproduction-simulation.css"),"F175 interactive model assets missing");
 requireTrue(read("human-biology/reproduction-simulation.js").includes("LH surge")&&read("human-biology/companion.js").includes("KeystoneReproductionSimulation.mount"),"F175 hormone-sequence model must be available in catch-up");
}catch(e){failures.push("Catch-up visual script failed to parse or render: "+e.message);}
requireTrue(teacher.includes('class="narajos-home" aria-label="Narajos homepage"'),"Focused Questions return link missing");
requireTrue(["printq","printms","printboth"].every(id=>teacher.includes('id="'+id+'"')),"Focused Questions print options missing");
for(const [name,html] of [["GCSE",gcse],["A-level",alevel]]){
 requireTrue(html.includes('class="narajos-home"'),name+" main site return link missing");
 requireTrue(html.includes("beforeunload"),name+" browser exit protection missing");
}
requireTrue(alevel.includes('"The stage of the cell cycle in which DNA replicates","S phase"'),"A-level replication card missing");
const sitemap=[...read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
requireTrue(new Set(sitemap).size===sitemap.length,"Sitemap contains duplicate URLs");
requireTrue(sitemap.includes("https://narajos.com/science-catch-up/"),"Sitemap must contain the catch-up catalogue");
for(const href of sitemap){
 const url=new URL(href);
 const page=url.pathname.slice(1)+"index.html";
 requireTrue(url.origin==="https://narajos.com"&&!url.hash&&!url.search,"Sitemap URL must be canonical: "+href);
 const html=read(page);
 requireTrue(html.includes('rel="canonical" href="'+href+'"'),"Sitemap URL disagrees with page canonical: "+href);
 requireTrue(!/<meta[^>]*name="robots"[^>]*noindex/i.test(html),"Sitemap lists a noindex page: "+href);
}
requireTrue(existsSync(path.join(root,"assets/site.css")),"Site CSS missing");
requireTrue(existsSync(path.join(root,"assets/simulation-shell.css")),"Simulation shell CSS missing");

if(failures.length){
 console.error("Website check failed ("+failures.length+" issue(s)):");
 for(const f of failures)console.error(" - "+f);
 process.exitCode=1;
}else{
 console.log("Website check passed: "+htmlFiles.length+" pages, "+scriptCount+" inline scripts parsed, "+linkCount+" local links checked.");
}

/* Shared navigation behaviour for the public Narajos pages.
 * Keep the native <details> control accessible for touch, pointer and keyboard.
 */
(function(){
 "use strict";
 var footer=document.querySelector("footer.footer .footer-inner");
 if(footer&&!footer.querySelector('a[href="/terms/"]')){
  var footerLinks=footer.querySelector(".footer-links");
  if(!footerLinks){
   footerLinks=document.createElement("nav");
   footerLinks.className="footer-links";
   footerLinks.setAttribute("aria-label","Footer navigation");
   var privacy=footer.querySelector('a[href="/privacy/"]');
   if(privacy)footerLinks.append(privacy);
   footer.append(footerLinks);
  }
  var terms=document.createElement("a");
  terms.href="/terms/";
  terms.textContent="Terms of Use";
  footerLinks.append(terms);
 }
 var header=document.querySelector(".topbar .topbar-inner");
 if(!header)return;
 var nav=document.querySelector(".site-nav");
 if(!nav){
  nav=document.createElement("nav");
  nav.className="site-nav";
  nav.setAttribute("aria-label","Main navigation");
  nav.innerHTML=`
   <details><summary><span class="nav-full">Learning Companions</span><span class="nav-short" aria-hidden="true">Study tools</span></summary>
    <div class="site-dropdown"><a href="/science-catch-up/?year=7">Year 7 Science <small>Catch up</small></a><a href="/science-catch-up/?year=8">Year 8 Science <small>Catch up</small></a><a href="/science-catch-up/?year=9">Year 9 Science <small>Catch up or revise</small></a><a href="/science-catch-up/?year=10">Year 10 Science <small>GCSE Trilogy · catch up or revise</small></a><a href="/science-catch-up/?year=11">Year 11 Science <small>GCSE Trilogy · catch up or revise</small></a><a href="/gcse/">GCSE Combined Science (AQA Trilogy) <small>Revise and practise</small></a><a href="/alevel/">A-level Biology (AQA)</a><a href="/human-biology/">Human Biology (Cambridge AAQ)</a></div></details>
   <details><summary><span class="nav-full">Biology Simulations</span><span class="nav-short" aria-hidden="true">Simulations</span></summary>
    <div class="site-dropdown"><a href="/teaching/simulations/">All simulations</a><a href="/teaching/simulations/#gcse-and-alevel">GCSE &amp; A-level</a><a href="/teaching/simulations/#alevel">A-level Biology</a></div></details>
   <details class="teacher-menu"><summary>Teacher Tools</summary>
    <div class="site-dropdown"><a href="/teacher/">Focused Questions</a><a href="/teaching/focused-writing/">Focused Writing</a></div></details>`;
  header.append(nav);
 }
 var oldCatchup=nav.querySelector('a[href="/ks3/"]');
 if(oldCatchup){oldCatchup.href="/science-catch-up/";oldCatchup.textContent="Science Catch-up";}
 var pathname=location.pathname;
 var section=pathname.startsWith("/ks3/")?"/science-catch-up/":pathname;
 if(section.startsWith("/teaching/enzyme-investigations/"))section="/teaching/simulations/";
 nav.querySelectorAll(".site-dropdown a").forEach(function(link){
  if(link.hash||!section.startsWith(link.pathname))return;
  link.closest("details").classList.add("site-section-current");
  if(link.pathname===pathname&&(!link.search||link.search===location.search))link.setAttribute("aria-current","page");
 });
 var menus=Array.from(nav.querySelectorAll("details"));
 if(!menus.length)return;
 function closeOthers(keep){
  menus.forEach(function(menu){if(menu!==keep)menu.open=false;});
 }
 menus.forEach(function(menu){
  menu.addEventListener("toggle",function(){if(menu.open)closeOthers(menu);});
 });
 document.addEventListener("pointerdown",function(event){
  if(!event.target.closest(".site-nav details"))closeOthers(null);
 });
 document.addEventListener("focusin",function(event){
  if(!event.target.closest(".site-nav details"))closeOthers(null);
 });
 document.addEventListener("keydown",function(event){
  if(event.key!=="Escape")return;
  var expanded=menus.find(function(menu){return menu.open;});
  if(!expanded)return;
  event.preventDefault();
  closeOthers(null);
  var trigger=expanded.querySelector("summary");
  if(trigger)trigger.focus();
 });
 nav.addEventListener("click",function(event){
  if(event.target.closest(".site-dropdown a"))closeOthers(null);
 });
 window.addEventListener("pageshow",function(){closeOthers(null);});
})();

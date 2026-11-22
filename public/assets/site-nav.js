/* Shared navigation behaviour for the public Narajos pages.
 * Keep the native <details> control accessible for touch, pointer and keyboard.
 */
(function(){
 "use strict";
 var footer=document.querySelector("footer.footer .footer-inner");
 if(footer&&!footer.querySelector('a[href="/terms/"]')){
  var footerLinks=footer.querySelector(".footer-links, .school-footer-links");
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
 var nav=document.createElement("nav");
 nav.className="site-nav";
 nav.setAttribute("aria-label","Main navigation");
 nav.innerHTML=`
  <details><summary><span class="nav-full">Learning Companions</span><span class="nav-short" aria-hidden="true">Study tools</span></summary>
   <div class="site-dropdown">
    <div class="site-dropdown-group" role="group" aria-labelledby="nav-years">
     <p id="nav-years">Catch up by year</p>
     <div class="site-year-links"><a href="/science-catch-up/?year=7">Year 7</a><a href="/science-catch-up/?year=8">Year 8</a><a href="/science-catch-up/?year=9">Year 9</a><a href="/science-catch-up/?year=10">Year 10</a><a href="/science-catch-up/?year=11">Year 11</a></div>
    </div>
    <div class="site-dropdown-group" role="group" aria-labelledby="nav-qualifications">
     <p id="nav-qualifications">By qualification</p>
     <a href="/gcse/">GCSE Combined Science — AQA Trilogy</a><a href="/alevel/#catchup">A-level Biology — Catch up</a><a href="/human-biology/#catchup">Human Biology — Catch up</a>
    </div>
   </div>
  </details>
  <details><summary><span class="nav-full">Biology Simulations</span><span class="nav-short" aria-hidden="true">Simulations</span></summary>
   <div class="site-dropdown"><a href="/teaching/simulations/">All simulations</a><a href="/teaching/simulations/#gcse-and-alevel">GCSE &amp; A-level</a><a href="/teaching/simulations/#alevel">A-level Biology</a><a href="/teaching/enzyme-investigations/">Guided enzyme investigations</a></div></details>
  <details class="teacher-menu"><summary>Teacher Tools</summary>
   <div class="site-dropdown"><a href="/teacher/">Focused Questions</a><a href="/teaching/focused-writing/">Focused Writing</a></div></details>`;
 header.append(nav);

 function showCurrentPage(){
  var pathname=location.pathname;
  var section=pathname.startsWith("/ks3/")?"/science-catch-up/":pathname;
  if(section.startsWith("/science-catch-up/")){
   section="/science-catch-up/";
   var year=document.documentElement.dataset.catchupYear;
   if(year)section+="?year="+year;
  }
  nav.querySelectorAll(".site-section-current").forEach(function(menu){menu.classList.remove("site-section-current");});
  nav.querySelectorAll("[aria-current]").forEach(function(link){link.removeAttribute("aria-current");});
  var pageLinks=Array.from(nav.querySelectorAll(".site-dropdown a"));
  var current=pageLinks.find(function(link){return link.pathname+link.search+link.hash===section;});
  if(!current)current=pageLinks.find(function(link){return !link.search&&!link.hash&&pathname.startsWith(link.pathname);});
  if(!current){
   if(section==="/science-catch-up/")nav.querySelector("details").classList.add("site-section-current");
   return;
  }
  current.closest("details").classList.add("site-section-current");
  current.setAttribute("aria-current",current.pathname+current.search===pathname+location.search?"page":"location");
 }
 showCurrentPage();
 document.addEventListener("narajos:catchup-year",showCurrentPage);
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

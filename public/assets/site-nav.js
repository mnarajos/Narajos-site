/* Shared navigation behaviour for the public Narajos pages.
 * Keep the native <details> control accessible for touch, pointer and keyboard.
 */
(function(){
 "use strict";
 var footer=document.querySelector("footer.footer .footer-inner");
 if(footer){
  var footerLinks=footer.querySelector(".footer-links, .school-footer-links");
  if(!footerLinks){
   footerLinks=document.createElement("nav");
   footerLinks.className="footer-links";
   footerLinks.setAttribute("aria-label","Footer navigation");
   var privacy=footer.querySelector('a[href="/privacy/"]');
   if(privacy)footerLinks.append(privacy);
   footer.append(footerLinks);
  }
  [["/terms/","Terms of Use"],["/about/","About"],["/about/#feedback","Feedback & Suggestions"]].forEach(function(item){
   if(footer.querySelector('a[href="'+item[0]+'"]'))return;
   var link=document.createElement("a");
   link.href=item[0];
   link.textContent=item[1];
   footerLinks.append(link);
  });
 }
 var header=document.querySelector(".topbar .topbar-inner");
 if(!header)return;
 var nav=document.createElement("nav");
 nav.className="site-nav";
 nav.setAttribute("aria-label","Main navigation");
 nav.innerHTML=`
  <details><summary>Learning Tools</summary>
   <div class="site-dropdown">
    <div class="site-dropdown-group" role="group" aria-labelledby="nav-years">
     <p id="nav-years">Catch up by year</p>
     <div class="site-year-links"><a href="/science-catch-up/?year=7">Year 7</a><a href="/science-catch-up/?year=8">Year 8</a><a href="/science-catch-up/?year=9">Year 9</a><a href="/science-catch-up/?year=10">Year 10</a><a href="/science-catch-up/?year=11">Year 11</a></div>
    </div>
    <div class="site-dropdown-group" role="group" aria-labelledby="nav-qualifications">
     <p id="nav-qualifications">By qualification</p>
     <a href="/gcse/">GCSE Combined Science — AQA Trilogy</a><a href="/alevel/">A-level Biology — AQA</a><a href="/human-biology/">Human Biology — Cambridge OCR AAQ</a>
    </div>
    <div class="site-dropdown-group" role="group" aria-labelledby="nav-simulations">
     <p id="nav-simulations">Biology simulations</p>
     <a href="/teaching/simulations/">All simulations</a><a href="/teaching/simulations/#gcse-and-alevel">GCSE &amp; A-level</a><a href="/teaching/simulations/#alevel">A-level Biology</a><a href="/alevel/glucose-calibration/">Glucose calibration (RP11)</a><a href="/teaching/enzyme-investigations/">Guided enzyme investigations</a>
    </div>
   </div>
  </details>
  <details class="teacher-menu"><summary>Teaching Tools</summary>
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
 function fitOpenMenu(){
  var open=menus.find(function(menu){return menu.open;});
  if(!open)return;
  var dropdown=open.querySelector(".site-dropdown");
  if(!dropdown)return;
  var viewport=window.visualViewport;
  var bottom=viewport?viewport.offsetTop+viewport.height:window.innerHeight;
  dropdown.style.setProperty("--dropdown-available",Math.max(0,bottom-dropdown.getBoundingClientRect().top-8)+"px");
 }
 menus.forEach(function(menu){
  menu.addEventListener("toggle",function(){if(menu.open){closeOthers(menu);fitOpenMenu();}});
 });
 window.addEventListener("resize",fitOpenMenu);
 window.addEventListener("scroll",fitOpenMenu);
 if(window.visualViewport)window.visualViewport.addEventListener("resize",fitOpenMenu);
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

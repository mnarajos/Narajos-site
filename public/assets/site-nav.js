/* Shared navigation behaviour for the public Narajos pages.
 * Keep the native <details> control accessible for touch, pointer and keyboard.
 */
(function(){
 "use strict";
 var nav=document.querySelector(".site-nav");
 if(!nav)return;
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

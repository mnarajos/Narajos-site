/* Narajos Keystone spaced-review engine v1.
   Used by GCSE Combined Science and A-level Biology.
   Progress is private to this browser and segregated by course. */
(function(root){
 "use strict";
 var DAY=86400000, STEPS=[1,3,7,14,30,60,120];
 function open(course){
  if(!/^[a-z0-9-]+$/.test(course))throw new Error("Invalid course");
  var key="narajos-keystone-review-v1-"+course, records={};
  try{var stored=JSON.parse(localStorage.getItem(key)||"null");if(stored&&stored.v===1&&stored.cards&&typeof stored.cards==="object"&&!Array.isArray(stored.cards))records=stored.cards;}catch(_){}
  function persist(){try{localStorage.setItem(key,JSON.stringify({v:1,cards:records}));return true;}catch(_){return false;}}
  function get(id){return Object.prototype.hasOwnProperty.call(records,id)?records[id]:null;}
  function mark(id,gotIt,when){
   if(typeof id!=="string"||!id||id.length>120)throw new Error("Invalid card id");
   var now=Number.isFinite(when)?when:Date.now(),old=get(id)||{};
   var n={seen:(old.seen||0)+1,good:(old.good||0)+(gotIt?1:0),again:(old.again||0)+(gotIt?0:1),
    last:now,stage:0,due:now,lastGood:!!gotIt,first:old.first||now};
   if(gotIt){
    // A second success on the same day should not simulate a second spaced session.
    var repeatSameDay=old.lastGood&&old.last&&now-old.last<DAY*0.7;
    n.stage=Math.min(STEPS.length,repeatSameDay?(old.stage||1):(old.stage||0)+1);
    n.due=now+STEPS[n.stage-1]*DAY;
   } else {
    n.stage=0;n.due=now+10*60000;
   }
   records[id]=n;persist();return n;
  }
  function due(id,when){var n=get(id);return !!(n&&n.seen&&n.due<=(Number.isFinite(when)?when:Date.now()));}
  function weak(id){var n=get(id);return !!(n&&n.again>0&&(n.stage<3||n.good/Math.max(1,n.seen)<.8));}
  function stats(ids,when){
   var a={total:ids.length,seen:0,due:0,weak:0,retained:0,new:0};
   ids.forEach(function(id){var n=get(id);if(!n||!n.seen){a.new++;return;}a.seen++;if(due(id,when))a.due++;if(weak(id))a.weak++;if(n.stage>=3)a.retained++;});
   return a;
  }
  function normal(answer){return String(answer==null?"":answer).normalize("NFKC").toLowerCase().trim().replace(/[’‘]/g,"'").replace(/[−–]/g,"-").replace(/[ \t\n\r]+/g," ").replace(/[.!?]+$/,"").trim();}
  function matches(value,expected,alternatives){
   var v=normal(value);
   if(!v)return false;
   return [expected].concat(Array.isArray(alternatives)?alternatives:[]).some(function(s){return normal(s)===v;});
  }
  function snapshot(){return JSON.parse(JSON.stringify(records));}
  return {get:get,mark:mark,due:due,weak:weak,stats:stats,matches:matches,normal:normal,snapshot:snapshot,storageKey:key};
 }
 root.KeystoneReview={open:open,VERSION:1};
})(window);

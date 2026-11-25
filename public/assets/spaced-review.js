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
  function mark(id,gotIt,when,evidence){
   if(typeof id!=="string"||!id||id.length>120)throw new Error("Invalid card id");
   var now=Number.isFinite(when)?when:Date.now(),old=get(id)||{};
   var n={seen:(old.seen||0)+1,good:(old.good||0)+(gotIt?1:0),again:(old.again||0)+(gotIt||evidence==="revealed"?0:1),
    last:now,stage:0,due:now,lastGood:!!gotIt,first:old.first||now};
   if(old.evidence)n.evidence={...old.evidence};
   if(evidence){
    n.evidence ||= {};
    n.evidence[evidence]=(n.evidence[evidence]||0)+1;
    n.lastEvidence=evidence;
   }
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
   return [expected].concat(Array.isArray(alternatives)?alternatives:[]).some(function(s){
    // Element symbols and charges carry meaning even when subscripts were typed on a phone.
    if (s === "CO" || /^(?:J|A|V|N|Hz|Ω)$/.test(s) || /^(?:[A-Z][a-z]?[₀-₉ₙ₊⁺⁻0-9n+-]*)+$/.test(s) && /[₀-₉ₙ₊⁺⁻0-9+-]/.test(s))
      return String(value).trim().normalize("NFKC").replace(/−/g,"-") === s.normalize("NFKC").replace(/−/g,"-");
    return normal(s)===v;
   });
  }
  function snapshot(){return JSON.parse(JSON.stringify(records));}
  return {get:get,mark:mark,due:due,weak:weak,stats:stats,matches:matches,normal:normal,snapshot:snapshot,storageKey:key};
 }
 // A revealed card stays revealed on resume. Only a typed match made before
 // that reveal can be recorded as a checked answer.
 function bindReview(session, id, matches, save, advance){
  var input=document.getElementById("kr-input"),reveal=document.getElementById("kr-reveal");
  var result=document.getElementById("kr-result"),again=document.getElementById("kr-again");
  var good=document.getElementById("kr-good"),reviewed=document.getElementById("kr-reviewed");
  var graded=false;
  if(input){
   input.value=session.draftId===id?session.draft||"":"";
   input.oninput=function(){session.draftId=id;session.draft=input.value;save();};
   input.onkeydown=function(event){if(event.key==="Enter"&&session.phase!=="back"){event.preventDefault();reveal.click();}};
  }
  function grade(outcome){
   if(graded||session.phase!=="back")return;
   graded=true;
   advance(outcome);
  }
  function showAnswer(fresh){
   var typed=input?input.value.trim():"",matched=Boolean(typed&&matches(typed));
   reveal.hidden=true;result.hidden=false;
   if(input)input.readOnly=true;
   var comparison=document.getElementById("kr-comparison");
   var message=typed?(matched?"Your entry matches an accepted answer.":"Compare your wording with the expected answer."):"The answer has been revealed.";
   if(matched&&root.KeystoneFeedback){
    comparison.innerHTML=root.KeystoneFeedback.markup("correct",{key:session.complete,animate:fresh})+" "+message;
   }else comparison.textContent=message;
   good.textContent=matched?"Record typed match":"I recalled it before revealing";
   good.onclick=function(){grade(matched?"matched":"self-rated");};
   (matched?good:again).focus();
  }
  reveal.onclick=function(){
   if(graded||session.phase==="back")return;
   session.draftId=id;session.draft=input?input.value:"";session.phase="back";save();showAnswer(true);
  };
  again.onclick=function(){grade("again");};
  reviewed.onclick=function(){grade("revealed");};
  if(session.phase==="back")showAnswer(false);else (input||reveal).focus();
 }
 function recordReview(session, engine, outcome){
  if(session.phase!=="back"||!session.queue.length)return;
  var id=session.queue.shift(),known=outcome==="matched"||outcome==="self-rated";
  engine.mark(id,known,undefined,outcome);
  if(session.first[id]===undefined){
   session.first[id]=known;
   (session.firstEvidence ||= {})[id]=outcome;
  }
  if(outcome==="again"){session.queue.push(id);if(session.attempts)session.attempts[id]=(session.attempts[id]||0)+1;}
  else session.complete++;
  session.phase="front";delete session.draft;delete session.draftId;
 }
 function firstReviewText(session){
  var counts={"matched":0,"self-rated":0,"revealed":0,"again":0,"earlier":0};
  Object.keys(session.first).forEach(function(id){
   var outcome=session.firstEvidence?.[id];
   counts[Object.hasOwn(counts,outcome)?outcome:"earlier"]++;
  });
  var labels={matched:["typed match","typed matches"],"self-rated":["self-reported recall","self-reported recalls"],revealed:["reviewed after revealing"],again:["marked for another try"],earlier:["earlier rating","earlier ratings"]};
  return "First review of each card · "+Object.keys(counts).filter(key=>counts[key]).map(key=>counts[key]+" "+(labels[key][Number(counts[key]!==1)]||labels[key][0])).join(" · ")+".";
 }
 root.KeystoneReview={open:open,bindReview:bindReview,recordReview:recordReview,firstReviewText:firstReviewText,VERSION:1};
})(window);

/* F170 2.1.4: guided examples followed by independent decisions and feedback. */
(function(){
"use strict";

const activities = new Map();
const sectionRoute = "catchup/f170/2.1.4";
const returnLabels = {
 "challenge/f170": "F170 overview",
 "challenge/f170/build": "Build understanding",
 "skills/f170": "F170 skills practice",
 [sectionRoute]: "Transplants and artificial organs"
};
const esc = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]);
const option = (value, label) => ({value, label});

function render(activity, origin){
 const back = Object.hasOwn(returnLabels, origin) ? origin : "challenge/f170";
 return '<div class="k-wrap k-question-view" data-transplant-activity><p class="crumb"><a href="#'+back+'">← '+returnLabels[back]+'</a></p>'+
  '<div class="k-compact-hero"><div class="k-eyebrow">F170 · 2.1.4 Transplants and artificial organs</div><h1>'+esc(activity.title)+'</h1><p>'+esc(activity.description)+'</p></div>'+
  '<section class="paper panel hb-transplant-case" data-transplant-case></section></div>';
}
function fieldHTML(field){
 const {id, label, type, options, required = true} = field;
 if(type === "number"){
  return '<label class="k-field" for="transplant-'+id+'">'+esc(label)+'</label><input id="transplant-'+id+'" name="'+id+'" class="typed" type="number" inputmode="numeric"'+(required?' required':'')+'>';
 }
 return '<fieldset><legend>'+esc(label)+'</legend><div class="k-options">'+options.map(o=>
  '<label class="k-option"><input type="'+type+'" name="'+id+'" value="'+esc(o.value)+'"'+(required&&type==="radio"?' required':'')+'><span>'+esc(o.label)+'</span></label>'
 ).join("")+'</div></fieldset>';
}
function mount(main, activity){
 const panel = main.querySelector("[data-transplant-case]");
 let caseIndex = 0, stepIndex = 0, results = [];

 function showCase(focus){
  const current = activity.cases[caseIndex];
  panel.innerHTML = '<h2 tabindex="-1">'+esc(current.title)+'</h2>'+(current.intro?'<p>'+esc(current.intro)+'</p>':'')+
   (typeof current.evidence === "function" ? current.evidence() : current.evidence || "")+'<div data-transplant-step></div>';
  showStep(false);
  if(focus)panel.querySelector("h2").focus();
 }
 function showStep(focus){
  const current = activity.cases[caseIndex], step = current.steps[stepIndex];
  const lastStep = stepIndex === current.steps.length - 1;
  const lastCase = caseIndex === activity.cases.length - 1;
  const nextLabel = lastStep ? (lastCase ? "Finish activity" : "Continue to "+activity.cases[caseIndex+1].title.split(" · ")[0]) : "Next question";
  const area = panel.querySelector("[data-transplant-step]");
  area.innerHTML = '<p class="k-question-meta">Question '+(stepIndex+1)+' of '+current.steps.length+'</p>'+
   '<h3 tabindex="-1">'+esc(step.title)+'</h3><p>'+esc(step.prompt)+'</p>'+
   '<form class="hb-transplant-form">'+step.fields.map(field=>'<div>'+fieldHTML(field)+'</div>').join("")+
   '<div class="k-feedback" data-transplant-feedback hidden></div><div class="actions">'+
   '<button type="submit" class="button primary">Check answer</button>'+
   '<button type="button" class="button secondary" data-transplant-model hidden>Show model answer</button>'+
   '<button type="button" class="button primary" data-transplant-next hidden>'+esc(nextLabel)+'</button></div></form>';
  const form = area.querySelector("form");
  const check = form.querySelector('[type="submit"]');
  const reveal = form.querySelector("[data-transplant-model]");
  const next = form.querySelector("[data-transplant-next]");
  const feedback = form.querySelector("[data-transplant-feedback]");
  let result;

  function showFeedback(revealed){
   const finished = result.correct || revealed;
   feedback.classList.toggle("incorrect", !finished);
   feedback.classList.toggle("pending", revealed);
   const model = finished && result.model ? [result.model].flat() : [];
   feedback.innerHTML = '<h4 class="k-feedback-head" tabindex="-1" aria-describedby="transplant-feedback-text">'+
    (result.correct ? "Correct" : revealed ? "Model answer" : "Review and try again")+'</h4>'+
    '<p id="transplant-feedback-text">'+esc(result.feedback)+'</p>'+
    model.map(entry=>'<p>'+esc(entry)+'</p>').join("");
   feedback.hidden = false;
   check.hidden = finished;
   check.textContent = "Check revised answer";
   reveal.hidden = finished || !result.model;
   next.hidden = !finished;
   if(finished){
    results[stepIndex] = result.correct;
    form.querySelectorAll("input").forEach(control=>{control.disabled = true;});
   }
   feedback.querySelector("h4").focus();
  }
  form.addEventListener("submit", event=>{
   event.preventDefault();
   if(!next.hidden)return;
   const data = new FormData(form);
   const values = Object.fromEntries(step.fields.map(({id,type})=>[id, type === "checkbox" ? data.getAll(id) : data.get(id)]));
   result = step.check(values, results);
   showFeedback(false);
  });
  reveal.addEventListener("click", ()=>showFeedback(true));
  next.addEventListener("click", ()=>{
   if(lastCase && lastStep){
    panel.innerHTML = '<h2 tabindex="-1">Activity complete</h2>'+(activity.summary?'<p>'+esc(activity.summary(results))+'</p>':'')+
     '<div class="actions"><button class="button secondary" type="button">Try again</button><a class="button primary" href="#'+sectionRoute+'">Return to transplants and artificial organs</a></div>';
    panel.querySelector("button").addEventListener("click", ()=>{caseIndex = 0;stepIndex = 0;results = [];showCase(true);});
    panel.querySelector("h2").focus();
   }else if(lastStep){
    caseIndex++;stepIndex = 0;results = [];showCase(true);
   }else{
    stepIndex++;showStep(true);
   }
  });
  if(focus)area.querySelector("h3").focus();
 }
 showCase(false);
}

const graph = {
 times: [2,4,6,8], values: [280,205,150,115], xLabel: "Days after transplant",
 yLabel: "Blood creatinine concentration (µmol/L)", yLines: ["Blood creatinine", "concentration (µmol/L)"],
 scaleMax: 320, pointLabels: true, caption: "Patient A · Plotted blood creatinine values"
};
const readings = [option("260", "260 µmol/L on day 3"), option("150", "150 µmol/L on day 7"),
 option("110", "110 µmol/L on day 14"), option("190", "190 µmol/L on day 21")];
const descriptionA = "Blood creatinine fell from 280 to 115 µmol/L between days 2 and 8.";
const descriptionB = "Blood creatinine fell from 260 to 110 µmol/L between days 3 and 14, then rose to 190 µmol/L by day 21.";
const limitedConclusion = "The rise is consistent with poorer clearance. Rejection is one possible cause, but the creatinine measurements alone cannot establish the cause.";
const rejectionChain = "The recipient’s immune system recognises donor antigens as foreign. The immune response damages donor kidney tissue, so the kidney removes less creatinine from the blood.";

const kidney = {
 id: "kidney-evidence",
 title: "Interpreting kidney transplant data",
 description: "Creatinine is a waste product that the kidneys remove from the blood.",
 cases: [{
  title: "Patient A · Guided graph",
  intro: "These are fictional teaching data from one patient after a kidney transplant.",
  evidence: ()=>window.KeystoneHumanSkills.graphHTML(graph),
  steps: [{
   title: "Read the graph",
   prompt: "What was the blood creatinine concentration on day 2 and on day 8?",
   fields: [{id:"day2",label:"Day 2 (µmol/L)",type:"number"},{id:"day8",label:"Day 8 (µmol/L)",type:"number"}],
   check({day2,day8}){
    const correct = Number(day2) === 280 && Number(day8) === 115;
    return {correct,feedback:correct?"You read both points correctly.":"Find each day on the horizontal axis and follow it up to its plotted point.",model:"The concentration was 280 µmol/L on day 2 and 115 µmol/L on day 8."};
   }
  },{
   title: "Describe the change",
   prompt: "Which sentence describes the change in blood creatinine using both readings?",
   fields: [{id:"trend",label:"Description",type:"radio",options:[option("rose","Blood creatinine rose from 115 to 280 µmol/L between days 2 and 8."),option("fell",descriptionA),option("different","Blood creatinine was different on the two days.")]}],
   check({trend}){
    const correct = trend === "fell";
    return {correct,feedback:correct?"You gave the direction, both concentrations and the time period.":"Read the points in time order. Give the direction of change and both readings, with units.",model:descriptionA};
   }
  },{
   title: "Interpret the change",
   prompt: "What does the fall suggest about the donor kidney?",
   fields: [{id:"interpretation",label:"Interpretation",type:"radio",options:[option("normal","The donor kidney had returned to normal."),option("less","The donor kidney was clearing creatinine less effectively."),option("more","The donor kidney was clearing creatinine more effectively.")]}],
   check({interpretation}){
    const correct = interpretation === "more";
    const feedback = correct ? "The falling concentration is consistent with more effective clearance." : interpretation === "normal" ? "The graph shows a falling trend. It gives no normal reference range, so it cannot tell us whether the kidney had returned to normal." : "The amount of creatinine per litre of blood fell. Think about what that suggests about its removal.";
    return {correct,feedback,model:"It suggests the donor kidney was clearing creatinine from the blood more effectively."};
   }
  }]
 },{
  title: "Patient B · Independent table",
  intro: "These are fictional teaching data from a different patient after a kidney transplant.",
  evidence: '<div class="k-skill-graph"><table><caption>Patient B · Blood creatinine after transplant</caption><thead><tr><th scope="col">Days after transplant</th><th scope="col">Blood creatinine concentration (µmol/L)</th></tr></thead><tbody>'+
   [[3,260],[7,150],[14,110],[21,190]].map(([day,value])=>'<tr><th scope="row">'+day+'</th><td>'+value+'</td></tr>').join("")+'</tbody></table></div>',
  steps: [{
   title: "Describe the whole period",
   prompt: "Describe how blood creatinine changed over the whole period. Use data.",
   fields: [{id:"pattern",label:"Pattern over the whole period",type:"radio",options:[option("fall","It fell overall."),option("rise-fall","It rose, then fell."),option("fall-rise","It fell, then rose.")]},
    ...[3,14,21].map(day=>({id:"day"+day,label:"Day "+day+" (µmol/L)",type:"number",required:false}))],
   check({pattern,day3,day14,day21}){
    const correct = pattern === "fall-rise" && Number(day3) === 260 && Number(day14) === 110 && Number(day21) === 190;
    const feedback = correct ? "You captured both parts of the trend and supported them with data." : pattern === "fall" ? "The final reading is lower than the first. Compare days 14 and 21. What happens between those readings?" : pattern !== "fall-rise" ? "Compare days 3 and 14, then days 14 and 21. Check the direction of change in each interval." : "You identified both directions of change. Check the concentration in each row you used.";
    return {correct,feedback,model:descriptionB};
   }
  },{
   title: "Select the evidence",
   prompt: "Which two readings provide evidence that the donor kidney may have been clearing creatinine less effectively?",
   fields: [{id:"readings",label:"Select two readings",type:"checkbox",options:readings}],
   check({readings:selected}){
    const correct = selected.length === 2 && selected.includes("110") && selected.includes("190");
    const feedback = correct ? "Evidence selection correct. You identified the rise from day 14 to day 21." : selected.length !== 2 ? "Select exactly two readings to show the rise." : "Look for the interval over which creatinine increased. Select one reading at each end of that interval.";
    return {correct,feedback,model:"110 µmol/L on day 14 and 190 µmol/L on day 21."};
   }
  },{
   title: "Judge the claim",
   prompt: "A pupil says, ‘The rise proves the kidney was being rejected.’ How well does the evidence support that claim?",
   fields: [{id:"claim",label:"Conclusion",type:"radio",options:[option("proved","The rise proves rejection was occurring."),option("possible","It suggests poorer clearance. Rejection is possible, but the cause is uncertain."),option("ruled-out","The rise rules out rejection."),option("no-change","The readings give no evidence of a change in clearance.")]}],
   check({claim}, results){
    const correct = claim === "possible";
    const credited = results[1] ? "You identified the rise correctly. " : "Creatinine rose from day 14 to day 21. ";
    const feedback = correct ? "You distinguished the change in clearance from its possible cause." : claim === "proved" ? credited+"The table measures creatinine. Which result directly shows an immune attack on the kidney?" : claim === "ruled-out" ? credited+"These readings cannot rule rejection in or out. What do they directly measure?" : "Compare the last two readings. A rise in the concentration can provide evidence of less effective clearance.";
    return {correct,feedback,model:limitedConclusion};
   }
  },{
   title: "Explain a possible mechanism",
   prompt: "If rejection were occurring, how could it explain the rise?",
   fields: [{id:"recognition",label:"What starts the immune response?",type:"radio",options:[option("waste","The donor kidney recognises creatinine as foreign."),option("antigens","The recipient’s immune system recognises donor antigens as foreign."),option("donor","The donor kidney identifies the recipient’s urine as foreign.")]},
    {id:"effect",label:"What does the immune response do?",type:"radio",options:[option("concentration","It produces creatinine directly."),option("protects","It protects the kidney tissue from damage."),option("damage","It damages donor kidney tissue.")]},
    {id:"clearance",label:"What happens to creatinine removal?",type:"radio",options:[option("less","The kidney removes less creatinine from the blood."),option("more","The kidney removes more creatinine from the blood."),option("same","The kidney removes just as much creatinine as before.")]}],
   check({recognition,effect,clearance}){
    const correct = recognition === "antigens" && effect === "damage" && clearance === "less";
    const feedback = correct ? "You linked immune recognition to tissue damage and reduced clearance." : recognition !== "antigens" ? "Start with the recipient’s immune system. What does it recognise on donor tissue?" : effect !== "damage" ? "Work out what an immune attack does to the donor kidney tissue." : "Consider how tissue damage would affect the amount of creatinine the kidney removes.";
    return {correct,feedback,model:rejectionChain};
   }
  }]
 }],
 summary(results){
  return "Patient B evidence selection: "+(results[1]?"correct":"model reviewed")+". Conclusion: "+(results[2]?"correct":"model reviewed")+".";
 }
};

window.KeystoneTransplantActivities = {
 register(activity){activities.set(activity.id, activity);},
 get(id){return activities.get(id);},
 render,
 mount
};
window.KeystoneTransplantActivities.register(kidney);
})();

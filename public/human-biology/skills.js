/* Original, seeded practice families. OCR v8 Appendix D / HSW, F170/F171 only.
   Generated tasks use the existing challenge checker, hints and local progress.
   Numeric variants are finite; reasoning contexts are curated and rotate. */
(function(){
"use strict";
var definitions=[
 ["units","f170",1,"1.1.2","Microscope units","Convert mm, µm and nm before calculating.","M0.1, M1.4"],
 ["magnification","f170",1,"1.1.2","Magnification and actual size","Choose the equation, convert units and rearrange.","M2.2"],
 ["division","f170",1,"1.1.5","Percentages of dividing cells","Find a percentage or work backwards to a cell count.","M0.3; F170 sample style"],
 ["ventilation","f170",2,"2.2.3","Pulmonary ventilation","Use breathing rate and tidal volume, including litre conversions.","M2.3, M2.4"],
 ["growth","f170",4,"4.1.4","Bacterial growth","Use doubling, generations and the time for each division.","M0.5, M2.5"],
 ["genetics","f170",1,"1.1.5","Inheritance probabilities","Use parental genotypes, then interpret conditional information.","M1.3"],
 ["uncertainty","f170",1,"1.1.2","Measurement uncertainty","Use stated uncertainties; distinguish one reading from a difference.","M1.5"],
 ["cardiac","f171",2,"2.2","Cardiac output","Apply a supplied equation and compare changes in circulation.","M3.3"],
 ["percentage","f171",5,"5.1.2","Percentage change","Keep the starting value as the denominator, including decreases.","M0.3"],
 ["averages","f171",4,"4.2.1","Means, medians and repeat readings","Calculate summaries and distinguish the purpose of repeats.","M1.2"],
 ["graph","f171",5,"5.2","Read a graph","Read axes and values, then compare groups and changes.","M1.6, M3.1"],
 ["rate","f171",3,"3.2.2","Rates from graphs","Calculate change over time using a labelled graph.","M3.5"],
 ["variables","f171",5,"5.2","Practical design","Identify variables, controls, fair comparisons and useful repeats.","HSW3, HSW4, HSW6"],
 ["evidence","f171",5,"5.2","Evaluate evidence","Distinguish association, causation, sample limitations and conclusions.","HSW5, HSW6"]
].map(function(d){return {id:d[0],unit:d[1],area:d[2],section:d[3],name:d[4],description:d[5],reference:d[6]};});
function get(id){return definitions.filter(function(s){return s.id===id;})[0];}
function random(seed){var n=seed>>>0;return function(){n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};}
function round(n){return Math.round(n*1e6)/1e6;}
function fmt(n){return String(round(n));}
function number(stem,a,unit,explain,wrong){return {type:"number",stem:stem,correct:round(a),answerUnit:unit,model:fmt(a)+(unit?" "+unit:""),explain:explain,slips:wrong||[],tolerance:1e-6};}
function choice(stem,options,explain,misconception){return {type:"single",stem:stem,options:options,correct:0,model:options[0],explain:explain,misconception:misconception};}
var practicals=[
 {context:"A culture study changes glucose concentration and measures bacterial cell number after six hours.",iv:"Glucose concentration",dv:"Bacterial cell number after six hours",control:"Incubation temperature",why:"Temperature also affects bacterial growth."},
 {context:"An investigation changes disinfectant concentration and measures the number of surviving bacteria after five minutes.",iv:"Disinfectant concentration",dv:"Number of surviving bacteria",control:"Contact time",why:"Longer contact could kill more bacteria independently of concentration."},
 {context:"A study changes exercise duration and measures heart rate immediately afterwards.",iv:"Exercise duration",dv:"Heart rate immediately afterwards",control:"Exercise intensity",why:"Exercise intensity can change heart rate independently of duration."},
 {context:"A membrane study changes temperature and measures the mass change of identical tissue samples after ten minutes.",iv:"Temperature",dv:"Mass change after ten minutes",control:"External solution concentration",why:"Solution concentration also affects the movement of water."},
 {context:"An investigation changes antibiotic concentration and measures the diameter of the inhibition zone after 24 hours.",iv:"Antibiotic concentration",dv:"Inhibition-zone diameter after 24 hours",control:"Bacterial species",why:"Different species can have different sensitivities to the same antibiotic."},
 {context:"A culture investigation changes pH and measures bacterial population size after four hours.",iv:"pH",dv:"Bacterial population size after four hours",control:"Initial bacterial population size",why:"Starting with more bacteria could produce a larger final population without a pH effect."}
];
function generate(id,level,seed){
 var sk=get(id);if(!sk)throw new Error("Unknown Human Biology skill");
 level=Math.max(1,Math.min(4,level||1));var rng=random(seed),pick=function(a){return a[Math.floor(rng()*a.length)];},int=function(a,b){return a+Math.floor(rng()*(b-a+1));};
 var q,a,b,n,out,why,unit;
 if(id==="units"){
  var pairs=level<3?[["mm","µm",1000],["µm","nm",1000]]:[["µm","mm",.001],["nm","µm",.001],["nm","mm",.000001]];
  var p=pick(pairs);a=level<3?int(1,90)/10:int(10,900)*10;out=a*p[2];
  q=number("Convert "+fmt(a)+" "+p[0]+" to "+p[1]+".",out,p[1],"1 mm = 1000 µm; 1 µm = 1000 nm. "+fmt(a)+" × "+p[2]+" = "+fmt(out)+" "+p[1]+".",[a/p[2],a*100,a/100]);
  q.misconception="Check whether the answer needs more smaller units or fewer larger units.";
 }else if(id==="magnification"){
  a=int(2,35)*2;b=pick([100,200,400,500,1000]);n=a*b/1000;
  if(level<3)q=number("A cell is "+a+" µm long. Its image is "+fmt(n)+" mm long. Calculate magnification.",b,"×","Convert image length: "+fmt(n)+" mm = "+(n*1000)+" µm. Magnification = image ÷ actual = "+(n*1000)+" ÷ "+a+" = "+b+".",[n/a,a/n,b/1000]);
  else q=number("An image is "+fmt(n)+" mm long at ×"+b+" magnification. Calculate actual cell length in "+(level===4?"nm":"µm")+".",a*(level===4?1000:1),level===4?"nm":"µm","Actual length = image length ÷ magnification. "+fmt(n)+" × 1000 ÷ "+b+" = "+a+" µm"+(level===4?" = "+a*1000+" nm.":"."),[n*b,n/b,a/1000]);
  q.hintCue="Put the image and actual length in the same unit before using magnification = image ÷ actual.";
 }else if(id==="division"){
  a=pick([100,200,400,500]);b=int(2,16)*5;n=a*b/100;
  q=level<3?number(n+" of "+a+" cells are in mitosis. What percentage are dividing?",b,"%","Dividing ÷ total × 100 = "+n+" ÷ "+a+" × 100 = "+b+"%.",[n/(a-n)*100,n/a,n]):number(b+"% of "+a+" cells are in mitosis. How many "+(level===4?"are not":"are")+" in mitosis?",level===4?a-n:n,"cells",b+" ÷ 100 × "+a+" = "+n+" dividing cells."+(level===4?" Not dividing = "+a+" − "+n+" = "+(a-n)+".":""),[b,a,n]);
 }else if(id==="ventilation"||id==="cardiac"){
  var vent=id==="ventilation";a=vent?int(10,25):pick([60,70,80,90,100,120]);b=vent?int(4,10)*100:pick([50,60,70,80,90]);out=a*b;
  var equation=vent?"Ventilation = breathing rate × tidal volume.":"Cardiac output = heart rate × stroke volume.";
  var given=vent?"Breathing rate is "+a+" breaths/min; tidal volume is "+b+" cm³.":"Heart rate is "+a+" beats/min; stroke volume is "+b+" cm³/beat.";
  if(level<3)q=number(given+" Calculate "+(vent?"ventilation":"cardiac output")+" in "+(level===1?"cm³/min":"L/min")+". "+equation,level===1?out:out/1000,level===1?"cm³/min":"L/min",equation+" "+a+" × "+b+" = "+out+" cm³/min = "+fmt(out/1000)+" L/min.",[a+b,out/100,out*1000]);
  else q=number((vent?"Ventilation":"Cardiac output")+" is "+fmt(out/1000)+" L/min. "+(vent?"Breathing":"Heart")+" rate is "+a+(vent?" breaths/min.":" beats/min.")+" Find "+(vent?"tidal":"stroke")+" volume in cm³. "+equation,b,"cm³",fmt(out/1000)+" L/min = "+out+" cm³/min. Volume = "+out+" ÷ "+a+" = "+b+" cm³.",[out*a,out/1000/a,out]);
 }else if(id==="growth"){
  a=pick([20,40,50,100,200]);b=int(2,level<3?5:8);n=pick([15,20,30,40]);out=a*Math.pow(2,b);
  q=level<3?number("A culture starts with "+a+" bacteria and doubles every generation. How many after "+b+" generations?",out,"bacteria","Final number = initial number × 2ⁿ = "+a+" × 2^"+b+" = "+out+".",[a*2*b,a+b,a*Math.pow(2,b-1)]):number("A culture starts with "+a+" bacteria and doubles every "+n+" minutes. How many after "+b*n+" minutes? Assume uninterrupted exponential growth.",out,"bacteria","Generations = "+b*n+" ÷ "+n+" = "+b+". Final number = "+a+" × 2^"+b+" = "+out+".",[a*2*b,a*b,a*Math.pow(2,b-1)]);
  q.hintCue="Find how many doublings occur, then multiply the starting population by 2 for each doubling.";
 }else if(id==="genetics"){
  var crosses=[["Rr","Rr",.25,.5],["Rr","rr",.5,.5],["RR","rr",0,1],["RR","Rr",0,.5]],cross=pick(level===4?[crosses[0]]:crosses),kind=pick(["rr","Rr"]),prob=kind==="rr"?cross[2]:cross[3];
  var stem="R is completely dominant to r. Parents are "+cross[0]+" × "+cross[1]+". ";
  if(level===4){stem+="Given a child has the dominant phenotype, what is the probability they are Rr? Give a percentage to 1 decimal place.";prob=2/3;out=66.7;why="Rr × Rr gives RR, Rr, Rr and rr. Exclude rr because the child has the dominant phenotype. Two of the three remaining outcomes are Rr: 2/3 = 66.7%.";}
  else{stem+="What percentage of children are expected to be "+kind+"?";out=prob*100;why="List one allele from each parent in each Punnett-square outcome. "+(cross[0]==="Rr"&&cross[1]==="Rr"?"The four equally likely outcomes are RR, Rr, Rr and rr. ":cross[0]==="Rr"?"The equally likely outcomes are Rr and rr. ":cross[1]==="rr"?"All offspring are Rr. ":"Half of offspring are RR and half are Rr. ")+out+"% are "+kind+".";}
  q=number(stem,out,"%",why,[25,50,75]);q.tolerance=level===4?.05:1e-6;q.hintCue="Use the parental gametes; if extra information rules out an outcome, remove it before finding the proportion.";
 }else if(id==="uncertainty"){
  a=pick([10,20,25,40,50,80]);b=pick([.1,.2,.5]);n=level<3?1:2;out=b*n/a*100;
  q=number((n===1?"A length is "+a+" mm, with stated absolute uncertainty ±"+b+" mm.":"A length of "+a+" mm is found by subtracting two readings, each with stated uncertainty ±"+b+" mm. Add the absolute uncertainties.")+" Calculate percentage uncertainty.",out,"%","Absolute uncertainty = "+n+" × "+b+" = "+fmt(n*b)+" mm. Percentage uncertainty = "+fmt(n*b)+" ÷ "+a+" × 100 = "+fmt(out)+"%.",[b/a*100,a/b,b/a]);
  q.hintCue="First decide whether one stated uncertainty or the sum of two stated uncertainties applies.";
 }else if(id==="percentage"){
  a=int(10,80)*10;b=pick([10,20,25,40,50]);n=level<3?1:pick([-1,1]);out=a*(1+n*b/100);
  q=number("A study count changes from "+a+" to "+fmt(out)+". Calculate the percentage change, using a minus sign for a decrease.",n*b,"%","(Final − initial) ÷ initial × 100 = ("+fmt(out)+" − "+a+") ÷ "+a+" × 100 = "+n*b+"%.",[(out-a)/out*100,out-a,out/a*100]);
  q.hintCue="Calculate the change first; divide by the starting value, then multiply by 100.";
 }else if(id==="averages"){
  a=int(10,30);b=int(2,6);var values=[a-b,a,a+b];
  if(level===4){values=[a-b,a,a,a+b,a+5*b];q=number("Study measurements are "+values.join(", ")+" arbitrary units. Find the median.",a,"arbitrary units","Put the values in order. The middle of five readings is the third reading: "+a+". A median is not the sum divided by five.",[values.reduce(function(x,y){return x+y;},0)/5,5,a+5*b]);}
  else q=number("Three separate samples give measurements of "+values.join(", ")+" arbitrary units. Calculate the mean.",a,"arbitrary units","Mean = ("+values.join(" + ")+") ÷ 3 = "+a+". Averaging describes these readings; it does not remove systematic error.",[a*3,a/3,b]);
 }else if(id==="graph"||id==="rate"){
  a=int(2,8)*10;b=int(1,4)*10;n=pick([2,4,5,10]);var vals=[a,a+b,a+3*b],times=[0,n,2*n];
  q=number(id==="rate"?"Use the graph: calculate mean rate of increase from "+n+" to "+2*n+" days.":level<3?"Use the graph: what is the response at "+n+" days?":"Use the graph: how much does the response increase between "+n+" and "+2*n+" days?",id==="rate"?2*b/n:level<3?a+b:2*b,id==="rate"?"arbitrary units/day":"arbitrary units",id==="rate"?"Mean rate = change in response ÷ change in time = ("+(a+3*b)+" − "+(a+b)+") ÷ ("+2*n+" − "+n+") = "+fmt(2*b/n)+" arbitrary units/day.":level<3?"Read the response on the vertical axis at "+n+" days: "+(a+b)+" arbitrary units.":"Final − initial = "+(a+3*b)+" − "+(a+b)+" = "+2*b+" arbitrary units.",[a+3*b,2*b,3*b]);
  q.graph={times:times,values:vals,xLabel:"Time / days",yLabel:"Antibody response / arbitrary units"};
  q.hintCue=id==="rate"?"Read the two response values. A rate uses the difference in response divided by the difference in time.":"Find the time on the horizontal axis, move to the plotted line, then read the vertical axis.";
 }else if(id==="variables"){
  var p=pick(practicals),mode=level===1?0:level===2?1:level===3?2:3;
  if(mode===0)q=choice(p.context+" Which is the independent variable?",[p.iv,p.dv,p.control,"The number of repeats"],"The independent variable is deliberately changed: "+p.iv+".","The measured result is the dependent variable.");
  else if(mode===1)q=choice(p.context+" Which is the dependent variable?",[p.dv,p.iv,p.control,"The hypothesis"],"The dependent variable is the measured result: "+p.dv+".","What is changed and what is measured are different roles.");
  else if(mode===2)q=choice(p.context+" Which should be controlled for a fair comparison?",[p.control,p.iv,p.dv,"The conclusion"],p.why,"Do not keep the independent variable constant across the different conditions.");
  else q=choice(p.context+" Which change best tests reproducibility?",["An independent team repeats the study using an appropriate comparable method","The same person rereads the same recorded value","The original results are copied into a new table","The original team removes results that disagree"],"Reproducibility concerns consistent findings with a different investigator or method. Repeated measurements by the same team assess repeatability.","Copying data or selectively deleting results is not replication.");
 }else if(id==="evidence"){
  a=int(20,70);b=int(5,15);n=int(40,150)*10;
  var contexts=["exercise frequency and heart health","smoking exposure and lung disease","sleep duration and self-reported tiredness","dietary fibre intake and bowel health","age and vaccine antibody response","air pollution exposure and respiratory symptoms"];
  var context=pick(contexts);
  if(level<3)q=choice("An observational study of "+n+" adults finds an association between "+context+". Which conclusion is justified?",["The measured variables are associated; this alone does not establish causation","The first variable definitely causes the second","Confounding variables cannot explain the association","Every individual follows the same pattern"],"Observational associations may reflect confounding or other explanations. A larger sample alone does not establish cause.","Association and causation are different claims.");
  else if(level===3)q=choice("A study of "+context+" recruits "+n+" volunteers from one sports club. What limits generalisation?",["The sample may not represent the wider population","The sample guarantees a causal conclusion","Volunteering removes all selection bias","A large sample always represents everyone"],"Recruiting from one club may select people with shared characteristics. Sample size does not fix a biased sampling method.","A representative sample matters as well as the number of participants.");
  else q=choice("A trial reports recovery in "+a+"% of a treatment group and "+(a-b)+"% of a control group. Which extra information best helps judge the difference?",["Group sizes and uncertainty around each estimate","Only the name of the treatment","Only the colours used on the chart","Only the order of the results in the report"],"Sample size and uncertainty help judge how consistent the data are with a real difference. Percentages alone do not establish statistical significance.","A numerical difference does not by itself demonstrate a reliable treatment effect.");
 }
 if(!q)throw new Error("Missing generator");
 q.id="skill-"+id+"-"+level+"-"+(seed>>>0);q.skillId=id;q.unit=sk.unit;q.area=sk.area;q.section=sk.section;
 q.level=["","warmup","core","apply","stretch"][level];q.skillLevel=level;q.generatedSeed=seed>>>0;
 q.hintCue=q.hintCue||"Identify what is given and what is needed. Check the worked example for the same method.";
 q.misconception=q.misconception||"Check the denominator, conversion or equation before calculating.";
 if(level===1&&q.type==="number"){
  var answer=fmt(q.correct),opts=[q.correct].concat(q.slips||[]).map(round).filter(function(x,i,arr){return isFinite(x)&&arr.indexOf(x)===i;});
  [q.correct*10,q.correct/10,q.correct*100,q.correct/100,1,10].forEach(function(x){x=round(x);if(opts.indexOf(x)<0)opts.push(x);});
  q.numericAnswer=q.correct;q.type="single";q.options=opts.slice(0,4).map(function(x){return fmt(x)+(q.answerUnit?" "+q.answerUnit:"");});q.correct=0;
 }
 return q;
}
function esc(s){return String(s).replace(/[&<>"']/g,function(x){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x];});}
function graphHTML(g){
 if(!g)return "";var max=Math.ceil(Math.max.apply(null,g.values)/40)*40,top=32,bottom=248,left=78,right=430,step=max/4;
 function y(v){return bottom-v/max*(bottom-top);}function x(i){return left+(g.times[i]-g.times[0])/(g.times[g.times.length-1]-g.times[0])*(right-left);}
 var h='<figure class="k-skill-graph"><svg viewBox="0 0 480 320" role="img" aria-label="'+esc(g.yLabel+' against '+g.xLabel+'. The following table gives the plotted values.')+'">';
 for(var i=0;i<=4;i++){var v=step*i;h+='<path d="M'+left+' '+y(v)+'H'+right+'" stroke="#ddd"/><text x="68" y="'+(y(v)+5)+'" text-anchor="end">'+fmt(v)+'</text>';}
 h+='<path d="M'+left+' '+top+'V'+bottom+'H'+right+'" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="'+g.values.map(function(v,i){return x(i)+','+y(v);}).join(' ')+'" fill="none" stroke="#14796f" stroke-width="3"/>';
 g.values.forEach(function(v,i){h+='<circle cx="'+x(i)+'" cy="'+y(v)+'" r="5" fill="#14796f"/><text x="'+x(i)+'" y="275" text-anchor="middle">'+g.times[i]+'</text>';});
 h+='<text x="254" y="305" text-anchor="middle">'+esc(g.xLabel)+'</text><text transform="translate(22 145) rotate(-90)" text-anchor="middle">'+esc(g.yLabel)+'</text></svg><details><summary>Graph values in a table</summary><table><caption>Antibody-response data</caption><thead><tr><th scope="col">'+esc(g.xLabel)+'</th><th scope="col">'+esc(g.yLabel)+'</th></tr></thead><tbody>'+g.values.map(function(v,i){return '<tr><th scope="row">'+g.times[i]+'</th><td>'+v+'</td></tr>';}).join('')+'</tbody></table></details></figure>';
 return h;
}
window.KeystoneHumanSkills={definitions:definitions,get:get,generate:generate,graphHTML:graphHTML,version:1};
})();

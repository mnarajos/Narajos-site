/* Keystone Human Biology companion: independent, original, concise science
   recaps. No coursework templates, NEA marking, AI, or uploaded answers. */
(function(){
"use strict";
var root=window.KeystoneHumanData,bank=window.KeystoneHumanChallenges,other=window.KeystoneHumanKnowledge;
if(!root||!bank||!other)return;
var notes={
  "f171": {
    "2.1": {
      "title": "Choosing a treatment",
      "lines": [
        "A cast immobilises the injured part to protect alignment while bone heals. Plaster moulds closely; fibreglass is generally lighter and more durable. A waterproof outer shell does not make the entire cast waterproof.",
        "Surgery can treat a local tumour or relieve pressure at its site. A systemic drug can reach cancer cells at several sites. Treatment decisions consider the location of disease, likely response, adverse effects, and recovery time."
      ]
    },
    "2.3": {
      "title": "Prevention and early detection",
      "lines": [
        "Reducing exposure to a risk factor aims to reduce the chance of developing disease. Screening can identify people without symptoms who may already have disease or a precursor.",
        "A screen can produce a false positive or false negative. Diagnostic follow-up helps establish whether the condition is present. Earlier detection helps when appropriate care can follow."
      ]
    },
    "4.2.1": {
      "title": "Interpreting screening and diagnostic results",
      "lines": [
        "Screening identifies people who may need further assessment. A positive screen can occur in someone who does not have the condition.",
        "Compare the screening result with an independent assessment. A false negative is a missed case and a false positive can lead to an unnecessary follow-up."
      ]
    },
    "4.2.2": {
      "title": "Taking repeat measurements for monitoring",
      "lines": [
        "Monitoring uses a series of readings to identify a change over time. Comparisons are more meaningful when devices are suitable and measurement conditions are consistent.",
        "A measurement can be repeatable but inaccurate. A missing reading is unknown, so it cannot be treated as a normal value. Consider measurement quality and access before using trends to prioritise follow-up."
      ]
    },
    "3.2.1": {
      "title": "Immune dysfunction and clinical immunology",
      "lines": [
        "Innate defences act broadly. Adaptive B and T lymphocytes make responses to particular antigens; failures and misdirected responses can cause illness.",
        "Primary immunodeficiencies generally arise from inherited or developmental problems; acquired immunodeficiencies develop later, for example through certain infections or treatments.",
        "In autoimmune disease, immune responses damage the body\u2019s own tissues. In allergy, an otherwise harmless substance triggers an inappropriate immune reaction.",
        "Transplant rejection can occur when recipient immune cells recognise donor tissue as foreign. Immunosuppression reduces this risk but can increase vulnerability to infection."
      ]
    },
    "3.2.2": {
      "title": "Vaccine types and immune memory",
      "lines": [
        "Vaccines expose the adaptive immune system to antigens, or instructions to produce them, to stimulate specific responses and immune memory without requiring the person to experience the target disease.",
        "Inactivated vaccines use killed organisms; live attenuated vaccines contain weakened organisms that can replicate; toxoid vaccines contain inactivated toxins.",
        "mRNA vaccines deliver instructions for cells to produce an antigen; viral-vector vaccines use modified viruses to deliver genetic instructions; subunit vaccines deliver selected pathogen components.",
        "A conjugate vaccine links a polysaccharide antigen to a carrier protein, often making the response stronger in young children. A booster can renew or strengthen immune protection.",
        "Protection varies by vaccine, pathogen, and recipient. Live attenuated vaccines may not be suitable for some people with severe immunosuppression."
      ]
    },
    "a1": {
      "title": "Causes and effects of disease",
      "lines": [
        "A symptom is something a patient experiences and describes. A sign is observed or measured by someone else.",
        "A disease may have infectious or non-infectious causes. Risk factors increase the chance of a condition but do not prove it will occur.",
        "When explaining disease, connect a change in tissue structure or function to its effect on the person."
      ]
    },
    "a2": {
      "title": "Treating disease",
      "lines": [
        "Preventative care reduces risk. Curative treatment aims to remove a cause; supportive treatment reduces symptoms or helps function.",
        "Different treatments have benefits, limitations, and unwanted effects. The most appropriate option depends on the condition and patient.",
        "Antibiotics act against susceptible bacteria; they do not treat influenza or other viral infections."
      ]
    },
    "a3": {
      "title": "The immune response",
      "lines": [
        "Lymphocytes recognise specific antigens. Activated B cells can develop into plasma cells that secrete antibodies.",
        "Memory lymphocytes support a more rapid specific response after later exposure to the same antigen.",
        "Vaccines can stimulate immune memory, but protection is not guaranteed to be complete or lifelong."
      ]
    },
    "a4": {
      "title": "Diagnosis and monitoring",
      "lines": [
        "A clinical measurement is useful only when the technique, instrument and conditions are appropriate.",
        "An ECG records cardiac electrical activity; peak flow measures maximum expiratory airflow; a blood-pressure cuff measures arterial pressure.",
        "A positive screening result is not always a diagnosis. Interpretation depends on the test and the clinical context."
      ]
    },
    "a5": {
      "title": "Using evidence responsibly",
      "lines": [
        "Look at numerical values, axes, units and the size of a sample before interpreting a chart.",
        "Reports should distinguish observed results from explanations or conclusions. An association does not always show cause and effect.",
        "Patient information is confidential. Use appropriate access controls and only share necessary information."
      ]
    }
  },
  "f172": {
    "a1": {
      "title": "Genetics foundations",
      "lines": [
        "DNA carries genetic information. A gene is a DNA sequence that can contribute to a functional product.",
        "Alleles are versions of a gene. Typical human body cells have paired homologous chromosomes.",
        "Genotype describes alleles; phenotype describes characteristics influenced by genotype and environment."
      ]
    },
    "a2": {
      "title": "Inheritance",
      "lines": [
        "Mitosis produces nuclei with the same chromosome number, whereas meiosis forms haploid gametes.",
        "Carrier parents may be unaffected yet have a child with a recessive condition.",
        "A Punnett square lists possible allele combinations. Each pregnancy is an independent event."
      ]
    },
    "a3": {
      "title": "Genetic testing",
      "lines": [
        "Genetic tests investigate particular variants or chromosomal changes.",
        "Test results need interpretation and may have limitations or uncertain significance.",
        "Informed consent and confidentiality matter because information can affect relatives as well as the tested person."
      ]
    },
    "a4": {
      "title": "Gene therapy",
      "lines": [
        "Somatic gene therapy changes selected body cells rather than gametes.",
        "Gene editing and gene delivery are different steps and both can have limitations.",
        "A targeted approach does not guarantee safety or that every intended cell has been changed."
      ]
    }
  },
  "f173": {
    "a1": {
      "title": "Biomedical laboratories",
      "lines": [
        "Biomedical scientists examine samples to help clinicians diagnose and monitor conditions.",
        "Correct labelling, quality control and safe handling make results more dependable.",
        "A test result supports a clinical decision; it is not always a diagnosis on its own."
      ]
    },
    "a2": {
      "title": "Cells and microscopy",
      "lines": [
        "Light microscopes can examine suitable living cells. Electron microscopes reveal finer structural details in prepared specimens.",
        "TEM reveals internal structures in thin sections; SEM shows detailed surface features.",
        "Magnification = image size ÷ actual size. Convert measurements into matching units first."
      ]
    },
    "a3": {
      "title": "Biomolecule tests",
      "lines": [
        "Different reagents detect different molecules: Biuret for peptide bonds, iodine for starch, and Benedict's for reducing sugars.",
        "Chromatography separates substances according to movement between mobile and stationary phases.",
        "Controls and consistent conditions help distinguish a real result from contamination or another influence."
      ]
    }
  },
  "f174": {
    "a1": {
      "title": "Nutrients and health",
      "lines": [
        "Carbohydrates can supply substrates for respiration; proteins provide amino acids for growth and repair; fats are important energy stores.",
        "Vitamins and minerals are needed in different amounts for particular functions.",
        "A balanced diet depends on age, activity, health, and other individual needs."
      ]
    },
    "a2": {
      "title": "Nutrition-related conditions",
      "lines": [
        "Nutrient deficiency can impair normal functions such as tissue repair, blood formation, or bone health.",
        "Dehydration occurs when water losses exceed intake. Fluid and electrolyte balance affect organ function.",
        "Avoid assuming someone's body mass alone establishes their health or nutritional status."
      ]
    },
    "a3": {
      "title": "Metabolism and hormones",
      "lines": [
        "Enzymes catalyse reactions. Digestive enzymes hydrolyse larger food molecules into absorbable products.",
        "Insulin generally lowers plasma glucose; glucagon helps raise it when appropriate.",
        "Hormonal feedback helps regulate concentrations and energy availability."
      ]
    },
    "a4": {
      "title": "Measurements and interpretation",
      "lines": [
        "BMI is mass in kilograms divided by height in metres squared.",
        "BMI can be useful for population screening but does not directly distinguish fat from muscle or diagnose health.",
        "Interpret biological measurements alongside other evidence rather than from one number."
      ]
    }
  },
  "f175": {
    "a1": {
      "title": "Conception and pregnancy",
      "lines": [
        "An oviduct is also called a Fallopian tube or uterine tube. Fertilisation usually occurs within an oviduct.",
        "After fertilisation, the early embryo divides and later implants within the uterine lining.",
        "FSH supports follicle development, while a surge in LH normally triggers ovulation."
      ]
    },
    "a2": {
      "title": "Pregnancy and antenatal care",
      "lines": [
        "The placenta supports exchange of oxygen, nutrients and wastes between maternal and fetal circulations.",
        "Maternal and fetal blood are normally separated by the placental barrier.",
        "Ultrasound uses reflected sound waves to create images for antenatal assessment."
      ]
    },
    "a3": {
      "title": "Fertility and infertility",
      "lines": [
        "Fertility depends on viable gametes, reproductive anatomy, and suitable physiology.",
        "Absent ovulation, low sperm motility or blocked oviducts can reduce the chance of fertilisation.",
        "A test result is evidence, not always proof of one particular cause of infertility."
      ]
    },
    "a4": {
      "title": "Assisted reproduction",
      "lines": [
        "In vitro fertilisation (IVF) allows sperm and oocyte to combine outside the body.",
        "An early embryo can then be transferred into the uterus; this bypasses blocked oviducts.",
        "Fertilisation and embryo transfer are separate stages. Success and suitability vary by individual circumstance."
      ]
    }
  },
  "f176": {
    "a1": {
      "title": "The nervous system",
      "lines": [
        "The brain and spinal cord form the central nervous system.",
        "The cerebellum contributes to movement coordination; the hypothalamus helps regulate homeostasis.",
        "The meninges and cerebrospinal fluid help protect and support the central nervous system."
      ]
    },
    "a2": {
      "title": "Neurones and synapses",
      "lines": [
        "Sensory neurones transmit towards the CNS; motor neurones transmit towards effectors.",
        "Action potentials propagate along axons. Myelin can make conduction faster between nodes of Ranvier.",
        "At chemical synapses, released neurotransmitters bind receptors on another cell."
      ]
    },
    "a3": {
      "title": "Pain and signalling",
      "lines": [
        "Nociceptors detect potentially tissue-damaging stimuli.",
        "Pain is a perceptual experience influenced by signal processing in the nervous system.",
        "Analgesics may act through different pathways and do not always eliminate the cause of pain."
      ]
    },
    "a4": {
      "title": "Brain injury and disorders",
      "lines": [
        "A brain injury may alter function even without a visible skull fracture.",
        "Symptoms of neurological disorders vary with the structures and processes affected.",
        "Different investigations are used for different clinical questions."
      ]
    },
    "a5": {
      "title": "Brain investigations",
      "lines": [
        "EEG records electrical activity measured at the scalp.",
        "MRI produces detailed tissue images without ionising radiation; CT uses X-rays.",
        "An image, electrical trace or symptom history does not answer exactly the same question."
      ]
    }
  },
  "f177": {
    "a1": {
      "title": "Medicines and mechanisms",
      "lines": [
        "A drug may prevent disease, manage symptoms or treat a condition.",
        "Different drug classes have different targets; antibiotics act against susceptible bacteria.",
        "An agonist activates a receptor, whereas an antagonist blocks or reduces the receptor's response."
      ]
    },
    "a2": {
      "title": "Research and trials",
      "lines": [
        "Drug development includes laboratory investigation, preclinical assessment, and clinical research.",
        "Random allocation helps reduce selection bias. Blinding can reduce expectation and measurement effects.",
        "A comparison group provides evidence about changes that would occur without the tested treatment."
      ]
    },
    "a3": {
      "title": "Interpreting evidence and risk",
      "lines": [
        "Regulatory decisions consider evidence of safety, effectiveness, and quality.",
        "A small trial may miss uncommon harms; wider use can reveal additional information.",
        "A useful conclusion weighs benefits, uncertainty and unwanted effects rather than relying on a single result."
      ]
    }
  }
};
var sectionById={},areaById={};root.areas.forEach(function(a){areaById[a.id]=a;a.sections.forEach(function(s){sectionById[s.id]={section:s,area:a};});});
var units=[{id:"f170",title:"Fundamentals of human biology",areas:root.areas.map(function(a){return{code:"a"+a.number,title:a.title,sections:a.sections};})},
 {id:"f171",title:"Health and disease",areas:["Causes and effects of disease","Treating disease","The immune response","Diagnosis and monitoring","Using evidence responsibly"].map(function(t,i){return{code:"a"+(i+1),title:t};})}];
other.units.forEach(function(u){units.push({id:u.id,title:u.title,areas:u.areas.map(function(t,i){return{code:"a"+i,title:t};}).filter(function(a,i){return a.title&&notes[u.id]&&notes[u.id][a.code];})});});
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function crumb(to,text){return '<p class="crumb"><a href="#'+esc(to)+'">← '+esc(text)+'</a></p>';}
function unitKind(unit){return unit==="f170"||unit==="f171"?"Externally assessed":"NEA knowledge support";}
function lessonFor(unit,id){return (window.KeystoneHumanLessons||{})[unit+"/"+id];}
function resumeLinks(){
 var engine=window.KeystoneHumanChallenge;
 var back=engine&&engine.resumeRoute();
 var simple=window.KeystoneHumanApp&&window.KeystoneHumanApp.hasResume&&window.KeystoneHumanApp.hasResume();
 return (back?'<a href="#'+esc(back)+'">Return to your unfinished question set</a>':'')+
  (simple?'<a href="#resume">Resume flashcards or explanation practice</a>':'');
}
function skillLinks(unit,id,lesson){
 var library=window.KeystoneHumanSkills;
 if(!library||!lesson.skills)return "";
 return '<details class="hb-prerequisite"><summary>Practise a related method</summary><ul>'+
  lesson.skills.map(function(skillId){
   var skill=library.get(skillId);
   if(!skill)return "";
   return '<li><a href="#skills/'+skill.unit+'/'+skill.id+'?from=catchup/'+unit+'/'+id+'">'+
    esc(skill.name)+'</a><p>'+esc(skill.description)+'</p></li>';
  }).join("")+'</ul></details>';
}
function relatedLinks(unit,id,practice){
 var links='<a href="#'+esc(practice)+'">'+(unitKind(unit)==="Externally assessed"?"Practise questions":"Practise general knowledge")+'</a>';
 if(unit==="f170")links+='<a href="#challenge/f170/'+esc(id)+'">Varied topic questions</a><a href="#cards/'+esc(id)+'">Flashcards for this topic</a>';
 if(unit==="f171"){
  var deck=(window.KeystoneF171Recall||[]).find(function(d){return d[0]===id;});
  links+='<a href="#'+(deck?"cards/f171-"+id:"flashcards/f171")+'">'+(deck?"Flashcards for this topic":"F171 flashcards")+'</a>';
 }
 return '<nav class="hb-teach-related" aria-label="Related learning">'+links+resumeLinks()+'</nav>';
}
function showHome(render){
 var h='<div class="k-wrap">'+crumb("home","Home")+'<div class="k-unit-hero"><div class="k-eyebrow">Your learning companion</div><h1>Catch up and understand</h1><p>Choose an idea to learn or revisit. Guided lessons show the reasoning before you practise.</p></div><div class="k-unit-tiles">';
 units.forEach(function(u){
  h+='<a class="k-unit-tile k-catchup-tile" href="#catchup/'+u.id+'"><span class="k-icon">📖</span><span><small>'+u.id.toUpperCase()+(" · "+unitKind(u.id))+'</small><strong>'+esc(u.title)+'</strong><em>'+u.areas.length+' learning areas</em></span><span aria-hidden="true">›</span></a>';
 });
 h+='</div><p class="k-small-note">Guided lessons and short recaps cover selected content. NEA resources teach general knowledge and independent practice.</p></div>';
 render(h);
}
function showUnit(unit,render){
 var u=units.filter(function(x){return x.id===unit;})[0];if(!u)return showHome(render);
 var h='<div class="k-wrap">'+crumb("catchup","All units")+'<div class="k-compact-hero"><div class="k-eyebrow">'+unit.toUpperCase()+' · Catch up · '+unitKind(unit)+'</div><h1>'+esc(u.title)+'</h1><p>Select the part you want to revisit.</p></div><div class="lesson-list">';
 u.areas.forEach(function(a){
  if(unit==="f170"){
   h+='<section class="paper panel"><h2>'+esc(a.title)+'</h2><div class="lesson-list">';
   a.sections.forEach(function(s){h+='<div class="lesson"><div><span class="num">'+esc(s.id)+'</span><h3>'+esc(s.title)+'</h3></div><div class="right"><a class="button secondary" href="#catchup/'+unit+'/'+esc(s.id)+'">'+(lessonFor(unit,s.id)?'Guided lesson':'Recap')+'</a></div></div>';});
   h+='</div></section>';
  }else{
   h+='<a class="k-area k-catchup-area" href="#catchup/'+unit+'/'+a.code+'"><span class="k-area-num">'+a.code.slice(1)+'</span><span class="k-area-label"><strong>'+esc(a.title)+'</strong><small>'+(lessonFor(unit,a.code)?'Guided lesson':'Short recap')+'</small></span><span aria-hidden="true">›</span></a>';
   if(unit==="f171"&&a.code==="a2"){
    h+='<div class="companion-lesson-actions"><a class="button secondary" href="#catchup/f171/2.1">Choosing a treatment</a><a class="button secondary" href="#catchup/f171/2.3">Prevention and early detection</a></div>';
   }
   if(unit==="f171"&&a.code==="a4"){
    h+='<div class="companion-lesson-actions"><a class="button secondary" href="#catchup/f171/4.2.1">Interpreting screening results</a><a class="button secondary" href="#catchup/f171/4.2.2">Taking repeat measurements</a></div>';
   }
   if(unit==="f171"&&a.code==="a3"){
    h+='<div class="companion-lesson-actions"><a class="button secondary" href="#catchup/f171/3.2.1">Immune dysfunction</a><a class="button secondary" href="#catchup/f171/3.2.2">Vaccine types</a></div>';
   }
  }
 });
 h+='</div></div>';render(h);
}
function showConcept(unit,id,step,render){
 var u=units.filter(function(x){return x.id===unit;})[0];
 if(!u)return showHome(render);
 var topic,points,practice;
 if(unit==="f170"){
  var item=sectionById[id];if(!item)return showUnit(unit,render);
  topic=item.section.title;points=item.section.points;practice="practice/"+id;
 }else{
  var item=(notes[unit]||{})[id];if(!item)return showUnit(unit,render);
  topic=item.title;points=item.lines;practice="challenge/"+unit+"/"+id;
 }
 if(!Array.isArray(points)||!points.length)return showUnit(unit,render);
 step=Math.max(0,Math.min(points.length-1,Number(step)||0));
 var key="#catchup/"+unit+"/"+id;
 var lesson=lessonFor(unit,id),teaching=window.KeystoneHumanTeaching;
 var lessonId=unit==="f171"?({"a2":"2.1","a4":"4.2.2"}[id]||id):id;
 if(lesson&&teaching&&step===0){
  var visual=window.KeystoneCatchupVisuals?window.KeystoneCatchupVisuals.render(unit,id):"";
  var recap='<details class="paper panel"><summary>Review the key ideas</summary><ul class="keylines">'+
   points.map(function(point){return "<li>"+esc(point)+"</li>";}).join("")+"</ul></details>";
  var sim=lesson.simulation&&window.KeystoneReproductionSimulation;
  var interactive=sim?'<details class="hb-inline-model"><summary>Open the reproductive pathway model</summary>'+sim.render()+'</details>':"";
  render('<div class="k-wrap k-catchup-concept">'+crumb("catchup/"+unit,u.title)+
   '<div class="k-eyebrow">'+unitKind(unit)+'</div><h1>'+esc(topic)+'</h1>'+
   teaching.render(lesson,{inline:lesson.visual==="model"?"":visual,method:skillLinks(unit,id,lesson),modelVisual:(lesson.visual==="model"?visual:"")+interactive,related:recap+relatedLinks(unit,id,practice)})+'</div>');
  teaching.mount(unit+"/"+lessonId,lesson);
  if(sim)window.KeystoneReproductionSimulation.mount(document);
  return;
 }

 var h='<div class="k-wrap k-catchup-concept">'+crumb("catchup/"+unit,u.title)+'<div class="k-eyebrow">Catch-up · '+(step+1)+' of '+points.length+'</div><h1>'+esc(topic)+'</h1><div class="progress-track" role="progressbar" aria-label="Key ideas reviewed" aria-valuemin="0" aria-valuemax="'+points.length+'" aria-valuenow="'+(step+1)+'"><div style="width:'+(100*(step+1)/points.length)+'%"></div></div>';
 h+='<section class="paper panel"><h2>Key idea '+(step+1)+'</h2><p class="k-catchup-text">'+esc(points[step])+'</p></section>';
 if(step===0&&window.KeystoneCatchupVisuals)h+=window.KeystoneCatchupVisuals.render(unit,id);
 h+='<div class="k-catchup-controls">'+(step>0?'<a class="button secondary" href="'+key+'/'+(step-1)+'">Previous</a>':'')+
 (step<points.length-1?'<a class="button primary" href="'+key+'/'+(step+1)+'">Next key idea →</a>':'<a class="button primary" href="#'+practice+'">Practise questions →</a>')+'</div>';
 h+='<p class="k-small-note">Short recap of selected key ideas.</p>'+relatedLinks(unit,id,practice);
 if(unit==="f175"&&id==="a1"&&step===points.length-1&&window.KeystoneReproductionSimulation){
  h+=window.KeystoneReproductionSimulation.render();
 }
 h+='</div>';render(h);
 if(unit==="f175"&&id==="a1"&&step===points.length-1&&window.KeystoneReproductionSimulation){
  window.KeystoneReproductionSimulation.mount(document);
 }
}
window.KeystoneHumanCatchup={route:function(hash,render){
 if(hash==="catchup")return showHome(render);
 var m=/^catchup\/(f17[0-7])(?:\/([a-z0-9.]+))?(?:\/(\d+))?$/.exec(hash);
 if(!m)return showHome(render);
 if(!m[2])return showUnit(m[1],render);
 return showConcept(m[1],m[2],m[3],render);
},linkFor:function(q){
 if(!q)return null;
 if(q.unit==="f170"&&sectionById[q.section])return "catchup/f170/"+q.section;
 if(q.section&&notes[q.unit]&&notes[q.unit][q.section])return "catchup/"+q.unit+"/"+q.section;
 var a="a"+q.area;
 return notes[q.unit]&&notes[q.unit][a]?"catchup/"+q.unit+"/"+a:null;
},searchTopics:function(){
 var f170=Object.values(sectionById).map(function(item){
  var s=item.section;
  return {group:"f170",title:s.title,context:"F170 · "+s.id,concept:true,actions:[["Catch up","#catchup/f170/"+s.id],["Flashcards","#cards/"+s.id]]};
 });
 var f171=Object.entries(notes.f171).map(function(entry){
  return {group:"f171",title:entry[1].title,context:"F171 · "+entry[0],concept:true,actions:[["Catch up","#catchup/f171/"+entry[0]]]};
 });
 return f170.concat(f171);
},count:function(){return {units:units.length,concepts:Object.values(notes).reduce(function(n,x){return n+Object.keys(x).length;},0)+Object.keys(sectionById).length};}};
})();

/* Keystone Human Biology companion. Catch-up lessons and original general practice. */
(function(){
"use strict";
var root=window.KeystoneHumanData,bank=window.KeystoneHumanChallenges,other=window.KeystoneHumanKnowledge;
if(!root||!bank||!other)return;
var notes={
  "f171": {
    "1.2.1": {
      title: "How airway and alveolar damage affect breathing",
      lines: ["Airway narrowing can reduce airflow. Loss of alveolar walls reduces the area for gas exchange.", "A symptom can have more than one cause. Compare the function measured with the tissue affected."]
    },
    "4.1": {
      title: "Choosing a physiological measurement",
      lines: ["Spirometry, peak flow and pulse oximetry measure different features.", "Check the measurement conditions and distinguish a reading from a clinical conclusion."]
    },
    "2.1": {
      "title": "Choosing a treatment",
      "lines": [
        "A cast immobilises the injured part to protect alignment while bone heals. Plaster moulds closely; fibreglass is generally lighter and more durable. A waterproof outer shell does not make the entire cast waterproof.",
        "Surgery can treat a local tumour or relieve pressure at its site. A systemic drug can reach cancer cells at several sites. Treatment decisions consider the location of disease, likely response, adverse effects, and recovery time."
      ]
    },
    "2.2": {
      "title": "Managing symptoms and function",
      "lines": [
        "Management therapies can relieve symptoms or support quality of life.",
        "An improvement in function can be valuable even when the underlying condition persists."
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
    "2.1": {
      title: "First antenatal appointment and later monitoring",
      lines: ["Booking history supplies context for later care. Starting measurements provide a baseline.", "Later measures can address a separate question about fetal growth or a possible condition."]
    },
    "a1": {
      "title": "Conception and pregnancy",
      "lines": [
        "An oviduct is also called a Fallopian tube or uterine tube. Fertilisation usually occurs within an oviduct.",
        "The zygote begins cleavage as it travels towards the uterus. The embryo develops into a blastocyst that may implant in the uterine lining. Development continues after implantation.",
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
const focusedLessons={
 "f170/1.1.2.counting":{area:"a1",title:"Choosing a cell-counting method",practice:"f170-cell-counting-transfer",lines:[
  "A haemocytometer uses a ruled grid and known depth. Visible cells are counted in a defined volume, with any dilution allowed for.",
  "A Coulter counter registers electrical pulses when particles pass through an aperture, allowing rapid counting and size estimation. Clumps and similarly sized debris can distort the result."
 ]},
 "f170/2.1.4.graft":{area:"a2",title:"Trace a transplanted kidney’s connections",practice:"2.1.4",lines:[
  "The donor kidney is usually placed low in the recipient’s abdomen. Follow the blood supply and the route from the kidney to the bladder."
 ]},
 "f171/1.2.1.hiatus":{area:"a1",title:"Hiatus hernia and reflux",practice:"f171-hiatus-mechanism-transfer",lines:[
  "In a sliding hiatus hernia, the junction between the oesophagus and stomach and part of the upper stomach move above the diaphragm.",
  "This can weaken the barrier to reflux. Reflux can irritate the oesophagus and cause heartburn, but a hernia may cause no symptoms."
 ]},
 "f171/1.2.1.pkd":{area:"a1",title:"Polycystic kidney disease and filtration",practice:"1.2.1",lines:[
  "In autosomal dominant polycystic kidney disease, enlarging cysts can damage functioning kidney tissue.",
  "Someone may pass urine while the kidneys become less able to clear wastes from the blood."
 ]},
 "f171/1.2.1.hodgkin":{area:"a1",title:"Hodgkin lymphoma and lymph nodes",practice:"f171-hodgkin-mechanism-transfer",lines:[
  "Hodgkin lymphoma is a cancer of lymphatic tissue. Affected nodes may enlarge as tumour tissue and surrounding inflammatory cells accumulate.",
  "The effects depend on the sites involved. A swollen node or a report of night sweats alone cannot establish the diagnosis."
 ]}
};
function indexComparisons(){
 for(const [key,lesson] of Object.entries(window.KeystoneHumanLessons || {})){
 const area=/^f170\/2\.1\.3\./.test(key)?"a2":(/^f171\/1\.[23]\.1\./.test(key)||/^f170\/1\.1\.[1345]\./.test(key))?"a1":null;
 if(area && lesson.title && !focusedLessons[key]){
  focusedLessons[key]={area,title:lesson.title,practice:lesson.practice || key.split("/")[1].split(".").slice(0,3).join("."),lines:lesson.explain};
 }
}
}
indexComparisons();
function lessonFor(unit,id){return (window.KeystoneHumanLessons||{})[unit+"/"+id];}
var buildPractice={
 "f170/1.1.1":"p-cell-stem-benefits",
 "f170/1.1.2":"p-cell-actual-width",
 "f170/1.1.3":"p-cell-protein-route",
 "f170/1.1.5":"p-cell-stage-metaphase",
 "f170/2.1.2":"p-phys-heart-septum",
 "f170/2.1.3":"p-phys-homeostasis-cross",
 "f170/2.1.4":"p-phys-transplant",
 "f170/2.2.2":"p-phys-homeostasis-cross",
 "f170/2.2.3":"p-phys-peakflow-technique",
 "f170/3.1.1":"p-endo-insulin-loop",
 "f170/3.1.2":"p-endo-type1",
 "f170/3.3.1":"p-endo-gametes",
 "f170/4.1.1":"p-micro-gram",
 "f170/4.1.4":"p-micro-culture-phases",
 "f171/1.2.1":"p-health-copd",
 "f171/1.2.1.pkd":"p-f171-pkd-physiology",
 "f171/4.1":"p-health-bp-repeat",
 "f171/2.1":"p-f171-local-systemic",
 "f171/2.2":"p-health-parkinsons-therapy",
 "f171/a2":"p-f171-local-systemic",
 "f171/2.3":"p-f171-treatment-prevention",
 "f171/a3":"p-f171-antigen-antibody-complex",
 "f171/3.2.1":"p-f171-transplant-immunosuppression",
 "f171/3.2.2":"p-f171-vaccine-types",
 "f171/4.2.1":"p-health-screening",
 "f171/a4":"p-f171-monitoring-repeats",
 "f171/4.2.2":"p-f171-monitoring-repeats",
 "f171/a5":"p-f171-research-designs"
};
function practiceScope(unit,id){
 var point=buildPractice[unit+"/"+id];
 return point&&window.KeystoneHumanProgressions?.get(point)?point:null;
}
function topicPracticeScope(unit,id){
 return focusedLessons[unit+"/"+id]?.practice||lessonFor(unit,id)?.practice||({"f173/a3":"3.4","f177/a3":"2.6"})[unit+"/"+id]||id;
}
function buildLink(unit,id,origin){
 var scope=practiceScope(unit,id);
 return scope?'<a data-hb-build href="#challenge/'+esc(unit)+'/'+esc(scope)+'?from='+esc(origin)+'">Build understanding</a>':"";
}
function questionReturn(origin){
 var engine=window.KeystoneHumanChallenge;
 return engine&&(engine.resumeRoute(origin)||engine.resumeRoute(origin.replace(/\/\d+$/,"")));
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
function practiceLabel(unit,id,topic){
 var labels={"2.1":"Practise treatment decisions","2.3":"Practise prevention and early detection","3.2.1":"Practise immune dysfunction","3.2.2":"Practise vaccine types","4.2.1":"Practise interpreting screening results","4.2.2":"Practise monitoring and repeat measurements"};
 return (unit==="f171"&&labels[id])||"Practise "+topic.toLowerCase();
}
function relatedLinks(unit,id,origin,practice,label){
 const back=questionReturn(origin);
 const build=buildLink(unit,id,origin);
 const resume=back?'<a data-hb-resume href="#'+esc(back)+'">Return to your unfinished question set</a>':"";
 const practiceLink=back===practice?"":'<a data-hb-practice href="#'+esc(practice)+'">'+esc(label)+'</a>';
 const exactLessonPractice=unit==="f170"&&lessonFor(unit,id)?.practice;
 const transplantTopic=unit==="f170"&&id==="2.1.4";
 const activities=transplantTopic?["kidney-evidence","dialysis-judgement"].map(key=>window.KeystoneTransplantActivities?.get(key)).filter(Boolean).map(activity=>
  '<a href="#challenge/f170/'+activity.id+'?from=catchup/f170/2.1.4">'+esc(activity.title)+'</a>').join(""):"";
 const primary=activities+(exactLessonPractice?(resume||practiceLink):resume+build+(!resume&&!build?practiceLink:""));
 let further=exactLessonPractice?build+(resume?practiceLink:""):(build||resume?practiceLink:"");
 if(transplantTopic)further+='<a href="#challenge/f170/p-phys-treatment-types">Classify surgery, transplantation and artificial support</a>'+
  '<a href="#catchup/f170/2.1.4.graft">Trace a transplanted kidney’s connections</a>';
 const other=lessonFor(unit,id)?.further || [];
 for(const [route,title] of other){
  const href=route.startsWith("challenge/")?route+"?from="+origin:route;
  further+='<a href="#'+esc(href)+'">'+esc(title)+'</a>';
 }
 if(unit==="f170"&&sectionById[id])further+='<a href="#cards/'+esc(id)+'">Flashcards for this topic</a>';
 if(unit==="f171"){
  const deck=(window.KeystoneF171Recall||[]).find(d=>d[0]===id);
  further+='<a href="#'+(deck?"cards/f171-"+id:"flashcards/f171")+'">'+(deck?"Flashcards for this topic":"F171 flashcards")+'</a>';
 }
 return '<nav class="hb-teach-related" aria-label="Related learning">'+primary+
  (further?'<details><summary>'+(other.length?'Related learning and practice':'More practice for this topic')+'</summary>'+further+'</details>':"")+'</nav>';
}
function showHome(render){
 var h='<div class="k-wrap">'+crumb("home","Home")+'<div class="k-unit-hero"><div class="k-eyebrow">Your learning companion</div><h1>Catch up and understand</h1><p>Choose an idea to learn or revisit. Guided lessons show the reasoning before you practise.</p></div><div class="k-unit-tiles">';
 units.forEach(function(u){
  h+='<a class="k-unit-tile k-catchup-tile" href="#catchup/'+u.id+'"><span class="k-icon">📖</span><span><small>'+u.id.toUpperCase()+(" · "+unitKind(u.id))+'</small><strong>'+esc(u.title)+'</strong><em>'+u.areas.length+' learning areas</em></span><span aria-hidden="true">›</span></a>';
 });
 h+='</div><p class="k-small-note">Guided lessons and short recaps cover selected content. NEA units use general examples for independent learning.</p></div>';
 render(h);
}
function focusedLessonLinks(unit,area){
 const links=Object.entries(focusedLessons).filter(([key,lesson])=>key.startsWith(unit+"/")&&lesson.area===area);
 return links.map(([key,lesson])=>'<div class="companion-lesson-actions"><a class="button secondary" href="#catchup/'+
  esc(key)+'">'+esc(lesson.title)+'</a></div>').join("");
}
function showUnit(unit,render){
 var u=units.filter(function(x){return x.id===unit;})[0];if(!u)return showHome(render);
 var h='<div class="k-wrap">'+crumb("catchup","All units")+'<div class="k-compact-hero"><div class="k-eyebrow">'+unit.toUpperCase()+' · Catch up · '+unitKind(unit)+'</div><h1>'+esc(u.title)+'</h1><p>Select the part you want to revisit.</p></div><div class="lesson-list">';
 u.areas.forEach(function(a){
  if(unit==="f170"){
   h+='<section class="paper panel"><h2>'+esc(a.title)+'</h2><div class="lesson-list">';
   a.sections.forEach(function(s){h+='<a class="lesson hb-lesson-link" href="#catchup/'+unit+'/'+esc(s.id)+'"><div><span class="num">'+esc(s.id)+'</span><h3>'+esc(s.title)+'</h3></div><small>'+(lessonFor(unit,s.id)?'Guided lesson':'Recap')+'</small></a>';});
   h+=focusedLessonLinks(unit,a.code)+'</div></section>';
  }else{
   const hasFocusedLessons=unit==="f171"&&["a1","a2","a3","a4"].includes(a.code);
   h+=(unit==="f171"?'<section class="hb-unit-area hb-unit-area-f171">':'')+'<a class="k-area k-catchup-area" href="#catchup/'+unit+'/'+a.code+'"><span class="k-area-num">'+a.code.slice(1)+'</span><span class="k-area-label"><strong>'+esc(a.title)+'</strong><small>'+(lessonFor(unit,a.code)?'Guided lesson':'Short recap')+'</small></span><span aria-hidden="true">›</span></a>'+(hasFocusedLessons?'<details class="hb-area-lessons"><summary>Focused lessons</summary><div class="hb-area-lesson-links">':'');
   if(unit==="f171"&&a.code==="a1"){
    h+='<div class="companion-lesson-actions"><a class="button secondary" href="#catchup/f171/1.2.1">Airway and alveolar damage</a></div>'+focusedLessonLinks(unit,a.code);
   }
   if(unit==="f171"&&a.code==="a2"){
    h+='<div class="companion-lesson-actions"><a class="button secondary" href="#catchup/f171/2.1">Choosing a treatment</a><a class="button secondary" href="#catchup/f171/2.2">Managing symptoms and function</a><a class="button secondary" href="#catchup/f171/2.3">Prevention and early detection</a></div>';
   }
   if(unit==="f171"&&a.code==="a4"){
    h+='<div class="companion-lesson-actions"><a class="button secondary" href="#catchup/f171/4.1">Choosing a physiological measurement</a><a class="button secondary" href="#catchup/f171/4.2.1">Interpreting screening results</a><a class="button secondary" href="#catchup/f171/4.2.2">Taking repeat measurements</a></div>';
   }
   if(unit==="f171"&&a.code==="a3"){
    h+='<div class="companion-lesson-actions"><a class="button secondary" href="#catchup/f171/3.2.1">Immune dysfunction</a><a class="button secondary" href="#catchup/f171/3.2.2">Vaccine types</a></div>';
   }
   if(unit==="f175"&&a.code==="a2"){
    h+='<div class="companion-lesson-actions"><a class="button secondary" href="#catchup/f175/2.1">First antenatal appointment</a></div>';
   }
   if(hasFocusedLessons)h+='</div></details>';
   if(unit==="f171")h+='</section>';
  }
 });
 h+='</div></div>';render(h);
}
// A recap line gets a figure only where the particular idea matches it.
// Unmapped lines intentionally remain unillustrated pending editorial review.
const labRecap = function(caption) { return {
 src:"/human-biology/lab-sample-workflow.svg",width:280,height:360,compact:true,
 alt:"A labelled sample passes through laboratory testing with quality controls to a result report. The report is considered alongside clinical context to inform a decision.",caption:caption
}; };
const nutritionRecap = function(file, alt, caption, height) { return {
 src:"/human-biology/"+file+".svg",width:280,height:height,compact:true,alt:alt,caption:caption
}; };
const recapFigureMap = {
 "f170/3.2.2/2": [nutritionRecap("meninges-csf", "A schematic section shows skull, dura, arachnoid, a cerebrospinal-fluid-filled subarachnoid space, pia, and brain tissue containing a ventricle with cerebrospinal fluid.", "Locate the CSF-filled space around the brain and the ventricle within it. The layers are exaggerated for clarity.", 360)],
 "f170/3.2.2/0": [["f176/a1", "explanationDiagram"]],
 "f170/3.2.2/1": [["f176/a1", "explanationDiagram"], nutritionRecap("hypothalamus-pituitary", "A simplified side view locates the hypothalamus within the brain and the pituitary below it, linked by a stalk. The hypothalamus helps regulate homeostasis and influences pituitary activity.", "Locate the hypothalamus and the pituitary below it. The hypothalamus helps regulate homeostasis and influences pituitary activity.", 300)],
 "f170/1.2.2/2": [nutritionRecap("connective-tissue-comparison", "A compact-bone schematic shows concentric matrix around a central canal, with cells marked. A hyaline-cartilage schematic shows cells in spaces within extracellular matrix.", "Compare the selected examples: both contain cells within extracellular matrix; the matrix and arrangement differ. These drawings are not to scale.", 300), nutritionRecap("blood-components", "Red blood cells, a white blood cell and small platelets are shown suspended in plasma. The symbols are schematic and not to scale.", "Locate red cells, a white cell and platelets within the plasma. Colours and sizes are schematic.", 320)],
 "f170/1.2.2/0": [nutritionRecap("epithelia-comparison", "Three schematic epithelial layers: a thin squamous layer, ciliated cells with surface cilia, and cuboidal cells. An arrow indicates movement over the cilia.", "Compare the cell shapes. The thin layer supports exchange; cilia move surface material, while many cuboidal cells absorb or secrete.", 350)],
 "f170/1.2.2/1": [nutritionRecap("muscle-tissue-comparison", "Three simplified muscle shapes: a long striated skeletal fibre, a branched striated cardiac cell, and a spindle-shaped smooth muscle cell without striations.", "Compare the striations and branching. The drawings show selected features, not size or an identification test.", 320)],
 "f170/1.1.3.evidence/1": [["f170/1.1.3.evidence", "explainDiagrams", 1]],
 "f170/1.1.3.evidence/2": [["f170/1.1.3.evidence", "explainDiagrams", 2]],
 "f170/4.1.5/0": [nutritionRecap("virus-particle", "A schematic enveloped virus has an outer envelope and spikes surrounding a protein capsid and genetic material. Some viruses do not have an envelope.", "Locate the genetic material and protein capsid. The outer envelope and spikes shown here occur in some viruses, not all.", 300)],
 "f170/4.1.5/1": [nutritionRecap("virus-host", "A virus delivers genetic material to a living host cell. The viral genome is copied and host ribosomes make viral proteins; new virus particles assemble.", "Follow this generalised example. Viruses depend on a living host cell; details differ between viruses.", 300)],
 "f170/4.1.5/2": [nutritionRecap("bacteriophage", "A tailed bacteriophage has a protein capsid, genetic material and tail. It attaches to a bacterial cell and its genome enters that cell.", "Follow the genome into the bacterial cell. This is one type of bacteriophage; their structures vary.", 300)],
 "f170/1.1.4/1": [["f170/1.1.4", "explainDiagrams", 0], ["f170/1.1.4", "explainDiagrams", 1]],
 "f170/1.1.4/2": [["f170/1.1.4", "explainDiagrams", 1], ["f170/1.1.4.surface", "explainDiagrams", 2]],
 "f170/1.1.4.surface/1": [["f170/1.1.4.surface", "explainDiagrams", 1]],
 "f170/1.1.4.surface/2": [["f170/1.1.4.surface", "explainDiagrams", 2]],
 "f170/1.1.4.surface/3": [["f170/1.1.4.surface", "explainDiagrams", 3]],
 "f174/a2/0": [nutritionRecap("iron-blood-oxygen", "A schematic chain shows less iron available over time, less haemoglobin potentially being made and a possible fall in the oxygen-carrying capacity of blood.", "Follow this example from low iron to blood oxygen-carrying capacity. Other deficiencies can affect different functions.", 280)],
 "f174/a2/1": [nutritionRecap("water-balance", "A small arrow enters a body representing water intake. A thicker arrow leaves the body representing a greater water loss over time. The arrow widths are schematic.", "Compare intake and loss over time. The thicker arrow represents greater loss in this example; it is not a measurement.", 250)],
 "f174/a2/2": [nutritionRecap("body-composition", "Two equal-height bars represent equal total body mass but have different proportions of fat mass and other mass. The bars are illustrative rather than measured values.", "Compare equal totals with different compositions. Neither bar establishes an individual's health or nutritional status.", 280)],
 "f173/a1/0": [labRecap("Follow the sample from the laboratory test to the report that supports a clinical decision.")],
 "f173/a1/1": [labRecap("Locate the sample label and quality controls: they help make the reported result dependable.")],
 "f173/a1/2": [labRecap("Notice that a report is considered with clinical context. A result does not always establish a diagnosis on its own.")],
 "f170/1.1.2.counting/1": [["f170/1.1.2.counting", "explainDiagrams", 1], ["f170/1.1.2.counting", "modelDiagrams", 1]],
 "f170/1.1.3/1": [["f170/1.1.3", "explainDiagrams", 3]],
 "f170/1.1.3/2": [["f170/1.1.3", "explainDiagrams", 1], ["f170/1.1.3", "explainDiagrams", 2]],
 "f170/1.1.2/1": [["f173/a2", "explanationPhoto"], ["f173/a2", "explanationPhoto2"]],
 "f170/3.2.1/1": [["f176/a2", "explanationDiagram"], ["f170/3.2.1", "myelinDiagram"]],
 "f172/a1/1": [["f172/a1", "teachingDiagram"]],
 "f172/a2/1": [["f172/a2", "teachingDiagram"]],
 "f172/a2/2": [["f172/a2", "teachingDiagram"]],
 "f172/a3/1": [["f172/a3", "teachingDiagram"]],
 "f172/a4/2": [["f172/a4", "teachingDiagram"]],
 "f173/a2/1": [["f173/a2", "explanationPhoto"], ["f173/a2", "explanationPhoto2"]],
 "f173/a3/1": [["f173/a3", "teachingDiagram"]],
 "f173/a3/2": [["f173/a3", "explanationDiagram"]],
 "f174/a3/0": [["f174/a3", "teachingDiagram"]],
 "f175/a2/1": [["f175/a2", "teachingDiagram"]],
 "f175/a3/1": [["f175/a3", "teachingDiagram"]],
 "f176/a1/0": [["f176/a1", "teachingDiagram"]],
 "f176/a2/0": [["f176/a1", "teachingDiagram"]],
 "f176/a3/1": [["f176/a3", "teachingDiagram"]],
 "f177/a1/2": [["f177/a1", "teachingDiagram"]],
 "f177/a2/2": [["f177/a2", "teachingDiagram"]]
};
function recapFigures(unit,id,step) {
 const teaching=window.KeystoneHumanTeaching, lessons=window.KeystoneHumanLessons || {};
 if (!teaching) return "";
 return (recapFigureMap[unit+"/"+id+"/"+step] || []).map(function(entry) {
  if (!Array.isArray(entry)) return teaching.renderDiagram(entry);
  const field=lessons[entry[0]]?.[entry[1]];
  const item=entry.length>2 ? field?.[entry[2]] : field;
  return (Array.isArray(item) ? item : [item]).filter(Boolean).map(function(visual) {
   return entry[1].startsWith("explanationPhoto") ? teaching.renderPhoto(visual) : teaching.renderDiagram(visual);
  }).join("");
 }).join("");
}
function showConcept(unit,id,step,render,review,simulationStage,resumeStage){
 var u=units.filter(function(x){return x.id===unit;})[0];
 if(!u)return showHome(render);
 indexComparisons();
 const focus=focusedLessons[unit+"/"+id];
 var topic,points;
 if(focus){topic=focus.title;points=focus.lines;}
 else if(unit==="f170"){
  var item=sectionById[id];if(!item)return showUnit(unit,render);
  topic=item.section.title;points=item.section.points;
 }else{
  var item=(notes[unit]||{})[id];if(!item)return showUnit(unit,render);
  topic=item.title;points=item.lines;
 }
 if(!Array.isArray(points)||!points.length)return showUnit(unit,render);
 step=Math.max(0,Math.min(points.length-1,Number(step)||0));
 var origin="catchup/"+unit+"/"+id+(step?"/"+step:""),key="#catchup/"+unit+"/"+id;
 var scope=topicPracticeScope(unit,id);
 var practice="challenge/"+unit+"/"+scope+"?from="+origin,label=practiceLabel(unit,id,topic);
 if(scope!==id&&!focus&&unit!=="f170")label=unit==="f173"?"Practise chromatogram interpretation":"Practise medicine safety surveillance";
 var related=relatedLinks(unit,id,origin,practice,label);
 var lesson=lessonFor(unit,id),teaching=window.KeystoneHumanTeaching;
 var lessonId=unit==="f171"?({"a2":"2.1","a4":"4.2.2"}[id]||id):id;
 if(lesson&&teaching&&step===0){
  var visual=window.KeystoneCatchupVisuals?window.KeystoneCatchupVisuals.render(...(lesson.visualFrom||[unit,id]),Boolean(lesson.revision&&lesson.visual==="model")):"";
  var recap='<details class="paper panel"><summary>Review the key ideas</summary><ul class="keylines">'+
   points.map(function(point,i){return "<li>"+esc(point)+recapFigures(unit,id,i)+"</li>";}).join("")+"</ul></details>";
  var sim=lesson.simulation&&window.KeystoneReproductionSimulation;
  var interactive=sim?'<details class="hb-inline-model"'+(simulationStage?' open':'')+'><summary>Open the reproductive pathway model</summary>'+sim.render()+'</details>':"";
  render('<div class="k-wrap k-catchup-concept" data-unit="'+unit+'">'+crumb("catchup/"+unit,u.title)+
   '<div class="k-eyebrow">'+unitKind(unit)+'</div><h1>'+esc(topic)+'</h1>'+
   teaching.render(lesson,{booklet:unit==="f170"||unit==="f171",inline:lesson.visual==="model"?"":visual,method:skillLinks(unit,id,lesson),modelVisual:(lesson.visual==="model"?visual:"")+interactive,related:(unit==="f170"||unit==="f171"?"":recap)+related})+'</div>');
  teaching.mount(unit+"/"+lessonId,lesson,simulationStage?1:review,resumeStage);
  if(sim)sim.mount(document,simulationStage,simulationStage&&document.querySelector("[data-hb-resume]"));
  return;
 }

 var h='<div class="k-wrap k-catchup-concept">'+crumb("catchup/"+unit,u.title)+'<div class="k-eyebrow">Catch-up · '+(step+1)+' of '+points.length+'</div><h1>'+esc(topic)+'</h1><div class="progress-track" role="progressbar" aria-label="Key ideas reviewed" aria-valuemin="0" aria-valuemax="'+points.length+'" aria-valuenow="'+(step+1)+'"><div style="width:'+(100*(step+1)/points.length)+'%"></div></div>';
 h+='<section class="paper panel"><h2>Key idea '+(step+1)+'</h2><p class="k-catchup-text">'+esc(points[step])+'</p>'+recapFigures(unit,id,step)+'</section>';
 if(step===0&&window.KeystoneCatchupVisuals)h+=window.KeystoneCatchupVisuals.render(unit,id);
 h+='<div class="k-catchup-controls">'+(step>0?'<a class="button secondary" href="'+key+'/'+(step-1)+'">Previous</a>':'')+
 (step<points.length-1?'<a class="button primary" href="'+key+'/'+(step+1)+'">Next key idea →</a>':'<a class="button primary" href="#'+esc(practice)+'">'+esc(label)+' →</a>')+'</div>';
 h+='<p class="k-small-note">Short recap of selected key ideas.</p>'+related;
 if(unit==="f175"&&id==="a1"&&step===points.length-1&&window.KeystoneReproductionSimulation){
  h+=window.KeystoneReproductionSimulation.render();
 }
 h+='</div>';render(h);
 if(unit==="f175"&&id==="a1"&&step===points.length-1&&window.KeystoneReproductionSimulation){
  window.KeystoneReproductionSimulation.mount(document);
 }
}
function linkFor(q){
 if(!q)return null;
 if(q.unit==="f170" && sectionById[q.catchup])return "catchup/f170/"+q.catchup;
 if(q.id==="f170-microvilli-transfer")return "catchup/f170/1.2.1";
 if(focusedLessons[q.unit+"/"+q.catchup])return "catchup/"+q.unit+"/"+q.catchup;
 if(q.unit==="f170"&&sectionById[q.section])return "catchup/f170/"+q.section;
 if(q.unit==="f171"&&q.section==="5.2")return "catchup/f171/a5";
 if(q.unit==="f175"&&q.section==="1.3")return "catchup/f175/a2";
 if(q.unit==="f176"&&q.section==="3.2.1")return "catchup/f176/a2";
 if(q.unit==="f177"&&["2.3","2.6"].includes(q.section))return "catchup/f177/a3";
 if(q.section&&notes[q.unit]&&notes[q.unit][q.section])return "catchup/"+q.unit+"/"+q.section;
 var area="a"+q.area;
 return notes[q.unit]&&notes[q.unit][area]?"catchup/"+q.unit+"/"+area:null;
}
function reteachFor(q,answer){
 var route=linkFor(q);
 var targets={
  "f170/1.1.2":[3,"Revisit the scale-bar calculation"],
  "f170/1.1.3":[2,"Revisit how proteins move through the cell"],
  "f170/2.1.2":[1,"Revisit blood flow and valve pressure"],
  "f170/2.1.3":[2,"Revisit oxygen diffusion into blood"],
  "f170/2.2.2":[3,"Revisit how circulation supports oxygen delivery"],
  "f170/2.2.3":[2,"Revisit what ventilation measures"],
  "f170/3.1.2":[3,"Revisit comparing glucose with baseline"],
  "f170/3.1.1":[3,"Revisit insulin action on target tissues"],
  "f170/3.3.1":[3,"Revisit the features that identify reproductive tissues"],
  "f170/4.1.4":[3,"Revisit what a population plateau can show"],
  "f171/1.2.1":[2,"Revisit how tissue damage changes breathing"],
  "f171/2.2":[3,"Revisit what improvement in function shows"],
  "f171/2.1":[3,"Revisit how evidence supports a treatment choice"],
  "f171/2.3":[3,"Revisit screening and diagnostic follow-up"],
  "f171/a3":[3,"Revisit the roles of immune cells"],
  "f171/3.2.1":[2,"Revisit rejection and infection risk"],
  "f171/4.2.1":[3,"Revisit where missed cases appear in the table"],
  "f171/4.2.2":[2,"Revisit when repeat readings are comparable"],
  "f171/a5":[3,"Revisit what the evidence supports"]
 };
 if(!route)return null;
 var reproduction={
  "f175-w1":["transport","Revisit where the gametes can meet"],
  "f175-hormones":["follicle","Revisit follicle development and ovulation"],
  "f175-ovulation":answer?.selected?.[0]===1?["follicle","Revisit what FSH does"]:["ovulation","Revisit what the LH surge triggers"],
  "f175-transport":["ovulation","Revisit how the oocyte enters the oviduct"],
  "f175-diagram-oviduct":["transport","Revisit the oviduct and the gamete routes"],
  "f175-early":["development","Revisit cleavage and blastocyst formation"],
  "f175-implant":["implantation","Revisit implantation in the uterine lining"]
 }[q.id];
 if(reproduction)return {route:route,href:route+"?stage="+reproduction[0],label:reproduction[1]};
 const focus=focusedLessons[route.slice("catchup/".length)];
 const foundationReview={
  "f170-gamete-contributions":[0,"Compare what the sperm and oocyte contribute"],
  "f170-blood-cell-evidence":[0,"Revisit blood-cell structures and functions"],
  "f170-tubule-liver-evidence":[1,"Revisit the steps in reabsorption"],
  "f170-ribosome-fractions":[0,"Revisit ribosome type and location"],
  "f170-nucleolus-export":[0,"Revisit assembly in the nucleolus and export"],
  "f170-lysosome-evidence":[2,"Revisit delivery and the conditions for digestion"],
  "f170-graft-recognition":[0,"Revisit surface antigens and recognition"],
  "f170-vesicle-directions":[0,"Revisit inward and outward vesicle movement"],
  "f170-division-variation":[3,"Revisit assortment and crossing over"]
 }[q.id];
 if(foundationReview)return {route:route,href:route+(foundationReview[0]?"?review="+foundationReview[0]:""),label:foundationReview[1]};
 if(focus)return {route:route,href:route+"?review=1",label:"Revisit the worked example"};
 var target=targets[route.slice("catchup/".length)];
 target=({
  "f170-microscopy-preparation-transfer":[0,"Revisit choosing a preparation for microscopy"],
  "f170-microvilli-transfer":[1,"Revisit epithelial surface area"],
  "f170-microscopy-slide-transfer":[0,"Revisit coverslips, contrast and thin sections"],
  "f170-organelle-coordination-transfer":[0,"Revisit the nucleus and mitochondrial proteins"],
  "f171-bmi-interpretation-transfer":[0,"Revisit how BMI is calculated and interpreted"],
  "f171-next-investigation-transfer":[0,"Revisit how to select a further investigation"],
  "f171-expiratory-evidence-transfer":[2,"Revisit flow and volume measurements"],
  "f172-diagram-alleles":[1,"Revisit alleles on homologous chromosomes"],
  "f172-recessive":[2,"Revisit combining parental alleles"],
  "f172-carrier":[2,"Revisit reading the Punnett square"],
  "f173-tests":[1,"Revisit choosing a microscope for the feature"],
  "f173-micro-contrast":[1,"Revisit surface and internal views"],
  "f173-mag":[3,"Revisit scale and magnification"],
  "f173-chromatogram-transfer":[1,"Revisit measuring from the chromatogram baseline"],
  "f174-digestion":[1,"Revisit digestion and absorption"],
  "f174-enzymes":[2,"Revisit how glucose reaches the blood"],
  "f174-hormones":[3,"Revisit glucose uptake and storage"],
  "f174-diagram-glucose":[3,"Revisit insulin action in target tissues"],
  "f176-synapse":[4,"Revisit what crosses a chemical synapse"],
  "f176-relay-threshold":[6,"Revisit the threshold comparison"],
  "f177-placebo":[2,"Revisit the purpose of the comparison group"],
  "f177-diagram-randomise":[2,"Revisit what random allocation changes"],
  "f177-blinding":[3,"Revisit how blinding reduces bias"],
  "f177-safety-signal":[3,"Revisit what suspected adverse-event reports show"]
 })[q.id]||target;
 if(route==="catchup/f170/1.1.2"&&(q.type==="number"||q.id==="p-cell-actual-width-diagnostic")){
  target=[4,"Revisit the worked unit conversion"];
 }
 if(route==="catchup/f171/4.2.1"&&(q.stage==="foundation"||q.stage==="diagnostic"||q.type==="number")){
  target=[2,"Revisit why a positive screen can be false"];
 }
 return { route:route, href:route+(target?.[0]?"?review="+target[0]:""),
  label:target?target[1]:"Need more help? Catch up on this idea" };
}
function resumeActivities(){
 const stages=window.KeystoneHumanTeaching?.savedStages()||{};
 const labels={guided:"With support",independent:"Your turn",followup:"Fresh check"};
 const items=[];
 for(const key of Object.keys(stages).sort()){
  const [unit,id]=key.split("/");
  const lesson=lessonFor(unit,id);
  if(!lesson||key!==unit+"/"+id+(lesson.revision?"/"+lesson.revision:""))continue;
  const title=focusedLessons[unit+"/"+id]?.title||(unit==="f170"?sectionById[id]?.section.title:notes[unit]?.[id]?.title);
  const stage=stages[key];
  if(title)items.push({route:"catchup/"+unit+"/"+id+"?continue="+stage,unit:unit.toUpperCase(),title,position:labels[stage]});
 }
 return items;
}
window.KeystoneHumanCatchup={route:function(hash,render){
 if(hash==="catchup")return showHome(render);
 var m=/^catchup\/(f17[0-7])(?:\/([a-z0-9.]+))?(?:\/(\d+))?(?:\?review=(\d+)|\?stage=(follicle|ovulation|transport|fertilisation|development|implantation)|\?continue=(guided|independent|followup))?$/.exec(hash);
 if(!m)return showHome(render);
 if(!m[2])return showUnit(m[1],render);
 var simulationStage=m[1]==="f175"&&m[2]==="a1"?m[5]:null;
 return showConcept(m[1],m[2],m[3],render,Number(m[4])||0,simulationStage,m[6]);
},unitList:units,resumeActivities:resumeActivities,linkFor:linkFor,reteachFor:reteachFor,practiceScope:practiceScope,topicPracticeScope:topicPracticeScope,searchTopics:function(){
 const aliases={
  "f170/1.1.2.counting":"haemocytometer coulter electronic impedance cell count",
  "f171/1.2.1.hiatus":"sliding hiatal hernia heartburn gastro oesophageal reflux",
  "f171/1.2.1.hodgkin":"lymphatic lymph node cancer",
  "f170/1.1.2":"microscope micrograph magnification resolution scale bar TEM SEM",
  "f170/2.1.4":"kidney transplant creatinine dialysis haemodialysis artificial organs surgery evidence",
  "f170/3.1.1":"glucose insulin hormones blood sugar negative feedback",
  "f171/4.2.1":"screen false positive false negative sensitivity specificity screening test",
  "f171/a3":"immunity antibody antibodies antigen adaptive innate vaccination lymphocytes",
  "f171/a5":"clinical research studies evidence trial data controls",
  "f173/a2":"photomicrographs magnification scale bar light microscope TEM SEM",
  "f173/a3":"chromatography chromatogram retention factor solvent front biochemical test",
  "f174/a4":"BMI nutrient intake dietary measurements",
  "f175/a1":"FSH LH ovulation follicle gamete oocyte fertilisation implantation menstrual cycle",
  "f175/a4":"assisted reproduction IVF fertility",
  "f176/a2":"synapse synaptic transmission inhibition excitation disinhibition neurotransmitter",
  "f176/a5":"EEG MRI CT scan brain investigations electroencephalogram",
  "f177/a2":"clinical trials trial randomisation blinding placebo controlled study",
  "f177/a3":"preclinical testing safety pharmacovigilance adverse events surveillance"
 };
 const entries=[];
 for(const unit of units){
  const code=unit.id.toUpperCase();
  const unitKindText=unitKind(unit.id);
  entries.push({group:unit.id,title:unit.title,context:code+" · "+unitKindText,keywords:code,actions:[["Open unit","#challenge/"+unit.id]]});
  if(unit.id==="f170")for(const area of unit.areas){
   entries.push({group:unit.id,title:area.title,context:code+" · Topic "+area.code.slice(1),actions:[["Practise","#challenge/"+unit.id+"/"+area.code]]});
  }
  const topics=unit.id==="f170"?Object.entries(sectionById).map(([id,item])=>[id,item.section]):Object.entries(notes[unit.id]||{});
  topics.push(...Object.entries(focusedLessons).filter(([key])=>key.startsWith(unit.id+"/")).map(([key,lesson])=>[key.split("/")[1],lesson]));
  for(const [id,topic] of topics){
   const studyRoute="#catchup/"+unit.id+"/"+id;
   const point=practiceScope(unit.id,id);
   const actions=[["Catch up",studyRoute]];
   if(point)actions.push(["Build Understanding","#challenge/"+unit.id+"/"+point+"?from="+studyRoute.slice(1)]);
   if(unit.id==="f175"&&id==="a1")actions.push(["Open interactive model",studyRoute+"?stage=follicle"]);
   if(topic.practice||(unit.id==="f173"&&id==="a3")||(unit.id==="f177"&&id==="a3")){
    actions.push(["Practise","#challenge/"+unit.id+"/"+topicPracticeScope(unit.id,id)+"?from="+studyRoute.slice(1)]);
   }
   entries.push({group:unit.id,title:unit.id==="f173"&&id==="a3"?"Biomolecule tests and chromatography":topic.title,
    context:code+" · "+unit.title,keywords:(aliases[unit.id+"/"+id]||"")+" "+id,
    concept:!id.startsWith("a"),actions});
  }
 }
 return entries;
},count:function(){return {units:units.length,concepts:Object.values(notes).reduce(function(n,x){return n+Object.keys(x).length;},0)+Object.keys(sectionById).length+Object.keys(focusedLessons).length};}};
})();

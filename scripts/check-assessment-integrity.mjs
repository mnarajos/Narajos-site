import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";

const read=path=>readFileSync(new URL("../public/"+path,import.meta.url),"utf8");
const context={};
vm.runInNewContext(read("assets/science-answer.js"),context);
const {parse,matches,shellsMatch}=context.NarajosAssessment;
const samples=[
  ["100 µm","mm",0.1],["0.001 mm","µm",1],["4 × 10⁻² s⁻¹","s^-1",0.04],["1/25","s⁻¹",0.04],
  ["−1.5 m s⁻²","m/s²",-1.5],["-25%","%",-25],["−2,5","%",-2.5],["×400","times",400],
  ["3,000","cells",3000],["3 000","cells",3000],["1,250,000","cells",1250000],["0,125","g",0.125],
  ["2 kJ","kJ",2],["2 kJ","J",2000],["3 mW","W",0.003],["3 MW","W",3000000],
  ["2 mol dm⁻³","mol/dm³",2],["250 mmol/L","mol dm^-3",0.25],["1.5 kg","g",1500],
  ["4.8 L min⁻¹","cm³/min",4800],["6000 cm³/min","L min⁻¹",6],["90 bpm","beats/min",90],
  ["2:1",": 1",2],["5","× 10¹⁴ Hz",5],["5 × 10¹⁴ Hz","× 10¹⁴ Hz",5],["−5e-2","kPa",-0.05]
];
for(const [raw,unit,expected] of samples)assert(Math.abs(parse(raw,unit).value-expected)<1e-9,raw+" in "+unit);
for(const [raw,unit] of [["0.05 kg","mm"],["5 nonsense","kPa"],["2 g/dm³","mol/dm³"],["6 L","L/min"],["2 mmol","mol/dm³"],["±25","%"],["25 cm²","cm³"],["25 bananas","%"],["1/0","%"],["1,2,3","cells"],["2e999","m"],["0x10","g"]])assert(!Number.isFinite(parse(raw,unit).value),raw+" in "+unit);
assert.equal(parse("±1 s","s","Calculate the uncertainty.").value,1);
assert(matches(3.38,13.5*250/1000,.006,"Give your answer to 2 decimal places.","g"));
assert(!matches(3.37,3.38,.006,"Give your answer to 2 decimal places.","g"));
assert(matches(66.7,66.7,.05,"Give a percentage to 1 decimal place.","%"));
assert(!matches(66.66,66.7,.05,"Give a percentage to 1 decimal place.","%"));
assert(!matches(399,400,undefined,"How many cells?","cells"));
assert(shellsMatch("2.8.1","2,8,1"));
assert(!shellsMatch("28,1","2,8,1"));
assert(!shellsMatch("2,-8,1","2,8,1"));

const {recordLessonAnswer,lessonEvidence}=context.NarajosAssessment;
const lesson={first:new Map()}, written={t:"short"}, independent={t:"num"}, corrected={t:"num"}, shown={t:"mcq"}, guided={t:"mcq"};
for(const [item,outcome] of [[written,"self-reviewed"],[written,"self-reviewed"],[independent,"independent"],
  [corrected,"incorrect"],[corrected,"corrected"],[shown,"revealed"],[shown,"corrected"],[guided,"supported"]]){
  recordLessonAnswer(lesson,item,outcome);
}
assert.deepEqual({...lessonEvidence(lesson)},{checked:4,independent:1,supported:1,revealed:1,reviewed:1,corrected:2,percent:25});
const proseOnly={first:new Map()};recordLessonAnswer(proseOnly,written,"self-reviewed");
assert.equal(lessonEvidence(proseOnly).checked,0);
assert.equal(lessonEvidence(proseOnly).independent,0);
assert(parse("0.1 kg","mm").incompatibleUnit && !parse("","mm").incompatibleUnit);

const html=read("alevel/index.html");
for(const name of ["CARDS","BRAIN","ALTS"]){
  const declaration=html.split("\n").find(l=>l.startsWith("var "+name+"="));
  vm.runInNewContext(declaration,context);
}
vm.runInNewContext(html.slice(html.indexOf("var STRICT="),html.indexOf("var FC_GROUPS=")),context);
const phase=context.CARDS.a2.find(card=>card[0]==="The stage of the cell cycle in which DNA replicates");
const answers=[phase[1],...phase[2]];
for(const correct of ["S","S phase","interphase","synthesis phase of interphase"])assert(context.fmatch(correct,answers),correct);
for(const wrong of ["M phase","G1 phase","mitosis"])assert(!context.fmatch(wrong,answers),wrong);
assert(!context.fmatch("interphase",["S phase","synthesis phase","S"]));
for(const [pupil,key] of [["Fe²⁺","Fe2+"],["Na⁺","Na+"],["Ca²⁺","Ca2+"],["hemoglobin","haemoglobin"],["ADH","antidiuretic hormone"],["TP","triose phosphate"]])assert(context.fmatch(pupil,[key]));
for(const wrong of ["Fe³⁺","Fe²⁻","fe²⁺","Fe2"])assert(!context.fmatch(wrong,["Fe2+"]));
assert(!context.fmatch("mitosis",["meiosis"]));
console.log("Assessment checks passed for quantities, precision, shell configurations and term alternatives.");

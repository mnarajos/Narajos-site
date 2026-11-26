import {arrow, circle, diagram, ink, line, picture, text} from "./catchup-models.js";

const wavePoints = Array.from({length: 137}, (_, i) =>
  [20 + 2*i, (76 - 25*Math.cos(i*Math.PI/17)).toFixed(2)].join(",")).join(" ");

const figures = {
  "amylase-endpoint": ["Sampling the reaction", "A tube sits in a water bath. Drops are taken to separate iodine wells at fixed times.",
    '<path d="M20 52v60h100V52 M54 29v57q10 18 20 0V29" fill="none" stroke="currentColor" stroke-width="3"/>'+line(22,66,118,66)+arrow(78,45,180,45)+circle(201,69,11,"white")+circle(241,69,11,"white")+circle(281,69,11,"white")+text(65,137,"Water bath")+text(238,108,"Iodine wells")],
  "ruler-drop": ["Align the zero mark","A vertical ruler hangs between open fingers with the zero aligned to the top of the fingers before release.",
    '<rect x="130" y="15" width="40" height="120" fill="#fff4d9" stroke="currentColor"/>'+[0,1,2,3,4].map(n=>line(130,130-n*24,141,130-n*24)+text(157,134-n*24,String(n),ink,12)).join("")+arrow(45,130,124,130)+arrow(245,130,177,130)+text(60,160,"Finger")+text(245,160,"Thumb")],
  "quadrat-evidence": ["Sample positions","A stream runs beside one edge of a rectangular meadow. Five sample squares sit along this edge. The interior has no samples.",
    '<rect x="18" y="25" width="285" height="96" fill="#edf5e9" stroke="currentColor"/>'+line(25,48,292,48,"#387ba2",5)+[45,90,145,202,260].map(x=>'<rect x="'+x+'" y="58" width="12" height="12" fill="white" stroke="currentColor"/>').join("")+text(155,103,"Meadow")+text(158,145,"Squares = quadrats")],
  "electrode-evidence": ["Electrolysis with inert electrodes","Two graphite rods dip into solution without touching. Separate wires connect the cathode to negative and the anode to positive.",
    '<path d="M55 65v63h210V65 M90 87V30h44 M230 87V30h-44" fill="none" stroke="currentColor" stroke-width="3"/>'+line(58,81,261,81,"#4a8795")+line(90,60,90,108,ink,8)+line(230,60,230,108,ink,8)+text(128,25,"−")+text(191,25,"+")+text(91,151,"Cathode")+text(228,151,"Anode")],
  "temperature-evidence": ["Temperature probe in an insulated cup","A probe passes through a lid into the mixture. The insulated walls and lid reduce energy exchange.",
    '<path d="M80 61l12 69h90l12-69z" fill="#eaf1eb" stroke="currentColor" stroke-width="4"/>'+line(74,59,202,59,ink,5)+line(135,23,135,106,ink,4)+text(235,40,"Probe")+line(154,35,202,35)+text(241,110,"Cup")+line(188,106,219,106)],
  "spring-evidence": ["Spring beside a fixed ruler","A spring hangs from a fixed support. A pointer at its lower end is read against a fixed vertical ruler.",
    line(45,24,154,24)+ '<path d="M100 24v12l-11 5 22 8-22 8 22 8-22 8 11 5v13" fill="none" stroke="currentColor" stroke-width="2"/>'+line(100,91,161,91)+line(170,28,170,136)+[0,1,2,3,4,5,6].map(i=>line(169,34+i*15,181,34+i*15)).join("")+text(231,88,"Ruler")+text(104,126,"Pointer")],
  "trolley-evidence": ["Trolley, string and hanging mass","A trolley runs along a level track. A string passes over a pulley at the end and down to a suspended mass.",
    line(15,82,238,82)+ '<rect x="56" y="54" width="74" height="18" fill="#d8e9ed" stroke="currentColor"/>'+circle(70,77,5,"white")+circle(116,77,5,"white")+circle(244,68,7,"white")+line(130,61,244,61)+line(251,68,251,109)+'<rect x="240" y="109" width="22" height="26" fill="#e5ded4" stroke="currentColor"/>'+text(91,41,"Trolley")+text(196,150,"Hanging mass")],
  "wave-measurement": ["Measure crest to crest","Five successive crests enclose four wavelengths. A dashed line marks equilibrium. Amplitude is measured vertically from equilibrium to a crest.",
    line(15,76,305,76,ink,1,"5 4")+'<polyline points="'+wavePoints+'" fill="none" stroke="currentColor" stroke-width="2"/>'+line(88,51,88,76)+line(20,35,292,35)+text(153,23,"24 cm")+text(156,138,"Five crests")],
  "infrared-evidence": ["Detector and hot cube","A detector faces one surface of a hot-water cube. Keep its direction and distance fixed for each surface.",
    '<rect x="28" y="44" width="82" height="72" fill="#d8e3e9" stroke="currentColor"/><path d="M222 63h48v35h-48z" fill="#efe4d4" stroke="currentColor"/>'+line(112,80,219,80,ink,1,"4 4")+text(67,139,"Hot cube")+text(249,126,"Detector")+text(165,60,"Distance")]
};

export function investigationFigure(id) {
  const [title, description, drawing] = figures[id];
  const figure = picture(title, diagram(description, drawing, 320, id === "ruler-drop" ? 180 : 165));
  if (id === "spring-evidence") {
    const axes = line(56,15,56,104)+line(56,104,280,104);
    const points = [0,1,2,3].map(n => circle(56+65*n,104-26*n,3,ink)+
      text(56+65*n,122,String(n),ink,13)+text(40,108-26*n,String(2*n),ink,13)).join("");
    figure.append(picture("Extension (cm) against force (N)", diagram(
      "Extension rises linearly from zero to six centimetres as force rises from zero to three newtons.",
      axes+line(56,104,251,26)+points+text(162,148,"Force (N)"),320,158)));
  }
  return figure;
}

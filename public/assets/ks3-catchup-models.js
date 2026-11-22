import { airSac, arrow, blue, circle, compare, diagram, ink, line, node, periodicOutline,
  picture, rust, steps, teal, text, violet } from "./catchup-models.js";
import { photo } from "./catchup-photos.js";

function cyclist(reduced) {
  const forward = reduced ? 20 : 40;
  return picture("Horizontal forces on a moving cyclist", diagram(
    "The cyclist is moving right. A 40 newton force acts left and a " + forward + " newton force acts right.", `
    ${circle(126,113,20,"#f2f7f6",ink,2.5)}${circle(195,113,20,"#f2f7f6",ink,2.5)}
    <path d="M126 113l30-36 15 36 24-3-12-44h-10 M126 113h45l11-33h-27 M146 75h16" fill="none" stroke="${teal}" stroke-width="3"/>
    <path d="M150 64l17-15 17 7 3 12 M150 64l20 18-11 24 M148 64l1 21-17 17" fill="none" stroke="${ink}" stroke-width="6" stroke-linecap="round"/>
    ${circle(178,42,8,"#db9963",ink,2)}
    ${arrow(111,93,35,93,blue,3)}${arrow(209,93,reduced ? 247 : 285,93,blue,3)}
    ${text(55,78,"40 N",blue)}${text(265,78,forward + " N",blue)}
    ${arrow(109,151,207,151,rust,2.5)}${text(163,174,"Direction of travel",rust)}
    `,320,186), reduced ? "The resultant force is 20 N backwards. The cyclist is still moving forwards and slows down."
    : "The opposite horizontal forces are equal. The cyclist keeps moving at the same speed.");
}

function flower(missed, tube = false) {
  const pollen = missed ? arrow(86,77,32,52,rust) : arrow(88,77,146,47,rust);
  return picture(tube ? "Fertilisation can happen in the ovule" : missed ? "Pollen misses the stigma" : "Pollination",
    diagram(tube ? "A pollen tube grows down the style to the ovule. A male sex cell can reach the female sex cell."
      : missed ? "Pollen moves away from the anther without reaching the stigma." : "Pollen moves from an anther to the stigma.", `
      <path d="M156 137Q104 111 50 88Q73 134 126 148 M170 137Q203 110 275 88Q257 136 204 148"
        fill="#f6d9d6" stroke="#a55a65" stroke-width="2"/>
      <path d="M136 141Q137 109 154 103V55h12v48q21 8 21 35q-1 26-26 27q-25 0-25-24Z"
        fill="#e2efe3" stroke="${teal}" stroke-width="2.4"/>
      <ellipse cx="159" cy="49" rx="17" ry="5" fill="#acd0a9" stroke="${teal}" stroke-width="2"/>
      <path d="M83 86Q96 125 137 147 M237 86Q222 125 186 148" fill="none" stroke="${teal}" stroke-width="3"/>
      <ellipse cx="83" cy="81" rx="10" ry="6" fill="#e9ad64" stroke="${rust}" stroke-width="2"/>
      <ellipse cx="237" cy="81" rx="10" ry="6" fill="#e9ad64" stroke="${rust}" stroke-width="2"/>
      <ellipse cx="162" cy="143" rx="10" ry="12" fill="#efe0f3" stroke="${violet}" stroke-width="2"/>
      ${tube ? circle(158,45,3,"#dc8c39",rust)+`<path d="M158 46C161 66 157 93 159 113Q164 123 162 136" fill="none" stroke="${rust}" stroke-width="3"/>`+circle(163,138,3,"#dc8c39",rust) : pollen}
      ${text(49,108,"Anther")}${line(59,100,80,86)}
      ${text(215,46,"Stigma")}${line(182,46,174,47)}
      ${text(220,153,"Ovule",violet)}${line(196,148,172,143,violet)}
      ${tube ? text(253,105,"Pollen tube",rust,15)+line(212,101,160,101,rust) : ""}`,320,179),
    tube ? "The tube carries the male sex cell to the ovule. Fertilisation happens when the sex cells join."
      : missed ? "The pollen has left the anther. Pollination needs it to land on a stigma."
        : "Pollen has landed on a stigma. Follow the next step to see how the sex cells meet.");
}

function flask(open, after) {
  return diagram("The " + (open ? "open" : "sealed") + " flask " +
    (after ? open ? "after fizzing. Gas escapes. The balance reads 130 grams." : "after fizzing. Gas stays inside. The balance still reads 132 grams."
      : "before mixing. The balance reads 132 grams."), `
    <path d="M139 26V61L89 133Q85 151 102 151H218Q234 151 230 133L181 61V26" fill="#f4fafb" stroke="${teal}" stroke-width="3"/>
    <path d="M115 103H205l25 36q2 12-13 12H103q-14 0-13-12Z" fill="#c9e6ee" stroke="${teal}" stroke-width="2"/>
    ${open ? line(135,26,185,26,teal,3) : `<rect x="134" y="19" width="52" height="14" rx="3" fill="#a57e60" stroke="${rust}"/>`}
    ${after ? [[148,94,4],[164,76,5],[176,58,4],[155,48,3],[136,124,4],[180,130,4]].map(([x,y,r])=>circle(x,y,r,"white",blue)).join("") :
      '<path d="M133 100l15 29h24l15-29" fill="#e8ddbd" stroke="#8d7754" stroke-width="2"/>'}
    ${after && open ? arrow(160,26,160,4,blue,2.5)+text(223,17,"Gas escapes",blue,15) : ""}
    <rect x="76" y="152" width="168" height="45" rx="8" fill="#d6e4e4" stroke="${ink}" stroke-width="2"/>
    <rect x="121" y="163" width="78" height="24" rx="3" fill="white" stroke="${ink}" stroke-width="1.5"/>
    ${text(160,181,open && after ? "130 g" : "132 g")}`,320,205);
}

function reaction(open) {
  return compare(picture("Before mixing",flask(open,false),open ? "Flask open." : "Stopper in place."),
    picture("After fizzing",flask(open,true),open ? "The gas that escaped is no longer on the balance." : "The flask and the gas inside are still on the balance."));
}

function lightningModel() {
  const modelAt = (stage) => {
    const light = stage >= 1, sound = stage >= 2;
    const drawing = diagram(stage === 0 ? "At the lightning strike, light and thunder start from the same place." :
      !sound ? "The flash has reached the observer. Thunder is still travelling." :
      "Thunder reaches the same observer after the light.", `
      <path d="M38 24h22l-8 17h11L40 70l7-22H31Z" fill="#eec077" stroke="${rust}" stroke-width="2.5"/>
      ${text(47,94,"Strike")}
      ${circle(281,46,10,"#db9b70",ink)}${line(281,56,281,82,ink,3)}
      ${line(281,65,267,75,ink,3)}${line(281,65,296,74,ink,3)}
      ${line(281,81,270,101,ink,3)}${line(281,81,293,101,ink,3)}
      ${text(269,119,"Observer")}
      ${line(42,120,282,120,"#a6bcbd",1.5,"4 4")}
      ${line(42,151,282,151,"#a6bcbd",1.5,"4 4")}
      ${arrow(42,120,light ? 281 : 67,120,blue,3)}
      ${arrow(42,151,sound ? 281 : light ? 103 : 67,151,rust,3)}
      ${text(16,125,"Light",blue,12,"start")}${text(5,156,"Sound",rust,12,"start")}`,320,169);
    return picture(["Both signals start together","Light reaches you first","Thunder arrives later"][stage],drawing,
      ["Advance the model to follow the two signals.","Light is much faster in air.","The timing is illustrative. The same strike produced both signals."][stage]);
  };
  const host = node("div");
  host.append(steps("Watch how the two signals travel", [
    ["Strike",() => modelAt(0)], ["Flash reaches you",() => modelAt(1)], ["Thunder reaches you",() => modelAt(2)]
  ]));
  const evidence = node("details");
  evidence.append(node("summary","See a real lightning flash"),
    photo("lightning","A real lightning flash","A still photograph records the light. The model shows why the thunder arrives later."));
  host.append(evidence);
  return host;
}

function vacuum() {
  return picture("Light and sound in a vacuum",diagram("Light crosses an evacuated chamber from the source to a detector. Sound cannot cross the empty space.", `
    <rect x="25" y="32" width="270" height="101" rx="18" fill="#edf4fa" stroke="${teal}" stroke-width="2.5"/>
    ${text(160,22,"Chamber with the air removed")}
    ${circle(63,64,13,"#ecb75f",rust,2)}
    ${arrow(80,64,267,64,blue,3)}${text(164,57,"Light crosses",blue)}
    <rect x="268" y="55" width="12" height="18" rx="2" fill="#4a7e82"/>
    <path d="M51 100h10l9-7v21l-9-7H51Z" fill="#cdad8e" stroke="${rust}"/>
    ${line(82,92,82,111,rust,3)}${text(175,109,"Sound stops at source",rust,15)}`,320,151),
    "Sound is passed on by particles. Light can travel through empty space.");
}

function food() {
  return compare(photo("wholemeal-bread","Wholemeal bread","Carbohydrate and fibre.",true),
    photo("lentils","Lentils","Protein, carbohydrate and fibre.",true),
    photo("sunflower-oil","Sunflower oil","Lipid.",true));
}

function cart(distance, work) {
  const end = 46 + distance * 50;
  return picture(distance + " m travelled",diagram("A 10 newton force pushes a cart " + distance + " metres along a straight track.", `
    ${line(26,113,285,113,ink,2)}
    ${line(46,110,46,124,ink,2)}${line(end,110,end,124,ink,2)}
    ${line(46,134,end,134,teal,3)}
    ${text((46+end)/2,158,distance+" m",teal)}
    <rect x="24" y="78" width="44" height="22" rx="4" fill="none" stroke="#759394" stroke-width="2" stroke-dasharray="4 4"/>
    <rect x="${end-22}" y="78" width="44" height="22" rx="4" fill="#b5dcd6" stroke="${teal}" stroke-width="2"/>
    ${circle(end-14,104,7,"#d7e4e5")}${circle(end+14,104,7,"#d7e4e5")}
    ${arrow(end-77,62,end-23,62,rust,3)}${text(end-50,50,"10 N",rust)}${text(46,28,"Start",ink)}
    `,320,167),work ? "The 10 N push transfers " + (distance*10) + " J." : "The arrow shows the 10 N push.");
}

function cartModel(work) {
  return compare(cart(work ? 1 : 2,work),cart(work ? 2 : 4,work));
}

function respiration(root) {
  return picture(root ? "Inside a root cell" : "Inside a muscle cell",
    diagram("In " + (root ? "a root cell" : "a muscle cell") + ", glucose and oxygen are used in aerobic respiration. Carbon dioxide and water are produced.", `
    ${root ? `<path d="M92 66H215q23 0 23 21v59q0 19-22 19H95q-14 0-14-19V84q0-18 11-18Z" fill="#d6ecdd" stroke="${teal}" stroke-width="4"/>`
      : `<path d="M76 113Q103 62 158 63q48 1 86 50q-43 47-86 48q-57 0-82-48Z" fill="#f3ded9" stroke="${rust}" stroke-width="3"/>`}
    <ellipse cx="160" cy="109" rx="31" ry="15" fill="#e1ccea" stroke="${violet}" stroke-width="2"/>
    <path d="M138 108q5-11 10 0t10 0t10 0t10 0" fill="none" stroke="${violet}" stroke-width="2"/>
    ${text(160,146,"Mitochondrion",violet,15)}
    ${text(67,26,"Oxygen",blue)}${text(250,26,"Glucose",teal)}
    ${arrow(78,35,139,93,blue)}${arrow(239,35,183,93,teal)}
    ${arrow(134,117,63,175,blue)}${arrow(186,118,251,176,teal)}
    ${text(69,199,"Carbon dioxide",blue,14)}${text(249,199,"Water",teal,15)}
    `,320,213),
    root ? "Oxygen reaches the root cell from the soil. Aerobic respiration transfers energy for the cell’s activities."
      : "Oxygen arrives in the blood. Aerobic respiration transfers energy for muscle cell activities.");
}

function rocks(changed) {
  if (changed) {
    const example = picture("One path to metamorphic rock",
      diagram("An existing solid rock undergoes heat and pressure and changes to a banded rock. It remains solid throughout.", `
      <path d="M27 104l6-37 29-17 49 11 19 42-29 27H53Z" fill="#d0ae9b" stroke="${ink}" stroke-width="2.5"/>
      <path d="M194 107l12-42 36-13 43 9 13 41-18 27h-63Z" fill="#d0ae9b" stroke="${ink}" stroke-width="2.5"/>
      <path d="M202 88q20-9 38-4t47-4M198 101q27-10 43-4t52-4M203 112q19-9 40-4t45-2"
        fill="none" stroke="${violet}" stroke-width="3"/>
      ${arrow(139,90,183,90,rust)}
      ${text(161,33,"Heat and pressure",rust,16)}
      ${text(77,156,"Solid rock",ink)}${text(246,156,"Still solid",ink)}`),
      "Heat and pressure can change a rock without melting it.");
    return compare(example, photo("gneiss","Gneiss · metamorphic rock","Look for light and dark mineral bands.",true));
  }
  const host = node("div");
  host.append(compare(
    photo("sandstone","Sandstone · sedimentary rock","Look for separate grains and layers.",true),
    photo("granite","Granite · igneous rock","Look for crystals that fit together.",true)));
  const more = node("details");
  const link = node("a","British Geological Survey · Rocks under the Microscope");
  link.href = "https://www.bgs.ac.uk/discovering-geology/maps-and-resources/rocks-under-the-microscope-activity/";
  more.append(node("summary","Look closer at different rocks"),link);
  host.append(more);
  return host;
}

function evaporation() {
  return picture("From clear filtrate to salt crystals",diagram("Clear salt solution from filtration is transferred to an evaporating basin. Water leaves as vapour and solid salt remains.", `
    <path d="M40 48v66q0 12 13 12h49q12 0 12-12V48" fill="#eef8fb" stroke="${blue}" stroke-width="3"/>
    <path d="M41 82h72v31q-2 12-12 12H53q-11 0-12-12Z" fill="#c7eaf4" stroke="${blue}"/>
    ${text(79,151,"Salt solution",blue,15)}${arrow(126,87,181,87,teal)}
    <path d="M187 106q18 32 49 32t50-32Z" fill="#f6f2e6" stroke="${rust}" stroke-width="2.5"/>
    <path d="M205 110l11-7 8 8 10-13 10 13 9-6 10 6Z" fill="white" stroke="${ink}"/>
    ${arrow(216,96,216,51,blue)}${arrow(248,96,248,51,blue)}
    ${text(234,36,"Water vapour",blue,15)}${text(234,159,"Salt crystals",rust,15)}`,320,173),
    "The water leaves. The dissolved salt stays behind when enough water evaporates.");
}

function leaf(dark) {
  return picture(dark ? "The same leaf in darkness" : "Leaf in light",diagram(
    dark ? "Water and carbon dioxide are available, but there is no light to provide energy for photosynthesis."
      : "Carbon dioxide and water reach the leaf. Light transfers energy to the leaf. It makes glucose and releases oxygen.", `
    <path d="M108 118q20-75 121-73q2 105-95 94Z" fill="${dark ? "#c0d4cc" : "#b8d9a4"}" stroke="${teal}" stroke-width="3"/>
    <path d="M100 150l104-84 M146 115l3-30 M168 96l31 3" fill="none" stroke="${teal}" stroke-width="3"/>
    ${arrow(29,76,115,91,blue)}${text(70,62,"Carbon dioxide",blue,14)}
    ${arrow(27,128,100,128,blue)}${text(56,149,"Water",blue,15)}
    ${dark ? text(163,29,"No light reaches the leaf",rust,15) : arrow(163,27,163,55,rust)+text(163,22,"Light",rust)}
    ${dark ? "" : arrow(223,85,298,85,teal)+text(257,71,"Oxygen",teal,15)}
    ${text(163,183,dark ? "Photosynthesis stops" : "Glucose is made in the leaf",teal)}`,320,198),
    dark ? "There is no light energy for photosynthesis. Respiration continues." : "Light supplies energy for photosynthesis.");
}

function metals(reversed) {
  const strips = ["Before","After"].map((label,index) => {
    const showDeposit = index === 1 && !reversed;
    const liquid = reversed || showDeposit ? "#d6e8d8" : "#a3daee";
    const strip = reversed ? "#b6744b" : "#849595";
    return picture(label,diagram(reversed ? "A copper strip in iron sulfate solution with no iron deposit." :
      showDeposit ? "Copper forms as a deposit on the submerged iron strip." : "A grey iron strip is placed in blue copper sulfate solution.", `
      <path d="M79 44V133Q79 148 95 148H225Q241 148 241 133V44"
        fill="#f9fdfe" stroke="${teal}" stroke-width="3"/>
      <path d="M80 85h160v48q0 14-15 14H95q-15 0-15-14Z" fill="${liquid}" stroke="${teal}"/>
      <path d="M141 29h22l12 106h-22Z" fill="${strip}" stroke="${ink}" stroke-width="2"/>
      ${showDeposit ? `<path d="M149 87l11 5 9-5 7 49-24 3Z" fill="#b96841" stroke="${rust}" stroke-width="2"/>`+
        line(180,112,212,112,rust)+text(216,120,"Deposit",rust,14,"start") : ""}
      ${text(216,27,reversed ? "Copper strip" : "Iron strip",ink,15)}`,320,161),
      reversed ? (index ? "No iron coating forms." : "Iron sulfate solution.") :
        showDeposit ? "Copper coats the part under the liquid." : "Copper sulfate solution.");
  });
  const host = node("div");
  host.append(compare(...strips));
  if (!reversed) {
    const evidence = node("details");
    evidence.append(node("summary","See the copper deposit in a photo"),
      photo("copper-deposit","Copper on iron shavings","Look for the reddish deposit on the shavings in the liquid."));
    host.append(evidence);
  }
  return host;
}

const openingModels = {
  forces: () => cyclist(false),
  reproduction: () => steps("Follow pollen through the flower",[
    ["Pollen lands",() => flower(false)], ["The tube grows",() => flower(false,true)]
  ]),
  "chemical-reactions": () => reaction(false),
  "light-and-sound": lightningModel,
  "health-and-lifestyle": food,
  "periodic-table": periodicOutline,
  "work-done": () => cartModel(false),
  respiration: () => respiration(false),
  "earth-structure": () => rocks(false),
  photosynthesis: () => leaf(false),
  metals: () => metals(false)
};

const changedModels = {
  forces: () => cyclist(true),
  "the-body": () => airSac(),
  reproduction: () => flower(true),
  "chemical-reactions": () => reaction(true),
  "light-and-sound": vacuum,
  "periodic-table": periodicOutline,
  "separating-techniques": evaporation,
  "work-done": () => cartModel(true),
  respiration: () => respiration(true),
  "earth-structure": () => rocks(true),
  photosynthesis: () => leaf(true),
  metals: () => metals(true)
};

export function ks3CatchupModel(id, changed = false) {
  const model = (changed ? changedModels : openingModels)[id];
  if (!model) return null;
  const host = node("div", "", "catchup-model");
  host.append(model());
  return host;
}

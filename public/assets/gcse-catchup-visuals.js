import { arrow, blue, circle, compare, diagram, ink, line, node, picture, rust, steps, teal, text, violet } from "./catchup-models.js";

function curve([title, xLabel, yLabel, series, note]) {
  const maxX = Math.max(...series.flatMap(([, values]) => values.map(([x]) => x)));
  const maxY = Math.max(...series.flatMap(([, values]) => values.map(([, y]) => y)));
  const keys = [blue, rust];
  const plot = series.map(([, values], index) =>
    `<polyline points="${values.map(([x, y]) => `${49 + 237 * x / maxX},${148 - 112 * y / maxY}`).join(" ")}"
     fill="none" stroke="${keys[index]}" stroke-width="3.8" stroke-linejoin="round"
     ${index ? 'stroke-dasharray="7 5"' : ""}/>`).join("");
  return picture(title, diagram(title + ". " + note + " Horizontal axis: " + xLabel + ". Vertical axis: " + yLabel + ".",
    line(45,152,298,152)+line(45,35,45,152)+text(168,181,xLabel,ink,16)+text(46,24,yLabel,ink,16,"start")+plot,320,190),
    series.length === 1 ? note : "Solid line · " + series[0][0] + ". Dashed line · " + series[1][0] + ". " + note);
}

function bars([title, context, rows]) {
  const figure = node("figure", "", "catchup-picture gcse-catchup-bars");
  const caption = node("figcaption");
  caption.append(node("strong",title),node("span",context));
  const list = node("ul");
  const max = Math.max(...rows.map(([, , value]) => value));
  for (const [label, amount, value] of rows) {
    const item = node("li");
    const bar = node("span", "", "gcse-catchup-bar");
    bar.style.width = (value / max * 100) + "%";
    bar.setAttribute("aria-hidden","true");
    item.append(node("span",label),node("strong",amount),bar);
    list.append(item);
  }
  figure.append(caption,list);
  return figure;
}

function pairs([title, data]) {
  const group = node("section");
  group.setAttribute("aria-label",title);
  group.append(compare(...data.map(([label, image, note]) => picture(label,
    diagram(image, `<rect x="13" y="15" width="294" height="39" rx="9" fill="#d8eeea" stroke="${teal}"/>
      ${text(160,40,image,teal,image.length > 31 ? 13 : 16)}`,320,66),note))));
  return group;
}

function circuit() {
  function draw(open) {
    const wires = '<path d="M136 23H52V159H269V23H151 M52 84H269" stroke="currentColor" stroke-width="2.5" fill="none"/>';
    function bulb(x,y,lit) {
      return circle(x,y,16,lit?"#f3d181":"#edf4f4")+line(x-10,y-10,x+10,y+10)+line(x+10,y-10,x-10,y+10);
    }
    return picture(open?"Lamp A is disconnected":"Both lamps have a complete path",
      diagram(open?"Parallel circuit. The top branch is open. Lamp B remains on in its separate branch.":
        "Two lamps share a supply in two parallel branches.",wires+line(136,12,136,34)+line(151,17,151,29)+
        (open ? '<rect x="98" y="74" width="34" height="20" fill="#f4f9f8"/>'+line(98,84,126,69,teal,2.5):"")+
        bulb(166,84,!open)+bulb(166,159,true)+text(206,72,"Lamp A")+text(205,148,"Lamp B")+
        circle(52,84,3,ink)+circle(269,84,3,ink),320,191),
      open?"Lamp B still has a complete circuit.":"The same potential difference is across both branches.");
  }
  return steps("Open a branch", [["Both branches closed",()=>draw(false)],["Open branch A",()=>draw(true)]]);
}

function web() {
  return picture("Feeding links",diagram("Grass is eaten by mice and rabbits. Owls eat mice and rabbits in this simplified example.",`
    ${arrow(87,95,129,53)}${arrow(87,95,129,136)}${arrow(191,52,224,92)}${arrow(191,138,224,98)}
    ${text(55,100,"Grass")}${text(159,51,"Mouse")}${text(159,145,"Rabbit")}${text(257,101,"Owl")}`),
    "Each arrow shows transfer from food to consumer. An owl can have more than one food source.");
}

function column() {
  return picture("Fractional distillation column",diagram("A fractionating column is cooler at the top and hotter at the bottom. Short hydrocarbons leave near the top and long hydrocarbons leave lower down.",`
    <path d="M85 37Q85 17 105 17H143Q163 17 163 37V177H85Z" fill="#e1eeec" stroke="${teal}" stroke-width="3"/>
    ${arrow(161,54,216,54,blue)}${arrow(162,112,216,112,rust)}${arrow(27,155,84,155,rust)}
    ${text(65,138,"Heated oil",rust,14)}${text(123,45,"Cooler",blue,14)}${text(123,162,"Hotter",rust,14)}
    ${text(250,58,"Short chains",ink,15)}${text(250,116,"Long chains",ink,15)}`,320,190),
    "Vapours rise and cool. Each fraction condenses over a range of temperatures.");
}

function chromatogram() {
  const results = picture("Paper chromatography of two inks",diagram("Paper with two lanes. Ink A has two separate spots and ink B has one. Both started from the same baseline. The solvent front is above the spots.",`
    <rect x="55" y="12" width="214" height="173" rx="4" fill="#fffdf3" stroke="${ink}" stroke-width="2"/>
    ${line(69,42,253,42,teal,2,"5 4")}${line(69,152,253,152,ink)}
    ${text(196,35,"Solvent front",teal,14)}${text(215,145,"Baseline",ink,14)}
    ${circle(107,69,8,"#9981b1",violet)}${circle(107,100,8,"#e8a35c",rust)}${circle(165,100,8,"#e8a35c",rust)}
    ${text(107,175,"Ink A")}${text(165,175,"Ink B")}`,320,195),
    "Measure from the baseline to the centre of the spot, and from the baseline to the solvent front.");
  const setup = picture("Before the run", diagram(
    "Paper hangs into a shallow layer of solvent. A pencil baseline and sample spots are above the liquid level.",
    '<path d="M55 37V159H261V37" fill="none" stroke="currentColor" stroke-width="2.5"/>'+
    '<rect x="57" y="119" width="202" height="38" fill="#cde6ef"/>'+
    '<rect x="98" y="31" width="56" height="111" fill="#fffdf3" stroke="currentColor"/>'+
    line(101,86,151,86)+circle(111,86,4,rust)+circle(139,86,4,violet)+
    line(57,119,259,119,blue,2,"4 3")+text(164,90,"Pencil baseline",ink,15,"start")+
    text(175,142,"Solvent",blue,15,"start"),320,175),
    "Set the solvent level below both sample spots.");
  return compare(setup, results);
}

function wave() {
  function state(stage) {
    const y = x => 91 + 33 * Math.sin((x - 126 - stage * 25)/23);
    const coords = Array.from({length:61},(_,i)=>[16+i*4.8,y(16+i*4.8)].join(",")).join(" ");
    return picture("Transverse wave on a rope",diagram("The wave pattern moves to the right. The marked rope point moves only up and down at the same horizontal position.",`
      ${line(18,91,306,91,"#8b9d9c",1,"5 3")}
      <polyline points="${coords}" fill="none" stroke="${teal}" stroke-width="4"/>
      ${line(126,49,126,132,rust,1.6,"4 4")}${circle(126,y(126),7,"#efa468",rust,2)}
      ${arrow(205,26,295,26,blue)}${text(193,30,"Wave travels",blue,15,"end")}`,320,148),
      "The coloured marker moves up and down along the dashed line.");
  }
  return steps("Follow a point on the rope", [["Start position",()=>state(0)],["Wave moves right",()=>state(1)],["A little later",()=>state(3)]]);
}

function coil() {
  function state(on) {
    return picture(on?"Current on":"Current off",diagram(on?"Current flows through a coil wrapped around the iron core. Curved arrows show its magnetic field.":
      "No current flows in the coil. The model shows no field from the current.",`
      ${on?'<path d="M66 92C34 35 103 15 160 16S286 35 250 92M66 92C34 150 103 169 160 168S286 150 250 92" fill="none" stroke="#23558c" stroke-width="2" stroke-dasharray="6 4"/>'
       + arrow(150,16,173,16,blue,1.5) + arrow(150,168,173,168,blue,1.5) : ""}
      <rect x="52" y="77" width="215" height="30" rx="5" fill="#c3d2d2" stroke="${ink}" stroke-width="2"/>
      <path d="M70 111q-13-35 4-51t15 51q-13-35 4-51t15 51q-13-35 4-51t15 51q-13-35 4-51t15 51q-13-35 4-51t15 51q-13-35 4-51t15 51q-13-35 4-51t15 51q-13-35 4-51t15 51"
      fill="none" stroke="${rust}" stroke-width="3"/>
      ${on?text(42,82,"N",blue)+text(280,82,"S",blue):""}${text(158,146,"Coil around a soft iron core",ink,15)}`,320,178),
      on?"A current in the coil produces a magnetic field.":"Without current, the coil does not produce a magnetic field.");
  }
  return steps("Switch the electromagnet", [["Switch off",()=>state(false)],["Switch on",()=>state(true)]]);
}

function punnett() {
  const panel = node("div", "", "gcse-catchup-punnett");
  const table = node("table");
  table.createCaption().textContent = "Possible offspring genotypes from Aa × Aa";
  for(const [i, values] of [["Gametes","A","a"],["A","AA","Aa"],["a","Aa","aa"]].entries()){
    const row = table.insertRow();
    for(const [j,value] of values.entries()){
      const cell = node(i===0||j===0?"th":"td",value);
      if(i===0||j===0)cell.scope=i===0?"col":"row";
      if(value==="aa")cell.className="gcse-recessive";
      row.append(cell);
    }
  }
  panel.append(table,node("p","Each gamete contributes one allele. The recessive phenotype appears in the highlighted aa box."));
  return panel;
}

const types = {curve,bars,pairs,circuit,web,column,chromatogram,wave,coil,punnett};
export function gcseVisual([type,...args]){
  return type === "custom" ? args[0]() : types[type](args);
}

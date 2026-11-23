import { question } from "./school-catchup-journey.js";
import { arrow, blue, circle, diagram, ink, line, node, picture, rust, text } from "./catchup-models.js";

function check([prompt, answer, reasoning, ...distractors], evidence) {
  const item = question(prompt, answer, reasoning, ...distractors);
  if (evidence) item.reference = {label: "Read the evidence", render: evidence};
  return item;
}

function sequence(year, code, title, hook, idea, options) {
  const {visual, model, guide, independent, retry, higher, earlier} = options;
  const [modelTitle, lines, modelCheck] = model;
  const [guidance, guidedCheck, guideVisual] = guide;
  const [independentCheck, independentVisual] = independent;
  return {
    year, code, title, hook, idea, higher, earlier,
    notice: "Look at the evidence, then follow the worked example.",
    visual: ["custom", visual],
    steps: [
      {...check(modelCheck), worked: {title: modelTitle, lines}},
      {...check(guidedCheck, guideVisual), guide: guidance},
      check(independentCheck, independentVisual)
    ],
    retry: check(retry)
  };
}

function table(title, headers, rows) {
  const container = node("div", "", "writing-data");
  const data = node("table", "", "school-lesson-table");
  data.createCaption().textContent = title;
  const headings = data.createTHead().insertRow();
  for (const label of headers) {
    const cell = node("th", label);
    cell.scope = "col";
    headings.append(cell);
  }
  const body = data.createTBody();
  for (const values of rows) {
    const row = body.insertRow();
    for (const value of values) row.insertCell().textContent = value;
  }
  container.append(data);
  return container;
}

function mains() {
  return picture("Three-core mains cable", diagram(
    "Three insulated cores. Brown is live, blue is neutral and striped green and yellow is earth.",
    '<rect x="18" y="21" width="282" height="118" rx="26" fill="#edf3f2" stroke="#445858" stroke-width="3"/>' +
    line(37,50,166,50,"#805037",10) + text(177,55,"Live · brown",ink,15,"start") +
    line(37,79,166,79,blue,10) + text(177,84,"Neutral · blue",ink,15,"start") +
    line(37,108,166,108,"#287340",10) + line(37,108,166,108,"#ffdc51",7,"7 6") +
    text(177,113,"Earth · striped",ink,15,"start"),320,155),
    "Live and neutral form the working circuit. The earth wire is a safety connection.");
}

function grid() {
  return picture("From a power station to homes", diagram(
    "Electricity travels from a generator to a step-up transformer, through transmission cables, then through a step-down transformer towards homes.",
    text(65,27,"Generator",ink,16)+text(244,27,"Step up",ink,16)+arrow(116,24,199,24)+
    arrow(244,38,244,70)+text(157,91,"High-voltage transmission",blue,16)+
    arrow(65,101,65,128)+text(65,151,"Step down",ink,16)+arrow(114,146,200,146)+
    text(245,151,"Homes",ink,16),320,169),
    "The step-down stage represents several reductions before the domestic supply reaches homes.");
}

function ivCircuit() {
  return picture("Circuit for a filament lamp", diagram(
    "The supply, ammeter and lamp are in the main loop. The voltmeter is on a branch connected across the two lamp terminals.",
    '<path d="M145 24H43V99H278V24H163 M106 99V151H216V99" fill="none" stroke="currentColor" stroke-width="2.5"/>' +
    line(145,13,145,35)+line(163,17,163,31)+text(157,52,"Variable dc supply",ink,15)+
    circle(68,99,13,"white")+text(68,104,"A")+circle(160,99,17,"white")+
    line(150,89,170,109)+line(150,109,170,89)+circle(106,99,3,ink)+circle(216,99,3,ink)+
    circle(160,151,13,"white")+text(160,157,"V"),320,180),
    "One meter measures the current through the lamp. The other measures the potential difference across it.");
}

function motionGraph(title, unit, values, max) {
  const points = values.map(([t,y]) => [47 + t * 36, 142 - y * 106 / max]);
  const path = points.map(point => point.join(",")).join(" ");
  const ticks = [0, max / 2, max].map(v => {
    const y = 142 - v * 106 / max;
    return line(43,y,47,y)+text(39,y+4,String(v),ink,13,"end");
  }).join("");
  const times = values.map(([t], i) => text(points[i][0],161,String(t),ink,13)).join("");
  const description = values.map(([t,y]) => t + " seconds: " + y + " " + unit).join(". ");
  return picture(title, diagram(title + ". " + description,
    line(47,28,47,142)+line(47,142,286,142)+ticks+times+text(168,182,"Time (s)",ink,15)+
    text(48,18,title,ink,15,"start")+
    '<polyline points="' + path + '" fill="none" stroke="' + blue + '" stroke-width="3"/>'+
    points.map(([x,y]) => circle(x,y,3,rust)).join(""),320,193));
}

function pairedMotion() {
  const panel = node("div");
  panel.append(motionGraph("Distance (m)", "metres", [[0,0],[2,4],[4,4]], 4),
    motionGraph("Velocity (m/s)", "metres per second", [[0,2],[2,2],[4,0]], 4));
  return panel;
}

export const priorityCatchup = {
  "domestic-electricity": sequence(10,"P2","Mains electricity and electrical safety",
    "What makes a mains supply different from a cell?",
    "UK mains is an alternating supply of about 230 V at 50 Hz. In a three-core cable, each wire has a different job.", {
      visual: mains,
      earlier: ["Current in series and parallel","parallel-circuits"],
      model: ["Trace the normal and fault paths", [
        "A cell gives a potential difference that stays in one direction. The polarity of an alternating supply reverses. At 50 Hz it completes 50 cycles each second.",
        "The live wire is at an alternating potential difference relative to earth. The neutral wire, normally near earth potential, completes the working circuit.",
        "If live touches an earthed metal case, the low-resistance earth path allows a large fault current. A fuse or circuit breaker can disconnect the supply."
      ], ["What does 50 Hz describe?","50 complete cycles per second","Hertz counts complete cycles per second.",
        ["50 volts","Volts measure potential difference."],["50 cycles per minute","Hertz uses seconds."]]],
      guide: ["Trace the path from the live wire to the metal case. Which wire provides the fault path?",
        ["Which core provides a low-resistance path from the metal case to earth?","Earth","The protective earth provides the fault path.",
          ["Neutral","Neutral completes the appliance’s ordinary working circuit."],["Live","Live supplies the alternating potential difference."]]],
      independent: [["A switch is open, so a machine has stopped. Why can the live wire on the supply side of the switch still be dangerous?",
        "It still has a large potential difference relative to earth.","An open switch stops the normal current. Touching the supply-side live wire can create a new path to earth.",
        ["An open switch makes every wire 0 V.","The live wire before the switch is still connected to the supply."],
        ["The earth wire normally supplies the working current.","The earth wire normally carries no current."]]],
      retry: ["What can happen if a person provides a path from live to earth?","A dangerous current can flow through the person.",
        "The large potential difference can drive a current through the new path.",["The live wire switches to 0 V.","An unintended path can carry fault current."]]
    }),

  "national-grid": sequence(10,"P2","Why the National Grid uses high voltage",
    "Why raise the voltage for a long journey and lower it afterwards?",
    "At the same transmitted power, higher potential difference means smaller current. Smaller current reduces heating in the transmission cables.", {
      visual: grid,
      earlier: ["Resistance, current, and electrical power","circuit-resistance"],
      model: ["Compare two lines carrying 24 kW", [
        "Use P = VI, so I = P ÷ V. Convert 24 kW to 24,000 W.",
        "At 2,000 V the current is 12 A. At 12,000 V the current is 2 A.",
        "For the same cable resistance, heating power is I²R. The 2 A line transfers less energy to the surroundings each second.",
        "Step-up transformers raise the transmission potential difference. Step-down transformers lower it before consumers use the supply."
      ], ["What stays the same in the comparison?","The transmitted power","The comparison fixes power so you can examine the effect of voltage on current.",
        ["The current","Dividing the same power by a larger voltage gives a smaller current."],["The voltage","The two transmission voltages are different."]]],
      guide: ["Use I = P ÷ V for each line. Compare the results for cables with the same resistance.",
        ["Two lines transmit 36 kW at 3 kV and 9 kV. Which comparison is correct?","12 A at 3 kV and 4 A at 9 kV.",
          "36,000 ÷ 3,000 = 12 and 36,000 ÷ 9,000 = 4.",
          ["4 A at 3 kV and 12 A at 9 kV.","Power is fixed, so current falls as potential difference rises."],
          ["12 A in both lines.","Both denominators must come from the individual line voltages."]]],
      independent: [["A wind farm sends power to a distant town. Which change at the wind farm reduces cable heating for the same power delivery?",
        "Use a step-up transformer so the cable current is smaller.","With P fixed, increasing V lowers I. A smaller I gives less heating for the same cable resistance.",
        ["Use a step-up transformer so the cable current is larger.","This would confuse fixed power with fixed resistance across a single component."],
        ["Use a step-down transformer so the cable current is smaller.","Lower transmission voltage requires more current for the same transmitted power."]]],
      retry: ["Two equal-resistance cables carry 4 A and 8 A. Which has greater heating power?","The 8 A cable.","Heating power increases with I² at fixed R.",
        ["The 4 A cable.","Lower current reduces heating at the same resistance."]],
      higher: ["Quantitative stretch","Line A carries 12 A and line B carries 2 A. Their resistances are the same. How many times as much heating power does line A dissipate?",
        "36 times. The resistances cancel in the ratio, leaving 12² ÷ 2² = 36."]
    }),

  "solution-concentration": sequence(10,"C3","Concentration in g/dm³",
    "Can a smaller sample contain more dissolved substance per unit volume?",
    "Mass concentration is the mass of dissolved substance divided by the volume of the solution.", {
      visual: () => table("Two solution samples",["Sample","Mass of solute (g)","Volume of solution (cm³)"],
        [["A","6","250"],["B","10","500"]]),
      earlier: ["Conservation of mass and formula mass","mass-conservation"],
      model: ["Compare equal volumes by calculating g/dm³",[
        "One dm³ is 1,000 cm³. Divide each volume in cm³ by 1,000: 250 cm³ is 0.250 dm³ and 500 cm³ is 0.500 dm³.",
        "Sample A: 6 ÷ 0.250 = 24 g/dm³. Sample B: 10 ÷ 0.500 = 20 g/dm³.",
        "A has the greater mass of solute in each dm³ of solution, even though the sample contains less solute in total."
      ], ["Which volume is 150 cm³?","0.150 dm³","Divide cm³ by 1,000.",
        ["150 dm³","The numerical value decreases when you use a larger volume unit."],["1.50 dm³","This would represent 1,500 cm³."]]],
      guide: ["Convert to dm³ first. Then divide the mass of solute by the new volume.",
        ["A solution contains 8 g of solute in 200 cm³. What is its mass concentration?","40 g/dm³","8 ÷ 0.200 = 40.",
          ["0.04 g/dm³","8 ÷ 200 gives g/cm³."],["1.6 g/dm³","Divide by the solution volume."]]],
      independent: [["A laboratory needs a solution of at least 18 g/dm³. Which sample from the table meets that requirement?",
        "Only sample X.","X contains 4.0 ÷ 0.200 = 20 g/dm³. Y contains 7.5 ÷ 0.500 = 15 g/dm³.",
        ["Only sample Y.","Y has more solute overall but less per dm³."],
        ["Both samples.","Compare both calculated concentrations with 18 g/dm³."]],
        () => table("Samples from two tanks",["Sample","Solute mass (g)","Solution volume (cm³)"],
          [["X","4.0","200"],["Y","7.5","500"]])],
      retry: ["Two 0.5 dm³ samples contain 5 g and 10 g of solute. Which is more concentrated?","The sample with 10 g.",
        "At the same volume, more solute means a greater mass concentration.",["The sample with 5 g.","At equal volumes, compare solute masses directly."]],
      higher: ["Higher Tier","A student dilutes 100 cm³ of a 30 g/dm³ solution to 250 cm³ without losing solute. Find the new concentration.",
        "12 g/dm³. The solute mass is 30 × 0.100 = 3 g. The new concentration is 3 ÷ 0.250 = 12 g/dm³."]
    }),

  "current-potential-difference": sequence(10,"P2","The current–potential difference practical",
    "How can you tell whether doubling potential difference doubles current?",
    "Measure current through a component and potential difference across it. Compare several pairs to identify the pattern.", {
      visual: ivCircuit,
      earlier: ["Resistance, current, and electrical power","circuit-resistance"],
      model: ["Choose a circuit and make a fair comparison",[
        "Put the ammeter in series with the component. Put the voltmeter in parallel across its terminals.",
        "Vary the potential difference and record several pairs of readings. Use the same component throughout each set.",
        "At constant temperature, an ohmic resistor gives a straight line through the origin on a graph of current against potential difference.",
        "A filament warms as current increases. Its resistance rises, so doubling the potential difference need not double the current."
      ], ["Where should the voltmeter go?","Across the component","It measures a potential difference between the two terminals.",
        ["In series with the lamp","That is the position of the ammeter."],["Across the switch only","That would measure across the wrong component."]]],
      guide: ["Check whether multiplying potential difference by a factor multiplies current by the same factor.",
        ["Which evidence is consistent with an ohmic resistor at constant temperature?",
          "From 1 to 3 V, current rises from 0.10 to 0.30 A.","Both quantities treble and V ÷ I stays at 10 Ω.",
          ["From 1 to 3 V, current rises from 0.10 to 0.15 A.","Potential difference trebles but current increases by less."],
          ["From 1 to 3 V, current remains at 0.10 A.","The resistance inferred from V ÷ I would increase."]]],
      independent: [["What conclusion is supported for the sealed lamp in the table as the potential difference increases?",
        "Its resistance increases.","R = V ÷ I is 5 Ω at 1 V and 10 Ω at 3 V. The higher resistance is consistent with a hotter filament.",
        ["Its resistance decreases because the current increases.","Compare the ratio V ÷ I, not the direction of change in current alone."],
        ["Its resistance is constant because both readings increase.","The two readings do not increase in the same proportion."]],
        () => table("Readings for a sealed lamp",["Potential difference (V)","Current (A)"],[["1.0","0.20"],["3.0","0.30"]])],
      retry: ["A pupil connects the ammeter across a component. What should they change?","Put it in series with the component.",
        "The current through the component must also flow through the ammeter.",["Swap the component for a lamp.","The meter connection is the problem."]]
    }),

  "dynamic-equilibrium": sequence(11,"C6","What changes at dynamic equilibrium?",
    "Can two reactions keep happening while the amounts stay steady?",
    "In a closed system at dynamic equilibrium, forward and reverse reactions continue at equal rates. Concentrations stay constant and may be unequal.", {
      visual: () => table("A reversible reaction in a closed vessel",["Time (min)","Forward rate (arbitrary units)","Reverse rate (arbitrary units)"],
        [["0","8","0"],["2","5","3"],["4","4","4"],["6","4","4"]]),
      earlier: ["Rates, collisions, and reversible reactions","reaction-rate"],
      model: ["Track two directions at once",[
        "Start with mostly reactant. The forward reaction is initially faster, so the product concentration rises.",
        "As products form, the reverse reaction speeds up. As reactant is used up, the forward reaction slows.",
        "At 4 minutes in this model, the rates match. Product is made and used at the same rate, so there is no net change."
      ], ["What is still happening at minute 6?","Both reactions continue at equal rates.","Both rates are 4. Equal rates can be non-zero.",
        ["Only the forward reaction continues.","The reverse rate is also 4."],["Both reactions have stopped.","Constant concentrations can result from balanced rates."]]],
      guide: ["Read the row and compare the two rate columns. Decide which direction is making the larger change.",
        ["What happens to the product concentration at minute 2?","It is increasing.","The forward reaction produces product faster than the reverse reaction uses it.",
          ["It is decreasing.","The reverse rate is smaller than the forward rate."],["It is constant.","Equal rates would be needed for no net change."]]],
      independent: [["A different sealed vessel has steady concentrations of 0.2 mol/dm³ of reactant and 0.8 mol/dm³ of product. Evidence shows molecules still change in both directions. What can you infer?",
        "The forward and reverse rates are equal.","Constant concentrations with both directions continuing show dynamic equilibrium. The concentrations themselves can differ.",
        ["The rates must be in a 1:4 ratio.","Concentrations do not give that ratio for the two rates at equilibrium."],
        ["The vessel cannot be at equilibrium until concentrations are equal.","Equilibrium requires equal rates, not equal concentrations."]]],
      retry: ["What is constant once a closed system reaches dynamic equilibrium?","The concentration of each substance.",
        "Each substance is formed at the same rate it is used overall.",["The amounts must each be zero.","Dynamic equilibrium can contain reactants and products."]],
      higher: ["Higher Tier","The forward reaction is exothermic. Predict the effect of increasing the temperature and explain the change in yield.",
        "Heating favours the endothermic reverse reaction, which absorbs energy. The equilibrium position shifts towards the reactants, decreasing the product yield."]
    }),

  "motion-graphs": sequence(11,"P5","Distance–time and velocity–time graphs",
    "Why can a horizontal line show motion in one graph and rest in another?",
    "Read the vertical axis before interpreting the gradient. It shows you which quantity is changing.", {
      visual: pairedMotion,
      earlier: ["Resultant forces and motion","forces-motion"],
      model: ["Read the axis, choose the change, divide by time",[
        "Distance–time: on the first graph the distance rises from 0 to 4 m in 2 s. Speed = 4 ÷ 2 = 2 m/s. On the horizontal section, distance stays fixed.",
        "Velocity–time: on the second graph velocity stays at 2 m/s for the first 2 s. A zero gradient means zero acceleration, while the object is moving.",
        "On the final section, acceleration = change in velocity ÷ time = (0 − 2) ÷ 2 = −1 m/s²."
      ], ["What does the first graph’s horizontal section show?","The object is stationary.","The distance reading does not change.",
        ["Constant non-zero speed.","A non-zero speed needs a changing distance."],["Acceleration.","Distance stays fixed across the interval."]]],
      guide: ["Read the starting and final velocities before dividing their difference by the time interval.",
        ["Evaluate the acceleration from 0 s to 4 s.","−0.5 m/s²","Velocity changes by −2 m/s in 4 s.",
          ["0 m/s²","The gradient is negative on this section."],["−2 m/s²","−2 m/s is the velocity change. Divide by 4 s to find the acceleration."]],
        () => motionGraph("Velocity (m/s)", "metres per second", [[0,4],[4,2]], 4)],
      independent: [["A trolley’s graph has the horizontal section shown. Another pupil says the trolley is stationary. Evaluate their claim.",
        "It is moving at a constant 4 m/s.","The axis shows velocity, which is positive and constant. The acceleration is zero.",
        ["It is stationary because the gradient is zero.","Zero gradient means velocity does not change, not that velocity is zero."],
        ["It accelerates at 4 m/s².","The height gives velocity; the gradient gives acceleration."]],
        () => motionGraph("Velocity (m/s)", "metres per second", [[0,0],[2,4],[5,4]], 4)],
      retry: ["A distance–time graph rises 15 m in 3 s on a straight section. What is the speed?","5 m/s",
        "Speed is the distance gradient, 15 ÷ 3.",["45 m/s","Divide distance by elapsed time."]],
      higher: ["Higher Tier","A trolley moves from 0 to 4 m/s in 2 s at constant acceleration, then moves at 4 m/s for 3 s. Find its total distance. How could you estimate the speed at an instant on a curved distance–time graph?",
        "The area under the velocity–time graph is (½ × 2 × 4) + (3 × 4) = 16 m. On a curved distance–time graph, draw a tangent and calculate its gradient at that instant."]
    })
};

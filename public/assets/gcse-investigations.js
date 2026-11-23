import {sequence, table} from "./gcse-catchup-priority.js";

function investigation(year, code, title, idea, evidence, lines, guided, transfer, retry, higher) {
  const visual = () => table(...evidence);
  return sequence(year, code, title, guided[0], idea, {
    visual, model: ["Work through the investigation", lines, guided],
    guide: ["Use the worked evidence to justify your choice.", retry, visual],
    independent: [transfer], retry: guided, higher
  });
}

export const investigations = {
  "amylase-endpoint": investigation(10,"B2","Measuring amylase activity at different pH values",
    "Compare the time needed to digest a fixed amount of starch. Buffer sets the pH. A water bath keeps temperature constant.",
    ["First sample that stayed orange-brown",["pH","Time (s)"],[["5","80"],["7","40"],["9","100"]]],
    ["Equilibrate equal volumes and concentrations of enzyme and starch at the same temperature. Mix with the chosen buffer and start timing.",
     "Every 10 s transfer a drop to fresh iodine. Blue-black shows starch remains. The first orange-brown sample is the recorded endpoint.",
     "At pH 7 the reciprocal time is 1 ÷ 40 = 0.025 s⁻¹. At pH 5 it is 0.0125 s⁻¹. For equal starting starch amounts this estimates relative activity.",
     "The endpoint occurred between the last positive test and the first negative one. Shorter sampling intervals reduce this uncertainty."],
    ["Which pH gave the greatest estimated activity?","7","The same starch amount disappeared in the shortest time.",["9","The longest endpoint time gives the smallest reciprocal."]],
    ["A class tests pH 5 at 15 °C and pH 7 at 30 °C. What would let them attribute a rate difference to pH?",
     "Repeat both pH conditions at one controlled temperature.","Temperature can alter enzyme activity independently of pH.",
     ["Repeat the original pair more times.","Repeats leave the temperature difference in every comparison."],["Keep it fair.","Specify the water-bath temperature as the control and explain its effect on activity."]],
    ["Samples at 30 s and 40 s are blue-black and orange-brown respectively. What is justified?","Starch became undetectable between the tests.","Sampling only at intervals limits endpoint resolution.",["Digestion finished exactly at 40 s.","The preceding 10 seconds were unsampled."]]),
  "ruler-drop": investigation(10,"B5","Reaction time and ruler-drop evidence","A ruler falls further during a longer reaction time. Compare repeated catches under consistent conditions.",
    ["Distance fallen before catch (cm)",["Participant","Trial 1","Trial 2","Trial 3"],[["A","23","20","17"],["B","18","19","17"]]],
    ["Align zero with the top of the open thumb and finger. Release the vertical ruler without warning. Read the distance at the catch and use the conversion scale for reaction time.",
    "A averaged 20 cm and B averaged 18 cm. B caught it sooner on average in these trials. One pair cannot represent all people.",
    "Use the same hand, posture and starting gap. Give practice trials and vary the release delay to reduce anticipation."],
    ["Why align zero with the fingers?","So the reading measures distance fallen.","A displaced starting mark introduces an offset.",["It makes everyone react at the same speed.","Alignment controls measurement, not individual responses."]],
    ["Everyone completes quiet trials before music trials. Later catches are quicker. What limits the claim that music helped?","Practice coincides with music. Counterbalance the order across participants.","An order effect could account for the improvement.",["Average more quiet-first trials.","The order remains confounded."]],
    ["Which conclusion fits A’s readings?","Catches became shorter over these three trials.","Practice is possible; these data alone cannot establish its cause.",["A has a fixed reaction time of 20 seconds.","20 is a distance in centimetres."]]),
  "quadrat-evidence": investigation(10,"B7","Quadrats, transects and abundance","Choose random positions to estimate a whole population. Use regular intervals along a transect to investigate a gradient.",
    ["Transect from a hedge",["Distance (m)","Plants per 1 m²"],[["0","2"],["5","4"],["10","7"]]],
    ["For a whole-field estimate, choose pairs of random grid coordinates before looking at plants. Use the same quadrat area and boundary rule each time.",
    "Four random 1 m² quadrats contain 2, 4, 5 and 5 plants. Mean density is 4 per m². A 200 m² field is estimated to contain 800 plants.",
    "For a gradient, place quadrats at fixed distances from the hedge. Repeat parallel transects to capture variation."],
    ["Why use random coordinates across the field?","To reduce location-selection bias.","Visually choosing patches can overrepresent dense growth.",["To guarantee an exact total.","Samples still vary."]],
    ["All quadrats lie along one stream bank. An investigator claims the entire meadow has high plant density because of moisture. Evaluate this.","The sample describes the bank. Sample the whole meadow randomly for abundance and measure moisture across replicated transects for association.","Bank sites may differ in shade and soil as well as moisture.",["More quadrats along the same bank prove moisture caused growth.","Narrow coverage and other variables still limit the claim."]],
    ["What does the hedge transect suggest?","Counts increased with distance along this line.","A trend along one line needs replication.",["The hedge poisons the plants.","The observations do not identify a causal mechanism."]])
};

Object.assign(investigations, {
  "electrode-evidence": investigation(10,"C4","Electrolysis from ions to observations","In a molten ionic compound the mobile ions come from the compound. In water, hydrogen and hydroxide ions can also contribute to electrode products.",
    ["Aqueous copper sulfate and inert graphite electrodes",["Electrode","Observation"],[["Negative","Reddish solid forms"],["Positive","Gas relights a glowing splint"]]],
    ["Connect two separate inert electrodes to a dc supply and immerse both in the electrolyte. Collect the products separately.",
    "Positive copper ions move towards the negative cathode and gain electrons to form copper metal. The positive anode attracts anions. With sulfate solution and inert electrodes, oxygen forms there.",
    "A glowing splint relighting identifies oxygen. Bubbles alone would show gas formation without identifying the gas."],
    ["Which observation supports oxygen formation?","A glowing splint relights.","This is the characteristic test for oxygen.",["Bubbles appear.","Several gases produce bubbles."]],
    ["Molten magnesium chloride produces magnesium at the cathode. Can the same prediction be made for its aqueous solution with inert electrodes?","No. Hydrogen forms in the aqueous case because magnesium is more reactive than hydrogen.","Water provides an alternative source of cathode product.",["Yes, all positive metal ions always form metals.","That overlooks competition in aqueous electrolytes."]],
    ["Which electrode attracts copper ions?","The negative cathode.","Opposite charges attract.",["The positive anode.","Copper ions carry a positive charge."]],
    ["Higher Tier","Write the half-equations for copper deposition and oxygen formation from hydroxide ions.","Cu²⁺ + 2e⁻ → Cu. At the anode, 4OH⁻ → O₂ + 2H₂O + 4e⁻. Atoms and total charge balance in each equation."]),
  "reacting-masses": investigation(10,"C3","Reacting masses and limiting reactants · Higher Tier","Use the balanced equation to compare amounts in moles. The reactant that runs out sets the maximum product.",
    ["2Mg + O₂ → 2MgO",["Particle model","Count"],[["Mg atoms available","6"],["O₂ molecules available","4"]]],
    ["Two Mg atoms react with one O₂ molecule. Six Mg atoms use three O₂ molecules, leaving one O₂ molecule. Both sides conserve each kind of atom.",
    "Now compare masses: 4.8 g Mg ÷ 24 g/mol = 0.20 mol. 4.8 g O₂ ÷ 32 g/mol = 0.15 mol. Only 0.10 mol O₂ is needed, so Mg limits the yield.",
    "0.20 mol Mg gives 0.20 mol MgO. Maximum mass = 0.20 × 40 = 8.0 g."],
    ["What limits product in the particle model?","Magnesium","Three reaction groups use all six Mg atoms.",["Oxygen because there are fewer molecules.","Use the coefficient ratio before comparing counts."]],
    ["A batch contains 2.4 g Mg and 1.6 g O₂. Which change alone can increase the theoretical yield?","Increase both reactants.","0.10 mol Mg and 0.050 mol O₂ are exactly in the required ratio. Adding just one leaves the other limiting.",["Add magnesium only.","All the available oxygen is already required."],["Add oxygen only.","All the available magnesium is already required."]],
    ["Why convert grams to moles?","Equation coefficients compare numbers of particles or amounts in moles.","Different substances have different molar masses.",["Coefficients are ratios of masses in grams.","One mole of Mg and one mole of oxygen molecules have different masses."]]),
  "temperature-evidence": investigation(10,"C5","What a temperature change can show","Measure the temperature change of the mixture as energy transfers between reaction and surroundings.",
    ["Equal reactant amounts and starting temperatures",["Method","Start (°C)","Maximum (°C)"],[["Glass beaker","20","26"],["Insulated cup with lid","20","29"]]],
    ["Subtract initial temperature from maximum: +6 °C versus +9 °C. An exothermic reaction warms the mixture. An endothermic reaction can cool it.",
    "A lid and insulation reduce energy transfer to the surroundings. Stir and monitor temperature to detect the peak or minimum. Repeat to examine variation.",
    "Use equal volumes and concentrations and the same initial temperature. A different temperature change alone does not establish a different energy release per mole."],
    ["Which method recorded the larger rise?","Insulated cup","29 − 20 = 9 °C.",["Glass beaker","Its rise was 6 °C."]],
    ["A pupil reads a warming reaction only two minutes after mixing. The peak has already passed. Which change improves the estimate?","Record temperature throughout mixing and cooling to capture the maximum.","The delayed reading underestimates the peak rise.",["Use better equipment.","Specify which measurement misses the peak and how the change captures it."],["Repeat the same delayed reading.","Repeats cannot recover an unmeasured peak."]],
    ["Why should both reactants start at the same temperature?","Mixing alone could otherwise change the measured temperature.","A temperature difference introduces heat transfer independent of the reaction.",["It ensures no heat escapes.","Heat can still transfer through the container."]])
});

import {question} from "./school-catchup-journey.js";
import {investigationFigure} from "./gcse-investigation-figures.js";
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
    ["A batch contains 2.4 g Mg and 1.6 g O₂. Which adjustment can increase the theoretical yield?","Increase both reactants.","0.10 mol Mg and 0.050 mol O₂ are exactly in the required ratio. Adding just one leaves the other limiting.",["Add magnesium only.","All the available oxygen is already required."],["Add oxygen only.","All the available magnesium is already required."]],
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

Object.assign(investigations, {
  "spring-evidence": investigation(11,"P5","Force, length and spring extension","Measure length from the same fixed reference. Subtract the unloaded length to obtain extension.",
    ["Vertical spring beside a fixed ruler",["Force (N)","Length (cm)"],[["0","8"],["1","10"],["2","12"],["3","14"]]],
    ["Clamp the same spring beside a vertical ruler. Align your eye with the pointer after oscillations settle.",
    "At 2 N, extension = 12 − 8 = 4 cm. Plot extension against force. Here the straight line passes through the origin and each newton adds 2 cm.",
    "A departure from the straight line marks departure from proportionality. Remove the load and check the original length to test whether deformation was elastic."],
    ["At 3 N what is the extension?","6 cm","14 − 8 = 6 cm.",["14 cm","That is loaded length."]],
    ["A second spring extends 0, 3, 6 and 11 mm at 0, 1, 2 and 3 N. What conclusion is supported?","By 3 N the data depart from proportionality. Unload the spring to test for permanent deformation.","The earlier pattern predicts 9 mm. Nonlinearity alone does not demonstrate permanent extension.",["Permanent deformation definitely starts at exactly 2 N.","There are no intermediate measurements or unloading data."]],
    ["Why read at pointer height?","To reduce parallax.","Viewing at an angle can shift the apparent position.",["To reduce the applied force.","Eye position does not change the load."]]),
  "trolley-evidence": investigation(11,"P5","Separating force and mass in a trolley investigation","Acceleration depends on resultant force and total moving mass. Isolate one variable to investigate its effect.",
    ["Trolley joined by a string over a pulley to a hanger",["Driving weight (N)","Total moving mass (kg)","Acceleration (m/s²)"],[["0.2","0.8","0.24"],["0.4","0.8","0.48"]]],
    ["Use a level track, low friction and a consistent release. Light gates and a data logger can measure acceleration.",
    "Move a slotted mass from trolley to hanger. Driving weight rises but total moving mass stays constant. Account for friction when interpreting resultant force.",
    "To test mass instead, keep the driving force fixed and add mass to the trolley. Check friction remains small and comparable."],
    ["What is held constant in the table?","Total moving mass","Include trolley, hanger and carried masses.",["Driving force","The hanging weight changes."]],
    ["A pupil tests the effect of force by adding new masses directly to the hanger. Identify the flaw and improve the test.","Both driving force and total mass increase. Transfer masses from trolley to hanger instead.","Increased mass opposes the acceleration increase expected from the larger force. The original method cannot isolate force.",["Repeat each run and keep adding new masses.","Repeats do not separate the two changing variables."]],
    ["Why use the same release procedure?","A push could change the measured motion.","Release without giving the trolley an extra force.",["It makes the trolley mass constant.","Mass depends on the apparatus and added loads."]]),
  "wave-measurement": investigation(11,"P6","Measuring waves across space and time","Wavelength measures the distance between successive points in phase. Frequency counts complete oscillations per second.",
    ["A ripple tank viewed from above",["Observation","Reading"],[["First crest to fifth crest","24 cm"],["Oscillations at a fixed marker","10 in 5 s"]]],
    ["Measure across several crests in a still image with a calibrated scale. From first crest to fifth there are four intervals: wavelength = 24 ÷ 4 = 6 cm.",
    "Time several complete oscillations at one fixed point. Frequency = 10 ÷ 5 = 2 Hz. Wave speed = 2 × 0.06 = 0.12 m/s.",
    "Amplitude is the maximum displacement from equilibrium. A floating marker oscillates while the wave pattern moves across the tank."],
    ["How many wavelengths separate the first and fifth crests?","Four","Count spaces between crests.",["Five","Five positions enclose four intervals."]],
    ["A rope marker rises and falls 12 times in 6 s. Crests are 0.8 m apart. Does the marker travel along the rope at 1.6 m/s?","The pattern travels at 1.6 m/s. The marker oscillates about its own position.","Frequency is 2 Hz; wave speed is 2 × 0.8. Local displacement differs from propagation.",["Yes, each crest carries the same marker along.","A crest passes successive points on the rope."]],
    ["Why measure four intervals rather than one?","The same reading uncertainty is a smaller fraction of the total distance.","Divide the measured span by the number of intervals.",["It removes every scale error.","A miscalibrated scale still biases every measurement."]]),
  "infrared-evidence": investigation(11,"P6","Surface finish and infrared transfer","Compare surfaces at equal temperature, area and distance. A good absorber of infrared is also a good emitter under comparable conditions.",
    ["Detector facing equal-sized faces of a hot metal cube",["Face","Detector reading (arbitrary units)"],[["Matt black","78"],["Polished metal","24"]]],
    ["Hot water keeps the faces of one cube at similar temperatures. Point the same infrared detector squarely at each face from the same distance.",
    "The larger reading supports greater infrared emission from the matt black surface under these conditions. Repeat readings while monitoring cube temperature.",
    "For absorption, use identical plates with different finishes at the same distance from one source. Compare their temperature rises over the same time."],
    ["What is measured in the cube experiment?","The detector response to infrared from each face.","Keep background and geometry comparable.",["The rate of water evaporation.","The detector measures radiation."]],
    ["A black thin aluminium tray warms more than a thick shiny steel block under a lamp. How should the claim about surface finish be tested?","Compare identical plates differing only in finish, with equal initial temperatures and lamp distances.","Mass, material and geometry can all affect warming. A temperature rise alone does not isolate the finish.",["Repeat using the same different objects.","Repeats leave the confounding differences in place."]],
    ["Why keep the detector distance fixed?","Changing distance can change the radiation reaching the detector.","A change in reading should reflect the tested surface.",["Distance changes the colour of the face.","Its finish remains the same."]])
});

for (const [id, activity] of Object.entries(investigations)) {
  if (id !== "reacting-masses") activity.steps[0].worked.visual = () => investigationFigure(id);
}
investigations["quadrat-evidence"].steps[2].reference = {
  label: "Meadow sampling locations", render: () => investigationFigure("quadrat-evidence")
};

// A supported retry checks the same reasoning with fresh evidence.
const retryItems = {
  "amylase-endpoint": ["A group doubles enzyme concentration only at pH 8. Can its faster endpoint establish a pH effect?", "No. Match enzyme concentration across pH values.", "More enzyme can change the rate independently.", ["Yes, because the buffer was accurate.", "Buffer controls pH only."]],
  "ruler-drop": ["One group is warned before each drop. Can you compare its reaction time with an unwarned group?", "Use the same unpredictable release for both groups.", "Anticipation can shorten the distance before the catch.", ["Convert both distances to seconds first.", "Conversion cannot remove a difference in release procedure."]],
  "quadrat-evidence": ["A class counts daisies only near gates. How should it estimate whole-field density?", "Use random coordinates across the whole field.", "Gateways can have different trampling and plant cover.", ["Count the same gateways twice.", "Repeats still omit the field interior."]],
  "electrode-evidence": ["Bubbles appear at the negative electrode in aqueous sodium chloride. Which evidence supports hydrogen?", "A sample gives a squeaky pop with a lit splint.", "Gas appearance alone cannot identify the product.", ["A glowing splint relights.", "That identifies oxygen."]],
  "reacting-masses": ["For 2H₂ + O₂ → 2H₂O, a tank contains 4 mol H₂ and 3 mol O₂. Which addition can increase yield?", "Add hydrogen.", "Only 2 mol oxygen are needed initially, so oxygen remains.", ["Add oxygen.", "Hydrogen has already run out."]],
  "temperature-evidence": ["A cooling reaction is read after the cup has started warming again. What error results?", "The measured temperature fall is too small.", "Record the minimum during the reaction.", ["The fall is too large.", "Warming moves the reading closer to its starting value."]],
  "spring-evidence": ["A curved loading graph returns to zero extension after unloading. What does that show?", "The spring recovered its original length despite the nonlinear region.", "Elastic recovery and proportionality are separate observations.", ["Any curve proves permanent deformation.", "Permanent extension must remain after unloading."]],
  "trolley-evidence": ["To investigate increasing mass, a pupil keeps adding weights to the hanger. What should change?", "Keep the hanger fixed and add mass to the trolley.", "With small comparable friction this varies moving mass at approximately constant resultant force.", ["Keep the trolley unchanged.", "The hanger also changes the driving weight."]],
  "wave-measurement": ["A photo shows 1.2 m from the first crest to the fourth. What is the wavelength?", "0.40 m", "Three complete intervals fit between four successive crests.", ["0.30 m", "Divide by the number of intervals."]],
  "infrared-evidence": ["A detector reads a shiny face from twice the distance used for a matt face. What improvement matters?", "Repeat with the same detector distance and angle.", "Geometry affects how much radiation reaches the detector.", ["Average ten readings at the original distances.", "The systematic difference remains."]]
};
for (const [id, item] of Object.entries(retryItems)) investigations[id].retry = question(...item);

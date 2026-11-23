import { question } from "./school-catchup-journey.js";
import { priorityCatchup } from "./gcse-catchup-priority.js";

function lesson(year, code, title, hook, notice, idea, visual, stages, independent, retry, higher) {
  return {year, code, title, hook, notice, idea, visual, higher,
    steps: [...stages.map(([heading, explanation, ...task]) => ({...question(...task), teach:[heading, explanation]})),
      question(...independent)], retry:question(...retry)};
}

export const year10Catchup = {
  "vaccine-memory": lesson(10, "B3", "Vaccination and the immune response",
    "How can a vaccine protect you before you meet a pathogen?",
    "Compare the first and later responses. Which needs less time to build up?",
    "Vaccination prepares a specific immune response. After later exposure to the same pathogen, antibodies can be made more quickly.",
    ["curve","Antibody level after exposure","Time after exposure","Antibody level",[
      ["First response",[[0,0],[1,0],[2,1],[3,3],[4,2],[5,1]]],
      ["Response after vaccination",[[0,0],[1,3],[2,5],[3,4],[4,3],[5,2]]]],"Illustrative responses for the same antigen."],
    [
      ["Specific defences","Skin and mucus help keep pathogens out. White blood cells can produce antibodies that bind to particular antigens.",
        "What do antibodies recognise?","Specific antigens","Antibodies bind particular antigens.",["Any body cell","Recognition depends on the antigen, not whether the object is a cell."],["The same feature on every pathogen","Different pathogens can carry different antigens."]],
      ["Vaccination","A vaccine can introduce pathogen antigens safely or provide instructions for making them. This activates a specific immune response without the disease itself.",
        "Why can a vaccinated pupil respond sooner to the real pathogen?","Their immune system has already responded to its antigens.","The previous response prepares the immune system to respond faster.","The vaccine kills any pathogen on contact.","Vaccines work as antibiotics."],
      ["Treatment and prevention","Vaccines help prevent disease. Antibiotics can treat susceptible bacterial infections. Viruses reproduce inside cells and lack the bacterial targets that antibiotics act on.",
        "Why are antibiotics unsuitable for an ordinary viral cold?","The virus lacks the bacterial targets of antibiotics.","The targets antibiotics act on are bacterial, so they do not treat viruses.","The virus has not been exposed to a vaccine.","Antibiotics only work after a fever."]
    ],
    ["A vaccinated person meets a different pathogen. Why might their existing antibodies give little protection?","Those antibodies may not bind to the new pathogen’s antigens.","Immune recognition depends on whether the antibodies bind the particular antigens.","A person can make only one antibody ever.","Vaccines destroy white blood cells."],
    ["A vaccine protects against pathogen A. What makes a faster response to A likely?","A previous immune response to its antigens","Vaccination prepares a specific response.","The skin has become thicker","All bacteria in the body have died."]),

  "photosynthesis-limits": lesson(10,"B4","Photosynthesis and limiting factors",
    "Why can adding more light stop helping a plant?",
    "Compare the length of the bars. Look for a change in light that does not change the rate.",
    "Photosynthesis transfers energy from light and makes glucose from carbon dioxide and water. Other factors can limit the rate as light increases.",
    ["bars","Oxygen collected each minute","Identical pondweed at three light levels",[["Low light","2 cm³",2],["Medium light","5 cm³",5],["High light","5 cm³",5]]],
    [
      ["Inputs and products","Chlorophyll absorbs light. Photosynthesis uses carbon dioxide and water to make glucose and oxygen. Glucose can be used in respiration or converted to starch.",
        "Which gas does photosynthesis produce?","Oxygen","Oxygen is a product of photosynthesis.","Carbon dioxide","Nitrogen"],
      ["Read the plateau","At low light, more light increased oxygen collected per minute. The last two values are equal, so the rate stopped increasing while photosynthesis continued.",
        "What does the rate do from medium to high light?","It stays at 5 cm³ per minute.","The height stays positive and unchanged.","It drops to zero.","It doubles."],
      ["Test a limit","At high light, raise the carbon dioxide supply and keep temperature and light the same. A higher rate supports carbon dioxide as a limiting factor in the first trial.",
        "Which result would support carbon dioxide being limiting?","More oxygen collected per minute after adding carbon dioxide.","Changing one factor lets you link the difference to that factor.","The same volume collected in twice as long.","Dimming the light and adding carbon dioxide together."]
    ],
    ["Pondweed under a bright lamp produces oxygen faster after it is warmed slightly. Light and carbon dioxide stay the same. Which factor could have been limiting before warming?","Temperature","With other conditions controlled, warming can improve the rate when temperature limits it.","Water was definitely unavailable.","The plant had stopped respiring."],
    ["Increasing light leaves a positive oxygen production rate unchanged. What should you test next?","Change one other potential limiting factor.","Another factor could restrict the rate even while photosynthesis continues.","Record the rate as zero.","Increase all factors at once."],
    "Higher Tier · Use data to identify interacting limiting factors. For a point light source, doubling the distance gives approximately a quarter of the light intensity."),

  "latent-heat": lesson(10,"P3","Heating and changes of state",
    "Where does the energy go while ice stays at 0 °C?",
    "Trace the horizontal section of the heating curve. Is energy still being supplied?",
    "During melting, transferred energy changes the arrangement and potential energy of particles. Their average kinetic energy and the temperature can stay steady.",
    ["curve","Heating ice and then water","Energy supplied","Temperature",[
      ["Temperature",[[0,0],[1,1],[2,2],[3,2],[4,2],[5,3],[6,4]]]],"The horizontal section at 0 °C represents melting."],
    [
      ["Read the rising line","Internal energy is the total kinetic and potential energy of the particles. A temperature rise means their average kinetic energy rises.",
        "What changes on the first rising section?","The average kinetic energy of the particles increases.","Temperature is related to average kinetic energy.",["Each particle gets bigger.","Heating changes how fast the particles move or vibrate. The particles themselves stay the same size."],["The particles stop vibrating.","A temperature rise means the particles are vibrating faster on average."]],
      ["Read the flat line","Melting takes energy even at constant temperature. The arrangement changes, so the potential energy of the particles changes.",
        "Where does the transferred energy go on the melting plateau?","It increases the particles’ potential energy.","The arrangement changes while average kinetic energy stays steady.",["It makes all particles move faster.","The temperature is steady, so the average kinetic energy stays steady."],["No energy is transferred.","The flat line shows a steady temperature. The heater still transfers energy as the solid melts."]],
      ["Calculate the energy","Specific latent heat is the energy needed to change the state of one kilogram without a temperature change. Use energy = mass × specific latent heat.",
        "How much energy melts 0.20 kg of ice if its specific latent heat is 334,000 J/kg?","66,800 J","Multiply 0.20 by 334,000.","334,000 J","1,670,000 J"]
    ],
    ["A pure liquid boils while its temperature stays steady. What is increasing as energy is supplied?","The particles’ potential energy","Particles separate as liquid becomes gas. The temperature can remain unchanged.","The size of the particles","The average kinetic energy throughout the plateau"],
    ["Is a melting plateau evidence that the heater is off?","No. Energy can continue transferring while the substance melts.","The energy changes the arrangement of the particles.","Yes. The substance has stopped taking in energy.","Yes. The particles stop moving."]),

  "decay-half-life": lesson(10,"P4","Random decay and half-life",
    "Can anybody predict when one nucleus will decay?",
    "Compare what remains after each equal time interval.",
    "Individual decays are random. The half-life is the time for the number of undecayed nuclei, or activity, to fall to half its value.",
    ["bars","A radioactive source over time","Same time between readings",[["Start","80 Bq",80],["One half-life","40 Bq",40],["Two half-lives","20 Bq",20],["Three half-lives","10 Bq",10]]],
    [
      ["What activity means","The activity of a source is the number of decays per second, measured in becquerels (Bq).",
        "What does an activity of 80 Bq mean?","80 decays per second.","One becquerel is one decay per second.","80 nuclei are present altogether.","80 seconds per decay."],
      ["Halve the remaining activity","Find half the activity at the start of the interval. Each interval halves what currently remains.",
        "What follows 20 Bq after one more half-life?","10 Bq","Take half of 20, rather than subtracting the amount lost in the first interval.","0 Bq","5 Bq"],
      ["Irradiation and contamination","Irradiation is exposure to radiation. Contamination means radioactive material is on or in the object or person.",
        "Which situation is contamination?","Radioactive dust sticks to a glove.","The material itself is now on the glove.","A sealed source shines radiation at the glove.","An X-ray passes through a glove."]
    ],
    ["A source falls from 48 Bq to 12 Bq in 10 minutes. What is its half-life?","5 minutes","48 → 24 → 12 is two half-lives in ten minutes.","10 minutes","2.5 minutes"],
    ["A source has activity 36 Bq. What remains after two half-lives?","9 Bq","Halve twice: 36 → 18 → 9.","18 Bq","0 Bq"],
    "Higher Tier · Express reduction over several half-lives as a ratio. For example, an original activity of 48 Bq and a final activity of 12 Bq give a ratio of 4:1."),

  "parallel-circuits": lesson(10,"P2","Current in series and parallel",
    "Why can each light in a home work on its own?",
    "Follow the path for each lamp. Find the junctions where the separate paths meet.",
    "Parallel branches have the same potential difference across them. The total current is the sum of the branch currents.",
    ["circuit"],
    [
      ["Follow the branches","Each parallel branch forms a separate path through the supply. A break in one branch can leave another path complete.",
        "What happens if lamp A is removed?","Lamp B can stay on.","Lamp B still has a complete path through the supply.","Both lamps go out.","Lamp B must receive zero potential difference."],
      ["Read current at a junction","Current measures the flow of charge. Charge is conserved, so the total current entering a junction equals the total leaving.",
        "The branches carry 0.2 A and 0.3 A. What current leaves the supply?","0.5 A","Add both branch currents.","0.1 A","0.3 A"],
      ["Compare potential difference","The potential difference is the same across parallel branches. In a series circuit, the current is the same throughout and the supply potential difference is shared.",
        "What is the potential difference across each branch of a 6 V ideal supply?","6 V","Each branch connects across the same two supply connections.","3 V","12 V"]
    ],
    ["Three parallel branches carry 0.2 A, 0.4 A and 0.1 A. The 0.4 A branch opens. If the other currents stay the same, what is the new total?","0.3 A","Add the currents in the remaining complete branches.","0.7 A","0.4 A"],
    ["Why does a lamp in a different parallel branch stay lit if the first branch opens?","It still has a complete path.","The branches provide separate paths.","Current is stored in the lamp.","The supply turns it on without a circuit."]),

  "mass-conservation": lesson(10,"C3","Conservation of mass and formula mass",
    "Can a reaction make gas without losing any mass?",
    "Read each pair of balances. Which one includes the gas after the reaction?",
    "A chemical reaction rearranges atoms. Mass is conserved when the measurement includes all materials before and after.",
    ["bars","A solid reacts and makes gas","Mass of apparatus and contents",[["Sealed before","132 g",132],["Sealed after","132 g",132],["Open after","130 g",130]]],
    [
      ["Account for every substance","An open container lets gas escape. A balance measures what remains on it, so the reading can fall while total mass is conserved.",
        "Why does the open flask read 130 g?","Some gas has left the balance.","Escaped gas still has mass.","Gas weighs nothing.","Atoms have been destroyed."],
      ["Read a formula","Relative formula mass is the sum of the relative atomic masses for the formula. Count every atom represented.",
        "What is the relative formula mass of CO₂? Use C = 12 and O = 16.","44","One carbon and two oxygen atoms give 12 + 2 × 16.","28","32"],
      ["Compare concentration","Mass concentration in g/dm³ is mass in grams divided by volume in dm³. One dm³ equals 1,000 cm³.",
        "A 0.25 dm³ solution contains 5 g of solute. What is its mass concentration?","20 g/dm³","Divide 5 g by 0.25 dm³.","1.25 g/dm³","5 g/dm³"]
    ],
    ["A heated metal gains mass as it reacts with air. How can mass still be conserved?","Oxygen from the air has become part of the measured solid.","Include the oxygen from the air in the before measurement to compare the whole system.","The metal creates new atoms when heated.","Heating increases the mass of each atom."],
    ["Why is the mass unchanged when a gas-producing reaction runs in a sealed flask?","The gas remains in the flask and is weighed.","All the products are still on the balance.","The reaction made no products.","Only solids contribute to mass."],
    "Higher Tier · Amount in moles = mass ÷ relative formula mass. Use the balanced equation ratio to identify which reactant runs out."),

  "salt-electrolysis": lesson(10,"C4","Electrolysis of molten salt and salt solution",
    "Why does dissolved salt give a different product from molten salt?",
    "Look at the negative electrode in both cases. What extra substance is present in the solution?",
    "Ions move to oppositely charged electrodes. In a solution, water can affect which products form.",
    ["pairs","The negative electrode",[
      ["Molten sodium chloride","Na⁺  →  negative electrode","Sodium forms."],
      ["Concentrated sodium chloride solution","Water is also present","Hydrogen forms."]]],
    [
      ["Mobile ions","Electrolysis needs ions that can move. In a molten salt or solution, positive ions move to the negative electrode and negative ions move to the positive electrode.",
        "Where do sodium ions move?","The negative electrode","Na⁺ ions are positive and attracted to the negative electrode.","The positive electrode","Neither electrode"],
      ["Molten compounds","Molten sodium chloride contains only sodium ions and chloride ions. Sodium forms at the negative electrode and chlorine at the positive electrode.",
        "What forms at the negative electrode in molten sodium chloride?","Sodium","The only positive ions present are sodium ions.","Hydrogen","Chlorine"],
      ["Aqueous compounds","Sodium is more reactive than hydrogen. In sodium chloride solution, hydrogen forms at the negative electrode instead of sodium.",
        "Why can the aqueous case give hydrogen?","Water is present in the solution.","Water provides the hydrogen that can form at the negative electrode.","The chloride ions have changed to hydrogen.","Solid sodium does not contain any ions."]
    ],
    ["Why does solid sodium chloride fail to conduct when connected to the electrodes?","Its ions are held in fixed positions.","Charged particles must be able to move through the material.","The ions lose their charges in a solid.","Sodium chloride contains no particles until it melts."],
    ["Which product forms at the negative electrode in sodium chloride solution?","Hydrogen","Water is present and sodium is more reactive than hydrogen.","Sodium","Chlorine"],
    "Higher Tier · Reduction is gain of electrons and occurs at the negative electrode. For molten sodium chloride, Na⁺ + e⁻ → Na."),

  "reaction-profiles": lesson(10,"C5","Exothermic and endothermic reaction profiles",
    "How can a reaction release energy if it needs energy to start?",
    "Compare the start, peak, and finish. The starting level is the same on both profiles.",
    "The activation energy is the initial barrier. The difference between the reactant and product energy levels shows the overall transfer.",
    ["curve","Energy profiles for two reactions","Progress of reaction","Energy",[
      ["Exothermic",[[0,2],[1,2],[2,3],[3,5],[4,3],[5,1],[6,1]]],
      ["Endothermic",[[0,2],[1,2],[2,3],[3,6],[4,5],[5,4],[6,4]]]],"Both profiles require activation energy. Compare the finishing levels."],
    [
      ["Find the barrier","Activation energy is the minimum energy particles need for a successful collision. Read it from the reactant energy level to the peak.",
        "Which two levels give the activation energy?","Reactants and peak","The barrier is measured from the initial level.","Products and reactants","Products and zero"],
      ["Read the net change","Products have a lower energy level in an exothermic reaction. Energy is transferred to the surroundings. An endothermic reaction transfers in energy overall.",
        "Which profile shows net energy transferred to the surroundings?","The one whose products are lower than its reactants.","The decrease in energy of the reacting system goes to the surroundings.","The one with the highest peak.","Any profile that rises at the start."],
      ["Observe a temperature change","In a controlled temperature-change practical, warming of the mixture can indicate an exothermic reaction and cooling can indicate an endothermic reaction.",
        "What should you compare in repeats using different reactants?","The temperature change from the same starting conditions.","Fair comparisons control amounts, timing, and apparatus.","Only the highest temperature, without a starting reading.","Only whether the reactants change colour."]
    ],
    ["A reaction starts at 25 and ends at 35 on the energy scale. How should it be classified?","Endothermic","The products are higher in energy, so energy is transferred in overall.","Exothermic","No transfer because the curve has a peak."],
    ["On a profile where products are below reactants, where does the difference in energy go?","To the surroundings","This is an exothermic energy transfer.","Into making the line higher","Nowhere, energy is destroyed."],
    "Higher Tier · Breaking bonds transfers energy in. Forming bonds transfers energy out. Calculate the overall change as energy needed to break bonds minus energy released in forming bonds."),

  "glucose-control": lesson(10,"B5","Maintaining blood glucose",
    "How can your body respond to a meal before you notice any change?",
    "Follow the sequence from the change to the response. Which organ detects the rise?",
    "The pancreas releases insulin when blood glucose rises. Cells take up glucose and the liver and muscles convert some glucose to glycogen.",
    ["pairs","A negative feedback response",[
      ["After a meal","Blood glucose rises","The pancreas detects the change."],
      ["Insulin signal","More glucose taken up and stored","Blood glucose falls towards its usual level."]]],
    [
      ["Homeostasis","Homeostasis is regulation of internal conditions. A receptor detects a change, and effectors carry out the response.",
        "What does an effector do?","Carries out the response","A receptor detects the change. An effector acts.","Detects every change","Carries the genetic code"],
      ["Control after a meal","A rise in blood glucose causes the pancreas to release insulin. Insulin stimulates glucose uptake and glycogen formation.",
        "What happens to glucose in liver cells in the fed state?","Some is converted to glycogen.","Glycogen stores glucose in the liver and muscles.","It is all converted into insulin.","Glycogen is broken down to raise blood glucose."],
      ["Compare diabetes","In Type 1 diabetes the pancreas produces too little insulin. In Type 2 diabetes body cells respond less well to insulin.",
        "Which explanation describes Type 2 diabetes?","Body cells respond less well to insulin.","The problem is reduced response to insulin.","The pancreas is absent.","The liver cannot ever store a carbohydrate."]
    ],
    ["A pupil argues insulin should make blood glucose rise after a meal. What is the effect of insulin instead?","It lowers blood glucose by increasing uptake and storage.","The response reverses the original rise.","It raises blood glucose by breaking down glycogen.","It prevents cells taking up glucose."],
    ["Which organ releases insulin when blood glucose rises?","The pancreas","The liver responds to insulin, while the pancreas releases it.","The liver","The stomach"],
    "Higher Tier · If blood glucose falls, the pancreas releases glucagon, which stimulates glycogen breakdown in the liver and release of glucose. The two hormones counter opposite changes."),

  "food-web-change": lesson(10,"B7","Feeding relationships, sampling, and biodiversity",
    "How could losing one prey species affect several other populations?",
    "Trace the arrows from grass to the two herbivores. Which animals share an owl as a predator?",
    "Organisms depend on other organisms and on their environment. Sampling and food webs show different aspects of those relationships.",
    ["web"],
    [
      ["Read a food web","Arrows run from the organism being eaten to its consumer. They show the transfer of biomass and energy.",
        "Which way should an arrow point between a mouse and an owl that eats it?","From mouse to owl","The arrow shows transfer from food to consumer.","From owl to mouse","Both ways"],
      ["Predict a change","If there are fewer mice, owls may have less food. Other prey and habitat changes can also affect what happens.",
        "What could explain why owl numbers do not fall when mouse numbers fall?","Owls can switch to other prey.","A food web shows more than one route.","Owls start making their own glucose by photosynthesis.","The arrow changes direction."],
      ["Plan a sample","Place quadrats randomly when estimating abundance across an area. Use a transect when comparing a change along a gradient.",
        "Which method helps you measure how plant cover changes away from a path?","Quadrats at set distances along a transect.","A transect samples the gradient systematically.","One quadrat at the most grassy place.","Counting all plant species in a photograph from another site."]
    ],
    ["One plot has 50 daisies only. Another has daisies, clover, and grass. Which is richer in species?","The second plot","Species richness counts types, not total individuals.","The first plot because 50 is larger","Both always have the same richness"],
    ["Which method estimates the mean number of plants across a whole field fairly?","Take many quadrats at randomly chosen locations.","Random sampling reduces selection bias.","Take one beside the gate.","Only sample where plants look tallest."])
};

export const year11Catchup = {
  "reaction-rate": lesson(11,"C6","Rates, collisions, and reversible reactions",
    "How can two reactions make the same amount of gas and finish at different times?",
    "Find the curve that is steepest at the start. Then compare their final readings.",
    "Rate is the amount of reactant used or product made per unit time. Two reactions can reach the same final yield at different rates.",
    ["curve","Gas production in two trials","Time","Volume of gas",[
      ["Faster trial",[[0,0],[1,5],[2,8],[3,9],[4,9],[5,9]]],["Slower trial",[[0,0],[1,2],[2,4],[3,6],[4,8],[5,9]]]],
      "Equal quantities of the same reactants were used."],
    [
      ["Use the slope","A steeper product–time curve means more product forms in each interval. The final volume tells you how much gas was made overall.",
        "What does the flat part of a finished gas-producing trial show?","The total gas volume is no longer increasing.","A horizontal product curve shows zero further production.","The trial is now reaction fastest.","The volume has fallen to zero."],
      ["Explain the rate","More concentrated reactants can have more frequent collisions. Higher temperature also increases the proportion of collisions with enough energy.",
        "What does a catalyst reduce?","The activation energy","A catalyst provides a route with a lower activation energy.","The total amount of reactants","The energy of every product molecule"],
      ["Reversible reactions","The reverse reaction can turn products back into reactants. In a closed system at equilibrium, the forward and reverse reactions have equal rates.",
        "Do both reactions stop at equilibrium?","No. Both continue at equal rates.","The equal rates keep concentrations steady overall.","Yes. Neither can occur.","Only the reverse reaction continues."]
    ],
    ["Two trials use the same reactant amounts. The second has a catalyst. What would its product–time curve show?","A steeper start and the same final level.","A catalyst changes rate without changing the overall yield in this completed reaction.","A lower slope and a higher final level.","An unchanged rate and twice as much product."],
    ["Which condition usually increases collision frequency in a solution?","Greater reactant concentration","There are more reactant particles per unit volume.","Larger bubbles of product after the reaction","Cooling the mixture"],
    "Higher Tier · Draw a tangent and calculate its gradient for the rate at a point. Explain how changing a condition can shift a dynamic equilibrium."),

  "crude-oil": lesson(11,"C7","Crude oil, fractions, and cracking",
    "How can one barrel of crude oil supply fuel and chemical feedstock?",
    "Compare where the short- and long-chain hydrocarbons leave the column.",
    "Fractional distillation separates hydrocarbons by boiling range. Cracking breaks long hydrocarbons into smaller molecules.",
    ["column"],
    [
      ["Identify a hydrocarbon","Hydrocarbons contain carbon and hydrogen only. Crude oil is a mixture of hydrocarbons, many of which are alkanes.",
        "Which formula can be a hydrocarbon?","C₄H₁₀","The compound contains carbon and hydrogen only.","C₂H₆O","CO₂"],
      ["Separate the mixture","The bottom of the column is hotter. Larger molecules with higher boiling points condense lower down, while shorter molecules rise higher.",
        "Where do lower-boiling hydrocarbons leave?","Higher up the column","They travel farther as vapour before condensing.","Only at the bottom","Randomly, because boiling point has no effect"],
      ["Change the molecules","Cracking breaks some long hydrocarbons into shorter alkanes and alkenes. Alkenes turn bromine water from orange to colourless.",
        "Which observation suggests an alkene is present?","Bromine water becomes colourless.","Alkenes decolourise bromine water.","Limewater turns cloudy.","A glowing splint relights."]
    ],
    ["A refinery separates a fraction and later cracks it. In which process do the molecules change identity?","Cracking","Chemical bonds are changed in cracking. Distillation separates the existing molecules.","Fractional distillation only","Both processes change every molecule."],
    ["Why do larger hydrocarbons condense lower in the column?","They have higher boiling points.","They condense where the column is warmer.","They expand into bigger molecules.","They all have the same boiling point as small molecules."]),

  "chromatography": lesson(11,"C8","What a chromatogram shows",
    "How can one black ink leave several colours on paper?",
    "Find the pencil baseline and the solvent front. Count the spots above each starting point.",
    "Paper chromatography separates dissolved substances. Use matching spot positions and Rf values when samples are run under the same conditions.",
    ["chromatogram"],
    [
      ["Separate a mixture","The solvent is the mobile phase. Paper is the stationary phase. Substances move different distances as they distribute differently between the phases.",
        "What does more than one spot from a single ink show?","The ink contains more than one component.","The sample has separated into distinguishable substances.","The ink was pure.","The baseline was not long enough."],
      ["Use the two distances","Measure from the baseline to the centre of a spot and to the solvent front. Rf is spot distance divided by solvent-front distance.",
        "A spot travels 3 cm and the solvent front travels 6 cm. What is Rf?","0.50","Divide 3 cm by 6 cm. Rf has no unit.","2.0","3 cm"],
      ["Check an observation","Different tests identify gases. Carbon dioxide makes limewater cloudy. Oxygen relights a glowing splint, and hydrogen gives a squeaky pop with a lit splint.",
        "Which observation indicates carbon dioxide?","Limewater becomes cloudy.","The gas reacts with limewater to form a cloudy suspension.","A glowing splint relights.","Bromine water becomes colourless."]
    ],
    ["An unknown spot matches a reference in the same run. What does this support?","The unknown may contain the reference substance.","Matching positions support identification under those conditions. Other evidence can strengthen it.","The unknown must contain only the reference substance.","The reference sample caused the solvent to move."],
    ["Why use pencil for the baseline?","Graphite remains in place when the solvent rises.","An ink baseline can dissolve and add unwanted spots.","Pencil provides a separate solvent.","Pencil makes the paper the mobile phase."]),

  "greenhouse": lesson(11,"C9","Greenhouse gases and climate",
    "Why is Earth warmer than it would be with no greenhouse effect?",
    "Follow the two arrows. Look for the point where a greenhouse gas absorbs outgoing radiation.",
    "Greenhouse gases absorb some infrared radiation emitted by Earth and re-emit it in different directions.",
    ["pairs","Energy transfers in the atmosphere",[
      ["Sunlight → surface","The surface absorbs some incoming radiation.","The warmed surface emits infrared."],
      ["Surface → atmosphere","Greenhouse gases absorb some infrared.","Some is re-emitted towards the surface."]]],
    [
      ["Distinguish the radiation","The warmed surface emits infrared radiation. Greenhouse gases such as carbon dioxide and methane absorb some of it.",
        "Which radiation do greenhouse gases absorb in this model?","Outgoing infrared","The key transfer is infrared emitted by the warm Earth.","Only incoming visible light","Sound waves leaving Earth"],
      ["Know where gases come from","Combustion of fossil fuels adds carbon dioxide. Activities such as livestock farming can add methane.",
        "Which action can increase atmospheric carbon dioxide?","Burning more fossil fuels.","Their carbon can react with oxygen and be released as carbon dioxide.","Increasing wind generation in place of fossil fuels.","Reducing fuel use without another change."],
      ["Distinguish air pollutants","Incomplete combustion can make carbon monoxide. Sulfur dioxide and nitrogen oxides can contribute to acid rain.",
        "Why is carbon monoxide dangerous?","It reduces the blood’s ability to carry oxygen.","Carbon monoxide binds strongly to haemoglobin.","It acts as oxygen in aerobic respiration.","It immediately turns all the air into carbon dioxide."]
    ],
    ["Why does more atmospheric carbon dioxide affect the transfer of energy from Earth to space?","More outgoing infrared can be absorbed and re-emitted by the atmosphere.","This changes the energy balance and can warm the surface.","Carbon dioxide blocks all incoming daylight.","Carbon dioxide produces energy continuously."],
    ["Which gas can act as a greenhouse gas?","Methane","Methane absorbs some infrared radiation.","Nitrogen gas","Oxygen gas"]),

  "potable-water": lesson(11,"C10","Potable water and using resources",
    "Can drinking water be safe while it still contains dissolved substances?",
    "Compare the treatment routes. Which step deals with dissolved seawater salts?",
    "Potable water is safe to drink. It can contain small amounts of dissolved substances.",
    ["pairs","Choose the treatment for the starting water",[
      ["Fresh water","Filter → sterilise","Remove solids and kill microbes."],
      ["Seawater","Desalinate","Remove dissolved salts, for example by distillation or reverse osmosis."]]],
    [
      ["Understand potable water","Safe drinking water has acceptably low levels of harmful substances and microbes. It does not need to be pure water.",
        "Can potable water contain dissolved mineral salts?","Yes, at acceptable levels.","Potable means safe to drink.","No, it must contain only water molecules.","Only if the salts are visible."],
      ["Choose processes","Filtration removes suspended solids. Sterilisation kills microbes. Desalination removes dissolved salts.",
        "Which process removes dissolved salt from seawater?","Desalination","Dissolved salt passes through an ordinary solids filter.","Filter paper by itself","Sterilisation by itself"],
      ["Compare the wider impact","A life-cycle assessment considers raw materials, manufacturing, use, and disposal. Comparisons can change when assumptions such as reuse or transport change.",
        "What might alter a life-cycle comparison of two bottles?","How many times each bottle is reused.","The use stage contributes to overall impact.","Using a graph with a different font.","Ignoring raw material extraction in both cases."]
    ],
    ["A clear seawater sample passes through filter paper. Why is it still unsuitable to drink?","It still contains too much dissolved salt.","The particles of salt in solution pass through the filter.","Clear water always carries more sand.","The filter increases the salt concentration in every case."],
    ["Why would water be sterilised after filtration?","To kill microbes still present.","Clear water can still contain harmful microbes.","To make it completely free of dissolved substances.","To add silt to the water."]),

  "forces-motion": lesson(11,"P5","Resultant forces and motion",
    "Can a cyclist carry on moving while their forces balance?",
    "Look at the movement arrow separately from the force arrows. Compare the two speeds.",
    "A zero resultant force gives zero acceleration. An object can remain stationary or continue at constant velocity.",
    ["pairs","Forces on a moving cyclist",[
      ["Forces balance","40 N ← cyclist → 40 N","Moving right at constant speed."],
      ["Forward force smaller","40 N ← cyclist → 20 N","Moving right and slowing down."]]],
    [
      ["Add the forces with direction","Opposite forces along the same line subtract. An overall force of zero means no change in velocity.",
        "What is the resultant of 40 N right and 40 N left?","0 N","They are equal and act in opposite directions.","80 N right","40 N left"],
      ["Predict a change in velocity","The resultant acts in the direction of the acceleration. If it acts against the velocity, the object slows down.",
        "A 5 kg object has a 10 N resultant. What is its acceleration?","2 m/s²","Acceleration = resultant force divided by mass.","50 m/s²","0.5 m/s²"],
      ["Explain stopping","Stopping distance is thinking distance plus braking distance. Driver reactions affect thinking distance, and tyre grip affects braking distance.",
        "Which factor can directly increase braking distance?","Poor grip on a wet road","This reduces the braking force available at the tyres.","The driver takes longer to notice the hazard.","The driver is looking in the other direction."]
    ],
    ["A spacecraft moves right at constant velocity in a straight line. What can you conclude?","Its resultant force is zero.","The velocity is constant. Its acceleration is zero.","A force must push it right to keep it moving.","Its velocity has to be zero."],
    ["A cyclist moves right as the resultant force points left. What happens immediately?","They keep moving right and slow down.","Acceleration opposite to motion initially reduces speed.","They immediately reverse direction.","Their speed stays the same."],
    "Higher Tier · Momentum = mass × velocity. Total momentum is conserved in a closed system."),

  "wave-motion": lesson(11,"P6","Wave properties and what travels",
    "If a wave travels along a rope, why does a marked piece of rope stay there?",
    "Follow the marker. Compare the direction of its movement with the direction of the travelling wave.",
    "A mechanical wave transfers energy. Particles oscillate around their positions as it passes.",
    ["wave"],
    [
      ["Notice what travels","A wave transfers energy. A marked point on the rope oscillates around its position as a transverse wave travels along the rope.",
        "What does the marked point do?","Moves up and down around its rest position.","The point oscillates perpendicular to the direction of travel.",["Travels to the far end with the wave.","The wave moves along the rope. The marked point oscillates around its own position."],["Stays completely still.","The marker does move. It moves up and down as the wave passes."]],
      ["Measure a wave","Wavelength is the distance between adjacent points in the same part of the cycle. Frequency is the number of cycles per second.",
        "A wave of frequency 4 Hz has a wavelength of 0.5 m. What is its speed?","2 m/s","Wave speed = frequency × wavelength.","8 m/s","0.125 m/s"],
      ["Compare waves","In a longitudinal wave the oscillations are parallel to the wave’s direction of travel. Sound in air is longitudinal.",
        "What moves back and forth in a sound wave in air?","Air particles","They oscillate along the direction the wave travels.",["Only sound particles","Sound is a wave. Air particles are the particles that vibrate in this example."],["All the air moves along the room at the speed of sound.","Nearby air particles vibrate back and forth. The wave travels through the room without carrying that air with it."]]
    ],
    ["A floating marker goes up and down as a ripple passes. Which claim fits this evidence?","The ripple carries energy across the water while the marker oscillates locally.","The wave travels. The oscillation is local.","The floating marker must move to the edge at the wave speed.","The ripple cannot transfer energy."],
    ["Where can you measure one wavelength on a transverse diagram?","From one crest to the next crest.","The points must be one cycle apart.","From a crest to the closest trough.","From the centre line to a crest."]),

  "electromagnet-switch": lesson(11,"P7","Magnetic fields from electric currents",
    "How can a magnet be turned off instantly?",
    "Switch the coil on and off. Look for what changes around the coil.",
    "A current produces a magnetic field. A coil concentrates the field and an iron core can strengthen it.",
    ["coil"],
    [
      ["Locate the field","A current through a wire produces a magnetic field. Winding the wire into a coil produces a field like that of a bar magnet.",
        "What must flow to create the coil’s field in this model?","Electric current","Moving charge produces a magnetic field.","Water through the wire","Salt through the iron core"],
      ["Change one factor","Increasing the current can strengthen the magnetic field. Reversing the current reverses the direction of the field.",
        "What changes when the current reverses?","The coil’s poles swap.","The magnetic field direction reverses.","An iron core becomes plastic.","The coil stops having turns."],
      ["Compare core materials","A soft iron core strengthens the field while current flows. Its magnetisation is mostly lost when the current is switched off.",
        "Why use soft iron in a scrapyard electromagnet?","It can release the load when the current is switched off.","Soft iron loses most of its induced magnetism when the field is removed.","It always stays strongly magnetised.","It prevents a current flowing through the coil."]
    ],
    ["Two otherwise identical coils differ only in current. Which is likely to lift more steel pins?","The coil carrying the larger current.","A larger current generally produces a stronger field.","The coil with no current.","The coil whose insulation is a different colour."],
    ["Which material can strengthen a coil’s magnetic field as a core?","Soft iron","Iron becomes magnetised in the coil’s field.","Glass","Dry paper"],
    "Higher Tier · A current-carrying wire in a magnetic field can experience a force. At right angles, use F = BIl. In a simple motor, a split-ring commutator reverses the coil current each half-turn."),

  "inheritance-cross": lesson(11,"B6","Inheritance and genetic crosses",
    "How can two unaffected parents have an affected child?",
    "Follow one allele from each parent into a box. Where do both copies match the recessive allele?",
    "An offspring inherits one allele from each parent. For this example, the recessive phenotype appears only when both copies are recessive.",
    ["punnett"],
    [
      ["Distinguish alleles and phenotypes","Alleles are different versions of a gene. A genotype shows which alleles are present. The phenotype is the observable characteristic.",
        "Which notation shows a heterozygous genotype?","Aa","The two alleles are different.","AA","aa"],
      ["Combine one allele from each parent","For Aa × Aa, the equally likely outcomes are AA, Aa, Aa and aa. The recessive phenotype appears in one of the four boxes.",
        "What is the chance of an aa child in this cross?","1 in 4","One of four equally likely boxes is aa.","1 in 2","1 in 3"],
      ["Connect variation and selection","Variation creates differences between individuals. Where a heritable trait helps organisms survive and reproduce, that trait can become more common over generations.",
        "What changes in a population over generations?","The proportion of individuals with particular inherited traits.","Natural selection can shift how common traits are.","An individual chooses which alleles to inherit.","Every allele becomes dominant."]
    ],
    ["Two parents are Aa. Their first three children have the dominant phenotype. What is the probability that the next child is aa?","1 in 4","The possible allele combinations are the same for each child in this model.","It must now be 1.","It is now 0."],
    ["Why can an unaffected Aa parent pass the recessive feature to a child?","Their gametes can carry the recessive allele.","The allele can be inherited without being expressed in the parent.","The recessive allele disappears in all gametes.","Both parents pass both alleles to every child."])
};


const complementary = {
  "respiration-exercise": lesson(10,"B4","Respiration in muscles and yeast",
    "Why does bread dough make bubbles while sprinting muscles make a different product?",
    "Compare the products in muscle and yeast. Which product is unique to the muscle example?",
    "Respiration transfers energy. Without enough oxygen, muscles and yeast can both respire anaerobically, but their products differ.",
    ["pairs","Anaerobic respiration",[
      ["Muscle","Glucose → lactic acid","Less energy is transferred per glucose molecule than in aerobic respiration."],
      ["Yeast","Glucose → ethanol + carbon dioxide","This is fermentation."]]],
    [
      ["Aerobic respiration","Glucose reacts with oxygen to produce carbon dioxide and water, transferring energy for cellular processes.",
        "Which substance is used in aerobic respiration and is not needed for anaerobic respiration?","Oxygen","Aerobic respiration uses oxygen.","Glucose","Carbon dioxide"],
      ["During a sprint","If oxygen supply cannot meet demand, muscle cells also respire anaerobically. They produce lactic acid in the GCSE model.",
        "Which anaerobic product is formed by muscles?","Lactic acid","Yeast produces different products during fermentation.","Ethanol","Oxygen"]
    ],
    ["Yeast makes bubbles in bread dough without an oxygen supply. What gas is in the bubbles?","Carbon dioxide","Carbon dioxide is a product of fermentation in yeast.","Oxygen","Hydrogen"],
    ["Why is less energy transferred per glucose molecule in anaerobic respiration?","Glucose is only partly broken down.","Anaerobic products retain some of the energy available from glucose.","The glucose disappears.","Muscle cells stop using glucose."],
    "Higher Tier · Blood transports lactic acid from muscles to the liver. Extra oxygen is needed after exercise to deal with the lactic acid produced."),

  "density-and-gas-pressure": lesson(10,"P3","Density and the pressure of a gas",
    "How can a sealed container have higher pressure with the same number of gas particles?",
    "Compare the pressure before and after warming. The container size and particle count stay the same.",
    "Density is mass per volume. At fixed volume, heating a gas increases particle speed and pressure.",
    ["pairs","Same sealed container, two temperatures",[
      ["Cool gas","Slow particles → fewer wall hits","The particles have lower average kinetic energy."],
      ["Warmer gas","Faster particles → more wall hits","Collisions with the walls are also harder."]]],
    [
      ["Compare mass per volume","Density = mass ÷ volume. Equal volumes of different substances can have different masses.",
        "Which has greater density if both occupy 10 cm³?","The sample with greater mass.","For a fixed volume, a greater mass means greater density.","The sample with lower mass.","Both must have the same density."],
      ["Explain a pressure rise","At fixed volume, heating increases average molecular speed. Particles hit the walls more often and transfer more momentum per collision.",
        "What causes pressure on the inside walls?","Collisions of gas particles with the walls.","The particles push on the walls during impacts.","Collisions only between two gas particles.","Gas particles expand to fill the gaps."]
    ],
    ["A gas is heated in a sealed rigid bottle. What changes about the gas particles?","Their average speed increases.","Heating raises average kinetic energy. The particle count and size do not change.","New particles are made.","The particles get larger."],
    ["A 60 g object displaces 20 cm³ of water. What is its density?","3 g/cm³","Divide the mass by the volume.","1,200 g/cm³","40 g/cm³"]),

  "salts-and-reactivity": lesson(10,"C4","Making salts and comparing metal reactivity",
    "How can a clear acid become a solid salt you can see?",
    "Trace the steps. Where does the product salt separate from the water?",
    "An acid reacts with a suitable base to make a salt and water. A metal above another in the reactivity series can displace it from its compound in solution.",
    ["pairs","Making copper sulfate crystals",[
      ["Neutralise and filter","Acid + copper oxide → solution","Filter off excess solid copper oxide."],
      ["Concentrate and cool","Concentrated solution → crystals","Some water leaves during evaporation."]]],
    [
      ["Choose the acid and base","The acid supplies part of the salt name. Sulfuric acid produces sulfates. Copper oxide provides the copper ions.",
        "Which acid makes copper sulfate with copper oxide?","Sulfuric acid","Sulfuric acid supplies sulfate ions.","Hydrochloric acid","Nitric acid"],
      ["Finish the salt practical","An excess of insoluble base helps use up the acid. Filter the excess solid, concentrate the filtrate and cool so crystals form.",
        "Why is copper oxide filtered off?","Some was added in excess to use up the acid.","The dissolved salt passes through the filter.","Filtering removes the dissolved sulfate.","Copper oxide is the only product."]
    ],
    ["Iron placed in copper sulfate solution forms a copper coating. What does this show about reactivity?","Iron is more reactive than copper.","Iron displaces copper from its compound in solution.","Copper displaces iron.","Iron and copper have identical reactivity."],
    ["Which observation tells you some dissolved salt has separated as a solid?","Crystals appear on cooling.","Crystallisation separates solid salt from the solution.","The solution remains clear after filtering.","Exactly the same volume is measured."],
    "Higher Tier · Acid strength depends on the extent of ionisation in water. Concentration measures amount per unit volume."),

  "reflex-response": lesson(10,"B5","Reflexes and nervous coordination",
    "How can you move your hand before consciously deciding to?",
    "Trace the signal from the receptor to the muscle.",
    "A reflex is a rapid automatic response. The reflex arc connects a receptor to an effector through the central nervous system.",
    ["pairs","The path of a withdrawal reflex",[
      ["Detect the stimulus","Receptor → sensory neurone","The sensory neurone carries the signal to the central nervous system."],
      ["Coordinate and respond","Relay → motor neurone → muscle","The muscle contracts to withdraw the hand."]]],
    [
      ["Identify the parts","A stimulus is a change. The receptor detects it. Neurones carry impulses, and an effector such as a muscle carries out a response.",
        "Which part detects the hot object?","A receptor","A receptor detects the stimulus.","The motor neurone","An effector muscle"],
      ["Compare reflexes and conscious actions","At a synapse, a chemical carries the signal across a small gap. A withdrawal reflex can be coordinated in the spinal cord without first making a conscious decision.",
        "Which neurone carries an impulse from the CNS to the muscle?","Motor neurone","The motor neurone connects to the effector.","Sensory neurone","A receptor"],
      ["Measure a response","A ruler-drop test measures the distance a ruler falls before the pupil catches it. A longer distance indicates a longer reaction time, if the starting setup is the same.",
        "How can you improve a comparison of two conditions in this test?","Repeat each condition with the same starting position.","Repeats help estimate variation and a fair starting position controls the release.","Move the ruler higher for only one condition.","Use just the best result in each condition."]
    ],
    ["A pupil touches a hot object. Which sequence links detection to withdrawal?","Receptor → sensory neurone → CNS → motor neurone → muscle","The sensory neurone carries the signal in and the motor neurone carries it out.","Muscle → sensory neurone → receptor","Motor neurone → receptor → sensory neurone"],
    ["Which part of the reflex arc makes the hand move?","The effector muscle","Muscle contraction moves the hand.","The temperature stimulus","The sensory neurone"]),

  "electromagnetic-spectrum": lesson(11,"P6","The electromagnetic spectrum",
    "What makes a radio signal and an X-ray part of the same family?",
    "Read from long wavelengths to short wavelengths. Which wave has the higher frequency?",
    "Electromagnetic waves are transverse and travel at the same speed in a vacuum. Their wavelengths, frequencies, and effects differ.",
    ["pairs","Two ends of the electromagnetic spectrum",[
      ["Radio","Longer wavelength","Lower frequency."],
      ["Gamma","Shorter wavelength","Higher frequency."]]],
    [
      ["Compare what stays the same","Electromagnetic waves can travel through a vacuum. Different bands travel at the same speed in a vacuum.",
        "Which travels faster in a vacuum, radio, or X-rays?","They travel at the same speed.","The speed of electromagnetic waves in a vacuum is the same for both.","Radio waves","X-rays"],
      ["Know the order","From long to short wavelength, the bands are radio, microwaves, infrared, visible, ultraviolet, X-rays, and gamma.",
        "Which band sits between infrared and ultraviolet?","Visible light","Visible light is next to both in the spectrum.","Microwaves","Gamma rays"],
      ["Select a use or precaution","Infrared cameras detect radiation emitted by warm surfaces. X-rays can pass through soft tissue more easily than bone. X-rays and gamma rays are ionising.",
        "Why limit unnecessary exposure to X-rays?","They can ionise atoms and damage cells.","Ionising radiation can damage biological molecules.","They travel too slowly in a vacuum.","All X-rays are absorbed by air."]
    ],
    ["A warm object is viewed in darkness with a thermal camera. What is the camera detecting?","Infrared emitted by the object.","Warm objects emit infrared radiation.","A stream of hot particles.","Ultraviolet from a room lamp that is switched off."],
    ["Which has the shorter wavelength, radio, or ultraviolet?","Ultraviolet","It is nearer the short-wavelength end of the spectrum.","Radio","They are always the same length."]),

  "selection-and-variation": lesson(11,"B6","Variation, selection, and evolution",
    "How can a population change while its individuals keep the same features?",
    "Compare the proportion of dark insects before and after several generations. Both generations live on dark bark.",
    "Natural selection changes how common inherited features are in a population over generations.",
    ["bars","An illustrative population on dark bark","Proportion of dark insects",[["First generation","40%",40],["Later generation","75%",75]]],
    [
      ["Start from variation","Individuals can have different inherited features. If birds spot one colour less often, individuals with that colour can be more likely to survive and reproduce.",
        "Did individual pale insects need to turn dark?","No. The insects already varied in colour.","Selection changes the proportion of inherited features over generations.","Yes. Every pale insect changed colour.","Yes. Birds produced the colour change."],
      ["Pass on inherited features","Survivors can pass on alleles to their offspring. Over many generations, helpful inherited variants can become more common.",
        "Which process passes a feature from parents to offspring?","Inheritance","Alleles in gametes can contribute to offspring characteristics.","Photosynthesis","A change in an individual’s diet"],
      ["Compare with selective breeding","In selective breeding, people choose parents for desired inherited features. In natural selection, differences in survival and reproduction arise in the environment.",
        "In which case are people choosing the parents?","Selective breeding","Human choice decides which individuals breed.","Natural selection in wild insects","Random fertilisation by itself"]
    ],
    ["After a drought, more plants with inherited deep roots survive and produce seeds. Predict the later population.","Deep roots may become more common.","More surviving parents can pass on alleles associated with deep roots.","Each short-rooted plant changes its inherited alleles immediately.","Every plant species goes extinct."],
    ["What must be true for a feature to become more common by natural selection?","It can be inherited and can affect survival or reproduction.","The feature must be passed on and influence reproductive success.","The feature is newly chosen by every offspring.","All individuals have the feature already."])
};


const furtherCatchup = {
  "prevention-and-medicines": lesson(10,"B3","Preventing transmission and testing medicines",
    "Why might a mosquito net help against malaria while antibiotics do not prevent measles?",
    "Compare the ways the pathogens spread. Which step would help interrupt each route?",
    "Preventing disease starts with how the pathogen spreads. Medicines are tested for safety, effectiveness, and suitable dose.",
    ["pairs","Two different routes",[
      ["Measles","Virus → droplets from a person","Vaccination reduces the risk of developing the disease."],
      ["Malaria","Protist → mosquito → person","Mosquito nets can reduce bites."]]],
    [
      ["Match the prevention to transmission","Malaria is caused by a protist carried by mosquitoes. Salmonella bacteria can spread through contaminated food. Measles is spread in droplets.",
        "Which option reduces malaria transmission directly?","Prevent mosquito bites.","This interrupts the route from vector to person.","Use antibiotics for every cough.","Leave all food uncovered."],
      ["Distinguish symptoms and cause","Painkillers can relieve symptoms. Antibiotics act against susceptible bacteria. Antibiotic use selects for resistant bacteria.",
        "What can happen if susceptible bacteria die and resistant bacteria survive?","Resistant bacteria can reproduce and become more common.","The drug selects which bacteria survive.","Every bacterium gains resistance immediately.","The antibiotic creates more viruses."],
      ["Test first, then compare","Potential medicines are first tested in cells, tissues and animals where appropriate. Clinical trials check safety and dose before larger comparisons of effectiveness, often using controls.",
        "Why use a comparison group in a clinical trial?","To help separate the drug’s effect from other causes of change.","A comparison helps determine whether the treatment produced the effect.","It makes a drug automatically safe.","It means dosage can be ignored."]
    ],
    ["A person takes a painkiller for a bacterial infection and feels better. What can be concluded?","Their symptoms improved. The painkiller need not have killed the bacteria.","Symptom relief and treating the cause are different.","The painkiller must have killed all bacteria.","The infection was definitely viral."],
    ["Which transmission route is targeted by cooking contaminated food thoroughly?","Pathogens passed on in food.","The treatment reduces viable pathogens in the food.","Transmission by mosquito bites.","Inherited conditions passed to offspring."]),

  "radiation-types": lesson(10,"P4","Alpha, beta, and gamma radiation",
    "Why can a sheet of paper stop one emission while a thick barrier is needed for another?",
    "Read across the shielding comparisons. Which emission is the most penetrating?",
    "Unstable nuclei emit radiation. Alpha, beta, and gamma differ in their nature, ionising ability and penetration.",
    ["pairs","Compare the shielding",[
      ["Alpha and beta","Paper stops alpha","A few millimetres of aluminium can stop beta."],
      ["Gamma","Thick shielding reduces gamma","Dense lead or thick concrete can reduce the intensity."]]],
    [
      ["Identify the emissions","An alpha particle is a helium nucleus. A beta-minus particle is an electron emitted by the nucleus. Gamma is electromagnetic radiation.",
        "Which emission has no mass or electric charge?","Gamma radiation","Gamma is electromagnetic radiation.","Alpha particles","Beta-minus particles"],
      ["Connect ionisation and penetration","Alpha is more strongly ionising and has a short range. Gamma is less ionising per unit distance and more penetrating.",
        "Why can alpha contamination inside the body be dangerous?","Alpha can strongly ionise nearby tissue.","Its short range does not prevent damage when the source is inside the body.","Alpha becomes a gamma ray inside the body.","Alpha radiation stops being ionising."],
      ["Read a decay equation","In alpha decay the nucleus loses two protons and two neutrons. Its mass number falls by four and its atomic number by two.",
        "After one alpha decay, what happens to the atomic number?","It decreases by 2.","The nucleus loses two protons.","It decreases by 4.","It stays the same."]
    ],
    ["A source is stopped by thin aluminium but passes through paper. Which emission fits these observations?","Beta","Beta is more penetrating than alpha but less penetrating than gamma.","Alpha","Gamma"],
    ["After gamma emission, how does the number of protons in the nucleus change?","It stays the same.","A gamma photon carries away energy and leaves the proton number unchanged.","It decreases by two.","It increases by one."]),

  "circuit-resistance": lesson(10,"P2","Resistance, current, and electrical power",
    "Why does a filament lamp not follow a straight-line graph?",
    "Compare the slopes of the current–potential difference curves as the potential difference rises.",
    "Resistance is potential difference divided by current. Heating a filament increases its resistance.",
    ["curve","Current changes as potential difference increases","Potential difference","Current",[
      ["Fixed resistor",[[0,0],[1,2],[2,4],[3,6],[4,8]]],
      ["Filament lamp",[[0,0],[1,2],[2,3],[3,3.7],[4,4.2]]]],"The fixed resistor is at a constant temperature."],
    [
      ["Measure V and I","Connect an ammeter in series with the component. Connect a voltmeter in parallel across it.",
        "How should a voltmeter be connected across a lamp?","In parallel","Potential difference is measured between two points.","In series only","With no connection to either end"],
      ["Read the filament graph","As current increases, the filament warms and its resistance rises. The same increase in potential difference then produces a smaller increase in current.",
        "What does a smaller rise in current for the same rise in voltage suggest here?","The filament’s resistance has increased.","Heating changes the filament’s resistance.","The supply makes new filament material.","The voltmeter measures current instead."],
      ["Use power and energy","Power is energy transferred each second. Electrical power can be calculated using P = VI. Multiplying power by time gives the energy transferred.",
        "A 6 V device draws 2 A. What is its electrical power?","12 W","Multiply 6 V by 2 A.","3 W","8 W"]
    ],
    ["A 12 W lamp runs for 5 s. How much energy is transferred?","60 J","Multiply 12 joules per second by 5 seconds.","2.4 J","17 J"],
    ["An ohmic resistor holds constant temperature. What happens to current if voltage doubles?","It doubles.","The resistance is unchanged, so current is proportional to voltage.","It halves.","It stays the same."]),

  "reproductive-hormones": lesson(10,"B5","Hormones and the menstrual cycle",
    "How do hormones make ovulation happen at a particular point in the cycle?",
    "Follow the arrows from hormone release to the events in the ovary.",
    "Hormones act as chemical messages. During the menstrual cycle, they regulate egg maturation, ovulation and the uterus lining.",
    ["pairs","Two early steps in the cycle",[
      ["FSH","Pituitary → ovary","Helps an egg mature in a follicle."],
      ["LH","Pituitary → ovary","A rise in LH triggers ovulation."]]],
    [
      ["Find source and target","Endocrine glands release hormones into the blood. They act on target tissues. FSH and LH are released by the pituitary gland.",
        "Which gland releases FSH and LH?","Pituitary gland","These hormones travel in the blood to act on the ovary.","Pancreas","Thyroid gland"],
      ["Separate the events","FSH helps a follicle and its egg mature. LH triggers release of the egg. Oestrogen helps rebuild the uterus lining and progesterone helps maintain it.",
        "Which hormone triggers ovulation?","LH","A rise in LH triggers the release of the egg.","Insulin","Progesterone"],
      ["Compare contraception","Hormonal contraceptives can prevent ovulation. A condom is a barrier that helps prevent sperm reaching the egg.",
        "How does a condom help prevent pregnancy?","It acts as a barrier to sperm.","It reduces the chance of sperm reaching the egg.","It increases the release of eggs.","It is a source of FSH."]
    ],
    ["If egg maturation has occurred but ovulation does not happen, which event is missing?","Release of the egg from the ovary","Maturation and release are separate events.","The ovary begins to exist.","The egg starts to release insulin."],
    ["Which hormone helps maintain the uterus lining after ovulation?","Progesterone","Progesterone helps maintain the lining.","Glucagon","Insulin"],
    "Higher Tier · Oestrogen and progesterone feed back on pituitary hormones. In fertility treatment, FSH and LH can be used to stimulate egg maturation and ovulation."),

  "carbon-cycling": lesson(10,"B7","Carbon cycling and biodiversity",
    "How can carbon from a fallen leaf return to the air?",
    "Follow carbon into the leaf and out again. Where does it return to the atmosphere?",
    "Carbon atoms cycle between living organisms and their surroundings. Photosynthesis removes carbon dioxide, and respiration returns it.",
    ["pairs","One path through the carbon cycle",[
      ["Carbon dioxide in air","Photosynthesis → plant matter","Carbon becomes part of glucose and other substances."],
      ["Fallen leaf","Decomposers break it down","Respiration releases carbon dioxide."]]],
    [
      ["Move carbon into living material","Plants use carbon dioxide in photosynthesis. Feeding transfers carbon compounds from one organism to another.",
        "What process moves carbon from air into sugars in the plant?","Photosynthesis","Plants use carbon dioxide to produce sugars.","Combustion","Evaporation"],
      ["Return carbon to the atmosphere","Plants, animals, and decomposers respire. Combustion of organic fuels can also release carbon dioxide.",
        "How can decomposers return carbon to the air?","By respiration","Respiration produces carbon dioxide.","By releasing oxygen only","By turning carbon atoms into new elements"],
      ["Link habitats to diversity","Biodiversity is the variety of living organisms. Protecting habitats and restoring areas can help populations survive.",
        "Which action can support biodiversity?","Protect several different habitats.","Different organisms use different conditions and resources.","Replace all habitats with one crop.","Remove the variety of food sources."]
    ],
    ["A woodland loses many trees. Which process that removes carbon dioxide from air is reduced?","Photosynthesis","With less leaf area, less carbon dioxide can be removed by the trees under similar conditions.","Combustion","Decomposition"],
    ["A dead plant breaks down. What type of organism helps this happen?","Decomposer","Decomposers break down dead material and recycle substances.","Only a producer","Only a large herbivore."])
};

export const gcseCatchup = {...year10Catchup, ...year11Catchup, ...complementary, ...furtherCatchup, ...priorityCatchup};

import { question } from "./school-catchup-journey.js";

const q = question;
const guided = (hint, task) => ({...task, hint});
const teach = (title, explanation, task) => ({...task, teach: [title, explanation]});
const lesson = (code, title, hook, notice, idea, visual, steps, retry) =>
  ({year: 9, code, title, hook, notice, idea, visual, steps, retry});

export const year9 = {
  "cell-structures": lesson("B1", "Cell structures",
    "Why do working muscle cells need lots of mitochondria?",
    "Find a mitochondrion in each cell, then find a chloroplast.",
    "A specialised cell has structures that help it do its job.",
    ["Structures in typical cells", ["Structure", "Job"], [
      ["Nucleus", "Contains genetic information"], ["Mitochondria", "Site of aerobic respiration"],
      ["Ribosomes", "Make proteins"], ["Chloroplasts in green plant cells", "Absorb light for photosynthesis"]]],
    [
      teach("Inside a cell", "The nucleus holds DNA. Ribosomes are tiny structures that build proteins. A diagram may show them as dots.", q("Which structure makes proteins?", "Ribosomes", "Ribosomes assemble proteins.", ["Chloroplasts", "Chloroplasts absorb light for photosynthesis. Ribosomes make proteins."], ["The cell wall", "The cell wall supports the cell. Ribosomes make proteins."])),
      teach("A working muscle", "Muscle cells need a steady supply of energy when they contract. Aerobic respiration takes place in mitochondria. Both plant and animal cells have them.",
        guided("Think about how a muscle gets energy for contraction.", q("Which structure would a working muscle cell often need in large numbers?", "Mitochondria", "Aerobic respiration in mitochondria transfers energy for muscle contraction.", ["Chloroplasts", "Chloroplasts absorb light for photosynthesis. Muscle cells get energy for contraction through respiration."], ["Cell walls", "Cell walls support plant cells. Muscle cells are animal cells and need mitochondria for aerobic respiration."]))),
      teach("Jobs in a plant", "A leaf cell absorbs light. A root hair cell takes up water and mineral ions. The structures in each cell suit its job.", q("A root hair cell lacks chloroplasts. Which explanation is most useful?", "Its job is absorption, and it usually grows out of the light.", "Plant cells can be specialised for different jobs.", "It is an animal cell.", "Every plant cell must contain chloroplasts.")),
      {...q("Which label gives the best evidence that this could be a plant cell?", "A", "A points to the cell wall. Plant cells can lack chloroplasts. The mitochondrion and nucleus are found in both plant and animal cells.", "B", "C"),
        image: ["/assets/ks3-diagrams/root-cell-check.svg", "Three labels on an unfamiliar cell. A points to its thick outer boundary. B points to a small oval with a folded line. C points to the large dark oval."]}
    ],
    q("Why does a root hair cell have a long extension?", "It increases the surface area for absorption.", "The extension allows more surface contact with the soil.", "It makes the cell divide faster.", "It replaces the cell membrane.")),

  osmosis: lesson("B1", "Osmosis",
    "Why might a piece of potato gain mass in water?",
    "Trace the arrows through the membrane. Which way do more water molecules cross?",
    "Osmosis is the net movement of water molecules through a partially permeable membrane from a more dilute to a more concentrated solution.",
    ["A simple membrane model", ["Side A", "Partially permeable membrane", "Side B"], [
      ["More dilute solution", "Water can cross in both directions", "More concentrated solution"],
      ["Net movement starts here", "Net water movement →", "Net movement is towards this side"]]],
    [
      teach("Partially permeable membranes", "A partially permeable membrane lets water molecules cross. Some dissolved particles are too large to pass through.", q("What moves through the membrane by osmosis?", "Water molecules", "Osmosis describes movement of water through a partially permeable membrane.", ["Dissolved sugar", "Osmosis describes the water, not the movement of solute."], "All particles in the solution")),
      teach("Movement in both directions", "Look at sides A and B in the notes. Water crosses both ways. The net direction is the way more water crosses overall.",
        guided("Find the dilute side first. That is where the net movement starts.", q("Which way is the net movement of water in the model?", "From A to B", "More water moves from dilute A to concentrated B than moves back.", ["From B to A", "B is the more concentrated side. The net movement of water is towards B."], ["There is no movement in either direction", "Water crosses both ways. The net direction shows which way more crosses."]))),
      teach("Water leaving cells", "Cucumber in salty brine can lose water. More water moves from its cells into the brine than moves back in.", q("A potato piece loses mass in a concentrated salt solution. What most directly explains the loss?", "Water moves out by osmosis.", "The solution outside is more concentrated than the cell contents, so there is net movement out.", ["Salt leaves the potato by osmosis.", "Osmosis describes net movement of water."], "The cells have to divide.")),
      q("A wilted leaf is put into pure water. Its cells gain water. Which way is the net movement?", "From the water into the leaf cells", "The water outside is more dilute than the cell contents, so water moves into the cells by osmosis.", "From the cells into the water", "There is no net movement")
    ],
    q("A similar potato piece gains mass in pure water. Which way was the net movement?", "From the water into the potato cells", "The solution outside is more dilute than the cell contents.", "From the potato cells into the water", "There was no net movement")),

  "active-transport": lesson("B1", "Active transport",
    "How can a root cell take in mineral ions when their concentration is already higher inside?",
    "Find the lower ion concentration in the zoomed view, then trace an ion.",
    "Active transport can move substances against their concentration gradient. It requires energy from respiration.",
    ["Two ways of moving substances", ["Process", "Direction", "Energy from respiration needed?"], [
      ["Diffusion", "Higher to lower concentration overall", "No"],
      ["Active transport in this example", "Lower to higher concentration", "Yes"]]],
    [
      teach("Two possible directions", "In diffusion, particles spread from higher to lower concentration. A membrane can also move some substances from lower to higher concentration. This is active transport.", q("A root cell takes up ions from lower concentration outside to higher concentration inside. What process is this?", "Active transport", "The movement goes against the concentration gradient.", "Osmosis", "Diffusion")),
      teach("Where the energy comes from", "Moving ions against their concentration gradient takes energy. Respiration supplies this energy.",
        guided("Compare the direction of the ions with the concentration gradient.", q("Which change could reduce this uptake?", "A reduced energy supply from respiration", "Active transport requires energy.", "Keeping the membrane intact", "Keeping the soil wetter in every situation"))),
      teach("The same idea in the gut", "Gut cells absorb dissolved nutrients. Compare their concentration on each side of the cell membrane.", {
        ...q("Cells in the gut take up a dissolved nutrient when its concentration is lower in the gut than inside the cells. What is needed?", "Active transport using energy", "There is net movement against a concentration gradient.", "Diffusion down the gradient", "Water moving by osmosis"),
        image: ["/assets/ks3-diagrams/gut-transport-check.svg", "A dissolved nutrient moves from the gut, where its concentration is lower, into a gut cell, where its concentration is higher."]
      }),
      q("An aquatic plant takes up ions when their concentration is lower outside its cells. Which process allows this?", "Active transport", "The ions move against their concentration gradient. This requires energy.", "Diffusion", "Osmosis")
    ],
    q("Which observation most strongly suggests active transport?", "Ions enter a cell even though their concentration is already higher inside.", "Movement from lower to higher concentration requires an energy-dependent process in this example.", "A gas spreads through air.", "Water crosses a partially permeable membrane.")),

  mitosis: lesson("B1", "Mitosis",
    "How does each new cell get a full copy of the original cell’s DNA?",
    "Step through the pictures. Look for two nuclei inside one cell.",
    "The cell copies its DNA before mitosis. In mitosis, the copies separate into two nuclei. The cell then divides into two genetically identical cells.",
    ["From one cell to two", ["Stage", "What happens"], [
      ["Before mitosis", "The cell grows and copies its DNA"],
      ["Mitosis", "The chromosome copies separate into two nuclei"],
      ["Cell division", "The cell divides to form two cells"]]],
    [
      teach("A full set of instructions", "To make two new cells with the same genetic information, each cell needs its own full set of DNA.", q("What must happen to DNA before its copies separate?", "It must be copied.", "Both new nuclei need a complete set of genetic information.", "It must be halved without copying.", "It must leave both nuclei.")),
      teach("Copy, separate, divide", "The cell copies its DNA first. During mitosis the chromosome copies separate into two nuclei. The cell then divides.",
        guided("Find the step where the chromosome copies separate.", q("Which step is mitosis itself?", "Division of the nucleus", "During mitosis the chromosome copies are separated to form two nuclei.", "Absorption of water", "The cell growing larger"))),
      teach("Mitosis in living things", "Skin makes new cells to replace damaged ones. Plants make new cells as they grow. Each new cell needs the same genetic information as the original.", q("A plant makes new cells at a root tip. How do those cells normally receive the same genetic information as the original cell?", "DNA is copied, then copies separate before the cell divides.", "The copied DNA supplies a complete set of information to each nucleus.", "Each new cell receives half the genes.", "The new cells make different genes during growth.")),
      q("A skin cell copies its DNA before dividing as a cut heals. Why must the chromosome copies separate into two nuclei?", "So each new cell gets a full set of genetic information.", "Copying makes two sets. Separating puts one set in each nucleus.", "So each nucleus gets half of the genes.", "So the cells stop containing DNA.")
    ],
    q("What could happen if an original cell divided without first copying its DNA?", "The two new cells could fail to receive a complete set of genetic information.", "Copies must be made before they can be distributed to both cells.", "Both cells would automatically receive an extra set.", "The amount of DNA inside each cell would double.")),

  "atomic-number": lesson("C1", "Atomic number and isotopes",
    "If a sodium atom loses an electron, is it still sodium?",
    "Find the 11 protons in each nucleus. Then see what changes when an electron is removed.",
    "The proton number identifies the element. Changing electrons makes an ion. Changing neutrons gives a different isotope of the same element.",
    ["Compare the particles in the examples", ["Example", "Protons", "Neutrons", "Electrons"], [
      ["Sodium atom", "11", "12", "11"], ["Sodium ion", "11", "12", "10"], ["Different sodium isotope", "11", "13", "11"]]],
    [
      q("Which number tells you all three examples are sodium?", "11 protons", "Every sodium nucleus contains 11 protons.", "12 neutrons", "11 electrons"),
      guided("Protons are positive and electrons are negative. Compare their numbers.",
        q("What is the charge if there are 11 protons and 10 electrons?", "+1", "There is one more positive charge than negative charge.", "−1", "0")),
      q("Two neutral atoms have six protons. One has six neutrons and one has eight. What are they?", "Different isotopes of the same element", "They have the same proton number and different neutron numbers.", "Different elements", "Ions of different charges")
    ],
    q("A neutral chlorine atom gains an electron. Why is it still chlorine?", "Its nucleus still contains the same number of protons.", "The electron change affects charge. The proton number identifies chlorine.", "The neutron number always identifies the element.", "A new proton enters to balance the electron.")),

  "periodic-table": lesson("C1", "Groups in the periodic table",
    "Why do lithium and sodium react in similar ways?",
    "Find the marked electron in each outer shell. Compare the last number in each arrangement.",
    "Elements in the same group often react in similar ways because they have the same number of electrons in their outer shell.",
    ["Outer electrons of some Group 1 metals", ["Element", "Electrons in shells", "Outer-shell electrons"], [
      ["Lithium", "2, 1", "1"], ["Sodium", "2, 8, 1", "1"], ["Potassium", "2, 8, 8, 1", "1"]]],
    [
      q("What do lithium and sodium have in common in the model?", "One outer-shell electron", "Their other shells differ. Both end with one electron in the outer shell.", "The same total number of electrons", "The same number of occupied shells"),
      guided("Use the last number rather than the total number of electrons.",
        q("An atom has the arrangement 2, 8, 8, 1. Which shown group is it likely to belong to?", "Group 1", "It has one outer-shell electron.", "Group 8", "A group determined by its total number of electrons")),
      q("Two atoms have arrangements 2, 7 and 2, 8, 7. Why might their reactions be similar?", "Both have seven electrons in the outer shell.", "Their outer-shell electrons can be involved in forming bonds or ions.", "They have the same number of shells.", "They have the same mass.")
    ],
    q("Which information best predicts similar reactions for two Group 1 elements?", "They each have one electron in the outer shell.", "In this group, the same outer-shell arrangement helps explain the similarity.", "Each has exactly one proton.", "They each have the same number of occupied shells.")),

  "energy-stores": lesson("P1", "Energy stores and transfers",
    "A dropped ball stops on the ground. Where has its energy gone?",
    "Follow the energy before, during and after the fall.",
    "Energy is conserved. It is transferred between stores and can spread to the surroundings, where less of it remains useful.",
    ["A ball is dropped and comes to rest", ["Moment", "Store or transfer to look for"], [
      ["Before release", "Gravitational potential store of the ball and Earth"],
      ["During the fall", "Energy is transferred into the kinetic store"],
      ["During and after impact", "Energy is transferred to thermal stores. Some is transferred by sound."]]],
    [
      q("Which store gains energy while the ball speeds up?", "Kinetic store", "A moving object has energy in its kinetic store.", "Chemical store", "Gravitational potential store"),
      guided("The final speed is zero. Look for transfers made during the impact.",
        q("Why can surfaces warm up when the ball stops?", "Energy has been transferred to thermal stores.", "A decrease in kinetic energy can be accounted for by transfers elsewhere.", "The ball creates extra energy on contact.", "Stopping destroys its energy.")),
      q("A cyclist brakes until the bicycle stops. What happens to much of the energy from the kinetic store?", "It is transferred to thermal stores and spreads to the surroundings.", "Braking transfers energy as the bicycle slows. The brakes can warm up.", "It vanishes when the speed reaches zero.", "It all returns to a gravitational potential store.")
    ],
    q("Why does a bouncing ball reach a lower height each time?", "Some energy spreads to the surroundings at each bounce.", "Less energy returns to the ball’s kinetic and gravitational potential stores after each impact.", "Energy is destroyed on each impact.", "Its weight rises after each bounce.")),

  "energy-transfer": lesson("P1", "Power and energy",
    "Can a more powerful device use less energy overall?",
    "Compare the height of one block, then reveal the total energy each device transfers.",
    "Power is energy transferred per second. Efficiency is the fraction of the input transferred usefully.",
    ["Compare two devices", ["Device", "Power", "Time", "Total transfer"], [
      ["A", "100 W", "2 s", "200 J"], ["B", "50 W", "10 s", "500 J"]]],
    [
      q("Which device transfers energy faster?", "A, because its power is higher.", "Watts show joules transferred each second.", "B, because it runs for longer.", "They transfer energy at the same rate."),
      guided("Multiply power in watts by time in seconds.",
        q("Why does B transfer more energy overall?", "It runs for longer, enough to make up for its lower power.", "B transfers 50 J each second for 10 s, which gives 500 J.", "A larger number of seconds always means more power.", "Power and energy are the same quantity.")),
      q("A device receives 200 J and transfers 70 J usefully. What is its efficiency?", "35%, because 70 ÷ 200 = 0.35", "Efficiency compares useful output with total input.", "65%, because that is the fraction wasted.", "130%, because 200 − 70 = 130")
    ],
    q("One lamp transfers 24 J of useful light from 60 J supplied. What fraction of its input was useful?", "0.4, or 40%", "Divide the useful 24 J by the total 60 J.", "0.6, or 60%", "36%, because 60 − 24 = 36")),

  "gas-exchange": lesson("B2", "Gas exchange",
    "Why does a lung have millions of tiny air sacs?",
    "Trace oxygen across the air-sac wall and through the bloodstream.",
    "Gas exchange is faster over a short distance, across a large surface and when differences in concentration are maintained.",
    ["Follow oxygen from air to a muscle", ["Where", "What happens"], [
      ["Air sac in a lung", "Oxygen concentration is higher in the air than in nearby arriving blood"],
      ["Air-sac and capillary walls", "Oxygen diffuses across the thin barrier"],
      ["Bloodstream", "Blood carries oxygen via the heart to muscle capillaries"],
      ["Muscle capillaries", "Oxygen diffuses from blood into muscle cells"]]],
    [
      q("Where does oxygen first enter the blood in this sequence?", "Across the barrier at an air sac", "Oxygen diffuses from air in an alveolus to blood in nearby capillaries.", "Inside the heart", "Inside the muscle"),
      guided("Think about the distance a molecule must move across the wall.",
        q("Why do thin walls help?", "They make the diffusion distance short.", "Substances have less distance to travel.", "They turn oxygen into carbon dioxide.", "They stop all gases escaping.")),
      q("An exchange surface is damaged and becomes thicker. With other conditions unchanged, what is likely to happen?", "Oxygen diffuses across it more slowly.", "A thicker barrier increases the diffusion distance.", "Oxygen diffuses faster because there is more wall.", "Oxygen can only move by active transport.")
    ],
    q("A different organism has a gas exchange surface folded many times. How could folding help?", "It gives more surface area for diffusion.", "More area is available for gases to cross at the same time.", "It turns diffusion into respiration.", "It removes the need for a difference in concentration.")),

  enzymes: lesson("B2", "Enzymes and temperature",
    "Why can gentle warming help an enzyme while stronger heat stops it working?",
    "Compare the active site before and after strong heating.",
    "An enzyme is a biological catalyst. Its substrate fits its active site. High temperatures can change the active site’s shape, so fewer substrates bind.",
    ["A model of enzyme action", ["State", "Active site", "Result"], [
      ["At a suitable temperature", "Shape is complementary to the substrate", "Substrates can bind and react"],
      ["After denaturation by high heat", "Shape has changed", "Fewer substrates can bind"]]],
    [
      q("Where does a substrate normally bind?", "At the enzyme’s active site", "The substrate can bind where the shapes are complementary.", "At every part of the enzyme", "On a cell wall instead"),
      guided("Compare the active site after gentle warming and after strong heating.",
        q("Why can strong heating lower the enzyme’s activity?", "The active site changes shape and fewer substrates bind.", "This change is called denaturation.", "The enzyme is used up as a reactant.", "The heat creates more substrate.")),
      q("A digestive enzyme is heated until denatured, then cooled. Why can it stay inactive?", "Cooling need not restore the original active-site shape.", "If the shape remains changed, the substrate may still be unable to bind.", "Enzymes are alive and cannot come back to life.", "Cooling always restores every enzyme.")
    ],
    q("A change in pH alters an enzyme’s active site. What can happen to the reaction?", "It may slow because fewer substrates fit.", "The active-site shape affects whether the enzyme and substrate can bind.", "It must speed up because there is more enzyme.", "The substrate stops being a molecule.")),

  "ionic-conduction": lesson("C2", "Ionic compounds and conductivity",
    "What changes about a salt when it melts and starts to conduct electricity?",
    "In which state can ions move through the salt?",
    "An ionic compound contains oppositely charged ions. An electric current can flow when the ions are able to move and carry charge.",
    ["The same ionic compound in two states", ["State", "Ions", "Conduction"], [
      ["Solid", "Held in fixed positions in a lattice", "No mobile ions to carry the current"],
      ["Molten", "Free to move past one another", "Mobile ions can carry the current"]]],
    [
      q("Which particles can carry charge in molten sodium chloride?", "Moving ions", "Both positive and negative ions can move through the liquid.", "Uncharged salt molecules", "Only loose protons"),
      guided("The ions are charged in both rows. Which property changes when the solid melts?",
        q("Why does solid sodium chloride fail to conduct?", "Its ions are held in fixed positions.", "A flow of charge needs charged particles able to move through the substance.", "Its ions have no charge while solid.", "The solid contains no particles.")),
      q("Magnesium chloride dissolves in water. Why can its solution conduct?", "Its ions are free to move in the solution.", "Mobile positive and negative ions can carry charge.", "It becomes a metal.", "All the ions lose their charge.")
    ],
    q("A molten ionic compound solidifies. What explains the fall in conductivity?", "Its ions are now held in position in the lattice.", "The charges are still present, but they can no longer move through the solid.", "The liquid ions turn into neutral atoms.", "The electrons in each ion are all lost.")),

  "molecular-melting": lesson("C2", "Melting molecular substances",
    "Do the atoms in each water molecule separate when ice melts?",
    "Separate bonds within a molecule from attractions between molecules.",
    "When a simple molecular substance melts, attractions between molecules are overcome. The covalent bonds within each molecule remain intact.",
    ["Two types of attraction in a molecular substance", ["Where", "What to track"], [
      ["Within a molecule", "Strong covalent bonds join its atoms"],
      ["Between neighbouring molecules", "Attractions hold neighbouring molecules near each other"],
      ["When it melts", "Molecules can move past one another. Their atoms stay bonded."]]],
    [
      q("Where are the covalent bonds in this model?", "Between atoms within one molecule", "Covalent bonds join atoms. Attractions also act between separate molecules.", "Only between whole molecules", "Only at the outside edge of the solid"),
      guided("Follow one entire molecule across the change of state.",
        q("What happens to a water molecule when ice melts?", "It remains a water molecule.", "The attractions between molecules are partly overcome as they move past each other.", "It breaks into hydrogen and oxygen atoms.", "It becomes an ionic compound.")),
      q("Why do many simple molecular substances melt at relatively low temperatures?", "Relatively little energy is needed to overcome attractions between their molecules.", "Melting leaves the strong covalent bonds within the molecules intact.", "All their covalent bonds are weak.", "Their molecules have no particles inside them.")
    ],
    q("A simple molecular substance boils. What stays intact during this change of state?", "The covalent bonds within its molecules", "Boiling separates molecules from one another.", "The fixed positions of the molecules", "All attractions between neighbouring molecules"))
};

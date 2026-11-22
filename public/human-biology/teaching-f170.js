/* Original F170 teaching sequences. Keys match the existing Catch-up routes. */
window.KeystoneHumanLessons = {
  "f170/1.2.1": {
    goal: "Use a change in one tissue to explain an effect on an organ and the system it belongs to.",
    activate: ["What makes a group of cells a tissue?", "Cells in a tissue work together for a particular function. A tissue may contain more than one cell type."],
    prior: ["f170/1.1.1", "Review specialised cells"],
    explain: [
      "Specialised cells contribute to a tissue. Several tissues work together in an organ. Organs cooperate in an organ system.",
      "To explain the effect of damage, start with the job the affected tissue normally does. Then trace what changes in the organ and system."
    ],
    modelTitle: "Trace damage from tissue to system",
    model: [
      "Ventricular cardiac muscle cells normally contract together to generate pressure.",
      "A large damaged area contracts less effectively. The ventricle may eject less blood per beat.",
      "If the heart rate and other factors stay the same, the circulatory system delivers less blood per minute."
    ],
    guided: {
      prompt: "A region of small-intestine epithelium loses many of its microvilli. Which step links that damage to the organ's job?",
      options: [
        ["Less epithelial membrane is available for absorption.", ""],
        ["The muscles of the stomach can no longer contract.", "Follow the affected tissue first. Microvilli are projections of the absorptive epithelial surface."],
        ["The liver stops making all digestive enzymes.", "The change is at the small-intestine lining. Ask what crosses that lining."]
      ], answer: 0, hints: ["Identify the normal role of the surface facing the gut contents.", "Microvilli enlarge its membrane surface area."],
      explanation: "Less surface area for transport can reduce the rate at which the small intestine absorbs digested nutrients."
    },
    apply: {
      prompt: "Smoke exposure damages cilia in the airway lining. Explain how this can make respiratory infection more likely.",
      hints: ["Recall what airway mucus traps.", "Trace the effect of reduced ciliary movement on movement of mucus."],
      points: ["Mucus traps particles and microorganisms.", "Cilia normally move the mucus towards the throat.", "Reduced clearance leaves microorganisms in the airways for longer."],
      explanation: "When damaged cilia clear mucus less effectively, trapped microorganisms stay in the airways for longer. This can increase the chance of infection."
    }
  }
};

import { mountParagraph } from "./paragraph-order.js";
import { mountSequence } from "./sequence-order.js";
import { rampExample } from "./writing-spo-examples.js";

const sandstone = {
  cards: [
    "This sandstone formed when loose grains of sediment became solid rock.",
    "Sand grains settled and built up in layers.",
    "The weight of the layers above pressed the buried grains closer together.",
    "Minerals deposited between the grains cemented them together.",
    "Deposition, compaction and cementation explain how loose sand became the layered sandstone in the photograph."
  ],
  order: [2, 0, 4, 1, 3],
  guidance: ["Which sentence gives the overall explanation?", "What happened to the loose grains?",
    "What happened to the grains as more layers accumulated?", "What eventually held the grains together?",
    "Which sentence draws the steps together and links them to the photograph?"],
  hints: ["Review the topic sentence. Introduce the whole explanation of how loose grains became rock.",
    "Review supporting sentence 1. The grains have to settle before other layers bury them.",
    "Review supporting sentence 2. Think about what the weight of the layers above does to the grains.",
    "Review supporting sentence 3. The grains have been pressed together. Explain what holds them together.",
    "Review the concluding sentence. Connect the processes to the layers in the photograph."],
  success: "The opening explains how loose sand became rock. The middle traces the process and the ending links it to the layers you can see."
};

const exercises = {
  ramp: {
    paragraphs: [{
      title: "Why use the same car?",
      openingHint: "Start with the sentence that explains why using the same car matters.",
      cards: [rampExample.topic, ...rampExample.details.map(([, sentence]) => sentence), rampExample.conclusion]
    }],
    order: [2, 0, 4, 1, 3]
  },
  rocks: {
    paragraphs: [
      {
        title: "How Sample A formed",
        cards: [
          "The layers in Sample A suggest it formed from sediment.",
          "First, loose grains settled and built up in layers.",
          "As more layers formed on top, their weight pressed the grains below together.",
          "Minerals then cemented the grains together.",
          "Together, these steps explain the layers of hard, cemented grains in Sample A."
        ]
      },
      {
        title: "How Sample B formed",
        cards: [
          "The interlocking crystals in Sample B suggest it formed from molten rock.",
          "First, the molten rock began to cool.",
          "As it cooled, minerals began to form crystals.",
          "The crystals grew until their edges met.",
          "That is how the crystals came to fit together in the solid rock in Sample B."
        ]
      }
    ],
    order: [2, 9, 5, 1, 6, 0, 8, 3, 4, 7]
  }
};


for (const root of document.querySelectorAll("[data-writing-order]")) {
  if (root.dataset.writingOrder === "sandstone") {
    mountParagraph(root, sandstone);
    continue;
  }
  if (root.dataset.writingOrder === "ramp") {
    mountParagraph(root, {
      cards: exercises.ramp.paragraphs[0].cards,
      order: exercises.ramp.order,
      hints: ["Choose the sentence that explains why keeping the car the same matters.",
        "Give a difference between cars before explaining what that difference does.",
        "Link the differences in the cars to the distance rolled.",
        "Explain what keeping the car the same controls.",
        "End with what the pupil can tell from the comparison."],
      success: "The opening answers the question, the middle explains the control, and the ending says what the comparison can show."
    });
    continue;
  }
  const { paragraphs, order } = exercises[root.dataset.writingOrder];
  mountSequence(root, {
    groups: paragraphs.map(({ title, cards, openingHint }) => ({
      title, cards,
      roles: cards.map((_, index) => {
        const last = index === cards.length - 1;
        const label = index === 0 ? "Topic sentence" : last ? "Concluding sentence" : "Supporting sentence " + index;
        const hint = index === 0 ? openingHint || "Start with the sentence that introduces the main idea."
          : last ? "Finish with the sentence that ties the explanation back to the question."
            : "Look for the sentence that directly follows the one before it.";
        return { label: paragraphs.length > 1 ? label + " · " + title : label, hint };
      })
    })),
    order,
    bankTitle: "Sentences to choose from",
    itemName: "sentence",
    reviewLabel: "Review this sentence",
    success: paragraphs.length === 1
      ? "Your opening gives the main idea. The middle explains it, and the ending links it back to the question."
      : "Both paragraphs give the main idea, explain the steps in order, and link them to the rock.",
    answerTitle: paragraphs.length === 1 ? "Read the completed paragraph" : "Read the completed paragraphs",
    answer: paragraphs.map(({ cards }) => cards.join(" "))
  });
}

(function () {
  "use strict";

  const main = document.getElementById("main");
  if (!main || !window.NarajosVocabularyEngine || !window.SiteVocabularyData) return;

  const path = location.pathname;
  const human = path.startsWith("/human-biology/");
  const teaching = path.startsWith("/teaching/enzyme-investigations/") || path.startsWith("/teaching/focused-writing/");
  const teachingGcse = teaching && path.includes("/gcse/");
  const teachingKs3 = teaching && path.includes("/ks3/");
  const gcse = path.startsWith("/gcse/") || teachingGcse;
  const practical = path.startsWith("/gcse/practicals/");
  const school = path.startsWith("/science-catch-up/lesson/");
  const ks3 = path.startsWith("/ks3/") || teachingKs3;
  const course = human ? "aaq" : gcse || school ? "gcse" : ks3 ? "ks3" : "";
  if (!course) return;
  const entries = window.SiteVocabularyData.filter(entry => entry.courses.includes(course));
  let selectedPracticalTopic = "b2";
  const params = new URLSearchParams(location.search);
  const hasTopic = params.get("topic");
  const assessmentSelector = [
    "#qf", ".school-check", "[data-catchup-check]", ".hb-teach-stage[data-hb-stage]",
    "[data-vocabulary-topic]", "[data-vocabulary-review]", ".enzyme-investigation", ".writing-card",
    ".k-challenge-question", ".k-question-form", ".kr-review-card", ".kr-card"
  ].join(",");

  function routeContext({ page, preference }) {
    const route = location.hash.slice(1).split("?")[0];
    let topic = page.topic;
    let subject;
    let catchup = school || (ks3 && !teaching);
    let tier = page.tier || "F";
    if (ks3) {
      topic = teaching ? main.dataset.vocabularyCourseTopic : hasTopic || path.split("/").filter(Boolean)[1];
      subject = "science";
    } else if (school) {
      topic = main.querySelector(".school-code")?.textContent?.trim().toLowerCase();
      subject = topic?.[0] === "b" ? "biology" : topic?.[0] === "c" ? "chemistry" : "physics";
      // The separate Higher disclosure is the only tier-specific part of
      // these lessons. The shared help setting is available at both tiers.
      if ([...main.querySelectorAll("details[open] > summary")].some(summary => /Higher Tier/i.test(summary.textContent))) tier = "FH";
    } else if (gcse) {
      topic ||= practical ? selectedPracticalTopic : teaching ? main.dataset.vocabularyCourseTopic : /^(?:topic|lesson|cards)-([bcp]\d+)/.exec(route)?.[1];
      subject = topic?.[0] === "b" ? "biology" : topic?.[0] === "c" ? "chemistry" : topic?.[0] === "p" ? "physics" : "";
    } else {
      topic = /^catchup\/(f17[0-7])\//.exec(route)?.[1] ||
        /^(?:challenge|skills)\/(f17[0-7])/.exec(route)?.[1] ||
        (/^learn\//.test(route) ? "f170" : undefined);
      subject = "human-biology";
      catchup = /^catchup\/f17[0-7]\//.test(route);
    }
    const visible = Boolean(topic) && (
      practical || teaching || catchup || /^lesson-/.test(route) || /^learn\//.test(route) ||
      /^(?:challenge|skills|practice|cards)\//.test(route) || /^practice-/.test(route)
    );
    return { route, topic, subject, tier, catchup, visible,
      contexts: new Set([route, topic, subject, catchup ? "catchup" : "revision"]),
      increased: preference === "more" || (preference === "auto" && catchup) };
  }

  function entryFits(entry, context) {
    if (!context.topic || !entry.topics.some(topic => topic === "*" || topic === context.topic)) return false;
    if (entry.subjects.length && !entry.subjects.includes("science") && !entry.subjects.includes(context.subject)) return false;
    return entry.tiers.includes("all") || entry.tiers.includes(context.tier);
  }

  function isVisibleAssessment(element, last) {
    if (element.tagName === "DIALOG" && !element.open) return false;
    if (!element.getClientRects().length) return false;
    // The older KS3 checks are all displayed together. A learner selects one
    // by entering it; its scoped restriction then applies to glossary lookup.
    if (element.matches("[data-catchup-check]")) return element === last;
    return true;
  }

  function policyFor({ origin, local, roots, scopePolicy, lastAssessment, restricted, protectedScreen }) {
    if (local && roots.includes(local)) return scopePolicy(local);
    const active = roots.filter(root => !scopePolicy(root).completed);
    if (!origin && active.includes(lastAssessment)) return scopePolicy(lastAssessment);
    if (active.length === 1) return scopePolicy(active[0]);
    if (active.length || protectedScreen()) return restricted;
    return null;
  }

  const vocabulary = window.NarajosVocabularyEngine.create({
    entries,
    searchLabel: "Find a science term",
    triggerClass: ks3 ? "ks3-term" : "",
    scopeSelector: [
      ".ks3-lesson", ".ks3-explanation", ".school-step-notes", ".school-worked-example",
      ".school-check", ".hb-teach-explain", ".hb-teach-stage", ".hb-prerequisite",
      ".k-catchup-concept .paper", ".learning .paper", ".keylines", ".hb-model-steps",
      "[data-catchup-check]"
    ].join(","),
    proseSelector: "p,li,legend,.school-check-question,[data-word-help-text]",
    skipSelector: ".hb-review-answers,.school-check-context,.school-clue,.ks3-feedback,.school-check-feedback,.writing-data,.ks3-choices",
    assessmentSelector,
    routeContext,
    entryFits,
    sortEntries(a, b, context) {
      return Number(b.topics.includes(context.topic)) - Number(a.topics.includes(context.topic)) ||
        a.term.localeCompare(b.term, "en-GB");
    },
    visibleAssessment: isVisibleAssessment,
    contextForBlock(block, context) {
      const topic = practical && block.closest("[data-vocabulary-topic]")?.dataset.vocabularyTopic;
      if (!topic) return context;
      const subject = topic[0] === "b" ? "biology" : topic[0] === "c" ? "chemistry" : "physics";
      return { ...context, topic, subject, contexts: new Set([topic, subject, "revision"]) };
    },
    policyFor,
    protectedScreen() {
      const route = location.hash.slice(1);
      return human && /^(?:challenge|skills|practice|cards)\//.test(route) ||
        gcse && Boolean(main.querySelector("#fcf,#revact,#tstop,#kr-input,.kr-review-card"));
    },
    catchupHref(href) { return href; }
  });

  window.SiteVocabulary = vocabulary;
  vocabulary.mount(main);
  if (teaching) {
    const card = main.querySelector(".enzyme-investigation,.writing-card");
    if (card) {
      const incidental = teachingKs3
        ? (card.matches(".enzyme-investigation") ? ["ks3-enzyme","ks3-substrate"] : ["ks3-particle"])
        : (card.matches(".enzyme-investigation") ? ["gcse-enzyme"] : ["gcse-infer"]);
      vocabulary.setAssessment(card, { incidental });
      for (const details of card.querySelectorAll("details.writing-step")) {
        details.dataset.vocabularyReview = "";
        vocabulary.setAssessment(details, { completed: true });
      }
      const model = card.querySelector("[data-explanation-model]");
      if (model) {
        model.dataset.vocabularyReview = "";
        vocabulary.setAssessment(model, { completed: true });
      }
    }
  }
  if (practical) {
    const reviewed = {
      b2: ["gcse-digestion"],
      c8: [],
      p2: ["gcse-electric-current", "gcse-potential-difference"]
    };
    for (const card of main.querySelectorAll("[data-vocabulary-topic]")) {
      vocabulary.setAssessment(card, { incidental: reviewed[card.dataset.vocabularyTopic] || [] });
      const answer = card.querySelector("details");
      if (answer) {
        answer.dataset.vocabularyReview = "";
        vocabulary.setAssessment(answer, { completed: true });
      }
    }
    for (const type of ["focusin", "pointerdown"]) main.addEventListener(type, event => {
      const card = event.target.closest("[data-vocabulary-topic]");
      if (!card || selectedPracticalTopic === card.dataset.vocabularyTopic) return;
      selectedPracticalTopic = card.dataset.vocabularyTopic;
      vocabulary.update();
    });
  }

  // GCSE's inline application sends the active topic and tier directly.
  // Other pages resolve their course and lesson from the current route.
})();

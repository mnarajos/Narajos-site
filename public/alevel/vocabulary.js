(function () {
  "use strict";

  const entries = window.ALevelVocabularyData || [];
  const byId = new Map(entries.map(entry => [entry.id, entry]));
  const preferenceKey = "keystone.alevel.vocabulary.preference.v1";
  const settings = new Set(["auto", "selective", "more"]);
  const scopeSelector = [
    ".key", ".companion-chunk", ".companion-why", ".worked", ".passage", "#qf",
    "#hintbox", "#fb", ".al-teaching", ".al-step", ".al-task-stimulus", ".al-task-prompt",
    ".al-interpretation", ".al-key-notes", ".al-paper-prompt", ".al-paper-review",
    ".al-drawing-example", ".al-drawing-conventions", ".al-drawing-evidence", ".rp-card",
    ".practice-card", "[data-word-help-scope]"
  ].join(",");
  const proseSelector = "p,li,legend,.al-task-prompt,[data-word-help-text]";
  const skipSelector = [
    "a", "button", "label", "input", "textarea", "select", "option", "summary", "script", "style",
    "math", "svg", "sup", "sub", "table", "figure", ".fig", ".rp-diagram", ".bank", ".cloze",
    "[contenteditable]", "[hidden]", "[inert]", "[aria-hidden=true]", "[aria-live]", ".sr-only",
    ".al-saved-draft", ".al-response-review", ".psh", ".psrc", ".al-task-count",
    ".mnemlist", "[data-word-help-ignore]"
  ].join(",");
  const legacyAssessment = "#qf,.al-practice,.rp-question,.rp-stretch,.al-drawing-judgement,.al-scale-practice";
  const restricted = { targets: [], incidental: [] };
  // These practical setup terms name materials, apparatus or conditions supplied
  // by the page. Keep definitions of assessed methods in each question's policy.
  const practicalSetup = {
    "practical-1": ["casein", "endpoint", "trypsin", "reagent"],
    "practical-2": ["micrograph", "stain", "chromosome"],
    "practical-3": ["sucrose", "stock-solution", "immerse"],
    "practical-4": ["betalain", "tonoplast", "cuvette", "colorimeter"],
    "practical-5": ["lumen", "cartilage", "mammal-trachea"],
    "practical-6": ["inhibit"],
    "practical-7": ["photosynthetic-pigment", "solvent", "pigment"],
    "practical-8": ["cuvette", "chloroplast", "suspension"],
    "practical-9": ["yeast", "capillary-tube"],
    "practical-10": ["choice-chamber", "humidity"],
    "practical-11": ["stock-solution", "reagent", "supernatant", "cuvette", "colorimeter"],
    "practical-12": ["quadrat", "moisture-gradient"]
  };
  const complete = { completed: true };
  const assessments = new WeakMap();
  const triggerDetails = new WeakMap();
  const aliases = new Map();
  const fold = text => text.toLocaleLowerCase("en-GB").replace(/[‐‑–-]/g, "-").replace(/[’']/g, "'").replace(/\s+/g, " ");

  for (const entry of entries) {
    for (const name of [entry.term, ...entry.variants || []]) {
      const key = fold(name);
      const senses = aliases.get(key) || [];
      if (!senses.includes(entry)) senses.push(entry);
      aliases.set(key, senses);
    }
  }

  function escapeAlias(value) {
    return Array.from(value, character => {
      if (character === "-") return "[-‐‑–]";
      if (character === "'") return "['’]";
      if (character === " ") return "\\s+";
      return character.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("");
  }

  const pattern = [...aliases.keys()].sort((a, b) => b.length - a.length).map(escapeAlias).join("|");
  const matcher = pattern ? new RegExp("(?<![\\p{L}\\p{N}])(?:" + pattern + ")(?![\\p{L}\\p{N}])", "giu") : null;
  const cues = new Map(entries.filter(entry => entry.match?.cue).map(entry => [entry, new RegExp(entry.match.cue, "iu")]));

  let main;
  let panel;
  let observer;
  let scheduled = false;
  let lastAssessment;
  let selection;
  let lookupSignature;
  let page = {};
  let preference = "auto";

  function routeContext() {
    const route = location.hash.slice(1).split("?")[0];
    const catchup = route.startsWith("catchup-");
    const topic = page.topic || /(?:^|-)(a[1-8])(?:-|$)/.exec(route)?.[1];
    const practical = /^practical-\d+$/.test(route);
    const exam = page.context === "exam" || route.startsWith("exam-");
    const concept = page.concept || /^(?:catchup|lesson)-a[1-8]-([^-?]+)/.exec(route)?.[1];
    const contexts = new Set([route, concept, topic, page.context,
      ...(catchup ? ["catchup"] : []), ...(practical ? ["practical"] : []), ...(exam ? ["exam"] : [])]);
    const visible = catchup || practical || exam || page.visible ||
      /^(?:lesson-|quick(?:-|$)|practice-|spaced-|cards-|rev-|topic-a[1-8])/.test(route) ||
      Boolean(main.querySelector(scopeSelector));
    return { route, catchup, topic, practical, contexts, visible, setup: { incidental: practicalSetup[route], teaching: true }, increased: preference === "more" || (preference === "auto" && catchup) };
  }

  function entryFits(entry, context, text) {
    const { contexts, cue } = entry.match || {};
    if (contexts?.length && !contexts.some(item => context.contexts.has(item))) return false;
    return !cue || cues.get(entry).test(text);
  }

  function findTerms(text, context, fullText) {
    if (!matcher) return [];
    const hits = [];
    for (const hit of text.matchAll(matcher)) {
      const senses = aliases.get(fold(hit[0])).filter(entry => entryFits(entry, context, fullText));
      if (senses.length === 1) hits.push({ index: hit.index, label: hit[0], entry: senses[0] });
    }
    return hits;
  }

  function currentAssessmentRoots() {
    // A practice modal owns the question while it is open.
    const dialog = main.querySelector("dialog[open].al-question-dialog");
    const host = dialog || main;
    return [...host.querySelectorAll("[data-word-help-assessment]," + legacyAssessment)]
      .filter(element => !element.closest("[hidden], [inert]") && !closedDisclosure(element));
  }

  function scopePolicy(root) {
    return assessments.get(root) || restricted;
  }

  function protectedScreen() {
    return page.assessing || Boolean(main.querySelector("#fcf,#revact,#tstop,#bf,.sr-session,.spaced-session")) ||
      /^spaced-(?:due|new|weak|reverse|resume)$/.test(location.hash.slice(1));
  }

  function policyFor(origin, context) {
    const local = origin?.closest("[data-word-help-assessment]," + legacyAssessment);
    const roots = context.roots || currentAssessmentRoots();
    if (local && roots.includes(local)) return scopePolicy(local);
    const active = roots.filter(root => !scopePolicy(root).completed);
    if (!origin && active.includes(lastAssessment)) return scopePolicy(lastAssessment);
    if (context.practical || page.sectional) {
      // Multiple independent prompts can share a page. Each prompt's allowlist only
      // applies within that prompt or when the student has selected that task.
      if (context.practical && origin?.closest(".rp-card")) return context.setup;
      if (active.length) return restricted;
    }
    if (active.length === 1) return scopePolicy(active[0]);
    if (active.length || (protectedScreen() && !roots.length)) return restricted;
    return null;
  }

  function access(entry, policy) {
    if (!policy || policy.completed) return "open";
    if (policy.targets?.includes(entry.id)) return typeof policy.reveal === "function" ? "reveal" : "blocked";
    return policy.incidental?.includes(entry.id) ? "open" : "blocked";
  }

  function shouldHighlight(entry, policy, context, authored) {
    const permission = access(entry, policy);
    if (permission === "blocked") return false;
    if (permission === "reveal" || authored || (policy && !policy.completed && !policy.teaching && policy.incidental?.includes(entry.id))) return true;
    return entry.support === "selective" || (entry.support === "increased" && context.increased);
  }

  function closedDisclosure(element) {
    for (let boundary = element.closest("details:not([open])"); boundary; boundary = boundary.parentElement?.closest("details:not([open])")) {
      if (!boundary.querySelector(":scope > summary")?.contains(element)) return true;
    }
    return false;
  }

  function removeTrigger(button) {
    const parent = button.parentNode;
    button.replaceWith(...button.childNodes);
    parent.normalize();
  }

  function excerptFor(text, label) {
    const trimmed = text.replace(/\s+/g, " ").trim();
    const at = trimmed.toLocaleLowerCase().indexOf(label.toLocaleLowerCase());
    if (trimmed.length <= 160 || at < 0) return trimmed.slice(0, 160);
    const start = Math.max(0, at - 64);
    const end = Math.min(trimmed.length, at + label.length + 70);
    return (start ? "…" : "") + trimmed.slice(start, end).trim() + (end < trimmed.length ? "…" : "");
  }

  function makeTrigger(entry, content, block) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "context-vocabulary-term";
    button.append(content);
    button.dataset.vocabularyTerm = entry.id;
    button.setAttribute("aria-controls", panel.panelId);
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-expanded", "false");
    triggerDetails.set(button, { entry, block });
    return button;
  }

  // Match across ordinary emphasis, but stop at controls, formulas, block
  // boundaries and any inline element with its own authored attributes.
  function proseParts(block) {
    const parts = [];
    let nodes = [];
    function split(authored) {
      if (nodes.length) parts.push({ nodes, authored });
      nodes = [];
    }
    function visit(parent, authored) {
      for (const child of parent.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
          if (child.data.length) nodes.push(child);
        } else if (triggerDetails.has(child)) {
          split(authored);
          parts.push({ previous: child, authored });
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          const explicit = byId.get(child.dataset.contextVocabulary);
          const allowed = child.matches("b,strong,em,i,span,mark,small,u") &&
            !child.matches(skipSelector) && !child.matches(proseSelector);
          if (allowed && !child.attributes.length) {
            visit(child, authored);
          } else {
            split(authored);
            if (allowed) {
              visit(child, explicit || authored);
              split(explicit || authored);
            }
          }
        }
      }
    }
    visit(block);
    split();
    return parts;
  }

  function position(nodes, offset) {
    let index = 0;
    for (const node of nodes) {
      const end = index + node.length;
      if (offset < end) return { node, offset: offset - index };
      index = end;
    }
  }

  function wrap(block, { start, end, entry }) {
    const endpoints = new Set();
    for (const point of [start, end]) {
      for (let element = point.node.parentElement; element !== block; element = element.parentElement) {
        endpoints.add(element);
      }
    }
    const range = document.createRange();
    range.setStart(start.node, start.offset);
    range.setEnd(end.node, end.offset + 1);
    const contents = range.extractContents();
    range.insertNode(makeTrigger(entry, contents, block));
    for (const element of endpoints) {
      if (!element.attributes.length && !element.childElementCount && !element.textContent) element.remove();
    }
  }

  function annotate(block, seen, context) {
    if (block.closest(skipSelector) || closedDisclosure(block)) return;
    const policy = policyFor(block, context);
    const fullText = block.textContent;
    const redundant = [];
    const matches = [];
    for (const { previous, nodes, authored } of proseParts(block)) {
      if (previous) {
        const { entry } = triggerDetails.get(previous);
        if (seen.has(entry.id) || !shouldHighlight(entry, policy, context, authored)) redundant.push(previous);
        else seen.add(entry.id);
        continue;
      }
      const text = nodes.map(node => node.data).join("");
      const hits = authored ? [{ index: 0, label: text, entry: authored }] : findTerms(text, context, fullText);
      for (const { index, label, entry } of hits) {
        if (seen.has(entry.id) || !shouldHighlight(entry, policy, context, authored)) continue;
        seen.add(entry.id);
        matches.push({
          entry,
          start: position(nodes, index),
          end: position(nodes, index + label.length - 1)
        });
      }
    }
    // Later ranges can split text nodes. Apply them back-to-front so earlier
    // offsets still address the original portion of each text node.
    for (const match of matches.reverse()) wrap(block, match);
    redundant.forEach(removeTrigger);
  }

  function update() {
    scheduled = false;
    if (!panel) return;
    const context = { ...routeContext(), roots: currentAssessmentRoots() };
    if (selection) {
      const origin = selection.inline ? selection.origin : null;
      if (!selection.origin.isConnected || access(selection.entry, policyFor(origin, context)) !== selection.permission) close();
    }
    const seenByScope = new Map();
    // Select eligible text blocks only. Each chunk, disclosure and activity gets one first occurrence.
    for (const block of main.querySelectorAll(proseSelector)) {
      const scope = assessments.has(block) ? block : block.closest(scopeSelector);
      if (!scope && !block.matches("[data-context-vocabulary],[data-word-help-text]")) continue;
      const unit = block.closest(scopeSelector + ",details") || block;
      let seen = seenByScope.get(unit);
      if (!seen) seenByScope.set(unit, seen = new Set());
      annotate(block, seen, context);
    }
    if (selection && !selection.origin.isConnected) close();
    const lookupPolicy = policyFor(null, context);
    const lookupEntries = entries.filter(entry => access(entry, lookupPolicy) !== "blocked");
    const topicNumber = Number(context.topic?.slice(1));
    lookupEntries.sort((a, b) => (Number(b.topics.includes(topicNumber)) - Number(a.topics.includes(topicNumber))) || a.term.localeCompare(b.term));
    const signature = JSON.stringify([context.visible, context.catchup, preference, Boolean(lookupPolicy && !lookupPolicy.completed),
      lookupEntries.map(entry => [entry.id, access(entry, lookupPolicy)])]);
    if (signature !== lookupSignature) {
      lookupSignature = signature;
      panel.setContext({
        visible: context.visible,
        defaultIncreased: context.catchup,
        preference,
        restricted: Boolean(lookupPolicy && !lookupPolicy.completed),
        lookupEntries: lookupEntries.map(entry => access(entry, lookupPolicy) === "reveal" ? { entry, termOnly: true } : entry)
      });
    }
    observer.takeRecords();
  }

  function schedule() {
    if (!panel || scheduled) return;
    scheduled = true;
    queueMicrotask(update);
  }

  function close() {
    selection = null;
    panel?.close({ restoreFocus: false });
  }

  function definition(entry, origin, excerpt, policy) {
    const route = location.hash.split("?")[0];
    const catchup = (!policy || policy.completed) && entry.catchup && entry.catchup !== route
      ? (page.sectional ? "/alevel/" + entry.catchup : entry.catchup) : undefined;
    panel.showDefinition({ ...entry, catchup }, { origin, excerpt });
  }

  function open(entry, origin, block) {
    const context = routeContext();
    const assessedOrigin = block ? origin : null;
    const policy = policyFor(assessedOrigin, context);
    const permission = access(entry, policy);
    if (permission === "blocked") return;
    const excerpt = block && excerptFor(block.textContent, origin.textContent);
    selection = { origin, entry, permission, inline: Boolean(block) };
    if (permission === "open") {
      definition(entry, origin, excerpt, policy);
      return;
    }
    panel.showRestriction({
      title: entry.term,
      message: "This definition helps answer the current question. Opening it will count as help for this attempt.",
      actionLabel: "Show definition with help",
      onAction() {
        const latest = policyFor(assessedOrigin, routeContext());
        if (latest !== policy || !origin.isConnected || access(entry, latest) !== "reveal") return;
        if (latest.reveal(entry) !== false) definition(entry, origin, excerpt, policy);
      }
    }, { origin });
  }

  function setAssessment(root, policy) {
    root.setAttribute("data-word-help-assessment", "");
    assessments.set(root, policy || complete);
    if (selection && (root.contains(selection.origin) || !selection.inline)) close();
    schedule();
  }

  function setPage(options) {
    close();
    lastAssessment = null;
    page = options;
    schedule();
  }

  function mount(element, options = {}) {
    if (!element || panel) return;
    main = element;
    page = options;
    try {
      const stored = localStorage.getItem(preferenceKey);
      if (settings.has(stored)) preference = stored;
    } catch {}
    panel = window.NarajosVocabularyPanel.create({
      main,
      onLookup(entry, { origin }) { open(entry, origin); },
      onPreferenceChange(value) {
        if (!settings.has(value)) return;
        preference = value;
        try {
          if (value === "auto") localStorage.removeItem(preferenceKey);
          else localStorage.setItem(preferenceKey, value);
        } catch {}
        main.querySelectorAll("button.context-vocabulary-term").forEach(removeTrigger);
        schedule();
      }
    });
    observer = new MutationObserver(schedule);
    observer.observe(main, {
      childList: true, subtree: true, characterData: true, attributes: true,
      attributeFilter: ["hidden", "open", "inert"]
    });
    for (const type of ["focusin", "pointerdown"]) main.addEventListener(type, event => {
      const target = event.target.closest("[data-word-help-assessment]," + legacyAssessment);
      if (target !== lastAssessment) {
        lastAssessment = target;
        schedule();
      }
    });
    main.addEventListener("click", event => {
      const button = event.target.closest("button.context-vocabulary-term");
      const details = triggerDetails.get(button);
      if (details) open(details.entry, button, details.block);
    });
    window.addEventListener("hashchange", () => { close(); schedule(); });
    schedule();
  }

  // Retain the existing authored paragraph format while sharing one definition panel.
  function append(parent, content) {
    for (const part of Array.isArray(content) ? content : [content]) {
      if (typeof part === "string") parent.append(part);
      else {
        const span = document.createElement("span");
        span.dataset.contextVocabulary = part.term;
        span.textContent = part.label;
        parent.append(span);
      }
    }
  }

  window.NarajosVocabulary = { append };
  window.ALevelVocabulary = { mount, setPage, setAssessment };

  const standalone = document.querySelector("[data-word-help-page]");
  if (standalone) {
    mount(standalone, { context: standalone.dataset.wordHelpPage, visible: true, sectional: true });
    for (const exercise of standalone.querySelectorAll("[data-word-help-incidental]")) {
      setAssessment(exercise, { incidental: exercise.dataset.wordHelpIncidental.split(" ") });
    }
    for (const review of standalone.querySelectorAll("[data-word-help-review]")) setAssessment(review, complete);
  }
})();

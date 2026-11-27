/* Progressive teaching in Catch-up. All questions and feedback are authored. */
(function () {
  "use strict";

  const storageKey = "narajos-human-catchup-v1";
  const main = document.getElementById("main");

  function escape(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function load() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch (_) {
      return {};
    }
  }

  function save(key, value) {
    try {
      const all = load();
      all[key] = value;
      localStorage.setItem(storageKey, JSON.stringify(all));
    } catch (_) {
      // The current page still works if local storage is unavailable.
    }
  }

  function savedStages() {
    const saved = load();
    const started = state => state && (
      Number.isInteger(state.selected) || state.draft?.trim() || state.original ||
      state.outcome || state.wrong || state.hint || state.vocabularyHelp
    );
    const complete = state => state && (state.accepted || state.outcome === "selfReview");
    return Object.fromEntries(Object.entries(saved).flatMap(([key, record]) => {
      if (!record || typeof record !== "object") return [];
      if (started(record.followup) && !complete(record.followup)) return [[key, "followup"]];
      if (complete(record.independent)) return [];
      if (started(record.independent) || complete(record.guided)) return [[key, "independent"]];
      return started(record.guided) ? [[key, "guided"]] : [];
    }));
  }

  const icon = name => window.KeystoneHumanChallenge?.icon(name) || "";
  const paragraphs = lines => (lines || []).map(line => '<p>' + escape(line) + '</p>').join("");
  const list = lines => '<ul>' + lines.map(line => '<li>' + escape(line) + '</li>').join("") + '</ul>';

  function table(data, markCells) {
    if (!data) return "";
    return '<table class="hb-teach-table' + (data.compactScreening ? ' hb-teach-table--screening' : '') + '"><caption>' + escape(data.caption) + '</caption><thead><tr>' +
      data.head.map(cell => '<th scope="col">' + escape(cell) + '</th>').join("") + '</tr></thead><tbody>' +
      data.rows.map((row, r) => '<tr><th scope="row">' + escape(row[0]) + '</th>' +
        row.slice(1).map((cell, c) => '<td' + (markCells ? ' data-hb-cell="' + r + ':' + c + '"' : '') +
          '>' + escape(cell) + '</td>').join("") + '</tr>').join("") + '</tbody></table>';
  }

  function illustration(item) {
    if (!item) return "";
    return '<img class="hb-evidence-image" src="' + escape(item.src) + '" alt="' + escape(item.alt) +
      '" width="' + (item.width || 360) + '" height="' + (item.height || 212) + '">';
  }

  function teachingDiagram(item) {
    if (!item) return "";
    return '<figure class="hb-teach-photo"' + (item.assessmentSensitive ? ' data-hb-assessment-sensitive' : '') + '><div class="hb-teaching-diagram' + (item.compact ? ' hb-teaching-diagram-compact' : '') + '"' + (item.compact ? '' : ' role="region" tabindex="0" aria-label="Scrollable teaching diagram"') + '><img src="' + escape(item.src) + '" alt="' + escape(item.alt) +
      '" width="' + item.width + '" height="' + item.height + '"></div>' + (item.compact ? '' : '<span class="hb-diagram-scroll-hint">Scroll sideways to see the whole diagram.</span>') + '<figcaption>' + escape(item.caption) + '</figcaption></figure>';
  }

  function teachingDiagrams(items) {
    return (Array.isArray(items) ? items : [items]).filter(Boolean).map(teachingDiagram).join("");
  }

  function figure(photo, field) {
    if (!photo) return "";
    return '<figure class="hb-teach-photo"' + (photo.assessmentSensitive ? ' data-hb-assessment-sensitive' : '') + '><img src="' + escape(photo.src) + '" alt="' +
      escape(photo.alt) + '" width="' + photo.width + '" height="' + photo.height + '" loading="lazy" decoding="async">' +
      '<figcaption>' + (photo.caption ? escape(photo.caption) + ' ' : '') + (field ? '<strong>Field ' + field + '</strong> · ' : '') + '<a href="' + escape(photo.source) + '">' + escape(photo.credit) + '</a> · ' +
      '<a href="' + escape(photo.licenceUrl) + '">' + escape(photo.licence) + '</a> · ' + escape(photo.changes || 'Resized and converted to WebP') + '</figcaption></figure>';
  }

  function teachingPhotos(items) {
    return (Array.isArray(items) ? items : [items]).filter(Boolean).map(photo => figure(photo)).join("");
  }

  function explanationParagraphs(lesson) {
    return (lesson.explain || []).map((line, index) =>
      paragraphs([line]) + (lesson.explainPhotos?.[index] || []).map(photo => figure(photo)).join("") + (lesson.explainDiagrams?.[index] || []).map(teachingDiagram).join("")
    ).join("");
  }

  function comparisonContent(lesson) {
    const comparison = lesson.compare;
    if ((!lesson.comparisonFigures && !lesson.comparisonPhotos) || !comparison) {
      return teachingDiagram(lesson.comparisonDiagram) + (lesson.comparisonDiagrams || []).map(teachingDiagram).join("") + table(comparison);
    }
    return '<section class="hb-compare-groups"><h3>' + escape(comparison.caption) + '</h3>' +
      comparison.rows.map((row, index) => '<section class="hb-compare-group"><h4>' + escape(row[0]) + '</h4>' +
        teachingPhotos(lesson.comparisonPhotos?.[index]) + (lesson.comparisonFigures?.[index] || []).map(teachingDiagram).join("") + paragraphs(row.slice(1)) + '</section>').join("") + '</section>';
  }

  function afterComparisonContent(lesson) {
    if (!lesson.afterComparison) return "";
    return '<h3>' + escape(lesson.afterComparison.heading) + '</h3>' +
      (lesson.afterComparison.lines || []).map((line, index) =>
        paragraphs([line]) + (lesson.afterComparisonDiagrams?.[index] || []).map(teachingDiagram).join("")
      ).join("");
  }

  function writingExample(example) {
    if (!example) return "";
    return '<details class="hb-prerequisite hb-writing-example"><summary>' + escape(example.title) +
      '</summary>' + paragraphs([example.prompt, example.choose].filter(Boolean)) + '<dl>' + example.responses.map(([name, response]) =>
        '<dt><strong>' + escape(name) + '</strong></dt><dd>' + escape(response) + '</dd>').join("") +
      '</dl><details><summary>Compare the reasoning</summary>' + paragraphs(example.compare) + '</details></details>';
  }

  function stageSummary(symbol, label, detail, booklet) {
    if (booklet) return '<h2 class="hb-stage-heading" tabindex="-1">' + escape(label) +
      (detail ? '<small>' + escape(detail) + '</small>' : '') + '</h2>';
    return '<summary>' + icon(symbol) + '<span>' + escape(label) + '</span>' +
      (detail ? '<small>' + escape(detail) + '</small>' : '') + '</summary>';
  }

  function task(stage, title, question, sequence, booklet, extra) {
    if (!question) return "";
    const id = "hb-" + stage;
    const choice = Array.isArray(question.options);
    const inputs = choice ? question.options.map((option, i) =>
      '<label class="hb-teach-option"><input name="' + id + '" type="radio" value="' + i +
      '" required> <span>' + escape(option[0]) + '</span></label>').join("") :
      '<textarea id="' + id + '" rows="4" maxlength="3000" aria-labelledby="' + id + '-prompt" required></textarea>';
    const tag = booklet ? "section" : "details";
    const help = (question.hints?.length ? '<button type="button" class="button secondary" data-hb-action="hint">' + icon("bulb") + '<span>Get a hint</span></button>' : '') +
      '<button type="button" class="button quiet" data-hb-action="explain">Show explanation</button>';
    return '<' + tag + ' class="paper panel hb-teach-stage" data-hb-stage="' + stage + '"' + (booklet ? ' hidden' : '') + '>' +
      stageSummary(stage === "guided" ? "steps" : choice ? "target" : "pen", title, null, booklet) + (extra || '') + '<form novalidate><fieldset><legend id="' + id + '-prompt">' + escape(question.prompt) +
      '</legend>' + illustration(question.illustration) + figure(question.photo) + (question.photos || []).map((photo, index) => figure(photo, index + 1)).join("") + table(question.table) + paragraphs(question.starter ? [question.starter] : []) +
      inputs + '</fieldset><ol class="hb-hints" hidden></ol><div class="actions hb-controls">' +
      '<button type="submit" class="button primary">' + (!choice && sequence ? icon("pen") : "") +
      (choice ? "Check" : "Compare my explanation") + '</button>' +
      (booklet ? '</div><details class="hb-help"><summary>Need help?</summary><div class="actions">' + help +
        (stage === "independent" ? openStageButton("guided", "Try with support", "quiet") : '') +
        openStageButton("model", "Revisit worked example", "quiet") + '</div></details>' : help) +
      (booklet ? '' : '</div>') + '<div class="hb-feedback" role="status" aria-atomic="true" tabindex="-1"></div>' +
      '<div data-hb-review hidden></div><div class="actions hb-stage-next" hidden></div></form></' + tag + '>' +
      (booklet && stage === "guided" ? '<div class="hb-skip" data-hb-guided-skip hidden>' + openStageButton("independent", "Skip to independent practice", "quiet") + '</div>' : '');
  }

  function openStageButton(stage, label, style) {
    return '<button type="button" data-hb-open="' + stage + '" class="button ' + style + '">' +
      (stage === "model" ? icon("eye") : "") + label + '</button>';
  }

  function render(lesson, context) {
    const prior = lesson.prior ?
      '<a href="#catchup/' + escape(lesson.prior[0]) + '">' + escape(lesson.prior[1]) + '</a>' : "";
    const activate = lesson.activate
      ? '<details class="hb-prerequisite"><summary>' + escape(lesson.activate[0]) + '</summary><p>' +
        escape(lesson.activate[1]) + '</p>' + prior + '</details>' : prior;
    const explanation = (context.booklet ? '<section class="paper panel hb-teach-explain"><h2>Understand the idea</h2>' : '<details class="paper panel hb-teach-explain" open><summary><h2>Understand the idea</h2></summary>') +
      explanationParagraphs(lesson) + figure(lesson.explanationPhoto) + figure(lesson.explanationPhoto2) + teachingDiagram(lesson.explanationDiagram) + (lesson.explanationDiagrams || []).map(teachingDiagram).join("") + (lesson.teachingDiagramModelOnly ? "" : teachingDiagram(lesson.teachingDiagram)) + comparisonContent(lesson) +
      afterComparisonContent(lesson) +
      context.inline +
      (lesson.revision && !context.booklet ? '<div class="actions hb-start">' + openStageButton("model", "See worked example", "primary") + '</div>' : '') +
      (context.booklet ? '</section>' : '</details>');
    const evidenceModel = lesson.revision && (lesson.focusCells || lesson.graph || lesson.visual === "model");
    const modelVisualAtSteps = Array.isArray(lesson.modelVisualAtSteps) ? lesson.modelVisualAtSteps : null;
    const model = lesson.model?.length ?
      '<' + (context.booklet ? 'section' : 'details') + ' class="paper panel hb-teach-stage' + (evidenceModel ? ' hb-model-with-evidence' : '') +
      '" data-hb-model-step="1">' + stageSummary("eye", "Worked example", lesson.modelTitle, context.booklet) + (modelVisualAtSteps ? "" : context.modelVisual) + (lesson.skipModelTeachingDiagram ? "" : teachingDiagram(lesson.teachingDiagram)) + illustration(lesson.illustration) + figure(lesson.photo) +
      (lesson.graph ? window.KeystoneHumanSkills.graphHTML(lesson.graph) : "") + table(lesson.table, lesson.focusCells) +
      '<ol class="hb-model-steps' + (lesson.nodes ? ' hb-model-path' : '') + '">' + lesson.model.map((step, i) =>
        '<li value="' + (i + 1) + '"' + (i ? ' hidden' : '') + '>' + (lesson.nodes ? '<strong>' + escape(lesson.nodes[i]) + '</strong> ' : '') +
        escape(step) + (modelVisualAtSteps?.includes(i) ? context.modelVisual : "") + teachingPhotos(lesson.modelPhotos?.[i]) + teachingDiagrams(lesson.modelDiagrams?.[i]) + '</li>').join("") +
      '</ol>' + (lesson.model.length > 1 ?
        '<button type="button" class="button secondary" data-hb-action="model">Show next step</button>' : '') +
      (evidenceModel ? '<button type="button" class="button quiet hb-model-back" hidden>Previous step</button>' : '') +
      (lesson.revision || context.booklet ? '<div class="actions" data-hb-after-model' + (lesson.model.length > 1 ? ' hidden' : '') + '>' +
        openStageButton("guided", "Try with support", "primary") + '</div>' : '') +
      (context.booklet ? '<div class="hb-skip">' + openStageButton("independent", "Skip to independent practice", "quiet") + '</div></section>' : '</details>') : "";
    return '<div class="hb-teaching' + (lesson.revision ? ' hb-teaching-sequence' : '') + (context.booklet ? ' hb-teaching-booklet' : '') + '"><p class="lead hb-objective">' + escape(lesson.goal) + '</p>' + activate +
      explanation + model + (context.booklet ? '' : context.method) + task("guided", "With support", lesson.guided, false, context.booklet) +
      (context.booklet ? '' : writingExample(lesson.writing)) +
      task("independent", "Your turn", lesson.apply, lesson.revision, context.booklet, context.booklet ? writingExample(lesson.writing) : '') +
      '<div data-hb-followup hidden>' + task("followup", "Try a fresh check", lesson.followup, false, context.booklet) + '</div>' +
      (context.booklet ? context.method : '') + context.related + '</div>';
  }

  const outcomeLabels = {
    explained: "Explanation shown.",
    selfReview: "Compare your reasoning with each point."
  };

  function reviewFields(stage, question, state, evidenceVisible) {
    const complete = state.outcome === "selfReview";
    const checks = question.points.map((point, index) => {
      const id = "hb-" + stage + "-criterion-" + index;
      const value = state.criteria?.[index];
      return '<li><label for="' + id + '">' + escape(point) + '</label><select id="' + id + '" data-hb-criterion="' +
        index + '"' + (complete ? ' disabled' : '') + '><option value="">Choose</option>' +
        '<option value="included"' + (value === "included" ? ' selected' : '') + '>Included</option>' +
        '<option value="revise"' + (value === "revise" ? ' selected' : '') + '>Needs work</option></select></li>';
    }).join("");
    return '<h3 tabindex="-1">Review your explanation</h3>' +
      (evidenceVisible ? "" : paragraphs([question.prompt])) + '<div class="hb-review-answers">' +
      '<section><h4>Your answer</h4><p>' + escape(state.original) + '</p></section>' +
      '<section><h4>Model explanation</h4><p>' + escape(question.explanation) + '</p></section></div>' +
      '<p>Compare the reasoning against each criterion.</p><ul>' + checks + '</ul>' +
      '<label for="hb-' + stage + '-revision">Improve your answer (optional)</label>' +
      '<textarea id="hb-' + stage + '-revision" data-hb-revision rows="4" maxlength="3000"' +
      (complete ? ' readonly' : '') + '>' + escape(state.revised ?? state.original) + '</textarea>' +
      (complete ? '<p>Your self-review is saved.</p>' : '<div class="actions"><button type="button" class="button primary" data-hb-action="finish-review">' + icon("check") + 'Finish review</button></div>');
  }

  function mount(key, lesson, reviewStep, resumeStage) {
    const root = main.querySelector(".hb-teaching");
    if (!root) return;
    // Keep responses to earlier task versions separate from the new questions.
    key += lesson.revision ? "/" + lesson.revision : "";
    const record = load()[key] || {};
    const booklet = root.classList.contains("hb-teaching-booklet");
    let resetModel = () => {};
    const questions = { guided: lesson.guided, independent: lesson.apply, followup: lesson.followup };
    const recommended = root.querySelector("[data-hb-resume], [data-hb-build], [data-hb-practice]");

    function updateFollowup() {
      const state = record.independent;
      root.querySelector("[data-hb-followup]").hidden = !lesson.followup ||
        !state || !(state.wrong || state.hint || state.vocabularyHelp || state.revealed || state.outcome === "selfReview");
    }

    function nextAction(section, state) {
      if (!lesson.revision && !root.classList.contains("hb-teaching-booklet")) return;
      const stage = section.dataset.hbStage;
      const actions = section.querySelector(".hb-stage-next");
      const completed = state.accepted || state.outcome === "selfReview";
      const controls = section.querySelector(".hb-controls");
      if (completed) controls.hidden = true;
      const skip = root.querySelector("[data-hb-guided-skip]");
      if (skip && stage === "guided" && completed) skip.hidden = true;
      actions.innerHTML = "";
      if (completed && stage === "guided") {
        actions.innerHTML = openStageButton("independent", "Apply it independently", "primary");
      } else if (completed && stage === "independent" && !root.querySelector("[data-hb-followup]").hidden) {
        actions.innerHTML = openStageButton("followup", record.followup?.accepted ? "Review fresh check" : "Try a fresh check", "primary");
      } else if (completed && recommended) {
        const next = document.createElement("a");
        next.className = "button primary";
        next.href = recommended.href;
        next.textContent = recommended.hasAttribute("data-hb-resume") ? "Continue your saved questions" : "Continue to practice";
        actions.append(next);
      } else if ((state.wrong || state.revealed) && !root.classList.contains("hb-teaching-booklet")) {
        actions.innerHTML = openStageButton("model", "Revisit worked example", "quiet");
      }
      if (completed && booklet) actions.insertAdjacentHTML("beforeend", openStageButton("model", "Review worked example", "quiet"));
      actions.hidden = !actions.hasChildNodes();
    }

    function showState(section, state, question, animate = false) {
      const hintList = section.querySelector(".hb-hints");
      const feedback = section.querySelector(".hb-feedback");
      const review = section.querySelector("[data-hb-review]");
      const comparing = state.original !== undefined;
      const wordHelp = question.wordHelp || {};
      window.SiteVocabulary?.setAssessment(section, state.accepted || state.outcome || comparing ? { completed: true } : {
        incidental: wordHelp.incidental,
        targets: wordHelp.targets,
        reveal() {
          if (!section.isConnected || state.accepted || state.outcome || state.original !== undefined) return false;
          state.vocabularyHelp = true;
          save(key, record);
          return true;
        }
      });
      const help = section.querySelector(".hb-help");
      if (help) help.hidden = comparing || Boolean(state.accepted);
      const count = state.hint || 0;
      hintList.hidden = !count;
      hintList.innerHTML = count ? question.hints.slice(0, count).map(hint => '<li>' + escape(hint) + '</li>').join("") : "";
      const hint = section.querySelector('[data-hb-action="hint"]');
      if (hint) {
        hint.setAttribute("aria-disabled", String(count >= question.hints.length));
        hint.querySelector("span").textContent = count >= question.hints.length ? "All hints shown" : count ? "Another hint" : "Get a hint";
      }
      let html = "";
      const submitted = state.outcome && state.outcome !== "explained" && !question.points;
      if (submitted) {
        section.querySelectorAll('input[type="radio"]').forEach(input => { input.disabled = true; });
        section.querySelector('button[type="submit"]').disabled = true;
      }
      if (state.note) html = '<p>' + escape(state.note) + '</p>';
      if (state.outcome === "selfReview" && comparing) html = '<p>Self-review saved.</p>';
      if (state.outcome && !comparing) {
        let heading = outcomeLabels[state.outcome];
        if (state.accepted && state.outcome === "explained") {
          heading = "Answer checked after seeing the explanation.";
        } else if (["guided", "independent", "corrected", "followup"].includes(state.outcome)) {
          const kind = state.outcome === "corrected" ? "corrected" : "correct";
          const label = state.outcome === "guided" ? "Correct with support." : undefined;
          const feedbackKey = key + "/" + section.dataset.hbStage;
          heading = window.KeystoneFeedback.markup(kind, { key: feedbackKey, animate, label });
        }
        html = '<p><strong>' + heading + '</strong></p>' + html;
        if (question.points) html += list(question.points);
        if (!booklet || !state.accepted || state.wrong || state.revealed) {
          html += '<p>' + escape(question.explanation) + '</p>';
        } else {
          html += '<details><summary>Why?</summary><p>' + escape(question.explanation) + '</p></details>';
        }
      }
      review.hidden = !comparing;
      if (comparing) {
        const fieldset = section.querySelector("fieldset");
        const evidenceVisible = Boolean(fieldset.querySelector("img, table"));
        review.innerHTML = reviewFields(section.dataset.hbStage, question, state, evidenceVisible);
        fieldset.hidden = !evidenceVisible;
        fieldset.querySelector("textarea").hidden = true;
        section.querySelector(".hb-controls").hidden = true;
      }
      feedback.innerHTML = html;
      feedback.classList.toggle("hb-feedback-visible", Boolean(html));
      updateFollowup();
      nextAction(section, state);
    }

    root.querySelectorAll("[data-hb-stage]").forEach(section => {
      const stage = section.dataset.hbStage;
      const question = questions[stage];
      const form = section.querySelector("form");
      const textarea = form.querySelector("textarea");
      const detailedReview = lesson.revision && textarea;
      const state = record[stage] ||= {};
      if (textarea) textarea.value = state.draft || "";
      else if (Number.isInteger(state.selected)) {
        const choice = form.querySelector('input[value="' + state.selected + '"]');
        if (choice) choice.checked = true;
      }

      form.addEventListener("input", event => {
        const input = event.target;
        if (input.matches("[data-hb-revision]")) state.revised = input.value;
        else if (input.matches("[data-hb-criterion]")) (state.criteria ||= {})[input.dataset.hbCriterion] = input.value;
        else if (input === textarea) state.draft = textarea.value;
        else if (input.matches('input[type="radio"]')) state.selected = Number(input.value);
        save(key, record);
      });

      form.addEventListener("click", event => {
        const button = event.target.closest("[data-hb-action]");
        if (!button || button.hasAttribute("data-hb-open")) return;
        if (button.dataset.hbAction === "finish-review") {
          state.outcome = "selfReview";
          state.note = "";
        } else if (button.dataset.hbAction === "hint") {
          if ((state.hint || 0) >= question.hints.length) return;
          state.hint = (state.hint || 0) + 1;
        } else {
          state.revealed = true;
          state.note = "";
          state.outcome ||= textarea && !detailedReview ? "selfReview" : "explained";
        }
        save(key, record);
        showState(section, state, question);
        if (button.dataset.hbAction === "finish-review") section.querySelector("[data-hb-review] h3").focus();
      });

      form.addEventListener("submit", event => {
        event.preventDefault();
        const wasAccepted = state.accepted;
        state.note = "";
        if (textarea) {
          if (detailedReview && textarea.value.trim()) state.original = textarea.value.trim();
          else if (textarea.value.trim()) state.outcome = "selfReview";
          else state.note = "Write an explanation first, or show the model for help.";
        } else {
          const selected = form.querySelector("input:checked");
          if (!selected) state.note = "Choose one answer.";
          else if (Number(selected.value) !== question.answer) {
            state.note = question.options[Number(selected.value)][1];
            state.wrong = true;
          } else if (!state.outcome || state.outcome === "explained") {
            state.accepted = true;
            state.outcome = state.revealed ? "explained" : state.wrong ? "corrected" :
              stage === "guided" || state.hint || state.vocabularyHelp ? "guided" : stage === "followup" ? "followup" : "independent";
          }
        }
        save(key, record);
        showState(section, state, question, !wasAccepted && Boolean(state.accepted));
        if (state.original !== undefined) section.querySelector("[data-hb-review] h3").focus();
        else if (lesson.revision && state.accepted) section.querySelector(".hb-feedback").focus();
      });

      showState(section, state, question);
    });
    const modelButton = root.querySelector('[data-hb-action="model"]');
    if (modelButton) {
      const model = modelButton.closest(".hb-teach-stage");
      const steps = modelButton.previousElementSibling;
      const cells = Array.from(model.querySelectorAll("[data-hb-cell]"));
      const advance = model.querySelector("[data-hb-after-model]");
      const back = model.querySelector(".hb-model-back");
      function showModelStep(index, focus, persist) {
        model.dataset.hbModelStep = index + 1;
        Array.from(steps.children).forEach((step, i) => {
          step.hidden = i > index;
          if (i === index) step.setAttribute("aria-current", "step");
          else step.removeAttribute("aria-current");
        });
        const active = lesson.focusCells?.[index] || [];
        cells.forEach(cell => cell.classList.toggle("hb-cell-focus", active.includes(cell.dataset.hbCell)));
        const finished = index === steps.children.length - 1;
        if (booklet) modelButton.hidden = finished;
        if (persist && booklet) { record.modelStep = index; save(key, record); }
        if (back) back.hidden = index === 0;
        modelButton.textContent = finished ? "Replay example" : "Show next step";
        if (advance) {
          advance.hidden = !finished;
          modelButton.classList.toggle("primary", !finished);
          modelButton.classList.toggle("secondary", finished);
        }
        if (focus) {
          steps.children[index].tabIndex = -1;
          steps.children[index].focus();
        }
      }
      modelButton.addEventListener("click", () => {
        const next = Array.from(steps.children).findIndex(step => step.hidden);
        showModelStep(next < 0 ? 0 : next, true, true);
      });
      back?.addEventListener("click", () => showModelStep(Number(model.dataset.hbModelStep) - 2, true, true));
      resetModel = () => showModelStep(0, false, true);
      if (reviewStep) {
        model.open = true;
        showModelStep(Math.min(reviewStep, steps.children.length) - 1, true);
      } else showModelStep(booklet ? Math.min(record.modelStep || 0, steps.children.length - 1) : 0, false);
    }
    const explanation = root.querySelector(".hb-teach-explain");
    function setAssessmentVisuals(id) {
      root.querySelectorAll("[data-hb-assessment-sensitive]").forEach(figure => {
        figure.hidden = id === "independent" || id === "followup";
      });
    }
    function showBookletStage(id, focus, persist) {
      const stages = {
        model: root.querySelector("[data-hb-model-step]"),
        guided: root.querySelector('[data-hb-stage="guided"]'),
        independent: root.querySelector('[data-hb-stage="independent"]'),
        followup: root.querySelector('[data-hb-stage="followup"]')
      };
      const next = stages[id];
      if (!next || (id === "followup" && root.querySelector("[data-hb-followup]").hidden)) return;
      Object.entries(stages).forEach(([name, stage]) => { if (stage) stage.hidden = name !== id; });
      // Some teaching figures answer a later independent question directly.
      // Restore them when a learner returns to a teaching or guided stage.
      setAssessmentVisuals(id);
      const skip = root.querySelector("[data-hb-guided-skip]");
      if (skip) skip.hidden = id !== "guided" || Boolean(record.guided?.accepted || record.guided?.outcome === "selfReview");
      if (persist) { record.view = id; save(key, record); }
      if (focus) next.querySelector(".hb-stage-heading")?.focus();
    }
    function prepareStage(next) {
      setAssessmentVisuals(next.dataset.hbStage || "model");
      root.querySelectorAll("details.hb-teach-stage[open]").forEach(stage => {
        if (stage !== next) stage.open = false;
      });
      if (next.hasAttribute("data-hb-stage")) explanation.open = false;
    }
    root.addEventListener("click", event => {
      const button = event.target.closest("[data-hb-open]");
      if (button) {
        const id = button.dataset.hbOpen;
        const next = id === "model" ? root.querySelector("[data-hb-model-step]") :
          root.querySelector('[data-hb-stage="' + id + '"]');
        if (!next) return;
        if (booklet) { if (id === "model") resetModel(); showBookletStage(id, true, true); return; }
        prepareStage(next);
        next.open = true;
        next.querySelector("summary").focus();
      } else {
        const summary = event.target.closest(".hb-teach-stage > summary");
        if (summary && !summary.parentElement.open) prepareStage(summary.parentElement);
      }
    });
    updateFollowup();
    if (booklet) {
      showBookletStage(resumeStage || (reviewStep ? "model" : record.view) || "model", Boolean(resumeStage), false);
      return;
    }
    const resume = resumeStage && root.querySelector('[data-hb-stage="' + resumeStage + '"]');
    if (resume && !resume.closest("[hidden]")) {
      prepareStage(resume);
      resume.open = true;
      resume.querySelector("summary").focus();
    }
  }

  const choice = (prompt, answer, options, explanation, hints, extra) =>
    ({ prompt, answer, options, explanation, hints, ...extra });
  const written = (prompt, points, explanation, hints) => ({ prompt, points, explanation, hints });

  window.KeystoneHumanTeaching = { render, mount, savedStages, storageKey, choice, written, renderDiagram: teachingDiagram, renderPhoto: figure };
})();

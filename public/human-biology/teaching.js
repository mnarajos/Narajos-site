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
      state.outcome || state.wrong || state.hint
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
    return '<table class="hb-teach-table"><caption>' + escape(data.caption) + '</caption><thead><tr>' +
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

  function figure(photo, field) {
    if (!photo) return "";
    return '<figure class="hb-teach-photo"><img src="' + escape(photo.src) + '" alt="' +
      escape(photo.alt) + '" width="' + photo.width + '" height="' + photo.height + '" loading="lazy" decoding="async">' +
      '<figcaption>' + (field ? '<strong>Field ' + field + '</strong> · ' : '') + '<a href="' + escape(photo.source) + '">' + escape(photo.credit) + '</a> · ' +
      '<a href="' + escape(photo.licenceUrl) + '">' + escape(photo.licence) + '</a> · ' + escape(photo.changes || 'Resized and converted to WebP') + '</figcaption></figure>';
  }

  function writingExample(example) {
    if (!example) return "";
    return '<details class="hb-prerequisite hb-writing-example"><summary>' + escape(example.title) +
      '</summary>' + paragraphs([example.prompt, example.choose].filter(Boolean)) + '<dl>' + example.responses.map(([name, response]) =>
        '<dt><strong>' + escape(name) + '</strong></dt><dd>' + escape(response) + '</dd>').join("") +
      '</dl><details><summary>Compare the reasoning</summary>' + paragraphs(example.compare) + '</details></details>';
  }

  function stageSummary(symbol, label, detail) {
    return '<summary>' + icon(symbol) + '<span>' + escape(label) + '</span>' +
      (detail ? '<small>' + escape(detail) + '</small>' : '') + '</summary>';
  }

  function task(stage, title, question, sequence) {
    if (!question) return "";
    const id = "hb-" + stage;
    const choice = Array.isArray(question.options);
    const inputs = choice ? question.options.map((option, i) =>
      '<label class="hb-teach-option"><input name="' + id + '" type="radio" value="' + i +
      '" required> <span>' + escape(option[0]) + '</span></label>').join("") :
      '<textarea id="' + id + '" rows="4" maxlength="3000" aria-labelledby="' + id + '-prompt" required></textarea>';
    return '<details class="paper panel hb-teach-stage" data-hb-stage="' + stage + '">' +
      stageSummary(stage === "guided" ? "steps" : choice ? "target" : "pen", title) + '<form novalidate><fieldset><legend id="' + id + '-prompt">' + escape(question.prompt) +
      '</legend>' + illustration(question.illustration) + figure(question.photo) + (question.photos || []).map((photo, index) => figure(photo, index + 1)).join("") + table(question.table) + paragraphs(question.starter ? [question.starter] : []) +
      inputs + '</fieldset><ol class="hb-hints" hidden></ol><div class="actions hb-controls">' +
      '<button type="submit" class="button primary">' + (!choice && sequence ? icon("pen") : "") +
      (choice ? "Check answer" : "Compare my explanation") + '</button>' +
      (question.hints?.length ? '<button type="button" class="button secondary" data-hb-action="hint">' + icon("bulb") + '<span>Get a hint</span></button>' : '') +
      '<button type="button" class="button quiet" data-hb-action="explain">Show explanation</button>' +
      '</div><div class="hb-feedback" role="status" aria-atomic="true" tabindex="-1"></div>' +
      '<div data-hb-review hidden></div><div class="actions hb-stage-next" hidden></div></form></details>';
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
    const explanation = '<details class="paper panel hb-teach-explain" open><summary><h2>Understand the idea</h2></summary>' +
      paragraphs(lesson.explain) + table(lesson.compare) + context.inline +
      (lesson.revision ? '<div class="actions hb-start">' + openStageButton("model", "See worked example", "primary") + '</div>' : '') +
      '</details>';
    const evidenceModel = lesson.revision && (lesson.focusCells || lesson.graph || lesson.visual === "model");
    const model = lesson.model?.length ?
      '<details class="paper panel hb-teach-stage' + (evidenceModel ? ' hb-model-with-evidence' : '') +
      '" data-hb-model-step="1">' + stageSummary("eye", "Worked example", lesson.modelTitle) + context.modelVisual + illustration(lesson.illustration) + figure(lesson.photo) +
      (lesson.graph ? window.KeystoneHumanSkills.graphHTML(lesson.graph) : "") + table(lesson.table, lesson.focusCells) +
      '<ol class="hb-model-steps' + (lesson.nodes ? ' hb-model-path' : '') + '">' + lesson.model.map((step, i) =>
        '<li value="' + (i + 1) + '"' + (i ? ' hidden' : '') + '>' + (lesson.nodes ? '<strong>' + escape(lesson.nodes[i]) + '</strong> ' : '') +
        escape(step) + '</li>').join("") +
      '</ol>' + (lesson.model.length > 1 ?
        '<button type="button" class="button secondary" data-hb-action="model">Show next step</button>' : '') +
      (evidenceModel ? '<button type="button" class="button quiet hb-model-back" hidden>Previous step</button>' : '') +
      (lesson.revision ? '<div class="actions" data-hb-after-model hidden>' +
        openStageButton("guided", "Try with support", "primary") + '</div>' : '') + '</details>' : "";
    return '<div class="hb-teaching' + (lesson.revision ? ' hb-teaching-sequence' : '') + '"><p class="lead hb-objective">' + escape(lesson.goal) + '</p>' + activate +
      explanation + model + context.method + task("guided", "With support", lesson.guided) +
      writingExample(lesson.writing) +
      task("independent", "Your turn", lesson.apply, lesson.revision) +
      '<div data-hb-followup hidden>' + task("followup", "Try a fresh check", lesson.followup) + '</div>' +
      context.related + '</div>';
  }

  const outcomeLabels = {
    guided: "Correct with support.",
    independent: "Correct independently on the first attempt.",
    explained: "Completed after seeing the explanation.",
    corrected: "Correct on retry.",
    followup: "Correct independently on a fresh check.",
    selfReview: "Compare your reasoning with each point."
  };

  function reviewFields(stage, question, state) {
    const complete = state.outcome === "selfReview";
    const checks = question.points.map((point, index) => {
      const id = "hb-" + stage + "-criterion-" + index;
      const value = state.criteria?.[index];
      return '<li><label for="' + id + '">' + escape(point) + '</label><select id="' + id + '" data-hb-criterion="' +
        index + '"' + (complete ? ' disabled' : '') + '><option value="">Choose</option>' +
        '<option value="included"' + (value === "included" ? ' selected' : '') + '>Included</option>' +
        '<option value="revise"' + (value === "revise" ? ' selected' : '') + '>Needs work</option></select></li>';
    }).join("");
    return '<h3 tabindex="-1">Review your explanation</h3><p>' + escape(question.prompt) +
      '</p><div class="hb-review-answers">' +
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
    const questions = { guided: lesson.guided, independent: lesson.apply, followup: lesson.followup };
    const recommended = root.querySelector("[data-hb-resume], [data-hb-build], [data-hb-practice]");

    function updateFollowup() {
      const state = record.independent;
      root.querySelector("[data-hb-followup]").hidden = !lesson.followup ||
        !state || !(state.wrong || state.hint || state.revealed || state.outcome === "selfReview");
    }

    function nextAction(section, state) {
      if (!lesson.revision) return;
      const stage = section.dataset.hbStage;
      const actions = section.querySelector(".hb-stage-next");
      const completed = state.accepted || state.outcome === "selfReview";
      const controls = section.querySelector(".hb-controls");
      if (completed) controls.hidden = true;
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
      } else if (state.wrong || state.revealed) {
        actions.innerHTML = openStageButton("model", "Revisit worked example", "quiet");
      }
      actions.hidden = !actions.hasChildNodes();
    }

    function showState(section, state, question) {
      const hintList = section.querySelector(".hb-hints");
      const feedback = section.querySelector(".hb-feedback");
      const review = section.querySelector("[data-hb-review]");
      const comparing = state.original !== undefined;
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
        html = '<p><strong>' + outcomeLabels[state.outcome] + '</strong></p>' + html;
        if (question.points) html += list(question.points);
        html += '<p>' + escape(question.explanation) + '</p>';
      }
      review.hidden = !comparing;
      if (comparing) {
        review.innerHTML = reviewFields(section.dataset.hbStage, question, state);
        section.querySelector("fieldset").hidden = true;
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
              stage === "guided" || state.hint ? "guided" : stage === "followup" ? "followup" : "independent";
          }
        }
        save(key, record);
        showState(section, state, question);
        if (state.original !== undefined) section.querySelector("[data-hb-review] h3").focus();
        else if (lesson.revision && state.accepted) section.querySelector(".hb-feedback").focus();
      });

      showState(section, state, question);
    });
    const modelButton = root.querySelector('[data-hb-action="model"]');
    if (modelButton) {
      const model = modelButton.closest("details");
      const steps = modelButton.previousElementSibling;
      const cells = Array.from(model.querySelectorAll("[data-hb-cell]"));
      const advance = model.querySelector("[data-hb-after-model]");
      const back = model.querySelector(".hb-model-back");
      function showModelStep(index, focus) {
        model.dataset.hbModelStep = index + 1;
        Array.from(steps.children).forEach((step, i) => {
          step.hidden = i > index;
          if (i === index) step.setAttribute("aria-current", "step");
          else step.removeAttribute("aria-current");
        });
        const active = lesson.focusCells?.[index] || [];
        cells.forEach(cell => cell.classList.toggle("hb-cell-focus", active.includes(cell.dataset.hbCell)));
        const finished = index === steps.children.length - 1;
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
        showModelStep(next < 0 ? 0 : next, true);
      });
      back?.addEventListener("click", () => showModelStep(Number(model.dataset.hbModelStep) - 2, true));
      if (reviewStep) {
        model.open = true;
        showModelStep(Math.min(reviewStep, steps.children.length) - 1, true);
      } else showModelStep(0, false);
    }
    const explanation = root.querySelector(".hb-teach-explain");
    function prepareStage(next) {
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
        prepareStage(next);
        next.open = true;
        next.querySelector("summary").focus();
      } else {
        const summary = event.target.closest(".hb-teach-stage > summary");
        if (summary && !summary.parentElement.open) prepareStage(summary.parentElement);
      }
    });
    updateFollowup();
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

  window.KeystoneHumanTeaching = { render, mount, savedStages, storageKey, choice, written };
})();

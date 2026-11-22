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

  const paragraphs = lines => (lines || []).map(line => '<p>' + escape(line) + '</p>').join("");
  const list = lines => '<ul>' + lines.map(line => '<li>' + escape(line) + '</li>').join("") + '</ul>';

  function table(data) {
    if (!data) return "";
    return '<table class="hb-teach-table"><caption>' + escape(data.caption) + '</caption><thead><tr>' +
      data.head.map(cell => '<th scope="col">' + escape(cell) + '</th>').join("") + '</tr></thead><tbody>' +
      data.rows.map(row => '<tr><th scope="row">' + escape(row[0]) + '</th>' +
        row.slice(1).map(cell => '<td>' + escape(cell) + '</td>').join("") + '</tr>').join("") + '</tbody></table>';
  }

  function figure(photo) {
    if (!photo) return "";
    return '<figure class="hb-teach-photo"><img src="' + escape(photo.src) + '" alt="' +
      escape(photo.alt) + '" width="' + photo.width + '" height="' + photo.height + '" loading="lazy" decoding="async">' +
      '<figcaption><a href="' + escape(photo.source) + '">' + escape(photo.credit) + '</a> · ' +
      '<a href="' + escape(photo.licenceUrl) + '">' + escape(photo.licence) + '</a> · Resized and converted to WebP</figcaption></figure>';
  }

  function task(stage, title, question) {
    if (!question) return "";
    const id = "hb-" + stage;
    const choice = Array.isArray(question.options);
    const inputs = choice ? question.options.map((option, i) =>
      '<label class="hb-teach-option"><input name="' + id + '" type="radio" value="' + i +
      '" required> <span>' + escape(option[0]) + '</span></label>').join("") :
      '<textarea id="' + id + '" rows="4" maxlength="3000" aria-labelledby="' + id + '-prompt" required></textarea>';
    return '<details class="paper panel hb-teach-stage" data-hb-stage="' + stage + '"><summary>' + title +
      '</summary><form novalidate><fieldset><legend id="' + id + '-prompt">' + escape(question.prompt) +
      '</legend>' + figure(question.photo) + table(question.table) + paragraphs(question.starter ? [question.starter] : []) +
      inputs + '</fieldset><ol class="hb-hints" hidden></ol><div class="actions hb-controls">' +
      '<button type="submit" class="button primary">' + (choice ? "Check answer" : "Compare my explanation") + '</button>' +
      (question.hints?.length ? '<button type="button" class="button secondary" data-hb-action="hint">Get a hint</button>' : '') +
      '<button type="button" class="button quiet" data-hb-action="explain">Show explanation</button>' +
      '</div><div class="hb-feedback" role="status" aria-atomic="true"></div></form></details>';
  }

  function render(lesson, context) {
    const activate = lesson.activate
      ? '<details class="hb-prerequisite"><summary>' + escape(lesson.activate[0]) + '</summary><p>' +
        escape(lesson.activate[1]) + '</p>' + (lesson.prior ?
          '<a href="#catchup/' + escape(lesson.prior[0]) + '">' + escape(lesson.prior[1]) + '</a>' : '') + '</details>' : '';
    const explanation = '<section class="paper panel hb-teach-explain"><h2>Understand the idea</h2>' +
      paragraphs(lesson.explain) + table(lesson.compare) + context.inline + '</section>';
    const model = lesson.model?.length ?
      '<details class="paper panel hb-teach-stage"><summary>I do · ' + escape(lesson.modelTitle || "Follow a worked example") +
      '</summary>' + context.modelVisual + figure(lesson.photo) + table(lesson.table) +
      '<ol class="hb-model-steps' + (lesson.nodes ? ' hb-model-path' : '') + '">' + lesson.model.map((step, i) =>
        '<li' + (i ? ' hidden' : '') + '>' + (lesson.nodes ? '<strong>' + escape(lesson.nodes[i]) + '</strong> ' : '') +
        escape(step) + '</li>').join("") +
      '</ol>' + (lesson.model.length > 1 ?
        '<button type="button" class="button secondary" data-hb-action="model">Show next step</button>' : '') + '</details>' : "";
    return '<div class="hb-teaching"><p class="lead hb-objective">' + escape(lesson.goal) + '</p>' + activate +
      explanation + model + context.method + task("guided", "We do · Try it with support", lesson.guided) +
      task("independent", "You do · Apply it independently", lesson.apply) +
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

  function mount(key, lesson) {
    const root = main.querySelector(".hb-teaching");
    if (!root) return;
    const record = load()[key] || {};
    const questions = { guided: lesson.guided, independent: lesson.apply, followup: lesson.followup };

    function updateFollowup() {
      const state = record.independent;
      root.querySelector("[data-hb-followup]").hidden = !lesson.followup ||
        !state || !(state.wrong || state.hint || state.revealed || state.outcome === "selfReview");
    }

    function showState(section, state, question) {
      const hintList = section.querySelector(".hb-hints");
      const feedback = section.querySelector(".hb-feedback");
      const count = state.hint || 0;
      hintList.hidden = !count;
      hintList.innerHTML = count ? question.hints.slice(0, count).map(hint => '<li>' + escape(hint) + '</li>').join("") : "";
      const hint = section.querySelector('[data-hb-action="hint"]');
      if (hint) {
        hint.setAttribute("aria-disabled", String(count >= question.hints.length));
        hint.textContent = count >= question.hints.length ? "All hints shown" : count ? "Another hint" : "Get a hint";
      }
      let html = "";
      const submitted = state.outcome && state.outcome !== "explained" && !question.points;
      if (submitted) {
        section.querySelectorAll('input[type="radio"]').forEach(input => { input.disabled = true; });
        section.querySelector('button[type="submit"]').disabled = true;
      }
      if (state.note) html = '<p>' + escape(state.note) + '</p>';
      if (state.outcome) {
        html = '<p><strong>' + outcomeLabels[state.outcome] + '</strong></p>' + html;
        if (question.points) html += list(question.points);
        html += '<p>' + escape(question.explanation) + '</p>';
      }
      feedback.innerHTML = html;
      feedback.classList.toggle("hb-feedback-visible", Boolean(html));
      updateFollowup();
    }

    root.querySelectorAll("[data-hb-stage]").forEach(section => {
      const stage = section.dataset.hbStage;
      const question = questions[stage];
      const form = section.querySelector("form");
      const textarea = form.querySelector("textarea");
      const state = record[stage] ||= {};
      if (textarea) textarea.value = state.draft || "";
      else if (Number.isInteger(state.selected)) {
        const choice = form.querySelector('input[value="' + state.selected + '"]');
        if (choice) choice.checked = true;
      }

      form.addEventListener("input", () => {
        if (textarea) state.draft = textarea.value;
        else state.selected = Number(form.querySelector("input:checked").value);
        save(key, record);
      });

      form.addEventListener("click", event => {
        const button = event.target.closest("[data-hb-action]");
        if (!button) return;
        if (button.dataset.hbAction === "hint") {
          if ((state.hint || 0) >= question.hints.length) return;
          state.hint = (state.hint || 0) + 1;
        } else {
          state.revealed = true;
          state.note = "";
          state.outcome ||= textarea ? "selfReview" : "explained";
        }
        save(key, record);
        showState(section, state, question);
      });

      form.addEventListener("submit", event => {
        event.preventDefault();
        state.note = "";
        if (textarea) {
          if (textarea.value.trim()) state.outcome = "selfReview";
          else state.note = "Write an explanation first, or show the model for help.";
        } else {
          const selected = form.querySelector("input:checked");
          if (!selected) state.note = "Choose one answer.";
          else if (Number(selected.value) !== question.answer) {
            state.note = question.options[Number(selected.value)][1];
            state.wrong = true;
          } else if (!state.outcome || state.outcome === "explained") {
            state.outcome = state.revealed ? "explained" : state.wrong ? "corrected" :
              stage === "guided" || state.hint ? "guided" : stage === "followup" ? "followup" : "independent";
          }
        }
        save(key, record);
        showState(section, state, question);
      });

      showState(section, state, question);
    });
    root.querySelector('[data-hb-action="model"]')?.addEventListener("click", event => {
      const button = event.currentTarget;
      const steps = button.previousElementSibling;
      const next = steps.querySelector("[hidden]");
      if (next) next.hidden = false;
      else Array.from(steps.children).slice(1).forEach(step => { step.hidden = true; });
      if (next) {
        next.tabIndex = -1;
        next.focus();
      }
      button.textContent = steps.querySelector("[hidden]") ? "Show next step" : "Replay example";
    });
    updateFollowup();
  }

  const choice = (prompt, answer, options, explanation, hints, extra) =>
    ({ prompt, answer, options, explanation, hints, ...extra });
  const written = (prompt, points, explanation, hints) => ({ prompt, points, explanation, hints });

  window.KeystoneHumanTeaching = { render, mount, storageKey, choice, written };
})();

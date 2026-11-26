(function () {
  'use strict';
  const key = 'keystone.alevel.plan-investigation.v1';
  const data = window.ALevelPlanInvestigationData;
  let memory;
  let host;
  let current = null;
  let area = 0;
  let resetPending = false;
  const reasoningModels = {
    potato: 'Comparable pieces help limit differences in surface area or starting tissue that could also affect the mass change. Check whether your explanation links the choice to a fairer comparison.',
    beetroot: 'Different exposure times could change how much pigment leaks, independently of temperature. Check whether your explanation links the same exposure time to a clearer temperature comparison.',
    growth: 'Random allocation helps prevent initial size being deliberately tied to a treatment; measuring initial and final length describes each seedling’s change. Neither alone removes every possible confounder. Compare this reasoning with your own.'
  };

  function read() {
    if (memory) return memory;
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      memory = parsed && typeof parsed === 'object' && parsed.stages && typeof parsed.stages === 'object' ? parsed : { stages: {} };
    } catch (_) { memory = { stages: {} }; }
    return memory;
  }
  function write() {
    try { localStorage.setItem(key, JSON.stringify(read())); return true; }
    catch (_) { return false; }
  }
  function state(id) {
    const stages = read().stages;
    if (!stages[id] || typeof stages[id] !== 'object') stages[id] = { answers: {} };
    if (!stages[id].answers || typeof stages[id].answers !== 'object') stages[id].answers = {};
    return stages[id];
  }
  function el(tag, text, cls) {
    const n = document.createElement(tag);
    if (text !== undefined && text !== null) n.textContent = text;
    if (cls) n.className = cls;
    return n;
  }
  function action(label, name, fn, primary) {
    const b = el('button', label, 'btn' + (primary ? ' primary' : ''));
    b.type = 'button'; b.dataset.planAction = name; b.addEventListener('click', fn); return b;
  }
  function focus(n) { if (n) { n.tabIndex = -1; n.focus(); } }
  function addText(parent, value, cls) {
    (Array.isArray(value) ? value : value ? [value] : []).forEach(t => parent.append(el('p', t, cls)));
  }
  function persist() {
    const ok = write();
    const note = host && host.querySelector('[data-plan-storage]');
    if (note) note.textContent = ok ? 'Saved in this browser. Clearing browser data removes this progress.' : 'This browser could not save progress. Your work remains available while this page stays open.';
  }
  function allFields(investigation) { return investigation.areas.flatMap(a => a.fields); }
  function hasUnassessedDecision(investigation, feedback) {
    return feedback.some(message => message.type === 'unassessed' && allFields(investigation).some(field => field.id === message.field && field.type === 'select'));
  }
  function readable(field, answer) {
    if (answer === undefined || answer === '') return 'Not yet specified';
    const option = field.options && field.options.find(o => o.value === answer);
    return option ? option.label : String(answer) + (field.suffix ? ' ' + field.suffix : '');
  }
  function overview() {
    current = null;
    host.replaceChildren();
    host.append(el('h1', 'Plan an investigation'));
    addText(host, 'Connect a question to treatments, measurements, samples and conditions. Choose where to start; you can return to any investigation.');
    const list = el('ol', null, 'plan-list');
    data.investigations.forEach((item, i) => {
      const s = state(item.id);
      const li = el('li', null, 'plan-card');
      li.append(el('h2', (i + 1) + '. ' + item.title), el('p', item.summary || ''));
      const status = s.completed || s.reviewSaved ? 'Review' : (s.started || s.first ? 'Resume' : 'Start');
      const b = action(status + ' ' + item.title, 'stage', () => { resetPending = false; current = item.id; area = 0; state(item.id).started = true; persist(); render(); focus(host.querySelector('h1')); }, true);
      b.dataset.planStage = item.id;
      li.append(b); list.append(li);
    });
    host.append(list);
    const note = el('p', '', 'plan-storage'); note.dataset.planStorage = ''; host.append(note);
    const reset = action(resetPending ? 'Confirm reset of these investigations' : 'Reset investigation progress', 'reset', () => {
      if (!resetPending) { resetPending = true; overview(); host.querySelector('[data-plan-action="reset"]').focus(); return; }
      memory = { stages: {} }; resetPending = false; persist(); overview(); focus(host.querySelector('h1'));
    });
    host.append(reset);
    if (resetPending) host.append(action('Cancel reset', 'cancel-reset', () => { resetPending = false; overview(); host.querySelector('[data-plan-action="reset"]').focus(); }));
    persist();
  }
  function brief(item, collapsible) {
    const wrap = el(collapsible ? 'details' : 'div', null, 'plan-brief');
    if (collapsible) {
      wrap.append(el('summary', 'Question and materials'));
      const s = state(current);
      wrap.open = s.briefOpen !== false;
      wrap.addEventListener('toggle', () => { s.briefOpen = wrap.open; persist(); });
    }
    wrap.dataset.wordHelpScope = '';
    window.ALevelVocabulary?.setAssessment(wrap, { incidental: ['absorbance', 'germination', 'osmosis'] });
    wrap.append(el('p', item.question, 'plan-question'));
    addText(wrap, item.brief);
    return wrap;
  }
  function summary(item, s) {
    const details = el('details', null, 'plan-summary');
    details.append(el('summary', 'Your current plan'));
    item.areas.forEach(a => {
      const section = el('section'); section.append(el('h3', a.title));
      const dl = el('dl');
      a.fields.forEach(f => { dl.append(el('dt', f.label), el('dd', readable(f, s.answers[f.id]))); });
      section.append(dl); details.append(section);
    });
    return details;
  }
  function help(item, s) {
    if (!item.help || !item.help.length) return null;
    const details = el('details', null, 'plan-help');
    details.append(el('summary', 'Help with planning'));
    const hints = Array.isArray(item.help) ? item.help : [item.help];
    hints.forEach((hint, i) => {
      const d = el('details'); d.append(el('summary', i === 0 ? 'A starting prompt' : i === 1 ? 'A more specific cue' : 'Worked help'));
      addText(d, hint);
      d.addEventListener('toggle', () => { if (d.open) { s.helped = true; persist(); } });
      details.append(d);
    });
    return details;
  }
  function allocationVisual(item, s) {
    const fields = allFields(item).filter(f => /^n\d+$/.test(f.id));
    const figure = el('figure', null, 'plan-allocation');
    figure.append(el('figcaption', 'Allocation overview — each dot represents one specimen'));
    fields.forEach(f => {
      const value = s.answers[f.id];
      const row = el('p');
      const count = Number(value);
      const valid = value !== undefined && value !== '' && Number.isInteger(count) && count >= 0 && count <= f.max;
      row.append(el('strong', f.label + ': '));
      if (!valid) row.append(document.createTextNode('not yet specified'));
      else {
        row.append(document.createTextNode(String(count) + ' '));
        const dots = el('span', '● '.repeat(count)); dots.setAttribute('aria-hidden', 'true'); row.append(dots);
      }
      figure.append(row);
    });
    return figure;
  }
  function fieldControl(field, s, feedback) {
    const block = el('div', null, 'plan-field');
    const id = 'plan-' + current + '-' + field.id;
    const label = el('label', field.label); label.htmlFor = id; block.append(label);
    if (field.description) { const desc = el('p', field.description, 'plan-field-description'); desc.id = id + '-description'; block.append(desc); }
    let input;
    if (field.type === 'select') {
      input = el('select');
      const empty = el('option', 'Choose an answer'); empty.value = ''; input.append(empty);
      (field.options || []).forEach(o => { const opt = el('option', o.label); opt.value = o.value; input.append(opt); });
    } else if (field.type === 'textarea') { input = el('textarea'); input.rows = 3; input.maxLength = 1200; }
    else { input = el('input'); input.type = field.type === 'number' ? 'number' : 'text'; if (input.type === 'number') { input.min = field.min ?? 0; if (field.max !== undefined) input.max = field.max; input.step = '1'; } else input.maxLength = 300; }
    input.id = id; input.dataset.planField = field.id; input.value = s.answers[field.id] ?? '';
    input.setAttribute('aria-describedby', [field.description && id + '-description', id + '-feedback'].filter(Boolean).join(' '));
    block.append(input);
    if (field.suffix) block.append(el('span', ' ' + field.suffix));
    const local = el('p', '', 'plan-local-feedback'); local.id = id + '-feedback'; local.dataset.planLocal = field.id; local.setAttribute('aria-live', 'polite'); block.append(local);
    function setLocalFeedback(messages) {
      const relevant = messages.filter(m => m.field === field.id && ['problem', 'missing', 'alternative', 'advisory'].includes(m.type));
      local.textContent = relevant.map(m => m.text).join(' ');
      if (relevant.some(m => m.type === 'problem' || m.type === 'missing')) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    }
    setLocalFeedback(s.checked && Array.isArray(s.feedback) ? s.feedback : []);
    const update = () => {
      s.answers[field.id] = input.value;
      s.checked = false; s.completed = false; s.reviewSaved = false; s.feedback = [];
      feedback.replaceChildren();
      host.querySelectorAll('[data-plan-postcheck]').forEach(n => n.remove());
      host.querySelectorAll('.plan-outcome').forEach(n => n.remove());
      const previousSummary = host.querySelector('.plan-summary');
      if (previousSummary) { const updated = summary(data.investigations.find(i => i.id === current), s); updated.open = previousSummary.open; previousSummary.replaceWith(updated); }
      const previousVisual = host.querySelector('.plan-allocation');
      if (previousVisual) previousVisual.replaceWith(allocationVisual(data.investigations.find(i => i.id === current), s));
      const messages = data.check(current, s.answers);
      host.querySelectorAll('[data-plan-local]').forEach(n => {
        const relevant = messages.filter(m => m.field === n.dataset.planLocal && ['problem', 'alternative', 'advisory'].includes(m.type));
        const text = relevant.map(m => m.text).join(' ');
        if (n.textContent !== text) n.textContent = text;
        const associated = host.querySelector('[data-plan-field="' + n.dataset.planLocal + '"]');
        if (associated) {
          if (relevant.some(m => m.type === 'problem')) associated.setAttribute('aria-invalid', 'true');
          else associated.removeAttribute('aria-invalid');
        }
      });
      persist();
    };
    input.addEventListener(input.tagName === 'SELECT' ? 'change' : 'input', update);
    return block;
  }
  function showFeedback(item, s, target) {
    target.replaceChildren();
    if (!s.checked) return;
    const messages = s.feedback || [];
    if (!messages.length) target.append(el('p', 'The represented decisions fit together. Review your written explanation and method: they have not been automatically assessed.'));
    else {
      target.append(el('h3', 'Check these decisions'));
      const ul = el('ul');
      messages.forEach(m => {
        const li = el('li');
        const field = allFields(item).find(f => f.id === m.field);
        const category = ({problem:'Change needed', missing:'Add detail', alternative:'A valid alternative', advisory:'Consider', unassessed:'Not assessed'})[m.type] || 'Review';
        li.append(el('strong', (field ? field.label + ' — ' : '') + category + ': '), document.createTextNode(m.text));
        const idx = item.areas.findIndex(a => a.fields.some(f => f.id === m.field));
        if (idx >= 0) {
          const repair = action('Go to this decision', 'repair', () => { area = idx; render(); const n = host.querySelector('[data-plan-field="' + m.field + '"]'); if (n) n.focus(); });
          if (field) repair.setAttribute('aria-label', 'Go to ' + field.label);
          li.append(document.createTextNode(' '), repair);
        }
        ul.append(li);
      }); target.append(ul);
    }
  }
  function render() {
    if (!current) { overview(); return; }
    const item = data.investigations.find(i => i.id === current);
    const s = state(current);
    if (!item) { overview(); return; }
    host.replaceChildren();
    host.append(action('All investigations', 'back', () => { overview(); focus(host.querySelector('h1')); }));
    host.append(el('h1', item.title));
    const note = el('p', '', 'plan-storage'); note.dataset.planStorage = ''; host.append(note);
    if (s.completed) host.append(el('p', (s.helped ? 'Optional planning hints opened. ' : 'No optional planning hints opened. ') + (current === 'cress' ? 'Follow-up checks are structured practice; neither written plan is automatically assessed.' : 'This is structured practice, not an unaided examination response.'), 'plan-outcome'));
    else if (s.reviewSaved) host.append(el('p', 'Saved for review. The checker could not assess one or more planning decisions, so it cannot confirm that they resolve the problem.', 'plan-outcome'));
    if (current === 'cress' && !s.first) {
      host.append(brief(item, false));
      const label = el('label', 'Write your first plan'); label.htmlFor = 'plan-first';
      const first = el('textarea'); first.id = 'plan-first'; first.rows = 9; first.maxLength = 6000; first.dataset.planFirst = ''; first.value = s.firstDraft || '';
      first.addEventListener('input', () => { s.firstDraft = first.value; persist(); });
      const msg = el('p'); msg.setAttribute('role', 'status');
      host.append(label, first, msg, action('Save first attempt', 'save-first', () => {
        if (!first.value.trim()) { msg.textContent = 'Write your first plan before saving it.'; first.focus(); return; }
        s.first = first.value.trim(); s.revision = s.first; delete s.firstDraft; area = 0; persist(); render(); focus(host.querySelector('h2'));
      }, true));
      persist(); return;
    }
    host.append(brief(item, true));
    if (item.calculation) {
      const calc = el('details', null, 'plan-calculation'); calc.open = current === 'potato' && area === 1;
      calc.append(el('summary', 'Percentage change: formula and example')); addText(calc, item.calculation);
      const figure = el('figure', null, 'plan-measurement');
      figure.append(el('figcaption', 'Illustrative measurement of one potato piece'));
      const diagram = el('div', null, 'plan-measurement-diagram');
      diagram.setAttribute('role', 'img');
      diagram.setAttribute('aria-label', 'The same potato piece has a mass of 2.0 grams before treatment and 2.2 grams after treatment. Its percentage mass change is plus 10 percent.');
      const before = el('span', 'Before treatment: 2.0 g');
      const arrow = el('span', '→');
      const after = el('span', 'After treatment: 2.2 g');
      const change = el('span', 'Change: +10%');
      [before, arrow, after, change].forEach(n => { n.setAttribute('aria-hidden', 'true'); diagram.append(n); });
      figure.append(diagram); calc.append(figure); host.append(calc);
    }
    if (current === 'cress') {
      const saved = el('details', null, 'plan-first-saved');
      saved.append(el('summary', 'Your saved first attempt'), el('p', s.first, 'plan-written'));
      host.append(saved, el('p', 'These checks apply to your follow-up decisions. They do not assess your first attempt.'));
    } else if (item.model) {
      const model = el('details', null, 'plan-model');
      model.open = current === 'potato' && area === 0;
      model.append(el('summary', 'Worked reasoning'));
      addText(model, item.model); host.append(model);
    }
    const h = help(item, s); if (h) host.append(h);
    host.append(summary(item, s));
    const nav = el('nav', null, 'plan-areas'); nav.setAttribute('aria-label', 'Planning areas');
    item.areas.forEach((a, i) => {
      const b = action(a.title, 'area', () => { area = i; render(); focus(host.querySelector('h2')); });
      if (i === area) b.setAttribute('aria-current', 'step'); nav.append(b);
    }); host.append(nav);
    const panel = el('section', null, 'plan-area'); panel.append(el('h2', item.areas[area].title));
    if (item.areas[area].instruction) addText(panel, item.areas[area].instruction);
    const feedback = el('div', null, 'plan-feedback'); feedback.dataset.planFeedback = ''; feedback.setAttribute('role', 'status');
    item.areas[area].fields.forEach(f => panel.append(fieldControl(f, s, feedback)));
    if (item.areas[area].fields.some(f => /^n\d+$/.test(f.id))) panel.append(allocationVisual(item, s));
    host.append(panel);
    const controls = el('div', null, 'plan-controls');
    if (area > 0) controls.append(action('Previous area', 'previous', () => { area--; render(); focus(host.querySelector('h2')); }));
    if (area < item.areas.length - 1) controls.append(action('Next area', 'next', () => { area++; render(); focus(host.querySelector('h2')); }, true));
    else controls.append(action('Check the assembled plan', 'check', () => {
      s.feedback = data.check(current, s.answers); s.checked = true; s.completed = false; s.reviewSaved = false; persist(); render(); focus(host.querySelector('[data-plan-feedback]'));
    }, true));
    host.append(controls, feedback); showFeedback(item, s, feedback);
    if (s.checked && reasoningModels[current]) {
      const review = el('section', null, 'plan-self-review'); review.dataset.planPostcheck = '';
      review.append(el('h3', 'Review your explanation'), el('p', reasoningModels[current]), el('p', 'Compare this with your explanation and improve it if needed. Your writing is not automatically assessed.'));
      host.append(review);
    }
    if (s.checked && Array.isArray(s.feedback) && !s.feedback.some(m => m.type === 'problem' || m.type === 'missing')) {
      if (current === 'cress') {
        const revision = el('section', null, 'plan-revision'); revision.dataset.planPostcheck = '';
        revision.append(el('h2', 'Revise your plan'), el('p', 'Improve or clarify a concrete decision using the checks. Your original stays saved separately; this writing is not automatically assessed.'));
        const label = el('label', 'Revised plan'); label.htmlFor = 'plan-revision';
        const text = el('textarea'); text.id = 'plan-revision'; text.rows = 9; text.maxLength = 6000; text.value = s.revision || s.first; text.dataset.planRevision = '';
        const result = el('p'); result.setAttribute('role', 'status');
        text.addEventListener('input', () => { s.revision = text.value; s.completed = false; result.textContent = ''; host.querySelectorAll('.plan-outcome').forEach(n => n.remove()); persist(); });
        revision.append(label, text, result, action('Save revision', 'revise', () => {
          if (!text.value.trim() || text.value.trim() === s.first.trim()) { result.textContent = 'Change or clarify a decision in your plan before saving the revision.'; text.focus(); return; }
          s.revision = text.value; s.completed = true; persist(); result.textContent = 'Revision saved. ' + (s.helped ? 'Optional planning hints opened. ' : 'No optional planning hints opened. ') + 'Follow-up checks are structured practice. Your first attempt and revision remain separate and are not automatically assessed.';
        }, true)); host.append(revision);
      } else if (hasUnassessedDecision(item, s.feedback)) {
        const note = el('p', 'The checker cannot assess one or more of your planning decisions. You can save this plan for review, but the checker cannot confirm that those decisions resolve a problem.'); note.dataset.planPostcheck = ''; host.append(note);
        const save = action(s.reviewSaved ? 'Saved for review' : 'Save plan for review', 'save-review', () => { s.reviewSaved = true; s.completed = false; persist(); render(); focus(host.querySelector('[data-plan-feedback]')); }, true); save.dataset.planPostcheck = ''; host.append(save);
      } else {
        const complete = action(s.completed ? 'Plan saved' : 'Save this checked plan', 'complete', () => { s.completed = true; persist(); render(); focus(host.querySelector('[data-plan-feedback]')); }, true); complete.dataset.planPostcheck = ''; host.append(complete);
      }
    }
    persist();
  }
  window.ALevelPlanInvestigation = {
    mount(container) { host = el('div', null, 'plan-investigation'); container.append(host); current = null; area = 0; resetPending = false; overview(); },
    resetMemory() { memory = { stages: {} }; },
    status() {
      const stages = Object.values(read().stages);
      const count = stages.filter(s => s && s.completed).length;
      if (!stages.some(s => s && (s.started || s.first || s.completed))) return ['Start', ''];
      return [count === data.investigations.length ? 'Review' : 'Resume', count + ' of ' + data.investigations.length + ' investigations saved'];
    }
  };
}());

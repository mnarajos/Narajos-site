import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';
import { chromium, firefox, webkit } from 'playwright';
import axe from 'axe-core';
import { servePublic } from './browser-test-site.mjs';

// Exercise the authored decision rules without interpreting free text as evidence.
const sandbox = { window: {} };
vm.runInNewContext(readFileSync(new URL('../public/alevel/plan-investigation-data.js', import.meta.url), 'utf8'), sandbox);
vm.runInNewContext(readFileSync(new URL('../public/alevel/plan-investigation-progression.js', import.meta.url), 'utf8'), sandbox);
const { investigations, check } = sandbox.window.ALevelPlanInvestigationData;
assert.deepEqual(Array.from(investigations, x => x.id), ['potato', 'beetroot', 'growth', 'cress']);
const potato = { n0:'3', n1:'3', n2:'3', n3:'3', unit:'individual', measure:'beforeafter', time:'same', process:'percent', volume:'10', conditions:'same', reason:'Similar pieces make the comparison useful.' };
const beetroot = { diagnosis:'volume', repair:'three', n0:'4', n1:'4', n2:'4', unit:'individual', measure:'absorbance', duration:'10', process:'mean', volume:'10', conditions:'same', procedure:'Rinse and treat equally.', reason:'Time could also change pigment release.' };
const growth = { n0:'6', n1:'6', n2:'6', unit:'individual', allocation:'random', independent_count:'18', measure:'beforeafter', endday:'7', inference:'finalonly', process:'change', conditions:'same', reason:'Random allocation helps distribute starting variation.' };
const cress = { n0:'8', n1:'8', n2:'8', unit:'individual', conditions:'same', measure:'proportion' };
const flagged = (id, answers, type, pattern) => check(id, answers).some(issue => issue.type === type && pattern.test(issue.text));
for (const [id, answers] of Object.entries({potato, beetroot, growth, cress})) {
  assert(!check(id, answers).some(issue => ['missing', 'problem'].includes(issue.type)), `${id}: coherent choices should pass structured checks`);
  assert(flagged(id, {...answers, n0:''}, 'missing', /decision/i), `${id}: missing allocation`);
  assert(flagged(id, {...answers, unit:'shared'}, 'problem', /vessel|independent/i), `${id}: shared vessel is not multiple independent treatments`);
  assert(flagged(id, {...answers, unit:'readings'}, 'problem', /readings|specimen/i), `${id}: repeated readings are not independent specimens`);
  assert(flagged(id, {...answers, conditions:'varies'}, 'problem', /condition|light/i), `${id}: confounded conditions`);
  assert(flagged(id, {...answers, unit:'other'}, 'unassessed', /cannot assess/i), `${id}: alternative is not marked incorrect`);
  assert(flagged(id, {...answers, unit:'other'}, 'missing', /alternative/i), `${id}: request details for an alternative`);
}
assert(flagged('potato', {...potato, n0:'4', n1:'4', n2:'4', n3:'4'}, 'problem', /16.*12/));
for (const [id, answers] of [['potato',potato], ['beetroot',beetroot]]) {
  assert(!flagged(id, {...answers, volume:'12.5'}, 'problem', /volume|whole|number|precision/i), `${id}: half-cubic-centimetre volume is permitted`);
  assert(flagged(id, {...answers, volume:'12.25'}, 'problem', /volume|precision|0\.5|half/i), `${id}: volume must fit stated apparatus precision`);
  assert(flagged(id, {...answers, n0:'2.5'}, 'problem', /whole|number/i), `${id}: specimen counts remain whole numbers`);
}
assert(flagged('potato', {...potato, process:'final'}, 'problem', /percentage change/i));
assert(flagged('beetroot', {...beetroot, duration:'15'}, 'problem', /10.minute/i));
assert(flagged('beetroot', {...beetroot, diagnosis:'random'}, 'problem', /water|volume/i));
assert(flagged('beetroot', {...beetroot, repair:'divide'}, 'problem', /volume/i));
assert(!check('beetroot', {...beetroot, repair:'two', n0:'4', n1:'4', n2:'0'}).some(issue => ['problem','missing'].includes(issue.type)), 'A defensible two-temperature repair is accepted');
assert(!check('beetroot', {...beetroot, repair:'three', volume:'12.5'}).some(issue => ['problem','missing'].includes(issue.type)), 'A defensible three-temperature equal-volume repair is accepted');
assert(flagged('beetroot', {...beetroot, repair:'two', n2:'4'}, 'problem', /20 and 40|zero/i), 'Comparison must match the selected two-temperature repair');
assert(flagged('beetroot', {...beetroot, repair:'two', n2:'0', volume:'12.5'}, 'problem', /10 cm³/i), 'Retaining supplied two-treatment plan retains its 10 cm³ volume');
assert(flagged('beetroot', {...beetroot, process:'percent'}, 'problem', /absorbance/i));
assert(flagged('beetroot', {...beetroot, measure:'colour', process:'percent'}, 'problem', /colour descriptions/i));
assert(flagged('beetroot', {...beetroot, measure:'other', process:'percent', details:'Another measurement'}, 'unassessed', /cannot tell/i));
assert(!check('beetroot', {...beetroot, measure:'other', process:'percent', details:'Another measurement'}).some(issue => issue.type === 'problem' && /absorbance readings/.test(issue.text)), 'Do not assume an unassessed measurement is absorbance');
assert(flagged('growth', {...growth, n0:'0', independent_count:'12'}, 'advisory', /zero-concentration reference/i));
assert(!check('growth', {...growth, n0:'0', independent_count:'12'}).some(issue => issue.type === 'problem'), 'Two non-zero regulator concentrations support a concentration comparison');
assert(flagged('growth', {...growth, independent_count:'6'}, 'problem', /18 independent treatment applications/i), 'Application count must agree with individually treated allocation');
assert(!check('growth', growth).some(issue => issue.field === 'independent_count' && issue.type === 'problem'), 'Matching treatment-application count is accepted');
assert(flagged('growth', {...growth, unit:'other', details:'Separate independently treated grouped vessels.'}, 'unassessed', /depends on how the treatment is applied/i), 'Other treatment arrangements remain unassessed');
assert(!check('growth', {...growth, measure:'finalknown', process:'change'}).some(issue => issue.type === 'problem'), 'Known common initial length supports calculating each increase');
assert(flagged('growth', {...growth, measure:'finalstandard', process:'change'}, 'unassessed', /initial|start/i), 'Vague standardisation is insufficient to establish each increase');
assert(flagged('growth', {...growth, measure:'finalstandard', process:'final'}, 'unassessed', /initial|start/i), 'Unspecified standardisation is not assessed as a known baseline');
assert(!check('growth', {...growth, measure:'final', process:'final'}).some(issue => issue.type === 'problem'), 'Randomised final-outcome comparison is not automatically invalid');
assert(flagged('growth', {...growth, measure:'final', process:'change'}, 'problem', /initial|start/i), 'An unknown initial length cannot yield each seedling’s increase');
assert(flagged('growth', {...growth, allocation:'size'}, 'problem', /size/i));
assert(flagged('growth', {...growth, inference:'individual'}, 'problem', /initial|start/i));
assert(flagged('growth', {...growth, endday:'5'}, 'problem', /seven|7/i));
assert(flagged('cress', {...cress, n0:'0'}, 'problem', /reference/i));
assert(flagged('cress', {...cress, n0:'7', n1:'9', n2:'0'}, 'alternative', /proportions/i));
assert(flagged('cress', {...cress, measure:'length'}, 'problem', /root length/i));
const rootLengthIssue = check('cress', {...cress, measure:'length'}).find(issue => issue.field === 'measure' && issue.type === 'problem');
assert.match(rootLengthIssue.text, /germinat/i, 'Feedback keeps the stated germination outcome');
assert.doesNotMatch(rootLengthIssue.text, /or change what you measure/i, 'Root growth alone must not be offered as an equivalent outcome');
const singletonCress = {...cress, n0:'1', n1:'1', n2:'0', unit:'shared'};
assert(!check('cress', singletonCress).some(issue => issue.field === 'unit' && issue.type === 'problem'), 'One specimen per vessel is physically identical to individually treated specimens');
assert(flagged('cress', {...cress, unit:'shared'}, 'problem', /independent|vessel/i), 'Several specimens sharing one treatment vessel are not several independent applications');
assert(flagged('potato', potato, 'unassessed', /written response/i), 'Do not certify written explanations');

async function audit(page, label) {
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `${label}: horizontal overflow`);
  const violations = await page.evaluate(async () => (await window.axe.run({ runOnly: { type:'tag', values:['wcag2a','wcag2aa','wcag21aa','wcag22aa'] } })).violations.map(({ id, nodes }) => [id, nodes.map(({ target }) => target)]));
  assert.deepEqual(violations, [], `${label}: accessibility violations`);
}

export async function checkPlanInvestigation(browser, base, axeSource) {
  const desktop = await browser.newPage({ viewport:{width:1280,height:900}, reducedMotion:'reduce' });
  const mobile = await browser.newPage({ viewport:{width:320,height:780}, hasTouch:true, reducedMotion:'reduce' });
  const errors = [];
  for (const p of [desktop, mobile]) { p.setDefaultTimeout(10000); p.on('pageerror', e => errors.push(e.message)); }
  const key = 'keystone.alevel.plan-investigation.v1';
  const legacyKey = 'keystone.alevel.exam-skills.v1';
  const legacy = { interpret: {phase:'practice', index:3, drafts:{3:'Earlier work'}} };
  const route = base + '/alevel/#exam-plan-investigation';
  const stage = (page, id) => page.locator(`[data-plan-stage="${id}"]`).click();
  const field = (page, id) => page.locator(`[data-plan-field="${id}"]`);
  const action = (page, id) => page.locator(`[data-plan-action="${id}"]`);
  async function fillArea(page, values) {
    for (const [id, value] of Object.entries(values)) {
      const input = field(page,id);
      if (await input.evaluate(el => el.tagName === 'SELECT')) await input.selectOption(value);
      else await input.fill(value);
    }
  }
  try {
    const migration = await browser.newPage();
    try {
      const prior = { stages: {
        beetroot: {started:true, checked:true, completed:true, answers:{...beetroot, time:'same'}},
        cress: {started:true, checked:true, completed:true, first:'Earlier independent plan.', revision:'Earlier revised plan.', answers:{...cress}, feedback:[]},
        archived: {draft:'An unrelated saved draft.'}
      }};
      // The previously released shape did not have the new coordinated decisions.
      delete prior.stages.beetroot.answers.diagnosis;
      delete prior.stages.beetroot.answers.repair;
      delete prior.stages.beetroot.answers.duration;
      await migration.addInitScript(({k,v}) => localStorage.setItem(k, JSON.stringify(v)), {k:key,v:prior});
      // The Exam Skills catalogue asks for status before the activity is mounted.
      await migration.goto(base + '/alevel/');
      assert.equal(await migration.locator('.plan-investigation').count(), 0, 'The activity has not been mounted');
      assert.deepEqual(await migration.evaluate(() => window.ALevelPlanInvestigation.status()), ['Resume', '1 of 4 with checked decisions'], 'Status normalises legacy completion before counting, without opening the activity');
      const afterStatus = await migration.evaluate(k => JSON.parse(localStorage.getItem(k)).stages, key);
      assert.deepEqual(Object.keys(afterStatus).sort(), ['archived', 'beetroot', 'cress'], 'Status does not create or delete unrelated stage records');
      assert.deepEqual(afterStatus.archived, prior.stages.archived, 'An unrelated saved draft is preserved');
      assert.equal(afterStatus.beetroot.answers.procedure, prior.stages.beetroot.answers.procedure, 'Status preserves the earlier procedure');
      assert.equal(afterStatus.beetroot.answers.reason, prior.stages.beetroot.answers.reason, 'Status preserves the earlier explanation');
      assert.equal(afterStatus.cress.first, prior.stages.cress.first, 'Status preserves the earlier first attempt');
      assert.equal(afterStatus.cress.revision, prior.stages.cress.revision, 'Status preserves the earlier revision draft');
      await migration.evaluate(() => { location.hash = '#exam'; });
      const catalogueEntry = migration.locator('a[href="#exam-plan-investigation"]');
      await catalogueEntry.waitFor();
      assert.match(await catalogueEntry.innerText(), /1 of 4 with checked decisions/, 'The Exam Skills menu does not count the outdated beetroot completion');
      assert.equal(await migration.locator('.plan-investigation').count(), 0, 'The catalogue status did not mount the activity');
      await catalogueEntry.click();
      await migration.locator('[data-plan-stage="beetroot"]').waitFor();
      await stage(migration,'beetroot');
      let migrated = await migration.evaluate(k => JSON.parse(localStorage.getItem(k)).stages,key);
      assert.equal(migrated.beetroot.answers.n0, '4', 'Earlier allocation remains');
      assert.equal(migrated.beetroot.answers.procedure, prior.stages.beetroot.answers.procedure, 'Earlier written procedure remains');
      assert.equal(migrated.beetroot.answers.reason, prior.stages.beetroot.answers.reason, 'Earlier written explanation remains');
      assert.equal(migrated.beetroot.answers.duration, '10', 'Earlier common timing is retained');
      assert.equal(migrated.beetroot.completed, false, 'Changed requirements invalidate old completion');
      assert.equal(migrated.beetroot.earlierSavedPlan, true, 'Prior saved work is recorded while it is rechecked');
      await action(migration,'back').click();
      await stage(migration,'cress');
      migrated = await migration.evaluate(k => JSON.parse(localStorage.getItem(k)).stages,key);
      assert.equal(migrated.cress.first, 'Earlier independent plan.');
      assert.equal(migrated.cress.revision, 'Earlier revised plan.');
      assert.equal(migrated.cress.firstSupport, 'uncued', 'Previously saved first responses were written before pre-first planning help existed');
      await migration.reload();
      await stage(migration,'cress');
      migrated = await migration.evaluate(k => JSON.parse(localStorage.getItem(k)).stages,key);
      assert.equal(migrated.cress.first, 'Earlier independent plan.');
      assert.equal(migrated.cress.revision, 'Earlier revised plan.');
    } finally { await migration.close(); }
    const earlierDraft = await browser.newPage();
    try {
      await earlierDraft.addInitScript(k => localStorage.setItem(k, JSON.stringify({stages:{cress:{started:true,firstDraft:'Earlier unfinished draft.',answers:{}}}})), key);
      await earlierDraft.goto(base + '/alevel/');
      assert.deepEqual(await earlierDraft.evaluate(() => window.ALevelPlanInvestigation.status()), ['Resume', '0 of 4 with checked decisions'], 'A prior unfinished draft is resumable before mounting');
      const beforeMount = await earlierDraft.evaluate(k => JSON.parse(localStorage.getItem(k)).stages, key);
      assert.deepEqual(Object.keys(beforeMount), ['cress'], 'Inspecting status does not create missing stages');
      assert.equal(beforeMount.cress.firstDraft, 'Earlier unfinished draft.', 'Inspecting status preserves the unsaved first response');
      await earlierDraft.goto(route);
      await stage(earlierDraft,'cress');
      assert.equal(await earlierDraft.locator('[data-plan-first]').inputValue(), 'Earlier unfinished draft.');
      await action(earlierDraft,'first-help').click();
      assert.equal(await earlierDraft.locator('[data-plan-first]').inputValue(), 'Earlier unfinished draft.', 'Asking for help preserves an earlier draft');
      const draftAfterHelp = await earlierDraft.evaluate(k => JSON.parse(localStorage.getItem(k)).stages.cress,key);
      assert.equal(draftAfterHelp.preFirstHelpTiming, 'during-draft', 'Help requested after drafting is not described as preceding all writing');
    } finally { await earlierDraft.close(); }
    const vocabulary = await browser.newPage({viewport:{width:1280,height:900}});
    try {
      await vocabulary.goto(route);
      for (const [id, term, definition] of [
        ['potato', 'osmosis', /water|membrane/i],
        ['beetroot', 'absorbance', /light|absorb/i],
        ['cress', 'germination', /seed|germinat/i],
      ]) {
        await stage(vocabulary,id);
        if (id === 'cress') {
          assert.equal(await vocabulary.locator('[data-plan-field]').count(), 0, 'The first cress attempt has no planning decisions');
          assert.equal(await vocabulary.locator('.plan-help').count(), 0, 'Planning hints stay hidden until the first cress attempt is saved');
        }
        const word = vocabulary.locator(`.plan-brief button.context-vocabulary-term[data-vocabulary-term="${term}"]`).first();
        await word.waitFor();
        await word.click();
        const panel = vocabulary.locator('dialog.vocabulary-panel[open]');
        await panel.waitFor();
        assert.match(await panel.innerText(), definition, `${id}: the incidental definition opens`);
        await vocabulary.keyboard.press('Escape');
        await panel.waitFor({state:'hidden'});
        assert(await word.evaluate(el => el === document.activeElement), `${id}: focus returns to the vocabulary term`);
        const saved = await vocabulary.evaluate(k => JSON.parse(localStorage.getItem(k)), key);
        assert.notEqual(saved.stages[id].helped, true, `${id}: vocabulary lookup does not count as planning help`);
        if (id === 'cress') {
          assert.equal(await vocabulary.locator('[data-plan-field]').count(), 0, 'Word help does not reveal planning scaffolds');
          assert.equal(await vocabulary.locator('[data-plan-first]').count(), 1, 'The uncued first attempt remains available');
        }
        await action(vocabulary,'back').click();
      }
    } finally { await vocabulary.close(); }
    for (const [id, comparison, measurement, samples] of [
      ['potato', {n0:'3',n1:'3',n2:'3',n3:'3',unit:'individual'}, {measure:'beforeafter',time:'same',process:'percent'}, {volume:'10',conditions:'same',reason:'Comparable pieces make treatment comparisons useful.'}],
      ['beetroot', {diagnosis:'volume',repair:'three',n0:'4',n1:'4',n2:'4',unit:'individual'}, {measure:'absorbance',duration:'10',process:'mean'}, {volume:'10',conditions:'same',procedure:'Rinse comparable discs and treat in separate tubes.',reason:'Time also affects pigment release.'}],
    ]) {
      const revisionGate = await browser.newPage({viewport:{width:1280,height:900}});
      try {
        await revisionGate.goto(route);
        await stage(revisionGate,id);
        await fillArea(revisionGate,comparison);
        await action(revisionGate,'next').click();
        await fillArea(revisionGate,measurement);
        await action(revisionGate,'next').click();
        await fillArea(revisionGate,samples);
        await action(revisionGate,'check').click();
        assert.equal(await action(revisionGate,'complete').count(),1, `${id}: a coherent first plan can be saved without an edit`);
        await action(revisionGate,'complete').click();

        await action(revisionGate,'previous').click();
        if (id === 'beetroot') await field(revisionGate,'duration').fill('15');
        else await field(revisionGate,'time').selectOption('varies');
        await action(revisionGate,'next').click();
        await action(revisionGate,'check').click();
        assert.match(await revisionGate.locator('[data-plan-feedback]').innerText(), /Exposure time changes|10.minute treatment/i);
        assert.equal(await action(revisionGate,'complete').count(),0, `${id}: a detected error blocks completion`);
        await field(revisionGate,'reason').fill(samples.reason + ' An unrelated edit.');
        await action(revisionGate,'check').click();
        assert.equal(await action(revisionGate,'complete').count(),0, `${id}: an unrelated edit cannot repair differing timings`);
        await action(revisionGate,'previous').click();
        if (id === 'beetroot') {
          await field(revisionGate,'duration').fill('10');
          await field(revisionGate,'duration').fill('15');
        } else {
          await field(revisionGate,'time').selectOption('same');
          await field(revisionGate,'time').selectOption('varies');
        }
        await action(revisionGate,'next').click();
        await action(revisionGate,'check').click();
        assert.equal(await action(revisionGate,'complete').count(),0, `${id}: restoring the original error remains blocked`);

        await action(revisionGate,'previous').click();
        if (id === 'beetroot') await field(revisionGate,'measure').selectOption('other');
        else await field(revisionGate,'time').selectOption('other');
        if (id === 'beetroot') await field(revisionGate,'duration').fill('10');
        await action(revisionGate,'next').click();
        await field(revisionGate,'details').fill('A different approach to this decision.');
        await action(revisionGate,'check').click();
        assert.equal(await action(revisionGate,'complete').count(),0, `${id}: an unassessed alternative is not a successful repair`);
        await action(revisionGate,'save-review').click();
        assert.match(await revisionGate.locator('.plan-outcome').innerText(), /Saved for review.*could not assess/i);
        const saved = await revisionGate.evaluate(k => JSON.parse(localStorage.getItem(k)).stages, key);
        assert.equal(saved[id].completed, false, `${id}: saving an unassessed alternative does not record completion`);

        await action(revisionGate,'previous').click();
        if (id === 'beetroot') await field(revisionGate,'measure').selectOption('absorbance');
        else await field(revisionGate,'time').selectOption('same');
        await action(revisionGate,'next').click();
        await action(revisionGate,'check').click();
        assert.equal(await action(revisionGate,'complete').count(),1, `${id}: corrected timings permit completion`);
      } finally { await revisionGate.close(); }
    }
    await desktop.addInitScript(({k,v}) => { if (localStorage.getItem(k) === null) localStorage.setItem(k, JSON.stringify(v)); }, {k:legacyKey,v:legacy});
    await desktop.goto(route);
    await desktop.addScriptTag({content:axeSource});
    assert.equal(await desktop.locator('[data-plan-stage]').count(), 4, 'Every investigation is independently accessible');
    await audit(desktop, 'Desktop investigation selection');
    await action(desktop, 'reset').press('Enter');
    assert(await action(desktop, 'reset').evaluate(el => el === document.activeElement), 'Reset confirmation receives keyboard focus');
    assert.match(await action(desktop, 'reset').innerText(), /confirm/i);
    await action(desktop, 'cancel-reset').press('Enter');
    assert(await action(desktop, 'reset').evaluate(el => el === document.activeElement), 'Cancelling reset restores focus');
    await desktop.screenshot({path:`/tmp/narajos-plan-investigation-desktop-${browser.browserType().name()}.png`,fullPage:true});
    const incomplete = await browser.newPage();
    try {
      await incomplete.goto(route);
      await stage(incomplete, 'potato');
      await action(incomplete,'next').click();
      await action(incomplete,'next').click();
      await action(incomplete,'check').click();
      const feedback = incomplete.locator('[data-plan-feedback]');
      assert.match(await feedback.innerText(), /Which measurements will you take\?.*Add detail/s);
      assert.match(await feedback.innerText(), /Volume of solution per vessel \/ cm³.*Add detail/s);
      assert.equal(await feedback.getByRole('button',{name:'Go to Which measurements will you take?'}).count(), 1);
      assert.equal(await feedback.getByRole('button',{name:'Go to Volume of solution per vessel / cm³'}).count(), 1);
    } finally { await incomplete.close(); }
    await stage(desktop, 'potato');
    await fillArea(desktop, {n0:'4',n1:'4',n2:'4',n3:'4',unit:'individual'});
    assert.match(await desktop.locator('[data-plan-local="n0"]').innerText(), /16.*12/, 'Cross-field allocation problem appears immediately');
    assert.equal(await field(desktop,'n0').getAttribute('aria-invalid'), 'true');
    assert((await field(desktop,'n0').getAttribute('aria-describedby')).includes(await desktop.locator('[data-plan-local="n0"]').getAttribute('id')), 'Field is associated with its feedback');
    await action(desktop,'next').click();
    assert.match(await desktop.locator('.plan-calculation').innerText(), /\(final mass − initial mass\) ÷ initial mass × 100/);
    assert.match(await desktop.locator('.plan-calculation').innerText(), /2\.2 − 2\.0.*\+10%/);
    await fillArea(desktop, {measure:'beforeafter',time:'same',process:'percent'});
    await action(desktop,'next').click();
    await fillArea(desktop, {volume:'10',conditions:'same',reason:'Similar pieces give a useful comparison.'});
    await action(desktop,'check').click();
    assert.match(await desktop.locator('[data-plan-feedback]').innerText(), /16.*12/);
    const allocationIssue = desktop.locator('[data-plan-feedback] li').filter({hasText:'16 specimens'});
    assert.match(await allocationIssue.innerText(), /Number of specimens at 0 mol dm⁻³/);
    await allocationIssue.getByRole('button',{name:'Go to Number of specimens at 0 mol dm⁻³'}).click();
    assert(await field(desktop,'n0').evaluate(el => el === document.activeElement), 'Repair moves focus to the relevant decision');
    assert.equal(await field(desktop,'n0').getAttribute('aria-invalid'), 'true');
    await fillArea(desktop, {n0:'3',n1:'3',n2:'3',n3:'3'});
    assert.doesNotMatch(await desktop.locator('[data-plan-local="n0"]').innerText(), /16.*12/, 'Repair removes stale cross-field feedback');
    await action(desktop,'next').click();
    await action(desktop,'next').click();
    await action(desktop,'check').click();
    assert.doesNotMatch(await desktop.locator('[data-plan-feedback]').innerText(), /16.*12/);
    assert.match(await desktop.locator('[data-plan-feedback]').innerText(), /not assess|not automatically assess/i);
    await action(desktop,'complete').click();
    assert.match(await desktop.locator('.plan-outcome').innerText(), /optional planning hints/i);
    await field(desktop,'volume').fill('0');
    assert.equal(await desktop.locator('.plan-outcome').count(), 0, 'Editing removes the stale completion message');
    assert.doesNotMatch(await desktop.locator('[data-plan-feedback]').innerText(), /valid|fit together/i, 'An edit clears stale feedback');
    assert.equal(await action(desktop,'complete').count(),0, 'Editing a checked decision requires a fresh check before saving');
    await action(desktop,'check').click();
    assert.match(await desktop.locator('[data-plan-feedback]').innerText(), /10 to 30/i);
    await desktop.reload();
    assert.deepEqual(await desktop.evaluate(k => JSON.parse(localStorage.getItem(k)),legacyKey),legacy, 'Existing progress is preserved');

    await stage(desktop,'beetroot');
    await desktop.locator('.plan-help > summary').press('Enter');
    await desktop.locator('.plan-help details > summary').first().press('Enter');
    assert.match(await desktop.locator('.plan-help').innerText(), /temperature/i);
    await fillArea(desktop,{diagnosis:'volume',repair:'three',n0:'4',n1:'4',n2:'4',unit:'individual'});
    await action(desktop,'next').click();
    await fillArea(desktop,{measure:'absorbance',duration:'15',process:'mean'});
    await action(desktop,'next').click();
    await fillArea(desktop,{volume:'10',conditions:'same',procedure:'Rinse comparable discs and treat in separate tubes.',reason:'Time also affects pigment release.'});
    await action(desktop,'check').click();
    assert.match(await desktop.locator('[data-plan-feedback]').innerText(), /10.minute treatment/i);
    await desktop.locator('[data-plan-feedback] li').filter({hasText:'10-minute treatment'}).getByRole('button',{name:'Go to Exposure time for every tube / minutes'}).click();
    await field(desktop,'duration').fill('10');
    await action(desktop,'next').click();
    await action(desktop,'check').click();
    await action(desktop,'complete').click();
    await action(desktop,'back').click();
    await stage(desktop,'growth');
    await fillArea(desktop,{n0:'6',n1:'6',n2:'6',unit:'individual',allocation:'random',independent_count:'18'});
    await action(desktop,'next').click();
    await fillArea(desktop,{measure:'finalknown',endday:'7',process:'change',inference:'finalonly'});
    await action(desktop,'next').click();
    await fillArea(desktop,{conditions:'same',reason:'Standardise the initial lengths.'});
    await action(desktop,'check').click();
    assert.equal(await action(desktop,'complete').count(), 1, 'A known common initial length permits calculating each increase');
    await action(desktop,'previous').click();
    await field(desktop,'measure').selectOption('finalstandard');
    await action(desktop,'next').click();
    await action(desktop,'check').click();
    assert.match(await desktop.locator('[data-plan-feedback]').innerText(), /starting information is not specified/i);
    assert.equal(await action(desktop,'complete').count(), 0);
    await action(desktop,'save-review').click();
    const ambiguousGrowth = await desktop.evaluate(k => JSON.parse(localStorage.getItem(k)).stages.growth,key);
    assert.equal(ambiguousGrowth.completed, false);
    assert.equal(ambiguousGrowth.reviewSaved, true, 'Insufficient starting information remains saved for review');
    await action(desktop,'back').click();

    // The cress first response is captured before any planning headings or checks appear.
    await stage(desktop,'cress');
    assert.equal(await desktop.locator('[data-plan-field]').count(),0);
    assert.equal(await desktop.locator('[data-plan-action="help"]').count(),0);
    assert.equal(await desktop.getByText('Follow-up: allocation').count(),0);
    const first = 'Put the seeds in pots and see what happens.';
    await desktop.locator('[data-plan-first]').fill(first);
    await desktop.reload();
    await stage(desktop,'cress');
    assert.equal(await desktop.locator('[data-plan-first]').inputValue(),first, 'Unsubmitted draft resumes');
    await action(desktop,'save-first').click();
    await fillArea(desktop,{n0:'8',n1:'8',n2:'8',unit:'individual'});
    await action(desktop,'next').click();
    await fillArea(desktop,{conditions:'same'});
    await action(desktop,'next').click();
    await fillArea(desktop,{measure:'proportion'});
    await action(desktop,'check').click();
    await desktop.locator('[data-plan-revision]').waitFor();
    assert.equal(await desktop.locator('[data-plan-revision]').inputValue(),first);
    await field(desktop,'measure').selectOption('length');
    assert.equal(await desktop.locator('[data-plan-revision]').count(),0, 'Editing follow-up decisions hides revision until a fresh check');
    await field(desktop,'measure').selectOption('proportion');
    await action(desktop,'check').click();
    const unselectedDraft = 'A possible later revision that I am not choosing.';
    await desktop.locator('[data-plan-revision]').fill(unselectedDraft);
    await action(desktop,'keep-first').click();
    assert.match(await desktop.locator('.plan-revision [role="status"]').innerText(), /unchanged.*not automatically assessed/i);
    let unchanged = await desktop.evaluate(k => JSON.parse(localStorage.getItem(k)).stages.cress,key);
    assert.equal(unchanged.first, first, 'A review never overwrites the first response');
    assert.equal(unchanged.firstSupport, 'uncued', 'No planning help was requested before the first response');
    assert.equal(unchanged.firstSupportTiming, 'none');
    assert.equal(unchanged.reviewDecision, 'unchanged');
    assert.equal(unchanged.completed, true, 'Unchanged written work can be retained when represented decisions have passed');
    assert.equal(unchanged.revision, unselectedDraft, 'An unselected revision remains a distinct draft');
    await desktop.reload();
    await stage(desktop,'cress');
    assert.match(await desktop.locator('.plan-outcome').last().innerText(), /unchanged.*draft.*not the plan/i);
    await action(desktop,'next').click();
    await action(desktop,'next').click();
    assert.equal(await desktop.locator('[data-plan-revision]').inputValue(), unselectedDraft, 'The unselected revision draft remains available after reload');
    const revised = first + ' Compare the proportion germinated after five days for salt and no salt.';
    await desktop.locator('[data-plan-revision]').fill(revised);
    await action(desktop,'revise').click();
    assert.match(await desktop.locator('.plan-revision [role="status"]').innerText(), /not.*assess/i);
    await desktop.locator('[data-plan-revision]').fill(revised + ' Keep light constant.');
    assert.equal(await desktop.locator('.plan-revision [role="status"]').innerText(), '', 'Editing revision clears stale saved feedback');
    await desktop.locator('[data-plan-revision]').fill(revised);
    await action(desktop,'revise').click();
    const record = await desktop.evaluate(k => JSON.parse(localStorage.getItem(k)),key);
    assert.equal(record.stages.cress.first,first);
    assert.equal(record.stages.cress.revision,revised);
    assert.equal(record.stages.cress.reviewDecision,'revised');
    assert.equal(record.stages.cress.answers.measure,'proportion');
    await desktop.reload();
    await stage(desktop,'cress');
    assert.match(await desktop.locator('main').innerText(), /do not assess your first attempt/i);
    await desktop.locator('.plan-first-saved > summary').click();
    assert.match(await desktop.locator('.plan-first-saved').innerText(), /Put the seeds in pots and see what happens/);
    await action(desktop,'next').click();
    await action(desktop,'next').click();
    assert.equal(await desktop.locator('[data-plan-revision]').inputValue(), revised, 'Revised text resumes separately from the first attempt');

    const supported = await browser.newPage();
    try {
      await supported.goto(route);
      await stage(supported,'cress');
      assert.equal(await supported.locator('[data-plan-field]').count(), 0);
      assert.equal(await supported.locator('[data-plan-first]').inputValue(), '');
      await action(supported,'first-help').click();
      assert.match(await supported.locator('.plan-first-help').innerText(), /recorded as supported/i);
      assert.equal(await supported.locator('[data-plan-first]').inputValue(), '', 'Help can be opened without filler');
      await supported.locator('[data-plan-first]').fill('Compare salt treatments using pots.');
      await supported.reload();
      await stage(supported,'cress');
      assert.equal(await supported.locator('[data-plan-first]').inputValue(), 'Compare salt treatments using pots.', 'Opening help preserves the draft');
      assert.equal(await supported.locator('.plan-first-help').count(), 1, 'Pre-first planning help remains available on resume');
      await action(supported,'save-first').click();
      const firstRecord = await supported.evaluate(k => JSON.parse(localStorage.getItem(k)).stages.cress,key);
      assert.equal(firstRecord.preFirstHelp, true);
      assert.equal(firstRecord.firstSupport, 'supported');
      assert.equal(firstRecord.firstSupportTiming, 'before-draft', 'Help opened before any writing is distinguishable');
      await fillArea(supported,{n0:'8',n1:'8',n2:'8',unit:'individual'});
      await action(supported,'next').click();
      await field(supported,'conditions').selectOption('varies');
      await action(supported,'next').click();
      await field(supported,'measure').selectOption('proportion');
      await action(supported,'check').click();
      assert.equal(await action(supported,'keep-first').count(), 0, 'An unresolved represented problem blocks checked completion');
      await action(supported,'previous').click();
      await field(supported,'conditions').selectOption('other');
      await action(supported,'next').click();
      await field(supported,'details').fill('I will use another way to balance light exposure.');
      await action(supported,'check').click();
      await action(supported,'keep-first').click();
      const reviewRecord = await supported.evaluate(k => JSON.parse(localStorage.getItem(k)).stages.cress,key);
      assert.equal(reviewRecord.first, firstRecord.first);
      assert.equal(reviewRecord.reviewDecision, 'unchanged');
      assert.equal(reviewRecord.completed, false, 'An unassessed follow-up does not become checked completion');
      assert.equal(reviewRecord.reviewSaved, true, 'An unassessed decision is saved for review');
      await supported.reload();
      await stage(supported,'cress');
      const resumed = await supported.evaluate(k => JSON.parse(localStorage.getItem(k)).stages.cress,key);
      assert.equal(resumed.firstSupport, 'supported');
      assert.equal(resumed.firstSupportTiming, 'before-draft');
      assert.equal(resumed.reviewDecision, 'unchanged');
      assert.equal(resumed.answers.conditions, 'other');
      assert.equal(resumed.reviewSaved, true);
    } finally { await supported.close(); }

    await desktop.evaluate(() => { location.hash = '#settings'; });
    await desktop.getByRole('heading',{name:'Settings',exact:true}).waitFor();
    await desktop.locator('#reset').click();
    await desktop.locator('#reset-yes').click();
    await desktop.waitForTimeout(100);
    await desktop.evaluate(() => { location.hash = '#exam-plan-investigation'; });
    assert.match(await desktop.locator('[data-plan-stage="cress"]').innerText(), /Start/i, 'Global reset also clears in-memory activity state');
    await stage(desktop,'cress');
    assert.equal(await desktop.locator('[data-plan-first]').inputValue(), '');

    await mobile.goto(route);
    await mobile.addScriptTag({content:axeSource});
    await stage(mobile,'beetroot');
    await audit(mobile,'320px beetroot planning');
    await mobile.screenshot({path:`/tmp/narajos-plan-investigation-mobile-${browser.browserType().name()}.png`,fullPage:true});
    await action(mobile,'back').tap();
    await stage(mobile,'cress');
    assert.equal(await mobile.locator('[data-plan-first]').inputValue(), '');
    await action(mobile,'first-help').tap();
    assert.equal(await mobile.locator('[data-plan-first]').inputValue(), '', 'Phone help can be requested before writing');
    assert.match(await mobile.locator('.plan-first-help').innerText(), /supported/i);
    await audit(mobile,'320px cress pre-first help');
    await mobile.locator('[data-plan-first]').fill('Compare seeds in pots.');
    await action(mobile,'save-first').tap();
    const mobileFirst = await mobile.evaluate(k => JSON.parse(localStorage.getItem(k)).stages.cress, key);
    assert.equal(mobileFirst.firstSupport, 'supported');
    assert.equal(mobileFirst.firstSupportTiming, 'before-draft');
    await fillArea(mobile,{n0:'8',n1:'8',n2:'8',unit:'individual'});
    await action(mobile,'next').tap();
    await fillArea(mobile,{conditions:'same'});
    await action(mobile,'next').tap();
    await fillArea(mobile,{measure:'proportion'});
    await action(mobile,'check').tap();
    await mobile.locator('[data-plan-revision]').fill('Compare the proportion germinated after five days for salt and no salt.');
    await action(mobile,'revise').tap();
    await audit(mobile,'320px cress revision');
    await mobile.screenshot({path:`/tmp/narajos-plan-investigation-cress-${browser.browserType().name()}.png`,fullPage:true});
    await mobile.setViewportSize({width:390,height:844});
    await mobile.addStyleTag({content:'html { zoom: 1.25; }'});
    await audit(mobile,'390px cress revision at 125% zoom');
    const blocked = await browser.newPage({viewport:{width:390,height:844}});
    try {
      await blocked.addInitScript(k => {
        const original = Storage.prototype.setItem;
        Storage.prototype.setItem = function(name, value) { if (name === k) throw new DOMException('Blocked', 'SecurityError'); return original.call(this, name, value); };
      }, key);
      await blocked.goto(route);
      await stage(blocked,'cress');
      await blocked.locator('[data-plan-first]').fill('A draft remains in this page.');
      assert.match(await blocked.locator('[data-plan-storage]').innerText(), /could not save.*while this page stays open/i);
      assert.equal(await blocked.locator('[data-plan-first]').inputValue(), 'A draft remains in this page.');
    } finally { await blocked.close(); }
    assert.deepEqual(errors, [], 'No page errors');
    console.log('Plan an investigation: authored relationships, repairs, separate first attempt and revision, saved progress, responsive accessibility passed.');
  } finally { await Promise.all([desktop.close(),mobile.close()]); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const engine = { chromium, firefox, webkit }[process.argv[2] || 'chromium'];
  assert(engine, 'Choose chromium, firefox or webkit');
  const systemChromium = engine === chromium && !existsSync(engine.executablePath()) && existsSync('/usr/bin/chromium');
  const browser = await engine.launch(systemChromium ? {executablePath:'/usr/bin/chromium',args:['--no-sandbox']} : {});
  const {server,base} = await servePublic();
  try { await checkPlanInvestigation(browser,base,axe.source); }
  finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
}

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
const { investigations, check } = sandbox.window.ALevelPlanInvestigationData;
assert.deepEqual(Array.from(investigations, x => x.id), ['potato', 'beetroot', 'growth', 'cress']);
const potato = { n0:'3', n1:'3', n2:'3', n3:'3', unit:'individual', measure:'beforeafter', time:'same', process:'percent', volume:'10', conditions:'same', reason:'Similar pieces make the comparison useful.' };
const beetroot = { n0:'4', n1:'4', n2:'4', unit:'individual', measure:'absorbance', time:'same', process:'mean', volume:'10', conditions:'same', procedure:'Rinse and treat equally.', reason:'Time could also change pigment release.' };
const growth = { n0:'6', n1:'6', n2:'6', unit:'individual', allocation:'random', measure:'beforeafter', process:'change', conditions:'same', reason:'Random allocation helps distribute starting variation.' };
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
assert(flagged('potato', {...potato, process:'final'}, 'problem', /percentage change/i));
assert(flagged('beetroot', {...beetroot, time:'varies'}, 'problem', /time/i));
assert(flagged('beetroot', {...beetroot, process:'percent'}, 'problem', /absorbance/i));
assert(flagged('beetroot', {...beetroot, measure:'colour', process:'percent'}, 'problem', /colour descriptions/i));
assert(flagged('beetroot', {...beetroot, measure:'other', process:'percent', details:'Another measurement'}, 'unassessed', /cannot tell/i));
assert(!check('beetroot', {...beetroot, measure:'other', process:'percent', details:'Another measurement'}).some(issue => issue.type === 'problem' && /absorbance readings/.test(issue.text)), 'Do not assume an unassessed measurement is absorbance');
assert(flagged('growth', {...growth, n0:'0'}, 'advisory', /zero-concentration reference/i));
assert(!check('growth', {...growth, n0:'0'}).some(issue => issue.type === 'problem'), 'Two non-zero regulator concentrations support a concentration comparison');
assert(flagged('growth', {...growth, measure:'finalstandard', process:'change'}, 'problem', /initial/i));
assert(flagged('growth', {...growth, measure:'finalstandard', process:'final'}, 'alternative', /standard/i));
assert(flagged('growth', {...growth, allocation:'size'}, 'problem', /size/i));
assert(flagged('cress', {...cress, n0:'0'}, 'problem', /reference/i));
assert(flagged('cress', {...cress, n0:'7', n1:'9', n2:'0'}, 'alternative', /proportions/i));
assert(flagged('cress', {...cress, measure:'length'}, 'problem', /root length/i));
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
    for (const [id, comparison, measurement, samples] of [
      ['potato', {n0:'3',n1:'3',n2:'3',n3:'3',unit:'individual'}, {measure:'beforeafter',time:'same',process:'percent'}, {volume:'10',conditions:'same',reason:'Comparable pieces make treatment comparisons useful.'}],
      ['beetroot', {n0:'4',n1:'4',n2:'4',unit:'individual'}, {measure:'absorbance',time:'same',process:'mean'}, {volume:'10',conditions:'same',procedure:'Rinse comparable discs and treat in separate tubes.',reason:'Time also affects pigment release.'}],
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
        await field(revisionGate,'time').selectOption('varies');
        await action(revisionGate,'next').click();
        await action(revisionGate,'check').click();
        assert.match(await revisionGate.locator('[data-plan-feedback]').innerText(), /Exposure time changes/);
        assert.equal(await action(revisionGate,'complete').count(),0, `${id}: a detected error blocks completion`);
        await field(revisionGate,'reason').fill(samples.reason + ' An unrelated edit.');
        await action(revisionGate,'check').click();
        assert.equal(await action(revisionGate,'complete').count(),0, `${id}: an unrelated edit cannot repair differing timings`);
        await action(revisionGate,'previous').click();
        await field(revisionGate,'time').selectOption('same');
        await field(revisionGate,'time').selectOption('varies');
        await action(revisionGate,'next').click();
        await action(revisionGate,'check').click();
        assert.equal(await action(revisionGate,'complete').count(),0, `${id}: restoring the original error remains blocked`);

        await action(revisionGate,'previous').click();
        await field(revisionGate,'time').selectOption('other');
        await action(revisionGate,'next').click();
        await field(revisionGate,'details').fill('A different approach to timing.');
        await action(revisionGate,'check').click();
        assert.equal(await action(revisionGate,'complete').count(),0, `${id}: an unassessed alternative is not a successful repair`);
        await action(revisionGate,'save-review').click();
        assert.match(await revisionGate.locator('.plan-outcome').innerText(), /Saved for review.*could not assess/i);
        const saved = await revisionGate.evaluate(k => JSON.parse(localStorage.getItem(k)).stages, key);
        assert.equal(saved[id].completed, false, `${id}: saving an unassessed alternative does not record completion`);

        await action(revisionGate,'previous').click();
        await field(revisionGate,'time').selectOption('same');
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
    assert.match(await allocationIssue.innerText(), /Number at 0 mol dm⁻³/);
    await allocationIssue.getByRole('button',{name:'Go to Number at 0 mol dm⁻³'}).click();
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
    await fillArea(desktop,{n0:'4',n1:'4',n2:'4',unit:'individual'});
    await action(desktop,'next').click();
    await fillArea(desktop,{measure:'absorbance',time:'varies',process:'mean'});
    await action(desktop,'next').click();
    await fillArea(desktop,{volume:'10',conditions:'same',procedure:'Rinse comparable discs and treat in separate tubes.',reason:'Time also affects pigment release.'});
    await action(desktop,'check').click();
    assert.match(await desktop.locator('[data-plan-feedback]').innerText(), /time changes/i);
    await desktop.locator('[data-plan-feedback] li').filter({hasText:'Exposure time changes'}).getByRole('button',{name:'Go to How will exposure time relate to temperature?'}).click();
    await field(desktop,'time').selectOption('same');
    await action(desktop,'next').click();
    await action(desktop,'check').click();
    await action(desktop,'complete').click();
    await action(desktop,'back').click();
    await stage(desktop,'growth');
    await fillArea(desktop,{n0:'6',n1:'6',n2:'6',unit:'individual',allocation:'random'});
    await action(desktop,'next').click();
    await fillArea(desktop,{measure:'finalstandard',process:'change'});
    await action(desktop,'next').click();
    await fillArea(desktop,{conditions:'same',reason:'Standardise the initial lengths.'});
    await action(desktop,'check').click();
    assert.match(await desktop.locator('[data-plan-feedback]').innerText(), /initial as well as final/i);
    await desktop.locator('[data-plan-feedback] li').filter({hasText:'initial as well as final'}).getByRole('button',{name:'Go to How will you process the measurements?'}).click();
    await field(desktop,'process').selectOption('final');
    await action(desktop,'next').click();
    await action(desktop,'check').click();
    assert.match(await desktop.locator('[data-plan-feedback]').innerText(), /valid alternative/i);
    await action(desktop,'complete').click();
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
    await action(desktop,'revise').click();
    assert.match(await desktop.locator('.plan-revision [role="status"]').innerText(), /change|clarify/i);
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
    assert.equal(record.stages.cress.answers.measure,'proportion');
    await desktop.reload();
    await stage(desktop,'cress');
    assert.match(await desktop.locator('main').innerText(), /do not assess your first attempt/i);
    await desktop.locator('.plan-first-saved > summary').click();
    assert.match(await desktop.locator('.plan-first-saved').innerText(), /Put the seeds in pots and see what happens/);
    await action(desktop,'next').click();
    await action(desktop,'next').click();
    assert.equal(await desktop.locator('[data-plan-revision]').inputValue(), revised, 'Revised text resumes separately from the first attempt');
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
    await mobile.locator('[data-plan-first]').fill('Compare seeds in pots.');
    await action(mobile,'save-first').tap();
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

import assert from 'node:assert/strict';

// Exercise the diagrams in their teaching routes, including the narrowest
// supported viewport. These checks complement visual and scientific review.
export async function checkCompactCatchupFigures(browser, base) {
  for (const width of [320, 1280]) {
    const page = await browser.newPage({viewport: {width, height: 850}});
    try {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.goto(base + '/alevel/#catchup-a2-membrane');
      const membrane = page.locator('.kc-visual-art-compact');
      await membrane.waitFor();
      assert.equal(await membrane.count(), 1);
      assert(await membrane.evaluate(el => el.scrollWidth <= el.clientWidth + 1), 'membrane diagram should fit its container');
      assert.match(await membrane.locator('svg').getAttribute('aria-label'), /phospholipid.*protein.*cholesterol/i);
      assert.equal(await membrane.getAttribute('tabindex'), null, 'non-scrolling diagram should not add a tab stop');

      await page.goto(base + '/human-biology/#catchup/f175/a2');
      const placenta = page.locator('.hb-teach-explain .hb-teaching-diagram-compact');
      await placenta.waitFor();
      assert.equal(await placenta.count(), 1);
      assert(await placenta.evaluate(el => el.scrollWidth <= el.clientWidth + 1), 'placental diagram should fit its container');
      const img = placenta.locator('img');
      assert(await img.evaluate(el => el.complete && el.naturalWidth > 0), 'placental diagram should load');
      assert.match(await img.getAttribute('alt'), /maternal.*fetal.*oxygen.*carbon dioxide/i);
      assert.equal(await placenta.getAttribute('tabindex'), null, 'non-scrolling diagram should not add a tab stop');
      assert.equal(await placenta.locator('..').locator('.hb-diagram-scroll-hint').count(), 0);

      // The same feedback figure appears in both courses. Check the actual
      // lesson card and text bounds rather than treating no page overflow as
      // proof that the SVG is readable.
      for (const route of ['/alevel/#catchup-a6-glucose', '/human-biology/#catchup/f170/3.1.1']) {
        await page.goto(base + route);
        const figure = page.locator('figure.kc-visual').filter({hasText: 'Blood-glucose negative feedback'});
        await figure.waitFor();
        assert.equal(await figure.count(), 1, route);
        const art = figure.locator('.kc-visual-art-compact');
        assert(await art.evaluate(el => el.scrollWidth <= el.clientWidth + 1), `${route}: feedback should fit`);
        assert.equal(await art.getAttribute('tabindex'), null, `${route}: non-scrolling figure should not add a tab stop`);
        const diagram = art.locator('svg');
        assert.match(await diagram.getAttribute('aria-label'), /beta cells.*insulin.*alpha cells.*glucagon/i);
        const clipped = await diagram.locator('text').evaluateAll(nodes => nodes.some(node => {
          const box = node.getBoundingClientRect();
          const bounds = node.ownerSVGElement.getBoundingClientRect();
          return box.left < bounds.left - 1 || box.right > bounds.right + 1 || box.top < bounds.top - 1 || box.bottom > bounds.bottom + 1;
        }));
        assert.equal(clipped, false, `${route}: feedback labels should fit`);
        if (route.startsWith('/human-biology/')) {
          const model = page.locator('[data-hb-model-step]');
          const independent = page.locator('[data-hb-stage="independent"]');
          await model.locator('.hb-skip').getByRole('button', {name: 'Skip to independent practice'}).click();
          assert(await independent.isVisible(), 'independent stage should open');
          assert(await figure.isHidden(), 'feedback figure must not disclose the fresh assessment');
          assert.equal(await independent.locator('[data-hb-assessment-sensitive]').count(), 0);
          await page.reload();
          assert(await independent.isVisible(), 'independent stage should resume');
          assert(await figure.isHidden(), 'feedback figure must remain hidden on resume');
          await independent.getByRole('textbox').fill('Shivering opposes the fall in body temperature.');
          await independent.getByRole('button', {name: 'Compare my explanation'}).click();
          await independent.getByRole('button', {name: 'Finish review'}).click();
          await independent.getByRole('button', {name: 'Try a fresh check'}).click();
          const followup = page.locator('[data-hb-stage="followup"]');
          assert(await followup.isVisible(), 'follow-up should open');
          assert(await figure.isHidden(), 'feedback figure must not disclose the insulin follow-up');
          await followup.locator('.hb-help summary').click();
          await followup.getByRole('button', {name: 'Revisit worked example'}).click();
          assert(await model.isVisible(), 'worked example should reopen');
          assert(await figure.isVisible(), 'feedback figure should return with teaching');
        }
      }
    } finally {
      await page.close();
    }
  }
  console.log('Compact catch-up figures fit and load at 320px and desktop widths.');
}

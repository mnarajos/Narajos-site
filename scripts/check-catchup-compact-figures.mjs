import assert from 'node:assert/strict';

// Exercise the diagrams in their teaching routes, including the narrowest
// supported viewport. These checks complement visual and scientific review.
export async function checkCompactCatchupFigures(browser, base) {
  for (const width of [320, 1280]) {
    const page = await browser.newPage({viewport: {width, height: 850}});
    try {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.goto(base + '/alevel/#catchup-a2-membrane');
      const membraneFigure = page.locator('figure.kc-visual').filter({
        has: page.getByText('The fluid-mosaic membrane', {exact: true})
      });
      await membraneFigure.waitFor();
      assert.equal(await membraneFigure.count(), 1, 'the specific membrane figure should appear once');
      const membrane = membraneFigure.locator('.kc-visual-art-compact');
      await membrane.waitFor();
      assert.equal(await membrane.count(), 1);
      assert(await membrane.evaluate(el => el.scrollWidth <= el.clientWidth + 1), 'membrane diagram should fit its container');
      assert.match(await membrane.locator('svg').getAttribute('aria-label'), /phospholipid.*protein.*cholesterol/i);
      assert.equal(await membrane.getAttribute('tabindex'), null, 'non-scrolling diagram should not add a tab stop');

      // Keep the definition and consequences of the refractory period in the
      // same teaching block as their shared diagram, without duplicating it.
      await page.goto(base + '/alevel/#catchup-a6-speed');
      const speedBlocks = page.locator('.companion-chunk');
      assert.equal(await speedBlocks.count(), 2);
      assert.match(await speedBlocks.nth(0).innerText(), /speed of conduction/i);
      assert.match(await speedBlocks.nth(1).innerText(), /sodium channels cannot be opened/i);
      assert.match(await speedBlocks.nth(1).innerText(), /limits the frequency/i);
      assert.equal(await speedBlocks.nth(1).locator('figure').filter({hasText: 'The refractory region and impulse direction'}).count(), 1);
      assert.equal(await page.locator('figure').filter({hasText: 'The refractory region and impulse direction'}).count(), 1);

      // The fibre comparison replaces the older one, while the phosphocreatine
      // explanation remains in the first teaching block.
      await page.goto(base + '/alevel/#catchup-a6-fibres');
      const fibreBlocks = page.locator('.companion-chunk');
      assert.equal(await fibreBlocks.count(), 2);
      assert.equal(await fibreBlocks.nth(0).locator('figure').filter({hasText: 'Phosphocreatine regenerates ATP'}).count(), 1);
      for (const block of [fibreBlocks.nth(0), fibreBlocks.nth(1)]) {
        const comparison = block.locator('figure').filter({hasText: 'Fibre features and energy supply'});
        assert.equal(await comparison.count(), 1);
        assert.match(await comparison.locator('svg').getAttribute('aria-label'), /capillar.*myoglobin/i);
        assert(await comparison.locator('.kc-visual-art-compact').evaluate(el => el.scrollWidth <= el.clientWidth + 1));
        assert.equal(await block.locator('figure').filter({hasText: 'Slow and fast fibres compared'}).count(), 0);
      }

      // Keep source and sink mechanisms with their shared mass-flow model;
      // evidence follows in a separate teaching block.
      await page.goto(base + '/alevel/#catchup-a3-phloem');
      const phloemBlocks = page.locator('.companion-chunk');
      assert.equal(await phloemBlocks.count(), 2);
      assert.equal(await phloemBlocks.nth(0).locator(':scope > p').count(), 3);
      assert.match(await phloemBlocks.nth(0).innerText(), /at the sink/i);
      assert.equal(await phloemBlocks.nth(0).locator('figure').filter({hasText: 'Mass flow from source to sink'}).count(), 1);
      assert.match(await phloemBlocks.nth(1).innerText(), /ringing experiments/i);
      assert.equal(await phloemBlocks.nth(1).locator('figure').filter({hasText: 'Ringing and translocation evidence'}).count(), 1);
      assert.equal(await phloemBlocks.nth(1).locator('figure').filter({hasText: 'Tracing carbon from a source leaf'}).count(), 1);

      // Practical recap has a non-numeric teaching graph; it must leave the
      // page when the learner goes to independent questions.
      await page.goto(base + '/alevel/#catchup-a2-osmosis');
      await page.getByText('Review key knowledge', {exact: true}).click();
      const osmosisGraph = page.locator('figure').filter({hasText: 'Read the zero-change point'});
      await osmosisGraph.waitFor();
      const soluteFigure = page.locator('figure').filter({hasText: 'Solute lowers water potential'});
      await soluteFigure.waitFor();
      assert.match(await osmosisGraph.locator('svg').getAttribute('aria-label'), /no measured values or numerical answer/i);
      await page.getByRole('button', {name: 'Go straight to questions', exact: true}).click();
      assert.equal(await osmosisGraph.count(), 0, 'teaching recap should not remain in the independent question view');
      assert.equal(await soluteFigure.count(), 0, 'solute teaching figure should not remain in the independent question view');

      await page.goto(base + '/human-biology/#catchup/f175/a2');
      // Both structural figures are deferred until they have anatomical context.
      // The Phase 1 teaching remains present and fits without the figures.
      const placentaExplanation = page.locator('.hb-teach-explain');
      await placentaExplanation.waitFor();
      assert.match(await placentaExplanation.innerText(), /placenta is attached to the wall of the uterus.*umbilical cord.*foetal blood/is);
      assert.match(await placentaExplanation.innerText(), /Chorionic villi contain foetal vessels.*maternal blood/is);
      assert.equal(await page.locator('img[src="/human-biology/placental-exchange.svg"], img[src="/human-biology/f175-many-villi.svg"]').count(), 0);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 3), 'placental teaching should fit the viewport');

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

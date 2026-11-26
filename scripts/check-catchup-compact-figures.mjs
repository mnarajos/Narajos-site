import assert from 'node:assert/strict';

// Exercise the diagrams in their teaching routes, including the narrowest
// supported viewport. These checks complement visual and scientific review.
export async function checkCompactCatchupFigures(browser, base) {
  for (const width of [320, 1280]) {
    const page = await browser.newPage({viewport: {width, height: 850}});
    try {
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
    } finally {
      await page.close();
    }
  }
  console.log('Compact catch-up figures fit and load at 320px and desktop widths.');
}

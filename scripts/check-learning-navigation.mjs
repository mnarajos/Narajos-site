import assert from "node:assert/strict";

export async function checkLearningNavigation(browser, base) {
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, reducedMotion: "reduce" });
  page.on("pageerror", error => errors.push(error.message));
  const main = page.locator("main");
  const app = base + "/human-biology/";
  const go = route => page.goto(app + "#" + route);
  const overview = page.getByRole("link", { name: "Overview", exact: true });
  const find = page.getByRole("link", { name: "Find a topic", exact: true });
  const search = page.getByRole("searchbox", { name: "Topic or keyword" });
  const results = main.getByRole("list", { name: "Topic results" });
  const stay = page.getByRole("button", { name: "Keep going" });
  const leave = page.getByRole("button", { name: "Leave activity", exact: true });
  const routes = [
    ["f170", "Fundamentals of human biology"], ["f171", "Health and disease"],
    ["f172", "Genetics"], ["f173", "Biomedical techniques"], ["f174", "Nutrition and metabolism"],
    ["f175", "Human reproduction"], ["f176", "The brain"], ["f177", "Drug development"]
  ];

  try {
    await go("home");
    assert.equal(await main.locator(".hb-unit-list a").count(), 8);
    assert.equal(await main.getByRole("heading", { name: "Continue learning" }).count(), 0);
    for (const [unit, title] of routes) {
      await main.locator('.hb-unit-list [href="#challenge/' + unit + '"]').tap();
      await main.getByRole("heading", { name: title, level: 1, exact: true }).waitFor();
      const exam = unit === "f170" || unit === "f171";
      const actions = main.getByRole("region", { name: "Learning activities" });
      assert.equal(await actions.getByRole("link").count(), exam ? 3 : 2);
      assert(await actions.getByRole("link", { name: exam ? /Catch up/ : /Learn concepts/ }).isVisible());
      assert(await actions.getByRole("link", { name: exam ? /Practise questions/ : /Check knowledge/ }).isVisible());
      const more = main.locator(".hb-more-practice");
      assert.equal(await more.getAttribute("open"), null);
      await more.locator("summary").press("Enter");
      assert((await more.getByRole("link").count()) >= 3);
      assert.equal(await main.getByRole("link", { name: "Interactive reproduction model" }).count(), unit === "f175" ? 1 : 0);
      await overview.press("Enter");
    }
    await page.getByRole("link", { name: "Units", exact: true }).press("Enter");
    await page.waitForFunction(() => document.activeElement.id === "hb-units");
    await find.press("Enter");
    await page.waitForFunction(() => document.activeElement.matches("[data-topic-finder] input"));
    assert.equal(await page.getByLabel("Subject or unit").locator("option").count(), 9);
    for (const [term, target] of [
      ["FSH", "f175/a1"], ["ovulation", "f175/a1"], ["immunity", "f171/a3"], ["antibody", "f171/a3"],
      ["microscopy", "f170/1.1.2"], ["chromatography", "f173/a3"], ["glucose", "f170/3.1.1"],
      ["synapse", "f176/a2"], ["EEG", "f176/a5"], ["clinical trials", "f177/a2"]
    ]) {
      await search.fill(term);
      assert.equal(await results.locator('a[href="#catchup/' + target + '"]').count(), 1, term);
    }
    await search.fill("no scientific match here");
    await main.getByRole("status").filter({ hasText: "No matching topics" }).waitFor();
    await page.goBack();
    await page.waitForURL("**/#units");
    await page.goForward();
    await page.waitForURL("**/#find");

    await search.fill("screening");
    await results.locator('a[href="#catchup/f171/4.2.1"]').press("Enter");
    const model = main.locator("[data-hb-model-step]");
    const independent = main.locator('[data-hb-stage="independent"]');
    await model.waitFor({ state: "visible" });
    assert(await independent.isHidden());
    await model.getByRole("button", { name: "Show next step" }).press("Enter");
    assert.equal(await model.locator(".hb-cell-focus").textContent(), "12");
    await model.getByRole("button", { name: "Skip to independent practice" }).press("Enter");
    await independent.waitFor({ state: "visible" });
    assert(await model.isHidden());
    assert(await main.locator(".hb-teach-explain").isVisible());
    await independent.getByRole("radio", { name: /7 of 24/ }).check();
    await independent.getByRole("button", { name: "Check", exact: true }).press("Enter");
    await independent.getByRole("status").locator('[data-learning-feedback="correct"]').waitFor();
    assert(await independent.getByRole("button", { name: "Check", exact: true }).isHidden());
    await independent.getByRole("link", { name: "Continue to practice" }).press("Enter");
    await main.locator(".k-question-paper").waitFor();
    const route = new URL(page.url()).hash;
    const question = await main.locator("h1").textContent();
    await page.goBack();
    await stay.waitFor();
    assert(await stay.evaluate(button => button === document.activeElement));
    await page.keyboard.press("Escape");
    await page.waitForURL(url => url.hash === route);
    assert.equal(await main.locator("h1").textContent(), question);
    await page.goBack();
    await leave.press("Enter");
    await page.waitForURL("**/#catchup/f171/4.2.1");
    await main.getByRole("heading", { name: "Interpreting screening and diagnostic results" }).waitFor();
    await page.goForward();
    await main.locator(".k-question-paper").waitFor();
    assert.equal(await main.locator("h1").textContent(), question);
    await overview.press("Enter");
    await leave.press("Enter");
    await main.getByRole("heading", { name: "Continue learning" }).waitFor();
    await main.getByRole("link", { name: /Resume F171/ }).press("Enter");
    await main.locator(".k-question-paper").waitFor();
    assert.equal(await main.locator("h1").textContent(), question);

    await go("home"); // Accept the same guard for a direct address change.
    await leave.press("Enter");
    await go("catchup/f171/2.1");
    const written = main.locator('[data-hb-stage="independent"]');
    await main.locator("[data-hb-model-step]").getByRole("button", { name: "Skip to independent practice" }).press("Enter");
    await written.waitFor({ state: "visible" });
    const draft = "A systemic medicine can reach disease at several sites.";
    await written.getByRole("textbox").fill(draft);
    await overview.press("Enter");
    await go("cards/f171");
    await main.getByRole("heading", { name: "Recall the biology" }).waitFor();
    await main.locator("#typed").fill("A saved recall attempt");
    await overview.press("Enter");
    await leave.press("Enter");
    const saved = main.getByRole("region", { name: "Continue learning" });
    await saved.getByText("Other saved activities", { exact: true }).press("Enter");
    assert.equal(await saved.getByRole("link").count(), 3);
    assert(await saved.getByRole("link", { name: /F171 Flashcards/ }).isVisible());
    await saved.getByRole("link", { name: /F171.*Choosing a treatment.*Your turn.*Resume/ }).press("Enter");
    assert.equal(await written.getByRole("textbox").inputValue(), draft);
    await page.reload();
    assert(await written.getByRole("textbox").isVisible());
    assert.equal(await written.getByRole("textbox").inputValue(), draft);

    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 844 });
      await go("home");
      const bar = page.getByRole("navigation", { name: "Human Biology app navigation" });
      assert(await bar.evaluate(nav => nav.scrollWidth <= nav.clientWidth + 1));
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2));
      for (const control of await bar.getByRole("link").all()) assert((await control.boundingBox()).height >= 44);
      if (width === 320) {
        const text = await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
        assert(await bar.evaluate(nav => nav.scrollWidth <= nav.clientWidth + 1));
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2));
        await text.evaluate(style => style.remove());
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + "/science-catch-up/");
    await search.fill("osmosis");
    const school = main.getByRole("link", { name: /^Open lesson:.*osmosis/i }).first();
    await school.press("Enter");
    await page.getByRole("button", { name: "Check", exact: true }).first().press("Enter");
    await page.getByRole("dialog").waitFor();
    const schoolLesson = new URL(page.url());
    await page.goto(base + "/science-catch-up/");
    const schoolResume = main.getByRole("region", { name: "Continue learning" });
    assert.match(await schoolResume.textContent(), /Step 1/);
    await schoolResume.getByRole("link", { name: "Resume", exact: true }).press("Enter");
    await page.waitForURL(url => url.searchParams.get("topic") === schoolLesson.searchParams.get("topic"));
    await page.getByRole("dialog").waitFor();

    for (const [path, name, term] of [
      ["/alevel/", "A-level Biology revision home", "osmosis"],
      ["/gcse/", "GCSE revision home", "amylase"]
    ]) {
      await page.goto(base + path);
      await main.getByRole("heading", { name: "Find a topic", exact: true }).waitFor();
      await search.fill(term);
      assert((await results.getByRole("link").count()) > 0);
      const appHome = page.getByRole("link", { name, exact: true });
      await appHome.focus();
      assert.equal(await appHome.evaluate(link => getComputedStyle(link).outlineStyle), "solid");
      assert.equal(await page.getByRole("link", { name: "Narajos homepage" }).getAttribute("href"), "/");
    }
    assert.deepEqual(errors, []);
    console.log("Learning navigation passed across Human Biology, AQA Biology, GCSE and school Catch-up.");
  } finally {
    await page.close();
  }
}

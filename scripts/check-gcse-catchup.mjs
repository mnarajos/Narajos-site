import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import axe from "axe-core";
import { gcseCatchup } from "../public/assets/gcse-catchup-data.js";
import { priorityCatchup } from "../public/assets/gcse-catchup-priority.js";
import { investigations } from "../public/assets/gcse-investigations.js";
import { gcseOpeningVisuals } from "../public/assets/gcse-more-step-visuals.js";

export async function checkGCSECatchup(browser, base) {
  const page = await browser.newPage({viewport: {width: 320, height: 820}, hasTouch: true, reducedMotion: "reduce"});
  // Licensed local fixtures make Poppins and a common DejaVu fallback
  // deterministic even when fonts are unavailable or still loading. Normal
  // rendering remains untouched; native and system fonts are checked too.
  const auditFonts = [
    ...[600, 700].map(weight => ({family: "CatchupAuditPoppins", weight,
      path: `./fixtures/poppins/Poppins-${weight}-latin.woff2`})),
    ...[400, 700].map(weight => ({family: "CatchupAuditDejaVu", weight,
      path: `./fixtures/dejavu/DejaVuSans-${weight}-subset.woff2`}))
  ].map(font => ({...font, data: readFileSync(new URL(font.path, import.meta.url)).toString("base64")}));
  await page.addInitScript(fonts => {
    for (const {family, weight, data} of fonts) {
      const bytes = Uint8Array.from(atob(data), character => character.charCodeAt(0));
      document.fonts.add(new FontFace(family, bytes, {weight: String(weight)}));
    }
  }, auditFonts);
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const journey = page.locator(".school-journey");
  const dialog = journey.locator(".school-check-inline");
  const result = dialog.locator(".school-check-feedback");
  const completion = journey.locator('.school-completion [data-learning-feedback="complete"]');
  const openCheck = async () => {
    const resume = journey.getByRole("button", {name: /^(Check|Resume check)$/});
    if (await resume.isVisible()) await resume.press("Enter");
    await dialog.getByRole("radio").first().waitFor();
  };
  const choose = label => dialog.getByRole("radio", {name: label, exact: true}).click();
  const submit = () => dialog.getByRole("button", {name: "Check", exact: true}).press("Enter");
  const lessonURL = (id, year) => base + "/science-catch-up/lesson/?topic=" + id + "&year=" + year;
  const checkSvgLabels = async (container, context) => {
    const issues = await container.evaluate(async root => {
      await Promise.all([...document.fonts].filter(face => ["CatchupAuditPoppins", "CatchupAuditDejaVu"].includes(face.family)).map(face => face.load()));
      const failures = [];
      for (const svg of root.querySelectorAll('svg[role="img"]')) {
        const view = svg.viewBox.baseVal;
        if (!view.width || !view.height) continue;
        const scale = svg.getBoundingClientRect().width / view.width;
        const texts = [...svg.querySelectorAll('text')];
        const original = texts.map(text => [text.style.getPropertyValue("font-family"), text.style.getPropertyPriority("font-family")]);
        for (const [fontName, fontFamily] of [["native", null], ["Poppins", '"CatchupAuditPoppins", sans-serif'], ["DejaVu fallback", '"CatchupAuditDejaVu", sans-serif'], ["system fallback", "system-ui, sans-serif"]]) {
          texts.forEach((text, i) => {
            if (fontFamily) text.style.setProperty("font-family", fontFamily, "important");
            else if (original[i][0]) text.style.setProperty("font-family", original[i][0], original[i][1]);
            else text.style.removeProperty("font-family");
          });
          const labels = texts.map(text => ({
            name: text.textContent, box: text.getBBox(), size: parseFloat(getComputedStyle(text).fontSize) * scale
          }));
          for (const label of labels) {
            const b = label.box;
            if (label.size < 13.8) failures.push(`${fontName} small: ${label.name} (${label.size.toFixed(1)}px)`);
            if (b.x < view.x - .5 || b.y < view.y - .5 || b.x + b.width > view.x + view.width + .5 || b.y + b.height > view.y + view.height + .5)
              failures.push(`${fontName} clipped: ${label.name}`);
          }
          for (let i = 0; i < labels.length; i++) for (let j = i + 1; j < labels.length; j++) {
            const a = labels[i].box, b = labels[j].box;
            if (a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height)
              failures.push(`${fontName} overlapping: ${labels[i].name} / ${labels[j].name}`);
          }
        }
        texts.forEach((text, i) => original[i][0] ? text.style.setProperty("font-family", original[i][0], original[i][1]) : text.style.removeProperty("font-family"));
      }
      return failures;
    });
    assert.deepEqual(issues, [], context + ": SVG labels must be readable and unclipped at 320px");
  };

  try {
    // A mapped figure must appear with its own teaching step, including after
    // progress is restored.
    for (const [id, lesson] of Object.entries(gcseCatchup)) {
      for (const [index, step] of lesson.steps.entries()) {
        if (!step.teach || !step.visual) continue;
        await page.goto(lessonURL(id, lesson.year));
        await page.evaluate(({key, index}) => localStorage.setItem(key, JSON.stringify({step: index})),
          {key: `narajos.catchup.v1.${lesson.year}.${id}`, index});
        await page.reload();
        const notes = page.locator(".school-current-stage .school-step-notes");
        assert(await notes.locator("figure, table").count(), `${id} step ${index + 1}: missing visual`);
        if (id === "photosynthesis-limits" && index === 2) {
          assert.equal(await notes.locator('svg[aria-label*="Two otherwise similar pondweed samples"]').count(), 1,
            "photosynthesis comparison should appear once at its teaching step");
        }
        if (id === "crude-oil" && index === 2) {
          assert.equal(await notes.locator('svg[aria-label*="Orange bromine water is mixed with an alkene"]').count(), 1,
            "cracking stage must show the bromine-water observation");
        }
        if (id === "potable-water" && index === 1) {
          assert.equal(await notes.locator('svg[aria-label*="Seawater requires desalination"]').count(), 1,
            "water-treatment stage must show the desalination route");
        }
        if (id === "selection-and-variation" && index === 2) {
          assert.equal(await notes.locator('svg[aria-label*="On dark bark, some moths have dark wings"]').count(), 1,
            "selection comparison must show natural selection alongside selective breeding");
        }
        for (const svg of await notes.locator("svg[role=img]").all()) {
          assert((await svg.getAttribute("aria-label"))?.trim(), `${id} step ${index + 1}: missing diagram description`);
        }
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${id}: horizontal overflow`);
        await checkSvgLabels(notes, `${id} step ${index + 1}`);
        for (const control of await notes.locator("button.ks3-model-button").all()) {
          await control.click();
          await checkSvgLabels(notes, `${id} step ${index + 1} control`);
        }
        await page.evaluate(key => localStorage.removeItem(key), `narajos.catchup.v1.${lesson.year}.${id}`);
      }
    }
    // Decay uses the original halving evidence only where it is relevant. The
    // opening also explains randomness, while the first stage explains Bq.
    const decayId = "decay-half-life";
    const decayKey = `narajos.catchup.v1.10.${decayId}`;
    await page.goto(lessonURL(decayId, 10));
    const decayOpening = page.locator("#catchup-evidence");
    assert(await decayOpening.locator('svg[aria-label*="Six model nuclei"]').count(), "decay opening lacks its random-nucleus model");
    assert((await decayOpening.textContent()).includes("80 Bq"), "decay opening lacks its halving evidence");
    for (const index of [0, 1, gcseCatchup[decayId].steps.length - 1]) {
      await page.evaluate(({key, index}) => localStorage.setItem(key, JSON.stringify({step: index})), {key: decayKey, index});
      await page.reload();
      const stage = page.locator(".school-current-stage");
      const activity = stage.locator('svg[aria-label*="eighty becquerels"]');
      assert.equal(await activity.count(), index === 0 ? 1 : 0, `decay activity figure appears at the wrong stage: ${index}`);
      if (index === 1) assert((await stage.locator(".school-step-notes").textContent()).includes("40 Bq"), "decay halving stage lacks the original bars");
    }
    await page.evaluate(key => localStorage.removeItem(key), decayKey);
    await page.goto(lessonURL("parallel-circuits", 10));
    const parallelOpening = page.locator("#catchup-evidence");
    assert((await parallelOpening.textContent()).includes("0.5 A in equals"), "parallel opening lacks its junction example");
    await parallelOpening.getByRole("button", {name: "Open branch A"}).click();
    assert((await parallelOpening.textContent()).includes("Lamp B still has a complete circuit"), "opening branch control did not update its circuit");
    const parallelNotes = page.locator(".school-current-stage .school-step-notes");
    assert(!(await parallelNotes.textContent()).includes("0.5 A in equals"), "junction example should remain with its own teaching step");
    await parallelNotes.getByRole("button", {name: "Open branch A"}).click();
    assert((await parallelNotes.textContent()).includes("Lamp B still has a complete circuit"), "teaching-stage branch control did not update its circuit");
    const glucoseId = "glucose-control";
    const glucoseKey = `narajos.catchup.v1.10.${glucoseId}`;
    await page.goto(lessonURL(glucoseId, 10));
    assert.equal(await page.locator('#catchup-evidence svg[aria-label*="simplified muscle cell"]').count(), 1, "glucose opening lacks the uptake model");
    for (const index of [1, gcseCatchup[glucoseId].steps.length - 1]) {
      await page.evaluate(({key, index}) => localStorage.setItem(key, JSON.stringify({step: index})), {key: glucoseKey, index});
      await page.reload();
      assert.equal(await page.locator('.school-current-stage svg[aria-label*="simplified muscle cell"]').count(), index === 1 ? 1 : 0,
        `glucose uptake figure appears at the wrong stage: ${index}`);
    }
    await page.evaluate(key => localStorage.removeItem(key), glucoseKey);
    const massId = "mass-conservation";
    const massKey = `narajos.catchup.v1.10.${massId}`;
    await page.goto(lessonURL(massId, 10));
    assert.equal(await page.locator('#catchup-evidence svg[aria-label*="Two matching reactions"]').count(), 1, "mass opening lacks the gas-escape comparison");
    for (const index of [0, gcseCatchup[massId].steps.length - 1]) {
      await page.evaluate(({key, index}) => localStorage.setItem(key, JSON.stringify({step: index})), {key: massKey, index});
      await page.reload();
      const stage = page.locator(".school-current-stage");
      assert.equal(await stage.locator('svg[aria-label*="Two matching reactions"]').count(), index === 0 ? 1 : 0,
        `mass gas-escape comparison appears at the wrong stage: ${index}`);
      if (index === 0) assert((await stage.locator(".school-step-notes").textContent()).includes("Sealed before"), "mass stage lacks the original measurements");
    }
    await page.evaluate(key => localStorage.removeItem(key), massKey);
    await page.goto(lessonURL("wave-motion", 11));
    const waveNotes = page.locator(".school-current-stage .school-step-notes");
    const markerPositions = [];
    for (const name of ["Start position", "Wave moves right", "A little later"]) {
      await waveNotes.getByRole("button", {name}).click();
      const marker = waveNotes.locator("svg[role=img] circle").last();
      markerPositions.push([Number(await marker.getAttribute("cx")), Number(await marker.getAttribute("cy"))]);
    }
    assert(markerPositions.every(([x]) => x === markerPositions[0][0]), "wave marker must stay at one horizontal position");
    assert(markerPositions[1][1] < markerPositions[0][1] && markerPositions[2][1] > markerPositions[1][1], "wave marker must rise then fall");
    for (const [id, fragment, inOpening] of [
      ["density-and-gas-pressure", "Two schematic sets of impacts", true],
      ["carbon-cycling", "An organic fuel burns", false],
      ["reaction-profiles", "Two schematic energy-level comparisons", true],
      ["circuit-resistance", "A schematic lamp contains a filament", true]
    ]) {
      const key = `narajos.catchup.v1.10.${id}`;
      const diagram = `svg[aria-label*="${fragment}"]`;
      await page.goto(lessonURL(id, 10));
      assert.equal(await page.locator(`#catchup-evidence ${diagram}`).count(), inOpening ? 1 : 0, `${id}: incorrect opening figure`);
      for (const index of [1, gcseCatchup[id].steps.length - 1]) {
        await page.evaluate(({key, index}) => localStorage.setItem(key, JSON.stringify({step: index})), {key, index});
        await page.reload();
        assert.equal(await page.locator(`.school-current-stage ${diagram}`).count(), index === 1 ? 1 : 0,
          `${id}: explanatory figure appears at the wrong stage: ${index}`);
      }
      await page.evaluate(key => localStorage.removeItem(key), key);
    }
    for (const [id, fragment] of [
      ["vaccine-memory", "A vaccine safely introduces antigens"],
      ["food-web-change", "On a field grid"],
      ["reaction-rate", "a reaction produces eight cubic centimetres"],
      ["crude-oil", "One butane molecule"],
      ["chromatography", "A sample spot and a solvent front"],
      ["electromagnet-switch", "Two coils have the same current"],
      ["selection-and-variation", "Two of five symbols are dark"],
      ["amylase-endpoint", "Equal volumes of amylase and starch"],
      ["quadrat-evidence", "On a field grid"],
      ["reacting-masses", "Six magnesium atoms react with three"],
      ["temperature-evidence", "Both methods start at twenty degrees"],
      ["spring-evidence", "A spring measures eight centimetres"],
      ["trolley-evidence", "In trial A, two equal slotted masses"],
      ["wave-measurement", "A simplified top view of a ripple tank"],
      ["infrared-evidence", "Under matched conditions a matt black surface"],
      ["domestic-electricity", "A qualitative alternating-potential-difference graph"],
      ["national-grid", "The worked example transmits 24 kilowatts"],
      ["solution-concentration", "The worked example gives sample A a concentration"],
      ["current-potential-difference", "As potential difference rises, current increases"],
      ["ruler-drop", "In the illustrative trials, person A catches"],
      ["electrode-evidence", "Compare molten sodium chloride with sodium chloride dissolved in water"],
      ["dynamic-equilibrium", "At dynamic equilibrium in a closed system"],
      ["plant-transport", "Water evaporates from moist leaf cells"]
    ]) {
      const lesson = gcseCatchup[id], key = `narajos.catchup.v1.${lesson.year}.${id}`;
      const figure = `svg[aria-label*="${fragment}"]`;
      await page.goto(lessonURL(id, lesson.year));
      assert.equal(await page.locator(`#catchup-evidence ${figure}`).count(), 1, `${id}: additional opening figure missing`);
      await page.evaluate(({key, index}) => localStorage.setItem(key, JSON.stringify({step: index})), {key, index: lesson.steps.length - 1});
      await page.reload();
      assert.equal(await page.locator(`.school-current-stage ${figure}`).count(), 0, `${id}: opening figure leaked into independent assessment`);
      await page.evaluate(key => localStorage.removeItem(key), key);
    }
    // Check every custom opening in its own panel, including custom openings
    // installed outside the registry. A few investigations use a table there;
    // the original illustrated registry still requires an SVG.
    const openingIds = new Set([...Object.keys(gcseOpeningVisuals), ...Object.entries(gcseCatchup)
      .filter(([, lesson]) => lesson.visual?.[0] === "custom").map(([id]) => id)]);
    for (const id of openingIds) {
      const lesson = gcseCatchup[id];
      await page.goto(lessonURL(id, lesson.year));
      const evidence = page.locator("#catchup-evidence");
      const opening = evidence.locator(":scope > figure, :scope > div");
      if (Object.hasOwn(gcseOpeningVisuals, id))
        assert(await opening.locator("svg[role=img]").count(), `${id}: opening diagram missing`);
      else assert(await opening.locator("svg[role=img], img, table").count(), `${id}: custom opening evidence missing`);
      for (const part of await opening.all()) await checkSvgLabels(part, `${id} opening`);
      for (const svg of await opening.locator("svg[role=img]").all())
        assert((await svg.getAttribute("aria-label"))?.trim(), `${id}: opening diagram has no alternative`);
      for (const img of await opening.locator("img").all()) {
        await img.scrollIntoViewIfNeeded();
        assert((await img.getAttribute("alt"))?.trim(), `${id}: opening photograph has no alternative`);
        await page.waitForFunction(image => image.complete && image.naturalWidth > 0, await img.elementHandle());
      }
    }

    // Higher Tier teaching figures belong inside the extension, not the
    // assessment-stage panel. Worked examples need their own adjacent copy.
    for (const [id, lesson] of Object.entries(gcseCatchup)) {
      if (lesson.higherVisual) {
        await page.goto(lessonURL(id, lesson.year));
        const extension = page.locator("#catchup-evidence details").filter({has: page.locator("summary:text-is('Higher Tier')")});
        await extension.locator(":scope > summary").click();
        const diagrams = extension.locator("svg[role=img]");
        assert(await diagrams.count(), `${id}: missing Higher Tier diagram`);
        if (Array.isArray(lesson.higher)) {
          for (const diagram of await diagrams.all())
            assert.equal(await diagram.isVisible(), false, `${id}: question answer figure visible before reasoning`);
          await extension.getByText("Check your reasoning", {exact: true}).click();
        }
        if (id === "mass-conservation") {
          assert.equal(await extension.locator('svg[aria-label*="0.20 moles of magnesium need 0.10 moles of oxygen"]').count(), 1,
            "Higher Tier moles explanation must compare required and available reactants");
        }
        await checkSvgLabels(extension, `${id} Higher Tier`);
        const stageLabels = await journey.locator(".school-current-stage svg[role=img]").evaluateAll(items => items.map(item => item.getAttribute("aria-label")));
        for (const diagram of await diagrams.all()) {
          assert(await diagram.isVisible(), `${id}: Higher Tier diagram not visible in teaching context`);
          const alternative = (await diagram.getAttribute("aria-label"))?.trim();
          assert(alternative, `${id}: missing Higher Tier text alternative`);
          assert(!stageLabels.includes(alternative), `${id}: Higher Tier figure leaked into assessment stage`);
        }
      }
      if (lesson.steps[0]?.worked?.visual) {
        await page.goto(lessonURL(id, lesson.year));
        const example = page.locator(".school-current-stage .school-worked-example");
        assert(await example.locator("figure, table").count(), `${id}: missing worked-example figure`);
        await checkSvgLabels(example, `${id} worked example`);
        if (lesson.steps[0].worked.lineVisuals) {
          const items = example.locator("ol.school-worked-line-visuals > li");
          assert.equal(await items.count(), lesson.steps[0].worked.lines.length, `${id}: worked line count`);
          for (let index = 0; index < lesson.steps[0].worked.lines.length; index++) {
            const item = items.nth(index);
            const hasVisual = Boolean(lesson.steps[0].worked.lineVisuals[index]);
            assert.equal(Boolean(await item.locator("figure, table").count()), hasVisual,
              `${id} worked line ${index + 1}: incorrect adjacent visual`);
            assert.equal(await item.locator(":scope > p").textContent(), lesson.steps[0].worked.lines[index]);
            if (hasVisual) assert(await item.evaluate(node => {
              const visual = node.querySelector("figure, table");
              const explanation = node.querySelector(":scope > p");
              return Boolean(visual && explanation && (visual.compareDocumentPosition(explanation) & Node.DOCUMENT_POSITION_FOLLOWING));
            }), `${id} worked line ${index + 1}: figure should precede its explanation`);
          }
        }
        for (const img of await example.locator("img").all()) {
          await img.scrollIntoViewIfNeeded();
          assert((await img.getAttribute("alt"))?.trim(), `${id}: worked photograph has no alternative`);
          await page.waitForFunction(image => image.complete && image.naturalWidth > 0, await img.elementHandle());
        }
        if (lesson.steps[0].worked.lineVisuals) {
          const key = `narajos.catchup.v1.${lesson.year}.${id}`;
          await page.evaluate(({key, step}) => localStorage.setItem(key, JSON.stringify({step})), {key, step: lesson.steps.length - 1});
          await page.reload();
          assert.equal(await page.locator(".school-current-stage .school-worked-line-visuals").count(), 0,
            `${id}: worked figures leaked into independent practice`);
          await page.evaluate(key => localStorage.removeItem(key), key);
        }
      }
    }
    // The circuit wires must terminate at the meter and lamp outlines. A path
    // through a symbol incorrectly suggests a bypass rather than a connection.
    await page.goto(lessonURL("current-potential-difference", gcseCatchup["current-potential-difference"].year));
    const ivCircuit = page.locator('#catchup-evidence svg[role="img"][aria-label="The supply, ammeter and lamp are in the main loop. The voltmeter is on a branch connected across the two lamp terminals."]');
    assert.equal(await ivCircuit.count(), 1, "current–potential difference opening circuit");
    const wireCrossesSymbol = await ivCircuit.evaluate(svg => {
      const wire = svg.querySelector("path");
      const symbols = [...svg.querySelectorAll("circle")].filter(circle => Number(circle.getAttribute("r")) >= 13);
      if (!wire || symbols.length !== 3) return true;
      for (let distance = 0; distance <= wire.getTotalLength(); distance += .5) {
        const point = wire.getPointAtLength(distance);
        if (symbols.some(circle => Math.hypot(point.x - Number(circle.getAttribute("cx")),
          point.y - Number(circle.getAttribute("cy"))) < Number(circle.getAttribute("r")) - 1)) return true;
      }
      return false;
    });
    assert.equal(wireCrossesSymbol, false, "wires must not pass through circuit symbols");
    const independentMotionCaption = await page.evaluate(async () => {
      const {gcseCatchup} = await import("/assets/gcse-catchup-data.js");
      const question = gcseCatchup["motion-graphs"].steps.at(-1);
      return question.reference.render().querySelector("figcaption").textContent;
    });
    assert.equal(independentMotionCaption, "Velocity (m/s)",
      "the independent motion graph must not include the worked interpretation");
    for (const year of [10,11]) {
      await page.goto(base + "/science-catch-up/?year=" + year);
      const ids = Object.entries(gcseCatchup).filter(([,lesson]) => lesson.year === year).map(([id]) => id);
      await page.locator(".school-concept-list a").first().waitFor();
      for (const id of ids) {
        assert(await page.locator('.school-concept-list a[href*="topic=' + id + '&year=' + year + '"]').first().isVisible(), id);
        await page.goto(lessonURL(id, year));
        await page.getByRole("heading", {name: gcseCatchup[id].title, exact: true, level: 1}).waitFor();
        await page.goto(base + "/science-catch-up/?year=" + year);
        await page.locator(".school-concept-list a").first().waitFor();
      }
    }

    for (const [id, lesson] of Object.entries({...priorityCatchup, ...investigations})) {
      await page.goto(lessonURL(id, lesson.year));
      await journey.getByRole("heading", {name: "Worked example", exact: true}).waitFor();
      assert(await page.locator(".school-worked-example ol").last().isVisible());
      for (const [index, question] of lesson.steps.entries()) {
        await openCheck();
        assert(await dialog.getByRole("heading", {name: question.prompt, exact: true}).isVisible());
        assert(await page.locator(".school-evidence-panel").isVisible());
        if (id === "motor-effect" && index === 0) {
          assert.equal(await dialog.getByRole("button", {name: "Need a clue?"}).isVisible(), false);
          await dialog.getByText("Need help?", {exact: true}).press("Enter");
          await dialog.getByRole("button", {name: "Need a clue?"}).press("Enter");
          assert(await dialog.locator(".school-clue").isVisible());
          await page.getByRole("button", {name: "Pause check"}).press("Enter");
          const resume = journey.getByRole("button", {name: "Resume check"});
          assert(await resume.evaluate(el => el === document.activeElement));
          await resume.press("Enter");
          assert(await dialog.getByRole("heading", {name: question.prompt, exact: true}).evaluate(el => el === document.activeElement));
          assert.equal(await journey.locator(".school-current-stage .school-check-inline").count(), 1);
          assert.equal(await resume.count(), 0);
        }
        if (index === 1) assert(await dialog.locator(".school-guided-prompt").isVisible());
        if (index === 2) assert.equal(await dialog.locator(".school-guided-prompt").count(), 0);
        if (question.reference) assert(await dialog.locator(".school-question-evidence").isVisible());
        if (id === "national-grid" && index === 2) {
          await choose(question.options[0].label);
          await submit();
          assert.match(await dialog.locator('[data-verdict="incorrect"]').innerText(), /fixed power/);
          assert.equal(await result.locator("[data-learning-feedback]").count(), 0);
          await dialog.getByText("Need help?", {exact: true}).press("Enter");
          await dialog.getByRole("button", {name: "Revisit the worked example"}).press("Enter");
          assert(await page.locator("details.school-worked-example").evaluate(el => el.open && el === document.activeElement));
          await page.reload();
          await openCheck();
          assert(await dialog.getByRole("radio", {name: question.options[0].label, exact: true}).isChecked());
        }
        await choose(question.answer);
        await submit();
        const kind = id === "national-grid" && index === 2 ? "corrected" : "correct";
        const feedback = result.locator(`[data-learning-feedback="${kind}"][data-feedback-animate]`);
        assert(await feedback.isVisible());
        assert.equal(await feedback.locator("svg path").first().evaluate(el => getComputedStyle(el).animationName), "none");
        await dialog.getByRole("button", {name: /^(Continue|Finish guided checks)$/}).press("Enter");
        // The step, focus, and outcome must survive continuing and reloading.
        if (id === "motor-effect" && index < lesson.steps.length - 1) {
          assert(await journey.locator(".school-current-stage h3").evaluate(el => el === document.activeElement));
          await page.reload();
          await openCheck();
          assert(await dialog.getByRole("heading", {name: lesson.steps[index + 1].prompt, exact: true}).isVisible());
        }
      }
      if (id === "national-grid") {
        assert(await dialog.getByText("Try one more on your own", {exact: true}).isVisible());
        await choose(lesson.retry.answer);
        await submit();
        await dialog.getByRole("button", {name: "Finish guided checks"}).press("Enter");
      }
      await journey.getByRole("link", {name: "Revise " + lesson.code}).waitFor();
      assert.equal(await completion.getAttribute("data-feedback-animate"), "");
      await page.reload();
      await journey.getByRole("heading", {name: /Guided checks complete/}).waitFor();
      assert.equal(await completion.getAttribute("data-feedback-animate"), null);
      if (id === "motor-effect") {
        await journey.getByText("Review answers", {exact: true}).press("Enter");
        await journey.getByRole("button", {name: "Check 1", exact: true}).press("Enter");
        assert(await dialog.getByText(lesson.steps[0].answer, {exact: true}).isVisible());
        await dialog.getByRole("button", {name: "Close review"}).press("Enter");
        assert(await journey.getByRole("heading", {name: /Guided checks complete/}).isVisible());
      }
      const progress = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), "narajos.catchup.v1." + lesson.year + "." + id);
      assert.deepEqual(Object.values(progress.outcomes), ["supported","supported",id === "national-grid" ? "supported" : "independent"]);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), id);
    }

    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({width, height: 840});
      await page.goto(lessonURL("amylase-endpoint", 10));
      const answer = page.getByRole("spinbutton");
      if (width === 320) {
        await answer.fill("25");
        await page.getByRole("button", {name: "Check calculation"}).press("Enter");
        await page.getByText(/Use the shorter endpoint time/).waitFor();
        await page.reload();
        assert.equal(await answer.inputValue(), "25");
        await answer.fill("0.04");
        await page.getByRole("button", {name: "Check calculation"}).press("Enter");
      }
      assert(await answer.evaluate(el => el.readOnly));
      const correction = page.locator('.school-completion form [data-learning-feedback="corrected"]');
      assert(await correction.isVisible());
      assert.equal(await correction.getAttribute("data-feedback-animate"), width === 320 ? "" : null);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2));
    }
    await page.goto(lessonURL("spring-evidence", 11));
    const first = page.getByRole("textbox").first();
    await first.fill("Unloading evidence is missing.");
    assert.equal(await page.getByText(/Model explanation[.] Proportional/).count(), 0);
    await page.getByRole("button", {name:"Compare with model"}).press("Enter");
    await page.getByLabel("Your revised explanation (optional)", {exact:true}).fill("Unload the spring and compare its length with the original.");
    await page.reload();
    assert.equal(await first.inputValue(), "Unloading evidence is missing.");
    assert(await first.evaluate(el => el.readOnly));
    assert.match(await page.getByLabel("Your revised explanation (optional)").inputValue(), /Unload/);
    await page.getByRole("button",{name:"Finish self-review"}).press("Enter");
    assert.equal(await page.locator(".school-completion form [data-learning-feedback]").count(), 0);
    const transferOutcome = id => page.evaluate(key => JSON.parse(localStorage.getItem("narajos.catchup.v1." + key)).transfer20.outcome, id);
    assert.equal(await transferOutcome("11.spring-evidence"), "self-reviewed");
    assert.equal(await transferOutcome("10.amylase-endpoint"), "supported");
    const existing = gcseCatchup["inheritance-cross"];
    await page.goto(lessonURL("inheritance-cross", 11));
    await page.evaluate(({prompt, answer}) => localStorage.setItem("narajos.catchup.v1.11.inheritance-cross",
      JSON.stringify({step: 1, open: true, prompt, selected: answer, correct: true, feedback: "Saved feedback."})),
      {prompt: existing.steps[1].prompt, answer: existing.steps[1].answer});
    await page.reload();
    await openCheck();
    assert(await dialog.getByRole("radio", {name: existing.steps[1].answer, exact: true}).isChecked());
    assert(await dialog.getByRole("button", {name: "Continue", exact: true}).isVisible());
    assert(await result.locator('[data-learning-feedback="correct"]').isVisible());
    assert.equal(await result.locator("[data-feedback-animate]").count(), 0);

    for (const width of [320, 768, 1280]) {
      await page.setViewportSize({width, height: 860});
      await page.goto(lessonURL("chromatography", 11));
      await page.locator("#catchup-evidence").getByRole("img", {name: /shallow layer of solvent/}).waitFor();
      await page.addStyleTag({content: "html {font-size: 125%} p, h1, h2, h3, label {line-height: 1.6; letter-spacing: .055em}"});
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => {
        if (document.documentElement.scrollWidth <= innerWidth + 2) return [];
        return [document.documentElement.scrollWidth, ...[...document.body.querySelectorAll("*")].filter(el => el.getBoundingClientRect().right > innerWidth + 2)
          .slice(0, 10).map(el => [el.tagName, el.getAttribute("class"), Math.round(el.getBoundingClientRect().right)])];
      });
      assert.deepEqual(overflow, [], "Enlarged text at " + width);
    }
    await page.addScriptTag({content: axe.source});
    const violations = await page.evaluate(async () => (await window.axe.run({runOnly: ["wcag2a","wcag2aa"]})).violations);
    assert.deepEqual(violations.map(({id,nodes}) => [id,nodes.map(node => node.target)]), []);
    // Revision help keeps the timed hint and show-me path available from one disclosure.
    await page.clock.install();
    await page.goto(base + "/gcse/");
    await page.locator("#study-tier").selectOption("F");
    await page.goto(base + "/gcse/#lesson-b1-cells");
    const revisionHelp = page.locator("#question-help");
    assert(!(await page.locator("#dk").isVisible()));
    await revisionHelp.locator("summary").press("Enter");
    assert(await page.locator("#hint").isDisabled());
    await page.clock.fastForward("00:10");
    assert(await page.locator("#hint").isEnabled());
    await page.locator("#hint").press("Enter");
    assert(await page.locator("#hintbox").isVisible());
    await page.locator("#dk").press("Enter");
    assert(await page.locator("#fb").isVisible());
    assert(!(await revisionHelp.isVisible()));
    await page.reload();
    await page.getByText("Mitochondria", {exact: true}).click();
    await page.getByRole("button", {name: "Check", exact: true}).press("Enter");
    assert.match(await page.locator("#fb").innerText(), /Correct/);
    assert(!(await revisionHelp.isVisible()));
    assert.deepEqual(errors, []);
    console.log("GCSE catch-up: 48 routes, eighteen learning journeys, old responses, phone/tablet/desktop, enlarged text and axe passed.");
  } finally {
    await page.close();
  }
}

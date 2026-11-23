import assert from "node:assert/strict";
import { firefox, webkit } from "playwright";
import { checkHumanReliability } from "./check-human-reliability.mjs";
import { checkDrawingObservations } from "./check-drawing-observations.mjs";
import { servePublic } from "./browser-test-site.mjs";

const engine = process.argv[2];
const type = { firefox, webkit }[engine];
assert(type, "Choose firefox or webkit");
const browser = await type.launch();
const { server, base } = await servePublic();
let route = "/";
const errors = [];

try {
  await checkDrawingObservations(browser,base);
  await checkHumanReliability(browser, base, { touch: engine === "webkit" });
  const page = await browser.newPage({
    viewport: { width: 320, height: 780 },
    hasTouch: true,
    isMobile: engine === "webkit"
  });
  page.setDefaultTimeout(12000);
  page.on("pageerror", error => errors.push(route + " " + error.message));
  await page.addInitScript(() => { Object.groupBy = undefined; });

  async function open(path) {
    route = path;
    const response = await page.goto(base + path, { waitUntil: "load" });
    assert(response?.ok(), path + " failed to load");
  }

  async function fits() {
    const overflow = await page.evaluate(() => {
      const excess = document.documentElement.scrollWidth - innerWidth;
      if (excess <= 3) return { excess, elements: [] };
      const elements = [...document.querySelectorAll("body *")]
        .filter(element => element.getBoundingClientRect().right > innerWidth + 3 &&
          !element.parentElement?.closest(".kc-visual-art"))
        .slice(0, 8).map(element => [element.tagName, element.className, Math.round(element.getBoundingClientRect().right)]);
      return { excess, elements };
    });
    assert(overflow.excess <= 3, route + " exceeds the viewport in " + engine + ": " + JSON.stringify(overflow));
  }

  await open("/");
  const menu = page.getByRole("navigation", { name: "Main navigation" }).locator("summary").first();
  await menu.press("Enter");
  await page.getByRole("group", { name: "By qualification" }).getByRole("link", { name: /A-level Biology/ }).waitFor();
  await fits();
  await page.getByRole("group", { name: "Catch up by year" }).getByRole("link", { name: "Year 9", exact: true }).click();
  await page.getByRole("heading", { name: "Year 9 Science", exact: true }).waitFor();
  const currentYear = page.getByRole("navigation", { name: "Choose a year group" }).locator('[aria-current="page"]');
  assert.equal(await currentYear.textContent(), "Year 9");
  await page.getByRole("link", { name: "Osmosis", exact: true }).click();
  const lesson = page.locator(".school-journey");
  await lesson.getByRole("button", { name: "Check", exact: true }).click();
  const dialog = lesson.getByRole("dialog");
  await dialog.getByRole("button", { name: "Need a clue?", exact: true }).press("Enter");
  await dialog.getByRole("button", { name: "I don’t know — explain it", exact: true }).click();
  await dialog.getByRole("heading", { name: "Explanation", exact: true }).waitFor();
  await dialog.getByRole("button", { name: "Save and pause", exact: true }).click();
  await page.reload();
  await lesson.getByRole("button", { name: "Resume check", exact: true }).click();
  await dialog.getByRole("heading", { name: "Explanation", exact: true }).waitFor();
  await dialog.getByRole("button", { name: "Continue", exact: true }).click();
  await lesson.getByRole("status").filter({ hasText: "Step 2 of 4" }).waitFor();
  await fits();

  await open("/gcse/");
  const gcseSearch = page.getByRole("searchbox", { name: "Topic or keyword" });
  await gcseSearch.fill("organisation");
  await page.getByRole("link", { name: "Learn and practise: Organisation", exact: true }).click();
  await page.getByRole("heading", { name: /Organisation/, level: 1 }).waitFor();
  await fits();

  await open("/alevel/#catchup-a1-enzfactors");
  const diagram = page.locator(".kc-visual-art");
  await diagram.locator("svg").waitFor({ state: "visible" });
  assert(await diagram.evaluate(el => el.scrollWidth > el.clientWidth), "A large diagram should scroll inside its panel");
  assert(await page.locator(".kc-simulation-link").count() > 0);
  await fits();

  await open("/alevel/?exam-check=1#exam-osmosis");
  await page.getByRole("button", { name: "Go straight to questions", exact: true }).press("Enter");
  const numeric = page.locator(".al-practice input[name=number]");
  await numeric.fill("−500");
  await page.getByRole("button", { name: "Check answer", exact: true }).press("Enter");
  await page.reload();
  assert.equal(await numeric.inputValue(), "−500");
  assert.match(await page.locator(".al-practice [role=status]").innerText(), /Independently correct/);
  assert(await page.getByRole("button", { name: "Next task", exact: true }).isVisible());
  await fits();

  await open("/human-biology/#catchup/f170/3.2.1");
  await page.locator("[data-hb-model-step] > summary").click();
  await page.getByText("Trace a withdrawal reflex", { exact: true }).click();
  const reflex = page.locator('science-sequence[kind="reflex"]');
  await reflex.getByRole("button", { name: "Next step" }).click();
  assert((await reflex.getByRole("status").innerText()).trim());
  await fits();

  await open("/human-biology/?pilot=meiosis#catchup/f170/1.1.5.meiosis");
  const meioticTask = page.locator('[data-hb-stage="independent"]');
  await meioticTask.locator("summary").press("Enter");
  const fields = meioticTask.getByRole("img", {name:/Two unlabelled stages/});
  assert.equal(await fields.getAttribute("src"), "/human-biology/division-fields.svg");
  const visibleDiagram = await fields.evaluate(async img => {
    await img.decode();
    const {width,height} = img.getBoundingClientRect();
    return {width,height,decoded:img.complete && img.naturalWidth>0 && img.naturalHeight>0};
  });
  assert(visibleDiagram.decoded && visibleDiagram.width>0 && visibleDiagram.height>0, JSON.stringify(visibleDiagram));
  assert(Math.abs(visibleDiagram.width/visibleDiagram.height - 360/298)<0.02, "Meiotic fields must retain their aspect ratio");
  await meioticTask.getByRole("textbox").fill("Field A has doubled structures at each pole.");
  await meioticTask.getByRole("button", {name:"Compare my explanation"}).press("Enter");
  assert(await fields.isVisible());
  assert(await meioticTask.getByRole("heading", {name:"Model explanation"}).isVisible());
  await fits();

  await open("/human-biology/?pilot=screening#catchup/f171/4.2.1");
  await page.getByRole("button", { name: "See worked example", exact: true }).press("Enter");
  const screening = page.locator("[data-hb-model-step]");
  await screening.getByRole("button", { name: "Show next step", exact: true }).press("Enter");
  assert.equal(await screening.locator(".hb-cell-focus").innerText(), "12");
  await page.locator('[data-hb-stage="independent"] summary').press("Enter");
  const response = page.locator('[data-hb-stage="independent"]');
  await response.getByRole("radio", { name: /7 of 24/ }).check();
  await response.getByRole("button", { name: "Check answer", exact: true }).press("Enter");
  assert.match(await response.getByRole("status").innerText(), /Correct independently/);
  assert(await response.getByRole("button", { name: "Check answer", exact: true }).isHidden());
  await fits();

  await page.emulateMedia({ reducedMotion: "reduce" });
  await open("/human-biology/#catchup/f175/a1?stage=follicle");
  const model = page.locator("#krp-model");
  await model.getByRole("radio", { name: "The ovarian follicle." }).check();
  await model.getByRole("button", { name: "Check prediction" }).press("Enter");
  await model.getByRole("button", { name: /FSH Develop/ }).press("Enter");
  assert.match(await model.locator(".krp-observation").innerText(), /follicle enlarges/);
  await model.getByRole("button", { name: "Next checkpoint" }).press("Enter");
  assert.equal(await model.getByLabel("Revisit a stage").inputValue(), "ovulation");
  await fits();
  await page.emulateMedia({ reducedMotion: "no-preference" });

  await open("/teaching/focused-writing/ks3/");
  const writing = page.locator('[data-writing-exercise="dye"][data-writing-kind="short"]');
  await writing.getByRole("textbox").fill("The dye spread further because its particles moved faster.");
  await writing.getByRole("button", { name: "Check my sentence", exact: true }).click();
  await writing.getByRole("status").filter({ hasText: "Possible reasoning link" }).waitFor();
  await page.reload();
  assert.match(await writing.getByRole("textbox").inputValue(), /particles moved faster/);
  await fits();

  await open("/teacher/");
  await page.getByRole("button", { name: "Year 9", exact: true }).click();
  const topic = page.locator("#lesson");
  await topic.selectOption({ index: 2 });
  const start = page.getByRole("button", { name: "Start Do Now", exact: true });
  assert(await start.isEnabled());
  const selectedTopic = await topic.inputValue();
  const question = await page.locator("#qlist .txt").first().textContent();
  await page.reload();
  assert.equal(await topic.inputValue(), selectedTopic);
  assert.equal(await page.locator("#qlist .txt").first().textContent(), question);
  await start.click();
  const slides = page.getByRole("dialog", { name: "Present" });
  await slides.getByRole("button", { name: "Go to answers", exact: true }).click();
  await slides.getByRole("button", { name: "3, 2, 1, show me", exact: true }).waitFor();
  await page.keyboard.press("Escape");
  await fits();

  await open("/teaching/simulations/enzyme-kinetics/?activity=gcse");
  const controls = page.getByRole("group", { name: "Simulation controls" });
  await controls.getByRole("button", { name: "Start", exact: true }).click();
  await controls.getByRole("button", { name: "Pause", exact: true }).click();
  await page.getByRole("link", { name: "Return to the follow-up question", exact: true }).click();
  await page.waitForURL("**/teaching/enzyme-investigations/gcse/#follow-up");
  await page.locator("#follow-up").waitFor({ state: "visible" });
  await fits();

  assert.deepEqual(errors, [], "Browser errors in " + engine);
  console.log(engine + " passed the representative Narajos flows at 320px.");
} finally {
  await browser.close();
  await new Promise(done => server.close(done));
}

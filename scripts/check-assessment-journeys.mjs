import assert from "node:assert/strict";

export async function checkAssessmentJourneys(browser,base) {
  const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true});
  // These functional checks navigate away from active practice and deliberately reload drafts.
  context.on("page",tab=>tab.on("dialog",dialog=>dialog.type()==="beforeunload"?dialog.accept():dialog.dismiss()));
  await context.route(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\//,route=>route.abort());
  let page=await context.newPage();
  const open=path=>page.goto(base+path,{waitUntil:"domcontentloaded"});
  const reload=()=>page.reload({waitUntil:"domcontentloaded"});
  const reveal=async()=>{
    const help=page.locator("#qhelp");
    if(await help.count() && !(await help.evaluate(el=>el.open))) await help.locator("summary").click();
    await page.locator("#idk").click();
  };
  try {
    // Exercise the normal mobile entry and the authored application questions.
    // Test-hook jumps only locate the later questions; all responses are synthetic.
    const food=await context.newPage();
    await food.addInitScript(()=>{window.name="kstest";});
    await food.goto(base+"/gcse/#lesson-b2-foodtests",{waitUntil:"domcontentloaded"});
    const teaching=food.getByRole("heading",{name:"Learn the method",exact:true});
    const practice=food.getByRole("heading",{name:"Practise the method",exact:true});
    assert(await teaching.isVisible());
    assert(await practice.isVisible());
    const table=food.locator("table");
    assert.equal(await table.count(),1);
    assert.equal(await table.locator("tbody tr").count(),4);
    const teachingText=await table.innerText();
    assert.match(teachingText,/Benedict/i);
    assert.match(teachingText,/reducing sugar/i);
    assert.match(teachingText,/iodine/i);
    assert.match(teachingText,/biuret/i);
    assert.match(teachingText,/lipid/i);
    assert.match(teachingText,/water bath/i);
    assert.match(teachingText,/blue-black/i);
    assert.match(teachingText,/purple/i);
    assert.match(teachingText,/ethanol[\s\S]*water[\s\S]*cloudy white/i);
    assert.match(await food.locator("main").innerText(),/non-reducing sugar/i);
    assert.match(await food.locator("main").innerText(),/control/i);
    assert.equal(await food.getByRole("heading",{name:"Worked example",exact:true}).count(),0);
    for(const width of [390,320]){
      await food.setViewportSize({width,height:844});
      const layout=await food.evaluate(()=>({
        overflow:document.documentElement.scrollWidth-innerWidth,
        practiceTop:document.querySelector('#qf').getBoundingClientRect().top,
        headingBottom:[...document.querySelectorAll('h2')].find(el=>el.textContent.trim()==='Practise the method').getBoundingClientRect().bottom,
        actionsPosition:getComputedStyle(document.querySelector('#qf .actions')).position,
        height:document.documentElement.scrollHeight,
        viewport:innerHeight
      }));
      assert(layout.overflow<=3,`food lesson overflows at ${width}px`);
      assert(layout.practiceTop>=layout.headingBottom && layout.practiceTop-layout.headingBottom<=120,`practice heading is detached from the first question at ${width}px`);
      assert(layout.practiceTop<(width===320?900:730),`the first question is too far below the teaching at ${width}px`);
      assert.equal(layout.actionsPosition,"static",`the initial action bar may cover the question at ${width}px`);
      assert(layout.height>layout.viewport,"mobile lesson should scroll to reach the question");
      const scrolled=await food.evaluate(()=>{window.scrollTo(0,document.documentElement.scrollHeight);return window.scrollY;});
      assert(scrolled>0,`food lesson cannot scroll at ${width}px`);
      await food.evaluate(()=>window.scrollTo(0,0));
    }
    const screenshot=await food.screenshot({fullPage:true});
    assert(screenshot.length>1000,"mobile food lesson screenshot is empty");
    await food.getByText("To compare colours with a test that has no reducing sugar in it",{exact:true}).click();
    await food.locator("#act").click();
    assert.match(await food.locator("#fb").innerText(),/Correct!/);
    await food.locator("#act").click();
    assert.equal(await food.getByRole("heading",{name:"Worked example",exact:true}).count(),0);

    await food.evaluate(()=>window.__k.ev('L.i=L.queue.findIndex(q=>q.q.includes("A sample stays blue after a Benedict"));L.phase="q";showQ()'));
    const worked=food.getByRole("heading",{name:"Worked example",exact:true});
    assert(await worked.isVisible());
    assert.match(await food.locator(".food-worked").innerText(),/drink heated with Benedict’s turns green[\s\S]*reducing sugar was detected/i);
    assert.match(await food.locator("#qf legend").innerText(),/A sample stays blue after a Benedict/);
    assert(await worked.evaluate(el=>Boolean(el.compareDocumentPosition(document.querySelector("#qf")) & Node.DOCUMENT_POSITION_FOLLOWING)));
    await food.getByText("No reducing sugar was detected in the sample",{exact:true}).click();
    await food.locator("#act").click();
    await food.getByText("The controls behaved as expected, but Benedict’s does not detect every sugar",{exact:true}).click();
    await food.locator("#act").click();
    assert.match(await food.locator("#fb").innerText(),/Correct!/);

    await food.evaluate(()=>window.__k.ev('L.i=L.queue.findIndex(q=>q.q.includes("A food sample turns iodine"));L.phase="q";showQ()'));
    assert.equal(await worked.count(),0);
    await food.getByText("Both starch and reducing sugar detected",{exact:true}).click();
    await food.locator("#act").click();
    assert.match(await food.locator("#fb").innerText(),/does not rule out non-reducing sugars/);
    await food.evaluate(()=>window.__k.ev('L.i=L.queue.findIndex(q=>q.q.includes("known glucose solution, tested"));L.phase="q";showQ()'));
    assert.equal(await worked.count(),0);
    const foodDraft="The result is inconclusive because the glucose control failed.";
    await food.locator("#sa").fill(foodDraft);
    await food.locator("#act").click();
    assert.match(await food.locator("#ms").innerText(),/positive colour change/);
    await food.locator('input[name="mk"]').first().check();
    await food.getByLabel("Improve your answer (optional)").fill("Repeat with fresh reagent and positive and negative controls.");
    await food.locator("#act").click();
    assert.match(await food.locator("#fb").innerText(),/Written response self-reviewed/);
    assert.doesNotMatch(await food.locator("#fb").innerText(),/Correct!/);
    assert.equal(await food.locator("#sa").inputValue(),foodDraft);
    await food.close();

    await open("/gcse/#lesson-b1-micro2");
    const number=page.locator("#numin"), check=page.locator("#act");
    await number.fill("0.1 kg");
    await check.click();
    assert.match(await page.locator("#msg").innerText(),/Check the unit/);
    await number.fill("100 µm");
    await check.click();
    assert.match(await page.locator("#fb").innerText(),/Correct!/);

    await open("/alevel/#lesson-p3w-epara");
    await page.locator("#go").click();
    let selfReviews=0, reveals=0;
    for(let i=0;i<60 && await page.locator("#qf,#rtgo").count();i++){
      if(await page.locator("#rtgo").isVisible()){await page.locator("#rtgo").click();continue;}
      if(await page.locator("#fb").isVisible()){await check.click();continue;}
      if(await page.locator("#sa").count()){
        const original="I cannot explain this yet.";
        await page.locator("#sa").fill(original);
        await check.click();
        for(const point of await page.locator("input[name=mk]").all())await point.check();
        await page.getByLabel("Improve your answer (optional)").fill("My revised explanation.");
        assert.equal(await page.locator("#sa").inputValue(),original);
        const saved=await page.evaluate(()=>Object.values(JSON.parse(sessionStorage.getItem("narajos-lesson-writing-v1:"+location.pathname+location.hash))));
        assert(saved.some(record=>record.original===original && record.revision==="My revised explanation." && record.points.length));
        if(selfReviews===0){
          const prompt=await page.locator("legend").last().innerText();
          await reload();
          await page.locator("#go").click();
          for(let step=0;step<12 && !await page.locator("#sa").count();step++){
            if(await page.locator("#rtgo").isVisible())await page.locator("#rtgo").click();
            else if(await page.locator("#fb").isVisible())await check.click();
            else await reveal();
          }
          assert.equal(await page.locator("legend").last().innerText(),prompt);
          assert.equal(await page.locator("#sa").inputValue(),original);
          assert(await page.locator("#sa").evaluate(el=>el.readOnly));
          await check.click();
          assert.equal(await page.getByLabel("Improve your answer (optional)").inputValue(),"My revised explanation.");
          assert.equal(await page.locator('input[name=mk]:checked').count(),await page.locator('input[name=mk]').count());
        }

        await check.click();
        assert.match(await page.locator("#fb").innerText(),/Written response self-reviewed/);
        selfReviews++;
      }else{
        await reveal();
        reveals++;
      }
    }
    assert(selfReviews>0&&reveals>0);
    assert.match(await page.locator("main").innerText(),/0 of [1-9]\d* objective first-attempt score without help/i);
    assert.match(await page.locator("main").innerText(),new RegExp("Written responses self-reviewed: "+selfReviews));
    assert.equal(await page.getByRole("heading",{name:"Independent practice passed"}).count(),0);

    for(const [course,route,storage] of [["gcse","cards-b1","narajos-gcse-fc-active-v1"],["alevel","spaced-new","narajos-alevel-spaced-active-v1"]]){
      page=await context.newPage();
      if(course==="gcse"){
        await open("/gcse/#flashcards");
        await page.locator("#kr-typed").check();
      }
      await open("/"+course+"/#"+route);
      const draft=page.locator("#kr-input");
      await draft.waitFor({state:"visible"});
      const id=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).queue[0],storage);
      await draft.fill("my first draft");
      await reload();
      assert.equal(await draft.inputValue(),"my first draft");
      await page.locator("#kr-reveal").tap();
      // Open the saved set from a fresh tab as a pupil can after closing the browser.
      // Then test a real reload without a pending native leave-confirmation dialog.
      const oldTab=page;
      page=await context.newPage();
      await open("/"+course+"/#"+route);
      await page.locator("#kr-result").waitFor({state:"visible"});
      await oldTab.close();
      await reload();
      await page.locator("#kr-result").waitFor({state:"visible"});
      const resumedDraft=page.locator("#kr-input");
      assert.equal(await resumedDraft.inputValue(),"my first draft");
      assert(await resumedDraft.evaluate(el=>el.readOnly));
      await page.getByRole("button",{name:"Finish as reviewed"}).press("Enter");
      const matchedId=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).queue[0],storage);
      await resumedDraft.fill(await page.locator(".kr-answer").textContent());
      await resumedDraft.press("Enter");
      await page.getByRole("button",{name:"Record typed match"}).press("Enter");
      const recalledId=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).queue[0],storage);
      await page.locator("#kr-reveal").tap();
      await page.getByRole("button",{name:"I recalled it before revealing"}).tap();
      const state=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),storage);
      assert.equal(state.firstEvidence[id],"revealed");
      assert.equal(state.firstEvidence[matchedId],"matched");
      assert.equal(state.firstEvidence[recalledId],"self-rated");
      const history=await page.evaluate(course=>window.KeystoneReview.open(course==="gcse"?"gcse-trilogy-8464":"aqa-alevel-biology-7402").snapshot(),course);
      assert.equal(history[id].evidence.revealed,1);assert.equal(history[id].again,0);
      assert.equal(history[matchedId].evidence.matched,1);
      assert.equal(history[recalledId].evidence["self-rated"],1);
    }
    console.log("Lesson scoring and flashcard draft, reveal, retry and recall evidence verified.");
  }finally{await context.close();}
}

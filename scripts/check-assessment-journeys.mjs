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
    // The food-test lesson starts with teaching in the existing question view.
    // Jump to authored application questions via the existing test hook after
    // checking normal entry; responses are synthetic and are never uploaded.
    const food=await context.newPage();
    await food.addInitScript(()=>{window.name="kstest";});
    await food.goto(base+"/gcse/#lesson-b2-foodtests",{waitUntil:"domcontentloaded"});
    assert(await food.getByRole("heading",{name:"Food tests: learn the method"}).isVisible());
    assert.match(await food.locator(".key").innerText(),/Worked example:[\s\S]*non-reducing sugars/);
    assert((await food.evaluate(()=>document.documentElement.scrollWidth-innerWidth))<=3);
    await food.evaluate(()=>window.__k.ev('L.i=L.queue.findIndex(q=>q.q.includes("A food sample turns iodine"));L.phase="q";showQ()'));
    await food.getByText("Both starch and reducing sugar detected",{exact:true}).click();
    await food.locator("#act").click();
    assert.match(await food.locator("#fb").innerText(),/does not rule out non-reducing sugars/);
    await food.evaluate(()=>window.__k.ev('L.i=L.queue.findIndex(q=>q.q.includes("known glucose solution, tested"));L.phase="q";showQ()'));
    assert.equal(await food.getByRole("heading",{name:"Food tests: learn the method"}).count(),0);
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

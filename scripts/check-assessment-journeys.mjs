import assert from "node:assert/strict";

export async function checkAssessmentJourneys(browser,base) {
  const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true});
  try {
    await page.goto(base+"/gcse/#lesson-b1-micro2");
    const number=page.locator("#numin"), check=page.locator("#act");
    await number.fill("0.1 kg");
    await check.click();
    assert.match(await page.locator("#msg").innerText(),/Check the unit/);
    await number.fill("100 µm");
    await check.click();
    assert.match(await page.locator("#fb").innerText(),/Correct after feedback/);

    await page.goto(base+"/alevel/#lesson-p3w-epara");
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
          await page.reload();
          await page.locator("#go").click();
          for(let step=0;step<12 && !await page.locator("#sa").count();step++){
            if(await page.locator("#rtgo").isVisible())await page.locator("#rtgo").click();
            else if(await page.locator("#fb").isVisible())await check.click();
            else await page.locator("#idk").click();
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
        await page.locator("#idk").click();
        reveals++;
      }
    }
    assert(selfReviews>0&&reveals>0);
    assert.match(await page.locator("main").innerText(),/0 of [1-9]\d* objective answers correct independently/);
    assert.match(await page.locator("main").innerText(),new RegExp("Written responses self-reviewed: "+selfReviews));
    assert.equal(await page.getByRole("heading",{name:"Independent practice passed"}).count(),0);

    for(const [course,route,storage] of [["gcse","cards-b1","narajos-gcse-fc-active-v1"],["alevel","spaced-new","narajos-alevel-spaced-active-v1"]]){
      if(course==="gcse"){
        await page.goto(base+"/gcse/#flashcards");
        await page.locator("#kr-typed").check();
      }
      await page.goto(base+"/"+course+"/#"+route);
      const draft=page.locator("#kr-input"), expected=page.locator(".kr-answer");
      const id=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).queue[0],storage);
      await draft.fill("my first draft");
      await page.reload();
      assert.equal(await draft.inputValue(),"my first draft");
      await page.locator("#kr-reveal").tap();
      await page.reload();
      assert(await page.locator("#kr-result").isVisible());
      assert(await draft.evaluate(el=>el.readOnly));
      await page.getByRole("button",{name:"Finish as reviewed"}).press("Enter");
      const matchedId=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).queue[0],storage);
      await draft.fill(await expected.textContent());
      await draft.press("Enter");
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
  }finally{await page.close();}
}

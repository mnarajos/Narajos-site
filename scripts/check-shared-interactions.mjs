import assert from "node:assert/strict";

async function fits(page, activity) {
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), activity + " overflows the page");
}

// Exercise the published routes with the same controls a student uses. Only the
// guided completion is seeded here. The GCSE/KS3 suites traverse the teaching.
export async function checkStudentJourney(page, base, touch = false) {
  const activate = control => touch ? control.tap() : control.press("Enter");
  await page.goto(base + "/teaching/focused-writing/gcse/");
  await activate(page.getByRole("button",{name:"Write my response"}));
  const draft = page.locator("#gcse-paragraph");
  assert(await draft.evaluate(node => node === document.activeElement));
  const check = page.getByRole("button",{name:"Check my paragraph"});
  await activate(check);
  await page.getByText("Write a draft before checking it.",{exact:true}).waitFor();
  await draft.fill("The potato lost mass in dilute solution.");
  await activate(check);
  const first = await draft.inputValue();
  await draft.fill("Water enters the potato cells by osmosis through partially permeable membranes.");
  await page.reload();
  await activate(page.getByRole("button",{name:"Write my response"}));
  await activate(page.getByText("Compare first and current versions",{exact:true}));
  const versions = page.locator("details").filter({has:page.getByText("First version",{exact:true})}).last();
  assert.match(await versions.innerText(),/Water enters/);
  assert((await versions.innerText()).includes(first));
  await activate(page.getByText("Plan your paragraph",{exact:true}));
  await page.getByLabel("Topic sentence:",{exact:true}).fill("The potato gained mass.");
  await activate(page.getByText("Develop your supporting sentences",{exact:true}));
  await page.getByLabel("Supporting sentence 1",{exact:true}).fill("Water entered its cells by osmosis.");
  await activate(page.getByRole("button",{name:"Assemble my paragraph"}));
  assert.match(await page.getByLabel("Reassembled version to compare").inputValue(),/gained mass.*by osmosis/);
  assert.match(await draft.inputValue(),/partially permeable/);
  await fits(page,"writing");

  await page.goto(base + "/teaching/focused-writing/order/");
  const order = page.locator('[data-writing-order="sandstone"]');
  const choices = order.locator(".paragraph-bank");
  for (const opening of [/^Sand grains/,/^This sandstone/,/^The weight/,/^Minerals/,/^Deposition/])
    await activate(choices.getByRole("button",{name:opening}));
  await activate(order.getByRole("button",{name:"Check order"}));
  assert.match(await order.locator("[data-order-review]").innerText(), /topic sentence/);
  const slots=order.locator("[data-order-position] button");
  await activate(slots.nth(0));
  assert.equal(await slots.nth(0).getAttribute("aria-pressed"),"true");
  await activate(slots.nth(1));
  await activate(order.getByRole("button",{name:"Check order"}));
  await page.reload();
  assert.match(await order.locator(".writing-order-feedback").innerText(), /Correct. You used feedback/);
  await fits(page,"sentence order");

  await page.goto(base + "/ks3/lesson/?topic=separating-techniques");
  const sequence=page.locator("[data-separation-order]");
  for(const [pos,id] of [1,0,2,3].entries()) {
    await activate(sequence.locator('[data-order-card="'+id+'"]'));
    await activate(sequence.locator("[data-order-position]").nth(pos).locator("[data-order-place]"));
  }
  await activate(sequence.getByRole("button",{name:"Check order"}));
  assert.match(await sequence.locator(".writing-order-feedback").innerText(), /Review step 1/i);
  await page.reload();
  await activate(sequence.locator('[data-order-card="0"]'));
  await activate(sequence.locator("[data-order-position]").first().locator("[data-order-place]"));
  await activate(sequence.getByRole("button",{name:"Check order"}));
  assert.match(await sequence.locator(".writing-order-feedback").innerText(),/Correct. You used feedback/);

  const labels=page.locator('diagram-practice[topic="filtration"] .dp-question').first();
  await activate(labels.locator("summary"));
  const inspect=labels.getByRole("button",{name:"Enlarge diagram"});
  await activate(inspect);
  const dialog=labels.getByRole("dialog");
  const pane=dialog.getByRole("region");
  assert(await pane.evaluate(el=>el===document.activeElement));
  const aligned=await dialog.locator(".dp-stage").evaluate(stage=>{
    const lines=[...stage.querySelectorAll("line")], markers=[...stage.querySelectorAll(".dp-marker")];
    return lines.length===markers.length && markers.every((node,i)=>{
      const rect=node.getBoundingClientRect(), line=lines[i];
      const p=new DOMPoint(line.x1.baseVal.value,line.y1.baseVal.value).matrixTransform(line.getScreenCTM());
      return Math.hypot(rect.x+rect.width/2-p.x,rect.y+rect.height/2-p.y)<3;
    });
  });
  assert(aligned,"Marker centres must still meet their leader lines");
  if (await pane.evaluate(el=>el.scrollWidth>el.clientWidth+3)) {
    await pane.press("ArrowRight");
    await page.waitForFunction(()=>document.querySelector(".dp-pan").scrollLeft>0);
  }
  const place=async(scope,name,key)=>{
    await activate(scope.getByRole("button",{name,exact:true}));
    await activate(scope.getByRole("button",{name:new RegExp("^"+key+"[.]")}));
  };
  await place(dialog,"Residue","A");
  await place(dialog,"Filter paper","B");
  await place(dialog,"Filtrate","C");
  await activate(dialog.getByRole("button",{name:"Check answer"}));
  assert.match(await dialog.getByRole("status").innerText(),/1 of 3 correct.*A, B.*Residue/);
  await activate(dialog.getByRole("button",{name:"Close enlarged diagram"}));
  assert(await inspect.evaluate(el=>el===document.activeElement));
  await page.reload();
  await activate(labels.locator("summary"));
  assert.match(await labels.locator(".dp-placements").innerText(),/C · Filtrate/);
  await place(labels,"Filter paper","A");
  await activate(labels.getByRole("button",{name:"Check answer"}));
  assert.match(await labels.getByRole("status").innerText(),/All labels correct after feedback/);
  await fits(page,"diagram");

  const steps = page.locator("diagram-practice .dp-question").filter({has:page.locator(".dp-order")});
  await activate(steps.locator(":scope > summary"));
  const stepChoice = id => steps.locator('[data-item="'+id+'"]');
  const numberOfSteps = await steps.locator("[data-item]").count();
  await activate(stepChoice(1));
  await activate(stepChoice(0));
  for (let i=2; i<numberOfSteps; i++) await activate(stepChoice(i));
  await activate(steps.getByRole("button",{name:"Check answer"}));
  assert.match(await steps.getByRole("status").innerText(), /Recheck step 1/);
  await activate(steps.getByRole("button",{name:"Later · step 1",exact:true}));
  await activate(steps.getByRole("button",{name:"Remove · step "+numberOfSteps,exact:true}));
  await page.reload();
  await activate(steps.locator(":scope > summary"));
  assert.equal(await steps.locator(".dp-order li").count(),numberOfSteps-1);
  await activate(stepChoice(numberOfSteps-1));
  await activate(steps.getByRole("button",{name:"Check answer"}));
  assert.match(await steps.getByRole("status").innerText(), /Correct after a retry/);
  await activate(steps.getByText("Order options",{exact:true}));
  await activate(steps.getByRole("button",{name:"Start order again"}));
  assert.equal(await steps.locator(".dp-order li").count(),0);
  await fits(page,"step correction");

  const route = "/science-catch-up/lesson/?topic=amylase-endpoint&year=10";
  const key = "narajos.catchup.v1.10.amylase-endpoint";
  await page.goto(base + route);
  await page.evaluate(key=>localStorage.setItem(key,JSON.stringify({step:2,done:true,outcomes:{0:"explained",1:"supported",2:"independent"}})),key);
  await page.reload();
  await page.getByRole("heading",{name:"Guided checks complete"}).waitFor();
  await page.getByRole("heading",{name:"Independent application"}).waitFor();
  const answer=page.getByRole("spinbutton");
  await answer.fill("25");
  await activate(page.getByRole("button",{name:"Check calculation"}));
  await page.goto(base + "/science-catch-up/?year=10");
  const resume=page.locator(".school-continue");
  assert.match(await resume.innerText(),/Application in progress/);
  await activate(resume.getByRole("link",{name:"Resume",exact:true}));
  assert.equal(await answer.inputValue(),"25");
  await answer.fill("0.04");
  await activate(page.getByRole("button",{name:"Check calculation"}));
  await page.getByText("Calculation correct after support",{exact:true}).waitFor();
  assert.equal(await page.getByRole("button",{name:"Check calculation"}).count(),0);
  const saved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
  assert.deepEqual(saved.outcomes,{0:"explained",1:"supported",2:"independent"});
  assert.equal(saved.transfer20.firstAttempt,"25");
  assert.equal(saved.transfer20.outcome,"supported");
  await fits(page,"catch-up application");

  const writingKey = "narajos.catchup.v1.11.spring-evidence";
  await page.evaluate(key=>localStorage.setItem(key,JSON.stringify({done:true,step:2})),writingKey);
  await page.goto(base+"/science-catch-up/lesson/?topic=spring-evidence&year=11");
  const written = page.locator("#catchup-transfer-answer");
  const firstClaim = "The final point proves permanent deformation.";
  await written.fill(firstClaim);
  assert.equal(await page.getByText(/^Model explanation[.]/).count(),0);
  await activate(page.getByRole("button",{name:"Compare with model"}));
  await page.getByText(/^Model explanation[.].*12 mm/).waitFor();
  assert(await written.evaluate(node=>node.readOnly));
  await page.getByLabel("Your revised explanation (optional)").fill("The proportional prediction was 12 mm. Unload the spring and compare its length with its original length.");
  await activate(page.getByRole("button",{name:"Finish self-review"}));
  await page.reload();
  assert.equal(await written.inputValue(),firstClaim);
  assert.match(await page.getByLabel("Your revised explanation (optional)").inputValue(),/Unload the spring/);
  await page.getByText("Written response self-reviewed",{exact:true}).waitFor();
  assert.equal(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).transfer20.outcome,writingKey),"self-reviewed");
}

export async function checkSharedInteractions(browser,base,allWidths=false) {
  const widths=allWidths?[[320,700],[390,844],[667,375],[768,1024],[1280,850],[390,844,150]]:[[390,844]];
  for(const [width,height,textSize] of widths){
    const touch=width<1000 && !textSize;
    const page=await browser.newPage({viewport:{width,height},hasTouch:touch});
    try{
      page.setDefaultTimeout(12000);
      if(textSize)await page.addInitScript(size=>document.addEventListener("DOMContentLoaded",()=>document.documentElement.style.fontSize=size+"%"),textSize);
      await checkStudentJourney(page,base,touch);
    }finally{await page.close();}
  }
}

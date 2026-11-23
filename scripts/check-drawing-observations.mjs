import assert from "node:assert/strict";

// Native photo coordinates read from the source fields independently of the SVG paths.
// Boundary tolerances allow the line width and indistinct edges in a micrograph.
const landmarks = {
  epidermis: [["wall",320,107,5],["wall",416,276,5],["wall",279,171,5]],
  privet: [["upper",510,136,5],["epidermis",508,157,6],["lower",505,491,6],["bundle",626,277,7]],
  buttercup: [["surface",413,28,6],["cylinder",419,328,6],["xylem",392,346,6]],
  arterial: [["band",322,130,5],["lumen",319,150,4],["lumen",359,197,4]],
  buccal: [["outline",370,164,5],["outline",460,318,5],["nucleus",416,239,3]],
  redcell: [["edge",309,215,4],["edge",332,224,4],["edge",316,258,4]]
};
const alterations = {
  "epidermis.leader":["label"],"epidermis.bar":["bar"],
  "privet.band":["epidermis"],"privet.cells":["partitions"],
  "buttercup.core":["cylinder"],"buttercup.xylem":["xylem"],
  "arterial.rim":["lumen"],"arterial.hatch-tip":["hatch","label"],
  "buccal.nucleus-size":["label","nucleus"],"buccal.sketch":["retrace"],
  "redcell.interior":["inner"],"redcell.bar":["bar"]
};

export async function checkDrawingObservations(browser,base,axeSource) {
  const page = await browser.newPage({viewport:{width:390,height:800},hasTouch:true});
  const url = base + "/alevel/#exam-drawings";
  const key = "keystone.alevel.exam-skills.v1";
  try {
    await page.goto(url);
    await page.waitForFunction(() => window.ALevelDrawingBank?.version === 2);
    const failures = await page.evaluate(async ({landmarks,alterations}) => {
      const bank = window.ALevelDrawingBank, problems = [];
      function check(ok,why) { if (!ok) problems.push(why); }
      const mount = document.createElement("div");
      document.body.append(mount);
      function render(item,reference=false) {
        const holder=document.createElement("div");
        holder.innerHTML=bank.svg(item,reference);
        mount.append(holder);
        return holder.firstElementChild;
      }
      function boundaryDistance(path,x,y) {
        const length=path.getTotalLength();
        let distance=Infinity;
        for(let k=0;k<=Math.ceil(length);k++){
          const point=path.getPointAtLength(Math.min(k,length));
          distance=Math.min(distance,Math.hypot(point.x-x,point.y-y));
        }
        return distance;
      }
      async function pixels(svg) {
        const clone=svg.cloneNode(true);
        clone.setAttribute("width","430");
        clone.setAttribute("height",String(Math.ceil(svg.viewBox.baseVal.height)));
        const image=new Image();
        image.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(clone));
        await image.decode();
        const canvas=document.createElement("canvas");
        canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;
        const ctx=canvas.getContext("2d");
        ctx.drawImage(image,0,0);
        return ctx.getImageData(0,0,canvas.width,canvas.height).data;
      }
      const calibrated = {
        epidermis: {span:357, value:200, draw:50, from:[610,613], to:[966,613], light:false},
        buttercup: {span:123, value:310, draw:310, from:[682,719], to:[804,719], light:false},
        redcell: {span:122, value:20, draw:5, from:[244,366], to:[365,366], light:true}
      };
      for (const s of bank.specimens) {
        const items=bank.bank.filter(it=>it.specimen===s), model=render(items[0]);
        const reference=render(items[0],true), photo=new Image();
        photo.src=reference.querySelector("image").getAttribute("href");
        await photo.decode();
        check(photo.naturalWidth===s.size[0] && photo.naturalHeight===s.size[1],s.id+" decoded photo dimensions");
        const line=model.querySelector("[data-label-line]");
        const [x,y,w]=s.crop, tx=x+Number(line.getAttribute("x2"))*w/300, ty=y+Number(line.getAttribute("y2"))*w/300;
        const path=(svg,name)=>svg.querySelector('[data-feature="'+name+'"]');
        const tip=new DOMPoint(tx,ty);
        if(s.id==="buttercup") check(path(model,"surface").isPointInFill(tip)&&!path(model,"cylinder").isPointInFill(tip),"label inside cortex");
        else if(s.id==="arterial") check(path(model,"lumen").isPointInFill(tip),"label inside lumen");
        else {
          const target={epidermis:"wall",privet:"upper",buccal:"nucleus",redcell:"edge"}[s.id];
          check(boundaryDistance(path(model,target),tx,ty)<2.5,s.id+" label at observed feature");
        }
        for(const [name,lx,ly,tolerance] of landmarks[s.id])
          check(boundaryDistance(path(model,name),lx,ly)<=tolerance,s.id+" observed landmark "+name+" "+lx+","+ly);
        const cal=calibrated[s.id];
        if(cal){
          const canvas=document.createElement("canvas");canvas.width=photo.width;canvas.height=photo.height;
          const ctx=canvas.getContext("2d");ctx.drawImage(photo,0,0);
          const isBar=(x,y)=>{const rgb=[...ctx.getImageData(x,y,1,1).data].slice(0,3);return cal.light?Math.min(...rgb)>220:Math.max(...rgb)<65;};
          check(cal.to[0]-cal.from[0]+1===cal.span && isBar(...cal.from) && isBar(...cal.to),s.id+" source bar endpoints");
          check(!isBar(cal.from[0]-2,cal.from[1])&&!isBar(cal.to[0]+2,cal.to[1]),s.id+" source bar outer edges");
        }
        const clean=await pixels(model);
        for(const item of items) {
          const svg=render(item);
          const text=svg.getAttribute("aria-label");
          check(!/\b(correct|incorrect|accept|reject|error|defect|should|missing|omitted)\b/i.test(text), item.id+" neutral description");
          check(!svg.querySelector("[data-defect-overlay]"),item.id+" pre-attempt cue");
          const actual=svg.querySelector("[data-scale-bar]");
          check(Boolean(actual)===Boolean(cal),item.id+" bar presence");
          if(cal) check(Math.abs(+actual.getAttribute("width")-300/w*cal.span*cal.draw/cal.value)<0.01,item.id+" displayed length");
          if(!item.defects.length)continue;
          const names=new Set([...model.querySelectorAll("[data-feature]"),...svg.querySelectorAll("[data-feature]")].map(p=>p.dataset.feature));
          const changed=[...names].filter(n=>path(model,n)?.getAttribute("d")!==path(svg,n)?.getAttribute("d"));
          if(line.outerHTML!==svg.querySelector("[data-label-line]").outerHTML)changed.push("label");
          if(actual && actual.parentNode.textContent!==model.querySelector("[data-scale-bar]").parentNode.textContent)changed.push("bar");
          check(changed.sort().join()===alterations[item.id].slice().sort().join(),item.id+" isolated edits");
          const edited=await pixels(svg);
          let inkChanges=0;
          for(let k=0;k<clean.length;k+=4)if(Math.abs(clean[k]-edited[k])>32)inkChanges++;
          check(inkChanges>=5,item.id+" visible changed pixels");
        }
        mount.replaceChildren();
      }
      mount.remove();return problems;
    }, {landmarks,alterations});
    assert.deepEqual(failures,[]);

    await page.evaluate(key=>localStorage.setItem(key,JSON.stringify({
      drawingRound:3,drawingSession:{round:2,index:1,verdict:1,categories:[4]},drawingOutcomes:{"yeast-3":"corrected"},causal:{phase:"review"}
    })),key);
    await page.reload();
    await page.getByText("Earlier schematic drawing practice",{exact:true}).click();
    assert.match(await page.locator("main").innerText(),/yeast-3/);
    const before=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
    assert.equal(before.previousDrawingSet.session.verdict,1);
    assert.deepEqual(before.causal,{phase:"review"});
    await page.getByText("Draw a specimen on paper",{exact:true}).click();
    assert.equal(await page.locator(".al-paper-review svg").count(),0);
    await page.getByRole("button",{name:/I’ve drawn it/}).click();
    await page.getByLabel("I followed the changes in direction around this cell.").check();
    await page.getByLabel("One change I would make").fill("Move my label to the right wall.");
    await page.reload();
    await page.getByText("Draw a specimen on paper",{exact:true}).click();
    assert.equal(await page.getByLabel("One change I would make").inputValue(),"Move my label to the right wall.");
    assert(await page.getByLabel("I followed the changes in direction around this cell.").isChecked());
    assert.deepEqual(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).drawingOutcomes,key),before.drawingOutcomes);
    await page.emulateMedia({media:"print"});
    assert(await page.locator(".al-paper-prompt").isVisible());
    assert(!await page.locator(".al-paper-review").isVisible());
    await page.emulateMedia({media:"screen"});

    await page.getByRole("button",{name:"Start a six-drawing set"}).click();
    const comparison=page.locator(".al-drawing-comparison");
    await page.getByRole("radio",{name:"Accept",exact:true}).check();
    await page.getByRole("button",{name:"Check judgement"}).click();
    assert.match(await page.locator(".al-drawing .al-feedback").innerText(),/where the line ends/);
    await page.getByRole("radio",{name:"Reject",exact:true}).check();
    await page.getByLabel("Label endpoint",{exact:true}).check();
    await page.getByRole("button",{name:"Try judgement again"}).click();
    await page.getByRole("button",{name:"Next drawing"}).click();
    const state=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).drawingSession,key);
    assert.equal(state.entries[0].firstAttempt.correct,false);
    assert.equal(state.entries[0].attempts,2);
    await page.getByText("Help with this judgement",{exact:true}).click();
    await page.waitForFunction(key=>JSON.parse(localStorage.getItem(key)).drawingSession.helped,key);
    await page.reload();
    const current=await page.evaluate(id=>window.ALevelDrawingBank.bank.find(i=>i.id===id).defects,state.ids[1]);
    await page.getByRole("radio",{name:current.length?"Reject":"Accept",exact:true}).check();
    for(const d of current)await page.getByLabel(await page.evaluate(d=>window.ALevelDrawingBank.categories[d],d),{exact:true}).check();
    await page.getByRole("button",{name:"Check judgement"}).click();
    assert.match(await page.locator(".al-drawing .al-feedback").innerText(),/Correct with a clue/);
    for(const width of [320,390,768,1280]){
      await page.setViewportSize({width,height:780});
      await page.evaluate(()=>document.documentElement.style.fontSize="150%");
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
      const enlarge=comparison.getByRole("button",{name:"Enlarge candidate drawing"});
      await enlarge.press("Enter");
      const dialog=page.getByRole("dialog",{name:"Candidate drawing"});
      assert(await dialog.isVisible());
      await dialog.getByRole("region").focus();
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("Escape");
      assert(await enlarge.evaluate(el=>el===document.activeElement));
    }
    await page.getByText("Read the visual evidence",{exact:true}).click();
    if (axeSource) {
      await page.addScriptTag({content:axeSource});
      const violations=await page.evaluate(async()=>(await axe.run(document.querySelector(".al-drawing"),{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})).violations.map(v=>v.id));
      assert.deepEqual(violations,[]);
    }
  }finally{await page.close();}
}

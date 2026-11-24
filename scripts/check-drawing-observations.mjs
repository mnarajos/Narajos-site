import assert from "node:assert/strict";

// Native photo coordinates read from the source fields independently of the SVG paths.
// Boundary tolerances allow the line width and indistinct edges in a micrograph.
const landmarks = {
  epidermis: [["wall",263,21,2],["wall",267,121,2],["wall",239,93,2],["nucleus",262,56,1.5],["nucleus",267,62,1.5]],
  leaf: [["upper",100,24,5],["upper",250,72,5],["epidermis",250,92,5],["lower",205,316,5],["lower",530,381,5]],
  buttercup: [["surface",413,28,6],["cylinder",419,328,6],["xylem",392,346,6]],
  arterial: [["band",412,394,5],["band",721,394,5],["lumen",444,394,5],["lumen",702,394,5],
    ["band",560,223,5],["band",560,580,5],["lumen",560,254,5],["lumen",560,550,5]],
  buccal: [["outline",240,118,7],["outline",20,191,6],["outline",594,354,7],["nucleus",244,286,5],["nucleus",296,330,5]],
  redcell: [["edge",166,60,4],["edge",204,19,4],["edge",255,53,4],["edge",223,100,4]]
};
const alterations = {
  "epidermis.leader":["label"],"epidermis.bar":["bar"],
  "leaf.band":["epidermis"],"leaf.cells":["partitions"],
  "buttercup.core":["cylinder"],"buttercup.xylem":["xylem"],
  "arterial.rim":["lumen"],"arterial.hatch":["hatch"],
  "buccal.nucleus-size":["label","nucleus"],"buccal.sketch":["retrace"],
  "redcell.interior":["inner"],"redcell.bar":["bar"]
};

// Independent answer register. Keys are the defects visible in the source comparisons.
const defects = {
  "epidermis.outline":[], "epidermis.leader":[4], "epidermis.bar":[5],
  "leaf.outline":[], "leaf.band":[3], "leaf.cells":[2],
  "buttercup.outline":[], "buttercup.core":[3], "buttercup.xylem":[2],
  "arterial.outline":[], "arterial.rim":[3], "arterial.hatch":[1],
  "buccal.outline":[], "buccal.nucleus-size":[3], "buccal.sketch":[0],
  "redcell.outline":[], "redcell.interior":[2], "redcell.bar":[5]
};

export async function checkDrawingObservations(browser,base,axeSource) {
  const page = await browser.newPage({viewport:{width:390,height:800},hasTouch:true});
  const url = base + "/alevel/#exam-drawings";
  const key = "keystone.alevel.exam-skills.v1";
  try {
    await page.goto(url);
    await page.waitForFunction(() => window.ALevelDrawingBank?.version === 4 && window.ALevelDrawingWorked);
    const failures = await page.evaluate(async ({landmarks,alterations,defects}) => {
      const bank = window.ALevelDrawingBank, problems = [];
      function check(ok,why) { if (!ok) problems.push(why); }
      const mount = document.createElement("div");
      mount.className = "al-teaching"; // Exercise the site's actual SVG typography.
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
      // Trace the full straight leader in the same native coordinate system as the contours.
      function crossings(svg,specimen, label) {
        const [x,y,width]=specimen.crop, line=svg.querySelector(label ? `[data-label-line="${label}"]` : "[data-label-line]");
        const point=n=>({x:x+Number(line.getAttribute("x"+n))*width/300,y:y+Number(line.getAttribute("y"+n))*width/300});
        const paths=[...svg.querySelectorAll("[data-feature]")].filter(path=>Object.hasOwn(specimen.paths,path.dataset.feature));
        return lineCrossings(point(1),point(2),paths);
      }
      function lineCrossings(start,end,paths) {
        const dx=end.x-start.x, dy=end.y-start.y, length=Math.hypot(dx,dy), hits=[];
        for(const path of paths){
          const name=path.dataset.feature || path.dataset.workedContour;
          const size=path.getTotalLength(), steps=Math.ceil(size);
          let prev=path.getPointAtLength(0);
          for(let i=1;i<=steps;i++){
            const next=path.getPointAtLength(size*i/steps), sx=next.x-prev.x,sy=next.y-prev.y;
            const det=dx*sy-dy*sx;
            if(Math.abs(det)>1e-8){
              const ax=prev.x-start.x,ay=prev.y-start.y;
              const along=(ax*sy-ay*sx)/det, across=(ax*dy-ay*dx)/det;
              // Touching the labelled boundary at the tip is intentional.
              if(along>0 && (1-along)*length>2.5 && across>=0 && across<1)
                hits.push({name,along});
            }
            prev=next;
          }
        }
        return hits.sort((a,b)=>a.along-b.along).map(hit=>hit.name);
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
      function checkOnionNucleus(svg, specimen, label) {
        const nucleus = svg.querySelector('[data-feature="nucleus"]');
        const leader = svg.querySelector('[data-label-line="Nucleus"]');
        const [x,y,width] = specimen.crop;
        const tip = [x + Number(leader?.getAttribute("x2"))*width/300, y + Number(leader?.getAttribute("y2"))*width/300];
        check(Boolean(nucleus && leader) && boundaryDistance(nucleus,...tip)<1.5, label+" nucleus label reaches the observed outline");
        check(crossings(svg,specimen,"Nucleus").join()==="wall",label+" nucleus leader only crosses the enclosing wall");
      }
      const calibrated = {
        epidermis: {span:47, value:50, draw:25, from:[177,261], to:[223,261], light:false},
        leaf: {span:94, value:50, draw:50, from:[966,588], to:[1059,588], light:false},
        buttercup: {span:123, value:310, draw:310, from:[682,719], to:[804,719], light:false},
        arterial: {span:164, value:100, draw:100, from:[3398,685], to:[3561,685], light:false},
        buccal: {span:198, value:20, draw:10, from:[412,597], to:[609,597], light:false},
        redcell: {span:128, value:10, draw:5, from:[841,622], to:[968,622], light:false}
      };
      check(bank.bank.map(item=>item.id).sort().join()===Object.keys(defects).sort().join(),"verified judgement register");
      for (let round=0; round<3; round++) {
        check(bank.setFor(round).map(item=>item.specimen.id).join() === "epidermis,buccal,redcell,leaf,buttercup,arterial", "cell conventions precede tissue maps");
      }
      check(bank.bank.every(item=>item.defects.length<=1),"each comparison isolates at most one assessed fault");
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
        else if(s.id==="leaf") check(boundaryDistance(path(model,"upper"),tx,ty)<20 && boundaryDistance(path(model,"epidermis"),tx,ty)<20,"label within upper epidermal band");
        else {
          const target={epidermis:"wall",buccal:"nucleus",redcell:"edge"}[s.id];
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
          const heading=svg.querySelector("[data-drawing-title]");
          check(heading?.textContent.trim().length>10,item.id+" explanatory title belongs to the drawing");
          if(heading){
            const box=heading.getBBox(), frame=svg.viewBox.baseVal;
            check(box.width>0&&box.x>=-1&&box.x+box.width<=frame.width+1&&box.y+box.height<=frame.height+1,item.id+" title visible within drawing");
          }
          // The available system font differs between pupil devices and CI.
          // Check both the site's inherited font and a wider common fallback.
          for (const family of ["", "'DejaVu Sans', sans-serif"]) {
            mount.style.fontFamily=family;
            for (const word of svg.querySelectorAll("text")) {
              const box=word.getBBox(), frame=svg.viewBox.baseVal;
              check(box.width>0 && box.x>=-1 && box.x+box.width<=frame.width+1 && box.y>=-1 && box.y+box.height<=frame.height+1,
                item.id+" visible text"+(family ? " in fallback font" : "")+": "+word.textContent);
            }
          }
          mount.style.fontFamily="";
          const itemLeader=svg.querySelector("[data-label-line]"), itemLabel=itemLeader.nextElementSibling;
          const labelBox=itemLabel?.getBBox();
          const outside=s.id==="leaf" ? labelBox && labelBox.y+labelBox.height<50 :
            Number(itemLeader.getAttribute("x1"))>=300 && labelBox && labelBox.x>=300;
          check(outside && itemLabel?.textContent===s.label,item.id+" label outside the specimen");
          // Check the browser's rendered transforms, not only the authored
          // coordinates: global CSS must not stretch the nested SVG apart
          // from its label line or the scale bar.
          const nativeX=x+Number(itemLeader.getAttribute("x2"))*w/300;
          const nativeY=y+Number(itemLeader.getAttribute("y2"))*w/300;
          // Firefox reports the parent transform on the nested <svg> itself;
          // its child path/image reports the rendered viewBox transform.
          const actualTip=new DOMPoint(nativeX,nativeY).matrixTransform(svg.querySelector("[data-feature]").getScreenCTM());
          const drawnTip=new DOMPoint(Number(itemLeader.getAttribute("x2")),Number(itemLeader.getAttribute("y2"))).matrixTransform(svg.getScreenCTM());
          check(Math.hypot(actualTip.x-drawnTip.x,actualTip.y-drawnTip.y)<1,item.id+" rendered label and specimen share coordinates");
          const photoTip=new DOMPoint(nativeX,nativeY).matrixTransform(reference.querySelector("image").getScreenCTM());
          const photoExpected=new DOMPoint(Number(itemLeader.getAttribute("x2")),Number(itemLeader.getAttribute("y2"))).matrixTransform(reference.getScreenCTM());
          check(Math.hypot(photoTip.x-photoExpected.x,photoTip.y-photoExpected.y)<1,item.id+" rendered observation and scale share coordinates");
          check(item.scope===(cal?"complete":"focused"),item.id+" scope backed by source calibration");
          check(item.defects.slice().sort().join()===defects[item.id]?.join(),item.id+" evidenced answer key");
          const actual=svg.querySelector("[data-scale-bar]");
          check(Boolean(actual)===Boolean(cal),item.id+" bar presence");
          if(cal && actual){
            const expectedLabel={"epidermis.bar":50,"redcell.bar":10}[item.id] ?? cal.draw;
            check(actual.parentNode.textContent.trim()===expectedLabel+" µm",item.id+" physical scale value");
            check(Math.abs(+actual.getAttribute("width")-300/w*cal.span*cal.draw/cal.value)<0.01,item.id+" displayed length");
          }
          if (s.id==="epidermis") checkOnionNucleus(svg,s,item.id);
          const expected={epidermis:item.key==="leader"?["wall"]:[],leaf:["upper"],buttercup:["surface"],
            arterial:["band","lumen"],buccal:["outline"],redcell:[]};
          const hits=crossings(svg,s);
          check(hits.join()===expected[s.id].join(),item.id+" full leader crossed "+hits.join("/"));
          if (s.id==="buttercup") {
            const detail=document.createElement("div"), observed=document.createElement("div");
            detail.innerHTML=bank.vascularDetail(item);observed.innerHTML=bank.vascularDetail(item,true);
            check(detail.firstElementChild.getAttribute("viewBox")===observed.firstElementChild.getAttribute("viewBox"),item.id+" matched vascular detail crop");
            check(Boolean(detail.querySelector('[data-feature="xylem"]'))===(item.key!=="xylem"),item.id+" vascular detail shows candidate");
          }
          if(s.id==="arterial"){
            const lumen=path(svg,"lumen"),band=path(svg,"band");
            for(let pos=0;pos<lumen.getTotalLength();pos+=1){
              if(!band.isPointInFill(lumen.getPointAtLength(pos))){check(false,item.id+" lumen escaped wall");break;}
            }
          }
          if(!s.scale)check(Boolean(item.focus?.trim()),item.id+" named partial criteria");
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
      const paper=render(bank.paper);
      check(paper.querySelector("[data-drawing-title]")?.textContent.trim().length>10,"paper model includes its title");
      const paperBar=paper.querySelector("[data-scale-bar]");
      check(paperBar?.parentNode.textContent.trim()==="25 µm" &&
        Math.abs(Number(paperBar.getAttribute("width"))-300/bank.paper.specimen.crop[2]*47/2)<0.01,"paper model calibrated 25 µm bar");
      check(crossings(paper,bank.paper.specimen).length===0,"paper model crosses an unrelated boundary");
      check(boundaryDistance(paper.querySelector('[data-feature="wall"]'),...bank.paper.specimen.target)<2.5,"paper label tip at wall");
      checkOnionNucleus(paper,bank.paper.specimen,"paper model");
      const worked=window.ALevelDrawingWorked;
      const reference=document.createElement("div"), drawing=document.createElement("div");
      reference.innerHTML=worked.observationSvg();drawing.innerHTML=worked.modelSvg();mount.append(reference,drawing);
      const frogField=reference.querySelector("svg svg");
      check(reference.firstElementChild.getAttribute("viewBox")===drawing.firstElementChild.getAttribute("viewBox"),"worked images share an inspection frame");
      check(frogField.getAttribute("viewBox")==="256 208 392 300","frog crop in source coordinates");
      const frogCorner=new DOMPoint(256,208).matrixTransform(frogField.querySelector("image").getScreenCTM());
      const expectedCorner=new DOMPoint(6,35).matrixTransform(reference.firstElementChild.getScreenCTM());
      const frogOpposite=new DOMPoint(648,508).matrixTransform(frogField.querySelector("image").getScreenCTM());
      const expectedOpposite=new DOMPoint(398,335).matrixTransform(reference.firstElementChild.getScreenCTM());
      check(Math.hypot(frogCorner.x-expectedCorner.x,frogCorner.y-expectedCorner.y)<1 &&
        Math.hypot(frogOpposite.x-expectedOpposite.x,frogOpposite.y-expectedOpposite.y)<1,"worked photograph and drawing use the same rendered scale");
      const photo=new Image();photo.src=frogField.querySelector("image").getAttribute("href");await photo.decode();
      check(photo.naturalWidth===780&&photo.naturalHeight===590,"published frog panel dimensions");
      const canvas=document.createElement("canvas");canvas.width=photo.width;canvas.height=photo.height;
      const ctx=canvas.getContext("2d");ctx.drawImage(photo,0,0);
      const darkAt=x=>Math.max(...ctx.getImageData(x,556,1,1).data.slice(0,3))<60;
      check(darkAt(32)&&darkAt(285)&&!darkAt(30)&&!darkAt(287),"original black 10 µm bar, about 255 pixels");
      for(const figure of [drawing,reference]){
        const scale=figure.querySelector("[data-worked-scale]"), line=scale.querySelector("line");
        check(scale.textContent.trim()==="5 µm"&&Number(line.getAttribute("x2"))-Number(line.getAttribute("x1"))===127.5,"frog 5 µm reference length");
      }
      const contours=[...drawing.querySelectorAll("[data-worked-contour]")];
      check(contours.length===2&&contours.every(path=>getComputedStyle(path).fill==="none"),"worked cell contains two unshaded observed contours");
      const [cell,nucleus]=contours;
      for(const [path,x,y] of [[cell,398,233],[cell,276,339],[cell,626,374],[cell,484,480],
                               [nucleus,382,347],[nucleus,489,354],[nucleus,440,393],[nucleus,421,305]])
        check(boundaryDistance(path,x-256,y-208)<7,"frog observed landmark "+x+","+y);
      const workedLabels=[...drawing.querySelectorAll("[data-worked-label]")];
      const labelNames=workedLabels.map(group=>group.dataset.workedLabel).sort();
      check(labelNames.join()==="Cell boundary,Nucleus","worked labelled structures");
      // The worked drawing has straight horizontal leaders and an external label column.
      // Include text extents and the complete leaders, not just their endpoints.
      function overlaps(a,b) {
        return a.left<=b.right && a.right>=b.left && a.top<=b.bottom && a.bottom>=b.top;
      }
      const ink=[...drawing.querySelectorAll("text,line")].map(element=>({
        name:element.textContent || element.parentElement.dataset.workedLabel || "scale bar",
        bounds:element.getBoundingClientRect()
      }));
      for(let i=0;i<ink.length;i++)for(let j=0;j<i;j++)
        check(!overlaps(ink[i].bounds,ink[j].bounds),"frog overlapping text or lines: "+ink[i].name+" / "+ink[j].name);
      for(const group of workedLabels){
        const label=group.dataset.workedLabel,line=group.querySelector("line");
        const point=n=>new DOMPoint(Number(line.getAttribute("x"+n)),Number(line.getAttribute("y"+n)));
        const tip=point(1),start=point(2);
        const meets=label==="Cell boundary"?boundaryDistance(cell,tip.x,tip.y)<2:
          label==="Nucleus"&&boundaryDistance(nucleus,tip.x,tip.y)<2;
        check(meets,"frog "+label+" endpoint");
        const word=group.querySelector("text");
        check(word.textContent.trim()===label && !overlaps(word.getBoundingClientRect(),cell.getBoundingClientRect()),
          "frog "+label+" word is outside the cell");
        check(!cell.isPointInFill(start),"frog "+label+" leader starts outside the cell");
        const hits=lineCrossings(start,tip,contours);
        const expected=label==="Cell boundary"?"":"cell";
        check(hits.join()===expected,"frog "+label+" full leader crosses "+hits.join("/"));
      }
      for(const label of drawing.querySelectorAll("text")){
        const box=label.getBBox(), bounds=label.ownerSVGElement.viewBox.baseVal;
        check(box.width>0 && box.x+box.width<=bounds.width,"worked graphic title and labels fit: "+label.textContent);
      }
      mount.remove();return problems;
    }, {landmarks,alterations,defects});
    assert.deepEqual(failures,[]);
    async function audit(selector){
      if(!axeSource)return;
      if(!await page.evaluate(()=>Boolean(window.axe)))await page.addScriptTag({content:axeSource});
      const violations=await page.evaluate(async selector=>(await window.axe.run(document.querySelector(selector),{
        runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa","wcag22aa"]}
      })).violations.map(rule=>({id:rule.id,nodes:rule.nodes.map(node=>node.target)})),selector);
      assert.deepEqual(violations,[],selector+" accessibility");
    }
    const worked=page.locator(".al-drawing-worked");
    const model=worked.locator(".al-worked-model");
    assert(!await model.isVisible());
    const observation=worked.getByRole("button",{name:"Enlarge observation",exact:true});
    await observation.tap();
    const observed=page.getByRole("dialog");
    await observed.getByRole("region").waitFor();
    assert.equal(await observed.getByRole("button",{name:"Worked drawing",exact:true}).count(),0);
    await audit("dialog[open]");
    await page.keyboard.press("Escape");
    assert(await observation.evaluate(el=>document.activeElement===el));
    await worked.getByRole("button",{name:"Show the worked drawing",exact:true}).press("Enter");
    assert(await model.isVisible());
    const workedEnlarge=worked.getByRole("button",{name:"Enlarge worked drawing",exact:true});
    await workedEnlarge.press("Enter");
    const enlargedModel=page.getByRole("dialog",{name:"Worked drawing",exact:true});
    await enlargedModel.getByRole("region").waitFor();
    await enlargedModel.getByRole("button",{name:"Observation",exact:true}).tap();
    const enlargedObservation=page.getByRole("dialog",{name:"Observation",exact:true});
    assert(await enlargedObservation.locator(".al-drawing-zoom > svg[role=img]").isVisible());
    await enlargedObservation.getByRole("button",{name:"Worked drawing",exact:true}).press("Enter");
    assert.equal(await enlargedModel.getByRole("button",{name:"Worked drawing",exact:true}).getAttribute("aria-pressed"),"true");
    await page.keyboard.press("Escape");
    assert(await workedEnlarge.evaluate(el=>document.activeElement===el));
    await audit(".al-drawing-worked");

    const oldSet={round:2,index:1,ids:["epidermis.bar","privet.outline"],attempts:1,verdict:0};
    const oldReview={entries:[{id:"buccal.outline",outcome:"independent"}]};
    const oldOutcomes={"privet.outline":"independent","buccal.outline":"hint-supported"};
    await page.evaluate(({key,oldSet,oldReview,oldOutcomes})=>{
      localStorage.setItem(key,JSON.stringify({drawingVersion:2,drawingSession:oldSet,drawingRound:3,
        drawingReview:oldReview,drawingOutcomes:oldOutcomes,drawingPaper:{improvement:"Retain my note."},
        drawingCalibration:{draft:"5.8",outcome:"independent"}}));
    },{key,oldSet,oldReview,oldOutcomes});
    await page.reload();
    await page.getByRole("button",{name:"Start a six-drawing set"}).waitFor();
    const migrated=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
    assert.equal(migrated.drawingVersion,4);
    assert.deepEqual(migrated.earlierObservationSet.session,oldSet);
    assert.deepEqual(migrated.earlierObservationSet.review,oldReview);
    assert.deepEqual(migrated.earlierObservationSet.outcomes,oldOutcomes);
    assert.equal(migrated.earlierObservationSet.round,3);
    assert(!migrated.drawingSession && !migrated.drawingReview);
    assert.equal(migrated.drawingRound,0);
    await page.getByText("Earlier observation judgements",{exact:true}).click();
    assert(await page.getByText(/privet\.outline · /).isVisible());
    assert.equal(migrated.drawingOutcomes?.["privet.outline"],undefined);
    assert.equal(migrated.drawingPaper.improvement,"Retain my note.");
    assert.equal(migrated.drawingCalibration.outcome,"independent");
    await page.reload();
    assert.deepEqual(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).earlierObservationSet,key),migrated.earlierObservationSet);

    const oldV3={round:0,index:1,ids:["epidermis.leader","privet.band","buttercup.outline","arterial.hatch-tip","buccal.outline","redcell.bar"],attempts:1};
    await page.evaluate(({key,oldV3,earlier})=>localStorage.setItem(key,JSON.stringify({
      drawingVersion:3,drawingRound:1,drawingSession:oldV3,
      drawingOutcomes:{"privet.band":"independent"},earlierObservationSet:earlier,
      drawingPaper:{improvement:"Keep my paper note.",compared:true,checks:{1:true}},drawingCalibration:{draft:"5.8"}
    })),{key,oldV3,earlier:migrated.earlierObservationSet});
    await page.reload();
    const movedV3=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
    assert.deepEqual(movedV3.batch27DrawingSet.session,oldV3);
    assert.deepEqual(movedV3.batch27DrawingSet.outcomes,{"privet.band":"independent"});
    assert.deepEqual(movedV3.earlierObservationSet,migrated.earlierObservationSet);
    assert.equal(movedV3.drawingPaper.improvement,"Keep my paper note.");
    assert.equal(movedV3.drawingCalibration.draft,"5.8");
    assert(!movedV3.drawingSession && !movedV3.drawingOutcomes["privet.band"]);
    await page.getByText("Draw a specimen on paper",{exact:true}).click();
    assert.equal(await page.locator(".al-paper-review svg").count(),0);
    await page.getByRole("button",{name:/I’ve drawn it/}).click();
    assert.equal(await page.getByLabel("One change I would make").inputValue(),"Keep my paper note.");
    assert(!await page.getByLabel("My label lines reach the cell wall and nucleus.").isChecked());

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
    assert.equal(await page.locator(".al-paper-review input[type=checkbox]").count(),8);
    await page.getByLabel("My title names the specimen and the cell I drew.").check();
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

    await page.getByText("Cell drawing or tissue plan?",{exact:true}).press("Enter");
    assert(await page.getByRole("figure",{name:/^Cell drawing · /}).isVisible());
    assert(await page.getByRole("figure",{name:/^Tissue plan · /}).isVisible());
    const scalePanel=page.locator(".al-scale-practice"), scaleInput=scalePanel.getByRole("textbox");
    await scalePanel.locator("summary").first().tap();
    await scaleInput.fill("18");
    await page.reload();
    await scalePanel.locator("summary").first().press("Enter");
    assert.equal(await scaleInput.inputValue(),"18");
    await scaleInput.press("Enter");
    assert.match(await scalePanel.getByRole("status").innerText(),/310 µm/);
    await scaleInput.fill("0.58 cm");await scaleInput.press("Enter");
    assert.match(await scalePanel.getByRole("status").innerText(),/Correct after correction/);
    await page.reload();
    const loaded=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
    assert.deepEqual(loaded.drawingCalibration.firstAttempt,{answer:"18",correct:false,helped:false});
    assert.equal(loaded.drawingCalibration.outcome,"corrected");
    assert.deepEqual(loaded.drawingOutcomes,before.drawingOutcomes);
    for(const helped of [false,true]){
      await page.evaluate(key=>{const state=JSON.parse(localStorage.getItem(key));delete state.drawingCalibration;localStorage.setItem(key,JSON.stringify(state));},key);
      await page.reload();
      await scalePanel.locator("summary").first().press("Enter");
      if(helped)await scalePanel.getByText("Hint about the two scales",{exact:true}).press("Enter");
      await scaleInput.fill("5.8 mm");await scaleInput.press("Enter");
      assert.match(await scalePanel.getByRole("status").innerText(),helped?/Correct with a clue/:/Independently correct/);
    }
    await page.getByRole("button",{name:"Start a six-drawing set"}).click();
    const comparison=page.locator(".al-drawing-comparison");
    await page.getByRole("radio",{name:"Accept",exact:true}).check();
    await page.getByRole("button",{name:"Check judgement"}).click();
    assert.match(await page.locator(".al-drawing-judgement .al-feedback").innerText(),/where the line ends/);
    await page.getByRole("radio",{name:"Reject",exact:true}).check();
    await page.getByLabel("Labels and label lines",{exact:true}).check();
    await page.getByRole("button",{name:"Try judgement again"}).click();
    assert.match(await page.locator(".al-drawing-judgement .al-feedback").innerText(),/Labels and label lines.*continues past the structure/);
    await page.getByRole("button",{name:"Next drawing"}).click();
    const state=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).drawingSession,key);
    assert.equal(state.entries[0].firstAttempt.correct,false);
    assert.equal(state.entries[0].attempts,2);
    assert.equal(state.entries[0].outcome,"corrected");
    await page.getByText("Help with this judgement",{exact:true}).click();
    await page.waitForFunction(key=>JSON.parse(localStorage.getItem(key)).drawingSession.helped,key);
    await page.reload();
    const current=defects[state.ids[1]];
    assert(await page.getByRole("radio",{name:"Accept",exact:true}).count());
    await page.getByRole("radio",{name:current.length?"Reject":"Accept",exact:true}).check();
    for(const d of current)await page.getByLabel(await page.evaluate(d=>window.ALevelDrawingBank.categories[d],d),{exact:true}).check();
    await page.getByRole("button",{name:"Check judgement"}).click();
    assert.match(await page.locator(".al-drawing-judgement .al-feedback").innerText(),/Correct with a clue/);
    for(const [width,height] of [[320,700],[390,844],[667,320],[768,1024],[1280,780]]){
      await page.setViewportSize({width,height});
      await page.evaluate(size=>document.documentElement.style.fontSize=size,width===320||height===320?"200%":"150%");
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
      const enlarge=comparison.getByRole("button",{name:"Enlarge candidate drawing"});
      await enlarge.press("Enter");
      const dialog=page.getByRole("dialog",{name:"Candidate drawing"});
      assert(await dialog.isVisible());
      assert(await dialog.evaluate(el=>el.getBoundingClientRect().width<=innerWidth+2 && el.getBoundingClientRect().height<=innerHeight));
      const region=dialog.getByRole("region");
      assert(await region.evaluate(el=>el.clientHeight>=80),"room to inspect the enlarged field at "+width+"×"+height);
      await region.focus();
      await page.keyboard.press("ArrowRight");
      if(width<=390)assert(await region.evaluate(el=>el.scrollWidth>el.clientWidth),"expanded field can be panned at "+width);
      await dialog.getByRole("button",{name:"Reference observation",exact:true}).press("Enter");
      const reference=page.getByRole("dialog",{name:"Reference observation",exact:true});
      assert(await reference.locator(".al-drawing-zoom > svg[role=img]").isVisible());
      if(width===320)await reference.getByRole("button",{name:"Close enlarged image",exact:true}).tap();
      else await page.keyboard.press("Escape");
      assert(await enlarge.evaluate(el=>el===document.activeElement));
    }
    await page.getByText("Read the visual evidence",{exact:true}).click();
    await audit(".al-drawing");

    await page.setViewportSize({width:1280,height:800});
    await page.evaluate(key=>{
      document.documentElement.style.fontSize="";
      localStorage.setItem(key,JSON.stringify({drawingVersion:4,drawingRound:1,
        drawingSession:{round:0,index:1,attempts:0,helped:false,ids:Array(6).fill("buttercup.xylem")}}));
    },key);
    await page.reload();
    const detail=page.locator(".al-drawing-comparison");
    assert.equal(await detail.locator(".al-vascular-detail:visible").count(),2,"reference and candidate details appear together on desktop");
    assert.equal(await detail.locator('figure[data-view="candidate"] .al-vascular-detail [data-feature="xylem"]').count(),0);
    await page.setViewportSize({width:390,height:844});
    assert.equal(await detail.locator(".al-vascular-detail:visible").count(),1,"phone shows the detail for the selected view");
    await detail.getByRole("button",{name:"Candidate drawing",exact:true}).click();
    assert(await detail.locator('figure[data-view="candidate"] .al-vascular-detail').isVisible());
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
    await audit(".al-drawing");
  }finally{await page.close();}
}

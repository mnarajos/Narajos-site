/* Contours are in the pixel coordinates of the credited local micrographs. */
(function () {
  "use strict";
  const categories = ["Line quality", "Shading", "Biological detail", "Proportions", "Label endpoint", "Scale"];
  const commons = "https://commons.wikimedia.org/wiki/File:";
  const bysa = version => "https://creativecommons.org/licenses/by-sa/" + version + "/";
  const field = "/assets/micrographs/";
  // Each alternative edits only the named structure, leader or bar in its own specimen.
  const specimens = [
    {
      id: "epidermis", name: "Red onion epidermis", type: "cell", image: "onion-epidermis.webp",
      source: "Cells_from_a_red_onion_epidermal_peel.tif", author: "Adrian J. Hunter", licence: "CC BY-SA 3.0", licenceUrl: bysa("3.0"),
      size: [998,698], crop: [242,70,270,237], label: "Cell wall", target: [461,167],
      task: "Draw just the complete, pink cell in the centre of the field. Follow its wall around the cell. Leave the neighbouring cells out.",
      scale: {pixels:357, microns:200, draw:50}, scaleNote: "The entire five-segment bar in the full field spans 357 image units and represents 200 µm.",
      observation: "The central cell is a single oblique polygon. Its left and right edges span about 190 image units. The upper-left corner is higher than the upper-right. No separate round body is resolved inside.",
      paths: {wall:"M319 107 C342 108 374 129 399 140 Q437 157 460 152 Q459 165 461 167 Q477 222 468 231 Q461 243 416 277 Q398 280 362 255 Q322 226 289 195 Q278 183 278 169 Q292 140 319 107Z"},
      model: "One oblique polygon, with a rounded lower corner. One unfilled interior. The leader meets the upper part of the right wall.",
      why: "The wall follows the uneven outline and the interior is left clear. One quarter of the photographed 200 µm bar gives a 50 µm bar.",
      clue: "Follow the leader all the way to its tip. Compare the cell width and the length beside the scale value.",
      alternatives: [
        {key:"leader", defects:[4], target:[423,173], evidence:"The leader ends inside the pink cell, about 38 image units from its right wall.", why:"The cell-wall leader stops in the cell contents. Extend its tip to the visible wall."},
        {key:"bar", defects:[5], barLabel:100, evidence:"The bar is a little under half the cell’s width and reads 100 µm.", why:"The bar spans 89.25 image units. That is one quarter of the source bar, so it represents 50 µm. A 100 µm bar would need twice this length."}
      ]
    },
    {
      id:"privet", name:"Privet leaf transverse section", type:"plan", image:"drawing-privet.webp",
      source:"Angiosperm_Morphology_The_Mesophytic_Dicotyledonous_Leaf_of_Ligustrum_(36845190976).jpg", author:"Berkshire Community College Bioscience Image Library", licence:"CC0", licenceUrl:"https://creativecommons.org/publicdomain/zero/1.0/",
      size:[950,536], crop:[250,23,540,486], label:"Upper surface", target:[715,76], leaderRise:26,
      task:"Make a partial tissue map across the midrib. Show the two surfaces, the inner edge of the upper epidermis and the outline of the main vascular bundle. Stop at the field edges.",
      observation:"The upper surface dips above the midrib. A thin epidermal band follows it. The lower surface bulges down. The compact oval bundle lies inside that bulge and spans about two fifths of the field width.",
      paths:{upper:"M250 66 Q330 77 378 89 Q441 105 484 129 Q512 146 548 129 Q615 100 662 90 Q733 70 790 58",epidermis:"M250 87 Q321 96 375 110 Q428 122 477 148 Q512 167 548 147 Q605 120 664 111 Q730 89 790 81",lower:"M250 425 Q299 446 352 452 Q410 462 455 484 Q510 499 570 482 Q621 471 657 445 Q704 434 728 417 Q751 397 763 373 Q770 389 790 384",bundle:"M414 245 C429 210 461 197 498 196 Q559 188 598 219 Q630 244 626 278 Q624 315 598 335 Q571 357 530 362 Q471 356 441 332 Q400 300 414 245Z"},
      model:"A thin band follows the dip. The enclosed oval is near the midrib centre, spanning roughly two fifths of the width. The surface leader meets the upper surface towards the right.",
      why:"The dip, thin upper band and oval bundle are retained at their observed positions. Individual cell outlines are unnecessary in this partial tissue map.",
      clue:"Track the band thickness from the field edge down into the dip.",
      alternatives:[
        {key:"band",defects:[3],replace:{epidermis:"M250 139 Q352 149 421 176 Q500 211 543 186 Q668 133 790 130"}, evidence:"The upper band takes up about one fifth of the depth at the right edge of the midrib field.",why:"The upper epidermis is only a narrow band. The inner boundary here includes much of the elongated tissue below it. Move that boundary closer to the upper surface."},
        {key:"cells",defects:[2],add:{partitions:"M268 69L263 89 M291 72L286 92 M315 76L311 96 M337 81L333 99 M359 85L354 105"},evidence:"Five short lines partition the left end of the upper band into compartments.",why:"The micrograph resolves cells, but this task asks for tissue boundaries. Keep the continuous epidermal band and leave out the partitions between cells."}
      ]
    },
    {
      id:"buttercup",name:"Buttercup root transverse section",type:"plan",image:"drawing-buttercup.webp",
      source:"Ranunculus_root.jpg",author:"Jon Houseman (source credited to Jon Houseman and Matthew Ford)",licence:"CC BY-SA 4.0",licenceUrl:bysa("4.0"),
      size:[840,750],crop:[0,0,840,750],label:"Cortex",target:[704,434],scale:{pixels:123,microns:310,draw:310},scaleNote:"The author identifies the original black bar as 0.31 mm. It spans approximately 123 image units here. 0.31 mm equals 310 µm.",
      task:"Map the root surface, the central cylinder and the shape occupied by xylem within it. Leave individual vessels and cells out.",
      observation:"A broad cortex encloses a small approximately circular central cylinder, about one seventh of the root width. Xylem forms a four-armed figure in its centre.",
      paths:{surface:"M399 29 Q469 23 521 57 Q590 76 644 115 Q705 153 733 217 Q759 279 761 350 Q766 428 739 486 Q719 549 674 588 Q642 636 588 655 Q532 691 445 696 Q355 699 291 676 Q220 649 167 611 Q118 578 100 511 L87 480 Q55 419 57 356 Q53 298 80 245 Q108 184 141 159 Q175 106 214 82 Q298 34 399 29Z",cylinder:"M373 374 Q373 347 393 335 Q417 320 440 332 Q463 341 469 365 Q474 393 452 413 Q430 431 406 422 Q375 410 373 386Z",xylem:"M390 345 Q406 352 417 359 Q435 358 449 350 Q445 363 432 376 Q438 386 448 401 Q430 399 418 388 Q404 391 391 401 Q393 388 406 376 Q395 360 390 345Z"},
      model:"The four-armed figure lies in a small central ring inside a broad unpartitioned cortex. The label tip lies within the outer tissue.",
      why:"The cylinder is about one seventh as wide as the root and encloses the central xylem. The cortex label ends between cylinder and surface. The scale is carried across at the same ratio.",
      clue:"Compare the width of the central cylinder with that of the whole section.",
      alternatives:[
        {key:"core",defects:[3],replace:{cylinder:"M295 374 C292 294 354 250 426 252 C502 253 551 304 550 378 C548 448 489 502 418 500 C343 498 295 446 295 374Z"},evidence:"The central ring spans about one third of the root width. A four-armed region is still centred inside it.",why:"The ring makes the central cylinder over twice its observed width. Use the small boundary immediately around the xylem and other vascular tissue."},
        {key:"xylem",defects:[2],omit:["xylem"],evidence:"The small central ring has a clear, unpartitioned interior.",why:"The four arms of xylem can be seen within the cylinder. Include their shared tissue outline without drawing each vessel."}
      ]
    },
    {
      id:"arterial",name:"Arterial wall in transverse section",type:"plan",image:"drawing-artery.webp",
      source:"ArteryVeinCS.jpg",author:"FishtailBob",licence:"CC BY-SA 4.0",licenceUrl:bysa("4.0"),
      size:[640,480],crop:[264,120,139,113],label:"Arterial lumen",target:[353,177],
      task:"Map the lumen and the inner and outer edges of the dark muscular band around it. Leave out the adjoining vessels and paler connective tissue.",
      observation:"The dark band encloses an oblique lumen, longer from upper left to lower right. The inner edge is uneven, including a small indentation at the lower left. The band is substantial at the lower right.",
      paths:{band:"M282 158 Q287 141 302 135 Q319 127 335 132 Q352 136 363 146 Q377 158 378 179 Q382 196 371 208 Q362 220 349 222 Q326 219 311 209 Q291 200 282 185 Q274 172 282 158Z",lumen:"M300 161 Q306 148 318 149 Q331 149 342 155 Q355 161 358 173 Q362 185 360 198 Q358 205 349 202 Q332 199 322 191 Q316 191 311 185 Q307 179 302 178 Q296 172 300 161Z"},
      model:"An oblique lumen with an uneven edge sits inside a wider band. The leader terminates within the lumen. Both regions are unfilled.",
      why:"The shapes preserve the angle and wall thickness of the observed band. The endpoint identifies the space enclosed by the wall.",
      clue:"Compare the rim at the lower right and trace the lumen leader to its tip.",
      alternatives:[
        {key:"rim",defects:[3],replace:{lumen:"M286 161 Q291 144 309 139 Q332 134 352 151 Q372 165 373 184 Q378 208 358 216 Q345 222 324 210 Q301 200 291 183 Q282 173 286 161Z"},evidence:"The lumen almost reaches the outside of the dark band, leaving a narrow rim around most of its outline.",why:"The lumen has been enlarged into the muscular wall. There is a broad band at the lower right of the photograph. Restore that thickness."},
        {key:"hatch-tip",defects:[1,4],target:[370,178],add:{hatch:"M364 178l7 -4 M365 182l8 -5 M365 186l9 -6 M366 190l8 -6 M365 194l8 -6"},evidence:"Five sloping strokes lie in the band at the right. The lumen leader terminates in this band.",why:"The strokes shade the muscular band. Outline its edges instead. The lumen leader also stops in the wall and should reach the space it encloses."}
      ]
    },
    {
      id:"buccal",name:"Stained cheek epithelium",type:"cell",image:"human-cheek.webp",
      source:"Cheekcells_stained.jpg",author:"Mulletsrokk",licence:"CC BY-SA 3.0",licenceUrl:bysa("3.0"),
      size:[880,660],crop:[261,143,282,196],label:"Nucleus",target:[432,248],
      task:"Draw the upper of the two overlapping central cells. Show its outer contour and its distinct dark nucleus. Leave the lower cell and stain texture out.",
      observation:"The upper cell has an angular upper-left ridge and slopes down towards its broader right side. The dark oval nucleus, slightly right of centre, spans about one seventh of the cell width.",
      paths:{outline:"M369 164 Q382 162 399 176 Q425 188 449 192 Q476 195 496 212 Q505 231 516 259 Q512 275 492 296 Q487 311 460 319 Q437 315 413 304 Q391 293 361 293 Q332 289 311 274 Q297 262 301 246 Q303 223 325 205 Q347 184 369 164Z",nucleus:"M401 246 Q404 238 416 238 Q427 238 432 246 Q434 252 424 256 Q415 260 405 255 Q400 252 401 246Z"},
      model:"The broad angular outline encloses a small sideways oval. The line from the right meets that oval.",
      why:"The nucleus has the width and position of the dark body in the upper cell. A single line picks out this cell where its edge overlaps its neighbour.",
      clue:"Compare the width of the dark body with the whole cell and follow the line identifying it.",
      alternatives:[
        {key:"nucleus-size",defects:[3],replace:{nucleus:"M367 246 Q373 213 412 215 Q454 216 466 243 Q471 268 432 281 Q394 289 375 271 Q365 262 367 246Z"},target:[465,247],evidence:"The inner oval spans almost half the cell width. The leader meets it on the right.",why:"The nucleus occupies almost half the width in the drawing. The dark oval in the upper cell spans only about one seventh. Keep its observed size relative to the cell."},
        {key:"sketch",defects:[0],add:{retrace:"M311 266 Q289 251 312 224 Q329 204 355 182 M309 271 Q295 260 299 241 Q303 225 321 210"},evidence:"Several partly overlapping arcs run beside the upper cell’s left contour.",why:"The left edge of the upper cell is retraced several times. Follow its observed boundary once. The edge of the neighbouring cell is outside the task."}
      ]
    },
    {
      id:"redcell",name:"Fluorescently stained erythrocyte",type:"cell",image:"human-erythrocytes.jpg",
      source:"Sedimented_red_blood_cells.jpg",author:"MDougM",licence:"Public domain",licenceUrl:"https://commons.wikimedia.org/wiki/File:Sedimented_red_blood_cells.jpg#Licensing",
      size:[386,404],crop:[281,202,72,67],label:"Cell outline",target:[334,234],
      task:"Draw the outer contour of the complete cell at the centre of the crop. Record only structures with a distinct boundary in this fluorescent image.",
      scale:{pixels:122,microns:20,draw:5},scaleNote:"The original white bar spans 122 image units for 20 µm.",
      observation:"One elongated cell is fully visible. Its right edge curves inward towards the base. Its interior varies in brightness without a sharply bounded internal body. Its width is about 40 image units.",
      paths:{edge:"M300 220 Q305 214 316 214 Q328 214 332 221 Q336 227 334 234 Q333 247 325 254 Q318 261 308 257 Q298 254 295 244 Q291 234 295 226Z"},
      model:"A single curved outline is slightly taller than wide, with an empty interior. The leader meets its right edge.",
      why:"The visible contour is retained without turning variations in brightness into organelle boundaries. A quarter-length copy of the photographed 20 µm bar represents 5 µm.",
      clue:"Look for a boundary before representing a change in brightness as a separate structure.",
      alternatives:[
        {key:"interior",defects:[2],add:{inner:"M307 232 Q311 227 317 231 Q322 235 317 240 Q311 244 307 239 Q304 235 307 232Z"},evidence:"A small closed oval is enclosed within the cell outline.",why:"No corresponding bounded body is resolved inside this cell. Leave out the inner oval. A mature human erythrocyte has no nucleus."},
        {key:"bar",defects:[5],barLabel:10,evidence:"The bar spans about three quarters of the cell width and reads 10 µm.",why:"This length spans 30.5 source-image units. The original 122-unit bar represents 20 µm, so a quarter of it represents 5 µm. Relabel it or double its length for 10 µm."}
      ]
    }
  ];

  function scaleText(s) {
    return s.scale ? s.scaleNote : "This field has no length calibration. Compare relative dimensions only.";
  }
  const bank = specimens.flatMap(specimen => {
    const model = {key:"outline", defects:[], evidence:specimen.model, why:specimen.why};
    return [model, ...specimen.alternatives].map(variant => ({
      ...variant, id:specimen.id + "." + variant.key, specimen,
      criterion:specimen.task, credit:commons + specimen.source
    }));
  });
  function setFor(round) {
    // The onion comparison is scaffolded. Rotate the other specimens and the
    // local variants so each three sets cover every judgement exactly once.
    const independent = specimens.slice(1);
    const rotated = independent.slice(round % 5).concat(independent.slice(0,round % 5));
    return [specimens[0], ...rotated].map(s => {
      const index = specimens.indexOf(s);
      const variant = (round + index + 1) % 3;
      return bank.find(item => item.specimen === s && item.key === (variant ? s.alternatives[variant - 1].key : "outline"));
    });
  }
  const escape = text => String(text).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll('"',"&quot;");
  function evidence(item, reference) {
    const s = item.specimen;
    if (reference) return s.observation + " " + scaleText(s);
    let description = item.evidence;
    if (s.scale) {
      const length = s.scale.pixels * s.scale.draw / s.scale.microns;
      description += " The line below the drawing spans " + Number(length.toFixed(2)) + " source-image units and is labelled " + (item.barLabel || s.scale.draw) + " µm.";
    }
    return description;
  }
  function svg(item, reference = false) {
    const s = item.specimen, [x,y,w,h] = s.crop;
    const width = 300, height = width * h / w, total = height + (s.scale ? 49 : 13);
    const ratio = width / w, title = (reference ? "Observation of " : "Drawing of ") + s.name;
    const outer = '<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + escape(title + ". " + evidence(item,reference)) + '" viewBox="0 0 430 ' + total + '" style="display:block;width:100%;height:auto;background:white;color:#17232c">';
    if (reference) {
      // Match the candidate's linear mapping exactly. The right margin is for labels.
      return outer + '<svg width="300" height="' + height + '" viewBox="' + s.crop.join(" ") + '"><image href="' + field + s.image + '" width="' + s.size[0] + '" height="' + s.size[1] + '"/></svg>' + scaleBar(s,ratio,height,s.scale?.draw) + '</svg>';
    }
    const shapes = {...s.paths, ...item.replace, ...item.add};
    const paths = Object.entries(shapes).filter(([name]) => !(item.omit || []).includes(name)).map(([name,d]) =>
      '<path data-feature="' + name + '" d="' + d + '" vector-effect="non-scaling-stroke"/>').join("");
    const [tx,ty] = item.target || s.target;
    const endX = (tx-x)*ratio, endY = (ty-y)*ratio;
    const startY = endY - (s.leaderRise || 0);
    return outer + '<svg width="300" height="' + height + '" viewBox="' + s.crop.join(" ") + '"><g fill="none" stroke="#18232a" stroke-width="1.25" stroke-linejoin="round" stroke-linecap="round">' + paths +
      '</g></svg><line data-label-line="" x1="304" y1="' + startY + '" x2="' + endX + '" y2="' + endY + '" stroke="#18232a" stroke-width="1"/><text x="309" y="' + (startY+4) + '" font-family="sans-serif" font-size="13">' +
      escape(s.label) + '</text>' + scaleBar(s,ratio,height,item.barLabel || s.scale?.draw) + '</svg>';
  }
  function scaleBar(s,ratio,height,label) {
    if (!s.scale) return "";
    const length = ratio * s.scale.pixels * s.scale.draw / s.scale.microns;
    return '<g fill="#18232a"><rect data-scale-bar="" x="12" y="' + (height+7) + '" width="' + length + '" height="3"/><text x="12" y="' + (height+29) + '" font-family="sans-serif" font-size="15">' + label + ' µm</text></g>';
  }
  window.ALevelDrawingBank = {version:2, bank, categories, specimens, svg, evidence, scaleText, setFor};
})();

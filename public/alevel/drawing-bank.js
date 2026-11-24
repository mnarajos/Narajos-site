/* Contours are in the pixel coordinates of the credited local micrographs. */
(function () {
  "use strict";
  const categories = ["Line quality", "Shading", "Biological detail", "Proportions", "Label line", "Scale"];
  const commons = "https://commons.wikimedia.org/wiki/File:";
  const bysa = version => "https://creativecommons.org/licenses/by-sa/" + version + "/";
  const field = "/assets/micrographs/";
  // Each alternative edits only the named structure, leader or bar in its own specimen.
  const specimens = [
    {
      id: "epidermis", name: "Red onion epidermis", type: "cell", image: "onion-epidermis.webp",
      source: "Cells_from_a_red_onion_epidermal_peel.tif", author: "Adrian J. Hunter", licence: "CC BY-SA 3.0", licenceUrl: bysa("3.0"),
      size: [998,698], crop: [242,70,270,237], label: "Cell wall", target: [461,167],
      drawingTitle: "Wall outline of one red onion epidermal cell",
      annotation: "The line records the position of the wall.",
      task: "Draw the wall outline of the central pink cell and label the wall. Leave neighbouring cells out. Include a title and a calibrated scale bar.",
      scale: {pixels:357, microns:200, draw:50}, scaleNote: "The entire five-segment bar in the full field spans 357 image units and represents 200 µm.",
      observation: "The central cell is a single oblique polygon. Its left and right edges span about 190 image units. The upper-left corner is higher than the upper-right. No separate round body is resolved inside.",
      paths: {wall:"M319 107 C342 108 374 129 399 140 Q437 157 460 152 Q459 165 461 167 Q477 222 468 231 Q461 243 416 277 Q398 280 362 255 Q322 226 289 195 Q278 183 278 169 Q292 140 319 107Z"},
      model: "A single oblique polygon has a rounded lower corner and an unfilled interior. The leader meets the right wall.",
      why: "The wall follows the uneven outline and the interior is left clear. One quarter of the photographed 200 µm bar gives a 50 µm bar.",
      clue: "Follow the leader all the way to its tip. Compare the cell width and the length beside the scale value.",
      alternatives: [
        {key:"leader", defects:[4], target:[423,173], evidence:"A single oblique polygon has a rounded lower corner and an unfilled interior. The leader ends inside the cell, about 38 image units from its right wall.", why:"The cell-wall leader passes the wall and stops inside the cell. Shorten it so its tip touches the wall it names."},
        {key:"bar", defects:[5], barLabel:100, evidence:"A single oblique polygon has a rounded lower corner and an unfilled interior. The leader meets the right wall.", why:"The bar spans 89.25 image units. That is one quarter of the source bar, so it represents 50 µm. A 100 µm bar would need twice this length."}
      ]
    },
    {
      id:"leaf", name:"Tomato leaf transverse section", type:"plan", image:"drawing-tomato-leaf.webp",
      sourceUrl:"https://doi.org/10.3389/fpls.2018.00086", author:"Katja Žanić and colleagues (2018), Figure 2A", licence:"CC BY 4.0", licenceUrl:"https://creativecommons.org/licenses/by/4.0/",
      size:[1095,612], crop:[100,0,430,390], frameWidth:400, label:"Upper epidermis", target:[350,103], labelStart:[220,18],
      drawingTitle:"Tomato leaf: selected tissue boundaries",
      annotation:"The upper epidermis lies above the mesophyll.",
      task:"Make a partial tissue map of this tomato leaf. Show the upper and lower surfaces and the inner edge of the upper epidermis. Label the upper epidermis. Omit individual cells and leaf hairs. Add a title and calibrated scale bar.",
      scale:{pixels:94,microns:50,draw:50}, scaleNote:"The black bar in the full source panel spans 94 image units and represents 50 µm.",
      observation:"The leaf slopes down from left to right. A narrow upper epidermal band lies above elongated palisade cells. The lower surface follows the loosely arranged tissue. Some leaf hairs extend below the surface.",
      paths:{upper:"M100 24 C125 30 141 45 160 49 C184 46 193 49 211 59 C232 66 249 72 270 74 C290 82 311 82 330 91 C354 94 372 107 390 111 C410 116 427 119 447 126 C468 132 487 135 506 138 L530 143",epidermis:"M100 42 C120 48 138 64 159 69 C180 68 194 70 211 79 C232 86 249 92 269 96 C289 103 309 105 330 112 C352 117 372 128 390 132 C410 137 429 140 447 146 C467 150 488 156 506 159 L530 164",lower:"M100 260 C123 266 139 281 158 289 C175 300 188 306 205 316 C225 323 240 334 257 337 C277 336 295 341 313 342 C330 342 348 347 368 347 C390 348 406 350 424 355 C443 361 459 367 478 369 C500 373 515 379 530 381"},
      model:"Three long outlines slope down to the right. The upper two form a narrow band; the lower outline marks the lower surface. The label line enters the narrow upper band from above.",
      why:"The upper epidermis is a narrow band above the rest of the leaf. The two surfaces follow the field, and individual cells and hairs are omitted as requested. The 50 µm bar uses the source calibration.",
      clue:"Compare the thickness of the upper band and the level of detail with the observation.",
      alternatives:[
        {key:"band",defects:[3],replace:{epidermis:"M100 105 C160 115 205 127 250 142 C300 155 350 171 400 184 C450 199 490 209 530 220"}, evidence:"Three long outlines slope down to the right. The upper two form a deep band; the lower outline marks the lower surface. The label line ends within the upper band.",why:"The upper epidermis is a narrow band. This deep band includes much of the elongated tissue below it. Move its inner boundary closer to the upper surface."},
        {key:"cells",defects:[2],add:{partitions:"M163 49L160 69 M192 50L190 71 M220.8 62.3L218.2 81.4 M250.2 70.8L247.4 90.7 M280 77L277 99"},evidence:"Three long outlines slope down to the right. Five short lines divide the narrow upper band into compartments. The label line enters the upper band from above.",why:"The micrograph resolves cells, but this task asks for tissue boundaries. Keep the continuous epidermal band and leave out the partitions between individual cells."}
      ]
    },
    {
      id:"buttercup",name:"Buttercup root transverse section",type:"plan",image:"drawing-buttercup.webp",
      source:"Ranunculus_root.jpg",author:"Jon Houseman (source credited to Jon Houseman and Matthew Ford)",licence:"CC BY-SA 4.0",licenceUrl:bysa("4.0"),
      size:[840,750],crop:[0,0,840,750],label:"Cortex",target:[715,434],scale:{pixels:123,microns:310,draw:310},scaleNote:"The author identifies the original black bar as 0.31 mm. It spans approximately 123 image units here. 0.31 mm equals 310 µm.",
      drawingTitle:"Buttercup root tissue map, transverse section",
      annotation:"The cortex surrounds the vascular cylinder.",
      task:"Map the root surface, central cylinder and xylem as tissue outlines. Label the cortex and annotate its position relative to the vascular tissue. Add a title and calibrated scale bar.",
      observation:"A broad cortex encloses a small approximately circular central cylinder, about one seventh of the root width. Xylem forms a four-armed figure in its centre.",
      paths:{surface:"M399 29 Q469 23 521 57 Q590 76 644 115 Q705 153 733 217 Q759 279 761 350 Q766 428 739 486 Q719 549 674 588 Q642 636 588 655 Q532 691 445 696 Q355 699 291 676 Q220 649 167 611 Q118 578 100 511 L87 480 Q55 419 57 356 Q53 298 80 245 Q108 184 141 159 Q175 106 214 82 Q298 34 399 29Z",cylinder:"M373 374 Q373 347 393 335 Q417 320 440 332 Q463 341 469 365 Q474 393 452 413 Q430 431 406 422 Q375 410 373 386Z",xylem:"M389 347 Q390 342 398 343 Q404 345 408 356 Q411 361 417 357 Q424 353 431 357 Q434 350 440 348 Q450 344 454 350 Q459 357 451 363 Q450 370 439 372 Q434 374 432 378 Q432 383 437 386 Q446 388 449 394 Q452 404 444 406 Q435 408 430 400 Q424 395 417 391 Q413 397 405 397 Q402 405 395 406 Q386 406 386 399 Q384 393 391 388 Q394 381 401 381 Q406 379 406 374 Q405 369 398 365 Q392 362 390 356 Q386 351 389 347Z"},
      model:"A central ring spans about one seventh of the root width and encloses a four-armed figure. The surrounding cortex is unpartitioned. A line from the right enters the root and ends within the cortex.",
      why:"The cylinder is about one seventh as wide as the root and encloses the central xylem. The cortex label ends between cylinder and surface. The scale is carried across at the same ratio.",
      clue:"Compare the width of the central cylinder with that of the whole section.",
      alternatives:[
        {key:"core",defects:[3],replace:{cylinder:"M295 374 C292 294 354 250 426 252 C502 253 551 304 550 378 C548 448 489 502 418 500 C343 498 295 446 295 374Z"},evidence:"A central ring spans about one third of the root width and encloses a four-armed figure. The surrounding cortex is unpartitioned. The leader ends within the cortex.",why:"The ring makes the central cylinder over twice its observed width. Use the small boundary immediately around the xylem and other vascular tissue."},
        {key:"xylem",defects:[2],omit:["xylem"],evidence:"A central ring spans about one seventh of the root width and has a clear interior. The surrounding cortex is unpartitioned. The leader ends within the cortex.",why:"The four arms of xylem can be seen within the cylinder. Include their shared tissue outline without drawing each vessel."}
      ]
    },
    {
      id:"arterial",
      name:"Mouse carotid artery transverse section",
      type:"plan",
      image:"drawing-carotid-control.webp",
      sourceUrl:"https://doi.org/10.3390/ijms262110274",
      author:"Bethan Brown, Helen Williams, Samson Egbulonu, Andrew Bond, Jason Johnson and Sarah George (Figure 1A, young control)",
      licence:"CC BY 4.0",
      licenceUrl:"https://creativecommons.org/licenses/by/4.0/",
      size:[3626,732],
      crop:[380,195,370,410],
      label:"Arterial lumen",
      target:[680,394],
      drawingTitle:"Mouse carotid artery in transverse section",
      annotation:"The medial band surrounds the lumen.",
      task:"Map the inner and outer edges of the dark medial band of the young control artery. Label the lumen, annotate its relationship to the band and add a title and calibrated scale bar. Omit the diffuse pink tissue outside the band.",
      scale:{pixels:164,microns:100,draw:100},
      scaleNote:"The authors specify that the 100 µm bar applies to all four micrographs in Figure 1A. Its dark span measures about 164 source-image units. The field and the bar use that same calibration.",
      observation:"The deep purple band surrounds one open lumen. The right edge turns inwards below the middle and the lower-left edge flattens. The band measures about 30 source-image units at the base. The pale pink tissue outside it has a less distinct edge.",
      paths:{
        band:"M718 380 Q721 394 718 408 Q715 421 705 432 Q695 443 689 454 Q683 465 674 474 Q666 483 666 502 Q665 520 658 536 Q652 552 639 564 Q626 576 610 580 Q594 584 577 582 Q560 580 544 575 Q529 570 514 564 Q500 559 486 552 Q472 546 459 538 Q446 530 440 515 Q434 500 430 486 Q427 471 426 458 Q424 444 424 431 Q425 418 418 406 Q412 394 412 381 Q412 368 414 354 Q415 341 418 328 Q422 314 426 300 Q430 285 440 274 Q451 264 463 256 Q475 247 488 239 Q501 231 516 226 Q530 222 545 222 Q560 223 574 226 Q589 230 602 235 Q616 240 632 240 Q648 241 662 248 Q677 255 690 264 Q703 274 708 290 Q714 305 718 320 Q721 336 718 352 Q716 367 718 380Z",
        lumen:"M700 382 Q702 394 695 406 Q688 417 681 426 Q674 435 667 444 Q660 452 656 461 Q651 470 646 480 Q641 491 638 506 Q634 521 626 536 Q617 550 602 552 Q588 555 574 552 Q560 550 547 546 Q534 542 522 536 Q510 531 498 528 Q485 524 476 515 Q466 506 460 494 Q454 483 454 468 Q455 454 453 444 Q451 434 450 424 Q450 413 447 404 Q444 394 444 384 Q443 373 444 363 Q446 353 450 342 Q453 332 456 320 Q459 309 466 299 Q472 289 480 280 Q489 272 500 266 Q511 261 523 258 Q535 254 548 254 Q560 254 572 257 Q584 260 596 262 Q607 264 619 268 Q631 271 642 276 Q654 281 667 287 Q680 293 687 304 Q694 316 695 330 Q696 344 698 357 Q699 370 700 382Z"
      },
      model:"Two closed, unfilled contours enclose a narrow band around an irregular lumen. The gap between the contours at the base is about 30 source-image units. The lower right curves inwards. A line from the right passes through the wall and ends just inside the lumen.",
      why:"The two contours follow the dark band, including the inward bend below the middle on the right. The leader ends in the lumen. The title and calibrated bar identify the preparation and its size.",
      clue:"Compare the thickness of the band across the bottom. Follow the lumen label to its tip.",
      alternatives:[
        {
          key:"rim", defects:[3],
          replace:{lumen:"M713 381 Q715 394 711 407 Q707 420 698 430 Q689 441 682 451 Q676 461 669 470 Q662 479 660 495 Q658 511 652 527 Q647 543 635 556 Q623 568 608 572 Q592 575 576 573 Q560 571 545 566 Q530 562 516 556 Q503 551 490 545 Q476 539 464 531 Q452 523 446 509 Q440 495 438 480 Q435 466 434 454 Q432 441 432 428 Q432 416 427 405 Q422 394 422 382 Q421 370 422 358 Q424 345 428 332 Q431 319 435 306 Q439 292 448 282 Q457 272 468 263 Q479 254 492 247 Q504 240 518 236 Q532 232 546 232 Q560 232 574 236 Q588 239 600 243 Q613 247 628 248 Q643 250 656 256 Q670 263 683 272 Q696 280 702 294 Q708 308 711 323 Q714 338 712 353 Q711 368 713 381Z"},
          evidence:"Two closed contours enclose a very narrow band. The gap between the contours at the base is about nine source-image units. A line ends in the central space.",
          why:"Enlarging the lumen has reduced the band to around a third of its observed thickness at the base. Move its inner edge back to the inner boundary of the dark stain."
        },
        {
          key:"hatch", defects:[1],
          add:{hatch:"M527 551l-9 11 M538 554l-10 13 M549 556l-10 13 M560 557l-10 13 M571 555l-10 13"},
          evidence:"Five slanting strokes lie within the lower band. A line from the right passes through the wall and ends just inside the lumen.",
          why:"The hatching adds shading to a band whose two boundaries are already shown. Leave its interior unshaded. The lumen label ends within the lumen."
        }
      ]
    },
    {
      id:"buccal", name:"Feulgen-stained human cheek epithelial cell", type:"cell", image:"buccal-feulgen.webp",
      sourceUrl:"https://doi.org/10.21203/rs.3.rs-7919116/v1", author:"Samah Abd-Elrahim Batran and colleagues (figure 5a)", licence:"CC BY 4.0", licenceUrl:"https://creativecommons.org/licenses/by/4.0/",
      size:[620,634], crop:[0,0,620,634], frameWidth:390, label:"Nucleus", target:[339,289],
      drawingTitle:"Feulgen-stained human cheek cell",
      annotation:"Feulgen staining distinguishes the nucleus.",
      task:"Draw the whole control cheek cell. Outline its edge and its stained nucleus, and identify the nucleus. Add a title and a scale bar using the calibration from the source photograph.",
      scale:{pixels:198,microns:20,draw:10}, scaleNote:"The original black bar at the bottom right of panel a spans 198 units of this image. The authors identify it as 20 µm. The shorter reference bar below the photograph represents 10 µm.",
      observation:"A single pink cell slopes from a narrow upper-left corner to a broad rounded lower edge. A darker, nearly round body lies a little above the middle. It spans about 95 source-image units across, compared with about 570 for the whole cell. Gradual changes in stain intensity have no distinct internal boundaries.",
      paths:{
        outline:"M88 35 Q104 31 118 47 Q129 57 145 61 Q152 60 157 78 Q171 99 197 103 Q228 115 260 122 Q279 126 308 119 Q348 113 380 123 Q416 134 447 150 Q471 162 483 185 Q501 219 517 245 Q534 271 554 287 Q581 320 594 346 Q596 357 589 368 Q591 385 579 406 Q563 431 560 445 Q545 467 523 484 Q505 505 490 524 Q472 541 460 549 Q436 575 413 586 Q390 601 356 594 Q327 589 307 583 Q282 578 264 582 Q235 580 211 562 Q188 543 182 534 Q169 529 164 534 Q158 530 164 519 Q164 507 150 499 Q131 486 115 464 Q88 444 75 426 Q64 407 61 388 Q57 375 54 365 Q60 347 48 331 Q32 310 35 297 Q41 275 32 244 Q24 220 21 205 Q17 171 31 134 Q34 117 47 102 Q58 82 70 61 Q79 46 88 35Z",
        nucleus:"M244 279 Q245 264 260 250 Q271 236 291 237 Q309 235 321 249 Q338 261 339 279 Q340 286 339 289 Q342 305 328 318 Q316 331 297 331 Q278 332 263 319 Q246 306 244 288Z"
      },
      model:"An irregular, broad cell encloses a nearly round oval slightly above its centre. The nucleus spans about one sixth of the cell width. A line from the label outside the cell enters the cell and touches the nucleus on its right.",
      why:"The cell edge and nucleus each have a single outline. Differences in stain intensity do not establish further boundaries. The nucleus is about 96 image units wide against approximately 570 for the cell. The 10 µm bar is half the source bar’s length.",
      clue:"Compare the dark body’s width with the whole cell. Follow the cell’s left edge and the line identifying the nucleus.",
      alternatives:[
        {key:"nucleus-size",defects:[3],replace:{nucleus:"M163 280 C161 209 218 156 289 157 C361 155 424 212 424 286 C424 359 365 414 292 414 C221 414 162 359 163 280Z"},target:[424,286],evidence:"A broad cell encloses an oval almost half the cell’s width. A line from outside the cell touches the oval on its right.",why:"The nucleus has been enlarged to nearly half the cell width. The observed nucleus spans only about one sixth of that width."},
        {key:"sketch",defects:[0],add:{retrace:"M61 90 Q23 133 27 197 Q28 224 42 249 M51 95 Q15 150 15 190 Q13 215 30 249"},evidence:"Three partly overlapping strokes follow the cell’s upper-left edge. A nearly round nucleus spans about one sixth of the cell width. A line from outside the cell touches the nucleus on its right.",why:"Several strokes compete to mark the same left edge. Use a single continuous outline to show where the cell ends."}
      ]
    },
    {
      id:"redcell",name:"Human erythrocyte in a blood preparation",type:"cell",image:"drawing-human-control.webp",
      sourceUrl:"https://doi.org/10.3390/hemato4010009",author:"Sajee Alummoottil and colleagues (2023), Figure 1A",licence:"CC BY 4.0",licenceUrl:"https://creativecommons.org/licenses/by/4.0/",
      size:[1026,703],crop:[145,0,125,115],label:"Cell outline",target:[255,60],
      drawingTitle:"Outer contour of a human erythrocyte",
      task:"Draw the complete central cell. Label its outline and include any internal structure with a distinct boundary. Add a title and calibrated scale bar.",
      scale:{pixels:128,microns:10,draw:5},scaleNote:"The black bar in the full source panel spans approximately 128 image units for 10 µm. The shorter reference bar represents 5 µm.",
      observation:"One rounded cell is fully visible. Its centre is paler than its rim, but the change in colour has no sharp enclosed boundary. The cell is roughly 90 image units across.",
      paths:{edge:"M166 60 C165 38 182 21 204 19 C227 17 250 31 255 53 C260 75 246 95 223 100 C201 105 179 94 170 78 C167 72 166 66 166 60Z"},
      model:"A rounded outline encloses an empty interior. The leader meets its right edge.",
      why:"The visible contour is retained without turning the pale centre into a separately bounded organelle. Half of the source’s 10 µm bar represents 5 µm.",
      clue:"Look for a boundary before representing a change in brightness as a separate structure.",
      alternatives:[
        {key:"interior",defects:[2],add:{inner:"M195 55 Q203 44 214 47 Q226 49 229 60 Q230 71 218 76 Q207 81 197 73 Q190 67 195 55Z"},evidence:"A rounded outline encloses a small closed oval. The leader meets the outer right edge.",why:"The pale centre has no sharp enclosing boundary in the observation. Do not draw it as a separate organelle. A mature human erythrocyte has no nucleus."},
        {key:"bar",defects:[5],barLabel:10,evidence:"A rounded outline has an empty interior. The leader meets its right edge.",why:"The bar spans 64 source-image units. The original 128-unit bar represents 10 µm, so half of it represents 5 µm. Relabel it or double its length for 10 µm."}
      ]
    }
  ];

  function scaleText(s) {
    return s.scale ? s.scaleNote : "This field has no length calibration. Compare relative dimensions only.";
  }
  // Coordinates enclose the specific comparison area in native photo units.
  // Scale-bar feedback uses the measured bar rectangle below the field.
  const cues = {
    "epidermis.leader":[[410,143,68,48],"Compare where the line ends with the visible right wall."],
    "epidermis.bar":[null,"Compare the printed value with one quarter of the original bar."],
    "leaf.band":[[125,30,350,190],"Compare the upper epidermal band with the narrow band in the photograph."],
    "leaf.cells":[[150,45,145,65],"Decide which boundaries belong in a tissue map."],
    "buttercup.core":[[280,243,280,269],"Compare the diameter of the central cylinder with the root diameter."],
    "buttercup.xylem":[[368,325,108,104],"Trace the tissue shape within the central cylinder."],
    "arterial.rim":[[500,535,102,57],"Compare the band thickness at the base."],
    "arterial.hatch":[[510,540,75,45],"Inspect the lower band for shading."],
    "buccal.nucleus-size":[[153,146,278,276],"Compare nucleus width with the cell’s width."],
    "buccal.sketch":[[8,73,75,186],"Follow the left contour of the cell, one stroke at a time."],
    "redcell.interior":[[190,42,45,42],"Look for a bounded body at the same position in the observation."],
    "redcell.bar":[null,"Use the ratio of the drawing bar to the source’s 10 µm bar."]
  };
  const bank = specimens.flatMap(specimen => {
    const model = {key:"outline", defects:[], evidence:specimen.model, why:specimen.why};
    return [model, ...specimen.alternatives].map(variant => ({
      ...variant, id:specimen.id + "." + variant.key, specimen,
      scope:specimen.focus ? "focused" : "complete", focus:specimen.focus, allowedCategories:specimen.allowedCategories,
      why:variant.why + (specimen.focus ? " Absolute scale cannot be checked in this field. This judgement covers only the named focus." : ""),
      criterion:specimen.task, credit:specimen.sourceUrl || commons + specimen.source
    }));
  });
  function setFor(round) {
    // Begin with a guided cell-wall judgement, then practise other cell
    // conventions before moving to the three tissue maps. Each three sets
    // cover every local variant exactly once.
    const order = [specimens[0], specimens[4], specimens[5], specimens[1], specimens[2], specimens[3]];
    return order.map(s => {
      const index = specimens.indexOf(s);
      const variant = (round + index + 1) % 3;
      return bank.find(item => item.specimen === s && item.key === (variant ? s.alternatives[variant - 1].key : "outline"));
    });
  }
  const escape = text => String(text).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll('"',"&quot;");
  function evidence(item, reference) {
    const s = item.specimen;
    if (reference) return s.observation + " " + scaleText(s);
    let description = item.evidence + ' The title reads “' + s.drawingTitle + '”.';
    if (s.annotation) description += ' The annotation reads “' + s.annotation + '”.';
    if (s.scale) {
      const length = s.scale.pixels * s.scale.draw / s.scale.microns;
      description += " The line below the drawing spans " + Number(length.toFixed(2)) + " source-image units and is labelled " + (item.barLabel || s.scale.draw) + " µm.";
    }
    return description;
  }
  function svg(item, reference = false, highlight = false) {
    const s = item.specimen, [x,y,w,h] = s.crop;
    const width = 300, height = width * h / w;
    const titleY = height + (s.scale ? 53 : 26), total = titleY + (s.annotation ? 32 : 12);
    const ratio = width / w, title = (reference ? "Observation of " : "Drawing of ") + s.name;
    const outer = '<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + escape(title + ". " + evidence(item,reference)) + '" viewBox="0 0 ' + (s.frameWidth || 430) + ' ' + total + '" style="display:block;width:100%;height:auto;background:white;color:#17232c">';
    // Site-wide SVG rules must not resize this nested coordinate viewport:
    // its 300-unit width is also used for the label and scale calculations.
    const inner = '<svg width="300" height="' + height + '" viewBox="' + s.crop.join(" ") + '" style="width:300px;height:' + height + 'px;max-width:none;margin:0">';
    if (reference) {
      // Match the candidate's linear mapping exactly. The right margin is for labels.
      return outer + inner + '<image href="' + field + s.image + '" width="' + s.size[0] + '" height="' + s.size[1] + '"/></svg>' + scaleBar(s,ratio,height,s.scale?.draw) + '</svg>';
    }
    const caption = '<text data-drawing-title="" x="12" y="' + titleY + '" font-family="sans-serif" font-size="14" font-weight="600">' + escape(s.drawingTitle) + '</text>'
      + (s.annotation ? '<text data-drawing-annotation="" x="12" y="' + (titleY+20) + '" font-family="sans-serif" font-size="13">' + escape(s.annotation) + '</text>' : "");
    const shapes = {...s.paths, ...item.replace, ...item.add};
    const paths = Object.entries(shapes).filter(([name]) => !(item.omit || []).includes(name)).map(([name,d]) =>
      '<path data-feature="' + name + '" d="' + d + '" vector-effect="non-scaling-stroke"/>').join("");
    const [tx,ty] = item.target || s.target;
    const endX = (tx-x)*ratio, endY = (ty-y)*ratio;
    const [startX,startY] = item.labelStart || s.labelStart || [304,endY];
    let guide = "";
    if (highlight && cues[item.id]) {
      const box = cues[item.id][0];
      const [left,top,wide,tall] = box
        ? [(box[0]-x)*ratio,(box[1]-y)*ratio,box[2]*ratio,box[3]*ratio]
        : [7,height+2,ratio*s.scale.pixels*s.scale.draw/s.scale.microns+11,34];
      guide = '<rect data-defect-overlay="" aria-hidden="true" x="'+left+'" y="'+top+'" width="'+wide+'" height="'+tall+'" fill="none" stroke="#364c60" stroke-dasharray="4 3" stroke-width="1.5"/>';
    }
    return outer + inner + '<g fill="none" stroke="#18232a" stroke-width="1.25" stroke-linejoin="round" stroke-linecap="round">' + paths +
      '</g></svg><line data-label-line="" x1="' + startX + '" y1="' + startY + '" x2="' + endX + '" y2="' + endY + '" stroke="#18232a" stroke-width="1"/><text x="' + (startX+5) + '" y="' + (startY+4) + '" font-family="sans-serif" font-size="13">' +
      escape(s.label) + '</text>' + scaleBar(s,ratio,height,item.barLabel || s.scale?.draw) + caption + guide + '</svg>';
  }
  function scaleBar(s,ratio,height,label) {
    if (!s.scale) return "";
    const length = ratio * s.scale.pixels * s.scale.draw / s.scale.microns;
    return '<g fill="#18232a"><rect data-scale-bar="" x="12" y="' + (height+7) + '" width="' + length + '" height="3"/><text x="12" y="' + (height+29) + '" font-family="sans-serif" font-size="15">' + label + ' µm</text></g>';
  }
  // The same source coordinates show the small vascular cylinder at a useful
  // size in both panels. This is a detail, not a second scale-bar comparison.
  function vascularDetail(item, reference = false) {
    const s = item.specimen;
    if (s.id !== "buttercup") return "";
    const crop = "280 240 280 280";
    const title = reference ? "Vascular region in the observation" : "Vascular region in the candidate";
    const content = reference
      ? '<image href="' + field + s.image + '" width="' + s.size[0] + '" height="' + s.size[1] + '"/>'
      : '<g fill="none" stroke="#18232a" stroke-width="1.25" vector-effect="non-scaling-stroke">' +
        Object.entries({...s.paths, ...item.replace, ...item.add}).filter(([name]) => !(item.omit || []).includes(name))
          .map(([name,d]) => '<path data-feature="' + name + '" d="' + d + '"/>').join("") + '</g>';
    const description = title + ". " + (reference ? s.observation : item.evidence);
    return '<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + escape(description) + '" viewBox="' + crop + '" style="display:block;width:100%;height:auto;background:white">' + content + '</svg>';
  }
  // A neighbouring cell from the full onion field is reserved for paper work.
  const paperSpecimen = {...specimens[0], name:"A neighbouring onion cell", crop:[437,72,214,224],
    label:"Cell wall", target:[616,201],
    drawingTitle:"Wall outline of a red onion epidermal cell", annotation:"No internal structure has a distinct visible boundary.",
    task:"On paper, draw the one complete central cell. Preserve its wall shape, label the wall, add an explanatory title and construct a 50 µm scale bar.",
    observation:"The central cell is taller than it is wide. Its left edge bends inwards near the upper third. Three wall junctions are visible towards the base. Its widest span is about 160 source-image units.",
    paths:{wall:"M492 96 Q528 98 580 116 Q588 115 590 125 Q600 158 616 201 L622 224 Q597 235 571 263 Q559 270 542 263 Q500 250 470 232 Q475 215 467 186 Q458 159 461 151 Q479 126 492 96Z"}};
  const paper = {specimen:paperSpecimen,credit:commons+paperSpecimen.source,
    evidence:"An irregular, upright polygon with a narrow lower-right corner. Its leader meets the right wall."};
  window.ALevelDrawingBank = {version:4, bank, categories, specimens, cues, paper, svg, vascularDetail, evidence, scaleText, setFor};
})();

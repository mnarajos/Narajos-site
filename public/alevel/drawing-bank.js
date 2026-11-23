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
      id:"privet", name:"Privet leaf transverse section", type:"plan", image:"drawing-privet.webp",
      source:"Angiosperm_Morphology_The_Mesophytic_Dicotyledonous_Leaf_of_Ligustrum_(36845190976).jpg", author:"Berkshire Community College Bioscience Image Library", licence:"CC0", licenceUrl:"https://creativecommons.org/publicdomain/zero/1.0/",
      size:[950,536], crop:[250,23,540,486], label:"Upper surface", target:[548,129], labelStart:[199,13],
      drawingTitle:"Selected tissue boundaries in a privet leaf midrib",
      focus:"Tissue boundaries, relative thickness and level of detail", allowedCategories:[2,3],
      task:"Make a partial tissue map across the midrib. Show the two surfaces, the inner edge of the upper epidermis and the outline of the main vascular bundle. Label the upper surface and stop at the field edges.",
      observation:"The upper surface dips above the midrib. A thin epidermal band follows it. The lower surface bulges down. The compact oval bundle lies inside that bulge and spans about two fifths of the field width.",
      paths:{upper:"M250 66 Q330 77 378 89 Q441 105 484 129 Q512 146 548 129 Q615 100 662 90 Q733 70 790 58",epidermis:"M250 87 Q321 96 375 110 Q428 122 477 148 Q512 167 548 147 Q605 120 664 111 Q730 89 790 81",lower:"M250 425 Q299 446 352 452 Q410 462 455 484 Q510 499 570 482 Q621 471 657 445 Q704 434 728 417 Q751 397 763 373 Q770 389 790 384",bundle:"M414 245 C429 210 461 197 498 196 Q559 188 598 219 Q630 244 626 278 Q624 315 598 335 Q571 357 530 362 Q471 356 441 332 Q400 300 414 245Z"},
      model:"An uninterrupted narrow band follows the dip. An oval near the centre spans about two fifths of the field width. The lower edge bulges below it. The leader touches the upper surface.",
      why:"The dip, thin upper band and oval bundle are retained at their observed positions. Individual cell outlines are unnecessary in this partial tissue map.",
      clue:"Track the band thickness from the field edge down into the dip.",
      alternatives:[
        {key:"band",defects:[3],replace:{epidermis:"M250 139 Q352 149 421 163 Q500 187 543 169 Q668 129 790 130"}, evidence:"An uninterrupted deep band follows the dip and occupies about one fifth of the section depth near the right edge. An oval near the centre spans about two fifths of the field width. The lower edge bulges below it. The leader touches the upper surface.",why:"The upper epidermis is only a narrow band. The inner boundary here includes much of the elongated tissue below it. Move that boundary closer to the upper surface."},
        {key:"cells",defects:[2],add:{partitions:"M268 69L263 89 M291 72L286 92 M315 76L311 96 M337 81L333 99 M359 85L354 105"},evidence:"A narrow band follows the dip. Five short lines divide its left end into compartments. An oval near the centre spans about two fifths of the field width. The lower edge bulges below it. The leader touches the upper surface.",why:"The micrograph resolves cells, but this task asks for tissue boundaries. Keep the continuous epidermal band and leave out the partitions between cells."}
      ]
    },
    {
      id:"buttercup",name:"Buttercup root transverse section",type:"plan",image:"drawing-buttercup.webp",
      source:"Ranunculus_root.jpg",author:"Jon Houseman (source credited to Jon Houseman and Matthew Ford)",licence:"CC BY-SA 4.0",licenceUrl:bysa("4.0"),
      size:[840,750],crop:[0,0,840,750],label:"Cortex",target:[565,434],labelStart:[213,155],scale:{pixels:123,microns:310,draw:310},scaleNote:"The author identifies the original black bar as 0.31 mm. It spans approximately 123 image units here. 0.31 mm equals 310 µm.",
      drawingTitle:"Tissue map of a buttercup root in transverse section",
      annotation:"The cortex surrounds the vascular cylinder.",
      task:"Map the root surface, central cylinder and xylem as tissue outlines. Label the cortex and annotate its position relative to the vascular tissue. Add a title and calibrated scale bar.",
      observation:"A broad cortex encloses a small approximately circular central cylinder, about one seventh of the root width. Xylem forms a four-armed figure in its centre.",
      paths:{surface:"M399 29 Q469 23 521 57 Q590 76 644 115 Q705 153 733 217 Q759 279 761 350 Q766 428 739 486 Q719 549 674 588 Q642 636 588 655 Q532 691 445 696 Q355 699 291 676 Q220 649 167 611 Q118 578 100 511 L87 480 Q55 419 57 356 Q53 298 80 245 Q108 184 141 159 Q175 106 214 82 Q298 34 399 29Z",cylinder:"M373 374 Q373 347 393 335 Q417 320 440 332 Q463 341 469 365 Q474 393 452 413 Q430 431 406 422 Q375 410 373 386Z",xylem:"M389 347 Q390 342 398 343 Q404 345 408 356 Q411 361 417 357 Q424 353 431 357 Q434 350 440 348 Q450 344 454 350 Q459 357 451 363 Q450 370 439 372 Q434 374 432 378 Q432 383 437 386 Q446 388 449 394 Q452 404 444 406 Q435 408 430 400 Q424 395 417 391 Q413 397 405 397 Q402 405 395 406 Q386 406 386 399 Q384 393 391 388 Q394 381 401 381 Q406 379 406 374 Q405 369 398 365 Q392 362 390 356 Q386 351 389 347Z"},
      model:"A central ring spans about one seventh of the root width and encloses a four-armed figure. The surrounding cortex is unpartitioned. The leader ends within the cortex.",
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
      crop:[310,145,515,515],
      label:"Arterial lumen",
      target:[505,394],
      labelStart:[124,145.05],
      drawingTitle:"Medial band and lumen of a mouse carotid artery (T.S.)",
      annotation:"The medial band surrounds the lumen.",
      task:"Map the inner and outer edges of the dark medial band of the young control artery. Label the lumen, annotate its relationship to the band and add a title and calibrated scale bar. Omit the diffuse pink tissue outside the band.",
      scale:{pixels:164,microns:100,draw:100},
      scaleNote:"The authors specify that the 100 µm bar applies to all four micrographs in Figure 1A. Its dark span measures about 164 source-image units. The field and the bar use that same calibration.",
      observation:"The deep purple band surrounds one open lumen. The right edge turns inwards below the middle and the lower-left edge flattens. The band measures about 30 source-image units at the base. The pale pink tissue outside it has a less distinct edge.",
      paths:{
        band:"M718 380 Q721 394 718 408 Q715 421 705 432 Q695 443 689 454 Q683 465 674 474 Q666 483 666 502 Q665 520 658 536 Q652 552 639 564 Q626 576 610 580 Q594 584 577 582 Q560 580 544 575 Q529 570 514 564 Q500 559 486 552 Q472 546 459 538 Q446 530 440 515 Q434 500 430 486 Q427 471 426 458 Q424 444 424 431 Q425 418 418 406 Q412 394 412 381 Q412 368 414 354 Q415 341 418 328 Q422 314 426 300 Q430 285 440 274 Q451 264 463 256 Q475 247 488 239 Q501 231 516 226 Q530 222 545 222 Q560 223 574 226 Q589 230 602 235 Q616 240 632 240 Q648 241 662 248 Q677 255 690 264 Q703 274 708 290 Q714 305 718 320 Q721 336 718 352 Q716 367 718 380Z",
        lumen:"M700 382 Q702 394 695 406 Q688 417 681 426 Q674 435 667 444 Q660 452 656 461 Q651 470 646 480 Q641 491 638 506 Q634 521 626 536 Q617 550 602 552 Q588 555 574 552 Q560 550 547 546 Q534 542 522 536 Q510 531 498 528 Q485 524 476 515 Q466 506 460 494 Q454 483 454 468 Q455 454 453 444 Q451 434 450 424 Q450 413 447 404 Q444 394 444 384 Q443 373 444 363 Q446 353 450 342 Q453 332 456 320 Q459 309 466 299 Q472 289 480 280 Q489 272 500 266 Q511 261 523 258 Q535 254 548 254 Q560 254 572 257 Q584 260 596 262 Q607 264 619 268 Q631 271 642 276 Q654 281 667 287 Q680 293 687 304 Q694 316 695 330 Q696 344 698 357 Q699 370 700 382Z"
      },
      model:"Two closed, unfilled contours enclose a single narrow band around an irregular lumen. The gap between the contours at the base is about 30 source-image units. The lower right curves inwards. The label line ends in the open space.",
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
          key:"hatch-tip", defects:[1,4], target:[431,394],
          add:{hatch:"M527 551l-9 11 M538 554l-10 13 M549 556l-10 13 M560 557l-10 13 M571 555l-10 13"},
          evidence:"Five slanting strokes lie within the lower band. The lumen leader ends between the two contours on the left.",
          why:"The hatching adds shading to a band whose two boundaries are already shown. Leave its interior unshaded. The lumen label extends into the medial band. Shorten its line so the tip stays within the lumen."
        }
      ]
    },
    {
      id:"buccal", name:"Feulgen-stained human cheek epithelial cell", type:"cell", image:"buccal-feulgen.webp",
      sourceUrl:"https://doi.org/10.21203/rs.3.rs-7919116/v1", author:"Samah Abd-Elrahim Batran and colleagues (figure 5a)", licence:"CC BY 4.0", licenceUrl:"https://creativecommons.org/licenses/by/4.0/",
      size:[620,634], crop:[0,0,620,634], label:"Nucleus", target:[339,289], labelStart:[187,139.84],
      drawingTitle:"Outline and nucleus of a Feulgen-stained human cheek cell",
      annotation:"Feulgen staining distinguishes the nucleus.",
      task:"Draw the whole control cheek cell. Outline its edge and its stained nucleus, and identify the nucleus. Add a title and a scale bar using the calibration from the source photograph.",
      scale:{pixels:198,microns:20,draw:10}, scaleNote:"The original black bar at the bottom right of panel a spans 198 units of this image. The authors identify it as 20 µm. The shorter reference bar below the photograph represents 10 µm.",
      observation:"A single pink cell slopes from a narrow upper-left corner to a broad rounded lower edge. A darker, nearly round body lies a little above the middle. It spans about 95 source-image units across, compared with about 570 for the whole cell. Gradual changes in stain intensity have no distinct internal boundaries.",
      paths:{
        outline:"M88 35 Q104 31 118 47 Q129 57 145 61 Q152 60 157 78 Q171 99 197 103 Q228 115 260 122 Q279 126 308 119 Q348 113 380 123 Q416 134 447 150 Q471 162 483 185 Q501 219 517 245 Q534 271 554 287 Q581 320 594 346 Q596 357 589 368 Q591 385 579 406 Q563 431 560 445 Q545 467 523 484 Q505 505 490 524 Q472 541 460 549 Q436 575 413 586 Q390 601 356 594 Q327 589 307 583 Q282 578 264 582 Q235 580 211 562 Q188 543 182 534 Q169 529 164 534 Q158 530 164 519 Q164 507 150 499 Q131 486 115 464 Q88 444 75 426 Q64 407 61 388 Q57 375 54 365 Q60 347 48 331 Q32 310 35 297 Q41 275 32 244 Q24 220 21 205 Q17 171 31 134 Q34 117 47 102 Q58 82 70 61 Q79 46 88 35Z",
        nucleus:"M244 279 Q245 264 260 250 Q271 236 291 237 Q309 235 321 249 Q338 261 339 279 Q340 286 339 289 Q342 305 328 318 Q316 331 297 331 Q278 332 263 319 Q246 306 244 288Z"
      },
      model:"An irregular, broad cell encloses a nearly round oval slightly above its centre. The nucleus spans about one sixth of the cell width. A short line in the clear interior touches the oval on its right.",
      why:"The cell edge and nucleus each have a single outline. Differences in stain intensity do not establish further boundaries. The nucleus is about 96 image units wide against approximately 570 for the cell. The 10 µm bar is half the source bar’s length.",
      clue:"Compare the dark body’s width with the whole cell. Follow the cell’s left edge and the line identifying the nucleus.",
      alternatives:[
        {key:"nucleus-size",defects:[3],replace:{nucleus:"M163 280 C161 209 218 156 289 157 C361 155 424 212 424 286 C424 359 365 414 292 414 C221 414 162 359 163 280Z"},target:[292,414],labelStart:[160,223],evidence:"A broad cell encloses an oval almost half the cell’s width. A short line touches the oval at its base.",why:"The nucleus has been enlarged to nearly half the cell width. The observed nucleus spans only about one sixth of that width."},
        {key:"sketch",defects:[0],add:{retrace:"M61 90 Q23 133 27 197 Q28 224 42 249 M51 95 Q15 150 15 190 Q13 215 30 249"},evidence:"Three partly overlapping strokes follow the cell’s upper-left edge. A nearly round nucleus spans about one sixth of the cell width. A short line touches its right edge.",why:"Several strokes compete to mark the same left edge. Use a single continuous outline to show where the cell ends."}
      ]
    },
    {
      id:"redcell",name:"Fluorescently stained erythrocyte",type:"cell",image:"human-erythrocytes.jpg",
      source:"Sedimented_red_blood_cells.jpg",author:"MDougM",licence:"Public domain",licenceUrl:"https://commons.wikimedia.org/wiki/File:Sedimented_red_blood_cells.jpg#Licensing",
      size:[386,404],crop:[281,202,72,67],label:"Cell outline",target:[334,234],
      drawingTitle:"Outer contour of a human erythrocyte in a blood sample",
      task:"Draw the complete central cell. Label its outline and include any internal structure with a distinct boundary. Add a title and calibrated scale bar.",
      scale:{pixels:122,microns:20,draw:5},scaleNote:"The original white bar spans 122 image units for 20 µm.",
      observation:"One elongated cell is fully visible. Its right edge curves inward towards the base. Its interior varies in brightness without a sharply bounded internal body. Its width is about 40 image units.",
      paths:{edge:"M300 220 Q305 214 316 214 Q328 214 332 221 Q336 227 334 234 Q333 247 325 254 Q318 261 308 257 Q298 254 295 244 Q291 234 295 226Z"},
      model:"A curved outline is slightly taller than wide. Its interior is empty. The leader meets its right edge.",
      why:"The visible contour is retained without turning variations in brightness into organelle boundaries. A quarter-length copy of the photographed 20 µm bar represents 5 µm.",
      clue:"Look for a boundary before representing a change in brightness as a separate structure.",
      alternatives:[
        {key:"interior",defects:[2],add:{inner:"M307 232 Q311 227 317 231 Q322 235 317 240 Q311 244 307 239 Q304 235 307 232Z"},evidence:"A curved outline is slightly taller than wide. Its interior encloses a small closed oval. The leader meets the outer right edge.",why:"No corresponding bounded body is resolved inside this cell. Leave out the inner oval. A mature human erythrocyte has no nucleus."},
        {key:"bar",defects:[5],barLabel:10,evidence:"A curved outline is slightly taller than wide. Its interior is empty. The leader meets its right edge.",why:"This length spans 30.5 source-image units. The original 122-unit bar represents 20 µm, so a quarter of it represents 5 µm. Relabel it or double its length for 10 µm."}
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
    "privet.band":[[269,62,160,111],"Trace the inner edge of the upper epidermis on the left."],
    "privet.cells":[[255,58,122,58],"Decide which boundaries belong in a tissue map."],
    "buttercup.core":[[280,243,280,269],"Compare the diameter of the central cylinder with the root diameter."],
    "buttercup.xylem":[[368,325,108,104],"Trace the tissue shape within the central cylinder."],
    "arterial.rim":[[500,535,102,57],"Compare the band thickness at the base."],
    "arterial.hatch-tip":[[415,377,178,209],"Inspect the lower band and the endpoint of the lumen label."],
    "buccal.nucleus-size":[[153,146,278,276],"Compare nucleus width with the cell’s width."],
    "buccal.sketch":[[8,73,75,186],"Follow the left contour of the cell, one stroke at a time."],
    "redcell.interior":[[303,226,20,18],"Look for a bounded body at the same position in the observation."],
    "redcell.bar":[null,"Use the ratio of the drawing bar to the source’s 20 µm bar."]
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
    const outer = '<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + escape(title + ". " + evidence(item,reference)) + '" viewBox="0 0 430 ' + total + '" style="display:block;width:100%;height:auto;background:white;color:#17232c">';
    if (reference) {
      // Match the candidate's linear mapping exactly. The right margin is for labels.
      return outer + '<svg width="300" height="' + height + '" viewBox="' + s.crop.join(" ") + '"><image href="' + field + s.image + '" width="' + s.size[0] + '" height="' + s.size[1] + '"/></svg>' + scaleBar(s,ratio,height,s.scale?.draw) + '</svg>';
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
    return outer + '<svg width="300" height="' + height + '" viewBox="' + s.crop.join(" ") + '"><g fill="none" stroke="#18232a" stroke-width="1.25" stroke-linejoin="round" stroke-linecap="round">' + paths +
      '</g></svg><line data-label-line="" x1="' + startX + '" y1="' + startY + '" x2="' + endX + '" y2="' + endY + '" stroke="#18232a" stroke-width="1"/><text x="' + (startX+5) + '" y="' + (startY+4) + '" font-family="sans-serif" font-size="13">' +
      escape(s.label) + '</text>' + scaleBar(s,ratio,height,item.barLabel || s.scale?.draw) + caption + guide + '</svg>';
  }
  function scaleBar(s,ratio,height,label) {
    if (!s.scale) return "";
    const length = ratio * s.scale.pixels * s.scale.draw / s.scale.microns;
    return '<g fill="#18232a"><rect data-scale-bar="" x="12" y="' + (height+7) + '" width="' + length + '" height="3"/><text x="12" y="' + (height+29) + '" font-family="sans-serif" font-size="15">' + label + ' µm</text></g>';
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
  window.ALevelDrawingBank = {version:3, bank, categories, specimens, cues, paper, svg, evidence, scaleText, setFor};
})();

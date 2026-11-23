# Batch 15 implementation report

The [interface audit](website-batch-15-audit.md) records the baseline and recommendations. Batches 10–14 were already merged. A-level Batch 9 was reconciled and merged in [PR 60](https://github.com/mnarajos/Narajos-site/pull/60), including the original commits and both sets of browser checks. The deployed A-level Exam Skills script matched the merged Git blob before the Batch 15 release.

## Human Biology

- The overview shows F170 and F171 as the two examined units, followed by six compact NEA unit links. Repeated catch-up, flashcard and skills panels and the F171 preview label are gone.
- Examined unit overviews offer Catch up, Practise questions and Flashcards. The practice choice opens core questions. Build Understanding, Quick Mix, Fix Mistakes, Skills Practice, Challenge and F171 clinical cases are available in More practice options. NEA overviews offer Learn concepts and Check knowledge, plus optional modes. F175 links directly to the existing interactive model.
- The app header has Overview, Units and Find a topic. The Narajos logo returns to the main site. The old hash routes remain usable. Browser Back and Forward are checked, including keeping an activity open and retrying navigation after cancelling.
- Topic search covers all eight units. It uses existing lesson and progression metadata, verified practice routes, and familiar terms such as FSH, antibody, chromatography, EEG and clinical trials. The result identifies the unit and the relevant task.
- Continue learning appears for saved work. It shows one Resume button and a disclosure for additional activities. The order is deterministic because the stores do not record comparable last-activity timestamps. Flashcard and explanation sets, question sessions, generated skills, and guided-lesson drafts reopen at the recorded position or stage.
- Worked example, With support and Your turn have concise labels and functional icons. Completed teaching shrinks to a reopenable disclosure. Tables and diagrams remain next to the reasoning. Feedback, targeted reteaching and the return to the same saved question remain together.

## Shared conventions

- The public site menu links to the GCSE, A-level and Human Biology overviews. The A-level and GCSE search results use the same action hierarchy and focus styling. Their own exam navigation, tiers, lesson structures and review formats remain available.
- Years 7–11 Catch-up uses the shared finder for existing lessons, with year context and filters. A compact resume panel uses existing saved checks. Shared Year 10 and Year 11 lessons appear as one search result with both year contexts.
- Phone layouts use wrapping links and larger touch targets. At a 390-pixel viewport the Human Biology header had 499 pixels of link content in 358 pixels before the change. The revised header fits that 358-pixel space. A keyboard check at 320 pixels with 200% text also fits.

## Verification

- The browser navigation suite covers all eight unit overviews, the three main header destinations, ten search terms, a screening worked example, independent feedback, browser Back and Forward, saved exam and flashcard sessions, a guided written draft, school Catch-up resume, and the AQA overview controls.
- The inherited checks cover the 49 Human Biology guided routes, 49 Build Understanding sequences, 569 fixed and rotating questions, 14 Skills Practice families, clinical cases, written self-review, flashcard spacing, the F175 model, and A-level Exam Skills. The static skills check evaluates 22,400 seeded tasks.
- Accessibility checking includes keyboard and touch, visible focus, live feedback, the activity dialog, reduced motion, adjustable text size and narrow, tablet and desktop layouts. Axe checks on the revised Human Biology overview, F171, F175, the screening worked example, the school finder and both AQA overviews returned zero violations.
- The [before-and-after screenshot appendix](https://chatgpt.com/library?file_id=libfile_f0efb4f650148191a37c4f0b6e9b31b1&account_id=personal) shows five real Chromium views at matching routes and viewports.

## Follow-up

Pupil sessions, physical devices and specialist screen-reader testing were unavailable. Use the F171 screening journey and a Years 7–11 saved check for a short observed pupil session. The exercise should establish whether pupils can find the resource, use it and return independently. GCSE ordinary lesson sessions retain their existing approach to persistence, while flashcards have saved review. Consider any wider persistence change only as separate app work. Batch 14’s Human Biology curriculum verification remains a separate, targeted release.

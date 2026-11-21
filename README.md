# Narajos website

Source files for [narajos.com](https://narajos.com/).

## Structure

- `public/index.html` — main homepage
- `public/teaching/index.html` — Keystone tool overview
- `public/gcse/index.html` — GCSE Combined Science revision, including flashcard navigation
- `public/gcse/cards-*.js` — curated Biology, Chemistry and Physics recall-card banks (241 starter cards, 24 topics)
- `public/gcse/flashcards-app.js` — GCSE topic, paper, mixed, weak and due-card review modes
- `public/alevel/index.html` — A-level Biology revision, plus an optional stepwise catch-up companion using the already-authored AQA concept notes (existing question progression and post-error reteach preserved)
- `public/alevel/spaced-review-app.js` — spaced-review dashboard built on its existing flashcard bank
- `public/human-biology/` — Cambridge OCR AAQ revision app: paper-first F170/F171 navigation, original diagram, calculation and application challenges, and separate recall cards. F170 has 28 learning sections, 112 flashcards and 28 explanation-only prompts; exam-question bank currently has 64 F170 and 52 F171 challenges. The independent F172–F177 pathway has 78 introductory knowledge checks (13 per unit), including original diagram questions. Across the eight units the app supports ten answer formats. Every F170 and F171 specification subtopic heading now has at least one varied-format question, but the banks remain starters: coverage of each individual content statement, examination skill and misconception is not complete.
- `public/human-biology/companion.js` — optional short catch-up recaps for F170–F177, including dedicated F171 immune dysfunction and vaccine explanations, without accounts or assessed coursework support
- `public/human-biology/reproduction-simulation.js` and `.css` — optional original F175 knowledge-only interactive model of pituitary FSH-supported follicle growth, LH-triggered ovulation, oocyte/sperm transport and possible fertilisation; a teaching schematic, not a live coursework task or a physiological timing model.
- `public/human-biology/challenge-extension.js` — additional original examined-unit questions, including all previously missing F170/F171 subtopic headings
- `public/human-biology/skills.js` — 14 F170/F171 skills with seeded numerical variants, accessible graphs and rotating practical/evidence contexts. Uses the existing challenge checker and feedback. Ten-question adaptive sets, repeat sets, reload/resume and aggregate local skill history stay separate from fixed-question coverage.
- `docs/QUESTION_BANK_AUDIT_AND_SKILLS.md` — source inventory, skills/knowledge distinction, expansion priorities and limits of the audit.
- `docs/HUMAN_BIOLOGY_REVISION_RESEARCH.md` — OCR specification / sample-material research, high-yield priority rationale, content-quality checklist and coverage gaps.
- `docs/HUMAN_BIOLOGY_QUESTION_WRITING_STANDARD.md` — accessible, misconception-focused question and diagram standard with strict limits on coursework-unit support.
- `docs/ORACLE_KEYSTONE_PEDAGOGY.md` — pedagogical and privacy standard for all Keystone apps: explicit sequencing, retrieval, scaffold fading, diagnostic reteach, transferable application and strictly local progress (no AI marking or learner telemetry).
- `public/teacher/index.html` — Focused Questions for teachers
- `public/teaching/simulations/` — simulation catalogue and five interactive models
- `public/assets/site.css` — shared main-site styles
- `public/assets/simulation-shell.css` — shared simulation navigation styles
- `public/assets/spaced-review.js` — shared local spaced-review scheduler and exact-answer matcher
- `public/assets/spaced-review.css` — shared flashcard styling
- `public/privacy/index.html` — privacy information

The website does not require accounts or have donation or payment features. Fonts are loaded from Google Fonts, with local system-font fallbacks. Flashcard progress is recorded only in browser localStorage, separately for Trilogy, A-level Biology and Human Biology. A correct response is first due the following day, then at progressively longer intervals; incorrect cards return within the active session. Self-assessment remains available because valid biological/scientific answers cannot always be graded by exact text matching.

## Publishing

The `public/` folder is intended for the existing Cloudflare Worker or Pages deployment. Changes on `main` can be deployed through the existing GitHub/Cloudflare integration if configured. **Do not create a new domain mapping or change DNS.**

The root-level ZIP is a historic one-time import and is **not** used for ongoing updates. Its automatic import workflow has been retired so it cannot overwrite edits to `public/`.

## Checks

Run `node scripts/check-site.mjs`, `node scripts/check-flashcards.mjs`, `node scripts/check-human-biology.mjs`, `node scripts/check-human-challenges.mjs` and `node scripts/check-human-skills.mjs` from the repository root. GitHub Actions runs these scripts on relevant changes. Checks include:

- The existence of major site pages and simulations
- HTML titles, language attributes and viewport metadata
- Syntax of inline JavaScript, without executing it
- Links to internal files and routes
- Navigation, draft recovery, print functionality and key revision-app safeguards
- GCSE card bank coverage across all 24 Trilogy topics, per-card structure and tier metadata
- Spaced-review scheduling, missed-card retry logic, explicit answer aliases and both review-app interfaces

The Human Biology app has ten answer formats, a confidence-first Quick Mix, progressive topic practice, 10-second graduated hints, first-tap checking of correct four-choice answers, calculator cues, visual-answer feedback and a knowledge-only F172–F177 starter pathway. F170/F171 remain the examined units; coursework assistance is excluded. It is **not yet a complete statement-by-statement specification resource**. It includes no NEA assignment writing or marking. Sample-paper alignment indicates question *style*, not reliable predictions of future examination frequency. Source: Cambridge OCR Human Biology specification version 8 (October 2026).

These checks are not a replacement for browser testing.

### Manual release checks

1. On mobile and desktop, navigate between the homepage, the revision applications, Focused Questions and the simulation catalogue.
2. Start an unfinished GCSE lesson and A-level lesson/flashcard session; try the logo, an internal link, Back, refresh and browser navigation. Confirm that cancelling the leave dialog preserves the current activity.
3. In Focused Questions, change the year and topic, swap a question, refresh, verify the current set returns, and print the question and answer sheets.
4. Check that all five simulations keep their primary controls visible and scrollable in portrait mobile and desktop views.
5. Open GCSE Flashcards: test paper and topic decks, missed-card repetition, typed answers, reverse definitions, Foundation filtering, interruption and session recovery.
6. Open A-level Spaced Review: complete an untimed/timed/reverse deck and check its results contribute to review history.
7. In Human Biology, test F170–F177 pathways, all ten question formats (including ordering, matching, diagram, numeric and manual 6/9-mark rubric), wrong-answer repeats, F170 flashcards, session recovery and leave confirmation; verify no coursework task features.
8. Check that the A-level DNA-replication flashcard accepts `S`, `S phase` and `synthesis phase` as appropriate.

**Content status:** The GCSE flashcard decks are an initial curated recall selection, not a complete card-by-card representation of every specification statement. Further expansion and examiner-report review are recommended before describing them as comprehensive.

A separate GitHub Actions **Browser smoke tests** workflow launches headless Chromium against the actual static site on desktop and a 390px mobile viewport. It checks A-level/Human Biology catch-up navigation, live question loading, leaving an active activity, return-home navigation, uncaught page errors and horizontal overflow; screenshots are retained as short-lived workflow artifacts. This is broader than the Node-only checks, but **does not substitute for a human teacher checking every question, diagram, answer and screen reader behaviour**.

The website's presentation is deliberately restrained. Keep the main navigation and visual conventions coherent, while allowing subject-specific simulation colours.

### Companion use: revision · catch-up · reteach

In both A-level Biology and Human Biology, **questions remain the default**. The optional **Catch up** route provides small, sequenced chunks of already authored key knowledge, then links back to the existing question modes. **Reteach** means a timely, short explanation after a mistake, not a separate full teaching course: A-level retains its existing targeted correction and quick-check logic; Human Biology links from uncertain/error feedback to relevant brief concept or topic notes. Students are not forced to read before practising. Neither catch-up pathway collects new learner data, uses AI marking, or substitutes for teacher-led practical lessons. In Human Biology, the F172–F177 notes are general scientific knowledge and must never become coursework assessment coaching.


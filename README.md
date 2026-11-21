# Narajos website

Source files for [narajos.com](https://narajos.com/).

## Structure

- `public/index.html` — main homepage
- `public/teaching/index.html` — Keystone tool overview
- `public/gcse/index.html` — GCSE Combined Science revision, including flashcard navigation
- `public/gcse/cards-*.js` — curated Biology, Chemistry and Physics recall-card banks (241 starter cards, 24 topics)
- `public/gcse/flashcards-app.js` — GCSE topic, paper, mixed, weak and due-card review modes
- `public/alevel/index.html` — A-level Biology revision
- `public/alevel/spaced-review-app.js` — spaced-review dashboard built on its existing flashcard bank
- `public/human-biology/` — Cambridge OCR AAQ revision app: paper-first F170/F171 navigation, original diagram, calculation and application challenges, and separate recall cards. F170 has 28 learning sections, 112 flashcards and 28 explanation-only prompts; exam-question bank currently has 62 F170 and 29 F171 challenges (nine formats, including two-step scientific reasoning). F171 remains an early preview.
- `docs/HUMAN_BIOLOGY_REVISION_RESEARCH.md` — OCR specification / sample-material research, high-yield priority rationale, content-quality checklist and coverage gaps.
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

Run `node scripts/check-site.mjs`, `node scripts/check-flashcards.mjs`, `node scripts/check-human-biology.mjs` and `node scripts/check-human-challenges.mjs` from the repository root. GitHub Actions runs both scripts on relevant changes. Checks include:

- The existence of major site pages and simulations
- HTML titles, language attributes and viewport metadata
- Syntax of inline JavaScript, without executing it
- Links to internal files and routes
- Navigation, draft recovery, print functionality and key revision-app safeguards
- GCSE card bank coverage across all 24 Trilogy topics, per-card structure and tier metadata
- Spaced-review scheduling, missed-card retry logic, explicit answer aliases and both review-app interfaces

The Human Biology app now has nine exam-question formats, a confidence-first Quick Mix (two easy warm-ups, two core questions, then application with a gated final stretch), progressive topic practice, optional hints, tightly matched quick checks, and an F171 preview alongside the original F170 bank. It is **not yet a complete statement-by-statement specification resource**. It includes no NEA assignment writing or marking. Sample-paper alignment indicates question *style*, not reliable predictions of future examination frequency. Source: Cambridge OCR Human Biology specification version 8 (October 2026).

These checks are not a replacement for browser testing.

### Manual release checks

1. On mobile and desktop, navigate between the homepage, the revision applications, Focused Questions and the simulation catalogue.
2. Start an unfinished GCSE lesson and A-level lesson/flashcard session; try the logo, an internal link, Back, refresh and browser navigation. Confirm that cancelling the leave dialog preserves the current activity.
3. In Focused Questions, change the year and topic, swap a question, refresh, verify the current set returns, and print the question and answer sheets.
4. Check that all five simulations keep their primary controls visible and scrollable in portrait mobile and desktop views.
5. Open GCSE Flashcards: test paper and topic decks, missed-card repetition, typed answers, reverse definitions, Foundation filtering, interruption and session recovery.
6. Open A-level Spaced Review: complete an untimed/timed/reverse deck and check its results contribute to review history.
7. In Human Biology, test F170 and F171 entry cards, all eight question formats (including ordering, matching, diagram, numeric and manual 6/9-mark rubric), wrong-answer repeats, F170 flashcards, session recovery and leave confirmation; verify no coursework task features.
8. Check that the A-level DNA-replication flashcard accepts `S`, `S phase` and `synthesis phase` as appropriate.

**Content status:** The GCSE flashcard decks are an initial curated recall selection, not a complete card-by-card representation of every specification statement. Further expansion and examiner-report review are recommended before describing them as comprehensive.

The website's presentation is deliberately restrained. Keep the main navigation and visual conventions coherent, while allowing subject-specific simulation colours.

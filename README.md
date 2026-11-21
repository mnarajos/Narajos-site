# Narajos website

Source files for [narajos.com](https://narajos.com/).

## Structure

- `public/index.html` — main homepage
- `public/teaching/index.html` — Keystone tool overview
- `public/gcse/index.html` — GCSE Combined Science revision
- `public/alevel/index.html` — A-level Biology revision
- `public/teacher/index.html` — Focused Questions for teachers
- `public/teaching/simulations/` — simulation catalogue and five interactive models
- `public/assets/site.css` — shared main-site styles
- `public/assets/simulation-shell.css` — shared simulation navigation styles
- `public/privacy/index.html` — privacy information

The website does not require accounts or have donation or payment features. Fonts are loaded from Google Fonts, with local system-font fallbacks.

## Publishing

The `public/` folder is intended for the existing Cloudflare Worker or Pages deployment. Changes on `main` can be deployed through the existing GitHub/Cloudflare integration if configured. **Do not create a new domain mapping or change DNS.**

The root-level ZIP is a historic one-time import and is **not** used for ongoing updates. Its automatic import workflow has been retired so it cannot overwrite edits to `public/`.

## Checks

Run `node scripts/check-site.mjs` from the repository root. GitHub Actions runs the same script on changes to `public/`. It checks:

- The existence of major site pages and simulations
- HTML titles, language attributes and viewport metadata
- Syntax of inline JavaScript, without executing it
- Links to internal files and routes
- Navigation, draft recovery, print functionality and key revision-app safeguards

This is a static check, **not** a replacement for browser testing.

### Manual release checks

1. On mobile and desktop, navigate between the homepage, the revision applications, Focused Questions and the simulation catalogue.
2. Start an unfinished GCSE lesson and A-level lesson/flashcard session; try the logo, an internal link, Back, refresh and browser navigation. Confirm that cancelling the leave dialog preserves the current activity.
3. In Focused Questions, change the year and topic, swap a question, refresh, verify the current set returns, and print the question and answer sheets.
4. Check that all five simulations keep their primary controls visible and scrollable in portrait mobile and desktop views.
5. Check that the A-level DNA-replication flashcard accepts `S`, `S phase` and `synthesis phase` as appropriate.

The website's presentation is deliberately restrained. Keep the main navigation and visual conventions coherent, while allowing subject-specific simulation colours.

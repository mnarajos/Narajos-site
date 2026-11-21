# Narajos website

Website files for [narajos.com](https://narajos.com/).

## Website files

The site is in the **`public/`** folder:

- `public/index.html` — homepage
- `public/teaching/index.html` — Keystone teaching tools
- `public/gcse/index.html` — GCSE Trilogy app
- `public/alevel/index.html` — A-level Biology app
- `public/teacher/index.html` — Focused Questions app
- `public/assets/site.css` — shared styles
- `public/privacy/index.html` — privacy information

The website has no donation or payment features.

## Publishing

The `public/` folder is ready to be connected to your **existing** Cloudflare Worker or Pages project. Do not create a new domain mapping or change DNS. Connecting GitHub to Cloudflare will let changes to this repository trigger an automatic deployment.

The ZIP file at the repository root is the one-time import; routine future changes should edit the website files directly rather than uploading ZIP files.

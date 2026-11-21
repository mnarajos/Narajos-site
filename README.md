# Narajos website

Website source files for [narajos.com](https://narajos.com/).

The homepage links to the Narajos Keystone teaching tools. The GCSE Trilogy, A-level Biology, and Focused Questions applications are static HTML pages.

## File structure

- `index.html` — homepage
- `teaching/index.html` — teaching tools directory
- `gcse/index.html` — GCSE app
- `alevel/index.html` — A-level Biology app
- `teacher/index.html` — Focused Questions app
- `assets/site.css` — shared styles
- `privacy/index.html` — privacy information

## Publishing

Cloudflare will publish this repository after the existing Cloudflare Worker is connected to GitHub and its build configuration is verified. Do **not** create another Worker or change the domain to update the website.

There are currently no payment links or donation features.

# DejaVu Sans test fixtures

These test-only files provide deterministic metrics for a common Linux system
fallback in the GCSE SVG label audit. They were derived from Debian's
`fonts-dejavu-core` DejaVu Sans regular and bold fonts. The project and source
are <https://github.com/dejavu-fonts/dejavu-fonts>; the copyright and licence
notices are preserved in [COPYRIGHT.txt](COPYRIGHT.txt).

Both files were subset to Latin, Greek, punctuation, superscript/subscript,
currency, mathematical, arrow and symbol ranges with fontTools, then encoded
as WOFF2. Their use in tests does not change font delivery on the website.

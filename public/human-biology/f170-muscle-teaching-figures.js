/* F170 muscle teaching figures: original, simplified schematics and a credited micrograph.
 * Scope: OCR Cambridge Advanced National in Human Biology specification, F170, p.34:
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * Structure and contraction cross-checks:
 * https://www.ncbi.nlm.nih.gov/sites/books/NBK537140/?report=reader
 * https://www.ncbi.nlm.nih.gov/sites/books/NBK572070/
 */
(function () {
  const lesson = window.KeystoneHumanLessons?.['f170/1.1.1.muscle'];
  if (!lesson) return;
  lesson.explainPhotos = {
    ...lesson.explainPhotos,
    0: [{
      src: '/assets/micrographs/hb-skeletal-striated.webp', width: 1200, height: 800,
      alt: 'Stained longitudinal section of skeletal muscle showing long parallel fibres.',
      caption: 'Notice the long parallel fibres in this right fibularis longus section (HPS stain). Fine bands can be difficult to resolve at this size.',
      source: 'https://commons.wikimedia.org/wiki/File:Skeletal_striated_muscle.jpg',
      credit: 'Nephron', licence: 'CC BY-SA 3.0',
      licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      changes: 'Full frame resized and converted to WebP.'
    }]
  };
  lesson.explainDiagrams = {
    ...lesson.explainDiagrams,
    0: [
      {
        src: '/human-biology/f170-muscle-cell-comparison.svg', width: 280, height: 370, compact: true,
        alt: 'A long skeletal fibre with several nuclei and bands, branched banded cardiac cells joined at a disc, and a spindle-shaped smooth muscle cell without bands.',
        caption: 'Compare cell shape and banding. The dark line is an intercalated disc, which contains connections for transmitting force and electrical signals. The drawings are not to the same scale.'
      }
    ]
  };
  lesson.modelDiagrams = {
    ...lesson.modelDiagrams,
    0: {
      src: '/human-biology/f170-smooth-muscle-lumen.svg', width: 280, height: 320, compact: true,
      alt: 'Matched schematic cross-sections show a ring of smooth muscle around an artery lumen. When the muscle shortens, the lumen narrows; other wall layers are omitted.',
      caption: 'Compare the lumens as the muscle around the ring shortens. These are simplified cross-sections, not measured results.'
    },
    1: {
      src: '/human-biology/f170-smooth-filaments.svg', width: 280, height: 275, compact: true,
      alt: 'A spindle-shaped smooth muscle cell contains thin actin and thick myosin filaments, arranged without repeating sarcomeres.',
      caption: 'Find thin actin and thick myosin in the same cell. The simplified arrangement lacks the repeating sarcomeres that produce striations.'
    }
  };
}());

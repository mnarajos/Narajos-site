/* Reuse the reviewed sliding-hiatus schematic at its guided explanation and stages.
 * OCR F171: https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf
 * NIDDK: https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults */
(function () {
 'use strict';
 const lessons=window.KeystoneHumanLessons||{};
 const lesson=lessons['f171/1.2.1.hiatus'];
 const source=lessons['f171/1.2.1.digestive']?.modelDiagrams?.[0];
 if(!lesson || !source)return;
 const diagram={...source,assessmentSensitive:true};
 lesson.explainDiagrams={...lesson.explainDiagrams,0:[diagram],1:[diagram]};
 lesson.modelDiagrams={...lesson.modelDiagrams,0:diagram,1:diagram};
}());

/* F171 Candida specimen recognition.
 * CDC PHIL 22294: https://wwwn.cdc.gov/phil/Details.aspx?pid=22294
 * Content provider CDC / Dr. Lucille K. Georg; source identifies yeast-phase
 * Candida albicans. The PHIL displayed image (700 × 460) is stored unchanged,
 * with no crop or annotation. The source does not specify specimen type or a scale bar.
 * CDC public-domain use terms: https://www.cdc.gov/other/agencymaterials.html
 */
(function () {
 'use strict';
 const lesson=window.KeystoneHumanLessons?.['f171/1.3.1.fungi'];if(!lesson)return;
 const micro={src:'/assets/micrographs/hb-candida-yeast-cdc.jpg',width:700,height:460,assessmentSensitive:true,linksNewTab:true,creditDisclosure:true,
  alt:'Reference photomicrograph showing numerous oval yeast-phase Candida albicans cells, including some budding forms. The CDC source does not specify the specimen type or provide a scale bar.',
  caption:'Notice the oval yeast cells and some buds. This reference image is not the patient in the example; yeast may be present without illness, so microscopy must be interpreted with the other findings. CDC, HHS and the US Government do not endorse this site.',
  source:'https://wwwn.cdc.gov/phil/Details.aspx?pid=22294',credit:'CDC / Dr. Lucille K. Georg, PHIL 22294 (free source)',
  licence:'Public domain; CDC use terms',licenceUrl:'https://www.cdc.gov/other/agencymaterials.html',
  changes:'Full 700 × 460 PHIL display image, unchanged.'};
 lesson.comparisonPhotos={...lesson.comparisonPhotos,0:[...(lesson.comparisonPhotos?.[0]||[]),micro]};
 lesson.modelPhotos={...lesson.modelPhotos,1:[...(lesson.modelPhotos?.[1]||[]),micro]};
}());

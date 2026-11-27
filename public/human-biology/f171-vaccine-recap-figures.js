/* F171 vaccine and immune-memory schematics. Sources: OCR Human Biology specification,
 * https://www.ocr.org.uk/Images/697578-specification-cambridge-advanced-national-in-human-biology.pdf ;
 * UKHSA Green Book chapter 2: https://www.gov.uk/government/publications/immunisation-against-infectious-disease-the-green-book ;
 * CDC vaccine types: https://www.cdc.gov/vaccines/basics/index.html .
 * Images are original, simplified teaching representations.
 */
(function(){
 'use strict';
 function figure(name,height,alt,caption){return {src:'/human-biology/'+name+'.svg',width:280,height:height,compact:true,assessmentSensitive:true,alt:alt,caption:caption};}
 const organisms=figure('f171-vaccine-organisms',420,'Inactivated vaccines contain inactivated organisms that cannot replicate. Live attenuated vaccines contain weakened organisms that can replicate. Toxoid vaccines contain inactivated toxin with recognisable antigenic features. Shapes are schematic.','Compare what each vaccine supplies and whether the organism can replicate. A toxoid is an inactivated toxin; it is not a live organism.');
 const delivery=figure('f171-vaccine-delivery',430,'An mRNA vaccine delivers mRNA instructions into a recipient cell, which makes an antigen. A modified viral vector delivers genetic instructions to a recipient cell, which can make an antigen. A subunit vaccine supplies selected antigenic components directly. Shapes are schematic and intermediate steps are omitted.','Follow the two instruction-delivery routes into a cell and compare them with direct delivery of a selected antigen. The pathways are simplified.');
 const conjugate=figure('f171-conjugate-vaccine',410,'A polysaccharide antigen is linked to a carrier protein. A B cell that binds the polysaccharide can take in the conjugate and present a carrier-protein peptide to a helper T cell. Helper T-cell signals can strengthen the antibody response to the polysaccharide and memory. Shapes are schematic.','Follow the linked components to the B cell. Presentation of a carrier-protein peptide allows helper T-cell support, which can improve the response to the polysaccharide.');
 const memory=figure('f171-immune-memory',430,'First exposure to an antigen activates matching B cells. Some become antibody-secreting plasma cells and some remain as memory B cells. Later exposure to the same antigen can produce a faster specific response and more antibody. A booster can strengthen memory. T-cell memory also contributes but is not shown; protection is not guaranteed.','Follow the selected B-cell branch from the first encounter to memory and the later response. Memory takes time to develop; a booster can strengthen it, but protection is not guaranteed.');
 const recognition=figure('f171-antigen-presentation',420,'An antigen-presenting cell displays a peptide on MHC for a matching helper T cell to recognise. A B-cell receptor separately binds a matching feature of an intact antigen. These recognition routes are schematic.','Compare recognition of a displayed peptide by a helper T cell with binding of an intact antigen by a B-cell receptor.');
 const helper=figure('f171-helper-b-cells',350,'In a helper-dependent response an activated helper T cell gives signals to a matching B cell. The selected B cell divides into a clone that can give rise to plasma and memory cells. Antigen presentation is a prerequisite and is not drawn.','Follow helper T-cell signals to expansion of the matching B cell. The diagram omits the preceding antigen-presentation step.');
 const effectors=figure('f171-immune-effectors',390,'A plasma cell secretes antibodies that bind matching antigens. A phagocyte engulfs material. A cytotoxic T cell can kill an infected host cell it recognises. The diagram is schematic.','Compare the three effects: antibodies bind targets, phagocytes engulf material, and cytotoxic T cells can kill recognised infected cells.');
 const safety={...organisms,caption:'A live attenuated organism can replicate. Suitability depends on the individual and vaccine; some people with severe immunosuppression should not receive particular live vaccines. Protection varies.'};
 window.KeystoneF171VaccineRecaps={
  'f171/3.2.2/1':[organisms], 'f171/3.2.2/2':[delivery],
  'f171/3.2.2/3':[conjugate,memory], 'f171/3.2.2/4':[safety],
  'f171/a3/1':[memory], 'f171/a3/2':[memory]
 };
 function addExplain(key,index,item){const lesson=window.KeystoneHumanLessons?.[key];if(!lesson)return;lesson.explainDiagrams={...lesson.explainDiagrams,[index]:[...(lesson.explainDiagrams?.[index]||[]),item]};}
 function addModel(key,index,item){const lesson=window.KeystoneHumanLessons?.[key];if(!lesson)return;const prior=lesson.modelDiagrams?.[index];lesson.modelDiagrams={...lesson.modelDiagrams,[index]:[...(Array.isArray(prior)?prior:prior?[prior]:[]),item]};}
 addExplain('f171/3.2.2',0,delivery);addModel('f171/3.2.2',0,organisms);addModel('f171/3.2.2',1,delivery);addModel('f171/3.2.2',2,memory);
 addExplain('f171/a3',0,recognition);addExplain('f171/a3',0,effectors);addExplain('f171/a3',1,memory);
 addModel('f171/a3',0,recognition);addModel('f171/a3',1,helper);addModel('f171/a3',2,effectors);addModel('f171/a3',3,memory);
})();

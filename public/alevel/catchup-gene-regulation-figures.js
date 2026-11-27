/* Original Topic 8 schematics: a strand, process or fragment is represented rather than drawn to scale. */
(function () {
 "use strict";
 const figures = {
  "a8/rnai/0": {
   title: "Preparing an RNA interference complex",
   alt: "A short double-stranded siRNA separates. One strand becomes associated with a protein complex, while the other strand is removed.",
   caption: "Follow one strand from the short double-stranded siRNA into the protein complex. The diagram represents the strands and complex schematically.",
   art: `<text x="150" y="28" text-anchor="middle">Short double-stranded siRNA</text><path d="M55 55h190M55 76h190" stroke="#32776d" stroke-width="5"/><path d="M72 55v21m28-21v21m28-21v21m28-21v21m28-21v21m28-21v21" stroke="#92bfb2" stroke-width="2"/><path d="M150 86v34m-7-7 7 7 7-7M92 82L57 101m4-8-4 8 9-1" fill="none" stroke="#344958" stroke-width="3"/><path d="M23 104h74" stroke="#a76125" stroke-width="4" stroke-dasharray="5 4"/><text x="60" y="130" text-anchor="middle">removed</text><ellipse cx="150" cy="184" rx="107" ry="47" fill="#e0e8f5" stroke="#516eaa" stroke-width="3"/><path d="M83 180h134" stroke="#32776d" stroke-width="5"/><text x="150" y="213" text-anchor="middle">Protein complex</text><text x="150" y="260" text-anchor="middle">One siRNA strand retained</text>`
  },
  "a8/rnai/1": {
   title: "siRNA directs mRNA breakdown",
   alt: "An siRNA strand in a protein complex binds a complementary target messenger RNA. The target mRNA is cut into fragments, so the intact mRNA is not available for translation.",
   caption: "Follow the target mRNA: complementary base pairing guides the complex to it, after which the mRNA is cut. This acts after transcription.",
   art: `<ellipse cx="150" cy="75" rx="100" ry="48" fill="#e0e8f5" stroke="#516eaa" stroke-width="3"/><text x="150" y="57" text-anchor="middle">Complex with siRNA</text><path d="M75 88h150" stroke="#32776d" stroke-width="5"/><path d="M40 145h220" stroke="#a76125" stroke-width="5"/><path d="M89 88v57m25-57v57m25-57v57m25-57v57m25-57v57m25-57v57" stroke="#bfcac8" stroke-width="2" stroke-dasharray="3 5"/><text x="150" y="169" text-anchor="middle">Complementary mRNA</text><path d="M150 177v23m-7-7 7 7 7-7" fill="none" stroke="#344958" stroke-width="3"/><path d="M42 226h62m13 0h65m13 0h62" stroke="#a76125" stroke-width="5"/><text x="150" y="258" text-anchor="middle">mRNA cut into fragments</text>`
  },
  "a8/fragments/1": {
   title: "One PCR cycle",
   alt: "Three stages of a polymerase chain reaction: heat separates two DNA strands at about 95 degrees Celsius; primers bind as the temperature is lowered to about 55 degrees; DNA polymerase extends from the primers at about 72 degrees, producing double-stranded copies.",
   caption: "Follow a cycle: separate strands, let primers bind, then extend from each primer. Temperatures are typical values; actual protocols vary.",
   art: `<text x="150" y="25" text-anchor="middle">1 · Heat to about 95 °C</text><path d="M46 43h208M46 57h208" stroke="#32776d" stroke-width="4"/><path d="M150 63v18m-6-6 6 6 6-6" fill="none" stroke="#344958" stroke-width="2"/><text x="150" y="103" text-anchor="middle">2 · Cool to about 55 °C</text><path d="M46 119h208M46 153h208" stroke="#32776d" stroke-width="4"/><path d="M46 128h42M212 144h42" stroke="#a76125" stroke-width="5"/><text x="150" y="140" text-anchor="middle">Primers bind</text><path d="M150 160v18m-6-6 6 6 6-6" fill="none" stroke="#344958" stroke-width="2"/><text x="150" y="201" text-anchor="middle">3 · About 72 °C</text><path d="M46 216h208M46 226h208M46 246h208M46 256h208" stroke="#32776d" stroke-width="3"/><text x="150" y="279" text-anchor="middle">Polymerase extends primers</text>`
  },
  "a8/fingerprint/1": {
   title: "Reading an electrophoresis gel",
   alt: "A gel is shown with wells near its negative electrode at the top and a positive electrode at the bottom. DNA fragments move down the gel; shorter fragments travel further than longer fragments. The bands are illustrative, with no measured sizes.",
   caption: "Follow the DNA toward the positive electrode. Compare positions within the same gel: shorter fragments travel further. The example has no numerical size scale.",
   art: `<text x="150" y="23" text-anchor="middle">Negative electrode (−)</text><rect x="68" y="36" width="164" height="200" rx="6" fill="#e3edf5" stroke="#537a94" stroke-width="2"/><rect x="93" y="43" width="35" height="8" fill="#537a94"/><rect x="171" y="43" width="35" height="8" fill="#537a94"/><path d="M93 84h35M171 84h35M93 127h35M171 155h35M93 192h35M171 192h35" stroke="#284e67" stroke-width="7"/><path d="M46 58v150m-6-7 6 7 6-7" fill="none" stroke="#344958" stroke-width="3"/><text x="150" y="260" text-anchor="middle">Positive electrode (+)</text><text x="267" y="51" text-anchor="middle">Wells</text><text x="269" y="83" text-anchor="middle">Longer</text><text x="269" y="198" text-anchor="middle">Shorter</text>`
  }
 };
 window.ALevelGeneRegulationFigures = {render(topic,id,group) {
  const f=figures[topic+"/"+id+"/"+group]; if(!f)return "";
  return `<figure class="kc-visual"><div class="kc-visual-heading"><strong>${f.title}</strong></div><div class="kc-visual-art kc-visual-art-compact"><svg viewBox="0 0 300 290" role="img" aria-label="${f.alt}" xmlns="http://www.w3.org/2000/svg" style="font:16px system-ui,sans-serif;fill:#233e4c">${f.art}</svg></div><figcaption>${f.caption}</figcaption></figure>`;
 }};
})();

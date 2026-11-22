const visual = {
  "cell-structures": `<img src="/assets/ks3-diagrams/cheek-cell.svg" width="360" height="280" alt="Labelled human cell with a nucleus, mitochondria, ribosomes and cell membrane.">
    <figcaption>Find the labelled structures, then compare their jobs in the table.</figcaption>`,
  osmosis: `<div class="school-evidence-flow">
    <div><strong>Side A · More dilute</strong><span class="school-solute" aria-hidden="true">● ●</span></div>
    <div><strong>Partially permeable membrane</strong><span>Water moves both ways</span><b>More from A to B →</b></div>
    <div><strong>Side B · More concentrated</strong><span class="school-solute" aria-hidden="true">● ● ● ● ● ●</span></div>
    </div><figcaption>The dots show dissolved particles. The net movement of water is towards side B in this example.</figcaption>`,
  mitosis: `<ol class="school-evidence-flow">
    <li><strong>One cell</strong><span class="school-cell-shape" aria-hidden="true">Ⅰ</span><span>DNA before copying</span></li>
    <li><strong>DNA copied</strong><span class="school-cell-shape" aria-hidden="true">Ⅱ</span><span>Two matching copies</span></li>
    <li><strong>Two new cells</strong><span class="school-cell-shape" aria-hidden="true">Ⅰ</span><span class="school-cell-shape" aria-hidden="true">Ⅰ</span><span>One copy in each cell</span></li>
    </ol><figcaption>One chromosome is shown to make it easier to follow the copies.</figcaption>`,
  "energy-stores": `<ol class="school-evidence-flow">
    <li><strong>Ball held up</strong><span>Gravitational potential store</span></li>
    <li><strong>Ball speeding up</strong><span>Kinetic store</span></li>
    <li><strong>Ball comes to rest</strong><span>Thermal stores of ball and surface; some transfer by sound</span></li>
    </ol><figcaption>Follow the energy from the held ball until after the impact.</figcaption>`,
  "gas-exchange": `<div class="school-evidence-flow">
    <div><strong>Air inside an alveolus</strong><span>Higher oxygen concentration</span></div>
    <div><strong>Thin barrier</strong><b>Net oxygen movement →</b></div>
    <div><strong>Blood in the capillary</strong><span>Lower oxygen concentration in arriving blood</span></div>
    </div><figcaption>A simplified air sac and nearby capillary. Follow oxygen across the thin barrier.</figcaption>`,
  enzymes: `<div class="school-evidence-flow">
    <div><strong>Active site fits</strong><span class="school-enzyme-match" aria-hidden="true"><i></i><b></b></span><span>Substrate can bind</span></div>
    <div><strong>Active site changes shape</strong><span class="school-enzyme-changed" aria-hidden="true"><i></i><b></b></span><span>Substrate no longer fits as well</span></div>
    </div><figcaption>The orange shape is the substrate. The green shape shows the enzyme and its active site.</figcaption>`,
  "ionic-conduction": `<div class="school-evidence-flow">
    <div><strong>Solid salt</strong><span class="school-ions" aria-hidden="true">+ − +<br>− + −<br>+ − +</span><span>Ions held in place</span></div>
    <div><strong>Molten salt</strong><span class="school-ions" aria-hidden="true">− ↗ +<br>+ ↘ −<br>− ↖ +</span><span>Ions can move through the liquid</span></div>
    </div><figcaption>Both samples contain charged ions. Compare whether they can move freely.</figcaption>`
};

export function year9Visual(id) {
  if (!Object.hasOwn(visual, id)) return null;
  const figure = document.createElement("figure");
  figure.className = "school-evidence-visual";
  figure.innerHTML = visual[id];
  return figure;
}

const visual = {
  "cell-structures": `<img src="/assets/ks3-diagrams/cheek-cell.svg" width="360" height="280" alt="Labelled human cheek cell with a nucleus, mitochondria, ribosomes and cell membrane.">`,
  osmosis: `<div class="school-evidence-flow">
    <div><strong>Side A · More dilute</strong><span class="school-solute" aria-hidden="true">● ●</span></div>
    <div><strong>Partially permeable membrane</strong><span>Water moves both ways</span><b>Net water movement A → B</b></div>
    <div><strong>Side B · More concentrated</strong><span class="school-solute" aria-hidden="true">● ● ● ● ● ●</span></div>
    </div><figcaption>Dots show dissolved particles.</figcaption>`,
  mitosis: `<ol class="school-evidence-flow">
    <li><strong>One cell</strong><span class="school-cell-shape" aria-hidden="true">Ⅰ</span><span>The cell grows before copying DNA.</span></li>
    <li><strong>DNA copied</strong><span class="school-cell-shape" aria-hidden="true">Ⅱ</span><span>Two matching copies</span></li>
    <li><strong>Two new cells</strong><span class="school-cell-shape" aria-hidden="true">Ⅰ</span><span class="school-cell-shape" aria-hidden="true">Ⅰ</span><span>One copy in each cell</span></li>
    </ol><figcaption>One chromosome is shown.</figcaption>`,
  "energy-stores": `<ol class="school-evidence-flow">
    <li><strong>Ball held up</strong><span>Gravitational potential store of the ball and Earth</span></li>
    <li><strong>Ball speeding up</strong><span>Kinetic store</span></li>
    <li><strong>Ball comes to rest</strong><span>Thermal stores of the ball and surface. Some energy is transferred by sound.</span></li>
    </ol>`,
  "gas-exchange": `<div class="school-evidence-flow">
    <div><strong>Air inside an alveolus</strong><span>Higher oxygen concentration</span></div>
    <div><strong>Thin barrier</strong><b>Net oxygen movement →</b></div>
    <div><strong>Blood in the capillary</strong><span>Lower oxygen concentration in arriving blood</span></div>
    </div>`,
  enzymes: `<div class="school-evidence-flow">
    <div><strong>At a suitable temperature</strong><span class="school-enzyme-match" aria-hidden="true"><i></i><b></b></span><span>Substrate fits the active site</span></div>
    <div><strong>After denaturation</strong><span class="school-enzyme-changed" aria-hidden="true"><i></i><b></b></span><span>Active site changes shape</span></div>
    </div><figcaption>Orange shows the substrate. Green shows the enzyme.</figcaption>`,
  "ionic-conduction": `<div class="school-evidence-flow">
    <div><strong>Solid salt</strong><span class="school-ions" aria-hidden="true">+ − +<br>− + −<br>+ − +</span><span>Ions held in a lattice</span></div>
    <div><strong>Molten salt</strong><span class="school-ions" aria-hidden="true">− ↗ +<br>+ ↘ −<br>− ↖ +</span><span>Ions can move through the liquid</span></div>
    </div>`
};

export function year9Visual(id) {
  if (!Object.hasOwn(visual, id)) return null;
  const figure = document.createElement("figure");
  figure.className = "school-evidence-visual";
  figure.innerHTML = visual[id];
  return figure;
}

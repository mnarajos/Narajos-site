(() => {
  const flower = `<svg viewBox="0 0 360 240" role="img" aria-label="Flower cross-section showing an anther next to the stigma, then the style leading to the ovary and the ovule inside it">
    <path class="ks-sequence-organ" d="M169 63Q186 73 203 63Q200 80 194 84L194 148Q216 151 228 175Q227 200 186 206Q145 200 144 175Q155 151 178 148V84Q172 79 169 63Z"/>
    <ellipse class="ks-sequence-ovule" cx="200" cy="180" rx="13" ry="10"/>
    <path class="ks-sequence-filament" d="M129 99Q122 133 153 166"/>
    <ellipse class="ks-sequence-anther" cx="130" cy="88" rx="11" ry="16" transform="rotate(-22 130 88)"/>
    <path class="ks-sequence-leader" d="M194 65L230 43M194 111H230M226 175L268 160M208 186L246 206M120 87H89"/>
    <text x="234" y="47">Stigma</text><text x="234" y="115">Style</text>
    <text x="272" y="164">Ovary</text><text x="249" y="211">Ovule</text><text x="32" y="92">Anther</text>
    <g data-stage="0"><path class="ks-sequence-route" d="M139 73Q154 50 176 62M170 53L176 62L167 65"/><circle class="ks-sequence-focus" cx="183" cy="67" r="4"/></g>
    <g data-stage="1" hidden><path class="ks-sequence-route" d="M183 68Q185 85 185 120"/><circle class="ks-sequence-focus" cx="183" cy="67" r="4"/></g>
    <g data-stage="2" hidden><path class="ks-sequence-route" d="M183 68Q185 85 185 120V158Q184 177 192 179"/><circle class="ks-sequence-focus" cx="183" cy="67" r="4"/><path class="ks-sequence-leader" d="M180 139H98"/><text x="17" y="143">Male nucleus</text><circle class="ks-sequence-focus" cx="185" cy="139" r="4"/></g>
    <g data-stage="3" hidden><path class="ks-sequence-route" d="M183 68Q185 85 185 120V158Q184 177 192 179"/><circle class="ks-sequence-focus" cx="183" cy="67" r="4"/><circle class="ks-sequence-focus" cx="200" cy="179" r="5"/></g>
  </svg>`;

  const reflex = `<svg viewBox="0 0 360 238" role="img" aria-label="A pathway from a skin receptor along a sensory neuron to a relay neuron in the spinal cord, then along a motor neuron to an arm muscle">
    <rect class="ks-sequence-organ" x="228" y="37" width="116" height="172" rx="14"/>
    <text x="286" y="61" text-anchor="middle">Spinal cord</text>
    <path class="ks-sequence-path" data-stage="1" d="M55 93H267M258 88L267 93L258 98"/>
    <path class="ks-sequence-path" data-stage="2" d="M276 99V145M271 136L276 145L281 136"/>
    <path class="ks-sequence-path" data-stage="3" d="M270 154H59M68 149L59 154L68 159"/>
    <circle class="ks-sequence-path" data-stage="0" cx="44" cy="93" r="9"/>
    <path class="ks-sequence-path" data-stage="4" d="M20 154Q35 136 50 154Q35 172 20 154Z"/>
    <text x="15" y="73">Receptor</text><text x="91" y="82">Sensory neuron</text>
    <text x="285" y="126">Relay</text><text x="285" y="141">neuron</text>
    <text x="94" y="181">Motor neuron</text><text x="14" y="181">Muscle</text>
  </svg>`;

  const sequences = {
    pollen: {
      image: flower,
      stages: [
        ["Pollination", "A pollen grain reaches the stigma from an anther."],
        ["The tube starts growing", "On a suitable stigma, a pollen tube grows from the grain down through the style. The grain stays on the stigma."],
        ["The tube reaches an ovule", "The tube grows into an ovule inside the ovary. The male nucleus travels along the tube."],
        ["Fertilisation", "Inside the ovule, the male nucleus joins with the egg cell nucleus. After fertilisation, the ovule can develop into a seed."]
      ]
    },
    reflex: {
      image: reflex,
      stages: [
        ["Receptor", "Touching a hot object provides a stimulus. A receptor in the skin detects the stimulus and triggers a nerve impulse."],
        ["Sensory neuron", "The impulse travels along the sensory neuron towards the spinal cord."],
        ["Relay neuron", "In the spinal cord, the sensory neuron passes the signal across a synapse to a relay neuron."],
        ["Motor neuron", "The relay neuron passes the signal across another synapse. An impulse travels along the motor neuron to the effector."],
        ["Effector muscle", "The effector muscle contracts, pulling the hand away. This withdrawal can begin before you consciously decide to move."]
      ]
    }
  };

  class ScienceSequence extends HTMLElement {
    connectedCallback() {
      const sequence = sequences[this.getAttribute("kind")];
      if (!sequence || this.childElementCount) return;

      this.innerHTML = `<div class="ks-sequence-art">${sequence.image}</div>
        <p class="ks-sequence-status" role="status" aria-atomic="true"></p>
        <div class="ks-sequence-controls">
          <button type="button">Previous step</button>
          <button type="button">Next step</button>
        </div>`;

      const [previous, next] = this.querySelectorAll("button");
      const status = this.querySelector('[role="status"]');
      const visualStages = this.querySelectorAll("[data-stage]");
      let step = 0;
      const showStep = () => {
        const [title, description] = sequence.stages[step];
        status.innerHTML = `<strong>Step ${step + 1} of ${sequence.stages.length} · ${title}</strong><br>${description}`;
        for (const part of visualStages) {
          const current = Number(part.dataset.stage) === step;
          part.classList.toggle("is-current", current);
          if (part.tagName === "g") part.toggleAttribute("hidden", !current);
        }
        previous.setAttribute("aria-disabled", String(step === 0));
        next.setAttribute("aria-disabled", String(step === sequence.stages.length - 1));
      };
      previous.addEventListener("click", () => {
        if (step > 0) {
          step -= 1;
          showStep();
        }
      });
      next.addEventListener("click", () => {
        if (step < sequence.stages.length - 1) {
          step += 1;
          showStep();
        }
      });
      showStep();
    }
  }

  customElements.define("science-sequence", ScienceSequence);
})();

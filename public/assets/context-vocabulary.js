(function () {
  "use strict";

  const definitions = new Map([
    ["interstitial-fluid", "Fluid in the spaces between tissue cells. AQA A-level Biology usually calls it tissue fluid."],
    ["erythrocyte", "A red blood cell. Its haemoglobin carries oxygen."],
    ["oncotic-pressure", "The part of osmotic pressure due to large dissolved molecules, mainly proteins. Plasma proteins help oppose filtration out of capillaries."],
    ["endothelium", "A single layer of cells lining the inside of blood vessels, including capillaries."],
    ["gluconeogenesis", "The synthesis of glucose from non-carbohydrate precursors such as lactate, glycerol and some amino acids."],
    ["troponin", "A protein complex on the thin filaments of skeletal and cardiac muscle. Binding of calcium to troponin changes the position of tropomyosin, exposing myosin-binding sites on actin."],
    ["allosteric-regulation", "A molecule binds at one site on a protein and changes how another site works. In enzymes, this can increase or decrease activity at the active site."],
  ]);

  let nextId = 0;
  let active;

  function position() {
    if (!active?.trigger.isConnected) {
      active = undefined;
      return;
    }

    const { trigger, panel } = active;
    const anchor = trigger.getBoundingClientRect();
    const viewport = window.visualViewport;
    const margin = 12;
    const gap = 6;
    const left = (viewport?.offsetLeft ?? 0) + margin;
    const top = (viewport?.offsetTop ?? 0) + margin;
    const width = viewport?.width ?? document.documentElement.clientWidth;
    const height = viewport?.height ?? document.documentElement.clientHeight;
    const right = left + width - 2 * margin;
    const bottom = top + height - 2 * margin;

    panel.style.maxWidth = Math.max(0, right - left) + "px";
    panel.style.maxHeight = Math.max(0, bottom - top) + "px";
    const panelWidth = panel.offsetWidth;
    const panelHeight = panel.offsetHeight;
    const below = anchor.bottom + gap;
    const above = anchor.top - gap - panelHeight;
    const preferredTop = below + panelHeight > bottom && above >= top ? above : below;
    panel.style.left = Math.max(left, Math.min(anchor.left, right - panelWidth)) + "px";
    panel.style.top = Math.max(top, Math.min(preferredTop, bottom - panelHeight)) + "px";
  }

  function addTerm(parent, term, label, definition) {
    const id = "context-vocabulary-" + ++nextId;
    const trigger = document.createElement("button");
    const panel = document.createElement("span");
    const heading = document.createElement("strong");
    const text = document.createElement("span");
    const close = document.createElement("button");

    trigger.type = close.type = "button";
    trigger.className = "context-vocabulary-term";
    trigger.textContent = label;
    trigger.dataset.vocabularyTerm = term;
    trigger.setAttribute("popovertarget", id);
    trigger.setAttribute("aria-controls", id);
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-expanded", "false");

    panel.id = id;
    panel.className = "context-vocabulary-panel";
    panel.setAttribute("popover", "auto");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-labelledby", id + "-term");
    panel.setAttribute("aria-describedby", id + "-definition");

    heading.id = id + "-term";
    heading.textContent = label;
    text.id = id + "-definition";
    text.textContent = definition;
    close.className = "context-vocabulary-dismiss";
    close.textContent = "Close definition";
    function dismiss() {
      panel.hidePopover();
      trigger.focus({ preventScroll: true });
    }
    close.addEventListener("click", dismiss);
    panel.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      dismiss();
    });
    trigger.addEventListener("click", event => {
      event.preventDefault();
      if (panel.matches(":popover-open")) {
        dismiss();
        return;
      }
      trigger.focus({ preventScroll: true });
      panel.showPopover({ source: trigger });
      position();
      close.focus({ preventScroll: true });
    });

    panel.addEventListener("beforetoggle", event => {
      const open = event.newState === "open";
      trigger.setAttribute("aria-expanded", String(open));
      if (open) {
        active = { trigger, panel };
      } else if (active?.panel === panel) {
        active = undefined;
      }
    });

    panel.append(heading, text, close);
    parent.append(trigger, panel);
  }

  function append(parent, content) {
    const parts = Array.isArray(content) ? content : [content];
    for (const part of parts) {
      if (typeof part === "string") {
        parent.append(part);
        continue;
      }

      const { term, label } = part;
      const definition = definitions.get(term);
      if (definition && typeof HTMLElement.prototype.showPopover === "function") {
        addTerm(parent, term, label, definition);
      } else {
        parent.append(label);
      }
    }
  }

  window.addEventListener("resize", position);
  window.addEventListener("scroll", position, { capture: true, passive: true });
  window.visualViewport?.addEventListener("resize", position);
  window.visualViewport?.addEventListener("scroll", position);

  window.NarajosVocabulary = { append };
})();

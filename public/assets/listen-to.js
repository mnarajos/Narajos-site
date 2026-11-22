(() => {
  const speech = window.speechSynthesis;
  if (!speech || typeof SpeechSynthesisUtterance !== "function") return;

  let current;
  class ListenTo extends HTMLElement {
    connectedCallback() {
      if (this.button) return;
      this.button = document.createElement("button");
      this.button.type = "button";
      this.button.className = "listen-button";
      this.message = document.createElement("span");
      this.message.className = "listen-message";
      this.message.setAttribute("role", "status");
      this.append(this.button, this.message);
      this.setLabel(false);
      this.button.addEventListener("click", () => {
        if (current === this) this.stop();
        else this.read();
      });
    }

    disconnectedCallback() {
      this.stop();
    }

    setLabel(reading) {
      this.button.textContent = reading ? "Stop listening" : "Listen";
      this.button.setAttribute("aria-label", reading ? "Stop listening" : this.getAttribute("label") || "Listen");
    }

    stop() {
      if (current !== this) return;
      current = null;
      this.observer.disconnect();
      this.setLabel(false);
      speech.cancel();
    }

    read() {
      const nodes = this.getAttribute("for").split(/\s+/)
        .map(id => document.getElementById(id)).filter(node => node && node.getClientRects().length);
      const text = nodes.map(node => node.innerText.trim()).filter(Boolean).join("\n");
      if (!text) return;

      current?.stop();
      this.message.textContent = "";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-GB";
      utterance.rate = 0.9;
      this.utterance = utterance;
      const finish = (error) => {
        if (current !== this || this.utterance !== utterance) return;
        current = null;
        this.observer.disconnect();
        this.setLabel(false);
        if (error) this.message.textContent = "Read aloud is unavailable on this device.";
      };
      utterance.onend = () => finish(false);
      utterance.onerror = () => finish(true);
      current = this;
      this.setLabel(true);
      this.observer = new MutationObserver(() => this.stop());
      nodes.forEach(node => this.observer.observe(node, {childList: true, subtree: true, characterData: true}));
      speech.speak(utterance);
    }
  }

  customElements.define("listen-to", ListenTo);
})();

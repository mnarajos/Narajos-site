(function () {
  "use strict";

  const activities = new Map();
  const loads = new Map();
  const modules = [
    "methods", "observations", "methods", "methods", "observations", "observations",
    "chromatography", "mechanisms", "mechanisms", "simulations", "methods", "simulations"
  ];
  let fieldId = 0;

  function load(number) {
    const name = modules[number - 1];
    if (loads.has(name)) return loads.get(name);
    const promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "/alevel/practical-" + name + ".js";
      script.onload = resolve;
      script.onerror = () => {
        script.remove();
        loads.delete(name);
        reject(new Error("Could not load the practical activity"));
      };
      document.head.append(script);
    });
    loads.set(name, promise);
    return promise;
  }

  function element(tag, text, className) {
    const node = document.createElement(tag);
    node.textContent = text || "";
    if (className) node.className = className;
    return node;
  }

  function disclosure(summary, content) {
    const details = element("details");
    details.append(element("summary", summary), element("p", content));
    return details;
  }

  function answerForm(host, config, field, read, evaluate, model) {
    const form = element("form", "", "rp-question rp-card");
    const actions = element("div", "", "actions");
    const check = element("button", "Check answer", "btn primary");
    const reveal = element("button", "Reveal answer", "btn");
    const result = element("p", "", "rp-feedback");
    const hint = config.hint && disclosure("Show a hint", config.hint);
    let revised = false;
    let supported = false;
    let finished = false;

    check.type = "submit";
    reveal.type = "button";
    result.setAttribute("role", "status");
    actions.append(check, reveal);
    form.append(field);
    if (hint) {
      hint.addEventListener("toggle", () => { supported ||= hint.open; });
      form.append(hint);
    }
    form.append(actions, result);
    host.append(form);
    window.ALevelVocabulary?.setAssessment(form, {
      ...config.wordHelp,
      reveal() {
        if (!form.isConnected || finished) return false;
        supported = true;
        return true;
      },
    });

    function finish(message, status) {
      finished = true;
      window.ALevelVocabulary?.setAssessment(form, { completed: true });
      result.dataset.outcome = status;
      result.textContent = message;
      for (const input of field.querySelectorAll("input")) {
        if (input.type === "radio") input.disabled = true;
        else input.readOnly = true;
      }
      check.setAttribute("aria-disabled", "true");
      reveal.setAttribute("aria-disabled", "true");
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (finished) return;
      const { value, message } = read();
      if (value === null) {
        result.dataset.outcome = "missing";
        result.textContent = message;
        return;
      }
      const { correct, feedback } = evaluate(value);
      if (correct) {
        const assisted = !config.independent || supported || hint?.open;
        const label = assisted ? "Correct with support." : revised ? "Correct after revision." : "Correct independently.";
        finish(label + " " + feedback, assisted ? "supported" : revised ? "revised" : "independent");
      } else {
        revised = true;
        result.dataset.outcome = "retry";
        result.textContent = "Try again. " + feedback;
      }
    });
    reveal.addEventListener("click", () => {
      if (!finished) finish("Answer revealed. " + model, "revealed");
    });
    return form;
  }

  function choice(host, config) {
    const field = element("fieldset", "", "rp-options");
    field.append(element("legend", config.prompt));
    const name = "rp-choice-" + ++fieldId;
    const inputs = config.options.map((option, index) => {
      const label = element("label");
      const input = element("input");
      input.type = "radio";
      input.name = name;
      input.value = index;
      label.append(input, element("span", option));
      field.append(label);
      return input;
    });
    const feedback = (index) => Array.isArray(config.feedback) ? config.feedback[index] : config.feedback;
    return answerForm(host, config, field, () => {
      const index = inputs.findIndex(input => input.checked);
      return index < 0 ? { value: null, message: "Choose an answer first." } : { value: index };
    }, (index) => ({
      correct: index === config.correct,
      feedback: feedback(index) || "Use the evidence above to reconsider your choice."
    }), config.options[config.correct] + ". " + (feedback(config.correct) || ""));
  }

  function numberQuestion(host, config) {
    const field = element("label", "", "rp-number");
    const input = element("input");
    input.type = "text";
    input.inputMode = config.signed ? "text" : "decimal";
    input.autocomplete = "off";
    field.append(element("span", config.prompt), input);
    const read = () => {
      const parsed = NarajosAssessment.parse(input.value, config.unit ?? "", config.prompt);
      return { value: Number.isFinite(parsed.value) ? parsed.value : null, message: parsed.message };
    };
    return answerForm(host, config, field, read, (value) => {
      // Readings from a visual can vary even after rounding.
      const correct = NarajosAssessment.matches(value, config.answer, config.tolerance ?? 0);
      return { correct, feedback: correct ? config.feedback : (config.retry || "Check the reading, calculation and requested units.") };
    }, "Expected value: " + config.answer + ". " + config.feedback);
  }

  function stretch(host, prompt, model) {
    const details = element("details", "", "rp-card rp-stretch");
    const summary = element("summary");
    const marker = element("span", "", "stretch-icon");
    marker.setAttribute("aria-hidden", "true");
    summary.append(marker, document.createTextNode("Stretch"));
    const example = disclosure("Compare with a model", model);
    details.append(summary, element("p", prompt), example);
    host.append(details);
    let compared = false;
    function refreshVocabulary() {
      window.ALevelVocabulary?.setAssessment(details, { completed: !details.open || compared });
    }
    details.addEventListener("toggle", refreshVocabulary);
    example.addEventListener("toggle", () => {
      compared ||= example.open;
      refreshVocabulary();
    });
  }

  window.ALevelPracticals = {
    register(number, mount) {
      activities.set(number, mount);
    },
    async mount(number, host) {
      host.setAttribute("aria-busy", "true");
      try {
        await load(number);
        if (!host.isConnected) return;
        host.replaceChildren();
        return activities.get(number)(host, { choice, number: numberQuestion, stretch });
      } catch (error) {
        if (!host.isConnected) return;
        console.error(error);
        host.replaceChildren(element("p", "The activity could not load. Refresh to try again."));
      } finally {
        host.removeAttribute("aria-busy");
      }
    }
  };

}());

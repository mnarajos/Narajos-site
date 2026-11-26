(function () {
  "use strict";

  let nextId = 0;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function button(className, text) {
    const node = element("button", className, text);
    node.type = "button";
    return node;
  }

  function searchText(value) {
    return value.toLocaleLowerCase("en-GB").replace(/[‐‑–—]/g, "-").replace(/’/g, "'").replace(/\s+/g, " ").trim();
  }

  function create({ main, onLookup, onPreferenceChange, searchLabel = "Find a biology term" }) {
    const id = "vocabulary-help-" + ++nextId;
    const wide = window.matchMedia("(min-width: 64rem)");
    const layout = element("div", "vocabulary-layout");
    const toolbar = element("div", "vocabulary-toolbar");
    const openButton = button("vocabulary-control vocabulary-open", "Word help");
    const panel = element("dialog", "vocabulary-panel");
    const header = element("div", "vocabulary-panel-header");
    const heading = element("h2", "", "Word help");
    const dismiss = button("vocabulary-control vocabulary-dismiss", "Close");
    const lookup = element("div", "vocabulary-lookup");
    const detail = element("div", "vocabulary-detail");
    const relatedLookup = button("vocabulary-control vocabulary-lookup-again", "Look up another word");
    let lookupEntries = [];
    let restrictedLookup = false;
    let resultKey;
    let preference = "auto";
    let origin;
    let mode;
    let dock;

    heading.id = id + "-title";
    heading.tabIndex = -1;
    panel.id = id;
    panel.setAttribute("data-word-help-ignore", "");
    panel.setAttribute("aria-labelledby", heading.id);
    openButton.setAttribute("aria-controls", id);
    openButton.setAttribute("aria-haspopup", "dialog");
    openButton.setAttribute("aria-expanded", "false");
    dismiss.setAttribute("aria-label", "Close word help");
    toolbar.hidden = true;
    toolbar.append(openButton);
    header.append(heading, dismiss);

    const searchForm = element("form", "vocabulary-search-form");
    searchForm.setAttribute("role", "search");
    searchForm.setAttribute("aria-label", "Word help");
    const searchLabelElement = element("label", "", searchLabel);
    const search = element("input", "vocabulary-search");
    search.type = "search";
    search.id = id + "-search";
    search.autocomplete = "off";
    searchLabelElement.htmlFor = search.id;
    searchForm.append(searchLabelElement, search);
    const summary = element("p", "vocabulary-search-summary");
    summary.setAttribute("aria-live", "polite");
    const results = element("ul", "vocabulary-results");

    const settings = element("div", "vocabulary-settings");
    const moreLabel = element("label", "", "More word help");
    const more = element("input", "");
    more.type = "checkbox";
    const preferenceStatus = element("span", "vocabulary-preference-status");
    preferenceStatus.id = id + "-preference-status";
    more.setAttribute("aria-describedby", preferenceStatus.id);
    moreLabel.prepend(more);
    const reset = button("vocabulary-control vocabulary-reset", "Use activity default");
    settings.append(moreLabel, preferenceStatus, reset);
    lookup.append(settings, searchForm, summary, results);
    panel.append(header, lookup, detail, relatedLookup);
    main.before(layout);
    layout.append(toolbar, main, panel);

    const siteHeader = document.querySelector("header.top");
    if (siteHeader && "ResizeObserver" in window) {
      const setStickyTop = () => layout.style.setProperty(
        "--vocabulary-sticky-top", siteHeader.offsetHeight + "px"
      );
      setStickyTop();
      new ResizeObserver(setStickyTop).observe(siteHeader);
    }

    const viewport = window.visualViewport;
    function fitSheet() {
      if (!viewport || !panel.open || !panel.hasAttribute("data-modal")) return;
      // The on-screen keyboard can shrink the visual viewport without resizing the page.
      const gap = document.documentElement.clientHeight - viewport.height - viewport.offsetTop;
      panel.style.setProperty("--vocabulary-sheet-gap", Math.max(0, gap) + "px");
      panel.style.setProperty("--vocabulary-sheet-height", Math.floor(viewport.height * .72) + "px");
    }
    viewport?.addEventListener("resize", fitSheet);
    viewport?.addEventListener("scroll", fitSheet);

    function setOrigin(target) {
      origin?.setAttribute("aria-expanded", "false");
      origin = target && !panel.contains(target) ? target : origin?.isConnected ? origin : openButton;
      origin.setAttribute("aria-expanded", "true");
      openButton.setAttribute("aria-expanded", "true");
    }

    function open(target, focus) {
      setOrigin(target);
      if (!panel.open) {
        const x = window.scrollX;
        const y = window.scrollY;
        const parentModal = origin.closest("dialog:modal");
        const modal = !wide.matches;
        if (parentModal && !modal) {
          dock = parentModal;
          dock.setAttribute("data-vocabulary-dock", "");
          panel.setAttribute("data-docked", "");
          dock.prepend(panel);
        }
        panel.toggleAttribute("data-modal", modal);
        if (modal) panel.showModal();
        else panel.show();
        fitSheet();
        if (window.scrollX !== x || window.scrollY !== y) window.scrollTo(x, y);
      }
      panel.scrollTop = 0;
      focus.focus({ preventScroll: true });
    }

    function close({ restoreFocus = true } = {}) {
      if (!panel.open) return;
      const x = window.scrollX;
      const y = window.scrollY;
      const target = origin?.isConnected ? origin : openButton;
      panel.close();
      if (dock) {
        dock.removeAttribute("data-vocabulary-dock");
        panel.removeAttribute("data-docked");
        layout.append(panel);
        dock = undefined;
      }
      panel.removeAttribute("data-modal");
      panel.style.removeProperty("--vocabulary-sheet-gap");
      panel.style.removeProperty("--vocabulary-sheet-height");
      origin?.setAttribute("aria-expanded", "false");
      openButton.setAttribute("aria-expanded", "false");
      origin = undefined;
      if (restoreFocus && !toolbar.hidden) target.focus({ preventScroll: true });
      if (window.scrollX !== x || window.scrollY !== y) window.scrollTo(x, y);
    }

    function updateResults() {
      const query = searchText(search.value);
      const matches = [];
      for (const item of lookupEntries) {
        const { entry = item, termOnly } = item;
        const title = entry.lookupLabel || entry.term;
        const names = termOnly
          ? [title, entry.term]
          : [title, entry.term, ...(entry.variants || []), ...(entry.synonyms || [])];
        const normalized = names.map(searchText);
        if (!query || normalized.some(name => name.includes(query))) {
          const rank = normalized.includes(query) ? 0
            : normalized.some(name => name.startsWith(query)) ? 1 : 2;
          matches.push({ entry, title, rank });
        }
      }
      if (query) matches.sort((a, b) => a.rank - b.rank || a.title.localeCompare(b.title, "en-GB"));
      const shown = matches.slice(0, 8);
      const key = JSON.stringify(shown.map(({ entry, title }) => [entry.id, title]));
      if (key !== resultKey) {
        resultKey = key;
        results.replaceChildren(...shown.map(({ entry, title }) => {
          const listItem = element("li", "");
          const control = button("vocabulary-control vocabulary-result", title);
          control.addEventListener("click", () => onLookup(entry, { origin: control }));
          listItem.append(control);
          return listItem;
        }));
      }
      const status = !query ? (restrictedLookup ? "Word help is limited for this question." : "Search by term or synonym.")
        : !matches.length ? (restrictedLookup ? "No matching terms available for this question." : "No reviewed terms found.")
        : matches.length > shown.length ? "Showing " + shown.length + " matches. Keep typing to narrow your search."
        : matches.length + (matches.length === 1 ? " match." : " matches.");
      if (summary.textContent !== status) summary.textContent = status;
    }

    function setMode(nextMode, title) {
      mode = nextMode;
      heading.textContent = title;
      lookup.hidden = mode !== "lookup";
      detail.hidden = mode === "lookup";
      relatedLookup.hidden = mode === "lookup";
    }

    function showLookup(target) {
      setMode("lookup", "Word help");
      updateResults();
      // Focus the heading on narrow screens so the keyboard opens only when requested.
      open(target, wide.matches ? search : heading);
    }

    function showDefinition(entry, { origin: target, excerpt } = {}) {
      setMode("definition", entry.lookupLabel || entry.term);
      detail.replaceChildren(element("p", "vocabulary-meaning", entry.meaning));
      if (entry.here) detail.append(element("p", "vocabulary-context", entry.here));
      if (entry.example) detail.append(element("p", "vocabulary-example", entry.example));
      if (excerpt) {
        const quote = element("blockquote", "vocabulary-excerpt", excerpt);
        quote.setAttribute("aria-label", "From the passage");
        detail.append(quote);
      }
      if (entry.catchup) {
        const link = element("a", "vocabulary-control vocabulary-catchup", "Open catch-up lesson");
        link.href = entry.catchup;
        detail.append(link);
      }
      open(target, heading);
    }

    function showRestriction({ title, message, actionLabel, onAction }, { origin: target } = {}) {
      setMode("restriction", title);
      detail.replaceChildren(element("p", "vocabulary-meaning", message));
      if (actionLabel && onAction) {
        const reveal = button("vocabulary-control vocabulary-reveal", actionLabel);
        reveal.addEventListener("click", onAction);
        detail.append(reveal);
      }
      open(target, heading);
    }

    function setContext({ visible = true, preference: nextPreference = "auto", defaultIncreased, lookupEntries: entries = [], restricted = false } = {}) {
      if (!visible) close({ restoreFocus: false });
      toolbar.hidden = !visible;
      lookupEntries = entries;
      restrictedLookup = restricted;
      preference = nextPreference;
      more.checked = preference === "more" || (preference === "auto" && defaultIncreased);
      preferenceStatus.textContent = preference === "auto" ? "Activity default" : "Saved preference";
      reset.hidden = preference === "auto";
      if (mode === "lookup" && panel.open) updateResults();
    }

    openButton.addEventListener("click", () => {
      if (panel.open && mode === "lookup") close();
      else showLookup(openButton);
    });
    dismiss.addEventListener("click", () => close());
    relatedLookup.addEventListener("click", () => showLookup(relatedLookup));
    search.addEventListener("input", updateResults);
    searchForm.addEventListener("submit", event => {
      event.preventDefault();
      if (results.childElementCount === 1) results.querySelector("button").click();
      else results.querySelector("button")?.focus();
    });
    more.addEventListener("change", () => onPreferenceChange(more.checked ? "more" : "selective"));
    reset.addEventListener("click", () => {
      onPreferenceChange("auto");
      more.focus({ preventScroll: true });
    });
    panel.addEventListener("cancel", event => {
      event.preventDefault();
      close();
    });
    panel.addEventListener("click", event => {
      if (event.target === panel && event.clientY < panel.getBoundingClientRect().top) close();
    });
    panel.addEventListener("keydown", event => {
      if (["ArrowLeft", "ArrowRight", "Enter"].includes(event.key)) event.stopPropagation();
    });
    document.addEventListener("keydown", event => {
      if (event.key !== "Escape" || event.defaultPrevented || !panel.open || panel.hasAttribute("data-modal")) return;
      if (!dock?.contains(event.target) && event.target.closest?.("dialog:not(.vocabulary-panel), [role=dialog]")) return;
      event.preventDefault();
      if (dock) event.stopPropagation();
      close();
    }, true);
    wide.addEventListener("change", () => {
      if (!panel.open) return;
      const target = origin;
      const focus = panel.contains(document.activeElement) ? document.activeElement : heading;
      close({ restoreFocus: false });
      open(target, focus);
    });

    return { panelId: id, setContext, showDefinition, showRestriction, close, isOpen: () => panel.open };
  }

  window.NarajosVocabularyPanel = { create };
})();

(function(){
  "use strict";
  // Keep writing in the current browser tab, including when leaving to view a model.
  for (const field of document.querySelectorAll("textarea[data-draft]")) {
    const key = "narajos-paragraph:" + field.id;
    try { field.value = sessionStorage.getItem(key) || ""; } catch (_) {}
    field.addEventListener("input", function(){
      try { sessionStorage.setItem(key, field.value); } catch (_) {}
    });
  }
})();

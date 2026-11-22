const prefix = "narajos.catchup.v1.";

export function readCatchup(id) {
  try {
    const value = JSON.parse(localStorage.getItem(prefix + id));
    return value && Number.isInteger(value.step) && value.step >= 0 ? value : {step: 0};
  } catch {
    return {step: 0};
  }
}

export function saveCatchup(id, value) {
  try {
    localStorage.setItem(prefix + id, JSON.stringify({...value, updated: Date.now()}));
    return true;
  } catch {
    return false;
  }
}

export function latestCatchup(year) {
  try {
    let latest;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith(prefix)) continue;
      const value = readCatchup(key.slice(prefix.length));
      if (!value.started || value.done || (year && value.year !== year)) continue;
      if (!value.title || !value.href || !/^\/(?:ks3|science-catch-up)\//.test(value.href)) continue;
      if (!latest || value.updated > latest.updated) latest = value;
    }
    return latest;
  } catch {
    return undefined;
  }
}

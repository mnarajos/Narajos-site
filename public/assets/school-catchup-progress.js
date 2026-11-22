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
    localStorage.setItem(prefix + id, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function catchupKeys() {
  return Object.keys(localStorage).filter(key => key.startsWith(prefix));
}

export function hasCatchupProgress() {
  try {
    return catchupKeys().length > 0;
  } catch {
    return false;
  }
}

export function clearCatchupProgress() {
  try {
    for (const key of catchupKeys()) localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

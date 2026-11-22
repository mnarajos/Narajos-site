const clauses = text => text.toLowerCase()
  .replace(/[−–]/g, "-")
  .replace(/[’‘]/g, "'")
  .split(/[;!?]|\.(?=\s|$)|\n+|,\s*(?=(?:in\s+)?(?:the\s+)?(?:dilute|concentrated)\b)|,?\s+\b(?:while|whereas|but|and)\b\s+/)
  .map(part => part.trim())
  .filter(Boolean);

const denial = /\b(?:not|never|no|instead of|rather than|without|wrong|incorrect)\b|n't\b/;
const uncertainty = /\b(?:might|maybe|perhaps|could|possibly)\b/;
const dilute = /\b(?:dilute(?:d)?|weaker|less concentrated|lower (?:sugar |solute )?concentration)\b/;
const concentrated = /\b(?:concentrated|stronger|higher (?:sugar |solute )?concentration)\b/;
const up = /\b(?:gain\w*|increas\w*|ris(?:e|es|ing)|rose|grew|went up|heavier|more mass)\b/;
const down = /\b(?:los(?:e|es|ing|s|t)|decreas\w*|fell|fall\w*|went down|drop\w*|lighter|less mass|reduc\w*)\b/;

function result(label, state, feedback) {
  return { label, state, feedback };
}

function solutionIn(text) {
  if (dilute.test(text)) {
    const remainder = text.replace(dilute, "");
    return concentrated.test(remainder) ? null : "dilute";
  }
  return concentrated.test(text) ? "concentrated" : null;
}

const otherQuantity = /\b(?:concentration|temperature|length|volume)\s+(?:(?:had|has|was|is)\s+)?(?:increas\w*|decreas\w*|fell|rose|went (?:up|down)|was higher|was lower)\b/;
const wrongObject = /\b(?:solution|water|sugar)(?: itself)?\s+(?:(?:had|has)\s+)?(?:gain\w*|lost|loses?)\b|\bmass of (?:the )?(?:solution|water|sugar)\b/;

function massChange(text) {
  if (otherQuantity.test(text) || wrongObject.test(text)) return null;
  const values = [...text.matchAll(/(?<![\d.])([+-])?\s*(\d+(?:\.\d+)?)\s*(?:%|per\s*cent\b)/g)];
  if (values.length !== 1 || denial.test(text) || uncertainty.test(text)) return null;
  const [, sign, amount] = values[0];
  const saysUp = up.test(text);
  const saysDown = down.test(text);
  if ((saysUp && saysDown) || (sign === "-" && saysUp) || (sign === "+" && saysDown)) return null;
  if (sign === "-" || saysDown) return -Number(amount);
  if (sign === "+" || saysUp) return Number(amount);
  return null;
}

function readPotatoEvidence(parts, expected) {
  const changes = { dilute: [], concentrated: [] };
  for (const part of parts) {
    const type = solutionIn(part);
    if (type) changes[type].push(massChange(part));
  }

  return Object.entries(expected).map(([type, value]) => {
    const matches = changes[type].filter(change => change !== null);
    const otherType = type === "dilute" ? "concentrated" : "dilute";
    const label = "Result in " + type + " solution";
    if (matches.length && matches.every(change => change === value)) {
      return result(label, "credited", "You matched the direction and percentage to the " + type + " solution.");
    }
    if (matches.includes(expected[otherType]) || (matches.includes(value) && matches.some(change => change !== value))) {
      return result(label, "revise", "Check the bar for the " + type + " solution. Pair its own percentage and sign with that solution.");
    }
    if (matches.length) {
      return result(label, "revise", "Recheck the percentage and whether mass gained or fell in the " + type + " solution.");
    }
    return result(label, "compare", "Write the " + type + " solution, whether mass rose or fell, and the percentage together.");
  });
}

const water = /\bwater\b/;
const cells = /\b(?:cells?|potato(?:es)?)\b/;
const cellTarget = String.raw`(?:the |its |their )?(?:potato(?: cells?)?|cells?)\b`;
const intoCells = new RegExp(String.raw`\bwater\b.{0,90}\b(?:in ?to|enter\w*)\s+` + cellTarget +
  String.raw`|\b(?:cells?|potato)\b.{0,20}\b(?:take|took) up water\b`);
const outOfCells = new RegExp(String.raw`\bwater\b.{0,90}\b(?:out of|leav\w*|left|from)\s+` + cellTarget);

function causalParts(part) {
  const reason = part.match(/^(.*?)\s*,?\s*\b(?:because|due to(?: the fact that)?)\b\s*(.+)$/);
  if (reason) return { outcome: reason[1], cause: reason[2] };
  const consequence = part.match(/^(.*?)\s*,?\s*\b(?:so|therefore|which (?:made|makes|caused|causes)|causing|led to|caused|made|makes)\b\s*(.+)$/);
  return consequence ? { outcome: consequence[2], cause: consequence[1] } : null;
}

function readWaterMovement(parts, type, assumeSample) {
  const entering = type === "dilute";
  const flow = entering ? intoCells : outOfCells;
  const opposite = entering ? outOfCells : intoCells;
  const effect = entering ? up : down;
  const label = entering ? "Water movement and mass gain" : "Water movement and mass loss";
  const model = entering ? "Net movement of water into the potato cells made the sample gain mass."
    : "Net movement of water out of the potato cells made the sample lose mass.";

  const related = parts.filter(part => {
    const solution = solutionIn(part);
    return solution === type || (!solution && (assumeSample || effect.test(part)));
  });
  const waterClaims = related.filter(part => water.test(part) && cells.test(part));
  const matches = waterClaims.some(part => {
    const link = causalParts(part);
    return link && effect.test(link.outcome) && water.test(link.cause) && cells.test(link.cause) &&
      flow.test(link.cause) && !opposite.test(link.cause.split(/\bthan\b/)[0]) &&
      !denial.test(part) && !uncertainty.test(part);
  });
  const reversed = waterClaims.some(part => {
    const cause = causalParts(part)?.cause || part;
    return opposite.test(cause) && !flow.test(cause);
  });

  if (matches && !reversed) return result(label, "credited", "You linked the direction of water movement to the change in mass.");
  if (reversed) return result(label, "revise", entering ? "If mass increased, did more water enter the potato or leave it?"
    : "If mass decreased, did more water enter the potato or leave it?");
  return result(label, "compare", "Compare with this link, then try again. " + model);
}

const faster = /\b(?:faster|more (?:quickly|rapidly)|(?:higher|greater) (?:average )?(?:speeds?|velocity)|speed up|sped up|(?:mov\w*|travell?\w*) quicker)\b/;
const spread = /\b(?:spread\w*|diffus\w*|travell?\w*|dispers\w*)\b/;
const comparative = /\b(?:further|farther|quicker|faster|more (?:quickly|rapidly|widely)|(?:larger|greater|bigger) (?:area|distance))\b/;

function readDiffusion(parts) {
  const label = "Particle movement explains the spread";
  const cold = /\b(?:cool(?:er)?|cold(?:er)?)\b/;
  const warm = /\b(?:warm(?:er)?|hot(?:ter)?)\b/;
  const compare = /\b(?:than|compared (?:with|to))\b/;
  const motion = /\b(?:mov\w*|travell?\w*|speed\w*)\b/;
  const wrongTemperature = part => cold.test(part.split(compare)[0]) && !warm.test(part.split(compare)[0]);
  let linked = false;

  for (const part of parts) {
    const link = causalParts(part);
    if (!link) continue;
    const { outcome: evidence, cause: mechanism } = link;
    if (wrongTemperature(evidence) || wrongTemperature(mechanism) ||
        /\b(?:slow\w*|(?:more|bigger|larger)\s+(?:dye |colouring |fragrance )?(?:particles?|molecules?))\b/.test(mechanism)) {
      return result(label, "revise", "Keep the same particles. Which water or air sample makes them move faster on average?");
    }
    const ambientOnly = /\b(?:water|air) (?:particles?|molecules?)\b/.test(mechanism) &&
      !/\b(?:dye|colou?r(?:ing)?|fragrance|scent|perfume|ink) (?:particles?|molecules?)\b/.test(mechanism);
    if (!ambientOnly && !denial.test(part) && !uncertainty.test(part) &&
        /\b(?:particles?|molecules?)\b/.test(mechanism) && motion.test(mechanism) &&
        faster.test(mechanism) && spread.test(evidence) && comparative.test(evidence)) {
      linked = true;
    }
  }
  if (linked) return result(label, "credited", "You explained the faster spread using faster particle movement.");
  return result(label, "compare", "Link the two ideas in one sentence. What moved faster, and how did that affect the spread?");
}

export function reviewWriting(task, kind, text) {
  const parts = clauses(text);
  if (task === "dye") return [readDiffusion(parts)];

  if (kind === "reason") return [readWaterMovement(parts, "dilute", true)];
  const evidence = readPotatoEvidence(parts, kind === "transfer" ? { dilute: 5, concentrated: -6 } : { dilute: 7, concentrated: -9 });
  if (kind !== "paragraph") return evidence;
  return [...evidence, readWaterMovement(parts, "dilute", false), readWaterMovement(parts, "concentrated", false)];
}

// The answer box supplies the unit for a bare number. If a pupil also types
// a unit, keep its dimensions and its prefix when comparing the quantities.
(function (root) {
  "use strict";
  const units = new Map();
  function unitKey(text) {
    return text.normalize("NFKC").replace(/[−–]/g,"-").replace(/μ/g,"µ")
      .replace(/\bper\b/gi,"/").replace(/[·⋅^\s]/g,"").trim();
  }
  function register(dimension, definitions) {
    for (const [factor, names] of definitions) {
      for (const name of names.split("|")) units.set(unitKey(name), {dimension, factor});
    }
  }
  register("length", [[1,"m|metres|meters|metre|meter"],[0.01,"cm|centimetres|centimeters"],[0.001,"mm|millimetres|millimeters"],[1e-6,"µm|um|micrometres|micrometers"],[1e-9,"nm|nanometres|nanometers"],[1000,"km|kilometres|kilometers"]]);
  register("area", [[1,"m²"],[1e-4,"cm²"],[1e-6,"mm²"]]);
  register("volume", [[1,"L|l|litre|litres|liter|liters|dm³"],[0.001,"mL|ml|cm³"],[1e-6,"µL|µl|mm³"],[1000,"m³"]]);
  register("mass", [[1,"g|gram|grams"],[1000,"kg|kilograms"],[0.001,"mg|milligrams"]]);
  register("time", [[1,"s|sec|second|seconds"],[0.001,"ms|milliseconds"],[60,"min|minute|minutes"],[3600,"h|hr|hour|hours"],[86400,"d|day|days"]]);
  register("energy", [[1,"J|joule|joules"],[1000,"kJ|kilojoules"],[1e6,"MJ|megajoules"],[0.001,"mJ|millijoules"]]);
  register("power", [[1,"W|watt|watts"],[1000,"kW|kilowatts"],[1e6,"MW|megawatts"],[0.001,"mW|milliwatts"]]);
  register("frequency", [[1,"Hz|hertz"],[1000,"kHz"],[1e6,"MHz"],[1e14,"× 10¹⁴ Hz"]]);
  register("speed", [[1,"m/s|m s⁻¹"],[0.001,"mm/s|mm s⁻¹"]]);
  register("acceleration", [[1,"m/s²|m s⁻²"]]);
  register("mass concentration", [[1,"g/dm³|g dm⁻³|g/L|g L⁻¹|mg/mL|mg mL⁻¹"],[1000,"g/cm³|g cm⁻³|g/mL"],[0.001,"mg/L|mg dm⁻³"]]);
  register("amount concentration", [[1,"mol/dm³|mol dm⁻³|mol/L|mol L⁻¹"],[0.001,"mmol/dm³|mmol dm⁻³|mmol/L|mmol L⁻¹"]]);
  register("volume rate", [[1,"L/min|L min⁻¹|dm³/min|dm³ min⁻¹"],[0.001,"mL/min|cm³/min|cm³ min⁻¹"],[0.06,"cm³/s|cm³ s⁻¹|mL/s"],[1e-6,"mm³/min|mm³ min⁻¹"]]);
  register("reciprocal time", [[1,"s⁻¹|/s|1/s|per second"],[1/60,"min⁻¹|/min"],[1/3600,"h⁻¹|/h"]]);
  register("heart rate", [[1,"beats per minute|beats/min|beats min⁻¹|bpm"]]);
  register("pressure", [[1,"Pa|pascals"],[1000,"kPa|kilopascals"]]);
  register("temperature", [[1,"°C|degrees Celsius|degrees C"]]);
  register("percentage", [[1,"%|per cent|percent"]]);
  register("magnification", [[1,"×|x|times|times (×)|× (times)"]]);

  const unsigned = "(?:[0-9]+(?:[.,][0-9]*)?|[.,][0-9]+)";
  const scalar = new RegExp("^([+-]?"+unsigned+")(?:(?:[eE]|\\s*[×x*]\\s*10\\s*\\^?)\\s*([+-]?\\d+))?");
  function parse(raw, expectedUnit = "", question = "") {
    const invalid = {value:NaN, message:"Enter one number" + (expectedUnit ? " in "+expectedUnit : "") + "."};
    const expected = unitKey(expectedUnit);
    let text = String(raw).trim().replace(/[−–]/g,"-")
      .replace(/([×x*]\s*10)\s*([⁻⁺⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (_,base,exp)=>base+"^"+exp.normalize("NFKC").replace(/−/g,"-"));
    if (/uncertainty/i.test(question)) text = text.replace(/^(?:±|\+\/-)\s*/,"");
    if (units.get(expected)?.dimension==="magnification") text = text.replace(/^[×x]\s*/,"");
    // UK grouping. An isolated comma followed by one or two digits is decimal.
    text = text.replace(/^([+-]?[1-9]\d{0,2}(?:,\d{3})+)(?![\d,])/, m=>m.replaceAll(",",""))
      .replace(/^([+-]?\d{1,3}(?:[ \u2009\u202f]\d{3})+)(?!\d)/, m=>m.replace(/\s/g,""));
    const match = scalar.exec(text);
    if (!match) return invalid;
    let value = Number(match[1].replace(",",".")) * 10 ** Number(match[2] || 0);
    let tail = text.slice(match[0].length).trim();
    const fraction = /^([/:])\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))(?![\d.])/.exec(tail);
    if (fraction) {
      if (fraction[1] === ":" && expected && expected !== ":1" || !Number(fraction[2])) return invalid;
      value /= Number(fraction[2]);
      tail = tail.slice(fraction[0].length).trim();
    }
    if (tail) {
      const actual = unitKey(tail);
      if (!actual || actual !== expected) {
        const from = units.get(actual), to = units.get(expected);
        if (!from || !to || from.dimension !== to.dimension)
          return {value:NaN,message:expectedUnit ? "Check the unit. This answer is measured in "+expectedUnit+"." : "Enter a value without a unit for this quantity."};
        value *= from.factor / to.factor;
      }
    }
    return Number.isFinite(value) ? {value} : invalid;
  }

  // Explicit rounding instructions take priority over a broad default tolerance.
  function matches(value, key, tolerance, question = "", unit = "") {
    if (!Number.isFinite(value)) return false;
    const precision = question.match(/(?:to|rounded to)\s+(\d+)\s+(decimal places?|significant figures?)/i);
    if (precision) {
      const digits=Number(precision[1]);
      const rounded=Number(precision[2].startsWith("decimal") ? key.toFixed(digits) : key.toPrecision(digits));
      return Math.abs(value-rounded) <= 8*Number.EPSILON*Math.max(Math.abs(rounded),Number.MIN_VALUE);
    }
    if (Number.isInteger(key) && /^(?:cells|bacteria|chromosomes|plants|molecules|flies|copies|codons|bivalents|generations|amino acids|combinations|pups|snails|bases)$/.test(unit)) return value === key;
    return Math.abs(value-key) <= (tolerance ?? Math.max(1e-9,Math.abs(key)*0.005)) + 4*Number.EPSILON*Math.abs(key);
  }
  function shellsMatch(raw, answer) {
    const shells = text => text.trim().split(/\s*[,.;]\s*|\s+/);
    const given=shells(raw), key=shells(answer);
    return given.length===key.length && given.every((n,i)=>/^\d+$/.test(n) && Number(n)===Number(key[i]));
  }
  root.NarajosAssessment = {parse,matches,shellsMatch};
})(globalThis);

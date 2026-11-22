(() => {
  function swatch(colour, dash) {
    return '<svg class="series-swatch" viewBox="0 0 26 12" aria-hidden="true"><line x1="1" x2="25" y1="6" y2="6" stroke="'+colour+'" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="'+(dash.join(" ")||"none")+'"/></svg>';
  }

  function labelEnds(context, endX, top, bottom, labels) {
    if (!labels.length) return;
    const ordered = [...labels].sort((a, b) => a.y - b.y);
    const gap = Math.min(15, (bottom - top) / Math.max(1, ordered.length - 1));
    const positions = [];
    ordered.forEach((label, i) => {
      positions.push(Math.max(top, label.y, i ? positions[i - 1] + gap : top));
    });
    positions[positions.length - 1] = Math.min(bottom, positions[positions.length - 1]);
    for (let i = positions.length - 2; i >= 0; i--) {
      positions[i] = Math.min(positions[i], positions[i + 1] - gap);
    }

    context.save();
    context.font = "650 11px system-ui,sans-serif";
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillStyle = "#162d3a";
    ordered.forEach((label, i) => {
      const y = positions[i];
      context.setLineDash(label.dash);
      context.strokeStyle = label.colour;
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(endX, label.y);
      context.lineTo(endX + 8, y);
      context.stroke();
      context.fillText(label.text, endX + 10, y);
    });
    context.restore();
  }

  window.NarajosGraphSeries = {swatch, labelEnds};
})();

(() => {
  const diagram = document.querySelector('.carrier-anim');
  const button = document.getElementById('refresher-control');
  const note = document.getElementById('refresher-motion-note');
  if (!diagram || !button || !note) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let playing = false;
  let finished = false;
  function reset() {
    diagram.classList.remove('is-playing');
    diagram.classList.add('is-reset');
    void diagram.getBoundingClientRect();
    diagram.classList.remove('is-reset');
    playing = false;
    finished = false;
  }
  function applyPreference() {
    if (reduced.matches) {
      reset();
      button.hidden = true;
      note.hidden = false;
    } else {
      button.hidden = false;
      note.hidden = true;
      button.textContent = 'Play animation';
    }
  }
  button.addEventListener('click', () => {
    if (finished) reset();
    playing = !playing;
    diagram.classList.toggle('is-playing', playing);
    button.textContent = playing ? 'Pause animation' : 'Resume animation';
  });
  diagram.addEventListener('animationend', event => {
    if (event.animationName !== 'refresher-travel' || finished) return;
    playing = false;
    finished = true;
    diagram.classList.remove('is-playing');
    button.textContent = 'Replay animation';
  });
  reduced.addEventListener('change', applyPreference);
  applyPreference();
})();

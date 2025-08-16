const nav = document.querySelector('.dot-nav');
const dots = Array.from(document.querySelectorAll('.dot'));

function setActiveDot(targetButton) {
  dots.forEach((btn) => {
    const isActive = btn === targetButton;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

nav.addEventListener('click', (e) => {
  const target = e.target.closest('.dot');
  if (!target) return;
  setActiveDot(target);
});

// Keyboard support: Up/Down arrows and Enter/Space to activate
nav.addEventListener('keydown', (e) => {
  const currentIndex = dots.findIndex((d) => d.classList.contains('active'));

  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault();
    const next = dots[(currentIndex + 1) % dots.length];
    next.focus();
    setActiveDot(next);
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault();
    const prev = dots[(currentIndex - 1 + dots.length) % dots.length];
    prev.focus();
    setActiveDot(prev);
  } else if (e.key === 'Enter' || e.key === ' ') {
    const target = document.activeElement.closest('.dot');
    if (target) {
      e.preventDefault();
      setActiveDot(target);
    }
  }
});



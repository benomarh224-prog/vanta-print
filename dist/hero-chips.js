(() => {
  const strip = document.querySelector('.hero-v2-strip');
  if (!strip) return;

  let drag = null;
  let suppressClick = false;

  strip.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || strip.scrollWidth <= strip.clientWidth) return;
    drag = { id: event.pointerId, x: event.clientX, left: strip.scrollLeft, moved: false };
  });

  strip.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const distance = event.clientX - drag.x;
    if (!drag.moved && Math.abs(distance) < 6) return;
    if (!drag.moved) {
      drag.moved = true;
      strip.classList.add('is-dragging');
      strip.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    strip.scrollLeft = drag.left - distance;
  });

  const endDrag = () => {
    if (!drag) return;
    if (drag.moved) {
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 250);
    }
    drag = null;
    strip.classList.remove('is-dragging');
  };

  strip.addEventListener('pointerup', endDrag);
  strip.addEventListener('pointercancel', endDrag);
  strip.addEventListener('click', event => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    suppressClick = false;
  }, true);
})();

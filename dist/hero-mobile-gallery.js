(() => {
  const gallery = document.querySelector('.hero-v2-photo');
  if (!gallery) return;

  const frames = [...gallery.querySelectorAll('.hero-gallery-frame')];
  const dots = [...gallery.querySelectorAll('.hero-gallery-dots button')];
  const toggle = gallery.querySelector('.hero-gallery-toggle');
  const count = gallery.querySelector('.hero-gallery-count');
  const mobile = matchMedia('(max-width: 620px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let paused = reducedMotion.matches;
  let visible = false;
  let timer;

  const ready = image => image.complete && image.naturalWidth
    ? Promise.resolve()
    : (image.decode ? image.decode() : new Promise(resolve => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      })).catch(() => {});

  function sync() {
    frames.forEach((frame, index) => {
      frame.classList.toggle('is-active', index === current);
      frame.setAttribute('aria-hidden', String(index !== current));
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === current);
      if (index === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(frames.length).padStart(2, '0')}`;
    toggle.disabled = reducedMotion.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'شغّل تبديل الصور' : 'وقف تبديل الصور');
  }

  function canPlay() {
    return mobile.matches && visible && !document.hidden && !paused && !reducedMotion.matches;
  }

  function schedule() {
    clearTimeout(timer);
    if (!canPlay()) return;
    timer = setTimeout(async () => {
      const next = (current + 1) % frames.length;
      await ready(frames[next]);
      if (!canPlay()) return;
      current = next;
      sync();
      schedule();
    }, 5000);
  }

  dots.forEach((dot, index) => dot.addEventListener('click', async () => {
    paused = true;
    clearTimeout(timer);
    await ready(frames[index]);
    current = index;
    sync();
  }));

  toggle.addEventListener('click', () => {
    if (reducedMotion.matches) return;
    paused = !paused;
    sync();
    schedule();
  });

  gallery.addEventListener('mouseenter', () => clearTimeout(timer));
  gallery.addEventListener('mouseleave', schedule);
  gallery.addEventListener('focusin', () => clearTimeout(timer));
  gallery.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  mobile.addEventListener('change', () => {
    if (!mobile.matches) { current = 0; sync(); }
    schedule();
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) paused = true;
    sync();
    schedule();
  });

  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    schedule();
  }, { threshold: 0.15 }).observe(gallery);
  frames.slice(1).forEach(ready);
  sync();
})();

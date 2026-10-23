(() => {
  const banner = document.querySelector('.mobile-world-banner');
  if (!banner) return;
  const frames = [...banner.querySelectorAll('.mobile-banner-frame')];
  const dots = [...banner.querySelectorAll('.mobile-banner-dots button')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 620px)');
  let current = 0;
  let timer;
  let visible = false;
  let paused = false;
  let hovered = false;
  let focused = false;

  frames.slice(1).forEach(frame => {
    const preloader = new Image();
    preloader.src = frame.src;
    preloader.decode?.().catch(() => {});
  });

  function show(index) {
    const next = (index + frames.length) % frames.length;
    if (!frames[next].complete || !frames[next].naturalWidth) return;
    current = next;
    frames.forEach((frame, i) => frame.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }
  function reconcile() {
    clearInterval(timer);
    timer = undefined;
    if (mobile.matches && visible && !document.hidden && !reduced.matches && !paused && !hovered && !focused) {
      timer = setInterval(() => show(current + 1), 5000);
    }
  }
  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    paused = true;
    show(i);
    reconcile();
  }));
  banner.addEventListener('mouseenter', () => { hovered = true; reconcile(); });
  banner.addEventListener('mouseleave', () => { hovered = false; reconcile(); });
  banner.addEventListener('focusin', () => { focused = true; reconcile(); });
  banner.addEventListener('focusout', () => { focused = banner.contains(document.activeElement); reconcile(); });
  document.addEventListener('visibilitychange', reconcile);
  reduced.addEventListener('change', reconcile);
  mobile.addEventListener('change', reconcile);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; reconcile(); }, { threshold: .15 }).observe(banner);
})();

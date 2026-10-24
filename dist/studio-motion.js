/* Motion direction: SVGator's animated icons and microinteractions.
   No third-party animation runtime; transform/opacity only. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.querySelector('.campaign-hero');

  if (hero) {
    const frames = [...hero.querySelectorAll('.campaign-frame')];
    const dots = [...hero.querySelectorAll('[data-slide]')];
    const toggle = hero.querySelector('.campaign-toggle');
    const counter = hero.querySelector('.campaign-current');
    const chapter = hero.querySelector('.campaign-chapter');
    const period = 6000;
    let current = 0, timer, visible = false, hover = false, focus = false;
    let paused = false, request = 0, startPoint;
    const ready = frame => frame.complete
      ? Promise.resolve(frame.naturalWidth > 0)
      : frame.decode().then(() => frame.naturalWidth > 0).catch(() => false);
    const canRun = () => visible && !document.hidden && !reduced.matches && !paused && !hover && !focus;

    function sync() {
      frames.forEach((frame, i) => {
        frame.classList.toggle('is-active', i === current);
        frame.setAttribute('aria-hidden', String(i !== current));
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
        if (i === current) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      counter.textContent = String(current + 1).padStart(2, '0');
      chapter.textContent = frames[current].dataset.chapter;
      toggle.setAttribute('aria-pressed', String(paused || reduced.matches));
      toggle.setAttribute('aria-label', reduced.matches ? 'الحركة متوقفة حسب إعدادات الجهاز' : paused ? 'شغّل تبديل الصور' : 'وقف تبديل الصور');
      toggle.disabled = reduced.matches;
    }

    async function show(index) {
      const token = ++request;
      const next = (index + frames.length) % frames.length;
      if (!await ready(frames[next]) || token !== request) return;
      current = next;
      sync();
    }

    function reconcile() {
      clearTimeout(timer);
      request++;
      hero.classList.remove('is-running');
      if (!canRun()) return;
      // Restart the active dot's progress only when a new playback period begins.
      void hero.offsetWidth;
      hero.classList.add('is-running');
      timer = setTimeout(async () => {
        if (!canRun()) return;
        await show(current + 1);
        reconcile();
      }, period);
    }

    function navigate(index) {
      paused = true;
      reconcile();
      // Reflect pause immediately, even when the target image is still decoding.
      sync();
      show(index);
    }
    dots.forEach((dot, i) => dot.addEventListener('click', () => navigate(i)));
    hero.querySelectorAll('[data-direction]').forEach(button => {
      button.addEventListener('click', () => navigate(current + Number(button.dataset.direction)));
    });
    toggle.addEventListener('click', () => {
      paused = !paused;
      sync();
      reconcile();
    });
    hero.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') { hover = true; reconcile(); }
    });
    hero.addEventListener('pointerleave', () => { hover = false; reconcile(); });
    hero.addEventListener('focusin', event => {
      focus = event.target.matches(':focus-visible');
      reconcile();
    });
    hero.addEventListener('focusout', () => requestAnimationFrame(() => {
      focus = hero.contains(document.activeElement) && document.activeElement.matches(':focus-visible');
      reconcile();
    }));
    hero.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      navigate(current + (event.key === 'ArrowLeft' ? 1 : -1));
    });
    hero.addEventListener('pointerdown', event => {
      if (event.target.closest('a,button') || event.pointerType === 'mouse') return;
      startPoint = {x: event.clientX, y: event.clientY};
    });
    hero.addEventListener('pointerup', event => {
      if (!startPoint) return;
      const dx = event.clientX - startPoint.x, dy = event.clientY - startPoint.y;
      startPoint = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) navigate(current + (dx > 0 ? 1 : -1));
    });
    hero.addEventListener('pointercancel', () => { startPoint = null; });
    document.addEventListener('visibilitychange', reconcile);
    reduced.addEventListener('change', () => { sync(); reconcile(); });
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      reconcile();
    }, {threshold: .15}).observe(hero);
    sync();
  }

  // One short response to adding an item: no continuous attention-grabbing loop.
  const badge = document.querySelector('.cart-count');
  if (badge) {
    let previous = Number(badge.textContent) || 0;
    new MutationObserver(() => {
      const value = Number(badge.textContent) || 0;
      if (value > previous && !reduced.matches) {
        document.querySelector('.cart-toggle svg')?.animate([
          {transform: 'rotate(0deg)'}, {transform: 'rotate(-12deg) translateY(-3px)'},
          {transform: 'rotate(9deg)'}, {transform: 'rotate(0deg)'}
        ], {duration: 440, easing: 'ease-out'});
      }
      previous = value;
    }).observe(badge, {childList: true, characterData: true, subtree: true});
  }

  const drawer = document.querySelector('#cart-drawer');
  const cartButton = document.querySelector('.cart-toggle');
  if (drawer && cartButton) {
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.tabIndex = -1;
    drawer.inert = true;
    let returnTo;
    new MutationObserver(() => {
      const open = drawer.classList.contains('open');
      drawer.inert = !open;
      cartButton.setAttribute('aria-expanded', String(open));
      if (open) {
        returnTo = document.activeElement;
        drawer.querySelector('#cart-close').focus({preventScroll: true});
      } else if (returnTo?.isConnected) {
        returnTo.focus({preventScroll: true});
      }
    }).observe(drawer, {attributes: true, attributeFilter: ['class']});
    drawer.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const elements = [...drawer.querySelectorAll('button:not(:disabled),a[href],input:not([type=hidden])')]
        .filter(element => element.getClientRects().length);
      const first = elements[0], last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    });
  }
})();

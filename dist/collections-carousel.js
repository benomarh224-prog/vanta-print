(() => {
  const section = document.querySelector('#collections');
  if (!section) return;

  const viewport = section.querySelector('.collection-viewport');
  const track = section.querySelector('.collection-grid');
  const cards = [...track.querySelectorAll('.collection-card')];
  const dots = [...section.querySelectorAll('[data-collection-dot]')];
  const toggle = section.querySelector('.collection-motion-toggle');
  const icon = toggle.querySelector('.motion-icon');
  const label = toggle.querySelector('.motion-label');
  const progress = section.querySelector('.collection-progress');
  const mobileQuery = matchMedia('(min-width: 621px) and (max-width: 820px)');
  const stackQuery = matchMedia('(max-width: 620px)');
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const imageReady = new Map();
  let mobile = mobileQuery.matches;
  let visible = false;
  let hovered = false;
  let focused = false;
  let manualPaused = false;
  let interval = null;
  let staggerTimers = [];
  let generation = 0;
  let slide = 1;
  let sliding = false;
  let pointerStart = null;
  let suppressClick = false;

  function cloneCard(card) {
    const clone = card.cloneNode(true);
    clone.classList.remove('reveal');
    clone.classList.add('in-view');
    clone.dataset.clone = '';
    clone.removeAttribute('href');
    clone.removeAttribute('data-filter-link');
    clone.setAttribute('aria-hidden', 'true');
    clone.tabIndex = -1;
    clone.inert = true;
    return clone;
  }
  track.prepend(cloneCard(cards.at(-1)));
  track.append(cloneCard(cards[0]));
  track.querySelectorAll('img').forEach(img => { img.draggable = false; });

  function preload(img) {
    const source = img.currentSrc || img.src;
    if (!imageReady.has(source)) {
      const ready = new Image();
      ready.src = source;
      imageReady.set(source, ready.decode().then(() => true).catch(() => false));
    }
    return imageReady.get(source);
  }
  track.querySelectorAll('.collection-frame').forEach(preload);

  function updateDots() {
    const active = ((slide - 1 + cards.length) % cards.length);
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === active);
      if (i === active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  function stepWidth() {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return track.firstElementChild.getBoundingClientRect().width + gap;
  }

  function positionTrack(animate = true) {
    if (!mobile) {
      track.style.transform = '';
      return;
    }
    if (!animate || motionQuery.matches) track.classList.add('is-snapping');
    track.style.transform = `translate3d(${slide * stepWidth()}px, 0, 0)`;
    if (!animate || motionQuery.matches) {
      void track.offsetWidth;
      requestAnimationFrame(() => track.classList.remove('is-snapping'));
    }
  }

  function snapToRealCard() {
    if (slide !== 0 && slide !== cards.length + 1) return;
    slide = slide === 0 ? cards.length : 1;
    track.classList.add('is-snapping');
    positionTrack(false);
    requestAnimationFrame(() => requestAnimationFrame(() => track.classList.remove('is-snapping')));
    updateDots();
  }

  function move(direction) {
    if (!mobile || sliding) return;
    slide += direction;
    sliding = !motionQuery.matches;
    positionTrack();
    updateDots();
    if (!sliding) snapToRealCard();
  }

  function stopProgress() {
    progress.classList.remove('is-running');
    progress.querySelector('.collection-progress-fill').style.animation = 'none';
  }

  function startProgress() {
    progress.style.setProperty('--collection-cycle', mobile ? '5s' : '4s');
    const fill = progress.querySelector('.collection-progress-fill');
    progress.classList.remove('is-running');
    fill.style.animation = 'none';
    void fill.offsetWidth;
    fill.style.animation = '';
    progress.classList.add('is-running');
  }

  async function switchImage(card) {
    const frames = [...card.querySelectorAll('.collection-frame')];
    if (frames.length < 2) return;
    const nextIndex = (Number(card.dataset.frame || 0) + 1) % frames.length;
    const currentGeneration = generation;
    if (!await preload(frames[nextIndex]) || currentGeneration !== generation || mobile) return;
    frames.forEach((frame, index) => frame.classList.toggle('is-active', index === nextIndex));
    card.dataset.frame = String(nextIndex);
  }

  function resetImages() {
    track.querySelectorAll('.collection-card').forEach(card => {
      card.dataset.frame = '0';
      card.querySelectorAll('.collection-frame').forEach((frame, i) => frame.classList.toggle('is-active', i === 0));
    });
  }

  function stopAuto() {
    clearInterval(interval);
    interval = null;
    staggerTimers.forEach(clearTimeout);
    staggerTimers = [];
    generation++;
    stopProgress();
  }

  function canRun() {
    return !stackQuery.matches && visible && !document.hidden && !motionQuery.matches && !manualPaused && !hovered && !focused;
  }

  function startAuto() {
    if (interval || !canRun()) return;
    startProgress();
    interval = setInterval(() => {
      startProgress();
      if (mobile) {
        move(1);
      } else {
        staggerTimers = [];
        cards.forEach((card, i) => {
          staggerTimers.push(setTimeout(() => switchImage(card), i * 700));
        });
      }
    }, mobile ? 5000 : 4000);
  }

  function reconcile() {
    if (canRun()) startAuto();
    else stopAuto();
  }

  function updateToggle() {
    const paused = manualPaused || motionQuery.matches;
    const text = motionQuery.matches ? 'الحركة متوقفة حسب إعدادات الجهاز' : paused ? 'تشغيل الحركة' : 'إيقاف الحركة';
    toggle.disabled = motionQuery.matches;
    toggle.setAttribute('aria-label', text);
    toggle.setAttribute('aria-pressed', String(paused));
    label.textContent = motionQuery.matches ? 'الحركة متوقفة' : text;
    icon.textContent = paused ? '▶' : 'Ⅱ';
  }

  function pauseForInteraction() {
    manualPaused = true;
    updateToggle();
    reconcile();
  }

  toggle.addEventListener('click', () => {
    manualPaused = !manualPaused;
    updateToggle();
    reconcile();
  });

  section.querySelectorAll('[data-collection-arrow]').forEach(button => button.addEventListener('click', () => {
    pauseForInteraction();
    if (mobile) move(button.dataset.collectionArrow === 'next' ? 1 : -1);
    else cards.forEach(switchImage);
  }));

  dots.forEach((dot, index) => dot.addEventListener('click', () => {
    pauseForInteraction();
    if (mobile) {
      if (sliding) return;
      slide = index + 1;
      sliding = !motionQuery.matches;
      positionTrack();
      updateDots();
    } else {
      switchImage(cards[index]);
      dots.forEach((item, i) => item.classList.toggle('is-active', i === index));
    }
  }));

  cards.forEach(card => card.addEventListener('click', pauseForInteraction));
  viewport.addEventListener('dragstart', event => event.preventDefault());
  viewport.addEventListener('pointerdown', event => {
    if (!mobile) return;
    pointerStart = { x: event.clientX, y: event.clientY };
    if (event.pointerType !== 'mouse') viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener('pointerup', event => {
    if (!pointerStart || !mobile) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(dx) < 35 || Math.abs(dx) <= Math.abs(dy) * 1.25) return;
    suppressClick = true;
    setTimeout(() => { suppressClick = false; }, 650);
    pauseForInteraction();
    move(dx > 0 ? 1 : -1);
  });
  viewport.addEventListener('pointercancel', () => { pointerStart = null; });
  viewport.addEventListener('click', event => {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);

  section.addEventListener('mouseenter', () => { hovered = true; reconcile(); });
  section.addEventListener('mouseleave', () => { hovered = false; reconcile(); });
  section.addEventListener('focusin', event => {
    if (event.target.matches(':focus-visible')) { focused = true; reconcile(); }
  });
  section.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      focused = section.contains(document.activeElement) && document.activeElement.matches(':focus-visible');
      reconcile();
    });
  });

  track.addEventListener('transitionend', event => {
    if (event.target !== track || event.propertyName !== 'transform') return;
    sliding = false;
    snapToRealCard();
  });
  document.addEventListener('visibilitychange', reconcile);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    reconcile();
  }, { threshold: 0.18 }).observe(section);

  function syncMode() {
    stopAuto();
    mobile = mobileQuery.matches;
    slide = 1;
    sliding = false;
    resetImages();
    positionTrack(false);
    updateDots();
    reconcile();
  }
  mobileQuery.addEventListener('change', syncMode);
  stackQuery.addEventListener('change', syncMode);
  motionQuery.addEventListener('change', () => {
    updateToggle();
    reconcile();
  });
  new ResizeObserver(() => {
    if (mobile) {
      sliding = false;
      positionTrack(false);
    }
  }).observe(viewport);

  updateToggle();
  updateDots();
  positionTrack(false);
})();

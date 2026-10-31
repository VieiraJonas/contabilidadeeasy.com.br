// TerraSprint motion vocabulary, using native observers and Web Animations.
// Content stays visible if JavaScript is unavailable; initialize only once.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function initEffects() {
  if (!document.body.classList.contains('site-page') || reducedMotion.matches || !('IntersectionObserver' in window)) return () => {};
  const animations = [];
  const cleanups = [];
  const headings = [];
  const activeHeadings = new Set();
  let frame = 0;

  function splitWords(element) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    const words = [];
    nodes.forEach((node) => {
      const fragment = document.createDocumentFragment();
      (node.textContent || '').split(/(\s+)/).forEach((word) => {
        if (!word.trim()) { fragment.append(document.createTextNode(word)); return; }
        const span = document.createElement('span');
        span.className = 'motion-word';
        span.textContent = word;
        words.push(span);
        fragment.append(span);
      });
      node.replaceWith(fragment);
    });
    cleanups.push(() => words.forEach((word) => word.replaceWith(document.createTextNode(word.textContent || ''))));
    return words;
  }

  // Preserve <br>, emphasis, the original heading semantics and natural spaces.
  const hero = document.querySelector('.hero-copy h1');
  if (hero) {
    splitWords(hero).forEach((word, index) => {
      animations.push(word.animate([
        { opacity: 0, filter: 'blur(8px)', transform: 'translateY(20px)' },
        { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
      ], { duration: 800, delay: 80 + index * 65, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'backwards' }));
    });
  }

  function paintHeadings() {
    frame = 0;
    activeHeadings.forEach((entry) => {
      const rect = entry.element.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (innerHeight * .9 - rect.top) / Math.max(100, innerHeight * .32 + rect.height * .25)));
      entry.words.forEach((word, index) => {
        const stagger = entry.words.length > 1 ? index / (entry.words.length - 1) * .45 : 0;
        const amount = Math.min(1, Math.max(0, (progress - stagger) / .55));
        word.style.opacity = String(.18 + amount * .82);
        word.style.filter = `blur(${(1 - amount) * 6}px)`;
        word.style.transform = `translateY(${(1 - amount) * 12}px)`;
      });
    });
  }
  function scheduleHeadings() { if (!frame) frame = requestAnimationFrame(paintHeadings); }
  const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      const heading = headings.find((entry) => entry.element === target);
      if (!heading) return;
      if (isIntersecting) activeHeadings.add(heading);
      else {
        activeHeadings.delete(heading);
        // Keep titles readable after a fast scroll or an anchor jump.
        if (target.getBoundingClientRect().top < 0) heading.words.forEach((word) => word.removeAttribute('style'));
      }
    });
    scheduleHeadings();
  });
  document.querySelectorAll('main h2, .about-word').forEach((element) => {
    headings.push({ element, words: splitWords(element) });
    headingObserver.observe(element);
  });
  window.addEventListener('scroll', scheduleHeadings, { passive: true });
  window.addEventListener('resize', scheduleHeadings);

  const cards = '.service-card, .segment-grid article, .benefits-grid article, .team-card';
  document.querySelectorAll(cards).forEach((card) => card.classList.add('motion-card'));
  const riseObserver = new IntersectionObserver((entries) => {
    entries.filter((entry) => entry.isIntersecting).forEach(({ target }, index) => {
      target.style.transitionDelay = `${Math.min(index, 4) * 90}ms`;
      target.classList.remove('is-pending');
      target.addEventListener('transitionend', () => { target.style.transitionDelay = ''; }, { once: true });
      riseObserver.unobserve(target);
    });
  }, { threshold: .12 });
  const risers = document.querySelectorAll(`${cards}, .hero-copy > .eyebrow, .hero-copy > .lead, .hero-copy > .actions, .hero-note, .brand-stage, .certificate-banner, .process, .contact-form`);
  risers.forEach((element) => {
    element.classList.add('motion-rise', 'is-pending');
    riseObserver.observe(element);
  });

  // A gentle, finite drift echoes the reference's floating tiles.
  const stageLabel = document.querySelector('.stage-label');
  if (stageLabel) animations.push(stageLabel.animate([
    { transform: 'translateY(0) rotate(0deg)' },
    { transform: 'translateY(-9px) rotate(-1deg)' },
    { transform: 'translateY(0) rotate(0deg)' },
  ], { duration: 5200, iterations: 1, easing: 'ease-in-out' }));

  return () => {
    headingObserver.disconnect();
    riseObserver.disconnect();
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', scheduleHeadings);
    window.removeEventListener('resize', scheduleHeadings);
    animations.forEach((animation) => animation.cancel());
    risers.forEach((element) => {
      element.classList.remove('motion-rise', 'is-pending');
      element.style.transitionDelay = '';
    });
    cleanups.forEach((cleanup) => cleanup());
  };
}

let stopEffects = initEffects();
reducedMotion.addEventListener('change', () => {
  stopEffects();
  stopEffects = initEffects();
});

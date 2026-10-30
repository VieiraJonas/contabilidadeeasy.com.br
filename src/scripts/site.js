const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
const mobileMenu = matchMedia('(max-width: 850px)');
const background = [...document.querySelectorAll('main, .site-footer, .floating-contact, .utility, .skip')];
const originalInert = new Map(background.map((element) => [element, element.inert]));
let menuOpen = false;
let scrollPosition = 0;
let bodyStyles;

function setMenu(open, restoreFocus = false) {
  if (!menuButton || !navigation) return;
  const next = open && mobileMenu.matches;
  if (next !== menuOpen) {
    if (next) {
      scrollPosition = window.scrollY;
      const width = document.documentElement.clientWidth;
      bodyStyles = { position: document.body.style.position, top: document.body.style.top, width: document.body.style.width };
      Object.assign(document.body.style, { position: 'fixed', top: `-${scrollPosition}px`, width: `${width}px` });
    } else if (bodyStyles) {
      Object.assign(document.body.style, bodyStyles);
      window.scrollTo({ top: scrollPosition, behavior: 'instant' });
      bodyStyles = undefined;
    }
  }
  menuOpen = next;
  navigation.classList.toggle('is-open', next);
  navigation.inert = mobileMenu.matches && !next;
  menuButton.setAttribute('aria-expanded', String(next));
  menuButton.setAttribute('aria-label', next ? 'Fechar menu' : 'Abrir menu');
  document.documentElement.classList.toggle('menu-open', next);
  background.forEach((element) => { element.inert = next || originalInert.get(element); });
  if (next) navigation.querySelector('a[href]')?.focus({ preventScroll: true });
  else if (restoreFocus) menuButton.focus({ preventScroll: true });
}

menuButton?.addEventListener('click', () => setMenu(!menuOpen));
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  setMenu(false);
  if (link.hash) {
    const target = document.getElementById(link.hash.slice(1));
    requestAnimationFrame(() => {
      if (!target) return;
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    });
  }
}));
document.addEventListener('keydown', (event) => {
  if (!menuOpen || !menuButton || !navigation) return;
  if (event.key === 'Escape') { event.preventDefault(); setMenu(false, true); }
  if (event.key !== 'Tab') return;
  const targets = [menuButton, ...navigation.querySelectorAll('a[href], button:not([disabled])')];
  const first = targets[0];
  const last = targets.at(-1);
  if (event.shiftKey && (document.activeElement === first || !targets.includes(document.activeElement))) {
    event.preventDefault(); last?.focus();
  } else if (!event.shiftKey && (document.activeElement === last || !targets.includes(document.activeElement))) {
    event.preventDefault(); first.focus();
  }
});
document.addEventListener('click', (event) => {
  if (menuOpen && event.target instanceof Element && !event.target.closest('.site-header')) setMenu(false, true);
});
mobileMenu.addEventListener('change', () => setMenu(false));
setMenu(false);

const serviceSelect = document.querySelector('#contact-service');
document.querySelectorAll('[data-service]').forEach((link) => {
  const service = link.dataset.service;
  if (!service || !(link instanceof HTMLAnchorElement)) return;
  link.href = `https://wa.me/5527996169171?text=${encodeURIComponent(`Olá, EASY! Quero conversar sobre ${service.toLowerCase()}.`)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.addEventListener('click', () => {
    if (serviceSelect instanceof HTMLSelectElement && [...serviceSelect.options].some((option) => option.value === service)) serviceSelect.value = service;
  });
});

const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#contact-name');
const nameError = document.querySelector('#contact-name-error');
const status = document.querySelector('#contact-status');
const fallback = document.querySelector('#whatsapp-fallback');

if (form instanceof HTMLFormElement && nameInput instanceof HTMLInputElement && serviceSelect instanceof HTMLSelectElement && nameError && status && fallback instanceof HTMLAnchorElement) {
  const validName = () => {
    const valid = Boolean(nameInput.value.trim());
    nameInput.setAttribute('aria-invalid', String(!valid));
    nameError.textContent = valid ? '' : 'Informe seu nome para preparar a mensagem.';
    return valid;
  };
  nameInput.addEventListener('input', () => { if (nameInput.hasAttribute('aria-invalid')) validName(); });
  form.addEventListener('input', () => { fallback.hidden = true; status.textContent = ''; });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validName()) { nameInput.focus(); return; }
    const name = nameInput.value.trim();
    const company = form.elements.namedItem('company').value.trim();
    const message = form.elements.namedItem('message').value.trim();
    const text = [`Olá, EASY! Meu nome é ${name}.`, company ? `Empresa: ${company}` : '', `Tenho interesse em: ${serviceSelect.value}.`, message].filter(Boolean).join('\n\n');
    const url = `https://wa.me/5527996169171?text=${encodeURIComponent(text)}`;
    fallback.href = url;
    fallback.hidden = false;
    window.open(url, '_blank', 'noopener,noreferrer');
    status.textContent = 'Mensagem preparada. Confira o texto e envie no WhatsApp. Se a nova janela não abriu, use o link abaixo.';
  });
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

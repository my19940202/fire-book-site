import { loadJson, updateMeta } from '../utils.js';
import {
  renderHeader,
  renderHero,
  renderFeature,
  renderMembership,
  renderFooter,
  renderAppModal,
} from './render.js';

function scrollToHash(hash, smooth = true) {
  const behavior = smooth ? 'smooth' : 'auto';
  const h = hash || '#hero';

  if (h === '#hero') {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const el = document.getElementById(h.slice(1));
  if (!el) return;

  const headerH = document.querySelector('.site-header')?.offsetHeight ?? 0;
  const top = el.getBoundingClientRect().top + window.scrollY - headerH;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

function updateNavTabs() {
  const current = location.hash || '#hero';
  document.querySelectorAll('.nav-tab').forEach((link) => {
    link.classList.toggle('nav-tab--active', link.getAttribute('href') === current);
  });
}

function initAnchorNav() {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const app = document.getElementById('app');
  if (!app) return;

  app.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link || !app.contains(link)) return;

    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    e.preventDefault();
    scrollToHash(href, true);
    if (location.hash !== href) {
      history.pushState(null, '', `${location.pathname}${location.search}${href}`);
    }
    updateNavTabs();
  });

  window.addEventListener('popstate', () => {
    scrollToHash(location.hash, false);
    updateNavTabs();
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      if (location.hash) scrollToHash(location.hash, false);
      updateNavTabs();
    });
  });
}

const HERO_AUTO_INTERVAL = 4000;

function initHeroCarousel(images) {
  const track = document.getElementById('hero-phone-track');
  const dots = document.querySelectorAll('.hero-dot[data-index]');
  if (!track || !dots.length || images.length <= 1) return;

  images.forEach((src) => {
    const preload = new Image();
    preload.src = src;
  });

  let currentIndex = 0;
  let autoTimer = null;

  function setActiveDot(index) {
    dots.forEach((dot) => {
      dot.classList.toggle('hero-dot--active', Number(dot.dataset.index) === index);
    });
  }

  function goTo(index) {
    if (!images[index] || index === currentIndex) return;
    currentIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    setActiveDot(index);
  }

  function next() {
    goTo((currentIndex + 1) % images.length);
  }

  function resetAutoTimer() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(next, HERO_AUTO_INTERVAL);
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.index);
      if (Number.isNaN(index)) return;
      goTo(index);
      resetAutoTimer();
    });
  });

  resetAutoTimer();
}

function initAppModal() {
  const modal = document.getElementById('app-modal');
  const openBtn = document.getElementById('header-cta-btn');
  if (!modal || !openBtn) return;

  const closeEls = modal.querySelectorAll('[data-modal-close]');
  const panel = modal.querySelector('.app-modal__panel');

  function openModal() {
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    panel?.focus();
  }

  function closeModal() {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    openBtn.focus();
  }

  openBtn.addEventListener('click', openModal);

  closeEls.forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
}

export async function init(app) {
  const data = await loadJson('./content.web.json');
  updateMeta(data.meta);
  app.innerHTML = [
    renderHeader(data.header),
    '<main>',
    renderHero(data.hero),
    renderFeature(data.feature),
    renderMembership(data.membership),
    '</main>',
    renderFooter(data.footer),
    renderAppModal(data.header.modal),
  ].join('');

  initAnchorNav();
  initHeroCarousel(data.hero.phoneImages ?? []);
  initAppModal();
}

import { loadJson, updateMeta } from '../utils.js';
import {
  renderHeader,
  renderHero,
  renderFeatures,
  renderMembership,
  renderFooter,
} from './render.js';
import { renderAppModal } from '../web/render.js';

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
  const data = await loadJson('./content.h5.json');
  updateMeta(data.meta);
  document.body.classList.add('h5-body');

  app.innerHTML = [
    renderHeader(data.header),
    '<main class="h5-main">',
    renderHero(data.hero),
    renderFeatures(data.features),
    renderMembership(data.membership),
    renderFooter(data.footer),
    '</main>',
    renderAppModal(data.header.modal),
  ].join('');

  initAppModal();
}

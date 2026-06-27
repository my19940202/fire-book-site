import { escapeHtml, img } from '../utils.js';

export function renderHeader(data) {
  return `
    <header class="h5-header">
      <a href="#hero" class="h5-header__logo">
        ${img(data.logo, data.logoAlt, 'h5-header__logo-img')}
      </a>
      <button type="button" id="header-cta-btn" class="h5-header__cta">${escapeHtml(data.suffixBtn.text)}</button>
    </header>`;
}

export function renderHero(data) {
  return `
    <section id="hero" class="h5-hero">
      <div class="h5-hero__content">
        <div class="h5-hero__left">
          <div class="h5-hero__brand">
            ${img(data.icon, data.title, 'h5-hero__icon')}
            <div class="h5-hero__text">
              ${img(data.titleImage, data.title, 'h5-hero__title-img')}
              <p class="h5-hero__subtitle">${escapeHtml(data.subtitle)}</p>
            </div>
          </div>
          <div class="h5-hero__downloads">
            <a href="${escapeHtml(data.androidBtn.href)}" class="download-btn">
              ${img(data.androidBtn.icon, 'Android', 'download-btn-icon')}
              <span>${escapeHtml(data.androidBtn.text)}</span>
            </a>
            <a href="${escapeHtml(data.iosBtn.href)}" class="download-btn">
              ${img(data.iosBtn.icon, 'iOS', 'download-btn-icon')}
              <span>${escapeHtml(data.iosBtn.text)}</span>
            </a>
          </div>
        </div>
        <div class="h5-hero__phone-wrap">
          ${img(data.phoneImage, 'FIRE记账 App 界面', 'h5-hero__phone h5-hero__phone--large')}
          ${img(data.phoneImage2, 'FIRE记账 App 界面', 'h5-hero__phone h5-hero__phone--small')}
        </div>
      </div>
    </section>`;
}

export function renderFeatures(data) {
  const items = data.items
    .map(
      (item) => `
        <div class="h5-feature-item">
          ${img(item.icon, item.title, 'h5-feature-item__icon')}
          <span class="h5-feature-item__title">${escapeHtml(item.title)}</span>
        </div>`
    )
    .join('');

  return `
    <section id="${escapeHtml(data.id)}" class="h5-features">
      <div class="h5-feature-grid">${items}</div>
    </section>`;
}

function renderPlanCard(plan) {
  const badge = plan.badge ? `<div class="plan-badge">${escapeHtml(plan.badge)}</div>` : '';
  const subPrice = plan.subPrice ? `<div class="plan-sub-price">${plan.subPrice}</div>` : '';
  const features = plan.features.map((f) => `<li class="plan-feature-item">${escapeHtml(f)}</li>`).join('');
  const popularClass = plan.badge ? 'plan-card plan-card--popular' : 'plan-card';

  return `
    <div class="${popularClass}">
      ${badge}
      <h3 class="plan-name">${escapeHtml(plan.name)}</h3>
      <div class="plan-price">
        <div class="plan-sub-price">${plan.price}</div>
        ${subPrice}
      </div>
      <ul class="plan-features">${features}</ul>
    </div>`;
}

function renderComparisonRow(row, checkIcon, checkIconMember) {
  function cell(value, isMember) {
    if (value === 'check') {
      const icon = isMember ? checkIconMember : checkIcon;
      const cls = isMember ? 'h5-comparison__check h5-comparison__check--member' : 'h5-comparison__check';
      return `<span class="${cls}">${img(icon, '已支持', 'h5-comparison__check-icon')}</span>`;
    }
    if (value === '—') return '<span class="h5-comparison__dash">—</span>';
    return `<span class="${isMember ? 'h5-comparison__member' : 'h5-comparison__user'}">${escapeHtml(value)}</span>`;
  }

  return `
    <div class="h5-comparison__row">
      <span class="h5-comparison__feature">${escapeHtml(row.feature)}</span>
      <span class="h5-comparison__cell">${cell(row.member, true)}</span>
      <span class="h5-comparison__cell">${cell(row.user, false)}</span>
    </div>`;
}

export function renderMembership(data) {
  const plans = data.plans.map(renderPlanCard).join('');
  const rows = data.comparison.rows
    .map((row) => renderComparisonRow(row, data.comparison.checkIcon, data.comparison.checkIconMember))
    .join('');

  return `
    <section id="${escapeHtml(data.id)}" class="h5-membership">
      <div class="h5-section-head">
        <h2 class="h5-section-title">${data.title}</h2>
        <p class="h5-section-subtitle">${escapeHtml(data.subtitle)}</p>
      </div>
      <div class="plan-grid">${plans}</div>
      <div class="h5-comparison">
        <h3 class="h5-comparison__title">${escapeHtml(data.comparison.title)}</h3>
        <div class="h5-comparison__head">
          <span>功能权益</span>
          <span class="h5-comparison__head-member">FIRE会员</span>
          <span>普通用户</span>
        </div>
        ${rows}
      </div>
    </section>`;
}

function renderFooterLink(item) {
  if (item.href) {
    return `<a href="${escapeHtml(item.href)}" class="h5-footer__link">${escapeHtml(item.text)}</a>`;
  }
  return escapeHtml(item.text);
}

function renderContactText(item) {
  if (item.text) return escapeHtml(item.text);
  return `${escapeHtml(item.label)} ${escapeHtml(item.value)}`;
}

export function renderFooter(data) {
  const qrCodes = data.qrCodes
    .map(
      (qr) => `
      <div class="h5-footer__qr">
        <div class="h5-footer__qr-box">
          ${img(qr.image, qr.label, 'h5-footer__qr-img')}
        </div>
        <span class="h5-footer__qr-label">${escapeHtml(qr.label)}</span>
      </div>`
    )
    .join('');

  const contacts = data.contacts
    .map(
      (item) => `
      <p class="h5-footer__contact-row">
        ${img(item.icon, '', 'h5-footer__contact-icon')}
        <span>${renderContactText(item)}</span>
      </p>`
    )
    .join('');

  const privacy = renderFooterLink(data.legal.privacy);
  const records = data.legal.records.map(renderFooterLink).join('<span class="h5-footer__sep">|</span>');

  return `
    <footer class="h5-footer">
      <div class="h5-footer__qr-group">${qrCodes}</div>
      <div class="h5-footer__contact">${contacts}</div>
      <div class="h5-footer__legal">
        <p class="h5-footer__legal-line">
          <span>${escapeHtml(data.legal.company)}</span>
          <span class="h5-footer__sep">|</span>
          ${privacy}
        </p>
        <p class="h5-footer__legal-line">${records}</p>
      </div>
    </footer>`;
}

import { escapeHtml, img } from '../utils.js';

function renderCell(value, checkIcon, isMember) {
  if (value === 'check') {
    const iconClass = isMember ? 'comparison-check comparison-check--member' : 'comparison-check comparison-check--user';
    return `<span class="${iconClass}">${img(checkIcon, '已支持', 'comparison-check-icon')}</span>`;
  }
  if (value === '—') {
    return '<span class="text-gray-400">—</span>';
  }
  const cellClass = isMember ? 'text-brand' : 'text-gray-600';
  return `<span class="${cellClass}">${escapeHtml(value)}</span>`;
}

export function renderHeader(data) {
  const navHash = location.hash || '#hero';
  const tabs = data.tabs
    .map((tab) => {
      const activeClass = tab.href === navHash ? ' nav-tab--active' : '';
      return `<a href="${escapeHtml(tab.href)}" class="nav-tab${activeClass}">${escapeHtml(tab.text)}</a>`;
    })
    .join('');

  return `
    <header id="header" class="site-header sticky top-0 z-50 bg-white backdrop-blur border-b border-gray-100">
      <div class="header-inner w-[1080.3px] max-w-full h-fit flex place-content-between place-items-center gap-5 mx-auto px-6 py-4">
        <a href="#hero" class="flex items-center gap-3 no-underline">
          ${img(data.icon, data.logoText, 'header-logo w-[233px] h-[22px]')}
        </a>
        <nav class="hidden md:flex items-center gap-8">${tabs}</nav>
        <button type="button" id="header-cta-btn" class="header-cta shrink-0 rounded-[8px] p-[8px] bg-[linear-gradient(270deg,_rgba(109,_197,_255,_1)_0%,_rgba(53,_107,_255,_1)_90.87%)]">${escapeHtml(data.suffixBtn.text)}</button>
      </div>
    </header>`;
}

export function renderHero(data) {
  return `
    <section id="hero" class="hero-section left-0 w-full max-w-[1920px] mx-auto h-[640.2px] relative overflow-hidden">
      <div class="hero-inner max-w-[1080px] mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div class="hero-content flex-1 pt-8 md:pt-0">
          <div class="hero-title-row flex items-center gap-4 md:gap-6 mb-8">
            ${img(data.icon, data.title, 'hero-app-icon shrink-0 w-[81px] h-[81px]')}
            <div>
              <div class="mb-2">${img('./assets/Product_Title.png', data.title, 'hero-title-img w-[215px]')}</div>
              <p class="text-lg max-w-md">${escapeHtml(data.subtitle)}</p>
            </div>
          </div>

          <div class="flex flex-col gap-4 w-[260px]">
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
        <div class="hero-phone flex-1 flex justify-center items-end pb-8 relative">
          ${img(data.phoneImage, 'FIRE记账 App 界面', 'hero-phone-img', 'hero-phone-img')}
          <div class="hero-dots absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            <button type="button" class="hero-dot w-[36px] h-[4px] rounded-full hero-dot--active" data-phone-image="${escapeHtml(data.phoneImage)}" aria-label="展示界面一"></button>
            <button type="button" class="hero-dot w-[36px] h-[4px] rounded-full" data-phone-image="${escapeHtml(data.phoneImage2)}" aria-label="展示界面二"></button>
          </div>
        </div>
      </div>
    </section>`;
}

export function renderFeature(data) {
  const items = data.items
    .map((item) => {
      const highlightClass = item.highlight ? 'feature-card feature-card--highlight' : 'feature-card';
      return `
        <div class="${highlightClass}">
          ${img(item.icon, item.title, 'feature-icon')}
          <div>
            <h3 class="feature-title">
              ${escapeHtml(item.title)}
              ${item.tag ? `<span class="feature-tag">${escapeHtml(item.tag)}</span>` : ''}
            </h3>
            <p class="feature-desc">${escapeHtml(item.desc)}</p>
          </div>
        </div>`;
    })
    .join('');

  return `
    <section id="${escapeHtml(data.id)}" class="feature-section py-20 px-6">
      <div class="max-w-[1080px] mx-auto">
        <div class="text-center mb-14">
          <h2 class="section-title">${escapeHtml(data.title)} </h2>
          <p class="section-subtitle mt-4 max-w-2xl mx-auto">${escapeHtml(data.subtitle)}</p>
        </div>
        <div class="feature-grid">${items}</div>
      </div>
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

export function renderMembership(data) {
  const plans = data.plans.map(renderPlanCard).join('');
  const checkIcon = data.comparison.checkIcon;
  const checkIconMember = data.comparison.checkIconMember;
  const rows = data.comparison.rows
    .map(
      (row, i) => `
      <tr class="${i % 2 === 0 ? 'comparison-row-even' : 'comparison-row-odd'}">
        <td class="comparison-feature">${escapeHtml(row.feature)}</td>
        <td class="comparison-member">${renderCell(row.member, checkIconMember, true)}</td>
        <td class="comparison-user">${renderCell(row.user, checkIcon, false)}</td>
      </tr>`
    )
    .join('');

  const headers = data.comparison.headers
    .map((h, i) => {
      const cls = i === 1 ? 'comparison-th comparison-th--member' : 'comparison-th';
      return `<th class="${cls}">${escapeHtml(h)}</th>`;
    })
    .join('');

  return `
    <section id="${escapeHtml(data.id)}" class="membership-section py-20 px-6 bg-brand-light/30">
      <div class="max-w-[1080px] mx-auto">
        <div class="text-center mb-14">
          <h2 class="section-title">${escapeHtml(data.title)}</h2>
          <p class="section-subtitle mt-4 max-w-2xl mx-auto">${escapeHtml(data.subtitle)}</p>
        </div>
        <div class="plan-grid">${plans}</div>
        <div class="comparison-wrap mt-16">
          <h3 class="comparison-title">${escapeHtml(data.comparison.title)}</h3>
          <div class="comparison-table-wrap">
            <table class="comparison-table">
              <thead>
                <tr>${headers}</tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>`;
}

export function renderAppModal(modal) {
  if (!modal) return '';

  const qrCodes = (modal.qrCodes || [])
    .map(
      (qr) => `
      <div class="app-modal__qr-item">
        <div class="app-modal__qr-card">
          ${img(qr.image, qr.label, 'app-modal__qr-img')}
        </div>
        <span class="app-modal__qr-label">${escapeHtml(qr.label)}</span>
      </div>`
    )
    .join('');

  const bgStyle = modal.background ? ` style="background-image: url('${escapeHtml(modal.background)}')"` : '';

  return `
    <div id="app-modal" class="app-modal" hidden aria-hidden="true">
      <div class="app-modal__backdrop" data-modal-close></div>
      <div class="app-modal__panel"${bgStyle} role="dialog" aria-modal="true" aria-labelledby="app-modal-title" tabindex="-1">
        <button type="button" class="app-modal__close" data-modal-close aria-label="关闭">
          ${img('./assets/close-btn.png', '关闭', 'app-modal__close-icon')}
        </button>
        <div class="app-modal__body">
          <h3 id="app-modal-title" class="app-modal__title">${escapeHtml(modal.title)} <br/> ${escapeHtml(modal.subtitle)}</h3>
          <div class="app-modal__qr-wrap">${qrCodes}</div>
        </div>
      </div>
    </div>`;
}

export function renderFooter(data) {
  const qrCodes = data.qrCodes
    .map(
      (qr) => `
      <div class="footer-qr-item">
        ${img(qr.image, qr.label, 'footer-qr-img')}
        <span class="footer-qr-label">${escapeHtml(qr.label)}</span>
      </div>`
    )
    .join('');

  return `
    <footer class="site-footer left-0 w-full max-w-[1920px] mx-auto min-h-[229px]">
      <div class="footer-inner max-w-[1080px] mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        <div class="footer-contact text-center md:text-left">
          <p class="footer-contact-line">${escapeHtml(data.wechat)}</p>
          <p class="footer-contact-line">${escapeHtml(data.business)}</p>
        </div>
        <div class="footer-qr-group flex gap-8">${qrCodes}</div>
      </div>
      <p class="footer-copyright">${escapeHtml(data.copyright)}</p>
    </footer>`;
}

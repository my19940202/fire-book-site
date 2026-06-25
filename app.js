function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function img(src, alt, className) {
  const safeSrc = escapeHtml(src);
  const safeAlt = escapeHtml(alt);
  const safeClass = className ? ` class="${escapeHtml(className)}"` : '';
  const fallback = `https://placehold.co/100x100?text=${encodeURIComponent(alt || 'img')}`;
  return `<img src="${safeSrc}" alt="${safeAlt}"${safeClass} loading="lazy" onerror="this.onerror=null;this.src='${fallback}'" />`;
}

function renderCell(value, checkIcon, isMember) {
  if (value === 'check') {
    const iconClass = isMember ? 'comparison-check comparison-check--member' : 'comparison-check comparison-check--user';
    return `<span class="${iconClass}">${img(checkIcon, '已支持', 'comparison-check-icon')}</span>`;
  }
  if (value === '—') {
    return '<span class="text-gray-400">—</span>';
  }
  const cellClass = isMember ? 'text-brand font-medium' : 'text-gray-600';
  return `<span class="${cellClass}">${escapeHtml(value)}</span>`;
}

function renderHeader(data) {
  const tabs = data.tabs
    .map(
      (tab) =>
        `<a href="${escapeHtml(tab.href)}" class="nav-tab">${escapeHtml(tab.text)}</a>`
    )
    .join('');

  return `
    <header class="site-header sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div class="header-inner w-[1080.3px] max-w-full h-fit inline-flex place-content-between place-items-center gap-5 flex-shrink-0 mx-auto px-6 py-4">
        <a href="#hero" class="flex items-center gap-3 no-underline">
          ${img(data.icon, data.logoText, 'header-logo')}
          <div>
            <div class="text-lg font-bold text-navy leading-tight">${escapeHtml(data.logoText)}</div>
            <div class="text-xs text-gray-500">${escapeHtml(data.logoSubtext)}</div>
          </div>
        </a>
        <nav class="hidden md:flex items-center gap-8">${tabs}</nav>
        <a href="${escapeHtml(data.suffixBtn.href)}" class="header-cta shrink-0">${escapeHtml(data.suffixBtn.text)}</a>
      </div>
    </header>`;
}

function renderHero(data) {
  return `
    <section id="hero" class="hero-section left-0 w-full max-w-[1920px] mx-auto h-[640.2px] relative overflow-hidden">
      <div class="hero-inner max-w-[1080px] mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div class="hero-content flex-1 pt-8 md:pt-0">
          ${img(data.icon, data.title, 'hero-app-icon mb-6')}
          <h1 class="text-4xl md:text-5xl font-bold text-navy mb-4">${escapeHtml(data.title)}</h1>
          <p class="text-lg text-gray-600 mb-8 max-w-md">${escapeHtml(data.subtitle)}</p>
          <div class="flex flex-col sm:flex-row gap-4">
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
        <div class="hero-phone flex-1 flex justify-center items-end pb-8">
          ${img(data.phoneImage, 'FIRE记账 App 界面', 'hero-phone-img')}
        </div>
      </div>
      <div class="hero-dots absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        <span class="hero-dot hero-dot--active"></span>
        <span class="hero-dot"></span>
        <span class="hero-dot"></span>
      </div>
    </section>`;
}

function renderFeature(data) {
  const items = data.items
    .map((item) => {
      const highlightClass = item.highlight ? 'feature-card feature-card--highlight' : 'feature-card';
      return `
        <div class="${highlightClass}">
          ${img(item.icon, item.title, 'feature-icon')}
          <div>
            <h3 class="feature-title">${escapeHtml(item.title)}</h3>
            <p class="feature-desc">${escapeHtml(item.desc)}</p>
          </div>
        </div>`;
    })
    .join('');

  return `
    <section id="${escapeHtml(data.id)}" class="feature-section py-20 px-6">
      <div class="max-w-[1080px] mx-auto">
        <div class="text-center mb-14">
          <h2 class="section-title">${escapeHtml(data.title)}</h2>
          <p class="section-subtitle mt-4 max-w-2xl mx-auto">${escapeHtml(data.subtitle)}</p>
        </div>
        <div class="feature-grid">${items}</div>
      </div>
    </section>`;
}

function renderPlanCard(plan) {
  const badge = plan.badge
    ? `<div class="plan-badge">${escapeHtml(plan.badge)}</div>`
    : '';
  const subPrice = plan.subPrice
    ? `<div class="plan-sub-price">${escapeHtml(plan.subPrice)}</div>`
    : '';
  const features = plan.features
    .map((f) => `<li class="plan-feature-item">${escapeHtml(f)}</li>`)
    .join('');

  const popularClass = plan.badge ? 'plan-card plan-card--popular' : 'plan-card';

  return `
    <div class="${popularClass}">
      ${badge}
      <h3 class="plan-name">${escapeHtml(plan.name)}</h3>
      <div class="plan-price">${escapeHtml(plan.price)}</div>
      ${subPrice}
      <ul class="plan-features">${features}</ul>
    </div>`;
}

function renderMembership(data) {
  const plans = data.plans.map(renderPlanCard).join('');
  const checkIcon = data.comparison.checkIcon;

  const rows = data.comparison.rows
    .map(
      (row, i) => `
      <tr class="${i % 2 === 0 ? 'comparison-row-even' : 'comparison-row-odd'}">
        <td class="comparison-feature">${escapeHtml(row.feature)}</td>
        <td class="comparison-member">${renderCell(row.member, checkIcon, true)}</td>
        <td class="comparison-user">${renderCell(row.user, checkIcon, false)}</td>
      </tr>`
    )
    .join('');

  const headers = data.comparison.headers
    .map((h, i) => {
      const cls =
        i === 1 ? 'comparison-th comparison-th--member' : i === 2 ? 'comparison-th' : 'comparison-th';
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

function renderFooter(data) {
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

function updateMeta(meta) {
  if (meta.title) document.title = meta.title;
  if (meta.description) {
    let descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', meta.description);
  }
}

async function init() {
  const app = document.getElementById('app');
  try {
    const res = await fetch('./content.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    updateMeta(data.meta);
    app.innerHTML = [
      renderHeader(data.header),
      '<main>',
      renderHero(data.hero),
      renderFeature(data.feature),
      renderMembership(data.membership),
      '</main>',
      renderFooter(data.footer),
    ].join('');
  } catch (err) {
    app.innerHTML = `<p class="loading error">加载失败：${escapeHtml(err.message)}<br>请通过 HTTP 服务访问（如 npx serve .）</p>`;
  }
}

init();

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function img(src, alt, className, id) {
  const safeSrc = escapeHtml(src);
  const safeAlt = escapeHtml(alt);
  const safeClass = className ? ` class="${escapeHtml(className)}"` : '';
  const safeId = id ? ` id="${escapeHtml(id)}"` : '';
  const fallback = `https://placehold.co/100x100?text=${encodeURIComponent(alt || 'img')}`;
  return `<img src="${safeSrc}" alt="${safeAlt}"${safeClass}${safeId} loading="lazy" onerror="this.onerror=null;this.src='${fallback}'" />`;
}

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

function renderHeader(data) {
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

function renderHero(data) {
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

function renderFeature(data) {
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
  const badge = plan.badge
    ? `<div class="plan-badge">${escapeHtml(plan.badge)}</div>`
    : '';
  const subPrice = plan.subPrice
    ? `<div class="plan-sub-price">${plan.subPrice}</div>`
    : '';
  const features = plan.features
    .map((f) => `<li class="plan-feature-item">${escapeHtml(f)}</li>`)
    .join('');

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

function renderMembership(data) {
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

function renderAppModal(modal) {
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

  const bgStyle = modal.background
    ? ` style="background-image: url('${escapeHtml(modal.background)}')"`
    : '';

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

function initHeroCarousel() {
  const phoneImg = document.getElementById('hero-phone-img');
  const dots = document.querySelectorAll('.hero-dot[data-phone-image]');
  if (!phoneImg || !dots.length) return;

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const src = dot.dataset.phoneImage;
      if (!src) return;

      phoneImg.src = src;
      dots.forEach((d) => d.classList.toggle('hero-dot--active', d === dot));
    });
  });
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
      renderAppModal(data.header.modal),
    ].join('');

    initAnchorNav();
    initHeroCarousel();
    initAppModal();
  } catch (err) {
    app.innerHTML = `<p class="loading error">加载失败：${escapeHtml(err.message)}<br>请通过 HTTP 服务访问（如 npx serve .）</p>`;
  }
}

init();

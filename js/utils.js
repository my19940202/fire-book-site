export function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function img(src, alt, className, id) {
  const safeSrc = escapeHtml(src);
  const safeAlt = escapeHtml(alt);
  const safeClass = className ? ` class="${escapeHtml(className)}"` : '';
  const safeId = id ? ` id="${escapeHtml(id)}"` : '';
  const fallback = `https://placehold.co/100x100?text=${encodeURIComponent(alt || 'img')}`;
  return `<img src="${safeSrc}" alt="${safeAlt}"${safeClass}${safeId} loading="lazy" onerror="this.onerror=null;this.src='${fallback}'" />`;
}

export function updateMeta(meta) {
  if (!meta) return;
  if (meta.title) document.title = meta.title;
  if (meta.description) {
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', meta.description);
  }
}

export async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

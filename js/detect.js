export function getPlatform() {
  const narrow = window.matchMedia('(max-width: 768px)').matches;
  const mobileUa = /Android|iPhone|iPod|Mobile/i.test(navigator.userAgent);
  return narrow || mobileUa ? 'h5' : 'web';
}

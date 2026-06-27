import { getPlatform } from './js/detect.js';
import { init as initWeb } from './js/web/init.js';
import { init as initH5 } from './js/h5/init.js';
import { escapeHtml } from './js/utils.js';

const platform = getPlatform();
document.documentElement.classList.add(`platform-${platform}`);

const app = document.getElementById('app');
try {
  await (platform === 'h5' ? initH5 : initWeb)(app);
} catch (err) {
  app.innerHTML = `<p class="loading error">加载失败：${escapeHtml(err.message)}<br>请通过 HTTP 服务访问（如 npx serve .）</p>`;
}

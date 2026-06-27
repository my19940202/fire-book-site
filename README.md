# fire-book-site

FIRE记账 App 官网 — 便于 Web 端推广和营销。同一 URL 根据屏幕宽度 / UA 自动切换 **Web 桌面版** 与 **H5 移动版**。

设计图资源 https://moonvy.com/project/a44ca1b4-9ef2-4f5d-a744-30f5f232f8c1/6b6bd6cd-109c-4875-ad49-988071105004/10cb95e6-cf9f-4099-9191-9e5b42e247a3

账户 https://www.xiaohongshu.com/user/profile/67fa72e20000000004039159

## 技术方案

- **双内容源**：[`content.web.json`](content.web.json)（桌面 Web）、[`content.h5.json`](content.h5.json)（移动 H5）
- **双渲染器**：[`js/web/`](js/web/) 与 [`js/h5/`](js/h5/) 各自独立 `render.js` + `init.js`
- **平台检测**：[`js/detect.js`](js/detect.js) — 视口 ≤768px 或移动 UA 走 H5，否则走 Web
- **样式**：Tailwind CDN + [`styles.web.css`](styles.web.css) / [`styles.h5.css`](styles.h5.css)（`index.html` 内联脚本首屏加载，避免闪烁）
- **入口**：[`app.js`](app.js) 瘦入口，ES Module 无构建

## 本地预览

必须使用 HTTP 服务（`file://` 下 fetch 会被浏览器拦截）：

```bash
npx serve .
# 或
pnpm dev   # wrangler dev
```

- **Web 版**：浏览器正常窗口宽度访问
- **H5 版**：Chrome DevTools → Toggle device toolbar（或窗口宽度 ≤768px）

## 修改内容

| 端 | 编辑文件 | 说明 |
|----|----------|------|
| Web | `content.web.json` | 桌面版文案、图片路径 |
| H5 | `content.h5.json` | 移动版文案、图片路径（字段结构可独立） |

改 JSON 后刷新页面即可，无需构建。

### Web JSON 字段（`content.web.json`）

| 区块 | 字段 | 说明 |
|------|------|------|
| `meta` | `title`, `description` | 页面标题与 SEO 描述 |
| `header` | `icon`, `logoText`, `tabs[]`, `suffixBtn`, `modal` | 顶部导航与下载弹窗 |
| `hero` | `icon`, `title`, `subtitle`, `androidBtn`, `iosBtn`, `phoneImage` | 首屏 Banner |
| `feature` | `title`, `subtitle`, `items[]` | 产品功能（8 项） |
| `membership` | `title`, `subtitle`, `plans[]`, `comparison` | 会员定价 + 特权对比表 |
| `footer` | `wechat`, `business`, `qrCodes[]`, `copyright` | 页脚 |

### H5 JSON 字段（`content.h5.json`）

| 区块 | 字段 | 说明 |
|------|------|------|
| `meta` | `title`, `description` | 同 Web |
| `header` | `logo`, `logoAlt` | 精简顶栏（如 `nav-h5.png`） |
| `hero` | `icon`, `titleImage`, `subtitle`, `phoneImage`, `phoneImage2` | 竖屏 Hero |
| `downloadBar` | `text`, `androidBtn`, `iosBtn` | 底部固定下载条 |
| `features` | `title`, `subtitle`, `items[]` | 单列功能卡片 |
| `membership` | `plans[]`, `comparison` | 横向滑动定价卡 + 精简对比 |
| `footer` | 同 Web | 页脚联系信息 |

## 文件结构

```
fire-book-site/
├── index.html           # 内联平台检测 + module 入口
├── app.js               # 瘦入口：detect → web/h5 init
├── content.web.json     # Web 内容
├── content.h5.json      # H5 内容
├── styles.web.css       # Web 样式
├── styles.h5.css        # H5 样式
├── js/
│   ├── detect.js        # getPlatform()
│   ├── utils.js         # escapeHtml, img, loadJson, updateMeta
│   ├── web/
│   │   ├── render.js
│   │   └── init.js
│   └── h5/
│       ├── render.js
│       └── init.js
├── assets/              # 图片资源（Web/H5 共用，可按需分子目录）
└── wrangler.jsonc       # Cloudflare 部署
```

## 部署（Cloudflare Workers Static Assets）

纯静态站点，**无需构建步骤**。

```bash
pnpm install
pnpm wrangler login   # 首次
pnpm dev              # 本地预览
pnpm deploy           # 部署
```

### 注意事项

- Tailwind CDN 需外网访问
- 改 `content.web.json` / `content.h5.json` 或 `js/` 后重新 `pnpm deploy`
- 图片加载失败时自动回退到 `placehold.co` 占位图

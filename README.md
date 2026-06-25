# fire-book-site

FIRE记账 App 官网 — 便于 Web 端推广和营销。

## 技术方案

- **内容源**：[`content.json`](content.json) — 所有文案、图片路径集中管理
- **渲染**：[`app.js`](app.js) 通过 `fetch` 加载 JSON，用 `innerHTML` 渲染各区块
- **样式**：Tailwind CSS CDN + [`styles.css`](styles.css) 自定义样式

## 本地预览

必须使用 HTTP 服务（`file://` 下 fetch 会被浏览器拦截）：

```bash
npx serve .
# 或
python3 -m http.server 8080
```

浏览器访问 `http://localhost:3000`（serve 默认端口）或 `http://localhost:8080`。

## 修改内容

编辑 [`content.json`](content.json) 后刷新页面即可，无需构建。

### JSON 字段说明

| 区块 | 字段 | 说明 |
|------|------|------|
| `meta` | `title`, `description` | 页面标题与 SEO 描述 |
| `header` | `icon`, `logoText`, `logoSubtext`, `tabs[]`, `suffixBtn` | 顶部导航 |
| `hero` | `icon`, `title`, `subtitle`, `androidBtn`, `iosBtn`, `phoneImage` | 首屏 Banner |
| `feature` | `title`, `subtitle`, `items[]` | 产品功能（8 项），`highlight: true` 高亮卡片 |
| `membership` | `title`, `subtitle`, `plans[]`, `comparison` | 会员定价 + 特权对比表 |
| `footer` | `wechat`, `business`, `qrCodes[]`, `copyright` | 页脚联系信息与二维码 |

### 图片路径

- assets 为 `.png` 格式（由 `.jxl` 批量转换，使用 `djxl`，保留透明通道）
- 加载失败时自动回退到 `https://placehold.co/100x100`
- 原始 `.jxl` 与中间产物 `.jpg` 仍保留在 `assets/`，可按需删除

## 文件结构

```
fire-book-site/
├── content.json     # 内容配置
├── index.html       # 页面骨架
├── app.js           # fetch + 渲染逻辑
├── styles.css       # 自定义样式
├── assets/          # 图片资源
└── FIRE-web-design.jpeg  # 设计参考稿
```

## 部署（Cloudflare Workers Static Assets）

本项目为纯静态站点，使用 [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) 部署，**无需构建步骤**。

### 首次部署

```bash
# 1. 安装依赖
pnpm install

# 2. 登录 Cloudflare（首次）
pnpm wrangler login

# 3. 本地预览（Wrangler 内置静态服务，支持 fetch content.json）
pnpm dev

# 4. 部署到 Cloudflare
pnpm deploy
```

部署成功后 Wrangler 会输出 `*.workers.dev` 预览地址。

### 配置文件

| 文件 | 作用 |
|------|------|
| [`wrangler.jsonc`](wrangler.jsonc) | Worker 名称、`assets.directory` 指向项目根目录 |
| [`.assetsignore`](.assetsignore) | 排除 `.git`、`node_modules`、设计稿等不上传 |

### 自定义域名

在 Cloudflare Dashboard → Workers → 你的 Worker → **Settings → Domains** 添加，或在 `wrangler.jsonc` 中配置 `routes`。

### 注意事项

- **Tailwind CDN**：`index.html` 引用了 `cdn.tailwindcss.com`，部署后需能访问外网 CDN（Cloudflare Workers 默认可以）
- **无需 `main` 脚本**：没有 Worker 逻辑时，Wrangler 会自动以静态资源模式运行
- **改内容**：编辑 `content.json` 后重新 `pnpm deploy` 即可
- **图片体积**：`assets/` 中部分 PNG 较大，首次上传可能稍慢；单文件上限 25 MiB

### 其他托管方式

也可手动上传以下文件到 GitHub Pages 等静态托管：

- `index.html`、`app.js`、`styles.css`、`content.json`、`favicon.ico`
- `assets/` 目录

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

- 优先使用 `./assets/` 下已有资源（如 `Navigation_Container@2x.jxl`）
- 加载失败时自动回退到 `https://placehold.co/100x100`
- assets 为 `.jxl`（JPEG XL）格式，Firefox 默认不支持；建议后续批量转为 `.webp` / `.png`

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

## 部署

将以下文件上传到任意静态托管（GitHub Pages、Cloudflare Pages 等）：

- `index.html`
- `app.js`
- `styles.css`
- `content.json`
- `assets/` 目录

# 🇨🇳 国内部署方案

由于 Vercel 在国内访问可能需要 VPN，这里提供几个国内可直接访问的部署方案。

## 🚀 推荐方案

### 方案 1：Cloudflare Pages（推荐）

**优势**：
- ✅ 国内访问速度快
- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 全球 CDN

**部署步骤**：

1. 访问 https://pages.cloudflare.com/
2. 用 GitHub 账号登录
3. 点击 "Create a project"
4. 选择你的 `dream-forecast` 仓库
5. 配置构建设置：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. 点击 "Save and Deploy"

部署完成后会得到 `.pages.dev` 域名，国内可直接访问。

---

### 方案 2：GitHub Pages

**优势**：
- ✅ 完全免费
- ✅ 与 GitHub 深度集成
- ✅ 国内访问相对稳定

**部署步骤**：

1. 在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. 推送到 GitHub
3. 在仓库 Settings → Pages 中启用 GitHub Pages
4. 选择 `gh-pages` 分支

访问地址：`https://bubuyishujia-cloud.github.io/dream-forecast/`

---

### 方案 3：Netlify

**优势**：
- ✅ 操作简单
- ✅ 自动部署
- ✅ 国内访问较好

**部署步骤**：

1. 访问 https://www.netlify.com/
2. 用 GitHub 账号登录
3. 点击 "Add new site" → "Import an existing project"
4. 选择 GitHub 仓库
5. 构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. 点击 "Deploy site"

---

### 方案 4：腾讯云 Webify / 阿里云 OSS

**优势**：
- ✅ 国内访问最快
- ✅ 稳定可靠
- ❌ 需要实名认证
- ❌ 可能有少量费用

**腾讯云 Webify**：
1. 访问 https://console.cloud.tencent.com/webify
2. 创建应用，关联 GitHub 仓库
3. 配置构建命令和输出目录
4. 部署完成

**阿里云 OSS**：
1. 开通 OSS 服务
2. 创建 Bucket，开启静态网站托管
3. 本地构建：`npm run build`
4. 上传 `dist` 目录到 OSS

---

## 📊 方案对比

| 方案 | 国内访问 | 免费 | 难度 | 推荐度 |
|------|---------|------|------|--------|
| Cloudflare Pages | ⭐⭐⭐⭐⭐ | ✅ | 简单 | ⭐⭐⭐⭐⭐ |
| GitHub Pages | ⭐⭐⭐⭐ | ✅ | 简单 | ⭐⭐⭐⭐ |
| Netlify | ⭐⭐⭐⭐ | ✅ | 简单 | ⭐⭐⭐⭐ |
| 腾讯云/阿里云 | ⭐⭐⭐⭐⭐ | 部分 | 中等 | ⭐⭐⭐ |
| Vercel | ⭐⭐ | ✅ | 简单 | ⭐⭐ |

## 💡 建议

1. **首选 Cloudflare Pages** - 国内访问快，完全免费
2. **备选 GitHub Pages** - 如果熟悉 GitHub Actions
3. **追求极致速度** - 使用腾讯云或阿里云

## 🔧 通用构建配置

所有平台都使用相同的构建配置：

- **构建命令**: `npm run build`
- **输出目录**: `dist`
- **Node 版本**: 18 或更高

## ❓ 常见问题

**Q: 为什么 Vercel 需要 VPN？**
A: Vercel 的服务器在国外，部分地区可能被限制访问。

**Q: Cloudflare Pages 真的国内能访问吗？**
A: 是的，Cloudflare 在国内有 CDN 节点，访问速度很快。

**Q: 已经部署到 Vercel 了，如何迁移？**
A: 只需在新平台导入同一个 GitHub 仓库即可，无需修改代码。

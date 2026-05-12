# 🚀 部署指南

本指南将帮助你将「梦境预报」部署到 Vercel，让任何人都可以通过网址访问。

## 📋 前置要求

1. 一个 [GitHub](https://github.com) 账号
2. 一个 [Vercel](https://vercel.com) 账号（可以用 GitHub 登录）

**无需 API Key！** 本项目使用智能算法，完全免费。

## 🔧 部署步骤

### 1. 代码已推送到 GitHub ✅

你的代码已经在：
**https://github.com/bubuyishujia-cloud/dream-forecast**

### 2. 在 Vercel 上导入项目

1. 访问 [Vercel](https://vercel.com)
2. 用 GitHub 账号登录
3. 点击 "New Project"
4. 从 GitHub 导入你的 `dream-forecast` 仓库
5. Vercel 会自动检测到这是一个 Vite 项目

### 3. 部署

直接点击 **"Deploy"** 按钮，Vercel 会自动：
- 安装依赖
- 构建前端
- 生成访问链接

**无需配置环境变量！**

### 4. 访问你的网站

部署完成后（约 1-2 分钟），Vercel 会提供一个链接，例如：
```
https://dream-forecast-xxxxx.vercel.app
```

## 📱 移动端访问

部署到 Vercel 后，你可以：
- ✅ 在手机浏览器中直接访问
- ✅ 添加到主屏幕，像 App 一样使用
- ✅ 分享链接给朋友
- ✅ 完全免费，无使用限制

## 🔄 更新部署

每次推送代码到 GitHub，Vercel 会自动重新部署：

```bash
git add .
git commit -m "Update features"
git push
```

## 💡 提示

- **完全免费**：Vercel 免费版 + 无需 API Key = 零成本
- **自定义域名**：可以在 Vercel 设置中绑定自己的域名
- **无使用限制**：纯前端运行，无 API 调用限制
- **隐私保护**：所有数据仅存储在用户浏览器本地

## 🐛 常见问题

**Q: 部署后能正常使用吗？**
A: 是的！这是纯前端应用，部署后立即可用，无需任何配置。

**Q: 手机访问很慢？**
A: Vercel 的 CDN 在全球都有节点，访问速度通常很快。如果遇到问题，可以尝试刷新页面。

**Q: 解析结果准确吗？**
A: 本项目使用智能关键词识别和情绪分析算法，结果仅供娱乐参考。

## 📚 其他部署选项

除了 Vercel，你还可以部署到：
- **Netlify**：类似 Vercel，操作简单
- **GitHub Pages**：完全免费，直接从 GitHub 部署
- **Cloudflare Pages**：全球 CDN 加速

每个平台的配置略有不同，但都很简单：
1. 连接 GitHub 仓库
2. 选择构建命令：`npm run build`
3. 设置输出目录：`dist`
4. 点击部署

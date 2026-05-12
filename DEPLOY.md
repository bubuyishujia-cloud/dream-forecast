# 🚀 部署指南

本指南将帮助你将「梦境预报」部署到 Vercel，让任何人都可以通过网址访问。

## 📋 前置要求

1. 一个 [GitHub](https://github.com) 账号
2. 一个 [Vercel](https://vercel.com) 账号（可以用 GitHub 登录）
3. 一个 [Anthropic API Key](https://console.anthropic.com/)

## 🔧 部署步骤

### 1. 推送代码到 GitHub

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Dream Forecast"

# 关联远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/your-username/dream-forecast.git

# 推送到 GitHub
git push -u origin main
```

### 2. 在 Vercel 上导入项目

1. 访问 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 从 GitHub 导入你的 `dream-forecast` 仓库
4. Vercel 会自动检测到这是一个 Vite 项目

### 3. 配置环境变量

在 Vercel 项目设置中添加环境变量：

1. 进入项目 → Settings → Environment Variables
2. 添加以下变量：

```
ANTHROPIC_API_KEY = sk-ant-xxxxx（你的 API Key）
```

### 4. 部署

点击 "Deploy" 按钮，Vercel 会自动：
- 安装依赖
- 构建前端
- 部署 API 函数
- 生成访问链接

### 5. 访问你的网站

部署完成后，Vercel 会提供一个链接，例如：
```
https://dream-forecast.vercel.app
```

## 📱 移动端访问

部署到 Vercel 后，你可以：
- 在手机浏览器中直接访问
- 添加到主屏幕，像 App 一样使用
- 分享链接给朋友

## 🔄 更新部署

每次推送代码到 GitHub，Vercel 会自动重新部署：

```bash
git add .
git commit -m "Update features"
git push
```

## 💡 提示

- **免费额度**：Vercel 免费版每月有足够的额度供个人使用
- **自定义域名**：可以在 Vercel 设置中绑定自己的域名
- **API 限制**：注意 Anthropic API 的使用量，避免超出配额
- **环境变量**：API Key 只存在 Vercel 服务器，不会暴露给用户

## 🐛 常见问题

**Q: 部署后 API 调用失败？**
A: 检查 Vercel 环境变量中的 `ANTHROPIC_API_KEY` 是否正确配置。

**Q: 手机访问很慢？**
A: Vercel 的服务器在国外，国内访问可能较慢。可以考虑使用 CDN 或其他部署平台。

**Q: 如何查看 API 使用量？**
A: 访问 [Anthropic Console](https://console.anthropic.com/) 查看 API 使用统计。

## 📚 其他部署选项

除了 Vercel，你还可以部署到：
- **Netlify**：类似 Vercel，支持 Serverless Functions
- **Railway**：支持 Node.js 后端
- **Render**：免费的全栈部署平台

每个平台的配置略有不同，但核心都是：
1. 构建前端静态文件
2. 部署后端 API
3. 配置环境变量

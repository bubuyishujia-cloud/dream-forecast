# 🌙 梦境预报 Dream Forecast

一个基于 AI 的梦境解析单页应用，帮助你探索潜意识的星辰大海。

> 📱 **想要部署到云端，让手机也能访问？** 查看 [部署指南 DEPLOY.md](./DEPLOY.md)

## ✨ 功能特性

- 🔮 **AI 梦境解析**：使用 Claude API 生成结构化的梦境分析
- 🏷️ **情绪标签**：选择梦境相关的情绪标签，提升解析准确度
- 🎨 **核心意象提取**：识别梦境中的关键符号和象征
- 📊 **梦境评级**：吉/凶/平/奇四种评级系统
- 💡 **今日行动指引**：基于梦境内容提供实用的行动建议
- 📸 **截图分享**：将预报结果保存为精美图片
- 🔗 **链接分享**：生成可分享的梦境预报链接
- 💾 **本地存储**：历史记录保存在浏览器本地
- 📤 **数据导入导出**：支持 JSON 格式的数据迁移
- 🌌 **星空主题**：深色星空背景，200+ 繁星点点，金色+紫色调，Noto Serif SC 字体

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 API Key

复制 `.env.example` 为 `.env`，并填入你的 Anthropic API Key：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
ANTHROPIC_API_KEY=your_api_key_here
PORT=3001
```

从 [Anthropic Console](https://console.anthropic.com/) 获取 API Key。

### 3. 启动服务

**方式一：分别启动（推荐用于开发）**

```bash
# 终端 1：启动后端服务器
npm run server

# 终端 2：启动前端开发服务器
npm run dev
```

**方式二：同时启动**

```bash
npm start
```

访问前端：http://localhost:5173（或其他可用端口）
后端 API：http://localhost:3001

### 4. 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

## 📖 使用说明

1. **输入梦境**：在文本框中详细描述你的梦境内容
2. **选择情绪**（可选）：选择与梦境相关的情绪标签
3. **开始解析**：点击"开始解析"按钮，AI 将分析你的梦境
4. **查看结果**：查看包含评级、核心意象、近期预示、潜在警示和今日行动指引的完整报告
5. **保存分享**：可以截图保存或生成分享链接
6. **历史记录**：在历史面板中查看和管理过往的梦境记录

## 🛠️ 技术栈

**前端**
- **框架**：React 18
- **构建工具**：Vite
- **样式**：Tailwind CSS 3
- **字体**：Noto Serif SC (Google Fonts)
- **截图**：html2canvas
- **存储**：localStorage

**后端**
- **运行时**：Node.js
- **框架**：Express
- **AI 服务**：Anthropic Claude API (claude-sonnet-4-20250514)
- **环境变量**：dotenv
- **跨域**：CORS

## 🎨 设计特色

- **深色星空背景**：渐变色从深蓝到紫色
- **繁星点点**：200+ 闪烁星星，15% 为金色星星
- **毛玻璃卡片**：backdrop-blur 效果
- **金色+紫色调**：主色调为琥珀金和紫色
- **Noto Serif SC**：优雅的中文衬线字体
- **仪式感动画**：加载时的旋转水晶球效果

## 📁 项目结构

```
dream-forecast/
├── src/                          # 前端源码
│   ├── api/
│   │   └── anthropic.js          # API 调用（通过后端代理）
│   ├── components/
│   │   ├── DreamInput.jsx        # 梦境输入组件（含情绪标签）
│   │   ├── DreamResult.jsx       # 结果展示组件
│   │   ├── HistoryPanel.jsx      # 历史记录面板
│   │   ├── LoadingAnimation.jsx  # 加载动画
│   │   └── StarryBackground.jsx  # 星空背景（200+ 星星）
│   ├── utils/
│   │   └── storage.js            # 本地存储工具
│   ├── App.jsx                   # 主应用组件
│   ├── main.jsx                  # 应用入口
│   └── index.css                 # 全局样式（含 Noto Serif SC）
├── server.js                     # Express 后端服务器
├── .env                          # 环境变量（需自行创建）
├── .env.example                  # 环境变量模板
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🏗️ 架构说明

本项目采用前后端分离架构：

- **前端**（React + Vite）：运行在 `http://localhost:5173`（或其他可用端口）
- **后端**（Express）：运行在 `http://localhost:3001`

前端通过后端代理调用 Anthropic API，避免了浏览器 CORS 限制和 API Key 暴露问题。

## 🔒 隐私说明

- API Key 存储在服务器端 `.env` 文件中，不会暴露给前端
- 梦境内容通过后端代理发送到 Anthropic API 进行分析
- 历史记录保存在浏览器 localStorage 中
- 所有数据完全由用户控制，可随时导出或删除

## 📝 许可证

MIT License

## 🙏 致谢

- Powered by [Claude API](https://www.anthropic.com/api)
- UI 设计灵感来自星空和梦境的神秘美感
- 字体：[Noto Serif SC](https://fonts.google.com/noto/specimen/Noto+Serif+SC)


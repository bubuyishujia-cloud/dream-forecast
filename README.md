# 🌙 梦境预报 Dream Forecast

一个基于智能算法的梦境解析单页应用，帮助你探索潜意识的星辰大海。

> 📱 **想要部署到云端，让手机也能访问？** 查看 [部署指南 DEPLOY.md](./DEPLOY.md)

## ✨ 功能特性

- 🔮 **智能梦境解析**：基于关键词和情绪标签生成结构化的梦境分析
- 🏷️ **情绪标签**：选择梦境相关的情绪标签，提升解析准确度
- 🎨 **核心意象提取**：识别梦境中的关键符号和象征
- 📊 **梦境评级**：吉/凶/平/奇四种评级系统
- 💡 **今日行动指引**：基于梦境内容提供实用的行动建议
- 📸 **截图分享**：将预报结果保存为精美图片
- 🔗 **链接分享**：生成可分享的梦境预报链接
- 💾 **本地存储**：历史记录保存在浏览器本地
- 📤 **数据导入导出**：支持 JSON 格式的数据迁移
- 🌌 **星空主题**：深色星空背景，200+ 繁星点点，金色+紫色调，Noto Serif SC 字体
- 🆓 **完全免费**：无需 API Key，纯前端运行

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 即可使用。

### 3. 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

## 📖 使用说明

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

## 🛠️ 技术栈

- **框架**：React 18
- **构建工具**：Vite
- **样式**：Tailwind CSS 3
- **字体**：Noto Serif SC (Google Fonts)
- **截图**：html2canvas
- **存储**：localStorage
- **解析引擎**：智能关键词识别 + 情绪分析

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
├── src/
│   ├── api/
│   │   └── anthropic.js          # 智能解析引擎
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
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🏗️ 架构说明

本项目是纯前端应用，无需后端服务器：

- **纯前端运行**：所有逻辑在浏览器中执行
- **智能解析**：基于关键词识别和情绪标签生成解析结果
- **完全免费**：无需 API Key，无使用限制
- **隐私保护**：所有数据仅存储在本地浏览器

## 🔒 隐私说明

- 无需注册或登录
- 梦境内容仅在本地浏览器处理，不会上传到任何服务器
- 历史记录保存在浏览器 localStorage 中
- 所有数据完全由用户控制，可随时导出或删除

## 📝 许可证

MIT License

## 🙏 致谢

- Powered by [Claude API](https://www.anthropic.com/api)
- UI 设计灵感来自星空和梦境的神秘美感
- 字体：[Noto Serif SC](https://fonts.google.com/noto/specimen/Noto+Serif+SC)


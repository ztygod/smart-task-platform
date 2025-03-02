# 智能团队任务协作平台

![License](https://img.shields.io/badge/license-MIT-blue)
![Vue](https://img.shields.io/badge/vue-3.x-green)
![NestJS](https://img.shields.io/badge/nestjs-9.x-red)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)

**智能团队任务协作平台** 是一个基于自然语言处理（NLP）和实时协作的任务管理工具。它允许用户通过自然语言创建任务，实时同步任务状态，并通过可视化图表跟踪团队进度。项目采用 Vue3 作为前端框架，Nest.js 作为后端框架，适合用于学习和展示全栈开发能力。

---

## 功能特性

- **自然语言创建任务**  
  用户可以通过自然语言输入任务描述（如“下周三下午3点交付项目”），系统自动解析截止时间、任务类型等关键信息。

- **任务看板**  
  支持拖拽任务卡片，实时更新任务状态（如“待办”、“进行中”、“已完成”）。

- **实时协作**  
  基于 WebSocket 实现任务状态的实时同步，团队成员可以即时看到任务更新。

- **数据可视化**  
  使用 ECharts 生成任务进度甘特图和团队工作量统计图。

- **智能日报生成**  
  每日自动生成任务进度报告，帮助团队快速了解工作进展。

---

## 技术栈

### 前端
- **框架**: Vue3 + TypeScript
- **状态管理**: Pinia
- **UI 组件库**: Element-Plus
- **可视化**: ECharts
- **实时通信**: Socket.io-client
- **构建工具**: Vite

### 后端
- **框架**: Nest.js
- **数据库**: MySQL + TypeORM
- **实时通信**: WebSocket
- **自然语言处理**: chrono-node + natural
- **认证**: JWT
- **部署**: Docker

---

## 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/ztygod/smart-task-platform.git
cd smart-task-platform
```

### 2. 启动后端服务
```bash
cd backend
npm install
npm run start:dev
```

### 3. 启动前端服务
```bash
cd frontend
pnpm install
pnpm run dev
```

### 4. 访问项目
打开浏览器，访问 `http://localhost:5173`。

---

## 项目结构

```
smart-task-platform/
├── frontend/           # 前端代码
│   ├── src/
│   │   ├── assets/      # 静态资源
│   │   ├── components/  # 组件
│   │   ├── stores/      # Pinia状态管理
│   │   ├── views/       # 页面
│   │   └── main.ts      # 入口文件
├── backend/            # 后端代码
│   ├── src/
|   |   ├── user/        # 用户模块
│   │   ├── auth/        # 认证模块
│   │   ├── tasks/       # 任务模块
│   │   ├── websocket/   # WebSocket模块
│   │   └── main.ts      # 入口文件
├── docker-compose.yml   # Docker部署配置
└── README.md            # 项目说明
```

---

## 部署指南

### 使用 Docker 部署
1. 确保已安装 Docker 和 Docker Compose。
2. 在项目根目录下运行：
   ```bash
   docker-compose up --build
   ```
3. 访问 `http://localhost:5173`。

---

## 未来计划

- **AI 任务分配**：根据团队成员的工作量和技能自动分配任务。
- **移动端支持**：开发 PWA 版本，支持离线使用。
- **集成 GitHub**：同步开发任务和代码提交记录。

---

## 贡献指南

欢迎提交 Issue 和 PR！请确保代码风格一致，并通过 ESLint 检查。

1. Fork 项目
2. 创建分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -m 'Add some feature'`)
4. 推送分支 (`git push origin feature/your-feature`)
5. 创建 Pull Request




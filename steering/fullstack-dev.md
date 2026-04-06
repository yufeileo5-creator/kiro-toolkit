---
inclusion: manual
---

# 全栈开发实践 (Fullstack Dev)

> 迁移自 skills/_on-demand/minimax-fullstack-dev/SKILL.md。通过 #fullstack-dev 手动引用。

## 强制工作流

### Step 0: 收集需求
确认：技术栈、服务类型、数据库、集成方式、实时需求、鉴权方式

### Step 1: 架构决策
项目结构（Feature-first）、API 客户端、鉴权策略、实时方案、错误处理

### Step 2: 按清单搭建
### Step 3: 按模式实现
### Step 4: 测试验证（构建/冒烟/集成/实时）
### Step 5: 交接摘要

## 7 条铁律

1. 按功能组织，不按技术层
2. Controller 不含业务逻辑
3. Service 不导入 HTTP 类型
4. 所有配置来自环境变量，启动时验证
5. 每个错误都有类型、日志和一致格式
6. 所有输入在边界验证
7. 结构化 JSON 日志 + 请求 ID

## 三层架构

Controller（HTTP）→ Service（业务逻辑）→ Repository（数据访问）

| 层 | 职责 | 禁止 |
|----|------|------|
| Controller | 解析请求、验证、调用 service、格式化响应 | 业务逻辑、DB 查询 |
| Service | 业务规则、编排、事务管理 | HTTP 类型、直接 DB |
| Repository | 数据库查询、外部 API 调用 | 业务逻辑、HTTP 类型 |

## API 客户端选择

| 方案 | 适用场景 |
|------|---------|
| Typed fetch wrapper | 简单应用 |
| React Query + fetch | React 应用 |
| tRPC | 同团队 TypeScript 前后端 |
| OpenAPI generated | 公共 API、多消费者 |

## 实时方案选择

| 方案 | 方向 | 适用 |
|------|------|------|
| Polling | 客户端→服务端 | 简单状态检查 |
| SSE | 服务端→客户端 | 通知、Feed、AI 流式 |
| WebSocket | 双向 | 聊天、协作 |

## 生产加固清单
- 健康检查端点（/health + /ready）
- 优雅关闭（SIGTERM）
- CORS 显式 origin（生产环境禁止 *）
- 安全头（helmet）
- 公共端点限流
- 所有端点输入验证
- HTTPS 强制

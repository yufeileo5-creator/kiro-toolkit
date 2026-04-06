---
inclusion: manual
---

# 项目脚手架模板 (Project Templates)

> 迁移自 templates/ 目录。通过 #project-templates 手动引用。
> 进入新项目时使用，初始化项目级配置文件。

## 新项目初始化清单

进入新项目时，检查以下文件是否存在，缺失则创建：

### 1. README.md
项目简介、技术栈、快速启动、目录结构。

### 2. PLANS.md — 持久化设计文档
跨对话/跨 Agent 可见的计划索引：

`markdown
# PLANS.md — 持久化设计文档

## 活跃计划切片 (Active Slices)
- [FEAT-xxx: 特性名称](docs/plans/FEAT-xxx.md) Status: Doing

## 归档库 (Archived Slices)
- [ARCH-xxx: 历史重构] Status: Done
`

规则：
- 对话中的实施计划是草稿区，批准后执行
- 交付前必须将完成状态反写回 PLANS.md
- 新 AI 启动后检测到活跃计划，必须先重建计划再编码
- 禁止出现「参见对话 artifact」的悬空引用

### 3. docs/ 目录
- docs/architecture.md — 系统架构概览（含 Mermaid 图）
- docs/feature-map.md — 功能→代码映射
- docs/adr/ — 架构决策记录
- docs/handoff.md — 上下文交接文档

### 4. .dsp/ 目录（可选）
DSP 依赖图谱，架构真相源。

### 5. 分层约束
`
Types -> Config -> Core -> Plugin -> UI
（严禁反向依赖）
`

### 6. 规划文档指引
- 复杂功能设计沉淀在 docs/plans/ 的独立切片文件中
- PLANS.md 只作总索引
- 任务拆解到单一组件级别（不超过 3 个文件修改）
- 交付前反写完成状态到切片文件
- 接手新 Feature 时先加载 docs/adr/ 决策记录

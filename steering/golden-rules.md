---
inclusion: fileMatch
fileMatchPattern: "**/*.{ts,tsx,js,jsx}"
---

# 黄金准则 (Golden Rules)

> 迁移自 templates/.golden-rules/。通过 #golden-rules 手动引用。
> 项目级可执行质量检查准则，从历次失败中沉淀。

## 架构准则

- [GR-A001] Core 层禁止导入 Plugin 层
- [GR-A002] Plugin 间禁止直接 import（只通过 CommandBus/Hook 通信）
- [GR-A003] Types 层零外部依赖
- [GR-A004] App 入口不直接 import Plugin 内部模块
- [GR-A005] 画布操作必须通过 CommandBus
- [GR-A006] 新增命令必须注册 undo 逻辑
- [GR-A007] 核心钩子必须预注册
- [GR-A008] 新增/删除模块后必须同步 DSP 图谱
- [GR-A009] DSP 图谱的 dependsOn 必须与实际 import 一致

## 代码质量准则

- [GR-Q001] 禁用 any 类型（测试文件除外）
- [GR-Q002] 所有公共 API 必须有 TSDoc
- [GR-Q003] 核心逻辑函数 <= 40 行
- [GR-Q004] 常规文件 <= 300 行
- [GR-Q005] 所有外部输入必须校验
- [GR-Q006] 异步操作必须有错误处理
- [GR-Q007] 导入顺序：外部库 > 核心模块 > 相对路径
- [GR-Q008] 变量/函数用 camelCase
- [GR-Q009] 类型/接口/组件用 PascalCase

## 文档准则

- [GR-D001] 新增功能必须更新 feature-map.md
- [GR-D002] 删除功能必须清理 feature-map.md
- [GR-D003] 用户可感知变更必须追加 CHANGELOG
- [GR-D004] 模块结构变更必须更新 architecture.md
- [GR-D005] AGENTS.md/README.md 与项目结构一致
- [GR-D006] 模块变更必须同步 DSP 图谱
- [GR-D007] 注释解释 Why 不解释 What
- [GR-D008] 核心技术决策必须创建 ADR
- [GR-D009] 已采纳 ADR 禁止直接修改
- [GR-D010] Implementation Plan 必须沉淀到 PLANS.md

## 安全准则

- [GR-S001] Agent 只能修改项目目录内的文件
- [GR-S002] 禁止删除关键文件（package.json/tsconfig.json/.env 等）
- [GR-S003] API Key 严禁硬编码
- [GR-S004] .env 文件必须在 .gitignore 中
- [GR-S005] 新增环境变量必须同步 .env.example
- [GR-S006] 前端代码禁止直接调用外部 API（必须通过 BFF 代理）
- [GR-S007] BFF 层拥有速率限制

## 错误自修复提示

遇到以下错误时参考对应修复方案：

| 错误 | 修复方向 |
|------|---------|
| Tainted Canvas | 图片加载设置 crossOrigin: 'anonymous'，或通过 BFF 代理 |
| fabric is not defined | 确保在 onCanvasReady 回调之后才调用 Fabric API |
| Command not found | 检查插件 activate() 中是否注册了命令 |
| Plugin activation failed | 检查钩子预注册、插件加载顺序、异步操作 await |
| Rate limit exceeded | 开发环境可临时调大限制 |
| API Key missing | 检查 .env 文件是否存在且包含正确的 Key |
| Module not found | 文件路径可能在重构中变化，搜索实际位置 |
| Type error after refactor | 检查 types.ts 获取最新类型定义 |

## 新增准则流程

Agent 犯同样错误 2 次以上时：
1. 分析根因
2. 编码为新的黄金准则条目（附带来源追溯）
3. 追加到本文件对应章节


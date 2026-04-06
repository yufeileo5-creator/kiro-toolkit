# 🤖 Kiro 智能体全局工具箱 (kiro-toolkit)

> **Kiro IDE 版本**的全局规则、技能和工作流配置中央仓库。
> 本仓库是 [agent-toolkit1](https://github.com/yufeileo5-creator/agent-toolkit1)（Antigravity Agent Toolkit）的 **Kiro IDE 适配版本**，将原有的 Gemini CLI 技能体系完整迁移为 Kiro 的 Steering 机制。

---

## 🛠️ 一键装机

克隆到 `~/.kiro` 目录即可：

```bash
git clone https://github.com/yufeileo5-creator/kiro-toolkit.git ~/.kiro
```

安装脚本依赖：

```bash
cd ~/.kiro/scripts/md-to-html-website
npm install
```

新项目初始化（部署 Hooks）：

```powershell
powershell -File ~/.kiro/setup-kiro.ps1
```

---

## 📁 目录结构

```
~/.kiro/
├── steering/              # 32 个全局 Steering 规则文件
│   ├── agent-rules.md     # ★ 全局规则 v8（always-on，每次对话自动加载）
│   ├── auto-scaffold.md   # ★ 新项目环境自举（always-on）
│   ├── ui-standards.md    # 前端文件时自动加载
│   ├── docs-engineering.md # Markdown 文件时自动加载
│   └── ...                # 其余 28 个手动引用技能/工作流
├── hooks-template/        # 3 个 Hook 模板（新项目初始化时复制）
│   ├── verify-after-write.kiro.hook   # 写入代码后自动检查诊断
│   ├── regression-guard.kiro.hook     # 写入前检查回归风险
│   └── change-summary.kiro.hook       # 任务完成后生成变更总结
├── scripts/
│   └── md-to-html-website/  # Markdown → HTML 编译引擎（Node.js）
├── setup-kiro.ps1         # 新项目一键初始化脚本
└── README.md

```

---

## 🧠 核心设计

### Steering 分层机制

| 类型 | 触发方式 | 文件 |
|------|---------|------|
| **always** | 每次对话自动加载 | `agent-rules.md`、`auto-scaffold.md` |
| **fileMatch** | 读取对应文件类型时自动加载 | `ui-standards.md`（前端文件）、`docs-engineering.md`（.md 文件） |
| **manual** | 聊天中用 `#名称` 手动引用 | 其余所有技能和工作流 |

### 与 agent-toolkit1 的对应关系

| Gemini CLI 机制 | Kiro 对应机制 |
|----------------|-------------|
| `GEMINI.md` 全局规则 | `steering/agent-rules.md`（always-on） |
| `skills/` Tier 1 自动加载 | `steering/` always 类型 |
| `skills/_on-demand/` 按需加载 | `steering/` manual 类型，`#名称` 引用 |
| `/plan`、`/handoff` 等工作流 | `steering/plan-workflow.md` 等，`#名称` 引用 |
| `install.ps1` 一键装机 | `git clone` + `setup-kiro.ps1` |

---

## 📋 完整技能清单

### 工作流（5 个）

| 引用方式 | 功能 |
|---------|------|
| `#plan-workflow` | 计划模式审批引擎，强制方案审批后再执行 |
| `#handoff-workflow` | 上下文交接，对话过长时生成交接文档 |
| `#version-workflow` | 版本管理，提交/打标签/推送/回退 |
| `#doc-sync-check` | 文档同步检查，功能完成后验证文档是否更新 |
| `#sync-harness` | 工具箱同步，将本地修改推送到本仓库 |

### 核心技能（Tier 1 等价，7 个）

| 引用方式 | 功能 |
|---------|------|
| `#debugging` | 四阶段系统化调试，严禁盲目重试 |
| `#regression-guard` | 回归守卫，修改已有代码时的影响分析 |
| `#tdd` | TDD 红绿重构铁律 |
| `#code-review` | 六维度代码审查 |
| `#golden-rules` | 30+ 条可检查的黄金准则（架构/质量/文档/安全） |
| `#project-templates` | 新项目脚手架模板（PLANS.md、docs/ 结构） |
| `#pua-engine` | 反摆烂引擎（已从 always-on 移至手动引用） |

### 按需技能（Tier 2 等价，18 个）

| 引用方式 | 功能 |
|---------|------|
| `#ui-standards` | 前端 UI 基线 + 交互完整性检查 |
| `#react-best-practices` | Vercel 58 条 React/Next.js 性能规则 |
| `#frontend-dev` | 前端开发工作室（设计/动效/文案/资源生成） |
| `#fullstack-dev` | 全栈开发实践（后端架构/API/认证/实时） |
| `#performance-auditor` | 性能与安全审计 |
| `#pr-creator` | PR 创建规范 |
| `#webapp-testing` | Playwright Web 应用测试 |
| `#log-compressor` | 日志浓缩器，防止巨量日志冲垮上下文 |
| `#docs-engineering` | 文档工程标准 + 变更日志规范 |
| `#feature-tracer` | 功能追踪归档 |
| `#subtitle-to-tutorial` | 字幕/逐字稿转高质量 Markdown 教程 |
| `#md-to-html-website` | Markdown 批量编译为交互式 HTML 网页 |
| `#long-form-content` | 长图文生成（营销落地页/活动海报） |
| `#multimodal-toolkit` | MiniMax 多模态生成（语音/音乐/视频/图片） |
| `#skill-creator` | 技能创建流水线 |
| `#plugin-dev` | 插件开发规范 |
| `#canvas-design` | 视觉设计创作（海报/艺术品） |
| `#layout-engine-check` | 排版引擎变更检查 |

### 归档技能（Tier 3 等价，7 个）

| 引用方式 | 功能 |
|---------|------|
| `#dead-code-sweeper` | 僵尸代码清理 |
| `#harness-gc` | 代码库垃圾回收巡检 |
| `#agent-eval` | Agent 能力自评 |
| `#mcp-builder` | MCP Server 构建指南 |
| `#doc-sync-check` | 文档同步检查 |
| `#handoff-workflow` | 上下文交接 |
| `#version-workflow` | 版本管理 |

---

## 🔄 更新工具箱

修改了 steering 文件后，用 `#sync-harness` 工作流同步到本仓库：

```bash
cd ~/.kiro
git add -A
git commit -m "chore(harness): 描述变更内容"
git push origin main
```

---

## 📖 相关链接

- [agent-toolkit1](https://github.com/yufeileo5-creator/agent-toolkit1) — Gemini CLI 原版工具箱
- [Kiro IDE](https://kiro.dev) — Kiro 官方文档

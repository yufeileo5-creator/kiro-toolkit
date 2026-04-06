# Kiro 智能体全局工具箱

> Kiro IDE 版本的全局规则、技能和工作流配置中央仓库。
> 对应 Antigravity Agent Toolkit 的 Kiro 适配版本。

## 一键装机

克隆到 ~/.kiro 目录即可：

```bash
git clone https://github.com/yufeileo5-creator/kiro-toolkit.git ~/.kiro
```

然后安装脚本依赖：

```bash
cd ~/.kiro/scripts/md-to-html-website
npm install
```

## 目录结构

```
~/.kiro/
├── steering/          # 33 个全局 Steering 规则（自动加载 + 手动引用）
├── hooks-template/    # 3 个 Hook 模板（新项目初始化时复制）
├── scripts/           # 工具脚本（md-to-html-website 编译引擎）
├── setup-kiro.ps1     # 新项目一键初始化脚本
└── .gitignore
```

## 使用方式

### 自动生效（无需操作）
- `agent-rules.md` — 全局规则 v8（每次对话自动加载）
- `pua-engine.md` — 反摆烂引擎（每次对话自动加载）
- `auto-scaffold.md` — 新项目环境自举（每次对话自动加载）
- `ui-standards.md` — 前端文件时自动加载
- `docs-engineering.md` — Markdown 文件时自动加载

### 手动引用（聊天中输入 #名称）

| 工作流 | 引用方式 |
|--------|---------|
| 计划模式 | `#plan-workflow` |
| 上下文交接 | `#handoff-workflow` |
| 版本管理 | `#version-workflow` |
| 文档同步检查 | `#doc-sync-check` |
| 工具箱同步 | `#sync-harness` |
| 代码审查 | `#code-review` |
| 系统化调试 | `#debugging` |
| TDD | `#tdd` |
| 回归守卫 | `#regression-guard` |
| 字幕转教程 | `#subtitle-to-tutorial` |
| MD 转 HTML | `#md-to-html-website` |

### 新项目初始化

```powershell
powershell -File ~/.kiro/setup-kiro.ps1
```

## 对应关系

本仓库是 [agent-toolkit1](https://github.com/yufeileo5-creator/agent-toolkit1) 的 Kiro IDE 适配版本。

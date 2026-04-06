---
inclusion: always
---

# 环境自举 (Auto-Scaffold)

> 进入新项目时自动检测并部署 Kiro 基础配置。

## 自动检测规则

每次进入项目时，如果检测到当前项目根目录下不存在 `.kiro/hooks/` 目录或其中没有 `.kiro.hook` 文件，说明这是一个未初始化的新项目。此时必须：

1. 自动执行：`powershell -File $env:USERPROFILE\.kiro\setup-kiro.ps1`
2. 如果脚本不存在，手动创建 `.kiro/hooks/` 目录并从 `~/.kiro/hooks-template/` 复制 hook 文件
3. 提醒用户创建项目级 steering 文件（product.md / tech.md / structure.md）

## 不触发条件

- `.kiro/hooks/` 目录已存在且包含 hook 文件 → 跳过，项目已初始化

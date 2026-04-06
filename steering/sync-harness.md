---
inclusion: manual
---

# 工具箱同步工作流 (Sync Harness)

> 对应反重力的 /sync-harness 工作流。通过 #sync-harness 手动引用。
> 将本地 ~/.kiro/ 中修改过的全局规则、技能和脚本同步推送到 GitHub 云端仓库。

## 触发时机

- 修改了 ~/.kiro/steering/ 中的任何 steering 文件
- 新增了全局 steering 文件
- 修改了 ~/.kiro/scripts/ 中的脚本
- 修改了 ~/.kiro/setup-kiro.ps1 初始化脚本
- 想在新电脑上一键恢复完整 Kiro 工具箱时

## 前置条件

~/.kiro/ 目录需要是一个 git 仓库并关联了远程 GitHub 仓库。
如果还没有初始化，执行以下步骤：

```bash
cd ~/.kiro
git init
git remote add origin https://github.com/<你的用户名>/kiro-toolkit.git
```

## 同步流程

### Step 1：查看变更
```bash
cd ~/.kiro
git status
git diff --stat
```

### Step 2：暂存并提交
```bash
git add -A
git commit -m "chore(harness): <中文描述变更内容>"
```

提交信息格式：
- `chore(harness): 新增 xxx steering 规则`
- `feat(harness): 迁移 xxx 技能`
- `fix(harness): 修复 xxx 规则遗漏`
- `docs(harness): 更新 xxx 工作流`

### Step 3：推送到 GitHub
```bash
git push origin main
```

## 新机器恢复流程

在新电脑上一键恢复完整 Kiro 工具箱：

```bash
# 1. clone 仓库到 ~/.kiro
git clone https://github.com/<你的用户名>/kiro-toolkit.git ~/.kiro

# 2. 安装脚本依赖（如有）
cd ~/.kiro/scripts/md-to-html-website
npm install
```

## 注意事项

- ~/.kiro/steering/ 中的文件是全局规则，推送后任何机器 clone 都能用
- ~/.kiro/scripts/ 中的脚本也一并同步，包括 build.js 和 setup-kiro.ps1
- 不要把 ~/.kiro/extensions/ 和 ~/.kiro/powers/ 推送（这些是 Kiro 自动管理的）
- 建议在 .gitignore 中排除：extensions/、powers/、*.json（argv.json 等配置）

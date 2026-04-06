---
inclusion: manual
---

# 版本管理工作流 (Version Management)

> 迁移自 `workflows/version.md`。通过 `#version-workflow` 在聊天中手动引用。

## 提交与发版流程

1. 检查状态：`git status`，确认有未提交更改
2. 查看改动：`git diff --stat`
3. 暂存：`git add -A`
4. 生成 Conventional Commits 格式的中文提交信息：
   - `feat: 新增xxx功能`
   - `fix: 修复xxx问题`
   - `refactor: 重构xxx模块`
   - `style: 调整xxx样式`
   - `docs: 更新xxx文档`
   - `perf: 优化xxx性能`
   - `chore: 更新xxx配置`
5. 提交：`git commit -m "<type>: <中文描述>"`
6. 询问用户是否需要打版本标签（语义化版本 `vX.Y.Z`）
7. 如需标签：`git tag -a vX.Y.Z -m "版本说明"`
8. 推送：`git push origin main` + `git push origin --tags`
9. 更新 CHANGELOG.md（Keep a Changelog 格式）
10. 提交 CHANGELOG 更新

## 选择性还原

| 场景 | 命令 |
|------|------|
| 还原特定文件 | `git checkout <tag> -- <file>` |
| 对比版本差异 | `git diff <旧tag> HEAD -- <file>` |
| 逐块还原 | `git checkout -p <旧tag> -- <file>` |
| 安全分支实验 | `git checkout -b restore-from-<版本> <tag>` |

## 注意事项

- 严禁在已推送的 main 分支上使用 `git reset --hard`
- 使用 `git checkout <tag> -- <file>` 还原是最安全的方式
- 重要功能完成后必须打版本标签
- 推送前确保代码可正常运行

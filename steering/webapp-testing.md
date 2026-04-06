---
inclusion: manual
---

# Web 应用测试 (Webapp Testing)

> 迁移自 `skills/_on-demand/webapp-testing/SKILL.md`。通过 `#webapp-testing` 手动引用。

## 决策树

1. 静态 HTML？→ 直接读取文件识别选择器 → 写 Playwright 脚本
2. 动态 webapp，服务器未运行？→ 启动服务器 + 写 Playwright 脚本
3. 动态 webapp，服务器已运行？→ 侦察再行动：
   - 导航并等待 networkidle
   - 截图或检查 DOM
   - 从渲染状态识别选择器
   - 用发现的选择器执行操作

## 最佳实践

- 使用 sync_playwright() 写同步脚本
- 始终关闭浏览器
- 使用描述性选择器：text=、role=、CSS、ID
- 添加适当等待：wait_for_selector() 或 wait_for_load_state('networkidle')
- chromium 始终 headless 模式启动

## 常见陷阱

- ❌ 动态应用中在 networkidle 之前检查 DOM
- ✅ 先等待 networkidle 再检查

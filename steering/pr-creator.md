---
inclusion: manual
---

# 性能与安全审计 (Performance Auditor)

> 迁移自 `skills/_on-demand/performance-auditor/SKILL.md`。通过 `#performance-auditor` 手动引用。

## 触发条件
- 新增复杂交互的 UI 组件（尤其画布相关）
- 编写了文件读写、密集循环或大 Payload 的数据接口
- 提 PR 和交接前的环境安全审计

## 审查矩阵

### 1. 前端渲染陷阱
- useEffect/useMemo/useCallback 依赖数组是否传递了巨大对象字面量导致缓存失效？
- 画布/监听器销毁时是否遗漏了 dispose() 或 removeEventListener？
- 列表渲染是否用 index 做 key？大列表是否缺少虚拟列表？

### 2. 后端 I/O 毒药
- 严禁主请求链路中出现 fs.readFileSync，必须改用 fs.promises.readFile
- 大包 JSON.parse 是否会阻塞线程？
- 所有 async/await 最外层是否有 try/catch 或全局 Error Middleware？

### 3. 安全防线
- 代码中是否出现硬编码 API 密钥（sk-... 等）？必须抽离到 .env
- 前端代码是否误 import 了 Node.js 模块（fs、path）？

## 输出格式
`
### 性能与安全审计结果
- 🔴 致命: [文件:行号] 描述
- 🟡 警告: [文件:行号] 描述
- 🟢 通过: 描述
-> 判决：必须 0 致命才允许交付
`
"@ | Set-Content "C:\Users\leo99\.kiro\steering\performance-auditor.md" -Encoding UTF8

Write-Host "Done: performance-auditor"

# 4. pr-creator
@"
---
inclusion: manual
---

# PR 创建规范 (PR Creator)

> 迁移自 `skills/_on-demand/pr-creator/SKILL.md`。通过 `#pr-creator` 手动引用。

## 流程

1. 确认不在 main 分支，否则创建并切换到新分支
2. 确认所有变更已提交（git status）
3. 查找 PR 模板（.github/pull_request_template.md）
4. 按模板结构撰写 PR 描述，填写所有 section，标记 checklist
5. 运行预检脚本（npm run preflight / lint / test）
6. 推送分支（再次确认不是 main）
7. 使用 gh CLI 创建 PR，标题遵循 Conventional Commits 格式

## 原则

- 安全第一：绝不推送到 main
- 合规：严格遵循 PR 模板
- 完整：填写所有相关 section
- 诚实：未完成的 checklist 项不打勾

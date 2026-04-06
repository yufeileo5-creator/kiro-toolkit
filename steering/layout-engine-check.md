---
inclusion: manual
---

# Agent 能力自评 (Agent Eval)

> 迁移自 skills/_archived/agent-eval/SKILL.md。通过 #agent-eval 手动引用。
> 任务完成后进行质量评估和能力反思。

## 触发条件
- PUA 引擎触发 L3 或更高级别后，任务最终完成时
- 用户主动要求进行能力评估
- 重大功能交付后的回顾

## 评估维度

### 1. 执行效率
- 从需求到交付花了多少轮对话？
- 有多少次无效尝试？
- 是否存在原地打转？

### 2. 方案质量
- 最终方案是否是最优解？
- 是否有更简单的方案被忽略？
- 架构决策是否合理？

### 3. 调试能力
- 遇到错误时是否遵循了系统化调试流程？
- 根因定位是否准确？
- 是否存在盲目重试？

### 4. 交付质量
- 代码是否通过了所有验证？
- 是否有遗漏的边界情况？
- 文档是否同步更新？

## 输出格式

`
## Agent 能力评估报告

### 评分
| 维度 | 评分 (1-5) | 说明 |
|------|-----------|------|
| 执行效率 | X | ... |
| 方案质量 | X | ... |
| 调试能力 | X | ... |
| 交付质量 | X | ... |

### 改进建议
1. [具体改进点]

### 经验沉淀
- [本次学到的教训，可沉淀为规则]
`
"@ | Set-Content "C:\Users\leo99\.kiro\steering\agent-eval.md" -Encoding UTF8
Write-Host "Done: agent-eval"

# mcp-builder
@"
---
inclusion: manual
---

# MCP Server 构建指南 (MCP Builder)

> 迁移自 skills/_archived/mcp-builder/SKILL.md。通过 #mcp-builder 手动引用。
> 构建 MCP Server 集成外部 API/服务时使用。

## 四阶段工作流

### 阶段 1: 研究规划
- 确定要集成的外部 API/服务
- 阅读目标 API 文档
- 确定需要暴露的工具（tools）列表
- 规划输入/输出 schema

### 阶段 2: 实现
- 创建 MCP Server 项目结构
- 实现各 tool handler
- 处理认证和错误
- 编写输入验证

### 阶段 3: 审查测试
- 测试每个 tool 的正常和异常路径
- 验证 schema 定义正确
- 检查错误处理覆盖

### 阶段 4: 评估部署
- 编写 README 和使用文档
- 配置 mcp.json
- 测试端到端集成

## Kiro 中的 MCP 配置

在 Kiro 中，MCP 配置位于：
- 项目级：`.kiro/settings/mcp.json`
- 用户级：`~/.kiro/settings/mcp.json`

`json
{
  "mcpServers": {
    "server-name": {
      "command": "uvx",
      "args": ["package-name@latest"],
      "env": {},
      "disabled": false,
      "autoApprove": []
    }
  }
}
`
"@ | Set-Content "C:\Users\leo99\.kiro\steering\mcp-builder.md" -Encoding UTF8
Write-Host "Done: mcp-builder"

# layout-engine-check (项目特定但也可通用化)
@"
---
inclusion: manual
---

# 排版引擎变更检查 (Layout Engine Check)

> 迁移自 workflows/layout-engine-check.md。通过 #layout-engine-check 手动引用。
> 修改核心算法层（画布、拖拽、布局引擎）时使用。

## 检查步骤

### 1. 运行契约测试
确认所有测试通过，无新增失败。

### 2. 类型检查
运行 lint/类型检查。

### 3. 核心契约审查
修改前确认以下契约不被破坏：
- 关键数据填充逻辑不受条件守卫影响
- 补偿机制正常工作
- 约束条件独立于其他模块
- 尺寸感知正确
- 截断逻辑正常

### 4. 浏览器验证（重大改动时）
- 核心区块数量正确
- 内容可见（非空白占位符）
- 文字正确填充区域

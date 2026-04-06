---
inclusion: manual
---

# 功能追踪 (Feature Tracer)

> 迁移自 `feature-tracer` 技能。通过 `#feature-tracer` 在聊天中手动引用。
> 将业务功能与代码实现建立持久映射。

## 归档模式（功能完成后）

### 1. 收集变更信息
从实施计划、`git diff --name-only` 或变更记录中提取信息。

### 2. 提炼关键文件

| 类别 | 说明 | 示例 |
|------|------|------|
| 入口组件 | 用户交互的第一个组件/页面 | `XxxPanel.tsx` |
| 核心逻辑 | 业务算法/服务层 | `xxxService.ts` |
| 数据结构 | 类型定义/接口 | `xxx.types.ts` |
| 状态管理 | Store/Context/Hook | `useXxx.ts` |

每类最多 2-3 个最核心文件。

### 3. 更新 feature-map.md

在 `docs/feature-map.md` 顶部追加：

```markdown
### 🎨 [功能名称] ([日期])
- **入口组件**：[文件名](路径) → `ComponentName`
- **核心逻辑**：[文件名](路径) → `functionName()`
- **数据结构**：[文件名](路径) → `InterfaceName`
```

### 4. DSP 图谱打标签（如使用）

## 查询模式

- 功能名 → 代码：在 `docs/feature-map.md` 和 DSP 图谱中搜索
- 文件名 → 功能：反向查找文件参与了哪些功能

## 注意事项
- 只记核心文件，不要列所有改动文件
- 功能名称保持一致，一旦确定不要改
- 小 Bug 修复不需要归档

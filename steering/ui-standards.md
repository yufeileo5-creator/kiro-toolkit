---
inclusion: fileMatch
fileMatchPattern: "**/*.{html,css,tsx,jsx,vue,svelte}"
---

# 前端 UI 标准与交互完整性

> 迁移自 `baseline-ui`、`interaction-completeness`、`taste-skill` 技能。
> 当读取前端相关文件时自动加载。

## UI 基线约束

### 动画
- 未明确要求时不得添加动画
- 只动画合成属性（`transform`、`opacity`），禁止动画布局属性（`width`、`height`、`top`、`left`）
- 交互反馈动画不超过 200ms
- 尊重 `prefers-reduced-motion`

### 排版
- 标题使用 `text-balance`，正文使用 `text-pretty`
- 数据使用 `tabular-nums`
- 禁止修改 `letter-spacing` 除非明确要求

### 布局
- 禁止使用 `h-screen`，使用 `h-dvh`
- 使用固定的 `z-index` 层级，禁止随意设值
- 方形元素使用 `size-*` 代替 `w-*` + `h-*`

### 设计
- 禁止使用渐变、紫色/多色渐变、发光效果，除非明确要求
- 空状态必须有一个明确的下一步操作引导
- 每个视图最多一个强调色

### 无障碍
- 图标按钮必须有 `aria-label`
- 禁止手动重建键盘/焦点行为，使用无障碍组件原语
- 禁止阻止 `input`/`textarea` 的粘贴行为
- 破坏性操作必须使用确认对话框

## 交互完整性检查清单

功能编码完成后，逐项对照检查：

### 五态完整性
每个数据驱动的 UI 区域必须覆盖：
| 状态 | 要求 |
|------|------|
| 空状态 | 引导性提示 + 操作入口 |
| 加载状态 | 骨架屏或 Spinner，尺寸匹配实际内容 |
| 错误状态 | 具体错误原因 + 可操作的恢复按钮 |
| 成功状态 | 视觉反馈（Toast/动画/状态变化） |
| 禁用状态 | 视觉灰化 + Tooltip 解释原因 |

### 边界条件
- 超长内容：truncate/clamp，不得撑破布局
- 快速连续操作：debounce/throttle 防重复提交
- 空输入/特殊字符：必须处理
- 网络异常：断网/超时/500 时有用户可见反馈

### 键盘与焦点
- 所有交互元素可 Tab 到达，顺序符合视觉流
- 弹窗/浮层可通过 Escape 关闭
- Modal 打开时焦点锁定内部，关闭后焦点回到触发元素
- 键盘聚焦时必须有清晰的 focus ring

### 响应式
- 触摸区域 ≥ 44×44px
- 组件在各断点下布局合理
- 输入时虚拟键盘不遮挡内容

### 文案
- 错误信息具体、可操作（不是 "Something went wrong"）
- 图标按钮必须有 Tooltip
- 输入框 Placeholder 展示格式示例
- 删除/覆盖等不可逆操作必须二次确认

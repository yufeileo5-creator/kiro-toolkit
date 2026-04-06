---
inclusion: fileMatch
fileMatchPattern: "**/*.{tsx,jsx}"
---

# React 性能优化指南 (React Best Practices)

> 迁移自 Vercel 58 条 React/Next.js 性能规则。通过 `#react-best-practices` 手动引用。

## 按优先级分类

### 1. 消除瀑布流（CRITICAL）
- 将 await 移到实际使用的分支中
- 独立操作使用 Promise.all() 并行
- 使用 Suspense 流式传输内容

### 2. 包体积优化（CRITICAL）
- 直接导入，避免 barrel files
- 重型组件使用动态导入
- 分析/日志等第三方库延迟到 hydration 后加载
- hover/focus 时预加载提升感知速度

### 3. 服务端性能（HIGH）
- 服务端 action 必须像 API 路由一样做鉴权
- 使用 React.cache() 做请求级去重
- 最小化传递给客户端组件的数据
- 重构组件以并行化 fetch

### 4. 客户端数据获取（MEDIUM-HIGH）
- 使用 SWR 自动请求去重
- 滚动事件使用 passive listener
- localStorage 数据做版本控制和最小化

### 5. 重渲染优化（MEDIUM）
- 不要订阅只在回调中使用的 state
- 提取昂贵计算到 memoized 组件
- 提升默认非原始类型 props
- 使用原始类型作为 effect 依赖
- 订阅派生布尔值而非原始值
- 在渲染期间派生 state，不用 effect
- 使用函数式 setState 获得稳定回调
- useState 昂贵初始值传函数
- 简单原始值不需要 memo
- 交互逻辑放事件处理器，不放 effect
- 非紧急更新使用 startTransition

### 6. 渲染性能（MEDIUM）
- 动画包裹 div 而非直接动画 SVG
- 长列表使用 content-visibility
- 静态 JSX 提取到组件外部
- 减少 SVG 坐标精度
- 条件渲染用三元运算符，不用 &&

### 7. JavaScript 性能（LOW-MEDIUM）
- CSS 变更通过 class 或 cssText 批量处理
- 重复查找用 Map 建索引
- 循环中缓存对象属性
- 多个 filter/map 合并为一个循环
- 先检查数组长度再做昂贵比较
- 函数提前返回
- RegExp 提升到循环外
- 查找用 Set/Map 获得 O(1)

### 8. 高级模式（LOW）
- 事件处理器存储在 refs 中
- 应用级初始化只执行一次
- useLatest 获得稳定回调引用


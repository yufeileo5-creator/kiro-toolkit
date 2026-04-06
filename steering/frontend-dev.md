---
inclusion: manual
---

# 前端开发工作室 (Frontend Dev)

> 迁移自 skills/_on-demand/minimax-frontend-dev/SKILL.md。通过 #frontend-dev 手动引用。
> 构建落地页、营销站、产品页、仪表盘时使用。

## 工作流

### Phase 1: 设计架构
- 分析请求，确定页面类型
- 设置设计参数（DESIGN_VARIANCE/MOTION_INTENSITY/VISUAL_DENSITY）
- 规划布局区块和资源需求

### Phase 2: 动效架构
- 按工具选择矩阵分配动画工具
- 遵循性能护栏规划动效序列

### Phase 3: 资源生成
- 生成所有图片/视频/音频资源，禁止使用占位符 URL

### Phase 4: 文案与内容
- 遵循 AIDA/PAS/FAB 框架撰写真实文案，禁止 Lorem ipsum

### Phase 5: 构建 UI
- 搭建项目，集成资源和文案

### Phase 6: 质量门控

## 设计规则

| 规则 | 要求 |
|------|------|
| 排版 | 标题 text-4xl md:text-6xl tracking-tighter，正文 max-w-[65ch]，禁止 Inter 字体 |
| 颜色 | 最多 1 个强调色，饱和度 < 80%，禁止 AI 紫/蓝 |
| 布局 | VARIANCE > 4 时禁止居中 hero，强制分屏或不对称布局 |
| 状态 | 必须实现 Loading/Empty/Error/触觉反馈 |
| 视口 | 使用 min-h-[100dvh] 不用 h-screen |

## 禁止模式
- 霓虹发光、纯黑 #000、过饱和强调色、渐变文字标题
- Inter 字体、超大 H1、仪表盘用衬线体
- 三列等宽卡片行、未定制的默认 shadcn/ui

## 动效工具选择

| 需求 | 工具 |
|------|------|
| UI 进出/布局 | Framer Motion |
| 滚动叙事（钉住/擦洗） | GSAP + ScrollTrigger |
| 循环图标 | Lottie（懒加载） |
| 3D/WebGL | Three.js / R3F（隔离 Canvas） |
| hover/focus | 纯 CSS |

冲突规则：同一组件禁止混用 GSAP + Framer Motion。

## 性能规则
- 只动画 GPU 属性：transform、opacity、filter、clip-path
- 禁止动画：width、height、top、left、margin、padding
- 永久动画必须在 React.memo 叶组件中
- 移动端禁用视差/3D，尊重 prefers-reduced-motion

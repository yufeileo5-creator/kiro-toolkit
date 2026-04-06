---
inclusion: fileMatch
fileMatchPattern: "**/plugins/**/*.{ts,tsx}"
---

# 插件开发规范 (Plugin Dev)

> 迁移自 `skills/plugin-dev/SKILL.md`。通过 `#plugin-dev` 手动引用。

## 标准目录结构

```
src/plugins/{plugin-id}/
├── index.ts           # 插件入口
├── manifest.ts        # 清单：id/name/version/scope
└── __tests__/
    └── index.test.ts  # TDD 先行
```

## 开发流程（严格 TDD）

1. 创建清单（manifest.ts）：声明 id、name、version、scope
2. 先写测试（RED）：测试 manifest 元信息和激活后行为
3. 实现插件（GREEN）：实现 Plugin 接口（manifest + activate + deactivate）
4. 注册到注册表：在 plugin-registry 中添加

## 接口要求

- 必须实现 `Plugin` 接口
- `activate` 接收 `PluginContext`（钩子/命令/插槽/健康）
- `deactivate` 必须清理所有资源

## 禁止事项

- ❌ 禁止 import 其他业务插件的代码（插件间只通过 CommandBus 和 Hook 通信）
- ❌ 禁止静态 import 写死在 main.tsx，重量级插件强制动态导入
- ❌ 禁止全局裸 CSS
- ❌ 严禁跨域操作状态
- ❌ 禁止在 core/ 目录下添加业务功能代码


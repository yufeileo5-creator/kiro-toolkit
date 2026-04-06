---
inclusion: manual
---

# 文档同步检查工作流 (Doc Sync Check)

> 迁移自 GitHub 最新版 `workflows/doc-sync-check.md`。通过 `#doc-sync-check` 在聊天中手动引用。
> 功能完成后触发，逐项确认文档是否已同步更新。

## 检查清单

按以下顺序逐项检查，标注 ✅ 通过 / ❌ 未通过 / ⏭️ 不适用：

### 1. feature-map.md
- 涉及新增或修改用户可感知的功能？→ 检查 `docs/feature-map.md` 是否已更新

### 2. CHANGELOG.md
- 属于用户可感知的功能变更、Bug 修复或破坏性变更？→ 检查 `CHANGELOG.md` 是否已追加条目

### 3. architecture.md
- 涉及新增/删除模块、修改模块间依赖？→ 检查 `docs/architecture.md` 中的 Mermaid 图是否已更新

### 4. README.md
- 涉及新增重要目录/文件、修改项目结构？→ 检查 README.md 是否已更新

### 5. DSP 图谱
- 涉及新增/删除模块、修改模块依赖？→ 检查 `.dsp/` 是否已同步更新

### 6. ADR
- 涉及核心技术决策（新依赖引入、API 变更、架构演化）？→ 检查 `docs/adr/` 是否已创建对应 ADR

## 输出格式

```
📋 文档同步检查结果:
✅ feature-map.md — 已更新
✅ CHANGELOG.md — 已追加条目
⏭️ architecture.md — 不适用
✅ README.md — 已更新
⏭️ DSP 图谱 — 不适用
⏭️ ADR — 不适用

全部通过 ✅ | 阻断项: 0
```

如有 ❌ 项，在报告后附修复步骤。

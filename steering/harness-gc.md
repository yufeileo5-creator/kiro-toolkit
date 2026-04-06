---
inclusion: manual
---

# 代码库垃圾回收巡检 (Harness GC)

> 迁移自 `skills/_archived/harness-gc/SKILL.md`。通过 `#harness-gc` 手动引用。

## 触发时机
- 用户主动触发
- 连续开发 3+ 个功能后
- 跨期交接前、重大重构后

## 四维巡检

### 1. 文档漂移检测
- feature-map 中的文件路径引用是否实际存在
- architecture.md 的 Mermaid 图是否与实际目录匹配
- README/AGENTS.md 的项目结构描述是否过时
- 最近 git commits 是否有对应 CHANGELOG 条目

### 2. DSP 图谱校验
- 图谱中的模块是否实际存在（幽灵模块）
- 是否有未在图谱中声明的模块（未追踪模块）
- 实际 import 是否违反分层规则（反向依赖）
- dependsOn 声明是否与实际 import 一致

### 3. 死代码扫描（仅报告不删除）
- 未使用的导出
- 未使用的依赖
- 空文件或只有 import 的文件

### 4. 代码质量抽检
- any 类型扫描
- 超长函数抽检
- 裸 await 扫描（未 try/catch）

## 输出格式
健康度评分表（文档一致性/DSP 图谱/死代码/代码质量）+ 必须修复 + 建议修复 + 健康项

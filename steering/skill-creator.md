---
inclusion: manual
---

# 技能创建流水线 (Skill Creator)

> 迁移自 skills/_on-demand/skill-creator/SKILL.md。通过 #skill-creator 手动引用。

## 流程

### Step 1: 需求反转（先问再做）
生成任何内容前，先确认：
1. 范围与位置：全局技能还是项目本地技能？
2. 触发条件：什么场景触发？
3. 设计模式：Tool Wrapper / Generator / Reviewer / Inversion / Pipeline？
4. 复杂度：是否需要外部参考文件或模板？

等待用户回答后再继续。

### Step 2: 模板生成
1. 创建 SKILL.md（Kiro 中对应 steering .md 文件），包含：
   - name 和 description（精确触发描述，含关键词）
   - 标准 markdown 结构的指令
   - 必须包含「避坑指南」section
   - Pipeline 类型须包含状态持久化指令
   - 破坏性操作须定义安全护栏
2. 重型检查清单/模板抽离为独立 references 文件

### Step 3: 质检自审
生成后自我审查：
- 触发条件是否精确？
- 是否有避坑指南？
- 是否有验证/完成标准？
- 格式是否一致？
修复所有违规项后交付。

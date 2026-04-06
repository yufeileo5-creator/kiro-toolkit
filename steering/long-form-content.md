---
inclusion: manual
---

# 长图文生成 (Long Form Content)

> 迁移自 `skills/_on-demand/long-form-content/SKILL.md`。通过 `#long-form-content` 手动引用。

## 核心架构
Agent 只输出约定格式 Markdown → 本地确定性脚本转为画布 DSL JSON。严禁直接输出 JSON。

## 工作流

### Phase 1: 输入提取
- 解析源文件（.docx/.xlsx）获取结构化数据
- 严禁概括或省略任何实质内容，逐行校验完整性

### Phase 2: 设计系统匹配
- 确定颜色/字体/间距等设计令牌

### Phase 3: Markdown 生成（核心）
使用约定语法：# 大标题、## 小标题、> 引用、---product 商品模式、🏷️ 商品行、- [券] 子权益、---rules 规则区

文档完整性检查：
- [ ] 每个商品都有对应 🏷️ 行
- [ ] 权益明细用 - [券] 单独列出，不揉在一行
- [ ] 所有价格信息精确标注
- [ ] 所有附加条件出现在 rules 区域

### Phase 4: 本地脚本转换
Markdown → 确定性脚本 → .pen DSL JSON（Flexbox 布局，禁止绝对坐标）

### Phase 5: 验证交付
DSL 结构合法性验证 + 回溯校验零遗漏

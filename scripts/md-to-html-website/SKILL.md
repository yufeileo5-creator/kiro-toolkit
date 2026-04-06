---
name: md-to-html-website
description: >-
  将 subtitle-to-tutorial 技能生成的教程 Markdown 文件批量编译为高颜值静态 HTML 网页。
  支持 Mermaid 图表渲染、Prism 代码高亮、:::quiz 测验卡片、{runnable} 沙盒标记、
  details 折叠答案等自定义语法的完整解析。触发词：「转网页」「生成 HTML」「MD 转 HTML」。
---

# MD 转教程网页 Skill（md-to-html-website）

> **触发场景**：当用户要求将教程 Markdown 文件转换为可在浏览器中独立打开的静态 HTML 网页时触发。

Execute each step in order. Do NOT skip steps.

---

## Step 1：确认输入与输出路径

在执行任何构建前，必须先向用户确认：
1. **输入目录**：包含 `.md` 文件的源目录路径
2. **输出目录**：生成的 `.html` 文件存放路径

如果用户未指定，使用以下默认约定：
- 输入：当前项目根目录下所有 `.md` 文件（排除 `AGENTS.md`、`PLANS.md`、`README.md` 等项目基建文件）
- 输出：输入目录的同级 `html/` 子目录

## Step 2：检查构建环境

1. 确认技能目录下的 `package.json` 存在且 `marked` 依赖已安装。
2. 如未安装，执行：
   ```bash
   cd C:\Users\leo99\.gemini\antigravity\skills\_on-demand\md-to-html-website
   npm install
   ```

## Step 3：执行构建

运行构建脚本：
```bash
node "C:\Users\leo99\.gemini\antigravity\skills\_on-demand\md-to-html-website\scripts\build.js" "<输入目录>" "<输出目录>"
```

## Step 4：验证输出

1. 确认输出目录中生成了与输入 `.md` 文件数量一致的 `.html` 文件。
2. 在浏览器中打开至少一个生成的 HTML 文件，检查：
   - [ ] 标题层级和段落排版正常
   - [ ] Mermaid 图表成功渲染为高清矢量流程图（并且不含红屏报错）
   - [ ] 代码块带有语法高亮
   - [ ] `{runnable}` 标记的代码块已成功渲染为带有 iframe 实时预览的「上下结构交互式沙盒」
   - [ ] 沙盒中的 X-Ray 按钮等调试功能正常工作
3. 将浏览器截图或验证结论报告给用户。

---

## 🔧 技术架构

```
md-to-html-website/
├── SKILL.md              # 本文件（行为纲领）
├── package.json          # Node 依赖声明
├── scripts/
│   └── build.js          # 核心编译引擎（Marked + 自定义扩展）
└── templates/
    └── page.html         # 解耦的 HTML 视觉模板壳子
```

### 解耦原则
- **`build.js`** 只负责读文件、解析 Markdown、注入内容到模板，不包含任何 CSS/HTML 布局代码。
- **`page.html`** 只负责视觉呈现，包含 CDN 引用和全部样式。用户可独立修改此文件来换肤，无需触碰 JS 逻辑。

### 自定义语法映射

| Markdown 源语法 | 转换后 HTML |
|-----------------|-------------|
| `` ```js {runnable} {title="x.js"} `` | `<div class="interactive-playground-wrapper">` 包含实时透明编辑终端与底层 `iframe` 沙箱 |
| `` ```mermaid `` | `<pre class="mermaid">` （由客户端 Mermaid.js 渲染） |
| `> 🧩 **生活类比**：` | `<blockquote class="analogy-callout">` |
| `> ⚠️ **注意**：` | `<blockquote class="warning-callout">` |
| `> 💡 **记忆口诀**：` | `<blockquote class="tip-callout">` |

---

## Gotchas / Common Pitfalls（避坑指南）

1. **空目录防御**：`build.js` 在输入目录无 `.md` 文件时必须友好提示并退出，禁止抛出未捕获异常。
2. **编码问题**：读写文件一律使用 `utf-8`，防止中文乱码。
3. **Mermaid 渲染时机**：Mermaid 图表必须在客户端（浏览器）渲染，`build.js` 只需将 `` ```mermaid `` 块转为 `<pre class="mermaid">`，不要尝试在 Node 端渲染 SVG。
4. **模板路径**：`build.js` 使用 `__dirname` 相对路径定位 `templates/page.html`，不可硬编码绝对路径。
5. **基建文件排除**：构建时必须自动排除 `AGENTS.md`、`PLANS.md`、`README.md`、`CHANGELOG.md` 等项目级文件，只处理教程内容。

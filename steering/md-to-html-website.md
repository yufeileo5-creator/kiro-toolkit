---
inclusion: manual
---

# MD 转教程网页 (MD to HTML Website)

> 迁移自 skills/_on-demand/md-to-html-website。通过 #md-to-html-website 手动引用。
> 将 subtitle-to-tutorial 生成的教程 Markdown 批量编译为高颜值静态 HTML 网页。
> 脚本位置：~/.kiro/scripts/md-to-html-website/

## 触发场景

用户要求将教程 Markdown 文件转换为可在浏览器中独立打开的静态 HTML 网页时触发。

## 工作流

### Step 1：确认输入与输出路径

向用户确认：
1. 输入目录：包含 .md 文件的源目录路径
2. 输出目录：生成的 .html 文件存放路径

默认约定：
- 输入：当前项目根目录下所有 .md 文件（排除 AGENTS.md、PLANS.md、README.md 等基建文件）
- 输出：输入目录的同级 html/ 子目录

### Step 2：检查构建环境

确认脚本目录下的 marked 依赖已安装。如未安装：
```bash
cd ~/.kiro/scripts/md-to-html-website
npm install
```

### Step 3：执行构建

```bash
node ~/.kiro/scripts/md-to-html-website/scripts/build.js "<输入目录>" "<输出目录>"
```

Windows 完整路径：
```bash
node $env:USERPROFILE\.kiro\scripts\md-to-html-website\scripts\build.js "<输入目录>" "<输出目录>"
```

### Step 4：验证输出

1. 确认输出 .html 文件数量与输入 .md 一致
2. 浏览器打开检查：
   - [ ] 标题层级和段落排版正常
   - [ ] Mermaid 图表成功渲染（无红屏报错）
   - [ ] 代码块带有语法高亮
   - [ ] {runnable} 标记的代码块渲染为交互式沙盒
   - [ ] 沙盒中的调试功能正常

## 技术架构

```
~/.kiro/scripts/md-to-html-website/
├── package.json          # Node 依赖（marked）
├── scripts/
│   └── build.js          # 核心编译引擎
└── templates/
    └── page.html         # 解耦的 HTML 视觉模板
```

### 解耦原则
- build.js 只负责读文件、解析 Markdown、注入内容到模板
- page.html 只负责视觉呈现，可独立修改换肤

### 自定义语法映射

| Markdown 源语法 | 转换后 HTML |
|-----------------|-------------|
| js {runnable} {title="x.js"} | 交互式沙盒（编辑器 + iframe） |
| mermaid | <pre class="mermaid">（客户端渲染） |
| > 生活类比 | analogy-callout |
| > 注意 | warning-callout |
| > 记忆口诀 | tip-callout |

## 避坑指南

1. 空目录防御：无 .md 文件时友好提示并退出
2. 编码问题：读写文件一律 utf-8
3. Mermaid 渲染时机：只在客户端渲染，build.js 不尝试 Node 端渲染
4. 模板路径：build.js 使用 __dirname 相对路径定位 page.html
5. 基建文件排除：自动排除 AGENTS.md、PLANS.md、README.md、CHANGELOG.md

## 上游联动

输入文件由 #subtitle-to-tutorial 技能生成。

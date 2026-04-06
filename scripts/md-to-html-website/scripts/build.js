/**
 * build.js — MD 教程转 HTML 静态网页编译器 v2
 *
 * 用法：
 *   node build.js <输入目录> [输出目录]
 *
 * 核心修复 v2：
 *   - 自动将 4 空格缩进的 fenced code block 转为顶格（修复代码解析失败）
 *   - details 内的代码块同样处理
 *   - fill-blank 中的 HTML 标签转义保护
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// ============================================
// 📁 路径与常量
// ============================================
const TEMPLATE_PATH = path.join(__dirname, '..', 'templates', 'page.html');

const EXCLUDED_FILES = new Set([
  'agents.md', 'plans.md', 'readme.md', 'changelog.md',
  'implementation_plan.md', 'task.md', 'walkthrough.md'
]);

// ============================================
// 🔧 预处理阶段
// ============================================

/**
 * 【关键修复】将 4 空格缩进的 fenced code block 转为顶格
 * 原 MD 中代码块写法：
 *     ```js {runnable}
 *     code...
 *     ```
 * 需要转为：
 * ```js {runnable}
 * code...
 * ```
 */
function dedentCodeBlocks(md) {
  // 匹配以 4 空格缩进的 fenced code block
  return md.replace(/^(    ```)(.*)\n([\s\S]*?)^(    ```)\s*$/gm, (match, openTicks, meta, body, closeTicks) => {
    // 去掉每行的 4 空格前缀
    const dedentedBody = body.split('\n').map(line => {
      if (line.startsWith('    ')) return line.slice(4);
      return line;
    }).join('\n');
    return '```' + meta.trim() + '\n' + dedentedBody + '```';
  });
}

/**
 * 更健壮的缩进代码块处理：逐行扫描
 */
function fixIndentedFencedBlocks(md) {
  const lines = md.split('\n');
  const result = [];
  let inIndentedFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 检测 4 空格缩进的 fence 开始
    if (!inIndentedFence && /^    ```/.test(line)) {
      inIndentedFence = true;
      result.push(line.slice(4)); // 去掉 4 空格
      continue;
    }

    // 检测 fence 结束
    if (inIndentedFence && /^    ```\s*$/.test(line)) {
      inIndentedFence = false;
      result.push('```');
      continue;
    }

    // fence 内部：去掉 4 空格缩进
    if (inIndentedFence) {
      result.push(line.startsWith('    ') ? line.slice(4) : line);
      continue;
    }

    result.push(line);
  }

  return result.join('\n');
}

/**
 * :::quiz {correct="X"} ... ::: → 测验卡片 HTML
 */
function preprocessQuiz(md) {
  const quizRegex = /:::quiz\s*\{correct="([A-Z])"\}\s*\n([\s\S]*?):::/g;
  return md.replace(quizRegex, (_, correct, body) => {
    const lines = body.trim().split('\n');
    let questionHtml = '';
    let optionsHtml = '';
    let explanationHtml = '';
    let inExplanation = false;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith('> **解析**：') || trimmed.startsWith('> **解析**: ')) {
        inExplanation = true;
        explanationHtml = trimmed.replace(/^>\s*\*\*解析\*\*[：:]\s*/, '');
        continue;
      }
      if (inExplanation) {
        explanationHtml += ' ' + trimmed.replace(/^>\s*/, '');
        continue;
      }

      const optMatch = trimmed.match(/^-\s+([A-Z])\)\s+(.*)/);
      if (optMatch) {
        const [, letter, text] = optMatch;
        optionsHtml += `<div class="quiz-option" data-value="${letter}"><span class="option-indicator">${letter}</span> ${text}</div>\n`;
        continue;
      }

      if (trimmed) {
        questionHtml += trimmed.replace(/^\*\*\d+\.\s*/, '').replace(/\*\*$/, '').replace(/\*\*/g, '') + ' ';
      }
    }

    return `<div class="quiz-card" data-correct="${correct}">
  <div class="quiz-badge">❓ 理解检测</div>
  <div class="quiz-question">${questionHtml.trim()}</div>
  ${optionsHtml}
  <div class="quiz-explanation">${explanationHtml}</div>
</div>`;
  });
}

/**
 * :::fill-blank ... ::: → 刮刮卡（转义 HTML 标签防止浏览器渲染）
 */
function preprocessFillBlank(md) {
  const fbRegex = /:::fill-blank\s*\n([\s\S]*?):::/g;
  return md.replace(fbRegex, (_, body) => {
    const processed = body
      // 先转义 HTML 标签
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // 再处理答案刮刮卡
      .replace(/___([^_]+)___/g, '<span class="blank-slot">$1</span>')
      .trim();
    return `<div class="fill-blank-card">${processed}</div>`;
  });
}

/**
 * :::code-comparison ... ::: 或 :::compare ... ::: → 左右双栏对比渲染 
 */
function preprocessCodeComparison(md) {
  const ccRegex = /:::(code-comparison|compare)\s*\n([\s\S]*?):::/g;
  return md.replace(ccRegex, (_, type, body) => {
    return `<div class="code-comparison">\n\n${body.trim()}\n\n</div>`;
  });
}

/**
 * :::recall ... ::: → 记忆闪回锚点（折叠面板）
 */
function preprocessRecall(md) {
  const rx = /:::recall\s*\n([\s\S]*?):::/g;
  return md.replace(rx, (_, body) => {
    return `<details class="callout-recall"><summary>💡 记忆闪回 / Recall</summary><div class="details-content">\n\n${body.trim()}\n\n</div></details>`;
  });
}

/**
 * :::tracer ... ::: → 动态步进执行沙盒
 */
function preprocessTracer(md) {
  const rx = /:::tracer\s*\n([\s\S]*?):::/g;
  return md.replace(rx, (_, body) => {
    const codeMatch = body.match(/```(js|javascript|html|css).*?\n([\s\S]*?)```/i);
    const jsonMatch = body.match(/```json\s*\n([\s\S]*?)```/i);
    
    let lang = codeMatch ? codeMatch[1].toLowerCase() : 'js';
    if(lang === 'javascript') lang = 'js';
    
    let codeStr = codeMatch ? codeMatch[2] : '';   
    if(codeStr.endsWith('\n')) codeStr = codeStr.slice(0, -1);
    let jsonStr = jsonMatch ? jsonMatch[1].trim() : '[]';
    
    const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    
    return `<div class="interactive-tracer" data-trace="${encodeURIComponent(jsonStr)}">
<div class="tracer-header">
  <span class="tracer-title">🔬 内存执行追踪 (Interactive Tracer)</span>
  <div class="tracer-controls">
    <button class="tr-btn tr-prev" disabled>◀ 撤回</button>
    <span class="tr-step-info">0 / 0</span>
    <button class="tr-btn tr-next">▶ 步进</button>
    <button class="tr-btn tr-reset">↺ 重置</button>
  </div>
</div>
<div class="tracer-body">
  <div class="tracer-code-pane relative">
    <div class="tr-highlight-bar" style="display:none;"></div>
    <pre class="tr-pre"><code class="language-${lang}">${escapeHtml(codeStr)}</code></pre>
  </div>
  <div class="tracer-inspect-pane">
    <div class="tr-panel tr-memory-panel">
      <div class="tr-panel-title">🧠 快照视图 (Snapshot)</div>
      <div class="tr-memory-content">
         <div class="tr-empty" style="color:var(--text-muted);font-size:0.85em;">等待执行...</div>
      </div>
    </div>
    <div class="tr-panel tr-note-panel">
      <div class="tr-panel-title">💡 讲师解析 (Jonas's Note)</div>
      <div class="tr-note-content">点击步进按钮开始模拟执行。</div>
    </div>
  </div>
</div>
</div>`;
  });
}

/**
 * :::xxxx ... ::: → 高阶定制语法块
 */
function preprocessCallouts(md) {
  const types = ['history', 'mental', 'sandboxing', 'pro-tip', 'pitfall', 'mission', 'loot', 'bridge'];
  let newMd = md;
  // \n\n 是为了让 marked 引擎继续把内部的内容作为 markdown 解析
  for (const type of types) {
    const rx = new RegExp(`^:::${type}\\s*\\n([\\s\\S]*?)\\n:::$`, 'gm');
    newMd = newMd.replace(rx, (match, content) => {
      return `<div class="elite-callout callout-${type}">\n\n${content}\n\n</div>`;
    });
  }
  return newMd;
}

// ============================================
// 🎯 配置 Marked 渲染器
// ============================================

const renderer = new marked.Renderer();

renderer.code = function ({ text, lang }) {
  if (lang === 'mermaid') {
    return `<pre class="mermaid">${text}</pre>`;
  }

  let isRunnable = false;
  let title = '';
  let cleanLang = lang || '';

  if (cleanLang.includes('{runnable}')) {
    isRunnable = true;
    cleanLang = cleanLang.replace(/\s*\{runnable\}\s*/g, '');
  }
  const titleMatch = cleanLang.match(/\{title="([^"]+)"\}/);
  if (titleMatch) {
    title = titleMatch[1];
    cleanLang = cleanLang.replace(/\s*\{title="[^"]+"\}\s*/g, '');
  }
  cleanLang = cleanLang.trim();

  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const langClass = cleanLang ? `language-${cleanLang}` : '';
  const codeBlock = `<pre><code class="${langClass}">${escaped}</code></pre>`;

  if (isRunnable || title) {
    const headerTitle = title || `${cleanLang || 'code'}`;
    const isJS = ['js', 'javascript'].includes(cleanLang);
    const isHtmlCss = ['html', 'css', 'style'].includes(cleanLang);

    // 能真正运行/预览的沙盒才走新结构
    if (isRunnable && (isJS || isHtmlCss)) {
      const runBtnHtml = isJS ? '<button class="run-btn">▶ 运行</button>' : '';
      const xrayBtnHtml = isHtmlCss ? '<button class="xray-btn" title="显示隐藏的盒架结构">👁️ 透视</button>' : '';

      return `<div class="runnable-sandbox" data-lang="${cleanLang}">
  <div class="sandbox-header">
    <span class="sandbox-title">${headerTitle}</span>
    <div class="sandbox-actions">
      <button class="sandbox-copy-btn">复制</button>
      ${xrayBtnHtml}
      ${runBtnHtml}
    </div>
  </div>
  <div class="playground-layout">
    <div class="editor-pane">
      <textarea class="code-editor" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off">${escaped}</textarea>
      <!-- 保留原来的 pre code 用于高亮底部垫片 -->
      <pre class="code-display" aria-hidden="true"><code class="${langClass}">${escaped}</code></pre>
    </div>
    ${isJS ? '<div class="console-output"></div>' : ''}
    ${isHtmlCss ? '<div class="preview-pane"><div class="preview-header">👁️ 预览视窗 <span>(实时更新)</span></div><iframe class="live-iframe" sandbox="allow-scripts allow-modals allow-same-origin"></iframe></div>' : ''}
  </div>
</div>`;
    }

    // 普通带标题的代码块
    return `<div class="runnable-sandbox">
  <div class="sandbox-header">
    <span class="sandbox-title">${headerTitle}</span>
    <div class="sandbox-actions">
      <button class="sandbox-copy-btn">复制</button>
    </div>
  </div>
  ${codeBlock}
</div>`;
  }

  return `<div class="code-wrapper">
  <button class="copy-btn">复制</button>
  ${codeBlock}
</div>`;
};

renderer.blockquote = function ({ text }) {
  let className = '';
  if (text.includes('🧩') && text.includes('生活类比')) className = 'analogy-callout';
  else if (text.includes('⚠️') && text.includes('注意')) className = 'warning-callout';
  else if (text.includes('💡') && text.includes('记忆口诀')) className = 'tip-callout';
  else if (text.includes('💼') && text.includes('业务场景')) className = 'scenario-callout';
  return `<blockquote class="${className}">${text}</blockquote>`;
};

marked.setOptions({ renderer, gfm: true, breaks: false });

// ============================================
// 🏗️ 核心构建
// ============================================

function buildFile(mdPath, outputDir, template) {
  let mdContent = fs.readFileSync(mdPath, 'utf-8');
  const fileName = path.basename(mdPath, '.md');

  // 阶段 0（关键！）：修复缩进代码块
  mdContent = fixIndentedFencedBlocks(mdContent);

  // 阶段 1：预处理自定义语法
  mdContent = preprocessQuiz(mdContent);
  mdContent = preprocessFillBlank(mdContent);
  mdContent = preprocessCodeComparison(mdContent);
  mdContent = preprocessRecall(mdContent);
  mdContent = preprocessTracer(mdContent);
  mdContent = preprocessCallouts(mdContent);

  // 阶段 2：Marked 解析
  const htmlContent = marked.parse(mdContent);

  // 阶段 3：提取 H1 作为页面标题
  const titleMatch = mdContent.match(/^#\s+(.+)/m);
  const pageTitle = titleMatch ? titleMatch[1].replace(/[#*`]/g, '') : fileName;

  // 阶段 4：注入模板
  const finalHtml = template
    .replace('{{TITLE}}', pageTitle)
    .replace('{{CONTENT}}', htmlContent);

  // 阶段 5：输出
  const outputPath = path.join(outputDir, `${fileName}.html`);
  fs.writeFileSync(outputPath, finalHtml, 'utf-8');
  return outputPath;
}

// 递归获取目录下所有符合条件的文件，返回相对路径数组
function getFilesRecursively(dir, basePath = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (EXCLUDED_FILES.has(file.toLowerCase())) continue;
    
    const filePath = path.join(dir, file);
    const relPath = path.join(basePath, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath, relPath));
    } else if (file.endsWith('.md')) {
      results.push(relPath);
    }
  }
  return results;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('用法: node build.js <输入目录> [输出目录]');
    process.exit(1);
  }

  const inputDir = path.resolve(args[0]);
  const outputDir = args[1] ? path.resolve(args[1]) : path.join(inputDir, '..', 'html');

  if (!fs.existsSync(inputDir)) {
    console.error(`❌ 输入目录不存在: ${inputDir}`);
    process.exit(1);
  }
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`❌ 模板文件不存在: ${TEMPLATE_PATH}`);
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  
  // 递归获取所有 md 文件的相对路径
  const mdFilesList = getFilesRecursively(inputDir);

  if (mdFilesList.length === 0) {
    console.warn('⚠️  未找到可编译的 .md 教程文件。');
    process.exit(0);
  }

  console.log(`📂 输入: ${inputDir}`);
  console.log(`📦 输出: ${outputDir}`);
  console.log(`📄 共 ${mdFilesList.length} 个文件陆续编译中\n`);

  let ok = 0;
  for (const relPath of mdFilesList) {
    try {
      const fullInputPath = path.join(inputDir, relPath);
      // 保持嵌套的目录结构
      const targetDir = path.dirname(path.join(outputDir, relPath));
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      const out = buildFile(fullInputPath, targetDir, template);
      // 为了控制台可读，显示相对路径
      const outRelPath = path.relative(outputDir, out);
      console.log(`  ✅ ${relPath} → ${outRelPath}`);
      ok++;
    } catch (err) {
      console.error(`  ❌ ${relPath}: ${err.message}`);
    }
  }
  console.log(`\n🎉 完成 ${ok}/${mdFilesList.length} 个文件转换！`);
}

main();

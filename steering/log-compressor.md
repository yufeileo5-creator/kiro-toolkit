---
inclusion: manual
---

# 日志浓缩器 (Log Compressor)

> 迁移自 `skills/_on-demand/log-compressor/SKILL.md`。通过 `#log-compressor` 手动引用。

## 触发条件
- 构建/测试/安装命令输出超过一屏
- 深层级联的 React 报错树或 node_modules 内部堆栈
- 大段混杂 Info 级别日志的 Error Report

## 压缩铁律

### 1. 拒绝直读终端
巨量输出命令必须重定向：`command > /tmp/error.log 2>&1`，然后用文本检索工具提取。

### 2. 手术刀提纯
- 只过滤 ERR! / FAIL / Exception / SyntaxError / TypeError 及上下文
- 无视 node_modules/ 和 node:internal/ 底层路径
- 只提取项目源码（src/、server/）的最顶层调用堆栈

### 3. 构建微型简报
不输出原生长日志，先总结结构化简报：
> "发现 24 处错误。已剔除内部链路。根因收敛于 src/components/List.tsx:L42。"

## 避坑
- 不重定向会导致日志被截断，丢失真正的 Root Cause
- 压缩时严格区分 Error 和 Warning，只锁死 Error

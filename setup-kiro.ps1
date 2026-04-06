# Kiro 新项目一键初始化脚本
# 用法：在新项目根目录运行 powershell -File ~/.kiro/setup-kiro.ps1

$ErrorActionPreference = "Stop"

Write-Host "🚀 Kiro 项目初始化..." -ForegroundColor Cyan

# 1. 创建 .kiro/hooks 目录并复制 hooks 模板
$hooksSource = "$env:USERPROFILE\.kiro\hooks-template"
$hooksDest = ".\.kiro\hooks"

if (Test-Path $hooksSource) {
    New-Item -ItemType Directory -Path $hooksDest -Force | Out-Null
    Copy-Item "$hooksSource\*.kiro.hook" $hooksDest -Force
    $count = (Get-ChildItem "$hooksDest\*.kiro.hook").Count
    Write-Host "  ✅ Hooks 已部署 ($count 个)" -ForegroundColor Green
} else {
    Write-Host "  ⚠️ 未找到 hooks 模板 ($hooksSource)" -ForegroundColor Yellow
}

# 2. 验证全局 steering 文件
$steeringDir = "$env:USERPROFILE\.kiro\steering"
if (Test-Path $steeringDir) {
    $steeringCount = (Get-ChildItem "$steeringDir\*.md").Count
    Write-Host "  ✅ 全局 Steering 已就绪 ($steeringCount 个文件)" -ForegroundColor Green
} else {
    Write-Host "  ❌ 全局 Steering 目录不存在！" -ForegroundColor Red
}

# 3. 提示创建项目级 steering
$projectSteering = ".\.kiro\steering"
if (-not (Test-Path "$projectSteering\product.md")) {
    New-Item -ItemType Directory -Path $projectSteering -Force | Out-Null
    Write-Host "  📝 请在 .kiro/steering/ 下创建项目特定文件：" -ForegroundColor Yellow
    Write-Host "     - product.md  (项目产品描述)" -ForegroundColor Gray
    Write-Host "     - tech.md     (技术栈)" -ForegroundColor Gray
    Write-Host "     - structure.md (目录结构)" -ForegroundColor Gray
} else {
    Write-Host "  ✅ 项目级 Steering 已存在" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 初始化完成！" -ForegroundColor Cyan
Write-Host "   全局规则自动生效（agent-rules + pua-engine）" -ForegroundColor Gray
Write-Host "   手动引用技能：在聊天中输入 #名称（如 #plan-workflow）" -ForegroundColor Gray

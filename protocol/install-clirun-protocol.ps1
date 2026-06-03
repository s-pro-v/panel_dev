# Jednorazowa rejestracja protokołu clitoolkit:// (HKCU — bez uprawnień administratora).
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Handler = Join-Path $Root "clirun-handler.ps1"

if (-not (Test-Path -LiteralPath $Handler)) {
    Write-Error "Brak pliku: $Handler"
    exit 1
}

$proto = "clitoolkit"
$key = "HKCU:\Software\Classes\$proto"

New-Item -Path $key -Force | Out-Null
Set-ItemProperty -Path $key -Name "(Default)" -Value "URL:CLI Toolkit Run"
New-ItemProperty -Path $key -Name "URL Protocol" -Value "" -PropertyType String -Force | Out-Null

$iconKey = Join-Path $key "DefaultIcon"
New-Item -Path $iconKey -Force | Out-Null
Set-ItemProperty -Path $iconKey -Name "(Default)" -Value "powershell.exe,0"

$cmdKey = Join-Path $key "shell\open\command"
New-Item -Path $cmdKey -Force | Out-Null
$openCmd = "powershell.exe -NoProfile -ExecutionPolicy Bypass -File `"$Handler`" `"%1`""
Set-ItemProperty -Path $cmdKey -Name "(Default)" -Value $openCmd

Write-Host ""
Write-Host "Zarejestrowano protokol: clitoolkit://" -ForegroundColor Green
Write-Host "Odswiez strone CLI Toolkit i kliknij polecenie - otworzy sie terminal." -ForegroundColor Cyan
Write-Host ""

# Obsluga clitoolkit://run/?cmd=BASE64&shell=ps|cmd&admin=1
param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$RawArgs
)

$ErrorActionPreference = "Stop"

function Get-QueryValue {
    param([string]$Query, [string]$Name)
    if ([string]::IsNullOrWhiteSpace($Query)) { return $null }
    $q = $Query.TrimStart("?")
    foreach ($part in $q.Split("&")) {
        $kv = $part.Split("=", 2)
        if ($kv.Length -ge 1 -and $kv[0] -eq $Name) {
            $val = if ($kv.Length -gt 1) { $kv[1] } else { "" }
            return [Uri]::UnescapeDataString($val)
        }
    }
    return $null
}

$uriText = ($RawArgs -join " ").Trim()
if ([string]::IsNullOrWhiteSpace($uriText)) { exit 1 }

try {
    $uri = [Uri]$uriText
}
catch {
    exit 1
}

$b64 = Get-QueryValue -Query $uri.Query -Name "cmd"
$shell = Get-QueryValue -Query $uri.Query -Name "shell"
$adminFlag = Get-QueryValue -Query $uri.Query -Name "admin"
if ([string]::IsNullOrWhiteSpace($b64)) { exit 1 }

try {
    $cmd = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($b64))
}
catch {
    exit 1
}

if ([string]::IsNullOrWhiteSpace($cmd)) { exit 1 }
if ($shell -ne "cmd") { $shell = "ps" }
$asAdmin = ($adminFlag -eq "1" -or $adminFlag -eq "true")

$wt = (Get-Command wt -ErrorAction SilentlyContinue).Source

if ($asAdmin) {
    if ($shell -eq "cmd") {
        Start-Process -FilePath "cmd.exe" -Verb RunAs -ArgumentList @("/k", $cmd)
    }
    else {
        Start-Process -FilePath "powershell.exe" -Verb RunAs -ArgumentList @(
            "-NoExit", "-NoProfile", "-Command", $cmd
        )
    }
    exit 0
}

if ($shell -eq "cmd") {
    if ($wt) {
        Start-Process -FilePath $wt -ArgumentList @("new-tab", "--", "cmd.exe", "/k", $cmd)
    }
    else {
        Start-Process -FilePath "cmd.exe" -ArgumentList @("/k", $cmd)
    }
}
else {
    if ($wt) {
        Start-Process -FilePath $wt -ArgumentList @(
            "new-tab", "--", "powershell.exe", "-NoExit", "-NoProfile", "-Command", $cmd
        )
    }
    else {
        Start-Process -FilePath "powershell.exe" -ArgumentList @(
            "-NoExit", "-NoProfile", "-Command", $cmd
        )
    }
}

exit 0

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$vendor = Join-Path $root 'vendor'
New-Item -ItemType Directory -Path $vendor -Force | Out-Null
$log = Join-Path $vendor 'SOURCE_REVISIONS.tsv'
"name`turl`tcommit`tlicense" | Set-Content -Path $log -Encoding utf8
function Download([string]$name,[string]$url) {
  $dir = Join-Path $vendor $name
  if (Test-Path (Join-Path $dir '.git')) { Write-Host "Preserving existing $name checkout" }
  elseif (Test-Path $dir) { throw "Path exists, refusing overwrite: $dir" }
  else { git clone --depth 1 $url $dir; if ($LASTEXITCODE -ne 0) { throw "Clone failed: $name" } }
  $sha = (git -C $dir rev-parse HEAD).Trim()
  $license = Get-ChildItem -Path $dir -File | Where-Object { $_.Name -like 'LICENSE*' } | Select-Object -First 1
  $licenseName = if ($license) { $license.Name } else { 'NOT_FOUND' }
  "$name`t$url`t$sha`t$licenseName" | Add-Content -Path $log -Encoding utf8
}
Download 'remotion-ui' 'https://github.com/riaz37/remotion-ui.git'
Download 'remotion-scenes' 'https://github.com/lifeprompt-team/remotion-scenes.git'
Download 'onda' 'https://github.com/degueba/onda.git'
Download 'remotion-bits' 'https://github.com/av/remotion-bits.git'
Download 'rendercomp-free' 'https://github.com/RenderComp/free-remotion-templates.git'
Write-Host "Source revisions saved at $log; review all licences before integration."

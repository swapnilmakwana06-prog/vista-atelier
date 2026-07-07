$outDir = Join-Path $PSScriptRoot "..\public\hero"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$outFile = Join-Path $outDir "hero.mp4"

$urls = @(
  "https://videos.pexels.com/video-files/7692671/7692671-hd_1920_1080_30fps.mp4",
  "https://videos.pexels.com/video-files/29681897/29681897-hd_1920_1080_30fps.mp4",
  "https://videos.pexels.com/video-files/36030658/36030658-hd_1920_1080_25fps.mp4"
)

foreach ($url in $urls) {
  try {
    Write-Host "Trying $url"
    Invoke-WebRequest -Uri $url -OutFile $outFile -UserAgent "Mozilla/5.0" -TimeoutSec 120
    if (Test-Path $outFile -PathType Leaf) {
      $size = (Get-Item $outFile).Length
      if ($size -gt 100000) {
        Write-Host "Saved hero.mp4 ($size bytes)"
        exit 0
      }
    }
  } catch {
    Write-Host "Failed: $_"
  }
}

exit 1
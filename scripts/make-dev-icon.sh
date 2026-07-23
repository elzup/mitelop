#!/usr/bin/env bash
set -euo pipefail
# 本番アイコン (src-tauri/icons/icon.png) に DEV バッジを付けた dev 用アイコンを生成する。
# 生成物: src-tauri/icon-dev.png (バッジ済みソース) と src-tauri/icons-dev/* (各サイズ)
# 依存: ImageMagick (magick), @tauri-apps/cli (pnpm tauri)
PARENT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PARENT"

BASE="src-tauri/icons/icon.png"
OUT_SRC="src-tauri/icon-dev.png"

magick "$BASE" -resize 1024x1024 \
  \( -size 1024x250 xc:'#ff2d78' -alpha set -channel A -evaluate multiply 0.92 +channel \) \
  -gravity south -geometry +0+0 -composite \
  -gravity south -font Helvetica-Bold -pointsize 150 -fill white -stroke '#b3005a' -strokewidth 2 -annotate +0+40 'DEV' \
  "$OUT_SRC"

pnpm tauri icon "$OUT_SRC" -o src-tauri/icons-dev
echo "dev icon generated: $OUT_SRC and src-tauri/icons-dev/"

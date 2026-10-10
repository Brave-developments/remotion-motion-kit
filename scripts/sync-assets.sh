#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/vendor"
LOG="$ROOT/vendor/SOURCE_REVISIONS.tsv"
printf 'name\turl\tcommit\tlicense\n' > "$LOG"
download() {
  local name="$1" url="$2" dir="$ROOT/vendor/$1"
  if [[ -d "$dir/.git" ]]; then echo "Preserving $name checkout"
  elif [[ -e "$dir" ]]; then echo "Path exists, refusing overwrite: $dir" >&2; exit 1
  else git clone --depth 1 "$url" "$dir"; fi
  local rev license
  rev="$(git -C "$dir" rev-parse HEAD)"
  license="$(find "$dir" -maxdepth 1 -type f -iname 'LICENSE*' -print -quit)"
  if [[ -z "$license" ]]; then license="NOT_FOUND"; else license="${license##*/}"; fi
  printf '%s\t%s\t%s\t%s\n' "$name" "$url" "$rev" "$license" >> "$LOG"
}
download remotion-ui https://github.com/riaz37/remotion-ui.git
download remotion-scenes https://github.com/lifeprompt-team/remotion-scenes.git
download onda https://github.com/degueba/onda.git
download remotion-bits https://github.com/av/remotion-bits.git
download rendercomp-free https://github.com/RenderComp/free-remotion-templates.git
echo "Repositories downloaded, source versions saved in $LOG"
echo "Review rights, dependencies and compatibility before copying to FlashCut."

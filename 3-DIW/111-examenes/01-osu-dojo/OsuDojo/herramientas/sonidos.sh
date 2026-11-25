#!/usr/bin/env bash
# Builds the timer sounds in media/ (synthesised, our own work):
# - gong.mp3/.ogg: a gong made of decaying partials
# - pitido.mp3/.ogg: short warning beep for the last 10 seconds
# MP3 for every browser, Opus/OGG because it is smaller.
# Usage: herramientas/sonidos.sh   (from the OsuDojo folder, needs ffmpeg)
set -euo pipefail
export LC_NUMERIC=C
cd "$(dirname "$0")/.."

GONG="0.45*sin(2*PI*110*t)*exp(-1.1*t)+0.3*sin(2*PI*221.3*t)*exp(-1.7*t)+0.2*sin(2*PI*332.9*t)*exp(-2.4*t)+0.12*sin(2*PI*527*t)*exp(-3.2*t)"
ffmpeg -nostdin -loglevel error -y -f lavfi -i "aevalsrc=$GONG:s=44100:d=3" -c:a libmp3lame -b:a 96k media/gong.mp3
ffmpeg -nostdin -loglevel error -y -i media/gong.mp3 -c:a libopus -b:a 48k media/gong.ogg
ffmpeg -nostdin -loglevel error -y -f lavfi -i "sine=frequency=880:duration=0.18" -af "volume=0.5,afade=t=out:st=0.12:d=0.06" -c:a libmp3lame -b:a 64k media/pitido.mp3
ffmpeg -nostdin -loglevel error -y -i media/pitido.mp3 -c:a libopus -b:a 32k media/pitido.ogg

ls -l media | awk 'NR > 1 && $9 != "index.php" { printf "%-12s %4d KB\n", $9, $5 / 1024 }'

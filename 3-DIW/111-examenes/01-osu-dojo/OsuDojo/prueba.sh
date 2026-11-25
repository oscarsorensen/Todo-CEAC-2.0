#!/usr/bin/env bash
# Checks the whole site: pages, links, images, illustrations, headings, SEO
# basics, compiled CSS, an automatic WCAG 2 AA audit (pa11y-ci) and
# interaction tests in Chrome (herramientas/interaccion.cjs).
# Usage: ./prueba.sh   (starts php -S on 127.0.0.1:8770 if it isn't running)
set -uo pipefail
cd "$(dirname "$0")"

URL="http://127.0.0.1:8770"
bien=0
mal=0
ok() { bien=$((bien + 1)); printf "  ok    %s\n" "$1"; }
falla() { mal=$((mal + 1)); printf "  FALLA %s\n" "$1"; }
comprobar() { if eval "$2"; then ok "$1"; else falla "$1"; fi; }

if ! curl -s -o /dev/null "$URL/index.html"; then
  php -S 127.0.0.1:8770 &>/dev/null &
  servidor=$!
  trap 'kill $servidor' EXIT
  sleep 1
fi

PAGINAS=(index horario camino senseis galeria temporizador inscripcion guia-estilo accesibilidad creditos 404)

echo "Pages"
for p in "${PAGINAS[@]}"; do
  comprobar "$p.html answers 200" '[ "$(curl -s -o /dev/null -w "%{http_code}" "$URL/$p.html")" = 200 ]'
done

echo "Structure and SEO (per page: lang, title, description, one h1)"
for p in "${PAGINAS[@]}"; do
  f="$p.html"
  comprobar "$f has lang, <title>, description and exactly one <h1>" \
    'grep -q "<html lang=\"es\">" "$f" && grep -q "<title>" "$f" && grep -q "name=\"description\"" "$f" && [ "$(grep -o "<h1" "$f" | wc -l)" -eq 1 ]'
done

echo "Images, illustrations and sound"
sin_alt="$(grep -ho '<img[^>]*>' ./*.html | grep -cv 'alt=' || true)"
comprobar "every <img> has alt (missing: $sin_alt)" '[ "$sin_alt" -eq 0 ]'
sin_medidas="$(grep -ho '<img[^>]*>' ./*.html | grep -v 'width=' -c || true)"
comprobar "every <img> has width/height, no layout jump (missing: $sin_medidas)" '[ "$sin_medidas" -eq 0 ]'
animados="$(grep -o "data-animado" ./*.html | wc -l | tr -d " ")"
pausas="$(grep -o "data-pausa " ./*.html | wc -l | tr -d " ")"
comprobar "every animated block has its pause button ($pausas of $animados)" '[ "$animados" -gt 0 ] && [ "$animados" -eq "$pausas" ]'
sin_nombre="$(grep -ho '<svg class="arte-svg[^>]*>' ./*.html | grep -v 'aria-label=' | grep -cv 'aria-hidden="true"' || true)"
comprobar "every illustration has a description or is hidden as decoration (missing: $sin_nombre)" '[ "$sin_nombre" -eq 0 ]'
comprobar "social preview image exists (og:image, SVG is not shown by social networks)" '[ -s img/social.jpg ]'

echo "Links"
rotos=0
for ruta in $(grep -ho '\(href\|src\|srcset\)="[^"#:]*' ./*.html | sed 's/.*="//' | tr ',' '\n' | awk '{print $1}' | sort -u); do
  [ -z "$ruta" ] && continue
  codigo="$(curl -s -o /dev/null -w "%{http_code}" "$URL/$ruta")"
  [ "$codigo" = 200 ] || { echo "        broken: $ruta ($codigo)"; rotos=$((rotos + 1)); }
done
comprobar "no broken local links, images or media ($rotos broken)" '[ "$rotos" -eq 0 ]'

echo "Styles"
comprobar "css/estilos.css is newer than every scss file" \
  '[ -z "$(find scss -name "*.scss" -newer css/estilos.css)" ]'
comprobar "no colour is hard-coded outside the tokens" \
  '! grep -n "#[0-9a-fA-F]\{6\}" scss/_layout.scss scss/_components.scss'

echo "Accessibility (pa11y-ci, WCAG2AA, HTML_CodeSniffer + axe)"
if resultado="$(npx --no-install pa11y-ci 2>&1)"; then
  ok "$(echo "$resultado" | grep -o '[0-9]*/[0-9]* URLs passed')"
else
  echo "$resultado" | grep -E 'Errors in|•' | head -20
  falla "pa11y-ci found errors"
fi

echo "Interaction in a real browser (Puppeteer)"
interaccion="$(node herramientas/interaccion.cjs 2>&1)"
echo "$interaccion"
bien=$((bien + $(echo "$interaccion" | grep -c '^  ok')))
mal=$((mal + $(echo "$interaccion" | grep -c '^  FALLA')))

echo "Weight (information)"
printf "  gallery page with its 8 animated drawings: %s KB HTML (%s KB gzip) · CSS: %s KB · sounds: %s KB\n" \
  "$(( $(wc -c < galeria.html) / 1024 ))" "$(( $(gzip -c galeria.html | wc -c) / 1024 ))" \
  "$(( $(wc -c < css/estilos.css) / 1024 ))" "$(( $(cat media/*.mp3 media/*.ogg | wc -c) / 1024 ))"

echo
echo "$bien passed, $mal failed"
[ "$mal" -eq 0 ]

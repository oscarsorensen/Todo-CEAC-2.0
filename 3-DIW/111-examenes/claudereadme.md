# Claude handoff: DIW exam prep (read this first)

Context file for future Claude sessions. Written 2026-11-25. The Servidor equivalent is `2-DWE-S/111-examenes/claudereadme.md`; this folder mirrors it for Diseño de Interfaces Web (DIW), with **2 projects** (the second, Tornillo Oxidado, added 2026-11-26 when Oscar said another project is expected).

## 1. Who / what
- Student: Oscar Sorensen, DAW2 at CEAC, module "Diseño de Interfaces Web" (DIW).
- Exam: same kind as Servidor (supervision recording → documentacion.jocarsa.com report → formacion upload → 1–3 min silent video → 4–6 paragraph text with the extended rubric, no AI → red.jocarsa.com), but fewer projects. Whether each project gets its own article is not confirmed; date, duration and rubric not confirmed either (open questions in `1-guia-examen.md`).

## 2. Hard rules (same as Servidor)
- Oscar writes the exam text himself, without AI. Only keyword outlines; never finished paragraphs. Feedback on his own text at most.
- Code finished before the exam. New from scratch (no class code).
- Docs in English; outline keywords only, one page.
- No README or AI-assistance notes inside the project.
- Every folder has an `index.php` loading `browser.php` (Apache serves `index.php` before `index.html`, so the project folder shows a listing: open `index.html` from it, same as Servidor).
- Never commit (Oscar commits). Both project folders (`01-osu-dojo/`, `02-tornillo-oxidado/`) are in the repo `.gitignore` since 2026-11-26 (too big for git; the dojo was untracked with `git rm -r --cached`). The outlines, guides and these notes are still tracked.
- Oscar's chat preferences: concise, no bold, honest uncertainty.

## 3. Layout
```
111-examenes/
  index.php
  1-guia-examen.md        exam format, procedure, rules, timing, rubric, DIW RAs, video template, checklist
  claudereadme.md         this file
  01-osu-dojo.md          one-page outline (goes to the exam)
  guides/01-osu-dojo-guide.md   study guide (not for the exam)
  01-osu-dojo/OsuDojo/    project 1
  02-tornillo-oxidado.md  one-page outline for project 2
  guides/02-tornillo-oxidado-guide.md
  02-tornillo-oxidado/TornilloOxidado/   project 2
```

## 4. Project: OSU! Dojo
Kyokushin karate dojo website (fictitious, Valencia). Oscar's brief: funny, "in your face", Cobra Kai vibes. He approved the slogan "Strike first, strike hard, no mercy" and the kanku mark (own SVG drawing), both credited in `creditos.html`. No snake, no "Cobra Kai" name.

Static site: HTML + Sass + vanilla JS modules, no backend, no login. UI in Spanish.
- Pages: `index` (animated SVG hero + pause), `horario` (filterable table, URL params, "Hoy"), `camino` (belt ladder disclosures, dojo rules as text, glossary), `senseis` (SVG avatars, fictitious people), `galeria` (8 animated drawings, `<dialog>` lightbox showing a clone of the SVG, arrows, focus return), `temporizador` (rounds/rests, gong, beep, shortcuts, aria-live only on state changes), `inscripcion` (validated form with error summary + quiz linking to filtered timetable), `guia-estilo` (live contrast from CSS vars), `accesibilidad`, `creditos`, `404`.
- `scss/`: `_tokens` (maps + `color()`, `rem()`, `espacio()`, `tam()`), `_mixins`, `_base` (fonts, custom props, settings classes), `_layout`, `_components`, `_pages`. Build: `npm run css`.
- `js/`: `ajustes-inicio.js` (sync in head, applies saved settings), `comun.js` (menu, settings, pause button of every `[data-animado]` block), one module per page.
- ES/EN switch (Oscar asked for a simple JS toggle, SEO not needed): header button `#boton-idioma`, `js/idioma.js` swaps texts/alt/aria-label/placeholder/title/meta description using `js/traducciones.js` (key = Spanish text as in the HTML, spaces collapsed; `mismos` = same in both languages), remembered in localStorage `osu-idioma`. JS-written texts use `t("Spanish {x}", {x})` and re-render on the `idioma-cambiado` event. Elements rewritten by JS carry `data-dinamico` so the swapper skips them; `translate="no"` also skips. Any new Spanish text needs an entry, or the test "every Spanish text has an English translation" fails and lists it.
- Media (Oscar asked, 2026-11-25: no real photos, stylised animated images, nothing that talks): the Commons photos, hero video, promo and spoken rules audio were removed. Illustrations are inline SVG pictograms (fighters drawn with hip at 0,0, placed by an outer `<g transform>`; animated inner `<g>`s rotate around joints via `transform-origin`, because a CSS animation replaces the `transform` attribute of its own element). Styles/keyframes in `scss/_arte.scss`, colours from CSS vars. Every animated block has `data-animado` + a `[data-pausa]` button; `quieto` mixin stops all under reduced motion. `img/social.jpg` = og:image, made by `node herramientas/imagen-social.cjs` (server running). `media/` holds only gong + beep, built by `herramientas/sonidos.sh` (ffmpeg).
- Tests: `./prueba.sh` (starts `php -S 127.0.0.1:8770` if needed) → 46 checks: pages, SEO basics, illustrations described or hidden, pause buttons, social image, links, CSS freshness, pa11y-ci (`.pa11yci`, WCAG2AA, htmlcs + axe, uses the Mac's Chrome, needs-review items capped to warnings), `herramientas/interaccion.cjs` (15 Puppeteer tests incl. pause button, language switch, missing translations, 375 px header). Last run 2026-11-25: 46 passed, 0 failed.
- `node_modules/` (sass, pa11y-ci; installed with `PUPPETEER_SKIP_DOWNLOAD=1`) is gitignored by the repo root rule.
- The HTML (and the SVG drawings, from `arte.py`) was written with generator scripts in Claude's scratchpad; they are not part of the project and may be gone. Edit the HTML files directly now; header/footer changes must be repeated in all 11 pages.

## 4b. Project 2: Tornillo Oxidado
Fictitious instrumental metal band from Alboraia (the singer "left for Benidorm to do karaoke"). Hardware-store humour: members nicknamed Remache, Arandela, Taladro, Llave Inglesa. Slogan "Volumen al once. Vergüenza a cero.". Oscar picked this idea from 5 options (escape room, band, taco truck, arcade bar, pirate mini golf) and asked for good animations like the dojo.

Static site, same structure and conventions as the dojo (Spanish UI, Sass layers, `comun.js` menu/settings/pause, `data-animado` + `[data-pausa]`, `quieto` mixin, figures with hip at 0,0 and nested `<g>` for animation). ES/EN switch added 2026-11-26 at Oscar's request, same mechanism as the dojo (`js/idioma.js`, `js/traducciones.js`, localStorage `to-idioma`, `data-dinamico` on JS-written elements, dates in English via `fechaLarga` in `conciertos.js`). Song titles are translated; venue, people and album names stay the same (`mismos`). Port 8771, run with `php -S 127.0.0.1:8771 herramientas/servidor.php`: the router answers Range requests for `media/*.mp3|ogg`, without it the duration was Infinity and seeking failed.
- Pages: `index` (animated stage: 4 musicians, spotlights, speakers, crowd; countdown to next gig that freezes with the pause button), `musica` (own player: `<audio>` without controls, shortcuts K J L M N P, Web Audio analyser → SVG equaliser, spinning vinyl, Media Session, text description per song), `gira` (hand-drawn SVG map, HTML pin buttons, van on `offset-path`, table with the same data), `entradas` (96 seat buttons, roving tabindex, `?concierto=` from the map, form + error summary, printable ticket via `_imprimir.scss`), `tienda` (cart in localStorage `to-carrito`, `<dialog>` drawer + size guide), `banda`, `guia-estilo`, `accesibilidad`, `creditos`, `404`.
- Sass: `_tokens` ($colores rust/chrome/hazard yellow, $zonas seat prices), `_mixins` (`rasgado` loop-generated torn-edge clip-path, `peligro` hazard stripes, `metal` font), `_arte` (0.5 s beat), `_imprimir`.
- Data: `js/conciertos.js` holds the tour (hand-edited, the generator no longer writes it); the HTML table, pins and `<select>` repeat it: change both, plus the date entries in `traducciones.js`.
- Media: `herramientas/canciones.cjs` synthesises 5 songs (125 s total; song 5 «Clavo ardiendo», 108 bpm, groove from Oscar's `beat.opus` voice note, letters B C c H h A P X in `piezas`) → `sonidos.sh` (ffmpeg loudnorm, MP3 96k + Opus 64k). Fonts Metal Mania, Oswald 600, Archivo 400/700 (OFL, from Fontsource, in `fuentes/`). `img/social.jpg` from `imagen-social.cjs`.
- Tests: `./prueba.sh` → 54 checks incl. pa11y 10/10 and 20 Puppeteer tests (`herramientas/interaccion.cjs`). Last run 2026-11-26: 57 passed, 0 failed (incl. the language switch and "every Spanish text has an English translation").
- Generated with scratchpad scripts (`genera.py`, `arte.py`), not part of the project and may be gone: edit the HTML directly; header/footer changes go in all 10 pages.

## 5. Next session: start here
1. Walk Oscar through the project (he must understand and defend it): identity + style guide → Sass layers → one page's HTML → JS modules → media scripts → tests. What/Why/How, plain language, questions at the end. Don't write article text.
2. Measurements Oscar takes himself, then add them to the outline's "Gain" bullet and the guide's "Have ready" line:
   - Lighthouse (DevTools, mobile) on `index.html` and `horario.html`
   - Time to find "kids' class on Thursday": a PDF-style timetable vs the filter, 3 tries each, average
   - Weights: already printed by `prueba.sh`; also check the network tab on the gallery
3. Manual accessibility pass with him: keyboard only, VoiceOver, zoom 200 %, 375 px.
4. Rehearse the video with the shot list; one timed practice article.
5. Ask the open questions (1 project? date? rubric? documentacion tool with static sites?). Avoid uploading `node_modules/` to documentacion.jocarsa.com.

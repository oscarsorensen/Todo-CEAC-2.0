# Claude handoff: DIW exam prep (read this first)

Context file for future Claude sessions. Written 2026-11-25. The Servidor equivalent is `2-DWE-S/111-examenes/claudereadme.md`; this folder mirrors it for Diseño de Interfaces Web (DIW), with **1 project instead of 4**.

## 1. Who / what
- Student: Oscar Sorensen, DAW2 at CEAC, module "Diseño de Interfaces Web" (DIW).
- Exam: same kind as Servidor (supervision recording → documentacion.jocarsa.com report → formacion upload → 1–3 min silent video → 4–6 paragraph text with the extended rubric, no AI → red.jocarsa.com), but **one article about one project**. Date, duration and rubric not yet confirmed for DIW (open questions in `guia-examen.md`).

## 2. Hard rules (same as Servidor)
- Oscar writes the exam text himself, without AI. Only keyword outlines; never finished paragraphs. Feedback on his own text at most.
- Code finished before the exam. New from scratch (no class code).
- Docs in English; outline keywords only, one page.
- No README or AI-assistance notes inside the project.
- Every folder has an `index.php` loading `browser.php` (Apache serves `index.php` before `index.html`, so the project folder shows a listing: open `index.html` from it, same as Servidor).
- Never commit (Oscar commits). Note: `3-DIW/111-examenes/` is NOT in `.gitignore` (Servidor's is); ask Oscar before changing that.
- Oscar's chat preferences: concise, no bold, honest uncertainty.

## 3. Layout
```
111-examenes/
  index.php
  guia-examen.md          exam format, procedure, rules, timing, rubric, DIW RAs, video template, checklist
  claudereadme.md         this file
  01-osu-dojo.md          one-page outline (goes to the exam)
  guides/01-osu-dojo-guide.md   study guide (not for the exam)
  01-osu-dojo/OsuDojo/    the project
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

## 5. Next session: start here
1. Walk Oscar through the project (he must understand and defend it): identity + style guide → Sass layers → one page's HTML → JS modules → media scripts → tests. What/Why/How, plain language, questions at the end. Don't write article text.
2. Measurements Oscar takes himself, then add them to the outline's "Gain" bullet and the guide's "Have ready" line:
   - Lighthouse (DevTools, mobile) on `index.html` and `horario.html`
   - Time to find "kids' class on Thursday": a PDF-style timetable vs the filter, 3 tries each, average
   - Weights: already printed by `prueba.sh`; also check the network tab on the gallery
3. Manual accessibility pass with him: keyboard only, VoiceOver, zoom 200 %, 375 px.
4. Rehearse the video with the shot list; one timed practice article.
5. Ask the open questions (1 project? date? rubric? documentacion tool with static sites?). Avoid uploading `node_modules/` to documentacion.jocarsa.com.

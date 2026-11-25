# 1 · OSU! Dojo
Path: `3-DIW/111-examenes/01-osu-dojo/OsuDojo/`
Name explicitly: **RA1 RA2 RA3 RA4 RA5 RA6** · **C1 Architecture + C5 Infrastructure** (+C3 verification) · C6 C7
No login (static site) · run: `php -S 127.0.0.1:8770` → `index.html`

**Built (from scratch):** 11 pages (home, timetable, the path/belts, senseis, gallery, round timer, sign-up + quiz, style guide, accessibility, credits, 404) · Sass tokens/mixins/functions → `css/estilos.css` · 9 animated SVG illustrations (own work, CSS keyframes, pausable) · synthesised gong + beep MP3/OGG · social image JPEG · reading settings (text size, motion, contrast) · ES/EN switch (JS dictionary, remembered) · SEO (meta, OG, JSON-LD, sitemap) · `prueba.sh` 46 checks, pa11y 11/11

## 1 Introduction (C6 C7)
- Parent on phone, 22:00: "class for an 8-year-old on Thursday? beginners?"
- Small gym sites: blurry PDF timetable, huge photos on 4G, menu broken on mobile
- Low vision / keyboard users: can't use them at all
- Result: gives up → dojo loses members; dojo spends time answering the same WhatsApps
- Observed: [real gym sites I checked + what I saw]

## 2 What it is for (C6)
- Find your class and book a free first class in a minute, from any phone, for anyone
- Key 1: timetable filter (age, level, day) + "today" mark
- Key 2: sign-up form with clear errors + "¿Eres un flan?" quiz → filtered timetable
- Key 3: content for everyone: reading settings, pausable animations, keyboard, Spanish/English
- Use case: quiz → "Nivel flan" → timetable already filtered → book → confirmation
- Gain: 8 animated drawings = 5 KB gzip (photo version: ~53 KB per photo on a phone, 17 MB originals) · [my time: PDF vs filter] · [Lighthouse scores]
- Limits: form sends nothing (no backend), demo content, drawings ≠ the real dojo

## 3 Technical (C1 + C5)
- **Decision 1 · Sass design system (C1, RA1 RA2)**
  - `_tokens` (colour map, type scale 1.25, 4 px spacing) → `_mixins` (`desde()`, `foco`, `corte`) → `_components` → `_pages`
  - Tokens → CSS custom properties → JS reads them (style guide contrast, settings)
  - Alt: Bootstrap/Tailwind (fast, generic look, unused CSS) · plain CSS (repetition)
  - Trade-off: build step (`npm run css`), but one change → whole site; 19 KB CSS
- **Decision 2 · own animated SVG illustrations, no photos (C5, RA3 RA4)**
  - v1: Commons photos (AVIF/WebP/JPEG × 3 widths) + video + synthetic voice → replaced: generic look, BY-SA licences, weight
  - Inline SVG pictograms (lines + circles) · colours = CSS variables → high contrast recolours them
  - CSS keyframes rotate limb groups around the joint (`transform-origin`) · no JS, no GIF/video
  - Accessible: `role="img"` + `aria-label` (translated) · decorative = hidden · pause button per block (WCAG 2.2.2) · "less motion" stops all
  - Raster only where needed: og:image JPEG rendered in Chrome (`imagen-social.cjs`) · gong/beep ffmpeg → MP3 + Opus (`sonidos.sh`)
  - Alt: photos (real, but licences + weight) · GIF/video (heavy, no recolour) · Lottie (extra library)
  - Trade-off: stylised, not the real dojo; coordinates by hand
  - Runs: any static host; deps Node (Sass, Puppeteer), ffmpeg; missing: HTTPS host, form backend
- Verification (C3, RA5 RA6): `prueba.sh` 46 · pa11y WCAG2AA + axe 11/11 · Puppeteer interaction tests (incl. pause button, no missing translation) · bugs: outline slogan failed contrast → solid + shadow; forms without submit; input without `type`; EN button pushed the header off a 375 px phone → icon-only settings + new test; CSS animation replaced the SVG `transform` attribute → opponent flew to a corner → nested `<g>`
- Code roads: `scss/_tokens.scss` · `scss/_arte.scss` · `js/horario.js` · `js/formulario.js`

## 4 Closing (C6 C7)
- Back to the parent at 22:00: class found + booked in a minute
- Evidence: weights, pa11y, tests, [Lighthouse]
- Pending: real backend for bookings, photos of a real dojo next to the drawings
- Next: booking backend (confirm by email)
- AI use: [honest: what AI did, what I decided, what I checked]
- Who it helps + thanks · Osu

## Video shot list (~2:20)
| Time | Show | Why |
|---|---|---|
| 0:00 | Home: animated kick, slogan, pause button | context, identity |
| 0:12 | Timetable: filter Infantil + Jueves, "Hoy" | key 1 |
| 0:30 | Quiz → result → link → filtered timetable | key 2 |
| 0:45 | Form: submit empty → error summary → fill → confirmation | key 2 |
| 1:05 | ES → EN switch, reload keeps English · Settings: high contrast + bigger text | key 3, RA4 RA5 RA6 |
| 1:20 | Style guide: tokens, live contrast ratios | C1, RA1 RA2 |
| 1:35 | Gallery: lightbox · high contrast recolours drawings · DevTools: page 5 KB gzip | C5, RA3 RA4 |
| 1:55 | Terminal: `./prueba.sh` → 46 passed | C3 |
| 2:10 | Phone view (DevTools 375 px), timer running | result + next step |

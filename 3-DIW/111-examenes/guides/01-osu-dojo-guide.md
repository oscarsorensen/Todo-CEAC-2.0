# 1 · OSU! Dojo · study guide
Prep notes for `../01-osu-dojo.md`. Instructions to myself, not text to copy. Study this; bring only the one-page outline to the exam.

> **What this article shows:** that I can plan and build a complete web interface: an identity with a style guide, homogeneous styles through a Sass design system, my own animated illustrations instead of stock photos, interactive elements, and accessibility and usability that I verified, not just claimed.
> **Why this project:** it is the only project for DIW, so it has to touch all six RAs. It was built from scratch (extra points) and has a strong personality, which makes it a good portfolio piece.
> **How:** tell the story of a parent looking for a class on their phone at night → show the timetable filter, quiz, form and accessible media → prove the two decisions (Sass system, own animated illustrations) with the style guide, the gallery, the network tab and tests → be honest about what is fake (no backend) and about AI use.

**Paragraph plan (6):** P1 intro · P2 benefit + key functions · P3 use case, gain, limits · P4 decision 1 (Sass design system) · P5 decision 2 (animated SVG illustrations) + verification · P6 closing
**Exam timing (45 min writing):** 6 intro · 12 section 2 · 17 section 3 · 6 closing · 4 reread with the checks below
**Have ready before the exam:** my Lighthouse scores (index + horario) · my time "find a kids' class on Thursday" with a PDF timetable vs the filter · weights from `./prueba.sh` (gallery with 8 drawings: 5 KB gzip; the old photo version: ~53 KB per photo, 17 MB originals) · `prueba.sh` output (46 passed) · the bug stories below
**Run it:** `cd OsuDojo && php -S 127.0.0.1:8770` → `http://127.0.0.1:8770/index.html` · tests: `./prueba.sh` · rebuild CSS: `npm run css` · rebuild sounds: `herramientas/sonidos.sh` · social image: `node herramientas/imagen-social.cjs`

---

## Section 1 · Introduction (1 paragraph · C6 C7)
**What:** a person, a moment and a problem: finding the right class and booking it is hard on most small gym websites.
**Why:** the rubric starts from a human need. A karate site makes it easy to just talk about design; resist that.
**How:** one person in one situation → what goes wrong → what they do then → how I noticed.

- **Parent on the phone at night**
  - Write about: someone who wants a class for their child (or themselves) and only has time after dinner.
  - Tip: one concrete scene beats a general statement about "users".
- **Blurry PDF timetable, slow photos, broken menu**
  - Write about: zooming into a PDF, waiting for heavy photos on mobile data, a menu made for desktop.
  - Avoid: "WCAG", "SVG", "Sass" here.
- **People left out**
  - Write about: low vision, keyboard-only or screen reader users simply can't use many of these sites.
- **Consequence**
  - Write about: they give up or send a WhatsApp; the dojo loses members and time.
- **Observed**
  - Write about: I looked at real gym/dojo sites before designing (say which kind of problems I saw). Do this check for real before the exam.

**Check:** no tech terms · one person + situation · one consequence · how I observed it

---

## Section 2 · What it is for (1–2 paragraphs · C6)
**What:** the benefit, 3 key functions in use, a use case, a measured gain, limits.
**Why:** benefits vs features; honesty about limits is graded.
**How:** one benefit line → "the visitor can… so that…" per function → use case → number → limits.

- **Benefit**
  - Write about: find your class and book a free first class in about a minute, from any phone, whatever your abilities.
- **Key 1 · timetable filter**
  - Write about: choose age, level and day; the table updates and says how many classes match; today's classes are marked.
  - Tip: it's still a real table underneath, so screen readers read it properly.
- **Key 2 · quiz + sign-up**
  - Write about: the funny "¿Eres un flan?" quiz suggests a level and opens the timetable already filtered; the form explains every mistake in plain words and lists them at the top.
- **Key 3 · content for everyone**
  - Write about: reading settings (bigger text, less motion, high contrast) and a Spanish/English switch, both remembered between pages; every animation has a pause button.
- **Use case**
  - Write about: quiz → "Nivel flan" → timetable filtered → form → error → fix → confirmation. Same order as the video.
- **Gain**
  - Write about: weights (originals vs what a phone downloads), my timed comparison, Lighthouse. Say how I measured ("3 tries, average").
  - Avoid: numbers I didn't measure myself.
- **Limits**
  - Write about: the form sends nothing (no server), the dojo and people are fictitious, the drawings don't show the real place.

**Check:** benefits not features · one full use case · at least one real number · 2–3 limits

---

## Section 3 · Technical aspects (1–2 paragraphs · C1 + C5)
**What:** two decisions: a Sass design system, and my own animated SVG illustrations instead of photos. Plus how I verified accessibility.
**Why:** RA1/RA2 (style guide, homogeneous styles, preprocessor) and RA3/RA4 (formats, licences, integration) are the heart of DIW; RA5/RA6 need evidence.
**How:** what I did → why → alternative → trade-off → evidence.

- **Decision 1 · Sass design system (C1, RA1 RA2)**
  - *Layers:* `_tokens.scss` holds every colour, the type scale (ratio 1.25) and spacing (4 px steps). `_mixins.scss` holds breakpoints (`desde`), the focus ring and the diagonal cut. `_components` and `_pages` only use those.
  - *Bridge to JS:* tokens are output as CSS custom properties, so the style guide computes contrast live and the settings panel swaps colours without new CSS.
  - *Style guide:* `guia-estilo.html` documents logo, palette with contrast, type, spacing, components, tone of voice.
  - *Alternatives:* Bootstrap or Tailwind (fast, but generic look and lots of unused CSS) · plain CSS (copy-paste, colours drift).
  - *Trade-off:* needs a build step (`npm run css`), but one change updates the whole site; final CSS ~19 KB.
- **Decision 2 · own animated SVG illustrations (C5, RA3 RA4)**
  - *Story:* the first version used Commons photos (3 widths × AVIF/WebP/JPEG), a video made from them and a synthetic voice. I replaced it all: the photos looked like any gym, CC BY-SA licences forced conditions on my work, and the drawings are lighter and fit the "in your face" identity.
  - *How they're made:* pictograms drawn in SVG inside the HTML (thick lines + circles). Colours are the CSS variables, so high contrast recolours them. `scss/_arte.scss` animates groups of limbs with keyframes that rotate around the joint (`transform-origin`): kicks, punch, board breaking, jumps. No JavaScript, no GIF or video.
  - *Accessibility:* each drawing with content has `role="img"` + a description (translated by the language switch); the hero drawing is decorative and hidden. Every animated block has a pause button (WCAG 2.2.2) and "less motion" or the system setting stops everything.
  - *Formats still needed:* social networks don't show SVG, so `imagen-social.cjs` renders the hero in Chrome to a JPEG (og:image). Timer sounds: `sonidos.sh` synthesises them with ffmpeg as MP3 (every browser) + Opus/OGG (smaller).
  - *Alternatives:* photos (real, but licences and weight) · GIF/video (heavy, can't follow the colour settings) · Lottie (an extra library).
  - *Trade-off:* stylised, not the real dojo; coordinates written by hand.
  - *Where it runs / missing:* any static host (no server code). Tools: Node (Sass, Puppeteer), ffmpeg. Missing to go live: HTTPS hosting, a booking backend.
- **Verification (C3, RA5 RA6)**
  - Write about: `prueba.sh` 46 checks (pages, links, every drawing described or hidden, every animation pausable, one h1, CSS up to date, pa11y WCAG2AA with HTML_CodeSniffer + axe on 11 pages, 15 browser interaction tests incl. the pause button, 375 px phone and "no Spanish text without English"). Plus my manual keyboard + VoiceOver test.
  - Bug stories (pick 1–2): the outlined slogan failed contrast → solid letters with a red shadow · settings/filters were forms without a submit button → changed · the opponent in the kumite drawing flew to a corner: a CSS animation replaces the SVG `transform` attribute of the same element → position on an outer `<g>`, animation on an inner one · adding the EN button pushed the header off a 375 px phone (the test missed it because the page hides sideways overflow) → icon-only settings on phones + a test that checks the header.
  - Tip: also mention what automatic tools can't judge (text over the drawing) and that I checked it by hand.
- **Code roads**
  - Write about: point to `scss/_tokens.scss`, `scss/_arte.scss`, `js/horario.js`, `js/formulario.js`.

**Check:** 2 decisions with why + alternative + trade-off · RA names visible · test evidence · what's missing for deploy

---

## Section 4 · Closing (1 paragraph · C6 C7)
**What:** back to the parent: solved, evidence, pending, next improvement, AI honesty, who it helps.
**Why:** responsibility and honesty are graded (C7).
**How:** mirror the intro → evidence → pending → one next step with reason → AI use → people + thanks.

- **Back to the parent:** class found and booked from the phone in about a minute.
- **Evidence:** weights, pa11y 11/11, tests, Lighthouse.
- **Pending:** booking backend, photos of a real dojo next to the drawings.
- **Next most useful:** booking backend with email confirmation. Reason: today the form is the only fake part of the user's journey.
- **AI use (C2/C7):** say honestly what was generated with AI and what I decided (topic, tone, identity, slogan, structure) and how I checked it (tests, manual checks, understanding every file). Don't hide it, don't overstate it.
- **Who it helps + thanks:** parents, beginners, people with disabilities, the dojo. Thank the reader. "Osu" as the last word fits the tone.

**Check:** same person as the intro · one honest "not yet" · AI use stated · no technology list at the end

---

## Video link (same story)
- 0:00 home = Section 1 · 0:12–1:20 filter, quiz, form, language switch, settings = Section 2 · 1:20–2:10 style guide, gallery + high contrast, network tab, `prueba.sh` = Section 3 · last 10 s phone view + timer = Section 4
- Fake data in the form; reset reading settings before recording

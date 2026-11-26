# 2 · Tornillo Oxidado · study guide
Prep notes for `../02-tornillo-oxidado.md`. Instructions to myself, not text to copy. Study this; bring only the one-page outline to the exam.

> **What this article shows:** that I can produce and integrate multimedia myself (synthesised music, encoding, my own player) and build custom interactive components that stay accessible, then prove it with tests.
> **Why this project:** it covers what the dojo doesn't: audio, a custom media player, a seat picker, a cart in a modal, a print stylesheet. Same identity work (style guide, Sass), so all six RAs are still there.
> **How:** tell the story of a fan who wants to hear the band and get two seats together → show the player, the map → seats → ticket flow and the cart → prove the two decisions (media pipeline + player, accessible widgets) with weights and tests → be honest about what is fake (no payments, synthetic music) and about AI use.

**Paragraph plan (6):** P1 intro · P2 benefit + key functions · P3 use case, gain, limits · P4 decision 1 (media pipeline + player) · P5 decision 2 (accessible widgets) + verification · P6 closing
**Exam timing (45 min writing):** 6 intro · 12 section 2 · 17 section 3 · 6 closing · 4 reread with the checks below
**Have ready before the exam:** my Lighthouse scores (index + musica) · my time "buy 2 seats together" with mouse vs keyboard only (3 tries, average) · weights from `./prueba.sh` (album 125 s: Opus 988 KB vs MP3 1498 KB; home 5 KB HTML + 7 KB CSS gzip) · `prueba.sh` output (57 passed) · the bug stories below
**Run it:** `cd TornilloOxidado && php -S 127.0.0.1:8771 herramientas/servidor.php` → `http://127.0.0.1:8771/index.html` (Apache also works) · tests: `./prueba.sh` · rebuild CSS: `npm run css` · rebuild songs: `herramientas/sonidos.sh` · social image: `node herramientas/imagen-social.cjs`

---

## Section 1 · Introduction (1 paragraph · C6 C7)
**What:** a person, a moment and a problem: getting to know a small band and buying a good seat is hard on most small band websites.
**Why:** the rubric starts from a human need, not from "I made a metal band website".
**How:** one person in one situation → what goes wrong → what they do then → how I noticed.

- **Fan who just heard about the band**
  - Write about: a colleague mentions a local band; at home, on the phone, you want to hear them and see if they play near you.
  - Tip: one concrete scene beats a general statement about "users".
- **Scattered and inaccessible**
  - Write about: music on one platform, dates in an Instagram poster (an image, no text), tickets on another site with a seat map you can only use with a mouse.
  - Avoid: "Web Audio", "ARIA", "Sass" here.
- **People left out**
  - Write about: a blind or keyboard user can't pick a seat; a deaf fan has no idea what the music is like.
- **Consequence**
  - Write about: they give up; seats stay empty; the band depends on platforms it doesn't control.
- **Observed**
  - Write about: I looked at real local band sites before designing. Do this check for real before the exam.

**Check:** no tech terms · one person + situation · one consequence · how I observed it

---

## Section 2 · What it is for (1–2 paragraphs · C6)
**What:** the benefit, 3 key functions in use, a use case, a measured gain, limits.
**Why:** benefits vs features; honesty about limits is graded.
**How:** one benefit line → "the visitor can… so that…" per function → use case → number → limits.

- **Benefit**
  - Write about: hear the band, find the nearest gig and choose your seats in a couple of minutes, from any phone, whatever your abilities.
- **Key 1 · the player**
  - Write about: big buttons, a time bar that says the time out loud, shortcuts like YouTube (K, J, L, M), and a text description of every song for people who can't hear it.
- **Key 2 · map → seats → ticket**
  - Write about: tap a city on the map (or use the table), go straight to that concert's seat map, choose up to 6 seats with mouse or arrows, see the total, fill two fields, print the ticket.
- **Key 3 · shop + content for everyone**
  - Write about: the cart is kept if you close the page; the size guide opens on top; reading settings (bigger text, less motion, high contrast), a Spanish/English switch (both remembered) and a pause button on every animation.
- **Use case**
  - Write about: keyboard only: K to play → tour → Xàtiva → seats with arrows → empty form → errors listed at the top → fix → ticket → print. Same order as the video.
- **Gain**
  - Write about: Opus vs MP3 for the same 125 s (988 vs 1498 KB, a third less), page weights, Tab count (1 instead of 96), my timed comparison, Lighthouse. Say how I measured.
  - Avoid: numbers I didn't measure myself.
- **Limits**
  - Write about: nothing is sold or sent (no server), the band is fictitious, the music is synthesised, not recorded.

**Check:** benefits not features · one full use case · at least one real number · 2–3 limits

---

## Section 3 · Technical aspects (1–2 paragraphs · C5 + C3)
**What:** two decisions: my own media pipeline and player; custom components that stay accessible, with proof.
**Why:** RA3/RA4 (multimedia: formats, encoding, licences, integration) and RA5/RA6 (accessibility and usability, verified) are the heart of this project. RA1/RA2 are covered by the Sass system and the style guide (mention in one line).
**How:** what I did → why → alternative → trade-off → evidence.

- **Decision 1 · own media pipeline + player (C5, RA3 RA4)**
  - *Music:* `herramientas/canciones.cjs` builds each song note by note: a riff is a list of notes and lengths; guitars are sawtooth waves through a distortion curve (`tanh`), plus bass and drums made from noise and falling sine waves. It writes WAV files. Song 5 («Clavo ardiendo») uses a beat I recorded on my phone: analysed (speed, where each hit lands, low vs mid hits), tidied onto a grid and played by the synthesiser. Good C7 story: own material, credited.
  - *Encoding:* `herramientas/sonidos.sh` normalises loudness with ffmpeg and encodes each song twice: MP3 (plays everywhere) and Opus in OGG (a third smaller at similar quality). The player asks the browser `canPlayType` and loads the best one.
  - *Player:* one `<audio>` element without the browser's controls, driven by my buttons. Every button has a name; the time bar is a range input with `aria-valuetext` ("0:12 de 0:21"); a hidden status line announces "Sonando: …"; shortcuts K J L M N P; Media Session shows the song on the lock screen.
  - *Equaliser:* the Web Audio API's `AnalyserNode` reads the real frequencies while the song plays and scales 32 SVG bars. The vinyl only spins while playing. With "less motion" nothing moves.
  - *Accessibility of audio:* every song has a text description (WCAG 1.2.1, audio-only content) and download links.
  - *Alternatives:* `<audio controls>` (accessible, but looks different in every browser and has no identity) · a Spotify/Bandcamp embed (third-party cookies, heavy, no control) · stock music (licences, generic).
  - *Trade-off:* the music sounds synthetic; the player is my code to maintain.
  - *Where it runs / missing:* any static host that supports Range requests (Apache does). Tools: Node, ffmpeg. Missing: HTTPS hosting, real recordings.
- **Decision 2 · custom widgets that stay accessible (C3, RA5 RA6)**
  - *Seat picker:* 96 seats as `<button aria-pressed>`; only one is in the Tab order and the arrows move between them ("roving tabindex"); taken seats are `aria-disabled` and say "ocupada"; the summary is a status message. Max 6 per purchase.
  - *Map:* the cities are real HTML buttons placed over the SVG; the same data is in a table for anyone who prefers it. The van follows the route with CSS `offset-path`.
  - *Dialogs:* cart drawer and size guide use `<dialog>` with `showModal()` (focus trapped, Esc closes), and the focus goes back to the button that opened them. When the cart redraws, focus stays on the same + or − button.
  - *Ticket:* a print stylesheet; with `:has()` only the ticket is printed when one exists.
  - *Verification:* `prueba.sh` 57 checks: pages, SEO, every drawing described or hidden, every animation pausable, every song as MP3 + Opus with a description, links, CSS up to date, pa11y WCAG2AA with HTML_CodeSniffer + axe on 10 pages, and 22 Puppeteer tests (incl. the language switch and no Spanish text without English) (the audio really plays, the equaliser moves, seats by keyboard, print media, cart focus, phone width). Plus my manual keyboard + VoiceOver test.
  - *Bug stories (pick 1–2):* the player showed "Infinity:NaN" and seeking jumped back to 0: PHP's built-in server ignores Range requests → I wrote a small router (`herramientas/servidor.php`) that answers them · the tour page was wider than a phone: screen-reader-only text inside the scrolling table is absolutely positioned and escaped the scroll box → `position: relative` on the box · map labels went off a 375 px screen → labels on the land side · the "mute" test failed sometimes: `volumechange` arrives a moment later → the test waits.
  - *RA1/RA2 in one line:* tokens in `_tokens.scss`, mixins with a loop that generates the torn-metal `clip-path`, a live style guide with WCAG contrast computed from the CSS variables.
- **Code roads**
  - Write about: point to `herramientas/canciones.cjs`, `js/reproductor.js`, `js/entradas.js`, `scss/_mixins.scss`.

**Check:** 2 decisions with why + alternative + trade-off · RA names visible · test evidence · what's missing for deploy

---

## Section 4 · Closing (1 paragraph · C6 C7)
**What:** back to the fan: solved, evidence, pending, next improvement, AI honesty, who it helps.
**Why:** responsibility and honesty are graded (C7).
**How:** mirror the intro → evidence → pending → one next step with reason → AI use → people + thanks.

- **Back to the fan:** heard the band, found the gig, two seats together, ticket printed, all from the phone and even without a mouse.
- **Evidence:** weights, pa11y 10/10, 57 checks, Lighthouse.
- **Pending:** real payments and tickets by email, real recordings.
- **Next most useful:** a payments backend that locks seats on the server. Reason: today two fans could "buy" the same seat on different devices.
- **AI use (C2/C7):** say honestly what was generated with AI and what I decided (topic, tone, names, jokes I kept, structure) and how I checked it (tests, manual checks, understanding every file). Don't hide it, don't overstate it.
- **Who it helps + thanks:** fans, blind and deaf fans, keyboard users, small bands. Thank the reader.

**Check:** same person as the intro · one honest "not yet" · AI use stated · no technology list at the end

---

## Video link (same story)
- 0:00 home = Section 1 · 0:12–1:40 player, map, seats, ticket, shop, settings = Section 2 · 1:40–2:20 style guide, terminal with `prueba.sh` = Section 3 · last 10 s phone view = Section 4
- Fake data in the form; reset reading settings and empty the cart before recording; turn the volume down, the video is silent anyway

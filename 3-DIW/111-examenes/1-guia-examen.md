# DIW end-of-term exam (DAW2, CEAC): Diseño de Interfaces Web

GUÍA EXAMEN (same procedure as Entorno Servidor)

1 - Iniciar grabación
2 - Lanzar el proyecto contra la plataforma de documentación
3 - Subir a exámenes a la plataforma de formación
4 - Grabar el proyecto en funcionamiento
5 - Redactar la contestación a las preguntas de la rúbrica
6 - Entregar el informe en markdown en la plataforma de formación
7 - Entregar el video y el texto en la app Red de Jocarsa.

Outline only. No finished paragraphs: I write the text myself in the exam.

| File | Project | Leads with |
|---|---|---|
| `01-osu-dojo.md` | OSU! Dojo (Kyokushin karate dojo website) | C1 Architecture (Sass design system) + C5 Infrastructure (media pipeline) |
| `02-tornillo-oxidado.md` | Tornillo Oxidado (fictitious instrumental metal band) | C5 Infrastructure (synthesised music + own player) + C3 Verification (accessible custom widgets) |

Projects: `111-examenes/01-osu-dojo/OsuDojo/` and `111-examenes/02-tornillo-oxidado/TornilloOxidado/`. Static sites, no login. Run the dojo with `php -S 127.0.0.1:8770` from its folder, the band with `php -S 127.0.0.1:8771 herramientas/servidor.php` (the router adds the Range support the songs need), or use Apache; open `index.html`.

Each outline has a companion in `guides/` (`01-osu-dojo-guide.md`, `02-tornillo-oxidado-guide.md`): what the article shows and why, a paragraph plan and timing, then per rubric section a What/Why/How box, "Write about / Tip / Avoid" per bullet and a checklist. For studying only; the one-page outline is what goes into the exam.

---

## Exam format
- Two projects prepared (Oscar, 2026-11-26: a second one is expected). Still to confirm: one article per project, or one article about one of them
- Article (post) on red.jocarsa.com: one project per article, written properly
- Article: 4–6 paragraphs + 1–3 min silent screen-capture video of the same project
- Assumed: same 90 min and same rubric as Servidor. Confirm in class (open questions)
- The article must stand on its own and also work as a LinkedIn / portfolio post

## Exam procedure (as in Servidor, from José Vicente's emails 23–24 Nov 2026)
Before and at the start
- Arrive on time: late = fail this exam and go to the ordinary call
- Project ready. The exam is not for programming or designing
- Step 0, sine qua non: open the supervision session at supervision.jocarsa.com and start the recording
For the project
- A) Run the project against documentacion.jocarsa.com → markdown report
- B) Upload the report to the exams section of formacion.jocarsa.com (mock exam: simulacros section)
- C) Record a 1–3 min video of the site working, stressing what is notable
- D) Write the 4–6 paragraph text following the extended rubric (jocarsa.github.io/rubricaampliada). No AI at all, not even to polish
- E) Upload video + text to red.jocarsa.com
Notes
- Decide the language beforehand (Spanish or English); same text is portfolio material
- The report is built from the code: check which files the tool reads. Things that should not go in: `node_modules/` (63 MB, never upload it). No secrets in this project (static site, no keys)

## Rules
- Text written by me in the exam, no AI. Only the outline allowed
- Project finished before the exam: in the exam I document, not develop
- No class projects as-is. This one is new from scratch (extra points per the teacher)
- It must show knowledge equivalent to the course units (RA1–RA6 below)
- No talking and no other activity during the exam

## Time check (assumed 90 min, 1 article)
| Step | Min |
|---|---|
| Supervision session + recording on | 3 |
| documentacion.jocarsa.com report + upload to formacion | 10 |
| Record the video (shot list in the outline, one take) | 10 |
| Write the article (5–6 paragraphs) | 45 |
| Reread against the rubric checklist | 10 |
| Upload video + text to red.jocarsa.com | 5 |
| Buffer | 7 |
Plenty of time compared to Servidor: use it for quality (concrete evidence, numbers, honest limits), not length.

## Open questions to ask (DIW teacher)
- 2 projects for DIW: one article each, or pick one? Same 90 min? Same extended rubric?
- Exam date for DIW?
- Can the video be recorded beforehand and only uploaded?
- Does documentacion.jocarsa.com accept a static HTML/CSS/JS project, and which files does it include?

## Rubric → competences
| Section | Length | Competences | Key points |
|---|---|---|---|
| 1 Introduction | 1 par. | 6 + 7 | human need first; who, what is slow/costly/error-prone, consequences; observed, plain language, no promises |
| 2 What it is for | 1–2 par. | 6 | benefits not features; 2–3 key functions; concrete use case; measurable gain; limitations |
| 3 Technical | 1–2 par. | 1–5 (pick 2) | justify, don't list tools; alternatives + trade-offs; evidence |
| 4 Closing | 1 par. | 6 + 7 | back to the human problem; solved / evidence / pending / next improvement; who it helps; thank reader |

Competences: 1 Architecture · 2 AI orchestration · 3 Security & verification · 4 Data engineering · 5 Infrastructure · 6 Business logic · 7 Communication & responsibility

Technical checklist per competence (DIW reading):
- 1: structure of the styles (tokens → mixins → components → pages), page architecture, why not a framework
- 2: what AI did, instructions given, how verified, my decisions (be honest)
- 3: accessibility verification (pa11y, keyboard, VoiceOver), form validation, a bug + fix, remaining risks
- 4: (light here) timetable data in a table with data attributes; translation dictionary
- 5: SVG vs photos (weight, licences), formats still needed (JPEG social image, MP3/Opus sounds), build scripts, dependencies (Sass, Puppeteer, ffmpeg), static hosting, what is missing to go live

## Learning outcomes DIW (RAs)
- RA1 plan a web interface applying design specifications (style guide, colour, type, icons, navigation map, layout)
- RA2 create homogeneous interfaces by defining and applying styles (CSS, external sheets, preprocessors, frameworks, verification)
- RA3 prepare multimedia files for the web (image types, licences and intellectual property, formats and conversions, optimisation, audio, video)
- RA4 integrate multimedia and interactive content (interactive elements, behaviours, scripts, cross-browser/device checks)
- RA5 accessible interfaces (W3C, WCAG principles, conformance levels, techniques, analysis tools, SEO)
- RA6 usable, friendly interfaces (usability analysis, site goal, user types, barriers, easy navigation, connection speed, standards, verification)
These match the unit folders `001`–`006` in `3-DIW/`.

## Video template (silent, 1:30–2:30 target, never > 3:00)
- 0:00–0:15 context: home page, what it is for (section 1)
- 0:15–1:30 use case: 2–3 key functions, start to finish (section 2)
- 1:30–2:30 technical evidence for the 2 decisions (section 3)
- 2:30–3:00 result + one limitation / next step (section 4)
- One take: browser zoom 125 %, bookmarks bar hidden, other tabs closed, reading settings reset (no high contrast unless showing it)
- No personal data in the form (use "Ana Pérez", ana@correo.com)

---

## Before the exam: checklist
- [x] Project built from scratch: 11 pages, Sass, JS, media pipeline
- [x] Own identity + living style guide (`guia-estilo.html`)
- [x] Own animated SVG illustrations, pausable; credits (`creditos.html`)
- [x] `prueba.sh`: 46 checks green (pages, links, illustrations, pause buttons, SEO, pa11y 11/11, interaction tests, translations)
- [x] Spanish/English switch (`js/idioma.js` + `js/traducciones.js`)
- [ ] Understand every file: walkthrough with Claude, then explain it out loud myself
- [ ] Take my own measurements (outline "Gain" + guide "Have ready"): Lighthouse, time to find a class, weights
- [ ] Manual check: keyboard only + VoiceOver on 3 pages; phone at 375 px; zoom 200 %
- [ ] Record the video once as a rehearsal, time it
- [ ] Write one practice article from the outline only, timed
- [ ] Try documentacion.jocarsa.com with this project (in the mock session if possible)
- [ ] Ask the open questions above

## Personalising (why it is clearly mine)
- Own brand: OSU! Dojo ("Osu", the Kyokushin greeting; same "Osso" family pun as my Servidor projects)
- Own look: black, bone white, blood red, gold; Anton + Barlow; diagonal cuts; kanku logo drawn in SVG
- Tone: "in your face" humour with Cobra Kai vibes and the slogan "Strike first, strike hard, no mercy" (credited as homage). Rule: laugh at excuses, never at people
- Fictitious dojo, senseis, testimonials and address; no photos: own pictogram illustrations animated in CSS

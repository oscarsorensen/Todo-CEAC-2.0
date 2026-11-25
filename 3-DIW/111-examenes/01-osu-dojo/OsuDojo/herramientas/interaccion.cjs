// Interaction tests in a real browser (Puppeteer + the Mac's Chrome):
// each line is one behaviour a user relies on. Called from prueba.sh.
const puppeteer = require("../node_modules/puppeteer");
const URL = "http://127.0.0.1:8770";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const pruebas = [
  ["timetable filter 'adults + beginners' hides other classes", async (p) => {
    await p.goto(`${URL}/horario.html`);
    await p.select("#f-edad", "adultos");
    await p.select("#f-nivel", "iniciacion");
    return p.$eval("#contador", (e) => e.textContent.startsWith("Mostrando 5 de 18"));
  }],
  ["timetable reads filters from the URL (quiz link)", async (p) => {
    await p.goto(`${URL}/horario.html?edad=infantil`);
    return p.$eval("#contador", (e) => e.textContent.startsWith("Mostrando 6 de 18"));
  }],
  ["empty sign-up form shows an error summary that gets focus", async (p) => {
    await p.goto(`${URL}/inscripcion.html`);
    await p.click("#formulario button[type=submit]");
    return p.evaluate(() => !document.getElementById("resumen-errores").hidden
      && document.activeElement.id === "resumen-errores"
      && document.getElementById("nombre").getAttribute("aria-invalid") === "true");
  }],
  ["valid sign-up form shows the confirmation", async (p) => {
    await p.goto(`${URL}/inscripcion.html`);
    await p.type("#nombre", "Ana Pérez");
    await p.type("#email", "ana@correo.com");
    await p.click("input[name=edad][value=adultos]");
    await p.select("#clase", "Kyokushin desde cero");
    await p.click("#privacidad");
    await p.click("#formulario button[type=submit]");
    return p.$eval("#confirmacion", (e) => !e.hidden && e.textContent.includes("Ana"));
  }],
  ["quiz gives a level and a filtered timetable link", async (p) => {
    await p.goto(`${URL}/inscripcion.html`);
    for (const v of ["q-edad][value=adultos", "q-exp][value=\"0\"", "q-meta][value=\"0\"", "q-frase][value=\"0\""]) {
      await p.click(`input[name=${v}]`);
    }
    await p.click("#form-quiz button[type=submit]");
    return p.$eval("#resultado-quiz a", (a) => a.getAttribute("href") === "horario.html?edad=adultos&nivel=iniciacion");
  }],
  ["belt button opens its requirements (aria-expanded)", async (p) => {
    await p.goto(`${URL}/camino.html`);
    await p.click("#escalera button");
    return p.evaluate(() => document.querySelector("#escalera button").getAttribute("aria-expanded") === "true"
      && !document.getElementById("cinturon-blanco").hidden);
  }],
  ["gallery opens a modal, arrow key moves, Esc returns focus", async (p) => {
    await p.goto(`${URL}/galeria.html`);
    await p.click("#galeria li:nth-child(2) button");
    const abierto = await p.$eval("#visor", (d) => d.open);
    await p.keyboard.press("ArrowRight");
    const tercera = await p.$eval("#visor-pie", (e) => e.textContent.startsWith("3 de 8"));
    await p.keyboard.press("Escape");
    await new Promise((r) => setTimeout(r, 300)); // "close" fires asynchronously
    const foco = await p.evaluate(() => document.activeElement.closest("li") === document.querySelector("#galeria li:nth-child(3)"));
    return abierto && tercera && foco;
  }],
  ["pause button stops the animations; 'less motion' hides it", async (p) => {
    await p.goto(`${URL}/index.html`);
    await p.click(".portada [data-pausa]");
    const parada = await p.evaluate(() =>
      document.querySelector(".portada").getAnimations({ subtree: true }).every((a) => a.playState === "paused"));
    const texto = await p.$eval(".portada [data-pausa]", (b) => b.textContent === "Reanudar animación");
    await p.click('[aria-controls="ajustes"]');
    await p.click('input[name="sin-movimiento"]');
    const oculto = await p.$eval(".portada [data-pausa]", (b) => b.hidden);
    await p.click('input[name="sin-movimiento"]'); // leave settings as they were
    return parada && texto && oculto;
  }],
  ["timer starts a round and counts down", async (p) => {
    await p.goto(`${URL}/temporizador.html`);
    await p.click("#t-empezar");
    await new Promise((r) => setTimeout(r, 1600));
    return p.evaluate(() => document.getElementById("estado").textContent === "Asalto 1 de 3"
      && document.getElementById("reloj").textContent !== "2:00");
  }],
  ["reading settings persist across pages", async (p) => {
    await p.goto(`${URL}/index.html`);
    await p.click('[aria-controls="ajustes"]');
    await p.click("input[name=alto-contraste]");
    await p.goto(`${URL}/horario.html`);
    const activo = await p.evaluate(() => document.documentElement.classList.contains("alto-contraste"));
    await p.evaluate(() => localStorage.clear());
    return activo;
  }],
  ["mobile menu opens with aria-expanded and closes with Esc", async (p) => {
    await p.setViewport({ width: 375, height: 800 });
    await p.goto(`${URL}/index.html`);
    await p.click(".boton-menu");
    const abierto = await p.$eval("#menu", (m) => getComputedStyle(m).display !== "none");
    await p.keyboard.press("Escape");
    const cerrado = await p.$eval("#menu", (m) => getComputedStyle(m).display === "none");
    await p.setViewport({ width: 1280, height: 900 });
    return abierto && cerrado;
  }],
  ["language button switches the page to English and back", async (p) => {
    await p.goto(`${URL}/horario.html`);
    await p.click("#boton-idioma");
    const ingles = await p.evaluate(() => document.documentElement.lang === "en"
      && document.querySelector("h1").textContent === "Timetable"
      && document.getElementById("contador").textContent.startsWith("Showing"));
    await p.goto(`${URL}/camino.html`);
    const recordado = await p.evaluate(() => document.querySelector("h1").textContent === "The path");
    await p.click("#boton-idioma");
    const espanol = await p.evaluate(() => document.documentElement.lang === "es" && document.querySelector("h1").textContent === "El camino");
    return ingles && recordado && espanol;
  }],
  ["every Spanish text has an English translation (all pages)", async (p) => {
    await p.evaluate(() => localStorage.setItem("osu-idioma", "en"));
    const faltan = [];
    for (const n of ["index", "horario", "camino", "senseis", "galeria", "temporizador", "inscripcion", "guia-estilo", "accesibilidad", "creditos", "404"]) {
      await p.goto(`${URL}/${n}.html`, { waitUntil: "networkidle0" });
      faltan.push(...(await p.evaluate(() => [...window.osuPendientes])));
    }
    await p.evaluate(() => localStorage.clear());
    if (faltan.length) throw new Error(`missing: ${faltan.slice(0, 3).join(" | ")}`);
    return true;
  }],
  ["no page or header is wider than a 375px phone", async (p) => {
    await p.setViewport({ width: 375, height: 800 });
    for (const n of ["index", "horario", "camino", "senseis", "galeria", "temporizador", "inscripcion", "guia-estilo", "creditos"]) {
      await p.goto(`${URL}/${n}.html`);
      const desborda = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth
        || [...document.querySelectorAll(".cabecera__fila > *")].some((e) => e.getBoundingClientRect().right > innerWidth));
      if (desborda) return false;
    }
    await p.setViewport({ width: 1280, height: 900 });
    return true;
  }],
];

(async () => {
  const navegador = await puppeteer.launch({ executablePath: CHROME });
  const pagina = await navegador.newPage();
  await pagina.setViewport({ width: 1280, height: 900 });
  const errores = [];
  pagina.on("pageerror", (e) => errores.push(e.message));
  let fallos = 0;
  for (const [nombre, prueba] of pruebas) {
    let bien = false;
    let motivo = "";
    try {
      bien = await prueba(pagina);
    } catch (e) {
      motivo = ` (${e.message})`;
    }
    if (!bien) fallos++;
    console.log(`  ${bien ? "ok   " : "FALLA"} ${nombre}${motivo}`);
  }
  const sinErrores = errores.length === 0;
  if (!sinErrores) fallos++;
  console.log(`  ${sinErrores ? "ok   " : "FALLA"} no JavaScript errors on any page${sinErrores ? "" : ": " + errores[0]}`);
  await navegador.close();
  process.exit(fallos ? 1 : 0);
})();

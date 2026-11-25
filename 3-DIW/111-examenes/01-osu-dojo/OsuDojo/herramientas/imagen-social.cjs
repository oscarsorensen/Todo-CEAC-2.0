// Social preview (og:image): social networks don't show SVG, so this
// renders the home hero at 1200x630 in Chrome, stops the animation at
// the moment of the kick and saves it as img/social.jpg.
// Usage: node herramientas/imagen-social.cjs   (with php -S 127.0.0.1:8770 running)
const puppeteer = require("../node_modules/puppeteer");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

(async () => {
  const navegador = await puppeteer.launch({ executablePath: CHROME });
  const p = await navegador.newPage();
  await p.setViewport({ width: 1200, height: 900 });
  await p.goto("http://127.0.0.1:8770/index.html", { waitUntil: "networkidle0" });
  await p.evaluate(() => {
    document.querySelector(".cabecera").remove();
    document.querySelector(".boton-pausa").remove();
    document.getAnimations().forEach((a) => {
      a.pause();
      a.currentTime = 1450; // ms: leg fully extended
    });
  });
  await p.screenshot({ path: "img/social.jpg", type: "jpeg", quality: 80, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await navegador.close();
  console.log("img/social.jpg");
})();

// Style guide: computes each colour's WCAG contrast against the black
// background from the live CSS custom properties.
import { t } from "./idioma.js";

const estilos = getComputedStyle(document.documentElement);

function luminancia(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contraste(a, b) {
  const [claro, oscuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (oscuro + 0.05);
}

function pintar() {
  const negro = estilos.getPropertyValue("--negro").trim();
  document.querySelectorAll("#muestras li").forEach((li) => {
    const color = estilos.getPropertyValue(`--${li.dataset.color}`).trim();
    const ratio = contraste(color, negro);
    const nota = ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? t("solo textos grandes o decoración") : t("solo decoración");
    li.querySelector(".ratio").textContent = t("Contraste sobre negro: {ratio}:1 ({nota})", { ratio: ratio.toFixed(1), nota });
  });
}

pintar();
document.addEventListener("idioma-cambiado", pintar);

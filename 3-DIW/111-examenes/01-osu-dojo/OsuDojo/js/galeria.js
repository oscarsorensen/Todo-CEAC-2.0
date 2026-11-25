// Gallery lightbox with <dialog>: showModal() traps focus and Esc closes
// it natively; arrow keys move between photos; focus returns to the
// thumbnail that opened it. The big drawing is a copy of the thumbnail's SVG.
import { t } from "./idioma.js";

const botones = [...document.querySelectorAll("#galeria button")];
const visor = document.getElementById("visor");
const lienzo = visor.querySelector(".visor__arte");
const pie = document.getElementById("visor-pie");
let actual = 0;

function mostrar(indice) {
  actual = (indice + botones.length) % botones.length;
  const dibujo = botones[actual].querySelector("svg");
  const copia = dibujo.cloneNode(true);
  // The caption already describes it: hide the copy from screen readers.
  copia.removeAttribute("role");
  copia.removeAttribute("aria-label");
  copia.setAttribute("aria-hidden", "true");
  lienzo.replaceChildren(copia);
  pie.textContent = `${t("{n} de {total}.", { n: actual + 1, total: botones.length })} ${dibujo.getAttribute("aria-label")}`;
}

botones.forEach((boton, i) =>
  boton.addEventListener("click", () => {
    mostrar(i);
    visor.showModal();
  }),
);

visor.addEventListener("click", (e) => {
  if (e.target.dataset.mover) mostrar(actual + Number(e.target.dataset.mover));
  if ("cerrar" in e.target.dataset || e.target === visor) visor.close();
});

visor.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") mostrar(actual + 1);
  if (e.key === "ArrowLeft") mostrar(actual - 1);
});

visor.addEventListener("close", () => botones[actual].focus());
document.addEventListener("idioma-cambiado", () => visor.open && mostrar(actual));

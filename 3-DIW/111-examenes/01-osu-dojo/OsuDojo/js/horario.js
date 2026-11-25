// Timetable: filter rows by age, level and day; mark today's classes.
// The filters also read the URL (?edad=adultos&nivel=iniciacion) so the
// quiz can link straight to the right classes.
import { t } from "./idioma.js";

const formulario = document.getElementById("filtros");
const filas = [...document.querySelectorAll("#tabla-horario tbody tr")];
const contador = document.getElementById("contador");
const sinClases = document.getElementById("sin-clases");
const dias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
const hoy = dias[new Date().getDay()];

filas
  .filter((fila) => fila.dataset.dia === hoy)
  .forEach((fila) => {
    fila.classList.add("es-hoy");
    fila.cells[0].insertAdjacentHTML("beforeend", ' <span class="etiqueta etiqueta--hoy" data-dinamico></span>');
  });

function filtrar() {
  const { edad, nivel, dia } = Object.fromEntries(new FormData(formulario));
  let visibles = 0;
  filas.forEach((fila) => {
    const encaja =
      (!edad || fila.dataset.edad === edad || fila.dataset.edad === "familias") &&
      (!nivel || fila.dataset.nivel === nivel || fila.dataset.nivel === "todos") &&
      (!dia || fila.dataset.dia === dia);
    fila.hidden = !encaja;
    if (encaja) visibles++;
  });
  contador.textContent = t("Mostrando {n} de {total} clases.", { n: visibles, total: filas.length });
  document.querySelectorAll(".etiqueta--hoy").forEach((e) => (e.textContent = t("Hoy")));
  sinClases.hidden = visibles > 0;
}

const parametros = new URLSearchParams(location.search);
for (const campo of ["edad", "nivel", "dia"]) {
  const valor = parametros.get(campo);
  if (valor && formulario.elements[campo].querySelector(`option[value="${CSS.escape(valor)}"]`)) {
    formulario.elements[campo].value = valor;
  }
}

formulario.addEventListener("change", filtrar);
document.addEventListener("idioma-cambiado", filtrar);
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  filtrar();
  contador.focus();
});
formulario.addEventListener("reset", () => setTimeout(filtrar));
filtrar();

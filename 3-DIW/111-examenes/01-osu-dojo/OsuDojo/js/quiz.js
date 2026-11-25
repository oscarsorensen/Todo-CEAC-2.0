// "¿Eres un flan?" quiz: adds up the answers, gives a funny level and
// links to the timetable already filtered for that person.
import { t } from "./idioma.js";

const quiz = document.getElementById("form-quiz");
const resultado = document.getElementById("resultado-quiz");
let ultimas = null; // last answers, to redraw the result when the language changes

const niveles = [
  { max: 1, titulo: "Nivel flan", texto: "Tiemblas, pero tienes potencial. Empieza desde cero y en un mes no te reconoces.", nivel: "iniciacion" },
  { max: 4, titulo: "Nivel tofu firme", texto: "Hay base. Te falta técnica y te sobran excusas. Lo arreglamos.", nivel: "intermedio" },
  { max: 6, titulo: "Nivel roca", texto: "Peligro. El sensei ya te está esperando en el kumite.", nivel: "avanzado" },
];

function pintar(datos) {
  const faltan = ["q-edad", "q-exp", "q-meta", "q-frase"].filter((n) => !(n in datos)).length;
  if (faltan) {
    const titulo = faltan === 1 ? t("Te falta 1 pregunta") : t("Te faltan {n} preguntas", { n: faltan });
    resultado.innerHTML = `<h2>${titulo}</h2><p>${t("Sin trampas: contesta todas.")}</p>`;
    return;
  }
  const puntos = Number(datos["q-exp"]) + Number(datos["q-meta"]) + Number(datos["q-frase"]);
  const nivel = niveles.find((n) => puntos <= n.max);
  // Children always start in their own group, whatever they answered.
  const nivelHorario = datos["q-edad"] === "adultos" ? nivel.nivel : "";
  const enlace = `horario.html?edad=${datos["q-edad"]}${nivelHorario ? `&nivel=${nivelHorario}` : ""}`;
  resultado.innerHTML = `<h2>${t(nivel.titulo)}</h2><p>${t(nivel.texto)}</p><a class="boton" href="${enlace}">${t("Ver mis clases")}</a>`;
}

quiz.addEventListener("submit", (e) => {
  e.preventDefault();
  ultimas = Object.fromEntries(new FormData(quiz));
  pintar(ultimas);
  resultado.hidden = false;
  resultado.focus();
});

document.addEventListener("idioma-cambiado", () => ultimas && pintar(ultimas));

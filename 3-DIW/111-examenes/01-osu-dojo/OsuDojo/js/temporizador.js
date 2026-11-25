// Fight round timer: rounds and rests, gong at start/end of each round,
// beep in the last 10 seconds. Screen readers hear state changes only
// (round, rest, end), never every second.
import { t } from "./idioma.js";

const $ = (id) => document.getElementById(id);
const reloj = $("reloj");
const estado = $("estado");
const anuncio = $("anuncio");
const caja = $("temporizador");
const botonEmpezar = $("t-empezar");
const gong = $("snd-gong");
const pitido = $("snd-pitido");

let fase = "preparado"; // preparado | asalto | descanso | fin
let asalto = 0;
let restante = 0;
let intervalo = null;
let finFase = 0;

const config = () => ({
  asalto: Number($("t-asalto").value),
  descanso: Number($("t-descanso").value),
  asaltos: Math.min(12, Math.max(1, Number($("t-asaltos").value) || 3)),
});

const formato = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function sonar(audio) {
  if (!$("t-sonido").checked) return;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

// Current state as text, so it can be redrawn when the language changes.
function textoEstado() {
  if (fase === "asalto") return t("Asalto {n} de {total}", { n: asalto, total: config().asaltos });
  if (fase === "descanso") return t("Descanso");
  if (fase === "fin") return t("¡Osu! Fin del combate");
  return t("Preparado");
}

function decir(texto = textoEstado()) {
  estado.textContent = texto;
  anuncio.textContent = texto;
}

function pintar() {
  reloj.textContent = formato(restante);
  caja.classList.toggle("en-asalto", fase === "asalto");
  caja.classList.toggle("en-descanso", fase === "descanso");
  caja.classList.toggle("ultimos", fase === "asalto" && restante <= 10 && restante > 0);
}

function empezarFase(nueva) {
  const c = config();
  fase = nueva;
  if (fase === "asalto") {
    asalto++;
    restante = c.asalto;
  } else if (fase === "descanso") {
    restante = c.descanso;
  }
  decir();
  finFase = Date.now() + restante * 1000;
  sonar(gong);
  pintar();
}

// Uses the real clock, not tick counting, so a slow tab doesn't drift.
function tic() {
  const quedan = Math.max(0, Math.ceil((finFase - Date.now()) / 1000));
  if (quedan !== restante) {
    restante = quedan;
    if (fase === "asalto" && restante <= 10 && restante > 0) sonar(pitido);
    pintar();
  }
  if (restante > 0) return;
  const c = config();
  if (fase === "asalto" && asalto < c.asaltos) empezarFase("descanso");
  else if (fase === "descanso") empezarFase("asalto");
  else terminar();
}

function terminar() {
  clearInterval(intervalo);
  intervalo = null;
  fase = "fin";
  sonar(gong);
  decir();
  botonEmpezar.textContent = t("Empezar");
  pintar();
}

function empezarOPausar() {
  if (intervalo) {
    clearInterval(intervalo);
    intervalo = null;
    botonEmpezar.textContent = t("Seguir");
    decir(t("En pausa"));
    return;
  }
  if (fase === "preparado" || fase === "fin") {
    asalto = 0;
    empezarFase("asalto");
  } else {
    finFase = Date.now() + restante * 1000;
    decir();
  }
  botonEmpezar.textContent = t("Pausa");
  intervalo = setInterval(tic, 250);
}

function reiniciar() {
  clearInterval(intervalo);
  intervalo = null;
  fase = "preparado";
  asalto = 0;
  restante = config().asalto;
  botonEmpezar.textContent = t("Empezar");
  decir();
  pintar();
}

botonEmpezar.addEventListener("click", empezarOPausar);
$("t-reiniciar").addEventListener("click", reiniciar);
$("configuracion").addEventListener("change", () => {
  if (fase === "preparado" || fase === "fin") reiniciar();
});

// Shortcuts, except while typing in a form field.
document.addEventListener("keydown", (e) => {
  if (e.target.closest("input, select, textarea, button, a")) return;
  if (e.code === "Space") {
    e.preventDefault();
    empezarOPausar();
  }
  if (e.key === "r" || e.key === "R") reiniciar();
});

document.addEventListener("idioma-cambiado", () => {
  const enPausa = !intervalo && (fase === "asalto" || fase === "descanso");
  botonEmpezar.textContent = intervalo ? t("Pausa") : enPausa ? t("Seguir") : t("Empezar");
  decir(enPausa ? t("En pausa") : textoEstado());
});

reiniciar();

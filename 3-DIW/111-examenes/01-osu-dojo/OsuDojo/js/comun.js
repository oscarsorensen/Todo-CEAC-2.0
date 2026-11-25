// Shared on every page: mobile menu, reading settings, animation pause.
import { t } from "./idioma.js";

const raiz = document.documentElement;

// Toggle button for a panel (menu, settings): aria-expanded + Esc closes.
function desplegable(boton, panel, abrir, cerrar) {
  boton.addEventListener("click", () => {
    const abierto = boton.getAttribute("aria-expanded") === "true";
    boton.setAttribute("aria-expanded", String(!abierto));
    (abierto ? cerrar : abrir)();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && boton.getAttribute("aria-expanded") === "true") {
      boton.setAttribute("aria-expanded", "false");
      cerrar();
      boton.focus();
    }
  });
}

const menu = document.getElementById("menu");
const botonMenu = document.querySelector(".boton-menu");
desplegable(botonMenu, menu, () => menu.classList.add("abierto"), () => menu.classList.remove("abierto"));

const ajustes = document.getElementById("ajustes");
const botonAjustes = document.querySelector('[aria-controls="ajustes"]');
desplegable(botonAjustes, ajustes, () => (ajustes.hidden = false), () => (ajustes.hidden = true));

function leerAjustes() {
  try {
    return JSON.parse(localStorage.getItem("osu-ajustes") || "{}");
  } catch {
    return {};
  }
}

const guardados = leerAjustes();
ajustes.querySelectorAll("input[type=checkbox]").forEach((casilla) => {
  casilla.checked = Boolean(guardados[casilla.name]);
  casilla.addEventListener("change", () => {
    raiz.classList.toggle(casilla.name, casilla.checked);
    guardados[casilla.name] = casilla.checked;
    try {
      localStorage.setItem("osu-ajustes", JSON.stringify(guardados));
    } catch {
      // Storage blocked: the setting still applies to this page.
    }
    document.dispatchEvent(new CustomEvent("ajustes-cambiados"));
  });
});

// Less motion = system preference OR the in-page setting.
const movimientoReducido = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches || raiz.classList.contains("sin-movimiento");

// Animated illustrations: every animated block has a pause button
// (WCAG 2.2.2). With "less motion" nothing moves, so the button hides.
document.querySelectorAll("[data-animado]").forEach((bloque) => {
  const boton = bloque.querySelector("[data-pausa]");
  const pintar = () => {
    boton.textContent = bloque.classList.contains("pausada") ? t("Reanudar animación") : t("Pausar animación");
    boton.hidden = movimientoReducido();
  };
  boton.addEventListener("click", () => {
    bloque.classList.toggle("pausada");
    pintar();
  });
  document.addEventListener("ajustes-cambiados", pintar);
  document.addEventListener("idioma-cambiado", pintar);
  pintar();
});

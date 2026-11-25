// Spanish/English switch. The HTML is written in Spanish; this module
// swaps every text, alt, aria-label and placeholder for its English
// version from traducciones.js, and back. Texts that JavaScript writes
// later go through t(). The choice is remembered in localStorage.
import { textos } from "./traducciones.js";

const CLAVE = "osu-idioma";
const FORMATO = new Set(["STRONG", "EM", "B", "I", "SMALL", "CODE", "KBD", "BR", "ABBR", "CITE"]);
const ATRIBUTOS = ["alt", "aria-label", "placeholder", "title"];
const cambios = []; // [node, property, Spanish value, English value]

// Spanish texts with no English entry, for the tests (prueba.sh).
export const pendientes = new Set();
window.osuPendientes = pendientes;

function leer() {
  try {
    return localStorage.getItem(CLAVE) === "en" ? "en" : "es";
  } catch {
    return "es";
  }
}

export let idioma = leer();

const normal = (texto) => texto.replace(/\s+/g, " ").trim();

// Translate a text written by JavaScript. {name} placeholders are filled from datos.
export function t(es, datos = {}) {
  const base = idioma === "en" ? textos[es] ?? es : es;
  return base.replace(/\{(\w+)\}/g, (_, clave) => String(datos[clave] ?? ""));
}

function buscar(clave) {
  if (!/\p{L}/u.test(clave)) return null; // times, numbers, symbols
  if (clave in textos) return textos[clave];
  pendientes.add(clave);
  return null;
}

function anotar(nodo, propiedad, es) {
  const en = buscar(normal(es));
  if (en === null) return;
  const [, antes, despues] = es.match(/^(\s*)[\s\S]*?(\s*)$/);
  cambios.push([nodo, propiedad, es, propiedad === "data" ? antes + en + despues : en]);
}

// A "leaf" holds only text and inline formatting: it is translated as a whole
// (keeps <strong> etc.). Other elements: translate their own text nodes, then recurse.
function recorrer(elemento) {
  if (elemento.matches("script, style, [translate=no], [data-dinamico]")) return;
  for (const atributo of ATRIBUTOS) {
    if (elemento.hasAttribute(atributo)) {
      const valor = elemento.getAttribute(atributo);
      const en = buscar(normal(valor));
      if (en !== null) cambios.push([elemento, atributo, valor, en]);
    }
  }
  if (elemento.matches("svg")) return; // drawings: only their aria-label
  const hijos = [...elemento.children];
  if (hijos.every((hijo) => FORMATO.has(hijo.tagName))) {
    if (normal(elemento.innerHTML)) anotar(elemento, "innerHTML", elemento.innerHTML);
    return;
  }
  for (const nodo of elemento.childNodes) {
    if (nodo.nodeType === Node.TEXT_NODE && normal(nodo.data)) anotar(nodo, "data", nodo.data);
  }
  hijos.forEach(recorrer);
}

function aplicar() {
  for (const [nodo, propiedad, es, en] of cambios) {
    const valor = idioma === "en" ? en : es;
    if (ATRIBUTOS.includes(propiedad)) nodo.setAttribute(propiedad, valor);
    else nodo[propiedad] = valor;
  }
  document.documentElement.lang = idioma;
  const boton = document.getElementById("boton-idioma");
  boton.lang = idioma === "en" ? "es" : "en";
  boton.innerHTML =
    idioma === "en"
      ? 'ES<span class="solo-lector"> versión en español</span>'
      : 'EN<span class="solo-lector"> English version</span>';
}

document.addEventListener("DOMContentLoaded", () => {
  recorrer(document.body);
  const descripcion = document.querySelector('meta[name="description"]');
  for (const [nodo, propiedad, valor] of [
    [document.querySelector("title"), "textContent", document.title],
    [descripcion, "content", descripcion.content],
  ]) {
    const en = buscar(normal(valor));
    if (en !== null) cambios.push([nodo, propiedad, valor, en]);
  }
  aplicar();

  document.getElementById("boton-idioma").addEventListener("click", () => {
    idioma = idioma === "en" ? "es" : "en";
    try {
      localStorage.setItem(CLAVE, idioma);
    } catch {
      // Storage blocked: the switch still works on this page.
    }
    aplicar();
    document.dispatchEvent(new CustomEvent("idioma-cambiado"));
  });
});

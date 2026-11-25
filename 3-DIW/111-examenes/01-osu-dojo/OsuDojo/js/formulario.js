// Sign-up form: own validation messages, error summary at the top (links
// to each field), aria-invalid on wrong fields and a confirmation that
// receives focus. Nothing is sent anywhere.
import { t } from "./idioma.js";

const formulario = document.getElementById("formulario");
const resumen = document.getElementById("resumen-errores");
const confirmacion = document.getElementById("confirmacion");
const mensaje = document.getElementById("mensaje");
const ayudaMensaje = document.getElementById("mensaje-ayuda");

formulario.noValidate = true;

const reglas = {
  nombre: (v) => (v.trim().length >= 3 ? "" : "Escribe tu nombre y apellidos (mínimo 3 letras)."),
  email: (v) =>
    !v.trim()
      ? "Escribe tu correo electrónico."
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? ""
        : "El correo no parece válido: revisa la arroba y el punto, por ejemplo nombre@correo.com.",
  telefono: (v) => (!v.trim() || /^[0-9 +]{9,15}$/.test(v) ? "" : "El teléfono debe tener al menos 9 cifras."),
  edad: () => (formulario.querySelector("input[name=edad]:checked") ? "" : "Elige para quién es la clase."),
  clase: (v) => (v ? "" : "Elige una clase, o «No lo sé, aconsejadme»."),
  privacidad: () => (formulario.elements.privacidad.checked ? "" : "Marca la casilla para continuar."),
};

function comprobar(nombre) {
  const campo = nombre === "edad" ? document.getElementById("edad") : formulario.elements[nombre];
  const error = document.getElementById(`${nombre}-error`);
  const texto = t(reglas[nombre](campo.value ?? ""));
  error.textContent = texto;
  error.hidden = !texto;
  if (nombre === "edad") {
    formulario.querySelectorAll("input[name=edad]").forEach((r) => r.setAttribute("aria-invalid", String(Boolean(texto))));
  } else {
    campo.setAttribute("aria-invalid", String(Boolean(texto)));
  }
  return texto;
}

// Checks every field and fills the summary; returns the number of errors.
function validar() {
  const errores = Object.keys(reglas)
    .map((nombre) => [nombre, comprobar(nombre)])
    .filter(([, texto]) => texto);
  resumen.querySelector("ul").replaceChildren(
    ...errores.map(([nombre, texto]) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${nombre}`;
      a.textContent = texto;
      li.append(a);
      return li;
    }),
  );
  resumen.hidden = errores.length === 0;
  return errores.length;
}

function ayuda() {
  ayudaMensaje.textContent = mensaje.value
    ? t("Te quedan {n} caracteres.", { n: 500 - mensaje.value.length })
    : t("Máximo 500 caracteres.");
}

// Re-check a field when it loses focus, but only after a first attempt.
let intentado = false;
let reserva = null; // { nombre, clase } of the last confirmed booking

function confirmar() {
  confirmacion.innerHTML = "<h2>¡Osu!</h2><p></p>";
  confirmacion.querySelector("p").textContent = t(
    "{nombre}, tu plaza en «{clase}» está reservada (de mentira: es un proyecto de clase). Trae agua y ganas.",
    reserva,
  );
}

formulario.addEventListener("focusout", (e) => {
  const nombre = e.target.name;
  if (intentado && nombre in reglas) comprobar(nombre);
});

mensaje.addEventListener("input", ayuda);

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  intentado = true;
  if (validar()) {
    confirmacion.hidden = true;
    resumen.focus();
    return;
  }
  const clase = formulario.elements.clase;
  reserva = { nombre: formulario.elements.nombre.value.trim().split(" ")[0], clase: clase.options[clase.selectedIndex].text };
  confirmar();
  confirmacion.hidden = false;
  confirmacion.focus();
  formulario.reset();
  intentado = false;
  ayuda();
});

document.addEventListener("idioma-cambiado", () => {
  ayuda();
  if (intentado) validar();
  if (!confirmacion.hidden) confirmar();
});

ayuda();

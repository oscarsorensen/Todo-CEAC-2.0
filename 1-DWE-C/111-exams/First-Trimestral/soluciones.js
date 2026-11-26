// Soluciones de ejercicios.js
// Mira aquí solo después de intentarlo. Compruébalas con: node ejercicios.js --soluciones

// ===== TEMA 2 =====

function arreglarConst() {
  let contador = 0;
  contador = contador + 1;
  return contador;
}

function mayorDeEdad(edad) {
  let mensaje;
  if (edad >= 18) {
    mensaje = "adulto";
  } else {
    mensaje = "menor";
  }
  return mensaje;
}


function tipoReal(valor) {
  if (valor === null) return "null";
  if (Array.isArray(valor)) return "array";
  return typeof valor;
}

function sumarTextos(a, b) {
  return Number(a) + Number(b);
}

function leerPixeles(texto) {
  const numero = parseInt(texto, 10);
  if (Number.isNaN(numero)) return 0;
  return numero;
}

function esNumeroValido(texto) {
  return texto.trim() !== "" && !Number.isNaN(Number(texto));
}

function parOImpar(numero) {
  return numero % 2 === 0 ? "par" : "impar";
}

function saludo(nombre) {
  return "Hola, " + (nombre || "anónimo");
}

function tipoDia(dia) {
  switch (dia) {
    case "sábado":
    case "domingo":
      return "fin de semana";
    case "lunes":
    case "martes":
    case "miércoles":
    case "jueves":
    case "viernes":
      return "laborable";
    default:
      return "desconocido";
  }
}

function precioEntrada(tipo) {
  let precio;
  switch (tipo) {
    case "niño":
      precio = 5;
      break;
    case "jubilado":
      precio = 6;
      break;
    case "adulto":
      precio = 10;
      break;
    default:
      precio = 0;
  }
  return precio;
}

function sumarHasta(numero) {
  let suma = 0;
  for (let i = 1; i <= numero; i++) {
    suma += i;
  }
  return suma;
}

function clavesYValores(objeto) {
  const resultado = [];
  for (const clave in objeto) {
    resultado.push(clave + "=" + objeto[clave]);
  }
  return resultado;
}

function primerNegativo(lista) {
  let posicion = -1;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] < 0) {
      posicion = i;
      break;
    }
  }
  return posicion;
}

function intentosHastaSi(respuestas) {
  let intentos = 0;
  let respuesta;
  do {
    respuesta = respuestas[intentos];
    intentos++;
  } while (respuesta !== "si");
  return intentos;
}

// ===== TEMA 3 =====

class Contacto {
  constructor(nombre, telefono) {
    this.nombre = nombre;
    this.telefono = telefono;
  }

  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
}

class Empleado extends Contacto {
  constructor(nombre, telefono, empresa) {
    super(nombre, telefono);
    this.empresa = empresa;
  }

  saludar() {
    return `Hola, soy ${this.nombre} y trabajo en ${this.empresa}`;
  }
}

function nombreMes(fecha) {
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  return meses[fecha.getMonth()];
}

function diaSiguiente(fecha) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + 1);
}

function esFinDeSemana(fecha) {
  const dia = fecha.getDay();
  return dia === 0 || dia === 6;
}

function gritar(texto) {
  texto = texto.toUpperCase();
  return texto + "!";
}

function iniciales(nombreCompleto) {
  const palabras = nombreCompleto.split(" ");
  let resultado = "";
  for (const palabra of palabras) {
    resultado += palabra.charAt(0).toUpperCase();
  }
  return resultado;
}

function extension(archivo) {
  const punto = archivo.lastIndexOf(".");
  if (punto === -1) return "";
  return archivo.substring(punto + 1);
}

function dado() {
  return Math.floor(Math.random() * 6) + 1;
}

function precioConIva(precio) {
  return Math.round(precio * 1.21 * 100) / 100;
}

function subirEdad(textoJson) {
  const persona = JSON.parse(textoJson);
  persona.edad = persona.edad + 1;
  return JSON.stringify(persona);
}

function leerParametro(direccion, nombre) {
  return new URL(direccion).searchParams.get(nombre);
}

function esperarYDevolver(valor, milisegundos, callback) {
  setTimeout(() => callback(valor), milisegundos);
}

function contarTicks(veces, callback) {
  let ticks = 0;
  const id = setInterval(() => {
    ticks++;
    if (ticks === veces) {
      clearInterval(id);
      callback(ticks);
    }
  }, 20);
}

function procesarRespuesta(respuesta) {
  if (respuesta === null) return "cancelado";
  if (respuesta === "") return "vacío";
  return "Hola, " + respuesta;
}

function guardarPreferencias(almacen, preferencias) {
  almacen.setItem("preferencias", JSON.stringify(preferencias));
}

function leerPreferencias(almacen) {
  const texto = almacen.getItem("preferencias");
  if (texto === null) return {};
  return JSON.parse(texto);
}

// ===== TEMA 4 =====

function binarioADecimal(texto) {
  return parseInt(texto, 2);
}

const multiplicar = (a, b) => a * b;

function presentar(nombre, idioma = "es") {
  if (idioma === "en") return "Hello, " + nombre;
  return "Hola, " + nombre;
}

function aplicarATodos(lista, operacion) {
  const resultado = [];
  for (const elemento of lista) {
    resultado.push(operacion(elemento));
  }
  return resultado;
}

function prepararBoton(boton, saludar) {
  boton.addEventListener("click", saludar);
}

function ultimoElemento(lista) {
  return lista[lista.length - 1];
}

function crearTablero(filas, columnas) {
  return Array.from({ length: filas }, () => Array(columnas).fill(0));
}

function sumaDiagonal(matriz) {
  let suma = 0;
  for (let i = 0; i < matriz.length; i++) {
    suma += matriz[i][i];
  }
  return suma;
}

function quitarElemento(lista, valor) {
  const copia = lista.slice();
  const posicion = copia.indexOf(valor);
  if (posicion !== -1) copia.splice(posicion, 1);
  return copia;
}

function ordenarPrecios(precios) {
  return precios.slice().sort((a, b) => b - a);
}

function ordenarNombres(nombres) {
  return nombres.slice().sort((a, b) => a.localeCompare(b));
}

function nombresDeAdultos(personas) {
  return personas.filter((persona) => persona.edad >= 18).map((persona) => persona.nombre);
}

function totalCarrito(carrito) {
  return carrito.reduce((total, linea) => total + linea.precio * linea.cantidad, 0);
}

class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }

  precioConDescuento(porcentaje) {
    return this.precio - (this.precio * porcentaje) / 100;
  }
}

function ciudadDe(persona) {
  return persona.residencia?.ciudad || "desconocida";
}

function filtrarCampos(objeto, campos) {
  const resultado = {};
  for (const campo of campos) {
    if (campo in objeto) resultado[campo] = objeto[campo];
  }
  return resultado;
}

module.exports = {
  arreglarConst, mayorDeEdad, tipoReal, sumarTextos, leerPixeles, esNumeroValido, parOImpar, saludo,
  tipoDia, precioEntrada, sumarHasta, clavesYValores, primerNegativo, intentosHastaSi,
  Contacto, Empleado, nombreMes, diaSiguiente, esFinDeSemana, gritar, iniciales, extension, dado,
  precioConIva, subirEdad, leerParametro, esperarYDevolver, contarTicks, procesarRespuesta,
  guardarPreferencias, leerPreferencias,
  binarioADecimal, multiplicar, presentar, aplicarATodos, prepararBoton, ultimoElemento, crearTablero,
  sumaDiagonal, quitarElemento, ordenarPrecios, ordenarNombres, nombresDeAdultos, totalCarrito,
  Producto, ciudadDe, filtrarCampos,
};

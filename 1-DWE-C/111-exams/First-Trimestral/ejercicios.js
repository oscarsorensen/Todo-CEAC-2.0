// Ejercicios: Desarrollo Web en Entorno Cliente, Tema 2, 3 y 4
//
// How it works:
//   1. Find an exercise marked TODO (or BUG), read the instructions and write the code.
//   2. Run:  node ejercicios.js            all exercises
//            node ejercicios.js tema3      one tema (tema2 | tema3 | tema4)
//            node ejercicios.js 17         one exercise by number
//   3. Each exercise shows OK, FAIL (with what was expected and what you returned) or TODO.
//   4. Stuck? Read the slide shown, then check soluciones.js as a last resort.
//
// Tips: delete the "// TODO" line when you start an exercise, so it stops showing as TODO.
//       Use console.log inside your function to see what is happening.

// =====================================================================
// TEMA 2: variables, types, operators, decisions, loops
// =====================================================================

// 1. [BUG] Tema 2, slide 4
// This should return 1 but throws an error. Fix it by changing one word.
function arreglarConst() {
  const contador = 0;
  contador = contador + 1;
  return contador;
}

// 2. [BUG] Tema 2, slides 3-5
// mayorDeEdad(20) should return "adulto" and mayorDeEdad(15) "menor". It throws an error. Why?
function mayorDeEdad(edad) {
  if (edad >= 18) {
    let mensaje = "adulto";
  } else {
    let mensaje = "menor";
  }
  return mensaje;
}

// 3. Tema 2, slide 9
// Return the type of the value like typeof does, but "null" for null and "array" for arrays.
// tipoReal(5) -> "number"   tipoReal(null) -> "null"   tipoReal([1]) -> "array"   tipoReal({}) -> "object"
function tipoReal(valor) {
  // TODO
}

// 4. Tema 2, slides 13-14
// Two numbers arrive as text (for example from a form). Return their real sum as a number.
// sumarTextos("5", "7") -> 12   (not "57")
function sumarTextos(a, b) {
  // TODO
}

// 5. Tema 2, slide 14
// Read the number at the start of a CSS value. If there is no number at the start, return 0.
// leerPixeles("250px") -> 250   leerPixeles("12.7px") -> 12   leerPixeles("px") -> 0
// Hint: parseInt with base 10, and Number.isNaN to detect failure.
function leerPixeles(texto) {
  // TODO
}

// 6. Tema 2, slide 14
// true only if the WHOLE text is a number. Careful: Number("") is 0.
// esNumeroValido("42") -> true   esNumeroValido("42px") -> false   esNumeroValido("") -> false
function esNumeroValido(texto) {
  // TODO
}

// 7. Tema 2, slides 16 and 22
// Return "par" or "impar". Use the % operator and the ternary operator (?:), no if.
function parOImpar(numero) {
  // TODO
}

// 8. Tema 2, slide 25
// Return "Hola, Ana". If nombre is empty ("", null, undefined) return "Hola, anónimo".
// Use || in one line, no if.
function saludo(nombre) {
  // TODO
}

// 9. Tema 2, slides 29-30
// Use switch with grouped cases:
// "sábado" / "domingo" -> "fin de semana", "lunes" ... "viernes" -> "laborable", anything else -> "desconocido"
function tipoDia(dia) {
  // TODO
}

// 10. [BUG] Tema 2, slides 29-30
// Prices: "niño" 5, "jubilado" 6, "adulto" 10, anything else 0. The results are wrong. Fix it.
function precioEntrada(tipo) {
  let precio;
  switch (tipo) {
    case "niño":
      precio = 5;
    case "jubilado":
      precio = 6;
      break;
    case "adulto":
      precio = 10;
    default:
      precio = 0;
  }
  return precio;
}

// 11. Tema 2, slides 31-32
// Return 1 + 2 + ... + numero using a for loop.   sumarHasta(5) -> 15   sumarHasta(0) -> 0
function sumarHasta(numero) {
  // TODO
}

// 12. Tema 2, slide 33
// Use for...in to return an array of "clave=valor" texts.
// clavesYValores({ a: 1, b: 2 }) -> ["a=1", "b=2"]
function clavesYValores(objeto) {
  // TODO
}

// 13. Tema 2, slide 36
// Return the index of the first negative number, or -1 if there is none.
// Use a for loop and stop it with break when you find it.
// primerNegativo([3, 5, -2, -7]) -> 2   primerNegativo([1, 2]) -> -1
function primerNegativo(lista) {
  // TODO
}

// 14. Tema 2, slide 35
// respuestas simulates what a user answers each time we ask. Count how many times we must ask
// until the answer is "si". Use do-while (we always ask at least once).
// intentosHastaSi(["no", "no", "si"]) -> 3   intentosHastaSi(["si"]) -> 1
function intentosHastaSi(respuestas) {
  // TODO
}

// =====================================================================
// TEMA 3: classes, native objects, browser
// =====================================================================

// 15. Tema 3, slide 3
// Write the class Contacto: constructor(nombre, telefono) saves both properties,
// and the method saludar() returns "Hola, soy Ana" (with the real name).
class Contacto {
  // TODO
}

// 16. Tema 3, slide 4
// Empleado inherits from Contacto (already written with extends). Add:
// constructor(nombre, telefono, empresa): call super(nombre, telefono) and save empresa.
// saludar() returns "Hola, soy Ana y trabajo en Acme".
class Empleado extends Contacto {
  // TODO
}

// 17. Tema 3, slide 6
// Return the month name in Spanish, lowercase. nombreMes(new Date(2026, 2, 15)) -> "marzo"
// Hint: an array of 12 names + getMonth().
function nombreMes(fecha) {
  // TODO
}

// 18. Tema 3, slide 6
// Return a NEW Date for the next day. Do not modify the date you receive (Date objects are mutable).
// diaSiguiente(new Date(2026, 11, 31)) -> 1 January 2027
// Hint: new Date(año, mes, día + 1) uses date overflow.
function diaSiguiente(fecha) {
  // TODO
}

// 19. Tema 3, slide 7
// true if the date is Saturday or Sunday. Hint: getDay(), Sunday = 0.
function esFinDeSemana(fecha) {
  // TODO
}

// 20. [BUG] Tema 3, slide 8
// gritar("hola") should return "HOLA!" but returns "hola!". Fix it.
function gritar(texto) {
  texto.toUpperCase();
  return texto + "!";
}

// 21. Tema 3, slide 9
// Return the initials in uppercase. iniciales("ana garcía lópez") -> "AGL"
// Hint: split, charAt, toUpperCase.
function iniciales(nombreCompleto) {
  // TODO
}

// 22. Tema 3, slide 9
// Return the extension of a file name, or "" if it has no dot.
// extension("foto.de.vacaciones.jpg") -> "jpg"   extension("README") -> ""
// Hint: lastIndexOf + substring.
function extension(archivo) {
  // TODO
}

// 23. Tema 3, slide 11
// Return a random integer from 1 to 6, like a dice.
function dado() {
  // TODO
}

// 24. Tema 3, slide 11
// Return the price with 21% IVA, rounded to 2 decimals. precioConIva(19.99) -> 24.19
// Hint: Math.round(x * 100) / 100
function precioConIva(precio) {
  // TODO
}

// 25. Tema 3, slide 5
// textoJson is like '{"nombre":"Ana","edad":30}'. Return the same JSON text with edad + 1.
// Hint: JSON.parse, change it, JSON.stringify.
function subirEdad(textoJson) {
  // TODO
}

// 26. Tema 3, slide 13
// Return the value of a query parameter, or null if it does not exist.
// leerParametro("https://tienda.es/buscar?q=zapatos&talla=42", "talla") -> "42"
// Hint: new URL(...).searchParams
function leerParametro(direccion, nombre) {
  // TODO
}

// 27. Tema 3, slides 16-17
// After milisegundos ms, call callback(valor). Use setTimeout.
function esperarYDevolver(valor, milisegundos, callback) {
  // TODO
}

// 28. Tema 3, slide 17
// Use setInterval every 20 ms. Count the ticks; when you reach "veces", stop the interval
// with clearInterval and call callback(veces). The callback must be called only once.
function contarTicks(veces, callback) {
  // TODO
}

// 29. Tema 3, slide 18
// respuesta is what prompt() returned. Return:
// "cancelado" if the user pressed Cancelar, "vacío" if they accepted without writing,
// otherwise "Hola, " + respuesta.
function procesarRespuesta(respuesta) {
  // TODO
}

// 30. Tema 3, slides 29-30
// almacen works like localStorage (setItem / getItem) and only stores TEXT.
// guardarPreferencias saves the object under the key "preferencias".
// leerPreferencias returns the object back, or {} if nothing was saved (getItem returns null).
// Hint: JSON.stringify to save, JSON.parse to read.
function guardarPreferencias(almacen, preferencias) {
  // TODO
}

function leerPreferencias(almacen) {
  // TODO
}

// =====================================================================
// TEMA 4: functions, arrays, objects
// =====================================================================

// 31. Tema 4, slides 3-4
// Convert a binary text to a number. binarioADecimal("101") -> 5
function binarioADecimal(texto) {
  // TODO
}

// 32. Tema 4, slide 6
// Replace null with an ARROW function that multiplies two numbers. multiplicar(3, 4) -> 12
const multiplicar = null; // TODO

// 33. Tema 4, slide 7
// Give idioma the default value "es". Return "Hola, Ana" for "es" and "Hello, Ana" for "en".
// presentar("Ana") -> "Hola, Ana"
function presentar(nombre, idioma) {
  // TODO
}

// 34. Tema 4, slide 8
// operacion is a function. Return a NEW array with operacion applied to each element,
// using a loop (not map). aplicarATodos([1, 2, 3], n => n * 10) -> [10, 20, 30]
function aplicarATodos(lista, operacion) {
  // TODO
}

// 35. [BUG] Tema 4, slide 8
// saludar should run when the button is clicked, not before. Fix it.
function prepararBoton(boton, saludar) {
  boton.addEventListener("click", saludar());
}

// 36. Tema 4, slides 9 and 11
// Return the last element WITHOUT modifying the array (so no pop). Hint: length.
function ultimoElemento(lista) {
  // TODO
}

// 37. Tema 4, slide 12
// Return a 2D array filas x columnas full of 0. Each row must be a different array
// (changing one cell must not change the other rows). crearTablero(2, 3) -> [[0, 0, 0], [0, 0, 0]]
function crearTablero(filas, columnas) {
  // TODO
}

// 38. Tema 4, slides 10 and 16
// Return the sum of the main diagonal of a square matrix.
// sumaDiagonal([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) -> 1 + 5 + 9 = 15
function sumaDiagonal(matriz) {
  // TODO
}

// 39. Tema 4, slide 14
// Return a NEW array without the first occurrence of valor. Do not modify the original.
// quitarElemento(["a", "b", "c", "b"], "b") -> ["a", "c", "b"]
// Hint: slice() to copy, indexOf, splice.
function quitarElemento(lista, valor) {
  // TODO
}

// 40. Tema 4, slide 15
// Return the prices sorted from highest to lowest, without modifying the original.
// ordenarPrecios([10, 1, 5, 25]) -> [25, 10, 5, 1]
function ordenarPrecios(precios) {
  // TODO
}

// 41. Tema 4, slide 15
// Sort names alphabetically, ignoring uppercase and accents.
// ordenarNombres(["Óscar", "ana", "Bea"]) -> ["ana", "Bea", "Óscar"]
function ordenarNombres(nombres) {
  // TODO
}

// 42. Tema 4, slide 17
// personas = [{ nombre: "Ana", edad: 20 }, ...]. Return the names of those aged 18 or more.
// Use filter and map.
function nombresDeAdultos(personas) {
  // TODO
}

// 43. Tema 4, slide 17
// carrito = [{ precio: 2, cantidad: 3 }, { precio: 10, cantidad: 1 }] -> 16. Use reduce.
function totalCarrito(carrito) {
  // TODO
}

// 44. Tema 4, slides 18 and 20
// Class Producto: constructor(nombre, precio) and method precioConDescuento(porcentaje).
// new Producto("Libro", 20).precioConDescuento(25) -> 15
class Producto {
  // TODO
}

// 45. Tema 4, slide 19
// Return persona.residencia.ciudad, or "desconocida" if it is missing. Use ?.
// ciudadDe({ residencia: { ciudad: "Valencia" } }) -> "Valencia"   ciudadDe({}) -> "desconocida"
function ciudadDe(persona) {
  // TODO
}

// 46. Tema 4, slide 21
// Return a NEW object with only the listed fields (skip fields the object does not have).
// filtrarCampos({ nombre: "Ana", edad: 30, email: "a@a.es" }, ["nombre", "email"])
//   -> { nombre: "Ana", email: "a@a.es" }
// Hint: brackets with a variable, objeto[campo], and the in operator.
function filtrarCampos(objeto, campos) {
  // TODO
}

// =====================================================================
// TESTS: no need to touch anything below this line
// =====================================================================

let F = {
  arreglarConst, mayorDeEdad, tipoReal, sumarTextos, leerPixeles, esNumeroValido, parOImpar, saludo,
  tipoDia, precioEntrada, sumarHasta, clavesYValores, primerNegativo, intentosHastaSi,
  Contacto, Empleado, nombreMes, diaSiguiente, esFinDeSemana, gritar, iniciales, extension, dado,
  precioConIva, subirEdad, leerParametro, esperarYDevolver, contarTicks, procesarRespuesta,
  guardarPreferencias, leerPreferencias,
  binarioADecimal, multiplicar, presentar, aplicarATodos, prepararBoton, ultimoElemento, crearTablero,
  sumaDiagonal, quitarElemento, ordenarPrecios, ordenarNombres, nombresDeAdultos, totalCarrito,
  Producto, ciudadDe, filtrarCampos,
};
if (process.argv.includes("--soluciones")) F = require(require("path").join(__dirname, "soluciones.js"));

function formatear(valor) {
  if (typeof valor === "string") return JSON.stringify(valor);
  if (Array.isArray(valor)) return "[" + valor.map(formatear).join(", ") + "]";
  if (valor instanceof Date) {
    return isNaN(valor) ? "Invalid Date" : `Date(${valor.getFullYear()}-${valor.getMonth() + 1}-${valor.getDate()})`;
  }
  if (valor && typeof valor === "object") {
    return "{ " + Object.keys(valor).map((clave) => `${clave}: ${formatear(valor[clave])}`).join(", ") + " }";
  }
  return String(valor);
}

function pendiente(...nombres) {
  return nombres.some((nombre) => {
    const valor = F[nombre];
    return typeof valor !== "function" || valor.toString().includes("// TODO");
  });
}

const pruebas = [
  // Each test returns a list of [description, value you returned, expected value]
  { n: 1, tema: 2, slide: 4, fns: ["arreglarConst"], probar: () => [["arreglarConst()", F.arreglarConst(), 1]] },
  { n: 2, tema: 2, slide: "3-5", fns: ["mayorDeEdad"], probar: () => [
    ["mayorDeEdad(20)", F.mayorDeEdad(20), "adulto"],
    ["mayorDeEdad(15)", F.mayorDeEdad(15), "menor"],
  ] },
  { n: 3, tema: 2, slide: 9, fns: ["tipoReal"], probar: () => [
    ["tipoReal(5)", F.tipoReal(5), "number"],
    ["tipoReal(null)", F.tipoReal(null), "null"],
    ["tipoReal([1])", F.tipoReal([1]), "array"],
    ["tipoReal({})", F.tipoReal({}), "object"],
    ['tipoReal("hola")', F.tipoReal("hola"), "string"],
  ] },
  { n: 4, tema: 2, slide: "13-14", fns: ["sumarTextos"], probar: () => [
    ['sumarTextos("5", "7")', F.sumarTextos("5", "7"), 12],
    ['sumarTextos("10", "0.5")', F.sumarTextos("10", "0.5"), 10.5],
  ] },
  { n: 5, tema: 2, slide: 14, fns: ["leerPixeles"], probar: () => [
    ['leerPixeles("250px")', F.leerPixeles("250px"), 250],
    ['leerPixeles("12.7px")', F.leerPixeles("12.7px"), 12],
    ['leerPixeles("px")', F.leerPixeles("px"), 0],
  ] },
  { n: 6, tema: 2, slide: 14, fns: ["esNumeroValido"], probar: () => [
    ['esNumeroValido("42")', F.esNumeroValido("42"), true],
    ['esNumeroValido("3.5")', F.esNumeroValido("3.5"), true],
    ['esNumeroValido("42px")', F.esNumeroValido("42px"), false],
    ['esNumeroValido("")', F.esNumeroValido(""), false],
  ] },
  { n: 7, tema: 2, slide: "16, 22", fns: ["parOImpar"], probar: () => [
    ["parOImpar(4)", F.parOImpar(4), "par"],
    ["parOImpar(7)", F.parOImpar(7), "impar"],
    ["uses the ternary ?:", F.parOImpar.toString().includes("?"), true],
  ] },
  { n: 8, tema: 2, slide: 25, fns: ["saludo"], probar: () => [
    ['saludo("Ana")', F.saludo("Ana"), "Hola, Ana"],
    ['saludo("")', F.saludo(""), "Hola, anónimo"],
    ["saludo()", F.saludo(), "Hola, anónimo"],
    ["uses ||", F.saludo.toString().includes("||"), true],
  ] },
  { n: 9, tema: 2, slide: "29-30", fns: ["tipoDia"], probar: () => [
    ['tipoDia("domingo")', F.tipoDia("domingo"), "fin de semana"],
    ['tipoDia("sábado")', F.tipoDia("sábado"), "fin de semana"],
    ['tipoDia("miércoles")', F.tipoDia("miércoles"), "laborable"],
    ['tipoDia("lunes")', F.tipoDia("lunes"), "laborable"],
    ['tipoDia("festivo")', F.tipoDia("festivo"), "desconocido"],
    ["uses switch", F.tipoDia.toString().includes("switch"), true],
  ] },
  { n: 10, tema: 2, slide: "29-30", fns: ["precioEntrada"], probar: () => [
    ['precioEntrada("niño")', F.precioEntrada("niño"), 5],
    ['precioEntrada("jubilado")', F.precioEntrada("jubilado"), 6],
    ['precioEntrada("adulto")', F.precioEntrada("adulto"), 10],
    ['precioEntrada("gato")', F.precioEntrada("gato"), 0],
  ] },
  { n: 11, tema: 2, slide: "31-32", fns: ["sumarHasta"], probar: () => [
    ["sumarHasta(5)", F.sumarHasta(5), 15],
    ["sumarHasta(0)", F.sumarHasta(0), 0],
    ["sumarHasta(100)", F.sumarHasta(100), 5050],
  ] },
  { n: 12, tema: 2, slide: 33, fns: ["clavesYValores"], probar: () => [
    ["clavesYValores({ a: 1, b: 2 })", F.clavesYValores({ a: 1, b: 2 }), ["a=1", "b=2"]],
    ["uses for...in", / in /.test(F.clavesYValores.toString()), true],
  ] },
  { n: 13, tema: 2, slide: 36, fns: ["primerNegativo"], probar: () => [
    ["primerNegativo([3, 5, -2, -7])", F.primerNegativo([3, 5, -2, -7]), 2],
    ["primerNegativo([1, 2])", F.primerNegativo([1, 2]), -1],
    ["uses break", F.primerNegativo.toString().includes("break"), true],
  ] },
  { n: 14, tema: 2, slide: 35, fns: ["intentosHastaSi"], probar: () => [
    ['intentosHastaSi(["no", "no", "si"])', F.intentosHastaSi(["no", "no", "si"]), 3],
    ['intentosHastaSi(["si"])', F.intentosHastaSi(["si"]), 1],
    ["uses do-while", /do\s*\{/.test(F.intentosHastaSi.toString()), true],
  ] },

  { n: 15, tema: 3, slide: 3, fns: ["Contacto"], probar: () => {
    const ana = new F.Contacto("Ana", "600111222");
    return [
      ["ana.nombre", ana.nombre, "Ana"],
      ["ana.telefono", ana.telefono, "600111222"],
      ["ana.saludar()", ana.saludar(), "Hola, soy Ana"],
    ];
  } },
  { n: 16, tema: 3, slide: 4, fns: ["Contacto", "Empleado"], probar: () => {
    const luis = new F.Empleado("Luis", "600333444", "Acme");
    return [
      ["luis.nombre", luis.nombre, "Luis"],
      ["luis.empresa", luis.empresa, "Acme"],
      ["luis.saludar()", luis.saludar(), "Hola, soy Luis y trabajo en Acme"],
      ["luis instanceof Contacto", luis instanceof F.Contacto, true],
    ];
  } },
  { n: 17, tema: 3, slide: 6, fns: ["nombreMes"], probar: () => [
    ["nombreMes(new Date(2026, 2, 15))", F.nombreMes(new Date(2026, 2, 15)), "marzo"],
    ["nombreMes(new Date(2026, 0, 1))", F.nombreMes(new Date(2026, 0, 1)), "enero"],
    ["nombreMes(new Date(2026, 11, 25))", F.nombreMes(new Date(2026, 11, 25)), "diciembre"],
  ] },
  { n: 18, tema: 3, slide: 6, fns: ["diaSiguiente"], probar: () => {
    const nochevieja = new Date(2026, 11, 31);
    const resultado = F.diaSiguiente(nochevieja);
    return [
      ["diaSiguiente(31 Dec 2026)", resultado, new Date(2027, 0, 1)],
      ["original not modified", nochevieja, new Date(2026, 11, 31)],
      ["diaSiguiente(28 Feb 2026)", F.diaSiguiente(new Date(2026, 1, 28)), new Date(2026, 2, 1)],
    ];
  } },
  { n: 19, tema: 3, slide: 7, fns: ["esFinDeSemana"], probar: () => [
    ["Sunday 29 Nov 2026", F.esFinDeSemana(new Date(2026, 10, 29)), true],
    ["Saturday 28 Nov 2026", F.esFinDeSemana(new Date(2026, 10, 28)), true],
    ["Wednesday 25 Nov 2026", F.esFinDeSemana(new Date(2026, 10, 25)), false],
  ] },
  { n: 20, tema: 3, slide: 8, fns: ["gritar"], probar: () => [['gritar("hola")', F.gritar("hola"), "HOLA!"]] },
  { n: 21, tema: 3, slide: 9, fns: ["iniciales"], probar: () => [
    ['iniciales("ana garcía lópez")', F.iniciales("ana garcía lópez"), "AGL"],
    ['iniciales("Pedro")', F.iniciales("Pedro"), "P"],
  ] },
  { n: 22, tema: 3, slide: 9, fns: ["extension"], probar: () => [
    ['extension("foto.de.vacaciones.jpg")', F.extension("foto.de.vacaciones.jpg"), "jpg"],
    ['extension("README")', F.extension("README"), ""],
  ] },
  { n: 23, tema: 3, slide: 11, fns: ["dado"], probar: () => {
    const tiradas = Array.from({ length: 3000 }, () => F.dado());
    const distintos = new Set(tiradas);
    return [
      ["all results are integers 1-6", tiradas.every((t) => Number.isInteger(t) && t >= 1 && t <= 6), true],
      ["all 6 numbers appear in 3000 throws", distintos.size, 6],
    ];
  } },
  { n: 24, tema: 3, slide: 11, fns: ["precioConIva"], probar: () => [
    ["precioConIva(10)", F.precioConIva(10), 12.1],
    ["precioConIva(19.99)", F.precioConIva(19.99), 24.19],
  ] },
  { n: 25, tema: 3, slide: 5, fns: ["subirEdad"], probar: () => [
    ["subirEdad('{\"nombre\":\"Ana\",\"edad\":30}')", F.subirEdad('{"nombre":"Ana","edad":30}'), '{"nombre":"Ana","edad":31}'],
  ] },
  { n: 26, tema: 3, slide: 13, fns: ["leerParametro"], probar: () => {
    const direccion = "https://tienda.es/buscar?q=zapatos&talla=42";
    return [
      ['leerParametro(..., "talla")', F.leerParametro(direccion, "talla"), "42"],
      ['leerParametro(..., "q")', F.leerParametro(direccion, "q"), "zapatos"],
      ['leerParametro(..., "color")', F.leerParametro(direccion, "color"), null],
    ];
  } },
  { n: 27, tema: 3, slide: "16-17", fns: ["esperarYDevolver"], probar: () => new Promise((resolver) => {
    const inicio = Date.now();
    const limite = setTimeout(() => resolver([["callback was called", false, true]]), 1000);
    F.esperarYDevolver("listo", 100, (valor) => {
      clearTimeout(limite);
      resolver([
        ["callback receives", valor, "listo"],
        ["waited at least 100 ms", Date.now() - inicio >= 99, true],
      ]);
    });
  }) },
  { n: 28, tema: 3, slide: 17, fns: ["contarTicks"], probar: () => new Promise((resolver) => {
    const clearOriginal = global.clearInterval;
    let limpiezas = 0;
    global.clearInterval = (id) => { limpiezas++; clearOriginal(id); };
    const llamadas = [];
    F.contarTicks(3, (total) => llamadas.push(total));
    setTimeout(() => {
      global.clearInterval = clearOriginal;
      resolver([
        ["callback called exactly once", llamadas.length, 1],
        ["callback receives", llamadas[0], 3],
        ["clearInterval was used", limpiezas > 0, true],
      ]);
    }, 400);
  }) },
  { n: 29, tema: 3, slide: 18, fns: ["procesarRespuesta"], probar: () => [
    ["Cancelar (prompt returned null)", F.procesarRespuesta(null), "cancelado"],
    ['Aceptar without writing ("")', F.procesarRespuesta(""), "vacío"],
    ['wrote "Ana"', F.procesarRespuesta("Ana"), "Hola, Ana"],
  ] },
  { n: 30, tema: 3, slide: "29-30", fns: ["guardarPreferencias", "leerPreferencias"], probar: () => {
    const datos = {};
    const almacen = {
      setItem(clave, valor) { datos[clave] = String(valor); },
      getItem(clave) { return clave in datos ? datos[clave] : null; },
    };
    const vacio = F.leerPreferencias(almacen);
    F.guardarPreferencias(almacen, { tema: "oscuro", tamaño: 16 });
    return [
      ["leer when nothing saved", vacio, {}],
      ['stored under "preferencias" as JSON text', datos.preferencias, '{"tema":"oscuro","tamaño":16}'],
      ["leer after guardar", F.leerPreferencias(almacen), { tema: "oscuro", tamaño: 16 }],
    ];
  } },

  { n: 31, tema: 4, slide: "3-4", fns: ["binarioADecimal"], probar: () => [
    ['binarioADecimal("101")', F.binarioADecimal("101"), 5],
    ['binarioADecimal("1111")', F.binarioADecimal("1111"), 15],
  ] },
  { n: 32, tema: 4, slide: 6, fns: ["multiplicar"], probar: () => [
    ["multiplicar(3, 4)", F.multiplicar(3, 4), 12],
    ["is an arrow function", F.multiplicar.toString().includes("=>"), true],
  ] },
  { n: 33, tema: 4, slide: 7, fns: ["presentar"], probar: () => [
    ['presentar("Ana")', F.presentar("Ana"), "Hola, Ana"],
    ['presentar("Ana", "en")', F.presentar("Ana", "en"), "Hello, Ana"],
    ['presentar("Ana", "es")', F.presentar("Ana", "es"), "Hola, Ana"],
    ['uses default value idioma = "es"', /idioma\s*=\s*["']es["']/.test(F.presentar.toString()), true],
  ] },
  { n: 34, tema: 4, slide: 8, fns: ["aplicarATodos"], probar: () => {
    const lista = [1, 2, 3];
    return [
      ["aplicarATodos([1, 2, 3], n => n * 10)", F.aplicarATodos(lista, (n) => n * 10), [10, 20, 30]],
      ["original not modified", lista, [1, 2, 3]],
      ["does not use map", F.aplicarATodos.toString().includes(".map"), false],
    ];
  } },
  { n: 35, tema: 4, slide: 8, fns: ["prepararBoton"], probar: () => {
    const llamadas = [];
    const boton = { escuchas: [], addEventListener(evento, funcion) { this.escuchas.push([evento, funcion]); } };
    F.prepararBoton(boton, () => llamadas.push("hola"));
    const antes = llamadas.length;
    const escucha = boton.escuchas[0] || [];
    if (typeof escucha[1] === "function") escucha[1]();
    return [
      ["saludar has NOT run before the click", antes, 0],
      ["listener registered for", escucha[0], "click"],
      ["listener is a function", typeof escucha[1], "function"],
      ["saludar runs on click", llamadas.length, 1],
    ];
  } },
  { n: 36, tema: 4, slide: "9, 11", fns: ["ultimoElemento"], probar: () => {
    const lista = [1, 2, 3];
    return [
      ["ultimoElemento([1, 2, 3])", F.ultimoElemento(lista), 3],
      ["original not modified", lista, [1, 2, 3]],
      ["ultimoElemento([])", F.ultimoElemento([]), undefined],
    ];
  } },
  { n: 37, tema: 4, slide: 12, fns: ["crearTablero"], probar: () => {
    const tablero = F.crearTablero(2, 3);
    const inicial = formatear(tablero);
    tablero[0][0] = 9;
    return [
      ["crearTablero(2, 3)", inicial, formatear([[0, 0, 0], [0, 0, 0]])],
      ["after tablero[0][0] = 9, row 1 is", tablero[1], [0, 0, 0]],
    ];
  } },
  { n: 38, tema: 4, slide: "10, 16", fns: ["sumaDiagonal"], probar: () => [
    ["sumaDiagonal(3x3 from 1 to 9)", F.sumaDiagonal([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), 15],
    ["sumaDiagonal([[5]])", F.sumaDiagonal([[5]]), 5],
  ] },
  { n: 39, tema: 4, slide: 14, fns: ["quitarElemento"], probar: () => {
    const letras = ["a", "b", "c", "b"];
    return [
      ['quitarElemento(["a", "b", "c", "b"], "b")', F.quitarElemento(letras, "b"), ["a", "c", "b"]],
      ["original not modified", letras, ["a", "b", "c", "b"]],
      ['quitarElemento(["a"], "z")', F.quitarElemento(["a"], "z"), ["a"]],
    ];
  } },
  { n: 40, tema: 4, slide: 15, fns: ["ordenarPrecios"], probar: () => {
    const precios = [10, 1, 5, 25];
    return [
      ["ordenarPrecios([10, 1, 5, 25])", F.ordenarPrecios(precios), [25, 10, 5, 1]],
      ["original not modified", precios, [10, 1, 5, 25]],
    ];
  } },
  { n: 41, tema: 4, slide: 15, fns: ["ordenarNombres"], probar: () => [
    ['ordenarNombres(["Óscar", "ana", "Bea"])', F.ordenarNombres(["Óscar", "ana", "Bea"]), ["ana", "Bea", "Óscar"]],
  ] },
  { n: 42, tema: 4, slide: 17, fns: ["nombresDeAdultos"], probar: () => [
    ["3 people, 2 adults",
      F.nombresDeAdultos([{ nombre: "Ana", edad: 20 }, { nombre: "Leo", edad: 12 }, { nombre: "Eva", edad: 18 }]),
      ["Ana", "Eva"]],
    ["uses filter and map", /\.filter[\s\S]*\.map/.test(F.nombresDeAdultos.toString()), true],
  ] },
  { n: 43, tema: 4, slide: 17, fns: ["totalCarrito"], probar: () => [
    ["2 lines", F.totalCarrito([{ precio: 2, cantidad: 3 }, { precio: 10, cantidad: 1 }]), 16],
    ["empty cart", F.totalCarrito([]), 0],
    ["uses reduce", F.totalCarrito.toString().includes("reduce"), true],
  ] },
  { n: 44, tema: 4, slide: "18, 20", fns: ["Producto"], probar: () => {
    const libro = new F.Producto("Libro", 20);
    return [
      ["libro.nombre", libro.nombre, "Libro"],
      ["libro.precio", libro.precio, 20],
      ["libro.precioConDescuento(25)", libro.precioConDescuento(25), 15],
    ];
  } },
  { n: 45, tema: 4, slide: 19, fns: ["ciudadDe"], probar: () => [
    ['ciudadDe({ residencia: { ciudad: "Valencia" } })', F.ciudadDe({ residencia: { ciudad: "Valencia" } }), "Valencia"],
    ["ciudadDe({})", F.ciudadDe({}), "desconocida"],
    ["uses ?.", F.ciudadDe.toString().includes("?."), true],
  ] },
  { n: 46, tema: 4, slide: 21, fns: ["filtrarCampos"], probar: () => {
    const persona = { nombre: "Ana", edad: 30, email: "a@a.es" };
    return [
      ['filtrarCampos(persona, ["nombre", "email"])', F.filtrarCampos(persona, ["nombre", "email"]), { nombre: "Ana", email: "a@a.es" }],
      ['filtrarCampos(persona, ["telefono"])', F.filtrarCampos(persona, ["telefono"]), {}],
      ["original not modified", persona, { nombre: "Ana", edad: 30, email: "a@a.es" }],
    ];
  } },
];

async function ejecutarPruebas() {
  const argumentos = process.argv.slice(2);
  const filtroTema = argumentos.find((a) => /^tema[234]$/.test(a));
  const filtroNumero = parseInt(argumentos.find((a) => /^\d+$/.test(a)), 10);

  let seleccion = pruebas;
  if (filtroTema) seleccion = seleccion.filter((p) => p.tema === Number(filtroTema.slice(4)));
  if (filtroNumero) seleccion = seleccion.filter((p) => p.n === filtroNumero);

  const cuenta = { ok: 0, fail: 0, todo: 0 };
  let temaActual = null;

  for (const prueba of seleccion) {
    if (prueba.tema !== temaActual) {
      temaActual = prueba.tema;
      console.log(`\n===== TEMA ${temaActual} =====`);
    }
    const etiqueta = `${String(prueba.n).padStart(2)}. ${prueba.fns.join(" + ")}`;

    if (pendiente(...prueba.fns)) {
      cuenta.todo++;
      console.log(`  TODO  ${etiqueta}`);
      continue;
    }

    let comprobaciones;
    try {
      comprobaciones = await prueba.probar();
    } catch (error) {
      comprobaciones = [["running your code", `Error (${error.name}: ${error.message})`, "no error"]];
    }

    const fallos = comprobaciones.filter(([, real, esperado]) => formatear(real) !== formatear(esperado));
    if (fallos.length === 0) {
      cuenta.ok++;
      console.log(`  OK    ${etiqueta}`);
    } else {
      cuenta.fail++;
      console.log(`  FAIL  ${etiqueta}   -> review Tema ${prueba.tema}, slide ${prueba.slide}`);
      for (const [descripcion, real, esperado] of fallos) {
        const textoReal = typeof real === "string" && real.startsWith("Error (") ? real : formatear(real);
        console.log(`          ${descripcion}: expected ${formatear(esperado)}, got ${textoReal}`);
      }
    }
  }

  console.log(`\nOK ${cuenta.ok}  |  FAIL ${cuenta.fail}  |  TODO ${cuenta.todo}  (of ${seleccion.length})`);
  process.exit(0);
}

ejecutarPruebas();

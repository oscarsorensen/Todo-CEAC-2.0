// Quiz for Desarrollo Web en Entorno Cliente: Tema 2, 3 and 4
//
// Two sets of questions:
//   exam set: short, one idea per question, like the real exam (default)
//   hard set: longer snippets that combine several ideas (add the word "hard")
//
// How to use:
//   node quiz.js            exam set, all temas, random order
//   node quiz.js tema3      only one tema (tema2 | tema3 | tema4)
//   node quiz.js 15         only 15 random questions
//   node quiz.js tema4 8    combine both
//   node quiz.js hard       hard set (also works with tema and number: node quiz.js hard tema2 5)
//   node quiz.js all        both sets mixed
//   node quiz.js tema3 slides=3-5    only the questions from slides 3 to 5 (what you have read so far)
//   node quiz.js tema2 8 slides=26-37  combine all of it
//
// Answer with a, b, c or d. Press Enter with no letter to leave it blank. Type q to stop.
// Scoring works like the exam: +1 correct, -0.10 wrong, 0 blank.
// After each code question the code is really executed, so you see what JavaScript returns.
// Questions you get wrong or leave blank are asked again at the end until you get them right.

const readline = require("readline/promises");

// ---------- Questions ----------
// code:    the snippet shown and executed (null = theory question, nothing to run)
// options: the 4 options; the first one is always the correct one (they get shuffled)

// ---------- HARD SET ----------
const preguntasDificiles = [
  // ===== TEMA 2 =====
  {
    tema: 2, slide: 4,
    question: "What does this return?",
    code: `const lista = [];
lista.push(1);
let resultado = lista.length;
if (true) {
  let resultado = 99;
}
return resultado;`,
    options: ["1", "99", "Error (TypeError)", "Error (SyntaxError)"],
    why: "const blocks reassigning the variable, not changing its content, so push works. The inner let only exists inside the if block.",
  },
  {
    tema: 2, slide: 4,
    question: "What does this return?",
    code: `function probar() {
  const antes = typeof valor;
  var valor = 5;
  return antes;
}
return probar();`,
    options: ['"undefined"', '"number"', "undefined", "Error (ReferenceError)"],
    why: "var is hoisted: it exists before its line and is undefined. typeof always returns a string, so the result is \"undefined\" (with quotes). With let it would be a ReferenceError (temporal dead zone).",
  },
  {
    tema: 2, slide: 5,
    question: "What does this return? (no \"use strict\")",
    code: `function sumar() {
  total = 10;
}
sumar();
return total;`,
    options: ["10", "undefined", "Error (ReferenceError)", "null"],
    why: "Assigning to a variable that was never declared creates an implicit global. In strict mode it would be an error.",
  },
  {
    tema: 2, slide: 6,
    question: "Which variable name is NOT valid?",
    code: null,
    options: ["1erPuesto", "$precio", "_total", "totalConIva"],
    why: "Names may contain letters, digits, _ and $, but cannot start with a digit.",
  },
  {
    tema: 2, slide: 9,
    question: "What does this return?",
    code: `return [typeof null, typeof [], typeof NaN, typeof function () {}];`,
    options: [
      '["object", "object", "number", "function"]',
      '["null", "array", "NaN", "function"]',
      '["object", "array", "number", "object"]',
      '["null", "object", "undefined", "function"]',
    ],
    why: "typeof null is \"object\" (historical bug). Arrays are objects (use Array.isArray). NaN is of type number. Functions give \"function\".",
  },
  {
    tema: 2, slide: 13,
    question: "What does this return?",
    code: `return [1 + 2 + "3", "3" + 1 + 2, "5" - 2, true + 1];`,
    options: [
      '["33", "312", 3, 2]',
      '["123", "312", "52", 2]',
      '["33", "33", 3, "true1"]',
      '[6, 6, 3, 2]',
    ],
    why: "Evaluated left to right. + with a string concatenates; -, *, / and % convert to number. true becomes 1.",
  },
  {
    tema: 2, slide: 14,
    question: "What does this return?",
    code: `return [parseInt("42px"), Number("42px"), parseInt("px42"), parseFloat("3.5€")];`,
    options: ["[42, NaN, NaN, 3.5]", "[42, 42, 42, 3.5]", "[42, NaN, 0, 3]", "[NaN, NaN, NaN, NaN]"],
    why: "parseInt/parseFloat read until the first invalid character; if the first one is already invalid you get NaN (not 0). Number needs the whole text to be numeric.",
  },
  {
    tema: 2, slide: 17,
    question: "What does this return?",
    code: `return ["5" == 5, "5" === 5, null == undefined, NaN === NaN];`,
    options: ["[true, false, true, false]", "[true, true, true, true]", "[false, false, false, false]", "[true, false, false, true]"],
    why: "== converts types before comparing, === does not. NaN is not equal to anything, not even itself (use Number.isNaN).",
  },
  {
    tema: 2, slide: 19,
    question: "What does this return?",
    code: `let x = 5;
const a = x++;
const b = ++x;
return [a, b, x];`,
    options: ["[5, 7, 7]", "[6, 7, 7]", "[5, 6, 6]", "[6, 6, 7]"],
    why: "x++ returns the old value and then increments. ++x increments first and returns the new value.",
  },
  {
    tema: 2, slide: 25,
    question: "What does this return?",
    code: `const nombre = "";
return [nombre || "anónimo", "hola" && 0, 0 || null];`,
    options: ['["anónimo", 0, null]', '[true, false, false]', '["", true, null]', '["anónimo", false, 0]'],
    why: "&& and || short-circuit and return one of the operands, not necessarily a boolean. || returns the first truthy value (or the last one); && returns the first falsy value (or the last one).",
  },
  {
    tema: 2, slide: 29,
    question: "What does this return?",
    code: `let texto = "";
const dia = 2;
switch (dia) {
  case 1: texto += "A";
  case 2: texto += "B";
  case 3: texto += "C"; break;
  default: texto += "D";
}
return texto;`,
    options: ['"BC"', '"B"', '"BCD"', '"ABC"'],
    why: "Without break, execution continues into the next case until a break or the end of the switch.",
  },
  {
    tema: 2, slide: 30,
    question: "What does this return?",
    code: `const valor = "2";
switch (valor) {
  case 2: return "número";
  case "2": return "texto";
  default: return "ninguno";
}`,
    options: ['"texto"', '"número"', '"ninguno"', "Error (TypeError)"],
    why: "switch compares cases with strict equality (===), so \"2\" does not match 2.",
  },
  {
    tema: 2, slide: 35,
    question: "What does this return?",
    code: `const i = 10;
let vecesWhile = 0;
let vecesDo = 0;
while (i < 5) { vecesWhile++; }
do { vecesDo++; } while (i < 5);
return [vecesWhile, vecesDo];`,
    options: ["[0, 1]", "[0, 0]", "[1, 1]", "[1, 0]"],
    why: "while checks the condition first. do-while checks it at the end, so its body always runs at least once.",
  },
  {
    tema: 2, slide: 33,
    question: "What does this return?",
    code: `const dias = ["lun", "mar", "mié"];
const claves = [];
const valores = [];
for (const c in dias) claves.push(c);
for (const v of dias) {
  if (v === "mar") continue;
  valores.push(v);
}
return [claves, valores];`,
    options: [
      '[["0", "1", "2"], ["lun", "mié"]]',
      '[[0, 1, 2], ["lun"]]',
      '[["lun", "mar", "mié"], ["lun", "mié"]]',
      '[["0", "1", "2"], ["lun"]]',
    ],
    why: "for...in gives the keys (indexes as text), for...of gives the values. continue skips to the next iteration (break would stop the loop). Slide 36 covers break/continue.",
  },

  // ===== TEMA 3 =====
  {
    tema: 3, slide: 4,
    question: "What does this return?",
    code: `class Animal {
  constructor(nombre) { this.nombre = nombre; }
  hablar() { return this.nombre + " hace un sonido"; }
}
class Perro extends Animal {
  hablar() { return this.nombre + " ladra"; }
}
const mascotas = [new Animal("Gato"), new Perro("Rex")];
return mascotas.map(m => m.hablar());`,
    options: [
      '["Gato hace un sonido", "Rex ladra"]',
      '["Gato hace un sonido", "Rex hace un sonido"]',
      '["undefined hace un sonido", "Rex ladra"]',
      "Error (TypeError)",
    ],
    why: "Perro inherits the constructor from Animal with extends and overrides hablar(). Same method, different behaviour per object = polymorphism. this.nombre refers to the object's own property.",
  },
  {
    tema: 3, slide: 4,
    question: "In the slides, how is encapsulation done in JavaScript?",
    code: null,
    options: [
      "Private fields (starting with _) and getters",
      "With the keyword implements",
      "Inheriting from several classes at once",
      "Declaring properties with var",
    ],
    why: "Encapsulation hides internal details. Also on this slide: JS only has single inheritance (multiple is simulated with mixins).",
  },
  {
    tema: 3, slide: 6,
    question: "What does this return?",
    code: `const fecha = new Date(2026, 4, 32);
return [fecha.getMonth(), fecha.getDate()];`,
    options: ["[5, 1]", "[4, 32]", "[6, 1]", "Error (RangeError)"],
    why: "Months start at 0 (4 = May). Dates overflow instead of failing: 32 May becomes 1 June, which is month 5.",
  },
  {
    tema: 3, slide: 7,
    question: "Sunday 29 November 2026. What does this return?",
    code: `const fecha = new Date(2026, 10, 29);
return [fecha.getMonth(), fecha.getDay(), fecha.getDate()];`,
    options: ["[10, 0, 29]", "[11, 7, 29]", "[10, 7, 29]", "[11, 0, 29]"],
    why: "getMonth starts at 0 (November = 10). getDay is the weekday and Sunday = 0. getDate is the day of the month.",
  },
  {
    tema: 3, slide: 8,
    question: "What does this return?",
    code: `let nombre = "ana";
nombre.toUpperCase();
const copia = nombre.concat("!");
return [nombre, copia];`,
    options: ['["ana", "ana!"]', '["ANA", "ANA!"]', '["ana!", "ana!"]', '["ANA", "ana!"]'],
    why: "Strings are immutable: their methods return a new string and do not change the original. You need nombre = nombre.toUpperCase().",
  },
  {
    tema: 3, slide: 9,
    question: "What does this return?",
    code: `const texto = "hola mundo";
return [texto.indexOf("o"), texto.lastIndexOf("o"), texto.indexOf("z"), texto.substring(0, 4)];`,
    options: ['[1, 9, -1, "hola"]', '[2, 10, null, "hola "]', '[1, 9, undefined, "hol"]', '[1, 1, -1, "hola"]'],
    why: "Positions start at 0. Not found returns -1. substring(inicio, fin) does not include fin.",
  },
  {
    tema: 3, slide: 9,
    question: "What does this return?",
    code: `const guiones = "a-b-c";
return [guiones.split("-", 2), guiones.replace("-", "+"), guiones.charAt(1)];`,
    options: [
      '[["a", "b"], "a+b-c", "-"]',
      '[["a", "b-c"], "a+b+c", "b"]',
      '[["a", "b", "c"], "a+b+c", "-"]',
      '[["a", "b"], "a+b+c", "b"]',
    ],
    why: "The second argument of split limits the number of pieces. replace with a text only replaces the first match. charAt(1) is the second character.",
  },
  {
    tema: 3, slide: 11,
    question: "What does this return?",
    code: `return [Math.ceil(4.1), Math.floor(4.9), Math.round(4.5), Math.max(3, 8)];`,
    options: ["[5, 4, 5, 8]", "[4, 5, 4, 8]", "[5, 4, 4, 3]", "[4, 4, 5, 8]"],
    why: "ceil rounds up, floor rounds down, round goes to the nearest integer (.5 goes up).",
  },
  {
    tema: 3, slide: 11,
    question: "Which expression gives a random integer from 1 to 6 (a dice)?",
    code: null,
    options: [
      "Math.floor(Math.random() * 6) + 1",
      "Math.random(1, 6)",
      "Math.floor(Math.random() * 6)",
      "Math.ceil(Math.random()) * 6",
    ],
    why: "Math.random() returns a decimal between 0 and 1 (never 1). Times 6 gives 0 to 5.99, floor gives 0-5, +1 gives 1-6.",
  },
  {
    tema: 3, slide: 5,
    question: "What does this return?",
    code: `const datos = JSON.parse('{"nombre": "Ana", "edad": 30}');
return [datos.edad + 1, typeof JSON.stringify(datos)];`,
    options: ['[31, "string"]', '["301", "object"]', '[31, "object"]', "Error (SyntaxError)"],
    why: "JSON.parse turns JSON text into an object (edad stays a number). JSON.stringify does the opposite and returns text.",
  },
  {
    tema: 3, slide: 13,
    question: "What does this return?",
    code: `const direccion = new URL("https://tienda.es/productos?id=7&color=rojo");
return [direccion.hostname, direccion.pathname, direccion.searchParams.get("color")];`,
    options: [
      '["tienda.es", "/productos", "rojo"]',
      '["https://tienda.es", "productos", "color=rojo"]',
      '["tienda.es", "/productos?id=7", "rojo"]',
      '["tienda", "/productos", undefined]',
    ],
    why: "new URL splits protocol, domain, path and parameters. URLSearchParams (searchParams) reads the query parameters.",
  },
  {
    tema: 3, slide: 17,
    question: "What does this return?",
    code: `const orden = [];
setTimeout(() => orden.push("timeout"), 0);
orden.push("después");
return orden;`,
    options: ['["después"]', '["timeout", "después"]', '["después", "timeout"]', '["timeout"]'],
    why: "The time in setTimeout is a minimum, not exact: the function waits until the browser is free. Even with 0 ms it runs after the current code.",
  },
  {
    tema: 3, slide: 18,
    question: "The user presses Cancelar in both dialogs. What is respuestas?\n  const respuestas = [prompt(\"Nombre?\"), confirm(\"Seguro?\")];",
    code: null,
    options: ["[null, false]", '["", false]', "[undefined, undefined]", "[false, null]"],
    why: "prompt returns the typed text, or null if cancelled. confirm returns true or false. alert returns undefined.",
  },
  {
    tema: 3, slide: 15,
    question: "Inside a window opened with window.open(), which property refers to the window that opened it?",
    code: null,
    options: ["window.opener", "window.parent", "window.top", "window.self"],
    why: "opener = the window that opened this one. parent = the window containing this frame. top = the root window. self = this window itself.",
  },
  {
    tema: 3, slide: 21,
    question: "What is the safe way to put text written by the user into the page?",
    code: null,
    options: [
      "document.createElement + elemento.textContent",
      "elemento.innerHTML",
      "document.write",
      "eval",
    ],
    why: "innerHTML interprets the text as HTML (dangerous with user data). document.write is old and discouraged.",
  },
  {
    tema: 3, slide: 20,
    question: "What is the difference between querySelector and querySelectorAll?",
    code: null,
    options: [
      "querySelector returns the first element matching the CSS selector; querySelectorAll returns all of them",
      "querySelector only searches by id; querySelectorAll by class",
      "querySelectorAll is the old version of querySelector",
      "querySelector returns a list; querySelectorAll returns a single element",
    ],
    why: "Both use CSS selectors. getElementById searches by id, getElementsByName by the name attribute.",
  },
  {
    tema: 3, slide: 28,
    question: "Which storage mechanism is sent to the server with every request?",
    code: null,
    options: ["Cookies (document.cookie)", "localStorage", "sessionStorage", "IndexedDB"],
    why: "Cookies travel to the server. localStorage persists after closing the browser, sessionStorage is deleted when closing the tab, IndexedDB is for large or structured data (slide 29).",
  },
  {
    tema: 3, slide: 27,
    question: "Which event fires when a text field loses focus?",
    code: null,
    options: ["onblur", "onfocus", "keydown", "onmousemove"],
    why: "onfocus = field selected, onblur = field deselected, keydown = key pressed.",
  },
  {
    tema: 3, slide: 23,
    question: "In window.open(url, nombre, opciones), what is the third argument?",
    code: null,
    options: [
      'A string of key=value pairs separated by commas, e.g. "width=400,height=300"',
      "An object like { width: 400, height: 300 }",
      "A boolean saying if it is a popup",
      "The HTML content of the new window",
    ],
    why: "Options like width/height, left/top, popup, scrollbars, noopener. window.open returns a reference to the new window.",
  },

  // ===== TEMA 4 =====
  {
    tema: 4, slide: 7,
    question: "What does this return?",
    code: `function elevar(base, exponente = 2) { return base ** exponente; }
function segundo(a, b) { return b; }
return [elevar(5), elevar(2, 3), segundo(1)];`,
    options: ["[25, 8, undefined]", "[5, 8, null]", "[NaN, 8, undefined]", "[25, 6, Error]"],
    why: "Arguments are assigned by position. A parameter without argument is undefined, unless it has a default value.",
  },
  {
    tema: 4, slide: 6,
    question: "What does this return?",
    code: `const r1 = declarada();
function declarada() { return "ok"; }
const r2 = flecha();
const flecha = () => "ok";
return [r1, r2];`,
    options: ["Error (ReferenceError)", '["ok", "ok"]', '["ok", undefined]', "Error (TypeError)"],
    why: "Function declarations are hoisted, so they can be called before their line. Function expressions and arrow functions only exist after they are assigned.",
  },
  {
    tema: 4, slide: 8,
    question: "What does this return?",
    code: `const llamadas = [];
function saludar() { llamadas.push("hola"); }
function recibir(callback) { return typeof callback; }
const tipo1 = recibir(saludar);
const tipo2 = recibir(saludar());
return [tipo1, tipo2, llamadas.length];`,
    options: ['["function", "undefined", 1]', '["function", "function", 0]', '["function", "undefined", 0]', '["undefined", "function", 1]'],
    why: "saludar is the function; saludar() runs it right away and passes its result (undefined, no return). That is why addEventListener(\"click\", saludar) has no ().",
  },
  {
    tema: 4, slide: 3,
    question: "What does this return?",
    code: `return [isNaN("hola"), isFinite(1 / 0), parseInt("101", 2), eval("2 + 3")];`,
    options: ["[true, false, 5, 5]", "[false, true, 101, \"2 + 3\"]", "[true, true, 5, 5]", "[true, false, 101, 5]"],
    why: "isNaN converts to number first. 1/0 is Infinity, not finite. parseInt with base 2 reads binary. eval runs text as code (discouraged: security risk, slide 4).",
  },
  {
    tema: 4, slide: 11,
    question: "What does this return?",
    code: `const dias = ["lun", "mar", "mié"];
dias[6] = "dom";
return [dias.length, dias[4]];`,
    options: ["[7, undefined]", "[4, undefined]", "[7, null]", "[6, undefined]"],
    why: "Skipping positions leaves empty holes and length still grows. length is always the last index + 1.",
  },
  {
    tema: 4, slide: 9,
    question: "What does this return?",
    code: `return [new Array(3).length, Array.of(3).length, new Array(3, 4).length];`,
    options: ["[3, 1, 2]", "[1, 1, 2]", "[3, 3, 2]", "[1, 3, 2]"],
    why: "new Array(n) with a single number creates n empty holes. Array.of(3) is [3]. new Array(3, 4) is [3, 4].",
  },
  {
    tema: 4, slide: 12,
    question: "What does this return?",
    code: `const filas = Array(3).fill([]);
filas[0].push("x");
return filas[2];`,
    options: ['["x"]', "[]", "undefined", "Error (TypeError)"],
    why: "fill([]) puts the SAME array in every row, so changing one changes all. Use Array.from({ length: 3 }, () => []).",
  },
  {
    tema: 4, slide: 14,
    question: "What does this return?",
    code: `const pila = [1, 2, 3];
const r1 = pila.push(4);
const r2 = pila.shift();
return [r1, r2, pila];`,
    options: ["[4, 1, [2, 3, 4]]", "[[1, 2, 3, 4], 1, [2, 3, 4]]", "[4, [2, 3, 4], [2, 3, 4]]", "[4, 1, [1, 2, 3, 4]]"],
    why: "push and unshift return the new length. pop and shift return the removed element. All four modify the array.",
  },
  {
    tema: 4, slide: 14,
    question: "What does this return?",
    code: `const letras = ["a", "b", "c", "d"];
const copia = letras.slice(1, 3);
const borrados = letras.splice(1, 2);
return [copia, borrados, letras];`,
    options: [
      '[["b", "c"], ["b", "c"], ["a", "d"]]',
      '[["b", "c"], ["b", "c"], ["a", "b", "c", "d"]]',
      '[["b", "c", "d"], ["b", "c"], ["a", "d"]]',
      '[["b"], ["b", "c"], ["a", "d"]]',
    ],
    why: "slice(i, f) copies from i up to f (not included) and does NOT modify. splice(i, n) removes n elements from i and DOES modify.",
  },
  {
    tema: 4, slide: 15,
    question: "What does this return?",
    code: `const numeros = [10, 1, 5, 25];
numeros.sort();
const primero = numeros.slice();
numeros.sort((a, b) => b - a);
return [primero, numeros];`,
    options: [
      "[[1, 10, 25, 5], [25, 10, 5, 1]]",
      "[[1, 5, 10, 25], [25, 10, 5, 1]]",
      "[[1, 10, 25, 5], [1, 5, 10, 25]]",
      "[[1, 5, 10, 25], [1, 5, 10, 25]]",
    ],
    why: "sort() with no argument compares as text (\"10\" before \"5\"). a - b sorts ascending, b - a descending. sort modifies the array; toSorted returns a copy.",
  },
  {
    tema: 4, slide: 17,
    question: "What does this return?",
    code: `const edades = [15, 22, 18, 30, 12];
const resultado = edades
  .filter(e => e >= 18)
  .map(e => e * 2)
  .reduce((total, e) => total + e, 0);
return [resultado, edades.length];`,
    options: ["[140, 5]", "[140, 3]", "[194, 5]", "[70, 5]"],
    why: "filter keeps 22, 18, 30; map doubles them; reduce adds them: 44 + 36 + 60 = 140. None of them modify the original array.",
  },
  {
    tema: 4, slide: 13,
    question: "What does this return?",
    code: `const numeros = [1, 2, 3];
const a = numeros.map(n => n * 2);
const b = numeros.forEach(n => n * 2);
return [a, b, numeros];`,
    options: [
      "[[2, 4, 6], undefined, [1, 2, 3]]",
      "[[2, 4, 6], [2, 4, 6], [1, 2, 3]]",
      "[[2, 4, 6], undefined, [2, 4, 6]]",
      "[[2, 4, 6], [2, 4, 6], [2, 4, 6]]",
    ],
    why: "map returns a new array. forEach only runs a function per element and returns undefined (and cannot be stopped with break).",
  },
  {
    tema: 4, slide: 21,
    question: "What does this return?",
    code: `const persona = { nombre: "Carlos", edad: 46 };
const campo = "edad";
return [persona[campo], persona["campo"], persona[0], "edad" in persona];`,
    options: ["[46, undefined, undefined, true]", '[46, 46, "Carlos", true]', "[undefined, 46, undefined, true]", '[46, undefined, "Carlos", false]'],
    why: "Brackets with a variable use its value as the key. persona[\"campo\"] looks for a key literally called campo. Objects are not indexed by position.",
  },
  {
    tema: 4, slide: 19,
    question: "What does this return?",
    code: `const persona = { nombre: "Ana" };
const ciudad1 = persona.residencia?.ciudad;
const ciudad2 = persona.residencia.ciudad;
return [ciudad1, ciudad2];`,
    options: ["Error (TypeError)", "[undefined, undefined]", "[undefined, null]", "Error (ReferenceError)"],
    why: "?. returns undefined if an intermediate object is missing. Without ?., reading a property of undefined throws a TypeError.",
  },
  {
    tema: 4, slide: 20,
    question: "What does this return?",
    code: `class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
  mostrar() { return \`\${this.nombre} tiene \${this.edad} años\`; }
}
const p = new Persona("Carlos", 46);
p.edad = 47;
delete p.nombre;
return p.mostrar();`,
    options: ['"undefined tiene 47 años"', '"Carlos tiene 47 años"', '"Carlos tiene 46 años"', "Error (TypeError)"],
    why: "A method reads the object's current properties through this. Properties can be changed or deleted at any time (slide 21).",
  },
  {
    tema: 4, slide: 16,
    question: "What does this return?",
    code: `const m = [[1, 2, 3], [4, 5, 6]];
let suma = 0;
for (let i = 0; i < m.length; i++) {
  for (let j = 0; j < m[i].length; j++) {
    if (j === 1) suma += m[i][j];
  }
}
return [m[1][2], suma];`,
    options: ["[6, 7]", "[5, 7]", "[6, 5]", "[2, 9]"],
    why: "m[fila][columna]: m[1][2] is row 1, column 2 = 6. The inner loop adds column 1 of each row: 2 + 5 = 7. Slide 10 covers 2D arrays.",
  },
];

// ---------- EXAM SET ----------
// Short questions, one idea each, in the style of the real exam.
// q(tema, slide, question, code or null, [correct, wrong, wrong, wrong], why)
function q(tema, slide, question, code, options, why) {
  return { tema, slide, question, code, options, why };
}
const R = "What does this return?";

const preguntasExamen = [
  // ===== TEMA 2 =====
  q(2, 6, R, `let a;\nreturn a;`, ["undefined", "null", "0", "Error (ReferenceError)"],
    "A variable declared without a value is undefined."),
  q(2, 4, "What is the scope of a variable declared with var?", null,
    ["The whole function where it is declared", "Only the block { } where it is declared", "Only the line where it is declared", "Always the whole script"],
    "var has function scope; let and const have block scope."),
  q(2, 4, R, `const x = 5;\nx = 6;\nreturn x;`, ["Error (TypeError)", "6", "5", "Error (SyntaxError)"],
    "A const cannot be reassigned: TypeError."),
  q(2, 4, "What happens if you use a variable declared with let before the line where it is declared?", null,
    ["ReferenceError (temporal dead zone)", "It exists and is undefined", "It is null", "It takes the value assigned later"],
    "let and const are in the temporal dead zone until their line runs. Only var gives undefined (hoisting)."),
  q(2, 9, R, `return typeof null;`, ['"object"', '"null"', '"undefined"', "null"],
    "typeof null is \"object\": a historical error in JavaScript."),
  q(2, 9, R, `return typeof [1, 2];`, ['"object"', '"array"', '"list"', '"number"'],
    "Arrays are objects, so typeof gives \"object\"."),
  q(2, 9, "How do you check whether a value is an array?", null,
    ["Array.isArray(x)", 'typeof x === "array"', "x.isArray()", "x instanceof String"],
    "typeof cannot tell arrays apart from objects; Array.isArray can."),
  q(2, 13, R, `return "5" + 2;`, ['"52"', "7", '"7"', "NaN"],
    "+ with a string concatenates (joins the texts)."),
  q(2, 13, R, `return "10" - 4;`, ["6", '"104"', '"6"', "NaN"],
    "- always converts to number."),
  q(2, 13, R, `return "abc" * 2;`, ["NaN", '"abcabc"', "0", "Error (TypeError)"],
    "* converts to number; \"abc\" is not a valid number, so NaN."),
  q(2, 14, R, `return parseInt("3.9");`, ["3", "4", "3.9", "NaN"],
    "parseInt only reads the integer part; it stops at the dot. It does not round."),
  q(2, 14, R, `return parseFloat("2.5kg");`, ["2.5", "2", "NaN", '"2.5"'],
    "parseFloat reads until the first invalid character and keeps decimals."),
  q(2, 14, R, `return (255).toString(16);`, ['"ff"', "255", '"255"', "16"],
    "toString(base) converts a number to text in that base; 255 in hexadecimal is ff."),
  q(2, 11, "Which value does 0xFF represent?", null, ["255", "15", "16", "0"],
    "The 0x prefix means hexadecimal. 0o is octal and 0b is binary."),
  q(2, 16, R, `return 10 % 3;`, ["1", "3", "0", "3.33"],
    "% (modulo) gives the remainder of the division: 10 = 3 × 3 + 1."),
  q(2, 19, R, `let x = 3;\nconst y = x++;\nreturn y;`, ["3", "4", "2", "undefined"],
    "x++ returns the old value, then increments. ++x would return 4."),
  q(2, 23, R, `return 2 + 3 * 2;`, ["8", "10", "7", "12"],
    "* has higher precedence than +: 3 * 2 = 6, then 2 + 6 = 8."),
  q(2, 25, R, `return 0 || "vacío";`, ['"vacío"', "0", "true", "false"],
    "|| returns the first truthy value. 0 is falsy, so it returns the second operand."),
  q(2, 22, R, `const edad = 16;\nreturn edad >= 18 ? "adulto" : "menor";`, ['"menor"', '"adulto"', "true", "false"],
    "Ternary: condition ? value if true : value if false."),
  q(2, 22, R, `return "edad" in { edad: 30 };`, ["true", "30", '"edad"', "false"],
    "in checks whether a property with that name exists."),
  q(2, 30, "In a switch, how are the case values compared?", null,
    ["With strict equality (===)", "With ==", "With >=", "Alphabetically"],
    "switch uses ===, so \"2\" does not match case 2."),
  q(2, 31, R, `let veces = 0;\nfor (let i = 0; i < 3; i++) {\n  veces++;\n}\nreturn veces;`, ["3", "2", "4", "0"],
    "i takes 0, 1, 2; when i is 3 the condition is false. The body runs 3 times."),
  q(2, 33, "What does for...in give you when used on an array?", null,
    ['The indexes as text ("0", "1"…)', "The values", "The indexes as numbers", "Nothing: it throws an error"],
    "for...in gives keys; on an array they are the indexes as strings. for...of gives the values."),
  q(2, 36, "What does continue do inside a loop?", null,
    ["Skips the rest of this iteration and goes to the next one", "Exits the loop", "Restarts the loop from the first iteration", "Pauses the loop"],
    "continue skips to the next iteration; break exits the loop."),
  q(2, 26, "How do you write a comment that spans several lines?", null, ["/* ... */", "// ...", "<!-- ... -->", "# ..."],
    "// is for one line, /* */ for several lines."),

  // ---- Tema 2, slides 25-37 (added: truth tables, if/else, switch, loops, break/continue) ----
  q(2, 25, R, `return true && false;`, ["false", "true", "undefined", "Error (TypeError)"],
    "&& is true only if both sides are true."),
  q(2, 25, R, `return false || "hola";`, ['"hola"', "false", "true", "undefined"],
    "|| returns the first truthy operand; if there is none, the last one."),
  q(2, 20, R, `return 7 + 4;`, ["11", '"74"', "3", "NaN"],
    "Two numbers: + adds them. It only concatenates when one side is a string."),
  q(2, 28, R, `const n = 5;\nlet r;\nif (n > 3) r = "a";\nelse if (n > 1) r = "b";\nelse r = "c";\nreturn r;`, ['"a"', '"b"', '"ab"', '"c"'],
    "Only the first block whose condition is true runs, even if later ones are also true."),
  q(2, 29, R, `let s = "";\nswitch (1) {\n  case 1: s += "a";\n  case 2: s += "b"; break;\n  case 3: s += "c";\n}\nreturn s;`, ['"ab"', '"a"', '"abc"', '"b"'],
    "Without break, execution falls through into the next case until a break appears."),
  q(2, 30, R, `switch ("2") {\n  case 2: return "number";\n  default: return "default";\n}`, ['"default"', '"number"', "undefined", "Error (TypeError)"],
    "switch compares with ===, so the text \"2\" does not match the number 2."),
  q(2, 31, R, `let c = 0;\nfor (let i = 0; i < 3; i++) {\n  c += i;\n}\nreturn c;`, ["3", "6", "2", "0"],
    "i takes 0, 1, 2 (3 is not < 3): 0 + 1 + 2 = 3."),
  q(2, 33, R, `for (const i in ["a", "b"]) {\n  return i;\n}`, ['"0"', '"a"', "0", "Error (TypeError)"],
    "for...in on an array gives the indexes as text: \"0\", \"1\"."),
  q(2, 33, R, `const m = { marca: "Honda", cc: 125 };\nfor (const k in m) {\n  return m[k];\n}`, ['"Honda"', '"marca"', "125", "Error (TypeError)"],
    "k is the key (\"marca\" in the first round); m[k] looks up the value stored under that key."),
  q(2, 33, R, `const o = { a: 1 };\nfor (const x of o) {}\nreturn "ok";`, ["Error (TypeError)", '"ok"', "undefined", "Error (ReferenceError)"],
    "A plain object is not iterable: for...of on it throws a TypeError."),
  q(2, 34, R, `let n = 5;\nlet veces = 0;\nwhile (n < 3) {\n  veces++;\n  n++;\n}\nreturn veces;`, ["0", "1", "2", "Error (ReferenceError)"],
    "while checks the condition first: false from the start means zero rounds."),
  q(2, 35, R, `let n = 5;\nlet veces = 0;\ndo {\n  veces++;\n  n++;\n} while (n < 3);\nreturn veces;`, ["1", "0", "2", "Error (SyntaxError)"],
    "do-while runs the body once before checking the condition."),
  q(2, 36, R, `let c = 0;\nfor (let i = 0; i < 5; i++) {\n  if (i === 2) break;\n  c++;\n}\nreturn c;`, ["2", "4", "5", "3"],
    "break ends the whole loop at i = 2, after the rounds i = 0 and i = 1."),
  q(2, 36, R, `let c = 0;\nfor (let i = 0; i < 4; i++) {\n  if (i === 2) continue;\n  c++;\n}\nreturn c;`, ["3", "2", "4", "1"],
    "continue skips only the current round (i = 2); the loop goes on: 4 rounds - 1 = 3."),
  q(2, 36, R, `let c = 0;\nfor (let i = 1; i <= 5; i++) {\n  if (i % 2 === 0) continue;\n  c++;\n}\nreturn c;`, ["3", "2", "5", "0"],
    "i % 2 === 0 means even; those rounds are skipped, so only 1, 3 and 5 are counted."),
  q(2, 37, "What does a breakpoint do in DevTools?", null,
    ["Pauses the code at that line so you can inspect the variables", "Deletes the line from the code", "Stops the page from loading", "Hides console.log output"],
    "A breakpoint (or the debugger; statement) pauses execution so you can inspect the values."),
  q(2, 4, "A counter starts at 0 and gets a new value in every round of a loop. Which declaration is best?", null,
    ["let, because its value is reassigned", "const, because it is faster", "const, because it never changes", "var, because it is the only one that can change"],
    "let (or var) allows reassignment; const does not. let is preferred because it has block scope."),

  // ===== TEMA 3 =====
  q(3, 3, "Which keyword creates an object from a class?", null, ["new", "create", "this", "class"],
    "Instantiating means creating an object with new: new Contacto(...)."),
  q(3, 3, "By convention, how are class names written?", null, ["PascalCase", "camelCase", "snake_case", "UPPERCASE"],
    "Classes use PascalCase (Contacto, Persona); variables use camelCase."),
  q(3, 4, "How many classes can a class inherit from directly in JavaScript?", null,
    ["Only one (multiple inheritance is simulated with mixins)", "Two", "As many as needed", "None"],
    "JavaScript only supports single inheritance with extends."),
  q(3, 6, R, `return new Date(2026, 0, 15).getMonth();`, ["0", "1", "15", '"enero"'],
    "Months start at 0: January is 0."),
  q(3, 7, "25 December 2026 is a Friday. What does this return?", `return new Date(2026, 11, 25).getDate();`, ["25", "5", "11", "12"],
    "getDate is the day of the month. getDay would be the weekday (5) and getMonth the month (11)."),
  q(3, 6, R, `return new Date(2026, 0, 32).getMonth();`, ["1", "0", "2", "Error (RangeError)"],
    "Dates overflow: 32 January becomes 1 February, which is month 1."),
  q(3, 9, R, `return "javascript".charAt(4);`, ['"s"', '"c"', '"a"', '"v"'],
    "Positions start at 0: j0 a1 v2 a3 s4."),
  q(3, 9, R, `return "banana".indexOf("n");`, ["2", "3", "1", "-1"],
    "indexOf gives the first position: b0 a1 n2."),
  q(3, 9, R, `return "banana".lastIndexOf("a");`, ["5", "1", "3", "6"],
    "lastIndexOf gives the last position where it appears: b0 a1 n2 a3 n4 a5."),
  q(3, 9, R, `return "web".indexOf("x");`, ["-1", "null", "undefined", "0"],
    "If the text is not found, indexOf returns -1."),
  q(3, 9, R, `return "2026-11-25".split("-");`, ['["2026", "11", "25"]', "[2026, 11, 25]", '"2026 11 25"', '["2026-11-25"]'],
    "split cuts the string at the separator and returns an array of strings."),
  q(3, 11, R, `return Math.round(3.5);`, ["4", "3", "3.5", '"4"'],
    "round goes to the nearest integer; .5 goes up."),
  q(3, 11, R, `return Math.max(4, 9, 2);`, ["9", "2", "4", "15"],
    "max returns the largest of the numbers."),
  q(3, 5, R, `return Boolean("");`, ["false", "true", '""', "undefined"],
    "The empty string is falsy. Boolean(\"0\") would be true."),
  q(3, 18, "What does confirm() return when the user presses Aceptar?", null, ["true", '"Aceptar"', "undefined", "null"],
    "confirm returns true (Aceptar) or false (Cancelar)."),
  q(3, 18, "What does alert() return?", null, ["undefined", "true", "null", '""'],
    "alert only shows a message; it returns undefined."),
  q(3, 17, "What is the difference between setTimeout and setInterval?", null,
    ["setTimeout runs the function once; setInterval repeats it", "setInterval runs the function once; setTimeout repeats it", "setInterval runs immediately; setTimeout waits", "There is no difference"],
    "Both return an id to cancel them with clearTimeout / clearInterval."),
  q(3, 17, "How do you stop a setInterval?", null,
    ["clearInterval(id), with the id that setInterval returned", "setInterval(0)", "break", "window.stop()"],
    "Keep the id: const id = setInterval(...); then clearInterval(id)."),
  q(3, 15, "Which window properties give the size of the visible area of the page?", null,
    ["innerWidth / innerHeight", "outerWidth / outerHeight", "screenX / screenY", "scrollX / scrollY"],
    "inner = visible page area; outer = the whole window with bars; screen = position; scroll = how far it is scrolled."),
  q(3, 20, "Which document method returns ALL the elements that match a CSS selector?", null,
    ["querySelectorAll", "querySelector", "getElementById", "createElement"],
    "querySelector returns only the first one."),
  q(3, 19, "Which document property holds the page title (and can be changed)?", null,
    ["document.title", "document.head", "document.URL", "document.name"],
    "document.title = \"...\" changes the text on the browser tab."),
  q(3, 21, "Why is innerHTML dangerous with user data?", null,
    ["It interprets the text as HTML, so injected code can run", "It is slower than textContent", "It deletes the whole page", "It only works in old browsers"],
    "Use createElement + textContent for user data."),
  q(3, 24, "When do browsers usually block windows opened with window.open()?", null,
    ["When they are not triggered by a user click", "Always", "When the page uses HTTPS", "When the window has a name"],
    "Popups opened on page load or from a timer are blocked; from a click they are allowed."),
  q(3, 29, "Which storage is deleted when the tab is closed?", null, ["sessionStorage", "localStorage", "Cookies", "IndexedDB"],
    "localStorage persists after closing the browser; sessionStorage does not."),
  q(3, 29, "Which storage is meant for large volumes or structured data?", null, ["IndexedDB", "Cookies", "sessionStorage", "localStorage"],
    "IndexedDB is for large or structured data."),
  q(3, 27, "Which event fires on a double click?", null, ["ondblclick", "onclick", "ondoubleclick", "onmousemove"],
    "onclick = single click, ondblclick = double click, onmousemove = movement."),
  q(3, 13, R, `return new URL("https://web.es/a?x=1").searchParams.get("y");`, ["null", "undefined", '""', "Error (TypeError)"],
    "searchParams.get returns null if the parameter does not exist."),
  q(3, 12, "Which object represents the current address and lets you navigate by changing it?", null,
    ["location", "history", "navigator", "screen"],
    "history is the tab's history, navigator is browser info, screen is the device screen."),

  // ---- Tema 3, slides 3-5 (added: classes, inheritance, native objects) ----
  q(3, 3, R, `class A {\n  constructor(n) { this.n = n; }\n}\nreturn new A("x").n;`, ['"x"', "undefined", "null", "Error (TypeError)"],
    "The constructor stores the argument in the new object with this.n = n."),
  q(3, 3, R, `class A {\n  constructor(n) { this.n = n; }\n  dime() { return n; }\n}\nreturn new A("x").dime();`, ["Error (ReferenceError)", '"x"', "undefined", "null"],
    "Inside a method you must write this.n; plain n does not exist there."),
  q(3, 3, "Complete the class so that new Producto(\"pan\", 100).conIva() returns 121:\n\n    class Producto {\n      constructor(nombre, precio) {\n        (A).nombre = nombre;\n        (A).precio = precio;\n      }\n      conIva() {\n        (B) (A).precio * 1.21;\n      }\n    }\n\n    const p = (C) Producto(\"pan\", 100);", null,
    ["A = this, B = return, C = new", "A = this, B = return, C = class", "A = self, B = return, C = new", "A = this, B = print, C = new"],
    "this refers to the object, return gives back the value, and new creates the object."),
  q(3, 4, R, `class A { hola() { return "A"; } }\nclass B extends A {}\nreturn new B().hola();`, ['"A"', '"B"', "undefined", "Error (TypeError)"],
    "B inherits hola() from A with extends."),
  q(3, 4, R, `class A { hola() { return "A"; } }\nclass B extends A { hola() { return "B"; } }\nreturn new B().hola();`, ['"B"', '"A"', '"AB"', "undefined"],
    "A method in the child overrides the parent's method."),
  q(3, 4, "In the constructor of a child class, what must you call before using this?", null,
    ["super(...)", "extends(...)", "parent(...)", "new(...)"],
    "super(...) runs the parent's constructor and must come before this."),
  q(3, 4, "Which feature lets different objects answer the same method each in its own way?", null,
    ["Polymorphism", "Encapsulation", "Inheritance", "Instantiation"],
    "Polymorphism = many shapes: the same call, a different answer for each class."),
  q(3, 4, "Which convention does the slide use for the internal properties of an object (encapsulation)?", null,
    ["Names starting with _ plus getters", "Names in UPPERCASE", "Names ending in ()", "Names starting with new"],
    "Encapsulation: properties like _balance, exposed through getters."),
  q(3, 5, R, `return Boolean(0);`, ["false", "true", "0", "undefined"],
    "0 is falsy."),
  q(3, 5, R, `return Boolean("0");`, ["true", "false", '"0"', "0"],
    "Any non-empty text is truthy, even \"0\"."),
  q(3, 5, R, `return JSON.parse('{"a": 1}').a;`, ["1", '"1"', "undefined", "Error (SyntaxError)"],
    "JSON.parse turns JSON text into an object."),
  q(3, 17, "const id = setInterval(() => { n++; if (n === 5) clearInterval(id); }, 500);\nn starts at 0. How long until the interval stops?", null,
    ["2.5 seconds", "2 seconds", "5 seconds", "0.5 seconds"],
    "It runs every 500 ms and stops on the 5th run: 5 x 0.5 s = 2.5 s."),

  // ---- Tema 4 (added: reduce and nested arrays, from the real test) ----
  q(4, 17, R, `return [2, 3, 4].reduce((a, b) => a + b, 0);`, ["9", "24", "[2, 3, 4]", "0"],
    "reduce accumulates: 0 + 2 + 3 + 4 = 9."),
  q(4, 10, R, `const m = [[1, 2], [3, 4]];\nreturn m[0][1];`, ["2", "3", "1", "[1, 2]"],
    "m[0] is the first row [1, 2]; [1] is its second element, 2."),

  // ===== TEMA 4 =====
  q(4, 3, R, `return isNaN("12");`, ["false", "true", "12", "NaN"],
    "isNaN converts first: \"12\" becomes 12, which is a number, so false."),
  q(4, 4, R, `return parseInt("11", 2);`, ["3", "11", "2", "NaN"],
    "Base 2 (binary): 11 = 1×2 + 1 = 3."),
  q(4, 4, "Which function should you use to turn JSON text into data, instead of eval?", null,
    ["JSON.parse", "JSON.stringify", "parseInt", "String"],
    "eval runs any text as code (security risk). JSON.parse only reads data."),
  q(4, 6, "Which kind of function can be called before the line where it is written?", null,
    ["A function declaration: function nombre() {}", "An arrow function", "A function expression: const f = function () {}", "None of them"],
    "Declarations are hoisted. Expressions and arrow functions only exist after their assignment."),
  q(4, 6, R, `const doble = n => n * 2;\nreturn doble(4);`, ["8", "4", '"n * 2"', "undefined"],
    "An arrow function with one expression returns it automatically."),
  q(4, 7, R, `function f() { }\nreturn f();`, ["undefined", "null", "0", "Error (TypeError)"],
    "A function without return returns undefined."),
  q(4, 7, R, `function saludar(nombre = "invitado") {\n  return "Hola " + nombre;\n}\nreturn saludar();`,
    ['"Hola invitado"', '"Hola undefined"', '"Hola "', "Error (ReferenceError)"],
    "A parameter without argument takes its default value."),
  q(4, 8, "What is a callback?", null,
    ["A function passed to another function so it runs it later", "A function that calls itself", "A function without parameters", "A function that returns another value"],
    "Example: setTimeout(saludar, 2000) — saludar is the callback."),
  q(4, 9, R, `const a = [5, 10, 15];\nreturn a[a.length - 1];`, ["15", "5", "3", "undefined"],
    "The last element is at length - 1."),
  q(4, 9, R, `return Array.of(5).length;`, ["1", "5", "0", "undefined"],
    "Array.of(5) is [5]. new Array(5) would be 5 empty slots."),
  q(4, 10, R, `const m = [[1, 2], [3, 4]];\nreturn m[1][0];`, ["3", "2", "1", "4"],
    "m[row][column]: row 1 is [3, 4], column 0 is 3."),
  q(4, 14, R, `const a = [1, 2, 3];\nreturn a.pop();`, ["3", "[1, 2]", "2", "1"],
    "pop removes and returns the last element."),
  q(4, 14, R, `const a = [1, 2];\nreturn a.unshift(0);`, ["3", "[0, 1, 2]", "0", "undefined"],
    "unshift (like push) returns the new length."),
  q(4, 14, R, `return [1, 2, 3, 4].slice(1, 3);`, ["[2, 3]", "[2, 3, 4]", "[1, 2, 3]", "[1, 2]"],
    "slice(i, f) copies from i up to f, without including f."),
  q(4, 14, R, `return ["a", "b", "c"].join("");`, ['"abc"', '"a,b,c"', '["abc"]', '"a b c"'],
    "join joins the elements into a text with the separator given."),
  q(4, 14, R, `return [3, 1, 2].includes(5);`, ["false", "-1", "undefined", "null"],
    "includes returns true or false. indexOf would return -1."),
  q(4, 14, "Which of these methods does NOT modify the original array?", null, ["slice", "splice", "sort", "push"],
    "slice, concat, join, indexOf, includes, map, filter and reduce do not modify it."),
  q(4, 15, R, `return [2, 20, 3].sort();`, ["[2, 20, 3]", "[2, 3, 20]", "[20, 3, 2]", "[3, 2, 20]"],
    "Without a comparator sort compares as text: \"2\" < \"20\" < \"3\"."),
  q(4, 17, R, `return [1, 2, 3, 4].filter(n => n % 2 === 0);`, ["[2, 4]", "[1, 3]", "[false, true, false, true]", "6"],
    "filter keeps the elements for which the function returns true."),
  q(4, 17, R, `return [1, 2, 3].reduce((total, n) => total + n, 10);`, ["16", "6", "10", "[11, 12, 13]"],
    "The second argument is the starting value: 10 + 1 + 2 + 3 = 16."),
  q(4, 13, "What does forEach return?", null, ["undefined", "A new array", "The original array", "The number of elements"],
    "forEach only runs a function per element. To build a new array use map."),
  q(4, 21, R, `const p = { nombre: "Ana" };\ndelete p.nombre;\nreturn p.nombre;`, ["undefined", '"Ana"', "null", "Error (TypeError)"],
    "delete removes the property; reading it afterwards gives undefined."),
  q(4, 19, R, `const p = { nombre: "Ana" };\nreturn p.ciudad?.nombre;`, ["undefined", "Error (TypeError)", "null", '"Ana"'],
    "?. returns undefined instead of an error when the intermediate object is missing."),
  q(4, 20, "How are methods written inside a class?", null,
    ["Inside the class body, without the word function", "With the word function before the name", "Only inside the constructor", "Outside the class, after it"],
    "class Persona { mostrar() { ... } } — no function keyword."),
  q(4, 21, R, `const coche = { marca: "Seat" };\nconst clave = "marca";\nreturn coche.clave;`, ["undefined", '"Seat"', '"marca"', "Error (ReferenceError)"],
    "The dot never uses variables: coche.clave looks for a property called clave. coche[clave] would give \"Seat\"."),
];

// ---------- Helpers ----------

const PDF_NAMES = { 2: "Tema 2", 3: "Tema 3", 4: "Tema 4" };

function formatear(valor) {
  if (typeof valor === "string") return JSON.stringify(valor);
  if (Array.isArray(valor)) return "[" + valor.map(formatear).join(", ") + "]";
  return String(valor);
}

function ejecutar(codigo) {
  try {
    return formatear(new Function(codigo)());
  } catch (error) {
    return `Error (${error.name})`;
  }
}

function barajar(lista) {
  const copia = lista.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function sangrar(texto) {
  return texto.split("\n").map((linea) => "    " + linea).join("\n");
}

// ---------- Self-check (node quiz.js --check) ----------
// Runs every code question and confirms the correct option matches what JavaScript really returns.

function comprobar() {
  let fallos = 0;
  const todas = preguntasExamen.concat(preguntasDificiles);
  todas.forEach((pregunta, indice) => {
    if (!pregunta.code) return;
    const real = ejecutar(pregunta.code);
    if (real !== pregunta.options[0]) {
      fallos++;
      console.log(`MISMATCH "${pregunta.code.split("\n")[0]}"`, `#${indice + 1} (Tema ${pregunta.tema}, slide ${pregunta.slide}): expected ${pregunta.options[0]}, got ${real}`);
    }
  });
  console.log(`${preguntasExamen.length} exam + ${preguntasDificiles.length} hard questions, ${fallos} mismatches`);
  process.exit(fallos ? 1 : 0);
}

// ---------- Quiz ----------

async function preguntar(rl, pregunta, numero, total) {
  const letras = ["a", "b", "c", "d"];
  const opciones = barajar(pregunta.options.map((texto, i) => ({ texto, correcta: i === 0 })));

  console.log(`\n---------- ${numero}/${total}  (${PDF_NAMES[pregunta.tema]}) ----------`);
  console.log(pregunta.question);
  if (pregunta.code) console.log("\n" + sangrar(pregunta.code) + "\n");
  opciones.forEach((opcion, i) => console.log(`  ${letras[i]}) ${opcion.texto}`));

  let respuesta;
  while (true) {
    respuesta = (await rl.question("\nYour answer (a-d, Enter = blank, q = quit): ")).trim().toLowerCase();
    if (respuesta === "" || respuesta === "q" || letras.includes(respuesta)) break;
  }
  if (respuesta === "q") return "quit";

  const letraCorrecta = letras[opciones.findIndex((opcion) => opcion.correcta)];
  let resultado;
  if (respuesta === "") {
    resultado = "blank";
    console.log(`\n  Blank. Correct answer: ${letraCorrecta}`);
  } else if (opciones[letras.indexOf(respuesta)].correcta) {
    resultado = "right";
    console.log("\n  Correct.");
  } else {
    resultado = "wrong";
    console.log(`\n  Wrong. Correct answer: ${letraCorrecta}`);
  }

  if (pregunta.code) console.log(`  JavaScript really returns: ${ejecutar(pregunta.code)}`);
  console.log(`  Why: ${pregunta.why}`);
  if (resultado !== "right") console.log(`  Review: ${PDF_NAMES[pregunta.tema]}, slide ${pregunta.slide}`);

  await rl.question("\n  (Enter to continue)");
  return resultado;
}

async function main() {
  const argumentos = process.argv.slice(2);
  if (argumentos.includes("--check")) comprobar();

  const filtroTema = argumentos.find((a) => /^tema[234]$/.test(a));
  const limite = parseInt(argumentos.find((a) => /^\d+$/.test(a)), 10);
  const rango = argumentos.map((a) => a.match(/^slides=(\d+)-(\d+)$/)).find(Boolean);

  let seleccion = preguntasExamen;
  if (argumentos.includes("hard")) seleccion = preguntasDificiles;
  if (argumentos.includes("all")) seleccion = preguntasExamen.concat(preguntasDificiles);
  if (filtroTema) seleccion = seleccion.filter((p) => p.tema === Number(filtroTema.slice(4)));
  if (rango) {
    const desde = Number(rango[1]);
    const hasta = Number(rango[2]);
    seleccion = seleccion.filter((p) => p.slide >= desde && p.slide <= hasta);
    if (seleccion.length === 0) {
      console.log(`No questions found for slides ${desde}-${hasta}.`);
      process.exit(0);
    }
    console.log(`Only slides ${desde}-${hasta}: ${seleccion.length} question(s) available.`);
  }
  seleccion = barajar(seleccion);
  if (limite) seleccion = seleccion.slice(0, limite);

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const cuenta = { right: 0, wrong: 0, blank: 0 };
  let pendientes = [];

  for (let i = 0; i < seleccion.length; i++) {
    const resultado = await preguntar(rl, seleccion[i], i + 1, seleccion.length);
    if (resultado === "quit") break;
    cuenta[resultado]++;
    if (resultado !== "right") pendientes.push(seleccion[i]);
  }

  const contestadas = cuenta.right + cuenta.wrong + cuenta.blank;
  if (contestadas > 0) {
    const puntos = cuenta.right - 0.1 * cuenta.wrong;
    const nota = Math.max(0, (puntos / contestadas) * 10);
    console.log("\n========== RESULT ==========");
    console.log(`Correct ${cuenta.right} | Wrong ${cuenta.wrong} | Blank ${cuenta.blank}`);
    console.log(`Exam-style grade: ${nota.toFixed(2)} / 10`);
  }

  // Redo rounds: repeat the missed ones until all are right
  let ronda = 1;
  while (pendientes.length > 0) {
    console.log(`\n========== REDO ROUND ${ronda}: ${pendientes.length} question(s) ==========`);
    const siguientes = [];
    const lista = barajar(pendientes);
    for (let i = 0; i < lista.length; i++) {
      const resultado = await preguntar(rl, lista[i], i + 1, lista.length);
      if (resultado === "quit") { rl.close(); return; }
      if (resultado !== "right") siguientes.push(lista[i]);
    }
    pendientes = siguientes;
    ronda++;
  }

  console.log("\nAll questions answered correctly. Done.");
  rl.close();
}

main();

# Study guide: Desarrollo Web en Entorno Cliente (Tema 2, 3, 4)

Exam: Tuesday 1 December. It's multiple choice (a/b/c/d), +1 per correct answer, −0.10 per wrong answer, 0 for a blank. If the exam is actually Wednesday 2/12, use Tuesday for a second full quiz run.

## The three files

| File | What it's for | Command |
|---|---|---|
| `ejercicios.js` | Learn by writing code. There are 46 tasks; you write the code and the file checks it. | `node ejercicios.js tema2` / `node ejercicios.js 17` |
| `quiz.js` | Practise the exam format. One question at a time, with exam scoring, and the code is actually run after you answer. | `node quiz.js tema3` / `node quiz.js 15` |
| `soluciones.js` | Only when you're stuck after really trying. | `node ejercicios.js --soluciones` |

## Daily routine (1.5 to 2 hours)

1. Spend 10 minutes redoing yesterday's FAIL exercises and missed quiz questions.
2. Read the day's slides and write a half-page summary in your own words.
3. Do that day's exercises until they show OK.
4. Run the quiz for that tema.

## Plan

| Day | Slides | Exercises | Quiz |
|---|---|---|---|
| Wed 25 | Tema 2, slides 3–25: variables, scope, hoisting, types, conversion, operators | 1–8 | `node quiz.js tema2 7` |
| Thu 26 | Tema 2, slides 26–37: switch, loops, break and continue. Also Tema 4, slides 2–7: built-in functions, ways to write functions, parameters | 9–14, 31–33 | `node quiz.js tema2` |
| Fri 27 | Tema 3, slides 2–11: classes, inheritance, Date, String, Math, JSON | 15–25 | `node quiz.js tema3 10` |
| Sat 28 | Tema 3, slides 12–31: URL, window, timers, dialogs, document, window.open, events, storage | 26–30 | `node quiz.js tema3` |
| Sun 29 | Tema 4, slides 8–21: callbacks, arrays, methods, sort, map/filter/reduce, objects | 34–46 | `node quiz.js tema4` |
| Mon 30 | Full mock exam, then a slide review of everything you missed | Redo any FAIL | `node quiz.js` (all 49) |
| Tue 1 | 20 minutes on your summaries plus this cheat sheet. Nothing new. | – | `node quiz.js 10` |

Exam tactic: if you can rule out at least one option, answer. A pure guess among four options is still worth about +0.17 on average, and a blank is worth 0.

---

# Cheat sheet

## Tema 2: syntax

### var / let / const (slide 4)

| | Scope | Reassignable | Redeclarable | Used before its line |
|---|---|---|---|---|
| var | function | yes | yes | exists, value undefined (hoisting) |
| let | block | yes | no | ReferenceError (temporal dead zone) |
| const | block | no | no | ReferenceError |

- `const lista = []; lista.push(1);` works. const stops you reassigning the variable, but you can still change what's inside it.
- Assigning to a variable you never declared creates an implicit global. In "use strict" mode that's an error instead (slide 5).
- Names can use letters, digits, `_` and `$`, but can't start with a digit (`2dias` gives a SyntaxError). They're case-sensitive, and the convention is camelCase (slide 6).
- `let a, b = 2;` leaves `a` as undefined.

### Types (slide 9)

| Value | typeof |
|---|---|
| `42`, `NaN`, `Infinity` | "number" |
| `"hola"` | "string" (immutable) |
| `true` | "boolean" |
| `undefined` | "undefined" |
| `null` | "object" (a historical bug) |
| `[]`, `{}`, `new Date()` | "object". Use `Array.isArray` to tell arrays apart. |
| `function(){}` | "function" |

There are 7 primitive types plus object. JavaScript is dynamically typed.

### Conversion (slides 13–14)

| Expression | Result | Why |
|---|---|---|
| `"5" + 2` | "52" | + with a string concatenates |
| `"5" - 2` | 3 | -, *, / and % convert to number |
| `true + 1` | 2 | true becomes 1 |
| `"abc" * 2` | NaN | |
| `1 + 2 + "3"` | "33" | evaluated left to right |
| `"5" == 5` / `"5" === 5` | true / false | == converts the types, === doesn't |
| `parseInt("42px")` | 42 | reads until the first invalid character |
| `parseInt("px42")` | NaN | not 0 |
| `Number("42px")` | NaN | the whole text must be numeric |
| `parseInt("ff", 16)` | 255 | always pass the base |
| `(13).toString(16)` | "d" | |

Use `Number.isNaN(x)` to check for NaN, because `NaN === NaN` is false. Number literals can be written as `0xFF`, `0o377` or `0b11111111` (all 255) (slide 11).

### Operators

- `y = x++` gives the old value and then adds 1. `y = ++x` adds 1 first and gives the new value (slide 19).
- `&&` and `||` short-circuit and return one of the operands, not necessarily a boolean: `"" || "anónimo"` gives "anónimo", and `"hola" && 0` gives 0 (slide 25).
- Other operators to know: the ternary `c ? a : b`, `typeof`, `instanceof`, `in` (whether a property exists), `delete`, and `new` (slide 22).
- Precedence: `()` first, then `!` and `typeof`, then `**`, then `* / %`, then `+ -`, then comparisons, then `== ===`, then `&&`, then `||`, then the ternary, then `=` (slide 23).
- Comments are `//` for one line and `/* */` for several (slide 26). Statements end with `;`. JavaScript inserts missing ones automatically (ASI), but writing them yourself avoids errors (slide 27).

### Decisions and loops

- `switch` compares with ===. Without `break` it falls through into the next case. `default` runs when no case matches and is optional (slides 29–30).
- `for`: the initialization runs once. Then each round it checks the condition, runs the body and updates the counter (slide 31).
- `for...in` gives the keys; on an array, those are the indexes as text ("0", "1"). `for...of` gives the values. Use for...of for arrays (slide 33).
- `while` can run 0 times. `do-while` always runs at least once (slides 34–35).
- `break` leaves the loop. `continue` jumps to the next iteration (slide 36).
- For testing, use DevTools (the Console tab) and breakpoints. For documentation, use comments and JSDoc (slide 37).

---

## Tema 3: objects and the browser

### Classes (slides 3–4)

```js
class Contacto {
  constructor(nombre) { this.nombre = nombre; }
  saludar() { return `Hola, soy ${this.nombre}`; }
}
class Empleado extends Contacto { }   // herencia
const ana = new Contacto("Ana");       // instanciar
```

- A class is the template and an object is one instance of it. Class names use PascalCase.
- Inheritance uses `extends`. JavaScript only has single inheritance; multiple inheritance is simulated with mixins.
- Encapsulation: fields starting with `_` are treated as private, plus getters. Polymorphism: the same method behaves differently in different objects.
- Inside a method you reach the object's data through `this.nombre`.

### Built-in objects (slide 5)

String, Number, Boolean (`Boolean(0)` is false), Array, Date, Math, RegExp (`/^\d{5}$/.test("46001")`), Function, and JSON (`JSON.parse` turns text into an object, `JSON.stringify` turns an object into text).

### Date (slides 6–7)

- Months start at 0 (January = 0, March = 2). Days start at 1.
- `getDay()` gives the weekday, with Sunday = 0. `getDate()` gives the day of the month.
- Dates overflow instead of failing: 32 May becomes 1 June.
- `new Date("2026-10-30")` is read as UTC, while `"2026-10-30T00:00"` is read as local time.
- Dates are mutable: `setDate()` changes the object. Internally a date is milliseconds since 1/1/1970 UTC.

### String (slides 8–9)

String methods never change the original; they return a new string. So `nombre.toUpperCase()` on its own does nothing to `nombre`, and you need `nombre = nombre.toUpperCase()`.

| Method | Note |
|---|---|
| `indexOf(t)` / `lastIndexOf(t)` | -1 if not found |
| `charAt(i)` | |
| `substring(ini, fin)` | doesn't include `fin` |
| `split(sep, trozos)` | the second argument limits the number of pieces |
| `replace(a, b)` | with a text, only replaces the first match |
| `concat`, `toUpperCase`, `toLowerCase` | |

### Math (slides 10–11)

`ceil` rounds up, `floor` rounds down, `round` goes to the nearest integer. `random()` gives a decimal from 0 to 1. A dice roll is `Math.floor(Math.random() * 6) + 1`. Also `abs`, `max`, `min`, `pow`, `sqrt`, `PI` and `E`.

### Browser (slides 12–20)

- Object hierarchy: `window` contains `document`, `location`, `history`, `navigator`, `screen` and `frames`. `document` contains `body`, `forms`, `images` and `links`.
- URLs: `new URL(text)` splits the parts, and `searchParams.get("q")` reads a query parameter (URLSearchParams) (slide 13).
- Window relationships (slide 15):
  - `opener`: the window that opened this one.
  - `parent`: the window that contains this frame.
  - `top`: the root window.
  - `self`: this window itself.
  - `closed`: true if the window has been closed.
- Window size properties: `innerWidth` is the visible area, `outerWidth` includes the browser bars, `scrollX` and `scrollY` are how far the page is scrolled.
- Timers (slide 17):
  - `setTimeout` runs once and `setInterval` runs repeatedly. Both return an id, which you cancel with `clearTimeout` or `clearInterval`.
  - The time is a minimum, never exact: the function waits until the browser is free.

| Dialog (slide 18) | Returns |
|---|---|
| `alert` | undefined |
| `confirm` | true / false |
| `prompt` | the typed text, "" if accepted empty, null on Cancelar |

- Useful document properties (slide 19):
  - `documentElement`: the `<html>` element.
  - `title`: the page title (can be changed).
  - `URL`, `domain`, `referrer`.
  - `readyState`: loading, interactive or complete.
  - `cookie`: the document's cookies.
- document methods (slide 20):
  - `getElementById`: the element with that id.
  - `querySelector`: the first element matching a CSS selector.
  - `querySelectorAll`: all elements matching it.
  - `getElementsByName`, `createElement`, `addEventListener`.

### Generating HTML (slide 21)

- `document.write` is old and discouraged.
- `innerHTML` is dangerous with user data because it interprets the text as HTML.
- `createElement` plus `textContent` is the safe way.

### Windows (slides 22–26)

- `window.open(url, nombre, "width=400,height=300")`: the third argument is a string of key=value pairs separated by commas, and the function returns a reference to the new window.
- Browsers block popups that weren't triggered by a user click.
- `noopener` means the new window gets no access to `opener`.
- You can resize a window with `resizeTo` (to an exact size) and `resizeBy` (relative to the current size), and there's an `onresize` event.
- Communication between windows:
  - From the main window to the popup, use the reference: `popup.miFuncion()`.
  - From the popup back to the main window, use `window.opener.algo`.
  - This only works on the same origin. Across different origins you use `postMessage`.

### Events (slide 27)

`onclick`, `ondblclick`, `onmousemove`, `onfocus` (the field gets selected), `onblur` (the field loses focus), `keydown`.

### Storage (slides 28–31)

| | Persistence | Sent to the server |
|---|---|---|
| Cookies (`document.cookie`) | | yes, with every request |
| localStorage | survives closing the browser | no |
| sessionStorage | deleted when the tab closes | no |
| IndexedDB | for large or structured data | no |

---

## Tema 4: functions, arrays, objects

### Built-in functions (slides 3–4)

- `isNaN("hola")` gives true because it converts to a number first.
- `isFinite(1/0)` gives false.
- `encodeURIComponent` and `decodeURIComponent` handle URL fragments.
- `parseInt("101", 2)` gives 5.
- `eval` runs any text as code, which is a security risk. To read data, use `JSON.parse` instead.

### Functions (slides 5–8)

```js
function resta(a, b) { return a - b; }       // declaración: hoisting
const resta2 = function (a, b) { return a - b; };  // expresión
const resta3 = (a, b) => a - b;              // flecha
```

- Only declarations can be called before their line. Calling an expression or arrow function early gives a ReferenceError.
- Arguments are matched by position. A missing argument is undefined unless the parameter has a default (`exponente = 2`).
- `return` gives back the result and ends the function. A function with no return gives undefined.
- A callback is a function passed to another function. `saludar` is the function itself; `saludar()` runs it right away and passes its result. That's why it's `addEventListener("click", saludar)` with no ().

### Arrays (slides 9–16)

- `new Array(3)` makes 3 empty slots, `Array.of(3)` makes `[3]`, and `new Array(3, 4)` makes `[3, 4]`.
- `a[6] = x` on a 3-element array leaves holes, and `length` becomes 7. length is always the last index + 1.
- `Array(4).fill([])` puts the same array in every row. Use `Array.from({ length: 4 }, () => [])` instead.
- In 2D arrays, `m[fila][columna]`. To loop over one you need two nested loops, and the inner one uses `m[i].length`.
- Ways to loop: a classic `for` when you need the index, `for...of` for the values, `forEach` (can't be stopped with break). Avoid `for...in` on arrays.

| Changes the array | Returns |
|---|---|
| `push` / `unshift` | the new length |
| `pop` / `shift` | the removed element |
| `splice(i, n)` | the removed elements |
| `sort` / `reverse` | the same array |

These don't change the array: `concat`, `slice(i, f)` (doesn't include `f`), `join`, `indexOf` (-1 if not found), `includes`, `map`, `filter`, `reduce`, `toSorted`.

### sort (slide 15)

- `[10, 1, 5, 25].sort()` gives `[1, 10, 25, 5]` because it compares as text.
- `(a, b) => a - b` sorts ascending and `(a, b) => b - a` sorts descending.
- For text with accents or capitals, use `a.localeCompare(b)`.

### map / filter / reduce (slide 17)

```js
[1, 2, 3, 4].map(n => n * n);                 // [1, 4, 9, 16]
[15, 22, 18].filter(e => e >= 18);            // [22, 18]
[10, 25, 5].reduce((total, p) => total + p, 0); // 40
```

None of them change the original, and you can chain them.

### Objects (slides 18–21)

- You create objects with a class (recommended) or a constructor function, always with `new`.
- `persona1.residencia.ciudad` gives a TypeError if `residencia` doesn't exist. `persona1.residencia?.ciudad` gives undefined instead.
- Methods go inside the class without the word `function`, and they use `this`.
- `persona[campo]` uses the value of the variable `campo` as the key, while `persona["campo"]` looks for a key literally named campo.
- `persona[0]` gives undefined because objects aren't indexed by position.
- You can add or `delete` properties at any time. `"edad" in persona` checks whether a property exists.

---

## When nothing normal comes back

| Result | When |
|---|---|
| undefined | a variable with no value, a missing property, an index past the end, a function with no return, a missing argument, `alert()`, `forEach`, `obj[0]` |
| null | `prompt` after Cancelar, `getItem` on a missing key, `searchParams.get` on a missing parameter |
| NaN | `parseInt("px42")`, `Number("42px")`, `"abc" * 2`, `undefined + 1`, an invalid Date |
| -1 | `indexOf` / `lastIndexOf` when not found |
| "" | `charAt` past the end |
| ReferenceError | let/const used before its line, a variable never declared, an arrow function called early |
| TypeError | reassigning a const, `undefined.prop`, a class used without `new`, `for...of` over an object |
| SyntaxError | a name starting with a digit, invalid JSON |

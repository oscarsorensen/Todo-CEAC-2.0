/*
 * Crea los siguientes arrays:
 *   - `empty`: un array vacío con [].
 *   - `mixed`: con [], que contenga 7, "siete" y true.
 *   - `slots`: con `new Array`, 5 huecos vacíos.
 *   - `single`: con `Array.of`, que contenga solo el número 5.
 *   - `pair`: con `new Array`, que contenga 5 y 10.
 */

const empty = []; // TODO
const mixed = [7, "siete", true]; // TODO
const slots = new Array(5); // TODO
const single = Array.of(5); // TODO
const pair = new Array(5, 10);

console.log("empty:", empty.length, empty);
console.log("mixed:", mixed.length, mixed);
console.log("slots:", slots.length, slots);
console.log("single:", single.length, single);
console.log("pair:", pair.length, pair);
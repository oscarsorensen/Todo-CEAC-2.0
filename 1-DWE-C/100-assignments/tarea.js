Partiendo de un array con las notas de varios alumnos, calcula sus medias y muestra por consola una clasificación ordenada.

 
const datos = [
  ["Ana", "7", "8", "9"],
  ["Luis", "4", "abc", "5", "-1"],
  ["Marta", "10", "9", "11", "8"],
  ["Pedro", "3", "x", "5", "4"],
  ["Sofía", "6.5", "7.5"],
];
Requisitos:

Crea una clase Alumno con las propiedades nombre y notas (un array de números). Añade un método media() que calcule la media con reduce y un método aprobado(notaMinima = 5) que indique si la media llega a esa nota.
Escribe una función convertirNotas(textos) que reciba un array de notas en texto, las convierta con parseFloat y descarte con filter las que no sean número o estén fuera del rango 0-10.
A partir de datos, crea con map un array de objetos Alumno. El primer elemento de cada fila es el nombre y el resto son las notas.
Ordena los alumnos por media, de mayor a menor, usando sort con una función comparadora.
Muestra por consola una línea por alumno con este formato: “Marta: 10, 9, 8 → media 9 (Aprobado)”.
Muestra la lista de aprobados obtenida con filter, map y join: “Aprobados: Marta, Ana, Sofía.” Si no hay ninguno, el texto será “No hay aprobados.”
Muestra la media de la clase, calculada como la media de las medias de los alumnos, y la nota más alta con el nombre de su alumno, recorriendo todas las notas con dos bucles anidados.
const http = require('http');

//here we learn how nodejs bascially have build-in session cookies. It remembers it all.
let contador = 1;

http.createServer((peticion, respuesta) => {
  contador++;
  
  respuesta.write('<h1>Elcontador es: '+contador+'<h1>');
  respuesta.end();
}).listen(3001);

console.log('El servidor está corriendo en http://localhost:3001/');
const http = require('http');

const estilos = `
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    color: #222;
    background: #f4f6fb;
  }
  header {
    background: #2b3a67;
    color: #fff;
    padding: 1.5rem 1rem;
    text-align: center;
  }
  header h1 { margin: 0 0 1rem; }
  nav a {
    color: #fff;
    text-decoration: none;
    margin: 0 .5rem;
    padding: .4rem .9rem;
    border-radius: 999px;
  }
  nav a:hover, nav a.activo { background: #4a5f9e; }
  main {
    max-width: 700px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .08);
  }
  h2 { color: #2b3a67; margin-top: 0; }
  ul { padding-left: 1.2rem; }
  footer {
    text-align: center;
    color: #777;
    padding: 1rem;
    font-size: .9rem;
  }
`;

const enlaces = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/sobremi', texto: 'Sobre mi' },
  { ruta: '/contacto', texto: 'Contacto' },
];

const paginas = {
  '/': {
    titulo: 'Inicio',
    contenido: `
      <h2>Bienvenido</h2>
      <p>Esta es mi web personal, hecha con Node.js sin ninguna libreria.</p>
      <p>Usa el menu de arriba para moverte por las paginas.</p>
    `,
  },
  '/sobremi': {
    titulo: 'Sobre mi',
    contenido: `
      <h2>Sobre mi</h2>
      <p>Soy Oscar Sorensen y estoy aprendiendo desarrollo web en CEAC.</p>
      <p>Cosas que estoy aprendiendo:</p>
      <ul>
        <li>HTML y CSS</li>
        <li>PHP</li>
        <li>Node.js</li>
      </ul>
    `,
  },
  '/contacto': {
    titulo: 'Contacto',
    contenido: `
      <h2>Contacto</h2>
      <p>Puedes escribirme a <a href="mailto:oscar081100@gmail.com">oscar081100@gmail.com</a>.</p>
    `,
  },
};

const noEncontrada = {
  titulo: 'No encontrado',
  contenido: `
    <h2>404</h2>
    <p>Esta pagina no existe. <a href="/">Volver al inicio</a>.</p>
  `,
};

function maquetar(rutaActual, pagina) {
  const menu = enlaces
    .map(({ ruta, texto }) => {
      const clase = ruta === rutaActual ? ' class="activo"' : '';
      return `<a href="${ruta}"${clase}>${texto}</a>`;
    })
    .join('');

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${pagina.titulo} | La web de Oscar Sorensen</title>
    <style>${estilos}</style>
  </head>
  <body>
    <header>
      <h1>La web de Oscar Sorensen</h1>
      <nav>${menu}</nav>
    </header>
    <main>${pagina.contenido}</main>
    <footer>&copy; ${new Date().getFullYear()} Oscar Sorensen</footer>
  </body>
</html>`;
}

const server = http.createServer((peticion, respuesta) => {
  const pagina = paginas[peticion.url];
  respuesta.writeHead(pagina ? 200 : 404, {
    'Content-Type': 'text/html; charset=utf-8',
  });
  respuesta.end(maquetar(peticion.url, pagina || noEncontrada));
});

server.listen(3001, () => {
  console.log('Servidor corriendo en: http://localhost:3001/');
});

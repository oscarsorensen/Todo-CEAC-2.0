let formulario = document.querySelector("#formulario")
let entrada = document.querySelector("#entrada")
let boton = document.querySelector("#enviar")
let mensajes = document.querySelector("main section")
let lista = document.querySelector("#conversaciones")
let esperando = false
// Conversación abierta (null = conversación nueva, aún sin crear)
let conversacion = null

// Escapa el HTML para que el texto nunca se interprete como código
function escapar(texto){
  return texto.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
}

// Convierte un Markdown sencillo (negrita, cursiva, código, listas) en HTML
function markdown(texto){
  let bloques = []
  texto = escapar(texto).replace(/```(?:\w+)?\n?([\s\S]*?)```/g, function(_, codigo){
    bloques.push("<pre><code>"+codigo.trim()+"</code></pre>")
    return "\u0000"+(bloques.length-1)+"\u0000"
  })
  let html = texto.trim().split(/\n{2,}/).map(function(parrafo){
    let lineas = parrafo.split("\n")
    if(/^\u0000\d+\u0000$/.test(parrafo)) return parrafo
    if(lineas.every(function(l){return /^\s*[-*]\s+/.test(l)}))
      return "<ul>"+lineas.map(function(l){return "<li>"+l.replace(/^\s*[-*]\s+/,"")+"</li>"}).join("")+"</ul>"
    if(lineas.every(function(l){return /^\s*\d+[.)]\s+/.test(l)}))
      return "<ol>"+lineas.map(function(l){return "<li>"+l.replace(/^\s*\d+[.)]\s+/,"")+"</li>"}).join("")+"</ol>"
    if(lineas.length == 1 && /^#{1,6}\s/.test(parrafo))
      return "<h4>"+parrafo.replace(/^#{1,6}\s+/,"")+"</h4>"
    return "<p>"+lineas.join("<br>")+"</p>"
  }).join("")
  html = html
    .replace(/`([^`\n]+)`/g,"<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")
    .replace(/(^|[^*\w])\*(?!\s)([^*\n]+?)\*(?![*\w])/g,"$1<em>$2</em>")
  return html.replace(/\u0000(\d+)\u0000/g, function(_, i){return bloques[i]})
}

// La fecha guardada en la base de datos son segundos (Unix)
function hora(fecha){
  let dia = fecha ? new Date(fecha*1000) : new Date()
  return dia.toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})
}

function bajar(){
  mensajes.scrollTop = mensajes.scrollHeight
}

// Añade un mensaje a la conversación y devuelve su elemento
function añadir(clase, html, fecha){
  let articulo = document.createElement("article")
  articulo.className = clase
  articulo.innerHTML = '<div class="contenido">'+html+'</div><span class="hora">'+hora(fecha)+'</span>'
  mensajes.appendChild(articulo)
  bajar()
  return articulo
}

// Botón para copiar la respuesta de la IA
function añadirCopiar(articulo, texto){
  let copiar = document.createElement("button")
  copiar.type = "button"
  copiar.className = "copiar"
  copiar.textContent = "Copiar"
  copiar.onclick = function(){
    navigator.clipboard.writeText(texto).then(function(){
      copiar.textContent = "Copiado ✓"
      setTimeout(function(){copiar.textContent = "Copiar"}, 1500)
    })
  }
  articulo.querySelector(".hora").appendChild(copiar)
}

function pintarMensaje(emisor, texto, fecha){
  if(emisor == "usuario"){
    añadir("usuario", escapar(texto).replace(/\n/g,"<br>"), fecha)
  }else{
    añadirCopiar(añadir("ia", markdown(texto), fecha), texto.trim())
  }
}

// Barra lateral: lista de conversaciones guardadas
function cargarLista(){
  return fetch("servidor.php?accion=listar")
    .then(function(retorno){return retorno.json()})
    .then(function(conversaciones){
      lista.innerHTML = ""
      if(conversaciones.length == 0){
        lista.innerHTML = '<li class="vacia">Aún no hay conversaciones.</li>'
      }
      conversaciones.forEach(function(c){
        let boton = document.createElement("button")
        boton.type = "button"
        boton.className = "conv" + (c.id == conversacion ? " activa" : "")
        let titulo = document.createElement("span")
        titulo.textContent = c.titulo || "Sin título"
        let fecha = document.createElement("small")
        fecha.textContent = new Date(c.fecha*1000).toLocaleDateString("es-ES",{day:"numeric",month:"short"})
        boton.append(titulo, fecha)
        boton.onclick = function(){abrir(c.id)}
        let elemento = document.createElement("li")
        elemento.append(boton)
        lista.append(elemento)
      })
    })
}

// Abre una conversación guardada
function abrir(id){
  if(esperando || id == conversacion) return
  fetch("servidor.php?accion=mensajes&id_conversacion="+id)
    .then(function(retorno){return retorno.json()})
    .then(function(guardados){
      conversacion = id
      mensajes.innerHTML = ""
      guardados.forEach(function(m){
        if(m.mensaje) pintarMensaje(m.emisor, m.mensaje, m.fecha)
      })
      bajar()
      cargarLista()
      entrada.focus()
    })
}

// Empieza una conversación nueva (se guarda al enviar el primer mensaje)
function nueva(){
  if(esperando) return
  conversacion = null
  mensajes.innerHTML = ""
  cargarLista()
  entrada.focus()
}

function ajustarAltura(){
  entrada.style.height = "auto"
  entrada.style.height = Math.min(entrada.scrollHeight,200)+"px"
}

function actualizarBoton(){
  boton.disabled = esperando || entrada.value.trim() == ""
}

function enviar(valor){
  valor = valor.trim()
  if(valor == "" || esperando) return
  esperando = true
  // Lo pongo en los mensajes
  pintarMensaje("usuario", valor)
  // Vacío el input
  entrada.value = ""
  ajustarAltura()
  actualizarBoton()
  // Indicador de que la IA está escribiendo
  let escribiendo = document.createElement("article")
  escribiendo.className = "ia escribiendo"
  escribiendo.innerHTML = "<i></i><i></i><i></i>"
  mensajes.appendChild(escribiendo)
  bajar()
  // Lo envío al servidor
  let url = "servidor.php?mensaje="+encodeURIComponent(valor)
  if(conversacion) url += "&id_conversacion="+conversacion
  fetch(url)
    .then(function(retorno){return retorno.json()})
    .then(function(datos){
      escribiendo.remove()
      conversacion = datos.id
      if(datos.error){
        añadir("ia error", "<p>La IA no ha podido responder: "+escapar(datos.error)+"</p>")
      }else{
        pintarMensaje("ia", datos.respuesta)
      }
      cargarLista()
    })
    .catch(function(){
      escribiendo.remove()
      añadir("ia error", "<p>No he podido conectar con el servidor. Inténtalo de nuevo.</p>")
    })
    .finally(function(){
      esperando = false
      actualizarBoton()
      entrada.focus()
    })
}

formulario.onsubmit = function(e){
  e.preventDefault()
  enviar(entrada.value)
}

// Enter envía, Mayús + Enter añade una línea
entrada.onkeydown = function(e){
  if(e.key == "Enter" && !e.shiftKey && !e.isComposing){
    e.preventDefault()
    enviar(this.value)
  }
}

entrada.oninput = function(){
  ajustarAltura()
  actualizarBoton()
}

// Sugerencias de la pantalla de bienvenida
document.querySelectorAll(".sugerencias button").forEach(function(sugerencia){
  sugerencia.onclick = function(){enviar(this.textContent)}
})

document.querySelector("#nueva").onclick = nueva
document.querySelector("#nueva-barra").onclick = nueva

// Cambio de tema claro / oscuro
document.querySelector("#tema").onclick = function(){
  let raiz = document.documentElement
  raiz.dataset.theme = raiz.dataset.theme == "dark" ? "light" : "dark"
  try { localStorage.setItem("tema", raiz.dataset.theme) } catch (e) {}
}

actualizarBoton()
cargarLista()

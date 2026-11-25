// Belt ladder: disclosure buttons (aria-expanded + hidden panel).
document.querySelectorAll("#escalera button").forEach((boton) => {
  const detalle = document.getElementById(boton.getAttribute("aria-controls"));
  boton.addEventListener("click", () => {
    const abierto = boton.getAttribute("aria-expanded") === "true";
    boton.setAttribute("aria-expanded", String(!abierto));
    detalle.hidden = abierto;
  });
});

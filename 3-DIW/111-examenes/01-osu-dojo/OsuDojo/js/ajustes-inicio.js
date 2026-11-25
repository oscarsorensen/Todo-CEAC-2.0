// Runs in <head> before the page paints, so saved reading settings
// (bigger text, less motion, high contrast) never flash on load.
(function () {
  try {
    var guardados = JSON.parse(localStorage.getItem("osu-ajustes") || "{}");
    Object.keys(guardados).forEach(function (clase) {
      if (guardados[clase]) document.documentElement.classList.add(clase);
    });
  } catch (e) {
    // Private mode or blocked storage: default settings.
  }
})();

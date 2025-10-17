document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-recomendacion");
  const lista = document.getElementById("lista-recomendaciones");

  // Cargar recomendaciones existentes
  const recomendaciones = JSON.parse(localStorage.getItem("recomendaciones")) || [];
  mostrarRecomendaciones(recomendaciones);

  // Manejar envío
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (nombre && mensaje) {
      const nueva = { nombre, mensaje, fecha: new Date().toLocaleDateString() };
      recomendaciones.push(nueva);
      localStorage.setItem("recomendaciones", JSON.stringify(recomendaciones));
      mostrarRecomendaciones(recomendaciones);
      form.reset();
    }
  });

  function mostrarRecomendaciones(listaRec) {
    lista.innerHTML = "";
    listaRec.forEach((r) => {
      const div = document.createElement("div");
      div.classList.add("recomendacion");
      div.innerHTML = `
        <h3>${r.nombre}</h3>
        <p>"${r.mensaje}"</p>
        <span class="fecha">${r.fecha}</span>
      `;
      lista.appendChild(div);
    });
  }
});

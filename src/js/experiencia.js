document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("lista-experiencia");

  try {
    const respuesta = await fetch("./data/experiencia.json");
    const experiencias = await respuesta.json();

    experiencias.forEach(exp => {
      const card = document.createElement("div");
      card.classList.add("experiencia-card");
      card.innerHTML = `
        <div class="experiencia-header">
          <h3>${exp.puesto}</h3>
          <span class="empresa">${exp.empresa}</span>
        </div>
        <p class="periodo">${exp.periodo}</p>
        <p class="descripcion">${exp.descripcion}</p>
      `;
      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando la experiencia:", error);
    contenedor.innerHTML = "<p>No se pudo cargar la experiencia laboral.</p>";
  }
});

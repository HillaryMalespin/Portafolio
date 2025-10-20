document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-recommendation");
  const nameInput = document.getElementById("name");
  const messageInput = document.getElementById("message");
  const list = document.getElementById("recommendation-list");

  // Cargar recomendaciones guardadas
  const stored = JSON.parse(localStorage.getItem("recommendations")) || [];
  stored.forEach(rec => addRecommendation(rec.name, rec.message));

  // Escuchar el envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) return;

    const recommendation = { name, message };

    // Mostrar la nueva recomendación en pantalla
    addRecommendation(name, message);

    // Guardar en localStorage
    stored.push(recommendation);
    localStorage.setItem("recommendations", JSON.stringify(stored));

    // Limpiar el formulario
    nameInput.value = "";
    messageInput.value = "";
  });

  // Función para crear y mostrar la recomendación
  function addRecommendation(name, message) {
    const div = document.createElement("div");
    div.classList.add("recommendation-item");
    div.innerHTML = `
      <h4>${name}</h4>
      <p>${message}</p>
    `;
    div.style.opacity = "0";
    list.prepend(div);

    // Animación de aparición
    setTimeout(() => {
      div.style.transition = "opacity 0.5s ease-in-out";
      div.style.opacity = "1";
    }, 100);
  }
});

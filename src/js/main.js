async function cargarPerfil() {
  const res = await fetch("data/profile.json"); //
  const perfil = await res.json();

  document.getElementById("name").textContent = perfil.name;
  document.getElementById("bio").textContent = perfil.bio;
  document.getElementById("intro").textContent = perfil.intro;
  document.getElementById("photo").src = perfil.photo;
}

cargarPerfil();

fetch("./data/profile.json")
  .then(response => response.json())
  .then(data => {
    document.getElementById("profile-photo").src = data.photo;
    document.getElementById("profile-name").textContent = data.name;
    document.getElementById("profile-bio").textContent = data.bio;
    document.getElementById("profile-intro").textContent = data.intro;
  })
  .catch(error => console.error("Error al cargar el perfil:", error));

async function loadCourses() {
    try {
        const response = await fetch("./data/courses.json");
        const courses = await response.json();

        const container = document.getElementById("courses-container");
        container.innerHTML = "";

        courses.forEach(course => {
            // Crear contenedor de curso
            const courseDiv = document.createElement("div");
            courseDiv.classList.add("course-card");

            // Encabezado con botón "+"
            const header = document.createElement("div");
            header.classList.add("course-header");
            header.innerHTML = `
                <h3>${course.code} - ${course.name}</h3>
                <button class="toggle-btn">+</button>
            `;

            // Contenido oculto
            const content = document.createElement("div");
            content.classList.add("course-content");
            content.style.display = "none"; // oculto por defecto

            content.innerHTML = `
                <p><strong>Semestre:</strong> ${course.semester}</p>
                <p><strong>Descripción:</strong> ${course.techDesc || course.description}</p>
                <div class="works">
                    ${course.works.map(work => `
                        <div class="work-card">
                            <h4>${work.title}</h4>
                            <p><strong>Tipo:</strong> ${work.type}</p>
                            <p>${work.summary || work.description}</p>
                            <p><strong>Fecha:</strong> ${work.date}</p>
                            <p><strong>Tecnologías:</strong> ${(work.tech || work.technologies).join(", ")}</p>
                            ${work.repo ? `<a href="${work.repo}" target="_blank">Repositorio</a>` : ""}
                            ${work.demo ? `<a href="${work.demo}" target="_blank">Demo</a>` : ""}
                            ${work.link ? `<a href="${work.link}" target="_blank">Ver más</a>` : ""}
                        </div>
                    `).join("")}
                </div>
            `;

            // Toggle mostrar/ocultar
            header.querySelector(".toggle-btn").addEventListener("click", () => {
                const isVisible = content.style.display === "block";
                content.style.display = isVisible ? "none" : "block";
                header.querySelector(".toggle-btn").textContent = isVisible ? "+" : "−";
            });

            courseDiv.appendChild(header);
            courseDiv.appendChild(content);
            container.appendChild(courseDiv);
        });
    } catch (error) {
        console.error("Error cargando cursos:", error);
    }
}

loadCourses();

// Función para cargar datos de About Me
async function loadAboutMe() {
  try {
    const response = await fetch('data/aboutme.json');
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    const aboutContainer = document.getElementById('about-content');

    // Generar habilidades por categorías
    const skillsHTML = data.skills.map(category => `
      <div class="skill-category">
        <h4>${category.category}</h4>
        <ul>
          ${category.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    // Generar certificaciones
    const certificationsHTML = data.certifications.map(cert => `
      <li>${cert.name} – ${cert.institution} (${cert.year})</li>
    `).join('');

    // Render dinámico
    aboutContainer.innerHTML = `
      <div class="about-card">
        <div class="about-header">
          <img src="${data.photo}" alt="Foto de ${data.name}" class="about-photo">
          <h3>${data.name}</h3>
        </div>
        <p>${data.description}</p>

        <h3>Habilidades</h3>
        ${skillsHTML}

        <h3>Certificaciones</h3>
        <ul>${certificationsHTML}</ul>

        <div class="links">
          <a href="${data.linkedin}" target="_blank">LinkedIn</a> |
          <a href="${data.github}" target="_blank">GitHub</a> |
          <a href="mailto:${data.email}">Email</a>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error cargando aboutme.json:", error);
  }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  loadAboutMe();
});

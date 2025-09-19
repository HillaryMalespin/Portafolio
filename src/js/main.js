document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});


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


// Función para cargar datos de About Me
async function loadAboutMe() {
  try {
    const response = await fetch("data/aboutme.json");
    const data = await response.json();

    const aboutContainer = document.getElementById("about-content");

    // Foto + descripción
    aboutContainer.innerHTML = `
      <img src="${data.photo}" alt="Profile photo of ${data.name}" class="about-photo">
      <p>${data.description}</p>
    `;

    // Skills
    const skillsHTML = data.skills.map(skill => `
      <div class="skill-category">
        <h3>${skill.category}</h3>
        <ul>
          ${skill.items.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `).join("");

    aboutContainer.innerHTML += `
      <h2>Skills</h2>
      <div class="skills-container">${skillsHTML}</div>
    `;

    // Certifications
    const certificationsHTML = data.certifications.map(cert => `
      <a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="cert-link">
        <div class="cert-card">
          <h3>${cert.name}</h3>
          <p>${cert.institution} – ${cert.year}</p>
        </div>
      </a>
    `).join("");

    aboutContainer.innerHTML += `
      <h2>Certifications</h2>
      <div class="certifications-container">${certificationsHTML}</div>
    `;

  } catch (error) {
    console.error("Error loading aboutme.json:", error);
  }
}



// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  loadAboutMe();
});

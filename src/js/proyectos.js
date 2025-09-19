document.addEventListener("DOMContentLoaded", () => {
  loadCourses();
});

async function loadCourses() {
  const container = document.getElementById("courses-container");

  try {
    const response = await fetch("./data/courses.json");
    const courses = await response.json();

    // Agrupar por semestre
    const grouped = {};
    courses.forEach(course => {
      if (!grouped[course.semester]) {
        grouped[course.semester] = [];
      }
      grouped[course.semester].push(course);
    });

    // Renderizar
    Object.entries(grouped).forEach(([semester, courses]) => {
      const semesterDiv = document.createElement("div");
      semesterDiv.classList.add("semester");

      const semesterTitle = document.createElement("h2");
      semesterTitle.textContent = `Semestre ${semester}`;
      semesterDiv.appendChild(semesterTitle);

      const coursesGrid = document.createElement("div");
      coursesGrid.classList.add("courses");

      courses.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        const header = document.createElement("div");
        header.classList.add("course-header");

        const title = document.createElement("span");
        title.textContent = `${course.code} - ${course.name}`;

        const toggleBtn = document.createElement("button");
        toggleBtn.classList.add("course-toggle");
        toggleBtn.textContent = "+";

        header.appendChild(title);
        header.appendChild(toggleBtn);

        const content = document.createElement("div");
        content.classList.add("course-content");

        let description = course.techDesc || course.description || "";

        content.innerHTML = `
          <p>${description}</p>
          <ul>
            ${course.works.map(w => `
              <li>
                <strong>${w.title}</strong> (${w.type}) - ${w.date}<br>
                ${w.summary || w.description || ""}<br>
                ${w.repo ? `<a href="${w.repo}" target="_blank">Repositorio</a>` : ""}
                ${w.demo ? ` | <a href="${w.demo}" target="_blank">Demo</a>` : ""}
                ${w.link ? `<a href="${w.link}" target="_blank">Ver trabajo</a>` : ""}
              </li>
            `).join("")}
          </ul>
        `;

        toggleBtn.addEventListener("click", () => {
          content.classList.toggle("active");
          toggleBtn.textContent = content.classList.contains("active") ? "−" : "+";
        });

        card.appendChild(header);
        card.appendChild(content);
        coursesGrid.appendChild(card);
      });

      semesterDiv.appendChild(coursesGrid);
      container.appendChild(semesterDiv);
    });

  } catch (error) {
    container.innerHTML = "<p>Error al cargar los cursos.</p>";
    console.error(error);
  }
}

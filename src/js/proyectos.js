document.addEventListener("DOMContentLoaded", () => {
  loadCourses();
});

async function loadCourses() {
  const container = document.getElementById("courses-container");

  try {
    const response = await fetch("./data/courses.json");
    const courses = await response.json();

    // Group courses by semester
    const grouped = {};
    courses.forEach(course => {
      if (!grouped[course.semester]) {
        grouped[course.semester] = [];
      }
      grouped[course.semester].push(course);
    });

    // Render each semester
    Object.entries(grouped).forEach(([semester, courses]) => {
      const semesterDiv = document.createElement("div");
      semesterDiv.classList.add("semester");

      const semesterTitle = document.createElement("h2");
      semesterTitle.textContent = `Semester ${semester}`;
      semesterDiv.appendChild(semesterTitle);

      const coursesGrid = document.createElement("div");
      coursesGrid.classList.add("courses");

      // Render each course card
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

        // 
        content.innerHTML = `
          <p>${description}</p>
          <ul>
            ${course.works.map(work => `
              <li>
                <strong>${work.title}</strong> 
                <em>(${work.type})</em> - ${work.date}<br>
                ${work.summary || work.description || ""}<br>
                ${work.repo ? `<a href="${work.repo}" target="_blank">Repository</a>` : ""}
                ${work.demo ? ` | <a href="${work.demo}" target="_blank">Demo</a>` : ""}
                ${work.link ? ` | <a href="${work.link}" target="_blank">View work</a>` : ""}
                ${work.tech && work.tech.length > 0 
                  ? `<p><strong>Technologies:</strong> ${work.tech.join(", ")}</p>` 
                  : ""}
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
    container.innerHTML = "<p>Error loading courses.</p>";
    console.error(error);
  }
}

async function cargarPerfil() {
  const res = await fetch("data/profile.json"); // asegúrate de la ruta
  const perfil = await res.json();

  document.getElementById("name").textContent = perfil.name;
  document.getElementById("bio").textContent = perfil.bio;
  document.getElementById("intro").textContent = perfil.intro;
  document.getElementById("photo").src = perfil.photo;
}

cargarPerfil();

fetch("data/profile.json")
  .then(response => response.json())
  .then(data => {
    document.getElementById("profile-photo").src = data.photo;
    document.getElementById("profile-name").textContent = data.name;
    document.getElementById("profile-bio").textContent = data.bio;
    document.getElementById("profile-intro").textContent = data.intro;
  })
  .catch(error => console.error("Error al cargar el perfil:", error));



const token = sessionStorage.getItem("token");
const mensaje = document.createElement("div");
mensaje.id = "mensaje";
mensaje.style.cssText = `
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  z-index: 1000;
  max-width: 300px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  `;
document.body.prepend(mensaje);

function mostrarPerfil(data) {
  if (data.nombre) document.querySelector('input[name="nombre"]').value = data.nombre;
  if (data.foto_url) document.querySelector('input[name="foto_url"]').value = data.foto_url;
  if (data.email) document.querySelector('input[name="email"]').value = data.email;
  if (data.telefono) document.querySelector('input[name="telefono"]').value = data.telefono;
  console.log("Perfil cargado:", data);
}

// Verifica si hay token: si no hay, redirige al login
    if (!sessionStorage.getItem("token")) {
        window.location.href = "login.html";
      }
  //Carga datos del artista al iniciar
      fetch('http://localhost:3000/api/artista/perfil', { 
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` }
        }).then(response => response.json())
       .then(data => mostrarPerfil(data))
       .catch(() => mensaje.innerText = "Error al cargar perfil");

    // Perfil
    document.getElementById("formPerfil").addEventListener("submit", function(e) {
      e.preventDefault();
      const body = {
        nombre: this.nombre.value,
        foto_url: this.foto_url.value,
        email: this.email.value,
        telefono: this.telefono.value
      };
      fetch("http://localhost:3000/api/artista/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(data => mensaje.innerText = data.mensaje || data.error)
      .catch(() => mensaje.innerText = "Error al actualizar perfil");
    });

    // Portfolio
    document.getElementById("formPortfolio").addEventListener("submit", function(e) {
      e.preventDefault();
      const url = this.portfolio_url.value;
      fetch("http://localhost:3000/api/artista/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ url })
      })
      .then(res => res.json())
      .then(data => mensaje.innerText = data.mensaje || data.error)
      .catch(() => mensaje.innerText = "Error al guardar portfolio");
    });

    // Plataformas
    document.getElementById("formPlataformas").addEventListener("submit", function(e) {
      e.preventDefault();
      const body = {
        spotify: this.spotify.value,
        apple: this.apple.value,
        tidal: this.tidal.value,
        ytmusic: this.ytmusic.value
      };
      fetch("http://localhost:3000/api/artista/plataformas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(data => mensaje.innerText = data.mensaje || data.error)
      .catch(() => mensaje.innerText = "Error al guardar plataformas");
    });

    // Redes
    document.getElementById("formRedes").addEventListener("submit", function(e) {
      e.preventDefault();
      const body = {
        youtube: this.youtube.value,
        instagram: this.instagram.value
      };
      fetch("http://localhost:3000/api/artista/redes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(data => mensaje.innerText = data.mensaje || data.error)
      .catch(() => mensaje.innerText = "Error al guardar redes");
    });

    // Evento
    document.getElementById("formEvento").addEventListener("submit", function(e) {
      e.preventDefault();
      const body = {
        fecha: this.fecha.value,
        lugar: this.lugar.value,
        modalidad: this.modalidad.value,
        precio: this.precio.value,
        link_entradas: this.link_entradas.value,
        flyer: this.flyer.value
      };
      fetch("http://localhost:3000/api/artista/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(data => mensaje.innerText = data.mensaje || data.error)
      .catch(() => mensaje.innerText = "Error al agregar evento");
    }); 
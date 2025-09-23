document.getElementById("registroForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const formData = new FormData(this);
    const datos = Object.fromEntries(formData.entries());
  
    fetch("http://localhost:3000/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"},
        body: JSON.stringify(datos)
      
    })
      .then(res => res.json())
      .then(data => {
        document.getElementById("respuesta").innerText = data.mensaje || "Algo salió mal.";
        if (data.mensaje) this.reset(); // Resetea el formulario si se registró correctamente
      })
      .catch(error => {
        console.error("Error:", error);
        document.getElementById("respuesta").innerText = "Hubo un error en el envío.";
      });
  });
  
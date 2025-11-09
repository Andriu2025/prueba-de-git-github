document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("comentariosLista");
  const btn = document.getElementById("btnEnviarComentario");
  const estrellas = document.querySelectorAll("input[name='estrella']");
  let ultimaSeleccion = null;

  // Permitir destildar estrellas al hacer clic nuevamente
  estrellas.forEach(e => {
    e.addEventListener("click", function() {
      if (ultimaSeleccion === this) {
        this.checked = false;
        ultimaSeleccion = null;
      } else {
        ultimaSeleccion = this;
      }
    });
  });

  // Mostrar comentarios guardados
  mostrarComentarios();

  btn.addEventListener("click", () => {
    const texto = document.getElementById("comentarioTexto").value.trim();
    const estrellaSeleccionada = document.querySelector("input[name='estrella']:checked");
    const estrellasValor = estrellaSeleccionada ? estrellaSeleccionada.value : "Sin calificar";

    if (texto === "") {
      alert("Por favor escribí un comentario antes de enviar.");
      return;
    }

    const nuevoComentario = {
      texto,
      estrellas: estrellasValor,
      fecha: new Date().toLocaleString()
    };

    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    comentarios.push(nuevoComentario);
    localStorage.setItem("comentarios", JSON.stringify(comentarios));

    // Limpiar formulario
    document.getElementById("comentarioTexto").value = "";
    if (estrellaSeleccionada) estrellaSeleccionada.checked = false;
    ultimaSeleccion = null;

    mostrarComentarios();
  });

  function mostrarComentarios() {
    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    lista.innerHTML = "<h3>Comentarios recientes</h3>";

    if (comentarios.length === 0) {
      lista.innerHTML += "<p>No hay comentarios aún.</p>";
      return;
    }

    comentarios.slice().reverse().forEach(c => {
      let estrellasHTML = "";
      if (c.estrellas !== "Sin calificar") {
        estrellasHTML = "★".repeat(parseInt(c.estrellas)) + "☆".repeat(5 - parseInt(c.estrellas));
      } else {
        estrellasHTML = "Sin calificar";
      }

      lista.innerHTML += `
        <div class="comentario">
          <strong>${estrellasHTML}</strong>
          <p>${c.texto}</p>
          <small>${c.fecha}</small>
        </div>
      `;
    });
  }
});


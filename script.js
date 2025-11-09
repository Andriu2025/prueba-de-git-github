  const card = document.getElementById('card');
        const toRegister = document.getElementById('toRegister');
        const toLogin = document.getElementById('toLogin');
        const loginContainer = document.getElementById('loginContainer');
        const mainContent = document.getElementById('mainContent');

        // Cambiar entre login y registro
        toRegister.addEventListener('click', () => {
            card.classList.add('flipped');
        });

        toLogin.addEventListener('click', () => {
            card.classList.remove('flipped');
        });

        // LOGIN
        document.getElementById('loginBtn').addEventListener('click', () => {
            const user = document.getElementById('loginUser').value.trim();
            const pass = document.getElementById('loginPass').value.trim();

            if (user === "" || pass === "") {
                alert("⚠️ Por favor, complete todos los campos.");
            } else {
                alert(`Bienvenido ${user} a Panadería Don Fermín 🍞`);
                // Ocultar login, mostrar página principal
                loginContainer.style.display = "none";
                mainContent.style.display = "block";
                // Evita que el header quede tapado por margen del login
                document.body.style.display = "block";
            }
        });

        // REGISTRO
        document.getElementById('registerBtn').addEventListener('click', () => {
            const regUser = document.getElementById('regUser').value.trim();
            const regEmail = document.getElementById('regEmail').value.trim();
            const regPass = document.getElementById('regPass').value.trim();

            if (regUser === "" || regEmail === "" || regPass === "") {
                alert("⚠️ Complete todos los campos para registrarse.");
            } else {
                alert(`✅ Cuenta creada con éxito para ${regUser}. Ahora puedes iniciar sesión.`);
                card.classList.remove('flipped');
            }
        });
// ====== CONTROL DE SECCIONES CORRECTO (NO OCULTA HEADER/FOOTER) ======
document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("mainContent");
  const carrito = document.getElementById("carrito");
  const estadisticasPanel = document.getElementById("estadisticasPanel");

  const btnEstadisticas = document.getElementById("btnEstadisticas");
  const btnMostrarCarrito = document.getElementById("mostrarCarrito");
  const btnVolverInicio = document.getElementById("volverInicio");
  const btnCerrarEstadisticas = document.getElementById("cerrarEstadisticas");

  // Helper: oculta SOLO las secciones (<section>) dentro de mainContent
  function ocultarSeccionesDentroMain() {
    if (!mainContent) return;
    // selecciona secciones directas dentro de mainContent
    mainContent.querySelectorAll(":scope > section").forEach(sec => {
      sec.style.display = "none";
    });
  }

  // Helper: mostrar las secciones principales del sitio
  function mostrarSeccionesPrincipales() {
    const ids = ["inicio","productos","nosotros","contacto","comentarios"];
    ids.forEach(id => {
      const sec = document.getElementById(id);
      if (sec) sec.style.display = "block";
    });
  }

  // Mostrar carrito: no tocamos header/footer ni mainContent, solo ocultamos secciones internas
  function mostrarCarritoView(e) {
    if (e && e.preventDefault) e.preventDefault();
    ocultarSeccionesDentroMain();
    if (estadisticasPanel) estadisticasPanel.style.display = "none";
    if (carrito) carrito.style.display = "block";

    // Asegurar que header/footer queden visibles (en caso de estilos raros)
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    if (header) header.style.display = "";
    if (footer) footer.style.display = "";
  }

  // Mostrar estadísticas: igual que carrito
  function mostrarEstadisticasView(e) {
    if (e && e.preventDefault) e.preventDefault();
    ocultarSeccionesDentroMain();
    if (carrito) carrito.style.display = "none";
    if (estadisticasPanel) estadisticasPanel.style.display = "block";

    // Llamar a creación de gráficos si existe
    if (typeof crearGraficos === "function") requestAnimationFrame(crearGraficos);
    else if (typeof actualizarGraficos === "function") requestAnimationFrame(actualizarGraficos);

    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    if (header) header.style.display = "";
    if (footer) footer.style.display = "";
  }

  // Volver al inicio: ocultar carrito/estadísticas y mostrar secciones principales
  function volverAlInicioView(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (carrito) carrito.style.display = "none";
    if (estadisticasPanel) estadisticasPanel.style.display = "none";
    mostrarSeccionesPrincipales();
    // header/footer siguen visibles normalmente
  }

  // Asociar eventos (con comprobación)
  if (btnMostrarCarrito) btnMostrarCarrito.addEventListener("click", mostrarCarritoView);
  if (btnEstadisticas) btnEstadisticas.addEventListener("click", mostrarEstadisticasView);
  if (btnVolverInicio) btnVolverInicio.addEventListener("click", volverAlInicioView);
  if (btnCerrarEstadisticas) btnCerrarEstadisticas.addEventListener("click", volverAlInicioView);

  // Inicial: si mainContent ya se mostró por el login, aseguramos que las secciones estén visibles
  if (mainContent && getComputedStyle(mainContent).display !== "none") {
    mostrarSeccionesPrincipales();
  } else {
    // mainContent oculto (login visible): aseguramos que carrito/estadisticas estén ocultos
    if (carrito) carrito.style.display = "none";
    if (estadisticasPanel) estadisticasPanel.style.display = "none";
  }
});

// ====== ARREGLAR NAVEGACIÓN DEL MENÚ ======
document.addEventListener("DOMContentLoaded", () => {
  // Seleccionar todos los enlaces del menú
  const enlacesMenu = document.querySelectorAll("header nav a");

  enlacesMenu.forEach(link => {
    link.addEventListener("click", (e) => {
      const destino = link.getAttribute("href");

      // Si estamos en carrito o estadísticas → primero restauramos
      volverAlInicioView();

      // Si el enlace apunta a una sección real de la página
      if (destino && destino.startsWith("#")) {
        const id = destino.replace("#", "");
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          // Mostramos sección principal correspondiente
          ocultarSeccionesDentroMain();
          target.style.display = "block";
          // Hacer scroll suave
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});

// ====== NAVEGACIÓN DESDE CARRITO (REEMPLAZAR LA VERSIÓN ANTERIOR) ======
function navegarDesdeCarrito(e, destinoID) {
  e.preventDefault();

  // 1) Cerrar carrito (primero)
  const carritoEl = document.getElementById("carrito");
  if (carritoEl) carritoEl.style.display = "none";

  // 2) Asegurar que el contenedor principal esté visible (si tus secciones están dentro de mainContent)
  const mainContentEl = document.getElementById("mainContent");
  if (mainContentEl) mainContentEl.style.display = "block";

  // 3) Ocultar todas las secciones internas del main (para evitar "separar" el layout)
  const secciones = ["inicio","productos","nosotros","contacto","comentarios"];
  secciones.forEach(id => {
    const sec = document.getElementById(id);
    if (sec) sec.style.display = "none";
  });

  // 4) Mostrar la sección destino (si existe)
  const destino = document.getElementById(destinoID);
  if (destino) {
    destino.style.display = "block";

    // 5) Asegurar header/footer visibles sin sobrescribir su CSS (dejamos en '')
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    if (header) header.style.display = "";
    if (footer) footer.style.display = "";

    // 6) Scroll suave y colocarlo al inicio de la sección
    // timeout corto para que DOM tenga tiempo de recalcular estilos
    setTimeout(() => {
      try {
        destino.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (err) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
  } else {
    // si no existe destino, mostramos secciones principales por seguridad
    secciones.forEach(id => {
      const sec = document.getElementById(id);
      if (sec) sec.style.display = "block";
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}


// ====== Aplicar esto SOLO al menú cuando estamos en carrito ======
document.addEventListener("DOMContentLoaded", () => {
  const enlacesMenu = document.querySelectorAll("header nav a");

  enlacesMenu.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const destinoID = href.replace("#", "");

      // Si el carrito está visible → cambia correcto
      if (document.getElementById("carrito").style.display === "block") {
        navegarDesdeCarrito(e, destinoID);
      }
    });
  });
});
document.querySelectorAll("header nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    const destino = link.getAttribute("href");
    if (!destino || !destino.startsWith("#")) return;

    const destinoID = destino.replace("#", "");

    // si el carrito está visible → navegar desde carrito
    if (document.getElementById("carrito").style.display === "block") {
      e.preventDefault();
      mostrarInicio();     // Cerramos carrito
      const target = document.getElementById(destinoID);
      if (!target) return;
      target.style.display = "block";
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  });
});

/* ---------- script.js: manejo carrito separado ---------- */

let carrito = [];

// función que agrega producto
function agregarAlCarrito(nombre, precio) {
  const existente = carrito.find(p => p.nombre === nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  actualizarCarrito();
actualizarContadorCarrito();
mostrarCarrito();

}

// actualiza contenido del carrito
function actualizarCarrito() {
  const cont = document.getElementById("carritoItems");
  const totalElem = document.getElementById("carritoTotal");
  if (!cont || !totalElem) return;

  cont.innerHTML = "";
  let total = 0;

  carrito.forEach((p, index) => {
    const subtotal = p.precio * p.cantidad;
    total += subtotal;

    const item = document.createElement("div");
    item.className = "itemCarrito";
    item.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
        <div>
          <strong>${p.nombre}</strong><br>
          $${p.precio} x 
          <input type="number" min="1" value="${p.cantidad}" id="cant_${index}" style="width:60px; margin-left:8px;">
          = $${subtotal}
        </div>
        <div>
          <button class="btn-quitar" data-index="${index}">❌</button>
        </div>
      </div>
    `;
    cont.appendChild(item);

    // evento cantidad
    const input = item.querySelector(`#cant_${index}`);
    input.addEventListener('change', (e) => {
      const val = parseInt(e.target.value);
      p.cantidad = (isNaN(val) || val < 1) ? 1 : val;
      actualizarCarrito();
    });

    // evento quitar
    item.querySelector('.btn-quitar').addEventListener('click', () => {
      quitarDelCarrito(index);
    });
  });

  totalElem.textContent = `Total: $${total}`;
  actualizarContadorCarrito();

}

// quitar item del carrito
function quitarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
  actualizarContadorCarrito();
}

function mostrarCarrito() {
  const seccionesPrincipales = ["inicio","productos","nosotros","contacto","comentarios"];
  seccionesPrincipales.forEach(id => {
    const sec = document.getElementById(id);
    if (sec) sec.style.display = "none";
  });

  const estadisticas = document.getElementById("estadisticasPanel");
  if (estadisticas) estadisticas.style.display = "none";

  const carritoDiv = document.getElementById("carrito");
if (carritoDiv) carritoDiv.style.display = "block";


  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  if (header) header.style.display = "";
  if (footer) footer.style.display = "";

  actualizarCarrito();
}

function mostrarInicio() {
  const carrito = document.getElementById("carrito");
  const estadisticas = document.getElementById("estadisticasPanel");
  if (carrito) carrito.style.display = "none";
  if (estadisticas) estadisticas.style.display = "none";

  const seccionesPrincipales = ["inicio","productos","nosotros","contacto","comentarios"];
  seccionesPrincipales.forEach(id => {
    const sec = document.getElementById(id);
    if (sec) sec.style.display = "block";
  });

  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  if (header) header.style.display = "";
  if (footer) footer.style.display = "";
}



/* ---------- EVENTOS ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Abrir carrito desde el menú
  const menuCarrito = document.querySelector('a[href="#carrito"]') || document.getElementById('mostrarCarrito');
  if (menuCarrito) {
    menuCarrito.addEventListener('click', (e) => {
      e.preventDefault();
      mostrarCarrito();
    });
  }

  // Vaciar carrito
  const vaciar = document.getElementById('vaciarCarrito');
  if (vaciar) vaciar.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
    actualizarContadorCarrito();
  });

  // Volver al inicio
  const volver = document.getElementById('volverInicio');
  if (volver) volver.addEventListener('click', mostrarInicio);

  // Botones "agregarCarrito"
  document.querySelectorAll('.agregarCarrito').forEach(btn => {
    if (!btn.getAttribute('onclick')) {
      btn.addEventListener('click', () => {
        const nombre = btn.dataset.nombre || 'Producto';
        const precio = parseFloat(btn.dataset.precio || 0);
        agregarAlCarrito(nombre, precio);
      });
    }
  });
});

function actualizarContadorCarrito() {
  let total = 0;
  carrito.forEach(item => {
    total += item.cantidad; // suma cantidades reales
  });

  const cont = document.getElementById("contadorCarrito");
  if (cont) cont.textContent = total;
}


// Comprar productos
const comprar = document.getElementById('comprarCarrito');
if (comprar) comprar.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío. Agregá productos antes de comprar.");
    return;
  }

  let nombre = document.getElementById("nombreComprador").value.trim();
  let direccion = document.getElementById("direccionComprador").value.trim();

  if (nombre === "" || direccion === "") {
    alert("Por favor completá tu nombre y dirección antes de finalizar la compra.");
    return;
  }

  let total = 0;
  let productos = [];

  carrito.forEach(p => {
    const subtotal = p.precio * p.cantidad;
    total += subtotal;
    productos.push({ nombre: p.nombre, cantidad: p.cantidad, subtotal });
  });

  // Guardar en historial (localStorage)
  let historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
  historial.push({
    nombre,
    direccion,
    productos,
    total,
    fecha: new Date().toISOString()

  });
  localStorage.setItem("historialCompras", JSON.stringify(historial));

  // Mostrar alerta resumen
  let mensaje = "🛒 Compra realizada:\n\n";
  productos.forEach(p => {
    mensaje += `• ${p.nombre} x${p.cantidad} = $${p.subtotal}\n`;
  });
  mensaje += `\nTotal final: $${total}`;
  mensaje += `\n\n📍 Para: ${nombre}\n🏠 Dirección: ${direccion}`;
  alert(mensaje);

  registrarVenta(total);

  carrito = [];
  actualizarCarrito();
  actualizarContadorCarrito();
});




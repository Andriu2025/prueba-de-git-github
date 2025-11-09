/* ---------- estadisticas.js ---------- */

document.addEventListener("DOMContentLoaded", () => {
  const btnEstadisticas = document.getElementById("btnEstadisticas");
  const mainContent = document.getElementById("mainContent");
  const estadisticasPanel = document.getElementById("estadisticasPanel");
  const cerrar = document.getElementById("cerrarEstadisticas");

  let chartVentas = null;
  let chartValor = null;

  // Cargar ventas guardadas (si existen), sino crear un array vacío:
  let ventasPorMes = JSON.parse(localStorage.getItem("ventasPorMes")) || 
                   [0,0,0,0,0,0,0,0,0,0,0,0];


  // Función para contar valoraciones desde comentarios
  function contarValoraciones() {
    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    let valoraciones = [0,0,0,0,0]; // 1★ a 5★

    comentarios.forEach(c => {
      if (c.estrellas !== "Sin calificar") {
        valoraciones[parseInt(c.estrellas)-1]++;
      }
    });
    return valoraciones;
  }

  // Mostrar estadísticas
  btnEstadisticas.addEventListener("click", () => {
    mainContent.style.display = "none";
    estadisticasPanel.style.display = "block";

    // Esperamos a que el canvas esté visible para renderizar
    requestAnimationFrame(crearGraficos);
    mostrarHistorial();

  });

  // Cerrar panel
  cerrar.addEventListener("click", () => {
    estadisticasPanel.style.display = "none";
    mainContent.style.display = "block";

    if (chartVentas) { chartVentas.destroy(); chartVentas=null; }
    if (chartValor) { chartValor.destroy(); chartValor=null; }
  });

  // Crear gráficos
 function crearGraficos() {
  // Obtener elementos canvas
  const canvasV = document.getElementById("graficoVentas");
  const canvasR = document.getElementById("graficoValoraciones");

  // Fijar tamaño explícito en pixels (evita loops de resize)
  canvasV.style.width = "800px";
  canvasV.style.height = "400px";
  canvasV.width = 800;
  canvasV.height = 400;

  canvasR.style.width = "800px";
  canvasR.style.height = "400px";
  canvasR.width = 800;
  canvasR.height = 400;

  const ctxV = canvasV.getContext("2d");
  const ctxR = canvasR.getContext("2d");

  if (chartVentas) chartVentas.destroy();
  if (chartValor) chartValor.destroy();

  chartVentas = new Chart(ctxV, {
    type: "line",
    data: {
      labels: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
      datasets: [{
        label: "Ventas",
        data: ventasPorMes,
        borderColor: "#e2923b",
        backgroundColor: "rgba(226,146,59,0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: false,            // IMPORTANT: no redimension automático
      maintainAspectRatio: false,
      animation: false,            // evitar animaciones que redibujen
      hover: { mode: null },       // evitar comportamientos hover intensivos
      plugins: { legend: { display: true } },
      scales: { y: { beginAtZero: true } }
    }
  });

  chartValor = new Chart(ctxR, {
    type: "bar",
    data: {
      labels: ["1★","2★","3★","4★","5★"],
      datasets: [{
        label: "Valoraciones",
        data: contarValoraciones(),
        backgroundColor: ["#d85c3b","#f7b733","#f7b733","#f7b733","#e2923b"]
      }]
    },
    options: {
      responsive: false,           // IMPORTANT
      maintainAspectRatio: false,
      animation: false,
      hover: { mode: null },
      plugins: { legend: { display: true } },
      scales: { y: { beginAtZero: true } }
    }
  });
  }

  window.registrarVenta = function(total) {
  const mes = new Date().getMonth(); // 0 = enero
  ventasPorMes[mes] += total;

  // Guardar en localStorage
  localStorage.setItem("ventasPorMes", JSON.stringify(ventasPorMes));
};

});

function mostrarHistorial() {
  const cont = document.getElementById("historialCompras");
  cont.innerHTML = "";

  let historial = JSON.parse(localStorage.getItem("historialCompras")) || [];

  historial.reverse().forEach(compra => {
    const div = document.createElement("div");
    div.style.cssText = `
      background: #FFF7E6;
      padding: 14px 18px;
      border-left: 5px solid #e2923b;
      border-radius: 6px;
      font-family: sans-serif;
    `;
let fecha = new Date(compra.fecha);

let horas = fecha.getHours();
let minutos = fecha.getMinutes().toString().padStart(2, "0");
let segundos = fecha.getSeconds().toString().padStart(2, "0");

let periodo = horas >= 12 ? "PM" : "AM";
let horasFormateadas = horas.toString().padStart(2, "0"); // Esto mantiene 16, 17, etc.

let fechaFormateada = `
${fecha.getDate().toString().padStart(2,"0")}/
${(fecha.getMonth()+1).toString().padStart(2,"0")}/
${fecha.getFullYear()}
 - ${horasFormateadas}:${minutos}:${segundos} ${periodo}
`;

    let texto = `
      <strong>🧍 Cliente:</strong> ${compra.nombre}<br>
      <strong>🏠 Dirección:</strong> ${compra.direccion}<br>
      <strong>🗓 Fecha:</strong> ${fechaFormateada}<br><br>
      <strong>🧾 Pedido:</strong><br>
    `;

    compra.productos.forEach(p => {
      texto += `• ${p.nombre} x${p.cantidad} = $${p.subtotal}<br>`;
    });

    texto += `<br><strong>💰 Total:</strong> $${compra.total}`;

    div.innerHTML = texto;
    cont.appendChild(div);
  });
}


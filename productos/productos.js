// === PRODUCTOS ===
const botonesPrecio = document.querySelectorAll(".ver-precio");

botonesPrecio.forEach(boton => {
    boton.addEventListener("click", () => {
        const nombre = boton.getAttribute("data-nombre");
        const precio = boton.getAttribute("data-precio");
        alert(`${nombre} - $${precio}`);
    });
});
botonesAgregar.forEach(boton => {
  boton.addEventListener("click", () => {
    const nombre = boton.dataset.nombre;
    const precio = parseFloat(boton.dataset.precio);
    agregarAlCarrito(nombre, precio);
  });
});

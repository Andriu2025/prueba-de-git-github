// Lista de productos y precios
const productos = {
    1: { nombre: "Celular Samsung A16", precio: 300 },
    2: { nombre: "Teclado RedDragon", precio: 150 },
    3: { nombre: "Monitor 4K", precio: 500 }
};

document.getElementById("boton1").addEventListener("click", function () {
    let producto = parseInt(document.getElementById("producto").value);
    let cantidad = parseInt(document.getElementById("cantidad").value);

    if (productos[producto] && cantidad > 0) {
        let total = productos[producto].precio * cantidad;
        document.getElementById("resultado").innerText =
            `Has comprado ${cantidad} x ${productos[producto].nombre}. Total: $${total}`;
    } else {
        document.getElementById("resultado").innerText = "⚠️ Ingrese un producto válido y una cantidad mayor a 0.";
    }
});

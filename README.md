# 🥖 Panadería Don Fermín

Sitio web interactivo de una panadería artesanal.  
Incluye catálogo de productos, sistema de carrito de compras, registro de pedidos,
valoraciones de clientes y visualización de estadísticas.

El sistema está pensado para uso interno de la panadería (dueño y personal), aunque el catálogo es visible para cualquier usuario.

## 📂 Estructura del proyecto

panaderia/
├── pan.html
├── estilo.css
├── contacto.css # Estilos de contacto y nosotros
├── script.js
│
├── productos/
│ ├── productos.css
│ └── productos.js
│
├── comentarios/
│ ├── comentarios.css
│ └── comentarios.js
│ 
├── estadisticas/
│ ├── estadisticas.css
│ └── estadisticas.js 
│
├── carrito/
│ ├── carrito.css
│ └── carrito.js
│
└── imagenes/
  ├── logo don fermin.png
  ├── portada facturas.jpg
  ├── portada facturas2.jpg
  ├── portada facturas3.jpg
  ├── medialuna.png
  └── ...

## 🛠️ Tecnologías utilizadas
- **HTML5**: Estructura de las páginas y secciones
- **CSS3**: Diseño visual, animaciones y estilos responsivos
- **JavaScript (ES6)**: Manejo de carrito, almacenamiento en LocalStorage y eventos
- **Chart.js**: Gráficos de ventas y valoraciones
- **Font Awesome**: Iconos
- **LocalStorage**: Guardado de historial de compras y comentarios

---

## 🧩 Descripción general

El sitio cuenta con:

- Banner tipo slider con imágenes de la panadería.
- Catálogo de productos en tarjetas con imagen y botón para agregar al carrito.
- **Carrito interactivo** con:
  - Contador en tiempo real
  - Sumar/restar cantidades
  - Vaciar carrito
  - Confirmar pedido y registrar historial
- **Sistema de login/registro** con efecto *flip card*.
- **Sección de comentarios** y valoraciones ★.
- **Panel de estadísticas**:
  - Ventas mensuales
  - Valoraciones promedio
  - Historial completo de compras
- Footer con datos de contacto y autor.

---

## 👤 Autor
- Proyecto realizado por: **Andrés Chacón**
- Materia: **Prácticas Profesionalizantes 1**
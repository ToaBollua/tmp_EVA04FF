document.addEventListener('DOMContentLoaded', function () {
  const formAgregar = document.getElementById('formAgregar');
  const formModificar = document.getElementById('formModificar');
  const formEliminar = document.getElementById('formEliminar');
  const tablaProductos = document.getElementById('tablaProductos');

  // Función para obtener productos desde el Local Storage
  function obtenerProductos() {
    return JSON.parse(localStorage.getItem('productos')) || [];
  }

  // Función para guardar productos en el Local Storage
  function guardarProductos(productos) {
    localStorage.setItem('productos', JSON.stringify(productos));
  }

  // Función para agregar un producto
  formAgregar.addEventListener('submit', function (event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;
    const productos = obtenerProductos();
    const nuevoProducto = { id: Date.now(), nombre, precio, cantidad };
    productos.push(nuevoProducto);
    guardarProductos(productos);
    formAgregar.reset();
    listarProductos();
  });

  // Función para listar los productos en la tabla
  function listarProductos() {
    const productos = obtenerProductos();
    tablaProductos.innerHTML = '';
    productos.forEach(producto => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.cantidad}</td>
            `;
      tablaProductos.appendChild(fila);
    });
  }

  // Función para modificar un producto
  formModificar.addEventListener('submit', function (event) {
    event.preventDefault();
    const idModificar = parseInt(document.getElementById('idModificar').value);
    const nombreModificar = document.getElementById('nombreModificar').value;
    const precioModificar = document.getElementById('precioModificar').value;
    const cantidadModificar = document.getElementById('cantidadModificar').value;
    const productos = obtenerProductos();
    const producto = productos.find(prod => prod.id === idModificar);
    if (producto) {
      if (nombreModificar) producto.nombre = nombreModificar;
      if (precioModificar) producto.precio = precioModificar;
      if (cantidadModificar) producto.cantidad = cantidadModificar;
      guardarProductos(productos);
      listarProductos();
    }
  });

  // Función para eliminar un producto
  formEliminar.addEventListener('submit', function (event) {
    event.preventDefault();
    const idEliminar = parseInt(document.getElementById('idEliminar').value);
    let productos = obtenerProductos();
    productos = productos.filter(prod => prod.id !== idEliminar);
    guardarProductos(productos);
    listarProductos();
  });

  // Inicializar la lista de productos
  listarProductos();
});


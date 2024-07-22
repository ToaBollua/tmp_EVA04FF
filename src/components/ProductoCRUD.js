import React, { useState, useEffect } from 'react';
import ProductoForm from './ProductoForm';
import ProductoList from './ProductoList';

const ProductoCRUD = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    setProductos(productosGuardados);
  }, []);

  const guardarProductos = (productos) => {
    localStorage.setItem('productos', JSON.stringify(productos));
    setProductos(productos);
  };

  const agregarProducto = (producto) => {
    const nuevosProductos = [...productos, producto];
    guardarProductos(nuevosProductos);
  };

  const modificarProducto = (productoModificado) => {
    const nuevosProductos = productos.map(producto =>
      producto.id === productoModificado.id ? productoModificado : producto
    );
    guardarProductos(nuevosProductos);
  };

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter(producto => producto.id !== id);
    guardarProductos(nuevosProductos);
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" data-toggle="tab" href="#agregar">Agregar Producto</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#listar">Listar Productos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#modificar">Modificar Producto</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#eliminar">Eliminar Producto</a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="agregar">
          <h2>Agregar Producto</h2>
          <ProductoForm onSubmit={agregarProducto} />
        </div>
        <div className="tab-pane fade" id="listar">
          <h2>Listar Productos</h2>
          <ProductoList productos={productos} />
        </div>
        <div className="tab-pane fade" id="modificar">
          <h2>Modificar Producto</h2>
          <ProductoForm onSubmit={modificarProducto} productos={productos} />
        </div>
        <div className="tab-pane fade" id="eliminar">
          <h2>Eliminar Producto</h2>
          <ProductoForm onSubmit={eliminarProducto} productos={productos} eliminar />
        </div>
      </div>
    </div>
  );
};

export default ProductoCRUD;

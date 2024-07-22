import React, { useState, useEffect } from 'react';
import ProductoForm from './ProductoForm';
import ProductoList from './ProductoList';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

const ProductoCRUD = () => {
  const [productos, setProductos] = useState([]);
  const [key, setKey] = useState('agregar');

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
    <div className="container">
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="agregar" title="Agregar Producto">
          <h2>Agregar Producto</h2>
          <ProductoForm onSubmit={agregarProducto} />
        </Tab>
        <Tab eventKey="listar" title="Listar Productos">
          <h2>Listar Productos</h2>
          <ProductoList productos={productos} />
        </Tab>
        <Tab eventKey="modificar" title="Modificar Producto">
          <h2>Modificar Producto</h2>
          <ProductoForm onSubmit={modificarProducto} productos={productos} modificar />
        </Tab>
        <Tab eventKey="eliminar" title="Eliminar Producto">
          <h2>Eliminar Producto</h2>
          <ProductoForm onSubmit={eliminarProducto} productos={productos} eliminar />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProductoCRUD;

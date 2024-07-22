import React, { useState } from 'react';

const ProductoForm = ({ onSubmit, productos, eliminar, modificar }) => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [coincidencias, setCoincidencias] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProducto = { id: id || Date.now(), nombre, precio, cantidad };
    onSubmit(nuevoProducto);
    setId('');
    setNombre('');
    setPrecio('');
    setCantidad('');
  };

  const buscarCoincidencias = () => {
    const productosCoincidentes = productos.filter(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
    setCoincidencias(productosCoincidentes);
  };

  const handleModificar = (producto) => {
    setId(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setCantidad(producto.cantidad);
    setProductoSeleccionado(producto);
  };

  const confirmarModificar = () => {
    onSubmit({ id: productoSeleccionado.id, nombre, precio, cantidad });
    setId('');
    setNombre('');
    setPrecio('');
    setCantidad('');
    setCoincidencias([]);
    setProductoSeleccionado(null);
  };

  const handleEliminar = (productoId) => {
    onSubmit(productoId);
    setCoincidencias(coincidencias.filter(producto => producto.id !== productoId));
  };

  return (
    <form onSubmit={eliminar || modificar ? (e) => { e.preventDefault(); buscarCoincidencias(); } : handleSubmit} className="container">
      {eliminar || modificar ? (
        <>
          <div className="form-group">
            <label>Nombre del Producto:</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
          {coincidencias.length > 0 && (
            <div>
              <h3>Productos Encontrados:</h3>
              <ul>
                {coincidencias.map(producto => (
                  <li key={producto.id}>
                    {producto.nombre} - Precio: {producto.precio} - Cantidad: {producto.cantidad}
                    {modificar ? (
                      <button onClick={() => handleModificar(producto)} className="btn btn-warning btn-sm ml-2">
                        Modificar
                      </button>
                    ) : (
                      <button onClick={() => handleEliminar(producto.id)} className="btn btn-danger btn-sm ml-2">
                        Eliminar
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {modificar && productoSeleccionado && (
            <div>
              <h3>Modificar Producto</h3>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Precio:</label>
                <input
                  type="number"
                  className="form-control"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Cantidad:</label>
                <input
                  type="number"
                  className="form-control"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  required
                />
              </div>
              <button onClick={confirmarModificar} className="btn btn-success">
                Confirmar
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Precio:</label>
            <input
              type="number"
              className="form-control"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Cantidad:</label>
            <input
              type="number"
              className="form-control"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {id ? 'Modificar' : 'Agregar'}
          </button>
        </>
      )}
    </form>
  );
};

export default ProductoForm;

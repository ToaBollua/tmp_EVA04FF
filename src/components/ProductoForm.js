import React, { useState } from 'react';

const ProductoForm = ({ onSubmit, productos, eliminar }) => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [coincidencias, setCoincidencias] = useState([]);

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

  const handleEliminar = (productoId) => {
    onSubmit(productoId);
    setCoincidencias(coincidencias.filter(producto => producto.id !== productoId));
  };

  return (
    <form onSubmit={eliminar ? (e) => { e.preventDefault(); buscarCoincidencias(); } : handleSubmit}>
      {eliminar ? (
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
          <button type="submit" className="btn btn-danger">
            Buscar
          </button>
          {coincidencias.length > 0 && (
            <div>
              <h3>Productos Encontrados:</h3>
              <ul>
                {coincidencias.map(producto => (
                  <li key={producto.id}>
                    {producto.nombre} - Precio: {producto.precio} - Cantidad: {producto.cantidad}
                    <button onClick={() => handleEliminar(producto.id)} className="btn btn-danger btn-sm ml-2">
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <>
          {productos && (
            <div className="form-group">
              <label>ID del Producto:</label>
              <input
                type="number"
                className="form-control"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
          )}
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

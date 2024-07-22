import React, { useState } from 'react';

const ProductoForm = ({ onSubmit, productos, eliminar }) => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProducto = { id: id || Date.now(), nombre, precio, cantidad };
    onSubmit(nuevoProducto);
    setId('');
    setNombre('');
    setPrecio('');
    setCantidad('');
  };

  const handleEliminar = (e) => {
    e.preventDefault();
    onSubmit(id);
    setId('');
  };

  return (
    <form onSubmit={eliminar ? handleEliminar : handleSubmit}>
      {eliminar ? (
        <>
          <div className="form-group">
            <label>ID del Producto:</label>
            <input
              type="number"
              className="form-control"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger">
            Eliminar
          </button>
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

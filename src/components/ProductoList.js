import React from 'react';

const ProductoList = ({ productos }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id}>
            <td>{producto.id}</td>
            <td>{producto.nombre}</td>
            <td>{producto.precio}</td>
            <td>{producto.cantidad}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductoList;

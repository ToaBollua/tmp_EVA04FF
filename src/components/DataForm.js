import React, { useState } from 'react';

const DataForm = ({ onSubmit, datos, eliminar, modificar }) => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [valor, setValor] = useState('');
  const [coincidencias, setCoincidencias] = useState([]);
  const [datoSeleccionado, setDatoSeleccionado] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoDato = { id: id || Date.now(), nombre, valor };
    onSubmit(nuevoDato);
    setId('');
    setNombre('');
    setValor('');
  };

  const buscarCoincidencias = () => {
    const datosCoincidentes = datos.filter(dato => dato.nombre.toLowerCase() === nombre.toLowerCase());
    setCoincidencias(datosCoincidentes);
  };

  const handleModificar = (dato) => {
    setId(dato.id);
    setNombre(dato.nombre);
    setValor(dato.valor);
    setDatoSeleccionado(dato);
  };

  const confirmarModificar = () => {
    onSubmit({ id: datoSeleccionado.id, nombre, valor });
    setId('');
    setNombre('');
    setValor('');
    setCoincidencias([]);
    setDatoSeleccionado(null);
  };

  const handleEliminar = (datoId) => {
    onSubmit(datoId);
    setCoincidencias(coincidencias.filter(dato => dato.id !== datoId));
  };

  return (
    <form onSubmit={eliminar || modificar ? (e) => { e.preventDefault(); buscarCoincidencias(); } : handleSubmit} className="container">
      {eliminar || modificar ? (
        <>
          <div className="form-group">
            <label>Nombre del Dato:</label>
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
              <h3>Datos Encontrados:</h3>
              <ul>
                {coincidencias.map(dato => (
                  <li key={dato.id}>
                    {dato.nombre} - Valor: {dato.valor}
                    {modificar ? (
                      <button onClick={() => handleModificar(dato)} className="btn btn-warning btn-sm ml-2">
                        Modificar
                      </button>
                    ) : (
                      <button onClick={() => handleEliminar(dato.id)} className="btn btn-danger btn-sm ml-2">
                        Eliminar
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {modificar && datoSeleccionado && (
            <div>
              <h3>Modificar Dato</h3>
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
                <label>Valor:</label>
                <input
                  type="text"
                  className="form-control"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
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
            <label>Valor:</label>
            <input
              type="text"
              className="form-control"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
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

export default DataForm;
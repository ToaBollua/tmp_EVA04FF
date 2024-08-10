import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './DataTable';
import DataForm from './DataForm';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

const DataCRUD = () => {
  const [tables, setTables] = useState([]);
  const [key, setKey] = useState('agregar');
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/tables')
      .then(response => {
        setTables(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleTableSelect = (table) => {
    setSelectedTable(table);
  };

  const agregarRegistro = async (registro) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/${selectedTable.name}`, registro);
      const nuevoRegistro = response.data;
      // Actualizar la tabla con el nuevo registro
      axios.get(`http://localhost:3001/api/${selectedTable.name}`)
        .then(response => {
          setTables(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const modificarRegistro = async (registroModificado) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/${selectedTable.name}/${registroModificado.id}`, registroModificado);
      const registroActualizado = response.data;
      // Actualizar la tabla con el registro actualizado
      axios.get(`http://localhost:3001/api/${selectedTable.name}`)
        .then(response => {
          setTables(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarRegistro = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/${selectedTable.name}/${id}`);
      // Actualizar la tabla con el registro eliminado
      axios.get(`http://localhost:3001/api/${selectedTable.name}`)
        .then(response => {
          setTables(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="agregar" title="Agregar Registro">
          <h2>Agregar Registro</h2>
          <DataForm onSubmit={agregarRegistro} tables={tables} selectedTable={selectedTable} />
        </Tab>
        <Tab eventKey="listar" title="Listar Registros">
          <h2>Listar Registros</h2>
          <DataTable tables={tables} onSelectTable={handleTableSelect} />
        </Tab>
        <Tab eventKey="modificar" title="Modificar Registro">
          <h2>Modificar Registro</h2>
          <DataForm onSubmit={modificarRegistro} tables={tables} selectedTable={selectedTable} modificar />
        </Tab>
        <Tab eventKey="eliminar" title="Eliminar Registro">
          <h2>Eliminar Registro</h2>
          <DataForm onSubmit={eliminarRegistro} tables={tables} selectedTable={selectedTable} eliminar />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DataCRUD;
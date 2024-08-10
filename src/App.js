import React from 'react';
import DataCRUD from './components/DataCRUD';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1 className="text-center my-4">Gestión de Productos</h1>
      <DataCRUD />
    </div>
  );
}

export default App;

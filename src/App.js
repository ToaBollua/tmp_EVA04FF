import React from 'react';
import ProductoCRUD from './components/ProductoCRUD';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1 className="text-center my-4">Gestión de Productos</h1>
      <ProductoCRUD />
    </div>
  );
}

export default App;


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

console.log("Innobate FYC Iniciado");

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("No se encontró el elemento raíz con id 'root'");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

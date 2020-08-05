import React, { useState } from 'react';
import './App.css';
import CadastroLivro from './components/CadastroLivro';
import CadastroCliente from './components/CadastroCliente';
import ReservaLivro from './components/ReservaLivro';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Tabs from './components/Tabs';

function App() {

  return (
    <Tabs />
  );
}

export default App;
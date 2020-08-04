import React, { useState } from 'react';
import './App.css';
import CadastroLivro from './components/CadastroLivro';
import CadastroCliente from './components/CadastroCliente';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router>
      <Route path="/" exact render={
        () => {
          return <CadastroLivro />;
        }
      }>

      </Route>

      <Route path="/cliente" exact render={
        () => {
          return <CadastroCliente />;
        }
      }>

      </Route>
    </Router>
    /*<div className="container-fluid">

      <h1>Aluguel de Livros</h1>
      <CadastroLivro />
    </div>*/
  );
}

export default App;
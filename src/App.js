import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Articulos from './components/Articulos/ListarArticulos/listarArticulos';
import Pedidos from './components/Pedidos/ListarPedidos/listaPedidos';
import Home from './components/Home/home';
import Header from './components/header/header';

const App = () => {
  return (
    <Router>
      <div>

        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/pedidos" element={<Pedidos />} />
          {/* Add more routes for viewing and editing individual articles and orders */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

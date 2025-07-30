import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './Context/CartContext';

import Navbar from './components/Navbar';
import Home from './Screens/Home';       
import Menu from './Screens/Menu';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './Screens/Cart'; // Import the Cart component

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:restroId" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} /> {/* Add the Cart route */}

          {/* Future Routes */}
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

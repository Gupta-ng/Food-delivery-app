import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Important
import { CartProvider } from './Context/CartContext'; // ✅ Only if file exists

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);

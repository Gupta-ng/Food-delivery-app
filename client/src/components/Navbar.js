import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

export default function Navbar() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Foodie</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/menu">Menu</Link>
            </li>
            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
            {token && (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {username || 'User'}!</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" style={{padding:0}} onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart {cartCount > 0 && <span className="badge bg-success ms-1">{cartCount}</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

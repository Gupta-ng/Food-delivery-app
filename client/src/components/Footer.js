import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-success">🍔 Foodie</h5>
            <p className="text-muted small">Fresh, Fast, and Flavorful. Your favorite meals delivered with love!</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
              <li><Link to="/menu" className="text-muted text-decoration-none">Menu</Link></li>
              <li><Link to="/cart" className="text-muted text-decoration-none">Cart</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Contact</h6>
            <p className="text-muted small">📧 support@foodie.com</p>
            <p className="text-muted small">📞 +91 98765 43210</p>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center text-muted small mb-0">
          &copy; {new Date().getFullYear()} Foodie. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

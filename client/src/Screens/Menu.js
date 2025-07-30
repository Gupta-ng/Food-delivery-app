import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

// Sample menu data for each restaurant
const restroMenus = {
  'pizza-palace': [
    {
      _id: '1',
      name: 'Margherita Pizza',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
      price: 299,
    },
    {
      _id: '2',
      name: 'Farmhouse Pizza',
      image: 'https://images.unsplash.com/photo-1547592180-520b7b6c9a92?auto=format&fit=crop&w=400&q=80',
      price: 349,
    },
  ],
  'burger-hub': [
    {
      _id: '3',
      name: 'Veg Burger',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
      price: 149,
    },
    {
      _id: '4',
      name: 'Cheese Burger',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
      price: 179,
    },
  ],
  'cafe-delight': [
    {
      _id: '5',
      name: 'Pasta Alfredo',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      price: 249,
    },
    {
      _id: '6',
      name: 'Cold Coffee',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      price: 99,
    },
  ],
};

const Menu = () => {
  const { restroId } = useParams();
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();

  // Get menu for selected restaurant, or all foods if no restroId
  const foods = restroId ? restroMenus[restroId] || [] : Object.values(restroMenus).flat();

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4" style={{fontWeight:'bold',color:'#28a745'}}>
        {restroId ? `Menu - ${restroId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}` : 'Our Menu'} <span role="img" aria-label="menu">🍽️</span>
      </h2>
      {/* Search Bar */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search for food..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      {foods.length === 0 ? (
        <div className="text-center text-danger">No foods found.</div>
      ) : (
        <Row>
          {foods.filter(food => food.name.toLowerCase().includes(search.toLowerCase())).map(food => (
            <Col md={4} key={food._id} className="mb-4">
              <Card className="shadow-sm h-100 menu-card">
                <Card.Img variant="top" src={food.image} style={{height:'200px',objectFit:'cover'}} onError={e => {e.target.onerror=null;e.target.src='https://via.placeholder.com/400x200?text=Image+Not+Found';}} />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title style={{fontWeight:'bold'}}>{food.name}</Card.Title>
                    <Card.Text style={{fontSize:'1.2rem',color:'#28a745'}}>₹{food.price}</Card.Text>
                  </div>
                  <Button variant="success" onClick={() => { addToCart(food); alert(`${food.name} added to cart!`); }} className="mt-2 w-100">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <style>{`
        .menu-card:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 32px rgba(40,167,69,0.15);
          transition: all 0.2s;
        }
      `}</style>
    </Container>
  );
};

export default Menu;

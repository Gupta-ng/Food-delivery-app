import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useCart } from '../Context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Your Cart 🛒</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item._id}>
                <td><img src={item.image} alt={item.name} style={{width:'60px',height:'40px',objectFit:'cover',borderRadius:'6px'}} /> {item.name}</td>
                <td>₹{item.price}</td>
                <td>
                  <input type="number" min="1" value={item.quantity} onChange={e => updateQty(item._id, Number(e.target.value))} style={{width: '60px'}} />
                </td>
                <td>₹{item.price * item.quantity}</td>
                <td>
                  <Button variant="danger" onClick={() => removeFromCart(item._id)}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <h4 className="mt-3">Total: ₹{total}</h4>
      {cartItems.length > 0 && <Button variant="success" className="mt-2" onClick={() => alert('Order placed! Thank you for ordering.')}>Checkout</Button>}
    </Container>
  );
};

export default Cart;

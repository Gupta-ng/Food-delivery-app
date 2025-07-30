import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();
export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const exists = prev.find(i => i._id === item._id);
      if (exists) {
        return prev.map(i =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  const updateQty = (id, qty) => {
    setCartItems(prev => prev.map(i => i._id === id ? { ...i, quantity: qty } : i));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
};

const express = require('express');
const router = express.Router();

const foodList = [
  {
    _id: '1',
    name: 'Cheese Pizza',
    price: 299,
    category: 'Pizza',
    description: 'Classic cheese pizza with a crispy crust and rich tomato sauce.',
    rating: 4.5,
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&w=400',
  },
  {
    _id: '2',
    name: 'Veg Burger',
    price: 149,
    category: 'Burger',
    description: 'Fresh veggie patty with lettuce, tomato, and special sauce.',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '3',
    name: 'Pasta',
    price: 199,
    category: 'Pasta',
    description: 'Creamy Alfredo pasta with herbs and parmesan.',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '4',
    name: 'French Fries',
    price: 99,
    category: 'Snacks',
    description: 'Golden, crispy French fries with a pinch of salt.',
    rating: 4.0,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&w=400',
  },
  {
    _id: '5',
    name: 'Paneer Tikka',
    price: 249,
    category: 'Indian',
    description: 'Grilled paneer cubes marinated in spicy yogurt.',
    rating: 4.6,
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400',
  },
  {
    _id: '6',
    name: 'Chocolate Cake',
    price: 179,
    category: 'Dessert',
    description: 'Moist chocolate cake with rich chocolate frosting.',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg?auto=compress&w=400',
  },
];

router.get('/', (req, res) => {
  res.json(foodList);
});

module.exports = router;
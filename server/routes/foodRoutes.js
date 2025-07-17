const express = require('express');
const router = express.Router();

const foodList = [
  {
    _id: '1',
    name: 'Cheese Pizza',
    price: 299,
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&w=400',
  },
  {
    _id: '2',
    name: 'Veg Burger',
    price: 149,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '3',
    name: 'Pasta',
    price: 199,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '4',
    name: 'French Fries',
    price: 99,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&w=400',
  },
  {
    _id: '5',
    name: 'Paneer Tikka',
    price: 249,
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400',
  },
  {
    _id: '6',
    name: 'Chocolate Cake',
    price: 179,
    image: 'https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg?auto=compress&w=400',
  },
];

router.get('/', (req, res) => {
  res.json(foodList);
});

module.exports = router;

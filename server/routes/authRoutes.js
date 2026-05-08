const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/userModel');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'foodie_default_secret_change_in_production';

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required' });

  const userExists = users.find(u => u.username === username);
  if (userExists)
    return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required' });

  const user = users.find(u => u.username === username);
  if (!user)
    return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, username });
});

module.exports = router;

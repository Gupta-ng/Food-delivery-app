const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Foodie API is running 🍔' });
});

// Connect to MongoDB (optional - app works without it using in-memory store)
const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err.message));
} else {
  console.log('ℹ️  No MONGO_URI found — running with in-memory user store');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

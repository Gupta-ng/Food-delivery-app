const express = require('express');
const cors = require('cors');
const foodRoutes = require('./routes/foodRoutes');


const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use the route here
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


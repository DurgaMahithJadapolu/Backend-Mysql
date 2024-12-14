const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./Router/AuthRouter');
const userRoutes = require('./Router/userRouter');

dotenv.config();

const app = express();
const port = 5555;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');

// Import models to register associations
require('./models/index');

// Middleware
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

// Routes
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(express.json());
app.use(logger);

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/users', userRoutes);
app.use('/workouts', workoutRoutes);
app.use('/exercises', exerciseRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Fitness Tracker API is running.' });
});

// ─── 404 Catch-All ────────────────────────────────────────────────────────────
app.use(notFound);

// ─── Global Error Handler (must be last, must have 4 params) ─────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`Fitness Tracker API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err.message);
    process.exit(1);
  });
